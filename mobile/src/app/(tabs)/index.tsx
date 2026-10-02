// Home: progress at a glance (chance of passing, counts, progress chart).
import { View } from 'react-native';

import type { Attempt } from '@/lib/bank';
import { faNum, isFull, isPass, mistakeIds, passEstimate, pctOf } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Ring, Screen, T } from '@/ui/kit';
import { ProgressChart } from '@/ui/progress-chart';
import { Pill, openAttempt, pctText } from '@/ui/activity';
import { useColors } from '@/ui/theme';

// A count card: the icon tile with the label beside it, then the number and one short line of detail.
function Stat({ icon, label, value, extra, sub, tone }: { icon: IconName; label: string; value: string; extra?: string; sub: string; tone?: 'bad' | 'ok' }) {
  const c = useColors();
  const fg = tone === 'bad' ? c.bad : tone === 'ok' ? c.ok : c.link, soft = tone === 'bad' ? c.badSoft : tone === 'ok' ? c.okSoft : c.accentSoft;
  return (
    <Card style={{ flex: 1, gap: 4, paddingVertical: 10, paddingHorizontal: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <View style={{ width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: soft }}>
          <Icon name={icon} size={16} color={fg} weight="semibold" />
        </View>
        <T style={{ flexShrink: 1, color: c.text, fontSize: 12.5, lineHeight: 20, fontWeight: '700' }} numberOfLines={1}>{label}</T>
      </View>
      <T style={{ fontSize: 22, lineHeight: 30, fontWeight: '800', color: tone === 'bad' ? c.bad : c.text }} numberOfLines={1}>
        {value}{extra ? <T style={{ color: c.muted, fontSize: 12, fontWeight: '600' }}>{extra}</T> : null}
      </T>
      <T style={{ color: c.muted, fontSize: 11, lineHeight: 16 }} numberOfLines={1}>{sub}</T>
    </Card>
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
    </Screen>
  );
}
