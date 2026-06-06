"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getState, logActivity } from "@/lib/store";
import { RESET_INTRO, RESET_CLOSE, type HD } from "@/lib/hd";
import { RESET_MODES } from "@/lib/content";

function ResetInner() {
  const r = useRouter();
  const params = useSearchParams();
  const mode = RESET_MODES.find((m) => m.key === params.get("mode")) ?? RESET_MODES[0];
  const PHASES = mode.phases;
  const CYCLES = mode.cycles;

  const [hd, setHd] = useState<HD | null>(null);
  const [stage, setStage] = useState<"intro" | "run" | "done">("intro");
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { getState().then((s) => setHd(s.hd ?? null)); }, []);

  useEffect(() => {
    if (stage !== "run") return;
    const ms = PHASES[phase][1];
    timer.current = setTimeout(() => {
      if (phase < PHASES.length - 1) setPhase(phase + 1);
      else if (cycle < CYCLES - 1) { setCycle(cycle + 1); setPhase(0); }
      else {
        logActivity("reset");
        if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate([180, 90, 90]);
        setStage("done");
      }
    }, ms);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [stage, phase, cycle]); // eslint-disable-line react-hooks/exhaustive-deps

  const type = hd?.hd_type ?? "";
  const breathing = stage === "run";
  const label = breathing ? PHASES[phase][0] : "";
  const expanding = label.includes("in");
  const holding = label === "Hold";
  const scale = !breathing ? 1 : expanding ? 1.4 : holding ? 1.4 : 0.78;
  const dur = breathing ? PHASES[phase][1] : 700;
  const orbClass = stage === "done" ? "orb bloom" : "orb";
  const phaseColor = !breathing ? "" : expanding
    ? "radial-gradient(circle at 38% 32%,rgba(34,229,255,1),var(--cyan) 45%,rgba(34,229,255,.3) 80%)"
    : holding
    ? "radial-gradient(circle at 38% 32%,rgba(140,255,240,.95),var(--teal) 45%,rgba(0,201,177,.3) 80%)"
    : "radial-gradient(circle at 38% 32%,rgba(140,255,240,.5),var(--teal) 45%,rgba(34,229,255,.2) 80%)";

  return (
    <main className="fixed inset-0 flex flex-col items-center justify-center text-center px-8"
      style={{ background: "linear-gradient(180deg,#060D18,#0A1628)" }}>
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <button onClick={() => r.push("/practices")} className="scene-close">✕</button>

      <div className="orb-wrap" style={{ width: 240, height: 240 }}>
        <div className={orbClass} style={{ width: 150, height: 150,
          transform: stage === "done" ? undefined : `scale(${scale})`,
          transition: `transform ${dur}ms ease-in-out, background ${dur}ms ease`,
          animation: breathing ? "none" : undefined,
          background: breathing ? phaseColor : undefined }} />
        <div className="orb-ring" style={{ animation: breathing ? "none" : undefined }} />
      </div>

      {stage === "intro" && (
        <>
          <p className="text-[10px] uppercase tracking-[0.34em] mt-10" style={{ color: "var(--cyan)" }}>{mode.name} · {mode.intent}</p>
          <p className="insight mt-3" style={{ maxWidth: "30ch" }}>{RESET_INTRO[type] ?? "Settle in. For the next couple of minutes, just breathe."}</p>
          <button onClick={() => { setStage("run"); setPhase(0); setCycle(0);
            if (navigator.vibrate) navigator.vibrate(40); }} className="cta mt-8">Begin</button>
          <p className="mt-4 text-xs" style={{ color: "var(--faint)" }}>{PHASES.map((p) => p[1] / 1000).join("-")} breath · {CYCLES} cycles · leave anytime</p>
        </>
      )}
      {stage === "run" && (
        <>
          <h1 className="font-display text-4xl mt-10" style={{ letterSpacing: "-.01em" }}>{label}</h1>
          <p className="mt-3 text-sm" style={{ color: cycle >= CYCLES - 2 ? "var(--gold)" : "var(--faint)" }}>Cycle {cycle + 1} of {CYCLES}</p>
        </>
      )}
      {stage === "done" && (
        <>
          <p className="text-[10px] uppercase tracking-[0.34em] mt-10" style={{ color: "var(--teal)" }}>Reset complete · +5 XP</p>
          <p className="insight mt-3" style={{ maxWidth: "30ch" }}>{RESET_CLOSE[type] ?? "Carry the calm with you."}</p>
          <button onClick={() => r.push("/today")} className="cta mt-8">Back to today</button>
          <button onClick={() => { setStage("intro"); }} className="mt-4 text-sm" style={{ color: "var(--faint)" }}>Another round</button>
        </>
      )}
    </main>
  );
}

export default function Reset() {
  return <Suspense fallback={<main className="fixed inset-0" style={{ background: "#0A1628" }} />}><ResetInner /></Suspense>;
}
