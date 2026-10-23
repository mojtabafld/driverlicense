// What the floating bars blur on Android. Android 12 and later can blur what lies under a bar only when that content is
// drawn inside an expo-blur BlurTargetView whose ref the bar's BlurView is given, and the bar itself must stay outside
// it. A page with a floating bar (Backdrop with `glass`, GlassArea) therefore draws all its other children in the
// target and the bar (GlassBar, marked `glassBar`) after it, with the target's ref (useBarBackdrop). Only the bar
// moves: what came after it in the page are sheets and dialogs (Modal, drawn in their own window), so nothing changes
// order on screen, and the rest stays in the target whether the bar is shown or not (it is not made again when the
// bar comes and goes). Elsewhere nothing changes: the web blurs with CSS, iOS with its own glass.
import { BlurTargetView } from 'expo-blur';
import { Children, createContext, isValidElement, useContext, useRef, type RefObject } from 'react';
import { Platform, View, type StyleProp, type ViewStyle } from 'react-native';

export const BLUR_ANDROID = Platform.OS === 'android' && Number(Platform.Version) >= 31;

const Backdrop = createContext<RefObject<View | null> | null>(null);
// The target the bar may blur; null where there is none (then the bar's glass is drawn nearly solid).
export const useBarBackdrop = () => useContext(Backdrop);

const isBar = (k: unknown) => isValidElement(k) && (k.type as { glassBar?: boolean }).glassBar === true;

// A page's children with its floating bar drawn after the rest (Android 12+, when `on`); otherwise as they are.
// `bg`: the page colour, drawn in the target too so the blur has it.
export function useGlassSplit(children: React.ReactNode, on = true, bg?: string) {
  const target = useRef<View>(null);
  if (!BLUR_ANDROID || !on) return children;
  const all = Children.toArray(children);
  return (
    <>
      <BlurTargetView ref={target} style={{ flex: 1, backgroundColor: bg }}>{all.filter(k => !isBar(k))}</BlurTargetView>
      <Backdrop.Provider value={target}>{all.filter(isBar)}</Backdrop.Provider>
    </>
  );
}

// A page's root View, for pages whose floating bar is not a child of Backdrop.
export function GlassArea({ style, children }: { style?: StyleProp<ViewStyle>; children?: React.ReactNode }) {
  return <View style={style}>{useGlassSplit(children)}</View>;
}
