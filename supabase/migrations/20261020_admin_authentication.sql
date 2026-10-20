-- ==============================================================================
-- ANSAB PORTFOLIO — ADMIN AUTHENTICATION SETUP & MIGRATION
-- Project URL: https://vpxzaswitrzbsjktcvbe.supabase.co
--
-- INSTRUCTIONS:
-- 1. Open Supabase Dashboard -> SQL Editor (or navigate to https://supabase.com/dashboard/project/vpxzaswitrzbsjktcvbe/sql)
-- 2. Paste and run this script to initialize or update the admin account.
-- 3. Initial Credentials:
--    Username: ANSAB
--    Temporary Initial Password: 2006
-- ==============================================================================

-- 1. Ensure UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create admin_users table if not exists
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

-- 3. Ensure index on username for optimal query performance
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users (LOWER(username));

-- 4. Enable Row Level Security (RLS)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 5. Security Policy:
-- Notice: NO SELECT/INSERT/UPDATE/DELETE policy is granted to 'anon' or public.
-- The Supabase Service Role Key bypasses RLS and handles all admin authentication securely on the server.
-- This guarantees zero public exposure of credential hashes.

-- 6. Insert / Update Admin User 'ANSAB' with verified Bcrypt hash of '2006'
-- Hash: $2b$10$qnF2FNDQUfy.KZBrpGqEluyaU3v2u7NoErUCNYmuWUhl4N2YSTLcC
INSERT INTO admin_users (username, password_hash, is_temporary_password)
VALUES (
    'ANSAB',
    '$2b$10$qnF2FNDQUfy.KZBrpGqEluyaU3v2u7NoErUCNYmuWUhl4N2YSTLcC',
    true
)
ON CONFLICT (username) DO UPDATE
SET
    password_hash = CASE
        WHEN admin_users.is_temporary_password = true THEN EXCLUDED.password_hash
        ELSE admin_users.password_hash
    END,
    updated_at = now();
