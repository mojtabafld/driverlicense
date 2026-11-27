// The coach's button (Mojtaba 2026-10-24), in the head of «آموزش» and «آزمون» beside the calendar: opens the coach page
// (app/coach.tsx) for that tab; without premium it is there but faded and cannot be pressed; gone when «حالت مربی» is
// off in the settings (lib/coach-mode.ts).
import { router } from 'expo-router';

import { useCoachMode } from '@/lib/coach-mode';
import { RoundIcon } from './kit';

export function CoachButton({ from }: { from: 'learn' | 'exam' }) {
  const { allowed, button } = useCoachMode();
  if (!button) return null;
  return <RoundIcon icon="coach" label="مربی هوشمند" disabled={!allowed} onPress={() => router.push({ pathname: '/coach', params: { from } })} />;
}
