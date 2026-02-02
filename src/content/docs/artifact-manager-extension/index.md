---
title: Artifact Manager Browser Extension
description: Chrome and Safari extensions to save Claude.ai artifacts with one click
source_project: /Users/jb/cf-url-shortener/chrome-extension
sidebar:
  order: 0
---

Browser extensions for Chrome and Safari that add "Save" buttons to Claude.ai artifact panels, allowing one-click saving to your Artifact Manager instance.

## Quick Links

- [Chrome Extension (GitHub)](https://github.com/Aventerica89/cf-url-shortener/tree/main/chrome-extension)
- [Changelog](./changelog)
- [Web App](https://artifacts.jbcloud.app)

## Features

### One-Click Save
Adds a "Save" button directly to Claude.ai artifact panels. Click once to save the artifact's content, metadata, and published URL to your Artifact Manager.

### Smart Content Extraction
Extracts artifact content using multiple fallback methods:
1. Clipboard API (click Copy button automatically)
2. Iframe srcdoc/content
3. Code block extraction
4. Published URL fetching

### Placeholder Name Prevention
Validates artifact names before saving to prevent placeholder names like:
- "Saving...", "Loading...", "Downloading..."
- "Untitled", "New Artifact"
- Empty or whitespace-only names

### Connection Status
Popup shows connection status to your Artifact Manager instance with stats (total artifacts, favorites, collections).

## Installation

### Chrome
1. Download the extension from [GitHub releases](https://github.com/Aventerica89/cf-url-shortener/releases)
2. Go to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension folder
5. Click the extension icon and configure your Artifact Manager URL

### Safari
1. Convert from Chrome extension:
   ```bash
   cd /Users/jb/cf-url-shortener
   xcrun safari-web-extension-converter chrome-extension --app-name "Artifact Manager" --force
   ```
2. Open the generated Xcode project
3. Build and run
4. Enable in Safari > Settings > Extensions

## Configuration

Click the extension icon in your browser toolbar to access settings:

1. **Artifact Manager URL**: Enter your instance URL (e.g., `https://artifacts.jbcloud.app`)
2. **Test Connection**: Verify the extension can communicate with your instance
3. **Open Artifact Manager**: Quick link to your dashboard

## How It Works

### Button Placement (v1.1.0+)
The extension uses a 3-strategy approach to place Save buttons:

1. **Existing Container**: Find button containers (`flex gap`) and insert there
2. **Action Area**: Find action/footer areas and insert at beginning
3. **New Row**: Create `.artifact-manager-btn-row` at bottom of card

### Content Extraction Flow
```
1. User clicks Save
2. Extension extracts artifact data (name, type, language)
3. Attempts clipboard extraction (clicks Copy button)
4. Falls back to iframe/code block extraction
5. Sends to Artifact Manager API
6. Shows success/error notification
```

## Related Projects

- [Artifact Manager (macOS)](../artifact-manager-mac) - Native SwiftUI app
- [Artifact Manager Web App](../linkshort) - Cloudflare Worker web application
