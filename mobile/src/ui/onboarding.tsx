// The intro shown once on a device: four slides about what the app does, each a tall picture across the top (fading
// into the page, ui/tall-picture.tsx) with a large title and a short line under it, on the app's forest green. «رد شدن» skips it, «بعدی» goes on and the last slide's «شروع کنید» closes
// it; a sideways swipe also turns the slides (right to left, as the page reads).
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, View, useWindowDimensions, type GestureResponderEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { API_URL } from '@/lib/config';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { T, tap } from './kit';
import { ROSE } from './theme';
import { TallPicture } from './tall-picture';
import { ArtAi, ArtBank, ArtExam, ArtProgress } from './onboarding-art';

const SLIDES = [
  { Art: ArtBank, title: 'آزمون تئوری دانمارک، در جیب شما', text: 'همه‌ی سؤال‌های آزمون تئوری با تصویر، به دانمارکی یا انگلیسی و با ترجمه‌ی فارسی؛ همراه درس‌های کوتاه هر مبحث.' },
  { Art: ArtExam, title: 'آزمون، درست مثل روز امتحان', text: '۲۵ سؤال تصویری با زمان‌سنج و همان معیار قبولی. قبل از رفتن سر جلسه بدانید چقدر آماده‌اید.' },
  { Art: ArtAi, title: 'هوش مصنوعی، همراه شما', text: 'برای هر سؤال توضیحی ساده به فارسی بگیرید: چرا پاسخ شما درست یا اشتباه بود و چه نکته‌ای را برای دفعه‌ی بعد به خاطر بسپارید.' },
  { Art: ArtProgress, title: 'پیشرفت‌تان را ببینید', text: 'نمودار پیشرفت، احتمال قبولی و تمرین هدفمند همان مباحثی که بیشتر در آن‌ها اشتباه می‌کنید.' },
];
// Flat dark forest green, the colour the server's intro pictures are made on (so they sit in the page seamlessly),
// going only a shade darker at the very bottom.
// Rose: the coral glow of the reference's first screen, a little deeper at the foot, and the app's drawings on it (the
// server's pictures are made on the green).
export const INTRO_BG = (ROSE ? ['#c4545a', '#cd6966', '#b5454f'] : ['#14421c', '#14421c', '#0d3014']) as readonly [string, string, string];
const BG = INTRO_BG;
const BUTTON = '#ffffff', BUTTON_TEXT = ROSE ? '#1f1719' : '#14421c';

// The slide's title on one line: measured once at full size in an invisible, very wide box, then set just small
// enough to fit the width it has (never larger than `size`).
function FitTitle({ text, size }: { text: string; size: number }) {
  const [full, setFull] = useState<{ text: string; w: number } | null>(null);
  const [room, setRoom] = useState(0);
  const w = full && full.text === text ? full.w : 0;
  const fs = w && room ? Math.max(16, Math.min(size, Math.floor(size * room / w * 0.98))) : size;
  return (
    <View onLayout={e => setRoom(e.nativeEvent.layout.width)} style={{ overflow: 'hidden' }}>
      <View pointerEvents="none" style={{ position: 'absolute', opacity: 0, top: 0, right: 0, width: 4000, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <View onLayout={e => setFull({ text, w: e.nativeEvent.layout.width })} style={{ flexShrink: 0, flexGrow: 0 }}>
          <T style={{ fontSize: size, lineHeight: size * 1.45, fontWeight: '800' }}>{text}</T>
        </View>
      </View>
      <T numberOfLines={1} style={{ color: '#fff', fontSize: fs, lineHeight: Math.round(fs * 1.45), fontWeight: '800', opacity: w && room ? 1 : 0 }}>{text}</T>
    </View>
  );
}

// `onTop`: the colour at the top of the screen, for the browser's own bar on the web.
export function Onboarding({ onDone, onTop }: { onDone: () => void; onTop?: (c: string) => void }) {
  const ins = useSafeAreaInsets(), { width, height } = useWindowDimensions();
  const [i, setI] = useState(0);
  const { intro } = useApp();
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
  // The server's picture for this slide: a full scene on the page's dark green, its bottom plain so it melts into it.
  const pic = ROSE ? null : intro[i + 1], top = BG[0];
  useEffect(() => { onTop?.(top); }, [top, onTop]);
  // Every slide's picture is fetched up front, so a new slide never shows the previous picture on its own colour while
  // the next one loads (that was a brief mismatch of the picture's background).
  useEffect(() => {
    const urls = SLIDES.map((_, k) => intro[k + 1] ? `${API_URL}/intro/${k + 1}.png?v=${intro[k + 1]}` : null).filter((u): u is string => !!u);
    if (urls.length) Image.prefetch(urls).catch(() => {});
  }, [intro]);
  // The picture: a tall header across the top, fading into the page (the app's own drawing there until the server's
  // picture is made), the title and line under it.
  const headH = ins.top + Math.min(Math.round(height * 0.56), 540), artH = Math.min(height * 0.42, 340);
  const shift = fade.interpolate({ inputRange: [0, 1], outputRange: [16, 0] });
  return (
    <View style={{ flex: 1 }} {...swipe}>
      <LinearGradient colors={[BG[0], BG[0], BG[2]]} locations={[0, 0.8, 1]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <Animated.View style={{ flex: 1, opacity: fade, transform: [{ translateY: shift }] }}>
        <TallPicture key={i} height={headH} bg={BG[0]} source={pic ? { uri: `${API_URL}/intro/${i + 1}.png?v=${pic}` } : null}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: ins.top }}>
            <View style={{ width: Math.min(width - 40, 380), height: artH }}><Art /></View>
          </View>
        </TallPicture>
        <View style={{ gap: 12, marginTop: -28, paddingHorizontal: 28, width: '100%', maxWidth: 560, alignSelf: 'center' }}>
          <FitTitle text={title} size={30} />
          <T style={{ color: 'rgba(255,255,255,0.86)', fontSize: 16, lineHeight: 28 }}>{text}</T>
        </View>
      </Animated.View>
      <View style={{ paddingBottom: ins.bottom + 20, paddingHorizontal: 28, width: '100%', maxWidth: 560, alignSelf: 'center' }}>
        {/* Skip at the start, the dots in the middle (at the start on the last slide, beside the wider «شروع کنید»), next / start at the end */}
        <View style={{ flexDirection: 'row', alignItems: 'center', height: 54 }}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            {last ? null : (
              <Pressable onPress={() => { tap(); onDone(); }} hitSlop={10} accessibilityRole="button"
                style={ROSE ? { height: 50, paddingHorizontal: 20, borderRadius: 25, borderWidth: 1, borderColor: 'rgba(255,255,255,0.55)', justifyContent: 'center' } : undefined}>
                <T style={{ color: 'rgba(255,255,255,0.9)', fontSize: 16 }}>رد شدن</T>
              </Pressable>
            )}
          </View>
          <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: last ? 'flex-start' : 'center', gap: 8 }}>
            {SLIDES.map((_, k) => (
              <Pressable key={k} onPress={() => go(k)} hitSlop={6} accessibilityLabel={`اسلاید ${k + 1}`}>
                {/* Rose: short dashes, the current one bright, as the reference. */}
                <View style={ROSE ? { width: 22, height: 3, borderRadius: 2, backgroundColor: k === i ? '#fff' : 'rgba(255,255,255,0.4)' }
                  : { width: k === i ? 12 : 7, height: k === i ? 12 : 7, borderRadius: 6, backgroundColor: k === i ? '#fff' : 'rgba(255,255,255,0.55)' }} />
              </Pressable>
            ))}
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Pressable onPress={() => (last ? (tap(), onDone()) : go(i + 1))} accessibilityRole="button"
              style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1, flexDirection: 'row', alignItems: 'center', gap: 6, height: 50, paddingHorizontal: 22, borderRadius: ROSE ? 25 : 12, backgroundColor: BUTTON })}>
              <T style={{ color: BUTTON_TEXT, fontSize: 16, fontWeight: '600' }}>{last ? 'شروع کنید' : 'بعدی'}</T>
              <Icon name="chevronLeft" size={16} color={BUTTON_TEXT} weight="semibold" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
