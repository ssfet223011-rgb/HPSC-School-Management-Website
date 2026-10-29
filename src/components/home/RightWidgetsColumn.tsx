'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Users, UserCheck, FileText, CalendarDays, CreditCard, 
  Megaphone, BookMarked, Download, Image as ImageIcon, ChevronRight, GraduationCap 
} from 'lucide-react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { SCHOOL_CONFIG } from '@/config/school.config';

export const RightWidgetsColumn: React.FC = () => {
  const { notices } = useSchoolStore();
  const { language } = useLanguage();

  const quickLinks = [
    { href: '/admission', label: 'Online Admission', icon: UserCheck },
    { href: '/results', label: 'Examination Result', icon: FileText },
    { href: '/calendar', label: 'Academic Calendar', icon: CalendarDays },
    { href: '/dashboard?role=accountant', label: 'Fee Payment', icon: CreditCard },
    { href: '/notices', label: 'Notice Board', icon: Megaphone },
    { href: '/library', label: 'Library', icon: BookMarked },
    { href: '/academic', label: 'Download Forms', icon: Download },
  ];

  // Latest notices (show top 4)
  const displayNotices = notices.slice(0, 4);

  return (
    <aside className="space-y-5 no-print">
      {/* 1. Quick Links Card */}
      <div className="bg-white rounded-lg border border-school-border shadow-academic overflow-hidden">
        <div className="bg-[#082E50] text-white px-4 py-2.5 flex items-center gap-2 border-b-2 border-school-gold">
          <Users className="w-4 h-4 text-school-gold" />
          <h3 className="font-bold text-sm tracking-wide">Quick Links</h3>
        </div>

        <div className="p-1.5 divide-y divide-slate-100">
          {quickLinks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-school-body hover:bg-school-cream hover:text-school-academic rounded transition-colors group"
              >
                <Icon className="w-3.5 h-3.5 text-school-academic group-hover:text-school-gold transition-colors shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2. Latest Notices Card */}
      <div className="bg-white rounded-lg border border-school-border shadow-academic overflow-hidden">
        <div className="bg-[#082E50] text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-school-gold">
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-school-gold" />
            <h3 className="font-bold text-sm tracking-wide">Latest Notices</h3>
          </div>
          <Link
            href="/notices"
            className="text-[11px] font-semibold text-school-lightGold hover:text-white transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="p-2 space-y-2">
          {displayNotices.map((n) => (
            <Link
              key={n.id}
              href="/notices"
              className="block p-2 rounded hover:bg-school-cream/70 transition-colors border border-transparent hover:border-school-border"
            >
              <div className="flex items-start gap-2">
                <FileText className="w-3.5 h-3.5 text-school-academic shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-school-navy truncate font-bengali">
                    {language === 'bn' ? n.titleBn : n.titleEn}
                  </p>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {n.publishDate}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Photo Gallery Card */}
      <div className="bg-white rounded-lg border border-school-border shadow-academic overflow-hidden">
        <div className="bg-[#082E50] text-white px-4 py-2.5 flex items-center justify-between border-b-2 border-school-gold">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-school-gold" />
            <h3 className="font-bold text-sm tracking-wide">Photo Gallery</h3>
          </div>
          <Link
            href="/gallery"
            className="text-[11px] font-semibold text-school-lightGold hover:text-white transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="p-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="relative h-20 rounded overflow-hidden border border-school-border shadow-sm group">
              <Image
                src={SCHOOL_CONFIG.branding.campusMainUrl}
                alt="Campus Entrance"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-20 rounded overflow-hidden border border-school-border shadow-sm group">
              <Image
                src={SCHOOL_CONFIG.branding.campusBannerUrl}
                alt="Campus Building"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-20 rounded overflow-hidden border border-school-border shadow-sm group">
              <Image
                src={SCHOOL_CONFIG.branding.campusMainUrl}
                alt="Sports Event"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="relative h-20 rounded overflow-hidden border border-school-border shadow-sm group">
              <Image
                src={SCHOOL_CONFIG.branding.campusBannerUrl}
                alt="Classroom"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Motivational Quote Card */}
      <div className="bg-gradient-to-br from-[#082E50] to-[#124C7C] text-white p-4 rounded-lg border border-school-gold/40 shadow-academic text-center space-y-2">
        <div className="flex justify-center">
          <GraduationCap className="w-6 h-6 text-school-gold" />
        </div>
        <p className="text-xs font-bengali leading-relaxed text-amber-100 font-medium">
          &ldquo;{SCHOOL_CONFIG.branding.quoteBn}&rdquo;
        </p>
      </div>
    </aside>
  );
};
