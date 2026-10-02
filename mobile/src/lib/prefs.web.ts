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
