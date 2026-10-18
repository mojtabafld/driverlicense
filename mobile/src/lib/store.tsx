// App state: the signed-in user, their exams and settings, and the question bank.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { ApiError, api, fetchBank, getApiToken, setApiToken } from './api';
import type { Attempt, Bank, Question, Settings, User } from './bank';
import { API_URL, FROZEN, PROVE_PICS } from './config';
import { EXAM_FOR, UI_LANG, askRestart, keepUiLang, setTransLang } from './i18n';
import { reloadApp } from './reload';
import { loadToken, saveToken } from './token';
import { PALETTE, forgetPalette, keepPalette, rememberDefault } from '@/ui/palette';
import { getPlainHeader, setPlainHeader } from '@/lib/header-style';
import { useTheme } from '@/ui/theme';

export type Saved = { id: number; a?: number[]; at: number };
type Me = { user: User; attempts: Attempt[]; settings: Partial<Settings>; saved?: Saved[]; imgv?: Record<string, string> };
type Ctx = {
  ready: boolean; user: User | null; attempts: Attempt[]; settings: Settings; bank: Bank | null; Q: Map<number, Question>;
  imgv: Record<string, string>; token: string | null;
  // Saved questions (the bookmark on a review card's picture, as on the site) and whether the server has AI tips.
  saved: Saved[]; aiLessons: boolean; tts: boolean;
  // Whether the server can read aloud at all (even when `locked`): the exam's read-aloud button then shows and leads to the premium page.
  ttsServer: boolean;
  // Premium (a pass bought with Stripe, app/premium.tsx): its plans when it can be bought, whether this account has it
  // now (a pass that has not run out, or an admin), and `locked`: the AI analysis and the read-aloud need it here and this account has not got it
  // (then `tts` is off and the AI button leads to the premium page).
  pay: Pay | null; premium: boolean; locked: boolean;
  // After coming back from Stripe: the server checks the Checkout session; true once premium is on the account.
  confirmPremium: (sessionId: string) => Promise<boolean>;
  // Asks the server to count a payment it missed (Stripe's newest paid sessions), then has the account as it is now.
  syncPremium: () => Promise<void>;
  // A free trial code (the server refuses a wrong one, or a second trial on this account).
  redeemPromo: (code: string) => Promise<void>;
  // The intro's pictures that the server has made: slide number → version, and → the picture's background colour.
  intro: Record<string, string>; introBg: Record<string, string>;
  // The «آموزش» cards' pictures that the server has made: card number → version.
  learnArt: Record<string, string>; learnBg: Record<string, string>; courseArt: Record<string, string>;
  // The profile pictures to choose from that the server has made: number → version.
  avatarArt: Record<string, string>; heroArt: Record<string, string>; loginArt: Record<string, string>;
  // The teaching pages' pictures (signs, right of way) that the server has made: key → version. At /app (PROVE_PICS) a
  // version starting with «p» is prove.dk's picture of it (/img/guideprove/<key>.png).
  guideArt: Record<string, string>;
  // Set the profile picture: one of the made ones, an own photo (base64 JPEG, cropped and small) or none.
  setAvatar: (b: { preset: number } | { image: string } | { remove: true }) => Promise<void>;
  toggleSaved: (id: number, a?: number[]) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, username: string, password: string, email?: string) => Promise<void>;
  // Email confirmation is on (the server can send mail): signing up asks for an address, and a new account waits for its link.
  mail: boolean;
  // The confirmation link again, or to a new address (which then needs confirming).
  sendVerify: (email?: string) => Promise<void>;
  guest: (name: string) => Promise<void>;
  // Forgotten password: a 6-digit code to an address; whether a code is right; then the new password (signs in).
  forgot: (email: string) => Promise<void>;
  checkResetCode: (email: string, code: string) => Promise<void>;
  resetPassword: (email: string, code: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // Change the shown name and / or the password (with the current one); the username stays.
  updateAccount: (b: { name?: string; current?: string; password?: string }) => Promise<void>;
  // Delete the account and all its data on the server (with the password), then sign out on the device.
  deleteAccount: (password: string) => Promise<void>;
  // Delete every past exam and lesson of the user.
  clearAttempts: () => Promise<void>;
  refresh: () => Promise<void>;
  saveAttempt: (a: Omit<Attempt, 'at'>) => Promise<void>;
  setSettings: (s: Partial<Settings>) => Promise<void>;
};
export type Plan = { id: 'week' | 'month' | 'quarter'; days: number; price: number };
// promo: the free trial's days when a trial code can be entered.
export type Pay = { plans: Plan[]; gate?: boolean; test?: boolean; promo?: number };
const AppCtx = createContext<Ctx | null>(null);
const DEFAULTS: Settings = { showFa: true, timer: true, lang: 'da' };

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [bank, setBank] = useState<Bank | null>(null);
  const [aiLessons, setAiLessons] = useState(false);
  const [tts, setTts] = useState(false); // questions read aloud (the server has an ElevenLabs key)
  const [pay, setPay] = useState<Pay | null>(null);
  const [mail, setMail] = useState(false);
  const [intro, setIntro] = useState<Record<string, string>>({});
  const [introBg, setIntroBg] = useState<Record<string, string>>({});
  const [learnArt, setLearnArt] = useState<Record<string, string>>({});
  const [learnBg, setLearnBg] = useState<Record<string, string>>({});
  const [courseArt, setCourseArt] = useState<Record<string, string>>({});
  const [avatarArt, setAvatarArt] = useState<Record<string, string>>({});
  const [heroArt, setHeroArt] = useState<Record<string, string>>({});
  const [loginArt, setLoginArt] = useState<Record<string, string>>({});
  const [guideArt, setGuideArt] = useState<Record<string, string>>({});

  // Light / dark mode (ui/theme-mode.tsx): read when the account loads, and a change is kept on the account.
  const { mode, setMode } = useTheme();
  const modeRef = useRef(mode); modeRef.current = mode;
  useEffect(() => {
    if (PROVE_PICS || !me || !me.settings?.mode || me.settings.mode === mode) return;
    const settings = { ...DEFAULTS, ...me.settings, mode };
    setMe(m => (m ? { ...m, settings } : m));
    api('PUT', 'settings', settings).catch(() => {});
  }, [mode, me]);
  // Signed out: the look of someone not signed in, the phone's light / dark mode and the server's colour theme.
  const lookOut = () => {
    if (PROVE_PICS) return;
    setMode('system');
    setPlainHeader(false, false);
    if (forgetPalette()) reloadApp();
  };

  // Bumped on sign-out: an account read that was still on its way then is dropped, so it cannot sign the user back in.
  const gen = useRef(0);
  const load = useCallback(async () => {
    const g = gen.current;
    let d = await api<Me>('GET', 'me');
    if (g !== gen.current) return;
    // Main site: the account's app language, light / dark mode and colour theme come back on signing in (Mojtaba,
    // 2026-10-16); those it has none of yet take this device's. A new language or theme needs the app to start again
    // (lib/reload.ts), which reads the account once more.
    if (!PROVE_PICS) {
      const s = d.settings || {}, add: Partial<Settings> = {};
      const newUi = !!s.ui && keepUiLang(s.ui), newPalette = !!s.palette && keepPalette(s.palette);
      if (s.mode) setMode(s.mode); else add.mode = modeRef.current;
      if (!s.ui) add.ui = UI_LANG;
      if (!s.palette) add.palette = PALETTE;
      // «هدر ساده» follows the account too: its own choice, or this device's for an account that has none yet.
      if (s.header) setPlainHeader(s.header === 'plain'); else add.header = getPlainHeader() ? 'plain' : 'pictures';
      if (newUi || newPalette) { reloadApp(() => askRestart(newUi ? s.ui! : UI_LANG)); return; }
      // An account that has never chosen the questions' language is new: it is asked once, with the look, on whatever
      // device it first signs in on (app/_layout.tsx, ui/lang-pick.tsx), the app's language picked in advance
      // (2026-10-16). An account that has chosen is never asked again, on any device; it takes its saved settings.
      if (!s.langChosen) add.lang = EXAM_FOR[UI_LANG];
      if (Object.keys(add).length) {
        const settings = { ...DEFAULTS, ...s, ...add };
        d = { ...d, settings };
        api('PUT', 'settings', settings).catch(() => {});
      }
    }
    setMe(d);
    api<{ aiLessons?: boolean; tts?: boolean; pay?: Pay }>('GET', 'config').then(x => { setAiLessons(!!x.aiLessons); setTts(!!x.tts); setPay(x.pay ?? null); }).catch(() => {});
    // An account still waiting for its email link reads only itself, so nothing else (the questions) is loaded yet.
    if (d.user.verify) return;
    if (!bank) setBank(await fetchBank<Bank>());
  }, [bank]);

  // The intro comes before signing in, so the pictures it can show are read at start too.
  useEffect(() => { api<{ intro?: Record<string, string>; introBg?: Record<string, string>; learnArt?: Record<string, string>; learnBg?: Record<string, string>; courseArt?: Record<string, string>; avatarArt?: Record<string, string>; heroArt?: Record<string, string>; loginArt?: Record<string, string>; guideArt?: Record<string, string>; mail?: boolean; theme?: string }>('GET', PROVE_PICS ? 'config?pics=prove' : 'config').then(x => { setMail(!!x.mail && !PROVE_PICS); rememberDefault(x.theme); setIntro(x.intro || {}); setIntroBg(x.introBg || {}); setLearnArt(x.learnArt || {}); setLearnBg(x.learnBg || {}); setCourseArt(x.courseArt || {}); setAvatarArt(x.avatarArt || {}); setHeroArt(x.heroArt || {}); setLoginArt(x.loginArt || {}); setGuideArt(x.guideArt || {}); }).catch(() => {}); }, []);

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
  const premium = (me?.user.premium?.until ?? 0) > Date.now() || !!me?.user.admin, locked = !!pay?.gate && !premium;
  // The translation's language, read by transText while the screens draw (kept in step with the account's settings).
  setTransLang(me?.settings?.trans === 'auto' ? undefined : me?.settings?.trans);
  const value = useMemo<Ctx>(() => ({
    ready, token, bank, user: me?.user ?? null, attempts: me?.attempts ?? [], imgv: me?.imgv ?? {},
    settings: { ...DEFAULTS, ...(me?.settings || {}) },
    pay: PROVE_PICS ? null : pay, premium, locked,
    redeemPromo: async code => {
      const d = await api<{ user: User }>('POST', 'promo', { code });
      setMe(m => (m ? { ...m, user: d.user } : m));
    },
    confirmPremium: async id => {
      const d = await api<{ user: User; pending?: boolean }>('POST', 'checkoutdone', { id });
      setMe(m => (m ? { ...m, user: d.user } : m));
      return (d.user.premium?.until ?? 0) > Date.now();
    },
    syncPremium: async () => {
      const d = await api<{ user: User }>('POST', 'paysync');
      setMe(m => (m ? { ...m, user: d.user } : m));
    },
    saved: me?.saved ?? [], aiLessons, tts: tts && !locked, ttsServer: tts, intro, introBg, learnArt, learnBg, courseArt, avatarArt, heroArt, loginArt, guideArt,
    toggleSaved: async (id, a) => {
      const on = !(me?.saved ?? []).some(x => x.id === id);
      const before = me?.saved ?? [];
      setMe(m => (m ? { ...m, saved: on ? [...(m.saved ?? []).filter(x => x.id !== id), { id, a, at: Date.now() }] : (m.saved ?? []).filter(x => x.id !== id) } : m));
      try { if (on) await api('POST', 'saved', { id, a }); else await api('DELETE', 'saved', { id }); }
      catch (e) { setMe(m => (m ? { ...m, saved: before } : m)); throw e; }
    },
    Q: new Map((bank?.questions || []).map(q => [q.id, q])),
    login: async (username, password) => { const d = await api<{ token: string }>('POST', 'login', { username, password }); await signedIn(d.token); },
    register: async (name, username, password, email) => { const d = await api<{ token: string }>('POST', 'register', { name, username, password, email, lang: UI_LANG }); await signedIn(d.token); },
    mail,
    sendVerify: async email => {
      try { const d = await api<{ user: User }>('POST', 'verifysend', { email, lang: UI_LANG }); setMe(m => (m ? { ...m, user: d.user } : m)); }
      catch (e) { load().catch(() => {}); throw e; }
    },
    guest: async name => { const d = await api<{ token: string }>('POST', 'guest', { name }); await signedIn(d.token); },
    forgot: async email => { await api('POST', 'forgot', { email, lang: UI_LANG }); },
    checkResetCode: async (email, code) => { await api('POST', 'resetcheck', { email, code }); },
    resetPassword: async (email, code, password) => { const d = await api<{ token: string }>('POST', 'reset', { email, code, password }); await signedIn(d.token); },
    // Signed out on the device at once; the server is told in the background (with the old token), so a slow or
    // missing connection never keeps the user signed in.
    logout: async () => {
      const old = getApiToken();
      gen.current++;
      setApiToken(null); setToken(null); setMe(null);
      await saveToken(null);
      if (old) api('POST', 'logout', undefined, old).catch(() => {});
      lookOut();
    },
    // The server removes the account and its sessions, so the device only forgets its token.
    deleteAccount: async password => {
      await api('DELETE', 'account', { password });
      gen.current++;
      setApiToken(null); setToken(null); setMe(null);
      await saveToken(null);
      lookOut();
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
  }), [ready, token, me, bank, aiLessons, tts, pay, mail, premium, locked, intro, introBg, learnArt, learnBg, courseArt, avatarArt, heroArt, loginArt, guideArt]);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

// The exam language, also where there may be no AppProvider yet (kit's T): 'da' then.
export function useExamLang(): 'da' | 'en' {
  return useContext(AppCtx)?.settings.lang === 'en' ? 'en' : 'da';
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
    const base = `${API_URL}/${q.img}`, v = PROVE_PICS ? `orig=1${FROZEN ? `&frozen=${FROZEN}` : ''}` : imgv[q.id] ? `v=${encodeURIComponent(imgv[q.id])}` : '';
    return { uri: base, v, token };
  };
}
