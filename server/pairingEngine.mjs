// Italian culinary pairing engine & organoleptic enrichment for WhatWine

export const FOOD_CATALOG = [
  {
    id: 4,
    slug: 'carne-rossa',
    label: 'Carni rosse e bistecche',
    category: 'Carne',
    dishes: ['Bistecca alla fiorentina', 'Tagliata di manzo', 'Filetto al pepe', 'Brasato al Barolo', 'Costata alla brace'],
    keywords: ['carne', 'carne rossa', 'bistecca', 'fiorentina', 'manzo', 'filetto', 'costata', 'tagliata', 'brasato', 'arrosto', 'hamburger', 'beef', 'steak'],
    preferredTypes: [1],
    rationale: 'I tannini strutturati legano le proteine della carne rossa, pulendo il palato dalla succulenza e dal grasso di marezzatura.',
  },
  {
    id: 5,
    slug: 'pasta',
    label: 'Pasta e primi piatti',
    category: 'Primi',
    dishes: ['Tagliatelle al ragù', 'Lasagne alla bolognese', 'Spaghetti alla carbonara', 'Amatriciana', 'Risotto allo zafferano'],
    keywords: ['pasta', 'spaghetti', 'tagliatelle', 'rigatoni', 'penne', 'lasagna', 'lasagne', 'ragù', 'ragu', 'bolognese', 'carbonara', 'amatriciana', 'cacio e pepe', 'risotto', 'gnocchi', 'ravioli', 'tortellini', 'primo'],
    preferredTypes: [1, 2, 3],
    rationale: 'La buona acidità bilancia i sughi di pomodoro, il burro o i formaggi mantecati, sostenendo la ricchezza del piatto senza appesantirlo.',
  },
  {
    id: 8,
    slug: 'agnello',
    label: 'Agnello e costolette',
    category: 'Carne',
    dishes: ['Costolette d’agnello alla brace', 'Abbacchio al forno', 'Arrosticini', 'Cosciotto alle erbe'],
    keywords: ['agnello', 'abbacchio', 'arrosticini', 'scottadito', 'pecora', 'lamb'],
    preferredTypes: [1],
    rationale: 'Spezie, erbe aromatiche e note balsamiche del vino esaltano la carne saporita e leggermente ferrosa dell’agnello.',
  },
  {
    id: 9,
    slug: 'vitello',
    label: 'Vitello e carni tenere',
    category: 'Carne',
    dishes: ['Ossobuco alla milanese', 'Saltimbocca alla romana', 'Vitello tonnato', 'Scaloppine al limone'],
    keywords: ['vitello', 'ossobuco', 'saltimbocca', 'cotoletta', 'scaloppine', 'vitello tonnato', 'veal'],
    preferredTypes: [1, 2, 4],
    rationale: 'La trama delicata del vitello richiede vini di medio corpo o bianchi strutturati che rispettino la finezza della preparazione.',
  },
  {
    id: 10,
    slug: 'maiale',
    label: 'Maiale, arrosti e costine',
    category: 'Carne',
    dishes: ['Porchetta arrosto', 'Costine glassate', 'Arista alle erbe', 'Salsiccia alla griglia'],
    keywords: ['maiale', 'porchetta', 'salsiccia', 'costine', 'arista', 'lonza', 'pork', 'stufato'],
    preferredTypes: [1, 4, 2],
    rationale: 'Freschezza e frutto succoso alleggeriscono la parte grassa del maiale e armonizzano le note caramellate della cottura.',
  },
  {
    id: 11,
    slug: 'selvaggina',
    label: 'Selvaggina e cacciagione',
    category: 'Carne',
    dishes: ['Pappardelle al cinghiale', 'Cervo ai mirtilli', 'Lepre in salmì', 'Capriolo al ginepro'],
    keywords: ['selvaggina', 'cinghiale', 'cervo', 'capriolo', 'lepre', 'fagiano', 'cacciagione', 'game', 'venison'],
    preferredTypes: [1],
    rationale: 'Vini di grande complessità, terziari e tannini maturi sostengono la profondità aromatica e la persistenza della cacciagione.',
  },
  {
    id: 12,
    slug: 'pesce-saporito',
    label: 'Pesce grasso (Salmone, Tonno)',
    category: 'Pesce',
    dishes: ['Salmone al forno', 'Tataki di tonno', 'Pesce spada alla griglia', 'Baccalà mantecato'],
    keywords: ['salmone', 'tonno', 'pesce spada', 'baccalà', 'baccala', 'pesce azzurro', 'sgombro', 'sardine', 'salmon', 'tuna'],
    preferredTypes: [2, 4, 3, 1],
    rationale: 'Bianchi strutturati, rosati gastronomici o rossi leggeri offrono sapidità e tensione acida per bilanciare gli oli naturali del pesce.',
  },
  {
    id: 13,
    slug: 'crostacei',
    label: 'Crostacei e frutti di mare',
    category: 'Pesce',
    dishes: ['Spaghetti alle vongole', 'Astice alla catalana', 'Ostriche', 'Scampi crudi', 'Impepata di cozze'],
    keywords: ['crostacei', 'gamberi', 'astice', 'aragosta', 'vongole', 'cozze', 'ostriche', 'scampi', 'frutti di mare', 'scoglio', 'crudo di mare', 'shellfish'],
    preferredTypes: [2, 3, 4],
    rationale: 'Bollicine fini o bianchi minerali amplificano la dolcezza marina dei crostacei lasciando il palato netto e salino.',
  },
  {
    id: 28,
    slug: 'pesce-magro',
    label: 'Pesce bianco e sushi',
    category: 'Pesce',
    dishes: ['Branzino al sale', 'Orata al forno', 'Sushi e sashimi', 'Sogliola alla mugnaia', 'Rombo alle erbe'],
    keywords: ['pesce', 'branzino', 'orata', 'sogliola', 'merluzzo', 'rombo', 'sushi', 'sashimi', 'tartare di pesce', 'fish', 'seafood'],
    preferredTypes: [2, 3],
    rationale: 'Profumi agrumati e acidità cristallina accompagnano le carni bianche e delicate del pesce senza sovrastarne la finezza.',
  },
  {
    id: 17,
    slug: 'formaggi-stagionati',
    label: 'Formaggi stagionati',
    category: 'Formaggi',
    dishes: ['Parmigiano Reggiano 36 mesi', 'Pecorino romano', 'Grana Padano', 'Comté invecchiato'],
    keywords: ['formaggi stagionati', 'parmigiano', 'pecorino', 'grana', 'stagionato', 'formaggio', 'formaggi', 'cheddar', 'cheese'],
    preferredTypes: [1, 2, 24],
    rationale: 'Struttura e morbidezza fruttata compensano la sapidità cristallina e l’umami dei formaggi a lunga maturazione.',
  },
  {
    id: 35,
    slug: 'formaggi-freschi',
    label: 'Formaggi freschi e cremosi',
    category: 'Formaggi',
    dishes: ['Burrata pugliese', 'Mozzarella di bufala', 'Brie e Camembert', 'Caprino alle erbe'],
    keywords: ['burrata', 'mozzarella', 'brie', 'camembert', 'ricotta', 'caprino', 'stracciatella', 'formaggi freschi'],
    preferredTypes: [2, 3, 4],
    rationale: 'Effervescenza o fresca acidità sgrassano la latticinità cremosa dei formaggi giovani rispettandone le note di latte.',
  },
  {
    id: 38,
    slug: 'formaggi-erborinati',
    label: 'Formaggi erborinati',
    category: 'Formaggi',
    dishes: ['Gorgonzola DOP', 'Roquefort con miele', 'Stilton', 'Blu di capra'],
    keywords: ['gorgonzola', 'roquefort', 'stilton', 'erborinati', 'erborinato', 'blu'],
    preferredTypes: [7, 24, 1],
    rationale: 'La dolcezza avvolgente di passiti, muffati o Porto crea un contrasto magistrale con la pungenza salina delle muffe nobili.',
  },
  {
    id: 41,
    slug: 'salumi',
    label: 'Salumi e taglieri',
    category: 'Antipasti',
    dishes: ['Prosciutto di Parma', 'Salame felino', 'Mortadella Bologna', 'Bresaola e rucola'],
    keywords: ['salumi', 'affettati', 'prosciutto', 'salame', 'mortadella', 'speck', 'bresaola', 'tagliere', 'culatello'],
    preferredTypes: [3, 1, 4],
    rationale: 'Acidità vivace e bollicine o tannini scattanti bilanciano la sapidità e la parte grassa dei salumi tradizionali.',
  },
  {
    id: 27,
    slug: 'antipasti-pizza',
    label: 'Pizza, focacce e antipasti',
    category: 'Antipasti',
    dishes: ['Pizza Margherita', 'Focaccia ligure', 'Supplì e arancini', 'Bruschette al pomodoro'],
    keywords: ['pizza', 'margherita', 'focaccia', 'antipasto', 'antipasti', 'fritto', 'supplì', 'arancini', 'bruschetta', 'bruschette', 'stuzzichini'],
    preferredTypes: [3, 4, 1, 2],
    rationale: 'Vini gastronomici agili, freschi e poco tannici accompagnano lievitati, pomodoro e fritture senza risultare invadenti.',
  },
  {
    id: 19,
    slug: 'verdure-funghi',
    label: 'Funghi, tartufo e verdure',
    category: 'Vegetariano',
    dishes: ['Risotto ai funghi porcini', 'Tajarin al tartufo bianco', 'Parmigiana di melanzane', 'Carciofi alla romana'],
    keywords: ['funghi', 'porcini', 'tartufo', 'verdure', 'melanzane', 'parmigiana', 'vegetariano', 'vegano', 'carciofi', 'zucchine', 'legumi', 'zuppa', 'insalata', 'caprese'],
    preferredTypes: [1, 2, 4],
    rationale: 'Sentori boschivi, mineralità ed eleganza terrosa entrano in risonanza con funghi, tartufo e preparazioni vegetali.',
  },
  {
    id: 20,
    slug: 'pollame',
    label: 'Pollame e carni bianche',
    category: 'Carne',
    dishes: ['Pollo arrosto al rosmarino', 'Petto d’anatra all’arancia', 'Coniglio alla cacciatora', 'Faraona al forno'],
    keywords: ['pollo', 'tacchino', 'anatra', 'faraona', 'coniglio', 'carne bianca', 'carni bianche', 'poultry'],
    preferredTypes: [1, 2, 4],
    rationale: 'Rossi di media struttura o bianchi di buona morbidezza seguono la succulenza delle carni bianche e le note aromatiche della pelle croccante.',
  },
  {
    id: 15,
    slug: 'speziato',
    label: 'Piatti speziati e cucina etnica',
    category: 'Etnico',
    dishes: ['Curry thailandese', 'Pollo tikka masala', 'Tacos speziati', 'Pasta con ’nduja'],
    keywords: ['speziato', 'piccante', 'curry', 'indiano', 'thai', 'messicano', 'nduja', 'diavola', 'peperoncino', 'etnico', 'spicy'],
    preferredTypes: [2, 4, 3],
    rationale: 'Un leggero residuo zuccherino, bassa tannicità e profumi floreali smorzano la piccantezza mantenendo il sorso fresco.',
  },
  {
    id: 40,
    slug: 'aperitivo',
    label: 'Aperitivo e crudi leggeri',
    category: 'Aperitivo',
    dishes: ['Aperitivo al tramonto', 'Tartine e canapè', 'Pinzimonio', 'Olive e mandorle tostate'],
    keywords: ['aperitivo', 'finger food', 'canapè', 'tapas', 'happy hour'],
    preferredTypes: [3, 4, 2],
    rationale: 'Perlage fine e profumi floreali aprono l’appetito preparando il palato alle portate successive.',
  },
  {
    id: 16,
    slug: 'dolci-cioccolato',
    label: 'Cioccolato e pasticceria ricca',
    category: 'Dolci',
    dishes: ['Torta al cioccolato fondente', 'Tiramisù classico', 'Cannoli siciliani', 'Pasticceria secca'],
    keywords: ['dolce', 'dolci', 'cioccolato', 'tiramisù', 'tiramisu', 'torta', 'cannolo', 'pasticceria', 'dessert', 'panettone', 'panna cotta'],
    preferredTypes: [7, 24],
    rationale: 'La regola d’oro dei dessert: il vino deve essere almeno dolce quanto il piatto, con freschezza o note tostate a sostegno.',
  },
  {
    id: 37,
    slug: 'dolci-frutta',
    label: 'Crostate e dolci alla frutta',
    category: 'Dolci',
    dishes: ['Crostata di albicocche', 'Torta di mele', 'Cheesecake ai frutti di bosco', 'Macedonia con crema'],
    keywords: ['crostata', 'frutta', 'torta di mele', 'fragole', 'frutti di bosco', 'cheesecake', 'macedonia', 'strudel'],
    preferredTypes: [7, 3],
    rationale: 'Bollicine dolci o vendemmie tardive fresche esaltano l’acidità naturale della frutta senza risultare stucchevoli.',
  },
];

export const FOOD_BY_ID = new Map(FOOD_CATALOG.map((f) => [f.id, f]));

export const COOKING_MODIFIERS = {
  griglia: {
    id: 'griglia',
    label: 'Alla brace / Griglia',
    boostTypes: [1],
    structureHint: { body: 4.2, tannins: 3.6, acidity: 3.4 },
    note: 'La cottura alla brace introduce note affumicate e maillard: premiati vini più strutturati e tannici.',
  },
  sugo: {
    id: 'sugo',
    label: 'Sugo ricco / Ragù',
    boostTypes: [1],
    structureHint: { body: 3.8, tannins: 3.2, acidity: 4.0 },
    note: 'I sughi saporiti e il pomodoro richiedono un’acidità spiccata e corpo medio-alto.',
  },
  cremoso: {
    id: 'cremoso',
    label: 'Cremoso / Formaggi',
    boostTypes: [2, 3],
    structureHint: { body: 3.2, tannins: 1.5, acidity: 4.2 },
    note: 'Le salse cremose o a base di formaggio si sposano con freschezza acida o effervescenza.',
  },
  delicato: {
    id: 'delicato',
    label: 'Delicato / Vapore / Crudo',
    boostTypes: [2, 3, 4],
    structureHint: { body: 2.3, tannins: 1.2, acidity: 4.0 },
    note: 'Le preparazioni leggere premiano vini eleganti, minerali e con tannini quasi assenti.',
  },
  speziato: {
    id: 'speziato',
    label: 'Speziato / Piccante',
    boostTypes: [2, 4, 3],
    structureHint: { body: 2.8, tannins: 1.5, acidity: 3.6, sweetness: 2.4 },
    note: 'Le spezie richiedono alcol moderato, pochi tannini e buona aromaticità o morbidezza.',
  },
};

export const WINE_TYPE_MAP = {
  1: { key: 'red', label: 'Rosso' },
  2: { key: 'white', label: 'Bianco' },
  3: { key: 'sparkling', label: 'Bollicine' },
  4: { key: 'rose', label: 'Rosato' },
  7: { key: 'dessert', label: 'Dolce & Passito' },
  24: { key: 'port', label: 'Porto & Fortificato' },
};

const FLAVOR_TRANSLATIONS = {
  blackberry: 'Mora',
  cassis: 'Ribes nero',
  blueberry: 'Mirtillo',
  'dark fruit': 'Frutti neri',
  cherry: 'Ciliegia',
  raspberry: 'Lampone',
  strawberry: 'Fragola',
  plum: 'Prugna',
  vanilla: 'Vaniglia',
  oak: 'Rovere',
  coffee: 'Caffè tostato',
  'dark chocolate': 'Cioccolato fondente',
  chocolate: 'Cioccolato',
  tobacco: 'Tabacco',
  leather: 'Cuoio',
  earthy: 'Sottobosco',
  mushroom: 'Funghi',
  truffle: 'Tartufo',
  pepper: 'Pepe nero',
  spice: 'Spezie dolci',
  cinnamon: 'Cannella',
  licorice: 'Liquirizia',
  lemon: 'Limone',
  lime: 'Lime',
  grapefruit: 'Pompelmo',
  apple: 'Mela verde',
  pear: 'Pera',
  peach: 'Pesca',
  apricot: 'Albicocca',
  pineapple: 'Ananas',
  tropical: 'Frutta tropicale',
  honey: 'Miele',
  butter: 'Burro',
  brioche: 'Crosta di pane',
  toast: 'Pan brioche',
  minerals: 'Mineralità',
  stone: 'Pietra focaia',
  saline: 'Salinità',
  floral: 'Fiori bianchi',
  rose: 'Petali di rosa',
  violet: 'Violetta',
  herbaceous: 'Erbe aromatiche',
  mint: 'Menta',
  eucalyptus: 'Eucalipto',
  caramel: 'Caramello',
  hazelnut: 'Nocciola',
  almond: 'Mandorla',
  fig: 'Fico secco',
  raisin: 'Uvetta',
};

const FLAVOR_GROUP_FALLBACK = {
  black_fruit: 'Frutti neri',
  red_fruit: 'Frutti rossi',
  tree_fruit: 'Mela e pera',
  citrus_fruit: 'Agrumi',
  tropical_fruit: 'Frutta tropicale',
  oak: 'Note boisé',
  spices: 'Spezie',
  earth: 'Sottobosco e mineralità',
  floral: 'Note floreali',
  yeast: 'Lieviti e panificazione',
  microbio: 'Burro e crema',
  dried_fruit: 'Frutta secca',
  non_oak: 'Tabacco e cacao',
  vegetal: 'Erbe aromatiche',
};

// Specific Italian composite dish rules before keyword scan
const COMPOSITE_DISH_RULES = [
  {
    match: ['pasta al ragu', 'pasta al ragù', 'tagliatelle al ragu', 'tagliatelle al ragù', 'bolognese', 'lasagna', 'lasagne'],
    foodIds: [5, 4],
    preferredTypes: [1],
    label: 'Pasta al ragù & Lasagne',
    sommelierNote: 'La succulenza del ragù di carne e la freschezza del pomodoro chiedono un rosso di buona acidità e tannino equilibrato (es. Sangiovese, Barbera, Nebbiolo).',
  },
  {
    match: ['vongole', 'cozze', 'scoglio', 'pescatora', 'crostacei', 'gamberi', 'astice', 'aragosta', 'scampi'],
    foodIds: [13, 5],
    preferredTypes: [2, 3],
    label: 'Pasta o piatti ai frutti di mare & crostacei',
    sommelierNote: 'La sapidità marina e l’olio extravergine richiedono bianchi minerali o bollicine metodo classico con acidità tesa e profumi agrumati.',
  },
  {
    match: ['carbonara', 'cacio e pepe', 'gricia'],
    foodIds: [5, 17],
    preferredTypes: [3, 2, 1],
    label: 'Carbonara / Cacio e Pepe',
    sommelierNote: 'La cremosità di tuorlo, pecorino e pepe nero si taglia alla perfezione con una bollicina secca, un bianco sapido strutturato o un rosso giovane e acido.',
  },
  {
    match: ['amatriciana'],
    foodIds: [5, 41],
    preferredTypes: [1, 4],
    label: 'Pasta all’Amatriciana',
    sommelierNote: 'Guanciale, pomodoro e pecorino trovano equilibrio in un rosso di medio corpo vivace nell’acidità o in un rosato strutturato.',
  },
  {
    match: ['pesto', 'trofie al pesto'],
    foodIds: [5, 19],
    preferredTypes: [2],
    label: 'Pasta al pesto',
    sommelierNote: 'Basilico, pinoli e aglio si esaltano con bianchi mediterranei freschi, floreali e sapidi come Vermentino o Pigato.',
  },
  {
    match: ['tartufo', 'porcini', 'risotto ai funghi', 'funghi'],
    foodIds: [19, 5],
    preferredTypes: [1, 2],
    label: 'Piatti ai funghi porcini o tartufo',
    sommelierNote: 'Le note terrose di sottobosco di funghi e tartufo dialogano con Nebbiolo, Pinot Nero, Barbaresco o grandi bianchi evoluti.',
  },
  {
    match: ['fiorentina', 'bistecca', 'costata', 'tagliata', 'brasato', 'manzo'],
    foodIds: [4, 8],
    preferredTypes: [1],
    label: 'Bistecca, tagliata & grandi carni rosse',
    sommelierNote: 'Carni succulente alla brace o a lunga cottura domandano rossi di grande struttura, tannino nobile e buona persistenza.',
  },
  {
    match: ['pizza', 'focaccia', 'margherita'],
    foodIds: [27, 35],
    preferredTypes: [3, 4, 1],
    label: 'Pizza & Lievitati',
    sommelierNote: 'L’acidità del pomodoro e la filante mozzarella si abbinano a bollicine fresche, rosati secchi o rossi leggeri e fruttati.',
  },
  {
    match: ['sushi', 'sashimi', 'tartare', 'crudo'],
    foodIds: [28, 13],
    preferredTypes: [2, 3, 4],
    label: 'Sushi, sashimi & crudi di mare',
    sommelierNote: 'La finezza del pesce crudo chiede bollicine extra brut o bianchi cristallini privi di legno invadente.',
  },
];

function normalizeText(str) {
  return String(str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function resolveDishQuery(dishText, modifierKey = '') {
  const norm = normalizeText(dishText);
  const modifier = COOKING_MODIFIERS[modifierKey] || null;

  let matchedFoodIds = [];
  let preferredTypes = [];
  let label = dishText ? dishText.trim() : '';
  let sommelierNote = '';

  if (norm) {
    // 1. Check composite Italian dish rules first
    for (const rule of COMPOSITE_DISH_RULES) {
      if (rule.match.some((m) => norm.includes(normalizeText(m)))) {
        matchedFoodIds.push(...rule.foodIds);
        preferredTypes.push(...rule.preferredTypes);
        label = rule.label;
        sommelierNote = rule.sommelierNote;
        break;
      }
    }

    // 2. Scan all food catalog keywords (supports combined dishes like "carne e pasta"!)
    const matchedCatalog = [];
    for (const food of FOOD_CATALOG) {
      const hit = food.keywords.some((kw) => {
        const nkw = normalizeText(kw);
        return norm.includes(nkw);
      });
      if (hit) {
        matchedCatalog.push(food);
      }
    }

    if (matchedCatalog.length > 0) {
      for (const f of matchedCatalog) {
        if (!matchedFoodIds.includes(f.id)) matchedFoodIds.push(f.id);
        for (const t of f.preferredTypes) {
          if (!preferredTypes.includes(t)) preferredTypes.push(t);
        }
      }
      if (!sommelierNote) {
        label = matchedCatalog.map((c) => c.label).slice(0, 2).join(' + ');
        sommelierNote = matchedCatalog[0].rationale;
      }
    }
  }

  // Fallback if user entered a freeform dish we don't have an exact keyword for
  if (matchedFoodIds.length === 0) {
    if (norm.includes('pesce') || norm.includes('mare')) {
      matchedFoodIds = [28, 13];
      preferredTypes = [2, 3];
      sommelierNote = 'Per piatti di mare, la freschezza acida e la mineralità sono essenziali.';
    } else if (norm.includes('dolc') || norm.includes('tort')) {
      matchedFoodIds = [16, 37];
      preferredTypes = [7, 24];
      sommelierNote = 'I dessert richiedono vini dolci di pari intensità aromatica.';
    } else {
      // General versatile gastronomic pairing
      matchedFoodIds = [5, 20, 4];
      preferredTypes = [1, 2, 3];
      sommelierNote = sommelierNote || 'Selezione gastronomica versatile equilibrata tra acidità, frutto e struttura.';
    }
  }

  if (modifier) {
    if (modifier.boostTypes.length > 0) {
      preferredTypes = [...new Set([...modifier.boostTypes, ...preferredTypes])];
    }
    sommelierNote = `${sommelierNote} ${modifier.note}`.trim();
  }

  return {
    foodIds: [...new Set(matchedFoodIds)].slice(0, 3),
    preferredTypes: [...new Set(preferredTypes)],
    label: label || 'Abbinamento gastronomico',
    sommelierNote,
    modifier,
  };
}

function inferStructure(typeId, styleName = '', region = '') {
  const s = `${styleName} ${region}`.toLowerCase();
  if (typeId === 1) {
    const heavy = /barolo|amarone|brunello|cabernet|syrah|shiraz|malbec|bordeaux|napa|ripasso|primitivo|sagrantino|bolgheri/.test(s);
    const light = /pinot noir|pinot nero|gamay|beaujolais|valpolicella|lambrusco|schiava|frappato/.test(s);
    return {
      body: heavy ? 4.4 : light ? 2.6 : 3.6,
      tannins: heavy ? 4.1 : light ? 2.1 : 3.2,
      acidity: /chianti|sangiovese|barbera|nebbiolo|barolo|pinot/.test(s) ? 4.0 : 3.2,
      sweetness: /amarone|primitivo|ripasso/.test(s) ? 2.0 : 1.3,
    };
  }
  if (typeId === 2) {
    const rich = /chardonnay|montrachet|meursault|viognier|oak|barrique|gewurz/.test(s);
    return {
      body: rich ? 3.7 : 2.5,
      tannins: 1.0,
      acidity: /sauvignon|riesling|verdicchio|soave|pinot grigio|chablis|albariño/.test(s) ? 4.3 : 3.5,
      sweetness: /riesling|gewurz|moscato/.test(s) ? 2.4 : 1.4,
    };
  }
  if (typeId === 3) {
    return {
      body: /krug|vintage|franciacorta|champagne/.test(s) ? 3.1 : 2.2,
      tannins: 1.0,
      acidity: 4.5,
      sweetness: /brut nature|pas dosé|extra brut/.test(s) ? 1.1 : /prosecco|extra dry/.test(s) ? 2.1 : 1.5,
    };
  }
  if (typeId === 4) {
    return { body: 2.4, tannins: 1.4, acidity: 3.8, sweetness: 1.6 };
  }
  if (typeId === 7 || typeId === 24) {
    return { body: 4.3, tannins: typeId === 24 ? 2.6 : 1.2, acidity: 3.2, sweetness: 4.7 };
  }
  return { body: 3.2, tannins: 2.4, acidity: 3.4, sweetness: 1.6 };
}

function inferFoodIdsByType(typeId, styleName = '', structure) {
  const s = styleName.toLowerCase();
  if (typeId === 1) {
    if (structure.body >= 3.9 || /barolo|cabernet|bordeaux|amarone|syrah|malbec/.test(s)) {
      return [4, 8, 11, 17, 5];
    }
    return [5, 20, 10, 41, 19];
  }
  if (typeId === 2) {
    if (structure.body >= 3.4) return [12, 20, 5, 35, 19];
    return [28, 13, 35, 19, 40];
  }
  if (typeId === 3) return [40, 13, 27, 41, 35];
  if (typeId === 4) return [27, 41, 12, 20, 35];
  if (typeId === 7) return [16, 37, 38];
  if (typeId === 24) return [16, 38, 17];
  return [5, 17, 27];
}

function computeServing(typeId, structure) {
  if (typeId === 1) {
    const heavy = structure.body >= 3.9 || structure.tannins >= 3.6;
    return {
      tempRange: heavy ? '16–18 °C' : '14–16 °C',
      glassType: heavy ? 'Calice ampio Ballon / Bordeaux' : 'Calice Borgogna medio',
      decanting: heavy ? '45–60 minuti in decanter' : '15–20 minuti in calice',
      agingPotential: heavy ? '8–20 anni in cantina' : '3–8 anni',
    };
  }
  if (typeId === 2) {
    const rich = structure.body >= 3.4;
    return {
      tempRange: rich ? '10–12 °C' : '8–10 °C',
      glassType: rich ? 'Calice bianco strutturato' : 'Tulipano per bianchi freschi',
      decanting: rich ? '15 min per aprire gli aromi' : 'Servire subito fresco',
      agingPotential: rich ? '4–10 anni' : '1–4 anni',
    };
  }
  if (typeId === 3) {
    return {
      tempRange: '6–8 °C',
      glassType: 'Flûte a tulipano (non troppo stretta)',
      decanting: 'Non decantare',
      agingPotential: '2–10 anni (millesimati)',
    };
  }
  if (typeId === 4) {
    return {
      tempRange: '8–11 °C',
      glassType: 'Calice medio per rosati e bianchi',
      decanting: 'Non necessario',
      agingPotential: '1–3 anni',
    };
  }
  if (typeId === 7 || typeId === 24) {
    return {
      tempRange: typeId === 24 ? '14–16 °C' : '10–12 °C',
      glassType: 'Calice piccolo da meditazione / passito',
      decanting: typeId === 24 ? '30 minuti per Vintage Port' : 'Non necessario',
      agingPotential: '10–40 anni',
    };
  }
  return {
    tempRange: '12–14 °C',
    glassType: 'Calice universale da degustazione',
    decanting: '15 minuti',
    agingPotential: '3–6 anni',
  };
}

function defaultFlavorNotes(typeId, structure) {
  if (typeId === 1) {
    return structure.body >= 3.8
      ? ['Mora e amarena', 'Spezie scure', 'Note boisé', 'Tabacco']
      : ['Ciliegia fresca', 'Lampone', 'Violetta', 'Pepe leggero'];
  }
  if (typeId === 2) {
    return structure.body >= 3.4
      ? ['Pesca matura', 'Agrumi canditi', 'Mandorla', 'Leggera vaniglia']
      : ['Limone e pompelmo', 'Mela verde', 'Fiori bianchi', 'Mineralità'];
  }
  if (typeId === 3) return ['Crosta di pane', 'Agrumi', 'Mela golden', 'Fiori d’acacia'];
  if (typeId === 4) return ['Fragolina di bosco', 'Melograno', 'Pompelmo rosa', 'Petali di rosa'];
  if (typeId === 7 || typeId === 24) return ['Miele d’acacia', 'Albicocca secca', 'Fico caramellato', 'Spezie dolci'];
  return ['Frutta matura', 'Erbe mediterranee', 'Mineralità'];
}

export function enrichWine(raw, dishContext = null) {
  const typeId = raw.typeId || 1;
  const typeInfo = WINE_TYPE_MAP[typeId] || WINE_TYPE_MAP[1];
  const fallbackStruct = inferStructure(typeId, raw.styleName || raw.name, raw.region);

  const rawStruct = raw.rawStructure || {};
  const structure = {
    body: Number((rawStruct.intensity || fallbackStruct.body).toFixed(1)),
    tannins: Number((typeId === 1 || typeId === 24 ? rawStruct.tannin || fallbackStruct.tannins : fallbackStruct.tannins).toFixed(1)),
    acidity: Number((rawStruct.acidity || fallbackStruct.acidity).toFixed(1)),
    sweetness: Number((rawStruct.sweetness || fallbackStruct.sweetness).toFixed(1)),
  };

  // Flavor notes
  let flavorNotes = [];
  if (Array.isArray(raw.rawFlavors) && raw.rawFlavors.length > 0) {
    for (const grp of raw.rawFlavors.slice(0, 4)) {
      const kw = grp.primary_keywords?.[0]?.name?.toLowerCase();
      const translated = (kw && FLAVOR_TRANSLATIONS[kw]) || FLAVOR_GROUP_FALLBACK[grp.group];
      if (translated && !flavorNotes.includes(translated)) {
        flavorNotes.push(translated);
      }
    }
  }
  if (flavorNotes.length === 0) {
    flavorNotes = defaultFlavorNotes(typeId, structure);
  }

  // Food pairings
  const foodIds = Array.isArray(raw.rawFoodIds) && raw.rawFoodIds.length > 0
    ? raw.rawFoodIds
    : inferFoodIdsByType(typeId, raw.styleName || raw.name, structure);

  const pairings = foodIds
    .map((fid, idx) => {
      const f = FOOD_BY_ID.get(fid);
      if (!f) return null;
      return {
        id: f.id,
        slug: f.slug,
        label: f.label,
        category: f.category,
        dishes: f.dishes,
        rationale: f.rationale,
        matchScore: Math.max(82, 97 - idx * 4),
      };
    })
    .filter(Boolean);

  // Reverse dish match scoring
  let dishMatch = null;
  if (dishContext) {
    const overlap = dishContext.foodIds.filter((fid) => foodIds.includes(fid));
    const typeHit = dishContext.preferredTypes.includes(typeId);
    let score = 76;
    if (overlap.length > 0) score += 12 + Math.min(6, overlap.length * 3);
    if (typeHit) score += 6;
    if (raw.rating >= 4.2) score += 2;
    if (dishContext.modifier?.structureHint) {
      const h = dishContext.modifier.structureHint;
      const diff = Math.abs(structure.body - h.body) + Math.abs(structure.acidity - h.acidity);
      if (diff < 1.6) score += 3;
    }
    score = Math.min(99, Math.round(score));

    const matchedLabels = overlap.map((fid) => FOOD_BY_ID.get(fid)?.label).filter(Boolean);
    dishMatch = {
      score,
      rationale: dishContext.sommelierNote,
      matchedTags: matchedLabels.length > 0 ? matchedLabels : pairings.slice(0, 2).map((p) => p.label),
    };
  }

  const serving = computeServing(typeId, structure);

  return {
    id: String(raw.id),
    name: raw.name,
    winery: raw.winery || 'Produttore Selezionato',
    vintage: raw.vintage || null,
    typeId,
    type: typeInfo.key,
    typeLabel: typeInfo.label,
    region: raw.region || '',
    country: raw.country || '',
    countryCode: raw.countryCode || '',
    grapes: raw.grapes || [],
    rating: Number((raw.rating || 4.0).toFixed(1)),
    reviewsCount: raw.reviewsCount || 0,
    priceEur: raw.priceEur || null,
    imageUrl: raw.imageUrl || null,
    styleName: raw.styleName || `${typeInfo.label} ${raw.region || ''}`.trim(),
    styleDescription: raw.styleDescription || '',
    structure,
    flavorNotes,
    pairings,
    serving,
    dishMatch,
    source: raw.source || 'vivino',
  };
}
