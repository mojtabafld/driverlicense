// «تنظیمات زبان», a page of its own (Mojtaba 2026-10-25), opened from its row in the settings: the app's, the exam's and
// the translation's languages, each on a card with what it changes. /app has the exam's language only.
import { View } from 'react-native';

import { EXAM_FOR, TRANS_DEFAULT, getTransLang, UI_LANG, setUiLang, type UiLang } from '@/lib/i18n';
import { PROVE_PICS } from '@/lib/config';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { Card, Segmented, T } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

function Part({ icon, title, text, children }: { icon: IconName; title: string; text: string; children: React.ReactNode }) {
  const c = useColors();
  return (
    <Card style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
          <Icon name={icon} size={19} color={c.text} />
        </View>
        <T style={{ flex: 1, fontWeight: '700', fontSize: 16 }}>{title}</T>
      </View>
      <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22 }}>{text}</T>
      {children}
    </Card>
  );
}

export default function LanguagePage() {
  const { settings, setSettings } = useApp();
  return (
    <SubPage title="تنظیمات زبان" subtitle="زبان برنامه، سؤال‌های آزمون و ترجمه‌ی زیر آن‌ها">
      {!PROVE_PICS ? (
        <Part icon="translate" title="زبان برنامه" text="زبان منوها، دکمه‌ها، درس‌ها و توضیح‌های هوش مصنوعی. با تغییر آن، برنامه یک بار دوباره باز می‌شود و زبان آزمون هم مناسب آن تنظیم می‌شود (که می‌توانید پایین‌تر عوضش کنید).">
          <Segmented value={UI_LANG} onChange={(ui: UiLang) => { if (ui === UI_LANG) return; setSettings({ ui, lang: EXAM_FOR[ui] }).catch(() => {}).finally(() => setUiLang(ui)); }}
            options={[{ value: 'fa', label: 'فارسی', raw: true }, { value: 'en', label: 'English' }, { value: 'da', label: 'Dansk' }]} />
        </Part>
      ) : null}
      <Part icon="exam" title="زبان آزمون" text="زبانی که سؤال‌ها و گزینه‌ها در آزمون‌ها و تمرین‌ها با آن نمایش داده می‌شوند. با همان زبانی تمرین کنید که در آزمون واقعی انتخاب می‌کنید تا به واژه‌های آن عادت کنید.">
        <Segmented value={settings.lang ?? 'da'} onChange={lang => setSettings({ lang })} options={[{ value: 'da', label: 'دانمارکی' }, { value: 'en', label: 'انگلیسی' }]} />
      </Part>
      {/* Main site: left alone it follows the app's language (picked on first signing in); the exam's own language shows no translation. */}
      {!PROVE_PICS ? (
        <Part icon="clipboard" title="زبان ترجمه" text="ترجمه‌ای که زیر سؤال‌ها و گزینه‌ها نمایش داده می‌شود تا معنی آن‌ها را بهتر بفهمید. اگر با زبان آزمون یکی باشد، ترجمه‌ای نمایش داده نمی‌شود؛ با «ترجمه‌ی زیر گزینه‌ها» در تنظیمات می‌توانید آن را روشن یا خاموش کنید.">
          <Segmented value={getTransLang()} onChange={(trans: 'fa' | 'en' | 'da') => setSettings({ trans: trans === TRANS_DEFAULT ? 'auto' : trans })}
            options={[{ value: 'fa', label: 'فارسی', raw: true }, { value: 'en', label: 'انگلیسی' }, { value: 'da', label: 'دانمارکی' }]} />
        </Part>
      ) : null}
    </SubPage>
  );
}
