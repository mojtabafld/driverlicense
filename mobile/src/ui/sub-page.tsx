// An inner page opened from a tab (a part of «آموزش», the help, a bug report, the account): the back button and the
// page's title fixed at the top on Liquid Glass (the page scrolls under it, so the way back is always at hand), the
// line under the title and the content scrolling below. It slides in and out like the other inner pages, and a drag
// from right to left goes back.
// `hero`: a picture header like the tabs' (Hero in kit.tsx) at the top instead of the glass head, with the page's title
// and line on it; the back button floats over the picture.
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, BackHandler, KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Confirm } from './confirm';
import { Icon } from './icon';
import { Backdrop, Hero, T, tap, usePageMotion, useTopOnFocus, type HeroLook } from './kit';
import { GlassTop } from './liquid';
import { Marquee } from './marquee';
import { backLean, swipeWebStyle, usePager, useSwipeBack } from './swipe';
import { useColors } from './theme';

// `guard`: while set (e.g. unsaved changes), leaving — the back button, the drag back or the phone's back button — asks
// first with this title and text.
// `scrollKey`: when it changes, the page goes back to its top (e.g. the next step of a lesson).
// `scrollRef` / `onBodyY`: the page's scroll view and where its content starts under the picture header, so a page can
// scroll to a part of itself (the rules page to the part it opens).
// `close`: a ✕ in place of the back arrow, for a page with its own previous / next bar (a lesson, a practice), so
// the way out never looks like the bar's arrows.
// `pager`: a page with its own previous / next bar turns its steps with a sideways swipe (as the exam does) instead of
// going back with one, so a swipe for the next step never leaves the page.
export function SubPage({ title, subtitle, children, gap = 14, maxWidth = 760, guard, scrollKey, hero, scrollRef, onBodyY, close, pager }: { title: string; subtitle?: string; children: React.ReactNode; gap?: number;
  maxWidth?: number; guard?: { title: string; text: string } | null; scrollKey?: string | number; hero?: HeroLook; scrollRef?: React.RefObject<ScrollView | null>;
  onBodyY?: (y: number) => void; close?: boolean; pager?: { i: number; n: number; go: (k: number) => void } }) {
  const c = useColors(), ins = useSafeAreaInsets();
  const motion = usePageMotion('push');
  const ref = useTopOnFocus(scrollRef);
  useEffect(() => { if (scrollKey !== undefined) ref.current?.scrollTo({ y: 0, animated: false }); }, [scrollKey, ref]);
  const [headH, setHeadH] = useState(0);
  const [asking, setAsking] = useState(false);
  const leave = () => motion.leave(() => (router.canGoBack() ? router.back() : router.replace('/')));
  const back = () => (guard ? setAsking(true) : leave());
  const backSwipe = useSwipeBack(back), turn = usePager(pager?.i ?? 0, pager?.n ?? 0, pager?.go ?? noop);
  const swipe = pager ? turn : backSwipe;
  useEffect(() => {
    if (!guard) return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => { setAsking(true); return true; });
    return () => sub.remove();
  }, [guard]);
  return (
    <Backdrop anim={motion.style}>
      <Animated.View {...swipe.handlers} style={[{ flex: 1 }, swipeWebStyle, pager ? { transform: [{ translateX: turn.dx }] } : backLean(backSwipe.dx)]}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          {hero ? (
            <ScrollView ref={ref} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingBottom: ins.bottom + 40 }}>
              <Hero look={hero} title={title} subtitle={subtitle} back />
              <View onLayout={e => onBodyY?.(e.nativeEvent.layout.y)} style={{ paddingTop: 6, paddingHorizontal: 16, gap, maxWidth, width: '100%', alignSelf: 'center' }}>{children}</View>
            </ScrollView>
          ) : (
          <ScrollView ref={ref} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ paddingTop: headH + 12, paddingHorizontal: 16, paddingBottom: ins.bottom + 40, gap, maxWidth, width: '100%', alignSelf: 'center' }}>
            {subtitle ? <T style={{ color: c.muted, fontSize: 14, lineHeight: 22 }}>{subtitle}</T> : null}
            {children}
          </ScrollView>
          )}
        </KeyboardAvoidingView>
        {hero ? (
          // Over the picture: only the way back, on a soft round backing.
          <View pointerEvents="box-none" style={{ position: 'absolute', top: ins.top + (Platform.OS === 'web' ? 14 : 8), left: 0, right: 0, paddingHorizontal: 16 }}>
            <View pointerEvents="box-none" style={{ flexDirection: 'row', width: '100%', maxWidth, alignSelf: 'center' }}>
              <Pressable onPress={() => { tap(); back(); }} accessibilityLabel={close ? 'بستن' : 'بازگشت'} hitSlop={6}
                style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.surface2 : c.surface, opacity: 0.94,
                  shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 })}>
                <Icon name={close ? 'xmark' : 'arrowRight'} size={20} color={c.text} />
              </Pressable>
            </View>
          </View>
        ) : (
        /* The fixed head: back and the title. */
        <GlassTop onHeight={setHeadH}>
          <SafeAreaView edges={['top']} style={{ paddingTop: Platform.OS === 'web' ? 14 : 8, paddingBottom: 10, paddingHorizontal: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, width: '100%', maxWidth, alignSelf: 'center' }}>
              <Pressable onPress={() => { tap(); back(); }} accessibilityLabel={close ? 'بستن' : 'بازگشت'} hitSlop={6}
                style={({ pressed }) => ({ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.surface2 : c.surface, borderWidth: 1.5, borderColor: c.line })}>
                <Icon name={close ? 'xmark' : 'arrowRight'} size={20} color={c.text} />
              </Pressable>
              <View style={{ flex: 1, height: 32 }}>
                <Marquee text={title} height={32} style={{ fontSize: 22, lineHeight: 32, fontWeight: '700' }} />
              </View>
            </View>
          </SafeAreaView>
        </GlassTop>
        )}
      </Animated.View>
      {guard ? (
        <Confirm open={asking} icon="exit" title={guard.title} text={guard.text} cancel="ماندن" ok="خروج" cancelIcon="xmark" okIcon="exit" danger
          onCancel={() => setAsking(false)} onOk={() => { setAsking(false); leave(); }} />
      ) : null}
    </Backdrop>
  );
}
const noop = () => {};
