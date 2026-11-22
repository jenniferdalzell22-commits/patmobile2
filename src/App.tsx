/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  INITIAL_PROFILE, 
  INITIAL_SCRAPBOOK_ITEMS, 
  INITIAL_RECIPE_GAMES, 
  INITIAL_GUESTBOOK_ENTRIES,
  INITIAL_FAMILY_REMEMBRANCE
} from './data/initialData';
import { MemorialProfile, ScrapbookItem, RecipeCardGame, GuestbookEntry, FamilyRemembrance } from './types';
import { Header } from './components/Header';
import { ScrapbookView } from './components/ScrapbookView';
import { RecipeQuizView } from './components/RecipeQuizView';
import { GuestbookView } from './components/GuestbookView';
import { CandleModal } from './components/CandleModal';
import { PhotoLightbox } from './components/PhotoLightbox';
import { EditBioModal } from './components/EditBioModal';

export default function App() {
  // Navigation tab
  const [activeTab, setActiveTab] = useState<'scrapbook' | 'quiz' | 'guestbook'>('scrapbook');

  // Memorial profile (editable & persisted)
  const [profile, setProfile] = useState<MemorialProfile>(() => {
    try {
      const saved = localStorage.getItem('memorial_profile_v9');
      return saved ? JSON.parse(saved) : INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  // Scrapbook items (persisted)
  const [scrapbookItems, setScrapbookItems] = useState<ScrapbookItem[]>(() => {
    try {
      const saved = localStorage.getItem('memorial_scrapbook_v22');
      return saved ? JSON.parse(saved) : INITIAL_SCRAPBOOK_ITEMS;
    } catch {
      return INITIAL_SCRAPBOOK_ITEMS;
    }
  });

  // Mystery recipe guessing game cards (persisted)
  const [recipes, setRecipes] = useState<RecipeCardGame[]>(() => {
    try {
      const saved = localStorage.getItem('memorial_recipes_v9');
      return saved ? JSON.parse(saved) : INITIAL_RECIPE_GAMES;
    } catch {
      return INITIAL_RECIPE_GAMES;
    }
  });

  // Guestbook entries (persisted)
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(() => {
    try {
      const saved = localStorage.getItem('memorial_guestbook_v9');
      return saved ? JSON.parse(saved) : INITIAL_GUESTBOOK_ENTRIES;
    } catch {
      return INITIAL_GUESTBOOK_ENTRIES;
    }
  });

  // Candle counter
  const [candleCount, setCandleCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('memorial_candles_v9');
      return saved ? parseInt(saved, 10) : 55;
    } catch {
      return 55;
    }
  });

  // Family remembrance entries (persisted)
  const [familyMembers, setFamilyMembers] = useState<FamilyRemembrance[]>(() => {
    try {
      const saved = localStorage.getItem('memorial_family_v7');
      return saved ? JSON.parse(saved) : INITIAL_FAMILY_REMEMBRANCE;
    } catch {
      return INITIAL_FAMILY_REMEMBRANCE;
    }
  });

  // Modals state
  const [isCandleModalOpen, setIsCandleModalOpen] = useState(false);
  const [isEditBioOpen, setIsEditBioOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<ScrapbookItem | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('memorial_profile_v9', JSON.stringify(profile));
    } catch {
      // ignore quota errors
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem('memorial_scrapbook_v22', JSON.stringify(scrapbookItems));
    } catch {
      // ignore
    }
  }, [scrapbookItems]);

  useEffect(() => {
    try {
      localStorage.setItem('memorial_recipes_v9', JSON.stringify(recipes));
    } catch {
      // ignore
    }
  }, [recipes]);

  useEffect(() => {
    try {
      localStorage.setItem('memorial_guestbook_v9', JSON.stringify(guestbookEntries));
    } catch {
      // ignore
    }
  }, [guestbookEntries]);

  useEffect(() => {
    try {
      localStorage.setItem('memorial_candles_v9', candleCount.toString());
    } catch {
      // ignore
    }
  }, [candleCount]);

  useEffect(() => {
    try {
      localStorage.setItem('memorial_family_v7', JSON.stringify(familyMembers));
    } catch {
      // ignore
    }
  }, [familyMembers]);

  // Handlers
  const handleSaveProfile = (updatedProfile: MemorialProfile) => {
    setProfile(updatedProfile);
  };

  const handleAddScrapbookItem = (newItem: ScrapbookItem) => {
    setScrapbookItems([newItem, ...scrapbookItems]);
  };

  const handleUpdateScrapbookItem = (updatedItem: ScrapbookItem) => {
    setScrapbookItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  const handleDeleteScrapbookItem = (id: string) => {
    setScrapbookItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddFamilyMember = (member: FamilyRemembrance) => {
    setFamilyMembers((prev) => [...prev, member]);
  };

  const handleUpdateFamilyMember = (updatedMember: FamilyRemembrance) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === updatedMember.id ? updatedMember : m))
    );
  };

  const handleDeleteFamilyMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAddRecipe = (newRecipe: RecipeCardGame) => {
    setRecipes([...recipes, newRecipe]);
  };

  const handleAddGuestbookEntry = (newEntry: GuestbookEntry) => {
    setGuestbookEntries([newEntry, ...guestbookEntries]);
    setCandleCount(prev => prev + 1);
  };

  const handleLightCandle = (note?: string, visitorName?: string) => {
    setCandleCount(prev => prev + 1);
    if (note && visitorName) {
      const newEntry: GuestbookEntry = {
        id: `candle-${Date.now()}`,
        author: visitorName,
        relationship: 'Loved One',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        message: note,
        symbol: 'candle',
        candleLit: true,
        heartsCount: 1
      };
      setGuestbookEntries([newEntry, ...guestbookEntries]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfaf6] text-stone-800 selection:bg-amber-200">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCandleModal={() => setIsCandleModalOpen(true)}
        candleCount={candleCount}
        momName={profile.name}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'scrapbook' && (
          <ScrapbookView
            profile={profile}
            items={scrapbookItems}
            familyMembers={familyMembers}
            onOpenEditBio={() => setIsEditBioOpen(true)}
            onUpdateProfile={handleSaveProfile}
            onOpenLightbox={(item) => setLightboxItem(item)}
            onAddItem={handleAddScrapbookItem}
            onUpdateItem={handleUpdateScrapbookItem}
            onDeleteItem={handleDeleteScrapbookItem}
            onAddFamilyMember={handleAddFamilyMember}
            onUpdateFamilyMember={handleUpdateFamilyMember}
            onDeleteFamilyMember={handleDeleteFamilyMember}
            onNavigateToQuiz={() => {
              setActiveTab('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToGuestbook={() => {
              setActiveTab('guestbook');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'quiz' && (
          <RecipeQuizView
            recipes={recipes}
            onAddRecipe={handleAddRecipe}
          />
        )}

        {activeTab === 'guestbook' && (
          <GuestbookView
            entries={guestbookEntries}
            onAddEntry={handleAddGuestbookEntry}
            momName={profile.name}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="mt-16 border-t border-stone-200/80 bg-[#f7f3ec] py-8 px-4 text-center text-xs text-stone-600">
        <div className="max-w-4xl mx-auto space-y-3">
          <p className="font-serif-display text-base text-stone-800 font-medium">
            In Everlasting Remembrance of {profile.name}
          </p>
          <div className="flex items-center justify-center gap-3 text-stone-500 font-sans">
            <span>{profile.birthDate}</span>
            <span aria-hidden="true">·</span>
            <span>{profile.passingDate}</span>
            <span aria-hidden="true">·</span>
            <span>Always in Our Hearts</span>
          </div>
          <p className="text-[11px] text-stone-400 font-serif-display italic pt-1">
            "A table filled with love never truly empties."
          </p>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <PhotoLightbox
        item={lightboxItem}
        onClose={() => setLightboxItem(null)}
        onNavigate={(target) => {
          setActiveTab(target);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Candle Modal */}
      <CandleModal
        isOpen={isCandleModalOpen}
        onClose={() => setIsCandleModalOpen(false)}
        candleCount={candleCount}
        onLightCandle={handleLightCandle}
        momName={profile.name}
      />

      {/* Edit Biography Modal */}
      <EditBioModal
        isOpen={isEditBioOpen}
        onClose={() => setIsEditBioOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
