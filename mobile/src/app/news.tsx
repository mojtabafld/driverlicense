// «پیام‌ها»: the news for every user, newest first (lib/news.ts; written by the admin in the dashboard). Opening the
// page marks them seen, so the bell's red dot goes.
import { useEffect } from 'react';
import { View } from 'react-native';

import { DATE_LOCALE } from '@/lib/i18n';
import { markNewsSeen, useNews } from '@/lib/news';
import { Icon } from '@/ui/icon';
import { T } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

const day = (at: number) => new Date(at).toLocaleDateString(DATE_LOCALE, { timeZone: 'Europe/Copenhagen', day: 'numeric', month: 'long', year: 'numeric' });

export default function NewsPage() {
  const c = useColors(), { items, loaded } = useNews();
  useEffect(() => { if (loaded) markNewsSeen(); }, [loaded, items.length]);
  return (
    <SubPage title="پیام‌ها" subtitle="خبرها، به‌روزرسانی‌ها و راهنمایی‌های تازه" gap={12}>
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
