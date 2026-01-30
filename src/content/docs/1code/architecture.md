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

## Using with Claude Code

Claude Code can help you understand, debug, and extend the 1Code architecture efficiently.

### Exploring the Codebase

**Navigate complex file structures:**
```bash
# Find all tRPC routers
fd -e ts router src/main/lib/trpc/routers

# Locate Jotai atoms
rg "atom\(" src/renderer/features --type ts

# Find all Drizzle schema definitions
fd schema src/main/lib/db
```

**Understand component relationships:**
```
"Show me how the active-chat component connects to the Claude SDK router"
```

Claude Code will trace the data flow from UI → tRPC → Claude SDK integration.

### Database Schema Management

**Generate new migrations:**
```
"Add a 'tags' field to the chats table with many-to-many relationship"
```

Claude Code can:
- Update Drizzle schema definitions
- Generate migration SQL
- Update TypeScript types
- Add RLS policies if needed

**Query the database:**
```bash
# Inspect database structure
sqlite3 ~/Library/Application\ Support/1code/data/agents.db ".schema"

# Run queries for debugging
sqlite3 ~/Library/Application\ Support/1code/data/agents.db \
  "SELECT * FROM chats ORDER BY created_at DESC LIMIT 5"
```

### Adding New Features

**Create a new tRPC router:**
```
"Create a tRPC router for exporting chat history with procedures for:
- Export single chat as JSON
- Export all chats for a project
- Import from JSON backup"
```

Claude Code will:
1. Create router file with type-safe procedures
2. Register router in main tRPC setup
3. Add TypeScript types for request/response
4. Create corresponding UI components

**Add new UI components:**
```
"Add a tag selector component to the chat sidebar using Radix UI primitives"
```

### Debugging

**Trace IPC communication:**
```
"Show all IPC handlers in the main process and their corresponding renderer calls"
```

**Debug state management:**
```
"Find where the selectedChatId atom is updated and list all components that consume it"
```

### Testing

**Write component tests:**
```
"Generate Vitest tests for the new-chat-form component with happy path and error cases"
```

**Test database operations:**
```
"Create integration tests for the projects router covering CRUD operations"
```

### Real-World Examples

**Example 1: Add workspace switching**
```
"Implement workspace tabs in the sidebar:
- Store active workspace in Jotai atom
- Filter chats by workspace
- Add workspace selector dropdown"
```

**Example 2: Export/Import functionality**
```
"Add export chat history feature:
- tRPC procedure to export as JSON
- Download handler in renderer
- Import procedure with validation
- UI button in chat context menu"
```

**Example 3: Search across chats**
```
"Implement full-text search:
- Add search index to SQLite
- Create search tRPC procedure
- Add Cmd+K search modal in renderer
- Highlight search results in chat"
```

### Architecture Analysis

**Understand data flow:**
```
"Trace how a user creates a new chat from button click to database insert"
```

**Review security:**
```
"Check if the auth-store properly encrypts credentials using Electron's safeStorage"
```

**Optimize performance:**
```
"Find components that could benefit from React.memo or useMemo based on render frequency"
```
