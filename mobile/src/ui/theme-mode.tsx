// Keeps the theme mode (follow the system by default, or always light / dark), saves it on the device, and resolves
// it to the light or dark theme the screens use; with «خودکار» the app changes when the system does.
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

import { initialMode, loadMode, saveMode, type ThemeMode } from '@/lib/prefs';
import { ThemeContext } from './theme';

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(() => initialMode() ?? 'system');
  useEffect(() => { loadMode().then(m => { if (m) setModeState(m); }); }, []);
  const setMode = (m: ThemeMode) => { setModeState(m); saveMode(m); };
  const theme = mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : mode;
  return <ThemeContext.Provider value={{ theme, mode, setMode }}>{children}</ThemeContext.Provider>;
}
