import Card from "@/components/Card";

// Reveal model (locked 6/05): full chart visible day one — facts are never withheld.
// Practical deep-dives ARRIVE with practice (never "locked"). Placeholder data until Phase 2.
const chart = [
  ["Type & Strategy", "Projector — wait for the invitation"],
  ["Authority", "Emotional — clarity comes in waves"],
  ["Profile", "1/4 — Investigator / Opportunist"],
  ["Centers", "3 defined · 6 open"],
  ["Gates & Channels", "19 gates · 2 channels"],
  ["Incarnation Cross", "Right Angle Cross of Tension"],
];

const deepDives = [
  ["Decision-Making Guide", "arrives at 3 check-ins", false],
  ["Leadership & Communication Playbook", "arrives at 7", false],
  ["Burnout Map", "arrives at 14", false],
  ["Talent Profile", "arrives at 21", false],
  ["Your Throughline", "arrives at 30", false],
] as const;

export default function Design() {
  return (
    <main>
      <h1 className="font-display text-2xl">Your design</h1>
      <p className="mt-2 text-sm opacity-70">
        Your full chart, yours from day one. The deep-dives below arrive as your practice builds.
      </p>

      <p className="mt-6 text-xs uppercase tracking-widest text-teal">Your chart</p>
      {chart.map(([label, value]) => (
        <Card key={label} className="mt-3 flex items-center justify-between gap-4">
          <span className="text-sm opacity-80">{label}</span>
          <span className="text-sm text-right">{value}</span>
        </Card>
      ))}

      <p className="mt-8 text-xs uppercase tracking-widest text-gold">Practical deep-dives</p>
      {deepDives.map(([title, status, arrived]) => (
        <Card
          key={title}
          className={`mt-3 flex items-center justify-between ${arrived ? "unlock" : ""}`}
        >
          <span>{title}</span>
          <span className={`text-xs ${arrived ? "text-gold" : "opacity-50"}`}>{status}</span>
        </Card>
      ))}
      <p className="mt-4 text-xs opacity-40">(placeholder chart — Phase 2 wires your real one)</p>
    </main>
  );
}
