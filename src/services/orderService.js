import { store, generateId } from '../data/mockStore';

const delay = (data, ms = 200) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

// Ordered progression used by both the admin action buttons and the
// dashboard summary cards. "cancelled" is a terminal state reachable from
// any non-final status.
export const ORDER_STATUS_FLOW = ['pending', 'preparing', 'ready', 'served', 'completed'];

export function getOrders() {
  return delay(
    [...store.orders.get()].sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime))
  );
}

export function getOrder(id) {
  return delay(store.orders.get().find((o) => o.id === id) || null);
}

export function createOrder({ tableNumber, items, instructions }) {
  const orders = store.orders.get();
  const estimatedPrepTime = items.length
    ? Math.max(...items.map((i) => i.prepTimeMins || 15)) + 5
    : 15;
  const newOrder = {
    id: generateId('ORD').toUpperCase(),
    tableNumber,
    items: items.map(({ name, variantLabel, quantity, price }) => ({
      name,
      variantLabel,
      quantity,
      price,
    })),
    instructions: instructions || '',
    status: 'pending',
    orderTime: new Date().toISOString(),
    estimatedPrepTime,
  };
  store.orders.set([newOrder, ...orders]);
  return delay(newOrder);
}

export function updateOrderStatus(id, status) {
  const orders = store.orders.get();
  const next = orders.map((o) => (o.id === id ? { ...o, status } : o));
  store.orders.set(next);
  return delay(next.find((o) => o.id === id));
}

export function nextStatus(current) {
  const idx = ORDER_STATUS_FLOW.indexOf(current);
  if (idx === -1 || idx === ORDER_STATUS_FLOW.length - 1) return null;
  return ORDER_STATUS_FLOW[idx + 1];
}
