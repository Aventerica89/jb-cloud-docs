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
