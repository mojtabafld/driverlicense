// A small question in the app's own look instead of the system's alert: a card over a dimmed page with a title, a
// line of text, optional content, and two buttons (stay / go on). The second one is red when it is `danger`.
import { Modal, Pressable, View } from 'react-native';

import { Icon, type IconName } from './icon';
import { T, tap } from './kit';
import { useColors, useIsDark } from './theme';

type Props = {
  open: boolean; title: string; text?: string; children?: React.ReactNode;
  cancel: string; ok: string; danger?: boolean; onCancel: () => void; onOk: () => void;
  // Flat icons before the two labels.
  cancelIcon?: IconName; okIcon?: IconName;
};
export function Confirm({ open, title, text, children, cancel, ok, danger, onCancel, onOk, cancelIcon = 'xmark', okIcon = 'check' }: Props) {
  const c = useColors(), dark = useIsDark();
  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable onPress={onCancel} accessibilityLabel={cancel}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: dark ? 'rgba(0,0,0,0.55)' : 'rgba(20,40,40,0.35)' }}>
        {/* The card itself does not close the dialog. */}
        <Pressable onPress={() => {}} accessibilityRole="alert"
          style={{ width: '100%', maxWidth: 360, padding: 20, gap: 14, borderRadius: 22, backgroundColor: c.surface, borderWidth: 1, borderColor: c.cardBorder,
            shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 24, shadowOffset: { width: 0, height: 10 }, elevation: 8 }}>
          <View style={{ gap: 6 }}>
            <T style={{ fontSize: 18, lineHeight: 28, fontWeight: '700', textAlign: 'center' }}>{title}</T>
            {text ? <T style={{ fontSize: 14.5, lineHeight: 24, color: c.muted, textAlign: 'center' }}>{text}</T> : null}
          </View>
          {children}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable onPress={() => { tap(); onCancel(); }} accessibilityRole="button" style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.8 : 1 })}>
              <View style={{ height: 48, borderRadius: 24, flexDirection: 'row', gap: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: c.accentSoft }}>
                <Icon name={cancelIcon} size={17} color={c.link} weight="semibold" />
                <T style={{ fontSize: 15, fontWeight: '700', color: c.link, textAlign: 'center' }}>{cancel}</T>
              </View>
            </Pressable>
            <Pressable onPress={() => { tap(); onOk(); }} accessibilityRole="button" style={({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1 })}>
              <View style={{ height: 48, borderRadius: 24, flexDirection: 'row', gap: 7, alignItems: 'center', justifyContent: 'center', backgroundColor: danger ? c.bad : c.accent }}>
                <Icon name={okIcon} size={17} color="#fff" weight="semibold" />
                <T style={{ fontSize: 15, fontWeight: '700', color: '#fff', textAlign: 'center' }}>{ok}</T>
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
