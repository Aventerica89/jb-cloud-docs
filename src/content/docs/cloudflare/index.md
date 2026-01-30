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

## Using with Claude Code

Claude Code can help you manage Cloudflare configurations using the Wrangler CLI.

### DNS Management

```bash
# List all DNS records
wrangler dns list example.com

# Add a new A record
wrangler dns create example.com --type A --name www --content 192.0.2.1
```

### Cloudflare Workers

```bash
# Create a new worker project
wrangler init my-worker

# Deploy to Cloudflare
wrangler deploy
```

### Tunnels

```bash
# Create a tunnel
cloudflared tunnel create my-tunnel

# Route traffic
cloudflared tunnel route dns my-tunnel subdomain.example.com
```

Ask Claude to help you:
- Set up DNS records for new domains
- Configure Cloudflare Workers for edge computing
- Create and manage Cloudflare Tunnels
- Optimize caching with Page Rules
