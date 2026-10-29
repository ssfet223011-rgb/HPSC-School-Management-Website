'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { Search, Printer, AlertCircle, FileText, CheckCircle, XCircle } from 'lucide-react';
import { StudentResultReport } from '@/types';

export default function ResultsPage() {
  const { language } = useLanguage();
  const { results, classes } = useSchoolStore();

  const [examName, setExamName] = useState('Half-Yearly Examination 2026');
  const [academicYear, setAcademicYear] = useState('2026');
  const [selectedClass, setSelectedClass] = useState('Class 8');
  const [rollNumber, setRollNumber] = useState('1');

  const [searchResult, setSearchResult] = useState<StudentResultReport | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);

    const rollInt = parseInt(rollNumber.trim(), 10);
    const found = results.find(r => 
      r.isPublished &&
      r.examinationName.toLowerCase() === examName.toLowerCase() &&
      r.className.toLowerCase() === selectedClass.toLowerCase() &&
      r.rollNumber === rollInt
    );

    setSearchResult(found || null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="no-print">
        <Breadcrumb
          items={[
            { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
            { label: language === 'bn' ? 'পরীক্ষার ফলাফল' : 'Examination Results' },
          ]}
        />
      </div>

      {/* Header Banner */}
      <div className="bg-school-navy text-white p-6 sm:p-8 rounded-lg shadow-academic no-print flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-school-lightGold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
            Student Academic Evaluation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-heading mt-2">
            {language === 'bn' ? 'অনলাইন পরীক্ষার ফলাফল অনুসন্ধান' : 'Online Examination Result Portal'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-bengali">
            {SCHOOL_CONFIG.identity.nameEn} (EIIN: {SCHOOL_CONFIG.identity.eiin})
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs bg-black/20 p-2.5 rounded border border-school-gold/30">
          <FileText className="w-5 h-5 text-school-gold" />
          <span>{language === 'bn' ? 'শুধুমাত্র প্রকাশিত ফলাফল অনুসন্ধানযোগ্য' : 'Only Published Official Results Available'}</span>
        </div>
      </div>

      {/* Search Filter Form */}
      <form onSubmit={handleSearch} className="bg-white rounded-lg border border-school-border p-6 shadow-academic space-y-4 no-print">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-school-navy mb-1">
              {language === 'bn' ? 'পরীক্ষার নাম' : 'Examination'}
            </label>
            <select
              value={examName}
              onChange={(e) => setExamName(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
            >
              <option value="Half-Yearly Examination 2026">Half-Yearly Examination 2026</option>
              <option value="Annual Examination 2026">Annual Examination 2026</option>
              <option value="Pre-Test Examination 2026">Pre-Test Examination 2026</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-school-navy mb-1">
              {language === 'bn' ? 'শিক্ষাবর্ষ' : 'Academic Year'}
            </label>
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-school-navy mb-1">
              {language === 'bn' ? 'শ্রেণি' : 'Class'}
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
            >
              {classes.map(c => (
                <option key={c.id} value={c.nameEn}>{c.nameEn} ({c.nameBn})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-school-navy mb-1">
              {language === 'bn' ? 'রোল নম্বর' : 'Roll Number'}
            </label>
            <input
              type="number"
              min="1"
              required
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="e.g. 1"
              className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none font-mono"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-[#D6A545] hover:bg-[#b88628] text-school-navy font-bold px-6 py-2.5 rounded shadow text-xs sm:text-sm transition-all"
          >
            <Search className="w-4 h-4" />
            <span>{language === 'bn' ? 'ফলাফল অনুসন্ধান' : 'Find Result'}</span>
          </button>
        </div>
      </form>

      {/* Result Display / Marksheet */}
      {searched && (
        <div>
          {searchResult ? (
            <div className="bg-white rounded-lg border border-school-border shadow-academic p-6 sm:p-8 space-y-6 printable-document">
              {/* Marksheet Institutional Header */}
              <div className="border-b-2 border-school-navy pb-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 relative bg-white rounded p-1 border border-school-border">
                    <Image
                      src={SCHOOL_CONFIG.branding.logoUrl}
                      alt={SCHOOL_CONFIG.identity.nameEn}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-school-navy font-serif-heading">
                      {SCHOOL_CONFIG.identity.nameEn}
                    </h2>
                    <p className="text-sm font-bold text-school-academic font-bengali">
                      {SCHOOL_CONFIG.identity.nameBn}
                    </p>
                    <p className="text-[11px] text-slate-600 font-mono">
                      EIIN: {SCHOOL_CONFIG.identity.eiin} • {SCHOOL_CONFIG.identity.brandingEstd} • {SCHOOL_CONFIG.contact.fullAddress}
                    </p>
                  </div>
                </div>

                <div className="text-center sm:text-right no-print">
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 bg-school-navy hover:bg-school-academic text-white px-4 py-2 rounded text-xs font-bold shadow"
                  >
                    <Printer className="w-4 h-4 text-school-gold" />
                    <span>{language === 'bn' ? 'মার্কশিট প্রিন্ট' : 'Print Marksheet'}</span>
                  </button>
                </div>
              </div>

              {/* Exam Title Badge */}
              <div className="text-center py-1 bg-school-cream/60 rounded border border-school-border">
                <h3 className="text-base sm:text-lg font-bold text-school-navy uppercase tracking-wide">
                  Academic Transcript / Marksheet
                </h3>
                <p className="text-xs text-school-academic font-semibold">
                  {searchResult.examinationName} ({searchResult.academicYear})
                </p>
              </div>

              {/* Student Metadata Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded border">
                <div>
                  <span className="text-slate-500 block">Student Name:</span>
                  <span className="font-bold text-school-navy">{searchResult.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Student ID:</span>
                  <span className="font-bold font-mono text-school-navy">{searchResult.studentId}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Class & Section:</span>
                  <span className="font-bold text-school-navy">{searchResult.className} - {searchResult.sectionName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Roll Number:</span>
                  <span className="font-bold font-mono text-school-navy">{searchResult.rollNumber}</span>
                </div>
              </div>

              {/* Subject Wise Marks Table */}
              <div className="overflow-x-auto border border-school-border rounded">
                <table className="w-full text-xs text-left">
                  <thead className="bg-school-navy text-white">
                    <tr>
                      <th className="py-2.5 px-3">Subject Name</th>
                      <th className="py-2.5 px-3">Code</th>
                      <th className="py-2.5 px-3 text-center">Max</th>
                      <th className="py-2.5 px-3 text-center">Pass</th>
                      <th className="py-2.5 px-3 text-center">Marks Obtained</th>
                      <th className="py-2.5 px-3 text-center">Grade</th>
                      <th className="py-2.5 px-3 text-center">GPA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {searchResult.subjects.map((sub, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="py-2 px-3 font-semibold text-school-navy">{sub.subjectName}</td>
                        <td className="py-2 px-3 font-mono text-slate-600">{sub.subjectCode}</td>
                        <td className="py-2 px-3 text-center font-mono">{sub.maxMarks}</td>
                        <td className="py-2 px-3 text-center font-mono">{sub.passMarks}</td>
                        <td className="py-2 px-3 text-center font-bold font-mono text-school-navy">{sub.marksObtained}</td>
                        <td className="py-2 px-3 text-center font-bold text-amber-700">{sub.gradeLetter}</td>
                        <td className="py-2 px-3 text-center font-mono font-semibold">{sub.gpaPoint.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-amber-50 font-bold border-t-2 border-slate-300">
                    <tr>
                      <td colSpan={4} className="py-2.5 px-3 text-right text-school-navy">
                        Total Marks & Evaluation Summary:
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-school-navy text-sm">
                        {searchResult.totalMarks} / {searchResult.totalMaxMarks}
                      </td>
                      <td className="py-2.5 px-3 text-center text-sm text-school-academic">
                        Grade: {searchResult.finalGrade}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono text-sm text-school-navy">
                        GPA: {searchResult.finalGPA.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Status and Signatures */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center pt-2">
                <div className="flex items-center gap-3">
                  {searchResult.resultStatus === 'Passed' ? (
                    <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded text-xs">
                      <CheckCircle className="w-4 h-4" />
                      <span>Result Status: PASSED</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 bg-rose-100 text-rose-800 font-bold px-3 py-1.5 rounded text-xs">
                      <XCircle className="w-4 h-4" />
                      <span>Result Status: FAILED</span>
                    </div>
                  )}

                  {searchResult.classRank && (
                    <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2.5 py-1.5 rounded">
                      Class Rank: #{searchResult.classRank}
                    </span>
                  )}
                </div>

                <div className="text-right text-xs text-slate-500 italic">
                  Remarks: {searchResult.remarks || 'Standard Performance'}
                </div>
              </div>

              {/* Official Signatures Row */}
              <div className="pt-16 grid grid-cols-3 gap-6 text-center text-xs text-slate-700">
                <div className="border-t border-slate-400 pt-1 font-semibold">
                  Prepared By
                </div>
                <div className="border-t border-slate-400 pt-1 font-semibold">
                  Class Teacher
                </div>
                <div className="border-t border-slate-400 pt-1 font-semibold text-school-navy">
                  Head of Institution / Principal
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-300 text-amber-900 p-5 rounded-lg flex items-center gap-3 text-xs sm:text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-700" />
              <div>
                <p className="font-bold">No published result found!</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Please verify that the Roll Number ({rollNumber}), Class ({selectedClass}), and Examination ({examName}) are accurate, and that the administration has officially published the marks.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
