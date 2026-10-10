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
