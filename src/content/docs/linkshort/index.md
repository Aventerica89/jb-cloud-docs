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

## Using with Claude Code

Claude Code can help you deploy, customize, and maintain your LinkShort instance.

### Deployment and Setup

**Deploy your own instance:**
```bash
# Create D1 database
wrangler d1 create linkshort-prod

# Get database ID and update wrangler.toml
# Then deploy
wrangler deploy
```

**Ask Claude Code for help:**
```
"Set up my LinkShort instance with custom domain and Cloudflare Access"
```

Claude Code will guide you through:
- D1 database creation
- wrangler.toml configuration
- Custom domain setup
- Cloudflare Access configuration
- GitHub Actions setup

### Customization

**Theme customization:**
```
"Change the color scheme from blue to green:
- Primary: #22c55e
- Hover: #16a34a
- Update all UI components"
```

**Add custom features:**
```
"Add QR code generation for shortened links:
- Add QR code library
- Create generation endpoint
- Add download button to UI
- Include in link details modal"
```

### Database Management

**Query the database:**
```bash
# List all links
wrangler d1 execute linkshort-prod --command "SELECT * FROM links LIMIT 10"

# Check click analytics
wrangler d1 execute linkshort-prod --command \
  "SELECT code, COUNT(*) as clicks FROM clicks GROUP BY code ORDER BY clicks DESC"
```

**Database migrations:**
```
"Create a migration to add an 'expires_at' field to links table for auto-expiring short links"
```

### Security Enhancements

**Review security:**
```
"Audit the password-protected links feature for:
- Password hashing strength
- Timing attack prevention
- Brute force protection
- XSS vulnerabilities"
```

**Add rate limiting:**
```
"Implement rate limiting on:
- Link creation (10/hour per user)
- Redirect attempts (100/min per IP)
- Admin panel access (5 failed logins)"
```

### Chrome Extension

**Customize the extension:**
```
"Modify the Chrome extension to:
- Save links from current tab with one click
- Add custom short code suggestion
- Show link analytics in popup"
```

**Debug extension issues:**
```
"The Chrome extension isn't saving links. Check:
- Permissions in manifest.json
- API endpoint CORS headers
- Authentication token passing
- Console errors"
```

### Mobile App Development

**Setup mobile environment:**
```bash
cd mobile-app
npm install
npm start
```

**Add features:**
```
"Implement these features in the mobile app:
- Pull-to-refresh for link list
- Share link to other apps
- Quick copy with haptic feedback
- Offline mode with sync"
```

### Real-World Examples

**Example 1: Bulk import**
```
"Create a script to import links from a CSV file with columns: code, destination, category, tags"
```

**Example 2: Analytics dashboard**
```
"Build an analytics page showing:
- Total clicks over time (line chart)
- Top 10 links by clicks
- Geographic distribution (if available)
- Browser/device breakdown"
```

**Example 3: API integration**
```
"Create a REST API for external tools:
- POST /api/links (create short link)
- GET /api/links/:code (get link details)
- GET /api/links/:code/stats (get click analytics)
- Authentication via API key"
```

### Debugging

**Check deployment:**
```bash
# View deployment logs
wrangler tail

# Test the Worker locally
wrangler dev

# Check D1 database
wrangler d1 execute linkshort-prod --command "SELECT COUNT(*) FROM links"
```

**Debug common issues:**
```
"Users can't create links. Debug checklist:
- Check Cloudflare Access authentication
- Verify D1 database is accessible
- Check Worker error logs
- Test SQL queries
- Verify CORS headers"
```

### Performance Optimization

**Optimize for scale:**
```
"The app is slow with 10,000+ links. Optimize:
- Add pagination to link list
- Implement search indexing
- Cache frequently accessed links
- Add virtual scrolling to UI"
```

**Monitor performance:**
```bash
# Check Worker analytics in Cloudflare Dashboard
# Or use Wrangler
wrangler metrics
```
