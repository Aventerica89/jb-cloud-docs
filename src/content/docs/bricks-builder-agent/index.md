---
title: Bricks Builder Agent
description: AI agent that converts screenshots to valid Bricks Builder JSON with ACSS variables.
---

An AI agent built on Claude Code that converts web design screenshots into valid, importable Bricks Builder JSON with AutomaticCSS (ACSS) variables and BEM-named global classes.

## Overview

The Bricks Builder Agent automates the tedious process of manually creating Bricks Builder elements. Given a screenshot of a web section, it:

1. Analyzes the layout structure and components
2. Generates valid Bricks Builder JSON
3. Applies ACSS variables for colors, spacing, typography
4. Creates BEM-named global classes following Frames methodology
5. Validates the output for import readiness

## Repository

[github.com/Aventerica89/bricks-builder-agent](https://github.com/Aventerica89/bricks-builder-agent)

## Key Features

### Knowledge Base
Pre-built documentation covering Bricks Builder JSON structure, ACSS variables, responsive patterns, and element-specific guides.

### Pattern Library
Reusable JSON patterns for common sections: heroes, headers, card grids, galleries, footers.

### Validation Script
Checks JSON schema compliance, ID uniqueness, parent-child relationships, and global class cross-references.

### Learning System
The agent learns from user corrections using the /learn command, extracting patterns and saving them as reusable skills.

## Quick Links

- [Workflow Guide](/bricks-builder-agent/workflow/) - Step-by-step usage
- [Patterns Learned](/bricks-builder-agent/patterns-learned/) - Extracted patterns from corrections
- [Smith Campaign](/bricks-builder-agent/campaigns/smith/) - Active campaign documentation
