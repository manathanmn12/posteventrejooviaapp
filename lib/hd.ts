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

// ---- Reset ritual (breathing) — type-personalized open/close ----
export const RESET_INTRO: Record<string, string> = {
  Generator: "Let your body lead. As you breathe, notice what feels like a yes.",
  "Manifesting Generator": "You move fast — this is permission to slow to one thing: your breath.",
  Projector: "You don't have to earn this rest. Let the air come to you.",
  Manifestor: "Nothing to initiate here. Just let the breath move on its own.",
  Reflector: "Let the room settle. For these minutes, only your own rhythm matters.",
};
export const RESET_CLOSE: Record<string, string> = {
  Generator: "Carry that yes with you. Spend your energy where it lit up.",
  "Manifesting Generator": "One track at a time today. You just proved you can.",
  Projector: "Guard this calm. Step back in only where you're invited.",
  Manifestor: "Move when you're ready — and let one person know before you do.",
  Reflector: "Notice whose energy you pick up next. You get to choose your room.",
};

// ---- Decision Helper — process keyed to inner Authority ----
export const DECISION_GUIDE: Record<string, { headline: string; steps: string[] }> = {
  Emotional: { headline: "Your clarity rides a wave — don't decide at the peak or the pit.",
    steps: ["Name the decision out loud, then set it down.", "Sleep on it — let one full emotional cycle pass.",
      "Re-read it tomorrow: does it still feel true when you're neutral?", "If it's a yes on the calm days too, move."] },
  Sacral: { headline: "Your gut answers in the moment — make it a yes/no question.",
    steps: ["Rephrase it so the answer is yes or no.", "Ask it out loud and listen for the gut sound, not the head.",
      "Trust the immediate response — the first one.", "If there's no clear gut yes, it's a no for now."] },
  Splenic: { headline: "Your knowing is quiet and instant — it speaks once.",
    steps: ["Get still and ask once.", "Catch the very first impression — it won't repeat.",
      "Don't argue it into the ground.", "Act on the quiet signal, not the loud fear."] },
  Ego: { headline: "Only commit to what you have the will and want to finish.",
    steps: ["Ask: do I actually want this — for me?", "Check your capacity honestly, not your guilt.",
      "If your heart's not in it, decline cleanly.", "Promise only what you'll keep."] },
  "Self-Projected": { headline: "You hear your truth in your own voice — talk it out.",
    steps: ["Call someone you trust and think out loud.", "Listen to what YOU say, not their advice.",
      "Notice where your voice lifts vs. flattens.", "Decide from the direction that sounded like you."] },
  Mental: { headline: "Clarity is conversational — sound it out in the right places.",
    steps: ["Talk it through with a few trusted people.", "Notice the environment where it gets clear.",
      "Don't decide in the room — let it settle after.", "Choose once the noise quiets."] },
  Lunar: { headline: "Time is your authority — give the big ones a full cycle.",
    steps: ["Name it, then deliberately wait.", "Revisit it across ~28 days and different rooms.",
      "Watch how it reads in each mood and place.", "Decide only once it's stayed consistent."] },
};

// ---- Event Mode — pre/post rituals for the days they run an event ----
export const EVENT_PRE: Record<string, string> = {
  Generator: "You're the engine of this room. Before doors open, find the part you're genuinely excited to do — lead from there.",
  "Manifesting Generator": "You'll juggle ten things today. Pick the ONE that must go right, anchor to it, let the rest flow.",
  Projector: "Don't run the floor on raw push. Position yourself to be seen, guide the key people, and let others carry the load.",
  Manifestor: "Set the tone early. Brief your team on the plan before it starts so your moves never blindside them.",
  Reflector: "You'll feel this whole room. Walk it once while it's empty, set your baseline, so you can read what shifts.",
};
export const EVENT_POST: Record<string, string> = {
  Generator: "You gave real energy today. Don't immediately refill the calendar — let your body empty out first.",
  "Manifesting Generator": "You moved fast for hours. Pick one slow thing tonight; let your system catch up to you.",
  Projector: "You held a lot of people in focus. That's expensive for you — protect tomorrow morning, no early asks.",
  Manifestor: "The push is done. Stop initiating for the night; let yourself land before the next thing.",
  Reflector: "You absorbed everyone's day. Change your environment, shed what isn't yours, and re-rate how you actually feel.",
};
