// «نسخه‌ی ویژه», from the settings or a locked AI button: what premium adds, its price and the way to buy it with Stripe
// Checkout (one payment, for good). Stripe sends the user back here with ?paid=<session> (the server checks the
// session and turns premium on) or ?canceled=1.
import * as Linking from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, View } from 'react-native';

import { api } from '@/lib/api';
import { t, UI_LANG } from '@/lib/i18n';
import { faNum } from '@/lib/logic';
import { fmtDay } from '@/lib/names';
import { useApp } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { Button, Card, T } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

function Perk({ icon, title, sub }: { icon: IconName; title: string; sub: string }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 }}>
      <View style={{ width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: c.strong }}>
        <Icon name={icon} size={18} color={c.strongFg} />
      </View>
      <View style={{ flex: 1 }}>
        <T style={{ fontWeight: '700' }}>{title}</T>
        <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{sub}</T>
      </View>
    </View>
  );
}

export default function Premium() {
  const c = useColors();
  const { user, pay, premium, confirmPremium, refresh } = useApp();
  const { paid, canceled } = useLocalSearchParams<{ paid?: string; canceled?: string }>();
  const [busy, setBusy] = useState<'buy' | 'check' | null>(paid ? 'check' : null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(canceled ? { ok: false, text: 'پرداخت لغو شد؛ پولی از حساب شما کم نشد.' } : null);
  const checked = useRef(false);

  // Back from Stripe: the server checks the session (it may still be on its way: a second try a little later).
  useEffect(() => {
    if (!paid || checked.current) return;
    checked.current = true;
    (async () => {
      for (let i = 0; i < 3; i++) {
        try { if (await confirmPremium(String(paid))) { setMsg({ ok: true, text: 'پرداخت انجام شد و نسخه‌ی ویژه فعال است. ممنون از حمایت شما!' }); break; } }
        catch (e) { setMsg({ ok: false, text: e instanceof Error && e.message ? e.message : 'پرداخت تأیید نشد؛ دوباره امتحان کنید.' }); break; }
        if (i === 2) setMsg({ ok: false, text: 'پرداخت هنوز تأیید نشده است؛ چند دقیقه بعد دوباره سر بزنید.' });
        else await new Promise(r => setTimeout(r, 2500));
      }
      setBusy(null);
      router.setParams({ paid: undefined });
    })();
  }, [paid, confirmPremium]);

  const buy = async () => {
    setBusy('buy'); setMsg(null);
    try {
      const d = await api<{ url: string }>('POST', 'checkout', { lang: UI_LANG });
      if (Platform.OS === 'web') { window.location.assign(d.url); return; }
      await Linking.openURL(d.url);
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error && e.message ? e.message : 'پرداخت الان در دسترس نیست؛ کمی بعد دوباره امتحان کنید.' });
    }
    setBusy(null);
  };
  const check = async () => { setBusy('check'); try { await refresh(); } catch {} setBusy(null); };

  return (
    <SubPage title="نسخه‌ی ویژه" subtitle="یک بار پرداخت، برای همیشه" maxWidth={560}>
      <Card style={{ gap: 4 }}>
        <Perk icon="sparkles" title="تحلیل پاسخ‌ها با هوش مصنوعی" sub="برای هر سؤال توضیح می‌دهد چرا پاسخ شما درست یا نادرست بود." />
        <Perk icon="speaker" title="خواندن سؤال‌ها با صدا" sub="سؤال و گزینه‌ها به دانمارکی یا انگلیسی خوانده می‌شوند." />
        <Perk icon="checkCircle" title="بدون اشتراک ماهانه" sub="یک بار می‌پردازید و تا قبولی در آزمون همراه شماست." />
      </Card>

      {premium ? (
        <Card style={{ gap: 8, alignItems: 'center' }}>
          <Icon name="checkCircle" size={36} color={c.ok} />
          <T style={{ fontWeight: '700', fontSize: 17, textAlign: 'center' }}>نسخه‌ی ویژه برای حساب شما فعال است</T>
          {user?.premium?.at ? <T style={{ color: c.muted, fontSize: 13 }}>{t('فعال از {0}', fmtDay(user.premium.at))}</T> : null}
        </Card>
      ) : pay ? (
        <Card style={{ gap: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
            <T style={{ fontSize: 30, fontWeight: '800' }}>{faNum(pay.price)}</T>
            <T style={{ fontSize: 16, color: c.muted }}>کرون</T>
          </View>
          <Button big icon="lock" label={busy === 'buy' ? 'در حال باز کردن صفحه‌ی پرداخت…' : busy === 'check' ? 'در حال تأیید پرداخت…' : 'خرید نسخه‌ی ویژه'} onPress={buy} disabled={!!busy} />
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20, textAlign: 'center' }}>پرداخت امن با Stripe: کارت بانکی، Apple Pay یا Google Pay.</T>
          {pay.test ? <T style={{ color: c.bad, fontSize: 12.5, lineHeight: 20, textAlign: 'center' }}>حالت آزمایشی: با کارت 4242 4242 4242 4242 پرداخت کنید؛ پولی کم نمی‌شود.</T> : null}
          {Platform.OS !== 'web' ? <Button kind="glass" icon="refresh" label="پرداخت کردم؛ بررسی دوباره" onPress={check} disabled={!!busy} /> : null}
        </Card>
      ) : (
        <Card><T style={{ color: c.muted, textAlign: 'center' }}>خرید نسخه‌ی ویژه الان فعال نیست.</T></Card>
      )}

      {msg ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4 }}>
          <Icon name={msg.ok ? 'checkCircle' : 'warning'} size={18} color={msg.ok ? c.ok : c.bad} />
          <T style={{ flex: 1, fontSize: 13.5, color: msg.ok ? c.ok : c.bad }}>{msg.text}</T>
        </View>
      ) : null}
    </SubPage>
  );
}
