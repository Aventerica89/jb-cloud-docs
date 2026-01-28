import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

const versionChangeSchema = z.object({
	version: z.string(),
	date: z.string(),
	changes: z.array(z.string()),
	appVersion: z.string().optional(),
});

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Per-doc versioning
				docVersion: z.string().optional(),
				appVersion: z.string().optional(),
				appName: z.string().optional(),
				versionHistory: z.array(versionChangeSchema).optional(),
				// Badge control
				isNew: z.boolean().optional(),
				newUntil: z.string().optional(),
				// Project tracking
				addedDate: z.string().optional(),
				projectUrl: z.string().url().optional(),
			}),
		}),
	}),
};
