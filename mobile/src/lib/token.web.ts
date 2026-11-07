// The web version's session: since 2026-11-05 the token itself is only in the HttpOnly cookie (tp_session), which page
// scripts cannot read; localStorage keeps just the word 'cookie' (lib/api.ts then sends credentials, no Bearer header).
// A real token found here from before is moved to the cookie and replaced at start (lib/store.tsx, cookieswap).
const KEY = 'tp_token';
export const loadToken = async () => { try { return localStorage.getItem(KEY); } catch { return null; } };
export const saveToken = async (t: string | null) => { try { if (t) localStorage.setItem(KEY, t); else localStorage.removeItem(KEY); } catch {} };
