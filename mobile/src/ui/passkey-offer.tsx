// The offer to add a passkey (Mojtaba 2026-11-06): on the home page after signing in, once per account, for an account
// with no passkey that was never asked and never removed one (the server's pkOffer). Once answered or closed, the
// server is told (passkey/asked) and it does not come again; while home is covered (the first sign-in's warm-up, say)
// it waits. Only where passkeys work (the browser's WebAuthn, Android 9+).
import { useIsFocused } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

import { cancelled, passkeyAdd, passkeyAsked, passkeyOk } from '@/lib/passkey';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { ArcButton, T, tap } from './kit';
import { Sheet } from './sheet';
import { useColors } from './theme';

export function PasskeyOffer({ wait }: { wait?: boolean }) {
  const c = useColors(), focused = useIsFocused();
  const { user } = useApp();
  const [open, setOpen] = useState(false), [busy, setBusy] = useState(false), [err, setErr] = useState(''), [done, setDone] = useState(false);
  const shown = useRef(false);
  const want = !wait && !!user && !!user.pkOffer && !user.guest && passkeyOk();
  useEffect(() => {
    if (!want || !focused || shown.current) return;
    // (a moment after home shows, so it does not come on top of the first screen's own opening)
    const t = setTimeout(() => { if (shown.current) return; shown.current = true; setOpen(true); }, 2000);
    return () => clearTimeout(t);
  }, [want, focused]);
  const close = () => { setOpen(false); passkeyAsked(); };
  const add = async () => {
    if (busy) return;
    tap(); setBusy(true); setErr('');
    try { await passkeyAdd(); setDone(true); setTimeout(close, 1400); }
    catch (e: any) { if (!cancelled(e)) setErr(e?.message || String(e)); }
    finally { setBusy(false); }
  };
  return (
    <Sheet open={open && focused} onClose={close}>
      <View style={{ gap: 12, paddingHorizontal: 4, paddingBottom: 4 }}>
        <View style={{ width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft, alignSelf: 'center' }}>
          <Icon name="fingerprint" size={28} color={c.link} />
        </View>
        <T style={{ fontSize: 18, lineHeight: 26, fontWeight: '700', textAlign: 'center' }}>ورود سریع‌تر با Passkey</T>
        <T style={{ color: c.muted, fontSize: 14, lineHeight: 22, textAlign: 'center' }}>دفعه‌ی بعد فقط با اثر انگشت، چهره یا قفل دستگاه وارد شوید؛ بدون رمز و بدون کد. اگر نخواستید، بعداً هم از تنظیمات ← Passkey می‌توانید بسازید.</T>
        {err ? <T style={{ color: c.bad, fontSize: 13, textAlign: 'center' }}>{err}</T> : null}
        {done ? <T style={{ color: c.ok, fontSize: 14, fontWeight: '700', textAlign: 'center' }}>Passkey ساخته شد.</T> : <>
          <ArcButton label={busy ? '…' : 'ساخت Passkey'} icon="fingerprint" onPress={add} disabled={busy} />
          <ArcButton label="حالا نه" variant="secondary" onPress={() => { tap(); close(); }} />
        </>}
      </View>
    </Sheet>
  );
}
