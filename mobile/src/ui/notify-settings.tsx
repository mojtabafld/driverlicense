// Settings, «اعلان‌ها» (Mojtaba 2026-10-18): notifications on this device (lib/push.ts, the server's push.js). With
// them on: a reminder each day at the hour the user picks, to do an exam or the next lesson, and (on unless turned
// off) one message a day at a time of its own between 10:00 and 20:00 about the course and the exams. Where they cannot
// work, a line says why (an iPhone outside the Home Screen app, notifications blocked, a browser without them).
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { api } from '@/lib/api';
import { faNum } from '@/lib/logic';
import { disablePush, enablePush, pushState, type Notify, type PushState } from '@/lib/push';
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

const WHY: Partial<Record<PushState, string>> = {
  install: 'در آیفون اعلان‌ها فقط در اپی کار می‌کنند که به صفحه‌ی اصلی اضافه شده باشد: در Safari دکمه‌ی اشتراک‌گذاری و بعد «Add to Home Screen» را بزنید و اپ را از صفحه‌ی اصلی باز کنید.',
  denied: 'اجازه‌ی اعلان برای این سایت بسته است. آن را از تنظیمات مرورگر یا گوشی باز کنید.',
  unsupported: 'این مرورگر اعلان را پشتیبانی نمی‌کند.',
};

export function NotifySettings() {
  const c = useColors();
  const [state, setState] = useState<PushState | null>(null);
  const [n, setN] = useState<Notify | null>(null), [key, setKey] = useState('');
  const [busy, setBusy] = useState(false), [note, setNote] = useState<string | null>(null);
  useEffect(() => {
    pushState().then(setState).catch(() => setState('unsupported'));
    api<{ key: string; notify: Notify }>('GET', 'notify').then(d => { setKey(d.key); setN(d.notify); }).catch(() => {});
  }, []);
  // A change is shown at once and kept on the account.
  const change = (p: Partial<Notify>) => {
    if (!n) return;
    setN({ ...n, ...p });
    api<{ notify: Notify }>('POST', 'notify', p).then(d => setN(d.notify)).catch(() => {});
  };
  const turn = async (on: boolean) => {
    tap(); setNote(null); setBusy(true);
    try { setState(on ? await enablePush(key) : await disablePush()); }
    catch { setNote('روشن کردن اعلان‌ها ممکن نشد. دوباره امتحان کنید.'); }
    finally { setBusy(false); }
  };
  const test = () => {
    tap(); setNote(null);
    api<{ sent: number }>('POST', 'pushtest').then(d => setNote(d.sent ? 'یک اعلان آزمایشی فرستاده شد.' : 'اعلان فرستاده نشد. دوباره امتحان کنید.'))
      .catch(() => setNote('اعلان فرستاده نشد. دوباره امتحان کنید.'));
  };
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
      {why ? <T style={{ color: c.muted, fontSize: 13, lineHeight: 21 }}>{why}</T> : null}
      {on && n ? (
        <View style={{ marginTop: 4, borderTopWidth: 1, borderTopColor: c.line, paddingTop: 6, gap: 4 }}>
          <Line title="یادآوری روزانه" sub="هر روز در ساعتی که انتخاب می‌کنید." right={<Toggle label="یادآوری روزانه" value={n.remind} onChange={v => change({ remind: v })} />} />
          {n.remind ? (
            <View style={{ gap: 10, paddingBottom: 6 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
                <Step icon="minus" label="زودتر" onPress={() => change({ time: shift(n.time, -STEP) })} />
                <T style={{ fontSize: 26, lineHeight: 34, fontWeight: '800', minWidth: 96, textAlign: 'center', writingDirection: 'ltr' }}>{faNum(n.time)}</T>
                <Step icon="plus" label="دیرتر" onPress={() => change({ time: shift(n.time, STEP) })} />
              </View>
              <Segmented value={n.what} onChange={what => change({ what })} options={[{ value: 'lesson', label: 'درس بعدی' }, { value: 'exam', label: 'آزمون' }]} />
            </View>
          ) : null}
          <View style={{ borderTopWidth: 1, borderTopColor: c.line, paddingTop: 2 }}>
            <Line title="پیام‌های روزانه" sub="روزی یک بار، بین ۱۰ صبح تا ۸ شب، درباره‌ی آموزش و آزمون." right={<Toggle label="پیام‌های روزانه" value={n.daily} onChange={v => change({ daily: v })} />} />
          </View>
          <Pressable onPress={test} accessibilityRole="button" style={({ pressed }) => ({ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 8, opacity: pressed ? 0.6 : 1 })}>
            <Icon name="send" size={15} color={c.link} weight="semibold" />
            <T style={{ color: c.link, fontWeight: '700', fontSize: 14 }}>ارسال اعلان آزمایشی</T>
          </Pressable>
        </View>
      ) : null}
      {note ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{note}</T> : null}
    </Card>
  );
}
