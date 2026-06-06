"use client";
import { useEffect, useState } from "react";
import { ensureSession, getState, type AppState } from "@/lib/store";
import { TYPE_META, levelFor } from "@/lib/hd";

export default function Today() {
  const [s, setS] = useState<AppState | null>(null);
  useEffect(() => {
    ensureSession().then(() => getState().then(setS));
  }, []);
  const checkins = s?.checkin_count ?? 0;
  const { lvl, name } = levelFor(checkins);
  const xpPct = Math.min(100, Math.round(((checkins % 7) / 7) * 100));
  const meta = s?.hd?.hd_type ? TYPE_META[s.hd.hd_type] : null;
  const nextGate = [3, 7, 14, 21, 30].find((g) => checkins < g);
  return (
    <main>
      <div className="hud">
        <span className="lvl-chip">LVL {lvl} · {name.toUpperCase()}</span>
        <div className="xp-wrap">
          <div className="xp-bar"><div className="xp-fill" style={{ width: `${xpPct}%` }} /></div>
          <div className="xp-meta"><span>{checkins} CHECK-INS</span><span>{nextGate ? `NEXT CHAPTER AT ${nextGate}` : "ALL CHAPTERS OPEN"}</span></div>
        </div>
        <div className="streak-chip"><b>{s?.streak?.current ?? 0}</b><span className="text-[9px]" style={{ color: "var(--faint)" }}>DAY<br/>STREAK</span></div>
      </div>

      <div className="text-center mt-7">
        <div className="orb-wrap"><div className="orb" /><div className="orb-ring" /></div>
        <h1 className="font-display text-[27px] font-semibold tracking-tight mt-4">
          {greeting()}{s?.user?.display_name ? `, ${cap(s.user.display_name)}` : ""}.
        </h1>
        <p className="insight mx-auto mt-3" style={{ maxWidth: "32ch" }}
           dangerouslySetInnerHTML={{ __html: meta?.insight ?? "Your daily insight arrives once your chart is in." }} />
        {!s?.today_done && <a href="/today/checkin" className="cta inline-block mt-5">60-second check-in</a>}
        {s?.today_done && <p className="mt-5 text-sm" style={{ color: "var(--teal)" }}>✓ Today&apos;s check-in is in — see you tomorrow.</p>}
      </div>

      {/* Tools — the launchpad */}
      <p className="text-[10px] uppercase tracking-[0.26em] mt-9 mb-3" style={{ color: "var(--faint)" }}>Your tools</p>
      <div className="grid grid-cols-3 gap-3">
        <a href="/reset" className="tile">
          <span className="tile-orb" />
          <b>Reset</b><span>2-min breath</span>
        </a>
        <a href="/decide" className="tile">
          <span className="tile-ic" style={{ borderColor: "rgba(34,229,255,.4)", color: "var(--cyan)" }}>?</span>
          <b>Decide</b><span>run a choice</span>
        </a>
        <a href="/event" className="tile">
          <span className="tile-ic" style={{ borderColor: "rgba(255,209,102,.4)", color: "var(--gold)" }}>◆</span>
          <b>Event</b><span>prep / recover</span>
        </a>
      </div>

      <a href="/wins" className="gcard mt-4 flex items-center justify-between" style={{ textDecoration: "none" }}>
        <div>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: "var(--gold)" }}>Your wins</p>
          <p className="text-sm mt-1" style={{ color: "var(--dim)" }}>Streak, badges & level →</p>
        </div>
        <span className="streak-chip"><b>{s?.streak?.current ?? 0}</b></span>
      </a>

      <div className="mt-6 space-y-4">
        <div className="gcard">
          <div className="gcard-label"><span>Today&apos;s run</span><span style={{ color: "var(--teal)" }}>{s?.today_done ? "1/2" : "0/2"} DONE</span></div>
          <a href="/today/checkin" className={`run-row ${s?.today_done ? "done" : ""}`}>
            <span className="r-check">{s?.today_done ? "✓" : ""}</span>
            <div><b className="font-display text-sm block">Morning check-in</b>
              <span className="text-[11px]" style={{ color: "var(--faint)" }}>4 sliders + one honest line</span></div>
            <span className="xp-chip">+10 XP</span>
          </a>
          <div className="run-row">
            <span className="r-check"></span>
            <div><b className="font-display text-sm block">Aligned action</b>
              <span className="text-[11px]" style={{ color: "var(--faint)" }}>{meta?.action ?? "Arrives with your chart"}</span></div>
            <span className="xp-chip">+15 XP</span>
          </div>
        </div>
        {nextGate && (
          <div className="gcard">
            <div className="gcard-label"><span>Next chapter</span><span style={{ color: "var(--gold)" }}>AT {nextGate} CHECK-INS</span></div>
            <p className="text-sm" style={{ color: "var(--dim)" }}>
              {nextGate - checkins} more {nextGate - checkins === 1 ? "check-in" : "check-ins"} and a new chapter of your report opens.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
function greeting() { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; }
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
