import { useEffect, useState } from 'react';
import { fetchMeta } from './api';
import { CatalogView } from './components/CatalogView';
import { CellarView } from './components/CellarView';
import { CompareDock, CompareDrawer } from './components/CompareDrawer';
import { DinnerBuilderView } from './components/DinnerBuilderView';
import { HeaderNav, type ActiveTab } from './components/HeaderNav';
import { ReversePairingView } from './components/ReversePairingView';
import { WineDetailDrawer } from './components/WineDetailDrawer';
import type { CellarEntry, MetaResponse, Wine } from './types';

const CELLAR_STORAGE_KEY = 'whatwine.cellar.v1';

function loadCellar(): Record<string, CellarEntry> {
  try {
    const raw = localStorage.getItem(CELLAR_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('catalog');
  const [meta, setMeta] = useState<MetaResponse | null>(null);

  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [reverseFoodId, setReverseFoodId] = useState<number | null>(null);
  const [reverseDish, setReverseDish] = useState<string>('');

  const [cellarMap, setCellarMap] = useState<Record<string, CellarEntry>>(loadCellar);
  const [compareWines, setCompareWines] = useState<Wine[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);

  useEffect(() => {
    fetchMeta()
      .then(setMeta)
      .catch(() => {});
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CELLAR_STORAGE_KEY, JSON.stringify(cellarMap));
    } catch {
      // Ignore storage quota errors
    }
  }, [cellarMap]);

  const handleToggleCellar = (wine: Wine) => {
    setCellarMap((prev) => {
      const existing = prev[wine.id];
      if (existing && (existing.favorite || existing.bottles > 0)) {
        const next = { ...prev };
        delete next[wine.id];
        return next;
      }
      return {
        ...prev,
        [wine.id]: {
          wine,
          favorite: true,
          bottles: existing?.bottles || 1,
          personalRating: existing?.personalRating || 0,
          notes: existing?.notes || '',
          addedAt: new Date().toISOString(),
        },
      };
    });
  };

  const handleUpdateCellar = (
    wine: Wine,
    patch: Partial<Omit<CellarEntry, 'wine' | 'addedAt'>>
  ) => {
    setCellarMap((prev) => {
      const existing = prev[wine.id];
      const nextEntry: CellarEntry = {
        wine,
        favorite: existing?.favorite ?? false,
        bottles: existing?.bottles ?? 0,
        personalRating: existing?.personalRating ?? 0,
        notes: existing?.notes ?? '',
        addedAt: existing?.addedAt || new Date().toISOString(),
        ...patch,
      };
      if (!nextEntry.favorite && nextEntry.bottles <= 0 && !nextEntry.notes.trim() && nextEntry.personalRating === 0) {
        const copy = { ...prev };
        delete copy[wine.id];
        return copy;
      }
      return { ...prev, [wine.id]: nextEntry };
    });
  };

  const handleRemoveCellar = (wineId: string) => {
    setCellarMap((prev) => {
      const copy = { ...prev };
      delete copy[wineId];
      return copy;
    });
  };

  const handleImportCellar = (imported: Record<string, CellarEntry>) => {
    setCellarMap((prev) => ({ ...prev, ...imported }));
  };

  const handleToggleCompare = (wine: Wine) => {
    setCompareWines((prev) => {
      if (prev.some((w) => w.id === wine.id)) {
        return prev.filter((w) => w.id !== wine.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), wine];
      }
      return [...prev, wine];
    });
  };

  const handleJumpToFood = (foodId: number, label: string) => {
    setSelectedWine(null);
    setReverseFoodId(foodId);
    setReverseDish(label);
    setActiveTab('pairing');
  };

  const cellarCount = Object.values(cellarMap).filter(
    (e) => e.favorite || e.bottles > 0
  ).length;

  const compareIds = compareWines.map((w) => w.id);

  return (
    <div className="app-shell">
      <HeaderNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        cellarCount={cellarCount}
      />

      <main className="main-container">
        {activeTab === 'catalog' && (
          <CatalogView
            meta={meta}
            cellarMap={cellarMap}
            compareIds={compareIds}
            onSelectWine={setSelectedWine}
            onToggleCellar={handleToggleCellar}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {activeTab === 'pairing' && (
          <ReversePairingView
            key={`${reverseFoodId ?? ''}:${reverseDish}`}
            meta={meta}
            initialFoodId={reverseFoodId}
            initialDish={reverseDish}
            cellarMap={cellarMap}
            compareIds={compareIds}
            onSelectWine={setSelectedWine}
            onToggleCellar={handleToggleCellar}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {activeTab === 'dinner' && (
          <DinnerBuilderView onSelectWine={setSelectedWine} />
        )}

        {activeTab === 'cellar' && (
          <CellarView
            cellarMap={cellarMap}
            onSelectWine={setSelectedWine}
            onUpdateCellar={handleUpdateCellar}
            onRemoveCellar={handleRemoveCellar}
            onImportCellar={handleImportCellar}
            onGoToCatalog={() => setActiveTab('catalog')}
          />
        )}
      </main>

      <WineDetailDrawer
        wine={selectedWine}
        cellarEntry={selectedWine ? cellarMap[selectedWine.id] || null : null}
        isCompared={selectedWine ? compareIds.includes(selectedWine.id) : false}
        onClose={() => setSelectedWine(null)}
        onSearchFood={handleJumpToFood}
        onUpdateCellar={handleUpdateCellar}
        onToggleCompare={handleToggleCompare}
      />

      <CompareDock
        wines={compareWines}
        onOpenCompare={() => setCompareOpen(true)}
        onRemove={(id) => setCompareWines((prev) => prev.filter((w) => w.id !== id))}
        onClear={() => setCompareWines([])}
      />

      <CompareDrawer
        open={compareOpen}
        wines={compareWines}
        onClose={() => setCompareOpen(false)}
        onSelectWine={setSelectedWine}
      />
    </div>
  );
}
