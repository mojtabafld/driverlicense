// Types of the question bank built by build.py (site/data.js).
export type Statement = { da: string; fa: string; ok: 0 | 1; eda: string; efa: string; en: string; een: string };
export type Question = { id: number; img: string; c: string; sda: string; sfa: string; sen: string; st: Statement[] };
export type Test = { id: number; title: string; qs: number[]; thumb?: number };
export type Topic = { fa: string; da: string; lesson: string[] };
export type Section = { n: number; fa: string; da: string };
export type Bank = { questions: Question[]; tests: Test[]; topics: Record<string, Topic>; sections: Section[] };

export type Item = { id: number; ok: boolean; w: number; a?: number[]; m?: 1 };
export type Attempt = { at: number; secs: number; mode: string; lesson?: number; items: Item[] };
export type Settings = { showFa: boolean; timer: boolean; lang?: 'da' | 'en' };
export type User = { username: string; name: string; created: number; admin?: boolean };
