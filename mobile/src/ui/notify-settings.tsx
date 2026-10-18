// Settings, «اعلان‌ها» (Mojtaba 2026-10-18): notifications on this device (lib/push.ts, the server's push.js). With
// them on: a reminder each day at the hour the user picks, to do an exam or the next lesson, and (on unless turned
// off) one message a day at a time of its own between 10:00 and 20:00 about the course and the exams. Where they cannot
// work, a line says why (an iPhone outside the Home Screen app, notifications blocked, a browser without them).
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';

import { api } from '@/lib/api';
import { t as fmt } from '@/lib/i18n';
import { faNum } from '@/lib/logic';
import { applyNotify, disablePush, enablePush, openSystemSettings, pushState, type Notify, type PushState } from '@/lib/push';
import { Icon, type IconName } from './icon';
import { Card, Segmented, T, tap } from './kit';
import { useColors } from './theme';
import { Toggle } from './toggle';

const STEP = 15; // minutes, for the reminder's time
const shift = (hhmm: string, by: number) => {
  const m = (((+hhmm.slice(0, 2) * 60 + +hhmm.slice(3, 5) + by) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
};

function Line({ title, sub, right }: { title: string; sub?: string; right: React.ReactNode }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 }}>
      <View style={{ flex: 1 }}>
        <T style={{ fontWeight: '700' }}>{title}</T>
        {sub ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{sub}</T> : null}
      </View>
      {right}
    </View>
  );
}

function Step({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} hitSlop={6} accessibilityRole="button" accessibilityLabel={label}
      style={({ pressed }) => ({ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft, opacity: pressed ? 0.7 : 1 })}>
      <Icon name={icon} size={16} color={c.link} weight="semibold" />
    </Pressable>
  );
}

// (In the phone apps, notifications turned off in the phone's settings: a tap opens them.)
const native = Platform.OS !== 'web';
const WHY: Partial<Record<PushState, string>> = native ? { denied: 'اجازه‌ی اعلان برای این اپ بسته است. برای باز کردن آن در تنظیمات گوشی اینجا بزنید.' } : {
  install: 'در آیفون اعلان‌ها فقط در اپی کار می‌کنند که به صفحه‌ی اصلی اضافه شده باشد: در Safari دکمه‌ی اشتراک‌گذاری و بعد «Add to Home Screen» را بزنید و اپ را از صفحه‌ی اصلی باز کنید.',
  denied: 'اجازه‌ی اعلان برای این سایت بسته است. آن را از تنظیمات مرورگر یا گوشی باز کنید.',
  unsupported: 'این مرورگر اعلان را پشتیبانی نمی‌کند.',
};

// This device's notifications and the account's choices, read again whenever the page comes into view (a change on
// the other page then shows): `change` keeps a choice, `turn` turns this device on or off (resolves to its state).
function useNotify() {
  const [state, setState] = useState<PushState | null>(null);
  const [n, setN] = useState<Notify | null>(null), [key, setKey] = useState('');
  const [busy, setBusy] = useState(false), [note, setNote] = useState<string | null>(null);
  useFocusEffect(useCallback(() => {
    pushState().then(setState).catch(() => setState('unsupported'));
    api<{ key: string; notify: Notify }>('GET', 'notify').then(d => { setKey(d.key); setN(d.notify); }).catch(() => {});
  }, []));
  // A change is shown at once and kept on the account.
  const change = (p: Partial<Notify>) => {
    setN(cur => (cur ? { ...cur, ...p } : cur));
    api<{ notify: Notify }>('POST', 'notify', p).then(d => { setN(d.notify); return applyNotify(d.notify); }).catch(() => {});
  };
  const turn = async (on: boolean): Promise<PushState | null> => {
    tap(); setNote(null); setBusy(true);
    try { const st = on ? await enablePush(key) : await disablePush(); setState(st); return st; }
    catch { setNote('روشن کردن اعلان‌ها ممکن نشد. دوباره امتحان کنید.'); return null; }
    finally { setBusy(false); }
  };
  return { state, n, busy, note, setNote, change, turn };
}

// The reminder's time: earlier and later by a quarter of an hour.
function TimeStepper({ time, onChange, size = 26 }: { time: string; onChange: (t: string) => void; size?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
      <Step icon="minus" label="زودتر" onPress={() => onChange(shift(time, -STEP))} />
      <T style={{ fontSize: size, lineHeight: Math.round(size * 1.3), fontWeight: '800', minWidth: 96, textAlign: 'center', writingDirection: 'ltr' }}>{faNum(time)}</T>
      <Step icon="plus" label="دیرتر" onPress={() => onChange(shift(time, STEP))} />
    </View>
  );
}

export function NotifySettings() {
  const c = useColors();
  const { state, n, busy, note, change, turn } = useNotify();
  if (!state) return null;
  const on = state === 'on', why = WHY[state];
  return (
    <Card style={{ gap: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft }}>
          <Icon name="bell" size={18} color={c.link} weight="semibold" />
        </View>
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '700', fontSize: 16 }}>اعلان‌ها</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>یادآوری آزمون و آموزش روی همین دستگاه</T>
        </View>
        {why ? null : <Toggle label="اعلان‌ها" value={on} onChange={v => { if (!busy) turn(v); }} />}
      </View>
      {why ? (
        <Pressable disabled={!native} onPress={() => { tap(); openSystemSettings(); }}>
          <T style={{ color: native ? c.link : c.muted, fontSize: 13, lineHeight: 21 }}>{why}</T>
        </Pressable>
      ) : null}
      {on && n ? (
        <View style={{ marginTop: 4, borderTopWidth: 1, borderTopColor: c.line, paddingTop: 6, gap: 4 }}>
          <Line title="یادآوری روزانه" sub="هر روز در ساعتی که انتخاب می‌کنید." right={<Toggle label="یادآوری روزانه" value={n.remind} onChange={v => change({ remind: v })} />} />
          {n.remind ? (
            <View style={{ gap: 10, paddingBottom: 6 }}>
              <TimeStepper time={n.time} onChange={time => change({ time })} />
              <Segmented value={n.what} onChange={what => change({ what })} options={[{ value: 'lesson', label: 'درس بعدی' }, { value: 'exam', label: 'آزمون' }]} />
            </View>
          ) : null}
          <View style={{ borderTopWidth: 1, borderTopColor: c.line, paddingTop: 2 }}>
            <Line title="پیام‌های روزانه" sub="روزی یک بار، بین ۱۰ صبح تا ۸ شب، درباره‌ی آموزش و آزمون." right={<Toggle label="پیام‌های روزانه" value={n.daily} onChange={v => change({ daily: v })} />} />
          </View>
        </View>
      ) : null}
      {note ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{note}</T> : null}
    </Card>
  );
}

// «آموزش گام‌به‌گام» (app/course.tsx, under the streak): the daily reminder by notification, in place of the email one
// (Mojtaba 2026-10-18). Turning it on here also turns this device's notifications on; where they cannot work, the
// reason, and a tap opens the settings.
export function CourseReminder() {
  const c = useColors();
  const { state, n, busy, note, change, turn } = useNotify();
  if (!state || !n) return null;
  const why = WHY[state], on = state === 'on' && n.remind;
  const flip = async (v: boolean) => {
    if (busy) return;
    if (!v) { tap(); change({ remind: false }); return; }
    if (state !== 'on' && (await turn(true)) !== 'on') return;
    change({ remind: true });
  };
  return (
    <View style={{ gap: 10 }}>
      <View style={{ height: 1, backgroundColor: c.line, opacity: 0.6 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft }}>
          <Icon name="bell" size={16} color={c.link} weight="semibold" />
        </View>
        <View style={{ flex: 1, gap: 1 }}>
          <T style={{ fontWeight: '700', fontSize: 14 }}>یادآوری روزانه با اعلان</T>
          <T style={{ color: c.muted, fontSize: 12, lineHeight: 18 }}>{on ? fmt('هر روز ساعت {0}', faNum(n.time)) : 'هر روز در ساعتی که انتخاب می‌کنید.'}</T>
        </View>
        {why ? null : <Toggle value={on} onChange={flip} label="یادآوری روزانه با اعلان" />}
      </View>
      {why ? (
        <Pressable onPress={() => { tap(); if (native) openSystemSettings(); else router.push('/settings'); }} style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8 }}>
          <Icon name="info" size={16} color={c.muted} />
          <T style={{ flex: 1, color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{why}</T>
        </Pressable>
      ) : null}
      {on ? <TimeStepper time={n.time} size={20} onChange={time => change({ time })} /> : null}
      {note ? <T style={{ color: c.bad, fontSize: 12.5 }}>{note}</T> : null}
    </View>
  );
}
