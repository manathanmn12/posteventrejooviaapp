// The Path — an ordered journey that teaches Human Design, woven with the user's own chart.
import type { HD } from "@/lib/hd";

const LINES: Record<string, { name: string; meaning: string }> = {
  "1": { name: "the Investigator", meaning: "you need solid ground — you go deep and want to know WHY before you act" },
  "2": { name: "the Hermit", meaning: "you have natural talent that flows best in your own space, until the right call pulls you out" },
  "3": { name: "the Martyr", meaning: "you learn by doing and bumping into things — your 'mistakes' are how you find what works" },
  "4": { name: "the Opportunist", meaning: "your life moves through relationships — opportunity comes through who you know and trust" },
  "5": { name: "the Heretic", meaning: "people project onto you and look to you for practical solutions — you're here to be useful at scale" },
  "6": { name: "the Role Model", meaning: "you live in three chapters and eventually become the example others learn from" },
};

function profileLines(profile?: string) {
  if (!profile) return null;
  const [a, b] = profile.split("/");
  return { a: LINES[a], b: LINES[b], raw: profile };
}

export type Lesson = {
  key: string;
  title: string;
  kicker: string;
  teach: string;          // the concept, in plain language
  forYou: (hd: HD) => string; // pulled from their actual chart
  takeaway: string;
  coachSeed?: string;     // optional question to carry into the AI coach
};

export const LESSONS: Lesson[] = [
  {
    key: "intro", title: "What this actually is", kicker: "Start here",
    teach: "Human Design is a map of how your energy is wired — built from your exact birth moment. It's not fortune-telling and it's not a box. Think of it like a user manual you were never handed: how you're built to make decisions, where you take on stress, and how to show up without burning out.",
    forYou: () => "Over the next few steps, every idea here gets connected to YOUR chart — so it stops being theory and starts being a mirror.",
    takeaway: "You're not broken. You're designed a specific way — and you can work with it.",
  },
  {
    key: "type", title: "Your Type", kicker: "How your energy works",
    teach: "There are five Types, and your Type describes how your energy is meant to engage the world — the rhythm that, when you honor it, makes life feel less like a fight.",
    forYou: (hd) => `You're a ${hd.hd_type ?? "—"}. That's the engine you're running. Everything else in your design sits on top of this.`,
    takeaway: "Your Type is your operating rhythm. Fighting it is exhausting; using it compounds.",
    coachSeed: "What does being my Type really mean for how I work day to day?",
  },
  {
    key: "strategy", title: "Your Strategy", kicker: "How to enter things",
    teach: "Strategy is the one habit that keeps you out of resistance — how opportunities and decisions are meant to REACH you, instead of you forcing them.",
    forYou: (hd) => `Your strategy: ${hd.strategy ?? "—"}. When you move this way, doors open easier and friction drops. When you skip it, you feel the grind.`,
    takeaway: "Honor your strategy and life stops pushing back so hard.",
  },
  {
    key: "authority", title: "Your Authority", kicker: "How you decide — the big one",
    teach: "Your Authority is your built-in decision-maker — the part of you that actually knows what's right for you, underneath the mental chatter. Most bad calls come from deciding with the head instead of trusting this.",
    forYou: (hd) => `Yours is ${hd.authority ?? "—"} Authority. This is the single most practical thing in your chart — it tells you HOW to trust yourself under pressure. We'll use it every time you open the Decide tool.`,
    takeaway: "Decide from your Authority, not your anxiety.",
    coachSeed: "Walk me through how to use my Authority on a real decision.",
  },
  {
    key: "profile", title: "Your Profile — the numbers", kicker: "What the two numbers mean",
    teach: "That two-number code (like 1/3 or 2/4) is your Profile — the 'costume' your Type wears. The numbers are 'lines,' each with a distinct flavor. The first is conscious (how you experience yourself); the second is unconscious (how others experience you). There are six lines in all.",
    forYou: (hd) => {
      const p = profileLines(hd.profile);
      if (!p || !p.a || !p.b) return "Your profile sharpens once your full chart is computed.";
      return `Your Profile is ${p.raw}. The ${hd.profile?.split("/")[0]} is ${p.a.name} — ${p.a.meaning}. The ${hd.profile?.split("/")[1]} is ${p.b.name} — ${p.b.meaning}. Together that's how you learn, lead, and earn trust.`;
    },
    takeaway: "Your Profile numbers are your style of meeting the world — own both lines.",
    coachSeed: "How do the two lines of my Profile show up in how I lead?",
  },
  {
    key: "centers", title: "Your Centers", kicker: "Defined vs. open",
    teach: "The nine Centers are energy hubs. A DEFINED center is consistent — it's a reliable strength you carry everywhere. An OPEN (undefined) center is where you take in and amplify other people's energy — it's where you're wise but also where you absorb pressure that isn't yours. Open centers are your biggest growth edges and your burnout doorways.",
    forYou: (hd) => `Your defined centers: ${(hd.centers ?? []).join(", ") || "—"}. Those are your steady strengths. Everywhere else, you're reading the room — powerful, but watch what you carry home.`,
    takeaway: "Your strengths are consistent; your open centers are where you absorb the room.",
  },
  {
    key: "gates", title: "Your Gates — the numbers, decoded", kicker: "What all those numbers are",
    teach: "Those numbers (1–64) are Gates — specific themes of energy, each a precise 'flavor' (like a gate of leadership, or of listening, or of new ideas). You have 64 possible; the ones lit up in your chart are the specific talents that are always 'on' for you. They come from where the planets sat at your birth.",
    forYou: (hd) => {
      const g = hd.gates ?? [];
      return g.length ? `You carry ${g.length} active gates — including ${g.slice(0, 6).join(", ")}${g.length > 6 ? "…" : ""}. Each is a consistent capacity you can lean on. You don't need to memorize all 64 — these are simply YOUR always-on themes.` : "Your gates appear once your full chart is computed.";
    },
    takeaway: "Gates are your specific talents. The numbers aren't random — they're your consistent energies.",
    coachSeed: "Which of my gates is most worth leaning into right now?",
  },
  {
    key: "channels", title: "Your Channels", kicker: "Where gates connect",
    teach: "When two gates link up, they form a Channel — a fixed, defining trait that's deeply, reliably YOU. Channels are why your defined centers are defined. They're the throughlines of your personality that don't waver.",
    forYou: (hd) => `Your channels: ${(hd.channels ?? []).join(", ") || "—"}. These are the wiring that makes your strengths consistent — the parts of you people can always count on.`,
    takeaway: "Channels are your fixed traits — the steady wiring underneath everything.",
  },
  {
    key: "cross", title: "Your Incarnation Cross", kicker: "Your throughline",
    teach: "Your Incarnation Cross is the big-picture theme your design keeps circling back to — a life-long arc, not a daily instruction. Held lightly, it's a compass for the kind of contribution that feels like yours.",
    forYou: (hd) => `${hd.incarnation_cross ?? "Your cross"} — in plain terms, the recurring theme your life keeps handing you to work with.`,
    takeaway: "Your Cross is a compass, never a cage. It points; you choose.",
  },
  {
    key: "integrate", title: "Putting it together", kicker: "You did it",
    teach: "Here's the whole stack: your Type is your rhythm, your Strategy is how to enter, your Authority is how to decide, your Profile is your style, your Centers are your strengths and your open edges, and your Gates and Channels are your specific, consistent talents.",
    forYou: (hd) => `You're a ${hd.hd_type ?? "—"} with ${hd.authority ?? "—"} authority and a ${hd.profile ?? "—"} profile. That's not a label — it's a toolkit. From here, the daily practice is just living it, one decision at a time.`,
    takeaway: "You now understand your design. The rest is practice — and your coach is here for it.",
    coachSeed: "Now that I understand my whole chart, what should I focus on first?",
  },
];
