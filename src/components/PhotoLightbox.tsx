import React from 'react';
import { X, Calendar, Tag } from 'lucide-react';
import { ScrapbookItem } from '../types';

interface PhotoLightboxProps {
  item: ScrapbookItem | null;
  onClose: () => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="relative max-w-2xl w-full bg-[#fcfaf6] rounded-xl overflow-hidden shadow-2xl border border-stone-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 bg-stone-900/60 hover:bg-stone-900 text-white rounded-full transition-colors"
          aria-label="Close photo preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Display */}
        {item.imageUrl ? (
          <div className="relative bg-stone-900 flex items-center justify-center max-h-[60vh] overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.caption}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[60vh] object-contain"
            />
          </div>
        ) : (
          <div className="p-8 bg-amber-50/60 border-b border-stone-200 text-center">
            <Tag className="w-8 h-8 text-amber-700 mx-auto mb-2" />
            <h3 className="font-serif-display text-xl text-stone-900">{item.caption}</h3>
          </div>
        )}

        {/* Details and Handwritten Note */}
        <div className="p-6 bg-[#faf6f0]">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h4 className="font-serif-display text-lg font-bold text-stone-900">
              {item.caption}
            </h4>
            {item.year && (
              <span className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {item.year}
              </span>
            )}
          </div>

          {item.note && (
            <div className="mt-3 p-4 bg-white/90 rounded-lg border border-stone-200/80 shadow-xs">
              <p className="font-handwriting text-stone-800 text-xl leading-relaxed">
                "{item.note}"
              </p>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-200/70 hover:bg-stone-300 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
