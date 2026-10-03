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
export const initialOnboarded = (): boolean | null => null;
export const loadOnboarded = async (): Promise<boolean> => {
  try { return (await SecureStore.getItemAsync(ONBOARDED)) === '1'; } catch { return false; }
};
export const saveOnboarded = () => SecureStore.setItemAsync(ONBOARDED, '1').catch(() => {});
