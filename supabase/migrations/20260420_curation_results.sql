create table if not exists public.curation_results (
  image_name text primary key,
  body_type  text not null,
  updated_at timestamptz not null default now()
);

alter table public.curation_results enable row level security;

create policy "anon select" on public.curation_results for select using (true);
create policy "anon insert" on public.curation_results for insert with check (true);
create policy "anon update" on public.curation_results for update using (true);
create policy "anon delete" on public.curation_results for delete using (true);
