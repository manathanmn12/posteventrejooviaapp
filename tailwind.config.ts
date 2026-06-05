import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A1220",        // base background
        midnight: "#101B2E",   // cards
        ivory: "#F4F1EA",      // light surfaces / reports
        mist: "#7DD6E0",       // primary accent (orb continuity)
        sand: "#D8C9A8",       // secondary accent
        sage: "#9CB8A4",       // positive states
        coral: "#E0897D",      // stress states (never alarm-red)
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-outfit)", "sans-serif"],
      },
      borderRadius: { card: "18px" },
    },
  },
  plugins: [],
};
export default config;
