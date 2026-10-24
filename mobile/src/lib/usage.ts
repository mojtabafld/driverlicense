// The pages opened, for the app's daily AI report (server's insights.js; Mojtaba 2026-10-24): each page's path (its
// numbers turned into :n by the server, no query) is kept here and sent at most every 30 seconds and when the app goes
// to the background (POST /api/usage). The server counts them per day only, without the account.
import { usePathname } from 'expo-router';
import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';

import { api } from './api';

let queue: string[] = [];
let last = '';
function flush() {
  if (!queue.length) return;
  const screens = queue; queue = [];
  api('POST', 'usage', { screens }).catch(() => {});
}

// `on`: signed in (the API needs the account to answer, though it does not keep it with the counts).
export function useUsage(on: boolean) {
  const path = usePathname();
  useEffect(() => {
    if (!on || !path || path === last) return;
    last = path;
    if (queue.length < 60) queue.push(path);
  }, [on, path]);
  useEffect(() => {
    if (!on) return;
    const t = setInterval(flush, 30e3);
    const sub = AppState.addEventListener('change', s => { if (s !== 'active') flush(); });
    const hide = () => { if (typeof document !== 'undefined' && document.visibilityState === 'hidden') flush(); };
    if (Platform.OS === 'web' && typeof document !== 'undefined') document.addEventListener('visibilitychange', hide);
    return () => {
      clearInterval(t); sub.remove();
      if (Platform.OS === 'web' && typeof document !== 'undefined') document.removeEventListener('visibilitychange', hide);
    };
  }, [on]);
}
