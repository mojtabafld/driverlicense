// The colour themes under «ظاهر» in the settings (main site): ten round swatches in two rows, each the theme's page
// with its accent inside, and its name under it; the chosen one has a ring and a ✓. A tap keeps it and reloads the page.
import { Pressable, View } from 'react-native';

import { Icon } from './icon';
import { T, tap } from './kit';
import { PALETTE, PALETTES, setPalette, swatch } from './palette';
import { useColors, useIsDark } from './theme';

export function PalettePick() {
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
