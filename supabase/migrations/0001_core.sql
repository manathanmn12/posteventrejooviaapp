-- ReJoovia Alignment App — Phase 1 core schema
-- Law: RLS deny-by-default. Users reach ONLY their own rows via auth.uid().
-- Gift portal reads via security-definer RPC. Admin/system via service role only.

-- ===== users (mirrors auth.users) =====
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  display_name text,
  role text not null default 'user' check (role in ('user','admin')),
  onboarded_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  intent text,
  timezone text not null default 'America/Los_Angeles',
  notification_prefs jsonb not null default '{}',
  ai_journal_access boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.human_design_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references public.users(id) on delete cascade,
  birth_date date,
  birth_time time,
  time_estimated boolean not null default false,
  birth_city text,
  birth_tz text,
  hd_type text,
  strategy text,
  authority text,
  profile text,
  definition text,
  centers jsonb,
  gates jsonb,
  channels jsonb,
  incarnation_cross text,
  raw_json jsonb,
  api_source text not null default 'humandesignhub.app',
  created_at timestamptz not null default now()
);

create table public.daily_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  date date not null,
  energy smallint check (energy between 1 and 10),
  stress smallint check (stress between 1 and 10),
  clarity smallint check (clarity between 1 and 10),
  decision_confidence smallint check (decision_confidence between 1 and 10),
  reflection_answer text,
  action_key text,
  action_done text check (action_done in ('yes','partly','no')),
  evening_note text,
  created_at timestamptz not null default now(),
  unique (user_id, date)
);
create index on public.daily_checkins (user_id, date desc);

create table public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  body text not null,
  themes text[] not null default '{}',
  source text not null default 'manual' check (source in ('manual','checkin','coach')),
  entry_date date not null default current_date,
  created_at timestamptz not null default now()
);
create index on public.journal_entries (user_id, entry_date desc);

create table public.daily_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  date date not null,
  insight_key text not null,
  body text not null,
  inputs jsonb,
  created_at timestamptz not null default now(),
  unique (user_id, date)
);

create table public.streaks (
  user_id uuid primary key references public.users(id) on delete cascade,
  current int not null default 0,
  longest int not null default 0,
  grace_used_this_month smallint not null default 0,
  last_checkin_date date,
  updated_at timestamptz not null default now()
);

-- ===== gift / event side (admin-managed) =====
create table public.event_organizers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  company text,
  ghl_contact_id text,
  created_at timestamptz not null default now()
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references public.event_organizers(id) on delete cascade,
  name text not null,
  event_date date,
  venue text,
  guests_served int,
  stats jsonb,
  booth_event_ref text,
  created_at timestamptz not null default now()
);

create table public.gift_links (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  organizer_id uuid not null references public.event_organizers(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  sent_at timestamptz,
  opened_at timestamptz,
  activated_user_id uuid references public.users(id) on delete set null,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
create index on public.gift_links (slug);

create table public.event_recaps (
  event_id uuid primary key references public.events(id) on delete cascade,
  headline text,
  message text,
  photo_urls jsonb not null default '[]',
  highlights jsonb not null default '{}',
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  actor text not null default 'user' check (actor in ('user','system','admin')),
  action text not null,
  meta jsonb not null default '{}',
  created_at timestamptz not null default now()
);
create index on public.activity_logs (action, created_at desc);

-- ===== RLS: deny-by-default =====
alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.human_design_profiles enable row level security;
alter table public.daily_checkins enable row level security;
alter table public.journal_entries enable row level security;
alter table public.daily_insights enable row level security;
alter table public.streaks enable row level security;
alter table public.event_organizers enable row level security;
alter table public.events enable row level security;
alter table public.gift_links enable row level security;
alter table public.event_recaps enable row level security;
alter table public.activity_logs enable row level security;

-- Own-row policies (authenticated users only; anon gets NOTHING)
create policy "own row" on public.users for select to authenticated using (id = auth.uid());
create policy "own row update" on public.users for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create policy "own profile" on public.profiles for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own hd" on public.human_design_profiles for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own checkins" on public.daily_checkins for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own journal" on public.journal_entries for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own insights" on public.daily_insights for select to authenticated using (user_id = auth.uid());
create policy "own streak" on public.streaks for select to authenticated using (user_id = auth.uid());

-- organizer/event/gift/recap/activity tables: NO user policies at all.
-- Service role (admin dashboard, cron) bypasses RLS by design.

-- ===== Gift portal access: security-definer RPC keyed by slug =====
create or replace function public.get_gift_portal(p_slug text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'organizer_name', o.name,
    'event_name', e.name,
    'event_date', e.event_date,
    'guests_served', e.guests_served,
    'recap', case when r.published then jsonb_build_object(
        'headline', r.headline, 'message', r.message,
        'photo_urls', r.photo_urls, 'highlights', r.highlights)
      else null end
  )
  from gift_links g
  join event_organizers o on o.id = g.organizer_id
  left join events e on e.id = g.event_id
  left join event_recaps r on r.event_id = e.id
  where g.slug = p_slug
    and (g.expires_at is null or g.expires_at > now());
$$;

revoke all on function public.get_gift_portal(text) from public;
grant execute on function public.get_gift_portal(text) to anon, authenticated;

-- mark gift opened (no data exposure, write-only side effect)
create or replace function public.mark_gift_opened(p_slug text)
returns void
language sql
security definer
set search_path = public
as $$
  update gift_links set opened_at = coalesce(opened_at, now()) where slug = p_slug;
$$;
revoke all on function public.mark_gift_opened(text) from public;
grant execute on function public.mark_gift_opened(text) to anon, authenticated;

-- ===== Share-first additions (2026-06-05, Atlas-approved redesign) =====
-- Mutual-consent connections: type-level chart data only; journals/check-ins/mood NEVER cross this boundary.

create table public.connections (
  id uuid primary key default gen_random_uuid(),
  requester_user_id uuid not null references public.users(id) on delete cascade,
  recipient_user_id uuid not null references public.users(id) on delete cascade,
  relationship text not null default 'teammate'
    check (relationship in ('teammate','coworker','family','friend','other')),
  status text not null default 'pending'
    check (status in ('pending','accepted','revoked')),
  accepted_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  unique (requester_user_id, recipient_user_id),
  check (requester_user_id <> recipient_user_id)
);
create index on public.connections (recipient_user_id, status);

create table public.invites (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  inviter_user_id uuid not null references public.users(id) on delete cascade,
  relationship text not null default 'teammate'
    check (relationship in ('teammate','coworker','family','friend','other')),
  recipient_email text,
  opened_at timestamptz,
  accepted_connection_id uuid references public.connections(id) on delete set null,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);
create index on public.invites (slug);

alter table public.connections enable row level security;
alter table public.invites enable row level security;

-- Either party can see the connection row; only the requester creates; either party can revoke.
create policy "own connections" on public.connections for select to authenticated
  using (requester_user_id = auth.uid() or recipient_user_id = auth.uid());
create policy "request connection" on public.connections for insert to authenticated
  with check (requester_user_id = auth.uid());
create policy "respond or revoke" on public.connections for update to authenticated
  using (requester_user_id = auth.uid() or recipient_user_id = auth.uid())
  with check (requester_user_id = auth.uid() or recipient_user_id = auth.uid());

-- Inviter manages own invites; recipients accept via RPC, never direct table access.
create policy "own invites" on public.invites for select to authenticated
  using (inviter_user_id = auth.uid());
create policy "create invite" on public.invites for insert to authenticated
  with check (inviter_user_id = auth.uid());

-- Comparison data access: an accepted connection exposes the OTHER person's
-- type-level chart fields ONLY through this function (never the raw table).
create or replace function public.get_connection_chart(p_connection_id uuid)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'display_name', u.display_name,
    'hd_type', h.hd_type,
    'strategy', h.strategy,
    'authority', h.authority,
    'profile', h.profile,
    'relationship', c.relationship
  )
  from connections c
  join users u on u.id = case
    when c.requester_user_id = auth.uid() then c.recipient_user_id
    else c.requester_user_id end
  join human_design_profiles h on h.user_id = u.id
  where c.id = p_connection_id
    and c.status = 'accepted'
    and (c.requester_user_id = auth.uid() or c.recipient_user_id = auth.uid());
$$;
revoke all on function public.get_connection_chart(uuid) from public;
grant execute on function public.get_connection_chart(uuid) to authenticated;
