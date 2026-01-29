---
title: Architecture - JB Cloud App Tracker
description: System architecture and design decisions
sidebar:
  order: 1
---

Version: 1.0.0
Last Updated: 2026-01-28
Status: Implemented

## Overview

A personal web application for tracking cloud applications across multiple providers (Vercel, Cloudflare, Railway, AWS, etc.). Provides a central dashboard for visibility into all deployed applications and their lifecycle.

### Goals

- Single source of truth for all cloud applications
- Track deployments across environments (dev, staging, production)
- Monitor application status and health
- Organize apps with tags and categories
- Automatic deployment syncing via provider APIs

## System Architecture

### High-Level Components

| Component | Responsibility |
|-----------|----------------|
| Middleware | Auth verification, route protection, redirects |
| RSC (Server Components) | Data fetching, initial render, SEO |
| RCC (Client Components) | Interactivity, forms, real-time updates |
| Server Actions | Mutations (create, update, delete) |
| API Routes | Webhook endpoints only |
| Supabase Auth | User authentication, session management |
| PostgreSQL | Persistent data storage |
| RLS | Row-level security, data isolation |

### Data Flow

**Read Flow (Dashboard Load):**
1. User requests `/dashboard`
2. Middleware verifies auth cookie
3. Server Component queries Supabase
4. Data returned and rendered as HTML
5. Page streams to user

**Write Flow (Create App):**
1. User submits form
2. Server Action validates input with Zod
3. Insert application into Supabase
4. Revalidate path cache
5. Redirect or update UI

## Data Models

### Entity Relationships

```
users ||--o{ applications : owns
users ||--o{ cloud_providers : owns
applications ||--o{ deployments : has
applications ||--o{ maintenance_runs : has
applications }o--o{ tags : has
cloud_providers ||--o{ deployments : hosts
environments ||--o{ deployments : contains
maintenance_command_types ||--o{ maintenance_runs : defines
```

### Core Tables

**applications**
- `id` (uuid, PK)
- `user_id` (uuid, FK to auth.users)
- `name` (text)
- `description` (text, nullable)
- `repository_url` (text, nullable)
- `tech_stack` (text array)
- `status` (enum: active, inactive, archived, maintenance)
- `vercel_project_id` (text, nullable)
- `cloudflare_project_name` (text, nullable)
- `created_at`, `updated_at` (timestamptz)

**cloud_providers**
- `id` (uuid, PK)
- `user_id` (uuid, FK)
- `name`, `slug` (text)
- `icon_name` (text, nullable)
- `is_active` (boolean)
- `created_at` (timestamptz)

**deployments**
- `id` (uuid, PK)
- `application_id` (uuid, FK)
- `provider_id` (uuid, FK)
- `environment_id` (uuid, FK)
- `url` (text, nullable)
- `branch`, `commit_sha` (text, nullable)
- `status` (enum: pending, building, deployed, failed, rolled_back)
- `deployed_at`, `created_at` (timestamptz)

**environments** (shared, read-only for users)
- `id` (uuid, PK)
- `name` (text, unique): "Development", "Staging", "Production"
- `slug` (text, unique)
- `sort_order` (int)

**tags**
- `id` (uuid, PK)
- `user_id` (uuid, FK)
- `name` (text)
- `color` (text, default: #3b82f6)

**application_tags** (junction)
- `application_id`, `tag_id` (composite PK)

**user_settings**
- `user_id` (uuid, PK, FK)
- `vercel_api_token` (text, encrypted, nullable)
- `cloudflare_api_token` (text, encrypted, nullable)
- `cloudflare_account_id` (text, nullable)

**maintenance_command_types** (shared, read-only for users)
- `id` (uuid, PK)
- `name` (text, unique)
- `slug` (text, unique)
- `description` (text)
- `recommended_frequency_days` (int)
- `icon` (text)
- `color` (text, default: #3b82f6)
- `sort_order` (int)
- `is_active` (boolean)
- `created_at` (timestamptz)

**maintenance_runs**
- `id` (uuid, PK)
- `application_id` (uuid, FK)
- `command_type_id` (uuid, FK to maintenance_command_types)
- `status` (text, default: completed)
- `results` (jsonb, nullable)
- `notes` (text, nullable)
- `run_at` (timestamptz)
- `created_at` (timestamptz)

### Row Level Security (RLS)

All tables have RLS enabled with policies:
- Users can only view/modify their own data
- Deployments accessible through application ownership
- Tags accessible through application ownership
- Maintenance runs accessible through application ownership
- Environments are public read-only
- Maintenance command types are public read-only

## API Structure

### Server Actions vs API Routes

**Decision: Server Actions for all mutations, RSC for reads**

| Use Case | Approach | Rationale |
|----------|----------|-----------|
| CRUD Operations | Server Actions | Type-safe, progressive enhancement, less boilerplate |
| Data Fetching | RSC Direct | No API layer needed, streaming, caching |
| Webhooks | API Routes | External services need HTTP endpoints |

### Server Actions Structure

Located in `src/lib/actions/`:
- `applications.ts` - Application CRUD
- `deployments.ts` - Deployment CRUD
- `providers.ts` - Provider management
- `tags.ts` - Tag management
- `maintenance.ts` - Maintenance command tracking
- `auth.ts` - Authentication actions
- `settings.ts` - User settings (API tokens)
- `vercel.ts` - Vercel API client
- `cloudflare.ts` - Cloudflare API client
- `sync.ts` - Deployment sync logic

All actions:
- Use `'use server'` directive
- Validate input with Zod schemas
- Check authentication with `supabase.auth.getUser()`
- Return `ActionResult<T>` type
- Call `revalidatePath()` for cache invalidation

## File Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   ├── reset-password/page.tsx
│   │   ├── callback/route.ts
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── applications/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       └── edit/page.tsx
│   │   ├── deployments/page.tsx
│   │   ├── providers/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── tags/page.tsx
│   │   └── layout.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── layout/          # Header, sidebar, nav
│   ├── applications/    # App list, form, detail
│   ├── deployments/     # Deployment list, form
│   ├── providers/       # Provider management
│   ├── maintenance/     # Maintenance checklist, history, add dialog
│   ├── settings/        # Token forms (Vercel, Cloudflare)
│   ├── tags/            # Tag management
│   └── dashboard/       # Dashboard components
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── actions/         # Server actions
│   ├── validations/     # Zod schemas
│   └── utils/           # Utilities
├── hooks/               # Custom React hooks
└── types/               # TypeScript types
```

## Key Features

### Dashboard Overview
- Stats cards (total apps, deployments, providers)
- Recent deployments list
- Apps by status chart
- Provider distribution chart
- Quick actions

### Maintenance Scheduling
- 6 pre-seeded maintenance command types:
  - Security Review (weekly recommended)
  - Code Review (monthly recommended)
  - Architecture Review (quarterly recommended)
  - Test Coverage (monthly recommended)
  - Dependency Updates (weekly recommended)
  - Performance Audit (quarterly recommended)
- Visual checklist showing status per command type
- Overdue indicators based on recommended frequency
- Full history of maintenance runs per application
- Quick-add dialog for logging maintenance runs
- Color-coded badges and status indicators

### Provider Integrations

**Vercel Integration:**
- Store API token in user settings
- Fetch projects from Vercel API
- Link application to Vercel project
- Sync deployments with status mapping:
  - READY → deployed
  - ERROR → failed
  - BUILDING → building
  - QUEUED → pending
  - CANCELED → rolled_back

**Cloudflare Pages Integration:**
- Store API token and account ID in user settings
- Fetch projects from Cloudflare API
- Link application to Cloudflare project
- Sync deployments with status mapping:
  - deploy + success → deployed
  - failure → failed
  - canceled → rolled_back
  - active → building
  - other → pending

**Auto-Sync:**
- Triggers 500ms after viewing application detail page
- Syncs both Vercel and Cloudflare in parallel if configured
- Non-blocking, refreshes data after completion
- Manual sync buttons available for on-demand refresh

### Security Features
- Row-level security on all tables
- Input validation with Zod
- SQL injection protection (parameterized queries)
- Open redirect prevention (validated redirects)
- Security headers:
  - Content Security Policy (CSP)
  - HTTP Strict Transport Security (HSTS)
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
- Encrypted API token storage

## Architecture Decision Records

### ADR-001: Server Actions over API Routes
**Decision:** Use Server Actions for all CRUD operations.

**Consequences:**
- Positive: Type-safe, less boilerplate, progressive enhancement
- Negative: Less familiar pattern, debugging can be harder

**Status:** Accepted

### ADR-002: User-Owned Cloud Providers
**Decision:** User-owned providers with seeded defaults on signup.

**Consequences:**
- Positive: Users can add custom providers, personalized experience
- Negative: Slight data duplication, need to seed on signup

**Status:** Accepted

### ADR-003: Environments as Shared Table
**Decision:** Shared environments table with fixed values (dev, staging, prod).

**Consequences:**
- Positive: Consistency, simpler queries, no duplication
- Negative: Users cannot create custom environments

**Status:** Accepted

### ADR-004: Tags with Junction Table
**Decision:** Separate `application_tags` junction table.

**Consequences:**
- Positive: Proper normalization, easy to query, RLS-compatible
- Negative: Extra joins required

**Status:** Accepted

### ADR-005: Maintenance Command Types as Reference Data
**Decision:** Fixed reference data in shared table, seeded at migration time.

**Consequences:**
- Positive: Consistency across users, no duplication, easy to add new types
- Positive: Users can't accidentally create duplicate or inconsistent command types
- Negative: Users cannot define custom maintenance command types
- Mitigation: Can add more types in future migrations based on user feedback

**Status:** Accepted

## Design System

| Element | Value |
|---------|-------|
| Primary Color | Blue (#3b82f6) |
| Neutrals | Slate scale |
| Font (Sans) | Inter |
| Font (Mono) | JetBrains Mono |
| Border Radius | 8px default |
| Dark Mode | System preference + manual toggle |

## Deployment

Hosted on Vercel with custom domain `apps.jbcloud.app`.

Environment variables required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL`

Supabase Auth configuration:
- Site URL: `https://apps.jbcloud.app`
- Redirect URLs: `https://apps.jbcloud.app/callback`
