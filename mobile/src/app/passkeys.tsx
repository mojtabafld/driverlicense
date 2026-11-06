// «Passkey» (Mojtaba 2026-11-06), from the settings: the account's passkeys (server: passkey.js), adding one on this
// device (its fingerprint, face or PIN) and removing one. Signing in with one is on the sign-in screen
// (ui/welcome.tsx). The web version only for now; the Android app needs a new build with its own module.
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { t } from '@/lib/i18n';
import { fmtDateTime } from '@/lib/names';
import { cancelled, passkeyAdd, passkeyList, passkeyOk, passkeyRemove, type Passkey } from '@/lib/passkey';
import { Icon } from '@/ui/icon';
import { ArcButton, Card, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

export default function PasskeysPage() {
  const c = useColors();
  const [list, setList] = useState<Passkey[] | null>(null);
  const [err, setErr] = useState('');
  const [ok, setOk] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => { passkeyList().then(setList, e => setErr(e.message)); }, []);
  const run = async (f: () => Promise<Passkey[]>, done?: string) => {
    if (busy) return;
    tap(); setBusy(true); setErr(''); setOk('');
    try { setList(await f()); if (done) setOk(done); }
    catch (e: any) { if (!cancelled(e)) setErr(e?.message || String(e)); }
    finally { setBusy(false); }
  };
  return (
    <SubPage title="Passkey" subtitle="ورود با اثر انگشت، چهره یا قفل دستگاه">
      <Card style={{ gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Icon name="fingerprint" size={22} color={c.link} />
          <T style={{ flex: 1, fontWeight: '700', fontSize: 15 }}>بدون رمز و بدون کد</T>
        </View>
        <T style={{ color: c.muted, fontSize: 13, lineHeight: 21 }}>با Passkey فقط با اثر انگشت، تشخیص چهره یا قفل همین دستگاه وارد می‌شوید. رمزی نیست که لو برود، و روی سایت‌های جعلی هم کار نمی‌کند.</T>
      </Card>
      {err ? <T style={{ color: c.bad, fontSize: 13 }}>{err}</T> : null}
      {ok ? <T style={{ color: c.ok, fontSize: 13 }}>{ok}</T> : null}
      {!list ? <Card><T style={{ color: c.muted, fontSize: 13.5 }}>در حال بارگذاری…</T></Card> : list.length ? (
        <Card style={{ gap: 0, paddingVertical: 4 }}>
          {list.map((k, i) => (
            <View key={k.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: c.line }}>
              <View style={{ width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
                <Icon name="fingerprint" size={19} color={c.text} />
              </View>
              <View style={{ flex: 1, gap: 1 }}>
                <T raw style={{ fontWeight: '700', fontSize: 14.5 }} numberOfLines={1}>{k.name}</T>
                <T style={{ color: c.muted, fontSize: 12 }}>{k.used ? t('آخرین استفاده: {0}', fmtDateTime(k.used)) : t('ساخته‌شده: {0}', fmtDateTime(k.created))}</T>
              </View>
              <Pressable onPress={() => run(() => passkeyRemove(k.id))} disabled={busy} accessibilityRole="button" accessibilityLabel={t('حذف این Passkey')} hitSlop={6}
                style={({ pressed }) => ({ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99, backgroundColor: c.badSoft, opacity: pressed || busy ? 0.6 : 1 })}>
                <T style={{ color: c.bad, fontSize: 12.5, fontWeight: '700' }}>حذف</T>
              </Pressable>
            </View>
          ))}
        </Card>
      ) : <Card><T style={{ color: c.muted, fontSize: 13.5 }}>هنوز Passkey‌ای نساخته‌اید.</T></Card>}
      {passkeyOk()
        ? <ArcButton label={busy ? '…' : 'ساخت Passkey روی این دستگاه'} icon="plus" onPress={() => run(passkeyAdd, 'Passkey ساخته شد. از این به بعد می‌توانید با آن وارد شوید.')} disabled={busy} />
        : <T style={{ color: c.faint, fontSize: 12.5, lineHeight: 20 }}>ساخت Passkey فعلاً فقط در نسخه‌ی وب (teori.bitlane.app) ممکن است.</T>}
      <T style={{ color: c.faint, fontSize: 12, lineHeight: 19 }}>ورود با کد ایمیلی و گوگل مثل قبل کار می‌کند. Passkey روی خود دستگاه می‌ماند و اگر با حساب گوگل یا iCloud همگام شود، روی دستگاه‌های دیگرتان هم کار می‌کند.</T>
      <View style={{ height: 40 }} />
    </SubPage>
  );
}
