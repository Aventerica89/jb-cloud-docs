---
title: Keybindings Reference
description: Complete reference for all AeroSpace keyboard shortcuts
sidebar:
  order: 1
---

Complete reference for all default AeroSpace keybindings. All keybindings use **Option (⌥)** as the primary modifier unless otherwise noted.

## Key to Symbols

- **⌥** = Option (Alt) key
- **⇧** = Shift key
- **⌘** = Command key
- **⌃** = Control key

## Navigation (Focus)

Move focus between windows using vim-style navigation keys.

| Keybinding | Action | Description |
|------------|--------|-------------|
| **⌥h** | Focus left | Move focus to the window on the left |
| **⌥j** | Focus down | Move focus to the window below |
| **⌥k** | Focus up | Move focus to the window above |
| **⌥l** | Focus right | Move focus to the window on the right |

### Visual Example: Focus Navigation

```
┌──────────┬──────────┬──────────┐
│          │          │          │
│    A     │    B     │    C     │  Press ⌥l to focus right
│          │  [FOC]   │          │  B → C
│          │          │          │
└──────────┴──────────┴──────────┘

┌──────────┬──────────┬──────────┐
│          │          │          │
│    A     │    B     │    C     │  Now C is focused
│          │          │  [FOC]   │
│          │          │          │
└──────────┴──────────┴──────────┘
```

**Think of it like Vim:**
- `h` = left
- `j` = down
- `k` = up
- `l` = right

Your fingers naturally rest on these keys, making navigation extremely fast once you build muscle memory.

## Window Movement

Move windows around the screen while keeping focus on the moved window.

| Keybinding | Action | Description |
|------------|--------|-------------|
| **⌥⇧h** | Move left | Move window to the left |
| **⌥⇧j** | Move down | Move window down |
| **⌥⇧k** | Move up | Move window up |
| **⌥⇧l** | Move right | Move window to the right |

### Visual Example: Moving Windows

```
Before:
┌──────────┬──────────┐
│          │          │
│    A     │    B     │  Window B is focused
│          │  [FOC]   │  Press ⌥⇧h (move left)
│          │          │
└──────────┴──────────┘

After:
┌──────────┬──────────┐
│          │          │
│    B     │    A     │  B and A swap positions
│  [FOC]   │          │  B is still focused
│          │          │
└──────────┴──────────┘
```

**Pattern:** Same keys as navigation, but add Shift (⇧)

## Window Resizing

Resize windows intelligently based on their orientation.

| Keybinding | Action | Description |
|------------|--------|-------------|
| **⌥-** | Resize smaller | Shrink focused window by 50px |
| **⌥=** | Resize larger | Grow focused window by 50px |

### Visual Example: Resizing

```
Before:
┌─────────────┬─────────────┐
│             │             │
│      A      │      B      │  B is focused
│             │    [FOC]    │  Press ⌥= (resize larger)
│             │             │
└─────────────┴─────────────┘

After:
┌────────┬────────────────┐
│        │                │
│   A    │       B        │  B grew, A shrunk
│        │     [FOC]      │
│        │                │
└────────┴────────────────┘
```

**Smart Resizing:**
- If window is in a horizontal split, grows/shrinks horizontally
- If window is in a vertical split, grows/shrinks vertically
- No need to think about direction - AeroSpace figures it out

## Workspace Switching

Switch between workspaces instantly. Each workspace is independent and can hold different window layouts.

### Number Workspaces (1-9)

| Keybinding | Action |
|------------|--------|
| **⌥1** | Switch to workspace 1 |
| **⌥2** | Switch to workspace 2 |
| **⌥3** | Switch to workspace 3 |
| **⌥4** | Switch to workspace 4 |
| **⌥5** | Switch to workspace 5 |
| **⌥6** | Switch to workspace 6 |
| **⌥7** | Switch to workspace 7 |
| **⌥8** | Switch to workspace 8 |
| **⌥9** | Switch to workspace 9 |

### Letter Workspaces (A-Z)

| Keybinding | Action | Suggested Use |
|------------|--------|---------------|
| **⌥a** | Switch to workspace A | Apps/Applications |
| **⌥b** | Switch to workspace B | Browser |
| **⌥c** | Switch to workspace C | Communication |
| **⌥d** | Switch to workspace D | Development |
| **⌥e** | Switch to workspace E | Email |
| **⌥f** | Switch to workspace F | Files/Finder |
| **⌥g** | Switch to workspace G | Graphics/Design |
| **⌥i** | Switch to workspace I | IDE |
| **⌥m** | Switch to workspace M | Music/Media |
| **⌥n** | Switch to workspace N | Notes |
| **⌥o** | Switch to workspace O | Organization |
| **⌥p** | Switch to workspace P | Planning |
| **⌥q** | Switch to workspace Q | (Custom) |
| **⌥r** | Switch to workspace R | Research |
| **⌥s** | Switch to workspace S | Slack/Social |
| **⌥t** | Switch to workspace T | Terminal |
| **⌥u** | Switch to workspace U | (Custom) |
| **⌥v** | Switch to workspace V | Video |
| **⌥w** | Switch to workspace W | Web |
| **⌥x** | Switch to workspace X | (Custom) |
| **⌥y** | Switch to workspace Y | (Custom) |
| **⌥z** | Switch to workspace Z | (Custom) |

### Visual Example: Workspace Switching

```
Workspace 1:                    Workspace 2:
┌─────────┬─────────┐          ┌──────────────────┐
│ Terminal│ VS Code │          │     Browser      │
│         │         │          │                  │
└─────────┴─────────┘          └──────────────────┘

Press ⌥1: See Terminal + VS Code
Press ⌥2: See Browser
```

**Tip:** Use numbers (1-9) for frequently accessed workspaces, and letters for specific purposes.

## Moving Windows to Workspaces

Send windows to different workspaces while staying on your current workspace.

### To Number Workspaces

| Keybinding | Action |
|------------|--------|
| **⌥⇧1** | Move window to workspace 1 |
| **⌥⇧2** | Move window to workspace 2 |
| **⌥⇧3** | Move window to workspace 3 |
| **⌥⇧4** | Move window to workspace 4 |
| **⌥⇧5** | Move window to workspace 5 |
| **⌥⇧6** | Move window to workspace 6 |
| **⌥⇧7** | Move window to workspace 7 |
| **⌥⇧8** | Move window to workspace 8 |
| **⌥⇧9** | Move window to workspace 9 |

### To Letter Workspaces

| Keybinding | Action |
|------------|--------|
| **⌥⇧a** | Move window to workspace A |
| **⌥⇧b** | Move window to workspace B |
| **⌥⇧c** | Move window to workspace C |
| **⌥⇧d** | Move window to workspace D |
| **⌥⇧e** | Move window to workspace E |
| **⌥⇧f** | Move window to workspace F |
| **⌥⇧g** | Move window to workspace G |
| **⌥⇧i** | Move window to workspace I |
| **⌥⇧m** | Move window to workspace M |
| **⌥⇧n** | Move window to workspace N |
| **⌥⇧o** | Move window to workspace O |
| **⌥⇧p** | Move window to workspace P |
| **⌥⇧q** | Move window to workspace Q |
| **⌥⇧r** | Move window to workspace R |
| **⌥⇧s** | Move window to workspace S |
| **⌥⇧t** | Move window to workspace T |
| **⌥⇧u** | Move window to workspace U |
| **⌥⇧v** | Move window to workspace V |
| **⌥⇧w** | Move window to workspace W |
| **⌥⇧x** | Move window to workspace X |
| **⌥⇧y** | Move window to workspace Y |
| **⌥⇧z** | Move window to workspace Z |

### Visual Example: Moving Windows Between Workspaces

```
Starting state - Workspace 1:
┌─────────┬─────────┬─────────┐
│Terminal │ VS Code │ Browser │  Browser is focused
│         │         │  [FOC]  │  Press ⌥⇧2 (move to workspace 2)
└─────────┴─────────┴─────────┘

After - Workspace 1:             After - Workspace 2:
┌─────────┬─────────┐           ┌─────────┐
│Terminal │ VS Code │           │ Browser │
│         │         │           │         │
└─────────┴─────────┘           └─────────┘

Browser moved to workspace 2!
You're still on workspace 1.
```

**Pattern:** Same workspace keys, but add Shift (⇧) to move windows instead of switching

## Layout Management

Change how windows are arranged within the current workspace.

| Keybinding | Action | Description |
|------------|--------|-------------|
| **⌥/** | Toggle tiles | Cycle through horizontal/vertical tiles layouts |
| **⌥,** | Toggle accordion | Cycle through horizontal/vertical accordion layouts |

### Tiles Layout

Windows split available space in a binary tree structure.

```
Horizontal Tiles:               Vertical Tiles:
┌─────────┬─────────┐          ┌──────────────────┐
│         │         │          │         A        │
│    A    │    B    │          ├──────────────────┤
│         │         │          │         B        │
└─────────┴─────────┘          └──────────────────┘

Press ⌥/ to toggle between horizontal and vertical
```

### Accordion Layout

All windows in a container get equal space.

```
Horizontal Accordion:           Vertical Accordion:
┌─────┬─────┬─────┐            ┌──────────────────┐
│  A  │  B  │  C  │            │        A         │
│     │     │     │            ├──────────────────┤
│     │     │     │            │        B         │
└─────┴─────┴─────┘            ├──────────────────┤
                               │        C         │
                               └──────────────────┘

Press ⌥, to toggle between horizontal and vertical accordion
```

## Monitor Management

Work with multiple monitors seamlessly.

| Keybinding | Action | Description |
|------------|--------|-------------|
| **⌥Tab** | Workspace back-and-forth | Toggle between current and previous workspace |
| **⌥⇧Tab** | Move workspace to next monitor | Move entire workspace to the next monitor |

### Visual Example: Multi-Monitor Setup

```
Monitor 1:                      Monitor 2:
┌─────────┬─────────┐          ┌──────────────────┐
│ Terminal│ VS Code │          │     Browser      │
│         │         │          │                  │
└─────────┴─────────┘          └──────────────────┘
Workspace 1                     Workspace 2

Press ⌥Tab: Switch between workspace 1 and 2 on current monitor
Press ⌥⇧Tab: Move entire workspace to the other monitor
```

## Service Mode (Advanced)

Press **⌥⇧;** to enter service mode for advanced operations. The mode name will appear in the menu bar.

| Keybinding | Action | Description |
|------------|--------|-------------|
| **⌥⇧;** | Enter service mode | Switch to service mode for advanced operations |

### Service Mode Keybindings

While in service mode (entered with ⌥⇧;):

| Keybinding | Action | Description |
|------------|--------|-------------|
| **Esc** | Reload config + exit | Reload `~/.aerospace.toml` and return to main mode |
| **r** | Reset layout + exit | Flatten workspace tree and return to main mode |
| **f** | Toggle float + exit | Toggle floating/tiling for focused window |
| **Backspace** | Close all but current + exit | Close all windows except the focused one |
| **⌥⇧h** | Join with left + exit | Merge focused window with window on left |
| **⌥⇧j** | Join with down + exit | Merge focused window with window below |
| **⌥⇧k** | Join with up + exit | Merge focused window with window above |
| **⌥⇧l** | Join with right + exit | Merge focused window with window on right |

### Visual Example: Flatten Workspace Tree (Reset Layout)

```
Before (Complex nested layout):
┌────────┬───────────────┐
│        │      ┌────────┤
│   A    │   B  │   C    │  Press ⌥⇧; then r
│        │      └────────┤  (flatten)
│        │        D      │
└────────┴───────────────┘

After:
┌──────┬──────┬──────┬──────┐
│  A   │  B   │  C   │  D   │  Simple, clean layout
└──────┴──────┴──────┴──────┘
```

**When to use:**
- **r (reset)**: When your layout gets messy or confusing
- **f (float)**: For windows that don't tile well (Preferences, dialogs)
- **Backspace**: When you want to focus on one window and close everything else
- **Join**: To combine windows into a shared container

## Custom Keybinding (Optional)

You can add a terminal launcher by uncommenting these lines in `~/.aerospace.toml`:

```toml
alt-enter = '''exec-and-forget osascript -e '
tell application "Terminal"
    do script
    activate
end tell'
'''
```

Then **⌥Enter** will open a new Terminal window (like i3).

## Keybinding Patterns

Understanding the patterns makes memorization easier:

### Navigation Pattern
- **Base key** (hjkl) = Focus
- **Base + Shift** = Move

### Workspace Pattern
- **Base key** (1-9, a-z) = Switch to workspace
- **Base + Shift** = Move window to workspace

### Layout Pattern
- **/** = Tiles layout
- **,** = Accordion layout

### Mode Pattern
- **;** + Shift = Service mode
- Letters in service mode = Quick actions

## Avoiding Conflicts

AeroSpace uses Option (⌥) as the default modifier to avoid conflicts with:

- **⌘** - macOS system shortcuts (Cmd-Tab, Cmd-Space, etc.)
- **⌃** - Terminal shortcuts (Ctrl-C, Ctrl-Z, etc.)

### Common macOS Shortcuts That Still Work

These native macOS shortcuts work alongside AeroSpace:

- **⌘Space** - Spotlight (app launcher)
- **⌘Tab** - Application switcher
- **⌘`** - Switch between windows of same app
- **⌘Q** - Quit application
- **⌘W** - Close window
- **⌘H** - Hide application
- **⌘M** - Minimize window
- **F3** - Mission Control

**Pro tip:** Use ⌘Space to launch apps, then use AeroSpace to organize them.

## Muscle Memory Tips

### Week 1: Learn These First
1. **⌥hjkl** - Navigation only
2. **⌥1/2/3** - First three workspaces
3. **⌥⇧1/2/3** - Move window to workspace

### Week 2: Add These
4. **⌥⇧hjkl** - Moving windows
5. **⌥-/=** - Resizing
6. **⌥/** - Layout toggle

### Week 3: Master These
7. All workspace numbers (1-9)
8. Letter workspaces you use often
9. **⌥⇧;** + service mode shortcuts

### Practice Exercise

1. Open 3 apps (Terminal, Browser, VS Code)
2. Use **⌥hjkl** to navigate between them
3. Use **⌥⇧2** to move browser to workspace 2
4. Use **⌥2** to switch to workspace 2
5. Use **⌥1** to switch back to workspace 1
6. Use **⌥/** to change the layout

Repeat this sequence 10 times over a few days. Your fingers will remember.

## Quick Reference Card

Print this and keep it near your keyboard for the first week:

```
NAVIGATION           MOVEMENT             WORKSPACES
⌥h - Focus left      ⌥⇧h - Move left      ⌥[1-9] - Switch
⌥j - Focus down      ⌥⇧j - Move down      ⌥⇧[1-9] - Move window
⌥k - Focus up        ⌥⇧k - Move up        ⌥[a-z] - Switch
⌥l - Focus right     ⌥⇧l - Move right     ⌥⇧[a-z] - Move window

RESIZE              LAYOUT               SERVICE MODE
⌥- Smaller          ⌥/ - Tiles           ⌥⇧; - Enter
⌥= Larger           ⌥, - Accordion       Esc - Exit & reload
                                         r - Reset layout
                                         f - Toggle float
```

## Customizing Keybindings

All keybindings can be customized in `~/.aerospace.toml`. See the [Configuration Guide](/aerospace/configuration) for details.

## Related Resources

- [Main Documentation](/aerospace) - Overview and installation
- [Workflows](/aerospace/workflows) - Common workflows and use cases
- [Configuration](/aerospace/configuration) - Detailed configuration options
