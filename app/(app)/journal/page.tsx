import Card from "@/components/Card";

export default function Journal() {
  return (
    <main>
      <h1 className="font-display text-2xl">Journal</h1>
      <Card className="mt-6">
        <p className="text-sm opacity-70">
          This space is yours. Private by default — the coach reads it only if you allow that in
          Settings.
        </p>
        <textarea className="mt-4 w-full rounded-lg bg-ink/60 p-3 text-sm" rows={5} placeholder="What did you notice today?" />
      </Card>
    </main>
  );
}
