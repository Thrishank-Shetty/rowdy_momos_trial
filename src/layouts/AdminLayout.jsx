import { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/orders', label: 'Orders', icon: '🧾' },
  { to: '/admin/menu', label: 'Menu Items', icon: '🥟' },
  { to: '/admin/categories', label: 'Categories', icon: '🏷️' },
  { to: '/admin/tables', label: 'Tables', icon: '🪑' },
  { to: '/admin/profile', label: 'Restaurant Profile', icon: '🏬' },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
      isActive
        ? 'bg-mustard text-charcoal'
        : 'text-cream-dim hover:bg-charcoal-3 hover:text-cream'
    }`;

  const nav = (
    <nav className="flex flex-col gap-1">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          onClick={() => setMobileOpen(false)}
          className={linkClass}
        >
          <span>{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-cream md:flex">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 bg-charcoal p-5 md:flex md:flex-col">
        <Link to="/admin" className="flex items-center gap-2 mb-8 px-1">
          <span className="text-2xl">🥟</span>
          <span className="font-display text-sm text-cream leading-tight">
            Rowdy Momos
            <br />
            <span className="text-mustard">Admin</span>
          </span>
        </Link>
        {nav}
        <div className="mt-auto pt-6 border-t border-charcoal-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-cream-dim hover:bg-charcoal-3 hover:text-cream transition-colors"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-charcoal p-4 md:hidden">
        <Link to="/admin" className="flex items-center gap-2">
          <span className="text-xl">🥟</span>
          <span className="font-display text-sm text-cream">Rowdy Momos Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open admin menu"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-2 text-cream"
        >
          ☰
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-charcoal/70" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 bg-charcoal p-5 shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close admin menu"
              className="mb-6 flex h-9 w-9 items-center justify-center rounded-full bg-charcoal-2 text-cream"
            >
              ✕
            </button>
            {nav}
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="mt-6 flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-bold text-cream-dim hover:bg-charcoal-3 hover:text-cream transition-colors"
            >
              ← Back to Site
            </Link>
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 p-5 sm:p-8">
        <Outlet />
      </main>
    </div>
  );
}
