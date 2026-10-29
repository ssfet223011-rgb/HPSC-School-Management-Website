'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { 
  Megaphone, Search, Calendar, FileText, Download, 
  Printer, X, Eye, AlertTriangle 
} from 'lucide-react';
import { NoticeItem } from '@/types';

export default function NoticesPage() {
  const { language } = useLanguage();
  const { notices } = useSchoolStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalNotice, setActiveModalNotice] = useState<NoticeItem | null>(null);

  const filteredNotices = notices.filter(n => {
    if (!n.isPublished) return false;
    const matchesCat = selectedCategory === 'all' || n.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      n.titleEn.toLowerCase().includes(q) || 
      n.titleBn.toLowerCase().includes(q) ||
      n.contentEn.toLowerCase().includes(q) ||
      n.contentBn.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="no-print">
        <Breadcrumb
          items={[
            { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
            { label: language === 'bn' ? 'নোটিশ বোর্ড' : 'Notice Board' },
          ]}
        />
      </div>

      {/* Header Banner */}
      <div className="bg-school-navy text-white p-6 sm:p-8 rounded-lg shadow-academic flex flex-col md:flex-row items-center justify-between gap-4 no-print">
        <div>
          <span className="text-xs font-bold text-school-lightGold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
            Official Announcements
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-heading mt-2">
            {language === 'bn' ? 'বিদ্যালয় নোটিশ বোর্ড' : 'School Notice Board'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-bengali">
            {SCHOOL_CONFIG.identity.nameEn} (EIIN: {SCHOOL_CONFIG.identity.eiin})
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 p-3 rounded-lg border border-white/20 text-xs">
          <Megaphone className="w-5 h-5 text-school-gold" />
          <span>{language === 'bn' ? 'সকল আনুষ্ঠানিক নোটিশ এখানে প্রদর্শিত' : 'All Verified Institutional Notices'}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-lg border border-school-border p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['all', 'academic', 'exam', 'admin', 'admission'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider transition-all ${
                selectedCategory === cat 
                  ? 'bg-school-navy text-white shadow' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder={language === 'bn' ? 'নোটিশ খুঁজুন...' : 'Search notices...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs p-2 pl-8 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Notice List */}
      <div className="space-y-3 no-print">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-lg border border-school-border p-4 sm:p-5 shadow-sm hover:border-school-gold transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    n.priority === 'urgent' ? 'bg-rose-100 text-rose-800' :
                    n.priority === 'important' ? 'bg-amber-100 text-amber-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {n.priority}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">
                    {n.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-school-gold" />
                    {n.publishDate}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-school-navy font-bengali">
                  {language === 'bn' ? n.titleBn : n.titleEn}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 font-bengali max-w-3xl">
                  {language === 'bn' ? n.contentBn : n.contentEn}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setActiveModalNotice(n)}
                  className="inline-flex items-center gap-1.5 bg-school-cream hover:bg-amber-100 text-school-navy font-bold text-xs px-3.5 py-2 rounded border border-school-border shadow-sm transition-all"
                >
                  <Eye className="w-3.5 h-3.5 text-school-gold" />
                  <span>{language === 'bn' ? 'বিস্তারিত পড়ুন' : 'View Full Notice'}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg border border-school-border p-8 text-center text-slate-500 text-xs sm:text-sm">
            No notices found matching the criteria.
          </div>
        )}
      </div>

      {/* Notice Reader Modal & Printable View */}
      {activeModalNotice && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-lg border border-school-border max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 printable-document">
            {/* Modal Close Button (no-print) */}
            <button
              onClick={() => setActiveModalNotice(null)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-500 no-print"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Notice Header */}
            <div className="border-b-2 border-school-navy pb-4 flex items-center gap-4 text-left">
              <div className="w-16 h-16 relative bg-white rounded p-1 border border-school-border shrink-0">
                <Image
                  src={SCHOOL_CONFIG.branding.logoUrl}
                  alt={SCHOOL_CONFIG.identity.nameEn}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-school-navy font-serif-heading">
                  {SCHOOL_CONFIG.identity.nameEn}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-school-academic font-bengali">
                  {SCHOOL_CONFIG.identity.nameBn} • EIIN: {SCHOOL_CONFIG.identity.eiin}
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {SCHOOL_CONFIG.contact.fullAddress}
                </p>
              </div>
            </div>

            {/* Notice Title & Date */}
            <div className="mt-4 pb-2 border-b border-slate-200">
              <div className="flex justify-between items-center text-xs text-slate-500 mb-1">
                <span>স্মারক নম্বর: HPSC/NOTICE/2026/04</span>
                <span className="font-mono">তারিখ: {activeModalNotice.publishDate}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-school-navy font-bengali">
                {language === 'bn' ? activeModalNotice.titleBn : activeModalNotice.titleEn}
              </h3>
            </div>

            {/* Notice Content */}
            <div className="py-6 text-xs sm:text-sm leading-relaxed text-school-body font-bengali space-y-4">
              <p>{language === 'bn' ? activeModalNotice.contentBn : activeModalNotice.contentEn}</p>
            </div>

            {/* Official Signoff Box */}
            <div className="pt-12 flex justify-end text-center text-xs">
              <div>
                <div className="border-t border-slate-700 pt-1 font-bold text-school-navy">
                  অধ্যক্ষ / প্রতিষ্ঠান প্রধান
                </div>
                <div className="text-slate-500 font-bengali text-[11px]">
                  {SCHOOL_CONFIG.identity.nameBn}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center no-print">
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 bg-school-navy hover:bg-school-academic text-white px-4 py-2 rounded text-xs font-bold shadow"
              >
                <Printer className="w-4 h-4 text-school-gold" />
                <span>{language === 'bn' ? 'নোটিশ প্রিন্ট করুন' : 'Print Official Notice'}</span>
              </button>

              <button
                onClick={() => setActiveModalNotice(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
