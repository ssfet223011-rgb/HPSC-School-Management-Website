'use client';

import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Calendar, Printer, Globe, Shield } from 'lucide-react';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { SCHOOL_CONFIG } from '@/config/school.config';
import Link from 'next/link';

export const TopBar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [dhakaTime, setDhakaTime] = useState<string>('Saturday, 29 October 2026 10:10:14 AM');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Asia/Dhaka',
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
        const formatter = new Intl.DateTimeFormat(language === 'bn' ? 'bn-BD' : 'en-US', options);
        setDhakaTime(formatter.format(now));
      } catch {
        setDhakaTime(SCHOOL_CONFIG.branding.referenceTimestamp);
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [language]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="bg-school-navy text-white text-xs border-b border-[#0f3d64] select-none no-print">
      <div className="max-w-7xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-y-2">
        {/* Contact Info (Left) */}
        <div className="flex flex-wrap items-center gap-4 text-slate-200">
          <a 
            href={`tel:${SCHOOL_CONFIG.contact.primaryMobile}`}
            className="flex items-center gap-1.5 hover:text-school-lightGold transition-colors"
            title="Primary Mobile"
          >
            <Phone className="w-3.5 h-3.5 text-school-gold" />
            <span>{SCHOOL_CONFIG.contact.primaryMobile}</span>
          </a>
          <span className="hidden sm:inline text-slate-500">|</span>
          <a 
            href={`mailto:${SCHOOL_CONFIG.contact.email}`}
            className="flex items-center gap-1.5 hover:text-school-lightGold transition-colors"
            title="School Email"
          >
            <Mail className="w-3.5 h-3.5 text-school-gold" />
            <span>{SCHOOL_CONFIG.contact.email}</span>
          </a>
          <span className="hidden md:inline text-slate-500">|</span>
          <div className="hidden md:flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-school-gold" />
            <span>Halishahar, Chattogram</span>
          </div>
        </div>

        {/* Live Date, Time & Tools (Right) */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <div className="hidden lg:flex items-center gap-1.5 text-amber-200/90 font-mono text-[11px] bg-black/20 px-2.5 py-0.5 rounded border border-amber-500/20">
            <Calendar className="w-3.5 h-3.5 text-school-gold" />
            <span>{dhakaTime}</span>
          </div>

          {/* Quick Print Shortcut */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 text-slate-200 hover:text-school-lightGold transition-colors px-1.5 py-0.5"
            title="Print Current Page"
          >
            <Printer className="w-3.5 h-3.5 text-school-gold" />
            <span className="hidden sm:inline">{t('printSurvey')}</span>
          </button>

          <span className="text-slate-500">|</span>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-white/10 rounded px-1.5 py-0.5 border border-white/20">
            <Globe className="w-3 h-3 text-school-gold" />
            <button
              onClick={() => setLanguage('bn')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                language === 'bn' 
                  ? 'bg-school-gold text-school-navy font-bold' 
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                language === 'en' 
                  ? 'bg-school-gold text-school-navy font-bold' 
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          <span className="text-slate-500">|</span>

          {/* ERP Portal Link */}
          <Link
            href="/dashboard"
            className="flex items-center gap-1 bg-school-gold/20 hover:bg-school-gold hover:text-school-navy text-school-lightGold px-2 py-0.5 rounded text-[11px] font-semibold transition-all border border-school-gold/40"
          >
            <Shield className="w-3 h-3" />
            <span>ERP Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
