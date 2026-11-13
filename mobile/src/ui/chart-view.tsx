// The home page's chart view (Mojtaba 2026-10-19): a round button beside the profile picture, in its look (the theme's
// link colour on the blush-to-lavender wash) with the plain chart icon of the statistics card (Mojtaba: minimal, as
// that one); pressed, the cards above the chart fold away and the chart glides to the top of the page, and the user's
// test statistics come in under it, then the latest tests, each opening its own page (its result and review). Pressed
// again, all goes back.
import { router } from 'expo-router';

import type { Attempt } from '@/lib/bank';
import { t, tr } from '@/lib/i18n';
import { faNum, isFull, isPass, pctOf } from '@/lib/logic';
import { COURSE } from '@/lib/course';
import { useCourseProgress } from '@/lib/course-progress';
import { pctText } from './activity';
import { StatCarousel } from './stat-carousel';
import { useColors } from './theme';

export { HomeChartIcon } from './chart-icon';

// Green or red for an attempt, as in the lists: a full test by the real pass rule, a shorter one at 80%.
const passed = (a: Attempt) => (isFull(a) ? isPass(a) : pctOf(a) >= 0.8);

// «آمار آزمون‌ها»: how many tests, the average and the best score and how many passed. `dense`: the home page on a
// short screen, lower cards. (`noHead` and `noFacts`, for the card's title and line of facts, are kept for the callers;
// the cards stand alone since 2026-11-07.)
// `first`: the first card's number (the cards go on from the card above them).
export function TestStats({ attempts, dense, noHead, noFacts, first }: { attempts: Attempt[]; dense?: boolean; noHead?: boolean; noFacts?: boolean; first?: number }) {
  const c = useColors();
  const n = attempts.length, pcts = attempts.map(pctOf);
  const avg = n ? pcts.reduce((s, p) => s + p, 0) / n : null, best = n ? Math.max(...pcts) : null;
  const ok = attempts.filter(passed).length;
  const last = n ? pctOf([...attempts].sort((a, b) => b.at - a.at)[0]) : null;
  // The course's lessons (lib/course.ts): how many are finished, and the next one (Mojtaba 2026-11-08: the second card).
  const { done } = useCourseProgress();
  const lessons = COURSE.flatMap(ch => ch.lessons), finished = lessons.filter(l => done[l.id]).length;
  const next = lessons.find(l => !done[l.id]);
  // Only the cards, with no card around them, no title and no line of facts (Mojtaba 2026-11-07): the four numbers as a
  // row of Material cards that slides (after fonts.google.com's carousel); the tests' card opens their history.
  return (
    <StatCarousel dense={dense} fill={c.surface} first={first} items={[
      // (more about the tests in place of the best and passed cards; Mojtaba 2026-11-08)
      n ? { title: t('{0} آزمون', faNum(n)), icon: 'clipboard', onPress: () => router.push('/history'), label: tr('تاریخچه‌ی آزمون‌ها'),
        sub: t('{0} قبول از {1}، بهترین نمره {2}، آخرین {3}', faNum(ok), faNum(n), pctText(best ?? 0), pctText(last ?? 0)) }
        : { title: tr('هنوز آزمونی نداده‌اید'), sub: tr('با یک آزمون کوتاه ببینید چقدر آماده‌اید'), icon: 'clipboard', onPress: () => router.navigate('/exam') },
      { title: t('{0} از {1} درس', faNum(finished), faNum(lessons.length)), icon: 'learn',
        sub: next ? t('درس بعدی: {0}', tr(next.title)) : tr('همه‌ی درس‌ها را تمام کرده‌اید'), color: lessons.length && !next ? c.ok : undefined,
        onPress: () => (next ? router.push({ pathname: '/course-lesson', params: { id: next.id } }) : router.navigate('/learn')), label: tr('درس‌ها') },
      { title: avg != null ? t('میانگین {0}', pctText(avg)) : tr('میانگین'), sub: tr('میانگین نمره‌ی همه‌ی آزمون‌ها'), icon: 'gauge' },
    ]} />
  );
}
