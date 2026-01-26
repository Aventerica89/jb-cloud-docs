---
title: Claude New Project Workflow
description: A comprehensive project initialization workflow for Claude Code that guides you from idea to ready-to-build.
---

## Quick Install

```bash
curl -fsSL https://raw.githubusercontent.com/Aventerica89/claude-new-project/main/install.sh | bash
```

## Repository

[github.com/Aventerica89/claude-new-project](https://github.com/Aventerica89/claude-new-project)

## Overview

A 7-phase workflow that takes you from idea to scaffolded project with Claude Code.

```
Phase 1: BASICS      - Project name, description, problem, users
Phase 2: PLATFORM    - Framework, database, auth, hosting, UI
Phase 3: STYLE GUIDE - Colors, typography, spacing defaults
Phase 4: ARCHITECTURE - System design with architect agent
Phase 5: PLAN        - Implementation phases with planner agent
Phase 6: SCAFFOLD    - Create files, CLAUDE.md, docs/
Phase 7: READY       - Run framework CLI, handoff
```

Each phase waits for your approval before proceeding.

## Commands Included

### `/new-project`

Start a new project with guided prompts through all 7 phases.

```
claude> /new-project
```

### `/end`

Cleanly wrap up a work session:

1. Sync docs to docs.jbcloud.app (if configured)
2. Commit session to memory (learned patterns)
3. Create session summary
4. Shutdown dev server

```
claude> /end
```

## Features

- **Opinionated Defaults**: Sensible recommendations for each choice
- **User Override**: Accept recommendations or choose differently
- **Agent Integration**: Uses architect and planner agents for design
- **Documentation**: Creates CLAUDE.md, ARCHITECTURE.md, PLAN.md
- **Style Guide Page**: Generates a /style-guide route with all UI components
- **Dev Button**: Shows style guide link in development mode

## Platform Recommendations

The workflow recommends based on project type:

| Project Type | Framework | Database | Auth |
|-------------|-----------|----------|------|
| Full-stack App | Next.js | Supabase | Supabase Auth |
| Marketing Site | Astro | None | None |
| API Backend | Hono/Fastify | Turso/Supabase | Clerk |
| Experiment | Next.js | localStorage | None |

## Manual Installation

If you prefer not to use the install script:

```bash
# Create commands directory
mkdir -p ~/.claude/commands

# Download commands
curl -o ~/.claude/commands/new-project.md \
  https://raw.githubusercontent.com/Aventerica89/claude-new-project/main/commands/new-project.md

curl -o ~/.claude/commands/end.md \
  https://raw.githubusercontent.com/Aventerica89/claude-new-project/main/commands/end.md
```

## Requirements

- Claude Code CLI installed
- GitHub CLI (`gh`) for repo creation (optional)
- Node.js 18+ for scaffolded projects
