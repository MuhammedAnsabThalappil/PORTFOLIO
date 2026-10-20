import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;
let lastKey = '';

export function getSupabaseServer(env?: Record<string, string | undefined>): SupabaseClient | null {
  const e = env || (typeof process !== 'undefined' ? process.env : {}) || {};
  const url = e.SUPABASE_URL || e.VITE_SUPABASE_URL || 'https://vpxzaswitrzbsjktcvbe.supabase.co';
  const serviceKey =
    e.SUPABASE_SERVICE_ROLE_KEY ||
    e.VITE_SUPABASE_ANON_KEY ||
    e.VITE_SUPABASE_PUBLISHABLE_KEY ||
    'sb_publishable_qyBLzVxZCptjVNSea4zL1g_d2jsJKMt';

  if (!url || !serviceKey) return null;

  if (cachedClient && lastKey === serviceKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    lastKey = serviceKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize server Supabase client:', err);
    return null;
  }
}
