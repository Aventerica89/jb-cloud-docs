---
title: Architecture
description: System architecture and database schema for Bricks CC teaching system
sidebar:
  order: 2
---

# Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Vercel Edge                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                   Next.js 16 App                        ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ ││
│  │  │  Teaching   │  │   Client    │  │     Build       │ ││
│  │  │     UI      │  │  Dashboard  │  │    Sessions     │ ││
│  │  └──────┬──────┘  └──────┬──────┘  └────────┬────────┘ ││
│  │         │                │                   │          ││
│  │  ┌──────▼────────────────▼───────────────────▼────────┐││
│  │  │                   API Routes                        │││
│  │  │  /api/teaching/*  /api/clients  /api/build/*       │││
│  │  └──────────────────────┬──────────────────────────────┘││
│  └─────────────────────────┼───────────────────────────────┘│
└────────────────────────────┼────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Turso/libSQL  │
                    │    Database     │
                    └─────────────────┘
```

## Database Schema

### Teaching Tables (7 total)

#### lessons
Primary table for teaching lessons.

```sql
CREATE TABLE lessons (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  status TEXT DEFAULT 'draft',
  order_index INTEGER DEFAULT 0,
  created_by TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
)
```

#### lesson_scenarios
Scenarios within lessons with input/output examples.

```sql
CREATE TABLE lesson_scenarios (
  id TEXT PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  input_type TEXT NOT NULL,
  input_data TEXT,
  expected_output TEXT,
  difficulty TEXT DEFAULT 'beginner',
  order_index INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
)
```

#### agents
AI agent configurations.

```sql
CREATE TABLE agents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  config TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
)
```

#### agent_instructions
Instructions for agents.

```sql
CREATE TABLE agent_instructions (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  instruction_type TEXT NOT NULL,
  content TEXT NOT NULL,
  priority INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (agent_id) REFERENCES agents(id)
)
```

#### build_sessions
Code generation sessions.

```sql
CREATE TABLE build_sessions (
  id TEXT PRIMARY KEY,
  scenario_id TEXT,
  agent_id TEXT,
  status TEXT DEFAULT 'pending',
  input_data TEXT,
  output_data TEXT,
  error_message TEXT,
  started_at TEXT,
  completed_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (scenario_id) REFERENCES lesson_scenarios(id),
  FOREIGN KEY (agent_id) REFERENCES agents(id)
)
```

#### visual_comparisons
Before/after screenshot comparisons.

```sql
CREATE TABLE visual_comparisons (
  id TEXT PRIMARY KEY,
  build_session_id TEXT NOT NULL,
  expected_screenshot_url TEXT,
  actual_screenshot_url TEXT,
  diff_score REAL,
  diff_image_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (build_session_id) REFERENCES build_sessions(id)
)
```

#### content_assets
Media and asset storage.

```sql
CREATE TABLE content_assets (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  metadata TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
)
```

## API Routes

### Teaching API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/teaching/lessons` | GET | List all lessons |
| `/api/teaching/lessons` | POST | Create new lesson |
| `/api/teaching/lessons/[id]` | GET | Get lesson by ID |
| `/api/teaching/lessons/[id]` | PUT | Update lesson |
| `/api/teaching/lessons/[id]` | DELETE | Delete lesson |
| `/api/teaching/scenarios` | POST | Create scenario |

### Build API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/build/sessions` | POST | Create build session |
| `/api/build/sessions/[id]/execute` | POST | Execute build |

## Component Structure

```
src/
├── app/
│   ├── api/
│   │   ├── teaching/       # Teaching API routes
│   │   ├── build/          # Build session API
│   │   ├── clients/        # Client management
│   │   └── basecamp/       # Basecamp integration
│   ├── teaching/
│   │   ├── page.tsx        # Lesson list
│   │   └── lessons/
│   │       ├── new/        # Create lesson
│   │       └── [id]/       # Lesson detail
│   └── dashboard/
│       └── clients/        # Client dashboard
├── db/
│   └── schema.ts           # Drizzle schema
├── lib/
│   ├── db.ts               # Database connection
│   ├── agents/             # Agent system
│   └── crypto.ts           # Encryption utilities
└── utils/
    ├── teaching-validators.ts  # Zod schemas
    └── validators.ts           # General validation
```

## Security

- **PIN Authentication**: Simple admin PIN for access control
- **CSRF Protection**: Token-based CSRF prevention
- **Rate Limiting**: API rate limiting middleware
- **Token Encryption**: AES-256-GCM for sensitive data
- **Input Validation**: Zod schemas for all inputs

## Deployment

Deployed to Vercel with:
- Automatic deployments from main branch
- Environment variables in Vercel dashboard
- Turso database connection via libSQL client
