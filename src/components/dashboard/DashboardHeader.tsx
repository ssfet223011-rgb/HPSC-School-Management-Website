'use client';

import React from 'react';
import { Menu, Shield, User, Bell, ChevronDown } from 'lucide-react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { UserRole } from '@/types';

interface HeaderProps {
  currentView: string;
  setMobileOpen: (open: boolean) => void;
}

export const DashboardHeader: React.FC<HeaderProps> = ({
  currentView,
  setMobileOpen,
}) => {
  const { currentUser, switchRole } = useSchoolStore();

  const roleOptions: { role: UserRole; label: string }[] = [
    { role: 'super_admin', label: 'Super Admin' },
    { role: 'school_admin', label: 'School Admin' },
    { role: 'principal', label: 'Principal' },
    { role: 'teacher', label: 'Teacher (Md. Rafiqul)' },
    { role: 'accountant', label: 'Accountant' },
    { role: 'admission_officer', label: 'Admission Officer' },
    { role: 'librarian', label: 'Librarian' },
    { role: 'student', label: 'Student (Tanvir)' },
    { role: 'guardian', label: 'Guardian (Md. Delwar)' },
  ];

  return (
    <header className="bg-white border-b border-school-border sticky top-0 z-30 shadow-sm no-print">
      <div className="px-4 py-2.5 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & View Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-md hover:bg-slate-100 lg:hidden text-school-navy"
            aria-label="Open Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-sm font-bold text-school-navy capitalize">
              {currentView.replace('_', ' ')}
            </h1>
            <p className="text-[10px] text-slate-500 font-mono hidden sm:block">
              Role: <span className="font-bold text-school-academic uppercase">{currentUser.role}</span>
            </p>
          </div>
        </div>

        {/* Right: Quick Role Switcher + Current User */}
        <div className="flex items-center gap-3">
          {/* 1-Click Role Switcher */}
          <div className="flex items-center gap-1.5 bg-school-cream/80 px-2.5 py-1 rounded border border-school-border">
            <Shield className="w-3.5 h-3.5 text-school-gold shrink-0" />
            <span className="text-[11px] font-bold text-school-navy hidden md:inline">
              Simulate Role:
            </span>
            <select
              value={currentUser.role}
              onChange={(e) => switchRole(e.target.value as UserRole)}
              className="text-xs bg-white text-school-navy font-semibold px-2 py-0.5 rounded border border-school-border focus:ring-1 focus:ring-school-navy"
            >
              {roleOptions.map(opt => (
                <option key={opt.role} value={opt.role}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-school-navy text-school-lightGold flex items-center justify-center font-bold text-xs">
              {currentUser.nameEn.charAt(0)}
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-school-navy truncate max-w-[120px]">
                {currentUser.nameEn}
              </span>
              <span className="block text-[10px] text-slate-500 font-mono truncate max-w-[120px]">
                {currentUser.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
