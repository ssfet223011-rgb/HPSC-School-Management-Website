'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, UserRole, StudentRecord, TeacherStaff, AdmissionApplication, 
  DailyAttendanceSession, Examination, StudentResultReport, FeeInvoice, FeePayment, 
  NoticeItem, SchoolEvent, RoutineItem, LibraryBook, LibraryLoan, AuditLogItem, 
  ClassItem, SectionItem, SubjectItem, CourseMaterial, AuthAccount, GalleryPhoto, SchoolBrandingAssets 
} from '@/types';
import { SCHOOL_CONFIG } from '@/config/school.config';

// Grading helper
export function calculateGrade(marks: number): { grade: string; gpa: number } {
  if (marks >= 80) return { grade: 'A+', gpa: 5.0 };
  if (marks >= 70) return { grade: 'A', gpa: 4.0 };
  if (marks >= 60) return { grade: 'A-', gpa: 3.5 };
  if (marks >= 50) return { grade: 'B', gpa: 3.0 };
  if (marks >= 40) return { grade: 'C', gpa: 2.0 };
  if (marks >= 33) return { grade: 'D', gpa: 1.0 };
  return { grade: 'F', gpa: 0.0 };
}

// Initial Sample Data
const INITIAL_CLASSES: ClassItem[] = [
  { id: 'c-6', nameEn: 'Class 6', nameBn: 'ষষ্ঠ শ্রেণি', gradeNumeric: 6 },
  { id: 'c-7', nameEn: 'Class 7', nameBn: 'সপ্তম শ্রেণি', gradeNumeric: 7 },
  { id: 'c-8', nameEn: 'Class 8', nameBn: 'অষ্টম শ্রেণি', gradeNumeric: 8 },
  { id: 'c-9', nameEn: 'Class 9', nameBn: 'নবম শ্রেণি', gradeNumeric: 9 },
  { id: 'c-10', nameEn: 'Class 10', nameBn: 'দশম শ্রেণি', gradeNumeric: 10 },
];

const INITIAL_SECTIONS: SectionItem[] = [
  { id: 's-8a', classId: 'c-8', name: 'Section A (Padma)', capacity: 50, roomNumber: 'Room 201', classTeacherName: 'Md. Rafiqul Islam' },
  { id: 's-8b', classId: 'c-8', name: 'Section B (Meghna)', capacity: 50, roomNumber: 'Room 202', classTeacherName: 'Farhana Yeasmin' },
  { id: 's-9a', classId: 'c-9', name: 'Section A (Science)', capacity: 45, roomNumber: 'Room 301', classTeacherName: 'Kamal Hossain' },
  { id: 's-10a', classId: 'c-10', name: 'Section A', capacity: 45, roomNumber: 'Room 302', classTeacherName: 'Nazmun Nahar' },
];

const INITIAL_SUBJECTS: SubjectItem[] = [
  { id: 'sub-ban', classId: 'c-8', nameEn: 'Bangla', nameBn: 'বাংলা', code: 'BAN-101', maxMarks: 100, passMarks: 33, type: 'compulsory' },
  { id: 'sub-eng', classId: 'c-8', nameEn: 'English', nameBn: 'ইংরেজি', code: 'ENG-102', maxMarks: 100, passMarks: 33, type: 'compulsory' },
  { id: 'sub-math', classId: 'c-8', nameEn: 'Mathematics', nameBn: 'গণিত', code: 'MATH-103', maxMarks: 100, passMarks: 33, type: 'compulsory' },
  { id: 'sub-sci', classId: 'c-8', nameEn: 'General Science', nameBn: 'সাধারণ বিজ্ঞান', code: 'SCI-104', maxMarks: 100, passMarks: 33, type: 'compulsory' },
  { id: 'sub-bgs', classId: 'c-8', nameEn: 'Bangladesh & Global Studies', nameBn: 'বাংলাদেশ ও বিশ্বপরিচয়', code: 'BGS-105', maxMarks: 100, passMarks: 33, type: 'compulsory' },
  { id: 'sub-ict', classId: 'c-8', nameEn: 'ICT', nameBn: 'তথ্য ও যোগাযোগ প্রযুক্তি', code: 'ICT-106', maxMarks: 50, passMarks: 17, type: 'compulsory' },
];

const INITIAL_AUTH_ACCOUNTS: AuthAccount[] = [
  {
    id: 'acc-admin',
    loginId: 'admin',
    email: 'admin@hpscctg.edu.bd',
    passwordHash: 'admin@hpsc2026',
    role: 'super_admin',
    nameEn: 'Engr. M. A. Haque (Chairman & Super Admin)',
    nameBn: 'প্রকৌ. এম. এ. হক (মালিক ও প্রধান নিয়ন্ত্রক)',
    status: 'active',
    isApproved: true,
    createdAt: '2026-01-01',
  },
  {
    id: 'acc-tc-1',
    loginId: 'EMP-001',
    email: 'rafiqul@hpscctg.edu.bd',
    passwordHash: 'teacher@123',
    role: 'teacher',
    nameEn: 'Md. Rafiqul Islam (Senior Teacher & Editor)',
    nameBn: 'মো. রফিকুল ইসলাম (সিনিয়র শিক্ষক ও এডিটর)',
    status: 'active',
    isApproved: true,
    createdAt: '2026-01-01',
  },
  {
    id: 'acc-tc-2',
    loginId: 'EMP-002',
    email: 'farhana@hpscctg.edu.bd',
    passwordHash: 'teacher@123',
    role: 'teacher',
    nameEn: 'Farhana Yeasmin (English Teacher & Editor)',
    nameBn: 'ফারহানা ইয়াসমিন (শিক্ষক ও এডিটর)',
    status: 'active',
    isApproved: true,
    createdAt: '2026-01-01',
  },
  {
    id: 'acc-tc-3',
    loginId: 'EMP-006',
    email: 'selim@hpscctg.edu.bd',
    passwordHash: 'teacher@123',
    role: 'teacher',
    nameEn: 'Selim Reza (Assistant Teacher - Physics)',
    nameBn: 'সেলিম রেজা (সহকারী শিক্ষক)',
    status: 'pending_approval',
    isApproved: false,
    createdAt: '2026-10-28',
  },
  {
    id: 'acc-st-1',
    loginId: 'HPSC-2026-0801',
    email: 'tanvir@hpscctg.edu.bd',
    passwordHash: 'student@123',
    role: 'student',
    nameEn: 'Tanvir Hasan (Student)',
    nameBn: 'তানভীর হাসান (শিক্ষার্থী)',
    status: 'active',
    isApproved: true,
    createdAt: '2026-01-01',
  },
  {
    id: 'acc-st-2',
    loginId: 'HPSC-2026-0802',
    email: 'nusrat@hpscctg.edu.bd',
    passwordHash: 'student@123',
    role: 'student',
    nameEn: 'Nusrat Jahan (Student)',
    nameBn: 'নুসরাত জাহান (শিক্ষার্থী)',
    status: 'active',
    isApproved: true,
    createdAt: '2026-01-01',
  },
  {
    id: 'acc-st-3',
    loginId: 'HPSC-2026-0805',
    email: 'zubair@hpscctg.edu.bd',
    passwordHash: 'student@123',
    role: 'student',
    nameEn: 'Zubair Ahmed (New Enrolled Student)',
    nameBn: 'জুবায়ের আহমেদ (নতুন শিক্ষার্থী)',
    status: 'pending_approval',
    isApproved: false,
    createdAt: '2026-10-29',
  }
];

const INITIAL_COURSE_MATERIALS: CourseMaterial[] = [
  {
    id: 'mat-1',
    title: 'Algebraic Formulas & Expansion - Chapter 4 Lecture Notes',
    topicName: 'বীজগাণিতিক সূত্রাবলি ও প্রয়োগ',
    subjectCode: 'MATH-103',
    subjectName: 'General Mathematics',
    className: 'Class 8',
    uploadedBy: 'Md. Rafiqul Islam (Senior Teacher)',
    teacherId: 'EMP-001',
    description: 'Complete handwritten formula sheet, solved board standard problems, and homework practice questions for upcoming exams.',
    fileName: 'Math_Class8_Chapter4_Formulas.pdf',
    fileSize: '2.4 MB',
    fileType: 'pdf',
    createdAt: '2026-10-22',
  },
  {
    id: 'mat-2',
    title: 'Atomic Structure & Periodic Table Fundamental Concepts',
    topicName: 'পরমাণুর গঠন ও পর্যায় সারণি',
    subjectCode: 'SCI-104',
    subjectName: 'General Science',
    className: 'Class 8',
    uploadedBy: 'Kamal Hossain (Lecturer)',
    teacherId: 'EMP-003',
    description: 'Comprehensive lecture slides detailing electron configuration, isotopes, and Rutherford/Bohr atomic models.',
    fileName: 'Science_Atomic_Structure_Handout.pdf',
    fileSize: '3.8 MB',
    fileType: 'pdf',
    createdAt: '2026-10-20',
  },
  {
    id: 'mat-3',
    title: 'English First Paper - Seen Comprehension & Paragraph Writing Format',
    topicName: 'Unit 5: Lesson 3 Comprehension',
    subjectCode: 'ENG-102',
    subjectName: 'English First Paper',
    className: 'Class 8',
    uploadedBy: 'Farhana Yeasmin (Senior Teacher)',
    teacherId: 'EMP-002',
    description: 'Sample dialogue writing, formal letter formats, and model questions prepared for the second term evaluation.',
    fileName: 'English_Seen_Passage_Model_Questions.pdf',
    fileSize: '1.5 MB',
    fileType: 'pdf',
    createdAt: '2026-10-18',
  },
  {
    id: 'mat-4',
    title: 'ICT Chapter 3: Cyber Security, Malware & Ethics in Technology',
    topicName: 'সাইবার নিরাপত্তা ও কম্পিউটার এথিক্স',
    subjectCode: 'ICT-106',
    subjectName: 'Information & Communication Tech',
    className: 'Class 8',
    uploadedBy: 'Md. Rafiqul Islam (Senior Teacher)',
    teacherId: 'EMP-001',
    description: 'Practical lab manual for Antivirus configuration, safe internet browsing guidelines, and digital law summary.',
    fileName: 'ICT_Cyber_Security_Lab_Guide.pdf',
    fileSize: '4.1 MB',
    fileType: 'pdf',
    createdAt: '2026-10-15',
  }
];

const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    titleEn: 'Main Campus Entrance Gate & Boundary Signboard',
    titleBn: 'স্কুল ক্যাম্পাস ও প্রধান প্রবেশ তোরণ',
    category: 'Campus',
    image: '/assets/campus-main.jpg',
    caption: 'Official entrance of Halishahar Public School and College',
    uploadedBy: 'Administration',
    uploadedAt: '2026-10-25',
  },
  {
    id: 'gal-2',
    titleEn: 'Academic Building & Classrooms Architecture',
    titleBn: 'একাডেমিক ভবন ও শ্রেণিকক্ষ অবকাঠামো',
    category: 'Campus',
    image: '/assets/campus-banner.jpg',
    caption: 'Multistory academic block and spacious learning classrooms',
    uploadedBy: 'Administration',
    uploadedAt: '2026-10-24',
  },
  {
    id: 'gal-3',
    titleEn: 'Annual Sports Day & Physical Education Program',
    titleBn: 'বার্ষিক ক্রীড়া ও শরীরচর্চা প্রতিযোগিতা',
    category: 'Events',
    image: '/assets/campus-main.jpg',
    caption: 'Annual sprint competitions and athletics meet',
    uploadedBy: 'Sports Dept',
    uploadedAt: '2026-10-20',
  },
  {
    id: 'gal-4',
    titleEn: 'Secondary Science Fair & Practical Demonstrations',
    titleBn: 'বিজ্ঞান মেলা ও ব্যবহারিক প্রদর্শনী',
    category: 'Academic',
    image: '/assets/campus-banner.jpg',
    caption: 'Student science experiments and robotic models',
    uploadedBy: 'Science Club',
    uploadedAt: '2026-10-18',
  },
  {
    id: 'gal-5',
    titleEn: 'ICT Computer Lab & Multimedia Education',
    titleBn: 'আইসিটি কম্পিউটার ল্যাব ও ডিজিটাল শিক্ষা',
    category: 'Academic',
    image: '/assets/campus-main.jpg',
    caption: 'Computer workstation lab for digital skill development',
    uploadedBy: 'ICT Dept',
    uploadedAt: '2026-10-15',
  },
  {
    id: 'gal-6',
    titleEn: 'Guardian Assembly & Community Outreach Program',
    titleBn: 'অভিভাবক সমাবেশ ও সাংস্কৃতিক অনুষ্ঠান',
    category: 'Events',
    image: '/assets/campus-banner.jpg',
    caption: 'Parent-teacher conferences and academic consultation meet',
    uploadedBy: 'Academic Council',
    uploadedAt: '2026-10-12',
  },
];

const INITIAL_BRANDING_ASSETS: SchoolBrandingAssets = {
  logoUrl: SCHOOL_CONFIG.branding.logoUrl,
  campusMainUrl: SCHOOL_CONFIG.branding.campusMainUrl,
  campusBannerUrl: SCHOOL_CONFIG.branding.campusBannerUrl,
};

const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'st-01',
    studentId: 'HPSC-2026-0801',
    admissionNo: 'ADM-2022-014',
    nameEn: 'Tanvir Hasan',
    nameBn: 'তানভীর হাসান',
    gender: 'Male',
    dob: '2012-05-14',
    bloodGroup: 'B+',
    classId: 'c-8',
    className: 'Class 8',
    sectionId: 's-8a',
    sectionName: 'Section A (Padma)',
    rollNumber: 1,
    academicYear: '2026',
    fatherName: 'Md. Delwar Hossain',
    motherName: 'Nasrin Akter',
    primaryPhone: '01819234567',
    emergencyContact: '01712987654',
    address: 'Road-02, Block-B, Halishahar H/E, Chattogram',
    status: 'active',
    guardianName: 'Md. Delwar Hossain',
    guardianPhone: '01819234567',
  },
  {
    id: 'st-02',
    studentId: 'HPSC-2026-0802',
    admissionNo: 'ADM-2022-018',
    nameEn: 'Nusrat Jahan',
    nameBn: 'নুসরাত জাহান',
    gender: 'Female',
    dob: '2012-08-20',
    bloodGroup: 'O+',
    classId: 'c-8',
    className: 'Class 8',
    sectionId: 's-8a',
    sectionName: 'Section A (Padma)',
    rollNumber: 2,
    academicYear: '2026',
    fatherName: 'Shahidul Alam',
    motherName: 'Farida Begum',
    primaryPhone: '01828345678',
    emergencyContact: '01828345678',
    address: 'Lane-05, Block-L, Halishahar, Chattogram',
    status: 'active',
    guardianName: 'Shahidul Alam',
    guardianPhone: '01828345678',
  },
  {
    id: 'st-03',
    studentId: 'HPSC-2026-0803',
    admissionNo: 'ADM-2022-025',
    nameEn: 'Arif Hossain',
    nameBn: 'আরিফ হোসেন',
    gender: 'Male',
    dob: '2012-03-11',
    bloodGroup: 'A+',
    classId: 'c-8',
    className: 'Class 8',
    sectionId: 's-8a',
    sectionName: 'Section A (Padma)',
    rollNumber: 3,
    academicYear: '2026',
    fatherName: 'Nurul Islam',
    motherName: 'Rina Begum',
    primaryPhone: '01811456789',
    emergencyContact: '01811456789',
    address: 'Halishahar Housing Estate, Chattogram',
    status: 'active',
    guardianName: 'Nurul Islam',
    guardianPhone: '01811456789',
  },
  {
    id: 'st-04',
    studentId: 'HPSC-2026-0804',
    admissionNo: 'ADM-2022-031',
    nameEn: 'Sadia Sultana',
    nameBn: 'সাদিয়া সুলতানা',
    gender: 'Female',
    dob: '2012-11-05',
    bloodGroup: 'AB+',
    classId: 'c-8',
    className: 'Class 8',
    sectionId: 's-8a',
    sectionName: 'Section A (Padma)',
    rollNumber: 4,
    academicYear: '2026',
    fatherName: 'Kamal Uddin',
    motherName: 'Salma Khatun',
    primaryPhone: '01833567890',
    emergencyContact: '01833567890',
    address: 'B-Block Main Road, Halishahar, Chattogram',
    status: 'active',
    guardianName: 'Kamal Uddin',
    guardianPhone: '01833567890',
  },
  {
    id: 'st-05',
    studentId: 'HPSC-2026-0901',
    admissionNo: 'ADM-2021-009',
    nameEn: 'Mahmudur Rahman',
    nameBn: 'মাহমুদুর রহমান',
    gender: 'Male',
    dob: '2011-02-17',
    bloodGroup: 'B+',
    classId: 'c-9',
    className: 'Class 9',
    sectionId: 's-9a',
    sectionName: 'Section A (Science)',
    rollNumber: 1,
    academicYear: '2026',
    fatherName: 'Mizanur Rahman',
    motherName: 'Tahmina Akter',
    primaryPhone: '01844678901',
    emergencyContact: '01844678901',
    address: 'Sector-01, Halishahar, Chattogram',
    status: 'active',
    guardianName: 'Mizanur Rahman',
    guardianPhone: '01844678901',
  }
];

const INITIAL_STAFF: TeacherStaff[] = [
  {
    id: 'tc-01',
    employeeId: 'EMP-001',
    nameEn: 'Md. Rafiqul Islam',
    nameBn: 'মো. রফিকুল ইসলাম',
    designation: 'Assistant Headmaster & Senior Teacher (Math & Editor)',
    department: 'Science & Mathematics',
    qualification: 'M.Sc in Mathematics (CU), B.Ed',
    phone: '01819545654',
    email: 'rafiqul@hpscctg.edu.bd',
    joiningDate: '2008-03-01',
    status: 'active',
    assignedClasses: ['Class 8', 'Class 9', 'Class 10'],
    assignedSubjects: ['General Mathematics', 'Higher Mathematics'],
  },
  {
    id: 'tc-02',
    employeeId: 'EMP-002',
    nameEn: 'Farhana Yeasmin',
    nameBn: 'ফারহানা ইয়াসমিন',
    designation: 'Senior Teacher (English & Editor)',
    department: 'Humanities & Languages',
    qualification: 'M.A in English Literature (CU), B.Ed',
    phone: '01829730515',
    email: 'farhana@hpscctg.edu.bd',
    joiningDate: '2012-07-15',
    status: 'active',
    assignedClasses: ['Class 8', 'Class 9'],
    assignedSubjects: ['English First Paper', 'English Second Paper'],
  },
  {
    id: 'tc-03',
    employeeId: 'EMP-003',
    nameEn: 'Kamal Hossain',
    nameBn: 'কামাল হোসেন',
    designation: 'Lecturer in Physics',
    department: 'Science',
    qualification: 'M.Sc in Physics (CU)',
    phone: '01815123456',
    email: 'kamal@hpscctg.edu.bd',
    joiningDate: '2015-01-10',
    status: 'active',
    assignedClasses: ['Class 9', 'Class 10'],
    assignedSubjects: ['General Science', 'Physics'],
  },
  {
    id: 'tc-04',
    employeeId: 'EMP-004',
    nameEn: 'Nazmun Nahar',
    nameBn: 'নাজমুন নাহার',
    designation: 'Assistant Teacher (Bangla)',
    department: 'Languages',
    qualification: 'M.A in Bangla (CU)',
    phone: '01816789012',
    email: 'nazmun@hpscctg.edu.bd',
    joiningDate: '2018-09-01',
    status: 'active',
    assignedClasses: ['Class 7', 'Class 8'],
    assignedSubjects: ['Bangla First Paper', 'Bangla Second Paper'],
  },
  {
    id: 'tc-05',
    employeeId: 'EMP-005',
    nameEn: 'Abdul Karim',
    nameBn: 'আব্দুল করিম',
    designation: 'Head Accountant & Finance Officer',
    department: 'Administration & Accounts',
    qualification: 'M.Com in Accounting',
    phone: '01817890123',
    email: 'accounts@hpscctg.edu.bd',
    joiningDate: '2010-04-12',
    status: 'active',
  }
];

const INITIAL_NOTICES: NoticeItem[] = [
  {
    id: 'not-01',
    titleEn: 'Recruitment Notice for the Post of Principal',
    titleBn: 'প্রিন্সিপাল হিসেবে নিয়োগ বিজ্ঞপ্তি',
    contentEn: 'Applications are invited from qualified candidates for the post of Principal at Halishahar Public School and College. Interested candidates must submit their CV with attested certificates by November 15, 2026.',
    contentBn: 'হালিশহর পাবলিক স্কুল এন্ড কলেজে অভিজ্ঞ ও যোগ্যতাসম্পন্ন অধ্যক্ষ (প্রিন্সিপাল) নিয়োগের নিমিত্তে আগ্রহী প্রার্থীদের নিকট হতে দরখাস্ত আহ্বান করা যাচ্ছে। আগামী ১৫ নভেম্বর ২০২৬ তারিখের মধ্যে প্রয়োজনীয় কাগজপত্রসহ আবেদন জমা দেওয়ার নির্দেশ দেওয়া হলো।',
    category: 'admin',
    priority: 'urgent',
    isPublished: true,
    publishDate: '2026-10-25',
    attachmentName: 'Principal_Recruitment_Circular_2026.pdf',
  },
  {
    id: 'not-02',
    titleEn: 'Publication of Annual Examination Routine 2026',
    titleBn: 'বার্ষিক পরীক্ষার রুটিন প্রকাশ',
    contentEn: 'The Annual Examination 2026 for Class Six to Nine will commence from November 20, 2026. The detailed schedule and guidelines have been published on the school website and notice board.',
    contentBn: '২০২৬ শিক্ষাবর্ষের ৬ষ্ঠ থেকে ৯ম শ্রেণির বার্ষিক পরীক্ষার সময়সূচি (রুটিন) প্রকাশিত হয়েছে। আগামী ২০ নভেম্বর ২০২৬ তারিখ হতে পরীক্ষা শুরু হবে। বিস্তারিত রুটিন ওয়েবসাইট ও নোটিশ বোর্ডে পাওয়া যাবে।',
    category: 'exam',
    priority: 'important',
    isPublished: true,
    publishDate: '2026-10-20',
    attachmentName: 'Annual_Exam_Routine_2026.pdf',
  },
  {
    id: 'not-03',
    titleEn: 'Important Notice for All Students Regarding Uniform and Punctuality',
    titleBn: 'শিক্ষার্থীদের জন্য গুরুত্বপূর্ণ নোটিশ',
    contentEn: 'All students are strictly instructed to attend morning assembly in proper school uniform by 8:45 AM. Carrying mobile phones or electronic gadgets into the campus is strictly prohibited.',
    contentBn: 'সকল শিক্ষার্থীদের নির্ধারিত স্কুল পোশাকে সকাল ৮:৪৫ মিনিটের মধ্যে প্রাত্যহিক সমাবেশে উপস্থিত থাকার জন্য কঠোর নির্দেশ প্রদান করা হচ্ছে। ক্যাম্পাসে মোবাইল ফোন বহন সম্পূর্ণ নিষিদ্ধ।',
    category: 'academic',
    priority: 'normal',
    isPublished: true,
    publishDate: '2026-10-15',
  },
  {
    id: 'not-04',
    titleEn: 'Schedule for Guardian Assembly and Progress Report Sharing',
    titleBn: 'অভিভাবক সমাবেশের তারিখ',
    contentEn: 'A special Guardian Assembly will be held on Friday, November 06, 2026 at 10:00 AM in the school auditorium to discuss student academic progress and upcoming board guidelines.',
    contentBn: 'আগামী ০৬ নভেম্বর ২০২৬, রোজ শুক্রবার সকাল ১০:০০ ঘটিকায় বিদ্যালয় মিলনায়তনে এক অভিভাবক সমাবেশ অনুষ্ঠিত হবে। সকল অভিভাবকবৃন্দকে যথাসময়ে উপস্থিত হয়ে শিক্ষার্থীদের অগ্রগতি পর্যালোচনায় অংশগ্রহণের অনুরোধ করা যাচ্ছে।',
    category: 'academic',
    priority: 'important',
    isPublished: true,
    publishDate: '2026-10-10',
  }
];

const INITIAL_ROUTINE: RoutineItem[] = [
  { id: 'rt-1', className: 'Class 8', sectionName: 'Section A (Padma)', weekday: 'Saturday', periodNumber: 1, timeSlot: '09:00 AM - 09:45 AM', subjectName: 'Bangla First Paper', teacherName: 'Nazmun Nahar', roomNumber: 'Room 201' },
  { id: 'rt-2', className: 'Class 8', sectionName: 'Section A (Padma)', weekday: 'Saturday', periodNumber: 2, timeSlot: '09:45 AM - 10:30 AM', subjectName: 'English First Paper', teacherName: 'Farhana Yeasmin', roomNumber: 'Room 201' },
  { id: 'rt-3', className: 'Class 8', sectionName: 'Section A (Padma)', weekday: 'Saturday', periodNumber: 3, timeSlot: '10:30 AM - 11:15 AM', subjectName: 'General Mathematics', teacherName: 'Md. Rafiqul Islam', roomNumber: 'Room 201' },
  { id: 'rt-4', className: 'Class 8', sectionName: 'Section A (Padma)', weekday: 'Saturday', periodNumber: 4, timeSlot: '11:30 AM - 12:15 PM', subjectName: 'General Science', teacherName: 'Kamal Hossain', roomNumber: 'Room 201' },
  { id: 'rt-5', className: 'Class 8', sectionName: 'Section A (Padma)', weekday: 'Sunday', periodNumber: 1, timeSlot: '09:00 AM - 09:45 AM', subjectName: 'Mathematics', teacherName: 'Md. Rafiqul Islam', roomNumber: 'Room 201' },
  { id: 'rt-6', className: 'Class 8', sectionName: 'Section A (Padma)', weekday: 'Sunday', periodNumber: 2, timeSlot: '09:45 AM - 10:30 AM', subjectName: 'ICT', teacherName: 'Md. Rafiqul Islam', roomNumber: 'Computer Lab' },
];

const INITIAL_RESULTS: StudentResultReport[] = [
  {
    studentId: 'HPSC-2026-0801',
    studentName: 'Tanvir Hasan',
    studentNameBn: 'তানভীর হাসান',
    rollNumber: 1,
    className: 'Class 8',
    sectionName: 'Section A (Padma)',
    examinationId: 'ex-half-2026',
    examinationName: 'Half-Yearly Examination 2026',
    academicYear: '2026',
    subjects: [
      { subjectId: 's1', subjectName: 'Bangla First Paper', subjectCode: 'BAN-101', maxMarks: 100, passMarks: 33, marksObtained: 85, gradeLetter: 'A+', gpaPoint: 5.0 },
      { subjectId: 's2', subjectName: 'English First Paper', subjectCode: 'ENG-102', maxMarks: 100, passMarks: 33, marksObtained: 82, gradeLetter: 'A+', gpaPoint: 5.0 },
      { subjectId: 's3', subjectName: 'General Mathematics', subjectCode: 'MATH-103', maxMarks: 100, passMarks: 33, marksObtained: 94, gradeLetter: 'A+', gpaPoint: 5.0 },
      { subjectId: 's4', subjectName: 'General Science', subjectCode: 'SCI-104', maxMarks: 100, passMarks: 33, marksObtained: 78, gradeLetter: 'A', gpaPoint: 4.0 },
      { subjectId: 's5', subjectName: 'Bangladesh & Global Studies', subjectCode: 'BGS-105', maxMarks: 100, passMarks: 33, marksObtained: 80, gradeLetter: 'A+', gpaPoint: 5.0 },
      { subjectId: 's6', subjectName: 'Information & Comm. Tech', subjectCode: 'ICT-106', maxMarks: 50, passMarks: 17, marksObtained: 46, gradeLetter: 'A+', gpaPoint: 5.0 },
    ],
    totalMarks: 465,
    totalMaxMarks: 550,
    averageMarks: 84.5,
    finalGrade: 'A+',
    finalGPA: 4.83,
    resultStatus: 'Passed',
    classRank: 1,
    remarks: 'Outstanding performance. Keep up the high standard.',
    isPublished: true,
  },
  {
    studentId: 'HPSC-2026-0802',
    studentName: 'Nusrat Jahan',
    studentNameBn: 'নুসরাত জাহান',
    rollNumber: 2,
    className: 'Class 8',
    sectionName: 'Section A (Padma)',
    examinationId: 'ex-half-2026',
    examinationName: 'Half-Yearly Examination 2026',
    academicYear: '2026',
    subjects: [
      { subjectId: 's1', subjectName: 'Bangla First Paper', subjectCode: 'BAN-101', maxMarks: 100, passMarks: 33, marksObtained: 88, gradeLetter: 'A+', gpaPoint: 5.0 },
      { subjectId: 's2', subjectName: 'English First Paper', subjectCode: 'ENG-102', maxMarks: 100, passMarks: 33, marksObtained: 86, gradeLetter: 'A+', gpaPoint: 5.0 },
      { subjectId: 's3', subjectName: 'General Mathematics', subjectCode: 'MATH-103', maxMarks: 100, passMarks: 33, marksObtained: 84, gradeLetter: 'A+', gpaPoint: 5.0 },
      { subjectId: 's4', subjectName: 'General Science', subjectCode: 'SCI-104', maxMarks: 100, passMarks: 33, marksObtained: 81, gradeLetter: 'A+', gpaPoint: 5.0 },
      { subjectId: 's5', subjectName: 'Bangladesh & Global Studies', subjectCode: 'BGS-105', maxMarks: 100, passMarks: 33, marksObtained: 76, gradeLetter: 'A', gpaPoint: 4.0 },
      { subjectId: 's6', subjectName: 'Information & Comm. Tech', subjectCode: 'ICT-106', maxMarks: 50, passMarks: 17, marksObtained: 45, gradeLetter: 'A+', gpaPoint: 5.0 },
    ],
    totalMarks: 460,
    totalMaxMarks: 550,
    averageMarks: 83.6,
    finalGrade: 'A+',
    finalGPA: 4.83,
    resultStatus: 'Passed',
    classRank: 2,
    remarks: 'Excellent discipline and academic result.',
    isPublished: true,
  }
];

const INITIAL_INVOICES: FeeInvoice[] = [
  { id: 'inv-01', invoiceNumber: 'INV-2026-1001', studentId: 'HPSC-2026-0801', studentName: 'Tanvir Hasan', className: 'Class 8', feeCategoryName: 'Monthly Tuition Fee (October)', amount: 1500, discount: 0, netAmount: 1500, paidAmount: 1500, dueDate: '2026-10-25', status: 'paid', createdAt: '2026-10-01' },
  { id: 'inv-02', invoiceNumber: 'INV-2026-1002', studentId: 'HPSC-2026-0802', studentName: 'Nusrat Jahan', className: 'Class 8', feeCategoryName: 'Monthly Tuition Fee (October)', amount: 1500, discount: 0, netAmount: 1500, paidAmount: 1500, dueDate: '2026-10-25', status: 'paid', createdAt: '2026-10-01' },
  { id: 'inv-03', invoiceNumber: 'INV-2026-1003', studentId: 'HPSC-2026-0803', studentName: 'Arif Hossain', className: 'Class 8', feeCategoryName: 'Monthly Tuition Fee (October)', amount: 1500, discount: 0, netAmount: 1500, paidAmount: 0, dueDate: '2026-10-25', status: 'unpaid', createdAt: '2026-10-01' },
  { id: 'inv-04', invoiceNumber: 'INV-2026-1004', studentId: 'HPSC-2026-0804', studentName: 'Sadia Sultana', className: 'Class 8', feeCategoryName: 'Annual Exam Fee 2026', amount: 800, discount: 0, netAmount: 800, paidAmount: 800, dueDate: '2026-11-10', status: 'paid', createdAt: '2026-10-15' },
];

const INITIAL_ADMISSIONS: AdmissionApplication[] = [
  {
    id: 'adm-01',
    applicationNo: 'ADM-2026-0042',
    applicantNameEn: 'Zubair Ahmed',
    applicantNameBn: 'জুবায়ের আহমেদ',
    dob: '2013-04-10',
    gender: 'Male',
    desiredClass: 'Class 6',
    guardianName: 'Belal Ahmed',
    guardianPhone: '01817654321',
    guardianEmail: 'belal.ahmed@gmail.com',
    address: 'Block-A, Halishahar H/E, Chattogram',
    previousSchool: 'Halishahar Model Primary School',
    status: 'under_review',
    submittedAt: '2026-10-24 14:22',
  },
  {
    id: 'adm-02',
    applicationNo: 'ADM-2026-0043',
    applicantNameEn: 'Tasfia Rahman',
    applicantNameBn: 'তাসফিয়া রহমান',
    dob: '2012-09-18',
    gender: 'Female',
    desiredClass: 'Class 7',
    guardianName: 'Mustafizur Rahman',
    guardianPhone: '01823987654',
    guardianEmail: 'mustafiz.rahman@yahoo.com',
    address: 'Halishahar Main Road, Ward 26, Chattogram',
    previousSchool: 'Chattogram City School',
    status: 'new',
    submittedAt: '2026-10-26 11:05',
  },
  {
    id: 'adm-03',
    applicationNo: 'ADM-2026-0038',
    applicantNameEn: 'Shakib Al Hasan',
    applicantNameBn: 'সাকিব আল হাসান',
    dob: '2011-12-01',
    gender: 'Male',
    desiredClass: 'Class 8',
    guardianName: 'Fazlur Rahman',
    guardianPhone: '01819876543',
    address: 'South Halishahar, Chattogram',
    previousSchool: 'Al-Nur Academy',
    status: 'accepted',
    submittedAt: '2026-10-18 09:30',
    reviewNotes: 'Verified all academic records and primary graduation certificate. Eligible for admission.',
  }
];

const INITIAL_LIBRARY_BOOKS: LibraryBook[] = [
  { id: 'bk-1', accessionNo: 'LIB-00142', isbn: '978-984-01-2345-6', title: 'NCTB Secondary Mathematics Guide & Concepts', author: 'Dr. M. A. Jabbar', category: 'Mathematics', totalCopies: 15, availableCopies: 12, shelfLocation: 'Shelf A-3' },
  { id: 'bk-2', accessionNo: 'LIB-00188', isbn: '978-984-02-6789-1', title: 'English Grammar in Use & Composition', author: 'Raymond Murphy & K. Ali', category: 'English', totalCopies: 20, availableCopies: 17, shelfLocation: 'Shelf B-1' },
  { id: 'bk-3', accessionNo: 'LIB-00205', isbn: '978-984-03-4567-8', title: 'Bangla Sahityer Itihas (History of Bengali Literature)', author: 'Dr. Sukumar Sen', category: 'Literature', totalCopies: 8, availableCopies: 5, shelfLocation: 'Shelf C-2' },
  { id: 'bk-4', accessionNo: 'LIB-00234', isbn: '978-984-04-1234-9', title: 'Fundamentals of Computer Programming & ICT', author: 'M. Kaykobad', category: 'ICT', totalCopies: 12, availableCopies: 9, shelfLocation: 'Shelf D-4' },
];

interface SchoolStoreType {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  login: (portalType: 'super_admin' | 'teacher' | 'student', loginId: string, password: string) => { success: boolean; message: string };
  logout: () => void;

  // Data entities
  classes: ClassItem[];
  sections: SectionItem[];
  subjects: SubjectItem[];
  students: StudentRecord[];
  staff: TeacherStaff[];
  notices: NoticeItem[];
  routine: RoutineItem[];
  results: StudentResultReport[];
  invoices: FeeInvoice[];
  admissions: AdmissionApplication[];
  libraryBooks: LibraryBook[];
  auditLogs: AuditLogItem[];
  authAccounts: AuthAccount[];
  courseMaterials: CourseMaterial[];

  // Operations
  addStudent: (student: Omit<StudentRecord, 'id'>) => void;
  updateStudent: (id: string, data: Partial<StudentRecord>) => void;
  deleteStudent: (id: string) => void;

  addTeacher: (teacher: Omit<TeacherStaff, 'id'>) => void;
  updateTeacher: (id: string, data: Partial<TeacherStaff>) => void;

  submitAdmission: (application: Omit<AdmissionApplication, 'id' | 'applicationNo' | 'status' | 'submittedAt'>) => string;
  updateAdmissionStatus: (id: string, status: AdmissionApplication['status'], notes?: string) => void;
  admitStudentFromApplication: (applicationId: string, classId: string, sectionId: string, roll: number) => void;

  addNotice: (notice: Omit<NoticeItem, 'id'>) => void;
  updateNotice: (id: string, data: Partial<NoticeItem>) => void;
  deleteNotice: (id: string) => void;

  recordPayment: (invoiceId: string, amount: number, method: FeePayment['paymentMethod'], ref?: string) => void;
  createInvoice: (invoice: Omit<FeeInvoice, 'id' | 'invoiceNumber' | 'paidAmount' | 'status' | 'createdAt'>) => void;

  saveMarksAndProcessResult: (studentId: string, examName: string, marks: { subjectName: string; subjectCode: string; maxMarks: number; obtained: number }[]) => void;

  // Super Admin Account Approvals & Access Controls
  approveAccount: (accountId: string) => void;
  toggleAccountStatus: (accountId: string, status: 'active' | 'suspended') => void;
  createAccount: (data: Omit<AuthAccount, 'id' | 'createdAt'>) => void;

  // Teacher / Editor Course Materials Operations
  addCourseMaterial: (material: Omit<CourseMaterial, 'id' | 'createdAt'>) => void;
  updateCourseMaterial: (id: string, data: Partial<CourseMaterial>) => void;
  deleteCourseMaterial: (id: string) => void;

  // Media, Photos & File Assets (Device Uploads)
  galleryPhotos: GalleryPhoto[];
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  updateGalleryPhoto: (id: string, data: Partial<GalleryPhoto>) => void;
  deleteGalleryPhoto: (id: string) => void;

  brandingAssets: SchoolBrandingAssets;
  updateBrandingAsset: (key: keyof SchoolBrandingAssets, value: string) => void;
}

const SchoolStoreContext = createContext<SchoolStoreType | undefined>(undefined);

export const SchoolStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current active user
  const [currentUser, setCurrentUser] = useState<UserProfile>({
    id: 'usr-admin',
    email: 'admin@hpscctg.edu.bd',
    nameEn: 'Engr. M. A. Haque (Chairman & Super Admin)',
    nameBn: 'প্রকৌ. এম. এ. হক (মালিক ও প্রধান নিয়ন্ত্রক)',
    role: 'super_admin',
    phone: '01819545654',
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default true for immediate smooth exploration

  const [classes, setClasses] = useState<ClassItem[]>(INITIAL_CLASSES);
  const [sections, setSections] = useState<SectionItem[]>(INITIAL_SECTIONS);
  const [subjects, setSubjects] = useState<SubjectItem[]>(INITIAL_SUBJECTS);
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [staff, setStaff] = useState<TeacherStaff[]>(INITIAL_STAFF);
  const [notices, setNotices] = useState<NoticeItem[]>(INITIAL_NOTICES);
  const [routine, setRoutine] = useState<RoutineItem[]>(INITIAL_ROUTINE);
  const [results, setResults] = useState<StudentResultReport[]>(INITIAL_RESULTS);
  const [invoices, setInvoices] = useState<FeeInvoice[]>(INITIAL_INVOICES);
  const [admissions, setAdmissions] = useState<AdmissionApplication[]>(INITIAL_ADMISSIONS);
  const [libraryBooks, setLibraryBooks] = useState<LibraryBook[]>(INITIAL_LIBRARY_BOOKS);
  const [authAccounts, setAuthAccounts] = useState<AuthAccount[]>(INITIAL_AUTH_ACCOUNTS);
  const [courseMaterials, setCourseMaterials] = useState<CourseMaterial[]>(INITIAL_COURSE_MATERIALS);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(INITIAL_GALLERY_PHOTOS);
  const [brandingAssets, setBrandingAssets] = useState<SchoolBrandingAssets>(INITIAL_BRANDING_ASSETS);

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([
    {
      id: 'log-1',
      action: 'SYSTEM_INITIALIZATION',
      userName: 'Super Admin',
      userRole: 'super_admin',
      details: 'System started with official Halishahar Public School and College baseline configuration.',
      timestamp: '2026-10-29 10:10:14 AM',
    }
  ]);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const savedStudents = localStorage.getItem('hpsc_students');
      if (savedStudents) setStudents(JSON.parse(savedStudents));

      const savedAdmissions = localStorage.getItem('hpsc_admissions');
      if (savedAdmissions) setAdmissions(JSON.parse(savedAdmissions));

      const savedNotices = localStorage.getItem('hpsc_notices');
      if (savedNotices) setNotices(JSON.parse(savedNotices));

      const savedInvoices = localStorage.getItem('hpsc_invoices');
      if (savedInvoices) setInvoices(JSON.parse(savedInvoices));

      const savedAccounts = localStorage.getItem('hpsc_auth_accounts');
      if (savedAccounts) setAuthAccounts(JSON.parse(savedAccounts));

      const savedMaterials = localStorage.getItem('hpsc_course_materials');
      if (savedMaterials) setCourseMaterials(JSON.parse(savedMaterials));

      const savedGallery = localStorage.getItem('hpsc_gallery_photos');
      if (savedGallery) setGalleryPhotos(JSON.parse(savedGallery));

      const savedBranding = localStorage.getItem('hpsc_branding_assets');
      if (savedBranding) setBrandingAssets(JSON.parse(savedBranding));

      const savedUser = localStorage.getItem('hpsc_current_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedAuth = localStorage.getItem('hpsc_is_auth');
      if (savedAuth !== null) setIsAuthenticated(savedAuth === 'true');
    } catch {
      // LocalStorage error fallback
    }
  }, []);

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      action,
      userName: currentUser.nameEn,
      userRole: currentUser.role,
      details,
      timestamp: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }),
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Authentication: Role-specific login
  const login = (
    portalType: 'super_admin' | 'teacher' | 'student',
    loginId: string,
    password: string
  ): { success: boolean; message: string } => {
    const cleanId = loginId.trim().toLowerCase();
    const cleanPass = password.trim();

    // Find account
    const account = authAccounts.find(
      acc => (acc.loginId.toLowerCase() === cleanId || acc.email.toLowerCase() === cleanId) &&
             acc.passwordHash === cleanPass
    );

    if (!account) {
      return { success: false, message: 'Invalid Login ID or Password. Please check your credentials.' };
    }

    // Role check against portal
    if (portalType === 'super_admin' && account.role !== 'super_admin' && account.role !== 'school_admin' && account.role !== 'principal') {
      return { success: false, message: 'Access denied: You do not hold Super Admin / Owner privileges for this portal.' };
    }

    if (portalType === 'teacher' && account.role !== 'teacher' && account.role !== 'super_admin') {
      return { success: false, message: 'Access denied: This login ID is not registered as an authorized Teacher or Editor.' };
    }

    if (portalType === 'student' && account.role !== 'student' && account.role !== 'super_admin') {
      return { success: false, message: 'Access denied: Please use the Student Portal with a valid Student ID.' };
    }

    // Status & Approval Check
    if (!account.isApproved || account.status === 'pending_approval') {
      return { 
        success: false, 
        message: 'Your account is currently PENDING approval from the Super Admin. Please contact school administration.' 
      };
    }

    if (account.status === 'suspended') {
      return { 
        success: false, 
        message: 'Your account has been SUSPENDED by the Super Admin. Please contact school administration.' 
      };
    }

    // Authenticate
    const userProfile: UserProfile = {
      id: account.id,
      email: account.email,
      nameEn: account.nameEn,
      nameBn: account.nameBn,
      role: account.role,
      studentId: account.role === 'student' ? account.loginId : undefined,
      employeeId: account.role === 'teacher' ? account.loginId : undefined,
    };

    setCurrentUser(userProfile);
    setIsAuthenticated(true);
    localStorage.setItem('hpsc_current_user', JSON.stringify(userProfile));
    localStorage.setItem('hpsc_is_auth', 'true');

    addAuditLog('USER_LOGIN', `User ${account.nameEn} (${account.loginId}) logged into ${portalType} portal.`);
    return { success: true, message: 'Login successful' };
  };

  const logout = () => {
    addAuditLog('USER_LOGOUT', `User ${currentUser.nameEn} logged out.`);
    setIsAuthenticated(false);
    localStorage.setItem('hpsc_is_auth', 'false');
  };

  const switchRole = (role: UserRole) => {
    let mockProfile: UserProfile = {
      id: `usr-${role}`,
      email: `${role}@hpscctg.edu.bd`,
      role,
      nameEn: '',
      nameBn: '',
    };

    switch (role) {
      case 'super_admin':
        mockProfile = { ...mockProfile, nameEn: 'Engr. M. A. Haque (Chairman & Super Admin)', nameBn: 'প্রকৌ. এম. এ. হক (মালিক ও প্রধান নিয়ন্ত্রক)', role: 'super_admin' };
        break;
      case 'school_admin':
        mockProfile = { ...mockProfile, nameEn: 'Admin Officer', nameBn: 'বিদ্যালয় প্রশাসক', role: 'school_admin' };
        break;
      case 'principal':
        mockProfile = { ...mockProfile, nameEn: 'Principal (Head of Institution)', nameBn: 'অধ্যক্ষ মহোদয়', role: 'principal' };
        break;
      case 'teacher':
        mockProfile = { ...mockProfile, nameEn: 'Md. Rafiqul Islam (Senior Teacher & Editor)', nameBn: 'মো. রফিকুল ইসলাম (সিনিয়র শিক্ষক ও এডিটর)', role: 'teacher', employeeId: 'EMP-001' };
        break;
      case 'accountant':
        mockProfile = { ...mockProfile, nameEn: 'Abdul Karim (Head Accountant)', nameBn: 'আব্দুল করিম (হিসাবরক্ষক)', role: 'accountant' };
        break;
      case 'admission_officer':
        mockProfile = { ...mockProfile, nameEn: 'Admission Desk Officer', nameBn: 'ভর্তি কর্মকর্তা', role: 'admission_officer' };
        break;
      case 'librarian':
        mockProfile = { ...mockProfile, nameEn: 'Librarian In-charge', nameBn: 'গ্রন্থাগারিক', role: 'librarian' };
        break;
      case 'student':
        mockProfile = { ...mockProfile, nameEn: 'Tanvir Hasan (Student)', nameBn: 'তানভীর হাসান (শিক্ষার্থী)', role: 'student', studentId: 'HPSC-2026-0801' };
        break;
      case 'guardian':
        mockProfile = { ...mockProfile, nameEn: 'Md. Delwar Hossain (Guardian)', nameBn: 'মো. দেলোয়ার হোসেন (অভিভাবক)', role: 'guardian', linkedStudentIds: ['HPSC-2026-0801'] };
        break;
    }

    setCurrentUser(mockProfile);
    setIsAuthenticated(true);
    localStorage.setItem('hpsc_current_user', JSON.stringify(mockProfile));
    localStorage.setItem('hpsc_is_auth', 'true');
    addAuditLog('ROLE_SWITCH', `Switched active portal role to ${role}`);
  };

  // Super Admin: Account Approvals & User Control
  const approveAccount = (accountId: string) => {
    const updated = authAccounts.map(a => 
      a.id === accountId ? { ...a, isApproved: true, status: 'active' as const } : a
    );
    setAuthAccounts(updated);
    localStorage.setItem('hpsc_auth_accounts', JSON.stringify(updated));
    const target = authAccounts.find(a => a.id === accountId);
    addAuditLog('ACCOUNT_APPROVED', `Super Admin approved access for: ${target?.nameEn} (${target?.loginId})`);
  };

  const toggleAccountStatus = (accountId: string, status: 'active' | 'suspended') => {
    const updated = authAccounts.map(a => 
      a.id === accountId ? { ...a, status } : a
    );
    setAuthAccounts(updated);
    localStorage.setItem('hpsc_auth_accounts', JSON.stringify(updated));
    const target = authAccounts.find(a => a.id === accountId);
    addAuditLog('ACCOUNT_STATUS_CHANGE', `Super Admin changed status of ${target?.loginId} to ${status}`);
  };

  const createAccount = (data: Omit<AuthAccount, 'id' | 'createdAt'>) => {
    const newAcc: AuthAccount = {
      ...data,
      id: `acc-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newAcc, ...authAccounts];
    setAuthAccounts(updated);
    localStorage.setItem('hpsc_auth_accounts', JSON.stringify(updated));
    addAuditLog('ACCOUNT_CREATED', `Super Admin created new user account: ${newAcc.nameEn} (${newAcc.loginId}) as ${newAcc.role}`);
  };

  // Teacher / Editor: Course Materials & Topic Upload
  const addCourseMaterial = (material: Omit<CourseMaterial, 'id' | 'createdAt'>) => {
    const newMat: CourseMaterial = {
      ...material,
      id: `mat-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newMat, ...courseMaterials];
    setCourseMaterials(updated);
    localStorage.setItem('hpsc_course_materials', JSON.stringify(updated));
    addAuditLog('MATERIAL_UPLOAD', `Teacher ${newMat.uploadedBy} uploaded topic: ${newMat.title} for ${newMat.className}`);
  };

  const updateCourseMaterial = (id: string, data: Partial<CourseMaterial>) => {
    const updated = courseMaterials.map(m => m.id === id ? { ...m, ...data } : m);
    setCourseMaterials(updated);
    localStorage.setItem('hpsc_course_materials', JSON.stringify(updated));
    addAuditLog('MATERIAL_EDIT', `Teacher edited course topic ID: ${id}`);
  };

  const deleteCourseMaterial = (id: string) => {
    const updated = courseMaterials.filter(m => m.id !== id);
    setCourseMaterials(updated);
    localStorage.setItem('hpsc_course_materials', JSON.stringify(updated));
    addAuditLog('MATERIAL_DELETE', `Deleted course material ID: ${id}`);
  };

  // Student Operations
  const addStudent = (studentData: Omit<StudentRecord, 'id'>) => {
    const newStudent: StudentRecord = {
      ...studentData,
      id: `st-${Date.now()}`,
    };
    const updated = [newStudent, ...students];
    setStudents(updated);
    localStorage.setItem('hpsc_students', JSON.stringify(updated));

    // Also auto-create a student auth account
    createAccount({
      loginId: newStudent.studentId,
      email: `${newStudent.studentId.toLowerCase()}@hpscctg.edu.bd`,
      passwordHash: 'student@123',
      role: 'student',
      nameEn: newStudent.nameEn,
      nameBn: newStudent.nameBn,
      status: 'active',
      isApproved: true,
    });

    addAuditLog('STUDENT_CREATE', `Enrolled student: ${newStudent.nameEn} (${newStudent.studentId})`);
  };

  const updateStudent = (id: string, data: Partial<StudentRecord>) => {
    const updated = students.map(s => s.id === id ? { ...s, ...data } : s);
    setStudents(updated);
    localStorage.setItem('hpsc_students', JSON.stringify(updated));
    addAuditLog('STUDENT_UPDATE', `Updated student profile: ID ${id}`);
  };

  const deleteStudent = (id: string) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    localStorage.setItem('hpsc_students', JSON.stringify(updated));
    addAuditLog('STUDENT_DELETE', `Archived student record: ID ${id}`);
  };

  // Teacher Operations
  const addTeacher = (teacherData: Omit<TeacherStaff, 'id'>) => {
    const newStaff: TeacherStaff = {
      ...teacherData,
      id: `tc-${Date.now()}`,
    };
    setStaff(prev => [newStaff, ...prev]);

    // Also create teacher auth account
    createAccount({
      loginId: newStaff.employeeId,
      email: newStaff.email,
      passwordHash: 'teacher@123',
      role: 'teacher',
      nameEn: `${newStaff.nameEn} (Teacher & Editor)`,
      nameBn: `${newStaff.nameBn} (শিক্ষক ও এডিটর)`,
      status: 'active',
      isApproved: true,
    });

    addAuditLog('TEACHER_CREATE', `Added staff member: ${newStaff.nameEn} (${newStaff.employeeId})`);
  };

  const updateTeacher = (id: string, data: Partial<TeacherStaff>) => {
    setStaff(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
    addAuditLog('TEACHER_UPDATE', `Updated staff record: ID ${id}`);
  };

  // Admission Operations
  const submitAdmission = (appData: Omit<AdmissionApplication, 'id' | 'applicationNo' | 'status' | 'submittedAt'>): string => {
    const appNo = `ADM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newApp: AdmissionApplication = {
      ...appData,
      id: `adm-${Date.now()}`,
      applicationNo: appNo,
      status: 'new',
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    const updated = [newApp, ...admissions];
    setAdmissions(updated);
    localStorage.setItem('hpsc_admissions', JSON.stringify(updated));
    addAuditLog('ADMISSION_APPLY', `New admission submitted for ${newApp.applicantNameEn}, App No: ${appNo}`);
    return appNo;
  };

  const updateAdmissionStatus = (id: string, status: AdmissionApplication['status'], notes?: string) => {
    const updated = admissions.map(a => a.id === id ? { ...a, status, reviewNotes: notes || a.reviewNotes } : a);
    setAdmissions(updated);
    localStorage.setItem('hpsc_admissions', JSON.stringify(updated));
    addAuditLog('ADMISSION_STATUS_CHANGE', `Updated application ${id} to ${status}`);
  };

  const admitStudentFromApplication = (applicationId: string, classId: string, sectionId: string, roll: number) => {
    const app = admissions.find(a => a.id === applicationId);
    if (!app) return;

    const targetClass = classes.find(c => c.id === classId) || classes[0];
    const targetSection = sections.find(s => s.id === sectionId) || sections[0];
    const newStudentId = `HPSC-2026-${targetClass.gradeNumeric.toString().padStart(2, '0')}${roll.toString().padStart(2, '0')}`;

    addStudent({
      studentId: newStudentId,
      admissionNo: app.applicationNo,
      nameEn: app.applicantNameEn,
      nameBn: app.applicantNameBn,
      gender: app.gender,
      dob: app.dob,
      bloodGroup: 'B+',
      classId: targetClass.id,
      className: targetClass.nameEn,
      sectionId: targetSection.id,
      sectionName: targetSection.name,
      rollNumber: roll,
      academicYear: '2026',
      fatherName: app.guardianName,
      motherName: 'Mother of ' + app.applicantNameEn,
      primaryPhone: app.guardianPhone,
      emergencyContact: app.guardianPhone,
      address: app.address,
      previousSchool: app.previousSchool,
      status: 'active',
      guardianName: app.guardianName,
      guardianPhone: app.guardianPhone,
    });

    updateAdmissionStatus(applicationId, 'admitted', 'Successfully enrolled into student registry.');
  };

  // Notice Operations
  const addNotice = (noticeData: Omit<NoticeItem, 'id'>) => {
    const newNotice: NoticeItem = {
      ...noticeData,
      id: `not-${Date.now()}`,
    };
    const updated = [newNotice, ...notices];
    setNotices(updated);
    localStorage.setItem('hpsc_notices', JSON.stringify(updated));
    addAuditLog('NOTICE_PUBLISH', `Published notice: ${newNotice.titleEn}`);
  };

  const updateNotice = (id: string, data: Partial<NoticeItem>) => {
    const updated = notices.map(n => n.id === id ? { ...n, ...data } : n);
    setNotices(updated);
    localStorage.setItem('hpsc_notices', JSON.stringify(updated));
  };

  const deleteNotice = (id: string) => {
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    localStorage.setItem('hpsc_notices', JSON.stringify(updated));
  };

  // Finance & Invoices
  const recordPayment = (invoiceId: string, amount: number, method: FeePayment['paymentMethod'], ref?: string) => {
    const inv = invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    const newPaid = inv.paidAmount + amount;
    const newStatus = newPaid >= inv.netAmount ? 'paid' : (newPaid > 0 ? 'partially_paid' : 'unpaid');

    const updated = invoices.map(i => i.id === invoiceId ? { ...i, paidAmount: newPaid, status: newStatus as FeeInvoice['status'] } : i);
    setInvoices(updated);
    localStorage.setItem('hpsc_invoices', JSON.stringify(updated));
    addAuditLog('PAYMENT_RECEIVE', `Received ৳${amount} for Invoice ${inv.invoiceNumber} via ${method}`);
  };

  const createInvoice = (invData: Omit<FeeInvoice, 'id' | 'invoiceNumber' | 'paidAmount' | 'status' | 'createdAt'>) => {
    const newInv: FeeInvoice = {
      ...invData,
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      paidAmount: 0,
      status: 'unpaid',
      createdAt: new Date().toISOString().split('T')[0],
    };
    const updated = [newInv, ...invoices];
    setInvoices(updated);
    localStorage.setItem('hpsc_invoices', JSON.stringify(updated));
    addAuditLog('INVOICE_CREATE', `Generated invoice ${newInv.invoiceNumber} for ${newInv.studentName}`);
  };

  // Marks & Result Processing
  const saveMarksAndProcessResult = (
    studentId: string,
    examName: string,
    rawMarks: { subjectName: string; subjectCode: string; maxMarks: number; obtained: number }[]
  ) => {
    const st = students.find(s => s.studentId === studentId);
    if (!st) return;

    const subjectsMarkCalculated = rawMarks.map(m => {
      const g = calculateGrade((m.obtained / m.maxMarks) * 100);
      return {
        subjectId: `sub-${m.subjectCode}`,
        subjectName: m.subjectName,
        subjectCode: m.subjectCode,
        maxMarks: m.maxMarks,
        passMarks: Math.round(m.maxMarks * 0.33),
        marksObtained: m.obtained,
        gradeLetter: g.grade,
        gpaPoint: g.gpa,
      };
    });

    const totalObtained = subjectsMarkCalculated.reduce((acc, curr) => acc + curr.marksObtained, 0);
    const totalMax = subjectsMarkCalculated.reduce((acc, curr) => acc + curr.maxMarks, 0);
    const avg = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;
    const finalG = calculateGrade(avg);
    const hasFailed = subjectsMarkCalculated.some(s => s.gradeLetter === 'F');

    const newResult: StudentResultReport = {
      studentId: st.studentId,
      studentName: st.nameEn,
      studentNameBn: st.nameBn,
      rollNumber: st.rollNumber,
      className: st.className,
      sectionName: st.sectionName,
      examinationId: `ex-${Date.now()}`,
      examinationName: examName,
      academicYear: st.academicYear,
      subjects: subjectsMarkCalculated,
      totalMarks: totalObtained,
      totalMaxMarks: totalMax,
      averageMarks: parseFloat(avg.toFixed(2)),
      finalGrade: hasFailed ? 'F' : finalG.grade,
      finalGPA: hasFailed ? 0.0 : parseFloat((subjectsMarkCalculated.reduce((a, b) => a + b.gpaPoint, 0) / subjectsMarkCalculated.length).toFixed(2)),
      resultStatus: hasFailed ? 'Failed' : 'Passed',
      isPublished: true,
      remarks: hasFailed ? 'Needs academic improvement' : 'Satisfactory progress',
    };

    setResults(prev => {
      const filtered = prev.filter(r => !(r.studentId === studentId && r.examinationName === examName));
      return [newResult, ...filtered];
    });
    addAuditLog('MARKS_ENTERED', `Calculated and published result for student ${st.nameEn} (${st.studentId})`);
  };

  // Gallery Photos (Device Uploads)
  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newP: GalleryPhoto = {
      ...photo,
      id: `gal-${Date.now()}`,
      uploadedAt: photo.uploadedAt || new Date().toISOString().split('T')[0],
    };
    setGalleryPhotos(prev => {
      const updated = [newP, ...prev];
      try { localStorage.setItem('hpsc_gallery_photos', JSON.stringify(updated)); } catch {}
      return updated;
    });
    addAuditLog('GALLERY_UPLOAD', `Uploaded new photo from device: ${photo.titleEn}`);
  };

  const updateGalleryPhoto = (id: string, data: Partial<GalleryPhoto>) => {
    setGalleryPhotos(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...data } : p);
      try { localStorage.setItem('hpsc_gallery_photos', JSON.stringify(updated)); } catch {}
      return updated;
    });
    addAuditLog('GALLERY_UPDATE', `Updated photo: ${id}`);
  };

  const deleteGalleryPhoto = (id: string) => {
    setGalleryPhotos(prev => {
      const updated = prev.filter(p => p.id !== id);
      try { localStorage.setItem('hpsc_gallery_photos', JSON.stringify(updated)); } catch {}
      return updated;
    });
    addAuditLog('GALLERY_DELETE', `Deleted photo: ${id}`);
  };

  // School Branding Assets (Logo, Campus Main, Campus Banner)
  const updateBrandingAsset = (key: keyof SchoolBrandingAssets, value: string) => {
    setBrandingAssets(prev => {
      const updated = { ...prev, [key]: value };
      try { localStorage.setItem('hpsc_branding_assets', JSON.stringify(updated)); } catch {}
      return updated;
    });
    addAuditLog('BRANDING_UPDATE', `Updated branding image: ${key} from device`);
  };

  return (
    <SchoolStoreContext.Provider value={{
      currentUser,
      setCurrentUser,
      switchRole,
      isAuthenticated,
      login,
      logout,
      classes,
      sections,
      subjects,
      students,
      staff,
      notices,
      routine,
      results,
      invoices,
      admissions,
      libraryBooks,
      auditLogs,
      authAccounts,
      courseMaterials,
      galleryPhotos,
      brandingAssets,
      addStudent,
      updateStudent,
      deleteStudent,
      addTeacher,
      updateTeacher,
      submitAdmission,
      updateAdmissionStatus,
      admitStudentFromApplication,
      addNotice,
      updateNotice,
      deleteNotice,
      recordPayment,
      createInvoice,
      saveMarksAndProcessResult,
      approveAccount,
      toggleAccountStatus,
      createAccount,
      addCourseMaterial,
      updateCourseMaterial,
      deleteCourseMaterial,
      addGalleryPhoto,
      updateGalleryPhoto,
      deleteGalleryPhoto,
      updateBrandingAsset,
    }}>
      {children}
    </SchoolStoreContext.Provider>
  );
};

export const useSchoolStore = () => {
  const context = useContext(SchoolStoreContext);
  if (!context) {
    throw new Error('useSchoolStore must be used within a SchoolStoreProvider');
  }
  return context;
};
