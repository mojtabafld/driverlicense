import { DarkTheme, DefaultTheme, Stack, ThemeProvider, router, usePathname, type ErrorBoundaryProps } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { api } from '@/lib/api';
import { RTL, UI_LANG, syncNativeDir, tr } from '@/lib/i18n';
import { useOnline } from '@/lib/online';
import { initialOnboarded, loadOnboarded, saveOnboarded } from '@/lib/prefs';
import { AppProvider, useApp } from '@/lib/store';
import { useUsage } from '@/lib/usage';
import { DA_FONTS, FA_FONTS } from '@/ui/fonts';
import { Backdrop, PageSkeleton, setWebTop } from '@/ui/kit';
import { LangPick } from '@/ui/lang-pick';
import { OFFLINE_TOP, Offline, OfflinePreload } from '@/ui/offline';
import { Onboarding, useIntroBg } from '@/ui/onboarding';
import { useTapTopToScroll } from '@/ui/tap-top';
import { UpdatePrompt } from '@/ui/update-prompt';
import { VerifiedPopup } from '@/ui/verified-popup';
import { VerifyEmail } from '@/ui/verify-email';
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
  // Android: the layout's direction follows the language (right to left for Persian only).
  useEffect(() => { syncNativeDir(); }, []);
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
  const dark = useIsDark(), c = useColors(), INTRO_BG = useIntroBg();
  const [fontsLoaded, fontError] = useFonts({ ...FA_FONTS, ...DA_FONTS });
  const fonts = fontsLoaded || !!fontError;
  // The intro, once per device (also on devices that ran a version without it): over everything until it is closed.
  const [onboarded, setOnboarded] = useState<boolean | null>(initialOnboarded);
  useEffect(() => { if (onboarded === null) loadOnboarded().then(setOnboarded); }, [onboarded]);
  // The questions' language and the look: asked once per account, on its first sign-in (Mojtaba, 2026-10-16); an
  // account that already has its settings, from any device, is not asked again.
  const askLang = !!user && !settings.langChosen;
  // The pages opened, counted (without the account) for the daily AI report (lib/usage.ts).
  useUsage(!!user && !!onboarded);
  useEffect(() => { if (ready && fonts && onboarded !== null) SplashScreen.hideAsync().catch(() => {}); }, [ready, fonts, onboarded]);
  // On the web the page behind the app, and the browser's own bar (theme-color), take the top colour of the
  // background gradient, so the top of the screen runs into the page; over the intro and the language screen, their
  // navy (the intro's changes with its picture).
  const [introTop, setIntroTop] = useState<string | null>(null);
  // Main site: the language screens are on the page's own colour (ui/lang-wheel.tsx, ui/lang-pick.tsx), so the top runs
  // into them in it too (Mojtaba 2026-10-20).
  const cover = blocked ? (ARC ? INTRO_BG[0] : OFFLINE_TOP) : ARC && (onboarded === false || askLang) ? c.bg : onboarded === false ? introTop ?? INTRO_BG[0] : askLang ? INTRO_BG[0] : null;
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    document.documentElement.style.colorScheme = (cover && cover !== c.bg) || dark ? 'dark' : 'light';
    setWebTop(c.bgGradient[0], cover);   // (a page's picture header, in view, puts its own green there: ui/kit.tsx)
  }, [dark, c.bgGradient, c.bg, cover]);
  if (blocked) return <Offline onRetry={check} />;
  // A new account waiting for its email link: only that page (the app loads once the link is opened).
  if (ready && fonts && onboarded && user?.verify) return <ThemeProvider value={dark ? DarkTheme : DefaultTheme}><StatusBar style={dark ? 'light' : 'dark'} /><VerifyEmail /></ThemeProvider>;
  // arc: Arc's skeleton of a page while it loads; /app keeps the spinner.
  if (!ready || !fonts || onboarded === null || (user && !bank)) return ARC ? <PageSkeleton /> : <Backdrop><ActivityIndicator style={{ flex: 1 }} /></Backdrop>;
  return (
    <ThemeProvider value={dark ? DarkTheme : DefaultTheme}>
      {Platform.OS === 'web' && !ARC ? <OfflinePreload /> : null}
      {/* Phones: status bar text in the theme's contrast colour over the gradient (the app draws edge to edge). */}
      <StatusBar style={dark || (!ARC && (!onboarded || askLang)) ? 'light' : 'dark'} />
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
          <Stack.Screen name="history" />
          <Stack.Screen name="account" />
          <Stack.Screen name="learn-lessons" />
          <Stack.Screen name="rules" />
          <Stack.Screen name="signs" />
          <Stack.Screen name="priority" />
          <Stack.Screen name="guide-view" />
          <Stack.Screen name="course" />
          <Stack.Screen name="course-lesson" />
          <Stack.Screen name="course-search" />
          <Stack.Screen name="sign-cards" />
          <Stack.Screen name="priority-cards" />
          <Stack.Screen name="glossary" />
          <Stack.Screen name="calendar" />
          <Stack.Screen name="coach" />
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
        <View style={StyleSheet.absoluteFill}><LangPick /></View>
      ) : null}
      {/* A newer Android app is out: asks once per start to install it (after the intro and the language screen). */}
      {onboarded && user && !askLang ? <UpdatePrompt /> : null}
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return <ThemeModeProvider><AppProvider><Root /><VerifiedPopup /></AppProvider></ThemeModeProvider>;
}

// A page that broke while drawing (Mojtaba 2026-10-21: the review opened as a blank white page): its error said on the
// screen instead of a blank one, with «دوباره امتحان کنید» and «بازگشت», and sent to the server (/api/clienterror,
// for the admin panel and the log). Plain parts only: the app's providers may be what broke.
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const c = useColors(), route = usePathname();
  const path = Platform.OS === 'web' && typeof location !== 'undefined' ? `${location.pathname}${location.search}` : route;
  const sent = useRef(false);
  useEffect(() => {
    if (sent.current) return; sent.current = true;
    api('POST', 'clienterror', { message: error?.message, stack: error?.stack, path, version: Platform.OS }).catch(() => {});
  }, [error, path]);
  const btn = (label: string, onPress: () => void, main?: boolean) => (
    <Pressable onPress={onPress} accessibilityRole="button" style={({ pressed }) => ({ height: 50, borderRadius: 14, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20,
      backgroundColor: main ? c.cta : c.surface2, opacity: pressed ? 0.8 : 1 })}>
      <Text style={{ color: main ? c.ctaFg : c.text, fontSize: 16, fontWeight: '600' }}>{label}</Text>
    </Pressable>
  );
  return (
    <ScrollView style={{ flex: 1, backgroundColor: c.bg }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24, gap: 14, maxWidth: 560, width: '100%', alignSelf: 'center' }}>
      <Text style={{ color: c.text, fontSize: 22, fontWeight: '700', textAlign: RTL ? 'right' : 'left' }}>{tr('این صفحه باز نشد')}</Text>
      <Text style={{ color: c.muted, fontSize: 15, lineHeight: 23, textAlign: RTL ? 'right' : 'left' }}>{tr('خطا برای ما فرستاده شد. دوباره امتحان کنید یا برگردید.')}</Text>
      <View style={{ padding: 12, borderRadius: 12, backgroundColor: c.surface2 }}>
        <Text selectable style={{ color: c.bad, fontSize: 13, lineHeight: 19, fontFamily: Platform.OS === 'web' ? 'monospace' : undefined, writingDirection: 'ltr', textAlign: 'left' }}>
          {`${path}\n${error?.message ?? ''}\n${(error?.stack ?? '').split('\n').slice(0, 6).join('\n')}`}
        </Text>
      </View>
      {btn(tr('دوباره امتحان کنید'), () => { retry(); }, true)}
      {btn(tr('بازگشت'), () => { if (router.canGoBack()) router.back(); else router.replace('/'); retry(); })}
    </ScrollView>
  );
}
