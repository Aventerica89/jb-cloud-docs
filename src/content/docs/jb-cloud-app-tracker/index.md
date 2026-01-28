---
title: JB Cloud App Tracker
description: Personal web application for tracking cloud applications across multiple providers
source_project: /Users/jb/jb-cloud-app-tracker
sidebar:
  order: 0
---

A personal web application for tracking and managing cloud applications across multiple providers (Vercel, Cloudflare, Railway, AWS, etc.). Built with Next.js 15 App Router, Supabase for database and auth, deployed on Vercel.

## Overview

Track all your cloud applications in one place with automatic deployment syncing, status monitoring, and provider integrations.

**Problem Solved:**
- Hard to track what's deployed where across multiple providers
- Need visibility into cloud apps with no central place to see all applications
- Managing app lifecycle from development to production

**Live Site:** [apps.jbcloud.app](https://apps.jbcloud.app)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Hosting | Vercel |
| UI | Tailwind CSS + shadcn/ui |
| Icons | Lucide React |
| Validation | Zod |
| Testing | Vitest |

## Key Features

### Core Functionality
- Dashboard with application statistics and recent deployments
- Application CRUD with tagging system
- Deployment tracking across environments (dev, staging, production)
- Cloud provider management
- Search and filter applications

### Provider Integrations

#### Vercel Integration
- Automatic deployment sync from Vercel API
- Project linking with dropdown selection
- Status mapping (READY → deployed, ERROR → failed, etc.)

#### Cloudflare Pages Integration
- Automatic deployment sync from Cloudflare Pages API
- Account ID and API token configuration
- Project linking with dropdown selection

#### Auto-Sync
- Deployments automatically sync when viewing application detail page
- 500ms delay on page load (non-blocking)
- Syncs both Vercel and Cloudflare in parallel if configured
- Manual sync buttons available for on-demand refresh

### Authentication & Security
- Email/password authentication
- Forgot password flow with email reset
- Row-level security on all tables
- SQL injection protection
- Open redirect prevention
- Security headers (CSP, HSTS, X-Frame-Options)

### User Experience
- Dark mode support with system preference detection
- Responsive design (mobile-first)
- Optimistic UI updates
- Form validation with Zod

## Database Schema

### Core Tables
- `applications` - Cloud apps with name, description, status, tech_stack
- `cloud_providers` - User-owned providers (Vercel, Cloudflare, etc.)
- `deployments` - Links apps to providers and environments
- `environments` - Shared table (dev, staging, production)
- `tags` - User-owned labels for organizing apps
- `application_tags` - Junction table for many-to-many
- `user_settings` - API tokens for provider integrations

### Key Relationships
```
applications --< deployments >-- cloud_providers
applications >--< tags (via application_tags)
deployments >-- environments
```

## Quick Start

```bash
# Clone repository
git clone <repo-url>
cd jb-cloud-app-tracker

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

## Environment Variables

Required in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm test` | Run unit tests |
| `npm run lint` | Lint code |

## Architecture Decisions

### Server Actions over API Routes
Use Server Actions for all CRUD operations for type safety, less boilerplate, and progressive enhancement. API Routes reserved for webhooks only.

### User-Owned Cloud Providers
Each user has their own provider list with seeded defaults on signup. Allows for custom providers and personalized experience.

### Environments as Shared Table
Fixed environments table (dev, staging, production) shared across all users for consistency and simpler queries.

### Tags with Junction Table
Proper many-to-many relationship with separate junction table for normalization and RLS compatibility.

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, signup, forgot password, reset password
│   ├── (dashboard)/      # Protected routes
│   │   ├── dashboard/    # Overview stats
│   │   ├── applications/ # App management
│   │   ├── deployments/  # Deployment tracking
│   │   ├── providers/    # Provider config
│   │   ├── settings/     # User settings (API tokens)
│   │   └── tags/         # Tag management
├── components/
│   ├── ui/               # shadcn/ui components
│   └── [feature]/        # Feature-specific components
├── lib/
│   ├── supabase/         # Supabase clients
│   ├── actions/          # Server actions
│   ├── validations/      # Zod schemas
│   └── utils/            # Utilities
└── types/                # TypeScript types
```

## Implementation Status

All phases complete:
- Phase 1: Foundation (auth, layout) ✓
- Phase 2: Core Data (providers, tags, applications) ✓
- Phase 3: Deployments ✓
- Phase 4: Dashboard ✓
- Phase 5: Polish (search, dark mode) ✓
- Phase 6: Launch (testing, deploy) ✓
- Phase 7: Vercel Integration (API sync) ✓
- Phase 8: Cloudflare Integration (API sync) ✓
- Phase 9: Auto-sync deployments ✓

## Recent Updates

See [Progress](./progress) for latest session updates.

## Documentation

- [Architecture](./architecture) - System architecture and design decisions
- [Plan](./plan) - Implementation plan with tasks and dependencies
- [Progress](./progress) - Development progress and status
