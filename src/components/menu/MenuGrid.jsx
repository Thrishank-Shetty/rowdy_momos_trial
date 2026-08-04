import MenuCard from './MenuCard';
import EmptyState from '../common/EmptyState';

export default function MenuGrid({ items, onOpenDetails, totalCount, hasActiveFilters, onClearFilters }) {
  if (totalCount === 0) {
    return (
      <EmptyState
        icon="🚫"
        title="Menu Unavailable"
        subtitle="We couldn't load the menu right now. Please check back in a bit."
      />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🥟"
        title="No Search Results"
        subtitle="Nothing matches your search or filters. Try a different term or clear your filters."
        action={
          hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="rounded-full bg-mustard px-5 py-2 text-xs font-bold text-charcoal hover:bg-chili hover:text-cream transition-colors"
            >
              Clear Filters
            </button>
          )
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} onOpenDetails={onOpenDetails} />
      ))}
    </div>
  );
}
