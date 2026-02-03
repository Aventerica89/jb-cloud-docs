---
title: shadcn/ui Component Library
description: Complete reference for shadcn/ui - a collection of beautifully-designed, accessible components built with TypeScript, Tailwind CSS, and Radix UI.
---

A collection of beautifully-designed, accessible components and a code distribution platform. Built with TypeScript, Tailwind CSS, and Radix UI primitives. Supports Next.js, Vite, Remix, Astro, and more.

## Quick Start

```bash
# Initialize in a new project
npx shadcn@latest init

# Add a component
npx shadcn@latest add button

# Add multiple components
npx shadcn@latest add button card dialog

# Add all components
npx shadcn@latest add --all
```

---

## Components by Category

### Form & Input

| Component | Command | Description |
|-----------|---------|-------------|
| Form | `npx shadcn@latest add form` | Forms with React Hook Form and Zod |
| Button | `npx shadcn@latest add button` | Button with multiple variants |
| Input | `npx shadcn@latest add input` | Text input component |
| Textarea | `npx shadcn@latest add textarea` | Multi-line text input |
| Checkbox | `npx shadcn@latest add checkbox` | Checkbox input |
| Radio Group | `npx shadcn@latest add radio-group` | Radio button group |
| Select | `npx shadcn@latest add select` | Select dropdown |
| Switch | `npx shadcn@latest add switch` | Toggle switch |
| Slider | `npx shadcn@latest add slider` | Slider input |
| Calendar | `npx shadcn@latest add calendar` | Date selection calendar |
| Date Picker | `npx shadcn@latest add date-picker` | Date picker with input |
| Combobox | `npx shadcn@latest add combobox` | Searchable select |
| Input OTP | `npx shadcn@latest add input-otp` | One-time password input |
| Label | `npx shadcn@latest add label` | Form label |

---

### Layout & Navigation

| Component | Command | Description |
|-----------|---------|-------------|
| Accordion | `npx shadcn@latest add accordion` | Collapsible sections |
| Breadcrumb | `npx shadcn@latest add breadcrumb` | Breadcrumb navigation |
| Navigation Menu | `npx shadcn@latest add navigation-menu` | Navigation with dropdowns |
| Sidebar | `npx shadcn@latest add sidebar` | Collapsible sidebar |
| Tabs | `npx shadcn@latest add tabs` | Tabbed interface |
| Separator | `npx shadcn@latest add separator` | Visual divider |
| Scroll Area | `npx shadcn@latest add scroll-area` | Custom scrollable area |
| Resizable | `npx shadcn@latest add resizable` | Resizable panels |

---

### Overlays & Dialogs

| Component | Command | Description |
|-----------|---------|-------------|
| Dialog | `npx shadcn@latest add dialog` | Modal dialog |
| Alert Dialog | `npx shadcn@latest add alert-dialog` | Confirmation dialog |
| Sheet | `npx shadcn@latest add sheet` | Slide-out panel |
| Drawer | `npx shadcn@latest add drawer` | Mobile-friendly drawer |
| Popover | `npx shadcn@latest add popover` | Floating popover |
| Tooltip | `npx shadcn@latest add tooltip` | Tooltip for context |
| Hover Card | `npx shadcn@latest add hover-card` | Card on hover |
| Context Menu | `npx shadcn@latest add context-menu` | Right-click menu |
| Dropdown Menu | `npx shadcn@latest add dropdown-menu` | Dropdown menu |
| Command | `npx shadcn@latest add command` | Command palette (cmdk) |

---

### Feedback & Status

| Component | Command | Description |
|-----------|---------|-------------|
| Alert | `npx shadcn@latest add alert` | Alert messages |
| Toast/Sonner | `npx shadcn@latest add sonner` | Toast notifications |
| Progress | `npx shadcn@latest add progress` | Progress bar |
| Skeleton | `npx shadcn@latest add skeleton` | Loading placeholder |
| Badge | `npx shadcn@latest add badge` | Labels and status |
| Spinner | `npx shadcn@latest add spinner` | Loading spinner |

---

### Display & Media

| Component | Command | Description |
|-----------|---------|-------------|
| Avatar | `npx shadcn@latest add avatar` | User avatars |
| Card | `npx shadcn@latest add card` | Card container |
| Table | `npx shadcn@latest add table` | Data table |
| Data Table | `npx shadcn@latest add data-table` | Advanced table with sorting/filtering |
| Chart | `npx shadcn@latest add chart` | Charts (Recharts) |
| Carousel | `npx shadcn@latest add carousel` | Carousel (Embla) |
| Aspect Ratio | `npx shadcn@latest add aspect-ratio` | Maintain aspect ratio |

---

### Misc

| Component | Command | Description |
|-----------|---------|-------------|
| Collapsible | `npx shadcn@latest add collapsible` | Collapsible container |
| Toggle | `npx shadcn@latest add toggle` | Toggle button |
| Toggle Group | `npx shadcn@latest add toggle-group` | Group of toggles |
| Pagination | `npx shadcn@latest add pagination` | Pagination controls |

---

## Pre-built Blocks

Complete UI patterns ready to use:

```bash
# Dashboard layout
npx shadcn@latest add dashboard-01

# Login page
npx shadcn@latest add login-01

# Sidebar layout
npx shadcn@latest add sidebar-01
```

---

## Dark Mode Setup (Next.js)

1. Install next-themes:
```bash
npm install next-themes
```

2. Create theme provider:
```tsx
// components/theme-provider.tsx
"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

3. Wrap app in provider:
```tsx
// app/layout.tsx
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

---

## Installation Guides

### General Installation

```bash
npx shadcn@latest init
```

This will prompt you to configure:
- TypeScript or JavaScript
- Style (default, new-york)
- Base color
- CSS variables for colors
- Tailwind CSS config location
- Component import alias

### Next.js Installation

```bash
# Create new Next.js app
npx create-next-app@latest my-app --typescript --tailwind --eslint

# Navigate to project
cd my-app

# Initialize shadcn/ui
npx shadcn@latest init
```

### Project Structure

shadcn/ui uses a configurable directory structure (paths defined in `components.json`):

```text
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/           # shadcn components go here
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   └── ...           # your custom components
├── lib/
│   └── utils.ts      # cn() helper function
└── styles/
    └── globals.css   # Tailwind + CSS variables
```

### Component Registry

shadcn/ui components are distributed via a registry system. You can:

- Browse components at [ui.shadcn.com](https://ui.shadcn.com)
- Create your own registry for custom components
- Share components across projects

---

## Useful Links

### Setup & Installation
- [Installation Guide](https://ui.shadcn.com/docs/installation)
- [Next.js Installation](https://ui.shadcn.com/docs/installation/next)
- [Components.json Config](https://ui.shadcn.com/docs/components-json)
- [Registry Documentation](https://ui.shadcn.com/docs/registry)

### Reference
- [Documentation](https://ui.shadcn.com/docs)
- [Components](https://ui.shadcn.com/docs/components)
- [Themes](https://ui.shadcn.com/themes)
- [Blocks](https://ui.shadcn.com/blocks)
- [GitHub](https://github.com/shadcn-ui/ui)
