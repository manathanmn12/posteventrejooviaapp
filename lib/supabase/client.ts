import { createBrowserClient } from "@supabase/ssr";

// Publishable values — safe to ship as fallbacks; env vars override when set in Vercel.
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://aliilrbktjhsppmfhija.supabase.co";
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_zUc_Qg1qtdz3OpSbPJNK5Q_-uhm1Nc4";

export function createClient() {
  return createBrowserClient(URL, KEY);
}
