// «گزارش خطا», from the settings: a short form whose text goes to the server with the account, the platform and the
// app's version; the admins get it by email (Resend, Reply-To the account's confirmed address) and in the admin panel.
import Constants from 'expo-constants';
import { useState } from 'react';
import { Platform, TextInput, View } from 'react-native';

import { PROVE_PICS } from '@/lib/config';
import { RTL, tr } from '@/lib/i18n';
import { api } from '@/lib/api';
import { Icon } from '@/ui/icon';
import { Button, Card, Segmented, T } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors, useIsDark } from '@/ui/theme';

const MAX = 2000;

export default function Report() {
  const c = useColors(), dark = useIsDark();
  const [kind, setKind] = useState<'bug' | 'idea'>('bug');
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const send = async () => {
    const t = text.trim();
    if (t.length < 5) return setMsg({ ok: false, text: 'لطفاً کمی بیشتر توضیح دهید.' });
    setBusy(true); setMsg(null);
    try {
      await api('POST', 'report', { kind, text: t, platform: Platform.OS, version: Constants.expoConfig?.version ?? '' });
      setText(''); setMsg({ ok: true, text: 'گزارش شما فرستاده شد. ممنون که کمک می‌کنید اپ بهتر شود!' });
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error && e.message ? e.message : 'فرستاده نشد؛ دوباره امتحان کنید.' });
    }
    setBusy(false);
  };
  return (
    <SubPage title="گزارش خطا" subtitle="اگر مشکلی دیدید یا پیشنهادی دارید، برای ما بنویسید.">
      <Card style={{ gap: 12 }}>
        <Segmented value={kind} onChange={setKind} options={[{ value: 'bug', label: 'مشکل' }, { value: 'idea', label: 'پیشنهاد' }]} />
        <T style={{ color: c.muted, fontSize: 13, lineHeight: 21 }}>
          {kind === 'bug' ? (PROVE_PICS ? 'چه اتفاقی افتاد و در کدام صفحه؟ اگر به سؤال خاصی مربوط است، شماره‌ی درس و سؤال را هم بنویسید.' : 'چه اتفاقی افتاد و در کدام صفحه؟ اگر به سؤال یا درس خاصی مربوط است، نام درس آموزش گام‌به‌گام یا آزمون و شماره‌ی سؤال را هم بنویسید.') : 'چه چیزی را دوست دارید اضافه یا بهتر شود؟'}
        </T>
        <TextInput value={text} onChangeText={v => { setText(v.slice(0, MAX)); setMsg(null); }} multiline textAlignVertical="top"
          placeholder={tr(kind === 'bug' ? (PROVE_PICS ? 'مثلاً: در درس ۳، سؤال ۵ تصویر نمایش داده نمی‌شود.' : 'مثلاً: در درس «کمربند و صندلی کودک»، تصویر سؤال ۲ نمایش داده نمی‌شود.') : 'پیشنهاد شما…')} placeholderTextColor={c.faint}
          style={{ minHeight: 150, padding: 14, borderRadius: 14, borderWidth: 1.5, borderColor: c.line, color: c.text, fontSize: 15, lineHeight: 24,
            fontFamily: RTL ? 'Vazirmatn-400' : 'Inter-400', textAlign: RTL ? 'right' : 'left', writingDirection: RTL ? 'rtl' : 'ltr', backgroundColor: dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.75)' }} />
        <T style={{ color: c.faint, fontSize: 11.5, textAlign: 'left', writingDirection: 'ltr' }}>{`${text.length} / ${MAX}`}</T>
        {msg ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name={msg.ok ? 'checkCircle' : 'warning'} size={18} color={msg.ok ? c.ok : c.bad} />
            <T style={{ flex: 1, fontSize: 13.5, color: msg.ok ? c.ok : c.bad }}>{msg.text}</T>
          </View>
        ) : null}
        <Button kind="grey" icon="send" label={busy ? 'در حال فرستادن…' : 'فرستادن گزارش'} onPress={send} disabled={busy || !text.trim()} />
      </Card>
      <T style={{ color: c.faint, fontSize: 12, lineHeight: 20, textAlign: 'center' }}>همراه گزارش، نام کاربری، ایمیل حساب، نوع دستگاه و نسخه‌ی اپ هم فرستاده می‌شود تا مشکل راحت‌تر پیدا شود و بتوانیم جوابتان را بدهیم.</T>
    </SubPage>
  );
}
