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
- Maintenance command scheduling and tracking
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

### Maintenance Scheduling
- 6 pre-seeded maintenance command types:
  - Security Review (weekly)
  - Code Review (monthly)
  - Architecture Review (quarterly)
  - Test Coverage (monthly)
  - Dependency Updates (weekly)
  - Performance Audit (quarterly)
- Visual checklist with overdue indicators
- Full maintenance history per application
- Quick-add dialog for logging maintenance runs

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
- `maintenance_command_types` - Reference data for maintenance commands
- `maintenance_runs` - User maintenance command execution history

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

# Setup environment variables (using 1Password CLI)
npm run env:inject

# Run development server
npm run dev
```

## Environment Variables

### 1Password CLI Integration (Recommended)

This project uses 1Password CLI to securely manage environment variables. Secrets are never stored in git.

**Setup:**

1. Install 1Password CLI (`op`)
2. Store your Supabase credentials in 1Password under the "Business" vault
3. Run the env injection script:
   ```bash
   npm run env:inject
   ```

This generates `.env.local` from the `.env.local.tpl` template with secrets injected from 1Password.

**Template Format (.env.local.tpl):**
```bash
NEXT_PUBLIC_SUPABASE_URL={{ op://Business/NEXT_PUBLIC_SUPABASE_URL/credential }}
NEXT_PUBLIC_SUPABASE_ANON_KEY={{ op://Business/Supabase JWT Key/credential }}
SUPABASE_SERVICE_ROLE_KEY={{ op://Business/SUPABASE_SERVICE_ROLE_KEY/credential }}
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Benefits:**
- Secrets never touch git history
- One command to sync all secrets
- Team-friendly (anyone can use the template)
- Version controlled template shows required vars

### Manual Setup (Alternative)

If not using 1Password, create `.env.local` manually:

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
| `npm run env:inject` | Generate .env.local from 1Password |

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
- Phase 10: Maintenance Command Scheduling ✓

## Recent Updates

See [Progress](./progress) for latest session updates.

## Documentation

- [Architecture](./architecture) - System architecture and design decisions
- [Plan](./plan) - Implementation plan with tasks and dependencies
- [Progress](./progress) - Development progress and status

## Using with Claude Code

Claude Code can help you develop, customize, and maintain the JB Cloud App Tracker efficiently.

### Getting Started

**Set up the development environment:**
```bash
# Clone the repository
git clone <repo-url>
cd jb-cloud-app-tracker

# Install dependencies
npm install

# Set up environment variables with 1Password
npm run env:inject

# Run development server
npm run dev
```

**Ask Claude Code for help:**
```
"What environment variables do I need to set up this project?"
```

Claude Code will scan `.env.local.tpl` and explain each variable.

### Feature Development

**Add new features quickly:**
```
"Add a 'favorite' feature to applications:
- Add is_favorite boolean to database
- Create Server Action to toggle favorite
- Add star icon to application cards
- Filter applications by favorite status"
```

**Integrate new providers:**
```
"Add Netlify integration:
- Store Netlify API token in user settings
- Create Netlify API client
- Link applications to Netlify sites
- Sync deployments
- Map status to our deployment statuses"
```

### Database Operations

**Modify schema:**
```
"Add an 'archived_at' timestamp to applications table and create archive/unarchive functionality"
```

Claude Code will:
1. Generate Supabase migration
2. Update TypeScript types
3. Create Server Actions
4. Add UI components
5. Update RLS policies

**Query optimization:**
```
"The applications dashboard is slow. Analyze the queries and suggest optimizations"
```

### Testing and Debugging

**Write tests:**
```
"Create tests for the Vercel sync functionality covering:
- Successful sync
- API token missing
- Invalid project ID
- Rate limiting
- Network errors"
```

**Debug issues:**
```
"Deployments aren't syncing from Cloudflare. Add detailed logging to debug the syncCloudflareDeployments action"
```

### API Integration

**Test provider APIs:**
```bash
# Test Vercel API
curl -H "Authorization: Bearer $VERCEL_API_TOKEN" \
  https://api.vercel.com/v9/projects

# Test Cloudflare API
curl -H "Authorization: Bearer $CF_API_TOKEN" \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/pages/projects"
```

**Ask Claude Code for help:**
```
"The Vercel API is returning 403. What could be wrong with my authentication?"
```

### Customization

**Theme customization:**
```
"Change the primary color from blue to purple throughout the app"
```

**Add custom fields:**
```
"Add a 'cost' field to applications to track monthly hosting costs, with sum total on dashboard"
```

### Deployment

**Deploy to Vercel:**
```bash
# Deploy preview
vercel

# Deploy to production
vercel --prod
```

**Environment variable management:**
```
"Copy all environment variables from .env.local to Vercel production environment"
```

### Real-World Examples

**Example 1: Add analytics dashboard**
```
"Create an analytics page showing:
- Deployments over time (line chart)
- Deployments by status (pie chart)
- Most active applications (bar chart)
- Average deployment duration"
```

**Example 2: Email notifications**
```
"Send email when a deployment fails:
- Integrate with Resend
- Create email template
- Trigger on deployment status change
- Add email preferences to user settings"
```

**Example 3: Mobile app**
```
"What would I need to create a React Native mobile app for this project?"
```

Claude Code will outline:
- Expo setup
- API client
- Authentication flow
- Core screens
- State management
