import { store } from '../data/mockStore';

const delay = (data, ms = 200) => new Promise((resolve) => setTimeout(() => resolve(data), ms));

export function getTables() {
  return delay(
    [...store.tables.get()].sort((a, b) => a.tableNumber - b.tableNumber)
  );
}

function patchTable(tableNumber, patch) {
  const tables = store.tables.get();
  const next = tables.map((t) => (t.tableNumber === tableNumber ? { ...t, ...patch } : t));
  store.tables.set(next);
  return delay(next.find((t) => t.tableNumber === tableNumber));
}

export function endSession(tableNumber) {
  return patchTable(tableNumber, { status: 'available', activeSession: false });
}

export function disableTable(tableNumber) {
  return patchTable(tableNumber, { disabled: true, status: 'available', activeSession: false });
}

export function enableTable(tableNumber) {
  return patchTable(tableNumber, { disabled: false });
}
