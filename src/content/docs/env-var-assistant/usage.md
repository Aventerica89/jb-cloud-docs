---
title: Usage Guide
description: How to use Env Var Assistant for managing API keys
source_project: /Users/jb/env-var-assistant
sidebar:
  order: 2
---

## Saving API Keys

### Single Key

1. Copy an API key from any source (dashboard, email, etc.)
2. Click the Env Var Assistant icon in Chrome/Safari toolbar
3. Click **"Scan Clipboard"**
4. The extension detects the key type and shows details
5. Click **"Save"** to store in 1Password

The key is saved with:
- Automatic provider detection (OpenAI, Stripe, etc.)
- Suggested environment variable name
- Dashboard URL for managing the key
- Source URL (where you copied the key)
- Project name (inferred from URL when possible)
- Tags for easy filtering (`env-var`, provider name)

### From `.env` Format

If you copy text in `KEY=value` format:

```bash
OPENAI_API_KEY=sk-proj-xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
DATABASE_URL=postgres://user:pass@host/db
```

The extension will:
1. Parse each `KEY=value` pair
2. Detect the value type
3. Use the key name as the item title (e.g., `OPENAI_API_KEY`)

### Batch Mode

When you have 5+ keys:

1. Copy your entire `.env` file content
2. Open the extension
3. A **batch progress UI** appears
4. Click **"Save All"** to save everything at once
5. See real-time progress and results

## Adding to Existing Items

If you have an existing 1Password item and want to add a new token:

1. Copy the new API key
2. Open the extension
3. Click the dropdown arrow next to "Save"
4. Select **"Add to: [Existing Item Name]"**
5. The key is added as a new field to that item

This is useful for:
- Adding refresh tokens to existing credentials
- Storing multiple keys for the same service
- Organizing related secrets together

## Copying Keys

To copy a saved key back to clipboard:

1. Open the extension
2. Find the key in "Saved Keys" section
3. Click **"Copy"**
4. The value is now in your clipboard

## Filtering and Managing Keys

### Filter Keys

Use the search box at the top of the "Saved Keys" section to filter by name. The count badge shows matching results.

### Hide Keys

To temporarily remove a key from the list without deleting it from 1Password:

1. Find the key in "Saved Keys"
2. Click the **X** button on the right
3. The key is hidden from view

Hidden keys remain in 1Password and can be restored.

### Restore Hidden Keys

If you've hidden keys and want them back:

1. Look for the "X hidden" badge in the filter bar
2. Click **"Restore"**
3. All hidden keys reappear in the list

This is useful for:
- Decluttering old keys you no longer use frequently
- Focusing on project-specific keys
- Temporary organization without permanent deletion

## Auto-Fill on Dashboards

When you're on a supported dashboard (Vercel, Netlify, Cloudflare, etc.):

1. Open the extension
2. Find the key you want to fill
3. Click **"Fill"**
4. The key name and value are filled into the page's form

### Supported Dashboards

| Provider | Page Type |
|----------|-----------|
| Vercel | Environment Variables settings |
| Netlify | Site environment configuration |
| Cloudflare | Workers secrets, Pages env vars |
| GitHub | Repository secrets |
| Railway | Project variables |
| Render | Service environment |

### Floating Button

On supported dashboards, a floating key icon appears in the bottom-right. Click it to quickly access your keys.

## Visiting Source Pages

If you saved a key and want to return to where you got it:

1. Find the key in "Saved Keys"
2. Click **"Visit"**
3. Opens the dashboard URL in a new tab

This works because the extension stores:
- `dashboard_url` - The provider's key management page
- `source_url` - The page where you originally copied the key

## Settings

Access settings by clicking the gear icon:

### Clipboard Monitoring

When enabled, the extension monitors your clipboard and shows a notification when it detects an API key.

### Auto-Fill on Dashboards

Enables the floating action button on supported provider dashboards.

### Default Vault

Set a default 1Password vault for saving keys. Leave empty to use "Private".

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Open extension | Click icon (can set custom in Chrome settings) |
| Scan clipboard | Click "Scan Clipboard" button |
| Close dropdown | Click outside or press Escape |

## Tips

### Organize with Tags

All keys are tagged with `env-var` plus the provider name. In 1Password, you can filter by these tags.

### Use Environment Variable Names

When copying keys in `KEY=value` format, the extension uses the key name as the item title, making it easy to find later.

### Check the Dashboard URL

Before saving, verify the dashboard URL is correct. This makes "Visit" navigation work properly.

### Keep 1Password CLI Authenticated

For seamless operation, ensure 1Password CLI stays authenticated. Use biometric unlock for best experience.

## Using with Claude Code

Claude Code integrates with the Env Var Assistant to automate API key management workflows.

### Automated Key Detection

**Scan and save from clipboard:**
```
"I just copied an API key. Detect what type it is and save it to 1Password"
```

Claude Code will:
1. Read clipboard content
2. Match against 60+ patterns
3. Identify key type (e.g., "OpenAI API Key")
4. Suggest environment variable name
5. Save to 1Password with tags

**Batch processing:**
```
"I have 10 API keys in .env file. Import them all to 1Password"
```

### Smart Organization

**Auto-tagging:**
```
"Save these keys with project-specific tags:
OPENAI_API_KEY (project: chatbot)
STRIPE_SECRET_KEY (project: chatbot)
DATABASE_URL (project: chatbot)"
```

Claude Code will add:
- Provider tags (openai, stripe, supabase)
- env-var tag
- Custom project tags

**Workspace organization:**
```
"Organize all env-var items in 1Password by project:
- Move chatbot keys to 'Chatbot' collection
- Move ecommerce keys to 'E-commerce' collection"
```

### Deployment Workflows

**Project setup automation:**
```
"New Next.js project needs:
- Supabase (URL, anon key, service key)
- OpenAI API key
- Stripe keys (test and live)

Find them in 1Password and create .env.local"
```

**Multi-environment setup:**
```
"Set up env vars for:
- .env.development (test keys)
- .env.production (live keys)
Pull from 1Password and generate both files"
```

### Real-World Examples

**Example 1: API key rotation**
```
"Rotate the Stripe API key:
1. Generate new key from Stripe dashboard
2. Save to 1Password (replace old)
3. Update Vercel environment variables
4. Test deployment
5. Revoke old key"
```

**Example 2: Team onboarding**
```
"New developer joining. They need:
- Read access to Development vault
- All API keys for the mobile-app project
- Instructions for setting up .env.local

Generate onboarding checklist"
```

**Example 3: Security audit**
```
"Audit all API keys in 1Password:
- Find keys without env-var tag
- Identify keys without dashboard URLs
- Check for duplicate keys
- Verify all keys have rotation dates"
```

### Troubleshooting

**Debug extension issues:**
```
"The extension isn't detecting my API key. Debug:
- Check clipboard content format
- Verify pattern exists for this service
- Test regex pattern manually
- Check browser console for errors"
```

**Fix import errors:**
```
"Bulk import failed for 3/10 keys. Why?"
```

Claude Code will:
- Check pattern matching
- Verify 1Password CLI connection
- Test vault permissions
- Identify malformed keys

### Advanced Usage

**Custom workflows:**
```
"Create a workflow that:
1. Monitors clipboard for API keys
2. Auto-saves to 1Password
3. Adds to project's .env.local.tpl
4. Triggers deployment if on main branch"
```

**Integration with other tools:**
```
"Integrate Env Var Assistant with:
- VS Code extension (show keys in IDE)
- Raycast extension (quick key lookup)
- Alfred workflow (paste from 1Password)"
```

### Analytics and Insights

**Usage tracking:**
```
"How many API keys have I saved this month? Which providers are most common?"
```

**Key inventory:**
```
"Generate a report of all API keys by:
- Provider
- Project
- Last used date
- Rotation schedule"
```
