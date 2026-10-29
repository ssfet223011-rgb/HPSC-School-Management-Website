'use client';

import React, { useState } from 'react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { 
  GraduationCap, Check, X, Clock, UserCheck, 
  Search, Filter, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { AdmissionApplication } from '@/types';

export const AdmissionsView: React.FC = () => {
  const { admissions, updateAdmissionStatus, admitStudentFromApplication, classes, sections, students } = useSchoolStore();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [admittingApp, setAdmittingApp] = useState<AdmissionApplication | null>(null);
  const [admitRoll, setAdmitRoll] = useState<number>(students.length + 1);

  const filtered = admissions.filter(a => {
    const matchStatus = filterStatus === 'all' || a.status === filterStatus;
    const q = searchTerm.toLowerCase();
    const matchSearch = !q || 
      a.applicantNameEn.toLowerCase().includes(q) || 
      a.applicationNo.toLowerCase().includes(q) ||
      a.guardianPhone.includes(q);
    return matchStatus && matchSearch;
  });

  const handleEnrollConfirm = () => {
    if (!admittingApp) return;
    admitStudentFromApplication(admittingApp.id, 'c-8', 's-8a', admitRoll);
    setAdmittingApp(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-school-navy flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-school-gold" />
            <span>Admission Applications Desk</span>
          </h2>
          <p className="text-xs text-slate-500">
            Review online applicant submissions, verify documents, and admit students.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded">
            Total Applications: {admissions.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-lg border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs p-1.5 rounded border border-school-border bg-white"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="under_review">Under Review</option>
            <option value="accepted">Accepted</option>
            <option value="admitted">Admitted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by name, ref no, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs p-2 pl-8 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Ref No</th>
                <th className="py-2.5 px-3">Applicant Name</th>
                <th className="py-2.5 px-3">Desired Class</th>
                <th className="py-2.5 px-3">Guardian Name & Phone</th>
                <th className="py-2.5 px-3">Submitted</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Desk Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map(app => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-school-navy">{app.applicationNo}</td>
                  <td className="py-2.5 px-3 font-semibold text-school-navy">
                    <div>{app.applicantNameEn}</div>
                    <div className="text-[11px] text-slate-500 font-bengali">{app.applicantNameBn}</div>
                  </td>
                  <td className="py-2.5 px-3 font-medium">{app.desiredClass}</td>
                  <td className="py-2.5 px-3">
                    <div>{app.guardianName}</div>
                    <div className="font-mono text-slate-500 text-[11px]">{app.guardianPhone}</div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{app.submittedAt}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      app.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                      app.status === 'admitted' ? 'bg-blue-100 text-blue-800' :
                      app.status === 'under_review' ? 'bg-amber-100 text-amber-800' :
                      app.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {app.status !== 'admitted' && (
                        <>
                          <button
                            onClick={() => updateAdmissionStatus(app.id, 'accepted', 'Approved by Admission Committee.')}
                            title="Accept Application"
                            className="p-1 hover:bg-emerald-100 text-emerald-700 rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateAdmissionStatus(app.id, 'under_review', 'Document verification in progress.')}
                            title="Mark Under Review"
                            className="p-1 hover:bg-amber-100 text-amber-700 rounded"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateAdmissionStatus(app.id, 'rejected', 'Does not meet minimum requirements.')}
                            title="Reject Application"
                            className="p-1 hover:bg-rose-100 text-rose-700 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {app.status === 'accepted' && (
                        <button
                          onClick={() => { setAdmittingApp(app); setAdmitRoll(students.length + 1); }}
                          className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] px-2.5 py-1 rounded shadow-sm"
                        >
                          Admit & Enroll
                        </button>
                      )}

                      {app.status === 'admitted' && (
                        <span className="text-[11px] font-bold text-blue-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADMIT DIALOG */}
      {admittingApp && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg border border-school-border max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-school-navy border-b pb-2">
              Confirm Student Enrollment
            </h3>

            <p className="text-xs text-slate-600">
              You are admitting applicant <strong>{admittingApp.applicantNameEn}</strong> into active student registry.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-school-navy mb-1">Class</label>
                <input
                  type="text"
                  disabled
                  value={admittingApp.desiredClass}
                  className="w-full p-2 bg-slate-100 rounded border font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Assign Section</label>
                <select className="w-full p-2 rounded border">
                  <option>Section A (Padma)</option>
                  <option>Section B (Meghna)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Assigned Roll Number</label>
                <input
                  type="number"
                  min="1"
                  value={admitRoll}
                  onChange={(e) => setAdmitRoll(Number(e.target.value))}
                  className="w-full p-2 rounded border font-mono font-bold text-school-navy"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <button
                onClick={() => setAdmittingApp(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleEnrollConfirm}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-bold shadow"
              >
                Confirm Enrollment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
