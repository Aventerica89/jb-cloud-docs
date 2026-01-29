---
title: Configuration Guide
description: Detailed guide to configuring AeroSpace
sidebar:
  order: 3
---

Complete guide to customizing AeroSpace through the `~/.aerospace.toml` configuration file.

## Configuration File Location

AeroSpace reads configuration from:

```bash
~/.aerospace.toml
```

If this file doesn't exist, AeroSpace uses built-in defaults.

## Reload Configuration

After editing `~/.aerospace.toml`, reload the configuration:

**Option 1: Service Mode**
1. Press **⌥⇧;** (enter service mode)
2. Press **Esc** (reload + exit)

**Option 2: CLI**
```bash
aerospace reload-config
```

**Option 3: Restart AeroSpace**
```bash
killall AeroSpace && open -a AeroSpace
```

## Configuration Structure

```toml
# Version declaration (required)
config-version = 2

# Global settings
start-at-login = false
accordion-padding = 30

# Gaps configuration
[gaps]
    inner.horizontal = 10
    inner.vertical = 10

# Key mappings
[key-mapping]
    preset = 'qwerty'

# Main mode keybindings
[mode.main.binding]
    alt-h = 'focus left'

# Service mode keybindings
[mode.service.binding]
    esc = ['reload-config', 'mode main']

# Window detection rules
[[on-window-detected]]
if.app-id = 'com.apple.finder'
run = 'layout floating'
```

## Core Settings

### config-version

Ensures compatibility with your configuration format.

```toml
config-version = 2
```

**Values:**
- `1` - Legacy config format
- `2` - Current format (recommended)

### start-at-login

Auto-start AeroSpace when you log in.

```toml
start-at-login = true
```

**Values:**
- `true` - Start automatically
- `false` - Manual start (default)

### accordion-padding

Padding (in pixels) around windows in accordion layout.

```toml
accordion-padding = 30
```

**Values:**
- `0` - No padding
- `10-50` - Typical range
- Higher values = more visual separation

### default-root-container-layout

Default layout for new workspaces.

```toml
default-root-container-layout = 'tiles'
```

**Values:**
- `'tiles'` - Binary tree layout (default)
- `'accordion'` - Equal-sized windows

### default-root-container-orientation

How the first split is oriented.

```toml
default-root-container-orientation = 'auto'
```

**Values:**
- `'auto'` - Horizontal for wide monitors, vertical for tall (default)
- `'horizontal'` - Always split left/right
- `'vertical'` - Always split top/bottom

### automatically-unhide-macos-hidden-apps

Prevent macOS from hiding apps (Cmd-H).

```toml
automatically-unhide-macos-hidden-apps = true
```

**Values:**
- `true` - Unhide apps automatically (recommended)
- `false` - Allow macOS hide (default)

**Why enable:** Accidentally hitting Cmd-H in a tiling window manager is frustrating.

### persistent-workspaces

Workspaces that remain active even when empty.

```toml
persistent-workspaces = ["1", "2", "3", "4", "5"]
```

**Default:** All workspaces (1-9, A-Z)

**Customize:** Only keep workspaces you actively use.

```toml
# Minimal setup: just 5 workspaces
persistent-workspaces = ["1", "2", "3", "4", "5"]
```

## Gaps Configuration

Control spacing between windows and screen edges.

### Basic Gaps

```toml
[gaps]
    inner.horizontal = 10  # Space between windows (left-right)
    inner.vertical = 10    # Space between windows (top-bottom)
    outer.left = 10        # Space from left edge
    outer.bottom = 10      # Space from bottom edge
    outer.top = 10         # Space from top edge
    outer.right = 10       # Space from right edge
```

### Visual Example

```
outer.top = 10
  ↓
  ┌─────────────────────────────────────┐
  │                                     │ outer.left = 10
  │  ┌──────────┐ ← inner.horizontal   │
  │  │  Window  │         10px          │
  │  └──────────┘                       │
  │       ↑                             │
  │  inner.vertical = 10px              │
  │       ↓                             │
  │  ┌──────────┐                       │
  │  │  Window  │                       │ outer.right = 10
  │  └──────────┘                       │
  │                                     │
  └─────────────────────────────────────┘
          ↑
    outer.bottom = 10
```

### Per-Monitor Gaps

Different gap values for different monitors:

```toml
[gaps]
    # Main monitor: larger gaps
    outer.top = [
        { monitor.main = 20 },
        10  # Default for other monitors
    ]
```

**Pattern syntax:**
- `{ monitor.main = 20 }` - Main monitor
- `{ monitor."LG UltraWide" = 30 }` - Monitor by name
- Last value is the default

### Recommended Gap Values

**Minimal (tight layout):**
```toml
[gaps]
    inner.horizontal = 5
    inner.vertical = 5
    outer.left = 5
    outer.bottom = 5
    outer.top = 5
    outer.right = 5
```

**Balanced (recommended):**
```toml
[gaps]
    inner.horizontal = 10
    inner.vertical = 10
    outer.left = 10
    outer.bottom = 10
    outer.top = 10
    outer.right = 10
```

**Spacious (visual breathing room):**
```toml
[gaps]
    inner.horizontal = 20
    inner.vertical = 20
    outer.left = 20
    outer.bottom = 20
    outer.top = 50   # Extra space at top for menu bar
    outer.right = 20
```

## Keybindings

### Main Mode

The default mode where most keybindings live.

```toml
[mode.main.binding]
    # Navigation
    alt-h = 'focus left'
    alt-j = 'focus down'
    alt-k = 'focus up'
    alt-l = 'focus right'

    # Movement
    alt-shift-h = 'move left'
    alt-shift-j = 'move down'
    alt-shift-k = 'move up'
    alt-shift-l = 'move right'

    # Workspaces
    alt-1 = 'workspace 1'
    alt-2 = 'workspace 2'
```

### Custom Keybindings

**Terminal launcher (like i3):**

```toml
[mode.main.binding]
    alt-enter = '''exec-and-forget osascript -e '
    tell application "Terminal"
        do script
        activate
    end tell'
    '''
```

**Browser launcher:**

```toml
[mode.main.binding]
    alt-b = '''exec-and-forget osascript -e '
    tell application "Google Chrome"
        activate
    end tell'
    '''
```

**Close focused window:**

```toml
[mode.main.binding]
    alt-shift-q = 'close'
```

**Fullscreen toggle:**

```toml
[mode.main.binding]
    alt-shift-f = 'fullscreen'
```

### Service Mode

Advanced operations accessed with **⌥⇧;**.

```toml
[mode.service.binding]
    esc = ['reload-config', 'mode main']
    r = ['flatten-workspace-tree', 'mode main']
    f = ['layout floating tiling', 'mode main']
    backspace = ['close-all-windows-but-current', 'mode main']
```

**Add custom service mode actions:**

```toml
[mode.service.binding]
    # Balance all window sizes equally
    b = ['balance-sizes', 'mode main']

    # Toggle between horizontal and vertical split
    t = ['layout tiles horizontal vertical', 'mode main']
```

### Multiple Commands

Execute multiple commands with one keybinding:

```toml
[mode.main.binding]
    # Move to workspace 1 and balance sizes
    alt-shift-1 = ['move-node-to-workspace 1', 'balance-sizes']
```

### Available Commands

Full list: https://nikitabobko.github.io/AeroSpace/commands

**Common commands:**
- `focus <direction>` - Move focus
- `move <direction>` - Move window
- `workspace <name>` - Switch workspace
- `move-node-to-workspace <name>` - Move window to workspace
- `layout <layout>` - Change layout
- `resize <smart|width|height> <+/-pixels>` - Resize window
- `close` - Close focused window
- `fullscreen` - Toggle fullscreen
- `balance-sizes` - Make all windows equal size
- `flatten-workspace-tree` - Reset layout
- `reload-config` - Reload configuration
- `mode <mode-name>` - Switch binding mode

## Key Mapping

AeroSpace supports different keyboard layouts.

```toml
[key-mapping]
    preset = 'qwerty'
```

**Values:**
- `'qwerty'` - Standard US layout (default)
- `'dvorak'` - Dvorak layout
- `'colemak'` - Colemak layout

This ensures hjkl navigation works correctly regardless of your keyboard layout.

## Window Detection Rules

Automatically run commands when specific windows appear.

### Basic Pattern

```toml
[[on-window-detected]]
if.app-id = 'com.apple.finder'
run = 'layout floating'
```

### Find App ID

```bash
aerospace list-windows --all
```

Look for the `app-id` column.

### Common Rules

**Float Finder windows:**

```toml
[[on-window-detected]]
if.app-id = 'com.apple.finder'
run = 'layout floating'
```

**Float System Preferences:**

```toml
[[on-window-detected]]
if.app-id = 'com.apple.systempreferences'
run = 'layout floating'
```

**Send Slack to workspace C:**

```toml
[[on-window-detected]]
if.app-id = 'com.tinyspeck.slackmacgap'
run = 'move-node-to-workspace C'
```

**Send browser to workspace 2:**

```toml
[[on-window-detected]]
if.app-id = 'com.google.Chrome'
run = 'move-node-to-workspace 2'
```

**Multiple conditions:**

```toml
[[on-window-detected]]
if.app-id = 'com.apple.Safari'
if.window-title-regex-substring = 'Private'
run = 'layout floating'
```

### Available Conditions

- `if.app-id` - Application bundle identifier
- `if.app-name-regex-substring` - App name pattern
- `if.window-title-regex-substring` - Window title pattern

### Common App IDs

| App | App ID |
|-----|--------|
| Finder | `com.apple.finder` |
| Safari | `com.apple.Safari` |
| Chrome | `com.google.Chrome` |
| Firefox | `org.mozilla.firefox` |
| VS Code | `com.microsoft.VSCode` |
| Terminal | `com.apple.Terminal` |
| iTerm2 | `com.googlecode.iterm2` |
| Slack | `com.tinyspeck.slackmacgap` |
| Spotify | `com.spotify.client` |
| Obsidian | `md.obsidian` |

## Callbacks

Run commands when events occur.

### on-focused-monitor-changed

When you switch monitors, run a command.

```toml
on-focused-monitor-changed = ['move-mouse monitor-lazy-center']
```

**Effect:** Mouse cursor follows your focus to the new monitor.

**Options:**
- `'move-mouse monitor-lazy-center'` - Center of monitor
- `'move-mouse window-lazy-center'` - Center of focused window
- `[]` - Don't move mouse (empty array)

### after-startup-command

Run commands when AeroSpace starts.

```toml
after-startup-command = [
    'exec-and-forget open -a "Terminal"',
    'exec-and-forget open -a "Google Chrome"'
]
```

**Use cases:**
- Auto-launch frequently used apps
- Set up initial workspace layout
- Run shell scripts

### on-mode-changed

Run commands when binding mode changes.

```toml
on-mode-changed = [
    'exec-and-forget echo "Mode changed to: $MODE" | pbcopy'
]
```

**Available variables:**
- `$MODE` - New mode name

## Example Configurations

### Minimal Developer Setup

```toml
config-version = 2
start-at-login = true
accordion-padding = 30
default-root-container-layout = 'tiles'
default-root-container-orientation = 'auto'

# Small gaps for more screen space
[gaps]
    inner.horizontal = 5
    inner.vertical = 5
    outer.left = 5
    outer.bottom = 5
    outer.top = 5
    outer.right = 5

# Only 3 workspaces
persistent-workspaces = ["1", "2", "3"]

[key-mapping]
    preset = 'qwerty'

[mode.main.binding]
    alt-h = 'focus left'
    alt-j = 'focus down'
    alt-k = 'focus up'
    alt-l = 'focus right'

    alt-shift-h = 'move left'
    alt-shift-j = 'move down'
    alt-shift-k = 'move up'
    alt-shift-l = 'move right'

    alt-1 = 'workspace 1'
    alt-2 = 'workspace 2'
    alt-3 = 'workspace 3'

    alt-shift-1 = 'move-node-to-workspace 1'
    alt-shift-2 = 'move-node-to-workspace 2'
    alt-shift-3 = 'move-node-to-workspace 3'

    alt-minus = 'resize smart -50'
    alt-equal = 'resize smart +50'

    alt-shift-semicolon = 'mode service'

[mode.service.binding]
    esc = ['reload-config', 'mode main']
    r = ['flatten-workspace-tree', 'mode main']
```

### Power User Setup

```toml
config-version = 2
start-at-login = true
accordion-padding = 40
default-root-container-layout = 'tiles'
default-root-container-orientation = 'auto'
automatically-unhide-macos-hidden-apps = true

# Generous gaps
[gaps]
    inner.horizontal = 15
    inner.vertical = 15
    outer.left = 15
    outer.bottom = 15
    outer.top = 50  # Extra space for menu bar
    outer.right = 15

# All workspaces
persistent-workspaces = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]

[key-mapping]
    preset = 'qwerty'

# Mouse follows focus
on-focused-monitor-changed = ['move-mouse monitor-lazy-center']

# Auto-launch apps
after-startup-command = [
    'exec-and-forget open -a "Terminal"',
    'exec-and-forget open -a "Google Chrome"'
]

# Float certain apps
[[on-window-detected]]
if.app-id = 'com.apple.finder'
run = 'layout floating'

[[on-window-detected]]
if.app-id = 'com.apple.systempreferences'
run = 'layout floating'

# Auto-assign apps to workspaces
[[on-window-detected]]
if.app-id = 'com.tinyspeck.slackmacgap'
run = 'move-node-to-workspace 3'

[[on-window-detected]]
if.app-id = 'com.spotify.client'
run = 'move-node-to-workspace 9'

[mode.main.binding]
    # Navigation
    alt-h = 'focus left'
    alt-j = 'focus down'
    alt-k = 'focus up'
    alt-l = 'focus right'

    # Movement
    alt-shift-h = 'move left'
    alt-shift-j = 'move down'
    alt-shift-k = 'move up'
    alt-shift-l = 'move right'

    # Resizing
    alt-minus = 'resize smart -50'
    alt-equal = 'resize smart +50'

    # Workspaces 1-9
    alt-1 = 'workspace 1'
    alt-2 = 'workspace 2'
    alt-3 = 'workspace 3'
    alt-4 = 'workspace 4'
    alt-5 = 'workspace 5'
    alt-6 = 'workspace 6'
    alt-7 = 'workspace 7'
    alt-8 = 'workspace 8'
    alt-9 = 'workspace 9'

    # Move to workspaces 1-9
    alt-shift-1 = 'move-node-to-workspace 1'
    alt-shift-2 = 'move-node-to-workspace 2'
    alt-shift-3 = 'move-node-to-workspace 3'
    alt-shift-4 = 'move-node-to-workspace 4'
    alt-shift-5 = 'move-node-to-workspace 5'
    alt-shift-6 = 'move-node-to-workspace 6'
    alt-shift-7 = 'move-node-to-workspace 7'
    alt-shift-8 = 'move-node-to-workspace 8'
    alt-shift-9 = 'move-node-to-workspace 9'

    # Layout
    alt-slash = 'layout tiles horizontal vertical'
    alt-comma = 'layout accordion horizontal vertical'

    # Workspace navigation
    alt-tab = 'workspace-back-and-forth'
    alt-shift-tab = 'move-workspace-to-monitor --wrap-around next'

    # Service mode
    alt-shift-semicolon = 'mode service'

    # App launchers
    alt-enter = '''exec-and-forget osascript -e '
    tell application "Terminal"
        do script
        activate
    end tell'
    '''

[mode.service.binding]
    esc = ['reload-config', 'mode main']
    r = ['flatten-workspace-tree', 'mode main']
    f = ['layout floating tiling', 'mode main']
    backspace = ['close-all-windows-but-current', 'mode main']
    b = ['balance-sizes', 'mode main']
```

## Tips and Best Practices

### Start Small

Begin with default config, then add customizations one at a time.

### Test Keybindings

After adding a keybinding, test it immediately:

1. Save `~/.aerospace.toml`
2. **⌥⇧;** → **Esc** (reload)
3. Try the new keybinding

### Avoid Conflicts

Don't rebind system shortcuts:
- **⌘Space** - Spotlight
- **⌘Tab** - App switcher
- **⌘Q** - Quit
- **⌘W** - Close window

### Use Comments

Document your config:

```toml
# Personal keybinding: Launch terminal with Cmd-Enter
alt-enter = 'exec-and-forget open -a Terminal'
```

### Version Control

Back up your config:

```bash
cp ~/.aerospace.toml ~/.aerospace.toml.backup
```

Or track in dotfiles repository:

```bash
cd ~/dotfiles
cp ~/.aerospace.toml aerospace.toml
git add aerospace.toml
git commit -m "Add AeroSpace config"
```

### Validate Syntax

If config fails to load, check for:
- Missing quotes around strings
- Unclosed brackets
- Invalid command names

Check AeroSpace logs:

```bash
tail -f ~/Library/Logs/AeroSpace/AeroSpace.log
```

## Advanced Features

### Binding Modes

Create custom modes for different contexts.

```toml
[mode.resize.binding]
    h = 'resize width -50'
    j = 'resize height +50'
    k = 'resize height -50'
    l = 'resize width +50'
    esc = 'mode main'

[mode.main.binding]
    alt-r = 'mode resize'
```

**Usage:**
1. **⌥r** - Enter resize mode
2. **hjkl** - Resize without holding Alt
3. **Esc** - Return to main mode

### Scripting

Execute shell scripts from keybindings:

```toml
[mode.main.binding]
    alt-shift-s = 'exec-and-forget ~/scripts/screenshot-workspace.sh'
```

### Integration with Hammerspoon

AeroSpace CLI can be called from Hammerspoon:

```lua
hs.hotkey.bind({"cmd"}, "1", function()
    os.execute("aerospace workspace 1")
end)
```

## Troubleshooting

### Config Not Loading

1. Check syntax errors
2. Verify file location: `~/.aerospace.toml`
3. Check logs: `~/Library/Logs/AeroSpace/AeroSpace.log`

### Keybinding Not Working

1. Conflict with macOS shortcut?
2. Correct syntax in config?
3. Reload config: **⌥⇧;** → **Esc**

### Window Not Tiling

Some apps resist tiling. Force floating:

```toml
[[on-window-detected]]
if.app-id = 'com.app.name'
run = 'layout floating'
```

## Resources

- [AeroSpace Commands](https://nikitabobko.github.io/AeroSpace/commands) - Full command reference
- [AeroSpace Guide](https://nikitabobko.github.io/AeroSpace/guide) - Official documentation
- [Example Configs](https://github.com/nikitabobko/AeroSpace/discussions) - Community configs

## Related Pages

- [Main Documentation](/aerospace) - Overview and installation
- [Keybindings Reference](/aerospace/keybindings) - Complete keybinding list
- [Workflows](/aerospace/workflows) - Common workflows and use cases
