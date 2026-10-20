import { jsonResponse, corsResponse } from '../_utils';

export async function onRequest(context: any): Promise<Response> {
  const request: Request = context.request;

  if (request.method === 'OPTIONS') {
    return corsResponse();
  }

  return jsonResponse({ success: true, message: 'Logged out successfully' });
}

export const onRequestPost = onRequest;
export const onRequestOptions = onRequest;
export default onRequest;
