// The chosen theme mode on the web version: follow the system (default), or always light / dark. The app keeps its
// mode in 'tp.appTheme'; a fixed light / dark choice is also written to the site's own 'tp.theme', so the site
// follows it too (the site has no automatic mode).
export type ThemeName = 'light' | 'dark';
export type ThemeMode = 'system' | ThemeName;
const KEY = 'tp.appTheme', SITE_KEY = 'tp.theme';
const valid = (v: unknown): v is ThemeMode => v === 'system' || v === 'light' || v === 'dark';
export const initialMode = (): ThemeMode | null => {
  try { const v = JSON.parse(localStorage.getItem(KEY) ?? 'null'); return valid(v) ? v : null; } catch { return null; }
};
export const loadMode = async () => initialMode();
export const saveMode = async (m: ThemeMode) => {
  try { localStorage.setItem(KEY, JSON.stringify(m)); if (m !== 'system') localStorage.setItem(SITE_KEY, JSON.stringify(m)); } catch {}
};

// Whether the intro (src/ui/onboarding.tsx) was seen in this browser; missing on the first visit and for anyone who
// used a version without it, so both get it once.
const ONBOARDED = 'tp.onboarded';
// The value marking the intro as seen; a new value shows the intro to everyone once more (2: after the teal redesign;
// 3: with the first-visit tooltips; 4: with the look chosen on the language screen, for everyone again).
const SEEN = '4';
export const initialOnboarded = (): boolean | null => {
  try { return localStorage.getItem(ONBOARDED) === SEEN; } catch { return false; }
};
export const loadOnboarded = async () => initialOnboarded() ?? false;
export const saveOnboarded = async () => { try { localStorage.setItem(ONBOARDED, SEEN); } catch {} };

// The web version asks for the questions' language once per account (settings.langChosen), not per browser.
export const loadLangAsked = async () => true;
export const saveLangAsked = async () => {};

// The parts of «قوانین» opened at least once (their titles), kept in this browser, so the page can show what is left.
const RULES_READ = 'tp.rules.read';
export const loadRulesRead = async (): Promise<string[]> => {
  try { const v = JSON.parse(localStorage.getItem(RULES_READ) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; } catch { return []; }
};
export const saveRulesRead = async (titles: string[]) => { try { localStorage.setItem(RULES_READ, JSON.stringify(titles)); } catch {} };

// The account last signed out in this browser (lib/store.tsx logout), so the sign-in page can greet it again
// (ui/welcome-back.tsx): its shown name, the email or username it signs in with, its chosen profile picture and its
// own photo (a small data URL; the photo needs the session, which is gone once signed out). Null when forgotten.
export type LastUser = { name: string; id: string; preset?: number; photo?: string };
const LAST_USER = 'tp.last.user';
export const loadLastUser = async (): Promise<LastUser | null> => {
  try { const v = JSON.parse(localStorage.getItem(LAST_USER) || 'null'); return v && typeof v.id === 'string' && typeof v.name === 'string' ? v : null; } catch { return null; }
};
export const saveLastUser = async (u: LastUser | null) => { try { if (u) localStorage.setItem(LAST_USER, JSON.stringify(u)); else localStorage.removeItem(LAST_USER); } catch {} };

// The accounts (and banks) that have seen the confetti for answering every question of the random test, so it plays once.
// The accounts the first premium page (ui/pro-promo.tsx) was shown to on this device.
const PROMO_SEEN = 'tp.promoSeen';
export const loadPromoSeen = async (): Promise<string[]> => {
  try { const v = JSON.parse(localStorage.getItem(PROMO_SEEN) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; } catch { return []; }
};
export const savePromoSeen = async (keys: string[]) => { try { localStorage.setItem(PROMO_SEEN, JSON.stringify(keys)); } catch {} };
// When the news (the bell on the home page) was last looked at on this device.
const NEWS_SEEN = 'tp.newsSeen';
export const loadNewsSeen = async (who = ''): Promise<number> => { try { return +(localStorage.getItem(NEWS_SEEN + who) || 0) || 0; } catch { return 0; } };
export const saveNewsSeen = async (at: number, who = '') => { try { localStorage.setItem(NEWS_SEEN + who, String(at)); } catch {} };
// The messages cleared on this device (prefs.ts).
const NEWS_HIDE = 'tp_news_hide';
export const loadNewsHide = async (who = ''): Promise<number> => { try { return +(localStorage.getItem(NEWS_HIDE + who) || 0) || 0; } catch { return 0; } };
export const saveNewsHide = async (at: number, who = '') => { try { localStorage.setItem(NEWS_HIDE + who, String(at)); } catch {} };
const CHEERED = 'tp.cheered';
export const loadCheered = async (): Promise<string[]> => {
  try { const v = JSON.parse(localStorage.getItem(CHEERED) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; } catch { return []; }
};
export const saveCheered = async (keys: string[]) => { try { localStorage.setItem(CHEERED, JSON.stringify(keys)); } catch {} };
