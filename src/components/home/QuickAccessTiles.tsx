'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, UserCheck, FileText, Edit3, 
  Megaphone, CalendarDays, Image as ImageIcon, PhoneCall 
} from 'lucide-react';
import { useLanguage } from '@/lib/localization/LanguageContext';

export const QuickAccessTiles: React.FC = () => {
  const { t, language } = useLanguage();

  const shortcuts = [
    {
      title: t('studentPortal'),
      href: '/dashboard?role=student',
      icon: GraduationCap,
      bgColor: 'bg-[#124C7C] hover:bg-[#082E50]',
      badgeColor: 'border-[#124C7C]',
    },
    {
      title: t('teacherPortal'),
      href: '/dashboard?role=teacher',
      icon: UserCheck,
      bgColor: 'bg-[#198754] hover:bg-[#146c43]',
      badgeColor: 'border-[#198754]',
    },
    {
      title: t('resultLookup'),
      href: '/results',
      icon: FileText,
      bgColor: 'bg-[#5b32a3] hover:bg-[#462580]',
      badgeColor: 'border-[#5b32a3]',
    },
    {
      title: t('onlineAdmission'),
      href: '/admission',
      icon: Edit3,
      bgColor: 'bg-[#d97706] hover:bg-[#b45309]',
      badgeColor: 'border-[#d97706]',
    },
    {
      title: t('noticeBoard'),
      href: '/notices',
      icon: Megaphone,
      bgColor: 'bg-[#dc2626] hover:bg-[#b91c1c]',
      badgeColor: 'border-[#dc2626]',
    },
    {
      title: t('calendar'),
      href: '/calendar',
      icon: CalendarDays,
      bgColor: 'bg-[#0d9488] hover:bg-[#0f766e]',
      badgeColor: 'border-[#0d9488]',
    },
    {
      title: t('photoGallery'),
      href: '/gallery',
      icon: ImageIcon,
      bgColor: 'bg-[#7c3aed] hover:bg-[#6d28d9]',
      badgeColor: 'border-[#7c3aed]',
    },
    {
      title: t('contactUs'),
      href: '/contact',
      icon: PhoneCall,
      bgColor: 'bg-[#0f4c81] hover:bg-[#082E50]',
      badgeColor: 'border-[#0f4c81]',
    },
  ];

  return (
    <section className="bg-white py-6 border-b border-school-border/80 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-3">
          {shortcuts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href={item.href}
                className="group flex flex-col items-center text-center p-2 rounded-lg hover:bg-school-cream/60 transition-all duration-200"
              >
                {/* Circular Icon Wrapper */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 group-hover:shadow-lg transition-transform duration-200 ${item.bgColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                
                {/* Title */}
                <span className="mt-2.5 text-xs font-semibold text-school-body group-hover:text-school-navy leading-snug">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
