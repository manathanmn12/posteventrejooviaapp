"use client";
import { useEffect, useState } from "react";
import { getState, getActivity, computeBadges, xpTotal, type AppState, type Activity, type Badge } from "@/lib/store";
import { levelFor } from "@/lib/hd";

export default function Wins() {
  const [s, setS] = useState<AppState | null>(null);
  const [a, setA] = useState<Activity | null>(null);
  useEffect(() => { getState().then(setS); setA(getActivity()); }, []);
  const checkins = s?.checkin_count ?? 0;
  const streak = s?.streak?.current ?? 0;
  const act = a ?? { resets: 0, decisions: 0, events: 0, eventPre: 0, eventPost: 0 };
  const { lvl, name } = levelFor(checkins);
  const xp = xpTotal(checkins, act);
  const badges: Badge[] = computeBadges(checkins, streak, act);
  const earned = badges.filter((b) => b.earned).length;

  return (
    <main>
      <p className="text-[10px] uppercase tracking-[0.34em] font-semibold" style={{ color: "var(--cyan)" }}>Your wins</p>
      <h1 className="font-display text-2xl mt-2">Level {lvl} · {name}</h1>

      <div className="grid grid-cols-3 gap-3 mt-5 text-center">
        <div className="gcard"><p className="font-stat text-3xl" style={{ color: "var(--cyan)" }}>{xp}</p><p className="text-[10px] mt-1" style={{ color: "var(--faint)" }}>XP</p></div>
        <div className="gcard"><p className="font-stat text-3xl" style={{ color: "var(--gold)" }}>{streak}</p><p className="text-[10px] mt-1" style={{ color: "var(--faint)" }}>DAY STREAK</p></div>
        <div className="gcard"><p className="font-stat text-3xl" style={{ color: "var(--teal)" }}>{earned}</p><p className="text-[10px] mt-1" style={{ color: "var(--faint)" }}>OF {badges.length} BADGES</p></div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-4 text-center text-xs" style={{ color: "var(--dim)" }}>
        <div className="gcard py-3"><b className="font-stat text-xl block" style={{ color: "var(--ice)" }}>{act.resets}</b>resets</div>
        <div className="gcard py-3"><b className="font-stat text-xl block" style={{ color: "var(--ice)" }}>{act.decisions}</b>decisions</div>
        <div className="gcard py-3"><b className="font-stat text-xl block" style={{ color: "var(--ice)" }}>{act.events}</b>events</div>
      </div>

      <p className="text-[10px] uppercase tracking-widest mt-8 mb-3" style={{ color: "var(--faint)" }}>Badges</p>
      <div className="grid grid-cols-2 gap-3">
        {badges.map((b) => (
          <div key={b.key} className="gcard" style={{ opacity: b.earned ? 1 : 0.45,
            borderColor: b.earned ? "rgba(255,209,102,.35)" : undefined }}>
            <p className="text-sm font-medium" style={{ color: b.earned ? "var(--gold)" : "var(--dim)" }}>
              {b.earned ? "★ " : "○ "}{b.name}
            </p>
            <p className="text-[11px] mt-1" style={{ color: "var(--faint)" }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
