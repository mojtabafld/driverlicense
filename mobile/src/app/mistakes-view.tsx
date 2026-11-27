// One part of «اشتباهات» on its own page, with a back button to it: the topics (?v=topics), the not-fixed or
// fixed questions (?v=open / ?v=fixed), or one topic's questions (?topic=7.18).
import { useLocalSearchParams } from 'expo-router';

import { MistakesScreen, type View_ } from './mistakes';

export default function MistakesView() {
  const { v, topic } = useLocalSearchParams<{ v?: string; topic?: string }>();
  const detail: View_ = topic ? { topic } : v === 'open' || v === 'fixed' ? v : 'topics';
  return <MistakesScreen key={topic ?? v} detail={detail} />;
}
