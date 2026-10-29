'use client';

import React from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { CalendarDays, MapPin, Clock, Tag } from 'lucide-react';

const events = [
  { id: 1, titleEn: 'Annual Examination 2026 Commences', titleBn: '২০২৬ শিক্ষাবর্ষের বার্ষিক পরীক্ষা শুরু', date: '2026-11-20', type: 'Exam', location: 'Examination Halls 1 & 2' },
  { id: 2, titleEn: 'Guardian Assembly & Progress Sharing', titleBn: 'অভিভাবক সমাবেশ ও প্রোগ্রেস কার্ড বিতরণ', date: '2026-11-06', type: 'Meeting', location: 'School Auditorium' },
  { id: 3, titleEn: 'Victory Day Observance & Cultural Festival', titleBn: 'মহান বিজয় দিবস উদযাপন ও সাংস্কৃতিক অনুষ্ঠান', date: '2026-12-16', type: 'Cultural', location: 'Campus Grounds' },
  { id: 4, titleEn: 'Annual Sports & Prize Giving Ceremony', titleBn: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ও পুরস্কার বিতরণ', date: '2026-12-24', type: 'Sports', location: 'Halishahar Stadium' },
];

export default function CalendarPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
          { label: language === 'bn' ? 'একাডেমিক ক্যালেন্ডার ও ইভেন্ট' : 'Calendar & Events' },
        ]}
      />

      <div className="bg-school-navy text-white p-6 sm:p-8 rounded-lg shadow-academic">
        <span className="text-xs font-bold text-school-lightGold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
          Academic Year 2026
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-heading mt-2">
          {language === 'bn' ? 'একাডেমিক ক্যালেন্ডার ও আসন্ন অনুষ্ঠান' : 'Academic Calendar & Upcoming Events'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 font-bengali">
          {SCHOOL_CONFIG.identity.nameEn} (EIIN: {SCHOOL_CONFIG.identity.eiin})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white rounded-lg border border-school-border p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                {ev.type}
              </span>
              <span className="text-xs font-mono font-bold text-school-academic flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5 text-school-gold" />
                {ev.date}
              </span>
            </div>

            <h3 className="text-sm font-bold text-school-navy font-bengali leading-snug">
              {language === 'bn' ? ev.titleBn : ev.titleEn}
            </h3>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <MapPin className="w-3.5 h-3.5 text-school-gold" />
              <span>{ev.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
