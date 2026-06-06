"use client";
import { useEffect, useState } from "react";
import { getState, type AppState } from "@/lib/store";
import { CHAPTERS } from "@/lib/hd";

export default function Report() {
  const [s, setS] = useState<AppState | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  useEffect(() => {
    getState().then(setS);
  }, []);
  const checkins = s?.checkin_count ?? 0;
  const nextGate = [3, 7, 14, 21, 30].find((g) => checkins < g);
  const unlocked = CHAPTERS.filter((c) => checkins >= c.gate).length;
  const newest = CHAPTERS.filter((c) => checkins >= c.gate).slice(-1)[0]?.n;
  const chap = open != null ? CHAPTERS.find((c) => c.n === open) : null;
  return (
    <main>
      <p className="text-[10px] uppercase tracking-[0.34em] font-semibold" style={{ color: "var(--cyan)" }}>Your design report</p>
      <h1 className="cover-title mt-3">Written about <em>you</em>.<br/>Earned by you.</h1>
      <p className="text-[12.5px] mt-2" style={{ color: "var(--dim)" }}>
        {unlocked} of {CHAPTERS.length} chapters open · every check-in moves the trail
      </p>
      <div className="prog-line"><div className="prog-fill" style={{ width: `${(unlocked / CHAPTERS.length) * 100}%` }} /></div>
      <p className="prog-meta">{checkins} CHECK-INS BANKED</p>

      <div className="trail mt-2">
        {CHAPTERS.map((c) => {
          const isOpen = checkins >= c.gate;
          const status = isOpen ? (c.n === newest && c.gate > 0 ? "new" : "done")
            : c.gate === [3,7,14,21,30].find((g) => checkins < g) ? "next" : "far";
          return (
            <div key={c.n} className={`node ${isOpen ? "tap" : ""}`} onClick={() => isOpen && setOpen(c.n)}>
              <span className={`n-dot ${status}`}>{status === "done" ? "✓" : String(c.n).padStart(2, "0")}</span>
              <div className="n-card">
                <div className="flex justify-between items-baseline gap-2">
                  <b className="font-display text-[14.5px]">{c.title}</b>
                  <span className="text-[10px] whitespace-nowrap" style={{ color: status === "new" ? "var(--gold)" : "var(--faint)" }}>
                    {isOpen ? (status === "new" ? "NEW" : "OPEN") : `at ${c.gate} check-ins`}
                  </span>
                </div>
                <p className="text-[11.5px] mt-1" style={{ color: "var(--faint)" }}>{c.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button className="cta w-full mt-6" disabled={unlocked < CHAPTERS.length}>
        {unlocked < CHAPTERS.length ? `PDF unlocks with chapter ${CHAPTERS.length}` : "Download your report (PDF)"}
      </button>

      {/* Continue the journey — no dead end */}
      <p className="text-[10px] uppercase tracking-[0.26em] mt-9 mb-3" style={{ color: "var(--faint)" }}>Keep going</p>
      <div className="space-y-3">
        <a href="/today/checkin" className="gcard flex items-center justify-between" style={{ textDecoration: "none" }}>
          <div><b className="font-display text-sm block">Today&apos;s check-in</b>
            <span className="text-[11px]" style={{ color: "var(--faint)" }}>
              {nextGate ? `${nextGate - checkins} more until your next chapter` : "keep your streak alive"}</span></div>
          <span className="xp-chip">+10 XP</span>
        </a>
        <a href="/reset" className="gcard flex items-center justify-between" style={{ textDecoration: "none" }}>
          <div><b className="font-display text-sm block">Take a reset</b>
            <span className="text-[11px]" style={{ color: "var(--faint)" }}>2-minute breath, on us</span></div>
          <span className="tile-orb" style={{ width: 26, height: 26 }} />
        </a>
      </div>

      <p className="mt-6 text-[11px]" style={{ color: "var(--faint)" }}>
        Your design is a reflection tool, not a prescription — and never a measure of ability.
      </p>

      {chap && s?.hd && (
        <div className="scene">
          <button className="scene-close" onClick={() => setOpen(null)}>✕</button>
          <div className="aurora"><div className="blob b1" /><div className="blob b2" /></div>
          <p className="kicker">Chapter {String(chap.n).padStart(2, "0")}</p>
          <h2>{chap.title}</h2>
          <p className="text-[11px] uppercase tracking-widest" style={{ color: "var(--faint)" }}>{chap.sub}</p>
          {chap.body(s.hd).map((para, i) => (i === 0
            ? <p key={i} className="pull">{para}</p>
            : <p key={i}>{para}</p>
          ))}
        </div>
      )}
    </main>
  );
}
