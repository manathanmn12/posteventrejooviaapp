"use client";
import { useEffect, useState } from "react";
import { getHistory, type Day } from "@/lib/store";

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Mirror() {
  const [h, setH] = useState<Day[] | null>(null);
  useEffect(() => { setH(getHistory()); }, []);
  const days = h ?? [];
  const enough = days.length >= 3;

  // weekday averages for the pattern narrative
  const byDow: Record<number, Day[]> = {};
  days.forEach((d) => { const k = new Date(d.date + "T12:00").getDay(); (byDow[k] ||= []).push(d); });
  const avg = (arr: Day[], key: keyof Day) => arr.length ? arr.reduce((s, d) => s + (d[key] as number), 0) / arr.length : 0;

  const narratives: string[] = [];
  if (enough) {
    // best clarity weekday
    const clarityByDow = Object.entries(byDow).map(([k, arr]) => [Number(k), avg(arr, "clarity")] as [number, number]).filter(([, v]) => v > 0);
    if (clarityByDow.length >= 2) {
      const top = clarityByDow.sort((a, b) => b[1] - a[1])[0];
      narratives.push(`Your clarity runs highest on <b>${fullDow(top[0])}s</b> — protect that window for the calls that matter.`);
    }
    // energy after back-to-back
    const lowE = days.slice(-7).filter((d) => d.energy <= 4).length;
    if (lowE >= 2) narratives.push(`Your energy dipped <b>${lowE} of the last 7 days</b>. Watch what those days had in common.`);
    const avgStress = avg(days.slice(-7), "stress");
    if (avgStress >= 6) narratives.push("Your stress has been elevated this week — one boundary protects the next one.");
    const avgDec = avg(days.slice(-7), "decision");
    if (avgDec >= 7) narratives.push("Your decision confidence has been strong lately. Trust the momentum.");
    if (!narratives.length) narratives.push("Your patterns are steady. Keep checking in — the picture sharpens with every day.");
  }

  return (
    <main>
      <p className="text-[10px] uppercase tracking-[0.34em] font-semibold" style={{ color: "var(--cyan)" }}>The mirror</p>
      <h1 className="font-display text-2xl mt-2">What your days are telling you.</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--dim)" }}>
        Not a scoreboard — a reflection. Each orb is a day: brighter teal when your energy beat your stress, dimmer coral when it didn&apos;t.
      </p>

      {!enough ? (
        <div className="gcard mt-6 text-sm" style={{ color: "var(--dim)" }}>
          Check in {3 - days.length} more {3 - days.length === 1 ? "day" : "days"} and your mirror begins to show its patterns.
        </div>
      ) : (
        <>
          <div className="mirror-grid mt-6">
            {days.slice(-14).map((d, i) => {
              const score = d.energy - d.stress;
              const color = score > 1 ? "var(--teal)" : score < -1 ? "var(--coral)" : "var(--cyan)";
              const size = 20 + Math.max(0, d.energy) * 2.4;
              const glow = 8 + d.clarity * 2;
              return (
                <div key={i} className="mirror-cell" title={`${d.date} · E${d.energy} S${d.stress} C${d.clarity}`}>
                  <span className="mirror-orb" style={{ width: size, height: size,
                    background: `radial-gradient(circle at 38% 32%, ${color}, transparent 72%)`,
                    boxShadow: `0 0 ${glow}px ${color}` }} />
                  <span className="mirror-dow">{DOW[new Date(d.date + "T12:00").getDay()][0]}</span>
                </div>
              );
            })}
          </div>

          <p className="text-[10px] uppercase tracking-widest mt-8 mb-3" style={{ color: "var(--faint)" }}>What we notice</p>
          <div className="space-y-3">
            {narratives.map((n, i) => (
              <div key={i} className="gcard text-sm" style={{ color: "var(--dim)" }} dangerouslySetInnerHTML={{ __html: n }} />
            ))}
          </div>
          <p className="mt-6 text-[11px]" style={{ color: "var(--faint)" }}>Patterns are a mirror, not a verdict. You always get the final read.</p>
        </>
      )}
    </main>
  );
}
function fullDow(n: number) { return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][n]; }
