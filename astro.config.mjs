import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    integrations: [svelte(), tailwind()],
    image: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.graphassets.com'
            }
        ]
    }
});
