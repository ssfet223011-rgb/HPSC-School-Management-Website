'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { 
  Award, Save, Printer, CheckCircle, FileText, 
  Send, ShieldCheck, AlertCircle 
} from 'lucide-react';

export const ExaminationsView: React.FC = () => {
  const { students, subjects, results, saveMarksAndProcessResult } = useSchoolStore();

  const [selectedExam, setSelectedExam] = useState('Half-Yearly Examination 2026');
  const [selectedStudentId, setSelectedStudentId] = useState('HPSC-2026-0801');

  // Find the selected student
  const student = students.find(s => s.studentId === selectedStudentId) || students[0];

  // Subject marks input state
  const [marksInput, setMarksInput] = useState<Record<string, number>>({
    'BAN-101': 85,
    'ENG-102': 82,
    'MATH-103': 94,
    'SCI-104': 78,
    'BGS-105': 80,
    'ICT-106': 46,
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleMarkChange = (code: string, val: string) => {
    const num = Math.max(0, Math.min(100, Number(val) || 0));
    setMarksInput(prev => ({ ...prev, [code]: num }));
    setSaveSuccess(false);
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student) return;

    const rawMarks = [
      { subjectName: 'Bangla First Paper', subjectCode: 'BAN-101', maxMarks: 100, obtained: marksInput['BAN-101'] ?? 80 },
      { subjectName: 'English First Paper', subjectCode: 'ENG-102', maxMarks: 100, obtained: marksInput['ENG-102'] ?? 80 },
      { subjectName: 'General Mathematics', subjectCode: 'MATH-103', maxMarks: 100, obtained: marksInput['MATH-103'] ?? 85 },
      { subjectName: 'General Science', subjectCode: 'SCI-104', maxMarks: 100, obtained: marksInput['SCI-104'] ?? 75 },
      { subjectName: 'Bangladesh & Global Studies', subjectCode: 'BGS-105', maxMarks: 100, obtained: marksInput['BGS-105'] ?? 80 },
      { subjectName: 'Information & Comm. Tech', subjectCode: 'ICT-106', maxMarks: 50, obtained: marksInput['ICT-106'] ?? 45 },
    ];

    saveMarksAndProcessResult(student.studentId, selectedExam, rawMarks);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-base font-bold text-school-navy flex items-center gap-2">
            <Award className="w-5 h-5 text-school-gold" />
            <span>Examinations & Marks Evaluation Workflow</span>
          </h2>
          <p className="text-xs text-slate-500">
            Enter marks, calculate GPA & grades, and publish official school results.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded">
            NCTB 5.0 GPA Scale Active
          </span>
        </div>
      </div>

      {/* Selector Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-lg border border-school-border shadow-sm no-print">
        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">Select Examination</label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full text-xs p-2 rounded border border-school-border font-semibold bg-white"
          >
            <option value="Half-Yearly Examination 2026">Half-Yearly Examination 2026</option>
            <option value="Annual Examination 2026">Annual Examination 2026</option>
            <option value="Pre-Test Examination 2026">Pre-Test Examination 2026</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-school-navy mb-1">Select Student</label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full text-xs p-2 rounded border border-school-border font-semibold bg-white"
          >
            {students.map(s => (
              <option key={s.id} value={s.studentId}>
                Roll #{s.rollNumber} — {s.nameEn} ({s.studentId}, {s.className})
              </option>
            ))}
          </select>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded flex items-center gap-2 text-xs no-print">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Marks successfully processed, GPA calculated, and result published for {student?.nameEn}!</span>
        </div>
      )}

      {/* Marks Entry Form */}
      <form onSubmit={handleSaveResult} className="bg-white rounded-lg border border-school-border shadow-sm p-6 space-y-4 no-print">
        <div className="flex items-center justify-between border-b pb-3">
          <div>
            <h3 className="text-sm font-bold text-school-navy">
              Marks Entry Sheet: {student?.nameEn} (Roll #{student?.rollNumber})
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Class: {student?.className} • Section: {student?.sectionName} • ID: {student?.studentId}
            </p>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-school-navy hover:bg-school-academic text-white px-4 py-2 rounded text-xs font-bold shadow"
          >
            <Save className="w-4 h-4 text-school-gold" />
            <span>Process & Publish Result</span>
          </button>
        </div>

        <div className="overflow-x-auto border border-school-border rounded">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">Code</th>
                <th className="py-2.5 px-3 text-center">Max Marks</th>
                <th className="py-2.5 px-3 text-center">Pass Marks</th>
                <th className="py-2.5 px-3 text-center w-36">Marks Obtained</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-school-navy">Bangla First Paper</td>
                <td className="py-2.5 px-3 font-mono">BAN-101</td>
                <td className="py-2.5 px-3 text-center font-mono">100</td>
                <td className="py-2.5 px-3 text-center font-mono">33</td>
                <td className="py-2.5 px-3 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={marksInput['BAN-101'] ?? 85}
                    onChange={(e) => handleMarkChange('BAN-101', e.target.value)}
                    className="w-20 p-1 text-center font-bold text-school-navy border rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-school-navy">English First Paper</td>
                <td className="py-2.5 px-3 font-mono">ENG-102</td>
                <td className="py-2.5 px-3 text-center font-mono">100</td>
                <td className="py-2.5 px-3 text-center font-mono">33</td>
                <td className="py-2.5 px-3 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={marksInput['ENG-102'] ?? 82}
                    onChange={(e) => handleMarkChange('ENG-102', e.target.value)}
                    className="w-20 p-1 text-center font-bold text-school-navy border rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-school-navy">General Mathematics</td>
                <td className="py-2.5 px-3 font-mono">MATH-103</td>
                <td className="py-2.5 px-3 text-center font-mono">100</td>
                <td className="py-2.5 px-3 text-center font-mono">33</td>
                <td className="py-2.5 px-3 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={marksInput['MATH-103'] ?? 94}
                    onChange={(e) => handleMarkChange('MATH-103', e.target.value)}
                    className="w-20 p-1 text-center font-bold text-school-navy border rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-school-navy">General Science</td>
                <td className="py-2.5 px-3 font-mono">SCI-104</td>
                <td className="py-2.5 px-3 text-center font-mono">100</td>
                <td className="py-2.5 px-3 text-center font-mono">33</td>
                <td className="py-2.5 px-3 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={marksInput['SCI-104'] ?? 78}
                    onChange={(e) => handleMarkChange('SCI-104', e.target.value)}
                    className="w-20 p-1 text-center font-bold text-school-navy border rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-school-navy">Bangladesh & Global Studies</td>
                <td className="py-2.5 px-3 font-mono">BGS-105</td>
                <td className="py-2.5 px-3 text-center font-mono">100</td>
                <td className="py-2.5 px-3 text-center font-mono">33</td>
                <td className="py-2.5 px-3 text-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={marksInput['BGS-105'] ?? 80}
                    onChange={(e) => handleMarkChange('BGS-105', e.target.value)}
                    className="w-20 p-1 text-center font-bold text-school-navy border rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-school-navy">Information & Comm. Tech</td>
                <td className="py-2.5 px-3 font-mono">ICT-106</td>
                <td className="py-2.5 px-3 text-center font-mono">50</td>
                <td className="py-2.5 px-3 text-center font-mono">17</td>
                <td className="py-2.5 px-3 text-center">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={marksInput['ICT-106'] ?? 46}
                    onChange={(e) => handleMarkChange('ICT-106', e.target.value)}
                    className="w-20 p-1 text-center font-bold text-school-navy border rounded"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};
