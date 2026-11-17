import type {
  DinnerCourseResult,
  MetaResponse,
  ReversePairingResponse,
  WinesPageResponse,
} from './types';

export async function fetchMeta(): Promise<MetaResponse> {
  const res = await fetch('/api/meta');
  if (!res.ok) throw new Error('Impossibile caricare i filtri del catalogo');
  return res.json();
}

export interface WineQueryParams {
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
  signal?: AbortSignal;
}

export async function fetchWines(params: WineQueryParams): Promise<WinesPageResponse> {
  const sp = new URLSearchParams();
  sp.set('page', String(params.page || 1));
  if (params.q) sp.set('q', params.q);
  if (params.type?.length) sp.set('type', params.type.join(','));
  if (params.foodId) sp.set('foodId', String(params.foodId));
  if (params.country?.length) sp.set('country', params.country.join(','));
  if (params.minRating && params.minRating > 1) sp.set('minRating', String(params.minRating));
  if (params.priceMin) sp.set('priceMin', String(params.priceMin));
  if (params.priceMax) sp.set('priceMax', String(params.priceMax));
  if (params.orderBy) sp.set('orderBy', params.orderBy);
  if (params.order) sp.set('order', params.order);

  const res = await fetch(`/api/wines?${sp.toString()}`, { signal: params.signal });
  if (!res.ok) throw new Error('Errore nel caricamento dei vini');
  return res.json();
}

export interface ReverseSearchParams {
  dish?: string;
  foodId?: number | null;
  modifier?: string;
  page?: number;
  priceMax?: number | null;
  country?: string[];
  signal?: AbortSignal;
}

export async function fetchReversePairings(params: ReverseSearchParams): Promise<ReversePairingResponse> {
  const sp = new URLSearchParams();
  sp.set('page', String(params.page || 1));
  if (params.dish) sp.set('dish', params.dish);
  if (params.foodId) sp.set('foodId', String(params.foodId));
  if (params.modifier) sp.set('modifier', params.modifier);
  if (params.priceMax) sp.set('priceMax', String(params.priceMax));
  if (params.country?.length) sp.set('country', params.country.join(','));

  const res = await fetch(`/api/pairings/search?${sp.toString()}`, { signal: params.signal });
  if (!res.ok) throw new Error('Errore nella ricerca abbinamenti');
  return res.json();
}

export async function fetchDinnerFlight(
  courses: { slot: string; dish: string }[]
): Promise<{ flight: DinnerCourseResult[] }> {
  const res = await fetch('/api/menu-pairing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courses }),
  });
  if (!res.ok) throw new Error('Errore nella creazione del percorso cena');
  return res.json();
}
