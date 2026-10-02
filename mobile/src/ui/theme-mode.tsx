// Keeps the chosen theme (light or dark; light by default) and saves it on the device.
import { useEffect, useState } from 'react';

import { initialTheme, loadTheme, saveTheme, type ThemeName } from '@/lib/prefs';
import { ThemeContext } from './theme';

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => initialTheme() ?? 'light');
  useEffect(() => { loadTheme().then(t => { if (t) setThemeState(t); }); }, []);
  const setTheme = (t: ThemeName) => { setThemeState(t); saveTheme(t); };
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
