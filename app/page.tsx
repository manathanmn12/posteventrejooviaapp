import Orb from "@/components/Orb";

export default function Landing() {
  return (
    <main className="mx-auto max-w-md px-6 pt-20 pb-12 text-center">
      <Orb />
      <h1 className="font-display text-4xl mt-8 leading-tight">
        Your energy has a design. Learn to work with it.
      </h1>
      <p className="mt-5 opacity-80 leading-relaxed">
        A daily alignment companion for professionals — built on Human Design, grounded in your real
        patterns. Currently gifted through OxygenBar360 events.
      </p>
      <a
        href="/gift/demo"
        className="mt-10 inline-block rounded-full bg-mist px-8 py-3 font-medium text-ink"
      >
        I have a gift link
      </a>
      <p className="mt-4 text-sm opacity-50">No gift link yet? Ask your OxygenBar360 host.</p>
    </main>
  );
}
