import { useEffect, useRef, useState } from 'react';
import { RefreshCw, Search, SlidersHorizontal, X } from 'lucide-react';
import { fetchWines } from '../api';
import type { CellarEntry, MetaResponse, Wine } from '../types';
import { SkeletonGrid } from './SkeletonGrid';
import { WineCard } from './WineCard';

interface CatalogViewProps {
  meta: MetaResponse | null;
  cellarMap: Record<string, CellarEntry>;
  compareIds: string[];
  onSelectWine: (wine: Wine) => void;
  onToggleCellar: (wine: Wine) => void;
  onToggleCompare: (wine: Wine) => void;
}

const PRICE_RANGES = [
  { id: 'all', label: 'Qualsiasi prezzo', min: null, max: null },
  { id: 'u20', label: 'Fino a 20 €', min: 1, max: 20 },
  { id: '20-50', label: '20 – 50 €', min: 20, max: 50 },
  { id: '50-120', label: '50 – 120 €', min: 50, max: 120 },
  { id: '120+', label: 'Oltre 120 €', min: 120, max: null },
];

const RATING_OPTIONS = [
  { value: 1, label: 'Tutte' },
  { value: 3.8, label: '3.8+' },
  { value: 4.0, label: '4.0+' },
  { value: 4.2, label: '4.2+' },
  { value: 4.4, label: '4.4+' },
];

const SORT_OPTIONS = [
  { value: 'ratings_count:desc', label: 'Più popolari' },
  { value: 'ratings_average:desc', label: 'Valutazione più alta' },
  { value: 'price:asc', label: 'Prezzo crescente' },
  { value: 'price:desc', label: 'Prezzo decrescente' },
];

export function CatalogView({
  meta,
  cellarMap,
  compareIds,
  onSelectWine,
  onToggleCellar,
  onToggleCompare,
}: CatalogViewProps) {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedFoodId, setSelectedFoodId] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number>(1);
  const [priceRangeId, setPriceRangeId] = useState<string>('all');
  const [sortValue, setSortValue] = useState<string>('ratings_count:desc');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [wines, setWines] = useState<Wine[]>([]);
  const [page, setPage] = useState(1);
  const [totalMatches, setTotalMatches] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadedKey, setLoadedKey] = useState<string>('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sourceTag, setSourceTag] = useState('');

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const activePriceRange = PRICE_RANGES.find((r) => r.id === priceRangeId) || PRICE_RANGES[0];

  const queryKey = JSON.stringify({
    debouncedQuery,
    selectedTypes,
    selectedCountries,
    selectedFoodId,
    minRating,
    priceRangeId,
    sortValue,
  });
  const loadingInitial = loadedKey !== queryKey && !error;

  // Debounce text search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(searchInput.trim());
    }, 320);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Load page 1 whenever filters/query change
  useEffect(() => {
    const controller = new AbortController();
    const [orderBy, order] = sortValue.split(':');

    fetchWines({
      page: 1,
      q: debouncedQuery,
      type: selectedTypes,
      country: selectedCountries,
      foodId: selectedFoodId,
      minRating,
      priceMin: activePriceRange.min,
      priceMax: activePriceRange.max,
      orderBy,
      order,
      signal: controller.signal,
    })
      .then((res) => {
        setWines(res.wines);
        setPage(1);
        setTotalMatches(res.totalMatches);
        setHasMore(res.hasMore);
        setSourceTag(res.source);
        setError(null);
        setLoadedKey(queryKey);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Impossibile caricare il catalogo vini.');
        setLoadedKey(queryKey);
      });

    return () => controller.abort();
  }, [
    queryKey,
    debouncedQuery,
    selectedTypes,
    selectedCountries,
    selectedFoodId,
    minRating,
    sortValue,
    activePriceRange.min,
    activePriceRange.max,
  ]);

  const loadNextPage = () => {
    if (loadingInitial || loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setLoadingMore(true);
    const [orderBy, order] = sortValue.split(':');

    fetchWines({
      page: nextPage,
      q: debouncedQuery,
      type: selectedTypes,
      country: selectedCountries,
      foodId: selectedFoodId,
      minRating,
      priceMin: activePriceRange.min,
      priceMax: activePriceRange.max,
      orderBy,
      order,
    })
      .then((res) => {
        setWines((prev) => {
          const existing = new Set(prev.map((w) => w.id));
          const uniqueNew = res.wines.filter((w) => !existing.has(w.id));
          return [...prev, ...uniqueNew];
        });
        setPage(nextPage);
        setHasMore(res.hasMore);
        if (res.totalMatches) setTotalMatches(res.totalMatches);
      })
      .catch(() => {
        setHasMore(false);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  };

  // Infinite scroll IntersectionObserver
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || loadingInitial) return;

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadNextPage();
        }
      },
      { rootMargin: '420px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });

  const toggleItem = (arr: string[], val: string, setter: (next: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const activeFiltersCount =
    selectedTypes.length +
    selectedCountries.length +
    (selectedFoodId ? 1 : 0) +
    (minRating > 1 ? 1 : 0) +
    (priceRangeId !== 'all' ? 1 : 0) +
    (debouncedQuery ? 1 : 0);

  const resetAllFilters = () => {
    setSearchInput('');
    setDebouncedQuery('');
    setSelectedTypes([]);
    setSelectedCountries([]);
    setSelectedFoodId(null);
    setMinRating(1);
    setPriceRangeId('all');
  };

  return (
    <section aria-label="Catalogo infinito dei vini">
      <div className="view-header">
        <div>
          <h1 className="view-title">Catalogo Infinito dei Vini</h1>
          <p className="view-subtitle">
            Scorri migliaia di etichette reali da tutto il mondo. Clicca qualsiasi bottiglia per aprire la scheda sommelier e scoprire gli abbinamenti gastronomici.
          </p>
        </div>
      </div>

      <div className="catalog-layout">
        {/* Filter Rail */}
        <aside className={`filter-rail ${mobileFiltersOpen ? 'is-open' : ''}`} aria-label="Filtri catalogo">
          <div className="rail-header">
            <span className="rail-title">
              <SlidersHorizontal size={15} />
              <span>Filtri</span>
            </span>
            {activeFiltersCount > 0 && (
              <button type="button" className="link-reset" onClick={resetAllFilters}>
                Azzera ({activeFiltersCount})
              </button>
            )}
          </div>

          <div className="filter-group">
            <span className="filter-label">Tipologia</span>
            <div className="chip-grid">
              {(meta?.types || []).map((t) => {
                const selected = selectedTypes.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    className={`filter-chip ${selected ? 'is-selected' : ''}`}
                    onClick={() => toggleItem(selectedTypes, t.id, setSelectedTypes)}
                  >
                    <span className={`type-dot ${t.id}`} aria-hidden="true" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Paese d’origine</span>
            <div className="chip-grid">
              {(meta?.countries || []).map((c) => {
                const selected = selectedCountries.includes(c.code);
                return (
                  <button
                    key={c.code}
                    type="button"
                    className={`filter-chip ${selected ? 'is-selected' : ''}`}
                    onClick={() => toggleItem(selectedCountries, c.code, setSelectedCountries)}
                  >
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Valutazione minima</span>
            <div className="chip-grid">
              {RATING_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`filter-chip tabular ${minRating === opt.value ? 'is-selected' : ''}`}
                  onClick={() => setMinRating(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <span className="filter-label">Fascia di prezzo</span>
            <div className="chip-grid">
              {PRICE_RANGES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  className={`filter-chip ${priceRangeId === r.id ? 'is-selected' : ''}`}
                  onClick={() => setPriceRangeId(r.id)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {meta?.foods && (
            <div className="filter-group">
              <label htmlFor="rail-food-select" className="filter-label">
                Abbinamento rapido
              </label>
              <select
                id="rail-food-select"
                className="select-control"
                value={selectedFoodId ?? ''}
                onChange={(e) => setSelectedFoodId(e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Tutti i piatti</option>
                {meta.foods.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <div>
          <div className="catalog-toolbar">
            <div className="search-field-wrap">
              <Search size={17} className="search-icon" />
              <input
                id="catalog-search-input"
                type="search"
                className="text-input"
                placeholder="Cerca vino, cantina, denominazione o vitigno (es. Barolo, Krug, Chianti, Chardonnay)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {searchInput && (
                <button
                  type="button"
                  className="clear-input-btn"
                  aria-label="Cancella ricerca"
                  onClick={() => setSearchInput('')}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            <button
              type="button"
              className="btn btn-secondary mobile-filter-toggle"
              onClick={() => setMobileFiltersOpen((v) => !v)}
            >
              <SlidersHorizontal size={15} />
              <span>Filtri {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
            </button>

            <select
              id="catalog-sort-select"
              aria-label="Ordina vini per"
              className="select-control"
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="status-bar">
            <span className="tabular">
              {loadingInitial
                ? 'Ricerca nel catalogo live in corso...'
                : `${wines.length.toLocaleString('it-IT')} caricati su ${totalMatches.toLocaleString('it-IT')} etichette disponibili`}
            </span>
            {sourceTag && !loadingInitial && (
              <span style={{ color: 'var(--ink-muted)', fontSize: '0.78rem' }}>
                Flusso API: {sourceTag === 'vivino-live' ? 'Live Infinito' : sourceTag}
              </span>
            )}
          </div>

          {error && (
            <div className="error-banner" role="alert">
              <span>{error}</span>
              <button type="button" className="btn btn-secondary" onClick={resetAllFilters}>
                <RefreshCw size={14} />
                <span>Riprova</span>
              </button>
            </div>
          )}

          {loadingInitial ? (
            <SkeletonGrid count={8} />
          ) : wines.length === 0 ? (
            <div className="empty-state">
              <h2 className="empty-state-title">Nessun vino corrisponde ai filtri attuali</h2>
              <p className="empty-state-copy">
                Prova a rimuovere uno o più filtri di prezzo, paese o valutazione oppure cerca una denominazione più ampia.
              </p>
              <button type="button" className="btn btn-primary" onClick={resetAllFilters}>
                Mostra tutto il catalogo
              </button>
            </div>
          ) : (
            <>
              <div className="wine-grid">
                {wines.map((wine) => (
                  <WineCard
                    key={wine.id}
                    wine={wine}
                    inCellar={Boolean(cellarMap[wine.id]?.favorite || (cellarMap[wine.id]?.bottles ?? 0) > 0)}
                    isCompared={compareIds.includes(wine.id)}
                    onSelect={onSelectWine}
                    onToggleCellar={onToggleCellar}
                    onToggleCompare={onToggleCompare}
                  />
                ))}
              </div>

              {loadingMore && (
                <div style={{ marginTop: '1.15rem' }}>
                  <SkeletonGrid count={4} />
                </div>
              )}

              <div ref={sentinelRef} className="load-more-sentinel">
                {hasMore && !loadingMore && (
                  <button type="button" className="btn btn-secondary" onClick={loadNextPage}>
                    Carica altre etichette
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
