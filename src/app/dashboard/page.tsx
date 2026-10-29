'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { OverviewView } from '@/components/dashboard/views/OverviewView';
import { StudentsView } from '@/components/dashboard/views/StudentsView';
import { TeachersView } from '@/components/dashboard/views/TeachersView';
import { AttendanceView } from '@/components/dashboard/views/AttendanceView';
import { ExaminationsView } from '@/components/dashboard/views/ExaminationsView';
import { AdmissionsView } from '@/components/dashboard/views/AdmissionsView';
import { FeesView } from '@/components/dashboard/views/FeesView';
import { NoticesManageView } from '@/components/dashboard/views/NoticesManageView';
import { LibraryManageView } from '@/components/dashboard/views/LibraryManageView';
import { SettingsView } from '@/components/dashboard/views/SettingsView';
import { AuditLogsView } from '@/components/dashboard/views/AuditLogsView';
import { StudentPortalView } from '@/components/dashboard/views/StudentPortalView';
import { UserRole } from '@/types';

function DashboardContent() {
  const searchParams = useSearchParams();
  const { currentUser, switchRole } = useSchoolStore();

  const [currentView, setCurrentView] = useState<string>('overview');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const roleParam = searchParams.get('role') as UserRole;
    if (roleParam && roleParam !== currentUser.role) {
      switchRole(roleParam);
      if (roleParam === 'student' || roleParam === 'guardian') {
        setCurrentView('student_portal');
      } else if (roleParam === 'accountant') {
        setCurrentView('fees');
      } else if (roleParam === 'admission_officer') {
        setCurrentView('admissions');
      } else if (roleParam === 'teacher') {
        setCurrentView('attendance');
      }
    }
  }, [searchParams]);

  const renderActiveView = () => {
    switch (currentView) {
      case 'overview':
        return <OverviewView />;
      case 'students':
        return <StudentsView />;
      case 'teachers':
        return <TeachersView />;
      case 'attendance':
        return <AttendanceView />;
      case 'exams':
        return <ExaminationsView />;
      case 'admissions':
        return <AdmissionsView />;
      case 'fees':
        return <FeesView />;
      case 'notices':
        return <NoticesManageView />;
      case 'library':
        return <LibraryManageView />;
      case 'settings':
        return <SettingsView />;
      case 'audit_logs':
        return <AuditLogsView />;
      case 'student_portal':
        return <StudentPortalView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-140px)] bg-[#F8F9FA]">
      {/* Sidebar */}
      <DashboardSidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          currentView={currentView}
          setMobileOpen={setMobileOpen}
        />

        <div className="p-4 sm:p-6 flex-1 overflow-x-hidden">
          {renderActiveView()}
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-4 border-school-navy border-t-school-gold rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-school-navy">Loading School ERP Dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
