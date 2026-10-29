'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  LayoutDashboard, Users, UserCheck, BookOpen, 
  ClipboardCheck, Award, GraduationCap, CreditCard, 
  Megaphone, BookMarked, Settings, History, Shield, 
  CalendarDays, Clock, FileSpreadsheet, LogOut, ChevronRight
} from 'lucide-react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { UserRole } from '@/types';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const DashboardSidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  mobileOpen,
  setMobileOpen,
}) => {
  const { currentUser, logout } = useSchoolStore();
  const role = currentUser.role;

  // Determine permitted modules based on role
  const isPrivileged = ['super_admin', 'school_admin', 'principal'].includes(role);
  const isTeacher = role === 'teacher';
  const isAccountant = role === 'accountant';
  const isAdmissionOfficer = role === 'admission_officer';
  const isLibrarian = role === 'librarian';
  const isStudent = role === 'student';
  const isGuardian = role === 'guardian';

  const menuSections = [
    {
      title: 'CORE ERP',
      items: [
        { id: 'overview', label: 'Overview & Analytics', icon: LayoutDashboard, visible: true },
        { id: 'student_portal', label: 'My Student Profile', icon: GraduationCap, visible: isStudent || isGuardian },
      ]
    },
    {
      title: 'ACADEMIC & STUDENTS',
      items: [
        { id: 'students', label: 'Student Management', icon: Users, visible: isPrivileged || isTeacher },
        { id: 'course_editor', label: 'Course Topics & Handouts', icon: BookOpen, visible: isPrivileged || isTeacher },
        { id: 'attendance', label: 'Daily Attendance', icon: ClipboardCheck, visible: isPrivileged || isTeacher },
        { id: 'exams', label: 'Exams & Marks Entry', icon: Award, visible: isPrivileged || isTeacher },
        { id: 'admissions', label: 'Admission Applications', icon: GraduationCap, visible: isPrivileged || isAdmissionOfficer },
      ]
    },
    {
      title: 'INSTITUTION & STAFF',
      items: [
        { id: 'teachers', label: 'Faculty & Staff', icon: UserCheck, visible: isPrivileged },
        { id: 'fees', label: 'Fees & Accounts', icon: CreditCard, visible: isPrivileged || isAccountant },
        { id: 'library', label: 'Library Management', icon: BookMarked, visible: isPrivileged || isLibrarian },
        { id: 'notices', label: 'Manage Notices', icon: Megaphone, visible: isPrivileged },
      ]
    },
    {
      title: 'ADMINISTRATION',
      items: [
        { id: 'user_approvals', label: 'User ID & Role Approvals', icon: Shield, visible: role === 'super_admin' },
        { id: 'settings', label: 'School Settings', icon: Settings, visible: isPrivileged },
        { id: 'audit_logs', label: 'Audit Logs', icon: History, visible: role === 'super_admin' },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)} 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-64 bg-school-navy text-white flex flex-col 
        border-r border-[#0f3d64] transition-transform duration-300 lg:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:static'}
      `}>
        {/* Brand Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 relative bg-white rounded p-1 shrink-0">
            <Image
              src={SCHOOL_CONFIG.branding.logoUrl}
              alt={SCHOOL_CONFIG.identity.nameEn}
              fill
              className="object-contain"
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-xs font-bold font-serif-heading text-white truncate">
              {SCHOOL_CONFIG.identity.nameEn}
            </h2>
            <p className="text-[10px] text-school-lightGold font-semibold">
              School ERP Portal
            </p>
          </div>
        </div>

        {/* Navigation Modules */}
        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          {menuSections.map((sec, sIdx) => {
            const visibleItems = sec.items.filter(i => i.visible);
            if (visibleItems.length === 0) return null;

            return (
              <div key={sIdx} className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 px-3 tracking-wider">
                  {sec.title}
                </span>

                {visibleItems.map(item => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id);
                        setMobileOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-school-gold text-school-navy font-bold shadow-md'
                          : 'text-slate-200 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer / Back to Website Link & Logout */}
        <div className="p-3 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded transition-colors"
          >
            <span>Return to Public Website</span>
          </Link>

          <button
            onClick={() => {
              logout();
              window.location.href = '/login';
            }}
            className="flex items-center justify-center gap-2 w-full py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold rounded transition-colors border border-rose-500/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out / লগআউট</span>
          </button>
        </div>
      </aside>
    </>
  );
};
