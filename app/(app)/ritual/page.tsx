"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getState, logActivity } from "@/lib/store";
import { RITUAL_PHASES } from "@/lib/content";
import { TYPE_META, RESET_CLOSE, type HD } from "@/lib/hd";

export default function Ritual() {
  const r = useRouter();
  const [hd, setHd] = useState<HD | null>(null);
  const [i, setI] = useState(-1); // -1 = intro, 0..n phases, n = done
  const [secs, setSecs] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => { getState().then((s) => setHd(s.hd ?? null)); }, []);

  useEffect(() => {
    if (i < 0 || i >= RITUAL_PHASES.length || paused) return;
    setSecs(RITUAL_PHASES[i].secs);
    timer.current = setInterval(() => {
      setSecs((s) => {
        if (s <= 1) { clearInterval(timer.current!); next(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [i, paused]); // eslint-disable-line react-hooks/exhaustive-deps

  function next() {
    if (i + 1 >= RITUAL_PHASES.length) { logActivity("reset"); if (navigator.vibrate) navigator.vibrate([160,80,80]); setI(RITUAL_PHASES.length); }
    else setI(i + 1);
  }

  const type = hd?.hd_type ?? "";
  const done = i >= RITUAL_PHASES.length;
  const phase = i >= 0 && i < RITUAL_PHASES.length ? RITUAL_PHASES[i] : null;
  const guide = phase
    ? phase.typed === "intention"
      ? `Set one intention that honors how you're wired: ${TYPE_META[type]?.action ?? "move in a way that feels like you today."}`
      : phase.typed === "close"
      ? (RESET_CLOSE[type] ?? "Take this calm with you.")
      : phase.guide
    : "";

  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center text-center px-8"
      style={{ background: "linear-gradient(180deg,#060D18,#0A1628)" }}>
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <button onClick={() => r.push("/today")} className="scene-close">✕</button>

      <div className="orb-wrap" style={{ width: 200, height: 200 }}>
        <div className="orb" style={{ width: 130, height: 130,
          animation: phase?.orb ? "breathe 5s ease-in-out infinite" : "breathe 6s ease-in-out infinite" }} />
        <div className="orb-ring" />
      </div>

      {i < 0 && (
        <>
          <p className="text-[10px] uppercase tracking-[0.34em] mt-10" style={{ color: "var(--cyan)" }}>The ReJoovia Reset</p>
          <h1 className="font-display text-3xl mt-3">Your daily ritual</h1>
          <p className="insight mt-3" style={{ maxWidth: "30ch" }}>Six short phases — about three minutes — to arrive, breathe, and set your day from alignment. The one practice to come back to.</p>
          <button onClick={() => setI(0)} className="cta mt-8">Begin the ritual</button>
        </>
      )}

      {phase && (
        <>
          <p className="text-[10px] uppercase tracking-[0.34em] mt-9" style={{ color: "var(--cyan)" }}>{i + 1} of {RITUAL_PHASES.length} · {phase.title}</p>
          <p className="insight mt-3" style={{ maxWidth: "32ch" }}>{guide}</p>
          <div className="mt-7 flex items-center gap-4">
            <button onClick={() => setPaused((p) => !p)} className="text-sm" style={{ color: "var(--faint)" }}>{paused ? "▶ resume" : "❚❚ pause"}</button>
            <span className="font-stat text-2xl" style={{ color: "var(--cyan)" }}>{secs}</span>
            <button onClick={next} className="text-sm" style={{ color: "var(--faint)" }}>skip →</button>
          </div>
        </>
      )}

      {done && (
        <>
          <p className="text-[10px] uppercase tracking-[0.34em] mt-10" style={{ color: "var(--teal)" }}>Ritual complete · +5 XP</p>
          <p className="insight mt-3" style={{ maxWidth: "30ch" }}>You arrived, you set your day. That&apos;s the whole practice — and it compounds.</p>
          <button onClick={() => r.push("/today")} className="cta mt-8">Carry it into today</button>
        </>
      )}
    </main>
  );
}
