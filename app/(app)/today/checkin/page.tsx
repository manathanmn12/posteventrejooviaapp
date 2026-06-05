import Card from "@/components/Card";

const sliders = [
  ["Energy", "How&apos;s your energy, honestly?"],
  ["Stress", "What&apos;s your load right now?"],
  ["Clarity", "How clear is your head?"],
  ["Decisions", "How confident are you in today&apos;s calls?"],
];

export default function Checkin() {
  return (
    <main>
      <h1 className="font-display text-2xl">Check-in</h1>
      {sliders.map(([label, q]) => (
        <Card key={label} className="mt-4">
          <p className="text-xs uppercase tracking-widest text-mist">{label}</p>
          <p className="mt-1 text-sm" dangerouslySetInnerHTML={{ __html: q }} />
          <input type="range" min={1} max={10} defaultValue={5} className="mt-3 w-full accent-[#22E5FF]" />
        </Card>
      ))}
      <Card className="mt-4">
        <p className="text-xs uppercase tracking-widest text-sand">Reflection</p>
        <p className="mt-1 text-sm">Where did yesterday&apos;s energy actually go?</p>
        <textarea className="mt-3 w-full rounded-lg bg-ink/60 p-3 text-sm" rows={3} placeholder="Two honest lines beat ten polished ones." />
      </Card>
      <a href="/today" className="mt-6 block text-center cta rounded-full py-3">
        Done — see today&apos;s insight
      </a>
    </main>
  );
}
