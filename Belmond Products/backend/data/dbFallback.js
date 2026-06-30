const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'json_db');

// Ensure database directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File paths
const productsPath = path.join(DATA_DIR, 'products.json');
const articlesPath = path.join(DATA_DIR, 'articles.json');
const newsPath = path.join(DATA_DIR, 'news.json');
const feedbackPath = path.join(DATA_DIR, 'feedback.json');

// --- Seed Data Definitions ---
const defaultProducts = [
  {
    _id: "p1",
    name: "Royal Breakfast",
    type: "classic-black-teas",
    format: "sachets",
    price: "$6.99",
    rating: "★★★★★",
    imgUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400",
    desc: "A rich and traditional English breakfast blend. Selected from top Indian and Ceylon gardens, providing a strong, full-bodied cup with malty undertones.",
    ingredients: "100% pure black tea blend (Assam and Ceylon).",
    brewing: "Brew in freshly boiled water (100°C) for 3-5 minutes."
  },
  {
    _id: "p2",
    name: "Royal Lord Grey",
    type: "fruit-and-herbal-teas",
    format: "sachets",
    price: "$7.49",
    rating: "★★★★☆",
    imgUrl: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=400",
    desc: "A timeless English classic. Fine Ceylon black tea expertly scented with natural bergamot oil citrus flavor and decorated with blue cornflower petals.",
    ingredients: "Ceylon black tea, natural bergamot flavoring, cornflower petals.",
    brewing: "Brew in freshly boiled water (100°C) for 3 minutes."
  },
  {
    _id: "p3",
    name: "Royal Green",
    type: "green-teas-and-tisanes",
    format: "sachets",
    price: "$6.99",
    rating: "★★★★★",
    imgUrl: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=400",
    desc: "Fine Chinese green tea, carefully steam-processed to preserve its light emerald color, fresh sweet aroma, and rich antioxidants.",
    ingredients: "100% green tea.",
    brewing: "Brew in hot water (80°C) for 2-3 minutes."
  },
  {
    _id: "p4",
    name: "Royal Jasmine Green",
    type: "green-teas-and-tisanes",
    format: "pyramids",
    price: "$8.49",
    rating: "★★★★★",
    imgUrl: "https://images.unsplash.com/photo-1597481669461-39589d97bf95?auto=format&fit=crop&q=80&w=400",
    desc: "Premium green tea scented naturally by layering with fresh jasmine blossoms, then portioned into nylon mesh pyramids for optimal infusion.",
    ingredients: "Chinese green tea, natural jasmine petals.",
    brewing: "Brew in hot water (85°C) for 3 minutes."
  },
  {
    _id: "p5",
    name: "Royal Thyme & Rosemary",
    type: "fruit-and-herbal-teas",
    format: "leaf-and-granules",
    price: "$9.99",
    rating: "★★★★☆",
    imgUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400",
    desc: "An aromatic combination of fine black tea leaves mixed with wild mountain thyme sprigs and rosemary. Offers a savory, soothing, and earthy experience.",
    ingredients: "Black tea, dried thyme, dried rosemary.",
    brewing: "Brew in freshly boiled water (100°C) for 4-5 minutes."
  },
  {
    _id: "p6",
    name: "Royal Peach & Mint",
    type: "fruit-and-herbal-teas",
    format: "sachets",
    price: "$7.49",
    rating: "★★★★☆",
    imgUrl: "https://images.unsplash.com/photo-1562007908-17c67e870c88?auto=format&fit=crop&q=80&w=400",
    desc: "A summery black tea infusion. A juicy sweet peach flavour notes blended perfectly with fresh peppermint leaves for a crisp, clean cooling finish.",
    ingredients: "Black tea, peppermint leaves, peach flavouring.",
    brewing: "Brew in freshly boiled water (100°C) for 3-4 minutes."
  },
  {
    _id: "p7",
    name: "Royal Selection Gift Box",
    type: "gifts",
    format: "pyramids",
    price: "$24.99",
    rating: "★★★★★",
    imgUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400",
    desc: "A grand royal assortment presented in an embossed metal gold box. Features 9 different signature premium blends including black, green, and herbal teas.",
    ingredients: "Assortment of black tea, green tea, herbal infusions and natural flavourings.",
    brewing: "Instructions vary by tea type (specified inside box)."
  },
  {
    _id: "p8",
    name: "Royal Ginger & Lemon",
    type: "wellness-collection",
    format: "pyramids",
    price: "$8.99",
    rating: "★★★★☆",
    imgUrl: "https://images.unsplash.com/photo-1514733670139-4d87a19bc194?auto=format&fit=crop&q=80&w=400",
    desc: "An invigorating caffeine-free herbal infusion. Spicy hot ginger root is balanced with zesty lemon peels and sweet lemongrass to boost your natural defenses.",
    ingredients: "Ginger root, lemongrass, lemon peel, licorice root.",
    brewing: "Brew in boiled water (100°C) for 5-7 minutes."
  },
  {
    _id: "p9",
    name: "Royal Immune Blend",
    type: "wellness-collection",
    format: "leaf-and-granules",
    price: "$11.99",
    rating: "★★★★★",
    imgUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=400",
    desc: "A supportive functional loose leaf tea. Rich herbal combination packed with rosehips, hibiscus flowers, echinacea herbs, and natural berries for premium body care.",
    ingredients: "Hibiscus, rosehip, echinacea, apple pieces, strawberry flavouring.",
    brewing: "Brew in boiled water (100°C) for 6-8 minutes."
  },
  {
    _id: "p10",
    name: "Royal Lion Crest Tin",
    type: "gifts",
    format: "leaf-and-granules",
    price: "$14.99",
    rating: "★★★★★",
    imgUrl: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=400",
    desc: "A collector's item. A majestic deep royal blue tin can embossed with the golden lion crest, containing premium loose leaf Ceylon Orange Pekoe black tea.",
    ingredients: "100% Ceylon Orange Pekoe black tea.",
    brewing: "Brew in freshly boiled water (100°C) for 4 minutes."
  }
];

const defaultArticles = [
  {
    _id: "a1",
    title: "Traditions and history of English tea drinking",
    category: "History & Traditions",
    readTime: "5 min read",
    imgUrl: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=600",
    desc: "Delve into the origin of Afternoon Tea, introduced by Duchess Anna Maria in the 1840s, and how it evolved into a beloved royal ceremony."
  },
  {
    _id: "a2",
    title: "How to store tea so that it does not lose its flavor and aroma",
    category: "Tea Care",
    readTime: "4 min read",
    imgUrl: "https://images.unsplash.com/photo-1597481669461-39589d97bf95?auto=format&fit=crop&q=80&w=600",
    desc: "Tea is highly sensitive to humidity, odors, light, and heat. Learn our experts' secrets to keeping your royal blends fresh in air-tight tins."
  },
  {
    _id: "a3",
    title: "How many cups of tea a day you can drink without harming your health",
    category: "Wellness",
    readTime: "6 min read",
    imgUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=600",
    desc: "Uncover the scientific benefits of daily tea drinking, from improved cardiac health to concentration boosts, and learn the optimal daily amount."
  },
  {
    _id: "a4",
    title: "The secret of brewing the perfect cup of Ceylon tea",
    category: "Brewing Guides",
    readTime: "3 min read",
    imgUrl: "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&q=80&w=600",
    desc: "Water temperature, brewing times, and teapot materials. Our tea master shares step-by-step guidance to unlock the royal flavor profile."
  },
  {
    _id: "a5",
    title: "Understanding herbal tisanes & antioxidant wellness",
    category: "Ingredients",
    readTime: "5 min read",
    imgUrl: "https://images.unsplash.com/photo-1514733670139-4d87a19bc194?auto=format&fit=crop&q=80&w=600",
    desc: "What makes a wellness collection tea functional? Discover the therapeutic powers of ginger, mint, chamomile, and active botanicals."
  },
  {
    _id: "a6",
    title: "A journey through Victorian Afternoon Tea ceremonies",
    category: "Royal History",
    readTime: "7 min read",
    imgUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600",
    desc: "Travel back in time to explore the elaborate table setups, dress codes, and etiquette rules that defined the aristocratic British tea hour."
  }
];

const defaultNews = [
  {
    _id: "n1",
    title: "The New Royal Selection Assorted Pack is Now Available",
    date: "October 15, 2025",
    desc: "Ideal for corporate gifts and family gatherings, our newly designed Royal Selection features 72 individual envelopes with 9 masterfully crafted blends. Available in retail partners globally.",
    imgUrl: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=600",
    link: "/collection?type=gifts"
  },
  {
    _id: "n2",
    title: "Celebrate British Heritage: The Queen's Anniversary Blends",
    date: "June 20, 2025",
    desc: "Inspired by Royal tea blends served during the late 19th-century state dinners, our tea masters have reconstituted a rich Ceylon & Assam black tea with bergamot extract and wild cornflowers in gorgeous cobalt metal tins.",
    imgUrl: "https://images.unsplash.com/photo-1594631252845-29fc4586d51c?auto=format&fit=crop&q=80&w=600",
    link: "/collection?type=classic-black-teas"
  },
  {
    _id: "n3",
    title: "Discover the Fresh Spring Harvest of Green Tea",
    date: "April 05, 2025",
    desc: "Our signature Green Teas and Tisanes line welcomes fresh steamed spring leaves from organic Chinese tea gardens. Enjoy refreshing cups packed with natural antioxidants and jasmine notes.",
    imgUrl: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&q=80&w=600",
    link: "/collection?type=green-teas-and-tisanes"
  }
];

// Initialize JSON files if missing
const initJSONDb = () => {
  if (!fs.existsSync(productsPath)) {
    fs.writeFileSync(productsPath, JSON.stringify(defaultProducts, null, 2));
    console.log('Seeded fallback products database.');
  }
  if (!fs.existsSync(articlesPath)) {
    fs.writeFileSync(articlesPath, JSON.stringify(defaultArticles, null, 2));
    console.log('Seeded fallback articles database.');
  }
  if (!fs.existsSync(newsPath)) {
    fs.writeFileSync(newsPath, JSON.stringify(defaultNews, null, 2));
    console.log('Seeded fallback news database.');
  }
  if (!fs.existsSync(feedbackPath)) {
    fs.writeFileSync(feedbackPath, JSON.stringify([], null, 2));
    console.log('Initialized empty fallback feedback database.');
  }
};

// --- DATA ACCESS UTILITIES ---

const getJSONProducts = (filters = {}) => {
  initJSONDb();
  let list = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  if (filters.type) {
    list = list.filter(p => p.type === filters.type);
  }
  if (filters.format) {
    list = list.filter(p => p.format === filters.format);
  }

  return list;
};

const getJSONProductById = (id) => {
  initJSONDb();
  const list = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  return list.find(p => p._id === id);
};

const getJSONArticles = () => {
  initJSONDb();
  return JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
};

const getJSONNews = () => {
  initJSONDb();
  return JSON.parse(fs.readFileSync(newsPath, 'utf8'));
};

const saveJSONFeedback = (feedback) => {
  initJSONDb();
  const list = JSON.parse(fs.readFileSync(feedbackPath, 'utf8'));
  const newFeedback = {
    _id: 'fb-' + Date.now(),
    ...feedback,
    createdAt: new Date().toISOString()
  };
  list.push(newFeedback);
  fs.writeFileSync(feedbackPath, JSON.stringify(list, null, 2));
  return newFeedback;
};

module.exports = {
  initJSONDb,
  getJSONProducts,
  getJSONProductById,
  getJSONArticles,
  getJSONNews,
  saveJSONFeedback
};
