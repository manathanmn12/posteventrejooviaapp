import Orb from "@/components/Orb";

export default function Reveal() {
  return (
    <main className="mx-auto max-w-md px-6 pt-20 text-center">
      <Orb />
      <p className="mt-8 text-xs uppercase tracking-[0.25em] text-mist">Your design</p>
      <h1 className="font-display text-5xl mt-3">Projector</h1>
      <p className="mt-4 opacity-80 leading-relaxed">
        ≈20% of people. Your aura is focused and penetrating — you see systems and people clearly.
        Your strategy: wait to be recognized and invited.
      </p>
      <a href="/report" className="mt-10 inline-block cta rounded-full px-8 py-3">
        Open your report
      </a>
      <p className="mt-3 text-xs opacity-40">(placeholder data — Phase 2 wires the real chart)</p>
    </main>
  );
}
