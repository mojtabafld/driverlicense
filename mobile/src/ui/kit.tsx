// Small building blocks shared by all screens, styled like the web site.
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useNavigation } from 'expo-router';
import { Image } from 'expo-image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions, type StyleProp, type TextProps, type TextStyle, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { RTL, tr, tryTr } from '@/lib/i18n';
import { useUnderBar } from './bar-shade';
import { daFamily, faFamily } from './fonts';
import { Icon, type IconName } from './icon';
import { Glass } from './glass';
import { API_URL, PROVE_PICS } from '@/lib/config';
import { enTerms } from '@/lib/en-terms';
import { useApp, useExamLang } from '@/lib/store';
import { ARC, DA_FONT, UBER, radius, useColors, useTheme } from './theme';

// A style given in physical left/right terms. Phones running right-to-left swap left and right in styles,
// the web does not; this keeps "left" meaning the left edge on both.
export function physical<S extends Record<string, any>>(style: S): S {
  if (Platform.OS === 'web') return style;
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(style)) out[k.replace(/Left|Right|left|right/, w => ({ Left: 'Right', Right: 'Left', left: 'right', right: 'left' } as any)[w])] = v;
  return out as S;
}

// A text alignment given as the physical edge. On phones a right-to-left layout swaps textAlign's left and right (like
// the styles physical() fixes), so there it is given swapped; for text laid out right to left only.
export function physicalAlign<A extends TextStyle['textAlign']>(a: A): A {
  if (Platform.OS === 'web') return a;
  return (a === 'left' ? 'right' : a === 'right' ? 'left' : a) as A;
}

export const tap = () => { if (Platform.OS !== 'web') Haptics.selectionAsync().catch(() => {}); };

// The light motion of Uber Eats between screens, the same on every platform:
// - tab: a page whose tab is chosen comes in with a quick fade and a short rise;
// - push: an inner page (mistakes, account, a past exam) slides in from the side and fades in, and slides back out
//   when left with its back button; the page returned to comes in from the other side;
// - sheet: the exam comes up from the bottom when it starts and goes back down when it is left.
// On phones the native stack already moves pushed pages and the exam, so there only the fade of a tab plays.
export type Motion = 'tab' | 'push' | 'sheet';
let goingBack = false; // set by leave(): the next page shown is the one returned to
// Runs `cb` each time the page comes into view, with `returned` true when it was only covered meanwhile (a page opened
// over it and closed again, by any way back: the back button, a swipe, the browser's or the phone's back) — then the
// page is just there again as it was, nothing replays. For a tab page a switch to another tab is not covering.
function useFocusReturn(cb: (returned: boolean) => void) {
  const nav = useNavigation();
  const covered = useRef(false);
  useFocusEffect(useCallback(() => {
    const returned = covered.current;
    covered.current = false;
    cb(returned);
    const st = nav.getState(), mine = st?.routes[st.index]?.key;
    return () => {
      // Blurred while still here: covered, unless (in the tabs) another tab is now chosen.
      const now = nav.getState();
      covered.current = !!now && (now.type !== 'tab' || now.routes[now.index]?.key === mine);
    };
  }, [cb, nav]));
}

export function usePageMotion(motion: Motion) {
  const [v] = useState(() => new Animated.Value(0));
  const [from, setFrom] = useState<1 | -1>(1);
  const own = motion === 'tab' || Platform.OS === 'web';
  useFocusReturn(useCallback(returned => {
    const back = goingBack; goingBack = false;
    if (!own || returned) { v.stopAnimation(); v.setValue(1); return; }
    setFrom(back ? -1 : 1);
    v.setValue(0);
    Animated.timing(v, { toValue: 1, duration: motion === 'sheet' ? 320 : motion === 'push' ? 200 : 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [v, own, motion]));
  // Play the way out, then go (`then`, e.g. router.back()); on phones the native stack moves the page itself.
  const leave = useCallback((then: () => void) => {
    goingBack = true;
    if (Platform.OS !== 'web' || motion === 'tab') { then(); return; }
    setFrom(1);
    Animated.timing(v, { toValue: 0, duration: motion === 'push' ? 140 : 200, easing: Easing.in(Easing.quad), useNativeDriver: true }).start(() => then());
  }, [v, motion]);
  // Right to left: a new page comes in from the left (and goes back out there), as Persian reads.
  const shift = motion === 'sheet' ? { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [70, 0] }) }
    : motion === 'push' ? { translateX: v.interpolate({ inputRange: [0, 1], outputRange: [-14 * from, 0] }) }   // a light, short glide
    : { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) };
  const style = { flex: 1, opacity: motion === 'sheet' ? v.interpolate({ inputRange: [0, 1], outputRange: [0.4, 1] }) : v, transform: [shift] };
  return { style, leave };
}

// Each part of a page coming in on its own: a fade and a 12px rise (320 ms). Parts that appear together come one after
// another (55 ms apart, at most 8 steps), so a page builds up from the top, as in Uber Eats.
let enterSeq = 0, enterReset: ReturnType<typeof setTimeout> | null = null;
function nextEnterDelay() {
  const d = Math.min(enterSeq, 8) * 55;
  enterSeq++;
  if (enterReset) clearTimeout(enterReset);
  enterReset = setTimeout(() => { enterSeq = 0; }, 120);
  return d;
}
export function useEnter() {
  const [v] = useState(() => new Animated.Value(0));
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: 320, delay: nextEnterDelay(), easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [v]);
  return { opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] };
}
// A part of a page that comes in with useEnter; `style` for its place in the layout (e.g. a width).
export function Enter({ children, style }: { children?: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const anim = useEnter();
  return <Animated.View style={[style, anim] as any}>{children}</Animated.View>;
}

// A tab page's content coming in (see usePageMotion).
export function PageIn({ children, motion = 'tab' }: { children?: React.ReactNode; motion?: Motion }) {
  const { style } = usePageMotion(motion);
  return <Animated.View style={style as any}>{children}</Animated.View>;
}

// Page background: the site's bg colour as a very soft gradient (lighter at the top), in both themes. `anim`: the
// style from usePageMotion, for the page's content.
export function Backdrop({ children, anim }: { children?: React.ReactNode; anim?: object }) {
  const c = useColors();
  return (
    <View style={{ flex: 1, overflow: 'hidden', backgroundColor: c.bg }}>
      <LinearGradient colors={c.bgGradient} locations={[0, 0.45, 1]} start={{ x: 0.2, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFill} />
      {anim ? <Animated.View style={anim as any}>{children}</Animated.View> : children}
    </View>
  );
}

// The site's logo: a rounded navy square with a speedometer.
export function Logo({ size = 28 }: { size?: number }) {
  const c = useColors();
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Rect x={2} y={2} width={28} height={28} rx={9} fill={c.accent} />
      <Path d="M9 20.5c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="#fff" strokeWidth={2.4} fill="none" strokeLinecap="round" />
      <Circle cx={16} cy={20.5} r={2.2} fill="#fff" />
      <Path d="M16 20.5l3.2-3.8" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" />
    </Svg>
  );
}

// Light / dark switch, like the site's moon button in its top bar (sets a fixed mode; «خودکار» is in the settings).
export function ThemeButton() {
  const c = useColors(), { theme, setMode } = useTheme(), dark = theme === 'dark';
  return (
    <Pressable onPress={() => { tap(); setMode(dark ? 'light' : 'dark'); }} hitSlop={8} accessibilityRole="button" accessibilityLabel="تغییر تم"
      style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed ? c.surface2 : 'transparent' })}>
      {dark ? <Icon name="sun" size={20} color={c.text} /> : <Icon name="moon" size={19} color={c.muted} />}
    </Pressable>
  );
}

// Top bar with the TeoriPrøve brand and the theme button, in the page's own background so it reads as one surface.
export function TopBar({ right }: { right?: React.ReactNode }) {
  const c = useColors(), ins = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: ins.top + 6 }}>
      <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, maxWidth: 980, width: '100%', alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, direction: 'ltr' } as ViewStyle}>
          {/* The logo first in the page's reading order: at the outer (right) edge, the name inside it. */}
          {/* uber: «Teori» in the text colour and «Prøve» in the accent, like «Uber Eats» */}
          <Text style={{ fontFamily: DA_FONT, fontSize: 18, color: c.link }}>
            <Text style={{ fontWeight: '700', color: UBER ? c.text : c.link }}>Teori</Text>Prøve
          </Text>
          <Logo />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>{right}<ThemeButton /></View>
      </View>
    </View>
  );
}

// A scroll view that is back at the top whenever its page comes into view (a tab chosen again, a page returned to).
// `given`: the page's own ref to the scroll view, when it has one.
export function useTopOnFocus(given?: React.RefObject<ScrollView | null>) {
  const own = useRef<ScrollView | null>(null);
  // From the top when the page is opened (or its tab chosen), where it was when a page over it is closed.
  useFocusReturn(useCallback(returned => { if (!returned) (given ?? own).current?.scrollTo({ y: 0, animated: false }); }, [given]));
  return given ?? own;
}

// Scrollable tab screen: the page heading (with the theme switch beside it; no app name or logo, so the page has the
// room) and the content; it leaves room for the floating tab bar over the page's end.
// With `fill` its content gets at least the height between the header and the tab bar (so a part set to flex: 1 takes
// what is left), and the screen scrolls only when the content needs more than that (a part's own minimum height, e.g.
// the home page's chart under its picture header on a short screen); `gap` can be set tighter for short screens.
// `scrollRef` / `onScrollY`: the scroll view and where it is scrolled.
// Room for the floating tab bar (src/ui/tabs/app-tabs.tsx: 64 high, above the bottom edge) and a clear gap above it,
// on every platform.
const BAR_ROOM = 64 + 30;

// A page's picture header: a picture made for the page (imagegen.js HERO_PROMPTS) covering the whole header from the top
// edge (under the status bar) to its square bottom, and the title and a line on its calm right side (no buttons on
// it; the theme is chosen in the settings). Until the picture is made, the app's dark green with the page's icon.
// Its lower edge melts into the page in the theme's own background colour, so picture and page read as one; the page's
// content starts below it.
// `light`: the light theme's picture (pic + 3 unless given).
// `art`: a drawing made in the app (vector) in place of the server's picture, laid in the header's left part with the
// header's height; it gets the theme (light) to colour itself.
export type HeroLook = { pic: number; light?: number; icon: IconName; art?: React.ComponentType<{ light: boolean; height: number }> };

// On the web, the colour behind the page and of the browser's / Home Screen app's status bar (theme-color): the
// screen's cover (intro, language question, offline page) if one is up, else a picture header's green while one is in
// view, else the page's own top colour. Set from the app's layout (page colour, cover) and from Hero (its green), each
// keeping the others, so a theme switch on a page with a header does not take the header's green away.
const webTop = { base: '', cover: null as string | null, hero: null as string | null };
function paintWebTop() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  const top = webTop.cover ?? webTop.hero ?? webTop.base; if (!top) return;
  document.body.style.backgroundColor = top;
  let m = document.querySelector('meta[name="theme-color"]');
  if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'theme-color'); document.head.appendChild(m); }
  m.setAttribute('content', top);
}
export function setWebTop(base: string, cover: string | null) { webTop.base = base; webTop.cover = cover; paintWebTop(); }
// The colour at the top of the header pictures: also the phone's status bar over the header (the Home Screen web app
// colours it with theme-color), so the header runs up to the screen's edge.
// In the light theme, a light version of the same picture (number + 3, on a soft light green) with a dark green title,
// once the server has made it; until then the dark one.
// (the main site's in its teal green, from Mojtaba's reference)
const HERO_BG = ARC ? '#1b483d' : '#1b4827', HERO_BG_LIGHT = ARC ? '#d5ece7' : '#d9ecd5', HERO_INK_LIGHT = ARC ? '#144237' : '#14421c';
const HERO_FADE = 110;   // how far up from the header's bottom the picture fades into the page
// The fade's steps: slow at first and at the end (smoothstep), so no edge shows where it begins or ends.
const FADE_STOPS = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1] as const;
const FADE_ALPHA = FADE_STOPS.map(t => Math.round(255 * t * t * (3 - 2 * t)).toString(16).padStart(2, '0'));
// A picture header's foot fading into the page (Hero's, and the sign-in page's).
export function HeroFade() {
  const page = useColors().bgGradient[0];
  return <LinearGradient pointerEvents="none" colors={FADE_ALPHA.map(a => `${page}${a}`) as unknown as readonly [string, string, ...string[]]} locations={FADE_STOPS}
    style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: HERO_FADE }} />;
}
// While a page with a coloured header is in view on the web, the status bar above it in the header's colour; back to the
// page's colour after.
export function useHeaderTop(color: string) {
  useFocusEffect(useCallback(() => {
    webTop.hero = color; paintWebTop();
    return () => { webTop.hero = null; paintWebTop(); };
  }, [color]));
}
// `tall`: about half the screen high (the sign-in page, its form under it), with the theme switch at its top on a soft
// round backing; the title's top stays in one place, so a longer text (signing up) runs further down, not up.
// `lower`: that place this much further down (signing up). `name`: a line under the title (the user's name on the home
// page's greeting).
// `back`: an inner page's back button floats over the header's top right; the title and its line stay at the right
// edge, where a tab's are, set a little lower so they start under the button.
export function Hero({ look, title, name, subtitle, tall, lower = 0, back }: { look: HeroLook; title: string; name?: string; subtitle?: string; tall?: boolean; lower?: number; back?: boolean }) {
  const ins = useSafeAreaInsets(), { heroArt } = useApp(), { width, height } = useWindowDimensions();
  const lightPic = look.light ?? look.pic + 3, light = useTheme().theme !== 'dark' && (!!look.art || !!heroArt[String(lightPic)]);
  const pic = light ? lightPic : look.pic, bg = light ? HERO_BG_LIGHT : HERO_BG, ink = light ? HERO_INK_LIGHT : '#ffffff';
  useHeaderTop(bg);
  const v = heroArt[String(pic)];
  // (tall, narrow: high enough that the room under the sign-in picture's drawing, below, holds the title and its line)
  const H = ins.top + (tall ? Math.max(Math.min(Math.round(height * 0.42), 440), width < 600 ? Math.round(186 + width * 0.36) : 0) : Math.min(Math.round(width * 0.34), 190) + 70);
  const topPad = ins.top + (Platform.OS === 'web' ? 14 : 8);
  // The sign-in picture (square, laid in from its left edge, its height or width filling the header, the other cut evenly)
  // has its objects across most of its width, down to about 68% of its height, with calm ground under them. On a narrow
  // screen the title and line go there, across the width, sized to the screen and to the room left, so they never lie
  // on the drawing; on a wide one its right side is calm and they stay there.
  const side = Math.max(width, H), objEnd = Math.round(side * 0.68 - (side - H) / 2), room = H - objEnd - 10;
  const below = !!tall && room >= 70 && width < H * 1.3;
  const titleSize = Math.max(20, Math.min(30, Math.round(width * 0.075), Math.floor((room - 46) / 1.35)));
  // The title (and name) in the bold cut, above the site's usual 500 cap (src/ui/fonts.ts).
  const bold = { fontFamily: RTL ? 'Vazirmatn-700' : Platform.OS === 'web' ? 'Inter-700, Vazirmatn-700, sans-serif' : 'Inter-700', fontWeight: 'normal' as const };
  const shade = light ? null : { textShadowColor: 'rgba(0,0,0,0.45)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 6 };
  return (
    <View style={{ height: H, backgroundColor: bg, overflow: 'hidden' }}>
      {look.art ? (
        // (left to right in its own row, so the drawing stays on the left on every platform)
        <View pointerEvents="none" style={[StyleSheet.absoluteFill, { flexDirection: 'row', direction: 'ltr', justifyContent: RTL ? 'flex-start' : 'flex-end', paddingTop: ins.top } as any]}>
          <look.art light={light} height={H - ins.top} />
        </View>
      ) : v ? <Image source={{ uri: `${API_URL}/hero-art/${pic}.png?v=${v}` }} contentFit="cover" contentPosition="left" transition={300} style={StyleSheet.absoluteFill} accessibilityIgnoresInvertColors />
        : <View style={[StyleSheet.absoluteFill, { alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 40, paddingTop: ins.top }]}>
            <Icon name={look.icon} size={96} color="rgba(255,255,255,0.22)" />
          </View>}
      <HeroFade />
      <View style={{ flex: 1, paddingTop: topPad, paddingBottom: name ? 88 : back ? 82 : 100, paddingHorizontal: 16, maxWidth: 980, width: '100%', alignSelf: 'center', justifyContent: tall ? 'flex-start' : 'flex-end' }}>
        {tall ? (
          <>
            <View style={{ alignSelf: 'flex-end', borderRadius: 19, backgroundColor: light ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.25)' }}>
              <ThemeButton />
            </View>
            {/* Down to where a title and a two-line line, set on the header's foot (100 above its end), would begin. */}
            {below ? null : <View style={{ height: Math.max(0, H - 100 - 82 - topPad - 38 + lower) }} />}
          </>
        ) : null}
        {below ? null : <View style={{ gap: 2, maxWidth: '58%', ...(back ? { minWidth: '58%', [RTL ? 'paddingRight' : 'paddingLeft']: 52 } : null) }}>
          <FitLine size={26} min={12} style={[{ lineHeight: 36, fontWeight: '700', color: ink }, bold, shade]}>{title}</FitLine>
          {name ? <T style={[{ fontSize: 22, lineHeight: 30, fontWeight: '700', color: ink, opacity: 0.95 }, bold, shade]} numberOfLines={1}>{name}</T> : null}
          {subtitle ? <T style={[{ color: ink, opacity: 0.9, fontSize: 14, lineHeight: 22 }, shade]}>{subtitle}</T> : null}
        </View>}
      </View>
      {below ? (
        <View style={{ position: 'absolute', top: objEnd, left: 0, right: 0, paddingHorizontal: 16, gap: 2, maxWidth: 980, width: '100%', alignSelf: 'center' }}>
          <FitLine size={titleSize} min={16} style={[{ lineHeight: Math.round(titleSize * 1.35), fontWeight: '700', color: ink }, bold, shade]}>{title}</FitLine>
          {subtitle ? <T style={[{ color: ink, opacity: 0.9, fontSize: width < 360 ? 13 : 14, lineHeight: width < 360 ? 20 : 22 }, shade]}>{subtitle}</T> : null}
        </View>
      ) : null}
    </View>
  );
}

// `barGap`: with `fill`, the room left between the content's end and the top of the tab bar (30 unless given; the home
// page's chart ends just above the bar).
export function Screen({ title, name, subtitle, children, right, fill, gap = 14, scrollRef, onScrollY, hero, barGap }: { title: string; name?: string; subtitle?: string; children: React.ReactNode; right?: React.ReactNode; fill?: boolean; gap?: number; barGap?: number;
  scrollRef?: React.RefObject<ScrollView | null>; onScrollY?: (y: number) => void; hero?: HeroLook }) {
  const c = useColors(), ins = useSafeAreaInsets();
  const ref = useTopOnFocus(scrollRef);
  const box = { paddingTop: hero ? 6 : ins.top + (Platform.OS === 'web' ? 18 : 10), paddingHorizontal: 16, gap, maxWidth: 980, width: '100%', alignSelf: 'center' } as const;
  const top = hero ? <Hero look={hero} title={title} name={name} subtitle={subtitle} /> : null;
  const head = hero ? null : (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 2 }}>
      <View style={{ flex: 1 }}>
        <FitLine size={26} min={16} style={{ lineHeight: 34, fontWeight: '700', color: c.text }}>{title}</FitLine>
        {subtitle ? <T style={{ color: c.muted, fontSize: 14, lineHeight: 22 }}>{subtitle}</T> : null}
      </View>
      {right}
      <ThemeButton />
    </View>
  );
  return (
    <Backdrop>
      <PageIn>
      <View style={{ flex: 1 }}>
      {fill
        ? <ScrollView ref={ref} contentInsetAdjustmentBehavior="never" showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
            {top}<View style={[box, { flex: 1, paddingBottom: (barGap != null ? 64 + barGap : BAR_ROOM) + Math.max(16, ins.bottom) }]}>{head}{children}</View>
          </ScrollView>
        : <ScrollView ref={ref} onScroll={onScrollY ? e => onScrollY(e.nativeEvent.contentOffset.y) : undefined} scrollEventThrottle={32} contentInsetAdjustmentBehavior="never" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: BAR_ROOM + Math.max(16, ins.bottom) + 6 }}>
            {top}<View style={box}>{head}{children}</View>
          </ScrollView>}
      </View>
      </PageIn>
    </Backdrop>
  );
}

// Persian text (right to left).
// Set in Vazirmatn; the weight picks the font file, so fontWeight itself is reset (no faux bold).
// On the main site, with the exam in English, the Danish terms in a Persian text are given in English (lib/en-terms.ts).
const enKids = (k: React.ReactNode): React.ReactNode => (typeof k === 'string' ? enTerms(k) : Array.isArray(k) ? k.map(enKids) : k);
// In English or Danish, the text in that language (lib/i18n.ts): a text given in parts (JSX «درس {n}») as one.
const trKids = (k: React.ReactNode): React.ReactNode => (typeof k === 'string' ? tr(k)
  : Array.isArray(k) ? (k.every(x => typeof x === 'string' || typeof x === 'number') ? tryTr(k.join('')) ?? k.map(trKids) : k.map(trKids)) : k);
const swapAlign = (a: TextStyle['textAlign']) => (a === 'left' ? 'right' : a === 'right' ? 'left' : a);
export function T({ style, raw, ...p }: TextProps & { style?: StyleProp<TextStyle>; raw?: boolean }) {
  const c = useColors(), en = useExamLang() === 'en' && !PROVE_PICS;
  if (!RTL && !raw) p = { ...p, children: trKids(p.children) };
  if (en) p = { ...p, children: enKids(p.children) };
  const flat = StyleSheet.flatten(style) ?? {};
  if (!RTL) {
    // English / Danish: left to right in the Latin font, the alignment the mirror of the Persian one (its start edge).
    const { family } = daFamily(flat.fontWeight);
    const font = flat.fontFamily ? null : { fontFamily: Platform.OS === 'web' ? `${family}, Vazirmatn-400, sans-serif` : family, fontWeight: 'normal' as const };
    const side = { writingDirection: 'ltr' as const, textAlign: flat.writingDirection === 'ltr' ? flat.textAlign ?? 'left' : swapAlign(flat.textAlign ?? 'right'), ...(Platform.OS === 'web' ? null : { direction: 'ltr' as const }) };
    return <Text {...p} style={[{ color: c.text, fontSize: 15, lineHeight: 24 }, style, font, side]} />;
  }
  const font = flat.fontFamily ? null : { fontFamily: faFamily(flat.fontWeight), fontWeight: 'normal' as const };
  // On phones the text is laid out right to left wherever it sits (also in a row set to 'ltr'), so its alignment,
  // the physical edge as on the web, is always swapped the same way. Text asking for writingDirection 'ltr' (counts
  // like «۱ / ۲۵», the clock, Danish words) is laid out left to right instead, so it reads in its own order there too,
  // and its alignment is the edge it names.
  const ltr = flat.writingDirection === 'ltr';
  const side = Platform.OS === 'web' ? null
    : ltr ? { direction: 'ltr' as const } : { direction: 'rtl' as const, textAlign: physicalAlign(flat.textAlign ?? 'right') };
  return <Text {...p} style={[{ color: c.text, fontSize: 15, lineHeight: 24, writingDirection: 'rtl', textAlign: 'right' }, style, font, side]} />;
}
// A label kept on one line in every language (Mojtaba, 2026-10-15): measured once at `size` in a hidden, very wide
// box, then set just small enough to fit the width it has (never below `min`).
export function FitLine({ children, size, min = 9, style }: { children: string; size: number; min?: number; style?: StyleProp<TextStyle> }) {
  const [full, setFull] = useState<{ text: string; w: number } | null>(null);
  const [room, setRoom] = useState(0);
  const w = full && full.text === children ? full.w : 0;
  const fs = w && room ? Math.max(min, Math.min(size, Math.floor(size * room / w * 0.97 * 10) / 10)) : size;
  return (
    <View onLayout={e => setRoom(e.nativeEvent.layout.width)} style={{ alignSelf: 'stretch', overflow: 'hidden' }}>
      <View pointerEvents="none" style={{ position: 'absolute', opacity: 0, top: 0, left: 0, width: 4000, flexDirection: 'row' }}>
        <View onLayout={e => setFull({ text: children, w: e.nativeEvent.layout.width })} style={{ flexShrink: 0, flexGrow: 0 }}>
          <T numberOfLines={1} style={[style, { fontSize: size }]}>{children}</T>
        </View>
      </View>
      <T numberOfLines={1} style={[style, { fontSize: fs, opacity: w && room ? 1 : 0 }]}>{children}</T>
    </View>
  );
}
// Danish / English text (left to right).
// In the Latin font (src/ui/fonts.ts), its weight (and italic) picked by family as for T; on the web Vazirmatn follows
// for the Persian digits.
export function L({ style, ...p }: TextProps & { style?: StyleProp<TextStyle> }) {
  const c = useColors();
  const flat = StyleSheet.flatten(style) ?? {};
  const { family, slant } = daFamily(flat.fontWeight, flat.fontStyle === 'italic');
  const font = { fontFamily: Platform.OS === 'web' ? `${family}, Vazirmatn-400, sans-serif` : family, fontWeight: 'normal' as const, fontStyle: slant ? 'italic' as const : 'normal' as const };
  // Laid out left to right on phones too, so its alignment is the physical edge as given.
  const side = Platform.OS === 'web' ? null : { direction: 'ltr' as const };
  return <Text {...p} style={[{ color: c.text, fontSize: 16, lineHeight: 24, writingDirection: 'ltr', textAlign: 'left' }, style, font, side]} />;
}

// The translation switch under a question's picture, the same in the exam and in the review: a round button with the
// translate icon, grey while off and filled while the Persian translation shows.
export function TranslateButton({ on, onPress }: { on: boolean; onPress: () => void }) {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} hitSlop={6} accessibilityRole="button" accessibilityState={{ selected: on }}
      accessibilityLabel={tr(on ? 'پنهان کردن ترجمه' : 'نمایش ترجمه')}
      style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.8 : 1,
        backgroundColor: on ? c.strong : c.nav })}>
      <Icon name="translate" size={19} color={on ? c.strongFg : c.navFg} />
    </Pressable>
  );
}

// The site's .card.
// A tappable card hands its own size (flex, width, alignSelf) to the touch area around it and fills that, so cards
// side by side in a row keep the sizes they ask for.
// Cards come in with useEnter; their place in the layout (flex, width, margins) stays on the outer box.
export function Card({ children, style, onPress }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  const anim = useEnter();
  const { flex, flexGrow, flexShrink, flexBasis, width, alignSelf, margin, marginTop, marginBottom, marginHorizontal, marginVertical, ...rest } = StyleSheet.flatten(style) ?? {};
  const outer = { flex, flexGrow, flexShrink, flexBasis, width, alignSelf, margin, marginTop, marginBottom, marginHorizontal, marginVertical };
  // Grows to the size the card is given; flexGrow, not flex: 1, so that inside a box of no set height (a row of cards)
  // phones keep the content's own height instead of collapsing it to nothing.
  const fill = flex != null || flexGrow != null ? { flexGrow: 1 } : null;
  return (
    <Animated.View style={[outer, anim] as any}>
      {onPress ? (
        <Pressable onPress={() => { tap(); onPress(); }} style={({ pressed }) => [fill, pressed && { opacity: 0.9, transform: [{ scale: 0.985 }] }]}>
          <Glass style={[{ padding: 16 }, rest, fill]}>{children}</Glass>
        </Pressable>
      ) : <Glass style={[{ padding: 16 }, rest, fill]}>{children}</Glass>}
    </Animated.View>
  );
}

// The site's .btn-primary (navy) and .btn-ghost (surface with a line border); danger is a ghost in red.
type BtnProps = { label: string; onPress: () => void; kind?: 'primary' | 'glass' | 'danger' | 'grey'; disabled?: boolean; style?: StyleProp<ViewStyle>; icon?: IconName; big?: boolean };
// Every button carries a flat icon before its label, in the label's colour.
export function Button({ label, onPress, kind = 'primary', disabled, style, icon, big }: BtnProps) {
  const c = useColors();
  // grey: the main flat button (ActionButton). In the Uber look every main button is that one and outlined ones take
  // the text colour, so no button is green.
  const grey = kind === 'grey' || (UBER && kind === 'primary'), primary = kind === 'primary' && !grey;
  if (grey) return <ActionButton label={label} onPress={onPress} icon={icon} disabled={disabled} style={style} />;
  const fg = primary ? c.accentText : kind === 'danger' ? c.bad : UBER ? c.text : c.link;
  return (
    <Pressable disabled={disabled} onPress={() => { tap(); onPress(); }} style={({ pressed }) => [{ opacity: disabled ? 0.45 : pressed ? 0.9 : 1, transform: [{ scale: pressed && !disabled ? 0.98 : 1 }] }, style]}>
      <View style={{
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
        paddingVertical: big ? 14 : 11, paddingHorizontal: 20, minHeight: big ? 50 : undefined, borderRadius: big ? radius.field : radius.btn,
        backgroundColor: primary ? c.accent : c.surface, borderWidth: primary ? 0 : 1.5, borderColor: kind === 'danger' ? c.badSoft : c.line,
      }}>
        {icon ? <Icon name={icon} size={18} color={fg} weight="semibold" /> : null}<T style={{ color: fg, fontWeight: '600', fontSize: 15, lineHeight: 22, textAlign: 'center' }}>{label}</T>
      </View>
    </Pressable>
  );
}

// The flat, minimal action button, like a «Confirm order» button: a solid fill, no border, sheen or shadow, 54 tall
// with corners rounded 12. main: `btn` (soft light grey with black text in dark mode, near-black with white text in
// light mode); soft: the grey of the secondary buttons (cancel, back to the exam); danger: red with white text.
// Start exam, sign in, hand in and the dialogs' buttons all use it.
export function ActionButton({ label, onPress, icon, tone = 'main', disabled, style, iconWeight = 'semibold' }: {
  label: string; onPress: () => void; icon?: IconName; tone?: 'main' | 'soft' | 'danger'; disabled?: boolean; style?: StyleProp<ViewStyle>; iconWeight?: 'semibold' | 'bold';
}) {
  const c = useColors();
  const bg = tone === 'main' ? c.btn : tone === 'danger' ? c.bad : c.nav, fg = tone === 'main' ? c.btnFg : tone === 'danger' ? '#ffffff' : c.navFg;
  return (
    <Pressable disabled={disabled} onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityState={{ disabled }}
      style={({ pressed }) => [{ opacity: disabled ? 0.45 : pressed ? 0.85 : 1 }, style]}>
      <View style={{ height: ARC ? 50 : 54, borderRadius: ARC ? radius.btn : 12, paddingHorizontal: 16, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: bg }}>
        {icon ? <Icon name={icon} size={18} color={fg} weight={iconWeight} /> : null}
        <T numberOfLines={1} style={{ fontSize: 16, lineHeight: 24, fontWeight: '600', color: fg, textAlign: 'center' }}>{label}</T>
      </View>
    </Pressable>
  );
}

// Arc's Button (uiarc.dev/r/button.json), size lg, ported: primary in the theme's `cta`, a deep green like the page
// headers with white text (the owner's choice over Arc's black and its bright green), secondary the card surface on a 1px border; 50 tall, corners 18, label
// in weight 500 with a 20px icon beside it. A press springs the button down to 0.985 (0.97 when it is narrower than
// 220) and dims a primary to 0.84 / fills a secondary with the muted grey; with a mouse, hover lifts a primary with a
// resting shadow at 0.91. Main site only: the home page's next lesson and the exam tab's start button.
// `big`: taller, with a larger label (the sign-in page's one wide button).
export function ArcButton({ label, onPress, icon, variant = 'primary', disabled, style, big }: {
  label: string; onPress: () => void; icon?: IconName; variant?: 'primary' | 'secondary'; disabled?: boolean; style?: StyleProp<ViewStyle>; big?: boolean;
}) {
  const c = useColors();
  const [scale] = useState(() => new Animated.Value(1));
  const width = useRef(0);
  const spring = (to: number) => Animated.spring(scale, { toValue: to, useNativeDriver: Platform.OS !== 'web', stiffness: 520, damping: 34, mass: 1 }).start();
  const primary = variant === 'primary', fg = primary ? c.ctaFg : c.text;
  const under = useUnderBar(); // the deep green: the floating bar turns dark over it (ui/bar-shade.tsx)
  // A new label rises about 4px out of a soft blur, as Arc's button swaps its text (the exam's count, for one).
  const [enter] = useState(() => new Animated.Value(1));
  const first = useRef(true);
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    enter.setValue(0);
    Animated.timing(enter, { toValue: 1, duration: 220, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }).start();
  }, [label, enter]);
  const labelIn = { opacity: enter, transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [4, 0] }) }],
    ...(Platform.OS === 'web' ? { filter: enter.interpolate({ inputRange: [0, 1], outputRange: ['blur(2px)', 'blur(0px)'] }) } : {}) };
  return (
    <Pressable ref={primary ? under : undefined} disabled={disabled} onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityState={{ disabled }}
      onLayout={e => { width.current = e.nativeEvent.layout.width; }}
      onPressIn={() => spring(width.current > 220 ? 0.985 : 0.97)} onPressOut={() => spring(1)} style={style}>
      {({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => (
        <Animated.View style={{
          minHeight: big ? 56 : 50, borderRadius: big ? 16 : radius.btn, borderWidth: 1, paddingHorizontal: 20, flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center',
          borderColor: primary ? c.cta : c.line,
          backgroundColor: primary ? c.cta : pressed || hovered ? c.surface2 : c.surface,
          opacity: disabled ? (big ? 0.72 : 0.52) : primary && pressed ? 0.84 : primary && hovered ? 0.91 : 1,
          transform: [{ scale }],
          ...(hovered && !disabled ? { boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)' } : {}),
          ...(Platform.OS === 'web' ? { transitionProperty: 'background-color, opacity, box-shadow', transitionDuration: '150ms' } as any : {}),
        }}>
          {icon ? <Icon name={icon} size={20} color={fg} /> : null}
          <Animated.View style={labelIn as any}>
            <T numberOfLines={1} style={{ fontSize: big ? 16.5 : 15, lineHeight: big ? 24 : 22, fontWeight: '500', color: fg, textAlign: 'center' }}>{label}</T>
          </Animated.View>
        </Animated.View>
      )}
    </Pressable>
  );
}

// Arc's segmented control, shared by every switch of two or three parts (Segmented, the review's tabs and «پاسخ شما /
// پاسخ صحیح», sign in / sign up): a pill track and the chosen part a raised pill on it, its label in the text colour.
export function useArcSeg() {
  const c = useColors(), dark = useTheme().theme === 'dark';
  return {
    track: { padding: 3, gap: 3, borderRadius: radius.pill, backgroundColor: c.nav } as ViewStyle,
    // The part itself stays clear: the raised pill is SegPill, a layer under its label that is always there and only
    // fades in and out. On Android a part whose own background and shadow came and went lost its round corners.
    pill: (_on: boolean) => ({ borderRadius: radius.pill, backgroundColor: 'transparent' }) as ViewStyle,
    raised: { borderRadius: radius.pill, backgroundColor: dark ? '#3d3d3d' : c.surface,
      boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.06)' } as ViewStyle,
    label: (on: boolean) => ({ color: on ? c.text : c.muted, fontWeight: '500' }) as TextStyle,
  };
}

// The chosen part's raised pill (useArcSeg), the first child of each part: shown on the chosen one, clear on the others.
export function SegPill({ on }: { on: boolean }) {
  const seg = useArcSeg();
  return <View pointerEvents="none" style={[StyleSheet.absoluteFill, seg.raised, { opacity: on ? 1 : 0 }]} />;
}

// The site's .tabs: grey track, the chosen one is a white tab with navy text.
// `raw`: a label shown as it is, never translated (a language's own name).
export function Segmented<V extends string>({ value, options, onChange }: { value: V; options: { value: V; label: string; raw?: boolean }[]; onChange: (v: V) => void }) {
  const c = useColors(), seg = useArcSeg();
  return (
    <View style={[{ flexDirection: 'row', padding: 3, gap: 3, borderRadius: radius.sm, backgroundColor: c.surface2 }, ARC && seg.track]}>
      {options.map(o => {
        const on = o.value === value;
        return (
          <Pressable key={o.value} onPress={() => { tap(); onChange(o.value); }} style={{ flex: 1 }}>
            <View style={[{ paddingVertical: 7, borderRadius: 6, backgroundColor: on ? c.surface : 'transparent' }, ARC && seg.pill(on)]}>
              {ARC ? <SegPill on={on} /> : null}
              <T style={[{ textAlign: 'center', fontSize: 14, fontWeight: '600', color: on ? (UBER ? c.text : c.link) : c.muted }, ARC && seg.label(on), o.raw ? { fontFamily: 'Vazirmatn-500', writingDirection: 'rtl' } : null]} raw={o.raw}>{o.label}</T>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

// Percent ring.
// A number easing from 0 to `target` (and on to a new target from where it is), about 0.9 s, slowing at the end: the
// home page's chance ring and its percent count up, and the lessons bar fills, when the app opens.
export function useCountUp(target: number, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0; const from = v, t0 = Date.now();
    const step = () => {
      const k = Math.min(1, (Date.now() - t0) / ms), e = 1 - Math.pow(1 - k, 3);
      setV(from + (target - from) * e);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, ms]);
  return v;
}

// `format`: the label from the ring's value as it fills (so the number counts up with it); else the fixed `label`.
export function Ring({ value, size = 76, stroke = 8, color, label, format }: { value: number; size?: number; stroke?: number; color?: string; label?: string; format?: (v: number) => string }) {
  const c = useColors(), r = (size - stroke) / 2, C = 2 * Math.PI * r;
  const shown = useCountUp(Math.max(0, Math.min(1, value)), 1800);
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={[StyleSheet.absoluteFill, { transform: [{ rotate: '-90deg' }] }]}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={c.line} strokeWidth={stroke} fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={color ?? c.accent} strokeWidth={stroke} fill="none" strokeLinecap="round"
          strokeDasharray={`${C} ${C}`} strokeDashoffset={C * (1 - shown)} />
      </Svg>
      <T style={{ fontWeight: '700', fontSize: size / 4.6, textAlign: 'center' }}>{format ? format(shown) : label}</T>
    </View>
  );
}

// Arc's skeleton: a muted block in the final layout while its content loads, with a soft pulse (Arc: a skeleton, not a
// page spinner). `w` / `h` / `r`: its size and corner.
export function Skeleton({ w = '100%', h = 14, r = radius.pill, style }: { w?: ViewStyle['width']; h?: number; r?: number; style?: StyleProp<ViewStyle> }) {
  const c = useColors(), dark = useTheme().theme === 'dark';
  const [pulse] = useState(() => new Animated.Value(0.6));
  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0.6, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
    ]));
    loop.start(); return () => loop.stop();
  }, [pulse]);
  return <Animated.View style={[{ width: w, height: h, borderRadius: r, backgroundColor: dark ? c.surface2 : c.nav, opacity: pulse }, style]} />;
}

// The app's first load (fonts, the account, the question bank) as Arc's skeleton of a tab page: the header, a large
// card and a row of three, so the page that follows takes the same places. (flex-start: the start of the line, the
// right edge in the app's right-to-left layout.)
export function PageSkeleton() {
  const c = useColors(), ins = useSafeAreaInsets();
  const card = { borderRadius: radius.md, borderWidth: 1, borderColor: c.cardBorder, padding: 16, gap: 12 } as const;
  return (
    <View style={{ flex: 1, backgroundColor: c.bg }} accessibilityRole="progressbar" accessibilityLabel="در حال بارگذاری">
      <View style={{ paddingTop: ins.top + 24, paddingHorizontal: 16, gap: 14, maxWidth: 980, width: '100%', alignSelf: 'center' }}>
        <View style={{ alignItems: 'flex-start', gap: 10, paddingVertical: 24 }}>
          <Skeleton w="45%" h={26} r={radius.sm} />
          <Skeleton w="62%" h={14} />
        </View>
        <View style={card}>
          <Skeleton w="38%" h={18} r={radius.sm} style={{ alignSelf: 'flex-start' }} />
          <Skeleton h={12} /><Skeleton w="80%" h={12} style={{ alignSelf: 'flex-start' }} />
          <Skeleton h={50} r={radius.btn} style={{ marginTop: 6 }} />
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {[0, 1, 2].map(k => <View key={k} style={[card, { flex: 1, height: 96 }]}><Skeleton w="60%" h={14} style={{ alignSelf: 'flex-start' }} /><Skeleton w="35%" h={20} r={radius.sm} style={{ alignSelf: 'flex-start' }} /></View>)}
        </View>
      </View>
    </View>
  );
}

// Arc's empty state: what is missing, why, and the one thing to do next, centred, with a plain icon (no tile) over it.
export function EmptyState({ icon, title, text, action }: { icon: IconName; title: string; text?: string; action?: { label: string; onPress: () => void; icon?: IconName } }) {
  const c = useColors();
  return (
    <View style={{ alignItems: 'center', gap: 6, paddingVertical: 28, paddingHorizontal: 20, borderRadius: radius.md, borderWidth: 1, borderColor: c.cardBorder, backgroundColor: c.surface }}>
      <Icon name={icon} size={28} color={c.muted} />
      <T style={{ fontSize: 16, lineHeight: 26, fontWeight: '500', textAlign: 'center', marginTop: 6 }}>{title}</T>
      {text ? <T style={{ fontSize: 13.5, lineHeight: 22, color: c.muted, textAlign: 'center', maxWidth: 360 }}>{text}</T> : null}
      {action ? <Button kind="glass" label={action.label} icon={action.icon} onPress={action.onPress} style={{ marginTop: 10 }} /> : null}
    </View>
  );
}
