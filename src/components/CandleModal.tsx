import React, { useState } from 'react';
import { Flame, X, Sparkles, Heart } from 'lucide-react';
import { playCandleChime } from '../utils/sound';

interface CandleModalProps {
  isOpen: boolean;
  onClose: () => void;
  candleCount: number;
  onLightCandle: (note?: string, name?: string) => void;
  momName: string;
}

export const CandleModal: React.FC<CandleModalProps> = ({
  isOpen,
  onClose,
  candleCount,
  onLightCandle,
  momName
}) => {
  const [hasLit, setHasLit] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [reflectionNote, setReflectionNote] = useState('');

  if (!isOpen) return null;

  const handleLight = (e: React.FormEvent) => {
    e.preventDefault();
    playCandleChime();
    setHasLit(true);
    onLightCandle(reflectionNote.trim() || undefined, visitorName.trim() || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs transition-opacity">
      <div 
        className="relative w-full max-w-lg bg-[#faf7f2] rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200 text-stone-800"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50 transition-colors"
          aria-label="Close memorial candle window"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-3 relative">
            <Flame className={`w-8 h-8 ${hasLit ? 'text-amber-500 animate-pulse' : 'text-amber-600'}`} />
            {hasLit && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
              </span>
            )}
          </div>
          <h2 className="font-serif-display text-2xl font-bold text-stone-900">
            Light a Memorial Candle
          </h2>
          <p className="text-sm text-stone-600 mt-1 max-w-sm mx-auto">
            A quiet flame lit in loving honor and remembrance of {momName}.
          </p>
          <div className="mt-2 text-xs font-medium text-amber-800 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-200/60">
            {candleCount} {candleCount === 1 ? 'candle' : 'candles'} shining today
          </div>
        </div>

        {/* Animated Candle Visual */}
        <div className="flex flex-col items-center justify-center py-4 bg-linear-to-b from-stone-100/80 to-amber-50/50 rounded-xl mb-6 border border-stone-200/60">
          <div className="relative flex flex-col items-center">
            {/* Flame */}
            <div className={`transition-all duration-700 ${hasLit ? 'opacity-100 scale-100' : 'opacity-40 scale-75'}`}>
              <div className="w-6 h-10 bg-linear-to-t from-amber-500 via-amber-300 to-yellow-100 rounded-full blur-[1px] animate-pulse shadow-[0_0_24px_rgba(245,158,11,0.6)]" />
              <div className="absolute top-1 left-2 w-2 h-4 bg-white/90 rounded-full blur-[0.5px]" />
            </div>
            {/* Wick */}
            <div className="w-0.5 h-3 bg-stone-800 my-0.5" />
            {/* Wax Candle Body */}
            <div className="w-16 h-24 bg-linear-to-b from-amber-50 to-stone-200 rounded-t-sm shadow-md border-t border-amber-100 flex flex-col justify-end p-2 items-center">
              <div className="w-12 h-1 bg-amber-100/80 rounded-full mb-1" />
              <span className="text-[10px] text-stone-500 font-serif-display tracking-widest uppercase">Love</span>
            </div>
          </div>
          <p className="text-xs text-stone-500 mt-3 italic font-serif-display">
            {hasLit ? 'Your flame is burning softly in her memory.' : 'Click below to kindle this flame.'}
          </p>
        </div>

        {!hasLit ? (
          <form onSubmit={handleLight} className="space-y-4">
            <div>
              <label htmlFor="visitorName" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                Your Name (Optional)
              </label>
              <input
                id="visitorName"
                type="text"
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="e.g. Eleanor, or A Dear Friend"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>
            <div>
              <label htmlFor="reflection" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                A Whisper of Remembrance (Optional)
              </label>
              <textarea
                id="reflection"
                rows={2}
                value={reflectionNote}
                onChange={(e) => setReflectionNote(e.target.value)}
                placeholder="A favorite memory, a prayer, or gentle words for Mom..."
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-amber-200" />
                Kindle Flame
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="p-3 bg-amber-50/80 rounded-lg border border-amber-200/50 text-amber-900 text-sm">
              <p className="flex items-center justify-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Thank you for honoring {momName}.
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Her light and warmth continue to live in everyone she touched.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-sm font-medium text-stone-800 bg-stone-200 hover:bg-stone-300 rounded-lg transition-colors"
            >
              Return to Scrapbook
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
