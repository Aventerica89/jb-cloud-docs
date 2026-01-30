---
title: AeroSpace
description: i3-like tiling window manager for macOS
sidebar:
  order: 0
---

A tiling window manager for macOS inspired by i3wm. AeroSpace lets you manage windows using keyboard shortcuts, automatically organizing them in a tree-based layout without overlapping windows.

## Why Use AeroSpace?

Traditional macOS window management relies heavily on the mouse - dragging, resizing, clicking to focus. AeroSpace replaces this with:

- **Keyboard-driven workflow** - Focus, move, and resize windows without touching the mouse
- **Automatic tiling** - Windows automatically resize to fill available space
- **Multiple workspaces** - Organize windows across 35+ workspaces (1-9, A-Z)
- **i3-compatible** - If you know i3/sway, you already know AeroSpace
- **Native macOS integration** - Works alongside macOS features, not against them

## How Tiling Works

Unlike traditional "floating" window managers where windows overlap, tiling window managers organize windows in a non-overlapping tree structure.

### Example: Opening Three Windows

```
┌─────────────────────────────────────────┐
│                                         │
│              Terminal                   │
│                                         │
│                                         │
└─────────────────────────────────────────┘

First window: Takes full screen
```

```
┌──────────────────┬──────────────────────┐
│                  │                      │
│    Terminal      │      Browser         │
│                  │                      │
│                  │                      │
└──────────────────┴──────────────────────┘

Second window: Screen splits 50/50
```

```
┌──────────────────┬──────────────────────┐
│                  │      Browser         │
│    Terminal      ├──────────────────────┤
│                  │                      │
│                  │      VS Code         │
└──────────────────┴──────────────────────┘

Third window: Right side splits vertically
```

The layout automatically adjusts as you add, remove, or move windows.

## Installation

### Prerequisites

- macOS (AeroSpace is macOS-only)
- Homebrew (recommended for installation)

### Install via Homebrew

```bash
brew install --cask nikitabobko/tap/aerospace
```

### Install Manually

1. Download the latest release from [GitHub releases](https://github.com/nikitabobko/AeroSpace/releases)
2. Extract the zip file
3. Move `AeroSpace.app` to `/Applications`
4. (Optional) Move `bin/aerospace` to a directory in your `$PATH` for CLI access

### First Run

1. Open AeroSpace from Applications:
   ```bash
   open -a AeroSpace
   ```

2. Grant **Accessibility Permissions**:
   - macOS will prompt you to grant accessibility permissions
   - Go to System Settings > Privacy & Security > Accessibility
   - Enable AeroSpace

3. You'll see a menu bar icon appear - AeroSpace is now running!

## Quick Start

AeroSpace uses **Option (⌥)** as the default modifier key. Here are the essential keybindings to get started:

### Focus Windows (Navigation)

- **⌥h** - Focus window to the left
- **⌥j** - Focus window below
- **⌥k** - Focus window above
- **⌥l** - Focus window to the right

Think of this like Vim navigation (hjkl).

### Move Windows

- **⌥⇧h** - Move window left
- **⌥⇧j** - Move window down
- **⌥⇧k** - Move window up
- **⌥⇧l** - Move window right

### Resize Windows

- **⌥-** (Option-Minus) - Make window smaller
- **⌥=** (Option-Equal) - Make window larger

### Switch Workspaces

- **⌥1** through **⌥9** - Switch to workspace 1-9
- **⌥a** through **⌥z** - Switch to workspace A-Z

### Move Windows to Workspaces

- **⌥⇧1** through **⌥⇧9** - Move window to workspace 1-9
- **⌥⇧a** through **⌥⇧z** - Move window to workspace A-Z

### Change Layout

- **⌥/** (Option-Slash) - Toggle horizontal/vertical tiles layout
- **⌥,** (Option-Comma) - Toggle accordion layout

## Your First Workflow

Let's walk through a typical development workflow:

1. **Open your terminal** (⌘Space, type "Terminal", Enter)
   - It takes the full screen

2. **Open your browser** (⌘Space, type "Safari" or "Chrome", Enter)
   - Screen splits 50/50 between terminal and browser

3. **Focus back to terminal**: Press **⌥h** (Option-h)
   - Your terminal is now focused

4. **Open VS Code** (⌘Space, type "VS Code", Enter)
   - Terminal, browser, and VS Code now share the screen

5. **Move browser to workspace 2**:
   - Press **⌥l** to focus browser (move focus right)
   - Press **⌥⇧2** to move it to workspace 2
   - Now terminal and VS Code share workspace 1

6. **Switch between workspaces**:
   - Press **⌥1** - See terminal and VS Code
   - Press **⌥2** - See browser

No mouse needed! Your hands stay on the keyboard.

## Configuration

AeroSpace reads its configuration from `~/.aerospace.toml`.

### View Your Config

```bash
# Config is copied to ~/.aerospace.toml on first install
cat ~/.aerospace.toml
```

### Reload Config After Changes

```bash
aerospace reload-config
```

Or use the keybinding: **⌥⇧c** (if configured)

### Common Customizations

**Change gaps between windows:**

```toml
[gaps]
    inner.horizontal = 10
    inner.vertical = 10
    outer.left = 10
    outer.bottom = 10
    outer.top = 10
    outer.right = 10
```

**Auto-start at login:**

```toml
start-at-login = true
```

**Customize keybindings:**

```toml
[mode.main.binding]
    # Use Cmd instead of Alt for focus (not recommended - conflicts with macOS)
    cmd-h = 'focus left'

    # Add a terminal launcher
    alt-enter = '''exec-and-forget osascript -e '
    tell application "Terminal"
        do script
        activate
    end tell'
    '''
```

## Understanding the Tree Structure

AeroSpace organizes windows in a **binary tree**. Each workspace has a tree where:

- **Leaf nodes** are windows
- **Branch nodes** are containers (horizontal or vertical splits)

### Example Tree:

```
         Workspace 1
              │
         ┌────┴────┐
         │         │
    Terminal   [V-Split]
                   │
              ┌────┴────┐
              │         │
           Browser   VS Code
```

This tree structure means:
- Terminal takes the left half
- Browser and VS Code split the right half vertically

When you **move** a window, you're reorganizing this tree.
When you **focus** a window, you're navigating the tree.

## Layouts Explained

AeroSpace supports multiple layouts:

### Tiles Layout (Default)

Windows are arranged in a binary tree, automatically splitting available space.

```
┌─────────┬─────────┐
│    1    │    2    │
│         ├─────────┤
│         │    3    │
└─────────┴─────────┘

Horizontal then vertical splits
```

### Accordion Layout

All windows in a container get equal space, like an accordion.

```
┌─────────────────────┐
│         1           │
├─────────────────────┤
│         2           │
├─────────────────────┤
│         3           │
└─────────────────────┘

All windows stacked equally
```

Toggle between layouts with **⌥/** and **⌥,**

## Multiple Monitors

AeroSpace works seamlessly with multiple monitors:

- Each monitor can display a different workspace
- Use **⌥Tab** to focus the next monitor
- Move windows between monitors:
  - **⌥⇧Tab** - Move window to next monitor

### Example Setup:

- **Monitor 1**: Workspace 1 (Terminal, VS Code)
- **Monitor 2**: Workspace 2 (Browser, Slack)

Switch workspace on Monitor 2 to workspace 3, and Monitor 1 stays on workspace 1.

## Service Mode (Advanced)

Press **⌥⇧;** (Option-Shift-Semicolon) to enter service mode for advanced operations:

- **r** - Flatten workspace tree (removes nested containers)
- **f** - Toggle floating/tiling for current window
- **backspace** - Close all windows except current
- **Esc** - Return to main mode

## Tips and Tricks

### Muscle Memory

It takes about a week to build muscle memory for tiling window management. Start with just these:

1. **⌥h/j/k/l** - Navigation
2. **⌥1/2/3** - First three workspaces
3. **⌥⇧1/2/3** - Move window to workspace

Add more keybindings gradually.

### Workspace Organization

Organize workspaces by purpose:

- **1**: Terminal and code editor
- **2**: Browser (documentation, research)
- **3**: Communication (Slack, email)
- **4**: Music, monitoring tools
- **5-9**: Project-specific

### Combining with macOS Features

AeroSpace works alongside macOS features:

- Use **Mission Control** (F3) to see all windows
- Use **Cmd-Tab** for app switching
- Use **Cmd-`** to switch between windows of the same app

### Performance

AeroSpace is lightweight and uses minimal resources. The CLI responds instantly to keybindings.

## Troubleshooting

### Windows Not Tiling

Some apps resist tiling (Preferences windows, some dialogs). These automatically float.

To force floating for an app:

```toml
[[on-window-detected]]
if.app-id = 'com.apple.systempreferences'
run = 'layout floating'
```

### Keybinding Not Working

1. Check for conflicts with macOS shortcuts (System Settings > Keyboard > Keyboard Shortcuts)
2. Restart AeroSpace: `killall AeroSpace && open -a AeroSpace`
3. Check config syntax: `aerospace reload-config`

### Window Stuck or Weird Layout

Reset the workspace tree:

1. Press **⌥⇧;** (enter service mode)
2. Press **r** (flatten tree)
3. Press **Esc** (exit service mode)

## Next Steps

- [Keybindings Reference](/aerospace/keybindings) - Complete list of all keybindings
- [Workflows](/aerospace/workflows) - Common workflows and advanced techniques
- [Configuration Guide](/aerospace/configuration) - Detailed configuration options

## Resources

- [Official Documentation](https://nikitabobko.github.io/AeroSpace/guide)
- [GitHub Repository](https://github.com/nikitabobko/AeroSpace)
- [i3 User Guide](https://i3wm.org/docs/userguide.html) - AeroSpace is i3-inspired

## Philosophy

AeroSpace follows the Unix philosophy:

- Do one thing well (window management)
- Work with other tools, not against them
- Keyboard > mouse for efficiency
- Configuration over clicking

Tiling window management isn't for everyone, but if you value keyboard efficiency and hate manually resizing windows, AeroSpace might change how you work.

## Using with Claude Code

Claude Code can help you customize AeroSpace configuration and troubleshoot window management issues.

### Configuration Management

**Read and understand your config:**
```bash
# View current configuration
cat ~/.aerospace.toml

# Check for syntax errors
aerospace reload-config
```

**Generate custom keybindings:**
```
"Add keybindings to:
- Launch terminal with Alt+Enter
- Toggle floating mode with Alt+Shift+F
- Move window to specific display with Alt+Shift+M"
```

Claude Code will generate proper TOML syntax and ensure no conflicts with existing bindings.

### Workspace Automation

**Create workspace-specific rules:**
```
"Configure AeroSpace to automatically:
- Send Slack to workspace C (communication)
- Send VS Code to workspace D (development)
- Send all browsers to workspace W (web)
- Float all Preferences windows"
```

**Example output:**
```toml
[[on-window-detected]]
if.app-id = 'com.tinyspeck.slackmacgap'
run = 'move-node-to-workspace C'

[[on-window-detected]]
if.app-id = 'com.microsoft.VSCode'
run = 'move-node-to-workspace D'

[[on-window-detected]]
if.app-id = 'com.apple.systempreferences'
run = 'layout floating'
```

### Troubleshooting

**Debug keybinding conflicts:**
```
"Check if Alt+H conflicts with any macOS system shortcuts or other apps"
```

**Fix layout issues:**
```
"My windows are stuck in a weird nested layout. Show me the commands to:
1. Flatten the workspace tree
2. Reset to default layout
3. Check current window tree structure"
```

**Example commands:**
```bash
# Enter service mode and flatten
# Press Alt+Shift+; then 'r'

# Or via CLI
aerospace flatten-workspace-tree
```

### Custom Layouts

**Design complex workspace layouts:**
```
"Create a development workspace with:
- Left half: Terminal (top 60%) and file manager (bottom 40%)
- Right half: VS Code (full height)
- All with 10px gaps"
```

Claude Code will provide the TOML config and explain the layout structure.

### Integration with Other Tools

**Combine with other macOS tools:**
```
"Show me how to:
- Use aerospace with Raycast for app launching
- Integrate with yabai (if I want to try both)
- Set up aerospace to start at login
- Create Alfred workflows for workspace switching"
```

### Real-World Examples

**Example 1: Developer workflow**
```
"Set up workspaces for:
1 = Terminal + Editor
2 = Browser (docs)
3 = Slack + Email
4 = Database tools
Create keybindings to quickly switch between these"
```

**Example 2: Multi-monitor setup**
```
"Configure aerospace for two monitors:
- Monitor 1: Workspaces 1-5 (development)
- Monitor 2: Workspaces 6-9 (communication)
- Keybindings to move windows between monitors"
```

**Example 3: Application-specific layouts**
```
"When I open Figma, automatically:
- Move it to workspace G
- Set layout to floating
- Maximize to full screen"
```

### Debugging

**Inspect current state:**
```bash
# List all windows and workspaces
aerospace list-windows --all

# Show current workspace
aerospace list-workspaces --focused

# Check which apps are running
aerospace list-apps
```

**Get help from Claude Code:**
```
"Why isn't my Alt+/ keybinding working to toggle layout?"
```

Claude Code will check for:
- Syntax errors in config
- Conflicting keybindings
- macOS system shortcut conflicts
- Whether you need to reload config
