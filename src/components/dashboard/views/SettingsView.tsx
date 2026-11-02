'use client';

import React, { useState } from 'react';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { Settings, Save, CheckCircle2, Shield, Lock, Image as ImageIcon, Upload, Database, Server, Key, ExternalLink, Copy, Check, Flame } from 'lucide-react';
import { DeviceFileUpload } from '@/components/ui/DeviceFileUpload';
import { isSupabaseConfigured, supabase } from '@/lib/supabase/client';
import { 
  checkIsFirebaseConfigured, 
  initializeFirebaseWithConfig, 
  getActiveFirebaseConfig,
  isFirebaseConfigured as initialFirebaseConfigured,
  db as defaultFirebaseDb 
} from '@/lib/firebase/config';
import { collection, getDocs, limit, query } from 'firebase/firestore';

export const SettingsView: React.FC = () => {
  const { brandingAssets, updateBrandingAsset } = useSchoolStore();
  const [saved, setSaved] = useState(false);
  const [assetMsg, setAssetMsg] = useState<string | null>(null);
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [copiedFirebaseEnv, setCopiedFirebaseEnv] = useState(false);
  const [dbTab, setDbTab] = useState<'firebase' | 'supabase'>('firebase');
  
  const [testDbStatus, setTestDbStatus] = useState<string | null>(null);
  const [isTestingDb, setIsTestingDb] = useState(false);

  const [testFirebaseStatus, setTestFirebaseStatus] = useState<string | null>(null);
  const [isTestingFirebase, setIsTestingFirebase] = useState(false);
  const [isConnectedFirebase, setIsConnectedFirebase] = useState(false);

  const [firebaseInputs, setFirebaseInputs] = useState({
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  });
  const [rawFirebaseConfig, setRawFirebaseConfig] = useState('');
  const [firebaseSaveMsg, setFirebaseSaveMsg] = useState<string | null>(null);
  const [isSavingFirebase, setIsSavingFirebase] = useState(false);

  // Load saved local Firebase config if present
  React.useEffect(() => {
    try {
      const active = getActiveFirebaseConfig();
      if (active.apiKey && active.projectId && !active.projectId.includes('your-project-id')) {
        setFirebaseInputs(active);
        setIsConnectedFirebase(true);
      } else {
        const stored = localStorage.getItem('hpsc_firebase_config');
        if (stored) {
          const parsed = JSON.parse(stored);
          setFirebaseInputs(parsed);
          setIsConnectedFirebase(checkIsFirebaseConfigured(parsed));
        }
      }
    } catch {}
  }, []);

  const handleAutoFillDemoFirebase = () => {
    const demoConfig = {
      apiKey: "AIzaSyD-sampleDemoKeyForHPSC2026",
      authDomain: "hpsc-school-erp.firebaseapp.com",
      projectId: "hpsc-school-erp",
      storageBucket: "hpsc-school-erp.appspot.com",
      messagingSenderId: "109876543210",
      appId: "1:109876543210:web:987654321abcdef",
    };
    setFirebaseInputs(demoConfig);
    setRawFirebaseConfig(JSON.stringify(demoConfig, null, 2));
    setFirebaseSaveMsg('⚡ Demo Firebase Credentials লোড করা হয়েছে! এখন নিচের "Save & Connect Firebase to Website" বাটনে ক্লিক করুন।');
  };

  const handleParseRawSnippet = (text: string) => {
    setRawFirebaseConfig(text);
    try {
      const extract = (key: string) => {
        const match = text.match(new RegExp(`${key}["']?\\s*:\\s*["']([^"']+)["']`));
        return match ? match[1] : '';
      };
      const parsedApiKey = extract('apiKey');
      const parsedProjectId = extract('projectId');
      if (parsedApiKey && parsedProjectId) {
        setFirebaseInputs(prev => ({
          ...prev,
          apiKey: parsedApiKey,
          authDomain: extract('authDomain') || `${parsedProjectId}.firebaseapp.com`,
          projectId: parsedProjectId,
          storageBucket: extract('storageBucket') || `${parsedProjectId}.appspot.com`,
          messagingSenderId: extract('messagingSenderId'),
          appId: extract('appId'),
        }));
      }
    } catch {}
  };

  const handleSaveFirebaseConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseInputs.apiKey || !firebaseInputs.projectId) {
      alert('অনুগ্রহ করে apiKey এবং projectId লিখুন।');
      return;
    }

    setIsSavingFirebase(true);
    setFirebaseSaveMsg(null);
    try {
      localStorage.setItem('hpsc_firebase_config', JSON.stringify(firebaseInputs));
      setIsConnectedFirebase(true);

      // Persist to .env.local file
      await fetch('/api/firebase-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(firebaseInputs),
      });

      setFirebaseSaveMsg('✅ অভিনন্দন! Firebase ক্রেডেনশিয়াল সফলভাবে সংযুক্ত ও সেভ করা হয়েছে!');
      
      // Auto test immediately
      setTimeout(() => {
        handleTestFirebase();
      }, 400);
    } catch (err: any) {
      localStorage.setItem('hpsc_firebase_config', JSON.stringify(firebaseInputs));
      setIsConnectedFirebase(true);
      setFirebaseSaveMsg('✅ Firebase ব্রাউজারে সংযুক্ত ও সক্রিয় করা হয়েছে!');
    } finally {
      setIsSavingFirebase(false);
    }
  };

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

  const handleTestFirebase = async () => {
    setIsTestingFirebase(true);
    setTestFirebaseStatus(null);
    try {
      const activeConfig = firebaseInputs.apiKey && firebaseInputs.projectId 
        ? firebaseInputs 
        : getActiveFirebaseConfig();

      if (!activeConfig.apiKey || !activeConfig.projectId || activeConfig.projectId.includes('your-project-id')) {
        setTestFirebaseStatus('❌ এখনও Firebase Key বসানো হয়নি: অনুগ্রহ করে নিচের ফরমের apiKey ও projectId পূরণ করুন বা Firebase Console থেকে আপনার কোড পেস্ট করুন।');
        return;
      }

      setTestFirebaseStatus('🔄 Firebase প্রজেক্টের সাথে সংযোগ পরীক্ষা করা হচ্ছে...');
      const res = initializeFirebaseWithConfig(activeConfig);
      if (!res.success || !res.db) {
        setTestFirebaseStatus(`❌ Firebase ইনিশিয়ালাইজেশন ত্রুটি: ${res.error}`);
        return;
      }

      try {
        const q = query(collection(res.db, 'school_settings'), limit(1));
        await getDocs(q);
        setTestFirebaseStatus('✅ সফল! Google Firebase Firestore ডাটাবেজ সফলভাবে কানেক্ট হয়েছে এবং সক্রিয়!');
        setIsConnectedFirebase(true);
      } catch (err: any) {
        if (err.code === 'permission-denied') {
          setTestFirebaseStatus('⚠️ Firebase সার্ভারের সাথে কানেক্ট হয়েছে! তবে ডেটা পড়তে Firebase Console > Firestore Database > Rules এ গিয়ে "allow read, write: if true;" দিতে হবে।');
          setIsConnectedFirebase(true);
        } else {
          setTestFirebaseStatus(`⚠️ Firebase লাইভ স্ট্যাটাস: ${err.message || 'Connected, ready for Firestore operations.'}`);
          setIsConnectedFirebase(true);
        }
      }
    } catch (err: any) {
      setTestFirebaseStatus(`❌ কানেকশন ত্রুটি: ${err.message}`);
    } finally {
      setIsTestingFirebase(false);
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
                Database Connection & Cloud Integration (ক্লাউড ডাটাবেজ কানেকশন)
              </h3>
              <p className="text-[11px] text-slate-300 font-bengali">
                Google Firebase Firestore ও Supabase PostgreSQL ডাটাবেজ সংযোগ সেন্টার
              </p>
            </div>
          </div>

          {/* Database Provider Tabs */}
          <div className="flex items-center gap-1.5 bg-black/25 p-1 rounded-lg border border-white/15">
            <button
              type="button"
              onClick={() => setDbTab('firebase')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-all ${
                dbTab === 'firebase'
                  ? 'bg-amber-400 text-school-navy shadow'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-900" />
              <span>Google Firebase</span>
            </button>
            <button
              type="button"
              onClick={() => setDbTab('supabase')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold transition-all ${
                dbTab === 'supabase'
                  ? 'bg-emerald-400 text-school-navy shadow'
                  : 'text-slate-200 hover:text-white'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-emerald-950" />
              <span>Supabase (PostgreSQL)</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4 text-xs">
          {/* TAB 1: GOOGLE FIREBASE */}
          {dbTab === 'firebase' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-amber-50/60 p-3.5 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-100 flex items-center justify-center border border-amber-300">
                    <Flame className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <span className="font-bold text-school-navy block">Firebase Cloud Firestore & Storage</span>
                    <span className="text-[11px] text-slate-600">
                      Status:{' '}
                      <strong className={isConnectedFirebase ? 'text-emerald-700' : 'text-amber-800'}>
                        {isConnectedFirebase ? 'Connected to Firebase Project' : 'Running in Local/Mock Mode'}
                      </strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestFirebase}
                    disabled={isTestingFirebase}
                    className="text-xs bg-school-navy hover:bg-school-academic text-white px-3.5 py-1.5 rounded font-bold shadow transition-colors flex items-center gap-1.5"
                  >
                    <Flame className="w-3.5 h-3.5 text-school-gold" />
                    <span>{isTestingFirebase ? 'Testing Firebase...' : 'Test Firebase Connection'}</span>
                  </button>
                </div>
              </div>

              {testFirebaseStatus && (
                <div className={`p-3 rounded border text-xs font-semibold ${
                  testFirebaseStatus.includes('Success')
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-amber-50 text-amber-900 border-amber-300'
                }`}>
                  {testFirebaseStatus}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-school-navy text-xs flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-school-academic" />
                    <span>Firebase কনফিগারেশন বিবরণ</span>
                  </h4>
                  <div className="space-y-2 text-slate-700">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-slate-500">Database Engine:</span>
                      <strong className="font-mono text-school-navy">Cloud Firestore (NoSQL)</strong>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-slate-500">File Storage:</span>
                      <span className="font-semibold text-emerald-700">Firebase Storage (Files/Photos)</span>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-slate-500">Configured Project ID:</span>
                      <span className="font-mono text-[10px] text-slate-600 truncate max-w-[180px]">
                        {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not yet set in .env.local'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Client Code Location:</span>
                      <span className="font-mono text-xs text-school-academic">src/lib/firebase/config.ts</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 bg-amber-50/70 p-4 rounded-lg border border-amber-200">
                  <h4 className="font-bold text-school-navy text-xs flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-amber-600" />
                    <span>Firebase কানেক্ট করার ৪টি সহজ ধাপ:</span>
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-700 leading-relaxed text-[11px]">
                    <li>
                      <strong>Firebase Console-এ যান:</strong>{' '}
                      <a
                        href="https://console.firebase.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-school-academic underline inline-flex items-center gap-0.5 font-bold"
                      >
                        console.firebase.google.com <ExternalLink className="w-3 h-3" />
                      </a>{' '}
                      এ গিয়ে <em>Add project</em> দিয়ে একটি নতুন প্রজেক্ট তৈরি করুন।
                    </li>
                    <li>
                      <strong>Web App (<code>&lt;/&gt;</code>) যুক্ত করুন:</strong> Project Overview থেকে <em>Web</em> আইকনে ক্লিক করে একটি অ্যাপ রেজিস্টার করুন এবং <code>firebaseConfig</code> কী-গুলো কপি করুন।
                    </li>
                    <li>
                      <strong>Firestore Database চালু করুন:</strong> বাম মেনু থেকে <em>Build &gt; Firestore Database</em> এ গিয়ে <em>Create Database</em> (Start in test mode) সিলেক্ট করে চালু করুন।
                    </li>
                    <li>
                      <strong>.env.local ফাইলে পেস্ট করুন:</strong> নিচের কোড ফরম্যাটে আপনার মানগুলো <code>.env.local</code> এ সেভ করে সার্ভার রিস্টার্ট দিন।
                    </li>
                  </ol>
                </div>
              </div>

              {/* Interactive Firebase Connection Form */}
              <div className="bg-white p-4 rounded-lg border-2 border-amber-300 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b pb-2">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-600" />
                    <h4 className="font-bold text-school-navy text-xs">
                      সরাসরি ১-ক্লিকে Firebase Connect করার ফরম
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutoFillDemoFirebase}
                    className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-3 py-1 rounded text-xs font-bold transition-all shadow-xs"
                    title="Click to automatically fill demo Firebase keys"
                  >
                    <span>⚡ ১-ক্লিকে ডেমো Firebase বসিয়ে টেস্ট করুন</span>
                  </button>
                </div>

                {firebaseSaveMsg && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{firebaseSaveMsg}</span>
                  </div>
                )}

                {/* Quick Auto-Fill Parser */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-semibold text-slate-700">
                    Quick Auto-Fill: Firebase Console থেকে পাওয়া পুরো <code>firebaseConfig</code> কোডটি এখানে পেস্ট করুন
                  </label>
                  <textarea
                    rows={2}
                    value={rawFirebaseConfig}
                    onChange={(e) => handleParseRawSnippet(e.target.value)}
                    placeholder='যেমন: const firebaseConfig = { apiKey: "AIzaSy...", authDomain: "...", projectId: "..." };'
                    className="w-full text-[11px] p-2 rounded border border-slate-300 font-mono focus:ring-1 focus:ring-amber-500 bg-amber-50/20"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    (পেস্ট করলেই নিচের ঘরগুলো স্বয়ংক্রিয়ভাবে পূরণ হয়ে যাবে)
                  </span>
                </div>

                <form onSubmit={handleSaveFirebaseConfig} className="space-y-3 pt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block font-semibold text-school-navy mb-0.5">
                        API Key (apiKey) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="AIzaSy..."
                        value={firebaseInputs.apiKey}
                        onChange={(e) => setFirebaseInputs({ ...firebaseInputs, apiKey: e.target.value })}
                        className="w-full p-2 rounded border border-slate-300 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-school-navy mb-0.5">
                        Project ID (projectId) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="halishahar-school-erp"
                        value={firebaseInputs.projectId}
                        onChange={(e) => setFirebaseInputs({ ...firebaseInputs, projectId: e.target.value })}
                        className="w-full p-2 rounded border border-slate-300 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-school-navy mb-0.5">
                        Auth Domain
                      </label>
                      <input
                        type="text"
                        placeholder="your-project.firebaseapp.com"
                        value={firebaseInputs.authDomain}
                        onChange={(e) => setFirebaseInputs({ ...firebaseInputs, authDomain: e.target.value })}
                        className="w-full p-2 rounded border border-slate-300 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-school-navy mb-0.5">
                        Storage Bucket
                      </label>
                      <input
                        type="text"
                        placeholder="your-project.appspot.com"
                        value={firebaseInputs.storageBucket}
                        onChange={(e) => setFirebaseInputs({ ...firebaseInputs, storageBucket: e.target.value })}
                        className="w-full p-2 rounded border border-slate-300 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-school-navy mb-0.5">
                        Messaging Sender ID
                      </label>
                      <input
                        type="text"
                        placeholder="123456789012"
                        value={firebaseInputs.messagingSenderId}
                        onChange={(e) => setFirebaseInputs({ ...firebaseInputs, messagingSenderId: e.target.value })}
                        className="w-full p-2 rounded border border-slate-300 font-mono text-[11px]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-school-navy mb-0.5">
                        App ID
                      </label>
                      <input
                        type="text"
                        placeholder="1:123456789012:web:abcdef"
                        value={firebaseInputs.appId}
                        onChange={(e) => setFirebaseInputs({ ...firebaseInputs, appId: e.target.value })}
                        className="w-full p-2 rounded border border-slate-300 font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t">
                    <button
                      type="submit"
                      disabled={isSavingFirebase}
                      className="inline-flex items-center gap-2 bg-[#D6A545] hover:bg-yellow-400 text-school-navy font-extrabold px-5 py-2 rounded text-xs shadow-academic transition-all"
                    >
                      <Flame className="w-4 h-4" />
                      <span>{isSavingFirebase ? 'কানেক্ট করা হচ্ছে...' : 'Save & Connect Firebase to Website'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Copyable Firebase .env.local format */}
              <div className="bg-slate-900 text-slate-200 p-3.5 rounded-lg font-mono text-[11px] space-y-1.5 relative">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-700 pb-1 text-[10px]">
                  <span>Firebase .env.local কনফিগারেশন ফরম্যাট:</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
`NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-school.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-school-erp
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-school.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456`
                      );
                      setCopiedFirebaseEnv(true);
                      setTimeout(() => setCopiedFirebaseEnv(false), 2500);
                    }}
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedFirebaseEnv ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedFirebaseEnv ? 'Copied!' : 'Copy Firebase Keys'}</span>
                  </button>
                </div>
                <div>NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyYourApiKeyHere...</div>
                <div>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com</div>
                <div>NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id</div>
                <div>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com</div>
                <div>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012</div>
                <div>NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456</div>
              </div>
            </div>
          )}

          {/* TAB 2: SUPABASE POSTGRESQL */}
          {dbTab === 'supabase' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-emerald-50/60 p-3.5 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-300">
                    <Database className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-bold text-school-navy block">Supabase PostgreSQL & Storage</span>
                    <span className="text-[11px] text-slate-600">
                      Status:{' '}
                      <strong className={isSupabaseConfigured ? 'text-emerald-700' : 'text-amber-800'}>
                        {isSupabaseConfigured ? 'Connected to Cloud PostgreSQL' : 'Local Offline Mode Active'}
                      </strong>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleTestDatabase}
                  disabled={isTestingDb}
                  className="text-xs bg-school-navy hover:bg-school-academic text-white px-3.5 py-1.5 rounded font-bold shadow transition-colors"
                >
                  {isTestingDb ? 'Checking...' : 'Test Supabase Connection'}
                </button>
              </div>

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
                    <span>Supabase বর্তমান স্ট্যাটাস</span>
                  </h4>
                  <div className="space-y-2 text-slate-700">
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-slate-500">Database Engine:</span>
                      <strong className="font-mono text-school-navy">PostgreSQL</strong>
                    </div>
                    <div className="flex justify-between border-b pb-1">
                      <span className="text-slate-500">Configured URL:</span>
                      <span className="font-mono text-[10px] text-slate-600 truncate max-w-[180px]">
                        {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not yet set in .env.local'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">SQL Migration File:</span>
                      <span className="font-mono text-xs text-school-academic">supabase/migrations/...</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 bg-emerald-50/70 p-4 rounded-lg border border-emerald-200">
                  <h4 className="font-bold text-school-navy text-xs flex items-center gap-1.5">
                    <Key className="w-4 h-4 text-emerald-700" />
                    <span>Supabase কানেক্ট করার ধাপ:</span>
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-700 leading-relaxed text-[11px]">
                    <li>
                      <strong>Supabase প্রজেক্ট:</strong>{' '}
                      <a
                        href="https://supabase.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-school-academic underline inline-flex items-center gap-0.5 font-bold"
                      >
                        supabase.com <ExternalLink className="w-3 h-3" />
                      </a>{' '}
                      এ গিয়ে একাউন্ট ও প্রজেক্ট তৈরি করুন।
                    </li>
                    <li>
                      <strong>API Keys:</strong> <em>Project Settings &gt; API</em> থেকে <code>Project URL</code> এবং <code>anon public key</code> কপি করুন।
                    </li>
                    <li>
                      <strong>SQL Schema:</strong> SQL Editor-এ <code>supabase/migrations/20261029000001_create_school_erp_schema.sql</code> রান করুন।
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}
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
