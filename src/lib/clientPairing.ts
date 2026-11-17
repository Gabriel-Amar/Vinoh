import type {
  DinnerCourseResult,
  FoodPairing,
  MetaResponse,
  ReversePairingResponse,
  Wine,
  WineServing,
  WineStructure,
  WineTypeKey,
  WinesPageResponse,
} from '../types';

export interface RawSeedWine {
  id: string;
  name: string;
  winery: string;
  vintage: number | null;
  typeId: number;
  region: string;
  country: string;
  countryCode: string;
  grapes: string[];
  rating: number;
  reviewsCount: number;
  priceEur: number | null;
  imageUrl: string | null;
  styleName: string;
  styleDescription: string;
  rawStructure?: {
    intensity?: number | null;
    tannin?: number | null;
    acidity?: number | null;
    sweetness?: number | null;
  } | null;
  rawFlavors?: Array<{ group?: string; primary_keywords?: Array<{ name?: string }> }> | null;
  rawFoodIds?: number[];
  source?: string;
}

interface FoodCatalogItem {
  id: number;
  slug: string;
  label: string;
  category: string;
  dishes: string[];
  keywords: string[];
  preferredTypes: number[];
  rationale: string;
}

export const CLIENT_FOOD_CATALOG: FoodCatalogItem[] = [
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

const FOOD_BY_ID = new Map(CLIENT_FOOD_CATALOG.map((f) => [f.id, f]));

const MODIFIERS: Record<string, { id: string; label: string; boostTypes: number[]; note: string }> = {
  griglia: {
    id: 'griglia',
    label: 'Alla brace / Griglia',
    boostTypes: [1],
    note: 'La cottura alla brace introduce note affumicate: premiati vini più strutturati e tannici.',
  },
  sugo: {
    id: 'sugo',
    label: 'Sugo ricco / Ragù',
    boostTypes: [1],
    note: 'I sughi saporiti e il pomodoro richiedono un’acidità spiccata e corpo medio-alto.',
  },
  cremoso: {
    id: 'cremoso',
    label: 'Cremoso / Formaggi',
    boostTypes: [2, 3],
    note: 'Le salse cremose o a base di formaggio si sposano con freschezza acida o effervescenza.',
  },
  delicato: {
    id: 'delicato',
    label: 'Delicato / Vapore / Crudo',
    boostTypes: [2, 3, 4],
    note: 'Le preparazioni leggere premiano vini eleganti, minerali e con tannini quasi assenti.',
  },
  speziato: {
    id: 'speziato',
    label: 'Speziato / Piccante',
    boostTypes: [2, 4, 3],
    note: 'Le spezie richiedono alcol moderato, pochi tannini e buona aromaticità o morbidezza.',
  },
};

const WINE_TYPES: Record<number, { key: WineTypeKey; label: string }> = {
  1: { key: 'red', label: 'Rosso' },
  2: { key: 'white', label: 'Bianco' },
  3: { key: 'sparkling', label: 'Bollicine' },
  4: { key: 'rose', label: 'Rosato' },
  7: { key: 'dessert', label: 'Dolce & Passito' },
  24: { key: 'port', label: 'Porto & Fortificato' },
};

const TYPE_KEY_TO_ID: Record<string, number> = {
  red: 1,
  white: 2,
  sparkling: 3,
  rose: 4,
  dessert: 7,
  port: 24,
};

const COUNTRY_NAME_IT: Record<string, string> = {
  Italy: 'Italia',
  France: 'Francia',
  Spain: 'Spagna',
  'United States': 'Stati Uniti',
  Argentina: 'Argentina',
  Chile: 'Cile',
  Germany: 'Germania',
  Portugal: 'Portogallo',
  Australia: 'Australia',
  'New Zealand': 'Nuova Zelanda',
  'South Africa': 'Sudafrica',
  Austria: 'Austria',
  Hungary: 'Ungheria',
};

const COUNTRY_CODE_MAP: Record<string, string> = {
  Italia: 'it',
  Francia: 'fr',
  Spagna: 'es',
  'Stati Uniti': 'us',
  Portogallo: 'pt',
  Argentina: 'ar',
  Cile: 'cl',
  Germania: 'de',
  Australia: 'au',
  'Nuova Zelanda': 'nz',
};

const FLAVOR_TRANSLATIONS: Record<string, string> = {
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
  lemon: 'Limone',
  apple: 'Mela verde',
  pear: 'Pera',
  peach: 'Pesca',
  honey: 'Miele',
  butter: 'Burro',
  brioche: 'Crosta di pane',
  minerals: 'Mineralità',
  floral: 'Fiori bianchi',
};

const FLAVOR_GROUP_FALLBACK: Record<string, string> = {
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
};

const COMPOSITE_RULES = [
  {
    match: ['pasta al ragu', 'pasta al ragù', 'tagliatelle al ragu', 'bolognese', 'lasagna', 'lasagne'],
    foodIds: [5, 4],
    preferredTypes: [1],
    label: 'Pasta al ragù & Lasagne',
    sommelierNote: 'La succulenza del ragù di carne e la freschezza del pomodoro chiedono un rosso di buona acidità e tannino equilibrato (es. Sangiovese, Barbera, Nebbiolo).',
  },
  {
    match: ['vongole', 'cozze', 'scoglio', 'crostacei', 'gamberi', 'astice', 'aragosta', 'scampi'],
    foodIds: [13, 5],
    preferredTypes: [2, 3],
    label: 'Pasta o piatti ai frutti di mare & crostacei',
    sommelierNote: 'La sapidità marina e l’olio extravergine richiedono bianchi minerali o bollicine metodo classico con acidità tesa.',
  },
  {
    match: ['carbonara', 'cacio e pepe', 'gricia'],
    foodIds: [5, 17],
    preferredTypes: [3, 2, 1],
    label: 'Carbonara / Cacio e Pepe',
    sommelierNote: 'La cremosità di tuorlo, pecorino e pepe nero si taglia alla perfezione con una bollicina secca, un bianco sapido strutturato o un rosso giovane.',
  },
  {
    match: ['tartufo', 'porcini', 'funghi'],
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
    sommelierNote: 'L’acidità del pomodoro e la filante mozzarella si abbinano a bollicine fresche, rosati secchi o rossi leggeri.',
  },
];

function normalizeText(s: string): string {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function inferStructure(typeId: number, styleName = '', region = ''): WineStructure {
  const s = `${styleName} ${region}`.toLowerCase();
  if (typeId === 1) {
    const heavy = /barolo|amarone|brunello|cabernet|syrah|malbec|bordeaux|napa|ripasso|primitivo/.test(s);
    const light = /pinot noir|pinot nero|gamay|beaujolais|valpolicella|lambrusco/.test(s);
    return {
      body: heavy ? 4.4 : light ? 2.6 : 3.6,
      tannins: heavy ? 4.1 : light ? 2.1 : 3.2,
      acidity: /chianti|sangiovese|barbera|nebbiolo|barolo|pinot/.test(s) ? 4.0 : 3.2,
      sweetness: /amarone|primitivo|ripasso/.test(s) ? 2.0 : 1.3,
    };
  }
  if (typeId === 2) {
    const rich = /chardonnay|montrachet|meursault|viognier|oak/.test(s);
    return {
      body: rich ? 3.7 : 2.5,
      tannins: 1.0,
      acidity: /sauvignon|riesling|verdicchio|soave|chablis/.test(s) ? 4.3 : 3.5,
      sweetness: /riesling|gewurz|moscato/.test(s) ? 2.4 : 1.4,
    };
  }
  if (typeId === 3) return { body: 2.8, tannins: 1.0, acidity: 4.5, sweetness: 1.5 };
  if (typeId === 4) return { body: 2.4, tannins: 1.4, acidity: 3.8, sweetness: 1.6 };
  if (typeId === 7 || typeId === 24) return { body: 4.3, tannins: typeId === 24 ? 2.6 : 1.2, acidity: 3.2, sweetness: 4.7 };
  return { body: 3.2, tannins: 2.4, acidity: 3.4, sweetness: 1.6 };
}

function inferFoodIds(typeId: number, styleName: string, structure: WineStructure): number[] {
  const s = styleName.toLowerCase();
  if (typeId === 1) {
    if (structure.body >= 3.9 || /barolo|cabernet|bordeaux|amarone|syrah|malbec/.test(s)) return [4, 8, 11, 17, 5];
    return [5, 20, 10, 41, 19];
  }
  if (typeId === 2) return structure.body >= 3.4 ? [12, 20, 5, 35, 19] : [28, 13, 35, 19, 40];
  if (typeId === 3) return [40, 13, 27, 41, 35];
  if (typeId === 4) return [27, 41, 12, 20, 35];
  if (typeId === 7) return [16, 37, 38];
  if (typeId === 24) return [16, 38, 17];
  return [5, 17, 27];
}

function computeServing(typeId: number, structure: WineStructure): WineServing {
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
    return { tempRange: '6–8 °C', glassType: 'Flûte a tulipano', decanting: 'Non decantare', agingPotential: '2–10 anni' };
  }
  if (typeId === 4) {
    return { tempRange: '8–11 °C', glassType: 'Calice medio per rosati', decanting: 'Non necessario', agingPotential: '1–3 anni' };
  }
  return {
    tempRange: typeId === 24 ? '14–16 °C' : '10–12 °C',
    glassType: 'Calice piccolo da meditazione',
    decanting: typeId === 24 ? '30 minuti per Vintage Port' : 'Non necessario',
    agingPotential: '10–40 anni',
  };
}

function enrichRawWine(
  raw: RawSeedWine,
  dishCtx?: { foodIds: number[]; preferredTypes: number[]; sommelierNote: string }
): Wine {
  const typeId = raw.typeId || 1;
  const typeInfo = WINE_TYPES[typeId] || WINE_TYPES[1];
  const fallback = inferStructure(typeId, raw.styleName || raw.name, raw.region);
  const rs = raw.rawStructure || {};

  const structure: WineStructure = {
    body: Number((rs.intensity || fallback.body).toFixed(1)),
    tannins: Number((typeId === 1 || typeId === 24 ? rs.tannin || fallback.tannins : fallback.tannins).toFixed(1)),
    acidity: Number((rs.acidity || fallback.acidity).toFixed(1)),
    sweetness: Number((rs.sweetness || fallback.sweetness).toFixed(1)),
  };

  const flavorNotes: string[] = [];
  for (const grp of raw.rawFlavors || []) {
    const kw = grp.primary_keywords?.[0]?.name?.toLowerCase();
    const tr = (kw && FLAVOR_TRANSLATIONS[kw]) || (grp.group && FLAVOR_GROUP_FALLBACK[grp.group]);
    if (tr && !flavorNotes.includes(tr)) flavorNotes.push(tr);
  }
  if (flavorNotes.length === 0) {
    flavorNotes.push(
      typeId === 1 ? 'Frutti rossi e spezie' : typeId === 2 ? 'Agrumi e fiori bianchi' : typeId === 3 ? 'Crosta di pane e mela' : 'Frutta matura'
    );
  }

  const foodIds = raw.rawFoodIds?.length ? raw.rawFoodIds : inferFoodIds(typeId, raw.styleName || raw.name, structure);
  const pairings: FoodPairing[] = foodIds
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
    .filter((x): x is FoodPairing => Boolean(x));

  let dishMatch: Wine['dishMatch'] = null;
  if (dishCtx) {
    const overlap = dishCtx.foodIds.filter((fid) => foodIds.includes(fid));
    const typeHit = dishCtx.preferredTypes.includes(typeId);
    let score = 76 + (overlap.length > 0 ? 12 + Math.min(6, overlap.length * 3) : 0) + (typeHit ? 6 : 0) + (raw.rating >= 4.2 ? 2 : 0);
    score = Math.min(99, Math.round(score));
    dishMatch = {
      score,
      rationale: dishCtx.sommelierNote,
      matchedTags: overlap.map((fid) => FOOD_BY_ID.get(fid)?.label || '').filter(Boolean),
    };
  }

  return {
    id: raw.id,
    name: raw.name,
    winery: raw.winery || 'Produttore Selezionato',
    vintage: raw.vintage,
    typeId,
    type: typeInfo.key,
    typeLabel: typeInfo.label,
    region: raw.region,
    country: raw.country,
    countryCode: raw.countryCode || COUNTRY_CODE_MAP[raw.country] || '',
    grapes: raw.grapes || [],
    rating: Number((raw.rating || 4.0).toFixed(1)),
    reviewsCount: raw.reviewsCount || 0,
    priceEur: raw.priceEur,
    imageUrl: raw.imageUrl,
    styleName: raw.styleName || `${typeInfo.label} ${raw.region || ''}`.trim(),
    styleDescription: raw.styleDescription || '',
    structure,
    flavorNotes,
    pairings,
    serving: computeServing(typeId, structure),
    dishMatch,
    source: raw.source || 'seed+sampleapis',
  };
}

let catalogPromise: Promise<RawSeedWine[]> | null = null;

async function getClientCatalog(): Promise<RawSeedWine[]> {
  if (catalogPromise) return catalogPromise;
  catalogPromise = (async () => {
    const collected: RawSeedWine[] = [];
    const seen = new Set<string>();

    // 1. Load pre-indexed Vivino seed dataset
    try {
      const res = await fetch('./data/vivino-seed.json');
      if (res.ok) {
        const seed: RawSeedWine[] = await res.json();
        for (const w of seed) {
          if (!seen.has(w.id)) {
            seen.add(w.id);
            collected.push(w);
          }
        }
      }
    } catch {
      // Ignore seed load error
    }

    // 2. Fetch live SampleAPIs (3,455 wines with CORS *)
    const sampleCats: Array<[string, number]> = [
      ['reds', 1],
      ['whites', 2],
      ['sparkling', 3],
      ['rose', 4],
      ['dessert', 7],
      ['port', 24],
    ];

    const results = await Promise.allSettled(
      sampleCats.map(async ([cat, typeId]) => {
        const res = await fetch(`https://api.sampleapis.com/wines/${cat}`);
        if (!res.ok) return [] as RawSeedWine[];
        const arr = (await res.json()) as Array<{
          id: number;
          wine?: string;
          winery?: string;
          location?: string;
          image?: string;
          rating?: { average?: string; reviews?: string };
        }>;
        return arr.map((item) => {
          const locParts = String(item.location || '').split('\n·\n');
          const rawCountry = locParts[0]?.trim() || '';
          const country = COUNTRY_NAME_IT[rawCountry] || rawCountry;
          const region = locParts[1]?.trim() || '';
          const ym = String(item.wine || '').match(/\b(18\d{2}|19\d{2}|20[0-2]\d)\b/);
          const rm = String(item.rating?.reviews || '').match(/\d+/);
          return {
            id: `smp-${cat}-${item.id}`,
            name: item.wine || 'Vino',
            winery: item.winery || '',
            vintage: ym ? Number(ym[1]) : null,
            typeId,
            region,
            country,
            countryCode: COUNTRY_CODE_MAP[country] || '',
            grapes: [],
            rating: Number(item.rating?.average || 4.1),
            reviewsCount: rm ? Number(rm[0]) : 45,
            priceEur: null,
            imageUrl: item.image || null,
            styleName: '',
            styleDescription: '',
            source: 'sampleapis-live',
          } satisfies RawSeedWine;
        });
      })
    );

    for (const r of results) {
      if (r.status === 'fulfilled') {
        for (const w of r.value) {
          if (!seen.has(w.id)) {
            seen.add(w.id);
            collected.push(w);
          }
        }
      }
    }

    return collected;
  })();
  return catalogPromise;
}

export function getClientMeta(): MetaResponse {
  return {
    foods: CLIENT_FOOD_CATALOG.map(({ id, slug, label, category, dishes }) => ({
      id,
      slug,
      label,
      category,
      dishes,
    })),
    modifiers: Object.values(MODIFIERS).map(({ id, label, note }) => ({ id, label, note })),
    countries: [
      { code: 'it', label: 'Italia' },
      { code: 'fr', label: 'Francia' },
      { code: 'es', label: 'Spagna' },
      { code: 'us', label: 'Stati Uniti' },
      { code: 'pt', label: 'Portogallo' },
      { code: 'ar', label: 'Argentina' },
      { code: 'cl', label: 'Cile' },
      { code: 'de', label: 'Germania' },
      { code: 'au', label: 'Australia' },
      { code: 'nz', label: 'Nuova Zelanda' },
    ],
    types: [
      { id: 'red', typeId: 1, label: 'Rosso' },
      { id: 'white', typeId: 2, label: 'Bianco' },
      { id: 'sparkling', typeId: 3, label: 'Bollicine' },
      { id: 'rose', typeId: 4, label: 'Rosato' },
      { id: 'dessert', typeId: 7, label: 'Dolce & Passito' },
      { id: 'port', typeId: 24, label: 'Porto & Fortificato' },
    ],
  };
}

export async function queryClientWines(params: {
  page?: number;
  q?: string;
  type?: string[];
  foodId?: number | null;
  country?: string[];
  minRating?: number | null;
  priceMin?: number | null;
  priceMax?: number | null;
  orderBy?: string;
  order?: string;
}): Promise<WinesPageResponse> {
  const all = await getClientCatalog();
  const typeIds = (params.type || []).map((t) => TYPE_KEY_TO_ID[t] || Number(t)).filter(Boolean);
  const countries = (params.country || []).map((c) => c.toLowerCase());
  const normQ = normalizeText(params.q || '');
  const terms = normQ.split(/\s+/).filter(Boolean);

  const enriched = all
    .filter((w) => {
      if (typeIds.length && !typeIds.includes(w.typeId)) return false;
      if (params.minRating && w.rating < params.minRating) return false;
      const cc = (w.countryCode || COUNTRY_CODE_MAP[w.country] || '').toLowerCase();
      if (countries.length && !countries.includes(cc)) return false;
      if (params.priceMin && (!w.priceEur || w.priceEur < params.priceMin)) return false;
      if (params.priceMax && (!w.priceEur || w.priceEur > params.priceMax)) return false;
      if (terms.length) {
        const hay = normalizeText(`${w.name} ${w.winery} ${w.region} ${w.country} ${w.styleName} ${w.grapes.join(' ')}`);
        if (!terms.every((t) => hay.includes(t))) return false;
      }
      return true;
    })
    .map((w) => enrichRawWine(w))
    .filter((w) => {
      if (params.foodId) {
        return w.pairings.some((p) => p.id === params.foodId);
      }
      return true;
    });

  const orderBy = params.orderBy || 'ratings_count';
  const dir = params.order === 'asc' ? 1 : -1;
  enriched.sort((a, b) => {
    if (orderBy === 'ratings_average') return (a.rating - b.rating) * dir;
    if (orderBy === 'price') return ((a.priceEur ?? 9999) - (b.priceEur ?? 9999)) * dir;
    return (a.reviewsCount - b.reviewsCount) * dir;
  });

  const page = Math.max(1, params.page || 1);
  const pageSize = 24;
  const start = (page - 1) * pageSize;
  const slice = enriched.slice(start, start + pageSize);

  return {
    wines: slice,
    page,
    totalMatches: enriched.length,
    hasMore: start + pageSize < enriched.length,
    source: 'static+sampleapis',
  };
}

function resolveClientDish(dishText: string, modifierKey = '') {
  const norm = normalizeText(dishText);
  const mod = MODIFIERS[modifierKey] || null;
  const foodIds: number[] = [];
  let preferredTypes: number[] = [];
  let label = dishText.trim();
  let sommelierNote = '';

  if (norm) {
    for (const r of COMPOSITE_RULES) {
      if (r.match.some((m) => norm.includes(normalizeText(m)))) {
        foodIds.push(...r.foodIds);
        preferredTypes.push(...r.preferredTypes);
        label = r.label;
        sommelierNote = r.sommelierNote;
        break;
      }
    }
    const hits = CLIENT_FOOD_CATALOG.filter((f) => f.keywords.some((kw) => norm.includes(normalizeText(kw))));
    for (const h of hits) {
      if (!foodIds.includes(h.id)) foodIds.push(h.id);
      for (const t of h.preferredTypes) {
        if (!preferredTypes.includes(t)) preferredTypes.push(t);
      }
    }
    if (!sommelierNote && hits.length > 0) {
      label = hits.slice(0, 2).map((h) => h.label).join(' + ');
      sommelierNote = hits[0].rationale;
    }
  }

  if (foodIds.length === 0) {
    foodIds.push(5, 20, 4);
    preferredTypes = [1, 2, 3];
    sommelierNote = 'Selezione gastronomica versatile equilibrata tra acidità, frutto e struttura.';
  }
  if (mod) {
    preferredTypes = [...new Set([...mod.boostTypes, ...preferredTypes])];
    sommelierNote = `${sommelierNote} ${mod.note}`.trim();
  }
  return {
    foodIds: [...new Set(foodIds)].slice(0, 3),
    preferredTypes: [...new Set(preferredTypes)],
    label: label || 'Abbinamento gastronomico',
    sommelierNote,
    modifier: mod?.label || null,
  };
}

export async function queryClientReversePairings(params: {
  dish?: string;
  foodId?: number | null;
  modifier?: string;
  page?: number;
  country?: string[];
}): Promise<ReversePairingResponse> {
  const all = await getClientCatalog();
  let ctx = resolveClientDish(params.dish || '', params.modifier || '');
  if (params.foodId && !params.dish) {
    const f = FOOD_BY_ID.get(params.foodId);
    const mod = params.modifier ? MODIFIERS[params.modifier] : null;
    ctx = {
      foodIds: [params.foodId],
      preferredTypes: mod?.boostTypes?.length ? mod.boostTypes : f?.preferredTypes || [1, 2],
      label: f?.label || 'Abbinamento selezionato',
      sommelierNote: `${f?.rationale || ''} ${mod?.note || ''}`.trim(),
      modifier: mod?.label || null,
    };
  }

  const countries = (params.country || []).map((c) => c.toLowerCase());
  const matches = all
    .filter((w) => {
      if (!ctx.preferredTypes.includes(w.typeId)) return false;
      const cc = (w.countryCode || COUNTRY_CODE_MAP[w.country] || '').toLowerCase();
      if (countries.length && !countries.includes(cc)) return false;
      return true;
    })
    .map((w) => enrichRawWine(w, ctx))
    .sort((a, b) => (b.dishMatch?.score || 0) * 10 + b.rating - ((a.dishMatch?.score || 0) * 10 + a.rating));

  const page = Math.max(1, params.page || 1);
  const pageSize = 24;
  const start = (page - 1) * pageSize;

  return {
    context: ctx,
    wines: matches.slice(start, start + pageSize),
    page,
    totalMatches: matches.length,
    hasMore: start + pageSize < matches.length,
  };
}

export async function buildClientDinnerFlight(
  courses: { slot: string; dish: string }[]
): Promise<{ flight: DinnerCourseResult[] }> {
  const valid = courses.filter((c) => c.dish && c.dish.trim());
  const usedIds = new Set<string>();
  const flight: DinnerCourseResult[] = [];
  for (const c of valid) {
    const res = await queryClientReversePairings({ dish: c.dish, page: 1 });
    const topWine = res.wines.find((w) => !usedIds.has(w.id)) || res.wines[0] || null;
    if (topWine) usedIds.add(topWine.id);
    flight.push({
      slot: c.slot,
      dish: c.dish,
      context: res.context,
      recommendedWine: topWine,
      alternatives: res.wines.filter((w) => w.id !== topWine?.id).slice(0, 3),
    });
  }
  return { flight };
}
