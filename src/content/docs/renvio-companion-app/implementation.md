---
title: Implementation Guide - Renvio Companion App
description: Comprehensive guide for migrating HDFlowsheet features to modern stack
sidebar:
  order: 3
---

This guide maps features from [HDFlowsheet-Cloud](https://github.com/JBMD-Creations/HDFlowsheet-Cloud) to the Renvio Companion App, providing a roadmap for re-implementing each module with a modern tech stack.

## Architecture Mapping

### Tech Stack Translation

| HDFlowsheet (Old)   | Renvio Companion (New)       | Notes                           |
| ------------------- | ---------------------------- | ------------------------------- |
| Vanilla JavaScript  | Next.js 15 (App Router)      | Modern React with SSR           |
| Single HTML file    | Component-based architecture | Better maintainability          |
| Supabase PostgreSQL | Turso (libSQL/SQLite)        | Edge-optimized, cost-effective  |
| Supabase Auth       | Better Auth (planned)        | Self-hosted, HIPAA-friendly     |
| Vercel Functions    | Next.js API Routes           | Built-in, no separate functions |
| LocalStorage        | React state + Turso          | Server-side persistence         |
| Global JS objects   | Zustand/Context API          | Type-safe state management      |

### Database Schema Alignment

**Already Implemented:**
- `app_data` (JSONB storage)
- `checklists`, `checklist_folders`, `checklist_items`, `checklist_completions`
- `labs`
- User authentication tables

**Need to Add:**
- Backup tables (`app_data_backups`)
- Performance indexes
- RLS-equivalent policies (handled in API layer)

## Feature Implementation Priority

### Phase 1: Core Data Management (85% Complete)

- [x] Database schema
- [x] Basic UI layout (sidebar, header, dashboard)
- [x] Comprehensive shadcn/ui component library
- [x] Development tooling (ESLint, Prettier, Husky, Playwright, Vitest)
- [ ] Auth integration (Better Auth)
- [ ] API routes for CRUD operations

### Phase 2: Operations Module (20% Complete)

**Status:** Foundation in place, features planned

#### 2.1 Operations Checklists

**Data Model:**

```typescript
interface Checklist {
  id: number
  name: string
  position: number
  role: string | null
  user_id: string
  created_at: Date
}

interface ChecklistFolder {
  id: number
  checklist_id: number
  name: string
  sort_order: number
  created_at: Date
}

interface ChecklistItem {
  id: number
  checklist_id: number
  folder_id: number | null
  item_text: string
  url: string | null
  sort_order: number
  created_at: Date
}

interface ChecklistCompletion {
  id: number
  checklist_id: number
  item_id: number
  completion_date: Date
  completed_at: Date
}
```

**Components to Build:**
- `src/app/(dashboard)/checklists/page.tsx` - Main checklist view
- `src/components/checklists/checklist-list.tsx` - List of all checklists
- `src/components/checklists/checklist-detail.tsx` - Single checklist with items
- `src/components/checklists/folder-group.tsx` - Folder organization
- `src/components/checklists/checklist-item.tsx` - Individual item with checkbox
- `src/components/checklists/checklist-edit-modal.tsx` - CRUD modal

**Features:**
- Multiple named checklists per user
- Folder organization (collapsible/expandable)
- Drag-and-drop reordering (use `@dnd-kit/core`)
- URL links for resources
- Daily completion tracking (resets each day at midnight)
- Automatic backup before save
- Backup restore with history viewer

**API Routes:**
- `GET /api/checklists` - Load checklists with folders, items, completions
- `POST /api/checklists` - Save/update checklist structure
- `POST /api/checklists/[id]/complete` - Toggle item completion
- `GET /api/checklists/backups` - List backups
- `POST /api/checklists/restore` - Restore from backup

#### 2.2 Labs Tracking

**Data Model:**

```typescript
interface Lab {
  id: number
  patient_name: string
  lab_result: string | null
  date_time: Date | null
  user_id: string
  created_at: Date
}
```

**Components:**
- `src/app/(dashboard)/labs/page.tsx` - Main labs view
- `src/components/labs/lab-list.tsx` - List of all lab entries
- `src/components/labs/lab-entry-form.tsx` - Add/edit lab entry
- `src/components/labs/lab-filters.tsx` - Filter by date, patient

**Features:**
- Per-patient STAT lab entries
- Multi-field form (drawn, ordered, results sent)
- Result text and action taken tracking
- Date/time picker for lab drawn time
- Filter and search capabilities

**API Routes:**
- `GET /api/labs` - Load all lab entries
- `POST /api/labs` - Upsert lab entries
- `DELETE /api/labs/[id]` - Delete lab entry

#### 2.3 Snippets

**Data Structure (stored in app_data):**

```typescript
interface SnippetConfiguration {
  id: number
  name: string
  sections: SnippetSection[]
}

interface SnippetSection {
  id: number
  name: string
  icon: string
  color: string
  order: number
  snippets: Snippet[]
}

interface Snippet {
  id: number
  text: string
  tags: string[]
  order: number
}
```

**Components:**
- `src/app/(dashboard)/snippets/page.tsx` - Main snippets view
- `src/components/snippets/snippet-config-list.tsx` - List configurations
- `src/components/snippets/snippet-sections.tsx` - Section tabs
- `src/components/snippets/snippet-grid.tsx` - Grid of snippets
- `src/components/snippets/snippet-drawer.tsx` - Reusable drawer for flowsheets
- `src/components/snippets/snippet-edit-modal.tsx` - CRUD modal

**Features:**
- User-configurable snippet configurations
- Sections (Pre Dialysis, Weight Management, etc.)
- Tagged snippets for filtering
- Drag-reorderable sections and snippets
- Full CRUD support via UI
- Click-to-copy snippets
- Integration with patient notes (Phase 3)

**API Routes:**
- `GET /api/snippets` - Load snippet configurations
- `POST /api/snippets` - Save snippet configuration

### Phase 3: Patient Flowsheets (0% Complete)

**Status:** Planned for future implementation

#### 3.1 Patient Data Management

**Data Structure (stored in app_data as flowsheet):**

```typescript
interface Patient {
  id: number
  name: string
  section: 'B1' | 'B2' | 'A1' | 'A2' | 'TCH'
  shift: '1st' | '2nd' | '3rd'
  technician: string
  pod: string
  chair: number | string
  rxTime: string // HH:MM format
  dialyzer: string
  dryWeight: string
  preWeight: string
  postWeight: string
  goalUF: string
  startTime: string
  endTime: string
  quickNotes: string
  selectedSnippets: number[]
  miscTodos: MiscTodo[]
  labs: PatientLab[]
  techCheck: TechCheck
  wheelchairItems: WheelchairItem[]
}

interface TechCheck {
  initiationTime: boolean
  orderVerification: boolean
  txInitiated: boolean
  txEnded: boolean
  blankVitalsNotes: boolean
  heparinBolus: boolean
  lidocaine: boolean
  postWeight: boolean
}
```

**Components:**
- `src/app/(dashboard)/flowsheets/page.tsx` - Main flowsheet view
- `src/components/flowsheets/patient-import.tsx` - Excel/CSV import
- `src/components/flowsheets/patient-list.tsx` - List of patients
- `src/components/flowsheets/patient-card.tsx` - Individual patient card
- `src/components/flowsheets/patient-tabs.tsx` - Pod-based tabs
- `src/components/flowsheets/section-selector.tsx` - B1/B2/A1/A2/TCH tabs
- `src/components/flowsheets/quick-assign-modal.tsx` - Bulk tech assignment
- `src/components/flowsheets/quick-chart-modal.tsx` - Fast data entry
- `src/components/flowsheets/quick-notes-modal.tsx` - Patient notes
- `src/components/flowsheets/qa-checklist.tsx` - Per-patient QA
- `src/components/flowsheets/tech-check.tsx` - Missing item tracker

**Features:**
- Excel/CSV import with column mapping
- Pod-based patient tabs (grouped by technician)
- Section selector (B1, B2, A1, A2, TCH)
- Quick Assign modal for bulk tech assignment
- Quick Chart modal for fast data entry
- Quick Notes modal per patient
- Expandable/collapsible chart sections
- Multi-shift support (1st, 2nd, 3rd)
- Treatment parameters (rxTime, dialyzer, weights, times)

**API Routes:**
- `GET /api/flowsheets` - Load patient flowsheet data
- `POST /api/flowsheets` - Save flowsheet data
- `POST /api/flowsheets/import` - Import from Excel/CSV

#### 3.2 QA Checklist (Per-Patient)

**Data Structure (embedded in Patient):**

```typescript
interface PatientQA {
  preCheck: boolean
  preCheckSubs: {
    machineCheck: boolean
    preDialysis: boolean
    orderVerify: boolean
  }
  thirtyMinCheck: boolean
  medsComplete: boolean
  medsSubs: {
    medsGiven: boolean
    medsSheetSigned: boolean
  }
  abxIDPN: boolean
  statLabs: boolean
  emailSent: boolean
  ettSigned: boolean
  missedTx: boolean
  missedTxSubs: {
    rescheduled: boolean
    calledOff: boolean
    noCallNoShow: boolean
  }
  hospitalization: boolean
  hospitalizationHospital: string
  hospitalizationSubs: {
    hhPrep: boolean
    hospEntered: boolean
    whiteboard: boolean
    eosrReport: boolean
  }
  misc: boolean
  miscSubs: {
    thirtyMinCheck: boolean
    abxIDPN: boolean
    statLabs: boolean
    labsPrep: boolean
  }
  chartClosed: boolean
}
```

**Component:**
- `src/components/flowsheets/qa-grid.tsx` - 5-column grid layout

**Features:**
- Pre Check with sub-items (machine check, pre-dialysis, order verify)
- 30-Minute Check
- Medications Complete with sub-items
- Abx/IDPN, STAT Labs, Email Sent, ETT Signed
- Misc category with sub-items
- Missed Tx tracking (rescheduled, called off, no-show)
- Hospitalization with hospital name and sub-tasks
- Tech Check with 8 missing item categories
- Alert badge for incomplete items

#### 3.3 Wheelchair Weight Calculator

**Component:**
- `src/components/flowsheets/wheelchair-calculator.tsx` - Equipment calculator

**Features:**
- Equipment itemization with pre/post checkboxes
- Weight entry per item
- Pre/post column totals
- Equipment profiles saved by patient initials
- Integration with patient pre/post weights

### Phase 4: Reporting (0% Complete)

**Status:** Planned for future implementation

#### 4.1 End of Shift Reports (EOSR)

**Data Structure:**

```typescript
interface EOSRState {
  completeEdits: Record<number, string> // patientId -> edited text
  earlyTermEdits: Record<number, string>
  weightEdits: Record<number, string>
}
```

**Components:**
- `src/app/(dashboard)/reports/page.tsx` - Main EOSR view
- `src/components/reports/eosr-summary.tsx` - Summarized data
- `src/components/reports/eosr-patient-section.tsx` - Per-patient section
- `src/components/reports/eosr-editable-note.tsx` - In-place editing

**Features:**
- Summarizes completed treatments
- Early-terminated patient notes
- Weight tracking summary
- In-place editing of notes
- Drag-reorderable patient sections
- Persists edits in database
- Print/export functionality

#### 4.2 Timestamp Logger

**Data Model (stored in app_data):**

```typescript
interface TimestampLog {
  id: string
  time: string // Formatted time string
  timestamp: number // Unix timestamp
  patientId: number
  chair: string
  patientName: string
  event: string
}
```

**Component:**
- `src/components/common/timestamp-logger.tsx` - Quick logger modal

**Features:**
- Select patient by chair + name
- Log events with timezone (Phoenix, AZ)
- Click-to-copy timestamp
- Auto-saves to database
- Persistent log history

## State Management Strategy

### Recommendation: Zustand

HDFlowsheet uses global JS objects. We'll use Zustand for type-safe state management.

**Stores to Create:**

```typescript
// src/stores/usePatientStore.ts
interface PatientStore {
  patients: Patient[]
  activePatientId: number | null
  activePod: string | null
  activeShift: '1st' | '2nd' | '3rd'
  // ... actions
}

// src/stores/useChecklistStore.ts
interface ChecklistStore {
  checklists: Checklist[]
  activeChecklistId: number | null
  completions: Record<string, CompletionData>
  // ... actions
}

// src/stores/useSnippetStore.ts
interface SnippetStore {
  configurations: SnippetConfig[]
  activeConfigId: number | null
  // ... actions
}

// src/stores/useLabStore.ts
interface LabStore {
  entries: LabEntry[]
  activeOpsSubTab: 'checklists' | 'labs'
  // ... actions
}
```

## Data Persistence Strategy

### HDFlowsheet Approach:
1. LocalStorage for immediate access
2. Debounced auto-save (1 second)
3. Server sync on login

### Our Approach:
1. **Server-first:** No LocalStorage (HIPAA concerns)
2. **Optimistic updates:** Update UI immediately, sync to server
3. **Auto-save:** Debounced saves via Zustand middleware
4. **Conflict resolution:** Server wins on conflicts

**Implementation:**

```typescript
// src/lib/persistence.ts
import { debounce } from 'lodash'

export function createPersistence<T>(storeName: string, apiEndpoint: string) {
  const debouncedSave = debounce(async (data: T) => {
    await fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  }, 1000)

  return {
    save: debouncedSave,
    load: async (): Promise<T> => {
      const res = await fetch(apiEndpoint)
      return res.json()
    },
  }
}
```

## API Route Patterns

### Generic JSONB Storage

```typescript
// app/api/data/[type]/route.ts
import { db } from '@/lib/db'
import { appData } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(
  request: Request,
  { params }: { params: { type: string } }
) {
  const userId = await getUserId(request)

  const data = await db
    .select()
    .from(appData)
    .where(and(eq(appData.type, params.type), eq(appData.userId, userId)))
    .limit(1)

  return Response.json({ success: true, data: data[0]?.data })
}
```

### Checklist-Specific Routes

```typescript
// app/api/checklists/route.ts
export async function GET(request: Request) {
  const userId = await getUserId(request)
  const today = new Date().toISOString().split('T')[0]

  // Load checklists with folders and items
  const checklists = await db.query.checklists.findMany({
    where: eq(checklists.userId, userId),
    with: {
      folders: {
        orderBy: asc(checklistFolders.sortOrder),
      },
      items: {
        orderBy: asc(checklistItems.sortOrder),
      },
    },
  })

  // Load today's completions
  const completions = await db.query.checklistCompletions.findMany({
    where: and(eq(checklistCompletions.completionDate, today)),
  })

  return Response.json({
    success: true,
    data: { checklists, completions },
  })
}
```

## UI/UX Adaptations

### HDFlowsheet uses:
- Single-page app with tab switching
- Modals for most interactions
- Inline editing
- Drag-and-drop with native HTML5 API

### We'll use:
- **Next.js App Router** for navigation
- **shadcn/ui Dialog** for modals
- **shadcn/ui Form** for forms
- **@dnd-kit** for drag-and-drop (better mobile support)
- **shadcn/ui Table** for data grids
- **Tanstack Table** for advanced tables

### Component Library Usage:

```typescript
// Checklists
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Accordion } from '@/components/ui/accordion'

// Forms
import { Form, FormField } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'

// Data Display
import { Table } from '@/components/ui/table'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Drag and Drop
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
```

## Testing Strategy

### Unit Tests
- All utility functions
- Zustand stores (state mutations)
- Data transformation logic

### Integration Tests
- API routes with test database
- Form submissions
- Data persistence

### E2E Tests (Playwright)

**Critical Flows:**

1. **Checklist Management:**
   - Create new checklist
   - Add folder
   - Add items to folder
   - Reorder items
   - Mark items complete
   - Verify daily reset

2. **Labs Tracking:**
   - Add lab entry
   - Edit lab entry
   - Delete lab entry
   - Filter labs by date

3. **Snippets:**
   - Create snippet configuration
   - Add section
   - Add snippet to section
   - Reorder snippets
   - Use snippet in notes

4. **Patient Flowsheets:**
   - Import patients from CSV
   - Assign technician
   - Update patient data
   - Complete QA checklist
   - Generate EOSR

## Security Considerations

### HDFlowsheet Approach:
- Supabase Row Level Security (RLS)
- JWT tokens
- Database-level isolation

### Our Approach:
- **API-layer authorization:** Verify userId in every route
- **Better Auth:** Self-hosted auth system
- **No RLS:** SQLite doesn't support RLS, enforce in API
- **Input validation:** Zod schemas for all inputs
- **Rate limiting:** Prevent abuse

**Example:**

```typescript
// lib/auth-helpers.ts
export async function getUserId(request: Request): Promise<string> {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  return session.user.id
}

// API route
export async function POST(request: Request) {
  const userId = await getUserId(request) // Throws if not authenticated
  // Proceed with authenticated user
}
```

## Performance Optimizations

### HDFlowsheet Issues:
- Large LocalStorage data can slow down
- Debounced saves can lose data on crash
- Single HTML file becomes massive

### Our Optimizations:
- **Code splitting:** Next.js automatic chunking
- **Server components:** Reduce client JS
- **Streaming:** Stream large datasets
- **Indexes:** Add database indexes for common queries
- **Caching:** Use Next.js cache for static data

**Recommended Indexes:**

```sql
CREATE INDEX idx_checklists_user_id ON checklists(user_id);
CREATE INDEX idx_checklist_items_checklist_id ON checklist_items(checklist_id);
CREATE INDEX idx_checklist_completions_date ON checklist_completions(completion_date);
CREATE INDEX idx_labs_user_id ON labs(user_id);
CREATE INDEX idx_labs_date_time ON labs(date_time);
```

## Next Steps

1. **Immediate:**
   - Set up Better Auth
   - Create API routes for checklists
   - Build checklist UI components
   - Implement drag-and-drop

2. **Short-term:**
   - Labs tracking module
   - Snippets module
   - State management with Zustand

3. **Medium-term:**
   - Patient flowsheets
   - QA checklists
   - EOSR generation

4. **Long-term:**
   - Data migration from HDFlowsheet
   - Mobile-optimized views
   - Offline support (PWA)
   - Advanced reporting
