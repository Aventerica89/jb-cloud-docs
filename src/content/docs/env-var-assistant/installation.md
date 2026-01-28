---
title: Installation Guide
description: Set up Env Var Assistant with Chrome, Safari, and 1Password
source_project: /Users/jb/env-var-assistant
sidebar:
  order: 1
---

## Prerequisites

Before installing, ensure you have:

- **Google Chrome** or **Safari 15.4+** (macOS)
- **1Password CLI** installed and authenticated
- **Node.js 18+** for the Chrome native messaging host (not needed for Safari)

## Install 1Password CLI

### macOS (Homebrew)

```bash
brew install 1password-cli
```

### Verify Installation

```bash
op --version
# Should output: 2.x.x

# Sign in (if not using biometric unlock)
op signin
```

## Install the Extension

### Chrome

#### Option 1: Load Unpacked (Development)

1. Clone the repository:
   ```bash
   git clone https://github.com/jbmd/env-var-assistant.git
   cd env-var-assistant
   ```

2. Open Chrome and navigate to `chrome://extensions`

3. Enable **Developer mode** (toggle in top right)

4. Click **Load unpacked** and select the `extension` folder

#### Option 2: Chrome Web Store

Coming soon!

### Safari (macOS)

The Safari version uses Apple's Web Extension API and includes a native Swift app extension handler.

#### Build from Source

1. Clone the repository:
   ```bash
   git clone https://github.com/jbmd/env-var-assistant.git
   cd env-var-assistant
   ```

2. Open the Xcode project:
   ```bash
   open safari/Env\ Var\ Assistant/Env\ Var\ Assistant.xcodeproj
   ```

3. Select your Development Team in Signing & Capabilities

4. Build and run (Cmd+R)

5. The app will launch and install the Safari extension

6. Enable the extension in Safari:
   - Open Safari > Settings > Extensions
   - Check "Env Var Assistant"
   - Grant permissions when prompted

#### Add to Login Items (Optional)

To have the extension available immediately on login:

```bash
osascript -e 'tell application "System Events" to make login item at end with properties {path:"/Applications/Env Var Assistant.app", hidden:true}'
```

Or manually: System Settings > General > Login Items > add "Env Var Assistant"

## Install Native Host (Chrome Only)

The native messaging host allows the Chrome extension to communicate with the 1Password CLI. Safari uses a built-in Swift handler instead.

```bash
cd env-var-assistant/native-host
./install.sh
```

This script:
1. Creates the native messaging host manifest
2. Registers it with Chrome
3. Sets correct permissions

### Manual Installation (if script fails)

1. Copy the manifest to Chrome's native messaging directory:

   **macOS:**
   ```bash
   mkdir -p ~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts
   cp com.envvar.assistant.json ~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts/
   ```

2. Update the manifest path to point to `host.js`:
   ```json
   {
     "name": "com.envvar.assistant",
     "description": "Env Var Assistant Native Host",
     "path": "/Users/YOUR_USERNAME/env-var-assistant/native-host/host.js",
     "type": "stdio",
     "allowed_origins": ["chrome-extension://YOUR_EXTENSION_ID/"]
   }
   ```

3. Make the host executable:
   ```bash
   chmod +x /path/to/host.js
   ```

## Verify Installation

1. Open the extension popup by clicking the icon in Chrome toolbar

2. Check the connection status - should show **"Connected to 1Password"** with a green dot

3. If you see an error:
   - Ensure 1Password CLI is authenticated: `op vault list`
   - Check native host installation: Look for errors in Chrome's console
   - Verify the manifest path is correct

## MCP Server (Optional)

For Claude Code integration, install the MCP server:

```bash
cd env-var-assistant/mcp-server
npm install
npm run build
```

Add to your `~/.mcp.json`:

```json
{
  "mcpServers": {
    "env-var-assistant": {
      "command": "node",
      "args": ["/path/to/env-var-assistant/mcp-server/dist/index.js"]
    }
  }
}
```

Restart Claude Code to load the new MCP server.

## Troubleshooting

### "Native host not found"

The Chrome extension can't find the native messaging host.

1. Verify manifest location:
   ```bash
   ls ~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts/
   ```

2. Check manifest contents - ensure `path` is absolute and correct

3. Reload the extension in `chrome://extensions`

### "1Password CLI not authenticated"

The CLI needs to be signed in.

```bash
# Check current session
op whoami

# Sign in if needed
op signin
```

### "Permission denied"

The host script needs execute permission.

```bash
chmod +x /path/to/native-host/host.js
```

### Extension not detecting keys

1. Ensure clipboard permissions are granted
2. Click anywhere on the page before using "Check Clipboard"
3. Verify the key format is in the [supported patterns list](/env-var-assistant/patterns)
