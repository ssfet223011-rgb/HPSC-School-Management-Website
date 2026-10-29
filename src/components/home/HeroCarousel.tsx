'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, GraduationCap, BookOpen } from 'lucide-react';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useLanguage } from '@/lib/localization/LanguageContext';

const slides = [
  {
    image: SCHOOL_CONFIG.branding.campusBannerUrl,
    titleEn: 'Education Builds A Better Future',
    titleBn: 'শিক্ষা মানুষের আলোকিত ভবিষ্যৎ গড়ে তোলে',
    subtitleEn: 'HALISHAHAR PUBLIC SCHOOL AND COLLEGE',
    subtitleBn: 'হালিশহর পাবলিক স্কুল এন্ড কলেজ',
    descEn: 'Committed to academic excellence, discipline, and moral values since 2002.',
    descBn: '২০০২ সাল থেকে চট্টগ্রামে জ্ঞান, শৃঙ্খলা ও নৈতিক শিক্ষার আদর্শ পীঠস্থান।',
  },
  {
    image: SCHOOL_CONFIG.branding.campusMainUrl,
    titleEn: 'Admissions Open for Academic Session 2026',
    titleBn: '২০২৬ শিক্ষাবর্ষে ভর্তি আবেদন চলছে',
    subtitleEn: 'Class 6 to Class 9 (Secondary Level)',
    subtitleBn: '৬ষ্ঠ থেকে ৯ম শ্রেণি (মাধ্যমিক শাখা)',
    descEn: 'Apply online easily and track your application status in real-time.',
    descBn: 'অনলাইনে সহজে আবেদন করুন এবং রিয়েল-টাইম আবেদনের অগ্রগতি জানুন।',
  },
];

export const HeroCarousel: React.FC = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative w-full h-[280px] sm:h-[340px] md:h-[400px] overflow-hidden bg-school-navy shadow-md no-print">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 transition-opacity duration-700">
        <Image
          src={slide.image}
          alt="School Campus Banner"
          fill
          className="object-cover opacity-35"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-school-navy via-school-navy/85 to-transparent" />
      </div>

      {/* Slide Content */}
      <div className="relative max-w-7xl mx-auto h-full px-6 sm:px-10 flex flex-col justify-center text-white z-10">
        <div className="max-w-2xl space-y-3 animate-in fade-in duration-500">
          <div className="inline-block bg-school-gold/25 text-school-lightGold px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider border border-school-gold/40">
            {language === 'bn' ? slide.subtitleBn : slide.subtitleEn}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-serif-heading leading-tight tracking-tight drop-shadow-md">
            {language === 'bn' ? slide.titleBn : slide.titleEn}
          </h2>

          <p className="text-sm sm:text-base text-slate-200 font-medium max-w-xl line-clamp-2 drop-shadow">
            {language === 'bn' ? slide.descBn : slide.descEn}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/admission"
              className="inline-flex items-center gap-2 bg-school-gold hover:bg-[#e0b04c] text-school-navy font-bold px-5 py-2.5 rounded shadow-academic transition-all text-xs sm:text-sm"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{language === 'bn' ? 'ভর্তি আবেদন করুন' : 'Apply for Admission'}</span>
            </Link>
            <Link
              href="/academic"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2.5 rounded border border-white/30 backdrop-blur-sm transition-all text-xs sm:text-sm"
            >
              <BookOpen className="w-4 h-4 text-school-lightGold" />
              <span>{language === 'bn' ? 'একাডেমিক তথ্য' : 'Academic Overview'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Prev / Next Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors border border-white/20"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors border border-white/20"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              currentSlide === idx ? 'bg-school-gold w-6' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
