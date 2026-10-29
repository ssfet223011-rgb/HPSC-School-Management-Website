'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Info, BookOpen, GraduationCap, Users, UserCheck, 
  Megaphone, Image as ImageIcon, Phone, Search, Menu, X, ChevronDown, User, KeyRound 
} from 'lucide-react';
import { useLanguage } from '@/lib/localization/LanguageContext';

export const Navbar: React.FC = () => {
  const { t, language } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [academicDropdown, setAcademicDropdown] = useState(false);
  const [aboutDropdown, setAboutDropdown] = useState(false);

  const navLinks = [
    { href: '/', label: t('navHome'), icon: Home },
    { 
      href: '/about', 
      label: t('navAbout'), 
      icon: Info,
      hasDropdown: true,
      subItems: [
        { href: '/about', label: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About School' },
        { href: '/survey', label: language === 'bn' ? 'বার্ষিক জরিপ তথ্য' : 'Annual Survey' },
      ]
    },
    { 
      href: '/academic', 
      label: t('navAcademic'), 
      icon: BookOpen,
      hasDropdown: true,
      subItems: [
        { href: '/academic', label: language === 'bn' ? 'একাডেমিক তথ্য' : 'Academic Overview' },
        { href: '/routine', label: language === 'bn' ? 'ক্লাস রুটিন' : 'Class Routine' },
        { href: '/exam-routine', label: language === 'bn' ? 'পরীক্ষার রুটিন' : 'Exam Routine' },
        { href: '/results', label: language === 'bn' ? 'পরীক্ষার ফলাফল' : 'Results Lookup' },
      ]
    },
    { href: '/admission', label: t('navAdmission'), icon: GraduationCap },
    { href: '/students', label: t('navStudents'), icon: Users },
    { href: '/teachers', label: t('navTeachers'), icon: UserCheck },
    { href: '/notices', label: t('navNotices'), icon: Megaphone },
    { href: '/gallery', label: t('navGallery'), icon: ImageIcon },
    { href: '/contact', label: t('navContact'), icon: Phone },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/notices?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <nav className="bg-[#D6A545] text-school-navy sticky top-0 z-40 shadow-md border-b-2 border-[#b58428] no-print">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between min-h-[48px]">
        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden py-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-md hover:bg-black/10 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span className="font-bold text-sm">
            {language === 'bn' ? 'মেনু' : 'Menu'}
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1 py-1 font-semibold text-xs sm:text-[13px]">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            if (link.hasDropdown) {
              return (
                <div 
                  key={link.href} 
                  className="relative group"
                  onMouseEnter={() => link.href === '/academic' ? setAcademicDropdown(true) : setAboutDropdown(true)}
                  onMouseLeave={() => link.href === '/academic' ? setAcademicDropdown(false) : setAboutDropdown(false)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded transition-all hover:bg-black/10 hover:text-black ${
                      isActive ? 'bg-black/15 font-bold shadow-inner' : ''
                    }`}
                  >
                    <Icon className="w-4 h-4 opacity-90" />
                    <span>{link.label}</span>
                    <ChevronDown className="w-3 h-3 opacity-75" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className="absolute left-0 top-full hidden group-hover:block w-48 bg-white border border-school-border shadow-lg rounded-md py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    {link.subItems?.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2 text-xs text-school-body hover:bg-school-cream hover:text-school-academic font-medium transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded transition-all hover:bg-black/10 hover:text-black ${
                  isActive ? 'bg-black/15 font-bold shadow-inner' : ''
                }`}
              >
                <Icon className="w-4 h-4 opacity-90" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Search & Login on Desktop */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Website Search Box */}
          <form onSubmit={handleSearchSubmit} className="flex items-center relative my-1.5">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 lg:w-44 bg-white/90 text-school-body placeholder-slate-500 text-xs px-3 py-1.5 pr-8 rounded-full border border-amber-600/40 focus:outline-none focus:ring-2 focus:ring-school-navy focus:bg-white transition-all shadow-inner"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-2 text-school-navy hover:text-school-academic transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Login Option */}
          <Link
            href="/login"
            className="flex items-center gap-1.5 bg-school-navy hover:bg-[#051f36] text-white px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow hover:scale-105 border border-amber-400/40"
          >
            <User className="w-3.5 h-3.5 text-school-gold" />
            <span>{language === 'bn' ? 'লগইন' : 'Login'}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-school-navy text-white border-t border-amber-600/30 px-4 py-3 space-y-1">
          <div className="pb-2 border-b border-white/10">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-[#D6A545] hover:bg-yellow-400 text-school-navy font-bold py-2 rounded text-xs shadow"
            >
              <KeyRound className="w-4 h-4" />
              <span>{language === 'bn' ? 'লগইন করুন (Super Admin / Teacher / Student)' : 'Sign In to Portal'}</span>
            </Link>
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <div key={link.href} className="border-b border-white/10 last:border-0 py-1">
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-2 py-1.5 text-sm hover:text-school-lightGold transition-colors"
                >
                  <Icon className="w-4 h-4 text-school-gold" />
                  <span>{link.label}</span>
                </Link>
                {link.subItems && (
                  <div className="pl-6 space-y-1 py-1">
                    {link.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block text-xs text-slate-300 hover:text-white py-1"
                      >
                        • {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <div className="pt-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-school-gold text-school-navy font-bold py-2 rounded text-sm hover:bg-yellow-400"
            >
              School ERP Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
