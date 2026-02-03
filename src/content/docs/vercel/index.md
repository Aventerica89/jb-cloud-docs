---
title: Vercel Overview
description: Deploy and manage web applications with Vercel.
sidebar:
  order: 0
---

Vercel is the platform for frontend developers, providing the speed and reliability your app needs.

## ELI5: What's Vercel?

Vercel is like a valet parking service for your website. You hand over your code, and they handle putting it online, making it fast, and keeping it running. You focus on building; they handle the infrastructure.

## Quick Start

```bash
# Install the CLI
npm i -g vercel

# Login
vercel login

# Deploy (from your project directory)
vercel
```

That's it - your site is live with a preview URL.

## Key Features

| Feature | Description |
|---------|-------------|
| **Zero Config** | Detects your framework and deploys automatically |
| **Preview Deployments** | Every branch gets its own URL |
| **Edge Network** | Global CDN for fast loading worldwide |
| **Serverless Functions** | API routes without managing servers |
| **AI SDK** | Build AI-powered applications |

## Documentation Sections

### CLI Reference
- [Overview](/vercel/cli/) - Installation and global options
- [Deployment](/vercel/cli/deployment/) - deploy, redeploy, rollback
- [Environment](/vercel/cli/environment/) - env, pull, link
- [Domains](/vercel/cli/domains/) - domains, dns, alias
- [Utilities](/vercel/cli/utilities/) - logs, dev, inspect

### AI Development
- [AI SDK Overview](/vercel/ai-sdk/) - Build AI applications
- [Core Functions](/vercel/ai-sdk/core/) - generateText, streamText, generateObject
- [UI Hooks](/vercel/ai-sdk/ui/) - useChat, useCompletion
- [Migration](/vercel/ai-sdk/migration/) - Version upgrade guides

### Platform Guides
- [AI Gateway](/vercel/ai-gateway/) - Route AI calls through Vercel for monitoring
- [MCP Server](/vercel/mcp/) - AI tool integration
- [Production Checklist](/vercel/production-checklist/) - Pre-launch verification
- [Monorepos](/vercel/monorepos/) - Multi-project deployments
- [Build Errors](/vercel/build-errors/) - Troubleshooting guide

## Using with Claude Code

Claude Code integrates deeply with Vercel:

### Deploy Your Project
> "Deploy my project to Vercel production"

Claude runs `vercel --prod` and gives you the URL.

### Manage Environment Variables
> "Pull my Vercel env vars and add the new API key"

Claude syncs your local environment with Vercel.

### Debug Issues
> "Why is my Vercel build failing?"

Claude analyzes the build logs and suggests fixes.

### Check Logs
> "Show me recent errors from my Vercel deployment"

Claude fetches and summarizes runtime logs.

## Related Resources

- [Command Reference](/commands/) - Searchable CLI commands
- [Build Errors](/vercel/build-errors/) - Fix deployment issues
- [Env Var Assistant](/env-var-assistant/) - Auto-deploy secrets
