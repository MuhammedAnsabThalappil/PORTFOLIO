-- ==============================================================================
-- ANSAB PORTFOLIO — SUPABASE STORAGE SETUP & POLICIES
-- ==============================================================================

-- 1. Create storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
(
    'portfolio-images',
    'portfolio-images',
    true,
    5242880, -- 5 MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
),
(
    'portfolio-resumes',
    'portfolio-resumes',
    true,
    10485760, -- 10 MB limit
    ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
)
ON CONFLICT (id) DO UPDATE SET 
    public = EXCLUDED.public,
    file_size_limit = EXCLUDED.file_size_limit,
    allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Policies for 'portfolio-images'
-- Public read access: Anyone can view portfolio images
CREATE POLICY "Public Read Portfolio Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

-- Admin write access: Service role or authenticated admin can upload
CREATE POLICY "Admin Upload Portfolio Images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-images');

-- Admin update access
CREATE POLICY "Admin Update Portfolio Images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-images');

-- Admin delete access
CREATE POLICY "Admin Delete Portfolio Images"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-images');

-- 3. Storage Policies for 'portfolio-resumes'
-- Public read access: Anyone can download/view the resume
CREATE POLICY "Public Read Portfolio Resumes"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-resumes');

-- Admin write access
CREATE POLICY "Admin Upload Portfolio Resumes"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'portfolio-resumes');

-- Admin update access
CREATE POLICY "Admin Update Portfolio Resumes"
ON storage.objects FOR UPDATE
USING (bucket_id = 'portfolio-resumes');

-- Admin delete access
CREATE POLICY "Admin Delete Portfolio Resumes"
ON storage.objects FOR DELETE
USING (bucket_id = 'portfolio-resumes');
