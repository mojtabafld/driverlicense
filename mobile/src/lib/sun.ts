// Is it dark outside where the user is? The device's time zone gives a place (its city, from a short list, or else a
// longitude from the clock's offset), and the sun's height there now is worked out from the date and time (the usual
// solar formulas: declination and equation of time). Dark = the sun more than 6° below the horizon (after civil dusk),
// when street lights are on; no location permission is needed.

// Time zone → [latitude, longitude] of its city.
const PLACES: Record<string, [number, number]> = {
  'Europe/Copenhagen': [55.68, 12.57], 'Europe/Stockholm': [59.33, 18.07], 'Europe/Oslo': [59.91, 10.75], 'Europe/Helsinki': [60.17, 24.94],
  'Europe/Berlin': [52.52, 13.4], 'Europe/Amsterdam': [52.37, 4.9], 'Europe/Brussels': [50.85, 4.35], 'Europe/Paris': [48.86, 2.35],
  'Europe/London': [51.51, -0.13], 'Europe/Dublin': [53.35, -6.26], 'Europe/Madrid': [40.42, -3.7], 'Europe/Lisbon': [38.72, -9.14],
  'Europe/Rome': [41.9, 12.5], 'Europe/Vienna': [48.21, 16.37], 'Europe/Zurich': [47.38, 8.54], 'Europe/Prague': [50.08, 14.44],
  'Europe/Warsaw': [52.23, 21.01], 'Europe/Budapest': [47.5, 19.04], 'Europe/Athens': [37.98, 23.73], 'Europe/Istanbul': [41.01, 28.98],
  'Europe/Kiev': [50.45, 30.52], 'Europe/Kyiv': [50.45, 30.52], 'Europe/Moscow': [55.76, 37.62], 'Atlantic/Reykjavik': [64.15, -21.94],
  'Atlantic/Faroe': [62.01, -6.77], 'America/Godthab': [64.18, -51.72], 'America/Nuuk': [64.18, -51.72],
  'Asia/Tehran': [35.69, 51.39], 'Asia/Kabul': [34.53, 69.17], 'Asia/Dubai': [25.2, 55.27], 'Asia/Baghdad': [33.31, 44.36],
  'Asia/Dushanbe': [38.56, 68.79], 'Asia/Karachi': [24.86, 67.0], 'Asia/Kolkata': [22.57, 88.36], 'Asia/Tokyo': [35.68, 139.69],
  'America/New_York': [40.71, -74.01], 'America/Toronto': [43.65, -79.38], 'America/Chicago': [41.88, -87.63],
  'America/Denver': [39.74, -104.99], 'America/Los_Angeles': [34.05, -118.24], 'America/Vancouver': [49.28, -123.12],
  'Australia/Sydney': [-33.87, 151.21], 'Australia/Melbourne': [-37.81, 144.96],
};

function place(d: Date): [number, number] {
  let tz = '';
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch { /* no Intl time zones */ }
  if (PLACES[tz]) return PLACES[tz];
  // Unknown zone: the longitude from the clock's offset (15° an hour), at Denmark's latitude.
  return [55.7, -d.getTimezoneOffset() / 4];
}

const rad = Math.PI / 180;

// The sun's height above the horizon in degrees at `lat`, `lon` and time `d`.
export function sunHeight(d: Date, lat: number, lon: number) {
  const day = (Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5;
  const hours = d.getUTCHours() + d.getUTCMinutes() / 60 + d.getUTCSeconds() / 3600;
  const g = (2 * Math.PI / 365) * (day - 1 + (hours - 12) / 24); // the year's angle
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g)
    - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const eqt = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const solarMin = hours * 60 + eqt + 4 * lon; // true solar time in minutes
  const ha = (solarMin / 4 - 180) * rad;     // hour angle
  const cosZ = Math.sin(lat * rad) * Math.sin(decl) + Math.cos(lat * rad) * Math.cos(decl) * Math.cos(ha);
  return 90 - Math.acos(Math.min(1, Math.max(-1, cosZ))) / rad;
}

// True when it is dark at the user's place now (the sun more than 6° below the horizon).
export function isDark(d = new Date()) {
  const [lat, lon] = place(d);
  return sunHeight(d, lat, lon) < -6;
}
