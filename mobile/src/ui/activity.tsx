// «آخرین فعالیت‌ها»: the latest exams and lessons, each row marked green (passed / 80% or more) or red, with its name,
// date and time, duration, mistakes, score and percent. Tapping a row opens its review.
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import type { Attempt, Bank } from '@/lib/bank';
import { DATE_LOCALE, RTL, tr } from '@/lib/i18n';
import { faNum, fmtDate, isFull, isPass, pctOf, scoreOf } from '@/lib/logic';
import { modeName } from '@/lib/names';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Confirm } from './confirm';
import { DatePick, dayLabel, dayOf } from './date-pick';
import { Icon } from './icon';
import { MoreButton } from './more-button';
import { Card, Enter, T, tap } from './kit';
import { useColors, type Colors } from './theme';

export const openAttempt = (a: Attempt) => { session.result = a; session.fresh = false; router.push('/result'); };
export const pctText = (p: number) => `${faNum(Math.round(p * 100))}${RTL ? '٪' : '%'}`;
// A small coloured label, like the site's .pill.
export function Pill({ text, fg, bg }: { text: string; fg: string; bg: string }) {
  return <View style={{ paddingHorizontal: 9, paddingVertical: 2, borderRadius: 99, backgroundColor: bg }}><T style={{ color: fg, fontSize: 12, lineHeight: 19, fontWeight: '700' }}>{text}</T></View>;
}

// Green or red for an attempt: a full 25-question one by the real pass rule, a shorter one by the same 80%.
const passed = (a: Attempt) => (isFull(a) ? isPass(a) : pctOf(a) >= 0.8);
const fmtSecs = (s: number) => `${faNum(Math.floor(s / 60))}:${faNum(String(Math.round(s % 60)).padStart(2, '0'))}`;
const fmtClock = (t: number) => new Date(t).toLocaleTimeString(DATE_LOCALE, { timeZone: 'Europe/Copenhagen', hour: '2-digit', minute: '2-digit' });

function ActivityRow({ a, bank, c, last }: { a: Attempt; bank: Bank | null; c: Colors; last: boolean }) {
  const ok = passed(a), fg = ok ? c.ok : c.bad, soft = ok ? c.okSoft : c.badSoft;
  const wrong = a.items.length - scoreOf(a);
  return (
    <Pressable onPress={() => { tap(); openAttempt(a); }} style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderBottomWidth: last ? 0 : 1, borderBottomColor: c.line }}>
        <View style={{ width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: soft }}>
          <Icon name={ok ? 'checkCircle' : 'xCircle'} size={22} color={fg} contrast={soft} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <T style={{ fontWeight: '700' }}>{modeName(a, bank)}</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{fmtDate(a.at)}، ساعت {fmtClock(a.at)}</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>
            {a.secs ? `زمان ${fmtSecs(a.secs)}، ` : ''}{wrong ? `${faNum(wrong)} اشتباه از ${faNum(a.items.length)}` : 'بدون اشتباه'}
          </T>
        </View>
        <View style={{ alignItems: 'center', minWidth: 58 }}>
          <T style={{ fontSize: 18, lineHeight: 26, fontWeight: '800', color: fg, textAlign: 'center' }}>{faNum(scoreOf(a))}/{faNum(a.items.length)}</T>
          <T style={{ fontSize: 12, color: c.muted, textAlign: 'center' }}>{pctText(pctOf(a))}</T>
        </View>
        <Icon name="chevronLeft" size={15} color={c.faint} weight="semibold" />
      </View>
    </Pressable>
  );
}

// The card with the latest `limit` attempts, newest first, and «نمایش همه» when there are more.
// The card's title with its icon, in a tile like the exam tab's other cards.
function Head({ title, c }: { title: string; c: Colors }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
        <Icon name="clock" size={19} color={c.text} weight="semibold" />
      </View>
      <T style={{ flex: 1, fontWeight: '700', fontSize: 17 }}>{title}</T>
    </View>
  );
}

// `allHref`: the arrow button in the card's head (ui/more-button.tsx) opens this page of all of them (as the mistakes card's «همه» does), in place of
// «نمایش همه» under the list; `hint`: a new value plays its «نمایش همه» hint. `clearable`: the bin that deletes the whole history (only on that page, /history).
export function ActivityList({ attempts, limit = 10, title = 'آخرین فعالیت‌ها', allHref, clearable, hint }: { attempts: Attempt[]; limit?: number; title?: string; allHref?: string; clearable?: boolean; hint?: number }) {
  const c = useColors();
  const { bank, clearAttempts } = useApp();
  const [all, setAll] = useState(false), [ask, setAsk] = useState(false), [busy, setBusy] = useState(false);
  // A day picked with the calendar button (ui/date-pick.tsx; Mojtaba 2026-10-24): only that day's tests, all of them.
  const [day, setDay] = useState<string | null>(null), [pick, setPick] = useState(false);
  const days = useMemo(() => new Set(attempts.map(a => dayOf(a.at))), [attempts]);
  const rows = attempts.slice().reverse(), picked = day ? rows.filter(a => dayOf(a.at) === day) : rows;
  const shown = day || all ? picked : picked.slice(0, limit);
  // Nothing done yet: the card stays, with a short line under its title on what will show here, so on every screen it
  // shows above the tab bar (Mojtaba 2026-10-21).
  if (!rows.length) {
    return (
      <Card style={{ gap: 8 }}>
        <Head title={title} c={c} />
        <T style={{ color: c.muted, fontSize: 13, lineHeight: 20 }}>نتیجه‌ی آزمون‌های شما اینجا نمایش داده می‌شود.</T>
      </Card>
    );
  }
  return (
    <Card style={{ paddingVertical: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 10, paddingBottom: 6 }}>
        <Head title={title} c={c} />
        {/* The calendar: pick a day to show its tests only; filled while a day is picked. */}
        <Pressable onPress={() => { tap(); setPick(true); }} hitSlop={8} accessibilityRole="button" accessibilityLabel={tr('انتخاب روز')}
          style={({ pressed }) => ({ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: day ? c.accent : c.surface2, opacity: pressed ? 0.7 : 1 })}>
          <Icon name="calendar" size={18} color={day ? c.accentText : c.text} />
        </Pressable>
        {allHref ? (
          <MoreButton onPress={() => router.push(allHref as any)} label={`همه‌ی ${faNum(rows.length)} آزمون`} hint={hint} />
        ) : null}
        {/* Delete the whole history, after a question answered by sliding (the history page only). */}
        {clearable ? <Pressable onPress={() => { tap(); setAsk(true); }} hitSlop={8} accessibilityRole="button" accessibilityLabel="حذف تاریخچه‌ی آزمون‌ها"
          style={({ pressed }) => ({ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.badSoft : c.surface2 })}>
          <Icon name="trash" size={18} color={c.bad} />
        </Pressable> : null}
      </View>
      <Confirm open={ask} icon="trash" title="حذف تاریخچه؟" text={`همه‌ی ${faNum(rows.length)} آزمون و درس انجام‌شده و نتیجه‌هایشان پاک می‌شوند. این کار برگشت‌پذیر نیست.`}
        cancel="انصراف" ok="حذف همه" okIcon="trash" danger slide={{ label: 'برای حذف همه، بکشید', doneLabel: busy ? 'در حال حذف…' : 'حذف شد' }} onCancel={() => setAsk(false)}
        onOk={() => { if (busy) return; setBusy(true); clearAttempts().then(() => setAsk(false)).catch(() => {}).finally(() => setBusy(false)); }} />
      <DatePick open={pick} onClose={() => setPick(false)} value={day} busy={days} onPick={setDay} />
      {day ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingBottom: 8 }}>
          <Pressable onPress={() => { tap(); setDay(null); }} accessibilityRole="button" accessibilityLabel={tr('نمایش همه‌ی روزها')}
            style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, height: 32, borderRadius: 16, backgroundColor: c.accentSoft, opacity: pressed ? 0.7 : 1 })}>
            <T raw style={{ fontSize: 13, fontWeight: '700', color: c.link }}>{dayLabel(day, { weekday: 'long', day: 'numeric', month: 'long' })}</T>
            <Icon name="xmark" size={14} color={c.link} weight="bold" />
          </Pressable>
          <T style={{ color: c.muted, fontSize: 12.5 }}>{`${faNum(picked.length)} آزمون`}</T>
        </View>
      ) : null}
      {shown.map((a, i) => <Enter key={a.at}><ActivityRow a={a} bank={bank} c={c} last={i === shown.length - 1} /></Enter>)}
      {!day && !allHref && rows.length > limit ? (
        <Pressable onPress={() => { tap(); setAll(!all); }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 12, borderTopWidth: 1, borderTopColor: c.line }}>
          <T style={{ color: c.text, fontWeight: '700', fontSize: 13.5 }}>{all ? 'نمایش کمتر' : `نمایش همه (${faNum(rows.length)})`}</T>
          <View style={{ transform: [{ rotate: all ? '180deg' : '0deg' }] }}><Icon name="chevronDown" size={16} color={c.text} weight="semibold" /></View>
        </Pressable>
      ) : null}
    </Card>
  );
}
