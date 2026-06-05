import Card from "@/components/Card";

// Hospitality, never referral. Pre-written greeting, three channels, zero tracking drama.
export default function Invite() {
  return (
    <main>
      <h1 className="font-display text-2xl">Invite someone</h1>
      <p className="mt-2 text-sm opacity-70">
        They&apos;ll get their full design and a daily reset — and you two will see how you work
        together.
      </p>

      <Card className="mt-6">
        <p className="text-xs uppercase tracking-widest text-teal">Your message</p>
        <textarea
          className="mt-3 w-full rounded-lg bg-ink/60 p-3 text-sm"
          rows={3}
          defaultValue="I discovered something in my reset from the event — it's uncannily accurate. Thought you'd appreciate it too."
        />
        <p className="mt-2 text-xs opacity-50">Relationship: teammate · family · friend (adjusts the comparison language)</p>
      </Card>

      <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
        {["WhatsApp", "Email", "Copy link"].map((ch) => (
          <Card key={ch} className="py-4 opacity-70">{ch}</Card>
        ))}
      </div>

      <p className="mt-6 text-xs opacity-50">
        What they share with you if they accept: their Type, Strategy, Authority, Profile. What
        stays theirs alone: journal, check-ins, moods, coach conversations. Always.
      </p>
      <p className="mt-3 text-xs opacity-40">(Phase 3a wires live invite links)</p>
    </main>
  );
}
