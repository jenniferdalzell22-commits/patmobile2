import React, { useState } from 'react';
import { 
  Heart, 
  Flame, 
  Search, 
  Plus, 
  Sparkles, 
  Printer, 
  MessageSquareHeart, 
  Coffee, 
  Utensils, 
  Flower2, 
  Calendar,
  Image as ImageIcon
} from 'lucide-react';
import { GuestbookEntry } from '../types';
import { playCandleChime } from '../utils/sound';

interface GuestbookViewProps {
  entries: GuestbookEntry[];
  onAddEntry: (entry: GuestbookEntry) => void;
  momName: string;
}

export const GuestbookView: React.FC<GuestbookViewProps> = ({
  entries,
  onAddEntry,
  momName
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [relationshipFilter, setRelationshipFilter] = useState('All');
  const [showFormModal, setShowFormModal] = useState(false);

  // Form state
  const [author, setAuthor] = useState('');
  const [relationship, setRelationship] = useState('Daughter');
  const [message, setMessage] = useState('');
  const [symbol, setSymbol] = useState<GuestbookEntry['symbol']>('rose');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Local likes tracking
  const [likedEntries, setLikedEntries] = useState<Record<string, number>>({});
  const [litMemoryCandles, setLitMemoryCandles] = useState<Record<string, boolean>>({});

  const handleToggleHeart = (id: string, initialCount: number) => {
    const currentBonus = likedEntries[id] || 0;
    setLikedEntries({
      ...likedEntries,
      [id]: currentBonus === 0 ? 1 : 0
    });
  };

  const handleToggleMemoryCandle = (id: string) => {
    playCandleChime();
    setLitMemoryCandles({
      ...litMemoryCandles,
      [id]: !litMemoryCandles[id]
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setPhotoPreview(uploadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    const today = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newEntry: GuestbookEntry = {
      id: `entry-${Date.now()}`,
      author: author.trim(),
      relationship: relationship.trim(),
      date: today,
      message: message.trim(),
      symbol,
      photoUrl: photoPreview || undefined,
      candleLit: true,
      heartsCount: 1
    };

    onAddEntry(newEntry);
    setShowFormModal(false);
    setAuthor('');
    setMessage('');
    setPhotoPreview(null);
    playCandleChime();
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch = 
      entry.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.relationship.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRel = 
      relationshipFilter === 'All' ||
      (relationshipFilter === 'Family' && ['Daughter', 'Son', 'Grandchild', 'Grandson', 'Granddaughter', 'Sister', 'Brother', 'Cousin', 'Niece', 'Nephew'].some(r => entry.relationship.includes(r))) ||
      (relationshipFilter === 'Friends' && ['Friend', 'Neighbor', 'Classmate'].some(r => entry.relationship.includes(r)));

    return matchesSearch && matchesRel;
  });

  const getSymbolIcon = (sym: GuestbookEntry['symbol']) => {
    switch (sym) {
      case 'rose':
        return <Flower2 className="w-4 h-4 text-rose-600" />;
      case 'candle':
        return <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />;
      case 'teacup':
        return <Coffee className="w-4 h-4 text-amber-800" />;
      case 'spoon':
        return <Utensils className="w-4 h-4 text-amber-900" />;
      case 'daisy':
        return <Flower2 className="w-4 h-4 text-amber-500" />;
      case 'heart':
      default:
        return <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />;
    }
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      {/* Editorial Header */}
      <section className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold">
          <MessageSquareHeart className="w-4 h-4 text-amber-700" />
          <span>Shared Words of Remembrance</span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          Guestbook & Memory Wall
        </h1>

        <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl mx-auto">
          Every memory shared here is a thread that keeps {momName}'s presence close to us. 
          Share a story, a recipe she cooked for you, or a quiet note of love.
        </p>

        {/* Primary Action Button */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => setShowFormModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-amber-200" />
            Share Your Memory
          </button>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 rounded-xl border border-stone-200 shadow-2xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-800" />
            Print Keepsake Book
          </button>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-stone-200 shadow-2xs">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stories, names, recipes..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-stone-800"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg self-stretch sm:self-auto overflow-x-auto">
          {['All', 'Family', 'Friends'].map((tab) => (
            <button
              key={tab}
              onClick={() => setRelationshipFilter(tab)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                relationshipFilter === tab
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab === 'All' ? `All Tributes (${entries.length})` : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Guestbook Cards Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
        {filteredEntries.map((entry) => {
          const userBonus = likedEntries[entry.id] || 0;
          const totalHearts = entry.heartsCount + userBonus;
          const isCandleLit = litMemoryCandles[entry.id] ?? entry.candleLit;

          return (
            <article
              key={entry.id}
              className="paper-texture p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-sm transition-all space-y-4 relative group"
            >
              {/* Top metadata strip with zero-pill unboxed typography */}
              <div className="flex items-center justify-between gap-3 border-b border-stone-200/70 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-100/80 flex items-center justify-center shrink-0">
                    {getSymbolIcon(entry.symbol)}
                  </div>
                  <div>
                    <h3 className="font-serif-display text-base font-bold text-stone-900 leading-tight">
                      {entry.author}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-medium">
                      <span>{entry.relationship}</span>
                      <span aria-hidden="true">·</span>
                      <span>{entry.date}</span>
                    </div>
                  </div>
                </div>

                {/* Individual candle lighting toggle */}
                <button
                  onClick={() => handleToggleMemoryCandle(entry.id)}
                  className={`p-2 rounded-full transition-all cursor-pointer ${
                    isCandleLit 
                      ? 'bg-amber-100/90 text-amber-600' 
                      : 'text-stone-400 hover:text-amber-600 hover:bg-stone-100'
                  }`}
                  title={isCandleLit ? "Memorial candle burning" : "Light a candle for this memory"}
                >
                  <Flame className={`w-4 h-4 ${isCandleLit ? 'fill-amber-500 text-amber-500 animate-pulse' : ''}`} />
                </button>
              </div>

              {/* Message Content */}
              <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-sans whitespace-pre-line">
                "{entry.message}"
              </p>

              {/* Photo attached to guestbook memory */}
              {entry.photoUrl && (
                <div className="rounded-xl overflow-hidden border border-stone-200 shadow-2xs max-h-60 bg-stone-100">
                  <img
                    src={entry.photoUrl}
                    alt={`Photo shared by ${entry.author}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Bottom interactive row */}
              <div className="flex items-center justify-between pt-2 text-xs text-stone-500 border-t border-stone-200/50">
                <span className="font-serif-display italic text-[11px] text-stone-400">
                  Cherished Keepsake
                </span>
                <button
                  onClick={() => handleToggleHeart(entry.id, entry.heartsCount)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                    userBonus > 0
                      ? 'text-rose-600 bg-rose-50 font-semibold'
                      : 'text-stone-500 hover:text-rose-600 hover:bg-stone-100'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${userBonus > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span className="font-mono tabular-nums">{totalHearts}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
          <p className="font-serif-display text-lg text-stone-700">No matching tributes found.</p>
          <p className="text-xs text-stone-500">Try adjusting your search terms or view all memories.</p>
          <button
            onClick={() => { setSearchQuery(''); setRelationshipFilter('All'); }}
            className="text-xs text-amber-800 font-semibold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Share Memory Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-800 my-8">
            <h3 className="font-serif-display text-2xl font-bold text-stone-900 mb-1">
              Share a Loving Memory
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Add your words, stories, or recipe memories to {momName}'s guestbook.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Aunt Rachel"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Your Relationship to Mom
                  </label>
                  <input
                    type="text"
                    required
                    value={relationship}
                    onChange={(e) => setRelationship(e.target.value)}
                    placeholder="e.g. Daughter, Neighbor, Friend"
                    className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Choose a Keepsake Emblem
                </label>
                <div className="flex items-center gap-2">
                  {[
                    { id: 'rose', label: 'Rose', icon: Flower2 },
                    { id: 'candle', label: 'Candle', icon: Flame },
                    { id: 'teacup', label: 'Teacup', icon: Coffee },
                    { id: 'spoon', label: 'Cooking Spoon', icon: Utensils },
                    { id: 'heart', label: 'Heart', icon: Heart },
                  ].map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setSymbol(item.id as GuestbookEntry['symbol'])}
                      className={`flex-1 p-2 rounded-lg border text-xs flex flex-col items-center gap-1 transition-all cursor-pointer ${
                        symbol === item.id
                          ? 'border-amber-800 bg-amber-50 text-amber-900 font-semibold'
                          : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-[10px]">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Your Story or Tribute
                </label>
                <textarea
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell a story about her laugh, a warm moment in her kitchen, or words of comfort for the family..."
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Attach Photo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 text-xs font-medium text-stone-700 transition-colors">
                    <ImageIcon className="w-4 h-4 text-stone-500" />
                    <span>Upload image</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  {photoPreview && (
                    <span className="text-xs text-emerald-700 font-medium">Photo attached ✓</span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="flex-1 px-4 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Post Memory to Guestbook
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
