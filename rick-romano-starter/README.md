# Rick Romano — Starter (Next.js + Vercel + Supabase + Make)

This is a minimal, agent-first starter to ship the Rick recap MVP fast.

## What’s included
- Landing (`/`), Dashboard (`/dashboard`), Episode page (`/e/[id]`)
- Yahoo OAuth handoff routes (`/api/yahoo/start` + `/api/yahoo/callback`) that forward to Make.com
- PostHog analytics wiring (page_view + connect clicks)
- Supabase server helper to fetch Episodes on the server (service role key)
- Tailwind CSS + a simple brand shell

## Quickstart
1. **Create Supabase project** and run the SQL from the plan to create tables + RLS.
2. **Create a public bucket** `episodes` in Supabase Storage for MP3s (public read), or serve signed URLs.
3. **Make.com**: Create 3 scenarios and take their **Webhook URLs**:
   - `CONNECTOR` (provider connect + ingest)
   - `GENERATE` (build script + render + email)
   - (optional) `RENDERER` if you split it
4. **Yahoo OAuth**: set your Yahoo app `redirect_uri` to `https://<your-vercel-app>/api/yahoo/callback`.
5. **Vercel**: Import this repo and set env vars (below). Deploy.

## Environment variables
Create `.env.local` (or set in Vercel):

```
NEXT_PUBLIC_POSTHOG_KEY=phc_...                # optional for client analytics
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

NEXT_PUBLIC_SUPABASE_URL= https://YOUR.supabase.co
SUPABASE_SERVICE_ROLE=  # server-only for Episode fetch (do NOT expose on client)

# Make.com
NEXT_PUBLIC_MAKE_CONNECTOR_URL= https://hook.eu1.make.com/your-connector   # used client-side for Sleeper username connect
NEXT_PUBLIC_MAKE_GENERATE_URL=  https://hook.eu1.make.com/your-generate    # used client-side for "Generate Episode"
MAKE_CONNECTOR_URL= https://hook.eu1.make.com/your-connector               # server-side (Yahoo callback)

# Yahoo
YAHOO_CLIENT_ID= your_id
YAHOO_REDIRECT_URI= https://<your-deploy>/api/yahoo/callback
```

> **Security note:** The `SUPABASE_SERVICE_ROLE` is used **only server-side** to read Episode rows for the shared episode page. Keep it as a **Server Environment Variable** in Vercel, not exposed to the client. For a stricter model, create a dedicated RPC for public episode read with row-level checks.

## How the buttons work
- **Connect Sleeper** (Dashboard): sends `{provider:'sleeper', sleeper_username, season}` to your Make `CONNECTOR` webhook. Make pulls leagues, stores `league_connection`, and triggers an ingest for the last completed week.
- **Connect Yahoo** (Landing): redirects user to Yahoo auth; callback forwards the `code` to Make `CONNECTOR` (server-to-server) to exchange for tokens and continue.
- **Generate Episode**: calls your Make `GENERATE` webhook which builds the script, renders via Play.ht, uploads MP3 to Supabase Storage, and updates `episode` row.

## Styling
Tailwind is set up. Keep it minimal and fast.

## Deployment
- Run locally: `npm i && npm run dev`
- Deploy: connect to Vercel, set environment variables, deploy.

## Next steps
- Add event tracking calls around generate/render success.
- Add Settings page for Disconnect/Delete.
- Harden RLS policies for public episode reads via a dedicated policy or signed URLs.
