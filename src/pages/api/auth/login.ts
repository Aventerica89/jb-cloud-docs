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
  const debugSteps: string[] = [];

  try {
    debugSteps.push('1. Starting');

    const body = await request.json();
    debugSteps.push('2. Parsed body');

    const { password } = body as { password: string };
    debugSteps.push(`3. Got password: ${!!password}`);

    if (!password) {
      return new Response(
        JSON.stringify({ error: 'Password is required', debug: debugSteps }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Access env vars from Cloudflare runtime
    const runtime = (locals as { runtime?: { env?: CloudflareEnv } }).runtime;
    const env = runtime?.env;
    debugSteps.push(`4. Got runtime: ${!!runtime}, env: ${!!env}`);

    const correctPassword = env?.CHAT_PASSWORD || import.meta.env.CHAT_PASSWORD;
    const jwtSecret = env?.JWT_SECRET || import.meta.env.JWT_SECRET;
    debugSteps.push(`5. Passwords: correct=${!!correctPassword}, jwt=${!!jwtSecret}`);

    if (!correctPassword || !jwtSecret) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error', debug: debugSteps }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const isValid = validatePassword(password, correctPassword);
    debugSteps.push(`6. Validation: ${isValid}`);

    if (!isValid) {
      return new Response(
        JSON.stringify({ error: 'Invalid password', debug: debugSteps }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const token = await createSession(jwtSecret);
    debugSteps.push(`7. Token created`);

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
    const message = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', debug: debugSteps, message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
