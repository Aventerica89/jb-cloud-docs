---
title: WP Manager
description: A self-hosted WordPress site management dashboard for centralized plugin/theme updates and health monitoring.
sidebar:
  order: 0
---

WP Manager is a lightweight, self-hosted WordPress site management dashboard. Think MainWP, but built with modern tech and focused on simplicity.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Turso (SQLite edge database)
- **ORM**: Drizzle ORM
- **UI**: shadcn/ui + Tailwind CSS
- **Charts**: Recharts
- **Testing**: Vitest (63 tests, 100% coverage)
- **Deployment**: Vercel

## Features

### Phase 1 (Complete)
- Site management (add/edit/delete)
- Dashboard with status overview
- Plugin/theme listing with update status
- Health checks (online/offline status)
- Bulk sync functionality
- WP Manager Connector plugin for restricted hosts

### Phase 2 (Complete)
- [Bulk plugin/theme updates](/wp-manager/bulk-updates/)
- [Activity logging](/wp-manager/activity-logging/)
- [TDD Utilities](/wp-manager/tdd-utilities/) - Validation, health scoring, scheduling
- [UI Components](/wp-manager/ui-components/) - Charts, toasts, mobile sidebar
- Site credential editing
- Style guide page

### Phase 3 Features
- Dashboard charts (site status pie chart, updates bar chart)
- Health score calculation with "Sites Needing Attention" section
- Toast notifications for user feedback
- Mobile responsive sidebar with hamburger menu
- Client-side form validation

### Planned
- User management across sites
- Scheduled syncing
- Backup coordination
- Security scanning

## Dashboard Overview

The dashboard provides at-a-glance status:

| Stat | Description |
|------|-------------|
| Total Sites | Number of connected sites |
| Online | Sites responding to health checks |
| Offline | Sites not responding |
| Updates Available | Combined plugin + theme updates |

### Charts

- **Site Status**: Pie chart showing online/offline/unknown distribution
- **Pending Updates**: Bar chart showing plugin vs theme updates

### Health Scores

Sites are scored 0-100 based on:
- Online/offline status
- SSL certificate validity
- Number of pending updates
- Time since last health check

Sites with scores below 80 appear in the "Sites Needing Attention" section.

## Connecting a WordPress Site

### Option 1: Application Passwords (Standard)

For WordPress 5.6+ with standard REST API access:

1. Go to your WordPress site
2. Navigate to: **Users > Profile > Application Passwords**
3. Create a new application password
4. Add the site in WP Manager with the URL and credentials

### Option 2: WP Manager Connector Plugin

For hosts that block REST API (like xCloud.host) or have security plugins:

1. Upload `wp-manager-connector.php` via **Plugins > Add New > Upload Plugin**
2. Activate the plugin
3. Go to **Settings > WP Manager** and set a secret key
4. In WP Manager, add your site using the secret key as the password

WP Manager automatically detects the connector plugin and uses it for syncing.

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add TURSO_DATABASE_URL and TURSO_AUTH_TOKEN

# Push database schema
npm run db:push

# Start development server
npm run dev
```

### Testing

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

### Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run db:push` | Push schema to database |
| `npm run db:studio` | Open Drizzle Studio |
| `npm test` | Run test suite |

## Repository

[GitHub: jb-cloud-wp-manager](https://github.com/Aventerica89/jb-cloud-wp-manager)

## Live Site

[cloud-manager.jbcloud.app](https://cloud-manager.jbcloud.app)
