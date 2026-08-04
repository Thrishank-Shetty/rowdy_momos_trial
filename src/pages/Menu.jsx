import { useMemo, useState } from 'react';
import { useMenuData } from '../hooks/useMenuData';
import CategoryTabs from '../components/menu/CategoryTabs';
import SearchBar from '../components/menu/SearchBar';
import MenuGrid from '../components/menu/MenuGrid';
import FoodModal from '../components/menu/FoodModal';
import FilterPanel from '../components/menu/FilterPanel';
import SortSelect from '../components/menu/SortSelect';

const DEFAULT_FILTERS = {
  vegOnly: false,
  nonVegOnly: false,
  availableOnly: false,
  bestsellerOnly: false,
};

export default function Menu() {
  const { categories, menuItems, loading } = useMenuData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [activeItem, setActiveItem] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const categoryLabel = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c.label])),
    [categories]
  );

  const toggleFilter = (key) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      // Veg / Non-Veg are mutually exclusive.
      if (key === 'vegOnly' && next.vegOnly) next.nonVegOnly = false;
      if (key === 'nonVegOnly' && next.nonVegOnly) next.vegOnly = false;
      return next;
    });
  };

  const hasActiveFilters = query.trim() !== '' || Object.values(filters).some(Boolean);
  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setQuery('');
  };

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    let result = menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      if (!matchesCategory) return false;
      if (filters.vegOnly && !item.veg) return false;
      if (filters.nonVegOnly && item.veg) return false;
      if (filters.availableOnly && !item.available) return false;
      if (filters.bestsellerOnly && !item.bestseller) return false;
      if (!q) return true;
      const catLabel = categoryLabel[item.category]?.toLowerCase() || '';
      return item.name.toLowerCase().includes(q) || catLabel.includes(q);
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.variants[0].price - b.variants[0].price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.variants[0].price - a.variants[0].price);
    } else if (sortBy === 'alpha') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [menuItems, activeCategory, query, categoryLabel, filters, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-2xl sm:text-3xl text-charcoal">Our Menu</h1>
        <p className="mt-2 text-sm text-charcoal/60">Steamed, fried, saucy or sizzling — pick your rowdy.</p>
      </div>

      <div className="mb-6 max-w-md mx-auto">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="mb-6">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterPanel filters={filters} onToggle={toggleFilter} />
        <SortSelect value={sortBy} onChange={setSortBy} />
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse overflow-hidden rounded-2xl bg-charcoal-2">
              <div className="h-40 bg-charcoal-3" />
              <div className="p-4 space-y-2">
                <div className="h-3 w-3/4 rounded bg-charcoal-3" />
                <div className="h-2.5 w-full rounded bg-charcoal-3" />
                <div className="h-2.5 w-2/3 rounded bg-charcoal-3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MenuGrid
          items={filteredItems}
          onOpenDetails={setActiveItem}
          totalCount={menuItems.length}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      )}

      <FoodModal item={activeItem} isOpen={!!activeItem} onClose={() => setActiveItem(null)} />
    </div>
  );
}
