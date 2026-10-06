// An inner page opened from a tab (a part of «آموزش», the help, a bug report, the account): the back button and the
// page's title fixed at the top on Liquid Glass (the page scrolls under it, so the way back is always at hand), the
// line under the title and the content scrolling below. It slides in and out like the other inner pages, and a drag
// from right to left goes back.
import { router } from 'expo-router';
import { useState } from 'react';
import { Animated, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from './icon';
import { Backdrop, T, tap, usePageMotion, useTopOnFocus } from './kit';
import { GlassTop } from './liquid';
import { Marquee } from './marquee';
import { backLean, swipeWebStyle, useSwipeBack } from './swipe';
import { useColors } from './theme';

export function SubPage({ title, subtitle, children, gap = 14, maxWidth = 760 }: { title: string; subtitle?: string; children: React.ReactNode; gap?: number; maxWidth?: number }) {
  const c = useColors(), ins = useSafeAreaInsets();
  const motion = usePageMotion('push');
  const ref = useTopOnFocus();
  const [headH, setHeadH] = useState(0);
  const back = () => motion.leave(() => (router.canGoBack() ? router.back() : router.replace('/')));
  const swipe = useSwipeBack(back);
  return (
    <Backdrop anim={motion.style}>
      <Animated.View {...swipe.handlers} style={[{ flex: 1 }, swipeWebStyle, backLean(swipe.dx)]}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView ref={ref} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingTop: headH + 12, paddingHorizontal: 16, paddingBottom: ins.bottom + 40, gap, maxWidth, width: '100%', alignSelf: 'center' }}>
            {subtitle ? <T style={{ color: c.muted, fontSize: 14, lineHeight: 22 }}>{subtitle}</T> : null}
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
        {/* The fixed head: back and the title. */}
        <GlassTop onHeight={setHeadH}>
          <SafeAreaView edges={['top']} style={{ paddingTop: Platform.OS === 'web' ? 14 : 8, paddingBottom: 10, paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%', maxWidth, alignSelf: 'center' }}>
              <Pressable onPress={() => { tap(); back(); }} accessibilityLabel="بازگشت" hitSlop={6}
                style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.surface2 : c.surface, borderWidth: 1.5, borderColor: c.line })}>
                <Icon name="arrowRight" size={20} color={c.text} />
              </Pressable>
              <View style={{ flex: 1, height: 32 }}>
                <Marquee text={title} height={32} style={{ fontSize: 22, lineHeight: 32, fontWeight: '700' }} />
              </View>
            </View>
          </SafeAreaView>
        </GlassTop>
      </Animated.View>
    </Backdrop>
  );
}
