'use client';

import React, { useState } from 'react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { BookMarked, Search, Plus, BookOpen, Check, ArrowRight } from 'lucide-react';

export const LibraryManageView: React.FC = () => {
  const { libraryBooks, students } = useSchoolStore();
  const [searchTerm, setSearchTerm] = useState('');

  const [issueModalBook, setIssueModalBook] = useState<any | null>(null);
  const [selectedBorrower, setSelectedBorrower] = useState(students[0]?.studentId || '');
  const [dueDate, setDueDate] = useState('2026-11-15');

  const filtered = libraryBooks.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.accessionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueModalBook) return;
    alert(`Book "${issueModalBook.title}" issued to student ${selectedBorrower}. Return due date: ${dueDate}`);
    setIssueModalBook(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-school-navy flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-school-gold" />
            <span>Library Circulation & Catalog Management</span>
          </h2>
          <p className="text-xs text-slate-500">
            Monitor book copies, shelf locations, loans, and issue/return workflows.
          </p>
        </div>

        <div className="text-xs font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1 rounded">
          Catalog Size: {libraryBooks.length} titles
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white rounded-lg border border-school-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#124C7C] text-white">
              <tr>
                <th className="py-2.5 px-3">Accession No</th>
                <th className="py-2.5 px-3">Title & Author</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-center">Available Copies</th>
                <th className="py-2.5 px-3">Shelf Location</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map(book => (
                <tr key={book.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-school-navy">{book.accessionNo}</td>
                  <td className="py-2.5 px-3">
                    <strong className="block text-school-navy">{book.title}</strong>
                    <span className="text-[11px] text-slate-500">{book.author}</span>
                  </td>
                  <td className="py-2.5 px-3">{book.category}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700">
                    {book.availableCopies} / {book.totalCopies}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{book.shelfLocation}</td>
                  <td className="py-2.5 px-3 text-center">
                    <button
                      onClick={() => setIssueModalBook(book)}
                      className="bg-school-navy hover:bg-school-academic text-white px-2.5 py-1 rounded text-[11px] font-bold shadow-sm"
                    >
                      Issue Loan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Book Modal */}
      {issueModalBook && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg border border-school-border max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-school-navy border-b pb-2">
              Issue Book to Student
            </h3>

            <div className="bg-slate-50 p-3 rounded text-xs space-y-1">
              <div>Title: <strong>{issueModalBook.title}</strong></div>
              <div>Accession: <span className="font-mono">{issueModalBook.accessionNo}</span></div>
              <div>Available: <span className="font-mono text-emerald-700 font-bold">{issueModalBook.availableCopies}</span></div>
            </div>

            <form onSubmit={handleIssueSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-school-navy mb-1">Select Student Borrower</label>
                <select
                  value={selectedBorrower}
                  onChange={(e) => setSelectedBorrower(e.target.value)}
                  className="w-full p-2 rounded border bg-white"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.studentId}>
                      {s.nameEn} ({s.studentId} — Roll #{s.rollNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-school-navy mb-1">Return Due Date</label>
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 rounded border font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIssueModalBook(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-school-navy hover:bg-school-academic text-white rounded text-xs font-bold shadow"
                >
                  Confirm Issue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
