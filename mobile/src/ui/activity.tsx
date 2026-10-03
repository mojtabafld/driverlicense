// «آخرین فعالیت‌ها»: the latest exams and lessons, each row marked green (passed / 80% or more) or red, with its name,
// date and time, duration, mistakes, score and percent. Tapping a row opens its review.
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import type { Attempt, Bank } from '@/lib/bank';
import { faNum, fmtDate, isFull, isPass, pctOf, scoreOf } from '@/lib/logic';
import { modeName } from '@/lib/names';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Confirm } from './confirm';
import { Icon } from './icon';
import { Card, T, tap } from './kit';
import { useColors, type Colors } from './theme';

export const openAttempt = (a: Attempt) => { session.result = a; session.fresh = false; router.push('/result'); };
export const pctText = (p: number) => `${faNum(Math.round(p * 100))}٪`;
// A small coloured label, like the site's .pill.
export function Pill({ text, fg, bg }: { text: string; fg: string; bg: string }) {
  return <View style={{ paddingHorizontal: 9, paddingVertical: 2, borderRadius: 99, backgroundColor: bg }}><T style={{ color: fg, fontSize: 12, lineHeight: 19, fontWeight: '700' }}>{text}</T></View>;
}

// Green or red for an attempt: a full 25-question one by the real pass rule, a shorter one by the same 80%.
const passed = (a: Attempt) => (isFull(a) ? isPass(a) : pctOf(a) >= 0.8);
const fmtSecs = (s: number) => `${faNum(Math.floor(s / 60))}:${faNum(String(Math.round(s % 60)).padStart(2, '0'))}`;
const fmtClock = (t: number) => new Date(t).toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });

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
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{fmtDate(a.at)} · ساعت {fmtClock(a.at)}</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>
            {a.secs ? `زمان ${fmtSecs(a.secs)} · ` : ''}{wrong ? `${faNum(wrong)} اشتباه از ${faNum(a.items.length)}` : 'بدون اشتباه'}
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
export function ActivityList({ attempts, limit = 10 }: { attempts: Attempt[]; limit?: number }) {
  const c = useColors();
  const { bank, clearAttempts } = useApp();
  const [all, setAll] = useState(false), [ask, setAsk] = useState(false), [busy, setBusy] = useState(false);
  const rows = attempts.slice().reverse(), shown = all ? rows : rows.slice(0, limit);
  if (!rows.length) return null;
  return (
    <Card style={{ paddingVertical: 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 4 }}>
        <T style={{ fontWeight: '700', fontSize: 16 }}>آخرین فعالیت‌ها</T>
        {/* Delete the whole history, after a question. */}
        <Pressable onPress={() => { tap(); setAsk(true); }} hitSlop={8} accessibilityRole="button" accessibilityLabel="حذف تاریخچه‌ی آزمون‌ها"
          style={({ pressed }) => ({ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.badSoft : c.surface2 })}>
          <Icon name="trash" size={18} color={c.bad} />
        </Pressable>
      </View>
      <Confirm open={ask} title="حذف تاریخچه؟" text={`همه‌ی ${faNum(rows.length)} آزمون و درس انجام‌شده و نتیجه‌هایشان پاک می‌شوند. این کار برگشت‌پذیر نیست.`}
        cancel="انصراف" ok={busy ? 'در حال حذف…' : 'حذف همه'} danger onCancel={() => setAsk(false)}
        onOk={() => { if (busy) return; setBusy(true); clearAttempts().then(() => setAsk(false)).catch(() => {}).finally(() => setBusy(false)); }} />
      {shown.map((a, i) => <ActivityRow key={a.at} a={a} bank={bank} c={c} last={i === shown.length - 1} />)}
      {rows.length > limit ? (
        <Pressable onPress={() => { tap(); setAll(!all); }} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 12, borderTopWidth: 1, borderTopColor: c.line }}>
          <T style={{ color: c.link, fontWeight: '700', fontSize: 13.5 }}>{all ? 'نمایش کمتر' : `نمایش همه (${faNum(rows.length)})`}</T>
          <View style={{ transform: [{ rotate: all ? '180deg' : '0deg' }] }}><Icon name="chevronDown" size={16} color={c.link} weight="semibold" /></View>
        </Pressable>
      ) : null}
    </Card>
  );
}
