import { checkRateLimit, resetRateLimit, verifyPassword, signSession, getClientIp, getDevPasswordHash, isDevTemporary } from '../_utils';
import { getSupabaseServer } from '../_supabase';

export default async function handler(req: any, res: any) {
  // CORS & Methods
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const ip = getClientIp(req);
    const rateCheck = checkRateLimit(`login_${ip}`, 5, 15 * 60 * 1000);

    if (!rateCheck.allowed) {
      return res.status(429).json({
        error: `Too many failed attempts. Please try again in ${rateCheck.retryAfter || 900} seconds.`,
      });
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { username, password } = body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const expectedUsername = (process.env.INITIAL_ADMIN_USERNAME || 'ANSAB').trim();
    if (username.trim().toUpperCase() !== expectedUsername.toUpperCase()) {
      return res.status(401).json({
        error: 'Invalid username or password',
        remainingAttempts: rateCheck.remaining,
      });
    }

    let passwordValid = false;
    let isTemporary = true;

    const supabase = getSupabaseServer();
    if (supabase) {
      const { data: user, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('username', expectedUsername)
        .single();

      if (!error && user && user.password_hash) {
        passwordValid = await verifyPassword(password, user.password_hash);
        isTemporary = !!user.is_temporary_password;

        if (passwordValid) {
          await supabase
            .from('admin_users')
            .update({ last_login_at: new Date().toISOString(), failed_login_attempts: 0 })
            .eq('id', user.id);
        }
      } else {
        // Fallback to dev hash if user row not yet created in Supabase
        const currentHash = getDevPasswordHash();
        passwordValid = await verifyPassword(password, currentHash);
        isTemporary = isDevTemporary();
      }
    } else {
      // Standalone mode / local dev without Supabase configured yet
      const currentHash = getDevPasswordHash();
      passwordValid = await verifyPassword(password, currentHash);
      isTemporary = isDevTemporary();
    }

    if (!passwordValid) {
      return res.status(401).json({
        error: 'Invalid username or password',
        remainingAttempts: rateCheck.remaining,
      });
    }

    // Reset rate limit on successful authentication
    resetRateLimit(`login_${ip}`);

    // Generate tamper-proof session token (expires in 24 hours)
    const token = signSession({
      username: expectedUsername,
      role: 'admin',
      isTemporary,
    }, 86400);

    return res.status(200).json({
      success: true,
      token,
      user: {
        username: expectedUsername,
        isTemporary,
      },
      message: 'Login successful',
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server authentication error' });
  }
}
