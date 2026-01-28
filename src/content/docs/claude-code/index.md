---
title: Claude Code Setup
description: Custom Claude Code configuration with agents, commands, and workflows
sidebar:
  order: 0
---

This documents the custom Claude Code setup used across JB Cloud projects, including slash commands, agents, and automated workflows.

## Quick Start

All configuration lives in `~/.claude/`:

```
~/.claude/
├── CLAUDE.md           # Global instructions
├── commands/           # Slash commands
├── agents/             # Specialized agents
├── skills/             # Skills and learned patterns
│   └── learned/        # Auto-extracted patterns
├── rules/              # Modular rules
└── contexts/           # Saved session contexts
```

## Available Resources

| Resource | Description |
|----------|-------------|
| [Commands](/claude-code/commands/) | All slash commands reference |
| [Agents](/claude-code/agents/) | Specialized agent definitions |
| [Workflows](/claude-code/workflows/) | Common development workflows |

## Key Commands

### Project Lifecycle

```bash
/new-project              # Initialize new project
/plan                     # Create implementation plan
/tdd                      # Test-driven development
/end                      # End session cleanly
```

### Documentation

```bash
/jbdocs                   # Sync to docs.jbcloud.app
/jbdocs commands          # Update commands reference
```

### Session Management

```bash
/context-save             # Save session state
/context-restore          # Resume session
/remind                   # Quick context reminder
```

### Quality

```bash
/code-review              # Review code quality
/deploy-check             # Pre-deployment checklist
/deps-audit               # Audit dependencies
```

## Philosophy

1. **Agent-First**: Delegate complex tasks to specialized agents
2. **Parallel Execution**: Use Task tool with multiple agents when possible
3. **Plan Before Execute**: Use Plan Mode for complex operations
4. **Test-Driven**: Write tests before implementation
5. **Security-First**: Never compromise on security
6. **Document Everything**: Sync to docs.jbcloud.app automatically

## Configuration

Global preferences in `~/.claude/CLAUDE.md`:
- No emojis in code or docs
- Prefer immutability
- Many small files over few large
- Conventional commits
- 80% minimum test coverage

## Repository

GitHub: [Aventerica89/jb-cloud-docs](https://github.com/Aventerica89/jb-cloud-docs)
