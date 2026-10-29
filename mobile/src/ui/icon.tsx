// The app's icons, from Lucide (lucide.dev, lucide-react-native): the same outline drawings on every platform (iOS,
// Android, web), one stroke weight with rounded ends and corners; only a saved bookmark is filled, to show it is saved.
// Each of the app's icon names (icon-names.ts) points to one Lucide icon below; to change or add one, pick it on
// lucide.dev and check that it is in the installed package (.claude/skills/lucide-icons). `weight` and `contrast` are
// kept for callers but do not change the drawing.
import {
  ArrowLeft, ArrowRight, ArrowRightLeft, BadgeCheck, Bell, BookOpen, Bookmark, Bug, Calendar, Car, ChartColumn, Check, ChevronDown, ChevronLeft, ChevronUp,
  CircleCheck, CircleQuestionMark, CircleX, ClipboardList, Clock, Eye, EyeOff, Flame, Flashlight, Funnel, Gauge, GraduationCap, House, IdCard, Info,
  Languages, Lightbulb, List, ListChecks, Lock, LogIn, LogOut, Mail, Merge, Minus, Moon, Pencil, Play, Plus, Road, RotateCw, Ruler, Scale,
  Search, Send, Settings, ShieldCheck, Shuffle, Signpost, Smartphone, Sparkles, Square, SquareParking, StickyNote, Sun, Trash, TriangleAlert, Trophy,
  User, UserPlus, Volume2, Wine, X, ZoomIn, type LucideIcon,
} from 'lucide-react-native';

import { RTL } from '@/lib/i18n';
import type { IconName, IconProps } from './icon-names';

export type { IconName } from './icon-names';

const ICONS: Record<IconName, LucideIcon> = {
  coach: GraduationCap,
  house: House, exam: CircleCheck, checkCircle: CircleCheck, learn: BookOpen, settings: Settings, moon: Moon, sun: Sun, check: Check,
  xCircle: CircleX, chevronLeft: ChevronLeft, chevronDown: ChevronDown, chevronUp: ChevronUp, sparkles: Sparkles, clipboard: ClipboardList,
  warning: TriangleAlert, arrowRight: ArrowRight, arrowLeft: ArrowLeft, bookmark: Bookmark, chart: ChartColumn, translate: Languages,
  person: User, personAdd: UserPlus, lock: Lock, eye: Eye, eyeSlash: EyeOff, clock: Clock, exit: LogOut, login: LogIn, trash: Trash,
  refresh: RotateCw, filter: Funnel, play: Play, xmark: X, edit: Pencil, shuffle: Shuffle, list: List, listCheck: ListChecks, zoom: ZoomIn,
  search: Search, flame: Flame, speaker: Volume2, stop: Square, rules: Scale, sign: Signpost, priority: Merge, help: CircleQuestionMark,
  bug: Bug, info: Info, send: Send, bulbCircle: Lightbulb, gauge: Gauge, distance: Ruler, glass: Wine, seatbelt: ShieldCheck,
  phone: Smartphone, headlight: Flashlight, car: Car, parking: SquareParking, road: Road, lanes: ArrowRightLeft, idCard: IdCard,
  trophy: Trophy, passed: BadgeCheck, bell: Bell, plus: Plus, minus: Minus, calendar: Calendar, note: StickyNote, mail: Mail,
};

export function Icon({ name, size = 24, color, filled = false }: IconProps) {
  const Glyph = ICONS[name];
  // The arrows are meant for Persian (right to left); in English and Danish they point the other way.
  const flip = !RTL && (name === 'chevronLeft' || name === 'arrowLeft' || name === 'arrowRight');
  // (Only the bookmark fills, as a saved one; the tab bar asks for `filled` on the open tab, which would turn the other
  // outlines into solid blots.)
  return <Glyph size={size} color={color} strokeWidth={2} fill={filled && name === 'bookmark' ? color : 'none'} style={flip ? { transform: [{ scaleX: -1 }] } : undefined} />;
}
