import Card from "@/components/Card";

// THE centerpiece (pivot 6/05): the organizer's custom Human Design report.
// Core chapters ready day one; deeper chapters unlock through play (check-ins + quests).
// PDF download arrives Phase 6. Placeholder data until Phase 2 wires the real chart.

const ready = [
  ["1 · Your Type & Strategy", "Projector — wait for the invitation"],
  ["2 · How You Decide", "Emotional Authority — clarity comes in waves"],
  ["3 · Your Profile", "1/4 — Investigator / Opportunist"],
];

const locked = [
  ["4 · Your Leadership Style", "unlocks at 3 check-ins"],
  ["5 · Stress & Burnout Map", "unlocks at 7"],
  ["6 · Your Talents", "unlocks at 14"],
  ["7 · Your Work Rhythm", "unlocks at 21"],
  ["8 · Your Throughline", "unlocks at 30"],
];

export default function Report() {
  return (
    <main>
      <p className="text-xs uppercase tracking-[0.25em] text-teal">Your design report</p>
      <h1 className="font-display text-3xl mt-2">Written about you. Earned by you.</h1>
      <p className="mt-2 text-sm opacity-70">
        Three chapters are yours from day one. Five more unlock as you play — every check-in and
        quest deepens the report.
      </p>

      {ready.map(([title, sub]) => (
        <Card key={title} className="mt-4">
          <p className="text-sm">{title}</p>
          <p className="mt-1 text-xs text-teal">{sub}</p>
        </Card>
      ))}

      <p className="mt-8 text-xs uppercase tracking-widest text-gold">Unlocks through play</p>
      {locked.map(([title, status]) => (
        <Card key={title} className="mt-3 flex items-center justify-between opacity-80">
          <span className="text-sm">{title}</span>
          <span className="text-xs text-gold">{status}</span>
        </Card>
      ))}

      <button className="cta mt-8 block w-full rounded-full py-3 text-center opacity-60" disabled>
        Download your report (PDF) — unlocks with chapter 8
      </button>
      <p className="mt-3 text-xs opacity-40">(placeholder report — Phase 2 writes yours from your real chart)</p>
    </main>
  );
}
