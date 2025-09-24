// src/lib/api.js
export const API_BASE =
  (import.meta?.env?.VITE_API_BASE) ||
  (typeof process !== "undefined" ? process.env.REACT_APP_API_BASE : "") ||
  "";

export async function apiFetch(path, options={}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}
