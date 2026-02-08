---
title: VaporForge
description: Cloud-based Claude Code IDE on Cloudflare Workers and Sandboxes
sidebar:
  order: 0
source_project: /Users/jb/vaporforge
---

# VaporForge

Cloud-based Claude Code IDE that runs in Cloudflare Sandboxes. Access Claude Code from any device using your existing Anthropic Pro/Max subscription.

**Live URL**: [vaporforge.jbcloud.app](https://vaporforge.jbcloud.app)
**Repository**: [github.com/Aventerica89/vaporforge](https://github.com/Aventerica89/vaporforge)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Cloudflare Workers (Hono) |
| Containers | Cloudflare Sandboxes |
| Frontend | React 18 + Vite + Tailwind v3.4 |
| Auth | Setup-token flow (OAuth) |
| Storage | Cloudflare KV + R2 |
| AI | Claude Agent SDK inside containers |

## Architecture

```
Browser (React SPA)
    |
    | HTTPS + JWT session
    v
Cloudflare Worker (Hono router)
    |
    | Token from KV + env injection
    v
Cloudflare Sandbox (Docker)
    |
    | @anthropic-ai/claude-agent-sdk
    v
Anthropic API
```

The user's OAuth token never touches the browser after initial setup. It's stored server-side in Cloudflare KV and injected into containers at runtime as an environment variable.

## Key Features

- **Zero-install**: No CLI, no Node.js, no terminal required on the user's device
- **Mobile-first UX**: Full chat-first interface with drawer navigation
- **Session persistence**: Conversations survive page refresh
- **File management**: Upload, download, export workspace as tar.gz
- **Terminal**: Command-mode terminal via `execStream`
- **Git integration**: Clone repos directly into sandbox workspace

## Current Version

**v0.4.7** - Message compound component (AI Elements pattern)

See the [OAuth-to-API Manifesto](/vaporforge/oauth-to-api-manifesto/) for the complete authentication architecture.
