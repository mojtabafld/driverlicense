// Shared parts of the teaching pages «علائم رانندگی» and «آموزش حق تقدم»: the groups' cards, an item's educational
// picture (made by the server; a soft tile with its code until then), text with **bold** parts.
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, View, type StyleProp, type TextStyle } from 'react-native';

import { API_URL } from '@/lib/config';
import type { GuideKind } from '@/lib/guide-data';
import { faNum } from '@/lib/logic';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { Card, L, T, tap } from './kit';
import { useColors } from './theme';

export const PIC_BG = '#f2f3f5'; // the pictures' own light background, the same in both themes

// The groups as cards, two to a row: the group's thumbnail, its title, a line about it and how many items it has.
// A card opens the group page by page (/guide-view).
export function CatGrid({ kind, cats }: { kind: GuideKind; cats: { id: string; title: string; blurb: string; thumb: string; items: unknown[] }[] }) {
  const c = useColors();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
      {cats.map(g => (
        <Pressable key={g.id} onPress={() => { tap(); router.push({ pathname: '/guide-view', params: { kind, cat: g.id } }); }}
          accessibilityRole="button" accessibilityLabel={`${g.title}، ${faNum(g.items.length)} مورد`}
          style={({ pressed }) => ({ width: '48.4%', opacity: pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}>
          <Card style={{ padding: 0, overflow: 'hidden', flex: 1 }}>
            <GuideImage k={g.thumb} aspect={4 / 3} flat />
            <View style={{ padding: 10, gap: 3, flex: 1 }}>
              <T style={{ fontSize: 14.5, lineHeight: 22, fontWeight: '700' }} numberOfLines={2}>{g.title}</T>
              <T style={{ fontSize: 12, lineHeight: 19, color: c.muted }} numberOfLines={2}>{g.blurb}</T>
              <View style={{ flex: 1 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99, backgroundColor: c.surface2 }}>
                  <T style={{ fontSize: 11.5, fontWeight: '600', color: c.muted }}>{faNum(g.items.length)} مورد</T>
                </View>
                <View style={{ flex: 1 }} />
                <Icon name="chevronLeft" size={14} color={c.faint} />
              </View>
            </View>
          </Card>
        </Pressable>
      ))}
    </View>
  );
}

// An item's picture at its aspect ratio; until the server has made it, a soft tile with `label` (e.g. the code), or
// only a small icon when `compact` (the list's thumbnails).
// `flat`: at the top of a card, flush with its edges (no rounding or edge of its own).
export function GuideImage({ k, aspect, label, radius = 12, compact, flat }: { k: string; aspect: number; label?: string; radius?: number; compact?: boolean; flat?: boolean }) {
  const c = useColors();
  const { guideArt } = useApp();
  const v = guideArt[k];
  return (
    <View style={{ width: '100%', aspectRatio: aspect, borderRadius: flat ? 0 : radius, overflow: 'hidden', backgroundColor: PIC_BG, alignItems: 'center', justifyContent: 'center' }}>
      {v ? <Image source={{ uri: `${API_URL}/guide-art/${k}.png?v=${v}` }} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} contentFit="cover" transition={200} />
        : compact ? <Icon name="sign" size={16} color="#9aa0a6" /> : (
          <View style={{ alignItems: 'center', gap: 6 }}>
            <Icon name="sign" size={30} color="#9aa0a6" />
            {label ? <L style={{ fontSize: 13, fontWeight: '700', color: '#7a8087' }}>{label}</L> : null}
            <T style={{ fontSize: 11, color: '#9aa0a6' }}>تصویر در حال آماده شدن</T>
          </View>
        )}
      {/* a hairline edge in the dark theme, so the light picture does not glare */}
      {flat ? null : <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: radius, borderWidth: 1, borderColor: c.line }} />}
    </View>
  );
}

// Text with **bold** parts.
export function Rich({ text, style }: { text: string; style?: StyleProp<TextStyle> }) {
  return (
    <T style={style}>
      {text.split(/(\*\*.+?\*\*)/g).map((p, i) => (/^\*\*.+\*\*$/.test(p) ? <T key={i} style={[style, { fontWeight: '800' }]}>{p.slice(2, -2)}</T> : p))}
    </T>
  );
}
