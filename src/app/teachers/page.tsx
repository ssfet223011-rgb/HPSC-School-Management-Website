'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { UserCheck, Mail, Phone, BookOpen, GraduationCap, Award } from 'lucide-react';

export default function TeachersPage() {
  const { language } = useLanguage();
  const { staff } = useSchoolStore();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
          { label: language === 'bn' ? 'শিক্ষকমণ্ডলী' : 'Teachers & Faculty' },
        ]}
      />

      {/* Header */}
      <div className="bg-school-navy text-white p-6 sm:p-8 rounded-lg shadow-academic flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-school-lightGold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
            Academic Faculty Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-heading mt-2">
            {language === 'bn' ? 'সম্মানিত শিক্ষকমণ্ডলী ও স্টাফ পরিচিতি' : 'Faculty & Staff Directory'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-bengali">
            {SCHOOL_CONFIG.identity.nameEn} • EIIN: {SCHOOL_CONFIG.identity.eiin}
          </p>
        </div>

        <Link
          href="/dashboard?role=teacher"
          className="inline-flex items-center gap-2 bg-[#D6A545] hover:bg-[#b88628] text-school-navy font-extrabold px-5 py-2.5 rounded shadow text-xs sm:text-sm transition-all"
        >
          <UserCheck className="w-5 h-5" />
          <span>{language === 'bn' ? 'শিক্ষক পোর্টালে প্রবেশ' : 'Teacher Portal Login'}</span>
        </Link>
      </div>

      {/* Teachers Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((teacher) => (
          <div
            key={teacher.id}
            className="bg-white rounded-lg border border-school-border p-5 shadow-academic hover:border-school-gold transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-school-academic/10 text-school-academic flex items-center justify-center font-bold text-base border border-school-border shrink-0">
                  {teacher.nameEn.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-school-navy">
                    {teacher.nameEn}
                  </h3>
                  <p className="text-xs font-semibold text-school-academic font-bengali">
                    {teacher.nameBn}
                  </p>
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <div className="text-amber-800 font-semibold bg-amber-50 px-2 py-1 rounded border border-amber-200">
                  {teacher.designation}
                </div>
                <div className="text-slate-600 pt-1">
                  <strong>Department:</strong> {teacher.department}
                </div>
                <div className="text-slate-600">
                  <strong>Qualification:</strong> {teacher.qualification}
                </div>
                {teacher.assignedSubjects && teacher.assignedSubjects.length > 0 && (
                  <div className="text-slate-600">
                    <strong>Subjects:</strong> {teacher.assignedSubjects.join(', ')}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono text-[11px]">{teacher.employeeId}</span>
              <div className="flex items-center gap-3 text-school-academic">
                <a href={`tel:${teacher.phone}`} title={teacher.phone} className="hover:text-school-navy">
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a href={`mailto:${teacher.email}`} title={teacher.email} className="hover:text-school-navy">
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
