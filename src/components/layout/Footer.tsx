'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, ChevronRight, ShieldCheck, Heart } from 'lucide-react';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useLanguage } from '@/lib/localization/LanguageContext';

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-school-navy text-slate-300 border-t-4 border-school-gold no-print">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: Identity & About */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 relative bg-white rounded p-1 border border-school-gold/60 shadow">
                <Image
                  src={SCHOOL_CONFIG.branding.logoUrl}
                  alt={SCHOOL_CONFIG.identity.nameEn}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm tracking-tight leading-tight">
                  {SCHOOL_CONFIG.identity.nameEn}
                </h3>
                <p className="text-xs text-school-lightGold font-semibold mt-0.5">
                  {SCHOOL_CONFIG.identity.brandingEstd}
                </p>
                <p className="text-xs text-slate-300 font-bengali">
                  {SCHOOL_CONFIG.identity.nameBn}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'bn'
                ? 'হালিশহর পাবলিক স্কুল এন্ড কলেজ চট্টগ্রামের অন্যতম আদর্শ শিক্ষা প্রতিষ্ঠান। নৈতিক মূল্যবোধ ও আধুনিক শিক্ষার সমন্বয়ে প্রতিটি শিক্ষার্থীর সার্বিক বিকাশ আমাদের অঙ্গীকার।'
                : 'Halishahar Public School and College is dedicated to providing standard secondary education in Chattogram, fostering intellectual discipline, leadership, and moral excellence.'}
            </p>

            <div className="pt-1">
              <span className="inline-block bg-school-royal/60 text-amber-200 text-xs px-2.5 py-1 rounded border border-school-gold/30">
                EIIN: {SCHOOL_CONFIG.identity.eiin}
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-school-gold/30 pb-2">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-school-lightGold flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t('navHome')}</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-school-lightGold flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t('navAbout')}</span>
                </Link>
              </li>
              <li>
                <Link href="/academic" className="hover:text-school-lightGold flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t('navAcademic')}</span>
                </Link>
              </li>
              <li>
                <Link href="/admission" className="hover:text-school-lightGold flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t('navAdmission')}</span>
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-school-lightGold flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t('navResult')}</span>
                </Link>
              </li>
              <li>
                <Link href="/survey" className="hover:text-school-lightGold flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t('navSurvey')}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic & Portals */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-school-gold/30 pb-2">
              {language === 'bn' ? 'একাডেমিক ও সেবা' : 'Academics & Portals'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/routine" className="hover:text-school-lightGold flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t('navRoutine')}</span>
                </Link>
              </li>
              <li>
                <Link href="/exam-routine" className="hover:text-school-lightGold flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t('navExamRoutine')}</span>
                </Link>
              </li>
              <li>
                <Link href="/notices" className="hover:text-school-lightGold flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t('navNotices')}</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-school-lightGold flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t('navGallery')}</span>
                </Link>
              </li>
              <li>
                <Link href="/library" className="hover:text-school-lightGold flex items-center gap-1.5 transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-school-gold" />
                  <span>{t('navLibrary')}</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-amber-300 font-semibold hover:text-white flex items-center gap-1.5 transition-colors">
                  <ShieldCheck className="w-3.5 h-3.5 text-school-gold" />
                  <span>{language === 'bn' ? 'প্রশাসনিক ও শিক্ষক ড্যাশবোর্ড' : 'School Management ERP'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider border-b border-school-gold/30 pb-2">
              {language === 'bn' ? 'যোগাযোগ ঠিকানা' : 'Contact Information'}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-school-gold shrink-0 mt-0.5" />
                <span className="leading-snug">{SCHOOL_CONFIG.contact.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-school-gold shrink-0" />
                <span>{SCHOOL_CONFIG.contact.primaryMobile} / {SCHOOL_CONFIG.contact.altMobile}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-school-gold shrink-0" />
                <span>টেলিফোন: {SCHOOL_CONFIG.contact.telephone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-school-gold shrink-0" />
                <a href={`mailto:${SCHOOL_CONFIG.contact.email}`} className="hover:text-school-lightGold underline">
                  {SCHOOL_CONFIG.contact.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-slate-400">
                <span>ওয়ার্ড নং: ২৬ | থানা: হালিশহর | জেলা: চট্টগ্রাম</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-[#051f36] border-t border-slate-800 text-slate-400 text-xs py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p>
            © 2026 {SCHOOL_CONFIG.identity.nameEn}. {t('allRightsReserved')}
          </p>
          <div className="flex items-center gap-3 text-school-lightGold font-medium">
            <span>{SCHOOL_CONFIG.branding.taglineEn}</span>
            <span>•</span>
            <span>Education | Discipline | Success</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
