import { NextRequest, NextResponse } from "next/server";
import { STRATEGY } from "@/lib/hd";

// Server-side humandesignhub integration. Free plan: locations/search + timezone/resolve + simple-bodygraph.
const BASE = "https://api.humandesignhub.app/v1";

export async function POST(req: NextRequest) {
  const key = process.env.HDHUB_API_KEY;
  if (!key) return NextResponse.json({ error: "hd_unconfigured" }, { status: 503 });
  const { date, time, city, timeKnown } = await req.json();
  if (!date || !city) return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  const H = { "X-API-KEY": key, "Content-Type": "application/json" };
  try {
    // 1) city -> timezone (free helper)
    const locRes = await fetch(`${BASE}/locations/search?query=${encodeURIComponent(city)}`, { headers: H });
    const loc = await locRes.json();
    const tz = loc?.results?.[0]?.timezone ?? loc?.[0]?.timezone ?? "America/Los_Angeles";
    // 2) local datetime -> offset datetime (free helper)
    const t = timeKnown && time ? time : "12:00";
    const tzRes = await fetch(`${BASE}/timezone/resolve`, {
      method: "POST", headers: H, body: JSON.stringify({ date, time: t, timezone: tz }),
    });
    const tzj = await tzRes.json();
    const datetime = tzj?.datetime ?? `${date}T${t}:00+00:00`;
    // 3) chart (0.5 credits)
    const chartRes = await fetch(`${BASE}/simple-bodygraph`, {
      method: "POST", headers: H, body: JSON.stringify({ datetime }),
    });
    if (!chartRes.ok) return NextResponse.json({ error: "hd_api_error", status: chartRes.status }, { status: 502 });
    const c = await chartRes.json();
    return NextResponse.json({
      hd_type: c.type, strategy: STRATEGY[c.type] ?? null, authority: c.authority,
      profile: c.profile, incarnation_cross: c.incarnation_cross,
      centers: c.centers ?? [], gates: c.gates ?? [], channels: c.channels_short ?? [],
      birth_tz: tz, time_estimated: !timeKnown, raw_json: c,
    });
  } catch {
    return NextResponse.json({ error: "hd_unreachable" }, { status: 502 });
  }
}
