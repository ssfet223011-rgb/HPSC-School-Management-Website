'use client';

import React, { useState } from 'react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { Megaphone, Plus, Trash2, Edit3, X, CheckCircle, Calendar } from 'lucide-react';
import { NoticeItem } from '@/types';

export const NoticesManageView: React.FC = () => {
  const { notices, addNotice, deleteNotice } = useSchoolStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const [newNotice, setNewNotice] = useState<Partial<NoticeItem>>({
    titleEn: '',
    titleBn: '',
    contentEn: '',
    contentBn: '',
    category: 'academic',
    priority: 'normal',
    isPublished: true,
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotice.titleEn || !newNotice.contentEn) {
      alert('Please fill out notice title and content.');
      return;
    }

    addNotice({
      titleEn: newNotice.titleEn!,
      titleBn: newNotice.titleBn || newNotice.titleEn!,
      contentEn: newNotice.contentEn!,
      contentBn: newNotice.contentBn || newNotice.contentEn!,
      category: newNotice.category as any,
      priority: newNotice.priority as any,
      isPublished: true,
      publishDate: new Date().toISOString().split('T')[0],
    });

    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-school-navy flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-school-gold" />
            <span>Manage Institutional Notices & Circulars</span>
          </h2>
          <p className="text-xs text-slate-500">
            Publish, edit, and archive announcements visible on the school portal and notice board.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-1.5 bg-school-navy hover:bg-school-academic text-white text-xs font-bold px-3.5 py-2 rounded shadow transition-all"
        >
          <Plus className="w-4 h-4 text-school-gold" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {/* Notices Table */}
      <div className="bg-white rounded-lg border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Title (English & Bengali)</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {notices.map(n => (
                <tr key={n.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3">
                    <strong className="block text-school-navy">{n.titleEn}</strong>
                    <span className="text-[11px] text-slate-500 font-bengali">{n.titleBn}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded uppercase text-[10px] font-bold">
                      {n.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      n.priority === 'urgent' ? 'bg-rose-100 text-rose-800' :
                      n.priority === 'important' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {n.priority}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-500">{n.publishDate}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-emerald-100 text-emerald-800">
                      Published
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => {
                        if (confirm(`Delete notice: "${n.titleEn}"?`)) {
                          deleteNotice(n.id);
                        }
                      }}
                      className="p-1 hover:bg-rose-100 text-rose-600 rounded"
                      title="Delete Notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-lg border border-school-border max-w-xl w-full p-6 shadow-2xl relative my-8 space-y-4">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute right-4 top-4 p-1 hover:bg-slate-100 rounded-full text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base font-bold text-school-navy border-b pb-2">
              Publish New School Notice
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-school-navy mb-1">Notice Title (English)*</label>
                <input
                  type="text"
                  required
                  value={newNotice.titleEn}
                  onChange={(e) => setNewNotice({ ...newNotice, titleEn: e.target.value })}
                  placeholder="e.g. Schedule for Guardian Meeting"
                  className="w-full p-2 rounded border"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Notice Title (Bengali)</label>
                <input
                  type="text"
                  value={newNotice.titleBn}
                  onChange={(e) => setNewNotice({ ...newNotice, titleBn: e.target.value })}
                  placeholder="যেমন: অভিভাবক সমাবেশের তারিখ সংক্রান্ত বিজ্ঞপ্তি"
                  className="w-full p-2 rounded border font-bengali"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-school-navy mb-1">Category</label>
                  <select
                    value={newNotice.category}
                    onChange={(e) => setNewNotice({ ...newNotice, category: e.target.value as any })}
                    className="w-full p-2 rounded border bg-white"
                  >
                    <option value="academic">Academic</option>
                    <option value="exam">Examination</option>
                    <option value="admin">Administrative</option>
                    <option value="holiday">Holiday</option>
                    <option value="admission">Admission</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-school-navy mb-1">Priority</label>
                  <select
                    value={newNotice.priority}
                    onChange={(e) => setNewNotice({ ...newNotice, priority: e.target.value as any })}
                    className="w-full p-2 rounded border bg-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Notice Content (English)*</label>
                <textarea
                  rows={3}
                  required
                  value={newNotice.contentEn}
                  onChange={(e) => setNewNotice({ ...newNotice, contentEn: e.target.value })}
                  className="w-full p-2 rounded border"
                />
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Notice Content (Bengali)</label>
                <textarea
                  rows={3}
                  value={newNotice.contentBn}
                  onChange={(e) => setNewNotice({ ...newNotice, contentBn: e.target.value })}
                  className="w-full p-2 rounded border font-bengali"
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
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
