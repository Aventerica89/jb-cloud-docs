---
title: TDD Utilities
description: Test-driven development utilities for validation, business logic, and scheduling in WP Manager.
sidebar:
  order: 3
---

WP Manager uses Test-Driven Development (TDD) methodology for core utility functions. All utilities are thoroughly tested with Vitest, achieving 100% coverage across 63 tests.

## Testing Setup

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## Utility Modules

### Site Utilities (`src/lib/site-utils.ts`)

Functions for formatting and calculating site statistics.

#### `formatRelativeTime(date)`

Formats a date as human-readable relative time.

```typescript
import { formatRelativeTime } from '@/lib/site-utils';

formatRelativeTime(new Date());              // "Just now"
formatRelativeTime(new Date(Date.now() - 300000)); // "5m ago"
formatRelativeTime(null);                    // "Never"
```

#### `calculateUpdateCounts(sites)`

Aggregates update counts across multiple sites.

```typescript
import { calculateUpdateCounts } from '@/lib/site-utils';

const counts = calculateUpdateCounts(sites);
// Returns:
// {
//   totalUpdates: 15,
//   pluginUpdates: 12,
//   themeUpdates: 3,
//   sitesWithUpdates: 4,
//   sitesOnline: 8,
//   sitesOffline: 2
// }
```

### Validation (`src/lib/validation.ts`)

Input validation and sanitization utilities.

#### `validateSiteUrl(url)`

Validates and normalizes site URLs.

```typescript
import { validateSiteUrl } from '@/lib/validation';

validateSiteUrl('https://example.com/');
// { valid: true, url: 'https://example.com' }

validateSiteUrl('not-a-url');
// { valid: false, error: 'URL must start with http:// or https://' }
```

#### `sanitizeInput(input)`

Escapes HTML entities to prevent XSS attacks.

```typescript
import { sanitizeInput } from '@/lib/validation';

sanitizeInput('<script>alert("xss")</script>');
// '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

#### `validateSiteData(data)`

Complete validation for site form submissions.

```typescript
import { validateSiteData } from '@/lib/validation';

const result = validateSiteData({
  name: 'My Site',
  url: 'https://example.com',
  apiUsername: 'admin',
  apiPassword: 'xxxx xxxx xxxx'
});

if (result.valid) {
  // result.data contains sanitized data
} else {
  // result.errors contains validation messages
}
```

### Business Logic (`src/lib/business-logic.ts`)

Core business logic for health scoring and update prioritization.

#### `calculateHealthScore(site)`

Calculates a 0-100 health score based on multiple factors:

| Factor | Impact |
|--------|--------|
| Offline status | Score = 0 |
| Unknown status | -20 points |
| Invalid SSL | -25 points |
| SSL expiring < 7 days | -20 points |
| SSL expiring < 30 days | -10 points |
| Per pending update | -2 points (max -30) |
| Never checked | -10 points |
| Not checked > 7 days | -15 points |
| Not checked > 1 day | -5 points |

```typescript
import { calculateHealthScore } from '@/lib/business-logic';

const score = calculateHealthScore({
  status: 'online',
  sslValid: true,
  sslExpiry: new Date('2025-01-15'),
  lastChecked: new Date(),
  pluginUpdates: 3,
  themeUpdates: 1
});
// Returns: 92
```

#### `prioritizeUpdates(updates)`

Prioritizes updates by security risk and activity status.

| Priority | Condition | Score |
|----------|-----------|-------|
| Critical | Security update | 100 |
| High | Active plugin | 75 |
| Medium | Active theme | 50 |
| Low | Inactive plugin/theme | 25 |

```typescript
import { prioritizeUpdates } from '@/lib/business-logic';

const sorted = prioritizeUpdates(updates);
// Returns updates sorted by priority (critical first)
```

### Scheduler (`src/lib/scheduler.ts`)

Scheduling and notification utilities.

#### `getSitesNeedingSync(sites, intervalMinutes)`

Identifies sites that need syncing based on the configured interval.

```typescript
import { getSitesNeedingSync } from '@/lib/scheduler';

const sitesToSync = getSitesNeedingSync(sites, 60);
// Returns sites not synced in the last 60 minutes
```

#### `generateNotifications(sites)`

Generates notifications for sites with issues.

| Notification Type | Trigger | Severity |
|-------------------|---------|----------|
| `offline` | Site not responding | Critical |
| `updates_available` | 5+ total updates | Warning |
| `ssl_expiring` | SSL expires within 7 days | Warning |

```typescript
import { generateNotifications } from '@/lib/scheduler';

const notifications = generateNotifications(sites);
// Returns array of notification objects
```

## Integration Examples

### Dashboard Health Display

```tsx
import { calculateHealthScore } from '@/lib/business-logic';
import { formatRelativeTime } from '@/lib/site-utils';

function SiteCard({ site }) {
  const healthScore = calculateHealthScore(site);

  return (
    <Card>
      <p>Health: {healthScore}%</p>
      <p>Last checked: {formatRelativeTime(site.lastChecked)}</p>
    </Card>
  );
}
```

### Form Validation

```tsx
import { validateSiteData } from '@/lib/validation';
import { toast } from 'sonner';

async function handleSubmit(formData) {
  const validation = validateSiteData(formData);

  if (!validation.valid) {
    toast.error('Validation failed', {
      description: validation.errors.join(', ')
    });
    return;
  }

  // Proceed with validated data
  await saveSite(validation.data);
  toast.success('Site saved');
}
```

## Test Coverage

| Module | Tests | Coverage |
|--------|-------|----------|
| site-utils.ts | 12 | 100% |
| validation.ts | 24 | 100% |
| business-logic.ts | 14 | 100% |
| scheduler.ts | 13 | 100% |
| **Total** | **63** | **100%** |

## Using with Claude Code

Claude Code can help you write tests first, implement utilities, and maintain 100% test coverage using TDD methodology.

### Writing Tests First (TDD Workflow)

Tell Claude what you need:

> I need a utility function to check if a site's WordPress version is outdated

Claude follows TDD:

**Step 1: Write the failing test**
```typescript
// __tests__/site-utils.test.ts
describe('isOutdatedWordPress', () => {
  it('returns true if version is below 6.0', () => {
    expect(isOutdatedWordPress('5.9.3')).toBe(true)
  })

  it('returns false if version is 6.0 or higher', () => {
    expect(isOutdatedWordPress('6.4.2')).toBe(false)
  })

  it('handles null version', () => {
    expect(isOutdatedWordPress(null)).toBe(true)
  })
})
```

**Step 2: Run test (should fail)**
```bash
npm test -- site-utils.test.ts
```

**Step 3: Implement minimal code to pass**
```typescript
// src/lib/site-utils.ts
export function isOutdatedWordPress(version: string | null): boolean {
  if (!version) return true
  const major = parseInt(version.split('.')[0])
  return major < 6
}
```

**Step 4: Verify tests pass**
```bash
npm test -- site-utils.test.ts
```

### Adding New Business Logic

Ask Claude to add scoring logic:

> Add a deduction to health score if PHP version is below 8.0

Claude will:
1. Add test cases for PHP version checking
2. Update `calculateHealthScore` function
3. Verify tests pass
4. Update documentation

Example tests Claude generates:
```typescript
it('deducts 15 points for PHP < 8.0', () => {
  const score = calculateHealthScore({
    status: 'online',
    phpVersion: '7.4',
    // ... other fields
  })
  expect(score).toBe(85) // 100 - 15
})
```

### Running Tests with Claude

Claude can run and interpret test results:

```bash
# Run all tests
npm test

# Run specific file
npm test validation.test.ts

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage
```

If tests fail, paste the output to Claude for diagnosis.

### Debugging Validation Errors

Share validation failures with Claude:

> Users are reporting "Invalid URL" errors for valid URLs like "http://localhost:8080"

Claude will:
- Analyze the `validateSiteUrl` function
- Add test case for localhost URLs
- Fix validation regex
- Verify all tests still pass

### Improving Health Score Algorithm

Ask Claude to analyze scoring:

> The health score seems too harsh for sites with many plugins. Can we adjust it?

Claude will:
```typescript
// Current: -2 points per update (max -30)
// Proposed: -1 point per update (max -20)

it('caps update penalty at 20 points', () => {
  const score = calculateHealthScore({
    status: 'online',
    pendingPluginUpdates: 50,
    pendingThemeUpdates: 10
    // ... other fields
  })
  expect(score).toBe(80) // 100 - 20
})
```

### Test Coverage Analysis

Ask Claude to identify gaps:

> Check if all edge cases are covered for formatRelativeTime

Claude reviews the function and suggests missing tests:
- Negative dates (future timestamps)
- Invalid date objects
- Dates more than 1 year ago
- Boundary conditions (exactly 60 minutes, etc.)

### Performance Testing

Claude can help benchmark utilities:

> Is calculateHealthScore fast enough for 1000 sites?

Claude generates benchmark:
```typescript
const start = performance.now()
const scores = sites.map(calculateHealthScore)
const end = performance.now()
console.log(`Calculated ${sites.length} scores in ${end - start}ms`)
```

### Refactoring with Test Safety

Ask Claude to refactor:

> Refactor validateSiteData to use Zod schema validation

Claude will:
1. Install Zod: `npm install zod`
2. Create schema while keeping tests green
3. Migrate function implementation
4. Verify all 24 validation tests still pass
5. Update documentation

The tests ensure refactoring doesn't break existing behavior.
