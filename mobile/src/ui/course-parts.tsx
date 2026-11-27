// Pieces shared by a course lesson (app/course-lesson.tsx) and «تمرین هوشمند» (app/drill.tsx): the situation's picture,
// the rule in a box with its law, and «حواستان باشد».
import { Image } from 'expo-image';
import { View } from 'react-native';

import { API_URL } from '@/lib/config';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { T } from './kit';
import { useColors } from './theme';

const PIC_BG = '#f2f3f5';
export function Art({ k }: { k: string }) {
  const c = useColors(), { courseArt } = useApp();
  const v = courseArt[k];
  return (
    <View style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: 16, overflow: 'hidden', backgroundColor: PIC_BG, alignItems: 'center', justifyContent: 'center' }}>
      {v ? <Image source={{ uri: `${API_URL}/course-art/${k}.png?v=${v}` }} style={{ width: '100%', height: '100%' }} contentFit="contain" transition={200} />
        : <View style={{ alignItems: 'center', gap: 6, padding: 16 }}><Icon name="exam" size={34} color={c.faint} /><T style={{ color: c.faint, fontSize: 12.5, textAlign: 'center' }}>تصویر این موقعیت هنوز ساخته نشده است</T></View>}
    </View>
  );
}

export function RuleBox({ text, law }: { text: string; law?: string }) {
  const c = useColors();
  return (
    <View style={{ gap: 8, padding: 14, borderRadius: 14, backgroundColor: c.accentSoft, borderWidth: 1, borderColor: c.link }}>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start' }}>
        <Icon name="bulbCircle" size={20} color={c.link} />
        <T style={{ flex: 1, fontWeight: '700', fontSize: 15, lineHeight: 25, color: c.text }}>{text}</T>
      </View>
      {law ? <T style={{ fontSize: 12, color: c.muted }}>منبع: {law}</T> : null}
    </View>
  );
}

// «حواستان باشد»: how the exam's statements try to catch you on this rule.
export function TrapBox({ text }: { text: string }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start', padding: 14, borderRadius: 14, backgroundColor: c.warnSoft }}>
      <Icon name="warning" size={19} color={c.warn} />
      <View style={{ flex: 1, gap: 2 }}>
        <T style={{ fontWeight: '700', fontSize: 13.5, color: c.warn }}>حواستان باشد</T>
        <T style={{ fontSize: 14, lineHeight: 24 }}>{text}</T>
      </View>
    </View>
  );
}
