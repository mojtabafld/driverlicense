// The news for every user (server.js «news»; written by the admin in the dashboard): read when the home page shows,
// and whether one is newer than the last the device has seen (the bell's red dot). Opening the news page marks them seen.
import { useCallback, useSyncExternalStore } from 'react';
import { useFocusEffect } from 'expo-router';

import { api } from './api';
import { useApp } from './store';
import { loadNewsHide, loadNewsSeen, saveNewsHide, saveNewsSeen } from './prefs';

export type News = { id: string; at: number; title: string; text: string };

// (one snapshot object, replaced on each change, read through useSyncExternalStore so the screens always see the latest)
// `hideBefore`: the messages up to then are cleared on this device (the news page's «پاکسازی»; Mojtaba 2026-10-30).
type Snap = { items: News[]; loaded: boolean; seenAt: number | null; restorable: boolean };
let cache: News[] | null = null, seenAt: number | null = null, hideBefore = 0, snap: Snap = { items: [], loaded: false, seenAt: null, restorable: false };
const listeners = new Set<() => void>();
const tell = () => {
  const all = cache ?? [];
  snap = { items: all.filter(x => x.at > hideBefore), loaded: cache != null, seenAt, restorable: canRestore(all, hideBefore) };
  listeners.forEach(f => f());
};
const subscribe = (f: () => void) => { listeners.add(f); return () => { listeners.delete(f); }; };

async function refresh() {
  try { cache = (await api<{ items: News[] }>('GET', 'news')).items; } catch { if (cache == null) return; }
  if (seenAt == null) { seenAt = await loadNewsSeen(); hideBefore = await loadNewsHide(); }
  tell();
}

// «پاکسازی»: every message so far hidden on this device; «بازسازی»: those of the last seven days back.
const WEEK = 7 * 864e5;
export function clearNews() { hideBefore = Date.now(); saveNewsHide(hideBefore); tell(); }
export function restoreNews() { hideBefore = Math.min(hideBefore, Date.now() - WEEK); saveNewsHide(hideBefore); tell(); }
// Whether «بازسازی» would bring any back (a hidden message from the last seven days).
function canRestore(all: News[], before: number) { return all.some(x => x.at <= before && x.at > Date.now() - WEEK); }

export function markNewsSeen() {
  const at = cache?.[0]?.at ?? Date.now();
  seenAt = at; saveNewsSeen(at); tell();
}

export function useNews() {
  const now = useSyncExternalStore(subscribe, () => snap, () => snap);
  // (read once signed in, and again each time the page comes into view)
  const { token } = useApp();
  useFocusEffect(useCallback(() => { if (token) refresh(); }, [token]));
  return { items: now.items, loaded: now.loaded, unread: now.seenAt != null && now.items.some(x => x.at > (now.seenAt ?? 0)),
    restorable: now.restorable };
}
