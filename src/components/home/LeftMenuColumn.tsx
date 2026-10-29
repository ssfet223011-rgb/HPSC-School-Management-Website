'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, Home, Info, BookOpen, GraduationCap, FileText, 
  CalendarDays, Megaphone, Image as ImageIcon, Users, UserCheck, 
  BookMarked, Phone, Book
} from 'lucide-react';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { SCHOOL_CONFIG } from '@/config/school.config';

export const LeftMenuColumn: React.FC = () => {
  const { language } = useLanguage();

  const menuItems = [
    { href: '/', labelBn: 'Home', labelEn: 'Home', icon: Home },
    { href: '/about', labelBn: 'About Our School', labelEn: 'About Our School', icon: Info },
    { href: '/academic', labelBn: 'Academic Information', labelEn: 'Academic Information', icon: BookOpen },
    { href: '/admission', labelBn: 'Admission', labelEn: 'Admission', icon: GraduationCap },
    { href: '/results', labelBn: 'Result', labelEn: 'Result', icon: FileText },
    { href: '/routine', labelBn: 'Class Routine', labelEn: 'Class Routine', icon: CalendarDays },
    { href: '/notices', labelBn: 'Notice Board', labelEn: 'Notice Board', icon: Megaphone },
    { href: '/gallery', labelBn: 'Photo Gallery', labelEn: 'Photo Gallery', icon: ImageIcon },
    { href: '/students', labelBn: 'Student Information', labelEn: 'Student Information', icon: Users },
    { href: '/teachers', labelBn: 'Teacher Information', labelEn: 'Teacher Information', icon: UserCheck },
    { href: '/library', labelBn: 'Library', labelEn: 'Library', icon: BookMarked },
    { href: '/contact', labelBn: 'Contact Us', labelEn: 'Contact Us', icon: Phone },
  ];

  return (
    <aside className="space-y-5 no-print">
      {/* Main Menu Box */}
      <div className="bg-white rounded-lg border border-school-border shadow-academic overflow-hidden">
        <div className="bg-[#082E50] text-white px-4 py-2.5 flex items-center gap-2 border-b-2 border-school-gold">
          <Menu className="w-4 h-4 text-school-gold" />
          <h3 className="font-bold text-sm tracking-wide">Main Menu</h3>
        </div>

        <nav className="p-1.5 divide-y divide-slate-100">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-school-body hover:bg-school-cream hover:text-school-academic rounded transition-colors group"
              >
                <Icon className="w-3.5 h-3.5 text-school-academic group-hover:text-school-gold transition-colors shrink-0" />
                <span className="truncate">{item.labelBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Motivational / Campus Banner Box */}
      <div className="rounded-lg overflow-hidden border border-school-border shadow-academic bg-[#082E50] text-white group">
        <div className="relative h-44 w-full">
          <Image
            src={SCHOOL_CONFIG.branding.campusMainUrl}
            alt="School Campus Building"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
        </div>
        <div className="p-4 text-center bg-gradient-to-b from-[#082E50] to-[#041a2e] space-y-2 border-t border-school-gold/40">
          <p className="text-base font-serif italic text-school-lightGold font-bold tracking-wide">
            &ldquo;Together for a Brighter Tomorrow&rdquo;
          </p>
          <div className="flex justify-center pt-1">
            <Book className="w-5 h-5 text-school-gold opacity-90" />
          </div>
        </div>
      </div>
    </aside>
  );
};
