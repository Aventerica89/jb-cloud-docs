---
title: Renvio Companion App
description: Hemodialysis clinic companion app for charting and workflow optimization
source_project: /Users/jb/.21st/worktrees/renvio-companion-app/flat-vale
sidebar:
  order: 0
---

A hemodialysis clinic EMR companion application that streamlines charting and workflow for clinical staff working with the Renvio EMR system.

## Problem Statement

Hemodialysis clinics require precise documentation and efficient workflows. Current EMR systems like Renvio are comprehensive but can be slow for real-time charting during treatments. Clinical staff need a fast, focused companion app for:

- Quick vitals entry during treatments
- Real-time flowsheet charting
- Streamlined workflow management
- Reduced documentation burden

## Tech Stack

| Category | Technology | Rationale |
|----------|------------|-----------|
| Framework | Next.js 15 (App Router) | Full-stack, SSR for security, large ecosystem |
| Database | Turso (libSQL) | Edge SQLite, low latency, cost-effective |
| ORM | Drizzle ORM | Type-safe, lightweight, Turso-optimized |
| Auth | Better Auth | Self-hosted, HIPAA-friendly, flexible |
| UI | Tailwind CSS + shadcn/ui | Accessible, customizable components |
| Icons | Lucide | Clean, MIT licensed |

## Development Status

### Phase 1: Core Data Management (85% Complete)

**Completed:**
- Database schema with Turso and Drizzle ORM
- Basic UI layout (sidebar, header, dashboard)
- Comprehensive shadcn/ui component library (all major components)
- Development tooling (ESLint, Prettier, Husky, lint-staged)
- Testing infrastructure (Playwright, Vitest with coverage)
- Style guide and component showcase

**In Progress:**
- Better Auth integration
- API routes for CRUD operations

### Phase 2: Operations Module (20% Complete)

**Planned Features:**
- Operations Checklists with folder organization and drag-drop
- Labs Tracking for STAT lab entries
- Snippets for reusable text templates
- Daily completion tracking
- Backup and restore functionality

### Phase 3: Patient Flowsheets (Planned)

**Future Features:**
- Excel/CSV patient import
- Pod-based patient organization
- Quick charting modals
- Per-patient QA checklists
- Wheelchair weight calculator
- Tech check system

### Phase 4: Reporting (Planned)

**Future Features:**
- End of Shift Reports (EOSR)
- Timestamp logger
- Treatment summaries
- Analytics dashboard

## Target Users

- Hemodialysis nurses
- Patient care technicians (PCTs)
- Clinical supervisors
- Clinic administrators

## Security & Compliance

This application handles Protected Health Information (PHI) and is designed with HIPAA compliance in mind:

- TLS 1.3 in transit, AES-256 at rest
- Role-based access control
- Audit logging for PHI access
- Secure session management
- Input validation and XSS prevention

## Reference Project

This is a re-implementation of [HDFlowsheet-Cloud](https://github.com/JBMD-Creations/HDFlowsheet-Cloud) using a modern tech stack:

**What is being migrated:**
- Domain logic and business rules
- Data models and relationships
- Feature requirements
- Workflow patterns

**What is new:**
- Next.js 15 App Router (vs vanilla JS)
- Turso/Drizzle (vs Supabase)
- shadcn/ui components
- TypeScript throughout

## Links

- **Live Site:** [https://flat-vale.vercel.app](https://flat-vale.vercel.app)
- **Repository:** [GitHub: renvio-companion-app](https://github.com/Aventerica89/renvio-companion-app)
- **Implementation Guide:** [HDFlowsheet Migration Guide](/renvio-companion-app/implementation/)

## Quick Start

```bash
# Clone
git clone https://github.com/Aventerica89/renvio-companion-app.git
cd renvio-companion-app

# Install
npm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your Turso credentials

# Generate database schema
npm run db:generate
npm run db:push

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.
