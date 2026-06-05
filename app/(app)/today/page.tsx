"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { TYPE_META, levelFor, type HD } from "@/lib/hd";

type State = { user?: { display_name?: string }; hd?: HD;
  streak?: { current: number; longest: number }; checkin_count?: number; today_done?: boolean };

export default function Today() {
  const [s, setS] = useState<State | null>(null);
  useEffect(() => {
    const c = createClient();
    c.rpc("rj_ensure_user").then(() => c.rpc("rj_get_state").then(({ data }) => setS(data ?? {})));
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

      <div className="mt-8 space-y-4">
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
