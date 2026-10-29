'use client';

import React from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { CalendarDays, Printer, AlertCircle } from 'lucide-react';

export default function ExamRoutinePage() {
  const { language } = useLanguage();

  const examSchedule = [
    { date: '2026-11-20', day: 'Friday', time: '10:00 AM - 01:00 PM', code: 'BAN-101', subject: 'Bangla First Paper', class: 'Class 8 & 9', room: 'Hall Room 1 & 2' },
    { date: '2026-11-22', day: 'Sunday', time: '10:00 AM - 01:00 PM', code: 'ENG-102', subject: 'English First Paper', class: 'Class 8 & 9', room: 'Hall Room 1 & 2' },
    { date: '2026-11-25', day: 'Wednesday', time: '10:00 AM - 01:00 PM', code: 'MATH-103', subject: 'General Mathematics', class: 'Class 8 & 9', room: 'Hall Room 1 & 2' },
    { date: '2026-11-28', day: 'Saturday', time: '10:00 AM - 01:00 PM', code: 'SCI-104', subject: 'General Science', class: 'Class 8 & 9', room: 'Hall Room 1 & 2' },
    { date: '2026-11-30', day: 'Monday', time: '10:00 AM - 01:00 PM', code: 'BGS-105', subject: 'Bangladesh & Global Studies', class: 'Class 8 & 9', room: 'Hall Room 1 & 2' },
    { date: '2026-12-02', day: 'Wednesday', time: '10:00 AM - 12:00 PM', code: 'ICT-106', subject: 'Information & Communication Tech', class: 'Class 8 & 9', room: 'Hall Room 1 & 2' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="no-print">
        <Breadcrumb
          items={[
            { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
            { label: language === 'bn' ? 'একাডেমিক' : 'Academic', href: '/academic' },
            { label: language === 'bn' ? 'পরীক্ষার রুটিন' : 'Examination Routine' },
          ]}
        />
      </div>

      <div className="bg-white rounded-lg border border-school-border shadow-academic p-6 sm:p-8 space-y-6 printable-document">
        {/* Institutional Header */}
        <div className="border-b-2 border-school-navy pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative bg-white rounded p-1 border border-school-border">
              <Image
                src={SCHOOL_CONFIG.branding.logoUrl}
                alt={SCHOOL_CONFIG.identity.nameEn}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-school-navy font-serif-heading">
                {SCHOOL_CONFIG.identity.nameEn}
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-school-academic font-bengali">
                {SCHOOL_CONFIG.identity.nameBn} • EIIN: {SCHOOL_CONFIG.identity.eiin}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {SCHOOL_CONFIG.contact.fullAddress}
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-school-navy hover:bg-school-academic text-white px-4 py-2 rounded text-xs font-bold shadow no-print"
          >
            <Printer className="w-4 h-4 text-school-gold" />
            <span>{language === 'bn' ? 'পরীক্ষার রুটিন প্রিন্ট' : 'Print Exam Routine'}</span>
          </button>
        </div>

        {/* Schedule Title */}
        <div className="text-center py-2 bg-school-cream/60 rounded border border-school-border">
          <h2 className="text-base sm:text-lg font-bold text-school-navy uppercase tracking-wider">
            Annual Examination 2026 — Official Time Table
          </h2>
          <p className="text-xs text-school-academic font-semibold">
            Applicable for Secondary Section (Class 6, 7, 8, 9)
          </p>
        </div>

        {/* Exam Routine Table */}
        <div className="overflow-x-auto border border-school-border rounded">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Day</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Subject Code</th>
                <th className="py-2.5 px-3">Subject Name</th>
                <th className="py-2.5 px-3">Applicable Classes</th>
                <th className="py-2.5 px-3">Examination Hall</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {examSchedule.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="py-2.5 px-3 font-mono font-bold text-school-navy">{row.date}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-700">{row.day}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">{row.time}</td>
                  <td className="py-2.5 px-3 font-mono text-amber-700 font-semibold">{row.code}</td>
                  <td className="py-2.5 px-3 font-bold text-school-navy">{row.subject}</td>
                  <td className="py-2.5 px-3 text-slate-700">{row.class}</td>
                  <td className="py-2.5 px-3 text-slate-700">{row.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Exam Guidelines Instructions */}
        <div className="bg-amber-50/60 border border-amber-200 p-4 rounded text-xs space-y-1.5 text-school-navy font-bengali">
          <p className="font-bold flex items-center gap-1.5 text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>পরীক্ষার্থীদের জন্য বিশেষ নির্দেশনাবলি:</span>
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li>পরীক্ষা শুরুর অন্তত ৩০ মিনিট পূর্বে অবশ্যই পরীক্ষাকেন্দ্রে প্রবেশ করতে হবে।</li>
            <li>প্রবেশপত্র (Admit Card) ব্যতীত কোনো পরীক্ষার্থীকে পরীক্ষা কক্ষে প্রবেশ করতে দেওয়া হবে না।</li>
            <li>পরীক্ষাকেন্দ্রে যে কোনো ধরনের ইলেকট্রনিক ডিভাইস বা মোবাইল ফোন বহন কঠোরভাবে নিষিদ্ধ।</li>
          </ul>
        </div>

        {/* Signatures */}
        <div className="pt-10 grid grid-cols-2 gap-8 text-center text-xs text-slate-700">
          <div className="border-t border-slate-400 pt-1 font-semibold">
            Controller of Examinations
          </div>
          <div className="border-t border-slate-400 pt-1 font-semibold text-school-navy">
            Head of Institution / Principal
          </div>
        </div>
      </div>
    </div>
  );
}
