'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { SCHOOL_CONFIG } from '@/config/school.config';
import { useLanguage } from '@/lib/localization/LanguageContext';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { DeviceFileUpload } from '@/components/ui/DeviceFileUpload';
import { 
  Image as ImageIcon, X, ZoomIn, Upload, Plus, Trash2, 
  Camera, CheckCircle2, RefreshCw, Sparkles 
} from 'lucide-react';
import { GalleryPhoto } from '@/types';

export default function GalleryPage() {
  const { language } = useLanguage();
  const { galleryPhotos, addGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto } = useSchoolStore();

  const [selectedCat, setSelectedCat] = useState('All');
  const [lightboxImg, setLightboxImg] = useState<GalleryPhoto | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // New photo form state
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleBn, setNewTitleBn] = useState('');
  const [newCategory, setNewCategory] = useState<'Campus' | 'Academic' | 'Events'>('Campus');
  const [uploadedImageDataUrl, setUploadedImageDataUrl] = useState<string | null>(null);

  // Inline replacement hidden file input
  const inlineFileInputRef = useRef<HTMLInputElement>(null);
  const [targetReplacePhotoId, setTargetReplacePhotoId] = useState<string | null>(null);

  const filtered = selectedCat === 'All' 
    ? galleryPhotos 
    : galleryPhotos.filter(p => p.category === selectedCat);

  const handleOpenUpload = () => {
    setNewTitleEn('');
    setNewTitleBn('');
    setNewCategory('Campus');
    setUploadedImageDataUrl(null);
    setIsUploadModalOpen(true);
  };

  const handleSaveNewPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedImageDataUrl) {
      alert('Please select or upload an image file from your device.');
      return;
    }

    addGalleryPhoto({
      titleEn: newTitleEn.trim() || 'Halishahar Public School Campus Activity',
      titleBn: newTitleBn.trim() || 'হালিশহর পাবলিক স্কুল ক্যাম্পাস স্মৃতি',
      category: newCategory,
      image: uploadedImageDataUrl,
      uploadedBy: 'School Editor / Admin',
    });

    setIsUploadModalOpen(false);
    setFeedback('New photo successfully uploaded from your device and added to the gallery!');
    setTimeout(() => setFeedback(null), 3500);
  };

  // Inline change photo directly from device
  const handleTriggerInlineUpload = (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    setTargetReplacePhotoId(photoId);
    inlineFileInputRef.current?.click();
  };

  const handleInlineFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && targetReplacePhotoId) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        updateGalleryPhoto(targetReplacePhotoId, { image: dataUrl });
        setFeedback('Photo successfully updated with the new image from your device!');
        setTimeout(() => setFeedback(null), 3500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = (e: React.MouseEvent, photoId: string, title: string) => {
    e.stopPropagation();
    if (confirm(`Do you want to remove "${title}" from the gallery?`)) {
      deleteGalleryPhoto(photoId);
      setFeedback('Photo removed from the gallery.');
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Hidden file input for inline replacement */}
      <input
        ref={inlineFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInlineFilePicked}
        className="hidden"
      />

      <Breadcrumb
        items={[
          { label: language === 'bn' ? 'মূল পাতা' : 'Home', href: '/' },
          { label: language === 'bn' ? 'ফটো গ্যালারি' : 'Photo Gallery' },
        ]}
      />

      {/* Feedback Toast */}
      {feedback && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-lg flex items-center justify-between shadow-sm text-xs font-semibold animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-emerald-700 hover:text-emerald-900">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#082E50] text-white p-6 sm:p-8 rounded-lg shadow-academic flex flex-col md:flex-row items-center justify-between gap-4">
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

        <div className="flex flex-wrap items-center gap-3">
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

          {/* Upload Button from Device */}
          <button
            onClick={handleOpenUpload}
            className="inline-flex items-center gap-1.5 bg-school-gold hover:bg-yellow-400 text-school-navy font-bold px-3.5 py-2 rounded text-xs shadow-academic transition-all hover:scale-105 border border-amber-300"
          >
            <Upload className="w-4 h-4" />
            <span>{language === 'bn' ? '+ ডিভাইস থেকে ছবি আপলোড' : '+ Upload from Device'}</span>
          </button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            onClick={() => setLightboxImg(item)}
            className="group cursor-pointer bg-white rounded-lg border border-school-border overflow-hidden shadow-academic hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div className="relative h-56 w-full overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.titleEn}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover overlay with zoom & quick actions */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <div 
                  className="w-10 h-10 rounded-full bg-white/90 text-school-navy flex items-center justify-center shadow hover:bg-white"
                  title="View Enlarged Photo"
                >
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>

              {/* Category Badge on Image */}
              <div className="absolute top-2.5 left-2.5">
                <span className="text-[10px] font-bold text-school-navy uppercase bg-school-lightGold px-2.5 py-0.5 rounded shadow border border-amber-400/40">
                  {item.category}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-school-navy line-clamp-2 font-bengali leading-snug">
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </h3>
                {item.uploadedBy && (
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Uploaded by {item.uploadedBy}
                  </span>
                )}
              </div>

              {/* Direct Editor Device Upload Button on each Card */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => handleTriggerInlineUpload(e, item.id)}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-school-academic hover:text-school-navy bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded border border-slate-200 transition-colors"
                  title="Change this photo using an image from your device"
                >
                  <Camera className="w-3.5 h-3.5 text-school-gold" />
                  <span>{language === 'bn' ? 'ছবি পরিবর্তন (ডিভাইস)' : 'Change Photo (Device)'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleDeletePhoto(e, item.id, item.titleEn)}
                  className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                  title="Remove Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full bg-white p-8 rounded-lg border border-dashed text-center text-slate-500 text-xs">
            No photos found in category: {selectedCat}. Click "+ Upload from Device" to add new images!
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl animate-scaleIn">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute right-3 top-3 z-10 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-[65vh] w-full bg-black flex items-center justify-center">
              <img
                src={lightboxImg.image}
                alt={lightboxImg.titleEn}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-school-navy font-bengali">
                  {language === 'bn' ? lightboxImg.titleBn : lightboxImg.titleEn}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Category: {lightboxImg.category} • Halishahar Public School and College
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  setLightboxImg(null);
                  handleTriggerInlineUpload(e, lightboxImg.id);
                }}
                className="inline-flex items-center gap-1.5 bg-school-navy hover:bg-school-academic text-white px-3 py-1.5 rounded text-xs font-bold shadow"
              >
                <Camera className="w-3.5 h-3.5 text-school-gold" />
                <span>Replace with New Image from Device</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Upload New Photo from Device */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg border border-school-border animate-scaleIn">
            <div className="flex items-center justify-between p-4 border-b bg-school-cream">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-school-gold" />
                <h3 className="text-sm font-bold text-school-navy">
                  Upload Photo from Device (ডিভাইস থেকে ছবি আপলোড)
                </h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveNewPhoto} className="p-5 space-y-4 text-xs">
              {/* Device File Picker Component */}
              <DeviceFileUpload
                accept="image/*"
                maxSizeMB={10}
                label="Select Photo from Your Computer or Phone"
                labelBn="আপনার কম্পিউটার বা মোবাইল থেকে ছবি সিলেক্ট করুন"
                onFileSelect={(data) => {
                  setUploadedImageDataUrl(data.dataUrl);
                }}
              />

              <div>
                <label className="block font-semibold text-school-navy mb-1">
                  Photo Title (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Laboratory Practical Session"
                  value={newTitleEn}
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-school-navy text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-school-navy mb-1">
                  Photo Title (বাংলা শিরোনাম) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. বিজ্ঞান ল্যাবরেটরি ব্যবহারিক ক্লাস"
                  value={newTitleBn}
                  onChange={(e) => setNewTitleBn(e.target.value)}
                  className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-school-navy text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-school-navy mb-1">
                  Gallery Category *
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-school-navy text-xs bg-white"
                >
                  <option value="Campus">Campus Infrastructure (ক্যাম্পাস অবকাঠামো)</option>
                  <option value="Academic">Academic & Classroom (একাডেমিক ও শ্রেণিকক্ষ)</option>
                  <option value="Events">Events & Sports (অনুষ্ঠান ও খেলাধুলা)</option>
                </select>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-3.5 py-1.5 border rounded text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-school-navy hover:bg-school-academic text-white rounded font-bold shadow flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-school-gold" />
                  <span>Save to Gallery</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
