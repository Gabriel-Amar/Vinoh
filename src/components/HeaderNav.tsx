import { Bookmark, Compass, Sparkles, UtensilsCrossed, Wine as WineIcon } from 'lucide-react';

export type ActiveTab = 'catalog' | 'pairing' | 'cellar' | 'dinner';

interface HeaderNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  cellarCount: number;
}

export function HeaderNav({ activeTab, onTabChange, cellarCount }: HeaderNavProps) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button
          type="button"
          className="brand"
          onClick={() => onTabChange('catalog')}
          aria-label="WhatWine Home"
        >
          <span className="brand-mark" aria-hidden="true">
            <WineIcon size={18} strokeWidth={1.9} />
          </span>
          <span className="brand-wordmark">WhatWine</span>
        </button>

        <nav className="nav-tabs" aria-label="Navigazione principale">
          <button
            type="button"
            id="nav-catalog"
            className={`nav-tab ${activeTab === 'catalog' ? 'is-active' : ''}`}
            onClick={() => onTabChange('catalog')}
          >
            <Compass size={16} strokeWidth={1.8} />
            <span>Catalogo Infinito</span>
          </button>

          <button
            type="button"
            id="nav-pairing"
            className={`nav-tab ${activeTab === 'pairing' ? 'is-active' : ''}`}
            onClick={() => onTabChange('pairing')}
          >
            <UtensilsCrossed size={16} strokeWidth={1.8} />
            <span>Cibo → Vino</span>
          </button>

          <button
            type="button"
            id="nav-dinner"
            className={`nav-tab ${activeTab === 'dinner' ? 'is-active' : ''}`}
            onClick={() => onTabChange('dinner')}
          >
            <Sparkles size={16} strokeWidth={1.8} />
            <span>Percorso Cena</span>
          </button>

          <button
            type="button"
            id="nav-cellar"
            className={`nav-tab ${activeTab === 'cellar' ? 'is-active' : ''}`}
            onClick={() => onTabChange('cellar')}
          >
            <Bookmark size={16} strokeWidth={1.8} />
            <span>La Mia Cantina</span>
            {cellarCount > 0 && <span className="nav-badge tabular">{cellarCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}
