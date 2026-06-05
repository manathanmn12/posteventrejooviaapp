import type { Metadata, Viewport } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "ReJoovia Alignment — your energy has a design",
  description:
    "A daily alignment companion for professionals. Self-awareness, energy patterns, and decision clarity — built on Human Design. OxygenBar360, a product of ReJoovia™.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "ReJoovia" },
};

export const viewport: Viewport = { themeColor: "#0A1220" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        <footer className="px-6 py-8 text-center text-xs opacity-50">
          OxygenBar360 — a product of ReJoovia™ · Self-awareness tool, not medical care, therapy, or
          diagnosis.
        </footer>
      </body>
    </html>
  );
}
