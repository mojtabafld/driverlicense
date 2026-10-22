# «آزمون جدید», batch 6 (5501–5600), part a: stopping and parking (7.18), overtaking (7.9), signs (6.1), people and animals
# beside the road (7.6), speed (7.3).
# Rules: Færdselsloven §§ 2 nr. 18 (parking: any leaving of a vehicle, with or without the driver; stops under 3 minutes and
# for people or goods getting on or off are not), 3 stk. 2, 5 stk. 1–2 (special care at level crossings; no crossing when a
# signal shows stop or the barriers are closed, closing or opening), 7 stk. 6 (free passage for groups of children under a leader's
# supervision, funeral and other closed processions), 12 (a procession on the road in lighting-up time: a white or yellow
# lamp in front towards the middle of the road, a red lamp at the back), 20 (the one with the obstruction on his side
# waits), 21 stk. 1 (overtaking on the left; on the right of a vehicle turning left) and stk. 3 nr. 1, 24 stk. 1 (passing
# in another lane is not overtaking only in dense traffic in rows), 27 stk. 7, 28 stk. 4 (a vehicle left must be secured
# against use by others), 32 stk. 1; Bekendtgørelse om vejafmærkning (BEK 425/2023): § 18 stk. 2–3 (bans up to the next
# junction; «Ærindekørsel tilladt»: delivering, collecting, work, shopping, visits and the like, parking for it, driving to
# one's own home or business), B 13, B 16 (no parking on the carriageway outside built-up areas), UB 11,1 (advance warning
# of a stop sign with the distance), UB 11,3 (light rail in both directions on the crossing road), A 33, A 34, A 73,
# C 22,1, C 62, Q 44 (crossed only where e.g. a stopped or parked vehicle makes it necessary, with special care), Q 46
# (crossed by slow vehicles for a short stretch to ease overtaking, and to pass a left-turner on the right unless the lane
# beyond it is a special lane), stopping and parking forbidden in special lanes (cycle lanes) other than parking lanes;
# FDM on bays for electric cars (petrol and diesel cars may neither stop nor park; the signs decide, not the charger).
from nq import Q, S, above, picture, town, view

Q(5501, "7.18", picture("""
A small car parked at the kerb in front of a little shop, seen from the pavement through its open driver's door: the key is in the
ignition, the dashboard lights are on and a little exhaust comes from the back (the engine is running), and the driver's seat is
empty; through the shop window a person can be seen at the counter.
MUST BE CLEARLY VISIBLE: the key in the ignition, the empty driver's seat, the running engine.
MUST NOT APPEAR: text, brand names, number-plate characters."""),
  "Du skal lige hurtigt ind i en butik. Du lader motoren køre og nøglen sidde i bilen. Hvad gælder?",
  "You are just popping into a shop. You leave the engine running and the key in the car. What applies?",
  "فقط برای چند لحظه به مغازه‌ای می‌روید و موتور را روشن و سوییچ را داخل خودرو می‌گذارید. چه قاعده‌ای برقرار است؟",
  S(False, "Det er i orden, når jeg kun er væk et par minutter.", "It is fine when I am only away for a couple of minutes.",
    "وقتی فقط چند دقیقه دور می‌شوم، اشکالی ندارد.",
    "Når du forlader bilen, skal den være sikret mod at blive brugt af andre, også hvis du kun er væk kort tid.",
    "When you leave the car, it must be secured against use by others, even if you are only away for a short time.",
    "وقتی از خودرو دور می‌شوید، باید در برابر استفاده‌ی دیگران ایمن باشد، حتی اگر کوتاه‌مدت دور شوید."),
  S(True, "Bilen skal være sikret, så ingen andre kan køre væk i den, når jeg forlader den.",
    "The car must be secured so that nobody else can drive off in it when I leave it.",
    "وقتی از خودرو دور می‌شوم، باید طوری ایمن باشد که کس دیگری نتواند با آن برود.",
    "Et køretøj, som føreren forlader, skal være sikret mod at blive brugt af uvedkommende.",
    "A vehicle that the driver leaves must be secured against use by unauthorised persons.",
    "وسیله‌ای که راننده ترکش می‌کند باید در برابر استفاده‌ی افراد غیرمجاز ایمن باشد."),
  S(True, "Jeg slukker motoren, tager nøglen med og låser bilen.", "I switch off the engine, take the key with me and lock the car.",
    "موتور را خاموش می‌کنم، سوییچ را با خودم می‌برم و در را قفل می‌کنم.",
    "Så kan bilen hverken køre af sted eller blive stjålet.", "Then the car can neither move off nor be stolen.",
    "این‌طور خودرو نه راه می‌افتد و نه دزدیده می‌شود."),
  S(False, "Så længe jeg kan se bilen gennem butiksvinduet, er den sikret.", "As long as I can see the car through the shop window, it is secured.",
    "تا وقتی خودرو را از پشت ویترین مغازه می‌بینم، ایمن است.",
    "Du kan ikke nå at forhindre, at nogen sætter sig ind og kører, når nøglen sidder i.",
    "You cannot stop someone getting in and driving off when the key is in it.",
    "وقتی سوییچ داخل خودروست، نمی‌توانید جلوی کسی را بگیرید که سوار شود و برود."),
)

Q(5502, "7.18", picture("""
A town street seen from the pavement: at the kerb stands a round sign with a blue field, a red border and one red diagonal bar (the
Danish no-parking sign) with no plate under it; just past the sign a car stands at the kerb with its engine running (a little
exhaust at the back), and the driver sits behind the wheel, waiting.
MUST BE CLEARLY VISIBLE: the no-parking sign, the car just past it, the driver waiting in the car.
MUST NOT APPEAR: other signs, text, number-plate characters."""),
  "Du holder ved kantstenen lige efter denne tavle og venter i bilen i 10 minutter på en ven. Hvad gælder?",
  "You stop at the kerb just past this sign and wait in the car for 10 minutes for a friend. What applies?",
  "درست بعد از این تابلو کنار جدول می‌ایستید و ۱۰ دقیقه داخل خودرو منتظر یک دوست می‌مانید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er parkering, selv om jeg bliver siddende i bilen.", "It is parking even though I stay in the car.",
    "حتی اگر داخل خودرو بنشینم، این پارک کردن حساب می‌شود.",
    "Parkering er enhver hensætning af et køretøj, med eller uden fører; kun standsning i under 3 minutter og for at lade folk "
    "stige ind eller ud eller for at læsse er ikke parkering.",
    "Parking is any leaving of a vehicle, with or without the driver; only stops under 3 minutes and stops to let people get in or out "
    "or to load are not parking.",
    "پارک یعنی هر بار نگه داشتن وسیله، با راننده یا بدون او؛ فقط توقف کمتر از ۳ دقیقه و توقف برای سوار و پیاده شدن یا بار زدن پارک "
    "حساب نمی‌شود."),
  S(True, "Jeg må ikke vente her så længe, fordi tavlen forbyder parkering.", "I must not wait here that long, because the sign bans parking.",
    "نباید این‌قدر این‌جا منتظر بمانم، چون این تابلو پارک را ممنوع می‌کند.",
    "Parkeringsforbuddet gælder i denne side af vejen fra tavlen og frem til næste vejkryds.",
    "The parking ban applies on this side of the road from the sign up to the next junction.",
    "ممنوعیت پارک در این سمت جاده از تابلو تا تقاطع بعدی برقرار است."),
  S(True, "Kommer min ven ud med det samme, må jeg gerne holde et øjeblik og lade ham stige ind.",
    "If my friend comes out straight away, I may stop for a moment to let him get in.",
    "اگر دوستم فوراً بیرون بیاید، می‌توانم لحظه‌ای بایستم تا سوار شود.",
    "En kort standsning for at lade en passager stige ind er ikke parkering.", "A short stop to let a passenger get in is not parking.",
    "توقف کوتاه برای سوار شدن مسافر پارک حساب نمی‌شود."),
  S(False, "Det er kun parkering, når føreren forlader bilen.", "It is only parking when the driver leaves the car.",
    "فقط وقتی راننده خودرو را ترک کند، پارک حساب می‌شود.",
    "Det er også parkering, når føreren bliver i bilen.", "It is also parking when the driver stays in the car.",
    "وقتی راننده داخل خودرو بماند هم پارک است."),
)

Q(5503, "7.18", view("""
THE SCENE: a country road on a hot, dry summer day; on the right a wide verge of tall, dry, yellow grass where we are about to pull
in and park (our right indicator lamp glows on the dashboard strip); further ahead on the right lies a small gravel lay-by.
MUST BE CLEARLY VISIBLE: the tall dry grass on the verge, the gravel lay-by further ahead.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="hot sunny summer day, dry road"),
  "Det er en varm og tør sommerdag. Du vil parkere i højt, tørt græs ved siden af vejen. Hvad skal du være opmærksom på?",
  "It is a hot, dry summer day. You want to park in tall, dry grass beside the road. What must you be aware of?",
  "یک روز گرم و خشک تابستانی است. می‌خواهید در علف‌های بلند و خشکِ کنار جاده پارک کنید. به چه چیزی باید توجه کنید؟",
  S(True, "Den varme udstødning og katalysatoren under bilen kan antænde græsset.",
    "The hot exhaust and the catalytic converter under the car can set the grass on fire.",
    "اگزوز داغ و کاتالیزور زیر خودرو می‌توانند علف را آتش بزنند.",
    "Udstødningssystemet bliver meget varmt under kørslen.", "The exhaust system gets very hot while driving.",
    "سیستم اگزوز هنگام رانندگی خیلی داغ می‌شود."),
  S(True, "Jeg vælger hellere et sted med asfalt eller grus.", "I would rather choose a place with asphalt or gravel.",
    "ترجیح می‌دهم جایی با آسفالت یا شن انتخاب کنم.",
    "Så er der ikke noget tørt græs under bilen, der kan bryde i brand.", "Then there is no dry grass under the car that can catch fire.",
    "این‌طور زیر خودرو علف خشکی نیست که آتش بگیرد."),
  S(False, "Der er kun risiko for brand, mens motoren kører.", "There is only a risk of fire while the engine is running.",
    "فقط تا وقتی موتور روشن است، خطر آتش‌سوزی هست.",
    "Udstødningen er stadig varm et stykke tid, efter at motoren er slukket.",
    "The exhaust stays hot for a while after the engine has been switched off.",
    "اگزوز تا مدتی بعد از خاموش شدن موتور هنوز داغ است."),
)

Q(5504, "7.18", town("""
THE SCENE: a car park with bays marked by white lines, seen from the driver's seat; the only free bay, straight ahead, has a charging
post beside it and is marked by a blue square parking sign with a white «P», with a white plate under it showing a black symbol of a
charging cable with its plug; all the other bays are taken.
MUST BE CLEARLY VISIBLE: the free bay, the charging post, the P sign with the charging-cable plate.
MUST NOT APPEAR: other signs, any text except the P on the sign, brand names."""),
  "Du kører i en benzinbil. Den eneste ledige plads er afmærket med en P-tavle med et symbol for et ladekabel. Hvad gælder?",
  "You are driving a petrol car. The only free space is marked with a P sign with the symbol of a charging cable. What applies?",
  "با خودروی بنزینی هستید. تنها جای خالی با تابلوی P و نماد کابل شارژ مشخص شده است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må hverken standse eller parkere på pladsen.", "I may neither stop nor park in the space.",
    "در آن جای پارک نه می‌توانم توقف کنم و نه پارک.",
    "Pladsen er forbeholdt elbiler og plugin-hybrider; benzin- og dieselbiler må hverken standse eller parkere der.",
    "The space is reserved for electric cars and plug-in hybrids; petrol and diesel cars may neither stop nor park there.",
    "این جا مخصوص خودروهای برقی و هیبریدی‌های شارژی است؛ خودروهای بنزینی و دیزلی نه می‌توانند آن‌جا توقف کنند و نه پارک."),
  S(False, "Jeg må holde der et par minutter, hvis jeg bliver i bilen.", "I may stand there for a couple of minutes if I stay in the car.",
    "اگر داخل خودرو بمانم، می‌توانم چند دقیقه آن‌جا بایستم.",
    "En benzinbil må heller ikke standse på pladsen.", "A petrol car may not stop in the space either.",
    "خودروی بنزینی حتی توقف کوتاه هم آن‌جا مجاز نیست."),
  S(False, "Det er ladestanderen, ikke skiltningen, der afgør, om pladsen er forbeholdt elbiler.",
    "It is the charging post, not the signs, that decides whether the space is reserved for electric cars.",
    "این ایستگاه شارژ است، نه تابلو، که تعیین می‌کند آن جا مخصوص خودروی برقی باشد.",
    "Det er skiltningen og afmærkningen, der afgør det.", "It is the signs and markings that decide it.",
    "این را تابلو و خط‌کشی تعیین می‌کنند."),
  S(False, "Om aftenen må alle biler parkere på pladsen.", "In the evening all cars may park in the space.",
    "عصرها همه‌ی خودروها می‌توانند آن‌جا پارک کنند.",
    "Står der ingen tider på tavlen, gælder den hele døgnet.", "If there are no times on the sign, it applies around the clock.",
    "اگر روی تابلو ساعتی نیامده باشد، در تمام شبانه‌روز معتبر است."),
)

Q(5505, "7.18", town("""
THE SCENE: a town street with one lane in our direction; along the right kerb runs a painted cycle lane, separated from our lane by a
broad unbroken white line, with white bicycle symbols painted in it; in the right door mirror (at the right edge of the picture) two
cyclists approach in the cycle lane; our right indicator lamp glows on the dashboard strip.
MUST BE CLEARLY VISIBLE: the cycle lane with its broad line and bicycle symbols, the cyclists in the mirror.
MUST NOT APPEAR: signs, text."""),
  "Langs kantstenen er der en cykelbane, adskilt fra din vognbane med en bred hvid linje. Du vil standse et øjeblik og lade en "
  "passager stige ud. Hvad gælder?",
  "Along the kerb there is a cycle lane, separated from your lane by a broad white line. You want to stop for a moment and let a "
  "passenger out. What applies?",
  "کنار جدول یک خط دوچرخه هست که با خطی سفید و پهن از خط شما جدا شده است. می‌خواهید لحظه‌ای بایستید تا مسافری پیاده شود. "
  "چه قاعده‌ای برقرار است؟",
  S(False, "Jeg må standse i cykelbanen, når det kun er et øjeblik.", "I may stop in the cycle lane when it is only for a moment.",
    "وقتی فقط برای یک لحظه است، می‌توانم در خط دوچرخه بایستم.",
    "Standsning og parkering i en cykelbane er forbudt, også i kort tid.",
    "Stopping and parking in a cycle lane are forbidden, even for a short time.",
    "توقف و پارک در خط دوچرخه ممنوع است، حتی کوتاه‌مدت."),
  S(True, "Jeg kører videre til et sted, hvor jeg lovligt kan standse.", "I drive on to a place where I can stop legally.",
    "تا جایی ادامه می‌دهم که بتوانم قانونی توقف کنم.",
    "Cykelbanen er en særlig bane for cyklister, og der må du ikke standse.",
    "The cycle lane is a special lane for cyclists, and you must not stop there.",
    "خط دوچرخه مسیر ویژه‌ی دوچرخه‌سواران است و نباید در آن توقف کنید."),
  S(True, "Når en passager stiger ud mod cykelbanen, kan en cyklist blive ramt af døren.",
    "When a passenger gets out on the cycle-lane side, a cyclist may be hit by the door.",
    "وقتی مسافری از سمت خط دوچرخه پیاده می‌شود، ممکن است در به دوچرخه‌سواری بخورد.",
    "Cyklisterne kører tæt forbi, og døren kan åbnes lige foran dem.", "The cyclists pass close by, and the door can open right in front of them.",
    "دوچرخه‌سواران از نزدیک رد می‌شوند و در ممکن است درست جلوی آن‌ها باز شود."),
  S(True, "Før jeg trækker ind til kanten et andet sted, ser jeg efter cyklister bagfra.",
    "Before I pull in to the edge somewhere else, I look for cyclists coming from behind.",
    "پیش از آن‌که جای دیگری کنار بکشم، دوچرخه‌سوارانی را که از پشت می‌آیند می‌پایم.",
    "Du skal sikre dig, at du ikke er til fare for cyklister, når du trækker ind.",
    "You must make sure that you are no danger to cyclists when you pull in.",
    "باید مطمئن شوید که هنگام کنار کشیدن برای دوچرخه‌سواران خطری ندارید."),
)

Q(5506, "7.18", town("""
THE SCENE: a wide shopping street in a town with one lane in each direction; on the right pavement stands a square sign turned on its
corner: a yellow diamond with a white border (the Danish main-road sign); along the right kerb there is free space, with no other signs
and no yellow lines.
MUST BE CLEARLY VISIBLE: the main-road sign, the free space at the kerb, the town buildings.
MUST NOT APPEAR: other signs, yellow lines, text."""),
  "Inde i byen kører du på en vej med denne tavle. Du vil parkere ved kantstenen. Der er ingen andre tavler eller gule linjer. "
  "Hvad gælder?",
  "In town you are driving on a road with this sign. You want to park at the kerb. There are no other signs or yellow lines. "
  "What applies?",
  "داخل شهر در جاده‌ای با این تابلو رانندگی می‌کنید. می‌خواهید کنار جدول پارک کنید. تابلو یا خط زرد دیگری نیست. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må gerne parkere her, når det i øvrigt kan ske lovligt.", "I may park here when it can otherwise be done legally.",
    "اگر از جهات دیگر قانونی باشد، می‌توانم این‌جا پارک کنم.",
    "Forbuddet mod at parkere på hovedvejens kørebane gælder kun uden for tættere bebygget område.",
    "The ban on parking on a main road's carriageway only applies outside built-up areas.",
    "ممنوعیت پارک روی سواره‌روی جاده‌ی اصلی فقط بیرون از محدوده‌ی شهری برقرار است."),
  S(False, "Det er forbudt at parkere på kørebanen på alle hovedveje.", "Parking on the carriageway is forbidden on all main roads.",
    "پارک روی سواره‌روی همه‌ی جاده‌های اصلی ممنوع است.",
    "Forbuddet gælder kun hovedveje uden for tættere bebygget område.", "The ban only applies to main roads outside built-up areas.",
    "این ممنوعیت فقط برای جاده‌های اصلی بیرون از محدوده‌ی شهری است."),
  S(False, "Jeg må kun standse her, ikke parkere.", "I may only stop here, not park.", "این‌جا فقط می‌توانم توقف کنم، نه پارک.",
    "Inde i byen forbyder tavlen ikke parkering.", "In town the sign does not ban parking.",
    "داخل شهر این تابلو پارک را ممنوع نمی‌کند."),
  S(False, "Tavlen betyder, at bilerne fra sidevejene har forkørselsret.", "The sign means that the cars from the side roads have right of way.",
    "این تابلو یعنی خودروهای راه‌های فرعی حق تقدم دارند.",
    "Det er omvendt: trafikken fra sidevejene har ubetinget vigepligt.",
    "It is the other way round: traffic from the side roads must give way.",
    "برعکس است: ترافیک راه‌های فرعی باید بی‌قیدوشرط حق تقدم بدهد."),
)

Q(5507, "7.9", view("""
THE SCENE: a straight two-lane country road with a broken centre line; about 30 m ahead a slow white van drives in our lane; further
ahead the road dips into a hollow and rises again on the far side, so the bottom of the hollow cannot be seen; the road on the far rise
is empty.
MUST BE CLEARLY VISIBLE: the slow van, the hollow whose bottom is hidden, the empty road on the far rise.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Du vil overhale den langsomme varevogn. Vejen foran dig går ned i en lavning, så du ikke kan se bunden af den. Hvad gælder?",
  "You want to overtake the slow van. The road ahead dips into a hollow, so you cannot see the bottom of it. What applies?",
  "می‌خواهید از ون کُند سبقت بگیرید. جاده‌ی جلو وارد یک گودی می‌شود و نمی‌توانید کف آن را ببینید. چه قاعده‌ای برقرار است؟",
  S(True, "En modkørende bil kan være skjult i lavningen.", "An oncoming car may be hidden in the hollow.",
    "ممکن است خودرویی از روبه‌رو در گودی پنهان باشد.",
    "Det, du ikke kan se, kan du ikke regne for frit.", "What you cannot see, you cannot count as clear.",
    "چیزی را که نمی‌بینید، نمی‌توانید خالی فرض کنید."),
  S(True, "Jeg venter med at overhale, til jeg kan se, at hele strækningen er fri.",
    "I wait to overtake until I can see that the whole stretch is clear.",
    "صبر می‌کنم تا ببینم تمام مسیر خالی است و بعد سبقت می‌گیرم.",
    "Vognbanen, hvor du skal overhale, skal være fri for modkørende på en tilstrækkeligt lang strækning.",
    "The lane in which you overtake must be clear of oncoming traffic for a long enough stretch.",
    "خطی که در آن سبقت می‌گیرید باید در مسافت کافی از ترافیک روبه‌رو خالی باشد."),
  S(False, "Vejen er tom på den anden side af lavningen, så der er frit.", "The road is empty on the far side of the hollow, so it is clear.",
    "جاده آن طرفِ گودی خالی است، پس راه باز است.",
    "En bil i lavningen kan dukke op lige foran dig.", "A car in the hollow can appear right in front of you.",
    "خودرویی که در گودی است ممکن است درست جلوی شما ظاهر شود."),
  S(False, "Jeg må overhale, fordi midterlinjen er stiplet.", "I may overtake because the centre line is broken.",
    "چون خط وسط بریده‌بریده است، می‌توانم سبقت بگیرم.",
    "En stiplet linje betyder ikke, at det er sikkert at overhale; du skal selv kunne se, at der er frit.",
    "A broken line does not mean that it is safe to overtake; you must be able to see for yourself that the road is clear.",
    "خط بریده‌بریده به این معنا نیست که سبقت بی‌خطر است؛ خودتان باید ببینید که راه باز است."),
)

Q(5508, "7.9", above("""
THE SCENE: a two-way road seen from above, one lane in each direction, a broken centre line; along the right side of our lane runs an
unbroken white edge line, and outside it a firm paved strip about 1.5 m wide (not a cycle lane, no symbols); ahead a side road goes off
to the LEFT.
VEHICLES (colour code used strictly): a GREY car stands at the centre line just before the side road with its left indicator flashing,
waiting for an oncoming car to pass; a RED car (ours) behind the grey car; a SOLID GREEN arrow from the red car passing the grey car on
its right, partly over the edge line on the paved strip; a DASHED ORANGE arrow from the red car passing the grey car on its left.
MUST NOT APPEAR: signs, text."""),
  "Bilen foran dig holder stille ved midterlinjen og blinker til venstre. Til højre for den ubrudte kantlinje er der en fast, "
  "asfalteret kant. Hvad gælder?",
  "The car in front of you is standing at the centre line, signalling left. To the right of the unbroken edge line there is a firm, "
  "paved strip. What applies?",
  "خودروی جلوی شما کنار خط وسط ایستاده و راهنمای چپ زده است. سمت راستِ خط کناری ممتد، حاشیه‌ای آسفالته و محکم هست. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må køre forbi bilen i højre side og over kantlinjen, hvis det kan ske uden fare.",
    "I may pass the car on its right and over the edge line if it can be done safely.",
    "اگر بی‌خطر باشد، می‌توانم از سمت راست آن خودرو و از روی خط کناری رد شوم.",
    "Kantlinjen må overskrides, når du kører forbi højre om en venstresvingende, hvis banen til højre ikke er en særlig bane.",
    "The edge line may be crossed when you pass a left-turning vehicle on the right, if the lane to the right is not a special lane.",
    "وقتی از سمت راستِ خودرویی که به چپ می‌پیچد رد می‌شوید، می‌توانید از خط کناری عبور کنید، به شرط آن‌که آن طرف خط، مسیر ویژه نباشد."),
  S(True, "Var der en cykelbane uden for kantlinjen, måtte jeg ikke køre ud i den.",
    "If there were a cycle lane outside the edge line, I would not be allowed to drive into it.",
    "اگر بیرون از خط کناری خط دوچرخه بود، اجازه نداشتم وارد آن شوم.",
    "Undtagelsen gælder ikke, når banen til højre for kantlinjen er en særlig bane, fx en cykelbane.",
    "The exception does not apply when the lane to the right of the edge line is a special lane, for example a cycle lane.",
    "این استثنا وقتی سمت راست خط کناری مسیر ویژه، مثلاً خط دوچرخه، باشد برقرار نیست."),
  S(False, "Jeg må køre forbi bilen i venstre side, når der ikke kommer nogen imod mig.",
    "I may pass the car on its left when nothing is coming towards me.",
    "وقتی کسی از روبه‌رو نمی‌آید، می‌توانم از سمت چپ آن خودرو رد شوم.",
    "Et køretøj, der svinger til venstre, skal overhales højre om.", "A vehicle turning left must be overtaken on the right.",
    "از وسیله‌ای که به چپ می‌پیچد باید از سمت راست سبقت گرفت."),
  S(False, "En ubrudt kantlinje må aldrig overskrides.", "An unbroken edge line may never be crossed.",
    "از خط کناری ممتد هیچ‌وقت نباید عبور کرد.",
    "Den må fx overskrides for at standse eller parkere, for at køre ind på eller ud fra vejen og for at køre højre om en "
    "venstresvingende.",
    "It may be crossed, for example, to stop or park, to drive onto or off the road and to pass a left-turning vehicle on the right.",
    "مثلاً برای توقف یا پارک، ورود به جاده یا خروج از آن و رد شدن از سمت راستِ خودرویی که به چپ می‌پیچد می‌توان از آن عبور کرد."),
)

Q(5509, "7.9", town("""
THE SCENE: a town road with TWO lanes in our direction separated by a broken lane line, and light traffic; we drive in the RIGHT
lane; about 30 m ahead in the LEFT lane a grey car drives slowly; the right lane ahead of us is free.
MUST BE CLEARLY VISIBLE: the two lanes, the slow grey car in the left lane, the free right lane.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Du kører i byen i højre af to vognbaner. Trafikken er let. I venstre vognbane foran dig kører en bil langsomt. Hvad gælder?",
  "You are driving in town in the right of two lanes. The traffic is light. In the left lane ahead of you a car is driving slowly. "
  "What applies?",
  "در شهر در خط راست از دو خط می‌رانید. ترافیک سبک است. در خط چپ جلوی شما خودرویی آهسته می‌رود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre forbi den i højre vognbane, fordi det vil være at overhale højre om.",
    "I must not pass it in the right lane, because that would be overtaking on the right.",
    "نباید در خط راست از کنارش رد شوم، چون این سبقت از سمت راست است.",
    "Overhaling skal ske til venstre; kun i tæt trafik i flere rækker regnes det ikke som overhaling at køre forbi i en anden vognbane.",
    "Overtaking must be done on the left; only in dense traffic in several rows is passing in another lane not counted as overtaking.",
    "سبقت باید از چپ باشد؛ فقط در ترافیک سنگینِ چندردیفه، رد شدن در خطی دیگر سبقت حساب نمی‌شود."),
  S(False, "I byen må jeg altid køre forbi i den vognbane, jeg vil.", "In town I may always pass in whichever lane I like.",
    "در شهر همیشه می‌توانم از هر خطی که بخواهم رد شوم.",
    "Når trafikken ikke er tæt, er det overhaling at køre forbi, og overhaling skal ske til venstre.",
    "When the traffic is not dense, passing is overtaking, and overtaking must be done on the left.",
    "وقتی ترافیک سنگین نیست، رد شدن از کنار دیگری سبقت است و سبقت باید از چپ باشد."),
  S(False, "Jeg må køre forbi, når jeg har blinket til højre først.", "I may pass once I have signalled right first.",
    "اگر اول راهنمای راست بزنم، می‌توانم رد شوم.",
    "Blinklyset gør ikke en overhaling højre om lovlig.", "The indicator does not make overtaking on the right legal.",
    "راهنما سبقت از راست را قانونی نمی‌کند."),
  S(False, "Bilen i venstre vognbane har pligt til at sætte farten op, så jeg kan komme frem.",
    "The car in the left lane is obliged to speed up so that I can get on.",
    "خودروی خط چپ موظف است سرعتش را بالا ببرد تا من بتوانم جلو بروم.",
    "Bilen burde holde til højre, men den har ingen pligt til at sætte farten op for dig.",
    "The car ought to keep right, but it has no duty to speed up for you.",
    "آن خودرو باید سمت راست برود، ولی موظف نیست برای شما سرعتش را بالا ببرد."),
)

Q(5510, "7.9", view("""
THE SCENE: a two-lane road with an UNBROKEN white centre line; about 40 m ahead a white van stands parked at the right edge with its
hazard lights flashing, blocking most of our lane; the oncoming lane is empty for a long way; no other vehicles.
MUST BE CLEARLY VISIBLE: the unbroken centre line, the parked van blocking most of our lane, the empty oncoming lane.
MUST NOT APPEAR: signs, text."""),
  "Midt på vejen er der en ubrudt linje. Lidt fremme holder en varevogn parkeret i din side og spærrer det meste af din vognbane. "
  "Hvad gælder?",
  "There is an unbroken line in the middle of the road. A little ahead a van is parked on your side and blocks most of your lane. "
  "What applies?",
  "وسط جاده خط ممتد است. کمی جلوتر یک ون در سمت شما پارک شده و بیشتر خط شما را بسته است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må køre over linjen for at komme forbi varevognen, men jeg skal være særligt agtpågivende.",
    "I may cross the line to get past the van, but I must take special care.",
    "می‌توانم برای رد شدن از کنار ون از خط عبور کنم، ولی باید با احتیاط ویژه این کار را بکنم.",
    "En spærrelinje må overskrides, når fx et standset eller parkeret køretøj gør det nødvendigt, og det skal ske med særlig "
    "agtpågivenhed.",
    "An unbroken line may be crossed where, for example, a stopped or parked vehicle makes it necessary, and it must be done with special care.",
    "وقتی مثلاً وسیله‌ای ایستاده یا پارک‌شده آن را لازم کند، می‌توان از خط ممتد عبور کرد و این کار باید با احتیاط ویژه باشد."),
  S(True, "Kommer der nogen imod mig, skal jeg om nødvendigt standse og lade dem passere først.",
    "If someone comes towards me, I must stop if necessary and let them pass first.",
    "اگر کسی از روبه‌رو بیاید، باید در صورت لزوم بایستم و بگذارم اول او رد شود.",
    "Spærringen er i din side, så det er dig, der om nødvendigt skal standse og lade de mødende passere.",
    "The obstruction is on your side, so it is you who must stop if necessary and let oncoming traffic pass.",
    "مانع در سمت شماست، پس شما باید در صورت لزوم بایستید و بگذارید ترافیک روبه‌رو رد شود."),
  S(False, "Linjen må aldrig overskrides, så jeg skal vente, til varevognen kører.",
    "The line may never be crossed, so I must wait until the van drives off.",
    "هیچ‌وقت نباید از این خط عبور کرد، پس باید صبر کنم تا ون برود.",
    "Ved et parkeret eller standset køretøj må linjen overskrides med særlig agtpågivenhed.",
    "At a parked or stopped vehicle the line may be crossed with special care.",
    "کنار وسیله‌ی پارک‌شده یا ایستاده می‌توان با احتیاط ویژه از خط عبور کرد."),
  S(False, "Når jeg alligevel kører over linjen, må jeg også overhale bilen foran mig.",
    "Since I am crossing the line anyway, I may also overtake the car in front of me.",
    "حالا که به هر حال از خط عبور می‌کنم، می‌توانم از خودروی جلویی هم سبقت بگیرم.",
    "Du må kun overskride linjen for at komme forbi forhindringen, ikke for at overhale.",
    "You may only cross the line to get past the obstruction, not to overtake.",
    "فقط برای رد شدن از مانع می‌توانید از خط عبور کنید، نه برای سبقت."),
)

Q(5511, "7.9", view("""
THE SCENE: a straight two-lane country road with a broken centre line; we tow a caravan (its front corner visible in the right door
mirror at the right edge of the picture); along the right side runs an unbroken edge line, and outside it a firm paved strip about 1 m
wide (no cycle lane, no symbols); in the left door mirror (at the left edge of the picture) a car is pulling out to overtake us.
MUST BE CLEARLY VISIBLE: the caravan in the right mirror, the overtaking car in the left mirror, the edge line and the paved strip.
MUST NOT APPEAR: signs, text."""),
  "Du kører med campingvogn, og en bil er ved at overhale dig. Uden for den ubrudte kantlinje er der en fast, asfalteret kant. "
  "Hvad gælder?",
  "You are towing a caravan, and a car is overtaking you. Outside the unbroken edge line there is a firm, paved strip. What applies?",
  "با کاروان می‌رانید و خودرویی در حال سبقت گرفتن از شماست. بیرون از خط کناری ممتد، حاشیه‌ای آسفالته و محکم هست. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må køre lidt ud over kantlinjen et kort stykke for at lette overhalingen.",
    "I may drive a little over the edge line for a short stretch to make the overtaking easier.",
    "می‌توانم برای مسافتی کوتاه کمی از خط کناری بیرون بروم تا سبقت آسان‌تر شود.",
    "Køretøjer, der kører med lav hastighed, må overskride kantlinjen på en kortere strækning, mens overhalingen varer, hvor det er "
    "nødvendigt for at lette den.",
    "Vehicles driving at low speed may cross the edge line for a short stretch while the overtaking lasts, where this is needed to make it easier.",
    "وسایلی که آهسته می‌رانند، اگر برای آسان‌تر شدن سبقت لازم باشد، می‌توانند تا وقتی سبقت ادامه دارد در مسافتی کوتاه از خط کناری عبور کنند."),
  S(True, "Jeg holder godt til højre og giver bilen plads til at komme forbi.", "I keep well to the right and give the car room to get past.",
    "کاملاً سمت راست می‌مانم و به آن خودرو جا می‌دهم تا رد شود.",
    "Den, der bliver overhalet, skal holde til højre og må ikke gøre overhalingen sværere.",
    "The one being overtaken must keep right and must not make the overtaking harder.",
    "کسی که از او سبقت گرفته می‌شود باید سمت راست بماند و سبقت را دشوارتر نکند."),
  S(False, "Jeg må blive ude på kanten, så længe jeg har lyst.", "I may stay out on the strip for as long as I like.",
    "هر قدر بخواهم می‌توانم روی حاشیه بمانم.",
    "Det er kun tilladt på en kortere strækning, mens overhalingen varer.", "It is only allowed for a short stretch while the overtaking lasts.",
    "این کار فقط در مسافتی کوتاه و تا وقتی سبقت ادامه دارد مجاز است."),
  S(False, "Jeg sætter farten op, så overhalingen går hurtigere.", "I speed up so that the overtaking goes faster.",
    "سرعتم را بالا می‌برم تا سبقت سریع‌تر انجام شود.",
    "Den, der bliver overhalet, må ikke sætte farten op.", "The one being overtaken must not speed up.",
    "کسی که از او سبقت گرفته می‌شود نباید سرعتش را بالا ببرد."),
)

Q(5512, "6.1", view("""
THE SCENE: we approach a junction where our road meets a crossing road with light-rail tracks running along it; on the right at the
junction stands a give-way sign (a white triangle with a red border, point down) and under it a white rectangular plate showing a black
light-rail tram seen from the side above a black horizontal arrow with heads at both ends; shark teeth (white triangles) lie across our
lane.
MUST BE CLEARLY VISIBLE: the give-way sign with its plate, the light-rail tracks on the crossing road, the shark teeth.
MUST NOT APPEAR: other signs, text, trams."""),
  "Ved krydset står en vigepligtstavle med denne undertavle. Hvad betyder undertavlen?",
  "A give-way sign with this plate stands at the junction. What does the plate mean?",
  "کنار تقاطع تابلوی حق تقدم با این زیرتابلو هست. این زیرتابلو چه معنایی دارد؟",
  S(True, "På den tværgående vej kører der letbane i begge retninger.", "On the crossing road a light rail runs in both directions.",
    "در جاده‌ی عرضی، قطار شهری سبک در هر دو جهت حرکت می‌کند.",
    "Undertavlen viser, at der er letbane med trafik i begge retninger på den vej, du skal ind på eller over.",
    "The plate shows that there is a light rail with traffic in both directions on the road you are entering or crossing.",
    "این زیرتابلو نشان می‌دهد که در جاده‌ای که وارد آن می‌شوید یا از آن رد می‌شوید، قطار شهری سبک در هر دو جهت هست."),
  S(True, "Jeg skal se efter letbanetog fra både venstre og højre.", "I must look for light-rail trams from both left and right.",
    "باید مراقب قطارهای شهری سبک از هر دو طرفِ چپ و راست باشم.",
    "Letbanen kan komme fra begge sider, og du har ubetinget vigepligt for den.",
    "The light rail can come from both sides, and you must give way to it.",
    "قطار شهری سبک ممکن است از هر دو طرف بیاید و شما باید به آن حق تقدم بدهید."),
  S(False, "Undertavlen betyder, at letbanen har vigepligt for mig.", "The plate means that the light rail must give way to me.",
    "این زیرتابلو یعنی قطار شهری سبک باید به من حق تقدم بدهد.",
    "Det er dig, der har ubetinget vigepligt; undertavlen gør dig opmærksom på letbanen.",
    "It is you who must give way; the plate draws your attention to the light rail.",
    "این شما هستید که باید حق تقدم بدهید؛ زیرتابلو توجهتان را به قطار شهری سبک جلب می‌کند."),
  S(False, "Letbanen kører kun i én retning, så jeg skal kun se til den ene side.",
    "The light rail only runs in one direction, so I only need to look one way.",
    "قطار شهری سبک فقط در یک جهت می‌رود، پس فقط باید به یک طرف نگاه کنم.",
    "Undertavlens pil viser trafik i begge retninger.", "The plate's arrow shows traffic in both directions.",
    "پیکان زیرتابلو تردد در هر دو جهت را نشان می‌دهد."),
)

Q(5513, "6.1", view("""
THE SCENE: a two-way country road; on the right verge stands a give-way sign (a white triangle with a red border, point down) with a
white rectangular plate under it showing the word STOP and, below it, the distance «100 m»; about 100 m ahead the road meets a crossing road.
MUST BE CLEARLY VISIBLE: the give-way sign with its plate, the junction further ahead.
MUST NOT APPEAR: other signs, any text except STOP and «100 m» on the plate."""),
  "Du kører forbi denne tavle med undertavle. Hvad betyder den?",
  "You pass this sign with its plate. What does it mean?",
  "از کنار این تابلو و زیرتابلویش می‌گذرید. معنی‌اش چیست؟",
  S(True, "Om ca. 100 m kommer et kryds, hvor jeg skal standse.", "In about 100 m there is a junction where I must stop.",
    "حدود ۱۰۰ متر جلوتر تقاطعی هست که باید در آن بایستم.",
    "Undertavlen varsler en stoptavle og viser afstanden til krydset.",
    "The plate gives advance warning of a stop sign and shows the distance to the junction.",
    "این زیرتابلو از تابلوی ایست جلوتر خبر می‌دهد و فاصله تا تقاطع را نشان می‌دهد."),
  S(False, "Jeg skal standse her ved tavlen.", "I must stop here at the sign.", "باید همین‌جا کنار تابلو بایستم.",
    "Tavlen er en forvarsling; du skal standse ved krydset længere fremme.",
    "The sign is an advance warning; you must stop at the junction further ahead.",
    "این تابلو هشدار پیشاپیش است؛ باید در تقاطعِ جلوتر بایستید."),
  S(False, "Ved krydset skal jeg kun standse, hvis der kommer nogen.", "At the junction I only have to stop if someone is coming.",
    "در تقاطع فقط وقتی کسی بیاید باید بایستم.",
    "Ved en stoptavle skal du altid standse, også når der ikke kommer nogen.",
    "At a stop sign you must always stop, even when nobody is coming.",
    "کنار تابلوی ایست همیشه باید بایستید، حتی وقتی کسی نمی‌آید."),
)

Q(5514, "6.1", view("""
THE SCENE: a two-way country road outside town; on the right verge stands a red-bordered white warning triangle (point up) showing a
black gate-like barrier fence (the Danish warning sign for a level crossing with barriers); far ahead the road crosses a railway, where
red-and-white barrier arms stand raised.
MUST BE CLEARLY VISIBLE: the warning sign with the barrier symbol, the raised barriers at the level crossing far ahead.
MUST NOT APPEAR: other signs, text, trains."""),
  "Du kører forbi denne tavle. Hvad betyder den?",
  "You pass this sign. What does it mean?",
  "از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Længere fremme kommer en jernbaneoverkørsel med bomme.", "Further ahead there is a level crossing with barriers.",
    "جلوتر یک تقاطع راه‌آهن با راه‌بند هست.",
    "Tavlen advarer om en jernbaneoverkørsel med bomme.", "The sign warns of a level crossing with barriers.",
    "این تابلو درباره‌ی تقاطع راه‌آهن با راه‌بند هشدار می‌دهد."),
  S(True, "Jeg skal være klar til at standse, hvis lyset blinker rødt, eller bommene går ned.",
    "I must be ready to stop if the red light flashes or the barriers come down.",
    "باید آماده‌ی توقف باشم، اگر چراغ قرمز چشمک بزند یا راه‌بندها پایین بیایند.",
    "Du må ikke køre over, når signalet viser, at du skal standse, eller når bommene er lukkede eller ved at lukke.",
    "You must not cross when the signal shows that you must stop, or when the barriers are closed or closing.",
    "وقتی چراغ نشان می‌دهد باید بایستید، یا وقتی راه‌بندها بسته‌اند یا در حال بسته شدن‌اند، نباید رد شوید."),
  S(False, "Når der er bomme, behøver jeg ikke selv se efter tog.", "When there are barriers, I need not look out for trains myself.",
    "وقتی راه‌بند هست، لازم نیست خودم مراقب قطار باشم.",
    "Ved en jernbaneoverkørsel skal du altid vise særlig forsigtighed.", "At a level crossing you must always take special care.",
    "در تقاطع راه‌آهن همیشه باید احتیاط ویژه داشته باشید."),
  S(False, "Tavlen betyder, at der ikke længere kører tog på strækningen.", "The sign means that trains no longer run on the line.",
    "این تابلو یعنی دیگر قطاری در این مسیر حرکت نمی‌کند.",
    "Tavlen advarer netop om en overkørsel, hvor der kører tog.", "The sign warns precisely of a crossing where trains run.",
    "این تابلو دقیقاً درباره‌ی تقاطعی هشدار می‌دهد که قطار از آن عبور می‌کند."),
)

Q(5515, "6.1", view("""
THE SCENE: a road running along the foot of a steep rocky slope on the right; on the right verge stands a red-bordered white warning
triangle (point up) showing black stones falling down a steep rock face (the warning sign for falling rocks); a few small stones lie at
the edge of the road.
MUST BE CLEARLY VISIBLE: the warning sign, the rocky slope, the stones at the edge of the road.
MUST NOT APPEAR: other signs, text, other vehicles."""),
  "Du kører forbi denne tavle. Hvad betyder den?",
  "You pass this sign. What does it mean?",
  "از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Der kan falde sten ned fra skrænten, og der kan ligge sten på vejen.",
    "Stones may fall from the slope, and there may be stones lying on the road.",
    "ممکن است از شیب سنگ بریزد و روی جاده سنگ افتاده باشد.",
    "Tavlen advarer om stenskred.", "The sign warns of falling rocks.", "این تابلو درباره‌ی ریزش سنگ هشدار می‌دهد."),
  S(False, "Tavlen advarer om løse sten fra en ny vejbelægning, som hjulene kan slynge op.",
    "The sign warns of loose stones from a new road surface that the wheels can throw up.",
    "این تابلو درباره‌ی سنگ‌ریزه‌ی شلِ آسفالت تازه هشدار می‌دهد که چرخ‌ها به هوا پرتاب می‌کنند.",
    "Det er en anden tavle; denne viser sten, der falder ned fra en skrænt.",
    "That is another sign; this one shows stones falling from a slope.",
    "آن تابلوی دیگری است؛ این تابلو سنگ‌هایی را نشان می‌دهد که از شیب پایین می‌افتند."),
  S(False, "Tavlen betyder, at vejen er lukket for biler.", "The sign means that the road is closed to cars.",
    "این تابلو یعنی جاده برای خودروها بسته است.",
    "Det er en advarselstavle, ikke en forbudstavle.", "It is a warning sign, not a prohibitory sign.",
    "این تابلوی هشدار است، نه تابلوی ممنوعیت."),
)

Q(5516, "6.1", town("""
THE SCENE: the entrance to a residential street; at the entrance stands the Danish sign C 22,1 in its official design (a round white sign
with a red border showing a black car above a black motorcycle), and under it a white rectangular plate with the black text
«Ærindekørsel tilladt».
MUST BE CLEARLY VISIBLE: the round sign with the car and the motorcycle, the plate with its text, the houses along the street.
MUST NOT APPEAR: other signs, any other text."""),
  "Ved indkørslen til vejen står denne tavle med undertavlen »Ærindekørsel tilladt«. Du kører bil. Hvad gælder?",
  "At the entrance to the road there is this sign with the plate «Errands allowed». You are driving a car. What applies?",
  "در ورودی این راه، این تابلو با زیرتابلوی «رفت‌وآمد برای کار و مراجعه مجاز است» قرار دارد. با خودرو هستید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må køre ind for at besøge en ven, der bor på vejen.", "I may drive in to visit a friend who lives on the road.",
    "می‌توانم برای دیدن دوستی که در این خیابان زندگی می‌کند وارد شوم.",
    "Ærindekørsel er kørsel i forbindelse med fx aflevering, afhentning, arbejde, indkøb og besøg.",
    "Errand driving is driving in connection with, for example, delivering, collecting, work, shopping and visits.",
    "رفت‌وآمد برای کار و مراجعه یعنی رانندگی برای مثلاً تحویل دادن، تحویل گرفتن، کار، خرید و مهمانی."),
  S(True, "Jeg må køre ind for at hente en pakke i en butik på vejen.", "I may drive in to collect a parcel at a shop on the road.",
    "می‌توانم برای گرفتن بسته‌ای از مغازه‌ای در این خیابان وارد شوم.",
    "Afhentning og indkøb er ærindekørsel.", "Collecting and shopping are errand driving.",
    "تحویل گرفتن و خرید هم جزو رفت‌وآمد برای کار و مراجعه است."),
  S(True, "Jeg må parkere i forbindelse med mit ærinde, hvis parkering ellers er tilladt.",
    "I may park in connection with my errand if parking is otherwise allowed.",
    "اگر پارک از جهات دیگر مجاز باشد، می‌توانم برای همان کار پارک کنم.",
    "Ærindekørsel omfatter også parkering i forbindelse med ærindet.", "Errand driving also includes parking in connection with the errand.",
    "این نوع رفت‌وآمد شامل پارک برای همان کار هم می‌شود."),
  S(False, "Jeg må køre igennem vejen for at slippe uden om en kø.", "I may drive through the road to get round a queue.",
    "می‌توانم برای دور زدن یک صف از این خیابان عبور کنم.",
    "At køre igennem uden et ærinde på vejen er ikke ærindekørsel.", "Driving through without an errand on the road is not errand driving.",
    "عبور کردن بدون کاری در این خیابان جزو این مجوز نیست."),
)

Q(5517, "7.6", view("""
THE SCENE: a two-lane country road near a village with no pavement and no cycle path; about 40 m ahead at the right edge an elderly
person drives slowly in a small four-wheeled electric mobility scooter with a little orange flag on a pole; an oncoming car approaches
in the distance.
MUST BE CLEARLY VISIBLE: the elderly person on the mobility scooter at the right edge, the oncoming car.
MUST NOT APPEAR: signs, text, brand names."""),
  "Foran dig kører en ældre person langsomt i en lille el-scooter for gangbesværede i højre vejkant. Der kommer en bil imod dig. "
  "Hvordan forholder du dig?",
  "Ahead of you an elderly person drives slowly at the right edge in a small mobility scooter. A car is coming towards you. What do you do?",
  "جلوی شما فردی سالمند با یک اسکوتر برقیِ کوچک مخصوص افراد کم‌توان آهسته در لبه‌ی راست جاده می‌رود. خودرویی از روبه‌رو می‌آید. "
  "چه می‌کنید؟",
  S(True, "Jeg venter med at køre forbi, til den modkørende bil er passeret.", "I wait to pass until the oncoming car has gone by.",
    "صبر می‌کنم تا خودروی روبه‌رو رد شود و بعد از کنار او می‌گذرم.",
    "Så kan du holde god afstand til siden, når du kører forbi.", "Then you can keep a good side distance when you pass.",
    "این‌طور هنگام رد شدن می‌توانید فاصله‌ی کافی از پهلو نگه دارید."),
  S(True, "Scooteren kan pludselig svinge ud, fx for et hul i vejen.", "The scooter may suddenly swerve out, for example around a hole in the road.",
    "ممکن است اسکوتر ناگهان به بیرون منحرف شود، مثلاً برای دوری از چاله.",
    "Et lille og langsomt køretøj kan blive slået ud af kurs af ujævnheder.", "A small, slow vehicle can be knocked off course by bumps.",
    "وسیله‌ی کوچک و کُند ممکن است با ناهمواری‌های جاده از مسیرش خارج شود."),
  S(True, "Jeg viser særligt hensyn, fordi føreren er ældre og gangbesværet.", "I show particular consideration because the rider is elderly and has walking difficulties.",
    "ملاحظه‌ی ویژه می‌کنم، چون راننده سالمند و کم‌توان است.",
    "Der skal vises særligt hensyn over for ældre og personer med et handicap.",
    "Particular consideration must be shown to the elderly and people with a disability.",
    "باید نسبت به سالمندان و افراد دارای معلولیت ملاحظه‌ی ویژه داشت."),
  S(False, "Jeg kører tæt forbi, fordi scooteren fylder så lidt.", "I pass close by because the scooter takes up so little room.",
    "چون اسکوتر جای کمی می‌گیرد، از نزدیکش رد می‌شوم.",
    "Du skal holde god afstand til siden, også til små køretøjer.", "You must keep a good side distance, also from small vehicles.",
    "باید از وسایل کوچک هم فاصله‌ی کافی از پهلو بگیرید."),
)

Q(5518, "7.6", view("""
THE SCENE: a two-lane country road through a forest at dusk; about 30 m ahead a roe deer leaps out of the trees on the right onto our
lane; a second deer can be seen among the trees at the right.
MUST BE CLEARLY VISIBLE: the deer leaping onto the road, the second deer among the trees.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="dusk, dry road"),
  "Et rådyr springer pludselig ud på vejen foran dig. Hvordan forholder du dig?",
  "A roe deer suddenly leaps out onto the road in front of you. What do you do?",
  "یک آهو ناگهان جلوی شما به جاده می‌پرد. چه می‌کنید؟",
  S(True, "Jeg bremser hårdt og holder bilen lige.", "I brake hard and keep the car straight.", "محکم ترمز می‌گیرم و خودرو را مستقیم نگه می‌دارم.",
    "Et voldsomt undvigesving kan føre dig ud i modkørende trafik eller af vejen.",
    "A violent swerve can take you into oncoming traffic or off the road.",
    "یک فرمان تند برای دوری از حیوان ممکن است شما را به سمت ترافیک روبه‌رو یا بیرون از جاده ببرد."),
  S(True, "Der kan komme flere dyr efter det første.", "More animals may follow the first one.", "ممکن است پشت سر اولی حیوان‌های دیگری هم بیایند.",
    "Rådyr går ofte flere sammen.", "Roe deer often move in small groups.", "آهوها اغلب چندتایی با هم حرکت می‌کنند."),
  S(True, "Ved skov og marker holder jeg særligt øje med dyr i skumringen.", "Near forests and fields I watch especially for animals at dusk.",
    "نزدیک جنگل و مزرعه، هنگام غروب بیشتر مراقب حیوانات هستم.",
    "Dyrene er især på farten i skumringen og ved daggry.", "Animals are especially on the move at dusk and dawn.",
    "حیوانات به‌ویژه هنگام غروب و سپیده‌دم در حرکت‌اند."),
  S(False, "Jeg svinger hurtigt ud i den modsatte vognbane for at undgå dyret.", "I swerve quickly into the opposite lane to avoid the animal.",
    "برای دوری از حیوان سریع به خط مقابل می‌پیچم.",
    "Du risikerer at støde sammen med modkørende eller at køre af vejen.", "You risk colliding with oncoming traffic or running off the road.",
    "ممکن است با خودروی روبه‌رو برخورد کنید یا از جاده خارج شوید."),
)

Q(5519, "7.6", town("""
THE SCENE: a town street with one lane in each direction; about 30 m ahead lies a zebra crossing without traffic lights; in the OPPOSITE
lane a car stands still just before the crossing; nobody can be seen on the crossing, but the stopped car hides the far pavement at the
crossing.
MUST BE CLEARLY VISIBLE: the zebra crossing, the stopped oncoming car hiding the far pavement.
MUST NOT APPEAR: signs, text, people."""),
  "Den modkørende bil holder stille lige før fodgængerfeltet. Du kan ikke se hvorfor. Hvordan forholder du dig?",
  "The oncoming car has stopped just before the pedestrian crossing. You cannot see why. What do you do?",
  "خودروی روبه‌رو درست پیش از خط عابر پیاده ایستاده است. نمی‌بینید چرا. چه می‌کنید؟",
  S(True, "Jeg sænker farten, fordi bilen måske holder for en fodgænger.", "I slow down because the car may be stopping for a pedestrian.",
    "سرعتم را کم می‌کنم، چون شاید آن خودرو برای عابری ایستاده باشد.",
    "Du skal afpasse farten, så gående, der er i feltet eller på vej ud i det, ikke kommer i fare.",
    "You must adjust your speed so that pedestrians on the crossing or about to step onto it are not endangered.",
    "باید سرعت را طوری تنظیم کنید که عابرانی که روی خط عابرند یا می‌خواهند وارد آن شوند در خطر نیفتند."),
  S(True, "En fodgænger kan komme frem foran den holdende bil og gå ud i min side.",
    "A pedestrian may appear in front of the stopped car and walk out into my side.",
    "ممکن است عابری از جلوی خودروی ایستاده بیرون بیاید و وارد سمت من شود.",
    "Den holdende bil kan skjule en fodgænger.", "The stopped car can hide a pedestrian.", "خودروی ایستاده ممکن است عابری را پنهان کند."),
  S(False, "Jeg fortsætter med samme fart, fordi bilen holder i den anden side af vejen.",
    "I carry on at the same speed because the car is on the other side of the road.",
    "با همان سرعت ادامه می‌دهم، چون آن خودرو در سمت دیگر جاده است.",
    "Fodgængeren skal også over din side af vejen.", "The pedestrian also has to cross your side of the road.",
    "عابر باید از سمت شما هم رد شود."),
  S(False, "Jeg dytter, så en eventuel fodgænger ved, at jeg kommer.", "I sound the horn so that any pedestrian knows I am coming.",
    "بوق می‌زنم تا اگر عابری هست، بداند که من می‌آیم.",
    "Du skal sætte farten ned og om nødvendigt standse; hornet giver dig ingen ret til at køre.",
    "You must slow down and stop if necessary; the horn gives you no right to drive on.",
    "باید سرعت را کم کنید و در صورت لزوم بایستید؛ بوق به شما حق عبور نمی‌دهد."),
)

Q(5520, "7.6", town("""
THE SCENE: a quiet town street; a teacher in a yellow vest leads a long line of small schoolchildren, walking in pairs and holding hands,
across the road where there is no crossing; the first children have reached the far pavement, the rest are still on the road; another
adult walks at the end of the line.
MUST BE CLEARLY VISIBLE: the teacher leading, the line of children on the road, the adult at the end.
MUST NOT APPEAR: signs, text."""),
  "En lærer fører en gruppe små skolebørn over vejen foran dig. Der er ikke noget fodgængerfelt. Hvordan forholder du dig?",
  "A teacher is leading a group of small schoolchildren across the road in front of you. There is no pedestrian crossing. What do you do?",
  "یک معلم گروهی از دانش‌آموزان کوچک را جلوی شما از عرض خیابان رد می‌کند. خط عابر پیاده‌ای نیست. چه می‌کنید؟",
  S(True, "Jeg standser og venter, til hele gruppen er kommet over.", "I stop and wait until the whole group has crossed.",
    "می‌ایستم و صبر می‌کنم تا همه‌ی گروه رد شوند.",
    "Trafikanter skal give fri passage for grupper af børn under opsyn af en leder.",
    "Road users must give free passage to groups of children supervised by a leader.",
    "کاربران راه باید به گروه‌های کودکانی که زیر نظر یک سرپرست‌اند راه عبور آزاد بدهند."),
  S(True, "Jeg holder øje med, om nogle af børnene løber ud af rækken.", "I watch whether any of the children run out of the line.",
    "مراقبم که آیا کسی از بچه‌ها از صف بیرون می‌دود یا نه.",
    "Små børn kan handle uforudsigeligt.", "Small children can act unpredictably.", "کودکان کوچک ممکن است رفتار غیرقابل‌پیش‌بینی داشته باشند."),
  S(True, "Jeg dytter ikke for at få børnene til at skynde sig.", "I do not sound the horn to make the children hurry.",
    "برای این‌که بچه‌ها عجله کنند بوق نمی‌زنم.",
    "Hornet må kun bruges for at forebygge eller afværge fare, og det kan forskrække børnene.",
    "The horn may only be used to prevent or avert danger, and it can frighten the children.",
    "بوق فقط برای پیشگیری یا دفع خطر است و ممکن است بچه‌ها را بترساند."),
  S(False, "Jeg må køre igennem, når der bliver et hul mellem børnene.", "I may drive through when a gap opens between the children.",
    "وقتی بین بچه‌ها فاصله‌ای باز شد، می‌توانم از میانشان رد شوم.",
    "Gruppen skal have fri passage, og du må ikke køre ind imellem børnene.",
    "The group must have free passage, and you must not drive in between the children.",
    "گروه باید راه عبور آزاد داشته باشد و نباید از میان بچه‌ها رد شوید."),
)

Q(5521, "7.6", view("""
THE SCENE: a country road at night with no street lights; about 60 m ahead, in our dipped beam, a procession of people walks at the
right edge of the road in our direction; at its front, on the side towards the middle of the road, a person carries a lamp with white
light, and at its back a person carries a lamp with red light.
MUST BE CLEARLY VISIBLE: the procession at the right edge, the white lamp at the front, the red lamp at the back.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt. Et optog går i højre side af vejen i din retning. Forrest bærer en person en lygte med hvidt lys og bagerst en "
  "med rødt lys. Hvad gælder?",
  "It is dark. A procession is walking on the right side of the road in your direction. At the front someone carries a lamp with "
  "white light and at the back one with red light. What applies?",
  "هوا تاریک است. گروهی در صفی منظم در سمت راست جاده و در جهت شما راه می‌روند. نفر جلویی چراغی با نور سفید و نفر آخر چراغی با "
  "نور قرمز در دست دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Optoget skal have lygter, fordi det går på vejen i mørke.", "The procession must have lamps because it is walking on the road in the dark.",
    "این گروه باید چراغ داشته باشد، چون در تاریکی روی جاده راه می‌رود.",
    "Et optog, der i lygtetændingstiden færdes på kørebanen, rabatten eller cykelstien, skal have mindst én lygte med hvidt eller gult "
    "lys fremad og én med rødt lys bagud.",
    "A procession on the carriageway, the verge or the cycle path in lighting-up time must carry at least one lamp showing white or "
    "yellow light forwards and one showing red light backwards.",
    "گروهی که در زمان روشن کردن چراغ‌ها روی سواره‌رو، حاشیه یا مسیر دوچرخه حرکت می‌کند باید دست‌کم یک چراغ با نور سفید یا زرد رو به "
    "جلو و یک چراغ با نور قرمز رو به عقب داشته باشد."),
  S(True, "Jeg sætter farten ned og kører først forbi, når jeg kan gøre det med god afstand.",
    "I slow down and only pass when I can do so with a good distance.",
    "سرعتم را کم می‌کنم و فقط وقتی با فاصله‌ی کافی ممکن باشد از کنارشان رد می‌شوم.",
    "Du skal give optoget fri passage og god plads.", "You must give the procession free passage and plenty of room.",
    "باید به این گروه راه عبور آزاد و جای کافی بدهید."),
  S(False, "Jeg må køre ind imellem deltagerne, hvis der er huller i optoget.", "I may drive in between the participants if there are gaps in the procession.",
    "اگر در صف فاصله‌ای باشد، می‌توانم از میان افراد رد شوم.",
    "Du skal give fri passage for et sluttet optog og må ikke bryde ind i det.",
    "You must give free passage to a closed procession and must not break into it.",
    "باید به صف منظم راه عبور آزاد بدهید و نباید وارد آن شوید."),
)

Q(5522, "7.3", view("""
THE SCENE: the view from the driver's seat on a straight two-lane country road; the navigation screen in the middle of the dashboard
shows a simple map without any writing, and the driver's right hand reaches towards it; about 60 m ahead the car in front has its brake
lights on.
MUST BE CLEARLY VISIBLE: the navigation screen with the hand reaching for it, the braking car ahead.
MUST NOT APPEAR: signs, text, brand names."""),
  "Du kører 80 km/t og kigger ned på navigationsskærmen i 2 sekunder. Hvad gælder?",
  "You are driving at 80 km/h and look down at the navigation screen for 2 seconds. What applies?",
  "با سرعت ۸۰ کیلومتر بر ساعت می‌رانید و ۲ ثانیه به صفحه‌ی مسیریاب نگاه می‌کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen kører omkring 45 m, mens jeg ikke ser på vejen.", "The car travels about 45 m while I am not looking at the road.",
    "تا وقتی به جاده نگاه نمی‌کنم، خودرو حدود ۴۵ متر جلو می‌رود.",
    "Ved 80 km/t kører bilen ca. 22 m i sekundet, altså ca. 45 m på 2 sekunder.",
    "At 80 km/h the car travels about 22 m a second, so about 45 m in 2 seconds.",
    "با ۸۰ کیلومتر بر ساعت، خودرو در هر ثانیه حدود ۲۲ متر می‌رود، یعنی در ۲ ثانیه حدود ۴۵ متر."),
  S(False, "Bilen kører kun omkring 10 m i den tid.", "The car only travels about 10 m in that time.",
    "خودرو در این مدت فقط حدود ۱۰ متر می‌رود.",
    "Ved 80 km/t kører bilen ca. 22 m hvert sekund.", "At 80 km/h the car travels about 22 m every second.",
    "با ۸۰ کیلومتر بر ساعت، خودرو هر ثانیه حدود ۲۲ متر می‌رود."),
  S(False, "2 sekunder er så kort tid, at det ikke betyder noget for sikkerheden.",
    "2 seconds is such a short time that it does not matter for safety.",
    "۲ ثانیه آن‌قدر کوتاه است که برای ایمنی اهمیتی ندارد.",
    "På 45 m kan bilen foran nå at bremse, eller en fodgænger kan træde ud, uden at du ser det.",
    "In 45 m the car ahead can brake or a pedestrian can step out without your seeing it.",
    "در ۴۵ متر ممکن است خودروی جلو ترمز کند یا عابری وارد جاده شود، بی‌آن‌که شما ببینید."),
  S(False, "Det er i orden at indstille navigationen under kørslen, bare farten er under 80 km/t.",
    "It is fine to set the navigation while driving as long as the speed is below 80 km/h.",
    "تا وقتی سرعت زیر ۸۰ کیلومتر بر ساعت است، تنظیم مسیریاب حین رانندگی اشکالی ندارد.",
    "Indstil navigationen, før du kører, eller når du holder stille; ellers er dit blik væk fra vejen.",
    "Set the navigation before you drive or when you are stopped; otherwise your eyes are off the road.",
    "مسیریاب را پیش از حرکت یا وقتی ایستاده‌اید تنظیم کنید؛ وگرنه نگاهتان از جاده دور می‌شود."),
)

Q(5523, "7.3", view("""
THE SCENE: a straight motorway with two lanes in our direction and light traffic, seen at high speed: the centre of the picture is sharp,
while the edges (the verges, the lamp posts, a car in the next lane) are slightly blurred with motion.
MUST BE CLEARLY VISIBLE: the sharp centre and the blurred edges of the picture.
MUST NOT APPEAR: signs, text."""),
  "Hvad sker der med dit synsfelt, når du kører meget hurtigt?",
  "What happens to your field of vision when you drive very fast?",
  "وقتی خیلی سریع می‌رانید، چه اتفاقی برای میدان دیدتان می‌افتد؟",
  S(True, "Synsfeltet bliver smallere, så jeg lettere overser det, der sker ude i siderne.",
    "The field of vision becomes narrower, so I more easily miss what happens out at the sides.",
    "میدان دید باریک‌تر می‌شود و راحت‌تر چیزهایی را که در کناره‌ها اتفاق می‌افتد نمی‌بینم.",
    "Jo højere fart, desto mere samler blikket sig fremad.", "The higher the speed, the more your gaze is drawn straight ahead.",
    "هرچه سرعت بیشتر باشد، نگاه بیشتر روی جلو متمرکز می‌شود."),
  S(True, "Jeg skal se længere frem for at nå at reagere i tide.", "I must look further ahead to react in time.",
    "باید دورتر را نگاه کنم تا بتوانم به‌موقع واکنش نشان دهم.",
    "Ved høj fart når du hurtigere frem til det, der sker længere fremme.",
    "At high speed you reach what is happening further ahead sooner.",
    "با سرعت زیاد، زودتر به چیزی که جلوتر اتفاق می‌افتد می‌رسید."),
  S(False, "Synsfeltet bliver bredere, fordi jeg er mere opmærksom.", "The field of vision becomes wider because I am more alert.",
    "میدان دید پهن‌تر می‌شود، چون هوشیارترم.",
    "Høj fart giver et smallere synsfelt.", "High speed gives a narrower field of vision.", "سرعت زیاد میدان دید را باریک‌تر می‌کند."),
)

Q(5524, "7.3", picture("""
A simple flat illustration on a plain light background: two identical small cars side by side, each heading towards a brick wall; above
the left car a small round speedometer dial with its needle at 30, above the right car one with its needle at 60; the right car has
longer speed lines behind it.
MUST BE CLEARLY VISIBLE: the two cars, the two dials showing 30 and 60, the walls.
MUST NOT APPEAR: any other numbers, text, brand names."""),
  "Du kører 60 km/t i stedet for 30 km/t. Hvad betyder det, hvis du kører ind i noget?",
  "You are driving at 60 km/h instead of 30 km/h. What does that mean if you hit something?",
  "به‌جای ۳۰ کیلومتر بر ساعت با ۶۰ کیلومتر بر ساعت می‌رانید. اگر به چیزی برخورد کنید، این چه معنایی دارد؟",
  S(True, "Bevægelsesenergien er fire gange så stor.", "The kinetic energy is four times as great.", "انرژی حرکتی چهار برابر است.",
    "Bevægelsesenergien vokser med farten i anden potens: dobbelt fart giver fire gange så meget energi.",
    "Kinetic energy grows with the square of the speed: double the speed gives four times the energy.",
    "انرژی حرکتی با مجذور سرعت زیاد می‌شود: دو برابر شدن سرعت یعنی چهار برابر شدن انرژی."),
  S(False, "Bevægelsesenergien er dobbelt så stor.", "The kinetic energy is twice as great.", "انرژی حرکتی دو برابر است.",
    "Den er fire gange så stor, fordi den vokser med farten i anden potens.",
    "It is four times as great, because it grows with the square of the speed.",
    "چهار برابر است، چون با مجذور سرعت زیاد می‌شود."),
  S(False, "En fodgænger, der bliver ramt, har samme risiko for at blive dræbt som ved 30 km/t.",
    "A pedestrian who is hit has the same risk of being killed as at 30 km/h.",
    "عابری که با خودرو برخورد کند، همان خطر کشته شدن را دارد که در ۳۰ کیلومتر بر ساعت.",
    "Risikoen for, at en ramt fodgænger bliver dræbt, er langt større ved 60 km/t end ved 30 km/t.",
    "The risk that a pedestrian who is hit is killed is far greater at 60 km/h than at 30 km/h.",
    "خطر کشته شدنِ عابری که با خودرو برخورد می‌کند در ۶۰ کیلومتر بر ساعت بسیار بیشتر از ۳۰ است."),
  S(False, "Med sikkerhedssele og airbags betyder farten ikke noget for, hvor alvorligt et sammenstød bliver.",
    "With seat belts and airbags the speed does not matter for how serious a collision is.",
    "با کمربند ایمنی و کیسه‌ی هوا، سرعت در شدت تصادف اهمیتی ندارد.",
    "Sikkerhedsudstyret hjælper, men energien i sammenstødet afhænger stadig af farten.",
    "Safety equipment helps, but the energy in the collision still depends on the speed.",
    "تجهیزات ایمنی کمک می‌کنند، ولی انرژی برخورد همچنان به سرعت بستگی دارد."),
)

Q(5525, "7.3", view("""
THE SCENE: leaving a motorway on an exit slip road that curves sharply to the right and leads down to a junction with traffic lights;
the motorway with its fast traffic is visible on the left behind the slip road's edge.
MUST BE CLEARLY VISIBLE: the sharply curving slip road, the junction with traffic lights at its end.
MUST NOT APPEAR: signs, text."""),
  "Du har kørt længe på motorvejen og kører nu af ved en frakørsel. Hvad skal du være opmærksom på?",
  "You have been driving on the motorway for a long time and are now leaving at an exit. What must you be aware of?",
  "مدت زیادی در آزادراه رانده‌اید و حالا از یک خروجی خارج می‌شوید. به چه چیزی باید توجه کنید؟",
  S(True, "Farten kan føles lavere, end den er, efter lang tids kørsel med høj fart.",
    "The speed can feel lower than it is after a long time driving fast.",
    "پس از مدتی طولانی رانندگی با سرعت زیاد، سرعت ممکن است کمتر از آن‌چه هست به نظر برسد.",
    "Man vænner sig til den høje fart, så en lavere fart føles langsommere, end den er.",
    "You get used to the high speed, so a lower speed feels slower than it is.",
    "به سرعت زیاد عادت می‌کنید، پس سرعت کمتر آهسته‌تر از آن‌چه هست به نظر می‌رسد."),
  S(True, "Jeg ser på speedometeret og sætter farten ned i god tid før svinget og krydset.",
    "I check the speedometer and slow down in good time before the bend and the junction.",
    "به سرعت‌سنج نگاه می‌کنم و پیش از پیچ و تقاطع به‌موقع سرعتم را کم می‌کنم.",
    "Lige efter motorvejskørsel kan du ikke stole på din fornemmelse af farten.",
    "Just after motorway driving you cannot trust your sense of speed.",
    "درست بعد از رانندگی در آزادراه نمی‌توانید به حس خود از سرعت اعتماد کنید."),
  S(False, "Jeg kan tage svinget i frakørslen med samme fart som på motorvejen.",
    "I can take the bend on the exit road at the same speed as on the motorway.",
    "می‌توانم پیچِ خروجی را با همان سرعتِ آزادراه بگیرم.",
    "Frakørslens sving og krydset for enden kræver en meget lavere fart.",
    "The bend on the exit road and the junction at its end need a much lower speed.",
    "پیچ خروجی و تقاطعِ انتهای آن سرعت بسیار کمتری لازم دارند."),
  S(False, "Min fornemmelse af farten er altid pålidelig, så jeg behøver ikke se på speedometeret.",
    "My sense of speed is always reliable, so I do not need to look at the speedometer.",
    "حس من از سرعت همیشه درست است، پس لازم نیست به سرعت‌سنج نگاه کنم.",
    "Fornemmelsen af fart kan snyde, især efter lang tids hurtig kørsel.",
    "Your sense of speed can deceive you, especially after a long time driving fast.",
    "حس سرعت ممکن است فریب دهد، به‌ویژه پس از مدتی طولانی رانندگی سریع."),
)
