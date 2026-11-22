import { MemorialProfile, ScrapbookItem, RecipeCardGame, GuestbookEntry } from '../types';
import motherPortraitImg from '../assets/images/mother_portrait_scrapbook_1794168301840.jpg';
import familyKitchenImg from '../assets/images/family_kitchen_memory_1794168302504.jpg';
import potRoastRecipeImg from '../assets/images/mystery_recipe_pot_roast_1794168304132.jpg';
import lemonPieRecipeImg from '../assets/images/mystery_recipe_lemon_pie_1794168303342.jpg';
import cinnamonTwistsRecipeImg from '../assets/images/mystery_recipe_cinnamon_twists_1794168303258.jpg';

export const INITIAL_PROFILE: MemorialProfile = {
  name: 'Patricia "Pat" Weaver',
  maidenOrNickname: 'Affectionately Known as "Pat-Mobile"',
  birthDate: "April 16, 1947",
  passingDate: "July 31, 2026",
  epitaph: "Born in Tarrytown, New York, Pat spent 55 years surrounding her family with quiet strength, selfless care, and an open heart.",
  heroQuote: "It will work itself out.",
  biographyChapters: [
    {
      id: "chapter-1",
      title: "1. A Life of Heart & Tarrytown Roots",
      content: "Born in Tarrytown, New York on April 16, 1947, Pat learned resilience early after losing her mother at age five and being welcomed into the home of her Aunt Joy and Uncle Charles Merrill. Growing up in Tarrytown alongside her cousins Chuck, Kim, Kit, and Ray, she naturally embraced the role of caregiver from a young age—spending 55 years surrounding her family with quiet strength, selfless care, and an open heart."
    },
    {
      id: "chapter-2",
      title: "2. Motherhood, Janice & Her 33-Year Nursing Calling",
      content: "As a devoted single mother, Pat poured her life into guiding her daughter, Jennifer (married to Bob Dalzell). When her granddaughter Janice was born, Pat took on the role of grandmother with boundless devotion, sharing a tender and gentle bond tailored to Janice's special needs. Beyond her home, Pat dedicated 33 years of her life to Mother Cabrini Nursing Home, caring for residents living with Alzheimer's disease, where she was widely recognized for her gentleness, skill, and deep empathy."
    },
    {
      id: "chapter-3",
      title: "3. Her Lexicon & Everyday Words",
      content: "Her exact phrases carry the true sound of her voice and grounding presence: \"It will work itself out\"—her steady reassurance whenever life felt uncertain or stressful; \"Don't worry, it'll turn out ok\"—her comforting promise over 55 years of motherhood and grandmothership; \"You know what I need...\" and \"If you get a chance, could you...?\"—her affectionate way of asking for everyday errands; and \"You need to figure it out\"—what she'd playfully say with a laugh when asked for her secret recipes after giving no basic instructions!"
    },
    {
      id: "chapter-4",
      title: "4. Kitchen Archives & \"Cook at 350°\"",
      content: "Pat cooked by heart and instinct. Her handwritten recipe cards—often written with just ingredient measurements and brief notes like \"cook at 350 degrees\" or \"put in pot\" without any titles—are precious tactile heirlooms. Holding her actual handwriting keeps her presence alive in the kitchen, bridging sensory memory through taste, scent, and shared family meals."
    },
    {
      id: "chapter-5",
      title: "5. The \"Pat-Mobile\" & Extended Family",
      content: "Though Janice was her only grandchild, Pat's heart encompassed the entire extended family. Dubbed the \"Pat-Mobile\" by the younger generation for driving the kids everywhere with warmth and patience, she loved each of her nieces, nephews, and extended family members as her own. She is cherished and remembered by Jennifer & Bob Dalzell; Janice Dalzell; Kit Merrill & Jeff Duarte; Kim Merrill & Mike Pauly; Chuck & Lina Merrill; and all their children—Nicole, Samantha, Kelly, Scott, Ellie, Jessica, Melissa, Rachel, and Charlie."
    }
  ]
};

export const INITIAL_SCRAPBOOK_ITEMS: ScrapbookItem[] = [
  {
    id: "photo-1",
    type: "photo",
    imageUrl: motherPortraitImg,
    caption: "Pat smiling in the afternoon garden light, Tarrytown roots at heart.",
    year: "1947 – 2026",
    rotation: -2,
    tapeStyle: "washi-cream",
    note: "Widely recognized at Mother Cabrini Nursing Home and at home for her gentleness, quiet strength, and deep empathy."
  },
  {
    id: "photo-2",
    type: "photo",
    imageUrl: familyKitchenImg,
    caption: "Around the family table—where taste, scent, and laughter brought everyone together.",
    year: "Shared Family Meals",
    rotation: 2.5,
    tapeStyle: "corners",
    note: "Whether driving the kids in the legendary \"Pat-Mobile\" or gathering everyone for dinner, Pat's table was always open."
  },
  {
    id: "quote-1",
    type: "quote",
    caption: "\"Don't worry, it'll turn out ok.\"",
    year: "55 Years of Comfort",
    rotation: -1.5,
    tapeStyle: "washi-pink",
    note: "Her comforting promise over 55 years of motherhood and grandmothership—paired with her steady refrain: \"It will work itself out.\""
  },
  {
    id: "keepsake-1",
    type: "keepsake",
    caption: "\"You need to figure it out.\"",
    year: "Pat's Kitchen Humor",
    rotation: 1.8,
    tapeStyle: "top",
    note: "What Pat would playfully say with a laugh whenever anyone asked for her secret recipes after she left only notes like \"cook at 350 degrees\" or \"put in pot.\""
  },
  {
    id: "quote-2",
    type: "quote",
    caption: "\"You know what I need...\" / \"If you get a chance, could you...?\"",
    year: "Everyday Words",
    rotation: -1.2,
    tapeStyle: "washi-cream",
    note: "Her signature, affectionate way of asking for everyday errands or shopping trips."
  },
  {
    id: "keepsake-2",
    type: "keepsake",
    caption: "The Legendary \"Pat-Mobile\"",
    year: "Family Chauffeur & Caregiver",
    rotation: 2.1,
    tapeStyle: "corners",
    note: "Dubbed the \"Pat-Mobile\" by the younger generation—always ready to pick up Jennifer, Janice, and every niece and nephew with an open heart."
  }
];

export const INITIAL_RECIPE_GAMES: RecipeCardGame[] = [
  {
    id: "recipe-1",
    imageUrl: potRoastRecipeImg,
    mysteryTitlePlaceholder: "Mystery Recipe #1",
    actualDishName: "Pat's Sunday Pot Roast & Carrots (\"Put in Pot\")",
    options: [
      "Pat's Sunday Pot Roast & Carrots (\"Put in Pot\")",
      "Traditional Irish Beef Stew",
      "French Onion Braised Brisket",
      "Classic Shepherd's Pie Filling"
    ],
    correctOptionIndex: 0,
    ingredientsSnippet: [
      "Chuck Roast, 3 lbs. (cut small)",
      "Beef Broth, 2 cups",
      "Carrots, 4 large, roughly chopped",
      "Onions, 2 medium (halved)",
      "Garlic, 4 cloves (smashed)",
      "Thyme, 3-4 fresh sprigs"
    ],
    clues: [
      "Like so many of Pat's index cards, there is no title—just exact ingredients and a mental note to \"put in pot.\"",
      "If you asked her how long to simmer it, she'd grin and tell you: \"You need to figure it out.\"",
      "The savory aroma welcomed everyone back after long shifts at Mother Cabrini or rides in the Pat-Mobile."
    ],
    familyStory: "Pat cooked by heart and instinct. Holding her actual handwriting on cards like this keeps her presence alive in the kitchen—bridging sensory memory through taste, scent, and shared family meals.",
    difficulty: "Easy",
    category: "Dinner & Savory",
    tipsFromMom: "Put it in the pot, give it time, and don't worry—it'll turn out ok."
  },
  {
    id: "recipe-2",
    imageUrl: lemonPieRecipeImg,
    mysteryTitlePlaceholder: "Mystery Recipe #2",
    actualDishName: "Pat's Cool Lemon Icebox Pie (\"Cook at 350°\")",
    options: [
      "Key Lime Tartlet",
      "Pat's Cool Lemon Icebox Pie (\"Cook at 350°\")",
      "Baked Lemon Curd Cheesecake",
      "Warm Lemon Pudding Cake"
    ],
    correctOptionIndex: 1,
    ingredientsSnippet: [
      "3 large egg yolks",
      "1 can (14 oz) sweetened condensed milk",
      "1/2 cup fresh lemon juice",
      "1 pre-baked graham cracker crust",
      "Bake 15 mins at 350°F · Chill 3 hours"
    ],
    clues: [
      "No flour or cornstarch on this card—just yolks, condensed milk, and fresh lemon juice.",
      "Her brief instruction says simply: \"Bake at 350°F for 15 mins\" and chill.",
      "A bright, comforting dessert shared with family across Tarrytown summers."
    ],
    familyStory: "Even without a written title at the top, anyone in the family could recognize Pat's handwriting and the bright citrus scent filling the kitchen. It was pure comfort on a plate.",
    difficulty: "Medium",
    category: "Baking & Desserts",
    tipsFromMom: "Cook at 350 degrees—when you've baked it as many times as I have, you'll know when it's done."
  },
  {
    id: "recipe-3",
    imageUrl: cinnamonTwistsRecipeImg,
    mysteryTitlePlaceholder: "Mystery Recipe #3",
    actualDishName: "Holiday Morning Cinnamon Rolls",
    options: [
      "Old-Fashioned Apple Cinnamon Strudel",
      "Swedish Cardamom Sugar Buns",
      "Holiday Morning Cinnamon Rolls",
      "Brown Sugar Monkey Bread"
    ],
    correctOptionIndex: 2,
    ingredientsSnippet: [
      "1 pkg. yeast, 1 cup warm milk",
      "1/4 c. sugar, 1 tsp salt, 3 c. flour",
      "Roll into rectangle, spread generous softened butter",
      "Sprinkle heavy with cinnamon & brown sugar",
      "Glaze: powdered sugar, milk, vanilla (make it thick!)"
    ],
    clues: [
      "The handwritten note says: \"Sprinkle heavy with cinnamon & brown sugar (for that perfect swirl!).\"",
      "Her glaze note insists: \"(make it thick!)\" — classic Pat cooking by instinct.",
      "Baked at 350° for 20–25 minutes while the whole house woke up."
    ],
    familyStory: "Pat loved bringing warm treats to share with Jennifer, Janice, and all the Merrill nieces and nephews. The kitchen smelled like cinnamon and vanilla all morning.",
    difficulty: "Easy",
    category: "Holiday Traditions",
    tipsFromMom: "If you run low on cinnamon, don't worry—it will work itself out."
  },
  {
    id: "recipe-4",
    imageUrl: "",
    mysteryTitlePlaceholder: "Mystery Recipe #4",
    actualDishName: "Pat's Post-Shift Comfort Chili",
    options: [
      "Texas Cowboy Beef Chili",
      "Pat's Post-Shift Comfort Chili",
      "Smoky Barbecue Baked Beans",
      "Campfire Beef Goulash"
    ],
    correctOptionIndex: 1,
    ingredientsSnippet: [
      "2 lbs ground beef, browned with 1 chopped onion",
      "2 cans dark kidney beans (undrained)",
      "1 large can crushed San Marzano tomatoes",
      "2 tbsp chili powder, 1 tbsp cumin, 1 tsp garlic salt",
      "Note in margin: \"Put in pot · simmer till ready\""
    ],
    clues: [
      "Her handwritten margin note just says \"put in pot\" with no exact simmer time.",
      "Made to warm everyone up on cold New York evenings after shifts at Mother Cabrini.",
      "Packed with pantry staples so dinner was always ready when family stopped by."
    ],
    familyStory: "After 33 years of caring for residents at Mother Cabrini Nursing Home, Pat still came home ready to nourish her family. A simmering pot on the stove meant comfort for everyone who walked through the door.",
    difficulty: "Medium",
    category: "Dinner & Savory",
    tipsFromMom: "Put it in the pot and let it simmer—you need to figure it out from how it smells!"
  },
  {
    id: "recipe-5",
    imageUrl: "",
    mysteryTitlePlaceholder: "Mystery Recipe #5",
    actualDishName: "Family Table Cast-Iron Chocolate Chip Cookie",
    options: [
      "Classic Bakery Fudge Brownies",
      "Family Table Cast-Iron Chocolate Chip Cookie",
      "Butterscotch Blondie Bars",
      "Oatmeal Raisin Crisp"
    ],
    correctOptionIndex: 1,
    ingredientsSnippet: [
      "1 cup browned butter (cooled)",
      "3/4 cup brown sugar + 1/2 cup white sugar",
      "2 eggs + 1 yolk, 2 tsp vanilla",
      "2 1/4 cups flour, 1 tsp baking soda, flaky sea salt",
      "12 oz chocolate chunks · \"Cook at 350 degrees\""
    ],
    clues: [
      "The recipe calls for a single 10-inch skillet and simply says \"cook at 350 degrees.\"",
      "Made for nights when Janice and the cousins gathered together.",
      "Served warm in the center of the table—no individual plates required."
    ],
    familyStory: "Whether celebrating a milestone or lifting spirits after a tough week, Pat's skillet cookie turned any evening into a cozy family celebration.",
    difficulty: "Legendary",
    category: "Baking & Desserts",
    tipsFromMom: "Cook at 350 degrees and pull it while it's still soft—don't worry, it'll turn out ok."
  }
];

export const INITIAL_GUESTBOOK_ENTRIES: GuestbookEntry[] = [
  {
    id: "entry-1",
    author: "Jennifer & Bob Dalzell",
    relationship: "Daughter & Son-in-Law",
    date: "August 2026",
    message: "Mom, thank you for 55 years of quiet strength, selfless care, and an open heart. Whenever things felt uncertain, your voice was always there saying, 'It will work itself out' and 'Don't worry, it'll turn out ok.' We miss your gentle bond with Janice, your kitchen laughter, and every ride in the Pat-Mobile.",
    symbol: "rose",
    candleLit: true,
    heartsCount: 19
  },
  {
    id: "entry-2",
    author: "Kit Merrill & Jeff Duarte",
    relationship: "Cousin & Family",
    date: "August 2026",
    message: "Growing up together in Tarrytown with Aunt Joy and Uncle Charles, Pat was always the steady caregiver watching out for all of us. Even when we asked for her recipes and got 'You need to figure it out!' with a laugh, her love showed in every meal and every phone call.",
    symbol: "teacup",
    candleLit: true,
    heartsCount: 14
  },
  {
    id: "entry-3",
    author: "Kim Merrill & Mike Pauly",
    relationship: "Cousin & Family",
    date: "August 2026",
    message: "Pat had a way of making every single person in the extended family—including all the kids—feel deeply loved as her own. We will always smile remembering her asking, 'If you get a chance, could you...?' and her endless generosity.",
    symbol: "heart",
    candleLit: true,
    heartsCount: 12
  },
  {
    id: "entry-4",
    author: "Chuck & Lina Merrill",
    relationship: "Cousin & Family",
    date: "August 2026",
    message: "From childhood days in Tarrytown to watching the younger generation pile into the legendary Pat-Mobile, Pat brought quiet grace and kindness everywhere she went. An enduring legacy of selfless love and community care.",
    symbol: "candle",
    candleLit: true,
    heartsCount: 11
  },
  {
    id: "entry-5",
    author: "Mother Cabrini Nursing Home Colleague",
    relationship: "Fellow Nurse (33 Years Together)",
    date: "August 2026",
    message: "Pat was widely recognized throughout Cabrini for her gentleness, skill, and deep empathy. For 33 years, she treated every resident living with Alzheimer's disease with dignity and tenderness. She taught all of us what true caregiving looks like.",
    symbol: "spoon",
    candleLit: true,
    heartsCount: 16
  }
];
