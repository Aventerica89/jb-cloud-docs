---
title: Bricks CC
description: Teaching System MVP for training AI to generate Bricks Builder code through structured lessons and scenarios
source_project: /Users/jb/.21st/repos/Aventerica89/bricks-cc
sidebar:
  order: 1
---

# Bricks CC

Teaching System MVP for training AI to generate Bricks Builder code through structured lessons and scenarios.

## Overview

Bricks CC (Claude Code) is a Next.js application that provides a teaching system for AI-assisted Bricks Builder code generation. It enables creating lessons with scenarios that train the AI on proper Bricks Builder JSON output.

## Live URLs

- **Application**: https://bricks-cc.vercel.app
- **Teaching System**: https://bricks-cc.vercel.app/teaching
- **Repository**: https://github.com/Aventerica89/bricks-cc

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| Database | Turso (libSQL/SQLite) |
| ORM | Drizzle ORM |
| Styling | Tailwind CSS v4 |
| Validation | Zod |
| Hosting | Vercel |
| Auth | PIN-based admin authentication |

## Features

### Teaching System
- **Lessons**: Create and manage teaching lessons by category
- **Scenarios**: Add scenarios to lessons with input/output examples
- **Categories**: Container/Grids, Typography, Buttons, Forms, Navigation, Media, Effects, Advanced

### Client Management
- Basecamp integration for project syncing
- Client-specific Bricks configurations
- Feedback collection system

### Build System
- Build sessions for code generation
- Visual comparison tools
- Agent instruction management

## Quick Start

```bash
# Clone repository
git clone https://github.com/Aventerica89/bricks-cc.git
cd bricks-cc

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Run database setup
node scripts/setup-db-direct.mjs

# Start development server
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `TURSO_DATABASE_URL` | Turso database connection URL |
| `TURSO_AUTH_TOKEN` | Turso authentication token |
| `ADMIN_PIN` | PIN for admin authentication |
| `ENCRYPTION_KEY` | 32-byte hex key for token encryption |
| `INTERNAL_API_URL` | Internal API base URL |
| `NEXT_PUBLIC_APP_URL` | Public application URL |

## Using with Claude Code

```bash
# Navigate to project
cd /Users/jb/.21st/repos/Aventerica89/bricks-cc

# Start Claude Code
claude

# Example prompts:
# "Add a new scenario type for responsive layouts"
# "Create an API endpoint for agent instructions"
# "Fix the build session execution flow"
```

### Key Files for Development

| File | Purpose |
|------|---------|
| `src/db/schema.ts` | Database schema definitions |
| `src/app/api/teaching/` | Teaching API routes |
| `src/app/teaching/` | Teaching UI pages |
| `src/utils/teaching-validators.ts` | Zod schemas without DOMPurify |
| `scripts/setup-db-direct.mjs` | Database table creation |
