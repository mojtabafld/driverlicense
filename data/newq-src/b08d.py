# «آزمون جدید», batch 8 (5701–5800), part d: meeting (7.7), changing lanes (7.4), moving off and stopping (7.1), position
# (7.2), darkness and lights (7.19), motorways (7.16), safe traffic (6.2), turning round (7.5), roundabouts (7.15), following
# (7.8), road hazards (5.2) and the car (1.2).
# Rules: Færdselsloven §§ 3 stk. 1 (consideration also for those living by the road), 8 (whoever damages a sign must put it right
# at once if possible, otherwise tell the police and warn others), 14 stk. 1, 15 stk. 1 and 4 (on a one-way carriageway an island
# may be passed on either side), 15 stk. 5 and 20 stk. 2 (road-works vehicles may be driven as the work requires), 16 stk. 1,
# 18 stk. 1 (turning round forwards to the left, only without danger), 18 stk. 2 and 4 (a blocked lane is not a lane reduction),
# 20 stk. 1, 26 stk. 4 and 6, 27 stk. 5, 32 stk. 2 (always signal lane changes on motorways, elsewhere when needed to guide others)
# and stk. 5 (stop signalling when the manoeuvre is done), 33 stk. 3 nr. 2 and stk. 6, 35–36 (no parking lights needed in a car
# park or other marked parking area), 38 stk. 1–2, 41 stk. 1 and 3, 46 stk. 2, 47, 67; Bekendtgørelse om vejafmærkning (BEK
# 425/2023): E 41 (the speed at which the bend on an exit road can be driven in normal conditions), Q 45 (hatched area), Q 46
# (an unbroken edge line may be crossed when stopping, parking or driving onto or off the road), § 61 V 43 (a lane with the
# light-rail symbol is only for light rail), R arrows, § 69 Z 93; Bekendtgørelse om periodisk syn: cars first after 4 years,
# then every 2 years.
from nq import Q, S, above, picture, town, view

Q(5776, "7.7", view("""
THE SCENE: a country road covered with packed snow; only two wheel ruts run along the middle of the road; an oncoming car approaches
in the same ruts; low snow banks at both edges.
MUST BE CLEARLY VISIBLE: the two ruts in the middle of the snowy road, the oncoming car in them.
MUST NOT APPEAR: signs, text.""", cond="winter, snow-covered road, overcast"),
  "Vejen er dækket af sne, og der er kun to hjulspor midt på vejen. En bil kommer imod dig i de samme spor. Hvordan forholder du dig?",
  "The road is covered with snow, and there are only two wheel ruts in the middle of the road. A car is coming towards you in the same "
  "ruts. What do you do?",
  "جاده پوشیده از برف است و فقط دو ردِ چرخ وسط جاده هست. خودرویی در همان ردها از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg sænker farten længe før, vi når hinanden.", "I reduce my speed well before we reach each other.",
    "خیلی پیش از آن‌که به هم برسیم، سرعتم را کم می‌کنم.",
    "Når du skal ud af sporene, kan bilen skride, og det er lettere at styre ved lav fart.",
    "When you have to leave the ruts the car may skid, and it is easier to steer at low speed.",
    "وقتی باید از ردها بیرون بیایید، خودرو ممکن است بلغزد و با سرعت کم کنترلش آسان‌تر است."),
  S(True, "Jeg styrer roligt ud til højre og undgår hårde opbremsninger og ryk i rattet.",
    "I steer calmly out to the right and avoid hard braking and jerks of the wheel.",
    "آرام به سمت راست فرمان می‌دهم و از ترمز شدید و تکان‌های ناگهانی فرمان پرهیز می‌کنم.",
    "Bløde bevægelser giver mindre risiko for at miste vejgrebet i sne.", "Smooth movements give less risk of losing grip in snow.",
    "حرکت‌های نرم خطر از دست دادن چسبندگی در برف را کم می‌کند."),
  S(False, "Jeg bliver i sporene, så den modkørende må køre ud.", "I stay in the ruts so that the oncoming car has to move out.",
    "در ردها می‌مانم تا خودروی روبه‌رو مجبور شود بیرون برود.",
    "Ved møde skal I begge holde til højre.", "When meeting, you must both keep to the right.", "هنگام روبه‌رو شدن، هر دو باید سمت راست بروید."),
  S(False, "Jeg giver gas, når jeg kører ud af sporet, så bilen ikke sidder fast.",
    "I accelerate when I drive out of the rut so that the car does not get stuck.",
    "وقتی از رد بیرون می‌آیم، گاز می‌دهم تا خودرو گیر نکند.",
    "Pludselig gas kan få hjulene til at spinde og bilen til at skride ud.", "Sudden acceleration can make the wheels spin and the car skid.",
    "گاز دادنِ ناگهانی ممکن است چرخ‌ها را به چرخش درجا بیندازد و خودرو را بلغزاند."),
)

Q(5777, "7.7", town("""
THE SCENE: a town street; a street-sweeping vehicle with flashing amber lights drives slowly along the kerb on OUR side of the road,
coming towards us, its brushes sweeping the gutter; no other traffic.
MUST BE CLEARLY VISIBLE: the sweeper with its amber lights on our side of the road, coming towards us.
MUST NOT APPEAR: signs, text."""),
  "En fejemaskine med gult blink kører langsomt langs kantstenen i din side af vejen og kommer imod dig. Hvad gælder?",
  "A street sweeper with a flashing amber light drives slowly along the kerb on your side of the road, coming towards you. What applies?",
  "یک ماشین جاروی خیابان با چراغ چشمک‌زن زرد آهسته کنار جدولِ سمتِ شما در جاده حرکت می‌کند و به طرف شما می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Et køretøj, der bruges ved vejarbejde, må køre, som arbejdet kræver, når det sker med fornøden forsigtighed.",
    "A vehicle used for road work may drive as the work requires, with the necessary care.",
    "وسیله‌ای که برای کار جاده‌ای به کار می‌رود، می‌تواند با احتیاط لازم همان‌طور که کار ایجاب می‌کند حرکت کند.",
    "Køretøjer, der anvendes ved vejarbejde, kan føres, som det er nødvendigt af hensyn til arbejdet.",
    "Vehicles used for road work may be driven as the work requires.",
    "وسیله‌های کار جاده‌ای را می‌توان همان‌طور که کار لازم دارد راند."),
  S(True, "Jeg sætter farten ned og kører forsigtigt uden om den, når det kan ske uden fare.",
    "I slow down and drive carefully round it when it can be done without danger.",
    "سرعتم را کم می‌کنم و وقتی بی‌خطر باشد، با احتیاط از کنارش رد می‌شوم.",
    "Ved møde med køretøjer ved vejarbejde må der med fornøden forsigtighed køres på den mest hensigtsmæssige måde.",
    "When meeting road-work vehicles you may drive in the most suitable way with the necessary care.",
    "هنگام روبه‌رو شدن با وسیله‌های کار جاده‌ای می‌توان با احتیاط لازم به مناسب‌ترین شکل رانندگی کرد."),
  S(False, "Fejemaskinen kører ulovligt og skal holde ind for mig.", "The sweeper is driving illegally and must pull in for me.",
    "ماشین جارو غیرقانونی حرکت می‌کند و باید برای من کنار بکشد.",
    "Den må køre, som arbejdet kræver.", "It may drive as the work requires.", "می‌تواند همان‌طور که کار لازم دارد حرکت کند."),
  S(False, "Det gule blink betyder, at jeg skal standse og vente, til den er kørt forbi.",
    "The amber flashing light means that I must stop and wait until it has gone past.",
    "چراغ زرد چشمک‌زن یعنی باید بایستم و صبر کنم تا رد شود.",
    "Gult blink betyder, at du skal være særligt forsigtig; du må godt køre forbi, når det kan ske uden fare.",
    "An amber flash means you must take special care; you may pass when it can be done without danger.",
    "چراغ زرد چشمک‌زن یعنی احتیاط ویژه؛ وقتی بی‌خطر باشد، می‌توانید رد شوید."),
)

Q(5778, "7.4", town("""
THE SCENE: a town road with two lanes in our direction; we are about to move from the right lane into the left lane; the road is quiet,
with one car far behind us in the interior rear-view mirror at the top of the picture.
MUST BE CLEARLY VISIBLE: the two lanes, the car far behind in the mirror.
MUST NOT APPEAR: signs, text."""),
  "Du vil skifte vognbane. Hvad gælder om at give tegn med blinklyset?",
  "You want to change lanes. What applies to signalling with the indicator?",
  "می‌خواهید خط عوض کنید. درباره‌ی راهنما زدن چه قاعده‌ای برقرار است؟",
  S(True, "På motorvej skal jeg altid give tegn, før jeg skifter vognbane.", "On a motorway I must always signal before changing lanes.",
    "در آزادراه همیشه باید پیش از تغییر خط راهنما بزنم.",
    "På motorvej skal du give tegn før vognbaneskift og anden ikke ubetydelig ændring af placeringen til siden.",
    "On a motorway you must signal before changing lanes or otherwise moving noticeably to the side.",
    "در آزادراه باید پیش از تغییر خط و هر جابه‌جاییِ قابل‌توجهِ جانبی علامت بدهید."),
  S(True, "På andre veje skal jeg give tegn, når det er nødvendigt for at vejlede de andre trafikanter.",
    "On other roads I must signal when it is needed to guide other road users.",
    "در راه‌های دیگر، وقتی برای راهنمایی دیگر کاربران راه لازم باشد، باید راهنما بزنم.",
    "Uden for motorvej skal der gives tegn ved vognbaneskift, når det er påkrævet til vejledning for den øvrige færdsel.",
    "Off the motorway a lane change must be signalled when it is needed to guide the other traffic.",
    "بیرون از آزادراه، وقتی برای راهنمایی بقیه‌ی ترافیک لازم باشد، باید تغییر خط را علامت داد."),
  S(True, "Jeg slukker blinklyset, når vognbaneskiftet er færdigt.", "I switch off the indicator when the lane change is complete.",
    "وقتی تغییر خط تمام شد، راهنما را خاموش می‌کنم.",
    "Tegnet skal senest være ophørt, når manøvren er afsluttet.", "The signal must stop at the latest when the manoeuvre is finished.",
    "علامت باید حداکثر با پایان یافتن مانور قطع شود."),
  S(False, "Når jeg har blinket, skal de andre give mig plads.", "Once I have signalled, the others must make room for me.",
    "وقتی راهنما زدم، دیگران باید برایم جا باز کنند.",
    "Blinklyset viser kun, hvad du vil; du skal selv sikre dig, at det kan ske uden fare.",
    "The indicator only shows what you intend; you must make sure yourself that it can be done without danger.",
    "راهنما فقط قصد شما را نشان می‌دهد؛ خودتان باید مطمئن شوید که کار بی‌خطر است."),
)

Q(5779, "7.4", town("""
THE SCENE: a town road with two lanes in our direction; ahead in our right lane a van stands with its hazard lights flashing; in the
left lane cars pass in a steady stream; one of them is just behind us on the left, seen in the left door mirror at the left edge of
the picture.
MUST BE CLEARLY VISIBLE: the van with hazard lights in our lane, the stream of cars in the left lane, the car in the door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du kører i højre af to vognbaner i byen. Lidt fremme holder en varevogn med havariblink i din vognbane, og der kører biler i venstre "
  "vognbane. Hvad gælder?",
  "You are driving in the right of two lanes in town. A little ahead a van with its hazard lights on stands in your lane, and cars are "
  "driving in the left lane. What applies?",
  "در شهر در خط راستِ دو خط می‌رانید. کمی جلوتر یک ون با چراغ فلاشر در خط شما ایستاده و در خط چپ خودروها در حرکت‌اند. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må kun skifte til venstre vognbane, når det kan ske uden fare eller unødig ulempe for bilerne der.",
    "I may only move into the left lane when it can be done without danger or undue inconvenience to the cars there.",
    "فقط وقتی می‌توانم به خط چپ بروم که برای خودروهای آن خط خطر یا مزاحمتِ بی‌دلیلی نداشته باشد.",
    "Før vognbaneskift skal du sikre dig, at det kan ske uden fare eller unødig ulempe for andre.",
    "Before changing lanes you must make sure it can be done without danger or undue inconvenience to others.",
    "پیش از تغییر خط باید مطمئن شوید که برای دیگران خطر یا مزاحمتِ بی‌دلیلی ندارد."),
  S(True, "Er der ikke plads, standser jeg bag varevognen og venter på et hul.", "If there is no room, I stop behind the van and wait for a gap.",
    "اگر جا نیست، پشت ون می‌ایستم و منتظر فاصله‌ای می‌مانم.",
    "Det er dig, der skal vente; bilerne i venstre vognbane har ikke pligt til at lukke dig ind.",
    "It is you who must wait; the cars in the left lane have no duty to let you in.",
    "این شما هستید که باید صبر کنید؛ خودروهای خط چپ موظف نیستند به شما جا بدهند."),
  S(False, "Bilerne i venstre vognbane skal lukke mig ind, ligesom når to vognbaner fletter sammen.",
    "The cars in the left lane must let me in, just as when two lanes merge.",
    "خودروهای خط چپ باید مرا راه بدهند، درست مثل وقتی که دو خط در هم ادغام می‌شوند.",
    "Reglen om gensidig hensyntagen gælder, hvor antallet af vognbaner bliver mindre; her er det kun din vognbane, der er spærret.",
    "The rule of mutual consideration applies where the number of lanes falls; here only your lane is blocked.",
    "قاعده‌ی ملاحظه‌ی متقابل برای جایی است که تعداد خط‌ها کم می‌شود؛ این‌جا فقط خطِ شما بسته است."),
  S(True, "Jeg blinker til venstre i god tid, så de andre kan se, hvad jeg vil.", "I signal left in good time so that the others can see what I intend.",
    "به‌موقع راهنمای چپ می‌زنم تا دیگران ببینند چه قصدی دارم.",
    "Her er tegnet nødvendigt for at vejlede de andre.", "Here the signal is needed to guide the others.", "این‌جا علامت برای راهنمایی دیگران لازم است."),
)

Q(5780, "7.4", view("""
THE SCENE: a motorway with two lanes in our direction; we drive in the right lane; in the left door mirror (at the left edge of the
picture) a small amber warning symbol glows in the mirror glass; the left lane beside us seems empty in the mirror.
MUST BE CLEARLY VISIBLE: the glowing amber symbol in the left door mirror.
MUST NOT APPEAR: signs, text."""),
  "Din bil har en blindvinkelassistent, som viser et lys i sidespejlet, når der er et køretøj i den blinde vinkel. Du vil skifte vognbane. "
  "Hvad gælder?",
  "Your car has a blind-spot assistant that shows a light in the door mirror when there is a vehicle in the blind spot. You want to "
  "change lanes. What applies?",
  "خودروی شما دستیار نقطه‌ی کور دارد که وقتی وسیله‌ای در نقطه‌ی کور باشد، در آینه‌ی بغل چراغی نشان می‌دهد. می‌خواهید خط عوض کنید. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Lyser lampen, er der sandsynligvis et køretøj ved siden af mig, så jeg venter.",
    "If the lamp is lit, there is probably a vehicle beside me, so I wait.", "اگر چراغ روشن باشد، احتمالاً وسیله‌ای کنار من است، پس صبر می‌کنم.",
    "Lampen advarer om et køretøj i den blinde vinkel.", "The lamp warns of a vehicle in the blind spot.", "این چراغ از وسیله‌ای در نقطه‌ی کور هشدار می‌دهد."),
  S(True, "Jeg kigger stadig selv over skulderen, før jeg skifter vognbane.", "I still look over my shoulder myself before I change lanes.",
    "پیش از تغییر خط، باز هم خودم از روی شانه نگاه می‌کنم.",
    "Du har selv ansvaret for at sikre dig, at vognbaneskiftet kan ske uden fare.", "You are responsible yourself for making sure the lane change can be done without danger.",
    "مسئولیتِ اطمینان از بی‌خطر بودن تغییر خط با خود شماست."),
  S(True, "Systemet kan overse fx en motorcykel, der kommer meget hurtigt.", "The system may miss, for example, a motorcycle coming very fast.",
    "این سیستم ممکن است مثلاً موتورسیکلتی را که خیلی تند می‌آید نبیند.",
    "Assistentsystemer har begrænsninger og erstatter ikke dit eget blik.", "Assistance systems have limits and do not replace your own look.",
    "سیستم‌های کمکی محدودیت دارند و جای نگاه خودتان را نمی‌گیرند."),
  S(False, "Lyser lampen ikke, kan jeg være sikker på, at der ingen er i den blinde vinkel.",
    "If the lamp is not lit, I can be sure that nobody is in the blind spot.", "اگر چراغ روشن نباشد، می‌توانم مطمئن باشم کسی در نقطه‌ی کور نیست.",
    "Systemet kan fejle eller være dækket af snavs.", "The system can fail or be covered in dirt.", "این سیستم ممکن است خطا کند یا با کثیفی پوشیده شده باشد."),
)

Q(5781, "7.1", view("""
THE SCENE: our car stands on the hard shoulder of a motorway; in the left door mirror (at the left edge of the picture) fast traffic
approaches in the right lane; the hard shoulder ahead is long and empty.
MUST BE CLEARLY VISIBLE: the hard shoulder ahead, the fast traffic in the door mirror.
MUST NOT APPEAR: signs, text."""),
  "Bilen har haft motorstop, og du har holdt i nødsporet på motorvejen. Nu kan du køre igen. Hvordan forholder du dig?",
  "The car broke down, and you have been standing on the hard shoulder of the motorway. Now you can drive again. What do you do?",
  "خودرو خاموش شده بود و در خط اضطراری آزادراه ایستاده بودید. حالا می‌توانید دوباره حرکت کنید. چه می‌کنید؟",
  S(True, "Jeg sætter farten op i nødsporet, inden jeg kører ud i vognbanen.", "I build up speed on the hard shoulder before I move out into the lane.",
    "پیش از ورود به خط، در خط اضطراری سرعتم را بالا می‌برم.",
    "Så kan du komme ind i trafikken uden at tvinge de andre til at bremse hårdt.",
    "Then you can join the traffic without forcing the others to brake hard.",
    "این‌طور می‌توانید بدون این‌که دیگران را مجبور به ترمز شدید کنید وارد ترافیک شوید."),
  S(True, "Jeg blinker og ser i spejlet og over skulderen, før jeg kører ud.", "I signal and look in the mirror and over my shoulder before I move out.",
    "پیش از بیرون رفتن راهنما می‌زنم و به آینه و از روی شانه نگاه می‌کنم.",
    "Før igangsætning og vognbaneskift skal du give tegn og sikre dig, at det kan ske uden fare.",
    "Before moving off and changing lanes you must signal and make sure it can be done without danger.",
    "پیش از حرکت و تغییر خط باید علامت بدهید و مطمئن شوید که بی‌خطر است."),
  S(True, "Jeg kører først ud, når der er et stort hul i trafikken.", "I only move out when there is a big gap in the traffic.",
    "فقط وقتی وارد می‌شوم که در ترافیک فاصله‌ی بزرگی باشد.",
    "Trafikken på motorvejen kører hurtigt, og du starter fra lav fart.", "The traffic on the motorway moves fast, and you are starting from low speed.",
    "ترافیک آزادراه تند است و شما از سرعت کم شروع می‌کنید."),
  S(False, "Bilerne i højre vognbane skal sætte farten ned og lukke mig ind.", "The cars in the right lane must slow down and let me in.",
    "خودروهای خط راست باید سرعت کم کنند و مرا راه بدهند.",
    "Det er dig, der skal sikre dig, at du kan køre ud uden fare eller unødig ulempe for andre.",
    "It is you who must make sure that you can move out without danger or undue inconvenience to others.",
    "این شما هستید که باید مطمئن شوید بیرون آمدنتان برای دیگران خطر یا مزاحمتِ بی‌دلیل ندارد."),
)

Q(5782, "7.1", town("""
THE SCENE: a town street; just ahead a side road joins from the right; some 20 m after it there is a free space at the kerb where we
want to stop; a car waits in the side road to come out.
MUST BE CLEARLY VISIBLE: the side road with the waiting car, the free kerb space after the side road.
MUST NOT APPEAR: signs, text."""),
  "Du vil standse ved kantstenen lige efter en sidevej til højre. I sidevejen holder en bil og venter på at køre ud. Hvornår blinker du "
  "til højre?",
  "You want to stop at the kerb just after a side road on the right. In the side road a car is waiting to come out. When do you signal "
  "right?",
  "می‌خواهید درست بعد از راهی فرعی در سمت راست کنار جدول بایستید. در آن راه فرعی خودرویی منتظر است بیرون بیاید. کِی راهنمای راست "
  "می‌زنید؟",
  S(True, "Når jeg er kørt forbi sidevejen.", "When I have driven past the side road.", "وقتی از جلوی راه فرعی گذشتم.",
    "Blinker du før sidevejen, kan føreren i sidevejen tro, at du skal svinge ind ad den, og køre ud foran dig.",
    "If you signal before the side road, the driver in the side road may think you are turning into it and pull out in front of you.",
    "اگر پیش از راه فرعی راهنما بزنید، راننده‌ی آن راه ممکن است فکر کند می‌خواهید واردش شوید و جلوی شما بیرون بیاید."),
  S(True, "Før jeg begynder at bremse, så bilerne bag mig ved, hvad jeg vil.", "Before I start braking, so that the cars behind me know what I intend.",
    "پیش از شروع ترمز، تا خودروهای پشت سرم بدانند چه قصدی دارم.",
    "Tegn skal gives i god tid før manøvren.", "Signals must be given in good time before the manoeuvre.", "علامت باید به‌موقع پیش از مانور داده شود."),
  S(False, "Allerede før sidevejen, så alle kan se det i god tid.", "Already before the side road, so that everyone sees it in good time.",
    "از همان پیش از راه فرعی، تا همه به‌موقع ببینند.",
    "Så kan blinket misforstås, som om du vil svinge ind ad sidevejen.", "Then the signal may be misunderstood as if you were turning into the side road.",
    "در این صورت ممکن است راهنما این‌طور فهمیده شود که می‌خواهید وارد راه فرعی شوید."),
)

Q(5783, "7.1", view("""
THE SCENE: a country road; our car stands in a paved widening outside the unbroken white edge line, a short lay-by without any other
markings; the road ahead is clear; in the left door mirror (at the left edge of the picture) a car is far behind.
MUST BE CLEARLY VISIBLE: the unbroken edge line between the lay-by and the carriageway, the clear road.
MUST NOT APPEAR: signs, text."""),
  "Du holder i en udvidelse af vejen uden for den ubrudte kantlinje på en landevej. Du vil køre ud på vejen igen. Hvad gælder?",
  "You are standing in a widening of the road outside the unbroken edge line on a country road. You want to drive back onto the road. "
  "What applies?",
  "در جاده‌ای بیرون شهر، در بخشِ عریض‌شده‌ی کنار جاده، بیرون از خط کناریِ پیوسته ایستاده‌اید. می‌خواهید دوباره وارد جاده شوید. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt køre over kantlinjen, når jeg kører ud.", "I may drive over the edge line when I pull out.",
    "وقتی بیرون می‌آیم، می‌توانم از روی خط کناری عبور کنم.",
    "En ubrudt kantlinje må overskrides i forbindelse med standsning og parkering og ved kørsel ind på eller ud fra vejen.",
    "An unbroken edge line may be crossed in connection with stopping and parking and when driving onto or off the road.",
    "از خط کناریِ پیوسته می‌توان هنگام توقف و پارک و هنگام ورود به جاده یا خروج از آن عبور کرد."),
  S(True, "Jeg blinker til venstre og sikrer mig, at jeg kan køre ud uden fare.", "I signal left and make sure I can pull out without danger.",
    "راهنمای چپ می‌زنم و مطمئن می‌شوم که می‌توانم بی‌خطر وارد شوم.",
    "Før igangsætning fra kanten af vejen skal du give tegn og sikre dig, at det kan ske uden fare eller unødig ulempe.",
    "Before moving off from the edge of the road you must signal and make sure it can be done without danger or undue inconvenience.",
    "پیش از حرکت از کنار جاده باید علامت بدهید و مطمئن شوید که بی‌خطر و بدون مزاحمتِ بی‌دلیل است."),
  S(False, "Jeg skal køre et stykke uden for kantlinjen, til den bliver punkteret.", "I must drive some way outside the edge line until it becomes broken.",
    "باید مدتی بیرون از خط کناری برانم تا خط بریده‌بریده شود.",
    "Det behøver du ikke; du må krydse linjen, når du kører ud fra et sted, hvor du har holdt.",
    "You need not; you may cross the line when you pull out from a place where you have been standing.",
    "لازم نیست؛ وقتی از جایی که ایستاده بودید بیرون می‌آیید، می‌توانید از خط عبور کنید."),
  S(False, "Jeg må aldrig køre over en ubrudt kantlinje.", "I may never drive over an unbroken edge line.", "هرگز نباید از روی خط کناریِ پیوسته بگذرم.",
    "Den må overskrides, fx ved standsning, parkering og kørsel ind på eller ud fra vejen.",
    "It may be crossed, for example when stopping, parking and driving onto or off the road.",
    "می‌توان از آن عبور کرد، مثلاً هنگام توقف، پارک و ورود به جاده یا خروج از آن."),
)

Q(5784, "7.2", above("""
THE SCENE: a one-way street in town seen from above, traffic going up the picture; in the middle of the carriageway a small traffic
island without any signs; there is room on both sides of it.
VEHICLES (colour code used strictly): a RED car (ours) approaching the island.
MUST NOT APPEAR: signs, text."""),
  "Du kører i en ensrettet gade. Midt på kørebanen ligger en helle uden tavler. Hvordan må du køre forbi den?",
  "You are driving in a one-way street. In the middle of the carriageway there is a traffic island without signs. How may you pass it?",
  "در خیابانی یک‌طرفه رانندگی می‌کنید. وسط سواره‌رو جزیره‌ای بدون تابلو هست. چطور می‌توانید از کنارش بگذرید؟",
  S(True, "Jeg må køre forbi hellen i begge sider.", "I may pass the island on either side.", "از هر دو طرف جزیره می‌توانم رد شوم.",
    "Ligger en helle på en kørebane med ensrettet færdsel, må du også køre venstre om den.",
    "If an island is on a one-way carriageway, you may also pass it on the left.",
    "اگر جزیره روی سواره‌روی یک‌طرفه باشد، از سمت چپ آن هم می‌توانید رد شوید."),
  S(False, "Jeg skal altid køre højre om hellen.", "I must always pass to the right of the island.", "همیشه باید از سمت راستِ جزیره رد شوم.",
    "Det er hovedreglen på veje med trafik i begge retninger; i en ensrettet gade må du køre i begge sider.",
    "That is the main rule on roads with two-way traffic; in a one-way street you may pass on either side.",
    "این قاعده‌ی اصلی در راه‌های دوطرفه است؛ در خیابان یک‌طرفه از هر دو طرف می‌توانید بروید."),
  S(False, "Jeg må kun køre venstre om, fordi gaden er ensrettet.", "I may only pass on the left because the street is one-way.",
    "فقط از سمت چپ می‌توانم رد شوم، چون خیابان یک‌طرفه است.",
    "Du må vælge den side, der passer til din videre kørsel.", "You may choose the side that suits the way you are going.",
    "می‌توانید سمتی را انتخاب کنید که با ادامه‌ی مسیرتان جور است."),
)

Q(5785, "7.2", view("""
THE SCENE: a country road in thick fog; the white edge line on the right can be seen for some 30 m; the centre line is faint; no
other traffic can be seen.
MUST BE CLEARLY VISIBLE: the white edge line on the right, the faint centre line, the fog.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="thick fog, wet road"),
  "Der er tæt tåge. Du kan kun se vejens afmærkning et kort stykke frem. Hvordan placerer du bilen?",
  "There is thick fog. You can only see the road markings a short way ahead. How do you position the car?",
  "مه غلیظی است. خط‌کشی جاده را فقط تا فاصله‌ی کوتاهی می‌بینید. خودرو را کجای جاده قرار می‌دهید؟",
  S(True, "Jeg holder mig til højre og orienterer mig efter kantlinjen i højre side.", "I keep to the right and follow the edge line on the right side.",
    "سمت راست می‌مانم و مسیرم را با خط کناریِ سمت راست پیدا می‌کنم.",
    "Så holder du afstand til de modkørende, som du først ser sent.", "Then you keep away from the oncoming traffic, which you only see late.",
    "این‌طور از خودروهای روبه‌رو که دیر دیده می‌شوند فاصله می‌گیرید."),
  S(False, "Jeg kører med venstre hjul på midterlinjen, så jeg bedre kan se den.", "I drive with my left wheels on the centre line so that I can see it better.",
    "با چرخ‌های چپ روی خط وسط می‌رانم تا آن را بهتر ببینم.",
    "Så kommer du for tæt på de modkørende.", "Then you get too close to the oncoming traffic.", "در این صورت بیش از حد به خودروهای روبه‌رو نزدیک می‌شوید."),
  S(True, "Jeg holder øje med cyklister og gående i højre vejkant.", "I watch for cyclists and pedestrians at the right edge of the road.",
    "مراقب دوچرخه‌سواران و عابرانِ لبه‌ی راست جاده هستم.",
    "Når du kører langt til højre i tåge, kan du komme tæt på dem, der færdes i vejkanten.",
    "When you drive far to the right in fog you may come close to those at the edge of the road.",
    "وقتی در مه سمت راست می‌روید، ممکن است به کسانی که لبه‌ی جاده‌اند نزدیک شوید."),
  S(False, "Jeg følger tæt efter baglygterne på en bil foran, så jeg ikke behøver at se på vejen.",
    "I follow closely behind the rear lights of a car in front so that I do not need to watch the road.",
    "نزدیکِ چراغ‌های عقب خودرویی جلویی می‌رانم تا لازم نباشد به جاده نگاه کنم.",
    "Du skal holde afstand og selv holde øje med vejen; bilen foran kan bremse brat.",
    "You must keep your distance and watch the road yourself; the car in front may brake sharply.",
    "باید فاصله نگه دارید و خودتان مراقب جاده باشید؛ خودروی جلویی ممکن است ناگهان ترمز کند."),
)

Q(5786, "7.2", town("""
THE SCENE: a town street; in the middle a lane for light rail with rails, bounded on both sides by unbroken white lines and marked
with a white tram symbol painted on its surface; our ordinary lane is on the right; a queue of cars stands ahead in our lane.
MUST BE CLEARLY VISIBLE: the light-rail lane with its unbroken lines and tram symbol, the queue in our lane.
MUST NOT APPEAR: signs, text, trams."""),
  "Midt på gaden ligger letbanen i en bane, der er afgrænset af ubrudte linjer og markeret med et letbanesymbol. I din vognbane holder "
  "bilerne i kø. Hvad gælder?",
  "In the middle of the street the light rail runs in a lane bounded by unbroken lines and marked with a light-rail symbol. In your lane "
  "the cars are queuing. What applies?",
  "وسط خیابان، قطار شهری در خطی حرکت می‌کند که با خط‌های پیوسته محدود شده و نماد قطار شهری دارد. در خط شما خودروها در صف ایستاده‌اند. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre i letbanens bane.", "I must not drive in the light-rail lane.", "نباید در خطِ قطار شهری برانم.",
    "Et letbanesymbol i en bane, der er afgrænset med ubrudt kantlinje, angiver, at banen kun må benyttes af letbanekøretøjer.",
    "A light-rail symbol in a lane bounded by an unbroken edge line means that the lane may only be used by light-rail vehicles.",
    "نماد قطار شهری در خطی که با خط کناریِ پیوسته محدود شده، یعنی فقط قطار شهری می‌تواند از آن استفاده کند."),
  S(False, "Jeg må køre i letbanens bane for at komme forbi køen, når der ikke kommer noget tog.",
    "I may drive in the light-rail lane to get past the queue when no tram is coming.",
    "وقتی قطاری نمی‌آید، می‌توانم برای رد شدن از صف در خطِ قطار شهری برانم.",
    "Banen er forbeholdt letbanen, også når den er tom.", "The lane is reserved for the light rail, also when it is empty.",
    "این خط حتی وقتی خالی است، مخصوص قطار شهری است."),
  S(True, "Jeg bliver i min egen vognbane og venter i køen.", "I stay in my own lane and wait in the queue.",
    "در خط خودم می‌مانم و در صف صبر می‌کنم.",
    "Du skal benytte den bane, der er bestemt for dit køretøj.", "You must use the lane intended for your vehicle.",
    "باید از خطی استفاده کنید که برای وسیله‌ی شما در نظر گرفته شده است."),
  S(False, "Letbanen skal holde tilbage for mig, hvis jeg kører ind i dens bane.", "The light rail must give way to me if I drive into its lane.",
    "اگر وارد خطِ قطار شهری شوم، قطار باید به من راه بدهد.",
    "Banen er for letbanen, som hverken kan vige eller standse hurtigt.", "The lane is for the light rail, which can neither swerve nor stop quickly.",
    "این خط مال قطار شهری است که نه می‌تواند کنار بکشد و نه سریع بایستد."),
)

Q(5787, "7.19", view("""
THE SCENE: a small marked car park beside a dark country road at night; our car is parked in a marked bay; there are no lamps anywhere;
the road beside the car park is dark and empty.
MUST BE CLEARLY VISIBLE: the marked parking bays, our car in one of them, the darkness.
MUST NOT APPEAR: signs, text.""", cond="night, dark, no street lights"),
  "Det er mørkt. Du parkerer på en afmærket parkeringsplads ved en landevej uden gadelys. Hvad gælder om bilens lys?",
  "It is dark. You park in a marked car park beside a country road without street lights. What applies to the car's lights?",
  "تاریک است. در پارکینگی خط‌کشی‌شده کنار جاده‌ای بیرون شهر و بدون روشنایی پارک می‌کنید. درباره‌ی چراغ‌های خودرو چه قاعده‌ای برقرار است؟",
  S(True, "Jeg behøver ikke have parkeringslys tændt, når bilen holder på parkeringspladsen.",
    "I need not have the parking lights on while the car stands in the car park.",
    "وقتی خودرو در پارکینگ است، لازم نیست چراغ پارک روشن باشد.",
    "Kravet om lys på en holdende bil gælder ikke, når den holder på en parkeringsplads eller et andet afmærket område for parkering.",
    "The requirement for lights on a standing car does not apply when it stands in a car park or another marked parking area.",
    "الزامِ روشن بودن چراغ برای خودروی ایستاده، وقتی در پارکینگ یا محدوده‌ی خط‌کشی‌شده‌ی دیگری برای پارک باشد، اعمال نمی‌شود."),
  S(False, "Positionslys og baglygter skal altid være tændt, når det er mørkt.", "Position lights and rear lights must always be on when it is dark.",
    "وقتی تاریک است، چراغ‌های موقعیت و عقب همیشه باید روشن باشند.",
    "Der er undtagelser, fx på en parkeringsplads eller på en godt oplyst vej.", "There are exceptions, for example in a car park or on a well-lit road.",
    "استثناهایی هست، مثلاً در پارکینگ یا در جاده‌ای که خوب روشن است."),
  S(False, "Jeg lader nærlyset være tændt, så bilen kan ses.", "I leave the dipped beam on so that the car can be seen.",
    "نور پایین را روشن می‌گذارم تا خودرو دیده شود.",
    "Andre lygter end positionslys, baglygter og nummerpladelys må ikke være tændt på en holdende bil.",
    "Lights other than position lights, rear lights and number-plate lights must not be on in a standing car.",
    "در خودروی ایستاده، چراغی جز چراغ موقعیت، چراغ عقب و چراغ پلاک نباید روشن باشد."),
  S(False, "Jeg tænder havariblinket, mens bilen holder der om natten.", "I switch on the hazard lights while the car stands there at night.",
    "وقتی خودرو شب آن‌جا ایستاده، چراغ فلاشر را روشن می‌گذارم.",
    "Havariblink bruges, når bilen holder, så den er til fare, ikke ved almindelig parkering.",
    "Hazard lights are used when the car stands where it is a danger, not for ordinary parking.",
    "فلاشر برای وقتی است که خودرو جایی خطرساز ایستاده، نه برای پارک معمولی."),
)

Q(5788, "7.19", view("""
THE SCENE: a dark country road at night; an oncoming car is just passing us on the left, its headlights almost beside us; our dipped
beam lights the road ahead; beyond, the road is dark and empty.
MUST BE CLEARLY VISIBLE: the oncoming car just passing us, our dipped beam on the road.
MUST NOT APPEAR: signs, text.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt, og du har blændet ned for en modkørende bil. Hvornår må du tænde fjernlyset igen?",
  "It is dark, and you have dipped your lights for an oncoming car. When may you switch the main beam on again?",
  "تاریک است و برای خودرویی از روبه‌رو نور را پایین آورده‌اید. کِی می‌توانید دوباره نور بالا را روشن کنید؟",
  S(True, "Når den modkørende er kørt forbi mig.", "When the oncoming car has gone past me.", "وقتی خودروی روبه‌رو از کنارم گذشت.",
    "Fjernlys må ikke bruges ved møde i en afstand, hvor den modkørende kan blive blændet.",
    "Main beam must not be used when meeting another vehicle at a distance where its driver can be dazzled.",
    "هنگام روبه‌رو شدن، در فاصله‌ای که راننده‌ی مقابل ممکن است خیره شود، نور بالا مجاز نیست."),
  S(False, "Når den modkørende har blændet ned.", "When the oncoming car has dipped its lights.", "وقتی خودروی روبه‌رو نورش را پایین آورد.",
    "Den modkørende kan stadig blive blændet af dit fjernlys, indtil I har passeret hinanden.",
    "The oncoming driver can still be dazzled by your main beam until you have passed each other.",
    "تا وقتی از کنار هم نگذشته‌اید، راننده‌ی مقابل ممکن است با نور بالای شما خیره شود."),
  S(False, "Når der er omkring 50 m til den modkørende.", "When there are about 50 m to the oncoming car.", "وقتی تا خودروی روبه‌رو حدود ۵۰ متر مانده.",
    "På den afstand vil den modkørende blive blændet.", "At that distance the oncoming driver will be dazzled.", "در این فاصله راننده‌ی مقابل خیره می‌شود."),
)

Q(5789, "7.19", view("""
THE SCENE: thick fog; we are in a slow queue; in the interior rear-view mirror at the top of the picture the car behind us is very
close; the rear fog lamp symbol is lit on our dashboard strip.
MUST BE CLEARLY VISIBLE: the car close behind in the mirror, the lit rear fog lamp symbol, the fog.
MUST NOT APPEAR: signs, text.""", cond="thick fog, dusk"),
  "Det er tæt tåge, og du kører med tågebaglygten tændt. Nu kommer du ind i en langsom kø, og bilen bag dig holder tæt på. Hvad gør du?",
  "There is thick fog, and you are driving with the rear fog lamp on. Now you come into a slow queue, and the car behind you is close. "
  "What do you do?",
  "مه غلیظی است و با چراغ مه‌شکن عقبِ روشن می‌رانید. حالا به صفی آهسته رسیده‌اید و خودروی پشتی نزدیک شما ایستاده است. چه می‌کنید؟",
  S(True, "Jeg slukker tågebaglygten, mens bilen bag mig er så tæt på.", "I switch off the rear fog lamp while the car behind me is so close.",
    "تا وقتی خودروی پشتی این‌قدر نزدیک است، مه‌شکن عقب را خاموش می‌کنم.",
    "Lygter må ikke bruges, så andre førere blændes, og den kraftige tågebaglygte blænder på kort afstand.",
    "Lights must not be used so that other drivers are dazzled, and the bright rear fog lamp dazzles at short range.",
    "چراغ‌ها نباید طوری استفاده شوند که رانندگان دیگر خیره شوند و مه‌شکنِ پرنور عقب در فاصله‌ی کوتاه چشم را می‌زند."),
  S(True, "Jeg tænder den igen, hvis afstanden bliver stor, og tågen stadig er tæt.", "I switch it on again if the distance becomes large and the fog is still thick.",
    "اگر فاصله زیاد شد و مه هنوز غلیظ بود، دوباره روشنش می‌کنم.",
    "I tæt tåge hjælper tågebaglygten de bagvedkørende med at se dig på afstand.",
    "In thick fog the rear fog lamp helps those behind to see you from a distance.",
    "در مه غلیظ، مه‌شکن عقب کمک می‌کند خودروهای پشتی شما را از دور ببینند."),
  S(False, "Tågebaglygten skal altid være tændt i tåge, også i kø.", "The rear fog lamp must always be on in fog, also in a queue.",
    "در مه، مه‌شکن عقب همیشه باید روشن باشد، حتی در صف.",
    "Den må ikke blænde andre.", "It must not dazzle others.", "نباید چشم دیگران را بزند."),
  S(False, "Jeg bremser kort et par gange, så bilen bag mig holder sig på afstand.",
    "I brake briefly a couple of times so that the car behind me keeps its distance.",
    "چند بار کوتاه ترمز می‌کنم تا خودروی پشتی فاصله بگیرد.",
    "Unødige opbremsninger kan få bilen bag dig til at køre ind i dig.", "Needless braking may make the car behind you run into you.",
    "ترمزهای بی‌دلیل ممکن است باعث شود خودروی پشتی به شما بزند."),
)

Q(5790, "7.16", view("""
THE SCENE: a motorway exit road leaving to the right and curving sharply further on; at the start of the exit road stands a rectangular
blue sign showing a white sharply bent arrow and the white number «50».
MUST BE CLEARLY VISIBLE: the blue sign with the bent arrow and «50», the curve of the exit road.
MUST NOT APPEAR: other signs, any other text."""),
  "Ved frakørslen fra motorvejen står denne tavle med tallet 50. Hvad betyder den?",
  "At the motorway exit stands this sign with the number 50. What does it mean?",
  "کنار خروجی آزادراه این تابلو با عدد ۵۰ قرار دارد. معنایش چیست؟",
  S(True, "Tallet viser, hvor hurtigt svinget på frakørselsvejen kan køres under normale forhold.",
    "The number shows how fast the bend on the exit road can be driven in normal conditions.",
    "عدد نشان می‌دهد پیچِ راه خروجی را در شرایط عادی با چه سرعتی می‌شود پیمود.",
    "Tavlen angiver den hastighed, hvormed svinget på frakørselsvejen under normale forhold kan gennemkøres.",
    "The sign gives the speed at which the bend on the exit road can be driven through in normal conditions.",
    "این تابلو سرعتی را نشان می‌دهد که در شرایط عادی می‌توان با آن از پیچ راه خروجی گذشت."),
  S(False, "Tallet viser, hvor mange meter der er til næste frakørsel.", "The number shows how many metres it is to the next exit.",
    "عدد نشان می‌دهد تا خروجی بعدی چند متر مانده است.",
    "Det er en hastighedsangivelse for svinget.", "It is a speed indication for the bend.", "این عدد سرعتِ مناسبِ پیچ است."),
  S(False, "Tallet er den mindste hastighed, jeg skal holde på frakørselsvejen.", "The number is the minimum speed I must keep on the exit road.",
    "این عدد کمترین سرعتی است که در راه خروجی باید حفظ کنم.",
    "Mindste hastighed vises med en blå, rund tavle.", "A minimum speed is shown by a round blue sign.", "حداقل سرعت با تابلوی گرد آبی نشان داده می‌شود."),
)

Q(5791, "7.16", above("""
THE SCENE: a motorway seen from above, running up the picture; an exit lane leaves to the right; between the right lane and the exit
lane lies a long triangular hatched area of white diagonal stripes.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane, just past the start of the exit lane and level with the
hatched area.
MUST NOT APPEAR: signs, text."""),
  "Du opdager i sidste øjeblik, at du skulle have taget frakørslen. Mellem din vognbane og frakørselsbanen ligger et skraveret felt. Hvad "
  "gør du?",
  "At the last moment you realise that you should have taken the exit. Between your lane and the exit lane lies a hatched area. What do "
  "you do?",
  "در آخرین لحظه متوجه می‌شوید که باید از آن خروجی خارج می‌شدید. بین خط شما و خط خروجی محدوده‌ای هاشورخورده هست. چه می‌کنید؟",
  S(True, "Jeg kører videre til næste frakørsel.", "I drive on to the next exit.", "تا خروجی بعدی ادامه می‌دهم.",
    "Du må ikke køre over spærrefladen, og du må hverken bakke eller vende på motorvejen.",
    "You must not drive over the hatched area, and you may neither reverse nor turn round on the motorway.",
    "نباید از روی محدوده‌ی هاشورخورده بروید و در آزادراه نه دنده‌عقب مجاز است نه دور زدن."),
  S(False, "Jeg kører hurtigt over det skraverede felt og ind på frakørselsbanen.", "I quickly drive over the hatched area into the exit lane.",
    "سریع از روی محدوده‌ی هاشورخورده به خط خروجی می‌روم.",
    "På en spærreflade må der ikke køres, standses eller parkeres.", "On a hatched area you must not drive, stop or park.",
    "روی محدوده‌ی هاشورخورده نباید رانندگی، توقف یا پارک کرد."),
  S(True, "Jeg holder farten og bliver i min vognbane.", "I keep my speed and stay in my lane.", "سرعتم را حفظ می‌کنم و در خط خودم می‌مانم.",
    "En pludselig opbremsning eller et sving ud over spærrefladen kan føre til et uheld.",
    "Sudden braking or a swerve across the hatched area can lead to an accident.",
    "ترمز ناگهانی یا پیچیدن به روی محدوده‌ی هاشورخورده ممکن است به تصادف منجر شود."),
  S(False, "Jeg standser ved det skraverede felt og bakker tilbage til frakørslen.", "I stop by the hatched area and reverse back to the exit.",
    "کنار محدوده‌ی هاشورخورده می‌ایستم و دنده‌عقب تا خروجی برمی‌گردم.",
    "Det er forbudt at standse og bakke på motorvejen.", "Stopping and reversing on the motorway are forbidden.", "ایستادن و دنده‌عقب رفتن در آزادراه ممنوع است."),
)

Q(5792, "6.2", town("""
THE SCENE: a narrow town street; a traffic sign on a pole at the kerb has been knocked over and lies partly on the pavement and partly
in the carriageway; our car stands just in front of it with its reversing lights on, as if we have just reversed into it.
MUST BE CLEARLY VISIBLE: the knocked-over sign lying partly in the carriageway, our car with its reversing lights.
MUST NOT APPEAR: text on the sign, other signs."""),
  "Du kommer til at bakke ind i en færdselstavle, så den vælter og ligger delvis ude på kørebanen. Hvad skal du gøre?",
  "You accidentally reverse into a traffic sign, so that it falls over and lies partly in the carriageway. What must you do?",
  "هنگام دنده‌عقب به یک تابلوی راهنمایی و رانندگی می‌زنید و تابلو می‌افتد و بخشی از آن روی سواره‌رو قرار می‌گیرد. چه باید بکنید؟",
  S(True, "Jeg rejser tavlen eller fjerner den fra kørebanen, hvis det er muligt.", "I stand the sign up again or move it off the carriageway if possible.",
    "اگر بشود، تابلو را دوباره سرپا می‌کنم یا از روی سواره‌رو برمی‌دارم.",
    "Den, der beskadiger en færdselstavle, skal straks bringe afmærkningen i orden igen, hvis det er muligt.",
    "Whoever damages a traffic sign must put it right again at once if possible.",
    "کسی که به تابلوی راهنمایی و رانندگی آسیب بزند، باید در صورت امکان فوراً آن را درست کند."),
  S(True, "Kan jeg ikke bringe den i orden, giver jeg politiet besked snarest.", "If I cannot put it right, I tell the police as soon as possible.",
    "اگر نتوانم درستش کنم، هرچه زودتر به پلیس خبر می‌دهم.",
    "Kan afmærkningen ikke bringes i orden, skal politiet underrettes snarest.",
    "If the sign cannot be put right, the police must be told as soon as possible.",
    "اگر نشود تابلو را درست کرد، باید هرچه زودتر به پلیس اطلاع داد."),
  S(True, "Jeg advarer de andre trafikanter, så længe tavlen ligger, så den er til fare.",
    "I warn other road users as long as the sign lies where it is a danger.", "تا وقتی تابلو جایی خطرناک افتاده، به دیگر کاربران راه هشدار می‌دهم.",
    "Du skal gøre, hvad der er nødvendigt for at advare andre trafikanter.", "You must do what is needed to warn other road users.",
    "باید هر کاری لازم است برای هشدار به دیگر کاربران راه انجام دهید."),
  S(True, "Pligten gælder, selv om tavlen var dårligt fastgjort.", "The duty applies even if the sign was badly fixed.",
    "این وظیفه حتی اگر تابلو بد نصب شده بود هم برقرار است.",
    "Pligten gælder, uanset om skaden sker med eller uden egen skyld.", "The duty applies whether or not the damage was your fault.",
    "این وظیفه برقرار است، چه آسیب تقصیر شما باشد چه نباشد."),
)

Q(5793, "6.2", town("""
THE SCENE: a quiet residential street at night with houses and lit windows; a car with open windows stands at the kerb with its engine
running and its lights on; nobody else around.
MUST BE CLEARLY VISIBLE: the parked car with open windows and running lights, the houses close by.
MUST NOT APPEAR: signs, text.""", cond="night, street lights"),
  "Det er sent om aftenen i et boligkvarter. Du venter i bilen på en ven og lader motoren gå, mens musikken spiller højt med åbne vinduer. "
  "Hvad gælder?",
  "It is late in the evening in a residential area. You are waiting in the car for a friend and leave the engine running while music "
  "plays loudly with the windows open. What applies?",
  "آخر شب در یک محله‌ی مسکونی است. در خودرو منتظر دوستتان هستید، موتور را روشن گذاشته‌اید و با شیشه‌های باز موسیقی بلند پخش می‌شود. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal vise hensyn over for dem, der bor ved vejen.", "I must show consideration for those who live by the road.",
    "باید ملاحظه‌ی ساکنان کنار خیابان را داشته باشم.",
    "Trafikanter skal også vise hensyn over for dem, der bor eller opholder sig ved vejen.",
    "Road users must also show consideration for those who live or stay by the road.",
    "کاربران راه باید ملاحظه‌ی کسانی را که کنار راه زندگی می‌کنند یا حضور دارند هم داشته باشند."),
  S(True, "Jeg slukker motoren og skruer ned for musikken.", "I switch off the engine and turn the music down.",
    "موتور را خاموش و صدای موسیقی را کم می‌کنم.",
    "Et motordrevet køretøj må ikke afgive unødig støj eller unødigt udvikle røg eller gasarter.",
    "A motor vehicle must not make needless noise or give off needless smoke or fumes.",
    "وسیله‌ی موتوری نباید سر و صدا یا دود و گازِ بی‌دلیل تولید کند."),
  S(False, "Det er tilladt, fordi bilen holder lovligt parkeret.", "It is allowed because the car is legally parked.",
    "مجاز است، چون خودرو قانونی پارک شده است.",
    "Også en lovligt parkeret bil må ikke støje unødigt.", "Even a legally parked car must not make needless noise.",
    "حتی خودرویی که قانونی پارک شده نباید بی‌دلیل سر و صدا کند."),
  S(False, "Det er kun et problem, hvis der er nogen, der klager.", "It is only a problem if someone complains.",
    "فقط وقتی مشکل است که کسی شکایت کند.",
    "Reglerne gælder, uanset om nogen klager.", "The rules apply whether or not anyone complains.", "این قاعده‌ها برقرارند، چه کسی شکایت کند چه نکند."),
)

Q(5794, "7.5", town("""
THE SCENE: a signal-controlled junction; we stand in the left-turn lane with a green light; no sign forbids turning round; an oncoming
car approaches through the junction; pedestrians wait at the crossing on the road to our left.
MUST BE CLEARLY VISIBLE: the green light, the oncoming car, the pedestrians at the crossing, the absence of any no-turning sign.
MUST NOT APPEAR: signs, text."""),
  "Du holder i venstresvingsbanen i et lyskryds og har grønt. Du vil vende og køre tilbage. Der er ingen tavle, der forbyder det. Hvad "
  "gælder?",
  "You are in the left-turn lane at traffic lights and have green. You want to turn round and drive back. No sign forbids it. What applies?",
  "در خط گردش به چپِ یک تقاطعِ چراغ‌دار ایستاده‌اید و چراغتان سبز است. می‌خواهید دور بزنید و برگردید. تابلویی این کار را ممنوع نکرده "
  "است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må vende, når det kan ske uden fare eller ulempe for andre.", "I may turn round when it can be done without danger or inconvenience to others.",
    "وقتی بدون خطر یا مزاحمت برای دیگران ممکن باشد، می‌توانم دور بزنم.",
    "Før vending skal du sikre dig, at manøvren kan udføres uden fare eller ulempe for andre.",
    "Before turning round you must make sure the manoeuvre can be done without danger or inconvenience to others.",
    "پیش از دور زدن باید مطمئن شوید که این مانور برای دیگران خطر یا مزاحمتی ندارد."),
  S(True, "Jeg holder tilbage for modkørende og for gående, der går over der, hvor jeg vender.",
    "I give way to oncoming traffic and to pedestrians crossing where I turn round.",
    "به خودروهای روبه‌رو و عابرانی که جایی که دور می‌زنم رد می‌شوند حق تقدم می‌دهم.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for modkørende, og du må ikke være til fare for gående.",
    "You must not turn left until it can be done without inconvenience to oncoming traffic, and you must not endanger pedestrians.",
    "تا گردش به چپ بدون مزاحمت برای روبه‌روها ممکن نباشد نباید بپیچید و نباید عابران را به خطر بیندازید."),
  S(False, "Det er altid forbudt at vende i et lyskryds.", "Turning round at traffic lights is always forbidden.",
    "دور زدن در تقاطعِ چراغ‌دار همیشه ممنوع است.",
    "Det er kun forbudt, hvor en tavle forbyder vending eller venstresving, eller hvor det ikke kan ske sikkert.",
    "It is only forbidden where a sign forbids turning round or turning left, or where it cannot be done safely.",
    "فقط جایی ممنوع است که تابلو دور زدن یا گردش به چپ را ممنوع کرده باشد، یا جایی که بی‌خطر ممکن نباشد."),
  S(True, "Jeg vender forlæns til venstre og ikke ved at bakke ind på en sidevej.",
    "I turn round forwards to the left and not by reversing into a side road.",
    "رو به جلو و به سمت چپ دور می‌زنم، نه با دنده‌عقب رفتن به یک راه فرعی.",
    "Vending skal ske forlæns til venstre, medmindre forholdene ikke tillader det.",
    "Turning round must be done forwards to the left unless conditions do not allow it.",
    "دور زدن باید رو به جلو و به چپ انجام شود، مگر شرایط اجازه ندهد."),
)

Q(5795, "7.5", view("""
THE SCENE: a narrow country road just after a sharp bend to the right; the road behind the bend cannot be seen in the interior
rear-view mirror at the top of the picture; ahead on the left a gravel entrance to a field; further ahead a side road with a clear view.
MUST BE CLEARLY VISIBLE: the blind bend just behind us in the mirror, the field entrance, the side road further ahead.
MUST NOT APPEAR: signs, text."""),
  "Du er kørt forkert og vil vende på landevejen lige efter et skarpt sving, hvor du ikke kan se de biler, der kommer gennem svinget. "
  "Hvad gælder?",
  "You have taken a wrong turn and want to turn round on the country road just after a sharp bend, where you cannot see the cars coming "
  "through the bend. What applies?",
  "راه را اشتباه آمده‌اید و می‌خواهید درست بعد از پیچی تند در جاده‌ی بیرون شهر دور بزنید، جایی که خودروهایی را که از پیچ می‌آیند "
  "نمی‌بینید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg vender ikke her, men kører videre til et sted med godt udsyn til begge sider.",
    "I do not turn round here but drive on to a place with a good view both ways.",
    "این‌جا دور نمی‌زنم و تا جایی که به هر دو طرف دید خوبی داشته باشد ادامه می‌دهم.",
    "Før vending skal du sikre dig, at den kan ske uden fare, og det kan du ikke, når du ikke kan se, hvad der kommer.",
    "Before turning round you must make sure it can be done without danger, and you cannot when you cannot see what is coming.",
    "پیش از دور زدن باید از بی‌خطر بودنش مطمئن شوید و وقتی نمی‌بینید چه می‌آید، نمی‌توانید."),
  S(True, "Jeg kan vende ved hjælp af en sidevej længere fremme, hvor der er godt udsyn.",
    "I can turn round using a side road further ahead where there is a good view.",
    "می‌توانم با استفاده از راهی فرعی که جلوتر است و دید خوبی دارد، دور بزنم.",
    "Så holder du dig ude af vejen for trafikken fra begge sider under manøvren.", "Then you stay out of the way of traffic from both sides during the manoeuvre.",
    "این‌طور هنگام مانور سر راهِ ترافیکِ هر دو طرف نیستید."),
  S(False, "Jeg vender hurtigt, så jeg er væk, før der kommer nogen.", "I turn round quickly so that I am gone before anyone comes.",
    "سریع دور می‌زنم تا پیش از آمدن کسی رفته باشم.",
    "Biler, der kommer gennem svinget, kan ikke nå at standse.", "Cars coming through the bend cannot stop in time.",
    "خودروهایی که از پیچ می‌آیند نمی‌توانند به‌موقع بایستند."),
  S(False, "Det er tilladt, hvis jeg tænder havariblinket, mens jeg vender.", "It is allowed if I switch on the hazard lights while I turn round.",
    "اگر هنگام دور زدن چراغ فلاشر را روشن کنم، مجاز است.",
    "Havariblinket gør ikke en farlig vending sikker.", "The hazard lights do not make a dangerous turn safe.",
    "چراغ فلاشر یک دور زدنِ خطرناک را بی‌خطر نمی‌کند."),
)

Q(5796, "7.15", above("""
THE SCENE: a small roundabout in an old residential area seen from above; at none of the four entries are there signs or shark's teeth.
VEHICLES (colour code used strictly): a RED car (ours) driving in the roundabout; a grey car about to enter from the road on our RIGHT.
MUST NOT APPEAR: signs, text, shark's teeth."""),
  "I en lille rundkørsel er der hverken vigepligtstavler eller hajtænder ved indkørslerne. Du kører i rundkørslen, og en bil er ved at "
  "køre ind fra en vej til højre for dig. Hvad gælder?",
  "In a small roundabout there are neither give-way signs nor shark's teeth at the entries. You are driving in the roundabout, and a car "
  "is about to enter from a road on your right. What applies?",
  "در میدانی کوچک، کنار ورودی‌ها نه تابلوی رعایت حق تقدم هست نه دندان‌کوسه‌ای. شما داخل میدان هستید و خودرویی می‌خواهد از راهی در سمت "
  "راست شما وارد شود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for bilen, der kører ind fra højre.", "I must give way to the car entering from the right.",
    "باید به خودرویی که از راست وارد می‌شود حق تقدم بدهم.",
    "Uden tavler og afmærkning gælder højrevigepligt, også i en rundkørsel.",
    "Without signs or markings you must give way to the right, also in a roundabout.",
    "بدون تابلو و علامت‌گذاری، حق تقدم با سمت راست است، در میدان هم."),
  S(False, "Bilen skal holde tilbage, fordi jeg allerede er i rundkørslen.", "The car must give way because I am already in the roundabout.",
    "آن خودرو باید حق تقدم بدهد، چون من از قبل داخل میدان هستم.",
    "Det gælder kun, når indkørslen er afmærket med ubetinget vigepligt.", "That only applies when the entry is marked with an unconditional duty to give way.",
    "این فقط وقتی است که ورودی با علامتِ رعایت حق تقدم مشخص شده باشد."),
  S(True, "Jeg kører langsomt og er klar til at standse ved hver indkørsel.", "I drive slowly and am ready to stop at each entry.",
    "آهسته می‌رانم و آماده‌ام کنار هر ورودی بایستم.",
    "Når trafikken fra højre har forret, skal du kunne holde tilbage.", "When traffic from the right has priority, you must be able to give way.",
    "وقتی ترافیکِ سمت راست حق تقدم دارد، باید بتوانید توقف کنید و راه بدهید."),
  S(False, "I alle rundkørsler har den, der er i rundkørslen, forkørselsret.", "In every roundabout, whoever is in the roundabout has the right of way.",
    "در همه‌ی میدان‌ها کسی که داخل میدان است حق تقدم دارد.",
    "Det er tavlerne og hajtænderne ved indkørslerne, der giver dem i rundkørslen forret.",
    "It is the signs and shark's teeth at the entries that give those in the roundabout priority.",
    "این تابلوها و دندان‌کوسه‌ای‌های کنار ورودی‌ها هستند که به کسانی که داخل میدان‌اند حق تقدم می‌دهند."),
)

Q(5797, "7.15", above("""
THE SCENE: a large two-lane roundabout seen from above; at our entry there are two lanes with white road arrows: the left lane shows
left and straight ahead, the right lane shows straight ahead and right; the exit straight ahead (the second exit) has two lanes.
VEHICLES (colour code used strictly): a RED car (ours) in the right entry lane; a grey car in the left entry lane beside us.
MUST NOT APPEAR: signs, text."""),
  "Du skal ligeud gennem en rundkørsel med to vognbaner. Pilene ved indkørslen viser ligeud i begge vognbaner. Du holder i højre "
  "vognbane, og ved siden af dig holder en bil i venstre vognbane. Hvad gælder?",
  "You are going straight on through a two-lane roundabout. The arrows at the entry show straight ahead in both lanes. You are in the "
  "right lane, and beside you a car is in the left lane. What applies?",
  "می‌خواهید از میدانی دوخطه مستقیم عبور کنید. فلش‌های ورودی در هر دو خط مستقیم را نشان می‌دهند. شما در خط راست هستید و کنارتان "
  "خودرویی در خط چپ است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må køre ligeud fra højre vognbane, som pilene viser.", "I may go straight on from the right lane, as the arrows show.",
    "همان‌طور که فلش‌ها نشان می‌دهند، می‌توانم از خط راست مستقیم بروم.",
    "Den, der skal ligeud, kan vælge den vognbane, der passer bedst, og pilene viser, at begge må bruges.",
    "Whoever is going straight on may choose the most suitable lane, and the arrows show that both may be used.",
    "کسی که مستقیم می‌رود می‌تواند مناسب‌ترین خط را انتخاب کند و فلش‌ها نشان می‌دهند که از هر دو می‌شود استفاده کرد."),
  S(True, "Jeg bliver i min vognbane gennem rundkørslen og holder øje med bilen ved siden af mig.",
    "I stay in my lane through the roundabout and keep an eye on the car beside me.",
    "در طول میدان در خط خودم می‌مانم و مراقب خودروی کنارم هستم.",
    "Den anden bil kan også skulle ligeud og køre ved siden af dig hele vejen.", "The other car may also be going straight on and drive beside you all the way.",
    "ممکن است آن خودرو هم مستقیم برود و تمام مسیر کنار شما بماند."),
  S(False, "I en rundkørsel skal man altid bruge venstre vognbane, når man skal ligeud.",
    "In a roundabout you must always use the left lane when going straight on.", "در میدان همیشه برای مستقیم رفتن باید از خط چپ استفاده کرد.",
    "Det er pilene ved indkørslen, der viser, hvilke vognbaner der må bruges.", "It is the arrows at the entry that show which lanes may be used.",
    "فلش‌های ورودی نشان می‌دهند از کدام خط‌ها می‌شود استفاده کرد."),
  S(False, "Jeg skal blinke til venstre, mens jeg kører rundt i rundkørslen.", "I must signal left while I drive round the roundabout.",
    "هنگام دور زدن در میدان باید راهنمای چپ بزنم.",
    "Du skal blinke til højre, før du kører ud; et blink til venstre kan misforstås.",
    "You must signal right before you leave; a left signal may be misunderstood.",
    "باید پیش از خروج راهنمای راست بزنید؛ راهنمای چپ ممکن است اشتباه فهمیده شود."),
)

Q(5798, "7.8", view("""
THE SCENE: a country road in winter; ahead of us a lorry with a salt spreader at the back and amber flashing lights spreads salt and
fine gravel across the road; grains bounce on the road surface behind it.
MUST BE CLEARLY VISIBLE: the gritting lorry with its amber lights, the salt and gravel spraying behind it.
MUST NOT APPEAR: signs, text, logos.""", cond="winter, cold, damp road"),
  "Foran dig kører en saltbil med gult blink og spreder salt og grus på vejen. Hvordan forholder du dig?",
  "In front of you a gritting lorry with an amber flashing light is spreading salt and gravel on the road. What do you do?",
  "جلوی شما یک خودروی نمک‌پاش با چراغ زرد چشمک‌زن نمک و شن روی جاده می‌پاشد. چه می‌کنید؟",
  S(True, "Jeg holder god afstand, så saltet og gruset ikke rammer min bil.", "I keep a good distance so that the salt and gravel do not hit my car.",
    "فاصله‌ی کافی نگه می‌دارم تا نمک و شن به خودرویم نخورد.",
    "Gruset kan slå skår i ruden og lakken, og saltet kan dække ruden.", "The gravel can chip the windscreen and paintwork, and the salt can cover the windscreen.",
    "شن ممکن است شیشه و رنگ خودرو را بشکند و نمک ممکن است روی شیشه را بپوشاند."),
  S(True, "Jeg regner med, at vejen foran saltbilen kan være glat.", "I expect that the road ahead of the gritting lorry may be slippery.",
    "انتظار دارم جاده‌ی جلوی خودروی نمک‌پاش لغزنده باشد.",
    "Saltbilen kører netop, fordi der er risiko for glat føre.", "The gritting lorry is out precisely because there is a risk of slippery roads.",
    "خودروی نمک‌پاش دقیقاً به این دلیل بیرون آمده که خطر لغزندگی هست."),
  S(False, "Jeg overhaler hurtigt, så jeg kommer ud på en vej, der er saltet.", "I overtake quickly so that I get onto a road that has been salted.",
    "سریع سبقت می‌گیرم تا به جاده‌ای برسم که نمک خورده است.",
    "Foran saltbilen er vejen endnu ikke saltet.", "Ahead of the gritting lorry the road has not been salted yet.",
    "جلوی خودروی نمک‌پاش هنوز به جاده نمک نخورده است."),
  S(True, "Jeg overhaler kun, hvis vejen er fri langt frem, og det kan ske uden fare.",
    "I only overtake if the road is clear far ahead and it can be done without danger.",
    "فقط وقتی سبقت می‌گیرم که جاده تا فاصله‌ی زیادی خالی باشد و بی‌خطر ممکن باشد.",
    "Det gule blink forbyder ikke overhaling, men glat føre gør overhalingen mere risikabel.",
    "The amber flash does not forbid overtaking, but slippery conditions make overtaking riskier.",
    "چراغ زرد سبقت را ممنوع نمی‌کند، ولی لغزندگی جاده سبقت را پرخطرتر می‌کند."),
)

Q(5799, "5.2", view("""
THE SCENE: a country road dipping under a railway bridge; the dip is flooded with brown water across the whole road after a cloudburst;
the depth cannot be judged; no other vehicles.
MUST BE CLEARLY VISIBLE: the flooded dip covering the whole road, the railway bridge.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="after a cloudburst, overcast, wet road"),
  "Efter et skybrud står der vand hen over vejen i en lavning. Du kan ikke se, hvor dybt det er. Hvad gør du?",
  "After a cloudburst there is water across the road in a dip. You cannot see how deep it is. What do you do?",
  "بعد از رگبار شدید، آب در یک گودی سراسر جاده را گرفته است. نمی‌بینید چقدر عمیق است. چه می‌کنید؟",
  S(True, "Jeg kører ikke ud i vandet, når jeg ikke ved, hvor dybt det er, men finder en anden vej.",
    "I do not drive into the water when I do not know how deep it is, but find another way.",
    "وقتی نمی‌دانم آب چقدر عمیق است، واردش نمی‌شوم و راه دیگری پیدا می‌کنم.",
    "Dybt vand kan få motoren til at stoppe og bilen til at flyde, og der kan være huller under vandet.",
    "Deep water can stop the engine and make the car float, and there may be holes under the water.",
    "آب عمیق ممکن است موتور را خاموش کند و خودرو را شناور کند و زیر آب هم ممکن است چاله باشد."),
  S(False, "Jeg kører hurtigt igennem, så bilen ikke når at gå i stå.", "I drive through fast so that the car does not have time to stall.",
    "سریع رد می‌شوم تا خودرو فرصت خاموش شدن پیدا نکند.",
    "Høj fart giver en bølge, der kan nå motorens luftindtag, og du kan miste herredømmet.",
    "High speed creates a wave that can reach the engine's air intake, and you may lose control.",
    "سرعت زیاد موجی می‌سازد که ممکن است به ورودی هوای موتور برسد و ممکن است کنترل را از دست بدهید."),
  S(False, "Med firehjulstræk kan jeg altid køre igennem.", "With four-wheel drive I can always drive through.", "با خودروی چهارچرخ‌محرک همیشه می‌توانم رد شوم.",
    "Firehjulstræk hjælper ikke, hvis vandet er for dybt.", "Four-wheel drive does not help if the water is too deep.",
    "اگر آب خیلی عمیق باشد، چهارچرخ‌محرک بودن کمکی نمی‌کند."),
  S(False, "Er jeg kommet igennem, kan jeg regne med, at bremserne virker som normalt.",
    "Once I am through, I can count on the brakes working as normal.", "وقتی رد شدم، می‌توانم مطمئن باشم ترمزها مثل همیشه کار می‌کنند.",
    "Våde bremser kan virke dårligt; prøv dem forsigtigt, når du er kommet igennem.",
    "Wet brakes may work poorly; test them carefully once you are through.",
    "ترمزهای خیس ممکن است خوب کار نکنند؛ وقتی رد شدید، آن‌ها را با احتیاط امتحان کنید."),
)

Q(5800, "1.2", picture("""
A family car standing on the test lane in a vehicle inspection hall; an inspector in work clothes looks under the front of the car with
a lamp; a roller brake tester is set into the floor.
MUST BE CLEARLY VISIBLE: the car on the inspection lane, the inspector checking it.
MUST NOT APPEAR: text, logos, letters or numbers on the number plate."""),
  "Du har købt en ny personbil. Hvornår skal den til periodisk syn første gang?",
  "You have bought a new car. When does it have to go for its periodic inspection for the first time?",
  "خودروی سواریِ نویی خریده‌اید. اولین معاینه‌ی فنیِ دوره‌ای‌اش کِی است؟",
  S(True, "4 år efter, at den blev indregistreret første gang, og derefter hvert andet år.",
    "4 years after it was first registered, and then every second year.",
    "۴ سال بعد از نخستین ثبت و پس از آن هر دو سال یک بار.",
    "En almindelig personbil skal til periodisk syn 4 år efter første registrering og derefter hvert andet år.",
    "An ordinary car must have its periodic inspection 4 years after first registration and then every second year.",
    "خودروی سواری معمولی باید ۴ سال پس از نخستین ثبت و بعد از آن هر دو سال یک بار معاینه‌ی فنی دوره‌ای شود."),
  S(False, "Hvert år, fra den er ny.", "Every year from new.", "از همان نو بودن، هر سال.",
    "En ny personbil skal først synes efter 4 år.", "A new car does not have to be inspected until after 4 years.",
    "خودروی سواریِ نو تا ۴ سال لازم نیست معاینه شود."),
  S(False, "Aldrig, så længe den ikke har været ude for et uheld.", "Never, as long as it has not been in an accident.",
    "تا وقتی تصادف نکرده، هرگز.",
    "Personbiler skal til periodisk syn, uanset om de har været ude for et uheld.", "Cars must have periodic inspections whether or not they have been in an accident.",
    "خودروهای سواری، چه تصادف کرده باشند چه نه، باید معاینه‌ی فنی دوره‌ای شوند."),
)
