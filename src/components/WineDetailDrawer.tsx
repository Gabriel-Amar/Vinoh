import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bookmark,
  Clock,
  GitCompareArrows,
  GlassWater,
  MapPin,
  Minus,
  Plus,
  Sparkles,
  Star,
  Thermometer,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import type { CellarEntry, Wine } from '../types';
import { WineBottleFallback } from './WineBottleFallback';

interface WineDetailDrawerProps {
  wine: Wine | null;
  cellarEntry: CellarEntry | null;
  isCompared: boolean;
  onClose: () => void;
  onSearchFood: (foodId: number, label: string) => void;
  onUpdateCellar: (wine: Wine, patch: Partial<Omit<CellarEntry, 'wine' | 'addedAt'>>) => void;
  onToggleCompare: (wine: Wine) => void;
}

export function WineDetailDrawer({
  wine,
  cellarEntry,
  isCompared,
  onClose,
  onSearchFood,
  onUpdateCellar,
  onToggleCompare,
}: WineDetailDrawerProps) {
  const [failedImgWineId, setFailedImgWineId] = useState<string | null>(null);
  const imgError = wine ? failedImgWineId === wine.id : false;

  useEffect(() => {
    if (!wine) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [wine, onClose]);

  if (!wine) return null;

  const isSaved = Boolean(cellarEntry?.favorite || (cellarEntry?.bottles ?? 0) > 0);
  const bottles = cellarEntry?.bottles ?? 0;
  const personalRating = cellarEntry?.personalRating ?? 0;
  const notes = cellarEntry?.notes ?? '';

  const structureRows = [
    { key: 'body', label: 'Corpo e struttura', value: wine.structure.body },
    { key: 'acidity', label: 'Acidità / Freschezza', value: wine.structure.acidity },
    { key: 'tannins', label: 'Tannini', value: wine.structure.tannins },
    { key: 'sweetness', label: 'Dolcezza', value: wine.structure.sweetness },
  ];

  return (
    <div
      className="drawer-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-wine-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="drawer-panel">
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className={`type-dot ${wine.type}`} aria-hidden="true" />
            <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>
              {wine.typeLabel}
              {wine.vintage ? ` · ${wine.vintage}` : ''}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className={`icon-btn ${isCompared ? 'is-compare' : ''}`}
              onClick={() => onToggleCompare(wine)}
            >
              <GitCompareArrows size={14} />
              <span>{isCompared ? 'Nel Confronto' : 'Confronta'}</span>
            </button>

            <button
              type="button"
              className="drawer-close"
              onClick={onClose}
              aria-label="Chiudi scheda vino"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="drawer-scroll">
          <section className="drawer-hero">
            <div className="drawer-bottle-box">
              {wine.imageUrl && !imgError ? (
                <img
                  src={wine.imageUrl}
                  alt={`Bottiglia ${wine.name}`}
                  onError={() => setFailedImgWineId(wine.id)}
                />
              ) : (
                <WineBottleFallback type={wine.type} />
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
              <span style={{ fontSize: '0.84rem', color: 'var(--ink-secondary)', fontWeight: 600 }}>
                {wine.winery}
              </span>
              <h2 id="drawer-wine-heading" className="drawer-wine-title">
                {wine.name}
              </h2>

              <div className="wine-origin">
                <MapPin size={14} strokeWidth={1.8} />
                <span>{[wine.region, wine.country].filter(Boolean).join(', ') || 'Origine internazionale'}</span>
              </div>

              {wine.grapes.length > 0 && (
                <div style={{ fontSize: '0.82rem', color: 'var(--ink-secondary)' }}>
                  Vitigni: <strong>{wine.grapes.join(', ')}</strong>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                <span className="rating-pill tabular">
                  <Star size={15} className="rating-star" />
                  <span>{wine.rating.toFixed(1)} / 5</span>
                  {wine.reviewsCount > 0 && (
                    <span className="rating-count">
                      ({wine.reviewsCount.toLocaleString('it-IT')} recensioni)
                    </span>
                  )}
                </span>

                {wine.priceEur && (
                  <span className="wine-price tabular">
                    {wine.priceEur.toFixed(2).replace('.', ',')} €
                  </span>
                )}
              </div>
            </div>
          </section>

          {wine.dishMatch && (
            <section className="sommelier-rationale-banner" style={{ marginBottom: 0 }}>
              <Sparkles size={18} className="rationale-icon" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--olive)' }}>
                  Affinità gastronomica: {wine.dishMatch.score}%
                </div>
                <p className="rationale-copy">{wine.dishMatch.rationale}</p>
              </div>
            </section>
          )}

          {/* Food Pairings */}
          <section>
            <h3 className="drawer-section-title">
              <UtensilsCrossed size={16} strokeWidth={1.9} />
              <span>Abbinamenti gastronomici consigliati</span>
            </h3>
            <div className="pairing-list">
              {wine.pairings.map((pairing) => (
                <div key={pairing.id} className="pairing-detail-row">
                  <div className="pairing-detail-top">
                    <span className="pairing-detail-title">{pairing.label}</span>
                    <span className="pairing-score-pill tabular">{pairing.matchScore}% match</span>
                  </div>
                  <div className="pairing-dishes-text">
                    Piatti ideali: {pairing.dishes.join(' · ')}
                  </div>
                  <p className="pairing-why-text">{pairing.rationale}</p>
                  <div style={{ marginTop: '0.25rem' }}>
                    <button
                      type="button"
                      className="link-reset"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', paddingLeft: 0 }}
                      onClick={() => onSearchFood(pairing.id, pairing.label)}
                    >
                      <span>Esplora altri vini per {pairing.label.toLowerCase()}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sensory Profile */}
          <section>
            <h3 className="drawer-section-title">
              <Sparkles size={16} strokeWidth={1.9} />
              <span>Profilo organolettico e aromi</span>
            </h3>

            <div className="sensory-grid">
              {structureRows.map((row) => (
                <div key={row.key} className="sensory-item">
                  <div className="sensory-head">
                    <span className="sensory-name">{row.label}</span>
                    <span className="sensory-val tabular">{row.value.toFixed(1)} / 5</span>
                  </div>
                  <div className="sensory-track">
                    <div
                      className="sensory-fill"
                      style={{ width: `${Math.min(100, (row.value / 5) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {wine.flavorNotes.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.9rem' }}>
                {wine.flavorNotes.map((note) => (
                  <span key={note} className="pairing-tag">
                    {note}
                  </span>
                ))}
              </div>
            )}

            {wine.styleDescription && (
              <p
                style={{
                  marginTop: '0.85rem',
                  fontSize: '0.85rem',
                  color: 'var(--ink-secondary)',
                  maxWidth: '65ch',
                }}
              >
                {wine.styleDescription}
              </p>
            )}
          </section>

          {/* Serving Advice */}
          <section>
            <h3 className="drawer-section-title">
              <Thermometer size={16} strokeWidth={1.9} />
              <span>Servizio da Sommelier</span>
            </h3>
            <div className="serving-grid">
              <div className="serving-cell">
                <div className="serving-cell-label">Temperatura di servizio</div>
                <div className="serving-cell-value tabular">{wine.serving.tempRange}</div>
              </div>
              <div className="serving-cell">
                <div className="serving-cell-label">Calice ideale</div>
                <div className="serving-cell-value">{wine.serving.glassType}</div>
              </div>
              <div className="serving-cell">
                <div className="serving-cell-label">Ossigenazione / Decanter</div>
                <div className="serving-cell-value">{wine.serving.decanting}</div>
              </div>
              <div className="serving-cell">
                <div className="serving-cell-label">Invecchiamento</div>
                <div className="serving-cell-value">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={13} />
                    <span>{wine.serving.agingPotential}</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Personal Cellar Controls */}
          <section className="cellar-box">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.6rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', fontWeight: 700, fontSize: '0.9375rem' }}>
                <GlassWater size={16} color="var(--accent)" />
                <span>La Mia Cantina &amp; Note</span>
              </div>

              <button
                type="button"
                className={`btn ${isSaved ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.42rem 0.8rem', fontSize: '0.8125rem' }}
                onClick={() => onUpdateCellar(wine, { favorite: !cellarEntry?.favorite })}
              >
                <Bookmark size={14} fill={cellarEntry?.favorite ? 'currentColor' : 'none'} />
                <span>{cellarEntry?.favorite ? 'Preferito' : 'Aggiungi ai Preferiti'}</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ink-secondary)', marginBottom: '0.25rem' }}>
                  Bottiglie in cantina
                </div>
                <div className="qty-stepper">
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label="Riduci bottiglie"
                    disabled={bottles <= 0}
                    onClick={() => onUpdateCellar(wine, { bottles: Math.max(0, bottles - 1) })}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="tabular" style={{ minWidth: '1.8rem', textAlign: 'center', fontWeight: 600 }}>
                    {bottles}
                  </span>
                  <button
                    type="button"
                    className="qty-btn"
                    aria-label="Aggiungi bottiglia"
                    onClick={() => onUpdateCellar(wine, { bottles: bottles + 1, favorite: true })}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--ink-secondary)', marginBottom: '0.25rem' }}>
                  La tua valutazione
                </div>
                <div style={{ display: 'inline-flex', gap: '0.25rem' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="qty-btn"
                      aria-label={`Valuta ${star} stelle`}
                      onClick={() => onUpdateCellar(wine, { personalRating: star, favorite: true })}
                    >
                      <Star
                        size={17}
                        color={star <= personalRating ? 'var(--brass)' : 'var(--ink-muted)'}
                        fill={star <= personalRating ? 'var(--brass)' : 'none'}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="cellar-notes-input"
                style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--ink-secondary)', marginBottom: '0.3rem' }}
              >
                Note di degustazione personali
              </label>
              <textarea
                id="cellar-notes-input"
                className="textarea-control"
                placeholder="Annota profumi, occasione, anno di apertura ideale o con cosa l'hai abbinato..."
                value={notes}
                onChange={(e) => onUpdateCellar(wine, { notes: e.target.value })}
              />
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}
