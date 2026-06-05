import Card from "@/components/Card";

// The host's hub. Organizer sees: who joined + coarse activity ("active this week").
// NEVER: numbers, streak counts, moods, journals. Phase 3a wires real data.
const circle = [
  ["Sarah M.", "Projector", "active this week"],
  ["Alex R.", "Generator", "joined yesterday"],
  ["Jordan K.", "Manifestor", "invited — not opened yet"],
];

export default function OrganizerHub() {
  return (
    <main>
      <p className="text-xs uppercase tracking-[0.25em] text-teal">Your circle</p>
      <h1 className="font-display text-3xl mt-2">You gave 3 people a reset.</h1>
      <p className="mt-2 text-sm opacity-70">
        They got their design because of you. That&apos;s hosting, even after the event.
      </p>

      {circle.map(([name, type, status]) => (
        <Card key={name} className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm">{name}</p>
            <p className="text-xs opacity-60">{type}</p>
          </div>
          <span className="text-xs opacity-50">{status}</span>
        </Card>
      ))}

      <a href="/organizer/invite" className="cta mt-8 block rounded-full py-3 text-center">
        Invite someone
      </a>

      <Card className="mt-6 text-sm opacity-80">
        <p className="text-xs uppercase tracking-widest text-teal">Your event</p>
        <p className="mt-2">
          Mosaic Festival · 214 guests · 87 shared moments — recap and photos land here (Phase 7).
        </p>
      </Card>
      <p className="mt-4 text-xs opacity-40">(placeholder circle — Phase 3a wires real connections)</p>
    </main>
  );
}
