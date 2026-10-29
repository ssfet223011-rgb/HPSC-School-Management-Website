'use client';

import React from 'react';
import Link from 'next/link';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { GraduationCap, BookOpen, Clock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function StudentsPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
          { label: language === 'bn' ? 'শিক্ষার্থীবৃন্দ' : 'Students' },
        ]}
      />

      {/* Banner */}
      <div className="bg-school-navy text-white p-6 sm:p-8 rounded-lg shadow-academic flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-school-lightGold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
            Student Affairs & Resources
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-heading mt-2">
            {language === 'bn' ? 'শিক্ষার্থী তথ্য ও সেবা পোর্টাল' : 'Student Information & Services'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-bengali">
            {SCHOOL_CONFIG.identity.nameEn} • EIIN: {SCHOOL_CONFIG.identity.eiin}
          </p>
        </div>

        <Link
          href="/dashboard?role=student"
          className="inline-flex items-center gap-2 bg-[#D6A545] hover:bg-[#b88628] text-school-navy font-extrabold px-5 py-2.5 rounded shadow text-xs sm:text-sm transition-all"
        >
          <GraduationCap className="w-5 h-5" />
          <span>{language === 'bn' ? 'স্টুডেন্ট পোর্টালে প্রবেশ' : 'Access Student Portal'}</span>
        </Link>
      </div>

      {/* Guidelines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Code of Conduct */}
        <div className="bg-white rounded-lg border border-school-border p-6 shadow-academic space-y-4">
          <h3 className="text-base font-bold text-school-navy border-b border-school-border pb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-school-gold" />
            <span>{language === 'bn' ? 'আচরণবিধি ও নিয়মশৃঙ্খলা' : 'Code of Conduct & Discipline'}</span>
          </h3>

          <ul className="space-y-2 text-xs text-school-body font-bengali leading-relaxed">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>প্রতিদিন সকাল ৮:৪৫ মিনিটের মধ্যে শিক্ষার্থীদের অবশ্যই প্রাত্যহিক সমাবেশে উপস্থিত হতে হবে।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>নির্ধারিত স্কুল পোশাক (ইউনিফর্ম) ও পরিচয়পত্র (আইডি কার্ড) পরিধান বাধ্যতামূলক।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>শ্রেণিকক্ষে ও স্কুল প্রাঙ্গণে মোবাইল ফোন বা কোনো স্মার্ট ডিভাইস ব্যবহার সম্পূর্ণ নিষিদ্ধ।</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>বার্ষিক পরীক্ষায় অংশগ্রহণের জন্য ন্যূনতম ৭৫% ক্লাসে উপস্থিতি বাধ্যতামূলক।</span>
            </li>
          </ul>
        </div>

        {/* Academic Routine & Fast Links */}
        <div className="bg-white rounded-lg border border-school-border p-6 shadow-academic space-y-4">
          <h3 className="text-base font-bold text-school-navy border-b border-school-border pb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-school-gold" />
            <span>{language === 'bn' ? 'জরুরি শিক্ষার্থী সেবা' : 'Student Essential Services'}</span>
          </h3>

          <div className="space-y-3">
            <Link
              href="/routine"
              className="flex items-center justify-between p-3 rounded-lg border border-school-border bg-slate-50 hover:bg-school-cream transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-school-navy" />
                <span className="text-xs font-bold text-school-navy">শ্রেণিভিত্তিক সাপ্তাহিক ক্লাস রুটিন</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/results"
              className="flex items-center justify-between p-3 rounded-lg border border-school-border bg-slate-50 hover:bg-school-cream transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-school-navy" />
                <span className="text-xs font-bold text-school-navy">পরীক্ষার ফলাফল ও মার্কশিট অনুসন্ধান</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/notices"
              className="flex items-center justify-between p-3 rounded-lg border border-school-border bg-slate-50 hover:bg-school-cream transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-school-navy" />
                <span className="text-xs font-bold text-school-navy">শিক্ষার্থীদের জন্য জরুরি নোটিশ ও নির্দেশনা</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
