---
title: Synchronization Rules
description: Guidelines for keeping macOS and web versions in sync
sidebar:
  order: 3
---

## Overview

Artifact Manager exists in two implementations:

| Platform | Location | Tech Stack |
|----------|----------|------------|
| macOS | `/Users/jb/.21st/worktrees/artifact-manager-mac/distant-bluff` | Swift, SwiftUI, SwiftData |
| Web | `/Users/jb/cf-url-shortener/artifacts-app/` | Cloudflare Workers, D1, HTML/JS |

**Core Rule:** When modifying core functionality, apply the same changes to both versions.

## Core Features That Must Sync

### 1. Name Validation (NameValidator)

**Purpose:** Prevent placeholder names like "Saving...", "Loading...", "Downloading..."

**macOS Location:**
```
Artifact Manager/NameValidator.swift
```

**Web Locations:**
```
worker.js (line ~2370) - Client-side validation
worker.js (line ~607)  - Server-side validation
```

**Required Sync:**
- Placeholder pattern list (exact same strings)
- Detection logic (must reject same inputs)
- Sanitization behavior (same fallback)

**Example Change:**
If you add "Processing..." to placeholders:

```swift
// macOS (NameValidator.swift)
private static let placeholderPatterns = [
    "Saving...",
    "Loading...",
    "Processing...",  // NEW
    // ...
]
```

```javascript
// Web (worker.js)
const placeholderPatterns = [
    'Saving...',
    'Loading...',
    'Processing...',  // NEW
    // ...
];
```

### 2. Placeholder Patterns

**Current Patterns (MUST MATCH EXACTLY):**
- "Saving..."
- "Loading..."
- "Downloading..."
- "Untitled"
- "New Artifact"
- Empty strings
- Whitespace-only strings
- Patterns starting with "Untitled" (e.g., "Untitled 1")

**Testing:**
Both versions must reject the same inputs:
```
"Saving..."      → REJECT
"Loading..."     → REJECT
"Untitled 42"    → REJECT
"   "            → REJECT
"My Artifact"    → ACCEPT
```

### 3. Cleanup Utility

**Purpose:** Scan and fix existing artifacts with placeholder names

**macOS Location:**
```
Artifact Manager/CleanupUtility.swift
- CleanupUtility struct (logic)
- CleanupUtilityView (SwiftUI)
```

**Web Location:**
```
worker.js
- /api/cleanup/scan endpoint
- /api/cleanup/fix endpoint
Cleanup modal in HTML
```

**Required Sync:**
- Scanning logic (same detection)
- Fix algorithm (same name generation)
- Batch operation behavior

**Example:**
If you change unique name generation:

```swift
// macOS (CleanupUtility.swift)
let uniqueName = NameValidator.generateUniqueName(
    baseName: item.artifactType.rawValue,
    existingNames: existingNames
)
```

```javascript
// Web (worker.js /api/cleanup/fix)
const uniqueName = generateUniqueName(
    artifact.artifactType,
    existingNames
);
```

### 4. Artifact Model

**Purpose:** Data structure for artifacts

**macOS Location:**
```
Artifact Manager/Item.swift (SwiftData @Model)
```

**Web Location:**
```
migrations.sql (D1 schema)
```

**Required Fields (MUST MATCH):**

| Field | Type | Description |
|-------|------|-------------|
| name | String | Validated name |
| description | String | User description |
| artifactType | Enum | File, Image, Document, Code, Archive, Other |
| sourceType | Enum | published, downloaded |
| publishedUrl | String? | claude.site URL (published only) |
| artifactId | String? | Extracted ID (published only) |
| fileName | String? | Original filename (downloaded only) |
| filePath | String? | Local path (macOS only) |
| fileContent | String? | File contents |
| language | String? | Programming language |
| framework | String? | Framework used |
| claudeModel | String? | Claude model |
| conversationUrl | String? | Conversation link |
| notes | String? | User notes |
| collectionId | String? | Collection reference |
| isFavorite | Bool | Favorite flag |
| tags | Array | Tags |
| createdAt | Date | Created timestamp |
| modifiedAt | Date | Modified timestamp |
| artifactCreatedAt | Date? | Original artifact date |

**Example:**
Adding new field "projectType":

```swift
// macOS (Item.swift)
@Model
final class Item {
    // ...
    var projectType: String?
    // ...
}
```

```sql
-- Web (migrations.sql)
ALTER TABLE artifacts ADD COLUMN projectType TEXT;
```

### 5. Collection Model

**macOS Location:**
```
Artifact Manager/Collection.swift
```

**Web Location:**
```
migrations.sql (collections table)
```

**Required Fields:**

| Field | Type | Description |
|-------|------|-------------|
| id | String | UUID |
| name | String | Display name |
| slug | String | URL-safe identifier |
| description | String? | Optional description |
| color | String | Hex color |
| icon | String | Icon identifier |
| createdAt | Date | Created timestamp |

## Workflow for Adding Features

### Step 1: Implement in Web Version First

Reason: Faster to test and deploy

```bash
cd /Users/jb/cf-url-shortener/artifacts-app/

# Make changes to worker.js
# Test locally
wrangler dev

# Deploy
wrangler deploy
```

### Step 2: Translate to macOS Swift

Convert JavaScript logic to Swift:

**Example: New Validation Rule**

```javascript
// Web (worker.js)
function isValidArtifactName(name) {
    if (name.length < 3) return false;
    if (name.length > 100) return false;
    return true;
}
```

```swift
// macOS (NameValidator.swift)
static func isValidArtifactName(_ name: String) -> Bool {
    if name.count < 3 { return false }
    if name.count > 100 { return false }
    return true
}
```

### Step 3: Test Both Versions

**Web:**
```bash
cd /Users/jb/cf-url-shortener/artifacts-app/
wrangler dev
# Manual testing in browser
```

**macOS:**
```bash
cd /Users/jb/.21st/worktrees/artifact-manager-mac/distant-bluff
swift test
# Expected: All 42+ tests pass
open "Artifact Manager.xcodeproj"
# Press Cmd+R to test manually
```

### Step 4: Deploy Web, Build macOS

**Web:**
```bash
wrangler deploy
```

**macOS:**
```bash
swift build
swift test
# Distribute via Xcode Archive if releasing
```

## Key Differences (These DON'T Need to Sync)

### Storage

| Platform | Technology | Location |
|----------|-----------|----------|
| macOS | SwiftData | `~/Library/Containers/jbcloud.Artifact-Manager/Data/Library/Application Support/` |
| Web | D1 (SQLite) | Cloudflare edge database |

No sync needed - each platform manages its own data.

### Authentication

| Platform | Auth Method |
|----------|-------------|
| macOS | None (local-only app) |
| Web | Cloudflare Access |

No sync needed - macOS has no auth.

### UI Framework

| Platform | Framework | Components |
|----------|-----------|-----------|
| macOS | SwiftUI | Native macOS controls |
| Web | Vanilla HTML/JS | Custom web components |

No sync needed - UI is platform-specific.

### Deployment

| Platform | Method | Command |
|----------|--------|---------|
| macOS | Xcode Archive | Product → Archive |
| Web | Wrangler | `wrangler deploy` |

No sync needed - different deployment targets.

### File Storage

| Platform | Approach |
|----------|----------|
| macOS | Local filesystem (filePath field) |
| Web | R2 or base64 in database |

No sync needed - platform-specific storage.

## Testing Checklist

When modifying core features, verify:

### NameValidator Changes

- [ ] macOS tests pass (`NameValidatorTests.swift`)
- [ ] Web validation rejects same inputs
- [ ] Both use same placeholder patterns
- [ ] Sanitization produces same fallback

### Cleanup Utility Changes

- [ ] macOS CleanupUtility finds same items
- [ ] Web `/api/cleanup/scan` finds same items
- [ ] Both generate same unique names
- [ ] Both update modifiedAt timestamp

### Model Changes

- [ ] macOS SwiftData schema updated
- [ ] Web D1 migration created
- [ ] Both support same fields
- [ ] Both use same enums/types

### Collection Changes

- [ ] macOS Collection model updated
- [ ] Web collections table updated
- [ ] Both support same fields
- [ ] Color/icon systems compatible

## Common Sync Mistakes

### Mistake 1: Forgetting Web Validation

```swift
// Updated macOS Item.swift
init(name: String, ...) {
    self.name = NameValidator.sanitize(name)  // ✓
}
```

```javascript
// Forgot to update web worker.js
async function createArtifact(data) {
    // Missing: data.name = sanitizeName(data.name)
    await db.insert(artifacts).values(data)  // ✗
}
```

**Fix:** Always update both client AND server validation in web version.

### Mistake 2: Different Placeholder Lists

```swift
// macOS (NameValidator.swift)
private static let placeholderPatterns = [
    "Saving...",
    "Loading...",
    "Processing..."  // Added
]
```

```javascript
// Web (worker.js)
const placeholderPatterns = [
    'Saving...',
    'Loading...'
    // Forgot "Processing..."
];
```

**Fix:** Copy-paste the exact list to ensure sync.

### Mistake 3: Incompatible Enums

```swift
// macOS (ArtifactType.swift)
enum ArtifactType: String {
    case file = "File"
    case image = "Image"
    case video = "Video"  // Added
}
```

```javascript
// Web (worker.js)
const validArtifactTypes = ['file', 'image', 'code', 'archive'];
// Missing 'video'
```

**Fix:** Update enum lists in both versions simultaneously.

## Version Control Strategy

### Commit Messages

When syncing features:

```bash
# macOS repo
git commit -m "feat: add video artifact type to match web version"

# Web repo
git commit -m "feat: add video artifact type to match macOS version"
```

### Pull Requests

Link PRs across repos:

```markdown
## Description
Adds support for video artifacts.

## Related
- macOS PR: Aventerica89/artifact-manager-mac#42
- Web PR: Aventerica89/artifacts-app#15

## Sync Checklist
- [x] NameValidator updated in both
- [x] ArtifactType enum updated
- [x] Tests pass in both versions
- [x] Cleanup utility handles new type
```

## Future: Automated Sync

Potential improvements:

### Shared Schema Definition

Define model once, generate Swift + SQL:

```yaml
# schema.yml
Artifact:
  fields:
    name: { type: string, required: true }
    description: { type: string }
    artifactType: { type: enum, values: [file, image, code] }
    # ...
```

Generate:
- `Item.swift` for macOS
- `migrations.sql` for web
- `types.ts` for web TypeScript

### Shared Validation Library

Extract validation to JSON rules:

```json
{
  "placeholderPatterns": [
    "Saving...",
    "Loading...",
    "Downloading..."
  ],
  "minNameLength": 3,
  "maxNameLength": 100
}
```

Load in both platforms.

## Questions?

If unsure whether a change needs sync:

1. Does it affect data structure? → YES, sync
2. Does it affect validation logic? → YES, sync
3. Does it affect cleanup behavior? → YES, sync
4. Is it UI/styling only? → NO, platform-specific
5. Is it deployment/auth related? → NO, platform-specific

When in doubt, sync. Better to be consistent.
