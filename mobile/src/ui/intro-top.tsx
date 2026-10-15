// The two round buttons at the top of the intro (main site, Mojtaba 2026-10-15): the app's language, opening a short
// list of the three to change it (the page reloads in the one picked), and the theme beside it, turning light / dark
// at once.
import { Pressable, View } from 'react-native';

import { UI_LANG, setUiLang, tr } from '@/lib/i18n';
import { Icon } from './icon';
import { T, tap } from './kit';
import { LANGS, LANG_FONT, LANG_NAMES } from './lang-wheel';
import { useTheme } from './theme';

const SIZE = 40, ROUND = { width: SIZE, height: SIZE, borderRadius: SIZE / 2, alignItems: 'center', justifyContent: 'center' } as const;
const ON = '#1f6f5c';

export function ThemeButton() {
  const { theme, setMode } = useTheme();
  const dark = theme === 'dark';
  return (
    <Pressable onPress={() => { tap(); setMode(dark ? 'light' : 'dark'); }} hitSlop={6} accessibilityRole="button" accessibilityLabel={tr(dark ? 'روشن' : 'تیره')}
      style={({ pressed }) => ({ ...ROUND, opacity: pressed ? 0.8 : 1, backgroundColor: 'rgba(0,0,0,0.28)' })}>
      <Icon name={dark ? 'sun' : 'moon'} size={20} color="#fff" />
    </Pressable>
  );
}

// The language button and its list; `open` is kept by the caller, so a tap anywhere else can close it.
export function LangButton({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <View style={{ zIndex: 3 }}>
      <Pressable onPress={() => { tap(); setOpen(!open); }} hitSlop={6} accessibilityRole="button" accessibilityLabel={tr('زبان برنامه')} accessibilityState={{ expanded: open }}
        style={({ pressed }) => ({ ...ROUND, opacity: pressed ? 0.8 : 1, backgroundColor: open ? '#fff' : 'rgba(0,0,0,0.28)' })}>
        <Icon name="translate" size={20} color={open ? ON : '#fff'} />
      </Pressable>
      {open ? (
        <View accessibilityRole="menu" style={{ position: 'absolute', top: SIZE + 8, left: 0, minWidth: 168, padding: 6, borderRadius: 16, backgroundColor: '#fff',
          shadowColor: '#000', shadowOpacity: 0.22, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 8 }}>
          {LANGS.map(l => {
            const on = l === UI_LANG;
            return (
              <Pressable key={l} onPress={() => { tap(); setOpen(false); setUiLang(l); }} accessibilityRole="menuitem" accessibilityState={{ selected: on }}
                style={({ pressed, hovered }: { pressed: boolean; hovered?: boolean }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, height: 44, paddingHorizontal: 12, borderRadius: 11,
                  backgroundColor: on ? '#e6f1ee' : pressed || hovered ? '#f2f2f2' : 'transparent' })}>
                <T raw style={{ flex: 1, fontSize: 15.5, lineHeight: 22, color: on ? ON : '#1b1b1b', fontFamily: LANG_FONT(l, on ? 700 : 500), fontWeight: 'normal', textAlign: 'left', writingDirection: 'ltr' }}>{LANG_NAMES[l]}</T>
                {on ? <Icon name="check" size={16} color={ON} weight="bold" /> : null}
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
