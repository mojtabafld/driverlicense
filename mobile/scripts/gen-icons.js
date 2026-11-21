// Writes src/ui/icon-paths.ts from Material Symbols SVGs (MAP: app icon name → symbol name). Run from mobile/:
//   npm pack @material-symbols/svg-400@0.48.3 && tar xzf material-symbols-svg-400-*.tgz
//   node scripts/gen-icons.js package/outlined src/ui/icon-paths.ts && rm -r package material-symbols-svg-400-*.tgz
const fs = require('fs'), path = require('path');
const dir = process.argv[2], out = process.argv[3];
const MAP = { coach: 'school', house: 'home', exam: 'check_circle', checkCircle: 'check_circle', learn: 'menu_book', settings: 'settings', moon: 'dark_mode', sun: 'light_mode', check: 'check',
  xCircle: 'cancel', chevronLeft: 'chevron_left', chevronDown: 'keyboard_arrow_down', chevronUp: 'keyboard_arrow_up', sparkles: 'wand_stars', clipboard: 'assignment',
  warning: 'warning', arrowRight: 'arrow_forward', arrowLeft: 'arrow_back', bookmark: 'bookmark', chart: 'bar_chart', translate: 'translate',
  person: 'person', personAdd: 'person_add', lock: 'lock', eye: 'visibility', eyeSlash: 'visibility_off', clock: 'schedule', exit: 'logout', login: 'login', trash: 'delete',
  refresh: 'refresh', filter: 'filter_alt', play: 'play_arrow', xmark: 'close', edit: 'edit', shuffle: 'shuffle', list: 'list', listCheck: 'checklist', zoom: 'zoom_in',
  search: 'search', flame: 'local_fire_department', speaker: 'volume_up', stop: 'stop', rules: 'balance', sign: 'signpost', priority: 'merge', help: 'help',
  bug: 'bug_report', info: 'info', send: 'send', bulbCircle: 'lightbulb', gauge: 'speed', distance: 'straighten', glass: 'wine_bar', seatbelt: 'verified_user',
  phone: 'mobile', headlight: 'flashlight_on', car: 'directions_car', parking: 'local_parking', road: 'road', lanes: 'swap_horiz', idCard: 'id_card',
  trophy: 'trophy', passed: 'verified', more: 'more_horiz', bell: 'notifications', plus: 'add', minus: 'remove', calendar: 'calendar_today', calendarCheck: 'event_available',
  trend: 'trending_up', arrowUpRight: 'arrow_outward', fingerprint: 'fingerprint', note: 'sticky_note_2', mail: 'mail' };
const d = f => { const s = fs.readFileSync(path.join(dir, f), 'utf8'); const m = [...s.matchAll(/ d="([^"]+)"/g)].map(x => x[1]); if (!m.length) throw new Error(f); return m.join(''); };
let lines = [];
for (const [k, v] of Object.entries(MAP)) {
  const o = d(v + '.svg'); let f = o; try { f = d(v + '-fill.svg'); } catch {}
  lines.push(`  ${k}: ['${o}', ${f === o ? 'null' : `'${f}'`}],`);
}
fs.writeFileSync(out, `// Generated from Material Symbols (Outlined, weight 400; fonts.google.com/icons, Apache License 2.0) by
// mobile/scripts/gen-icons.js: each app icon name → [outline path, filled path or null], in the 0 -960 960 960 viewBox.
// The symbols used: ${[...new Set(Object.values(MAP))].join(', ')}.
/* eslint-disable */
import type { IconName } from './icon-names';

export const SYMBOLS: Record<IconName, readonly [string, string | null]> = {
${lines.join('\n')}
};
`);
console.log(Object.keys(MAP).length, 'icons');
