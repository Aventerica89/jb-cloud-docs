---
title: JB Cloud Docs
description: Documentation site architecture and contribution guide
sidebar:
  order: 1
source_project: /Users/jb/jb-cloud-docs
---

JB Cloud Docs is the central documentation hub for all JB Cloud projects, built with Astro and Starlight.

## Overview

- **URL**: https://docs.jbcloud.app
- **Framework**: Astro + Starlight
- **Hosting**: Cloudflare Pages
- **Repository**: [github.com/Aventerica89/jb-cloud-docs](https://github.com/Aventerica89/jb-cloud-docs)

## Architecture

```
jb-cloud-docs/
├── src/
│   ├── content/docs/       # Documentation pages (MDX/MD)
│   │   ├── {project}/      # Per-project documentation
│   │   ├── index.mdx       # Homepage
│   │   └── changelog.md    # What's new
│   ├── components/         # Custom Astro components
│   ├── assets/             # Images, logos
│   └── styles/             # Custom CSS
├── public/                 # Static assets
├── astro.config.mjs        # Starlight configuration
└── package.json
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Astro 5.x |
| Theme | Starlight |
| Styling | Tailwind CSS |
| Hosting | Cloudflare Pages |
| CI/CD | GitHub → Cloudflare auto-deploy |

## Features

- **Auto-generated sidebars** - Each project directory becomes a nav section
- **Dark/light mode** - System preference detection
- **Search** - Built-in Pagefind search
- **Code highlighting** - Expressive Code with copy button
- **Last updated** - Automatic timestamps
- **Edit links** - Direct GitHub editing

## API Endpoints

The docs site includes serverless API functions:

| Endpoint | Purpose |
|----------|---------|
| `/api/chat` | AI-powered documentation assistant |
| `/api/auth/login` | Chat authentication |

### Required Environment Variables

| Variable | Description |
|----------|-------------|
| `ANTHROPIC_API_KEY` | For the chat API |
| `GITHUB_TOKEN` | For fetching repo content |
| `JWT_SECRET` | Session token signing |
| `CHAT_PASSWORD` | Chat access password |

## Adding Documentation

### Via /jbdocs Command

From any project directory:

```bash
/jbdocs init      # Create initial docs
/jbdocs update    # Update existing docs
```

### Manual Addition

1. Create directory in `src/content/docs/{project-slug}/`
2. Add `index.md` with frontmatter:
   ```yaml
   ---
   title: Project Name
   description: Brief description
   sidebar:
     order: 1
   source_project: /path/to/source
   ---
   ```
3. Add sidebar entry to `astro.config.mjs`:
   ```javascript
   {
     label: 'Project Name',
     autogenerate: { directory: 'project-slug' },
   },
   ```
4. Commit and push

## Deployment

Deploys automatically on push to `main` via Cloudflare Pages GitHub integration.

### Manual Deploy

```bash
npm run build
npx wrangler pages deploy dist
```

### Environment Setup

Set secrets via Cloudflare dashboard or CLI:

```bash
npx wrangler pages secret put ANTHROPIC_API_KEY --project-name=jb-cloud-docs
```

Or use the `/deploy-env` command from Claude Code to auto-deploy from 1Password.
