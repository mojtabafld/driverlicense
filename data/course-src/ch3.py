# Chapter 3 «حق تقدم» (after course.ts's right rule and turns): junctions with traffic lights, roundabouts, and the
# chapter's test. Rules from Færdselsloven §§ 4, 26, 27, 32 and Bekendtgørelse om vejafmærkning §§ 65–66.
from course import SIGNS_BEK, TOWN, above, intro, law, lesson, q, result, st, summary, teach, view

LIGHTS = ("Traffic lights are drawn as small poles with a three-lamp signal head (red at the top, amber in the middle, green at "
          "the bottom), each clearly showing which lamp is lit.")

# ---------- pictures (prompts for the image model) ----------
above('sig-green-turn', f"""
THE SCENE: a four-way crossroads in town controlled by traffic lights, two straight two-way streets with one lane in each direction, light grey pavements, a zebra crossing (broad white stripes) across the street going off to the LEFT, just beyond the junction. {LIGHTS} The lights for our street and for the street coming towards us show GREEN; the lights for the crossing street show RED.
ROAD USERS (colour code used strictly):
- a RED car (ours) that came up from the bottom street and now waits in the middle of the junction, its LEFT indicator flashing orange, about to turn left; a DASHED ORANGE arrow from its nose curves to the left into the left street (its way, after the others);
- coming down from the top street towards us: a BLUE car driving straight on and a cyclist riding straight on, each with a SOLID GREEN arrow straight down through the junction;
- two pedestrians walking across the zebra crossing on the left street, with a SOLID GREEN arrow.
MUST NOT APPEAR: other vehicles, signs, text, letters, numbers, left-hand traffic.
""")

view('sig-arrow', """
THE SCENE: a straight town street approaching a junction controlled by traffic lights about 25 m ahead. Our road has two lanes in our direction: we are in the LEFT lane, which is a left-turn lane with a large white left-pointing arrow painted on it; the right lane is for straight on. At the stop line, on a pole on the left, our lane's own arrow signal: a three-lamp head whose lamps are arrows pointing LEFT, the RED left arrow lit. On a pole on the right, the main signal for the straight-on lane with its round GREEN lamp lit.
ROAD USERS: a car in the right lane ahead drives straight on through the junction. No other road users.
MUST BE CLEARLY VISIBLE: the lit red LEFT ARROW for our lane, the lit round green light for the straight-on lane, the painted left arrow in our lane.
MUST NOT APPEAR: other signals, signs, text.
""", scenery=TOWN)

above('sig-block', f"""
THE SCENE: a four-way crossroads in town controlled by traffic lights, two straight two-way streets with one lane in each direction, a white stop line across our lane just before the junction, light grey pavements. {LIGHTS} The lights for our street (coming up from the bottom) show GREEN; the lights for the crossing street show RED.
ROAD USERS (colour code used strictly):
- on the top street, beyond the junction, a queue of four GREY and BLUE cars standing nose to tail in the lane going up, the last one right at the edge of the junction, so there is no room for another car behind it;
- a RED car (ours) at the front at our stop line, waiting although the light is green; a short DASHED ORANGE arrow from its nose stops before the junction;
- on the crossing street, a BLUE car waiting at its red light on each side.
MUST NOT APPEAR: arrows other than the orange one, people, signs, text, letters, numbers, left-hand traffic.
""")

above('sig-off', """
THE SCENE: a four-way crossroads outside town where a main road runs from left to right and a smaller road crosses it from the bottom to the top. Traffic lights stand at the corners, drawn as small poles with a three-lamp signal head, ALL lamps dark (the lights are switched off). On the smaller road, at both sides of the junction, a row of white give-way triangles (shark teeth, Danish S 11) points towards the drivers coming in, and on the same pole as the dark traffic light stands the Danish give-way sign B 11: a white equilateral triangle pointing DOWN with a broad red border. Medium grey asphalt, broken centre lines, plain green verges.
ROAD USERS (colour code used strictly):
- a RED car (ours) on the bottom road, stopped at the shark teeth;
- on the main road: a BLUE car coming from the left and a BLUE car coming from the right, each with a SOLID GREEN arrow straight across in front of us.
MUST NOT APPEAR: lit lamps, other signs, people, text, letters, numbers, left-hand traffic.
""")

view('exam-sig-left', """
THE SCENE: we have driven into a junction in town controlled by traffic lights and wait in its middle to turn LEFT (our left indicator is on, shown by a small green arrow lamp on the dashboard strip). The traffic lights facing us across the junction show GREEN. Straight ahead, coming towards us through the junction: a cyclist riding straight on about 15 m away, and a car behind the cyclist. On the left, the street we want to turn into has a zebra crossing just after the junction, and two pedestrians are walking across it.
MUST BE CLEARLY VISIBLE: the green light, the oncoming cyclist and car, the pedestrians on the crossing on the left.
MUST NOT APPEAR: other road users, signs, text.
""", scenery=TOWN)

view('exam-sig-queue', """
THE SCENE: a straight town street, one lane in our direction, approaching a junction controlled by traffic lights; we are about 5 m before the stop line and our traffic light shows GREEN. Beyond the junction, in our lane on the other side, a queue of cars stands still with their brake lights on, the last car of the queue right at the far edge of the junction: there is no room for us after the junction.
MUST BE CLEARLY VISIBLE: the green light, the standing queue right after the junction, the empty junction between.
MUST NOT APPEAR: crossing traffic in the junction, signs, people, text.
""", scenery=TOWN)

view('exam-sig-flash', """
THE SCENE: a road outside town approaching a crossroads with a main road about 15 m ahead. At the right side, on one pole, a traffic light whose AMBER lamp flashes (lit, with small rays around it; the red and green lamps are dark), and under it on the same pole the Danish give-way sign B 11: a white equilateral triangle pointing DOWN with a broad red border. Across our lane at the junction's edge, a row of white give-way triangles (shark teeth) points towards us. On the main road a red car approaches from the LEFT and a white van from the RIGHT, both about 40 m from the junction.
MUST BE CLEARLY VISIBLE: the flashing amber light, the B 11 sign, the shark teeth, both vehicles on the main road.
MUST NOT APPEAR: other signs, people, text.
""")

above('round-enter', """
THE SCENE: a single-lane roundabout in the middle of the picture with four arms (up, down, left, right). A round green central island with a ring of grey cobbles around it, the circular one-lane carriageway around it, traffic going round ANTICLOCKWISE (right-hand traffic). Each arm has a teardrop-shaped green splitter island in its middle; at each entry a row of white give-way triangles (shark teeth, Danish S 11) across the entry lane points towards the drivers coming in, and on the right of each entry stands the Danish give-way sign B 11: a white triangle pointing DOWN with a broad red border.
ROAD USERS (colour code used strictly):
- a RED car (ours) in the entry lane of the bottom arm, stopped at the shark teeth;
- a BLUE car in the roundabout coming round from our LEFT, about to pass in front of our entry, with a SOLID GREEN arrow along the ring;
- a short DASHED ORANGE arrow from the red car's nose stops at the shark teeth.
MUST NOT APPEAR: other vehicles, people, other signs, text, letters, numbers, left-hand traffic.
""")

above('round-signal', """
THE SCENE: a single-lane roundabout in the middle of the picture with four arms (up, down, left, right), a round green central island with a cobbled ring, traffic going round ANTICLOCKWISE; splitter islands on each arm and shark teeth at each entry.
ROAD USERS (colour code used strictly):
- a RED car (ours) that came in from the bottom arm and is now in the roundabout beside the left arm's exit, driving round towards the top arm; its RIGHT indicator flashes orange because it will leave by the next exit, the top arm;
- a DASHED ORANGE arrow from the red car along the ring and out into the top arm;
- a BLUE car waiting at the shark teeth of the left arm.
MUST NOT APPEAR: other vehicles, people, signs, text, letters, numbers, left-hand traffic.
""")

above('round-exit', """
THE SCENE: a single-lane roundabout seen from above, with a blue-coloured cycle lane running round the outer edge of the circular carriageway, separated by a white line; traffic goes round ANTICLOCKWISE. Four arms with splitter islands; at the exit of the right arm the cycle lane crosses the exit, marked in blue.
ROAD USERS (colour code used strictly):
- a RED car (ours) in the roundabout just before the exit of the right arm, its RIGHT indicator flashing orange, waiting; a DASHED ORANGE arrow from it into the right arm;
- a cyclist on the cycle lane on the red car's right, riding on round the roundabout past the exit, with a SOLID GREEN arrow along the cycle lane across the exit.
MUST NOT APPEAR: other vehicles, people, signs, text, letters, numbers, left-hand traffic.
""")

view('exam-round-enter', """
THE SCENE: we are about to enter a single-lane roundabout outside town; we are about 5 m before its entry, which has a row of white give-way triangles (shark teeth) across our lane pointing towards us and, on the right, the Danish give-way sign B 11: a white equilateral triangle pointing DOWN with a broad red border. Ahead, the green central island of the roundabout; traffic in the roundabout goes round anticlockwise, from left to right in front of us. A grey car in the roundabout comes from our LEFT, about to pass in front of our entry.
MUST BE CLEARLY VISIBLE: the B 11 sign, the shark teeth, the car coming from the left in the roundabout.
MUST NOT APPEAR: other road users, other signs, text.
""")

above('exam-round-signal', """
THE SCENE: a single-lane roundabout in the middle of the picture with four arms (up, down, left, right), a round green central island with a cobbled ring, traffic going round ANTICLOCKWISE; splitter islands on each arm and shark teeth at each entry.
ROAD USERS (colour code used strictly):
- a RED car (ours) in the roundabout, having entered from the bottom arm, now just past the right arm's exit and driving round towards the top arm's exit, which it will take; NO indicator lit;
- a GREY car waiting at the shark teeth of the top arm.
MUST NOT APPEAR: arrows, other vehicles, people, signs, text, letters, numbers, left-hand traffic.
""")

view('exam-round-cyclist', """
THE SCENE: we are inside a single-lane roundabout in town, about to leave by the next exit on the right (our right indicator is on). A blue-coloured cycle lane runs round the outer edge of the roundabout on our right, crossing the exit ahead. On that cycle lane a cyclist is riding on round the roundabout, just to our right and slightly ahead of us, about to cross the exit we want to take.
MUST BE CLEARLY VISIBLE: the cyclist on our right on the blue cycle lane, the exit ahead to the right.
MUST NOT APPEAR: other road users, signs, text.
""", scenery=TOWN)

above('exam-pri-right', """
THE SCENE: a T-junction in a residential area: a wide two-way road runs from the bottom to the top of the picture, and a narrow side road joins it from the RIGHT. NO traffic signs, NO shark teeth, NO stop lines, NO traffic lights: an unmarked junction. Light grey pavements, small lawns and hedges.
ROAD USERS (colour code used strictly):
- a RED car (ours) on the wide road, driving up, about 20 m before the junction;
- a small BLUE car on the narrow side road, coming from our RIGHT towards the junction, about to drive out, with a SOLID GREEN arrow into the junction.
MUST NOT APPEAR: signs, markings at the junction, other vehicles, people, text, letters, numbers, left-hand traffic.
""")

view('exam-pri-police', """
THE SCENE: a junction in town controlled by traffic lights about 15 m ahead; our traffic light shows GREEN. In the middle of the junction stands a police officer in a dark uniform with a yellow high-visibility vest and a white cap, facing us, with one arm raised straight up (the sign to stop). No other road users in the junction.
MUST BE CLEARLY VISIBLE: the green light and the police officer's raised arm.
MUST NOT APPEAR: other road users, signs, text.
""", scenery=TOWN)


# ---------- the lessons ----------
SIGNAL_JUNCTIONS = lesson('signal-junctions', 'SIGNAL_JUNCTIONS', ('تقاطع‌های چراغ‌دار', 'Junctions with traffic lights', 'Lysregulerede kryds'), 8, [
    intro(('تقاطع‌های چراغ‌دار (lysregulerede kryds)', 'Junctions with traffic lights (lysregulerede kryds)', 'Lysregulerede kryds'),
          ('چراغ سبز یعنی «اجازه‌ی حرکت»، نه «حق تقدم». آزمون در تقاطع چراغ‌دار گردش با چراغ سبز، پیکان‌ها، صف بعد از تقاطع و چراغ خاموش را می‌پرسد.',
           'A green light means «you may go», not «you have priority». At junctions with traffic lights the test asks about turning on green, arrow signals, a queue after the junction and lights that are off.',
           'Grønt lys betyder «du må køre», ikke «du har forkørselsret». I lysregulerede kryds spørger prøven om sving for grønt, pilsignaler, kø efter krydset og slukkede signaler.'),
          [('بدانید با چراغ سبز هنگام گردش به چه کسانی باید راه بدهید.', 'Know whom you must give way to when you turn on green.', 'Vide hvem du skal holde tilbage for, når du svinger for grønt.'),
           ('بدانید کِی با چراغ سبز هم نباید وارد تقاطع شوید.', 'Know when you must not drive into the junction even on green.', 'Vide hvornår du ikke må køre ind i krydset, selv for grønt.'),
           ('بدانید وقتی چراغ خاموش است یا زرد چشمک می‌زند، چه قاعده‌ای اعمال می‌شود.', 'Know which rule applies when the lights are off or flash amber.', 'Vide hvilken regel der gælder, når signalet er slukket eller blinker gult.')],
          [('گردش به چپ با چراغ سبز و دوچرخه‌سوار یا عابری که از روبه‌رو یا عرض خیابان می‌آید.', 'Turning left on green with a cyclist or pedestrian coming towards you or crossing.', 'Venstresving for grønt med en modkørende cyklist eller fodgængere, der går over.'),
           ('صف خودروها بعد از تقاطع وقتی چراغ شما سبز است.', 'A queue after the junction while your light is green.', 'Kø efter krydset, mens du har grønt.'),
           ('چراغ زرد چشمک‌زن با تابلوی B 11 زیر آن.', 'A flashing amber light with a B 11 sign under it.', 'Gult blink med en B 11-tavle under.')]),
    teach(('سبز یعنی «اگر راه باز است برو»', 'Green means «go if the way is clear»', 'Grønt betyder «kør, hvis vejen er fri»'),
          ('با چراغ سبز اجازه دارید حرکت کنید، ولی وقتی می‌پیچید، باید راه بدهید: در گردش به چپ به خودروها و دوچرخه‌سوارانی که از روبه‌رو می‌آیند، در گردش به راست به دوچرخه و موپدی که کنار شما مستقیم می‌رود، و در هر دو به عابرانی که از عرض خیابانی که واردش می‌شوید رد می‌شوند. در تصویر، خودروی قرمز وسط تقاطع منتظر می‌ماند تا خودروی آبی، دوچرخه‌سوار و عابران رد شوند.',
           'A green light lets you go, but when you turn you must give way: turning left, to cars and cyclists coming towards you; turning right, to bicycles and mopeds going straight on beside you; and in both cases to pedestrians crossing the road you turn into. In the picture, the red car waits in the middle of the junction until the blue car, the cyclist and the pedestrians have passed.',
           'Grønt lys giver lov til at køre, men når du svinger, skal du holde tilbage: ved venstresving for modkørende biler og cyklister, ved højresving for cykler og knallerter, der kører ligeud ved siden af dig, og i begge tilfælde for fodgængere, der går over den vej, du svinger ind på. På billedet venter den røde bil midt i krydset, til den blå bil, cyklisten og fodgængerne er kørt og gået forbi.'),
          art='sig-green-turn',
          rule=('با چراغ سبز هم، هنگام گردش به روبه‌رو، دوچرخه‌سوار و عابر راه بدهید.', 'Even on green, give way to oncoming traffic, cyclists and pedestrians when you turn.', 'Selv for grønt skal du holde tilbage for modkørende, cyklister og fodgængere, når du svinger.'),
          law=law((26, 6), (27, 6)),
          trap=('«چراغ من سبز است، پس دیگران باید صبر کنند» غلط است؛ چراغ سبز حق تقدم نمی‌دهد.', '«My light is green, so the others must wait» is wrong; a green light gives no priority.', '«Jeg har grønt, så de andre skal vente» er forkert; grønt lys giver ikke forkørselsret.')),
    teach(('پیکان سبز و پیکان قرمز', 'Green and red arrows', 'Grøn og rød pil'),
          ('بعضی تقاطع‌ها برای هر جهت چراغ پیکان‌دار جداگانه دارند. پیکان سبز یعنی می‌توانید در جهت پیکان بروید؛ معمولاً در همان زمان ترافیک روبه‌رو چراغ قرمز دارد، ولی باز هم مراقب عابر و دوچرخه‌سوار باشید. پیکان قرمز یعنی در آن جهت نباید بروید، حتی اگر چراغ اصلیِ کنارش سبز باشد. در تصویر، پیکان چپ قرمز است: خودروهای خط مستقیم می‌روند، ولی شما در خط گردش به چپ می‌ایستید.',
           'Some junctions have separate arrow lights for each direction. A green arrow means you may go in the arrow\'s direction; usually the oncoming traffic has red at the same time, but still watch out for pedestrians and cyclists. A red arrow means you must not go in that direction, even if the main light beside it is green. In the picture the left arrow is red: the straight-on lane goes, but you wait in the left-turn lane.',
           'Nogle kryds har særskilte pilsignaler for hver retning. Grøn pil betyder, at du må køre i pilens retning; som regel har de modkørende samtidig rødt, men hold alligevel øje med fodgængere og cyklister. Rød pil betyder, at du ikke må køre i den retning, selv om hovedsignalet ved siden af er grønt. På billedet er venstrepilen rød: ligeudbanen kører, men du venter i venstresvingsbanen.'),
          art='sig-arrow',
          rule=('پیکان قرمز برای جهت شما یعنی بایستید، حتی اگر چراغ اصلی سبز باشد.', 'A red arrow for your direction means stop, even if the main light is green.', 'Rød pil for din retning betyder stop, selv om hovedsignalet er grønt.'),
          law=law([f'{SIGNS_BEK} § 65 و § 66', f'{SIGNS_BEK} § 65 and § 66', f'{SIGNS_BEK} § 65 og § 66'], 'X 11 | X 12'),
          trap=('«چراغ اصلی سبز است، پس می‌توانم به چپ بپیچم» وقتی پیکان چپ قرمز است، غلط است.', '«The main light is green, so I may turn left» is wrong when the left arrow is red.', '«Hovedsignalet er grønt, så jeg må svinge til venstre» er forkert, når venstrepilen er rød.')),
    teach(('تقاطع را بند نیاورید', 'Do not block the junction', 'Bloker ikke krydset'),
          ('وقتی آن طرف تقاطع صف است و می‌بینید که پیش از سبز شدن چراغ خیابان متقاطع نمی‌توانید از تقاطع بیرون بروید، با چراغ سبز هم نباید وارد تقاطع شوید. پشت خط ایست صبر کنید تا آن طرف جا باز شود. تا جای ممکن روی گذرگاه عابر هم نایستید.',
           'When there is a queue after the junction and you can see that you will not get out of the junction before the crossing street gets green, you must not drive into the junction, even on green. Wait behind the stop line until there is room on the other side. As far as possible, do not stop on a pedestrian crossing either.',
           'Når der er kø efter krydset, og du kan se, at du ikke kan komme ud af krydset, før den krydsende vej får grønt, må du ikke køre ind i krydset, selv for grønt. Vent bag stoplinjen, til der er plads på den anden side. Undgå så vidt muligt også at holde på et fodgængerfelt.'),
          art='sig-block',
          rule=('اگر آن طرف تقاطع جا نیست، با چراغ سبز هم وارد تقاطع نشوید.', 'If there is no room after the junction, do not drive into it, even on green.', 'Er der ikke plads efter krydset, må du ikke køre ind i det, selv for grønt.'),
          law=law((26, 7), (27, 8)),
          trap=('«چراغ سبز است، پس وارد می‌شوم حتی اگر وسط تقاطع بمانم» غلط است.', '«It is green, so I drive in even if I end up standing in the junction» is wrong.', '«Der er grønt, så jeg kører ind, selv om jeg bliver holdende i krydset» er forkert.')),
    teach(('چراغ خاموش یا زرد چشمک‌زن', 'Lights off or flashing amber', 'Slukket signal eller gult blink'),
          ('وقتی چراغ‌ها خاموش‌اند یا فقط زرد چشمک می‌زنند، دیگر تعیین نمی‌کنند چه کسی برود. آن وقت تابلوها حکم می‌کنند؛ اغلب تابلوی B 11 یا B 16 روی همان تیر چراغ نصب است. اگر تابلویی نبود، قاعده‌ی دست راست اعمال می‌شود. زرد چشمک‌زن یعنی با احتیاط بیشتر رد شوید. دستور پلیس بر همه‌ی چراغ‌ها و تابلوها مقدم است.',
           'When the lights are off or only flash amber, they no longer decide who goes. Then the signs decide; a B 11 or B 16 sign is often fixed to the same pole as the light. If there is no sign, the right rule applies. Flashing amber means pass with extra care. A police officer\'s signs come before all lights and signs.',
           'Når signalerne er slukket eller kun blinker gult, bestemmer de ikke længere, hvem der kører. Så er det tavlerne, der gælder; ofte sidder en B 11- eller B 16-tavle på samme stander som signalet. Er der ingen tavle, gælder højre vigepligt. Gult blink betyder, at du skal køre med særlig forsigtighed. Politiets tegn går forud for alle signaler og tavler.'),
          art='sig-off',
          rule=('چراغ خاموش یا زرد چشمک‌زن: تابلوها حکم می‌کنند؛ اگر تابلو نبود، قاعده‌ی دست راست.', 'Lights off or flashing amber: the signs decide; if there are none, the right rule.', 'Slukket signal eller gult blink: tavlerne gælder; er der ingen, gælder højre vigepligt.'),
          law=law((4, 2), (4, 4), (26, 4), 'B 11 | B 16'),
          trap=('«جاده‌ی من بزرگ‌تر است، پس وقتی چراغ خاموش است حق تقدم دارم» غلط است؛ تابلو یا قاعده‌ی دست راست را ببینید.', '«My road is bigger, so I have priority when the lights are off» is wrong; look for the signs or use the right rule.', '«Min vej er størst, så jeg har forkørselsret, når signalet er slukket» er forkert; se efter tavler eller brug højre vigepligt.')),
    q('exam-sig-left',
      'Du har grønt lys og vil svinge til venstre. En cyklist kommer imod dig, og fodgængere går over den vej, du skal ind på. Hvordan forholder du dig?',
      'You have a green light and want to turn left. A cyclist is coming towards you, and pedestrians are crossing the road you are turning into. What do you do?',
      'چراغ شما سبز است و می‌خواهید به چپ بپیچید. دوچرخه‌سواری از روبه‌رو می‌آید و عابرانی از عرض خیابانی که می‌خواهید واردش شوید رد می‌شوند. چه می‌کنید؟',
      st(True, 'Jeg holder tilbage for cyklisten.', 'I give way to the cyclist.', 'به دوچرخه‌سوار راه می‌دهم.',
         ('در گردش به چپ به ترافیک روبه‌رو، از جمله دوچرخه، راه می‌دهید.', 'Turning left, you give way to oncoming traffic, bicycles included.', 'Ved venstresving holder du tilbage for modkørende, også cyklister.')),
      st(True, 'Jeg holder tilbage for fodgængerne.', 'I give way to the pedestrians.', 'به عابران راه می‌دهم.',
         ('عابرانی که از عرض خیابانِ مقصد رد می‌شوند حق تقدم دارند.', 'Pedestrians crossing the road you turn into have priority.', 'Fodgængere, der går over den vej, du svinger ind på, skal du holde tilbage for.')),
      st(False, 'Jeg kører først, fordi jeg har grønt lys.', 'I go first because I have a green light.', 'اول می‌روم، چون چراغم سبز است.',
         ('چراغ سبز اجازه‌ی حرکت است، نه حق تقدم.', 'A green light is permission to go, not priority.', 'Grønt lys er lov til at køre, ikke forkørselsret.')),
      rule=0),
    q('exam-sig-queue',
      'Du har grønt lys, men der holder en kø lige efter krydset. Hvordan forholder du dig?',
      'You have a green light, but a queue is standing just after the junction. What do you do?',
      'چراغ شما سبز است، ولی درست بعد از تقاطع صف ایستاده است. چه می‌کنید؟',
      st(True, 'Jeg venter før stoplinjen, til der er plads efter krydset.', 'I wait before the stop line until there is room after the junction.', 'پشت خط ایست صبر می‌کنم تا بعد از تقاطع جا باز شود.',
         ('نباید وارد تقاطع شوید وقتی می‌دانید در آن می‌مانید.', 'You must not drive into the junction when you know you will be stuck in it.', 'Du må ikke køre ind i krydset, når du ved, at du bliver holdende i det.')),
      st(False, 'Jeg kører ind i krydset, fordi jeg har grønt lys.', 'I drive into the junction because I have a green light.', 'وارد تقاطع می‌شوم، چون چراغم سبز است.',
         ('اگر وسط تقاطع بمانید، راه ترافیک متقاطع را می‌بندید.', 'If you get stuck in the junction, you block the crossing traffic.', 'Bliver du holdende i krydset, spærrer du for den krydsende trafik.')),
      rule=2),
    q('exam-sig-flash',
      'Lyssignalet blinker gult. Hvordan forholder du dig?',
      'The traffic light is flashing amber. What do you do?',
      'چراغ راهنمایی زرد چشمک می‌زند. چه می‌کنید؟',
      st(True, 'Jeg holder tilbage for trafikken fra både højre og venstre, fordi der er hajtænder og en vigepligtstavle.', 'I give way to traffic from both the right and the left because there are shark teeth and a give-way sign.', 'به ترافیک هر دو طرف راه می‌دهم، چون دندان‌کوسه و تابلوی راه دادن هست.',
         ('وقتی چراغ زرد چشمک می‌زند، تابلو و خط‌کشی حکم می‌کنند.', 'When the light flashes amber, the signs and markings decide.', 'Når signalet blinker gult, er det tavler og afmærkning, der gælder.')),
      st(False, 'Jeg har forkørselsret, fordi signalet blinker gult.', 'I have priority because the light is flashing amber.', 'حق تقدم با من است، چون چراغ زرد چشمک می‌زند.',
         ('زرد چشمک‌زن به هیچ‌کس حق تقدم نمی‌دهد.', 'Flashing amber gives nobody priority.', 'Gult blink giver ingen forkørselsret.')),
      st(False, 'Jeg skal kun holde tilbage for trafikken fra højre.', 'I only have to give way to traffic from the right.', 'فقط باید به ترافیک سمت راست راه بدهم.',
         ('تابلوی B 11 یعنی به همه، از هر دو طرف، راه بدهید.', 'The B 11 sign means give way to everyone, from both sides.', 'Tavle B 11 betyder, at du skal holde tilbage for alle fra begge sider.')),
      rule=3),
    result(1),
    summary([('چراغ سبز اجازه‌ی حرکت است، نه حق تقدم؛ در گردش به روبه‌رو، دوچرخه‌سوار و عابر راه بدهید.', 'A green light is permission to go, not priority; when you turn, give way to oncoming traffic, cyclists and pedestrians.', 'Grønt lys er lov til at køre, ikke forkørselsret; når du svinger, holder du tilbage for modkørende, cyklister og fodgængere.'),
             ('پیکان قرمز برای جهت شما یعنی بایستید، حتی اگر چراغ اصلی سبز باشد.', 'A red arrow for your direction means stop, even if the main light is green.', 'Rød pil for din retning betyder stop, selv om hovedsignalet er grønt.'),
             ('اگر بعد از تقاطع جا نیست، با چراغ سبز هم وارد نشوید.', 'If there is no room after the junction, do not drive in, even on green.', 'Er der ikke plads efter krydset, må du ikke køre ind, selv for grønt.'),
             ('چراغ خاموش یا زرد چشمک‌زن: تابلوها، وگرنه قاعده‌ی دست راست؛ دستور پلیس بر همه مقدم است.', 'Lights off or flashing amber: the signs, otherwise the right rule; a police officer comes before everything.', 'Slukket signal eller gult blink: tavlerne, ellers højre vigepligt; politiet går forud for alt.')],
            ('law', 'signs', 'plan')),
])

ROUNDABOUT = lesson('roundabout', 'ROUNDABOUT', ('میدان', 'Roundabouts', 'Rundkørsel'), 8, [
    intro(('میدان (rundkørsel)', 'Roundabouts (rundkørsel)', 'Rundkørsel'),
          ('در دانمارک میدان‌ها زیادند و آزمون تقریباً همیشه یکی دارد: چه کسی موقع ورود صبر می‌کند، کجا راهنما می‌زنید و موقع خروج به چه کسانی راه می‌دهید.',
           'Denmark has many roundabouts and the test almost always has one: who waits when entering, where you signal, and whom you give way to when you leave.',
           'Der er mange rundkørsler i Danmark, og prøven har næsten altid en: hvem der venter ved indkørslen, hvornår du blinker, og hvem du holder tilbage for, når du kører ud.'),
          [('بدانید موقع ورود به میدان چه کسی راه می‌دهد.', 'Know who gives way when you enter a roundabout.', 'Vide hvem der holder tilbage, når du kører ind i en rundkørsel.'),
           ('در میدان درست راهنما بزنید.', 'Signal correctly in a roundabout.', 'Blinke rigtigt i en rundkørsel.'),
           ('موقع خروج به دوچرخه‌سوار و عابر راه بدهید.', 'Give way to cyclists and pedestrians when you leave.', 'Holde tilbage for cyklister og fodgængere, når du kører ud.')],
          [('ورود به میدان با تابلوی B 11 و خودرویی که در میدان از چپ می‌آید.', 'Entering with a B 11 sign and a car coming from the left in the roundabout.', 'Indkørsel med tavle B 11 og en bil fra venstre i rundkørslen.'),
           ('کجا راهنمای راست یا چپ بزنید.', 'Where to signal right or left.', 'Hvornår du blinker til højre eller venstre.'),
           ('خروج از میدان با دوچرخه‌سواری که در میدان می‌ماند.', 'Leaving with a cyclist who rides on round the roundabout.', 'Udkørsel med en cyklist, der kører videre rundt.')]),
    teach(('ورود: به ترافیک داخل میدان راه بدهید', 'Entering: give way to the traffic in the roundabout', 'Indkørsel: hold tilbage for trafikken i rundkørslen'),
          ('بیشتر میدان‌ها در هر ورودی تابلوی B 11 و دندان‌کوسه (S 11) دارند: باید به همه‌ی کسانی که در میدان‌اند و از چپ شما می‌آیند، راه بدهید. تابلوی هشدار A 16 پیش از میدان آن را خبر می‌دهد. در تصویر، خودروی قرمز کنار دندان‌کوسه منتظر است تا خودروی آبی داخل میدان رد شود.',
           'Most roundabouts have a B 11 sign and shark teeth (S 11) at every entry: you must give way to everyone already in the roundabout, who come from your left. The warning sign A 16 tells you of a roundabout ahead. In the picture, the red car waits at the shark teeth until the blue car in the roundabout has passed.',
           'De fleste rundkørsler har tavle B 11 og hajtænder (S 11) ved hver indkørsel: du skal holde tilbage for alle, der allerede er i rundkørslen og kommer fra venstre. Advarselstavlen A 16 varsler en rundkørsel forude. På billedet venter den røde bil ved hajtænderne, til den blå bil i rundkørslen er kørt forbi.'),
          art='round-enter',
          rule=('کنار B 11 و دندان‌کوسه‌ی ورودی، به همه‌ی خودروهای داخل میدان راه بدهید.', 'At the entry\'s B 11 and shark teeth, give way to every vehicle in the roundabout.', 'Ved indkørslens B 11 og hajtænder holder du tilbage for alle køretøjer i rundkørslen.'),
          law=law((26, 2), 'A 16 | B 11 | S 11'),
          trap=('«خودروی داخل میدان از چپ می‌آید، پس باید به من راه بدهد» غلط است؛ تابلو و دندان‌کوسه قاعده‌ی دست راست را کنار می‌گذارند.', '«The car in the roundabout comes from the left, so it must give way to me» is wrong; the sign and the shark teeth set the right rule aside.', '«Bilen i rundkørslen kommer fra venstre, så den skal holde tilbage for mig» er forkert; tavlen og hajtænderne sætter højre vigepligt ud af kraft.')),
    teach(('راهنما در میدان', 'Signalling in a roundabout', 'Blink i rundkørslen'),
          ('پیش از خروج از میدان، به موقع راهنمای راست بزنید؛ مثلاً وقتی از کنار خروجیِ پیش از خروجی خودتان می‌گذرید. اگر از اولین خروجی بیرون می‌روید، از همان نزدیک شدن به میدان راهنمای راست بزنید. موقع ورود یا دور زدن راهنمای چپ نزنید؛ دیگران فکر می‌کنند بیرون نمی‌روید و گیج می‌شوند. بعد از خروج راهنما را خاموش کنید.',
           'Signal right in good time before you leave the roundabout, for example as you pass the exit before yours. If you take the first exit, signal right as you approach the roundabout. Do not signal left when entering or going round: others think you are not leaving and get confused. Turn the indicator off after leaving.',
           'Blink til højre i god tid, før du kører ud af rundkørslen, for eksempel når du passerer udkørslen før din egen. Skal du ud ad første udkørsel, blinker du til højre allerede, når du nærmer dig rundkørslen. Blink ikke til venstre, når du kører ind eller rundt: det forvirrer de andre. Slå blinklyset fra, når du er kørt ud.'),
          art='round-signal',
          rule=('پیش از خروج راهنمای راست بزنید؛ موقع ورود و دور زدن راهنمای چپ نزنید.', 'Signal right before you leave; do not signal left when entering or going round.', 'Blink til højre, før du kører ud; blink ikke til venstre ved indkørsel og rundt.'),
          law=law((32, 2), (32, 5)),
          trap=('«در میدان راهنمای چپ می‌زنم تا نشان بدهم دور می‌زنم» در آزمون غلط است.', '«In the roundabout I signal left to show that I am going round» is wrong in the test.', '«I rundkørslen blinker jeg til venstre for at vise, at jeg kører rundt» er forkert i prøven.')),
    teach(('خروج: به دوچرخه‌سوار و عابر راه بدهید', 'Leaving: give way to cyclists and pedestrians', 'Udkørsel: hold tilbage for cyklister og fodgængere'),
          ('خروج از میدان یعنی گردش به راست. اگر میدان مسیر دوچرخه دارد، دوچرخه‌سوارانی که در میدان می‌مانند و از جلوی خروجی شما رد می‌شوند، حق تقدم دارند؛ عابرانی هم که در خروجی از عرض خیابان رد می‌شوند. پیش از خروج در آینه و از روی شانه سمت راست را ببینید. در تصویر، خودروی قرمز صبر می‌کند تا دوچرخه‌سوار رد شود.',
           'Leaving the roundabout is a right turn. If the roundabout has a cycle lane, cyclists riding on round it across your exit have priority, and so do pedestrians crossing at the exit. Before leaving, look in the mirror and over your right shoulder. In the picture the red car waits until the cyclist has passed.',
           'At køre ud af rundkørslen er et højresving. Har rundkørslen cykelbane, skal du holde tilbage for cyklister, der kører videre rundt forbi din udkørsel, og for fodgængere, der går over ved udkørslen. Se i spejlet og over højre skulder, før du kører ud. På billedet venter den røde bil, til cyklisten er kørt forbi.'),
          art='round-exit',
          rule=('موقع خروج از میدان به دوچرخه‌سوارانی که در میدان می‌مانند و به عابران راه بدهید.', 'When leaving, give way to cyclists riding on round and to pedestrians.', 'Når du kører ud, holder du tilbage for cyklister, der kører videre rundt, og for fodgængere.'),
          law=law((26, 6), (27, 5)),
          trap=('«دوچرخه‌سوار باید صبر کند چون من راهنما زده‌ام» غلط است؛ راهنما به شما حق تقدم نمی‌دهد.', '«The cyclist must wait because I signalled» is wrong; signalling gives you no priority.', '«Cyklisten skal vente, fordi jeg har blinket» er forkert; blinklyset giver dig ikke forkørselsret.')),
    teach(('کامیون و اتوبوس در میدان', 'Lorries and buses in a roundabout', 'Lastbiler og busser i rundkørslen'),
          ('کامیون و اتوبوس برای دور زدن جای زیادی می‌خواهند و گاهی از حلقه‌ی سنگ‌فرش دور جزیره هم استفاده می‌کنند. در میدان کنار خودروی بزرگ نرانید و پشت آن فاصله بگذارید. در میدان دوخطه، پیش از ورود خط را انتخاب کنید و در خط خود بمانید.',
           'Lorries and buses need a lot of room to get round and sometimes use the cobbled ring around the island too. Do not drive beside a large vehicle in a roundabout, and keep your distance behind it. In a two-lane roundabout, choose your lane before entering and stay in it.',
           'Lastbiler og busser skal bruge meget plads for at komme rundt og kører nogle gange også på brostensringen om midterøen. Kør ikke ved siden af et stort køretøj i rundkørslen, og hold afstand bag det. I en rundkørsel med to vognbaner vælger du vognbane før indkørslen og bliver i den.'),
          rule=('کنار کامیون یا اتوبوس در میدان نرانید.', 'Do not drive beside a lorry or bus in a roundabout.', 'Kør ikke ved siden af en lastbil eller bus i rundkørslen.'),
          law=law((3, 1), (16, 1)),
          trap=('«کنار کامیون می‌مانم تا زودتر بیرون بروم» خطرناک است؛ کامیون برای پیچیدن به تمام عرض نیاز دارد.', '«I stay beside the lorry to get out sooner» is dangerous; the lorry needs the whole width to turn.', '«Jeg bliver ved siden af lastbilen for at komme hurtigere ud» er farligt; lastbilen skal bruge hele bredden for at dreje.')),
    q('exam-round-enter',
      'Du skal ind i rundkørslen. En bil i rundkørslen kommer fra venstre. Hvordan forholder du dig?',
      'You are about to enter the roundabout. A car in the roundabout is coming from the left. What do you do?',
      'می‌خواهید وارد میدان شوید. خودرویی در میدان از چپ می‌آید. چه می‌کنید؟',
      st(True, 'Jeg holder tilbage for bilen i rundkørslen.', 'I give way to the car in the roundabout.', 'به خودروی داخل میدان راه می‌دهم.',
         ('تابلوی B 11 و دندان‌کوسه یعنی به همه‌ی داخل میدان راه بدهید.', 'The B 11 sign and the shark teeth mean give way to everyone in the roundabout.', 'B 11 og hajtænder betyder, at du holder tilbage for alle i rundkørslen.')),
      st(False, 'Bilen skal holde tilbage for mig, fordi jeg kommer fra højre.', 'The car must give way to me because I am coming from the right.', 'آن خودرو باید به من راه بدهد، چون من از راست می‌آیم.',
         ('قاعده‌ی دست راست این‌جا اعمال نمی‌شود؛ تابلو حکم می‌کند.', 'The right rule does not apply here; the sign decides.', 'Højre vigepligt gælder ikke her; tavlen bestemmer.')),
      rule=0),
    q('exam-round-signal',
      'Du vil køre ud ad den næste udkørsel. Hvordan bruger du blinklyset?',
      'You want to leave by the next exit. How do you use the indicator?',
      'می‌خواهید از خروجی بعدی بیرون بروید. راهنما را چطور می‌زنید؟',
      st(True, 'Jeg blinker til højre, før jeg kører ud.', 'I signal right before I leave.', 'پیش از خروج راهنمای راست می‌زنم.',
         ('خروج از میدان گردش به راست است و باید به موقع نشان داده شود.', 'Leaving the roundabout is a right turn and must be shown in good time.', 'At køre ud er et højresving og skal vises i god tid.')),
      st(False, 'Jeg blinker til venstre, mens jeg kører rundt.', 'I signal left while I drive round.', 'وقتی دور می‌زنم، راهنمای چپ می‌زنم.',
         ('راهنمای چپ در میدان دیگران را گیج می‌کند.', 'A left signal in the roundabout confuses others.', 'Blink til venstre i rundkørslen forvirrer de andre.')),
      st(False, 'Jeg behøver ikke at blinke i en rundkørsel.', 'I do not need to signal in a roundabout.', 'در میدان لازم نیست راهنما بزنم.',
         ('پیش از گردش، از جمله خروج از میدان، باید راهنما بزنید.', 'You must signal before turning, leaving a roundabout included.', 'Du skal blinke før et sving, også når du kører ud af en rundkørsel.')),
      rule=1),
    q('exam-round-cyclist',
      'Du vil køre ud af rundkørslen. En cyklist på cykelbanen til højre for dig kører videre rundt. Hvordan forholder du dig?',
      'You want to leave the roundabout. A cyclist on the cycle lane to your right is riding on round. What do you do?',
      'می‌خواهید از میدان بیرون بروید. دوچرخه‌سواری در مسیر دوچرخه‌ی سمت راست شما در میدان جلو می‌رود. چه می‌کنید؟',
      st(True, 'Jeg holder tilbage for cyklisten.', 'I give way to the cyclist.', 'به دوچرخه‌سوار راه می‌دهم.',
         ('موقع خروج به دوچرخه‌سواری که در میدان می‌ماند راه می‌دهید.', 'When leaving, you give way to a cyclist riding on round.', 'Når du kører ud, holder du tilbage for en cyklist, der kører videre rundt.')),
      st(True, 'Jeg ser over skulderen, før jeg kører ud.', 'I look over my shoulder before I leave.', 'پیش از خروج از روی شانه نگاه می‌کنم.',
         ('دوچرخه‌سوار ممکن است در نقطه‌ی کور شما باشد.', 'The cyclist may be in your blind spot.', 'Cyklisten kan være i din blinde vinkel.')),
      st(False, 'Cyklisten skal vente, fordi jeg har blinket.', 'The cyclist must wait because I have signalled.', 'دوچرخه‌سوار باید صبر کند، چون من راهنما زده‌ام.',
         ('راهنما فقط نشان می‌دهد چه می‌خواهید بکنید؛ حق تقدم نمی‌دهد.', 'The indicator only shows what you intend; it gives no priority.', 'Blinklyset viser kun, hvad du vil; det giver ikke forkørselsret.')),
      rule=2),
    result(1),
    summary([('ورود به میدان: کنار B 11 و دندان‌کوسه به همه‌ی داخل میدان راه بدهید.', 'Entering a roundabout: at B 11 and the shark teeth, give way to everyone in it.', 'Indkørsel: ved B 11 og hajtænder holder du tilbage for alle i rundkørslen.'),
             ('پیش از خروج راهنمای راست؛ موقع ورود و دور زدن راهنمای چپ نه.', 'Signal right before you leave; no left signal when entering or going round.', 'Blink til højre, før du kører ud; ikke til venstre ved indkørsel og rundt.'),
             ('موقع خروج به دوچرخه‌سوارانی که در میدان می‌مانند و به عابران راه بدهید.', 'When leaving, give way to cyclists riding on round and to pedestrians.', 'Ved udkørsel holder du tilbage for cyklister, der kører videre rundt, og for fodgængere.'),
             ('کنار کامیون و اتوبوس در میدان نرانید.', 'Do not drive beside lorries and buses in a roundabout.', 'Kør ikke ved siden af lastbiler og busser i rundkørslen.')],
            ('law', 'signs', 'plan')),
])

PRIORITY_TEST = lesson('priority-test', 'PRIORITY_TEST', ('آزمون فصل', 'Chapter test', 'Kapiteltest'), 6, [
    intro(('آزمون فصل ۳', 'Chapter 3 test', 'Kapiteltest 3'),
          ('حالا حق تقدم را با هم مرور می‌کنیم: قاعده‌ی دست راست، راه دادن مطلق، گردش، تقاطع چراغ‌دار و میدان. سؤال‌ها مثل آزمون واقعی‌اند و درس‌ها در هم آمده‌اند؛ هر علامت اشتباه یا جاافتاده یک اشتباه است.',
           'Now we go over right of way together: the right rule, absolute give way, turning, junctions with lights and roundabouts. The questions are like the real test and the lessons are mixed; every wrong or missing tick is one mistake.',
           'Nu gennemgår vi vigepligt samlet: højre vigepligt, ubetinget vigepligt, sving, lysregulerede kryds og rundkørsler. Spørgsmålene er som ved den rigtige prøve, og lektionerne er blandet; hvert forkert eller manglende kryds er én fejl.'),
          [('نشان دهید در هر موقعیت می‌دانید چه چیزی حق تقدم را تعیین می‌کند.', 'Show that you know what decides right of way in each situation.', 'Vise at du ved, hvad der afgør vigepligten i hver situation.'),
           ('نقطه‌های ضعفتان را پیش از فصل بعد پیدا کنید.', 'Find your weak points before the next chapter.', 'Finde dine svage punkter før næste kapitel.')],
          [('تقاطع بدون علامت، خروج از ملک و پلیس در تقاطع.', 'An unmarked junction, leaving a property and a police officer in a junction.', 'Et kryds uden afmærkning, udkørsel fra en ejendom og politi i et kryds.'),
           ('پیکان قرمز، عابر هنگام گردش و تابلوی ورودی میدان.', 'A red arrow, pedestrians when turning and the sign at a roundabout entry.', 'Rød pil, fodgængere ved sving og tavlen ved en rundkørsel.')]),
    q('exam-pri-right',
      'Du kører på en bred vej. Fra en smal sidevej til højre kommer en bil. Der er ingen tavler eller afmærkning. Hvordan forholder du dig?',
      'You are driving on a wide road. A car is coming from a narrow side road on the right. There are no signs or markings. What do you do?',
      'در جاده‌ای پهن می‌رانید. از یک فرعی باریک سمت راست خودرویی می‌آید. تابلو یا خط‌کشی نیست. چه می‌کنید؟',
      st(True, 'Jeg holder tilbage for bilen fra højre.', 'I give way to the car from the right.', 'به خودروی سمت راست راه می‌دهم.',
         ('بدون علامت، قاعده‌ی دست راست اعمال می‌شود؛ پهنای جاده مهم نیست.', 'Without signs the right rule applies; the width of the road does not matter.', 'Uden afmærkning gælder højre vigepligt; vejens bredde er ligegyldig.')),
      st(False, 'Bilen skal holde tilbage for mig, fordi min vej er bredest.', 'The car must give way to me because my road is the widest.', 'آن خودرو باید راه بدهد، چون جاده‌ی من پهن‌تر است.',
         ('پهن‌تر بودن جاده به شما حق تقدم نمی‌دهد.', 'A wider road does not give you priority.', 'En bredere vej giver dig ikke forkørselsret.'))),
    q('exit-property',
      'Du vil køre ud fra en ejendom over fortovet og cykelstien. Hvem skal du holde tilbage for?',
      'You want to drive out of a property across the pavement and the cycle path. Whom must you give way to?',
      'می‌خواهید از یک ملک، از روی پیاده‌رو و مسیر دوچرخه، وارد خیابان شوید. به چه کسانی باید راه بدهید؟',
      st(True, 'Fodgængere på fortovet.', 'Pedestrians on the pavement.', 'عابران پیاده‌رو.', ('هنگام گذشتن از پیاده‌رو به عابران راه می‌دهید.', 'When you cross the pavement you give way to pedestrians.', 'Når du kører over fortovet, holder du tilbage for fodgængere.')),
      st(True, 'Cyklister på cykelstien.', 'Cyclists on the cycle path.', 'دوچرخه‌سواران مسیر دوچرخه.', ('خروج از ملک یعنی راه دادن مطلق به همه.', 'Leaving a property means absolute give way to everyone.', 'Udkørsel fra en ejendom betyder ubetinget vigepligt over for alle.')),
      st(True, 'Kørende på vejen fra begge sider.', 'Traffic on the road from both sides.', 'خودروهای خیابان از هر دو طرف.', ('قاعده‌ی دست راست برای کسی که از ملک بیرون می‌آید اعمال نمی‌شود.', 'The right rule does not apply to someone coming out of a property.', 'Højre vigepligt gælder ikke for den, der kører ud fra en ejendom.')),
      st(False, 'Kun bilerne fra højre.', 'Only the cars from the right.', 'فقط خودروهای سمت راست.', ('باید به همه راه بدهید، نه فقط سمت راست.', 'You must give way to everyone, not only on the right.', 'Du skal holde tilbage for alle, ikke kun fra højre.'))),
    q('sig-arrow',
      'Du holder i vognbanen til venstresving. Venstrepilen er rød, mens hovedsignalet for ligeud er grønt. Hvad gælder?',
      'You are in the left-turn lane. The left arrow is red while the main light for straight on is green. What applies?',
      'در خط گردش به چپ ایستاده‌اید. پیکان چپ قرمز است و چراغ اصلی برای مستقیم سبز. کدام درست است؟',
      st(True, 'Jeg venter, til pilen bliver grøn.', 'I wait until the arrow turns green.', 'صبر می‌کنم تا پیکان سبز شود.', ('پیکان قرمز برای جهت شما یعنی بایستید.', 'A red arrow for your direction means stop.', 'Rød pil for din retning betyder stop.')),
      st(False, 'Jeg må svinge, fordi hovedsignalet er grønt.', 'I may turn because the main light is green.', 'می‌توانم بپیچم، چون چراغ اصلی سبز است.', ('چراغ اصلی برای خط مستقیم است، نه برای گردش شما.', 'The main light is for the straight-on lane, not for your turn.', 'Hovedsignalet gælder ligeudbanen, ikke dit sving.'))),
    q('exam-turn-pedestrian',
      'Du svinger til højre. Både du og fodgængerne har grønt lys. Hvordan forholder du dig?',
      'You are turning right. Both you and the pedestrians have a green light. What do you do?',
      'به راست می‌پیچید. هم شما و هم عابران چراغ سبز دارید. چه می‌کنید؟',
      st(True, 'Jeg holder tilbage for fodgængerne på fodgængerfeltet.', 'I give way to the pedestrians on the crossing.', 'به عابرانی که روی گذرگاه‌اند راه می‌دهم.', ('در گردش، به عابرانی که از عرض خیابانِ مقصد رد می‌شوند راه می‌دهید.', 'When turning, you give way to pedestrians crossing the road you turn into.', 'Når du svinger, holder du tilbage for fodgængere, der går over den vej, du svinger ind på.')),
      st(False, 'Fodgængerne skal vente, fordi jeg allerede er i gang med at svinge.', 'The pedestrians must wait because I am already turning.', 'عابران باید صبر کنند، چون من دارم می‌پیچم.', ('شروع کردن گردش به شما حق تقدم نمی‌دهد.', 'Having started the turn does not give you priority.', 'At du er begyndt at svinge, giver dig ikke forkørselsret.'))),
    q('exam-round-enter',
      'Hvad betyder tavlen ved indkørslen til rundkørslen?',
      'What does the sign at the roundabout entry mean?',
      'تابلوی کنار ورودی میدان چه معنایی دارد؟',
      st(True, 'Jeg har ubetinget vigepligt over for trafikken i rundkørslen.', 'I must give way unconditionally to the traffic in the roundabout.', 'باید بی‌قید و شرط به ترافیک داخل میدان راه بدهم.', ('B 11 یعنی راه دادن مطلق.', 'B 11 means absolute give way.', 'B 11 betyder ubetinget vigepligt.')),
      st(False, 'Jeg skal altid standse helt, før jeg kører ind.', 'I must always stop completely before I enter.', 'همیشه باید پیش از ورود کامل بایستم.', ('ایستادن کامل برای تابلوی STOP (B 13) است؛ با B 11 فقط وقتی لازم است می‌ایستید.', 'A full stop is for the STOP sign (B 13); with B 11 you stop only when needed.', 'Fuldt stop gælder ved STOP-tavlen (B 13); ved B 11 standser du kun, når det er nødvendigt.'))),
    q('exam-pri-police',
      'En politibetjent i krydset giver tegn til, at du skal standse. Du har grønt lys. Hvordan forholder du dig?',
      'A police officer in the junction signals you to stop. You have a green light. What do you do?',
      'پلیسی در تقاطع به شما علامت می‌دهد که بایستید. چراغ شما سبز است. چه می‌کنید؟',
      st(True, 'Jeg standser, fordi politiets tegn går forud for lyssignalet.', 'I stop because the police officer\'s signs come before the traffic light.', 'می‌ایستم، چون علامت پلیس بر چراغ مقدم است.', ('دستور پلیس بر چراغ، تابلو و خط‌کشی مقدم است.', 'A police officer\'s signs come before lights, signs and markings.', 'Politiets tegn går forud for signaler, tavler og afmærkning.')),
      st(False, 'Jeg kører, fordi jeg har grønt lys.', 'I drive on because I have a green light.', 'می‌روم، چون چراغم سبز است.', ('وقتی پلیس دستور می‌دهد، چراغ اهمیتی ندارد.', 'When a police officer directs traffic, the light does not count.', 'Når politiet dirigerer, gælder lyset ikke.'))),
    result(2),
    summary([('بدون علامت: قاعده‌ی دست راست، حتی وقتی جاده‌ی شما پهن‌تر است.', 'No signs: the right rule, even when your road is wider.', 'Ingen afmærkning: højre vigepligt, også når din vej er bredest.'),
             ('خروج از ملک یا پارکینگ: به همه راه بدهید، عابر و دوچرخه‌سوار هم.', 'Leaving a property or car park: give way to everyone, pedestrians and cyclists too.', 'Udkørsel fra ejendom eller parkeringsplads: hold tilbage for alle, også fodgængere og cyklister.'),
             ('پیکان قرمز یعنی بایستید؛ در گردش با چراغ سبز به عابر راه بدهید.', 'A red arrow means stop; when turning on green, give way to pedestrians.', 'Rød pil betyder stop; når du svinger for grønt, holder du tilbage for fodgængere.'),
             ('B 11 در ورودی میدان یعنی راه دادن مطلق؛ دستور پلیس بر همه مقدم است.', 'B 11 at a roundabout entry means absolute give way; the police come before everything.', 'B 11 ved en rundkørsel betyder ubetinget vigepligt; politiet går forud for alt.')],
            ('law', 'signs', 'plan')),
])

CHAPTER = 'priority'
LESSONS = [SIGNAL_JUNCTIONS, ROUNDABOUT, PRIORITY_TEST]
