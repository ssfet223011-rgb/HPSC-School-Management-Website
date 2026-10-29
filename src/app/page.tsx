'use client';

import React from 'react';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { QuickAccessTiles } from '@/components/home/QuickAccessTiles';
import { LeftMenuColumn } from '@/components/home/LeftMenuColumn';
import { AnnualSurveyCard } from '@/components/home/AnnualSurveyCard';
import { RightWidgetsColumn } from '@/components/home/RightWidgetsColumn';

export default function HomePage() {
  return (
    <div className="space-y-6 pb-12">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. 8 Quick Access Portal Shortcuts */}
      <QuickAccessTiles />

      {/* 3. Main 3-Column Content Layout */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (Main Menu + Campus Slogan) */}
          <div className="lg:col-span-3">
            <LeftMenuColumn />
          </div>

          {/* Center Column (Annual Survey Information Document Table) */}
          <div className="lg:col-span-6">
            <AnnualSurveyCard />
          </div>

          {/* Right Column (Quick Links + Latest Notices + Gallery + Quote) */}
          <div className="lg:col-span-3">
            <RightWidgetsColumn />
          </div>
        </div>
      </div>
    </div>
  );
}
