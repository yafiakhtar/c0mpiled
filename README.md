# PaperTalk

PaperTalk is a Next.js app for uploading private PDFs, processing them in the background, and chatting with grounded, page-cited answers.

## Stack

- Next.js App Router on Vercel
- Supabase Auth, Storage, and Postgres (`pgvector`)
- Vercel Queues for background processing
- OpenAI embeddings for retrieval
- Anthropic Claude for answer generation and OCR fallback

## Local setup

1. Copy `.env.example` to `.env.local` and fill in the required keys.
2. Apply `supabase/migrations/0001_papertalk.sql` to your Supabase project.
3. Install dependencies with `npm install`.
4. Run the app with `npm run dev`.

## Core flow

1. Sign in with a magic link.
2. Upload a PDF into the private `papers` bucket.
3. `POST /api/papers` creates a `queued` paper and publishes a queue job.
4. The queue consumer extracts text, falls back to Claude OCR if needed, chunks text, generates embeddings, and marks the paper `ready`.
5. Once ready, chat uses vector search plus Claude answers with page-linked citations.

## Notes

- V1 uses one persistent thread per paper.
- Chat stays disabled until processing completes.
- Uploads are capped at 20 MB and 50 pages by default.
- The viewer uses short-lived signed URLs generated server-side.
