"use client";
import { useRouter } from "next/navigation";
import { setGoal } from "@/lib/store";
import { GOALS } from "@/lib/content";

export default function GoalStep() {
  const r = useRouter();
  function pick(k: string) { setGoal(k); r.push("/today"); }
  return (
    <main className="mx-auto max-w-md px-6 pt-16 pb-16">
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <p className="text-[10px] uppercase tracking-[0.34em] font-semibold" style={{ color: "var(--cyan)" }}>One last thing</p>
      <h1 className="font-display text-3xl mt-3">What do you most want to shift?</h1>
      <p className="mt-2 text-sm" style={{ color: "var(--dim)" }}>This tunes your daily practice, your insights, and your coach. You can change it anytime.</p>
      <div className="mt-7 space-y-3">
        {GOALS.map((g) => (
          <button key={g.key} onClick={() => pick(g.key)} className="gcard w-full text-left flex items-center justify-between"
            style={{ borderColor: "rgba(34,229,255,.18)" }}>
            <div>
              <b className="font-display text-base block">{g.label}</b>
              <span className="text-xs" style={{ color: "var(--faint)" }}>{g.sub}</span>
            </div>
            <span style={{ color: "var(--cyan)" }}>→</span>
          </button>
        ))}
      </div>
    </main>
  );
}
