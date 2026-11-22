import { MemorialProfile, ScrapbookItem, RecipeCardGame, GuestbookEntry } from '../types';
import motherPortraitImg from '../assets/images/mother_portrait_scrapbook_1794168301840.jpg';
import familyKitchenImg from '../assets/images/family_kitchen_memory_1794168302504.jpg';
import potRoastRecipeImg from '../assets/images/mystery_recipe_pot_roast_1794168304132.jpg';
import lemonPieRecipeImg from '../assets/images/mystery_recipe_lemon_pie_1794168303342.jpg';
import cinnamonTwistsRecipeImg from '../assets/images/mystery_recipe_cinnamon_twists_1794168303258.jpg';

export const INITIAL_PROFILE: MemorialProfile = {
  name: "Margaret 'Maggie' Turner",
  maidenOrNickname: "Beloved Mother, Nana, and Queen of the Kitchen",
  birthDate: "April 14, 1952",
  passingDate: "October 18, 2024",
  epitaph: "Her door was always open, her table always full, and her laughter heard from down the street.",
  heroQuote: "If you leave this table hungry, that's your own fault.",
  biographyChapters: [
    {
      id: "chapter-1",
      title: "1. Roots, Aprons & The Early Years",
      content: "Born on a crisp April morning in Cedar Falls, Maggie grew up with flour on her hands and gardens in her heart. The eldest of four, she learned early that food was more than fuel—it was comfort, truce, and celebration. She married Tom on a sun-drenched June afternoon in 1974, wearing daisies in her hair and a smile that never dimmed for fifty wonderful years."
    },
    {
      id: "chapter-2",
      title: "2. The Heart of the Home: Her Sunday Kitchen",
      content: "Maggie's kitchen was never quiet. The radio always played folk songs, a yellow enamel kettle whistled on the stove, and there was always room for one more chair at the table. Friends, neighbors, and kids from three blocks away knew that the back screen door was never locked. She never cooked for four when she could cook for twelve, and her pantry was a sanctuary for anyone who needed a warm cup of coffee and honest wisdom."
    },
    {
      id: "chapter-3",
      title: "3. Her Mystery Recipe Box & Kitchen Secrets",
      content: "Mom was notorious for scribbling recipes on whatever was within arm's reach: index cards, the back of gas receipts, church bulletins, and napkin corners. Her greatest culinary quirk? She rarely wrote titles on her cards. She assumed anyone who truly loved food would recognize a dish by its soul—a dash of brown sugar here, a sprig of thyme there, and a note in the margin that simply read: 'Bake till it smells like Sunday.'"
    },
    {
      id: "chapter-4",
      title: "4. A Legacy Written in Warmth",
      content: "Maggie taught us that kindness is an everyday practice. She cheered at every rainy soccer game, sent handwritten birthday cards to dozens of cousins, and never let anyone feel alone. As we gather, cook her dishes, and retell her favorite jokes, her spirit continues to warm every corner of our lives."
    }
  ]
};

export const INITIAL_SCRAPBOOK_ITEMS: ScrapbookItem[] = [
  {
    id: "photo-1",
    type: "photo",
    imageUrl: motherPortraitImg,
    caption: "Mom in her beloved peony & wildflower garden, sunny July afternoon.",
    year: "Summer 2018",
    rotation: -2,
    tapeStyle: "washi-cream",
    note: "She spent every sunny morning talking to her hydrangeas and clipping fresh blooms for the kitchen table."
  },
  {
    id: "photo-2",
    type: "photo",
    imageUrl: familyKitchenImg,
    caption: "Sunday dinner crew laughing around the old oak table.",
    year: "October 1984",
    rotation: 2.5,
    tapeStyle: "corners",
    note: "She insisted on fresh homemade pie even on a busy weeknight."
  },
  {
    id: "quote-1",
    type: "quote",
    caption: "Mom's Golden Rule",
    year: "Spoken Daily",
    rotation: -1.5,
    tapeStyle: "washi-pink",
    note: "“Never trust a recipe that doesn't ask for a little bit of butter, and never stay mad at someone you could make soup for.”"
  },
  {
    id: "keepsake-1",
    type: "keepsake",
    caption: "Her Brass Measuring Spoons",
    year: "Est. 1974",
    rotation: 1.8,
    tapeStyle: "top",
    note: "The 'tablespoon' was so worn down from decades of stirring that it was probably closer to one-and-a-half tablespoons. That was her secret."
  }
];

export const INITIAL_RECIPE_GAMES: RecipeCardGame[] = [
  {
    id: "recipe-1",
    imageUrl: potRoastRecipeImg,
    mysteryTitlePlaceholder: "Mystery Recipe #1",
    actualDishName: "Mom's Sunday Pot Roast & Caramelized Carrots",
    options: [
      "Mom's Sunday Pot Roast & Caramelized Carrots",
      "Traditional Irish Beef Stew",
      "French French Onion Braised Brisket",
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
      "The rich savory aroma would fill the entire house starting around 1:00 PM every Sunday autumn afternoon.",
      "She always seared the beef hard in her heavy red Dutch oven until deeply browned before pouring in the broth.",
      "Notice how thick she cut the carrots—she always said: 'Small carrots turn to mush, big carrots turn into candy.'"
    ],
    familyStory: "This was Mom's signature cold-weather comfort dish. The rule in our house was whoever set the table got first dibs on the pan drippings for dipping fresh crusty sourdough bread. If you smelled this cooking, you knew everyone you loved would be around the table that evening.",
    difficulty: "Easy",
    category: "Dinner & Savory",
    tipsFromMom: "Sear it until it's almost darker than you think it should be. The fond on the bottom of the pot is where all the love lives."
  },
  {
    id: "recipe-2",
    imageUrl: lemonPieRecipeImg,
    mysteryTitlePlaceholder: "Mystery Recipe #2",
    actualDishName: "Grandma's Secret Lemon Icebox Pie",
    options: [
      "Key Lime Tartlet",
      "Grandma's Secret Lemon Icebox Pie",
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
      "Notice there is NO flour or cornstarch—just egg yolks and sweetened condensed milk!",
      "She strictly forbade bottled lemon juice: 'If you don't squeeze them yourself, you might as well eat store-bought candy.'",
      "This was served on the Fourth of July and every family picnic, topped with towering swirls of cold heavy cream."
    ],
    familyStory: "Mom's Lemon Icebox Pie was the centerpiece of every summer family reunion. It was silky, tart, and cool as a river breeze. If anyone had a tough week, Mom would show up on their porch with this pie in a gingham dish towel.",
    difficulty: "Medium",
    category: "Baking & Desserts",
    tipsFromMom: "Whisk the yolks until they look like pale sunshine before adding the milk. Don't rush the chill time!"
  },
  {
    id: "recipe-3",
    imageUrl: cinnamonTwistsRecipeImg,
    mysteryTitlePlaceholder: "Mystery Recipe #3",
    actualDishName: "Christmas Morning Cinnamon Rolls",
    options: [
      "Old-Fashioned Apple Cinnamon Strudel",
      "Swedish Cardamom Sugar Buns",
      "Christmas Morning Cinnamon Rolls",
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
      "The handwritten note says: 'Sprinkle heavy with cinnamon & brown sugar (for that perfect swirl!)'.",
      "The dough was kneaded on Christmas Eve and placed in a greased bowl near the radiator to rise overnight.",
      "The vanilla glaze instruction explicitly emphasizes: '(make it thick!)'."
    ],
    familyStory: "Nobody was allowed to touch a single Christmas present until these rolls were pulled bubbling and golden out of the oven. Mom would drizzle the warm vanilla glaze with a soup spoon, coating everything in sugary sweetness. The house smelled like holidays for three days straight.",
    difficulty: "Easy",
    category: "Holiday Traditions",
    tipsFromMom: "Spread the butter all the way to the very edge of the dough. Nobody likes a dry cinnamon roll corner."
  },
  {
    id: "recipe-4",
    imageUrl: "",
    mysteryTitlePlaceholder: "Mystery Recipe #4",
    actualDishName: "Mom's 'Emergency' 2 AM Midnight Chili",
    options: [
      "Texas Cowboy Beef Chili",
      "Mom's 'Emergency' 2 AM Midnight Chili",
      "Smoky Barbecue Baked Beans",
      "Campfire Beef Goulash"
    ],
    correctOptionIndex: 1,
    ingredientsSnippet: [
      "2 lbs ground beef, browned with 1 chopped onion",
      "2 cans dark kidney beans (undrained)",
      "1 large can crushed San Marzano tomatoes",
      "2 tbsp chili powder, 1 tbsp cumin, 1 tsp garlic salt",
      "Secret: 1 tbsp brown sugar + 1/4 tsp cinnamon!"
    ],
    clues: [
      "Whenever power went out in winter storms, this pot immediately went onto the gas stove.",
      "Look at the secret spices: a spoonful of brown sugar and a touch of cinnamon in beef chili!",
      "She called it 'Emergency Chili' because she could pull it together from pantry cans in twenty minutes flat."
    ],
    familyStory: "When late-night college kids stumbled home for winter break, or when a blizzard knocked out the neighborhood electricity, Mom was in her flannel robe simmering this chili. The pinch of cinnamon made everyone ask: 'What is that incredible flavor?' Mom would just wink and say, 'Love, darling.'",
    difficulty: "Medium",
    category: "Dinner & Savory",
    tipsFromMom: "Don't drain the kidney beans! The starchy broth thickens the pot better than any cornstarch ever could."
  },
  {
    id: "recipe-5",
    imageUrl: "",
    mysteryTitlePlaceholder: "Mystery Recipe #5",
    actualDishName: "The Giant Skillet Chocolate Chip Cookie",
    options: [
      "Classic Bakery Fudge Brownies",
      "The Giant Skillet Chocolate Chip Cookie",
      "Butterscotch Blondie Bars",
      "Grandma's Oatmeal Raisin Crisp"
    ],
    correctOptionIndex: 1,
    ingredientsSnippet: [
      "1 cup browned butter (cooled)",
      "3/4 cup brown sugar + 1/2 cup white sugar",
      "2 eggs + 1 yolk, 2 tsp vanilla",
      "2 1/4 cups flour, 1 tsp baking soda, flaky sea salt",
      "12 oz semi-sweet chocolate chunks, baked in 10-inch cast iron"
    ],
    clues: [
      "The recipe specifies browning the butter first until nutty and amber-golden.",
      "Baked directly inside a seasoned 10-inch cast iron skillet until the edges are crispy and center is gooey.",
      "Always served warm in the center of the table with five spoons and a tub of vanilla ice cream right on top."
    ],
    familyStory: "Whenever someone had a heartbreak, failed a driving test, or celebrated an A+, Mom didn't bake individual cookies—she baked one giant cookie in the skillet. We'd sit around the table with spoons, eating straight from the hot pan. No plates needed.",
    difficulty: "Legendary",
    category: "Baking & Desserts",
    tipsFromMom: "Pull it out when the center still looks slightly underdone. The cast iron keeps cooking on the counter for another five minutes."
  }
];

export const INITIAL_GUESTBOOK_ENTRIES: GuestbookEntry[] = [
  {
    id: "entry-1",
    author: "Sarah Turner-Collins",
    relationship: "Daughter",
    date: "November 2, 2024",
    message: "Mom, every time I step into my own kitchen now, I hear you humming. Thank you for showing me how to feed people not just with meals, but with open arms and fierce kindness. We are taking care of Dad just like you told us to, though none of us can make coffee the way you did. I miss your morning phone calls so much.",
    symbol: "rose",
    candleLit: true,
    heartsCount: 14
  },
  {
    id: "entry-2",
    author: "David & Eleanor Henderson",
    relationship: "Next Door Neighbors (32 Years)",
    date: "October 29, 2024",
    message: "When we moved onto Elm Street in 1992 with an infant and three broken moving boxes, Maggie appeared at our front door within an hour holding a warm chicken casserole, paper plates, and two cold sodas. She watched our kids grow up, watered our ferns when we traveled, and leaned over the cedar fence to trade tomato gardening tips. The neighborhood feels so much quieter without her bright laughter.",
    symbol: "candle",
    candleLit: true,
    heartsCount: 9
  },
  {
    id: "entry-3",
    author: "Lucas (Age 11)",
    relationship: "Grandson",
    date: "October 26, 2024",
    message: "Nana was the best because she let me sneak chocolate chips straight from the freezer bag and she never told Mom. She taught me how to plant pumpkin seeds and told me that worms are just garden friends. I made cinnamon toast this morning and thought of you, Nana.",
    symbol: "heart",
    candleLit: true,
    heartsCount: 18
  },
  {
    id: "entry-4",
    author: "Claire Bennett",
    relationship: "Sister & Lifetime Confidante",
    date: "October 24, 2024",
    message: "Maggie was my big sister, my protector, and my favorite co-conspirator. Growing up, we shared a bedroom under the attic eaves and talked until 2 AM about our dreams. She lived every single day with gratitude. Maggie, thank you for seventy-two years of pure unconditional love. Save a seat for me at the big table.",
    symbol: "teacup",
    candleLit: true,
    heartsCount: 12
  },
  {
    id: "entry-5",
    author: "Marcus Vance",
    relationship: "Family Friend",
    date: "October 22, 2024",
    message: "I spent nearly half my high school years sitting at the Turner kitchen island doing homework while Maggie tested new soups on us. She had a gift for making every teenager feel like their thoughts mattered. A truly remarkable, generous soul.",
    symbol: "spoon",
    candleLit: true,
    heartsCount: 7
  }
];
