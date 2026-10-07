// App state: the signed-in user, their exams and settings, and the question bank.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { ApiError, api, fetchBank, getApiToken, setApiToken } from './api';
import type { Attempt, Bank, Question, Settings, User } from './bank';
import { API_URL, PROVE_PICS } from './config';
import { loadToken, saveToken } from './token';

export type Saved = { id: number; a?: number[]; at: number };
type Me = { user: User; attempts: Attempt[]; settings: Partial<Settings>; saved?: Saved[]; imgv?: Record<string, string> };
type Ctx = {
  ready: boolean; user: User | null; attempts: Attempt[]; settings: Settings; bank: Bank | null; Q: Map<number, Question>;
  imgv: Record<string, string>; token: string | null;
  // Saved questions (the bookmark on a review card's picture, as on the site) and whether the server has AI tips.
  saved: Saved[]; aiLessons: boolean; tts: boolean;
  // The intro's pictures that the server has made: slide number → version, and → the picture's background colour.
  intro: Record<string, string>; introBg: Record<string, string>;
  // The «آموزش» cards' pictures that the server has made: card number → version.
  learnArt: Record<string, string>; learnBg: Record<string, string>; courseArt: Record<string, string>;
  // The profile pictures to choose from that the server has made: number → version.
  avatarArt: Record<string, string>;
  // The teaching pages' pictures (signs, right of way) that the server has made: key → version. At /app (PROVE_PICS) a
  // version starting with «p» is prove.dk's picture of it (/img/guideprove/<key>.png).
  guideArt: Record<string, string>;
  // Set the profile picture: one of the made ones, an own photo (base64 JPEG, cropped and small) or none.
  setAvatar: (b: { preset: number } | { image: string } | { remove: true }) => Promise<void>;
  toggleSaved: (id: number, a?: number[]) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // Change the shown name and / or the password (with the current one); the username stays.
  updateAccount: (b: { name?: string; current?: string; password?: string }) => Promise<void>;
  // Delete every past exam and lesson of the user.
  clearAttempts: () => Promise<void>;
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
  const [tts, setTts] = useState(false); // questions read aloud (the server has an ElevenLabs key)
  const [intro, setIntro] = useState<Record<string, string>>({});
  const [introBg, setIntroBg] = useState<Record<string, string>>({});
  const [learnArt, setLearnArt] = useState<Record<string, string>>({});
  const [learnBg, setLearnBg] = useState<Record<string, string>>({});
  const [courseArt, setCourseArt] = useState<Record<string, string>>({});
  const [avatarArt, setAvatarArt] = useState<Record<string, string>>({});
  const [guideArt, setGuideArt] = useState<Record<string, string>>({});

  // Bumped on sign-out: an account read that was still on its way then is dropped, so it cannot sign the user back in.
  const gen = useRef(0);
  const load = useCallback(async () => {
    const g = gen.current;
    const d = await api<Me>('GET', 'me');
    if (g !== gen.current) return;
    setMe(d);
    api<{ aiLessons?: boolean; tts?: boolean }>('GET', 'config').then(x => { setAiLessons(!!x.aiLessons); setTts(!!x.tts); }).catch(() => {});
    if (!bank) setBank(await fetchBank<Bank>());
  }, [bank]);

  // The intro comes before signing in, so the pictures it can show are read at start too.
  useEffect(() => { api<{ intro?: Record<string, string>; introBg?: Record<string, string>; learnArt?: Record<string, string>; learnBg?: Record<string, string>; courseArt?: Record<string, string>; avatarArt?: Record<string, string>; guideArt?: Record<string, string> }>('GET', PROVE_PICS ? 'config?pics=prove' : 'config').then(x => { setIntro(x.intro || {}); setIntroBg(x.introBg || {}); setLearnArt(x.learnArt || {}); setLearnBg(x.learnBg || {}); setCourseArt(x.courseArt || {}); setAvatarArt(x.avatarArt || {}); setGuideArt(x.guideArt || {}); }).catch(() => {}); }, []);

  useEffect(() => {
    (async () => {
      const t = await loadToken();
      if (t) {
        setApiToken(t); setToken(t);
        // Only a refused session signs out; without a connection the token stays (the app shows its offline page and
        // loads again when the connection is back).
        try { await load(); } catch (e) { if (e instanceof ApiError && e.status === 401) { setApiToken(null); setToken(null); await saveToken(null); } }
      }
      setReady(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signedIn = async (t: string) => { setApiToken(t); setToken(t); await saveToken(t); await load(); };
  const value = useMemo<Ctx>(() => ({
    ready, token, bank, user: me?.user ?? null, attempts: me?.attempts ?? [], imgv: me?.imgv ?? {},
    settings: { ...DEFAULTS, ...(me?.settings || {}) },
    saved: me?.saved ?? [], aiLessons, tts, intro, introBg, learnArt, learnBg, courseArt, avatarArt, guideArt,
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
    // Signed out on the device at once; the server is told in the background (with the old token), so a slow or
    // missing connection never keeps the user signed in.
    logout: async () => {
      const old = getApiToken();
      gen.current++;
      setApiToken(null); setToken(null); setMe(null);
      await saveToken(null);
      if (old) api('POST', 'logout', undefined, old).catch(() => {});
    },
    clearAttempts: async () => { await api('DELETE', 'attempts'); setMe(m => (m ? { ...m, attempts: [] } : m)); },
    setAvatar: async b => { const d = await api<{ user: User }>('POST', 'avatar', b); setMe(m => (m ? { ...m, user: d.user } : m)); },
    updateAccount: async b => { const d = await api<{ user: User }>('PUT', 'account', b); setMe(m => (m ? { ...m, user: d.user } : m)); },
    refresh: load,
    saveAttempt: async a => { const d = await api<{ attempt: Attempt }>('POST', 'attempts', a); setMe(m => (m ? { ...m, attempts: [...m.attempts, d.attempt] } : m)); },
    setSettings: async s => {
      const next = { ...DEFAULTS, ...(me?.settings || {}), ...s };
      setMe(m => (m ? { ...m, settings: next } : m));
      await api('PUT', 'settings', next);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [ready, token, me, bank, aiLessons, tts, intro, introBg, learnArt, learnBg, courseArt, avatarArt, guideArt]);
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
    // At /app the question's original picture (from prove.dk), not a remade one.
    const base = `${API_URL}/${q.img}`, v = PROVE_PICS ? 'orig=1' : imgv[q.id] ? `v=${encodeURIComponent(imgv[q.id])}` : '';
    return { uri: base, v, token };
  };
}
