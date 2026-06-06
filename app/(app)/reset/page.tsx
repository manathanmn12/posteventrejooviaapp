"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getState, logActivity } from "@/lib/store";
import { RESET_INTRO, RESET_CLOSE, type HD } from "@/lib/hd";

const PHASES = [["Breathe in", 4000], ["Hold", 4000], ["Breathe out", 6000]] as const;
const CYCLES = 6;

export default function Reset() {
  const r = useRouter();
  const [hd, setHd] = useState<HD | null>(null);
  const [stage, setStage] = useState<"intro" | "run" | "done">("intro");
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { getState().then((s) => setHd(s.hd ?? null)); }, []);

  useEffect(() => {
    if (stage !== "run") return;
    const [, ms] = PHASES[phase];
    timer.current = setTimeout(() => {
      if (phase < PHASES.length - 1) setPhase(phase + 1);
      else if (cycle < CYCLES - 1) { setCycle(cycle + 1); setPhase(0); }
      else { logActivity("reset"); setStage("done"); }
    }, ms);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [stage, phase, cycle]);

  const type = hd?.hd_type ?? "";
  const breathing = stage === "run";
  const scale = !breathing ? 1 : phase === 0 ? 1.35 : phase === 1 ? 1.35 : 0.8;
  const dur = breathing ? PHASES[phase][1] : 600;

  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center text-center px-8"
      style={{ background: "linear-gradient(180deg,#060D18,#0A1628)" }}>
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <button onClick={() => r.push("/today")} className="scene-close">✕</button>

      <div className="orb-wrap" style={{ width: 220, height: 220 }}>
        <div className="orb" style={{ width: 150, height: 150, transform: `scale(${scale})`,
          transition: `transform ${dur}ms ease-in-out`, animation: breathing ? "none" : undefined }} />
        <div className="orb-ring" style={{ animation: breathing ? "none" : undefined }} />
      </div>

      {stage === "intro" && (
        <>
          <p className="text-[10px] uppercase tracking-[0.34em] mt-10" style={{ color: "var(--cyan)" }}>A reset, on us</p>
          <p className="insight mt-3" style={{ maxWidth: "30ch" }}>{RESET_INTRO[type] ?? "Settle in. For the next two minutes, just breathe."}</p>
          <button onClick={() => { setStage("run"); setPhase(0); setCycle(0); }} className="cta mt-8">Begin</button>
          <p className="mt-4 text-xs" style={{ color: "var(--faint)" }}>~2 minutes · sound optional · leave anytime</p>
        </>
      )}
      {stage === "run" && (
        <>
          <h1 className="font-display text-3xl mt-10">{PHASES[phase][0]}</h1>
          <p className="mt-3 text-sm" style={{ color: "var(--faint)" }}>Cycle {cycle + 1} of {CYCLES}</p>
        </>
      )}
      {stage === "done" && (
        <>
          <p className="text-[10px] uppercase tracking-[0.34em] mt-10" style={{ color: "var(--teal)" }}>Reset complete · +5 XP</p>
          <p className="insight mt-3" style={{ maxWidth: "30ch" }}>{RESET_CLOSE[type] ?? "Carry the calm with you."}</p>
          <button onClick={() => r.push("/today")} className="cta mt-8">Back to today</button>
          <button onClick={() => { setStage("intro"); }} className="mt-4 text-sm" style={{ color: "var(--faint)" }}>One more round</button>
        </>
      )}
    </main>
  );
}
