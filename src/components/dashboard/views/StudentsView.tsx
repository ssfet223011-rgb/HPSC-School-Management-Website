'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { 
  Users, Plus, Search, Filter, Download, Printer, 
  Trash2, Edit3, Eye, CheckCircle, X, CreditCard 
} from 'lucide-react';
import { StudentRecord } from '@/types';

export const StudentsView: React.FC = () => {
  const { students, classes, sections, addStudent, updateStudent, deleteStudent } = useSchoolStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingStudent, setViewingStudent] = useState<StudentRecord | null>(null);
  const [idCardStudent, setIdCardStudent] = useState<StudentRecord | null>(null);

  // Form State
  const [newStudent, setNewStudent] = useState<Partial<StudentRecord>>({
    nameEn: '',
    nameBn: '',
    gender: 'Male',
    dob: '2012-05-10',
    bloodGroup: 'B+',
    className: 'Class 8',
    sectionName: 'Section A (Padma)',
    rollNumber: 1,
    academicYear: '2026',
    fatherName: '',
    motherName: '',
    primaryPhone: '',
    emergencyContact: '',
    address: 'Halishahar, Chattogram',
    status: 'active',
  });

  const filteredStudents = students.filter(s => {
    const matchClass = filterClass === 'all' || s.className === filterClass;
    const q = searchTerm.toLowerCase();
    const matchSearch = !q || 
      s.nameEn.toLowerCase().includes(q) || 
      s.studentId.toLowerCase().includes(q) ||
      s.rollNumber.toString() === q;
    return matchClass && matchSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.nameEn || !newStudent.primaryPhone) {
      alert('Please provide name and phone number.');
      return;
    }

    const roll = Number(newStudent.rollNumber) || 1;
    const classGrade = classes.find(c => c.nameEn === newStudent.className)?.gradeNumeric || 8;
    const generatedId = `HPSC-2026-${classGrade.toString().padStart(2, '0')}${roll.toString().padStart(2, '0')}`;

    addStudent({
      studentId: generatedId,
      admissionNo: `ADM-2026-${Math.floor(100 + Math.random() * 900)}`,
      nameEn: newStudent.nameEn!,
      nameBn: newStudent.nameBn || newStudent.nameEn!,
      gender: newStudent.gender as any,
      dob: newStudent.dob || '2012-05-10',
      bloodGroup: newStudent.bloodGroup || 'O+',
      classId: 'c-8',
      className: newStudent.className || 'Class 8',
      sectionId: 's-8a',
      sectionName: newStudent.sectionName || 'Section A (Padma)',
      rollNumber: roll,
      academicYear: '2026',
      fatherName: newStudent.fatherName || 'Father',
      motherName: newStudent.motherName || 'Mother',
      primaryPhone: newStudent.primaryPhone!,
      emergencyContact: newStudent.emergencyContact || newStudent.primaryPhone!,
      address: newStudent.address || 'Halishahar, Chattogram',
      status: 'active',
    });

    setShowAddModal(false);
  };

  const exportCSV = () => {
    const headers = ['StudentID,Roll,NameEn,Class,Section,Phone,FatherName,Status'];
    const rows = filteredStudents.map(s => 
      `"${s.studentId}",${s.rollNumber},"${s.nameEn}","${s.className}","${s.sectionName}","${s.primaryPhone}","${s.fatherName}","${s.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Halishahar_Students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-school-border shadow-sm no-print">
        <div>
          <h2 className="text-base font-bold text-school-navy flex items-center gap-2">
            <Users className="w-5 h-5 text-school-gold" />
            <span>Student Registry & Profiles</span>
          </h2>
          <p className="text-xs text-slate-500">
            Total active students enrolled: {students.length}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2 rounded transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 bg-school-navy hover:bg-school-academic text-white text-xs font-bold px-3.5 py-2 rounded shadow transition-all"
          >
            <Plus className="w-4 h-4 text-school-gold" />
            <span>Enroll New Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-lg border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="text-xs p-1.5 rounded border border-school-border bg-white"
          >
            <option value="all">All Classes</option>
            {classes.map(c => (
              <option key={c.id} value={c.nameEn}>{c.nameEn}</option>
            ))}
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by student name, roll or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs p-2 pl-8 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Students Data Table */}
      <div className="bg-white rounded-lg border border-school-border shadow-sm overflow-hidden no-print">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Student ID</th>
                <th className="py-2.5 px-3">Roll</th>
                <th className="py-2.5 px-3">Student Name</th>
                <th className="py-2.5 px-3">Class & Section</th>
                <th className="py-2.5 px-3">Primary Contact</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredStudents.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-school-navy">{st.studentId}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-amber-700">#{st.rollNumber}</td>
                  <td className="py-2.5 px-3 font-semibold text-school-navy">
                    <div>{st.nameEn}</div>
                    <div className="text-[11px] text-slate-500 font-bengali">{st.nameBn}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-700">{st.className}</span>
                    <span className="text-[11px] text-slate-500 block">{st.sectionName}</span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{st.primaryPhone}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800">
                      {st.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => setViewingStudent(st)}
                        title="View Full Profile"
                        className="p-1 hover:bg-slate-200 text-school-academic rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setIdCardStudent(st)}
                        title="Print Student ID Card"
                        className="p-1 hover:bg-amber-100 text-amber-700 rounded"
                      >
                        <CreditCard className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to archive student record ${st.nameEn}?`)) {
                            deleteStudent(st.id);
                          }
                        }}
                        title="Archive Student"
                        className="p-1 hover:bg-rose-100 text-rose-600 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: ENROLL NEW STUDENT */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-lg border border-school-border max-w-xl w-full p-6 shadow-2xl relative my-8">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 p-1 hover:bg-slate-100 rounded-full text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-school-navy border-b pb-2 mb-4">
              Enroll New Student in Registry
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-school-navy mb-1">Student Name (English)*</label>
                  <input
                    type="text"
                    required
                    value={newStudent.nameEn}
                    onChange={(e) => setNewStudent({ ...newStudent, nameEn: e.target.value })}
                    className="w-full p-2 rounded border border-school-border"
                  />
                </div>
                <div>
                  <label className="block font-bold text-school-navy mb-1">Student Name (Bengali)</label>
                  <input
                    type="text"
                    value={newStudent.nameBn}
                    onChange={(e) => setNewStudent({ ...newStudent, nameBn: e.target.value })}
                    className="w-full p-2 rounded border border-school-border"
                  />
                </div>
                <div>
                  <label className="block font-bold text-school-navy mb-1">Class</label>
                  <select
                    value={newStudent.className}
                    onChange={(e) => setNewStudent({ ...newStudent, className: e.target.value })}
                    className="w-full p-2 rounded border border-school-border"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.nameEn}>{c.nameEn}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-school-navy mb-1">Roll Number</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newStudent.rollNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, rollNumber: Number(e.target.value) })}
                    className="w-full p-2 rounded border border-school-border font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-school-navy mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={newStudent.dob}
                    onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                    className="w-full p-2 rounded border border-school-border"
                  />
                </div>
                <div>
                  <label className="block font-bold text-school-navy mb-1">Blood Group</label>
                  <input
                    type="text"
                    value={newStudent.bloodGroup}
                    onChange={(e) => setNewStudent({ ...newStudent, bloodGroup: e.target.value })}
                    className="w-full p-2 rounded border border-school-border font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-school-navy mb-1">Father&apos;s Name</label>
                  <input
                    type="text"
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                    className="w-full p-2 rounded border border-school-border"
                  />
                </div>
                <div>
                  <label className="block font-bold text-school-navy mb-1">Primary Phone*</label>
                  <input
                    type="tel"
                    required
                    value={newStudent.primaryPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, primaryPhone: e.target.value })}
                    className="w-full p-2 rounded border border-school-border font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-school-navy mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={newStudent.address}
                    onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                    className="w-full p-2 rounded border border-school-border"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-school-navy hover:bg-school-academic text-white rounded text-xs font-bold shadow"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: STUDENT PROFILE VIEWER */}
      {viewingStudent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-lg border border-school-border max-w-xl w-full p-6 shadow-2xl relative my-8 printable-document">
            <button
              onClick={() => setViewingStudent(null)}
              className="absolute right-4 top-4 p-1 hover:bg-slate-100 rounded-full text-slate-400 no-print"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b-2 border-school-navy pb-3 flex items-center gap-3">
              <div className="w-12 h-12 relative bg-white rounded p-1 border">
                <Image
                  src={SCHOOL_CONFIG.branding.logoUrl}
                  alt="School Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-base font-bold text-school-navy">Official Student Profile</h3>
                <p className="text-xs text-slate-500 font-mono">{SCHOOL_CONFIG.identity.nameEn}</p>
              </div>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border">
                <div><span className="text-slate-500">Student ID:</span> <strong className="font-mono">{viewingStudent.studentId}</strong></div>
                <div><span className="text-slate-500">Roll No:</span> <strong className="font-mono">#{viewingStudent.rollNumber}</strong></div>
                <div><span className="text-slate-500">Class:</span> <strong>{viewingStudent.className}</strong></div>
                <div><span className="text-slate-500">Section:</span> <strong>{viewingStudent.sectionName}</strong></div>
                <div><span className="text-slate-500">Name (English):</span> <strong>{viewingStudent.nameEn}</strong></div>
                <div><span className="text-slate-500">Name (Bengali):</span> <strong className="font-bengali">{viewingStudent.nameBn}</strong></div>
                <div><span className="text-slate-500">DOB:</span> <strong className="font-mono">{viewingStudent.dob}</strong></div>
                <div><span className="text-slate-500">Blood Group:</span> <strong className="font-mono">{viewingStudent.bloodGroup}</strong></div>
                <div><span className="text-slate-500">Father:</span> <strong>{viewingStudent.fatherName}</strong></div>
                <div><span className="text-slate-500">Primary Contact:</span> <strong className="font-mono">{viewingStudent.primaryPhone}</strong></div>
              </div>
              <div className="p-3 border rounded">
                <span className="text-slate-500 block">Address:</span>
                <span className="text-slate-800">{viewingStudent.address}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t no-print">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 bg-school-navy hover:bg-school-academic text-white px-4 py-2 rounded text-xs font-bold"
              >
                <Printer className="w-4 h-4 text-school-gold" />
                <span>Print Profile</span>
              </button>
              <button
                onClick={() => setViewingStudent(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: STUDENT ID CARD GENERATOR & PRINT */}
      {idCardStudent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg border border-school-border max-w-sm w-full p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setIdCardStudent(null)}
              className="absolute right-3 top-3 p-1 hover:bg-slate-100 rounded-full text-slate-400 no-print"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Configurable Student ID Card View (Print ready) */}
            <div className="w-80 mx-auto bg-gradient-to-b from-white to-[#FBF8F0] border-2 border-school-navy rounded-xl shadow-lg overflow-hidden text-center printable-document">
              {/* Card Header */}
              <div className="bg-school-navy text-white p-3 border-b-2 border-school-gold">
                <div className="w-12 h-12 relative mx-auto bg-white rounded-full p-1 border">
                  <Image
                    src={SCHOOL_CONFIG.branding.logoUrl}
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h4 className="text-[11px] font-extrabold font-serif-heading uppercase tracking-tight mt-1.5">
                  {SCHOOL_CONFIG.identity.nameEn}
                </h4>
                <p className="text-[9px] text-school-lightGold font-semibold">
                  STUDENT IDENTITY CARD • SESSION 2026
                </p>
              </div>

              {/* Student Photo & Details */}
              <div className="p-4 space-y-2">
                <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-school-gold mx-auto flex items-center justify-center text-xl font-bold text-school-navy">
                  {idCardStudent.nameEn.charAt(0)}
                </div>

                <h3 className="text-sm font-extrabold text-school-navy leading-tight">
                  {idCardStudent.nameEn}
                </h3>
                <p className="text-xs font-semibold text-school-academic font-bengali">
                  {idCardStudent.nameBn}
                </p>

                <div className="bg-white border rounded p-2 text-[10px] space-y-1 text-left font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">ID:</span>
                    <span className="font-bold text-school-navy">{idCardStudent.studentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Class & Sec:</span>
                    <span className="font-bold">{idCardStudent.className} ({idCardStudent.sectionName})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Roll:</span>
                    <span className="font-bold text-amber-700">#{idCardStudent.rollNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Blood Group:</span>
                    <span className="font-bold text-rose-700">{idCardStudent.bloodGroup}</span>
                  </div>
                </div>

                {/* Principal Signature */}
                <div className="pt-4 flex justify-between items-end text-[9px] text-slate-500">
                  <div>Holder Signature</div>
                  <div className="text-center">
                    <div className="border-t border-slate-700 px-2 font-bold text-school-navy">
                      Principal
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 pt-2 no-print">
              <button
                onClick={() => window.print()}
                className="bg-school-navy hover:bg-school-academic text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4 text-school-gold" />
                <span>Print ID Card</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
