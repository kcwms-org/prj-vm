# AGENTS.md — prj-site

Astro 4 + Tailwind CSS + Vue 3 marketing site for SS Disability Associates, LLC.
Migrated from the Google Sites backup in `../site-backup/`.

## Commands

```bash
cd prj-site
npm install
npm run dev        # Astro dev server (default port 4321)
npm run build      # Type-check + static build → dist/
npm run preview    # Serve the production build locally
npm run type-check # astro check (TypeScript + template types)
```

## Stack

- **Astro 4.x** — static site generator with islands architecture (Node 20 compatible)
- **Tailwind CSS 3** — utility-first styles via `@astrojs/tailwind`
- **Vue 3** — interactive islands via `@astrojs/vue` (no React)

## Structure

```
src/
  layouts/BaseLayout.astro   # shared nav + footer
  pages/                     # one .astro file per route (mirrors site-backup/)
  components/                # reusable Astro + Vue components
  content/testimonials/      # future Astro content collection for testimonials
  styles/global.css          # Tailwind imports
  assets/                    # images, fonts
public/                      # static files served as-is
```

## Node version constraint

Astro 5 requires Node ≥ 22. This project uses Astro 4 to stay compatible with Node 20.
Upgrade Astro to v5 when the host Node version is bumped.

## Content source

Page copy is ported from `../site-backup/` (Firefox complete-page snapshot of
ssdisabilityassoc.com captured 2026-06-23). See that folder's README for page→URL mapping.
