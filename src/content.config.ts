import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const discography = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/discography' }),
    schema: z.object({
        title: z.string(),
        slug: z.string(),
        releaseType: z.enum(['Full Length', 'EP', 'Split', 'Single']),
        releaseDate: z.string(),
        datePublished: z.string(),
        label: z.string(),
        format: z.string(),
        cover: z.string(),
        audioBase: z.string().optional(),
        tracks: z
            .array(
                z.object({
                    num: z.string(),
                    name: z.string(),
                    duration: z.string(),
                    file: z.string(),
                }),
            )
            .optional(),
        reviews: z
            .array(
                z.object({
                    quote: z.string(),
                    source: z.string(),
                    link: z.string(),
                }),
            )
            .optional(),
        musicVideos: z
            .array(
                z.object({
                    id: z.string(),
                    track: z.string(),
                }),
            )
            .optional(),
        lineup: z.array(
            z.object({
                name: z.string(),
                role: z.string(),
            }),
        ),
        credits: z.array(
            z.object({
                label: z.string(),
                text: z.string(),
            }),
        ),
        guestAppearances: z
            .array(
                z.object({
                    name: z.string(),
                    part: z.string(),
                }),
            )
            .optional(),
        numTracks: z.number(),
        albumReleaseType: z.string(),
        additionalArtists: z.array(z.string()).optional(),
        productFilterTerm: z.string().optional(),
    }),
});

export const collections = { discography };
