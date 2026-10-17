// «واژه‌نامه‌ی آزمون»: the Danish words of the theory test (lib/glossary.ts), each with its meaning in the app's
// language (Persian; English in an English or Danish app) and, in Persian, one line on what the test expects. A field
// on top filters them by any of their words. ?q= fills it (a term tapped under a course step).
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';

import { RTL, tr } from '@/lib/i18n';
import { searchTerms } from '@/lib/glossary';
import { faNum } from '@/lib/logic';
import { Icon } from '@/ui/icon';
import { Card, T, physicalAlign, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { DA_FONT, useColors } from '@/ui/theme';

export default function Glossary() {
  const c = useColors();
  const p = useLocalSearchParams<{ q?: string }>();
  const [q, setQ] = useState(String(p.q || ''));
  const list = searchTerms(q);
  return (
    <SubPage title="واژه‌نامه‌ی آزمون" subtitle="اصطلاح‌های دانمارکی آزمون تئوری">
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 14, height: 50, borderRadius: 14, borderWidth: 1, borderColor: c.line, backgroundColor: c.surface }}>
        <Icon name="search" size={18} color={c.faint} />
        <TextInput value={q} onChangeText={v => setQ(v.slice(0, 60))} placeholder={tr('یک کلمه بنویسید، دانمارکی یا فارسی')} placeholderTextColor={c.muted}
          accessibilityLabel={tr('جستجو در واژه‌نامه')} autoCapitalize="none" autoCorrect={false}
          style={{ flex: 1, height: 46, fontSize: 15, color: c.text, fontFamily: RTL ? 'Vazirmatn-400' : undefined, textAlign: physicalAlign(RTL ? 'right' : 'left'),
            writingDirection: RTL ? 'rtl' : 'ltr', ...(Platform.OS === 'web' ? { outlineStyle: 'none' } as any : {}) }} />
        {q ? <Pressable onPress={() => { tap(); setQ(''); }} hitSlop={8} accessibilityLabel={tr('پاک کردن')}><Icon name="xmark" size={16} color={c.faint} /></Pressable> : null}
      </View>
      <T style={{ color: c.muted, fontSize: 12.5 }}>{faNum(list.length)} اصطلاح</T>
      <Card style={{ padding: 4, gap: 0 }}>
        {list.map((t, i) => (
          <View key={t.da}>
            {i ? <View style={{ height: 1, backgroundColor: c.line, marginHorizontal: 12, opacity: 0.6 }} /> : null}
            <View style={{ paddingVertical: 11, paddingHorizontal: 12, gap: 2 }}>
              <T raw style={{ fontFamily: DA_FONT, fontSize: 15.5, fontWeight: '700', writingDirection: 'ltr', textAlign: physicalAlign(RTL ? 'right' : 'left') }}>{t.da}</T>
              <T raw style={{ fontSize: 14, lineHeight: 22 }}>{RTL ? t.fa : t.en}</T>
              {RTL ? <T raw style={{ fontSize: 12, color: c.faint, writingDirection: 'ltr', textAlign: physicalAlign('right') }}>{t.en}</T> : null}
              {RTL && t.note ? <T raw style={{ fontSize: 12.5, lineHeight: 20, color: c.muted }}>{t.note}</T> : null}
            </View>
          </View>
        ))}
        {list.length ? null : <T style={{ color: c.muted, textAlign: 'center', padding: 16 }}>اصطلاحی پیدا نشد.</T>}
      </Card>
      <View style={{ height: 40 }} />
    </SubPage>
  );
}
