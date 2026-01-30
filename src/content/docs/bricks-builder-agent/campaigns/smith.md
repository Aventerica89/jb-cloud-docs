---
title: Smith Campaign
description: Bernadette Smith political campaign website - ACSS settings and sections.
---

## Campaign Overview

**Client:** Bernadette Smith
**Type:** Political campaign website (Michigan)
**Status:** In Progress

## ACSS Configuration

The Smith campaign uses a custom ACSS configuration with specific features enabled/disabled.

### Enabled Features
- Buttons: Primary, Secondary, Text styles
- Grid system with custom breakpoints
- Typography scale
- Color palette with campaign colors
- Spacing utilities

### Key Color Variables
- `--primary` - Campaign primary color
- `--secondary` - Campaign secondary color  
- `--base` - Dark text/background
- `--white` - Light backgrounds

Full settings exported to: `~/.claude/projects/bricks-builder/campaigns/smith/acss-settings.json`

## Sections Built

### Gallery: Heard in Every County

A split-background gallery section featuring:
- 60% dark blue / 40% white split background
- 4-photo asymmetric grid (large/small alternating pattern)
- Content block with eyebrow, title, description, meta info

**Versions:**
- v1: Initial attempt (CSS backgrounds - incorrect)
- v2: Updated with image elements
- v3: All elements with global classes
- Final: User-corrected version with nested grid structure

**Key Learnings from this section:**
1. Use nested column wrappers for asymmetric grids
2. Hide background divs with `_hideElementBuilder`/`_hideElementFrontend`
3. Container as absolute overlay with inset 0
4. Define CSS custom variables in global class `_cssCustom`

## Files

```
campaigns/smith/
├── acss-settings.json          # Full ACSS export (318KB)
├── acss-active-settings.json   # Active settings only
├── ACTIVE-SETTINGS.md          # Human-readable reference
├── README.md                   # Campaign overview
└── sections/
    ├── gallery-heard-in-every-county.json     # v1
    ├── gallery-heard-in-every-county-v2.json  # v2
    └── gallery-heard-in-every-county-v3.json  # v3
```

## Using with Claude Code

Claude Code can help you build and customize sections for the Smith campaign using Bricks Builder patterns.

### Analyzing ACSS Settings

**Understand active variables:**
```
"What ACSS color variables are active in the Smith campaign?"
```

Claude Code will scan `acss-active-settings.json` and list available colors with their values.

**Find spacing tokens:**
```
"Show me all active spacing variables I can use for gaps and padding"
```

### Building New Sections

**Create from screenshot:**
```
"Convert this screenshot to Bricks JSON for the Smith campaign using:
- Campaign colors (--primary, --secondary)
- ACSS spacing variables
- Existing section patterns"
```

**Modify existing sections:**
```
"Take gallery-heard-in-every-county-v3.json and:
- Change from 4 photos to 6 photos
- Update grid to 3 columns
- Keep the split background pattern"
```

### Validating Sections

**Check JSON validity:**
```bash
# Validate JSON structure
node ~/.claude/projects/bricks-builder/scripts/validate-bricks-json.js \
  campaigns/smith/sections/gallery-heard-in-every-county-v3.json
```

**Check ACSS compliance:**
```
"Review this section JSON and ensure:
- All colors use ACSS variables
- All spacing uses ACSS tokens
- Every element has a global class
- No hardcoded values"
```

### Real-World Examples

**Example 1: Hero section**
```
"Create a hero section for the Smith campaign with:
- Full-screen background image
- Campaign logo (top center)
- Headline and subheadline
- Two CTA buttons (primary and secondary colors)
- Mobile responsive layout"
```

**Example 2: Testimonials grid**
```
"Build a testimonials section with:
- 3 columns on desktop
- Campaign colors for accents
- Quote marks using --primary
- Author photos with rounded borders
- Responsive stack on mobile"
```

**Example 3: Donation section**
```
"Create a donation call-to-action with:
- Split background (60% campaign primary / 40% white)
- Donation amounts as clickable cards
- Monthly/one-time toggle
- Campaign-styled submit button"
```

### Learning from Corrections

**Extract patterns:**
```
"I corrected the gallery section. Extract the pattern for split-background sections with asymmetric grids"
```

Claude Code will update learned patterns based on user corrections.
