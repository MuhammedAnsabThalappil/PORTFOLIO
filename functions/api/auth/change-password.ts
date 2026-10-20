import {
  verifySession,
  verifyPassword,
  hashPassword,
  signSession,
  getEnv,
  getRuntimePasswordHash,
  setRuntimePasswordHash,
  jsonResponse,
  corsResponse,
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

  // Verify session
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return jsonResponse({ error: 'Unauthorized: Missing session token' }, 401);
  }

  const token = authHeader.substring(7).trim();
  const secret = env.ADMIN_JWT_SECRET || 'ansab-super-secret-jwt-key-2026-production';
  const session = await verifySession(token, secret);
  if (!session) {
    return jsonResponse({ error: 'Unauthorized: Session invalid or expired' }, 401);
  }

  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: 'Invalid JSON request payload' }, 400);
    }

    const { currentPassword, newPassword } = body || {};

    if (!currentPassword || !newPassword) {
      return jsonResponse({ error: 'Current password and new password are required' }, 400);
    }

    if (newPassword.length < 8) {
      return jsonResponse({ error: 'New password must be at least 8 characters long' }, 400);
    }

    if (newPassword === '2006') {
      return jsonResponse({ error: 'New password cannot be the temporary development password' }, 400);
    }

    if (newPassword === currentPassword) {
      return jsonResponse({ error: 'New password must be different from your current password' }, 400);
    }

    const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword);
    if (!hasNumberOrSymbol) {
      return jsonResponse({ error: 'New password must contain at least one number or special character' }, 400);
    }

    // Verify current password
    const supabase = getSupabaseServer(env);
    let currentHash = getRuntimePasswordHash();

    if (supabase) {
      try {
        const { data: user } = await supabase
          .from('admin_users')
          .select('id, password_hash')
          .eq('username', session.username)
          .maybeSingle();

        if (user && user.password_hash) {
          currentHash = user.password_hash;
        }
      } catch {
        // Fallback to runtime hash
      }
    }

    const isCurrentValid = await verifyPassword(currentPassword, currentHash);
    if (!isCurrentValid) {
      return jsonResponse({ error: 'Current password is incorrect' }, 400);
    }

    // Hash new password securely using bcrypt
    const newHash = await hashPassword(newPassword);

    // Save in Supabase if connected
    if (supabase) {
      try {
        const { error: updateError } = await supabase
          .from('admin_users')
          .update({
            password_hash: newHash,
            is_temporary_password: false,
            updated_at: new Date().toISOString(),
          })
          .eq('username', session.username);

        if (updateError) {
          console.warn('Supabase password update note (saved in memory):', updateError.message);
        }
      } catch (dbErr: any) {
        console.warn('Supabase DB unreachable, updated runtime state:', dbErr.message);
      }
    }

    // Update in-memory runtime state
    setRuntimePasswordHash(newHash);

    // Issue updated session token (isTemporary is now false)
    const newToken = await signSession(
      {
        username: session.username,
        role: 'admin',
        isTemporary: false,
      },
      secret,
      86400
    );

    return jsonResponse({
      success: true,
      message: 'Password changed successfully',
      token: newToken,
    });
  } catch (err: any) {
    console.error('Change password error:', err);
    return jsonResponse({ error: 'Internal server error while changing password' }, 500);
  }
}

export const onRequestPost = onRequest;
export const onRequestOptions = onRequest;
export default onRequest;
