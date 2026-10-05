// The floating Liquid Glass bar of the exam and of the step-by-step review, left to right in the questions' language
// (Danish / English): a button at each end and something in the middle (the position).
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from './icon';
import { faNum } from '@/lib/logic';
import { L, T, tap } from './kit';
import { LiquidGlass } from './liquid';
import { useColors } from './theme';

export function GlassBar({ start, middle, end }: { start: React.ReactNode; middle: React.ReactNode; end: React.ReactNode }) {
  const ins = useSafeAreaInsets();
  return (
    <View pointerEvents="box-none" style={{ position: 'absolute', left: 0, right: 0, bottom: ins.bottom + 14, paddingHorizontal: 16, alignItems: 'center' }}>
      <LiquidGlass bar r={30} style={{ flexDirection: 'row', direction: 'ltr', alignItems: 'center', gap: 8, padding: 6, width: '100%', maxWidth: 520 } as any}>
        {start}
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>{middle}</View>
        {end}
      </LiquidGlass>
    </View>
  );
}

// The position in the middle of the bar (Persian digits), in the grey of the previous / next buttons (`navNum`).
export function BarCount({ n, of }: { n: number; of: number }) {
  const c = useColors();
  return <T style={{ fontSize: 21, lineHeight: 30, color: c.navNum, fontWeight: '500', textAlign: 'center', writingDirection: 'ltr' }}>{faNum(n)} / {faNum(of)}</T>;
}

// Buttons of the bar. Previous / next are round grey buttons with an arrow (`round`; the label is for screen
// readers; `nav` colours), pale when they cannot be used; hand in is a round check in the submit colour (`submit`). Without `round`, a labelled
// capsule, in the submit colour with `submit`. `lead`: icon before the label.
export function FootBtn({ label, onPress, disabled, submit, icon, lead, round }: { label: string; onPress: () => void; disabled?: boolean; submit?: boolean; primary?: boolean; icon: IconName; lead?: boolean; round?: boolean }) {
  const c = useColors();
  const fg = c.strongFg; // on `submit` / `strong` (white, or near-black on the dark Uber look's light grey)
  if (round) {
    return (
      <Pressable disabled={disabled} onPress={() => { tap(); onPress(); }} accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ disabled }}
        style={({ pressed }) => ({ width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center',
          backgroundColor: disabled ? c.navOff : submit ? c.submit : c.nav, opacity: pressed ? 0.8 : 1 })}>
        <Icon name={icon} size={icon === 'check' ? 22 : 20} color={disabled ? c.faint : submit ? fg : c.navFg} weight={icon === 'check' ? 'bold' : 'semibold'} />
      </Pressable>
    );
  }
  return (
    <Pressable disabled={disabled} onPress={() => { tap(); onPress(); }} style={({ pressed }) => ({ opacity: disabled ? 0.35 : pressed ? 0.8 : 1 })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, height: 48, minWidth: 104, paddingHorizontal: 18, borderRadius: 24, justifyContent: 'center',
        backgroundColor: submit ? c.submit : c.strong }}>
        {lead ? <Icon name={icon} size={16} color={fg} weight="semibold" /> : null}
        <L style={{ color: fg, fontWeight: '700', fontSize: 15.5, lineHeight: 22, textAlign: 'center' }}>{label}</L>
        {!lead ? <Icon name={icon} size={16} color={fg} weight={icon === 'check' ? 'bold' : 'semibold'} /> : null}
      </View>
    </Pressable>
  );
}
