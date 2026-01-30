---
title: Contributing
description: How to add and maintain documentation
sidebar:
  order: 2
---

Guidelines for adding and maintaining documentation on docs.jbcloud.app.

## Documentation Standards

### Frontmatter Requirements

Every documentation page needs:

```yaml
---
title: Page Title              # Required
description: Brief summary     # Required
sidebar:
  order: 1                     # Optional, controls nav order
source_project: /path/to/src   # Required for index.md
---
```

### File Structure

Each project should have:

```
{project-slug}/
├── index.md          # Overview (required)
├── installation.md   # Setup guide
├── usage.md          # How to use
├── architecture.md   # Technical design
└── {feature}.md      # Feature-specific docs
```

### Markdown Guidelines

1. **Use descriptive headings** - H2 for main sections, H3 for subsections
2. **Add code language tags** - Always specify language: ` ```javascript `
3. **Include examples** - Show real usage, not just theory
4. **Link internally** - Use relative links: `[Installation](./installation)`

## Using /jbdocs

The `/jbdocs` command automates documentation sync:

### Initial Setup

```bash
cd ~/my-project
/jbdocs init
```

Creates:
- Project directory in jb-cloud-docs
- index.md from CLAUDE.md
- Sidebar entry in astro.config.mjs

### Updates

```bash
/jbdocs update      # Full update
/jbdocs progress    # Just progress notes
/jbdocs --dry-run   # Preview changes
```

### Validation

The command validates:
- Required frontmatter fields
- Code block language tags
- Internal link validity
- No placeholder text remaining

Fix issues automatically:

```bash
/jbdocs --fix
```

## Style Guide

### Tone

- **Direct** - Get to the point
- **Technical** - Assume developer audience
- **Practical** - Focus on how-to, not theory

### Formatting

| Element | Format |
|---------|--------|
| Commands | ` `backticks` ` |
| File paths | ` `backticks` ` |
| UI elements | **bold** |
| Emphasis | *italics* |

### Components

Use Starlight components:

```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="npm">npm install package</TabItem>
  <TabItem label="pnpm">pnpm add package</TabItem>
</Tabs>
```

Callouts:

```markdown
:::note
Helpful information
:::

:::caution
Important warning
:::

:::danger
Critical alert
:::
```

## Local Development

```bash
cd /Users/jb/jb-cloud-docs
npm install
npm run dev
```

Open http://localhost:4321

### Building

```bash
npm run build
npm run preview
```

## Troubleshooting

### Page Not Appearing

1. Check sidebar config in `astro.config.mjs`
2. Verify file is in correct directory
3. Check frontmatter syntax (YAML errors break pages)

### Broken Links

Use relative paths:
- Same directory: `[Link](./other-page)`
- Parent directory: `[Link](../other-section/page)`

### Build Errors

```bash
# Check for syntax errors
npm run build 2>&1 | head -50
```

Common issues:
- Missing frontmatter fields
- Invalid MDX syntax
- Broken imports

## Using with Claude Code

Claude Code can help you create, maintain, and validate documentation efficiently.

### Creating Documentation

**Generate documentation from code:**
```
"Create documentation for this project by analyzing:
- README.md
- CLAUDE.md
- Package.json
- Source code structure"
```

Claude Code will create:
- index.md overview
- Feature-specific pages
- API documentation
- Setup guides

**Initialize new project docs:**
```
"Run /jbdocs init for my-new-project and create:
- index.md from CLAUDE.md
- architecture.md from code analysis
- Sidebar entry in config
- All required frontmatter"
```

### Maintaining Documentation

**Update documentation:**
```
"Update the progress.md file with:
- Today's completed features
- Bugs fixed
- Deployment status
- Next steps"
```

**Sync documentation:**
```
"Run /jbdocs update to sync:
- Latest README changes
- New features added
- Updated screenshots
- Revised architecture"
```

### Validation and Quality

**Validate documentation:**
```
"Validate all markdown files in /my-project directory for:
- Required frontmatter
- Code block language tags
- Internal link validity
- No placeholder text"
```

**Auto-fix issues:**
```bash
# Run validation with auto-fix
/jbdocs --fix
```

Claude Code will:
- Add missing frontmatter
- Add language tags to code blocks
- Fix broken internal links
- Remove placeholders

### Real-World Examples

**Example 1: API documentation**
```
"Generate API documentation for these Server Actions:
- Function signatures
- Parameter descriptions
- Return types
- Usage examples
- Error handling"
```

**Example 2: Tutorial creation**
```
"Create a step-by-step tutorial for:
- Setting up the development environment
- Creating your first feature
- Running tests
- Deploying to production

Include code examples and screenshots"
```

**Example 3: Migration guide**
```
"Create a migration guide from v1 to v2:
- Breaking changes
- Updated API methods
- New features
- Step-by-step upgrade process"
```

### Style Guide Enforcement

**Check style compliance:**
```
"Review these docs for style guide compliance:
- Tone (direct, technical, practical)
- Formatting (backticks, bold, italics)
- Heading structure
- Code example quality"
```

**Auto-format documentation:**
```
"Reformat this documentation to match the style guide:
- Standardize headings
- Add proper code blocks
- Format tables consistently
- Use correct components"
```

### Component Usage

**Add interactive components:**
```
"Add Starlight components to this page:
- Tabs for npm/pnpm/yarn commands
- Callout for important notes
- Code groups for multi-file examples
- Aside for related resources"
```

**Example output:**
```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="npm">npm install</TabItem>
  <TabItem label="pnpm">pnpm add</TabItem>
</Tabs>

:::note
This is an important note
:::
```

### Documentation Workflow

**Complete workflow automation:**
```
"Automate documentation workflow:
1. Detect code changes via git
2. Update relevant docs
3. Validate all pages
4. Auto-fix issues
5. Create PR with changes"
```

**Scheduled updates:**
```
"Set up weekly documentation reviews:
- Check for outdated content
- Verify code examples still work
- Update metrics and progress
- Fix broken links"
```
