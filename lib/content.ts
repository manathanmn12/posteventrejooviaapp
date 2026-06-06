// Deep content engine — rotating banks keyed to type + authority + weekday + recent trend.
// Deterministic rotation + no-repeat window so the daily experience never feels generic.
import type { HD } from "@/lib/hd";

type Trend = "energy-dip" | "clarity-dip" | "stress-high" | null;

// ---------- Daily insights (observation + reflective hook) ----------
export const INSIGHTS: Record<string, string[]> = {
  Projector: [
    "You see the whole system — that's your gift and your tax. Today, spend it on one thing worth being recognized for, not ten you weren't asked about.",
    "Waiting isn't passive for you; it's strategy. Notice the invitation that's already on the table before you go chasing a new one.",
    "Your energy isn't built for the grind — it's built for the right room. Pick the meeting where your read actually changes the outcome.",
    "Recognition lands different than applause. Today, notice who actually <b>sees</b> how you work — that's where your yes belongs.",
    "When you feel bitter, it's usually a signal you pushed somewhere you weren't invited. Trace today's friction back to its door.",
  ],
  Generator: [
    "Your body knows before your mind does. The thing you keep circling back to today — that pull is data, not distraction.",
    "Frustration is your check-engine light, not a failure. Where did your energy stall yesterday? That's the turn to take.",
    "You're built to light up, not to grind. Find the one task today that gives energy back, and let it set the tempo.",
    "A real yes feels like a lean-in. Test today's biggest ask: does your gut open toward it, or brace against it?",
    "You finish what you start <b>when it's the right start</b>. Before adding anything new, ask if the last yes is still a yes.",
  ],
  "Manifesting Generator": [
    "You're allowed to skip steps — that's the design, not a shortcut. Today, trust the leap your gut already made.",
    "Two things will pull at you at once. You don't have to choose forever, just choose the next move. Momentum sorts the rest.",
    "Speed is your nature; scatter is the trap. Name the one outcome that must go right today and let the rest flex around it.",
    "When boredom hits, that's your cue to pivot — not to power through. Where is today asking you to change lanes?",
    "Inform as you go and the friction drops. One quick heads-up before you move can save an hour of cleanup.",
  ],
  Manifestor: [
    "You're here to start things, not wait for permission. The move you've been sitting on — what's the smallest version you can initiate today?",
    "Informing isn't asking. A two-line heads-up before you act keeps your runway clear and the resistance low.",
    "Your energy comes in bursts, then needs true rest. Push where it counts today, then actually stop — don't idle in the middle.",
    "Anger usually means someone blindsided you, or you blindsided them. Today, get ahead of one reaction by naming your plan first.",
    "You set the tone of a room faster than you think. Decide what tone you want before you walk in.",
  ],
  Reflector: [
    "You read the room so well you forget it isn't all yours. Today's mood — pause and ask whose it actually is.",
    "Your clarity moves on a slower clock, and that's wisdom, not lag. Let the big question sit another day before you answer it.",
    "The right environment changes everything for you. If today feels off, change the room before you question yourself.",
    "You're a mirror for the people around you. Notice who you feel most like yourself with — that's worth protecting.",
    "Consistency for you looks like rhythm, not sameness. Track how you feel across a few days, not a single one.",
  ],
};

// Trend-reactive lines (override the type bank when a pattern is detected)
export const TREND_INSIGHTS: Record<Exclude<Trend, null>, string[]> = {
  "energy-dip": [
    "Your energy has dipped a couple days running. That's not weakness — it's a bill coming due. What can you take <b>off</b> the plate today instead of adding to it?",
    "Two low-energy days in a row is your body asking for a real pause, not a push. Protect one hour today and guard it like a meeting.",
  ],
  "clarity-dip": [
    "Your clarity's been foggy lately. Don't force a big decision through fog — name it, set it down, and let tomorrow's you read it fresh.",
    "When the head is cloudy, the body still knows. Step away from the screen and let the answer surface on a walk.",
  ],
  "stress-high": [
    "Stress has been riding high. Before the next hard thing, take two minutes to reset — you decide better from calm than from clenched.",
    "High load, several days running. One boundary today protects the whole week. What's the one no that buys back the most room?",
  ],
};

// ---------- Aligned-action experiments (≤5 min, workplace-real) ----------
export const EXPERIMENTS: Record<string, string[]> = {
  Projector: [
    "Decline one meeting you weren't specifically needed in — notice the energy you keep.",
    "Wait for one invitation today instead of volunteering. See what comes to you.",
    "Share one sharp observation only with the person who asked. Watch how differently it lands.",
    "Block 60 minutes this afternoon as yours. Recognition starts with recognizing your own limits.",
    "Name one thing you're genuinely good at out loud to someone who can use it.",
  ],
  Generator: [
    "Say no to one thing today that doesn't light you up — small counts.",
    "Start the task you keep avoiding for just 5 minutes; let your gut tell you if it's a real yes.",
    "Before your next yes, pause and feel for the lean-in. If it's not there, it's a no.",
    "Finish one small thing you started. Notice the satisfaction — that's your fuel.",
    "Ask yourself one yes/no question out loud and trust the first gut sound.",
  ],
  "Manifesting Generator": [
    "Drop one task that bores you; double down on the one that pulls.",
    "Skip a step you'd normally force yourself through — see if the result holds.",
    "Give one person a quick heads-up before you change direction today.",
    "Run two things in parallel for an hour and notice which one your energy favors.",
    "Pick the single must-win for today and let the rest flex around it.",
  ],
  Manifestor: [
    "Initiate one thing you've been sitting on — the smallest first move counts.",
    "Inform one person of your plan before you act, and notice the drop in friction.",
    "Push hard for 45 minutes, then fully stop. No idling.",
    "Set the tone of your next meeting in the first 30 seconds, on purpose.",
    "Say what you're going to do before you do it — once, clearly.",
  ],
  Reflector: [
    "Change your environment once today and re-rate how you feel.",
    "Sit with one decision instead of answering it — let it breathe a day.",
    "Notice whose energy you're carrying right now, and set down what isn't yours.",
    "Spend ten minutes with the person who makes you feel most yourself.",
    "Track your mood morning and night today — look for the gap.",
  ],
};

// ---------- Reflection prompts ----------
export const REFLECTIONS: string[] = [
  "Where did your energy actually go yesterday — and was it where you wanted?",
  "What's one thing you said yes to that should have been a no?",
  "Who did you feel most like yourself around this week?",
  "What decision are you avoiding, and what is the avoidance protecting you from?",
  "When did you feel most clear today? What were the conditions?",
  "What drained you this week that you could remove next week?",
  "What did your body know before your mind caught up?",
  "Where did you push when you could have waited?",
  "What would 'enough' look like today, honestly?",
  "What pattern are you starting to notice about how you work best?",
];

// ---------- Identity reinforcement (behavior-triggered) ----------
export const IDENTITY: string[] = [
  "You're becoming someone who protects their energy.",
  "You're becoming someone who decides from clarity, not pressure.",
  "You're becoming someone who notices the pattern before it becomes a problem.",
  "You're becoming someone who rests on purpose, not by collapse.",
  "You're becoming someone who knows the difference between a real yes and a polite one.",
  "You're becoming someone who reads the room without losing themselves in it.",
];

// ---------- Reset modes (breathing variety) ----------
export type ResetMode = { key: string; name: string; intent: string; phases: [string, number][]; cycles: number };
export const RESET_MODES: ResetMode[] = [
  { key: "calm", name: "Calm", intent: "Settle a racing mind", cycles: 4,
    phases: [["Breathe in", 4000], ["Hold", 7000], ["Breathe out", 8000]] },
  { key: "focus", name: "Focus", intent: "Steady before the room", cycles: 5,
    phases: [["Breathe in", 4000], ["Hold", 4000], ["Breathe out", 4000], ["Hold", 4000]] },
  { key: "energize", name: "Lift", intent: "Move a midday dip", cycles: 8,
    phases: [["Breathe in", 2500], ["Breathe out", 2500]] },
  { key: "winddown", name: "Wind down", intent: "Land at day's end", cycles: 5,
    phases: [["Breathe in", 4000], ["Hold", 4000], ["Breathe out", 8000]] },
];

// ---------- selection ----------
function hashPick(seed: number, len: number) { return len ? ((seed * 2654435761) >>> 0) % len : 0; }
function authoritySuffix(hd?: HD) {
  const a = hd?.authority;
  if (a === "Emotional") return " Sit with it past one mood cycle before you commit.";
  if (a === "Sacral") return " Make it a yes/no and trust the first gut sound.";
  if (a === "Splenic") return " Catch your first instinct — it speaks once.";
  return "";
}

export function dailyInsight(hd: HD | undefined, dayCount: number, trend: Trend) {
  if (trend && TREND_INSIGHTS[trend]) {
    const b = TREND_INSIGHTS[trend];
    return b[hashPick(dayCount, b.length)];
  }
  const bank = INSIGHTS[hd?.hd_type ?? "Projector"] ?? INSIGHTS.Projector;
  return bank[hashPick(dayCount, bank.length)] + (dayCount % 3 === 0 ? authoritySuffix(hd) : "");
}
export function dailyExperiment(hd: HD | undefined, dayCount: number) {
  const bank = EXPERIMENTS[hd?.hd_type ?? "Projector"] ?? EXPERIMENTS.Projector;
  return bank[hashPick(dayCount + 7, bank.length)];
}
export function dailyReflection(dayCount: number) {
  return REFLECTIONS[hashPick(dayCount + 3, REFLECTIONS.length)];
}
export function identityLine(checkins: number, resets: number, decisions: number) {
  const i = (checkins + resets * 2 + decisions) % IDENTITY.length;
  return IDENTITY[i];
}

// ---------- Growth Goals (Mindvalley-style onboarding personalization) ----------
export type Goal = { key: string; label: string; sub: string; focus: string };
export const GOALS: Goal[] = [
  { key: "decisions", label: "Make clearer decisions", sub: "trust myself under pressure", focus: "You're here to decide with less second-guessing." },
  { key: "energy", label: "Protect my energy", sub: "stop running on empty", focus: "You're here to spend energy where it actually counts." },
  { key: "leadership", label: "Lead more like myself", sub: "influence without forcing", focus: "You're here to lead from your real strengths." },
  { key: "communication", label: "Communicate better", sub: "be understood, less friction", focus: "You're here to be heard without the clash." },
  { key: "clarity", label: "Find more clarity", sub: "quiet the noise", focus: "You're here to hear yourself think again." },
];
export function goalByKey(k: string) { return GOALS.find((g) => g.key === k); }

// ---------- Signature guided ritual (the ReJoovia Reset — a 6-phase daily practice) ----------
export type Phase = { key: string; title: string; guide: string; secs: number; orb?: boolean; typed?: "intention" | "close" };
export const RITUAL_PHASES: Phase[] = [
  { key: "arrive", title: "Arrive", secs: 25,
    guide: "Put everything down for a few minutes. Feel your feet, your seat, the weight of your body. You have nowhere else to be right now." },
  { key: "breathe", title: "Breathe", secs: 40, orb: true,
    guide: "Let the orb set your pace — in as it grows, out as it settles. Three slow rounds. Nothing to do but follow it." },
  { key: "gratitude", title: "Gratitude", secs: 30,
    guide: "Bring to mind one thing you're genuinely grateful for today. See it clearly. Let yourself actually feel what it gives you." },
  { key: "scan", title: "Energy scan", secs: 30,
    guide: "Where is your energy right now — humming, heavy, scattered, calm? Don't fix it. Just notice it honestly. This is the self-awareness your design runs on." },
  { key: "intention", title: "Intention", secs: 30, typed: "intention",
    guide: "Set one intention for how you want to move through today — in a way that honors how you're wired." },
  { key: "close", title: "Close", secs: 25, typed: "close",
    guide: "Take this calm with you." },
];
