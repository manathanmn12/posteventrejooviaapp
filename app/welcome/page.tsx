"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Welcome() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");
  async function send() {
    setErr("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/confirm?next=/welcome/birth` },
    });
    if (error) setErr(error.message); else setSent(true);
  }
  return (
    <main className="mx-auto max-w-md px-6 pt-20 pb-16">
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <p className="text-[10px] uppercase tracking-[0.34em] text-[--cyan] font-semibold">Your gift begins</p>
      <h1 className="font-display text-3xl mt-3">First, a way to reach you.</h1>
      <p className="mt-3 text-sm" style={{ color: "var(--dim)" }}>
        No password — we email you a magic link. Your report stays yours, on every device.
      </p>
      {sent ? (
        <div className="gcard mt-8">
          <p className="text-sm">Check your inbox — your link is on its way. Open it on this device.</p>
        </div>
      ) : (
        <div className="gcard mt-8">
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="w-full rounded-xl bg-black/30 border border-white/10 p-4 text-sm outline-none focus:border-[--cyan]"
          />
          <button onClick={send} disabled={!email.includes("@")} className="cta w-full mt-4">
            Email me my link
          </button>
          {err && <p className="mt-3 text-xs" style={{ color: "var(--coral)" }}>{err}</p>}
        </div>
      )}
      <p className="mt-6 text-xs" style={{ color: "var(--faint)" }}>
        One email, one link. No spam — this is a gift, not a funnel.
      </p>
    </main>
  );
}
