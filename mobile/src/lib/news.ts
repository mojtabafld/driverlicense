// The news for every user (server.js «news»; written by the admin in the dashboard): read when the home page shows,
// and whether one is newer than the last the device has seen (the bell's red dot). Opening the news page marks them seen.
import { useCallback, useSyncExternalStore } from 'react';
import { useFocusEffect } from 'expo-router';

import { api } from './api';
import { useApp } from './store';
import { loadNewsSeen, saveNewsSeen } from './prefs';

export type News = { id: string; at: number; title: string; text: string };

// (one snapshot object, replaced on each change, read through useSyncExternalStore so the screens always see the latest)
type Snap = { items: News[]; loaded: boolean; seenAt: number | null };
let cache: News[] | null = null, seenAt: number | null = null, snap: Snap = { items: [], loaded: false, seenAt: null };
const listeners = new Set<() => void>();
const tell = () => { snap = { items: cache ?? [], loaded: cache != null, seenAt }; listeners.forEach(f => f()); };
const subscribe = (f: () => void) => { listeners.add(f); return () => { listeners.delete(f); }; };

async function refresh() {
  try { cache = (await api<{ items: News[] }>('GET', 'news')).items; } catch { if (cache == null) return; }
  if (seenAt == null) seenAt = await loadNewsSeen();
  tell();
}

export function markNewsSeen() {
  const at = cache?.[0]?.at ?? Date.now();
  seenAt = at; saveNewsSeen(at); tell();
}

export function useNews() {
  const now = useSyncExternalStore(subscribe, () => snap, () => snap);
  // (read once signed in, and again each time the page comes into view)
  const { token } = useApp();
  useFocusEffect(useCallback(() => { if (token) refresh(); }, [token]));
  return { items: now.items, loaded: now.loaded, unread: now.seenAt != null && now.items.some(x => x.at > (now.seenAt ?? 0)) };
}
