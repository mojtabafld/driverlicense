// The chosen theme on the web version: the same localStorage entry as the site ('tp.theme'), so both use one choice.
export type ThemeName = 'light' | 'dark';
const KEY = 'tp.theme';
export const initialTheme = (): ThemeName | null => {
  try { const v = JSON.parse(localStorage.getItem(KEY) ?? 'null'); return v === 'dark' || v === 'light' ? v : null; } catch { return null; }
};
export const loadTheme = async () => initialTheme();
export const saveTheme = async (t: ThemeName) => { try { localStorage.setItem(KEY, JSON.stringify(t)); } catch {} };
