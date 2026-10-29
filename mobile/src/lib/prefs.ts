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

// The parts of «قوانین» opened at least once (their titles), kept on the device, so the page can show what is left.
const RULES_READ = 'tp_rules_read';
export const loadRulesRead = async (): Promise<string[]> => {
  try { const v = JSON.parse((await SecureStore.getItemAsync(RULES_READ)) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; } catch { return []; }
};
export const saveRulesRead = (titles: string[]) => SecureStore.setItemAsync(RULES_READ, JSON.stringify(titles)).catch(() => {});

// The account last signed out on this device (lib/store.tsx logout), so the sign-in page can greet it again
// (ui/welcome-back.tsx): its shown name, the email or username it signs in with and its chosen profile picture (the
// secure store keeps small values only, so not its own photo). Null when forgotten.
export type LastUser = { name: string; id: string; preset?: number; photo?: string };
const LAST_USER = 'tp_last_user';
export const loadLastUser = async (): Promise<LastUser | null> => {
  try { const v = JSON.parse((await SecureStore.getItemAsync(LAST_USER)) || 'null'); return v && typeof v.id === 'string' && typeof v.name === 'string' ? v : null; } catch { return null; }
};
export const saveLastUser = (u: LastUser | null) => (u ? SecureStore.setItemAsync(LAST_USER, JSON.stringify({ ...u, photo: undefined })) : SecureStore.deleteItemAsync(LAST_USER)).catch(() => {});

// The accounts (and banks) that have seen the confetti for answering every question of the random test, so it plays once.
// The accounts the first premium page (ui/pro-promo.tsx) was shown to on this device.
const PROMO_SEEN = 'tp_promo_seen';
export const loadPromoSeen = async (): Promise<string[]> => {
  try { const v = JSON.parse((await SecureStore.getItemAsync(PROMO_SEEN)) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; } catch { return []; }
};
export const savePromoSeen = (keys: string[]) => SecureStore.setItemAsync(PROMO_SEEN, JSON.stringify(keys)).catch(() => {});
// When the news (the bell on the home page) was last looked at on this device.
const NEWS_SEEN = 'tp_news_seen';
export const loadNewsSeen = async (): Promise<number> => { try { return +((await SecureStore.getItemAsync(NEWS_SEEN)) || 0) || 0; } catch { return 0; } };
export const saveNewsSeen = (at: number) => SecureStore.setItemAsync(NEWS_SEEN, String(at)).catch(() => {});
const CHEERED = 'tp_cheered';
export const loadCheered = async (): Promise<string[]> => {
  try { const v = JSON.parse((await SecureStore.getItemAsync(CHEERED)) || '[]'); return Array.isArray(v) ? v.filter(x => typeof x === 'string') : []; } catch { return []; }
};
export const saveCheered = (keys: string[]) => SecureStore.setItemAsync(CHEERED, JSON.stringify(keys)).catch(() => {});
