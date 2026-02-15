---
title: DevTools
description: Universal embeddable developer toolkit — floating widget + Next.js dashboard
---

# DevTools

Universal embeddable developer toolkit for any web application.

## Overview

DevTools is a two-part system:
1. **Widget** (`widget.js`) — A lightweight floating toolbar that can be embedded in any web app via a single `<script>` tag
2. **Dashboard** — A full Next.js application at `devtools.jbcloud.app` for deeper analysis

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | Next.js 16 (App Router) |
| Database | Turso (SQLite) + Drizzle ORM |
| Auth | PIN passcode (bcrypt + httpOnly cookies) |
| AI | Vercel AI SDK v6 (Anthropic, Google) |
| UI | Tailwind + shadcn/ui |
| Widget | Vite + Preact (IIFE bundle, Shadow DOM) |
| Hosting | Vercel |
| Repo | [Aventerica89/devtools](https://github.com/Aventerica89/devtools) |

## Dashboard Pages

- **Bug Tracker** — Log, categorize, and track bugs
- **Dev Log** — Timestamped development notes
- **API Tester** — HTTP request builder with history
- **JSON Viewer** — Format, validate, and diff JSON
- **Regex Tester** — Live regex testing with match highlighting
- **Color/CSS Tools** — Color picker, contrast checker, unit converter
- **Env Var Manager** — Compare and manage environment variables
- **Performance** — Web Vitals dashboard (LCP, CLS, INP, FCP, TTFB)
- **Deployments** — App Tracker integration
- **Settings** — Projects, AI providers, widget configuration
- **Style Guide** — Component library reference

## Widget Features

- Console interceptor (errors, warnings, logs)
- Network request interceptor
- Performance observer (Web Vitals)
- Bug reporter
- Quick AI analysis
- AI chat
- Event batching with beacon fallback

## Links

- **Dashboard**: [devtools.jbcloud.app](https://devtools.jbcloud.app)
- **Repository**: [github.com/Aventerica89/devtools](https://github.com/Aventerica89/devtools)
