// Starts the app again so choices read when it starts (the app's language, the colour theme) take effect: the web page
// reloads; the Android app reloads its JavaScript in place (expo-updates; no message, the app stays open). Closing the
// app instead did not work: Android kept the old JavaScript running, so it opened again in the old language.
import { Platform } from 'react-native';

export function reloadApp(fallback?: () => void) {
  if (Platform.OS === 'web') { if (typeof window !== 'undefined') window.location.reload(); return; }
  try {
    require('expo-updates').reloadAsync().catch(() => fallback?.());
  } catch { fallback?.(); }
}
