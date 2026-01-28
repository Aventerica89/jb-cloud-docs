---
title: Servers & Providers
description: Organize WordPress sites by hosting provider and server with quick access to dashboards and support.
sidebar:
  order: 5
---

WP Manager supports organizing sites by hosting provider and server, with direct links to provider dashboards, documentation, and support channels.

## Data Model

```
Provider (xCloud, Cloudways, etc.)
  └── Server (individual VPS/instance)
       └── Site (WordPress installation)
```

## Pre-configured Providers

WP Manager includes 14 pre-configured hosting providers:

| Provider | Dashboard | Community |
|----------|-----------|-----------|
| xCloud | my.xcloud.host | Facebook Group |
| Cloudways | platform.cloudways.com | Community Forum |
| RunCloud | manage.runcloud.io | Facebook Group |
| GridPane | my.gridpane.com | Facebook Group |
| SpinupWP | spinupwp.app | - |
| Ploi | ploi.io | Discord |
| Kinsta | my.kinsta.com | - |
| WP Engine | my.wpengine.com | - |
| Flywheel | app.getflywheel.com | - |
| DigitalOcean | cloud.digitalocean.com | Community |
| Vultr | my.vultr.com | - |
| Linode | cloud.linode.com | Community |
| Hetzner | console.hetzner.cloud | - |
| Custom | - | - |

## Provider Metadata

Each provider stores:

```typescript
interface ProviderMetadata {
  slug: string;           // 'xcloud', 'cloudways'
  name: string;           // Display name
  logoUrl: string;        // Provider logo
  dashboardUrl: string;   // Base dashboard URL
  serverUrlPattern: string; // URL pattern with {serverId}
  docsUrl: string;        // Documentation
  supportUrl: string;     // Support page
  communityUrl?: string;  // Facebook, Discord, etc.
}
```

## Server Dashboard Links

When you add a server with a Provider ID (from your provider's dashboard URL), WP Manager generates direct links:

```
Provider Dashboard URL + Server URL Pattern + Server ID
https://my.xcloud.host + /servers/{serverId} + 12345
= https://my.xcloud.host/servers/12345
```

Find your server ID in your provider's dashboard URL:
- xCloud: `/servers/12345`
- Cloudways: `/server/12345/access_detail`
- DigitalOcean: `/droplets/12345`

## Adding a Server

1. Go to **Servers > Add Server**
2. Select your hosting provider (shows logo grid)
3. Enter server details:
   - **Name**: Friendly name (e.g., "Production Server 1")
   - **IP Address**: Server IP for quick reference
   - **Provider Server ID**: For dashboard link generation
   - **Region**: Optional location info
   - **Notes**: Any additional context

## Viewing Servers

The Servers page offers two views:

### Grouped by Provider
Sites organized under provider headings with logos.

### Flat List
All servers in a grid without grouping.

## Server Detail Page

Each server page shows:

- **Stats**: Total sites, online/offline counts
- **Sites List**: All WordPress sites on this server
- **Server Info**: IP address (copyable), region, notes
- **Provider Links**: Dashboard, docs, support, community

## Assigning Sites to Servers

When adding or editing a site, you can assign it to a server. This enables:

- Filter sites by server
- Group sites by provider
- Quick access to provider dashboard
- Server-level health overview

## API Endpoints

### Providers

```bash
# List all providers (seeds on first call)
GET /api/providers

# Create custom provider
POST /api/providers
{
  "slug": "my-provider",
  "name": "My Provider",
  "dashboardUrl": "https://my.provider.com"
}
```

### Servers

```bash
# List all servers with site counts
GET /api/servers

# Create server
POST /api/servers
{
  "providerId": 1,
  "name": "Production",
  "ipAddress": "192.168.1.1",
  "externalId": "12345",
  "region": "us-east-1"
}

# Get server with sites
GET /api/servers/:id

# Update server
PUT /api/servers/:id

# Delete server (unlinks sites, doesn't delete them)
DELETE /api/servers/:id
```

## Database Schema

```sql
-- Providers table
CREATE TABLE providers (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE,
  name TEXT,
  logo_url TEXT,
  dashboard_url TEXT,
  server_url_pattern TEXT,
  docs_url TEXT,
  support_url TEXT,
  community_url TEXT
);

-- Servers table
CREATE TABLE servers (
  id INTEGER PRIMARY KEY,
  provider_id INTEGER REFERENCES providers(id),
  name TEXT,
  ip_address TEXT,
  external_id TEXT,
  region TEXT,
  notes TEXT
);

-- Sites table (updated)
ALTER TABLE sites ADD COLUMN server_id INTEGER REFERENCES servers(id);
ALTER TABLE sites ADD COLUMN notes TEXT;
```

## Adding Custom Providers

To add a provider not in the list:

1. Select "Custom/Self-Managed" when adding a server
2. Or create via API with full metadata
3. Provider will appear in future server creation

## Use Cases

### Multi-client Management
Group sites by client's preferred provider:
- Client A uses xCloud
- Client B uses Cloudways
- Quick access to each provider's dashboard

### Server Health Monitoring
See all sites on a server at a glance:
- 5 sites online, 1 offline
- Identify server-level issues quickly

### Migration Planning
Visualize site distribution:
- 20 sites on old Linode server
- Plan migration to new xCloud server
