# ReJoovia Alignment App

**OxygenBar360 — a product of ReJoovia™**

Premium web-based Human Design daily alignment companion. Gifted to event organizers after OxygenBar360 events; built to grow into a personal + team wellness platform.

Canonical product spec: `Atlas Command Center/Projects/ReJoovia/Human-Design-Reset-App/PRODUCT-BLUEPRINT.md`

## Stack
Next.js 15 (App Router, TS) · Tailwind · Supabase (Postgres + Auth, magic link) · humandesignhub.app (chart engine) · Claude API (coach, Phase 5) · Vercel (hosting + cron) · Installable PWA (no native apps)

## Local dev
```bash
npm install
cp .env.example .env.local   # fill values
npm run dev
```

## Database
Migrations live in `supabase/migrations/`. Apply via Supabase MCP/SQL editor or CLI.
Security law: **RLS deny-by-default**; user access via `auth.uid()` policies; gift portal via security-definer RPC; service role server-side only.

## Deploy
Push to `main` → Vercel auto-deploys. Env vars in Vercel project settings (server keys never NEXT_PUBLIC_).

## Phase status
- [x] Phase 1 scaffold (this)
- [ ] Phase 2 onboarding + HD profile (needs HDHUB_API_KEY)
- [ ] Phase 3 daily dashboard …per blueprint §19
