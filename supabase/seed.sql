-- ==============================================================================
-- ANSAB PORTFOLIO — INITIAL SEED DATA
-- ==============================================================================

-- 1. Initial Admin Account (Username: ANSAB, Temp Password: 2006)
-- Bcrypt Hash of '2006': $2b$10$dKXSyvg0nmeRmcV0SeJ72uDlLFmfsnioLGYq4uFOugCEJDgdMo.7q
INSERT INTO admin_users (username, password_hash, is_temporary_password)
VALUES ('ANSAB', '$2b$10$dKXSyvg0nmeRmcV0SeJ72uDlLFmfsnioLGYq4uFOugCEJDgdMo.7q', true)
ON CONFLICT (username) DO NOTHING;

-- 2. Profile Information
INSERT INTO profile (
    id, full_name, location, professional_identity, brand_line, core_brand,
    hero_statement, philosophy, mission, about_story, identity_cards, profile_image, resume_url
) VALUES (
    'ansab',
    'Muhammed Ansab Thalappil',
    'Malappuram, Kerala, India',
    '["AI & Data Science Student", "Programmer", "Developer", "Entrepreneur", "Aspiring AI Engineer & Innovator"]'::jsonb,
    'Let''s turn ideas into reality!!',
    'BUILDING IDEAS INTO REALITY.',
    'I don''t just learn technology. I build with it.',
    'Skills create opportunities.',
    'I want to grow into an AI engineer and innovator, creating solutions that make life easier and proving that consistency and skills matter more than labels.',
    '[
        "From building projects to building businesses, my journey is driven by one belief: skills create opportunities.",
        "I am Muhammed Ansab Thalappil, an AI & Data Science student, programmer, and entrepreneur passionate about turning ideas into impact.",
        "My journey is driven by curiosity, experimentation and a desire to solve real-world problems through technology.",
        "I’m particularly interested in Artificial Intelligence, Machine Learning, Data Science and software development.",
        "Beyond academics and technology projects, I am also involved in building businesses, giving me an opportunity to understand both technology and practical markets.",
        "My long-term mission is to become an AI engineer and innovator who creates useful technology and meaningful solutions."
    ]'::jsonb,
    '[
        {"number": "01", "title": "AI & DATA SCIENCE", "tags": ["Artificial Intelligence", "Machine Learning", "Data Science"], "description": "Exploring algorithms, predictive models, machine vision, and intelligent decision-making systems."},
        {"number": "02", "title": "SOFTWARE DEVELOPMENT", "tags": ["Programming", "Flutter", "Web Development"], "description": "Crafting scalable web applications, modern mobile user experiences, and clean modular codebases."},
        {"number": "03", "title": "ENTREPRENEURSHIP", "tags": ["Business", "Product Development", "Innovation"], "description": "Translating technical skills into practical commercial products, brand building, and international trade."}
    ]'::jsonb,
    '/assets/profile.jpg',
    '/assets/resume.pdf'
) ON CONFLICT (id) DO UPDATE SET updated_at = now();

-- 3. Socials
INSERT INTO socials (id, linkedin, github, email, location)
VALUES (
    'main',
    'https://www.linkedin.com/in/muhammed-ansab-thalappil-953820278/',
    'https://github.com/',
    'mailto:ansabthalappil@gmail.com',
    'Malappuram, Kerala, India'
) ON CONFLICT (id) DO NOTHING;

-- 4. Timeline
INSERT INTO timeline (step, title, subtitle, description, badge, order_index, is_published)
VALUES
('01', 'EDUCATION', 'Technical Higher Secondary School', 'Built strong foundation in science, computer fundamentals, and analytical reasoning at Model Technical Higher Secondary School — IHRD.', 'Foundation', 1, true),
('02', 'TECHNOLOGY PROJECTS', 'First Code & Hardware Experiments', 'Explored Python programming, Raspberry Pi embedded systems, web technologies, and practical hardware-software integration.', 'Exploration', 2, true),
('03', 'INSPIRE AWARD — MANAK', 'Government of India Recognition', 'Awarded by the Government of India for conceptualizing and developing a Machine Learning-Based Smart Attendance System.', 'National Award', 3, true),
('04', 'SOFTWARE INTERNSHIP', 'Cyra Learnings — Flutter Trainee', 'Completed a 7-month Software Trainee internship working on production mobile applications, teamwork, and client deliverables.', 'Industry Experience', 4, true),
('05', 'B.TECH AI & DATA SCIENCE', 'KMCT Engineering College', 'Pursuing Bachelor of Technology in Artificial Intelligence & Data Science to master modern ML architectures and data engineering.', 'Current Degree', 5, true),
('06', 'ENTREPRENEURSHIP', 'Building Motherbits, King Day & Zoltiq', 'Co-founded Motherbits Technologies LLP, established King Day kids e-commerce, and launched Zoltiq international trade brand.', 'Venture Building', 6, true),
('07', 'AI ENGINEERING', 'Future Horizon & Innovation', 'Advancing toward creating intelligent products, high-impact AI systems, and scaling technology enterprises globally.', 'Long-term Goal', 7, true);

-- 5. Hero Achievement
INSERT INTO hero_achievement (
    id, title, subtitle, badge, prize, journey_text, wording,
    team_members, image, story_teaser, story_full, is_published
) VALUES (
    'converge-2026',
    'CONVERGE 2026',
    'FUTURE TECH SUMMIT · REVERSE PITCH COMPETITION',
    '🥇 1ST PRIZE',
    '₹25,000',
    '43 TEAMS → TOP 6 → 1ST PRIZE',
    'Our team secured 1st Prize and ₹25,000 at the CONVERGE 2026 Reverse Pitch Competition.',
    '["Abraham Jolly", "Muhammed Ansab Thalappil", "Muhammad Finan", "Parvathi Sreejith"]'::jsonb,
    '/assets/converge.jpg',
    'Two weeks. Countless practice sessions. One unforgettable moment.',
    'There were days when college ended at 1:45 PM, but our journey didn’t. We stayed back until evening, refining our idea, practicing every word, and believing that the effort would be worth it.\n\nFrom 43 teams to the Top 6, and finally 1st Prize at the CONVERGE 2026 Reverse Pitch Competition.\n\nEvery late evening, every discussion and every improvement brought the team one step closer to this moment.\n\nSometimes, success isn’t about being the smartest team. It’s about being the team that refuses to stop improving.',
    true
) ON CONFLICT (id) DO UPDATE SET updated_at = now();

-- 6. Achievement Stats
INSERT INTO achievement_stats (value, label, order_index, is_published)
VALUES
('43', 'TEAMS COMPETED', 1, true),
('TOP 6', 'FINALISTS SELECTED', 2, true),
('🥇 1ST', 'PRIZE WINNERS', 3, true),
('₹25K', 'CASH AWARD', 4, true);

-- 7. Secondary Achievements
INSERT INTO secondary_achievements (slug, title, issuer, subtitle, description, tags, order_index, is_published)
VALUES
('inspire-award', 'INSPIRE AWARD — MANAK', 'Government of India', 'Machine Learning-Based Smart Attendance System', 'Recognition for developing a machine learning-based smart attendance system and exploring the practical application of technology to real-world problems.', '["Government of India", "Machine Learning", "Smart Attendance"]'::jsonb, 1, true),
('nit-calicut', 'NIT CALICUT', 'National Institute of Technology Calicut', 'INNOVATION & ENTREPRENEURSHIP PROGRAM', 'Participated in an Innovation and Entrepreneurship training program at NIT Calicut, gaining exposure to innovation, entrepreneurship and idea development.', '["NIT Calicut", "Innovation", "Entrepreneurship"]'::jsonb, 2, true);

-- 8. Media Recognition
INSERT INTO media_recognition (id, title, newspaper, date, page, caption, description, image, is_published)
VALUES (
    'main',
    'MEDIA RECOGNITION',
    'Mangalam Kozhikode Edition',
    'April 27, 2026',
    'Page No. 7',
    'KOZHIKODE EDITION · APR 27, 2026',
    'Media recognition for innovation and entrepreneurship achievement.',
    '/assets/recognition/newspaper.jpg',
    true
) ON CONFLICT (id) DO UPDATE SET updated_at = now();

-- 9. Achievement Flow Steps
INSERT INTO achievement_flow_steps (step, title, category, badge, order_index, is_published)
VALUES
('01', 'INSPIRE AWARD — MANAK', 'AI / MACHINE LEARNING', 'Govt of India', 1, true),
('02', 'NIT CALICUT', 'INNOVATION & ENTREPRENEURSHIP', 'NIT Program', 2, true),
('03', 'CONVERGE 2026', 'REVERSE PITCH COMPETITION', 'Reverse Pitch', 3, true),
('04', '🥇 1ST PRIZE', '₹25,000 TEAM WIN', 'Champion', 4, true);

-- 10. Projects
INSERT INTO projects (
    slug, number, name, category, description, highlights, technologies,
    image, view_url, github_url, is_featured, order_index, is_published, is_draft
) VALUES
(
    'smart-attendance',
    'PROJECT 01',
    'AI-POWERED SMART ATTENDANCE SYSTEM',
    'Machine Learning • Computer Vision • Python',
    'An AI-powered smart attendance system developed under the INSPIRE Award – MANAK (Government of India). The project uses Machine Learning and Computer Vision to automate attendance management, eliminating manual check-ins through intelligent pattern recognition.',
    '["🏆 INSPIRE Award – MANAK", "₹10,000 Innovation Grant", "Machine Learning", "Computer Vision"]'::jsonb,
    '["Python", "Machine Learning", "Computer Vision", "OpenCV"]'::jsonb,
    '/assets/projects/smart-attendance.jpg',
    '#achievement',
    'https://github.com/',
    true,
    1,
    true,
    false
),
(
    'flutter-mobile-app',
    'PROJECT 02',
    'FLUTTER & E-COMMERCE SOLUTIONS',
    'Mobile Application Development',
    'Built multiple Flutter applications and e-commerce solutions during my internship at Cyra Learnings, including responsive UI, API integration, authentication and modern mobile experiences.',
    '["Production Mobile App", "REST API Integration", "State Management"]'::jsonb,
    '["Flutter", "Dart", "REST API", "Firebase"]'::jsonb,
    '/assets/projects/flutter.jpg',
    '#',
    'https://github.com/',
    false,
    2,
    true,
    false
),
(
    'embedded-raspi-iot',
    'PROJECT 03',
    'RASPBERRY PI SMART MONITORING SYSTEM',
    'Embedded Systems & Hardware',
    'Designed a Raspberry Pi-based monitoring system using sensors and Python for real-time monitoring and automation.',
    '["Hardware-Software Integration", "Sensor Telemetry", "Real-time Automation"]'::jsonb,
    '["Raspberry Pi", "Python", "Sensors", "Linux"]'::jsonb,
    '/assets/projects/iot.jpg',
    '#',
    'https://github.com/',
    false,
    3,
    true,
    false
),
(
    'data-analytics-dashboard',
    'PROJECT 04',
    'AI & DATA SCIENCE EXPLORER',
    'Data Science & Visualization',
    'Interactive platform for dataset visualization, SQL analysis and machine learning insights.',
    '["Interactive Visualizations", "SQL Data Analysis", "ML Insights"]'::jsonb,
    '["Python", "SQL", "HTML", "CSS", "JavaScript"]'::jsonb,
    '/assets/projects/data-science.jpg',
    '#',
    'https://github.com/',
    false,
    4,
    true,
    false
);

-- 11. Businesses
INSERT INTO businesses (
    slug, number, name, role, category, short_desc, description,
    image, tags, website, instagram, order_index, is_published, is_draft
) VALUES
(
    'motherbits',
    'BUSINESS 01',
    'MOTHERBITS TECHNOLOGIES LLP',
    'CO-FOUNDER',
    'TECH INNOVATION · PRODUCT R&D',
    'Tech innovation platform exploring digital products, R&D, and kids'' electric ride-on systems.',
    'MOTHERBITS TECHNOLOGIES LLP is the business platform through which I explore the intersection of technology, products and entrepreneurship. Focused on tech innovation, digital products, and kids'' electric ride-on systems.',
    '/assets/business/motherbits.jpg',
    '["Tech Platform", "Product R&D", "Co-Founder"]'::jsonb,
    NULL,
    NULL,
    1,
    true,
    false
),
(
    'kingday',
    'BUSINESS 02',
    'KING DAY',
    'FOUNDER',
    'KIDS RIDE-ONS · E-COMMERCE',
    'Premium kids'' recreation brand specializing in electric ride-ons, toys, cycles, and e-commerce.',
    'King Day is a kids'' products brand focused on electric ride-ons, toys, cycles and related products. Delivering high-quality premium recreation products for modern families.',
    '/assets/business/kingday.jpg',
    '["Electric Ride-ons", "Toys & Cycles", "E-Commerce"]'::jsonb,
    'https://kingday.in',
    'https://instagram.com/',
    2,
    true,
    false
),
(
    'zoltiq',
    'BUSINESS 03',
    'ZOLTIQ',
    'FOUNDER',
    'GLOBAL TRADE · IMPORT / EXPORT',
    'International trade brand focused on product sourcing, global commerce, and regional supply chain.',
    'ZOLTIQ is an import-export brand focused on product sourcing, international trade and market opportunities. Bridging global manufacturers with growing regional distribution channels.',
    '/assets/business/zoltiq.jpg',
    '["Global Sourcing", "International Trade", "Logistics"]'::jsonb,
    NULL,
    NULL,
    3,
    true,
    false
);

-- 12. Experience
INSERT INTO experience (
    company, position, duration, length, location,
    paragraphs, mentorship, skills_highlighted, order_index, is_published
) VALUES (
    'CYRA LEARNINGS',
    'SOFTWARE TRAINEE / FLUTTER INTERN',
    'June 2024 — December 2024',
    '7 MONTHS',
    'India',
    '[
        "During my Software Trainee internship in Flutter at Cyra Learnings, I had the opportunity to work on real projects, collaborate with a talented team, and strengthen my skills in mobile application development.",
        "The experience taught me the importance of hard work, professionalism, teamwork and delivering results. Every challenge helped me grow as a developer, problem-solver and learner."
    ]'::jsonb,
    'Special appreciation to my mentor, Umer Multhar, for guiding me throughout the internship and helping me sharpen my skills.',
    '["Flutter", "Mobile App Development", "Team Collaboration", "Problem Solving", "Professionalism"]'::jsonb,
    1,
    true
);

-- 13. Education
INSERT INTO education (degree, field, institution, status, badge, order_index, is_published)
VALUES
('BACHELOR OF TECHNOLOGY', 'ARTIFICIAL INTELLIGENCE & DATA SCIENCE', 'KMCT Engineering College, Manassery', 'Currently Pursuing', 'Current Undergraduate Degree', 1, true),
('HIGHER SECONDARY EDUCATION', 'SCIENCE & COMPUTER TECHNOLOGY', 'MODEL TECHNICAL HIGHER SECONDARY SCHOOL — IHRD', 'Completed', 'Technical High School Foundation', 2, true);

-- 14. Skills
INSERT INTO skills (category, name, order_index, is_published)
VALUES
('programming', 'C', 1, true),
('programming', 'C++', 2, true),
('programming', 'Python', 3, true),
('development', 'Flutter', 1, true),
('development', 'HTML', 2, true),
('development', 'CSS', 3, true),
('development', 'React', 4, true),
('dataAi', 'Artificial Intelligence', 1, true),
('dataAi', 'Machine Learning', 2, true),
('dataAi', 'Data Science', 3, true),
('database', 'SQL', 1, true),
('hardware', 'Raspberry Pi', 1, true),
('professional', 'Entrepreneurship', 1, true),
('professional', 'Problem Solving', 2, true),
('professional', 'Teamwork', 3, true),
('professional', 'Innovation', 4, true);

-- 15. Recognitions
INSERT INTO recognitions (title, issuer, type, description, order_index, is_published)
VALUES
('INSPIRE AWARD — MANAK', 'Government of India', 'National Innovation Award', 'Awarded for Machine Learning-Based Smart Attendance System innovation.', 1, true),
('ADVANCED AIRCRAFT DESIGN WORKSHOP', 'Technical Aeronautics Workshop', 'Engineering Workshop Certification', 'Hands-on technical workshop on aircraft aerodynamic principles, structural design, and aviation mechanics.', 2, true);

-- 16. Business Tech Flow
INSERT INTO business_tech_flow (step, name, icon, order_index)
VALUES
('01', 'AI & DATA SCIENCE', 'Brain', 1),
('02', 'TECHNOLOGY', 'Cpu', 2),
('03', 'PROJECTS', 'Code', 3),
('04', 'PRODUCTS', 'Package', 4),
('05', 'BUSINESS', 'TrendingUp', 5);

-- 17. Currently Exploring
INSERT INTO currently_exploring (topic, order_index)
VALUES
('Artificial Intelligence', 1),
('Machine Learning', 2),
('Data Science', 3),
('Software Development', 4),
('Entrepreneurship', 5),
('Real-World Product Building', 6);

-- 18. Website Settings
INSERT INTO website_settings (id, site_title, meta_description, og_image, hero_tagline, footer_text)
VALUES (
    'main',
    'Muhammed Ansab — Building Ideas Into Reality',
    'Official Personal Portfolio of Muhammed Ansab Thalappil — AI & Data Science Student, Programmer, Developer, Entrepreneur & Innovator.',
    '/assets/profile.jpg',
    'BUILDING IDEAS INTO REALITY.',
    '© 2026 Muhammed Ansab Thalappil. Built with high precision.'
) ON CONFLICT (id) DO UPDATE SET updated_at = now();
