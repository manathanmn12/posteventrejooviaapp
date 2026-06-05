"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Settings() {
  const r = useRouter();
  return (
    <main>
      <h1 className="font-display text-2xl">Settings</h1>
      <div className="gcard mt-6 space-y-3 text-sm" style={{ color: "var(--dim)" }}>
        <p>Refine birth time · export my data · delete my data — Phase 4</p>
        <button className="text-left" style={{ color: "var(--coral)" }}
          onClick={async () => { await createClient().auth.signOut(); r.push("/"); }}>
          Sign out
        </button>
      </div>
      <p className="mt-6 text-xs" style={{ color: "var(--faint)" }}>
        ReJoovia is a self-awareness and reflection tool — not medical care, therapy, or diagnosis.
        If you&apos;re struggling, please reach a qualified professional; in the US, call or text 988.
      </p>
    </main>
  );
}
