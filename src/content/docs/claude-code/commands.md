---
title: Available Commands
description: Reference for all 33 Claude Code slash commands
sidebar:
  order: 1
---

Complete reference for all custom slash commands available in Claude Code.

**Total Commands**: 28 main + 5 security sub-commands = 33

## Project Creation

| Command | Description |
|---------|-------------|
| `/new-project` | Initialize a new project with full setup - platform selection, style guide, architecture, and implementation plan |
| `/new-project --quick` | Fast mode with smart defaults |
| `/new-project --preset saas` | Use preset (saas, landing, api, portfolio, experiment) |

## Development

| Command | Description |
|---------|-------------|
| `/tdd` | Enforce test-driven development workflow. Scaffold interfaces, generate tests FIRST, then implement |
| `/plan` | Restate requirements, assess risks, and create step-by-step implementation plan |
| `/code-review` | Review code for quality and security |
| `/fix-issue <#>` | Analyze and fix a GitHub issue by number. Fetches issue details, creates plan, and fixes |
| `/build-fix` | Fix build errors |
| `/refactor-clean` | Clean up and refactor code |

## Git & Workflow

| Command | Description |
|---------|-------------|
| `/standup` | Generate standup notes from recent git activity and session context |
| `/checkpoint` | Create a checkpoint commit |

## Testing

| Command | Description |
|---------|-------------|
| `/tdd` | Test-driven development cycle (RED → GREEN → REFACTOR) |
| `/e2e` | Generate and run end-to-end tests with Playwright |
| `/test-coverage` | Check test coverage |
| `/verify` | Verify tests pass |

## Session Management

| Command | Description |
|---------|-------------|
| `/context-save [name]` | Save current session context for later restoration |
| `/context-restore [name]` | Restore a previously saved session context. Resume exactly where you left off |
| `/end` | End session cleanly - sync docs, commit to memory, shutdown |
| `/remind` | Remind user what project they're working on and current status |
| `/remind --on` | Enable auto-reminders (every 2nd response) |
| `/remind --off` | Disable auto-reminders |

## Quality & Deployment

| Command | Description |
|---------|-------------|
| `/deploy-check` | Pre-deployment verification checklist. Run before deploying to catch common issues |
| `/deploy-env` | Auto-deploy env vars from 1Password to platforms (Vercel, Cloudflare, GitHub, etc.) |
| `/deps-audit` | Audit dependencies for security vulnerabilities, outdated packages, and unused dependencies |
| `/eval` | Evaluate code quality |

## Security Suite

| Command | Description | When to Run |
|---------|-------------|-------------|
| `/security` | Full security audit (all checks) | Weekly, before deploy |
| `/security --quick` | Critical checks only | Before commits |
| `/security:secrets-scan` | Deep secrets detection in code and git history | Every commit |
| `/security:headers` | Check HTTP security headers (CSP, HSTS, etc.) | Before deploy |
| `/security:license-audit` | Check dependency licenses for compliance | Before release |
| `/security:api-security` | API endpoint security audit (auth, validation, rate limiting) | After API changes |
| `/security:env-check` | Validate environment variable security | After config changes |

## Documentation

| Command | Description |
|---------|-------------|
| `/jbdocs` | Sync project documentation to docs.jbcloud.app |
| `/jbdocs init` | Initial documentation setup for new project |
| `/jbdocs update` | Update existing docs |
| `/jbdocs progress` | Update progress only |
| `/jbdocs commands` | Sync this commands reference |
| `/jbdocs --dry-run` | Preview changes without committing |
| `/jbdocs --fix` | Auto-fix validation issues |
| `/update-docs` | Update project documentation |
| `/update-codemaps` | Update code architecture maps |

## Learning & Ideas

| Command | Description |
|---------|-------------|
| `/learn` | Extract reusable patterns from current session |
| `/ideas` | Capture and manage ideas |

## Advanced

| Command | Description |
|---------|-------------|
| `/orchestrate` | Multi-agent orchestration for complex tasks |
| `/setup-pm` | Configure your preferred package manager (npm/pnpm/yarn/bun) |

---

## Command Details

### /new-project

Full project initialization with phases:
1. **Basics** - Name, description, problem, users
2. **Platform** - Framework, database, auth, hosting
3. **Style Guide** - Colors, typography, components
4. **Architecture** - System design, data models
5. **Plan** - Implementation phases, MVP scope
6. **Scaffold** - Create files, git init
7. **Ready** - Handoff with next steps

**Presets**:

| Preset | Stack |
|--------|-------|
| `saas` | Next.js + Supabase + Vercel + shadcn/ui |
| `landing` | Astro + Cloudflare + Tailwind |
| `api` | Hono + Turso + Cloudflare Workers |
| `portfolio` | Astro + Cloudflare + Tailwind |
| `experiment` | Next.js + SQLite + Local |

**Flags**:
- `--quick` or `-q` - Skip confirmations
- `--preset <name>` - Use preset config
- `--name <name>` - Set project name
- `--github` - Auto-create GitHub repo
- `--docs` - Auto-sync to docs.jbcloud.app

---

### /fix-issue

```bash
/fix-issue 123        # Fix issue #123
/fix-issue 123 --dry  # Analyze only, don't change code
```

Workflow:
1. Fetch issue via `gh issue view`
2. Analyze requirements
3. Create implementation plan
4. Implement fix (TDD approach)
5. Commit with "Fixes #123"

---

### /context-save / /context-restore

Save session state for later:

```bash
/context-save auth-refactor     # Save with name
/context-save                   # Auto-generate name
/context-save --list            # List saved contexts
```

Resume later:

```bash
/context-restore auth-refactor  # Restore specific
/context-restore --latest       # Restore most recent
```

**What gets saved**:
- Current task and progress
- Uncommitted changes (as patch)
- Key decisions made
- Next steps planned

---

### /remind

Context reminder for multi-window workflows:

```bash
/remind              # Manual reminder (once)
/remind --on         # Enable auto-reminders
/remind --off        # Disable auto-reminders
/remind --on -f 3    # Remind every 3rd response
/remind --full       # Include git status
/remind --tasks      # Include task list
```

**Manual Reminder Output**:
```
**Current Project: jb-cloud-app-tracker**
- Path: /Users/jb/jb-cloud-app-tracker
- Description: Track cloud apps across multiple providers
- Current Task: Implementing Vercel API integration
- Waiting On: Database migration
```

**Auto-Remind Mode**:

When enabled with `--on`, Claude automatically shows a compact reminder every Nth response:

```
---
**Context:** jb-cloud-app-tracker | Cloud app tracking
**Working on:** Implementing Vercel API integration
```

**Skip Conditions** (reminder won't show if):
- You have pending choices (AskUserQuestion active)
- Just showed a reminder
- Mid-task that needs continuation

**Frequency Options**:
- `-f 1` - Every response (frequent)
- `-f 2` - Every other response (default)
- `-f 5` - Every 5th response (occasional)

**Use Cases**:
- Juggling multiple projects/terminal windows
- Long sessions where you lose track
- Returning after a break

---

### /security

Comprehensive security audit suite:

```bash
/security                    # Full audit (all checks)
/security --quick            # Critical checks only (secrets + deps)
/security secrets            # Run secrets-scan
/security headers            # Run headers check
/security licenses           # Run license-audit
/security api                # Run api-security
/security env                # Run env-check
```

**When to Run**:

| Schedule | Command | Why |
|----------|---------|-----|
| Every commit | `/security --quick` | Catch secrets |
| Before deploy | `/security` | Full verification |
| Weekly | `/security` | New CVEs daily |
| After API changes | `/security api` | Verify auth/validation |
| After config changes | `/security env` | Check env vars |
| Before release | `/security licenses` | License compliance |

**Sub-Commands**:

| Command | Checks |
|---------|--------|
| `secrets-scan` | API keys, tokens, passwords in code and git history |
| `headers` | CSP, HSTS, X-Frame-Options, cookies |
| `license-audit` | GPL/AGPL flags, compliance, attribution |
| `api-security` | Auth, authorization, validation, rate limiting |
| `env-check` | .env files, hardcoded secrets, validation |

---

### /deploy-check

Pre-deployment verification:

```bash
/deploy-check          # Full checklist
/deploy-check --quick  # Essential only
/deploy-check --fix    # Auto-fix issues
```

**Checks**:
- Build verification
- Test suite (80% coverage)
- Environment variables
- Dependency vulnerabilities
- Database migrations
- Security scan
- Git status

---

### /deploy-env

Automatically deploy environment variables from 1Password to platforms:

```bash
/deploy-env              # Auto-detect platform and keys
/deploy-env vercel       # Deploy to Vercel
/deploy-env cloudflare   # Deploy to Cloudflare Pages/Workers
/deploy-env github org/repo  # Deploy to GitHub Actions
```

**Workflow**:
1. Scans project for required env vars (`.env.example`, code)
2. Detects platform from config files
3. Matches keys in 1Password
4. Deploys via platform CLI

**Supported Platforms**: Vercel, Netlify, Cloudflare, GitHub Actions, Railway, Fly.io

**Requirements**: Platform CLI installed + 1Password CLI authenticated

---

### /deps-audit

Dependency analysis:

```bash
/deps-audit              # Full audit
/deps-audit --security   # Security only
/deps-audit --outdated   # Outdated packages
/deps-audit --unused     # Unused dependencies
/deps-audit --fix        # Auto-fix safe issues
```

---

### /standup

Generate standup notes:

```bash
/standup               # Daily summary
/standup --week        # Weekly summary
/standup --slack       # Slack-formatted with emoji
```

---

### /jbdocs

Sync documentation to docs.jbcloud.app:

```bash
/jbdocs                # Sync current project
/jbdocs init           # Initial setup
/jbdocs update         # Update all docs
/jbdocs progress       # Progress only
/jbdocs commands       # Sync this reference

# Phase 1 Flags
/jbdocs --dry-run      # Preview changes without applying
/jbdocs --fix          # Auto-fix validation issues
/jbdocs update --dry-run  # Combine mode with flag
```

**Features**:
- **Dry-run mode**: Preview what would be synced without committing
- **Validation**: Checks frontmatter, markdown syntax, broken links
- **Auto-fix**: Corrects missing descriptions, code block languages
- **Conflict detection**: Prevents overwriting different projects with same slug
- **Retry logic**: Deployment verification with exponential backoff

---

## Adding Custom Commands

Create a markdown file in `~/.claude/commands/`:

```markdown
---
description: Brief description of command
---

# Command Name

Instructions for Claude to follow...

Use `$ARGUMENTS` for parameters.
```

Access with `/command-name` or `/command-name arguments`.

### Sub-Commands

Create a directory for grouped commands:

```
~/.claude/commands/
└── security/
    ├── secrets-scan.md    → /security:secrets-scan
    ├── headers.md         → /security:headers
    └── api-security.md    → /security:api-security
```

---

## Quick Reference

```bash
# Project lifecycle
/new-project              # Start new project
/plan                     # Plan implementation
/tdd                      # Write code TDD style
/end                      # End session

# Quality
/code-review              # Review code
/deploy-check             # Pre-deploy check
/security                 # Security audit

# Session
/context-save             # Save for later
/context-restore          # Resume session
/remind                   # Quick reminder
/remind --on              # Auto-remind every 2nd response
/remind --off             # Disable auto-remind

# Documentation
/jbdocs                   # Sync docs
/standup                  # Generate notes
```
