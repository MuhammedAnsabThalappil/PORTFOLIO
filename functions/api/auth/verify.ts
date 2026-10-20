import { verifySession, getEnv, jsonResponse, corsResponse } from '../_utils';

export async function onRequest(context: any): Promise<Response> {
  const request: Request = context.request;
  const env = getEnv(context);

  if (request.method === 'OPTIONS') {
    return corsResponse();
  }

  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return jsonResponse({ valid: false, error: 'Missing or malformed Authorization header' }, 401);
  }

  const token = authHeader.substring(7).trim();
  const secret = env.ADMIN_JWT_SECRET || 'ansab-super-secret-jwt-key-2026-production';
  const session = await verifySession(token, secret);

  if (!session) {
    return jsonResponse({ valid: false, error: 'Session has expired or is invalid' }, 401);
  }

  return jsonResponse({
    valid: true,
    user: {
      username: session.username,
      role: session.role,
      isTemporary: session.isTemporary,
      expiresAt: new Date(session.exp * 1000).toISOString(),
    },
  });
}

export const onRequestGet = onRequest;
export const onRequestPost = onRequest;
export const onRequestOptions = onRequest;
export default onRequest;
