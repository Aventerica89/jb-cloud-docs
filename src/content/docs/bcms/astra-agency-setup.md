---
title: Astra Agency Setup
description: Setting up the BCMS Next.js agency starter template.
sidebar:
  order: 1
---

This guide documents setting up the Astra Agency project using the BCMS CLI with the Next.js agency starter template.

## Prerequisites

- Node.js 18+
- npm or pnpm
- BCMS account (free at [thebcms.com](https://thebcms.com))

## Quick Start

### 1. Create the Project

```bash
npx @thebcms/cli create next starter agency
```

When prompted:
- **Project name**: `Astra Agency` (or your preferred name)
- A browser window will open for BCMS authentication

The CLI will:
1. Clone the agency starter from GitHub
2. Create a new BCMS project
3. Set up API keys automatically

### 2. Install Dependencies

```bash
cd "Astra Agency"
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The site runs at **http://localhost:3000**

## Project URLs

| Resource | URL |
|----------|-----|
| Local Dev | http://localhost:3000 |
| BCMS Dashboard | https://app.thebcms.com/d/o/alive-wildfowl/i/astra-agency/bcms |

## Project Structure

```
Astra Agency/
├── bcms/              # BCMS types and configuration
│   └── types/         # Auto-generated TypeScript types
├── src/
│   ├── app/           # Next.js App Router pages
│   └── components/    # React components
├── public/            # Static assets
└── .env               # Environment variables (auto-configured)
```

## Managing Content

1. Go to the [BCMS Dashboard](https://app.thebcms.com)
2. Select the **astra-agency** project
3. Edit entries in the content types (Team, Services, Portfolio, etc.)
4. Changes sync to your local dev server automatically

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Manual Build

```bash
npm run build
npm run start
```

## Troubleshooting

### BCMS Types Not Updating

Pull the latest types manually:

```bash
npx bcms --pull types --lng ts
```

### Authentication Expired

Re-authenticate with BCMS:

```bash
npx @thebcms/cli login
```

## Next Steps

- [ ] Customize the design and branding
- [ ] Add team members in BCMS
- [ ] Create portfolio items
- [ ] Configure services offered
- [ ] Deploy to production
