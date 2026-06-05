import Card from "@/components/Card";

export default function Coach() {
  return (
    <main>
      <h1 className="font-display text-2xl">
        Alignment Coach <span className="coach-accent">●</span>
      </h1>
      <p className="mt-2 text-sm opacity-70">
        A reflective partner that knows your design and your data. Not a therapist, not a doctor — a
        mirror.
      </p>
      <Card className="coach-card mt-6 text-sm opacity-80">
        Phase 5: streaming conversation lands here, after your check-in history exists for it to
        reflect on.
      </Card>
    </main>
  );
}
