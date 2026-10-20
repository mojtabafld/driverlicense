// Main site, before the intro's slides: the app's language. In the one-question style of the sign-in screens, on the
// page's own colour (Mojtaba 2026-10-20; ui/step-frame.tsx; before, a wheel like setting the time on an iPhone): the
// three languages as cards, the title, its line and the button speaking the language chosen. «ادامه» keeps it (the
// page reloads in it when it is not Persian). The theme button sits at the top.
import { useState } from 'react';
import { View } from 'react-native';

import { UI_CHOSEN, UI_LANG, type UiLang } from '@/lib/i18n';
import { T, ThemeButton } from './kit';
import { ChoiceCard, FlagDK, FlagGB, StepFrame } from './step-frame';
import { useColors } from './theme';

export const LANG_NAMES: Record<UiLang, string> = { fa: 'فارسی', en: 'English', da: 'Dansk' };
export const LANG_FONT = (l: UiLang, w: 500 | 700 = 500) => (l === 'fa' ? `Vazirmatn-${w}` : `Inter-${w}`);
// Danish on top, English in the middle (chosen to begin with), Persian below (Mojtaba, 2026-10-15); also the order
// of the intro's language list.
export const LANGS: UiLang[] = ['da', 'en', 'fa'];
const TITLE: Record<UiLang, string> = { fa: 'زبان برنامه را انتخاب کنید', en: 'Choose your language', da: 'Vælg dit sprog' };
const NOTE: Record<UiLang, string> = { fa: 'بعداً هم از تنظیمات قابل تغییر است.', en: 'You can change it later in the settings.', da: 'Du kan ændre det senere i indstillingerne.' };
const GO: Record<UiLang, string> = { fa: 'ادامه', en: 'Continue', da: 'Fortsæt' };
// Each language's line under its name, in itself.
const SAYS: Record<UiLang, string> = { fa: 'برنامه به فارسی، با ترجمه‌ی فارسی سؤال‌ها', en: 'The app in English', da: 'Appen på dansk' };
const PIC: Partial<Record<UiLang, () => React.JSX.Element>> = { da: FlagDK, en: FlagGB };

export function LangWheel({ onDone }: { onDone: (l: UiLang) => void }) {
  const c = useColors();
  // English chosen to begin with (Mojtaba, 2026-10-15), until another is chosen.
  const [l, setL] = useState<UiLang>(UI_CHOSEN ? UI_LANG : 'en');
  const rtl = l === 'fa';
  const say = (text: string, size: number, weight: 500 | 700, color: string) => (
    <T raw style={{ color, fontSize: size, lineHeight: Math.round(size * 1.45), fontFamily: LANG_FONT(l, weight), fontWeight: 'normal', writingDirection: rtl ? 'rtl' : 'ltr' }}>{text}</T>
  );
  return (
    <StepFrame corner={<View style={{ borderRadius: 23, backgroundColor: c.surface2 }}><ThemeButton /></View>}
      title={say(TITLE[l], 29, 700, c.text)} sub={say(NOTE[l], 16, 500, c.muted)}
      button={{ label: say(GO[l], 17, 700, c.ctaFg), ready: true, onPress: () => onDone(l) }}>
      <View style={{ gap: 12 }} accessibilityRole="radiogroup">
        {LANGS.map(k => {
          const Pic = PIC[k];
          return (
            <ChoiceCard key={k} on={l === k} onPress={() => setL(k)} pic={Pic ? <Pic /> : <View style={{ width: 40, height: 30, borderRadius: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}><T raw style={{ fontSize: 15, fontFamily: 'Vazirmatn-700', fontWeight: 'normal', color: c.text }}>فا</T></View>}
              name={<T raw style={{ fontSize: 18, lineHeight: 26, fontFamily: LANG_FONT(k, 700), fontWeight: 'normal', color: c.text }}>{LANG_NAMES[k]}</T>}
              note={SAYS[k]} raw />
          );
        })}
      </View>
    </StepFrame>
  );
}
