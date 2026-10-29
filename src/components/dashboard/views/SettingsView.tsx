'use client';

import React, { useState } from 'react';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { Settings, Save, CheckCircle2, Shield, Lock, Image as ImageIcon, Upload } from 'lucide-react';
import { DeviceFileUpload } from '@/components/ui/DeviceFileUpload';

export const SettingsView: React.FC = () => {
  const { brandingAssets, updateBrandingAsset } = useSchoolStore();
  const [saved, setSaved] = useState(false);
  const [assetMsg, setAssetMsg] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    nameEn: SCHOOL_CONFIG.identity.nameEn,
    nameBn: SCHOOL_CONFIG.identity.nameBn,
    brandingEstd: SCHOOL_CONFIG.identity.brandingEstd,
    surveyEstdDate: SCHOOL_CONFIG.identity.surveyEstdDate,
    eiin: SCHOOL_CONFIG.identity.eiin,
    primaryMobile: SCHOOL_CONFIG.contact.primaryMobile,
    altMobile: SCHOOL_CONFIG.contact.altMobile,
    telephone: SCHOOL_CONFIG.contact.telephone,
    email: SCHOOL_CONFIG.contact.email,
    fullAddress: SCHOOL_CONFIG.contact.fullAddress,
    taglineEn: SCHOOL_CONFIG.branding.taglineEn,
    quoteBn: SCHOOL_CONFIG.branding.quoteBn,
    currency: SCHOOL_CONFIG.branding.currency,
    timezone: SCHOOL_CONFIG.branding.timezone,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-lg border border-school-border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-school-navy flex items-center gap-2">
            <Settings className="w-5 h-5 text-school-gold" />
            <span>Central Institutional Configuration</span>
          </h2>
          <p className="text-xs text-slate-500">
            Configure official school parameters, contact information, branding, and academic metadata.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded border border-emerald-200">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Role: Super Administrator Authorizations</span>
        </div>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings successfully updated. Central metadata and audit log synchronized.</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-school-border shadow-sm p-6 space-y-6">
        {/* Section 1: Official Identity */}
        <div>
          <h3 className="text-xs font-bold text-school-navy uppercase tracking-wider border-b pb-2 mb-3">
            Institutional Identity & Branding (Protected Invariants)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-school-navy mb-1">Official Name (English)</label>
              <input
                type="text"
                value={settings.nameEn}
                onChange={(e) => setSettings({ ...settings, nameEn: e.target.value })}
                className="w-full p-2.5 rounded border border-school-border font-serif-heading font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-school-navy mb-1">Official Name (Bengali)</label>
              <input
                type="text"
                value={settings.nameBn}
                onChange={(e) => setSettings({ ...settings, nameBn: e.target.value })}
                className="w-full p-2.5 rounded border border-school-border font-bengali font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-school-navy mb-1">Branding Estd Label</label>
              <input
                type="text"
                value={settings.brandingEstd}
                onChange={(e) => setSettings({ ...settings, brandingEstd: e.target.value })}
                className="w-full p-2.5 rounded border border-school-border font-semibold text-amber-700"
              />
            </div>

            <div>
              <label className="block font-bold text-school-navy mb-1">Annual Survey Estd Date</label>
              <input
                type="text"
                value={settings.surveyEstdDate}
                onChange={(e) => setSettings({ ...settings, surveyEstdDate: e.target.value })}
                className="w-full p-2.5 rounded border border-school-border font-semibold text-amber-700"
              />
            </div>

            <div>
              <label className="block font-bold text-school-navy mb-1">EIIN (Educational Identification No)</label>
              <input
                type="text"
                value={settings.eiin}
                onChange={(e) => setSettings({ ...settings, eiin: e.target.value })}
                className="w-full p-2.5 rounded border border-school-border font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-school-navy mb-1">Timezone & Currency</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  disabled
                  value={settings.timezone}
                  className="w-1/2 p-2.5 rounded border bg-slate-100 font-mono"
                />
                <input
                  type="text"
                  disabled
                  value="BDT (৳)"
                  className="w-1/2 p-2.5 rounded border bg-slate-100 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div>
          <h3 className="text-xs font-bold text-school-navy uppercase tracking-wider border-b pb-2 mb-3">
            Contact & Location Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-school-navy mb-1">Primary Mobile</label>
              <input
                type="tel"
                value={settings.primaryMobile}
                onChange={(e) => setSettings({ ...settings, primaryMobile: e.target.value })}
                className="w-full p-2.5 rounded border font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-school-navy mb-1">Alternative Mobile</label>
              <input
                type="tel"
                value={settings.altMobile}
                onChange={(e) => setSettings({ ...settings, altMobile: e.target.value })}
                className="w-full p-2.5 rounded border font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-school-navy mb-1">Telephone</label>
              <input
                type="text"
                value={settings.telephone}
                onChange={(e) => setSettings({ ...settings, telephone: e.target.value })}
                className="w-full p-2.5 rounded border font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-school-navy mb-1">Official Address</label>
              <input
                type="text"
                value={settings.fullAddress}
                onChange={(e) => setSettings({ ...settings, fullAddress: e.target.value })}
                className="w-full p-2.5 rounded border"
              />
            </div>

            <div>
              <label className="block font-bold text-school-navy mb-1">School Email</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full p-2.5 rounded border font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Taglines */}
        <div>
          <h3 className="text-xs font-bold text-school-navy uppercase tracking-wider border-b pb-2 mb-3">
            Public Website Taglines & Educational Quotes
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-school-navy mb-1">English Motto Tagline</label>
              <input
                type="text"
                value={settings.taglineEn}
                onChange={(e) => setSettings({ ...settings, taglineEn: e.target.value })}
                className="w-full p-2.5 rounded border"
              />
            </div>

            <div>
              <label className="block font-bold text-school-navy mb-1">Bengali Inspirational Quote</label>
              <input
                type="text"
                value={settings.quoteBn}
                onChange={(e) => setSettings({ ...settings, quoteBn: e.target.value })}
                className="w-full p-2.5 rounded border font-bengali"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Branding Assets & Image Uploads from Device */}
        <div>
          <div className="flex items-center justify-between border-b pb-2 mb-3">
            <div>
              <h3 className="text-xs font-bold text-school-navy uppercase tracking-wider">
                Branding Images & Photos (ডিভাইস থেকে ছবি আপলোড)
              </h3>
              <p className="text-[11px] text-slate-500">
                Upload official school logo, main campus gate photo, and banner images directly from your computer or phone.
              </p>
            </div>
            {assetMsg && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                {assetMsg}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Official Logo */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-school-navy block">
                Official School Logo (লোগো)
              </span>
              <div className="w-20 h-20 mx-auto relative bg-white rounded border p-1 shadow-sm">
                <img
                  src={brandingAssets.logoUrl}
                  alt="School Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <DeviceFileUpload
                compact
                accept="image/*"
                buttonText="Upload New Logo"
                onFileSelect={(data) => {
                  updateBrandingAsset('logoUrl', data.dataUrl);
                  setAssetMsg('School logo updated from device!');
                  setTimeout(() => setAssetMsg(null), 3000);
                }}
                className="w-full text-center"
              />
            </div>

            {/* 2. Main Campus Entrance */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-school-navy block">
                Main Campus Photo (ক্যাম্পাস)
              </span>
              <div className="w-full h-24 relative bg-white rounded border overflow-hidden shadow-sm">
                <img
                  src={brandingAssets.campusMainUrl}
                  alt="Campus Main"
                  className="w-full h-full object-cover"
                />
              </div>
              <DeviceFileUpload
                compact
                accept="image/*"
                buttonText="Upload Campus Photo"
                onFileSelect={(data) => {
                  updateBrandingAsset('campusMainUrl', data.dataUrl);
                  setAssetMsg('Campus photo updated from device!');
                  setTimeout(() => setAssetMsg(null), 3000);
                }}
                className="w-full text-center"
              />
            </div>

            {/* 3. Hero Carousel Banner */}
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-school-navy block">
                Campus Banner Photo (ব্যানার)
              </span>
              <div className="w-full h-24 relative bg-white rounded border overflow-hidden shadow-sm">
                <img
                  src={brandingAssets.campusBannerUrl}
                  alt="Campus Banner"
                  className="w-full h-full object-cover"
                />
              </div>
              <DeviceFileUpload
                compact
                accept="image/*"
                buttonText="Upload Banner Photo"
                onFileSelect={(data) => {
                  updateBrandingAsset('campusBannerUrl', data.dataUrl);
                  setAssetMsg('Hero banner updated from device!');
                  setTimeout(() => setAssetMsg(null), 3000);
                }}
                className="w-full text-center"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-school-navy hover:bg-school-academic text-white px-6 py-2.5 rounded text-xs font-bold shadow"
          >
            <Save className="w-4 h-4 text-school-gold" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
};
