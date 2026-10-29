'use client';

import React from 'react';
import { 
  Users, UserCheck, BookOpen, GraduationCap, 
  CreditCard, ClipboardCheck, Megaphone, CalendarDays, ArrowUpRight 
} from 'lucide-react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';

export const OverviewView: React.FC = () => {
  const { students, staff, classes, sections, admissions, invoices, notices } = useSchoolStore();

  const totalStudents = students.length;
  const totalStaff = staff.length;
  const pendingAdmissions = admissions.filter(a => a.status === 'new' || a.status === 'under_review').length;
  const totalDue = invoices.filter(i => i.status === 'unpaid').reduce((acc, curr) => acc + (curr.netAmount - curr.paidAmount), 0);
  const totalCollected = invoices.reduce((acc, curr) => acc + curr.paidAmount, 0);

  // Enrollment by class chart data
  const classEnrollmentData = classes.map(c => {
    const count = students.filter(s => s.className === c.nameEn).length;
    return { name: c.nameEn, count };
  });

  // Sample weekly attendance data
  const attendanceTrend = [
    { day: 'Sat', rate: 94 },
    { day: 'Sun', rate: 96 },
    { day: 'Mon', rate: 92 },
    { day: 'Tue', rate: 95 },
    { day: 'Wed', rate: 97 },
    { day: 'Thu', rate: 91 },
  ];

  // Fee collection status
  const feeData = [
    { name: 'Collected', value: totalCollected || 1000 },
    { name: 'Pending Dues', value: totalDue || 500 },
  ];
  const COLORS = ['#198754', '#d97706'];

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Students */}
        <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Active Students</span>
            <div className="text-2xl font-extrabold text-school-navy mt-1">{totalStudents}</div>
            <span className="text-[11px] text-emerald-700 font-medium">Secondary (Grades 6-10)</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 text-school-academic flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Teachers */}
        <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Faculty & Staff</span>
            <div className="text-2xl font-extrabold text-school-navy mt-1">{totalStaff}</div>
            <span className="text-[11px] text-emerald-700 font-medium">Qualified Teachers</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Pending Admissions */}
        <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Pending Admissions</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">{pendingAdmissions}</div>
            <span className="text-[11px] text-slate-500 font-medium">Under Review Desk</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Fee Collection */}
        <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase">Fee Collection</span>
            <div className="text-2xl font-extrabold text-school-navy mt-1 font-mono">৳{totalCollected}</div>
            <span className="text-[11px] text-rose-600 font-medium font-mono">৳{totalDue} Pending Dues</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-700 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Trend Chart */}
        <div className="lg:col-span-8 bg-white p-5 rounded-lg border border-school-border shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-xs font-bold text-school-navy uppercase tracking-wider">
              Student Attendance Rate (Past Week %)
            </h3>
            <span className="text-xs font-bold text-emerald-700">Avg 94.2%</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend}>
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} />
                <YAxis domain={[80, 100]} stroke="#64748B" fontSize={11} />
                <Tooltip />
                <Area type="monotone" dataKey="rate" stroke="#124C7C" fill="#124C7C20" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection Status Pie */}
        <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-school-border shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-xs font-bold text-school-navy uppercase tracking-wider">
              Fee Collection Ratio
            </h3>
          </div>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={feeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label>
                  {feeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Admissions Review */}
      <div className="bg-white rounded-lg border border-school-border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between bg-slate-50">
          <h3 className="text-xs font-bold text-school-navy uppercase tracking-wider">
            Recent Admission Applications Queue
          </h3>
          <span className="text-xs text-slate-500 font-mono">Total: {admissions.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#f8f6f0] text-school-navy font-bold">
              <tr>
                <th className="py-2.5 px-3">Ref No</th>
                <th className="py-2.5 px-3">Applicant Name</th>
                <th className="py-2.5 px-3">Desired Class</th>
                <th className="py-2.5 px-3">Guardian Contact</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Submitted At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {admissions.slice(0, 4).map(app => (
                <tr key={app.id}>
                  <td className="py-2.5 px-3 font-mono font-bold text-school-navy">{app.applicationNo}</td>
                  <td className="py-2.5 px-3 font-semibold">{app.applicantNameEn}</td>
                  <td className="py-2.5 px-3">{app.desiredClass}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{app.guardianPhone}</td>
                  <td className="py-2.5 px-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-amber-100 text-amber-900">
                      {app.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{app.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
