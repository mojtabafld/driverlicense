// Icon names of src/ui/icon.tsx: the app's own names, each drawn with one Lucide icon (lucide-react-native).
import type { SymbolWeight } from 'expo-symbols';

export type IconName = 'house' | 'exam' | 'learn' | 'settings' | 'moon' | 'sun' | 'check' | 'checkCircle' | 'xCircle' | 'chevronLeft' | 'sparkles' | 'clipboard' | 'warning'
  | 'arrowRight' | 'arrowLeft' | 'bookmark' | 'chevronDown' | 'chart' | 'translate'
  | 'person' | 'lock' | 'eye' | 'eyeSlash' | 'clock' | 'exit' | 'login' | 'trash' | 'refresh' | 'filter'
  | 'play' | 'personAdd' | 'chevronUp' | 'xmark' | 'edit' | 'shuffle' | 'list' | 'listCheck' | 'zoom' | 'search' | 'flame' | 'speaker' | 'stop'
  | 'rules' | 'sign' | 'priority' | 'help' | 'bug' | 'info' | 'send' | 'bulbCircle'
  | 'gauge' | 'distance' | 'glass' | 'seatbelt' | 'phone' | 'headlight' | 'car' | 'parking' | 'road' | 'lanes' | 'idCard'
  | 'bell' | 'plus' | 'minus' | 'calendar' | 'note' | 'mail' | 'coach' | 'trophy' | 'passed';

export type IconProps = { name: IconName; size?: number; color: string; filled?: boolean; weight?: SymbolWeight; contrast?: string };
