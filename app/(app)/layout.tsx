"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const nav = [
  ["Today", "/today"],
  ["Report", "/report"],
  ["Journal", "/journal"],
  ["Coach", "/coach"],
  ["Settings", "/settings"],
] as const;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  useEffect(() => {
    createClient().auth.getSession().then(({ data }) => {
      if (!data.session) router.replace("/welcome");
    });
  }, [router]);
  return (
    <div className="mx-auto max-w-md min-h-screen flex flex-col">
      <div className="aurora"><div className="blob b1" /><div className="blob b2" /><div className="blob b3" /></div>
      <div className="flex-1 px-6 pt-12 pb-28">{children}</div>
      <nav className="dock max-w-md mx-auto left-0 right-0">
        {nav.map(([label, href]) => (
          <a key={href} href={href} className={path?.startsWith(href) ? "on" : ""}>{label}</a>
        ))}
      </nav>
    </div>
  );
}
