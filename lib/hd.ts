// Human Design content engine — type/authority translation layer (workplace-safe, reflective voice).
export const STRATEGY: Record<string, string> = {
  Generator: "Respond — let life come to you, then follow what lights up",
  "Manifesting Generator": "Respond, then inform — move fast once it lights up",
  Projector: "Wait for the invitation — recognition multiplies you",
  Manifestor: "Inform before you act — it clears your runway",
  Reflector: "Wait a lunar cycle on the big calls — clarity is slow and wise",
};
export const TYPE_META: Record<string, { pct: string; aura: string; insight: string; action: string }> = {
  Generator: { pct: "≈37%", aura: "Open & enveloping",
    insight: "Your energy is a battery that recharges through <b>doing what lights you up</b>. Today, notice one yes that should have been a no.",
    action: "Say no to one thing that doesn't light you up." },
  "Manifesting Generator": { pct: "≈33%", aura: "Open, fast & electric",
    insight: "You're built to <b>move on multiple tracks</b>. Skipping steps is your design, not a flaw — today, let yourself skip one.",
    action: "Drop one task that bores you; double down on one that pulls." },
  Projector: { pct: "≈20%", aura: "Focused & penetrating",
    insight: "You see systems and people clearly. Your power peaks when you're <b>invited in</b> — today, notice where you were invited vs where you pushed.",
    action: "Wait for one invitation today instead of volunteering." },
  Manifestor: { pct: "≈9%", aura: "Closed & impactful",
    insight: "You initiate. Friction comes when others are surprised — <b>informing first</b> is your unlock, not a courtesy.",
    action: "Inform one person before you act, and notice what changes." },
  Reflector: { pct: "≈1%", aura: "Sampling & lunar",
    insight: "You mirror your environment. Today's mood may be <b>the room's, not yours</b> — name whose energy you're carrying.",
    action: "Change your environment once today and re-rate your energy." },
};
export const AUTHORITY_LINE: Record<string, string> = {
  Emotional: "Clarity comes in waves — sleep on the big calls; never decide at the peak or the dip.",
  Sacral: "Your gut answers in the moment — yes/no questions beat open ones.",
  Splenic: "Your knowing is quiet and instant — it won't repeat itself, so listen the first time.",
  Ego: "Your word is your compass — only commit to what you have the will to finish.",
  "Self-Projected": "Talk it out — you hear your truth in your own voice.",
  Mental: "Sound it off trusted people in the right environment — clarity is conversational.",
  Lunar: "Give it a full cycle — time is your authority.",
};
export type Chapter = { n: number; title: string; sub: string; gate: number; body: (hd: HD) => string[] };
export type HD = { hd_type?: string; strategy?: string; authority?: string; profile?: string;
  incarnation_cross?: string; centers?: string[]; gates?: string[]; channels?: string[]; time_estimated?: boolean };
export const CHAPTERS: Chapter[] = [
  { n: 1, title: "Your Type & Strategy", sub: "how your energy engages the world", gate: 0,
    body: (hd) => [
      `Your design is ${hd.hd_type ?? "—"} — ${TYPE_META[hd.hd_type ?? ""]?.aura ?? ""} (${TYPE_META[hd.hd_type ?? ""]?.pct ?? ""} of people).`,
      `Strategy: ${hd.strategy ?? STRATEGY[hd.hd_type ?? ""] ?? "—"}.`,
      "This is the operating rhythm everything else in your report builds on. None of it is a box — it's a lens. You're free to disagree with any of it.",
    ] },
  { n: 2, title: "How You Decide", sub: "your inner authority", gate: 0,
    body: (hd) => [
      `Your authority: ${hd.authority ?? "—"}.`,
      AUTHORITY_LINE[hd.authority ?? ""] ?? "Your decision style is your own — watch what reliably works.",
      "Experiment this week: run one real decision through this lens and notice the difference between deciding and reacting.",
    ] },
  { n: 3, title: "Your Profile", sub: "how you learn and lead", gate: 0,
    body: (hd) => [
      `Profile ${hd.profile ?? "—"}.`,
      "Your profile is the costume your type wears — the style of how you meet people, learn, and earn trust.",
    ] },
  { n: 4, title: "Your Leadership Style", sub: "how you move a room", gate: 3,
    body: (hd) => [
      `As a ${hd.hd_type ?? "—"} with ${hd.authority ?? "—"} authority, your leadership lands through ${hd.hd_type === "Projector" ? "recognition and precision — guide, don't push" : hd.hd_type === "Manifestor" ? "initiation — open doors and inform as you go" : "response — momentum others can feel"}.`,
      "Watch this week: when did people follow you easily? That's the pattern to repeat on purpose.",
    ] },
  { n: 5, title: "Stress & Burnout Map", sub: "where you absorb the room", gate: 7,
    body: (hd) => [
      `Defined centers: ${(hd.centers ?? []).join(", ") || "—"}. Everywhere else, you tend to absorb and amplify the room's energy.`,
      "Burnout rarely starts in your strengths — it starts where you carry what isn't yours. Name one recurring drain this week.",
    ] },
  { n: 6, title: "Your Talents", sub: "your strongest channels", gate: 14,
    body: (hd) => [
      `Active gates: ${(hd.gates ?? []).slice(0, 8).join(", ") || "—"}${(hd.gates?.length ?? 0) > 8 ? "…" : ""}. Channels: ${(hd.channels ?? []).join(", ") || "—"}.`,
      "These are consistent capacities — energy you can lean on under pressure.",
    ] },
  { n: 7, title: "Your Work Rhythm", sub: "designing your week around your design", gate: 21,
    body: () => [
      "Three weeks of check-ins now back this chapter: your best windows, your drain hours, your recovery pattern.",
      "Rhythm beats discipline. Protect your peak window like a meeting with your most important client — you.",
    ] },
  { n: 8, title: "Your Throughline", sub: "the long arc", gate: 30,
    body: (hd) => [
      `${hd.incarnation_cross ?? "Your incarnation cross"} — in plain language: the recurring theme your life keeps handing you.`,
      "Held lightly, it's a compass, not a sentence. Thirty days of practice earned this page — and your full PDF report.",
    ] },
];
export function levelFor(checkins: number) {
  if (checkins >= 30) return { lvl: 5, name: "Mastery" };
  if (checkins >= 21) return { lvl: 4, name: "Alignment" };
  if (checkins >= 14) return { lvl: 3, name: "Rhythm" };
  if (checkins >= 7) return { lvl: 2, name: "Patterns" };
  return { lvl: 1, name: "Surface" };
}
