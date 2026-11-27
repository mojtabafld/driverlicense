# «آزمون جدید», batch 2 (5101–5200), part c: speed (7.3), straight on at junctions (7.12), left turns (7.14), right
# turns (7.13), approaching junctions (7.11), seat belts and children (8.1).
# Rules: Færdselsloven §§ 4, 16, 26, 27, 32, 41, 80, 80 a; Bekendtgørelse om vejafmærkning (B and A signs, S 11, light
# signals).
from nq import Q, S, above, picture, town, view

Q(5151, "7.3", view("""
THE SCENE: a two-way country road between fields in autumn. A tractor has just come out of a field gate on the right, and lumps of
wet brown soil lie spread over our lane for a long stretch ahead; the road surface looks dark and greasy.
MUST BE CLEARLY VISIBLE: the soil spread over the road, the field gate, the tractor further ahead.
MUST NOT APPEAR: signs, text.""", cond="overcast autumn day, damp road"),
  "En traktor har kørt jord ud på vejen fra en mark. Hvordan forholder du dig?",
  "A tractor has brought soil out onto the road from a field. What do you do?",
  "تراکتوری از مزرعه خاک روی جاده آورده است. چه می‌کنید؟",
  S(True, "Jeg regner med, at vejen kan være glat.", "I expect that the road may be slippery.", "انتظار دارم جاده لغزنده باشد.",
    "Jord på en fugtig vej kan gøre føret fedtet og glat.", "Soil on a damp road can make the surface greasy and slippery.", "خاک روی جاده‌ی مرطوب می‌تواند سطح را چرب و لغزنده کند."),
  S(True, "Jeg sænker farten.", "I slow down.", "سرعتم را کم می‌کنم.",
    "I vådt, glat eller fedtet føre skal hastigheden være passende lav.", "In wet, slippery or greasy conditions your speed must be suitably low.", "در شرایط خیس، لغزنده یا چرب سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Bremselængden kan blive længere end normalt.", "The braking distance may be longer than normal.", "مسافت ترمز ممکن است بیشتر از معمول باشد.",
    "Dækkene får dårligere greb på jord og mudder.", "The tyres grip less well on soil and mud.", "لاستیک‌ها روی خاک و گل چسبندگی کمتری دارند."),
  S(False, "Jord på vejen er kun farligt, når det regner.", "Soil on the road is only dangerous when it is raining.", "خاک روی جاده فقط وقتی باران می‌بارد خطرناک است.",
    "Også fugtig jord uden regn kan være meget glat.", "Damp soil can be very slippery even without rain.", "خاک مرطوب حتی بدون باران هم می‌تواند خیلی لغزنده باشد."),
)

Q(5152, "7.3", view("""
THE SCENE: a two-way country road with a broken centre line climbing towards a hilltop about 80 m ahead; beyond the crest the road
cannot be seen. No traffic in sight.
MUST BE CLEARLY VISIBLE: the hilltop hiding the road beyond.
MUST NOT APPEAR: signs, other vehicles, text."""),
  "Du nærmer dig en bakketop, hvor du ikke kan se, hvad der er på den anden side. Hvordan forholder du dig?",
  "You are approaching a hilltop where you cannot see what is on the other side. What do you do?",
  "به بالای تپه‌ای نزدیک می‌شوید که پشتش را نمی‌بینید. چه می‌کنید؟",
  S(True, "Jeg sænker farten før bakketoppen.", "I slow down before the hilltop.", "پیش از رسیدن به بالای تپه سرعتم را کم می‌کنم.",
    "Foran en bakketop, hvor oversigten er begrænset, skal hastigheden være passende lav.", "Before a hilltop where the view is limited, your speed must be suitably low.",
    "پیش از بالای تپه‌ای که دید محدود است، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Jeg holder godt til højre.", "I keep well to the right.", "خوب سمت راست می‌مانم.",
    "En modkørende kan dukke op over bakken.", "An oncoming vehicle may appear over the hill.", "ممکن است وسیله‌ای از روبه‌رو از پشت تپه پیدا شود."),
  S(False, "Jeg holder farten, så jeg hurtigt kommer over.", "I keep my speed so that I get over quickly.", "سرعتم را حفظ می‌کنم تا زود رد شوم.",
    "Der kan holde en bil eller ligge noget på vejen lige efter toppen.", "A car may be standing or something lying on the road just after the top.", "ممکن است درست پشت تپه خودرویی ایستاده یا چیزی روی جاده افتاده باشد."),
  S(False, "Jeg kører midt på vejen for at se bedre.", "I drive in the middle of the road to see better.", "وسط جاده می‌رانم تا بهتر ببینم.",
    "Midt på vejen kan du støde sammen med en modkørende.", "In the middle of the road you may collide with an oncoming vehicle.", "وسط جاده ممکن است با وسیله‌ی روبه‌رو برخورد کنید."),
)

Q(5153, "7.3", town("""
THE SCENE: a residential street with houses and gardens, a 50 km/h road. On the right pavement several children play with a ball and a
skipping rope close to the kerb; a few parked cars stand between them and the road further ahead.
MUST BE CLEARLY VISIBLE: the children playing near the kerb, the parked cars.
MUST NOT APPEAR: signs, text.""", cond="sunny afternoon, dry road"),
  "Du kører i et boligkvarter, hvor børn leger på fortovet. Hvordan forholder du dig?",
  "You are driving in a residential area where children are playing on the pavement. What do you do?",
  "در محله‌ای مسکونی می‌رانید که بچه‌ها در پیاده‌رو بازی می‌کنند. چه می‌کنید؟",
  S(True, "Jeg sænker farten.", "I slow down.", "سرعتم را کم می‌کنم.",
    "Når du nærmer dig børn på eller ved vejen, skal hastigheden være passende lav.", "When you approach children on or by the road, your speed must be suitably low.",
    "وقتی به بچه‌هایی روی جاده یا کنار آن نزدیک می‌شوید، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Et barn kan pludselig løbe ud på vejen.", "A child may suddenly run out into the road.", "ممکن است کودکی ناگهان به خیابان بدود.",
    "Børn kan ikke altid vurdere trafikken.", "Children cannot always judge the traffic.", "بچه‌ها همیشه نمی‌توانند ترافیک را بسنجند."),
  S(True, "Jeg er klar til at bremse.", "I am ready to brake.", "آماده‌ی ترمز هستم.",
    "Så kan du standse hurtigere, hvis et barn kommer ud.", "Then you can stop sooner if a child comes out.", "این‌طور اگر کودکی بیرون آمد، زودتر می‌ایستید."),
  S(False, "Jeg kan holde 50 km/t, fordi det er tilladt her.", "I can keep to 50 km/h because it is allowed here.", "می‌توانم ۵۰ برانم، چون این‌جا مجاز است.",
    "Grænsen er en øvre grænse; nær børn skal farten ned.", "The limit is an upper limit; near children your speed must come down.", "حد سرعت سقف است؛ نزدیک بچه‌ها باید سرعت را کم کنید."),
)

Q(5154, "7.3", view("""
THE SCENE: a two-way country road with a broken centre line leading into a right-hand bend lined with tall bushes, so that the road
after the bend cannot be seen. The speed-limit sign 80 stands on the right verge before the bend.
MUST BE CLEARLY VISIBLE: the blind bend, the 80 sign.
MUST NOT APPEAR: other vehicles, other signs, text."""),
  "Du nærmer dig et sving, hvor du ikke kan se vejen efter svinget. Hvordan forholder du dig?",
  "You are approaching a bend where you cannot see the road after it. What do you do?",
  "به پیچی نزدیک می‌شوید که جاده‌ی بعد از آن را نمی‌بینید. چه می‌کنید؟",
  S(True, "Jeg kører så langsomt, at jeg kan standse, hvis der er en hindring efter svinget.", "I drive so slowly that I can stop if there is an obstacle after the bend.",
    "آن‌قدر آهسته می‌رانم که اگر بعد از پیچ مانعی باشد، بتوانم بایستم.",
    "Du skal kunne standse på den strækning, du kan se, og foran enhver hindring, der kan påregnes.",
    "You must be able to stop within the distance you can see and before any obstacle that can be expected.",
    "باید بتوانید در فاصله‌ای که می‌بینید و پیش از هر مانعی که قابل انتظار است بایستید."),
  S(False, "Jeg må køre 80 km/t, fordi det er grænsen.", "I may drive at 80 km/h because that is the limit.", "می‌توانم ۸۰ برانم، چون حد سرعت همین است.",
    "Grænsen er det højeste, du må; i svinget kan det være alt for hurtigt.", "The limit is the most you may do; in the bend it may be far too fast.", "حد سرعت بیشترین مقدار مجاز است؛ در پیچ ممکن است خیلی زیاد باشد."),
  S(False, "Jeg kan regne med, at vejen er fri, fordi jeg ikke kan se noget.", "I can count on the road being clear because I cannot see anything.", "می‌توانم مطمئن باشم راه باز است، چون چیزی نمی‌بینم.",
    "Det, du ikke kan se, kan være der.", "What you cannot see may be there.", "چیزی که نمی‌بینید ممکن است آن‌جا باشد."),
  S(False, "Jeg sænker først farten, når jeg ser en hindring.", "I only slow down when I see an obstacle.", "فقط وقتی مانعی ببینم سرعتم را کم می‌کنم.",
    "Så kan det være for sent; farten skal ned før svinget.", "Then it may be too late; your speed must come down before the bend.", "آن وقت ممکن است دیر باشد؛ سرعت باید پیش از پیچ کم شود."),
)

Q(5155, "7.3", view("""
THE SCENE: a two-way country road at night in heavy rain: raindrops on the windscreen, the wet road surface reflecting our dipped
headlights, the edge lines hard to see. About 40 m ahead the red rear lights of a car blurred by the rain.
MUST BE CLEARLY VISIBLE: the heavy rain, the hard-to-see edge lines, the rear lights ahead.
MUST NOT APPEAR: street lamps, signs, text.""", cond="night, heavy rain, wet road"),
  "Det regner kraftigt i mørke, og du har svært ved at se vejens kanter. Hvordan forholder du dig?",
  "It is raining heavily in the dark, and you find it hard to see the edges of the road. What do you do?",
  "در تاریکی باران شدیدی می‌بارد و لبه‌های جاده را به‌سختی می‌بینید. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned, fordi sigtbarheden er nedsat.", "I lower my speed because visibility is reduced.", "سرعتم را کم می‌کنم، چون دید کم شده است.",
    "Når sigtbarheden er nedsat på grund af lys- eller vejrforholdene, skal hastigheden være passende lav.",
    "When visibility is reduced by the light or the weather, your speed must be suitably low.", "وقتی نور یا هوا دید را کم می‌کند، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Jeg holder større afstand til bilen foran.", "I keep a greater distance to the car in front.", "فاصله‌ی بیشتری با خودروی جلو نگه می‌دارم.",
    "På våd vej er bremselængden længere.", "On a wet road the braking distance is longer.", "در جاده‌ی خیس مسافت ترمز بیشتر است."),
  S(False, "Jeg holder hastighedsgrænsen, så er det sikkert.", "I keep to the speed limit, and then it is safe.", "حد سرعت را رعایت می‌کنم، پس ایمن است.",
    "Grænsen gælder gode forhold; i regn og mørke skal farten ned.", "The limit is for good conditions; in rain and darkness your speed must come down.", "حد سرعت برای شرایط خوب است؛ در باران و تاریکی باید سرعت را کم کنید."),
  S(False, "Jeg kører tæt bag bilen foran og følger dens baglygter.", "I drive close behind the car in front and follow its rear lights.", "نزدیک پشت خودروی جلو می‌رانم و چراغ‌های عقبش را دنبال می‌کنم.",
    "Bremser den, kan du ikke nå at standse.", "If it brakes, you cannot stop in time.", "اگر ترمز کند، به موقع نمی‌ایستید."),
)

Q(5156, "7.12", town("""
THE SCENE: a junction in town with traffic lights and separate lanes: we are first in the lane for going STRAIGHT ON; its signal shows
RED. The lane to our left is for turning left, and its signal shows a GREEN arrow pointing left; the cars in that lane are starting to
turn left.
MUST BE CLEARLY VISIBLE: our red light, the green left arrow for the lane beside us, the cars turning left.
MUST NOT APPEAR: text."""),
  "Du skal ligeud, og dit signal viser rødt. Signalet for venstresvingsbanen ved siden af viser grøn pil. Hvad gælder?",
  "You are going straight on, and your signal shows red. The signal for the left-turn lane beside you shows a green arrow. What applies?",
  "می‌خواهید مستقیم بروید و چراغ شما قرمز است. چراغ خط گردش به چپ کنار شما فلش سبز است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder stille, fordi den grønne pil kun gælder dem, der svinger til venstre.", "I wait, because the green arrow only applies to those turning left.",
    "می‌ایستم، چون فلش سبز فقط برای کسانی است که به چپ می‌پیچند.",
    "Et pilsignal gælder for trafikanter, der vil køre i den retning, pilen viser.", "An arrow signal applies to road users going in the direction the arrow shows.",
    "چراغ فلش‌دار برای کسانی است که می‌خواهند به جهت فلش بروند."),
  S(False, "Jeg må køre, når bilerne ved siden af kører.", "I may go when the cars beside me go.", "وقتی خودروهای کنارم حرکت می‌کنند، می‌توانم بروم.",
    "Du skal følge signalet for din egen vognbane.", "You must follow the signal for your own lane.", "باید از چراغ خط خودتان پیروی کنید."),
  S(False, "Jeg må køre ligeud, hvis der ikke kommer nogen fra siden.", "I may go straight on if nobody is coming from the side.", "اگر کسی از کنار نیاید، می‌توانم مستقیم بروم.",
    "Rødt lys betyder stop, uanset trafikken.", "Red means stop whatever the traffic.", "چراغ قرمز یعنی ایست، ترافیک هر چه باشد."),
)

Q(5157, "7.12", view("""
THE SCENE: a straight two-way main road outside town; on the right verge, some way back, stood the yellow diamond main-road sign (now
behind us). About 60 m ahead a side road joins from the RIGHT; across its end there are white shark teeth facing the side road. A
small car in the side road rolls slowly towards the shark teeth.
MUST BE CLEARLY VISIBLE: the side road with shark teeth, the car rolling towards them.
MUST NOT APPEAR: other signs, text."""),
  "Du kører på en hovedvej. Fra en sidevej med hajtænder ruller en bil langsomt frem mod krydset. Hvordan forholder du dig?",
  "You are driving on a main road. From a side road with shark teeth a car is rolling slowly towards the junction. What do you do?",
  "در جاده‌ی اصلی می‌رانید. از فرعی‌ای با دندان‌کوسه خودرویی آهسته به سمت تقاطع می‌آید. چه می‌کنید؟",
  S(True, "Bilen fra sidevejen skal holde tilbage for mig.", "The car from the side road must give way to me.", "خودروی فرعی باید به من راه بدهد.",
    "Hajtænderne giver bilen i sidevejen ubetinget vigepligt.", "The shark teeth make the car in the side road give way unconditionally.", "دندان‌کوسه‌ها خودروی فرعی را مکلف به راه دادن بی‌قیدوشرط می‌کنند."),
  S(True, "Jeg holder øje med, om den virkelig standser.", "I watch whether it really stops.", "مراقبم که واقعاً بایستد.",
    "Du skal være klar til at reagere, hvis den anden ikke overholder sin vigepligt.", "You must be ready to react if the other driver does not give way.", "باید آماده باشید اگر دیگری راه نداد، واکنش نشان دهید."),
  S(False, "Jeg kan regne med, at den holder tilbage, så jeg øger farten.", "I can count on it giving way, so I speed up.", "می‌توانم مطمئن باشم راه می‌دهد، پس سرعتم را زیاد می‌کنم.",
    "Du skal altid være forberedt på, at andre laver fejl.", "You must always be prepared for others to make mistakes.", "همیشه باید برای اشتباه دیگران آماده باشید."),
  S(False, "Jeg skal holde tilbage, fordi bilen kommer fra højre.", "I must give way because the car is coming from the right.", "باید راه بدهم، چون خودرو از راست می‌آید.",
    "Højrereglen gælder ikke her, hvor sidevejen har hajtænder.", "The right-hand rule does not apply here, where the side road has shark teeth.", "این‌جا که فرعی دندان‌کوسه دارد، قاعده‌ی دست راست اعمال نمی‌شود."),
)

Q(5158, "7.12", town("""
THE SCENE: a junction in town with traffic lights; our light is RED. Across our lane there is a wide white stop line, and a few metres
after it a zebra crossing. No pedestrians on the crossing at the moment.
MUST BE CLEARLY VISIBLE: the red light, the stop line, the zebra crossing after it.
MUST NOT APPEAR: text."""),
  "Du kommer til et rødt lys. Der er en stoplinje på kørebanen et stykke før fodgængerfeltet. Hvor standser du?",
  "You come to a red light. There is a stop line on the road some way before the pedestrian crossing. Where do you stop?",
  "به چراغ قرمز می‌رسید. روی سواره‌رو کمی پیش از گذرگاه عابر خط ایست هست. کجا می‌ایستید؟",
  S(True, "Før stoplinjen.", "Before the stop line.", "پیش از خط ایست.",
    "Ved rødt lys skal du standse før stoplinjen.", "At a red light you must stop before the stop line.", "در چراغ قرمز باید پیش از خط ایست بایستید."),
  S(False, "Lige før fodgængerfeltet, efter stoplinjen.", "Just before the pedestrian crossing, after the stop line.", "درست پیش از گذرگاه عابر، بعد از خط ایست.",
    "Stoplinjen viser, hvor du skal standse.", "The stop line shows where you must stop.", "خط ایست نشان می‌دهد کجا باید بایستید."),
  S(False, "På fodgængerfeltet, når der ikke er fodgængere.", "On the pedestrian crossing, when there are no pedestrians.", "روی گذرگاه عابر، وقتی عابری نیست.",
    "Du skal så vidt muligt undgå at standse på et fodgængerfelt.", "You must as far as possible avoid stopping on a pedestrian crossing.", "تا جای ممکن نباید روی گذرگاه عابر بایستید."),
  S(True, "Et sted, hvor fodgængerfeltet er helt frit.", "Somewhere the pedestrian crossing is completely clear.", "جایی که گذرگاه عابر کاملاً آزاد بماند.",
    "Fodgængerne skal kunne gå over uden at gå uden om din bil.", "Pedestrians must be able to cross without walking round your car.", "عابران باید بتوانند بدون دور زدن خودروی شما رد شوند."),
)

Q(5159, "7.12", town("""
THE SCENE: a residential street; about 30 m ahead a side street joins from the RIGHT, a normal street with houses on both sides. There
are no signs and no markings at the junction (no shark teeth). A white car comes along the side street towards the junction.
MUST BE CLEARLY VISIBLE: the side street on the right without markings, the white car in it.
MUST NOT APPEAR: signs, shark teeth, text."""),
  "Du kører ligeud. Fra en sidevej til højre kommer en bil. Der er ingen tavler eller hajtænder. Hvad gælder?",
  "You are going straight on. A car is coming from a side road on the right. There are no signs or shark teeth. What applies?",
  "مستقیم می‌روید. از فرعی سمت راست خودرویی می‌آید. تابلو یا دندان‌کوسه‌ای نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for bilen fra højre.", "I must give way to the car from the right.", "باید به خودروی سمت راست راه بدهم.",
    "Uden tavler og afmærkning gælder højrereglen.", "Without signs or markings the right-hand rule applies.", "بدون تابلو و خط‌کشی، قاعده‌ی دست راست برقرار است."),
  S(False, "Bilen fra sidevejen skal holde tilbage, fordi den kommer fra en mindre vej.", "The car from the side road must give way because it is coming from a smaller road.",
    "خودروی فرعی باید راه بدهد، چون از راه کوچک‌تری می‌آید.",
    "En vejs størrelse bestemmer ikke vigepligten.", "The size of a road does not decide who gives way.", "بزرگی جاده حق تقدم را تعیین نمی‌کند."),
  S(True, "Højrereglen gælder, selv om sidevejen ser mindre ud.", "The right-hand rule applies even if the side road looks smaller.", "قاعده‌ی دست راست برقرار است، حتی اگر فرعی کوچک‌تر به نظر برسد.",
    "Kun tavler, afmærkning eller særlige udkørsler (fx fra en ejendom) ændrer det.", "Only signs, markings or special exits (for example from a property) change that.",
    "فقط تابلو، خط‌کشی یا خروجی‌های خاص (مثلاً از یک ملک) این را تغییر می‌دهند."),
  S(False, "Jeg har forkørselsret, fordi jeg kører ligeud.", "I have the right of way because I am going straight on.", "حق تقدم با من است، چون مستقیم می‌روم.",
    "At køre ligeud giver ingen forkørselsret.", "Going straight on gives no right of way.", "مستقیم رفتن حق تقدم نمی‌دهد."),
)

Q(5160, "7.14", above("""
THE SCENE: a junction with traffic lights seen from above.
VEHICLES (colour code used strictly): a RED car (ours) stands in the middle of the junction, waiting to turn left (a SOLID GREEN arrow
shows its left turn); its signal has just changed to YELLOW. Two oncoming cars are crossing the junction straight on; a third oncoming
car further back is slowing down for its light.
MUST NOT APPEAR: text."""),
  "Du holder midt i krydset for at svinge til venstre, og lyset skifter til gult. Hvordan forholder du dig?",
  "You are waiting in the middle of the junction to turn left, and the light changes to yellow. What do you do?",
  "وسط تقاطع ایستاده‌اید تا به چپ بپیچید و چراغ زرد می‌شود. چه می‌کنید؟",
  S(True, "Jeg kører ud af krydset, når de modkørende er kørt forbi eller standset.", "I drive out of the junction when the oncoming cars have passed or stopped.",
    "وقتی خودروهای روبه‌رو رد شدند یا ایستادند، از تقاطع خارج می‌شوم.",
    "Du er allerede i krydset og skal ud af det, så snart det kan ske uden fare.", "You are already in the junction and must get out of it as soon as it can be done safely.",
    "شما در تقاطع هستید و باید به محض بی‌خطر شدن از آن خارج شوید."),
  S(True, "Jeg holder stadig tilbage for modkørende, der ikke kan nå at standse.", "I still give way to oncoming cars that cannot stop in time.",
    "هنوز به خودروهای روبه‌رویی که نمی‌توانند به موقع بایستند راه می‌دهم.",
    "Ved venstresving må du ikke være til ulempe for de modkørende.", "When turning left you must not inconvenience oncoming traffic.", "هنگام گردش به چپ نباید مزاحم ترافیک روبه‌رو شوید."),
  S(False, "Jeg bakker tilbage bag stoplinjen.", "I reverse back behind the stop line.", "دنده‌عقب تا پشت خط ایست برمی‌گردم.",
    "At bakke i et kryds er farligt; trafikken bag dig kører frem.", "Reversing in a junction is dangerous; the traffic behind you is moving forward.", "دنده‌عقب در تقاطع خطرناک است؛ ترافیک پشت سرتان جلو می‌آید."),
  S(False, "Jeg bliver stående i krydset, til jeg får grønt igen.", "I stay in the junction until I get green again.", "در تقاطع می‌مانم تا دوباره سبز شود.",
    "Så spærrer du for den tværgående trafik, når den får grønt.", "Then you block the crossing traffic when it gets green.", "این‌طور راه ترافیک متقاطع را وقتی سبز می‌شود می‌بندید."),
)

Q(5161, "7.14", above("""
THE SCENE: a two-way road seen from above with a side road going off to the LEFT. Along the LEFT side of our road runs a TWO-WAY cycle
path (white arrows on it pointing both ways), separated from the carriageway by a kerb, crossing the mouth of the side road.
VEHICLES AND PEOPLE (colour code used strictly): a RED car (ours) placed near the centre line, its LEFT indicator flashing, about to
turn left into the side road (a SOLID GREEN arrow). On the cycle path one cyclist comes from ahead and another from behind, both going
straight on across the mouth of the side road. An oncoming BLUE car is far away.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til venstre ind på en sidevej. Langs vejens venstre side er der en dobbeltrettet cykelsti. Hvad gælder?",
  "You want to turn left into a side road. Along the left side of the road there is a two-way cycle path. What applies?",
  "می‌خواهید به چپ وارد فرعی شوید. در سمت چپ جاده مسیر دوچرخه‌ی دوطرفه هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke svinge, før det kan ske uden ulempe for cyklisterne, der kører ligeud.", "I must not turn until it can be done without inconvenience to the cyclists going straight on.",
    "تا وقتی برای دوچرخه‌سوارانی که مستقیم می‌روند مزاحمتی نداشته باشد، نباید بپیچم.",
    "Er der en dobbeltrettet cykelsti, må du ikke svinge til venstre, før det kan ske uden ulempe for cyklister og knallertkørere, der kører ligeud.",
    "With a two-way cycle path you must not turn left until it can be done without inconvenience to cyclists and moped riders going straight on.",
    "وقتی مسیر دوچرخه‌ی دوطرفه هست، تا وقتی برای دوچرخه‌سواران و موپدسوارانی که مستقیم می‌روند مزاحمتی نداشته باشد، نباید به چپ بپیچید."),
  S(True, "Jeg ser efter cyklister fra begge retninger.", "I look for cyclists from both directions.", "دوچرخه‌سواران هر دو جهت را نگاه می‌کنم.",
    "På en dobbeltrettet cykelsti kommer cyklisterne både forfra og bagfra.", "On a two-way cycle path cyclists come both from ahead and from behind.", "روی مسیر دوچرخه‌ی دوطرفه، دوچرخه‌سواران هم از جلو و هم از پشت می‌آیند."),
  S(True, "Jeg holder også tilbage for modkørende biler.", "I also give way to oncoming cars.", "به خودروهای روبه‌رو هم راه می‌دهم.",
    "Ved venstresving må du ikke være til ulempe for de modkørende.", "When turning left you must not inconvenience oncoming traffic.", "هنگام گردش به چپ نباید مزاحم ترافیک روبه‌رو شوید."),
  S(False, "Cyklisterne skal holde tilbage, fordi jeg blinker.", "The cyclists must give way because I am signalling.", "دوچرخه‌سواران باید راه بدهند، چون راهنما زده‌ام.",
    "Blinklyset giver ingen ret til at svinge.", "The indicator gives no right to turn.", "راهنما حق پیچیدن نمی‌دهد."),
)

Q(5162, "7.14", above("""
THE SCENE: a crossroads seen from above with no traffic lights.
VEHICLES (colour code used strictly): a RED car (ours) coming up from the bottom, its LEFT indicator flashing, about to turn left into
the road to the left (a SOLID GREEN arrow). An oncoming BLUE car coming down from the top, its RIGHT indicator flashing, about to turn
right into the SAME road (a DASHED ORANGE arrow). Both cars are at the junction at the same time.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til venstre. En modkørende bil vil svinge til højre ind på samme vej som dig. Hvad gælder?",
  "You want to turn left. An oncoming car wants to turn right into the same road as you. What applies?",
  "می‌خواهید به چپ بپیچید. خودرویی از روبه‌رو می‌خواهد به راست وارد همان جاده‌ای شود که شما می‌روید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for den modkørende, der svinger til højre.", "I give way to the oncoming car that is turning right.", "به خودروی روبه‌رو که به راست می‌پیچد راه می‌دهم.",
    "Ved venstresving må du ikke være til ulempe for modkørende, heller ikke dem, der svinger til højre.",
    "When turning left you must not inconvenience oncoming traffic, including those turning right.", "هنگام گردش به چپ نباید مزاحم ترافیک روبه‌رو شوید، از جمله کسانی که به راست می‌پیچند."),
  S(False, "Jeg har forkørselsret, fordi jeg kom først.", "I have the right of way because I got there first.", "حق تقدم با من است، چون اول رسیدم.",
    "Hvem der kom først, betyder ikke noget.", "Who got there first does not matter.", "این‌که چه کسی اول رسید، اهمیتی ندارد."),
  S(False, "Vi skal begge standse og vinke hinanden frem.", "We must both stop and wave each other on.", "هر دو باید بایستیم و به هم اشاره کنیم که اول برو.",
    "Reglerne siger, hvem der skal holde tilbage; her er det dig.", "The rules say who must give way; here it is you.", "قانون می‌گوید چه کسی باید راه بدهد؛ این‌جا شما هستید."),
)

Q(5163, "7.14", view("""
THE SCENE: a straight two-way country road with a broken centre line. About 40 m ahead a small field road goes off to the LEFT. Our
LEFT indicator lamp glows on the dashboard strip. In the left door mirror (at the left edge of the picture) a motorcycle is visible
coming fast from behind, close to the centre line.
MUST BE CLEARLY VISIBLE: the field road on the left, the motorcycle in the left door mirror.
MUST NOT APPEAR: oncoming traffic, signs, text."""),
  "Du vil svinge til venstre ind på en markvej. Bag dig kommer en motorcykel hurtigt. Hvordan forholder du dig?",
  "You want to turn left into a field road. A motorcycle is coming up fast behind you. What do you do?",
  "می‌خواهید به چپ وارد یک راه خاکی مزرعه شوید. از پشت موتورسیکلتی با سرعت می‌آید. چه می‌کنید؟",
  S(True, "Jeg ser i spejlet og over venstre skulder, før jeg svinger.", "I look in the mirror and over my left shoulder before I turn.", "پیش از پیچیدن در آینه و از روی شانه‌ی چپ نگاه می‌کنم.",
    "Før du svinger, skal du sikre dig, at det kan ske uden fare for dem, der kører i samme retning.",
    "Before you turn, you must make sure that it can be done without danger to those going in the same direction.",
    "پیش از پیچیدن باید مطمئن شوید که برای کسانی که هم‌جهت شما می‌آیند خطری ندارد."),
  S(True, "Jeg blinker i god tid og placerer mig ved midten af vejen.", "I signal in good time and place myself near the middle of the road.", "به موقع راهنما می‌زنم و نزدیک وسط جاده قرار می‌گیرم.",
    "Så kan de bagfra se, hvad du vil.", "Then those behind can see what you are going to do.", "این‌طور پشت‌سری‌ها می‌بینند چه می‌خواهید بکنید."),
  S(False, "Motorcyklen skal altid holde tilbage, fordi jeg blinker.", "The motorcycle must always give way because I am signalling.", "موتورسیکلت همیشه باید راه بدهد، چون راهنما زده‌ام.",
    "Blinklyset giver dig ikke ret til at svinge foran andre.", "The indicator does not give you the right to turn in front of others.", "راهنما به شما حق پیچیدن جلوی دیگران را نمی‌دهد."),
  S(False, "Jeg kan svinge med det samme, fordi jeg har blinket.", "I can turn straight away because I have signalled.", "می‌توانم فوراً بپیچم، چون راهنما زده‌ام.",
    "Er motorcyklen ved at overhale, skal du vente.", "If the motorcycle is overtaking, you must wait.", "اگر موتورسیکلت در حال سبقت است، باید صبر کنید."),
)

Q(5164, "7.14", above("""
THE SCENE: a junction seen from above: our road comes up from the bottom; the road to the LEFT has TWO lanes in each direction. About
50 m along that road a side street goes off to the right.
VEHICLES (colour code used strictly): a RED car (ours) turning left into the two-lane road; a SOLID GREEN arrow shows it ending in the
RIGHT of the two lanes, ready for the side street; a DASHED ORANGE arrow shows the other choice, into the left lane.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "Du svinger til venstre ind på en vej med to vognbaner i din nye retning. Lidt længere fremme skal du til højre. Hvad gælder?",
  "You are turning left into a road with two lanes in your new direction. A little further on you are going to turn right. What applies?",
  "به چپ وارد جاده‌ای می‌شوید که در جهت تازه‌تان دو خط دارد. کمی جلوتر باید به راست بپیچید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg vælger den vognbane, der passer bedst til trafikken og min videre kørsel.", "I choose the lane that best suits the traffic and where I am going next.",
    "خطی را انتخاب می‌کنم که با ترافیک و ادامه‌ی مسیرم بیشتر جور است.",
    "Har vejen, du svinger ind på, to eller flere vognbaner i samme retning, svinger du på den måde, der er mest hensigtsmæssig.",
    "If the road you turn into has two or more lanes in the same direction, you turn in the way that is most suitable.",
    "اگر جاده‌ای که واردش می‌شوید دو یا چند خط هم‌جهت دارد، به مناسب‌ترین شکل می‌پیچید."),
  S(True, "Det kan være den højre vognbane, når jeg snart skal til højre.", "It may be the right-hand lane when I am soon going to turn right.", "وقتی به‌زودی باید به راست بپیچم، ممکن است خط راست باشد.",
    "Så undgår du et vognbaneskift lige før næste sving.", "That way you avoid a lane change just before the next turn.", "این‌طور از تغییر خط درست پیش از پیچ بعدی پرهیز می‌کنید."),
  S(False, "Jeg skal altid ende i den venstre vognbane efter et venstresving.", "I must always end up in the left lane after a left turn.", "پس از گردش به چپ همیشه باید در خط چپ قرار بگیرم.",
    "Der er ingen sådan regel, når vejen har flere vognbaner.", "There is no such rule when the road has several lanes.", "وقتی جاده چند خط دارد، چنین قاعده‌ای نیست."),
  S(False, "Jeg må skifte vognbane midt i svinget uden at se mig for.", "I may change lanes in the middle of the turn without looking.", "می‌توانم وسط پیچ بدون نگاه کردن تغییر خط بدهم.",
    "Et vognbaneskift skal altid kunne ske uden fare.", "A lane change must always be done safely.", "تغییر خط همیشه باید بی‌خطر باشد."),
)

Q(5165, "7.14", view("""
THE SCENE: we are waiting at a junction in town, near the centre line, to turn left (our left indicator lamp glows on the dashboard
strip). An oncoming car has stopped and its driver flashes the headlights at us. To the right of the oncoming car, on its right side,
a cycle lane runs along the kerb; the view of it is partly hidden by the car.
MUST BE CLEARLY VISIBLE: the oncoming car flashing its headlights, the hidden cycle lane beside it.
MUST NOT APPEAR: signs, text.""", scenery="Scenery is reduced to simple flat house fronts, pavements and a few trees."),
  "Du venter på at svinge til venstre. Den modkørende bil standser og blinker med lyset. Hvordan forholder du dig?",
  "You are waiting to turn left. The oncoming car stops and flashes its lights. What do you do?",
  "منتظر گردش به چپ هستید. خودروی روبه‌رو می‌ایستد و چراغ می‌زند. چه می‌کنید؟",
  S(True, "Jeg sikrer mig selv, at svinget kan ske uden fare, før jeg kører.", "I make sure myself that the turn can be done safely before I go.",
    "پیش از حرکت خودم مطمئن می‌شوم که پیچیدن بی‌خطر است.",
    "Et lyssignal er efter loven en advarsel og giver dig ingen ret; der kan komme en cyklist bag bilen.",
    "By law a light signal is a warning and gives you no right; a cyclist may be coming behind the car.",
    "طبق قانون چراغ زدن هشدار است و حقی به شما نمی‌دهد؛ ممکن است دوچرخه‌سواری پشت آن خودرو بیاید."),
  S(False, "Blinket betyder altid, at jeg kan svinge med det samme.", "The flash always means that I can turn straight away.", "چراغ زدن همیشه یعنی می‌توانم فوراً بپیچم.",
    "Du ved ikke, hvad den anden mener, og du kan ikke se alt bag bilen.", "You do not know what the other driver means, and you cannot see everything behind the car.",
    "نمی‌دانید منظور او چیست و همه‌چیز پشت آن خودرو را نمی‌بینید."),
  S(False, "Jeg skal køre nu, ellers er jeg til ulempe for den modkørende.", "I must go now, otherwise I am in the oncoming driver's way.", "باید الان بروم، وگرنه مزاحم راننده‌ی روبه‌رو هستم.",
    "Sikkerheden går forud; vent, til du kan se, at vejen er fri.", "Safety comes first; wait until you can see the way is clear.", "ایمنی مقدم است؛ صبر کنید تا ببینید راه باز است."),
  S(False, "Blinket betyder, at den modkørende har pligt til at holde tilbage for mig.", "The flash means that the oncoming driver has a duty to give way to me.",
    "چراغ زدن یعنی راننده‌ی روبه‌رو موظف است به من راه بدهد.",
    "Det er dig, der skal holde tilbage ved venstresving.", "It is you who must give way when turning left.", "هنگام گردش به چپ، این شما هستید که باید راه بدهید."),
)

Q(5166, "7.13", town("""
THE SCENE: a junction in town with traffic lights. We are first at the stop line and want to turn RIGHT (our right indicator lamp
glows on the dashboard strip). Our signal shows RED. The street to the right is empty, and no pedestrians are near.
MUST BE CLEARLY VISIBLE: the red light, the empty street to the right.
MUST NOT APPEAR: arrows on the signal, text."""),
  "Du vil svinge til højre, og lyset er rødt. Der kommer ingen. Hvad gælder?",
  "You want to turn right, and the light is red. Nobody is coming. What applies?",
  "می‌خواهید به راست بپیچید و چراغ قرمز است. کسی نمی‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder stille, til jeg får grønt.", "I wait until I get green.", "تا سبز شدن چراغ می‌ایستم.",
    "Rødt lys betyder stop, også når du skal svinge til højre.", "Red means stop, also when you are going to turn right.", "چراغ قرمز یعنی ایست، حتی وقتی می‌خواهید به راست بپیچید."),
  S(False, "Jeg må svinge til højre for rødt, når vejen er fri.", "I may turn right on red when the road is clear.", "وقتی راه باز است، می‌توانم با چراغ قرمز به راست بپیچم.",
    "Der er ingen regel, der tillader biler at svinge til højre for rødt.", "There is no rule allowing cars to turn right on red.", "هیچ قاعده‌ای پیچیدن خودرو به راست با چراغ قرمز را مجاز نمی‌کند."),
  S(False, "Jeg må svinge, hvis jeg kører meget langsomt.", "I may turn if I drive very slowly.", "اگر خیلی آهسته بروم، می‌توانم بپیچم.",
    "Farten ændrer ikke på signalet.", "Speed does not change the signal.", "سرعت چیزی را درباره‌ی چراغ تغییر نمی‌دهد."),
)

Q(5167, "7.13", town("""
THE SCENE: a town street with a painted cycle lane along the right kerb (a broad white line between the cycle lane and our lane, a white
bicycle symbol on it). About 20 m ahead a side street goes off to the RIGHT; our right indicator lamp glows on the dashboard strip. In
the right door mirror (at the right edge of the picture) a cyclist is visible in the cycle lane, coming up from behind.
MUST BE CLEARLY VISIBLE: the painted cycle lane, the side street, the cyclist in the right door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til højre. Bag dig kommer en cyklist i cykelbanen. Hvordan forholder du dig?",
  "You want to turn right. A cyclist is coming up behind you in the cycle lane. What do you do?",
  "می‌خواهید به راست بپیچید. از پشت دوچرخه‌سواری در خط دوچرخه می‌آید. چه می‌کنید؟",
  S(True, "Jeg kigger i spejlet og over højre skulder, før jeg svinger.", "I look in the mirror and over my right shoulder before I turn.", "پیش از پیچیدن در آینه و از روی شانه‌ی راست نگاه می‌کنم.",
    "Cyklisten kan være i din blinde vinkel.", "The cyclist may be in your blind spot.", "دوچرخه‌سوار ممکن است در نقطه‌ی کور شما باشد."),
  S(True, "Jeg lader cyklisten køre ligeud forbi, før jeg svinger.", "I let the cyclist ride straight on past before I turn.", "می‌گذارم دوچرخه‌سوار مستقیم رد شود، بعد می‌پیچم.",
    "Ved svingning til højre må du ikke være til ulempe for cyklister, der kører ligeud.", "When turning right you must not inconvenience cyclists going straight on.",
    "هنگام گردش به راست نباید مزاحم دوچرخه‌سوارانی شوید که مستقیم می‌روند."),
  S(False, "Cyklisten skal holde tilbage, fordi jeg blinker.", "The cyclist must give way because I am signalling.", "دوچرخه‌سوار باید راه بدهد، چون راهنما زده‌ام.",
    "Blinklyset giver ingen ret.", "The indicator gives no right.", "راهنما حقی نمی‌دهد."),
  S(False, "Jeg skynder mig at svinge, før cyklisten når frem.", "I hurry to turn before the cyclist gets there.", "عجله می‌کنم تا پیش از رسیدن دوچرخه‌سوار بپیچم.",
    "Det kan føre til en farlig ulykke i krydset.", "That can lead to a dangerous accident in the junction.", "این کار ممکن است به تصادف خطرناکی در تقاطع منجر شود."),
)

Q(5168, "7.13", above("""
THE SCENE: a town street seen from above. Along the right side runs a cycle path (separated by a kerb), and right of it a pavement. On
the right a private driveway crosses the pavement and the cycle path to a house.
VEHICLES AND PEOPLE (colour code used strictly): a RED car (ours) slowing down, its RIGHT indicator flashing, about to turn right into
the driveway across the cycle path and the pavement (a SOLID GREEN arrow). A cyclist on the cycle path comes from behind, going
straight on; a pedestrian walks on the pavement towards the driveway.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til højre ind i en indkørsel over cykelstien og fortovet. Hvad gælder?",
  "You want to turn right into a driveway across the cycle path and the pavement. What applies?",
  "می‌خواهید به راست وارد ورودی یک خانه شوید که از روی مسیر دوچرخه و پیاده‌رو می‌گذرد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for cyklisten på cykelstien.", "I give way to the cyclist on the cycle path.", "به دوچرخه‌سوار روی مسیر دوچرخه راه می‌دهم.",
    "Du må ikke svinge ind foran cyklisten, så den kommer i fare eller bliver generet.", "You must not turn in front of the cyclist so that they are put in danger or inconvenienced.",
    "نباید جلوی دوچرخه‌سوار بپیچید، طوری که به خطر بیفتد یا اذیت شود."),
  S(True, "Jeg holder tilbage for fodgængeren på fortovet.", "I give way to the pedestrian on the pavement.", "به عابر پیاده‌رو راه می‌دهم.",
    "Når du kører bort fra kørebanen, må du ikke være til fare for gående; over fortovet skal du holde tilbage for dem.",
    "When you leave the carriageway you must not endanger pedestrians; across the pavement you must give way to them.",
    "وقتی از سواره‌رو بیرون می‌روید، نباید عابران را به خطر بیندازید؛ روی پیاده‌رو باید به آن‌ها راه بدهید."),
  S(False, "Fodgængeren skal vente, fordi jeg blinker.", "The pedestrian must wait because I am signalling.", "عابر باید صبر کند، چون راهنما زده‌ام.",
    "Blinklyset giver dig ikke ret til at køre over fortovet foran fodgængeren.", "The indicator does not give you the right to cross the pavement in front of the pedestrian.",
    "راهنما به شما حق نمی‌دهد جلوی عابر از روی پیاده‌رو رد شوید."),
)

Q(5169, "7.13", view("""
THE SCENE: a town street; about 25 m ahead a side street goes off to the RIGHT. Our right indicator lamp glows on the dashboard strip.
Just ahead of us, at the right edge of our lane (no cycle path), a cyclist rides straight towards the junction, clearly going straight
on.
MUST BE CLEARLY VISIBLE: the cyclist just ahead at the right edge, the side street on the right.
MUST NOT APPEAR: signs, text.""", scenery="Scenery is reduced to simple flat house fronts, pavements and a few trees."),
  "Lige før krydset, hvor du skal svinge til højre, kører en cyklist foran dig i højre side. Hvordan forholder du dig?",
  "Just before the junction where you are going to turn right, a cyclist is riding in front of you on the right. What do you do?",
  "درست پیش از تقاطعی که باید به راست بپیچید، دوچرخه‌سواری جلوی شما در سمت راست می‌رود. چه می‌کنید؟",
  S(True, "Jeg bliver bag cyklisten og svinger, når den er kørt ligeud forbi sidevejen.", "I stay behind the cyclist and turn when they have gone straight past the side road.",
    "پشت دوچرخه‌سوار می‌مانم و وقتی از کنار فرعی مستقیم رد شد، می‌پیچم.",
    "Ved højresving må du ikke være til ulempe for cyklister, der kører ligeud.", "When turning right you must not inconvenience cyclists going straight on.",
    "هنگام گردش به راست نباید مزاحم دوچرخه‌سوارانی شوید که مستقیم می‌روند."),
  S(False, "Jeg overhaler cyklisten og svinger ind foran den.", "I overtake the cyclist and turn in front of them.", "از دوچرخه‌سوار سبقت می‌گیرم و جلویش می‌پیچم.",
    "Så kan cyklisten køre ind i siden af bilen.", "Then the cyclist may ride into the side of the car.", "این‌طور ممکن است دوچرخه‌سوار به پهلوی خودرو بخورد."),
  S(False, "Cyklisten skal holde tilbage, fordi bilen er større.", "The cyclist must give way because the car is bigger.", "دوچرخه‌سوار باید راه بدهد، چون خودرو بزرگ‌تر است.",
    "Størrelse giver ingen ret.", "Size gives no right.", "بزرگی حقی نمی‌دهد."),
)

Q(5170, "7.13", above("""
THE SCENE: a junction in town seen from above: our road has TWO lanes in our direction before the junction, separated by a broken
lane line; a side road goes off to the RIGHT.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane, its RIGHT indicator flashing, well before the junction (a SOLID
GREEN arrow shows its small right turn). A DASHED ORANGE arrow shows a wrong path: a right turn from the left lane across the right lane.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "Du skal svinge til højre i et kryds, hvor vejen har to vognbaner i din retning. Hvordan gør du?",
  "You are going to turn right at a junction where the road has two lanes in your direction. How do you do it?",
  "باید در تقاطعی بپیچید که جاده در جهت شما دو خط دارد و می‌خواهید به راست بروید. چه می‌کنید؟",
  S(True, "I god tid før krydset lægger jeg mig i vognbanen længst til højre.", "In good time before the junction I move into the lane furthest to the right.",
    "به موقع پیش از تقاطع به راست‌ترین خط می‌روم.",
    "I god tid før et kryds skal du lægge dig i vognbanen længst til højre, hvis du skal svinge til højre.",
    "In good time before a junction you must move into the lane furthest to the right if you are going to turn right.",
    "اگر می‌خواهید به راست بپیچید، باید به موقع پیش از تقاطع به راست‌ترین خط بروید."),
  S(True, "Jeg blinker i god tid.", "I signal in good time.", "به موقع راهنما می‌زنم.",
    "Tegn skal gives i god tid før svinget.", "Signals must be given in good time before the turn.", "علامت باید به موقع پیش از پیچ داده شود."),
  S(True, "Jeg sænker farten før svinget.", "I slow down before the turn.", "پیش از پیچیدن سرعتم را کم می‌کنم.",
    "Ved kryds skal hastigheden være passende lav.", "At junctions your speed must be suitably low.", "در تقاطع سرعت باید به اندازه‌ی کافی کم باشد."),
  S(False, "Jeg kan svinge til højre fra venstre vognbane, hvis der er plads.", "I can turn right from the left lane if there is room.", "اگر جا باشد، می‌توانم از خط چپ به راست بپیچم.",
    "Så skærer du ind foran trafikken i højre vognbane.", "Then you cut in front of the traffic in the right lane.", "این‌طور جلوی ترافیک خط راست می‌پیچید."),
)

Q(5171, "7.11", view("""
THE SCENE: we approach a junction where our road ends at a crossing road. On the right stands a red octagonal STOP sign, and a wide
white stop line lies across our lane. Tall hedges on both corners hide most of the crossing road, both to the left and to the right.
MUST BE CLEARLY VISIBLE: the stop sign, the stop line, the hedges hiding the crossing road.
MUST NOT APPEAR: vehicles on the crossing road, text other than the sign's own design."""),
  "Du kommer til en stoptavle, men hækkene skjuler udsynet til den tværgående vej. Hvordan forholder du dig?",
  "You come to a stop sign, but the hedges hide the view of the crossing road. What do you do?",
  "به تابلوی ایست می‌رسید، ولی پرچین‌ها دید جاده‌ی متقاطع را گرفته‌اند. چه می‌کنید؟",
  S(True, "Jeg standser helt ved stoplinjen.", "I stop completely at the stop line.", "کنار خط ایست کاملاً می‌ایستم.",
    "Ved stoptavlen skal du altid standse ved stoplinjen.", "At the stop sign you must always stop at the stop line.", "کنار تابلوی ایست همیشه باید پشت خط ایست بایستید."),
  S(True, "Kan jeg ikke se nok, kører jeg langsomt lidt frem og standser igen, hvor jeg kan se.", "If I cannot see enough, I edge forward slowly and stop again where I can see.",
    "اگر به اندازه‌ی کافی نبینم، آهسته کمی جلو می‌روم و جایی که می‌بینم دوباره می‌ایستم.",
    "Du har ubetinget vigepligt og må først køre ud, når du kan se, at det kan ske uden fare.", "You must give way unconditionally and may only drive out when you can see that it is safe.",
    "باید بی‌قیدوشرط راه بدهید و فقط وقتی می‌توانید وارد شوید که ببینید بی‌خطر است."),
  S(False, "Jeg standser kun, hvis der kommer trafik.", "I only stop if traffic is coming.", "فقط وقتی ترافیک بیاید می‌ایستم.",
    "Ved stoptavlen skal du altid standse.", "At the stop sign you must always stop.", "کنار تابلوی ایست همیشه باید بایستید."),
  S(False, "Jeg kører ud, når jeg ikke kan høre biler.", "I drive out when I cannot hear any cars.", "وقتی صدای خودرویی نمی‌شنوم، وارد می‌شوم.",
    "Du kan ikke høre alle trafikanter, fx cyklister og elbiler.", "You cannot hear all road users, for example cyclists and electric cars.", "صدای همه‌ی کاربران راه، مثلاً دوچرخه و خودروی برقی، را نمی‌شنوید."),
)

Q(5172, "7.11", town("""
THE SCENE: a residential street; about 30 m ahead a crossroads with no signs and no markings. On the right corner a high hedge hides the
side street to the right completely; the side street to the left can be seen a little.
MUST BE CLEARLY VISIBLE: the unmarked crossroads, the high hedge on the right corner.
MUST NOT APPEAR: vehicles, signs, text."""),
  "Du nærmer dig et kryds uden tavler og afmærkning. En høj hæk skjuler vejen til højre. Hvordan forholder du dig?",
  "You are approaching a junction with no signs or markings. A high hedge hides the road to the right. What do you do?",
  "به تقاطعی بدون تابلو و خط‌کشی نزدیک می‌شوید. پرچین بلندی جاده‌ی سمت راست را پنهان کرده است. چه می‌کنید؟",
  S(True, "Jeg sænker farten i god tid.", "I slow down in good time.", "به موقع سرعتم را کم می‌کنم.",
    "Ved vejkryds skal hastigheden være passende lav, især når oversigten er dårlig.", "At junctions your speed must be suitably low, especially when the view is poor.",
    "در تقاطع، به‌ویژه وقتی دید کم است، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Jeg skal holde tilbage for trafik fra højre.", "I must give way to traffic from the right.", "باید به ترافیک سمت راست راه بدهم.",
    "Uden tavler og afmærkning gælder højrereglen.", "Without signs or markings the right-hand rule applies.", "بدون تابلو و خط‌کشی، قاعده‌ی دست راست برقرار است."),
  S(True, "Jeg skal kunne standse, hvis der kommer nogen fra højre.", "I must be able to stop if someone comes from the right.", "اگر کسی از راست بیاید، باید بتوانم بایستم.",
    "Du kan først se trafikken fra højre, når du er helt fremme ved krydset.", "You can only see the traffic from the right when you are right up at the junction.",
    "ترافیک سمت راست را فقط وقتی می‌بینید که کاملاً به تقاطع رسیده باشید."),
  S(False, "Jeg kører igennem, fordi jeg ikke kan se nogen.", "I drive through because I cannot see anyone.", "رد می‌شوم، چون کسی را نمی‌بینم.",
    "Hækken kan skjule en, der kommer fra højre.", "The hedge may hide someone coming from the right.", "پرچین ممکن است کسی را که از راست می‌آید پنهان کند."),
)

Q(5173, "7.11", view("""
THE SCENE: a two-way road outside town. On the right verge stands a triangular warning sign (white with a red border, point up) showing
three black arrows chasing each other in a circle (the roundabout warning sign). About 200 m ahead the central island of a roundabout
can be seen.
MUST BE CLEARLY VISIBLE: the roundabout warning sign, the roundabout ahead.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Hvad betyder den, og hvordan forholder du dig?",
  "You pass this sign. What does it mean, and what do you do?",
  "از کنار این تابلو رد می‌شوید. یعنی چه و چه می‌کنید؟",
  S(True, "Der kommer en rundkørsel.", "A roundabout is coming.", "میدانی در پیش است.",
    "Tavlen (A 16) varsler en rundkørsel.", "The sign (A 16) warns of a roundabout.", "این تابلو (A 16) از میدان خبر می‌دهد."),
  S(True, "Jeg sænker farten i god tid.", "I slow down in good time.", "به موقع سرعتم را کم می‌کنم.",
    "Du skal kunne holde tilbage for dem, der er i rundkørslen, hvis det kræves.", "You must be able to give way to those in the roundabout if required.", "باید بتوانید در صورت لزوم به کسانی که در میدان‌اند راه بدهید."),
  S(False, "Tavlen betyder, at jeg har forkørselsret i rundkørslen.", "The sign means that I have the right of way in the roundabout.", "این تابلو یعنی در میدان حق تقدم با من است.",
    "Advarselstavlen siger ikke noget om vigepligt; det gør tavlerne ved indkørslen.", "The warning sign says nothing about giving way; the signs at the entry do.", "تابلوی هشدار چیزی درباره‌ی حق تقدم نمی‌گوید؛ تابلوهای ورودی می‌گویند."),
  S(False, "Tavlen betyder, at vejen ender.", "The sign means that the road ends.", "این تابلو یعنی جاده تمام می‌شود.",
    "Vejen fortsætter gennem rundkørslen.", "The road continues through the roundabout.", "جاده از میان میدان ادامه دارد."),
)

Q(5174, "7.11", town("""
THE SCENE: a junction in town with traffic lights that are switched off (all lamps dark). On our side of the junction a give-way sign (a
white triangle with a red border, point down) stands on the right, and white shark teeth lie across our lane. A car approaches on the
crossing road from the left.
MUST BE CLEARLY VISIBLE: the dark traffic lights, the give-way sign, the shark teeth, the car on the crossing road.
MUST NOT APPEAR: text."""),
  "Lyssignalerne i krydset er slukket. Ved din vej står en vigepligtstavle, og der er hajtænder. Hvad gælder?",
  "The traffic lights at the junction are switched off. At your road there is a give-way sign and shark teeth. What applies?",
  "چراغ‌های تقاطع خاموش‌اند. در راه شما تابلوی رعایت حق تقدم و دندان‌کوسه هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har ubetinget vigepligt efter tavlen og hajtænderne.", "I must give way unconditionally according to the sign and the shark teeth.",
    "طبق تابلو و دندان‌کوسه‌ها باید بی‌قیدوشرط راه بدهم.",
    "Når signalet ikke er i drift, gælder tavler og afmærkning.", "When the signal is not working, the signs and markings apply.", "وقتی چراغ کار نمی‌کند، تابلو و خط‌کشی معتبرند."),
  S(False, "Jeg har forkørselsret, fordi signalet er slukket.", "I have the right of way because the signal is switched off.", "حق تقدم با من است، چون چراغ خاموش است.",
    "Et slukket signal giver ingen forkørselsret.", "A switched-off signal gives no right of way.", "چراغ خاموش حق تقدم نمی‌دهد."),
  S(False, "Alle skal standse helt, som ved en stoptavle.", "Everyone must stop completely, as at a stop sign.", "همه باید کاملاً بایستند، مثل تابلوی ایست.",
    "Vigepligtstavlen kræver ikke fuldt stop, når vejen er fri.", "The give-way sign does not require a full stop when the road is clear.", "تابلوی رعایت حق تقدم، وقتی راه باز است، توقف کامل لازم ندارد."),
  S(True, "Jeg kører frem med særlig forsigtighed.", "I move forward with special care.", "با احتیاط ویژه جلو می‌روم.",
    "Andre kan være i tvivl om, hvad der gælder.", "Others may be unsure about what applies.", "ممکن است دیگران مطمئن نباشند چه قاعده‌ای برقرار است."),
)

Q(5175, "8.1", picture("""
The back seat of a car seen from the open rear door: a girl of about seven sits on a booster cushion with the car's three-point seat
belt across her shoulder and lap. The front seat is in front of her.
MUST BE CLEARLY VISIBLE: the booster cushion, the seat belt correctly over shoulder and lap.
MUST NOT APPEAR: brand names, text."""),
  "Du skal køre en kort tur med en 7-årig pige, der er 125 cm høj, på bagsædet. Hvad gælder?",
  "You are going on a short trip with a 7-year-old girl, 125 cm tall, on the back seat. What applies?",
  "قرار است با دختری ۷ ساله با قد ۱۲۵ سانتی‌متر که روی صندلی عقب نشسته، مسیر کوتاهی بروید. چه قاعده‌ای برقرار است؟",
  S(True, "Hun skal bruge godkendt sikkerhedsudstyr, der passer til hendes højde og vægt, fx en selepude med selen.",
    "She must use approved safety equipment that suits her height and weight, for example a booster cushion with the belt.",
    "باید از تجهیزات ایمنی تأییدشده‌ی متناسب با قد و وزنش استفاده کند، مثلاً تشک‌چه‌ی بالابر با کمربند.",
    "Børn under 135 cm skal under kørslen bruge godkendt sikkerhedsudstyr, der passer til barnets højde og vægt.",
    "Children under 135 cm must use approved safety equipment suited to their height and weight while driving.",
    "کودکان زیر ۱۳۵ سانتی‌متر در حین رانندگی باید از تجهیزات ایمنی تأییدشده‌ی متناسب با قد و وزنشان استفاده کنند."),
  S(True, "Det er mit ansvar som fører, at hun er spændt fast.", "It is my responsibility as the driver that she is buckled up.", "این مسئولیت من به‌عنوان راننده است که کمربندش بسته باشد.",
    "Føreren skal påse, at passagerer under 15 år bruger sikkerhedssele.", "The driver must see to it that passengers under 15 use seat belts.", "راننده باید مراقب باشد مسافران زیر ۱۵ سال کمربند ببندند."),
  S(True, "Hun skal være spændt fast, også på en kort tur.", "She must be buckled up, even on a short trip.", "حتی در مسیر کوتاه هم باید کمربندش بسته باشد.",
    "Selepligten gælder hele kørslen, uanset hvor kort den er.", "The duty to wear a belt applies to the whole trip, however short.", "وظیفه‌ی بستن کمربند در تمام مسیر است، هر قدر هم کوتاه باشد."),
  S(False, "Hun må sidde uden sele, når hun sidder på bagsædet.", "She may sit without a belt when she is on the back seat.", "وقتی روی صندلی عقب نشسته، می‌تواند بدون کمربند بنشیند.",
    "Selepligten gælder også på bagsædet.", "The duty to wear a belt applies on the back seat too.", "وظیفه‌ی بستن کمربند در صندلی عقب هم هست."),
)
