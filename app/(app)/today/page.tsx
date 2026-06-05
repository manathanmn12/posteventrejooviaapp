import Card from "@/components/Card";
import Orb from "@/components/Orb";

// The game loop: check-in + quest + streak/level. Every action feeds the Report.
export default function Today() {
  return (
    <main>
      <div className="flex items-center justify-between">
        <p className="text-sm opacity-60">Friday, June 5</p>
        <p className="text-xs">
          <span className="font-stat text-base text-cyan">DAY 1</span>
          <span className="opacity-50"> · Level 1 — Surface</span>
        </p>
      </div>
      <div className="mt-6"><Orb /></div>

      <Card className="mt-8">
        <p className="text-xs uppercase tracking-widest text-mist">Today&apos;s insight</p>
        <p className="mt-2 leading-relaxed">
          Welcome to day one. Today, just notice: when did your energy feel like yours — and when
          did it feel borrowed?
        </p>
      </Card>

      <a href="/today/checkin" className="cta mt-6 block rounded-full py-3 text-center">
        60-second check-in
      </a>

      <Card className="unlock mt-6">
        <p className="text-xs uppercase tracking-widest text-gold">This week&apos;s quest</p>
        <p className="mt-2 text-sm leading-relaxed">
          Say no to one thing that doesn&apos;t light you up — 3 times this week.
        </p>
        <p className="mt-2 text-xs opacity-60">Progress: 0 / 3 · completes → Leadership chapter moves closer</p>
      </Card>

      <p className="mt-6 text-center text-xs opacity-50">
        2 check-ins until your Leadership Style chapter unlocks
      </p>
    </main>
  );
}
