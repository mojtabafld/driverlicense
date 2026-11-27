// The lessons of «آموزش گام‌به‌گام» the user has finished, kept with the account (/api/courseprogress), loaded once
// and shared by the course pages; `finish` marks one at once.
import { useEffect, useState } from 'react';

import { api } from './api';

let DONE: Record<string, number> | null = null;
const listeners = new Set<(d: Record<string, number>) => void>();
const publish = (d: Record<string, number>) => { DONE = d; listeners.forEach(f => f(d)); };

export function useCourseProgress() {
  const [done, setDone] = useState<Record<string, number>>(DONE ?? {});
  useEffect(() => {
    listeners.add(setDone);
    if (DONE === null) api<{ done: Record<string, number> }>('GET', 'courseprogress').then(d => publish(d.done || {})).catch(() => {});
    return () => { listeners.delete(setDone); };
  }, []);
  return {
    done,
    finish: (id: string) => {
      publish({ ...(DONE ?? {}), [id]: Date.now() });
      api('POST', 'courseprogress', { lesson: id }).catch(() => {});
    },
  };
}
