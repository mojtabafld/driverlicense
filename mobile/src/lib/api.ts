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
const authHeaders = (t: string | null | undefined): Record<string, string> => (realToken(t) ? { Authorization: `Bearer ${t}` } : {});
export async function api<T = any>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', route: string, body?: unknown, as?: string | null): Promise<T> {
  const t = as === undefined ? token : as;
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/${route}`, {
      method, credentials: WEB ? 'same-origin' : 'omit',
      headers: { 'Content-Type': 'application/json', 'X-Client': 'app', ...(WEB ? { 'X-Session': 'cookie' } : {}), ...authHeaders(t) },
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
