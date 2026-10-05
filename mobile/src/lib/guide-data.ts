// The teaching pages «علائم رانندگی» and «آموزش حق تقدم»: their texts (guide-data.json, written by
// data/guide-src/build.py from the Danish road-marking order and the Road Traffic Act) with types. Each item's `key`
// names its picture and each group's `thumb` its card's picture, made by the server (/guide-art/<key>.png).
import data from './guide-data.json';

export type SignItem = { key: string; code: string; da: string; fa: string; text: string };
export type Scenario = { key: string; title: string; text: string; first: string; law: string };
type Group<T> = { id: string; title: string; blurb: string; intro: string; thumb: string; items: T[] };
export type SignCat = Group<SignItem>;
export type PriorityCat = Group<Scenario>;
export type GuideKind = 'signs' | 'priority';

export const SIGN_CATS = data.signs as SignCat[];
export const PRIORITY_CATS = data.priority as PriorityCat[];
export const GUIDE_SOURCES = data.sources as string;
