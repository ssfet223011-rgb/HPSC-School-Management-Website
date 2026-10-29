'use client';

import React from 'react';
import { AnnualSurveyCard } from '@/components/home/AnnualSurveyCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useLanguage } from '@/lib/localization/LanguageContext';

export default function AnnualSurveyPage() {
  const { language } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="no-print">
        <Breadcrumb
          items={[
            { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
            { label: language === 'bn' ? 'বার্ষিক জরিপ তথ্য' : 'Annual Survey Information' },
          ]}
        />
      </div>

      <div className="no-print mb-4 bg-amber-50 border-l-4 border-school-gold p-4 rounded-r">
        <p className="text-xs sm:text-sm text-school-navy">
          {language === 'bn' 
            ? 'এটি হালিশহর পাবলিক স্কুল এন্ড কলেজের শিক্ষা মন্ত্রণালয় ও ব্যানবেইস কর্তৃক স্বীকৃত বার্ষিক জরিপের আনুষ্ঠানিক তথ্য বিবরণী। প্রিন্ট বাটনে ক্লিক করে এটি সরাসরি এ৪ (A4) আকারে প্রিন্ট বা PDF আকারে সংরক্ষণ করা যাবে।'
            : 'Official Annual Survey Information snapshot for Halishahar Public School and College. Use the print button to generate a clean A4 document or export to PDF.'}
        </p>
      </div>

      <AnnualSurveyCard />
    </div>
  );
}
