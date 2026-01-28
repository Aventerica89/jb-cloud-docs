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
