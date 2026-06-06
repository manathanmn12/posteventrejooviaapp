"use client";
import { RESET_MODES } from "@/lib/content";

export default function Practices() {
  const hour = new Date().getHours();
  const suggested = hour < 11 ? "focus" : hour < 16 ? "energize" : hour < 20 ? "calm" : "winddown";
  return (
    <main>
      <p className="text-[10px] uppercase tracking-[0.34em] font-semibold" style={{ color: "var(--cyan)" }}>Practices</p>
      <h1 className="font-display text-2xl mt-2">Things to do, right now.</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--dim)" }}>Short, practical, and tuned to how you&apos;re wired. Suggested for now: <b style={{ color: "var(--ice)" }}>{RESET_MODES.find(m => m.key === suggested)?.name}</b>.</p>

      <p className="text-[10px] uppercase tracking-widest mt-7 mb-3" style={{ color: "var(--faint)" }}>Breathing resets</p>
      <div className="grid grid-cols-2 gap-3">
        {RESET_MODES.map((m) => (
          <a key={m.key} href={`/reset?mode=${m.key}`} className="gcard" style={{ textDecoration: "none",
            borderColor: m.key === suggested ? "rgba(34,229,255,.4)" : undefined }}>
            <div className="flex items-center gap-2">
              <span className="tile-orb" style={{ width: 22, height: 22 }} />
              <b className="font-display text-sm">{m.name}</b>
            </div>
            <p className="text-[11px] mt-2" style={{ color: "var(--faint)" }}>{m.intent}</p>
            <p className="text-[10px] mt-1" style={{ color: "var(--dim)" }}>{m.phases.map(p => p[1] / 1000).join("-")} · {m.cycles}×</p>
          </a>
        ))}
      </div>

      <p className="text-[10px] uppercase tracking-widest mt-8 mb-3" style={{ color: "var(--faint)" }}>Tools</p>
      <div className="space-y-3">
        <a href="/decide" className="gcard flex items-center justify-between" style={{ textDecoration: "none" }}>
          <div><b className="font-display text-sm block">Decision Helper</b>
            <span className="text-[11px]" style={{ color: "var(--faint)" }}>Run a choice through your authority</span></div>
          <span className="tile-ic" style={{ width: 30, height: 30, borderColor: "rgba(34,229,255,.4)", color: "var(--cyan)" }}>?</span>
        </a>
        <a href="/event" className="gcard flex items-center justify-between" style={{ textDecoration: "none" }}>
          <div><b className="font-display text-sm block">Event Mode</b>
            <span className="text-[11px]" style={{ color: "var(--faint)" }}>Ground before · recover after</span></div>
          <span className="tile-ic" style={{ width: 30, height: 30, borderColor: "rgba(255,209,102,.4)", color: "var(--gold)" }}>◆</span>
        </a>
      </div>
    </main>
  );
}
