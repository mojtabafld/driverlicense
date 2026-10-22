// «تمرین سریع حق تقدم» (Mojtaba 2026-10-22): flash cards of the right-of-way situations (lib/priority-cards.ts), as the
// road signs' (app/sign-cards.tsx). One situation at a time, its picture large and four answers to «چه کسی اول
// می‌رود؟»; a tap shows at once whether it was right, the situation's title, what happens and its legal basis, and
// «بعدی». A situation answered wrong comes again at the end of the same round. The end: how many were right and how
// many situations are now learned, with another round or back. Without premium only the first group is practised, as
// only that group opens on the right of way page.
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { useFree } from '@/lib/free';
import { faNum } from '@/lib/logic';
import { ALL_PRIORITY, buildPrioritySession, learnedPriority, priorityChoices, type PriorityCard } from '@/lib/priority-cards';
import { nextCard, useSignCards } from '@/lib/sign-cards';
import { GuideImage, Rich } from '@/ui/guide-visual';
import { Icon } from '@/ui/icon';
import { Button, Card, Enter, PageSkeleton, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

type Round = { queue: PriorityCard[]; choices: string[][]; at: number; pick: string | null; right: number; wrong: string[] };

const start = (queue: PriorityCard[]): Round => ({ queue, choices: queue.map(priorityChoices), at: 0, pick: null, right: 0, wrong: [] });

export default function PriorityCards() {
  const c = useColors();
  const { cards, loaded, save } = useSignCards();
  const { limited } = useFree();
  const pool = limited ? ALL_PRIORITY.filter(s => s.group === 0) : ALL_PRIORITY;
  const [round, setRound] = useState<Round | null>(null);
  useEffect(() => { if (loaded && !round) setRound(start(buildPrioritySession(cards, pool))); }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!round) return <SubPage title="تمرین سریع حق تقدم" close><PageSkeleton /></SubPage>;

  const done = round.at >= round.queue.length;
  const s = round.queue[round.at];
  const choose = (v: string) => {
    if (round.pick) return;
    tap();
    const ok = v === s.first, first = !round.wrong.includes(s.key) && round.queue.indexOf(s) === round.at;
    // Only the first answer of the round moves the card; a sign asked again after a mistake is practice.
    if (first) save({ [s.key]: nextCard(cards[s.key], ok) });
    const again = !ok && !round.queue.slice(round.at + 1).includes(s);
    setRound({ ...round, pick: v, right: round.right + (ok && first ? 1 : 0), wrong: ok || round.wrong.includes(s.key) ? round.wrong : [...round.wrong, s.key],
      queue: again ? [...round.queue, s] : round.queue, choices: again ? [...round.choices, priorityChoices(s)] : round.choices });
  };
  const next = () => { tap(); setRound({ ...round, at: round.at + 1, pick: null }); };
  const firstCount = round.queue.length - round.wrong.length;

  return (
    <SubPage title="تمرین سریع حق تقدم" close={!done} scrollKey={done ? -1 : round.at} gap={14}>
      {done ? (
        <Enter>
          <Card style={{ gap: 14, alignItems: 'center', paddingVertical: 24 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: c.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="priority" size={30} color={c.link} />
            </View>
            <T style={{ fontWeight: '800', fontSize: 20 }}>{faNum(round.right)} از {faNum(firstCount)} درست</T>
            <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22, textAlign: 'center' }}>
              {faNum(learnedPriority(cards))} موقعیت از {faNum(ALL_PRIORITY.length)} را خوب یاد گرفته‌اید. موقعیت‌های اشتباه زودتر دوباره می‌آیند.
            </T>
            <View style={{ alignSelf: 'stretch', gap: 10 }}>
              <Button icon="refresh" label="یک دور دیگر" onPress={() => { tap(); setRound(start(buildPrioritySession(cards, pool))); }} />
              <Button kind="grey" label="بازگشت" onPress={() => { tap(); router.back(); }} />
            </View>
            {limited ? <T style={{ color: c.faint, fontSize: 12, textAlign: 'center' }}>بدون نسخه‌ی ویژه فقط گروه اول حق تقدم تمرین می‌شود.</T> : null}
          </Card>
        </Enter>
      ) : (
        <Enter key={round.at}>
          <View style={{ gap: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: c.surface2, overflow: 'hidden' }}>
                <View style={{ width: `${(round.at / round.queue.length) * 100}%`, height: '100%', backgroundColor: c.link, borderRadius: 3 }} />
              </View>
              <T style={{ color: c.muted, fontSize: 12.5 }}>{faNum(round.at + 1)} / {faNum(round.queue.length)}</T>
            </View>
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <GuideImage k={s.key} aspect={4 / 3} flat zoom />
            </Card>
            <T style={{ fontWeight: '800', fontSize: 17 }}>چه کسی اول می‌رود؟</T>
            <View style={{ gap: 8 }}>
              {round.choices[round.at].map(v => {
                const right = v === s.first, picked = v === round.pick, shown = !!round.pick;
                const border = shown && right ? c.ok : shown && picked ? c.bad : c.line;
                return (
                  <Pressable key={v} onPress={() => choose(v)} disabled={shown} accessibilityRole="button"
                    style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 54, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14,
                      borderWidth: 1.5, borderColor: border, backgroundColor: c.surface, opacity: shown && !right && !picked ? 0.55 : pressed ? 0.8 : 1 })}>
                    <T style={{ flex: 1, fontSize: 14.5, lineHeight: 22 }}>{v}</T>
                    {shown && right ? <Icon name="checkCircle" size={20} color={c.ok} /> : shown && picked ? <Icon name="xCircle" size={20} color={c.bad} /> : null}
                  </Pressable>
                );
              })}
            </View>
            {round.pick ? (
              <Enter>
                <Card style={{ gap: 6 }}>
                  <T style={{ fontWeight: '800', fontSize: 15, color: round.pick === s.first ? c.ok : c.bad }}>{round.pick === s.first ? 'درست است' : 'اشتباه بود'}</T>
                  <T style={{ fontWeight: '700', fontSize: 14.5 }}>{s.title}</T>
                  <Rich text={s.text} style={{ fontSize: 13.5, lineHeight: 23 }} />
                  <T style={{ fontSize: 12.5, lineHeight: 20, color: c.faint }}>مبنای قانونی: {s.law}</T>
                </Card>
                <View style={{ height: 10 }} />
                <Button icon="arrowLeft" label={round.at + 1 < round.queue.length ? 'بعدی' : 'پایان'} onPress={next} />
              </Enter>
            ) : null}
          </View>
        </Enter>
      )}
      <View style={{ height: 40 }} />
    </SubPage>
  );
}
