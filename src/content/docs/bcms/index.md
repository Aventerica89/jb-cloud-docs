---
title: BCMS
description: Documentation for BCMS headless CMS projects and integrations.
sidebar:
  order: 0
---

BCMS is a headless CMS that provides a visual content management interface with API access for frontend frameworks like Next.js, Astro, and more.

## Projects

- [Astra Agency](/bcms/astra-agency-setup) - Next.js agency website starter

## Resources

- [BCMS Dashboard](https://app.thebcms.com)
- [BCMS Documentation](https://docs.thebcms.com)
- [BCMS CLI](https://www.npmjs.com/package/@thebcms/cli)

## Using with Claude Code

Claude Code can help you set up, develop, and manage BCMS projects efficiently.

### Project Setup

**Initialize BCMS project:**
```bash
# Install BCMS CLI
npm install -g @thebcms/cli

# Create new project
bcms create my-agency-site
```

**Ask Claude Code for help:**
```
"Set up a Next.js project with BCMS integration for an agency website"
```

Claude Code will:
- Guide through CLI setup
- Configure environment variables
- Set up BCMS SDK
- Create initial content types
- Generate page templates

### Content Type Development

**Create content types:**
```
"Create BCMS content types for:
- Hero section (title, subtitle, CTA, background image)
- Team member (name, role, bio, photo)
- Project case study (title, client, description, images, technologies)"
```

Claude Code will generate:
- Content type schemas
- Field configurations
- Validation rules
- Relationship definitions

**Query content:**
```
"Write a function to fetch all team members from BCMS and sort by role"
```

### Template Development

**Generate page templates:**
```
"Create a Next.js page template for rendering BCMS blog posts with:
- MDX content rendering
- Related posts sidebar
- Social sharing
- SEO metadata from BCMS"
```

**Component generation:**
```
"Generate reusable components for BCMS content:
- HeroSection (from BCMS hero content type)
- TeamGrid (from team members)
- ProjectShowcase (from case studies)"
```

### Real-World Examples

**Example 1: Blog system**
```
"Build a complete blog system with:
- Post content type (title, slug, body, author, tags)
- Author content type (name, bio, avatar)
- Category system
- Archive pages
- RSS feed"
```

**Example 2: Multi-language site**
```
"Set up multi-language support for:
- English and Spanish
- Localized content
- Language switcher
- SEO for each language"
```

**Example 3: Media library**
```
"Create a media management system:
- Upload images via BCMS
- Automatic optimization
- CDN integration
- Image galleries
- Alt text management"
```

### Debugging

**Debug BCMS integration:**
```
"Content isn't loading from BCMS. Debug:
- Check API credentials
- Verify content type exists
- Test SDK connection
- Check network requests"
```

**Performance optimization:**
```
"The site is slow loading BCMS content. Optimize:
- Add caching layer
- Implement incremental static regeneration
- Optimize image loading
- Reduce API calls"
```
