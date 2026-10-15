// The colour themes (main site): under «ظاهر» in the settings a row «رنگ برنامه» with the chosen theme opens a sheet
// of ten round swatches in two rows, each the theme's page with its accent inside and its name under it; the chosen
// one has a ring and a ✓. A tap keeps it and reloads the page in it.
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Icon } from './icon';
import { T, tap } from './kit';
import { PALETTE, PALETTES, setPalette, swatch } from './palette';
import { Sheet } from './sheet';
import { useColors, useIsDark } from './theme';

function PalettePick() {
  const c = useColors(), dark = useIsDark();
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 14, paddingTop: 2 }}>
      {PALETTES.map(p => {
        const on = p.id === PALETTE, s = swatch(p);
        return (
          <Pressable key={p.id} onPress={() => { tap(); setPalette(p.id); }} accessibilityRole="radio" accessibilityState={{ selected: on }}
            accessibilityLabel={p.name} style={{ width: '20%', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 48, height: 48, borderRadius: 24, padding: 3, borderWidth: 2, borderColor: on ? c.text : 'transparent' }}>
              <View style={{ flex: 1, borderRadius: 20, backgroundColor: dark ? s.bg : '#ffffff', alignItems: 'center', justifyContent: 'center',
                borderWidth: dark ? 0 : 1, borderColor: c.line }}>
                <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: dark ? s.accent : s.accentL, alignItems: 'center', justifyContent: 'center' }}>
                  {on ? <Icon name="check" size={12} color={dark ? (p.id === 'mono' || p.id === 'lime' || p.id === 'sky' || p.id === 'emerald' || p.id === 'amber' ? '#111' : '#fff') : '#fff'} weight="bold" /> : null}
                </View>
              </View>
            </View>
            <T style={{ fontSize: 12, lineHeight: 17, fontWeight: on ? '700' : '500', color: on ? c.text : c.muted, textAlign: 'center' }} numberOfLines={1}>{p.name}</T>
          </Pressable>
        );
      })}
    </View>
  );
}

export function PaletteRow() {
  const c = useColors(), dark = useIsDark(), [open, setOpen] = useState(false);
  const cur = PALETTES.find(p => p.id === PALETTE)!, s = swatch(cur);
  return (
    <>
      <Pressable onPress={() => { tap(); setOpen(true); }} accessibilityRole="button" accessibilityLabel="رنگ برنامه"
        style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6, opacity: pressed ? 0.7 : 1 })}>
        <View style={{ width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: dark ? s.bg : c.surface2 }}>
          <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: dark ? s.accent : s.accentL }} />
        </View>
        <View style={{ flex: 1 }}>
          <T style={{ fontWeight: '700' }}>رنگ برنامه</T>
          <T style={{ color: c.muted, fontSize: 12.5, lineHeight: 20 }}>{cur.name}</T>
        </View>
        <Icon name="chevronLeft" size={16} color={c.faint} weight="semibold" />
      </Pressable>
      <Sheet open={open} onClose={() => setOpen(false)} style={{ gap: 16 }}>
        <View style={{ gap: 2 }}>
          <T style={{ fontSize: 19, lineHeight: 28, fontWeight: '700', textAlign: 'center' }}>رنگ برنامه</T>
          <T style={{ fontSize: 13, color: c.muted, textAlign: 'center' }}>یکی از تم‌های رنگی را انتخاب کنید؛ هم در حالت روشن و هم تیره اعمال می‌شود.</T>
        </View>
        <PalettePick />
      </Sheet>
    </>
  );
}
