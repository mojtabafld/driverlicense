// A row of tall gradient cards that slides sideways (Mojtaba 2026-11-13, after the «Services» card carousel,
// src/components/ui/services-card.tsx, made for Tailwind and the web): the same look drawn with React Native, so it is
// the same on the website and in the phone apps. Each card a soft two-colour gradient (left to right, deeper in the
// dark theme) with a faint shade rising from its foot, its number «( 001 )» in small mono letters, a large line icon,
// and at the foot its title in capitals (Latin) over a line of text. One card a row on a phone, two from 700 points
// wide, three from 1000 (the original's md and lg); the cards rise into place one after another the first time the
// row is shown; a swipe moves card by card, and the round arrow at the reading end moves on by one, back to the first
// after the last (the original loops). A card with `onPress` opens its page.
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Platform, Pressable, ScrollView, View } from 'react-native';

import { RTL, tr } from '@/lib/i18n';
import { Icon, type IconName } from './icon';
import { T, tap } from './kit';
import { useColors, useIsDark } from './theme';

export type ServiceTone = 'purple' | 'green' | 'red' | 'blue' | 'amber';
export type ServiceItem = { number: string; title: string; description: string; icon: IconName; tone: ServiceTone; onPress?: () => void };

// The original's Tailwind gradients: «from-X-100 to-X-200» in the light theme, «from-X-900/50 to-X-800/50» in the dark.
export const TONES: Record<ServiceTone, { light: [string, string]; dark: [string, string] }> = {
  purple: { light: ['#f3e8ff', '#e9d5ff'], dark: ['rgba(88,28,135,0.5)', 'rgba(107,33,168,0.5)'] },
  green: { light: ['#dcfce7', '#bbf7d0'], dark: ['rgba(20,83,45,0.5)', 'rgba(22,101,52,0.5)'] },
  red: { light: ['#fee2e2', '#fecaca'], dark: ['rgba(127,29,29,0.5)', 'rgba(153,27,27,0.5)'] },
  blue: { light: ['#dbeafe', '#bfdbfe'], dark: ['rgba(30,58,138,0.5)', 'rgba(30,64,175,0.5)'] },
  amber: { light: ['#fef3c7', '#fde68a'], dark: ['rgba(120,53,15,0.5)', 'rgba(146,64,14,0.5)'] },
};
const GAP = 12;
const MONO = Platform.select({ ios: 'Menlo', android: 'monospace', default: 'ui-monospace, SFMono-Regular, Menlo, monospace' });

// The cards' look on its own, for other cards that keep their own content and size (Mojtaba 2026-11-13: the test
// page's cards and the three under «شانس قبولی»): the two-colour wash with its shade from the foot, drawn behind the
// card's content (the card itself has the rounded corners and `overflow: 'hidden'`).
export function CardWash({ tone, dark: forceDark }: { tone: ServiceTone; dark?: boolean }) {
  const themeDark = useIsDark(), dark = forceDark ?? themeDark;
  return (
    <>
      <LinearGradient pointerEvents="none" colors={dark ? TONES[tone].dark : TONES[tone].light} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <LinearGradient pointerEvents="none" colors={[dark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)', 'transparent']} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
    </>
  );
}
// A card's number, «( 001 )», in small mono letters: Latin digits and left to right in every language.
export function CardCode({ n, color }: { n: string; color?: string }) {
  const c = useColors(), dark = useIsDark();
  return <T raw style={{ fontFamily: MONO, fontSize: 13, lineHeight: 18, color: color ?? (dark ? '#ffffff' : c.text), opacity: 0.5, writingDirection: 'ltr', ...(Platform.OS === 'web' ? { direction: 'ltr', unicodeBidi: 'isolate' } : null) } as any}>( {n} )</T>;
}

function Card({ it, index, width, height, dark, shown, still }: { it: ServiceItem; index: number; width: number; height: number; dark: boolean; shown: boolean; still: boolean }) {
  const c = useColors();
  const rise = useRef(new Animated.Value(still ? 1 : 0)).current;
  useEffect(() => {
    if (!shown || still) return;
    Animated.timing(rise, { toValue: 1, duration: 500, delay: index * 100, useNativeDriver: Platform.OS !== 'web' }).start();
  }, [shown]);
  const ink = dark ? '#ffffff' : c.text;
  const body = (
    <Animated.View style={{ width, height, borderRadius: 24, overflow: 'hidden', opacity: rise, transform: [{ translateY: rise.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }] }}>
      <LinearGradient colors={dark ? TONES[it.tone].dark : TONES[it.tone].light} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      {/* the faint shade rising from the foot, for the text over it */}
      <LinearGradient pointerEvents="none" colors={[dark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)', 'transparent']} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <View style={{ flex: 1, padding: width < 300 ? 20 : 26, justifyContent: 'space-between' }}>
        <View style={{ alignItems: 'flex-start', gap: 22 }}>
          {/* (a code, as the original's «( 001 )»: Latin digits and left to right in every language) */}
          <T raw style={{ fontFamily: MONO, fontSize: 13, color: ink, opacity: 0.5, writingDirection: 'ltr', ...(Platform.OS === 'web' ? { direction: 'ltr', unicodeBidi: 'isolate' } : null) } as any}>( {it.number} )</T>
          <Icon name={it.icon} size={44} color={ink} />
        </View>
        <View style={{ gap: 6 }}>
          <T numberOfLines={2} style={{ fontSize: 17, lineHeight: 25, fontWeight: '600', color: ink, textTransform: 'uppercase', letterSpacing: RTL ? 0 : 1.2 }}>{it.title}</T>
          <T numberOfLines={4} style={{ fontSize: 14, lineHeight: 22, color: ink, opacity: 0.72 }}>{it.description}</T>
        </View>
      </View>
    </Animated.View>
  );
  if (!it.onPress) return body;
  return (
    <Pressable onPress={() => { tap(); it.onPress?.(); }} accessibilityRole="button" accessibilityLabel={`${tr(it.title)}. ${tr(it.description)}`}
      style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1 })}>{body}</Pressable>
  );
}

// `height`: the cards' height (450 in the original; less where the page has less room). `dark`: the dark cards
// whatever the theme (a page that is dark in every theme, as the welcome page).
export function ServiceCarousel({ items, height = 300, dark: forceDark }: { items: ServiceItem[]; height?: number; dark?: boolean }) {
  const c = useColors(), themeDark = useIsDark(), dark = forceDark ?? themeDark;
  const [w, setW] = useState(0), [still, setStill] = useState(false);
  const ref = useRef<ScrollView>(null), x = useRef(0);
  useEffect(() => { AccessibilityInfo.isReduceMotionEnabled().then(setStill).catch(() => {}); }, []);
  const per = w >= 1000 ? 3 : w >= 700 ? 2 : 1;
  const cardW = w ? (w - GAP * (per - 1)) / per : 0, step = cardW + GAP;
  // on to the next card, and back to the first after the last
  const next = () => {
    tap();
    const end = x.current + w >= items.length * step - GAP - 4;
    const node = (ref.current as unknown as { getScrollableNode?: () => HTMLElement })?.getScrollableNode?.();
    if (Platform.OS === 'web' && node?.scrollTo) {
      if (end) node.scrollTo({ left: 0, behavior: 'smooth' });
      else node.scrollBy({ left: (RTL ? -1 : 1) * step, behavior: 'smooth' });
    } else ref.current?.scrollTo({ x: end ? 0 : Math.round(x.current / step + 1) * step, animated: true });
  };
  return (
    <View onLayout={e => setW(e.nativeEvent.layout.width)} accessibilityRole={'region' as any} accessibilityLabel={tr('کارت‌ها')}>
      {w ? (
        <ScrollView ref={ref} horizontal showsHorizontalScrollIndicator={false} decelerationRate="fast" snapToInterval={step} snapToAlignment="start"
          contentContainerStyle={{ gap: GAP }} scrollEventThrottle={32}
          style={Platform.OS === 'web' ? ({ scrollSnapType: 'x mandatory' } as object) : undefined}
          onScroll={e => { x.current = Math.abs(e.nativeEvent.contentOffset.x); }}>
          {items.map((it, i) => (
            <View key={it.number} style={Platform.OS === 'web' ? ({ scrollSnapAlign: 'start' } as object) : undefined}>
              <Card it={it} index={i} width={cardW} height={height} dark={dark} shown={!!w} still={still} />
            </View>
          ))}
        </ScrollView>
      ) : <View style={{ height }} />}
      {items.length > per ? (
        <Pressable onPress={next} accessibilityRole="button" accessibilityLabel={tr('کارت بعدی')} hitSlop={6}
          style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({ position: 'absolute', top: height / 2 - 20, [RTL ? 'left' : 'right']: 8, width: 40, height: 40,
            borderRadius: 20, alignItems: 'center', justifyContent: 'center',
            backgroundColor: dark ? `rgba(255,255,255,${pressed || hovered ? 0.2 : 0.1})` : (pressed || hovered ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.06)') }) as any}>
          {/* (arrowLeft points to the reading end: the icon turns it round in English) */}
          <Icon name="arrowLeft" size={18} color={dark ? '#ffffff' : c.text} />
        </Pressable>
      ) : null}
    </View>
  );
}
