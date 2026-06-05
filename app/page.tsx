export default function Landing() {
  return (
    <main className="mx-auto max-w-md px-6 pt-20 pb-12 text-center">
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <div className="orb-wrap"><div className="orb" /><div className="orb-ring" /></div>
      <h1 className="font-display text-4xl mt-6 leading-tight">Your energy has a design. Learn to work with it.</h1>
      <p className="mt-5 leading-relaxed" style={{ color: "var(--dim)" }}>
        A daily alignment companion for professionals — your custom design report, earned chapter by
        chapter. Gifted through OxygenBar360 events.
      </p>
      <a href="/welcome" className="cta inline-block mt-9">I have a gift link</a>
      <p className="mt-4 text-sm" style={{ color: "var(--faint)" }}>No gift link yet? Ask your OxygenBar360 host.</p>
    </main>
  );
}
