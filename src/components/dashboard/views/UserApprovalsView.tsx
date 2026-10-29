'use client';

import React, { useState } from 'react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { 
  ShieldCheck, UserCheck, GraduationCap, CheckCircle2, 
  XCircle, Plus, Search, Filter, AlertTriangle, KeyRound, X 
} from 'lucide-react';
import { AuthAccount, UserRole } from '@/types';

export const UserApprovalsView: React.FC = () => {
  const { authAccounts, approveAccount, toggleAccountStatus, createAccount } = useSchoolStore();

  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newAcc, setNewAcc] = useState({
    loginId: '',
    email: '',
    passwordHash: '',
    role: 'teacher' as UserRole,
    nameEn: '',
    nameBn: '',
  });

  const filtered = authAccounts.filter(acc => {
    const matchRole = filterRole === 'all' || acc.role === filterRole;
    const matchStatus = filterStatus === 'all' || acc.status === filterStatus;
    const q = searchTerm.toLowerCase();
    const matchSearch = !q || 
      acc.nameEn.toLowerCase().includes(q) || 
      acc.loginId.toLowerCase().includes(q) ||
      acc.email.toLowerCase().includes(q);
    return matchRole && matchStatus && matchSearch;
  });

  const pendingCount = authAccounts.filter(a => a.status === 'pending_approval').length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAcc.loginId || !newAcc.passwordHash || !newAcc.nameEn) {
      alert('Please fill out all mandatory fields.');
      return;
    }

    createAccount({
      loginId: newAcc.loginId,
      email: newAcc.email || `${newAcc.loginId.toLowerCase()}@hpscctg.edu.bd`,
      passwordHash: newAcc.passwordHash,
      role: newAcc.role,
      nameEn: newAcc.nameEn,
      nameBn: newAcc.nameBn || newAcc.nameEn,
      status: 'active',
      isApproved: true,
    });

    setShowAddModal(false);
    setNewAcc({
      loginId: '',
      email: '',
      passwordHash: '',
      role: 'teacher',
      nameEn: '',
      nameBn: '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#082E50] to-[#124C7C] text-white p-5 rounded-lg shadow-academic flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-school-lightGold px-2.5 py-0.5 rounded text-[11px] font-bold border border-amber-400/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Super Admin & Owner Control Center (মালিকানা ও সর্বময় নিয়ন্ত্রণ)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-serif-heading mt-1.5">
            User Accounts & Approval Authority
          </h2>
          <p className="text-xs text-slate-200 mt-0.5">
            You hold master administrative privileges to approve, create, and manage Teachers, Editors, and Student IDs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {pendingCount > 0 && (
            <div className="bg-rose-500/30 text-rose-200 border border-rose-400/40 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-rose-300" />
              <span>{pendingCount} Pending Approvals</span>
            </div>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 bg-school-gold hover:bg-yellow-400 text-school-navy text-xs font-extrabold px-3.5 py-2 rounded shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New User / Editor</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-lg border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="text-xs p-2 rounded border border-school-border bg-white font-semibold"
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admins</option>
            <option value="teacher">Teachers & Editors</option>
            <option value="student">Students</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs p-2 rounded border border-school-border bg-white font-semibold"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active (Approved)</option>
            <option value="pending_approval">Pending Approval</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs p-2 pl-8 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Accounts List Table */}
      <div className="bg-white rounded-lg border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Login ID</th>
                <th className="py-2.5 px-3">Account Holder Name</th>
                <th className="py-2.5 px-3">Assigned Role</th>
                <th className="py-2.5 px-3">Email Address</th>
                <th className="py-2.5 px-3 text-center">Approval Status</th>
                <th className="py-2.5 px-3 text-center">Owner Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map(acc => (
                <tr key={acc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-school-navy">
                    {acc.loginId}
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-school-navy">
                    <div>{acc.nameEn}</div>
                    <div className="text-[11px] text-slate-500 font-bengali">{acc.nameBn}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      acc.role === 'super_admin' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                      acc.role === 'teacher' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                      'bg-blue-100 text-blue-900 border border-blue-300'
                    }`}>
                      {acc.role === 'super_admin' ? 'Super Admin (Owner)' :
                       acc.role === 'teacher' ? 'Teacher & Editor' : 'Student'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{acc.email}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      acc.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                      acc.status === 'pending_approval' ? 'bg-amber-100 text-amber-800 animate-pulse' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {acc.status === 'pending_approval' ? 'Pending Approval' : acc.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Approve Button for Pending Accounts */}
                      {acc.status === 'pending_approval' && (
                        <button
                          onClick={() => approveAccount(acc.id)}
                          className="inline-flex items-center gap-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] px-2.5 py-1 rounded shadow-sm transition-colors"
                          title="Approve this Account"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>অনুমোদন দিন (Approve)</span>
                        </button>
                      )}

                      {/* Suspend / Activate Toggle */}
                      {acc.role !== 'super_admin' && acc.status !== 'pending_approval' && (
                        <button
                          onClick={() => toggleAccountStatus(acc.id, acc.status === 'active' ? 'suspended' : 'active')}
                          className={`text-[11px] font-bold px-2 py-1 rounded border transition-colors ${
                            acc.status === 'active'
                              ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-300'
                          }`}
                        >
                          {acc.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      )}

                      {acc.role === 'super_admin' && (
                        <span className="text-[10px] text-slate-400 font-mono italic">Primary Owner</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE NEW USER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg border border-school-border max-w-md w-full p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 p-1 hover:bg-slate-100 rounded-full text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-school-navy border-b pb-2 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-school-gold" />
              <span>Create New User & Assign Portal Role</span>
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-school-navy mb-1">Select User Role</label>
                <select
                  value={newAcc.role}
                  onChange={(e) => setNewAcc({ ...newAcc, role: e.target.value as UserRole })}
                  className="w-full p-2 rounded border bg-white font-semibold"
                >
                  <option value="teacher">Teacher & Editor (কোর্স ও লেকচার এডিটর)</option>
                  <option value="student">Student (শিক্ষার্থী পোর্টাল)</option>
                  <option value="super_admin">Super Admin / Owner (সহকারী নিয়ন্ত্রক)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Full Name (English)*</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Selim Reza"
                  value={newAcc.nameEn}
                  onChange={(e) => setNewAcc({ ...newAcc, nameEn: e.target.value })}
                  className="w-full p-2 rounded border"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Full Name (Bengali)</label>
                <input
                  type="text"
                  placeholder="যেমন: সেলিম রেজা"
                  value={newAcc.nameBn}
                  onChange={(e) => setNewAcc({ ...newAcc, nameBn: e.target.value })}
                  className="w-full p-2 rounded border font-bengali"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Login ID / Username*</label>
                <input
                  type="text"
                  required
                  placeholder={newAcc.role === 'teacher' ? 'EMP-007' : newAcc.role === 'student' ? 'HPSC-2026-0806' : 'admin_sec'}
                  value={newAcc.loginId}
                  onChange={(e) => setNewAcc({ ...newAcc, loginId: e.target.value })}
                  className="w-full p-2 rounded border font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="user@hpscctg.edu.bd"
                  value={newAcc.email}
                  onChange={(e) => setNewAcc({ ...newAcc, email: e.target.value })}
                  className="w-full p-2 rounded border font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Password*</label>
                <input
                  type="text"
                  required
                  placeholder="Set initial password"
                  value={newAcc.passwordHash}
                  onChange={(e) => setNewAcc({ ...newAcc, passwordHash: e.target.value })}
                  className="w-full p-2 rounded border font-mono"
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
                  Create & Activate Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
