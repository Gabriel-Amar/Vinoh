import { useState } from 'react';
import { ArrowRight, Loader2, Sparkles, Thermometer, UtensilsCrossed } from 'lucide-react';
import { fetchDinnerFlight } from '../api';
import type { DinnerCourseResult, Wine } from '../types';
import { WineBottleFallback } from './WineBottleFallback';

interface DinnerBuilderViewProps {
  onSelectWine: (wine: Wine) => void;
}

const PRESET_MENUS = [
  {
    label: 'Cena Toscana Classica',
    courses: {
      Antipasto: 'Tagliere di salumi e bruschette',
      Primo: 'Pappardelle al ragù di cinghiale',
      Secondo: 'Bistecca alla fiorentina alla brace',
      Dolce: 'Torta al cioccolato fondente',
    },
  },
  {
    label: 'Menu di Mare',
    courses: {
      Antipasto: 'Ostriche e crudo di mare',
      Primo: 'Spaghetti alle vongole',
      Secondo: 'Branzino al sale',
      Dolce: 'Crostata di frutta',
    },
  },
  {
    label: 'Autunno: Funghi & Tartufo',
    courses: {
      Antipasto: 'Burrata con verdure grigliate',
      Primo: 'Risotto ai funghi porcini e tartufo',
      Secondo: 'Tagliata di manzo',
      Dolce: 'Formaggi erborinati e miele',
    },
  },
];

const COURSE_SLOTS = ['Antipasto', 'Primo', 'Secondo', 'Dolce'] as const;

export function DinnerBuilderView({ onSelectWine }: DinnerBuilderViewProps) {
  const [courses, setCourses] = useState<Record<string, string>>({
    Antipasto: 'Tagliere di salumi e formaggi freschi',
    Primo: 'Tagliatelle al ragù',
    Secondo: 'Bistecca alla brace',
    Dolce: 'Tiramisù classico',
  });
  const [flight, setFlight] = useState<DinnerCourseResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e?: React.FormEvent, customCourses?: Record<string, string>) => {
    if (e) e.preventDefault();
    const source = customCourses || courses;
    const payload = COURSE_SLOTS.map((slot) => ({
      slot,
      dish: source[slot] || '',
    })).filter((c) => c.dish.trim().length > 0);

    if (payload.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetchDinnerFlight(payload);
      setFlight(res.flight);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Impossibile generare il percorso cena.');
    } finally {
      setLoading(false);
    }
  };

  const applyPreset = (presetCourses: Record<string, string>) => {
    setCourses(presetCourses);
    handleGenerate(undefined, presetCourses);
  };

  return (
    <section aria-label="Percorso cena multi-portata">
      <div className="view-header">
        <div>
          <h1 className="view-title">Percorso Cena</h1>
          <p className="view-subtitle">
            Componi il tuo menu dall’antipasto al dolce: WhatWine orchestra una sequenza di bottiglie armonica in progressione di corpo e temperatura.
          </p>
        </div>
      </div>

      <div className="dish-hero-panel">
        <div className="dish-quick-examples">
          <span className="dish-quick-label">Menu pronti:</span>
          {PRESET_MENUS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              className="filter-chip"
              onClick={() => applyPreset(preset.courses)}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleGenerate}>
          <div className="dinner-grid">
            {COURSE_SLOTS.map((slot) => (
              <div key={slot} className="dinner-course-card">
                <label
                  htmlFor={`course-${slot}`}
                  style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <UtensilsCrossed size={14} />
                  <span>{slot}</span>
                </label>
                <input
                  id={`course-${slot}`}
                  type="text"
                  className="text-input"
                  style={{ paddingLeft: '0.85rem', paddingRight: '0.85rem' }}
                  placeholder={`Es. piatto per ${slot.toLowerCase()}...`}
                  value={courses[slot] || ''}
                  onChange={(e) =>
                    setCourses((prev) => ({ ...prev, [slot]: e.target.value }))
                  }
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? <Loader2 size={16} /> : <Sparkles size={16} />}
            <span>{loading ? 'Composizione in corso...' : 'Componi la Carta dei Vini'}</span>
          </button>
        </form>
      </div>

      {error && (
        <div className="error-banner" role="alert">
          <span>{error}</span>
        </div>
      )}

      {flight && (
        <div className="flight-timeline">
          {flight.map((step, idx) => (
            <article key={step.slot} className="wine-card" style={{ padding: '1.1rem', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="pairing-score-pill tabular">
                  Portata {idx + 1} · {step.slot}
                </span>
                {step.recommendedWine && (
                  <span style={{ fontSize: '0.78rem', color: 'var(--ink-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Thermometer size={13} />
                    {step.recommendedWine.serving.tempRange}
                  </span>
                )}
              </div>

              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink-secondary)' }}>
                  {step.dish}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginTop: '0.25rem' }}>
                  {step.context.sommelierNote}
                </p>
              </div>

              {step.recommendedWine && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '64px minmax(0, 1fr)',
                    gap: '0.85rem',
                    alignItems: 'center',
                    background: 'var(--bg-tint)',
                    border: '1px solid var(--hairline)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.75rem',
                  }}
                >
                  <div style={{ height: '86px', display: 'grid', placeItems: 'center' }}>
                    {step.recommendedWine.imageUrl ? (
                      <img
                        src={step.recommendedWine.imageUrl}
                        alt={step.recommendedWine.name}
                        style={{ maxHeight: '82px', maxWidth: '58px', objectFit: 'contain' }}
                      />
                    ) : (
                      <WineBottleFallback type={step.recommendedWine.type} />
                    )}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                      {step.recommendedWine.winery}
                    </div>
                    <h3
                      className="wine-title"
                      style={{ fontSize: '1.15rem', marginTop: '0.1rem' }}
                    >
                      {step.recommendedWine.name}
                    </h3>
                    <div style={{ marginTop: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                      <span className="tabular" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--olive)' }}>
                        {step.recommendedWine.dishMatch?.score || 92}% affinità
                      </span>
                      <button
                        type="button"
                        className="link-reset"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                        onClick={() => onSelectWine(step.recommendedWine!)}
                      >
                        <span>Dettagli</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step.alternatives.length > 0 && (
                <div style={{ fontSize: '0.78rem', color: 'var(--ink-secondary)' }}>
                  Alternative:{' '}
                  {step.alternatives.map((alt, i) => (
                    <span key={alt.id}>
                      {i > 0 ? ' · ' : ''}
                      <button
                        type="button"
                        className="link-reset"
                        style={{ padding: 0, fontSize: '0.78rem' }}
                        onClick={() => onSelectWine(alt)}
                      >
                        {alt.name}
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
