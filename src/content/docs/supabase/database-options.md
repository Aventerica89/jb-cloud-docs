---
title: Database Options for Hobby Projects
description: Comparing Supabase, Neon, Turso, and self-hosting for small-scale development projects with migration paths.
sidebar:
  order: 1
---

A decision guide for choosing the right database solution for hobby and development projects, with consideration for future migration to Supabase.

## Quick Recommendation

| Scenario | Best Choice |
|----------|-------------|
| Plan to use Supabase later | **Neon** (PostgreSQL, easy migration) |
| Never migrating, want simplicity | **Turso** (SQLite, generous free tier) |
| Already have servers | **Self-host Supabase** |
| Need auth + realtime now | **Supabase Free Tier** |

## Option Comparison

### Supabase (Managed)

**What it is:** Full backend-as-a-service with PostgreSQL, Auth, Realtime, Storage, and Edge Functions.

| Aspect | Details |
|--------|---------|
| Free tier | 2 projects, pauses after 7 days inactive |
| Pro pricing | $25/org + $10/project for compute |
| Best for | Production apps needing full backend |
| Limitation | Gets expensive with multiple projects |

**Multi-project costs on Pro:**
- 1 project: $25/mo
- 3 projects: $45/mo
- 5 projects: $65/mo
- 10 projects: $115/mo

### Neon

**What it is:** Serverless PostgreSQL with instant branching and scale-to-zero.

| Aspect | Details |
|--------|---------|
| Free tier | 100 compute-hours/mo, 0.5 GB storage, 100 projects |
| Paid pricing | Usage-based, ~$2-10/mo for light apps |
| Best for | Dev projects with Supabase migration path |
| Key feature | Database branching (like git for databases) |

**Why Neon for hobby projects:**
- Scale-to-zero means idle projects don't cost
- Pure PostgreSQL = `pg_dump` directly to Supabase
- Generous free tier covers most dev work
- No pausing like Supabase free tier

**Links:**
- [neon.com](https://neon.com)
- [Neon Pricing](https://neon.com/pricing)

### Turso

**What it is:** SQLite-based edge database using libSQL.

| Aspect | Details |
|--------|---------|
| Free tier | 500M reads, 10M writes, 5 GB, 100 databases |
| Paid pricing | $4.99/mo developer plan |
| Best for | Edge-first apps, Cloudflare Workers |
| Limitation | SQLite ≠ PostgreSQL (migration requires rewrite) |

**Why NOT Turso if planning Supabase migration:**
- Different SQL dialects
- Schema rewrite required
- No direct data migration path

### Self-Hosted Supabase

**What it is:** Run Supabase on your own servers via Docker.

| Aspect | Details |
|--------|---------|
| Cost | ~$20-40/mo for a VPS |
| Best for | Multiple projects, data sovereignty |
| Limitation | Operational overhead (backups, updates) |
| xCloud caveat | 1 project per server limitation |

## Self-Hosting: Multi-Project Setup

If you have existing servers (e.g., for WordPress), you can run Supabase with multiple databases on one instance.

### Server Requirements

| Spec | Minimum | Recommended |
|------|---------|-------------|
| RAM | 4 GB | 8 GB |
| CPU | 2 cores | 4 cores |
| Disk | 50 GB SSD | 80 GB SSD |

### Key Insight

xCloud's one-click Supabase has a 1-project-per-server limitation due to port conflicts. Manual Docker setup bypasses this by using multiple PostgreSQL databases within one Supabase instance.

**Architecture:**
```
1 Server → 1 Supabase Instance → Multiple Databases
                              ├── app_tracker_db
                              ├── recipe_app_db
                              └── hd_flowsheet_db
```

Each "project" is a separate database with isolated data but shared compute.

### Resource Optimization

For 4 GB servers, disable unused Supabase services:
- logflare (analytics)
- vector (logging)
- imgproxy (image transforms)
- edge-runtime (Deno functions)

This saves ~1 GB RAM.

## Migration Paths

### Neon → Supabase (Easy)

Both are PostgreSQL. Direct migration:

```bash
# Export from Neon
pg_dump $NEON_URL > backup.sql

# Import to Supabase
psql $SUPABASE_URL < backup.sql
```

Update environment variables, done.

### Turso → Supabase (Hard)

Requires:
1. Schema rewrite (SQLite types → PostgreSQL types)
2. Query updates for dialect differences
3. Data transformation scripts
4. Potentially rewriting application code

### Self-Hosted → Supabase Cloud (Easy)

Same as Neon - it's PostgreSQL to PostgreSQL.

## Recommended Stack for Dev Projects

**Database:** Neon (free PostgreSQL)
**Auth:** Better Auth (portable, works with any database)
**Hosting:** Vercel (free tier)

This combination provides:
- Zero cost for hobby projects
- Easy migration to Supabase when ready for production
- Portable auth that works with any PostgreSQL

## Cost Comparison (5 Projects)

| Option | Monthly Cost |
|--------|--------------|
| Supabase Cloud Pro | ~$65 |
| Neon (free tier) | $0 |
| Neon (light usage) | ~$10-25 |
| Self-hosted (1 VPS) | ~$20-40 |
| Turso (free tier) | $0 |

## Decision Tree

```
Need auth + realtime built-in?
├── Yes → Supabase (accept pausing or pay Pro)
└── No → Continue

Plan to migrate to Supabase later?
├── Yes → Neon (PostgreSQL, easy migration)
└── No → Continue

Need edge performance (Cloudflare Workers)?
├── Yes → Turso (SQLite at edge)
└── No → Neon (simpler, more features)

Have existing servers?
├── Yes → Consider self-hosting
└── No → Neon or Turso free tiers
```

## Summary

For hobby/dev projects with a potential Supabase future: **Use Neon**.

- Same database engine (PostgreSQL)
- Generous free tier with scale-to-zero
- 30-minute migration when you're ready to go live
- Works great with Drizzle ORM and Better Auth
