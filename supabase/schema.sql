-- HYDRORA Supabase schema (free tier)
-- Run in Supabase: SQL Editor

-- Extensions (gen_random_uuid)
create extension if not exists pgcrypto;

-- WAITLIST
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  interests text[] not null default '{}',
  terms_accepted boolean not null default false,
  terms_version text,
  consent_at timestamptz,
  source text,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);

-- CONTACT MESSAGES (audit + admin viewing)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  message text,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

-- OUTBOX (queue / audit trail)
create table if not exists public.outbox (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  mode text not null,
  to_email text,
  from_email text,
  subject text,
  payload jsonb,
  status text,
  error text,
  created_at timestamptz not null default now()
);

create index if not exists outbox_created_at_idx on public.outbox (created_at desc);

-- RLS
alter table public.waitlist enable row level security;
alter table public.contact_messages enable row level security;
alter table public.outbox enable row level security;

-- IMPORTANT:
-- This project uses SUPABASE_SERVICE_ROLE_KEY on the server.
-- That key bypasses RLS, so you do not need public policies.
-- If you later move to browser-side writes, add appropriate insert-only policies.
