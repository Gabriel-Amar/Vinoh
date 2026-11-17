import { useState } from 'react';
import { Bookmark, Download, Minus, Plus, Star, Trash2, Upload } from 'lucide-react';
import type { CellarEntry, Wine } from '../types';
import { WineBottleFallback } from './WineBottleFallback';

interface CellarViewProps {
  cellarMap: Record<string, CellarEntry>;
  onSelectWine: (wine: Wine) => void;
  onUpdateCellar: (wine: Wine, patch: Partial<Omit<CellarEntry, 'wine' | 'addedAt'>>) => void;
  onRemoveCellar: (wineId: string) => void;
  onImportCellar: (entries: Record<string, CellarEntry>) => void;
  onGoToCatalog: () => void;
}

export function CellarView({
  cellarMap,
  onSelectWine,
  onUpdateCellar,
  onRemoveCellar,
  onImportCellar,
  onGoToCatalog,
}: CellarViewProps) {
  const [filterMode, setFilterMode] = useState<'all' | 'stock' | 'favorites'>('all');

  const entries = Object.values(cellarMap).sort(
    (a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
  );

  const filtered = entries.filter((entry) => {
    if (filterMode === 'stock') return entry.bottles > 0;
    if (filterMode === 'favorites') return entry.favorite;
    return entry.favorite || entry.bottles > 0 || entry.notes.trim().length > 0;
  });

  const totalBottles = entries.reduce((sum, e) => sum + (e.bottles || 0), 0);
  const estimatedValue = entries.reduce(
    (sum, e) => sum + (e.bottles || 0) * (e.wine.priceEur || 0),
    0
  );

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(cellarMap, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whatwine-cantina-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed && typeof parsed === 'object') {
          onImportCellar(parsed);
        }
      } catch {
        // Ignore invalid JSON file
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <section aria-label="La mia cantina personale">
      <div className="view-header">
        <div>
          <h1 className="view-title">La Mia Cantina</h1>
          <p className="view-subtitle">
            Gestisci le bottiglie in stock, salva le etichette preferite e conserva le tue note di degustazione personali.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleExport}
            disabled={entries.length === 0}
          >
            <Download size={15} />
            <span>Esporta JSON</span>
          </button>

          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            <Upload size={15} />
            <span>Importa JSON</span>
            <input
              type="file"
              accept="application/json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </label>
        </div>
      </div>

      {/* Concise summary strip */}
      <div className="status-bar" style={{ background: 'var(--bg-rail)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--hairline)' }}>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <span className="tabular">
            Etichette salvate: <strong>{entries.length}</strong>
          </span>
          <span className="tabular">
            Bottiglie in cantina: <strong>{totalBottles}</strong>
          </span>
          {estimatedValue > 0 && (
            <span className="tabular">
              Valore stimato: <strong>{estimatedValue.toFixed(2).replace('.', ',')} €</strong>
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            type="button"
            className={`filter-chip ${filterMode === 'all' ? 'is-selected' : ''}`}
            onClick={() => setFilterMode('all')}
          >
            Tutte
          </button>
          <button
            type="button"
            className={`filter-chip ${filterMode === 'stock' ? 'is-selected' : ''}`}
            onClick={() => setFilterMode('stock')}
          >
            In stock
          </button>
          <button
            type="button"
            className={`filter-chip ${filterMode === 'favorites' ? 'is-selected' : ''}`}
            onClick={() => setFilterMode('favorites')}
          >
            Preferiti
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <Bookmark size={28} color="var(--accent)" strokeWidth={1.6} />
          <h2 className="empty-state-title">La tua cantina è ancora vuota</h2>
          <p className="empty-state-copy">
            Esplora il catalogo infinito o la ricerca cibo → vino e clicca “Salva” su qualsiasi bottiglia per iniziare a costruire la tua collezione.
          </p>
          <button type="button" className="btn btn-primary" onClick={onGoToCatalog}>
            Esplora il catalogo
          </button>
        </div>
      ) : (
        <div className="wine-grid">
          {filtered.map((entry) => {
            const { wine } = entry;
            return (
              <article key={wine.id} className="wine-card">
                <button
                  type="button"
                  className="wine-card-trigger"
                  onClick={() => onSelectWine(wine)}
                >
                  <div className="wine-stage" style={{ height: '160px' }}>
                    <span className="wine-type-pill">
                      <span className={`type-dot ${wine.type}`} aria-hidden="true" />
                      <span>{wine.typeLabel}</span>
                    </span>
                    {wine.imageUrl ? (
                      <img
                        src={wine.imageUrl}
                        alt={wine.name}
                        className="wine-bottle-img"
                        style={{ maxHeight: '132px' }}
                      />
                    ) : (
                      <WineBottleFallback type={wine.type} />
                    )}
                  </div>

                  <div className="wine-card-body">
                    <div className="wine-winery-row">
                      <span className="wine-winery">{wine.winery}</span>
                      {wine.vintage && <span className="tabular">{wine.vintage}</span>}
                    </div>
                    <h3 className="wine-title">{wine.name}</h3>
                    {entry.personalRating > 0 && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', marginTop: '0.2rem' }}>
                        {Array.from({ length: entry.personalRating }).map((_, idx) => (
                          <Star key={idx} size={13} className="rating-star" />
                        ))}
                        <span style={{ fontSize: '0.75rem', color: 'var(--ink-muted)', marginLeft: '0.25rem' }}>
                          Tuo voto
                        </span>
                      </div>
                    )}
                    {entry.notes && (
                      <p style={{ fontSize: '0.8rem', color: 'var(--ink-secondary)', marginTop: '0.25rem' }}>
                        “{entry.notes}”
                      </p>
                    )}
                  </div>
                </button>

                <div className="wine-card-footer">
                  <div className="card-actions-row">
                    <div className="qty-stepper">
                      <button
                        type="button"
                        className="qty-btn"
                        aria-label="Riduci bottiglia"
                        disabled={entry.bottles <= 0}
                        onClick={() =>
                          onUpdateCellar(wine, { bottles: Math.max(0, entry.bottles - 1) })
                        }
                      >
                        <Minus size={13} />
                      </button>
                      <span className="tabular" style={{ fontSize: '0.8125rem', fontWeight: 600 }}>
                        {entry.bottles} bt.
                      </span>
                      <button
                        type="button"
                        className="qty-btn"
                        aria-label="Aggiungi bottiglia"
                        onClick={() => onUpdateCellar(wine, { bottles: entry.bottles + 1 })}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      type="button"
                      className="icon-btn"
                      aria-label="Rimuovi dalla cantina"
                      onClick={() => onRemoveCellar(wine.id)}
                    >
                      <Trash2 size={14} />
                      <span>Rimuovi</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
