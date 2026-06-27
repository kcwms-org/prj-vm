# Plan: Astro Marketing Site (prj-site)

**Status:** In progress — scaffold committed, implementation pending

## Context

Migrating the static Google Sites backup (`site-backup/`) to a modern Astro + Tailwind CSS + Vue site. The existing backup is a 9-page business site for SS Disability Associates, LLC. The goal is a primarily static site with an "islands" architecture for future interactive enhancements (testimonials integration, appointment booking).

Branch: `feature/astro-marketing-site`

## What's already scaffolded (in this session)

Files created in `prj-site/`:
- `package.json` — Astro 4.x (Node 20 compatible), @astrojs/tailwind, @astrojs/vue, Vue 3
- `astro.config.mjs` — tailwind + vue integrations, site URL
- `tsconfig.json` — strict TypeScript, `@/*` path alias
- `tailwind.config.mjs` — brand color palette, Inter font
- Directory structure: `src/{pages,layouts,components,content/testimonials,styles,assets}`, `public/`

## Remaining implementation steps

### 1. Base layout (`src/layouts/BaseLayout.astro`)
- Nav with all 9 routes: Home, About, Connect, Testimonials, Privacy Policy, Terms, Q&A, Contacts, Online Appointments
- Footer with address/contact info
- Google Fonts (Inter) in `<head>`

### 2. Pages — one `.astro` file per page
| Route | File | Source content |
|---|---|---|
| `/` | `src/pages/index.astro` | `site-backup/home.html` |
| `/about` | `src/pages/about.astro` | `site-backup/about.html` |
| `/about/connect` | `src/pages/about/connect.astro` | `site-backup/connect.html` |
| `/about/testimonials` | `src/pages/about/testimonials.astro` | `site-backup/testimonials.html` (+ future API island) |
| `/about/the-privacy-policy` | `src/pages/about/the-privacy-policy.astro` | `site-backup/the-privacy-policy.html` |
| `/about/the-terms-and-conditions` | `src/pages/about/the-terms-and-conditions.astro` | `site-backup/the-terms-and-conditions.html` |
| `/q-a` | `src/pages/q-a.astro` | `site-backup/q-a.html` |
| `/contacts` | `src/pages/contacts.astro` | `site-backup/contacts.html` |
| `/online-appointments` | `src/pages/online-appointments.astro` | `site-backup/online-appointments.html` |

### 3. Global styles (`src/styles/global.css`)
- Tailwind base/components/utilities imports

### 4. AGENTS.md for `prj-site/`
- Dev/build commands, env vars, deployment notes

### 5. Install & verify
```bash
cd prj-site && npm install && npm run build
```

### 6. Docker / deployment (future)
- Add `prj-site` service to `docker-compose.yml` alongside existing `site`, `server`, `mongodb`
- Or deploy to Cloudflare Pages / Netlify as standalone static site

## Architecture decisions
- **No React** — Vue islands only for interactivity
- **Astro 4.x** (not 5.x) — constrained by Node 20 on this machine; Astro 5 requires Node 22
- **Testimonials page** will eventually fetch from `server/` API via a Vue island component
- **Content stays in `.astro` files** for now; can migrate to Astro content collections later if copy edits become frequent
