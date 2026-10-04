// Home: progress at a glance (chance of passing, counts, progress chart), fitted to the screen without scrolling:
// the chart takes the height left, and on shorter screens the cards get more compact.
import { router } from 'expo-router';
import { View, useWindowDimensions } from 'react-native';

import type { Attempt } from '@/lib/bank';
import { faNum, isFull, isPass, mistakeIds, passEstimate, pctOf } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Ring, Screen, T, useCountUp } from '@/ui/kit';
import { ProgressChart } from '@/ui/progress-chart';
import { Pill, openAttempt, pctText } from '@/ui/activity';
import { useColors } from '@/ui/theme';

// A count card: a bare icon with the label beside it, then the number and one short line of detail (or, with
// `progress`, a slim progress bar with its percent); it opens its own page (exams, lessons, mistakes). A full
// `progress` (every lesson done) turns the icon, the number and the bar green.
function Stat({ icon, label, value, extra, sub, tone, onPress, short, progress }: { icon: IconName; label: string; value: string; extra?: string; sub?: string; tone?: 'bad' | 'ok'; onPress: () => void; short?: boolean; progress?: number }) {
  const c = useColors();
  const narrow = useWindowDimensions().width < 380; // three cards in a row: smaller icon and label on narrow phones
  if (progress != null && progress >= 1) tone = 'ok';
  const bar = useCountUp(progress != null ? Math.min(1, Math.max(0, progress)) : 0); // the bar fills when the app opens
  const fg = tone === 'bad' ? c.bad : tone === 'ok' ? c.ok : c.link;
  return (
    <Card onPress={onPress} style={{ flex: 1, gap: 4, paddingVertical: 10, paddingHorizontal: narrow ? 8 : 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: narrow ? 5 : 6 }}>
        {/* A bare line icon in the card's colour, no tile behind it. */}
        <Icon name={icon} size={narrow ? 18 : 20} color={fg} weight="semibold" />
        <T style={{ flexShrink: 1, color: c.text, fontSize: narrow ? 12 : 12.5, lineHeight: 20, fontWeight: '700' }} numberOfLines={1}>{label}</T>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <T style={{ flex: 1, fontSize: 22, lineHeight: 30, fontWeight: '800', color: tone === 'bad' ? c.bad : progress != null && tone === 'ok' ? c.ok : c.text }} numberOfLines={1}>
          {value}{extra ? <T style={{ color: progress != null && tone === 'ok' ? c.ok : c.muted, fontSize: 12, fontWeight: '600' }}>{extra}</T> : null}
        </T>
        <Icon name="chevronLeft" size={14} color={c.faint} weight="semibold" />
      </View>
      {progress != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, height: 16 }}>
          <View style={{ flex: 1, height: 5, borderRadius: 3, backgroundColor: c.surface2, overflow: 'hidden', flexDirection: 'row' }}>
            <View style={{ width: `${bar * 100}%`, borderRadius: 3, backgroundColor: fg }} />
          </View>
          <T style={{ color: tone === 'ok' ? c.ok : c.muted, fontSize: 10.5, lineHeight: 16, fontWeight: '600' }}>{pctText(bar)}</T>
        </View>
      ) : short ? null : <T style={{ color: c.muted, fontSize: 11, lineHeight: 16 }} numberOfLines={1}>{sub}</T>}
    </Card>
  );
}

export default function Home() {
  const c = useColors();
  // Screen height decides how compact the page is: below 800 points less padding and a smaller ring, below 680 the
  // secondary lines go too, so everything stays on one screen.
  const { height } = useWindowDimensions();
  const compact = height < 800, tight = height < 680;
  const { user, attempts, bank } = useApp();
  const est = passEstimate(attempts);
  const exams = attempts.filter(a => a.mode !== 'lesson');
  const fullN = attempts.filter(isFull).length, passN = attempts.filter(isPass).length;
  const lessonsDone = new Set(attempts.filter(a => a.mode === 'lesson').map(a => a.lesson)).size, lessonsAll = bank?.tests.length ?? 44;
  const mistakes = mistakeIds(attempts).length;
  // Average of the last 5 attempts and its change against the 5 before.
  const avg = (xs: Attempt[]) => (xs.length ? xs.reduce((s, a) => s + pctOf(a), 0) / xs.length : null);
  const avg5 = avg(attempts.slice(-5)), prev5 = avg(attempts.slice(-10, -5));
  const trend = avg5 != null && prev5 != null ? avg5 - prev5 : null;
  const probColor = !est ? c.faint : est.prob >= 0.7 ? c.ok : est.prob >= 0.4 ? c.warn : c.bad;
  const probSoft = !est ? c.surface2 : est.prob >= 0.7 ? c.okSoft : est.prob >= 0.4 ? c.warnSoft : c.badSoft;
  const probWord = !est ? 'هنوز تخمینی نیست' : est.prob >= 0.7 ? 'آماده‌ی آزمون' : est.prob >= 0.4 ? 'نزدیک به قبولی' : 'نیاز به تمرین';
  return (
    <Screen fill gap={compact ? 10 : 14} title={`سلام ${user?.name ?? ''}`} subtitle={tight ? undefined : 'آماده‌ی تمرین امروز هستید؟'}>
      <Card style={{ gap: compact ? 10 : 14, padding: compact ? 12 : 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <Ring value={est ? est.prob : 0} size={compact ? 74 : 96} stroke={compact ? 8 : 9} color={probColor} label={est ? pctText(est.prob) : '–'} format={est ? pctText : undefined} />
          <View style={{ flex: 1, gap: compact ? 4 : 6, alignItems: 'flex-start' }}>
            <T style={{ fontWeight: '800', fontSize: 17 }}>احتمال قبولی</T>
            <Pill text={probWord} fg={probColor} bg={probSoft} />
            <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 19, display: tight ? 'none' : 'flex' }}>{est ? `بر اساس ${faNum(est.n)} پاسخ اخیر شما در آزمون‌های تصادفی` : 'بعد از اولین آزمون، تخمین زده می‌شود.'}</T>
          </View>
        </View>
        <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: c.line, paddingTop: compact ? 8 : 12 }}>
          <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <T style={{ color: c.muted, fontSize: 12, textAlign: 'center' }}>میانگین ۵ آزمون اخیر</T>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
              <T style={{ fontWeight: '800', fontSize: 17, textAlign: 'center' }}>{avg5 != null ? pctText(avg5) : '–'}</T>
              {trend != null ? <T style={{ fontSize: 11, fontWeight: '700', color: trend >= 0 ? c.ok : c.bad }}>{trend >= 0 ? '▲' : '▼'} {pctText(Math.abs(trend))}</T> : null}
            </View>
          </View>
          <View style={{ width: 1, backgroundColor: c.line }} />
          <View style={{ flex: 1, alignItems: 'center', gap: 2 }}>
            <T style={{ color: c.muted, fontSize: 12, textAlign: 'center' }}>قبولی در آزمون کامل</T>
            <T style={{ fontWeight: '800', fontSize: 17, textAlign: 'center' }}>{fullN ? `${faNum(passN)} از ${faNum(fullN)}` : '–'}</T>
          </View>
        </View>
      </Card>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Stat onPress={() => router.navigate('/exam')} short={tight} icon="clipboard" label="آزمون‌ها" value={faNum(exams.length)} sub={fullN ? `${faNum(passN)} قبولی` : 'آزمون نداده‌اید'} />
        <Stat onPress={() => router.navigate('/learn')} short={tight} icon="learn" label="درس‌ها" value={faNum(lessonsDone)} extra={` / ${faNum(lessonsAll)}`} progress={lessonsDone / lessonsAll} />
        <Stat onPress={() => router.push('/mistakes')} short={tight} icon="warning" label="اشتباهات" value={faNum(mistakes)} tone={mistakes ? 'bad' : 'ok'} sub={mistakes ? 'سؤال برای تمرین' : 'بدون اشتباه'} />
      </View>
      <Card style={{ flex: 1, gap: compact ? 8 : 12, padding: compact ? 12 : 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <T style={{ fontWeight: '700', fontSize: 16 }}>نمودار پیشرفت</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 14, height: 2, backgroundColor: c.accent }} /><T style={{ color: c.muted, fontSize: 12 }}>نمره هر آزمون</T>
            <View style={{ width: 14, borderTopWidth: 2, borderStyle: 'dashed', borderColor: c.ok, marginRight: 4 }} /><T style={{ color: c.muted, fontSize: 12 }}>حد قبولی</T>
          </View>
        </View>
        <ProgressChart fill attempts={attempts} onOpen={openAttempt} />
      </Card>
    </Screen>
  );
}
