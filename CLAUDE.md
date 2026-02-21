# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Official website and merch store for Replicant (death metal band from NJ) at https://replicant.band. Built with Astro 5 (SSG), Svelte 5 (interactive components), and Tailwind CSS 4. Deployed to Netlify.

## Commands

```bash
npm run dev        # Start dev server (localhost:4321)
npm run build      # Production build to ./dist/
npm run preview    # Preview production build locally
```

No lint or test commands are configured. Use `npm run build` to verify correctness.

## Architecture

**Astro pages** handle routing and static rendering. **Svelte components** (with `client:load`) handle interactivity: navigation, audio player (Howler.js), product filtering. **Snipcart** handles e-commerce via `data-item-*` attributes on buttons.

### Content Collections

Album data lives in `src/content/discography/*.md` as frontmatter (tracks, reviews, lineup, credits, etc.) with markdown body for the album description. Schema defined in `src/content.config.ts`. The dynamic route `src/pages/discography/[slug].astro` renders all album pages from a single template, conditionally showing sections (audio player, press, buy, music videos) based on what data is populated.

### Data Sources

- **Products**: Fetched from Hygraph GraphQL CMS (`PUBLIC_GRAPHCMS_API` env var) at build time, filtered by `productFilterTerm` per album
- **Audio**: Hosted on Cloudinary (`audioBase` + track `file` in frontmatter)
- **Images**: Local images in `src/assets/`, resolved dynamically via `import.meta.glob` in templates. External product images from Graphassets CDN

### Key Files

- `src/layouts/BaseLayout.astro` — Main layout wrapper (SEO meta, JSON-LD, Snipcart script, fonts)
- `src/pages/discography/[slug].astro` — Shared album page template
- `src/pages/discography/index.astro` — Discography listing (pulls from content collection)
- `src/pages/index.astro` — Homepage with product grid
- `src/components/AudioPlayer.svelte` — Track player using Howler.js
- `src/components/GlobalNav.svelte` — Site navigation (Svelte 5 runes)
- `src/utils/sizes.ts` — Product size normalization for Snipcart

### Styling

Tailwind CSS 4 via `@tailwindcss/vite` plugin. Custom theme in `src/styles/global.css` with `--color-replicant-*` palette (dark grays) and `--color-primary` (orange #da9252). Fonts: Iceberg (display), Overpass (body).

## Environment Variables

- `PUBLIC_SNIPCART_API` — Snipcart public API key
- `PUBLIC_GRAPHCMS_API` — Hygraph GraphQL endpoint for products
