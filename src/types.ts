export interface MemorialProfile {
  name: string;
  maidenOrNickname?: string;
  birthDate: string;
  passingDate: string;
  epitaph: string;
  heroQuote: string;
  biographyChapters: {
    id: string;
    title: string;
    content: string;
  }[];
}

export interface ScrapbookItem {
  id: string;
  type: 'photo' | 'quote' | 'keepsake';
  imageUrl?: string;
  caption: string;
  year?: string;
  rotation: number; // e.g. -2, 1, 3 for natural scrapbook tilt
  tapeStyle: 'top' | 'corners' | 'washi-pink' | 'washi-cream';
  note?: string;
  actionLabel?: string;
  actionTarget?: 'quiz' | 'guestbook';
}

export interface RecipeCardGame {
  id: string;
  imageUrl: string;
  mysteryTitlePlaceholder: string;
  actualDishName: string;
  options: string[];
  correctOptionIndex: number;
  ingredientsSnippet: string[];
  clues: string[];
  familyStory: string;
  difficulty: 'Easy' | 'Medium' | 'Legendary';
  category: 'Dinner & Savory' | 'Baking & Desserts' | 'Holiday Traditions';
  tipsFromMom: string;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  relationship: string;
  date: string;
  message: string;
  symbol: 'rose' | 'candle' | 'teacup' | 'spoon' | 'heart' | 'daisy';
  photoUrl?: string;
  candleLit?: boolean;
  heartsCount: number;
}
