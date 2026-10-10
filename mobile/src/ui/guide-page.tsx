// A teaching page of «آموزش» (rules, right of way, signs): its parts as cards that open one at a time; an open part
// shows its signs, its points, the line that is easy to get wrong, and a practice exam of the bank's questions on it.
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import type { GuidePart } from '@/lib/guide';
import { FULL, faNum, shuffle } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { Button, Card, Enter, T, tap } from './kit';
import { RoadSign, SIGN_NAME } from './road-signs';
import type { HeroLook } from './kit';
import { SubPage } from './sub-page';
import { useColors } from './theme';

// A practice exam of these questions.
function startPractice(ids: number[], title: string) { session.plan = { mode: 'sections', ids, title }; router.push('/run'); }

const LAW = 'خلاصه‌ای برای آمادگی آزمون تئوری؛ متن کامل قوانین در قانون راهنمایی و رانندگی دانمارک (Færdselsloven) است.';

// `footer`: the line at the end (by default, that this is a summary of the law; null for none); `initialOpen`: the part
// open at first.
// `hero`: a header like the tabs' (SubPage's), e.g. with a vector drawing (ui/header-art.tsx).
export function GuidePage({ title, subtitle, parts, footer = LAW, initialOpen = 0, hero }: { title: string; subtitle: string; parts: GuidePart[]; footer?: string | null; initialOpen?: number; hero?: HeroLook }) {
  const c = useColors();
  const { bank } = useApp();
  const [open, setOpen] = useState<number | null>(initialOpen);
  if (!bank) return null;
  const idsOf = (p: GuidePart) => bank.questions.filter(q => p.topics?.includes(q.c)).map(q => q.id);
  const practise = (p: GuidePart) => startPractice(shuffle(idsOf(p)).slice(0, FULL), p.title);
  return (
    <SubPage title={title} subtitle={subtitle} gap={10} hero={hero}>
      {parts.map((p, i) => {
        const on = open === i, n = idsOf(p).length;
        return (
          <Enter key={p.title}>
            <Card style={{ gap: 12, paddingVertical: 12 }}>
              <Pressable onPress={() => { tap(); setOpen(on ? null : i); }} accessibilityRole="button" accessibilityState={{ expanded: on }}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View style={{ width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: on ? c.strong : c.surface2 }}>
                  <T style={{ fontWeight: '700', fontSize: 14, color: on ? c.strongFg : c.text, textAlign: 'center' }}>{faNum(i + 1)}</T>
                </View>
                <T style={{ flex: 1, fontWeight: '700', fontSize: 16 }}>{p.title}</T>
                <View style={{ transform: [{ rotate: on ? '180deg' : '0deg' }] }}><Icon name="chevronDown" size={18} color={c.muted} /></View>
              </Pressable>
              {on ? (
                <View style={{ gap: 12 }}>
                  {p.intro ? <T style={{ fontSize: 14.5, lineHeight: 24, fontWeight: '600' }}>{p.intro}</T> : null}
                  {p.signs?.length ? (
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', paddingVertical: 4 }}>
                      {p.signs.map(s => (
                        <View key={s} style={{ width: 76, alignItems: 'center', gap: 6 }}>
                          <RoadSign kind={s} size={56} />
                          <T style={{ fontSize: 11.5, lineHeight: 17, color: c.muted, textAlign: 'center' }}>{SIGN_NAME[s]}</T>
                        </View>
                      ))}
                    </View>
                  ) : null}
                  <View style={{ gap: 8 }}>
                    {p.points.map((t, k) => (
                      <View key={k} style={{ flexDirection: 'row', gap: 8 }}>
                        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: c.muted, marginTop: 10 }} />
                        <T style={{ flex: 1, fontSize: 14.5, lineHeight: 25 }}>{t}</T>
                      </View>
                    ))}
                  </View>
                  {p.tip ? (
                    <View style={{ flexDirection: 'row', gap: 8, padding: 12, borderRadius: 12, backgroundColor: c.warnSoft }}>
                      <Icon name="info" size={18} color={c.warn} />
                      <T style={{ flex: 1, fontSize: 13.5, lineHeight: 22 }}>{p.tip}</T>
                    </View>
                  ) : null}
                  {n ? <Button kind="grey" icon="play" label={`تمرین این بخش (${faNum(Math.min(n, FULL))} سؤال)`} onPress={() => practise(p)} /> : null}
                </View>
              ) : null}
            </Card>
          </Enter>
        );
      })}
      {footer ? <T style={{ color: c.faint, fontSize: 12, lineHeight: 20, textAlign: 'center', marginTop: 6 }}>{footer}</T> : null}
    </SubPage>
  );
}
