# ResumeBot

AI-powered resume reviewer for UMass Amherst students. Upload your resume, select your major, and get personalized feedback from an AI career advisor through a chat interface.

## Tech Stack

- **Backend**: FastAPI + Supabase Python client (PostgREST)
- **Frontend**: React (Vite)
- **Database**: Supabase PostgreSQL
- **AI**: Google Gemini via OpenAI-compatible API
- **PDF Parsing**: PyMuPDF

## Prerequisites

- Python 3.11+
- Node.js 18+
- A [Supabase](https://supabase.com) project (PostgreSQL)
- A [Gemini API key](https://aistudio.google.com/apikey)

## Environment variables

Create a `.env` file at the **repository root** (recommended) or in `backend/`. If both exist, `backend/.env` overrides the root file for duplicate keys.

Copy the template and fill in secrets:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `SUPABASE_URL` | Yes | Project API URL (Dashboard → **Project Settings** → **API** → **Project URL**). Example: `https://<project-ref>.supabase.co`. |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | **service_role** secret key (same **API** page). Server-side only; never expose in the browser. |
| `GEMINI_API_KEY` | Yes | Gemini API key from Google AI Studio. |
| `AI_MODEL` | No | Model id (default: `gemini-2.5-flash`). |
| `AI_BASE_URL` | No | OpenAI-compatible base URL for Gemini (default shown in `.env.example`). |
| `UPLOAD_DIR` | No | Where PDFs are stored (default: `./uploads`, relative to your shell when you start the API). |
| `MAX_UPLOAD_SIZE_MB` | No | Upload limit in MB (default: `5` in code; `.env.example` uses `10`). |

### Supabase: URL, keys, and schema

The API talks to Postgres **through Supabase’s REST layer** (same URL as the JS client), using the **service role** key. You do **not** need a `postgresql://` connection string for this app.

1. Open [supabase.com/dashboard](https://supabase.com/dashboard) and select your project.
2. Go to **Project Settings** → **API**.
3. Copy **Project URL** into `.env` as `SUPABASE_URL`.
4. Copy **service_role** `secret` into `.env` as `SUPABASE_SERVICE_ROLE_KEY` (keep this secret server-side only).

**Tables:** Apply the SQL migration for `sessions` and `messages` once per project (for example with the Supabase SQL editor, CLI migrations, or the Supabase MCP `apply_migration` tool). The app does not run `CREATE TABLE` on startup.

## Run the full app (two terminals)

**Terminal 1 — API**

From the **repository root** (not inside `backend/`):

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cd ..
uvicorn backend.main:app --reload --reload-dir backend --host 127.0.0.1 --port 8000
```

The app expects the package import path `backend.main`, so `uvicorn` must be run from the repo root.

**Terminal 2 — frontend**

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). The Vite dev server proxies `/api` to `http://localhost:8000`.

**Sanity check:** [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health) should return `{"status":"ok"}`.

## Features

- Select from 10 supported majors for tailored feedback
- Upload resume as PDF with drag-and-drop
- Get an instant AI-generated review on upload
- Continue the conversation with follow-up questions
- View and manage past review sessions
- UMass Amherst themed UI (maroon #881c1c)
