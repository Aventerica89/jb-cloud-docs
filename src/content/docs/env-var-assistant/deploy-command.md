---
title: /deploy-env Command
description: Automatically deploy environment variables to platforms
source_project: /Users/jb/env-var-assistant
sidebar:
  order: 6
---

The `/deploy-env` command automates deploying environment variables from 1Password to deployment platforms.

## Overview

```
/deploy-env              # Auto-detect platform and keys
/deploy-env vercel       # Deploy to Vercel specifically
/deploy-env github org/repo  # Deploy to GitHub Actions
```

## How It Works

1. **Scans project** for required env vars (`.env.example`, code imports)
2. **Detects platform** from config files (`vercel.json`, `wrangler.toml`, etc.)
3. **Matches keys** in 1Password by name or provider tag
4. **Deploys** via platform CLI (`vercel env add`, `wrangler secret put`, etc.)

## Supported Platforms

| Platform | CLI | Detection |
|----------|-----|-----------|
| Vercel | `vercel` | `vercel.json` |
| Netlify | `netlify` | `netlify.toml` |
| Cloudflare Pages/Workers | `wrangler` | `wrangler.toml` |
| GitHub Actions | `gh` | `.github/workflows/` |
| Railway | `railway` | `railway.json` |
| Fly.io | `fly` | `fly.toml` |

## Example Workflow

```
$ cd my-nextjs-project
$ /deploy-env

Scanning project for env vars...
Found: OPENAI_API_KEY, DATABASE_URL, STRIPE_SECRET_KEY

Detected platform: Vercel (vercel.json found)

Matching keys in 1Password:
  OPENAI_API_KEY     [found]
  DATABASE_URL       [found]
  STRIPE_SECRET_KEY  [found]

Deploying to Vercel production...
  OPENAI_API_KEY      Success
  DATABASE_URL        Success
  STRIPE_SECRET_KEY   Success

Deployed 3/3 env vars to Vercel
```

## Automatic Triggers

The `/deploy-env` workflow also runs automatically when:

| Trigger | Action |
|---------|--------|
| `/new-project` completes | Offers to deploy detected env vars |
| Build fails (missing env) | Suggests running `/deploy-env` |
| Platform config created | Prompts to deploy |

## Manual Deployment

For specific scenarios:

```bash
# Deploy to specific platform
/deploy-env vercel

# Deploy to GitHub with repo
/deploy-env github myorg/myrepo

# Deploy to Cloudflare with account selection
/deploy-env cloudflare
```

## Missing Keys

If required env vars aren't in 1Password:

```
Missing keys (not in 1Password):
  CUSTOM_API_KEY - Paste value to store and deploy

Paste the key value, or skip with Enter:
```

Claude will store the key in 1Password and deploy it.

## Requirements

- Platform CLI installed and authenticated
- 1Password CLI (`op`) authenticated
- MCP server configured (see [MCP Integration](./mcp))

## Troubleshooting

### "CLI not found"

Install the missing CLI:

```bash
npm install -g vercel
npm install -g wrangler
npm install -g netlify-cli
brew install gh
```

### "Not authenticated"

```bash
vercel login
wrangler login
netlify login
gh auth login
```

### "Multiple accounts"

For Cloudflare with multiple accounts, set the account ID:

```bash
export CLOUDFLARE_ACCOUNT_ID=your-account-id
/deploy-env cloudflare
```

### "Key not found in 1Password"

Ensure keys are tagged with `env-var`:
1. Open 1Password
2. Find the API key item
3. Add tag: `env-var`

## Using with Claude Code

Claude Code automates environment variable deployment using the MCP 1Password integration.

### Automatic Detection and Deployment

**Deploy with auto-detection:**
```
"Deploy environment variables for this Next.js project"
```

Claude Code will:
1. Scan `.env.example` for required vars
2. Detect platform from `vercel.json`
3. Match keys in 1Password by name
4. Deploy via Vercel CLI
5. Confirm success

**Example output:**
```
Scanning project for env vars...
Found: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

Detected platform: Vercel (vercel.json found)

Matching in 1Password:
  NEXT_PUBLIC_SUPABASE_URL     [found]
  SUPABASE_SERVICE_ROLE_KEY    [found]

Deploying to Vercel production...
  NEXT_PUBLIC_SUPABASE_URL      ✓
  SUPABASE_SERVICE_ROLE_KEY     ✓

Deployed 2/2 env vars
```

### Platform-Specific Deployment

**Deploy to specific platforms:**
```
# Vercel
"Deploy env vars to Vercel for this project"

# Cloudflare Workers
"Deploy these secrets to my Cloudflare Worker:
OPENAI_API_KEY, DATABASE_URL"

# GitHub Actions
"Add these secrets to the GitHub repo secrets:
VERCEL_TOKEN, CLOUDFLARE_API_TOKEN"
```

**Multi-platform deployment:**
```
"This app deploys to both Vercel (frontend) and Cloudflare Workers (API). Deploy env vars to both"
```

### Missing Keys Workflow

**Handle missing keys:**
```
Missing keys (not in 1Password):
  CUSTOM_SERVICE_API_KEY

Paste value to store and deploy (or Enter to skip):
```

Claude Code will:
1. Prompt for the missing value
2. Store in 1Password with proper tags
3. Deploy to the platform
4. Use for all future deployments

### Troubleshooting with Claude Code

**Debug deployment issues:**
```
"The deployment failed with 'unauthorized'. Help me troubleshoot"
```

Claude Code will check:
- CLI authentication status
- API token permissions
- Project access rights
- Environment variable names
- Value format/encoding

**Verify deployment:**
```
"Verify all env vars were deployed correctly to Vercel production"
```

Claude Code will:
- List expected vars from `.env.example`
- Check deployed vars via CLI
- Report missing or mismatched vars

### Real-World Examples

**Example 1: New project setup**
```
"I just created a Next.js app with Supabase. Set up all env vars:
1. Scan the project for required vars
2. Find them in 1Password
3. Deploy to Vercel preview and production"
```

**Example 2: Multi-environment deployment**
```
"Deploy env vars to:
- Vercel preview (using test keys)
- Vercel production (using live keys)
- GitHub Actions (for CI/CD)"
```

**Example 3: Team onboarding**
```
"New developer joining the project. What env vars do they need and where to get them?"
```

Claude Code will generate:
- List of required env vars
- 1Password items to request access to
- Setup instructions
- Deployment commands

### Advanced Usage

**Selective deployment:**
```
"Deploy only the database env vars, skip API keys"
```

**Env var rotation:**
```
"The Stripe key was rotated. Update it in 1Password and redeploy to all environments"
```

**Audit env vars:**
```
"List all env vars deployed to Vercel and compare with 1Password to find discrepancies"
```

### Automation

**CI/CD integration:**
```
"Set up GitHub Actions to deploy env vars automatically when they change in 1Password"
```

**Scheduled updates:**
```
"Create a script to sync env vars from 1Password to all platforms weekly"
```
