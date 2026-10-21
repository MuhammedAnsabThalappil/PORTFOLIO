import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-id')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;


/**
 * Fetch all published portfolio data directly from Supabase
 */
export async function fetchPublishedPortfolioData() {
  if (!supabase) return null;

  try {
    const [
      profileRes,
      socialsRes,
      timelineRes,
      heroAchieveRes,
      achieveStatsRes,
      secAchieveRes,
      mediaRes,
      achieveFlowRes,
      projectsRes,
      businessesRes,
      experienceRes,
      educationRes,
      skillsRes,
      recognitionsRes,
      currentlyExploringRes,
      settingsRes,
      galleryRes,
    ] = await Promise.all([
      supabase.from('profile').select('*').single(),
      supabase.from('socials').select('*').single(),
      supabase.from('timeline').select('*').eq('is_published', true).order('order_index'),
      supabase.from('hero_achievement').select('*').eq('is_published', true).single(),
      supabase.from('achievement_stats').select('*').eq('is_published', true).order('order_index'),
      supabase.from('secondary_achievements').select('*').eq('is_published', true).order('order_index'),
      supabase.from('media_recognition').select('*').eq('is_published', true).single(),
      supabase.from('achievement_flow_steps').select('*').eq('is_published', true).order('order_index'),
      supabase.from('projects').select('*').eq('is_published', true).eq('is_draft', false).order('order_index'),
      supabase.from('businesses').select('*').eq('is_published', true).eq('is_draft', false).order('order_index'),
      supabase.from('experience').select('*').eq('is_published', true).order('order_index').single(),
      supabase.from('education').select('*').eq('is_published', true).order('order_index'),
      supabase.from('skills').select('*').eq('is_published', true).order('order_index'),
      supabase.from('recognitions').select('*').eq('is_published', true).order('order_index'),
      supabase.from('currently_exploring').select('*').order('order_index'),
      supabase.from('website_settings').select('*').single(),
      supabase.from('gallery').select('*').eq('is_published', true).order('order_index').catch(() => ({ data: null })),
    ]);

    return {
      profile: profileRes.data || null,
      socials: socialsRes.data || null,
      timeline: timelineRes.data || null,
      heroAchievement: heroAchieveRes.data || null,
      achievementStats: achieveStatsRes.data || null,
      secondaryAchievements: secAchieveRes.data || null,
      mediaRecognition: mediaRes.data || null,
      achievementFlowSteps: achieveFlowRes.data || null,
      projects: projectsRes.data || null,
      businesses: businessesRes.data || null,
      experience: experienceRes.data || null,
      education: educationRes.data || null,
      skills: skillsRes.data || null,
      recognitions: recognitionsRes.data || null,
      currentlyExploring: currentlyExploringRes.data?.map(i => i.topic) || null,
      websiteSettings: settingsRes.data || null,
      gallery: galleryRes.data || null,
    };
  } catch (err) {
    console.warn('Error fetching Supabase portfolio data, using static fallback:', err);
    return null;
  }
}

/**
 * Send contact form submission through backend API
 */
export async function sendContactMessage(formData: { name: string; email: string; message: string; honeypot?: string }) {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to submit contact message');
  }
  return data;
}

/**
 * Record privacy-safe analytics event
 */
export async function trackAnalytics(eventType: string, extra?: { path?: string; section?: string; target?: string }) {
  try {
    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        path: window.location.pathname,
        referrer: document.referrer || undefined,
        ...extra,
      }),
    });
  } catch {
    // Non-blocking
  }
}
