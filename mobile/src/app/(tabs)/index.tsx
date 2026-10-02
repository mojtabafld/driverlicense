// Home: progress at a glance (chance of passing, counts, progress chart) and the latest activity.
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import type { Attempt, Bank } from '@/lib/bank';
import { faNum, fmtDate, isFull, isPass, mistakeIds, passEstimate, pctOf, scoreOf } from '@/lib/logic';
import { modeName } from '@/lib/names';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Ring, Screen, T, tap } from '@/ui/kit';
import { ProgressChart } from '@/ui/progress-chart';
import { useColors, type Colors } from '@/ui/theme';

const openAttempt = (a: Attempt) => { session.result = a; session.fresh = false; router.push('/result'); };
const pctText = (p: number) => `${faNum(Math.round(p * 100))}٪`;
// A small coloured label, like the site's .pill.
function Pill({ text, fg, bg }: { text: string; fg: string; bg: string }) {
  return <View style={{ paddingHorizontal: 9, paddingVertical: 2, borderRadius: 99, backgroundColor: bg }}><T style={{ color: fg, fontSize: 12, lineHeight: 19, fontWeight: '700' }}>{text}</T></View>;
}

// A count card: the icon tile with the number beside it, then the label and one short line of detail.
function Stat({ icon, label, value, extra, sub, tone }: { icon: IconName; label: string; value: string; extra?: string; sub: string; tone?: 'bad' | 'ok' }) {
  const c = useColors();
  const fg = tone === 'bad' ? c.bad : tone === 'ok' ? c.ok : c.link, soft = tone === 'bad' ? c.badSoft : tone === 'ok' ? c.okSoft : c.accentSoft;
  return (
    <Card style={{ flex: 1, gap: 4, paddingVertical: 10, paddingHorizontal: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View style={{ width: 32, height: 32, borderRadius: 9, alignItems: 'center', justifyContent: 'center', backgroundColor: soft }}>
          <Icon name={icon} size={18} color={fg} weight="semibold" />
        </View>
        <T style={{ flexShrink: 1, fontSize: 22, lineHeight: 30, fontWeight: '800', color: tone === 'bad' ? c.bad : c.text }} numberOfLines={1}>
          {value}{extra ? <T style={{ color: c.muted, fontSize: 12, fontWeight: '600' }}>{extra}</T> : null}
        </T>
      </View>
      <T style={{ color: c.text, fontSize: 13, lineHeight: 20, fontWeight: '700' }} numberOfLines={1}>{label}</T>
      <T style={{ color: c.muted, fontSize: 11, lineHeight: 16 }} numberOfLines={1}>{sub}</T>
    </Card>
  );
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
        <View style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, backgroundColor: fg }} />
        <View style={{ width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: soft }}>
          <Icon name={ok ? 'checkCircle' : 'xCircle'} size={22} color={fg} contrast={soft} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <T style={{ fontWeight: '700' }}>{modeName(a, bank)}</T>
            <Pill text={isFull(a) ? (ok ? 'قبول' : 'مردود') : ok ? 'خوب' : 'نیاز به تمرین'} fg={fg} bg={soft} />
          </View>
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

export default function Home() {
  const c = useColors();
  const { user, attempts, bank } = useApp();
  const est = passEstimate(attempts);
  const exams = attempts.filter(a => a.mode !== 'lesson');
  const fullN = attempts.filter(isFull).length, passN = attempts.filter(isPass).length;
  const lessonsDone = new Set(attempts.filter(a => a.mode === 'lesson').map(a => a.lesson)).size, lessonsAll = bank?.tests.length ?? 44;
  const mistakes = mistakeIds(attempts).length;
  const recent = attempts.slice(-5).reverse();
  // Average of the last 5 attempts and its change against the 5 before.
  const avg = (xs: Attempt[]) => (xs.length ? xs.reduce((s, a) => s + pctOf(a), 0) / xs.length : null);
  const avg5 = avg(attempts.slice(-5)), prev5 = avg(attempts.slice(-10, -5));
  const trend = avg5 != null && prev5 != null ? avg5 - prev5 : null;
  const probColor = !est ? c.faint : est.prob >= 0.7 ? c.ok : est.prob >= 0.4 ? c.warn : c.bad;
  const probSoft = !est ? c.surface2 : est.prob >= 0.7 ? c.okSoft : est.prob >= 0.4 ? c.warnSoft : c.badSoft;
  const probWord = !est ? 'هنوز تخمینی نیست' : est.prob >= 0.7 ? 'آماده‌ی آزمون' : est.prob >= 0.4 ? 'نزدیک به قبولی' : 'نیاز به تمرین';
  return (
    <Screen title={`سلام ${user?.name ?? ''}`} subtitle="آماده‌ی تمرین امروز هستید؟">
      <Card style={{ gap: 14 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Ring value={est ? est.prob : 0} size={96} stroke={9} color={probColor} label={est ? pctText(est.prob) : '–'} />
          <View style={{ flex: 1, gap: 6, alignItems: 'flex-start' }}>
            <T style={{ fontWeight: '800', fontSize: 17 }}>احتمال قبولی</T>
            <Pill text={probWord} fg={probColor} bg={probSoft} />
            <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19 }}>{est ? `بر اساس ${faNum(est.n)} پاسخ اخیر شما در آزمون‌های تصادفی` : 'بعد از اولین آزمون، تخمین زده می‌شود.'}</T>
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: c.line, paddingTop: 12 }}>
          <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <T style={{ color: c.muted, fontSize: 12, textAlign: 'center' }}>میانگین ۵ آزمون اخیر</T>
            <T style={{ fontWeight: '800', fontSize: 17, textAlign: 'center' }}>{avg5 != null ? pctText(avg5) : '–'}</T>
            {trend != null ? <T style={{ fontSize: 12, fontWeight: '700', textAlign: 'center', color: trend >= 0 ? c.ok : c.bad }}>{trend >= 0 ? '▲' : '▼'} {pctText(Math.abs(trend))}</T> : null}
          </View>
          <View style={{ width: 1, backgroundColor: c.line }} />
          <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <T style={{ color: c.muted, fontSize: 12, textAlign: 'center' }}>قبولی در آزمون کامل</T>
            <T style={{ fontWeight: '800', fontSize: 17, textAlign: 'center' }}>{fullN ? `${faNum(passN)} از ${faNum(fullN)}` : '–'}</T>
            {fullN ? <T style={{ fontSize: 12, color: c.muted, textAlign: 'center' }}>{pctText(passN / fullN)}</T> : null}
          </View>
        </View>
      </Card>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Stat icon="clipboard" label="آزمون‌ها" value={faNum(exams.length)} sub={fullN ? `${faNum(passN)} قبولی` : 'هنوز آزمون کاملی نیست'} />
        <Stat icon="learn" label="درس‌ها" value={faNum(lessonsDone)} extra={` / ${faNum(lessonsAll)}`} sub={`${pctText(lessonsDone / lessonsAll)} انجام شده`} />
        <Stat icon="warning" label="اشتباهات" value={faNum(mistakes)} tone={mistakes ? 'bad' : 'ok'} sub={mistakes ? 'سؤال برای تمرین' : 'اشتباهی نمانده'} />
      </View>
      <Card style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <T style={{ fontWeight: '700', fontSize: 16 }}>نمودار پیشرفت</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 14, height: 2, backgroundColor: c.accent }} /><T style={{ color: c.muted, fontSize: 12 }}>نمره هر آزمون</T>
            <View style={{ width: 14, borderTopWidth: 2, borderStyle: 'dashed', borderColor: c.ok, marginRight: 4 }} /><T style={{ color: c.muted, fontSize: 12 }}>حد قبولی</T>
          </View>
        </View>
        <ProgressChart attempts={attempts} onOpen={openAttempt} />
      </Card>
      {recent.length ? (
        <Card style={{ paddingVertical: 6 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 8, paddingBottom: 4 }}>
            <T style={{ fontWeight: '700', fontSize: 16 }}>آخرین فعالیت‌ها</T>
            <Pressable onPress={() => { tap(); router.navigate('/exam'); }} hitSlop={8} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <T style={{ color: c.link, fontWeight: '700', fontSize: 13 }}>همه‌ی آزمون‌ها</T><Icon name="chevronLeft" size={14} color={c.link} weight="semibold" />
            </Pressable>
          </View>
          {recent.map((a, i) => <ActivityRow key={a.at} a={a} bank={bank} c={c} last={i === recent.length - 1} />)}
        </Card>
      ) : null}
    </Screen>
  );
}
