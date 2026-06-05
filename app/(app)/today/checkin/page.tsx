"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const SLIDERS = [
  ["energy", "Energy", "How's your energy, honestly?"],
  ["stress", "Stress", "What's your load right now?"],
  ["clarity", "Clarity", "How clear is your head?"],
  ["decision", "Decisions", "How confident are you in today's calls?"],
] as const;

export default function Checkin() {
  const r = useRouter();
  const [v, setV] = useState<Record<string, number>>({ energy: 5, stress: 5, clarity: 5, decision: 5 });
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function submit() {
    setBusy(true); setErr("");
    const { error } = await createClient().rpc("rj_submit_checkin", {
      p_energy: v.energy, p_stress: v.stress, p_clarity: v.clarity, p_decision: v.decision, p_reflection: note,
    });
    if (error) { setErr(error.message); setBusy(false); return; }
    r.push("/today");
  }
  return (
    <main>
      <h1 className="font-display text-2xl">Check-in</h1>
      {SLIDERS.map(([key, label, q]) => (
        <div key={key} className="gcard mt-4">
          <div className="gcard-label"><span>{label}</span><span style={{ color: "var(--cyan)" }}>{v[key]}</span></div>
          <p className="text-sm" style={{ color: "var(--dim)" }}>{q}</p>
          <input type="range" min={1} max={10} value={v[key]}
            onChange={(e) => setV({ ...v, [key]: Number(e.target.value) })} className="mt-3 w-full" />
        </div>
      ))}
      <div className="gcard mt-4">
        <div className="gcard-label"><span>Reflection</span></div>
        <p className="text-sm" style={{ color: "var(--dim)" }}>Where did yesterday&apos;s energy actually go?</p>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3}
          placeholder="Two honest lines beat ten polished ones."
          className="mt-3 w-full rounded-xl bg-black/30 border border-white/10 p-3 text-sm" />
      </div>
      <button onClick={submit} disabled={busy} className="cta w-full mt-6">
        {busy ? "Saving…" : "Done — +10 XP"}
      </button>
      {err && <p className="mt-3 text-xs" style={{ color: "var(--coral)" }}>{err}</p>}
    </main>
  );
}
