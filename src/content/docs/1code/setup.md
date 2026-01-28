---
title: Setup Guide
description: How to build and run 1Code from source
sidebar:
  order: 2
---

# Setup Guide

## Prerequisites

- **Bun** - JavaScript runtime and package manager
- **Python** - Required for native module compilation
- **Xcode Command Line Tools** (macOS) - For native compilation

## Installation

```bash
# Clone the repository
git clone https://github.com/21st-dev/1Code.git
cd 1Code

# Install Bun if not already installed
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install

# Download Claude Code binary (required!)
bun run claude:download

# Build the project
bun run build

# Package for your platform
bun run package:mac      # macOS (DMG + ZIP)
bun run package:win      # Windows (NSIS + portable)
bun run package:linux    # Linux (AppImage + DEB)
```

## Development

```bash
# Start Electron with hot reload
bun run dev
```

## Build Commands

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run build` | Compile the app |
| `bun run package` | Package for current platform (directory) |
| `bun run package:mac` | Build macOS DMG + ZIP |
| `bun run package:win` | Build Windows NSIS + portable |
| `bun run package:linux` | Build Linux AppImage + DEB |

## Database Commands

```bash
# Generate migrations from schema changes
bun run db:generate

# Push schema directly (dev only)
bun run db:push
```

## Troubleshooting

### ARM64 vs x64 Architecture Issues

If building on Apple Silicon and encountering rollup errors:

```bash
# Remove node_modules and reinstall with native architecture
rm -rf node_modules
arch -arm64 bun install
arch -arm64 bun run build
```

### Code Signing (macOS)

For local development without code signing:

```bash
export CSC_IDENTITY_AUTO_DISCOVERY=false
bun run package:mac
```

The app will show a security warning on first launch. Right-click and select "Open" to bypass Gatekeeper.

### Resource Fork Errors

If codesign fails with "resource fork, Finder information, or similar detritus":

```bash
# Strip extended attributes from the project
xattr -cr /path/to/1Code
rm -rf release
bun run package:mac
```

## Output Files

After packaging, find installers in the `release/` directory:

| File | Description |
|------|-------------|
| `1Code-{version}-arm64.dmg` | macOS installer (Apple Silicon) |
| `1Code-{version}.dmg` | macOS installer (Intel) |
| `1Code-{version}-arm64-mac.zip` | Portable (Apple Silicon) |
| `1Code-{version}-mac.zip` | Portable (Intel) |
