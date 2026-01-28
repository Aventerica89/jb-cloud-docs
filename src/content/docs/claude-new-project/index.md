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
Phase 1: BASICS       - Project name, description, problem, users, mobile app?
Phase 2: PLATFORM     - Framework, database, auth, hosting, UI
Phase 3: STYLE GUIDE  - Colors, typography, spacing defaults
Phase 4: ARCHITECTURE - System design with architect agent
Phase 5: PLAN         - Implementation phases with planner agent
Phase 6: SCAFFOLD     - Create files, CLAUDE.md, docs/
Phase 6.5: MOBILE APP - Companion app mockup (optional)
Phase 7: READY        - Run framework CLI, handoff
```

Each phase waits for your approval before proceeding.

## Commands Included

### `/new-project`

Start a new project with guided prompts through all phases.

```bash
/new-project                           # Full guided workflow
/new-project --quick                   # Fast mode with defaults
/new-project --preset saas             # SaaS starter
/new-project myapp --preset api -q     # Quick API project
/new-project myapp --mobile            # Include mobile app companion
/new-project myapp -q -m               # Quick mode with mobile app
```

**Flags:**
- `--quick` or `-q` - Skip confirmations, use smart defaults
- `--preset <name>` - Use preset (saas, landing, api, portfolio, experiment)
- `--name <name>` - Project name (skips prompt)
- `--github` - Auto-create GitHub repo
- `--no-docs` - Skip syncing to docs.jbcloud.app
- `--mobile` or `-m` - Include companion mobile app mockup

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
- **Dev Button Menu**: Floating button with dropdown for dev tools
- **Mobile App Companion**: Optional mockup page for future mobile app

## Mobile App Companion (New)

When using `--mobile` flag or selecting "Yes" for mobile app in Phase 1:

### What Gets Created

1. **`/mobile-app` page** - Coming soon mockup with:
   - Phone device frame visual
   - Customizable feature cards
   - Email signup CTA for launch notifications

2. **Dev Button Dropdown** - Floating menu (bottom-right) with:
   - Style Guide link
   - Mobile App link
   - Easy to extend with more items

3. **Mobile Planning Section** - Added to `docs/PLAN.md`:
   - Platform strategy (React Native/Expo)
   - Core mobile features
   - Technical considerations
   - Timeline phases

### Example Output

```
Scaffolding project...
✓ Created /style-guide page
✓ Created /mobile-app mockup page
✓ Created dev-button with dropdown menu
✓ Added mobile app section to PLAN.md
```

## Platform Recommendations

The workflow recommends based on project type:

| Project Type | Framework | Database | Auth |
|-------------|-----------|----------|------|
| Full-stack App | Next.js | Supabase | Supabase Auth |
| Marketing Site | Astro | None | None |
| API Backend | Hono/Fastify | Turso/Supabase | Clerk |
| Experiment | Next.js | localStorage | None |

## Presets

Quick scaffolding with predefined stacks:

| Preset | Framework | Database | Auth | Hosting | UI |
|--------|-----------|----------|------|---------|-----|
| `saas` | Next.js | Supabase | Supabase Auth | Vercel | shadcn/ui |
| `landing` | Astro | None | None | Cloudflare | Tailwind |
| `api` | Hono | Turso | JWT | Cloudflare Workers | None |
| `portfolio` | Astro | None | None | Cloudflare | Tailwind |
| `experiment` | Next.js | SQLite | None | Local | Tailwind |

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
