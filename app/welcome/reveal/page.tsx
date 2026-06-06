"use client";
import { useEffect, useState } from "react";
import { getState } from "@/lib/store";
import { TYPE_META, type HD } from "@/lib/hd";

export default function Reveal() {
  const [hd, setHd] = useState<HD | null>(null);
  useEffect(() => {
    getState().then((s) => setHd(s.hd ?? null));
  }, []);
  const meta = hd?.hd_type ? TYPE_META[hd.hd_type] : null;
  return (
    <main className="mx-auto max-w-md px-6 pt-20 pb-16 text-center">
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <div className="orb-wrap"><div className="orb" /><div className="orb-ring" /></div>
      <p className="text-[10px] uppercase tracking-[0.34em] text-[--cyan] font-semibold mt-4">Your design</p>
      <h1 className="font-display text-5xl mt-3">{hd?.hd_type ?? "…"}</h1>
      {meta && (
        <p className="mt-4 insight mx-auto" style={{ maxWidth: "32ch" }}>
          {meta.pct} of people. Your aura is {meta.aura.toLowerCase()}. Strategy: {hd?.strategy}.
        </p>
      )}
      {hd?.time_estimated && (
        <p className="mt-3 text-xs" style={{ color: "var(--gold)" }}>
          Built with an estimated birth time — refine it in Settings to sharpen your decision profile.
        </p>
      )}
      <a href="/report" className="cta inline-block mt-9">Open your report</a>
    </main>
  );
}
