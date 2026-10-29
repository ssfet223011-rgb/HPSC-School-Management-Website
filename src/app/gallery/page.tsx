'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { Image as ImageIcon, X, ZoomIn } from 'lucide-react';

const galleryPhotos = [
  {
    id: 1,
    titleEn: 'Main Campus Entrance Gate & Boundary Signboard',
    titleBn: 'স্কুল ক্যাম্পাস ও প্রধান প্রবেশ তোরণ',
    category: 'Campus',
    image: SCHOOL_CONFIG.branding.campusMainUrl,
  },
  {
    id: 2,
    titleEn: 'Academic Building & Classrooms Architecture',
    titleBn: 'একাডেমিক ভবন ও শ্রেণিকক্ষ অবকাঠামো',
    category: 'Campus',
    image: SCHOOL_CONFIG.branding.campusBannerUrl,
  },
  {
    id: 3,
    titleEn: 'Annual Sports Day & Physical Education Program',
    titleBn: 'বার্ষিক ক্রীড়া ও শরীরচর্চা প্রতিযোগিতা',
    category: 'Events',
    image: SCHOOL_CONFIG.branding.campusMainUrl,
  },
  {
    id: 4,
    titleEn: 'Secondary Science Fair & Practical Demonstrations',
    titleBn: 'বিজ্ঞান মেলা ও ব্যবহারিক প্রদর্শনী',
    category: 'Academic',
    image: SCHOOL_CONFIG.branding.campusBannerUrl,
  },
  {
    id: 5,
    titleEn: 'ICT Computer Lab & Multimedia Education',
    titleBn: 'আইসিটি কম্পিউটার ল্যাব ও ডিজিটাল শিক্ষা',
    category: 'Academic',
    image: SCHOOL_CONFIG.branding.campusMainUrl,
  },
  {
    id: 6,
    titleEn: 'Guardian Assembly & Community Outreach Program',
    titleBn: 'অভিভাবক সমাবেশ ও সাংস্কৃতিক অনুষ্ঠান',
    category: 'Events',
    image: SCHOOL_CONFIG.branding.campusBannerUrl,
  },
];

export default function GalleryPage() {
  const { language } = useLanguage();
  const [selectedCat, setSelectedCat] = useState('All');
  const [lightboxImg, setLightboxImg] = useState<any | null>(null);

  const filtered = selectedCat === 'All' 
    ? galleryPhotos 
    : galleryPhotos.filter(p => p.category === selectedCat);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
          { label: language === 'bn' ? 'ফটো গ্যালারি' : 'Photo Gallery' },
        ]}
      />

      <div className="bg-school-navy text-white p-6 sm:p-8 rounded-lg shadow-academic flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-school-lightGold uppercase tracking-wider bg-white/10 px-2.5 py-1 rounded">
            Campus Life & Memories
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif-heading mt-2">
            {language === 'bn' ? 'ফটো ও চিত্র গ্যালারি' : 'School Photo Gallery'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 font-bengali">
            {SCHOOL_CONFIG.identity.nameEn} • {SCHOOL_CONFIG.identity.nameBn}
          </p>
        </div>

        {/* Categories */}
        <div className="flex bg-white/10 p-1 rounded-lg border border-white/20">
          {['All', 'Campus', 'Academic', 'Events'].map(c => (
            <button
              key={c}
              onClick={() => setSelectedCat(c)}
              className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
                selectedCat === c ? 'bg-school-gold text-school-navy shadow' : 'text-white hover:text-school-lightGold'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            onClick={() => setLightboxImg(item)}
            className="group cursor-pointer bg-white rounded-lg border border-school-border overflow-hidden shadow-academic hover:shadow-lg transition-all"
          >
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.titleEn}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 text-school-navy flex items-center justify-center shadow">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="p-4 space-y-1">
              <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {item.category}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-school-navy line-clamp-1 font-bengali">
                {language === 'bn' ? item.titleBn : item.titleEn}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute right-3 top-3 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-[65vh] w-full bg-black">
              <Image
                src={lightboxImg.image}
                alt={lightboxImg.titleEn}
                fill
                className="object-contain"
              />
            </div>

            <div className="p-4 bg-white border-t border-slate-200">
              <h3 className="text-base font-bold text-school-navy font-bengali">
                {language === 'bn' ? lightboxImg.titleBn : lightboxImg.titleEn}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Category: {lightboxImg.category} • Halishahar Public School and College
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
