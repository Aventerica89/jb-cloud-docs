---
title: Monorepo Configuration
description: Deploy multiple projects from a single repository with Vercel.
sidebar:
  order: 5
---

Deploy multiple applications from one Git repository.

## ELI5: What's a Monorepo?

A monorepo is one Git repository containing multiple projects. Instead of having separate repos for your web app, API, and docs site, they all live together. This makes sharing code easier and keeps everything in sync.

## Quick Setup

### 1. Connect Your Repository

In Vercel Dashboard:
1. Import your Git repository
2. When asked for "Root Directory", select the specific project folder
3. Repeat for each project you want to deploy

### 2. Configure Root Directory

Each project needs its own root directory:

```
my-monorepo/
├── apps/
│   ├── web/           ← Root: apps/web
│   ├── api/           ← Root: apps/api
│   └── docs/          ← Root: apps/docs
├── packages/
│   └── shared/
└── package.json
```

### 3. Link via CLI

```bash
# From repo root
vercel link --repo

# Select which project to work with
vercel link
```

## Workspace Configuration

### npm Workspaces

```json
// package.json (root)
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

### pnpm Workspaces

```yaml
# pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### Yarn Workspaces

```json
// package.json (root)
{
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
```

## Skipping Unaffected Projects

Vercel automatically skips builds when a project's files haven't changed.

**How it works:**
1. Vercel detects which files changed in the commit
2. If changes don't affect a project, that build is skipped
3. Only affected projects rebuild

**Requirements:**
- GitHub repository
- npm/yarn/pnpm workspaces configured
- Unique `name` in each package's `package.json`
- Dependencies explicitly stated between packages

### Disable Skip Behavior

If you need every commit to deploy:

1. Project Settings > Build & Deployment
2. Find "Root Directory"
3. Toggle "Skip deployment" to Disabled

## Related Projects

Link projects that depend on each other (e.g., frontend needs API URL).

### Configure in vercel.json

```json
// apps/frontend/vercel.json
{
  "relatedProjects": ["prj_api123"]
}
```

Find project IDs in Project Settings.

### Access Related Project URLs

```typescript
import { withRelatedProject } from '@vercel/related-projects';

const apiHost = withRelatedProject({
  projectName: 'my-api',
  defaultHost: process.env.API_HOST,
});

// In preview: points to corresponding preview deployment
// In production: points to production API
```

### Install the Package

```bash
npm i @vercel/related-projects
```

## Turborepo Integration

Turborepo works well with Vercel for fast builds.

### Setup

```bash
npm i turbo -D
```

```json
// turbo.json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

### Enable Remote Caching

```bash
# Link to Vercel for remote cache
npx turbo login
npx turbo link
```

This shares build cache across team members and CI.

## Common Patterns

### Shared Packages

```
packages/
├── ui/          # Shared React components
├── config/      # Shared ESLint, TypeScript configs
└── utils/       # Shared utilities
```

Import in apps:

```typescript
// apps/web/src/components/Button.tsx
import { Button } from '@myorg/ui';
```

### Environment Variables

Each project has its own env vars in Vercel. For shared values:

1. Set the same variable in each project, or
2. Use a shared config package that reads from env

### Build Commands

Each project can have different build commands:

```json
// apps/web/package.json
{
  "scripts": {
    "build": "next build"
  }
}
```

```json
// apps/api/package.json
{
  "scripts": {
    "build": "tsup src/index.ts"
  }
}
```

## Using with Claude Code

> "Set up my monorepo for Vercel deployment"

Claude will configure workspaces, create vercel.json files, and link projects.

> "Why isn't my shared package building correctly?"

Claude will check workspace configuration and dependency declarations.

> "Connect my frontend and API so preview URLs work together"

Claude will set up related projects configuration.

## Related

- [Build Errors](/vercel/build-errors/) - Fix monorepo build issues
- [Environment Commands](/vercel/cli/environment/) - Manage env vars per project
- [Vercel CLI](/vercel/cli/) - CLI commands for monorepos
