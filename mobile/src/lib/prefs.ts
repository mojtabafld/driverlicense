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
