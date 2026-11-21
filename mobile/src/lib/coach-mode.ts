// «حالت مربی» (coach mode; Mojtaba 2026-10-24): the AI coach, a premium setting that is on unless turned off in the
// settings (settings.coach false). `allowed`: the account may have it (premium, not a guest; the main site only);
// `on`: allowed and not turned off; `button`: the coach button in the head of «آموزش» and «آزمون» shows (faded and
// not to be pressed without premium, gone when turned off).
import { PROVE_PICS } from './config';
import { useApp } from './store';

export function useCoachMode() {
  const { user, settings, locked } = useApp();
  const allowed = !PROVE_PICS && !!user && !user.guest && !locked;
  const off = settings.coach === false;
  return { allowed, on: allowed && !off, button: !PROVE_PICS && !!user && !(allowed && off) };
}
