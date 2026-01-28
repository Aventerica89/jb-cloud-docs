---
title: Supported API Key Patterns
description: Complete list of API key formats detected by Env Var Assistant
sidebar:
  order: 3
---

Env Var Assistant detects 60+ API key formats across various services. This page lists all supported patterns.

## AI / Machine Learning

| Provider | Pattern | Example |
|----------|---------|---------|
| OpenAI API Key | `sk-[a-zA-Z0-9]{48,}` | `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| OpenAI Project Key | `sk-proj-[a-zA-Z0-9_-]{80,}` | `sk-proj-xxxx...` |
| Anthropic | `sk-ant-[a-zA-Z0-9_-]{90,}` | `sk-ant-xxxx...` |
| Google AI | `AIza[a-zA-Z0-9_-]{35}` | `AIza...YOUR_KEY_HERE` |
| Replicate | `r8_[a-zA-Z0-9]{37}` | `r8_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| Hugging Face | `hf_[a-zA-Z0-9]{34}` | `hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

## Version Control

| Provider | Pattern | Example |
|----------|---------|---------|
| GitHub PAT | `ghp_[a-zA-Z0-9]{36}` | `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| GitHub Fine-Grained | `github_pat_[a-zA-Z0-9_]{82}` | `github_pat_xxxx...` |
| GitHub OAuth | `gho_[a-zA-Z0-9]{36}` | `gho_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| GitHub App | `ghu_[a-zA-Z0-9]{36}` or `ghs_[a-zA-Z0-9]{36}` | `ghu_xxxx...` |
| GitLab PAT | `glpat-[a-zA-Z0-9_-]{20}` | `glpat-xxxxxxxxxxxxxxxxxxxx` |
| Bitbucket | `ATBB[a-zA-Z0-9]{32}` | `ATBBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

## Cloud Providers

| Provider | Pattern | Example |
|----------|---------|---------|
| AWS Access Key | `AKIA[0-9A-Z]{16}` | `AKIAXXXXXXXXXXXXXXXX` |
| Cloudflare API Token | `[A-Za-z][A-Za-z0-9_-]{38}[A-Za-z0-9]` | `YOUR_CLOUDFLARE_TOKEN_HERE` |
| Netlify | `nfp_[a-zA-Z0-9]{40}` | `nfp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| Render | `rnd_[a-zA-Z0-9]{32}` | `rnd_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| Fly.io | `fo1_[a-zA-Z0-9_-]{43}` | `fo1_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| DigitalOcean | `dop_v1_[a-f0-9]{64}` | `dop_v1_xxxx...` |

## Database / Backend

| Provider | Pattern | Example |
|----------|---------|---------|
| Supabase Publishable | `sb_publishable_[a-zA-Z0-9_-]{20,}` | `sb_publishable_xxxx...` |
| Supabase Secret | `sb_secret_[a-zA-Z0-9_-]{20,}` | `sb_secret_xxxx...` |
| PlanetScale | `pscale_pw_[a-zA-Z0-9_-]{43}` | `pscale_pw_xxxx...` |
| Neon | `neon_[a-zA-Z0-9_-]{32,}` | `neon_xxxx...` |
| MongoDB | `mongodb+srv://user:pass@host` | `mongodb+srv://admin:xxxx@cluster.mongodb.net` |
| Redis/Upstash | `redis[s]://user:pass@host` | `rediss://default:xxxx@host.upstash.io:6379` |
| Firebase | `AIza[a-zA-Z0-9_-]{35}` | `AIza...YOUR_KEY_HERE` |
| Convex | `prod:[a-zA-Z0-9_-]{32,}` | `prod:xxxx...` |

## Authentication

| Provider | Pattern | Example |
|----------|---------|---------|
| Clerk Publishable | `pk_(test\|live)_[a-zA-Z0-9]{40,}` | `pk_test_xxxx...` |
| Clerk Secret | `sk_(test\|live)_[a-zA-Z0-9]{40,}` | `sk_live_xxxx...` |

## Payments

| Provider | Pattern | Example |
|----------|---------|---------|
| Stripe Live Publishable | `pk_live_[a-zA-Z0-9]{24,}` | `pk_live_xxxxxxxxxxxxxxxxxxxxxxxx` |
| Stripe Test Publishable | `pk_test_[a-zA-Z0-9]{24,}` | `pk_test_xxxxxxxxxxxxxxxxxxxxxxxx` |
| Stripe Live Secret | `sk_live_[a-zA-Z0-9]{24,}` | `sk_live_YOUR_KEY_HERE` |
| Stripe Test Secret | `sk_test_[a-zA-Z0-9]{24,}` | `sk_test_YOUR_KEY_HERE` |
| Stripe Webhook | `whsec_[a-zA-Z0-9]{32,}` | `whsec_YOUR_SECRET_HERE` |
| Square | `sq0atp-[a-zA-Z0-9_-]{22}` | `sq0atp-YOUR_TOKEN_HERE` |

## Email Services

| Provider | Pattern | Example |
|----------|---------|---------|
| SendGrid | `SG.[a-zA-Z0-9_-]{22}.[a-zA-Z0-9_-]{43}` | `SG.xxxx.yyyy` |
| Resend | `re_[a-zA-Z0-9]{32,}` | `re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| Mailgun | `key-[a-f0-9]{32}` | `key-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| Mailchimp | `[a-f0-9]{32}-us[0-9]{1,2}` | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us21` |

## Communication

| Provider | Pattern | Example |
|----------|---------|---------|
| Twilio Account SID | `AC[a-f0-9]{32}` | `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| Slack Bot Token | `xoxb-[0-9]+-[0-9]+-[a-zA-Z0-9]+` | `xoxb-xxxx-yyyy-zzzz` |
| Slack User Token | `xoxp-[0-9]+-[0-9]+-[0-9]+-[a-f0-9]+` | `xoxp-xxxx-yyyy-zzzz-aaaa` |
| Slack Webhook | `https://hooks.slack.com/services/T.../B.../...` | Full URL |
| Discord Bot | `[MN][a-zA-Z0-9_-]{23,}.[a-zA-Z0-9_-]{6}.[a-zA-Z0-9_-]{27,}` | `Mxxxx.xxxxxx.xxxx...` |
| Discord Webhook | `https://discord.com/api/webhooks/...` | Full URL |
| Telegram | `[0-9]{9,10}:[a-zA-Z0-9_-]{35}` | `123456789:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

## Analytics & Monitoring

| Provider | Pattern | Example |
|----------|---------|---------|
| Sentry DSN | `https://[a-f0-9]{32}@[domain].ingest.sentry.io/[0-9]+` | Full DSN URL |
| PostHog | `phc_[a-zA-Z0-9]{32,}` | `phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

## Developer Tools

| Provider | Pattern | Example |
|----------|---------|---------|
| Linear | `lin_api_[a-zA-Z0-9]{40}` | `lin_api_YOUR_TOKEN_HERE` |
| Notion | `secret_[a-zA-Z0-9]{43}` or `ntn_[a-zA-Z0-9]{43,}` | `secret_xxxx...` |
| Airtable | `key[a-zA-Z0-9]{14}` or `pat[a-zA-Z0-9]{14}.[a-f0-9]{64}` | `keyxxxxxxxxxxxxxx` |
| NPM | `npm_[a-zA-Z0-9]{36}` | `npm_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| Docker Hub | `dckr_pat_[a-zA-Z0-9_-]{52}` | `dckr_pat_xxxx...` |

## E-commerce

| Provider | Pattern | Example |
|----------|---------|---------|
| Shopify Admin | `shpat_[a-f0-9]{32}` | `shpat_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| Shopify Storefront | `shpss_[a-f0-9]{32}` | `shpss_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |

## Maps & Location

| Provider | Pattern | Example |
|----------|---------|---------|
| Mapbox | `pk.[...].` or `sk.[...].[...]` | `pk.xxxx.yyyy` |
| Google Maps | `AIza[a-zA-Z0-9_-]{35}` | `AIza...YOUR_KEY_HERE` |

## Media & Storage

| Provider | Pattern | Example |
|----------|---------|---------|
| Cloudinary | `cloudinary://[0-9]+:[...]+@[...]` | `cloudinary://123:xxxx@cloud_name` |
| UploadThing | `sk_live_[a-zA-Z0-9]{32,}` | `sk_live_xxxx...` |

## Adding New Patterns

If you need to detect a pattern that's not listed:

1. Open `extension/lib/patterns.js`
2. Add a new entry to `API_KEY_PATTERNS`:

```javascript
{
  provider: 'my-service',
  name: 'My Service API Key',
  pattern: /prefix_[a-zA-Z0-9]{32}/,
  dashboardUrl: 'https://my-service.com/api-keys',
  tags: ['env-var', 'my-service', 'category']
}
```

3. If the pattern is generic and might false-positive, add `contextRequired: true`:

```javascript
{
  provider: 'generic-service',
  name: 'Generic Service Token',
  pattern: /[a-f0-9]{32}/,
  contextRequired: true,  // Only matches if URL contains service name
  dashboardUrl: 'https://generic-service.com/',
  tags: ['env-var', 'generic-service']
}
```
