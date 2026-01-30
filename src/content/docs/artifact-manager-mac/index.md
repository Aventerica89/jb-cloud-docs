---
title: Artifact Manager (macOS)
description: Native macOS app to track and organize Claude.ai artifacts using SwiftUI and SwiftData
source_project: /Users/jb/.21st/worktrees/artifact-manager-mac/distant-bluff
sidebar:
  order: 0
---

A native macOS application for tracking and organizing artifacts created with Claude.ai. Built with SwiftUI and SwiftData, it provides a fast, offline-first experience for managing your Claude artifacts.

## Why This Exists

Claude.ai creates powerful artifacts (code, documents, images) during conversations, but tracking them across sessions is challenging. This app solves that by providing:

- Local-first storage with SwiftData (no cloud dependency)
- Rich metadata tracking (language, framework, Claude model used)
- Automatic placeholder name detection and cleanup
- Collections for organization
- Support for both published (claude.site) and downloaded artifacts

## Key Features

### Placeholder Name Prevention

Automatically detects and prevents common placeholder names:
- "Saving...", "Loading...", "Downloading..."
- "Untitled", "New Artifact"
- Empty or whitespace-only names

Uses `NameValidator` to sanitize names on creation and provides a cleanup utility for existing artifacts.

### Cleanup Utility

Scan and fix artifacts with placeholder names:
- Visual list of affected artifacts
- Batch rename based on artifact type
- Generates unique names automatically
- Non-destructive (updates modifiedAt timestamp)

### Rich Metadata

Track comprehensive artifact details:
- **Source**: Published (claude.site URL) or Downloaded (local file)
- **Type**: File, Image, Document, Code, Archive, Other
- **Metadata**: Language, framework, Claude model, conversation URL
- **Organization**: Collections, favorites, tags
- **Timestamps**: Created, modified, artifact creation date

### Collections

Group related artifacts:
- Custom names and slugs
- Color coding and icons
- Optional descriptions
- Reference by collectionId

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | SwiftUI |
| Persistence | SwiftData |
| Language | Swift 6+ |
| Platform | macOS 14+ |
| Testing | XCTest (42 tests, 100% core coverage) |
| IDE | Xcode |

## Companion Web App

This macOS app has a companion web version built with Cloudflare Workers:

- **Web App**: https://artifact-manager.jbmd-creations.workers.dev
- **Tech**: Cloudflare Workers, D1 (SQLite), Cloudflare Access
- **Sync Rule**: Core features (validation, cleanup, models) must stay in sync

See [Synchronization Rules](/artifact-manager-mac/sync-rules) for details.

## Quick Start

### Prerequisites
- macOS 14 (Sonoma) or later
- Xcode 15+
- Swift 6+

### Clone and Build
```bash
git clone https://github.com/Aventerica89/artifact-manager-mac.git
cd artifact-manager-mac
open "Artifact Manager.xcodeproj"
```

Press `Cmd+R` in Xcode to build and run.

### Run Tests
```bash
swift test
# Expected: ✔ Test run with 42 tests in 3 suites passed
```

## Project Structure

```
Artifact Manager/
├── Artifact_ManagerApp.swift    # App entry point with ModelContainer setup
├── ContentView.swift             # Main UI, Add/Edit views
├── Item.swift                    # SwiftData artifact model
├── Collection.swift              # SwiftData collection model
├── ArtifactType.swift            # Type enum with SF Symbols
├── NameValidator.swift           # Placeholder detection/sanitization
└── CleanupUtility.swift          # Cleanup UI and batch operations

ArtifactManagerTests/
├── ArtifactTypeTests.swift       # Type enum tests
├── FileSizeFormatterTests.swift  # Size formatting tests
└── NameValidatorTests.swift      # Validation logic tests
```

## Usage Examples

### Adding a Published Artifact
1. Open Artifact Manager
2. Click "Add Artifact"
3. Choose "Published" as source
4. Paste claude.site URL
5. Add metadata (language, framework, model)
6. Save

### Cleaning Up Placeholder Names
1. Click "Utilities" → "Cleanup"
2. Review list of artifacts with placeholder names
3. Click "Fix All Names"
4. Artifacts renamed to `{type} 1`, `{type} 2`, etc.

### Organizing with Collections
1. Create a collection (e.g., "Next.js Components")
2. Set color and icon
3. Assign artifacts to collection via collectionId
4. Filter by collection in main view

## Repository

[GitHub: artifact-manager-mac](https://github.com/Aventerica89/artifact-manager-mac)

## Using with Claude Code

Claude Code can help you develop SwiftUI features, write tests, debug SwiftData issues, and maintain sync with the web version.

### Running Tests

Ask Claude to run the test suite:

```bash
swift test
```

Claude interprets test results and diagnoses failures:
- Test name validation logic
- SwiftData model relationships
- File size formatting
- Artifact type detection

### Adding New Features

Tell Claude what you need:

> Add a "starred" field to artifacts so users can mark favorites

Claude will:
1. Update the SwiftData model (`Item.swift`)
2. Add migration logic if needed
3. Update SwiftUI views with star icon
4. Write tests for the new field
5. Check [Synchronization Rules](/artifact-manager-mac/sync-rules) for web version compatibility

Example implementation:
```swift
@Model
final class Item {
    var name: String
    var isStarred: Bool = false  // New field
    // ... existing fields
}

// In ContentView.swift
Button {
    item.isStarred.toggle()
} label: {
    Image(systemName: item.isStarred ? "star.fill" : "star")
}
```

### Debugging SwiftData Issues

Share SwiftData errors with Claude:

> I'm getting "failed to load persistent stores" when launching the app

Claude will:
- Check ModelContainer configuration
- Verify schema changes are handled
- Suggest migration strategies
- Test with a fresh database

### Building New Views

Ask Claude to create SwiftUI components:

> Create a detail view that shows all artifact metadata in a nice layout

Claude generates SwiftUI code following macOS design patterns:
```swift
struct ArtifactDetailView: View {
    let artifact: Item

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                // Metadata sections
                // Claude generates proper layout
            }
        }
        .frame(minWidth: 400, minHeight: 300)
    }
}
```

### Maintaining Web Version Sync

When adding features, Claude checks sync rules:

> I want to add a "tags" field. Does this need to be synced to the web version?

Claude reviews [Synchronization Rules](/artifact-manager-mac/sync-rules) and advises:
- Core features (validation, models) → Must sync
- UI-only features (window size, themes) → Mac-specific
- Provides implementation for both versions if needed

### Performance Optimization

Ask Claude to profile SwiftData queries:

> The artifacts list is slow with 1000+ items

Claude suggests:
```swift
// Add indexes to frequently queried fields
@Attribute(.unique) var id: UUID
@Attribute(.indexed) var createdAt: Date
@Attribute(.indexed) var type: ArtifactType
```

### Code Reviews

Ask Claude to review Swift code:

> Review this NameValidator implementation for edge cases: [paste code]

Claude checks for:
- Unicode handling
- Memory safety
- SwiftUI best practices
- Test coverage gaps

### Xcode Build Commands

Claude can run Xcode commands from terminal:

```bash
# Build for testing
xcodebuild -scheme "Artifact Manager" -destination 'platform=macOS' build-for-testing

# Run tests
xcodebuild test -scheme "Artifact Manager" -destination 'platform=macOS'

# Archive for distribution
xcodebuild archive -scheme "Artifact Manager" -archivePath ./build/ArtifactManager.xcarchive
```

## Recent Updates

### 2026-01-28: Feature Parity with Web Version
- Added NameValidator for placeholder detection
- Added CleanupUtility with SwiftUI
- Expanded Item model with rich metadata
- Created Collection model
- Comprehensive test suite (42 tests)
- Full sync with web version
