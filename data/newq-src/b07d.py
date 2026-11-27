# «آزمون جدید», batch 7 (5601–5700), part d: moving off (7.1), position (7.2), lane changes (7.4), the motorway (7.16), road risks
# (5.2), safe traffic (6.2), following (7.8), lights (7.19), and one each of 4.4, 4.5, 5.1, 7.5 and 7.15.
# Rules: Færdselsloven §§ 7 stk. 4 (a car with a white cloth in front carrying the seriously ill or injured counts as an emergency
# vehicle; its driver tells the police afterwards), 14 stk. 5 (a crawler lane must be used by vehicles slower than the speed on its
# sign; leave it without danger), 18 stk. 1–2, 19 stk. 1, 21 stk. 1, 24 stk. 1, 31 stk. 2–3 (a vehicle stuck on a level crossing:
# moved at once, or the train drivers warned), 32 stk. 1–2 (in lighting-up time a light signal instead of the horn unless the danger
# is imminent; the horn no longer than necessary), 33 a (dipped beam or daytime running lights outside lighting-up time), 54 stk. 4
# (do not hand the car to someone who cannot drive safely because of drink); Bekendtgørelse om vejafmærkning (BEK 425/2023): E 11,
# E 34 (an emergency stopping place), E 37, Q 41, Q 42, Q 46–47 (a broad edge line: room outside it for pedestrians and cyclists),
# § 57 R 15 (diagonal arrows: change lanes as soon as possible), § 59 S 18 (rumble strips across the road: special care), V 60 (the
# recommended minimum distance is two symbols), V 61 (the recommended lane for an exit), § 68 Y 17 (a flashing yellow diagonal arrow:
# move to the lane it points to as soon as possible).
from nq import Q, S, above, picture, town, view

Q(5676, "7.1", town("""
THE SCENE: a town street; we sit in a car parked at the right kerb just behind a bus stop; at the stop a city bus stands with its left
indicator flashing, about to pull out; in the left door mirror (at the left edge of the picture) the street behind is empty.
MUST BE CLEARLY VISIBLE: the bus ahead with its left indicator flashing, our parked position behind it.
MUST NOT APPEAR: signs other than the bus-stop pole, text, route numbers."""),
  "Du holder ved kantstenen lige bag et busstoppested. Bussen ved stoppestedet blinker til venstre for at køre ud. Du vil også køre ud. "
  "Hvordan forholder du dig?",
  "You are parked at the kerb just behind a bus stop. The bus at the stop is signalling left to pull out. You want to pull out too. What "
  "do you do?",
  "درست پشت یک ایستگاه اتوبوس کنار جدول پارک کرده‌اید. اتوبوسِ ایستگاه برای حرکت راهنمای چپ زده است. شما هم می‌خواهید حرکت کنید. "
  "چه می‌کنید؟",
  S(True, "Jeg lader bussen køre først.", "I let the bus go first.", "می‌گذارم اول اتوبوس برود.",
    "I byen skal kørende, der nærmer sig et stoppested, give bussen mulighed for at køre ud, når den giver tegn.",
    "In town, drivers approaching a stop must let the bus pull out when it signals.",
    "در شهر، رانندگانی که به ایستگاه نزدیک می‌شوند باید وقتی اتوبوس راهنما می‌زند، اجازه دهند حرکت کند."),
  S(True, "Når bussen er kørt, ser jeg mig for igen, før jeg kører ud.", "When the bus has gone, I look again before I pull out.",
    "وقتی اتوبوس رفت، پیش از حرکت دوباره به اطراف نگاه می‌کنم.",
    "Du skal selv sikre dig, at du kan køre ud uden fare eller unødig ulempe for andre.",
    "You must make sure yourself that you can pull out without danger or undue inconvenience to others.",
    "خودتان باید مطمئن شوید که می‌توانید بدون خطر یا مزاحمت بی‌دلیل برای دیگران حرکت کنید."),
  S(False, "Jeg kører ud foran bussen, fordi jeg holdt der først.", "I pull out in front of the bus because I was there first.",
    "جلوی اتوبوس حرکت می‌کنم، چون من زودتر آن‌جا بودم.",
    "Det giver ingen ret at have holdt der først.", "Having been there first gives you no right.", "زودتر بودن هیچ حقی به شما نمی‌دهد."),
  S(False, "Bussen skal vente, til jeg er kørt.", "The bus must wait until I have gone.", "اتوبوس باید صبر کند تا من بروم.",
    "Bussen giver tegn til at køre ud, og du skal give den mulighed for det.", "The bus is signalling to pull out, and you must let it.",
    "اتوبوس برای حرکت راهنما زده و باید به آن فرصت بدهید."),
)

Q(5677, "7.1", town("""
THE SCENE: a town street; we sit in a car parked in a parking lane at the kerb; between the parking lane and our traffic lane runs a
painted cycle lane with bicycle symbols; our left indicator lamp glows on the dashboard strip; in the left door mirror (at the left edge
of the picture) a cyclist approaches in the cycle lane, and a car approaches in the traffic lane further back.
MUST BE CLEARLY VISIBLE: the cycle lane between us and the traffic lane, the cyclist in the mirror, the car further back.
MUST NOT APPEAR: signs, text."""),
  "Du holder i en parkeringsbane. Mellem parkeringsbanen og din vognbane er der en cykelbane. Du vil køre ud. Hvordan forholder du dig?",
  "You are parked in a parking lane. Between the parking lane and your traffic lane there is a cycle lane. You want to pull out. What do "
  "you do?",
  "در یک خط پارک ایستاده‌اید. بین خط پارک و خط حرکت شما یک خط دوچرخه هست. می‌خواهید حرکت کنید. چه می‌کنید؟",
  S(True, "Jeg venter, til cyklisten er kørt forbi, før jeg kører ud over cykelbanen.", "I wait until the cyclist has passed before I pull out across the cycle lane.",
    "صبر می‌کنم تا دوچرخه‌سوار رد شود و بعد از روی خط دوچرخه حرکت می‌کنم.",
    "Du skal sikre dig, at du kan køre ud uden fare eller unødig ulempe for andre.", "You must make sure that you can pull out without danger or undue inconvenience to others.",
    "باید مطمئن شوید که می‌توانید بدون خطر یا مزاحمت بی‌دلیل برای دیگران حرکت کنید."),
  S(True, "Jeg kigger over skulderen, fordi en cyklist kan være i den blinde vinkel.", "I look over my shoulder because a cyclist may be in the blind spot.",
    "از روی شانه نگاه می‌کنم، چون ممکن است دوچرخه‌سواری در نقطه‌ی کور باشد.",
    "Spejlene viser ikke alt ved siden af bilen.", "The mirrors do not show everything beside the car.", "آینه‌ها همه‌چیزِ کنار خودرو را نشان نمی‌دهند."),
  S(True, "Jeg blinker til venstre, før jeg kører ud fra parkeringsbanen.", "I signal left before I pull out of the parking lane.",
    "پیش از بیرون آمدن از خط پارک، راهنمای چپ می‌زنم.",
    "Du skal give tegn før igangsætning fra kanten af vejen.", "You must signal before pulling out from the edge of the road.",
    "پیش از حرکت از کنار جاده باید راهنما بزنید."),
  S(False, "Cyklisten skal holde tilbage, når jeg blinker.", "The cyclist must give way when I signal.", "وقتی راهنما می‌زنم، دوچرخه‌سوار باید راه بدهد.",
    "Blinklyset giver dig ingen ret til at køre ud.", "The indicator gives you no right to pull out.", "راهنما به شما حق حرکت نمی‌دهد."),
)

Q(5678, "7.1", town("""
THE SCENE: a town street with a standing queue of cars in our direction; we sit in a car parked at the right kerb; the car in the queue
level with our front has left a gap and flashes its headlights; between the queue and the parked cars a cyclist is riding up along the
right side of the queue from behind.
MUST BE CLEARLY VISIBLE: the gap in the queue, the flashing car, the cyclist riding up beside the queue.
MUST NOT APPEAR: signs, text."""),
  "Du holder ved kantstenen, og trafikken står i kø. En bil i køen holder tilbage og blinker med lyset for at lukke dig ud. Hvad gælder?",
  "You are parked at the kerb, and the traffic is standing in a queue. A car in the queue holds back and flashes its lights to let you "
  "out. What applies?",
  "کنار جدول پارک کرده‌اید و ترافیک در صف ایستاده است. خودرویی در صف عقب می‌ماند و با چراغ علامت می‌دهد تا شما بیرون بیایید. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Jeg kører kun ud, når jeg selv har sikret mig, at det kan ske uden fare.", "I only pull out when I have made sure myself that it can be done safely.",
    "فقط وقتی حرکت می‌کنم که خودم مطمئن شده باشم بی‌خطر است.",
    "Lyssignalet er ikke en tilladelse; ansvaret er dit.", "The light signal is not a permission; the responsibility is yours.",
    "علامت نوری اجازه نیست؛ مسئولیت با شماست."),
  S(True, "En cyklist kan komme op langs køen i højre side, hvor jeg ikke kan se ham.", "A cyclist may come up along the right side of the queue where I cannot see him.",
    "ممکن است دوچرخه‌سواری از سمت راستِ صف جلو بیاید، جایی که او را نمی‌بینم.",
    "Cyklister må overhale andre køretøjer højre om.", "Cyclists may overtake other vehicles on the right.",
    "دوچرخه‌سواران اجازه دارند از سمت راستِ وسایل دیگر سبقت بگیرند."),
  S(False, "Lyssignalet giver mig ret til at køre ud.", "The light signal gives me the right to pull out.", "این علامت نوری به من حق حرکت می‌دهد.",
    "Et lyssignal giver ingen ret.", "A light signal gives no right.", "علامت نوری هیچ حقی نمی‌دهد."),
  S(False, "Jeg kører hurtigt ud, så jeg ikke holder køen op.", "I pull out quickly so that I do not hold up the queue.",
    "سریع بیرون می‌آیم تا صف را معطل نکنم.",
    "En hurtig igangsætning giver dig mindre tid til at opdage cyklisten.", "Pulling out quickly gives you less time to spot the cyclist.",
    "حرکت سریع فرصت شما را برای دیدن دوچرخه‌سوار کمتر می‌کند."),
)

Q(5679, "7.2", view("""
THE SCENE: a country road; along the right side runs a broad DOTTED white edge line, and outside it a broad paved strip; a cyclist rides
on the strip ahead; there is no unbroken line anywhere.
MUST BE CLEARLY VISIBLE: the broad dotted edge line, the broad paved strip outside it, the cyclist on the strip.
MUST NOT APPEAR: signs, text."""),
  "Langs højre side af vejen er der en bred, punkteret kantlinje, og uden for den en bred, asfalteret kant. Hvad gælder?",
  "Along the right side of the road there is a broad dotted edge line and outside it a broad paved strip. What applies?",
  "در سمت راست جاده یک خط کناریِ پهن و بریده‌بریده هست و بیرون از آن حاشیه‌ای پهن و آسفالته. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må krydse linjen, hvis det kan ske uden fare eller unødig ulempe for andre.",
    "I may cross the line if it can be done without danger or undue inconvenience to others.",
    "اگر برای دیگران خطر یا مزاحمت بی‌دلیل نداشته باشد، می‌توانم از این خط عبور کنم.",
    "En punkteret kantlinje angiver, at det er tilladt at krydse den, når det ikke strider mod andre regler.",
    "A dotted edge line shows that it may be crossed when this does not conflict with other rules.",
    "خط کناریِ بریده‌بریده نشان می‌دهد که می‌توان از آن عبور کرد، اگر با قواعد دیگر در تضاد نباشد."),
  S(True, "Når linjen er bred, er kanten uden for den bred nok til gående og cyklister.",
    "When the line is broad, the strip outside it is wide enough for pedestrians and cyclists.",
    "وقتی خط پهن است، حاشیه‌ی بیرون از آن برای عابران و دوچرخه‌سواران به اندازه‌ی کافی پهن است.",
    "Kantlinjen er bred, hvor arealet uden for den er bredt nok til færdsel af gående, cyklister og lignende.",
    "The edge line is broad where the area outside it is wide enough for pedestrians, cyclists and the like.",
    "خط کناری جایی پهن است که فضای بیرون از آن برای عابران، دوچرخه‌سواران و مانند آن‌ها کافی باشد."),
  S(True, "Jeg holder øje med cyklisten på kanten, når jeg kører forbi.", "I keep an eye on the cyclist on the strip when I pass.",
    "هنگام رد شدن، مراقب دوچرخه‌سوارِ روی حاشیه هستم.",
    "Cyklisten kan svinge ind mod din vognbane, fx for at komme uden om noget.", "The cyclist may swerve towards your lane, for example to get round something.",
    "ممکن است دوچرخه‌سوار مثلاً برای دور زدن چیزی به سمت خط شما بپیچد."),
  S(False, "En punkteret kantlinje må aldrig overskrides.", "A dotted edge line may never be crossed.", "از خط کناریِ بریده‌بریده هیچ‌وقت نباید عبور کرد.",
    "Det er netop den ubrudte kantlinje, der kun må overskrides i særlige tilfælde.", "It is the unbroken edge line that may only be crossed in special cases.",
    "این خط کناریِ ممتد است که فقط در موارد خاص می‌توان از آن عبور کرد."),
)

Q(5680, "7.2", view("""
THE SCENE: a road with two lanes in our direction; between the lanes runs a white line of SHORT dashes with LONG gaps between them; the
road is straight, with light traffic.
MUST BE CLEARLY VISIBLE: the line of short dashes with long gaps between the two lanes.
MUST NOT APPEAR: signs, text."""),
  "Mellem to vognbaner i din retning er der en linje med korte streger og lange mellemrum. Hvad gælder?",
  "Between two lanes in your direction there is a line of short dashes with long gaps. What applies?",
  "بین دو خطِ هم‌جهت با شما، خطی با تکه‌های کوتاه و فاصله‌های بلند کشیده شده است. چه قاعده‌ای برقرار است؟",
  S(True, "Det er en vognbanelinje, som jeg må krydse, hvis det kan ske uden fare eller unødig ulempe.",
    "It is a lane line that I may cross if it can be done without danger or undue inconvenience.",
    "این خطِ جداکننده‌ی خطوط است و اگر بی‌خطر و بدون مزاحمت بی‌دلیل باشد، می‌توانم از آن عبور کنم.",
    "En vognbanelinje adskiller vognbaner og må overskrides, når manøvren kan ske uden fare eller unødig ulempe.",
    "A lane line separates lanes and may be crossed when the manoeuvre can be done without danger or undue inconvenience.",
    "خط جداکننده خطوط را از هم جدا می‌کند و اگر مانور بی‌خطر و بدون مزاحمت بی‌دلیل باشد، می‌توان از آن عبور کرد."),
  S(False, "Linjen varsler, at der snart kommer en spærrelinje.", "The line warns that an unbroken line is coming soon.",
    "این خط هشدار می‌دهد که به‌زودی خط ممتد شروع می‌شود.",
    "Det gør varslingslinjen, som har lange streger og korte mellemrum.", "That is the warning line, which has long dashes and short gaps.",
    "این کارِ خط هشدار است که تکه‌های بلند و فاصله‌های کوتاه دارد."),
  S(False, "Linjen må aldrig overskrides.", "The line may never be crossed.", "از این خط هیچ‌وقت نباید عبور کرد.",
    "Det gælder spærrelinjen, ikke vognbanelinjen.", "That applies to the unbroken line, not the lane line.", "این برای خط ممتد است، نه خط جداکننده‌ی خطوط."),
)

Q(5681, "7.2", view("""
THE SCENE: a long uphill country road; an extra lane on the right begins, and beside it stands a blue square sign showing a slow lorry
symbol and the number 50 (the Danish crawler-lane sign); we tow a heavy caravan (its front corner visible in the right door mirror at
the right edge of the picture) and the speedometer shows 45 km/h.
MUST BE CLEARLY VISIBLE: the crawler lane beginning on the right, the sign with 50, the caravan in the mirror.
MUST NOT APPEAR: other signs, any other text."""),
  "Op ad en lang bakke er der et krybespor. Tavlen viser 50 km/t. Du kører 45 km/t med en tung campingvogn. Hvad gælder?",
  "Up a long hill there is a crawler lane. The sign shows 50 km/h. You are doing 45 km/h with a heavy caravan. What applies?",
  "در یک سربالایی طولانی، خطی ویژه‌ی وسایل کُند هست. تابلو ۵۰ کیلومتر بر ساعت را نشان می‌دهد. شما با یک کاروان سنگین ۴۵ کیلومتر بر "
  "ساعت می‌رانید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal køre i krybesporet, fordi jeg kører langsommere end farten på tavlen.",
    "I must drive in the crawler lane because I am going slower than the speed on the sign.",
    "باید در خط ویژه‌ی وسایل کُند برانم، چون آهسته‌تر از سرعتِ روی تابلو می‌رانم.",
    "Et krybespor skal bruges af køretøjer, der kører langsommere end den hastighed, tavlen ved krybesporet angiver.",
    "A crawler lane must be used by vehicles going slower than the speed shown on the sign at the crawler lane.",
    "خط ویژه‌ی وسایل کُند را باید وسایلی استفاده کنند که آهسته‌تر از سرعتِ روی تابلوی آن می‌رانند."),
  S(True, "Når krybesporet ender, sikrer jeg mig, at jeg kan køre ud uden fare eller unødig ulempe.",
    "When the crawler lane ends, I make sure I can move out without danger or undue inconvenience.",
    "وقتی این خط تمام می‌شود، مطمئن می‌شوم که بدون خطر یا مزاحمت بی‌دلیل وارد خط اصلی می‌شوم.",
    "Ved udkørsel fra krybesporet skal du sikre dig, at manøvren kan udføres uden fare eller unødig ulempe for andre.",
    "When leaving the crawler lane, you must make sure the manoeuvre can be done without danger or undue inconvenience to others.",
    "هنگام خروج از این خط باید مطمئن شوید که مانور برای دیگران خطر یا مزاحمت بی‌دلیل ندارد."),
  S(False, "Krybesporet er kun for lastbiler.", "The crawler lane is only for lorries.", "این خط فقط برای کامیون‌هاست.",
    "Det gælder alle køretøjer, der kører langsommere end farten på tavlen.", "It applies to all vehicles going slower than the speed on the sign.",
    "برای همه‌ی وسایلی است که آهسته‌تر از سرعتِ روی تابلو می‌رانند."),
  S(False, "Jeg må blive i den almindelige vognbane, når havariblinket er tændt.", "I may stay in the ordinary lane when the hazard lights are on.",
    "اگر چراغ‌های فلاشر روشن باشد، می‌توانم در خط معمولی بمانم.",
    "Havariblinket ændrer ikke pligten til at bruge krybesporet.", "The hazard lights do not change the duty to use the crawler lane.",
    "چراغ فلاشر وظیفه‌ی استفاده از این خط را تغییر نمی‌دهد."),
)

Q(5682, "7.4", above("""
THE SCENE: a road seen from above with two lanes in our direction separated by a dotted lane line; in the gaps of the dotted line white
diagonal arrows point from our lane (the right lane) towards the left lane; further ahead our lane ends.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane; a GREY car in the left lane a little behind; a SOLID GREEN
arrow from the red car moving into the left lane in front of the grey car with a safe gap.
MUST NOT APPEAR: signs, text."""),
  "I mellemrummene i linjen mellem din vognbane og vognbanen til venstre er der malet skrå pile, der peger mod venstre. Hvad gælder?",
  "In the gaps of the line between your lane and the lane to the left, diagonal arrows pointing left are painted. What applies?",
  "در فاصله‌های خطِ بین خط شما و خط سمت چپ، پیکان‌های مورب رو به چپ کشیده شده است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal snarest skifte til vognbanen til venstre.", "I must change to the lane on the left as soon as possible.",
    "باید هرچه زودتر به خط سمت چپ بروم.",
    "Skrå pile i mellemrummene af en punkteret linje angiver, at du snarest skal skifte til den vognbane, pilen peger mod.",
    "Diagonal arrows in the gaps of a dotted line mean that you must change to the lane they point to as soon as possible.",
    "پیکان‌های مورب در فاصله‌های خط بریده‌بریده یعنی باید هرچه زودتر به خطی بروید که پیکان به آن اشاره می‌کند."),
  S(True, "Jeg skal sikre mig, at vognbaneskiftet kan ske uden fare eller unødig ulempe for andre.",
    "I must make sure that the lane change can be done without danger or undue inconvenience to others.",
    "باید مطمئن شوم که تغییر خط برای دیگران خطر یا مزاحمت بی‌دلیل ندارد.",
    "Den, der skifter vognbane, har ansvaret for, at det sker sikkert, når vognbanelinjen fortsætter.",
    "The one changing lanes is responsible for doing it safely when the lane line continues.",
    "وقتی خط جداکننده ادامه دارد، کسی که خط عوض می‌کند مسئول ایمن بودن آن است."),
  S(True, "Jeg giver tegn i god tid, før jeg skifter.", "I signal in good time before I change lanes.", "پیش از تغییر خط، به‌موقع راهنما می‌زنم.",
    "Tegn skal gives i god tid før manøvren.", "Signals must be given in good time before the manoeuvre.", "راهنما باید به‌موقع پیش از مانور زده شود."),
  S(False, "Pilene er kun en anbefaling, så jeg kan blive i min vognbane.", "The arrows are only a recommendation, so I may stay in my lane.",
    "این پیکان‌ها فقط توصیه‌اند، پس می‌توانم در خط خودم بمانم.",
    "Pilene angiver, at du snarest skal skifte vognbane.", "The arrows mean that you must change lanes as soon as possible.",
    "این پیکان‌ها یعنی باید هرچه زودتر خط عوض کنید."),
)

Q(5683, "7.4", view("""
THE SCENE: a wide road with three lanes in our direction approaching a junction; above each lane hangs a blue sign with a white arrow:
over the left lane an arrow to the left, over the middle lane an arrow straight ahead, over the right lane an arrow to the right; we
drive in the middle lane.
MUST BE CLEARLY VISIBLE: the three overhead signs with their arrows, each above its lane.
MUST NOT APPEAR: other signs, text."""),
  "Over vognbanerne før et kryds hænger tavler med pile, én over hver vognbane. Hvad gælder?",
  "Before a junction, signs with arrows hang above the lanes, one above each lane. What applies?",
  "پیش از یک تقاطع، بالای خطوط تابلوهایی با پیکان آویزان است، یکی بالای هر خط. چه قاعده‌ای برقرار است؟",
  S(True, "Hver tavle viser, hvilke retninger vognbanen under den er beregnet for.", "Each sign shows which directions the lane under it is for.",
    "هر تابلو نشان می‌دهد خطِ زیر آن برای کدام جهت‌هاست.",
    "Ophængte piletavler angiver de kørselsretninger i krydset, som vognbanen under tavlen er beregnet for.",
    "Overhead arrow signs show the directions at the junction that the lane under each sign is for.",
    "تابلوهای پیکانِ آویزان جهت‌هایی از تقاطع را نشان می‌دهند که خطِ زیرشان برای آن‌هاست."),
  S(True, "Jeg finder den rigtige vognbane i god tid, før jeg når krydset.", "I find the right lane in good time before I reach the junction.",
    "پیش از رسیدن به تقاطع، به‌موقع خط درست را پیدا می‌کنم.",
    "Du skal i god tid før krydset placere dig i den rigtige vognbane.", "You must place yourself in the right lane in good time before the junction.",
    "باید به‌موقع پیش از تقاطع در خط درست قرار بگیرید."),
  S(False, "Tavlerne er kun vejledende, så jeg må køre, hvorhen jeg vil, fra alle vognbaner.",
    "The signs are only a guide, so I may go wherever I like from any lane.", "این تابلوها فقط راهنمایی‌اند، پس از هر خطی می‌توانم به هر طرف بروم.",
    "Vognbanen skal bruges til de retninger, tavlen over den viser.", "The lane must be used for the directions shown on the sign above it.",
    "هر خط را باید برای جهت‌هایی به کار برد که تابلوی بالای آن نشان می‌دهد."),
  S(False, "Har jeg valgt forkert, kan jeg skifte vognbane inde i krydset.", "If I have chosen wrongly, I can change lanes inside the junction.",
    "اگر اشتباه انتخاب کرده باشم، می‌توانم داخل تقاطع خط عوض کنم.",
    "Er du i en forkert vognbane, må du følge den og køre en anden vej.", "If you are in the wrong lane, you must follow it and take another route.",
    "اگر در خط اشتباه هستید، باید همان را دنبال کنید و از مسیر دیگری بروید."),
)

Q(5684, "7.4", view("""
THE SCENE: a motorway with two lanes in our direction; we drive in the LEFT lane; ahead in the right lane a lorry has its left
indicator flashing and is about to move out to overtake another, slower lorry in front of it.
MUST BE CLEARLY VISIBLE: the lorry with its left indicator flashing, the slower lorry in front of it.
MUST NOT APPEAR: signs, text."""),
  "Du kører i venstre vognbane på motorvejen. En lastbil i højre vognbane blinker til venstre for at overhale en anden lastbil. Hvordan "
  "forholder du dig?",
  "You are in the left lane on the motorway. A lorry in the right lane signals left to overtake another lorry. What do you do?",
  "در خط چپ آزادراه می‌رانید. کامیونی در خط راست برای سبقت از کامیون دیگری راهنمای چپ زده است. چه می‌کنید؟",
  S(True, "Lastbilen skal sikre sig, at den kan skifte vognbane uden fare eller unødig ulempe for mig.",
    "The lorry must make sure that it can change lanes without danger or undue inconvenience to me.",
    "کامیون باید مطمئن شود که می‌تواند بدون خطر یا مزاحمت بی‌دلیل برای من خط عوض کند.",
    "Den, der skifter vognbane, har ansvaret for, at det kan ske sikkert.", "The one changing lanes is responsible for making sure it can be done safely.",
    "کسی که خط عوض می‌کند مسئول ایمن بودن آن است."),
  S(True, "Jeg kan gøre det lettere ved at slippe speederen og give lastbilen plads.", "I can make it easier by easing off the accelerator and giving the lorry room.",
    "می‌توانم با برداشتن پا از روی گاز و جا دادن به کامیون، کار را آسان‌تر کنم.",
    "Hensyn til andre gør trafikken sikrere for alle.", "Consideration for others makes traffic safer for everyone.",
    "ملاحظه‌ی دیگران ترافیک را برای همه ایمن‌تر می‌کند."),
  S(False, "Jeg sætter farten op for at nå forbi, før lastbilen kommer ud.", "I speed up to get past before the lorry moves out.",
    "سرعتم را بالا می‌برم تا پیش از بیرون آمدن کامیون رد شوم.",
    "Så kan I komme meget tæt på hinanden, hvis lastbilen alligevel kommer ud.", "Then you may come very close to each other if the lorry moves out anyway.",
    "اگر کامیون به هر حال بیرون بیاید، ممکن است خیلی به هم نزدیک شوید."),
  S(False, "Jeg dytter for at vise, at lastbilen skal vente.", "I sound the horn to show that the lorry must wait.", "بوق می‌زنم تا نشان دهم کامیون باید صبر کند.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5685, "7.16", view("""
THE SCENE: a motorway with three lanes in our direction under an overhead gantry; above our lane (the left lane) a lane signal shows a
FLASHING YELLOW diagonal arrow pointing down to the right, towards the middle lane; above the middle and right lanes green arrows point
down.
MUST BE CLEARLY VISIBLE: the flashing yellow diagonal arrow above our lane, the green arrows above the other lanes.
MUST NOT APPEAR: signs, text."""),
  "Over din vognbane på motorvejen lyser en gul blinkende skrå pil, der peger mod vognbanen til højre. Hvad gælder?",
  "Above your lane on the motorway a flashing yellow diagonal arrow pointing towards the lane on the right is lit. What applies?",
  "بالای خط شما در آزادراه، پیکانِ موربِ زردِ چشمک‌زنی رو به خط سمت راست روشن است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal snarest skifte til den vognbane, pilen peger mod.", "I must move to the lane the arrow points to as soon as possible.",
    "باید هرچه زودتر به خطی بروم که پیکان به آن اشاره می‌کند.",
    "En gul blinkende skrå pil betyder, at trafikanter i vognbanen snarest skal køre over i den vognbane, pilen peger mod.",
    "A flashing yellow diagonal arrow means that road users in the lane must move to the lane it points to as soon as possible.",
    "پیکان مورب زردِ چشمک‌زن یعنی کسانی که در آن خط‌اند باید هرچه زودتر به خطی بروند که پیکان نشان می‌دهد."),
  S(False, "Den gule pil betyder, at vognbanen er åben, og at jeg kan blive i den.", "The yellow arrow means that the lane is open and I can stay in it.",
    "پیکان زرد یعنی این خط باز است و می‌توانم در آن بمانم.",
    "Det er den grønne pil, der viser en åben vognbane.", "It is the green arrow that shows an open lane.", "این پیکان سبز است که خط باز را نشان می‌دهد."),
  S(False, "Den gule pil betyder, at jeg skal standse.", "The yellow arrow means that I must stop.", "پیکان زرد یعنی باید بایستم.",
    "Pilen betyder, at du skal skifte vognbane, ikke standse.", "The arrow means that you must change lanes, not stop.",
    "این پیکان یعنی باید خط عوض کنید، نه این‌که بایستید."),
)

Q(5686, "7.16", view("""
THE SCENE: a motorway with two lanes in our direction; in the right lane, ahead of us, a large white number painted on the road surface
inside a white outline (an exit-number symbol); further ahead an exit is signposted by a slip road leaving on the right.
MUST BE CLEARLY VISIBLE: the exit-number symbol painted in the right lane, the slip road further ahead.
MUST NOT APPEAR: signs, any text except the painted number."""),
  "På motorvejen er der malet et frakørselsnummer i højre vognbane. Hvad betyder det?",
  "On the motorway an exit number is painted in the right lane. What does it mean?",
  "در آزادراه، شماره‌ی یک خروجی روی خط راست نقاشی شده است. معنی‌اش چیست؟",
  S(True, "Symbolet viser den anbefalede vognbane til frakørslen med det nummer.", "The symbol shows the recommended lane for the exit with that number.",
    "این نماد خطِ توصیه‌شده برای خروجیِ همان شماره را نشان می‌دهد.",
    "Symbolet for frakørselsnummer angiver den anbefalede vognbane til den viste frakørsel.",
    "The exit-number symbol shows the recommended lane for the exit shown.",
    "نماد شماره‌ی خروجی، خطِ توصیه‌شده برای آن خروجی را نشان می‌دهد."),
  S(True, "Skal jeg af ved den frakørsel, placerer jeg mig i den vognbane i god tid.", "If I am leaving at that exit, I move into that lane in good time.",
    "اگر از آن خروجی بیرون می‌روم، به‌موقع در آن خط قرار می‌گیرم.",
    "Så undgår du sene vognbaneskift lige før frakørslen.", "That way you avoid late lane changes just before the exit.",
    "این‌طور از تغییر خطِ دیرهنگامِ درست پیش از خروجی جلوگیری می‌کنید."),
  S(False, "Symbolet betyder, at vognbanen ender ved frakørslen, og at alle skal af.", "The symbol means that the lane ends at the exit and everyone must leave.",
    "این نماد یعنی این خط در خروجی تمام می‌شود و همه باید خارج شوند.",
    "Det er kun en anbefaling af vognbane til frakørslen.", "It is only a recommendation of a lane for the exit.",
    "این فقط توصیه‌ای درباره‌ی خطِ مناسب برای خروجی است."),
  S(False, "Tallet er en hastighedsgrænse.", "The number is a speed limit.", "این عدد حد سرعت است.",
    "Tallet er frakørslens nummer.", "The number is the exit's number.", "این عدد شماره‌ی خروجی است."),
)

Q(5687, "7.16", view("""
THE SCENE: a motorway without a hard shoulder; at the right edge a short lay-by widens the road, and beside it stands a blue square sign
showing a white symbol of a car pulled in beside a lane, together with a small telephone and fire-extinguisher symbol (the Danish sign
for an emergency stopping place).
MUST BE CLEARLY VISIBLE: the short lay-by, the emergency-place sign.
MUST NOT APPEAR: other signs, text."""),
  "På motorvejen står denne tavle ved en kort udvidelse i vejkanten. Du er sulten og vil holde ind og spise din madpakke. Hvad gælder?",
  "On the motorway this sign stands at a short widening at the edge of the road. You are hungry and want to pull in and eat your packed "
  "lunch. What applies?",
  "در آزادراه این تابلو کنار یک تعریضِ کوتاهِ لبه‌ی جاده قرار دارد. گرسنه‌اید و می‌خواهید کنار بکشید و غذایتان را بخورید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Nødpladsen må kun bruges til nødstop.", "The emergency place may only be used for emergency stops.",
    "این جای اضطراری فقط برای توقف اضطراری است.",
    "Tavlen angiver en plads, der kan benyttes til nødstop, og på motorvejen må der ellers kun standses på parkerings- og rastepladser.",
    "The sign marks a place that can be used for emergency stops, and on the motorway you may otherwise only stop at parking and rest areas.",
    "این تابلو جایی برای توقف اضطراری را نشان می‌دهد و در آزادراه جز آن فقط در پارکینگ‌ها و استراحتگاه‌ها می‌توان ایستاد."),
  S(False, "Jeg må gerne holde der og spise, når jeg holder helt inde.", "I may stop there and eat as long as I am pulled right in.",
    "اگر کاملاً کنار بکشم، می‌توانم آن‌جا بایستم و غذا بخورم.",
    "Vil du holde pause, skal du køre til en rasteplads.", "If you want a break, you must drive to a rest area.",
    "اگر می‌خواهید استراحت کنید، باید به یک استراحتگاه بروید."),
  S(False, "Jeg må holde der i højst 15 minutter.", "I may stand there for at most 15 minutes.", "حداکثر ۱۵ دقیقه می‌توانم آن‌جا بایستم.",
    "Pladsen er kun til nødstop, uanset hvor kort tid det varer.", "The place is only for emergency stops, however short.",
    "این جا، هر قدر هم کوتاه، فقط برای توقف اضطراری است."),
  S(False, "Nødpladsen er en almindelig parkeringsplads.", "The emergency place is an ordinary parking area.", "این جای اضطراری یک پارکینگ معمولی است.",
    "Den er kun beregnet til nødstop.", "It is only meant for emergency stops.", "فقط برای توقف اضطراری در نظر گرفته شده است."),
)

Q(5688, "5.2", town("""
THE SCENE: a town street paved with cobblestones in rain; light-rail tracks run along the street; the cobbles and the shiny rails reflect
the light; a cyclist rides ahead of us close to the rails.
MUST BE CLEARLY VISIBLE: the wet cobblestones, the shiny wet rails, the cyclist close to them.
MUST NOT APPEAR: signs, text, trams.""", cond="rain, wet road"),
  "Du kører på en gade med brosten og letbaneskinner. Det regner. Hvad skal du være opmærksom på?",
  "You are driving on a street with cobblestones and light-rail tracks. It is raining. What must you be aware of?",
  "در خیابانی سنگفرش با ریل‌های قطار شهری سبک می‌رانید. باران می‌بارد. به چه چیزی باید توجه کنید؟",
  S(True, "Brosten og skinner kan være meget glatte, når de er våde.", "Cobblestones and rails can be very slippery when they are wet.",
    "سنگفرش و ریل‌ها وقتی خیس‌اند، ممکن است بسیار لغزنده باشند.",
    "Glatte overflader giver dårligt vejgreb i regnvejr.", "Smooth surfaces give poor grip in the rain.", "سطوح صاف در باران چسبندگی کمی دارند."),
  S(True, "Bremselængden kan blive længere, så jeg holder større afstand.", "The braking distance may be longer, so I keep a greater distance.",
    "ممکن است مسافت ترمز بیشتر شود، پس فاصله‌ی بیشتری می‌گیرم.",
    "I vådt og glat føre skal farten være passende lav.", "In wet and slippery conditions the speed must be suitably low.",
    "در شرایط خیس و لغزنده، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Cyklister og motorcyklister kan glide på skinnerne, så jeg holder god afstand til dem.",
    "Cyclists and motorcyclists may slip on the rails, so I keep a good distance from them.",
    "دوچرخه‌سواران و موتورسواران ممکن است روی ریل‌ها لیز بخورند، پس فاصله‌ی کافی از آن‌ها می‌گیرم.",
    "Smalle hjul kan glide på våde skinner.", "Narrow wheels can slip on wet rails.", "چرخ‌های باریک ممکن است روی ریل خیس لیز بخورند."),
  S(False, "Brosten giver bedre greb end asfalt i regnvejr.", "Cobblestones give better grip than asphalt in the rain.",
    "سنگفرش در باران از آسفالت چسبندگی بهتری دارد.",
    "Våde brosten er ofte mere glatte end asfalt.", "Wet cobblestones are often more slippery than asphalt.",
    "سنگفرشِ خیس اغلب از آسفالت لغزنده‌تر است."),
)

Q(5689, "5.2", view("""
THE SCENE: a two-lane country road in early spring; the asphalt in our lane has several deep potholes filled with water; an oncoming car
approaches in the other lane.
MUST BE CLEARLY VISIBLE: the potholes in our lane, the oncoming car.
MUST NOT APPEAR: signs, text."""),
  "Efter vinteren er der mange dybe huller i asfalten i din vognbane. En bil kommer imod dig. Hvordan forholder du dig?",
  "After the winter there are many deep holes in the asphalt in your lane. A car is coming towards you. What do you do?",
  "پس از زمستان، آسفالت خط شما چاله‌های عمیق زیادی دارد. خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned, så jeg kan nå at se hullerne og køre roligt.", "I slow down so that I have time to see the holes and drive calmly.",
    "سرعتم را کم می‌کنم تا به‌موقع چاله‌ها را ببینم و آرام برانم.",
    "Farten skal passe til vejens tilstand.", "The speed must suit the state of the road.", "سرعت باید با وضع جاده جور باشد."),
  S(True, "Jeg svinger ikke pludseligt ud i den modsatte vognbane for at undgå et hul.",
    "I do not swerve suddenly into the opposite lane to avoid a hole.", "برای دوری از چاله ناگهان به خط مقابل نمی‌پیچم.",
    "Den modkørende bil er tæt på, og et pludseligt sving kan føre til et sammenstød.", "The oncoming car is close, and a sudden swerve may lead to a collision.",
    "خودروی روبه‌رو نزدیک است و یک پیچش ناگهانی ممکن است به برخورد بینجامد."),
  S(False, "Jeg kører hurtigt, så bilen hopper over hullerne.", "I drive fast so that the car jumps over the holes.",
    "سریع می‌رانم تا خودرو از روی چاله‌ها بپرد.",
    "Høj fart gør skaden og risikoen for at miste herredømmet større.", "High speed makes the damage and the risk of losing control greater.",
    "سرعت زیاد آسیب و خطر از دست دادن کنترل را بیشتر می‌کند."),
  S(False, "Huller i vejen kan ikke skade dæk eller fælge.", "Holes in the road cannot damage tyres or wheel rims.",
    "چاله‌های جاده نمی‌توانند به لاستیک یا رینگ آسیب بزنند.",
    "Et dybt hul kan give et punkteret dæk eller en skadet fælg.", "A deep hole can cause a puncture or a damaged rim.",
    "یک چاله‌ی عمیق ممکن است لاستیک را پنچر یا رینگ را خراب کند."),
)

Q(5690, "6.2", view("""
THE SCENE: a two-lane country road; in the interior rear-view mirror at the top of the picture a private car approaches fast from
behind with a large white cloth fixed across its front; its headlights are on.
MUST BE CLEARLY VISIBLE: the white cloth across the front of the car in the mirror.
MUST NOT APPEAR: blue lights, signs, text."""),
  "En personbil med en hvid dug anbragt foran på bilen kommer hurtigt bag dig og dytter. Hvad gælder?",
  "A private car with a white cloth fixed on its front is coming up fast behind you and sounding its horn. What applies?",
  "یک خودروی شخصی که پارچه‌ای سفید جلویش بسته شده، سریع از پشت می‌آید و بوق می‌زند. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen er under kørslen ligestillet med et udrykningskøretøj.", "During this trip the car counts as an emergency vehicle.",
    "این خودرو در این سفر هم‌ردیف خودروی امدادی است.",
    "En bil med hvid dug foran, der kører med alvorligt syge eller tilskadekomne, er ligestillet med et udrykningskøretøj.",
    "A car with a white cloth in front carrying seriously ill or injured people counts as an emergency vehicle.",
    "خودرویی که پارچه‌ی سفید جلویش است و بیمار یا مصدوم بدحال حمل می‌کند، هم‌ردیف خودروی امدادی است."),
  S(True, "Jeg gør plads i god tid og lader bilen komme forbi.", "I make room in good time and let the car get past.",
    "به‌موقع جا باز می‌کنم و می‌گذارم آن خودرو رد شود.",
    "Udrykningskøretøjer skal have vejen holdt åben.", "Emergency vehicles must have the road kept open for them.",
    "راه باید برای خودروهای امدادی باز نگه داشته شود."),
  S(True, "Bilen kører sandsynligvis en alvorligt syg eller tilskadekommen person.", "The car is probably carrying a seriously ill or injured person.",
    "این خودرو احتمالاً فردی بیمار یا مصدومِ بدحال را حمل می‌کند.",
    "Den hvide dug må kun bruges ved kørsel, der ikke tåler opsættelse.", "The white cloth may only be used for trips that cannot wait.",
    "پارچه‌ی سفید فقط برای سفری است که تأخیر برنمی‌دارد."),
  S(True, "Føreren skal bagefter give politiet besked om kørslen.", "The driver must tell the police about the trip afterwards.",
    "راننده باید بعداً به پلیس درباره‌ی این سفر خبر بدهد.",
    "Føreren skal snarest muligt efter kørslen give politiet meddelelse.", "The driver must inform the police as soon as possible after the trip.",
    "راننده باید هرچه زودتر پس از سفر به پلیس اطلاع دهد."),
)

Q(5691, "6.2", view("""
THE SCENE: a level crossing on a country road; our car has stalled in the middle of the tracks; the barriers are raised and the lights
are dark; along the track no train can be seen yet; the doors of our car are open.
MUST BE CLEARLY VISIBLE: our car standing on the tracks, the open doors, the empty track.
MUST NOT APPEAR: signs other than the crossing's own, text, trains."""),
  "Bilen går i stå midt på en jernbaneoverkørsel, og du kan ikke flytte den med det samme. Hvad gør du?",
  "The car stalls in the middle of a level crossing, and you cannot move it straight away. What do you do?",
  "خودرو وسط تقاطع راه‌آهن خاموش می‌شود و نمی‌توانید فوراً آن را جابه‌جا کنید. چه می‌کنید؟",
  S(True, "Jeg får alle ud af bilen og væk fra sporene med det samme.", "I get everyone out of the car and away from the tracks at once.",
    "فوراً همه را از خودرو بیرون می‌آورم و از ریل‌ها دور می‌کنم.",
    "Et tog kan ikke standse hurtigt, og det er livsfarligt at blive i bilen.", "A train cannot stop quickly, and staying in the car is deadly dangerous.",
    "قطار نمی‌تواند سریع بایستد و ماندن در خودرو بسیار خطرناک است."),
  S(True, "Jeg sørger for, at togene bliver advaret, fx ved straks at ringe 1-1-2.",
    "I make sure the trains are warned, for example by calling 1-1-2 at once.", "ترتیبی می‌دهم که قطارها هشدار بگیرند، مثلاً فوراً با ۱۱۲ تماس می‌گیرم.",
    "Kan køretøjet ikke straks flyttes fra overkørslen, skal føreren advare førere af tog.",
    "If the vehicle cannot be moved off the crossing at once, the driver must warn train drivers.",
    "اگر نتوان خودرو را فوراً از روی تقاطع برداشت، راننده باید رانندگان قطار را باخبر کند."),
  S(True, "Kan bilen flyttes, skal den væk fra sporene hurtigst muligt.", "If the car can be moved, it must be moved off the tracks as soon as possible.",
    "اگر بتوان خودرو را جابه‌جا کرد، باید هرچه زودتر از روی ریل‌ها برداشته شود.",
    "Et køretøj, der er standset et sted, hvor det er forbudt at standse, skal snarest muligt flyttes.",
    "A vehicle that has stopped where stopping is forbidden must be moved as soon as possible.",
    "وسیله‌ای که جایی ایستاده که توقف ممنوع است، باید هرچه زودتر جابه‌جا شود."),
  S(False, "Jeg bliver siddende i bilen og prøver at starte den igen.", "I stay in the car and try to start it again.",
    "داخل خودرو می‌مانم و دوباره سعی می‌کنم روشنش کنم.",
    "Det er livsfarligt at blive i bilen på sporene.", "It is deadly dangerous to stay in the car on the tracks.",
    "ماندن در خودرو روی ریل بسیار خطرناک است."),
)

Q(5692, "7.8", view("""
THE SCENE: a motorway with two lanes in our direction; in our lane white chevron symbols (arrow-like V shapes pointing forward) are
painted at regular intervals; ahead a car drives in our lane with two chevrons between it and us.
MUST BE CLEARLY VISIBLE: the chevrons painted in the lane, the car ahead with two chevrons between us.
MUST NOT APPEAR: signs, text."""),
  "På motorvejen er der malet hvide vinkelsymboler i vognbanen med jævne mellemrum. Hvad betyder de?",
  "On the motorway white chevron symbols are painted in the lane at regular intervals. What do they mean?",
  "در آزادراه، نمادهای سفیدِ هشتی‌شکل با فاصله‌های منظم روی خط کشیده شده‌اند. معنی‌شان چیست؟",
  S(True, "Symbolerne viser den anbefalede sikkerhedsafstand.", "The symbols show the recommended safe distance.",
    "این نمادها فاصله‌ی ایمنیِ توصیه‌شده را نشان می‌دهند.",
    "Sikkerhedssymbolet bruges til at vise den anbefalede sikkerhedsafstand.", "The safety symbol is used to show the recommended safe distance.",
    "نماد ایمنی برای نشان دادن فاصله‌ی ایمنیِ توصیه‌شده به کار می‌رود."),
  S(True, "Der bør være mindst to symboler mellem mig og bilen foran.", "There should be at least two symbols between me and the car in front.",
    "بین من و خودروی جلو باید دست‌کم دو نماد باشد.",
    "Den anbefalede minimale sikkerhedsafstand er til stede, når der er to symboler til køretøjet foran.",
    "The recommended minimum safe distance is there when there are two symbols to the vehicle in front.",
    "وقتی تا وسیله‌ی جلو دو نماد فاصله باشد، حداقلِ فاصله‌ی ایمنیِ توصیه‌شده رعایت شده است."),
  S(False, "Symbolerne viser, at vognbanen snart ender.", "The symbols show that the lane will soon end.", "این نمادها نشان می‌دهند که خط به‌زودی تمام می‌شود.",
    "De viser afstand, ikke vognbanens forløb.", "They show distance, not the course of the lane.", "این‌ها فاصله را نشان می‌دهند، نه مسیر خط را."),
  S(False, "Symbolerne betyder, at jeg skal skifte vognbane.", "The symbols mean that I must change lanes.", "این نمادها یعنی باید خط عوض کنم.",
    "Skift af vognbane vises med skrå pile, ikke med disse symboler.", "A lane change is shown with diagonal arrows, not with these symbols.",
    "تغییر خط با پیکان‌های مورب نشان داده می‌شود، نه با این نمادها."),
)

Q(5693, "7.8", view("""
THE SCENE: a motorway with three lanes in our direction in dense traffic; the cars ahead have their brake lights on, while further ahead
the traffic is moving again; the queue moves in waves.
MUST BE CLEARLY VISIBLE: the dense traffic, the brake lights ahead, the moving traffic further ahead.
MUST NOT APPEAR: signs, text."""),
  "I tæt trafik på motorvejen bremser bilerne foran dig hele tiden og sætter farten op igen. Hvordan forholder du dig?",
  "In dense traffic on the motorway the cars in front of you keep braking and speeding up again. What do you do?",
  "در ترافیک سنگین آزادراه، خودروهای جلو مدام ترمز می‌گیرند و دوباره سرعت می‌گیرند. چه می‌کنید؟",
  S(True, "Jeg holder en større afstand, så jeg kan bremse roligt.", "I keep a greater distance so that I can brake gently.",
    "فاصله‌ی بیشتری می‌گیرم تا بتوانم آرام ترمز کنم.",
    "Med god afstand undgår du hårde opbremsninger og påkørsler bagfra.", "With a good distance you avoid hard braking and rear-end collisions.",
    "با فاصله‌ی کافی از ترمزهای شدید و تصادف از پشت جلوگیری می‌کنید."),
  S(True, "Jeg ser langt frem, så jeg tidligt opdager, når trafikken bremser.", "I look far ahead so that I notice early when the traffic is braking.",
    "دور را نگاه می‌کنم تا زود متوجه ترمز گرفتن ترافیک شوم.",
    "Så kan du sætte farten ned i god tid.", "Then you can slow down in good time.", "این‌طور می‌توانید به‌موقع سرعت را کم کنید."),
  S(True, "Jeg undgår at skifte vognbane hele tiden.", "I avoid changing lanes all the time.", "از تغییر خطِ پیاپی پرهیز می‌کنم.",
    "I tæt trafik i flere rækker må der kun skiftes vognbane, når det er påkrævet.", "In dense traffic in several rows, lanes may only be changed when necessary.",
    "در ترافیک سنگینِ چندردیفه فقط وقتی لازم است می‌توان خط عوض کرد."),
  S(False, "Jeg kører tæt på bilen foran, så andre ikke kører ind foran mig.", "I drive close to the car in front so that others do not cut in front of me.",
    "نزدیک خودروی جلو می‌رانم تا دیگران جلویم نپیچند.",
    "Så har du ikke tid til at standse, hvis bilen foran bremser.", "Then you have no time to stop if the car in front brakes.",
    "این‌طور اگر خودروی جلو ترمز کند، وقت ایستادن ندارید."),
)

Q(5694, "7.19", view("""
THE SCENE: a country road in clear daylight; our car's daytime running lights are on (a small green lamp symbol lit on the dashboard
strip, no text); ahead the sky darkens with heavy clouds and the first drops of rain.
MUST BE CLEARLY VISIBLE: the daytime-running-light symbol, the darkening sky ahead.
MUST NOT APPEAR: signs, text.""", cond="daylight turning dark under heavy clouds"),
  "Det er dag, og du kører med bilens særlige kørelys tændt. Hvad gælder om lyset?",
  "It is daytime, and you are driving with the car's daytime running lights on. What applies to the lights?",
  "روز است و با چراغ‌های روشنایی روز خودرو می‌رانید. درباره‌ی چراغ‌ها چه قاعده‌ای برقرار است؟",
  S(True, "Uden for lygtetændingstiden må jeg bruge særligt kørelys i stedet for nærlys.",
    "Outside lighting-up time I may use daytime running lights instead of dipped beam.",
    "بیرون از زمان روشن کردن چراغ‌ها می‌توانم به‌جای نور پایین از چراغ روشنایی روز استفاده کنم.",
    "Uden for lygtetændingstiden skal der køres med nærlys, men særligt kørelys kan bruges i stedet.",
    "Outside lighting-up time you must drive with dipped beam, but daytime running lights may be used instead.",
    "بیرون از زمان روشن کردن چراغ‌ها باید با نور پایین راند، ولی می‌توان به‌جای آن از چراغ روشنایی روز استفاده کرد."),
  S(True, "Bliver det mørkt, eller gør regn og tåge det svært at se, skal jeg tænde nærlyset.",
    "If it gets dark, or rain and fog make it hard to see, I must switch on the dipped beam.",
    "اگر هوا تاریک شود یا باران و مه دید را سخت کند، باید نور پایین را روشن کنم.",
    "Det er lygtetændingstid, når mørke, tåge, regn eller lignende gør lygterne nødvendige.",
    "It is lighting-up time when darkness, fog, rain or the like make the lights necessary.",
    "وقتی تاریکی، مه، باران یا مانند آن روشن کردن چراغ‌ها را لازم کند، زمان روشن کردن چراغ‌هاست."),
  S(True, "Med kørelyset er baglygterne ofte slukket, så bilen kan være svær at se bagfra i dårligt vejr.",
    "With daytime running lights the rear lights are often off, so the car can be hard to see from behind in bad weather.",
    "با چراغ روشنایی روز معمولاً چراغ‌های عقب خاموش‌اند، پس در هوای بد خودرو از پشت به‌سختی دیده می‌شود.",
    "Derfor er nærlys bedre, når sigtbarheden bliver dårlig.", "That is why dipped beam is better when visibility gets poor.",
    "به همین دلیل وقتی دید بد می‌شود، نور پایین بهتر است."),
  S(False, "Det er tilladt at køre uden lys, når vejret er klart.", "It is allowed to drive without lights when the weather is clear.",
    "وقتی هوا صاف است، رانندگی بدون چراغ مجاز است.",
    "Der skal altid køres med lys, også om dagen.", "You must always drive with lights on, also by day.", "همیشه باید با چراغ روشن رانندگی کرد، حتی روز."),
)

Q(5695, "7.19", town("""
THE SCENE: a town street at night with weak street lighting; about 30 m ahead a pedestrian stands at the kerb between two parked cars,
looking the other way, as if about to cross; the street is otherwise empty.
MUST BE CLEARLY VISIBLE: the pedestrian at the kerb looking the other way, the parked cars around him.
MUST NOT APPEAR: signs, zebra crossings, text.""", cond="night, weak street lighting, dry road"),
  "Det er mørkt. En fodgænger står ved kantstenen et stykke fremme og ser ud til at ville gå over vejen uden at have set dig. Hvad gælder?",
  "It is dark. A pedestrian is standing at the kerb some way ahead and seems about to cross the road without having seen you. What applies?",
  "هوا تاریک است. عابری کمی جلوتر کنار جدول ایستاده و به نظر می‌رسد بدون این‌که شما را دیده باشد می‌خواهد از خیابان رد شود. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Er det nødvendigt at advare ham, bruger jeg lyssignal i stedet for hornet, medmindre faren er overhængende.",
    "If I need to warn him, I use a light signal instead of the horn, unless the danger is imminent.",
    "اگر لازم باشد به او هشدار بدهم، به‌جای بوق از علامت نوری استفاده می‌کنم، مگر آن‌که خطر فوری باشد.",
    "I lygtetændingstiden skal føreren af et motorkøretøj bruge lyssignal i stedet for lydsignal, medmindre faren er overhængende.",
    "In lighting-up time the driver of a motor vehicle must use a light signal instead of the horn unless the danger is imminent.",
    "در زمان روشن کردن چراغ‌ها، رانندگی وسیله‌ی موتوری باید به‌جای بوق از علامت نوری استفاده کند، مگر آن‌که خطر فوری باشد."),
  S(True, "Jeg bremser ned, så jeg kan standse, hvis han går ud.", "I slow down so that I can stop if he steps out.",
    "سرعتم را کم می‌کنم تا اگر وارد خیابان شد، بتوانم بایستم.",
    "Du skal kunne standse foran enhver hindring, der kan påregnes.", "You must be able to stop before any obstacle that can be expected.",
    "باید بتوانید پیش از هر مانعی که قابل پیش‌بینی است بایستید."),
  S(False, "Hornet må aldrig bruges om natten.", "The horn may never be used at night.", "شب‌ها هرگز نباید بوق زد.",
    "Er faren overhængende, må du også bruge hornet om natten.", "If the danger is imminent, you may also use the horn at night.",
    "اگر خطر فوری باشد، شب هم می‌توانید بوق بزنید."),
  S(False, "Jeg dytter længe, så alle i nærheden ser sig for.", "I sound the horn for a long time so that everyone nearby looks around.",
    "مدتی طولانی بوق می‌زنم تا همه‌ی اطرافیان حواسشان جمع شود.",
    "Et lydsignal må ikke vare længere end nødvendigt.", "A sound signal must not last longer than necessary.", "بوق نباید بیش از حد لازم طول بکشد."),
)

Q(5696, "4.4", picture("""
Outside a restaurant in the evening: a man holds out his hand for a car key that another man is holding; on a table behind them stand
several empty beer glasses; a car is parked at the kerb.
MUST BE CLEARLY VISIBLE: the hand reaching for the car key, the empty beer glasses, the parked car.
MUST NOT APPEAR: text, brand names, number-plate characters."""),
  "Din ven har drukket flere øl og vil låne din bil for at køre hjem. Hvad gælder?",
  "Your friend has drunk several beers and wants to borrow your car to drive home. What applies?",
  "دوستتان چند آبجو نوشیده و می‌خواهد خودروی شما را برای رفتن به خانه قرض بگیرد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke overlade bilen til ham, når han ikke kan køre betryggende på grund af spiritus.",
    "I must not let him drive the car when he cannot drive safely because of drink.",
    "وقتی او به‌خاطر نوشیدنی الکلی نمی‌تواند ایمن براند، نباید خودرو را به او بسپارم.",
    "Det er forbudt at overlade føringen af et køretøj til en, der på grund af spiritus ikke kan føre det betryggende.",
    "It is forbidden to let someone drive a vehicle who cannot drive it safely because of drink.",
    "سپردن رانندگی به کسی که به‌خاطر الکل نمی‌تواند ایمن براند، ممنوع است."),
  S(False, "Det er hans eget ansvar, så jeg må gerne låne ham bilen.", "It is his own responsibility, so I may lend him the car.",
    "این مسئولیت خودش است، پس می‌توانم خودرو را به او قرض بدهم.",
    "Forbuddet gælder også den, der overlader bilen.", "The ban also applies to the one who hands over the car.",
    "این ممنوعیت برای کسی که خودرو را می‌سپارد هم هست."),
  S(False, "Det er i orden, hvis han lover at køre langsomt.", "It is fine if he promises to drive slowly.", "اگر قول بدهد آهسته براند، اشکالی ندارد.",
    "Lav fart gør ikke kørslen betryggende, når han er påvirket.", "Low speed does not make the driving safe when he is under the influence.",
    "سرعت کم وقتی او تحت تأثیر الکل است، رانندگی را ایمن نمی‌کند."),
  S(False, "Det er i orden, når det kun er en kort tur.", "It is fine when it is only a short trip.", "اگر مسیر کوتاه باشد، اشکالی ندارد.",
    "Forbuddet gælder uanset turens længde.", "The ban applies whatever the length of the trip.", "این ممنوعیت به طول مسیر بستگی ندارد."),
)

Q(5697, "4.5", town("""
THE SCENE: a town street; ahead of us drives a car with a driving-school roof sign showing the word SKOLEVOGN; it has just slowed down
sharply for no visible reason; the learner's hands grip the wheel tightly.
MUST BE CLEARLY VISIBLE: the driving-school car with its roof sign, its brake lights on.
MUST NOT APPEAR: other text, brand names."""),
  "Foran dig kører en skolevogn med en elev bag rattet. Hvordan forholder du dig?",
  "A driving-school car with a learner at the wheel is driving in front of you. What do you do?",
  "جلوی شما یک خودروی آموزش رانندگی با یک هنرجو پشت فرمان حرکت می‌کند. چه می‌کنید؟",
  S(True, "Jeg holder god afstand, fordi eleven kan bremse eller standse uventet.", "I keep a good distance because the learner may brake or stop unexpectedly.",
    "فاصله‌ی کافی می‌گیرم، چون ممکن است هنرجو ناگهان ترمز کند یا بایستد.",
    "En uerfaren fører kan handle usikkert og uventet.", "An inexperienced driver may act hesitantly and unexpectedly.",
    "رانندگِ کم‌تجربه ممکن است مردد و غیرمنتظره عمل کند."),
  S(False, "Jeg dytter, så eleven lærer at køre hurtigere.", "I sound the horn so that the learner learns to drive faster.",
    "بوق می‌زنم تا هنرجو یاد بگیرد سریع‌تر براند.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
  S(False, "En skolevogn har altid forkørselsret.", "A driving-school car always has right of way.", "خودروی آموزش رانندگی همیشه حق تقدم دارد.",
    "De samme færdselsregler gælder for skolevogne som for andre.", "The same traffic rules apply to driving-school cars as to others.",
    "برای خودروهای آموزش رانندگی هم همان قواعد دیگران برقرار است."),
)

Q(5698, "5.1", view("""
THE SCENE: a country road approaching a village junction; several narrow white raised stripes are laid across our lane one after
another; beyond them the road continues to a junction.
MUST BE CLEARLY VISIBLE: the narrow stripes across the lane, the junction beyond.
MUST NOT APPEAR: signs, text."""),
  "Foran dig ligger der smalle striber tværs over vejen, som brummer, når du kører over dem. Hvad betyder de?",
  "Ahead of you there are narrow stripes across the road that rumble when you drive over them. What do they mean?",
  "جلوی شما نوارهای باریکی عرض جاده را گرفته‌اند که وقتی از رویشان رد می‌شوید صدا می‌دهند. معنی‌شان چیست؟",
  S(True, "Striberne betyder, at jeg skal være særligt agtpågivende.", "The stripes mean that I must take special care.",
    "این نوارها یعنی باید احتیاط ویژه داشته باشم.",
    "Rumlestriber på tværs af vejen angiver, at der skal udvises særlig agtpågivenhed.", "Rumble strips across the road show that special care must be taken.",
    "نوارهای صدادار عرضی نشان می‌دهند که باید احتیاط ویژه داشت."),
  S(False, "Striberne er en stoplinje, hvor jeg skal standse.", "The stripes are a stop line where I must stop.", "این نوارها خط ایستی‌اند که باید پشتشان بایستم.",
    "En stoplinje er én bred ubrudt linje; disse striber er en advarsel.", "A stop line is one broad unbroken line; these stripes are a warning.",
    "خط ایست یک خط پهن و ممتد است؛ این نوارها هشدارند."),
  S(False, "Striberne er et fodgængerfelt.", "The stripes are a pedestrian crossing.", "این نوارها خط عابر پیاده‌اند.",
    "Et fodgængerfelt har brede striber på langs af vejen.", "A pedestrian crossing has broad stripes running along the road.",
    "خط عابر پیاده نوارهای پهنی در امتداد جاده دارد."),
)

Q(5699, "7.5", above("""
THE SCENE: a narrow town street seen from above, too narrow to turn round in one go; a quiet side road goes off to the RIGHT.
VEHICLES (colour code used strictly): a RED car (ours) just past the side road on the main street; a SOLID GREEN arrow from the red car
reversing into the side road, then a second SOLID GREEN arrow driving forwards out of the side road to the left; a DASHED ORANGE arrow
from the red car driving forwards into the side road and reversing out onto the street.
MUST NOT APPEAR: signs, text."""),
  "Du er kørt forkert i en gade, der er for smal til at vende forlæns, og vil vende ved hjælp af en sidevej til højre. Hvordan gør du?",
  "You have taken a wrong turn in a street that is too narrow to turn round forwards, and you want to turn round using a side road on the "
  "right. How do you do it?",
  "در خیابانی که برای دور زدنِ رو به جلو خیلی باریک است، راه را اشتباه رفته‌اید و می‌خواهید با کمک یک راه فرعی در سمت راست دور بزنید. "
  "چطور این کار را می‌کنید؟",
  S(True, "Jeg bakker ind i sidevejen og kører forlæns ud igen, så jeg kan se trafikken, når jeg kører ud.",
    "I reverse into the side road and drive out forwards, so that I can see the traffic when I drive out.",
    "با دنده‌عقب وارد راه فرعی می‌شوم و رو به جلو بیرون می‌آیم تا هنگام خروج ترافیک را ببینم.",
    "Så kører du ud på den befærdede gade med fronten først og med godt udsyn.", "Then you come out onto the busy street front first with a good view.",
    "این‌طور با جلوی خودرو و با دید کافی وارد خیابان شلوغ می‌شوید."),
  S(True, "Før jeg bakker, sikrer jeg mig, at det kan ske uden fare eller ulempe for andre.",
    "Before I reverse, I make sure it can be done without danger or inconvenience to others.",
    "پیش از دنده‌عقب مطمئن می‌شوم که برای دیگران خطر یا مزاحمتی ندارد.",
    "Før vending eller bakning skal du sikre dig, at manøvren kan ske uden fare eller ulempe for andre.",
    "Before turning round or reversing you must make sure the manoeuvre can be done without danger or inconvenience to others.",
    "پیش از دور زدن یا دنده‌عقب باید مطمئن شوید که مانور برای دیگران خطر یا مزاحمتی ندارد."),
  S(False, "Jeg kører forlæns ind i sidevejen og bakker ud på den befærdede gade.", "I drive forwards into the side road and reverse out onto the busy street.",
    "رو به جلو وارد راه فرعی می‌شوم و با دنده‌عقب به خیابان شلوغ برمی‌گردم.",
    "At bakke ud på en befærdet gade giver dårligt udsyn og er farligere.", "Reversing out onto a busy street gives a poor view and is more dangerous.",
    "دنده‌عقب رفتن به خیابان شلوغ دید کمی دارد و خطرناک‌تر است."),
  S(False, "Jeg må vende i krydset, selv om der står en tavle, der forbyder vending.", "I may turn round at the junction even though a sign bans turning round.",
    "می‌توانم در تقاطع دور بزنم، حتی اگر تابلوی ممنوعیت دور زدن آن‌جا باشد.",
    "En tavle med vendingsforbud skal overholdes.", "A sign banning turning round must be obeyed.", "تابلوی ممنوعیت دور زدن را باید رعایت کرد."),
)

Q(5700, "7.15", above("""
THE SCENE: a roundabout seen from above with two lanes in the ring; its exits each have one lane.
VEHICLES (colour code used strictly): a RED car (ours) in the INNER lane, about to take the next exit; a GREY car beside it in the OUTER
lane, continuing round; a SOLID GREEN arrow from the red car moving into the outer lane behind the grey car and then out at the exit; a
DASHED ORANGE arrow from the red car cutting straight across the outer lane in front of the grey car to the exit.
MUST NOT APPEAR: signs, text."""),
  "Du kører i den inderste vognbane i en rundkørsel med to vognbaner og skal ud ved næste udkørsel. I den yderste vognbane kører en bil "
  "ved siden af dig. Hvad gælder?",
  "You are in the inner lane of a roundabout with two lanes and want to take the next exit. A car is driving beside you in the outer lane. "
  "What applies?",
  "در خط داخلیِ میدانی دوخطه هستید و می‌خواهید از خروجی بعدی خارج شوید. در خط بیرونی خودرویی کنار شما حرکت می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Før jeg kører ud, skal jeg skifte til den yderste vognbane, når det kan ske uden fare eller unødig ulempe for bilen i den.",
    "Before I exit, I must move to the outer lane when it can be done without danger or undue inconvenience to the car in it.",
    "پیش از خروج باید وقتی برای خودروی خط بیرونی خطر یا مزاحمت بی‌دلیل ندارد، به آن خط بروم.",
    "Ved vognbaneskift skal du sikre dig, at det kan ske uden fare eller unødig ulempe for andre.",
    "When changing lanes you must make sure it can be done without danger or undue inconvenience to others.",
    "هنگام تغییر خط باید مطمئن شوید که برای دیگران خطر یا مزاحمت بی‌دلیل ندارد."),
  S(True, "Jeg blinker til højre, før jeg forlader rundkørslen.", "I signal right before I leave the roundabout.", "پیش از ترک میدان راهنمای راست می‌زنم.",
    "Du skal give tegn før svingning og vognbaneskift, når det er påkrævet til vejledning for andre.",
    "You must signal before turning, and before lane changes when it is needed to guide others.",
    "پیش از پیچیدن، و پیش از تغییر خط وقتی برای راهنمایی دیگران لازم باشد، باید راهنما بزنید."),
  S(False, "Bilen i den yderste vognbane skal holde tilbage for mig, fordi jeg skal ud.",
    "The car in the outer lane must give way to me because I am exiting.", "خودروی خط بیرونی باید به من راه بدهد، چون من خارج می‌شوم.",
    "Det er dig, der skifter vognbane, og du skal sikre dig, at der er plads.", "It is you who changes lanes, and you must make sure there is room.",
    "این شما هستید که خط عوض می‌کنید و باید مطمئن شوید جا هست."),
  S(False, "Jeg kører direkte ud fra den inderste vognbane, fordi udkørslen er tæt på.",
    "I drive straight out from the inner lane because the exit is close.", "چون خروجی نزدیک است، مستقیم از خط داخلی خارج می‌شوم.",
    "Så skærer du ind foran bilen i den yderste vognbane.", "Then you cut in front of the car in the outer lane.",
    "این‌طور جلوی خودروی خط بیرونی می‌پیچید."),
)
