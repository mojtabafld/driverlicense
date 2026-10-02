// Result and answer review of a finished (or past) exam.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { imgSource } from '@/lib/img-source';
import { faNum, fmtDate, isFull, isPass, passMin, pctOf, scoreOf } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp, useQuestionImage } from '@/lib/store';
import { Glass } from '@/ui/glass';
import { Icon } from '@/ui/icon';
import { Backdrop, Button, Card, L, Ring, Segmented, T } from '@/ui/kit';
import { radius, useColors } from '@/ui/theme';

export default function Result() {
  const c = useColors(), ins = useSafeAreaInsets();
  const { Q, settings } = useApp();
  const pic = useQuestionImage();
  const a = session.result, fresh = session.fresh;
  const [filter, setFilter] = useState<'wrong' | 'all'>('wrong');
  const [open, setOpen] = useState<number | null>(null);
  if (!a) { router.back(); return null; }
  const full = isFull(a), pass = isPass(a), n = a.items.length, right = scoreOf(a);
  const lang = settings.lang === 'en' ? 'en' : 'da';
  const items = a.items.map((it, k) => ({ it, k, q: Q.get(it.id) })).filter(x => x.q && (filter === 'all' || !x.it.ok));
  return (
    <Backdrop>
      <ScrollView contentContainerStyle={{ paddingTop: ins.top + 14, paddingHorizontal: 16, paddingBottom: ins.bottom + 40, gap: 12, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
        <Card style={{ alignItems: 'center', gap: 8, paddingVertical: 22 }}>
          <Ring value={pctOf(a)} size={120} stroke={11} color={full ? (pass ? c.ok : c.bad) : c.accent} label={full ? `${faNum(right)}/${faNum(n)}` : `${faNum(Math.round(pctOf(a) * 100))}٪`} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {full ? <Icon name={pass ? 'checkCircle' : 'xCircle'} size={26} color={pass ? c.ok : c.bad} contrast={c.surface} /> : null}
            <T style={{ fontSize: 24, fontWeight: '700', textAlign: 'center', color: full ? (pass ? c.ok : c.bad) : c.text }}>
              {full ? (pass ? (fresh ? 'قبول شدید!' : 'قبول') : (fresh ? 'مردود — دوباره تلاش کنید' : 'مردود')) : `${faNum(right)} از ${faNum(n)} درست`}
            </T>
          </View>
          <T style={{ color: c.muted, textAlign: 'center', fontSize: 13.5 }}>{full ? `برای قبولی حداقل ${faNum(passMin(n))} تصویر از ${faNum(n)} باید کاملاً درست باشد.` : 'آزمون تمرینی'} · {fmtDate(a.at)}</T>
        </Card>
        <Segmented value={filter} onChange={setFilter} options={[{ value: 'wrong', label: `اشتباهات (${faNum(n - right)})` }, { value: 'all', label: `همه (${faNum(n)})` }]} />
        {items.length ? items.map(({ it, k, q }) => (
          <Card key={k} onPress={() => setOpen(open === k ? null : k)} style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              <Image source={imgSource(pic(q!))} style={{ width: 92, aspectRatio: 4 / 3, borderRadius: radius.sm }} contentFit="cover" />
              <View style={{ flex: 1, gap: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Icon name={it.ok ? 'checkCircle' : 'xCircle'} size={17} color={it.ok ? c.ok : c.bad} contrast={c.surface} />
                  <T style={{ fontWeight: '700', color: it.ok ? c.ok : c.bad }}>سؤال {faNum(k + 1)}</T>
                </View>
                <L numberOfLines={2} style={{ fontSize: 14, lineHeight: 20 }}>{lang === 'en' && q!.sen ? q!.sen : q!.sda}</L>
              </View>
            </View>
            {open === k ? (
              <View style={{ gap: 8 }}>
                <Image source={imgSource(pic(q!))} style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: radius.md }} contentFit="contain" />
                {q!.st.map((s, j) => {
                  const mine = !!(it.a && it.a[j]), bad = mine !== !!s.ok;
                  return (
                    <Glass key={j} r={radius.md} tint={bad ? c.badSoft : undefined} style={{ padding: 12, gap: 4 }}>
                      <L style={{ fontSize: 15 }}>{lang === 'en' && s.en ? s.en : s.da}</L>
                      {s.fa ? <T style={{ color: c.muted, fontSize: 13.5 }}>{s.fa}</T> : null}
                      <T style={{ fontSize: 13, fontWeight: '700', color: bad ? c.bad : c.ok }}>
                        پاسخ درست: {s.ok ? 'بله' : 'خیر'} · شما {mine ? 'انتخاب کردید' : 'انتخاب نکردید'}
                      </T>
                      {s.efa || s.eda ? <T style={{ color: c.muted, fontSize: 13 }}>{s.efa || s.eda}</T> : null}
                    </Glass>
                  );
                })}
              </View>
            ) : null}
          </Card>
        )) : <Card style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 }}><Icon name="sparkles" size={20} color={c.warn} /><T style={{ textAlign: 'center' }}>هیچ اشتباهی نداشتید</T></Card>}
        <Button label="بستن" kind="glass" onPress={() => router.back()} />
      </ScrollView>
    </Backdrop>
  );
}
