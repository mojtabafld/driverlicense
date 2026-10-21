// The calendar's notes (app/calendar.tsx), kept with the account (/api/notes), loaded once and shared by the pages:
// the user's own lines on a day (d:YYYY-MM-DD), a course lesson (c:<lesson id>) or an exam (a:<its time>). `save`
// keeps one at once (an empty text removes it) and on the server.
import { useEffect, useState } from 'react';

import { api } from './api';

export type Note = { text: string; at: number };
type Notes = Record<string, Note>;
let NOTES: Notes | null = null;
const listeners = new Set<(n: Notes) => void>();
const publish = (n: Notes) => { NOTES = n; listeners.forEach(f => f(n)); };

export function useNotes() {
  const [notes, setNotes] = useState<Notes>(NOTES ?? {});
  useEffect(() => {
    listeners.add(setNotes);
    if (NOTES === null) api<{ notes: Notes }>('GET', 'notes').then(d => publish({ ...(d.notes || {}), ...(NOTES ?? {}) })).catch(() => {});
    return () => { listeners.delete(setNotes); };
  }, []);
  return {
    notes,
    save: async (key: string, text: string) => {
      const t = text.trim(), next = { ...(NOTES ?? {}) };
      if (t) next[key] = { text: t, at: Date.now() }; else delete next[key];
      const d = await api<{ notes: Notes }>('POST', 'notes', { key, text: t });
      publish(d.notes || next);
    },
  };
}
