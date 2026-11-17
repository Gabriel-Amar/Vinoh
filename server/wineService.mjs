import { enrichWine, FOOD_CATALOG, COOKING_MODIFIERS, resolveDishQuery } from './pairingEngine.mjs';

const VIVINO_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
  Accept: 'application/json',
};

const TYPE_KEY_TO_ID = {
  red: 1,
  white: 2,
  sparkling: 3,
  rose: 4,
  dessert: 7,
  port: 24,
};

const SAMPLE_CAT_TO_TYPE = {
  reds: 1,
  whites: 2,
  sparkling: 3,
  rose: 4,
  dessert: 7,
  port: 24,
};

const COUNTRY_NAME_IT = {
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
  Greece: 'Grecia',
};

// Map common Italian/wine search terms to live Vivino filters so text search also streams infinite results
const QUERY_TO_VIVINO_HINTS = [
  { terms: ['barolo', 'barbaresco', 'nebbiolo', 'piemonte'], country: 'it', typeId: 1, grapeId: 10 },
  { terms: ['chianti', 'brunello', 'sangiovese', 'toscana', 'bolgheri', 'sassicaia'], country: 'it', typeId: 1 },
  { terms: ['amarone', 'valpolicella', 'ripasso', 'veneto'], country: 'it', typeId: 1 },
  { terms: ['primitivo', 'negroamaro', 'puglia', 'nero d\'avola', 'sicilia', 'etna'], country: 'it', typeId: 1 },
  { terms: ['franciacorta', 'prosecco', 'trentodoc', 'lambrusco', 'spumante'], country: 'it', typeId: 3 },
  { terms: ['champagne', 'krug', 'dom perignon', 'bollinger', 'moet'], country: 'fr', typeId: 3 },
  { terms: ['bordeaux', 'borgogna', 'burgundy', 'bordeaux', 'chateauneuf'], country: 'fr', typeId: 1 },
  { terms: ['chablis', 'montrachet', 'meursault', 'sancerre'], country: 'fr', typeId: 2 },
  { terms: ['rioja', 'ribera', 'spagna', 'tempranillo'], country: 'es', typeId: 1 },
  { terms: ['porto', 'port', 'tawny', 'vintage port'], country: 'pt', typeId: 24 },
  { terms: ['tokaj', 'sauternes', 'passito', 'moscato', 'dolce'], typeId: 7 },
  { terms: ['vermentino', 'soave', 'verdicchio', 'pinot grigio', 'chardonnay', 'sauvignon', 'riesling', 'gewurztraminer'], typeId: 2 },
  { terms: ['rosato', 'rose', 'rosé', 'chiaretto'], typeId: 4 },
];

const pageCache = new Map();
const CACHE_TTL_MS = 1000 * 60 * 15;
const knownWinesMap = new Map();
let sampleCatalog = [];
let sampleLoadPromise = null;

function normalizeImageUrl(url) {
  if (!url) return null;
  if (url.startsWith('//')) return `https:${url}`;
  return url;
}

function normalizeStr(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function translateCountry(name) {
  return COUNTRY_NAME_IT[name] || name || '';
}

function mapVivinoRecord(rec) {
  const v = rec?.vintage || {};
  const w = v?.wine || {};
  const style = w?.style || {};
  const regionObj = w?.region || {};
  const countryObj = regionObj?.country || {};
  const stats = v?.statistics || {};
  const priceObj = rec?.price || (Array.isArray(rec?.prices) ? rec.prices[0] : null);

  const img =
    v?.image?.variations?.bottle_medium ||
    v?.image?.variations?.label_large ||
    v?.image?.location ||
    null;

  const grapes = Array.isArray(style?.grapes)
    ? style.grapes.map((g) => g.name).filter(Boolean)
    : [];

  const foodIds = Array.isArray(style?.food)
    ? style.food.map((f) => f.id).filter(Boolean)
    : [];

  const wineId = w?.id || v?.id || Math.random().toString(36).slice(2);
  const vintageYear = v?.year && v.year !== 'N.V.' && Number(v.year) > 1800 ? Number(v.year) : null;

  return {
    id: `viv-${wineId}-${v?.year || 'nv'}`,
    name: v?.name || w?.name || 'Vino Selezionato',
    winery: w?.winery?.name || '',
    vintage: vintageYear,
    typeId: w?.type_id || 1,
    region: regionObj?.name || '',
    country: translateCountry(countryObj?.name),
    countryCode: (countryObj?.code || '').toLowerCase(),
    grapes,
    rating: Number(stats?.ratings_average || stats?.wine_ratings_average || 4.0),
    reviewsCount: Number(stats?.ratings_count || stats?.wine_ratings_count || 0),
    priceEur: priceObj?.amount ? Number(Number(priceObj.amount).toFixed(2)) : null,
    imageUrl: normalizeImageUrl(img),
    styleName: style?.name || '',
    styleDescription: style?.description || '',
    rawStructure: w?.taste?.structure || null,
    rawFlavors: w?.taste?.flavor || null,
    rawFoodIds: foodIds,
    source: 'vivino',
  };
}

function mapSampleRecord(item, cat) {
  const locParts = String(item.location || '').split('\n·\n');
  const rawCountry = locParts[0]?.trim() || '';
  const region = locParts[1]?.trim() || '';
  const yearMatch = String(item.wine || '').match(/\b(18\d{2}|19\d{2}|20[0-2]\d)\b/);
  const reviewsMatch = String(item.rating?.reviews || '').match(/\d+/);

  return {
    id: `smp-${cat}-${item.id}`,
    name: item.wine || 'Vino',
    winery: item.winery || '',
    vintage: yearMatch ? Number(yearMatch[1]) : null,
    typeId: SAMPLE_CAT_TO_TYPE[cat] || 1,
    region,
    country: translateCountry(rawCountry),
    countryCode: '',
    grapes: [],
    rating: Number(item.rating?.average || 4.1),
    reviewsCount: reviewsMatch ? Number(reviewsMatch[0]) : 45,
    priceEur: null,
    imageUrl: normalizeImageUrl(item.image),
    styleName: '',
    styleDescription: '',
    rawStructure: null,
    rawFlavors: null,
    rawFoodIds: [],
    source: 'sampleapis',
  };
}

export async function warmCatalog() {
  if (sampleLoadPromise) return sampleLoadPromise;
  sampleLoadPromise = (async () => {
    const categories = Object.keys(SAMPLE_CAT_TO_TYPE);
    const results = await Promise.allSettled(
      categories.map(async (cat) => {
        const res = await fetch(`https://api.sampleapis.com/wines/${cat}`, {
          headers: { 'User-Agent': 'WhatWineApp/1.0' },
          signal: AbortSignal.timeout(10000),
        });
        if (!res.ok) return [];
        const arr = await res.json();
        return Array.isArray(arr) ? arr.map((item) => mapSampleRecord(item, cat)) : [];
      })
    );

    const collected = [];
    for (const r of results) {
      if (r.status === 'fulfilled') collected.push(...r.value);
    }
    sampleCatalog = collected;
    for (const w of collected) {
      knownWinesMap.set(w.id, w);
    }
    console.log(`[WhatWine] Indexed ${sampleCatalog.length} wines from SampleAPIs.`);
    return sampleCatalog;
  })();
  return sampleLoadPromise;
}

async function fetchVivinoExplore({
  page = 1,
  typeIds = [],
  foodIds = [],
  countryCodes = [],
  minRating = 1,
  priceMin = null,
  priceMax = null,
  orderBy = 'ratings_count',
  order = 'desc',
}) {
  const params = new URLSearchParams();
  params.set('country_code', 'IT');
  params.set('currency_code', 'EUR');
  params.set('min_rating', String(minRating || 1));
  params.set('order_by', orderBy || 'ratings_count');
  params.set('order', order || 'desc');
  params.set('page', String(page));

  for (const tid of typeIds) {
    params.append('wine_type_ids[]', String(tid));
  }
  for (const fid of foodIds) {
    params.append('food_ids[]', String(fid));
  }
  for (const cc of countryCodes) {
    params.append('country_codes[]', String(cc).toLowerCase());
  }
  if (priceMin !== null && priceMin !== '' && Number(priceMin) > 0) {
    params.set('price_range_min', String(priceMin));
  }
  if (priceMax !== null && priceMax !== '' && Number(priceMax) > 0) {
    params.set('price_range_max', String(priceMax));
  }

  const cacheKey = params.toString();
  const cached = pageCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < CACHE_TTL_MS) {
    return cached.data;
  }

  const url = `https://www.vivino.com/api/explore/explore?${cacheKey}`;
  const res = await fetch(url, {
    headers: VIVINO_HEADERS,
    signal: AbortSignal.timeout(9000),
  });

  if (!res.ok) {
    throw new Error(`Vivino HTTP ${res.status}`);
  }

  const json = await res.json();
  const ev = json?.explore_vintage || {};
  const records = Array.isArray(ev.records) ? ev.records : [];
  const rawWines = records.map(mapVivinoRecord);

  for (const w of rawWines) {
    knownWinesMap.set(w.id, w);
  }

  const payload = {
    rawWines,
    totalMatches: Number(ev.records_matched || rawWines.length),
    hasMore: rawWines.length >= 20 && page * 24 < Number(ev.records_matched || 99999),
    source: 'vivino',
  };

  pageCache.set(cacheKey, { ts: Date.now(), data: payload });
  return payload;
}

function searchIndexedWines(query, filters = {}) {
  const normQ = normalizeStr(query);
  const terms = normQ.split(/\s+/).filter(Boolean);
  const all = Array.from(knownWinesMap.values());

  const scored = [];
  for (const w of all) {
    if (filters.typeIds?.length && !filters.typeIds.includes(w.typeId)) continue;
    if (filters.minRating && w.rating < filters.minRating) continue;
    if (filters.countryCodes?.length && w.countryCode && !filters.countryCodes.includes(w.countryCode)) continue;

    const hay = normalizeStr(`${w.name} ${w.winery} ${w.region} ${w.country} ${w.styleName} ${(w.grapes || []).join(' ')}`);
    let hits = 0;
    for (const t of terms) {
      if (hay.includes(t)) hits += 1;
    }
    if (hits === terms.length) {
      const nameHit = normalizeStr(w.name).includes(normQ) ? 20 : 0;
      const wineryHit = normalizeStr(w.winery).includes(normQ) ? 10 : 0;
      const vivinoBoost = w.source === 'vivino' ? 5 : 0;
      scored.push({ w, score: nameHit + wineryHit + vivinoBoost + w.rating });
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.w);
}

export async function queryWines(options = {}) {
  await warmCatalog().catch(() => {});

  const page = Math.max(1, Number(options.page || 1));
  const query = String(options.q || '').trim();
  const typeIds = Array.isArray(options.typeIds)
    ? options.typeIds.map((t) => TYPE_KEY_TO_ID[t] || Number(t)).filter(Boolean)
    : [];
  const foodIds = Array.isArray(options.foodIds)
    ? options.foodIds.map(Number).filter(Boolean)
    : [];
  const countryCodes = Array.isArray(options.countryCodes)
    ? options.countryCodes.filter(Boolean)
    : [];
  const minRating = options.minRating ? Number(options.minRating) : 1;
  const priceMin = options.priceMin ? Number(options.priceMin) : null;
  const priceMax = options.priceMax ? Number(options.priceMax) : null;
  const orderBy = options.orderBy || 'ratings_count';
  const order = options.order || 'desc';

  // If user typed a search query, combine exact indexed search + live hint-based Vivino stream
  if (query) {
    const normQ = normalizeStr(query);
    const hint = QUERY_TO_VIVINO_HINTS.find((h) => h.terms.some((t) => normQ.includes(normalizeStr(t))));

    let liveWines = [];
    let liveTotal = 0;
    let liveHasMore = false;

    try {
      const hintTypes = typeIds.length ? typeIds : hint?.typeId ? [hint.typeId] : [];
      const hintCountries = countryCodes.length ? countryCodes : hint?.country ? [hint.country] : [];
      const live = await fetchVivinoExplore({
        page,
        typeIds: hintTypes,
        foodIds,
        countryCodes: hintCountries,
        minRating,
        priceMin,
        priceMax,
        orderBy,
        order,
      });
      liveWines = live.rawWines;
      liveTotal = live.totalMatches;
      liveHasMore = live.hasMore;
    } catch {
      // Fallback gracefully to indexed search
    }

    const indexedMatches = searchIndexedWines(query, { typeIds, minRating, countryCodes });
    const pageSize = 24;
    const sliceStart = (page - 1) * pageSize;
    const indexedPage = indexedMatches.slice(sliceStart, sliceStart + pageSize);

    // Filter liveWines when not matching directly unless hint matched
    const matchingLive = liveWines.filter((w) => {
      const hay = normalizeStr(`${w.name} ${w.winery} ${w.region} ${w.country} ${w.styleName}`);
      return hay.includes(normQ) || Boolean(hint);
    });

    // Deduplicate prioritizing exact indexed matches on page 1, then live wines
    const seen = new Set();
    const merged = [];
    for (const w of [...indexedPage, ...matchingLive]) {
      if (!seen.has(w.id)) {
        seen.add(w.id);
        merged.push(w);
      }
    }

    const totalEstimated = Math.max(indexedMatches.length, hint ? liveTotal : indexedMatches.length);
    return {
      wines: merged.map((w) => enrichWine(w)),
      page,
      totalMatches: totalEstimated,
      hasMore: sliceStart + pageSize < indexedMatches.length || (Boolean(hint) && liveHasMore),
      source: merged.some((w) => w.source === 'vivino') ? 'live+index' : 'index',
    };
  }

  // Standard infinite live catalog stream via Vivino Explore
  try {
    const live = await fetchVivinoExplore({
      page,
      typeIds,
      foodIds,
      countryCodes,
      minRating,
      priceMin,
      priceMax,
      orderBy,
      order,
    });

    return {
      wines: live.rawWines.map((w) => enrichWine(w)),
      page,
      totalMatches: live.totalMatches,
      hasMore: live.hasMore,
      source: 'vivino-live',
    };
  } catch (err) {
    console.warn('[WhatWine] Vivino live fetch fallback to SampleAPIs:', err.message);
    const filtered = sampleCatalog.filter((w) => {
      if (typeIds.length && !typeIds.includes(w.typeId)) return false;
      if (minRating && w.rating < minRating) return false;
      return true;
    });
    const pageSize = 24;
    const slice = filtered.slice((page - 1) * pageSize, page * pageSize);
    return {
      wines: slice.map((w) => enrichWine(w)),
      page,
      totalMatches: filtered.length,
      hasMore: page * pageSize < filtered.length,
      source: 'sampleapis-fallback',
    };
  }
}

export async function reverseFoodSearch({ dish = '', foodId = null, modifier = '', page = 1, priceMax = null, countryCodes = [] }) {
  await warmCatalog().catch(() => {});

  let dishContext;
  if (foodId && !dish) {
    const foodEntry = FOOD_CATALOG.find((f) => f.id === Number(foodId));
    const modObj = COOKING_MODIFIERS[modifier] || null;
    dishContext = {
      foodIds: [Number(foodId)],
      preferredTypes: modObj?.boostTypes?.length ? modObj.boostTypes : foodEntry?.preferredTypes || [1, 2],
      label: foodEntry?.label || 'Abbinamento selezionato',
      sommelierNote: `${foodEntry?.rationale || ''} ${modObj?.note || ''}`.trim(),
      modifier: modObj,
    };
  } else {
    dishContext = resolveDishQuery(dish, modifier);
    if (foodId && !dishContext.foodIds.includes(Number(foodId))) {
      dishContext.foodIds.unshift(Number(foodId));
    }
  }

  try {
    const live = await fetchVivinoExplore({
      page: Number(page || 1),
      foodIds: dishContext.foodIds.slice(0, 1),
      typeIds: dishContext.preferredTypes.slice(0, 2),
      countryCodes,
      priceMax,
      minRating: 3.7,
      orderBy: 'ratings_count',
      order: 'desc',
    });

    const enriched = live.rawWines
      .map((w) => enrichWine(w, dishContext))
      .sort((a, b) => (b.dishMatch?.score || 0) - (a.dishMatch?.score || 0));

    return {
      context: {
        label: dishContext.label,
        sommelierNote: dishContext.sommelierNote,
        foodIds: dishContext.foodIds,
        preferredTypes: dishContext.preferredTypes,
        modifier: dishContext.modifier?.label || null,
      },
      wines: enriched,
      page: Number(page || 1),
      totalMatches: live.totalMatches,
      hasMore: live.hasMore,
    };
  } catch {
    const filtered = sampleCatalog.filter((w) => dishContext.preferredTypes.includes(w.typeId));
    const pageSize = 24;
    const slice = filtered.slice((page - 1) * pageSize, page * pageSize);
    const enriched = slice
      .map((w) => enrichWine(w, dishContext))
      .sort((a, b) => (b.dishMatch?.score || 0) - (a.dishMatch?.score || 0));

    return {
      context: {
        label: dishContext.label,
        sommelierNote: dishContext.sommelierNote,
        foodIds: dishContext.foodIds,
        preferredTypes: dishContext.preferredTypes,
      },
      wines: enriched,
      page: Number(page || 1),
      totalMatches: filtered.length,
      hasMore: page * pageSize < filtered.length,
    };
  }
}

export async function buildDinnerFlight(courses = []) {
  // courses: [{ slot: 'Antipasto' | 'Primo' | 'Secondo' | 'Dolce', dish: string }]
  const validCourses = courses.filter((c) => c && c.dish && c.dish.trim());
  const usedIds = new Set();
  const results = [];
  for (const c of validCourses) {
    const res = await reverseFoodSearch({ dish: c.dish, page: 1 });
    const sorted = [...res.wines].sort(
      (a, b) => (b.dishMatch?.score || 0) * 10 + b.rating - ((a.dishMatch?.score || 0) * 10 + a.rating)
    );
    const topWine = sorted.find((w) => !usedIds.has(w.id)) || sorted[0] || null;
    if (topWine) usedIds.add(topWine.id);
    const alternatives = sorted.filter((w) => w.id !== topWine?.id).slice(0, 3);
    results.push({
      slot: c.slot,
      dish: c.dish,
      context: res.context,
      recommendedWine: topWine,
      alternatives,
    });
  }
  return results;
}

export function getWineById(id) {
  const raw = knownWinesMap.get(id);
  return raw ? enrichWine(raw) : null;
}
