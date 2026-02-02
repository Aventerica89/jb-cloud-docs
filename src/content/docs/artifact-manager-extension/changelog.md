---
title: Extension Changelog
description: Version history for the Artifact Manager browser extensions
sidebar:
  order: 1
---

All notable changes to the Artifact Manager Browser Extensions are documented here.

## [1.1.0] - 2026-02-01

### Fixed
- **Button Placement**: Save button now integrates with existing UI instead of overlapping the artifact title
- **Button Positioning**: Uses 3-strategy approach (existing container > action area > new row)

### Changed
- **Button Styling**: Made Save button more compact (6px/12px padding, 12px font) to fit inline with other buttons
- **Removed**: Absolute positioning that caused overlap issues

### Added
- **Unit Tests**: Added `content.test.js` with tests for button placement logic
- **CSS Class**: Added `.artifact-manager-btn-row` for new button containers
- **Version Display**: Version now shown in extension popup footer
- **Changelog Link**: Footer links to changelog on GitHub

## [1.0.0] - 2026-01-28

### Added
- **Initial Release**
- **One-Click Save**: Save artifacts from Claude.ai with a single click
- **Automatic Detection**: Uses MutationObserver to detect new artifacts
- **Content Extraction**: Multi-method extraction (clipboard, iframe, code blocks)
- **Placeholder Validation**: Rejects names like "Saving...", "Loading...", "Untitled"
- **Published URL Support**: Captures claude.site URLs automatically
- **Connection Status**: Popup shows connection status and stats
- **Configurable URL**: Set your Artifact Manager instance URL

### Technical Details
- Manifest V3 for Chrome
- Cross-browser API compatibility (Chrome/Safari)
- Debounced MutationObserver for performance
- Service worker background script

---

## Upcoming Features

### v1.2.0 (Planned)
- Safari extension officially published
- Keyboard shortcut for quick save
- Batch save for multiple artifacts
- Offline queue for failed saves

## Contributing

Found a bug or have a feature request? [Open an issue on GitHub](https://github.com/Aventerica89/cf-url-shortener/issues).
