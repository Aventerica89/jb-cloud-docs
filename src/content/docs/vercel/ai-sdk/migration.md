---
title: AI SDK Migration Guide
description: Upgrade from older versions of the Vercel AI SDK.
sidebar:
  order: 3
---

Guide for migrating between AI SDK versions.

## Version History

| Version | Release | Key Changes |
|---------|---------|-------------|
| 4.0 | 2024 | Unified model format, new streaming API |
| 3.4 | 2024 | Tool calling improvements |
| 3.0 | 2024 | Initial stable release |

## Migrating to v4.0

### Model Format Changes

The unified model format replaces provider-specific imports:

```typescript
// Before (v3.x)
import { openai } from '@ai-sdk/openai';
import { anthropic } from '@ai-sdk/anthropic';

const result = await generateText({
  model: openai('gpt-4'),
  prompt: 'Hello',
});

// After (v4.0)
import { generateText } from 'ai';

const result = await generateText({
  model: 'openai/gpt-4o',  // String format
  prompt: 'Hello',
});
```

### Streaming Response Changes

The streaming API was simplified:

```typescript
// Before (v3.x)
const result = await streamText({
  model: openai('gpt-4'),
  prompt: 'Hello',
});

return new StreamingTextResponse(result.toAIStream());

// After (v4.0)
const result = await streamText({
  model: 'openai/gpt-4o',
  prompt: 'Hello',
});

return result.toDataStreamResponse();
```

### Provider Installation

You still need provider packages, but the import pattern changed:

```bash
# Install provider packages
npm i @ai-sdk/openai @ai-sdk/anthropic
```

The SDK auto-discovers installed providers when you use string model names.

## Common Migration Issues

### "Model not found" Error

Make sure you have the provider package installed:

```bash
npm i @ai-sdk/anthropic  # For anthropic/* models
npm i @ai-sdk/openai     # For openai/* models
npm i @ai-sdk/google     # For google/* models
```

### Type Errors After Upgrade

Update your imports:

```typescript
// Old
import { Message } from 'ai';

// New
import type { Message } from 'ai';
```

### Streaming Not Working

Check your API route returns the correct response:

```typescript
// Correct v4.0 pattern
return result.toDataStreamResponse();

// NOT this (old pattern)
return new StreamingTextResponse(result.toAIStream());
```

## ELI5: Why Upgrade?

The new version is simpler:
- **One import** instead of many provider imports
- **String model names** are easier to change
- **Better streaming** with less boilerplate
- **Automatic provider discovery** means less setup

If your code works, you don't have to upgrade immediately. But new features only come to v4+.

## Related

- [AI SDK Overview](/vercel/ai-sdk/) - Getting started with the latest version
- [Core Functions](/vercel/ai-sdk/core/) - Updated API reference
