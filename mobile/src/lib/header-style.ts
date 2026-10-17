// «هدر ساده» (settings, «ظاهر»): the pages' headers without their pictures and drawings: the tabs and the inner pages
// that have a picture header (the course, rules, signs, right of way) keep the header's colour, its fade into the page
// and the title (Hero in ui/kit.tsx), only the picture goes. Kept on this device (like the colour theme), and it
// applies at once, with no reload.
import { useSyncExternalStore } from 'react';
import { Platform } from 'react-native';

const KEY = 'tp.plainHeader';
const web = Platform.OS === 'web';
function read(): boolean {
  try { return (web ? localStorage.getItem(KEY) : require('expo-secure-store').getItem(KEY)) === '1'; } catch { return false; }
}
let plain = read();
const subs = new Set<() => void>();

export function setPlainHeader(v: boolean) {
  plain = v;
  try { if (web) localStorage.setItem(KEY, v ? '1' : '0'); else require('expo-secure-store').setItem(KEY, v ? '1' : '0'); } catch {}
  subs.forEach(f => f());
}
// Whether the pages' headers are plain (no picture), following a change at once.
export function usePlainHeader(): boolean {
  return useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f); }; }, () => plain, () => plain);
}
