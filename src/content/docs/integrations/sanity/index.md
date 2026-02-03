---
title: Sanity Overview
description: Structured content platform for modern websites and apps.
sidebar:
  order: 0
---

Sanity is a headless CMS that gives you structured content with a customizable editing studio.

## ELI5: What's Sanity?

Imagine a spreadsheet where each row is a blog post, product, or page. Sanity is like that spreadsheet but way more powerful - you define exactly what fields each content type has, and editors get a nice interface to fill them in. Your website fetches this content via API.

## Key Features

- **Sanity Studio** - Customizable React-based editing interface
- **GROQ Query Language** - Powerful content querying
- **Real-time Collaboration** - Multiple editors, live updates
- **Content Lake** - Hosted content API with CDN
- **Portable Text** - Rich text as structured data

## Quick Start

```bash
# Create a new Sanity project
npm create sanity@latest -- --template clean --typescript

# Start the studio
cd studio-name
npm run dev
```

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Sanity Studio  │────▶│  Content Lake   │◀────│   Your Site     │
│   (Edit UI)     │     │    (API)        │     │   (Astro/Next)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

- **Studio** - Where editors manage content
- **Content Lake** - Sanity's hosted API
- **Your Site** - Fetches content via GROQ queries

## Pricing

| Plan | Price | Features |
|------|-------|----------|
| Free | $0 | 100K API requests/month |
| Growth | $15/user/mo | 1M requests, roles |
| Enterprise | Custom | SLA, support |

## Related

- [Sanity + Astro](/integrations/sanity/astro/) - Integration guide
- [Sanity MCP](/integrations/sanity/mcp/) - AI-powered content access
