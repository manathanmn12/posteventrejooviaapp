import Card from "@/components/Card";

const cards = [
  ["Type & Strategy", "unlocked"],
  ["Decision-making (Authority)", "unlocks after 3 check-ins"],
  ["Leadership & communication (Profile)", "unlocks after 7"],
  ["Burnout map (Centers)", "unlocks after 14"],
  ["Your talents (Gates & Channels)", "unlocks after 21"],
  ["Your throughline (Incarnation Cross)", "unlocks after 30"],
];

export default function Design() {
  return (
    <main>
      <h1 className="font-display text-2xl">Your design</h1>
      <p className="mt-2 text-sm opacity-70">Revealed gradually — depth you can actually use beats a data dump.</p>
      {cards.map(([title, status]) => (
        <Card
          key={title}
          className={`mt-4 flex items-center justify-between ${status === "unlocked" ? "unlock" : ""}`}
        >
          <span>{title}</span>
          <span className={`text-xs ${status === "unlocked" ? "text-gold" : "opacity-50"}`}>
            {status}
          </span>
        </Card>
      ))}
    </main>
  );
}
