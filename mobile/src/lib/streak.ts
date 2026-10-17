// The streak of study days and the daily email reminder (/api/streak, server.js studied / streakOf / sendReminders):
// loaded when a page using it opens (so a lesson just finished counts), `setReminder` changes the reminder.
import { useCallback, useEffect, useState } from 'react';

import { api } from './api';

export type Streak = { streak: number; today: boolean; week: boolean[]; reminder: { on: boolean; hour: number }; mail?: boolean; email?: string };

export function useStreak() {
  const [data, setData] = useState<Streak | null>(null);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(() => { api<Streak>('GET', 'streak').then(setData).catch(() => {}); }, []);
  useEffect(load, [load]);
  return {
    data, error, load,
    setReminder: (on: boolean, hour: number) => {
      setError(null);
      if (data) setData({ ...data, reminder: { on, hour } });
      api<Streak>('POST', 'streak', { on, hour }).then(setData).catch(e => { setError(e instanceof Error ? e.message : null); load(); });
    },
  };
}
