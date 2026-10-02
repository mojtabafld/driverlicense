import { API_URL } from './config';

let token: string | null = null;
export const setApiToken = (t: string | null) => { token = t; };
export const getApiToken = () => token;

export class ApiError extends Error { constructor(message: string, public status: number) { super(message); } }

// JSON API of the TeoriPrøve server. Errors carry the server's Persian message.
export async function api<T = any>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', route: string, body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_URL}/api/${route}`, {
      method,
      headers: { 'Content-Type': 'application/json', 'X-Client': 'app', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError('اتصال به سرور برقرار نشد. اینترنت را بررسی کنید.', 0);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.error || 'خطای سرور؛ دوباره امتحان کنید.', res.status);
  return data as T;
}

// The question bank (site/data.js, "window.BANK={...};"), only served to signed-in users.
export async function fetchBank<T>(): Promise<T> {
  const res = await fetch(`${API_URL}/data.js`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  if (!res.ok) throw new ApiError('بارگذاری سؤال‌ها ناموفق بود.', res.status);
  const js = await res.text();
  return JSON.parse(js.slice(js.indexOf('=') + 1).trim().replace(/;\s*$/, '')) as T;
}
