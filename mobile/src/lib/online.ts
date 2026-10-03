// Whether the app can reach the internet. On the web the browser says so (navigator.onLine and its online / offline
// events); everywhere the server is also asked (/api/config) at start, when the app comes back to the front, and
// every few seconds while offline, so a phone notices both losing and getting back the connection.
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Platform } from 'react-native';

import { API_URL } from './config';

const web = Platform.OS === 'web' && typeof navigator !== 'undefined';

async function reachable() {
  const ctl = new AbortController(), t = setTimeout(() => ctl.abort(), 7000);
  try { await fetch(`${API_URL}/api/config`, { signal: ctl.signal, cache: 'no-store' }); return true; }
  catch { return false; }
  finally { clearTimeout(t); }
}

export function useOnline() {
  const [online, setOnline] = useState(() => (web ? navigator.onLine : true));
  const busy = useRef(false);
  const check = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    const ok = (!web || navigator.onLine) && await reachable();
    busy.current = false;
    setOnline(ok);
  }, []);
  useEffect(() => {
    const first = setTimeout(check, 0);
    const sub = AppState.addEventListener('change', s => { if (s === 'active') check(); });
    const up = () => check(), down = () => setOnline(false);
    if (web) { window.addEventListener('online', up); window.addEventListener('offline', down); }
    return () => { clearTimeout(first); sub.remove(); if (web) { window.removeEventListener('online', up); window.removeEventListener('offline', down); } };
  }, [check]);
  // While offline: ask again every 5 seconds.
  useEffect(() => {
    if (online) return;
    const t = setInterval(check, 5000);
    return () => clearInterval(t);
  }, [online, check]);
  return { online, check };
}
