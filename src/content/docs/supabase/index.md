---
title: Supabase Overview
description: Getting started with self-hosted Supabase.
sidebar:
  order: 0
---

Documentation for self-hosted Supabase setup and configuration.

## Topics

- Self-hosted deployment
- Database configuration
- Authentication setup
- Storage configuration

*More guides coming soon.*

## Using with Claude Code

Claude Code can assist with Supabase setup, configuration, and troubleshooting.

### Database Schema Design

Describe your data model to Claude:

> I need a Supabase schema for a blog with posts, authors, and comments. Include RLS policies.

Claude generates the SQL migrations and Row Level Security policies.

### Supabase CLI Commands

Ask Claude for help with the CLI:

```bash
# Claude can run Supabase CLI commands
supabase status
supabase db diff
supabase functions serve
```

### Self-Hosted Configuration

Share your Docker Compose or configuration issues:

> My self-hosted Supabase auth isn't working. Here's my docker-compose.yml: [paste]

Claude identifies misconfigurations and suggests fixes.

### Edge Functions

Tell Claude what you need:

> Create a Supabase Edge Function that sends a welcome email when a user signs up

Claude generates the Deno function with proper Supabase client setup.
