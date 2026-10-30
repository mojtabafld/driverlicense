// App state: the signed-in user, their exams and settings, and the question bank.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import { ApiError, api, fetchBank, getApiToken, setApiToken } from './api';
import type { Attempt, Bank, NewBank, Question, Settings, User } from './bank';
import { API_URL, FROZEN, PROVE_BANK, PROVE_PICS } from './config';
import { EXAM_FOR, UI_LANG, askRestart, keepUiLang, setTransLang } from './i18n';
import { reloadApp } from './reload';
import { forgetPush, syncPush } from './push';
import { loadToken, saveToken } from './token';
import { loadLastUser, saveLastUser, type LastUser } from './prefs';
import { PALETTE, forgetPalette, keepPalette, rememberDefault } from '@/ui/palette';
import { useTheme } from '@/ui/theme';

export type Saved = { id: number; a?: number[]; at: number };
type Me = { user: User; attempts: Attempt[]; settings: Partial<Settings>; saved?: Saved[]; terms?: string[]; imgv?: Record<string, string> };
type Ctx = {
  // Q: every question by its number, the bank's and «آزمون جدید»'s (newBank, loaded after the bank; null at /app).
  ready: boolean; user: User | null; attempts: Attempt[]; settings: Settings; bank: Bank | null; newBank: NewBank | null; Q: Map<number, Question>;
  imgv: Record<string, string>; token: string | null;
  // Saved questions (the bookmark on a review card's picture, as on the site) and whether the server has AI tips.
  saved: Saved[]; aiLessons: boolean; tts: boolean;
  // Bookmarked glossary terms (their Danish words, newest first) and their toggle, kept on the account.
  terms: string[]; toggleTerm: (da: string) => Promise<void>;
  // Whether the server can read aloud at all (even when `locked`): the exam's read-aloud button then shows and leads to the premium page.
  ttsServer: boolean;
  // Premium (a pass bought with Stripe, app/premium.tsx): its plans when it can be bought, whether this account has it
  // now (a pass that has not run out, or an admin), and `locked`: the AI analysis and the read-aloud need it here and this account has not got it
  // (then `tts` is off and the AI button leads to the premium page).
  pay: Pay | null; premium: boolean; locked: boolean;
  // Premium sold in the Android app with Google Play: its product ids (the server has a Play service account), else null.
  play: { products: string[] } | null;
  // After coming back from Stripe: the server checks the Checkout session; true once premium is on the account.
  confirmPremium: (sessionId: string) => Promise<boolean>;
  // Asks the server to count a payment it missed (Stripe's newest paid sessions), then has the account as it is now.
  syncPremium: () => Promise<void>;
  // A free trial code (the server refuses a wrong one, or a second trial on this account).
  redeemPromo: (code: string) => Promise<void>;
  // The free trial without a code (POST trial), once per account.
  startTrial: () => Promise<void>;
  // The intro's pictures that the server has made: slide number → version, and → the picture's background colour.
  intro: Record<string, string>; introBg: Record<string, string>;
  // The «آموزش» cards' pictures that the server has made: card number → version.
  learnArt: Record<string, string>; learnBg: Record<string, string>; courseArt: Record<string, string>;
  // «آزمون جدید»'s question pictures that the server has made: question number → version.
  newqArt: Record<string, string>;
  // The profile pictures to choose from that the server has made: number → version.
  avatarArt: Record<string, string>; heroArt: Record<string, string>; loginArt: Record<string, string>;
  // The teaching pages' pictures (signs, right of way) that the server has made: key → version. At /app (PROVE_PICS) a
  // version starting with «p» is prove.dk's picture of it (/img/guideprove/<key>.png).
  guideArt: Record<string, string>;
  // Set the profile picture: one of the made ones, an own photo (base64 JPEG, cropped and small) or none.
  setAvatar: (b: { preset: number } | { image: string } | { remove: true }) => Promise<void>;
  toggleSaved: (id: number, a?: number[]) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  // `exam`: the questions' language chosen while signing up (ui/sign-steps.tsx), so the language screen does not come.
  register: (name: string, username: string, password: string, email?: string, exam?: 'da' | 'en') => Promise<void>;
  // Email confirmation is on (the server can send mail): signing up asks for an address, and a new account waits for its link.
  mail: boolean;
  // The confirmation link again, or to a new address (which then needs confirming).
  sendVerify: (email?: string) => Promise<void>;
  guest: (name: string) => Promise<void>;
  // Forgotten password: a 6-digit code to an address; whether a code is right; then the new password (signs in).
  forgot: (email: string) => Promise<void>;
  // Without passwords (email on): a 6-digit code to the address, to sign in or (signup) to make a new account; then the
  // code signs in or makes the account with its shown name and the questions' language (ui/sign-steps.tsx).
  sendCode: (email: string, signup: boolean) => Promise<void>;
  // Throws when an account already has the address (sign-up's email step).
  emailFree: (email: string) => Promise<void>;
  codeIn: (email: string, code: string, name?: string, exam?: 'da' | 'en') => Promise<void>;
  // Signing in with Google (server.js google/start): `google` while the server has it on; on the web the page goes to
  // Google and comes back (its outcome read at start, `googleErr` when it failed); in the app it opens in a browser.
  google: boolean; googleErr: string; googleSignIn: () => Promise<void>;
  // Throws when a sign-up code is wrong (before its last step).
  checkCode: (email: string, code: string) => Promise<void>;
  // The code that deletes the account, to its address (the settings' «حذف حساب کاربری»).
  deleteCode: () => Promise<void>;
  // The account as the server sent it back (after the free answer analysis, review.tsx).
  takeUser: (u: User) => void;
  checkResetCode: (email: string, code: string) => Promise<void>;
  resetPassword: (email: string, code: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // The account signed out last on this device (undefined while it is read), for the sign-in page's «خوش برگشتید».
  lastUser: LastUser | null | undefined; forgetLastUser: () => void;
  // Change the shown name and / or the password (with the current one); the username stays.
  updateAccount: (b: { name?: string; current?: string; password?: string }) => Promise<void>;
  // Delete the account and all its data on the server (with the password), then sign out on the device.
  // With the code from deleteCode ({ code }) or, for accounts without an address, the password.
  deleteAccount: (proof: { password: string } | { code: string }) => Promise<void>;
  // Delete every past exam and lesson of the user.
  clearAttempts: () => Promise<void>;
  refresh: () => Promise<void>;
  saveAttempt: (a: Omit<Attempt, 'at'>) => Promise<void>;
  setSettings: (s: Partial<Settings>) => Promise<void>;
};
export type Plan = { id: 'week' | 'month' | 'quarter'; days: number; price: number };
// promo: the free trial's days when a trial code can be entered.
export type Pay = { plans: Plan[]; gate?: boolean; test?: boolean; promo?: number; trial?: number };
// Back from Google on the web (server.js google/callback): its one-time code or its error, read once from the address,
// which is then cleaned.
const GOOGLE_FAILED = 'ورود با گوگل کامل نشد؛ دوباره امتحان کنید.';
const googleError = (k: string) => (k === 'cancelled' ? 'ورود با گوگل لغو شد.' : k === 'busy' ? 'ساخت حساب از این اتصال زیاد بوده است؛ کمی بعد دوباره امتحان کنید.' : GOOGLE_FAILED);
function googleBack(): { code?: string; error?: string } | null {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  const q = new URLSearchParams(window.location.search), code = q.get('google'), error = q.get('google_error');
  if (!code && !error) return null;
  // (once now, and again after the router has set its own first address from the one it opened with)
  const clean = () => {
    const now = new URLSearchParams(window.location.search);
    if (!now.has('google') && !now.has('google_error')) return;
    now.delete('google'); now.delete('google_error');
    window.history.replaceState(window.history.state, '', `${window.location.pathname}${now.toString() ? `?${now}` : ''}`);
  };
  clean(); setTimeout(clean, 1500); setTimeout(clean, 4000);
  return { code: code ?? undefined, error: error ?? undefined };
}
const AppCtx = createContext<Ctx | null>(null);
const DEFAULTS: Settings = { showFa: true, timer: true, lang: 'da' };

// The account signed out, kept on the device for the sign-in page's «خوش برگشتید» (ui/welcome-back.tsx; Mojtaba
// 2026-10-20): not guests, whose password nobody knows. On the web its own photo is kept too, as a small data URL.
async function rememberLast(u: User | undefined, token: string | null, set: (u: LastUser) => void) {
  if (!u || u.guest) return;
  const last: LastUser = { name: u.name, id: u.email || u.username, ...(u.avatar?.preset ? { preset: u.avatar.preset } : {}) };
  await saveLastUser(last); set(last);
  if (!u.avatar?.photo || !token || Platform.OS !== 'web') return;
  try {
    const r = await fetch(`${API_URL}/api/avatar?v=${u.avatar.photo}`, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) return;
    const b = await r.blob();
    if (b.size > 200e3) return;
    const photo = await new Promise<string>((ok, no) => { const f = new FileReader(); f.onload = () => ok(String(f.result)); f.onerror = no; f.readAsDataURL(b); });
    await saveLastUser({ ...last, photo }); set({ ...last, photo });
  } catch {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [me, setMe] = useState<Me | null>(null);
  const [bank, setBank] = useState<Bank | null>(null);
  const [newBank, setNewBank] = useState<NewBank | null>(null);
  const [aiLessons, setAiLessons] = useState(false);
  const [tts, setTts] = useState(false); // questions read aloud (the server has an ElevenLabs key)
  const [pay, setPay] = useState<Pay | null>(null);
  const [play, setPlay] = useState<{ products: string[] } | null>(null);
  const [mail, setMail] = useState(false), [google, setGoogle] = useState(false), [googleErr, setGoogleErr] = useState('');
  const [lastUser, setLastUser] = useState<LastUser | null | undefined>(undefined);
  useEffect(() => { loadLastUser().then(setLastUser, () => setLastUser(null)); }, []);
  const [intro, setIntro] = useState<Record<string, string>>({});
  const [introBg, setIntroBg] = useState<Record<string, string>>({});
  const [learnArt, setLearnArt] = useState<Record<string, string>>({});
  const [learnBg, setLearnBg] = useState<Record<string, string>>({});
  const [courseArt, setCourseArt] = useState<Record<string, string>>({});
  const [newqArt, setNewqArt] = useState<Record<string, string>>({});
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
    // Notifications allowed on this device before: it is this account's device now (lib/push.ts).
    if (!PROVE_PICS && !d.user.verify) syncPush(d.user.username).catch(() => {});
    api<{ aiLessons?: boolean; tts?: boolean; pay?: Pay; play?: { products: string[] } }>('GET', 'config').then(x => { setAiLessons(!!x.aiLessons); setTts(!!x.tts); setPay(x.pay ?? null); setPlay(x.play ?? null); }).catch(() => {});
    // An account still waiting for its email link reads only itself, so nothing else (the questions) is loaded yet.
    if (d.user.verify) return;
    if (!bank) setBank(await fetchBank<Bank>());
    // (the main site only; none is fine: the new test then waits)
    // A question the admin took out of the bank (x) is never picked for a new test, but stays known for the tests
    // already taken with it (newBank.gone).
    if (!PROVE_BANK && !newBank) fetchBank<NewBank>('newq.js').then(d => setNewBank({ questions: d.questions.filter(q => !q.x), gone: d.questions.filter(q => q.x) })).catch(() => {});
  }, [bank, newBank]);

  // The intro comes before signing in, so the pictures it can show are read at start too.
  useEffect(() => { api<{ intro?: Record<string, string>; introBg?: Record<string, string>; learnArt?: Record<string, string>; learnBg?: Record<string, string>; courseArt?: Record<string, string>; newqArt?: Record<string, string>; avatarArt?: Record<string, string>; heroArt?: Record<string, string>; loginArt?: Record<string, string>; guideArt?: Record<string, string>; mail?: boolean; google?: boolean; theme?: string }>('GET', PROVE_PICS ? 'config?pics=prove' : 'config').then(x => { setMail(!!x.mail && !PROVE_PICS); setGoogle(!!x.google && !PROVE_PICS); rememberDefault(x.theme); setIntro(x.intro || {}); setIntroBg(x.introBg || {}); setLearnArt(x.learnArt || {}); setLearnBg(x.learnBg || {}); setCourseArt(x.courseArt || {}); setNewqArt(x.newqArt || {}); setAvatarArt(x.avatarArt || {}); setHeroArt(x.heroArt || {}); setLoginArt(x.loginArt || {}); setGuideArt(x.guideArt || {}); }).catch(() => {}); }, []);

  useEffect(() => {
    (async () => {
      // Back from Google on the web: its one-time code is traded for the session (and taken out of the address).
      const back = googleBack();
      if (back?.code) {
        try { const d = await api<{ token: string }>('POST', 'google/finish', { code: back.code }); setApiToken(d.token); await saveToken(d.token); }
        // (an old code left in the address after a reload, while signed in, says nothing)
        catch (e) { if (!(await loadToken())) setGoogleErr(e instanceof Error ? e.message : GOOGLE_FAILED); }
      } else if (back?.error) setGoogleErr(googleError(back.error));
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
    ready, token, bank, newBank, user: me?.user ?? null, attempts: me?.attempts ?? [], imgv: me?.imgv ?? {},
    settings: { ...DEFAULTS, ...(me?.settings || {}) },
    pay: PROVE_PICS ? null : pay, play: PROVE_PICS ? null : play, premium, locked,
    redeemPromo: async code => {
      const d = await api<{ user: User }>('POST', 'promo', { code });
      setMe(m => (m ? { ...m, user: d.user } : m));
    },
    startTrial: async () => {
      const d = await api<{ user: User }>('POST', 'trial');
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
    saved: Array.isArray(me?.saved) ? me.saved : [], aiLessons, tts: tts && !locked, ttsServer: tts, intro, introBg, learnArt, learnBg, courseArt, newqArt, avatarArt, heroArt, loginArt, guideArt,
    toggleSaved: async (id, a) => {
      const list = (v?: Saved[]) => (Array.isArray(v) ? v : []);
      const on = !list(me?.saved).some(x => x.id === id);
      const before = list(me?.saved);
      setMe(m => (m ? { ...m, saved: on ? [...list(m.saved).filter(x => x.id !== id), { id, a, at: Date.now() }] : list(m.saved).filter(x => x.id !== id) } : m));
      try { if (on) await api('POST', 'saved', { id, a }); else await api('DELETE', 'saved', { id }); }
      catch (e) { setMe(m => (m ? { ...m, saved: before } : m)); throw e; }
    },
    terms: me?.terms ?? [],
    toggleTerm: async da => {
      const before = me?.terms ?? [], next = before.includes(da) ? before.filter(x => x !== da) : [da, ...before];
      setMe(m => (m ? { ...m, terms: next } : m));
      try { await api('PUT', 'terms', { terms: next }); }
      catch (e) { setMe(m => (m ? { ...m, terms: before } : m)); throw e; }
    },
    Q: new Map([...(bank?.questions || []), ...(newBank?.questions || []), ...(newBank?.gone || [])].map(q => [q.id, q])),
    login: async (username, password) => { const d = await api<{ token: string }>('POST', 'login', { username, password }); await signedIn(d.token); },
    register: async (name, username, password, email, exam) => { const d = await api<{ token: string }>('POST', 'register', { name, username, password, email, lang: UI_LANG, exam }); await signedIn(d.token); },
    mail,
    sendVerify: async email => {
      try { const d = await api<{ user: User }>('POST', 'verifysend', { email, lang: UI_LANG }); setMe(m => (m ? { ...m, user: d.user } : m)); }
      catch (e) { load().catch(() => {}); throw e; }
    },
    guest: async name => { const d = await api<{ token: string }>('POST', 'guest', { name }); await signedIn(d.token); },
    forgot: async email => { await api('POST', 'forgot', { email, lang: UI_LANG }); },
    emailFree: async email => { await api('POST', 'emailfree', { email }); },
    sendCode: async (email, signup) => { await api('POST', 'code', { email, signup, lang: UI_LANG }); },
    google, googleErr,
    googleSignIn: async () => {
      setGoogleErr('');
      const url = `${API_URL}/api/google/start?lang=${UI_LANG}&base=${PROVE_BANK ? '/app/' : '/'}`;
      if (Platform.OS === 'web') { window.location.assign(`${url}&ret=web`); return; }
      const scheme = PROVE_BANK ? 'teoriprove-prove' : 'teoriprove';
      const r = await WebBrowser.openAuthSessionAsync(`${url}&ret=app&scheme=${scheme}`, `${scheme}://google`);
      if (r.type !== 'success') return;
      const q = new URL(r.url).searchParams;
      if (q.get('google_error')) throw new Error(googleError(q.get('google_error')!));
      const d = await api<{ token: string }>('POST', 'google/finish', { code: q.get('google') });
      await signedIn(d.token);
    },
    codeIn: async (email, code, name, exam) => { const d = await api<{ token: string }>('POST', 'codein', { email, code, name, exam, lang: UI_LANG }); await signedIn(d.token); },
    checkCode: async (email, code) => { await api('POST', 'codecheck', { email, code }); },
    takeUser: u => setMe(m => (m ? { ...m, user: u } : m)),
    deleteCode: async () => { await api('POST', 'deletecode', { lang: UI_LANG }); },
    checkResetCode: async (email, code) => { await api('POST', 'resetcheck', { email, code }); },
    resetPassword: async (email, code, password) => { const d = await api<{ token: string }>('POST', 'reset', { email, code, password }); await signedIn(d.token); },
    // Signed out on the device at once; the server is told in the background (with the old token), so a slow or
    // missing connection never keeps the user signed in.
    logout: async () => {
      const old = getApiToken();
      gen.current++;
      setApiToken(null); setToken(null); setMe(null);
      await saveToken(null);
      // The account is remembered for the sign-in page's «خوش برگشتید» first (its photo is fetched while the token still
      // works), then it forgets this device's notifications (lib/push.ts), then the server ends the session.
      const kept = rememberLast(me?.user, old, setLastUser);
      if (old) kept.then(() => forgetPush(old)).catch(() => {}).then(() => api('POST', 'logout', undefined, old)).catch(() => {});
      lookOut();
    },
    lastUser, forgetLastUser: () => { saveLastUser(null); setLastUser(null); },
    // The server removes the account and its sessions, so the device only forgets its token.
    deleteAccount: async proof => {
      await api('DELETE', 'account', proof);
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
  }), [ready, token, me, bank, newBank, aiLessons, tts, pay, play, mail, premium, locked, intro, introBg, learnArt, learnBg, courseArt, newqArt, avatarArt, heroArt, loginArt, guideArt, lastUser, google, googleErr]);
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

// Image source of a question picture: the token goes in a header on iOS/Android and in ?t= on the web. A question of
// «آزمون جدید» (its picture under newq-art/): its made picture, or null while it is not made yet (a placeholder shows).
export function useQuestionImage() {
  const { token, imgv, newqArt } = useApp();
  return (q: Question) => {
    if (q.img.startsWith('newq-art/')) { const nv = newqArt[q.id]; return nv ? { uri: `${API_URL}/${q.img}`, v: `v=${encodeURIComponent(nv)}`, token } : null; }
    // At /app the question's original picture (from prove.dk), not a remade one.
    const base = `${API_URL}/${q.img}`, v = PROVE_BANK ? `orig=1${FROZEN ? `&frozen=${FROZEN}` : ''}` : imgv[q.id] ? `v=${encodeURIComponent(imgv[q.id])}` : '';
    return { uri: base, v, token };
  };
}
