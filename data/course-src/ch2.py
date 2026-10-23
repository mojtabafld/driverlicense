# Chapter 2 «جایگاه در جاده و سرعت»: where the car goes on the road, the speed limits and adapting to them, distance and
# stopping distance, and the chapter's test. Rules from Færdselsloven §§ 14–20, 32, 33, 41–43 (retsinformation.dk).
from course import TOWN, above, intro, law, lesson, picture, q, result, st, summary, teach, view

# ---------- pictures (prompts for the image model) ----------
above('pos-right', """
THE SCENE: one long straight two-way country road running from the bottom to the top of the picture, one lane in each direction, medium grey asphalt, a white broken centre line, a solid white edge line along both sides, plain green verges with a few round trees. No junctions, no signs.
ROAD USERS (colour code used strictly):
- a RED car (ours) in the lower part of the picture, in the RIGHT-hand lane, driving up, kept well to the right: close to the right edge line but fully inside it; a short DASHED ORANGE arrow ahead of its nose;
- a BLUE car in the upper part, in the left-hand lane, driving down towards the bottom (oncoming), a short SOLID GREEN arrow ahead of it;
- between them, in the middle of the road right on the centre line, a faint semi-transparent ghost of the red car showing the WRONG position, crossed out by a red X in a white circle.
MUST NOT APPEAR: signs, other vehicles, people, text, letters, numbers, left-hand traffic.
""")

above('pos-three', """
THE SCENE: a long straight country road running from the bottom to the top of the picture with THREE lanes of equal width and traffic in both directions, separated by two white broken lane lines; a solid white edge line along both sides; plain green verges with a few trees.
ROAD USERS (colour code used strictly):
- a RED car (ours) in the RIGHT lane in the lower part, driving up, a short DASHED ORANGE arrow ahead of it;
- a BLUE car in the MIDDLE lane, a little further up, driving up while overtaking, a SOLID GREEN arrow ahead of it;
- a GREY car in the LEFT lane in the upper part, driving down towards the bottom (oncoming);
- in the LEFT lane in the lower part, level with our red car, a faint semi-transparent ghost of the red car crossed out by a red X in a white circle (we must never drive in the left lane).
MUST NOT APPEAR: signs, people, other vehicles, text, letters, numbers, left-hand traffic.
""")

above('pos-turn', """
THE SCENE: a four-way crossroads in town, two straight two-way streets with one lane in each direction, white broken centre lines that stop at the edge of the junction, light grey pavements with kerbs, small green lawns at the four corners. No signs, no traffic lights, no stop lines.
ROAD USERS (colour code used strictly):
- a RED car (ours) on the bottom street, driving up towards the junction, in the right-hand lane but placed right next to the centre line, its LEFT indicator flashing orange; a thin yellow dashed circle around it draws attention to this position;
- a DASHED ORANGE arrow from its nose goes up into the junction and turns left, ending in the RIGHT-hand lane of the street going off to the left (the upper half of that street), close to the kerb side;
- no other road users.
MUST NOT APPEAR: other vehicles, people, signs, traffic lights, text, letters, numbers, left-hand traffic.
""")

above('pos-obstacle', """
THE SCENE: a straight two-way town street running from the bottom to the top of the picture, one lane in each direction, a white broken centre line, light grey pavements with kerbs on both sides.
ROAD USERS AND OBJECTS (colour code used strictly):
- a large WHITE delivery lorry parked in the right-hand lane in the middle of the picture, close to the right kerb, its orange hazard lights flashing at all four corners;
- a RED car (ours) in the right-hand lane behind the lorry (lower in the picture), stopped and waiting with its brake lights on;
- a BLUE car in the left-hand lane, coming down towards the bottom, already beside the lorry; a SOLID GREEN arrow ahead of it shows that it passes first;
- a DASHED ORANGE arrow from the red car's nose curving out around the lorry and back into the right-hand lane: our way, after the blue car has passed.
MUST NOT APPEAR: other vehicles, people, signs, text, letters, numbers, left-hand traffic.
""")

view('exam-pos-rural', """
THE SCENE: a two-way Danish country road, one lane in each direction, a white broken centre line, solid white edge lines, gently bending to the right about 150 m ahead; white roadside posts with a black band along both verges; open fields and a few trees. We drive in the right-hand lane.
ROAD USERS: none; the road is empty as far as we can see.
MUST NOT APPEAR: other road users, signs, junctions, text.
""")

view('exam-pos-obstacle', """
THE SCENE: a straight two-way town street, one lane in each direction, a white broken centre line, pavements and simple house fronts on both sides. We drive in the right-hand lane.
ROAD USERS: about 10 m ahead of us a plain white van without any writing stands parked in OUR lane at the right kerb, seen from behind, its orange hazard lights flashing; about 25 m ahead an oncoming dark blue car drives in the other lane towards us, about to pass the van. No other road users.
MUST BE CLEARLY VISIBLE: the van blocking our lane, the oncoming car, the centre line between them.
MUST NOT APPEAR: signs, traffic lights, other vehicles, people, text.
""", scenery=TOWN)

above('exam-pos-lanes', """
THE SCENE: our street comes up from the bottom of the picture to a four-way crossroads in town in the upper part. Near the bottom our side has TWO lanes going up (towards the junction), separated by a white broken lane line that becomes a SOLID white line for the last 30 m before the junction; the oncoming side on the left has one lane coming down, separated from ours by a solid centre line. In each of our two lanes a large white arrow is painted on the road before the junction: in the LEFT lane an arrow pointing straight ahead and to the left, in the RIGHT lane an arrow pointing straight ahead and to the right. Pavements with kerbs and small lawns at the corners. No signs, no traffic lights.
ROAD USERS (colour code used strictly):
- a RED car (ours) in the LEFT lane about 40 m before the junction, its RIGHT indicator flashing orange;
- a BLUE car in the RIGHT lane, further back, near the bottom edge.
MUST NOT APPEAR: arrows other than the painted ones, other vehicles, people, signs, text, letters, numbers, left-hand traffic.
""")

view('speed-limits', """
THE SCENE: we are leaving a small Danish town on a straight two-way road: the last houses are just behind us at the sides of the picture, and ahead the road runs out into open countryside with fields. On the right verge about 15 m ahead stands the Danish sign E 56 "end of built-up area" on a grey post, about 2 m high: an upright rectangular white sign with a thin black border showing a grey silhouette of town buildings (houses and a church tower) crossed by a broad red diagonal line from the lower left to the upper right.
ROAD USERS: none.
MUST BE CLEARLY VISIBLE: the E 56 sign, sharp and large enough to recognise; the open road beyond it.
MUST NOT APPEAR: other signs, other road users, text.
""", scenery='Scenery: a few simple flat house fronts at the very edges behind us, then plain flat green fields and a few simple trees.')

above('speed-trailer', """
THE SCENE: a straight Danish motorway running from the bottom to the top of the picture. Our carriageway (on the right) has TWO lanes going up, separated by a white broken lane line, then a hard shoulder on the far right behind a broad solid white edge line; on the left a central reservation with a crash barrier, and beyond it the other carriageway with two lanes going down (empty). Plain green verges with a few trees on the right.
ROAD USERS (colour code used strictly):
- a RED car (ours) in the RIGHT lane towing a small single-axle box trailer, both driving up;
- a BLUE car in the LEFT lane overtaking it, a little ahead of the red car, with a SOLID GREEN arrow ahead of it.
MUST NOT APPEAR: signs, other vehicles, people, text, letters, numbers, left-hand traffic.
""")

view('speed-adapt', """
THE SCENE: a two-way country road, one lane in each direction, a white broken centre line and solid edge lines, bending sharply to the RIGHT about 40 m ahead around a dense wood that stands right at the inside of the bend, so the road disappears behind the trees and we cannot see what is in the bend. On the right verge about 15 m ahead the Danish warning sign A 41.1 "bend to the right" on a grey post: an upright equilateral triangle, point up, with a broad red border and a white centre showing a black arrow that goes up and bends to the right. White roadside posts with black bands along the verges.
ROAD USERS: none visible.
MUST BE CLEARLY VISIBLE: the wood hiding the bend, the warning sign.
MUST NOT APPEAR: other signs, road users, text.
""")

view('exam-speed-town', """
THE SCENE: a straight two-way road entering a small Danish town; on the right verge about 15 m ahead stands the Danish sign E 55 "built-up area" on a grey post, about 2 m high: an upright rectangular white sign with a thin black border showing a black silhouette of town buildings (houses and a church tower). Beyond the sign, about 50 m ahead, the first houses begin on both sides and the road gets pavements.
ROAD USERS: none.
MUST BE CLEARLY VISIBLE: the E 55 sign, sharp and large enough to recognise.
MUST NOT APPEAR: other signs, speed-limit signs, other road users, text.
""", scenery='Scenery: plain flat green verges, then simple flat house fronts further ahead.')

view('exam-speed-fog', """
THE SCENE: a two-way country road, one lane in each direction, a white broken centre line and solid edge lines, in THICK FOG: everything fades into grey-white after about 50 m. The red rear lights of a car about 30 m ahead in our lane glow faintly through the fog; white roadside posts fade away into the fog.
ROAD USERS: only that car ahead, barely visible.
MUST NOT APPEAR: signs, other road users, text.
""", cond='thick grey fog, dull light, visibility about 50 m')

above('exam-speed-trailer', """
THE SCENE: a straight Danish motorway running from the bottom to the top of the picture. Our carriageway (on the right) has TWO lanes going up, separated by a white broken lane line, then a hard shoulder on the far right behind a broad solid white edge line; on the left a central reservation with a crash barrier and the other carriageway beyond it. On the green verge on the right stands the Danish motorway sign E 42 on a grey post: an upright square GREEN sign with a white border showing a white motorway symbol (two carriageways in perspective running under a bridge).
ROAD USERS (colour code used strictly):
- a RED car (ours) in the RIGHT lane towing a small single-axle box trailer;
- a YELLOW car in the LEFT lane behind it and a BLUE car in the LEFT lane ahead of it, all driving up.
MUST NOT APPEAR: arrows, speed signs, other vehicles, people, text, letters, numbers, left-hand traffic.
""")

above('dist-follow', """
THE SCENE: a long straight two-way country road running from the bottom to the top of the picture, a white broken centre line, solid edge lines, plain green verges with a few trees. On the right verge in the middle of the picture stands a single white roadside post as a fixed point.
ROAD USERS (colour code used strictly):
- a BLUE car in the right-hand lane in the upper part, driving up, its rear just passing the white post;
- a RED car (ours) in the same lane further down, following it at a safe distance of several car lengths;
- a DASHED ORANGE double-headed arrow on the right verge, alongside the road, from the blue car's rear to the red car's nose, showing the distance between them.
MUST NOT APPEAR: signs, other vehicles, people, text, letters, numbers, left-hand traffic.
""")

above('dist-stop', """
THE SCENE: a teaching diagram with TWO straight horizontal road lanes, one above the other with a narrow green strip between them, both running from the left to the right edge of the picture. At the left end of each lane, on the green beside it, a Danish speed-limit sign C 55 (a round white sign with a broad red ring and a black number): "50" beside the upper lane and "100" beside the lower lane.
ROAD USERS AND MARKS:
- in each lane a RED car (the same car) near the left end, driving to the right;
- in front of each car, along its lane, two flat bars one after the other: first an ORANGE bar (the distance driven before braking starts), then a RED bar (the braking distance), and a white dashed line across the lane where the red bar ends (where the car stops);
- upper lane: the orange bar and the red bar are both short and about equally long;
- lower lane: the orange bar is exactly TWICE as long as the upper orange bar, and the red bar about FOUR TIMES as long as the upper red bar, reaching almost to the right edge.
MUST NOT APPEAR: numbers other than the two signs' 50 and 100, text, letters, other vehicles, people.
""")

above('dist-gap', """
THE SCENE: a long straight two-way country road running from the bottom to the top of the picture, a white broken centre line, solid edge lines, plain green verges with a few trees.
ROAD USERS (colour code used strictly):
- a large WHITE lorry in the right-hand lane in the upper part, driving up;
- a RED car (ours) towing a small single-axle box trailer in the same lane in the lower part, keeping a clear gap of several car lengths behind the lorry;
- a BLUE car in the left-hand lane beside the red car, overtaking, with a SOLID GREEN arrow curving from its nose into the gap between the lorry and the red car;
- a DASHED ORANGE double-headed arrow on the right verge marking the gap between the lorry and the red car.
MUST NOT APPEAR: signs, other vehicles, people, text, letters, numbers, left-hand traffic.
""")

view('exam-dist-follow', """
THE SCENE: a straight two-way country road, one lane in each direction, a white broken centre line and solid edge lines; open fields, a few trees and white roadside posts. We drive in the right-hand lane.
ROAD USERS: a dark green family car drives in our lane about 12 m ahead of us, seen from behind; the oncoming lane is empty.
MUST NOT APPEAR: signs, other road users, text.
""")

picture('exam-dist-speedo', """
A theory-test illustration: a close-up of the round speedometer in a modern car's instrument panel, seen straight from the front, filling most of the picture on a dark background. A black dial with white tick marks and white numbers from 0 to 220 in steps of 20 around the edge, and a red needle pointing exactly at 100.
MUST NOT APPEAR: other gauges, warning lights, logos, brand names, other text.
Style: a clean, precise flat vector illustration for a Danish driving-theory app, NOT photorealistic: simple shapes, flat colours, crisp edges. No text except the dial's numbers.
""")

view('exam-dist-wet', """
THE SCENE: a two-way country road in heavy RAIN, one lane in each direction, a white broken centre line and solid edge lines; the road surface is wet and shiny with reflections; dull grey sky; a few raindrops on our windscreen. We drive in the right-hand lane.
ROAD USERS: a dark red car in our lane about 20 m ahead is braking: its brake lights glow bright red and reflect on the wet road. No other road users.
MUST NOT APPEAR: signs, other road users, text.
""", cond='heavy rain, wet shiny road, dull grey light')

view('exam-road-e43', """
THE SCENE: a straight Danish motor road (motortrafikvej): one lane in each direction, a white broken centre line, solid white edge lines, no junctions, no pavements, wide green verges. On the right verge about 15 m ahead stands the Danish sign E 43 "motor road" on a grey post, about 2 m high: an upright square GREEN sign with a white border showing a white car seen from the side.
ROAD USERS: a grey car far ahead in our lane.
MUST BE CLEARLY VISIBLE: the E 43 sign, sharp and large enough to recognise.
MUST NOT APPEAR: speed-limit signs, other signs, other road users, text.
""")


# ---------- the lessons ----------
LANE_POSITION = lesson('lane-position', 'LANE_POSITION', ('جایگاه در مسیر', 'Position on the road', 'Placering på vejen'), 8, [
    intro(('جایگاه در مسیر (placering på vejen)', 'Position on the road (placering på vejen)', 'Placering på vejen'),
          ('در آزمون تئوری از جای درست خودرو در جاده زیاد می‌پرسند: در جاده‌ی خلوت، در جاده‌ی سه‌خطه، پیش از گردش و وقتی مانعی سر راه است. این درس قاعده‌های اصلی را با هم مرور می‌کند.',
           'The theory test often asks where the car should be on the road: on an empty road, on a three-lane road, before a turn and when something blocks the way. This lesson goes through the main rules together.',
           'Teoriprøven spørger ofte, hvor bilen skal være på vejen: på en tom vej, på en vej med tre vognbaner, før et sving og når noget spærrer vejen. Denne lektion gennemgår de vigtigste regler.'),
          [('بدانید چرا و تا کجا باید سمت راست بمانید.', 'Know why, and how far, you must keep to the right.', 'Vide hvorfor, og hvor langt, du skal holde til højre.'),
           ('پیش از گردش، جای درست خودرو را انتخاب کنید.', 'Choose the right position before a turn.', 'Vælge den rigtige placering før et sving.'),
           ('بدانید وقتی مانعی در سمت شماست، چه کسی باید صبر کند.', 'Know who must wait when there is an obstacle on your side.', 'Vide hvem der skal vente, når der er en forhindring i din side.')],
          [('تصویری از جاده‌ی خلوت؛ گزینه‌ی «وسط جاده می‌رانم چون کسی نمی‌آید» غلط است.', 'A picture of an empty road; the statement «I drive in the middle because nobody is coming» is wrong.', 'Et billede af en tom vej; udsagnet «Jeg kører midt på vejen, fordi der ikke kommer nogen» er forkert.'),
           ('خودروی پارک‌شده یا کامیون در سمت شما و خودرویی از روبه‌رو.', 'A parked car or a lorry on your side and a car coming towards you.', 'En parkeret bil eller en lastbil i din side og en modkørende bil.'),
           ('جاده‌ی دوخطه پیش از تقاطع، وقتی می‌خواهید بپیچید.', 'A road with two lanes before a junction, when you want to turn.', 'En vej med to vognbaner før et kryds, når du vil svinge.')]),
    teach(('تا جای ممکن سمت راست', 'As far to the right as possible', 'Så langt til højre som muligt'),
          ('همیشه تا جایی که با توجه به ترافیک و شرایط ممکن است، سمت راست جاده بمانید؛ حتی وقتی جاده خلوت است. سمت راست یعنی داخل خط کناری، نه روی شانه‌ی خاکی یا مسیر دوچرخه. در تصویر، خودروی قرمز درست جای خود را دارد؛ رانندگی در وسط جاده برای خودروی روبه‌رو خطرناک است.',
           'Always keep as far to the right as traffic and conditions allow, even when the road is empty. Right means inside the edge line, not on the verge or the cycle path. In the picture, the red car is in the right place; driving in the middle is dangerous for the oncoming car.',
           'Hold altid så langt til højre, som færdslen og forholdene tillader, også når vejen er tom. Til højre betyder inden for kantlinjen, ikke på rabatten eller cykelstien. På billedet holder den røde bil det rigtige sted; at køre midt på vejen er farligt for den modkørende bil.'),
          art='pos-right',
          rule=('تا جای ممکن سمت راست بمانید، حتی در جاده‌ی خلوت.', 'Keep as far to the right as possible, even on an empty road.', 'Hold så langt til højre som muligt, også på en tom vej.'),
          law=law((15, 1)),
          trap=('گزینه‌ی «وقتی کسی از روبه‌رو نمی‌آید می‌توانم وسط جاده برانم» غلط است؛ ولی «روی شانه‌ی جاده می‌رانم» هم درست نیست.', 'The statement «When nobody is coming, I may drive in the middle of the road» is wrong; but «I drive on the verge» is not right either.', 'Udsagnet «Når der ikke kommer nogen, må jeg køre midt på vejen» er forkert; men «Jeg kører på rabatten» er heller ikke rigtigt.')),
    teach(('جاده‌ی سه‌خطه با ترافیک دوطرفه', 'A three-lane road with traffic both ways', 'Vej med tre vognbaner og trafik i begge retninger'),
          ('در جاده‌ای که سه خط دارد و از هر دو طرف ترافیک دارد، نباید از خط سمت چپ (خط ترافیک روبه‌رو) استفاده کنید. خط وسط برای سبقت هر دو جهت است؛ پس پیش از سبقت مطمئن شوید که خودرویی از روبه‌رو برای سبقت وارد آن نشده است.',
           'On a road with three lanes and traffic in both directions, you must not use the left lane (the lane of the oncoming traffic). The middle lane is for overtaking in both directions, so before overtaking make sure no oncoming car has moved into it to overtake.',
           'På en vej med tre vognbaner og trafik i begge retninger må du ikke bruge den venstre vognbane (de modkørendes vognbane). Midterbanen er til overhaling i begge retninger, så før du overhaler, skal du sikre dig, at ingen modkørende er kørt ud i den for at overhale.'),
          art='pos-three',
          rule=('در جاده‌ی سه‌خطه‌ی دوطرفه، خط سمت چپ ممنوع است؛ خط وسط فقط برای سبقت، با احتیاط.', 'On a two-way three-lane road the left lane is forbidden; the middle lane is only for overtaking, with care.', 'På en vej med tre vognbaner i begge retninger er den venstre vognbane forbudt; midterbanen er kun til overhaling, med forsigtighed.'),
          law=law((15, 2), (21, 3)),
          trap=('خط وسط مال شما به‌تنهایی نیست؛ ترافیک روبه‌رو هم می‌تواند برای سبقت واردش شود.', 'The middle lane is not yours alone; oncoming traffic may also move into it to overtake.', 'Midterbanen er ikke kun din; de modkørende må også bruge den til at overhale.')),
    teach(('جای خودرو پیش از گردش', 'Your position before a turn', 'Placering før et sving'),
          ('پیش از گردش به موقع جای خود را بگیرید. برای گردش به راست تا جای ممکن به لبه‌ی راست جاده نزدیک باشید و تنگ بپیچید. برای گردش به چپ به خط وسط نزدیک شوید (در خیابان یک‌طرفه به لبه‌ی چپ) و طوری بپیچید که در سمت راست جاده‌ی جدید قرار بگیرید. در جاده‌ی دوخطه برای راست، خط راست و برای چپ، خط چپ را بگیرید.',
           'Take your position in good time before a turn. To turn right, keep as close to the right edge as possible and turn tightly. To turn left, move close to the centre line (on a one-way street, to the left edge) and turn so that you end up on the right side of the new road. On a road with two lanes, take the right lane to turn right and the left lane to turn left.',
           'Placer dig i god tid før et sving. Skal du svinge til højre, holder du så langt ud mod højre kant som muligt og svinger kort. Skal du svinge til venstre, holder du tæt ved midterlinjen (på en ensrettet vej ved venstre kant) og svinger, så du kommer over i højre side af den nye vej. På en vej med to vognbaner bruger du den højre til højresving og den venstre til venstresving.'),
          art='pos-turn',
          rule=('برای راست: کنار لبه‌ی راست؛ برای چپ: کنار خط وسط؛ همیشه به موقع و با راهنما.', 'For a right turn: by the right edge; for a left turn: by the centre line; always in good time and with the indicator.', 'Til højresving: ved højre kant; til venstresving: ved midterlinjen; altid i god tid og med blinklys.'),
          law=law((16, 1), (16, 3), (32, 2)),
          points=[('پیش از جابه‌جایی بین خط‌ها: آینه، نگاه از روی شانه، راهنما.', 'Before changing lanes: mirror, a look over your shoulder, indicator.', 'Før du skifter vognbane: spejl, skulderkig, blinklys.'),
                  ('گردش به چپ را طوری انجام دهید که در سمت راست جاده‌ی جدید بمانید.', 'Make a left turn so that you stay on the right side of the new road.', 'Sving til venstre, så du kommer over i højre side af den nye vej.'),
                  ('اگر جاده‌ی جدید چند خط در جهت شما دارد، می‌توانید مناسب‌ترین خط را بگیرید.', 'If the new road has several lanes in your direction, you may take the most suitable one.', 'Har den nye vej flere vognbaner i din retning, må du vælge den mest hensigtsmæssige.')],
          trap=('گزینه‌ی «از خط چپ به راست می‌پیچم چون خط راست شلوغ است» غلط است؛ به موقع به خط درست بروید.', 'The statement «I turn right from the left lane because the right lane is busy» is wrong; move to the right lane in good time.', 'Udsagnet «Jeg svinger til højre fra den venstre vognbane, fordi den højre er fyldt» er forkert; skift i god tid til den rigtige vognbane.')),
    teach(('مانع در سمت شما: صبر کنید', 'An obstacle on your side: you wait', 'Forhindring i din side: du venter'),
          ('وقتی از روبه‌روی هم رد می‌شوید، هر دو سمت راست می‌مانید و فاصله‌ی کافی از پهلو نگه می‌دارید. اگر بخشی از جاده بسته است، مثلاً کامیونی در سمت شما ایستاده، شما باید در صورت لزوم بایستید و بگذارید خودروی روبه‌رو اول رد شود.',
           'When you meet oncoming traffic, you both keep to the right and leave enough room to the side. If part of the road is blocked, for example by a lorry standing on your side, you must stop if necessary and let the oncoming car pass first.',
           'Ved mødekørsel holder I begge til højre og holder tilstrækkelig afstand til siden. Er en del af vejen spærret, for eksempel af en lastbil, der holder i din side, skal du om nødvendigt standse og lade den modkørende bil passere først.'),
          art='pos-obstacle',
          rule=('مانع در سمت هر کس باشد، او صبر می‌کند و راه می‌دهد.', 'Whoever has the obstacle on their side waits and lets the other pass.', 'Den, der har forhindringen i sin side, venter og lader den anden passere.'),
          law=law((20, 1)),
          trap=('«اول من رسیدم، پس من اول می‌روم» غلط است؛ مهم این است که مانع در سمت چه کسی است.', '«I got there first, so I go first» is wrong; what matters is whose side the obstacle is on.', '«Jeg kom først, så jeg kører først» er forkert; det afgørende er, i hvis side forhindringen er.')),
    q('exam-pos-rural',
      'Du kører på en landevej, og der er ingen modkørende. Hvordan placerer du bilen?',
      'You are driving on a country road with no oncoming traffic. Where do you place the car?',
      'در جاده‌ای بیرون شهر می‌رانید و خودرویی از روبه‌رو نمی‌آید. خودرو را کجای جاده نگه می‌دارید؟',
      st(True, 'Så langt til højre, som det kan ske uden fare.', 'As far to the right as can be done safely.', 'تا جایی که بی‌خطر است، سمت راست.',
         ('قانون می‌گوید تا جای ممکن سمت راست، حتی در جاده‌ی خلوت.', 'The law says as far to the right as possible, even on an empty road.', 'Loven siger så langt til højre som muligt, også på en tom vej.')),
      st(False, 'Midt på vejen, fordi der ikke kommer nogen.', 'In the middle of the road because nobody is coming.', 'وسط جاده، چون کسی نمی‌آید.',
         ('خلوت بودن جاده قاعده را عوض نمی‌کند؛ خودرویی می‌تواند ناگهان پیدا شود.', 'An empty road does not change the rule; a car can appear suddenly.', 'En tom vej ændrer ikke reglen; en bil kan pludselig dukke op.')),
      st(False, 'Ude på rabatten, så der er god plads til andre.', 'Out on the verge so that there is plenty of room for others.', 'روی شانه‌ی جاده، تا برای دیگران جای زیادی بماند.',
         ('سمت راست یعنی داخل خط کناری روی جاده، نه روی شانه.', 'Right means inside the edge line on the road, not on the verge.', 'Til højre betyder inden for kantlinjen på kørebanen, ikke på rabatten.')),
      rule=0),
    q('exam-pos-obstacle',
      'Der holder en varevogn i din side af vejen. En bil kommer imod dig. Hvordan forholder du dig?',
      'A van is standing on your side of the road. A car is coming towards you. What do you do?',
      'ونی در سمت شما ایستاده است. خودرویی از روبه‌رو می‌آید. چه می‌کنید؟',
      st(True, 'Jeg standser om nødvendigt og lader den modkørende bil passere.', 'If necessary I stop and let the oncoming car pass.', 'در صورت لزوم می‌ایستم و می‌گذارم خودروی روبه‌رو رد شود.',
         ('مانع در سمت شماست، پس شما صبر می‌کنید.', 'The obstacle is on your side, so you wait.', 'Forhindringen er i din side, så det er dig, der venter.')),
      st(False, 'Den modkørende bil skal holde tilbage, fordi jeg kører ligeud.', 'The oncoming car must give way because I am going straight on.', 'خودروی روبه‌رو باید راه بدهد، چون من مستقیم می‌روم.',
         ('مستقیم رفتن به شما حق تقدم نمی‌دهد؛ مانع در سمت شماست.', 'Going straight on does not give you priority; the obstacle is on your side.', 'At køre ligeud giver dig ikke forkørselsret; forhindringen er i din side.')),
      st(True, 'Jeg holder god afstand til varevognen, når jeg kører forbi den.', 'I keep a good distance from the van when I drive past it.', 'وقتی از کنار ون رد می‌شوم، فاصله‌ی خوبی از آن نگه می‌دارم.',
         ('ممکن است کسی پشت ون یا از درِ آن بیرون بیاید.', 'Someone may come out behind the van or from its door.', 'Der kan komme nogen ud bag varevognen eller fra dens dør.')),
      rule=3),
    q('exam-pos-lanes',
      'Du vil svinge til højre i krydset. Hvordan forholder du dig?',
      'You want to turn right at the junction. What do you do?',
      'می‌خواهید در تقاطع به راست بپیچید. چه می‌کنید؟',
      st(True, 'Jeg skifter i god tid til den højre vognbane, når det kan ske uden fare.', 'I change to the right lane in good time when it can be done safely.', 'به موقع، وقتی بی‌خطر است، به خط راست می‌روم.',
         ('برای گردش به راست باید به موقع در خط راست باشید.', 'To turn right you must be in the right lane in good time.', 'Til et højresving skal du i god tid være i den højre vognbane.')),
      st(False, 'Jeg svinger til højre fra den vognbane, jeg holder i nu.', 'I turn right from the lane I am in now.', 'از همین خطی که در آن هستم به راست می‌پیچم.',
         ('خط چپ برای چپ و مستقیم است؛ از آن به راست پیچیدن خطرناک است.', 'The left lane is for left and straight on; turning right from it is dangerous.', 'Den venstre vognbane er til venstre og ligeud; at svinge til højre derfra er farligt.')),
      st(True, 'Jeg ser i spejlet og over skulderen, før jeg skifter vognbane.', 'I check the mirror and look over my shoulder before I change lanes.', 'پیش از عوض کردن خط، در آینه و از روی شانه نگاه می‌کنم.',
         ('پیش از جابه‌جایی باید مطمئن شوید که کسی کنار شما نیست.', 'Before moving across you must make sure that nobody is beside you.', 'Før du skifter, skal du sikre dig, at ingen er ved siden af dig.')),
      rule=2),
    result(1),
    summary([('تا جای ممکن سمت راست بمانید، حتی در جاده‌ی خلوت؛ ولی داخل خط کناری.', 'Keep as far to the right as possible, even on an empty road, but inside the edge line.', 'Hold så langt til højre som muligt, også på en tom vej, men inden for kantlinjen.'),
             ('در جاده‌ی سه‌خطه‌ی دوطرفه از خط چپ استفاده نکنید؛ خط وسط فقط برای سبقت است.', 'Do not use the left lane of a two-way three-lane road; the middle lane is only for overtaking.', 'Brug ikke den venstre vognbane på en vej med tre vognbaner og trafik i begge retninger; midterbanen er kun til overhaling.'),
             ('پیش از گردش به موقع جای خود را بگیرید: راست کنار لبه‌ی راست، چپ کنار خط وسط.', 'Take your position in good time before a turn: right by the right edge, left by the centre line.', 'Placer dig i god tid før et sving: højre ved højre kant, venstre ved midterlinjen.'),
             ('مانع در سمت هر کس باشد، او صبر می‌کند.', 'Whoever has the obstacle on their side waits.', 'Den, der har forhindringen i sin side, venter.')]),
])

SPEED = lesson('speed', 'SPEED', ('سرعت مجاز و تنظیم سرعت', 'Speed limits and adapting your speed', 'Hastighedsgrænser og tilpasning af hastigheden'), 8, [
    intro(('سرعت مجاز و تنظیم سرعت', 'Speed limits and adapting your speed', 'Hastighedsgrænser og tilpasning af hastigheden'),
          ('آزمون هم عدد سرعت‌ها را می‌پرسد و هم این را که کِی باید آهسته‌تر از حد مجاز برانید. حد سرعت، بیشترین سرعت است، نه سرعتی که باید داشته باشید.',
           'The test asks both the speed limits and when you must drive slower than the limit. A speed limit is the highest speed, not the speed you must keep.',
           'Prøven spørger både om hastighedsgrænserne og om, hvornår du skal køre langsommere end grænsen. En hastighedsgrænse er den højeste hastighed, ikke den hastighed, du skal holde.'),
          [('حد سرعت عمومی شهر، بیرون شهر، جاده‌ی موتوری و بزرگراه را بدانید.', 'Know the general limits in towns, outside towns, on motor roads and on motorways.', 'Kende de generelle grænser i byen, uden for byen, på motortrafikvej og på motorvej.'),
           ('حد سرعت خودرو با تریلر را بدانید.', 'Know the limit for a car with a trailer.', 'Kende grænsen for bil med trailer.'),
           ('بدانید کِی باید سرعت را از حد مجاز هم کمتر کنید.', 'Know when you must slow down below the limit.', 'Vide hvornår du skal sænke farten under grænsen.')],
          [('تابلوی شروع شهر (E 55) و حد ۵۰ کیلومتر.', 'The town sign (E 55) and the 50 km/h limit.', 'Byzonetavlen (E 55) og grænsen på 50 km/t.'),
           ('مه، باران یا پیچ با دید کم؛ گزینه‌ی «با حد مجاز می‌رانم» غلط است.', 'Fog, rain or a bend with poor view; the statement «I drive at the limit» is wrong.', 'Tåge, regn eller et uoverskueligt sving; udsagnet «Jeg kører med grænsen» er forkert.'),
           ('خودرو با تریلر در بزرگراه.', 'A car with a trailer on the motorway.', 'Bil med trailer på motorvejen.')]),
    teach(('حد سرعت‌های عمومی', 'The general speed limits', 'De generelle hastighedsgrænser'),
          ('وقتی تابلوی دیگری نیست، این حدها اعمال می‌شوند: در محدوده‌ی شهری (از تابلوی E 55 تا E 56) ۵۰ کیلومتر در ساعت، بیرون شهر ۸۰، در جاده‌ی موتوری (E 43) ۸۰ و در بزرگراه (E 42) ۱۳۰. با تابلو می‌توان حد را کم یا زیاد کرد؛ در جاده‌ی موتوری حداکثر تا ۱۰۰ و در بزرگراه تا ۱۳۰.',
           'When no other sign applies, these limits apply: in a built-up area (from the E 55 sign to E 56) 50 km/h, outside built-up areas 80, on a motor road (E 43) 80 and on a motorway (E 42) 130. Signs can lower or raise the limit; on a motor road up to 100 at most, and on a motorway up to 130.',
           'Når ingen anden tavle gælder, er grænserne: i tættere bebygget område (fra tavle E 55 til E 56) 50 km/t, uden for tættere bebygget område 80, på motortrafikvej (E 43) 80 og på motorvej (E 42) 130. Tavler kan sænke eller hæve grænsen; på motortrafikvej højst til 100 og på motorvej til 130.'),
          art='speed-limits',
          rule=('شهر ۵۰، بیرون شهر ۸۰، جاده‌ی موتوری ۸۰، بزرگراه ۱۳۰؛ مگر تابلو چیز دیگری بگوید.', 'Town 50, outside towns 80, motor road 80, motorway 130, unless a sign says otherwise.', 'By 50, uden for byen 80, motortrafikvej 80, motorvej 130, medmindre en tavle siger andet.'),
          law=law((42, 1), (42, 2), (42, 3), (42, 4), 'E 55 | E 56 | E 42 | E 43'),
          trap=('حد ۵۰ از خود تابلوی E 55 شروع می‌شود، نه از اولین خانه‌ها؛ و تا تابلوی E 56 ادامه دارد.', 'The 50 limit starts at the E 55 sign itself, not at the first houses, and lasts until the E 56 sign.', 'Grænsen på 50 begynder ved selve E 55-tavlen, ikke ved de første huse, og gælder til E 56-tavlen.')),
    teach(('تریلر و خودروهای سنگین', 'Trailers and heavy vehicles', 'Trailere og tunge køretøjer'),
          ('خودروی سواری با تریلر یا کاروان، هر جا که باشد، حداکثر ۸۰ کیلومتر در ساعت می‌رود. در بزرگراه اگر خودرو و تریلر شرایط لازم را داشته باشند (تأیید برای ۱۰۰)، تا ۱۰۰. کامیون و اتوبوس بالای ۳۵۰۰ کیلوگرم هم حداکثر ۸۰ می‌روند؛ فقط اتوبوسی که شرایط لازم را دارد، در بزرگراه تا ۱۰۰.',
           'A car with a trailer or caravan may drive at most 80 km/h wherever it is. On the motorway, up to 100 if the car and the trailer meet the conditions (approved for 100). Lorries and buses over 3,500 kg also drive at most 80; only a bus that meets the conditions may do up to 100 on the motorway.',
           'En bil med trailer eller campingvogn må højst køre 80 km/t, uanset hvor den kører. På motorvej op til 100, hvis bil og trailer opfylder betingelserne (godkendt til 100). Lastbiler og busser over 3.500 kg må også højst køre 80; kun en bus, der opfylder betingelserne, må køre op til 100 på motorvej.'),
          art='speed-trailer',
          rule=('با تریلر: حداکثر ۸۰؛ در بزرگراه با تأیید ۱۰۰، تا ۱۰۰.', 'With a trailer: at most 80; on the motorway, with the 100 approval, up to 100.', 'Med trailer: højst 80; på motorvej op til 100 med 100 km/t-godkendelse.'),
          law=law((43, 1), (43, 2), (43, 3), (43, 4)),
          trap=('تابلوی ۱۳۰ بزرگراه برای خودروی با تریلر نیست؛ حد ویژه‌ی تریلر همیشه اعمال می‌شود.', 'The motorway\'s 130 does not apply to a car with a trailer; the trailer\'s own limit always applies.', 'Motorvejens 130 gælder ikke for bil med trailer; trailerens egen grænse gælder altid.')),
    teach(('سرعت را با شرایط تنظیم کنید', 'Adapt your speed to the conditions', 'Tilpas hastigheden til forholdene'),
          ('سرعت باید همیشه با جاده، هوا، دید، بار خودرو و ترافیک جور باشد. باید بتوانید در فاصله‌ای که جاده را می‌بینید، و جلوی هر مانعی که می‌شود انتظارش را داشت، بایستید. در تصویر، پیچ پشت پرچین دیده نمی‌شود؛ پس با اینکه ۸۰ مجاز است، باید پیش از پیچ آهسته کنید.',
           'Your speed must always suit the road, the weather, the view, the load and the traffic. You must be able to stop within the distance you can see, and before any obstacle you can expect. In the picture you cannot see past the hedge into the bend, so although 80 is allowed, you must slow down before the bend.',
           'Hastigheden skal altid passe til vejen, vejret, udsynet, læsset og færdslen. Du skal kunne standse på den del af vejen, du kan overskue, og foran enhver forhindring, der kan forudses. På billedet kan du ikke se ind i svinget bag hækken, så selv om 80 er tilladt, skal du sænke farten før svinget.'),
          art='speed-adapt',
          rule=('باید بتوانید در همان فاصله‌ای که می‌بینید، بایستید.', 'You must be able to stop within the distance you can see.', 'Du skal kunne standse på den strækning, du kan overskue.'),
          law=law((41, 1), (41, 2)),
          points=[('در شهر، تقاطع‌ها، پیچ‌ها و پیش از گذرگاه عابر', 'In towns, at junctions, in bends and before pedestrian crossings', 'I byen, i kryds, i sving og før fodgængerfelter'),
                  ('پیش از سربالایی و جایی که دید کم است', 'Before hilltops and where the view is poor', 'Før bakketoppe og hvor oversigten er dårlig'),
                  ('در مه، باران، تاریکی و خطر خیره‌شدن چشم', 'In fog, rain, darkness and when there is a risk of being dazzled', 'I tåge, regn, mørke og ved risiko for blænding'),
                  ('روی جاده‌ی خیس یا لغزنده', 'On a wet or slippery road', 'På våd eller glat vej'),
                  ('کنار اتوبوسی که مسافر سوار می‌کند، کودکان، حیوانات، کار جاده‌ای و محل تصادف', 'By a bus taking on passengers, children, animals, roadworks and accident sites', 'Ved bus der tager passagerer op, børn, dyr, vejarbejde og uheldssteder')],
          trap=('«حد سرعت ۸۰ است، پس با ۸۰ می‌رانم» در مه، باران یا پیچ با دید کم غلط است.', '«The limit is 80, so I drive at 80» is wrong in fog, rain or a bend with a poor view.', '«Grænsen er 80, så jeg kører 80» er forkert i tåge, regn eller i et uoverskueligt sving.')),
    teach(('بی‌دلیل آهسته نرانید', 'Do not drive slowly without reason', 'Kør ikke langsomt uden grund'),
          ('آهسته راندن همیشه بی‌خطر نیست. اگر بی‌دلیل خیلی آهسته برانید یا ناگهان ترمز کنید، ترافیک را مختل می‌کنید و دیگران را به سبقت‌های خطرناک وامی‌دارید. در بزرگراه فقط خودرویی اجازه‌ی رفتن دارد که بتواند و اجازه داشته باشد دست‌کم ۵۰ کیلومتر در ساعت برود.',
           'Driving slowly is not always safe. If you drive very slowly or brake suddenly without reason, you hold up traffic and push others into dangerous overtaking. Only a vehicle that can and may drive at least 50 km/h may use the motorway.',
           'Langsom kørsel er ikke altid sikker. Kører du meget langsomt eller bremser brat uden grund, hindrer du færdslen og får andre til at overhale farligt. Kun køretøjer, der kan og må køre mindst 50 km/t, må køre på motorvej.'),
          rule=('بی‌دلیل خیلی آهسته نرانید و بی‌دلیل ناگهان ترمز نکنید.', 'Do not drive very slowly or brake suddenly without reason.', 'Kør ikke meget langsomt, og brems ikke brat uden grund.'),
          law=law((41, 3), (44, 1)),
          trap=('«هرچه آهسته‌تر، بی‌خطرتر» همیشه درست نیست؛ سرعت باید با شرایط جور باشد.', '«The slower, the safer» is not always true; your speed must suit the conditions.', '«Jo langsommere, jo sikrere» passer ikke altid; hastigheden skal passe til forholdene.')),
    q('exam-speed-town',
      'Du passerer tavlen. Hvad er den højst tilladte hastighed herefter, når der ikke er andre tavler?',
      'You pass the sign. What is the highest permitted speed after it when there are no other signs?',
      'از کنار تابلو رد می‌شوید. وقتی تابلوی دیگری نیست، بیشترین سرعت مجاز بعد از آن چقدر است؟',
      st(True, '50 km/t.', '50 km/h.', '۵۰ کیلومتر در ساعت.', ('تابلوی E 55 شروع محدوده‌ی شهری است: ۵۰.', 'The E 55 sign starts the built-up area: 50.', 'Tavle E 55 markerer starten på tættere bebygget område: 50.')),
      st(False, '60 km/t.', '60 km/h.', '۶۰ کیلومتر در ساعت.', ('حد عمومی شهر ۵۰ است، نه ۶۰.', 'The general limit in a town is 50, not 60.', 'Den generelle grænse i byen er 50, ikke 60.')),
      st(False, '80 km/t, indtil jeg når de første huse.', '80 km/h until I reach the first houses.', '۸۰ کیلومتر در ساعت، تا به اولین خانه‌ها برسم.', ('حد ۵۰ از خود تابلو شروع می‌شود.', 'The 50 limit starts at the sign itself.', 'Grænsen på 50 begynder ved selve tavlen.')),
      rule=0),
    q('exam-speed-fog',
      'Du kører på en landevej i tæt tåge. Hvordan forholder du dig?',
      'You are driving on a country road in thick fog. What do you do?',
      'در مه غلیظ در جاده‌ای بیرون شهر می‌رانید. چه می‌کنید؟',
      st(True, 'Jeg kører så langsomt, at jeg kan standse på den del af vejen, jeg kan overskue.', 'I drive so slowly that I can stop within the part of the road I can see.', 'آن‌قدر آهسته می‌رانم که در همان بخشی از جاده که می‌بینم، بتوانم بایستم.',
         ('باید در فاصله‌ای که می‌بینید بتوانید بایستید.', 'You must be able to stop within the distance you can see.', 'Du skal kunne standse på den strækning, du kan overskue.')),
      st(False, 'Jeg må køre 80 km/t, fordi det er hastighedsgrænsen.', 'I may drive at 80 km/h because that is the speed limit.', 'می‌توانم ۸۰ برانم، چون حد سرعت همین است.',
         ('حد سرعت بیشترین سرعت است؛ در مه باید آهسته‌تر برانید.', 'The limit is the highest speed; in fog you must drive slower.', 'Grænsen er den højeste hastighed; i tåge skal du køre langsommere.')),
      st(True, 'Jeg må bruge tågelygter.', 'I may use fog lights.', 'می‌توانم از چراغ مه‌شکن استفاده کنم.',
         ('چراغ مه‌شکن فقط در مه و بارش شدید مجاز است؛ این‌جا مه است.', 'Fog lights are only allowed in fog and heavy rain or snow; here it is foggy.', 'Tågelygter må kun bruges i tåge og kraftig nedbør; her er der tåge.')),
      rule=2),
    q('exam-speed-trailer',
      'Du kører med en almindelig trailer på motorvejen. Hvor hurtigt må du højst køre?',
      'You are driving with an ordinary trailer on the motorway. What is the highest speed you may drive at?',
      'با یک تریلر معمولی در بزرگراه می‌رانید. حداکثر با چه سرعتی می‌توانید برانید؟',
      st(True, '80 km/t, hvis bil og trailer ikke opfylder betingelserne for 100 km/t.', '80 km/h if the car and trailer do not meet the conditions for 100 km/h.', '۸۰، اگر خودرو و تریلر شرایط ۱۰۰ را نداشته باشند.',
         ('حد عمومی خودرو با تریلر ۸۰ است.', 'The general limit for a car with a trailer is 80.', 'Den generelle grænse for bil med trailer er 80.')),
      st(True, '100 km/t, hvis bil og trailer opfylder betingelserne for 100 km/t.', '100 km/h if the car and trailer meet the conditions for 100 km/h.', '۱۰۰، اگر خودرو و تریلر شرایط ۱۰۰ را داشته باشند.',
         ('در بزرگراه با تأیید ۱۰۰ تا ۱۰۰ مجاز است.', 'On the motorway, up to 100 is allowed with the 100 approval.', 'På motorvej må du med 100 km/t-godkendelse køre op til 100.')),
      st(False, '130 km/t, ligesom de andre biler.', '130 km/h, like the other cars.', '۱۳۰، مثل بقیه‌ی خودروها.', ('حد ۱۳۰ بزرگراه برای خودروی با تریلر نیست.', 'The motorway\'s 130 does not apply to a car with a trailer.', 'Motorvejens 130 gælder ikke for bil med trailer.')),
      rule=1),
    result(1),
    summary([('شهر ۵۰ (از E 55 تا E 56)، بیرون شهر ۸۰، جاده‌ی موتوری ۸۰، بزرگراه ۱۳۰.', 'Town 50 (from E 55 to E 56), outside towns 80, motor road 80, motorway 130.', 'By 50 (fra E 55 til E 56), uden for byen 80, motortrafikvej 80, motorvej 130.'),
             ('خودرو با تریلر: حداکثر ۸۰؛ در بزرگراه با تأیید ۱۰۰ تا ۱۰۰.', 'Car with a trailer: at most 80; on the motorway up to 100 with the 100 approval.', 'Bil med trailer: højst 80; på motorvej op til 100 med 100 km/t-godkendelse.'),
             ('حد سرعت بیشترین سرعت است؛ باید بتوانید در فاصله‌ای که می‌بینید بایستید.', 'The limit is the highest speed; you must be able to stop within the distance you can see.', 'Grænsen er den højeste hastighed; du skal kunne standse på den strækning, du kan overskue.'),
             ('در مه، باران، تاریکی، پیچ و نزدیک کودکان آهسته‌تر برانید.', 'Drive slower in fog, rain, darkness, bends and near children.', 'Kør langsommere i tåge, regn, mørke, sving og nær børn.'),
             ('بی‌دلیل خیلی آهسته نرانید و بی‌دلیل ناگهان ترمز نکنید.', 'Do not drive very slowly or brake suddenly without reason.', 'Kør ikke meget langsomt, og brems ikke brat uden grund.')],
            ('law', 'signs', 'plan')),
])

DISTANCE = lesson('distance', 'DISTANCE', ('فاصله و مسافت توقف', 'Distance and stopping distance', 'Afstand og standselængde'), 8, [
    intro(('فاصله و مسافت توقف', 'Distance and stopping distance', 'Afstand og standselængde'),
          ('بیشتر تصادف‌ها از پشت به این دلیل است که فاصله کم بوده. آزمون می‌پرسد چه فاصله‌ای کافی است، مسافت توقف از چه ساخته می‌شود و سرعت و جاده‌ی خیس چه اثری روی آن دارند.',
           'Most rear-end collisions happen because the distance was too short. The test asks what distance is enough, what makes up the stopping distance, and how speed and a wet road change it.',
           'De fleste påkørsler bagfra sker, fordi afstanden var for kort. Prøven spørger, hvilken afstand der er nok, hvad standselængden består af, og hvordan hastighed og våd vej ændrer den.'),
          [('فاصله‌ی کافی با خودروی جلو را بشناسید (قاعده‌ی دو ثانیه).', 'Know a safe distance to the car in front (the two-second rule).', 'Kende en sikker afstand til forankørende (tosekundersreglen).'),
           ('مسافت واکنش و مسافت ترمز را از هم جدا کنید.', 'Tell the reaction distance from the braking distance.', 'Skelne mellem reaktionslængde og bremselængde.'),
           ('بدانید با دو برابر شدن سرعت، مسافت ترمز چند برابر می‌شود.', 'Know how much longer the braking distance gets when the speed doubles.', 'Vide hvor meget længere bremselængden bliver, når hastigheden fordobles.')],
          [('تصویری از خودرویی که جلوی شماست و پرسش درباره‌ی فاصله.', 'A picture of a car in front of you and a question about the distance.', 'Et billede af en bil foran dig og et spørgsmål om afstanden.'),
           ('دو برابر شدن سرعت و مسافت ترمز؛ گزینه‌ی «دو برابر می‌شود» غلط است.', 'Doubling the speed and the braking distance; the statement «it doubles» is wrong.', 'Fordobling af hastigheden og bremselængden; udsagnet «den fordobles» er forkert.'),
           ('جاده‌ی خیس، خستگی و تلفن همراه.', 'A wet road, tiredness and the mobile phone.', 'Våd vej, træthed og mobiltelefon.')]),
    teach(('فاصله با خودروی جلو', 'Distance to the car in front', 'Afstand til forankørende'),
          ('فاصله با خودروی جلو باید آن‌قدر باشد که اگر ناگهان ترمز کرد یا ایستاد، به آن نخورید. یک راه ساده: وقتی خودروی جلو از کنار نقطه‌ای مثل تیر چراغ رد می‌شود، بشمارید «هزار و یک، هزار و دو». اگر پیش از تمام شدن به همان نقطه رسیدید، خیلی نزدیکید. در باران، تاریکی یا جاده‌ی لغزنده فاصله را بیشتر کنید.',
           'The distance to the car in front must be so large that you do not hit it if it brakes hard or stops. A simple way: when the car in front passes a point such as a lamp post, count «one thousand and one, one thousand and two». If you reach the point before you finish, you are too close. In rain, in the dark or on a slippery road, increase the distance.',
           'Afstanden til forankørende skal være så stor, at du ikke kører ind i den, hvis den bremser hårdt eller standser. En enkel metode: Når bilen foran passerer et fast punkt, f.eks. en lygtepæl, tæller du «tusind og en, tusind og to». Når du punktet, før du er færdig, er du for tæt på. I regn, mørke eller glat føre skal afstanden være større.'),
          art='dist-follow',
          rule=('دست‌کم دو ثانیه فاصله در جاده‌ی خشک؛ در شرایط بد بیشتر.', 'At least two seconds on a dry road; more in bad conditions.', 'Mindst to sekunder på tør vej; mere i dårligt føre.'),
          law=law((15, 3)),
          trap=('فاصله را با «یک طول خودرو» نسنجید؛ فاصله‌ی لازم با سرعت بیشتر می‌شود.', 'Do not measure the distance as «one car length»; the distance needed grows with speed.', 'Mål ikke afstanden i «én billængde»; den nødvendige afstand vokser med hastigheden.')),
    teach(('مسافت توقف = واکنش + ترمز', 'Stopping distance = reaction + braking', 'Standselængde = reaktionslængde + bremselængde'),
          ('از لحظه‌ای که خطر را می‌بینید تا لحظه‌ای که پایتان روی ترمز است، حدود یک ثانیه می‌گذرد و خودرو با همان سرعت جلو می‌رود: این مسافت واکنش است. بعد مسافت ترمز می‌آید. مسافت ترمز با مجذور سرعت بیشتر می‌شود: سرعت دو برابر، مسافت ترمز حدود چهار برابر. در تصویر، کل مسافت توقف (واکنش + ترمز): با ۵۰ حدود ۲۷ متر و با ۱۰۰ حدود ۷۹ متر.',
           'From the moment you see a danger until your foot is on the brake, about one second passes and the car keeps going at the same speed: that is the reaction distance. Then comes the braking distance. The braking distance grows with the square of the speed: twice the speed, about four times the braking distance. In the picture, the whole stopping distance (reaction + braking): about 27 m at 50 and about 79 m at 100.',
           'Fra du ser en fare, til din fod er på bremsen, går der omkring et sekund, hvor bilen kører videre med samme fart: det er reaktionslængden. Derefter kommer bremselængden. Bremselængden vokser med kvadratet på hastigheden: dobbelt fart giver cirka fire gange så lang bremselængde. På billedet den samlede standselængde (reaktion + bremsning): cirka 27 m ved 50 og cirka 79 m ved 100.'),
          art='dist-stop',
          rule=('سرعت دو برابر: مسافت واکنش دو برابر، مسافت ترمز حدود چهار برابر.', 'Twice the speed: twice the reaction distance, about four times the braking distance.', 'Dobbelt hastighed: dobbelt reaktionslængde og cirka fire gange så lang bremselængde.'),
          law='Undervisningsplan for kategori B',
          points=[('خستگی، الکل، دارو و تلفن همراه، زمان واکنش را طولانی می‌کنند.', 'Tiredness, alcohol, medicine and the mobile phone make the reaction time longer.', 'Træthed, alkohol, medicin og mobiltelefon gør reaktionstiden længere.'),
                  ('جاده‌ی خیس، یخ، لاستیک فرسوده، سرازیری و بار سنگین، مسافت ترمز را طولانی می‌کنند.', 'A wet road, ice, worn tyres, a downhill slope and a heavy load make the braking distance longer.', 'Våd vej, is, slidte dæk, nedkørsel og tungt læs gør bremselængden længere.')],
          trap=('گزینه‌ی «با دو برابر شدن سرعت، مسافت ترمز دو برابر می‌شود» غلط است؛ حدود چهار برابر می‌شود.', 'The statement «When the speed doubles, the braking distance doubles» is wrong; it becomes about four times as long.', 'Udsagnet «Når hastigheden fordobles, fordobles bremselængden» er forkert; den bliver cirka fire gange så lang.')),
    teach(('جای کافی برای سبقت‌گیرنده', 'Room for those overtaking', 'Plads til de overhalende'),
          ('بیرون شهر، خودروهایی که حد سرعت ویژه دارند، مثل کامیون، اتوبوس و خودرو با تریلر، باید پشت سر هم چنان فاصله‌ای بگذارند که خودرویی که سبقت می‌گیرد بتواند بی‌خطر جلوی آن‌ها برگردد. در تصویر، خودروی قرمز با تریلر جا گذاشته است تا خودروی آبی بتواند برگردد.',
           'Outside built-up areas, vehicles with their own lower speed limit, such as lorries, buses and cars with trailers, must keep such a distance behind each other that a car overtaking can safely pull in in front of them. In the picture, the red car with a trailer leaves room so that the blue car can pull in.',
           'Uden for tættere bebygget område skal køretøjer med særlig hastighedsgrænse, f.eks. lastbiler, busser og biler med trailer, holde så stor afstand til hinanden, at en overhalende bil uden fare kan køre ind foran dem. På billedet holder den røde bil med trailer plads, så den blå bil kan komme ind.'),
          art='dist-gap',
          rule=('خودروی آهسته‌رو بیرون شهر برای سبقت‌گیرنده جا می‌گذارد.', 'Outside towns, a slow vehicle leaves room for those overtaking.', 'Uden for byen holder langsomme køretøjer plads til de overhalende.'),
          law=law((15, 3), (43, 3)),
          trap=('«پشت کامیون می‌چسبم تا از جریان عقب نمانم» غلط است؛ باید جا بگذارید.', '«I stay close behind the lorry so as not to fall behind» is wrong; you must leave room.', '«Jeg holder tæt bag lastbilen for ikke at sakke bagud» er forkert; du skal holde plads.')),
    q('exam-dist-follow',
      'Hvor stor afstand skal du holde til bilen foran dig?',
      'How large a distance must you keep to the car in front of you?',
      'چقدر باید از خودروی جلویی فاصله داشته باشید؟',
      st(True, 'Så stor, at jeg kan nå at standse, hvis den bremser pludseligt.', 'So large that I can stop in time if it brakes suddenly.', 'آن‌قدر که اگر ناگهان ترمز کرد، بتوانم به موقع بایستم.',
         ('قانون همین را می‌خواهد: نباید خطر برخورد باشد.', 'This is what the law requires: there must be no risk of hitting it.', 'Det er det, loven kræver: der må ikke være fare for påkørsel.')),
      st(True, 'Mindst 2 sekunder, når vejen er tør.', 'At least 2 seconds when the road is dry.', 'دست‌کم ۲ ثانیه، وقتی جاده خشک است.',
         ('قاعده‌ی دو ثانیه راه ساده‌ی سنجیدن فاصله‌ی کافی است.', 'The two-second rule is a simple way to judge a safe distance.', 'Tosekundersreglen er en enkel måde at vurdere en sikker afstand på.')),
      st(False, 'Én billængde er nok, uanset hastigheden.', 'One car length is enough whatever the speed.', 'یک طول خودرو کافی است، با هر سرعتی.',
         ('با سرعت بیشتر، فاصله‌ی بیشتری لازم است.', 'At a higher speed you need a larger distance.', 'Ved højere hastighed skal afstanden være større.')),
      rule=0),
    q('exam-dist-speedo',
      'Du øger hastigheden fra 50 km/t til 100 km/t. Hvad sker der med bremselængden?',
      'You increase your speed from 50 km/h to 100 km/h. What happens to the braking distance?',
      'سرعت را از ۵۰ به ۱۰۰ کیلومتر در ساعت می‌رسانید. مسافت ترمز چه می‌شود؟',
      st(True, 'Den bliver cirka 4 gange så lang.', 'It becomes about 4 times as long.', 'حدود ۴ برابر می‌شود.', ('مسافت ترمز با مجذور سرعت بیشتر می‌شود.', 'The braking distance grows with the square of the speed.', 'Bremselængden vokser med kvadratet på hastigheden.')),
      st(False, 'Den bliver cirka dobbelt så lang.', 'It becomes about twice as long.', 'حدود دو برابر می‌شود.', ('دو برابر برای مسافت واکنش درست است، نه برای مسافت ترمز.', 'Twice is right for the reaction distance, not for the braking distance.', 'Dobbelt passer på reaktionslængden, ikke på bremselængden.')),
      rule=1),
    q('exam-dist-wet',
      'Det regner, og vejen er våd. Hvordan forholder du dig?',
      'It is raining and the road is wet. What do you do?',
      'باران می‌بارد و جاده خیس است. چه می‌کنید؟',
      st(True, 'Jeg øger afstanden til bilen foran.', 'I increase the distance to the car in front.', 'فاصله‌ام را با خودروی جلو بیشتر می‌کنم.', ('روی جاده‌ی خیس مسافت ترمز طولانی‌تر است.', 'On a wet road the braking distance is longer.', 'På våd vej er bremselængden længere.')),
      st(True, 'Jeg sænker farten.', 'I reduce my speed.', 'سرعتم را کم می‌کنم.', ('سرعت باید با جاده‌ی خیس جور باشد.', 'Your speed must suit the wet road.', 'Hastigheden skal passe til den våde vej.')),
      st(False, 'Afstanden kan være den samme som på tør vej, fordi bilen har ABS-bremser.', 'The distance can be the same as on a dry road because the car has ABS brakes.', 'فاصله می‌تواند مثل جاده‌ی خشک باشد، چون خودرو ترمز ABS دارد.',
         ('ABS کمک می‌کند هنگام ترمز فرمان را در دست داشته باشید، ولی روی جاده‌ی خیس مسافت ترمز باز هم طولانی‌تر از جاده‌ی خشک است.', 'ABS helps you keep steering while braking, but on a wet road the braking distance is still longer than on a dry road.', 'ABS hjælper dig med at kunne styre under opbremsningen, men på våd vej er bremselængden stadig længere end på tør vej.')),
      rule=1),
    result(1),
    summary([('فاصله باید آن‌قدر باشد که اگر خودروی جلو ناگهان ترمز کرد، به آن نخورید؛ دست‌کم دو ثانیه.', 'The distance must be so large that you do not hit the car in front if it brakes suddenly: at least two seconds.', 'Afstanden skal være så stor, at du ikke rammer bilen foran, hvis den bremser pludseligt: mindst to sekunder.'),
             ('مسافت توقف = مسافت واکنش (حدود ۱ ثانیه) + مسافت ترمز.', 'Stopping distance = reaction distance (about 1 second) + braking distance.', 'Standselængde = reaktionslængde (cirka 1 sekund) + bremselængde.'),
             ('سرعت دو برابر: مسافت ترمز حدود چهار برابر.', 'Twice the speed: about four times the braking distance.', 'Dobbelt hastighed: cirka fire gange så lang bremselængde.'),
             ('جاده‌ی خیس و یخ مسافت ترمز را و خستگی و تلفن زمان واکنش را طولانی می‌کنند.', 'A wet or icy road makes the braking distance longer; tiredness and the phone make the reaction time longer.', 'Våd vej og is gør bremselængden længere; træthed og telefon gør reaktionstiden længere.'),
             ('خودروهای آهسته‌رو بیرون شهر برای سبقت‌گیرنده جا می‌گذارند.', 'Slow vehicles outside towns leave room for those overtaking.', 'Langsomme køretøjer uden for byen holder plads til de overhalende.')]),
])

ROAD_TEST = lesson('road-test', 'ROAD_TEST', ('آزمون فصل', 'Chapter test', 'Kapiteltest'), 6, [
    intro(('آزمون فصل ۲', 'Chapter 2 test', 'Kapiteltest 2'),
          ('حالا جایگاه در جاده، سرعت و فاصله را با هم مرور می‌کنیم. سؤال‌ها مثل آزمون واقعی‌اند و درس‌ها در هم آمده‌اند؛ هر علامت اشتباه یا جاافتاده یک اشتباه است.',
           'Now we go over position on the road, speed and distance together. The questions are like the real test and the lessons are mixed; every wrong or missing tick is one mistake.',
           'Nu gennemgår vi placering, hastighed og afstand samlet. Spørgsmålene er som ved den rigtige prøve, og lektionerne er blandet; hvert forkert eller manglende kryds er én fejl.'),
          [('نشان دهید قاعده‌های جایگاه، سرعت و فاصله را از هم تشخیص می‌دهید.', 'Show that you can tell the rules of position, speed and distance apart.', 'Vise at du kan skelne reglerne om placering, hastighed og afstand.'),
           ('نقطه‌های ضعفتان را پیش از فصل بعد پیدا کنید.', 'Find your weak points before the next chapter.', 'Finde dine svage punkter før næste kapitel.')],
          [('جاده‌ی موتوری، جاده‌ی سه‌خطه و مانع در سمت شما.', 'A motor road, a three-lane road and an obstacle on your side.', 'Motortrafikvej, vej med tre vognbaner og en forhindring i din side.'),
           ('زمان واکنش، پیچ با دید کم و فاصله پشت کامیون.', 'Reaction time, a bend with a poor view and the distance behind a lorry.', 'Reaktionstid, uoverskueligt sving og afstand bag en lastbil.')]),
    q('exam-road-e43',
      'Hvad er den højst tilladte hastighed på vejen efter tavlen, når der ikke er andre tavler?',
      'What is the highest permitted speed on the road after the sign when there are no other signs?',
      'وقتی تابلوی دیگری نیست، بیشترین سرعت مجاز در جاده‌ی بعد از این تابلو چقدر است؟',
      st(True, '80 km/t.', '80 km/h.', '۸۰ کیلومتر در ساعت.', ('تابلوی E 43 جاده‌ی موتوری است و حد عمومی آن ۸۰ است.', 'Sign E 43 is a motor road, and its general limit is 80.', 'Tavle E 43 er motortrafikvej, og den generelle grænse er 80.')),
      st(False, '130 km/t.', '130 km/h.', '۱۳۰ کیلومتر در ساعت.', ('۱۳۰ حد بزرگراه (E 42) است، نه جاده‌ی موتوری.', '130 is the motorway limit (E 42), not the motor road\'s.', '130 er motorvejens grænse (E 42), ikke motortrafikvejens.')),
      st(False, '90 km/t.', '90 km/h.', '۹۰ کیلومتر در ساعت.', ('بدون تابلوی دیگر، حد جاده‌ی موتوری ۸۰ است.', 'Without another sign, the motor road limit is 80.', 'Uden anden tavle er grænsen på motortrafikvej 80.'))),
    q('pos-three',
      'Vejen har tre vognbaner og trafik i begge retninger. Hvad gælder?',
      'The road has three lanes and traffic in both directions. What applies?',
      'جاده سه خط دارد و از هر دو طرف ترافیک هست. کدام درست است؟',
      st(True, 'Jeg må ikke bruge den venstre vognbane.', 'I must not use the left lane.', 'نباید از خط سمت چپ استفاده کنم.', ('خط چپ برای ترافیک روبه‌روست.', 'The left lane is for the oncoming traffic.', 'Den venstre vognbane er til de modkørende.')),
      st(True, 'Midterbanen kan også bruges af de modkørende til overhaling.', 'The oncoming traffic may also use the middle lane for overtaking.', 'ترافیک روبه‌رو هم می‌تواند از خط وسط برای سبقت استفاده کند.', ('خط وسط برای سبقت هر دو جهت است.', 'The middle lane is for overtaking in both directions.', 'Midterbanen er til overhaling i begge retninger.')),
      st(False, 'Jeg må køre i midterbanen hele tiden, når den er fri.', 'I may drive in the middle lane all the time when it is free.', 'وقتی خط وسط خالی است، می‌توانم همیشه در آن برانم.', ('باید تا جای ممکن سمت راست بمانید؛ خط وسط فقط برای سبقت است.', 'You must keep as far right as possible; the middle lane is only for overtaking.', 'Du skal holde så langt til højre som muligt; midterbanen er kun til overhaling.'))),
    q('exam-dist-wet',
      'Hvad gør din reaktionstid længere?',
      'What makes your reaction time longer?',
      'چه چیزی زمان واکنش شما را طولانی‌تر می‌کند؟',
      st(True, 'Træthed.', 'Tiredness.', 'خستگی.', ('آدم خسته دیرتر خطر را می‌بیند و دیرتر واکنش نشان می‌دهد.', 'A tired person sees the danger and reacts later.', 'En træt fører ser faren og reagerer senere.')),
      st(True, 'At jeg taler i en håndholdt mobiltelefon.', 'Talking on a hand-held mobile phone.', 'صحبت با تلفن همراهی که در دست دارم.', ('حواس‌پرتی واکنش را کند می‌کند؛ تلفن در دست هنگام رانندگی ممنوع هم هست.', 'Distraction slows your reaction; holding a phone while driving is also forbidden.', 'Distraktion gør reaktionen langsommere; håndholdt mobil under kørsel er også forbudt.')),
      st(False, 'En våd vej.', 'A wet road.', 'جاده‌ی خیس.', ('جاده‌ی خیس مسافت ترمز را طولانی می‌کند، نه زمان واکنش را.', 'A wet road makes the braking distance longer, not the reaction time.', 'En våd vej gør bremselængden længere, ikke reaktionstiden.'))),
    q('dist-gap',
      'Du kører med trailer uden for byen bag en lastbil. Hvordan forholder du dig?',
      'You are driving with a trailer outside town behind a lorry. What do you do?',
      'بیرون شهر با تریلر پشت یک کامیون می‌رانید. چه می‌کنید؟',
      st(True, 'Jeg holder så stor afstand, at en overhalende bil kan komme ind foran mig.', 'I keep such a distance that a car overtaking can pull in in front of me.', 'آن‌قدر فاصله نگه می‌دارم که خودرویی که سبقت می‌گیرد بتواند جلوی من برگردد.',
         ('خودروهای با حد سرعت ویژه بیرون شهر باید برای سبقت‌گیرنده جا بگذارند.', 'Vehicles with their own speed limit must leave room for those overtaking outside towns.', 'Køretøjer med særlig hastighedsgrænse skal holde plads til overhalende uden for byen.')),
      st(False, 'Jeg holder tæt bag lastbilen, så ingen kan komme ind imellem.', 'I keep close behind the lorry so that nobody can get in between.', 'نزدیک پشت کامیون می‌مانم تا کسی نتواند بین ما بیاید.',
         ('این کار سبقت را برای دیگران خطرناک می‌کند و فاصله‌ی ترمز شما را هم از بین می‌برد.', 'That makes overtaking dangerous for others and takes away your own braking distance.', 'Det gør overhaling farlig for andre og fjerner også din egen bremseafstand.'))),
    q('speed-adapt',
      'Du nærmer dig et sving, hvor du ikke kan se, hvad der er bag hækken. Hvordan forholder du dig?',
      'You are approaching a bend where you cannot see what is behind the hedge. What do you do?',
      'به پیچی نزدیک می‌شوید که نمی‌بینید پشت پرچین چه هست. چه می‌کنید؟',
      st(True, 'Jeg sænker farten, før jeg kører ind i svinget.', 'I slow down before I drive into the bend.', 'پیش از رسیدن به پیچ سرعتم را کم می‌کنم.', ('باید بتوانید در فاصله‌ای که می‌بینید بایستید.', 'You must be able to stop within the distance you can see.', 'Du skal kunne standse på den strækning, du kan overskue.')),
      st(False, 'Jeg holder 80 km/t, fordi det er tilladt uden for byen.', 'I keep 80 km/h because it is allowed outside town.', 'با ۸۰ ادامه می‌دهم، چون بیرون شهر مجاز است.', ('۸۰ بیشترین سرعت است؛ در پیچ با دید کم باید آهسته‌تر برانید.', '80 is the highest speed; in a bend with a poor view you must go slower.', '80 er den højeste hastighed; i et uoverskueligt sving skal du køre langsommere.'))),
    q('exam-pos-obstacle',
      'Den modkørende bil blinker med lyset. Hvad gælder i denne situation?',
      'The oncoming car flashes its lights. What applies in this situation?',
      'خودروی روبه‌رو چراغ می‌زند. در این موقعیت کدام درست است؟',
      st(True, 'Det er mig, der skal vente, fordi varevognen holder i min side.', 'I am the one who must wait because the van is standing on my side.', 'من باید صبر کنم، چون ون در سمت من ایستاده است.', ('مانع در سمت شماست؛ چراغ زدن دیگری قاعده را عوض نمی‌کند.', 'The obstacle is on your side; another driver flashing does not change the rule.', 'Forhindringen er i din side; at en anden blinker med lyset, ændrer ikke reglen.')),
      st(False, 'Lysblinket betyder, at jeg altid må køre først.', 'The flash of light means that I may always go first.', 'چراغ زدن یعنی من همیشه می‌توانم اول بروم.', ('چراغ زدن هشدار است، نه اجازه؛ خودتان مطمئن شوید که راه باز است.', 'Flashing is a warning, not permission; make sure yourself that the way is clear.', 'Lysblink er en advarsel, ikke en tilladelse; du skal selv sikre dig, at vejen er fri.'))),
    result(2),
    summary([('جاده‌ی موتوری (E 43): ۸۰؛ بزرگراه (E 42): ۱۳۰.', 'Motor road (E 43): 80; motorway (E 42): 130.', 'Motortrafikvej (E 43): 80; motorvej (E 42): 130.'),
             ('جاده‌ی سه‌خطه‌ی دوطرفه: خط چپ ممنوع؛ خط وسط برای سبقت هر دو جهت.', 'Two-way three-lane road: the left lane is forbidden; the middle lane is for overtaking both ways.', 'Vej med tre vognbaner i begge retninger: venstre vognbane forbudt; midterbanen til overhaling begge veje.'),
             ('خستگی و تلفن زمان واکنش را، جاده‌ی خیس مسافت ترمز را طولانی می‌کند.', 'Tiredness and the phone make the reaction time longer; a wet road makes the braking distance longer.', 'Træthed og telefon gør reaktionstiden længere; våd vej gør bremselængden længere.'),
             ('مانع در سمت شما: شما صبر می‌کنید؛ در پیچ با دید کم آهسته کنید.', 'An obstacle on your side: you wait; slow down in a bend with a poor view.', 'Forhindring i din side: du venter; sænk farten i et uoverskueligt sving.')],
            ('law', 'signs', 'plan')),
])

CHAPTER = 'road'
LESSONS = [LANE_POSITION, SPEED, DISTANCE, ROAD_TEST]
