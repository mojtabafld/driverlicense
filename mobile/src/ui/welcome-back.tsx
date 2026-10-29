// The sign-in page after someone signed out on this device (Mojtaba 2026-10-20; the night look of the welcome screen
// since 2026-10-24, ui/welcome.tsx, its day look on a phone in the light mode): on the night-blue (or light) page, the app's name and
// its symbol on a glowing tile in the default theme's accent, then «خوش برگشتید» and the account signed out last
// (lib/prefs LastUser) on a glass card with its profile picture, name and email; a tap on it asks only for the
// password. «شما نیستید؟» forgets the account and shows the welcome screen.
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Platform, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { API_URL } from '@/lib/config';
import type { LastUser } from '@/lib/prefs';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { L, T, tap, useHeaderTop } from './kit';
import { VibeCards } from './vibe-cards';
import { useN } from './welcome';

function Face({ u, size }: { u: LastUser; size: number }) {
  const { avatarArt } = useApp(), N = useN();
  const uri = u.photo ?? (u.preset && avatarArt[u.preset] ? `${API_URL}/avatar-art/${u.preset}.png?v=${avatarArt[u.preset]}` : null);
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: N.glass }}>
      {uri ? <Image source={{ uri }} style={{ width: size, height: size }} contentFit="cover" transition={150} /> : <Icon name="person" size={size * 0.48} color={N.ink} />}
    </View>
  );
}

export function WelcomeBack({ last, onPick, onNotYou }: { last: LastUser; onPick: () => void; onNotYou: () => void }) {
  const ins = useSafeAreaInsets(), { height } = useWindowDimensions(), N = useN();
  // The browser's top (and the phone's status bar on the web) in the page's top colour.
  useHeaderTop(N.top);
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={N.dark ? 'light' : 'dark'} />
      <LinearGradient pointerEvents="none" colors={[N.top, N.bottom, N.bottom]} locations={[0, 0.6, 1]} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: ins.top + (Platform.OS === 'web' ? 30 : 24), paddingBottom: ins.bottom + 20 }} showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, width: '100%', maxWidth: 440, alignSelf: 'center', paddingHorizontal: 24, gap: 22 }}>
          {/* The name as a logo, as on the welcome screen: «Teori» white, «pro» on a pill of the accent. */}
          <View accessible accessibilityRole="header" accessibilityLabel="Teoripro" style={{ alignSelf: 'center', flexDirection: 'row', direction: 'ltr', alignItems: 'center', gap: 6 } as any}>
            <L style={{ fontSize: 40, lineHeight: 50, fontWeight: '800', letterSpacing: -1.5, color: N.ink }}>Teori</L>
            <View style={{ backgroundColor: N.accent, borderRadius: 13, paddingHorizontal: 10, paddingTop: 1, paddingBottom: 3, marginTop: 4 }}>
              <L style={{ fontSize: 28, lineHeight: 36, fontWeight: '800', letterSpacing: -0.6, color: N.onAccent }}>pro</L>
            </View>
          </View>
          {/* The three cards of what the app does, in the room left above the account (Mojtaba 2026-10-29). */}
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginHorizontal: -24 }}>
            <VibeCards room={Math.max(200, height - ins.top - ins.bottom - 450)} />
          </View>
          <T style={{ fontSize: 28, lineHeight: 40, fontWeight: '800', textAlign: 'center', color: N.ink }}>خوش برگشتید</T>
          <Pressable onPress={() => { tap(); onPick(); }} accessibilityRole="button" accessibilityLabel={last.name}
            style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 26,
              backgroundColor: N.glass, borderWidth: 1, borderColor: N.glassEdge, opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.99 : 1 }] })}>
            <Face u={last} size={52} />
            <View style={{ flex: 1, gap: 2 }}>
              <T raw keepDa numberOfLines={1} style={{ fontSize: 18, lineHeight: 26, fontWeight: '700', color: N.ink }}>{last.name}</T>
              <L numberOfLines={1} style={{ fontSize: 14, lineHeight: 20, color: N.muted, alignSelf: 'flex-start' }}>{last.id}</L>
            </View>
            <Icon name="chevronLeft" size={18} color={N.muted} weight="semibold" />
          </Pressable>
          <T style={{ fontSize: 15, lineHeight: 25, color: N.muted, textAlign: 'center' }}>به نظر می‌رسد قبلاً حساب Teoripro دارید. برای ورود دوباره روی نام‌تان بزنید.</T>
          <Pressable onPress={() => { tap(); onNotYou(); }} accessibilityRole="button" hitSlop={8} style={{ alignSelf: 'center', paddingVertical: 8, marginTop: 6 }}>
            {({ hovered }: { pressed: boolean; hovered?: boolean }) => <T style={{ fontSize: 16, fontWeight: '600', color: N.ink, textDecorationLine: hovered ? 'underline' : 'none' }}>شما نیستید؟</T>}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
