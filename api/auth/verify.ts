import { verifySession } from '../_utils';

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ valid: false, error: 'Missing or malformed Authorization header' });
  }

  const token = authHeader.substring(7).trim();
  const session = verifySession(token);

  if (!session) {
    return res.status(401).json({ valid: false, error: 'Session has expired or is invalid' });
  }

  return res.status(200).json({
    valid: true,
    user: {
      username: session.username,
      role: session.role,
      isTemporary: session.isTemporary,
      expiresAt: new Date(session.exp * 1000).toISOString(),
    },
  });
}
