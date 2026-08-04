import { Link } from 'react-router-dom';
import { useMenuData } from '../hooks/useMenuData';
import TableBadge from '../components/common/TableBadge';
import MenuCard from '../components/menu/MenuCard';
import FoodModal from '../components/menu/FoodModal';
import Button from '../components/common/Button';
import { useState } from 'react';

export default function Home() {
  const { restaurant, table, menuItems, loading } = useMenuData();
  const [activeItem, setActiveItem] = useState(null);

  const bestsellers = menuItems.filter((i) => i.bestseller).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <div className="absolute inset-0 opacity-[0.22]">
          <img
            src="https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=1600&q=70"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        {/* Radial glow + top-to-bottom fade for legibility over the photo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgb(221_162_62/0.20),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-transparent to-charcoal" />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 text-center">
          <div className="relative mx-auto mb-5 w-fit animate-fade-up">
            <span className="block text-6xl leading-none">🥟</span>
            <span className="pointer-events-none absolute -top-1 right-0 flex translate-x-2 gap-1 opacity-70">
              <span className="steam-wisp block h-3 w-1 rounded-full bg-cream/70" />
              <span className="steam-wisp block h-4 w-1 rounded-full bg-cream/70" />
              <span className="steam-wisp block h-3 w-1 rounded-full bg-cream/70" />
            </span>
          </div>

          <h1
            className="font-display text-4xl sm:text-6xl leading-tight text-cream animate-fade-up"
            style={{ animationDelay: '80ms' }}
          >
            {restaurant?.name || 'Rowdy Momos Cafe'}
          </h1>
          {restaurant?.nameLocal && (
            <p
              className="mt-2 text-mustard text-sm sm:text-base font-semibold animate-fade-up"
              style={{ animationDelay: '150ms' }}
            >
              {restaurant.nameLocal}
            </p>
          )}

          {!loading && table && (
            <div className="mt-6 flex justify-center animate-fade-up" style={{ animationDelay: '210ms' }}>
              <TableBadge tableNumber={table.tableNumber} />
            </div>
          )}

          <p
            className="mt-5 text-cream-dim text-sm sm:text-lg max-w-xl mx-auto animate-fade-up"
            style={{ animationDelay: '270ms' }}
          >
            {restaurant?.tagline}
          </p>

          <div className="mt-9 animate-fade-up" style={{ animationDelay: '340ms' }}>
            <Button as={Link} to="/menu" size="lg">
              Browse Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-chili">Crowd favourites</p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl text-charcoal">🔥 Rowdy Favourites</h2>
            </div>
            <Link
              to="/menu"
              className="shrink-0 text-sm font-bold text-chili transition-colors hover:text-chili-dark hover:underline underline-offset-4"
            >
              View Full Menu →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {bestsellers.map((item) => (
              <MenuCard key={item.id} item={item} onOpenDetails={setActiveItem} />
            ))}
          </div>
        </section>
      )}

      <FoodModal item={activeItem} isOpen={!!activeItem} onClose={() => setActiveItem(null)} />
    </div>
  );
}
