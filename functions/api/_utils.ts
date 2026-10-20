import bcrypt from 'bcryptjs';

export interface SessionPayload {
  username: string;
  role: 'admin';
  isTemporary: boolean;
  iat: number;
  exp: number;
}

// In-memory rate limiting store (per worker/process)
const rateLimitStore = new Map<string, { count: number; resetTime: number; lockedUntil?: number }>();

// Verified Bcrypt hash of '2006' with 10 salt rounds
export const DEFAULT_TEMP_HASH = '$2b$10$qnF2FNDQUfy.KZBrpGqEluyaU3v2u7NoErUCNYmuWUhl4N2YSTLcC';
export const DEFAULT_ADMIN_USERNAME = 'ANSAB';

// Runtime in-memory password hash (if Supabase is not configured or in dev fallback)
let runtimePasswordHash: string | null = null;
let runtimeIsTemporary = true;

export function getRuntimePasswordHash(): string {
  return runtimePasswordHash || DEFAULT_TEMP_HASH;
}

export function setRuntimePasswordHash(newHash: string): void {
  runtimePasswordHash = newHash;
  runtimeIsTemporary = false;
}

export function isRuntimeTemporary(): boolean {
  return runtimeIsTemporary;
}

/**
 * Universal Base64URL encoder that works in both Cloudflare Workers & Node.js
 */
export function base64UrlEncode(strOrBuffer: string | Uint8Array): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(strOrBuffer as any).toString('base64url');
  }
  const bytes = typeof strOrBuffer === 'string' ? new TextEncoder().encode(strOrBuffer) : strOrBuffer;
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

/**
 * Universal Base64URL decoder that works in both Cloudflare Workers & Node.js
 */
export function base64UrlDecode(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'base64url').toString('utf8');
  }
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) base64 += '=';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Sign a secure JWT session token using standard Web Crypto HMAC-SHA256
 */
export async function signSession(
  payload: Omit<SessionPayload, 'iat' | 'exp'>,
  secret: string,
  expiresInSeconds: number = 86400
): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;
  const fullPayload: SessionPayload = { ...payload, iat, exp };

  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify(fullPayload));
  const data = `${header}.${body}`;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const sigBytes = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  const signature = base64UrlEncode(new Uint8Array(sigBytes));

  return `${data}.${signature}`;
}

/**
 * Verify a JWT session token using standard Web Crypto HMAC-SHA256
 */
export async function verifySession(token: string, secret: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, body, signature] = parts;
    const data = `${header}.${body}`;

    const key = await crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    let b64 = signature.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '=';
    const binary = atob(b64);
    const sigBytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      sigBytes[i] = binary.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify('HMAC', key, sigBytes, new TextEncoder().encode(data));
    if (!isValid) return null;

    const payload: SessionPayload = JSON.parse(base64UrlDecode(body));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return null; // Token expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Rate limiting check (e.g., 5 attempts in 15 minutes)
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 15 * 60 * 1000
): { allowed: boolean; remaining: number; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxAttempts - 1 };
  }

  if (entry.lockedUntil && entry.lockedUntil > now) {
    return { allowed: false, remaining: 0, retryAfter: Math.ceil((entry.lockedUntil - now) / 1000) };
  }

  entry.count += 1;
  if (entry.count > maxAttempts) {
    entry.lockedUntil = now + windowMs;
    return { allowed: false, remaining: 0, retryAfter: Math.ceil(windowMs / 1000) };
  }

  return { allowed: true, remaining: maxAttempts - entry.count };
}

export function resetRateLimit(key: string): void {
  rateLimitStore.delete(key);
}

/**
 * Hash password securely using bcryptjs
 */
export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, 10);
}

/**
 * Verify plain text password against bcrypt hash
 */
export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plainText, hash);
  } catch {
    return false;
  }
}

/**
 * Extract client IP address from Cloudflare or standard proxy headers
 */
export function getClientIp(req: Request): string {
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp;

  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();

  return req.headers.get('x-real-ip') || '127.0.0.1';
}

/**
 * Get environment variable helper from context.env or process.env
 */
export function getEnv(contextOrReq: any): Record<string, string | undefined> {
  if (contextOrReq?.env && typeof contextOrReq.env === 'object') {
    return contextOrReq.env;
  }
  if (typeof process !== 'undefined' && process.env) {
    return process.env;
  }
  return {};
}

/**
 * Standard CORS and JSON response helper
 */
export function jsonResponse(data: any, status: number = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      ...extraHeaders,
    },
  });
}

export function corsResponse(): Response {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
    },
  });
}
