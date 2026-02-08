// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import rehypeExternalLinks from 'rehype-external-links';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.jbcloud.app',
	adapter: cloudflare(),
	markdown: {
		rehypePlugins: [
			[rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
		],
	},
	integrations: [
		starlight({
			title: 'JB Cloud Docs',
			logo: {
				light: './src/assets/logo.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: true,
			},
			// Quick wins: Last updated timestamps
			lastUpdated: true,
			// Edit on GitHub link
			editLink: {
				baseUrl: 'https://github.com/Aventerica89/jb-cloud-docs/edit/main/',
			},
			// Quick wins: Enhanced code blocks with copy button
			expressiveCode: {
				themes: ['github-dark', 'github-light'],
				styleOverrides: {
					borderRadius: '0.5rem',
					codePaddingBlock: '0.875rem',
					codePaddingInline: '1rem',
				},
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
				PageTitle: './src/components/PageTitle.astro',
				Sidebar: './src/components/Sidebar.astro',
			},
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Aventerica89/jb-cloud-docs' }],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'index' },
						{ label: 'Documentation Workflow', slug: 'documentation-workflow' },
						{ label: "What's New", slug: 'changelog' },
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
					items: [
						{ label: 'Overview', slug: 'vercel' },
						{
							label: 'CLI Reference',
							autogenerate: { directory: 'vercel/cli' },
							collapsed: true,
						},
						{
							label: 'AI SDK',
							autogenerate: { directory: 'vercel/ai-sdk' },
							collapsed: true,
						},
						{ label: 'MCP Server', slug: 'vercel/mcp' },
						{ label: 'Production Checklist', slug: 'vercel/production-checklist' },
						{ label: 'Monorepos', slug: 'vercel/monorepos' },
						{ label: 'Build Errors', slug: 'vercel/build-errors' },
					],
				},
				{
					label: 'Authentication',
					items: [
						{ label: 'Overview', slug: 'auth' },
						{
							label: 'BetterAuth',
							autogenerate: { directory: 'auth/better-auth' },
							collapsed: true,
						},
						{
							label: 'Clerk',
							autogenerate: { directory: 'auth/clerk' },
							collapsed: true,
						},
					],
				},
				{
					label: 'Integrations',
					items: [
						{ label: 'Overview', slug: 'integrations' },
						{
							label: 'Sanity',
							autogenerate: { directory: 'integrations/sanity' },
							collapsed: true,
						},
					],
				},
				{
					label: 'Command Reference',
					slug: 'commands',
					badge: { text: 'New', variant: 'tip' },
				},
				{
					label: 'Decision Guides',
					autogenerate: { directory: 'decisions' },
				},
				{
					label: 'Skills',
					autogenerate: { directory: 'skills' },
				},
				{
					label: '1Code',
					autogenerate: { directory: '1code' },
				},
				{
					label: 'AeroSpace',
					autogenerate: { directory: 'aerospace' },
				},
				{
					label: 'Artifact Manager (macOS)',
					autogenerate: { directory: 'artifact-manager-mac' },
				},
				{
					label: 'Artifact Manager (Extension)',
					autogenerate: { directory: 'artifact-manager-extension' },
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
					label: 'Bricks CC',
					autogenerate: { directory: 'bricks-cc' },
				},
				{
					label: 'VaporForge',
					autogenerate: { directory: 'vaporforge' },
				},
				{
					label: 'Claude Code',
					autogenerate: { directory: 'claude-code' },
				},
				{
					label: 'Claude Codex',
					autogenerate: { directory: 'claude-codex' },
				},
				{
					label: 'Claude New Project',
					autogenerate: { directory: 'claude-new-project' },
				},
				{
					label: 'URLsToGo',
					autogenerate: { directory: 'linkshort' },
				},
				{
					label: 'Env Var Assistant',
					autogenerate: { directory: 'env-var-assistant' },
				},
				{
					label: 'JB Cloud App Tracker',
					autogenerate: { directory: 'jb-cloud-app-tracker' },
				},
				{
					label: 'Renvio Companion App',
					autogenerate: { directory: 'renvio-companion-app' },
				},
				{
					label: 'JB Cloud Docs',
					autogenerate: { directory: 'jb-cloud-docs' },
				},
				{
					label: 'UI Resources',
					autogenerate: { directory: 'ui-resources' },
				},
				{
					label: 'Resources',
					autogenerate: { directory: 'resources' },
				},
			],
			customCss: ['./src/styles/custom.css'],
		}),
		tailwind({ applyBaseStyles: false }),
		react(),
	],
});
