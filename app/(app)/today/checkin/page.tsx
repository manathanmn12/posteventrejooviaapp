"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitCheckin } from "@/lib/store";

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
    try {
      await submitCheckin({
        p_energy: v.energy, p_stress: v.stress, p_clarity: v.clarity, p_decision: v.decision, p_reflection: note,
      });
      r.push("/today");
    } catch (e) { setErr(String(e)); setBusy(false); }
  }
  // orb listens to the sliders: brighter/teal when energy beats stress, coral when stress wins
  const bal = v.energy - v.stress;
  const orbBg = bal > 1
    ? "radial-gradient(circle at 38% 32%,rgba(140,255,240,.95),var(--teal) 44%,rgba(34,229,255,.8) 75%)"
    : bal < -1
    ? "radial-gradient(circle at 38% 32%,rgba(255,210,200,.9),var(--coral) 46%,rgba(224,137,125,.4) 78%)"
    : "radial-gradient(circle at 38% 32%,rgba(140,255,240,.85),var(--cyan) 45%,rgba(34,229,255,.35) 78%)";
  const orbGlow = `0 0 ${44 + v.clarity * 5}px ${bal < -1 ? "rgba(224,137,125,.4)" : "rgba(34,229,255,.4)"}`;

  return (
    <main>
      <div className="orb-wrap" style={{ width: 120, height: 120, margin: "0 auto 4px" }}>
        <div className="orb" style={{ width: 84, height: 84, background: orbBg, boxShadow: orbGlow,
          transition: "background .4s ease, box-shadow .4s ease" }} />
      </div>
      <h1 className="font-display text-2xl text-center">How are you, really?</h1>
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
