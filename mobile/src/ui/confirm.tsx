// A small question in the app's own look instead of the system's alert: a card over a dimmed page with a title, a
// line of text, optional content, and two buttons (stay / go on). The second one is red when it is `danger`. `icon`: a
// round badge above the title (red with `danger`). It comes in at once with its own short fade (the system Modal's
// fade is slow, ~300 ms) and a slight grow of the card.
import { useEffect, useState } from 'react';
import { Animated, Easing, Modal, Pressable, View } from 'react-native';

import { Icon, type IconName } from './icon';
import { ActionButton, T } from './kit';
import { useColors, useIsDark } from './theme';

type Props = {
  open: boolean; title: string; text?: string; children?: React.ReactNode;
  cancel: string; ok: string; danger?: boolean; onCancel: () => void; onOk: () => void;
  // Flat icons before the two labels.
  cancelIcon?: IconName; okIcon?: IconName; icon?: IconName;
};
export function Confirm({ open, title, text, children, cancel, ok, danger, onCancel, onOk, cancelIcon = 'xmark', okIcon = 'check', icon }: Props) {
  const c = useColors(), dark = useIsDark();
  const [v] = useState(() => new Animated.Value(0));
  // Still shown while it fades out after `open` goes false.
  const [shown, setShown] = useState(open);
  if (open && !shown) setShown(true);
  useEffect(() => {
    if (open) { Animated.timing(v, { toValue: 1, duration: 140, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start(); return; }
    Animated.timing(v, { toValue: 0, duration: 110, easing: Easing.in(Easing.quad), useNativeDriver: true }).start(({ finished }) => { if (finished) setShown(false); });
  }, [open, v]);
  return (
    <Modal visible={shown} transparent animationType="none" onRequestClose={onCancel}>
      <Animated.View style={{ flex: 1, opacity: v }}>
      <Pressable onPress={onCancel} accessibilityLabel={cancel}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: dark ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.4)' }}>
        <Animated.View style={{ width: '100%', maxWidth: 360, transform: [{ scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1] }) }] }}>
        {/* The card itself does not close the dialog. */}
        <Pressable onPress={() => {}} accessibilityRole="alert"
          style={{ width: '100%', padding: 20, gap: 14, borderRadius: 22, backgroundColor: c.surface, borderWidth: 1, borderColor: c.cardBorder,
            shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 24, shadowOffset: { width: 0, height: 10 }, elevation: 8 }}>
          <View style={{ gap: 6, alignItems: 'center' }}>
            {icon ? (
              <View style={{ width: 56, height: 56, borderRadius: 28, marginBottom: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: danger ? c.badSoft : c.surface2 }}>
                <Icon name={icon} size={26} color={danger ? c.bad : c.text} weight="semibold" />
              </View>
            ) : null}
            <T style={{ alignSelf: 'stretch', fontSize: 18, lineHeight: 28, fontWeight: '700', textAlign: 'center' }}>{title}</T>
            {text ? <T style={{ alignSelf: 'stretch', fontSize: 14.5, lineHeight: 24, color: c.muted, textAlign: 'center' }}>{text}</T> : null}
          </View>
          {children}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <ActionButton label={cancel} icon={cancelIcon} tone="soft" onPress={onCancel} style={{ flex: 1 }} />
            <ActionButton label={ok} icon={okIcon} tone={danger ? 'danger' : 'main'} onPress={onOk} style={{ flex: 1 }} />
          </View>
        </Pressable>
        </Animated.View>
      </Pressable>
      </Animated.View>
    </Modal>
  );
}
