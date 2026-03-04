create extension if not exists pgcrypto;
create extension if not exists vector;

insert into storage.buckets (id, name, public)
values ('papers', 'papers', false)
on conflict (id) do nothing;

create table if not exists public.papers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  file_path text not null,
  original_filename text,
  title text,
  status text not null check (status in ('queued', 'processing', 'ready', 'failed')),
  page_count integer,
  file_size_bytes bigint not null,
  ocr_used boolean not null default false,
  failure_code text,
  error_message text,
  processing_attempts integer not null default 0,
  last_processed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.paper_chunks (
  id uuid primary key default gen_random_uuid(),
  paper_id uuid not null references public.papers (id) on delete cascade,
  chunk_index integer not null,
  page_start integer not null,
  page_end integer not null,
  token_count integer not null,
  content text not null,
  embedding vector(1536) not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  paper_id uuid not null references public.papers (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  cited_pages integer[] default '{}'::integer[],
  cited_snippets jsonb default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists papers_user_created_idx on public.papers (user_id, created_at desc);
create index if not exists paper_chunks_paper_chunk_idx on public.paper_chunks (paper_id, chunk_index);
create index if not exists chat_messages_paper_created_idx on public.chat_messages (paper_id, created_at asc);
create index if not exists paper_chunks_embedding_hnsw_idx
  on public.paper_chunks using hnsw (embedding vector_cosine_ops);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists papers_set_updated_at on public.papers;
create trigger papers_set_updated_at
before update on public.papers
for each row
execute function public.set_updated_at();

alter table public.papers enable row level security;
alter table public.paper_chunks enable row level security;
alter table public.chat_messages enable row level security;

create policy "papers_select_own"
on public.papers
for select
to authenticated
using (auth.uid() = user_id);

create policy "papers_insert_own"
on public.papers
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "papers_update_own"
on public.papers
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "papers_delete_own"
on public.papers
for delete
to authenticated
using (auth.uid() = user_id);

create policy "paper_chunks_select_own"
on public.paper_chunks
for select
to authenticated
using (
  exists (
    select 1
    from public.papers
    where public.papers.id = public.paper_chunks.paper_id
      and public.papers.user_id = auth.uid()
  )
);

create policy "chat_messages_select_own"
on public.chat_messages
for select
to authenticated
using (auth.uid() = user_id);

create policy "chat_messages_insert_own"
on public.chat_messages
for insert
to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1
    from public.papers
    where public.papers.id = paper_id
      and public.papers.user_id = auth.uid()
  )
);

create policy "storage_read_own_papers"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'papers'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "storage_insert_own_papers"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'papers'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "storage_update_own_papers"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'papers'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'papers'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create or replace function public.match_paper_chunks(
  query_embedding vector(1536),
  target_paper_id uuid,
  target_user_id uuid,
  match_count integer default 8
)
returns table (
  id uuid,
  page_start integer,
  page_end integer,
  content text,
  similarity double precision
)
language sql
security definer
set search_path = public
as $$
  select
    pc.id,
    pc.page_start,
    pc.page_end,
    pc.content,
    1 - (pc.embedding <=> query_embedding) as similarity
  from public.paper_chunks pc
  join public.papers p on p.id = pc.paper_id
  where pc.paper_id = target_paper_id
    and p.user_id = target_user_id
    and p.user_id = auth.uid()
  order by pc.embedding <=> query_embedding
  limit greatest(match_count, 1);
$$;

grant execute on function public.match_paper_chunks(vector(1536), uuid, uuid, integer) to authenticated;
