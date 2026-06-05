import Card from "@/components/Card";

export default function BirthData() {
  return (
    <main className="mx-auto max-w-md px-6 pt-16">
      <h1 className="font-display text-3xl">Your design starts at your first breath.</h1>
      <Card className="mt-8 space-y-4 text-sm">
        <p>Birth date · Birth time (as exact as you can — it sharpens your decision-making profile) · Birth city.</p>
        <p className="opacity-60">
          ☐ I don&apos;t know my birth time — we&apos;ll use a midday estimate and mark what depends on it.
        </p>
        <p className="text-xs opacity-50">
          Your birth details are used once to compute your chart, stored encrypted, never shared,
          never sold. Delete them anytime.
        </p>
        <a href="/welcome/reveal" className="inline-block text-mist">Compute my chart → (Phase 2: hd-chart API)</a>
      </Card>
    </main>
  );
}
