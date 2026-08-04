export default function CategoryTabs({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              isActive
                ? 'bg-mustard text-charcoal shadow-md'
                : 'bg-charcoal-2 text-cream-dim hover:bg-charcoal-3'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
