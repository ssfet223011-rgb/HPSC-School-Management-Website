'use client';

import React, { useState } from 'react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { UserCheck, Plus, Search, Mail, Phone, Trash2, X, Camera } from 'lucide-react';
import { TeacherStaff } from '@/types';
import { DeviceFileUpload } from '@/components/ui/DeviceFileUpload';

export const TeachersView: React.FC = () => {
  const { staff, addTeacher } = useSchoolStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newStaff, setNewStaff] = useState<Partial<TeacherStaff>>({
    nameEn: '',
    nameBn: '',
    designation: 'Assistant Teacher',
    department: 'General Academic',
    qualification: 'M.A / M.Sc, B.Ed',
    phone: '',
    email: '',
    status: 'active',
    photoUrl: '',
  });

  const filtered = staff.filter(s => 
    s.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.nameEn || !newStaff.phone) {
      alert('Please fill out name and phone number.');
      return;
    }

    addTeacher({
      employeeId: `EMP-${(staff.length + 1).toString().padStart(3, '0')}`,
      nameEn: newStaff.nameEn!,
      nameBn: newStaff.nameBn || newStaff.nameEn!,
      designation: newStaff.designation || 'Assistant Teacher',
      department: newStaff.department || 'Academic',
      qualification: newStaff.qualification || 'M.A, B.Ed',
      phone: newStaff.phone!,
      email: newStaff.email || `${newStaff.nameEn?.toLowerCase().replace(/\s+/g, '')}@hpscctg.edu.bd`,
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'active',
      photoUrl: newStaff.photoUrl || undefined,
      assignedClasses: ['Class 8', 'Class 9'],
      assignedSubjects: ['General Mathematics'],
    });

    setShowAddModal(false);
    setNewStaff({
      nameEn: '',
      nameBn: '',
      designation: 'Assistant Teacher',
      department: 'General Academic',
      qualification: 'M.A / M.Sc, B.Ed',
      phone: '',
      email: '',
      status: 'active',
      photoUrl: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-school-navy flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-school-gold" />
            <span>Faculty & Staff Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Official records of teachers, designations, qualifications, and class assignments.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 bg-school-navy hover:bg-school-academic text-white text-xs font-bold px-3.5 py-2 rounded shadow transition-all"
        >
          <Plus className="w-4 h-4 text-school-gold" />
          <span>Add New Teacher / Staff</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-lg border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Emp ID</th>
                <th className="py-2.5 px-3">Name</th>
                <th className="py-2.5 px-3">Designation & Department</th>
                <th className="py-2.5 px-3">Qualification</th>
                <th className="py-2.5 px-3">Phone & Email</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map(st => (
                <tr key={st.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-school-navy">{st.employeeId}</td>
                  <td className="py-2.5 px-3 font-semibold text-school-navy">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-school-cream border border-school-border flex items-center justify-center shrink-0">
                        {st.photoUrl ? (
                          <img src={st.photoUrl} alt={st.nameEn} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs font-bold text-school-navy">{st.nameEn.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <div>{st.nameEn}</div>
                        <div className="text-[11px] text-slate-500 font-bengali">{st.nameBn}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-amber-900 block">{st.designation}</span>
                    <span className="text-[11px] text-slate-500">{st.department}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{st.qualification}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">
                    <div>{st.phone}</div>
                    <div className="text-[11px] text-slate-400">{st.email}</div>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800">
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg border border-school-border max-w-md w-full p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 p-1 hover:bg-slate-100 rounded-full text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-school-navy border-b pb-2">
              Add New Faculty / Staff Member
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-school-navy mb-1">Full Name (English)*</label>
                <input
                  type="text"
                  required
                  value={newStaff.nameEn}
                  onChange={(e) => setNewStaff({ ...newStaff, nameEn: e.target.value })}
                  className="w-full p-2 rounded border"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Full Name (Bengali)</label>
                <input
                  type="text"
                  value={newStaff.nameBn}
                  onChange={(e) => setNewStaff({ ...newStaff, nameBn: e.target.value })}
                  className="w-full p-2 rounded border font-bengali"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Designation</label>
                <input
                  type="text"
                  value={newStaff.designation}
                  onChange={(e) => setNewStaff({ ...newStaff, designation: e.target.value })}
                  className="w-full p-2 rounded border"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Academic Qualification</label>
                <input
                  type="text"
                  value={newStaff.qualification}
                  onChange={(e) => setNewStaff({ ...newStaff, qualification: e.target.value })}
                  className="w-full p-2 rounded border"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Phone Number*</label>
                <input
                  type="tel"
                  required
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  className="w-full p-2 rounded border font-mono"
                />
              </div>

              {/* Teacher Photo Upload from Device */}
              <div className="pt-2">
                <DeviceFileUpload
                  accept="image/*"
                  maxSizeMB={5}
                  label="Upload Teacher Profile Photo from Device"
                  labelBn="কম্পিউটার বা মোবাইল থেকে শিক্ষকের ছবি আপলোড করুন"
                  onFileSelect={(data) => {
                    setNewStaff(prev => ({
                      ...prev,
                      photoUrl: data.dataUrl,
                    }));
                  }}
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
