// Read aloud: a round button beside the translation switch, the same style, that plays the question and its statements
// in the exam's language (the server's ElevenLabs recording, made once and kept). A tap plays, a second tap stops;
// while the recording is fetched the icon breathes. Only one question plays at a time, and leaving the question stops
// it. Shown only when the server can read aloud (an ElevenLabs key is set).
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable } from 'react-native';

import { API_URL } from '@/lib/config';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { tap } from './kit';
import { useColors } from './theme';

let current: { player: AudioPlayer; stop: () => void } | null = null;   // the one playing now, anywhere in the app
let modeSet = false;

export function SpeakButton({ qid, lang }: { qid: number; lang: 'da' | 'en' }) {
  const c = useColors();
  const { tts, token } = useApp();
  const [state, setState] = useState<'idle' | 'loading' | 'playing'>('idle');
  const me = useRef<{ player: AudioPlayer; stop: () => void } | null>(null);
  const [pulse] = useState(() => new Animated.Value(1));
  useEffect(() => {
    if (state !== 'loading') { pulse.setValue(1); return; }
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 0.35, duration: 520, easing: Easing.inOut(Easing.quad), useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(pulse, { toValue: 1, duration: 520, easing: Easing.inOut(Easing.quad), useNativeDriver: Platform.OS !== 'web' }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [state, pulse]);
  // Leaving the question (or the page) stops it.
  useEffect(() => () => { me.current?.stop(); }, [qid, lang]);
  if (!tts) return null;

  const stop = () => {
    const m = me.current; if (!m) return;
    me.current = null; if (current === m) current = null;
    try { m.player.pause(); m.player.remove(); } catch {}
    setState('idle');
  };
  const play = () => {
    current?.stop();   // another question that is playing
    if (!modeSet) { modeSet = true; setAudioModeAsync({ playsInSilentMode: true }).catch(() => {}); }
    const url = `${API_URL}/api/tts?qid=${qid}&lang=${lang}`;
    // The web's audio element cannot send headers, so the token goes in the address there (as for the pictures).
    const source = Platform.OS === 'web' ? `${url}${token ? `&t=${token}` : ''}` : { uri: url, headers: token ? { Authorization: `Bearer ${token}` } : undefined };
    const player = createAudioPlayer(source as any);
    const m = { player, stop };
    me.current = m; current = m;
    setState('loading');
    player.addListener('playbackStatusUpdate', st => {
      if (me.current !== m) return;
      if (st.didJustFinish) stop();
      else if (st.playing) setState('playing');
    });
    player.play();
  };
  const on = state !== 'idle';
  return (
    <Pressable onPress={() => { tap(); if (on) stop(); else play(); }} hitSlop={6} accessibilityRole="button" accessibilityState={{ selected: on }}
      accessibilityLabel={on ? 'توقف خواندن سؤال' : 'خواندن سؤال و گزینه‌ها'}
      style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.8 : 1,
        backgroundColor: on ? c.strong : c.nav })}>
      <Animated.View style={{ opacity: pulse }}>
        <Icon name={state === 'playing' ? 'stop' : 'speaker'} size={19} color={on ? c.strongFg : c.navFg} />
      </Animated.View>
    </Pressable>
  );
}
