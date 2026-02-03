---
title: Deployment Commands
description: Deploy, redeploy, rollback, and manage production deployments with Vercel CLI.
sidebar:
  order: 1
---

Commands for deploying and managing your Vercel projects.

## vercel deploy

Deploy your project to Vercel. This is the default command when running `vercel` without arguments.

```bash
# Preview deployment (default)
vercel

# Production deployment
vercel --prod

# Skip confirmation prompts
vercel --yes

# Don't wait for deployment to complete
vercel --no-wait
```

**Common flags:**

| Flag | Description |
|------|-------------|
| `--prod` | Deploy to production |
| `--yes` | Skip confirmation prompts |
| `--no-wait` | Don't wait for build to complete |
| `--archive=tgz` | Compress source files |
| `--env KEY=VALUE` | Set env var for this deploy |

### ELI5: Preview vs Production

**Preview deployments** get a unique URL like `my-app-abc123.vercel.app`. Use these to test changes before going live.

**Production deployments** go to your real domain like `myapp.com`. Only deploy to production when you're confident the code works.

---

## vercel build

Build your project locally using the exact same process Vercel uses in the cloud.

```bash
# Build for production
vercel build --prod

# Build to custom output directory
vercel build --output ./dist
```

This is useful for:
- Debugging build issues locally
- Running builds in your own CI system
- Testing before deploying

---

## vercel redeploy

Rebuild and deploy an existing deployment without any code changes.

```bash
# Redeploy a specific deployment
vercel redeploy https://my-app-abc123.vercel.app

# Redeploy without waiting
vercel redeploy [url] --no-wait
```

### When to use redeploy

- Environment variables changed but code didn't
- External dependency updated (npm package, API)
- Clearing build cache issues

**Note:** The stdout of `vercel redeploy` is always the new deployment URL, making it easy to capture in scripts.

---

## vercel rollback

Instantly revert production to a previous deployment.

```bash
# Rollback to previous production deployment
vercel rollback

# Rollback to a specific deployment
vercel rollback https://my-app-abc123.vercel.app

# Check rollback status
vercel rollback status [project]
```

### ELI5: Why Rollback?

Imagine you deployed a bug to production and users are seeing errors. Instead of frantically fixing code, you can rollback to the last working version in seconds while you debug the problem calmly.

**Rollback is instant** because Vercel keeps your old deployments. It just changes which one your domain points to.

---

## vercel promote

Promote a preview deployment to production without rebuilding.

```bash
# Promote a deployment to production
vercel promote https://my-app-abc123.vercel.app

# Check promotion status
vercel promote status [project]
```

This is useful when:
- You've tested a preview and it's ready for production
- You want to skip a rebuild for a known-good deployment

---

## Using with Claude Code

Ask Claude to handle deployments:

> "Deploy my project to production"

Claude will run `vercel --prod` and report the URL.

> "My site is broken, roll back to the previous version"

Claude will run `vercel rollback` and confirm the rollback completed.

> "Rebuild my last deployment to pick up the new env vars"

Claude will find the deployment URL and run `vercel redeploy`.

---

## Related

- [Environment Commands](/vercel/cli/environment/) - Manage env vars before deploying
- [Build Errors](/vercel/build-errors/) - Fix common deployment failures
- [Production Checklist](/vercel/production-checklist/) - Pre-launch verification
