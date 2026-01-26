import type { APIRoute } from 'astro';
import { getSessionFromCookie, verifySession } from '../../lib/auth';
import { chat } from '../../lib/claude';
import type { ChatMessage, ChatResponse } from '../../types/chat';

export const prerender = false;

interface CloudflareEnv {
  CHAT_PASSWORD: string;
  JWT_SECRET: string;
  ANTHROPIC_API_KEY: string;
  GITHUB_TOKEN: string;
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW_MS = 60000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('cf-connecting-ip') ||
               request.headers.get('x-forwarded-for') ||
               'unknown';

    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please wait a moment.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Access env vars from Cloudflare runtime
    const runtime = (locals as { runtime?: { env?: CloudflareEnv } }).runtime;
    const env = runtime?.env;

    // Verify authentication
    const cookieHeader = request.headers.get('cookie');
    const token = getSessionFromCookie(cookieHeader);
    const jwtSecret = env?.JWT_SECRET || import.meta.env.JWT_SECRET;

    if (!token || !jwtSecret) {
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const session = await verifySession(token, jwtSecret);
    if (!session) {
      return new Response(
        JSON.stringify({ error: 'Session expired. Please log in again.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get API keys
    const anthropicKey = env?.ANTHROPIC_API_KEY || import.meta.env.ANTHROPIC_API_KEY;
    const githubToken = env?.GITHUB_TOKEN || import.meta.env.GITHUB_TOKEN;

    if (!anthropicKey || !githubToken) {
      console.error('Missing ANTHROPIC_API_KEY or GITHUB_TOKEN');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const body = await request.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Messages are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Call Claude
    const result = await chat(anthropicKey, githubToken, messages);

    const response: ChatResponse = {
      message: result.message,
      toolResults: result.toolResults,
    };

    return new Response(
      JSON.stringify(response),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Chat error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: `Chat failed: ${message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
