# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, and any tool that reads
`AGENTS.md`) when working with code in this repository. `CLAUDE.md` imports this file.

## Project Overview

Testimonials app — a small monorepo: an Express + MongoDB REST API with a Vue 3 frontend
that lists and submits testimonials. Runs locally and in production via Docker Compose.

## Repository layout

- `server/` — Express 4.18 REST API, MongoDB 6.3 driver. **The backend.** ES modules.
- `prj-web/` — Vue 3.5 + Vite 6 + TypeScript SPA. **The active, deployed frontend.**
- `prj-webNG/` — Intended Angular rewrite. **Empty on this branch** (only `node_modules`,
  nothing tracked in git). Do not assume Angular code exists here; ignore it unless you are
  scaffolding it from scratch.
- `hosting/` — DNS/M365 email docs for the production domain (has its own `AGENTS.md`).
- `site-backup/` — Static archival snapshot of the live ssdisabilityassoc.com marketing
  site (Google Sites). Not part of the app; do not treat its HTML as source.

> Note: the README and any older docs mention `localhost:3000`, `/api/testimonials`, and an
> nginx reverse-proxy config — these are stale/incorrect for this branch. Trust the details
> below, which were read from the code.

## Backend (`server/`)

```bash
cd server
npm install
npm start          # = node --env-file=../.env server  (MUST run from server/; reads root ../.env)
```

- Entry `server.js`; routes in `routes/testimonial.js`; DB connection in `db/prj_vm.js`.
- Routes are mounted at **`/testimonials`** (not `/api/...`):
  `GET /`, `GET /:id`, `POST /`, `PATCH /:id`, `DELETE /:id`. Root `GET /` returns a banner.
- Default port **5050** (`$PORT`). CORS is wide open (`origin: *`, all methods/headers).
- Mongo URI is assembled from `MONGO_CLIENT_PROTOCOL://MONGO_USERNAME:MONGO_PWD@MONGO_SERVER_AND_PORT`.
  Database name is hardcoded to **`prj_vm`**, collection **`testimonials`**.
- Document shape: `{ name, email, hideEmail (default false), rating, text }` (+ Mongo `_id`).
- No test suite — `npm test` is a failing placeholder.

## Frontend (`prj-web/`)

```bash
cd prj-web
npm install
npm run dev        # Vite dev server
npm run build      # type-check (vue-tsc) + vite build -> dist/
npm run lint       # eslint . --fix
npm run type-check # vue-tsc --build
npm run preview    # serve the production build
```

- Reads **`VITE_SERVER_URL`** at build time. `ApiService` concatenates URL + endpoint
  directly (`fetch(\`${baseUrl}${endpoint}\`)`), so **`VITE_SERVER_URL` must end with `/`**
  (e.g. `http://localhost:5050/`); the app then calls `${VITE_SERVER_URL}testimonials`.
- Key files: `src/App.vue` (fetch/submit logic), `src/components/TestimonialComponent.vue`
  (display + edit form), `src/models/` (`Testimonial.model.ts`, `Rating.enum.ts`).

## Docker / deployment

```bash
docker compose up -d                                                   # full stack (prod-style)
docker compose -f docker-compose.dev.yml --env-file .env up --detach   # MongoDB only, for local dev
```

- `docker-compose.yml` services: **`site`** (builds `./prj-web`, served by nginx *inside that
  image* on port 80, published `${PORT_UI-5173}:80`), **`server`** (`${PORT-5050}`),
  **`mongodb`** (27017, volume `prj_vm_mongodata`). There is no root `nginx.conf` — the only
  nginx is the production stage of `prj-web/Dockerfile`.
- The `site` build passes `API_SERVER_URL=http://server:${PORT}/` → `VITE_SERVER_URL` (note
  the in-network host `server`, and the required trailing slash).
- `docker-compose.dev.yml` is MongoDB-only for running the backend/frontend natively against
  a local DB.

## Environment (`.env` in repo root, required)

```
MONGO_USERNAME=...
MONGO_PWD=...
MONGO_CLIENT_PROTOCOL=mongodb        # or mongodb+srv
MONGO_SERVER_AND_PORT=mongodb:27017
PORT=5050                            # backend port ($PORT)
PORT_UI=5173                         # published port for the site container
VITE_SERVER_URL=http://localhost:5050/   # MUST end with a trailing slash
```
