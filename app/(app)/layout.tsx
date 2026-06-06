"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ensureSession } from "@/lib/store";

const nav = [
  ["Today", "/today"],
  ["Practices", "/practices"],
  ["Mirror", "/mirror"],
  ["Report", "/report"],
  ["Wins", "/wins"],
] as const;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  useEffect(() => { ensureSession(); }, []); // anon-or-local session; never bounces
  return (
    <div className="mx-auto max-w-md min-h-screen flex flex-col">
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <a href="/settings" aria-label="Settings"
        className="fixed top-3 right-3 z-50 w-9 h-9 rounded-full flex items-center justify-center text-sm"
        style={{ background: "rgba(245,251,255,.06)", border: "1px solid rgba(245,251,255,.12)", color: "var(--faint)" }}>⚙</a>
      <div className="flex-1 px-6 pt-12 pb-28">{children}</div>
      <nav className="dock max-w-md mx-auto left-0 right-0">
        {nav.map(([label, href]) => (
          <a key={href} href={href} className={path?.startsWith(href) ? "on" : ""}>{label}</a>
        ))}
      </nav>
    </div>
  );
}
