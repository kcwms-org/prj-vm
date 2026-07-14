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
- **`@tailwindcss/typography`** — powers the `prose` classes used to style rendered markdown

## Structure

```
src/
  layouts/BaseLayout.astro   # shared nav + footer, imports styles/global.css
  pages/                     # one .astro file per route
  content.config.ts          # defines the `pages` content collection (glob loader)
  content/pages/*.md         # long-form markdown content (legal pages, appointments copy)
  styles/global.css          # Tailwind import + @theme (brand colors, Inter font)
  assets/images/             # source images
public/                      # static files served as-is (favicon, etc.)
```

Path alias `@/*` → `src/*` (see `tsconfig.json`).

### Markdown content pages

`the-privacy-policy.astro`, `the-terms-and-conditions.astro`, and `online-appointments.astro`
are thin templates: they call `getEntry('pages', <slug>)` + `render()` from `astro:content`
and drop the result into a `.prose` wrapper. To edit their copy, edit the corresponding
`.md` file in `src/content/pages/` — frontmatter `title`/`description` feed the page `<title>`
and meta description. To add a new markdown-backed page, drop a `.md` file in
`src/content/pages/` (schema: `title`, `description`) and create a matching `.astro` route
following the same pattern.

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
