import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar({ restaurant }) {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount, openCart } = useCart();

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-cream/10 bg-charcoal/80 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-charcoal/65">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="text-2xl leading-none">🥟</span>
          <span className="font-display text-base sm:text-lg text-cream leading-none">
            {restaurant?.name || 'Rowdy Momos Cafe'}
          </span>
        </NavLink>

        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className="group relative py-1.5" end={link.to === '/'}>
              {({ isActive }) => (
                <>
                  <span
                    className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                      isActive ? 'text-mustard' : 'text-cream/85 group-hover:text-cream'
                    }`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left rounded-full bg-mustard transition-transform duration-300 ease-out ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-40'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-cream/8 text-cream transition-all duration-200 hover:bg-mustard hover:text-charcoal active:scale-90"
          >
            🛒
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-chili text-[11px] font-bold text-cream ring-2 ring-charcoal animate-fade-in">
                {itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-cream/8 text-cream transition-transform active:scale-90"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile slide-out nav — portaled to <body> so it isn't trapped by the
          header's backdrop-blur containing block (fixed positioning inside a
          filter/backdrop-filter ancestor is scoped to that ancestor, not the
          viewport). This is also what fixed the "background still scrolls"
          and "see-through drawer" issues. */}
      {createPortal(
        <div
          className={`fixed inset-0 z-[100] md:hidden ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <div
            className={`absolute inset-0 bg-charcoal/70 backdrop-blur-sm transition-opacity duration-300 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setIsOpen(false)}
          />
          <div
            className={`absolute right-0 top-0 flex h-full w-72 flex-col bg-charcoal-2 p-6 shadow-2xl transition-transform duration-300 ease-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="mb-8 flex h-9 w-9 items-center justify-center self-end rounded-full bg-charcoal text-cream transition-transform active:scale-90"
            >
              ✕
            </button>
            <div className="flex flex-col gap-2">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                      isActive ? 'bg-mustard/15 text-mustard' : 'text-cream/85 hover:bg-cream/5 hover:text-cream'
                    }`
                  }
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}