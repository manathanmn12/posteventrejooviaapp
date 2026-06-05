import Card from "@/components/Card";
import Orb from "@/components/Orb";

// Phase 2: fetch gift link + recap via security-definer RPC keyed by slug.
export default async function GiftPortal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <main className="mx-auto max-w-md px-6 pt-16 pb-12">
      <p className="text-xs uppercase tracking-[0.25em] text-mist text-center">A gift for you</p>
      <h1 className="font-display text-3xl mt-4 text-center leading-snug">
        Thank you for bringing the reset to your event.
      </h1>
      <Card className="mt-8 text-sm leading-relaxed opacity-90">
        Your guests took branded moments home. We made something for you that lasts longer — a
        60-second daily practice built around how <em>you</em> are wired.
        <p className="mt-3 text-xs opacity-60">gift link: {slug} · event recap loads here (Phase 7)</p>
      </Card>
      <div className="mt-10 text-center">
        <Orb size={56} />
        <a
          href="/welcome"
          className="mt-6 inline-block rounded-full bg-mist px-8 py-3 font-medium text-ink"
        >
          Discover your design
        </a>
      </div>
    </main>
  );
}
