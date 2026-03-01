# PaperTalk

Talk to research papers in real time. Upload a PDF, generate embeddings, and use OpenAI Realtime for voice Q&A with citations.

## Stack
- Next.js (App Router) + TypeScript
- Supabase Postgres + `pgvector`
- Vercel Blob
- OpenAI API (Realtime, Embeddings, Responses)

## Setup
1. Create a Supabase project and run `supabase/schema.sql`.
2. Create a Vercel Blob store and get a read/write token.
3. Configure `.env` (see `.env.example`).

## Key Endpoints
- `POST /api/auth/login` { password }
- `POST /api/upload` (multipart form-data `file`)
- `POST /api/ingest` { documentId }
- `POST /api/retrieve` { documentId, query }
- `POST /api/chat` { documentId, query }
- `GET /api/documents`
- `POST /api/realtime/token` { instructions? }

## Notes
- OCR is triggered automatically if a PDF has low text density.
- Realtime uses ephemeral client secrets. The browser should connect to OpenAI via WebRTC using the returned secret.
- Rate limiting is in-memory (sufficient for hackathon, not production).
 - Default limits: 20MB per PDF, 10 uploads/hour, 60 queries/hour per IP.


\
\
\
c0mpiled-6/pennstate hackathon
