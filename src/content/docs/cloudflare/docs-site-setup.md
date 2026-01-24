---
title: Documentation Site Setup
description: How this docs site was built with Astro Starlight, Decap CMS, and Cloudflare Pages.
sidebar:
  order: 1
---

This guide documents how this documentation site was set up, including the tech stack choices and configuration steps.

## Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| Framework | Astro + Starlight | Static site generator optimized for documentation |
| CMS | Decap CMS | Git-based headless CMS with web UI |
| Hosting | Cloudflare Pages | Free static hosting with auto-deploy |
| Auth | Cloudflare Worker | OAuth proxy for GitHub authentication |
| Storage | GitHub | Version control and content storage |

## Why This Stack?

### Astro + Starlight
- Purpose-built for documentation sites
- Fast static output with excellent SEO
- Built-in search, navigation, and dark mode
- MDX support for interactive components

### Decap CMS (formerly Netlify CMS)
- **Free and open source** - No per-user pricing
- **Git-based** - Content stored in GitHub, not a separate database
- **Web UI** - Edit content without touching code
- **No vendor lock-in** - Content is just Markdown files

### Cloudflare Pages
- **Free tier** - Unlimited sites, generous bandwidth
- **Auto-deploy** - Push to GitHub, site updates automatically
- **Fast global CDN** - Built into Cloudflare's network
- **Custom domains** - Easy SSL and DNS integration

### Why Not Other Options?
- **Netlify**: Would work, but we're already using Cloudflare for DNS
- **Vercel**: Great for Next.js, but Cloudflare is simpler for static sites
- **Contentful/Sanity**: Overkill for docs, and have user/content limits on free tiers

## Setup Steps

### 1. Create the Astro Project

```bash
npm create astro@latest jb-cloud-docs -- --template starlight
cd jb-cloud-docs
npm install
```

### 2. Configure Astro (`astro.config.mjs`)

```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://docs.jbcloud.app',
  integrations: [
    starlight({
      title: 'JB Cloud Docs',
      sidebar: [
        {
          label: 'xCloud',
          autogenerate: { directory: 'xcloud' },
        },
        {
          label: 'Cloudflare',
          autogenerate: { directory: 'cloudflare' },
        },
        // Add more sections as needed
      ],
    }),
  ],
});
```

### 3. Set Up Decap CMS

Create `public/admin/index.html`:

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Content Manager</title>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

Create `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_REPO
  branch: main
  base_url: https://github-oauth.YOUR_SUBDOMAIN.workers.dev
  auth_endpoint: /auth

media_folder: "public/images"
public_folder: "/images"

collections:
  - name: "xcloud"
    label: "xCloud"
    folder: "src/content/docs/xcloud"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Description", name: "description", widget: "string" }
      - { label: "Sort Order", name: "sidebar", widget: "object",
          fields: [{ label: "Order", name: "order", widget: "number", default: 0 }] }
      - { label: "Body", name: "body", widget: "markdown" }
```

### 4. Create GitHub OAuth App

1. Go to **GitHub → Settings → Developer settings → OAuth Apps**
2. Click **New OAuth App**
3. Fill in:
   - **Application name**: Your Docs CMS
   - **Homepage URL**: `https://your-docs-site.com`
   - **Callback URL**: `https://github-oauth.YOUR_SUBDOMAIN.workers.dev/callback`
4. Save the **Client ID** and **Client Secret**

### 5. Create Cloudflare Worker for OAuth

Cloudflare Pages doesn't have built-in OAuth like Netlify, so we need a Worker to handle GitHub authentication.

1. Go to **Cloudflare → Workers & Pages → Create Worker**
2. Name it `github-oauth`
3. Deploy, then edit with this code:

```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/auth') {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${env.CLIENT_ID}&scope=repo,user`;
      return Response.redirect(authUrl, 302);
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');

      if (!code) {
        return new Response('Missing code parameter', { status: 400 });
      }

      const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          client_id: env.CLIENT_ID,
          client_secret: env.CLIENT_SECRET,
          code: code
        })
      });

      const data = await response.json();

      if (data.error) {
        return new Response(`Error: ${data.error_description}`, { status: 400 });
      }

      const token = data.access_token;

      const html = `<!DOCTYPE html>
<html>
<head><title>Authorizing...</title></head>
<body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:{"token":"${token}","provider":"github"}',
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    return new Response('Not found', { status: 404 });
  }
};
```

4. Add environment variables in **Worker Settings → Variables**:
   - `CLIENT_ID` = Your GitHub OAuth Client ID
   - `CLIENT_SECRET` = Your GitHub OAuth Client Secret (encrypt this)

### 6. Deploy to Cloudflare Pages

1. Push your code to GitHub
2. Go to **Cloudflare → Workers & Pages → Create → Pages**
3. Connect to your GitHub repo
4. Configure build settings:
   - **Framework**: Astro
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
5. Deploy

### 7. Add Custom Domain

1. In Cloudflare Pages, go to **Custom domains**
2. Add your domain (e.g., `docs.jbcloud.app`)
3. Cloudflare handles DNS and SSL automatically

## Usage

### Adding Content via CMS

1. Go to `https://your-site.com/admin`
2. Login with GitHub
3. Select a collection
4. Click **New** to create a document
5. Fill in the fields and write your content
6. Click **Publish**

Changes are committed to GitHub and auto-deployed.

### Adding Content via Code

```bash
# Create a new doc
touch src/content/docs/xcloud/new-guide.md

# Edit with your preferred editor
# Then commit and push
git add -A
git commit -m "Add new guide"
git push
```

### Document Frontmatter

Every doc needs frontmatter:

```yaml
---
title: Your Page Title
description: Brief description for SEO and previews.
sidebar:
  order: 1  # Controls sort order in navigation
---

Your content here...
```

## Troubleshooting

### OAuth Login Fails
- Check that the GitHub OAuth callback URL matches your Worker URL exactly
- Verify environment variables are set in the Worker
- Try a different browser (Safari can be strict with popups)

### Build Fails on Cloudflare
- Check Node.js version - add `NODE_VERSION=18` in environment variables if needed
- Review build logs for specific errors

### CMS Changes Not Appearing
- Cloudflare Pages deploys take 1-2 minutes
- Check the deployment status in Cloudflare dashboard
- Hard refresh the site (Cmd+Shift+R)
