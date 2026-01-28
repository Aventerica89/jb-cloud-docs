---
title: 1Code
description: Local-first Electron desktop app for AI-powered code assistance using Claude Code
sidebar:
  order: 0
source_project: /Users/jb/Documents/1Code
---

# 1Code

**1Code** is a local-first Electron desktop app for AI-powered code assistance. Users create chat sessions linked to local project folders, interact with Claude in Plan or Agent mode, and see real-time tool execution (bash, file edits, web search, etc.).

## Quick Links

- [GitHub Repository](https://github.com/21st-dev/1Code)
- [Architecture](./architecture/)
- [Setup Guide](./setup/)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Desktop | Electron 33.4.5, electron-vite, electron-builder |
| UI | React 19, TypeScript 5.4.5, Tailwind CSS |
| Components | Radix UI, Lucide icons, Motion, Sonner |
| State | Jotai, Zustand, React Query |
| Backend | tRPC, Drizzle ORM, better-sqlite3 |
| AI | @anthropic-ai/claude-code SDK |
| Package Manager | bun |

## Features

- **Local-first**: All data stored locally in SQLite
- **Project-based**: Link chats to local project folders
- **Two modes**: Plan mode (read-only) and Agent mode (full permissions)
- **Real-time tool execution**: Watch bash commands, file edits, web searches
- **Session resume**: Continue conversations via sessionId
- **Git worktree support**: Isolation per chat (planned)

## Status

Version 0.0.49 - Active development
