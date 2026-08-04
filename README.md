# Rowdy Momos Cafe — Ordering UI (Phase 1)

A mobile-first restaurant ordering frontend built with React + Vite + Tailwind CSS v4,
using mock JSON data modeled on Rowdy Momos Cafe (Vidya Vihar, Mumbai).

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Structure

- `src/data/*.json` — restaurant info, table, categories, menu items (mock data)
- `src/utils/api.js` — thin data-access layer; swap the JSON imports for
  `fetch('/api/...')` calls to a FastAPI backend later with no component changes
- `src/context/CartContext.jsx` — cart state via Context API (add/remove/qty/totals)
- `src/components/` — reusable UI (menu cards, category tabs, search, modals, cart drawer)
- `src/pages/` — Home, Menu, About, Contact, Checkout, NotFound
- `src/layouts/MainLayout.jsx` — Navbar + Footer + CartDrawer shell used by all routes
- `src/routes/router.jsx` — React Router route table

No backend calls, no authentication — everything runs off local mock JSON.
