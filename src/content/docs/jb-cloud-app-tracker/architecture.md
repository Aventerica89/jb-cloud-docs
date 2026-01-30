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

## Using with Claude Code

Claude Code can help you understand the architecture, extend features, and debug issues in the JB Cloud App Tracker.

### Understanding the Architecture

**Explore the codebase structure:**
```bash
# Find all Server Actions
fd -e ts . src/lib/actions

# Locate React Server Components
rg "export default" src/app --type tsx

# Find database schema
fd schema supabase/migrations
```

**Understand data flow:**
```
"Trace the flow when a user creates a new application from form submission to database insert and UI update"
```

Claude Code will explain:
1. Form submission in client component
2. Server Action validation with Zod
3. Supabase insert with RLS check
4. Path revalidation
5. Redirect or optimistic UI update

### Database Schema Management

**Generate migrations:**
```
"Add a 'notes' field to applications table for free-form text notes"
```

Claude Code will:
- Generate Supabase migration SQL
- Update TypeScript types
- Add RLS policies
- Update Server Actions
- Create UI components

**Understand relationships:**
```
"Show me all tables that reference the applications table and their relationship type"
```

### Adding New Features

**Create new Server Actions:**
```
"Add Server Actions for:
- Bulk delete applications
- Archive multiple applications at once
- Export applications as CSV"
```

**Add new provider integration:**
```
"Integrate Railway API:
- Add railway_project_id to applications table
- Create Railway API client
- Fetch projects and deployments
- Add sync functionality
- Update UI with Railway selector"
```

### Security Review

**Check RLS policies:**
```
"Review all RLS policies and verify:
- Users can only access their own data
- No data leaks through joins
- Insert policies are restrictive
- Update policies check ownership"
```

**Audit Server Actions:**
```
"Check all Server Actions for:
- Proper authentication checks
- Input validation with Zod
- SQL injection prevention
- Open redirect vulnerabilities"
```

### Testing

**Generate tests:**
```
"Create Vitest tests for the applications Server Actions covering:
- Create application with valid data
- Create with invalid data (Zod errors)
- Update owned application (success)
- Update unowned application (RLS blocks)
- Delete with cascading relationships"
```

**Integration tests:**
```
"Create Playwright E2E tests for:
- User signup and login
- Create application
- Link to Vercel project
- Sync deployments
- View analytics"
```

### Performance Optimization

**Find N+1 queries:**
```
"Analyze the dashboard page data fetching and identify any N+1 query issues"
```

**Optimize Server Components:**
```
"Review the applications list page for:
- Unnecessary data fetching
- Missing database indexes
- Opportunities for caching
- Parallel data fetching"
```

### Real-World Examples

**Example 1: Add GitHub integration**
```
"Implement GitHub deployments integration:
1. Add github_repo field to applications
2. Create GitHub API client
3. Fetch GitHub Actions runs
4. Map run status to deployment status
5. Add UI for repo linking
6. Auto-sync on page view"
```

**Example 2: Team collaboration**
```
"Add team features:
1. Create teams table with RLS
2. Add team_members junction table
3. Update application ownership to support teams
4. Add team invitation flow
5. Modify RLS policies for team access"
```

**Example 3: Deployment notifications**
```
"Add webhook support for deployment updates:
1. Create API route for webhooks
2. Verify webhook signatures
3. Update deployment status
4. Send email notifications
5. Add webhook URL to settings page"
```

### Debugging

**Trace Server Action errors:**
```
"The syncVercelDeployments action is failing silently. Add logging and error handling to debug the issue"
```

**Check authentication:**
```
"User is getting redirected to login even though they're authenticated. Debug the middleware and auth checks"
```

**Database query debugging:**
```bash
# Enable Supabase query logging
# In your Server Component
const { data, error } = await supabase
  .from('applications')
  .select('*')
  .explain()

# Or check Supabase Dashboard > SQL Editor > Query Performance
```

### Deployment

**Environment variable management:**
```
"List all required environment variables and their purpose, then check if they're properly set in Vercel"
```

**Pre-deployment checklist:**
```
"Generate a deployment checklist covering:
- Environment variables configured
- Database migrations applied
- Supabase Auth URLs updated
- Security headers configured
- RLS policies tested
- API tokens encrypted"
```

### Data Migration

**Migrate from another system:**
```
"Create a script to import applications from a CSV file with columns:
name, description, repository_url, vercel_project_id, status"
```

**Backup and restore:**
```
"Create Server Actions to:
- Export all user data as JSON
- Import from JSON backup
- Validate imported data
- Handle conflicts (skip/overwrite)"
```
