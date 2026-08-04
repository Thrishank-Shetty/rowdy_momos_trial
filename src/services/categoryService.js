import { store, generateId } from '../data/mockStore';

const delay = (data, ms = 200) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

export function getCategories() {
  return delay(store.categories.get());
}

export function addCategory(label) {
  const categories = store.categories.get();
  const newCategory = { id: generateId('cat'), label };
  store.categories.set([...categories, newCategory]);
  return delay(newCategory);
}

export function renameCategory(id, label) {
  const categories = store.categories.get();
  const next = categories.map((c) => (c.id === id ? { ...c, label } : c));
  store.categories.set(next);
  return delay(next.find((c) => c.id === id));
}

export function deleteCategory(id) {
  const categories = store.categories.get();
  store.categories.set(categories.filter((c) => c.id !== id));
  return delay(true);
}
