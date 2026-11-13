// The quick menu (Mojtaba 2026-11-13, after the «Bottom Menu» component, src/components/ui/bottom-menu.tsx, made for
// Tailwind and the web): the same menu drawn with React Native, so it is the same on the website and in the phone apps.
// A small round button floats above the tab bar at the reading end; pressed, a row of five round-cornered buttons
// rises over it, and each of them opens its own little panel above the row, the panel growing from its foot and the
// panels changing with a soft blur (on the web) and scale. A tap anywhere else, or the button again, closes it.
//   +        quick starts: the day's note (the calendar), the smart coach, a 5-question test
//   search   a search box (the course's search) with two short cuts, the road signs and the glossary
//   bell     the news and the study calendar
//   person   the account, the settings, premium, and signing out (asked first, as in the settings)
//   sun      the theme: automatic, light or dark
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Platform, Pressable, TextInput, View } from 'react-native';

import { randomIds } from '@/lib/logic';
import { session } from '@/lib/session';
import { RTL, t as fmt, tr, UI_LANG } from '@/lib/i18n';
import { useApp } from '@/lib/store';
import { Confirm } from './confirm';
import { Icon, type IconName } from './icon';
import { T, tap } from './kit';
import { useColors, useIsDark, useTheme } from './theme';

type View_ = 'home' | 'search' | 'notifications' | 'profile' | 'theme';
const MAIN_NAV: { icon: IconName; name: View_; label: string }[] = [
  { icon: 'plus', name: 'home', label: 'شروع سریع' },
  { icon: 'search', name: 'search', label: 'جستجو' },
  { icon: 'bell', name: 'notifications', label: 'پیام‌ها' },
  { icon: 'person', name: 'profile', label: 'حساب کاربری' },
  { icon: 'sun', name: 'theme', label: 'ظاهر' },
];
const WEB = Platform.OS === 'web';
const EASE_OPEN = Easing.bezier(0.45, 0, 0.25, 1), EASE_SWAP = Easing.bezier(0.42, 0, 0.58, 1);

// `bottom`: how far above the screen's foot the button sits (over the tab bar).
export function BottomMenu({ bottom }: { bottom: number }) {
  const c = useColors(), dark = useIsDark(), { mode, setMode } = useTheme();
  const { bank, logout, user } = useApp();
  const [open, setOpen] = useState(false), [view, setView] = useState<View_ | null>(null);
  const [askOut, setAskOut] = useState(false), [q, setQ] = useState('');
  const [still, setStill] = useState(false);
  useEffect(() => { AccessibilityInfo.isReduceMotionEnabled().then(setStill).catch(() => {}); }, []);
  const bar = useRef(new Animated.Value(0)).current, panel = useRef(new Animated.Value(0)).current, swap = useRef(new Animated.Value(1)).current;
  const [shown, setShown] = useState<View_ | null>(null);  // (the panel drawn: stays while it closes)

  useEffect(() => {
    Animated.timing(bar, { toValue: open ? 1 : 0, duration: still ? 0 : 260, easing: EASE_OPEN, useNativeDriver: !WEB }).start();
    if (!open) setView(null);
  }, [open]);
  useEffect(() => {
    if (view) {
      const was = shown;
      setShown(view);
      if (was && was !== view && !still) { swap.setValue(0); Animated.timing(swap, { toValue: 1, duration: 250, easing: EASE_SWAP, useNativeDriver: !WEB }).start(); }
      Animated.timing(panel, { toValue: 1, duration: still ? 0 : 300, easing: EASE_OPEN, useNativeDriver: !WEB }).start();
    } else {
      Animated.timing(panel, { toValue: 0, duration: still ? 0 : 220, easing: EASE_OPEN, useNativeDriver: !WEB }).start(({ finished }) => { if (finished) setShown(null); });
    }
  }, [view]);

  const close = () => setOpen(false);
  const go = (to: () => void) => { tap(); close(); to(); };
  const ink = c.text, muted = c.muted, line = c.line;
  const glass = dark ? 'rgba(28,30,36,0.95)' : 'rgba(255,255,255,0.95)';
  const end = RTL ? { left: 16 } : { right: 16 };

  // One line of a panel: an icon (or none) and its words, the hover and press as the original's.
  const row = (key: string, label: string, onPress: () => void, icon?: IconName, danger?: boolean) => (
    <Pressable key={key} onPress={onPress} accessibilityRole="button" accessibilityLabel={tr(label)}
      style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 12,
        backgroundColor: pressed || hovered ? (danger ? (dark ? 'rgba(248,113,113,0.12)' : 'rgba(220,38,38,0.08)') : c.surface2) : 'transparent' }) as any}>
      {icon ? <Icon name={icon} size={20} color={danger ? c.bad : muted} /> : null}
      <T style={{ fontSize: 15, lineHeight: 22, color: danger ? c.bad : ink }}>{label}</T>
    </Pressable>
  );
  const short = () => { if (!bank) return; session.plan = { mode: 'random', ids: randomIds(bank, 5), title: 'آزمون تصادفی' }; router.push('/run'); };
  const search = () => { const s = q.trim(); tap(); close(); router.push(s ? { pathname: '/course-search', params: { q: s } } : '/course-search'); setQ(''); };

  const content = (v: View_) => {
    switch (v) {
      case 'home':
        return (
          <View style={{ minWidth: 220, padding: 6, gap: 2 }}>
            {row('note', 'یادداشت سریع', () => go(() => router.push('/calendar')), 'note')}
            {row('coach', 'مربی هوشمند', () => go(() => router.push({ pathname: '/coach', params: { from: 'learn' } })), 'coach')}
            {row('short', 'آزمون کوتاه ۵ سؤالی', () => go(short), 'exam')}
          </View>
        );
      case 'search':
        return (
          <View style={{ width: 280, padding: 8, gap: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, borderRadius: 12, borderWidth: 1, borderColor: line, backgroundColor: c.surface2 }}>
              <Icon name="search" size={17} color={muted} />
              <TextInput value={q} onChangeText={setQ} onSubmitEditing={search} returnKeyType="search" autoFocus={!WEB ? false : true}
                placeholder={tr('جستجو')} placeholderTextColor={muted} accessibilityLabel={tr('جستجو')}
                style={{ flex: 1, paddingVertical: 8, fontSize: 14.5, color: ink, textAlign: RTL ? 'right' : 'left', ...(WEB ? { outlineStyle: 'none' } : null) } as any} />
            </View>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              {([['sign', 'علائم رانندگی', '/signs'], ['translate', 'واژه‌نامه‌ی آزمون', '/glossary']] as const).map(([icon, label, href]) => (
                <Pressable key={href} onPress={() => go(() => router.push(href))} accessibilityRole="button" accessibilityLabel={tr(label)}
                  style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 8, paddingHorizontal: 6,
                    borderRadius: 12, backgroundColor: pressed || hovered ? c.line : c.surface2 }) as any}>
                  <Icon name={icon} size={15} color={muted} />
                  <T numberOfLines={1} style={{ flexShrink: 1, fontSize: 13.5, lineHeight: 20, color: ink }}>{label}</T>
                </Pressable>
              ))}
            </View>
          </View>
        );
      case 'notifications':
        return (
          <View style={{ minWidth: 220, padding: 6, gap: 2 }}>
            {row('news', 'پیام‌ها', () => go(() => router.push('/news')), 'mail')}
            {row('cal', 'تقویم', () => go(() => router.push('/calendar')), 'calendar')}
          </View>
        );
      case 'profile':
        return (
          <View style={{ minWidth: 230, padding: 6, gap: 2 }}>
            {user && !user.guest ? row('account', 'حساب کاربری', () => go(() => router.push('/account')), 'person') : null}
            {row('settings', 'تنظیمات', () => go(() => router.navigate('/settings')), 'settings')}
            {row('premium', 'نسخه‌ی ویژه', () => go(() => router.push('/premium')), 'sparkles')}
            {user ? <>
              <View style={{ height: 1, backgroundColor: line, marginVertical: 2 }} />
              {row('out', 'خروج از حساب', () => { tap(); close(); setAskOut(true); }, 'exit', true)}
            </> : null}
          </View>
        );
      case 'theme':
        return (
          <View style={{ flexDirection: 'row', gap: 6, padding: 6 }}>
            {([['system', 'phone', 'خودکار'], ['light', 'sun', 'روشن'], ['dark', 'moon', 'تیره']] as const).map(([key, icon, label]) => {
              const on = mode === key;
              return (
                <Pressable key={key} onPress={() => { tap(); setMode(key); }} accessibilityRole="radio" accessibilityState={{ selected: on }} accessibilityLabel={tr(label)}
                  style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 9, borderRadius: 12,
                    backgroundColor: on ? c.accentSoft : pressed || hovered ? c.surface2 : 'transparent' }) as any}>
                  <Icon name={icon} size={18} color={on ? ink : muted} />
                  <T style={{ fontSize: 14.5, lineHeight: 21, color: on ? ink : muted }}>{label}</T>
                </Pressable>
              );
            })}
          </View>
        );
    }
  };

  const rise = (v: Animated.Value, by: number) => ({ opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [by, 0] }) }, { scaleX: v.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }, { scaleY: v.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1] }) }] });
  const card = { borderRadius: 18, borderWidth: 1, borderColor: line, backgroundColor: glass, shadowColor: '#000', shadowOpacity: dark ? 0.4 : 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 8,
    ...(WEB ? { backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' } : null) } as any;

  return (
    <>
      {/* A tap outside closes it (the original's click outside). */}
      {open ? <Pressable onPress={close} accessible={false} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} /> : null}
      <Confirm open={askOut} icon="exit" danger title="خروج از حساب؟" text="برای ادامه‌ی تمرین دوباره باید وارد حساب خود شوید. پیشرفت شما ذخیره می‌ماند."
        cancel="ماندن" ok={UI_LANG === 'fa' ? 'خروج' : fmt('خروج از حساب')} okIcon="exit" onCancel={() => setAskOut(false)} onOk={() => { setAskOut(false); logout(); }} />
      <View pointerEvents="box-none" style={{ position: 'absolute', bottom, ...end, alignItems: 'flex-end', gap: 10 }}>
        {/* the panel of the button pressed, growing from its foot */}
        {shown ? (
          <Animated.View pointerEvents={view ? 'auto' : 'none'} style={[card, { overflow: 'hidden', alignSelf: 'center', paddingVertical: 4 }, rise(panel, 14),
            WEB ? ({ transformOrigin: 'bottom center' } as any) : null]}>
            <Animated.View style={[{ opacity: swap, transform: [{ scale: swap.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) }] },
              WEB ? ({ filter: swap.interpolate({ inputRange: [0, 1], outputRange: ['blur(10px)', 'blur(0px)'] }) } as any) : null]}>
              {content(shown)}
            </Animated.View>
          </Animated.View>
        ) : null}
        {/* the row of five */}
        <Animated.View pointerEvents={open ? 'auto' : 'none'} accessibilityRole={'toolbar' as any} accessibilityLabel={tr('منوی سریع')}
          style={[card, { flexDirection: 'row', gap: 4, padding: 4 }, rise(bar, 16)]}>
          {MAIN_NAV.map(({ icon, name, label }) => {
            const on = view === name;
            return (
              <Pressable key={name} onPress={() => { tap(); setView(on ? null : name); }} accessibilityRole="button" accessibilityLabel={tr(label)} accessibilityState={{ expanded: on }}
                style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({ padding: 12, borderRadius: 16, backgroundColor: on ? c.accentSoft : pressed || hovered ? c.surface2 : 'transparent' }) as any}>
                <Icon name={icon} size={22} color={on ? ink : muted} filled={on} />
              </Pressable>
            );
          })}
        </Animated.View>
        {/* the round button over the tab bar */}
        <Pressable onPress={() => { tap(); setOpen(o => !o); }} accessibilityRole="button" accessibilityLabel={tr(open ? 'بستن' : 'منوی سریع')} accessibilityState={{ expanded: open }} hitSlop={6}
          style={({ pressed }) => [card, { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.85 : 1 }]}>
          <Animated.View style={{ transform: [{ rotate: bar.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '90deg'] }) }] }}>
            <Icon name={open ? 'xmark' : 'more'} size={22} color={ink} />
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}
