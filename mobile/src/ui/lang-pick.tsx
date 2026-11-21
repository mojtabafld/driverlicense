// Asked once per user, after the intro and the first sign-in (and once for users from before it existed, guests too):
// which language the questions are in, Danish (as in the real test) or English. Saved in the user's settings with
// `langChosen`, so it is not asked again on any device; it can be changed later in the settings. Signing up asks it
// among its steps (ui/sign-steps.tsx), so new accounts do not see this. In the one-question style of the sign-in
// screens, on the page's own colour (Mojtaba 2026-10-20; ui/step-frame.tsx), with under the choices the tip that the
// translation's language can be changed in the settings.
import { useState } from 'react';
import { View } from 'react-native';

import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { T } from './kit';
import { ExamLangChoice, StepFrame } from './step-frame';
import { useColors } from './theme';

export function LangPick({ onDone }: { onDone?: () => void }) {
  const c = useColors();
  const { settings, setSettings } = useApp();
  const [lang, setLang] = useState<'da' | 'en'>(settings.lang === 'en' ? 'en' : 'da');
  const [busy, setBusy] = useState(false);
  const save = () => { setBusy(true); setSettings({ lang, langChosen: true }).then(() => onDone?.(), () => setBusy(false)); };
  return (
    <StepFrame corner={<View style={{ width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}><Icon name="translate" size={24} color={c.text} /></View>}
      title="سؤال‌ها به چه زبانی باشند؟" sub="ترجمه‌ی فارسی در هر دو حالت زیر سؤال‌ها نمایش داده می‌شود. بعداً هم از تنظیمات قابل تغییر است."
      button={{ label: 'ادامه', ready: true, busy, onPress: save }}>
      <ExamLangChoice value={lang} onChange={setLang} />
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 16, backgroundColor: c.surface2 }}>
        <Icon name="bulbCircle" size={26} color={c.muted} />
        <T style={{ flex: 1, color: c.muted, fontSize: 14, lineHeight: 23 }}>در تنظیمات می‌توانید زبان ترجمه‌ی سؤال‌ها و گزینه‌ها را تغییر دهید.</T>
      </View>
    </StepFrame>
  );
}
