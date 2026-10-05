// «آموزش حق تقدم»: who goes first in Denmark, by group (order of authority, the right-hand rule, give-way and stop,
// leaving a property, turning, signals, roundabouts, pedestrians and cyclists, special vehicles, merging, meeting), from
// the Road Traffic Act. Each situation has its top-down picture (blue car goes first, red car gives way), what happens,
// who goes first and the law it rests on.
import { useState } from 'react';
import { View } from 'react-native';

import { GUIDE_SOURCES, PRIORITY_CATS } from '@/lib/guide-data';
import { Chips, GuideImage, PracticeButton, Rich } from '@/ui/guide-visual';
import { Icon } from '@/ui/icon';
import { Card, Enter, L, T } from '@/ui/kit';
import { SubPage } from '@/ui/sub-page';
import { useColors } from '@/ui/theme';

const SHORT: Record<string, string> = { order: 'ترتیب اعتبار', right: 'دست راست', yield: 'حق تقدم مطلق', exit: 'خروج از ملک', turn: 'گردش', signals: 'چراغ‌دار', round: 'میدان', people: 'عابر و دوچرخه', special: 'امدادی و قطار', lanes: 'ادغام', meet: 'روبه‌رو' };
// The bank's topics that practise each group.
const TOPICS: Record<string, string[]> = { order: ['6.1', '7.11'], right: ['7.11', '7.12'], yield: ['7.11', '7.12'], exit: ['7.1', '7.11'], turn: ['7.13', '7.14'],
  signals: ['7.12', '7.14'], round: ['7.15'], people: ['7.6'], special: ['4.5', '7.6'], lanes: ['7.4', '7.16'], meet: ['7.7'] };

// The pictures' colour code.
function Legend() {
  const c = useColors();
  const row = (color: string, dashed: boolean, text: string) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View style={{ width: 22, height: 12, borderRadius: 4, backgroundColor: color }} />
      <View style={{ width: 22, borderTopWidth: 3, borderStyle: dashed ? 'dashed' : 'solid', borderColor: dashed ? '#f08c00' : '#2fae4f' }} />
      <T style={{ flex: 1, fontSize: 13, lineHeight: 20, color: c.muted }}>{text}</T>
    </View>
  );
  return (
    <Card style={{ gap: 8 }}>
      <T style={{ fontWeight: '700', fontSize: 15 }}>راهنمای تصاویر</T>
      {row('#2f6fde', false, 'خودروی آبی با فلش سبز: حق تقدم دارد و اول می‌رود.')}
      {row('#d93a3a', true, 'خودروی قرمز با فلش نارنجی بریده: باید راه بدهد و صبر کند.')}
      <T style={{ fontSize: 12.5, lineHeight: 20, color: c.faint }}>عابران با لباس زرد و دوچرخه‌سواران با لباس بنفش نشان داده شده‌اند.</T>
    </Card>
  );
}

export default function Priority() {
  const c = useColors();
  const [cat, setCat] = useState(PRIORITY_CATS[0].id);
  const cur = PRIORITY_CATS.find(x => x.id === cat) ?? PRIORITY_CATS[0];
  return (
    <SubPage title="آموزش حق تقدم" subtitle="چه کسی اول می‌رود؟ همه‌ی حالت‌ها بر اساس قانون راهنمایی و رانندگی دانمارک.">
      <Chips value={cat} onChange={setCat} options={PRIORITY_CATS.map(x => ({ value: x.id, label: SHORT[x.id] ?? x.title }))} />
      <Card style={{ gap: 8 }}>
        <T style={{ fontWeight: '800', fontSize: 17 }}>{cur.title}</T>
        <Rich text={cur.intro} style={{ fontSize: 14, lineHeight: 24, color: c.muted }} />
      </Card>
      {cat === PRIORITY_CATS[0].id ? <Legend /> : null}
      {cur.items.map(s => (
        <Enter key={s.key}>
          <Card style={{ padding: 10, gap: 10 }}>
            <GuideImage k={s.key} aspect={4 / 3} />
            <View style={{ paddingHorizontal: 4, gap: 8 }}>
              <T style={{ fontSize: 16, lineHeight: 25, fontWeight: '800' }}>{s.title}</T>
              <Rich text={s.text} style={{ fontSize: 14.5, lineHeight: 25 }} />
              {/* who goes first */}
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, padding: 12, borderRadius: 12, backgroundColor: c.okSoft }}>
                <Icon name="checkCircle" size={18} color={c.ok} />
                <T style={{ flex: 1, fontSize: 14, lineHeight: 23 }}><T style={{ fontSize: 14, fontWeight: '800', color: c.ok }}>چه کسی اول می‌رود؟ </T>{s.first}</T>
              </View>
              <T style={{ fontSize: 12, color: c.faint }}>مبنای قانونی: {s.law}</T>
            </View>
          </Card>
        </Enter>
      ))}
      <PracticeButton topics={TOPICS[cur.id] ?? ['7.11']} title={cur.title} />
      {cat !== PRIORITY_CATS[0].id ? <Legend /> : null}
      <T style={{ color: c.faint, fontSize: 11.5, lineHeight: 19, textAlign: 'center' }}>منبع: <L style={{ fontSize: 11.5, color: c.faint }}>{GUIDE_SOURCES}</L>.</T>
    </SubPage>
  );
}
