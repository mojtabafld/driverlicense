// The chosen theme on iOS/Android, kept on the device.
import * as SecureStore from 'expo-secure-store';

export type ThemeName = 'light' | 'dark';
const KEY = 'tp_theme';
export const initialTheme = (): ThemeName | null => null;
export const loadTheme = async (): Promise<ThemeName | null> => {
  try { const v = await SecureStore.getItemAsync(KEY); return v === 'dark' || v === 'light' ? v : null; } catch { return null; }
};
export const saveTheme = (t: ThemeName) => SecureStore.setItemAsync(KEY, t).catch(() => {});
