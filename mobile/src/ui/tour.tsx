// First-visit tooltips: the first time an account opens a tab (on this device), its parts are shown one by one, each
// lit up with the rest of the screen dimmed around it and a bubble with its title and what it does, above or below
// it; a step without a part on screen (e.g. the settings' overview) is a bubble in the middle over the dimmed page.
// «بعدی» / «قبلی» move between the steps, «متوجه شدم» ends; the ✕ and «رد شدن» close it at any step. Once closed or
// finished it does not come back for that tab (src/lib/prefs.ts). It waits for the intro and the language question.
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import { Modal, Platform, Pressable, View, useWindowDimensions, type ScrollView } from 'react-native';

import { faNum } from '@/lib/logic';
import { loadLangAsked, loadTourSeen, saveTourSeen } from '@/lib/prefs';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { T, tap } from './kit';
import { useColors } from './theme';

export type TourStep = { title: string; text: string };
type Rect = { x: number; y: number; w: number; h: number };
// The page's scroll view, to bring a part that is off screen into view: its ref and where it is scrolled now.
type Scroll = { ref: RefObject<ScrollView | null>; y: () => number };

const PAD = 6, R = 16, DIM = 'rgba(0,0,0,0.62)';

export function useTour(page: string, steps: TourStep[], scroll?: Scroll) {
  const { user, settings } = useApp();
  const nodes = useRef<(View | null)[]>([]);
  const [step, setStep] = useState<number | null>(null);
  // The lit part as measured (null: none, the bubble in the middle), and whether it is measured yet.
  const [view, setView] = useState<{ rect: Rect | null; ready: boolean }>({ rect: null, ready: false });
  const { height: H } = useWindowDimensions();
  const sc = useRef(scroll);
  useEffect(() => { sc.current = scroll; });
  const username = user?.username;
  // Shown once, a moment after the tab first comes into view (its layout settled), unless the language is still to
  // be asked.
  useFocusEffect(useCallback(() => {
    if (!username || !settings.langChosen) return;
    let live = true;
    const t = setTimeout(() => {
      Promise.all([loadTourSeen(page, username), loadLangAsked()]).then(([seen, asked]) => { if (live && !seen && asked) setStep(0); });
    }, 700);
    return () => { live = false; clearTimeout(t); };
  }, [page, username, settings.langChosen]));
  // The lit part of this step: measured on screen; one that is off screen is scrolled into view first.
  useEffect(() => {
    if (step == null) return;
    const node = nodes.current[step];
    if (!node) { setView({ rect: null, ready: true }); return; }
    let live = true;
    const measure = (again: boolean) => node.measureInWindow((x, y, w, h) => {
      if (!live) return;
      const off = y < 60 || y + h > H - 90, sv = sc.current;
      if (off && again && sv?.ref.current) {
        sv.ref.current.scrollTo({ y: Math.max(0, sv.y() + y - H * 0.25), animated: true });
        setTimeout(() => measure(false), 420);
      } else setView({ rect: { x, y, w, h }, ready: true });
    });
    setView({ rect: null, ready: false });
    measure(true);
    return () => { live = false; };
  }, [step, H]);
  const close = () => { if (username) saveTourSeen(page, username); setStep(null); };
  const target = (i: number) => ({ ref: (v: View | null) => { nodes.current[i] = v; }, collapsable: false });
  const overlay = step == null ? null : (
    <TourOverlay steps={steps} step={step} rect={view.rect} waiting={!view.ready} onStep={setStep} onClose={close} />
  );
  return { target, overlay };
}

function TourOverlay({ steps, step, rect, waiting, onStep, onClose }: {
  steps: TourStep[]; step: number; rect: Rect | null; waiting: boolean; onStep: (n: number) => void; onClose: () => void;
}) {
  const c = useColors();
  const { width: W, height: H } = useWindowDimensions();
  const s = steps[step], last = step === steps.length - 1;
  const bw = Math.min(W - 32, 420);
  // The lit area, a little larger than the part.
  const a = rect ? { x: rect.x - PAD, y: rect.y - PAD, w: rect.w + PAD * 2, h: rect.h + PAD * 2 } : null;
  // The bubble below a part in the upper half of the screen, above one in the lower half; in the middle without one.
  const place = !a ? { top: H * 0.3 } : a.y + a.h / 2 < H / 2 ? { top: Math.min(a.y + a.h + 12, H - 260) } : { bottom: Math.min(H - a.y + 12, H - 200) };
  const btn = (label: string, onPress: () => void, main?: boolean) => (
    <Pressable onPress={() => { tap(); onPress(); }} accessibilityRole="button"
      style={({ pressed }) => ({ height: 40, paddingHorizontal: 16, borderRadius: 10, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.85 : 1,
        backgroundColor: main ? c.btn : c.nav })}>
      <T style={{ fontSize: 14, fontWeight: '700', color: main ? c.btnFg : c.navFg }}>{label}</T>
    </Pressable>
  );
  return (
    <Modal visible transparent animationType="fade" statusBarTranslucent navigationBarTranslucent onRequestClose={onClose}>
      <View style={{ flex: 1 }}>
        {/* The dimmed screen around the lit part (all of it when there is none). */}
        {a ? (
          <>
            <View style={{ position: 'absolute', left: 0, right: 0, top: 0, height: Math.max(0, a.y), backgroundColor: DIM }} />
            <View style={{ position: 'absolute', left: 0, right: 0, top: a.y + a.h, bottom: 0, backgroundColor: DIM }} />
            <View style={{ position: 'absolute', left: 0, width: Math.max(0, a.x), top: a.y, height: a.h, backgroundColor: DIM }} />
            <View style={{ position: 'absolute', left: a.x + a.w, right: 0, top: a.y, height: a.h, backgroundColor: DIM }} />
            {/* The rounded edge of the lit part. */}
            <View pointerEvents="none" style={{ position: 'absolute', left: a.x, top: a.y, width: a.w, height: a.h, borderRadius: R, borderWidth: 2, borderColor: '#ffffff' }} />
          </>
        ) : <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: DIM }} />}
        {waiting ? null : (
          <View style={{ position: 'absolute', left: (W - bw) / 2, width: bw, ...place, padding: 16, gap: 10, borderRadius: 18, backgroundColor: c.surface,
            ...(Platform.OS === 'web' ? { boxShadow: '0 10px 30px rgba(0,0,0,.25)' } as any : { elevation: 8 }) }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
              <T style={{ flex: 1, fontSize: 16.5, lineHeight: 26, fontWeight: '700' }}>{s.title}</T>
              <Pressable onPress={() => { tap(); onClose(); }} hitSlop={10} accessibilityRole="button" accessibilityLabel="بستن راهنما"
                style={{ width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: c.surface2 }}>
                <Icon name="xmark" size={15} color={c.muted} />
              </Pressable>
            </View>
            <T style={{ fontSize: 14, lineHeight: 24, color: c.muted }}>{s.text}</T>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
              {steps.length > 1 ? <T style={{ flex: 1, fontSize: 12.5, color: c.faint }}>{`${faNum(step + 1)} از ${faNum(steps.length)}`}</T> : <View style={{ flex: 1 }} />}
              {!last ? (
                <Pressable onPress={() => { tap(); onClose(); }} hitSlop={6} style={{ paddingHorizontal: 6 }}>
                  <T style={{ fontSize: 13.5, fontWeight: '600', color: c.muted }}>رد شدن</T>
                </Pressable>
              ) : null}
              {step > 0 ? btn('قبلی', () => onStep(step - 1)) : null}
              {btn(last ? 'متوجه شدم' : 'بعدی', () => (last ? onClose() : onStep(step + 1)), true)}
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}
