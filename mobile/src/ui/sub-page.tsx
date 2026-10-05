// An inner page opened from a tab (a part of «آموزش», the help, a bug report): the back button and the page's title,
// a line under it, then the content, scrolling as one; it slides in and out like the other inner pages.
import { router } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from './icon';
import { Backdrop, T, tap, usePageMotion } from './kit';
import { Marquee } from './marquee';
import { useColors } from './theme';

export function SubPage({ title, subtitle, children, gap = 14 }: { title: string; subtitle?: string; children: React.ReactNode; gap?: number }) {
  const c = useColors(), ins = useSafeAreaInsets();
  const motion = usePageMotion('push');
  return (
    <Backdrop anim={motion.style}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingTop: ins.top + 14, paddingHorizontal: 16, paddingBottom: ins.bottom + 40, gap, maxWidth: 760, width: '100%', alignSelf: 'center' }}>
          <View style={{ gap: 4 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Pressable onPress={() => { tap(); motion.leave(() => (router.canGoBack() ? router.back() : router.replace('/'))); }} accessibilityLabel="بازگشت" hitSlop={6}
                style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface, borderWidth: 1.5, borderColor: c.line }}>
                <Icon name="arrowRight" size={20} color={c.text} />
              </Pressable>
              <Marquee text={title} height={34} style={{ fontSize: 24, lineHeight: 34, fontWeight: '700' }} />
            </View>
            {subtitle ? <T style={{ color: c.muted, fontSize: 14, lineHeight: 22 }}>{subtitle}</T> : null}
          </View>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </Backdrop>
  );
}
