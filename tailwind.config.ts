import type { Config } from "tailwindcss";

// OB360 brand-anchored calm — locked with Atlas 2026-06-05.
// Loud colors are punctuation, not wallpaper.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A1628",      // brand deep navy — base background
        midnight: "#0F1D33", // solid panel fallback
        ice: "#F5FBFF",      // text / light report surfaces
        cyan: "#22E5FF",     // electric cyan — CTAs, orb glow, punctuation ONLY
        teal: "#00C9B1",     // positive states, gradient partner
        gold: "#FFD166",     // unlock / streak moments ONLY
        violet: "#A855F7",   // AI Coach identity
        coral: "#E0897D",    // stress states (never alarm-red)
        // legacy aliases (kept so nothing breaks; prefer the names above)
        ivory: "#F5FBFF",
        mist: "#22E5FF",
        sand: "#FFD166",
        sage: "#00C9B1",
      },
      fontFamily: {
        display: ["var(--font-grotesk)", "sans-serif"], // Space Grotesk — headlines
        sans: ["var(--font-dmsans)", "sans-serif"],     // DM Sans — body
        stat: ["var(--font-bebas)", "sans-serif"],      // Bebas Neue — big numbers only
      },
      borderRadius: { card: "18px" },
    },
  },
  plugins: [],
};
export default config;
