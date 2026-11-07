// The home page's chart view (Mojtaba 2026-10-19): a round button beside the profile picture, in its look (the theme's
// link colour on the blush-to-lavender wash) with the plain chart icon of the statistics card (Mojtaba: minimal, as
// that one); pressed, the cards above the chart fold away and the chart glides to the top of the page, and the user's
// test statistics come in under it, then the latest tests, each opening its own page (its result and review). Pressed
// again, all goes back.
import { router } from 'expo-router';

import type { Attempt } from '@/lib/bank';
import { t, tr } from '@/lib/i18n';
import { faNum, isFull, isPass, pctOf } from '@/lib/logic';
import { pctText } from './activity';
import { StatCarousel } from './stat-carousel';
import { useColors } from './theme';

export { HomeChartIcon } from './chart-icon';

// Green or red for an attempt, as in the lists: a full test by the real pass rule, a shorter one at 80%.
const passed = (a: Attempt) => (isFull(a) ? isPass(a) : pctOf(a) >= 0.8);

// «آمار آزمون‌ها»: how many tests, the average and the best score and how many passed. `dense`: the home page on a
// short screen, lower cards. (`noHead` and `noFacts`, for the card's title and line of facts, are kept for the callers;
// the cards stand alone since 2026-11-07.)
export function TestStats({ attempts, dense, noHead, noFacts }: { attempts: Attempt[]; dense?: boolean; noHead?: boolean; noFacts?: boolean }) {
  const c = useColors();
  const n = attempts.length, pcts = attempts.map(pctOf);
  const avg = n ? pcts.reduce((s, p) => s + p, 0) / n : null, best = n ? Math.max(...pcts) : null;
  const ok = attempts.filter(passed).length;
  // Only the cards, with no card around them, no title and no line of facts (Mojtaba 2026-11-07): the four numbers as a
  // row of Material cards that slides (after fonts.google.com's carousel); the tests' card opens their history.
  return (
    <StatCarousel dense={dense} fill={c.surface} items={[
      { title: t('{0} آزمون', faNum(n)), sub: tr('تاریخچه‌ی آزمون‌هایتان را ببینید'), icon: 'clipboard', onPress: () => router.push('/history'), label: tr('تاریخچه‌ی آزمون‌ها') },
      { title: avg != null ? t('میانگین {0}', pctText(avg)) : tr('میانگین'), sub: tr('میانگین نمره‌ی همه‌ی آزمون‌ها'), icon: 'gauge' },
      { title: best != null ? t('بهترین {0}', pctText(best)) : tr('بهترین'), sub: tr('بالاترین نمره‌ای که گرفته‌اید'), icon: 'trophy' },
      // (every test passed, e.g. 5 of 5: green; any not: the warning colour; Mojtaba 2026-10-20)
      { title: n ? t('قبولی {0} از {1}', faNum(ok), faNum(n)) : tr('قبولی'), sub: tr('آزمون‌هایی که قبول شده‌اید'), icon: 'passed', color: n ? (ok === n ? c.ok : c.warn) : undefined },
    ]} />
  );
}
