---
title: Implementation Plan - JB Cloud App Tracker
description: Implementation plan with tasks and phases
sidebar:
  order: 2
---

## Overview

A personal web application for tracking cloud applications across multiple providers (Vercel, Railway, Cloudflare, etc.). Built with Next.js 15 App Router, Supabase for database and auth, deployed on Vercel.

## MVP Scope

### In Scope (v1 - MVP)

**Core Features:**
- User authentication (Supabase Auth with email/password)
- Dashboard with stats overview
- Application CRUD (create, read, update, delete)
- Deployment tracking (link apps to providers + environments)
- Cloud provider management (seeded defaults + custom)
- Tag management with many-to-many relationships
- Basic search/filter on applications list
- Dark mode support
- Responsive design (mobile-first)
- Vercel API integration for deployment sync
- Cloudflare Pages API integration for deployment sync
- Auto-sync deployments on page view

### Deferred (v2+)

- Social auth (GitHub, Google)
- Deployment notifications/webhooks
- Team/organization support
- Activity audit log
- Bulk operations
- Export functionality (CSV/JSON)
- Custom fields on applications
- Deployment health monitoring
- Cost tracking

### Out of Scope

- Multi-tenancy/SaaS features
- Billing/subscriptions
- Real-time collaboration
- Mobile native apps
- Custom domain management per application
- CI/CD integration

## Implementation Phases

### Phase 1: Foundation ✓
**Status:** Complete

- Project initialization with Next.js 15, TypeScript, Tailwind
- Supabase setup with database migrations
- Authentication (login, signup, callback)
- Base layout with sidebar navigation
- Dark mode support
- Testing infrastructure (Vitest)

### Phase 2: Core Data ✓
**Status:** Complete

- Cloud providers CRUD
- Tags CRUD
- Applications CRUD with tech stack
- Application-tag relationship management
- Search and filter functionality

### Phase 3: Deployments ✓
**Status:** Complete

- Deployments CRUD
- Link deployments to applications, providers, environments
- Deployment list view
- Deployment detail view
- Deployment status tracking

### Phase 4: Dashboard ✓
**Status:** Complete

- Stats cards (total apps, deployments, providers)
- Recent deployments list
- Quick action buttons
- Responsive layout

### Phase 5: Polish ✓
**Status:** Complete

- Search applications by name and description
- Filter by status and tags
- Dark mode toggle in header
- Loading states
- Error handling
- Form validation improvements

### Phase 6: Launch ✓
**Status:** Complete

- Unit tests for utilities and components
- Integration tests for server actions
- E2E tests for critical flows (Playwright)
- Environment variable configuration
- Vercel deployment
- Production testing

### Phase 7: Vercel Integration ✓
**Status:** Complete

- User settings page for API tokens
- Vercel API client (`vercel.ts`)
- Fetch Vercel projects
- Link application to Vercel project via dropdown
- Sync deployments from Vercel API
- Status mapping (READY → deployed, ERROR → failed, etc.)
- Manual sync button on application detail page

### Phase 8: Cloudflare Integration ✓
**Status:** Complete

- Cloudflare API token and account ID settings
- Cloudflare API client (`cloudflare.ts`)
- Fetch Cloudflare Pages projects
- Link application to Cloudflare project via dropdown
- Sync deployments from Cloudflare Pages API
- Status mapping (deploy success → deployed, failure → failed, etc.)
- Manual sync button for Cloudflare
- Database migration for `cloudflare_project_name` field

### Phase 9: Auto-Sync ✓
**Status:** Complete

- Auto-sync client component
- Trigger sync 500ms after page load
- Sync both Vercel and Cloudflare in parallel
- Non-blocking sync with page refresh on completion
- Maintain manual sync buttons for user control

### Phase 10: Security Hardening ✓
**Status:** Complete

- Fix SQL injection in search query (sanitize input)
- Fix open redirect in auth callback (validate next param)
- Fix open redirect in login (validate redirect param)
- Add security headers:
  - Content Security Policy (CSP)
  - HTTP Strict Transport Security (HSTS)
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin

### Phase 11: Password Recovery ✓
**Status:** Complete

- Forgot password page with email form
- Reset password page for setting new password
- `resetPasswordRequest` server action
- `updatePassword` server action
- "Forgot password?" link on login page
- Email templates in Supabase Auth

### Phase 12: Production Deployment ✓
**Status:** Complete

- Custom domain configuration: `apps.jbcloud.app`
- Environment variables in Vercel
- Supabase Auth redirect URLs updated
- Production testing and verification

## Database Schema

### Tables

**applications**
- Core application data
- Links to Vercel and Cloudflare projects
- Status tracking
- Tech stack array
- Timestamps

**cloud_providers**
- User-owned provider list
- Seeded defaults on signup
- Icon and metadata

**deployments**
- Links applications to providers and environments
- Tracks URL, branch, commit SHA
- Deployment status
- Timestamp tracking

**environments**
- Shared table (dev, staging, production)
- Read-only for users

**tags**
- User-owned labels
- Color customization

**application_tags**
- Junction table for many-to-many

**user_settings**
- API tokens for provider integrations
- Encrypted storage

### Row Level Security

All tables have RLS policies:
- Users can only access their own data
- Deployments accessible through application ownership
- Tags accessible through application ownership
- Environments are public read-only

## Key Technical Decisions

### Server Actions over API Routes
Use Server Actions for all CRUD operations for type safety, progressive enhancement, and less boilerplate.

### React Server Components for Data Fetching
Fetch data directly in Server Components without an API layer. Enables streaming, better caching, and simpler code.

### Zod for Validation
All inputs validated with Zod schemas for type safety and clear error messages.

### User-Owned Providers
Each user gets their own provider list with seeded defaults on signup. Allows customization.

### Shared Environments
Fixed environments table (dev, staging, prod) shared across all users for consistency.

### Junction Table for Tags
Proper many-to-many relationship with separate junction table for normalization and RLS compatibility.

## Testing Strategy

### Unit Tests
- Utility functions
- Validation schemas
- Helper functions

### Integration Tests
- Server actions
- Database operations
- Authentication flows

### E2E Tests (Playwright)
- User signup and login
- Create application
- Create deployment
- Dashboard navigation
- Search and filter

### Coverage Target
80% minimum code coverage

## Security Checklist

- [x] Row Level Security (RLS) on all tables
- [x] Input validation with Zod
- [x] Auth verification in all server actions
- [x] CSRF protection (built-in with Server Actions)
- [x] Environment variables for secrets
- [x] SQL injection protection (parameterized queries)
- [x] Open redirect prevention
- [x] Security headers (CSP, HSTS, etc.)
- [x] Encrypted API token storage
- [x] Type safety with TypeScript strict mode

## Future Enhancements

### v2 Features
- Social authentication (GitHub, Google)
- Deployment webhooks for automatic updates
- Team/organization support
- Activity audit log
- Export functionality (CSV/JSON)

### v3 Features
- Deployment health monitoring
- Cost tracking per application
- Custom fields on applications
- Bulk operations
- Advanced analytics dashboard

## Dependencies

| Package | Purpose |
|---------|---------|
| next | Framework |
| react, react-dom | UI library |
| @supabase/supabase-js | Database client |
| @supabase/ssr | SSR support |
| @vercel/sdk | Vercel API client |
| zod | Schema validation |
| lucide-react | Icons |
| next-themes | Dark mode |
| tailwindcss | Styling |
| @radix-ui/* | UI primitives |
| react-hook-form | Form handling |
| vitest | Testing |

## Development Workflow

1. Plan feature with task breakdown
2. Write tests first (TDD)
3. Implement feature
4. Run tests and verify coverage
5. Code review (security, quality)
6. Commit with conventional commit message
7. Deploy to Vercel preview
8. Test preview deployment
9. Merge to main for production deployment
