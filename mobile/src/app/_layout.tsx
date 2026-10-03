import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';

import { useOnline } from '@/lib/online';
import { initialOnboarded, loadOnboarded, saveOnboarded } from '@/lib/prefs';
import { AppProvider, useApp } from '@/lib/store';
import { FA_FONTS } from '@/ui/fonts';
import { Backdrop } from '@/ui/kit';
import { LangPick } from '@/ui/lang-pick';
import { OFFLINE_TOP, Offline, OfflinePreload } from '@/ui/offline';
import { INTRO_BG, Onboarding } from '@/ui/onboarding';
import { useColors, useIsDark } from '@/ui/theme';
import { ThemeModeProvider } from '@/ui/theme-mode';

SplashScreen.preventAutoHideAsync().catch(() => {});

// The web version is a right-to-left Persian page, with no visible scroll bars. Vazirmatn comes with the app (src/ui/fonts.ts); IBM Plex Sans for
// Danish text is loaded like on the site.
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  document.documentElement.dir = 'rtl'; document.documentElement.lang = 'fa';
  const l = document.createElement('link'); l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap'; document.head.appendChild(l);
  const s = document.createElement('style'); s.textContent = 'html,body{overflow:hidden;height:100%}body,div,span,input,textarea{font-family:Vazirmatn-400,system-ui,sans-serif}*{scrollbar-width:none}*::-webkit-scrollbar{display:none;width:0;height:0}'; document.head.appendChild(s);
}

function Root() {
  const { ready, user, bank, settings, refresh } = useApp();
  // No internet while the app has nothing loaded yet (at start, or before signing in): a page of its own; when the
  // connection is back the app loads again (the web page reloads, the phone app reads the account again). Losing the
  // connection later (e.g. in an exam) does not interrupt anything.
  const { online, check } = useOnline();
  const blocked = !online && !bank;
  const wasBlocked = useRef(false);
  useEffect(() => {
    if (blocked) { wasBlocked.current = true; return; }
    if (!online || !wasBlocked.current) return;
    wasBlocked.current = false;
    if (Platform.OS === 'web' && typeof window !== 'undefined') window.location.reload();
    else refresh().catch(() => {});
  }, [blocked, online, refresh]);
  const dark = useIsDark(), c = useColors();
  const [fontsLoaded, fontError] = useFonts(FA_FONTS);
  const fonts = fontsLoaded || !!fontError;
  // The intro, once per device (also on devices that ran a version without it): over everything until it is closed.
  const [onboarded, setOnboarded] = useState<boolean | null>(initialOnboarded);
  useEffect(() => { if (onboarded === null) loadOnboarded().then(setOnboarded); }, [onboarded]);
  useEffect(() => { if (ready && fonts && onboarded !== null) SplashScreen.hideAsync().catch(() => {}); }, [ready, fonts, onboarded]);
  // On the web the page behind the app, and the browser's own bar (theme-color), take the top colour of the
  // background gradient, so the top of the screen runs into the page; over the intro and the language screen, their
  // navy (the intro's changes with its picture).
  const [introTop, setIntroTop] = useState<string | null>(null);
  const cover = blocked ? OFFLINE_TOP : onboarded === false ? introTop ?? INTRO_BG[0] : user && !settings.langChosen ? INTRO_BG[0] : null;
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    const top = cover ?? c.bgGradient[0];
    document.documentElement.style.colorScheme = cover || dark ? 'dark' : 'light'; document.body.style.backgroundColor = top;
    let m = document.querySelector('meta[name="theme-color"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'theme-color'); document.head.appendChild(m); }
    m.setAttribute('content', top);
  }, [dark, c.bgGradient, cover]);
  if (blocked) return <Offline onRetry={check} />;
  if (!ready || !fonts || onboarded === null || (user && !bank)) return <Backdrop><ActivityIndicator style={{ flex: 1 }} /></Backdrop>;
  return (
    <ThemeProvider value={dark ? DarkTheme : DefaultTheme}>
      {Platform.OS === 'web' ? <OfflinePreload /> : null}
      {/* Phones: status bar text in the theme's contrast colour over the gradient (the app draws edge to edge). */}
      <StatusBar style={dark || !onboarded || (user && !settings.langChosen) ? 'light' : 'dark'} />
      {/* While the intro is open the screens (sign-in included) are not there at all: hidden password fields behind it
          made iOS / Android offer saved passwords during the intro. */}
      {!onboarded ? (
        <Onboarding onTop={setIntroTop} onDone={() => { saveOnboarded(); setOnboarded(true); }} />
      ) : (
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="run" options={{ presentation: 'fullScreenModal', gestureEnabled: false }} />
          <Stack.Screen name="result" options={{ presentation: 'modal' }} />
          <Stack.Screen name="mistakes" />
          <Stack.Screen name="mistakes-view" />
          <Stack.Screen name="account" />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="login" />
        </Stack.Protected>
      </Stack>
      )}
      {onboarded && user && !settings.langChosen ? (
        // After the intro and signing in: the questions' language, asked once per user.
        <View style={StyleSheet.absoluteFill}><LangPick /></View>
      ) : null}
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return <ThemeModeProvider><AppProvider><Root /></AppProvider></ThemeModeProvider>;
}
