import { useEffect, useRef, useState } from 'react';
import { Search, Sparkles, UtensilsCrossed, X } from 'lucide-react';
import { fetchReversePairings } from '../api';
import type { CellarEntry, MetaResponse, ReversePairingResponse, Wine } from '../types';
import { SkeletonGrid } from './SkeletonGrid';
import { WineCard } from './WineCard';

interface ReversePairingViewProps {
  meta: MetaResponse | null;
  initialFoodId?: number | null;
  initialDish?: string;
  cellarMap: Record<string, CellarEntry>;
  compareIds: string[];
  onSelectWine: (wine: Wine) => void;
  onToggleCellar: (wine: Wine) => void;
  onToggleCompare: (wine: Wine) => void;
}

const QUICK_DISHES = [
  'Carne alla brace',
  'Pasta al ragù',
  'Carbonara',
  'Spaghetti alle vongole',
  'Risotto ai porcini',
  'Pesce al forno',
  'Formaggi stagionati',
  'Pizza Margherita',
  'Tartufo',
  'Cioccolato fondente',
];

export function ReversePairingView({
  meta,
  initialFoodId = null,
  initialDish = '',
  cellarMap,
  compareIds,
  onSelectWine,
  onToggleCellar,
  onToggleCompare,
}: ReversePairingViewProps) {
  const [dishInput, setDishInput] = useState(
    initialFoodId ? initialDish : initialDish || 'Carne e pasta al ragù'
  );
  const [activeDish, setActiveDish] = useState(
    initialFoodId ? '' : initialDish || 'Carne e pasta al ragù'
  );
  const [selectedFoodId, setSelectedFoodId] = useState<number | null>(initialFoodId);
  const [modifier, setModifier] = useState<string>('');
  const [countryFilter, setCountryFilter] = useState<string>('');

  const [context, setContext] = useState<ReversePairingResponse['context'] | null>(null);
  const [wines, setWines] = useState<Wine[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalMatches, setTotalMatches] = useState(0);
  const [loadedKey, setLoadedKey] = useState<string>('');
  const [loadingMore, setLoadingMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const queryKey = JSON.stringify({ activeDish, selectedFoodId, modifier, countryFilter });
  const loading = loadedKey !== queryKey;

  useEffect(() => {
    const controller = new AbortController();

    fetchReversePairings({
      dish: activeDish,
      foodId: selectedFoodId,
      modifier,
      country: countryFilter ? [countryFilter] : [],
      page: 1,
      signal: controller.signal,
    })
      .then((res) => {
        setContext(res.context);
        setWines(res.wines);
        setPage(1);
        setHasMore(res.hasMore);
        setTotalMatches(res.totalMatches);
        setLoadedKey(queryKey);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setLoadedKey(queryKey);
      });

    return () => controller.abort();
  }, [queryKey, activeDish, selectedFoodId, modifier, countryFilter]);

  const loadMore = () => {
    if (loading || loadingMore || !hasMore) return;
    const next = page + 1;
    setLoadingMore(true);

    fetchReversePairings({
      dish: activeDish,
      foodId: selectedFoodId,
      modifier,
      country: countryFilter ? [countryFilter] : [],
      page: next,
    })
      .then((res) => {
        setWines((prev) => {
          const seen = new Set(prev.map((w) => w.id));
          return [...prev, ...res.wines.filter((w) => !seen.has(w.id))];
        });
        setPage(next);
        setHasMore(res.hasMore);
      })
      .finally(() => setLoadingMore(false));
  };

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore || loading) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) loadMore();
      },
      { rootMargin: '400px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedFoodId(null);
    setActiveDish(dishInput.trim() || 'Pasta');
  };

  const selectQuickDish = (dish: string) => {
    setSelectedFoodId(null);
    setDishInput(dish);
    setActiveDish(dish);
  };

  const selectFoodCategory = (foodId: number, label: string) => {
    setSelectedFoodId(foodId);
    setDishInput(label);
    setActiveDish('');
  };

  return (
    <section aria-label="Ricerca inversa dal cibo al vino">
      <div className="view-header">
        <div>
          <h1 className="view-title">Ricerca Inversa: dal Piatto al Vino</h1>
          <p className="view-subtitle">
            Scrivi cosa porti in tavola (es. carne, pasta al ragù, pesce, formaggi) oppure scegli una categoria culinaria per ottenere i vini più compatibili con punteggio di affinità.
          </p>
        </div>
      </div>

      <div className="dish-hero-panel">
        <form className="dish-search-row" onSubmit={handleSearchSubmit}>
          <div className="search-field-wrap" style={{ flex: '1 1 320px' }}>
            <UtensilsCrossed size={17} className="search-icon" />
            <input
              id="reverse-dish-input"
              type="text"
              className="text-input"
              placeholder="Es: bistecca alla fiorentina, pasta alla carbonara, salmone, pizza..."
              value={dishInput}
              onChange={(e) => setDishInput(e.target.value)}
            />
            {dishInput && (
              <button
                type="button"
                className="clear-input-btn"
                aria-label="Cancella piatto"
                onClick={() => setDishInput('')}
              >
                <X size={15} />
              </button>
            )}
          </div>

          <select
            aria-label="Filtra per paese del vino"
            className="select-control"
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
          >
            <option value="">Tutti i paesi</option>
            {(meta?.countries || []).map((c) => (
              <option key={c.code} value={c.code}>
                Solo vini: {c.label}
              </option>
            ))}
          </select>

          <button type="submit" id="reverse-search-submit" className="btn btn-primary">
            <Search size={16} />
            <span>Trova il Vino</span>
          </button>
        </form>

        <div className="dish-quick-examples">
          <span className="dish-quick-label">Ricerche frequenti:</span>
          {QUICK_DISHES.map((dish) => (
            <button
              key={dish}
              type="button"
              className={`filter-chip ${activeDish.toLowerCase() === dish.toLowerCase() && !selectedFoodId ? 'is-selected' : ''}`}
              onClick={() => selectQuickDish(dish)}
            >
              {dish}
            </button>
          ))}
        </div>

        {meta?.modifiers && (
          <div className="modifier-bar">
            <span className="dish-quick-label" style={{ alignSelf: 'center' }}>
              Preparazione / Condimento:
            </span>
            <button
              type="button"
              className={`filter-chip ${modifier === '' ? 'is-selected' : ''}`}
              onClick={() => setModifier('')}
            >
              Standard
            </button>
            {meta.modifiers.map((m) => (
              <button
                key={m.id}
                type="button"
                className={`filter-chip ${modifier === m.id ? 'is-selected' : ''}`}
                onClick={() => setModifier(modifier === m.id ? '' : m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category strip */}
      {meta?.foods && (
        <div className="food-category-strip" aria-label="Categorie gastronomiche">
          {meta.foods.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`filter-chip ${selectedFoodId === f.id ? 'is-selected' : ''}`}
              onClick={() => selectFoodCategory(f.id, f.label)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {context && (
        <div className="sommelier-rationale-banner">
          <Sparkles size={20} className="rationale-icon" />
          <div>
            <h2 className="rationale-heading">
              Abbinamento: {context.label}
              {context.modifier ? ` · ${context.modifier}` : ''}
            </h2>
            <p className="rationale-copy">{context.sommelierNote}</p>
            <div className="tabular" style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: 'var(--ink-muted)' }}>
              {totalMatches.toLocaleString('it-IT')} etichette compatibili ordinate per affinità
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <SkeletonGrid count={8} />
      ) : wines.length === 0 ? (
        <div className="empty-state">
          <h2 className="empty-state-title">Nessun abbinamento trovato per questa combinazione</h2>
          <p className="empty-state-copy">
            Prova a rimuovere il filtro per paese o scegli una categoria gastronomica più ampia.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setCountryFilter('');
              setModifier('');
            }}
          >
            Mostra tutti i vini abbinati
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
              <button type="button" className="btn btn-secondary" onClick={loadMore}>
                Carica altri abbinamenti
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
