// Types of the question bank built by build.py (site/data.js).
export type Statement = { da: string; fa: string; ok: 0 | 1; eda: string; efa: string; en: string; een: string };
// l («آزمون جدید»'s questions only): the part of «آموزش» that teaches the question, a course lesson's id or a page
// ('/signs', '/rules?open=4'), '' when none does (data/newq-src/learn.py); the topic sheet's «رفتن به آموزش» opens it.
// x: taken out of «آزمون جدید»'s bank by the admin (server's newqadmin.js).
export type Question = { id: number; img: string; c: string; sda: string; sfa: string; sen: string; st: Statement[]; l?: string; x?: 1 };
export type Test = { id: number; title: string; qs: number[]; thumb?: number };
export type Topic = { fa: string; da: string; lesson: string[] };
export type Section = { n: number; fa: string; da: string };
export type Bank = { questions: Question[]; tests: Test[]; topics: Record<string, Topic>; sections: Section[] };
// «آزمون جدید»'s own questions (site/newq.js, written by data/newq-src/build.py): the bank's topics, their own pictures.
// gone: the questions taken out of it, kept only for the tests already taken with them.
export type NewBank = { questions: Question[]; gone?: Question[] };

export type Item = { id: number; ok: boolean; w: number; a?: number[]; m?: 1 };
export type Attempt = { at: number; secs: number; mode: string; lesson?: number; items: Item[] };
// langChosen: the user picked the questions' language when the app asked (once).
export type Settings = { showFa: boolean; timer: boolean; lang?: 'da' | 'en'; langChosen?: boolean; voice?: 'woman' | 'man'; ui?: 'fa' | 'en' | 'da'; trans?: 'fa' | 'en' | 'da' | 'auto';
  mode?: 'system' | 'light' | 'dark'; palette?: string; header?: 'plain' | 'pictures';
  // coach: «حالت مربی» (premium), on unless false.
  coach?: boolean };
// avatar: one of the made pictures ({ preset }) or their own photo ({ photo: version }).
export type User = { username: string; name: string; created: number; admin?: boolean; avatar?: { preset?: number; photo?: string }; premium?: { until: number; plan?: string; promo?: boolean }; guest?: boolean; email?: string;
  // The one free answer analysis without premium: still to be had (true), or the question it was had for.
  freeAi?: true | number; emailOk?: boolean; verify?: boolean; promoUsed?: boolean;
  // playId: the id the Android app hands Google Play with a purchase (server's playbilling.js), when it sells there.
  playId?: string };
