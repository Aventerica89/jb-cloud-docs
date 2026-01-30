---
title: Activity Logging
description: Track all actions across your WordPress sites with the activity log.
sidebar:
  order: 2
---

The Activity Log feature tracks all actions performed across your managed WordPress sites, giving you a complete audit trail.

## Accessing the Activity Log

Navigate to `/activity` in your WP Manager dashboard, or click **Activity** in the navigation.

## What Gets Logged

| Action | Description |
|--------|-------------|
| Site Added | When a new WordPress site is added |
| Site Updated | When site credentials or settings change |
| Site Deleted | When a site is removed |
| Site Synced | Plugin/theme sync with counts |
| Health Check | Online/offline status checks |
| Plugin Updated | Individual plugin updates |
| Theme Updated | Individual theme updates |
| Bulk Update Started | When a bulk update job begins |
| Bulk Update Completed | When bulk updates finish (with success/fail counts) |
| Error | Any operation that fails |

## Activity Page Features

### Summary Cards

At the top of the page, you'll see:
- **Total Events**: All logged activities
- **Successful**: Operations that completed without errors
- **Failed**: Operations that encountered errors

### Timeline View

Activities are grouped by date and displayed as a timeline with:
- **Action icon**: Visual indicator of the action type
- **Status badge**: Success (green), Failed (red), or Info (blue)
- **Details**: Description of what happened
- **Timestamp**: Relative time (e.g., "5m ago")
- **Site link**: Quick link to the affected site

## Database Schema

Activities are stored in the `activity_log` table:

| Column | Type | Description |
|--------|------|-------------|
| id | integer | Primary key |
| siteId | integer | Reference to sites table (nullable for global actions) |
| action | text | Action type enum |
| status | text | success, failed, or info |
| details | text | Human-readable description |
| createdAt | text | ISO timestamp |

## API Endpoint

### GET /api/activity

Fetch activity logs with optional filtering.

**Query Parameters:**
- `siteId` - Filter by site (optional)
- `limit` - Number of records (default: 50)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "logs": [
    {
      "id": 1,
      "siteId": 1,
      "siteName": "My Site",
      "siteUrl": "https://example.com",
      "action": "health_check",
      "status": "success",
      "details": "My Site is online",
      "createdAt": "2024-01-26T21:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 50,
    "offset": 0,
    "hasMore": true
  }
}
```

## Using with Claude Code

Claude Code can help you analyze activity logs, debug issues, and add new logging features.

### Querying Activity Logs

Ask Claude to fetch specific activity data:

> Show me all failed updates from the last 24 hours

Claude will use the API or query the database directly:
```typescript
const failedUpdates = await db.query.activityLog.findMany({
  where: and(
    eq(activityLog.status, 'failed'),
    like(activityLog.action, '%update%'),
    gte(activityLog.createdAt, new Date(Date.now() - 86400000).toISOString())
  ),
  with: {
    site: true
  }
})
```

### Debugging Failed Operations

Share activity log entries with Claude:

> Why did this bulk update fail? [paste log entry]

Claude analyzes the error details and suggests fixes:
- Check site connectivity
- Verify credentials
- Test REST API endpoint
- Review connector plugin status

### Adding New Activity Types

Tell Claude what you want to track:

> Track when sites are archived or unarchived

Claude will:
1. Add new action types to the schema enum
2. Update the logging service
3. Add log calls to archive/unarchive operations
4. Update the UI to display new action icons
5. Write tests for the new logging

### Analyzing Patterns

Ask Claude to find insights:

> Which sites have the most failed health checks?

Claude generates analysis queries:
```typescript
const failedHealthChecks = await db
  .select({
    siteId: activityLog.siteId,
    siteName: sites.name,
    failureCount: count()
  })
  .from(activityLog)
  .leftJoin(sites, eq(activityLog.siteId, sites.id))
  .where(and(
    eq(activityLog.action, 'health_check'),
    eq(activityLog.status, 'failed')
  ))
  .groupBy(activityLog.siteId, sites.name)
  .orderBy(desc(count()))
```

### Exporting Activity Data

Ask Claude to generate exports:

> Export all activity from site #5 as CSV

Claude generates the export logic:
```typescript
const logs = await db.query.activityLog.findMany({
  where: eq(activityLog.siteId, 5),
  orderBy: desc(activityLog.createdAt)
})

const csv = logs.map(log =>
  `${log.createdAt},${log.action},${log.status},"${log.details}"`
).join('\n')
```

### Performance Optimization

If activity logs are slow:

> Activity page takes 3 seconds to load

Claude will:
- Suggest database indexes on `siteId`, `action`, `createdAt`
- Recommend pagination strategies
- Propose archiving old logs
- Add caching for summary statistics
