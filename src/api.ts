import {
  buildClientDinnerFlight,
  getClientMeta,
  queryClientReversePairings,
  queryClientWines,
} from './lib/clientPairing';
import type {
  DinnerCourseResult,
  MetaResponse,
  ReversePairingResponse,
  WinesPageResponse,
} from './types';

let backendAvailable: boolean | null = null;

async function hasBackend(): Promise<boolean> {
  if (backendAvailable !== null) return backendAvailable;
  try {
    const res = await fetch('/api/health', { signal: AbortSignal.timeout(1500) });
    const ct = res.headers.get('content-type') || '';
    backendAvailable = res.ok && ct.includes('application/json');
  } catch {
    backendAvailable = false;
  }
  return backendAvailable;
}

export async function fetchMeta(): Promise<MetaResponse> {
  if (await hasBackend()) {
    const res = await fetch('/api/meta');
    if (res.ok) return res.json();
  }
  return getClientMeta();
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
  if (await hasBackend()) {
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
    if (res.ok) return res.json();
  }
  return queryClientWines(params);
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
  if (await hasBackend()) {
    const sp = new URLSearchParams();
    sp.set('page', String(params.page || 1));
    if (params.dish) sp.set('dish', params.dish);
    if (params.foodId) sp.set('foodId', String(params.foodId));
    if (params.modifier) sp.set('modifier', params.modifier);
    if (params.priceMax) sp.set('priceMax', String(params.priceMax));
    if (params.country?.length) sp.set('country', params.country.join(','));

    const res = await fetch(`/api/pairings/search?${sp.toString()}`, { signal: params.signal });
    if (res.ok) return res.json();
  }
  return queryClientReversePairings(params);
}

export async function fetchDinnerFlight(
  courses: { slot: string; dish: string }[]
): Promise<{ flight: DinnerCourseResult[] }> {
  if (await hasBackend()) {
    const res = await fetch('/api/menu-pairing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courses }),
    });
    if (res.ok) return res.json();
  }
  return buildClientDinnerFlight(courses);
}
