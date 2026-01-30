---
title: Cloudflare Overview
description: Getting started with Cloudflare configuration.
sidebar:
  order: 0
---

Documentation for Cloudflare DNS, tunnels, and CDN configuration.

## Topics

- DNS setup and management
- Cloudflare Tunnels
- SSL/TLS configuration
- Page Rules and caching

*More guides coming soon.*

## Using with Claude Code

Claude Code can help you configure and manage Cloudflare services efficiently.

### DNS Management

**Configure DNS records:**
```
"Add DNS records for my domain:
- A record pointing to 192.168.1.1
- CNAME for www
- MX records for email
- TXT record for domain verification"
```

Claude Code will generate the commands or guide you through the dashboard.

**Troubleshoot DNS issues:**
```
"My domain isn't resolving. Debug:
- Check nameserver configuration
- Verify DNS propagation
- Test with dig/nslookup
- Check proxy status"
```

### Cloudflare Workers

**Deploy Workers:**
```bash
# Create new Worker
wrangler init my-worker

# Deploy
wrangler deploy
```

**Ask Claude Code for help:**
```
"Create a Cloudflare Worker that:
- Redirects old URLs to new ones
- Adds security headers
- Caches responses
- Logs analytics"
```

### Cloudflare Pages

**Deploy static site:**
```
"Deploy my Next.js site to Cloudflare Pages with:
- Automatic deployments from GitHub
- Environment variables
- Custom domain
- Preview deployments"
```

### Real-World Examples

**Example 1: URL shortener**
```
"Build a URL shortener on Cloudflare Workers with D1 database"
```

**Example 2: Image optimization**
```
"Set up Cloudflare Images for:
- Automatic resizing
- WebP conversion
- CDN caching
- Lazy loading"
```

**Example 3: API gateway**
```
"Create an API gateway with:
- Rate limiting
- Authentication
- Request transformation
- Response caching"
```

### Security

**Configure security headers:**
```
"Add security headers via Workers:
- CSP
- HSTS
- X-Frame-Options
- Permissions-Policy"
```

**Set up WAF rules:**
```
"Create WAF rules to:
- Block malicious traffic
- Rate limit API endpoints
- Prevent DDoS
- Geo-blocking"
```
