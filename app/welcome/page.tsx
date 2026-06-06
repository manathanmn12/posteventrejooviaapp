"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ensureSession } from "@/lib/store";

export default function Welcome() {
  const r = useRouter();
  const [busy, setBusy] = useState(false);
  async function begin() {
    setBusy(true);
    await ensureSession();
    r.push("/welcome/birth");
  }
  return (
    <main className="mx-auto max-w-md px-6 pt-24 pb-16 text-center">
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <div className="orb-wrap"><div className="orb" /><div className="orb-ring" /></div>
      <p className="text-[10px] uppercase tracking-[0.34em] font-semibold mt-6" style={{ color: "var(--cyan)" }}>Your gift begins</p>
      <h1 className="font-display text-3xl mt-3">No sign-up. Just your design.</h1>
      <p className="mt-3 text-sm" style={{ color: "var(--dim)" }}>
        Two minutes, one question about your birth, and your report opens. Nothing to remember, no password.
      </p>
      <button onClick={begin} disabled={busy} className="cta inline-block mt-9">
        {busy ? "Opening…" : "Begin"}
      </button>
      <p className="mt-4 text-xs" style={{ color: "var(--faint)" }}>
        Your data stays private to you. Add an email later only if you want it on another device.
      </p>
    </main>
  );
}
