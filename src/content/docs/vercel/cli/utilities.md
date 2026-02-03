---
title: Utility Commands
description: Debug with logs, run local dev server, inspect deployments, and manage cache.
sidebar:
  order: 4
---

Commands for development, debugging, and maintenance.

## vercel dev

Run a local development server that replicates the Vercel environment.

```bash
# Start dev server
vercel dev

# Custom port
vercel dev --port 3000

# Listen on all interfaces
vercel dev --listen 0.0.0.0
```

### Why use vercel dev?

Your local `npm run dev` might work differently than Vercel. `vercel dev` runs your code exactly like it runs in production:

- Serverless functions work correctly
- Environment variables from Vercel are available
- Routing matches production behavior

### ELI5: Local vs Vercel Dev

| Feature | `npm run dev` | `vercel dev` |
|---------|--------------|--------------|
| Speed | Faster | Slightly slower |
| Functions | May need setup | Works automatically |
| Env vars | Manual `.env` | Auto from Vercel |
| Routing | Framework default | Matches production |

Use `npm run dev` for quick iteration, `vercel dev` when testing functions or production behavior.

---

## vercel logs

View runtime logs from your deployment.

```bash
# View logs for latest deployment
vercel logs

# Follow logs in real-time
vercel logs --follow

# Logs for specific deployment
vercel logs https://my-app-abc123.vercel.app

# Logs since specific time
vercel logs --since 1h
```

**Common flags:**

| Flag | Description |
|------|-------------|
| `--follow`, `-f` | Stream logs in real-time |
| `--since` | Show logs since time (e.g., `5m`, `1h`, `2d`) |
| `--until` | Show logs until time |
| `--output json` | Output as JSON |

### ELI5: Finding Errors

When your site breaks, logs tell you what went wrong. Look for:

- **Error** - Something failed
- **Warn** - Something might be wrong
- **500** - Server error (check your code)
- **404** - Page not found (check your routes)

---

## vercel inspect

Get detailed information about a deployment.

```bash
# Inspect latest deployment
vercel inspect

# Inspect specific deployment
vercel inspect https://my-app-abc123.vercel.app

# Show build logs
vercel inspect [url] --logs

# Wait for deployment to complete
vercel inspect [url] --wait
```

### What inspect shows

- Deployment status and URL
- Build duration and logs
- Functions and their sizes
- Environment and region

---

## vercel cache

Manage cache for your project.

### Purge CDN cache

```bash
# Purge all CDN cache
vercel cache purge

# Purge only CDN cache
vercel cache purge --type cdn

# Purge only data cache
vercel cache purge --type data
```

### Invalidate by tag

```bash
# Invalidate cache by tag
vercel cache invalidate --tag my-tag

# Dangerously delete cache entries
vercel cache dangerously-delete --tag my-tag
```

### When to purge cache

- Stale content showing after deployment
- Testing cache behavior
- Emergency content update

**Note:** Most of the time, Vercel invalidates cache automatically on deploy. Manual purging is rarely needed.

---

## vercel blob

Manage Vercel Blob storage.

```bash
# List blobs
vercel blob list

# Upload a file
vercel blob put ./file.pdf

# Delete a blob
vercel blob del [url-or-pathname]

# Copy a blob
vercel blob copy [from-url] [to-pathname]
```

### ELI5: What's Blob Storage?

Blob storage is for files that users upload or your app generates: images, PDFs, videos, etc. Unlike your code, these files don't get deployed - they live in Vercel's storage and you access them by URL.

---

## vercel bisect

Find which deployment introduced a bug using binary search.

```bash
# Start interactive bisect
vercel bisect

# Specify known good and bad deployments
vercel bisect --good [deployment-url] --bad [deployment-url]
```

### ELI5: How Bisect Works

If your site worked a month ago but is broken now, bisect helps find exactly which deployment broke it. It tests deployments in the middle, asking "good or bad?", cutting the search space in half each time. Like finding a word in a dictionary by opening to the middle.

---

## Common Workflows

### Debug a production error

```bash
# 1. Check the logs
vercel logs --since 1h

# 2. Get deployment details
vercel inspect

# 3. If needed, roll back while debugging
vercel rollback
```

### Test serverless functions locally

```bash
# Start Vercel dev server
vercel dev

# Your functions are now at http://localhost:3000/api/*
```

### Clear cache after content update

```bash
vercel cache purge
```

---

## Using with Claude Code

Ask Claude to help debug:

> "Show me the last hour of logs for my Vercel deployment"

Claude will run `vercel logs --since 1h` and highlight errors.

> "What's the status of my latest deployment?"

Claude will run `vercel inspect` and summarize the results.

> "My site is showing old content, clear the cache"

Claude will run `vercel cache purge` and confirm completion.

---

## Related

- [Build Errors](/vercel/build-errors/) - Fix common build failures
- [Deployment Commands](/vercel/cli/deployment/) - Deploy and rollback
