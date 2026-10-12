// «نسخه‌ی ویژه», from the settings or a locked AI button: what premium adds, its three passes (a week, a month, three
// months; one payment each, no automatic renewal) and the way to buy one with Stripe Checkout. Stripe sends the user back here with ?paid=<session> (the server checks the
// session and turns premium on) or ?canceled=1.
import * as Linking from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, View } from 'react-native';

import { api } from '@/lib/api';
import { t, UI_LANG } from '@/lib/i18n';
import { faNum } from '@/lib/logic';
import { fmtDay } from '@/lib/names';
import { useApp, type Plan } from '@/lib/store';
import { Icon, type IconName } from '@/ui/icon';
import { Button, Card, T, tap } from '@/ui/kit';
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

const PLAN_NAME: Record<Plan['id'], string> = { week: 'یک هفته', month: 'یک ماه', quarter: 'سه ماه' };

// One pass to choose: its length and price, outlined in the text colour while chosen; the three months one is marked
// as the best value.
function PlanOption({ plan, on, best, onPress }: { plan: Plan; on: boolean; best?: boolean; onPress: () => void }) {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="radio" accessibilityState={{ selected: on }}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 14, paddingHorizontal: 16, borderRadius: 14,
        borderWidth: on ? 2 : 1.5, borderColor: on ? c.text : c.line, backgroundColor: c.surface, opacity: pressed ? 0.85 : 1 })}>
      <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: on ? c.text : c.faint, alignItems: 'center', justifyContent: 'center' }}>
        {on ? <View style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: c.text }} /> : null}
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <T style={{ fontWeight: '700', fontSize: 16 }}>{PLAN_NAME[plan.id]}</T>
        {best ? <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, backgroundColor: c.strong }}><T style={{ fontSize: 11.5, fontWeight: '700', color: c.strongFg }}>به‌صرفه‌ترین</T></View> : null}
      </View>
      <T style={{ fontWeight: '800', fontSize: 17 }}>{t('{0} کرون', faNum(plan.price))}</T>
    </Pressable>
  );
}

export default function Premium() {
  const c = useColors();
  const { user, pay, premium, confirmPremium, refresh } = useApp();
  const { paid, canceled } = useLocalSearchParams<{ paid?: string; canceled?: string }>();
  const [busy, setBusy] = useState<'buy' | 'check' | null>(paid ? 'check' : null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(canceled ? { ok: false, text: 'پرداخت لغو شد؛ پولی از حساب شما کم نشد.' } : null);
  const checked = useRef(false);
  const [plan, setPlan] = useState<Plan['id']>('month');
  const until = user?.premium?.until ?? 0;

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
      const d = await api<{ url: string }>('POST', 'checkout', { plan, lang: UI_LANG });
      if (Platform.OS === 'web') { window.location.assign(d.url); return; }
      await Linking.openURL(d.url);
    } catch (e) {
      setMsg({ ok: false, text: e instanceof Error && e.message ? e.message : 'پرداخت الان در دسترس نیست؛ کمی بعد دوباره امتحان کنید.' });
    }
    setBusy(null);
  };
  const check = async () => { setBusy('check'); try { await refresh(); } catch {} setBusy(null); };

  return (
    <SubPage title="نسخه‌ی ویژه" subtitle="بدون تمدید خودکار؛ هر وقت لازم داشتید بخرید" maxWidth={560}>
      <Card style={{ gap: 4 }}>
        <Perk icon="sparkles" title="تحلیل پاسخ‌ها با هوش مصنوعی" sub="برای هر سؤال توضیح می‌دهد چرا پاسخ شما درست یا نادرست بود." />
        <Perk icon="speaker" title="خواندن سؤال‌ها با صدا" sub="سؤال و گزینه‌ها به دانمارکی یا انگلیسی خوانده می‌شوند." />
        <Perk icon="checkCircle" title="بدون تمدید خودکار" sub="یک بار برای همان مدت می‌پردازید؛ پولی خودکار از حسابتان کم نمی‌شود." />
      </Card>

      {premium ? (
        <Card style={{ gap: 8, alignItems: 'center' }}>
          <Icon name="checkCircle" size={36} color={c.ok} />
          <T style={{ fontWeight: '700', fontSize: 17, textAlign: 'center' }}>نسخه‌ی ویژه برای حساب شما فعال است</T>
          {until > Date.now() ? <T style={{ color: c.muted, fontSize: 13 }}>{t('فعال تا {0}', fmtDay(until))}</T> : null}
        </Card>
      ) : until ? (
        <Card><T style={{ color: c.muted, textAlign: 'center' }}>{t('نسخه‌ی ویژه‌ی شما {0} تمام شد.', fmtDay(until))}</T></Card>
      ) : null}
      {pay && !user?.admin ? (
        <Card style={{ gap: 12 }}>
          <T style={{ fontWeight: '700', fontSize: 16 }}>{premium ? 'تمدید' : 'انتخاب مدت'}</T>
          <View accessibilityRole="radiogroup" style={{ gap: 10 }}>
            {pay.plans.map(p => <PlanOption key={p.id} plan={p} on={plan === p.id} best={p.id === 'quarter'} onPress={() => setPlan(p.id)} />)}
          </View>
          {premium ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>روزهای خرید تازه به آخر نسخه‌ی ویژه‌ی فعلی شما اضافه می‌شود.</T> : null}
          <Button big icon="lock" label={busy === 'buy' ? 'در حال باز کردن صفحه‌ی پرداخت…' : busy === 'check' ? 'در حال تأیید پرداخت…' : premium ? 'تمدید نسخه‌ی ویژه' : 'خرید نسخه‌ی ویژه'} onPress={buy} disabled={!!busy} />
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20, textAlign: 'center' }}>پرداخت امن با Stripe: کارت بانکی، Apple Pay یا Google Pay.</T>
          {pay.test ? <T style={{ color: c.bad, fontSize: 12.5, lineHeight: 20, textAlign: 'center' }}>حالت آزمایشی: با کارت 4242 4242 4242 4242 پرداخت کنید؛ پولی کم نمی‌شود.</T> : null}
          {Platform.OS !== 'web' ? <Button kind="glass" icon="refresh" label="پرداخت کردم؛ بررسی دوباره" onPress={check} disabled={!!busy} /> : null}
        </Card>
      ) : !pay && !premium ? (
        <Card><T style={{ color: c.muted, textAlign: 'center' }}>خرید نسخه‌ی ویژه الان فعال نیست.</T></Card>
      ) : null}

      {msg ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4 }}>
          <Icon name={msg.ok ? 'checkCircle' : 'warning'} size={18} color={msg.ok ? c.ok : c.bad} />
          <T style={{ flex: 1, fontSize: 13.5, color: msg.ok ? c.ok : c.bad }}>{msg.text}</T>
        </View>
      ) : null}
    </SubPage>
  );
}
