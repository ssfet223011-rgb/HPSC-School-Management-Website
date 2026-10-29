'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { BookOpen, CalendarDays, Award, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AcademicPage() {
  const { language } = useLanguage();
  const { classes, subjects } = useSchoolStore();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
          { label: language === 'bn' ? 'একাডেমিক তথ্য' : 'Academic Information' },
        ]}
      />

      {/* Hero Banner */}
      <div className="bg-school-navy text-white p-6 sm:p-8 rounded-lg shadow-academic flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-school-lightGold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
            National Curriculum (NCTB)
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-heading mt-2">
            {language === 'bn' ? 'একাডেমিক কাঠামো ও শিক্ষাক্রম' : 'Academic Structure & Curriculum'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-bengali">
            {SCHOOL_CONFIG.identity.nameEn} (EIIN: {SCHOOL_CONFIG.identity.eiin})
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/routine"
            className="inline-flex items-center gap-1.5 bg-school-gold hover:bg-[#c99530] text-school-navy font-bold px-4 py-2 rounded text-xs shadow transition-all"
          >
            <Clock className="w-4 h-4" />
            <span>{language === 'bn' ? 'ক্লাস রুটিন' : 'Class Routine'}</span>
          </Link>
          <Link
            href="/exam-routine"
            className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white font-semibold px-4 py-2 rounded text-xs border border-white/30 transition-all"
          >
            <CalendarDays className="w-4 h-4 text-school-lightGold" />
            <span>{language === 'bn' ? 'পরীক্ষার রুটিন' : 'Exam Schedule'}</span>
          </Link>
        </div>
      </div>

      {/* Grid of Classes Offered */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-school-navy border-b border-school-border pb-2 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-school-gold" />
          <span>{language === 'bn' ? 'বর্তমান শ্রেণি ও শাখাসমূহ (মাধ্যমিক স্তর)' : 'Academic Classes & Sections'}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-white rounded-lg border border-school-border p-5 shadow-sm hover:border-school-gold transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold text-school-navy">{cls.nameEn}</h3>
                  <p className="text-xs font-semibold text-school-academic font-bengali">{cls.nameBn}</p>
                </div>
                <span className="bg-amber-100 text-amber-900 font-bold text-xs px-2 py-0.5 rounded">
                  Grade {cls.gradeNumeric}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Curriculum: NCTB Bangla Medium</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Available Sections: Section A (Padma), Section B (Meghna)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NCTB Grading Policy Table */}
      <div className="bg-white rounded-lg border border-school-border p-6 shadow-academic space-y-4">
        <h3 className="text-base font-bold text-school-navy flex items-center gap-2">
          <Award className="w-5 h-5 text-school-gold" />
          <span>{language === 'bn' ? 'জাতীয় শিক্ষাক্রমের গ্রেডিং নীতিমালা (GPA 5.0 স্কেল)' : 'National Standard Grading Policy (5.0 GPA Scale)'}</span>
        </h3>

        <div className="overflow-x-auto border border-school-border rounded">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-4">Marks Range (%)</th>
                <th className="py-2.5 px-4">Letter Grade</th>
                <th className="py-2.5 px-4">Grade Point (GPA)</th>
                <th className="py-2.5 px-4">Qualitative Remark</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="bg-white"><td className="py-2 px-4 font-mono font-semibold">80% — 100%</td><td className="py-2 px-4 font-bold text-emerald-700">A+</td><td className="py-2 px-4 font-mono font-bold">5.00</td><td className="py-2 px-4 text-slate-600">Outstanding</td></tr>
              <tr className="bg-slate-50"><td className="py-2 px-4 font-mono font-semibold">70% — 79%</td><td className="py-2 px-4 font-bold text-blue-700">A</td><td className="py-2 px-4 font-mono font-bold">4.00</td><td className="py-2 px-4 text-slate-600">Excellent</td></tr>
              <tr className="bg-white"><td className="py-2 px-4 font-mono font-semibold">60% — 69%</td><td className="py-2 px-4 font-bold text-cyan-700">A-</td><td className="py-2 px-4 font-mono font-bold">3.50</td><td className="py-2 px-4 text-slate-600">Very Good</td></tr>
              <tr className="bg-slate-50"><td className="py-2 px-4 font-mono font-semibold">50% — 59%</td><td className="py-2 px-4 font-bold text-amber-700">B</td><td className="py-2 px-4 font-mono font-bold">3.00</td><td className="py-2 px-4 text-slate-600">Good</td></tr>
              <tr className="bg-white"><td className="py-2 px-4 font-mono font-semibold">40% — 49%</td><td className="py-2 px-4 font-bold text-orange-700">C</td><td className="py-2 px-4 font-mono font-bold">2.00</td><td className="py-2 px-4 text-slate-600">Satisfactory</td></tr>
              <tr className="bg-slate-50"><td className="py-2 px-4 font-mono font-semibold">33% — 39%</td><td className="py-2 px-4 font-bold text-slate-700">D</td><td className="py-2 px-4 font-mono font-bold">1.00</td><td className="py-2 px-4 text-slate-600">Passing</td></tr>
              <tr className="bg-rose-50/50"><td className="py-2 px-4 font-mono font-semibold text-rose-700">0% — 32%</td><td className="py-2 px-4 font-bold text-rose-700">F</td><td className="py-2 px-4 font-mono font-bold text-rose-700">0.00</td><td className="py-2 px-4 text-rose-700 font-semibold">Failed</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
