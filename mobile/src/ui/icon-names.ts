// Icon names of src/ui/icon.tsx (the same outline drawings on every platform).
import type { SymbolWeight } from 'expo-symbols';

export type IconName = 'house' | 'exam' | 'learn' | 'settings' | 'moon' | 'sun' | 'check' | 'checkCircle' | 'xCircle' | 'chevronLeft' | 'sparkles' | 'clipboard' | 'warning'
  | 'arrowRight' | 'arrowLeft' | 'bookmark' | 'chevronDown' | 'chart' | 'translate'
  | 'person' | 'lock' | 'eye' | 'eyeSlash' | 'clock' | 'exit' | 'trash' | 'refresh' | 'filter'
  | 'play' | 'personAdd' | 'chevronUp' | 'xmark' | 'edit' | 'shuffle';

export type IconProps = { name: IconName; size?: number; color: string; filled?: boolean; weight?: SymbolWeight; contrast?: string };
