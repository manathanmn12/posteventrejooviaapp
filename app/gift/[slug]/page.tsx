import { createClient } from "@/lib/supabase/server";

export default async function GiftPortal({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase.rpc("rj_get_gift", { p_slug: slug });
  supabase.rpc("rj_open_gift", { p_slug: slug }).then(() => {});
  const g = data as { organizer_name?: string; event_name?: string; guests_served?: number } | null;
  return (
    <main className="mx-auto max-w-md px-6 pt-16 pb-12">
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <p className="text-[10px] uppercase tracking-[0.34em] text-center font-semibold" style={{ color: "var(--cyan)" }}>A gift for you</p>
      <h1 className="font-display text-3xl mt-4 text-center leading-snug">
        {g?.organizer_name ? `${g.organizer_name} — thank you for bringing the reset${g.event_name ? ` to ${g.event_name}` : ""}.` : "Thank you for bringing the reset to your event."}
      </h1>
      <div className="gcard mt-8 text-sm leading-relaxed" style={{ color: "var(--dim)" }}>
        {g?.guests_served ? `${g.guests_served} guests took a breath with us. ` : "Your guests took branded moments home. "}
        We made something for you that lasts longer — your own design report, written from how <em style={{ color: "var(--ice)" }}>you</em> are wired, that deepens every day you use it.
      </div>
      <div className="mt-10 text-center">
        <div className="orb-wrap" style={{ width: 120, height: 120 }}><div className="orb orb-sm" /><div className="orb-ring" /></div>
        <a href="/welcome" className="cta inline-block mt-6">Discover your design</a>
      </div>
    </main>
  );
}
