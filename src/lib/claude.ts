import Anthropic from '@anthropic-ai/sdk';
import type { ChatMessage, ClaudeTool, ToolCall } from '../types/chat';
import * as github from './github';

// Tool definitions for Claude
export const tools: ClaudeTool[] = [
  {
    name: 'list_files',
    description: 'List files and directories in the documentation repository. Use this to explore the docs structure.',
    input_schema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Directory path relative to repo root (e.g., "src/content/docs" or "src/content/docs/xcloud")',
        },
      },
      required: ['path'],
    },
  },
  {
    name: 'read_file',
    description: 'Read the contents of a documentation file. Use this to understand existing content before making changes.',
    input_schema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'File path relative to repo root (e.g., "src/content/docs/xcloud/ssh-setup.md")',
        },
      },
      required: ['path'],
    },
  },
  {
    name: 'write_file',
    description: 'Create or update a documentation file and commit it to GitHub. Use conventional commit messages.',
    input_schema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'File path relative to repo root (must be in src/content/docs/)',
        },
        content: {
          type: 'string',
          description: 'Full content of the file including frontmatter',
        },
        message: {
          type: 'string',
          description: 'Commit message following conventional commits (e.g., "docs: add SSH setup guide")',
        },
      },
      required: ['path', 'content', 'message'],
    },
  },
];

// System prompt with docs context
const systemPrompt = `You are a helpful documentation assistant for JB Cloud Docs (docs.jbcloud.app).

## Your Capabilities
1. List and explore documentation files
2. Read existing documentation content
3. Create new documentation files
4. Update existing documentation with commits to GitHub

## Repository Info
- Owner: Aventerica89
- Repo: jb-cloud-docs
- Branch: main
- Docs location: src/content/docs/

## Documentation Structure
The site uses Astro Starlight. Each markdown file requires frontmatter:

\`\`\`yaml
---
title: Page Title
description: Brief description for SEO and previews
sidebar:
  order: 1
---
\`\`\`

## Current Sections
- xcloud/ - Self-hosted server and Docker docs
- cloudflare/ - DNS, CDN, and Pages setup
- supabase/ - Database and backend
- vercel/ - Frontend deployment
- bcms/ - Content management
- bricks-builder-agent/ - Bricks Builder AI agent docs

## Guidelines
- Always read existing content before modifying
- Use proper Markdown formatting with headers, code blocks, and lists
- Include practical examples and code snippets
- Follow the existing documentation style
- Use conventional commit messages: feat:, fix:, docs:, etc.
- Keep content focused and scannable

## Important
Only modify files in src/content/docs/. You cannot access other parts of the repository for security reasons.`;

export async function chat(
  apiKey: string,
  githubToken: string,
  messages: ChatMessage[]
): Promise<{ message: string; toolResults: ToolCall[] }> {
  const client = new Anthropic({ apiKey });

  // Convert our messages to Anthropic format
  const anthropicMessages = messages.map(msg => ({
    role: msg.role as 'user' | 'assistant',
    content: msg.content,
  }));

  const toolResults: ToolCall[] = [];

  // Initial API call
  let response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4096,
    system: systemPrompt,
    tools: tools as Anthropic.Tool[],
    messages: anthropicMessages,
  });

  // Process tool calls in a loop
  while (response.stop_reason === 'tool_use') {
    const toolUseBlocks = response.content.filter(
      (block): block is Anthropic.ToolUseBlock => block.type === 'tool_use'
    );

    const toolResultContents: Anthropic.ToolResultBlockParam[] = [];

    for (const toolUse of toolUseBlocks) {
      const toolCall: ToolCall = {
        id: toolUse.id,
        name: toolUse.name,
        input: toolUse.input as Record<string, unknown>,
        status: 'running',
      };

      try {
        let result: string;

        switch (toolUse.name) {
          case 'list_files': {
            const input = toolUse.input as { path: string };
            const files = await github.listFiles(githubToken, input.path);
            result = `Files in ${input.path}:\n${files.join('\n')}`;
            break;
          }
          case 'read_file': {
            const input = toolUse.input as { path: string };
            const content = await github.readFile(githubToken, input.path);
            result = content;
            break;
          }
          case 'write_file': {
            const input = toolUse.input as { path: string; content: string; message: string };
            const { sha, url } = await github.writeFile(
              githubToken,
              input.path,
              input.content,
              input.message
            );
            result = `File committed successfully!\nSHA: ${sha}\nURL: ${url}`;
            break;
          }
          default:
            result = `Unknown tool: ${toolUse.name}`;
        }

        toolCall.result = result;
        toolCall.status = 'success';
        toolResultContents.push({
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: result,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toolCall.result = `Error: ${errorMessage}`;
        toolCall.status = 'error';
        toolResultContents.push({
          type: 'tool_result',
          tool_use_id: toolUse.id,
          content: `Error: ${errorMessage}`,
          is_error: true,
        });
      }

      toolResults.push(toolCall);
    }

    // Continue the conversation with tool results
    response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      tools: tools as Anthropic.Tool[],
      messages: [
        ...anthropicMessages,
        { role: 'assistant', content: response.content },
        { role: 'user', content: toolResultContents },
      ],
    });
  }

  // Extract final text response
  const textBlocks = response.content.filter(
    (block): block is Anthropic.TextBlock => block.type === 'text'
  );

  const finalMessage = textBlocks.map(block => block.text).join('\n');

  return { message: finalMessage, toolResults };
}
