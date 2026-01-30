---
title: Claude Codex
description: Universal Claude Code configuration system with auto-sync and plugin distribution
source_project: /Users/jb/.21st/worktrees/claude-config/following-glacier
sidebar:
  order: 0
---

**Universal Claude Code configuration system with auto-sync across CLI and web.**

Claude Codex is a comprehensive configuration framework for Claude Code that provides curated commands, agents, skills, and rules for professional development with automatic synchronization across all your machines.

## Overview

Claude Codex transforms Claude Code into a powerful, personalized development environment by providing:

- **50+ Custom Commands** - Productivity shortcuts for common development tasks
- **12+ Specialized Agents** - TDD, security review, architecture, build fixes, and more
- **15+ Skills** - Frontend/backend patterns, security review, continuous learning
- **Modular Rules** - Coding style, git workflow, testing, performance optimization
- **Auto-Sync System** - Changes sync automatically across all machines via GitHub
- **Web Integration** - Browser extension for Claude.ai Projects
- **Plugin Distribution** - Install once, use everywhere

## Tech Stack

| Component | Technology |
|-----------|-----------|
| **CLI Framework** | Claude Code SDK |
| **Language** | Markdown (config), JavaScript (automation) |
| **Auto-Sync** | Node.js file watcher daemon |
| **Distribution** | Claude Code plugin system |
| **Version Control** | Git + GitHub |
| **Web Integration** | Chrome extension, bookmarklets |
| **CI/CD** | GitHub Actions |

## Quick Start

### Option 1: As Plugin (Recommended)

```bash
# Install via Claude Code CLI
claude plugin install github:Aventerica89/claude-codex

# The plugin is now active - all commands, agents, and skills are available
```

### Option 2: Direct Clone

```bash
# Backup existing config (if any)
mv ~/.claude ~/.claude.backup

# Clone Claude Codex
git clone https://github.com/Aventerica89/claude-codex.git ~/claude-codex

# Symlink to ~/.claude/
ln -s ~/claude-codex ~/.claude

# Install auto-sync (optional)
cd ~/claude-codex/sync
./install.sh
```

### Verify Installation

```bash
# Check that Claude Code recognizes the config
claude --version

# List available commands
ls ~/.claude/commands/

# Test the system
claude /help
```

## Core Components

### Commands

Custom slash commands organized by category:

**Development:**
- `/tdd` - Test-driven development workflow
- `/plan` - Create implementation plan
- `/code-review` - Review code for quality/security
- `/fix-issue <#>` - Analyze and fix GitHub issue

**Git & Workflow:**
- `/commit` - Create conventional commit
- `/standup` - Generate standup notes from git
- `/create-release` - Automated versioning and git tagging

**Session Management:**
- `/context-save` - Save session for later
- `/context-restore` - Resume saved session
- `/end` - End session cleanly
- `/remind` - Quick context reminder

**Quality & Deployment:**
- `/deploy-check` - Pre-deployment checklist
- `/deps-audit` - Audit dependencies
- `/security-review` - Security analysis
- `/setup-github-actions` - Initialize CI/CD workflows

**Documentation:**
- `/jbdocs` - Sync to docs.jbcloud.app
- `/new-project` - Initialize new project

### Agents

Specialized AI agents for complex tasks:

- **planner** - Feature implementation planning
- **architect** - System design and architecture
- **tdd-guide** - Test-driven development
- **code-reviewer** - Code quality analysis
- **security-reviewer** - Security vulnerability scanning
- **build-error-resolver** - Fix build and type errors
- **e2e-runner** - Playwright E2E testing
- **doc-updater** - Documentation management
- **env-deployer** - Auto-deploy env vars to platforms
- **jbdocs** - Specialized agent for documentation sync

### Skills

Reusable patterns and workflows:

- **coding-standards** - TypeScript/JavaScript best practices
- **frontend-patterns** - React, Next.js patterns
- **backend-patterns** - API design, database optimization
- **security-review** - Security checklists and patterns
- **tdd-workflow** - Test-driven development workflow
- **continuous-learning** - Auto-extract patterns from sessions

### Rules

Modular guidelines for consistent development:

- **cli-first.md** - Check tools before asking user
- **coding-style.md** - Immutability, file organization
- **testing.md** - TDD workflow, 80% coverage requirement
- **git-workflow.md** - Commit format, PR workflow
- **security.md** - Security checks, secret management
- **performance.md** - Model selection, context management
- **string-length.md** - Prevent long string API errors

## Auto-Sync System

Keep your configuration synchronized across all machines automatically.

### How It Works

```
Your Machine 1          GitHub (Master)          Your Machine 2
    ~/.claude/     ←→   claude-codex repo   ←→     ~/.claude/

    Changes auto-commit      Updates every           Pulls latest
    and push every 5min      hour automatically      config hourly
```

### Enable Auto-Sync

```bash
cd ~/claude-codex/sync
./install.sh

# Auto-sync daemon is now running
# Changes will sync automatically
```

### Manual Sync

```bash
# Push your changes
cd ~/.claude
git add -A && git commit -m "update: description" && git push

# Pull latest from GitHub
git pull --rebase
```

## Web Integration

Use Claude Codex in Claude.ai Projects with the browser extension.

### Browser Extension

**Installation:**
1. Download the extension from `browser-extension/`
2. Load as unpacked extension in Chrome
3. Navigate to claude.ai/projects
4. Click "Sync Codex" button

**Features:**
- One-click sync from GitHub to Projects
- Automatic version detection
- Offline caching

### Bookmarklet (Alternative)

For quick access without installing the extension, use the bookmarklet:

```javascript
javascript:(async()=>{const r=await fetch('https://raw.githubusercontent.com/Aventerica89/claude-codex/main/CLAUDE.md');navigator.clipboard.writeText(await r.text());alert('Codex copied!')})();
```

Drag to bookmarks bar, click to copy the latest config to clipboard.

## Project Structure

```
claude-codex/
├── .claude-plugin/
│   └── plugin.json              # Plugin manifest
├── .github/
│   └── workflows/
│       └── validate.yml         # CI validation
├── agents/                      # Specialized agents
│   ├── planner.md
│   ├── tdd-guide.md
│   └── ...
├── commands/                    # Custom commands
│   ├── tdd.md
│   ├── commit.md
│   └── ...
├── skills/                      # Reusable skills
│   ├── coding-standards/
│   ├── frontend-patterns/
│   └── learned/                 # Auto-extracted patterns
├── rules/                       # Modular rules
│   ├── cli-first.md
│   ├── testing.md
│   └── ...
├── sync/                        # Auto-sync system
│   ├── daemon/                  # File watcher
│   ├── install.sh               # Setup script
│   └── uninstall.sh             # Cleanup
├── browser-extension/           # Web sync
├── CLAUDE.md                    # Main configuration
├── ideas.md                     # Feature ideas
└── README.md
```

## Key Features

### CLI-First Philosophy

Claude Codex enforces a CLI-first approach:

- Check available tools BEFORE asking the user
- Use MCP servers for API keys, project IDs, platform detection
- Read files directly instead of asking for contents
- Run commands to get information automatically

### 1Password Integration

Automatic API key and secret management:

- Store all secrets in 1Password
- Deploy to platforms (Vercel, Cloudflare) automatically
- Use `op inject` for local development
- Never commit secrets to git

### Agent-First Development

Delegate complex tasks to specialized agents:

- Planner for feature implementation
- TDD guide for test-driven development
- Code reviewer immediately after writing code
- Security reviewer before commits

### Quality Standards

Built-in quality requirements:

- 80% minimum test coverage
- No security vulnerabilities
- Conventional commits format
- Immutable coding patterns
- Many small files over few large files

## Using Claude Codex

### Development Workflow

```bash
# Start a new feature
/plan implement user authentication

# Write tests first
/tdd create login form

# Review your code
/code-review

# Security check
/security

# Commit changes
/commit
```

### Customization

To customize for your workflow:

1. Fork the repository
2. Edit `CLAUDE.md` and rule files
3. Add your own commands in `commands/`
4. Add your own skills in `skills/learned/`
5. Push changes - they'll sync automatically

### Contributing Patterns

When you discover useful patterns:

```bash
# Use the learn command
/learn save pattern-name

# Patterns are stored in skills/learned/
# They sync across all your machines
```

## Repository

- **GitHub**: [Aventerica89/claude-codex](https://github.com/Aventerica89/claude-codex)
- **Issues**: [Report bugs or request features](https://github.com/Aventerica89/claude-codex/issues)
- **Documentation**: [docs.jbcloud.app/claude-codex](https://docs.jbcloud.app/claude-codex)

## Roadmap

- [x] Plugin manifest
- [x] GitHub validation workflow
- [x] Comprehensive documentation
- [x] Auto-sync daemon
- [x] Browser extension
- [x] Bookmarklet tools
- [ ] Multi-machine testing
- [ ] Marketplace submission
- [ ] Community skill sharing
- [ ] VS Code integration

## Philosophy

**Agent-first design, parallel execution, plan before action, test before code, security always.**

Claude Codex embodies best practices for AI-assisted development:

1. **CLI-First** - Check capabilities before asking
2. **Agent-First** - Delegate to specialists
3. **Parallel Execution** - Use multiple agents simultaneously
4. **Plan Before Execute** - Use Plan Mode for complex operations
5. **Test-Driven** - Write tests before implementation
6. **Security-First** - Never compromise on security
