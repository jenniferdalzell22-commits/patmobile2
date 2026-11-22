import React, { useState } from 'react';
import { 
  Heart, 
  Calendar, 
  Sparkles, 
  Edit3, 
  Plus, 
  Image as ImageIcon, 
  Quote, 
  UtensilsCrossed, 
  BookOpen, 
  Printer,
  ZoomIn
} from 'lucide-react';
import { MemorialProfile, ScrapbookItem } from '../types';

interface ScrapbookViewProps {
  profile: MemorialProfile;
  items: ScrapbookItem[];
  onOpenEditBio: () => void;
  onOpenLightbox: (item: ScrapbookItem) => void;
  onAddItem: (newItem: ScrapbookItem) => void;
  onNavigateToQuiz: () => void;
  onNavigateToGuestbook: () => void;
}

export const ScrapbookView: React.FC<ScrapbookViewProps> = ({
  profile,
  items,
  onOpenEditBio,
  onOpenLightbox,
  onAddItem,
  onNavigateToQuiz,
  onNavigateToGuestbook
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCaption, setNewCaption] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setImagePreview(result);
        setNewImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateScrapbookItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) return;

    const randomRotations = [-2.5, -1.5, -0.8, 1.2, 2, 2.8];
    const pickedRot = randomRotations[Math.floor(Math.random() * randomRotations.length)];

    const newItem: ScrapbookItem = {
      id: `item-${Date.now()}`,
      type: newImageUrl ? 'photo' : 'quote',
      imageUrl: newImageUrl || undefined,
      caption: newCaption.trim(),
      year: newYear.trim() || undefined,
      rotation: pickedRot,
      tapeStyle: Math.random() > 0.5 ? 'washi-cream' : 'corners',
      note: newNote.trim() || undefined
    };

    onAddItem(newItem);
    setShowAddModal(false);
    setNewCaption('');
    setNewYear('');
    setNewNote('');
    setNewImageUrl('');
    setImagePreview(null);
  };

  const handlePrintKeepsake = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
      {/* Editorial Hero Header */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold">
          <span>In Everlasting Remembrance</span>
          <span aria-hidden="true">·</span>
          <span>Tarrytown, NY · Mother Cabrini Nurse</span>
        </div>

        <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight text-balance">
          {profile.name}
        </h1>

        {profile.maidenOrNickname && (
          <p className="font-serif-display italic text-lg sm:text-xl text-stone-600">
            "{profile.maidenOrNickname}"
          </p>
        )}

        {/* Unboxed Metadata with Typographic Separator */}
        <div className="flex items-center justify-center gap-3 text-sm font-medium text-stone-600">
          <span>{profile.birthDate}</span>
          <span aria-hidden="true" className="text-stone-400">―</span>
          <span>{profile.passingDate}</span>
        </div>

        <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl mx-auto font-light">
          {profile.epitaph}
        </p>

        {/* Floating Scrapbook Motto Note */}
        <div className="inline-block relative mt-3 p-4 bg-[#fffdfa] rounded-lg shadow-sm border border-amber-200/60 rotate-[-1deg] max-w-lg mx-auto">
          <div className="washi-tape top-[-10px] left-1/2 -translate-x-1/2 w-24 bg-amber-200/70" />
          <p className="font-handwriting text-stone-800 text-xl sm:text-2xl">
            “{profile.heroQuote}”
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenEditBio}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 rounded-md border border-stone-200 shadow-2xs transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-800" />
            Personalize Biography
          </button>
          <button
            onClick={handlePrintKeepsake}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 rounded-md border border-stone-200 shadow-2xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-amber-800" />
            Print Keepsake
          </button>
        </div>
      </section>

      {/* Scrapbook Album Gallery (Polaroid style with washi tape) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-3">
          <div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              Pat's Scrapbook & Treasures
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Photographs, everyday phrases, and tokens pinned to her memory album. Click any card to enlarge.
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium text-amber-900 bg-amber-100/80 hover:bg-amber-200 rounded-md transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Pin Photo to Scrapbook
          </button>
        </div>

        {/* Dynamic Scrapbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4 items-start">
          {items.map((item) => (
            <div
              key={item.id}
              style={{ transform: `rotate(${item.rotation}deg)` }}
              onClick={() => onOpenLightbox(item)}
              className="group relative cursor-pointer polaroid-frame rounded-sm"
            >
              {/* Washi Tape styling */}
              {item.tapeStyle === 'washi-cream' && (
                <div className="washi-tape top-[-10px] left-1/2 -translate-x-1/2 w-28 bg-[#f5eccb]/80" />
              )}
              {item.tapeStyle === 'washi-pink' && (
                <div className="washi-tape top-[-10px] left-1/2 -translate-x-1/2 w-28 bg-[#ebd3c5]/80" />
              )}
              {item.tapeStyle === 'corners' && (
                <>
                  <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-amber-800/40 z-10" />
                  <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-amber-800/40 z-10" />
                </>
              )}
              {item.tapeStyle === 'top' && (
                <div className="washi-tape top-[-10px] left-1/2 -translate-x-1/2 w-20 bg-stone-300/60" />
              )}

              {/* Photo Content */}
              {item.imageUrl ? (
                <div className="relative aspect-4/3 bg-stone-100 overflow-hidden rounded-xs border border-stone-200/80">
                  <img
                    src={item.imageUrl}
                    alt={item.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                </div>
              ) : (
                <div className="aspect-4/3 bg-amber-50/70 p-4 rounded-xs border border-amber-200/50 flex flex-col justify-center items-center text-center">
                  {item.type === 'quote' ? (
                    <Quote className="w-6 h-6 text-amber-700/60 mb-2" />
                  ) : (
                    <Sparkles className="w-6 h-6 text-amber-700/60 mb-2" />
                  )}
                  <p className="font-serif-display text-sm font-semibold text-stone-800 line-clamp-3">
                    {item.caption}
                  </p>
                </div>
              )}

              {/* Handwritten Caption at bottom of Polaroid */}
              <div className="pt-3 px-1">
                <p className="font-handwriting text-stone-900 text-lg leading-tight line-clamp-2">
                  {item.caption}
                </p>
                {item.year && (
                  <span className="text-[11px] text-stone-500 font-sans tracking-wide block mt-1">
                    {item.year}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Kitchen Game Teaser Banner */}
      <section className="bg-linear-to-r from-amber-100/70 via-[#f7f2e7] to-amber-100/70 rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-2xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900 uppercase tracking-wider">
              <UtensilsCrossed className="w-4 h-4 text-amber-700" />
              <span>Interactive Keepsake Game</span>
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              "What Was She Cooking?"
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed">
              Pat cooked by heart and instinct—jotting down ingredient measurements with notes like "cook at 350 degrees" or "put in pot," and playfully laughing "You need to figure it out" when asked for instructions! Step into her kitchen archives and see if you can guess the dish.
            </p>
          </div>
          <button
            onClick={onNavigateToQuiz}
            className="px-5 py-3 text-sm font-semibold text-white bg-amber-900 hover:bg-amber-950 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Play Recipe Guessing Game</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* Biography Chapters Section */}
      <section className="paper-texture p-6 sm:p-10 rounded-2xl border border-stone-300 shadow-sm space-y-8">
        <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              Her Life & Story
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              The chapters of a life lived with generosity, warmth, and laughter.
            </p>
          </div>
          <button
            onClick={onOpenEditBio}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-900 bg-amber-100/60 hover:bg-amber-100 rounded-md transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Story
          </button>
        </div>

        {/* Narrative Chapters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {profile.biographyChapters.map((chapter) => (
            <article 
              key={chapter.id} 
              className="p-6 bg-white/80 rounded-xl border border-stone-200/90 shadow-2xs space-y-3 relative group"
            >
              <h3 className="font-serif-display text-lg sm:text-xl font-bold text-stone-900 tracking-tight flex items-baseline gap-2">
                <span>{chapter.title}</span>
              </h3>
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans first-letter:float-left first-letter:text-3xl first-letter:font-serif-display first-letter:font-bold first-letter:mr-2 first-letter:text-amber-900">
                {chapter.content}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom guestbook invitation */}
        <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-stone-600">
            Have a cherished memory or story of Mom you'd like to preserve?
          </p>
          <button
            onClick={onNavigateToGuestbook}
            className="px-4 py-2 text-xs font-semibold text-amber-900 bg-amber-100/80 hover:bg-amber-200 rounded-lg transition-colors cursor-pointer"
          >
            Sign the Guestbook & Share a Memory →
          </button>
        </div>
      </section>

      {/* Add Item / Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-2xl p-6 shadow-2xl border border-stone-200 text-stone-800">
            <h3 className="font-serif-display text-xl font-bold text-stone-900 mb-1">
              Pin a Memory to the Scrapbook
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Add a family photograph, a handwritten note, or a favorite memory.
            </p>

            <form onSubmit={handleCreateScrapbookItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Upload Photo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-xl p-4 bg-white hover:bg-stone-50 transition-colors">
                    <ImageIcon className="w-6 h-6 text-stone-400 mb-1" />
                    <span className="text-xs text-stone-600 font-medium">Click to select photo</span>
                    <span className="text-[10px] text-stone-400">JPG, PNG, WebP</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-stone-300 relative shrink-0">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Handwritten Caption
                </label>
                <input
                  type="text"
                  required
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="e.g. Pat baking with Jennifer and Janice"
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Year / Season (Optional)
                </label>
                <input
                  type="text"
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  placeholder="e.g. Thanksgiving 1996"
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Back-of-Photo Note or Memory (Optional)
                </label>
                <textarea
                  rows={3}
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="What was happening in this moment? What did Pat say?"
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Pin to Scrapbook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
