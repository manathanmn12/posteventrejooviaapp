import Card from "@/components/Card";

export default function Settings() {
  return (
    <main>
      <h1 className="font-display text-2xl">Settings</h1>
      <Card className="mt-6 space-y-3 text-sm">
        <p>☐ Allow the coach to read my journal (off by default)</p>
        <p>Export my data (JSON/CSV) — Phase 2</p>
        <p>Delete my birth details · Delete my account — Phase 2</p>
      </Card>
      <p className="mt-6 text-xs opacity-50">
        ReJoovia is a self-awareness and reflection tool. It is not medical care, mental-health
        treatment, therapy, or diagnosis. If you&apos;re struggling, please reach a qualified
        professional — in the US, call or text 988.
      </p>
    </main>
  );
}
