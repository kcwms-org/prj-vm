# AGENTS.md — ss-disability-assoc

Astro 7 + Tailwind CSS 4 + Vue 3 marketing site for SS Disability Associates, LLC.
Migrated from the Astro 4 build in `../../prj-site-old/prj-site/` (see git history there for
the original Google Sites → Astro 4 port).

## Commands

```bash
npm install
npm run dev         # Astro dev server (default port 4321)
npm run build       # astro build -> dist/
npm run preview     # Serve the production build locally
npm run type-check  # astro check (TypeScript + template types)
```

## Stack

- **Astro 7** — static site generator with islands architecture
- **Tailwind CSS 4** — utility-first styles via the `@tailwindcss/vite` plugin (CSS-first
  `@theme` config, not `tailwind.config.mjs`)
- **Vue 3** — available via `@astrojs/vue` for interactive islands (no `.vue` components in
  use yet; add them under `src/components/` as needed)

## Structure

```
src/
  layouts/BaseLayout.astro   # shared nav + footer, imports styles/global.css
  pages/                     # one .astro file per route
  styles/global.css          # Tailwind import + @theme (brand colors, Inter font)
  assets/images/             # source images
public/                      # static files served as-is (favicon, etc.)
```

Path alias `@/*` → `src/*` (see `tsconfig.json`).

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
