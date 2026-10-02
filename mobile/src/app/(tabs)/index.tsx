// Home: progress at a glance and the next step.
import { router } from 'expo-router';
import { View } from 'react-native';

import { faNum, fmtDate, isFull, isPass, mistakeIds, passEstimate, pctOf, scoreOf } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Button, Card, Ring, Screen, T } from '@/ui/kit';
import { useColors } from '@/ui/theme';

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
        <Card style={{ flex: 1, gap: 2 }}><T style={{ color: c.muted, fontSize: 13 }}>آزمون‌ها</T><T style={{ fontSize: 26, fontWeight: '700' }}>{faNum(exams.length)}</T></Card>
        <Card style={{ flex: 1, gap: 2 }}><T style={{ color: c.muted, fontSize: 13 }}>درس‌ها</T><T style={{ fontSize: 26, fontWeight: '700' }}>{faNum(lessonsDone)}<T style={{ color: c.muted, fontSize: 14 }}> / {faNum(bank?.tests.length ?? 44)}</T></T></Card>
        <Card style={{ flex: 1, gap: 2 }}><T style={{ color: c.muted, fontSize: 13 }}>اشتباهات</T><T style={{ fontSize: 26, fontWeight: '700', color: mistakes ? c.bad : c.text }}>{faNum(mistakes)}</T></Card>
      </View>
      <Button label="شروع آزمون تصادفی" onPress={() => router.navigate('/exam')} />
      {recent.length ? <T style={{ fontWeight: '700', fontSize: 18, marginTop: 6 }}>آخرین فعالیت‌ها</T> : null}
      {recent.map(a => (
        <Card key={a.at} onPress={() => { session.result = a; session.fresh = false; router.push('/result'); }} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Ring value={pctOf(a)} size={48} stroke={5} color={isFull(a) ? (isPass(a) ? c.ok : c.bad) : c.accent} label={`${faNum(Math.round(pctOf(a) * 100))}`} />
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '700' }}>{a.mode === 'lesson' ? 'درس' : 'آزمون'} · {faNum(scoreOf(a))} از {faNum(a.items.length)} درست</T>
            <T style={{ color: c.muted, fontSize: 13 }}>{fmtDate(a.at)}{isFull(a) ? (isPass(a) ? ' · قبول' : ' · مردود') : ''}</T>
          </View>
          <T style={{ color: c.link, fontWeight: '700' }}>مرور</T>
        </Card>
      ))}
    </Screen>
  );
}
