// Placeholder only. Admin auth is intentionally not implemented in this
// phase — the /admin routes are open. This file exists so pages can already
// import against the interface the future FastAPI auth endpoints will
// expose, without a rewrite later.

export function login() {
  return Promise.reject(new Error('Auth is not implemented yet.'));
}

export function logout() {
  return Promise.resolve();
}

export function getCurrentUser() {
  return Promise.resolve(null);
}
