// The chosen theme mode on iOS/Android, kept on the device: follow the system (default), or always light / dark.
import * as SecureStore from 'expo-secure-store';

export type ThemeName = 'light' | 'dark';
export type ThemeMode = 'system' | ThemeName;
const KEY = 'tp_theme_mode';
const valid = (v: unknown): v is ThemeMode => v === 'system' || v === 'light' || v === 'dark';
export const initialMode = (): ThemeMode | null => null;
export const loadMode = async (): Promise<ThemeMode | null> => {
  try { const v = await SecureStore.getItemAsync(KEY); return valid(v) ? v : null; } catch { return null; }
};
export const saveMode = (m: ThemeMode) => SecureStore.setItemAsync(KEY, m).catch(() => {});

// Whether the intro (src/ui/onboarding.tsx) was seen on this device; missing on first launch and on devices that
// ran a version without it, so both get it once.
const ONBOARDED = 'tp_onboarded';
// The value marking the intro as seen; a new value shows the intro to everyone once more (2: after the teal redesign;
// 3: with the first-visit tooltips; 4: with the look chosen on the language screen, for everyone again).
const SEEN = '4';
export const initialOnboarded = (): boolean | null => null;
export const loadOnboarded = async (): Promise<boolean> => {
  try { return (await SecureStore.getItemAsync(ONBOARDED)) === SEEN; } catch { return false; }
};
export const saveOnboarded = () => SecureStore.setItemAsync(ONBOARDED, SEEN).catch(() => {});

// Whether this phone has asked for the questions' language: asked once on every new device after signing in (the
// account's own choice preselected), even when the account chose one elsewhere.
// ASKED: a new value asks everyone once more (2: with the look on the same screen).
const LANG_ASKED = 'tp_lang_asked', ASKED = '2';
export const loadLangAsked = async (): Promise<boolean> => {
  try { return (await SecureStore.getItemAsync(LANG_ASKED)) === ASKED; } catch { return false; }
};
export const saveLangAsked = () => SecureStore.setItemAsync(LANG_ASKED, ASKED).catch(() => {});

// The first-visit tooltips of each tab (src/ui/tour.tsx), seen or closed: per page and account on this device.
// TOUR_SET: a new value shows the tooltips to everyone once more.
const TOUR_SET = 'v2';
const tourKey = (page: string, user: string) => `tp_tour_${TOUR_SET}_${page}_${user.replace(/[^A-Za-z0-9._-]/g, '_')}`;
export const loadTourSeen = async (page: string, user: string): Promise<boolean> => {
  try { return (await SecureStore.getItemAsync(tourKey(page, user))) === '1'; } catch { return false; }
};
export const saveTourSeen = (page: string, user: string) => SecureStore.setItemAsync(tourKey(page, user), '1').catch(() => {});

// The parts of «قوانین» opened at least once (their titles), kept on the device, so the page can show what is left.
const RULES_READ = 'tp_rules_read';
export const loadRulesRead = async (): Promise<string[]> => {
  try { const v = JSON.parse((await SecureStore.getItemAsync(RULES_READ)) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; } catch { return []; }
};
export const saveRulesRead = (titles: string[]) => SecureStore.setItemAsync(RULES_READ, JSON.stringify(titles)).catch(() => {});
