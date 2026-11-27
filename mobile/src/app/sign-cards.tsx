// «تمرین سریع تابلوها»: flash cards of the road signs (lib/sign-cards.ts). One sign at a time, its picture large and
// four meanings to choose from; a tap shows at once whether it was right, the sign's code, Danish name and what it
// means, and «بعدی». A sign answered wrong comes again at the end of the same round. The end: how many were right
// and how many signs are now learned, with another round or back. Without premium only the first group (the
// warning signs) is practised, as only that group opens on the signs page.
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { useFree } from '@/lib/free';
import { faNum } from '@/lib/logic';
import { RTL } from '@/lib/i18n';
import { ALL_SIGNS, buildSession, choicesFor, learned, nameOf, nextCard, useSignCards, type SignCard } from '@/lib/sign-cards';
import { GuideImage, Rich } from '@/ui/guide-visual';
import { Icon } from '@/ui/icon';
import { Button, Card, Enter, PageSkeleton, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

type Round = { queue: SignCard[]; choices: string[][]; at: number; pick: string | null; right: number; wrong: string[] };

const start = (queue: SignCard[]): Round => ({ queue, choices: queue.map(choicesFor), at: 0, pick: null, right: 0, wrong: [] });
const code = (s: string) => s.replace(/^([A-Z]+)(\d)/, '$1 $2');

export default function SignCards() {
  const c = useColors();
  const { cards, loaded, save } = useSignCards();
  const { limited } = useFree();
  const pool = limited ? ALL_SIGNS.filter(s => s.group === 0) : ALL_SIGNS;
  const [round, setRound] = useState<Round | null>(null);
  useEffect(() => { if (loaded && !round) setRound(start(buildSession(cards, pool))); }, [loaded]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!round) return <SubPage title="تمرین سریع تابلوها" close><PageSkeleton /></SubPage>;

  const done = round.at >= round.queue.length;
  const s = round.queue[round.at];
  const choose = (v: string) => {
    if (round.pick) return;
    tap();
    const ok = v === nameOf(s), first = !round.wrong.includes(s.key) && round.queue.indexOf(s) === round.at;
    // Only the first answer of the round moves the card; a sign asked again after a mistake is practice.
    if (first) save({ [s.key]: nextCard(cards[s.key], ok) });
    const again = !ok && !round.queue.slice(round.at + 1).includes(s);
    setRound({ ...round, pick: v, right: round.right + (ok && first ? 1 : 0), wrong: ok || round.wrong.includes(s.key) ? round.wrong : [...round.wrong, s.key],
      queue: again ? [...round.queue, s] : round.queue, choices: again ? [...round.choices, choicesFor(s)] : round.choices });
  };
  const next = () => { tap(); setRound({ ...round, at: round.at + 1, pick: null }); };
  const firstCount = round.queue.length - round.wrong.length;

  return (
    <SubPage title="تمرین سریع تابلوها" close={!done} scrollKey={done ? -1 : round.at} gap={14}>
      {done ? (
        <Enter>
          <Card style={{ gap: 14, alignItems: 'center', paddingVertical: 24 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: c.accentSoft, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="sign" size={30} color={c.link} />
            </View>
            <T style={{ fontWeight: '800', fontSize: 20 }}>{faNum(round.right)} از {faNum(firstCount)} درست</T>
            <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22, textAlign: 'center' }}>
              {faNum(learned(cards))} تابلو از {faNum(ALL_SIGNS.length)} را خوب یاد گرفته‌اید. تابلوهای اشتباه زودتر دوباره می‌آیند.
            </T>
            <View style={{ alignSelf: 'stretch', gap: 10 }}>
              <Button icon="refresh" label="یک دور دیگر" onPress={() => { tap(); setRound(start(buildSession(cards, pool))); }} />
              <Button kind="grey" label="بازگشت" onPress={() => { tap(); router.back(); }} />
            </View>
            {limited ? <T style={{ color: c.faint, fontSize: 12, textAlign: 'center' }}>بدون نسخه‌ی ویژه فقط تابلوهای هشدار تمرین می‌شوند.</T> : null}
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
              <View style={{ alignSelf: 'center', width: '72%', maxWidth: 320 }}>
                <GuideImage k={s.key} aspect={1} flat />
              </View>
            </Card>
            <T style={{ fontWeight: '800', fontSize: 17 }}>این تابلو چه معنی‌ای دارد؟</T>
            <View style={{ gap: 8 }}>
              {round.choices[round.at].map(v => {
                const right = v === nameOf(s), picked = v === round.pick, shown = !!round.pick;
                const border = shown && right ? c.ok : shown && picked ? c.bad : c.line;
                return (
                  <Pressable key={v} onPress={() => choose(v)} disabled={shown} accessibilityRole="button"
                    style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 54, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 14,
                      borderWidth: 1.5, borderColor: border, backgroundColor: c.surface, opacity: shown && !right && !picked ? 0.55 : pressed ? 0.8 : 1 })}>
                    <T raw style={{ flex: 1, fontSize: 14.5, lineHeight: 22 }}>{v}</T>
                    {shown && right ? <Icon name="checkCircle" size={20} color={c.ok} /> : shown && picked ? <Icon name="xCircle" size={20} color={c.bad} /> : null}
                  </Pressable>
                );
              })}
            </View>
            {round.pick ? (
              <Enter>
                <Card style={{ gap: 6 }}>
                  <T style={{ fontWeight: '800', fontSize: 15, color: round.pick === nameOf(s) ? c.ok : c.bad }}>{round.pick === nameOf(s) ? 'درست است' : 'اشتباه بود'}</T>
                  <T raw style={{ fontWeight: '700', fontSize: 14.5 }}>{code(s.code)}: {nameOf(s)}</T>
                  {nameOf(s) !== s.da ? <T raw style={{ color: c.muted, fontSize: 13, writingDirection: 'ltr' }}>{s.da}</T> : null}
                  {RTL ? <Rich text={s.text} style={{ fontSize: 13.5, lineHeight: 23 }} /> : null}
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
