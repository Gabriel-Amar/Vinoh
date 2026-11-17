import { useState } from 'react';
import { Bookmark, GitCompareArrows, MapPin, Star, UtensilsCrossed } from 'lucide-react';
import type { Wine } from '../types';
import { WineBottleFallback } from './WineBottleFallback';

interface WineCardProps {
  wine: Wine;
  inCellar: boolean;
  isCompared: boolean;
  onSelect: (wine: Wine) => void;
  onToggleCellar: (wine: Wine) => void;
  onToggleCompare: (wine: Wine) => void;
}

export function WineCard({
  wine,
  inCellar,
  isCompared,
  onSelect,
  onToggleCellar,
  onToggleCompare,
}: WineCardProps) {
  const [imgError, setImgError] = useState(false);

  const originText = [wine.region, wine.country].filter(Boolean).join(', ');

  return (
    <article className="wine-card">
      <button
        type="button"
        className="wine-card-trigger"
        onClick={() => onSelect(wine)}
        aria-label={`Apri scheda sommelier di ${wine.name}`}
      >
        <div className="wine-stage">
          <span className="wine-type-pill">
            <span className={`type-dot ${wine.type}`} aria-hidden="true" />
            <span>{wine.typeLabel}</span>
          </span>

          {wine.dishMatch && (
            <span className="match-badge tabular">
              {wine.dishMatch.score}% affinità
            </span>
          )}

          {wine.imageUrl && !imgError ? (
            <img
              src={wine.imageUrl}
              alt={`Bottiglia ${wine.name}`}
              className="wine-bottle-img"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <WineBottleFallback type={wine.type} />
          )}
        </div>

        <div className="wine-card-body">
          <div className="wine-winery-row">
            <span className="wine-winery">{wine.winery || 'Cantina selezionata'}</span>
            {wine.vintage && <span className="tabular">{wine.vintage}</span>}
          </div>

          <h3 className="wine-title">{wine.name}</h3>

          {originText && (
            <div className="wine-origin">
              <MapPin size={13} strokeWidth={1.8} />
              <span>{originText}</span>
            </div>
          )}

          <div className="wine-metrics-row">
            <span className="rating-pill tabular">
              <Star size={14} className="rating-star" />
              <span>{wine.rating.toFixed(1)}</span>
              {wine.reviewsCount > 0 && (
                <span className="rating-count">
                  ({wine.reviewsCount.toLocaleString('it-IT')})
                </span>
              )}
            </span>

            <span className="wine-price tabular">
              {wine.priceEur ? `${wine.priceEur.toFixed(2).replace('.', ',')} €` : 'Prezzo n.d.'}
            </span>
          </div>
        </div>
      </button>

      <div className="wine-card-footer">
        <div className="pairing-preview-row" aria-label="Abbinamenti principali">
          {wine.pairings.slice(0, 2).map((p) => (
            <span key={p.id} className="pairing-tag">
              <UtensilsCrossed size={11} strokeWidth={1.8} />
              <span>{p.label}</span>
            </span>
          ))}
        </div>

        <div className="card-actions-row">
          <button
            type="button"
            className={`icon-btn ${inCellar ? 'is-active' : ''}`}
            onClick={() => onToggleCellar(wine)}
            aria-pressed={inCellar}
          >
            <Bookmark size={13} strokeWidth={1.9} fill={inCellar ? 'currentColor' : 'none'} />
            <span>{inCellar ? 'In Cantina' : 'Salva'}</span>
          </button>

          <button
            type="button"
            className={`icon-btn ${isCompared ? 'is-compare' : ''}`}
            onClick={() => onToggleCompare(wine)}
            aria-pressed={isCompared}
          >
            <GitCompareArrows size={13} strokeWidth={1.9} />
            <span>{isCompared ? 'Nel Confronto' : 'Confronta'}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
