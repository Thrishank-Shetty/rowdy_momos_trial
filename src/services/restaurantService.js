import { store } from '../data/mockStore';

const delay = (data, ms = 200) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

export function getRestaurant() {
  return delay(store.restaurant.get());
}

export function updateRestaurant(patch) {
  const current = store.restaurant.get();
  const next = { ...current, ...patch };
  store.restaurant.set(next);
  return delay(next);
}
