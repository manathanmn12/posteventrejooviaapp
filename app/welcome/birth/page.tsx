"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ensureSession, saveChart } from "@/lib/store";
import { STRATEGY, TYPE_META } from "@/lib/hd";

export default function Birth() {
  const r = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [unknown, setUnknown] = useState(false);
  const [city, setCity] = useState("");
  const [busy, setBusy] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => { ensureSession(); }, []); // instant session, no email

  async function save(chart: Record<string, unknown>) {
    await ensureSession(); // guarantee a session exists before we save
    await saveChart({ birth_date: date, birth_time: unknown ? "12:00" : time,
      time_estimated: unknown, birth_city: city, ...chart });
    r.push("/welcome/reveal"); // saveChart never throws now — always advance
  }

  async function compute() {
    setBusy(true); setErr("");
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 15000); // don't spin forever
      const res = await fetch("/api/hd-chart", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, city, timeKnown: !unknown }),
        signal: ctrl.signal,
      });
      clearTimeout(t);
      if (res.ok) { await save(await res.json()); return; }
    } catch { /* fall through to the type picker */ }
    setFallback(true); setBusy(false);
  }

  async function pickType(t: string) {
    setBusy(true);
    try {
      await save({ hd_type: t, strategy: STRATEGY[t], authority: "Emotional", profile: "1/4",
        time_estimated: true, api_source: "manual-demo" });
    } catch (e) { setErr(String(e)); setBusy(false); }
  }

  return (
    <main className="mx-auto max-w-md px-6 pt-16 pb-16">
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <h1 className="font-display text-3xl">Your design starts at your first breath.</h1>
      <div className="gcard mt-7 space-y-4">
        <label className="block text-xs" style={{ color: "var(--dim)" }}>Birth date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 p-3 text-sm" /></label>
        {!unknown && (
          <label className="block text-xs" style={{ color: "var(--dim)" }}>Birth time (as exact as you can)
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
              className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 p-3 text-sm" /></label>
        )}
        <label className="flex items-center gap-2 text-xs" style={{ color: "var(--dim)" }}>
          <input type="checkbox" checked={unknown} onChange={(e) => setUnknown(e.target.checked)} />
          I don&apos;t know my birth time (we&apos;ll use midday and mark what depends on it)
        </label>
        <label className="block text-xs" style={{ color: "var(--dim)" }}>Birth city
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="San Jose, CA"
            className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 p-3 text-sm" /></label>
        <button onClick={compute} disabled={busy || !date || !city || (!unknown && !time)} className="cta w-full">
          {busy ? "Computing your chart…" : "Compute my chart"}
        </button>
        {err && <p className="text-xs" style={{ color: "var(--coral)" }}>{err}</p>}
        <p className="text-[11px]" style={{ color: "var(--faint)" }}>
          Used once to compute your chart. Stored encrypted, never shared, never sold. Delete anytime.
        </p>
      </div>
      {fallback && (
        <div className="gcard mt-5">
          <p className="text-xs mb-3" style={{ color: "var(--dim)" }}>
            The chart engine isn&apos;t connected yet — explore with your type for now (your birth data is kept; we recompute automatically once live):
          </p>
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(TYPE_META).map((t) => (
              <button key={t} onClick={() => pickType(t)}
                className="text-left text-sm rounded-xl border border-white/10 p-3 hover:border-[--cyan]">
                {t} <span className="text-xs" style={{ color: "var(--faint)" }}>{TYPE_META[t].pct}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
