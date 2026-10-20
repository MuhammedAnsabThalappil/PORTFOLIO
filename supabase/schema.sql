-- ==============================================================================
-- ANSAB PORTFOLIO — COMPLETE SUPABASE DATABASE SCHEMA
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. ADMIN USERS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    is_temporary_password BOOLEAN DEFAULT TRUE,
    failed_login_attempts INT DEFAULT 0,
    locked_until TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 2. PROFILE & ABOUT ME TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profile (
    id TEXT PRIMARY KEY DEFAULT 'ansab',
    full_name TEXT NOT NULL,
    location TEXT NOT NULL,
    professional_identity JSONB DEFAULT '[]'::jsonb,
    brand_line TEXT,
    core_brand TEXT,
    hero_statement TEXT,
    philosophy TEXT,
    mission TEXT,
    about_story JSONB DEFAULT '[]'::jsonb,
    identity_cards JSONB DEFAULT '[]'::jsonb,
    profile_image TEXT,
    resume_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 3. SOCIALS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS socials (
    id TEXT PRIMARY KEY DEFAULT 'main',
    linkedin TEXT,
    github TEXT,
    email TEXT,
    location TEXT,
    twitter TEXT,
    instagram TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 4. TIMELINE / JOURNEY TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS timeline (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    step TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT,
    badge TEXT,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 5. HERO & PINNACLE ACHIEVEMENTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hero_achievement (
    id TEXT PRIMARY KEY DEFAULT 'converge-2026',
    title TEXT NOT NULL,
    subtitle TEXT,
    badge TEXT,
    prize TEXT,
    journey_text TEXT,
    wording TEXT,
    team_members JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    story_teaser TEXT,
    story_full TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Achievement statistics summary
CREATE TABLE IF NOT EXISTS achievement_stats (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    value TEXT NOT NULL,
    label TEXT NOT NULL,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE
);

-- Secondary achievements (awards, grants, programs)
CREATE TABLE IF NOT EXISTS secondary_achievements (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    slug TEXT UNIQUE,
    title TEXT NOT NULL,
    issuer TEXT,
    subtitle TEXT,
    description TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Media recognition (newspaper coverage)
CREATE TABLE IF NOT EXISTS media_recognition (
    id TEXT PRIMARY KEY DEFAULT 'main',
    title TEXT NOT NULL,
    newspaper TEXT,
    date TEXT,
    page TEXT,
    caption TEXT,
    description TEXT,
    image TEXT,
    is_published BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Achievement flow steps
CREATE TABLE IF NOT EXISTS achievement_flow_steps (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    step TEXT NOT NULL,
    title TEXT NOT NULL,
    category TEXT,
    badge TEXT,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE
);

-- ------------------------------------------------------------------------------
-- 6. PROJECTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    slug TEXT UNIQUE,
    number TEXT,
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    highlights JSONB DEFAULT '[]'::jsonb,
    technologies JSONB DEFAULT '[]'::jsonb,
    image TEXT,
    extra_images JSONB DEFAULT '[]'::jsonb,
    view_url TEXT,
    github_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    is_draft BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 7. BUSINESSES TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS businesses (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    slug TEXT UNIQUE,
    number TEXT,
    name TEXT NOT NULL,
    role TEXT,
    category TEXT,
    short_desc TEXT,
    description TEXT,
    image TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    website TEXT,
    instagram TEXT,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    is_draft BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 8. EXPERIENCE TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS experience (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    duration TEXT,
    length TEXT,
    location TEXT,
    paragraphs JSONB DEFAULT '[]'::jsonb,
    mentorship TEXT,
    skills_highlighted JSONB DEFAULT '[]'::jsonb,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 9. EDUCATION TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS education (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    degree TEXT NOT NULL,
    field TEXT NOT NULL,
    institution TEXT NOT NULL,
    status TEXT,
    badge TEXT,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 10. SKILLS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS skills (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    category TEXT NOT NULL, -- 'programming', 'development', 'dataAi', 'database', 'hardware', 'professional'
    name TEXT NOT NULL,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE
);

-- ------------------------------------------------------------------------------
-- 11. RECOGNITIONS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS recognitions (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    issuer TEXT,
    type TEXT,
    description TEXT,
    order_index INT DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE
);

-- ------------------------------------------------------------------------------
-- 12. BUSINESS TECH FLOW & CURRENTLY EXPLORING
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS business_tech_flow (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    step TEXT NOT NULL,
    name TEXT NOT NULL,
    icon TEXT NOT NULL,
    order_index INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS currently_exploring (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    topic TEXT NOT NULL,
    order_index INT DEFAULT 0
);

-- ------------------------------------------------------------------------------
-- 13. CONTACT MESSAGES TABLE (SECURE / PRIVATE)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    ip_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 14. WEBSITE SETTINGS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS website_settings (
    id TEXT PRIMARY KEY DEFAULT 'main',
    site_title TEXT,
    meta_description TEXT,
    og_image TEXT,
    hero_tagline TEXT,
    footer_text TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- ------------------------------------------------------------------------------
-- 15. ANALYTICS EVENTS TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS analytics_events (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    event_type TEXT NOT NULL, -- 'page_view', 'section_view', 'project_click', 'contact_submit'
    path TEXT,
    section TEXT,
    target TEXT,
    referrer TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_achievement ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE secondary_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_recognition ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_flow_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE recognitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_tech_flow ENABLE ROW LEVEL SECURITY;
ALTER TABLE currently_exploring ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- 1. PUBLIC READ POLICIES (anon users can read published content only)
CREATE POLICY "Public read profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Public read socials" ON socials FOR SELECT USING (true);
CREATE POLICY "Public read website_settings" ON website_settings FOR SELECT USING (true);
CREATE POLICY "Public read timeline" ON timeline FOR SELECT USING (is_published = true);
CREATE POLICY "Public read hero_achievement" ON hero_achievement FOR SELECT USING (is_published = true);
CREATE POLICY "Public read achievement_stats" ON achievement_stats FOR SELECT USING (is_published = true);
CREATE POLICY "Public read secondary_achievements" ON secondary_achievements FOR SELECT USING (is_published = true);
CREATE POLICY "Public read media_recognition" ON media_recognition FOR SELECT USING (is_published = true);
CREATE POLICY "Public read achievement_flow_steps" ON achievement_flow_steps FOR SELECT USING (is_published = true);
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (is_published = true AND is_draft = false);
CREATE POLICY "Public read businesses" ON businesses FOR SELECT USING (is_published = true AND is_draft = false);
CREATE POLICY "Public read experience" ON experience FOR SELECT USING (is_published = true);
CREATE POLICY "Public read education" ON education FOR SELECT USING (is_published = true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (is_published = true);
CREATE POLICY "Public read recognitions" ON recognitions FOR SELECT USING (is_published = true);
CREATE POLICY "Public read business_tech_flow" ON business_tech_flow FOR SELECT USING (true);
CREATE POLICY "Public read currently_exploring" ON currently_exploring FOR SELECT USING (true);

-- 2. CONTACT MESSAGES: Public can only INSERT, never SELECT or UPDATE or DELETE
CREATE POLICY "Public insert contact_messages" ON contact_messages FOR INSERT WITH CHECK (true);
-- No SELECT policy for anon on contact_messages! Only service_role or authenticated admin can read.

-- 3. ANALYTICS EVENTS: Public can insert
CREATE POLICY "Public insert analytics_events" ON analytics_events FOR INSERT WITH CHECK (true);

-- 4. ADMIN USERS: Protected from public entirely
-- No anon SELECT, INSERT, UPDATE, DELETE policies on admin_users!

-- 5. SERVICE ROLE & AUTHENTICATED ADMIN FULL ACCESS
-- When using SUPABASE_SERVICE_ROLE_KEY or authenticated admin role, full access is granted automatically by Supabase service_role, bypassing RLS.
