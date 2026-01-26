import type { APIRoute } from 'astro';
import { validatePassword, createSession, createSessionCookie } from '../../../lib/auth';

export const prerender = false;

interface CloudflareEnv {
  CHAT_PASSWORD: string;
  JWT_SECRET: string;
  ANTHROPIC_API_KEY: string;
  GITHUB_TOKEN: string;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const { password } = body as { password: string };

    if (!password) {
      return new Response(
        JSON.stringify({ error: 'Password is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Access env vars from Cloudflare runtime
    const runtime = (locals as { runtime?: { env?: CloudflareEnv } }).runtime;
    const env = runtime?.env;

    const correctPassword = env?.CHAT_PASSWORD || import.meta.env.CHAT_PASSWORD;
    const jwtSecret = env?.JWT_SECRET || import.meta.env.JWT_SECRET;

    if (!correctPassword || !jwtSecret) {
      console.error('Missing CHAT_PASSWORD or JWT_SECRET environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!validatePassword(password, correctPassword)) {
      return new Response(
        JSON.stringify({ error: 'Invalid password' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = await createSession(jwtSecret);

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': createSessionCookie(token),
        },
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
