import { Platform } from 'react-native';

// Where the Rahvej server runs. The web version uses the server it is opened from (teori.bitlane.app);
// iOS/Android use the live site. Override with EXPO_PUBLIC_API_URL (e.g. http://192.168.1.10:3000 in development).
const webOrigin = Platform.OS === 'web' && typeof window !== 'undefined' ? window.location.origin : null;
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? webOrigin ?? 'https://teori.bitlane.app').replace(/\/$/, '');

// The copy of the web version at teori.bitlane.app/app (built with the base path /app).
// Since 2026-10-20 (Mojtaba) the copy is the main site as it is, in its look and with all its parts, with two things
// of prove.dk's: its question bank (and the questions' own pictures), and «آموزش درس‌به‌درس», prove.dk's 44 numbered
// tests, as the learn tab's first card in place of «آموزش گام‌به‌گام» (PROVE_BANK). PROVE_PICS, the copy's old look
// and its other differences (Persian only, no premium, prove.dk's pictures for the signs and right of way…), is off;
// its branches are kept, so the old copy can come back by setting it to PROVE_BANK.
// On the web by its path; the phone app of the copy is built with EXPO_PUBLIC_PROVE=1 (app.config.js, the APK workflow).
export const PROVE_BANK = process.env.EXPO_PUBLIC_PROVE === '1'
  || (Platform.OS === 'web' && typeof window !== 'undefined' && /^\/app(\/|$)/.test(window.location.pathname));
export const PROVE_PICS = false as boolean;
// That copy is fixed: it asks for the question bank (its questions and 44 lessons) and the questions' pictures as they
// were when it was fixed (the server's frozen/app/), so later changes to them do not reach it.
export const FROZEN = PROVE_BANK ? 'app' : '';
