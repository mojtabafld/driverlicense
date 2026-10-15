import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';

import { RTL, UI_LANG } from '@/lib/i18n';
import { useOnline } from '@/lib/online';
import { initialOnboarded, loadLangAsked, loadOnboarded, saveLangAsked, saveOnboarded } from '@/lib/prefs';
import { AppProvider, useApp } from '@/lib/store';
import { DA_FONTS, FA_FONTS } from '@/ui/fonts';
import { Backdrop, PageSkeleton, setWebTop } from '@/ui/kit';
import { LangPick } from '@/ui/lang-pick';
import { OFFLINE_TOP, Offline, OfflinePreload } from '@/ui/offline';
import { INTRO_BG, Onboarding } from '@/ui/onboarding';
import { useTapTopToScroll } from '@/ui/tap-top';
import { ARC, useColors, useIsDark } from '@/ui/theme';
import { ThemeModeProvider } from '@/ui/theme-mode';

SplashScreen.preventAutoHideAsync().catch(() => {});

// The web version is a right-to-left Persian page (left to right in English and Danish, lib/i18n.ts), with no visible scroll bars. Vazirmatn comes with the app (src/ui/fonts.ts); Inter for
// Danish text too; Poppins (numbers) is loaded from Google Fonts.
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  document.documentElement.dir = RTL ? 'rtl' : 'ltr'; document.documentElement.lang = UI_LANG;
  const l = document.createElement('link'); l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&display=swap'; document.head.appendChild(l);
  const s = document.createElement('style'); s.textContent = 'html,body{overflow:hidden;height:100%;overscroll-behavior:none}body,div,span,input,textarea{font-family:' + (RTL ? 'Vazirmatn-400' : 'Inter-400, Vazirmatn-400') + ',system-ui,sans-serif}*{scrollbar-width:none}*::-webkit-scrollbar{display:none;width:0;height:0}'; document.head.appendChild(s);
}

function Root() {
  useTapTopToScroll();
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
  const [fontsLoaded, fontError] = useFonts({ ...FA_FONTS, ...DA_FONTS });
  const fonts = fontsLoaded || !!fontError;
  // The intro, once per device (also on devices that ran a version without it): over everything until it is closed.
  const [onboarded, setOnboarded] = useState<boolean | null>(initialOnboarded);
  useEffect(() => { if (onboarded === null) loadOnboarded().then(setOnboarded); }, [onboarded]);
  // The questions' language: asked once per account, and on a phone once per device too.
  const [langAsked, setLangAsked] = useState<boolean | null>(null);
  useEffect(() => { if (langAsked === null) loadLangAsked().then(setLangAsked); }, [langAsked]);
  const askLang = !!user && (!settings.langChosen || langAsked === false);
  useEffect(() => { if (ready && fonts && onboarded !== null) SplashScreen.hideAsync().catch(() => {}); }, [ready, fonts, onboarded]);
  // On the web the page behind the app, and the browser's own bar (theme-color), take the top colour of the
  // background gradient, so the top of the screen runs into the page; over the intro and the language screen, their
  // navy (the intro's changes with its picture).
  const [introTop, setIntroTop] = useState<string | null>(null);
  const cover = blocked ? OFFLINE_TOP : onboarded === false ? introTop ?? INTRO_BG[0] : askLang ? INTRO_BG[0] : null;
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    document.documentElement.style.colorScheme = cover || dark ? 'dark' : 'light';
    setWebTop(c.bgGradient[0], cover);   // (a page's picture header, in view, puts its own green there: ui/kit.tsx)
  }, [dark, c.bgGradient, cover]);
  if (blocked) return <Offline onRetry={check} />;
  // arc: Arc's skeleton of a page while it loads; /app keeps the spinner.
  if (!ready || !fonts || onboarded === null || (user && !bank)) return ARC ? <PageSkeleton /> : <Backdrop><ActivityIndicator style={{ flex: 1 }} /></Backdrop>;
  return (
    <ThemeProvider value={dark ? DarkTheme : DefaultTheme}>
      {Platform.OS === 'web' ? <OfflinePreload /> : null}
      {/* Phones: status bar text in the theme's contrast colour over the gradient (the app draws edge to edge). */}
      <StatusBar style={dark || !onboarded || askLang ? 'light' : 'dark'} />
      {/* While the intro is open the screens (sign-in included) are not there at all: hidden password fields behind it
          made iOS / Android offer saved passwords during the intro. */}
      {!onboarded ? (
        <Onboarding onTop={setIntroTop} onDone={() => { saveOnboarded(); setOnboarded(true); }} />
      ) : (
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' },
        animation: 'fade', animationDuration: 180 /* inner pages: a short, light fade (minimal, as in Uber); the exam and the result keep theirs */ }}>
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="run" options={{ presentation: 'fullScreenModal', gestureEnabled: false, animation: 'slide_from_bottom' }} />
          <Stack.Screen name="result" options={{ presentation: 'modal' }} />
          <Stack.Screen name="mistakes" />
          <Stack.Screen name="mistakes-view" />
          <Stack.Screen name="account" />
          <Stack.Screen name="learn-lessons" />
          <Stack.Screen name="rules" />
          <Stack.Screen name="signs" />
          <Stack.Screen name="priority" />
          <Stack.Screen name="guide-view" />
          <Stack.Screen name="course" />
          <Stack.Screen name="course-lesson" />
          <Stack.Screen name="drill" />
          <Stack.Screen name="help" />
          <Stack.Screen name="report" />
          <Stack.Screen name="premium" />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="login" />
        </Stack.Protected>
      </Stack>
      )}
      {onboarded && askLang ? (
        // After the intro and signing in: the questions' language (once per account, and once on each phone).
        <View style={StyleSheet.absoluteFill}><LangPick onDone={() => { saveLangAsked(); setLangAsked(true); }} /></View>
      ) : null}
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return <ThemeModeProvider><AppProvider><Root /></AppProvider></ThemeModeProvider>;
}
