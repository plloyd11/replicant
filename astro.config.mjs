import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';


import sitemap from '@astrojs/sitemap';


export default defineConfig({
    site: 'https://replicant.band',
    integrations: [svelte({
        compilerOptions: {
            experimental: {
                async: true
            }
        }
    }), sitemap()],
    vite: {
        plugins: [tailwindcss()]
    },
    image: {
        domains: ['ca-central-1.graphassets.com', 'media.graphassets.com'],
    },
});
