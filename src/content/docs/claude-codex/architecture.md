---
title: Architecture
description: System design and technical architecture of Claude Codex
sidebar:
  order: 1
---

Claude Codex is designed as a modular, distributed configuration system that operates across multiple environments (CLI, web, mobile) with automatic synchronization.

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     GitHub Repository                        │
│                  (claude-codex - Source of Truth)           │
└─────────────────┬───────────────────────────┬───────────────┘
                  │                           │
                  │                           │
      ┌───────────▼──────────┐    ┌──────────▼──────────┐
      │   Local Machine 1     │    │   Local Machine 2    │
      │   ~/.claude/          │    │   ~/.claude/         │
      │   (symlink/clone)     │    │   (symlink/clone)    │
      └───────────┬───────────┘    └──────────┬───────────┘
                  │                           │
      ┌───────────▼──────────┐    ┌──────────▼───────────┐
      │  Auto-Sync Daemon     │    │  Auto-Sync Daemon    │
      │  (File Watcher)       │    │  (File Watcher)      │
      │  Push every 5 min     │    │  Pull every hour     │
      └───────────────────────┘    └──────────────────────┘
```

## Core Components

### 1. Configuration Framework

**Location:** `CLAUDE.md` + `rules/*.md`

The main configuration is split into:

- **CLAUDE.md** - Core philosophy, MCP integrations, agent list
- **rules/** - Modular guidelines (coding style, testing, git workflow, etc.)

**Design Principles:**
- Single source of truth in CLAUDE.md
- Modular rules for focused concerns
- Markdown format for human readability
- References to detailed documentation

### 2. Command System

**Location:** `commands/*.md`

Custom slash commands that Claude Code recognizes and executes.

**Structure:**
```markdown
---
name: command-name
description: What it does
category: Development | Git | Session | Quality | Documentation
---

## Purpose
...

## Usage
/command-name [args]

## Implementation
...
```

**Categories:**
- **Development** - TDD, planning, code review, issue fixing
- **Git & Workflow** - Commits, releases, standups
- **Session Management** - Context save/restore, reminders
- **Quality & Deployment** - Deploy checks, security, audits
- **Documentation** - jbdocs sync, project initialization

**38 Commands Total** as of Phase 6.

### 3. Agent System

**Location:** `agents/*.md`

Specialized AI agents for complex, focused tasks.

**Agent Structure:**
```markdown
---
name: agent-name
role: Brief description
model: haiku-4.5 | sonnet-4.5 | opus-4.5
---

## Role
Detailed description

## When to Use
Trigger conditions

## Workflow
Step-by-step process

## Output Format
Expected deliverables
```

**Available Agents:**
- **planner** - Feature implementation planning
- **architect** - System design
- **tdd-guide** - Test-driven development
- **code-reviewer** - Code quality analysis
- **security-reviewer** - Vulnerability scanning
- **build-error-resolver** - Fix compilation errors
- **e2e-runner** - Playwright E2E testing
- **doc-updater** - Documentation updates
- **env-deployer** - Environment variable deployment
- **jbdocs** - Documentation sync specialist

**Model Selection:**
- Haiku 4.5 for lightweight, frequent tasks
- Sonnet 4.5 for main development work
- Opus 4.5 for deep architectural decisions

### 4. Skills System

**Location:** `skills/*/SKILL.md`

Reusable patterns and learned workflows.

**Types:**
- **Core Skills** - Coding standards, frontend/backend patterns, TDD
- **Learned Skills** - Auto-extracted from sessions (`skills/learned/`)

**Structure:**
```
skills/
├── coding-standards/
│   └── SKILL.md
├── frontend-patterns/
│   └── SKILL.md
├── learned/
│   ├── pattern-1.md
│   ├── pattern-2.md
│   └── ...
```

**Continuous Learning:**
Sessions automatically extract patterns into `skills/learned/` for reuse.

### 5. Auto-Sync System

**Location:** `sync/`

Keeps configuration synchronized across machines via GitHub.

**Components:**

#### File Watcher Daemon
- Node.js process monitoring `~/.claude/` for changes
- Debounced commits (waits 5 minutes after last change)
- Auto-push to GitHub on changes

#### Pull Scheduler
- Runs every hour
- Fetches latest from GitHub
- Rebases local changes

#### Installation
```bash
sync/
├── daemon/
│   ├── watcher.js       # File monitoring logic
│   └── scheduler.js     # Pull scheduler
├── install.sh           # Setup script
└── uninstall.sh         # Cleanup
```

**Conflict Resolution:**
- Always pull with rebase
- Manual resolution required for conflicts
- Status notifications to user

### 6. Web Integration

**Location:** `browser-extension/`

Sync Claude Codex to Claude.ai Projects.

**Architecture:**

```
GitHub (claude-codex)
       │
       │ (fetch via API)
       ▼
Browser Extension
       │
       │ (inject into page)
       ▼
Claude.ai Projects
```

**Extension Features:**
- One-click sync button
- Version detection (check if update needed)
- Offline caching
- Auto-sync on page load (optional)

**Bookmarklet Alternative:**
Simple JavaScript snippet that fetches CLAUDE.md and copies to clipboard.

### 7. Plugin System

**Location:** `.claude-plugin/plugin.json`

Enables distribution via Claude Code plugin marketplace.

**Manifest:**
```json
{
  "name": "claude-codex",
  "version": "1.0.0",
  "description": "Universal Claude Code configuration",
  "author": "JB",
  "repository": "https://github.com/Aventerica89/claude-codex",
  "entry": "CLAUDE.md",
  "commands": "commands/",
  "agents": "agents/",
  "skills": "skills/"
}
```

**Installation Paths:**
- Plugin mode: `~/.claude/plugins/claude-codex/`
- Direct mode: `~/.claude/` (symlink)

## Data Flow

### Command Execution

```
User types: /tdd
       │
       ▼
Claude Code CLI recognizes command
       │
       ▼
Loads: commands/tdd.md
       │
       ▼
Executes workflow with tdd-guide agent
       │
       ▼
Saves learned patterns to skills/learned/
       │
       ▼
Auto-sync pushes to GitHub (if daemon enabled)
```

### Agent Invocation

```
Complex task detected
       │
       ▼
Main Claude checks agents/ directory
       │
       ▼
Selects appropriate agent (e.g., planner)
       │
       ▼
Spawns agent with focused context
       │
       ▼
Agent returns structured output
       │
       ▼
Main Claude integrates result
```

### Sync Flow

```
Local Change (Machine 1)
       │
       ▼
File watcher detects modification
       │
       ▼
Wait 5 minutes (debounce)
       │
       ▼
Commit + Push to GitHub
       │
       ▼
Pull scheduler on Machine 2 (hourly)
       │
       ▼
Rebase local changes
       │
       ▼
~/.claude/ updated on Machine 2
```

## Security Architecture

### Secret Management

**1Password Integration:**

```
API Key from User
       │
       ▼
Store in 1Password (op CLI)
       │
       ▼
Tag with metadata (provider, project)
       │
       ▼
MCP server reads from 1Password
       │
       ▼
Deploy to platforms (Vercel, Cloudflare)
       │
       ▼
Never stored in git or config files
```

### Local Development

**op inject pattern:**

```
.env.local.tpl (version controlled)
  ↓
Contains: {{ op://Business/API Key/credential }}
  ↓
npm run env:inject
  ↓
Generates: .env.local (git-ignored)
  ↓
App reads environment variables
```

**Benefits:**
- Secrets never in git
- Team-friendly (everyone uses same template)
- One command to sync all secrets

## File Organization

### Directory Structure

```
claude-codex/
├── .claude-plugin/
│   └── plugin.json          # Plugin manifest
├── .github/
│   └── workflows/
│       ├── validate.yml     # Lint commands/agents/skills
│       └── release.yml      # Automated releases
├── agents/                  # 12+ specialized agents
│   ├── planner.md
│   ├── tdd-guide.md
│   └── ...
├── commands/                # 38+ custom commands
│   ├── tdd.md
│   ├── commit.md
│   ├── security/            # Security command suite
│   │   ├── api-security.md
│   │   ├── secrets-scan.md
│   │   └── ...
│   └── ...
├── skills/                  # Reusable patterns
│   ├── coding-standards/
│   │   └── SKILL.md
│   ├── frontend-patterns/
│   │   └── SKILL.md
│   └── learned/             # Auto-extracted patterns
│       ├── pattern-1.md
│       └── ...
├── rules/                   # Modular guidelines
│   ├── cli-first.md
│   ├── coding-style.md
│   ├── testing.md
│   ├── git-workflow.md
│   ├── security.md
│   ├── performance.md
│   ├── string-length.md
│   └── ...
├── sync/                    # Auto-sync system
│   ├── daemon/
│   │   ├── watcher.js       # File monitoring
│   │   └── scheduler.js     # Pull scheduler
│   ├── install.sh
│   └── uninstall.sh
├── browser-extension/       # Chrome extension
│   ├── manifest.json
│   ├── background.js
│   └── content.js
├── knowledge/               # Domain-specific knowledge
│   └── bricks/              # Bricks Builder patterns
├── projects/                # Project-specific configs
│   └── bricks-builder/
├── contexts/                # Saved session contexts
├── codemaps/                # Architecture diagrams
├── examples/                # Example configurations
├── CLAUDE.md                # Main configuration
├── ideas.md                 # Feature backlog
└── README.md
```

### File Naming Conventions

- **Commands:** kebab-case.md (e.g., `code-review.md`)
- **Agents:** kebab-case.md (e.g., `tdd-guide.md`)
- **Skills:** directory-name/SKILL.md
- **Rules:** kebab-case.md (e.g., `cli-first.md`)
- **Contexts:** project-name-YYYY-MM-DD.md

## Scalability Considerations

### Multi-Machine Sync

**Challenges:**
- Concurrent edits on multiple machines
- Network latency and offline mode
- Merge conflicts

**Solutions:**
- Rebase-based workflow (linear history)
- Debounced commits (avoid rapid-fire changes)
- Manual conflict resolution with notifications

### Plugin Distribution

**Distribution Channels:**
1. Claude Code marketplace (when available)
2. Direct GitHub installation
3. Symlink for development

**Versioning:**
- Semantic versioning (1.0.0)
- Git tags for releases
- Changelog tracking

### Performance

**Optimization Strategies:**
- Lazy loading of skills (only load when needed)
- Caching of parsed markdown
- Minimal file size (focused documentation)

## Extension Points

### Adding New Commands

1. Create `commands/new-command.md`
2. Define frontmatter (name, description, category)
3. Document usage and implementation
4. Test with Claude Code
5. Commit and sync

### Adding New Agents

1. Create `agents/new-agent.md`
2. Define role, model, workflow
3. Reference from CLAUDE.md
4. Test agent invocation
5. Commit and sync

### Adding New Skills

1. Create `skills/new-skill/SKILL.md`
2. Document patterns and examples
3. Reference from CLAUDE.md
4. Use in sessions to validate
5. Commit and sync

## CI/CD Integration

**GitHub Actions Workflows:**

### Validation (`validate.yml`)
- Lint markdown files
- Check frontmatter format
- Validate JSON in plugin manifest
- Ensure no broken links

### Release (`release.yml`)
- Automated version bumping
- Git tag creation
- GitHub release notes
- Plugin package generation

## Future Enhancements

**Planned Improvements:**

1. **Multi-User Support** - Team sharing of skills/patterns
2. **Marketplace Integration** - Public plugin distribution
3. **Mobile App** - iOS/Android companion for context sync
4. **VS Code Extension** - IDE integration
5. **Analytics** - Track command usage, agent invocations
6. **Community Skills** - Shared pattern library

## Philosophy

Claude Codex architecture embodies:

- **Modularity** - Small, focused components
- **Composability** - Mix and match skills/agents
- **Transparency** - Plain text, version controlled
- **Automation** - Sync without thinking
- **Extensibility** - Easy to add new components
- **Security-First** - Secrets managed via 1Password
- **Quality-Driven** - Tests, reviews, best practices built-in
