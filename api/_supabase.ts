import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseServerClient: SupabaseClient | null = null;

export function getSupabaseServer(): SupabaseClient | null {
  if (supabaseServerClient) return supabaseServerClient;

  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !serviceKey) {
    return null;
  }

  try {
    supabaseServerClient = createClient(url, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    return supabaseServerClient;
  } catch (err) {
    console.error('Failed to initialize server Supabase client:', err);
    return null;
  }
}
