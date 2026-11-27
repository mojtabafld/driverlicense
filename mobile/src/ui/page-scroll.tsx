import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Platform, ScrollView, type ScrollViewProps } from 'react-native';

import { smoothPageWheel } from './page-scroll-web';

// Pages share quiet edges and native touch momentum. Sheets and horizontal pickers keep their own gestures.
export const PageScroll = forwardRef<ScrollView, ScrollViewProps>(function PageScroll(props, ref) {
  const scroll = useRef<ScrollView>(null);
  useImperativeHandle(ref, () => scroll.current!);
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const node = (scroll.current as unknown as { getScrollableNode?: () => HTMLElement })?.getScrollableNode?.();
    if (node) return smoothPageWheel(node);
  }, []);
  return <ScrollView ref={scroll} showsVerticalScrollIndicator={false} bounces={false} alwaysBounceVertical={false}
    overScrollMode="never" decelerationRate="normal" directionalLockEnabled {...props}
    style={[Platform.OS === 'web' ? { overscrollBehaviorY: 'contain' } as object : null, props.style]} />;
});
