"use client";
import { useEffect, useState } from "react";
import { getState, logActivity } from "@/lib/store";
import { DECISION_GUIDE, type HD } from "@/lib/hd";

export default function Decide() {
  const [hd, setHd] = useState<HD | null>(null);
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(false);
  useEffect(() => { getState().then((s) => setHd(s.hd ?? null)); }, []);
  const auth = hd?.authority ?? "Emotional";
  const guide = DECISION_GUIDE[auth] ?? DECISION_GUIDE.Emotional;
  return (
    <main>
      <p className="text-[10px] uppercase tracking-[0.34em] font-semibold" style={{ color: "var(--cyan)" }}>Decision helper</p>
      <h1 className="font-display text-2xl mt-2">Run it through your design.</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--dim)" }}>
        You decide all day. Your inner authority is <b style={{ color: "var(--ice)" }}>{auth}</b> — here&apos;s how to use it.
      </p>

      <div className="gcard mt-6">
        <div className="gcard-label"><span>What are you deciding?</span></div>
        <textarea value={q} onChange={(e) => setQ(e.target.value)} rows={3}
          placeholder="e.g. Take the bigger venue, or keep the intimate one?"
          className="w-full rounded-xl bg-black/30 border border-white/10 p-3 text-sm" />
        <button onClick={() => { setShown(true); if (q.trim()) logActivity("decision"); }}
          className="cta w-full mt-4">Show me my process</button>
      </div>

      {shown && (
        <div className="gcard unlock mt-5">
          <p className="text-sm font-medium" style={{ color: "var(--gold)" }}>{guide.headline}</p>
          <ol className="mt-4 space-y-3">
            {guide.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--dim)" }}>
                <span className="font-display" style={{ color: "var(--cyan)" }}>{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          {q.trim() && <p className="mt-4 text-xs" style={{ color: "var(--faint)" }}>Logged · +5 XP</p>}
        </div>
      )}

      {shown && (
        <a href={`/coach?q=${encodeURIComponent(q.trim() ? `Help me decide: ${q.trim()}` : "Help me think through a decision using my authority")}`}
          className="gcard mt-4 flex items-center justify-between" style={{ textDecoration: "none", borderColor: "rgba(168,85,247,.3)" }}>
          <div>
            <p className="text-[10px] uppercase tracking-widest" style={{ color: "var(--violet)" }}>Talk it through</p>
            <p className="text-sm mt-1" style={{ color: "var(--dim)" }}>Take this to your coach for a real conversation →</p>
          </div>
          <span style={{ color: "var(--violet)" }}>●</span>
        </a>
      )}

      <p className="mt-6 text-[11px]" style={{ color: "var(--faint)" }}>
        A reflection tool, not a prescription. The call is always yours.
      </p>
    </main>
  );
}
