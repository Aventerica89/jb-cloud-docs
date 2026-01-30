---
title: Multi-Config Setup
description: Manage multiple AeroSpace configurations with symlink-based switching
sidebar:
  order: 5
---

A symlink-based system for managing multiple AeroSpace configurations, allowing you to quickly switch between different workspace setups (minimal for laptop work, full for desktop, custom for specific workflows).

## Why Use Multiple Configs?

Different contexts require different workspace setups:

- **Laptop** - Fewer workspaces (1-5), less visual clutter
- **Desktop** - Full workspace set (1-9, A-Z), multiple monitors
- **Focus mode** - Minimal distractions, limited app assignments
- **Work** - Specific workspace assignments for work tools
- **Personal** - Different layout for personal projects

Instead of manually editing `~/.aerospace.toml` each time, use multiple config files and switch between them instantly.

## Architecture

```
~/.config/aerospace/
├── full.toml      # Full config (all workspaces 1-9 + A-Z)
├── minimal.toml   # Minimal config (workspaces 1-5 only)
├── work.toml      # Custom work config (your additions)
└── README.md      # Documentation

~/.aerospace.toml  # Symlink → points to active config
```

The `~/.aerospace.toml` file is a **symlink** that points to one of the config files. When you switch configs, the symlink is updated and AeroSpace automatically reloads.

## Installation

### 1. Create Config Directory

```bash
mkdir -p ~/.config/aerospace
```

### 2. Create Config Files

**Full Config** - All workspaces (1-9, A-Z):

```bash
cat > ~/.config/aerospace/full.toml << 'EOF'
config-version = 2

after-startup-command = []
start-at-login = false

enable-normalization-flatten-containers = true
enable-normalization-opposite-orientation-for-nested-containers = true

accordion-padding = 30
default-root-container-layout = 'tiles'
default-root-container-orientation = 'auto'

on-focused-monitor-changed = ['move-mouse monitor-lazy-center']
automatically-unhide-macos-hidden-apps = false

# All workspaces
persistent-workspaces = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
                         "A", "B", "C", "D", "E", "F", "G", "I", "M",
                         "N", "O", "P", "Q", "R", "S", "T", "U", "V",
                         "W", "X", "Y", "Z"]

[key-mapping]
    preset = 'qwerty'

[gaps]
    inner.horizontal = 0
    inner.vertical =   0
    outer.left =       0
    outer.bottom =     0
    outer.top =        0
    outer.right =      0

[mode.main.binding]
    # Layout
    alt-slash = 'layout tiles horizontal vertical'
    alt-comma = 'layout accordion horizontal vertical'

    # Focus (vim-style)
    alt-h = 'focus left'
    alt-j = 'focus down'
    alt-k = 'focus up'
    alt-l = 'focus right'

    # Move windows
    alt-shift-h = 'move left'
    alt-shift-j = 'move down'
    alt-shift-k = 'move up'
    alt-shift-l = 'move right'

    # Resize
    alt-minus = 'resize smart -50'
    alt-equal = 'resize smart +50'

    # Workspaces (add all 1-9, A-Z bindings here)
    alt-1 = 'workspace 1'
    alt-2 = 'workspace 2'
    # ... (continue for all workspaces)

    # Move to workspace (add all)
    alt-shift-1 = 'move-node-to-workspace 1'
    alt-shift-2 = 'move-node-to-workspace 2'
    # ... (continue for all workspaces)

    alt-tab = 'workspace-back-and-forth'
    alt-shift-tab = 'move-workspace-to-monitor --wrap-around next'

    # Service mode
    alt-shift-semicolon = 'mode service'

[mode.service.binding]
    esc = ['reload-config', 'mode main']
    r = ['flatten-workspace-tree', 'mode main']
    f = ['layout floating tiling', 'mode main']
    backspace = ['close-all-windows-but-current', 'mode main']

    alt-shift-h = ['join-with left', 'mode main']
    alt-shift-j = ['join-with down', 'mode main']
    alt-shift-k = ['join-with up', 'mode main']
    alt-shift-l = ['join-with right', 'mode main']

# App assignments
[[on-window-detected]]
if.app-id = 'com.microsoft.VSCode'
run = 'move-node-to-workspace 1'

[[on-window-detected]]
if.app-id = 'com.mitchellh.ghostty'
run = 'move-node-to-workspace 1'

[[on-window-detected]]
if.app-id = 'com.google.Chrome'
run = 'move-node-to-workspace 2'

[[on-window-detected]]
if.app-id = 'com.apple.finder'
run = 'layout floating'
EOF
```

**Minimal Config** - Just 5 workspaces:

```bash
cat > ~/.config/aerospace/minimal.toml << 'EOF'
config-version = 2

after-startup-command = []
start-at-login = false

enable-normalization-flatten-containers = true
enable-normalization-opposite-orientation-for-nested-containers = true

accordion-padding = 30
default-root-container-layout = 'tiles'
default-root-container-orientation = 'auto'

on-focused-monitor-changed = ['move-mouse monitor-lazy-center']
automatically-unhide-macos-hidden-apps = false

# Only 5 workspaces
persistent-workspaces = ["1", "2", "3", "4", "5"]

[key-mapping]
    preset = 'qwerty'

[gaps]
    inner.horizontal = 0
    inner.vertical =   0
    outer.left =       0
    outer.bottom =     0
    outer.top =        0
    outer.right =      0

[mode.main.binding]
    # Same keybindings as full, but only workspaces 1-5
    alt-slash = 'layout tiles horizontal vertical'
    alt-comma = 'layout accordion horizontal vertical'

    alt-h = 'focus left'
    alt-j = 'focus down'
    alt-k = 'focus up'
    alt-l = 'focus right'

    alt-shift-h = 'move left'
    alt-shift-j = 'move down'
    alt-shift-k = 'move up'
    alt-shift-l = 'move right'

    alt-minus = 'resize smart -50'
    alt-equal = 'resize smart +50'

    # Only workspaces 1-5
    alt-1 = 'workspace 1'
    alt-2 = 'workspace 2'
    alt-3 = 'workspace 3'
    alt-4 = 'workspace 4'
    alt-5 = 'workspace 5'

    alt-shift-1 = 'move-node-to-workspace 1'
    alt-shift-2 = 'move-node-to-workspace 2'
    alt-shift-3 = 'move-node-to-workspace 3'
    alt-shift-4 = 'move-node-to-workspace 4'
    alt-shift-5 = 'move-node-to-workspace 5'

    alt-tab = 'workspace-back-and-forth'
    alt-shift-tab = 'move-workspace-to-monitor --wrap-around next'
    alt-shift-semicolon = 'mode service'

[mode.service.binding]
    esc = ['reload-config', 'mode main']
    r = ['flatten-workspace-tree', 'mode main']
    f = ['layout floating tiling', 'mode main']
    backspace = ['close-all-windows-but-current', 'mode main']

    alt-shift-h = ['join-with left', 'mode main']
    alt-shift-j = ['join-with down', 'mode main']
    alt-shift-k = ['join-with up', 'mode main']
    alt-shift-l = ['join-with right', 'mode main']

# Essential app assignments only
[[on-window-detected]]
if.app-id = 'com.microsoft.VSCode'
run = 'move-node-to-workspace 1'

[[on-window-detected]]
if.app-id = 'com.mitchellh.ghostty'
run = 'move-node-to-workspace 1'

[[on-window-detected]]
if.app-id = 'com.google.Chrome'
run = 'move-node-to-workspace 2'

[[on-window-detected]]
if.app-id = 'com.apple.finder'
run = 'layout floating'
EOF
```

### 3. Install Switcher Script

```bash
mkdir -p ~/.local/bin
cat > ~/.local/bin/aerospace-switch << 'EOF'
#!/bin/bash
# AeroSpace config switcher

CONFIGS_DIR="$HOME/.config/aerospace"
ACTIVE_CONFIG="$HOME/.aerospace.toml"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

show_current() {
    if [ -L "$ACTIVE_CONFIG" ]; then
        local target=$(readlink "$ACTIVE_CONFIG")
        local config_name=$(basename "$target" .toml)
        echo -e "${GREEN}Current config:${NC} $config_name (symlinked)"
    elif [ -f "$ACTIVE_CONFIG" ]; then
        echo -e "${YELLOW}Current config:${NC} standalone file (not managed)"
    else
        echo -e "${RED}No active config found${NC}"
    fi
}

list_configs() {
    echo -e "\n${GREEN}Available configs:${NC}"
    for config in "$CONFIGS_DIR"/*.toml; do
        if [ -f "$config" ]; then
            local name=$(basename "$config" .toml)
            echo "  - $name"
        fi
    done
}

switch_config() {
    local config_name="$1"
    local config_path="$CONFIGS_DIR/${config_name}.toml"

    if [ ! -f "$config_path" ]; then
        echo -e "${RED}Error:${NC} Config '$config_name' not found"
        list_configs
        exit 1
    fi

    rm -f "$ACTIVE_CONFIG"
    ln -sf "$config_path" "$ACTIVE_CONFIG"

    echo -e "${GREEN}Switched to:${NC} $config_name"

    if pgrep -x "AeroSpace" > /dev/null; then
        aerospace reload-config
        echo -e "${GREEN}Reloaded${NC} AeroSpace config"
    fi
}

case "$1" in
    "")
        show_current
        list_configs
        ;;
    list)
        list_configs
        ;;
    current)
        show_current
        ;;
    *)
        switch_config "$1"
        ;;
esac
EOF

chmod +x ~/.local/bin/aerospace-switch
```

### 4. Add to PATH

Add `~/.local/bin` to your PATH if not already there:

```bash
# For bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc

# For zsh
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc

# Reload shell
source ~/.zshrc  # or ~/.bashrc
```

### 5. Set Initial Config

```bash
# Start with minimal config
aerospace-switch minimal
```

## Usage

### Switch Configs

```bash
# Switch to full config (all workspaces)
aerospace-switch full

# Switch to minimal config (workspaces 1-5)
aerospace-switch minimal

# Switch to custom config
aerospace-switch work
```

The switcher automatically:
1. Updates the symlink at `~/.aerospace.toml`
2. Reloads AeroSpace configuration
3. Shows confirmation message

### Check Current Config

```bash
# Show current + available configs
aerospace-switch

# Show just current config
aerospace-switch current
```

Output:
```
Current config: minimal (symlinked)

Available configs:
  - full
  - minimal
  - work
```

### List All Configs

```bash
aerospace-switch list
```

## Built-in Configs Explained

### full.toml

**Use when:**
- Working on desktop with multiple monitors
- Need many workspaces for complex project organization
- Managing multiple projects simultaneously

**Features:**
- All 35 workspaces (1-9, A-Z)
- Complete app assignments
- Vim-style navigation (hjkl)
- Full keybinding set

**Workspace suggestions:**
- **1-9**: Numbered workspaces for primary tasks
- **A-Z**: Alphabetic workspaces by function
  - D = Development
  - B = Browser
  - C = Communication
  - M = Music/Media
  - T = Terminal
  - etc.

### minimal.toml

**Use when:**
- On laptop or limited screen space
- Working on single focused task
- Want less cognitive overhead
- Learning AeroSpace (fewer shortcuts to remember)

**Features:**
- Only 5 workspaces (1-5)
- Essential app assignments only
- Same navigation keybindings
- Lighter weight

**Workspace suggestions:**
- **1**: Code + Terminal
- **2**: Browser
- **3**: Communication
- **4**: Documentation/Reference
- **5**: Miscellaneous

## Creating Custom Configs

### 1. Copy Existing Config

```bash
# Start from full config
cp ~/.config/aerospace/full.toml ~/.config/aerospace/work.toml

# Or start from minimal
cp ~/.config/aerospace/minimal.toml ~/.config/aerospace/focus.toml
```

### 2. Edit New Config

```bash
vim ~/.config/aerospace/work.toml
```

### 3. Switch to New Config

```bash
aerospace-switch work
```

## Common Customizations

### Different Workspace Sets

**Example: Work config with specific workspaces**

```toml
# Work-specific workspaces
persistent-workspaces = ["D", "B", "T", "C", "M"]
# D = Dev, B = Browser, T = Terminal, C = Communication, M = Music
```

**Example: Focus mode with just 3 workspaces**

```toml
persistent-workspaces = ["1", "2", "3"]
# 1 = Code, 2 = Docs, 3 = Terminal
```

### Different Gaps

**Example: Laptop config with larger gaps (better for smaller screens)**

```toml
[gaps]
    inner.horizontal = 8
    inner.vertical =   8
    outer.left =       8
    outer.bottom =     8
    outer.top =        8
    outer.right =      8
```

**Example: Desktop config with no gaps (maximize screen space)**

```toml
[gaps]
    inner.horizontal = 0
    inner.vertical =   0
    outer.left =       0
    outer.bottom =     0
    outer.top =        0
    outer.right =      0
```

### Different App Assignments

**Example: Focus mode - disable auto-assignment**

Comment out all `[[on-window-detected]]` sections to manually organize windows:

```toml
# [[on-window-detected]]
# if.app-id = 'com.microsoft.VSCode'
# run = 'move-node-to-workspace 1'
```

**Example: Work config - specific app routing**

```toml
# Development workspace
[[on-window-detected]]
if.app-id = 'com.microsoft.VSCode'
run = 'move-node-to-workspace D'

# Browser workspace
[[on-window-detected]]
if.app-id = 'com.google.Chrome'
run = 'move-node-to-workspace B'

# Communication workspace
[[on-window-detected]]
if.app-id = 'com.tinyspeck.slackmacgap'
run = 'move-node-to-workspace C'

[[on-window-detected]]
if.app-id = 'com.apple.mail'
run = 'move-node-to-workspace C'

# Terminal workspace
[[on-window-detected]]
if.app-id = 'com.mitchellh.ghostty'
run = 'move-node-to-workspace T'
```

## Real-World Examples

### Example 1: Laptop + Desktop Setup

**Laptop (minimal.toml):**
```toml
persistent-workspaces = ["1", "2", "3"]

[gaps]
    inner.horizontal = 8
    inner.vertical =   8
    outer.left =       8
```

**Desktop (full.toml):**
```toml
persistent-workspaces = ["1", "2", "3", "4", "5", "6", "7", "8", "9",
                         "D", "B", "C", "M", "T"]

[gaps]
    inner.horizontal = 0
    inner.vertical =   0
```

Switch between them:
```bash
# When docking laptop
aerospace-switch full

# When undocking
aerospace-switch minimal
```

### Example 2: Context-Based Configs

**work.toml** - 9-5 work setup:
```toml
persistent-workspaces = ["D", "B", "C", "T", "M"]

[[on-window-detected]]
if.app-id = 'com.microsoft.teams'
run = 'move-node-to-workspace C'

[[on-window-detected]]
if.app-id = 'com.atlassian.jira'
run = 'move-node-to-workspace B'
```

**personal.toml** - After hours:
```toml
persistent-workspaces = ["1", "2", "3"]

# No auto-assignments - manually organize
```

**focus.toml** - Deep work:
```toml
persistent-workspaces = ["1"]

# Single workspace, no distractions
```

Switch throughout the day:
```bash
aerospace-switch work      # Morning
aerospace-switch focus     # Deep work session
aerospace-switch personal  # Evening
```

### Example 3: Multi-Monitor Configs

**single-monitor.toml:**
```toml
persistent-workspaces = ["1", "2", "3", "4", "5"]
```

**dual-monitor.toml:**
```toml
persistent-workspaces = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

# Assign specific workspaces to monitors
# Monitor 1: 1-5
# Monitor 2: 6-9
```

## Advanced Patterns

### Automatic Switching Based on Context

Create a shell function to switch configs based on location or time:

```bash
# Add to ~/.zshrc or ~/.bashrc
aerospace-auto() {
    local hour=$(date +%H)
    local wifi=$(networksetup -getairportnetwork en0 | cut -d: -f2 | xargs)

    if [[ "$wifi" == "Work-WiFi" ]]; then
        aerospace-switch work
    elif [[ $hour -ge 9 && $hour -lt 17 ]]; then
        aerospace-switch full
    else
        aerospace-switch minimal
    fi
}
```

### Config Validation

Before switching, validate config syntax:

```bash
# Add to aerospace-switch script
validate_config() {
    local config_path="$1"

    # Check if AeroSpace can parse it
    if ! aerospace --config "$config_path" list-workspaces &>/dev/null; then
        echo -e "${RED}Error:${NC} Invalid config syntax"
        return 1
    fi

    return 0
}
```

### Git-Track Your Configs

```bash
cd ~/.config/aerospace
git init
git add *.toml README.md
git commit -m "Initial aerospace configs"

# Optional: Push to GitHub for backup
git remote add origin git@github.com:yourusername/aerospace-configs.git
git push -u origin main
```

## Tips and Best Practices

### Reload After Manual Edits

If you manually edit a config file:

```bash
# Reload without switching
aerospace reload-config

# Or use keybinding (if configured)
# Alt+Shift+; then Esc
```

### Keep full.toml as Reference

Always maintain `full.toml` as your complete reference config. Copy from it when creating new configs.

### Test Before Committing

Before replacing your active config permanently:

```bash
# Test new config
aerospace-switch test-config

# If it works, rename to proper name
mv ~/.config/aerospace/test-config.toml ~/.config/aerospace/production.toml

# Switch to production
aerospace-switch production
```

### Symlink Survives Updates

The symlink at `~/.aerospace.toml` survives AeroSpace updates. Your multi-config setup won't break.

### Changes Reload Automatically

When you switch configs, AeroSpace automatically reloads. No need to manually restart the app.

## Troubleshooting

### Symlink Not Working

Check if symlink exists:

```bash
ls -la ~/.aerospace.toml
```

Should show:
```
~/.aerospace.toml -> /Users/you/.config/aerospace/minimal.toml
```

If broken, recreate:
```bash
aerospace-switch minimal
```

### Config Not Reloading

Manually reload:

```bash
aerospace reload-config
```

Or restart AeroSpace:

```bash
killall AeroSpace
open -a AeroSpace
```

### Keybindings Not Working After Switch

Some apps cache keybindings. Restart the app or reboot if issues persist.

### Which Config Am I Using?

```bash
aerospace-switch current
```

Or check symlink target:

```bash
readlink ~/.aerospace.toml
```

## Resources

- [AeroSpace Configuration Reference](/aerospace/configuration)
- [Keybindings Guide](/aerospace/keybindings)
- [Official AeroSpace Docs](https://nikitabobko.github.io/AeroSpace/guide)

## Summary

The multi-config setup provides:

- **Flexibility** - Different configs for different contexts
- **Speed** - Switch configs in seconds with one command
- **Safety** - Original configs preserved, easy to revert
- **Simplicity** - Just symlinks, no complex tooling
- **Portability** - Configs are plain TOML files, easy to share/backup

Start with `full.toml` and `minimal.toml`, then create custom configs as needed. The switcher makes it effortless to adapt AeroSpace to your current workflow.
