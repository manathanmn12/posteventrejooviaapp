import Card from "@/components/Card";

export default function Welcome() {
  return (
    <main className="mx-auto max-w-md px-6 pt-16">
      <h1 className="font-display text-3xl">Welcome.</h1>
      <p className="mt-3 opacity-80">
        Three steps: your email (magic link, no password), your birth details, your design.
      </p>
      <Card className="mt-8">
        <p className="text-sm opacity-70">Phase 2: magic-link auth form lands here.</p>
        <a href="/welcome/birth" className="mt-4 inline-block text-mist">Continue →</a>
      </Card>
    </main>
  );
}
