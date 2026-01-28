---
title: Architecture - LinkShort
description: System architecture and technical design of the LinkShort URL shortener
sidebar:
  order: 1
---

## System Overview

LinkShort is built on Cloudflare's serverless infrastructure, leveraging Workers for compute and D1 for storage. The architecture is designed for global low-latency access and zero-maintenance scaling.

```
User Request: links.jbcloud.app/shortcode
         ↓
Cloudflare Edge Network (global)
         ↓
Worker (JavaScript runtime)
         ↓
D1 Database (SQLite) - Lookup shortcode
         ↓
302 Redirect → Destination URL
```

**Response Time**: <50ms globally

## Architecture Components

### 1. Cloudflare Workers

**Main Worker**: `worker-multiuser.js` (~5000 lines)

Handles:
- URL redirection (shortcode → destination)
- Admin dashboard (HTML/CSS/JS single-page app)
- REST API endpoints
- Multi-user authentication via Cloudflare Access
- Click tracking and analytics

**Deployment**: Automatic via GitHub Actions on push to main

### 2. D1 Database

**Database**: `url-shortener` (SQLite)

Schema:
```sql
-- Links table
links (
  id INTEGER PRIMARY KEY,
  short_code TEXT UNIQUE,
  destination_url TEXT,
  title TEXT,
  category_id INTEGER,
  password TEXT,
  clicks INTEGER DEFAULT 0,
  user_email TEXT,
  created_at DATETIME,
  updated_at DATETIME
)

-- Categories
categories (
  id INTEGER PRIMARY KEY,
  name TEXT,
  color TEXT,
  user_email TEXT
)

-- Tags
tags (
  id INTEGER PRIMARY KEY,
  name TEXT,
  user_email TEXT
)

-- Link-Tag mapping
link_tags (
  link_id INTEGER,
  tag_id INTEGER
)
```

**Migrations**: Auto-run on every deploy via `migrations.sql`

### 3. Authentication

**Cloudflare Access** (Zero Trust):
- Validates JWT tokens in request headers
- Extracts user email from `Cf-Access-Jwt-Assertion`
- Each user's data is isolated by `user_email` column
- Session duration: 24 hours (configurable)

**Security**:
- No passwords stored in application
- All auth handled by Cloudflare's Identity providers
- Support for Google, GitHub, Microsoft, etc.

### 4. Frontend

**Tech**: Vanilla HTML/CSS/JavaScript
- No build step required
- All UI served from Worker
- Shadcn-inspired dark theme
- Mobile-responsive CSS

**Features**:
- Single-page admin dashboard
- Cmd+K search
- Real-time filtering
- Modal forms for CRUD operations
- Click analytics charts

### 5. CI/CD Pipeline

**GitHub Actions**: `.github/workflows/deploy.yml`

On push to main:
1. Run D1 migrations: `wrangler d1 execute url-shortener --remote --file=migrations.sql`
2. Deploy Worker: `wrangler deploy`
3. No manual steps required

**Secrets Required**:
- `CLOUDFLARE_API_TOKEN` (Workers + D1 edit permissions)
- `CLOUDFLARE_ACCOUNT_ID`

## Multi-Application Architecture

The repository contains three separate applications:

### 1. URL Shortener (Root)
- **Directory**: Root
- **Worker**: `url-shortener`
- **Database**: `url-shortener` D1 instance
- **Domain**: Custom domain (links.jbcloud.app)
- **Deploy**: `.github/workflows/deploy.yml`

### 2. Artifact Manager (artifacts-app/)
- **Directory**: `artifacts-app/`
- **Worker**: `artifact-manager`
- **Database**: Separate D1 instance
- **Domain**: `artifact-manager.workers.dev`
- **Deploy**: `.github/workflows/deploy-artifacts.yml`

### 3. Chrome Extension (chrome-extension/)
- **Directory**: `chrome-extension/`
- **Platform**: Chrome Extension (Manifest V3)
- **Deploy**: Manual (load unpacked in Chrome)
- **Purpose**: Save artifacts from Claude.ai with one click

### 4. Mobile App (mobile-app/)
- **Directory**: `mobile-app/`
- **Platform**: React Native via Expo
- **Deploy**: EAS Build (iOS + Android)
- **Status**: In development

## API Design

**Base URL**: `https://links.jbcloud.app/api`

**Authentication**: All API requests require valid Cloudflare Access JWT

### Link Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/links` | List all user's links |
| POST | `/api/links` | Create new link |
| GET | `/api/links/:id` | Get single link |
| PUT | `/api/links/:id` | Update link |
| DELETE | `/api/links/:id` | Delete link |

### Category Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | List categories |
| POST | `/api/categories` | Create category |
| DELETE | `/api/categories/:id` | Delete category |

### Tag Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tags` | List tags with usage counts |
| POST | `/api/tags` | Create tag |
| DELETE | `/api/tags/:id` | Delete tag |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/stats` | Dashboard statistics |
| GET | `/api/analytics/:shortCode` | Click history for a link |

**Response Format**:
```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "total": 100,
    "page": 1
  }
}
```

## Security Measures

### XSS Prevention (Updated January 28, 2026)

Comprehensive protection against DOM-based XSS attacks:

**Server-Side Escaping**:
```javascript
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/</g, '&lt;');
}

function escapeJs(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}
```

**Protected Locations** (11 critical points):
- Category names/slugs in sidebar and dropdowns
- Tag names in tag lists and filters
- Link codes, destinations, descriptions in tables
- Search results and analytics displays
- Referrer URLs, browser names, country data
- Bulk operation selectors

### Password Security (OWASP Compliant)

**Current Implementation** (January 28, 2026):
```javascript
// PBKDF2 with 100,000 iterations (OWASP recommended)
const hash = await pbkdf2Hash(password, salt, 100000);
const stored = `pbkdf2:${saltHex}:${hashHex}`;

// Constant-time comparison prevents timing attacks
const isValid = timingSafeEqual(
  Buffer.from(storedHash),
  Buffer.from(computedHash)
);
```

**Backward Compatibility**:
- Legacy SHA-256 hashes still work
- New passwords automatically use PBKDF2
- Migration handled transparently

**Security Properties**:
- Resistant to timing attacks
- Resistant to rainbow table attacks
- Resistant to brute force (100,000 iterations)
- OWASP compliant key derivation

### Input Validation
- All user inputs sanitized
- SQL injection prevention via parameterized queries
- Length limits enforced on all text fields
- URL validation for destinations

### Authentication
- Cloudflare Access JWT validation at edge
- Signature verification by Cloudflare (RS256)
- User isolation via `user_email` in all queries
- No direct database access from frontend
- Session duration: 24 hours (configurable)

### Rate Limiting
- Cloudflare Workers built-in DDoS protection
- No additional rate limiting needed for personal use

### CORS
Artifact Manager includes CORS headers for Chrome extension:
```javascript
{
  'Access-Control-Allow-Origin': 'https://claude.ai',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Cf-Access-Jwt-Assertion',
  'Access-Control-Allow-Credentials': 'true'
}
```

## Performance Characteristics

| Metric | Value | Notes |
|--------|-------|-------|
| **Cold Start** | ~5ms | Minimal Worker initialization |
| **Redirect Time** | <50ms | Global edge network |
| **Database Query** | <10ms | D1 optimized for reads |
| **Dashboard Load** | <100ms | Single HTML response |
| **API Response** | <100ms | Includes D1 query time |

## Scaling Limits

**Cloudflare Free Tier**:
- 100,000 requests/day to Workers
- 5GB D1 storage (~1M+ links)
- 5 million D1 reads/day
- 100,000 D1 writes/day

**Real Usage** (single user):
- ~3,000 redirects/day
- ~100 API calls/day
- ~10MB database size (10,000 links)

## Deployment Strategy

### Development
```bash
wrangler dev  # Local development with --remote flag for D1
```

### Production
```bash
git push origin main  # Triggers GitHub Actions
```

**Zero-downtime deployments**: Cloudflare Workers update atomically

## Design Decisions

### Why Cloudflare Workers?
- Global edge network (200+ locations)
- Zero maintenance, auto-scaling
- Free tier generous for personal use
- Integrated auth (Cloudflare Access)

### Why D1?
- Integrated with Workers
- SQLite = familiar, powerful
- Free tier: 5GB storage
- No cold starts for database

### Why Vanilla JS?
- No build step = faster deploys
- Smaller bundle size
- Easier debugging in Worker environment
- UI complexity doesn't justify framework overhead

### Why Separate Apps?
- URL Shortener = public redirects + admin dashboard
- Artifact Manager = separate domain/database for isolation
- Chrome Extension = browser-only, no server component
- Mobile App = separate platform, shares API endpoints

## Future Improvements

Planned enhancements:
- QR code generation for links
- Link expiration dates
- Custom redirect codes (301 vs 302)
- Bulk import from CSV
- API key authentication (for mobile app)
- Link preview cards (Open Graph)
- Geographic analytics
