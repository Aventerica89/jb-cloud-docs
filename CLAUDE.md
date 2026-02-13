# Claude Code Session Notes

## Project Overview
JB Cloud Docs - Astro Starlight documentation site deployed on Cloudflare Pages.

## Recent Sessions

### Session Summary (2026-02-02 to 2026-02-08)

#### Major Documentation Additions

**PR #16 & #17: Comprehensive Vercel, Auth, and Integration Guides**
- Added 28 new documentation pages across multiple sections
- Created 2 new React components (CommandBrowser, ELI5)
- Total additions: ~6,000 lines of documentation

**New Sections Created:**
1. **Vercel Documentation** (10 pages)
   - CLI guides (deploy, env, domains, utilities)
   - AI SDK docs (core, UI hooks, migration guide)
   - AI Gateway routing for Claude Code
   - Platform guides (MCP, production checklist, build errors, monorepos)

2. **Authentication Guides** (5 pages)
   - BetterAuth setup and integration
   - Clerk setup with Vercel Marketplace integration
   - Auth provider comparison (decision guide)

3. **Integrations Section** (4 pages)
   - Sanity CMS (Astro integration, MCP server)
   - Integration overview

4. **Decision Guides** (3 pages)
   - Hosting comparison
   - Auth provider selection
   - Database options (Supabase vs Neon vs Turso)

5. **Skills & Commands** (2 pages)
   - Claude Code workflows overview
   - Interactive command reference with React filter component

**PR #18: Documentation Fixes**
- Fixed environment variable setup (NEXT_PUBLIC_APP_URL, BETTER_AUTH_URL)
- Corrected misleading shell history claim
- Added missing imports in AI SDK migration example
- Removed non-existent --preview flag from deployment docs
- Clarified Claude Code Max gateway auth requirements

#### VaporForge Documentation

**OAuth-to-API Architecture Manifesto** (commit 3c7c18f)
- Complete VaporForge project overview and tech stack
- OAuth-to-API auth flow documentation
- Setup guides (manual and Claude Code-assisted)
- OAuth vs API key comparison
- Cost model and security analysis

**v0.4.8 Critical Stability Fixes** (commit 23ac5e8)
- Chunked upload writes fix (128KB chunks)
- Sandbox health check improvements
- Pre-flight health checks for execStream

#### Claude Codex Updates (commit b3a1531)
- Added `/save-to-notion` command to session management
- Added strategic-compact skill and notion-autosave rule
- Documented Notion auto-save pipeline
- Added MCP integration notes (Notion, Cloudflare, Context7)
- Updated roadmap with completed items
- Added principle #7 "Save Before Compact"

#### Supabase Documentation (commit 63a2430)
- Database options comparison guide
- Cost breakdowns for multi-project scenarios
- Migration paths to Supabase
- Self-hosted multi-database setup guide
- Decision tree for choosing the right option

#### UI Improvements
- Fixed table full-width styling (commit 9b88784)
- Added rehype-external-links for external link behavior
- Created CommandBrowser component with CSS module (~280 lines extracted)
- Created ELI5 component for plain-English explanations

#### Data Files Added
- `src/data/commands.json` - Command reference data for interactive filtering

#### Build System Updates
- Added validation for new documentation sections (auth, vercel, integrations)
- Updated sidebar configuration with nested sections
- Automated popularity data updates (via GitHub Actions)

#### Key Statistics (Since 2026-01-30)
- **Total commits**: 45
- **PRs merged**: 3 (#16, #17, #18)
- **New documentation pages**: 35+
- **New React components**: 2
- **Lines added**: ~6,500+
- **Sections added**: 6 major sections

### Session Summary (2026-01-30)

### Completed Tasks

1. **Site Refinements**
   - Fixed broken/placeholder links (progress.md, showcase.mdx, linkshort/index.md)
   - Added CSS custom properties for brand colors (`--jb-purple`, `--jb-violet-rgb`, etc.)
   - Consolidated 30+ hardcoded color values to use CSS variables

2. **Product Renaming**
   - Renamed "LinkShort URL Shortener" → "LinksToGo" → "URLsToGo"
   - Updated live domain to `urlstogo.cloud`
   - Files updated: astro.config.mjs, changelog.md, linkshort/*.md

3. **Documentation Updates**
   - Added "Using with Claude Code" section to cloudflare/index.md
   - Added `claude-codex` to sidebar validation script

4. **PRs Merged**
   - PR #9: Site refinements, CSS variables
   - PR #10: LinkShort → LinksToGo (incorrect)
   - PR #11: LinksToGo → URLsToGo (corrected)

### Technical Details

- **Branch pattern**: `claude/add-claude-ssh-setup-wyrn7`
- **Build command**: `npm run build` (includes sidebar validation)
- **Validation script**: `scripts/validate-sidebar.mjs` - checks all docs are in sidebar

### CSS Variables Added
```css
--jb-purple: #635BFF
--jb-purple-light: #7A73FF
--jb-purple-dark: #5521B5
--jb-violet: #8B5CF6
--jb-cyan: #00D4FF
--jb-pink: #FF80B5
--jb-purple-rgb: 99, 91, 255
--jb-violet-rgb: 139, 92, 246
--jb-cyan-rgb: 0, 212, 255
--jb-pink-rgb: 255, 128, 181
```

### Security Audit (2026-01-30)
- ✅ No hardcoded secrets
- ✅ No .env files exposed
- ✅ innerHTML uses only static strings (safe)
- ⚠️ 4 dependency vulnerabilities in build toolchain (undici in wrangler)
  - Does not affect deployed static site
  - Fix: `npm audit fix --force` (breaking change to @astrojs/cloudflare)

### Key Files
- `astro.config.mjs` - Sidebar configuration, Starlight settings
- `scripts/validate-sidebar.mjs` - Build-time validation for orphaned pages
- `src/styles/custom.css` - All custom CSS (~1500 lines)
- `src/scripts/enhancements.js` - UI enhancements (progress bar, keyboard nav, feedback)

---

## Project Reference

### Documentation Structure

**Main Sections** (as of 2026-02-13):
1. **Products & Projects** (17 project subsections)
   - VaporForge, Claude Codex, URLsToGo, Renvio Companion App, etc.
2. **Vercel Platform** (10 pages)
   - CLI, AI SDK, AI Gateway, production guides
3. **Authentication** (5 pages)
   - BetterAuth, Clerk, comparison guides
4. **Integrations** (4 pages)
   - Sanity CMS, MCP servers
5. **Decisions** (3 pages)
   - Hosting, auth, database comparisons
6. **Resources** (UI libraries, terminal setup, etc.)
7. **Skills & Commands**
   - Claude Code workflows and command reference

### Key Components

**React Components**:
- `CommandBrowser.tsx` - Interactive command filter (272 lines)
- `CommandBrowser.module.css` - Component styles (281 lines)
- `ELI5.astro` - Plain-English explanation callouts (58 lines)

**Data Files**:
- `src/data/commands.json` - Command reference data
- `src/data/popularity.json` - Auto-updated project popularity metrics

### Build & Validation

**Build Command**: `npm run build`
- Runs Astro build
- Executes `scripts/validate-sidebar.mjs`
- Validates all docs are in sidebar
- Fails build if orphaned pages detected

**Validation Coverage**:
- All product/project pages
- All guide pages (Vercel, auth, integrations)
- All decision guides
- All resource pages

### CSS Architecture

**Custom Variables** (src/styles/custom.css):
```css
/* Brand Colors */
--jb-purple: #635BFF
--jb-purple-light: #7A73FF
--jb-purple-dark: #5521B5
--jb-violet: #8B5CF6
--jb-cyan: #00D4FF
--jb-pink: #FF80B5

/* RGB variants for alpha transparency */
--jb-purple-rgb: 99, 91, 255
--jb-violet-rgb: 139, 92, 246
--jb-cyan-rgb: 0, 212, 255
--jb-pink-rgb: 255, 128, 181
```

**Usage Pattern**:
- All color values use CSS variables
- No hardcoded hex colors in components
- RGB variants for `rgba()` with opacity

### Git Workflow

**Branch Naming**: `claude/description-xxxxx` (random suffix)

**Commit Convention**:
```
type(scope): description

Co-Authored-By: Claude Opus 4.5/4.6 <noreply@anthropic.com>
```

**Types**: `docs`, `feat`, `fix`, `refactor`, `chore`, `test`

**Common Scopes**:
- Product names: `vaporforge`, `claude-codex`, `linkshort`
- Sections: `auth`, `vercel`, `supabase`
- Site-wide: `ui`, `build`

### Deployment

**Platform**: Cloudflare Pages
**Live URL**: https://jbclouddocs.com
**Build Trigger**: Push to `main` branch
**Build Time**: ~2-3 minutes
**Auto-deploy**: Yes

### MCP Integration

**Configured Servers**:
- DeepWiki (GitHub repo documentation)
- Context7 (library documentation)
- Gemini (code analysis)
- Clerk (auth snippets)
- Exa (web search)
- Notion (via external integration)

### Security Checklist

**Pre-commit Checks**:
- ✅ No hardcoded API keys
- ✅ No .env files in commits
- ✅ No sensitive data in examples
- ✅ innerHTML only uses static strings
- ✅ All user examples use placeholder values

**Known Issues**:
- 4 dev dependency vulnerabilities (undici in wrangler)
- Does not affect production build
- Non-blocking for static site

### Performance Metrics

**Current Stats**:
- Total documentation pages: 100+
- Custom CSS: ~1,500 lines
- React components: 2 interactive components
- Build validation: All pages checked
- External link handling: Automatic new tab behavior
