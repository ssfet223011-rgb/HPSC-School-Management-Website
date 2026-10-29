'use client';

import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, FileText, X, CheckCircle, RefreshCw } from 'lucide-react';

interface DeviceFileUploadProps {
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  labelBn?: string;
  currentPreviewUrl?: string;
  onFileSelect: (data: {
    file: File;
    name: string;
    size: string;
    type: string;
    dataUrl: string;
  }) => void;
  compact?: boolean;
  buttonText?: string;
  className?: string;
}

export const DeviceFileUpload: React.FC<DeviceFileUploadProps> = ({
  accept = 'image/*,application/pdf',
  maxSizeMB = 15,
  label = 'Upload File from Device',
  labelBn = 'ডিভাইস থেকে ফাইল আপলোড করুন',
  currentPreviewUrl,
  onFileSelect,
  compact = false,
  buttonText = 'Choose from Device',
  className = '',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [selectedFileSize, setSelectedFileSize] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPreviewUrl || null);
  const [isUploading, setIsUploading] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(2) + ' MB';
  };

  const processFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds maximum limit of ${maxSizeMB}MB.`);
      return;
    }

    setIsUploading(true);
    const sizeStr = formatFileSize(file.size);
    setSelectedFileName(file.name);
    setSelectedFileSize(sizeStr);

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setPreviewUrl(dataUrl);
      setIsUploading(false);

      onFileSelect({
        file,
        name: file.name,
        size: sizeStr,
        type: file.type || file.name.split('.').pop() || 'unknown',
        dataUrl,
      });
    };

    reader.onerror = () => {
      setIsUploading(false);
      alert('Failed to read file from your device. Please try again.');
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const isImageFile = (accept.includes('image') || (selectedFileName && /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(selectedFileName))) && previewUrl;

  if (compact) {
    return (
      <div className={`inline-block ${className}`}>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center gap-1.5 bg-[#082E50] hover:bg-[#124C7C] text-white text-xs font-bold px-3 py-1.5 rounded shadow transition-all hover:scale-105 border border-school-gold/40"
        >
          <Upload className="w-3.5 h-3.5 text-school-gold" />
          <span>{buttonText}</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-2 text-xs ${className}`}>
      <div className="flex items-center justify-between">
        <label className="font-semibold text-school-navy flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5 text-school-gold" />
          <span>{label}</span>
          <span className="text-[10px] text-slate-500 font-normal">({labelBn})</span>
        </label>
        <span className="text-[10px] text-slate-400">Max {maxSizeMB}MB</span>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-school-gold bg-amber-50/50'
            : 'border-slate-300 hover:border-school-academic bg-slate-50/50 hover:bg-white'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />

        {isImageFile ? (
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-32 h-24 rounded border border-school-border overflow-hidden bg-slate-100 shadow-sm">
              <img
                src={previewUrl!}
                alt="Selected Device Image"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-school-navy block truncate max-w-xs">
                {selectedFileName || 'Current Image'}
              </span>
              {selectedFileSize && (
                <span className="text-[10px] text-slate-500 font-mono">
                  {selectedFileSize} • Ready to save
                </span>
              )}
              <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-school-academic hover:underline">
                <RefreshCw className="w-3 h-3" />
                <span>Click to change image from device</span>
              </div>
            </div>
          </div>
        ) : selectedFileName ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-9 h-9 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold border border-emerald-200">
              <FileText className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-school-navy block truncate max-w-xs">
                {selectedFileName}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {selectedFileSize} • Loaded from device
              </span>
            </div>
            <span className="text-[11px] text-school-academic hover:underline ml-2">Change</span>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 space-y-1.5">
            <div className="w-10 h-10 rounded-full bg-school-cream text-school-navy flex items-center justify-center border border-school-border">
              <Upload className="w-5 h-5 text-school-gold" />
            </div>
            <p className="text-xs font-bold text-school-navy">
              Click to browse or drag file from your device
            </p>
            <p className="text-[11px] text-slate-500">
              কম্পিউটার বা মোবাইল থেকে ছবি অথবা পিডিএফ ফাইল সিলেক্ট করুন
            </p>
            <span className="inline-block bg-school-gold/20 text-school-navy text-[10px] font-bold px-2 py-0.5 rounded border border-school-gold/40">
              Device File Picker Active
            </span>
          </div>
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-white/80 rounded-lg flex items-center justify-center gap-2 text-xs font-bold text-school-navy">
            <RefreshCw className="w-4 h-4 animate-spin text-school-gold" />
            <span>Reading file from device...</span>
          </div>
        )}
      </div>
    </div>
  );
};
