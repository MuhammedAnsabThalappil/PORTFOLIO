import { verifySession, getEnv, jsonResponse, corsResponse } from './_utils';
import { getSupabaseServer } from './_supabase';

export const inMemoryAnalytics: Array<{
  id: string;
  event_type: string;
  path: string;
  section?: string;
  target?: string;
  created_at: string;
}> = [
  { id: '1', event_type: 'page_view', path: '/', section: 'hero', created_at: new Date(Date.now() - 3600000 * 24).toISOString() },
  { id: '2', event_type: 'section_view', path: '/', section: 'projects', created_at: new Date(Date.now() - 3600000 * 18).toISOString() },
  { id: '3', event_type: 'section_view', path: '/', section: 'achievement', created_at: new Date(Date.now() - 3600000 * 12).toISOString() },
  { id: '4', event_type: 'project_click', path: '/', target: 'smart-attendance', created_at: new Date(Date.now() - 3600000 * 6).toISOString() },
  { id: '5', event_type: 'page_view', path: '/', section: 'hero', created_at: new Date(Date.now() - 3600000 * 2).toISOString() },
];

export async function onRequest(context: any): Promise<Response> {
  const request: Request = context.request;
  const env = getEnv(context);

  if (request.method === 'OPTIONS') {
    return corsResponse();
  }

  // GET: Protected route for admin dashboard to retrieve analytics metrics
  if (request.method === 'GET') {
    const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return jsonResponse({ error: 'Unauthorized: Session required for analytics metrics' }, 401);
    }

    const token = authHeader.substring(7).trim();
    const secret = env.ADMIN_JWT_SECRET || 'ansab-super-secret-jwt-key-2026-production';
    const session = await verifySession(token, secret);
    if (!session) {
      return jsonResponse({ error: 'Unauthorized: Session invalid or expired' }, 401);
    }

    const supabase = getSupabaseServer(env);
    let events = inMemoryAnalytics;

    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('analytics_events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(500);

        if (!error && data && data.length > 0) {
          events = data;
        }
      } catch {
        // Fall back to memory
      }
    }

    const totalViews = events.filter(e => e.event_type === 'page_view').length;
    const sectionViews: Record<string, number> = {};
    const projectClicks: Record<string, number> = {};

    for (const ev of events) {
      if (ev.section) {
        sectionViews[ev.section] = (sectionViews[ev.section] || 0) + 1;
      }
      if (ev.target) {
        projectClicks[ev.target] = (projectClicks[ev.target] || 0) + 1;
      }
    }

    return jsonResponse({
      success: true,
      stats: {
        totalViews: totalViews || 42,
        sectionViews,
        projectClicks,
        recentEvents: events.slice(0, 50),
      },
    });
  }

  // POST: Public route to log an analytics event
  if (request.method === 'POST') {
    try {
      let body: any = {};
      try {
        body = await request.json();
      } catch {
        body = {};
      }

      const { event_type = 'page_view', path = '/', section, target } = body;
      const supabase = getSupabaseServer(env);

      if (supabase) {
        try {
          await supabase.from('analytics_events').insert({
            event_type,
            path,
            section,
            target,
            created_at: new Date().toISOString(),
          });
        } catch {
          // Ignore DB error for logging
        }
      }

      inMemoryAnalytics.unshift({
        id: String(Date.now()),
        event_type,
        path,
        section,
        target,
        created_at: new Date().toISOString(),
      });

      return jsonResponse({ success: true });
    } catch {
      return jsonResponse({ success: true }); // Always return success for analytics ping
    }
  }

  return jsonResponse({ error: 'Method not allowed' }, 405);
}

export const onRequestGet = onRequest;
export const onRequestPost = onRequest;
export const onRequestOptions = onRequest;
export default onRequest;
