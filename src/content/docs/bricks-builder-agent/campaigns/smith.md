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
