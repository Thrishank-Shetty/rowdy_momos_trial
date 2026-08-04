// A tiny client-side "database". Every service module reads/writes through
// here instead of touching localStorage or the seed JSON directly. When the
// real FastAPI backend is ready, services swap their internals for `fetch`
// calls and every page that consumes them keeps working unchanged.
import { readStorage, writeStorage } from '../utils/storage';
import menuItemsSeed from './menuItems.json';
import categoriesSeed from './categories.json';
import restaurantSeed from './restaurant.json';
import ordersSeed from './orders.json';
import tablesSeed from './tables.json';

const KEYS = {
  menuItems: 'rowdy_store_menuItems',
  categories: 'rowdy_store_categories',
  restaurant: 'rowdy_store_restaurant',
  orders: 'rowdy_store_orders',
  tables: 'rowdy_store_tables',
};

function collection(key, seed) {
  return {
    get: () => readStorage(key, seed),
    set: (data) => writeStorage(key, data),
  };
}

export const store = {
  menuItems: collection(KEYS.menuItems, menuItemsSeed),
  categories: collection(KEYS.categories, categoriesSeed),
  restaurant: collection(KEYS.restaurant, restaurantSeed),
  orders: collection(KEYS.orders, ordersSeed),
  tables: collection(KEYS.tables, tablesSeed),
};

export function resetStore() {
  Object.values(KEYS).forEach((key) => window.localStorage.removeItem(key));
}

export function generateId(prefix) {
  return `${prefix}-${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;
}
