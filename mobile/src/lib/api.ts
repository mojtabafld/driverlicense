import { API_URL, FROZEN } from './config';

let token: string | null = null;
export const setApiToken = (t: string | null) => { token = t; };
export const getApiToken = () => token;

export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }

// JSON API of the Teorivej server. Errors carry the server's Persian message. The app signs in with its token only:
// cookies are never sent or kept (`credentials: 'omit'`), so the old site's session cookie on the same address cannot
// stand in for it, e.g. right after signing out. `as`: the token to use instead of the current one.
export async function api<T = any>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', route: string, body?: unknown, as?: string | null): Promise<T> {
  const t = as === undefined ? token : as;
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/${route}`, {
      method, credentials: 'omit',
      headers: { 'Content-Type': 'application/json', 'X-Client': 'app', ...(t ? { Authorization: `Bearer ${t}` } : {}) },
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
  const res = await fetch(`${API_URL}/${file}${FROZEN ? `?frozen=${FROZEN}` : ''}`, { credentials: 'omit', headers: token ? { Authorization: `Bearer ${token}` } : {} });
  if (!res.ok) throw new ApiError('بارگذاری سؤال‌ها ناموفق بود.', res.status);
  const js = await res.text();
  return JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;\s*$/, '')) as T;
}
