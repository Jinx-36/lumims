revoke all on table public.profiles from authenticated;
revoke all on table public.lesson_progress from authenticated;

grant select, update on table public.profiles to authenticated;
grant select, insert, update, delete on table public.lesson_progress to authenticated;
