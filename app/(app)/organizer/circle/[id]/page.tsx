import Card from "@/components/Card";

// The comparison engine: one friction, one amplifier, one experiment. Never scores or rankings.
export default async function Comparison({ params }: { params: Promise<{ id: string }> }) {
  await params; // Phase 3a: fetch via get_connection_chart RPC
  return (
    <main>
      <p className="text-xs uppercase tracking-[0.25em] text-teal">How you two work together</p>
      <h1 className="font-display text-2xl mt-2">You &amp; Sarah</h1>

      <div className="mt-5 grid grid-cols-2 gap-3 text-center">
        <Card>
          <p className="text-xs opacity-60">You</p>
          <p className="font-display mt-1">Projector</p>
          <p className="text-xs mt-1 opacity-70">Emotional Authority</p>
        </Card>
        <Card>
          <p className="text-xs opacity-60">Sarah</p>
          <p className="font-display mt-1">Generator</p>
          <p className="text-xs mt-1 opacity-70">Sacral Authority</p>
        </Card>
      </div>

      <Card className="mt-5">
        <p className="text-xs uppercase tracking-widest text-coral">One friction to know</p>
        <p className="mt-2 text-sm leading-relaxed">
          Sarah moves on gut response in the moment; your clarity arrives in waves. When she wants
          an answer today and you need to sleep on it, neither of you is wrong — you&apos;re on
          different clocks.
        </p>
      </Card>
      <Card className="mt-4">
        <p className="text-xs uppercase tracking-widest text-teal">One amplifier</p>
        <p className="mt-2 text-sm leading-relaxed">
          You see the system; she powers the build. Decisions you shape and she green-lights tend
          to stick.
        </p>
      </Card>
      <Card className="mt-4">
        <p className="text-xs uppercase tracking-widest text-gold">This week&apos;s experiment</p>
        <p className="mt-2 text-sm leading-relaxed">
          On the next shared decision: you frame it a day early, she gut-checks it live. Notice
          what changes.
        </p>
      </Card>

      <p className="mt-6 text-xs opacity-50">
        Your designs are a reflection tool, not a prescription — and never a measure of anyone&apos;s
        ability. Either of you can close this view for good in Settings.
      </p>
    </main>
  );
}
