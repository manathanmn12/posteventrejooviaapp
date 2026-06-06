"use client";
import { useEffect, useState } from "react";
import { getState, logActivity } from "@/lib/store";
import { EVENT_PRE, EVENT_POST, type HD } from "@/lib/hd";

export default function EventMode() {
  const [hd, setHd] = useState<HD | null>(null);
  const [mode, setMode] = useState<"pick" | "pre" | "post">("pick");
  useEffect(() => { getState().then((s) => setHd(s.hd ?? null)); }, []);
  const type = hd?.hd_type ?? "";

  return (
    <main>
      <p className="text-[10px] uppercase tracking-[0.34em] font-semibold" style={{ color: "var(--cyan)" }}>Event mode</p>
      <h1 className="font-display text-2xl mt-2">Running an event?</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--dim)" }}>
        Built for your hardest days — show up grounded, recover on purpose.
      </p>

      {mode === "pick" && (
        <div className="mt-6 space-y-4">
          <button onClick={() => { setMode("pre"); logActivity("event-pre"); }} className="gcard w-full text-left">
            <div className="gcard-label"><span>Before</span><span style={{ color: "var(--teal)" }}>GROUND</span></div>
            <p className="font-display text-lg">Walk in grounded</p>
            <p className="text-xs mt-1" style={{ color: "var(--faint)" }}>A 90-second prime before doors open</p>
          </button>
          <button onClick={() => { setMode("post"); logActivity("event-post"); }} className="gcard w-full text-left">
            <div className="gcard-label"><span>After</span><span style={{ color: "var(--gold)" }}>RECOVER</span></div>
            <p className="font-display text-lg">Come down on purpose</p>
            <p className="text-xs mt-1" style={{ color: "var(--faint)" }}>Reset your system once it&apos;s over</p>
          </button>
        </div>
      )}

      {mode !== "pick" && (
        <div className="gcard mt-6">
          <p className="text-[10px] uppercase tracking-widest" style={{ color: mode === "pre" ? "var(--teal)" : "var(--gold)" }}>
            {mode === "pre" ? "Before the event" : "After the event"}
          </p>
          <p className="insight mt-3">{mode === "pre" ? (EVENT_PRE[type] ?? "Set your intention, breathe, and step in.") : (EVENT_POST[type] ?? "You gave a lot. Let yourself land.")}</p>
          <a href="/reset" className="cta w-full mt-5 block">{mode === "pre" ? "Prime with a breath →" : "Recover with a reset →"}</a>
          <button onClick={() => setMode("pick")} className="mt-3 w-full text-sm" style={{ color: "var(--faint)" }}>← Back</button>
        </div>
      )}
      <p className="mt-6 text-[11px]" style={{ color: "var(--faint)" }}>+15 XP each time you prep or recover with intention.</p>
    </main>
  );
}
