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
- **UI**: Tailwind CSS + custom shadcn-style components
- **Deployment**: Vercel

## Features

### Phase 1 (Complete)
- Site management (add/edit/delete)
- Dashboard with status overview
- Plugin/theme listing with update status
- Health checks (online/offline status)
- Bulk sync functionality
- WP Manager Connector plugin for restricted hosts

### Phase 2 (In Progress)
- [Bulk plugin/theme updates](/wp-manager/bulk-updates/)
- [Activity logging](/wp-manager/activity-logging/)
- Site credential editing
- Style guide page

### Planned
- User management across sites
- Activity logging
- Scheduled syncing
- Backup coordination
- Security scanning

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

## Repository

[GitHub: jb-cloud-wp-manager](https://github.com/Aventerica89/jb-cloud-wp-manager)
