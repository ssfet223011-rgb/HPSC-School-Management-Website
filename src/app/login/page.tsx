'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldAlert, UserCheck, GraduationCap, Lock, User, 
  ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff, KeyRound, Sparkles 
} from 'lucide-react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useLanguage } from '@/lib/localization/LanguageContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useSchoolStore();
  const { language } = useLanguage();

  const [activePortal, setActivePortal] = useState<'super_admin' | 'teacher' | 'student'>('super_admin');
  const [loginId, setLoginId] = useState('admin');
  const [password, setPassword] = useState('admin@hpsc2026');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const portals = [
    {
      id: 'super_admin' as const,
      labelEn: 'Super Admin Portal',
      labelBn: 'সুপার এডমিন (মালিক ও নিয়ন্ত্রক)',
      descEn: 'Full Authority: Controls entire website, approves teachers & students, system settings.',
      descBn: 'ওয়েবসাইটের সার্বিক নিয়ন্ত্রণ, শিক্ষক ও শিক্ষার্থী অনুমোদন এবং প্রাতিষ্ঠানিক সেটিংস।',
      icon: ShieldAlert,
      themeColor: 'from-[#082E50] to-[#124C7C]',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      defaultId: 'admin',
      defaultPass: 'admin@hpsc2026',
    },
    {
      id: 'teacher' as const,
      labelEn: 'Teachers & Editors Portal',
      labelBn: 'শিক্ষক ও এডিটর পোর্টাল',
      descEn: 'Editor Access: Upload course topics, study materials, record attendance, enter marks.',
      descBn: 'কোর্স টপিক ও লেকচার ফাইল আপলোড, ক্লাসের উপস্থিতি ও ফলাফল মূল্যায়ন।',
      icon: UserCheck,
      themeColor: 'from-[#198754] to-[#0f5132]',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      defaultId: 'EMP-001',
      defaultPass: 'teacher@123',
    },
    {
      id: 'student' as const,
      labelEn: 'Students Portal',
      labelBn: 'শিক্ষার্থী পোর্টাল',
      descEn: 'Student Access: Download lecture notes, syllabus, check attendance, report card, routine.',
      descBn: 'লেকচার ফাইল ও নোট ডাউনলোড, প্রোগ্রেস কার্ড, ক্লাসের উপস্থিতি ও রুটিন।',
      icon: GraduationCap,
      themeColor: 'from-[#1C5A91] to-[#082E50]',
      badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      defaultId: 'HPSC-2026-0801',
      defaultPass: 'student@123',
    },
  ];

  const currentPortalConfig = portals.find(p => p.id === activePortal)!;

  const handlePortalSwitch = (portalId: 'super_admin' | 'teacher' | 'student') => {
    setActivePortal(portalId);
    setErrorMsg('');
    const target = portals.find(p => p.id === portalId)!;
    setLoginId(target.defaultId);
    setPassword(target.defaultPass);
  };

  const handleQuickFill = () => {
    setErrorMsg('');
    setLoginId(currentPortalConfig.defaultId);
    setPassword(currentPortalConfig.defaultPass);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const res = login(activePortal, loginId, password);
      setLoading(false);

      if (res.success) {
        // Redirect to dashboard with right view
        if (activePortal === 'super_admin') {
          router.push('/dashboard?role=super_admin&view=user_approvals');
        } else if (activePortal === 'teacher') {
          router.push('/dashboard?role=teacher&view=course_editor');
        } else {
          router.push('/dashboard?role=student&view=student_portal');
        }
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-b from-[#FBF8F0] via-slate-50 to-[#E8DFC9]/30 py-10 px-4 flex flex-col justify-center items-center">
      <div className="max-w-xl w-full space-y-6">
        {/* Institution Brand Badge */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <div className="w-20 h-20 relative mx-auto bg-white rounded-xl p-1.5 border-2 border-school-gold shadow-md hover:scale-105 transition-transform">
              <Image
                src={SCHOOL_CONFIG.branding.logoUrl}
                alt={SCHOOL_CONFIG.identity.nameEn}
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <h1 className="text-xl sm:text-2xl font-extrabold text-school-navy font-serif-heading tracking-tight">
            {SCHOOL_CONFIG.identity.nameEn}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-school-academic font-bengali">
            {SCHOOL_CONFIG.identity.nameBn} • EIIN: {SCHOOL_CONFIG.identity.eiin}
          </p>
        </div>

        {/* 3 Portal Selection Tabs */}
        <div className="grid grid-cols-3 gap-2 bg-slate-200/80 p-1.5 rounded-xl border border-slate-300">
          {portals.map(p => {
            const Icon = p.icon;
            const isSelected = activePortal === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handlePortalSwitch(p.id)}
                className={`flex flex-col items-center py-2.5 px-1 rounded-lg text-center transition-all ${
                  isSelected
                    ? 'bg-white text-school-navy shadow-md font-bold scale-[1.02] border border-school-border'
                    : 'text-slate-600 hover:text-school-navy hover:bg-white/50 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-amber-600' : 'text-slate-500'}`} />
                <span className="text-[11px] sm:text-xs leading-tight font-bengali">
                  {language === 'bn' ? p.labelBn.split(' ')[0] : p.labelEn.split(' ')[0]}
                </span>
                <span className="text-[9px] text-slate-400 uppercase hidden sm:block">
                  {p.id.replace('_', ' ')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Login Card */}
        <div className="bg-white rounded-2xl border border-school-border shadow-2xl overflow-hidden">
          {/* Card Top Header */}
          <div className={`p-5 bg-gradient-to-r ${currentPortalConfig.themeColor} text-white flex items-center justify-between`}>
            <div className="space-y-1">
              <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border ${currentPortalConfig.badgeColor}`}>
                {currentPortalConfig.labelEn}
              </span>
              <h2 className="text-base sm:text-lg font-bold font-bengali">
                {currentPortalConfig.labelBn}
              </h2>
              <p className="text-[11px] text-slate-200 font-bengali max-w-sm leading-snug">
                {language === 'bn' ? currentPortalConfig.descBn : currentPortalConfig.descEn}
              </p>
            </div>

            <currentPortalConfig.icon className="w-10 h-10 text-white/40 shrink-0 hidden sm:block" />
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {errorMsg && (
              <div className="bg-rose-50 border border-rose-300 text-rose-800 p-3 rounded-lg flex items-start gap-2.5 text-xs animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">{errorMsg}</div>
              </div>
            )}

            {/* Input 1: Login ID */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-school-navy">
                {activePortal === 'super_admin' && (language === 'bn' ? 'সুপার এডমিন আইডি বা ইমেইল*' : 'Super Admin ID or Email*')}
                {activePortal === 'teacher' && (language === 'bn' ? 'শিক্ষক / এমপ্লয়ী আইডি বা ইমেইল*' : 'Teacher / Employee ID or Email*')}
                {activePortal === 'student' && (language === 'bn' ? 'শিক্ষার্থী আইডি (Student ID)*' : 'Student ID (e.g. HPSC-2026-0801)*')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder={
                    activePortal === 'super_admin' ? 'admin or admin@hpscctg.edu.bd' :
                    activePortal === 'teacher' ? 'EMP-001 or rafiqul@hpscctg.edu.bd' :
                    'HPSC-2026-0801'
                  }
                  className="w-full text-xs sm:text-sm p-3 pl-10 rounded-lg border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none font-mono"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Input 2: Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-school-navy">
                  {language === 'bn' ? 'গোপন পাসওয়ার্ড (Password)*' : 'Account Password*'}
                </label>
                <span className="text-[11px] text-slate-400 font-mono">Secured</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-xs sm:text-sm p-3 pl-10 pr-10 rounded-lg border border-school-border focus:ring-2 focus:ring-school-navy focus:outline-none font-mono"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Auto-Fill Demo Button */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleQuickFill}
                className="inline-flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-900 font-semibold bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-school-gold" />
                <span>Auto-Fill Demo Credentials</span>
              </button>

              <span className="text-[11px] text-slate-500 font-mono">
                {activePortal === 'super_admin' ? 'Role: Owner' : activePortal === 'teacher' ? 'Role: Editor' : 'Role: Student'}
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-white font-extrabold text-sm shadow-md transition-all ${
                activePortal === 'super_admin' ? 'bg-[#082E50] hover:bg-[#124C7C]' :
                activePortal === 'teacher' ? 'bg-[#198754] hover:bg-[#146c43]' :
                'bg-[#1C5A91] hover:bg-[#082E50]'
              }`}
            >
              <KeyRound className="w-4 h-4 text-school-gold" />
              <span>
                {loading ? 'Authenticating...' : 
                  activePortal === 'super_admin' ? 'Login as Super Admin (মালিক)' :
                  activePortal === 'teacher' ? 'Login as Teacher & Editor' :
                  'Login to Student Portal'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Credentials Quick Reference Table for User Testing */}
        <div className="bg-white rounded-xl border border-school-border p-4 shadow-sm space-y-2 text-xs">
          <div className="font-bold text-school-navy flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-school-gold" />
            <span>Pre-Configured Official Login Credentials (পরীক্ষার জন্য তালিকা):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
            <div className="p-2.5 rounded bg-slate-50 border">
              <strong className="block text-school-navy font-sans text-xs">Super Admin (Owner)</strong>
              <div>ID: <span className="text-amber-800 font-bold">admin</span></div>
              <div>Pass: <span className="text-slate-600">admin@hpsc2026</span></div>
            </div>

            <div className="p-2.5 rounded bg-slate-50 border">
              <strong className="block text-emerald-800 font-sans text-xs">Teacher & Editor</strong>
              <div>ID: <span className="text-emerald-800 font-bold">EMP-001</span></div>
              <div>Pass: <span className="text-slate-600">teacher@123</span></div>
            </div>

            <div className="p-2.5 rounded bg-slate-50 border">
              <strong className="block text-blue-800 font-sans text-xs">Student Portal</strong>
              <div>ID: <span className="text-blue-800 font-bold">HPSC-2026-0801</span></div>
              <div>Pass: <span className="text-slate-600">student@123</span></div>
            </div>
          </div>
        </div>

        {/* Return to Home link */}
        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs font-semibold text-school-navy hover:text-school-academic hover:underline transition-colors"
          >
            ← Return to Halishahar Public School and College Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
