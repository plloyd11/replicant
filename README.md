# Replicant

Official website and merch store for [Replicant](https://replicant.band) — death metal from NJ.

Built with Astro 5, Svelte 5, and Tailwind CSS 4. E-commerce powered by Snipcart with product data from Hygraph. Deployed to Netlify.

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |

## Environment Variables

| Variable              | Description                           |
| :-------------------- | :------------------------------------ |
| `PUBLIC_SNIPCART_API` | Snipcart public API key               |
| `PUBLIC_GRAPHCMS_API` | Hygraph GraphQL endpoint for products |
