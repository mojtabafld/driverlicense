import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, Platform, useColorScheme } from 'react-native';

import { AppProvider, useApp } from '@/lib/store';
import { Backdrop } from '@/ui/kit';

SplashScreen.preventAutoHideAsync().catch(() => {});

// The web version is a right-to-left Persian page with the site's fonts (Vazirmatn, IBM Plex Sans for Danish).
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  document.documentElement.dir = 'rtl'; document.documentElement.lang = 'fa';
  const l = document.createElement('link'); l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Vazirmatn:wght@400;500;600;700;800&display=swap'; document.head.appendChild(l);
  const s = document.createElement('style'); s.textContent = 'html,body{overflow:hidden;height:100%}body,div,span,input,textarea{font-family:Vazirmatn,system-ui,sans-serif}'; document.head.appendChild(s);
}

function Root() {
  const { ready, user, bank } = useApp();
  const scheme = useColorScheme();
  useEffect(() => { if (ready) SplashScreen.hideAsync().catch(() => {}); }, [ready]);
  if (!ready || (user && !bank)) return <Backdrop><ActivityIndicator style={{ flex: 1 }} /></Backdrop>;
  return (
    <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
        <Stack.Protected guard={!!user}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="run" options={{ presentation: 'fullScreenModal', gestureEnabled: false }} />
          <Stack.Screen name="result" options={{ presentation: 'modal' }} />
        </Stack.Protected>
        <Stack.Protected guard={!user}>
          <Stack.Screen name="login" />
        </Stack.Protected>
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return <AppProvider><Root /></AppProvider>;
}
