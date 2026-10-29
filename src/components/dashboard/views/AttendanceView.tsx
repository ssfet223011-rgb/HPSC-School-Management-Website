'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { 
  ClipboardCheck, Calendar, Users, Check, X, Clock, 
  Printer, Save, CheckCircle2 
} from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const { students, classes, sections } = useSchoolStore();

  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [selectedSection, setSelectedSection] = useState('Section A (Padma)');
  const [sessionDate, setSessionDate] = useState('2026-10-29');

  // Filter students by selected class
  const classStudents = students.filter(s => s.className === selectedClass);

  // Attendance status mapping { studentId: 'present' | 'absent' | 'late' }
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'present' | 'absent' | 'late'>>({
    'HPSC-2026-0801': 'present',
    'HPSC-2026-0802': 'present',
    'HPSC-2026-0803': 'absent',
    'HPSC-2026-0804': 'present',
    'HPSC-2026-0901': 'present',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleStatus = (stId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceMap(prev => ({ ...prev, [stId]: status }));
    setSavedSuccess(false);
  };

  const markAll = (status: 'present' | 'absent') => {
    const updated: Record<string, 'present' | 'absent' | 'late'> = {};
    classStudents.forEach(st => {
      updated[st.studentId] = status;
    });
    setAttendanceMap(updated);
    setSavedSuccess(false);
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Calculations
  const total = classStudents.length || 1;
  const presentCount = classStudents.filter(s => (attendanceMap[s.studentId] || 'present') === 'present').length;
  const absentCount = classStudents.filter(s => attendanceMap[s.studentId] === 'absent').length;
  const lateCount = classStudents.filter(s => attendanceMap[s.studentId] === 'late').length;
  const percentage = ((presentCount / total) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Attendance Control Bar */}
      <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-base font-bold text-school-navy flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-school-gold" />
            <span>Daily Attendance Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Select class, section, and record or review daily student attendance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => markAll('present')}
            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded border border-emerald-200 transition-colors"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 bg-school-navy hover:bg-school-academic text-white text-xs font-bold px-4 py-2 rounded shadow transition-all"
          >
            <Save className="w-3.5 h-3.5 text-school-gold" />
            <span>Save Attendance</span>
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sheet</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-4 rounded-lg border border-school-border shadow-sm no-print">
        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">Class</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full text-xs p-2 rounded border border-school-border bg-white"
          >
            {classes.map(c => (
              <option key={c.id} value={c.nameEn}>{c.nameEn} ({c.nameBn})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">Section</label>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full text-xs p-2 rounded border border-school-border bg-white"
          >
            <option value="Section A (Padma)">Section A (Padma)</option>
            <option value="Section B (Meghna)">Section B (Meghna)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">Attendance Date</label>
          <input
            type="date"
            value={sessionDate}
            onChange={(e) => setSessionDate(e.target.value)}
            className="w-full text-xs p-2 rounded border border-school-border font-mono"
          />
        </div>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded flex items-center gap-2 text-xs no-print">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Attendance records successfully updated and synchronized for {selectedClass}, Date: {sessionDate}.</span>
        </div>
      )}

      {/* Printable Sheet & Attendance Table */}
      <div className="bg-white rounded-lg border border-school-border shadow-sm p-6 printable-document space-y-4">
        {/* Printable Header */}
        <div className="border-b-2 border-school-navy pb-3 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 relative bg-white rounded p-1 border">
              <Image
                src={SCHOOL_CONFIG.branding.logoUrl}
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-school-navy">
                {SCHOOL_CONFIG.identity.nameEn} — Daily Attendance Sheet
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Class: {selectedClass} • Section: {selectedSection} • Date: {sessionDate}
              </p>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="font-bold text-emerald-700 block">Attendance Rate: {percentage}%</span>
            <span className="text-slate-500 text-[11px]">Present: {presentCount} | Absent: {absentCount} | Late: {lateCount}</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-school-border rounded">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Roll</th>
                <th className="py-2.5 px-3">Student ID</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Contact</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center no-print">Quick Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {classStudents.map(st => {
                const currentStatus = attendanceMap[st.studentId] || 'present';
                return (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-700">#{st.rollNumber}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-school-navy">{st.studentId}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">
                      {st.nameEn}
                      <span className="block text-[11px] text-slate-500 font-bengali">{st.nameBn}</span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-600">{st.primaryPhone}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        currentStatus === 'present' ? 'bg-emerald-100 text-emerald-800' :
                        currentStatus === 'absent' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {currentStatus}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center no-print">
                      <div className="inline-flex rounded-md shadow-sm">
                        <button
                          type="button"
                          onClick={() => toggleStatus(st.studentId, 'present')}
                          className={`px-2 py-1 text-[11px] font-bold rounded-l border ${
                            currentStatus === 'present' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          P
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleStatus(st.studentId, 'late')}
                          className={`px-2 py-1 text-[11px] font-bold border-t border-b ${
                            currentStatus === 'late' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          L
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleStatus(st.studentId, 'absent')}
                          className={`px-2 py-1 text-[11px] font-bold rounded-r border ${
                            currentStatus === 'absent' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          A
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Signature on print */}
        <div className="pt-10 grid grid-cols-2 gap-8 text-center text-xs text-slate-700">
          <div className="border-t border-slate-400 pt-1 font-semibold">
            Class Teacher Signature
          </div>
          <div className="border-t border-slate-400 pt-1 font-semibold text-school-navy">
            Head of Institution / Principal
          </div>
        </div>
      </div>
    </div>
  );
};
