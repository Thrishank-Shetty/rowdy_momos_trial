const FILTERS = [
  { key: 'vegOnly', label: '🟢 Veg Only' },
  { key: 'nonVegOnly', label: '🔴 Non-Veg Only' },
  { key: 'availableOnly', label: '✅ Available' },
  { key: 'bestsellerOnly', label: '🔥 Bestseller' },
];

export default function FilterPanel({ filters, onToggle }) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const isActive = filters[f.key];
        return (
          <button
            key={f.key}
            type="button"
            onClick={() => onToggle(f.key)}
            aria-pressed={isActive}
            className={`rounded-full border-2 px-3 py-1.5 text-xs font-bold transition-colors ${
              isActive
                ? 'border-mustard bg-mustard text-charcoal'
                : 'border-charcoal/10 bg-white text-charcoal/60 hover:border-mustard/50'
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
