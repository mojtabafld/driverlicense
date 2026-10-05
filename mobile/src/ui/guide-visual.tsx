// Shared parts of the teaching pages «علائم رانندگی» and «آموزش حق تقدم»: the category chips, an item's educational
// picture (made by the server; a soft tile with its code until then), text with **bold** parts, and the practice button.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, ScrollView, View, type StyleProp, type TextStyle } from 'react-native';

import { API_URL } from '@/lib/config';
import { FULL, faNum, shuffle } from '@/lib/logic';
import { session } from '@/lib/session';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { Button, L, T, tap } from './kit';
import { useColors } from './theme';

export const PIC_BG = '#f2f3f5'; // the pictures' own light background, the same in both themes

// A row of chips that scrolls sideways; the chosen one filled.
export function Chips<V extends string>({ options, value, onChange }: { options: { value: V; label: string }[]; value: V; onChange: (v: V) => void }) {
  const c = useColors();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 2 }} style={{ flexGrow: 0 }}>
      {options.map(o => {
        const on = o.value === value;
        return (
          <Pressable key={o.value} onPress={() => { tap(); onChange(o.value); }} accessibilityRole="tab" accessibilityState={{ selected: on }}
            style={({ pressed }) => ({ paddingVertical: 8, paddingHorizontal: 14, borderRadius: 99, opacity: pressed ? 0.8 : 1,
              backgroundColor: on ? c.strong : c.surface2, borderWidth: 1, borderColor: on ? c.strong : c.line })}>
            <T style={{ fontSize: 13.5, fontWeight: '700', color: on ? c.strongFg : c.text }}>{o.label}</T>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

// An item's picture at its aspect ratio; until the server has made it, a soft tile with `label` (e.g. the code).
export function GuideImage({ k, aspect, label, radius = 12 }: { k: string; aspect: number; label?: string; radius?: number }) {
  const c = useColors();
  const { guideArt } = useApp();
  const v = guideArt[k];
  return (
    <View style={{ width: '100%', aspectRatio: aspect, borderRadius: radius, overflow: 'hidden', backgroundColor: PIC_BG, alignItems: 'center', justifyContent: 'center' }}>
      {v ? <Image source={{ uri: `${API_URL}/guide-art/${k}.png?v=${v}` }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} contentFit="cover" transition={200} />
        : (
          <View style={{ alignItems: 'center', gap: 6 }}>
            <Icon name="sign" size={30} color="#9aa0a6" />
            {label ? <L style={{ fontSize: 13, fontWeight: '700', color: '#7a8087' }}>{label}</L> : null}
            <T style={{ fontSize: 11, color: '#9aa0a6' }}>تصویر در حال آماده شدن</T>
          </View>
        )}
      {/* a hairline edge in the dark theme, so the light picture does not glare */}
      <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: radius, borderWidth: 1, borderColor: c.line }} />
    </View>
  );
}

// Text with **bold** parts.
export function Rich({ text, style }: { text: string; style?: StyleProp<TextStyle> }) {
  return (
    <T style={style}>
      {text.split(/(\*\*.+?\*\*)/g).map((p, i) => (/^\*\*.+\*\*$/.test(p) ? <T key={i} style={[style, { fontWeight: '800' }]}>{p.slice(2, -2)}</T> : p))}
    </T>
  );
}

// A practice exam of the bank's questions in these topics.
function practise(ids: number[], title: string) { session.plan = { mode: 'sections', ids, title }; router.push('/run'); }
export function PracticeButton({ topics, title }: { topics: string[]; title: string }) {
  const { bank } = useApp();
  if (!bank) return null;
  const ids = bank.questions.filter(q => topics.includes(q.c)).map(q => q.id);
  if (!ids.length) return null;
  return <Button kind="grey" icon="play" label={`تمرین این بخش (${faNum(Math.min(ids.length, FULL))} سؤال)`} onPress={() => practise(shuffle(ids).slice(0, FULL), title)} />;
}
