'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { 
  GraduationCap, CheckCircle2, Clock, Search, FileText, 
  Printer, AlertCircle, ArrowRight, UserCheck 
} from 'lucide-react';

export default function AdmissionPage() {
  const { language } = useLanguage();
  const { classes, submitAdmission, admissions } = useSchoolStore();

  const [activeTab, setActiveTab] = useState<'apply' | 'track'>('apply');
  const [submittedAppNo, setSubmittedAppNo] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    applicantNameEn: '',
    applicantNameBn: '',
    dob: '',
    gender: 'Male' as 'Male' | 'Female',
    desiredClass: 'Class 6',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    address: '',
    previousSchool: '',
    agreed: false,
  });

  // Tracking State
  const [trackAppNo, setTrackAppNo] = useState('');
  const [trackedRecord, setTrackedRecord] = useState<any>(null);
  const [trackSearched, setTrackSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.applicantNameEn || !formData.guardianPhone || !formData.address) {
      alert('Please fill in all mandatory fields.');
      return;
    }
    if (!formData.agreed) {
      alert('Please check the declaration box before submitting.');
      return;
    }

    const appNo = submitAdmission({
      applicantNameEn: formData.applicantNameEn,
      applicantNameBn: formData.applicantNameBn,
      dob: formData.dob || '2014-01-01',
      gender: formData.gender,
      desiredClass: formData.desiredClass,
      guardianName: formData.guardianName,
      guardianPhone: formData.guardianPhone,
      guardianEmail: formData.guardianEmail,
      address: formData.address,
      previousSchool: formData.previousSchool,
    });

    setSubmittedAppNo(appNo);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackSearched(true);
    const found = admissions.find(
      a => a.applicationNo.toLowerCase() === trackAppNo.trim().toLowerCase()
    );
    setTrackedRecord(found || null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="no-print">
        <Breadcrumb
          items={[
            { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
            { label: language === 'bn' ? 'অনলাইন ভর্তি' : 'Online Admission' },
          ]}
        />
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-r from-school-navy to-school-academic text-white p-6 sm:p-8 rounded-lg shadow-academic flex flex-col md:flex-row items-center justify-between gap-4 no-print">
        <div>
          <span className="text-xs font-bold text-school-lightGold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
            Academic Session 2026
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-heading mt-2">
            {language === 'bn' ? 'অনলাইন ভর্তি ও আবেদন ট্র্যাকিং' : 'Online Admission & Application Tracker'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 font-bengali">
            {SCHOOL_CONFIG.identity.nameEn} — {SCHOOL_CONFIG.identity.nameBn}
          </p>
        </div>

        <div className="flex bg-white/10 p-1 rounded-lg border border-white/20">
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all ${
              activeTab === 'apply' ? 'bg-school-gold text-school-navy shadow' : 'text-white hover:text-school-lightGold'
            }`}
          >
            {language === 'bn' ? 'নতুন আবেদন' : 'New Application'}
          </button>
          <button
            onClick={() => setActiveTab('track')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all ${
              activeTab === 'track' ? 'bg-school-gold text-school-navy shadow' : 'text-white hover:text-school-lightGold'
            }`}
          >
            {language === 'bn' ? 'আবেদনের অবস্থা জানুন' : 'Track Application'}
          </button>
        </div>
      </div>

      {/* TAB 1: APPLY */}
      {activeTab === 'apply' && (
        <div className="space-y-6">
          {submittedAppNo ? (
            /* Successful Submission Slip */
            <div className="bg-white rounded-lg border-2 border-emerald-500 p-6 sm:p-8 shadow-academic space-y-6 printable-document">
              <div className="text-center space-y-2 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto no-print">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-school-navy">
                  {language === 'bn' ? 'ভর্তি আবেদন সফলভাবে গৃহীত হয়েছে' : 'Admission Application Submitted Successfully'}
                </h2>
                <p className="text-xs text-slate-500 font-mono">
                  {SCHOOL_CONFIG.identity.nameEn} • EIIN: {SCHOOL_CONFIG.identity.eiin}
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                <span className="text-xs text-slate-600 uppercase font-semibold">
                  {language === 'bn' ? 'আপনার আবেদন ট্র্যাকিং নম্বর' : 'Your Application Reference Number'}
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono tracking-wider mt-1">
                  {submittedAppNo}
                </div>
                <p className="text-xs text-emerald-700 mt-1 font-bengali">
                  {language === 'bn'
                    ? 'অনুগ্রহ করে এই নম্বরটি সংরক্ষণ করুন। পরবর্তীতে আবেদনের ফলাফল ও ভর্তি সংক্রান্ত তথ্যের জন্য এটি প্রয়োজন হবে।'
                    : 'Please preserve this reference number to track your admission status and report cards.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="border p-3 rounded">
                  <span className="text-slate-500 block">Applicant Name:</span>
                  <span className="font-bold text-school-navy">{formData.applicantNameEn} ({formData.applicantNameBn || 'N/A'})</span>
                </div>
                <div className="border p-3 rounded">
                  <span className="text-slate-500 block">Desired Class:</span>
                  <span className="font-bold text-school-navy">{formData.desiredClass}</span>
                </div>
                <div className="border p-3 rounded">
                  <span className="text-slate-500 block">Guardian Phone:</span>
                  <span className="font-bold text-school-navy">{formData.guardianPhone}</span>
                </div>
                <div className="border p-3 rounded">
                  <span className="text-slate-500 block">Date of Birth:</span>
                  <span className="font-bold text-school-navy">{formData.dob || '2014-01-01'}</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-4 border-t border-slate-200 no-print">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 bg-school-navy hover:bg-school-academic text-white px-5 py-2.5 rounded font-bold text-xs shadow"
                >
                  <Printer className="w-4 h-4 text-school-gold" />
                  <span>{language === 'bn' ? 'আবেদন রসিদ প্রিন্ট করুন' : 'Print Application Receipt'}</span>
                </button>
                <button
                  onClick={() => { setSubmittedAppNo(null); setFormData({ ...formData, applicantNameEn: '', applicantNameBn: '' }); }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded text-xs font-semibold"
                >
                  {language === 'bn' ? 'নতুন আবেদন জমা দিন' : 'Submit Another Application'}
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-school-border p-6 sm:p-8 shadow-academic space-y-6">
              <div className="border-b border-school-border pb-3">
                <h3 className="text-lg font-bold text-school-navy flex items-center gap-2">
                  <FileText className="w-5 h-5 text-school-gold" />
                  <span>{language === 'bn' ? 'শিক্ষার্থীর ভর্তি আবেদন ফর্ম (২০২৬)' : 'Student Admission Form (Session 2026)'}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-bengali">
                  * চিহ্নিত সকল তথ্য বাধ্যতামূলক। সঠিক ও নির্ভুল তথ্য প্রদান করুন।
                </p>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-school-navy mb-1">
                    {language === 'bn' ? 'শিক্ষার্থীর পুরো নাম (ইংরেজিতে)*' : "Applicant's Full Name (English)*"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tanvir Hasan"
                    value={formData.applicantNameEn}
                    onChange={(e) => setFormData({ ...formData, applicantNameEn: e.target.value })}
                    className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-school-navy mb-1">
                    {language === 'bn' ? 'শিক্ষার্থীর পুরো নাম (বাংলায়)' : "Applicant's Full Name (Bengali)"}
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: তানভীর হাসান"
                    value={formData.applicantNameBn}
                    onChange={(e) => setFormData({ ...formData, applicantNameBn: e.target.value })}
                    className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none font-bengali"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-school-navy mb-1">
                    {language === 'bn' ? 'জন্ম তারিখ*' : 'Date of Birth*'}
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-school-navy mb-1">
                    {language === 'bn' ? 'লিঙ্গ*' : 'Gender*'}
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' })}
                    className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
                  >
                    <option value="Male">{language === 'bn' ? 'ছাত্র (Male)' : 'Male'}</option>
                    <option value="Female">{language === 'bn' ? 'ছাত্রী (Female)' : 'Female'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-school-navy mb-1">
                    {language === 'bn' ? 'ভর্তি হতে ইচ্ছুক শ্রেণি*' : 'Desired Class*'}
                  </label>
                  <select
                    value={formData.desiredClass}
                    onChange={(e) => setFormData({ ...formData, desiredClass: e.target.value })}
                    className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.nameEn}>
                        {c.nameEn} ({c.nameBn})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-school-navy mb-1">
                    {language === 'bn' ? 'পূর্ববর্তী শিক্ষাপ্রতিষ্ঠান' : 'Previous School'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Halishahar Primary School"
                    value={formData.previousSchool}
                    onChange={(e) => setFormData({ ...formData, previousSchool: e.target.value })}
                    className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-school-navy mb-1">
                    {language === 'bn' ? 'অভিভাবকের নাম*' : "Guardian's Name*"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Md. Delwar Hossain"
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-school-navy mb-1">
                    {language === 'bn' ? 'অভিভাবকের মোবাইল নম্বর*' : "Guardian's Mobile Number*"}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="018XXXXXXXX"
                    value={formData.guardianPhone}
                    onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none font-mono"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-school-navy mb-1">
                    {language === 'bn' ? 'বর্তমান ঠিকানা ও এলাকা*' : 'Full Residential Address*'}
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="House / Road / Block, Halishahar, Chattogram"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
                  />
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="bg-school-cream/60 p-4 rounded border border-school-border/80">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreed}
                    onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                    className="mt-0.5 rounded text-school-navy focus:ring-school-gold"
                  />
                  <span className="text-xs text-school-body leading-relaxed font-bengali">
                    {language === 'bn'
                      ? 'আমি ঘোষণা করছি যে, উপরে প্রদত্ত সকল তথ্য সত্য ও নির্ভুল। বিদ্যালয়ের যাবতীয় নিয়মশৃঙ্খলা মান্য করতে আমি ও আমার সন্তান বাধ্য থাকব।'
                      : 'I hereby declare that all information supplied above is true and accurate, and we agree to abide by all institutional rules and regulations of Halishahar Public School and College.'}
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#D6A545] hover:bg-[#b88628] text-school-navy font-extrabold px-6 py-3 rounded shadow transition-all text-xs sm:text-sm"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>{language === 'bn' ? 'আবেদনপত্র জমা দিন' : 'Submit Admission Application'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 2: TRACK STATUS */}
      {activeTab === 'track' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-school-border p-6 sm:p-8 shadow-academic">
            <h3 className="text-base sm:text-lg font-bold text-school-navy mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-school-gold" />
              <span>{language === 'bn' ? 'আবেদনের বর্তমান অগ্রগতি যাচাই করুন' : 'Track Application Status'}</span>
            </h3>

            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g. ADM-2026-0042"
                value={trackAppNo}
                onChange={(e) => setTrackAppNo(e.target.value)}
                className="flex-1 p-2.5 text-xs sm:text-sm rounded border border-school-border focus:ring-2 focus:ring-school-navy uppercase font-mono"
              />
              <button
                type="submit"
                className="bg-school-navy hover:bg-school-academic text-white font-bold px-6 py-2.5 rounded text-xs sm:text-sm transition-colors"
              >
                {language === 'bn' ? 'যাচাই করুন' : 'Check Status'}
              </button>
            </form>
          </div>

          {trackSearched && (
            <div>
              {trackedRecord ? (
                <div className="bg-white rounded-lg border border-school-border p-6 shadow-academic space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                    <div>
                      <span className="text-xs font-mono text-slate-500">Ref: {trackedRecord.applicationNo}</span>
                      <h4 className="text-base sm:text-lg font-bold text-school-navy">
                        {trackedRecord.applicantNameEn} ({trackedRecord.applicantNameBn || 'N/A'})
                      </h4>
                    </div>

                    {/* Status Pill */}
                    <div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                        trackedRecord.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                        trackedRecord.status === 'admitted' ? 'bg-blue-100 text-blue-800' :
                        trackedRecord.status === 'under_review' ? 'bg-amber-100 text-amber-800' :
                        trackedRecord.status === 'rejected' ? 'bg-rose-100 text-rose-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {trackedRecord.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="border p-2.5 rounded">
                      <span className="text-slate-500 block">Class:</span>
                      <span className="font-semibold text-school-navy">{trackedRecord.desiredClass}</span>
                    </div>
                    <div className="border p-2.5 rounded">
                      <span className="text-slate-500 block">Guardian:</span>
                      <span className="font-semibold text-school-navy">{trackedRecord.guardianName} ({trackedRecord.guardianPhone})</span>
                    </div>
                    <div className="border p-2.5 rounded">
                      <span className="text-slate-500 block">Submitted At:</span>
                      <span className="font-semibold text-school-navy">{trackedRecord.submittedAt}</span>
                    </div>
                  </div>

                  {trackedRecord.reviewNotes && (
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded text-xs text-amber-900">
                      <strong>Office Review Notes:</strong> {trackedRecord.reviewNotes}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>No application was found matching reference: &quot;{trackAppNo}&quot;. Please verify the reference code.</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
