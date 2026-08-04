// Thin wrapper around localStorage that fails silently (private browsing,
// storage quota, SSR, etc.) so a storage error never crashes the UI.
export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore — data just won't persist this session.
  }
}
