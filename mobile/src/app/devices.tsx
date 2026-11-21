// «دستگاه‌های من» (Mojtaba 2026-11-05), from the settings: the devices this account is signed in on (the server's live
// sessions, GET /api/devices), this one marked, each with when it was signed in and last used; one or every other one
// can be signed out (POST /api/devices/out). A new kind of device also gets the account an email (server's newSession).
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { api } from '@/lib/api';
import { t } from '@/lib/i18n';
import { fmtDateTime } from '@/lib/names';
import { Icon } from '@/ui/icon';
import { ArcButton, Card, T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

type Device = { id: string; name: string; at: number; seen: number; current: boolean; main?: boolean };

export default function DevicesPage() {
  const c = useColors();
  const [list, setList] = useState<Device[] | null>(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const load = () => api<{ devices: Device[] }>('GET', 'devices').then(d => { setList(d.devices); setErr(''); }, e => setErr(e.message));
  useEffect(() => { load(); }, []);
  const out = async (body: { id?: string; others?: boolean }) => {
    if (busy) return;
    tap(); setBusy(true);
    try { await api('POST', 'devices/out', body); await load(); } catch (e: any) { setErr(e?.message || String(e)); } finally { setBusy(false); }
  };
  // (the main device is signed out only on itself, so «every other» leaves it)
  const others = (list || []).filter(d => !d.current && !d.main);
  return (
    <SubPage title="دستگاه‌های من" subtitle="جاهایی که با این حساب وارد شده‌اید">
      {err ? <T style={{ color: c.bad, fontSize: 13 }}>{err}</T> : null}
      {!list ? <Card><T style={{ color: c.muted, fontSize: 13.5 }}>در حال بارگذاری…</T></Card> : (
        <Card style={{ gap: 0, paddingVertical: 4 }}>
          {list.map((d, i) => (
            <View key={d.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderTopWidth: i ? 1 : 0, borderTopColor: c.line }}>
              <View style={{ width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: d.current ? c.accentSoft : c.surface2 }}>
                <Icon name="phone" size={19} color={d.current ? c.link : c.text} />
              </View>
              <View style={{ flex: 1, gap: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <T raw style={{ flexShrink: 1, fontWeight: '700', fontSize: 14.5 }} numberOfLines={1}>{d.name}</T>
                  {d.main ? <View style={{ paddingHorizontal: 7, paddingVertical: 1, borderRadius: 99, backgroundColor: c.accentSoft }}><T style={{ color: c.link, fontSize: 11, fontWeight: '700' }}>دستگاه اصلی</T></View> : null}
                </View>
                <T style={{ color: c.muted, fontSize: 12 }}>{d.current ? 'همین دستگاه' : t('آخرین استفاده: {0}', fmtDateTime(d.seen))}</T>
              </View>
              {!d.current && !d.main ? (
                <Pressable onPress={() => out({ id: d.id })} disabled={busy} accessibilityRole="button" accessibilityLabel={t('خارج کردن این دستگاه')} hitSlop={6}
                  style={({ pressed }) => ({ paddingHorizontal: 12, paddingVertical: 7, borderRadius: 99, backgroundColor: c.badSoft, opacity: pressed || busy ? 0.6 : 1 })}>
                  <T style={{ color: c.bad, fontSize: 12.5, fontWeight: '700' }}>خارج کردن</T>
                </Pressable>
              ) : null}
            </View>
          ))}
        </Card>
      )}
      {others.length ? <ArcButton label="خروج از همه‌ی دستگاه‌های دیگر" icon="xmark" variant="secondary" onPress={() => out({ others: true })} /> : null}
      <T style={{ color: c.faint, fontSize: 12, lineHeight: 19 }}>اگر دستگاهی را نمی‌شناسید، آن را خارج کنید. دستگاه اصلی (همان که با آن ثبت‌نام کردید) فقط از روی خودش خارج می‌شود. هر ورود از نوع تازه‌ای از دستگاه به ایمیل شما خبر داده می‌شود؛ دستگاهی که یک ماه استفاده نشود خودکار خارج می‌شود.</T>
      <View style={{ height: 40 }} />
    </SubPage>
  );
}
