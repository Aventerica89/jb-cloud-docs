---
title: LinkShort URL Shortener
description: Fast, free URL shortener running on Cloudflare's edge network with multi-user support, categories, and analytics
sidebar:
  order: 0
source_project: /Users/jb/cf-url-shortener
---

LinkShort is a production URL shortener that runs on Cloudflare's edge network. It features multi-user support, categories, tags, click analytics, and a clean dark UI inspired by Shadcn.

**Source Repository**: [cf-url-shortener](https://github.com/Aventerica89/cf-url-shortener)

## Live Instances

- **Main App**: [links.jbcloud.app](https://links.jbcloud.app)
- **Artifact Manager**: [artifact-manager.jbmd-creations.workers.dev](https://artifact-manager.jbmd-creations.workers.dev)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Cloudflare Workers (edge computing) |
| **Database** | Cloudflare D1 (SQLite) |
| **Auth** | Cloudflare Access (Zero Trust) |
| **UI** | Vanilla HTML/CSS/JS (Shadcn-style) |
| **Mobile** | Expo React Native (in development) |
| **Extension** | Chrome Extension (Manifest V3) |
| **CI/CD** | GitHub Actions + Wrangler |

## Features

### Core URL Shortener
- **Fast Redirects** - Global edge network with <50ms latency
- **Multi-User** - Each user has private links via Cloudflare Access
- **Categories** - Organize links by category with color coding
- **Tags** - Flexible tagging system for cross-cutting organization
- **Search** - Instant search with Cmd+K shortcut
- **Click Tracking** - View analytics for each shortened link
- **Password Protected** - PBKDF2 hashed passwords with constant-time comparison
- **Security Hardened** - XSS prevention, timing attack prevention, OWASP compliant
- **Import/Export** - Backup and restore links as JSON
- **Dark Theme** - Clean Shadcn-inspired UI

### Artifact Manager
A companion app for tracking Claude.ai artifacts:
- Track published artifacts (claude.site URLs)
- Track downloaded artifacts (local files)
- Collections and tags for organization
- Full-text search across artifacts
- Export/Import JSON backup
- Chrome extension for one-click saving

### Mobile App (Beta)
React Native companion app with:
- View and manage shortened links
- Quick copy functionality
- Click analytics
- Category and tag filtering
- Create new short links on-the-go

## Quick Start

### Deploy Your Own Instance

1. **Fork the repo**: [github.com/user/cf-url-shortener](https://github.com)

2. **Set up Cloudflare**:
```bash
# Create D1 database
wrangler d1 create url-shortener

# Update wrangler.toml with database_id

# Deploy
wrangler deploy
```

3. **Configure GitHub Actions**:
Add these secrets to your GitHub repo:
- `CLOUDFLARE_API_TOKEN` - Create at Cloudflare dashboard
- `CLOUDFLARE_ACCOUNT_ID` - From Cloudflare sidebar

4. **Push to main** - Auto-deploys via GitHub Actions

### Using the Admin Dashboard

Visit `https://your-domain.com/admin` to:
- Create, edit, delete links
- Organize with categories and tags
- Search your link library
- View click statistics
- Export/import data

## Cost

Everything runs on **Cloudflare's free tier**:

| Resource | Free Limit | Typical Usage |
|----------|------------|---------------|
| Workers | 100,000 requests/day | ~3000/day for personal use |
| D1 Database | 5GB storage | ~10MB for 10,000 links |
| Access | 50 users | 1 for personal use |

No credit card required. No surprise bills.

## Repository

[GitHub: cf-url-shortener](https://github.com/Aventerica89/cf-url-shortener)

## Recent Security Updates

January 28, 2026 - Critical security improvements deployed:
- XSS prevention across 11 DOM manipulation points
- PBKDF2 password hashing (100,000 iterations)
- Constant-time comparison to prevent timing attacks
- All user-controlled data properly escaped
- NPM dependency vulnerabilities fixed

See [Progress](/linkshort/progress) for full security audit details.

## Related Documentation

- [Architecture](/linkshort/architecture) - System design and technical details
- [Mobile App](/linkshort/mobile-app) - React Native companion app
- [Progress](/linkshort/progress) - Development status and recent updates
