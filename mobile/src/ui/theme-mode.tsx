// Keeps the theme mode (follow the system by default, or always light / dark), saves it on the device, and resolves
// it to the light or dark theme the screens use; with «خودکار» the app changes when the system does.
import { useCallback, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { initialMode, loadMode, saveMode, type ThemeMode } from '@/lib/prefs';
import { ThemeContext } from './theme';

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(() => initialMode() ?? 'system');
  useEffect(() => { loadMode().then(m => { if (m) setModeState(m); }); }, []);
  const setMode = (m: ThemeMode) => { setModeState(m); saveMode(m); };
  // (the sign-in pages: the phone's own, ui/theme.ts useSystemTheme)
  const [forced, setForced] = useState(0);
  const followSystem = useCallback((on: boolean) => setForced(n => Math.max(0, n + (on ? 1 : -1))), []);
  const theme = mode === 'system' || forced ? (system === 'dark' ? 'dark' : 'light') : mode;
  return <ThemeContext.Provider value={{ theme, mode, setMode, followSystem }}>{children}</ThemeContext.Provider>;
}
