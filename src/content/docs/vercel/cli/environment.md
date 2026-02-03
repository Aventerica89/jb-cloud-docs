---
title: Environment Commands
description: Manage environment variables and project linking with Vercel CLI.
sidebar:
  order: 2
---

Commands for managing environment variables and project configuration.

## vercel env

Manage environment variables for your Vercel project.

### List environment variables

```bash
# List all env vars
vercel env ls

# List for specific environment
vercel env ls production
vercel env ls preview
vercel env ls development
```

### Add an environment variable

```bash
# Add to specific environment
vercel env add API_KEY production

# Add to all environments
vercel env add API_KEY

# Add from stdin (for secrets)
echo "secret-value" | vercel env add API_KEY production
```

### Remove an environment variable

```bash
vercel env rm API_KEY production
```

### ELI5: Environments Explained

Vercel has three environments:

- **Production** - Your live site at `myapp.com`
- **Preview** - Test deployments at random URLs
- **Development** - When running `vercel dev` locally

You might have different API keys for each. For example, a test Stripe key for preview and a real one for production.

---

## vercel env pull

Download environment variables to a local `.env` file.

```bash
# Pull to .env.local (default)
vercel env pull

# Pull to specific file
vercel env pull .env.development

# Pull from specific environment
vercel env pull --environment=production
```

### Why use env pull?

Your local development needs the same env vars as Vercel. Instead of copying them manually, `env pull` syncs them automatically.

**Security note:** The downloaded file contains secrets. Make sure `.env.local` is in your `.gitignore`.

---

## vercel link

Connect a local directory to an existing Vercel project.

```bash
# Link interactively
vercel link

# Link to a specific project
vercel link --project my-project

# Link entire repo (monorepo)
vercel link --repo
```

### When to use link

- Cloned a repo that's already on Vercel
- Want to deploy to an existing project instead of creating new
- Setting up a monorepo with multiple projects

After linking, `vercel` commands know which project to target without asking.

---

## vercel pull

Download project settings and environment variables together.

```bash
# Pull everything
vercel pull

# Pull for specific environment
vercel pull --environment=production
```

This downloads:
- `.vercel/project.json` with project settings
- `.env.local` with environment variables

---

## Common Workflows

### First-time setup on existing project

```bash
# Link to the project
vercel link

# Pull env vars and settings
vercel pull

# Start developing
vercel dev
```

### Sync env vars after teammate added new ones

```bash
vercel env pull
```

### Add a secret API key

```bash
# Add to production only
vercel env add STRIPE_SECRET_KEY production

# Or pipe from a secure prompt (avoids shell history)
read -s -p "Enter secret: " SECRET && echo "$SECRET" | vercel env add STRIPE_SECRET_KEY production
```

---

## Using with Claude Code

Ask Claude to manage your env vars:

> "Pull my Vercel environment variables"

Claude will run `vercel env pull` to sync your local `.env.local`.

> "Add my OpenAI API key to Vercel production"

Claude will check 1Password for the key and run `vercel env add`.

> "What env vars does my Vercel project have?"

Claude will run `vercel env ls` and summarize the results.

---

## Related

- [Deployment Commands](/vercel/cli/deployment/) - Deploy with new env vars
- [Env Var Assistant](/env-var-assistant/) - Auto-deploy from 1Password
- [Build Errors](/vercel/build-errors/) - Fix missing env var errors
