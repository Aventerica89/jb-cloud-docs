// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.jbcloud.app',
	adapter: cloudflare(),
	integrations: [
		starlight({
			title: 'JB Cloud Docs',
			logo: {
				light: './src/assets/logo.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: true,
			},
			head: [
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: 'https://docs.jbcloud.app/og-image.png' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image:width', content: '1200' },
				},
				{
					tag: 'meta',
					attrs: { property: 'og:image:height', content: '630' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:card', content: 'summary_large_image' },
				},
				{
					tag: 'meta',
					attrs: { name: 'twitter:image', content: 'https://docs.jbcloud.app/og-image.png' },
				},
			],
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
					label: 'WP Manager',
					autogenerate: { directory: 'wp-manager' },
				},
				{
					label: 'Bricks Builder Agent',
					autogenerate: { directory: 'bricks-builder-agent' },
				},
				{
					label: 'UI Resources',
					autogenerate: { directory: 'ui-resources' },
				},
			],
			customCss: ['./src/styles/custom.css'],
		}),
		tailwind({ applyBaseStyles: false }),
		react(),
	],
});
