"use client";
import { useEffect, useState } from "react";
import { ensureSession, getState, getActivity, detectTrend, getGoal, getLessonsDone, type AppState } from "@/lib/store";
import { levelFor } from "@/lib/hd";
import { dailyInsight, dailyExperiment, identityLine, goalByKey } from "@/lib/content";
import { LESSONS } from "@/lib/lessons";

export default function Today() {
  const [s, setS] = useState<AppState | null>(null);
  const [day, setDay] = useState(0);
  const [goal, setGoalState] = useState("");
  const [lessonsDone, setLessonsDone] = useState(0);
  useEffect(() => {
    ensureSession().then(() => getState().then(setS));
    setDay(Math.floor(Date.now() / 864e5));
    setGoalState(getGoal());
    setLessonsDone(getLessonsDone().length);
  }, []);
  const checkins = s?.checkin_count ?? 0;
  const { lvl, name } = levelFor(checkins);
  const xpPct = Math.min(100, Math.round(((checkins % 7) / 7) * 100));
  const act = typeof window !== "undefined" ? getActivity() : { resets: 0, decisions: 0, events: 0, eventPre: 0, eventPost: 0 };
  const trend = typeof window !== "undefined" ? detectTrend() : null;
  const hasChart = !!s?.hd?.hd_type;
  const insight = hasChart ? dailyInsight(s!.hd, day, trend) : "Your daily insight arrives once your chart is in.";
  const action = hasChart ? dailyExperiment(s!.hd, day) : "Arrives with your chart";
  const identity = identityLine(checkins, act.resets, act.decisions);
  const goalInfo = goalByKey(goal);
  const nextLesson = LESSONS[Math.min(lessonsDone, LESSONS.length - 1)];
  const questDone = lessonsDone >= LESSONS.length;

  // "your 15 minutes today" — the three-step daily flow
  const steps = [
    { key: "ritual", label: "Center with your ritual", sub: "the 3-minute reset", href: "/ritual", done: false, mins: "3 min" },
    { key: "checkin", label: "Check in", sub: "4 sliders + one honest line", href: "/today/checkin", done: !!s?.today_done, mins: "1 min" },
    { key: "lesson", label: questDone ? "Quest complete — revisit a lesson" : `Day ${lessonsDone + 1}: ${nextLesson?.title}`, sub: questDone ? "your design, mastered" : "today's lesson + a real-life challenge", href: "/path", done: questDone, mins: "5 min" },
  ];
  const remaining = steps.filter((x) => !x.done).length;

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
          <div className="xp-meta"><span>{checkins} CHECK-INS</span><span>{questDone ? "QUEST COMPLETE" : `QUEST DAY ${lessonsDone + 1}/${LESSONS.length}`}</span></div>
        </div>
        <div className="streak-chip"><b>{s?.streak?.current ?? 0}</b><span className="text-[9px]" style={{ color: "var(--faint)" }}>DAY<br/>STREAK</span></div>
      </div>

      <div className="text-center mt-8">
        <div className="orb-wrap"><div className="orb" style={{ background: orbTint }} /><div className="orb-ring" /></div>
        <h1 className="font-display text-[27px] font-semibold tracking-tight mt-5">
          {greeting()}{s?.user?.display_name ? `, ${cap(s.user.display_name)}` : ""}.
        </h1>
        <p className="insight mx-auto mt-3" style={{ maxWidth: "32ch" }} dangerouslySetInnerHTML={{ __html: insight }} />
        {goalInfo && <p className="text-xs mt-3" style={{ color: "var(--faint)" }}>{goalInfo.focus}</p>}
      </div>

      {/* Your 15 minutes today — the Mindvalley daily flow */}
      <div className="gcard mt-8" style={{ borderColor: "rgba(34,229,255,.3)" }}>
        <div className="gcard-label">
          <span>Your 15 minutes today</span>
          <span style={{ color: remaining ? "var(--cyan)" : "var(--teal)" }}>{remaining ? `${steps.length - remaining}/${steps.length}` : "✓ DONE"}</span>
        </div>
        {steps.map((st) => (
          <a key={st.key} href={st.href} className={`run-row ${st.done ? "done" : ""}`} style={{ textDecoration: "none" }}>
            <span className="r-check">{st.done ? "✓" : ""}</span>
            <div className="flex-1"><b className="font-display text-sm block" style={{ color: st.done ? "var(--faint)" : "var(--ice)" }}>{st.label}</b>
              <span className="text-[11px]" style={{ color: "var(--faint)" }}>{st.sub}</span></div>
            <span className="xp-chip">{st.mins}</span>
          </a>
        ))}
      </div>

      {checkins >= 3 && <p className="text-center text-sm mt-6 px-4" style={{ color: "var(--gold)" }}>{identity}</p>}

      <div className="gcard unlock mt-6">
        <div className="gcard-label"><span>Today&apos;s aligned action</span><span className="xp-chip">+15 XP</span></div>
        <p className="text-sm leading-relaxed">{action}</p>
      </div>

      {/* Practices + explore */}
      <p className="text-[10px] uppercase tracking-[0.26em] mt-8 mb-3" style={{ color: "var(--faint)" }}>Anytime</p>
      <div className="grid grid-cols-3 gap-3">
        <a href="/practices" className="tile"><span className="tile-orb" /><b>Reset</b><span>breathe</span></a>
        <a href="/decide" className="tile"><span className="tile-ic" style={{ borderColor: "rgba(34,229,255,.4)", color: "var(--cyan)" }}>?</span><b>Decide</b><span>a choice</span></a>
        <a href="/event" className="tile"><span className="tile-ic" style={{ borderColor: "rgba(255,209,102,.4)", color: "var(--gold)" }}>◆</span><b>Event</b><span>prep/recover</span></a>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <a href="/mirror" className="gcard flex items-center justify-between" style={{ textDecoration: "none" }}>
          <div><p className="text-[10px] uppercase tracking-widest" style={{ color: "var(--cyan)" }}>Mirror</p>
            <p className="text-xs mt-1" style={{ color: "var(--faint)" }}>{checkins >= 3 ? "your patterns" : `in ${3 - checkins}`}</p></div>
          <span style={{ color: "var(--cyan)" }}>◍</span>
        </a>
        <a href="/wins" className="gcard flex items-center justify-between" style={{ textDecoration: "none" }}>
          <div><p className="text-[10px] uppercase tracking-widest" style={{ color: "var(--gold)" }}>Wins</p>
            <p className="text-xs mt-1" style={{ color: "var(--faint)" }}>streak & badges</p></div>
          <span className="streak-chip"><b style={{ fontSize: 20 }}>{s?.streak?.current ?? 0}</b></span>
        </a>
      </div>
    </main>
  );
}
function greeting() { const h = new Date().getHours(); return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening"; }
function cap(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
