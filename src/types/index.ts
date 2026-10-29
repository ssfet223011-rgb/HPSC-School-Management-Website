export type UserRole = 
  | 'super_admin'
  | 'school_admin'
  | 'principal'
  | 'teacher'
  | 'accountant'
  | 'admission_officer'
  | 'librarian'
  | 'student'
  | 'guardian';

export interface UserProfile {
  id: string;
  email: string;
  nameEn: string;
  nameBn: string;
  role: UserRole;
  phone?: string;
  avatarUrl?: string;
  studentId?: string; // for students
  employeeId?: string; // for staff
  linkedStudentIds?: string[]; // for guardians
}

export interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface ClassItem {
  id: string;
  nameEn: string;
  nameBn: string;
  gradeNumeric: number;
}

export interface SectionItem {
  id: string;
  classId: string;
  name: string;
  capacity: number;
  roomNumber: string;
  classTeacherName?: string;
}

export interface SubjectItem {
  id: string;
  classId: string;
  nameEn: string;
  nameBn: string;
  code: string;
  maxMarks: number;
  passMarks: number;
  type: 'compulsory' | 'optional';
}

export interface StudentRecord {
  id: string;
  studentId: string; // e.g. HPSC-2026-0801
  admissionNo: string;
  nameEn: string;
  nameBn: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  bloodGroup: string;
  classId: string;
  className: string;
  sectionId: string;
  sectionName: string;
  rollNumber: number;
  academicYear: string;
  fatherName: string;
  motherName: string;
  primaryPhone: string;
  emergencyContact: string;
  address: string;
  previousSchool?: string;
  status: 'active' | 'transferred' | 'graduated' | 'suspended';
  photoUrl?: string;
  guardianName?: string;
  guardianPhone?: string;
}

export interface TeacherStaff {
  id: string;
  employeeId: string;
  nameEn: string;
  nameBn: string;
  designation: string;
  department: string;
  qualification: string;
  phone: string;
  email: string;
  joiningDate: string;
  status: 'active' | 'on_leave' | 'resigned';
  photoUrl?: string;
  assignedClasses?: string[];
  assignedSubjects?: string[];
}

export interface AttendanceEntry {
  studentId: string;
  studentName: string;
  rollNumber: number;
  status: 'present' | 'absent' | 'late' | 'excused';
  remarks?: string;
}

export interface DailyAttendanceSession {
  id: string;
  classId: string;
  sectionId: string;
  date: string; // YYYY-MM-DD
  records: AttendanceEntry[];
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  recordedBy: string;
}

export interface Examination {
  id: string;
  name: string;
  nameBn: string;
  examType: 'Half-Yearly' | 'Annual' | 'Model Test' | 'Pre-Test';
  academicYear: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  publishedAt?: string;
}

export interface SubjectMark {
  subjectId: string;
  subjectName: string;
  subjectCode: string;
  maxMarks: number;
  passMarks: number;
  marksObtained: number;
  isAbsent?: boolean;
  gradeLetter: string;
  gpaPoint: number;
}

export interface StudentResultReport {
  studentId: string;
  studentName: string;
  studentNameBn: string;
  rollNumber: number;
  className: string;
  sectionName: string;
  examinationId: string;
  examinationName: string;
  academicYear: string;
  subjects: SubjectMark[];
  totalMarks: number;
  totalMaxMarks: number;
  averageMarks: number;
  finalGrade: string;
  finalGPA: number;
  resultStatus: 'Passed' | 'Failed';
  classRank?: number;
  remarks?: string;
  isPublished: boolean;
}

export interface AdmissionApplication {
  id: string;
  applicationNo: string;
  applicantNameEn: string;
  applicantNameBn: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  desiredClass: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail?: string;
  address: string;
  previousSchool?: string;
  status: 'new' | 'under_review' | 'accepted' | 'rejected' | 'admitted';
  submittedAt: string;
  reviewNotes?: string;
}

export interface FeeCategory {
  id: string;
  name: string;
  code: string;
  amount: number;
  frequency: 'monthly' | 'term' | 'annual' | 'one_time';
}

export interface FeeInvoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  className: string;
  feeCategoryName: string;
  amount: number;
  discount: number;
  netAmount: number;
  paidAmount: number;
  dueDate: string;
  status: 'unpaid' | 'partially_paid' | 'paid';
  createdAt: string;
}

export interface FeePayment {
  id: string;
  receiptNumber: string;
  invoiceId: string;
  studentId: string;
  studentName: string;
  amountPaid: number;
  paymentDate: string;
  paymentMethod: 'Cash' | 'bKash' | 'Nagad' | 'Bank';
  transactionRef?: string;
  collectedBy: string;
  remarks?: string;
}

export interface NoticeItem {
  id: string;
  titleEn: string;
  titleBn: string;
  contentEn: string;
  contentBn: string;
  category: 'academic' | 'admin' | 'exam' | 'holiday' | 'admission';
  priority: 'normal' | 'important' | 'urgent';
  isPublished: boolean;
  publishDate: string;
  attachmentName?: string;
  attachmentUrl?: string;
}

export interface SchoolEvent {
  id: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  startDate: string;
  endDate: string;
  eventType: 'academic' | 'holiday' | 'exam' | 'cultural' | 'sports';
  location: string;
}

export interface RoutineItem {
  id: string;
  className: string;
  sectionName: string;
  weekday: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday';
  periodNumber: number;
  timeSlot: string;
  subjectName: string;
  teacherName: string;
  roomNumber: string;
}

export interface LibraryBook {
  id: string;
  accessionNo: string;
  isbn?: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
}

export interface LibraryLoan {
  id: string;
  bookId: string;
  bookTitle: string;
  borrowerName: string;
  borrowerId: string;
  borrowerType: 'student' | 'staff';
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'issued' | 'returned' | 'overdue';
}

export interface CourseMaterial {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  className: string;
  topicName: string;
  uploadedBy: string;
  teacherId: string;
  description: string;
  fileName: string;
  fileSize: string;
  fileType: string;
  createdAt: string;
  downloadUrl?: string;
}

export interface AuthAccount {
  id: string;
  loginId: string; // e.g. 'admin', 'EMP-001', 'HPSC-2026-0801'
  email: string;
  passwordHash: string;
  role: UserRole;
  nameEn: string;
  nameBn: string;
  status: 'active' | 'pending_approval' | 'suspended';
  isApproved: boolean;
  createdAt: string;
}

export interface AuditLogItem {
  id: string;
  action: string;
  userName: string;
  userRole: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface GalleryPhoto {
  id: string;
  titleEn: string;
  titleBn: string;
  category: 'Campus' | 'Academic' | 'Events';
  image: string; // File URL or base64 data URL uploaded from device
  caption?: string;
  uploadedBy?: string;
  uploadedAt?: string;
}

export interface SchoolBrandingAssets {
  logoUrl: string;
  campusMainUrl: string;
  campusBannerUrl: string;
}
