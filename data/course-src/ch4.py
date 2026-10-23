# Chapter 4 «تابلوها، خط‌کشی‌ها و چراغ‌ها» (after course.ts's warning, priority, ban and mandatory signs): road markings,
# traffic lights and the chapter's test. Rules from Bekendtgørelse om vejafmærkning §§ 55–61 (V 46: a bus lane for zero-
# emission cars too) and 65–66 and Færdselsloven §§ 14, 27 and 29.
from course import SIGNS_BEK, TOWN, above, intro, law, lesson, picture, q, result, st, summary, teach, view

LIGHTS = ("Traffic lights are drawn as small poles with a three-lamp signal head (red at the top, amber in the middle, green at "
          "the bottom), each clearly showing which lamp is lit.")


def bek(par):
    """The rules for signs and markings, at a paragraph (the same in the three languages but for «and»)."""
    return [f'{SIGNS_BEK} {par}', f'{SIGNS_BEK} {par}', f'{SIGNS_BEK} {par}']


# ---------- pictures (prompts for the image model) ----------
above('mark-lines', """
THE SCENE: a long two-way country road running from the bottom of the picture to the top, one lane in each direction, plain green verges; near the top the road bends to the left behind a group of dense trees, so the view ahead ends there. The centre line changes three times, each part clearly different:
- in the lower third: a Danish lane line Q 41: narrow white SHORT dashes with LONG gaps (gaps about three times the dashes);
- in the middle third: a Danish warning line Q 42: narrow white LONG dashes with SHORT gaps (dashes about three times the gaps);
- in the upper third, from about 100 m before the bend: a Danish barrier line Q 44: one narrow SOLID white line.
Solid white edge lines along both sides.
ROAD USERS (colour code used strictly): a RED car (ours) in the right-hand lane in the lower third, driving up; a BLUE car coming down out of the bend in the left-hand lane.
MUST NOT APPEAR: arrows, signs, other vehicles, people, text, letters, numbers, left-hand traffic.
""")

above('mark-double', """
THE SCENE: a long straight two-way country road running from the bottom to the top of the picture, one lane in each direction, solid white edge lines, plain green verges. In the middle of the road a DOUBLE centre line: a BROKEN white line on OUR side (the right-hand half) and, right beside it, a SOLID white line on the other side.
ROAD USERS (colour code used strictly):
- a slow GREEN tractor in the right-hand lane in the middle of the picture, driving up;
- a RED car (ours) overtaking it: already in the left-hand lane beside the tractor, with a DASHED ORANGE arrow curving back into the right-hand lane in front of the tractor;
- the left-hand lane ahead is empty up to the top of the picture.
MUST NOT APPEAR: signs, other vehicles, people, text, letters, numbers, left-hand traffic.
""")

above('mark-hatch', """
THE SCENE: a two-way road outside town coming up from the bottom of the picture to a junction near the top where a side road goes off to the left. Before the junction a left-turn lane opens in the middle of the road: between our straight-on lane and the left-turn lane lies a long wedge-shaped HATCHED AREA (Danish Q 45): white diagonal stripes inside a white solid outline, narrow at the bottom and wide near the junction. The left-turn lane has a white left-pointing arrow painted on it.
ROAD USERS (colour code used strictly):
- a RED car (ours) that has moved into the left-turn lane only after the hatched area, its left indicator flashing orange, a DASHED ORANGE arrow from it into the side road;
- a faint semi-transparent ghost of a grey car driving across the hatched area, crossed out by a red X in a white circle (wrong);
- two BLUE cars in the straight-on lane.
MUST NOT APPEAR: signs, people, text, letters, numbers, left-hand traffic.
""")

above('mark-arrows', """
THE SCENE: a wide town street coming up from the bottom of the picture to a crossroads at the top. Our side has, from left to right: a left-turn lane with a white painted arrow pointing LEFT; a straight-on lane with a white painted arrow pointing STRAIGHT ahead; a bus lane separated by a BROAD solid white line, with the word "BUS" painted in large white letters in it; and on the far right a cycle lane separated by a narrow solid white line, with white bicycle symbols painted in it. Where the cycle lane crosses the junction it continues as a BLUE-coloured cycle field with broken white edges (Danish S 21). The oncoming side on the left is separated by a solid centre line. Pavements with kerbs.
ROAD USERS (colour code used strictly): a RED car (ours) in the straight-on lane; a yellow bus in the bus lane; a cyclist in the cycle lane.
MUST NOT APPEAR: arrows other than the painted ones, signs, text other than the painted word BUS, left-hand traffic.
""")

view('exam-mark-warn', """
THE SCENE: a two-way country road, one lane in each direction, solid white edge lines, running straight ahead up to a hill crest about 150 m ahead where it disappears from view. The centre line is a Danish warning line Q 42: narrow white LONG dashes with SHORT gaps (dashes about three times the gaps); just before the crest it becomes one SOLID white line.
ROAD USERS: none; the road is empty as far as we can see.
MUST BE CLEARLY VISIBLE: the long dashes with short gaps, the solid line at the crest.
MUST NOT APPEAR: signs, road users, text.
""")

view('exam-mark-double', """
THE SCENE: a straight two-way country road, one lane in each direction, solid white edge lines, good view far ahead. In the middle of the road a DOUBLE centre line: a BROKEN white line on our side (nearest to us) and, right beside it, a SOLID white line on the far side.
ROAD USERS: a slow green tractor in our lane about 25 m ahead of us, seen from behind; the oncoming lane is empty as far as we can see.
MUST BE CLEARLY VISIBLE: which of the two lines is broken (ours) and which is solid.
MUST NOT APPEAR: signs, other road users, text.
""")

view('exam-mark-hatch', """
THE SCENE: a two-way road outside town approaching a junction about 80 m ahead where a side road goes off to the left. In our lane a short queue of three cars stands still with their brake lights on. To the left of our lane, between it and the oncoming lane, lies a long HATCHED AREA (Danish Q 45): white diagonal stripes inside a white solid outline, leading to a left-turn lane that only begins further ahead near the junction.
MUST BE CLEARLY VISIBLE: the hatched area beside the queue and the start of the left-turn lane beyond it.
MUST NOT APPEAR: signs, other road users, text.
""")

picture('light-sequence', f"""
A teaching illustration for a Danish driving-theory app: FOUR identical traffic-light heads standing in a row from left to right on a plain light background, each a black three-lamp head (red at the top, amber in the middle, green at the bottom) on a short grey pole. From left to right they show: 1) only RED lit; 2) RED and AMBER lit together; 3) only GREEN lit; 4) only AMBER lit. The unlit lamps are dark. Between the heads, small grey arrows point to the next one, showing the order.
MUST NOT APPEAR: text, letters, numbers, cars, people.
Style: a clean, precise flat vector illustration, NOT photorealistic: simple shapes, flat colours, crisp edges, lit lamps bright with a soft glow. No text anywhere.
""")

view('light-yellow', f"""
THE SCENE: a straight town street, one lane in our direction, approaching a junction controlled by traffic lights about 30 m ahead; the traffic light at the right side of the stop line has just changed to AMBER (only the amber lamp lit). A white stop line across our lane before the junction. The junction is empty.
MUST BE CLEARLY VISIBLE: the amber light, the stop line, the distance to it.
MUST NOT APPEAR: other road users, signs, text.
""", scenery=TOWN)

picture('light-special', """
A teaching illustration for a Danish driving-theory app: three special traffic signals standing side by side on grey poles on a plain light background, from left to right:
1) a small cyclist signal: a narrow three-lamp head whose lamps show a BICYCLE symbol, the red bicycle lit;
2) a bus signal: a black head whose lamps show WHITE BARS instead of colours, one horizontal white bar lit;
3) a level-crossing signal: under a white cross with a red border (the Danish level-crossing cross mark A 74), a black plate with TWO round red lamps side by side, one of them lit and glowing (they flash in turn).
MUST NOT APPEAR: text, letters, numbers, cars, people.
Style: a clean, precise flat vector illustration, NOT photorealistic: simple shapes, flat colours, crisp edges, lit lamps bright with a soft glow. No text anywhere.
""")

view('exam-light-yellow', """
THE SCENE: a straight town street, one lane in our direction, about 30 m before a junction controlled by traffic lights; the traffic light has just changed from green to AMBER (only the amber lamp lit). A white stop line across our lane before the junction; the junction is empty. Nobody close behind us.
MUST BE CLEARLY VISIBLE: the amber light, the stop line, the distance to it.
MUST NOT APPEAR: other road users, signs, text.
""", scenery=TOWN)

view('exam-light-redyellow', """
THE SCENE: we stand first at the stop line of a junction in town controlled by traffic lights. Our traffic light shows RED and AMBER lit together. Just in front of us a zebra crossing runs across our lane, and two pedestrians are still walking across it, in the middle of our lane.
MUST BE CLEARLY VISIBLE: the red-and-amber light, the two pedestrians on the crossing in front of us.
MUST NOT APPEAR: other road users, signs, text.
""", scenery=TOWN)

view('exam-light-rail', """
THE SCENE: a two-way country road reaching a railway level crossing about 20 m ahead: the rails cross the road, red-and-white striped barriers on both sides are coming down, and at the right side of the road, below a white cross with a red border (the Danish level-crossing cross mark A 74), a black plate with two round RED lamps that flash in turn (one lit and glowing). A white stop line across our lane before the crossing.
ROAD USERS: none; no train visible yet.
MUST BE CLEARLY VISIBLE: the flashing red lamp, the lowering barriers, the rails, the stop line.
MUST NOT APPEAR: other road users, text.
""")


# ---------- the lessons ----------
MARKINGS = lesson('markings', 'MARKINGS', ('خط‌کشی‌ها', 'Road markings', 'Afmærkning'), 8, [
    intro(('خط‌کشی‌های جاده (afmærkning)', 'Road markings (afmærkning)', 'Afmærkning på kørebanen'),
          ('خط‌کشی‌ها هم مثل تابلوها قانون‌اند. آزمون می‌پرسد از کدام خط می‌توانید رد شوید، خط دوتایی چه می‌گوید، روی هاشور چه نباید کرد و پیکان‌ها و خط اتوبوس و دوچرخه چه معنایی دارند.',
           'Road markings are rules, just like signs. The test asks which lines you may cross, what a double line says, what you must not do on a hatched area, and what painted arrows, bus lanes and cycle lanes mean.',
           'Afmærkningen på kørebanen er regler ligesom tavlerne. Prøven spørger, hvilke linjer du må overskride, hvad en dobbelt linje betyder, hvad du ikke må på en spærreflade, og hvad pile, busbaner og cykelbaner betyder.'),
          [('خط بریده، خط هشدار و خط ممتد را از هم تشخیص دهید.', 'Tell the lane line, the warning line and the barrier line apart.', 'Skelne mellem vognbanelinje, varslingslinje og spærrelinje.'),
           ('بدانید در خط دوتایی کدام خط برای شما حکم می‌کند.', 'Know which line counts for you in a double line.', 'Vide hvilken linje der gælder for dig ved en dobbelt linje.'),
           ('هاشور، خط کناری، پیکان‌ها، خط اتوبوس و مسیر دوچرخه را بشناسید.', 'Know hatched areas, edge lines, arrows, bus lanes and cycle lanes.', 'Kende spærreflader, kantlinjer, pile, busbaner og cykelbaner.')],
          [('خط هشدار با خط‌های بلند و فاصله‌های کوتاه پیش از سربالایی.', 'A warning line of long dashes and short gaps before a hilltop.', 'En varslingslinje med lange streger og korte mellemrum før en bakketop.'),
           ('خط دوتایی وقتی می‌خواهید از تراکتور سبقت بگیرید.', 'A double line when you want to overtake a tractor.', 'En dobbelt linje, når du vil overhale en traktor.'),
           ('هاشور کنار صفی که پیش از خط گردش به چپ ایستاده.', 'A hatched area beside a queue before a left-turn lane.', 'En spærreflade ved en kø før en venstresvingsbane.')]),
    teach(('سه خط وسط جاده', 'The three centre lines', 'De tre midterlinjer'),
          ('خط بریده با خط‌های کوتاه و فاصله‌های بلند (Q 41، vognbanelinje) را می‌توانید وقتی بی‌خطر است رد کنید. خط بریده با خط‌های بلند و فاصله‌های کوتاه (Q 42، varslingslinje) هشدار است: به‌زودی خط ممتد می‌آید؛ عبور از آن فقط با احتیاط ویژه. از خط ممتد (Q 44، spærrelinje) نباید رد شوید و روی آن هم نرانید، حتی برای پیچیدن به ملک یا در تقاطع. استثنا: وقتی مانعی مثل خودروی ایستاده یا پارک‌شده یا کار جاده‌ای راه را بسته؛ آن وقت با احتیاط ویژه.',
           'You may cross the broken line of short dashes and long gaps (Q 41, vognbanelinje) when it is safe. The broken line of long dashes and short gaps (Q 42, varslingslinje) is a warning: a solid line is coming soon; cross it only with special care. You must not cross the solid line (Q 44, spærrelinje) or drive on it, not even to turn into a property or at a junction. Exception: when an obstacle such as a stopped or parked vehicle or roadworks blocks the way; then with special care.',
           'Den punkterede linje med korte streger og lange mellemrum (Q 41, vognbanelinje) må du overskride, når det kan ske uden fare. Den punkterede linje med lange streger og korte mellemrum (Q 42, varslingslinje) er en advarsel: der kommer snart en spærrelinje; den må kun overskrides med særlig forsigtighed. Spærrelinjen (Q 44) må du hverken overskride eller køre på, heller ikke for at svinge ind til en ejendom eller i et vejkryds. Undtagelse: når en forhindring som et standset eller parkeret køretøj eller vejarbejde spærrer; da med særlig agtpågivenhed.'),
          art='mark-lines',
          rule=('خط کوتاه-فاصله بلند: عبور با احتیاط؛ خط بلند-فاصله کوتاه: هشدار؛ خط ممتد: عبور ممنوع.', 'Short dashes, long gaps: cross with care; long dashes, short gaps: a warning; solid: no crossing.', 'Korte streger og lange mellemrum: overskrid med forsigtighed; lange streger og korte mellemrum: advarsel; ubrudt: forbudt at overskride.'),
          law=law(bek('§ 55'), 'Q 41 | Q 42 | Q 44'),
          trap=('خط هشدار (Q 42) را با خط معمولی اشتباه نگیرید: یعنی سبقت تازه شروع نکنید، چون خط ممتد نزدیک است.', 'Do not mistake the warning line (Q 42) for an ordinary line: it means do not start an overtaking now, because a solid line is close.', 'Forveksl ikke varslingslinjen (Q 42) med en almindelig linje: den betyder, at du ikke skal begynde en overhaling nu, fordi spærrelinjen er tæt på.')),
    teach(('خط دوتایی: خطِ سمت شما حکم می‌کند', 'A double line: the line on your side counts', 'Dobbelt linje: linjen nærmest dig gælder'),
          ('وقتی یک خط ممتد و یک خط بریده کنار هم‌اند، خطی که به شما نزدیک‌تر است تعیین می‌کند. اگر خط بریده سمت شماست، می‌توانید برای سبقت از آن رد شوید و برگردید؛ اگر خط ممتد سمت شماست، نباید رد شوید. کسی که در خط مقابل است، همیشه می‌تواند به سمت راست خود برگردد. در تصویر، خط بریده سمت خودروی قرمز است و سبقت از تراکتور مجاز است.',
           'When a solid line and a broken line run side by side, the line nearest to you decides. If the broken line is on your side, you may cross it to overtake and come back; if the solid line is on your side, you must not cross. A driver in the opposite lane may always return to their own right-hand side. In the picture the broken line is on the red car\'s side, and overtaking the tractor is allowed.',
           'Når en spærrelinje og en punkteret linje ligger ved siden af hinanden, er det linjen nærmest dig, der gælder. Er den punkterede linje i din side, må du overskride den for at overhale og køre tilbage; er spærrelinjen i din side, må du ikke. Den, der er ude i modsat vognbane, må altid køre tilbage til sin højre side. På billedet er den punkterede linje i den røde bils side, og det er tilladt at overhale traktoren.'),
          art='mark-double',
          rule=('در خط دوتایی، خطِ نزدیک به شما تعیین می‌کند.', 'In a double line, the line nearest to you decides.', 'Ved dobbelt linje gælder linjen nærmest dig.'),
          law=law(bek('§ 55'), 'Q 44'),
          trap=('«یک خط ممتد هست، پس سبقت ممنوع است» غلط است وقتی خط بریده سمت شماست.', '«There is a solid line, so overtaking is forbidden» is wrong when the broken line is on your side.', '«Der er en spærrelinje, så overhaling er forbudt» er forkert, når den punkterede linje er i din side.')),
    teach(('هاشور و خط کناری', 'Hatched areas and edge lines', 'Spærreflader og kantlinjer'),
          ('روی منطقه‌ی هاشورخورده (Q 45، spærreflade) نباید برانید، بایستید یا پارک کنید؛ حتی وقتی صف است. خط کناری ممتد (Q 46) لبه‌ی سواره‌رو را نشان می‌دهد: خودرو فقط برای توقف، پارک یا ورود و خروج از جاده از آن رد می‌شود (و خودروی آهسته کوتاه، برای این‌که دیگران سبقت بگیرند). خط کناری بریده (Q 47) را وقتی بی‌خطر است می‌توانید رد کنید.',
           'You must not drive, stop or park on a hatched area (Q 45, spærreflade), not even in a queue. The solid edge line (Q 46) marks the edge of the carriageway: a car only crosses it to stop, park or drive onto or off the road (and a slow vehicle briefly, to let others overtake). You may cross a broken edge line (Q 47) when it is safe.',
           'På en spærreflade (Q 45) må du hverken køre, standse eller parkere, heller ikke i kø. Den ubrudte kantlinje (Q 46) markerer kørebanens kant: en bil overskrider den kun for at standse, parkere eller køre ind på eller bort fra vejen (og et langsomt køretøj kortvarigt for at lade andre overhale). En punkteret kantlinje (Q 47) må du overskride, når det kan ske uden fare.'),
          art='mark-hatch',
          rule=('روی هاشور نرانید، نایستید و پارک نکنید.', 'Do not drive, stop or park on a hatched area.', 'Kør, stands og parkér ikke på en spærreflade.'),
          law=law(bek('§ 55'), 'Q 45 | Q 46 | Q 47'),
          trap=('«هاشور فقط رنگ است؛ وقتی کسی نیست می‌توانم از رویش رد شوم» غلط است.', '«A hatched area is only paint; when nobody is there I may drive over it» is wrong.', '«En spærreflade er bare maling; når der ikke er nogen, må jeg køre over den» er forkert.')),
    teach(('پیکان‌ها، خط اتوبوس و مسیر دوچرخه', 'Painted arrows, bus lanes and cycle lanes', 'Pile, busbaner og cykelbaner'),
          ('پیکان‌های روی خط نشان می‌دهند آن خط در تقاطع به کدام جهت می‌رود؛ به موقع خط درست را بگیرید. از خطی که برای نوع دیگری از وسیله است، مثل خط اتوبوس (BUS) یا مسیر دوچرخه (cykelbane، با خط ممتد و نماد دوچرخه)، استفاده نکنید و در آن پارک نکنید، مگر علامت آن خط وسیله‌ی شما را هم مجاز کند؛ مثلاً نماد خودروی بدون آلایندگی (V 46) در خط اتوبوس یعنی خودروی برقی یا هیدروژنی هم می‌تواند از آن برود. میدان آبی دوچرخه (S 21) در تقاطع نشان می‌دهد دوچرخه‌سواران از آن‌جا رد می‌شوند؛ هنگام گردش مراقب باشید.',
           'The arrows painted in a lane show which way that lane goes at the junction; take the right lane in good time. Do not use or park in a lane meant for another kind of vehicle, such as a bus lane (BUS) or a cycle lane (cykelbane, with a solid line and bicycle symbols), unless the lane\'s marking also allows your vehicle; for example the symbol for zero-emission cars (V 46) in a bus lane means that electric or hydrogen cars may use it too. A blue cycle field (S 21) in a junction shows that cyclists cross there; take care when you turn.',
           'Pilene i en vognbane viser, hvilken vej vognbanen fører i krydset; vælg den rigtige vognbane i god tid. Brug ikke en bane, der er beregnet for en anden slags køretøjer, som en busbane (BUS) eller en cykelbane (med ubrudt linje og cykelsymboler), og parkér ikke i den, medmindre afmærkningen også tillader dit køretøj; fx betyder symbolet for nulemissionsbil (V 46) i en busbane, at biler på el eller brint også må bruge den. Et blåt cykelfelt (S 21) i krydset viser, at cyklister kører over der; pas på, når du svinger.'),
          art='mark-arrows',
          rule=('پیکان خط را دنبال کنید؛ در خط اتوبوس و مسیر دوچرخه نرانید.', 'Follow your lane\'s arrow; do not drive in bus lanes or cycle lanes.', 'Følg pilen i din vognbane; kør ikke i busbaner og cykelbaner.'),
          law=law((14, 1), [f'{SIGNS_BEK} § 55، § 57، § 59 و § 61', f'{SIGNS_BEK} § 55, § 57, § 59 and § 61', f'{SIGNS_BEK} § 55, § 57, § 59 og § 61'], 'Q 46 | R 11 | S 21 | V 46'),
          trap=('«خط اتوبوس خالی است، پس می‌توانم در آن برانم» غلط است.', '«The bus lane is empty, so I may drive in it» is wrong.', '«Busbanen er tom, så jeg må køre i den» er forkert.')),
    q('exam-mark-warn',
      'Midterlinjen har lange streger og korte mellemrum. Hvad betyder den?',
      'The centre line has long dashes and short gaps. What does it mean?',
      'خط وسط خط‌های بلند و فاصله‌های کوتاه دارد. چه معنایی دارد؟',
      st(True, 'Den varsler, at der kommer en spærrelinje.', 'It warns that a barrier line is coming.', 'هشدار می‌دهد که به‌زودی خط ممتد می‌آید.',
         ('خط هشدار (Q 42) پیش از خط ممتد می‌آید.', 'The warning line (Q 42) comes before a barrier line.', 'Varslingslinjen (Q 42) kommer før en spærrelinje.')),
      st(True, 'Jeg må kun overskride den med særlig forsigtighed.', 'I may only cross it with special care.', 'فقط با احتیاط ویژه می‌توانم از آن رد شوم.',
         ('عبور از خط هشدار ممنوع نیست، ولی احتیاط بیشتری می‌خواهد.', 'Crossing the warning line is not forbidden, but it needs more care.', 'Det er ikke forbudt at overskride varslingslinjen, men det kræver særlig forsigtighed.')),
      st(False, 'Den betyder, at det er forbudt at overskride linjen.', 'It means that it is forbidden to cross the line.', 'یعنی عبور از این خط ممنوع است.',
         ('فقط خط ممتد (Q 44) عبور را ممنوع می‌کند.', 'Only the solid line (Q 44) forbids crossing.', 'Kun spærrelinjen (Q 44) forbyder overskridelse.')),
      rule=0),
    q('exam-mark-double',
      'Du vil overhale traktoren. Midt på vejen ligger en punkteret og en ubrudt linje ved siden af hinanden; den punkterede er nærmest dig. Må du overhale?',
      'You want to overtake the tractor. In the middle of the road a broken and a solid line run side by side; the broken one is nearest to you. May you overtake?',
      'می‌خواهید از تراکتور سبقت بگیرید. وسط جاده یک خط بریده و یک خط ممتد کنار هم‌اند و خط بریده به شما نزدیک‌تر است. سبقت مجاز است؟',
      st(True, 'Ja, hvis det kan ske uden fare, fordi den punkterede linje er nærmest mig.', 'Yes, if it can be done safely, because the broken line is nearest to me.', 'بله، اگر بی‌خطر باشد، چون خط بریده سمت من است.',
         ('در خط دوتایی خطِ نزدیک به شما تعیین می‌کند.', 'In a double line, the line nearest to you decides.', 'Ved dobbelt linje gælder linjen nærmest dig.')),
      st(False, 'Nej, fordi der er en spærrelinje midt på vejen.', 'No, because there is a barrier line in the middle of the road.', 'نه، چون وسط جاده خط ممتد هست.',
         ('خط ممتد سمت ترافیک روبه‌روست؛ برای شما خط بریده حکم می‌کند.', 'The solid line is on the oncoming side; for you the broken line counts.', 'Spærrelinjen er i de modkørendes side; for dig gælder den punkterede linje.')),
      rule=1),
    q('exam-mark-hatch',
      'Du skal svinge til venstre længere fremme. Må du køre på spærrefladen for at komme forbi køen?',
      'You are going to turn left further ahead. May you drive on the hatched area to get past the queue?',
      'جلوتر باید به چپ بپیچید. می‌توانید برای رد شدن از صف روی هاشور برانید؟',
      st(False, 'Ja, når der ikke kommer modkørende.', 'Yes, when there is no oncoming traffic.', 'بله، وقتی کسی از روبه‌رو نمی‌آید.',
         ('خالی بودن جاده هاشور را مجاز نمی‌کند.', 'An empty road does not make the hatched area allowed.', 'En tom vej gør ikke spærrefladen tilladt.')),
      st(True, 'Nej, jeg må ikke køre, standse eller parkere på en spærreflade.', 'No, I must not drive, stop or park on a hatched area.', 'نه، روی هاشور نباید برانم، بایستم یا پارک کنم.',
         ('هاشور (Q 45) برای رانندگی و توقف ممنوع است.', 'The hatched area (Q 45) is forbidden for driving and stopping.', 'Spærrefladen (Q 45) er forbudt at køre og standse på.')),
      st(True, 'Jeg venter i køen, til jeg kan køre ind i svingbanen, hvor den begynder.', 'I wait in the queue until I can drive into the turning lane where it begins.', 'در صف می‌مانم تا از جایی که خط گردش شروع می‌شود واردش شوم.',
         ('وارد خط گردش از جایی می‌شوید که هاشور تمام شده است.', 'You enter the turning lane where the hatched area ends.', 'Du kører ind i svingbanen, hvor spærrefladen slutter.')),
      rule=2),
    result(1),
    summary([('Q 41 (خط کوتاه): عبور با احتیاط؛ Q 42 (خط بلند): هشدار؛ Q 44 (ممتد): عبور ممنوع، حتی برای پیچیدن.', 'Q 41 (short dashes): cross with care; Q 42 (long dashes): a warning; Q 44 (solid): no crossing, not even to turn.', 'Q 41 (korte streger): overskrid med forsigtighed; Q 42 (lange streger): advarsel; Q 44 (ubrudt): forbudt, også ved sving.'),
             ('در خط دوتایی، خطِ نزدیک به شما حکم می‌کند.', 'In a double line, the line nearest to you counts.', 'Ved dobbelt linje gælder linjen nærmest dig.'),
             ('روی هاشور (Q 45) نرانید، نایستید و پارک نکنید.', 'Do not drive, stop or park on a hatched area (Q 45).', 'Kør, stands og parkér ikke på en spærreflade (Q 45).'),
             ('پیکان‌های خط را دنبال کنید؛ خط اتوبوس و مسیر دوچرخه مال شما نیست.', 'Follow the lane arrows; bus lanes and cycle lanes are not for you.', 'Følg pilene; busbaner og cykelbaner er ikke for dig.')],
            ('signs', 'law', 'plan')),
])

TRAFFIC_LIGHTS = lesson('traffic-lights', 'TRAFFIC_LIGHTS', ('چراغ راهنمایی', 'Traffic lights', 'Lyssignal'), 7, [
    intro(('چراغ راهنمایی (lyssignal)', 'Traffic lights (lyssignal)', 'Lyssignaler'),
          ('آزمون معنای دقیق هر چراغ را می‌پرسد، به‌خصوص زرد و قرمز و زرد با هم، و چراغ‌های ویژه مثل چراغ دوچرخه، اتوبوس و چراغ قرمز چشمک‌زن کنار ریل قطار.',
           'The test asks the exact meaning of each light, especially amber and red with amber, and special lights such as those for cyclists and buses and the flashing red lights at a level crossing.',
           'Prøven spørger om den præcise betydning af hvert lys, især gult og rødt og gult samtidig, og om særlige signaler som cyklist- og bussignaler og røde blinklys ved en jernbaneoverkørsel.'),
          [('معنای قرمز، قرمز و زرد، سبز و زرد را بدانید.', 'Know what red, red with amber, green and amber mean.', 'Vide hvad rødt, rødt og gult, grønt og gult betyder.'),
           ('بدانید کِی با چراغ زرد می‌شود رد شد.', 'Know when you may pass on amber.', 'Vide hvornår du må køre over for gult.'),
           ('چراغ‌های ویژه را بشناسید.', 'Recognise the special signals.', 'Kende de særlige signaler.')],
          [('چراغی که همین حالا زرد شده، وقتی هنوز تا خط ایست فاصله دارید.', 'A light that has just turned amber while you are still some way from the stop line.', 'Et signal, der lige er skiftet til gult, mens du stadig er et stykke fra stoplinjen.'),
           ('قرمز و زرد با هم و عابرانی که هنوز رد می‌شوند.', 'Red and amber together and pedestrians still crossing.', 'Rødt og gult samtidig og fodgængere, der stadig går over.'),
           ('چراغ قرمز چشمک‌زن کنار ریل قطار.', 'Flashing red lights at a level crossing.', 'Røde blinklys ved en jernbaneoverkørsel.')]),
    teach(('چهار حالت چراغ', 'The four lights', 'Signalets fire lys'),
          ('قرمز: پشت خط ایست بایستید (اگر خط نیست، با فاصله‌ی مطمئن پیش از تقاطع). قرمز و زرد با هم: هنوز قرمز است و باید صبر کنید؛ فقط خبر می‌دهد که به‌زودی سبز می‌شود. سبز: بروید، اگر راه باز است. زرد: بایستید؛ به‌زودی قرمز می‌شود. فقط اگر آن‌قدر نزدیکید که ایستادن خطرناک است، رد شوید.',
           'Red: stop behind the stop line (if there is none, at a safe distance before the junction). Red and amber together: it is still red and you must wait; it only tells you that green is coming soon. Green: go, if the way is clear. Amber: stop; it is about to turn red. Only if you are so close that stopping would be dangerous do you continue.',
           'Rødt: stands bag stoplinjen (er der ingen, i sikker afstand før krydset). Rødt og gult samtidig: det er stadig rødt, og du skal vente; det viser kun, at der snart bliver grønt. Grønt: kør, hvis vejen er fri. Gult: stands; der bliver snart rødt. Kun hvis du er så tæt på, at det vil være farligt at standse, kører du videre.'),
          art='light-sequence',
          rule=('قرمز و قرمز+زرد: بایستید؛ سبز: بروید؛ زرد: بایستید، مگر ایستادن خطرناک باشد.', 'Red and red with amber: stop; green: go; amber: stop, unless stopping would be dangerous.', 'Rødt og rødt og gult: stop; grønt: kør; gult: stop, medmindre det er farligt at standse.'),
          law=law(bek('§ 65'), 'X 11 | S 13'),
          trap=('«قرمز و زرد با هم یعنی می‌توانم راه بیفتم» غلط است؛ تا سبز نشده صبر کنید.', '«Red and amber together means I may move off» is wrong; wait until it is green.', '«Rødt og gult samtidig betyder, at jeg må køre» er forkert; vent til grønt.')),
    teach(('زرد: بایستید', 'Amber: stop', 'Gult: stands'),
          ('زرد یعنی بایستید، نه «عجله کن». فقط وقتی آن‌قدر به خط ایست نزدیکید که ترمز ناگهانی خطرناک است، ادامه بدهید. وقتی چراغ مدتی سبز بوده، آماده باشید که زرد شود و سرعت را بی‌جا بالا نبرید. در تصویر هنوز حدود ۳۰ متر تا خط ایست مانده: باید بایستید.',
           'Amber means stop, not «hurry». Only when you are so close to the stop line that braking hard would be dangerous do you continue. When the light has been green for a while, be ready for it to turn amber, and do not speed up. In the picture there are still about 30 m to the stop line: you must stop.',
           'Gult betyder stop, ikke «skynd dig». Kun når du er så tæt på stoplinjen, at en hård opbremsning vil være farlig, kører du videre. Har signalet været grønt et stykke tid, skal du være klar til, at det skifter til gult, og ikke sætte farten op. På billedet er der stadig omkring 30 m til stoplinjen: du skal standse.'),
          art='light-yellow',
          rule=('زرد یعنی بایستید؛ فقط وقتی ایستادن خطرناک است، رد شوید.', 'Amber means stop; only pass when stopping would be dangerous.', 'Gult betyder stop; kør kun over, når det er farligt at standse.'),
          law=law(bek('§ 65')),
          trap=('«زرد شد، گاز می‌دهم تا برسم» غلط است.', '«It turned amber, so I speed up to make it» is wrong.', '«Der blev gult, så jeg speeder op for at nå det» er forkert.')),
    teach(('چراغ‌های ویژه', 'Special signals', 'Særlige signaler'),
          ('چراغ پیکان‌دار فقط برای جهت پیکان است. چراغ کوچک با نماد دوچرخه برای دوچرخه‌سواران است و چراغ با خط‌های سفید برای اتوبوس؛ هیچ‌کدام برای شما نیست. زرد چشمک‌زن یعنی با احتیاط بیشتر رد شوید. چراغ قرمز چشمک‌زن، مثلاً دو چراغ قرمز که به نوبت روشن می‌شوند کنار ریل قطار، پل متحرک یا ایستگاه آتش‌نشانی، یعنی بایستید و رد نشوید.',
           'An arrow signal only applies to the arrow\'s direction. A small signal with a bicycle symbol is for cyclists, and a signal with white bars is for buses; neither is for you. Flashing amber means pass with extra care. A flashing red signal, for example two red lamps lit in turn at a level crossing, a lifting bridge or a fire station, means stop and do not pass.',
           'Et pilsignal gælder kun i pilens retning. Et lille signal med cykelsymbol er for cyklister, og et signal med hvide streger er for busser; ingen af dem gælder for dig. Gult blink betyder særlig forsigtighed. Rødt blink, f.eks. to røde lys, der blinker skiftevis ved en jernbaneoverkørsel, en klapbro eller en brandstation, betyder stop, og du må ikke køre forbi.'),
          art='light-special',
          rule=('قرمز چشمک‌زن یعنی بایستید؛ چراغ دوچرخه و اتوبوس برای شما نیست.', 'Flashing red means stop; cyclist and bus signals are not for you.', 'Rødt blink betyder stop; cyklist- og bussignaler gælder ikke for dig.'),
          law=law([f'{SIGNS_BEK} § 62 و § 66', f'{SIGNS_BEK} § 62 and § 66', f'{SIGNS_BEK} § 62 og § 66'], 'X 12 | X 16'),
          trap=('«چراغ اتوبوس سبز است، پس من هم می‌روم» غلط است؛ به چراغ خودتان نگاه کنید.', '«The bus signal says go, so I go too» is wrong; look at your own light.', '«Bussignalet viser kør, så kører jeg også» er forkert; se på dit eget signal.')),
    q('exam-light-yellow',
      'Lyset skifter fra grønt til gult. Hvordan forholder du dig?',
      'The light changes from green to amber. What do you do?',
      'چراغ از سبز به زرد تغییر می‌کند. چه می‌کنید؟',
      st(True, 'Jeg standser ved stoplinjen.', 'I stop at the stop line.', 'پشت خط ایست می‌ایستم.',
         ('زرد یعنی بایستید؛ این‌جا هنوز فاصله‌ی کافی برای ایستادن دارید.', 'Amber means stop; here you still have enough distance to stop.', 'Gult betyder stop; her har du stadig afstand nok til at standse.')),
      st(False, 'Jeg øger farten for at nå over, før det bliver rødt.', 'I speed up to get across before it turns red.', 'سرعتم را بالا می‌برم تا پیش از قرمز شدن رد شوم.',
         ('گاز دادن با چراغ زرد خطرناک و غلط است.', 'Speeding up on amber is dangerous and wrong.', 'At speede op for gult er farligt og forkert.')),
      st(False, 'Gult lys betyder, at jeg må køre, hvis krydset er frit.', 'Amber means I may drive if the junction is clear.', 'زرد یعنی اگر تقاطع خالی است، می‌توانم بروم.',
         ('زرد یعنی بایستید، نه «اگر خالی است برو».', 'Amber means stop, not «go if it is clear».', 'Gult betyder stop, ikke «kør, hvis der er frit».')),
      rule=1),
    q('exam-light-redyellow',
      'Du holder ved stoplinjen. Lyset viser rødt og gult samtidig. Hvordan forholder du dig?',
      'You are waiting at the stop line. The light shows red and amber together. What do you do?',
      'پشت خط ایست ایستاده‌اید. چراغ قرمز و زرد را با هم نشان می‌دهد. چه می‌کنید؟',
      st(False, 'Jeg kører, fordi det gule lys er tændt.', 'I drive off because the amber light is on.', 'راه می‌افتم، چون چراغ زرد روشن است.',
         ('قرمز و زرد با هم هنوز یعنی بایستید.', 'Red and amber together still means stop.', 'Rødt og gult samtidig betyder stadig stop.')),
      st(True, 'Jeg venter, til lyset bliver grønt.', 'I wait until the light turns green.', 'صبر می‌کنم تا چراغ سبز شود.',
         ('فقط با سبز اجازه‌ی حرکت دارید.', 'Only green lets you go.', 'Først ved grønt må du køre.')),
      st(True, 'Jeg holder også tilbage for fodgængerne, der stadig går over.', 'I also give way to the pedestrians who are still crossing.', 'به عابرانی که هنوز رد می‌شوند هم راه می‌دهم.',
         ('حتی وقتی سبز شد، به عابرانی که روی گذرگاه‌اند راه می‌دهید.', 'Even when it turns green, you give way to pedestrians on the crossing.', 'Også når der bliver grønt, holder du tilbage for fodgængere på fodgængerfeltet.')),
      rule=0),
    q('exam-light-rail',
      'Du nærmer dig en jernbaneoverkørsel. Det røde lys blinker, og bommene er ved at gå ned. Hvordan forholder du dig?',
      'You are approaching a level crossing. The red light is flashing and the barriers are coming down. What do you do?',
      'به تقاطع راه‌آهن نزدیک می‌شوید. چراغ قرمز چشمک می‌زند و راه‌بندها پایین می‌آیند. چه می‌کنید؟',
      st(True, 'Jeg standser før stoplinjen.', 'I stop before the stop line.', 'پیش از خط ایست می‌ایستم.',
         ('قرمز چشمک‌زن یعنی بایستید.', 'Flashing red means stop.', 'Rødt blink betyder stop.')),
      st(False, 'Jeg skynder mig over, før bommene er helt nede.', 'I hurry across before the barriers are fully down.', 'پیش از این‌که راه‌بندها کامل پایین بیایند، با عجله رد می‌شوم.',
         ('قطار نزدیک است؛ رد شدن زیر راه‌بند بسیار خطرناک و ممنوع است.', 'A train is coming; driving under the barriers is very dangerous and forbidden.', 'Toget er på vej; at køre under bommene er meget farligt og forbudt.')),
      rule=2),
    result(1),
    summary([('قرمز: بایستید؛ قرمز و زرد: هنوز صبر کنید؛ سبز: اگر راه باز است بروید.', 'Red: stop; red and amber: still wait; green: go if the way is clear.', 'Rødt: stop; rødt og gult: vent stadig; grønt: kør, hvis vejen er fri.'),
             ('زرد: بایستید، مگر آن‌قدر نزدیک باشید که ایستادن خطرناک است.', 'Amber: stop, unless you are so close that stopping would be dangerous.', 'Gult: stop, medmindre du er så tæt på, at det er farligt at standse.'),
             ('قرمز چشمک‌زن کنار ریل یا پل: بایستید و رد نشوید.', 'Flashing red at a level crossing or a bridge: stop and do not pass.', 'Rødt blink ved jernbaneoverkørsel eller bro: stop, og kør ikke forbi.'),
             ('چراغ دوچرخه و اتوبوس برای شما نیست.', 'Cyclist and bus signals are not for you.', 'Cyklist- og bussignaler gælder ikke for dig.')],
            ('signs', 'law', 'plan')),
])

SIGNS_TEST = lesson('signs-test', 'SIGNS_TEST', ('آزمون فصل', 'Chapter test', 'Kapiteltest'), 6, [
    intro(('آزمون فصل ۴', 'Chapter 4 test', 'Kapiteltest 4'),
          ('حالا تابلوها، خط‌کشی‌ها و چراغ‌ها را با هم مرور می‌کنیم. سؤال‌ها مثل آزمون واقعی‌اند و درس‌ها در هم آمده‌اند؛ هر علامت اشتباه یا جاافتاده یک اشتباه است.',
           'Now we go over signs, markings and traffic lights together. The questions are like the real test and the lessons are mixed; every wrong or missing tick is one mistake.',
           'Nu gennemgår vi tavler, afmærkning og lyssignaler samlet. Spørgsmålene er som ved den rigtige prøve, og lektionerne er blandet; hvert forkert eller manglende kryds er én fejl.'),
          [('نشان دهید تابلو، خط و چراغ را در یک نگاه می‌شناسید.', 'Show that you recognise signs, lines and lights at a glance.', 'Vise at du genkender tavler, linjer og signaler med det samme.'),
           ('نقطه‌های ضعفتان را پیش از فصل بعد پیدا کنید.', 'Find your weak points before the next chapter.', 'Finde dine svage punkter før næste kapitel.')],
          [('ترتیب چراغ‌ها، خط ممتد و پیکان‌های روی خط.', 'The order of the lights, the solid line and lane arrows.', 'Lysenes rækkefølge, spærrelinjen og vognbanepile.'),
           ('دندان‌کوسه، تابلوهای هشدار و چراغ قرمز کنار ریل.', 'Shark teeth, warning signs and red lights at a level crossing.', 'Hajtænder, advarselstavler og rødt lys ved en jernbaneoverkørsel.')]),
    q('light-sequence',
      'Hvilken rækkefølge skifter et almindeligt lyssignal i?',
      'In which order does an ordinary traffic light change?',
      'چراغ راهنمایی معمولی به چه ترتیبی عوض می‌شود؟',
      st(True, 'Efter rødt kommer rødt og gult samtidig.', 'After red comes red and amber together.', 'بعد از قرمز، قرمز و زرد با هم می‌آید.', ('قرمز و زرد خبر می‌دهد که به‌زودی سبز می‌شود.', 'Red and amber tells you that green is coming soon.', 'Rødt og gult viser, at der snart bliver grønt.')),
      st(True, 'Efter grønt kommer gult.', 'After green comes amber.', 'بعد از سبز، زرد می‌آید.', ('زرد خبر می‌دهد که به‌زودی قرمز می‌شود.', 'Amber tells you that red is coming soon.', 'Gult viser, at der snart bliver rødt.')),
      st(False, 'Efter gult kommer grønt.', 'After amber comes green.', 'بعد از زرد، سبز می‌آید.', ('بعد از زرد قرمز می‌آید.', 'After amber comes red.', 'Efter gult kommer rødt.'))),
    q('mark-lines',
      'Du vil svinge til venstre ind til en ejendom. Midt på vejen er der en spærrelinje. Hvad gælder?',
      'You want to turn left into a property. There is a barrier line in the middle of the road. What applies?',
      'می‌خواهید به چپ وارد یک ملک شوید. وسط جاده خط ممتد است. کدام درست است؟',
      st(True, 'Jeg må ikke køre over spærrelinjen for at svinge ind.', 'I must not cross the barrier line to turn in.', 'برای پیچیدن نباید از خط ممتد رد شوم.', ('از خط ممتد حتی برای پیچیدن نباید رد شد.', 'You must not cross a solid line even to turn.', 'Spærrelinjen må ikke overskrides, heller ikke for at svinge.')),
      st(False, 'Jeg må godt køre over linjen, når der ikke kommer modkørende.', 'I may cross the line when there is no oncoming traffic.', 'وقتی کسی از روبه‌رو نمی‌آید، می‌توانم از خط رد شوم.', ('خالی بودن جاده خط ممتد را لغو نمی‌کند.', 'An empty road does not cancel the solid line.', 'En tom vej ophæver ikke spærrelinjen.'))),
    q('mark-arrows',
      'Du skal ligeud i krydset. Hvilken vognbane bruger du?',
      'You are going straight on at the junction. Which lane do you use?',
      'در تقاطع مستقیم می‌روید. از کدام خط استفاده می‌کنید؟',
      st(True, 'Vognbanen med pilen ligeud.', 'The lane with the straight-on arrow.', 'خطی که پیکانش مستقیم است.', ('پیکان روی خط جهت آن خط را نشان می‌دهد.', 'The arrow in the lane shows the lane\'s direction.', 'Pilen i vognbanen viser vognbanens retning.')),
      st(False, 'Busbanen, hvis den er tom.', 'The bus lane if it is empty.', 'خط اتوبوس، اگر خالی باشد.', ('خط اتوبوس فقط برای اتوبوس است.', 'The bus lane is for buses only.', 'Busbanen er kun for busser.')),
      st(False, 'Cykelbanen, hvis der ikke er cyklister.', 'The cycle lane if there are no cyclists.', 'مسیر دوچرخه، اگر دوچرخه‌سواری نباشد.', ('در مسیر دوچرخه نباید برانید.', 'You must not drive in a cycle lane.', 'Du må ikke køre i cykelbanen.'))),
    q('give-way',
      'Hvad betyder hajtænderne på kørebanen foran dig?',
      'What do the shark teeth on the road in front of you mean?',
      'دندان‌کوسه‌های روی جاده‌ی جلوی شما چه معنایی دارند؟',
      st(True, 'Jeg skal holde tilbage for trafikken på den vej, jeg kører ind på.', 'I must give way to the traffic on the road I am driving onto.', 'باید به ترافیک جاده‌ای که واردش می‌شوم راه بدهم.', ('دندان‌کوسه (S 11) یعنی راه دادن مطلق.', 'Shark teeth (S 11) mean absolute give way.', 'Hajtænder (S 11) betyder ubetinget vigepligt.')),
      st(False, 'Jeg skal altid standse helt, også når vejen er fri.', 'I must always stop completely, even when the road is clear.', 'همیشه باید کامل بایستم، حتی وقتی جاده خالی است.', ('توقف کامل برای تابلوی STOP است؛ با دندان‌کوسه فقط وقتی لازم است می‌ایستید.', 'A full stop is for the STOP sign; with shark teeth you stop only when needed.', 'Fuldt stop gælder ved STOP-tavlen; ved hajtænder standser du kun, når det er nødvendigt.'))),
    q('warn-ahead',
      'Hvor står en advarselstavle normalt uden for byen?',
      'Where does a warning sign normally stand outside towns?',
      'بیرون شهر، تابلوی هشدار معمولاً کجا نصب می‌شود؟',
      st(True, 'Cirka 150-250 m før faren.', 'About 150-250 m before the danger.', 'حدود ۱۵۰ تا ۲۵۰ متر پیش از خطر.', ('بیرون شهر تابلوی هشدار معمولاً ۱۵۰ تا ۲۵۰ متر پیش از خطر است.', 'Outside towns a warning sign is normally 150-250 m before the danger.', 'Uden for byen står advarselstavlen normalt 150-250 m før faren.')),
      st(False, 'Lige ved faren.', 'Right at the danger.', 'درست کنار خطر.', ('تابلو زودتر می‌آید تا وقت داشته باشید سرعت کم کنید.', 'The sign comes earlier so that you have time to slow down.', 'Tavlen står før, så du har tid til at sænke farten.'))),
    q('exam-light-rail',
      'Bommene er gået op igen, men det røde lys blinker stadig. Hvordan forholder du dig?',
      'The barriers have gone up again, but the red light is still flashing. What do you do?',
      'راه‌بندها دوباره بالا رفته‌اند، ولی چراغ قرمز هنوز چشمک می‌زند. چه می‌کنید؟',
      st(True, 'Jeg venter, til det røde lys holder op med at blinke.', 'I wait until the red light stops flashing.', 'صبر می‌کنم تا چراغ قرمز دیگر چشمک نزند.', ('تا چراغ قرمز چشمک می‌زند، باید بایستید؛ ممکن است قطار دیگری بیاید.', 'As long as the red light flashes you must stay; another train may come.', 'Så længe det røde lys blinker, skal du holde; der kan komme et tog mere.')),
      st(False, 'Jeg kører, fordi bommene er oppe.', 'I drive on because the barriers are up.', 'می‌روم، چون راه‌بندها بالا هستند.', ('چراغ قرمز بر وضعیت راه‌بند مقدم است.', 'The red light counts, whatever the barriers do.', 'Det røde lys gælder, uanset bommene.'))),
    result(2),
    summary([('ترتیب چراغ: قرمز، قرمز و زرد، سبز، زرد، قرمز.', 'The order of the lights: red, red and amber, green, amber, red.', 'Lysenes rækkefølge: rødt, rødt og gult, grønt, gult, rødt.'),
             ('از خط ممتد حتی برای پیچیدن رد نشوید؛ پیکان خط را دنبال کنید.', 'Do not cross a solid line even to turn; follow your lane\'s arrow.', 'Overskrid ikke spærrelinjen, heller ikke for at svinge; følg pilen i din vognbane.'),
             ('دندان‌کوسه: راه دادن مطلق؛ تابلوی هشدار بیرون شهر ۱۵۰ تا ۲۵۰ متر پیش از خطر.', 'Shark teeth: absolute give way; outside towns a warning sign stands 150-250 m before the danger.', 'Hajtænder: ubetinget vigepligt; uden for byen står advarselstavlen 150-250 m før faren.'),
             ('تا چراغ قرمز کنار ریل چشمک می‌زند، بایستید.', 'Wait as long as the red light at a level crossing flashes.', 'Hold, så længe det røde lys ved jernbaneoverkørslen blinker.')],
            ('signs', 'law', 'plan')),
])

CHAPTER = 'signs'
LESSONS = [MARKINGS, TRAFFIC_LIGHTS, SIGNS_TEST]
