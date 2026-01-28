---
title: Env Var Assistant
description: Chrome extension for secure API key management with 1Password integration
sidebar:
  order: 0
---

Env Var Assistant is a Chrome extension that helps you securely manage API keys and environment variables by integrating with 1Password.

## Features

- **Clipboard Detection** - Automatically detects 60+ API key formats when copied
- **1Password Integration** - Securely stores keys in your 1Password vault
- **Batch Mode** - Save multiple keys at once from `.env` files
- **Auto-Fill** - Fill environment variables on provider dashboards
- **MCP Server** - Claude Code integration for voice-based key management

## Quick Start

1. Install the extension from the Chrome Web Store (or load unpacked)
2. Install the native host for 1Password CLI communication
3. Copy an API key - the extension will detect it automatically
4. Click "Save" to store it in 1Password

## Supported Providers

The extension detects API keys from 60+ services including:

| Category | Providers |
|----------|-----------|
| **AI/ML** | OpenAI, Anthropic, Google AI, Replicate, Hugging Face |
| **Cloud** | AWS, Cloudflare, Vercel, Netlify, Railway, Render, Fly.io |
| **Database** | Supabase, PlanetScale, Neon, MongoDB, Redis |
| **Payments** | Stripe, PayPal, Square, Lemon Squeezy |
| **Auth** | Clerk, Auth0 |
| **Email** | SendGrid, Resend, Postmark, Mailgun |
| **Messaging** | Slack, Discord, Telegram, Twilio |
| **Analytics** | Sentry, PostHog, Segment, Mixpanel |

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Chrome         │     │  Native Host     │     │  1Password      │
│  Extension      │────▶│  (Node.js)       │────▶│  CLI (op)       │
│                 │     │                  │     │                 │
│  - Popup UI     │     │  - Message       │     │  - Vault Access │
│  - Detection    │     │    Protocol      │     │  - CRUD Ops     │
│  - Auto-fill    │     │  - Validation    │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
         │
         │ MCP Protocol
         ▼
┌─────────────────┐
│  MCP Server     │
│  (Claude Code)  │
│                 │
│  - store_api_key│
│  - list_api_keys│
│  - get_api_key  │
└─────────────────┘
```

## Pages

- [Installation Guide](/env-var-assistant/installation) - Set up the extension and native host
- [Usage Guide](/env-var-assistant/usage) - Learn how to use all features
- [Supported Patterns](/env-var-assistant/patterns) - Full list of detected API key formats
- [Testing Playground](/env-var-assistant/testing) - Interactive test page for all features
- [MCP Integration](/env-var-assistant/mcp) - Claude Code integration guide
