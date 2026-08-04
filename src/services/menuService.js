import { store, generateId } from '../data/mockStore';

const delay = (data, ms = 250) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

export function getMenuItems() {
  return delay(store.menuItems.get());
}

export function getMenuItem(id) {
  return delay(store.menuItems.get().find((item) => item.id === id) || null);
}

export function addMenuItem(data) {
  const items = store.menuItems.get();
  const newItem = {
    id: generateId('mi'),
    name: '',
    category: '',
    description: '',
    fullDescription: '',
    ingredients: [],
    image: 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?auto=format&fit=crop&w=600&q=80',
    veg: true,
    bestseller: false,
    available: true,
    prepTimeMins: 15,
    variants: [{ label: 'Regular', price: 0 }],
    ...data,
  };
  const next = [newItem, ...items];
  store.menuItems.set(next);
  return delay(newItem);
}

export function updateMenuItem(id, patch) {
  const items = store.menuItems.get();
  const next = items.map((item) => (item.id === id ? { ...item, ...patch } : item));
  store.menuItems.set(next);
  return delay(next.find((item) => item.id === id));
}

export function deleteMenuItem(id) {
  const items = store.menuItems.get();
  store.menuItems.set(items.filter((item) => item.id !== id));
  return delay(true);
}

export function toggleAvailability(id) {
  const items = store.menuItems.get();
  const target = items.find((item) => item.id === id);
  if (!target) return delay(null);
  return updateMenuItem(id, { available: !target.available });
}
