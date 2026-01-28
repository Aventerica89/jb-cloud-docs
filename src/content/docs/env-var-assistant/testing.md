---
title: Testing Playground
description: Interactive test page for Env Var Assistant features
sidebar:
  order: 4
---

import { Tabs, TabItem } from '@astrojs/starlight/components';

Use this page to test the Env Var Assistant extension. The examples show the **pattern format** - to test detection, use real keys from your actual dashboards.

## Testing Detection

:::caution[Use Your Own Keys]
The extension detects keys from your clipboard. Copy a real API key from a provider dashboard to test detection. The patterns below show the expected format only.
:::

### Pattern Formats

| Provider | Format | Where to Get |
|----------|--------|--------------|
| OpenAI | `sk-proj-...` (80+ chars) | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |
| Anthropic | `sk-ant-api03-...` (100+ chars) | [console.anthropic.com](https://console.anthropic.com) |
| Google AI | `AIza...` (39 chars) | [console.cloud.google.com](https://console.cloud.google.com) |
| Stripe | `sk_live_...` or `sk_test_...` | [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys) |
| Supabase | JWT token | [supabase.com/dashboard](https://supabase.com/dashboard) |
| Cloudflare | 40-char alphanumeric | [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) |

### Test Workflow

1. Copy a real API key from any provider dashboard
2. Open the Env Var Assistant popup
3. The key should be detected automatically
4. Give it a name and save

## Batch Mode Testing

To test batch save, copy multiple environment variables at once:

```bash
# Copy a block like this from your .env file
OPENAI_API_KEY=your_actual_key_here
DATABASE_URL=your_database_connection_string
STRIPE_SECRET_KEY=your_stripe_key_here
```

When you paste and click "Scan Clipboard":
- Batch mode UI appears (shows count of keys detected)
- Progress bar during save
- Results summary showing success/failure for each

## Auto-Fill Testing

Visit these pages to test the auto-fill feature:

| Provider | Test URL |
|----------|----------|
| Vercel | [vercel.com/new](https://vercel.com/new) (create a project, then go to Settings > Environment Variables) |
| Netlify | [app.netlify.com](https://app.netlify.com) (create a site, then Site configuration > Environment variables) |
| GitHub | [github.com](https://github.com) (go to any repo > Settings > Secrets and variables > Actions) |

When on these pages:
1. Open Env Var Assistant
2. Select a saved key
3. Click "Fill"
4. The key name and value should populate the form

## MCP Server Testing

If you have the MCP server installed, test with Claude Code:

### Store a Key

```
"Store this API key for TestService: [paste your key]"
```

Expected: Claude calls `store_api_key` tool and confirms storage.

### List Keys

```
"List my saved API keys"
```

Expected: Claude calls `list_api_keys` and shows your stored keys.

### Get a Key

```
"Get my OpenAI API key"
```

Expected: Claude calls `get_api_key` and returns the value (be careful with real keys!).

## Troubleshooting Tests

### Key Not Detected

If a key isn't detected:

1. Check the [patterns list](/env-var-assistant/patterns) for the format
2. Some patterns require context (URL must contain service name)
3. Ensure the key isn't a known placeholder (`sk-xxxx`, `your_api_key`, etc.)

### Copy the Entire Value

Make sure you copy the complete key. Partial keys won't match patterns.

### Clear Previous Detection

If testing the same key multiple times, the extension may skip it (duplicate detection). Copy a different key first, then try again.

## Debug Information

Open Chrome DevTools on the extension popup:

1. Right-click the extension icon
2. Click "Inspect popup"
3. Check the Console tab for detection logs

In the service worker:

1. Go to `chrome://extensions`
2. Find Env Var Assistant
3. Click "Service worker" link
4. Check Console for messages
