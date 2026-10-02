// Home: progress at a glance (chance of passing, counts, progress chart) and the next step.
import { router } from 'expo-router';
import { View } from 'react-native';

import { faNum, fmtDate, isFull, isPass, mistakeIds, passEstimate, pctOf, scoreOf } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Button, Card, Ring, Screen, T } from '@/ui/kit';
import { ProgressChart } from '@/ui/progress-chart';
import { Icon, type IconName } from '@/ui/icon';
import { useColors } from '@/ui/theme';

// A count card with an icon before its label (the icon sits on a soft tile, like the site's .opt-ico).
function Stat({ icon, label, value, extra, tone }: { icon: IconName; label: string; value: string; extra?: string; tone?: 'bad' }) {
  const c = useColors();
  const fg = tone === 'bad' ? c.bad : c.link;
  return (
    <Card style={{ flex: 1, gap: 6, paddingHorizontal: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <View style={{ width: 26, height: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: tone === 'bad' ? c.badSoft : c.accentSoft }}>
          <Icon name={icon} size={16} color={fg} weight="semibold" />
        </View>
        <T style={{ color: c.muted, fontSize: 13, flexShrink: 1 }} numberOfLines={1}>{label}</T>
      </View>
      <T style={{ fontSize: 26, fontWeight: '700', color: tone === 'bad' ? c.bad : c.text }}>{value}{extra ? <T style={{ color: c.muted, fontSize: 14 }}>{extra}</T> : null}</T>
    </Card>
  );
}

export default function Home() {
  const c = useColors();
  const { user, attempts, bank } = useApp();
  const est = passEstimate(attempts);
  const exams = attempts.filter(a => a.mode !== 'lesson');
  const lessonsDone = new Set(attempts.filter(a => a.mode === 'lesson').map(a => a.lesson)).size;
  const mistakes = mistakeIds(attempts).length;
  const recent = attempts.slice(-3).reverse();
  return (
    <Screen title={`سلام ${user?.name ?? ''}`} subtitle="آماده‌ی تمرین امروز هستید؟">
      <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <Ring value={est ? est.prob : 0} size={92} stroke={9} color={!est ? c.faint : est.prob >= 0.7 ? c.ok : est.prob >= 0.4 ? c.warn : c.bad} label={est ? `${faNum(Math.round(est.prob * 100))}٪` : '–'} />
        <View style={{ flex: 1, gap: 2 }}>
          <T style={{ fontWeight: '700', fontSize: 17 }}>احتمال قبولی</T>
          <T style={{ color: c.muted, fontSize: 13.5 }}>{est ? `بر اساس ${faNum(est.n)} پاسخ اخیر شما در آزمون‌های تصادفی` : 'بعد از اولین آزمون، تخمین زده می‌شود.'}</T>
        </View>
      </Card>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Stat icon="clipboard" label="آزمون‌ها" value={faNum(exams.length)} />
        <Stat icon="learn" label="درس‌ها" value={faNum(lessonsDone)} extra={` / ${faNum(bank?.tests.length ?? 44)}`} />
        <Stat icon="warning" label="اشتباهات" value={faNum(mistakes)} tone={mistakes ? 'bad' : undefined} />
      </View>
      <Card style={{ gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <T style={{ fontWeight: '700', fontSize: 16 }}>نمودار پیشرفت</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 14, height: 2, backgroundColor: c.accent }} /><T style={{ color: c.muted, fontSize: 12 }}>نمره هر آزمون</T>
            <View style={{ width: 14, borderTopWidth: 2, borderStyle: 'dashed', borderColor: c.ok, marginRight: 4 }} /><T style={{ color: c.muted, fontSize: 12 }}>حد قبولی</T>
          </View>
        </View>
        <ProgressChart attempts={attempts} onOpen={a => { session.result = a; session.fresh = false; router.push('/result'); }} />
      </Card>
      <Button label="شروع آزمون تصادفی" onPress={() => router.navigate('/exam')} />
      {recent.length ? <T style={{ fontWeight: '700', fontSize: 18, marginTop: 6 }}>آخرین فعالیت‌ها</T> : null}
      {recent.map(a => (
        <Card key={a.at} onPress={() => { session.result = a; session.fresh = false; router.push('/result'); }} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Ring value={pctOf(a)} size={48} stroke={5} color={isFull(a) ? (isPass(a) ? c.ok : c.bad) : c.accent} label={`${faNum(Math.round(pctOf(a) * 100))}`} />
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '700' }}>{a.mode === 'lesson' ? 'درس' : 'آزمون'} · {faNum(scoreOf(a))} از {faNum(a.items.length)} درست</T>
            <T style={{ color: c.muted, fontSize: 13 }}>{fmtDate(a.at)}{isFull(a) ? (isPass(a) ? ' · قبول' : ' · مردود') : ''}</T>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}><T style={{ color: c.link, fontWeight: '700' }}>مرور</T><Icon name="chevronLeft" size={15} color={c.link} weight="semibold" /></View>
        </Card>
      ))}
    </Screen>
  );
}
