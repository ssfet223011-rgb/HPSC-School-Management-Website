'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useLanguage } from '@/lib/localization/LanguageContext';

export const InstitutionalHeader: React.FC = () => {
  const { language } = useLanguage();

  return (
    <header className="bg-white border-b border-school-border relative shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Official School Logo + Institutional Titles */}
        <div className="flex items-center gap-4 sm:gap-6 text-center md:text-left">
          {/* Official Logo */}
          <Link href="/" className="relative flex-shrink-0 group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative p-1 bg-white rounded-lg border border-school-border/80 shadow-academic group-hover:border-school-gold transition-all">
              <Image
                src={SCHOOL_CONFIG.branding.logoUrl}
                alt={SCHOOL_CONFIG.identity.nameEn}
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
          </Link>

          {/* Institutional Typography */}
          <div className="flex flex-col">
            <Link href="/" className="group">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-school-navy tracking-tight font-serif-heading uppercase leading-tight group-hover:text-school-academic transition-colors">
                {SCHOOL_CONFIG.identity.nameEn}
              </h1>
            </Link>

            <div className="flex items-center justify-center md:justify-start gap-2 mt-1">
              <span className="text-xs sm:text-sm font-semibold text-amber-700 italic">
                {SCHOOL_CONFIG.identity.brandingEstd}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-school-academic font-bengali-serif mt-0.5 leading-snug">
              {SCHOOL_CONFIG.identity.nameBn}
            </h2>

            <div className="mt-1 flex items-center justify-center md:justify-start">
              <span className="inline-block bg-school-border/60 text-school-navy text-xs font-bold px-2.5 py-0.5 rounded border border-school-gold/40">
                EIIN: {SCHOOL_CONFIG.identity.eiin}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Campus Banner / Image Area */}
        <div className="hidden lg:block relative w-80 h-24 rounded-lg overflow-hidden border border-school-border shadow-academic group">
          <Image
            src={SCHOOL_CONFIG.branding.campusMainUrl}
            alt="School Campus Banner"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-school-navy/80 via-transparent to-transparent flex items-end p-2">
            <span className="text-white text-xs font-semibold font-bengali drop-shadow">
              হালিশহর পাবলিক স্কুল এন্ড কলেজ ক্যাম্পাস
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
