'use client';

import React from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { Award, Target, Eye, BookOpen, Compass, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
          { label: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Our School' },
        ]}
      />

      {/* Hero Heading */}
      <div className="bg-white rounded-lg border border-school-border p-6 sm:p-8 shadow-academic flex flex-col md:flex-row items-center gap-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 relative flex-shrink-0 bg-school-cream/60 rounded-lg p-2 border border-school-border shadow-sm">
          <Image
            src={SCHOOL_CONFIG.branding.logoUrl}
            alt={SCHOOL_CONFIG.identity.nameEn}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
            {SCHOOL_CONFIG.identity.brandingEstd} • EIIN: {SCHOOL_CONFIG.identity.eiin}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-school-navy font-serif-heading mt-2">
            {SCHOOL_CONFIG.identity.nameEn}
          </h1>
          <h2 className="text-lg sm:text-xl font-bold text-school-academic font-bengali mt-0.5">
            {SCHOOL_CONFIG.identity.nameBn}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-bengali">
            {SCHOOL_CONFIG.contact.fullAddress}
          </p>
        </div>
      </div>

      {/* Main Narrative & History */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-school-border p-6 shadow-academic space-y-4">
            <h3 className="text-lg font-bold text-school-navy border-b border-school-border pb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-school-gold" />
              <span>{language === 'bn' ? 'পরিচিতি ও ইতিহাস' : 'Institutional Background & History'}</span>
            </h3>

            <div className="text-xs sm:text-sm text-school-body leading-relaxed space-y-3 font-bengali">
              <p>
                {language === 'bn'
                  ? 'হালিশহর পাবলিক স্কুল এন্ড কলেজ চট্টগ্রামের হালিশহর আবাসিক এলাকার প্রাণকেন্দ্রে অবস্থিত একটি স্বনামধন্য ও ঐতিহ্যবাহী শিক্ষাপ্রতিষ্ঠান। প্রতিষ্ঠানটির ব্র্যান্ডিং পরিচিতিতে Estd: 2002 হিসেবে প্রতিষ্ঠিত এবং সরকারি বার্ষিক জরিপ বিবরণীতে ০১ জানুয়ারি ২০০৪ সালে এর প্রাতিষ্ঠানিক কার্যক্রমের আনুষ্ঠানিক ভিত্তি বর্ণিত রয়েছে। প্রতিষ্ঠালগ্ন থেকেই এটি কোমলমতি শিক্ষার্থীদের জ্ঞান, শৃঙ্খলা ও নৈতিক শিক্ষার আদর্শে গড়ে তুলতে নিরলসভাবে কাজ করে যাচ্ছে।'
                  : 'Halishahar Public School and College is an esteemed educational institution situated in the heart of Halishahar Housing Estate, Chattogram. Established with the branding hallmark of Estd: 2002 and an official survey establishment date of January 1, 2004, the institution has continuously fostered academic rigor, discipline, and moral character.'}
              </p>
              <p>
                {language === 'bn'
                  ? 'বিদ্যালয়টিতে যোগ্য, অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকমণ্ডলী দ্বারা পাঠদান পরিচালিত হয়। আধুনিক বিজ্ঞানাগার, সমৃদ্ধ পাঠাগার এবং মাল্টিমিডিয়া কম্পিউটার ল্যাবের মাধ্যমে শিক্ষার্থীদের সমসাময়িক যুগোপযোগী শিক্ষায় পারদর্শী করে গড়ে তোলা হচ্ছে।'
                  : 'The institution operates under the dedication of qualified faculty, modern science laboratories, an extensive library, and computer facilities tailored to the secondary national curriculum.'}
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#FBF8F0] rounded-lg border border-school-border p-5 space-y-2">
              <div className="flex items-center gap-2 text-school-navy font-bold text-sm">
                <Target className="w-5 h-5 text-school-gold" />
                <span>{language === 'bn' ? 'আমাদের লক্ষ্য (Mission)' : 'Our Mission'}</span>
              </div>
              <p className="text-xs text-school-body leading-relaxed font-bengali">
                {language === 'bn'
                  ? 'প্রতিটি শিক্ষার্থীকে সুশিক্ষা, চারিত্রিক দৃঢ়তা এবং মানবিক মূল্যবোধে সমৃদ্ধ নাগরিক হিসেবে গড়ে তোলা, যাতে তারা দেশ ও জাতির কল্যাণে অগ্রণী ভূমিকা পালন করতে পারে।'
                  : 'To nurture every student with academic brilliance, character strength, and humanitarian values, preparing them as competent leaders for the nation.'}
              </p>
            </div>

            <div className="bg-[#FBF8F0] rounded-lg border border-school-border p-5 space-y-2">
              <div className="flex items-center gap-2 text-school-navy font-bold text-sm">
                <Eye className="w-5 h-5 text-school-academic" />
                <span>{language === 'bn' ? 'আমাদের ভিশন (Vision)' : 'Our Vision'}</span>
              </div>
              <p className="text-xs text-school-body leading-relaxed font-bengali">
                {language === 'bn'
                  ? 'চট্টগ্রাম অঞ্চলের অন্যতম সেরা ও অনুকরণীয় মাধ্যমিক শিক্ষাপ্রতিষ্ঠান হিসেবে প্রতিষ্ঠিত হওয়া এবং জ্ঞানভিত্তিক সমাজ গঠনে সার্বিক অবদান রাখা।'
                  : 'To stand as one of the premier model secondary institutions in Chattogram, championing innovation, ethics, and a knowledge-driven society.'}
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Fact Sheet */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-school-border p-5 shadow-academic space-y-4">
            <h4 className="text-sm font-bold text-school-navy border-b border-school-border pb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-school-gold" />
              <span>{language === 'bn' ? 'প্রাতিষ্ঠানিক সারসংক্ষেপ' : 'Institutional Summary'}</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">{language === 'bn' ? 'ব্র্যান্ডিং প্রতিষ্ঠা' : 'Branding Estd'}</span>
                <span className="font-semibold text-school-navy">{SCHOOL_CONFIG.identity.brandingEstd}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">{language === 'bn' ? 'জরিপ প্রতিষ্ঠা' : 'Survey Estd'}</span>
                <span className="font-semibold text-school-navy">{SCHOOL_CONFIG.identity.surveyEstdDate}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">EIIN</span>
                <span className="font-semibold text-school-navy">{SCHOOL_CONFIG.identity.eiin}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">{language === 'bn' ? 'ব্যবস্থাপনা' : 'Management'}</span>
                <span className="font-semibold text-school-navy">{SCHOOL_CONFIG.identity.management}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">{language === 'bn' ? 'শিক্ষা স্তর' : 'Level'}</span>
                <span className="font-semibold text-school-navy">{SCHOOL_CONFIG.identity.educationLevel}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">{language === 'bn' ? 'এলাকা' : 'Area'}</span>
                <span className="font-semibold text-school-navy">{SCHOOL_CONFIG.identity.areaClassification}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1">
                <span className="text-slate-500">{language === 'bn' ? 'আসন' : 'Constituency'}</span>
                <span className="font-semibold text-school-navy">{SCHOOL_CONFIG.identity.constituency}</span>
              </div>
            </div>
          </div>

          {/* Campus Photograph Card */}
          <div className="rounded-lg overflow-hidden border border-school-border shadow-academic">
            <div className="relative h-44 w-full">
              <Image
                src={SCHOOL_CONFIG.branding.campusMainUrl}
                alt="School Entrance Gate"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-school-navy text-white text-center p-2.5 text-xs font-semibold">
              হালিশহর পাবলিক স্কুল এন্ড কলেজ তোরণ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
