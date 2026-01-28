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
