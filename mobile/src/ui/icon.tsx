// The app's icons, from Lucide (lucide.dev, lucide-react-native): the same outline drawings on every platform (iOS,
// Android, web), one stroke weight with rounded ends and corners; only a saved bookmark is filled, to show it is saved.
// Each of the app's icon names (icon-names.ts) points to one Lucide icon below; to change or add one, pick it on
// lucide.dev and check that it is in the installed package (.claude/skills/lucide-icons). `weight` and `contrast` are
// kept for callers but do not change the drawing.
// One file per icon (lucide-react-native/icons/<name>), not the package's index: the index brought all ~1,900 of
// Lucide's icons into the web bundle (Metro does not tree-shake), several megabytes for the few dozen used here.
import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import ArrowRight from 'lucide-react-native/icons/arrow-right';
import ArrowRightLeft from 'lucide-react-native/icons/arrow-right-left';
import BadgeCheck from 'lucide-react-native/icons/badge-check';
import Bell from 'lucide-react-native/icons/bell';
import Ellipsis from 'lucide-react-native/icons/ellipsis';
import BookOpen from 'lucide-react-native/icons/book-open';
import Bookmark from 'lucide-react-native/icons/bookmark';
import Bug from 'lucide-react-native/icons/bug';
import Calendar from 'lucide-react-native/icons/calendar';
import CalendarCheck from 'lucide-react-native/icons/calendar-check';
import TrendingUp from 'lucide-react-native/icons/trending-up';
import ArrowUpRight from 'lucide-react-native/icons/arrow-up-right';
import Fingerprint from 'lucide-react-native/icons/fingerprint-pattern';
import Car from 'lucide-react-native/icons/car';
import ChartColumn from 'lucide-react-native/icons/chart-column';
import Check from 'lucide-react-native/icons/check';
import ChevronDown from 'lucide-react-native/icons/chevron-down';
import ChevronLeft from 'lucide-react-native/icons/chevron-left';
import ChevronUp from 'lucide-react-native/icons/chevron-up';
import CircleCheck from 'lucide-react-native/icons/circle-check';
import CircleQuestionMark from 'lucide-react-native/icons/circle-question-mark';
import CircleX from 'lucide-react-native/icons/circle-x';
import ClipboardList from 'lucide-react-native/icons/clipboard-list';
import Clock from 'lucide-react-native/icons/clock';
import Eye from 'lucide-react-native/icons/eye';
import EyeOff from 'lucide-react-native/icons/eye-off';
import Flame from 'lucide-react-native/icons/flame';
import Flashlight from 'lucide-react-native/icons/flashlight';
import Funnel from 'lucide-react-native/icons/funnel';
import Gauge from 'lucide-react-native/icons/gauge';
import GraduationCap from 'lucide-react-native/icons/graduation-cap';
import House from 'lucide-react-native/icons/house';
import IdCard from 'lucide-react-native/icons/id-card';
import Info from 'lucide-react-native/icons/info';
import Languages from 'lucide-react-native/icons/languages';
import Lightbulb from 'lucide-react-native/icons/lightbulb';
import List from 'lucide-react-native/icons/list';
import ListChecks from 'lucide-react-native/icons/list-checks';
import Lock from 'lucide-react-native/icons/lock';
import LogIn from 'lucide-react-native/icons/log-in';
import LogOut from 'lucide-react-native/icons/log-out';
import Mail from 'lucide-react-native/icons/mail';
import Merge from 'lucide-react-native/icons/merge';
import Minus from 'lucide-react-native/icons/minus';
import Moon from 'lucide-react-native/icons/moon';
import Pencil from 'lucide-react-native/icons/pencil';
import Play from 'lucide-react-native/icons/play';
import Plus from 'lucide-react-native/icons/plus';
import Road from 'lucide-react-native/icons/road';
import RotateCw from 'lucide-react-native/icons/rotate-cw';
import Ruler from 'lucide-react-native/icons/ruler';
import Scale from 'lucide-react-native/icons/scale';
import Search from 'lucide-react-native/icons/search';
import Send from 'lucide-react-native/icons/send';
import Settings from 'lucide-react-native/icons/settings';
import ShieldCheck from 'lucide-react-native/icons/shield-check';
import Shuffle from 'lucide-react-native/icons/shuffle';
import Signpost from 'lucide-react-native/icons/signpost';
import Smartphone from 'lucide-react-native/icons/smartphone';
import Sparkles from 'lucide-react-native/icons/sparkles';
import Square from 'lucide-react-native/icons/square';
import SquareParking from 'lucide-react-native/icons/square-parking';
import StickyNote from 'lucide-react-native/icons/sticky-note';
import Sun from 'lucide-react-native/icons/sun';
import Trash from 'lucide-react-native/icons/trash';
import TriangleAlert from 'lucide-react-native/icons/triangle-alert';
import Trophy from 'lucide-react-native/icons/trophy';
import User from 'lucide-react-native/icons/user';
import UserPlus from 'lucide-react-native/icons/user-plus';
import Volume2 from 'lucide-react-native/icons/volume-2';
import Wine from 'lucide-react-native/icons/wine';
import X from 'lucide-react-native/icons/x';
import ZoomIn from 'lucide-react-native/icons/zoom-in';
import type { LucideIcon } from 'lucide-react-native';

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
  trophy: Trophy, passed: BadgeCheck, more: Ellipsis, bell: Bell, plus: Plus, minus: Minus, calendar: Calendar, calendarCheck: CalendarCheck, trend: TrendingUp, arrowUpRight: ArrowUpRight, fingerprint: Fingerprint, note: StickyNote, mail: Mail,
};

export function Icon({ name, size = 24, color, filled = false }: IconProps) {
  const Glyph = ICONS[name];
  // The arrows are meant for Persian (right to left); in English and Danish they point the other way.
  const flip = !RTL && (name === 'chevronLeft' || name === 'arrowLeft' || name === 'arrowRight');
  // (Only the bookmark fills, as a saved one; the tab bar asks for `filled` on the open tab, which would turn the other
  // outlines into solid blots.)
  return <Glyph size={size} color={color} strokeWidth={2} fill={filled && name === 'bookmark' ? color : 'none'} style={flip ? { transform: [{ scaleX: -1 }] } : undefined} />;
}
