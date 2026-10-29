-- =============================================================================
-- HALISHAHAR PUBLIC SCHOOL AND COLLEGE (হালিশহর পাবলিক স্কুল এন্ড কলেজ)
-- Database Seed Data
-- =============================================================================

-- 1. SCHOOL PROFILE & SETTINGS
INSERT INTO school_settings (
    institution_name_en,
    institution_name_bn,
    branding_estd,
    survey_estd_date,
    eiin,
    institution_type,
    education_level,
    management_type,
    english_version,
    area_classification,
    geographical_position,
    parliamentary_constituency,
    institution_status,
    division,
    district,
    police_station,
    union_ward,
    mouza,
    post_office,
    full_address,
    primary_mobile,
    alternative_mobile,
    telephone,
    email,
    logo_url,
    campus_image_url,
    campus_banner_url,
    tagline_en,
    tagline_bn,
    reference_timestamp
) VALUES (
    'HALISHAHAR PUBLIC SCHOOL AND COLLEGE',
    'হালিশহর পাবলিক স্কুল এন্ড কলেজ',
    'Estd: 2002',
    'January 1, 2004',
    '136764',
    'স্কুল',
    'নিম্ন মাধ্যমিক',
    'বেসরকারি',
    'না',
    'সিটি কর্পোরেশন',
    'সমতল',
    'চট্টগ্রাম-১০ (২৮৭)',
    'চলমান',
    'চট্টগ্রাম',
    'চট্টগ্রাম',
    'হালিশহর',
    'ওয়ার্ড নং - ২৬',
    'উত্তর হালিশহর বি। ব্লকের',
    'উত্তর হালিশহর (৪২২৬)',
    'HOUSE-42-43, ROAD-04,B-BLOCK,HALISHAHAR H/E,',
    '01819545654',
    '01829730515',
    '0312526310',
    'hpscctg@mail.com',
    '/assets/school-logo.png',
    '/assets/campus-main.jpg',
    '/assets/campus-banner.jpg',
    'Education Builds A Better Future',
    'শিক্ষা মানুষের মনের আলো, সুপ্ত মেধার সাহস যোগায়, সমাজ ও দেশকে আলোকিত করে।',
    '2026-10-29 10:10:14 AM'
);

-- 2. ACADEMIC YEARS
INSERT INTO academic_years (id, name, start_date, end_date, is_current, is_archived) VALUES
('a0000000-0000-0000-0000-000000002026', 'Academic Year 2026', '2026-01-01', '2026-12-31', true, false),
('a0000000-0000-0000-0000-000000002025', 'Academic Year 2025', '2025-01-01', '2025-12-31', false, true);

-- 3. GRADING POLICY & RULES (Standard Bangladesh NCTB 5.0 GPA Scale)
INSERT INTO grading_policies (id, name, is_default, description) VALUES
('b0000000-0000-0000-0000-000000000001', 'Bangladesh NCTB Standard Secondary Grading', true, 'Standard 5.0 GPA Scale for Secondary Schools');

INSERT INTO grading_rules (policy_id, min_mark, max_mark, grade_letter, gpa_point, remarks) VALUES
('b0000000-0000-0000-0000-000000000001', 80.00, 100.00, 'A+', 5.00, 'Outstanding'),
('b0000000-0000-0000-0000-000000000001', 70.00, 79.99, 'A', 4.00, 'Excellent'),
('b0000000-0000-0000-0000-000000000001', 60.00, 69.99, 'A-', 3.50, 'Very Good'),
('b0000000-0000-0000-0000-000000000001', 50.00, 59.99, 'B', 3.00, 'Good'),
('b0000000-0000-0000-0000-000000000001', 40.00, 49.99, 'C', 2.00, 'Satisfactory'),
('b0000000-0000-0000-0000-000000000001', 33.00, 39.99, 'D', 1.00, 'Passing'),
('b0000000-0000-0000-0000-000000000001', 0.00, 32.99, 'F', 0.00, 'Failed');

-- 4. CLASSES
INSERT INTO classes (id, name_en, name_bn, numeric_grade, education_level, academic_year_id) VALUES
('c0000000-0000-0000-0000-000000000006', 'Class Six', 'ষষ্ঠ শ্রেণি', 6, 'Junior Secondary', 'a0000000-0000-0000-0000-000000002026'),
('c0000000-0000-0000-0000-000000000007', 'Class Seven', 'সপ্তম শ্রেণি', 7, 'Junior Secondary', 'a0000000-0000-0000-0000-000000002026'),
('c0000000-0000-0000-0000-000000000008', 'Class Eight', 'অষ্টম শ্রেণি', 8, 'Junior Secondary', 'a0000000-0000-0000-0000-000000002026'),
('c0000000-0000-0000-0000-000000000009', 'Class Nine', 'নবম শ্রেণি', 9, 'Secondary', 'a0000000-0000-0000-0000-000000002026'),
('c0000000-0000-0000-0000-000000000010', 'Class Ten', 'দশম শ্রেণি', 10, 'Secondary', 'a0000000-0000-0000-0000-000000002026');

-- 5. SECTIONS
INSERT INTO sections (id, class_id, name, capacity, room_number) VALUES
('s0000000-0000-0000-0000-000000000601', 'c0000000-0000-0000-0000-000000000006', 'Section A', 50, 'Room 101'),
('s0000000-0000-0000-0000-000000000602', 'c0000000-0000-0000-0000-000000000006', 'Section B', 50, 'Room 102'),
('s0000000-0000-0000-0000-000000000701', 'c0000000-0000-0000-0000-000000000007', 'Section A', 50, 'Room 103'),
('s0000000-0000-0000-0000-000000000801', 'c0000000-0000-0000-0000-000000000008', 'Section A', 50, 'Room 201'),
('s0000000-0000-0000-0000-000000000901', 'c0000000-0000-0000-0000-000000000009', 'Section A (Science)', 45, 'Room 301'),
('s0000000-0000-0000-0000-000000000902', 'c0000000-0000-0000-0000-000000000009', 'Section B (Commerce/Arts)', 45, 'Room 302'),
('s0000000-0000-0000-0000-000000001001', 'c0000000-0000-0000-0000-000000000010', 'Section A', 45, 'Room 303');

-- 6. SUBJECTS (for Class 8 sample)
INSERT INTO subjects (id, class_id, name_en, name_bn, code, max_marks, pass_marks) VALUES
('sub00000-0000-0000-0000-000000000801', 'c0000000-0000-0000-0000-000000000008', 'Bangla First Paper', 'বাংলা ১ম পত্র', 'BAN-101', 100, 33),
('sub00000-0000-0000-0000-000000000802', 'c0000000-0000-0000-0000-000000000008', 'English First Paper', 'ইংরেজি ১ম পত্র', 'ENG-102', 100, 33),
('sub00000-0000-0000-0000-000000000803', 'c0000000-0000-0000-0000-000000000008', 'General Mathematics', 'সাধারণ গণিত', 'MATH-103', 100, 33),
('sub00000-0000-0000-0000-000000000804', 'c0000000-0000-0000-0000-000000000008', 'General Science', 'সাধারণ বিজ্ঞান', 'SCI-104', 100, 33),
('sub00000-0000-0000-0000-000000000805', 'c0000000-0000-0000-0000-000000000008', 'Bangladesh & Global Studies', 'বাংলাদেশ ও বিশ্বপরিচয়', 'BGS-105', 100, 33),
('sub00000-0000-0000-0000-000000000806', 'c0000000-0000-0000-0000-000000000008', 'Information & Communication Tech', 'তথ্য ও যোগাযোগ প্রযুক্তি', 'ICT-106', 50, 17);

-- 7. FEE CATEGORIES
INSERT INTO fee_categories (id, name, code, description, frequency) VALUES
('fee00000-0000-0000-0000-000000000001', 'Monthly Tuition Fee', 'TUITION', 'Standard monthly school tuition fee', 'monthly'),
('fee00000-0000-0000-0000-000000000002', 'Admission Session Fee', 'ADMISSION', 'Annual admission and session development fee', 'annual'),
('fee00000-0000-0000-0000-000000000003', 'Term Examination Fee', 'EXAM_FEE', 'Semester examination and evaluation fee', 'term'),
('fee00000-0000-0000-0000-000000000004', 'Library and Lab Fee', 'LIB_LAB', 'Annual library access and computer lab fee', 'annual');

-- 8. OFFICIAL NOTICES (Matches the user's reference mockup exactly!)
INSERT INTO notices (id, title_en, title_bn, content_en, content_bn, category, priority, is_published, publish_date) VALUES
(
    'n0000000-0000-0000-0000-000000000001',
    'Recruitment Notice for the Post of Principal',
    'প্রিন্সিপাল হিসেবে নিয়োগ বিজ্ঞপ্তি',
    'Applications are invited from qualified candidates for the post of Principal at Halishahar Public School and College. Interested candidates must submit their CV with attested certificates by November 15, 2026.',
    'হালিশহর পাবলিক স্কুল এন্ড কলেজে অভিজ্ঞ ও যোগ্যতাসম্পন্ন অধ্যক্ষ (প্রিন্সিপাল) নিয়োগের নিমিত্তে আগ্রহী প্রার্থীদের নিকট হতে দরখাস্ত আহ্বান করা যাচ্ছে। আগামী ১৫ নভেম্বর ২০২৬ তারিখের মধ্যে প্রয়োজনীয় কাগজপত্রসহ আবেদন জমা দেওয়ার নির্দেশ দেওয়া হলো।',
    'admin',
    'urgent',
    true,
    '2026-10-25'
),
(
    'n0000000-0000-0000-0000-000000000002',
    'Publication of Annual Examination Routine 2026',
    'বার্ষিক পরীক্ষার রুটিন প্রকাশ',
    'The Annual Examination 2026 for Class Six to Nine will commence from November 20, 2026. The detailed schedule and guidelines have been published on the school website and notice board.',
    '২০২৬ শিক্ষাবর্ষের ৬ষ্ঠ থেকে ৯ম শ্রেণির বার্ষিক পরীক্ষার সময়সূচি (রুটিন) প্রকাশিত হয়েছে। আগামী ২০ নভেম্বর ২০২৬ তারিখ হতে পরীক্ষা শুরু হবে। বিস্তারিত রুটিন ওয়েবসাইট ও নোটিশ বোর্ডে পাওয়া যাবে।',
    'exam',
    'important',
    true,
    '2026-10-20'
),
(
    'n0000000-0000-0000-0000-000000000003',
    'Important Notice for All Students Regarding Uniform and Punctuality',
    'শিক্ষার্থীদের জন্য গুরুত্বপূর্ণ নোটিশ',
    'All students are strictly instructed to attend morning assembly in proper school uniform by 8:45 AM. Carrying mobile phones or electronic gadgets into the campus is strictly prohibited.',
    'সকল শিক্ষার্থীদের নির্ধারিত স্কুল পোশাকে সকাল ৮:৪৫ মিনিটের মধ্যে প্রাত্যহিক সমাবেশে উপস্থিত থাকার জন্য কঠোর নির্দেশ প্রদান করা হচ্ছে। ক্যাম্পাসে মোবাইল ফোন বহন সম্পূর্ণ নিষিদ্ধ।',
    'academic',
    'normal',
    true,
    '2026-10-15'
),
(
    'n0000000-0000-0000-0000-000000000004',
    'Schedule for Guardian Assembly and Progress Report Sharing',
    'অভিভাবক সমাবেশের তারিখ',
    'A special Guardian Assembly will be held on Friday, November 06, 2026 at 10:00 AM in the school auditorium to discuss student academic progress and upcoming board guidelines.',
    'আগামী ০৬ নভেম্বর ২০২৬, রোজ শুক্রবার সকাল ১০:০০ ঘটিকায় বিদ্যালয় মিলনায়তনে এক অভিভাবক সমাবেশ অনুষ্ঠিত হবে। সকল অভিভাবকবৃন্দকে যথাসময়ে উপস্থিত হয়ে শিক্ষার্থীদের অগ্রগতি পর্যালোচনায় অংশগ্রহণের অনুরোধ করা যাচ্ছে।',
    'academic',
    'important',
    true,
    '2026-10-10'
);

-- 9. PHOTO GALLERY ITEMS
INSERT INTO gallery_items (title_en, title_bn, image_url, category, year, is_featured) VALUES
('School Campus Entrance Gate', 'স্কুল ক্যাম্পাস ও প্রবেশ তোরণ', '/assets/campus-main.jpg', 'Campus', 2026, true),
('Academic Building & Classrooms', 'একাডেমিক ভবন ও শ্রেণিকক্ষ', '/assets/campus-banner.jpg', 'Campus', 2026, true),
('Annual Sports & Cultural Program', 'বার্ষিক ক্রীড়া ও সাংস্কৃতিক অনুষ্ঠান', '/assets/campus-main.jpg', 'Events', 2026, true),
('Science Fair & ICT Laboratory', 'বিজ্ঞান মেলা ও আইসিটি ল্যাব', '/assets/campus-banner.jpg', 'Academic', 2026, true);
