-- ============================================================
-- Matha Furniture - Supabase schema
-- Run this in the Supabase SQL Editor (SQL > New query).
-- ============================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- Tables
-- ------------------------------------------------------------

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text default '',
  image text default '',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category_slug text not null,
  short_description text default '',
  description text default '',
  material text default '',
  dimensions text default '',
  colours text[] default '{}',
  images text[] default '{}',
  price_label text default 'On request',
  featured boolean default false,
  in_stock boolean default true,
  created_at timestamptz default now()
);

create table if not exists banners (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text default '',
  image text default '',
  cta_label text default 'Explore',
  cta_href text default '/products',
  active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  title text default '',
  image text not null,
  category text default 'General',
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text default '',
  rating int default 5,
  quote text default '',
  avatar text default '',
  approved boolean default false,
  created_at timestamptz default now()
);

create table if not exists contact_info (
  id uuid primary key default gen_random_uuid(),
  business_name text default 'Matha Furniture',
  email text default '',
  phone text default '',
  whatsapp text default '',
  instagram text default '',
  facebook text default '',
  locations jsonb default '[]'::jsonb
);

-- ------------------------------------------------------------
-- Row Level Security
--   * Public (anon) can READ everything.
--   * Only authenticated users (admins) can INSERT/UPDATE/DELETE.
-- ------------------------------------------------------------

alter table categories   enable row level security;
alter table products     enable row level security;
alter table banners      enable row level security;
alter table gallery      enable row level security;
alter table testimonials enable row level security;
alter table contact_info enable row level security;

do $$
declare t text;
begin
  foreach t in array array['categories','products','banners','gallery','testimonials','contact_info']
  loop
    execute format('drop policy if exists "public_read_%1$s" on %1$s;', t);
    execute format('create policy "public_read_%1$s" on %1$s for select using (true);', t);

    execute format('drop policy if exists "auth_write_%1$s" on %1$s;', t);
    execute format('create policy "auth_write_%1$s" on %1$s for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- ------------------------------------------------------------
-- Storage bucket for images (public read).
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('matha-media', 'matha-media', true)
on conflict (id) do nothing;

drop policy if exists "public_read_media" on storage.objects;
create policy "public_read_media" on storage.objects
  for select using (bucket_id = 'matha-media');

drop policy if exists "auth_upload_media" on storage.objects;
create policy "auth_upload_media" on storage.objects
  for insert to authenticated with check (bucket_id = 'matha-media');

drop policy if exists "auth_update_media" on storage.objects;
create policy "auth_update_media" on storage.objects
  for update to authenticated using (bucket_id = 'matha-media');

drop policy if exists "auth_delete_media" on storage.objects;
create policy "auth_delete_media" on storage.objects
  for delete to authenticated using (bucket_id = 'matha-media');
