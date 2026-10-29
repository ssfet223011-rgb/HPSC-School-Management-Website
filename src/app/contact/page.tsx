'use client';

import React, { useState } from 'react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const { language } = useLanguage();
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill out all mandatory fields.');
      return;
    }
    setSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
          { label: language === 'bn' ? 'যোগাযোগ' : 'Contact Us' },
        ]}
      />

      {/* Header */}
      <div className="bg-school-navy text-white p-6 sm:p-8 rounded-lg shadow-academic">
        <span className="text-xs font-bold text-school-lightGold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
          Official Institutional Help Desk
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-heading mt-2">
          {language === 'bn' ? 'যোগাযোগ ও অবস্থান' : 'Contact & Campus Location'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 font-bengali">
          {SCHOOL_CONFIG.identity.nameEn} • {SCHOOL_CONFIG.identity.nameBn}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Details (Left Column) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-lg border border-school-border p-6 shadow-academic space-y-5">
            <h2 className="text-base font-bold text-school-navy border-b border-school-border pb-2">
              {language === 'bn' ? 'প্রাতিষ্ঠানিক ঠিকানা ও ফোন' : 'Campus Office & Help Lines'}
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-school-gold shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-school-navy">Campus Address:</strong>
                  <p className="text-slate-600 leading-snug">{SCHOOL_CONFIG.contact.fullAddress}</p>
                  <p className="text-slate-500 font-bengali">
                    মৌজা: {SCHOOL_CONFIG.contact.mouza} | ডাকঘর: {SCHOOL_CONFIG.contact.postOffice}
                  </p>
                  <p className="text-slate-500 font-bengali">
                    {SCHOOL_CONFIG.contact.unionWard}, {SCHOOL_CONFIG.contact.policeStation}, {SCHOOL_CONFIG.contact.district}।
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-school-gold shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="block text-school-navy">Mobile & Phone:</strong>
                  <p className="text-slate-600 font-mono">Primary: {SCHOOL_CONFIG.contact.primaryMobile}</p>
                  <p className="text-slate-600 font-mono">Alternative: {SCHOOL_CONFIG.contact.altMobile}</p>
                  <p className="text-slate-600 font-mono">Telephone: {SCHOOL_CONFIG.contact.telephone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-school-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-school-navy">Official Email:</strong>
                  <a href={`mailto:${SCHOOL_CONFIG.contact.email}`} className="text-school-academic hover:underline font-mono">
                    {SCHOOL_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-school-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-school-navy">Office Hours:</strong>
                  <p className="text-slate-600">Saturday — Thursday: 08:30 AM — 03:00 PM</p>
                  <p className="text-slate-500">Friday & National Holidays: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (Right Column) */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-lg border border-school-border p-6 sm:p-8 shadow-academic">
            <h2 className="text-base font-bold text-school-navy border-b border-school-border pb-3 mb-4">
              {language === 'bn' ? 'বার্তা অথবা জিজ্ঞাসা পাঠান' : 'Send an Inquiry or Message'}
            </h2>

            {sent ? (
              <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-lg text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900">
                  {language === 'bn' ? 'আপনার বার্তা সফলভাবে গ্রহণ করা হয়েছে' : 'Message Sent Successfully'}
                </h3>
                <p className="text-xs text-slate-600 font-bengali">
                  আমাদের অফিস চলাকালীন সংশ্লিষ্ট দায়িত্বশীল কর্মকর্তা শীঘ্রই আপনার সাথে যোগাযোগ করবেন।
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="bg-school-navy text-white text-xs font-bold px-4 py-2 rounded"
                >
                  নতুন বার্তা পাঠান
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-school-navy mb-1">
                      {language === 'bn' ? 'আপনার নাম*' : 'Your Name*'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Kamal Hossain"
                      className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-school-navy mb-1">
                      {language === 'bn' ? 'মোবাইল নম্বর*' : 'Mobile Number*'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="018XXXXXXXX"
                      className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-school-navy mb-1">
                      {language === 'bn' ? 'ইমেইল (যদি থাকে)' : 'Email Address (Optional)'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-school-navy mb-1">
                      {language === 'bn' ? 'বিষয়' : 'Subject'}
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Admission inquiry"
                      className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-school-navy mb-1">
                    {language === 'bn' ? 'আপনার বার্তা / প্রশ্ন*' : 'Message / Inquiry*'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your query here..."
                    className="w-full text-xs p-2.5 rounded border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-[#D6A545] hover:bg-[#b88628] text-school-navy font-bold px-6 py-2.5 rounded shadow text-xs sm:text-sm transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{language === 'bn' ? 'বার্তা পাঠান' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
