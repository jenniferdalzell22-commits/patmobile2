import React, { useState } from 'react';
import { X, Save, Plus, Trash2, BookOpen } from 'lucide-react';
import { MemorialProfile } from '../types';

interface EditBioModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: MemorialProfile;
  onSave: (updatedProfile: MemorialProfile) => void;
}

export const EditBioModal: React.FC<EditBioModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSave
}) => {
  const [formData, setFormData] = useState<MemorialProfile>(profile);
  const [activeTab, setActiveTab] = useState<'profile' | 'chapters' | 'quickpaste'>('profile');
  const [quickPasteText, setQuickPasteText] = useState('');

  if (!isOpen) return null;

  const handleChapterChange = (index: number, field: 'title' | 'content', value: string) => {
    const updated = [...formData.biographyChapters];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, biographyChapters: updated });
  };

  const handleAddChapter = () => {
    setFormData({
      ...formData,
      biographyChapters: [
        ...formData.biographyChapters,
        {
          id: `chapter-${Date.now()}`,
          title: `Chapter ${formData.biographyChapters.length + 1}: Memories`,
          content: ''
        }
      ]
    });
  };

  const handleRemoveChapter = (index: number) => {
    const updated = formData.biographyChapters.filter((_, i) => i !== index);
    setFormData({ ...formData, biographyChapters: updated });
  };

  const handleApplyQuickPaste = () => {
    if (!quickPasteText.trim()) return;
    // Split into paragraphs or chapters
    const paragraphs = quickPasteText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const newChapters = paragraphs.map((para, i) => ({
      id: `custom-ch-${Date.now()}-${i}`,
      title: i === 0 ? "1. Her Story & Memories" : `Section ${i + 1}`,
      content: para.trim()
    }));

    setFormData({
      ...formData,
      biographyChapters: newChapters
    });
    setActiveTab('chapters');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[#faf7f2] rounded-2xl shadow-2xl border border-stone-300 text-stone-800 my-8 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-200 bg-stone-100/60">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-800" />
            <h2 className="font-serif-display text-xl font-bold text-stone-900">
              Personalize Biography & Details
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-stone-200 px-5 pt-3 gap-2 bg-stone-50">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`pb-2.5 px-3 text-xs font-semibold transition-colors border-b-2 ${
              activeTab === 'profile'
                ? 'border-amber-700 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Basic Info & Epitaph
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('chapters')}
            className={`pb-2.5 px-3 text-xs font-semibold transition-colors border-b-2 ${
              activeTab === 'chapters'
                ? 'border-amber-700 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Biography Chapters ({formData.biographyChapters.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('quickpaste')}
            className={`pb-2.5 px-3 text-xs font-semibold transition-colors border-b-2 ${
              activeTab === 'quickpaste'
                ? 'border-amber-700 text-amber-900'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Paste Pre-Written Bio
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Mother's Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Nickname or Honorific
                  </label>
                  <input
                    type="text"
                    value={formData.maidenOrNickname || ''}
                    onChange={(e) => setFormData({ ...formData, maidenOrNickname: e.target.value })}
                    placeholder="e.g. Beloved Mother, Nana, and Pie Master"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Sunrise Date (Birth)
                  </label>
                  <input
                    type="text"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    placeholder="e.g. April 14, 1952"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Sunset Date (Passing)
                  </label>
                  <input
                    type="text"
                    value={formData.passingDate}
                    onChange={(e) => setFormData({ ...formData, passingDate: e.target.value })}
                    placeholder="e.g. October 18, 2024"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Epitaph / Remembrance Statement
                </label>
                <textarea
                  rows={2}
                  value={formData.epitaph}
                  onChange={(e) => setFormData({ ...formData, epitaph: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Her Favorite Saying or Kitchen Motto
                </label>
                <input
                  type="text"
                  value={formData.heroQuote}
                  onChange={(e) => setFormData({ ...formData, heroQuote: e.target.value })}
                  placeholder="e.g. If you leave this table hungry, that's your own fault."
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'chapters' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-stone-500">
                  Organize her life story into narrative chapters or sections.
                </p>
                <button
                  type="button"
                  onClick={handleAddChapter}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-800 bg-amber-100/70 hover:bg-amber-200 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Chapter
                </button>
              </div>

              {formData.biographyChapters.map((chapter, idx) => (
                <div key={chapter.id} className="p-4 bg-white rounded-xl border border-stone-200/90 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="text"
                      value={chapter.title}
                      onChange={(e) => handleChapterChange(idx, 'title', e.target.value)}
                      placeholder="Chapter Title"
                      className="flex-1 font-serif-display font-semibold text-stone-900 border-b border-stone-200 focus:border-amber-600 focus:outline-none pb-1"
                    />
                    {formData.biographyChapters.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveChapter(idx)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove chapter"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={chapter.content}
                    onChange={(e) => handleChapterChange(idx, 'content', e.target.value)}
                    placeholder="Write or paste the biography text for this chapter..."
                    className="w-full text-sm text-stone-700 bg-stone-50/50 p-2.5 rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500 leading-relaxed"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'quickpaste' && (
            <div className="space-y-4">
              <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200/50 text-xs text-amber-900">
                Already have her biography written in a document or email? Paste it below. Blank lines between paragraphs will automatically be split into clean chapters.
              </div>
              <textarea
                rows={10}
                value={quickPasteText}
                onChange={(e) => setQuickPasteText(e.target.value)}
                placeholder="Paste her pre-written biography here..."
                className="w-full p-3 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-sans leading-relaxed"
              />
              <button
                type="button"
                onClick={handleApplyQuickPaste}
                disabled={!quickPasteText.trim()}
                className="px-4 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 disabled:opacity-50 rounded-lg transition-colors"
              >
                Convert into Biography Chapters
              </button>
            </div>
          )}

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
