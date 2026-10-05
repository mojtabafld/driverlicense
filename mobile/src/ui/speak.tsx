// Read aloud: a round button beside the translation switch, the same style, that plays the question and its statements
// in the exam's language (the server's ElevenLabs recording, made once and kept), in the voice chosen in the settings
// (a woman's or a man's). A tap plays, a second tap stops; while the recording is fetched the icon breathes. Only one
// recording plays at a time, and leaving the question stops it. Shown only when the server can read aloud (an
// ElevenLabs key is set). VoiceChoice is the settings' choice of voice, each option playing a short sample;
// TextSpeakButton reads an AI analysis or summary aloud in Persian.
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, View } from 'react-native';

import { api } from '@/lib/api';
import { API_URL } from '@/lib/config';
import { useApp } from '@/lib/store';
import { Icon } from './icon';
import { T, tap } from './kit';
import { useColors } from './theme';

let current: { player: AudioPlayer; stop: () => void } | null = null;   // the one playing now, anywhere in the app
let modeSet = false;

// One recording at a time from /api/tts?<query>: its state, and play / stop.
function usePlayer() {
  const { token } = useApp();
  const [state, setState] = useState<'idle' | 'loading' | 'playing'>('idle');
  const me = useRef<{ player: AudioPlayer; stop: () => void } | null>(null);
  const stop = () => {
    const m = me.current; if (!m) return;
    me.current = null; if (current === m) current = null;
    try { m.player.pause(); m.player.remove(); } catch {}
    setState('idle');
  };
  const play = (query: string) => {
    current?.stop();   // another recording that is playing
    if (!modeSet) { modeSet = true; setAudioModeAsync({ playsInSilentMode: true }).catch(() => {}); }
    const url = `${API_URL}/api/tts?${query}`;
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
  return { state, play, stop, me };
}

// The icon breathing while the recording is fetched.
function useBreath(on: boolean) {
  const [pulse] = useState(() => new Animated.Value(1));
  useEffect(() => {
    if (!on) { pulse.setValue(1); return; }
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 0.35, duration: 520, easing: Easing.inOut(Easing.quad), useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(pulse, { toValue: 1, duration: 520, easing: Easing.inOut(Easing.quad), useNativeDriver: Platform.OS !== 'web' }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [on, pulse]);
  return pulse;
}

export function SpeakButton({ qid, lang }: { qid: number; lang: 'da' | 'en' }) {
  const c = useColors();
  const { tts, settings } = useApp();
  const voice = settings.voice ?? 'woman';
  const { state, play, stop, me } = usePlayer();
  const pulse = useBreath(state === 'loading');
  // Leaving the question (or the page) stops it.
  useEffect(() => () => { me.current?.stop(); }, [qid, lang, me]);
  if (!tts) return null;
  const on = state !== 'idle';
  return (
    <Pressable onPress={() => { tap(); if (on) stop(); else play(`qid=${qid}&lang=${lang}&voice=${voice}`); }} hitSlop={6} accessibilityRole="button" accessibilityState={{ selected: on }}
      accessibilityLabel={on ? 'توقف خواندن سؤال' : 'خواندن سؤال و گزینه‌ها'}
      style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.8 : 1,
        backgroundColor: on ? c.strong : c.nav })}>
      <Animated.View style={{ opacity: pulse }}>
        <Icon name={state === 'playing' ? 'stop' : 'speaker'} size={19} color={on ? c.strongFg : c.navFg} />
      </Animated.View>
    </Pressable>
  );
}

// The settings' «صدای خواندن سؤال‌ها»: a woman's or a man's voice. A tap on an option chooses it and plays its sample
// in the exam's language; a tap on the playing one stops it.
export function VoiceChoice() {
  const c = useColors();
  const { settings, setSettings } = useApp();
  const lang = settings.lang === 'en' ? 'en' : 'da', voice = settings.voice ?? 'woman';
  const { state, play, stop, me } = usePlayer();
  const [playing, setPlaying] = useState<'woman' | 'man' | null>(null);
  const pulse = useBreath(state === 'loading');
  useEffect(() => () => { me.current?.stop(); }, [me]);
  // A change of language stops the sample of the other one.
  useEffect(() => { me.current?.stop(); }, [lang, me]);
  const choose = (v: 'woman' | 'man') => {
    tap();
    if (playing === v && state !== 'idle') { stop(); return; }
    if (v !== voice) setSettings({ voice: v }).catch(() => {});
    setPlaying(v);
    play(`sample=1&lang=${lang}&voice=${v}`);
  };
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {([['woman', 'خانم'], ['man', 'آقا']] as const).map(([v, label]) => {
        const chosen = voice === v, live = playing === v && state !== 'idle';
        return (
          <Pressable key={v} onPress={() => choose(v)} accessibilityRole="radio" accessibilityState={{ checked: chosen }}
            accessibilityLabel={`صدای ${label}، پخش نمونه`}
            style={({ pressed }) => ({ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 14, borderWidth: 1.5,
              borderColor: chosen ? c.strong : c.line, backgroundColor: chosen ? c.surface2 : 'transparent', opacity: pressed ? 0.85 : 1 })}>
            <View style={{ width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: live ? c.strong : c.nav }}>
              <Animated.View style={{ opacity: live && state === 'loading' ? pulse : 1 }}>
                <Icon name={live && state === 'playing' ? 'stop' : 'speaker'} size={17} color={live ? c.strongFg : c.navFg} />
              </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
              <T style={{ fontWeight: '700', fontSize: 15 }}>{label}</T>
              <T style={{ color: c.muted, fontSize: 11.5, lineHeight: 17 }}>{live ? 'در حال پخش…' : 'پخش نمونه'}</T>
            </View>
            {chosen ? <Icon name="checkCircle" size={18} color={c.text} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}

// Reads an AI text (the analysis of an answer, the summary of the mistakes) aloud in Persian: the server makes the
// recording once (POST /api/ttsai), then it plays like a question's: the same round icon button as the question's.
// A tap plays, a second tap stops; if it could not be made, the icon turns red until the next tap.
export function TextSpeakButton({ text }: { text: string }) {
  const c = useColors();
  const { tts } = useApp();
  const { state, play, stop, me } = usePlayer();
  const [making, setMaking] = useState(false), [failed, setFailed] = useState(false);
  const pulse = useBreath(making || state === 'loading');
  const wanted = useRef(false); // still wanted when the recording is ready (not stopped meanwhile)
  useEffect(() => () => { wanted.current = false; me.current?.stop(); }, [text, me]);
  if (!tts) return null;
  const on = making || state !== 'idle';
  const press = () => {
    tap(); setFailed(false);
    if (on) { wanted.current = false; setMaking(false); stop(); return; }
    wanted.current = true; setMaking(true);
    api<{ id: string }>('POST', 'ttsai', { text })
      .then(d => { if (wanted.current) play(`ai=${d.id}`); })
      .catch(() => setFailed(true))
      .finally(() => setMaking(false));
  };
  return (
    <Pressable onPress={press} hitSlop={6} accessibilityRole="button" accessibilityState={{ selected: on }}
      accessibilityLabel={on ? 'توقف خواندن متن' : failed ? 'خواندن متن نشد؛ دوباره امتحان کنید' : 'خواندن این متن'}
      style={({ pressed }) => ({ width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.8 : 1,
        backgroundColor: failed ? c.badSoft : on ? c.strong : c.nav })}>
      <Animated.View style={{ opacity: pulse }}>
        <Icon name={state === 'playing' ? 'stop' : 'speaker'} size={19} color={failed ? c.bad : on ? c.strongFg : c.navFg} />
      </Animated.View>
    </Pressable>
  );
}
