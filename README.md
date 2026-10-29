# HALISHAHAR PUBLIC SCHOOL AND COLLEGE (হালিশহর পাবলিক স্কুল এন্ড কলেজ)
## Complete School Management Website & ERP System
**EIIN:** 136764 | **Branding Estd:** Estd: 2002 | **Annual Survey Estd:** January 1, 2004

---

## 1. Executive Summary & Institutional Identity

This project is a comprehensive, production-ready **School Management Website and School ERP System** engineered specifically for **Halishahar Public School and College (হালিশহর পাবলিক স্কুল এন্ড কলেজ)**, Chattogram.

The system combines:
1. **Classical, High-Credibility Public Educational Website:**
   - Classical Navy Blue (`#082E50`), Heritage Gold (`#D6A545`), Warm Cream (`#FBF8F0`), and Academic Blue (`#124C7C`) design system.
   - Distinct 3-column academic homepage matching the official institutional layout.
   - Dedicated bilingual, printer-friendly **Annual Survey Information** document page.
   - Searchable Results, Online Admission with instant tracking, Class & Exam Routines, Notice Board reader modal, Photo Gallery lightbox, and Faculty Directory.
2. **Integrated Role-Based School Management ERP Dashboard:**
   - 9 User Roles: Super Admin, School Admin, Principal, Teacher, Accountant, Admission Officer, Librarian, Student, Guardian.
   - Real-time calculated analytics (Enrollment, Attendance rates, Fee collections, Admissions).
   - Student Registry with Profile Viewer, CSV Export, and printable Student ID Cards.
   - Daily Attendance marking by Class and Section with A4 printable attendance sheets.
   - NCTB 5.0 GPA examination mark evaluation and result publication workflow.
   - Admission Application processing (New &rarr; Under Review &rarr; Accepted &rarr; Enrolled into Student Registry).
   - Fees & Billing module with manual payment recording (Cash, bKash, Nagad, Bank) and printable Money Receipts.
   - Notice Board management, Book Circulation management, and System Audit Logs.

---

## 2. Official School Baseline Information (Preserved Exactly)

| Parameter | Official Value |
| :--- | :--- |
| **Official English Name** | `HALISHAHAR PUBLIC SCHOOL AND COLLEGE` |
| **Official Bengali Name** | `হালিশহর পাবলিক স্কুল এন্ড কলেজ` |
| **Branding Label** | `Estd: 2002` |
| **Survey Establishment Date** | `January 1, 2004` |
| **EIIN** | `136764` |
| **Institution Type** | স্কুল (School) |
| **Education Level** | নিম্ন মাধ্যমিক / মাধ্যমিক (Junior Secondary / Secondary) |
| **Management** | বেসরকারি (Private) |
| **English Version** | না (No) |
| **Area Classification** | সিটি কর্পোরেশন (City Corporation) |
| **Geographical Position** | সমতল (Plain) |
| **Parliamentary Constituency** | চট্টগ্রাম-১০ (২৮৭) [Chattogram-10 (287)] |
| **Status** | চলমান (Active) |
| **Division & District** | চট্টগ্রাম (Chattogram) |
| **Police Station** | হালিশহর (Halishahar) |
| **Union / Ward** | ওয়ার্ড নং - ২৬ (Ward No. 26) |
| **Mouza** | উত্তর হালিশহর বি। ব্লকের |
| **Post Office** | উত্তর হালিশহর (৪২২৬) |
| **Full Address** | `HOUSE-42-43, ROAD-04,B-BLOCK,HALISHAHAR H/E,` |
| **Primary Mobile** | `01819545654` |
| **Alternative Mobile** | `01829730515` |
| **Telephone** | `0312526310` |
| **Official Email** | `hpscctg@mail.com` |
| **Reference Survey Timestamp**| `2026-10-29 10:10:14 AM` |

---

## 3. Technology Stack

- **Frontend Framework:** Next.js 14 (App Router, TypeScript)
- **Styling & Theme:** Tailwind CSS with custom Classical Navy & Gold educational color system
- **Iconography:** Lucide React
- **Visual Analytics:** Recharts
- **Database & Backend:** Supabase (PostgreSQL with Row Level Security)
- **State & Data Layer:** Resilient hybrid architecture (connects to Supabase PostgreSQL when credentials exist; runs with an integrated, fully-seeded reactive local store for local development and offline demonstrations)
- **Localization:** Custom reactive bilingual engine (`bn` & `en`) with persistent language preference

---

## 4. Project Directory Structure

```text
halishahar-school-erp/
├── public/
│   └── assets/
│       ├── school-logo.png          # Official Halishahar School emblem
│       ├── campus-main.jpg          # Campus entrance & gate photograph
│       ├── campus-banner.jpg        # Campus academic banner photograph
│       └── reference-mockup.jpg     # Homepage visual reference
├── src/
│   ├── app/
│   │   ├── (public pages)/
│   │   │   ├── page.tsx             # 3-column classic academic homepage
│   │   │   ├── survey/page.tsx      # Official Annual Survey report (A4 printable)
│   │   │   ├── about/page.tsx       # Institutional overview, history, mission
│   │   │   ├── academic/page.tsx    # Curriculum & NCTB grading policies
│   │   │   ├── admission/page.tsx   # Online admission application & tracker
│   │   │   ├── results/page.tsx     # Public examination result lookup & marksheet
│   │   │   ├── routine/page.tsx     # Class routine schedule
│   │   │   ├── exam-routine/page.tsx# Examination schedule
│   │   │   ├── notices/page.tsx     # Notice board & reader modal
│   │   │   ├── gallery/page.tsx     # Photo gallery with modal lightbox
│   │   │   ├── students/page.tsx    # Student affairs & code of conduct
│   │   │   ├── teachers/page.tsx    # Faculty & staff directory
│   │   │   ├── library/page.tsx     # Library book catalog
│   │   │   ├── calendar/page.tsx    # Academic calendar & events
│   │   │   └── contact/page.tsx     # Contact info & interactive form
│   │   └── dashboard/page.tsx       # Complete School Management ERP Dashboard
│   ├── components/
│   │   ├── layout/                  # TopBar, InstitutionalHeader, Navbar, Footer
│   │   ├── home/                    # HeroCarousel, QuickAccessTiles, AnnualSurveyCard, LeftMenuColumn, RightWidgetsColumn
│   │   └── dashboard/               # DashboardSidebar, DashboardHeader, and 10 Module Views
│   ├── config/
│   │   └── school.config.ts         # Centralized school configuration
│   ├── lib/
│   │   ├── localization/            # English and Bengali dictionaries & context
│   │   ├── store/                   # Reactive school store & CRUD operations
│   │   └── supabase/                # Supabase client adapter
│   └── types/
│       └── index.ts                 # TypeScript type definitions
└── supabase/
    ├── migrations/
    │   └── 20261029000001_create_school_erp_schema.sql # Complete 25-table schema with RLS
    └── seed.sql                     # Official school initial configuration seed data
```

---

## 5. Local Setup & Execution Guide

### Prerequisites
- Node.js (v18 or higher recommended, tested on v24)
- npm (v9 or higher)

### Installation
```bash
# 1. Navigate to the project directory
cd "C:\Users\UESR\.gemini\antigravity\scratch\halishahar-school-erp"

# 2. Install dependencies (already pre-installed)
npm install

# 3. Start development server
npm run dev

# Or build and launch production server
npm run build
npm run start
```
The application will be accessible at: **`http://localhost:3000`**

---

## 6. Supabase Database Configuration & Migration Guide

The project includes production-ready database scripts in the `supabase/` directory:

1. **Schema Migration:** `supabase/migrations/20261029000001_create_school_erp_schema.sql`
   - Defines all 25 tables: `school_settings`, `profiles`, `academic_years`, `classes`, `sections`, `subjects`, `staff`, `students`, `guardians`, `enrollments`, `attendance_sessions`, `attendance_records`, `grading_rules`, `examinations`, `marks`, `class_routines`, `admission_applications`, `fee_categories`, `invoices`, `payments`, `notices`, `events`, `library_books`, `library_loans`, `audit_logs`.
   - Enables PostgreSQL Row Level Security (RLS) across all tables with least-privilege security policies.
2. **Seed Data:** `supabase/seed.sql`
   - Pre-populates the exact Halishahar Public School and College baseline parameters, classes (6-10), NCTB grading scale, initial circulars, and fees.

### Connecting to Live Supabase:
1. Create a project at [supabase.com](https://supabase.com).
2. Open the **SQL Editor** in Supabase and run `supabase/migrations/20261029000001_create_school_erp_schema.sql`.
3. Run `supabase/seed.sql`.
4. Copy your project URL and Anon Key into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

---

## 7. Role-Based Permissions Matrix

| Module / Operation | Super Admin | School Admin | Principal | Teacher | Accountant | Admission Officer | Librarian | Student | Guardian |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **System Settings** | Full | View | View | — | — | — | — | — | — |
| **Student Registry** | Full | Full | View | View/Edit | — | — | — | Own Profile | Linked Child |
| **Teacher Management** | Full | Full | View | View Directory| — | — | — | — | — |
| **Daily Attendance** | Full | Full | Review | Enter/Mark | — | — | — | View Own | View Child |
| **Marks Entry & Results** | Publish | Publish | Approve | Enter Marks | — | — | — | View Published | View Published |
| **Admission Applications**| Full | Full | Review | — | — | Full | — | Public Apply | Public Apply |
| **Fees & Accounts** | Full | Full | Review | — | Full | — | — | View Own Invoices | View Child Invoices |
| **Library Catalog** | Full | Full | View | View | — | — | Full | View Catalog | View Catalog |
| **Notice Management** | Full | Full | Publish | View | View | View | View | View Published | View Published |
| **Audit Logs** | Full | — | — | — | — | — | — | — | — |

---

## 8. Verification & Quality Assurance Results

- **Build Check:** Next.js production build (`npm run build`) completed successfully with exit code 0; all 19 static routes generated cleanly.
- **Route Validation:** All 16 HTTP endpoints verified (`/`, `/survey`, `/about`, `/academic`, `/admission`, `/results`, `/routine`, `/exam-routine`, `/notices`, `/gallery`, `/students`, `/teachers`, `/library`, `/calendar`, `/contact`, `/dashboard`) returning HTTP 200 OK.
- **Data Invariant Verification:** Checked and confirmed exact preservation of English and Bengali school names, EIIN `136764`, branding `Estd: 2002`, survey date `January 1, 2004`, telephone `0312526310`, mobile `01819545654`, and address `HOUSE-42-43, ROAD-04,B-BLOCK,HALISHAHAR H/E,`.
- **Print Optimization:** Tested `@media print` rules; navigation and buttons are hidden automatically, delivering clean A4 printable layouts for Marksheets, ID Cards, Money Receipts, Attendance Sheets, and Survey Reports.
