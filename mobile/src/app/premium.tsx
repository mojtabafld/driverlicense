// «نسخه‌ی ویژه», from the settings or a locked AI button: what premium adds, its three passes (a week, a month, three
// months; one payment each, no automatic renewal) and the way to buy one with Stripe Checkout. Stripe sends the user back here with ?paid=<session> (the server checks the
// session and turns premium on) or ?canceled=1. With a trial code (PROMO_CODE on the server) an account gets premium free
// for a few days, once.
import * as Haptics from 'expo-haptics';
import * as Linking from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, TextInput, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { api } from '@/lib/api';
import { t, UI_LANG } from '@/lib/i18n';
import { faNum } from '@/lib/logic';
import { fmtDay } from '@/lib/names';
import { usePlayBilling } from '@/lib/play-billing';
import { useApp, type Plan } from '@/lib/store';
import { Icon } from '@/ui/icon';
import { Button, Card, OkTick, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

// One thing premium adds: a round green tick (OkTick), then a line.
// `small`: a short screen (the premium page's denser steps): a smaller tick and line, still one under the other.
function Perk({ title, small }: { title: string; small?: boolean }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: small ? 8 : 10 }}>
      <OkTick size={small ? 16 : 20} />
      <T style={{ flex: 1, fontWeight: '500', fontSize: small ? 11 : 12, lineHeight: small ? 16 : undefined }}>{title}</T>
    </View>
  );
}

// The store apps (Android, iOS) never sell with Stripe (Mojtaba 2026-10-23): Google Play and the App Store want digital
// goods bought inside an app paid through their own billing. Android sells the same passes with Google Play Billing when
// the server does (lib/play-billing.ts); otherwise, and on iOS, the passes and the buy button are left out and nothing
// points elsewhere to buy. A pass already on the account works as everywhere, and a trial code still counts.
const STORE_APP = Platform.OS !== 'web';

const PLAN_NAME: Record<Plan['id'], string> = { week: 'یک هفته', month: 'یک ماه', quarter: 'سه ماه' };

// One pass to choose: its length and price, outlined in the text colour while chosen; the three months one is marked
// as the best value.
// `priceText`: the price as Google Play shows it (in the buyer's currency), in place of the kroner.
function PlanOption({ plan, on, best, onPress, pad = 14, priceText }: { plan: Plan; on: boolean; best?: boolean; onPress: () => void; pad?: number; priceText?: string }) {
  const c = useColors();
  return (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="radio" accessibilityState={{ selected: on }}
      style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: pad, paddingHorizontal: 16, borderRadius: 14,
        borderWidth: on ? 2 : 1.5, borderColor: on ? c.text : c.line, backgroundColor: c.surface, opacity: pressed ? 0.85 : 1 })}>
      <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: on ? c.text : c.faint, alignItems: 'center', justifyContent: 'center' }}>
        {on ? <View style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: c.text }} /> : null}
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <T style={{ fontWeight: '700', fontSize: 16 }}>{PLAN_NAME[plan.id]}</T>
        {best ? <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8, backgroundColor: c.strong }}><T style={{ fontSize: 11.5, fontWeight: '700', color: c.strongFg }}>به‌صرفه‌ترین</T></View> : null}
      </View>
      <T raw={!!priceText} style={{ fontWeight: '800', fontSize: 17 }}>{priceText ?? t('{0} کرون', faNum(plan.price))}</T>
    </Pressable>
  );
}

export default function Premium() {
  const c = useColors();
  const { user, pay, premium, confirmPremium, syncPremium, redeemPromo, startTrial, refresh, logout } = useApp();
  const guest = !!user?.guest;
  const { paid, canceled } = useLocalSearchParams<{ paid?: string; canceled?: string }>();
  const [busy, setBusy] = useState<'buy' | 'check' | null>(paid ? 'check' : null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(canceled ? { ok: false, text: 'پرداخت لغو شد؛ پولی از حساب شما کم نشد.' } : null);
  const checked = useRef(false);
  const [plan, setPlan] = useState<Plan['id']>('month');
  const [code, setCode] = useState(''), [redeeming, setRedeeming] = useState(false);
  const until = user?.premium?.until ?? 0;
  const showCode = !!pay?.promo && !guest && !user?.premium?.promo && !user?.promoUsed;
  // The free trial without a code (Mojtaba 2026-10-29), until this account has had a trial.
  const showTrial = !!pay?.trial && !premium && !guest && !user?.premium?.promo && !user?.promoUsed;
  const [trialing, setTrialing] = useState(false);
  const trial = async () => {
    setTrialing(true); setMsg(null);
    try { await startTrial(); setMsg({ ok: true, text: t('نسخه‌ی ویژه {0} روز رایگان برای شما فعال شد.', faNum(pay?.trial ?? 1)) }); }
    catch (e: any) { setMsg({ ok: false, text: e?.message || t('فعال نشد؛ دوباره امتحان کنید.') }); }
    finally { setTrialing(false); }
  };
  // Fitted to the screen (Mojtaba 2026-10-18): while the page is taller than the room under its header, it steps to a
  // denser layout (1: less space, lower plan rows; 2: the four perks smaller, a smaller buy button; 3: the active
  // pass on one line, without the line on how a renewal adds up), so it needs no
  // scrolling; with the trial-code card still there it may scroll. A new screen height starts over.
  const { height: winH } = useWindowDimensions(), ins = useSafeAreaInsets();
  const [level, setLevel] = useState(0);
  useEffect(() => setLevel(0), [winH, showCode]);
  const box = useRef<View>(null);
  const fit = () => {
    if (showCode || level >= 3) return;
    box.current?.measureInWindow((_x, top, _w, h) => { if (top > 0 && top + h > winH - ins.bottom - 12) setLevel(l => Math.min(3, l + 1)); });
  };
  const gap = level ? 10 : 14, planPad = level >= 2 ? 8 : level ? 10 : 14;

  // On opening: a payment the server has not counted yet (its webhook lost, or the buyer never came back here) counts now.
  useEffect(() => { if (pay && user && !guest && !paid) syncPremium().catch(() => {}); }, [!!pay, !!user]);

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
  // A wrong code: the field turns red and gives a short shake side to side, as iOS does (Mojtaba 2026-10-20), until
  // the code is changed.
  const [bad, setBad] = useState(false);
  const [shake] = useState(() => new Animated.Value(0));
  const nudge = () => {
    if (Platform.OS !== 'web') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    shake.setValue(0);
    const step = (to: number, ms: number) => Animated.timing(shake, { toValue: to, duration: ms, easing: Easing.out(Easing.quad), useNativeDriver: Platform.OS !== 'web' });
    Animated.sequence([step(-10, 50), step(10, 70), step(-7, 60), step(6, 55), step(-3, 50), step(0, 45)]).start();
  };
  const redeem = async () => {
    if (!code.trim()) return;
    setRedeeming(true); setMsg(null); setBad(false);
    try { await redeemPromo(code.trim()); setCode(''); setMsg({ ok: true, text: t('کد تخفیف ثبت شد و نسخه‌ی ویژه {0} روز رایگان برای شما فعال است.', faNum(pay?.promo ?? 3)) }); }
    catch (e) { setBad(true); nudge(); setMsg({ ok: false, text: e instanceof Error && e.message ? e.message : 'کد تخفیف ثبت نشد؛ دوباره امتحان کنید.' }); }
    setRedeeming(false);
  };
  const gp = usePlayBilling(setMsg);
  const check = async () => { setBusy('check'); try { await syncPremium(); } catch { try { await refresh(); } catch {} } setBusy(null); };

  return (
    <SubPage title="نسخه‌ی ویژه" maxWidth={560} gap={0}>
      <View ref={box} onLayout={() => setTimeout(fit, 0)} style={{ gap }}>
      {/* What premium adds, one under the other (smaller when the screen is short), and one line on paying. */}
      <View style={{ gap: level >= 2 ? 6 : level ? 9 : 12, paddingHorizontal: 4 }}>
        <Perk small={level >= 2} title="توضیح هر پاسخ با هوش مصنوعی" />
        <Perk small={level >= 2} title="جمع‌بندی اشتباهات هر آزمون با هوش مصنوعی" />
        <Perk small={level >= 2} title="خواندن سؤال‌ها و گزینه‌ها با صدا" />
        <Perk small={level >= 2} title="شنیدن توضیح‌ها به فارسی" />
        <T style={{ color: c.muted, fontSize: level >= 2 ? 11.5 : 12.5, marginTop: 2 }}>یک بار پرداخت، بدون تمدید خودکار</T>
      </View>

      {premium && level >= 3 ? (
        <Card style={{ flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12 }}>
          <Icon name="checkCircle" size={24} color={c.ok} />
          <View style={{ flex: 1 }}>
            <T style={{ fontWeight: '700', fontSize: 14.5 }}>نسخه‌ی ویژه برای حساب شما فعال است</T>
            {until > Date.now() ? <T style={{ color: c.muted, fontSize: 12.5 }}>{t('فعال تا {0}', fmtDay(until))}</T> : null}
          </View>
        </Card>
      ) : premium ? (
        <Card style={{ gap: 8, alignItems: 'center' }}>
          <Icon name="checkCircle" size={36} color={c.ok} />
          <T style={{ fontWeight: '700', fontSize: 17, textAlign: 'center' }}>نسخه‌ی ویژه برای حساب شما فعال است</T>
          {until > Date.now() ? <T style={{ color: c.muted, fontSize: 13 }}>{t('فعال تا {0}', fmtDay(until))}</T> : null}
        </Card>
      ) : until ? (
        <Card><T style={{ color: c.muted, textAlign: 'center' }}>{t('نسخه‌ی ویژه‌ی شما {0} تمام شد.', fmtDay(until))}</T></Card>
      ) : null}
      {showTrial ? (
        <Card style={{ gap: 10, alignItems: 'center', paddingVertical: 18 }}>
          <Icon name="sparkles" size={28} color={c.text} />
          <T style={{ fontWeight: '700', fontSize: 16, textAlign: 'center' }}>{t('{0} روز رایگان', faNum(pay?.trial ?? 1))}</T>
          <T style={{ color: c.muted, fontSize: 13, lineHeight: 21, textAlign: 'center' }}>همه‌ی امکانات نسخه‌ی ویژه، بی‌پرداخت و بی‌کد؛ برای هر حساب یک بار.</T>
          <Button big icon="sparkles" label={trialing ? 'در حال فعال کردن…' : t('شروع {0} روز استفاده‌ی رایگان', faNum(pay?.trial ?? 1))} onPress={trial} disabled={trialing} style={{ alignSelf: 'stretch', marginTop: 4 }} />
        </Card>
      ) : null}
      {guest && !premium ? (
        // A guest buys nothing and enters no code: the pass would go with the browser's session. They make an account.
        <Card style={{ gap: 10, alignItems: 'center', paddingVertical: 22 }}>
          <Icon name="personAdd" size={30} color={c.text} />
          <T style={{ fontWeight: '700', fontSize: 16, textAlign: 'center' }}>برای نسخه‌ی ویژه حساب کاربری بسازید</T>
          <T style={{ color: c.muted, fontSize: 13, lineHeight: 22, textAlign: 'center' }}>کاربر مهمان نمی‌تواند نسخه‌ی ویژه بخرد یا کد تخفیف بزند. پیشرفت حساب مهمان به حساب تازه منتقل نمی‌شود.</T>
          <Button big icon="personAdd" label="ساخت حساب کاربری" onPress={() => { logout().catch(() => {}); }} style={{ alignSelf: 'stretch', marginTop: 4 }} />
        </Card>
      ) : STORE_APP && gp.on ? (
        <Card style={{ gap: level ? 9 : 12, ...(level ? { paddingVertical: 12 } : null) }}>
          <T style={{ fontWeight: '700', fontSize: 16 }}>{premium ? 'تمدید' : 'انتخاب مدت'}</T>
          {gp.items === null ? <T style={{ color: c.muted, textAlign: 'center' }}>در حال دریافت قیمت‌ها از Google Play…</T>
            : !gp.items.length ? <T style={{ color: c.muted, textAlign: 'center' }}>خرید در Google Play الان در دسترس نیست.</T> : (
            <View accessibilityRole="radiogroup" style={{ gap: level ? 8 : 10 }}>
              {gp.items.map(x => {
                const id = x.id.replace(/^pass_/, '') as Plan['id'];
                return <PlanOption key={x.id} pad={planPad} plan={{ id, days: 0, price: 0 }} priceText={x.price} on={plan === id} best={id === 'quarter'} onPress={() => setPlan(id)} />;
              })}
            </View>
          )}
          {premium && level < 3 ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>روزهای خرید تازه به آخر نسخه‌ی ویژه‌ی فعلی شما اضافه می‌شود.</T> : null}
          <Button big={level < 2} icon="lock" label={gp.busy ? 'در حال خرید…' : premium ? 'تمدید نسخه‌ی ویژه' : 'خرید نسخه‌ی ویژه'} onPress={() => gp.buy(`pass_${plan}`)} disabled={gp.busy || !gp.items?.length} />
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20, textAlign: 'center' }}>پرداخت امن با Google Play.</T>
        </Card>
      ) : pay && STORE_APP ? (
        <Card style={{ gap: 10, alignItems: 'center', paddingVertical: 18 }}>
          <Icon name="info" size={26} color={c.muted} />
          <T style={{ color: c.muted, fontSize: 13.5, lineHeight: 22, textAlign: 'center' }}>{premium ? 'نسخه‌ی ویژه را نمی‌توان در این نسخه‌ی اپ تمدید کرد.' : 'نسخه‌ی ویژه را نمی‌توان در این نسخه‌ی اپ خرید. اگر حساب شما نسخه‌ی ویژه دارد، اینجا هم فعال است.'}</T>
          <Button kind="glass" icon="refresh" label="بررسی دوباره‌ی حساب" onPress={check} disabled={!!busy} />
        </Card>
      ) : pay ? (
        <Card style={{ gap: level ? 9 : 12, ...(level ? { paddingVertical: 12 } : null) }}>
          <T style={{ fontWeight: '700', fontSize: 16 }}>{premium ? 'تمدید' : 'انتخاب مدت'}</T>
          <View accessibilityRole="radiogroup" style={{ gap: level ? 8 : 10 }}>
            {pay.plans.map(p => <PlanOption key={p.id} pad={planPad} plan={p} on={plan === p.id} best={p.id === 'quarter'} onPress={() => setPlan(p.id)} />)}
          </View>
          {premium && level < 3 ? <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>روزهای خرید تازه به آخر نسخه‌ی ویژه‌ی فعلی شما اضافه می‌شود.</T> : null}
          <Button big={level < 2} icon="lock" label={busy === 'buy' ? 'در حال باز کردن صفحه‌ی پرداخت…' : busy === 'check' ? 'در حال تأیید پرداخت…' : premium ? 'تمدید نسخه‌ی ویژه' : 'خرید نسخه‌ی ویژه'} onPress={buy} disabled={!!busy} />
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20, textAlign: 'center' }}>پرداخت امن با Stripe: کارت بانکی، Apple Pay یا Google Pay.</T>
          {pay.test ? <T style={{ color: c.bad, fontSize: 12.5, lineHeight: 20, textAlign: 'center' }}>حالت آزمایشی: با کارت 4242 4242 4242 4242 پرداخت کنید؛ پولی کم نمی‌شود.</T> : null}
          {Platform.OS !== 'web' ? <Button kind="glass" icon="refresh" label="پرداخت کردم؛ بررسی دوباره" onPress={check} disabled={!!busy} /> : null}
        </Card>
      ) : null}
      {/* A trial code, until this account has used one. */}
      {showCode && pay ? (
        <Card style={{ gap: 10 }}>
          <T style={{ fontWeight: '700', fontSize: 16 }}>کد تخفیف</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{t('با کد تخفیف، نسخه‌ی ویژه {0} روز رایگان برای شما فعال می‌شود (برای هر حساب یک بار).', faNum(pay.promo ?? 3))}</T>
          <View style={{ gap: 10 }}>
            <Animated.View style={{ transform: [{ translateX: shake }] }}>
              <TextInput value={code} onChangeText={v => { setCode(v); if (bad) { setBad(false); setMsg(null); } }} onSubmitEditing={redeem} autoCapitalize="characters" autoCorrect={false} maxLength={64}
                placeholder={t('کد تخفیف')} placeholderTextColor={c.faint} accessibilityLabel={t('کد تخفیف')}
                style={{ height: 48, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1.5, borderColor: bad ? c.bad : c.line, backgroundColor: bad ? c.badSoft : c.surface, color: bad ? c.bad : c.text, fontSize: 16, fontFamily: 'Inter-600', letterSpacing: 1, textAlign: 'center' }} />
            </Animated.View>
            <Button label={redeeming ? 'در حال ثبت…' : 'ثبت کد'} onPress={redeem} disabled={redeeming || !code.trim()} />
          </View>
        </Card>
      ) : null}
      {!pay && !premium && !gp.on ? (
        <Card><T style={{ color: c.muted, textAlign: 'center' }}>خرید نسخه‌ی ویژه الان فعال نیست.</T></Card>
      ) : null}

      {msg ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4 }}>
          <Icon name={msg.ok ? 'checkCircle' : 'warning'} size={18} color={msg.ok ? c.ok : c.bad} />
          <T style={{ flex: 1, fontSize: 13.5, color: msg.ok ? c.ok : c.bad }}>{msg.text}</T>
        </View>
      ) : null}
      </View>
    </SubPage>
  );
}
