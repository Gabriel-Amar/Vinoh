import type { WineTypeKey } from '../types';

const BOTTLE_ACCENT: Record<WineTypeKey, string> = {
  red: '#7B1E2B',
  white: '#C79B3B',
  sparkling: '#A98A3F',
  rose: '#C56B75',
  dessert: '#AF6D22',
  port: '#4A151E',
};

export function WineBottleFallback({ type }: { type: WineTypeKey }) {
  const foilColor = BOTTLE_ACCENT[type] || '#7B1E2B';
  return (
    <svg
      width="56"
      height="148"
      viewBox="0 0 56 148"
      fill="none"
      aria-hidden="true"
    >
      <rect x="22" y="6" width="12" height="28" rx="3" fill={foilColor} />
      <path
        d="M22 34c0 11-11 16-11 32v70a6 6 0 0 0 6 6h22a6 6 0 0 0 6-6V66c0-16-11-21-11-32H22Z"
        fill="#2A201E"
      />
      <rect x="15" y="76" width="26" height="36" rx="2" fill="#FAF7F2" />
      <line x1="20" y1="88" x2="36" y2="88" stroke={foilColor} strokeWidth="2" />
      <line x1="20" y1="95" x2="32" y2="95" stroke="#5C4B45" strokeWidth="1.4" />
    </svg>
  );
}
