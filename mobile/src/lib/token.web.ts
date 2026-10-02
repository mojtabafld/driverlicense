// Session token on the web version: localStorage (the token is sent as a Bearer header, never as a cookie).
const KEY = 'tp_token';
export const loadToken = async () => { try { return localStorage.getItem(KEY); } catch { return null; } };
export const saveToken = async (t: string | null) => { try { if (t) localStorage.setItem(KEY, t); else localStorage.removeItem(KEY); } catch {} };
