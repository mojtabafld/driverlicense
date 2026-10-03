// The intro shown once on a device: four slides about what the app does, each a picture with a large title and a
// short line, on the app's navy gradient. «رد شدن» skips it, «بعدی» goes on and the last slide's «شروع کنید» closes
// it; a sideways swipe also turns the slides (right to left, as the page reads).
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Animated, Easing, Pressable, View, useWindowDimensions, type GestureResponderEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from './icon';
import { T, tap } from './kit';
import { ArtAi, ArtBank, ArtExam, ArtProgress } from './onboarding-art';

const SLIDES = [
  { Art: ArtBank, title: 'آزمون تئوری دانمارک، در جیب شما', text: 'همه‌ی سؤال‌های آزمون تئوری با تصویر، به دانمارکی یا انگلیسی و با ترجمه‌ی فارسی؛ همراه درس‌های کوتاه هر مبحث.' },
  { Art: ArtExam, title: 'آزمون، درست مثل روز امتحان', text: '۲۵ سؤال تصویری با زمان‌سنج و همان معیار قبولی. قبل از رفتن سر جلسه بدانید چقدر آماده‌اید.' },
  { Art: ArtAi, title: 'معلم هوش مصنوعی همراه شما', text: 'برای هر اشتباه توضیحی ساده به فارسی بگیرید و در پایان هر آزمون جمع‌بندی نکته‌هایی را که باید مرور کنید.' },
  { Art: ArtProgress, title: 'پیشرفت‌تان را ببینید', text: 'نمودار پیشرفت، احتمال قبولی و تمرین هدفمند همان مباحثی که بیشتر در آن‌ها اشتباه می‌کنید.' },
];
const BG = ['#0b5d91', '#024776', '#012f4f'] as const;
const BUTTON = '#8cc3ef', BUTTON_TEXT = '#012a45';

export function Onboarding({ onDone }: { onDone: () => void }) {
  const ins = useSafeAreaInsets(), { width, height } = useWindowDimensions();
  const [i, setI] = useState(0);
  const [fade] = useState(() => new Animated.Value(1));
  const last = i === SLIDES.length - 1;
  const go = (n: number) => {
    if (n < 0 || n >= SLIDES.length || n === i) return;
    tap();
    Animated.timing(fade, { toValue: 0, duration: 140, easing: Easing.out(Easing.quad), useNativeDriver: true }).start(() => {
      setI(n);
      Animated.timing(fade, { toValue: 1, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    });
  };
  // Right to left: a swipe to the right brings the next slide, to the left the previous one.
  const touch = useRef<{ x: number; y: number } | null>(null);
  const swipe = {
    onTouchStart: (e: GestureResponderEvent) => { touch.current = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY }; },
    onTouchEnd: (e: GestureResponderEvent) => {
      const t = touch.current; touch.current = null; if (!t) return;
      const dx = e.nativeEvent.pageX - t.x, dy = e.nativeEvent.pageY - t.y;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(i + (dx > 0 ? 1 : -1));
    },
  };
  const { Art, title, text } = SLIDES[i];
  const artH = Math.min(height * 0.42, 340), shift = fade.interpolate({ inputRange: [0, 1], outputRange: [16, 0] });
  return (
    <View style={{ flex: 1 }} {...swipe}>
      <LinearGradient colors={BG} locations={[0, 0.5, 1]} start={{ x: 0.8, y: 0 }} end={{ x: 0.2, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <View style={{ flex: 1, paddingTop: ins.top + 24, paddingBottom: ins.bottom + 20, paddingHorizontal: 28, width: '100%', maxWidth: 560, alignSelf: 'center' }}>
        <Animated.View style={{ flex: 1, opacity: fade, transform: [{ translateY: shift }] }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: Math.min(width - 40, 380), height: artH }}><Art /></View>
          </View>
          <View style={{ gap: 12, paddingBottom: 28, minHeight: 190 }}>
            <T style={{ color: '#fff', fontSize: 30, lineHeight: 44, fontWeight: '800' }}>{title}</T>
            <T style={{ color: 'rgba(255,255,255,0.86)', fontSize: 16, lineHeight: 28 }}>{text}</T>
          </View>
        </Animated.View>
        {/* Skip at the start, the dots in the middle (at the start on the last slide, beside the wider «شروع کنید»), next / start at the end */}
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 54 }}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            {last ? null : (
              <Pressable onPress={() => { tap(); onDone(); }} hitSlop={10} accessibilityRole="button">
                <T style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16 }}>رد شدن</T>
              </Pressable>
            )}
          </View>
          <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: last ? 'flex-start' : 'center', gap: 8 }}>
            {SLIDES.map((_, k) => (
              <Pressable key={k} onPress={() => go(k)} hitSlop={6} accessibilityLabel={`اسلاید ${k + 1}`}>
                <View style={{ width: k === i ? 12 : 7, height: k === i ? 12 : 7, borderRadius: 6, backgroundColor: k === i ? '#fff' : 'rgba(255,255,255,0.55)' }} />
              </Pressable>
            ))}
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Pressable onPress={() => (last ? (tap(), onDone()) : go(i + 1))} accessibilityRole="button"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, flexDirection: 'row', alignItems: 'center', gap: 6, height: 50, paddingHorizontal: 22, borderRadius: 25, backgroundColor: BUTTON })}>
              <T style={{ color: BUTTON_TEXT, fontSize: 16, fontWeight: '700' }}>{last ? 'شروع کنید' : 'بعدی'}</T>
              <Icon name="chevronLeft" size={16} color={BUTTON_TEXT} weight="semibold" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
