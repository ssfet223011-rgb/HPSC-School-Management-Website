'use client';

import React, { useState } from 'react';
import { useSchoolStore } from '@/lib/store/schoolStore';
import { 
  FileText, Upload, Plus, Search, Filter, Edit, Trash2, 
  Download, BookOpen, Layers, CheckCircle2, AlertCircle, X,
  FileCode, FileSpreadsheet, Paperclip
} from 'lucide-react';
import { CourseMaterial } from '@/types';
import { DeviceFileUpload } from '@/components/ui/DeviceFileUpload';

export const CourseEditorView: React.FC = () => {
  const { 
    courseMaterials, 
    addCourseMaterial, 
    updateCourseMaterial, 
    deleteCourseMaterial, 
    currentUser,
    classes,
    subjects 
  } = useSchoolStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterSubject, setFilterSubject] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    topicName: '',
    subjectCode: 'MATH-103',
    subjectName: 'General Mathematics',
    className: 'Class 8',
    description: '',
    fileName: '',
    fileSize: '1.8 MB',
    fileType: 'pdf',
    downloadUrl: '',
  });

  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      topicName: '',
      subjectCode: subjects[0]?.code || 'MATH-103',
      subjectName: subjects[0]?.nameEn || 'General Mathematics',
      className: classes[2]?.nameEn || 'Class 8',
      description: '',
      fileName: 'Lecture_Handout_HPSC.pdf',
      fileSize: '2.5 MB',
      fileType: 'pdf',
      downloadUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: CourseMaterial) => {
    setEditingId(item.id);
    setFormData({
      title: item.title,
      topicName: item.topicName,
      subjectCode: item.subjectCode,
      subjectName: item.subjectName,
      className: item.className,
      description: item.description,
      fileName: item.fileName,
      fileSize: item.fileSize,
      fileType: item.fileType,
      downloadUrl: item.downloadUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.topicName.trim()) {
      alert('Please fill in both the Topic Title and Topic Chapter/Name.');
      return;
    }

    if (editingId) {
      updateCourseMaterial(editingId, {
        title: formData.title,
        topicName: formData.topicName,
        subjectCode: formData.subjectCode,
        subjectName: formData.subjectName,
        className: formData.className,
        description: formData.description,
        fileName: formData.fileName || 'Course_Lecture_Notes.pdf',
        fileSize: formData.fileSize,
        fileType: formData.fileType,
        downloadUrl: formData.downloadUrl || '#',
      });
      setFeedbackMsg('Topic and lecture material successfully updated!');
    } else {
      addCourseMaterial({
        title: formData.title,
        topicName: formData.topicName,
        subjectCode: formData.subjectCode,
        subjectName: formData.subjectName,
        className: formData.className,
        uploadedBy: currentUser.nameEn || 'Md. Rafiqul Islam (Senior Teacher)',
        teacherId: currentUser.employeeId || 'EMP-001',
        description: formData.description,
        fileName: formData.fileName || 'Topic_Lecture_Material.pdf',
        fileSize: formData.fileSize || '2.1 MB',
        fileType: formData.fileType || 'pdf',
        downloadUrl: formData.downloadUrl || '#',
      });
      setFeedbackMsg('New course topic and study file successfully published!');
    }

    setIsModalOpen(false);
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the course material "${title}"?`)) {
      deleteCourseMaterial(id);
      setFeedbackMsg('Material deleted successfully.');
      setTimeout(() => setFeedbackMsg(null), 3000);
    }
  };

  const filteredMaterials = courseMaterials.filter(item => {
    const matchesClass = filterClass === 'all' || item.className === filterClass;
    const matchesSubject = filterSubject === 'all' || item.subjectCode === filterSubject;
    const q = searchTerm.toLowerCase();
    const matchesSearch = !q ||
      item.title.toLowerCase().includes(q) ||
      item.topicName.toLowerCase().includes(q) ||
      item.subjectName.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);

    return matchesClass && matchesSubject && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Feedback Banner */}
      {feedbackMsg && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-lg flex items-center gap-2 shadow-sm text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-school-navy to-school-academic text-white p-5 rounded-lg shadow-academic flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-school-lightGold px-2.5 py-0.5 rounded text-[11px] font-bold border border-amber-400/30">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Teacher & Editor Course Portal (কোর্স টপিক ও লেকচার মেটেরিয়াল আপলোড সেন্টার)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold font-serif-heading mt-1.5">
            Course Topics & Lecture Handouts Management
          </h2>
          <p className="text-xs text-slate-200 mt-0.5">
            Logged in as Teacher/Editor: Upload lecture slides, PDF worksheets, revise course chapters, and make materials immediately available to enrolled students.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 bg-school-gold hover:bg-yellow-400 text-school-navy text-xs font-extrabold px-4 py-2.5 rounded shadow-academic transition-all shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>+ Upload New Topic / Study File</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-school-border shadow-sm">
          <span className="text-[11px] text-slate-500 uppercase font-semibold">Total Handouts</span>
          <div className="text-2xl font-bold text-school-navy mt-1">{courseMaterials.length}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Published & Active</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-school-border shadow-sm">
          <span className="text-[11px] text-slate-500 uppercase font-semibold">Classes Covered</span>
          <div className="text-2xl font-bold text-school-academic mt-1">Class 6 - 10</div>
          <span className="text-[10px] text-slate-500 font-mono">Secondary Level</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-school-border shadow-sm">
          <span className="text-[11px] text-slate-500 uppercase font-semibold">Primary Subjects</span>
          <div className="text-2xl font-bold text-amber-700 mt-1">Math, Sci, Eng, ICT</div>
          <span className="text-[10px] text-slate-500">Board Curriculum</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-school-border shadow-sm">
          <span className="text-[11px] text-slate-500 uppercase font-semibold">Student Access</span>
          <div className="text-2xl font-bold text-emerald-700 mt-1">Instant</div>
          <span className="text-[10px] text-slate-500">Visible on Student Portal</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-school-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search topic, title, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded border border-school-border focus:ring-1 focus:ring-school-navy"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="text-xs bg-slate-50 border border-school-border rounded px-2.5 py-1.5 font-semibold text-school-navy"
            >
              <option value="all">All Classes</option>
              {classes.map(c => (
                <option key={c.id} value={c.nameEn}>{c.nameEn}</option>
              ))}
            </select>
          </div>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="text-xs bg-slate-50 border border-school-border rounded px-2.5 py-1.5 font-semibold text-school-navy"
          >
            <option value="all">All Subjects</option>
            {subjects.map(s => (
              <option key={s.id} value={s.code}>{s.nameEn} ({s.code})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((item) => (
          <div 
            key={item.id} 
            className="bg-white rounded-lg border border-school-border shadow-sm hover:border-school-gold transition-all p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-block bg-school-cream text-school-navy font-bold text-[10px] px-2 py-0.5 rounded border border-school-border font-mono">
                  {item.className} • {item.subjectCode}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {item.createdAt}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-school-navy leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-school-academic mt-0.5">
                  অধ্যায়/বিষয়: {item.topicName}
                </p>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              {/* File Attachment Pill */}
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded bg-rose-50 text-rose-700 font-bold flex items-center justify-center text-[10px] shrink-0 border border-rose-200">
                    PDF
                  </div>
                  <div className="min-w-0">
                    <span className="block font-semibold text-slate-800 truncate text-[11px]">
                      {item.fileName}
                    </span>
                    <span className="block text-[10px] text-slate-500 font-mono">
                      {item.fileSize} • Uploaded by {item.uploadedBy}
                    </span>
                  </div>
                </div>

                <a
                  href={item.downloadUrl || '#'}
                  download={item.fileName}
                  onClick={(e) => {
                    if (!item.downloadUrl || item.downloadUrl === '#') {
                      e.preventDefault();
                      alert(`Downloading sample file: ${item.fileName} (${item.fileSize})`);
                    }
                  }}
                  className="p-1.5 hover:bg-slate-200 rounded text-school-navy transition-colors shrink-0"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Action Buttons for Teacher / Editor */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                Teacher ID: <strong className="text-school-navy">{item.teacherId}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(item)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-school-academic hover:text-school-navy bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded border border-slate-200 transition-colors"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>Edit Topic</span>
                </button>

                <button
                  onClick={() => handleDelete(item.id, item.title)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded border border-rose-200 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredMaterials.length === 0 && (
          <div className="col-span-full bg-white p-8 rounded-lg border border-dashed border-school-border text-center text-slate-500 text-xs">
            No course materials or lecture handouts match the selected search criteria.
          </div>
        )}
      </div>

      {/* Upload / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl border border-school-border animate-scaleIn">
            <div className="flex items-center justify-between p-4 border-b bg-school-cream">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-school-gold" />
                <h3 className="text-sm font-bold text-school-navy">
                  {editingId ? 'Edit Course Topic & Material' : 'Upload New Course Topic & Study Handout'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-school-navy mb-1">
                  Topic Title (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Algebraic Formulas & Expansion - Chapter 4 Lecture Notes"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-school-navy text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-school-navy mb-1">
                  Topic Chapter / Subtitle (বাংলা অধ্যায় বা শিরোনাম) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. বীজগাণিতিক সূত্রাবলি ও প্রয়োগ"
                  value={formData.topicName}
                  onChange={(e) => setFormData({ ...formData, topicName: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-school-navy text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-school-navy mb-1">Class *</label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-school-navy text-xs bg-white"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.nameEn}>{c.nameEn}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-school-navy mb-1">Subject *</label>
                  <select
                    value={formData.subjectCode}
                    onChange={(e) => {
                      const selectedSub = subjects.find(s => s.code === e.target.value);
                      setFormData({ 
                        ...formData, 
                        subjectCode: e.target.value,
                        subjectName: selectedSub ? selectedSub.nameEn : formData.subjectName
                      });
                    }}
                    className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-school-navy text-xs bg-white"
                  >
                    {subjects.map(s => (
                      <option key={s.id} value={s.code}>{s.nameEn} ({s.code})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-school-navy mb-1">
                  Topic Description & Instructions for Students
                </label>
                <textarea
                  rows={3}
                  placeholder="Outline topics covered, key formulas to memorize, and homework questions..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded focus:ring-1 focus:ring-school-navy text-xs"
                />
              </div>

              {/* Real Device File Upload for Course Material */}
              <div className="space-y-2">
                <DeviceFileUpload
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.zip,image/*"
                  maxSizeMB={25}
                  label="Upload Topic Handout / PDF from Device"
                  labelBn="কম্পিউটার বা মোবাইল থেকে হ্যান্ডআউট ফাইল আপলোড করুন"
                  onFileSelect={(data) => {
                    setFormData(prev => ({
                      ...prev,
                      fileName: data.name,
                      fileSize: data.size,
                      fileType: data.type,
                      downloadUrl: data.dataUrl,
                    }));
                  }}
                />

                {formData.fileName && (
                  <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200 flex items-center justify-between">
                    <span className="font-semibold text-emerald-900 truncate">
                      Selected: {formData.fileName} ({formData.fileSize})
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 font-mono">
                      Ready
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 border rounded text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-school-navy hover:bg-school-academic text-white rounded font-bold shadow"
                >
                  {editingId ? 'Save Changes' : 'Publish Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
