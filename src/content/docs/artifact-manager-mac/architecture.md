---
title: Architecture
description: Technical design and implementation details
sidebar:
  order: 1
---

## System Architecture

Artifact Manager uses a modern SwiftUI + SwiftData architecture for offline-first, native macOS performance.

```
┌─────────────────────────────────────┐
│         SwiftUI Views               │
│  (ContentView, CleanupUtilityView)  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│       ModelContainer                │
│    (SwiftData Persistence)          │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│    Model Layer                      │
│  • Item (artifacts)                 │
│  • Collection (organization)        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│    Utility Layer                    │
│  • NameValidator                    │
│  • CleanupUtility                   │
│  • FileSizeFormatter                │
└─────────────────────────────────────┘
```

## Data Models

### Item (Artifact)

SwiftData model representing a Claude artifact.

**Core Fields:**
- `name: String` - Validated to prevent placeholders
- `itemDescription: String` - User-provided description
- `artifactType: ArtifactType` - Enum: File, Image, Document, Code, Archive, Other
- `sourceType: SourceType` - Enum: published, downloaded

**Published Artifacts:**
- `publishedUrl: String?` - claude.site URL
- `artifactId: String?` - Extracted from URL

**Downloaded Artifacts:**
- `fileName: String?` - Original filename
- `filePath: String?` - Local file path
- `fileSize: Int64?` - Size in bytes
- `fileContent: String?` - File contents (for text files)

**Metadata:**
- `language: String?` - Programming language or content type
- `framework: String?` - Framework used (e.g., Next.js, React)
- `claudeModel: String?` - Claude model that created it
- `conversationUrl: String?` - Link to original conversation
- `notes: String?` - User notes

**Organization:**
- `collectionId: String?` - Reference to Collection
- `isFavorite: Bool` - Favorite flag
- `tags: [String]` - Searchable tags

**Timestamps:**
- `createdAt: Date` - When added to app
- `modifiedAt: Date` - Last updated
- `artifactCreatedAt: Date?` - Original artifact creation
- `timestamp: Date` - Backwards compatibility

**Computed Properties:**
- `formattedFileSize: String?` - Human-readable size (e.g., "1.2 MB")

**Key Implementation Detail:**
```swift
init(name: String, ...) {
    // Sanitize name to prevent placeholder names
    self.name = NameValidator.sanitize(name)
    // ...
}
```

### Collection

SwiftData model for grouping artifacts.

**Fields:**
- `id: String` - UUID, primary key
- `name: String` - Display name
- `slug: String` - URL-safe identifier
- `collectionDescription: String?` - Optional description
- `color: String` - Hex color (default: #6366f1)
- `icon: String` - SF Symbol name (default: folder)
- `createdAt: Date` - Creation timestamp

**Relationship:**
Items reference collections via `collectionId` (string reference, not SwiftData relationship).

### ArtifactType

Enum with SF Symbol mapping.

```swift
enum ArtifactType: String, Codable, CaseIterable {
    case file, image, document, code, archive, other

    var systemImage: String {
        // Maps to SF Symbols: doc, photo, doc.text, etc.
    }
}
```

### SourceType

Enum for artifact source.

```swift
enum SourceType: String, Codable, CaseIterable {
    case published    // From claude.site URL
    case downloaded   // Local file
}
```

## Core Components

### NameValidator

Detects and sanitizes placeholder names.

**Placeholder Patterns:**
- "Saving...", "Loading...", "Downloading..."
- "Untitled", "New Artifact"
- Empty or whitespace-only strings

**Methods:**
- `isPlaceholder(_ name: String) -> Bool` - Check if name is placeholder
- `sanitize(_ name: String, fallback: String) -> String` - Replace placeholders
- `generateUniqueName(baseName: String, existingNames: [String]) -> String` - Create unique name

**Algorithm:**
```swift
static func sanitize(_ name: String, fallback: String = "Artifact") -> String {
    let trimmed = name.trimmingCharacters(in: .whitespacesAndNewlines)
    return isPlaceholder(trimmed) ? fallback : trimmed
}
```

### CleanupUtility

Batch operations for fixing placeholder names.

**Methods:**
- `findPlaceholderArtifacts(in context: ModelContext) throws -> [Item]`
  - Scans all items
  - Returns those with placeholder names

- `cleanupPlaceholderArtifacts(in context: ModelContext) throws -> Int`
  - Finds all placeholders
  - Generates unique names based on artifact type
  - Updates `name` and `modifiedAt`
  - Returns count of fixed items

**UI Component:**
`CleanupUtilityView` - SwiftUI view with:
- Async scanning on load
- List of affected items with preview
- Confirmation dialog before fix
- Success/error feedback

### FileSizeFormatter

Human-readable file size formatting.

```swift
struct FileSizeFormatter {
    static func format(_ bytes: Int64) -> String {
        ByteCountFormatter()
            .allowedUnits([.useAll])
            .countStyle(.file)
            .string(fromByteCount: bytes)
    }
}
```

Output examples: "1.2 MB", "456 KB", "3.5 GB"

## Persistence Layer

### ModelContainer Setup

Configured in `Artifact_ManagerApp.swift`:

```swift
init() {
    let schema = Schema([Item.self, Collection.self])
    let config = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

    do {
        sharedModelContainer = try ModelContainer(for: schema, configurations: [config])
    } catch {
        // Fallback to in-memory storage
        // App remains functional even if persistence fails
    }
}
```

**Error Handling Strategy:**
1. Try persistent storage
2. On failure, fallback to in-memory storage
3. Log errors via OSLog
4. Never crash on storage initialization

### Data Location

SwiftData stores artifacts at:
```
~/Library/Containers/jbcloud.Artifact-Manager/Data/Library/Application Support/
```

## Testing Architecture

### Test Coverage: 42 Tests, 100% Core Logic

**ArtifactTypeTests.swift:**
- Enum raw values
- System image mapping
- Case iteration
- Codable conformance

**FileSizeFormatterTests.swift:**
- Byte formatting (B, KB, MB, GB)
- Edge cases (0, negative)
- Large files (TB+)

**NameValidatorTests.swift:**
- Placeholder detection (all patterns)
- Sanitization with fallback
- Unique name generation
- Edge cases (whitespace, empty)

### Test Patterns

```swift
func testPlaceholderDetection() {
    XCTAssertTrue(NameValidator.isPlaceholder("Saving..."))
    XCTAssertTrue(NameValidator.isPlaceholder("Loading..."))
    XCTAssertTrue(NameValidator.isPlaceholder("Untitled"))
    XCTAssertFalse(NameValidator.isPlaceholder("My Artifact"))
}
```

## SwiftUI Views

### ContentView

Main interface with three sub-views:
- Artifact list (FetchDescriptor query)
- Add item sheet
- Edit item sheet

Uses `@Query` macro for reactive data binding.

### CleanupUtilityView

Modal sheet with:
- `.task` modifier for async scanning
- `@State` for local UI state
- `@Environment(\.modelContext)` for data access
- `@Environment(\.dismiss)` for dismissal

## Logging

Uses OSLog for structured logging:

```swift
import OSLog

private let logger = Logger(
    subsystem: "jbcloud.Artifact-Manager",
    category: "DataStore"
)

logger.error("Failed to create ModelContainer: \(error)")
logger.warning("Using in-memory storage as fallback")
logger.critical("All storage options failed")
```

Categories: DataStore, UI, Validation

## Performance Considerations

### SwiftData Optimization

- FetchDescriptor with predicates (no full table scans)
- Lazy loading of fileContent (stored but not always loaded)
- Batch operations in CleanupUtility
- In-memory fallback prevents UI blocking

### UI Performance

- Async scanning in CleanupUtilityView
- ContentUnavailableView for empty states
- ProgressView for loading states
- Efficient List rendering with @Query

## Security

### Data Privacy

- All data stored locally (no cloud sync)
- No network requests (offline-first)
- No telemetry or analytics
- User controls all data

### Input Validation

- Name sanitization prevents injection
- Type-safe enums prevent invalid states
- Non-optional core fields prevent nil crashes

## Migration Strategy

Model includes `timestamp` for backwards compatibility:

```swift
var timestamp: Date  // Old field
var createdAt: Date  // New field
var modifiedAt: Date // New field
```

SwiftData handles schema migrations automatically when adding fields with default values.

## Sync with Web Version

Core components that must match web implementation:

| Component | macOS | Web |
|-----------|-------|-----|
| NameValidator | Swift struct | JavaScript function |
| Placeholder patterns | Hardcoded array | Same hardcoded array |
| CleanupUtility | Swift + SwiftUI | API endpoints + modal |
| Item model | SwiftData @Model | D1 schema (migrations.sql) |
| Collection model | SwiftData @Model | D1 schema |

See [Synchronization Rules](/artifact-manager-mac/sync-rules) for workflow.
