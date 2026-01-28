---
title: Architecture
description: System architecture and design of 1Code Electron app
sidebar:
  order: 1
---

# Architecture

## Directory Structure

```
src/
├── main/                    # Electron main process
│   ├── index.ts             # App entry, window lifecycle
│   ├── auth-manager.ts      # OAuth flow, token refresh
│   ├── auth-store.ts        # Encrypted credential storage (safeStorage)
│   ├── windows/main.ts      # Window creation, IPC handlers
│   └── lib/
│       ├── db/              # Drizzle + SQLite
│       │   ├── index.ts     # DB init, auto-migrate on startup
│       │   ├── schema/      # Drizzle table definitions
│       │   └── utils.ts     # ID generation
│       └── trpc/routers/    # tRPC routers (projects, chats, claude)
│
├── preload/                 # IPC bridge (context isolation)
│   └── index.ts             # Exposes desktopApi + tRPC bridge
│
└── renderer/                # React 19 UI
    ├── App.tsx              # Root with providers
    ├── features/
    │   ├── agents/          # Main chat interface
    │   │   ├── main/        # active-chat.tsx, new-chat-form.tsx
    │   │   ├── ui/          # Tool renderers, preview, diff view
    │   │   ├── commands/    # Slash commands (/plan, /agent, /clear)
    │   │   ├── atoms/       # Jotai atoms for agent state
    │   │   └── stores/      # Zustand store for sub-chats
    │   ├── sidebar/         # Chat list, archive, navigation
    │   ├── sub-chats/       # Tab/sidebar sub-chat management
    │   └── layout/          # Main layout with resizable panels
    ├── components/ui/       # Radix UI wrappers
    └── lib/
        ├── atoms/           # Global Jotai atoms
        ├── stores/          # Global Zustand stores
        └── trpc.ts          # tRPC client
```

## Database Schema

**Location:** `{userData}/data/agents.db` (SQLite)

```typescript
// Three main tables:
projects    → id, name, path (local folder), timestamps
chats       → id, name, projectId, worktree fields, timestamps
sub_chats   → id, name, chatId, sessionId, mode, messages (JSON)
```

Auto-migration runs on app startup from `drizzle/` folder (dev) or `resources/migrations` (packaged).

## IPC Communication

- Uses **tRPC** with `trpc-electron` for type-safe main↔renderer communication
- All backend calls go through tRPC routers, not raw IPC
- Preload exposes `window.desktopApi` for native features (window controls, clipboard, notifications)

## State Management

| Library | Purpose |
|---------|---------|
| Jotai | UI state (selected chat, sidebar open, preview settings) |
| Zustand | Sub-chat tabs and pinned state (persisted to localStorage) |
| React Query | Server state via tRPC (auto-caching, refetch) |

## Claude Integration

- Dynamic import of `@anthropic-ai/claude-code` SDK
- Two modes: "plan" (read-only) and "agent" (full permissions)
- Session resume via `sessionId` stored in SubChat
- Message streaming via tRPC subscription (`claude.onMessage`)

## Key Files

| File | Purpose |
|------|---------|
| `electron.vite.config.ts` | Build config |
| `src/main/lib/db/schema/index.ts` | Drizzle schema |
| `src/main/lib/db/index.ts` | DB initialization |
| `src/renderer/features/agents/atoms/index.ts` | Agent UI state |
| `src/renderer/features/agents/main/active-chat.tsx` | Main chat component |
| `src/main/lib/trpc/routers/claude.ts` | Claude SDK integration |
