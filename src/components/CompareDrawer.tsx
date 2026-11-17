import { GitCompareArrows, Star, X } from 'lucide-react';
import type { Wine } from '../types';

interface CompareDockProps {
  wines: Wine[];
  onOpenCompare: () => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CompareDock({ wines, onOpenCompare, onRemove, onClear }: CompareDockProps) {
  if (wines.length === 0) return null;

  return (
    <div className="compare-dock" role="region" aria-label="Barra di confronto vini">
      <div className="compare-dock-items">
        {wines.map((w) => (
          <span key={w.id} className="compare-pill">
            <span>{w.name.slice(0, 24)}{w.name.length > 24 ? '…' : ''}</span>
            <button
              type="button"
              aria-label={`Rimuovi ${w.name} dal confronto`}
              onClick={() => onRemove(w.id)}
            >
              <X size={13} />
            </button>
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
        <button
          type="button"
          className="btn btn-primary"
          style={{ padding: '0.4rem 0.85rem', fontSize: '0.8125rem' }}
          disabled={wines.length < 2}
          onClick={onOpenCompare}
        >
          <GitCompareArrows size={14} />
          <span>Confronta ({wines.length}/3)</span>
        </button>

        <button
          type="button"
          className="btn btn-ghost"
          style={{ color: '#FAF7F2', padding: '0.4rem 0.65rem', fontSize: '0.8rem' }}
          onClick={onClear}
        >
          Svuota
        </button>
      </div>
    </div>
  );
}

interface CompareDrawerProps {
  open: boolean;
  wines: Wine[];
  onClose: () => void;
  onSelectWine: (wine: Wine) => void;
}

export function CompareDrawer({ open, wines, onClose, onSelectWine }: CompareDrawerProps) {
  if (!open || wines.length === 0) return null;

  return (
    <div
      className="drawer-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Confronto dettagliato bottiglie"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <aside className="drawer-panel" style={{ width: 'min(880px, 100vw)' }}>
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <GitCompareArrows size={18} color="var(--accent)" />
            <span>Confronto Bottiglie ({wines.length})</span>
          </div>
          <button type="button" className="drawer-close" onClick={onClose} aria-label="Chiudi confronto">
            <X size={18} />
          </button>
        </div>

        <div className="drawer-scroll">
          <div className="compare-table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>Caratteristica</th>
                  {wines.map((w) => (
                    <th key={w.id} style={{ background: 'var(--bg-surface)', color: 'var(--ink-primary)' }}>
                      <button
                        type="button"
                        className="link-reset"
                        style={{ padding: 0, textAlign: 'left', fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700 }}
                        onClick={() => {
                          onClose();
                          onSelectWine(w);
                        }}
                      >
                        {w.name}
                      </button>
                      <div style={{ fontSize: '0.78rem', fontWeight: 400, color: 'var(--ink-muted)' }}>
                        {w.winery}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Tipologia</th>
                  {wines.map((w) => (
                    <td key={w.id}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span className={`type-dot ${w.type}`} />
                        {w.typeLabel}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Origine</th>
                  {wines.map((w) => (
                    <td key={w.id}>{[w.region, w.country].filter(Boolean).join(', ') || '—'}</td>
                  ))}
                </tr>
                <tr>
                  <th>Valutazione</th>
                  {wines.map((w) => (
                    <td key={w.id} className="tabular">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                        <Star size={14} className="rating-star" />
                        {w.rating.toFixed(1)}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Prezzo medio</th>
                  {wines.map((w) => (
                    <td key={w.id} className="tabular">
                      {w.priceEur ? `${w.priceEur.toFixed(2).replace('.', ',')} €` : 'n.d.'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Corpo</th>
                  {wines.map((w) => (
                    <td key={w.id} className="tabular">{w.structure.body.toFixed(1)} / 5</td>
                  ))}
                </tr>
                <tr>
                  <th>Acidità</th>
                  {wines.map((w) => (
                    <td key={w.id} className="tabular">{w.structure.acidity.toFixed(1)} / 5</td>
                  ))}
                </tr>
                <tr>
                  <th>Tannini</th>
                  {wines.map((w) => (
                    <td key={w.id} className="tabular">{w.structure.tannins.toFixed(1)} / 5</td>
                  ))}
                </tr>
                <tr>
                  <th>Temperatura</th>
                  {wines.map((w) => (
                    <td key={w.id} className="tabular">{w.serving.tempRange}</td>
                  ))}
                </tr>
                <tr>
                  <th>Abbinamenti</th>
                  {wines.map((w) => (
                    <td key={w.id}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {w.pairings.slice(0, 3).map((p) => (
                          <span key={p.id} className="pairing-tag">
                            {p.label}
                          </span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </aside>
    </div>
  );
}
