// App state: the signed-in user, their exams and settings, and the question bank.
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { api, fetchBank, setApiToken } from './api';
import type { Attempt, Bank, Question, Settings, User } from './bank';
import { API_URL } from './config';
import { loadToken, saveToken } from './token';

export type Saved = { id: number; a?: number[]; at: number };
type Me = { user: User; attempts: Attempt[]; settings: Partial<Settings>; saved?: Saved[]; imgv?: Record<string, string> };
type Ctx = {
  ready: boolean; user: User | null; attempts: Attempt[]; settings: Settings; bank: Bank | null; Q: Map<number, Question>;
  imgv: Record<string, string>; token: string | null;
  // Saved questions (the bookmark on a review card's picture, as on the site) and whether the server has AI tips.
  saved: Saved[]; aiLessons: boolean;
  toggleSaved: (id: number, a?: number[]) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  saveAttempt: (a: Omit<Attempt, 'at'>) => Promise<void>;
  setSettings: (s: Partial<Settings>) => Promise<void>;
};
const AppCtx = createContext<Ctx | null>(null);
const DEFAULTS: Settings = { showFa: true, timer: true, lang: 'da' };

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [bank, setBank] = useState<Bank | null>(null);
  const [aiLessons, setAiLessons] = useState(false);

  const load = useCallback(async () => {
    const d = await api<Me>('GET', 'me');
    setMe(d);
    api<{ aiLessons?: boolean }>('GET', 'config').then(x => setAiLessons(!!x.aiLessons)).catch(() => {});
    if (!bank) setBank(await fetchBank<Bank>());
  }, [bank]);

  useEffect(() => {
    (async () => {
      const t = await loadToken();
      if (t) {
        setApiToken(t); setToken(t);
        try { await load(); } catch { setApiToken(null); setToken(null); await saveToken(null); }
      }
      setReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signedIn = async (t: string) => { setApiToken(t); setToken(t); await saveToken(t); await load(); };
  const value = useMemo<Ctx>(() => ({
    ready, token, bank, user: me?.user ?? null, attempts: me?.attempts ?? [], imgv: me?.imgv ?? {},
    settings: { ...DEFAULTS, ...(me?.settings || {}) },
    saved: me?.saved ?? [], aiLessons,
    toggleSaved: async (id, a) => {
      const on = !(me?.saved ?? []).some(x => x.id === id);
      const before = me?.saved ?? [];
      setMe(m => (m ? { ...m, saved: on ? [...(m.saved ?? []).filter(x => x.id !== id), { id, a, at: Date.now() }] : (m.saved ?? []).filter(x => x.id !== id) } : m));
      try { if (on) await api('POST', 'saved', { id, a }); else await api('DELETE', 'saved', { id }); }
      catch (e) { setMe(m => (m ? { ...m, saved: before } : m)); throw e; }
    },
    Q: new Map((bank?.questions || []).map(q => [q.id, q])),
    login: async (username, password) => { const d = await api<{ token: string }>('POST', 'login', { username, password }); await signedIn(d.token); },
    register: async (name, username, password) => { const d = await api<{ token: string }>('POST', 'register', { name, username, password }); await signedIn(d.token); },
    logout: async () => { try { await api('POST', 'logout'); } catch {} setApiToken(null); setToken(null); await saveToken(null); setMe(null); },
    refresh: load,
    saveAttempt: async a => { const d = await api<{ attempt: Attempt }>('POST', 'attempts', a); setMe(m => (m ? { ...m, attempts: [...m.attempts, d.attempt] } : m)); },
    setSettings: async s => {
      const next = { ...DEFAULTS, ...(me?.settings || {}), ...s };
      setMe(m => (m ? { ...m, settings: next } : m));
      await api('PUT', 'settings', next);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [ready, token, me, bank, aiLessons]);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

export function useApp() {
  const c = useContext(AppCtx);
  if (!c) throw new Error('useApp outside AppProvider');
  return c;
}

// Image source of a question picture: the token goes in a header on iOS/Android and in ?t= on the web.
export function useQuestionImage() {
  const { token, imgv } = useApp();
  return (q: Question) => {
    const base = `${API_URL}/${q.img}`, v = imgv[q.id] ? `v=${encodeURIComponent(imgv[q.id])}` : '';
    return { uri: base, v, token };
  };
}
