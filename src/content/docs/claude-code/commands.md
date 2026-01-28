---
title: Available Commands
description: Reference for all Claude Code slash commands
sidebar:
  order: 1
---

Complete reference for all custom slash commands available in Claude Code.

## Project Creation

| Command | Description |
|---------|-------------|
| `/new-project` | Initialize new project with full setup |
| `/new-project --quick` | Fast mode with smart defaults |
| `/new-project --preset saas` | Use preset (saas, landing, api, portfolio, experiment) |

## Development

| Command | Description |
|---------|-------------|
| `/tdd` | Test-driven development workflow |
| `/plan` | Create implementation plan |
| `/code-review` | Review code for quality and security |
| `/fix-issue <#>` | Analyze and fix GitHub issue by number |
| `/build-fix` | Fix build errors |
| `/refactor-clean` | Clean up and refactor code |

## Git & Workflow

| Command | Description |
|---------|-------------|
| `/standup` | Generate standup notes from git history |
| `/checkpoint` | Create a checkpoint commit |

## Testing

| Command | Description |
|---------|-------------|
| `/tdd` | Test-driven development cycle |
| `/e2e` | Run end-to-end tests with Playwright |
| `/test-coverage` | Check test coverage |
| `/verify` | Verify tests pass |

## Session Management

| Command | Description |
|---------|-------------|
| `/context-save [name]` | Save session state for later |
| `/context-restore [name]` | Resume saved session |
| `/end` | End session cleanly with sync |
| `/remind` | Quick context reminder |

## Quality & Deployment

| Command | Description |
|---------|-------------|
| `/deploy-check` | Pre-deployment verification checklist |
| `/deps-audit` | Audit dependencies for security/updates |
| `/eval` | Evaluate code quality |

## Security Suite

| Command | Description | Frequency |
|---------|-------------|-----------|
| `/security` | Full security audit (all checks) | Weekly, before deploy |
| `/security --quick` | Critical checks only | Before commits |
| `/security:secrets-scan` | Find leaked secrets in code/git | Every commit |
| `/security:headers` | Check HTTP security headers | Before deploy |
| `/security:license-audit` | Check dependency licenses | Before release |
| `/security:api-security` | API endpoint security audit | After API changes |
| `/security:env-check` | Environment variable security | After config changes |

## Documentation

| Command | Description |
|---------|-------------|
| `/jbdocs` | Sync project docs to docs.jbcloud.app |
| `/jbdocs init` | Initial documentation setup |
| `/jbdocs update` | Update existing docs |
| `/jbdocs progress` | Update progress only |
| `/jbdocs commands` | Sync commands reference |
| `/update-docs` | Update project documentation |
| `/update-codemaps` | Update code architecture maps |

## Learning & Ideas

| Command | Description |
|---------|-------------|
| `/learn` | Extract reusable patterns |
| `/ideas` | Capture and manage ideas |

## Advanced

| Command | Description |
|---------|-------------|
| `/orchestrate` | Multi-agent orchestration |
| `/setup-pm` | Setup project management |

---

## Command Details

### /new-project

Full project initialization with:
- Platform selection (framework, database, auth, hosting)
- Style guide generation
- Architecture design
- Implementation planning
- Scaffolding

**Presets:**
- `saas` - Next.js + Supabase + Vercel
- `landing` - Astro + Cloudflare
- `api` - Hono + Turso + Cloudflare Workers
- `portfolio` - Astro + Cloudflare
- `experiment` - Next.js + SQLite + Local

### /fix-issue

```bash
/fix-issue 123        # Fix issue #123
/fix-issue 123 --dry  # Analyze only
```

Fetches GitHub issue, creates plan, implements fix.

### /context-save / /context-restore

Save session state including:
- Current task and progress
- Uncommitted changes (as patch)
- Key decisions made
- Next steps planned

```bash
/context-save auth-refactor
# ... close session ...
/context-restore auth-refactor
```

### /deploy-check

Pre-deployment checklist:
- Build verification
- Test suite
- Environment variables
- Dependencies audit
- Database migrations
- Security checks
- Git status

```bash
/deploy-check          # Full check
/deploy-check --quick  # Essential only
/deploy-check --fix    # Auto-fix issues
```

### /deps-audit

Comprehensive dependency analysis:
- Security vulnerabilities
- Outdated packages
- Unused dependencies
- Duplicate packages
- License compliance

```bash
/deps-audit            # Full audit
/deps-audit --security # Security only
/deps-audit --fix      # Auto-fix safe issues
```

### /standup

Generate standup notes from git history:

```bash
/standup               # Daily summary
/standup --week        # Weekly summary
/standup --slack       # Slack-formatted
```

### /jbdocs

Sync documentation to docs.jbcloud.app:

```bash
/jbdocs                # Sync current project
/jbdocs init           # Initial setup
/jbdocs update         # Update all docs
/jbdocs progress       # Progress only
/jbdocs commands       # Sync this reference
```

---

### /security

Comprehensive security audit suite with sub-commands:

```bash
/security                    # Full audit (all checks)
/security --quick            # Critical checks only
/security secrets            # Secrets detection
/security headers            # HTTP headers check
/security licenses           # License compliance
/security api                # API endpoint audit
/security env                # Environment vars check
```

**When to Run**:

| Trigger | Command |
|---------|---------|
| Before every commit | `/security --quick` |
| Before deployment | `/security` (full) |
| Weekly scheduled | `/security` (full) |
| New API endpoint | `/security api` |
| Config changes | `/security env` |
| New dependencies | `/security licenses` |

**Sub-Commands**:

| Command | Purpose |
|---------|---------|
| `secrets-scan` | Deep secrets detection in code and git history |
| `headers` | Check CSP, HSTS, X-Frame-Options, etc. |
| `license-audit` | Flag GPL/AGPL, check compliance |
| `api-security` | Auth, authorization, input validation, rate limiting |
| `env-check` | Validate .env files and env var usage |

---

## Adding Custom Commands

Create a markdown file in `~/.claude/commands/`:

```markdown
---
description: Brief description of command
---

# Command Name

Instructions for Claude to follow...
```

Access with `/command-name` or `/command-name arguments`.

Use `$ARGUMENTS` placeholder for parameters.
