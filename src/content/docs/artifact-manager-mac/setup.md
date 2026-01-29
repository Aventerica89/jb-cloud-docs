---
title: Development Setup
description: How to build, test, and develop the macOS app
sidebar:
  order: 2
---

## Prerequisites

### Required

| Requirement | Version | Download |
|-------------|---------|----------|
| macOS | 14 (Sonoma)+ | Pre-installed |
| Xcode | 15+ | [Mac App Store](https://apps.apple.com/app/xcode/id497799835) |
| Swift | 6+ | Included with Xcode |

### Verify Installation

```bash
# Check Xcode version
xcodebuild -version
# Expected: Xcode 15.0 or later

# Check Swift version
swift --version
# Expected: Swift version 6.0 or later
```

## Clone Repository

```bash
git clone https://github.com/Aventerica89/artifact-manager-mac.git
cd artifact-manager-mac
```

## Project Structure

```
artifact-manager-mac/
├── Artifact Manager.xcodeproj    # Xcode project file
├── Artifact Manager/             # Main app source
│   ├── Artifact_ManagerApp.swift
│   ├── ContentView.swift
│   ├── Item.swift
│   ├── Collection.swift
│   ├── ArtifactType.swift
│   ├── NameValidator.swift
│   └── CleanupUtility.swift
├── ArtifactManagerTests/         # Test suite
│   ├── ArtifactTypeTests.swift
│   ├── FileSizeFormatterTests.swift
│   └── NameValidatorTests.swift
├── CLAUDE.md                     # Project documentation
└── README.md
```

## Build from Command Line

### Standard Build

```bash
swift build
```

Output:
```
Build complete! (X.XXs)
```

### Build with Configuration

```bash
# Debug build (default)
swift build -c debug

# Release build (optimized)
swift build -c release
```

## Build in Xcode

### Open Project

```bash
open "Artifact Manager.xcodeproj"
```

Or double-click `Artifact Manager.xcodeproj` in Finder.

### Build and Run

1. Select target: "Artifact Manager" (My Mac)
2. Press `Cmd+R` or click Run button
3. App launches automatically

### Build Only

Press `Cmd+B` or Product → Build

## Run Tests

### Command Line

```bash
swift test
```

Expected output:
```
Test Suite 'All tests' started at 2026-01-28 14:23:45.123
Test Suite 'ArtifactManagerTests' started at 2026-01-28 14:23:45.124
Test Suite 'ArtifactTypeTests' started at 2026-01-28 14:23:45.125

[... test output ...]

Test Suite 'All tests' passed at 2026-01-28 14:23:48.456
     Executed 42 tests, with 0 failures (0 unexpected) in 3.333 (3.333) seconds
```

### In Xcode

1. Press `Cmd+U` or Product → Test
2. View results in Test Navigator (Cmd+6)
3. Click individual tests to see details

### Run Specific Test Suite

```bash
swift test --filter ArtifactTypeTests
swift test --filter NameValidatorTests
swift test --filter FileSizeFormatterTests
```

### Watch Mode (Continuous Testing)

Not built-in, but you can use `watchexec`:

```bash
brew install watchexec
watchexec -e swift -- swift test
```

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Edit files in Xcode or your preferred editor.

### 3. Run Tests

```bash
swift test
```

All 42 tests must pass.

### 4. Build and Manual Test

```bash
open "Artifact Manager.xcodeproj"
# Press Cmd+R to run
```

### 5. Commit

```bash
git add .
git commit -m "feat: your feature description"
```

### 6. Push and Create PR

```bash
git push -u origin feature/your-feature-name
# Create PR on GitHub
```

## Common Tasks

### Add New Test

1. Open `ArtifactManagerTests/` group in Xcode
2. Right-click → New File → Unit Test Case Class
3. Name it `YourFeatureTests.swift`
4. Write tests using XCTest framework

Example:
```swift
import XCTest
@testable import Artifact_Manager

final class YourFeatureTests: XCTestCase {
    func testSomething() {
        XCTAssertEqual(1 + 1, 2)
    }
}
```

### Add New Model

1. Create new Swift file in `Artifact Manager/` group
2. Import SwiftData
3. Use `@Model` macro
4. Update schema in `Artifact_ManagerApp.swift`:

```swift
let schema = Schema([
    Item.self,
    Collection.self,
    YourNewModel.self  // Add here
])
```

### Add New View

1. Create new Swift file in `Artifact Manager/` group
2. Import SwiftUI
3. Create struct conforming to `View`
4. Add `#Preview` for live preview in Xcode

Example:
```swift
import SwiftUI

struct YourNewView: View {
    var body: some View {
        Text("Hello")
    }
}

#Preview {
    YourNewView()
}
```

## Debugging

### Print Debugging

Use OSLog instead of print:

```swift
import OSLog

private let logger = Logger(
    subsystem: "jbcloud.Artifact-Manager",
    category: "YourCategory"
)

logger.debug("Debug message")
logger.info("Info message")
logger.warning("Warning message")
logger.error("Error message")
```

View logs in Console.app (filter by subsystem).

### Xcode Debugger

1. Set breakpoint (click line number gutter)
2. Run app (Cmd+R)
3. When breakpoint hits:
   - Step over: F6
   - Step into: F7
   - Step out: F8
   - Continue: Cmd+Ctrl+Y

### SwiftData Database Location

```bash
# Find SwiftData database
cd ~/Library/Containers/jbcloud.Artifact-Manager/Data/Library/Application\ Support/
ls -la

# Open in sqlite3 (read-only)
sqlite3 default.store "SELECT * FROM ZITEM LIMIT 5;"
```

## Performance Profiling

### Instruments

1. Product → Profile (Cmd+I)
2. Select template:
   - Time Profiler (CPU usage)
   - Allocations (Memory usage)
   - Leaks (Memory leaks)
3. Click Record
4. Use app
5. Stop and analyze

### SwiftData Performance

Monitor fetch performance:

```swift
import OSLog

let start = Date()
let items = try context.fetch(descriptor)
let elapsed = Date().timeIntervalSince(start)
logger.debug("Fetch took \(elapsed)s for \(items.count) items")
```

## Troubleshooting

### Build Fails: "Cannot find type 'Item' in scope"

Make sure all files are added to target:
1. Select file in Project Navigator
2. File Inspector (Cmd+Opt+1)
3. Check "Artifact Manager" under Target Membership

### Tests Fail: "No such module 'Artifact_Manager'"

Clean build folder:
```bash
swift package clean
swift build
swift test
```

### App Crashes on Launch

Check ModelContainer initialization:
1. View Console.app logs
2. Filter by "jbcloud.Artifact-Manager"
3. Look for "Failed to create ModelContainer"

Fallback to in-memory storage is automatic, but indicates a persistence issue.

### SwiftData Migration Issues

Reset database (loses data):
```bash
rm -rf ~/Library/Containers/jbcloud.Artifact-Manager/Data/Library/Application\ Support/
# Relaunch app
```

## Code Quality

### Format Code

Xcode auto-formats on save. Manual format:
- Editor → Structure → Re-Indent (Ctrl+I)

### Linting

No official Swift linter configured. Consider:
- [SwiftLint](https://github.com/realm/SwiftLint)
- [SwiftFormat](https://github.com/nicklockwood/SwiftFormat)

### Static Analysis

Product → Analyze (Cmd+Shift+B) - Runs Clang static analyzer.

## Release Build

### Create Archive

1. Product → Archive
2. Wait for build to complete
3. Organizer window opens automatically

### Distribute

1. Select archive in Organizer
2. Click "Distribute App"
3. Choose distribution method:
   - App Store Connect (for App Store)
   - Direct Distribution (for outside App Store)
   - Development (for testing)

### Notarize (for distribution outside App Store)

Required for macOS Gatekeeper:
1. Export as "Developer ID" signed app
2. Submit to Apple for notarization
3. Staple notarization ticket to app bundle
4. Distribute DMG or ZIP

See [Apple Developer Documentation](https://developer.apple.com/documentation/security/notarizing_macos_software_before_distribution) for details.

## Continuous Integration

No CI configured yet. Recommended setup:

### GitHub Actions

```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: macos-14
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: swift test
```

## Using with Claude Code

Claude Code can assist with Swift/SwiftUI development for Artifact Manager.

### Running Tests

Ask Claude to run the test suite:

```bash
swift test
```

Claude interprets test results and suggests fixes for failures.

### Adding New Features

Tell Claude what you want to build:

> Add a dark mode toggle to the Artifact Manager settings view

Claude generates SwiftUI code following the project's patterns.

### Debugging Swift Code

Share error messages with Claude:

```bash
swift build 2>&1
```

Claude diagnoses compiler errors and suggests fixes.

### Code Reviews

Ask Claude to review your changes:

> Review this SwiftUI view for performance issues: [paste code]

Claude identifies unnecessary redraws, memory leaks, and suggests improvements.

### Xcode Build Commands

Claude can run these from the terminal:

```bash
# Build
swift build -c release

# Test specific suite
swift test --filter NameValidatorTests

# Clean and rebuild
swift package clean && swift build
```

## Next Steps

- Read [Architecture](/artifact-manager-mac/architecture) for technical details
- Review [Sync Rules](/artifact-manager-mac/sync-rules) if modifying core features
- Check [Project Overview](/artifact-manager-mac) for feature documentation
