// «پیام‌ها»: the news for every user, newest first (lib/news.ts; written by the admin in the dashboard). Opening the
// page marks them seen, so the bell's red dot goes.
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';

import { DATE_LOCALE } from '@/lib/i18n';
import { clearNews, markNewsSeen, restoreNews, useNews } from '@/lib/news';
import { Icon } from '@/ui/icon';
import { T, tap } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

const day = (at: number) => new Date(at).toLocaleDateString(DATE_LOCALE, { timeZone: 'Europe/Copenhagen', day: 'numeric', month: 'long', year: 'numeric' });

export default function NewsPage() {
  const c = useColors(), { items, loaded, restorable } = useNews();
  useEffect(() => { if (loaded) markNewsSeen(); }, [loaded, items.length]);
  // «پاکسازی» hides every message on this device; «بازسازی» brings back those of the last seven days (Mojtaba 2026-10-30).
  const action = (label: string, icon: 'trash' | 'refresh', onPress: () => void) => (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button" style={({ pressed }) => ({ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
      height: 44, borderRadius: 22, backgroundColor: c.surface, borderWidth: 1, borderColor: c.cardBorder, opacity: pressed ? 0.7 : 1 })}>
      <Icon name={icon} size={17} color={c.text} />
      <T style={{ fontSize: 14, fontWeight: '600' }}>{label}</T>
    </Pressable>
  );
  return (
    <SubPage title="پیام‌ها" subtitle="خبرها، به‌روزرسانی‌ها و راهنمایی‌های تازه" gap={12}>
      {loaded && (items.length || restorable) ? (
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {items.length ? action('پاکسازی', 'trash', clearNews) : null}
          {restorable ? action('بازسازی پیام‌های ۷ روز اخیر', 'refresh', restoreNews) : null}
        </View>
      ) : null}
      {items.length ? items.map(n => (
        <View key={n.id} style={{ gap: 6, padding: 16, borderRadius: 20, backgroundColor: c.surface, borderWidth: 1, borderColor: c.cardBorder }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
              <Icon name="bell" size={18} color={c.text} />
            </View>
            <View style={{ flex: 1, gap: 1 }}>
              {n.title ? <T raw keepDa style={{ fontSize: 16, lineHeight: 24, fontWeight: '700' }}>{n.title}</T> : null}
              <T raw style={{ fontSize: 12.5, color: c.muted }}>{day(n.at)}</T>
            </View>
          </View>
          {n.text ? <T raw keepDa style={{ fontSize: 14.5, lineHeight: 24 }}>{n.text}</T> : null}
        </View>
      )) : (
        <View style={{ alignItems: 'center', gap: 10, paddingVertical: 40 }}>
          <View style={{ width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
            <Icon name="bell" size={26} color={c.muted} />
          </View>
          <T style={{ fontSize: 15, color: c.muted }}>{loaded ? 'هنوز پیامی نیست.' : '…'}</T>
        </View>
      )}
    </SubPage>
  );
}
