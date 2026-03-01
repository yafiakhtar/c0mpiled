create extension if not exists pgcrypto;
create extension if not exists vector;

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  blob_url text not null,
  status text not null default 'uploaded',
  page_count integer,
  created_at timestamptz not null default now()
);

create table if not exists chunks (
  id bigserial primary key,
  document_id uuid not null references documents(id) on delete cascade,
  content text not null,
  embedding vector(1536) not null,
  page integer,
  section_title text,
  created_at timestamptz not null default now()
);

create index if not exists chunks_document_id_idx on chunks(document_id);
create index if not exists chunks_embedding_hnsw_idx on chunks using hnsw (embedding vector_cosine_ops);

create table if not exists chat_sessions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references documents(id) on delete cascade,
  title text,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references chat_sessions(id) on delete cascade,
  role text not null,
  content text not null,
  citations jsonb,
  created_at timestamptz not null default now()
);

create or replace function match_chunks(
  query_embedding vector(1536),
  match_count int,
  filter_document_id uuid
)
returns table (
  id bigint,
  content text,
  page integer,
  similarity float
)
language sql
as $$
  select
    chunks.id,
    chunks.content,
    chunks.page,
    1 - (chunks.embedding <=> query_embedding) as similarity
  from chunks
  where chunks.document_id = filter_document_id
  order by chunks.embedding <=> query_embedding
  limit match_count;
$$;
