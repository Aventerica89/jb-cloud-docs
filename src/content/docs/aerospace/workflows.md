---
title: Common Workflows
description: Practical workflows and use cases for AeroSpace
sidebar:
  order: 2
---

Practical workflows and real-world examples for using AeroSpace effectively. These workflows assume you're comfortable with basic [keybindings](/aerospace/keybindings).

## Development Workflow

The classic developer setup: code editor, terminal, and browser for documentation.

### Setup

**Goal:** Terminal and editor on workspace 1, browser on workspace 2.

**Steps:**

1. Launch Terminal (**⌘Space** → "Terminal" → Enter)
   ```
   Workspace 1:
   ┌──────────────────────────────┐
   │         Terminal             │
   │                              │
   └──────────────────────────────┘
   ```

2. Launch VS Code (**⌘Space** → "VS Code" → Enter)
   ```
   Workspace 1:
   ┌──────────────┬───────────────┐
   │   Terminal   │    VS Code    │
   │              │               │
   └──────────────┴───────────────┘
   ```

3. Launch Browser (**⌘Space** → "Chrome" → Enter)
   ```
   Workspace 1:
   ┌──────────────┬───────────────┐
   │   Terminal   │   VS Code     │
   │              ├───────────────┤
   │              │   Browser     │
   └──────────────┴───────────────┘
   ```

4. Focus browser (**⌥l** → **⌥j**) and move to workspace 2 (**⌥⇧2**)
   ```
   Workspace 1:                    Workspace 2:
   ┌──────────────┬──────────────┐ ┌─────────────────────┐
   │   Terminal   │   VS Code    │ │      Browser        │
   │              │              │ │                     │
   └──────────────┴──────────────┘ └─────────────────────┘
   ```

### Usage

- **⌥1** - Work mode (terminal + editor)
- **⌥2** - Research mode (documentation)
- **⌥l** (on workspace 1) - Switch focus between terminal and editor
- **⌥/** - Toggle vertical/horizontal split if you prefer terminal on bottom

### Variant: Three-Monitor Setup

If you have three monitors:

- **Monitor 1**: Workspace 1 (Terminal)
- **Monitor 2**: Workspace 2 (VS Code)
- **Monitor 3**: Workspace 3 (Browser + documentation)

Each workspace stays on its monitor, no switching needed.

## Full-Stack Development

Frontend, backend, database monitor, and browser testing.

### Setup

**Workspaces:**
- **Workspace 1**: Frontend (VS Code + frontend terminal)
- **Workspace 2**: Backend (VS Code + backend terminal)
- **Workspace 3**: Browser for testing
- **Workspace 4**: Database monitor / logs

**Implementation:**

1. **Frontend workspace** (⌥1):
   ```
   ┌──────────────┬───────────────┐
   │  Terminal    │    VS Code    │
   │  (npm run)   │  (frontend)   │
   └──────────────┴───────────────┘
   ```

2. **Backend workspace** (⌥2):
   ```
   ┌──────────────┬───────────────┐
   │  Terminal    │    VS Code    │
   │  (npm run)   │  (backend)    │
   └──────────────┴───────────────┘
   ```

3. **Testing workspace** (⌥3):
   ```
   ┌─────────────────────────────┐
   │         Browser             │
   │    (localhost:3000)         │
   └─────────────────────────────┘
   ```

4. **Monitoring workspace** (⌥4):
   ```
   ┌──────────────┬───────────────┐
   │   TablePlus  │   Terminal    │
   │  (database)  │    (logs)     │
   └──────────────┴───────────────┘
   ```

### Usage

- **⌥1** - Edit frontend code
- **⌥2** - Edit backend code
- **⌥3** - Test in browser
- **⌥4** - Check database or view logs
- Jump between any two with one keystroke

## Writing and Research

Long-form writing with research materials.

### Setup

**Workspaces:**
- **Workspace W**: Writing app (Obsidian, Notion, or editor)
- **Workspace R**: Research (browser with multiple tabs)
- **Workspace N**: Notes and outlines

**Layout:**

1. **Workspace W** (⌥w):
   ```
   ┌─────────────────────────────┐
   │       Obsidian              │
   │   (full screen writing)     │
   └─────────────────────────────┘
   ```

2. **Workspace R** (⌥r):
   ```
   ┌──────────────┬───────────────┐
   │   Browser 1  │   Browser 2   │
   │   (research) │   (reference) │
   └──────────────┴───────────────┘
   ```

3. **Workspace N** (⌥n):
   ```
   ┌─────────────────────────────┐
   │      Notes / Outline        │
   │       (plaintext)           │
   └─────────────────────────────┘
   ```

### Usage

- **⌥w** - Focus on writing
- **⌥r** - Look up references
- **⌥n** - Check outline or notes
- Use **⌥/** on workspace R to toggle horizontal/vertical browser split

## Communication Hub

Email, Slack, calendar, and to-do list in one workspace.

### Setup

**Workspace C** (⌥c):
```
┌──────────────┬───────────────┐
│    Email     │     Slack     │
├──────────────┼───────────────┤
│   Calendar   │   To-Do App   │
└──────────────┴───────────────┘
```

**Steps:**

1. Open Email, press **⌥c** to switch to workspace C
2. Open Slack, auto-splits with Email
3. Open Calendar
4. Focus Calendar (**⌥j** or **⌥l**), move down (**⌥⇧j**)
5. Open To-Do app, auto-fills bottom-right

### Usage

- **⌥c** - Check all communication channels at once
- **⌥hjkl** - Navigate between apps
- **⌥/** - Toggle layout if you prefer vertical communication stack

## Screen Recording / Streaming

Dedicated workspace for recording with OBS and preview.

### Setup

**Workspace V** (⌥v):
```
┌─────────────────────┬──────────┐
│                     │   OBS    │
│    Main Content     │ Preview  │
│   (Being recorded)  │ Controls │
│                     │          │
└─────────────────────┴──────────┘
```

**Configuration tip:**

In `~/.aerospace.toml`, make OBS always float:

```toml
[[on-window-detected]]
if.app-id = 'com.obsproject.obs-studio'
run = 'layout floating'
```

### Usage

- **⌥v** - Recording workspace
- Main content window takes most of screen
- OBS controls easily accessible on the side
- Other workspaces remain unaffected during recording

## Quick Task Switching

Rapid context switching for multitasking.

### Setup

Assign specific purposes to number workspaces:

| Workspace | Purpose | Apps |
|-----------|---------|------|
| **1** | Code | Terminal + Editor |
| **2** | Browse | Browser |
| **3** | Communicate | Slack + Email |
| **4** | Design | Figma + Preview |
| **5** | Media | Spotify + Videos |

### Usage

The beauty of this setup:

- **⌥1** → Code instantly
- **⌥2** → Look up documentation
- **⌥3** → Check messages
- **⌥4** → Review designs
- **⌥5** → Take a break with music

Each workspace preserves its layout. No mental overhead remembering where things are.

## Meeting Mode

Prepare for meetings with notes, browser, and calendar visible.

### Setup

**Workspace M** (⌥m):
```
┌──────────────┬───────────────┐
│              │               │
│  Notes App   │    Browser    │
│  (meeting    │   (meeting    │
│   notes)     │    link)      │
│              │               │
├──────────────┴───────────────┤
│         Calendar              │
│      (next meeting)           │
└───────────────────────────────┘
```

**Steps:**

1. Open Notes app, switch to workspace M (**⌥m**)
2. Open Browser with meeting link
3. Open Calendar
4. Focus Calendar (**⌥j** or **⌥k**), move down (**⌥⇧j**)
5. Use **⌥/** to adjust layout if needed

### During Meeting

- **⌥m** - Jump to meeting workspace
- Take notes while seeing calendar for next meeting
- Browser visible for screen sharing

## Data Analysis

Multiple terminals, editor, and visualization tool.

### Setup

**Workspace D** (⌥d):
```
┌──────────────┬───────────────┐
│  Terminal 1  │   Terminal 2  │
│  (jupyter)   │   (scripts)   │
├──────────────┼───────────────┤
│   VS Code    │   Browser     │
│   (code)     │ (visualize)   │
└──────────────┴───────────────┘
```

### Usage

- **Top-left**: Jupyter notebook running
- **Top-right**: Terminal for running scripts
- **Bottom-left**: Code editor for editing
- **Bottom-right**: Browser for viewing visualizations
- Navigate with **⌥hjkl** without taking hands off keyboard

## Gaming (Seriously)

Even gaming can benefit from workspaces.

### Setup

- **Workspace G**: Game (full screen)
- **Workspace W**: Walkthrough / wiki browser
- **Workspace V**: Discord / voice chat

### Usage

- **⌥g** - Game
- **⌥w** - Quickly check walkthrough
- **⌥v** - Chat with teammates
- No Alt-Tab lag, instant switches

**Tip:** Make games always float:

```toml
[[on-window-detected]]
if.app-id = 'com.valvesoftware.steam'
run = 'layout floating'
```

## Mobile Workspace Pattern

Create workspace anywhere, destroy when done.

### Philosophy

Instead of permanent workspace assignments, create temporary workspaces for tasks:

**Example: Quick Bug Fix**

1. **⌥x** (unused workspace)
2. Open relevant files/terminals
3. Fix the bug
4. Close all windows (**⌥⇧;** → **Backspace** → keep one, close rest normally)
5. Workspace X is now empty, ready for next task

**No cleanup needed** - workspaces automatically "disappear" when empty.

## Advanced: Join Windows

Sometimes you want windows in the same container.

### Example: Comparing Two Files Side-by-Side

**Before:**
```
┌──────────┬──────────┬──────────┐
│    A     │    B     │    C     │
└──────────┴──────────┴──────────┘
```

**Goal:** Group B and C together, separate from A.

**Steps:**

1. Focus B (**⌥l**)
2. Enter service mode (**⌥⇧;**)
3. Join with right (**⌥⇧l**)

**After:**
```
┌──────────┬─────────────────────┐
│          │    ┌────────────┐   │
│    A     │    │  B    │  C │   │
│          │    └────────────┘   │
└──────────┴─────────────────────┘
```

Now B and C are grouped. You can:
- Focus the group and resize it as one unit
- Toggle the group's layout independently

## Workflow Tips

### Start Simple

Don't try to use all 35 workspaces immediately. Start with:
- **1-3**: Core workspaces
- Expand gradually as needs arise

### Name Your Workspaces Mentally

Assign meaning to workspaces:
- **⌥1** = "Work"
- **⌥2** = "Research"
- **⌥3** = "Communicate"

Consistency builds muscle memory faster than random assignment.

### Use Gaps for Visual Breathing Room

Edit `~/.aerospace.toml`:

```toml
[gaps]
    inner.horizontal = 10
    inner.vertical = 10
    outer.left = 10
    outer.bottom = 10
    outer.top = 10
    outer.right = 10
```

Gaps make windows easier to distinguish at a glance.

### Embrace Minimalism

Having 4 windows open on one workspace is usually better than 8. More windows = more cognitive load.

**Good:**
```
┌──────────────┬───────────────┐
│   Terminal   │    Editor     │
└──────────────┴───────────────┘
```

**Overwhelming:**
```
┌─────┬─────┬─────┬─────┐
│  A  │  B  │  C  │  D  │
├─────┼─────┼─────┼─────┤
│  E  │  F  │  G  │  H  │
└─────┴─────┴─────┴─────┘
```

If you need 8 things open, split across 2 workspaces.

### Floating Windows for Dialogs

Some windows don't tile well:
- Preferences panels
- Small utility windows
- Inspector panels

Make them float:

1. Focus the window
2. **⌥⇧;** (service mode)
3. **f** (toggle float)
4. **Esc** (exit service mode)

Or configure them to always float in `~/.aerospace.toml`.

### Service Mode Is Your Reset Button

Layout feel wrong? Press **⌥⇧;** → **r** (flatten tree).

Instant clean slate.

### Combine with macOS Features

AeroSpace enhances macOS, doesn't replace it:

- **Cmd-Space (Spotlight)** - Still the best app launcher
- **Cmd-Tab** - Still useful for switching apps
- **Mission Control (F3)** - Great overview of all windows

Use AeroSpace for **organizing**, macOS features for **launching** and **switching apps**.

## Troubleshooting Common Workflows

### Problem: Too Many Terminals

**Solution:** Use tmux or terminal tabs instead of multiple windows.

One terminal window with tmux is cleaner than 4 terminal windows.

### Problem: Browser Tabs Not Tiling

**Correct:** Browser windows tile, not tabs.

If you want multiple browser views tiled, open multiple browser windows (Cmd-N), not tabs (Cmd-T).

### Problem: App Refuses to Tile

Some apps always float (macOS limitation). Check with:

```bash
aerospace list-windows --all
```

If window shows `floating`, either it's forced to float or the app doesn't support tiling.

### Problem: Forgot Which Workspace Has What

**Solution 1:** Check all workspaces visually with Mission Control (F3)

**Solution 2:** List windows by workspace:

```bash
aerospace list-windows --workspace 1
aerospace list-windows --workspace 2
```

**Solution 3:** Be more consistent with workspace assignments

## Next Steps

- [Keybindings Reference](/aerospace/keybindings) - Complete keybinding list
- [Configuration Guide](/aerospace/configuration) - Customize AeroSpace further
- [Main Documentation](/aerospace) - Overview and installation

## Workflow Templates

Copy these to `~/.aerospace.toml` to get started quickly:

### Developer Template

```toml
# Workspace 1: Code (Terminal + Editor)
# Workspace 2: Browser (Docs)
# Workspace 3: Communication (Slack/Email)

[gaps]
    inner.horizontal = 10
    inner.vertical = 10
```

### Designer Template

```toml
# Workspace D: Design (Figma)
# Workspace B: Browser (Inspiration)
# Workspace F: Files (Finder with assets)

accordion-padding = 40  # More padding for visual clarity
```

### Writer Template

```toml
# Workspace W: Writing
# Workspace R: Research
# Workspace N: Notes

default-root-container-layout = 'accordion'  # Stack windows vertically
```

Choose a template, adjust to your needs, and build from there.

## Philosophy

Good workflows share these traits:

1. **Predictable** - Same workspace for same task
2. **Minimal** - Only what you need visible
3. **Fast** - One keystroke to context switch
4. **Persistent** - Layouts survive between sessions

AeroSpace gives you the tools. You define the workflow.
