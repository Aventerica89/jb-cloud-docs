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

**v0.4.8** - Critical stability fixes for image uploads and session recovery

### Recent Updates

**v0.4.8 (2026-02-08)** - Critical Bug Fixes
- Fixed sandbox container crashes when uploading large images
- Implemented chunked file writes (128KB chunks) to prevent Durable Object RPC overload
- Added sandbox health checks to `getOrWakeSandbox` to verify container liveness
- SDK stream route now verifies sandbox health before streaming
- Added pre-flight health checks to `execStream` to detect dead shells early

**v0.4.7** - Message compound component following AI Elements pattern
**v0.4.6** - Debug panel and image paste support in chat
**v0.4.5** - Session persistence across page refresh, expand/collapse all messages
**v0.4.4** - File upload with drag-and-drop, workspace export as tar.gz
**v0.4.3** - Session naming, auto-reconnect, session list cleanup
**v0.4.2** - Clone repository fixes, file explorer breadcrumb navigation
**v0.4.1** - Artifact and ChainOfThought components for code visualization
**v0.4.0** - AI Elements-inspired chat UI upgrade

See the [OAuth-to-API Manifesto](/vaporforge/oauth-to-api-manifesto/) for the complete authentication architecture.
