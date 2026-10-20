// Main site, before the intro's slides: the app's language, picked on a wheel like setting the time on an iPhone
// (Mojtaba, 2026-10-15), laid out as it was then but in the sign-in pages' look (Mojtaba 2026-10-20): the page's own
// colour (black in the dark theme), its text colours and its wide button. The three languages turn on a drum that
// settles on the one in the middle band; the title, its line and the button speak the language in the middle as it
// turns. «ادامه» keeps it (the page reloads in it when it is not Persian). The theme button sits at the top.
import { useEffect, useRef, useState } from 'react';
import { Animated, Platform, Pressable, View, type NativeScrollEvent, type NativeSyntheticEvent, type ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { UI_CHOSEN, UI_LANG, type UiLang } from '@/lib/i18n';
import { Icon } from './icon';
import { T, ThemeButton, tap } from './kit';
import { useColors } from './theme';

export const LANG_NAMES: Record<UiLang, string> = { fa: 'فارسی', en: 'English', da: 'Dansk' };
export const LANG_FONT = (l: UiLang, w: 500 | 700 = 500) => (l === 'fa' ? `Vazirmatn-${w}` : `Inter-${w}`);
// Danish on top, English in the middle (chosen to begin with), Persian below (Mojtaba, 2026-10-15); also the order
// of the intro's language list.
export const LANGS: UiLang[] = ['da', 'en', 'fa'];
const TITLE: Record<UiLang, string> = { fa: 'زبان برنامه را انتخاب کنید', en: 'Choose your language', da: 'Vælg dit sprog' };
const NOTE: Record<UiLang, string> = { fa: 'بعداً هم از تنظیمات قابل تغییر است.', en: 'You can change it later in the settings.', da: 'Du kan ændre det senere i indstillingerne.' };
const GO: Record<UiLang, string> = { fa: 'ادامه', en: 'Continue', da: 'Fortsæt' };

// The drum: rows ROW high, VISIBLE of them in view, the chosen one in the middle band.
const ROW = 54, VISIBLE = 5, PAD = ROW * ((VISIBLE - 1) / 2);

export function LangWheel({ onDone }: { onDone: (l: UiLang) => void }) {
  const c = useColors(), ins = useSafeAreaInsets();
  // English in the middle band to begin with (Mojtaba, 2026-10-15), until another is chosen.
  const start = Math.max(0, LANGS.indexOf(UI_CHOSEN ? UI_LANG : 'en'));
  const [at, setAt] = useState(start);
  const [y] = useState(() => new Animated.Value(start * ROW));
  const ref = useRef<ScrollView>(null);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const near = (v: number) => Math.max(0, Math.min(LANGS.length - 1, Math.round(v / ROW)));
  const settle = (k: number) => ref.current?.scrollTo({ y: k * ROW, animated: true });
  useEffect(() => { const t = setTimeout(() => ref.current?.scrollTo({ y: start * ROW, animated: false }), 0); return () => clearTimeout(t); }, [start]);
  useEffect(() => () => { if (idle.current) clearTimeout(idle.current); }, []);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const v = e.nativeEvent.contentOffset.y, k = near(v);
    y.setValue(v);
    if (k !== at) { setAt(k); tap(); }
    // The web has no snapping of its own: once the drum stops, it turns to the nearest row.
    if (Platform.OS === 'web') {
      if (idle.current) clearTimeout(idle.current);
      idle.current = setTimeout(() => { if (Math.abs(v - k * ROW) > 1) settle(k); }, 120);
    }
  };
  const l = LANGS[at];
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }}>
      <View style={{ position: 'absolute', top: ins.top + 14, left: 16, zIndex: 2, borderRadius: 23, backgroundColor: c.surface2 }}><ThemeButton /></View>
      <View style={{ flex: 1, paddingTop: ins.top + 64, paddingBottom: ins.bottom + 20, paddingHorizontal: 28, width: '100%', maxWidth: 560, alignSelf: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 30 }}>
          <View style={{ alignItems: 'center', gap: 12 }}>
            <View style={{ width: 60, height: 60, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
              <Icon name="translate" size={32} color={c.text} />
            </View>
            <T raw style={{ color: c.text, fontSize: 26, lineHeight: 38, fontFamily: LANG_FONT(l, 700), fontWeight: 'normal', textAlign: 'center', writingDirection: l === 'fa' ? 'rtl' : 'ltr' }}>{TITLE[l]}</T>
            <T raw style={{ color: c.muted, fontSize: 15, lineHeight: 24, fontFamily: LANG_FONT(l), textAlign: 'center', writingDirection: l === 'fa' ? 'rtl' : 'ltr' }}>{NOTE[l]}</T>
          </View>
          {/* The drum: a soft band marks the middle row; rows further from it fade, shrink and tilt away. */}
          <View style={{ width: '100%', maxWidth: 320, height: ROW * VISIBLE }} accessibilityRole="adjustable" accessibilityValue={{ text: LANG_NAMES[l] }}
            accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
            onAccessibilityAction={e => settle(Math.max(0, Math.min(LANGS.length - 1, at + (e.nativeEvent.actionName === 'increment' ? 1 : -1))))}>
            <View pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, top: PAD, height: ROW, borderRadius: 14, backgroundColor: c.surface2 }} />
            <Animated.ScrollView ref={ref} showsVerticalScrollIndicator={false} snapToInterval={ROW} decelerationRate="fast"
              contentContainerStyle={{ paddingVertical: PAD }} scrollEventThrottle={16}
              onScroll={onScroll}
              onMomentumScrollEnd={e => settle(near(e.nativeEvent.contentOffset.y))}
              style={[{ flex: 1 }, Platform.OS === 'web' ? ({ scrollSnapType: 'y mandatory', overscrollBehavior: 'contain' } as object) : null]}>
              {LANGS.map((k, n) => {
                const d = (v: number) => y.interpolate({ inputRange: [(n - 2) * ROW, (n - 1) * ROW, n * ROW, (n + 1) * ROW, (n + 2) * ROW], outputRange: [v, (1 + v) / 2, 1, (1 + v) / 2, v], extrapolate: 'clamp' });
                const tilt = y.interpolate({ inputRange: [(n - 2) * ROW, n * ROW, (n + 2) * ROW], outputRange: ['-50deg', '0deg', '50deg'], extrapolate: 'clamp' });
                return (
                  <Pressable key={k} onPress={() => { if (n !== at) settle(n); }} accessibilityRole="button" accessibilityLabel={LANG_NAMES[k]}
                    style={Platform.OS === 'web' ? ({ scrollSnapAlign: 'center' } as object) : undefined}>
                    <Animated.View style={{ height: ROW, alignItems: 'center', justifyContent: 'center', opacity: d(0.3), transform: [{ perspective: 400 }, { rotateX: tilt }, { scale: d(0.82) }] }}>
                      <T raw style={{ color: c.text, fontSize: 24, lineHeight: 34, fontFamily: LANG_FONT(k, n === at ? 700 : 500), fontWeight: 'normal', textAlign: 'center' }}>{LANG_NAMES[k]}</T>
                    </Animated.View>
                  </Pressable>
                );
              })}
            </Animated.ScrollView>
          </View>
        </View>
        <Pressable onPress={() => { tap(); onDone(l); }} accessibilityRole="button"
          style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, alignItems: 'center', justifyContent: 'center', height: 56, borderRadius: 16, backgroundColor: c.cta })}>
          <T raw style={{ color: c.ctaFg, fontSize: 17, fontFamily: LANG_FONT(l, 700), fontWeight: 'normal', textAlign: 'center' }}>{GO[l]}</T>
        </Pressable>
      </View>
    </View>
  );
}
