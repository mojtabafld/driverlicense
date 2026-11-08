// The welcome screen's and the welcome-back screen's three cards (Mojtaba 2026-10-29, after a picture he sent): a
// playful mascot each (made by the image model, light and dark versions, their background cut away so they sit on the
// card's own colour; assets/images/vibe-*),
// a tag and two or three lines on what the app does, side by side with the next ones peeking in at the edges. A swipe
// (or every few seconds by itself, until touched) brings the next one to the middle: the cards on the sides shrink, tilt
// and fade a little, and the middle one's mascot floats gently.
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, View, useWindowDimensions, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { API_URL } from '@/lib/config';
import { tr } from '@/lib/i18n';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from './icon';
import { T, tap } from './kit';
import { useN } from './welcome';

const ART = {
  light: [require('../../assets/images/vibe-1-light.webp'), require('../../assets/images/vibe-2-light.webp'), require('../../assets/images/vibe-3-light.webp')],
  dark: [require('../../assets/images/vibe-1-dark.webp'), require('../../assets/images/vibe-2-dark.webp'), require('../../assets/images/vibe-3-dark.webp')],
};
// Each card's colour (the colour its picture was drawn on).
const FEATURE_ICONS: IconName[] = ['exam', 'coach', 'trend'];
// The cards in the order shown (Mojtaba 2026-11-05: the smart coach first, then practice); `n`: the card's own number,
// which its picture and colour go by.
const CARDS = [
  { n: 1, tag: 'مربی هوشمند', text: 'اشتباه کردی؟ مربی هوشمند توضیح می‌دهد چرا، به زبان خودت.' },
  { n: 0, tag: 'تمرین', text: '۱۱۰۰ سؤال، درست مثل آزمون واقعی. هر روز کمی، تا روز آزمون.' },
  { n: 2, tag: 'قبولی', text: 'پیشرفتت را ببین، آماده شو و با خیال راحت قبول شو.' },
];
const web = Platform.OS === 'web';

// `room`: the height the cards may take (their picture shrinks to fit it).
export function VibeCards({ room }: { room: number }) {
  const N = useN(), { width } = useWindowDimensions(), look = N.dark ? 'dark' : 'light';
  // A picture chosen on the admin's picture page («صفحه ورود», served at /vibe-art/<n>-<look>.png) in place of the
  // bundled mascot.
  const { vibeArt } = useApp();
  const pic = (n: number) => { const k = `${n + 1}-${look}`, v = vibeArt[k]; return v ? { uri: `${API_URL}/vibe-art/${k}.png?v=${encodeURIComponent(v)}` } : ART[look][n]; };
  const W = Math.min(width, 520), gap = 14;
  // The card keeps its width; on a short screen only its picture is lower (drawn whole on the card's own colour).
  const small = room < 300, textH = small ? 96 : 118, CW = Math.round(Math.min(300, W * 0.7)), picH = Math.max(90, Math.min(Math.round(CW * 0.82), room - textH - 26));
  const step = CW + gap, side = (W - CW) / 2;
  const [x] = useState(() => new Animated.Value(0)), list = useRef<any>(null);
  const [at, setAt] = useState(0), touched = useRef(false);
  // The middle card's mascot floats up and down.
  const [float] = useState(() => new Animated.Value(0));
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(float, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: !web }),
      Animated.timing(float, { toValue: 0, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: !web }),
    ]));
    loop.start(); return () => loop.stop();
  }, [float]);
  // By itself every 4.5 seconds until the cards are touched.
  useEffect(() => {
    const id = setInterval(() => {
      if (touched.current) return;
      const n = (at + 1) % CARDS.length;
      list.current?.scrollTo?.({ x: n * step, animated: true });
    }, 4500);
    return () => clearInterval(id);
  }, [at, step]);
  const onEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => setAt(Math.max(0, Math.min(CARDS.length - 1, Math.round(e.nativeEvent.contentOffset.x / step))));
  const go = (i: number) => { touched.current = true; tap(); list.current?.scrollTo?.({ x: i * step, animated: true }); };
  return (
    <View style={{ width: W, alignSelf: 'center', gap: 12 }}>
      {/* (left to right in every language, so the swipe and the dots agree) */}
      <Animated.ScrollView ref={list} horizontal showsHorizontalScrollIndicator={false} snapToInterval={step} decelerationRate="fast" disableIntervalMomentum
        style={{ direction: 'ltr', flexGrow: 0 } as any} contentContainerStyle={{ paddingHorizontal: side, gap, paddingVertical: 6 }}
        onScrollBeginDrag={() => { touched.current = true; }} onTouchStart={() => { touched.current = true; }}
        onMomentumScrollEnd={onEnd} onScrollEndDrag={web ? onEnd : undefined} scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x } } }], { useNativeDriver: !web, listener: web ? (e: any) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / step); if (i !== at && i >= 0 && i < CARDS.length) setAt(i);
        } : undefined })}>
        {CARDS.map((card, i) => {
          const r = [(i - 1) * step, i * step, (i + 1) * step];
          const scale = x.interpolate({ inputRange: r, outputRange: [0.86, 1, 0.86], extrapolate: 'clamp' });
          const opacity = x.interpolate({ inputRange: r, outputRange: [0.55, 1, 0.55], extrapolate: 'clamp' });
          const rotate = x.interpolate({ inputRange: r, outputRange: ['4deg', '0deg', '-4deg'], extrapolate: 'clamp' });
          const lift = x.interpolate({ inputRange: r, outputRange: [14, 0, 14], extrapolate: 'clamp' });
          return (
            <Animated.View key={i} style={{ width: CW, opacity, transform: [{ translateY: lift }, { scale }, { rotate }] }}>
              <View style={{ borderRadius: 24, overflow: 'hidden', backgroundColor: N.glass, paddingBottom: small ? 12 : 18 }}>
                <Animated.View style={{ height: picH, transform: [{ translateY: i === at ? float.interpolate({ inputRange: [0, 1], outputRange: [3, -5] }) : 0 }] }}>
                  <Image source={pic(card.n)} style={{ width: CW, height: picH }} contentFit="contain" transition={200} />
                </Animated.View>
                <View style={{ alignItems: 'center', gap: small ? 6 : 10, paddingHorizontal: 18, minHeight: textH - 18 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Icon name={FEATURE_ICONS[card.n]} size={28} color={N.accent} />
                    <T style={{ fontSize: 16, lineHeight: 23, fontWeight: '500', color: N.ink }}>{card.tag}</T>
                  </View>
                  <T style={{ fontSize: small ? 14.5 : 16, lineHeight: small ? 22 : 26, fontWeight: '400', textAlign: 'center', color: N.ink }}>{card.text}</T>
                </View>
              </View>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
      {/* The dots: the middle card's a wider pill. */}
      <View style={{ flexDirection: 'row', direction: 'ltr', justifyContent: 'center', gap: 6 } as any}>
        {CARDS.map((card, i) => (
          <Pressable key={i} onPress={() => go(i)} hitSlop={8} accessibilityRole="button" accessibilityLabel={tr(card.tag)}>
            <View style={{ width: i === at ? 20 : 7, height: 7, borderRadius: 4, backgroundColor: i === at ? N.ink : N.faint, opacity: i === at ? 1 : 0.5 }} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}
