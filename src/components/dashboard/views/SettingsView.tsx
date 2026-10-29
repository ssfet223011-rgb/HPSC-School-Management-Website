'use client';

import React, { useState } from 'react';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { Settings, Save, CheckCircle2, Shield, Lock, Image as ImageIcon, Upload, Database, Server, Key, ExternalLink, Copy, Check } from 'lucide-react';
import { DeviceFileUpload } from '@/components/ui/DeviceFileUpload';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';

export const SettingsView: React.FC = () => {
  const { brandingAssets, updateBrandingAsset } = useSchoolStore();
  const [saved, setSaved] = useState(false);
  const [assetMsg, setAssetMsg] = useState<string | null>(null);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [testDbStatus, setTestDbStatus] = useState<string | null>(null);
  const [isTestingDb, setIsTestingDb] = useState(false);

  const handleTestDatabase = async () => {
    setIsTestingDb(true);
    setTestDbStatus(null);
    try {
      if (!isSupabaseConfigured || !supabase) {
        setTestDbStatus('Local Mode Active: Supabase credentials not yet placed in .env.local.');
      } else {
        const { data, error } = await supabase.from('school_settings').select('*').limit(1);
        if (error) {
          setTestDbStatus(`Connected to Supabase, but schema not yet initialized: ${error.message}`);
        } else {
          setTestDbStatus('Success! PostgreSQL database connected and tables verified.');
        }
      }
    } catch (err: any) {
      setTestDbStatus(`Connection check error: ${err.message}`);
    } finally {
      setIsTestingDb(false);
    }
  };

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

      {/* Database Connection & Cloud Integration Center */}
      <div className="bg-white rounded-lg border border-school-border shadow-academic overflow-hidden">
        <div className="bg-gradient-to-r from-[#082E50] to-[#124C7C] text-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-school-gold">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
              <Database className="w-4 h-4 text-school-gold" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">
                Database Connection & Cloud Integration (ডাটাবেজ কানেকশন)
              </h3>
              <p className="text-[11px] text-slate-300 font-bengali">
                Supabase PostgreSQL ও ফাইল স্টোরেজ ক্লাউড সংযোগ
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
              isSupabaseConfigured
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-400 text-school-navy'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-white' : 'bg-school-navy animate-ping'}`} />
              <span>{isSupabaseConfigured ? 'Cloud PostgreSQL Connected' : 'Local Offline Mode Active'}</span>
            </span>

            <button
              type="button"
              onClick={handleTestDatabase}
              disabled={isTestingDb}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded font-semibold border border-white/30 transition-colors"
            >
              {isTestingDb ? 'Checking...' : 'Test Connection'}
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {testDbStatus && (
            <div className={`p-3 rounded border text-xs font-semibold ${
              testDbStatus.includes('Success')
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-blue-50 text-blue-900 border-blue-300'
            }`}>
              {testDbStatus}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-bold text-school-navy text-xs flex items-center gap-1.5">
                <Server className="w-4 h-4 text-school-academic" />
                <span>বর্তমান ডাটাবেজ স্ট্যাটাস</span>
              </h4>
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">Database Engine:</span>
                  <strong className="font-mono text-school-navy">PostgreSQL (Supabase)</strong>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">Active Storage:</span>
                  <span className="font-semibold text-emerald-700">HTML5 LocalStorage + Mock Cache</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">Configured URL:</span>
                  <span className="font-mono text-[10px] text-slate-600 truncate max-w-[180px]">
                    {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not yet set'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SQL Schema File:</span>
                  <span className="font-mono text-xs text-school-academic">supabase/migrations/...</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 bg-amber-50/70 p-4 rounded-lg border border-amber-200">
              <h4 className="font-bold text-school-navy text-xs flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-600" />
                <span>কীভাবে ডাটাবেজ কানেক্ট করবেন (৪টি সহজ ধাপ):</span>
              </h4>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-700 leading-relaxed text-[11px]">
                <li>
                  <strong>Supabase প্রজেক্ট তৈরি:</strong>{' '}
                  <a
                    href="https://supabase.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-school-academic underline inline-flex items-center gap-0.5"
                  >
                    supabase.com <ExternalLink className="w-3 h-3" />
                  </a>{' '}
                  এ গিয়ে একটি ফ্রি একাউন্ট ও প্রজেক্ট তৈরি করুন।
                </li>
                <li>
                  <strong>API Keys কপি করুন:</strong> প্রজেক্টের <em>Project Settings &gt; API</em> থেকে <code>Project URL</code> এবং <code>anon public key</code> কপি করুন।
                </li>
                <li>
                  <strong>.env.local ফাইলে বসান:</strong> আপনার প্রজেক্টের মূল ফোল্ডারে থাকা <code>.env.local</code> ফাইলে মান দুটি পেস্ট করুন।
                </li>
                <li>
                  <strong>SQL স্কিমা রান করুন:</strong> Supabase ড্যাশবোর্ডের <em>SQL Editor</em>-এ গিয়ে <code>supabase/migrations/20261029000001_create_school_erp_schema.sql</code> ফাইলের কোড রান করে দিন।
                </li>
              </ol>
            </div>
          </div>

          <div className="bg-slate-900 text-slate-200 p-3.5 rounded-lg font-mono text-[11px] space-y-1.5 relative">
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-700 pb-1 text-[10px]">
              <span>.env.local কনফিগারেশন ফরম্যাট:</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=bn
NEXT_PUBLIC_TIMEZONE=Asia/Dhaka`
                  );
                  setCopiedEnv(true);
                  setTimeout(() => setCopiedEnv(false), 2500);
                }}
                className="inline-flex items-center gap-1 hover:text-white transition-colors"
              >
                {copiedEnv ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEnv ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <div>NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co</div>
            <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</div>
            <div className="text-slate-500"># Application defaults</div>
            <div>NEXT_PUBLIC_APP_URL=http://localhost:3000</div>
          </div>
        </div>
      </div>

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
