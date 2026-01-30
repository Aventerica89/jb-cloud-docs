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

## Key Features

### Phase 1: Foundation (In Progress)
- User authentication with Better Auth
- Patient list with search and filtering
- Patient detail view with alerts
- Treatment creation and management
- Vital signs entry (quick capture)
- Basic flowsheet view
- Role-based access control (nurse, PCT, supervisor, admin)

### Phase 2: Core Features (Planned)
- Advanced flowsheet grid with inline editing
- Medication documentation
- Complication logging
- Treatment timer and status management
- Pre/post assessment forms

### Phase 3: Advanced (Future)
- Renvio EMR integration (bi-directional sync)
- Offline/PWA support
- Mobile companion app
- Analytics dashboard
- Multi-clinic support

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

## Repository

[GitHub: renvio-companion-app](https://github.com/Aventerica89/renvio-companion-app)

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
