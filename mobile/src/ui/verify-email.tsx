// A new account waiting for its email link (the server's email confirmation, mail.js): over everything until the
// link is opened. It names the address, sends the link again (or to a corrected address) and signs out.
import { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';

import { t } from '@/lib/i18n';
import { useApp } from '@/lib/store';
import { Field } from './field';
import { Icon } from './icon';
import { Backdrop, Button, Card, T } from './kit';
import { useColors } from './theme';

// Back from an expired or used link: the address bar says ?verified=0.
const badLink = Platform.OS === 'web' && typeof window !== 'undefined' && /[?&]verified=0\b/.test(window.location.search);

export function VerifyEmail() {
  const c = useColors();
  const { user, sendVerify, refresh, logout } = useApp();
  const [busy, setBusy] = useState<'send' | 'check' | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(badLink ? { ok: false, text: 'این لینک دیگر کار نمی‌کند؛ یک لینک تازه بفرستید.' } : null);
  const [edit, setEdit] = useState(false), [email, setEmail] = useState(user?.email ?? '');
  const send = async () => {
    setBusy('send'); setMsg(null);
    try {
      const to = edit ? email.trim() : undefined;
      await sendVerify(to); setEdit(false);
      setMsg({ ok: true, text: 'ایمیل تازه فرستاده شد؛ صندوق ورودی و پوشه‌ی هرزنامه (Spam) را ببینید.' });
    } catch (e) { setMsg({ ok: false, text: e instanceof Error && e.message ? e.message : 'ایمیل فرستاده نشد؛ کمی بعد دوباره امتحان کنید.' }); }
    setBusy(null);
  };
  const check = async () => {
    setBusy('check'); setMsg(null);
    try { await refresh(); } catch {}
    setBusy(null);
    setMsg({ ok: false, text: 'هنوز تأیید نشده است؛ روی لینک داخل ایمیل بزنید.' });
  };
  return (
    <Backdrop>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
        <View style={{ width: '100%', maxWidth: 440, alignSelf: 'center', gap: 14 }}>
          <Card style={{ gap: 12, alignItems: 'center', paddingVertical: 26 }}>
            <View style={{ width: 60, height: 60, borderRadius: 30, alignItems: 'center', justifyContent: 'center', backgroundColor: c.strong }}>
              <Icon name="send" size={26} color={c.strongFg} />
            </View>
            <T style={{ fontSize: 20, fontWeight: '800', textAlign: 'center' }}>ایمیل خود را تأیید کنید</T>
            <T style={{ color: c.muted, fontSize: 14, lineHeight: 24, textAlign: 'center' }}>{t('یک لینک فعال‌سازی به {0} فرستادیم. روی آن بزنید تا حساب شما فعال شود.', user?.email ?? '')}</T>
          </Card>
          {edit ? <Field icon="send" label="ایمیل" value={email} onChange={v => setEmail(v.replace(/\s/g, ''))} ltr onSubmit={send} /> : null}
          {msg ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 4 }}>
              <Icon name={msg.ok ? 'checkCircle' : 'warning'} size={18} color={msg.ok ? c.ok : c.bad} />
              <T style={{ flex: 1, fontSize: 13.5, color: msg.ok ? c.ok : c.bad }}>{msg.text}</T>
            </View>
          ) : null}
          <Button big icon="refresh" label={busy === 'check' ? 'در حال بررسی…' : 'تأیید کردم'} onPress={check} disabled={!!busy} />
          <Button kind="glass" icon="send" label={busy === 'send' ? 'در حال فرستادن…' : edit ? 'فرستادن به این ایمیل' : 'ارسال دوباره‌ی ایمیل'} onPress={send} disabled={!!busy || (edit && !/^\S+@\S+\.\S+$/.test(email.trim()))} />
          {edit ? null : <Button kind="glass" icon="edit" label="ایمیل را اشتباه نوشته‌ام" onPress={() => { setEdit(true); setMsg(null); }} disabled={!!busy} />}
          <Button kind="glass" icon="exit" label="خروج از حساب" onPress={() => { logout().catch(() => {}); }} disabled={!!busy} />
        </View>
      </ScrollView>
    </Backdrop>
  );
}
