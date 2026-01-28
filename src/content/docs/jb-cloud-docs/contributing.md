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
