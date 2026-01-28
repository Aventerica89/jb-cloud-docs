import type { APIRoute } from 'astro';
import { validatePassword, createSession } from '../../lib/auth';

export const prerender = false;

interface CloudflareEnv {
  CHAT_PASSWORD: string;
  JWT_SECRET: string;
}

export const GET: APIRoute = async ({ locals }) => {
  const runtime = (locals as { runtime?: { env?: CloudflareEnv } }).runtime;
  const env = runtime?.env;

  const steps: string[] = [];
  let error: string | null = null;

  try {
    steps.push('1. Got runtime');

    const password = env?.CHAT_PASSWORD;
    const jwtSecret = env?.JWT_SECRET;

    steps.push(`2. CHAT_PASSWORD exists: ${!!password}, length: ${password?.length}`);
    steps.push(`3. JWT_SECRET exists: ${!!jwtSecret}, length: ${jwtSecret?.length}`);

    if (password && jwtSecret) {
      const testInput = 'Delta123!';
      const isValid = validatePassword(testInput, password);
      steps.push(`4. Password validation: ${isValid}`);

      if (isValid) {
        const token = await createSession(jwtSecret);
        steps.push(`5. Token created: ${token.substring(0, 20)}...`);
      }
    }
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  return new Response(
    JSON.stringify({ steps, error }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
