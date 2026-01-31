---
title: Documentation Updates
description: New and updated documentation for JB Cloud projects
---

# Documentation Updates

Track when new documentation is added for jbcloud.app projects.

---

## January 2026

### January 30, 2026 (Latest)

**Updated Documentation**
- [Renvio Companion App](/renvio-companion-app/) - Comprehensive implementation guide added
  - New 936-line implementation guide mapping HDFlowsheet features to modern stack
  - Updated project status (Phase 1: 85% complete, Phase 2: 20% complete)
  - Detailed component breakdown for all 4 implementation phases
  - State management strategy with Zustand
  - Data persistence patterns and API route examples
  - Testing strategy for E2E, integration, and unit tests
  - Live at https://flat-vale.vercel.app

**New Documentation & Features**
- [AeroSpace Multi-Config Setup](/aerospace/multi-config/) - Symlink-based system for managing multiple window manager configurations
  - Switch between minimal (5 workspaces) and full (35 workspaces) configs instantly
  - Custom configs for laptop, desktop, work, focus mode
  - Automatic config reloading with `aerospace-switch` CLI tool
  - Real-world examples for context-based switching
  - Compatible with existing AeroSpace installations

### January 29, 2026

**Updated Documentation**
- [URLsToGo](/linkshort/) - Repository renamed from cf-url-shortener to URLsToGo
  - Updated all GitHub repository links
  - Updated source project paths
  - Updated artifact manager references
  - New URL: https://github.com/Aventerica89/URLsToGo

### January 30, 2026 (Earlier)

**New Projects**
- [Claude Codex](/claude-codex/) - Universal Claude Code configuration system
  - 38+ custom commands for productivity shortcuts
  - 12+ specialized agents (TDD, security, architecture, build fixes)
  - 15+ reusable skills (frontend/backend patterns, continuous learning)
  - Auto-sync daemon for cross-machine synchronization
  - Browser extension for Claude.ai Projects integration
  - Plugin-based distribution system
  - GitHub Actions CI/CD workflows
  - Comprehensive documentation with architecture and implementation plan
  - GitHub: https://github.com/Aventerica89/claude-codex

### January 30, 2026 (Earlier)

**New Projects**
- [Renvio Companion App](/renvio-companion-app/) - Hemodialysis clinic companion app for charting and workflow optimization
  - Modern re-implementation of HDFlowsheet-Cloud
  - Next.js 15 + Turso (libSQL) + Drizzle ORM + Better Auth
  - HIPAA-compliant design for healthcare workflows
  - Real-time flowsheet charting and vitals entry
  - Foundation phase: database schema, authentication, core UI components
  - GitHub: https://github.com/Aventerica89/renvio-companion-app

**New Documentation & Features**
- [Claude Code Integration](/changelog/) - Added comprehensive "Using with Claude Code" sections to all 33 documentation pages
  - Development workflows, testing, and debugging examples for each project
  - Real CLI commands and code generation patterns
  - Platform-specific integration (SwiftUI, Cloudflare Workers, Next.js, etc.)
  - Merged via PR #5

- [SSH Setup Guide](/xcloud/ssh-setup/) - Comprehensive xCloud SSH access with Claude Code remote development
  - 3 configuration methods (settings.json, env vars, SSH config)
  - Docker command reference and xCloud Command Runner integration
  - Real-world Ollama memory configuration example
  - Merged via PR #4

- /jbdocs Command Enhancement - Automatic "What's New" section updates
  - New Step 5.5: Update What's New section on homepage with every sync
  - Keeps only 2 most recent items in CardGrid
  - Auto-removes older entries when adding new ones

**Updated Documentation**
- [Claude Code](/claude-code/) - New release and GitHub Actions commands
  - Added `/create-release` command for automated versioning and git tag creation
  - Added `/setup-github-actions` command for CI/CD workflow configuration
  - Integrated both commands into `/new-project` workflow (Phase 6.8)
  - Updated commands reference (now 38 total commands)
  - Added Git & Releases section to command categories

- [WP Manager](/wp-manager/) - 1Password integration and environment variable automation
  - Implemented CLI-first workflow for secure credential management
  - Added `npm run env:inject` for one-command environment setup
  - Created `.env.local.tpl` template with 1Password secret references
  - Stored all secrets in 1Password Business vault
  - Deployed environment variables to Vercel (production, preview, development)
  - Updated development workflow with team-friendly automation
  - Live at https://cloud-manager.jbcloud.app

### January 29, 2026

**Updated Documentation**
- [WP Manager](/wp-manager/) - Security hardening and database migration complete
  - Resolved all CRITICAL and HIGH security issues
  - JWT secret enforcement, timing-safe password comparison, comprehensive input validation
  - Deployed 15 new tables to production (Tags, Monitoring, Notifications, Multi-tenant)
  - Added navigation links for Tags, Monitoring, and Notifications features
  - Created 3 reusable skill files for common issues
  - 14 PRs merged and deployed to https://cloud-manager.jbcloud.app

- [JB Cloud App Tracker](/jb-cloud-app-tracker/) - UI enhancements and visual design improvements
  - 1Password CLI integration for secure environment variable management
  - `.env.local.tpl` template with secret references
  - `npm run env:inject` script for one-command setup
  - Animated wave pattern background with dotted grid overlay
  - Fixed CSS loading issues in Next.js 16 with styled-jsx
  - Wave/rain gradient pattern with glowing orange dots
  - Animated blob backgrounds with glassmorphism effects (v1 and v2)
  - Improved developer experience with secrets never in git
  - Live at https://apps.jbcloud.app

- [JB Cloud App Tracker](/jb-cloud-app-tracker/) - Added maintenance command scheduling feature
  - 6 pre-seeded maintenance command types (Security Review, Code Review, etc.)
  - Visual checklist with overdue indicators
  - Full maintenance history tracking
  - Color-coded status badges
  - Database schema updates and server actions
  - Successfully deployed to production

### January 28, 2026

**New Projects**
- [Artifact Manager (macOS)](/artifact-manager-mac/) - Native macOS app for tracking Claude.ai artifacts
  - Built with SwiftUI and SwiftData
  - Placeholder name prevention and cleanup utility
  - Rich metadata tracking (language, framework, Claude model)
  - Collections for organization
  - Companion to artifact-manager.jbmd-creations.workers.dev

- [1Code](/1code/) - Local-first Electron desktop app for AI-powered code assistance
  - Local-first with SQLite storage
  - Project-based chat sessions linked to folders
  - Plan and Agent modes with real-time tool execution
  - Built with Electron, React, tRPC, and Claude Code SDK

- [JB Cloud App Tracker](/jb-cloud-app-tracker/) - Track cloud applications across multiple providers
  - Live at apps.jbcloud.app
  - Vercel and Cloudflare auto-sync integrations
  - Next.js 15 + Supabase
  - Dashboard with deployment tracking

- [JB Cloud Docs](/jb-cloud-docs/) - Meta-documentation for this documentation site
  - Architecture and contribution guide
  - /jbdocs command integration
  - API endpoints for chat assistant

**New Documentation & Features**
- [Terminal Environment Setup](/terminal-setup/) - Complete terminal configuration guide
  - Image support for iTerm2 and Warp
  - Shell environment configuration
  - Claude Code integration

- Documentation Site Enhancements
  - Sidebar validation to prevent orphaned pages
  - Sidebar expand/collapse with state persistence
  - Changelog badge showing doc count
  - UI/UX components (DocVersionInfo, ChangelogList)
  - Mermaid diagram support across all docs
  - Automated popularity tracking and badge expiration

**Updated Documentation**
- [Claude Code](/claude-code/) - Multiple new features documented
  - /cli command for checking available tools and MCP servers
  - /remind --on auto-remind feature with turn-based context reminders
  - /jbdocs Phase 1 flags and integration
  - Security suite documentation
  - CLI-first rule additions

- [Claude New Project](/claude-new-project/) - Mobile app companion
  - 1Code mobile companion integration
  - Enhanced project initialization workflow

- [Env Var Assistant](/env-var-assistant/) - Major feature additions
  - Auto-integration section in MCP documentation
  - Safari extension support
  - deploy_env_vars and list_platforms MCP tools
  - Syncs secrets between 1Password and deployment platforms
  - For apps.jbcloud.app

- [URLsToGo](/linkshort/) - Security and progress updates
  - Critical security improvements documented
  - Session progress tracking
  - Architecture documentation

- [WP Manager](/wp-manager/) - Organization and security
  - Phase 5 organization features
  - Multi-site management capabilities
  - Team collaboration workflows
  - Activity logging system
  - Security documentation
  - Commands count updates

### January 24, 2026

**New Documentation**
- [WP Manager](/wp-manager/) - WordPress site management for xCloud
  - For cloud-manager.jbcloud.app
- [Claude new-project](/claude-new-project/) - Project initialization workflow
- [Bricks Builder Agent](/bricks-builder-agent/) - AI-assisted page building

**Initial Release**
- [xCloud](/xcloud/) - Cloud hosting platform documentation
- [Cloudflare](/cloudflare/) - DNS and edge deployment guides
- [Supabase](/supabase/) - Backend-as-a-service patterns
- [Vercel](/vercel/) - Frontend deployment workflows
- [BCMS](/bcms/) - Headless CMS integration

---

## How This Page Works

This changelog tracks documentation for JB Cloud projects. Each entry includes:

- **Project link** - Direct link to the documentation
- **Version** - Doc version if applicable (e.g., v1.3)
- **Description** - What was added or changed
- **Target app** - Which jbcloud.app the docs apply to

Docs with `addedDate` frontmatter automatically appear here when added.
