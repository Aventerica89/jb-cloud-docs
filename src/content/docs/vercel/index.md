---
title: Vercel Overview
description: Getting started with Vercel deployments.
sidebar:
  order: 0
---

Documentation for Vercel deployment workflows and configuration.

## Topics

- Project deployment
- Environment variables
- Custom domains
- Build configuration

*More guides coming soon.*

## Using with Claude Code

Claude Code can help you manage Vercel deployments and configuration.

### Vercel CLI Commands

Ask Claude to run Vercel commands:

```bash
# Check deployment status
vercel ls

# Deploy preview
vercel

# Deploy to production
vercel --prod
```

### Environment Variable Management

Tell Claude what you need:

> Deploy my API keys to Vercel production environment

Using the [Env Var Assistant](/env-var-assistant/), Claude can deploy environment variables from 1Password to Vercel.

### Build Configuration

Share your build errors with Claude:

> My Vercel build is failing with this error: [paste error]

Claude diagnoses build issues and suggests `vercel.json` fixes.

### Domain Configuration

Ask Claude for help with domains:

> Configure docs.myapp.com to point to my Vercel deployment

Claude provides the DNS and Vercel configuration steps.
