"use client";
import { useEffect, useState } from "react";
import { ensureSession, getState, getActivity, detectTrend, type AppState } from "@/lib/store";
import { levelFor } from "@/lib/hd";
import { dailyInsight, dailyExperiment, dailyReflection, identityLine } from "@/lib/content";

export default function Today() {
  const [s, setS] = useState<AppState | null>(null);
  const [day, setDay] = useState(0);
  useEffect(() => {
    ensureSession().then(() => getState().then(setS));
    setDay(Math.floor(Date.now() / 864e5)); // stable per calendar day
  }, []);
  const checkins = s?.checkin_count ?? 0;
  const { lvl, name } = levelFor(checkins);
  const xpPct = Math.min(100, Math.round(((checkins % 7) / 7) * 100));
  const nextGate = [3, 7, 14, 21, 30].find((g) => checkins < g);
  const act = typeof window !== "undefined" ? getActivity() : { resets: 0, decisions: 0, events: 0, eventPre: 0, eventPost: 0 };
  const trend = typeof window !== "undefined" ? detectTrend() : null;
  const hasChart = !!s?.hd?.hd_type;
  const insight = hasChart ? dailyInsight(s!.hd, day, trend) : "Your daily insight arrives once your chart is in.";
  const action = hasChart ? dailyExperiment(s!.hd, day) : "Arrives with your chart";
  const reflection = dailyReflection(day);
  const identity = identityLine(checkins, act.resets, act.decisions);

  // temporal orb — color shifts with the hour
  const hour = new Date().getHours();
  const orbTint = hour < 11
    ? "radial-gradient(circle at 38% 32%,rgba(140,255,240,.95),var(--cyan) 44%,rgba(34,229,255,.85) 72%,rgba(34,229,255,.25))"
    : hour < 18
    ? "radial-gradient(circle at 38% 32%,rgba(140,255,240,.95),var(--teal) 42%,rgba(34,229,255,.85) 72%,rgba(34,229,255,.25))"
    : "radial-gradient(circle at 38% 32%,rgba(200,180,255,.9),var(--violet) 46%,rgba(34,229,255,.6) 78%,rgba(34,229,255,.2))";

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

      <div className="text-center mt-8">
        <div className="orb-wrap"><div className="orb" style={{ background: orbTint }} /><div className="orb-ring" /></div>
        <h1 className="font-display text-[27px] font-semibold tracking-tight mt-5">
          {greeting()}{s?.user?.display_name ? `, ${cap(s.user.display_name)}` : ""}.
        </h1>
        <p className="insight mx-auto mt-3" style={{ maxWidth: "32ch" }} dangerouslySetInnerHTML={{ __html: insight }} />
        {!s?.today_done && <a href="/today/checkin" className="cta inline-block mt-6">60-second check-in</a>}
        {s?.today_done && <p className="mt-6 text-sm" style={{ color: "var(--teal)" }}>✓ Today&apos;s check-in is in — see you tomorrow.</p>}
      </div>

      {checkins >= 3 && (
        <p className="text-center text-sm mt-6 px-4" style={{ color: "var(--gold)" }}>{identity}</p>
      )}

      {/* Today's aligned action + reflection */}
      <div className="mt-8 space-y-4">
        <div className="gcard unlock">
          <div className="gcard-label"><span>Today&apos;s aligned action</span><span className="xp-chip">+15 XP</span></div>
          <p className="text-sm leading-relaxed">{action}</p>
        </div>
        <div className="gcard">
          <div className="gcard-label"><span>Sit with this</span></div>
          <p className="text-sm leading-relaxed" style={{ color: "var(--dim)" }}>{reflection}</p>
        </div>
      </div>

      {/* Launchpad */}
      <p className="text-[10px] uppercase tracking-[0.26em] mt-9 mb-3" style={{ color: "var(--faint)" }}>Practices</p>
      <div className="grid grid-cols-3 gap-3">
        <a href="/practices" className="tile"><span className="tile-orb" /><b>Reset</b><span>breathe</span></a>
        <a href="/decide" className="tile"><span className="tile-ic" style={{ borderColor: "rgba(34,229,255,.4)", color: "var(--cyan)" }}>?</span><b>Decide</b><span>a choice</span></a>
        <a href="/event" className="tile"><span className="tile-ic" style={{ borderColor: "rgba(255,209,102,.4)", color: "var(--gold)" }}>◆</span><b>Event</b><span>prep/recover</span></a>
      </div>

      <a href="/mirror" className="gcard mt-4 flex items-center justify-between" style={{ textDecoration: "none" }}>
        <div>
          <p className="text-[10px] uppercase tracking-widest" style={{ color: "var(--cyan)" }}>The mirror</p>
          <p className="text-sm mt-1" style={{ color: "var(--dim)" }}>{checkins >= 3 ? "See your patterns →" : `${3 - checkins} check-ins until it opens`}</p>
        </div>
        <span style={{ color: "var(--cyan)" }}>◍</span>
      </a>

      {nextGate && (
        <div className="gcard mt-4">
          <div className="gcard-label"><span>Next chapter</span><span style={{ color: "var(--gold)" }}>AT {nextGate} CHECK-INS</span></div>
          <p className="text-sm" style={{ color: "var(--dim)" }}>
            {nextGate - checkins} more {nextGate - checkins === 1 ? "check-in" : "check-ins"} and a new chapter of your report opens.
          </p>
        </div>
      )}
    </main>
  );
}
function greeting() { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; }
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
