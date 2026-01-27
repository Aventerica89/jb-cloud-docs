import * as jose from 'jose';
import type { SessionPayload } from '../types/chat';

const SESSION_DURATION_MS = 3600000; // 1 hour

export async function createSession(jwtSecret: string): Promise<string> {
  const secret = new TextEncoder().encode(jwtSecret);

  const payload: SessionPayload = {
    authenticated: true,
    exp: Date.now() + SESSION_DURATION_MS,
  };

  const token = await new jose.SignJWT(payload as unknown as jose.JWTPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);

  return token;
}

export async function verifySession(
  token: string,
  jwtSecret: string
): Promise<SessionPayload | null> {
  try {
    const secret = new TextEncoder().encode(jwtSecret);

    const { payload } = await jose.jwtVerify(token, secret);

    const session = payload as unknown as SessionPayload;

    // Check if session is expired
    if (session.exp && session.exp < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function validatePassword(input: string, password: string): boolean {
  // Constant-time comparison to prevent timing attacks
  if (input.length !== password.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < input.length; i++) {
    result |= input.charCodeAt(i) ^ password.charCodeAt(i);
  }

  return result === 0;
}

export function getSessionFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) {
    return null;
  }

  const cookies = cookieHeader.split(';').map(c => c.trim());
  const sessionCookie = cookies.find(c => c.startsWith('chat_session='));

  if (!sessionCookie) {
    return null;
  }

  return sessionCookie.split('=')[1];
}

export function createSessionCookie(token: string): string {
  return `chat_session=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=3600; Path=/`;
}
