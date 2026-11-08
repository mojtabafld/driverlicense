// The home page's sections under the chart (Mojtaba 2026-11-08, after fonts.google.com/knowledge): «مباحث» as chips that
// scroll sideways (its «Browse topics»), the chapter you are on as a module (its title, its line, its lessons with a tick
// for each one done and «همه‌ی درس‌ها», as Knowledge's modules and «View all articles»), a featured guide (as its book
// block: the road signs) and a few words from the glossary («View all glossary terms»).
import { router } from 'expo-router';
import { Pressable, ScrollView, View } from 'react-native';

import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { GLOSSARY } from '@/lib/glossary';
import { UI_LANG, tr } from '@/lib/i18n';
import { faNum } from '@/lib/logic';
import { Cookie } from './cookie';
import { Icon, type IconName } from './icon';
import { M3Button, T, tap } from './kit';
import { useTabLook } from './tabs/tab-look';
import { DA_FONT, useColors, useM3 } from './theme';

function Head({ title, text }: { title: string; text?: string }) {
  const c = useColors();
  return (
    <View style={{ gap: 6, paddingHorizontal: 4 }}>
      <T style={{ fontSize: 22, lineHeight: 32, fontWeight: '500' }}>{title}</T>
      {text ? <T style={{ fontSize: 14.5, lineHeight: 24, color: c.muted }}>{text}</T> : null}
    </View>
  );
}

export function HomeKnowledge({ gap = 14 }: { gap?: number }) {
  const c = useColors(), m = useM3(), tab = useTabLook();
  const { done } = useCourseProgress();
  // The chapter you are on: the first with a lesson not done (the last when all are).
  const chapter = COURSE.find(ch => ch.lessons.some(l => !done[l.id])) ?? COURSE[COURSE.length - 1];
  // A few words from the glossary, a different set each day.
  const day = Math.floor(Date.now() / 864e5), words = Array.from({ length: 4 }, (_, i) => GLOSSARY[(day * 4 + i * 37) % GLOSSARY.length]);
  const open = (go: () => void) => () => { tap(); go(); };
  const chip = (label: string, onPress: () => void, icon?: IconName) => (
    <Pressable key={label} onPress={open(onPress)} accessibilityRole="button"
      style={({ pressed }) => ({ height: 40, paddingHorizontal: 16, borderRadius: 999, borderWidth: 1, borderColor: m.outline, flexDirection: 'row', alignItems: 'center', gap: 6,
        backgroundColor: pressed ? c.surface2 : 'transparent' })}>
      {icon ? <Icon name={icon} size={18} color={c.text} /> : null}
      <T numberOfLines={1} style={{ fontSize: 14, fontWeight: '500' }}>{label}</T>
    </Pressable>
  );
  return (
    <View style={{ gap: gap + 16, paddingTop: 8 }}>
      {/* «مباحث»: the course's chapters and the other guides as chips, sideways */}
      <View style={{ gap: 12 }}>
        <Head title={tr('مباحث')} />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 4 }}>
          {COURSE.map(ch => chip(tr(ch.title), () => router.push({ pathname: '/course-lesson', params: { id: (ch.lessons.find(l => !done[l.id]) ?? ch.lessons[0]).id } })))}
          {chip(tr('علائم رانندگی'), () => router.push('/signs'), 'sign')}
          {chip(tr('حق تقدم'), () => router.push('/priority'), 'priority')}
          {chip(tr('قوانین'), () => router.push('/rules'), 'rules')}
          {chip(tr('همه‌ی مباحث'), () => router.navigate('/learn'), 'arrowLeft')}
        </ScrollView>
      </View>

      {/* The chapter you are on, as a module */}
      <View style={{ gap: 12 }}>
        <Head title={tr(chapter.title)} text={tr(chapter.sub)} />
        <View style={{ borderRadius: 24, backgroundColor: c.surface, overflow: 'hidden' }}>
          {chapter.lessons.map((l, i) => {
            const ok = !!done[l.id];
            return (
              <Pressable key={l.id} onPress={open(() => router.push({ pathname: '/course-lesson', params: { id: l.id } }))} accessibilityRole="button"
                style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 18, paddingVertical: 14,
                  borderTopWidth: i ? 1 : 0, borderTopColor: c.line, backgroundColor: pressed ? c.surface2 : 'transparent' })}>
                <Icon name={ok ? 'checkCircle' : 'learn'} size={20} color={ok ? c.ok : c.muted} filled={ok} />
                <T numberOfLines={2} style={{ flex: 1, fontSize: 15, lineHeight: 23, color: ok ? c.muted : c.text }}>{tr(l.title)}</T>
                <T raw style={{ fontSize: 12.5, color: c.muted }}>{`${faNum(l.minutes)} ${tr('دقیقه')}`}</T>
              </Pressable>
            );
          })}
        </View>
        <View style={{ alignItems: 'center' }}>
          <M3Button kind="outlined" m={m} icon="learn" onPress={() => router.push('/course')}
            label={tr('همه‌ی درس‌ها')} />
        </View>
      </View>

      {/* A featured guide, as Knowledge's book block: the road signs */}
      <View style={{ borderRadius: 28, backgroundColor: c.surface, padding: 22, gap: 14 }}>
        <Cookie size={64} color={tab.indicator}><Icon name="sign" size={32} color={tab.onIndicator} /></Cookie>
        <T style={{ fontSize: 24, lineHeight: 34, fontWeight: '500' }}>{tr('علائم رانندگی دانمارک')}</T>
        <T style={{ fontSize: 14.5, lineHeight: 24, color: c.muted }}>{tr('همه‌ی تابلوها و خط‌کشی‌های آزمون، با معنی و نکته‌ی هر کدام؛ گروه‌به‌گروه، با تصویر.')}</T>
        <View style={{ alignItems: 'flex-start' }}>
          <M3Button kind="outlined" m={m} icon="sign" label={tr('دیدن تابلوها')} onPress={() => router.push('/signs')} />
        </View>
      </View>

      {/* A few words from the glossary */}
      <View style={{ gap: 12 }}>
        <Head title={tr('واژه‌نامه')} text={tr('واژه‌های دانمارکی که در آزمون می‌بینید')} />
        <View style={{ gap: 18, paddingHorizontal: 4 }}>
          {words.map(w => (
            <View key={w.da} style={{ gap: 4 }}>
              <T raw style={{ fontSize: 17, lineHeight: 25, fontWeight: '500', fontFamily: DA_FONT }}>{w.da}</T>
              <T raw style={{ fontSize: 14.5, lineHeight: 23, color: c.muted }}>{UI_LANG === 'fa' ? w.fa : w.en}</T>
            </View>
          ))}
        </View>
        <View style={{ alignItems: 'center' }}>
          <M3Button kind="outlined" m={m} icon="translate" label={tr('همه‌ی واژه‌ها')} onPress={() => router.push('/glossary')} />
        </View>
      </View>
    </View>
  );
}
