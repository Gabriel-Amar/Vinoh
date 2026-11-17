export type WineTypeKey = 'red' | 'white' | 'sparkling' | 'rose' | 'dessert' | 'port';

export interface WineStructure {
  body: number;
  tannins: number;
  acidity: number;
  sweetness: number;
}

export interface FoodPairing {
  id: number;
  slug: string;
  label: string;
  category: string;
  dishes: string[];
  rationale: string;
  matchScore: number;
}

export interface WineServing {
  tempRange: string;
  glassType: string;
  decanting: string;
  agingPotential: string;
}

export interface DishMatch {
  score: number;
  rationale: string;
  matchedTags: string[];
}

export interface Wine {
  id: string;
  name: string;
  winery: string;
  vintage: number | null;
  typeId: number;
  type: WineTypeKey;
  typeLabel: string;
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
  structure: WineStructure;
  flavorNotes: string[];
  pairings: FoodPairing[];
  serving: WineServing;
  dishMatch: DishMatch | null;
  source: string;
}

export interface FoodMeta {
  id: number;
  slug: string;
  label: string;
  category: string;
  dishes: string[];
}

export interface ModifierMeta {
  id: string;
  label: string;
  note: string;
}

export interface MetaResponse {
  foods: FoodMeta[];
  modifiers: ModifierMeta[];
  countries: { code: string; label: string }[];
  types: { id: WineTypeKey; typeId: number; label: string }[];
}

export interface WinesPageResponse {
  wines: Wine[];
  page: number;
  totalMatches: number;
  hasMore: boolean;
  source: string;
}

export interface ReversePairingResponse {
  context: {
    label: string;
    sommelierNote: string;
    foodIds: number[];
    preferredTypes: number[];
    modifier?: string | null;
  };
  wines: Wine[];
  page: number;
  totalMatches: number;
  hasMore: boolean;
}

export interface CellarEntry {
  wine: Wine;
  favorite: boolean;
  bottles: number;
  personalRating: number;
  notes: string;
  addedAt: string;
}

export interface DinnerCourseResult {
  slot: string;
  dish: string;
  context: ReversePairingResponse['context'];
  recommendedWine: Wine | null;
  alternatives: Wine[];
}
