import { getClientIp, hashIp, verifySession } from './_utils';
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

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  // GET: Admin dashboard requests analytics metrics
  if (req.method === 'GET') {
    const authHeader = req.headers?.authorization || req.headers?.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: Session required for analytics metrics' });
    }
    const token = authHeader.substring(7).trim();
    if (!verifySession(token)) {
      return res.status(401).json({ error: 'Unauthorized: Session invalid or expired' });
    }

    const supabase = getSupabaseServer();
    let events = inMemoryAnalytics;

    if (supabase) {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);

      if (!error && data && data.length > 0) {
        events = data;
      }
    }

    // Compute metrics
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

    return res.status(200).json({
      totalEvents: events.length,
      pageViews: totalViews,
      sectionViews,
      projectClicks,
      recentEvents: events.slice(0, 20),
    });
  }

  // POST: Record an analytics event from public visitor
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const { eventType, path = '/', section, target, referrer } = body;

      if (!eventType) {
        return res.status(400).json({ error: 'eventType is required' });
      }

      const ip = getClientIp(req);
      const ipHashed = hashIp(ip);
      const now = new Date().toISOString();

      const newRecord = {
        id: 'ev-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        event_type: eventType,
        path,
        section,
        target,
        referrer,
        created_at: now,
      };

      inMemoryAnalytics.unshift(newRecord);
      if (inMemoryAnalytics.length > 1000) {
        inMemoryAnalytics.pop();
      }

      const supabase = getSupabaseServer();
      if (supabase) {
        await supabase.from('analytics_events').insert({
          event_type: eventType,
          path,
          section,
          target,
          referrer,
          created_at: now,
        });
      }

      return res.status(200).json({ success: true });
    } catch {
      return res.status(500).json({ error: 'Failed to record event' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
