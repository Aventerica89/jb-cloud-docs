// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.jbcloud.app',
	integrations: [
		starlight({
			title: 'JB Cloud Docs',
			logo: {
				light: './src/assets/logo.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: true,
			},
			components: {
				Footer: './src/components/Footer.astro',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Aventerica89/jb-cloud-docs' }],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Documentation Workflow', slug: 'documentation-workflow' },
					],
				},
				{
					label: 'xCloud',
					autogenerate: { directory: 'xcloud' },
				},
				{
					label: 'Cloudflare',
					autogenerate: { directory: 'cloudflare' },
				},
				{
					label: 'Supabase',
					autogenerate: { directory: 'supabase' },
				},
				{
					label: 'Vercel',
					autogenerate: { directory: 'vercel' },
				},
				{
					label: 'BCMS',
					autogenerate: { directory: 'bcms' },
				},
				{
					label: 'Bricks Builder Agent',
					autogenerate: { directory: 'bricks-builder-agent' },
				},
			],
			customCss: ['./src/styles/custom.css'],
		}),
		tailwind({ applyBaseStyles: false }),
		react(),
	],
});
