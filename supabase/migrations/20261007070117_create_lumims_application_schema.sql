create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lesson_id text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  last_visited_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lesson_progress_user_id_lesson_id_key unique (user_id, lesson_id)
);

create index lesson_progress_user_id_last_visited_at_idx
  on public.lesson_progress (user_id, last_visited_at desc);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger lesson_progress_set_updated_at
before update on public.lesson_progress
for each row execute function public.set_updated_at();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.lesson_progress enable row level security;

revoke all on table public.profiles from anon;
revoke all on table public.lesson_progress from anon;
grant select, update on table public.profiles to authenticated;
grant select, insert, update, delete on table public.lesson_progress to authenticated;

create policy "Users can view their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Users can view their own lesson progress"
on public.lesson_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users can create their own lesson progress"
on public.lesson_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users can update their own lesson progress"
on public.lesson_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users can delete their own lesson progress"
on public.lesson_progress
for delete
to authenticated
using ((select auth.uid()) = user_id);

revoke execute on function public.handle_new_user() from public;
revoke execute on function public.set_updated_at() from public;
