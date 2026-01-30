---
title: Patterns Learned
description: Patterns extracted from user corrections during Bricks Builder Agent sessions.
---

## Overview

These patterns were extracted using the `/learn` command after the user provided corrections to agent-generated JSON. Each pattern represents a best practice learned from real-world feedback.

## Pattern 1: Every Element Needs a Class

**Extracted:** 2026-01-25
**Source:** User correction on gallery section

No element should be without a global class. This follows Frames methodology where every element in the structure has a corresponding BEM-named class for styling control.

### Wrong Approach
```json
{
  "id": "sec001",
  "name": "section",
  "settings": {}
}
```

### Correct Approach
```json
{
  "id": "sec001", 
  "name": "section",
  "settings": {
    "_cssGlobalClasses": ["jb-gallery"]
  }
}
```

---

## Pattern 2: Images as Elements, Not CSS Backgrounds

**Extracted:** 2026-01-25
**Source:** Frames "Golf" feature card pattern

For cards with background images, use actual `<image>` elements with absolute positioning instead of CSS `_background` property.

### Structure
```
Block (position: relative)
├── Image (position: absolute, inset: 0, z-index: -1)
└── Content Overlay (position: absolute, inset: 0)
    ├── Heading
    └── Text
```

### Benefits
- Better accessibility (alt text)
- Better SEO (crawlable images)
- More control over responsive behavior
- Proper HTML semantics

---

## Pattern 3: Nested Grids for Asymmetric Layouts

**Extracted:** 2026-01-25
**Source:** User-corrected "Heard in Every County" gallery section

When creating photo grids where columns need different row ratios, use nested column wrappers with separate CSS Grid definitions.

### Use Case
4-photo grid with asymmetric sizing:
| Left Column | Right Column |
|-------------|--------------|
| Large (1fr) | Small (0.4fr)|
| Small (0.4fr)| Large (1fr) |

### Solution
Create two wrapper divs with inverted `grid-template-rows`:

**Left Column:**
```json
{
  "settings": {
    "_cssCustom": ".jb-grid__col-left { display: grid; grid-template-rows: 1fr 0.4fr; }"
  }
}
```

**Right Column:**
```json
{
  "settings": {
    "_cssCustom": ".jb-grid__col-right { display: grid; grid-template-rows: 0.4fr 1fr; }"
  }
}
```

---

## Pattern 4: Split Background with Absolute Container

**Extracted:** 2026-01-25
**Source:** User-corrected gallery section

For sections with split backgrounds (e.g., 60% dark / 40% light), use absolute positioned hidden divs for backgrounds and an absolute container overlay.

### Structure
```
Section (position: relative, min-height, row direction, stretch)
├── Background Left (absolute, width: 60%, hidden)
├── Background Right (absolute, width: 40%, hidden)
└── Container (absolute, inset: 0, z-index: 2)
    └── Content...
```

### Key Settings

**Section:**
```json
{
  "_position": "relative",
  "_heightMin": "60rem",
  "_direction": "row",
  "_alignItems": "stretch"
}
```

**Background divs:**
```json
{
  "_hideElementBuilder": true,
  "_hideElementFrontend": true
}
```

Note: The hidden flags prevent background divs from showing in builder structure panel while still rendering on frontend.

---

## Pattern 5: CSS Custom Variables in Global Classes

**Extracted:** 2026-01-25
**Source:** User-corrected gallery section

Define component-specific CSS custom variables in the global class `_cssCustom` property, then reference them in element settings.

### Example
```json
{
  "name": "block",
  "settings": {
    "_cssGlobalClasses": ["jb-photo-grid"],
    "_cssCustom": ".jb-photo-grid { --max-height: 800px; --photo-gap: 1rem; }",
    "_gridGap": "var(--photo-gap)"
  }
}
```

This keeps component variables scoped and makes them easy to adjust in one place.

## Using with Claude Code

Claude Code can help you apply, extend, and validate Bricks Builder patterns.

### Applying Patterns

**Use existing patterns:**
```
"Build a feature card using Pattern 2 (Images as Elements, Not CSS Backgrounds) with:
- Background image (golf course)
- Overlay content with title and description
- Absolute positioning
- Z-index layering"
```

Claude Code will generate proper JSON following the pattern.

**Combine multiple patterns:**
```
"Create a section using:
- Pattern 1: Global classes on every element
- Pattern 2: Image elements instead of CSS backgrounds
- Pattern 4: Split background technique
- Pattern 5: CSS custom variables"
```

### Validating Compliance

**Check pattern adherence:**
```
"Review this section JSON and verify it follows:
- Pattern 1: Every element has a global class
- Pattern 5: Uses CSS custom variables for repeated values"
```

**Automated validation:**
```bash
# Run pattern validation
node ~/.claude/projects/bricks-builder/scripts/validate-patterns.js section.json

# Check for common violations:
# - Elements without global classes
# - CSS background instead of image elements
# - Hardcoded colors or spacing
```

### Learning New Patterns

**Extract patterns from corrections:**
```
"I fixed this section. Analyze the changes and extract a reusable pattern"
```

**Document custom patterns:**
```
"Create a new pattern for sticky sidebars with:
- Position: sticky
- Top offset using ACSS variable
- Z-index management
- BEM class naming"
```

### Pattern Library

**List available patterns:**
```
"Show me all learned patterns for:
- Photo galleries
- Card grids
- Hero sections
- Navigation menus"
```

**Pattern search:**
```
"Find patterns that use:
- Absolute positioning
- CSS Grid
- Split backgrounds"
```

### Real-World Examples

**Example 1: Apply card pattern**
```
"Create a pricing table using the nested grid pattern:
- 3 columns
- Asymmetric sizing (featured plan larger)
- Global classes on all elements
- ACSS color variables"
```

**Example 2: Validate existing section**
```
"Check if this hero section follows all 5 patterns and list any violations"
```

**Example 3: Refactor to patterns**
```
"Refactor this section to comply with our patterns:
- Add global classes where missing
- Replace CSS backgrounds with image elements
- Extract repeated values to CSS variables"
```

### Pattern Evolution

**Update patterns:**
```
"We've learned a better way to handle split backgrounds. Update Pattern 4 with the new approach"
```

**Deprecate patterns:**
```
"Mark Pattern X as deprecated because we found a better solution. Suggest migration path"
```
