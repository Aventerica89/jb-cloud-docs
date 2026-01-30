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

## Using with Claude Code

Claude Code can help you extend the architecture, add new models, optimize SwiftData queries, and maintain sync with the web version.

### Adding New SwiftData Models

Tell Claude what you need:

> Add a "Tag" model that can be shared across multiple artifacts

Claude will:
1. Create the SwiftData model
2. Update ModelContainer schema
3. Add migration logic
4. Update UI to display tags
5. Check if web version needs matching changes

Example implementation:
```swift
@Model
final class Tag {
    @Attribute(.unique) var id: String
    var name: String
    var color: String
    var createdAt: Date

    init(name: String, color: String) {
        self.id = UUID().uuidString
        self.name = name
        self.color = color
        self.createdAt = Date()
    }
}

// Update ModelContainer
let schema = Schema([Item.self, Collection.self, Tag.self])
```

### Debugging SwiftData Relationships

Ask Claude to help with relationship issues:

> Items aren't showing their collections properly. Here's my FetchDescriptor: [paste code]

Claude will:
- Review relationship setup
- Check if `collectionId` references are valid
- Suggest using SwiftData relationships vs string references
- Provide migration path if needed

### Optimizing Queries

Tell Claude about performance issues:

> The cleanup utility is slow with 10,000 artifacts

Claude optimizes:
```swift
// Before: Loads all items into memory
let items = try context.fetch(FetchDescriptor<Item>())
let placeholders = items.filter { NameValidator.isPlaceholder($0.name) }

// After: Filter at database level
var descriptor = FetchDescriptor<Item>(
    predicate: #Predicate<Item> { item in
        item.name.contains("...") || item.name == "Untitled"
    }
)
let placeholders = try context.fetch(descriptor)
```

### Adding Custom Validators

Ask Claude to create validation logic:

> Add a validator for file paths to ensure they exist on disk

Claude generates:
```swift
struct FilePathValidator {
    static func exists(_ path: String?) -> Bool {
        guard let path = path else { return false }
        return FileManager.default.fileExists(atPath: path)
    }

    static func isReadable(_ path: String?) -> Bool {
        guard let path = path else { return false }
        return FileManager.default.isReadableFile(atPath: path)
    }
}

// With tests
func testFilePathValidation() {
    XCTAssertTrue(FilePathValidator.exists("/Users/test/file.txt"))
    XCTAssertFalse(FilePathValidator.exists("/nonexistent/path"))
}
```

### Implementing New Features Across Platforms

When adding features that affect both macOS and web:

> Add support for artifact versioning - tracking changes over time

Claude will:
1. Design the data model for both platforms
2. Update SwiftData schema (macOS)
3. Generate D1 migration SQL (web)
4. Update sync rules documentation
5. Implement UI for both platforms

Example sync check:
```swift
// macOS: Item.swift
var versions: [ArtifactVersion]? // New relationship

// Web: migrations.sql
CREATE TABLE artifact_versions (
    id TEXT PRIMARY KEY,
    artifact_id TEXT NOT NULL,
    version_number INTEGER NOT NULL,
    content TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (artifact_id) REFERENCES artifacts(id)
);
```

### Migration Testing

Ask Claude to test schema migrations:

> Test that adding the "starred" field doesn't break existing artifacts

Claude creates test:
```swift
func testStarredFieldMigration() throws {
    // Create item without starred field (old schema)
    let item = Item(name: "Test", ...)

    // Add to context and save
    context.insert(item)
    try context.save()

    // After migration, verify field exists with default value
    XCTAssertFalse(item.isStarred)
}
```

### Analyzing Architecture Decisions

Ask Claude to review design choices:

> Should Collections use SwiftData relationships or string references?

Claude analyzes trade-offs:
**String References (current):**
- ✓ Simple JSON serialization for web sync
- ✓ No cascade delete issues
- ✗ No automatic relationship maintenance

**SwiftData Relationships:**
- ✓ Type-safe, compiler-checked
- ✓ Automatic cascade delete
- ✗ Complex JSON serialization for sync

Claude recommends keeping string references for better web sync compatibility.

### Logging Best Practices

Ask Claude to add structured logging:

> Add logging to track when artifacts are created, updated, and deleted

Claude implements:
```swift
import OSLog

private let logger = Logger(
    subsystem: "jbcloud.Artifact-Manager",
    category: "DataOperations"
)

func createItem(_ item: Item) {
    logger.info("Creating artifact: \(item.name, privacy: .public)")
    logger.debug("Artifact details: type=\(item.artifactType.rawValue), source=\(item.sourceType.rawValue)")
    // ... creation logic
}
```
