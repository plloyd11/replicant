import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
    integrations: [svelte()],
    vite: {
        plugins: [tailwindcss()]
    },
    image: {
        service: {
            entrypoint: 'astro/assets/services/sharp'
        },
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.graphassets.com'
            },
            {
                protocol: 'https',
                hostname: '**.graphassets.com'
            }
        ]
    },
    redirects: {
        "/shop/europe": "/",
        "/shop/negative-life-vinyl": "/",
    }
});
