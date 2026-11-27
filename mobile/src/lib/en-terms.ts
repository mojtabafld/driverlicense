// The Danish words the Persian learning texts give in brackets or quotes (nærlys, vigepligt, …), in English for users
// who take the exam in English (settings.lang 'en'), so a term reads as it will in their exam. Words that are really
// written on a sign or on the road (Skole, Told, Politi, Isglat, «Blød rabat», undtaget, STOP, …), names (S-tog,
// EuroVelo) and the titles of the laws (Færdselsloven, …) are not here and stay Danish.
export const TERMS: Record<string, string> = {
  'vognbaneskift og fletning': 'lane change and merging',
  'ubetinget vigepligt': 'unconditional duty to give way',
  'lille knallert': 'small moped',
  højrevigepligt: 'duty to give way to the right',
  højreregel: 'right-hand rule',
  vigepligt: 'duty to give way',
  accelerationsspor: 'acceleration lane',
  advarselstrekant: 'warning triangle',
  autocamper: 'motorhome',
  campingvogn: 'caravan',
  cykelgade: 'cycle street',
  fletning: 'merging',
  fotovogn: 'speed camera van',
  genstand: 'standard drink',
  hajtænder: 'shark teeth',
  klip: 'penalty points',
  kørelys: 'daytime running lights',
  letbane: 'light rail',
  lygteføring: 'use of lights',
  motorredskab: 'motorised implement',
  motortrafikvej: 'expressway',
  motorvej: 'motorway',
  nærlys: 'dipped headlights',
  overhaling: 'overtaking',
  overkørsel: 'crossing over a raised kerb',
  'P-skive': 'parking disc',
  promille: 'per mille',
  selepude: 'booster cushion',
  skolepatrulje: 'school patrol',
  standsning: 'stopping',
  syn: 'vehicle inspection',
  busbane: 'bus lane',
  'gul linje': 'yellow line',
  dobbelt: 'double',
};

// Longest first, so «ubetinget vigepligt» wins over «vigepligt»; whole words only (a letter or hyphen beside a term
// keeps it). No lookbehind or \p{…}, for Hermes.
const KEYS = Object.keys(TERMS).sort((a, b) => b.length - a.length);
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\-]/g, '\\$&');
const LETTER = 'A-Za-zÆØÅæøåé\\u0600-\\u06FF-';
const RE = new RegExp(`(^|[^${LETTER}])(${KEYS.map(esc).join('|')})(?=$|[^${LETTER}])`, 'gi');
const PERSIAN = /[؀-ۿ]/;
const term = (w: string) => TERMS[w] ?? TERMS[KEYS.find(k => k.toLowerCase() === w.toLowerCase()) ?? ''] ?? w;

// A Persian text with its Danish terms in English (Danish text, without Persian, is left as it is; so is Danish in
// quotes, «Overhaling forbudt»: the words on a sign).
export function enTerms(s: string): string {
  if (!PERSIAN.test(s) || !/[a-zæøå]/i.test(s)) return s;
  return s.split(/(«[^»]*»)/).map(part =>
    part.startsWith('«') && !PERSIAN.test(part) ? part : part.replace(RE, (_, pre: string, w: string) => pre + term(w))).join('');
}
