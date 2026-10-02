import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { ActivityIndicator, Platform } from 'react-native';

import { AppProvider, useApp } from '@/lib/store';
import { FA_FONTS } from '@/ui/fonts';
import { Backdrop } from '@/ui/kit';
import { useColors, useIsDark } from '@/ui/theme';
import { ThemeModeProvider } from '@/ui/theme-mode';

SplashScreen.preventAutoHideAsync().catch(() => {});

// The web version is a right-to-left Persian page. Vazirmatn comes with the app (src/ui/fonts.ts); IBM Plex Sans for
// Danish text is loaded like on the site.
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  document.documentElement.dir = 'rtl'; document.documentElement.lang = 'fa';
  const l = document.createElement('link'); l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap'; document.head.appendChild(l);
  const s = document.createElement('style'); s.textContent = 'html,body{overflow:hidden;height:100%}body,div,span,input,textarea{font-family:Vazirmatn-400,system-ui,sans-serif}'; document.head.appendChild(s);
}

function Root() {
  const { ready, user, bank } = useApp();
  const dark = useIsDark(), c = useColors();
  const [fontsLoaded, fontError] = useFonts(FA_FONTS);
  const fonts = fontsLoaded || !!fontError;
  useEffect(() => { if (ready && fonts) SplashScreen.hideAsync().catch(() => {}); }, [ready, fonts]);
  // On the web the page behind the app, and the browser's own bar (theme-color), take the top colour of the
  // background gradient, so the top of the screen runs into the page.
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'; document.body.style.backgroundColor = c.bgGradient[0];
    let m = document.querySelector('meta[name="theme-color"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'theme-color'); document.head.appendChild(m); }
    m.setAttribute('content', c.bgGradient[0]);
  }, [dark, c.bgGradient]);
  if (!ready || !fonts || (user && !bank)) return <Backdrop><ActivityIndicator style={{ flex: 1 }} /></Backdrop>;
  return (
    <ThemeProvider value={dark ? DarkTheme : DefaultTheme}>
      {/* Phones: status bar text in the theme's contrast colour over the gradient (the app draws edge to edge). */}
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="run" options={{ presentation: 'fullScreenModal', gestureEnabled: false }} />
          <Stack.Screen name="result" options={{ presentation: 'modal' }} />
          <Stack.Screen name="mistakes" />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="login" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return <ThemeModeProvider><AppProvider><Root /></AppProvider></ThemeModeProvider>;
}
