import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  UtensilsCrossed, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Eye, 
  Printer, 
  Plus, 
  ChevronRight, 
  ChevronLeft, 
  Award,
  BookOpen,
  ZoomIn,
  CookingPot,
  Lightbulb,
  Image as ImageIcon
} from 'lucide-react';
import { RecipeCardGame } from '../types';
import { playSuccessChime } from '../utils/sound';

interface RecipeQuizViewProps {
  recipes: RecipeCardGame[];
  onAddRecipe: (newRecipe: RecipeCardGame) => void;
}

export const RecipeQuizView: React.FC<RecipeQuizViewProps> = ({
  recipes,
  onAddRecipe
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealedCluesCount, setRevealedCluesCount] = useState<Record<string, number>>({});
  const [solvedRecipeIds, setSolvedRecipeIds] = useState<Set<string>>(new Set());
  const [isZoomed, setIsZoomed] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Form state for adding custom recipe
  const [newTitle, setNewTitle] = useState('');
  const [newOptions, setNewOptions] = useState(['', '', '', '']);
  const [newCorrectIndex, setNewCorrectIndex] = useState(0);
  const [newIngredients, setNewIngredients] = useState('');
  const [newClues, setNewClues] = useState('');
  const [newFamilyStory, setNewFamilyStory] = useState('');
  const [newTips, setNewTips] = useState('');
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const activeRecipe = recipes[currentIndex] || recipes[0];
  const activeCluesCount = revealedCluesCount[activeRecipe.id] || 0;
  const isCurrentSolved = solvedRecipeIds.has(activeRecipe.id);

  const handleSelectOption = (idx: number) => {
    if (isCurrentSolved) return;
    setSelectedOption(idx);

    if (idx === activeRecipe.correctOptionIndex) {
      setFeedbackState('correct');
      playSuccessChime();
      setSolvedRecipeIds(prev => new Set(prev).add(activeRecipe.id));

      // Confetti burst
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#d97706', '#b45309', '#f59e0b', '#78350f']
        });
      } catch {
        // fallback
      }
    } else {
      setFeedbackState('incorrect');
    }
  };

  const handleRevealNextClue = () => {
    setRevealedCluesCount(prev => ({
      ...prev,
      [activeRecipe.id]: Math.min((prev[activeRecipe.id] || 0) + 1, activeRecipe.clues.length)
    }));
  };

  const handleNextRecipe = () => {
    setSelectedOption(null);
    setFeedbackState('idle');
    setCurrentIndex((prev) => (prev + 1) % recipes.length);
  };

  const handlePrevRecipe = () => {
    setSelectedOption(null);
    setFeedbackState('idle');
    setCurrentIndex((prev) => (prev - 1 + recipes.length) % recipes.length);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const formattedOptions = newOptions.map((opt, i) => opt.trim() || `Option ${i + 1}`);
    formattedOptions[newCorrectIndex] = newTitle.trim();

    const created: RecipeCardGame = {
      id: `recipe-custom-${Date.now()}`,
      imageUrl: newImagePreview || '',
      mysteryTitlePlaceholder: `Mystery Recipe #${recipes.length + 1}`,
      actualDishName: newTitle.trim(),
      options: formattedOptions,
      correctOptionIndex: newCorrectIndex,
      ingredientsSnippet: newIngredients.split('\n').filter(Boolean),
      clues: newClues.split('\n').filter(Boolean),
      familyStory: newFamilyStory.trim() || 'A cherished family recipe from Mom.',
      difficulty: 'Medium',
      category: 'Dinner & Savory',
      tipsFromMom: newTips.trim() || 'Cook with love and don\'t rush the process.'
    };

    onAddRecipe(created);
    setShowAddModal(false);
    // Reset form
    setNewTitle('');
    setNewOptions(['', '', '', '']);
    setNewIngredients('');
    setNewClues('');
    setNewFamilyStory('');
    setNewTips('');
    setNewImagePreview(null);
    setCurrentIndex(recipes.length); // jump to newly added recipe
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 max-w-6xl mx-auto space-y-10">
      {/* Title & Introduction */}
      <section className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-amber-800 font-semibold">
          <UtensilsCrossed className="w-4 h-4 text-amber-700" />
          <span>Pat's Kitchen Archives</span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
          What Was She Cooking?
        </h1>

        <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl mx-auto">
          Pat cooked by heart and instinct. Her handwritten recipe cards often held just ingredient measurements and brief notes like &ldquo;cook at 350 degrees&rdquo; or &ldquo;put in pot&rdquo;—with no titles at all. And if you asked how to make it, she&apos;d laugh: &ldquo;You need to figure it out.&rdquo;
        </p>

        {/* Score & Progress */}
        <div className="pt-2 flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-stone-700 font-medium bg-white px-3 py-1.5 rounded-full border border-stone-200 shadow-2xs">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Solved: <strong className="font-bold text-stone-900">{solvedRecipeIds.size}</strong> of {recipes.length}</span>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 text-amber-900 bg-amber-100/70 hover:bg-amber-200 px-3 py-1.5 rounded-full font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Another Recipe Card
          </button>
        </div>
      </section>

      {/* Recipe Index Card Selector Strip */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {recipes.map((rec, idx) => {
          const isSolved = solvedRecipeIds.has(rec.id);
          const isActive = idx === currentIndex;
          return (
            <button
              key={rec.id}
              onClick={() => {
                setCurrentIndex(idx);
                setSelectedOption(null);
                setFeedbackState('idle');
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-amber-900 text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {isSolved ? (
                <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-amber-200' : 'text-emerald-600'}`} />
              ) : (
                <HelpCircle className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-stone-400'}`} />
              )}
              <span>Card #{idx + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Main Game Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: The Handwritten Recipe Card Photo & Inspection */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#f5ede2] p-4 sm:p-6 rounded-2xl border border-stone-300 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-900 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                {activeRecipe.mysteryTitlePlaceholder}
              </span>
              <button
                onClick={() => setIsZoomed(true)}
                className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900 bg-white/80 px-2.5 py-1 rounded-md border border-stone-300 shadow-2xs transition-colors cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5 text-amber-800" />
                Zoom Handwriting
              </button>
            </div>

            {/* Recipe Card Display */}
            <div className="relative group rounded-xl overflow-hidden border border-stone-300 shadow-md bg-white">
              {activeRecipe.imageUrl ? (
                <div 
                  onClick={() => setIsZoomed(true)} 
                  className="cursor-zoom-in relative bg-stone-900 overflow-hidden flex items-center justify-center max-h-[460px]"
                >
                  <img
                    src={activeRecipe.imageUrl}
                    alt="Handwritten Recipe Card without title"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[460px] object-cover transition-transform duration-300 group-hover:scale-102"
                  />
                  <div className="absolute bottom-3 right-3 bg-stone-900/70 text-white text-xs px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-xs">
                    <ZoomIn className="w-3 h-3" />
                    Inspect Details
                  </div>
                </div>
              ) : (
                /* Authentic Vintage Index Card Simulator for user recipes without photos */
                <div className="p-8 bg-[#fffcf5] border-t-8 border-rose-300/40 relative min-h-[300px] flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="border-b border-red-200 pb-2">
                      <span className="font-handwriting text-stone-400 text-xl italic">[No Title Scribbled at Top]</span>
                    </div>
                    <div className="space-y-1.5 text-stone-800 font-handwriting text-xl leading-relaxed">
                      {activeRecipe.ingredientsSnippet.map((ing, i) => (
                        <p key={i}>• {ing}</p>
                      ))}
                    </div>
                  </div>
                  <div className="pt-6 border-t border-dashed border-stone-300 flex items-center justify-between text-xs text-stone-500 font-sans">
                    <span>From Pat's Kitchen Archives</span>
                    <span className="italic font-serif-display">&ldquo;Cook at 350°&rdquo;</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Ingredients Transcription */}
            <div className="mt-4 p-4 bg-white/90 rounded-xl border border-stone-200 text-stone-800">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600 mb-2 flex items-center gap-1.5">
                <CookingPot className="w-3.5 h-3.5 text-amber-700" />
                Deciphered Ingredients & Notes:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-700">
                {activeRecipe.ingredientsSnippet.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-800 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Guessing & Clues */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="text-xs font-semibold text-stone-500">
                Question {currentIndex + 1} of {recipes.length}
              </span>
              <span className="text-xs font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                {activeRecipe.category}
              </span>
            </div>

            <div>
              <h3 className="font-serif-display text-xl font-bold text-stone-900 mb-1">
                What recipe was Mom making?
              </h3>
              <p className="text-xs text-stone-500">
                Pick the exact dish corresponding to this handwritten recipe card.
              </p>
            </div>

            {/* 4 Multiple Choice Options */}
            <div className="space-y-2.5">
              {activeRecipe.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === activeRecipe.correctOptionIndex;
                const showSuccess = isCurrentSolved && isCorrect;
                const showWrong = isSelected && !isCorrect && feedbackState === 'incorrect';

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isCurrentSolved}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      showSuccess
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-2xs'
                        : showWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-950'
                        : isSelected
                        ? 'bg-amber-50 border-amber-600 text-amber-950'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800'
                    }`}
                  >
                    <span className="flex-1">{option}</span>
                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
                    {showWrong && <XCircle className="w-5 h-5 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Feedback Message */}
            {feedbackState === 'incorrect' && !isCurrentSolved && (
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Not quite!</p>
                  <p>Mom had a special touch on this one. Click "Reveal a Hint" below for a warm kitchen memory!</p>
                </div>
              </div>
            )}

            {/* Clue Revealer */}
            <div className="pt-2 border-t border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-700 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  Kitchen Clues ({activeCluesCount}/{activeRecipe.clues.length})
                </span>
                {activeCluesCount < activeRecipe.clues.length && (
                  <button
                    onClick={handleRevealNextClue}
                    className="text-xs font-medium text-amber-800 hover:text-amber-950 underline cursor-pointer"
                  >
                    Need a Hint? Reveal Clue
                  </button>
                )}
              </div>

              {activeCluesCount > 0 && (
                <div className="space-y-2">
                  {activeRecipe.clues.slice(0, activeCluesCount).map((clue, cIdx) => (
                    <div key={cIdx} className="p-2.5 bg-amber-50/70 rounded-lg border border-amber-200/70 text-xs text-stone-800 flex items-start gap-2">
                      <span className="font-bold text-amber-800">#{cIdx + 1}</span>
                      <p className="leading-relaxed">{clue}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* If solved: Heartwarming Reveal Story */}
            {isCurrentSolved && (
              <div className="p-5 bg-linear-to-b from-amber-50 to-orange-50/50 rounded-xl border border-amber-300 text-stone-800 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Solved! You identified {activeRecipe.actualDishName}</span>
                </div>

                <div className="text-xs text-stone-700 leading-relaxed">
                  <p className="font-semibold text-stone-900 mb-1">The Memory Behind This Card:</p>
                  <p className="italic">"{activeRecipe.familyStory}"</p>
                </div>

                {activeRecipe.tipsFromMom && (
                  <div className="p-3 bg-white/90 rounded-lg border border-amber-200/80 text-xs text-amber-950">
                    <strong className="block text-amber-900 mb-0.5">Mom's Secret Rule:</strong>
                    "{activeRecipe.tipsFromMom}"
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-200">
              <button
                onClick={handlePrevRecipe}
                className="px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Card
              </button>
              <button
                onClick={handleNextRecipe}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-amber-900 hover:bg-amber-950 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Next Recipe</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Zooming Handwritten Recipe Card */}
      {isZoomed && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-sm"
          onClick={() => setIsZoomed(false)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#fcfaf6] rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <div>
                <h3 className="font-serif-display text-lg font-bold text-stone-900">
                  Inspecting Mom's Handwritten Recipe
                </h3>
                <p className="text-xs text-stone-500">
                  {isCurrentSolved ? activeRecipe.actualDishName : 'Notice her handwriting, flour stains, and notes in the margin.'}
                </p>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors"
              >
                Close
              </button>
            </div>

            {activeRecipe.imageUrl ? (
              <div className="max-h-[70vh] overflow-auto rounded-lg border border-stone-300">
                <img
                  src={activeRecipe.imageUrl}
                  alt="Zoomed Recipe Card"
                  className="w-full h-auto object-contain"
                />
              </div>
            ) : (
              <div className="p-8 bg-[#fffcf5] border border-stone-300 rounded-lg font-handwriting text-2xl space-y-2">
                {activeRecipe.ingredientsSnippet.map((s, idx) => (
                  <p key={idx}>{s}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal for Adding Family Recipe */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#faf7f2] rounded-2xl p-6 shadow-2xl border border-stone-200 text-stone-800 my-8">
            <h3 className="font-serif-display text-xl font-bold text-stone-900 mb-1">
              Add a Mystery Recipe Card
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Upload a photo of another unlabeled recipe Mom wrote down, and challenge friends and family to guess!
            </p>

            <form onSubmit={handleCreateRecipe} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Upload Photo of Her Recipe Card (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-stone-300 rounded-xl p-3 bg-white hover:bg-stone-50 transition-colors">
                    <ImageIcon className="w-5 h-5 text-stone-400 mb-1" />
                    <span className="text-xs text-stone-600 font-medium">Click to select photo</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                  {newImagePreview && (
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-stone-300">
                      <img src={newImagePreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  The Actual Dish Name (Correct Answer)
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Mom's Blackberry Cobbler"
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  3 Other Tricky Guess Options
                </label>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newOptions[1]}
                    onChange={(e) => {
                      const copy = [...newOptions];
                      copy[1] = e.target.value;
                      setNewOptions(copy);
                    }}
                    placeholder="Decoy Option 1 (e.g. Blueberry Crisp)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={newOptions[2]}
                    onChange={(e) => {
                      const copy = [...newOptions];
                      copy[2] = e.target.value;
                      setNewOptions(copy);
                    }}
                    placeholder="Decoy Option 2 (e.g. Cherry Betty)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                  />
                  <input
                    type="text"
                    value={newOptions[3]}
                    onChange={(e) => {
                      const copy = [...newOptions];
                      copy[3] = e.target.value;
                      setNewOptions(copy);
                    }}
                    placeholder="Decoy Option 3 (e.g. Raspberry Tart)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Ingredients Visible on Card (One per line)
                </label>
                <textarea
                  rows={3}
                  value={newIngredients}
                  onChange={(e) => setNewIngredients(e.target.value)}
                  placeholder="4 cups fresh berries&#10;1 cup sugar&#10;1 stick butter, melted"
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Memory or Family Clues (One per line)
                </label>
                <textarea
                  rows={2}
                  value={newClues}
                  onChange={(e) => setNewClues(e.target.value)}
                  placeholder="We picked the berries together every July.&#10;Served with vanilla bean ice cream."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
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
                  Add to Game
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
