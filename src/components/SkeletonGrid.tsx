export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="wine-grid" aria-busy="true" aria-label="Caricamento vini">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-block skeleton-stage" />
          <div className="skeleton-block skeleton-line short" />
          <div className="skeleton-block skeleton-line long" />
          <div className="skeleton-block skeleton-line medium" />
        </div>
      ))}
    </div>
  );
}
