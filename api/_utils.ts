import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// Rate limiting in-memory store
const rateLimitStore = new Map<string, { count: number; resetTime: number; lockedUntil?: number }>();

export interface SessionPayload {
  username: string;
  role: 'admin';
  isTemporary: boolean;
  iat: number;
  exp: number;
}

const DEFAULT_SECRET = process.env.ADMIN_JWT_SECRET || 'ansab-portfolio-secure-token-secret-fallback-key-2026';
// Bcrypt hash of '2006'
export const DEFAULT_TEMP_HASH = '$2b$10$dKXSyvg0nmeRmcV0SeJ72uDlLFmfsnioLGYq4uFOugCEJDgdMo.7q';

// In-memory password override for local dev session persistence if DB is not attached
let inMemoryPasswordHash: string | null = null;
let inMemoryIsTemporary = true;

export function getDevPasswordHash(): string {
  return inMemoryPasswordHash || DEFAULT_TEMP_HASH;
}

export function setDevPasswordHash(newHash: string): void {
  inMemoryPasswordHash = newHash;
  inMemoryIsTemporary = false;
}

export function isDevTemporary(): boolean {
  return inMemoryIsTemporary;
}

/**
 * Sign a lightweight, tamper-proof HMAC-SHA256 session token
 */
export function signSession(payload: Omit<SessionPayload, 'iat' | 'exp'>, expiresInSeconds: number = 86400): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;
  const fullPayload: SessionPayload = { ...payload, iat, exp };
  
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const body = Buffer.from(JSON.stringify(fullPayload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', DEFAULT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64url');
    
  return `${header}.${body}.${signature}`;
}

/**
 * Verify a session token
 */
export function verifySession(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [header, body, signature] = parts;
    const expectedSignature = crypto
      .createHmac('sha256', DEFAULT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64url');
      
    if (signature !== expectedSignature) return null;
    
    const payload: SessionPayload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'));
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < now) {
      return null; // Expired
    }
    
    return payload;
  } catch {
    return null;
  }
}

/**
 * Rate limit check
 * @returns true if allowed, false if blocked
 */
export function checkRateLimit(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): { allowed: boolean; remaining: number; retryAfter?: number } {
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
 * Hash password securely using bcrypt
 */
export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, 10);
}

/**
 * Compare password with hash
 */
export async function verifyPassword(plainText: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}

/**
 * Extract client IP from headers
 */
export function getClientIp(req: any): string {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return req.headers?.['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
}

/**
 * Hash IP address for privacy-conscious storage
 */
export function hashIp(ip: string): string {
  return crypto.createHash('sha256').update(ip + 'ansab-salt').digest('hex').substring(0, 16);
}
