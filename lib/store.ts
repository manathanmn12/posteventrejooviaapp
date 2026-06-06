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
