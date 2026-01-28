---
title: MCP Integration
description: Using Env Var Assistant with Claude Code via MCP
sidebar:
  order: 5
---

The MCP (Model Context Protocol) server allows Claude Code to directly interact with your 1Password vault for API key management.

## Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Claude Code    │────▶│  MCP Server     │────▶│  1Password CLI  │
│                 │     │  (stdio)        │     │  (op)           │
│  "Store this    │     │                 │     │                 │
│   API key..."   │     │  - Tools        │     │  - Create item  │
│                 │     │  - Validation   │     │  - List items   │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Installation

### Prerequisites

- Node.js 18+
- 1Password CLI installed and authenticated
- Claude Code

### Build the Server

```bash
cd env-var-assistant/mcp-server
npm install
npm run build
```

### Configure Claude Code

Add to your `~/.mcp.json`:

```json
{
  "mcpServers": {
    "env-var-assistant": {
      "command": "node",
      "args": ["/Users/YOUR_USERNAME/env-var-assistant/mcp-server/dist/index.js"],
      "env": {}
    }
  }
}
```

### Verify Installation

Restart Claude Code and run:

```
/mcp
```

You should see `env-var-assistant` listed with its tools.

## Available Tools

### `store_api_key`

Store a new API key in 1Password.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `service` | string | Yes | Service name (e.g., "Cloudflare", "OpenAI") |
| `key` | string | Yes | The API key value |
| `envVarName` | string | No | Environment variable name (used as item title) |
| `dashboardUrl` | string | No | URL to manage this key |
| `vault` | string | No | Vault name (default: "Private") |
| `tags` | string[] | No | Additional tags |

**Example:**

```
"Store this Cloudflare API key: cf_xxxxxxxxxxxx"
```

Claude will call:
```json
{
  "service": "Cloudflare",
  "key": "cf_xxxxxxxxxxxx",
  "envVarName": "CLOUDFLARE_API_TOKEN",
  "dashboardUrl": "https://dash.cloudflare.com/profile/api-tokens"
}
```

### `list_api_keys`

List stored API keys from 1Password.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `provider` | string | No | Filter by provider tag |
| `vault` | string | No | Vault name |

**Example:**

```
"List my API keys"
"Show me all my Stripe keys"
```

**Response:**
```json
[
  {
    "id": "abc123",
    "title": "OPENAI_API_KEY",
    "vault": "Private",
    "tags": ["env-var", "openai", "ai"]
  },
  {
    "id": "def456",
    "title": "STRIPE_SECRET_KEY",
    "vault": "Private",
    "tags": ["env-var", "stripe", "payments"]
  }
]
```

### `get_api_key`

Retrieve a specific API key value.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `itemId` | string | Yes | Item ID or title |
| `vault` | string | No | Vault name |

**Example:**

```
"Get my OpenAI API key"
```

:::caution[Security Warning]
This tool returns the actual secret value. Claude will display it in the conversation. Be careful when using this in shared sessions or recordings.
:::

### `add_token_to_existing`

Add a new field to an existing 1Password item.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `itemId` | string | Yes | Existing item ID |
| `fieldName` | string | Yes | Name for the new field |
| `fieldValue` | string | Yes | The token value |
| `vault` | string | No | Vault name |
| `section` | string | No | Section to place the field in |

**Example:**

```
"Add this refresh token to my existing Slack credentials: xoxr-xxxxx"
```

### `search_items`

Search for existing items by title.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `query` | string | No | Search query for title |
| `tags` | string[] | No | Tags to filter by (default: ["env-var"]) |
| `vault` | string | No | Vault name |

**Example:**

```
"Search for my database credentials"
```

## Usage Examples

### Setting Up a New Project

```
"I'm setting up a new Next.js project. I need these environment variables:
- OPENAI_API_KEY
- DATABASE_URL
- STRIPE_SECRET_KEY

Can you list my stored keys and tell me what I have?"
```

Claude will call `list_api_keys` and show you matching credentials.

### Storing a New Key

```
"I just generated a new Vercel token: vl_xxxxxxxxxxxx. Please store it."
```

Claude will call `store_api_key` with the detected provider and key.

### Organizing Keys

```
"I have multiple Stripe keys. Can you add this webhook secret to my existing Stripe credentials?
whsec_xxxxxxxxxxxx"
```

Claude will:
1. Call `search_items` to find Stripe items
2. Call `add_token_to_existing` to add the webhook secret

### Retrieving Keys for Deployment

```
"I need to set up my production environment. What's my Cloudflare API token?"
```

Claude will call `get_api_key` and return the value.

## Security Considerations

### Vault Access

The MCP server uses the same 1Password CLI authentication as your terminal. It can only access vaults you have access to.

### Sensitive Data in Conversation

When you ask Claude to retrieve a key, the value will appear in the conversation. Consider:
- Don't use in shared screens or recordings
- The conversation may be logged (depending on your settings)
- Claude won't remember secrets between sessions

### Input Validation

The MCP server validates:
- Item IDs (alphanumeric + hyphens only)
- Field names (must start with letter, alphanumeric + underscores/hyphens)
- No shell injection in CLI commands

### Best Practices

1. **Use descriptive names** - "PROD_STRIPE_KEY" not just "key"
2. **Organize with tags** - Makes listing and searching easier
3. **Use separate vaults** - Consider a dedicated "API Keys" vault
4. **Rotate regularly** - Use dashboard URLs to quickly access rotation pages

## Troubleshooting

### "1Password CLI not authenticated"

```bash
# Check current session
op whoami

# Sign in
op signin
```

### Server Not Loading

Check Claude Code logs:
```bash
# macOS
tail -f ~/Library/Logs/Claude/claude-code.log
```

Verify the MCP config path is correct in `~/.mcp.json`.

### Tool Not Found

If tools aren't showing up:
1. Restart Claude Code
2. Run `/mcp` to verify server is loaded
3. Check for TypeScript compilation errors:
   ```bash
   cd mcp-server && npm run build
   ```
