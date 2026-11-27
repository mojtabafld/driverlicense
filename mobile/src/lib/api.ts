import { Platform } from 'react-native';

import { API_URL, FROZEN } from './config';

let token: string | null = null;
export const setApiToken = (t: string | null) => { token = t; };
export const getApiToken = () => token;

export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }

// JSON API of the Teoripro server. Errors carry the server's Persian message. `as`: the token to use instead of the
// current one. iOS/Android sign in with their token (Bearer, kept in the secure store). The web version (Mojtaba
// 2026-11-05) keeps its session in the server's HttpOnly cookie, which no script can read: its «token» is just the
// word 'cookie' (X-Session: cookie asks the server for that), and a real token is sent only to move it to the cookie.
const WEB = Platform.OS === 'web';
export const realToken = (t: string | null | undefined) => (t && t !== 'cookie' ? t : null);
// This device's own id (Mojtaba 2026-11-05): made once and kept (the web's storage, or the secure store on a phone),
// sent with every request (X-Device), so the server knows a device again after signing out and in: «دستگاه‌های من»
// keeps the one the account was first registered on as its main device.
const DEVICE_KEY = 'tp.device';
const deviceId = (() => {
  const ok = (v: unknown): v is string => typeof v === 'string' && /^[a-f0-9]{32}$/.test(v);
  let v: string | null = null;
  try { v = WEB ? localStorage.getItem(DEVICE_KEY) : require('expo-secure-store').getItem(DEVICE_KEY); } catch {}
  if (ok(v)) return v;
  const b = new Uint8Array(16);
  try { crypto.getRandomValues(b); } catch { for (let i = 0; i < 16; i++) b[i] = Math.floor(Math.random() * 256); }
  v = Array.from(b, x => x.toString(16).padStart(2, '0')).join('');
  try { if (WEB) localStorage.setItem(DEVICE_KEY, v); else require('expo-secure-store').setItem(DEVICE_KEY, v); } catch {}
  return v;
})();
const authHeaders = (t: string | null | undefined): Record<string, string> => (realToken(t) ? { Authorization: `Bearer ${t}` } : {});
export async function api<T = any>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', route: string, body?: unknown, as?: string | null): Promise<T> {
  const t = as === undefined ? token : as;
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/${route}`, {
      method, credentials: WEB ? 'same-origin' : 'omit',
      headers: { 'Content-Type': 'application/json', 'X-Client': 'app', 'X-Device': deviceId, ...(WEB ? { 'X-Session': 'cookie' } : {}), ...authHeaders(t) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError('اتصال به سرور برقرار نشد. اینترنت را بررسی کنید.', 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.error || 'خطای سرور؛ دوباره امتحان کنید.', res.status);
  return data as T;
}

// The question bank (site/data.js, "window.BANK={...};"), only served to signed-in users; `file`: «آزمون جدید»'s own
// questions (site/newq.js, "window.NEWQ={...};"), in the same shape.
export async function fetchBank<T>(file = 'data.js'): Promise<T> {
  const res = await fetch(`${API_URL}/${file}${FROZEN ? `?frozen=${FROZEN}` : ''}`, { credentials: WEB ? 'same-origin' : 'omit', headers: authHeaders(token) });
  if (!res.ok) throw new ApiError('بارگذاری سؤال‌ها ناموفق بود.', res.status);
  const js = await res.text();
  return JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;\s*$/, '')) as T;
}
