---
title: Astra Agency Setup
description: Setting up the BCMS Next.js agency starter template and customizing it for Med Spa Ranker.
sidebar:
  order: 1
---

This guide documents setting up the Astra Agency project using the BCMS CLI with the Next.js agency starter template, then customizing it to match the Med Spa Ranker design.

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
│   ├── components/
│   │   ├── layout/    # Header, Footer components
│   │   ├── medspa/    # Med Spa Ranker custom components
│   │   └── home-page/ # Original BCMS home components
│   └── styles/        # SCSS styles
├── public/            # Static assets
└── .env               # Environment variables (auto-configured)
```

## Customization: Med Spa Ranker Theme

The project was customized to match the Med Spa Ranker website design with a dark theme and medical spa branding.

### Color Scheme (tailwind.config.ts)

```typescript
colors: {
    primary: {
        DEFAULT: '#4AB8B8', // Teal/cyan accent
        dark: '#3A9A9A',
    },
    coral: {
        DEFAULT: '#E8736C', // Coral/salmon for CTAs
        dark: '#D4605A',
    },
    dark: {
        DEFAULT: '#1A1F2E', // Main dark background
        lighter: '#242B3D', // Slightly lighter sections
        card: '#2A3248',    // Card backgrounds
        nav: '#0D1117',     // Navigation background
    },
}
```

### Custom Components Created

| Component | Path | Purpose |
|-----------|------|---------|
| Hero | `src/components/medspa/Hero.tsx` | Full-width hero with background image |
| Features | `src/components/medspa/Features.tsx` | 4-column feature cards |
| Testimonials | `src/components/medspa/Testimonials.tsx` | Customer reviews with star ratings |
| Services | `src/components/medspa/Services.tsx` | SEO, PPC, Website services |
| WebDesign | `src/components/medspa/WebDesign.tsx` | Web design process section |
| Benefits | `src/components/medspa/Benefits.tsx` | Trust, Responsive, Convert cards |
| CTA | `src/components/medspa/CTA.tsx` | "Ready to Talk?" call-to-action |

### Layout Updates

- **Header**: Dark navigation bar with teal logo and coral CTA button
- **Footer**: Centered layout with navigation links and legal pages
- **Body**: Dark background (`bg-dark`) with white text

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

## Progress Checklist

- [x] Create BCMS project with Next.js agency starter
- [x] Install dependencies
- [x] Update color scheme to dark theme
- [x] Create Header with navigation and CTA
- [x] Create Hero section with background image
- [x] Create Features section (4 cards)
- [x] Create Testimonials section with reviews
- [x] Create Services section (SEO, PPC, Website)
- [x] Create Web Design section
- [x] Create Benefits section (Trust, Responsive, Convert)
- [x] Create CTA section
- [x] Update Footer with new branding
- [ ] Add real images and content
- [ ] Connect to BCMS for dynamic content
- [ ] Deploy to production
