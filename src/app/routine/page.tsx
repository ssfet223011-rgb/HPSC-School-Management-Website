'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { Clock, Printer, CalendarDays, Filter } from 'lucide-react';

export default function ClassRoutinePage() {
  const { language } = useLanguage();
  const { routine, classes } = useSchoolStore();

  const [selectedClass, setSelectedClass] = useState('Class 8');

  const filteredRoutine = routine.filter(r => r.className === selectedClass);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="no-print">
        <Breadcrumb
          items={[
            { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
            { label: language === 'bn' ? 'একাডেমিক' : 'Academic', href: '/academic' },
            { label: language === 'bn' ? 'ক্লাস রুটিন' : 'Class Routine' },
          ]}
        />
      </div>

      {/* Routine Printable Document */}
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
            <span>{language === 'bn' ? 'রুটিন প্রিন্ট করুন' : 'Print Routine'}</span>
          </button>
        </div>

        {/* Filter Bar (no-print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-school-cream/60 p-3 rounded border border-school-border no-print">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-school-navy" />
            <span className="text-xs font-bold text-school-navy">Select Class:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="text-xs p-1.5 rounded border border-school-border bg-white font-semibold"
            >
              {classes.map(c => (
                <option key={c.id} value={c.nameEn}>{c.nameEn} ({c.nameBn})</option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-600 font-semibold">
            Academic Session: 2026
          </div>
        </div>

        {/* Document Sub-title */}
        <div className="text-center py-1 bg-school-cream/40 rounded border border-school-border">
          <h2 className="text-base font-bold text-school-navy uppercase tracking-wider">
            Official Class Timetable — {selectedClass}
          </h2>
          <p className="text-xs text-slate-500 font-mono">
            Effective from: Academic Session 2026 | Weekly Schedule
          </p>
        </div>

        {/* Timetable Table */}
        <div className="overflow-x-auto border border-school-border rounded">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Weekday</th>
                <th className="py-2.5 px-3 text-center">Period</th>
                <th className="py-2.5 px-3">Time Slot</th>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Assigned Teacher</th>
                <th className="py-2.5 px-3 text-center">Room</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredRoutine.length > 0 ? (
                filteredRoutine.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="py-2.5 px-3 font-bold text-school-navy">{item.weekday}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-semibold">Period {item.periodNumber}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{item.timeSlot}</td>
                    <td className="py-2.5 px-3 font-semibold text-school-academic">{item.subjectName}</td>
                    <td className="py-2.5 px-3 text-slate-700">{item.teacherName}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-medium">{item.roomNumber}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500 italic">
                    No timetable schedule published yet for {selectedClass}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Official Signatures */}
        <div className="pt-12 grid grid-cols-2 gap-8 text-center text-xs text-slate-700">
          <div className="border-t border-slate-400 pt-1 font-semibold">
            Routine Committee Convener
          </div>
          <div className="border-t border-slate-400 pt-1 font-semibold text-school-navy">
            Head of Institution / Principal
          </div>
        </div>
      </div>
    </div>
  );
}
