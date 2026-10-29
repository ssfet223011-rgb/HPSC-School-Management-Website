'use client';

import React from 'react';
import Image from 'next/image';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { 
  GraduationCap, Award, CreditCard, CalendarDays, 
  Printer, CheckCircle2, Clock, FileText, Download, BookOpen, Layers
} from 'lucide-react';

export const StudentPortalView: React.FC = () => {
  const { students, results, invoices, routine, courseMaterials } = useSchoolStore();

  // Find the sample student
  const student = students[0];
  const myResults = results.filter(r => r.studentId === student.studentId);
  const myInvoices = invoices.filter(i => i.studentId === student.studentId);
  const myRoutine = routine.filter(r => r.className === student.className);
  const myMaterials = courseMaterials.filter(m => m.className === student.className || m.className === 'All');

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-school-navy to-school-academic text-white p-6 rounded-lg shadow-academic flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white text-school-navy flex items-center justify-center font-bold text-2xl border-2 border-school-gold">
            {student.nameEn.charAt(0)}
          </div>
          <div>
            <span className="text-xs font-bold text-school-lightGold uppercase tracking-wider">
              Enrolled Student Portal
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-heading mt-0.5">
              {student.nameEn}
            </h2>
            <p className="text-xs text-slate-300 font-mono">
              ID: {student.studentId} • Roll: #{student.rollNumber} • {student.className} ({student.sectionName})
            </p>
          </div>
        </div>

        <div className="bg-white/10 p-3 rounded-lg border border-white/20 text-xs space-y-1 text-center sm:text-right">
          <span className="block text-slate-300">Guardian Name:</span>
          <strong className="block text-white">{student.guardianName}</strong>
          <span className="font-mono text-school-lightGold">{student.guardianPhone}</span>
        </div>
      </div>

      {/* Grid: Attendance & Fee Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-school-border shadow-sm">
          <span className="text-xs text-slate-500 uppercase font-semibold">Attendance Rate</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1">96.5%</div>
          <span className="text-[11px] text-slate-500">Satisfactory Class Presence</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-school-border shadow-sm">
          <span className="text-xs text-slate-500 uppercase font-semibold">Latest Exam GPA</span>
          <div className="text-2xl font-bold text-school-academic mt-1">
            {myResults[0]?.finalGPA ? myResults[0].finalGPA.toFixed(2) : '5.00'}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold">Grade: {myResults[0]?.finalGrade || 'A+'}</span>
        </div>

        <div className="bg-white p-4 rounded-lg border border-school-border shadow-sm">
          <span className="text-xs text-slate-500 uppercase font-semibold">Fee Account Status</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1 font-mono">Cleared</div>
          <span className="text-[11px] text-slate-500">All current invoices paid</span>
        </div>
      </div>

      {/* Published Examination Result & Report Card */}
      {myResults.length > 0 && (
        <div className="bg-white rounded-lg border border-school-border shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <h3 className="text-sm font-bold text-school-navy flex items-center gap-2">
                <Award className="w-4 h-4 text-school-gold" />
                <span>My Published Examination Result</span>
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {myResults[0].examinationName} ({myResults[0].academicYear})
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 bg-school-navy hover:bg-school-academic text-white px-3.5 py-1.5 rounded text-xs font-bold shadow"
            >
              <Printer className="w-3.5 h-3.5 text-school-gold" />
              <span>Print My Report Card</span>
            </button>
          </div>

          <div className="overflow-x-auto border rounded">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#124C7C] text-white">
                <tr>
                  <th className="py-2 px-3">Subject Name</th>
                  <th className="py-2 px-3">Code</th>
                  <th className="py-2 px-3 text-center">Marks Obtained</th>
                  <th className="py-2 px-3 text-center">Grade</th>
                  <th className="py-2 px-3 text-center">GPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {myResults[0].subjects.map((sub, i) => (
                  <tr key={i}>
                    <td className="py-2 px-3 font-semibold text-school-navy">{sub.subjectName}</td>
                    <td className="py-2 px-3 font-mono">{sub.subjectCode}</td>
                    <td className="py-2 px-3 text-center font-bold font-mono">{sub.marksObtained}</td>
                    <td className="py-2 px-3 text-center font-bold text-amber-700">{sub.gradeLetter}</td>
                    <td className="py-2 px-3 text-center font-mono">{sub.gpaPoint.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Routine */}
      <div className="bg-white rounded-lg border border-school-border shadow-sm p-6 space-y-3">
        <h3 className="text-sm font-bold text-school-navy flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-school-gold" />
          <span>My Class Schedule ({student.className})</span>
        </h3>
        <div className="overflow-x-auto border rounded">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 font-bold">
              <tr>
                <th className="py-2 px-3">Day</th>
                <th className="py-2 px-3">Period</th>
                <th className="py-2 px-3">Time</th>
                <th className="py-2 px-3">Subject</th>
                <th className="py-2 px-3">Teacher</th>
                <th className="py-2 px-3">Room</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {myRoutine.map((r, i) => (
                <tr key={i}>
                  <td className="py-2 px-3 font-bold">{r.weekday}</td>
                  <td className="py-2 px-3">Period {r.periodNumber}</td>
                  <td className="py-2 px-3 font-mono text-slate-500">{r.timeSlot}</td>
                  <td className="py-2 px-3 font-semibold text-school-academic">{r.subjectName}</td>
                  <td className="py-2 px-3">{r.teacherName}</td>
                  <td className="py-2 px-3 font-mono">{r.roomNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Materials & Teacher Handouts (Student Download Center) */}
      <div className="bg-white rounded-lg border border-school-border shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-3">
          <div>
            <h3 className="text-sm font-bold text-school-navy flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-school-gold" />
              <span>My Course Handouts & Lecture Materials (লেকচার নোট ও মেটেরিয়াল ডাউনলোড)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Study handouts and topic notes uploaded by subject teachers for {student.className}
            </p>
          </div>

          <span className="bg-school-cream text-school-navy font-bold text-xs px-2.5 py-1 rounded border border-school-border">
            {myMaterials.length} Handouts Available
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {myMaterials.map((mat) => (
            <div 
              key={mat.id}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-school-gold transition-all flex flex-col justify-between space-y-2.5"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mb-1">
                  <span className="bg-[#124C7C]/10 text-school-academic font-bold px-1.5 py-0.5 rounded">
                    {mat.subjectCode} • {mat.subjectName}
                  </span>
                  <span>{mat.createdAt}</span>
                </div>

                <h4 className="text-xs font-bold text-school-navy">
                  {mat.title}
                </h4>
                <p className="text-[11px] font-medium text-amber-800 mt-0.5">
                  অধ্যায়: {mat.topicName}
                </p>
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                  {mat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-500">
                  By: <strong className="text-school-navy">{mat.uploadedBy}</strong>
                </span>

                <button
                  onClick={() => alert(`Starting download: ${mat.fileName} (${mat.fileSize})`)}
                  className="inline-flex items-center gap-1.5 bg-school-navy hover:bg-school-academic text-white px-2.5 py-1 rounded text-[11px] font-bold shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-school-gold" />
                  <span>Download ({mat.fileSize})</span>
                </button>
              </div>
            </div>
          ))}

          {myMaterials.length === 0 && (
            <div className="col-span-full p-6 text-center text-xs text-slate-500 bg-slate-50 rounded border border-dashed">
              No lecture materials currently uploaded for this class.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
