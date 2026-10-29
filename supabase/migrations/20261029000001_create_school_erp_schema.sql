-- =============================================================================
-- HALISHAHAR PUBLIC SCHOOL AND COLLEGE (হালিশহর পাবলিক স্কুল এন্ড কলেজ)
-- Complete School Management & ERP Database Schema
-- EIIN: 136764 | Estd Branding: 2002 | Survey Estd: January 1, 2004
-- =============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SCHOOL CENTRAL SETTINGS
CREATE TABLE IF NOT EXISTS school_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institution_name_en VARCHAR(255) NOT NULL DEFAULT 'HALISHAHAR PUBLIC SCHOOL AND COLLEGE',
    institution_name_bn VARCHAR(255) NOT NULL DEFAULT 'হালিশহর পাবলিক স্কুল এন্ড কলেজ',
    branding_estd VARCHAR(50) NOT NULL DEFAULT 'Estd: 2002',
    survey_estd_date VARCHAR(50) NOT NULL DEFAULT 'January 1, 2004',
    eiin VARCHAR(50) NOT NULL DEFAULT '136764',
    institution_type VARCHAR(100) NOT NULL DEFAULT 'স্কুল',
    education_level VARCHAR(100) NOT NULL DEFAULT 'নিম্ন মাধ্যমিক',
    management_type VARCHAR(100) NOT NULL DEFAULT 'বেসরকারি',
    english_version VARCHAR(20) NOT NULL DEFAULT 'না',
    area_classification VARCHAR(100) NOT NULL DEFAULT 'সিটি কর্পোরেশন',
    geographical_position VARCHAR(100) NOT NULL DEFAULT 'সমতল',
    parliamentary_constituency VARCHAR(255) NOT NULL DEFAULT 'চট্টগ্রাম-১০ (২৮৭)',
    institution_status VARCHAR(50) NOT NULL DEFAULT 'চলমান',
    division VARCHAR(100) NOT NULL DEFAULT 'চট্টগ্রাম',
    district VARCHAR(100) NOT NULL DEFAULT 'চট্টগ্রাম',
    police_station VARCHAR(100) NOT NULL DEFAULT 'হালিশহর',
    union_ward VARCHAR(100) NOT NULL DEFAULT 'ওয়ার্ড নং - ২৬',
    mouza VARCHAR(255) NOT NULL DEFAULT 'উত্তর হালিশহর বি। ব্লকের',
    post_office VARCHAR(100) NOT NULL DEFAULT 'উত্তর হালিশহর (৪২২৬)',
    full_address TEXT NOT NULL DEFAULT 'HOUSE-42-43, ROAD-04,B-BLOCK,HALISHAHAR H/E,',
    primary_mobile VARCHAR(50) NOT NULL DEFAULT '01819545654',
    alternative_mobile VARCHAR(50) NOT NULL DEFAULT '01829730515',
    telephone VARCHAR(50) NOT NULL DEFAULT '0312526310',
    email VARCHAR(255) NOT NULL DEFAULT 'hpscctg@mail.com',
    logo_url TEXT DEFAULT '/assets/school-logo.png',
    campus_image_url TEXT DEFAULT '/assets/campus-main.jpg',
    campus_banner_url TEXT DEFAULT '/assets/campus-banner.jpg',
    tagline_en TEXT DEFAULT 'Education Builds A Better Future',
    tagline_bn TEXT DEFAULT 'শিক্ষা মানুষের মনের আলো, সুপ্ত মেধার সাহস যোগায়, সমাজ ও দেশকে আলোকিত করে।',
    reference_timestamp VARCHAR(100) DEFAULT '2026-10-29 10:10:14 AM',
    currency VARCHAR(10) DEFAULT 'BDT',
    timezone VARCHAR(50) DEFAULT 'Asia/Dhaka',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. USER ROLES ENUM & PROFILES
DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM (
        'super_admin',
        'school_admin',
        'principal',
        'teacher',
        'accountant',
        'admission_officer',
        'librarian',
        'student',
        'guardian'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name_en VARCHAR(255) NOT NULL,
    full_name_bn VARCHAR(255),
    role user_role_type NOT NULL DEFAULT 'student',
    phone VARCHAR(50),
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ACADEMIC YEARS
CREATE TABLE IF NOT EXISTS academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_current BOOLEAN DEFAULT FALSE,
    is_archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CLASSES
CREATE TABLE IF NOT EXISTS classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en VARCHAR(100) NOT NULL,
    name_bn VARCHAR(100) NOT NULL,
    numeric_grade INT NOT NULL,
    education_level VARCHAR(50) DEFAULT 'Secondary',
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(name_en, academic_year_id)
);

-- 5. SECTIONS
CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    capacity INT DEFAULT 60,
    room_number VARCHAR(50),
    class_teacher_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, name)
);

-- 6. SUBJECTS
CREATE TABLE IF NOT EXISTS subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    name_en VARCHAR(150) NOT NULL,
    name_bn VARCHAR(150) NOT NULL,
    code VARCHAR(50) NOT NULL,
    subject_type VARCHAR(50) DEFAULT 'compulsory', -- compulsory, optional, elective
    max_marks NUMERIC(5,2) DEFAULT 100.00,
    pass_marks NUMERIC(5,2) DEFAULT 33.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, code)
);

-- 7. STAFF AND TEACHERS
CREATE TABLE IF NOT EXISTS staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255),
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) DEFAULT 'Academic',
    joining_date DATE,
    qualification TEXT,
    phone VARCHAR(50),
    email VARCHAR(255),
    employment_status VARCHAR(50) DEFAULT 'active',
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. STUDENTS
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    student_id VARCHAR(50) UNIQUE NOT NULL,
    admission_no VARCHAR(50) UNIQUE,
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255),
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    blood_group VARCHAR(10),
    religion VARCHAR(50),
    father_name VARCHAR(255),
    mother_name VARCHAR(255),
    primary_phone VARCHAR(50) NOT NULL,
    emergency_contact VARCHAR(50),
    address TEXT,
    previous_school TEXT,
    enrollment_status VARCHAR(50) DEFAULT 'active', -- active, transferred, graduated, suspended
    photo_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. GUARDIANS
CREATE TABLE IF NOT EXISTS guardians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    name_en VARCHAR(255) NOT NULL,
    name_bn VARCHAR(255),
    relationship VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    occupation VARCHAR(100),
    nid VARCHAR(50),
    address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. STUDENT GUARDIAN RELATIONSHIP
CREATE TABLE IF NOT EXISTS student_guardians (
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    guardian_id UUID NOT NULL REFERENCES guardians(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (student_id, guardian_id)
);

-- 11. ENROLLMENTS (HISTORICAL & ACTIVE)
CREATE TABLE IF NOT EXISTS enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    roll_number INT NOT NULL,
    enrolled_at TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'active',
    UNIQUE(academic_year_id, class_id, section_id, roll_number),
    UNIQUE(academic_year_id, student_id)
);

-- 12. TEACHER SUBJECT ASSIGNMENTS
CREATE TABLE IF NOT EXISTS teacher_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, section_id, subject_id, academic_year_id)
);

-- 13. ATTENDANCE SESSIONS & RECORDS
CREATE TABLE IF NOT EXISTS attendance_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    recorded_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, section_id, session_date)
);

CREATE TABLE IF NOT EXISTS attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES attendance_sessions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'present', -- present, absent, late, excused
    remarks TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(session_id, student_id)
);

-- 14. GRADING POLICIES & RULES
CREATE TABLE IF NOT EXISTS grading_policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT TRUE,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS grading_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    policy_id UUID NOT NULL REFERENCES grading_policies(id) ON DELETE CASCADE,
    min_mark NUMERIC(5,2) NOT NULL,
    max_mark NUMERIC(5,2) NOT NULL,
    grade_letter VARCHAR(10) NOT NULL,
    gpa_point NUMERIC(3,2) NOT NULL,
    remarks VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. EXAMINATIONS
CREATE TABLE IF NOT EXISTS examinations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    exam_type VARCHAR(50) DEFAULT 'Term Exam', -- Half Yearly, Annual, Pre-Test, Test
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMPTZ,
    published_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. EXAMINATION SUBJECT DETAILS
CREATE TABLE IF NOT EXISTS examination_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    examination_id UUID NOT NULL REFERENCES examinations(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    exam_date DATE,
    start_time TIME,
    end_time TIME,
    room_number VARCHAR(50),
    max_marks NUMERIC(5,2) DEFAULT 100.00,
    pass_marks NUMERIC(5,2) DEFAULT 33.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(examination_id, subject_id)
);

-- 17. STUDENT MARKS
CREATE TABLE IF NOT EXISTS marks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    examination_id UUID NOT NULL REFERENCES examinations(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    marks_obtained NUMERIC(5,2),
    is_absent BOOLEAN DEFAULT FALSE,
    status VARCHAR(30) DEFAULT 'draft', -- draft, submitted, approved, published
    entered_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    remarks TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(examination_id, subject_id, student_id)
);

-- 18. CLASS ROUTINE / TIMETABLE
CREATE TABLE IF NOT EXISTS class_routines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
    weekday VARCHAR(20) NOT NULL, -- Saturday, Sunday, Monday, Tuesday, Wednesday, Thursday
    period_no INT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    teacher_id UUID REFERENCES staff(id) ON DELETE SET NULL,
    room_number VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, section_id, weekday, period_no)
);

-- 19. ADMISSIONS
CREATE TABLE IF NOT EXISTS admission_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_no VARCHAR(50) UNIQUE NOT NULL,
    applicant_name_en VARCHAR(255) NOT NULL,
    applicant_name_bn VARCHAR(255),
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    desired_class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE SET NULL,
    guardian_name VARCHAR(255) NOT NULL,
    guardian_phone VARCHAR(50) NOT NULL,
    guardian_email VARCHAR(255),
    address TEXT NOT NULL,
    previous_school TEXT,
    status VARCHAR(50) DEFAULT 'new', -- new, under_review, documents_requested, accepted, rejected, waitlisted, admitted
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    review_notes TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 20. FEES & INVOICES
CREATE TABLE IF NOT EXISTS fee_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    frequency VARCHAR(50) DEFAULT 'monthly', -- monthly, term, annual, one_time
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
    fee_category_id UUID NOT NULL REFERENCES fee_categories(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    discount NUMERIC(10,2) DEFAULT 0.00,
    net_amount NUMERIC(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(30) DEFAULT 'unpaid', -- unpaid, partially_paid, paid, cancelled
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    amount_paid NUMERIC(10,2) NOT NULL,
    payment_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'cash', -- cash, bank, bKash, nagad
    transaction_ref VARCHAR(100),
    collected_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    remarks TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. NOTICES
CREATE TABLE IF NOT EXISTS notices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en VARCHAR(255) NOT NULL,
    title_bn VARCHAR(255) NOT NULL,
    content_en TEXT NOT NULL,
    content_bn TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'academic', -- academic, admin, exam, holiday, admission
    priority VARCHAR(20) DEFAULT 'normal', -- normal, important, urgent
    is_published BOOLEAN DEFAULT TRUE,
    publish_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expiry_date DATE,
    attachment_url TEXT,
    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 22. EVENTS & CALENDAR
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en VARCHAR(255) NOT NULL,
    title_bn VARCHAR(255) NOT NULL,
    description_en TEXT,
    description_bn TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    event_type VARCHAR(50) DEFAULT 'academic', -- academic, holiday, exam, cultural, sports
    location VARCHAR(255) DEFAULT 'School Campus',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 23. LIBRARY
CREATE TABLE IF NOT EXISTS library_books (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    accession_no VARCHAR(50) UNIQUE NOT NULL,
    isbn VARCHAR(50),
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    publisher VARCHAR(255),
    category VARCHAR(100) DEFAULT 'General',
    edition VARCHAR(50),
    publication_year INT,
    total_copies INT DEFAULT 1,
    available_copies INT DEFAULT 1,
    shelf_location VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS library_loans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    book_id UUID NOT NULL REFERENCES library_books(id) ON DELETE CASCADE,
    borrower_type VARCHAR(20) NOT NULL DEFAULT 'student', -- student, staff
    borrower_id UUID NOT NULL,
    issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(30) DEFAULT 'issued', -- issued, returned, overdue
    fine_amount NUMERIC(8,2) DEFAULT 0.00,
    issued_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 24. PHOTO GALLERY
CREATE TABLE IF NOT EXISTS gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en VARCHAR(255) NOT NULL,
    title_bn VARCHAR(255),
    image_url TEXT NOT NULL,
    category VARCHAR(100) DEFAULT 'Campus', -- Campus, Events, Sports, Classroom, Cultural
    year INT DEFAULT 2026,
    is_featured BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 25. AUDIT LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(100),
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

ALTER TABLE school_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_years ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_guardians ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE grading_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE grading_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE examinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE examination_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_routines ENABLE ROW LEVEL SECURITY;
ALTER TABLE admission_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE library_loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Public read for school settings, notices, events, gallery, public classes, routines
CREATE POLICY "Public read school_settings" ON school_settings FOR SELECT USING (true);
CREATE POLICY "Public read notices" ON notices FOR SELECT USING (is_published = true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (is_published = true);
CREATE POLICY "Public read gallery" ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public read academic_years" ON academic_years FOR SELECT USING (true);
CREATE POLICY "Public read classes" ON classes FOR SELECT USING (true);
CREATE POLICY "Public read sections" ON sections FOR SELECT USING (true);
CREATE POLICY "Public read subjects" ON subjects FOR SELECT USING (true);
CREATE POLICY "Public read class_routines" ON class_routines FOR SELECT USING (true);
CREATE POLICY "Public read grading_rules" ON grading_rules FOR SELECT USING (true);
CREATE POLICY "Public read published exams" ON examinations FOR SELECT USING (is_published = true);
CREATE POLICY "Public read library_books" ON library_books FOR SELECT USING (true);

-- Public insert for admission applications
CREATE POLICY "Public submit admission" ON admission_applications FOR INSERT WITH CHECK (true);

-- Profiles: Authenticated users can view their own profile, admins can manage all
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Staff read student/guardian profiles" ON profiles FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'school_admin', 'principal', 'teacher'))
);
CREATE POLICY "Admin manage profiles" ON profiles FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'school_admin'))
);

-- Marks: Published marks can be read by respective student/guardian or staff
CREATE POLICY "Marks view policy" ON marks FOR SELECT USING (
    status = 'published' OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'school_admin', 'principal', 'teacher'))
);
CREATE POLICY "Teacher enter marks" ON marks FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'school_admin', 'principal', 'teacher'))
);

-- Invoices & Payments: Student/guardian can view own, accountant/admin can manage all
CREATE POLICY "Students read own invoices" ON invoices FOR SELECT USING (
    EXISTS (SELECT 1 FROM students WHERE id = invoices.student_id AND profile_id = auth.uid()) OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'school_admin', 'accountant', 'principal'))
);
CREATE POLICY "Accountant manage invoices" ON invoices FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'school_admin', 'accountant'))
);
CREATE POLICY "Accountant manage payments" ON payments FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'school_admin', 'accountant'))
);

-- Administrative policies for full CRUD
CREATE POLICY "Admin manage school settings" ON school_settings FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'school_admin'))
);
CREATE POLICY "Admin manage notices" ON notices FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'school_admin', 'principal'))
);
CREATE POLICY "Admin manage attendance" ON attendance_records FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'school_admin', 'principal', 'teacher'))
);
CREATE POLICY "Admin manage admissions" ON admission_applications FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('super_admin', 'school_admin', 'admission_officer', 'principal'))
);
