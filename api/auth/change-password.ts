import { verifySession, verifyPassword, hashPassword, signSession, getDevPasswordHash, setDevPasswordHash } from '../_utils';
import { getSupabaseServer } from '../_supabase';

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify session
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing session token' });
  }

  const token = authHeader.substring(7).trim();
  const session = verifySession(token);
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized: Session invalid or expired' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ error: 'New password must be at least 8 characters long' });
    }

    if (newPassword === '2006') {
      return res.status(400).json({ error: 'New password cannot be the temporary development password' });
    }

    const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(newPassword);
    if (!hasNumberOrSymbol) {
      return res.status(400).json({ error: 'New password must contain at least one number or special character' });
    }

    // Verify current password
    const supabase = getSupabaseServer();
    let currentHash = getDevPasswordHash();

    if (supabase) {
      const { data: user } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', session.username)
        .maybeSingle();

      if (user && user.password_hash) {
        currentHash = user.password_hash;
      }
    }

    const isCurrentValid = await verifyPassword(currentPassword, currentHash);
    if (!isCurrentValid) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const newHash = await hashPassword(newPassword);

    // Save in Supabase if available
    if (supabase) {
      const { error: updateError } = await supabase
        .from('admin_users')
        .update({
          password_hash: newHash,
          is_temporary_password: false,
          updated_at: new Date().toISOString(),
        })
        .eq('username', session.username);

      if (updateError) {
        console.error('Failed to update password in database:', updateError);
        return res.status(500).json({ error: 'Failed to update password in database' });
      }
    }

    // Update in-memory dev state
    setDevPasswordHash(newHash);

    // Issue updated session token
    const newToken = signSession({
      username: session.username,
      role: 'admin',
      isTemporary: false,
    }, 86400);

    return res.status(200).json({
      success: true,
      token: newToken,
      message: 'Password changed successfully! Production security requirement fulfilled.',
    });
  } catch (err: any) {
    console.error('Password change error:', err);
    return res.status(500).json({ error: 'Internal server error while changing password' });
  }
}
