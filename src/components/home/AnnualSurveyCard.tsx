'use client';

import React from 'react';
import { Printer, FileText, Calendar, Building2, MapPin, Phone, Mail } from 'lucide-react';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useLanguage } from '@/lib/localization/LanguageContext';

export const AnnualSurveyCard: React.FC = () => {
  const { language, t } = useLanguage();

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const generalRows = [
    { labelBn: 'প্রতিষ্ঠানের ধরন', labelEn: 'Institution Type', value: SCHOOL_CONFIG.identity.institutionType },
    { labelBn: 'শিক্ষা স্তর', labelEn: 'Education Level', value: SCHOOL_CONFIG.identity.educationLevel },
    { labelBn: 'ব্যবস্থাপনা', labelEn: 'Management', value: SCHOOL_CONFIG.identity.management },
    { labelBn: 'ইংরেজি ভার্সন', labelEn: 'English Version', value: SCHOOL_CONFIG.identity.englishVersion },
    { labelBn: 'প্রতিষ্ঠার তারিখ', labelEn: 'Establishment Date', value: SCHOOL_CONFIG.identity.surveyEstdDate },
    { labelBn: 'এলাকার অবস্থা', labelEn: 'Area Classification', value: SCHOOL_CONFIG.identity.areaClassification },
    { labelBn: 'ভৌগোলিক অবস্থান', labelEn: 'Geographical Position', value: SCHOOL_CONFIG.identity.geographicalPosition },
    { labelBn: 'সংসদীয় আসন', labelEn: 'Parliamentary Constituency', value: SCHOOL_CONFIG.identity.constituency },
    { labelBn: 'স্ট্যাটাস', labelEn: 'Status', value: SCHOOL_CONFIG.identity.status },
  ];

  const contactRows = [
    { labelBn: 'বিভাগ', labelEn: 'Division', value: SCHOOL_CONFIG.contact.division },
    { labelBn: 'জেলা', labelEn: 'District', value: SCHOOL_CONFIG.contact.district },
    { labelBn: 'থানা', labelEn: 'Police Station', value: SCHOOL_CONFIG.contact.policeStation },
    { labelBn: 'ইউনিয়ন', labelEn: 'Union / Ward', value: SCHOOL_CONFIG.contact.unionWard },
    { labelBn: 'মৌজা', labelEn: 'Mouza', value: SCHOOL_CONFIG.contact.mouza },
    { labelBn: 'ডাকঘর', labelEn: 'Post Office', value: SCHOOL_CONFIG.contact.postOffice },
    { labelBn: 'ঠিকানা', labelEn: 'Address', value: SCHOOL_CONFIG.contact.fullAddress },
    { labelBn: 'মোবাইল', labelEn: 'Primary Mobile', value: SCHOOL_CONFIG.contact.primaryMobile },
    { labelBn: 'বিকল্প মোবাইল', labelEn: 'Alternative Mobile', value: SCHOOL_CONFIG.contact.altMobile },
    { labelBn: 'টেলিফোন', labelEn: 'Telephone', value: SCHOOL_CONFIG.contact.telephone },
    { labelBn: 'ইমেইল', labelEn: 'Email', value: SCHOOL_CONFIG.contact.email, isEmail: true },
  ];

  return (
    <div className="bg-white rounded-lg border border-school-border shadow-academic overflow-hidden printable-document">
      {/* Document Header Bar */}
      <div className="bg-[#082E50] text-white px-4 py-3 sm:px-6 flex flex-wrap items-center justify-between gap-2 border-b-2 border-school-gold">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-school-gold" />
          <h2 className="font-bold text-base sm:text-lg font-bengali-serif">
            {language === 'bn' ? 'বার্ষিক জরিপ তথ্য' : 'Annual Survey Information'}
          </h2>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 bg-[#124C7C] hover:bg-[#1a5f99] text-white text-xs font-semibold px-3 py-1.5 rounded border border-school-gold/40 shadow-sm transition-all btn-print no-print"
          title="Print Official Document"
        >
          <Printer className="w-3.5 h-3.5 text-school-gold" />
          <span>{language === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
        </button>
      </div>

      {/* Institution Identity Subheader */}
      <div className="p-4 sm:p-5 bg-gradient-to-b from-[#FBF8F0] to-white border-b border-school-border text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-school-navy font-serif-heading">
            {SCHOOL_CONFIG.identity.nameEn}
          </h3>
          <p className="text-sm font-semibold text-school-academic font-bengali">
            {SCHOOL_CONFIG.identity.nameBn}
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
            <span className="inline-block bg-school-navy text-white text-[11px] font-bold px-2 py-0.5 rounded">
              EIIN: {SCHOOL_CONFIG.identity.eiin}
            </span>
          </div>
        </div>

        <div className="text-right text-xs text-slate-500 font-mono flex items-center gap-1 bg-white px-3 py-1.5 rounded border border-school-border">
          <Calendar className="w-3.5 h-3.5 text-school-gold shrink-0" />
          <span>তারিখ ও সময়: {SCHOOL_CONFIG.branding.referenceTimestamp}</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Table 1: সাধারণ তথ্য — General Information */}
        <div>
          <div className="flex items-center gap-2 bg-[#124C7C] text-white px-3 py-2 rounded-t font-semibold text-sm font-bengali">
            <Building2 className="w-4 h-4 text-school-gold" />
            <span>{language === 'bn' ? 'সাধারণ তথ্য' : 'General Information'}</span>
          </div>
          <div className="overflow-x-auto border-x border-b border-school-border rounded-b">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#f8f6f0] text-school-navy border-b border-school-border font-bold">
                <tr>
                  <th className="py-2.5 px-4 w-1/2">{t('field')}</th>
                  <th className="py-2.5 px-4 w-1/2">{t('value')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-school-border/60">
                {generalRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fcfbf7]'}>
                    <td className="py-2 px-4 font-semibold text-school-navy font-bengali">
                      {language === 'bn' ? row.labelBn : row.labelEn}
                    </td>
                    <td className="py-2 px-4 text-school-body font-bengali">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: যোগাযোগ তথ্য — Contact Information */}
        <div>
          <div className="flex items-center gap-2 bg-[#124C7C] text-white px-3 py-2 rounded-t font-semibold text-sm font-bengali">
            <MapPin className="w-4 h-4 text-school-gold" />
            <span>{language === 'bn' ? 'যোগাযোগ তথ্য' : 'Contact Information'}</span>
          </div>
          <div className="overflow-x-auto border-x border-b border-school-border rounded-b">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-[#f8f6f0] text-school-navy border-b border-school-border font-bold">
                <tr>
                  <th className="py-2.5 px-4 w-1/2">{t('field')}</th>
                  <th className="py-2.5 px-4 w-1/2">{t('value')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-school-border/60">
                {contactRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#fcfbf7]'}>
                    <td className="py-2 px-4 font-semibold text-school-navy font-bengali">
                      {language === 'bn' ? row.labelBn : row.labelEn}
                    </td>
                    <td className="py-2 px-4 text-school-body font-bengali font-mono sm:font-sans">
                      {row.isEmail ? (
                        <a href={`mailto:${row.value}`} className="text-school-academic hover:underline font-mono">
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
