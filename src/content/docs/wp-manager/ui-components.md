---
title: UI Components
description: Dashboard charts, toast notifications, and responsive sidebar in WP Manager.
sidebar:
  order: 4
---

WP Manager uses official shadcn/ui components with Recharts for data visualization.

## Component Library

| Component | Source | Purpose |
|-----------|--------|---------|
| Button, Card, Badge | shadcn/ui | Core UI elements |
| Sheet | shadcn/ui | Mobile sidebar drawer |
| Sonner | shadcn/ui | Toast notifications |
| Recharts | recharts | Dashboard charts |

## Dashboard Charts

The dashboard displays two charts for quick status overview.

### Site Status (Pie Chart)

Donut chart showing online/offline/unknown distribution.

```tsx
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const statusData = [
  { name: 'Online', value: 8, color: '#22c55e' },
  { name: 'Offline', value: 2, color: '#ef4444' },
  { name: 'Unknown', value: 1, color: '#94a3b8' },
];

<ResponsiveContainer width="100%" height={200}>
  <PieChart>
    <Pie
      data={statusData}
      innerRadius={50}
      outerRadius={80}
      paddingAngle={2}
      dataKey="value"
    >
      {statusData.map((entry, i) => (
        <Cell key={i} fill={entry.color} />
      ))}
    </Pie>
  </PieChart>
</ResponsiveContainer>
```

### Pending Updates (Bar Chart)

Horizontal bar chart showing plugin vs theme updates.

```tsx
import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer } from 'recharts';

const updateData = [
  { name: 'Plugins', value: 12, color: '#3b82f6' },
  { name: 'Themes', value: 3, color: '#a855f7' },
];

<ResponsiveContainer width="100%" height={200}>
  <BarChart data={updateData} layout="vertical">
    <XAxis type="number" />
    <YAxis dataKey="name" type="category" width={60} />
    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
      {updateData.map((entry, i) => (
        <Cell key={i} fill={entry.color} />
      ))}
    </Bar>
  </BarChart>
</ResponsiveContainer>
```

## Toast Notifications

Toast notifications use Sonner for feedback on user actions.

### Setup

```tsx
// layout.tsx
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
```

### Usage

```tsx
import { toast } from 'sonner';

// Success notification
toast.success('Site added successfully', {
  description: 'My WordPress Site has been connected.'
});

// Error notification
toast.error('Failed to sync', {
  description: 'Check your network connection.'
});

// Loading state with ID
toast.loading('Syncing all sites...', { id: 'sync' });
// Update later
toast.success('All sites synced', { id: 'sync' });
```

### Common Patterns

| Action | Type | Message |
|--------|------|---------|
| Site added | `success` | "Site added successfully" |
| Site deleted | `success` | "Site deleted" |
| Sync complete | `success` | "All sites synced" |
| API error | `error` | "Failed to load sites" |
| Validation failed | `error` | Shows validation errors |

## Mobile Responsive Sidebar

The sidebar adapts to mobile screens using a sheet drawer.

### Desktop View

- Fixed 240px wide sidebar
- Always visible on lg+ screens
- Dark slate-900 background

### Mobile View

- Hidden sidebar replaced with header bar
- Hamburger menu button
- Full-height sheet drawer from left
- Auto-closes on navigation

### Implementation

```tsx
// Desktop: visible on lg+
<aside className="hidden lg:flex h-screen w-60 flex-col bg-slate-900">
  <SidebarContent />
</aside>

// Mobile: fixed header with sheet
<div className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900 lg:hidden">
  <Sheet>
    <SheetTrigger>
      <Menu className="h-6 w-6" />
    </SheetTrigger>
    <SheetContent side="left" className="w-60 bg-slate-900">
      <SidebarContent onNavigate={() => setOpen(false)} />
    </SheetContent>
  </Sheet>
</div>
```

### Breakpoints

| Screen | Sidebar | Header |
|--------|---------|--------|
| < 1024px (mobile/tablet) | Hidden | Visible with hamburger |
| >= 1024px (desktop) | Visible | Hidden |

## Sites Needing Attention

Dashboard section highlighting sites with low health scores.

```tsx
const sitesNeedingAttention = sites
  .filter(s => s.healthScore < 80)
  .sort((a, b) => a.healthScore - b.healthScore)
  .slice(0, 5);

{sitesNeedingAttention.map(site => (
  <Link href={`/sites/${site.id}`}>
    <span>Health: {site.healthScore}%</span>
    <Badge variant={site.healthScore < 50 ? 'destructive' : 'warning'}>
      {site.healthScore < 50 ? 'Critical' : 'Warning'}
    </Badge>
  </Link>
))}
```

Health score thresholds:
- **< 50**: Critical (red badge)
- **50-79**: Warning (amber badge)
- **80+**: Healthy (not shown)

## Form Validation UI

The add site form displays validation errors clearly.

```tsx
{errors.length > 0 && (
  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
    <ul className="list-disc pl-4 space-y-1">
      {errors.map((error, i) => (
        <li key={i}>{error}</li>
      ))}
    </ul>
  </div>
)}
```

Validation happens client-side before submission using `validateSiteData()`.

## Using with Claude Code

Claude Code can help you build UI components, customize charts, debug responsive layouts, and add new visualizations.

### Adding New Charts

Tell Claude what data you want to visualize:

> Add a line chart showing site count growth over the last 30 days

Claude will:
1. Design the data structure
2. Generate Recharts component
3. Add responsive styling
4. Match existing color scheme

Example implementation:
```tsx
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const growthData = [
  { date: 'Jan 1', count: 5 },
  { date: 'Jan 8', count: 8 },
  { date: 'Jan 15', count: 12 },
  { date: 'Jan 22', count: 15 }
]

<ResponsiveContainer width="100%" height={200}>
  <LineChart data={growthData}>
    <XAxis dataKey="date" />
    <YAxis />
    <Line
      type="monotone"
      dataKey="count"
      stroke="#3b82f6"
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>
```

### Customizing Toast Notifications

Ask Claude to enhance notifications:

> Add a toast with an undo action when deleting a site

Claude generates:
```tsx
toast.success('Site deleted', {
  description: 'The site has been removed.',
  action: {
    label: 'Undo',
    onClick: () => restoreSite(siteId)
  },
  duration: 5000
})
```

### Debugging Responsive Layout

Share layout issues with Claude:

> The sidebar overlaps content on iPad (768px width)

Claude will:
- Check Tailwind breakpoints (`lg:flex` starts at 1024px)
- Suggest using `md:` breakpoint for tablets
- Provide updated className

```tsx
// Before: Breaks at 768px
<aside className="hidden lg:flex">

// After: Fixed for tablets
<aside className="hidden md:flex">
```

### Adding shadcn/ui Components

Ask Claude to add new components:

> Add a dropdown menu to each site card with Edit/Delete/Archive options

Claude will:
```bash
# Install component
npx shadcn-ui@latest add dropdown-menu
```

Then generate the implementation:
```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger>
    <MoreVertical className="h-4 w-4" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => router.push(`/sites/${site.id}/edit`)}>
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => archiveSite(site.id)}>
      Archive
    </DropdownMenuItem>
    <DropdownMenuItem className="text-red-600" onClick={() => deleteSite(site.id)}>
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Chart Interaction

Add interactivity to charts:

> Make the pie chart slices clickable to filter sites by status

Claude adds onClick handlers:
```tsx
<Pie
  data={statusData}
  onClick={(data) => {
    const status = data.name.toLowerCase()
    router.push(`/sites?filter=${status}`)
  }}
  cursor="pointer"
/>
```

### Dark Mode Support

Ask Claude to add dark mode:

> Add dark mode toggle to WP Manager

Claude will:
1. Install `next-themes`
2. Set up theme provider
3. Update components with dark variants
4. Add toggle button to header

### Accessibility Improvements

Claude can enhance accessibility:

> Make the charts accessible to screen readers

Claude adds:
```tsx
<ResponsiveContainer
  width="100%"
  height={200}
  role="img"
  aria-label="Site status distribution: 8 online, 2 offline, 1 unknown"
>
  {/* Chart content */}
</ResponsiveContainer>
```

### Performance Optimization

Ask Claude to optimize rendering:

> The dashboard re-renders charts on every state change

Claude will:
- Wrap charts in `React.memo()`
- Use `useMemo()` for data transformations
- Implement virtual scrolling for large site lists

```tsx
const chartData = useMemo(() => {
  return calculateChartData(sites)
}, [sites])

const MemoizedPieChart = React.memo(SiteStatusChart)
```
