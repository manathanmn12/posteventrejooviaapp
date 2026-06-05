import Card from "@/components/Card";
import Orb from "@/components/Orb";

export default function Today() {
  return (
    <main>
      <p className="text-sm opacity-60">Friday, June 5 — Day 1</p>
      <div className="mt-6"><Orb /></div>
      <Card className="mt-8">
        <p className="text-xs uppercase tracking-widest text-mist">Today&apos;s insight</p>
        <p className="mt-2 leading-relaxed">
          Welcome to day one. Today, just notice: when did your energy feel like yours — and when
          did it feel borrowed?
        </p>
      </Card>
      <a href="/today/checkin" className="mt-6 block text-center rounded-full bg-mist py-3 font-medium text-ink">
        60-second check-in
      </a>
      <Card className="mt-6">
        <p className="text-xs uppercase tracking-widest text-sand">One aligned action</p>
        <p className="mt-2 text-sm leading-relaxed">
          Say no to one thing today that doesn&apos;t light you up. Small counts.
        </p>
      </Card>
      <p className="mt-6 text-center text-xs opacity-50">Day 1 · Surface level</p>
    </main>
  );
}
