// The sign-in page after someone signed out on this device (Mojtaba 2026-10-20, after the Saphe app's): a warm photo
// of a driving lesson across the top (made by the server's image model, imagegen.js LOGIN_BACK, /login-art/3.png; a warm
// wash until it is there) with the app's lines over it and its name at its foot, fading into the page; then «خوش
// برگشتید» and the account signed out last (lib/prefs LastUser) on a card with its profile picture, name and email; a
// tap on it asks only for the password. «شما نیستید؟» forgets the account and shows the welcome screen.
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Platform, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { API_URL } from '@/lib/config';
import type { LastUser } from '@/lib/prefs';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { L, T, tap, useHeaderTop } from './kit';
import { useColors, useIsDark } from './theme';

const PEACH = '#f2b48c'; // the lines' warm accent, as the reference's
// The photo's top edge (its car's roof lining) until it is read from the photo itself, and the warm wash's top.
const PHOTO_TOP = '#38302a', WASH_TOP = '#b5643a';

// The colour of a picture's top edge (the average of its top rows), read on the web from the picture (same site);
// null where it cannot be read.
function useTopColour(uri: string | null) {
  const [top, setTop] = useState<string | null>(null);
  useEffect(() => {
    if (!uri || Platform.OS !== 'web' || typeof document === 'undefined') return;
    const im = new window.Image();
    im.crossOrigin = 'anonymous';
    im.onload = () => {
      try {
        const cv = document.createElement('canvas'), w = 64, h = 4;
        cv.width = w; cv.height = h;
        const g = cv.getContext('2d'); if (!g) return;
        g.drawImage(im, 0, 0, im.naturalWidth, Math.max(1, Math.round(im.naturalHeight * 0.01)), 0, 0, w, h);
        const d = g.getImageData(0, 0, w, h).data;
        let r = 0, gg = 0, b = 0;
        for (let i = 0; i < d.length; i += 4) { r += d[i]; gg += d[i + 1]; b += d[i + 2]; }
        const n = d.length / 4, hex = (v: number) => Math.round(v / n).toString(16).padStart(2, '0');
        setTop(`#${hex(r)}${hex(gg)}${hex(b)}`);
      } catch {}
    };
    im.src = uri;
  }, [uri]);
  return top;
}

function Face({ u, size }: { u: LastUser; size: number }) {
  const c = useColors();
  const { avatarArt } = useApp();
  const uri = u.photo ?? (u.preset && avatarArt[u.preset] ? `${API_URL}/avatar-art/${u.preset}.png?v=${avatarArt[u.preset]}` : null);
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface }}>
      {uri ? <Image source={{ uri }} style={{ width: size, height: size }} contentFit="cover" transition={150} /> : <Icon name="person" size={size * 0.48} color={c.text} />}
    </View>
  );
}

export function WelcomeBack({ last, onPick, onNotYou }: { last: LastUser; onPick: () => void; onNotYou: () => void }) {
  const c = useColors(), dark = useIsDark(), ins = useSafeAreaInsets(), { width, height } = useWindowDimensions();
  const { loginArt } = useApp();
  const H = Math.round(Math.min(height * 0.52, width * 1.35, 560));
  // The light theme's own bright photo (4) once it is made, its foot fading into the light page as the dark one's (3)
  // into the black page; until then the dark photo, ending as a card's foot (`card`).
  const n = !dark && loginArt['4'] ? '4' : '3', v = loginArt[n], card = !dark && n === '3';
  const uri = v ? `${API_URL}/login-art/${n}.png?v=${v}` : null;
  // The top of the screen (the phone's status bar on the web, the page behind the app) in the photo's own top colour,
  // so the photo runs up to the screen's edge in one piece (Mojtaba 2026-10-20).
  const read = useTopColour(uri), top = uri ? read ?? PHOTO_TOP : WASH_TOP;
  useHeaderTop(top);
  const line = { color: '#fff', fontSize: 20, lineHeight: 30, fontWeight: '700' as const, textAlign: 'center' as const };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: ins.bottom + 20 }} showsVerticalScrollIndicator={false}>
      {/* The photo's foot fades into the page. A dark photo fading into the light page turned muddy grey (Mojtaba
          2026-10-20), so in the light theme, until its own bright photo is there, it ends as a card's foot, rounded, with
          a soft shadow, its foot only darkened under «Teoripro». */}
      <View style={[{ height: H }, !card ? { overflow: 'hidden' } : { borderBottomLeftRadius: 32, borderBottomRightRadius: 32, backgroundColor: PHOTO_TOP,
        shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 6 }]}>
      <View style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }, card ? { borderBottomLeftRadius: 32, borderBottomRightRadius: 32 } : null]}>
        {/* Its top kept when the screen cuts it, so the heads show in full (Mojtaba 2026-10-20). */}
        {uri ? <Image source={{ uri }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} contentFit="cover" contentPosition="top" transition={250} />
          : <LinearGradient colors={['#b5643a', '#5b3a2c', '#1d2433']} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />}
        {/* Its top edge melting into the strip above it (the status bar, in the same colour). */}
        <LinearGradient pointerEvents="none" colors={[top, `${top}00`]} style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 28 }} />
        <LinearGradient pointerEvents="none" colors={card ? ['transparent', 'rgba(12,10,9,0.55)'] : [`${c.bg}00`, c.bg]} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: Math.round(H * (card ? 0.32 : dark ? 0.28 : 0.34)) }} />
        {/* The app's two lines on a soft dark glass in the middle, its accent word in peach. */}
        <View style={{ position: 'absolute', top: H * 0.38, left: 0, right: 0, alignItems: 'center', paddingHorizontal: 24 }}>
          <View style={{ paddingVertical: 14, paddingHorizontal: 22, borderRadius: 26, backgroundColor: 'rgba(20,16,14,0.42)', alignItems: 'center' }}>
            <T style={line}>آماده‌ی آزمون تئوری.</T>
            <T style={line}><T style={[line, { color: PEACH }]}>مطمئن</T>{' '}<T style={line}>پشت فرمان.</T></T>
          </View>
        </View>
        <View style={{ position: 'absolute', bottom: Math.round(H * 0.1), left: 0, right: 0, alignItems: 'center' }}>
          {/* The logo as on the welcome screen (ui/welcome.tsx; Mojtaba 2026-10-23): «Teori» large, white (dark on the bright
              photo's light foot), «pro» upright on a pill of the theme's colour. */}
          <View accessible accessibilityRole="header" accessibilityLabel="Teoripro" style={{ flexDirection: 'row', direction: 'ltr', alignItems: 'center', gap: 5 } as any}>
            <L style={{ fontSize: 30, lineHeight: 38, fontWeight: '800', letterSpacing: -1.1, color: n === '4' ? c.text : '#fff' }}>Teori</L>
            <View style={{ backgroundColor: c.accent, borderRadius: 10, paddingHorizontal: 8, paddingTop: 1, paddingBottom: 2, marginTop: 3 }}>
              <L style={{ fontSize: 22, lineHeight: 28, fontWeight: '800', letterSpacing: -0.4, color: c.accentText }}>pro</L>
            </View>
          </View>
        </View>
      </View>
      </View>
      <View style={{ flex: 1, width: '100%', maxWidth: 440, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 22, gap: 22 }}>
        <T style={{ fontSize: 28, lineHeight: 40, fontWeight: '800', textAlign: 'center' }}>خوش برگشتید</T>
        <Pressable onPress={() => { tap(); onPick(); }} accessibilityRole="button" accessibilityLabel={last.name}
          style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 26,
            backgroundColor: dark ? c.surface2 : c.surface, borderWidth: dark ? 0 : 1, borderColor: c.line, opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}>
          <Face u={last} size={52} />
          <View style={{ flex: 1, gap: 2 }}>
            <T raw keepDa numberOfLines={1} style={{ fontSize: 18, lineHeight: 26, fontWeight: '700' }}>{last.name}</T>
            <L numberOfLines={1} style={{ fontSize: 14, lineHeight: 20, color: c.muted, alignSelf: 'flex-start' }}>{last.id}</L>
          </View>
          <Icon name="chevronLeft" size={18} color={c.muted} weight="semibold" />
        </Pressable>
        <T style={{ fontSize: 15, lineHeight: 25, color: c.muted, textAlign: 'center' }}>به نظر می‌رسد قبلاً حساب Teoripro دارید. برای ورود دوباره روی نام‌تان بزنید.</T>
        <View style={{ flex: 1, minHeight: 20 }} />
        <Pressable onPress={() => { tap(); onNotYou(); }} accessibilityRole="button" hitSlop={8} style={{ alignSelf: 'center', paddingVertical: 8 }}>
          {({ hovered }: { pressed: boolean; hovered?: boolean }) => <T style={{ fontSize: 16, fontWeight: '500', textDecorationLine: hovered ? 'underline' : 'none' }}>شما نیستید؟</T>}
        </Pressable>
      </View>
    </ScrollView>
  );
}
