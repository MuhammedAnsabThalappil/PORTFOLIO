import {
  checkRateLimit,
  resetRateLimit,
  verifyPassword,
  signSession,
  getClientIp,
  getEnv,
  getRuntimePasswordHash,
  isRuntimeTemporary,
  jsonResponse,
  corsResponse,
  DEFAULT_ADMIN_USERNAME,
} from '../_utils';
import { getSupabaseServer } from '../_supabase';

export async function onRequest(context: any): Promise<Response> {
  const request: Request = context.request;
  const env = getEnv(context);

  if (request.method === 'OPTIONS') {
    return corsResponse();
  }

  if (request.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405);
  }

  try {
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`login_${ip}`, 5, 15 * 60 * 1000);

    if (!rateCheck.allowed) {
      return jsonResponse(
        {
          error: `Too many failed attempts. Please try again in ${rateCheck.retryAfter || 900} seconds.`,
        },
        429
      );
    }

    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON request payload' }, 400);
    }

    const { username, password } = body || {};

    if (!username || !password) {
      return jsonResponse({ error: 'Username and password are required' }, 400);
    }

    const expectedUsername = (env.INITIAL_ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME).trim();
    if (String(username).trim().toUpperCase() !== expectedUsername.toUpperCase()) {
      return jsonResponse(
        {
          error: 'Invalid username or password',
          remainingAttempts: rateCheck.remaining,
        },
        401
      );
    }

    let passwordValid = false;
    let isTemporary = true;

    // Check database if Supabase server client is available
    const supabase = getSupabaseServer(env);
    if (supabase) {
      try {
        const { data: user, error } = await supabase
          .from('admin_users')
          .select('id, username, password_hash, is_temporary_password')
          .eq('username', expectedUsername)
          .maybeSingle();

        if (!error && user && user.password_hash) {
          passwordValid = await verifyPassword(String(password), user.password_hash);
          isTemporary = Boolean(user.is_temporary_password);

          if (passwordValid) {
            await supabase
              .from('admin_users')
              .update({ last_login_at: new Date().toISOString(), failed_login_attempts: 0 })
              .eq('id', user.id);
          }
        } else {
          // Fallback to runtime password hash (default: bcrypt of 2006)
          const currentHash = getRuntimePasswordHash();
          passwordValid = await verifyPassword(String(password), currentHash);
          isTemporary = isRuntimeTemporary();
        }
      } catch {
        const currentHash = getRuntimePasswordHash();
        passwordValid = await verifyPassword(String(password), currentHash);
        isTemporary = isRuntimeTemporary();
      }
    } else {
      const currentHash = getRuntimePasswordHash();
      passwordValid = await verifyPassword(String(password), currentHash);
      isTemporary = isRuntimeTemporary();
    }

    if (!passwordValid) {
      return jsonResponse(
        {
          error: 'Invalid username or password',
          remainingAttempts: rateCheck.remaining,
        },
        401
      );
    }

    // Reset rate limit on successful authentication
    resetRateLimit(`login_${ip}`);

    // Generate tamper-proof session token (expires in 24 hours)
    const secret = env.ADMIN_JWT_SECRET || 'ansab-super-secret-jwt-key-2026-production';
    const token = await signSession(
      {
        username: expectedUsername,
        role: 'admin',
        isTemporary,
      },
      secret,
      86400
    );

    return jsonResponse({
      success: true,
      token,
      user: {
        username: expectedUsername,
        isTemporary,
      },
      message: 'Login successful',
    });
  } catch (err: any) {
    console.error('Login handler error:', err);
    return jsonResponse({ error: 'Internal server authentication error' }, 500);
  }
}

export const onRequestPost = onRequest;
export const onRequestOptions = onRequest;
export default onRequest;
