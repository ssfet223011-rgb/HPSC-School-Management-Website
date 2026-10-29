'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { BookMarked, Search, CheckCircle, BookOpen, ShieldCheck } from 'lucide-react';

export default function LibraryPage() {
  const { language } = useLanguage();
  const { libraryBooks } = useSchoolStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = libraryBooks.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.accessionNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
          { label: language === 'bn' ? 'পাঠাগার ও লাইব্রেরি' : 'School Library' },
        ]}
      />

      <div className="bg-school-navy text-white p-6 sm:p-8 rounded-lg shadow-academic flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-school-lightGold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
            Knowledge Resource Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-heading mt-2">
            {language === 'bn' ? 'বিদ্যালয় কেন্দ্রীয় লাইব্রেরি ও বুক ক্যাটালগ' : 'Central School Library Catalog'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-bengali">
            {SCHOOL_CONFIG.identity.nameEn} • EIIN: {SCHOOL_CONFIG.identity.eiin}
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder={language === 'bn' ? 'বইয়ের নাম, লেখক বা ক্যাটাগরি...' : 'Search books, author, ISBN...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs p-2.5 pl-8 rounded bg-white text-school-navy focus:outline-none focus:ring-2 focus:ring-school-gold"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Catalog Table */}
      <div className="bg-white rounded-lg border border-school-border shadow-academic overflow-hidden">
        <div className="bg-[#124C7C] text-white px-4 py-3 flex items-center justify-between">
          <h3 className="font-bold text-sm flex items-center gap-2">
            <BookMarked className="w-4 h-4 text-school-gold" />
            <span>Available Books & Reference Volumes</span>
          </h3>
          <span className="text-xs text-amber-200">
            Total Books: {filtered.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#f8f6f0] text-school-navy border-b border-school-border font-bold">
              <tr>
                <th className="py-2.5 px-3">Accession No</th>
                <th className="py-2.5 px-3">Book Title</th>
                <th className="py-2.5 px-3">Author</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-center">Available</th>
                <th className="py-2.5 px-3">Shelf Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map(book => (
                <tr key={book.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-mono font-bold text-school-navy">{book.accessionNo}</td>
                  <td className="py-2.5 px-3 font-semibold text-school-navy">{book.title}</td>
                  <td className="py-2.5 px-3 text-slate-700">{book.author}</td>
                  <td className="py-2.5 px-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium">
                      {book.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="font-mono font-bold text-emerald-700">
                      {book.availableCopies} / {book.totalCopies}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{book.shelfLocation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
