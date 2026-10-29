'use client';

import React from 'react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { History, Shield, Clock } from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const { auditLogs } = useSchoolStore();

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-school-navy flex items-center gap-2">
            <History className="w-5 h-5 text-school-gold" />
            <span>Immutable System Audit Trail</span>
          </h2>
          <p className="text-xs text-slate-500">
            Records of administrative modifications, results processing, admissions, and role changes.
          </p>
        </div>

        <div className="text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded">
          Logs Recorded: {auditLogs.length}
        </div>
      </div>

      <div className="bg-white rounded-lg border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Action Type</th>
                <th className="py-2.5 px-3">Operator</th>
                <th className="py-2.5 px-3">Role</th>
                <th className="py-2.5 px-3">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 text-slate-500">{log.timestamp}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-bold text-school-navy bg-slate-100 px-1.5 py-0.5 rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{log.userName}</td>
                  <td className="py-2.5 px-3 text-amber-800 uppercase">{log.userRole}</td>
                  <td className="py-2.5 px-3 text-slate-700 font-sans text-xs">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
