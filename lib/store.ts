"use client";
// Unified data layer — no email, no magic links.
// Tries Supabase anonymous session (real cross-device persistence once enabled in dashboard);
// falls back to browser-local storage so the app is fully usable with zero setup.
import { createClient } from "@/lib/supabase/client";
import type { HD } from "@/lib/hd";

const KEY = "rj_local_v1";
const MODE = "rj_mode"; // "cloud" | "local"

type Local = {
  display_name?: string;
  hd?: HD;
  checkins: string[]; // ISO dates, unique
  streak: number;
  longest: number;
  last?: string;
};

function readLocal(): Local {
  try { return JSON.parse(localStorage.getItem(KEY) || "") as Local; }
  catch { return { checkins: [], streak: 0, longest: 0 }; }
}
function writeLocal(l: Local) { localStorage.setItem(KEY, JSON.stringify(l)); }
function mode() { return localStorage.getItem(MODE); }
const todayISO = () => new Date().toISOString().slice(0, 10);

export type AppState = {
  user?: { display_name?: string };
  hd?: HD;
  streak?: { current: number; longest: number };
  checkin_count?: number;
  today_done?: boolean;
  mode?: "cloud" | "local";
};

// Establish a session (anonymous cloud, or local fallback). Safe to call repeatedly.
export async function ensureSession() {
  const sb = createClient();
  const { data } = await sb.auth.getSession();
  if (data.session) {
    await sb.rpc("rj_ensure_user");
    localStorage.setItem(MODE, "cloud");
    return;
  }
  const { error } = await sb.auth.signInAnonymously();
  if (!error) {
    await sb.rpc("rj_ensure_user");
    localStorage.setItem(MODE, "cloud");
    return;
  }
  // anonymous disabled → local mode
  localStorage.setItem(MODE, "local");
  if (!localStorage.getItem(KEY)) writeLocal({ checkins: [], streak: 0, longest: 0 });
}

export async function saveChart(chart: Record<string, unknown>) {
  if (mode() === "local") {
    const l = readLocal();
    l.hd = chart as HD;
    writeLocal(l);
    return;
  }
  await createClient().rpc("rj_save_chart", { p: chart });
}

export async function getState(): Promise<AppState> {
  if (mode() === "local") {
    const l = readLocal();
    return {
      user: { display_name: l.display_name },
      hd: l.hd,
      streak: { current: l.streak, longest: l.longest },
      checkin_count: l.checkins.length,
      today_done: l.last === todayISO(),
      mode: "local",
    };
  }
  const { data } = await createClient().rpc("rj_get_state");
  return { ...(data ?? {}), mode: "cloud" };
}

export async function signOut() {
  try { await createClient().auth.signOut(); } catch { /* local mode has no session */ }
  localStorage.removeItem(KEY);
  localStorage.removeItem(MODE);
  localStorage.removeItem(ACT);
}

// ---- Engagement activity (resets / decisions / events) — lightweight, localStorage in both modes ----
const ACT = "rj_activity_v1";
export type Activity = { resets: number; decisions: number; events: number; eventPre: number; eventPost: number };
const ZERO: Activity = { resets: 0, decisions: 0, events: 0, eventPre: 0, eventPost: 0 };

export function getActivity(): Activity {
  try { return { ...ZERO, ...JSON.parse(localStorage.getItem(ACT) || "") }; } catch { return { ...ZERO }; }
}
export function logActivity(kind: "reset" | "decision" | "event-pre" | "event-post") {
  const a = getActivity();
  if (kind === "reset") a.resets++;
  if (kind === "decision") a.decisions++;
  if (kind === "event-pre") { a.events++; a.eventPre++; }
  if (kind === "event-post") { a.events++; a.eventPost++; }
  localStorage.setItem(ACT, JSON.stringify(a));
  return a;
}

export type Badge = { key: string; name: string; desc: string; earned: boolean };
export function computeBadges(checkins: number, streak: number, a: Activity): Badge[] {
  return [
    { key: "first-breath", name: "First Breath", desc: "Complete your first reset", earned: a.resets >= 1 },
    { key: "streak-3", name: "3-Day Rhythm", desc: "Check in 3 days running", earned: streak >= 3 },
    { key: "streak-7", name: "7-Day Rhythm", desc: "Check in 7 days running", earned: streak >= 7 },
    { key: "clear-decision", name: "Clear Decision", desc: "Run a choice through your design", earned: a.decisions >= 1 },
    { key: "event-ready", name: "Event Ready", desc: "Ground before running an event", earned: a.eventPre >= 1 },
    { key: "recovered", name: "Recovered", desc: "Reset after an event", earned: a.eventPost >= 1 },
    { key: "energy-aware", name: "Energy Aware", desc: "Reach 7 check-ins", earned: checkins >= 7 },
    { key: "pattern-spotter", name: "Pattern Spotter", desc: "Reach 14 check-ins", earned: checkins >= 14 },
  ];
}
export function xpTotal(checkins: number, a: Activity) {
  return checkins * 10 + a.resets * 5 + a.decisions * 5 + a.events * 15;
}

export async function submitCheckin(p: {
  p_energy: number; p_stress: number; p_clarity: number; p_decision: number; p_reflection: string;
}) {
  if (mode() === "local") {
    const l = readLocal();
    const t = todayISO();
    if (l.last !== t) {
      const yest = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
      l.streak = l.last === yest ? l.streak + 1 : 1;
      l.longest = Math.max(l.longest, l.streak);
      l.last = t;
      if (!l.checkins.includes(t)) l.checkins.push(t);
      writeLocal(l);
    }
    return;
  }
  await createClient().rpc("rj_submit_checkin", p);
}
