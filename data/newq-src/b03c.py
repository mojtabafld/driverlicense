# «آزمون جدید», batch 3 (5201–5300), part c: stopping and parking (7.18), overtaking (7.9), signs and markings (6.1),
# people and standing vehicles (7.6), speed (7.3), the car (1.2).
# Rules: Færdselsloven §§ 4, 21, 23, 24, 28, 29, 41, 43, 55 a; Bekendtgørelse om vejafmærkning (A 18, B 16, C 51, C 52,
# C 55, E 18, E 37, E 39, E 68, Q 45); FDM (Tempo 100).
from nq import Q, S, above, picture, town, view

TOWN_PLAIN = "Scenery is reduced to simple flat house fronts, pavements and a few trees."

Q(5251, "7.18", view("""
THE SCENE: a two-lane country road (one lane each way, broken centre line) climbing a long hill between fields. On our side a third lane
begins at the right edge (a crawler lane), separated from our lane by a broken line. At the right verge stands a tall blue rectangular
sign with white lane markings: two upward arrows with a dashed line between them and the right-hand lane branching off from the bottom
(the Danish crawler-lane sign). Far ahead a heavy lorry drives slowly uphill in the crawler lane. The view over the fields is wide.
MUST BE CLEARLY VISIBLE: the crawler lane beginning on the right, the blue sign, the lorry in the crawler lane.
MUST NOT APPEAR: parked cars, other signs, text."""),
  "Du kører op ad en lang bakke, hvor der er et krybespor i højre side. Du vil standse i krybesporet og tage et billede af udsigten. Hvad gælder?",
  "You are driving up a long hill with a crawler lane on the right. You want to stop in the crawler lane and take a photo of the view. What applies?",
  "از سربالایی طولانی‌ای بالا می‌روید که در سمت راستش یک خط کُندرو هست. می‌خواهید در خط کُندرو بایستید و از منظره عکس بگیرید. چه قاعده‌ای برقرار است؟",
  S(False, "Jeg må godt standse kort i krybesporet, når jeg tænder havariblinket.", "I may stop briefly in the crawler lane if I switch on the hazard lights.",
    "اگر چراغ خطر را روشن کنم، می‌توانم کوتاه در خط کُندرو بایستم.",
    "Det er forbudt at standse i et krybespor, også kortvarigt; havariblinket ændrer ikke på det.", "Stopping in a crawler lane is forbidden, even briefly; the hazard lights do not change that.",
    "توقف در خط کُندرو ممنوع است، حتی کوتاه؛ چراغ خطر این را تغییر نمی‌دهد."),
  S(True, "Jeg må hverken standse eller parkere i krybesporet.", "I may neither stop nor park in the crawler lane.", "در خط کُندرو نه می‌توانم توقف کنم و نه پارک.",
    "Standsning og parkering er forbudt i krybespor.", "Stopping and parking are forbidden in a crawler lane.", "توقف و پارک در خط کُندرو ممنوع است."),
  S(True, "Krybesporet skal bruges af køretøjer, der kører langsommere end den øvrige trafik, fx en tung lastbil op ad bakken.",
    "The crawler lane must be used by vehicles going slower than the other traffic, for example a heavy lorry up the hill.",
    "خط کُندرو را باید وسایلی استفاده کنند که کندتر از بقیه‌ی ترافیک می‌روند، مثلاً کامیون سنگین در سربالایی.",
    "Tavlen angiver en særlig vognbane, som skal bruges af køretøjer, der kører med lavere hastighed.",
    "The sign marks a special lane that must be used by vehicles going at a lower speed.", "این تابلو خط ویژه‌ای را نشان می‌دهد که وسایل کندتر باید از آن استفاده کنند."),
  S(False, "Krybesporet er en nødholdeplads, hvor biler med motorstop kan holde.", "The crawler lane is an emergency lay-by where cars with engine trouble may stand.",
    "خط کُندرو جای توقف اضطراری برای خودروهای خراب است.",
    "En nødholdeplads har sin egen tavle; krybesporet er en vognbane for langsom trafik.", "An emergency lay-by has its own sign; the crawler lane is a lane for slow traffic.",
    "جای توقف اضطراری تابلوی خودش را دارد؛ خط کُندرو یک خط عبور برای ترافیک کند است."),
)

Q(5252, "7.18", view("""
THE SCENE: a straight two-lane country road between fields, outside any town, with a broken centre line and a narrow grass verge. At the
right verge stands a sign shaped like a square standing on one corner: a yellow square with a white border and a thin black outer edge
(the Danish main-road sign). Far ahead at the right a small blue square sign with a white P marks a lay-by.
MUST BE CLEARLY VISIBLE: the yellow diamond sign, the empty road, the distant blue P sign.
MUST NOT APPEAR: houses, other signs, text."""),
  "Du kører på en landevej med denne tavle. Du er træt og vil holde ind og hvile dig et kvarter. Hvad gælder?",
  "You are driving on a country road with this sign. You are tired and want to pull in and rest for a quarter of an hour. What applies?",
  "در جاده‌ای بیرون شهر با این تابلو رانندگی می‌کنید. خسته‌اید و می‌خواهید کنار بزنید و یک ربع استراحت کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke parkere på kørebanen her.", "I must not park on the carriageway here.", "اینجا نباید روی سواره‌رو پارک کنم.",
    "Tavlen viser en hovedvej, og uden for tættere bebygget område er parkering på hovedvejens kørebane forbudt.",
    "The sign shows a main road, and outside built-up areas parking on a main road's carriageway is forbidden.",
    "این تابلو جاده‌ی اصلی را نشان می‌دهد و بیرون از مناطق مسکونی پارک روی سواره‌روی جاده‌ی اصلی ممنوع است."),
  S(True, "Jeg kører videre til en parkeringsplads eller rasteplads og holder pause der.", "I drive on to a car park or rest area and take my break there.",
    "تا یک پارکینگ یا استراحتگاه ادامه می‌دهم و آنجا استراحت می‌کنم.",
    "Der kan du holde pause uden at være til fare for dig selv og andre.", "There you can take a break without being a danger to yourself and others.",
    "آنجا می‌توانید بدون خطر برای خود و دیگران استراحت کنید."),
  S(False, "Jeg må parkere på kørebanen, når jeg tænder havariblinket.", "I may park on the carriageway if I switch on the hazard lights.",
    "اگر چراغ خطر را روشن کنم، می‌توانم روی سواره‌رو پارک کنم.",
    "Havariblinket gør ikke parkering tilladt, hvor den er forbudt.", "The hazard lights do not make parking allowed where it is forbidden.",
    "چراغ خطر پارک را در جایی که ممنوع است مجاز نمی‌کند."),
  S(False, "Tavlen betyder, at jeg har ubetinget vigepligt for trafikken fra sidevejene.", "The sign means that I must give way to the traffic from the side roads.",
    "این تابلو یعنی من باید به ترافیک راه‌های فرعی بی‌قیدوشرط حق تقدم بدهم.",
    "Det er omvendt: trafikken fra sidevejene har ubetinget vigepligt for dig.", "It is the other way round: the traffic from the side roads must give way to you.",
    "برعکس است: ترافیک راه‌های فرعی باید بی‌قیدوشرط به شما حق تقدم بدهد."),
)

Q(5253, "7.18", picture("""
An illustration of a town street: a small car parked at the right kerb in front of a bakery. Its driver has just got out and walks away
from the car towards the bakery door, the car key in his raised hand, pressing it; the car's indicator lamps flash once as it locks.
MUST BE CLEARLY VISIBLE: the parked car, the driver walking to the shop with the key in his hand.
MUST NOT APPEAR: text, brand names, other people near the car."""),
  "Du holder ind for at hente en pakke i en butik og er kun væk et par minutter. Hvad gælder, når du forlader bilen?",
  "You pull in to collect a parcel in a shop and will only be away for a couple of minutes. What applies when you leave the car?",
  "کنار می‌زنید تا بسته‌ای را از یک مغازه بگیرید و فقط چند دقیقه دور می‌شوید. وقتی خودرو را ترک می‌کنید، چه قاعده‌ای برقرار است؟",
  S(True, "Jeg sikrer, at bilen ikke kan sætte sig i gang af sig selv, fx med parkeringsbremsen.", "I make sure the car cannot start moving by itself, for example with the parking brake.",
    "مطمئن می‌شوم خودرو خودبه‌خود راه نمی‌افتد، مثلاً با ترمز دستی.",
    "Når føreren forlader køretøjet, skal det sikres, at det ikke kan sætte i gang af sig selv.", "When the driver leaves the vehicle, it must be secured so that it cannot start moving by itself.",
    "وقتی راننده خودرو را ترک می‌کند، باید مطمئن شود خودرو خودبه‌خود حرکت نمی‌کند."),
  S(True, "Jeg tager nøglen med og låser bilen.", "I take the key with me and lock the car.", "سوییچ را با خودم می‌برم و در خودرو را قفل می‌کنم.",
    "Føreren skal sørge for, at bilen ikke uberettiget kan benyttes af andre.", "The driver must make sure that the car cannot be used by others without permission.",
    "راننده باید مراقب باشد که دیگران نتوانند بدون اجازه از خودرو استفاده کنند."),
  S(False, "Jeg lader motoren køre, da jeg kun er væk et par minutter.", "I leave the engine running, as I will only be away for a couple of minutes.",
    "موتور را روشن می‌گذارم، چون فقط چند دقیقه دور می‌شوم.",
    "En bil med motoren i gang og nøglen i kan let blive stjålet eller sat i bevægelse.", "A car with its engine running and the key in can easily be stolen or set moving.",
    "خودرویی که موتورش روشن و سوییچش داخل است، به‌راحتی دزدیده می‌شود یا به حرکت می‌افتد."),
  S(True, "Reglerne gælder, selv om jeg kun er væk et øjeblik.", "The rules apply even if I am only away for a moment.", "این قواعد حتی اگر فقط لحظه‌ای دور شوم هم برقرارند.",
    "Kravene gælder, hver gang føreren forlader køretøjet.", "The requirements apply every time the driver leaves the vehicle.",
    "این الزام‌ها هر بار که راننده خودرو را ترک می‌کند برقرارند."),
)

Q(5254, "7.18", town("""
THE SCENE: a town street with one lane in each direction, seen from the high seat of a delivery van (the van's broad dashboard at the
bottom). About 15 m ahead at the right kerb stands a round speed-limit sign with a red border and the number 30 on a post close to the
kerb; the kerb space just before the sign is free. Cars are parked further on.
MUST BE CLEARLY VISIBLE: the speed-limit sign at the kerb, the free space just before it.
MUST NOT APPEAR: junctions, crossings, yellow lines, other text."""),
  "Du kører en høj varevogn og vil parkere ved kantstenen lige foran denne tavle. Varevognen vil skjule tavlen for trafikken bag dig. Hvad gælder?",
  "You are driving a tall van and want to park at the kerb just in front of this sign. The van will hide the sign from the traffic behind you. What applies?",
  "با یک ون بلند رانندگی می‌کنید و می‌خواهید درست جلوی این تابلو کنار جدول پارک کنید. ون، تابلو را از دید ترافیک پشت سرتان پنهان می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke standse eller parkere, så tavlen bliver skjult.", "I must not stop or park so that the sign is hidden.", "نباید طوری توقف یا پارک کنم که تابلو پنهان شود.",
    "Det er forbudt at standse eller parkere på en sådan måde, at en færdselstavle eller et signal dækkes.",
    "Stopping or parking in a way that covers a traffic sign or signal is forbidden.", "توقف یا پارک به شکلی که تابلو یا چراغ راهنمایی را بپوشاند ممنوع است."),
  S(False, "Det er tilladt, fordi de andre har set tavlen, før jeg holdt ind.", "It is allowed because the others saw the sign before I pulled in.",
    "مجاز است، چون دیگران پیش از توقف من تابلو را دیده‌اند.",
    "Trafikanter, der kommer senere, skal også kunne se tavlen.", "Road users who come later must also be able to see the sign.",
    "کاربرانی که بعداً می‌رسند هم باید تابلو را ببینند."),
  S(False, "Forbuddet gælder kun lyssignaler, ikke tavler.", "The ban only applies to traffic lights, not signs.", "این ممنوعیت فقط برای چراغ‌هاست، نه تابلوها.",
    "Det gælder både færdselstavler og signaler.", "It applies to both traffic signs and signals.", "هم تابلوها و هم چراغ‌ها را شامل می‌شود."),
  S(False, "Jeg må holde der, hvis jeg er tilbage inden for 3 minutter.", "I may stand there if I am back within 3 minutes.", "اگر ظرف ۳ دقیقه برگردم، می‌توانم آنجا بایستم.",
    "Forbuddet gælder også standsning, ikke kun parkering.", "The ban also covers stopping, not only parking.", "این ممنوعیت شامل توقف هم می‌شود، نه فقط پارک."),
)

Q(5255, "7.18", above("""
THE SCENE: a road seen from above approaching a junction. For the last 40 m before the junction the carriageway in our direction is
divided into two lanes (a left-turn lane and a lane for straight on and right) by an UNBROKEN white line; before that the road has one
lane in our direction. White lane arrows on the asphalt.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane, about 20 m before the junction; a DASHED ORANGE arrow from it
to the kerb, as if to stop there; a GREY car behind it.
MUST NOT APPEAR: signs, parking bays, text."""),
  "Før krydset er kørebanen delt i vognbaner med en ubrudt linje. Du vil standse ved kantstenen i den højre vognbane og sætte en passager af. Hvad gælder?",
  "Before the junction the carriageway is divided into lanes by an unbroken line. You want to stop at the kerb in the right lane and let a passenger out. What applies?",
  "پیش از تقاطع، سواره‌رو با یک خط ممتد به چند خط عبور تقسیم شده است. می‌خواهید در خط راست کنار جدول بایستید و مسافری را پیاده کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er forbudt at standse her.", "Stopping is forbidden here.", "توقف در اینجا ممنوع است.",
    "Standsning og parkering er forbudt på en strækning, hvor kørebanen før et vejkryds er delt i vognbaner med spærrelinjer.",
    "Stopping and parking are forbidden on a stretch where the carriageway before a junction is divided into lanes by barrier lines.",
    "توقف و پارک در جایی که سواره‌رو پیش از تقاطع با خط‌های ممتد به چند خط تقسیم شده ممنوع است."),
  S(False, "Jeg må standse, hvis passageren stiger hurtigt ud.", "I may stop if the passenger gets out quickly.", "اگر مسافر سریع پیاده شود، می‌توانم بایستم.",
    "Forbuddet gælder enhver standsning, også for af- og påstigning.", "The ban covers every stop, also to let people in or out.",
    "این ممنوعیت هر توقفی را شامل می‌شود، حتی برای سوار و پیاده شدن."),
  S(False, "Forbuddet gælder kun den venstre vognbane.", "The ban only applies to the left lane.", "این ممنوعیت فقط برای خط چپ است.",
    "Det gælder på hele strækningen, hvor kørebanen er delt med spærrelinjer.", "It applies along the whole stretch where the carriageway is divided by barrier lines.",
    "در تمام طولی که سواره‌رو با خط ممتد تقسیم شده برقرار است."),
  S(False, "Jeg må standse 3 m før det sted, hvor den ubrudte linje begynder.", "I may stop 3 m before the point where the unbroken line begins.",
    "می‌توانم ۳ متر پیش از جایی که خط ممتد شروع می‌شود بایستم.",
    "Forbuddet gælder også de 5 m før strækningen med spærrelinjer.", "The ban also covers the 5 m before the stretch with barrier lines.",
    "این ممنوعیت ۵ متر پیش از شروع خط‌های ممتد را هم شامل می‌شود."),
)

Q(5256, "7.9", view("""
THE SCENE: a straight two-lane country road with a broken centre line. On the right verge stands a round sign with a red ring and a
white field showing a red lorry on the left and a black car on the right (the Danish no-overtaking-for-lorries sign). Ahead of us a
slow white van drives along; the oncoming lane is empty as far as the eye can see.
MUST BE CLEARLY VISIBLE: the sign, the slow van ahead, the empty oncoming lane.
MUST NOT APPEAR: other signs, text."""),
  "Du kører i en almindelig personbil og passerer denne tavle. Foran dig kører en langsom varevogn, og der kommer ingen imod dig. Hvad gælder?",
  "You are driving an ordinary car and pass this sign. A slow van is in front of you, and nothing is coming towards you. What applies?",
  "با یک خودروی سواری معمولی از کنار این تابلو می‌گذرید. یک ون کُند جلوی شماست و از روبه‌رو کسی نمی‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Tavlen forbyder lastbiler at overhale.", "The sign forbids lorries to overtake.", "این تابلو سبقت گرفتن کامیون‌ها را ممنوع می‌کند.",
    "Tavlen forbyder overhaling med lastbil og lastbilvogntog.", "The sign forbids overtaking by lorries and lorry combinations.",
    "این تابلو سبقت کامیون و کامیون با یدک را ممنوع می‌کند."),
  S(True, "Jeg må gerne overhale varevognen i min personbil, hvis det kan ske uden fare.", "I may overtake the van in my car if it can be done safely.",
    "با خودروی سواری‌ام اگر بی‌خطر باشد می‌توانم از ون سبقت بگیرم.",
    "Forbuddet gælder ikke personbiler; her gælder de almindelige regler om overhaling.", "The ban does not apply to cars; the ordinary rules on overtaking apply.",
    "این ممنوعیت شامل خودروهای سواری نمی‌شود؛ قواعد معمول سبقت برقرار است."),
  S(False, "Tavlen forbyder alle køretøjer at overhale.", "The sign forbids all vehicles to overtake.", "این تابلو سبقت را برای همه‌ی وسایل نقلیه ممنوع می‌کند.",
    "Det almindelige overhalingsforbud har sin egen tavle med to biler.", "The general no-overtaking ban has its own sign showing two cars.",
    "ممنوعیت کلی سبقت تابلوی خودش را با دو خودرو دارد."),
  S(False, "Forbuddet ophører ved næste vejkryds.", "The ban ends at the next junction.", "این ممنوعیت در تقاطع بعدی تمام می‌شود.",
    "Forbuddet gælder, indtil det ophæves med en tavle for ophør eller ved en afstand på en undertavle.",
    "The ban applies until it is lifted by an end sign or after a distance shown on a sub-plate.",
    "این ممنوعیت تا تابلوی پایان یا تا فاصله‌ای که زیرتابلو نشان می‌دهد ادامه دارد."),
)

Q(5257, "7.9", view("""
THE SCENE: a wide urban road with two lanes in our direction and dense traffic: queues of cars in both lanes moving slowly. We are in
the right lane, which is moving a little faster than the left one; our car is level with cars in the left lane.
MUST BE CLEARLY VISIBLE: the queues in both lanes, the broken lane line between them.
MUST NOT APPEAR: junctions, signs, text.""", scenery=TOWN_PLAIN),
  "Der er tæt trafik, og bilerne kører i kø i begge vognbaner i din retning. Din vognbane til højre glider lidt hurtigere end den venstre. Hvad gælder?",
  "The traffic is dense and the cars are queuing in both lanes in your direction. Your lane on the right is moving a little faster than the left one. What applies?",
  "ترافیک سنگین است و خودروها در هر دو خط جهت شما در صف حرکت می‌کنند. خط شما در سمت راست کمی سریع‌تر از خط چپ پیش می‌رود. چه قاعده‌ای برقرار است؟",
  S(True, "Det regnes ikke som overhaling, at jeg kører forbi bilerne i den venstre vognbane.", "It does not count as overtaking when I pass the cars in the left lane.",
    "رد شدن من از کنار خودروهای خط چپ سبقت حساب نمی‌شود.",
    "I tæt trafik i flere rækker anses det ikke som overhaling, at et køretøj i én vognbane kører forbi et køretøj i en anden.",
    "In dense traffic in several rows, a vehicle in one lane passing a vehicle in another lane does not count as overtaking.",
    "در ترافیک سنگین چندصفی، رد شدن یک خودرو در یک خط از خودرویی در خط دیگر سبقت حساب نمی‌شود."),
  S(True, "Jeg må ikke skifte vognbane frem og tilbage for at komme hurtigere frem.", "I must not change lanes back and forth to get on faster.",
    "نباید برای جلو افتادن مدام خط عوض کنم.",
    "I sådan tæt trafik må du kun skifte vognbane, når det er nødvendigt, fx for at komme i den rigtige vognbane før et kryds eller for at standse eller parkere.",
    "In such dense traffic you may only change lanes when necessary, for example to get into the right lane before a junction or to stop or park.",
    "در چنین ترافیکی فقط وقتی می‌توانید خط عوض کنید که لازم باشد، مثلاً برای رفتن به خط درست پیش از تقاطع یا برای توقف و پارک."),
  S(False, "Det er forbudt at køre hurtigere i højre vognbane end i venstre.", "It is forbidden to go faster in the right lane than in the left.",
    "سریع‌تر رفتن در خط راست نسبت به خط چپ ممنوع است.",
    "I tæt kø i flere vognbaner må den højre vognbane gerne glide hurtigere end den venstre.", "In dense queues in several lanes, the right lane may well move faster than the left.",
    "در صف‌های سنگین چندخطه، خط راست می‌تواند سریع‌تر از خط چپ حرکت کند."),
)

Q(5258, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line. At the right verge in the foreground stands a round sign with a red ring
and a white field showing a red car on the left and a black car on the right (the Danish no-overtaking sign). About 40 m ahead the grey
car in front of us has stopped close to the centre line with its left indicator flashing, waiting to turn left into a side road; to its
right there is plenty of room in our lane. An oncoming car approaches in the other lane.
MUST BE CLEARLY VISIBLE: the no-overtaking sign, the grey car with its left indicator, the room on its right, the side road on the left.
MUST NOT APPEAR: text."""),
  "Du kører på en strækning med denne tavle. Bilen foran dig holder ved midterlinjen og blinker til venstre for at svinge ind på en sidevej. Hvad gælder?",
  "You are on a stretch of road with this sign. The car in front of you is waiting at the centre line, signalling left to turn into a side road. What applies?",
  "در مسیری با این تابلو رانندگی می‌کنید. خودروی جلویی کنار خط وسط ایستاده و راهنمای چپ زده تا به راه فرعی بپیچد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må køre forbi bilen i højre side, når der er plads til det.", "I may pass the car on its right when there is room for it.",
    "اگر جا باشد، می‌توانم از سمت راست آن خودرو رد شوم.",
    "Overhalingsforbuddet gælder ikke overhaling af et køretøj, der svinger af vejen, og en bil, der svinger til venstre, overhales i højre side.",
    "The no-overtaking ban does not apply to overtaking a vehicle that is turning off the road, and a car turning left is overtaken on its right.",
    "ممنوعیت سبقت شامل وسیله‌ای که از جاده خارج می‌شود نیست، و خودرویی را که به چپ می‌پیچد باید از سمت راست رد کرد."),
  S(False, "Jeg skal vente bag bilen, fordi overhaling er forbudt på strækningen.", "I must wait behind the car because overtaking is forbidden on this stretch.",
    "باید پشت آن خودرو منتظر بمانم، چون سبقت در این مسیر ممنوع است.",
    "Forbuddet har en undtagelse for køretøjer, der svinger af vejen.", "The ban has an exception for vehicles turning off the road.",
    "این ممنوعیت برای وسایلی که از جاده خارج می‌شوند استثنا دارد."),
  S(False, "Jeg må køre forbi bilen i venstre side, fordi den holder stille.", "I may pass the car on its left because it is standing still.",
    "چون آن خودرو ایستاده، می‌توانم از سمت چپش رد شوم.",
    "En bil, der svinger til venstre, skal overhales i højre side; til venstre kører du ud foran den og ind i de modkørendes vognbane.",
    "A car turning left must be overtaken on its right; on the left you would drive out in front of it and into the oncoming lane.",
    "خودرویی را که به چپ می‌پیچد باید از راست رد کرد؛ از چپ، جلوی او و وارد خط ترافیک روبه‌رو می‌شوید."),
)

Q(5259, "7.9", view("""
THE SCENE: a wide two-lane country road with a broken centre line, climbing to a hilltop, so the road beyond the crest cannot be seen.
A cyclist rides at the right edge about 30 m ahead, going uphill. Our lane is wide, with clear room between the cyclist and the centre
line.
MUST BE CLEARLY VISIBLE: the cyclist, the crest hiding the road beyond, the room in our lane.
MUST NOT APPEAR: oncoming vehicles, signs, text."""),
  "Foran dig kører en cyklist op mod en bakketop, hvor du ikke kan se, om der kommer modkørende. Din vognbane er bred. Hvad gælder for overhaling af cyklisten?",
  "In front of you a cyclist is riding up towards a hilltop where you cannot see whether anything is coming towards you. Your lane is wide. What applies to overtaking the cyclist?",
  "جلوی شما دوچرخه‌سواری به سمت بالای تپه‌ای می‌رود که نمی‌بینید از روبه‌رو کسی می‌آید یا نه. خط شما پهن است. درباره‌ی سبقت از دوچرخه‌سوار چه قاعده‌ای برقرار است؟",
  S(True, "Forbuddet mod overhaling ved en uoverskuelig bakke gælder ikke overhaling af en tohjulet cykel.",
    "The ban on overtaking at a blind hill does not apply to overtaking a two-wheeled bicycle.",
    "ممنوعیت سبقت در تپه‌ی بی‌دید شامل سبقت از دوچرخه‌ی دوچرخ نمی‌شود.",
    "Overhalingsforbuddet ved uoverskuelige bakker, sving og kryds gælder ikke over for tohjulede cykler og små knallerter.",
    "The overtaking ban at blind hills, bends and junctions does not apply to two-wheeled bicycles and small mopeds.",
    "ممنوعیت سبقت در تپه‌ی بی‌دید، پیچ و تقاطع شامل دوچرخه‌ی دوچرخ و موپد کوچک نمی‌شود."),
  S(True, "Jeg må kun overhale, hvis jeg kan holde god afstand til cyklisten uden at komme over i den modkørende vognbane.",
    "I may only overtake if I can keep a good distance to the cyclist without crossing into the oncoming lane.",
    "فقط وقتی می‌توانم سبقت بگیرم که بدون رفتن به خط مقابل، فاصله‌ی کافی با دوچرخه‌سوار داشته باشم.",
    "Du må ikke bruge en vognbane, som du ikke kan se er fri for modkørende, og du skal holde tilstrækkelig afstand til siden.",
    "You must not use a lane that you cannot see is free of oncoming traffic, and you must keep enough distance to the side.",
    "نباید از خطی استفاده کنید که نمی‌بینید از ترافیک روبه‌رو خالی است، و باید فاصله‌ی کافی از پهلو داشته باشید."),
  S(False, "Jeg overhaler tæt forbi cyklisten, så jeg ikke kommer over midterlinjen.", "I overtake close past the cyclist so that I do not cross the centre line.",
    "از نزدیکِ دوچرخه‌سوار سبقت می‌گیرم تا از خط وسط رد نشوم.",
    "Du skal holde tilstrækkelig afstand til siden; er der ikke plads i din egen side, venter du til efter bakketoppen.",
    "You must keep enough distance to the side; if there is not room on your own side, you wait until after the hilltop.",
    "باید فاصله‌ی کافی از پهلو داشته باشید؛ اگر در سمت خودتان جا نیست، تا بعد از تپه صبر کنید."),
  S(False, "Jeg dytter, så cyklisten kører helt ind til kanten.", "I sound the horn so that the cyclist moves right over to the edge.",
    "بوق می‌زنم تا دوچرخه‌سوار کاملاً به لبه برود.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.", "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5260, "7.9", view("""
THE SCENE: a two-lane country road. About 40 m ahead a slow road-maintenance vehicle (white, with red-and-white striped panels at the
rear and flashing yellow beacons on the roof) drives at walking pace in the middle of the road, painting a fresh white centre line
behind it. There is clear room to its right in our lane; the oncoming lane beyond it is free.
MUST BE CLEARLY VISIBLE: the maintenance vehicle with its yellow beacons and striped rear, the fresh centre line, the room on its right.
MUST NOT APPEAR: text, other vehicles, workers on foot."""),
  "Et vejarbejdskøretøj maler midterlinjen og kører meget langsomt midt på vejen. Der er plads til højre for det. Hvad gælder?",
  "A road-works vehicle is painting the centre line and driving very slowly in the middle of the road. There is room to its right. What applies?",
  "یک خودروی راهسازی در حال رنگ‌آمیزی خط وسط است و خیلی آهسته وسط جاده حرکت می‌کند. سمت راستش جا هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må overhale køretøjet i højre side, hvis det er det mest hensigtsmæssige.", "I may overtake the vehicle on its right if that is the most suitable way.",
    "اگر مناسب‌ترین راه باشد، می‌توانم از سمت راست آن خودرو سبقت بگیرم.",
    "Et køretøj, der bruges ved vejarbejde, må med fornøden forsigtighed overhales på den måde, der er mest hensigtsmæssig.",
    "A vehicle used for road works may be overtaken with due care in whatever way is most suitable.",
    "خودرویی را که در کار راهسازی است می‌توان با احتیاط لازم به مناسب‌ترین شکل سبقت گرفت."),
  S(True, "Jeg kører forbi med lav fart og god afstand.", "I pass at a low speed with a good distance.", "با سرعت کم و فاصله‌ی کافی رد می‌شوم.",
    "Hvor der arbejdes på vejen, skal du holde en passende lav hastighed.", "Where work is being done on the road, you must keep a suitably low speed.",
    "جایی که روی جاده کار انجام می‌شود، باید سرعت مناسبِ کمی داشته باشید."),
  S(False, "Jeg må aldrig overhale i højre side.", "I may never overtake on the right.", "هرگز نباید از سمت راست سبقت بگیرم.",
    "Et køretøj, der bruges ved vejarbejde, må overhales på den mest hensigtsmæssige måde, også i højre side.",
    "A vehicle used for road works may be overtaken in the most suitable way, also on its right.",
    "خودروی راهسازی را می‌توان به مناسب‌ترین شکل سبقت گرفت، حتی از سمت راست."),
  S(False, "Jeg skal blive bag køretøjet, til det er færdigt med at male.", "I must stay behind the vehicle until it has finished painting.",
    "باید تا پایان رنگ‌آمیزی پشت آن خودرو بمانم.",
    "Du må overhale det, når det kan ske med fornøden forsigtighed.", "You may overtake it when it can be done with due care.",
    "وقتی با احتیاط لازم ممکن باشد، می‌توانید از آن سبقت بگیرید."),
)

Q(5261, "6.1", view("""
THE SCENE: a narrow winding country road between hedges. At the right verge stands a blue square sign with the white number 60 and no
red border (the Danish recommended-speed sign).
MUST BE CLEARLY VISIBLE: the blue square sign with 60, the winding road.
MUST NOT APPEAR: round signs, other signs, text other than the number 60."""),
  "Du kører forbi denne tavle. Hvad betyder den?",
  "You pass this sign. What does it mean?",
  "از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Vejen er ikke egnet til kørsel med højere hastighed end 60 km/t.", "The road is not suitable for driving faster than 60 km/h.",
    "این جاده برای رانندگی با سرعتی بیش از ۶۰ کیلومتر بر ساعت مناسب نیست.",
    "Tavlen angiver en anbefalet hastighed: vejen er ikke egnet til højere hastighed end den angivne.",
    "The sign gives a recommended speed: the road is not suitable for a higher speed than the one shown.",
    "این تابلو سرعت توصیه‌شده را نشان می‌دهد: جاده برای سرعتی بیش از عدد روی تابلو مناسب نیست."),
  S(True, "Anbefalingen gælder, indtil en tavle ophæver den, eller til den afstand, som en undertavle angiver.",
    "The recommendation applies until a sign ends it, or for the distance shown on a sub-plate.",
    "این توصیه تا تابلویی که آن را لغو کند، یا تا فاصله‌ای که زیرتابلو نشان می‌دهد، برقرار است.",
    "Den anbefalede hastighed ophæves med tavlen for ophør eller ved en afstand på en undertavle.",
    "The recommended speed is ended by the end sign or by a distance on a sub-plate.", "سرعت توصیه‌شده با تابلوی پایان یا با فاصله‌ی زیرتابلو لغو می‌شود."),
  S(False, "Jeg skal køre mindst 60 km/t.", "I must drive at least 60 km/h.", "باید دست‌کم ۶۰ کیلومتر بر ساعت برانم.",
    "En påbudt mindste hastighed vises på en rund blå tavle.", "A compulsory minimum speed is shown on a round blue sign.",
    "حداقل سرعت اجباری با تابلوی گرد آبی نشان داده می‌شود."),
  S(False, "Det er en hastighedsgrænse på samme måde som en rund tavle med rød kant.", "It is a speed limit in the same way as a round sign with a red border.",
    "این هم مثل تابلوی گرد با حاشیه‌ی قرمز، حد سرعت است.",
    "Den blå firkantede tavle er en anbefaling; den runde tavle med rød kant er et forbud.", "The blue square sign is a recommendation; the round sign with a red border is a ban.",
    "تابلوی مربعی آبی توصیه است؛ تابلوی گرد با حاشیه‌ی قرمز ممنوعیت است."),
)

Q(5262, "6.1", town("""
THE SCENE: a quiet residential street. At its entrance on the right stands a blue square sign with a white vertical bar topped by a red
crossbar (a white «T» with a red top), and above the red crossbar a thin white line continues up to the sign's top edge (the Danish
dead-end sign for a road that continues as a path). At the far end of the street houses close it off, with a narrow footpath and cycle
path continuing between two gardens.
MUST BE CLEARLY VISIBLE: the sign with the thin line above the red bar, the path at the street's end.
MUST NOT APPEAR: text, other signs."""),
  "Du vil køre ind ad vejen med denne tavle. Hvad betyder den?",
  "You are about to turn into the road with this sign. What does it mean?",
  "می‌خواهید وارد راهی با این تابلو شوید. معنی‌اش چیست؟",
  S(True, "Vejen er blind for biler, så jeg kan ikke køre igennem.", "The road is a dead end for cars, so I cannot drive through.",
    "این راه برای خودروها بن‌بست است و نمی‌توانم از آن عبور کنم.",
    "Tavlen angiver blind vej.", "The sign shows a dead-end road.", "این تابلو بن‌بست را نشان می‌دهد."),
  S(True, "Den tynde hvide streg viser, at vejen fortsætter som en sti.", "The thin white line shows that the road continues as a path.",
    "خط باریک سفید نشان می‌دهد راه به صورت یک مسیر پیاده یا دوچرخه ادامه دارد.",
    "Med en tynd hvid streg på tavlen angives, at vejen fortsætter i en sti.", "A thin white line on the sign shows that the road continues as a path.",
    "خط باریک سفید روی تابلو یعنی راه به صورت مسیر ادامه پیدا می‌کند."),
  S(True, "Jeg må godt køre ind på vejen, fx for at besøge et af husene.", "I may drive into the road, for example to visit one of the houses.",
    "می‌توانم وارد این راه شوم، مثلاً برای رفتن به یکی از خانه‌ها.",
    "Tavlen er en oplysning, ikke et forbud; du skal blot vende for at komme ud igen.", "The sign is information, not a ban; you just have to turn round to get out again.",
    "این تابلو اطلاع‌رسانی است، نه ممنوعیت؛ فقط برای بیرون آمدن باید دور بزنید."),
  S(False, "Vejen er kun for cyklister og gående.", "The road is only for cyclists and pedestrians.", "این راه فقط برای دوچرخه‌سواران و عابران است.",
    "Kun stien i enden er for dem; på selve vejen må biler køre.", "Only the path at the end is for them; cars may drive on the road itself.",
    "فقط مسیرِ انتهای راه برای آن‌هاست؛ خودروها می‌توانند در خودِ راه برانند."),
)

Q(5263, "6.1", view("""
THE SCENE: a road approaching a junction. On the carriageway ahead, where a left-turn lane begins, a long area painted with diagonal
white stripes and framed by an unbroken white line (a hatched area) separates our lane from the oncoming lane.
MUST BE CLEARLY VISIBLE: the hatched area with its unbroken frame, the left-turn lane beginning beside it.
MUST NOT APPEAR: signs, text, vehicles on the hatched area."""),
  "Foran dig er der et skraveret felt på kørebanen, omgivet af en ubrudt linje. Hvad gælder?",
  "In front of you there is a hatched area on the carriageway, framed by an unbroken line. What applies?",
  "جلوی شما روی سواره‌رو یک محدوده‌ی هاشورخورده هست که دورش خط ممتد کشیده شده. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må hverken køre, standse eller parkere på feltet.", "I may neither drive, stop nor park on the area.", "روی این محدوده نه می‌توانم برانم، نه توقف کنم و نه پارک.",
    "Feltet er en spærreflade, hvor der ikke må køres, standses eller parkeres.", "The area is a hatched no-go area where driving, stopping and parking are not allowed.",
    "این محدوده هاشورخورده است و رانندگی، توقف و پارک در آن ممنوع است."),
  S(False, "Jeg må køre hen over feltet for at komme hurtigere ind i venstresvingsbanen.", "I may drive across the area to get into the left-turn lane sooner.",
    "می‌توانم برای زودتر رسیدن به خط گردش به چپ از روی آن رد شوم.",
    "Du skal køre ind i venstresvingsbanen, hvor den begynder, ikke hen over spærrefladen.", "You must enter the left-turn lane where it begins, not across the hatched area.",
    "باید از جایی که خط گردش به چپ شروع می‌شود واردش شوید، نه از روی محدوده‌ی هاشورخورده."),
  S(False, "Jeg må parkere på feltet, når det ikke er i vejen for nogen.", "I may park on the area when it is not in anyone's way.",
    "اگر مزاحم کسی نباشد، می‌توانم روی آن پارک کنم.",
    "Parkering er forbudt på spærrefladen.", "Parking is forbidden on the hatched area.", "پارک روی محدوده‌ی هاشورخورده ممنوع است."),
  S(False, "Feltet er en cykelbane.", "The area is a cycle lane.", "این محدوده خط دوچرخه است.",
    "En spærreflade er ikke for nogen trafik.", "A hatched area is not for any traffic.", "محدوده‌ی هاشورخورده برای هیچ ترافیکی نیست."),
)

Q(5264, "6.1", view("""
THE SCENE: a road with two lanes in our direction (the end of a one-way stretch) that further ahead becomes an ordinary two-way road
with one lane each way. At the right verge stands a red-bordered triangular warning sign with a white field showing two black vertical
arrows side by side: the left one pointing down and the right one pointing up (the Danish oncoming-traffic sign).
MUST BE CLEARLY VISIBLE: the triangular sign with the two arrows, our two lanes narrowing into a two-way road ahead.
MUST NOT APPEAR: other signs, text."""),
  "Du kører på en vej med to vognbaner i din retning og passerer denne tavle. Hvad betyder den?",
  "You are driving on a road with two lanes in your direction and pass this sign. What does it mean?",
  "در جاده‌ای با دو خط در جهت خودتان رانندگی می‌کنید و از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Længere fremme kommer der modkørende trafik.", "Further ahead there will be oncoming traffic.", "کمی جلوتر ترافیک روبه‌رو وجود دارد.",
    "Tavlen advarer om modkørende færdsel.", "The sign warns of oncoming traffic.", "این تابلو درباره‌ی ترافیک روبه‌رو هشدار می‌دهد."),
  S(False, "Vejen er ensrettet efter tavlen.", "The road is one-way after the sign.", "پس از این تابلو، جاده یک‌طرفه است.",
    "Tavlen betyder det modsatte: der kommer trafik imod dig.", "The sign means the opposite: traffic will come towards you.",
    "این تابلو برعکس است: ترافیک از روبه‌رو می‌آید."),
  S(False, "Tavlen betyder, at jeg skal holde tilbage for modkørende ved en indsnævring.", "The sign means that I must give way to oncoming traffic at a narrowing.",
    "این تابلو یعنی در یک باریک‌شدگی باید به ترافیک روبه‌رو راه بدهم.",
    "Tavlen er en advarsel og giver ingen vigepligt; vigepligt for modkørende har sin egen tavle.",
    "The sign is a warning and gives no duty to give way; giving way to oncoming traffic has its own sign.",
    "این تابلو هشدار است و تکلیف حق تقدم تعیین نمی‌کند؛ راه دادن به ترافیک روبه‌رو تابلوی خودش را دارد."),
  S(False, "Jeg kan blive i venstre vognbane, også efter at vejen er blevet dobbeltrettet.", "I can stay in the left lane, also after the road has become two-way.",
    "حتی پس از دوطرفه شدن جاده هم می‌توانم در خط چپ بمانم.",
    "Når der kommer modkørende færdsel, skal du holde til højre i din egen side af vejen.", "When there is oncoming traffic, you must keep right on your own side of the road.",
    "وقتی ترافیک روبه‌رو هست، باید در سمت خودتان به راست بمانید."),
)

Q(5265, "7.6", town("""
THE SCENE: a town street with one lane in each direction. On the OPPOSITE side of the street a city bus stands at a bus stop and several
passengers are getting off; there is no pedestrian crossing nearby. A young man who has just got off stands at the bus's front corner,
looking across towards our side of the street.
MUST BE CLEARLY VISIBLE: the bus at the stop on the other side, the passengers getting off, the young man by the bus's front.
MUST NOT APPEAR: crossings, signs, text."""),
  "En bus holder ved stoppestedet i den modsatte side af vejen, og passagerer stiger af. Hvordan forholder du dig?",
  "A bus is standing at the stop on the opposite side of the road, and passengers are getting off. What do you do?",
  "اتوبوسی در ایستگاه آن طرف خیابان ایستاده و مسافرها پیاده می‌شوند. چه می‌کنید؟",
  S(True, "Jeg sænker farten og er klar til at standse, fordi passagerer kan gå ud på vejen foran bussen.",
    "I slow down and am ready to stop, because passengers may step out onto the road in front of the bus.",
    "سرعتم را کم می‌کنم و آماده‌ی توقفم، چون ممکن است مسافرها از جلوی اتوبوس وارد خیابان شوند.",
    "Når du nærmer dig en bus, der holder for at afsætte passagerer, skal du holde en passende lav hastighed.",
    "When you approach a bus that is standing to let passengers off, you must keep a suitably low speed.",
    "وقتی به اتوبوسی نزدیک می‌شوید که برای پیاده کردن مسافر ایستاده، باید سرعت مناسبِ کمی داشته باشید."),
  S(False, "Jeg kan holde farten, fordi bussen holder i den modsatte side.", "I can keep my speed because the bus is on the opposite side.",
    "می‌توانم با همان سرعت ادامه بدهم، چون اتوبوس آن طرف خیابان است.",
    "Passagerer, der skal over vejen, kommer frem foran bussen lige ud i din side.", "Passengers crossing the road come out in front of the bus right into your side.",
    "مسافرانی که می‌خواهند از خیابان رد شوند، از جلوی اتوبوس درست وارد سمت شما می‌شوند."),
  S(False, "Passagererne skal vente, til bussen er kørt, så jeg behøver ikke tage hensyn.", "The passengers have to wait until the bus has left, so I need not take care.",
    "مسافرها باید تا رفتن اتوبوس صبر کنند، پس لازم نیست ملاحظه کنم.",
    "Du skal altid køre, så du kan undgå at ramme en gående, også én, der går ud uden at se sig for.",
    "You must always drive so that you can avoid hitting a pedestrian, also one who steps out without looking.",
    "همیشه باید طوری برانید که بتوانید با عابر برخورد نکنید، حتی اگر بی‌توجه وارد خیابان شود."),
)

Q(5266, "7.6", view("""
THE SCENE: a two-lane country road. About 80 m ahead an ambulance with flashing blue lights and a police car stand partly on the verge
on our side of the road, beside a car that has run into the ditch. A police officer in a high-visibility vest stands at the road edge
waving the traffic slowly past; two people stand by the cars.
MUST BE CLEARLY VISIBLE: the ambulance and the police car with blue lights, the car in the ditch, the officer signalling.
MUST NOT APPEAR: text, injured people, blood."""),
  "Lidt fremme har der været et uheld. En ambulance og politiet holder i vejkanten. Hvordan forholder du dig?",
  "Just ahead there has been an accident. An ambulance and the police are standing at the roadside. What do you do?",
  "کمی جلوتر تصادفی رخ داده است. یک آمبولانس و پلیس کنار جاده ایستاده‌اند. چه می‌کنید؟",
  S(True, "Jeg sænker farten og kører forsigtigt forbi uheldsstedet.", "I slow down and drive carefully past the accident site.",
    "سرعتم را کم می‌کنم و با احتیاط از محل تصادف رد می‌شوم.",
    "Forbi et uheldssted skal du holde en passende lav hastighed.", "Past an accident site you must keep a suitably low speed.",
    "هنگام رد شدن از محل تصادف باید سرعت مناسبِ کمی داشته باشید."),
  S(True, "Jeg følger politibetjentens tegn.", "I follow the police officer's signals.", "از علامت‌های مأمور پلیس پیروی می‌کنم.",
    "Du skal efterkomme politiets anvisninger.", "You must obey the police's directions.", "باید از دستورهای پلیس پیروی کنید."),
  S(True, "Jeg holder øje med folk, der går på vejen ved uheldsstedet.", "I watch out for people walking on the road at the accident site.",
    "مراقب کسانی هستم که در محل تصادف روی جاده راه می‌روند.",
    "Ved et uheldssted kan redningsfolk og andre pludselig gå ud på kørebanen.", "At an accident site rescue workers and others may suddenly step out onto the carriageway.",
    "در محل تصادف، امدادگران و دیگران ممکن است ناگهان وارد سواره‌رو شوند."),
  S(False, "Jeg tager et billede med telefonen, mens jeg kører langsomt forbi.", "I take a picture with my phone while I drive slowly past.",
    "هنگام رد شدن آهسته، با گوشی عکس می‌گیرم.",
    "Du må ikke bruge en håndholdt mobiltelefon under kørslen, og din opmærksomhed skal være på vejen.",
    "You must not use a hand-held phone while driving, and your attention must be on the road.",
    "هنگام رانندگی نباید با گوشیِ در دست کار کنید و حواستان باید به جاده باشد."),
)

Q(5267, "7.6", town("""
THE SCENE: a town street with one lane in each direction. A white delivery van is parked at the right kerb ahead; its sliding side door
on the street side (the van's left side) is open, and the driver is stepping out of it with a stack of parcels in his arms, close to our
lane.
MUST BE CLEARLY VISIBLE: the van with its open sliding door on the street side, the driver with the parcels.
MUST NOT APPEAR: text, brand names."""),
  "En varevogn holder ved kantstenen, og føreren læsser pakker ud af sidedøren i vejsiden. Hvordan forholder du dig?",
  "A van is standing at the kerb, and the driver is unloading parcels from the side door on the street side. What do you do?",
  "یک ون کنار جدول ایستاده و راننده‌اش از در کناریِ سمت خیابان بسته‌ها را بیرون می‌آورد. چه می‌کنید؟",
  S(True, "Jeg holder god afstand til siden, når jeg kører forbi.", "I keep a good distance to the side when I drive past.", "هنگام رد شدن، فاصله‌ی کافی از پهلو نگه می‌دارم.",
    "Føreren kan pludselig træde ud på kørebanen med pakkerne.", "The driver may suddenly step out onto the carriageway with the parcels.",
    "ممکن است راننده با بسته‌ها ناگهان وارد سواره‌رو شود."),
  S(True, "Jeg sænker farten, så jeg kan standse, hvis føreren træder ud foran mig.", "I slow down so that I can stop if the driver steps out in front of me.",
    "سرعتم را کم می‌کنم تا اگر راننده جلویم آمد، بتوانم بایستم.",
    "Han har travlt med pakkerne og ser sig måske ikke for.", "He is busy with the parcels and may not look around.", "او سرگرم بسته‌هاست و ممکن است اطرافش را نگاه نکند."),
  S(False, "Jeg kører tæt forbi, fordi det er føreren, der skal passe på, når han læsser ud i vejsiden.",
    "I drive close past, because it is the driver who must take care when he unloads on the street side.",
    "از نزدیکش رد می‌شوم، چون کسی که در سمت خیابان بار خالی می‌کند باید مراقب باشد.",
    "Han skal passe på, men du skal også tage hensyn og holde afstand.", "He must take care, but you too must show consideration and keep your distance.",
    "او باید مراقب باشد، ولی شما هم باید ملاحظه کنید و فاصله بگیرید."),
)

Q(5268, "7.6", town("""
THE SCENE: a residential street with cars parked along the right kerb. Between two of the parked cars a woman with a pram stands at the
kerb's edge; the front of the pram already sticks out level with the cars' sides, and she looks across the road. There is no pedestrian
crossing.
MUST BE CLEARLY VISIBLE: the woman and the pram between the parked cars.
MUST NOT APPEAR: crossings, signs, text."""),
  "Mellem to parkerede biler står en kvinde med en barnevogn og ser ud til at ville gå over vejen. Der er intet fodgængerfelt. Hvordan forholder du dig?",
  "Between two parked cars a woman with a pram is standing and looks as if she wants to cross the road. There is no pedestrian crossing. What do you do?",
  "بین دو خودروی پارک‌شده زنی با کالسکه ایستاده و به نظر می‌رسد می‌خواهد از خیابان رد شود. گذرگاه عابر پیاده‌ای نیست. چه می‌کنید؟",
  S(True, "Jeg sænker farten og er klar til at standse.", "I slow down and am ready to stop.", "سرعتم را کم می‌کنم و آماده‌ی توقفم.",
    "Hun kan gå ud på vejen, og du skal kunne standse foran enhver hindring, der kan forventes.",
    "She may step out, and you must be able to stop in front of any obstacle that can be expected.",
    "ممکن است وارد خیابان شود و شما باید بتوانید جلوی هر مانعی که انتظارش می‌رود بایستید."),
  S(True, "Barnevognen kommer ud på vejen før kvinden, så jeg holder øje med den.", "The pram comes out onto the road before the woman, so I keep an eye on it.",
    "کالسکه پیش از خودِ زن وارد خیابان می‌شود، پس مراقبش هستم.",
    "Barnevognen skubbes foran og er det første, der kommer frem mellem bilerne.", "The pram is pushed in front and is the first thing to appear between the cars.",
    "کالسکه جلوتر هل داده می‌شود و اولین چیزی است که از بین خودروها بیرون می‌آید."),
  S(False, "Hun skal vente, fordi der ikke er et fodgængerfelt, så jeg kører videre med samme fart.",
    "She has to wait because there is no pedestrian crossing, so I carry on at the same speed.",
    "او باید صبر کند چون گذرگاه نیست، پس با همان سرعت ادامه می‌دهم.",
    "Uanset hvor en gående går over, skal du køre, så du kan undgå at ramme vedkommende.", "Wherever a pedestrian crosses, you must drive so that you can avoid hitting them.",
    "عابر هر جا که از خیابان بگذرد، باید طوری برانید که با او برخورد نکنید."),
  S(False, "Jeg kører tæt ind mod de parkerede biler, så jeg hurtigt kommer forbi.", "I drive close to the parked cars so that I get past quickly.",
    "به خودروهای پارک‌شده نزدیک می‌شوم تا زود رد شوم.",
    "Hold god afstand til de parkerede biler; der kan komme nogen frem mellem dem.", "Keep a good distance from the parked cars; someone may come out between them.",
    "از خودروهای پارک‌شده فاصله بگیرید؛ ممکن است کسی از بینشان بیرون بیاید."),
)

Q(5269, "7.3", town("""
THE SCENE: the entrance to a residential area with houses and gardens. At the right stands a white rectangular sign with a black border
showing, in its upper part, a round speed-limit sign with a red ring and the number 40, and under it the word «Zone» (the Danish zone
sign).
MUST BE CLEARLY VISIBLE: the zone sign with the 40 roundel and the word Zone.
MUST NOT APPEAR: other signs, other text."""),
  "Du kører ind i et boligområde forbi denne tavle. Hvad gælder?",
  "You drive into a residential area past this sign. What applies?",
  "از کنار این تابلو وارد یک محله‌ی مسکونی می‌شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må højst køre 40 km/t på vejene i området, medmindre andet er skiltet.", "I may drive at most 40 km/h on the roads in the area, unless other signs say otherwise.",
    "در راه‌های این محدوده حداکثر ۴۰ کیلومتر بر ساعت مجازم، مگر تابلوی دیگری چیز دیگری بگوید.",
    "En zonetavle gælder i hele området; lokal skiltning inde i området kan dog fravige den.",
    "A zone sign applies in the whole area; local signs inside the area can depart from it, though.",
    "تابلوی منطقه در تمام محدوده برقرار است؛ البته تابلوهای محلی داخل محدوده می‌توانند از آن مستثنا کنند."),
  S(True, "Grænsen gælder, indtil jeg kører forbi en tavle, der viser, at zonen ophører.", "The limit applies until I pass a sign showing that the zone ends.",
    "این حد تا رسیدن به تابلویی که پایان منطقه را نشان دهد برقرار است.",
    "Zonetavlens bestemmelser gælder, indtil de ophæves af tavlen for zonens ophør.", "The zone sign's rules apply until they are ended by the end-of-zone sign.",
    "مقررات تابلوی منطقه تا تابلوی پایان منطقه برقرارند."),
  S(False, "Grænsen gælder kun til det første vejkryds.", "The limit only applies until the first junction.", "این حد فقط تا اولین تقاطع است.",
    "En zonetavle gælder også efter krydsene inde i området.", "A zone sign also applies after the junctions inside the area.",
    "تابلوی منطقه پس از تقاطع‌های داخل محدوده هم برقرار است."),
  S(False, "40 km/t er kun en anbefaling.", "40 km/h is only a recommendation.", "۴۰ کیلومتر بر ساعت فقط توصیه است.",
    "Den røde kant viser en hastighedsgrænse, ikke en anbefaling.", "The red border shows a speed limit, not a recommendation.",
    "حاشیه‌ی قرمز حد سرعت را نشان می‌دهد، نه توصیه."),
)

Q(5270, "7.3", view("""
THE SCENE: a two-lane country road in winter. Snow lies on the fields and the verges, and the road surface shows packed snow and icy
patches. A round speed-limit sign with a red border and the number 80 stands at the right. A car drives ahead at a distance.
MUST BE CLEARLY VISIBLE: the snowy, icy road surface, the 80 sign, the car ahead.
MUST NOT APPEAR: text other than 80.""", cond="winter, packed snow and ice patches on the road, grey sky, good visibility"),
  "Det har sneet, og vejen er glat. Hastighedsgrænsen er 80 km/t. Hvordan forholder du dig?",
  "It has snowed and the road is slippery. The speed limit is 80 km/h. What do you do?",
  "برف باریده و جاده لغزنده است. حد سرعت ۸۰ کیلومتر بر ساعت است. چه می‌کنید؟",
  S(True, "Jeg kører langsommere, end grænsen tillader.", "I drive more slowly than the limit allows.", "آهسته‌تر از حدِ مجاز می‌رانم.",
    "I vådt, glat eller fedtet føre skal du holde en passende lav hastighed.", "On wet, slippery or greasy roads you must keep a suitably low speed.",
    "در جاده‌ی خیس، لغزنده یا چرب باید سرعت مناسبِ کمی داشته باشید."),
  S(True, "Jeg holder større afstand til bilen foran.", "I keep a greater distance to the car in front.", "فاصله‌ام را با خودروی جلویی بیشتر می‌کنم.",
    "På glat vej bliver bremselængden meget længere.", "On a slippery road the braking distance becomes much longer.", "در جاده‌ی لغزنده مسافت ترمز خیلی بیشتر می‌شود."),
  S(True, "Jeg bremser, drejer og accelererer blødt.", "I brake, steer and accelerate gently.", "نرم ترمز می‌کنم، فرمان می‌دهم و گاز می‌دهم.",
    "Bratte bevægelser kan få hjulene til at miste grebet.", "Abrupt movements can make the wheels lose their grip.",
    "حرکت‌های ناگهانی ممکن است چسبندگی چرخ‌ها را از بین ببرند."),
  S(False, "Så længe jeg kører under 80 km/t, kører jeg efter reglerne.", "As long as I drive below 80 km/h, I am following the rules.",
    "تا وقتی زیر ۸۰ کیلومتر بر ساعت برانم، طبق قوانین رانده‌ام.",
    "Hastigheden skal altid passe til forholdene; grænsen er kun det højeste, du må køre.", "Your speed must always suit the conditions; the limit is only the most you may drive.",
    "سرعت باید همیشه با شرایط جور باشد؛ حد سرعت فقط بیشترین مقدار مجاز است."),
)

Q(5271, "7.3", view("""
THE SCENE: a narrow country road between meadows. About 50 m ahead a farmer is driving a small herd of brown-and-white cows across the
road from one field gate to another; some cows are on the road, others still in the gateway.
MUST BE CLEARLY VISIBLE: the cows on the road, the farmer, the two field gates.
MUST NOT APPEAR: signs, text."""),
  "En landmand driver nogle køer over vejen foran dig. Hvordan forholder du dig?",
  "A farmer is driving some cows across the road in front of you. What do you do?",
  "کشاورزی چند گاو را جلوی شما از عرض جاده رد می‌کند. چه می‌کنید؟",
  S(True, "Jeg sænker farten og standser, indtil vejen er fri.", "I slow down and stop until the road is clear.", "سرعتم را کم می‌کنم و تا خالی شدن جاده می‌ایستم.",
    "Når du nærmer dig kreaturer på vejen, skal du holde en passende lav hastighed og om nødvendigt standse.",
    "When you approach cattle on the road, you must keep a suitably low speed and stop if necessary.",
    "وقتی به دام روی جاده نزدیک می‌شوید، باید سرعت مناسبِ کمی داشته باشید و در صورت لزوم بایستید."),
  S(False, "Jeg kører langsomt ind mellem køerne, så de går til side.", "I drive slowly in among the cows so that they move aside.", "آهسته بین گاوها می‌رانم تا کنار بروند.",
    "Dyrene kan blive bange og løbe ind i bilen; vent, til de er kommet over.", "The animals may get frightened and run into the car; wait until they have crossed.",
    "حیوان‌ها ممکن است بترسند و به خودرو بخورند؛ صبر کنید تا رد شوند."),
  S(False, "Jeg kører forbi i den modsatte vognbane, mens køerne går over.", "I drive past in the opposite lane while the cows are crossing.",
    "در حالی که گاوها رد می‌شوند، از خط مقابل عبور می‌کنم.",
    "Køerne går over hele vejen; vent, til vejen er fri.", "The cows are crossing the whole road; wait until it is clear.",
    "گاوها از تمام عرض جاده رد می‌شوند؛ صبر کنید تا جاده خالی شود."),
  S(False, "Jeg kører videre, for det er landmanden, der skal holde køerne tilbage for trafikken.", "I drive on, as it is the farmer who must hold the cows back for the traffic.",
    "ادامه می‌دهم، چون کشاورز باید گاوها را برای ترافیک نگه دارد.",
    "Du skal tage hensyn til dyrene på vejen og om nødvendigt standse.", "You must take care of the animals on the road and stop if necessary.",
    "باید مراقب حیوان‌های روی جاده باشید و در صورت لزوم بایستید."),
)

Q(5272, "7.3", view("""
THE SCENE: a wide road with two lanes in each direction and a central reservation with a crash barrier, outside town (a Danish
motor-traffic road). At the right stands a round speed-limit sign with a red border and the number 90. In the interior rear-view mirror
at the top of the picture, a light box trailer is seen hitched behind our car.
MUST BE CLEARLY VISIBLE: the 90 sign, the divided road, the trailer in the rear-view mirror.
MUST NOT APPEAR: other text, other signs."""),
  "Du kører med en trailer, der er godkendt til 100 km/t på motorvej. Nu kører du på en motortrafikvej, hvor grænsen er skiltet til 90 km/t. Hvad gælder?",
  "You are towing a trailer that is approved for 100 km/h on motorways. Now you are on a motor-traffic road where the limit is signed at 90 km/h. What applies?",
  "تریلری می‌کشید که برای ۱۰۰ کیلومتر بر ساعت در آزادراه تأیید شده است. حالا در یک «جاده‌ی ویژه‌ی موتوری» (motortrafikvej) هستید که حد سرعتش با تابلو ۹۰ است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må højst køre 80 km/t.", "I may drive at most 80 km/h.", "حداکثر ۸۰ کیلومتر بر ساعت مجازم.",
    "Bil med påhængskøretøj må højst køre 80 km/t; 100 km/t gælder kun på motorvej for et godkendt vogntog.",
    "A car with a trailer may drive at most 80 km/h; 100 km/h only applies on motorways to an approved combination.",
    "خودرو با یدک حداکثر ۸۰ کیلومتر بر ساعت مجاز است؛ ۱۰۰ فقط در آزادراه و برای مجموعه‌ی تأییدشده است."),
  S(True, "Godkendelsen til 100 km/t gælder kun på motorvej.", "The approval for 100 km/h only applies on motorways.", "تأییدیه‌ی ۱۰۰ کیلومتر بر ساعت فقط برای آزادراه است.",
    "Med en Tempo 100-godkendelse må du køre 100 km/t med trailer på motorvejen.", "With a Tempo 100 approval you may drive 100 km/h with a trailer on the motorway.",
    "با تأییدیه‌ی «تمپو ۱۰۰» می‌توانید در آزادراه با تریلر ۱۰۰ کیلومتر بر ساعت برانید."),
  S(False, "Jeg må køre 90 km/t, fordi tavlen viser 90.", "I may drive 90 km/h because the sign shows 90.", "چون تابلو ۹۰ نشان می‌دهد، می‌توانم ۹۰ برانم.",
    "Tavlen gælder den almindelige trafik; med trailer gælder din egen grænse på 80 km/t.", "The sign applies to ordinary traffic; with a trailer your own limit of 80 km/h applies.",
    "تابلو برای ترافیک عادی است؛ با تریلر حد خودتان یعنی ۸۰ برقرار است."),
  S(False, "Jeg må køre 100 km/t, fordi traileren er godkendt til det.", "I may drive 100 km/h because the trailer is approved for it.",
    "چون تریلر تأیید شده، می‌توانم ۱۰۰ برانم.",
    "100 km/t med trailer er kun tilladt på motorvej.", "100 km/h with a trailer is only allowed on motorways.", "۱۰۰ کیلومتر بر ساعت با تریلر فقط در آزادراه مجاز است."),
)

Q(5273, "1.2", picture("""
A close-up of a car's instrument panel while driving: among the dials, a red warning lamp shaped like an old-fashioned oil can with a
drop falling from its spout lights up brightly. All other warning lamps are dark.
MUST BE CLEARLY VISIBLE: the red oil-can warning lamp, lit.
MUST NOT APPEAR: text, numbers on the dials, brand names, other lit lamps."""),
  "Under kørslen begynder denne røde advarselslampe at lyse. Hvad gør du?",
  "While you are driving, this red warning lamp lights up. What do you do?",
  "در حین رانندگی این چراغ هشدار قرمز روشن می‌شود. چه می‌کنید؟",
  S(True, "Jeg standser, så snart det kan ske uden fare, og slukker motoren.", "I stop as soon as it can be done safely and switch off the engine.",
    "به محض این‌که بی‌خطر ممکن باشد می‌ایستم و موتور را خاموش می‌کنم.",
    "Lampen viser for lavt olietryk, og motoren kan tage alvorlig skade, hvis du kører videre.",
    "The lamp shows that the oil pressure is too low, and the engine can be badly damaged if you drive on.",
    "این چراغ فشار کم روغن را نشان می‌دهد و اگر ادامه بدهید ممکن است موتور آسیب جدی ببیند."),
  S(False, "Jeg kører videre til næste service, for lampen er kun en påmindelse.", "I drive on until the next service, as the lamp is only a reminder.",
    "تا سرویس بعدی ادامه می‌دهم، چون این چراغ فقط یادآوری است.",
    "En rød advarselslampe betyder som regel, at du skal standse.", "A red warning lamp usually means that you must stop.", "چراغ هشدار قرمز معمولاً یعنی باید بایستید."),
  S(True, "Jeg kontrollerer oliestanden eller får hjælp, før jeg kører videre.", "I check the oil level or get help before I drive on.",
    "پیش از ادامه دادن، سطح روغن را بررسی می‌کنم یا کمک می‌گیرم.",
    "Er der for lidt olie, skal der fyldes på; ellers kan fejlen være alvorlig.", "If there is too little oil, it must be topped up; otherwise the fault may be serious.",
    "اگر روغن کم باشد باید اضافه شود؛ وگرنه ممکن است ایراد جدی باشد."),
  S(False, "Røde og gule advarselslamper betyder det samme.", "Red and yellow warning lamps mean the same.", "چراغ‌های هشدار قرمز و زرد یک معنی دارند.",
    "Rød betyder som regel en alvorlig fejl, hvor du skal standse; gul, at noget skal efterses snart.",
    "Red usually means a serious fault where you must stop; yellow that something must be checked soon.",
    "قرمز معمولاً یعنی ایراد جدی و باید بایستید؛ زرد یعنی چیزی باید به‌زودی بررسی شود."),
)

Q(5274, "1.2", picture("""
A family car seen from the side, parked in a driveway on a sunny day: five people stand beside it with suitcases, the boot is open and
full of bags, and a long roof box is fixed on the roof.
MUST BE CLEARLY VISIBLE: the car, the roof box, the full boot, the five people with luggage.
MUST NOT APPEAR: text, number plates with readable characters, brand names."""),
  "Du skal på ferie med fem personer, meget bagage og en tagboks. Hvad gælder?",
  "You are going on holiday with five people, a lot of luggage and a roof box. What applies?",
  "با پنج نفر، بار زیاد و یک باکس سقفی به تعطیلات می‌روید. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen må ikke veje mere end den tilladte totalvægt, som står i registreringsattesten.",
    "The car must not weigh more than the permitted total weight shown in the registration certificate.",
    "وزن خودرو نباید از وزن کل مجازی که در برگه‌ی ثبت خودرو آمده بیشتر شود.",
    "Den tilladte totalvægt er bilen med fører, passagerer og last; den må ikke overskrides.",
    "The permitted total weight is the car with driver, passengers and load; it must not be exceeded.",
    "وزن کل مجاز یعنی خودرو با راننده، سرنشینان و بار؛ نباید از آن بیشتر شود."),
  S(True, "Tagboksen må ikke lastes tungere end bilens største tilladte taglast.", "The roof box must not be loaded heavier than the car's maximum permitted roof load.",
    "باکس سقفی نباید سنگین‌تر از حداکثر بار مجاز سقف خودرو بار شود.",
    "Den største taglast står i bilens instruktionsbog.", "The maximum roof load is given in the car's handbook.", "حداکثر بار سقف در دفترچه‌ی راهنمای خودرو آمده است."),
  S(True, "Med tung last og tagboks bliver bilen mere følsom over for sidevind og i sving.", "With a heavy load and a roof box the car becomes more sensitive to side wind and in bends.",
    "با بار سنگین و باکس سقفی، خودرو در برابر باد جانبی و در پیچ‌ها حساس‌تر می‌شود.",
    "Tyngdepunktet kommer højere op, og bilen bliver tungere at bremse.", "The centre of gravity moves up and the car takes longer to stop.",
    "مرکز ثقل بالاتر می‌رود و ترمز کردن خودرو سخت‌تر می‌شود."),
  S(False, "Jeg må overskride totalvægten lidt, hvis jeg kører langsomt.", "I may exceed the total weight a little if I drive slowly.",
    "اگر آهسته برانم، می‌توانم کمی از وزن کل بیشتر بار کنم.",
    "Den tilladte totalvægt må ikke overskrides, uanset farten.", "The permitted total weight must not be exceeded, whatever the speed.",
    "وزن کل مجاز در هیچ سرعتی نباید رد شود."),
)

Q(5275, "1.2", view("""
THE SCENE: the view through the windscreen in rain at dusk. The wiper blades leave broad smeared streaks across the glass, so the road
ahead and the headlights of an oncoming car are blurred and glaring.
MUST BE CLEARLY VISIBLE: the streaks left by the wipers, the blurred road and the glare of the oncoming lights.
MUST NOT APPEAR: text.""", cond="rain at dusk, wet road"),
  "Det regner, og viskerbladene efterlader striber på forruden. Hvad gør du?",
  "It is raining and the wiper blades leave streaks on the windscreen. What do you do?",
  "باران می‌بارد و تیغه‌های برف‌پاک‌کن روی شیشه‌ی جلو رگه به جا می‌گذارند. چه می‌کنید؟",
  S(True, "Jeg får skiftet viskerbladene, så jeg kan se ordentligt.", "I have the wiper blades replaced so that I can see properly.",
    "تیغه‌های برف‌پاک‌کن را عوض می‌کنم تا درست ببینم.",
    "Slidte viskerblade giver dårligt udsyn, især i mørke og modlys.", "Worn wiper blades give poor visibility, especially in the dark and against the light.",
    "تیغه‌های فرسوده دید را بد می‌کنند، به‌خصوص در تاریکی و نور روبه‌رو."),
  S(True, "Indtil da kører jeg langsommere, fordi jeg ser dårligere.", "Until then I drive more slowly because I can see less well.",
    "تا آن موقع آهسته‌تر می‌رانم، چون دیدم کمتر است.",
    "Når sigtbarheden er nedsat, skal du holde en passende lav hastighed.", "When visibility is reduced, you must keep a suitably low speed.",
    "وقتی دید کم است، باید سرعت مناسبِ کمی داشته باشید."),
  S(False, "Det gør ikke noget, så længe viskerne bevæger sig.", "It does not matter as long as the wipers move.", "تا وقتی برف‌پاک‌کن‌ها کار می‌کنند، مهم نیست.",
    "Viskerne skal fjerne vandet, så du har frit udsyn; striber gør det svært at se.", "The wipers must remove the water so that you have a clear view; streaks make it hard to see.",
    "برف‌پاک‌کن باید آب را پاک کند تا دید شما آزاد باشد؛ رگه‌ها دیدن را سخت می‌کنند."),
  S(True, "Om vinteren bruger jeg sprinklervæske, der tåler frost.", "In winter I use screen wash that can stand frost.", "در زمستان از مایع شیشه‌شوی ضدیخ استفاده می‌کنم.",
    "Almindeligt vand kan fryse i beholderen og på ruden.", "Plain water can freeze in the reservoir and on the glass.", "آب معمولی ممکن است در مخزن و روی شیشه یخ بزند."),
)
