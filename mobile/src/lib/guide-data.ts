// The teaching pages «علائم رانندگی» and «آموزش حق تقدم»: their texts (guide-data.json, written by
// data/guide-src/build.py from the Danish road-marking order and the Road Traffic Act) with types. Each item's `key`
// names its picture, made by the server (/guide-art/<key>.png).
import data from './guide-data.json';

export type SignItem = { key: string; code: string; da: string; fa: string; text: string };
export type SignCat = { id: string; title: string; intro: string; shape: string; items: SignItem[] };
export type Scenario = { key: string; title: string; text: string; first: string; law: string };
export type PriorityCat = { id: string; title: string; intro: string; items: Scenario[] };

export const SIGN_CATS = data.signs as SignCat[];
export const PRIORITY_CATS = data.priority as PriorityCat[];
export const GUIDE_SOURCES = data.sources as string;
