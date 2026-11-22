import React from 'react';
import { Flame } from 'lucide-react';

interface HeaderProps {
  activeTab: 'scrapbook' | 'quiz' | 'guestbook';
  onSelectTab: (tab: 'scrapbook' | 'quiz' | 'guestbook') => void;
  onOpenCandleModal: () => void;
  candleCount: number;
  momName: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenCandleModal,
  candleCount,
  momName
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('scrapbook')}
          className="text-left font-serif-display font-bold text-lg sm:text-xl text-stone-900 hover:text-amber-900 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
        >
          In Loving Memory of {momName.split(' ')[0] || 'Mom'}
        </button>

        {/* Zone 2: 3 clean single-line text navigation links */}
        <nav className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectTab('scrapbook')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
              activeTab === 'scrapbook'
                ? 'border-amber-800 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Scrapbook & Bio
          </button>
          <button
            onClick={() => onSelectTab('quiz')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
              activeTab === 'quiz'
                ? 'border-amber-800 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            What Was She Cooking?
          </button>
          <button
            onClick={() => onSelectTab('guestbook')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
              activeTab === 'guestbook'
                ? 'border-amber-800 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Guestbook & Tributes
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCandleModal}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
            title="Light a candle in loving memory"
          >
            <Flame className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
            <span>Light Candle</span>
            <span className="text-[11px] font-mono tabular-nums opacity-90 pl-1 border-l border-amber-600/70">
              {candleCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
