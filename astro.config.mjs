import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
    integrations: [svelte()],
    vite: {
        plugins: [tailwindcss()]
    },
    image: {
        domains: ['ca-central-1.graphassets.com', 'media.graphassets.com'],
    },
    redirects: {
        "/shop/europe": "/",
        "/shop/negative-life-vinyl": "/",
    }
});
