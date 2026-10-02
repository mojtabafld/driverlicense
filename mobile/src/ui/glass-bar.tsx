// The floating Liquid Glass bar of the exam and of the step-by-step review, left to right in the questions' language
// (Danish / English): a button at each end and something in the middle (the position).
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IconName } from './icon';
import { L, tap } from './kit';
import { LiquidGlass, useIOSBar } from './liquid';

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

// The position in the middle of the bar (Latin digits).
export function BarCount({ n, of }: { n: number; of: number }) {
  const ios = useIOSBar();
  return <L style={{ fontSize: 20, lineHeight: 26, color: ios.label, fontWeight: '700', textAlign: 'center', fontVariant: ['tabular-nums'] }}>{n} / {of}</L>;
}

// Buttons of the bar, as iOS 26/27 draws bar buttons: next filled in the system blue, hand in in the system green,
// previous a grey capsule with blue text. `lead`: icon before the label.
export function FootBtn({ label, onPress, disabled, submit, primary, icon, lead }: { label: string; onPress: () => void; disabled?: boolean; submit?: boolean; primary?: boolean; icon: IconName; lead?: boolean }) {
  const ios = useIOSBar();
  const solid = submit || primary, fg = solid ? '#fff' : ios.tint;
  return (
    <Pressable disabled={disabled} onPress={() => { tap(); onPress(); }} style={({ pressed }) => ({ opacity: disabled ? 0.35 : pressed ? 0.8 : 1 })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, height: 46, minWidth: 104, paddingHorizontal: 18, borderRadius: 23, justifyContent: 'center',
        backgroundColor: submit ? ios.green : primary ? ios.tint : ios.fill }}>
        {lead ? <Icon name={icon} size={16} color={fg} weight="semibold" /> : null}
        <L style={{ color: fg, fontWeight: '700', fontSize: 15.5, lineHeight: 22, textAlign: 'center' }}>{label}</L>
        {!lead ? <Icon name={icon} size={16} color={fg} weight={icon === 'check' ? 'bold' : 'semibold'} /> : null}
      </View>
    </Pressable>
  );
}
