# «آزمون جدید», batch 4 (5301–5400), part d: lane changes (7.4), moving off and stopping (7.1), position (7.2), lights (7.19),
# the motorway (7.16), safe traffic (6.2), roundabouts (7.15), reversing (7.5), and one each of 5.2, 7.8, 4.5, 5.1, 3.2, 8.1,
# 10.3.
# Rules: Færdselsloven §§ 3 stk. 2 (særligt hensyn: children, school patrols, the elderly, people with poor sight or hearing),
# 9 (accident: stop, help, secure, name and address), 15 stk. 1 and 3, 16 stk. 1, 18 stk. 1–2, 26 stk. 6, 28 stk. 3 and 5,
# 32 stk. 1–2, 33, 35 stk. 1, 3 and 4 (parked in a built-up area: a car up to 6 m by 2 m only the position and rear light
# towards the middle of the road, not when towing), 41 stk. 1, 49 stk. 3 (cyclists turn left in two stages), 55 a; Lov nr.
# 567 af 27/05/2025 (17-year-olds alone between 5 and 20, a companion between 20 and 5 until 18; 0.2 per mille in the first
# 3 years); Bekendtgørelse om vejafmærkning (§ 5 variable signs, § 54 yellow temporary markings come before white ones,
# § 66 left-turning cyclists follow the signals for straight on, D 15, E 44 «Motorvej ophører», E 47 «Cykelgade»).
from nq import Q, S, above, picture, town, view

Q(5376, "7.4", above("""
THE SCENE: a road seen from above with TWO lanes in our direction and dense traffic in both; about 300 m ahead (at the top of the
picture) a side road goes off to the RIGHT.
VEHICLES (colour code used strictly): a RED car (ours) in the LEFT lane, its RIGHT indicator flashing; a SOLID GREEN arrow from it
moving over into a gap in the right lane early, far before the junction; a DASHED ORANGE arrow from it staying in the left lane until
just before the junction and then cutting into the right lane.
MUST NOT APPEAR: signs, text."""),
  "Du kører i venstre af to vognbaner og skal til højre i et kryds om ca. 300 m. Der er tæt trafik. Hvordan forholder du dig?",
  "You are driving in the left of two lanes and have to turn right at a junction in about 300 m. The traffic is dense. What do you do?",
  "در خط چپِ یک جاده‌ی دوخطه می‌رانید و باید حدود ۳۰۰ متر جلوتر در تقاطعی به راست بپیچید. ترافیک سنگین است. چه می‌کنید؟",
  S(True, "Jeg skifter i god tid over i højre vognbane, når det kan ske uden fare.", "I move over into the right lane in good time, when it can be done safely.",
    "به‌موقع، وقتی بی‌خطر باشد، به خط راست می‌روم.",
    "Skal du svinge til højre, skal du i god tid før krydset vælge den højre vognbane.",
    "If you are turning right, you must choose the right lane in good time before the junction.",
    "اگر می‌خواهید به راست بپیچید، باید به‌موقع پیش از تقاطع خط راست را انتخاب کنید."),
  S(False, "Jeg bliver i venstre vognbane til lige før krydset og skærer så ind foran bilerne i højre.",
    "I stay in the left lane until just before the junction and then cut in in front of the cars on the right.",
    "تا درست پیش از تقاطع در خط چپ می‌مانم و بعد جلوی خودروهای خط راست می‌پیچم.",
    "Et sent vognbaneskift i tæt trafik er farligt og til ulempe for de andre.", "A late lane change in dense traffic is dangerous and a nuisance to the others.",
    "تغییر خطِ دیرهنگام در ترافیک سنگین خطرناک است و برای دیگران مزاحمت ایجاد می‌کند."),
  S(False, "Jeg må svinge til højre fra venstre vognbane, hvis jeg giver tegn i god tid.", "I may turn right from the left lane if I signal in good time.",
    "اگر به‌موقع راهنما بزنم، می‌توانم از خط چپ به راست بپیچم.",
    "Så kører du ind foran dem i højre vognbane; højresving sker fra højre vognbane.",
    "Then you cut across those in the right lane; right turns are made from the right lane.",
    "این‌طور جلوی خودروهای خط راست می‌پیچید؛ گردش به راست از خط راست انجام می‌شود."),
)

Q(5377, "7.1", town("""
THE SCENE: we are parked at the right kerb of a town street directly behind a large parked lorry, whose back fills the right half of
the view; the street ahead beside the lorry can only partly be seen. In the left door mirror (at the left edge of the picture) the lane
behind us is empty.
MUST BE CLEARLY VISIBLE: the back of the parked lorry right in front of us, the partly hidden street ahead.
MUST NOT APPEAR: signs, text."""),
  "Du holder ved kantstenen lige bag en parkeret lastbil og vil køre ud. Lastbilen skjuler vejen foran. Hvordan forholder du dig?",
  "You are parked at the kerb right behind a parked lorry and want to pull out. The lorry hides the road ahead. What do you do?",
  "کنار جدول درست پشت یک کامیونِ پارک‌شده ایستاده‌اید و می‌خواهید حرکت کنید. کامیون جلوی دید جاده را گرفته است. چه می‌کنید؟",
  S(True, "Jeg ser i spejlet og over venstre skulder og giver tegn, før jeg kører ud.",
    "I look in the mirror and over my left shoulder and signal before I pull out.",
    "پیش از حرکت در آینه و از روی شانه‌ی چپ نگاه می‌کنم و راهنما می‌زنم.",
    "Du må kun køre ud fra kanten, når det kan ske uden fare eller ulempe for andre, og du skal give tegn.",
    "You may only pull out from the edge when it can be done without danger or inconvenience to others, and you must signal.",
    "فقط وقتی می‌توانید از کنار جاده حرکت کنید که برای دیگران خطر یا مزاحمتی نداشته باشد، و باید راهنما بزنید."),
  S(True, "Jeg kører langsomt frem, så jeg kan se forbi lastbilen, før jeg kører helt ud.",
    "I move forward slowly so that I can see past the lorry before I pull right out.",
    "آهسته جلو می‌روم تا پیش از بیرون رفتن کامل، کنار کامیون را ببینم.",
    "Lastbilen skjuler både modkørende og gående foran den.", "The lorry hides both oncoming traffic and pedestrians in front of it.",
    "کامیون هم ترافیک روبه‌رو و هم عابرانِ جلوی خودش را پنهان می‌کند."),
  S(True, "Jeg holder øje med gående, der kan komme frem foran lastbilen.", "I watch out for pedestrians who may come out in front of the lorry.",
    "مراقب عابرانی هستم که ممکن است از جلوی کامیون بیرون بیایند.",
    "Gående, der går over vejen foran lastbilen, kan ikke se dig, og du kan ikke se dem.",
    "Pedestrians crossing in front of the lorry cannot see you, and you cannot see them.",
    "عابرانی که از جلوی کامیون از عرض خیابان رد می‌شوند شما را نمی‌بینند و شما هم آن‌ها را نمی‌بینید."),
  S(False, "Når jeg blinker, skal trafikken bagfra lade mig komme ud.", "When I signal, the traffic from behind must let me out.",
    "وقتی راهنما بزنم، ترافیکِ پشت سر باید بگذارد بیرون بیایم.",
    "Blinklyset giver dig ingen ret; du skal vente, til der er plads.", "The indicator gives you no right; you must wait until there is room.",
    "راهنما حقی به شما نمی‌دهد؛ باید صبر کنید تا جا باز شود."),
)

Q(5378, "7.1", town("""
THE SCENE: a town street at night with weak street lights; we are parked at the right kerb with only our parking lights on and are
about to pull out. In the left door mirror (at the left edge of the picture) a cyclist without lights can just be seen coming along
the street behind us.
MUST BE CLEARLY VISIBLE: the dark street ahead, the unlit cyclist in the left door mirror.
MUST NOT APPEAR: signs, text.""", cond="night, dark, dry road, weak street lights"),
  "Det er mørkt. Du holder parkeret ved kantstenen og skal køre ud. Hvordan forholder du dig?",
  "It is dark. You are parked at the kerb and are about to pull out. What do you do?",
  "هوا تاریک است. کنار جدول پارک کرده‌اید و می‌خواهید حرکت کنید. چه می‌کنید؟",
  S(True, "Jeg tænder nærlyset, før jeg kører ud.", "I switch on the dipped beam before I pull out.", "پیش از حرکت نور پایین را روشن می‌کنم.",
    "I lygtetændingstiden skal du køre med nærlys, eller fjernlys hvor det er tilladt; positionslys alene er ikke nok.",
    "In lighting-up time you must drive with dipped beam, or high beam where it is allowed; position lights alone are not enough.",
    "در زمان روشن کردن چراغ‌ها باید با نور پایین، یا نور بالا در جای مجاز، برانید؛ چراغ کوچک به‌تنهایی کافی نیست."),
  S(False, "Det er nok med parkeringslyset, til jeg er kommet ud på vejen.", "The parking lights are enough until I have got out onto the road.",
    "تا وقتی وارد جاده نشده‌ام، چراغ پارک کافی است.",
    "Så snart du kører, skal nærlyset være tændt, så du kan se og blive set.", "As soon as you are driving, the dipped beam must be on, so that you can see and be seen.",
    "به محض این‌که حرکت می‌کنید، نور پایین باید روشن باشد تا ببینید و دیده شوید."),
  S(True, "Jeg holder ekstra godt øje med cyklister, der kan komme bagfra uden lys.",
    "I watch extra carefully for cyclists who may come from behind without lights.",
    "به‌خصوص مراقب دوچرخه‌سوارانی هستم که ممکن است بدون چراغ از پشت بیایند.",
    "I mørke er en cyklist uden lys svær at se i spejlet.", "In the dark a cyclist without lights is hard to see in the mirror.",
    "در تاریکی دوچرخه‌سوارِ بدون چراغ در آینه به‌سختی دیده می‌شود."),
  S(False, "Jeg blinker med fjernlyset for at vise de andre, at jeg vil køre ud.", "I flash my high beam to show the others that I want to pull out.",
    "با نور بالا چراغ می‌زنم تا به دیگران نشان دهم می‌خواهم حرکت کنم.",
    "Lyssignal må kun bruges for at advare om fare; at du vil køre ud, viser du med blinklyset.",
    "A light signal may only be used to warn of danger; you show that you want to pull out with the indicator.",
    "علامت نوری فقط برای هشدار خطر است؛ این‌که می‌خواهید حرکت کنید را با راهنما نشان می‌دهید."),
)

Q(5379, "7.1", town("""
THE SCENE: a town street with a cycle path between the carriageway and the pavement, separated from both by kerbs. We have stopped
at the edge of the carriageway beside the cycle path; the front-seat passenger reaches for the door handle. In the right door mirror
(at the right edge of the picture) a cyclist approaches on the cycle path from behind.
MUST BE CLEARLY VISIBLE: the cycle path beside our car, the cyclist in the right door mirror, the passenger's hand at the door.
MUST NOT APPEAR: signs, text."""),
  "Du standser for at lade en passager stige ud. Mellem kørebanen og fortovet er der en cykelsti. Hvordan forholder du dig?",
  "You stop to let a passenger out. Between the carriageway and the pavement there is a cycle path. What do you do?",
  "می‌ایستید تا مسافری پیاده شود. بین سواره‌رو و پیاده‌رو یک مسیر دوچرخه هست. چه می‌کنید؟",
  S(True, "Jeg standser på kørebanen tæt ved cykelstien, ikke på den.", "I stop on the carriageway close to the cycle path, not on it.",
    "روی سواره‌رو و نزدیک مسیر دوچرخه می‌ایستم، نه روی آن.",
    "Standsning på cykelsti er forbudt.", "Stopping on a cycle path is forbidden.", "توقف روی مسیر دوچرخه ممنوع است."),
  S(True, "Passageren skal se sig for efter cyklister, før døren åbnes.", "The passenger must look out for cyclists before the door is opened.",
    "مسافر باید پیش از باز کردن در، مراقب دوچرخه‌سواران باشد.",
    "Døre skal åbnes, så der ikke opstår fare eller unødig ulempe for andre.", "Doors must be opened so that there is no danger or undue inconvenience to others.",
    "درها باید طوری باز شوند که برای دیگران خطر یا مزاحمتی پیش نیاید."),
  S(False, "Jeg holder et øjeblik inde på cykelstien, så jeg ikke generer trafikken.", "I stop for a moment on the cycle path so that I do not hold up the traffic.",
    "لحظه‌ای روی مسیر دوچرخه می‌ایستم تا مزاحم ترافیک نشوم.",
    "Standsning på cykelsti er forbudt, også et øjeblik.", "Stopping on a cycle path is forbidden, also for a moment.",
    "توقف روی مسیر دوچرخه ممنوع است، حتی برای یک لحظه."),
  S(True, "Jeg ser selv i højre spejl, før passageren åbner døren.", "I look in the right mirror myself before the passenger opens the door.",
    "پیش از این‌که مسافر در را باز کند، خودم در آینه‌ی راست نگاه می‌کنم.",
    "Som fører har du også ansvar for, at afstigningen kan ske uden fare.", "As the driver you are also responsible for the getting out being done safely.",
    "شما به‌عنوان راننده هم مسئولید که پیاده شدن بی‌خطر انجام شود."),
)

Q(5380, "7.2", view("""
THE SCENE: a two-way country road in winter covered with packed snow, so that the centre line and the edge lines cannot be seen; low
snow banks along both edges; an oncoming car far ahead.
MUST BE CLEARLY VISIBLE: the snow-covered road without visible markings, the snow banks, the oncoming car.
MUST NOT APPEAR: signs, text.""", cond="winter, packed snow on the road, overcast"),
  "Sne dækker vejens afmærkning, så du ikke kan se midterlinjen og kantlinjerne. Hvordan placerer du bilen?",
  "Snow covers the road markings, so you cannot see the centre line or the edge lines. How do you position the car?",
  "برف خط‌کشی جاده را پوشانده و خط وسط و خط‌های کناری دیده نمی‌شوند. خودرو را کجای جاده قرار می‌دهید؟",
  S(True, "Jeg holder til højre og vurderer vejens bredde ud fra kanterne og de andre biler.",
    "I keep to the right and judge the width of the road from its edges and the other cars.",
    "سمت راست می‌مانم و پهنای جاده را از روی لبه‌ها و خودروهای دیگر تخمین می‌زنم.",
    "Reglen om at holde til højre gælder, selv om afmærkningen ikke kan ses.", "The rule to keep right applies even when the markings cannot be seen.",
    "قاعده‌ی سمت راست ماندن برقرار است، حتی وقتی خط‌کشی دیده نمی‌شود."),
  S(False, "Jeg kører midt på vejen, fordi jeg ikke kan se midterlinjen.", "I drive in the middle of the road because I cannot see the centre line.",
    "وسط جاده می‌رانم، چون خط وسط را نمی‌بینم.",
    "Så kan du komme for tæt på de modkørende.", "Then you may come too close to the oncoming traffic.", "این‌طور ممکن است بیش از حد به ترافیک روبه‌رو نزدیک شوید."),
  S(True, "Jeg sænker farten, fordi kantsten og rabat kan være skjult under sneen.",
    "I slow down because kerbs and verges may be hidden under the snow.",
    "سرعتم را کم می‌کنم، چون ممکن است جدول و شانه‌ی جاده زیر برف پنهان باشند.",
    "Farten skal passe til føret og til, hvor godt du kan se vejen.", "The speed must suit the road surface and how well you can see the road.",
    "سرعت باید با وضعیت سطح جاده و میزان دیدن جاده جور باشد."),
  S(False, "Når afmærkningen ikke kan ses, gælder reglen om at holde til højre ikke.",
    "When the markings cannot be seen, the rule to keep right does not apply.",
    "وقتی خط‌کشی دیده نمی‌شود، قاعده‌ی سمت راست ماندن برقرار نیست.",
    "Du skal altid holde til højre, også uden afmærkning.", "You must always keep right, also without markings.",
    "همیشه باید سمت راست بمانید، حتی بدون خط‌کشی."),
)

Q(5381, "7.2", town("""
THE SCENE: a wide one-way street in town with two lanes, both in our direction. In the middle of the carriageway ahead lies a small
raised traffic island; on the island stands a round blue sign with a white arrow pointing diagonally down to the LEFT (the Danish sign
for the required side of passing, D 15).
MUST BE CLEARLY VISIBLE: the traffic island, the blue sign with the arrow pointing down to the left.
MUST NOT APPEAR: other signs, text."""),
  "Midt på kørebanen ligger en helle med denne blå tavle. Pilen peger skråt ned mod venstre. Hvordan kører du?",
  "In the middle of the carriageway there is a traffic island with this blue sign. The arrow points diagonally down to the left. How do you drive?",
  "وسط سواره‌رو جزیره‌ای با این تابلوی آبی هست. فلش به‌صورت مورب رو به پایین و چپ است. چطور رانندگی می‌کنید؟",
  S(True, "Jeg kører forbi hellen i venstre side.", "I pass the island on its left side.", "از سمت چپِ جزیره رد می‌شوم.",
    "Tavlen påbyder passage i den side, pilen viser.", "The sign orders passing on the side the arrow shows.",
    "این تابلو عبور از سمتی را که فلش نشان می‌دهد الزامی می‌کند."),
  S(False, "Jeg skal altid holde til højre for en helle.", "I must always keep to the right of an island.", "همیشه باید از سمت راستِ جزیره رد شوم.",
    "Normalt holder du til højre for en helle, men her påbyder tavlen venstre side.",
    "Normally you keep to the right of an island, but here the sign orders the left side.",
    "معمولاً از سمت راست جزیره رد می‌شوید، ولی اینجا تابلو سمت چپ را الزامی کرده است."),
  S(False, "Jeg må selv vælge, hvilken side jeg kører forbi hellen.", "I may choose for myself which side of the island I pass.",
    "خودم می‌توانم انتخاب کنم از کدام طرف جزیره رد شوم.",
    "Tavlen er et påbud, og du skal følge pilen.", "The sign is an order, and you must follow the arrow.", "این تابلو الزامی است و باید از فلش پیروی کنید."),
)

Q(5382, "7.2", view("""
THE SCENE: a road at road works: yellow lane lines painted on the carriageway lead the traffic slightly to the left around a closed-off
work area on the right, marked with orange-and-white cones; the old white lines can still be seen running straight on under the yellow
ones.
MUST BE CLEARLY VISIBLE: the yellow lines leading round the work area, the old white lines running straight on.
MUST NOT APPEAR: signs, text, workers."""),
  "Ved et vejarbejde er der malet gule linjer på kørebanen. De gamle hvide linjer kan stadig ses. Hvad gælder?",
  "At road works yellow lines have been painted on the carriageway. The old white lines can still be seen. What applies?",
  "در محل کار جاده‌ای خط‌های زرد روی سواره‌رو کشیده شده و خط‌های سفید قبلی هم هنوز دیده می‌شوند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg følger de gule linjer.", "I follow the yellow lines.", "از خط‌های زرد پیروی می‌کنم.",
    "Gul afmærkning angiver midlertidig regulering, fx ved vejarbejde, og skal følges forud for hvid afmærkning.",
    "Yellow markings show temporary arrangements, for example at road works, and must be followed before white markings.",
    "خط‌کشی زرد تنظیمات موقت، مثلاً در کار جاده‌ای، را نشان می‌دهد و بر خط‌کشی سفید مقدم است."),
  S(False, "Jeg følger de hvide linjer, fordi det er dem, der er de faste.", "I follow the white lines because they are the permanent ones.",
    "از خط‌های سفید پیروی می‌کنم، چون آن‌ها دائمی‌اند.",
    "Den gule afmærkning går forud for den hvide.", "The yellow markings come before the white ones.", "خط‌کشی زرد بر خط‌کشی سفید مقدم است."),
  S(True, "Den gule afmærkning er midlertidig.", "The yellow markings are temporary.", "خط‌کشی زرد موقت است.",
    "Gule linjer på kørebanen bruges fx ved vejarbejde og omlægning af vejen.", "Yellow lines on the carriageway are used for example at road works and diversions.",
    "خط‌های زرد روی سواره‌رو مثلاً در کار جاده‌ای و تغییر مسیر جاده به کار می‌روند."),
  S(False, "Gule linjer gælder kun for lastbiler.", "Yellow lines only apply to lorries.", "خط‌های زرد فقط برای کامیون‌هاست.",
    "Afmærkningen gælder for alle kørende.", "The markings apply to all traffic.", "این خط‌کشی برای همه‌ی رانندگان است."),
)

Q(5383, "7.19", view("""
THE SCENE: a straight country road at night; ahead of us a car with its rear lights lit; our dipped beam lights the road up to it; the
oncoming lane is dark and empty as far as can be seen.
MUST BE CLEARLY VISIBLE: the car ahead with its rear lights, the empty oncoming lane.
MUST NOT APPEAR: signs, text.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt, og du vil overhale en bil på landevejen. Der kommer ingen imod dig. Hvilket lys bruger du?",
  "It is dark, and you want to overtake a car on a country road. Nothing is coming towards you. Which lights do you use?",
  "هوا تاریک است و می‌خواهید در جاده‌ی بیرون شهر از یک خودرو سبقت بگیرید. کسی از روبه‌رو نمی‌آید. از کدام نور استفاده می‌کنید؟",
  S(True, "Jeg kører med nærlys, mens jeg er bag bilen, så jeg ikke blænder føreren.",
    "I drive with dipped beam while I am behind the car, so that I do not dazzle the driver.",
    "تا وقتی پشت آن خودرو هستم با نور پایین می‌رانم تا راننده‌اش را خیره نکنم.",
    "Fjernlys må ikke bruges, når du kører bag et andet køretøj, så føreren kan blændes.",
    "High beam must not be used when you are driving behind another vehicle so that its driver may be dazzled.",
    "وقتی پشت وسیله‌ی دیگری هستید و ممکن است راننده‌اش خیره شود، نباید از نور بالا استفاده کنید."),
  S(True, "Når jeg er oppe på siden af bilen, kan jeg skifte til fjernlys.", "Once I am alongside the car, I can switch to high beam.",
    "وقتی کنار آن خودرو رسیدم، می‌توانم نور بالا را روشن کنم.",
    "Så blænder du ikke længere føreren gennem spejlene, og du kan se langt frem.",
    "Then you no longer dazzle the driver through the mirrors, and you can see far ahead.",
    "در این حالت دیگر راننده را از طریق آینه‌ها خیره نمی‌کنید و می‌توانید تا دوردست را ببینید."),
  S(False, "Jeg kører med fjernlys hele vejen, fordi der ikke kommer nogen imod mig.",
    "I drive with high beam all the way, because nothing is coming towards me.",
    "تمام مدت با نور بالا می‌رانم، چون کسی از روبه‌رو نمی‌آید.",
    "Bag bilen blænder fjernlyset føreren gennem spejlene.", "Behind the car, the high beam dazzles its driver through the mirrors.",
    "پشت آن خودرو، نور بالا راننده را از طریق آینه‌ها خیره می‌کند."),
  S(False, "Jeg slukker kort for lyset, så føreren kan se, at jeg vil forbi.", "I switch my lights off briefly so that the driver can see that I want to pass.",
    "چراغ‌ها را لحظه‌ای خاموش می‌کنم تا راننده ببیند می‌خواهم رد شوم.",
    "Det er farligt; i mørke skal du altid køre med lys.", "That is dangerous; in the dark you must always drive with lights.",
    "این کار خطرناک است؛ در تاریکی همیشه باید با چراغ برانید."),
)

Q(5384, "7.19", town("""
THE SCENE: a quiet residential street in town at night without street lights; a small car is parked at the right kerb; only its
position light and rear light on the side towards the middle of the road are lit.
MUST BE CLEARLY VISIBLE: the parked car with its lit position and rear light on the road side.
MUST NOT APPEAR: signs, text.""", cond="night, dark, no street lights"),
  "Det er mørkt, og du parkerer din personbil ved kantstenen på en villavej i byen uden gadelys. Hvad gælder om lyset?",
  "It is dark, and you park your car at the kerb in a residential street in town without street lights. What applies to the lights?",
  "هوا تاریک است و خودروی سواری‌تان را کنار جدولِ یک خیابان مسکونی در شهر که چراغ خیابان ندارد پارک می‌کنید. درباره‌ی چراغ‌ها چه قاعده‌ای برقرار است؟",
  S(True, "Det er nok, at positionslyset og baglygten i den side, der vender mod vejens midte, er tændt.",
    "It is enough for the position light and the rear light on the side facing the middle of the road to be on.",
    "کافی است چراغ کوچک و چراغ عقبِ سمتی که رو به وسط جاده است روشن باشند.",
    "I tættere bebygget område er det nok for en bil på højst 6 m i længden og 2 m i bredden, der holder langs vejkanten.",
    "In a built-up area that is enough for a car at most 6 m long and 2 m wide standing along the edge of the road.",
    "در محدوده‌ی شهری این برای خودرویی با حداکثر ۶ متر طول و ۲ متر عرض که کنار جاده ایستاده کافی است."),
  S(True, "Nærlyset må ikke være tændt, mens bilen holder parkeret.", "The dipped beam must not be on while the car is parked.",
    "تا وقتی خودرو پارک است، نور پایین نباید روشن باشد.",
    "Andre lygter end de påbudte må ikke være tændt, når bilen holder parkeret.", "Lights other than the required ones must not be on while the car is parked.",
    "وقتی خودرو پارک است، چراغ‌هایی غیر از چراغ‌های الزامی نباید روشن باشند."),
  S(False, "Havariblinket skal være tændt hele natten.", "The hazard lights must be on all night.", "چراغ خطر باید تمام شب روشن باشد.",
    "Ved almindelig parkering bruges parkeringslys, ikke havariblink.", "For ordinary parking, parking lights are used, not hazard lights.",
    "برای پارک معمولی از چراغ پارک استفاده می‌شود، نه چراغ خطر."),
  S(True, "Har bilen en trailer koblet på, gælder lempelsen ikke.", "If the car has a trailer hitched to it, the relaxation does not apply.",
    "اگر تریلری به خودرو وصل باشد، این تسهیل برقرار نیست.",
    "Undtagelsen gælder ikke, når bilen trækker et andet køretøj.", "The exception does not apply when the car is towing another vehicle.",
    "این استثنا وقتی خودرو وسیله‌ی دیگری را می‌کشد برقرار نیست."),
)

Q(5385, "7.19", view("""
THE SCENE: a country road at night in thick fog; the light from our high beam is thrown back by the fog as a bright white wall, so the
road can only be seen a few metres ahead.
MUST BE CLEARLY VISIBLE: the bright wall of fog lit by the high beam, the short stretch of road visible.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="night, thick fog, wet road"),
  "Det er mørkt, og du kører med fjernlys ind i tæt tåge. Hvordan forholder du dig?",
  "It is dark, and you drive with high beam into thick fog. What do you do?",
  "هوا تاریک است و با نور بالا وارد مه غلیظ می‌شوید. چه می‌کنید؟",
  S(True, "Jeg skifter til nærlys, fordi fjernlyset kastes tilbage af tågen og blænder mig.",
    "I switch to dipped beam, because the fog throws the high beam back and dazzles me.",
    "نور پایین را روشن می‌کنم، چون مه نور بالا را برمی‌گرداند و چشمم را می‌زند.",
    "I tåge giver fjernlyset en hvid væg af lys, så du ser mindre.", "In fog the high beam makes a white wall of light, so you see less.",
    "در مه، نور بالا دیواری سفید از نور می‌سازد و کمتر می‌بینید."),
  S(True, "Jeg sænker farten, så jeg kan standse på den strækning, jeg kan se.", "I slow down so that I can stop within the distance I can see.",
    "سرعتم را کم می‌کنم تا بتوانم در مسافتی که می‌بینم بایستم.",
    "Du skal kunne standse på den del af vejen, du har udsyn over.", "You must be able to stop on the part of the road you can see.",
    "باید بتوانید در بخشی از جاده که می‌بینید بایستید."),
  S(False, "Jeg beholder fjernlyset, fordi det lyser længst frem.", "I keep the high beam, because it lights furthest ahead.",
    "نور بالا را نگه می‌دارم، چون دورتر را روشن می‌کند.",
    "I tåge oplyser fjernlyset tågen i stedet for vejen.", "In fog the high beam lights up the fog instead of the road.",
    "در مه، نور بالا به‌جای جاده خودِ مه را روشن می‌کند."),
  S(False, "Jeg lægger mig tæt bag bilen foran og følger dens baglygter.", "I move up close behind the car in front and follow its rear lights.",
    "نزدیک پشت خودروی جلویی می‌روم و چراغ‌های عقبش را دنبال می‌کنم.",
    "Du skal holde så stor afstand, at du kan standse, hvis den bremser.", "You must keep such a distance that you can stop if it brakes.",
    "باید آن‌قدر فاصله بگیرید که اگر ترمز کرد، بتوانید بایستید."),
)

Q(5386, "7.16", view("""
THE SCENE: a motorway with two lanes in our direction ending ahead: further on, the road narrows into an ordinary two-way road with one
lane in each direction. On the right verge stands a blue rectangular sign with the white motorway symbol crossed by a red diagonal bar
(the Danish end-of-motorway sign, E 44).
MUST BE CLEARLY VISIBLE: the end-of-motorway sign, the road narrowing into an ordinary road.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Hvad gælder herefter?",
  "You pass this sign. What applies from here on?",
  "از کنار این تابلو می‌گذرید. از اینجا به بعد چه قاعده‌ای برقرار است؟",
  S(True, "Motorvejen ophører, og de særlige regler for motorvej gælder ikke længere.", "The motorway ends, and the special motorway rules no longer apply.",
    "آزادراه تمام می‌شود و قواعد ویژه‌ی آزادراه دیگر برقرار نیستند.",
    "Tavlen viser, at motorvejsstrækningen slutter.", "The sign shows that the motorway stretch ends.", "این تابلو پایان مسیر آزادراه را نشان می‌دهد."),
  S(True, "Der kan komme cyklister, knallerter og traktorer på vejen.", "Cyclists, mopeds and tractors may appear on the road.",
    "ممکن است دوچرخه‌سوار، موتور گازی و تراکتور در جاده باشند.",
    "De må ikke køre på motorvej, men de må godt køre på almindelige veje.", "They may not use the motorway, but they may use ordinary roads.",
    "آن‌ها اجازه‌ی رانندگی در آزادراه را ندارند، ولی در جاده‌های معمولی می‌توانند."),
  S(True, "Uden andre tavler gælder den generelle grænse på 80 km/t uden for byen.",
    "Without other signs the general limit of 80 km/h outside town applies.",
    "بدون تابلوهای دیگر، حد عمومی ۸۰ کیلومتر بر ساعتِ بیرون شهر برقرار است.",
    "Grænsen på 130 km/t gælder kun på motorvej.", "The 130 km/h limit only applies on the motorway.",
    "حد ۱۳۰ کیلومتر بر ساعت فقط در آزادراه برقرار است."),
  S(False, "Jeg må fortsætte med 130 km/t, til jeg kører forbi en ny hastighedstavle.",
    "I may carry on at 130 km/h until I pass a new speed sign.",
    "تا وقتی از کنار تابلوی سرعت جدیدی نگذشته‌ام، می‌توانم با ۱۳۰ ادامه دهم.",
    "Når motorvejen ophører, gælder den generelle grænse for den vej, du nu kører på.",
    "When the motorway ends, the general limit for the road you are now on applies.",
    "وقتی آزادراه تمام می‌شود، حد عمومیِ جاده‌ای که اکنون در آن هستید برقرار است."),
)

Q(5387, "7.16", view("""
THE SCENE: a motorway with three lanes in our direction under an overhead gantry with an electronic sign over each lane, each showing a
round speed-limit sign with a red ring and the number 90; light traffic, no queue in sight.
MUST BE CLEARLY VISIBLE: the gantry with the electronic 90 signs over the lanes.
MUST NOT APPEAR: other signs, other text."""),
  "Over motorvejen viser elektroniske tavler 90 km/t i en rød ring. Der er ingen kø at se. Hvad gælder?",
  "Above the motorway electronic signs show 90 km/h in a red ring. No queue can be seen. What applies?",
  "بالای آزادراه تابلوهای الکترونیکی عدد ۹۰ را داخل حلقه‌ی قرمز نشان می‌دهند. صفی دیده نمی‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Det er en hastighedsgrænse, som jeg skal overholde.", "It is a speed limit that I must keep to.", "این حد سرعتی است که باید رعایتش کنم.",
    "Elektroniske tavler med en hastighedsgrænse har samme betydning som faste tavler.",
    "Electronic signs showing a speed limit have the same meaning as fixed signs.",
    "تابلوهای الکترونیکیِ حد سرعت همان معنای تابلوهای ثابت را دارند."),
  S(False, "Elektroniske tavler er kun anbefalinger.", "Electronic signs are only recommendations.", "تابلوهای الکترونیکی فقط توصیه‌اند.",
    "En rød ring med et tal er en hastighedsgrænse, også på en elektronisk tavle.", "A red ring with a number is a speed limit, also on an electronic sign.",
    "حلقه‌ی قرمز با عدد یعنی حد سرعت، حتی روی تابلوی الکترونیکی."),
  S(False, "Grænsen gælder kun for lastbiler.", "The limit only applies to lorries.", "این حد فقط برای کامیون‌هاست.",
    "Uden undertavle gælder den for alle.", "Without a plate under it, it applies to everyone.", "بدون زیرتابلو برای همه برقرار است."),
  S(False, "Grænsen gælder kun, når jeg selv kan se en kø.", "The limit only applies when I can see a queue myself.",
    "این حد فقط وقتی برقرار است که خودم صفی ببینم.",
    "Grænsen kan være sat ned af en grund, du endnu ikke kan se, fx kø eller et uheld længere fremme.",
    "The limit may have been lowered for a reason you cannot see yet, for example a queue or an accident further ahead.",
    "ممکن است حد سرعت به دلیلی کم شده باشد که هنوز نمی‌بینید، مثلاً صف یا تصادف جلوتر."),
)

Q(5388, "6.2", town("""
THE SCENE: a residential street with one lane in each direction. On the right pavement two small children play with a ball close to
the kerb; further ahead an elderly man with a walking stick stands at the kerb, looking the other way, as if about to cross.
MUST BE CLEARLY VISIBLE: the children with the ball near the kerb, the elderly man at the kerb looking away.
MUST NOT APPEAR: signs, text."""),
  "Som trafikant kan du som regel regne med, at andre overholder færdselsreglerne. Hvornår skal du være særligt varsom med at regne med det?",
  "As a road user you can usually count on others keeping the traffic rules. When must you be particularly careful about counting on that?",
  "به‌عنوان کاربر راه معمولاً می‌توانید روی این حساب کنید که دیگران قوانین رانندگی را رعایت می‌کنند. چه وقت باید در این حساب کردن به‌ویژه محتاط باشید؟",
  S(True, "Når der er børn på eller ved vejen.", "When there are children on or beside the road.", "وقتی کودکان روی جاده یا کنار آن هستند.",
    "Børn kan ikke overskue trafikken, og der skal vises særligt hensyn over for dem.",
    "Children cannot take in the traffic, and particular consideration must be shown to them.",
    "کودکان نمی‌توانند ترافیک را درست درک کنند و باید ملاحظه‌ی ویژه‌ای نسبت به آن‌ها داشت."),
  S(True, "Når en ældre person ser ud til ikke at have set mig.", "When an elderly person seems not to have seen me.",
    "وقتی به نظر می‌رسد فردی سالمند مرا ندیده است.",
    "Der skal vises særligt hensyn over for ældre og over for personer, der ser eller hører dårligt.",
    "Particular consideration must be shown to elderly people and to people who see or hear poorly.",
    "باید نسبت به سالمندان و کسانی که بینایی یا شنوایی ضعیفی دارند ملاحظه‌ی ویژه داشت."),
  S(False, "Aldrig; jeg må altid regne med, at alle overholder reglerne.", "Never; I may always count on everyone keeping the rules.",
    "هیچ‌وقت؛ همیشه می‌توانم روی این حساب کنم که همه قوانین را رعایت می‌کنند.",
    "Du skal tage højde for, at andre kan begå fejl, især børn og ældre.", "You must allow for others making mistakes, especially children and the elderly.",
    "باید در نظر بگیرید که دیگران، به‌ویژه کودکان و سالمندان، ممکن است اشتباه کنند."),
  S(False, "Kun når jeg kører på motorvej.", "Only when I am driving on the motorway.", "فقط وقتی در آزادراه رانندگی می‌کنم.",
    "Det gælder overalt, og især hvor der færdes børn, ældre og andre sårbare trafikanter.",
    "It applies everywhere, especially where children, elderly people and other vulnerable road users are about.",
    "این همه‌جا برقرار است، به‌ویژه جایی که کودکان، سالمندان و دیگر کاربران آسیب‌پذیر راه حضور دارند."),
)

Q(5389, "6.2", view("""
THE SCENE: a country road; a little ahead two cars have collided at the right edge of the road, their hazard lights flashing; one car
is damaged at the front; a person sits on the verge holding his arm.
MUST BE CLEARLY VISIBLE: the two damaged cars with hazard lights, the person on the verge.
MUST NOT APPEAR: blood, text, signs."""),
  "Du har været involveret i et færdselsuheld, hvor en person er kommet til skade. Hvad skal du gøre?",
  "You have been involved in a traffic accident in which a person has been injured. What must you do?",
  "در یک تصادف رانندگی دخیل بوده‌اید که در آن کسی آسیب دیده است. چه باید بکنید؟",
  S(True, "Jeg standser straks.", "I stop at once.", "فوراً می‌ایستم.",
    "Den, der er involveret i et færdselsuheld, skal straks standse, uanset hvem der har skylden.",
    "Anyone involved in a traffic accident must stop at once, whoever is to blame.",
    "هر کس در تصادف رانندگی دخیل است، صرف‌نظر از مقصر بودن، باید فوراً بایستد."),
  S(True, "Jeg hjælper den tilskadekomne, så godt jeg kan, og ringer 1-1-2, hvis der er brug for det.",
    "I help the injured person as well as I can and call 1-1-2 if it is needed.",
    "تا جایی که می‌توانم به فرد آسیب‌دیده کمک می‌کنم و در صورت نیاز با ۱۱۲ تماس می‌گیرم.",
    "Du skal i muligt omfang hjælpe personer, der er kommet til skade.", "You must help people who have been injured as far as you can.",
    "باید تا حد امکان به افرادی که آسیب دیده‌اند کمک کنید."),
  S(True, "Jeg er med til at sikre uheldsstedet, så der ikke sker flere uheld.",
    "I help to secure the accident site so that no further accidents happen.",
    "در ایمن کردن محل تصادف کمک می‌کنم تا تصادف دیگری رخ ندهد.",
    "Du skal deltage i de foranstaltninger til færdslens sikring, som uheldet kræver.",
    "You must take part in the measures to make the traffic safe that the accident requires.",
    "باید در اقداماتی که تصادف برای ایمن کردن ترافیک لازم دارد شرکت کنید."),
  S(True, "Jeg oplyser mit navn og min adresse, hvis en anden part beder om det.", "I give my name and address if another party asks for it.",
    "اگر طرف دیگرِ تصادف بخواهد، نام و نشانی‌ام را به او می‌دهم.",
    "Du skal opgive navn og adresse til andre, der er involveret i uheldet, hvis de beder om det.",
    "You must give your name and address to others involved in the accident if they ask for it.",
    "اگر دیگرانِ دخیل در تصادف بخواهند، باید نام و نشانی‌تان را بدهید."),
)

Q(5390, "7.15", above("""
THE SCENE: a single-lane roundabout seen from above with a round grass central island; outside the carriageway, separated from it by a
grass strip, a cycle path runs all the way round and crosses each exit road a few metres from the roundabout; there are no shark teeth
or other markings on the cycle-path crossings.
VEHICLES AND PEOPLE (colour code used strictly): a RED car (ours) about to leave by the exit on the right, its right indicator
flashing; a cyclist on the cycle path, going on round, about to cross the same exit.
MUST NOT APPEAR: signs, text."""),
  "Rundt om rundkørslen er der en cykelsti for sig, som krydser udkørslerne. Der er ingen hajtænder eller anden afmærkning på cykelstien. Du vil køre ud af rundkørslen. Hvad gælder?",
  "Round the roundabout there is a separate cycle path that crosses the exits. There are no shark teeth or other markings on the cycle path. You want to leave the roundabout. What applies?",
  "دور میدان یک مسیر دوچرخه‌ی جداگانه هست که از روی خروجی‌ها می‌گذرد. روی مسیر دوچرخه دندان‌کوسه یا خط‌کشی دیگری نیست. می‌خواهید از میدان خارج شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for cyklisten på cykelstien, der skal videre rundt.", "I give way to the cyclist on the cycle path who is going on round.",
    "به دوچرخه‌سوارِ مسیر دوچرخه که دور میدان ادامه می‌دهد راه می‌دهم.",
    "Når du svinger til højre over en cykelsti, må du ikke være til ulempe for cyklister, der kører ligeud ad den.",
    "When you turn right across a cycle path, you must not inconvenience cyclists going straight on along it.",
    "وقتی به راست می‌پیچید و از روی مسیر دوچرخه می‌گذرید، نباید برای دوچرخه‌سوارانی که مستقیم در آن می‌روند مزاحمت ایجاد کنید."),
  S(True, "Jeg giver tegn til højre, inden jeg forlader rundkørslen.", "I signal right before I leave the roundabout.", "پیش از ترک میدان راهنمای راست می‌زنم.",
    "Du skal give tegn, før du svinger ud af rundkørslen.", "You must signal before you turn out of the roundabout.",
    "پیش از خروج از میدان باید راهنما بزنید."),
  S(False, "Cyklisterne skal holde tilbage, fordi jeg kommer ud fra rundkørslen.", "The cyclists must give way because I am coming out of the roundabout.",
    "دوچرخه‌سواران باید راه بدهند، چون من از میدان بیرون می‌آیم.",
    "Uden afmærkning har du vigepligt over for cyklister, der kører ligeud på cykelstien.",
    "Without markings you must give way to cyclists going straight on along the cycle path.",
    "بدون خط‌کشی، شما باید به دوچرخه‌سوارانی که در مسیر دوچرخه مستقیم می‌روند راه بدهید."),
  S(False, "Når jeg blinker, kan jeg regne med, at cyklisten har set mig.", "When I signal, I can count on the cyclist having seen me.",
    "وقتی راهنما می‌زنم، می‌توانم مطمئن باشم دوچرخه‌سوار مرا دیده است.",
    "Cyklisten kan have overset dig; du skal selv sikre dig, at du kan svinge uden fare.",
    "The cyclist may have overlooked you; you must make sure yourself that you can turn safely.",
    "ممکن است دوچرخه‌سوار شما را ندیده باشد؛ خودتان باید مطمئن شوید بی‌خطر می‌پیچید."),
)

Q(5391, "7.15", view("""
THE SCENE: the entry to a single-lane roundabout with a round grass central island; we wait at the white shark teeth across our lane.
In the roundabout a car comes from the left with its right indicator flashing; it is still before the exit just to the left of our
entry, so it is not yet clear whether it will leave there.
MUST BE CLEARLY VISIBLE: the car in the roundabout with its right indicator flashing, the exit just left of our entry.
MUST NOT APPEAR: signs, text."""),
  "Du venter ved hajtænderne ved indkørslen til rundkørslen. En bil kommer i rundkørslen fra venstre og blinker til højre. Hvordan forholder du dig?",
  "You are waiting at the shark teeth at the entry to the roundabout. A car is coming round from the left with its right indicator flashing. What do you do?",
  "پشت دندان‌کوسه‌های ورودی میدان منتظرید. خودرویی در میدان از چپ می‌آید و راهنمای راست زده است. چه می‌کنید؟",
  S(True, "Jeg venter, til jeg er sikker på, at bilen kører ud af rundkørslen.", "I wait until I am sure that the car is leaving the roundabout.",
    "صبر می‌کنم تا مطمئن شوم آن خودرو از میدان خارج می‌شود.",
    "Bilen kan blinke for tidligt eller have glemt at slå blinklyset fra.", "The car may be signalling too early or have forgotten to switch the indicator off.",
    "ممکن است آن خودرو زودتر از موقع راهنما زده یا فراموش کرده باشد راهنما را خاموش کند."),
  S(False, "Jeg kører ind med det samme, fordi bilen skal ud før min indkørsel.", "I drive in at once, because the car is leaving before my entry.",
    "فوراً وارد می‌شوم، چون آن خودرو پیش از ورودی من خارج می‌شود.",
    "Det ved du først, når den faktisk svinger ud.", "You only know that once it actually turns out.", "این را فقط وقتی می‌دانید که واقعاً خارج شود."),
  S(False, "Blinklyset betyder, at bilen giver mig lov til at køre ind.", "The indicator means that the car is letting me drive in.",
    "راهنما یعنی آن خودرو به من اجازه‌ی ورود می‌دهد.",
    "Blinklyset viser kun, hvad føreren vil; du har stadig vigepligt.", "The indicator only shows what the driver intends; you still have to give way.",
    "راهنما فقط نشان می‌دهد راننده چه می‌خواهد؛ شما همچنان باید راه بدهید."),
)

Q(5392, "7.5", above("""
THE SCENE: a house driveway seen from above, leading off a street across a pavement. VEHICLES AND PEOPLE (colour code used strictly):
a RED car (ours) pulling a small trailer reverses from the street into the driveway, the trailer first; a person stands at the side of
the driveway where the driver can see him, guiding with his hands; a pedestrian approaches on the pavement towards the driveway.
MUST NOT APPEAR: signs, text."""),
  "Du skal bakke ind i en indkørsel med en trailer. Hvordan forholder du dig?",
  "You have to reverse into a driveway with a trailer. What do you do?",
  "باید با تریلر دنده‌عقب وارد یک ورودیِ خانه شوید. چه می‌کنید؟",
  S(True, "Jeg bakker i meget lav fart, så jeg kan standse med det samme.", "I reverse at a very low speed so that I can stop at once.",
    "با سرعت خیلی کم دنده‌عقب می‌روم تا بتوانم فوراً بایستم.",
    "Baglænskørsel må kun ske, når det kan ske uden fare eller ulempe for andre.",
    "Reversing may only be done when it can be done without danger or inconvenience to others.",
    "دنده‌عقب فقط وقتی مجاز است که برای دیگران خطر یا مزاحمتی نداشته باشد."),
  S(True, "Jeg får en person til at hjælpe mig, hvis jeg ikke kan se, hvad der er bag traileren.",
    "I get someone to help me if I cannot see what is behind the trailer.",
    "اگر نتوانم پشت تریلر را ببینم، از کسی کمک می‌گیرم.",
    "Traileren skjuler meget af udsynet bagud.", "The trailer hides much of the view to the rear.", "تریلر بخش زیادی از دید عقب را می‌پوشاند."),
  S(False, "Traileren svinger samme vej, som jeg drejer rattet.", "The trailer swings the same way as I turn the steering wheel.",
    "تریلر به همان سمتی می‌چرخد که فرمان را می‌چرخانم.",
    "Når du bakker, svinger traileren den modsatte vej af den, du drejer rattet.", "When you reverse, the trailer swings the opposite way to the way you turn the wheel.",
    "هنگام دنده‌عقب، تریلر برخلاف جهتی که فرمان را می‌چرخانید می‌چرخد."),
  S(True, "Jeg sikrer mig, at der ikke er gående eller cyklister på fortovet bag traileren.",
    "I make sure that there are no pedestrians or cyclists on the pavement behind the trailer.",
    "مطمئن می‌شوم پشت تریلر روی پیاده‌رو عابر یا دوچرخه‌سواری نیست.",
    "Du krydser fortovet, og gående kan være skjult bag traileren.", "You cross the pavement, and pedestrians may be hidden behind the trailer.",
    "از روی پیاده‌رو می‌گذرید و ممکن است عابران پشت تریلر پنهان باشند."),
)

Q(5393, "7.5", view("""
THE SCENE: a busy two-way road outside town; we have just driven past a driveway on the right, which can be seen behind us in the right
door mirror (at the right edge of the picture); several cars follow close behind us.
MUST BE CLEARLY VISIBLE: the driveway in the right door mirror, the cars following behind.
MUST NOT APPEAR: signs, text."""),
  "Du har kørt forbi den indkørsel, du skulle ind ad, på en befærdet vej. Hvad gør du?",
  "On a busy road you have driven past the driveway you wanted to turn into. What do you do?",
  "در یک جاده‌ی شلوغ از ورودی‌ای که باید واردش می‌شدید رد شده‌اید. چه می‌کنید؟",
  S(True, "Jeg kører videre og vender et sted, hvor det kan ske uden fare.", "I drive on and turn round at a place where it can be done safely.",
    "ادامه می‌دهم و جایی دور می‌زنم که بی‌خطر باشد.",
    "Baglænskørsel og vending må kun ske, hvor det kan ske uden fare eller ulempe for andre.",
    "Reversing and turning round may only be done where it can be done without danger or inconvenience to others.",
    "دنده‌عقب و دور زدن فقط جایی مجاز است که برای دیگران خطر یا مزاحمتی نداشته باشد."),
  S(False, "Jeg bakker tilbage langs vejkanten med havariblinket tændt.", "I reverse back along the edge of the road with the hazard lights on.",
    "با چراغ خطرِ روشن، کنار جاده دنده‌عقب برمی‌گردم.",
    "Baglænskørsel på en befærdet vej er farlig, og havariblinket gør den ikke sikker.",
    "Reversing on a busy road is dangerous, and the hazard lights do not make it safe.",
    "دنده‌عقب در جاده‌ی شلوغ خطرناک است و چراغ خطر آن را ایمن نمی‌کند."),
  S(False, "Jeg bakker hurtigt, så jeg ikke er længe i vejen.", "I reverse quickly so that I am not in the way for long.",
    "سریع دنده‌عقب می‌روم تا مدت زیادی سر راه نباشم.",
    "Hurtig baglænskørsel giver dig endnu mindre kontrol og tid til at reagere.", "Fast reversing gives you even less control and time to react.",
    "دنده‌عقبِ سریع کنترل و فرصت واکنش شما را باز هم کمتر می‌کند."),
  S(False, "Bakning er tilladt, når jeg viser det med blinklyset.", "Reversing is allowed when I show it with the indicator.",
    "اگر با راهنما نشانش دهم، دنده‌عقب مجاز است.",
    "Der er ingen pligt til at give tegn, når du bakker, og et blinklys gør ikke bakningen tilladt; den må kun ske, når det kan ske uden fare.",
    "There is no duty to signal when reversing, and an indicator does not make reversing allowed; it may only be done when it can be done safely.",
    "هنگام دنده‌عقب الزامی به راهنما زدن نیست و راهنما هم دنده‌عقب را مجاز نمی‌کند؛ فقط وقتی مجاز است که بی‌خطر باشد."),
)

Q(5394, "5.2", view("""
THE SCENE: a country road as a light rain begins after a long dry spell; the asphalt is just becoming wet with a faint shiny film;
the verges are dry and dusty.
MUST BE CLEARLY VISIBLE: the asphalt just becoming wet with a shiny film, the first raindrops.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="light rain beginning, road just getting wet, overcast"),
  "Det har været tørt i flere uger. Nu begynder det at regne. Hvad skal du være opmærksom på?",
  "It has been dry for several weeks. Now it starts to rain. What must you be aware of?",
  "چند هفته هوا خشک بوده و حالا باران شروع شده است. به چه چیزی باید توجه کنید؟",
  S(True, "Vejen kan være særligt glat i starten, fordi støv, gummi og olie blandes med vandet.",
    "The road may be particularly slippery at first, because dust, rubber and oil mix with the water.",
    "ممکن است جاده در ابتدا به‌ویژه لغزنده باشد، چون گرد و خاک، ذرات لاستیک و روغن با آب مخلوط می‌شوند.",
    "Den første regn efter en tør periode giver en glat hinde på asfalten.", "The first rain after a dry spell leaves a slippery film on the asphalt.",
    "اولین باران پس از یک دوره‌ی خشک لایه‌ای لغزنده روی آسفالت می‌سازد."),
  S(False, "Vejen er mindre glat end normalt, fordi den har været tør længe.", "The road is less slippery than usual because it has been dry for a long time.",
    "جاده کمتر از معمول لغزنده است، چون مدت زیادی خشک بوده.",
    "Det er omvendt: snavset på vejen gør den ekstra glat.", "It is the other way round: the dirt on the road makes it extra slippery.",
    "برعکس است: آلودگی روی جاده آن را لغزنده‌تر می‌کند."),
  S(False, "Vejen kan kun blive glat, når det fryser.", "The road can only become slippery when it freezes.", "جاده فقط وقتی یخ ببندد لغزنده می‌شود.",
    "Også regn kan gøre vejen glat, især lige efter en tør periode.", "Rain can also make the road slippery, especially just after a dry spell.",
    "باران هم می‌تواند جاده را لغزنده کند، به‌ویژه درست پس از یک دوره‌ی خشک."),
  S(False, "Regnen har ingen betydning for bremselængden.", "The rain makes no difference to the braking distance.",
    "باران تأثیری روی مسافت ترمز ندارد.",
    "På våd vej bliver bremselængden længere.", "On a wet road the braking distance becomes longer.", "در جاده‌ی خیس مسافت ترمز بیشتر می‌شود."),
)

Q(5395, "7.8", view("""
THE SCENE: a straight, dry two-lane country road; we drive behind a grey car at a moderate distance; on the right verge a round
speed-limit sign with a red ring and the number 80.
MUST BE CLEARLY VISIBLE: the car ahead, the distance to it, the 80 sign.
MUST NOT APPEAR: other signs, text."""),
  "Du kører 80 km/t bag en anden bil på landevejen. Hvad gælder?",
  "You are driving at 80 km/h behind another car on a country road. What applies?",
  "در جاده‌ی بیرون شهر با سرعت ۸۰ کیلومتر بر ساعت پشت خودروی دیگری می‌رانید. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen kører omkring 22 m i sekundet.", "The car travels about 22 m a second.", "خودرو در هر ثانیه حدود ۲۲ متر جلو می‌رود.",
    "80 km/t svarer til godt 22 m i sekundet.", "80 km/h is just over 22 m a second.", "۸۰ کیلومتر بر ساعت کمی بیش از ۲۲ متر در ثانیه است."),
  S(True, "Bremser bilen foran, kører jeg omkring 22 m, før jeg når at reagere, hvis min reaktionstid er 1 sekund.",
    "If the car in front brakes, I travel about 22 m before I manage to react, if my reaction time is 1 second.",
    "اگر خودروی جلو ترمز کند و زمان واکنش من ۱ ثانیه باشد، پیش از واکنش حدود ۲۲ متر جلو می‌روم.",
    "I reaktionstiden kører bilen videre med uændret fart.", "During the reaction time the car carries on at the same speed.",
    "در زمان واکنش، خودرو با همان سرعت به راهش ادامه می‌دهد."),
  S(False, "Ved 80 km/t er 10 m afstand nok, hvis jeg er opmærksom.", "At 80 km/h a distance of 10 m is enough if I am attentive.",
    "در سرعت ۸۰، ده متر فاصله کافی است اگر حواسم جمع باشد.",
    "10 m kører du på under et halvt sekund; det er ikke nok til at nå at reagere.",
    "You cover 10 m in less than half a second; that is not enough to react in time.",
    "ده متر را در کمتر از نیم ثانیه طی می‌کنید؛ این برای واکنش به‌موقع کافی نیست."),
  S(True, "Afstanden skal være så stor, at jeg kan standse, hvis bilen foran bremser hårdt.",
    "The distance must be so large that I can stop if the car in front brakes hard.",
    "فاصله باید آن‌قدر باشد که اگر خودروی جلو ترمز شدید کرد، بتوانم بایستم.",
    "Du skal holde så stor afstand, at du ikke kører ind i den forankørende, hvis den standser.",
    "You must keep such a distance that you do not run into the one in front if it stops.",
    "باید آن‌قدر فاصله بگیرید که اگر وسیله‌ی جلو ایستاد، به آن نزنید."),
)

Q(5396, "4.5", above("""
THE SCENE: a crossroads with traffic lights seen from above, one lane in each direction on both roads.
VEHICLES AND PEOPLE (colour code used strictly): a cyclist who is going to turn left has ridden straight across the junction along
the right edge and now waits at the far right corner, turned to the left, ready to cross with the traffic from the right when it
gets green; a DASHED BLUE line shows his path: first straight across, then left across. A RED car (ours) behind, coming up from the
bottom, going straight on.
MUST NOT APPEAR: signs, text."""),
  "En cyklist foran dig skal til venstre i krydset. Hvordan må du forvente, at cyklisten kører?",
  "A cyclist in front of you is going left at the junction. How should you expect the cyclist to ride?",
  "دوچرخه‌سواری جلوی شما می‌خواهد در تقاطع به چپ برود. باید انتظار داشته باشید چطور حرکت کند؟",
  S(True, "Cyklisten holder til højre og kører ligeud over krydset til det modsatte hjørne.",
    "The cyclist keeps right and rides straight across the junction to the opposite corner.",
    "دوچرخه‌سوار سمت راست می‌ماند و مستقیم از تقاطع تا گوشه‌ی مقابل می‌رود.",
    "En cyklist, der vil svinge til venstre, skal fortsætte gennem krydset til dets modsatte side.",
    "A cyclist who wants to turn left must carry on through the junction to its opposite side.",
    "دوچرخه‌سواری که می‌خواهد به چپ بپیچد باید از تقاطع تا طرف مقابل آن ادامه دهد."),
  S(True, "Cyklisten venter på hjørnet og kører først videre til venstre, når det kan ske uden ulempe for den øvrige trafik.",
    "The cyclist waits at the corner and only carries on to the left when it can be done without inconvenience to other traffic.",
    "دوچرخه‌سوار در گوشه منتظر می‌ماند و فقط وقتی به چپ ادامه می‌دهد که برای بقیه‌ی ترافیک مزاحمتی نداشته باشد.",
    "Cyklisten må først svinge, når det kan ske uden ulempe for den øvrige færdsel.",
    "The cyclist may only turn when it can be done without inconvenience to the other traffic.",
    "دوچرخه‌سوار فقط وقتی می‌تواند بپیچد که برای بقیه‌ی ترافیک مزاحمتی نداشته باشد."),
  S(False, "Cyklisten trækker ud midt på vejen og svinger til venstre ligesom en bil.",
    "The cyclist pulls out into the middle of the road and turns left like a car.",
    "دوچرخه‌سوار به وسط جاده می‌رود و مثل خودرو به چپ می‌پیچد.",
    "Medmindre afmærkningen viser andet for cyklister, skal de svinge til venstre i to tempi.",
    "Unless the markings show otherwise for cyclists, they must turn left in two stages.",
    "مگر این‌که خط‌کشی برای دوچرخه‌سواران چیز دیگری نشان دهد، آن‌ها باید در دو مرحله به چپ بپیچند."),
  S(True, "I et lyskryds følger cyklisten signalet for ligeud, når han kører over til det modsatte hjørne.",
    "At a junction with traffic lights the cyclist follows the signal for straight on when he rides across to the opposite corner.",
    "در تقاطع چراغ‌دار، دوچرخه‌سوار وقتی به گوشه‌ی مقابل می‌رود از چراغ مستقیم پیروی می‌کند.",
    "Venstresvingende cyklister skal rette sig efter de signaler, der gælder for kørsel ligeud.",
    "Cyclists turning left must follow the signals that apply to going straight on.",
    "دوچرخه‌سوارانی که به چپ می‌پیچند باید از چراغ‌های مربوط به حرکت مستقیم پیروی کنند."),
)

Q(5397, "5.1", town("""
THE SCENE: a residential street; at its entrance on the right stands the blue rectangular Danish cycle-street sign (E 47) in its
official design, with a blue plate under it showing a white car symbol (cars allowed). Several cyclists ride in the middle of the
street; marked parking spaces at the side of the street.
MUST BE CLEARLY VISIBLE: the cycle-street sign with its plate, the cyclists, the marked parking spaces.
MUST NOT APPEAR: other signs, text."""),
  "Du kører ind på en gade med denne tavle. Undertavlen tillader kørsel med bil. Hvad gælder?",
  "You turn into a street with this sign. The plate under it allows cars. What applies?",
  "وارد خیابانی با این تابلو می‌شوید. زیرتابلو رانندگی با خودرو را مجاز می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Gaden er først og fremmest beregnet til cyklister.", "The street is first and foremost meant for cyclists.",
    "این خیابان پیش از هر چیز برای دوچرخه‌سواران است.",
    "Kørebanen i en cykelgade er reserveret til cykler og små knallerter; andre køretøjer kan få lov at køre der.",
    "The carriageway of a cycle street is reserved for bicycles and small mopeds; other vehicles may be allowed to drive there.",
    "سواره‌روی خیابان دوچرخه مخصوص دوچرخه و موتور گازیِ کوچک است؛ ممکن است به وسایل دیگر هم اجازه‌ی رانندگی داده شود."),
  S(True, "Jeg må kun køre med en fart, der svarer til cyklisternes, normalt under 30 km/t.",
    "I may only drive at a speed matching the cyclists', normally under 30 km/h.",
    "فقط با سرعتی هم‌اندازه‌ی سرعت دوچرخه‌سواران، معمولاً زیر ۳۰ کیلومتر بر ساعت، می‌توانم برانم.",
    "Kørsel i en cykelgade må kun ske med en hastighed svarende til cyklisternes (normalt under 30 km/t).",
    "Driving in a cycle street may only be done at a speed matching the cyclists' (normally under 30 km/h).",
    "رانندگی در خیابان دوچرخه فقط با سرعتی هم‌اندازه‌ی دوچرخه‌سواران (معمولاً زیر ۳۰ کیلومتر بر ساعت) مجاز است."),
  S(True, "Parkering må kun ske på de særligt afmærkede pladser.", "Parking is only allowed in the specially marked places.",
    "پارک فقط در جاهای مخصوصِ مشخص‌شده مجاز است.",
    "Parkering i en cykelgade må ikke ske uden for særligt afmærkede pladser.", "Parking in a cycle street must not take place outside specially marked places.",
    "پارک در خیابان دوچرخه بیرون از جاهای مخصوصِ مشخص‌شده مجاز نیست."),
  S(True, "Jeg skal vise særlig agtpågivenhed og hensyn over for cyklisterne.", "I must take particular care and show consideration for the cyclists.",
    "باید نسبت به دوچرخه‌سواران احتیاط و ملاحظه‌ی ویژه داشته باشم.",
    "De kørende i en cykelgade skal udvise særlig agtpågivenhed og hensynsfuldhed over for hinanden.",
    "Those driving and riding in a cycle street must take particular care and show consideration for one another.",
    "کسانی که در خیابان دوچرخه رانندگی می‌کنند باید نسبت به هم احتیاط و ملاحظه‌ی ویژه داشته باشند."),
)

Q(5398, "3.2", above("""
THE SCENE: a motorway seen from above with two lanes in our direction.
VEHICLES (colour code used strictly): a RED car (ours) in the left lane, just past the front of a large LORRY in the right lane; a
DASHED ORANGE arrow from the red car cutting into the right lane right in front of the lorry's cab; a SOLID GREEN arrow from the red
car going on in the left lane and only moving over to the right lane well ahead of the lorry.
MUST NOT APPEAR: signs, text."""),
  "Du har overhalet en lastbil på motorvejen og vil køre ind i højre vognbane foran den. Hvad skal du være opmærksom på?",
  "You have overtaken a lorry on the motorway and want to move into the right lane in front of it. What must you be aware of?",
  "در آزادراه از یک کامیون سبقت گرفته‌اید و می‌خواهید جلوی آن به خط راست برگردید. به چه چیزی باید توجه کنید؟",
  S(True, "Lastbilen har lang bremselængde, så jeg kører først ind, når der er god afstand til den.",
    "The lorry has a long braking distance, so I only move in when there is a good distance to it.",
    "مسافت ترمز کامیون طولانی است، پس فقط وقتی برمی‌گردم که فاصله‌ی کافی با آن داشته باشم.",
    "En tung lastbil kan ikke standse så hurtigt som en personbil.", "A heavy lorry cannot stop as quickly as a car.",
    "کامیون سنگین نمی‌تواند به سرعت یک خودروی سواری بایستد."),
  S(True, "Chaufføren kan have svært ved at se en bil, der er lige foran eller ved siden af lastbilens front.",
    "The driver may find it hard to see a car right in front of or beside the front of the lorry.",
    "ممکن است راننده‌ی کامیون خودرویی را که درست جلوی کابین یا کنار آن است به‌سختی ببیند.",
    "Lastbiler har store blinde vinkler tæt ved førerhuset.", "Lorries have large blind spots close to the cab.",
    "کامیون‌ها نزدیک کابین نقطه‌های کور بزرگی دارند."),
  S(False, "Jeg kan godt køre ind lige foran lastbilen og bremse, fordi den skal holde afstand.",
    "I can move in right in front of the lorry and brake, because it has to keep its distance.",
    "می‌توانم درست جلوی کامیون برگردم و ترمز کنم، چون او باید فاصله نگه دارد.",
    "Du må ikke køre ind, så den, du har overhalet, må bremse.", "You must not move in so that the one you have overtaken has to brake.",
    "نباید طوری برگردید که کسی که از او سبقت گرفته‌اید مجبور به ترمز شود."),
  S(False, "Lastbiler kan bremse lige så hurtigt som personbiler.", "Lorries can brake as quickly as cars.", "کامیون‌ها به همان سرعت خودروهای سواری ترمز می‌کنند.",
    "Lastbiler er tungere og har længere bremselængde.", "Lorries are heavier and have longer braking distances.",
    "کامیون‌ها سنگین‌ترند و مسافت ترمز بیشتری دارند."),
)

Q(5399, "8.1", picture("""
A car's dashboard seen from the driver's seat: a smartphone sits in a holder on the dashboard, showing an incoming call (a green and a
red round button, no text); the driver wears a small wireless headset in one ear and keeps both hands on the steering wheel; the road
ahead through the windscreen.
MUST BE CLEARLY VISIBLE: the phone in its holder, the headset, both hands on the wheel.
MUST NOT APPEAR: text, names, numbers, brand names."""),
  "Din mobiltelefon sidder i en holder, og du har et headset på. Telefonen ringer, mens du kører. Hvad gælder?",
  "Your mobile phone is in a holder, and you are wearing a headset. The phone rings while you are driving. What applies?",
  "تلفن همراهتان در پایه‌ی نگهدارنده است و هدست به گوش دارید. هنگام رانندگی تلفن زنگ می‌زند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må tale i telefonen med headsettet, når jeg ikke holder telefonen i hånden.",
    "I may talk on the phone with the headset as long as I do not hold the phone in my hand.",
    "تا وقتی تلفن را در دست نگیرم، می‌توانم با هدست صحبت کنم.",
    "Det er forbudt at bruge en håndholdt mobiltelefon under kørslen; håndfri samtale er tilladt.",
    "Using a hand-held mobile phone while driving is forbidden; a hands-free call is allowed.",
    "استفاده از تلفن همراهِ در دست هنگام رانندگی ممنوع است؛ صحبت بدون دست مجاز است."),
  S(True, "Også en håndfri samtale kan tage min opmærksomhed fra trafikken.", "A hands-free call can also take my attention away from the traffic.",
    "صحبت بدون دست هم می‌تواند حواسم را از ترافیک پرت کند.",
    "Samtalen optager dine tanker, så du opdager farer senere.", "The conversation occupies your thoughts, so you notice dangers later.",
    "گفت‌وگو ذهن شما را مشغول می‌کند و خطرها را دیرتر می‌بینید."),
  S(False, "Jeg må tage telefonen i hånden, hvis jeg kører langsomt.", "I may take the phone in my hand if I am driving slowly.",
    "اگر آهسته برانم، می‌توانم تلفن را در دست بگیرم.",
    "Forbuddet gælder under hele kørslen, uanset farten.", "The ban applies throughout the drive, whatever the speed.",
    "این ممنوعیت در تمام مدت رانندگی، با هر سرعتی، برقرار است."),
  S(False, "Det er ulovligt at tale i telefon under kørslen, også med headset.", "It is illegal to talk on the phone while driving, also with a headset.",
    "صحبت با تلفن هنگام رانندگی، حتی با هدست، غیرقانونی است.",
    "Håndfri samtale er tilladt; det er håndholdt brug, der er forbudt.", "Hands-free calls are allowed; it is hand-held use that is forbidden.",
    "صحبت بدون دست مجاز است؛ استفاده‌ی در دست ممنوع است."),
)

Q(5400, "10.3", picture("""
A young driver behind the wheel of a car in the evening, an older adult in the front passenger seat beside her; through the windscreen
the sky is dark blue and the street lights are on.
MUST BE CLEARLY VISIBLE: the young driver, the adult beside her in the front seat, the evening sky.
MUST NOT APPEAR: text, numbers, clocks, brand names."""),
  "Du er 17 år og har lige fået kørekort til bil. Hvad gælder?",
  "You are 17 and have just got your car driving licence. What applies?",
  "۱۷ ساله هستید و تازه گواهینامه‌ی خودرو گرفته‌اید. چه قاعده‌ای برقرار است؟",
  S(True, "Mellem kl. 5 og 20 må jeg køre alene.", "Between 5 am and 8 pm I may drive alone.", "بین ساعت ۵ صبح تا ۸ شب می‌توانم تنها رانندگی کنم.",
    "Siden 1. juli 2025 må 17-årige køre uden ledsager mellem kl. 5 og 20.", "Since 1 July 2025, 17-year-olds may drive without a companion between 5 am and 8 pm.",
    "از ۱ ژوئیه‌ی ۲۰۲۵، افراد ۱۷ ساله می‌توانند بین ساعت ۵ صبح تا ۸ شب بدون همراه رانندگی کنند."),
  S(True, "Mellem kl. 20 og 5 skal jeg have en ledsager med på forsædet, til jeg fylder 18.",
    "Between 8 pm and 5 am I must have a companion in the front seat until I turn 18.",
    "بین ساعت ۸ شب تا ۵ صبح، تا ۱۸ سالگی باید یک همراه روی صندلی جلو داشته باشم.",
    "Om aftenen og natten gælder kravet om ledsager stadig, indtil du fylder 18 år.",
    "In the evening and at night the companion requirement still applies until you turn 18.",
    "در عصر و شب، تا وقتی ۱۸ ساله شوید، الزام داشتن همراه همچنان برقرار است."),
  S(False, "Når jeg kører alene, gælder promillegrænsen på 0,5.", "When I drive alone, the 0.5 per mille limit applies.",
    "وقتی تنها رانندگی می‌کنم، حد مجاز الکل ۰٫۵ در هزار است.",
    "I de første 3 år efter, at du har fået kørekort, er grænsen 0,2 promille.", "In the first 3 years after getting your licence, the limit is 0.2 per mille.",
    "در ۳ سال اول پس از گرفتن گواهینامه، حد مجاز ۰٫۲ در هزار است."),
  S(False, "Kravet om ledsager gælder, til jeg har haft kørekort i 3 år.", "The companion requirement applies until I have held my licence for 3 years.",
    "الزام داشتن همراه تا وقتی ۳ سال از گرفتن گواهینامه‌ام بگذرد برقرار است.",
    "Kravet om ledsager mellem kl. 20 og 5 gælder, til du fylder 18.", "The companion requirement between 8 pm and 5 am applies until you turn 18.",
    "الزام داشتن همراه بین ساعت ۸ شب تا ۵ صبح تا ۱۸ سالگی برقرار است."),
)
