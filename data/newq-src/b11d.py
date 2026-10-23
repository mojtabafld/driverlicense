# «آزمون جدید», batch 11 (6001–6100), part d: stopping and parking (7.18), speed and skids (7.3), road users beside the road (7.6),
# signs (6.1), the driver's condition (4.4), the car (1.2), traffic lights (7.12), overtaking (7.9), road conditions (5.2), reversing
# (7.5), lights (7.19), accidents and first aid (6.2), distance (7.8), safety (8.1) and insurance (10.3).
# Rules: Færdselsloven §§ 3, 9 stk. 1–2, 11 (someone on roller skates counts as a pedestrian), 15 stk. 3, 18 stk. 1, 26 stk. 3 (from a
# property you must give way to all), 27 stk. 2 and 7, 33 stk. 2–3 (main beam; not when meeting), 41 (stop within the distance you can
# see), 54 stk. 1 nr. 2 and 4 and stk. 2 (THC; THC on a lawful prescription only when taken as prescribed; no driving when medicine or
# illness means you cannot drive fully safely), 105 (motor vehicles must have liability insurance); BEK 425/2023: § 59 UC 60,1 (an
# arrow pointing both ways: the restriction applies before and after the sign), § 9 (the plate «Gælder kun gennemkørsel»: only passage
# without an errand is banned), § 63 (signals as signs; a working signal still applies).
# Guidance (not law): look and steer where you want to go when the rear slides; a fast roller skater reaches the crossing sooner;
# dilating eye drops blur your sight for hours; automatic emergency braking does not see everything; the road in front of a gritter
# is not yet salted; smoke and snow throw main beam back at you; reverse into a driveway to drive out forwards; the recovery position
# keeps the airway free; a bike rack can hide the car's lights; tell 1-1-2 where you are; retighten wheel bolts after a wheel change;
# familiar roads lull you; do not open the bonnet fully when the engine burns; plan breaks on a long drive; worn shock absorbers and
# brake pads must be seen to; an automatic car is driven with the right foot only.
from nq import Q, S, above, picture, town, view

Q(6076, "7.18", town("""
THE SCENE: a street in town; at the right kerb stands a round blue sign with a red border and one red diagonal stripe (the Danish
no-parking sign); under it a white plate shows a black vertical arrow with heads at both ends, pointing up and down.
MUST BE CLEARLY VISIBLE: the no-parking sign and the plate with the double-headed vertical arrow.
MUST NOT APPEAR: other signs, text."""),
  "Ved kantstenen står en tavle med parkeringsforbud. Under den sidder en undertavle med en lodret pil, der peger både op og ned. Hvad "
  "betyder undertavlen?",
  "At the kerb there is a no-parking sign. Under it is a plate with a vertical arrow pointing both up and down. What does the plate mean?",
  "کنار جدول تابلوی «پارک ممنوع» هست. زیر آن تابلوی کوچکی با یک پیکان عمودی هست که هم به بالا و هم به پایین اشاره می‌کند. این تابلوی "
  "کوچک چه معنایی دارد؟",
  S(True, "Forbuddet gælder både før og efter tavlen.", "The ban applies both before and after the sign.",
    "ممنوعیت هم پیش و هم پس از تابلو برقرار است.",
    "En pil med spids i begge ender viser, at restriktionen gælder på begge sider af tavlen.",
    "An arrow with a head at both ends shows that the restriction applies on both sides of the sign.",
    "پیکانی که در هر دو سر نوک دارد، نشان می‌دهد محدودیت در هر دو طرف تابلو برقرار است."),
  S(False, "Forbuddet begynder først ved tavlen.", "The ban only begins at the sign.", "ممنوعیت تازه از محل تابلو شروع می‌شود.",
    "At forbuddet begynder ved tavlen, vises med en pil, der kun peger fremad.",
    "That the ban begins at the sign is shown by an arrow pointing forwards only.",
    "شروع ممنوعیت از محل تابلو با پیکانی نشان داده می‌شود که فقط رو به جلوست."),
  S(False, "Forbuddet gælder kun lige ud for tavlen.", "The ban only applies right opposite the sign.",
    "ممنوعیت فقط درست کنار خود تابلو برقرار است.",
    "Pilene viser, at forbuddet gælder en strækning både før og efter tavlen.",
    "The arrows show that the ban covers a stretch both before and after the sign.",
    "پیکان‌ها نشان می‌دهند ممنوعیت شامل مسافتی پیش و پس از تابلو است."),
)

Q(6077, "7.3", above("""
THE SCENE: a left-hand bend on a snow-covered country road seen from above.
VEHICLES (colour code used strictly): a RED car (ours) in the bend whose rear end is sliding out to the RIGHT, towards the outside of
the bend; curved tyre tracks in the snow show the slide; a SOLID GREEN arrow shows the intended path along the road through the bend.
MUST NOT APPEAR: other vehicles, signs, text."""),
  "I et venstresving på en glat vej begynder bilens bagende at skride ud mod højre. Hvad gør du?",
  "In a left-hand bend on a slippery road the rear of the car starts to slide out to the right. What do you do?",
  "در یک پیچ به چپ روی جاده‌ای لغزنده، عقب خودرو شروع به سُر خوردن به سمت راست می‌کند. چه می‌کنید؟",
  S(True, "Jeg ser og styrer i den retning, jeg vil køre.", "I look and steer in the direction I want to go.",
    "به همان سمتی که می‌خواهم بروم نگاه می‌کنم و فرمان می‌دهم.",
    "Ved at styre roligt i den ønskede retning kan du få bagenden ind igen.",
    "By calmly steering in the direction you want, you can get the rear back in line.",
    "با فرمان دادنِ آرام به سمت دلخواه، می‌توانید عقب خودرو را دوباره به مسیر برگردانید."),
  S(True, "Jeg letter forsigtigt på speederen og undgår at bremse hårdt.", "I ease gently off the accelerator and avoid braking hard.",
    "آرام پایم را از روی گاز برمی‌دارم و از ترمز شدید پرهیز می‌کنم.",
    "En hård opbremsning kan få bilen til at skride endnu mere.", "Hard braking may make the car slide even more.",
    "ترمز شدید ممکن است سُر خوردن خودرو را بیشتر کند."),
  S(False, "Jeg trækker håndbremsen.", "I pull the handbrake.", "ترمز دستی را می‌کشم.",
    "Håndbremsen låser baghjulene og får bagenden til at skride endnu mere ud.",
    "The handbrake locks the rear wheels and makes the rear slide out even more.",
    "ترمز دستی چرخ‌های عقب را قفل می‌کند و عقب خودرو را بیشتر به بیرون می‌لغزاند."),
  S(False, "Jeg drejer rattet kraftigt længere ind i svinget.", "I turn the steering wheel hard further into the bend.",
    "فرمان را به‌شدت بیشتر به داخل پیچ می‌چرخانم.",
    "Så kan bilen dreje rundt; styr roligt i den retning, du vil køre.",
    "Then the car may spin round; steer calmly in the direction you want to go.",
    "در این صورت ممکن است خودرو دور خودش بچرخد؛ آرام به سمتی که می‌خواهید بروید فرمان بدهید."),
)

Q(6078, "7.6", town("""
THE SCENE: a street in town with a zebra crossing a little ahead and no traffic lights; on the right pavement a teenager on inline
skates speeds towards the crossing, already close to the kerb.
MUST BE CLEARLY VISIBLE: the zebra crossing, the fast skater approaching it on the pavement.
MUST NOT APPEAR: traffic lights, signs, text."""),
  "En ung på rulleskøjter kommer hurtigt hen ad fortovet mod et fodgængerfelt foran dig. Der er ingen lyssignaler. Hvordan forholder du "
  "dig?",
  "A young person on roller skates is coming fast along the pavement towards a pedestrian crossing ahead of you. There are no traffic "
  "lights. What do you do?",
  "نوجوانی با اسکیت روی پیاده‌رو به‌سرعت به سمت خط عابر پیاده‌ای که جلوی شماست می‌آید. چراغ راهنمایی نیست. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned, så jeg kan holde tilbage for ham, hvis han kører ud i feltet.",
    "I slow down so that I can give way to him if he goes out onto the crossing.",
    "سرعتم را کم می‌کنم تا اگر وارد خط عابر شد، بتوانم به او راه بدهم.",
    "Den, der løber på rulleskøjter, anses som gående, og du skal holde tilbage for gående på vej ud i feltet.",
    "Someone on roller skates counts as a pedestrian, and you must give way to pedestrians on their way onto the crossing.",
    "کسی که با اسکیت حرکت می‌کند عابر پیاده به شمار می‌آید و باید به عابرانی که وارد خط عابر می‌شوند راه بدهید."),
  S(True, "Jeg regner med, at han kan nå feltet hurtigere end en almindelig fodgænger.",
    "I expect that he may reach the crossing sooner than an ordinary pedestrian.",
    "احتمال می‌دهم او زودتر از یک عابر معمولی به خط عابر برسد.",
    "På rulleskøjter kommer han hurtigt, så du skal vurdere situationen tidligere.",
    "On roller skates he comes quickly, so you must judge the situation earlier.",
    "با اسکیت سریع می‌آید، پس باید زودتر موقعیت را ارزیابی کنید."),
  S(False, "Rulleskøjteløbere er ikke gående, så de har ingen ret i fodgængerfeltet.",
    "Roller skaters are not pedestrians, so they have no right on the pedestrian crossing.",
    "اسکیت‌سواران عابر پیاده نیستند، پس روی خط عابر حقی ندارند.",
    "Den, der løber på rulleskøjter, anses som gående.", "Someone on roller skates counts as a pedestrian.",
    "کسی که با اسکیت حرکت می‌کند، عابر پیاده محسوب می‌شود."),
  S(False, "Han skal bremse op ved kantstenen og vente på mig.", "He must brake at the kerb and wait for me.",
    "او باید کنار جدول ترمز کند و منتظر من بماند.",
    "Du skal afpasse farten, så der ikke opstår fare for dem, der er på vej ud i feltet.",
    "You must adjust your speed so that there is no danger to those on their way onto the crossing.",
    "باید سرعتتان را طوری تنظیم کنید که برای کسانی که وارد خط عابر می‌شوند خطری پیش نیاید."),
)

Q(6079, "6.1", town("""
THE SCENE: the entrance to a residential area with houses; at the entrance stands a round white sign with a red border showing a
black car above a black motorcycle (the Danish sign banning motor vehicles); under it a white plate with the black text «Gælder kun
gennemkørsel».
MUST BE CLEARLY VISIBLE: the round sign with the car and the motorcycle, the plate with the text.
MUST NOT APPEAR: other signs, other text."""),
  "Ved indkørslen til et villakvarter står en tavle, der forbyder kørsel med motorkøretøj, med undertavlen »Gælder kun gennemkørsel«. "
  "Du skal besøge en ven, der bor i kvarteret. Hvad gælder?",
  "At the entrance to a residential area there is a sign banning motor vehicles, with the plate «Gælder kun gennemkørsel» (applies to "
  "through traffic only). You are going to visit a friend who lives in the area. What applies?",
  "در ورودی یک محله‌ی مسکونی تابلویی هست که ورود وسایل نقلیه‌ی موتوری را ممنوع می‌کند و زیر آن نوشته «Gælder kun gennemkørsel» (فقط "
  "برای عبور). می‌خواهید به دیدن دوستی بروید که در این محله زندگی می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må køre ind og besøge min ven.", "I may drive in and visit my friend.", "می‌توانم وارد شوم و به دیدن دوستم بروم.",
    "Forbuddet gælder kun den, der kører igennem uden at have et ærinde i området.",
    "The ban only applies to those who drive through without having an errand in the area.",
    "ممنوعیت فقط برای کسی است که بدون کاری در محله از آن عبور می‌کند."),
  S(True, "Jeg må ikke bruge kvarterets veje som genvej uden om køen på hovedvejen.",
    "I may not use the area's roads as a shortcut round the queue on the main road.",
    "نمی‌توانم از خیابان‌های محله برای دور زدن صفِ جاده‌ی اصلی میان‌بر بزنم.",
    "At køre igennem uden ærinde er netop det, undertavlen forbyder.", "Driving through without an errand is exactly what the plate bans.",
    "عبور بدون کار دقیقاً همان چیزی است که این تابلو منع می‌کند."),
  S(False, "Kun beboerne i kvarteret må køre ind.", "Only the residents of the area may drive in.", "فقط ساکنان محله اجازه‌ی ورود دارند.",
    "Alle med et ærinde i området, fx et besøg eller en levering, må køre ind.",
    "Anyone with an errand in the area, such as a visit or a delivery, may drive in.",
    "هر کسی که در محله کاری دارد، مثلاً دیدار یا تحویل بار، می‌تواند وارد شود."),
  S(False, "Tavlen forbyder al kørsel med bil i kvarteret.", "The sign bans all driving by car in the area.",
    "این تابلو هر نوع رانندگی با خودرو را در محله ممنوع می‌کند.",
    "Undertavlen begrænser forbuddet til gennemkørsel.", "The plate limits the ban to through traffic.",
    "تابلوی زیرین ممنوعیت را به عبورِ صرف محدود می‌کند."),
)

Q(6080, "4.4", picture("""
An eye doctor's waiting room: a person with very large, dilated pupils squints at the light from the window, holding a pair of
sunglasses and a set of car keys; a small bottle of eye drops stands on the table beside them.
MUST BE CLEARLY VISIBLE: the dilated pupils, the eye-drop bottle, the car keys.
MUST NOT APPEAR: text, logos."""),
  "Hos øjenlægen har du fået dråber, der udvider pupillerne. Du ser sløret og bliver let blændet. Du vil køre hjem. Hvad gælder?",
  "At the eye doctor's you have been given drops that dilate your pupils. Your sight is blurred and you are easily dazzled. You want to "
  "drive home. What applies?",
  "در مطب چشم‌پزشک قطره‌ای گرفته‌اید که مردمک‌ها را گشاد می‌کند. تار می‌بینید و نور زود چشمتان را می‌زند. می‌خواهید با خودرو به خانه "
  "بروید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg kører ikke, før synet er normalt igen.", "I do not drive until my sight is normal again.",
    "تا وقتی بینایی‌ام عادی نشده، رانندگی نمی‌کنم.",
    "Med udvidede pupiller ser du dårligt og bliver let blændet, og du må ikke køre, hvis du ikke kan køre helt sikkert.",
    "With dilated pupils you see poorly and are easily dazzled, and you must not drive if you cannot drive fully safely.",
    "با مردمک‌های گشاد بد می‌بینید و نور زود چشمتان را می‌زند و اگر نتوانید کاملاً ایمن برانید، نباید رانندگی کنید."),
  S(False, "Med solbriller på kan jeg godt køre med det samme.", "With sunglasses on I can drive straight away.",
    "با عینک آفتابی می‌توانم فوراً رانندگی کنم.",
    "Solbriller dæmper lyset, men gør ikke synet skarpt igen.", "Sunglasses dim the light but do not make your sight sharp again.",
    "عینک آفتابی نور را کم می‌کند، اما بینایی را دوباره واضح نمی‌کند."),
  S(False, "Det er kun et problem, hvis jeg skal køre i mørke.", "It is only a problem if I have to drive in the dark.",
    "فقط اگر در تاریکی رانندگی کنم مشکل دارد.",
    "Dråberne gør synet sløret, også om dagen.", "The drops make your sight blurred in daytime too.",
    "این قطره‌ها در روز هم دید را تار می‌کنند."),
)

Q(6081, "1.2", picture("""
Inside a car: on the instrument panel a red warning symbol showing two cars about to collide lights up; through the windscreen a
stopped car close ahead with its brake lights on; behind the rear-view mirror a small sensor camera unit is fixed to the windscreen.
MUST BE CLEARLY VISIBLE: the red warning symbol, the stopped car ahead, the sensor unit on the windscreen.
MUST NOT APPEAR: readable text, logos."""),
  "Din bil har en automatisk nødbremse, som kan bremse, hvis du er ved at køre ind i noget. Hvad gælder?",
  "Your car has automatic emergency braking, which can brake if you are about to run into something. What applies?",
  "خودروی شما ترمز اضطراری خودکار دارد که اگر در حال برخورد با چیزی باشید، می‌تواند ترمز بگیرد. چه قاعده‌ای برقرار است؟",
  S(True, "Systemet opdager ikke alt, så jeg skal stadig selv holde afstand og være opmærksom.",
    "The system does not detect everything, so I must still keep my distance and pay attention myself.",
    "این سیستم همه‌چیز را تشخیص نمی‌دهد، پس همچنان خودم باید فاصله را حفظ کنم و حواسم جمع باشد.",
    "Sensorerne opdager ikke alle forhindringer, fx ikke altid cyklister, dyr eller ting fra siden.",
    "The sensors do not detect every obstacle, for example not always cyclists, animals or things from the side.",
    "حسگرها همه‌ی موانع را تشخیص نمی‌دهند، مثلاً همیشه دوچرخه‌سواران، حیوانات یا چیزهایی را که از کنار می‌آیند نمی‌بینند."),
  S(True, "Jeg skal selv bremse, når der er fare.", "I must brake myself when there is danger.", "وقتی خطری هست، خودم باید ترمز کنم.",
    "Systemet er en hjælp i nødsituationer og overtager ikke dit ansvar.", "The system is a help in emergencies and does not take over your responsibility.",
    "این سیستم در موقعیت‌های اضطراری کمک می‌کند و مسئولیت شما را بر عهده نمی‌گیرد."),
  S(False, "Med nødbremsen kan jeg holde kortere afstand til bilen foran.", "With emergency braking I can keep a shorter distance to the car in front.",
    "با ترمز اضطراری می‌توانم فاصله‌ی کمتری با خودروی جلویی داشته باشم.",
    "Systemet griber først ind i sidste øjeblik og kan ikke forhindre alle uheld.",
    "The system only steps in at the last moment and cannot prevent every accident.",
    "این سیستم فقط در آخرین لحظه وارد عمل می‌شود و نمی‌تواند از همه‌ی تصادف‌ها جلوگیری کند."),
  S(False, "Systemet virker lige godt i alt slags vejr.", "The system works equally well in all kinds of weather.",
    "این سیستم در هر نوع هوایی به یک اندازه خوب کار می‌کند.",
    "Regn, sne, tåge og snavs på sensorerne kan gøre systemet mindre pålideligt.",
    "Rain, snow, fog and dirt on the sensors can make the system less reliable.",
    "باران، برف، مه و کثیفیِ روی حسگرها ممکن است این سیستم را کم‌اطمینان‌تر کند."),
)

Q(6082, "7.12", town("""
THE SCENE: a junction with traffic lights in town; for our lane there are two signal heads: the one on the right side before the
junction is completely dark (out of order), the other one on the far side of the junction shows red.
MUST BE CLEARLY VISIBLE: the dark signal head near us, the red light on the far signal head.
MUST NOT APPEAR: signs, text."""),
  "Ved et lyskryds er det ene af de to signaler for din vognbane slukket. Det andet signal viser rødt. Hvad gælder?",
  "At a junction with traffic lights one of the two signals for your lane is out. The other signal shows red. What applies?",
  "در یک تقاطع چراغ‌دار، یکی از دو چراغِ مربوط به خط شما خاموش است. چراغ دیگر قرمز نشان می‌دهد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder for rødt, fordi jeg skal rette mig efter det signal, der virker.",
    "I stop for the red light, because I must obey the signal that works.", "پشت چراغ قرمز می‌ایستم، چون باید از چراغی پیروی کنم که کار می‌کند.",
    "Et signal, der virker, gælder stadig, selv om et andet signal er gået ud.", "A signal that works still applies, even if another one has gone out.",
    "چراغی که کار می‌کند همچنان معتبر است، حتی اگر چراغ دیگری خاموش شده باشد."),
  S(True, "Jeg er ekstra opmærksom, fordi andre måske er i tvivl.", "I am extra careful, because others may be in doubt.",
    "بیشتر از همیشه مراقبم، چون ممکن است دیگران دچار تردید باشند.",
    "Når et signal er i stykker, kan andre trafikanter misforstå situationen.", "When a signal is broken, other road users may misunderstand the situation.",
    "وقتی چراغی خراب است، دیگران ممکن است موقعیت را اشتباه بفهمند."),
  S(False, "Når et af signalerne er slukket, gælder højrevigepligten i krydset.",
    "When one of the signals is out, the rule of giving way to the right applies at the junction.",
    "وقتی یکی از چراغ‌ها خاموش است، در تقاطع قاعده‌ی حق تقدم سمت راست برقرار است.",
    "Krydset er stadig reguleret af det signal, der virker.", "The junction is still controlled by the signal that works.",
    "تقاطع همچنان با چراغی که کار می‌کند کنترل می‌شود."),
  S(False, "Jeg må køre, fordi signalanlægget er i stykker.", "I may go, because the traffic lights are broken.",
    "می‌توانم بروم، چون چراغ‌ها خراب‌اند.",
    "Det andet signal viser rødt, og det skal du rette dig efter.", "The other signal shows red, and you must obey it.",
    "چراغ دیگر قرمز است و باید از آن پیروی کنید."),
)

Q(6083, "7.9", view("""
THE SCENE: a two-lane road on a frosty winter morning; ahead a large orange gritting lorry with flashing yellow lights drives slowly,
spreading salt in a wide fan behind it; the road in front of the lorry glitters with frost.
MUST BE CLEARLY VISIBLE: the gritting lorry with its yellow lights, the salt spreading behind it.
MUST NOT APPEAR: signs, text.""", cond="frosty winter morning, low sun, frost on the road"),
  "Det er frostvejr. Foran dig kører en saltspreder langsomt og spreder salt på vejen. Du vil gerne forbi. Hvad gælder?",
  "It is freezing. In front of you a gritting lorry is driving slowly and spreading salt on the road. You would like to get past. "
  "What applies?",
  "هوا یخبندان است. جلوی شما یک کامیون نمک‌پاش آهسته می‌رود و روی جاده نمک می‌پاشد. می‌خواهید از آن رد شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Vejen foran saltsprederen er endnu ikke saltet og kan være meget glat.",
    "The road in front of the gritter has not been salted yet and may be very slippery.",
    "جاده‌ی جلوی نمک‌پاش هنوز نمک نخورده و ممکن است بسیار لغزنده باشد.",
    "Overhaler du, kommer du ud på den del af vejen, der ikke er behandlet.",
    "If you overtake, you get onto the part of the road that has not been treated.",
    "اگر سبقت بگیرید، به بخشی از جاده می‌رسید که هنوز نمک نخورده است."),
  S(True, "Jeg holder god afstand, så saltet ikke rammer min forrude.", "I keep a good distance so that the salt does not hit my windscreen.",
    "فاصله‌ی کافی نگه می‌دارم تا نمک به شیشه‌ی جلوی من نخورد.",
    "Salt og grus fra sprederen kan ramme bilen og gøre det svært at se.", "Salt and grit from the spreader can hit the car and make it hard to see.",
    "نمک و ماسه‌ی پاشیده‌شده ممکن است به خودرو بخورد و دید را سخت کند."),
  S(False, "Saltsprederen kører langsomt, så jeg skal overhale den hurtigst muligt.",
    "The gritter is slow, so I must overtake it as soon as possible.", "نمک‌پاش آهسته است، پس باید هرچه زودتر از آن سبقت بگیرم.",
    "Det er sikrere at blive bag den, hvor vejen er saltet.", "It is safer to stay behind it, where the road has been salted.",
    "ماندن پشت آن، جایی که جاده نمک خورده، ایمن‌تر است."),
  S(False, "Når vejen er saltet, er den lige så sikker som en tør sommervej.",
    "Once the road has been salted, it is as safe as a dry road in summer.", "وقتی جاده نمک خورد، به اندازه‌ی جاده‌ی خشکِ تابستانی ایمن است.",
    "Saltet virker ikke med det samme, og vejen kan stadig være glat.", "The salt does not work immediately, and the road may still be slippery.",
    "نمک فوراً اثر نمی‌کند و جاده ممکن است هنوز لغزنده باشد."),
)

Q(6084, "5.2", view("""
THE SCENE: a country road; from a bonfire in a field on the right, thick grey smoke drifts across the road ahead, so that the road
beyond can hardly be seen.
MUST BE CLEARLY VISIBLE: the bonfire in the field, the thick smoke drifting across the road.
MUST NOT APPEAR: signs, text."""),
  "Røg fra et bål på en mark driver hen over vejen, så du næsten ikke kan se igennem den. Hvordan forholder du dig?",
  "Smoke from a bonfire in a field is drifting across the road, so that you can hardly see through it. What do you do?",
  "دود آتشی که در یک مزرعه روشن شده، روی جاده می‌آید و به‌سختی می‌توان از میانش دید. چه می‌کنید؟",
  S(True, "Jeg sætter farten kraftigt ned, før jeg kører ind i røgen.", "I reduce my speed a lot before I drive into the smoke.",
    "پیش از ورود به دود، سرعتم را خیلی کم می‌کنم.",
    "Du skal kunne standse på den strækning, du kan se.", "You must be able to stop within the distance you can see.",
    "باید بتوانید در مسافتی که می‌بینید متوقف شوید."),
  S(True, "Jeg er forberedt på, at der kan holde biler eller gå mennesker inde i røgen.",
    "I am prepared for cars standing or people walking inside the smoke.", "آماده‌ام که داخل دود خودرویی ایستاده باشد یا کسی راه برود.",
    "Andre kan have standset eller sat farten meget ned inde i røgen.", "Others may have stopped or slowed right down inside the smoke.",
    "ممکن است دیگران داخل دود ایستاده یا سرعتشان را خیلی کم کرده باشند."),
  S(False, "Jeg kører hurtigt igennem, så jeg hurtigt er ude af røgen igen.", "I drive through fast so that I am quickly out of the smoke again.",
    "سریع از میانش می‌گذرم تا زود از دود بیرون بیایم.",
    "Du kan ikke se, hvad der er inde i røgen.", "You cannot see what is inside the smoke.", "نمی‌بینید داخل دود چه چیزی هست."),
  S(False, "Jeg tænder fjernlyset, så jeg kan se igennem røgen.", "I switch on main beam so that I can see through the smoke.",
    "نور بالا را روشن می‌کنم تا از میان دود ببینم.",
    "Røgen kaster fjernlyset tilbage, så du ser endnu dårligere.", "The smoke throws the main beam back, so that you see even worse.",
    "دود نور بالا را بازمی‌تاباند و دیدتان بدتر می‌شود."),
)

Q(6085, "7.5", above("""
THE SCENE: a house with a driveway seen from above; a tall hedge runs along the pavement on both sides of the driveway; in front of it
a busy road with cars in both directions.
VEHICLES (colour code used strictly): a RED car (ours) on the road just past the driveway, with a DASHED ORANGE arrow showing it
reversing into the driveway; a BLUE car further back in our lane waiting; a pedestrian on the pavement some way off.
MUST NOT APPEAR: signs, text."""),
  "Du bor ved en befærdet vej, og en høj hæk skjuler udsynet ved din indkørsel. Hvordan er det bedst at parkere i indkørslen?",
  "You live on a busy road, and a tall hedge blocks the view at your driveway. What is the best way to park in the driveway?",
  "کنار جاده‌ای شلوغ زندگی می‌کنید و پرچینی بلند دید را در ورودی خانه‌تان می‌گیرد. بهترین راه برای پارک در ورودی چیست؟",
  S(True, "Det er bedst at bakke ind, så jeg senere kan køre forlæns ud.", "It is best to reverse in, so that I can later drive out forwards.",
    "بهتر است دنده‌عقب وارد شوم تا بعداً بتوانم رو به جلو بیرون بیایم.",
    "Når du kører forlæns ud, kan du bedre se gående på fortovet og trafikken på vejen.",
    "When you drive out forwards, you can better see pedestrians on the pavement and the traffic on the road.",
    "وقتی رو به جلو بیرون می‌آیید، عابران پیاده‌رو و ترافیک جاده را بهتر می‌بینید."),
  S(False, "Det er bedst at køre forlæns ind, fordi man ser bedst, når man bakker ud.",
    "It is best to drive in forwards, because you see best when you reverse out.",
    "بهتر است رو به جلو وارد شوم، چون هنگام دنده‌عقب بیرون آمدن بهتر دیده می‌شود.",
    "Når du bakker ud, ser du dårligst; derfor er det bedre at bakke ind og køre forlæns ud.",
    "When you reverse out you see worst; that is why it is better to reverse in and drive out forwards.",
    "هنگام دنده‌عقب بیرون آمدن کمترین دید را دارید؛ برای همین بهتر است دنده‌عقب وارد و رو به جلو خارج شوید."),
  S(False, "Det er ligegyldigt, fordi trafikken på vejen skal holde tilbage for mig, når jeg kører ud.",
    "It does not matter, because the traffic on the road must give way to me when I drive out.",
    "فرقی نمی‌کند، چون وقتی بیرون می‌آیم ترافیک جاده باید به من راه بدهد.",
    "Når du kører ud fra en ejendom, har du ubetinget vigepligt.", "When you drive out of a property, you must give way to all.",
    "وقتی از یک ملک بیرون می‌آیید، باید بی‌قیدوشرط راه بدهید."),
)

Q(6086, "7.19", view("""
THE SCENE: a dark country road in heavy snowfall; our headlights on main beam light up a dense white wall of snowflakes right in
front of the car, so that the road can hardly be seen.
MUST BE CLEARLY VISIBLE: the bright wall of snowflakes in the main beam, the hardly visible road.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="night, dark, heavy snowfall, no street lights"),
  "Det er mørkt, og det sner kraftigt. Med fjernlyset tændt ser du kun en hvid mur af snefnug. Hvad gør du?",
  "It is dark, and it is snowing heavily. With main beam on you only see a white wall of snowflakes. What do you do?",
  "هوا تاریک است و برف سنگینی می‌بارد. با نور بالا فقط دیواری سفید از دانه‌های برف می‌بینید. چه می‌کنید؟",
  S(True, "Jeg skifter til nærlys.", "I switch to dipped beam.", "به نور پایین تغییر می‌دهم.",
    "Snefnuggene kaster fjernlyset tilbage; med nærlys kan du ofte se bedre.",
    "The snowflakes throw the main beam back; with dipped beam you can often see better.",
    "دانه‌های برف نور بالا را بازمی‌تابانند؛ با نور پایین اغلب بهتر می‌بینید."),
  S(True, "Jeg kører så langsomt, at jeg kan standse inden for det stykke vej, jeg kan se i lyset.",
    "I drive so slowly that I can stop within the stretch of road I can see in the light.",
    "آن‌قدر آهسته می‌رانم که بتوانم در همان مسافتی از جاده که در نور می‌بینم بایستم.",
    "Du skal kunne standse på den del af vejen, du kan overskue.", "You must be able to stop within the part of the road you can see.",
    "باید بتوانید در بخشی از جاده که می‌بینید توقف کنید."),
  S(True, "Jeg øger afstanden til bilen foran mig.", "I increase the distance to the car in front of me.",
    "فاصله‌ام را با خودروی جلویی بیشتر می‌کنم.",
    "På sne bliver bremselængden længere.", "On snow the braking distance gets longer.", "روی برف مسافت ترمز طولانی‌تر می‌شود."),
  S(False, "Jeg lader fjernlyset være tændt, så jeg kan se længere frem.", "I leave the main beam on so that I can see further ahead.",
    "نور بالا را روشن می‌گذارم تا دورتر را ببینم.",
    "I kraftigt snevejr blænder fjernlyset dig selv, fordi lyset kastes tilbage.",
    "In heavy snow the main beam dazzles you yourself, because the light is thrown back.",
    "در برف سنگین نور بالا چشم خودتان را می‌زند، چون نور بازتابیده می‌شود."),
)

Q(6087, "6.2", picture("""
At the side of a road a person lies unconscious in the recovery position on the verge; a bystander kneels beside them with one hand
on their shoulder, holding a mobile phone to the ear with the other; in the background a car with hazard lights on and a warning
triangle on the road.
MUST BE CLEARLY VISIBLE: the person in the recovery position, the bystander with the phone.
MUST NOT APPEAR: blood, text."""),
  "Ved et uheld ligger en person bevidstløs i rabatten, men trækker vejret normalt. Stedet er sikret. Hvad gør du?",
  "At an accident a person is lying unconscious on the verge but breathing normally. The scene has been made safe. What do you do?",
  "در محل یک تصادف، فردی بیهوش در حاشیه‌ی جاده افتاده اما به‌طور عادی نفس می‌کشد. محل حادثه ایمن شده است. چه می‌کنید؟",
  S(True, "Jeg lægger personen i stabilt sideleje.", "I put the person in the recovery position.", "آن فرد را به وضعیت بهبود (به پهلو) می‌خوابانم.",
    "I sideleje holdes luftvejene frie, så personen ikke kvæles af fx opkast.",
    "In the recovery position the airway is kept clear, so that the person does not choke, for example on vomit.",
    "در این وضعیت راه تنفس باز می‌ماند تا فرد مثلاً با استفراغ خفه نشود."),
  S(True, "Jeg sørger for, at der bliver ringet 1-1-2.", "I make sure that 1-1-2 is called.", "مطمئن می‌شوم که با ۱۱۲ تماس گرفته شود.",
    "Personen skal hurtigst muligt have professionel hjælp.", "The person must get professional help as quickly as possible.",
    "آن فرد باید هرچه زودتر کمک تخصصی دریافت کند."),
  S(True, "Jeg holder øje med vejrtrækningen og holder personen varm, til hjælpen kommer.",
    "I watch the breathing and keep the person warm until help arrives.", "تا رسیدن کمک، تنفس او را زیر نظر دارم و گرمش نگه می‌دارم.",
    "Tilstanden kan ændre sig, og en tilskadekommen bliver let kold.", "The condition may change, and an injured person easily gets cold.",
    "وضعیت ممکن است تغییر کند و فرد آسیب‌دیده زود سرما می‌خورد."),
  S(False, "Jeg giver personen noget at drikke, så snart det er muligt.", "I give the person something to drink as soon as possible.",
    "هرچه زودتر به او چیزی برای نوشیدن می‌دهم.",
    "En bevidstløs kan ikke synke og kan få væsken ned i luftvejene.", "An unconscious person cannot swallow and may get the liquid into the airway.",
    "فرد بیهوش نمی‌تواند قورت بدهد و ممکن است مایع وارد راه تنفسش شود."),
)

Q(6088, "7.8", view("""
THE SCENE: a two-lane road; ahead a car carries three bicycles on a rack mounted on its rear, and the bicycles hide its tail lights,
brake lights and indicators.
MUST BE CLEARLY VISIBLE: the car ahead with the bicycle rack hiding its lights.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "Bilen foran dig har en cykelholder med cykler bagpå, som skjuler dens baglygter og blinklys. Hvordan forholder du dig?",
  "The car in front of you has a rack with bicycles on its rear, which hides its rear lights and indicators. What do you do?",
  "خودروی جلوی شما پشتش باربند دوچرخه با چند دوچرخه دارد که چراغ‌های عقب و راهنماهایش را پوشانده است. چه می‌کنید؟",
  S(True, "Jeg holder større afstand end ellers.", "I keep a greater distance than usual.", "فاصله‌ای بیشتر از معمول نگه می‌دارم.",
    "Du kan ikke se bremselysene og får mindre tid til at reagere, når bilen bremser.",
    "You cannot see the brake lights and get less time to react when the car brakes.",
    "چراغ‌های ترمز را نمی‌بینید و وقتی آن خودرو ترمز می‌کند، زمان کمتری برای واکنش دارید."),
  S(True, "Jeg er forberedt på, at bilen kan svinge eller standse uden et synligt tegn.",
    "I am prepared for the car to turn or stop without a visible signal.", "آماده‌ام که آن خودرو بدون علامت قابل دیدن بپیچد یا بایستد.",
    "Cyklerne skjuler blinklysene, så du ikke kan se, hvad føreren vil.",
    "The bicycles hide the indicators, so you cannot see what the driver intends.",
    "دوچرخه‌ها راهنماها را می‌پوشانند، پس نمی‌بینید راننده چه قصدی دارد."),
  S(False, "Jeg kører tæt op, så jeg bedre kan se, om bilen bremser.", "I drive up close so that I can better see whether the car brakes.",
    "نزدیک می‌روم تا بهتر ببینم آیا آن خودرو ترمز می‌کند یا نه.",
    "Tæt på kan du stadig ikke se lygterne, og du har endnu mindre tid til at reagere.",
    "Close up you still cannot see the lights, and you have even less time to react.",
    "از نزدیک هم چراغ‌ها را نمی‌بینید و زمان واکنشتان باز هم کمتر می‌شود."),
  S(False, "Når lygterne er skjult, er det føreren foran, der har skylden, hvis jeg kører op bag i bilen.",
    "When the lights are hidden, the driver in front is to blame if I run into the back of the car.",
    "وقتی چراغ‌ها پوشیده‌اند، اگر از پشت به آن خودرو بزنم تقصیر راننده‌ی جلویی است.",
    "Du skal altid holde så stor afstand, at du kan standse, hvis bilen foran bremser.",
    "You must always keep such a distance that you can stop if the car in front brakes.",
    "همیشه باید آن‌قدر فاصله داشته باشید که اگر خودروی جلویی ترمز کرد، بتوانید بایستید."),
)

Q(6089, "6.2", picture("""
A person stands safely behind a crash barrier at the side of a country road, calling on a mobile phone and looking at a small roadside
marker post to tell where they are; on the verge a car with its hazard lights on; further along, a car that has run into the ditch.
MUST BE CLEARLY VISIBLE: the person calling from behind the barrier, the marker post, the car in the ditch.
MUST NOT APPEAR: blood, readable text."""),
  "Du ringer 1-1-2 efter et uheld, hvor en person er kommet til skade. Hvad er vigtigt?",
  "You call 1-1-2 after an accident in which a person has been injured. What is important?",
  "پس از تصادفی که در آن فردی آسیب دیده، با ۱۱۲ تماس می‌گیرید. چه چیزی مهم است؟",
  S(True, "Jeg fortæller, hvor uheldet er sket, så præcist som muligt.", "I say where the accident happened as precisely as possible.",
    "تا جایی که ممکن است دقیق می‌گویم تصادف کجا رخ داده است.",
    "Hjælpen skal hurtigt kunne finde stedet, fx ud fra vejnavn, retning og afstand til en by eller frakørsel.",
    "The rescuers must find the place quickly, for example from the road name, the direction and the distance to a town or exit.",
    "امدادگران باید محل را سریع پیدا کنند، مثلاً از نام جاده، جهت و فاصله تا یک شهر یا خروجی."),
  S(True, "Jeg fortæller, hvor mange der er kommet til skade, og hvordan de har det.",
    "I say how many people are injured and how they are.", "می‌گویم چند نفر آسیب دیده‌اند و حالشان چطور است.",
    "Så kan alarmcentralen sende den rigtige hjælp.", "Then the emergency centre can send the right help.",
    "این‌طور مرکز اورژانس می‌تواند کمک مناسب بفرستد."),
  S(True, "Jeg lægger først på, når alarmcentralen siger det.", "I only hang up when the emergency centre tells me to.",
    "فقط وقتی مرکز اورژانس بگوید، تماس را قطع می‌کنم.",
    "Alarmcentralen kan have brug for flere oplysninger og kan vejlede dig i, hvad du skal gøre.",
    "The emergency centre may need more information and can guide you in what to do.",
    "مرکز اورژانس ممکن است اطلاعات بیشتری لازم داشته باشد و می‌تواند راهنمایی‌تان کند چه کنید."),
  S(False, "Jeg venter med at ringe, til jeg har talt med alle de involverede.", "I wait to call until I have talked to everyone involved.",
    "صبر می‌کنم تا با همه‌ی افراد درگیر صحبت کنم و بعد تماس می‌گیرم.",
    "Ring med det samme; hjælpen skal hurtigt i gang.", "Call straight away; help must get going quickly.",
    "فوراً تماس بگیرید؛ کمک باید سریع راه بیفتد."),
)

Q(6090, "1.2", picture("""
A car wheel just fitted after a puncture: a hand with a wheel wrench tightens the wheel bolts; small numbers 1 to 5 drawn beside the
five bolts show a criss-cross order of tightening.
MUST BE CLEARLY VISIBLE: the wrench on a wheel bolt, the criss-cross numbers beside the bolts.
MUST NOT APPEAR: brand names, other text."""),
  "Du har selv skiftet et hjul efter en punktering. Hvad gælder om hjulboltene?",
  "You have changed a wheel yourself after a puncture. What applies to the wheel bolts?",
  "پس از پنچری، خودتان یک چرخ را عوض کرده‌اید. درباره‌ی پیچ‌های چرخ چه قاعده‌ای برقرار است؟",
  S(True, "Jeg spænder boltene godt og efterspænder dem efter nogle kilometers kørsel.",
    "I tighten the bolts well and tighten them again after a few kilometres.",
    "پیچ‌ها را خوب سفت می‌کنم و پس از چند کیلومتر رانندگی دوباره سفتشان می‌کنم.",
    "Boltene kan sætte sig og blive løse lige efter et hjulskift.", "The bolts can settle and work loose just after a wheel change.",
    "پیچ‌ها ممکن است درست پس از تعویض چرخ جا بیفتند و شل شوند."),
  S(True, "Jeg spænder boltene over kors.", "I tighten the bolts in a criss-cross order.", "پیچ‌ها را به‌صورت ضربدری سفت می‌کنم.",
    "Så kommer hjulet til at sidde lige mod navet.", "Then the wheel sits evenly against the hub.", "این‌طور چرخ صاف روی توپی می‌نشیند."),
  S(False, "Når boltene er spændt én gang, behøver jeg ikke tjekke dem igen.", "Once the bolts have been tightened, I need not check them again.",
    "وقتی پیچ‌ها یک بار سفت شدند، لازم نیست دوباره بررسی‌شان کنم.",
    "Boltene kan løsne sig, og i værste fald kan hjulet falde af.", "The bolts may work loose, and at worst the wheel may come off.",
    "پیچ‌ها ممکن است شل شوند و در بدترین حالت چرخ جدا شود."),
  S(False, "Jeg spænder boltene så hårdt, jeg overhovedet kan, ved at hoppe på hjulnøglen.",
    "I tighten the bolts as hard as I possibly can by jumping on the wheel wrench.",
    "پیچ‌ها را با پریدن روی آچار چرخ تا جایی که ممکن است سفت می‌کنم.",
    "For hårdt spændte bolte kan tage skade; brug den kraft, bilens instruktionsbog angiver.",
    "Over-tightened bolts can be damaged; use the force the car's handbook states.",
    "پیچ‌هایی که بیش از حد سفت شوند ممکن است آسیب ببینند؛ از نیرویی استفاده کنید که دفترچه‌ی خودرو می‌گوید."),
)

Q(6091, "8.1", town("""
THE SCENE: a familiar suburban road on a weekday morning; ahead a new temporary yellow road-works sign and a row of cones have appeared
at the right edge, narrowing our lane; everything else looks as usual.
MUST BE CLEARLY VISIBLE: the new temporary road-works sign and the cones narrowing the lane.
MUST NOT APPEAR: text."""),
  "Du kører den samme vej til arbejde hver dag og kender den udenad. Hvad skal du være opmærksom på?",
  "You drive the same way to work every day and know it by heart. What should you be aware of?",
  "هر روز از همان مسیر سر کار می‌روید و آن را از بَر هستید. به چه چیزی باید توجه کنید؟",
  S(True, "Jeg kan komme til at køre uopmærksomt, fordi jeg kender vejen så godt.",
    "I may end up driving inattentively because I know the road so well.", "چون مسیر را خیلی خوب می‌شناسم، ممکن است بی‌دقت رانندگی کنم.",
    "Når vejen føles kendt, er det let at tænke på alt andet end trafikken.",
    "When the road feels familiar, it is easy to think about everything except the traffic.",
    "وقتی مسیر آشنا به نظر می‌رسد، به‌راحتی به هر چیزی جز ترافیک فکر می‌کنید."),
  S(True, "Jeg er forberedt på, at noget kan være anderledes end normalt, fx et nyt vejarbejde eller en ny tavle.",
    "I am prepared for something being different from usual, for example new road works or a new sign.",
    "آماده‌ام که چیزی با همیشه فرق کند، مثلاً کار جاده‌ای تازه یا تابلویی جدید.",
    "Forholdene kan ændre sig fra dag til dag.", "Conditions can change from day to day.", "شرایط ممکن است روزبه‌روز تغییر کند."),
  S(False, "Når jeg kender vejen, behøver jeg ikke se efter tavler.", "When I know the road, I need not look out for signs.",
    "وقتی مسیر را می‌شناسم، لازم نیست به تابلوها نگاه کنم.",
    "Tavler kan være ændret eller nye, og de gælder, også når du kender vejen.",
    "Signs may have been changed or be new, and they apply even when you know the road.",
    "تابلوها ممکن است تغییر کرده یا تازه باشند و حتی وقتی مسیر را می‌شناسید معتبرند."),
  S(False, "Jeg kan godt køre lidt hurtigere end tilladt, fordi jeg kender svingene.",
    "I can drive a little faster than allowed, because I know the bends.", "می‌توانم کمی تندتر از حد مجاز برانم، چون پیچ‌ها را می‌شناسم.",
    "Hastighedsgrænsen gælder altid, og noget uventet kan dukke op.", "The speed limit always applies, and something unexpected may turn up.",
    "حد مجاز سرعت همیشه برقرار است و ممکن است چیزی غیرمنتظره پیش بیاید."),
)

Q(6092, "4.4", picture("""
A kitchen table: a pharmacy bag and a medicine container with a plain label (no readable text), a doctor's prescription note with a
green cross symbol, and a set of car keys beside them.
MUST BE CLEARLY VISIBLE: the medicine container, the prescription note with the green cross, the car keys.
MUST NOT APPEAR: readable text, brand names, cannabis leaves."""),
  "Din læge har ordineret dig medicinsk cannabis. Du vil køre bil. Hvad gælder?",
  "Your doctor has prescribed you medical cannabis. You want to drive. What applies?",
  "پزشکتان برای شما کانابیس دارویی تجویز کرده است. می‌خواهید رانندگی کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må kun køre, hvis jeg tager medicinen præcis som ordineret og kan køre helt sikkert.",
    "I may only drive if I take the medicine exactly as prescribed and can drive fully safely.",
    "فقط وقتی می‌توانم رانندگی کنم که دارو را دقیقاً طبق تجویز مصرف کنم و بتوانم کاملاً ایمن برانم.",
    "THC taget efter en lovlig recept er ikke forbudt i sig selv, men du må ikke køre, hvis du ikke kan føre bilen fuldt betryggende.",
    "THC taken on a lawful prescription is not forbidden in itself, but you must not drive if you cannot drive the car fully safely.",
    "THC که طبق نسخه‌ی قانونی مصرف شود به‌خودی‌خود ممنوع نیست، اما اگر نتوانید کاملاً ایمن رانندگی کنید، نباید برانید."),
  S(True, "Jeg spørger min læge, om og hvornår jeg kan køre, mens jeg tager medicinen.",
    "I ask my doctor whether and when I can drive while I am taking the medicine.",
    "از پزشکم می‌پرسم که در دوران مصرف دارو آیا و چه زمانی می‌توانم رانندگی کنم.",
    "Lægen kan vurdere, hvordan medicinen påvirker dig.", "The doctor can judge how the medicine affects you.",
    "پزشک می‌تواند ارزیابی کند دارو چه اثری روی شما دارد."),
  S(False, "Med recept må jeg tage mere end ordineret og stadig køre.", "With a prescription I may take more than prescribed and still drive.",
    "با نسخه می‌توانم بیش از مقدار تجویزشده مصرف کنم و باز هم رانندگی کنم.",
    "Tager du medicinen anderledes end ordineret, er det forbudt at køre med THC i blodet.",
    "If you take the medicine other than as prescribed, it is forbidden to drive with THC in your blood.",
    "اگر دارو را خلاف تجویز مصرف کنید، رانندگی با THC در خون ممنوع است."),
  S(False, "Recepten betyder, at jeg altid må køre, uanset hvordan jeg har det.",
    "The prescription means that I may always drive, however I feel.", "نسخه یعنی همیشه می‌توانم رانندگی کنم، هر حالی که داشته باشم.",
    "Du må aldrig køre, hvis medicin gør, at du ikke kan køre helt sikkert.",
    "You must never drive if medicine means that you cannot drive fully safely.",
    "اگر دارو باعث شود نتوانید کاملاً ایمن برانید، هرگز نباید رانندگی کنید."),
)

Q(6093, "1.2", picture("""
A car stopped at the side of a road with its hazard lights on; grey smoke rises from under its closed bonnet; the driver and a
passenger stand well away from the car behind the crash barrier, one of them calling on a phone.
MUST BE CLEARLY VISIBLE: the smoke from under the closed bonnet, the people standing well away from the car.
MUST NOT APPEAR: flames bursting out, text, readable number plates."""),
  "Mens du kører, kommer der røg og en brandlugt fra motorrummet. Hvad gør du?",
  "While you are driving, smoke and a smell of burning come from the engine compartment. What do you do?",
  "در حال رانندگی، از محفظه‌ی موتور دود و بوی سوختگی بلند می‌شود. چه می‌کنید؟",
  S(True, "Jeg holder ind et sikkert sted og slukker motoren.", "I pull in at a safe place and switch off the engine.",
    "در جای امنی می‌ایستم و موتور را خاموش می‌کنم.",
    "Så er bilen ude af trafikken, og en slukket motor kan ikke give branden mere brændstof.",
    "Then the car is out of the traffic, and an engine that is switched off cannot feed the fire with more fuel.",
    "این‌طور خودرو از جریان ترافیک بیرون است و موتورِ خاموش دیگر سوختی به آتش نمی‌رساند."),
  S(True, "Alle stiger ud og går et godt stykke væk fra bilen.", "Everyone gets out and moves well away from the car.",
    "همه پیاده می‌شوند و به فاصله‌ی زیادی از خودرو می‌روند.",
    "En brand i en bil kan udvikle sig meget hurtigt.", "A fire in a car can spread very quickly.", "آتش‌سوزی در خودرو ممکن است خیلی سریع گسترش یابد."),
  S(True, "Jeg ringer 1-1-2.", "I call 1-1-2.", "با ۱۱۲ تماس می‌گیرم.",
    "Brandvæsenet skal hurtigt frem, og andre trafikanter kan være i fare.",
    "The fire brigade must get there fast, and other road users may be in danger.",
    "آتش‌نشانی باید سریع برسد و ممکن است دیگران هم در خطر باشند."),
  S(False, "Jeg åbner motorhjelmen helt for at se, hvor det brænder.", "I open the bonnet fully to see where it is burning.",
    "درِ موتور را کامل باز می‌کنم تا ببینم کجا آتش گرفته.",
    "Når motorhjelmen åbnes helt, får ilden mere luft og kan blusse op.",
    "When the bonnet is opened fully, the fire gets more air and may flare up.",
    "وقتی درِ موتور کامل باز شود، آتش هوای بیشتری می‌گیرد و ممکن است شعله‌ور شود."),
)

Q(6094, "10.3", picture("""
Two friends beside a parked car: one holds out the car keys to the other; on the windscreen a note shows a shield symbol crossed out
in red (meaning no insurance).
MUST BE CLEARLY VISIBLE: the keys being handed over, the note with the crossed-out shield on the windscreen.
MUST NOT APPEAR: readable text, readable number plates."""),
  "Din ven vil låne dig sin bil. Han fortæller, at han har opsagt bilens ansvarsforsikring. Hvad gælder?",
  "Your friend wants to lend you his car. He tells you that he has cancelled the car's liability insurance. What applies?",
  "دوستتان می‌خواهد خودرویش را به شما قرض بدهد. می‌گوید بیمه‌ی مسئولیت خودرو را لغو کرده است. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen må ikke køre på vejen uden ansvarsforsikring.", "The car must not be driven on the road without liability insurance.",
    "بدون بیمه‌ی مسئولیت نباید با این خودرو در جاده رانندگی کرد.",
    "Et motorkøretøj skal være dækket af en lovpligtig ansvarsforsikring for de skader, det kan forvolde.",
    "A motor vehicle must be covered by compulsory liability insurance for the damage it may cause.",
    "وسیله‌ی نقلیه‌ی موتوری باید برای خسارت‌هایی که ممکن است وارد کند، بیمه‌ی مسئولیت اجباری داشته باشد."),
  S(False, "Det er i orden, når jeg kører forsigtigt.", "It is all right as long as I drive carefully.",
    "اگر با احتیاط برانم اشکالی ندارد.",
    "Forsikringen skal være der, uanset hvordan du kører.", "The insurance must be in place however you drive.",
    "بیمه باید وجود داشته باشد، هر طور که رانندگی کنید."),
  S(False, "Det er kun et problem, hvis der sker et uheld.", "It is only a problem if there is an accident.", "فقط اگر تصادفی رخ دهد مشکل است.",
    "Det er forbudt at køre bilen uden forsikring, også selv om der ikke sker noget.",
    "It is forbidden to drive the car without insurance, even if nothing happens.",
    "رانندگی با خودروی بدون بیمه ممنوع است، حتی اگر اتفاقی نیفتد."),
)

Q(6095, "5.2", view("""
THE SCENE: a dark country road in pouring rain; the road markings are almost invisible; the headlights of an oncoming car reflect in
long streaks on the wet road; roadside posts with reflectors stand along both edges.
MUST BE CLEARLY VISIBLE: the pouring rain, the almost invisible markings, the reflections on the wet road, the roadside posts.
MUST NOT APPEAR: street lights, signs, text.""", cond="night, dark, pouring rain, wet road, no street lights"),
  "Det styrtregner om natten. Striberne på vejen kan næsten ikke ses, og lyset fra de modkørende spejler sig i den våde vej. Hvordan "
  "forholder du dig?",
  "It is pouring with rain at night. The road markings can hardly be seen, and the lights of oncoming cars are reflected in the wet "
  "road. What do you do?",
  "شب است و باران شدیدی می‌بارد. خط‌های جاده تقریباً دیده نمی‌شوند و نور خودروهای روبه‌رو روی جاده‌ی خیس بازتاب دارد. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned, så jeg kan standse på den strækning, jeg kan se.",
    "I slow down so that I can stop within the distance I can see.", "سرعتم را کم می‌کنم تا در مسافتی که می‌بینم بتوانم بایستم.",
    "I mørke og kraftig regn kan du se meget kortere end normalt.", "In darkness and heavy rain you can see much less far than normal.",
    "در تاریکی و باران شدید، تا فاصله‌ی بسیار کمتری از معمول می‌بینید."),
  S(True, "Jeg holder længere afstand til den forankørende end på en tør vej.", "I keep a longer distance to the vehicle in front than on a dry road.",
    "فاصله‌ام را با خودروی جلویی بیشتر از جاده‌ی خشک نگه می‌دارم.",
    "På våd vej er bremselængden længere, og vandsprøjt gør det sværere at se.",
    "On a wet road the braking distance is longer, and spray makes it harder to see.",
    "روی جاده‌ی خیس مسافت ترمز طولانی‌تر است و آب پاشیده‌شده دید را سخت‌تر می‌کند."),
  S(True, "Jeg bruger kantpælene til at se, hvor vejen går.", "I use the roadside posts to see where the road goes.",
    "از تیرک‌های کنار جاده کمک می‌گیرم تا ببینم جاده کجا می‌رود.",
    "Reflekserne på kantpælene viser vejens forløb, når striberne er svære at se.",
    "The reflectors on the roadside posts show the line of the road when the markings are hard to see.",
    "شبرنگ‌های تیرک‌ها مسیر جاده را نشان می‌دهند وقتی دیدن خط‌ها سخت است."),
  S(False, "Jeg tænder fjernlyset, også når der kommer biler imod mig.", "I switch on main beam, even when cars are coming towards me.",
    "نور بالا را روشن می‌کنم، حتی وقتی خودروها از روبه‌رو می‌آیند.",
    "Fjernlyset blænder de modkørende og må ikke bruges ved møde.", "Main beam dazzles oncoming drivers and must not be used when meeting.",
    "نور بالا چشم روبه‌رویی‌ها را می‌زند و هنگام عبور از کنار هم نباید استفاده شود."),
)

Q(6096, "4.4", picture("""
The exit of a hospital day-surgery unit: a patient with a small bandage on one hand sits in a wheelchair by the door, while a friend
holds open the passenger door of a car; a nurse waves goodbye.
MUST BE CLEARLY VISIBLE: the patient being collected, the friend holding the passenger door open.
MUST NOT APPEAR: text, logos, blood."""),
  "Du har været til en mindre operation i fuld bedøvelse i formiddags. Nu føler du dig frisk og vil køre hjem. Hvad gælder?",
  "You had a minor operation under general anaesthetic this morning. Now you feel fresh and want to drive home. What applies?",
  "امروز صبح تحت بیهوشی کامل عمل جراحی کوچکی داشته‌اید. اکنون احساس سرحالی می‌کنید و می‌خواهید با خودرو به خانه بروید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg kører ikke selv samme dag.", "I do not drive myself the same day.", "همان روز خودم رانندگی نمی‌کنم.",
    "Bedøvelsen kan påvirke din reaktionsevne i mange timer, også når du føler dig frisk.",
    "The anaesthetic can affect your ability to react for many hours, even when you feel fresh.",
    "بیهوشی ممکن است تا ساعت‌ها توانایی واکنش شما را کم کند، حتی وقتی احساس سرحالی می‌کنید."),
  S(True, "Jeg aftaler, at en anden henter mig.", "I arrange for someone else to collect me.", "ترتیبی می‌دهم که کس دیگری دنبالم بیاید.",
    "Så kommer du sikkert hjem uden selv at køre.", "Then you get home safely without driving yourself.",
    "این‌طور بی‌آن‌که خودتان برانید، به‌سلامت به خانه می‌رسید."),
  S(True, "Jeg spørger lægen, hvornår jeg igen må køre.", "I ask the doctor when I may drive again.",
    "از پزشک می‌پرسم کی دوباره می‌توانم رانندگی کنم.",
    "Lægen ved, hvilken bedøvelse og medicin du har fået.", "The doctor knows which anaesthetic and medicine you have had.",
    "پزشک می‌داند چه بیهوشی و دارویی گرفته‌اید."),
  S(True, "Smertestillende medicin efter operationen kan også påvirke min kørsel.",
    "Painkillers after the operation may also affect my driving.", "داروهای مسکنِ پس از عمل هم ممکن است روی رانندگی‌ام اثر بگذارند.",
    "Mange smertestillende midler gør dig sløv eller langsom til at reagere.",
    "Many painkillers make you drowsy or slow to react.", "بسیاری از مسکن‌ها شما را خواب‌آلود یا کندواکنش می‌کنند."),
)

Q(6097, "1.2", picture("""
A car seen from the side just after it has driven over a speed bump: its body is still bouncing up and down (shown with motion lines)
although the wheels are already past the bump.
MUST BE CLEARLY VISIBLE: the bump behind the car, the car body still bouncing.
MUST NOT APPEAR: text, readable number plates."""),
  "Efter et bump gynger bilen længe op og ned, og den føles usikker i sving. Hvad kan det skyldes?",
  "After a bump the car keeps bouncing up and down for a long time, and it feels unsteady in bends. What may be the cause?",
  "پس از گذشتن از یک سرعت‌گیر، خودرو مدت زیادی بالا و پایین می‌رود و در پیچ‌ها ناپایدار به نظر می‌رسد. دلیلش چه می‌تواند باشد؟",
  S(True, "Støddæmperne kan være slidte, så jeg får bilen undersøgt.", "The shock absorbers may be worn, so I have the car checked.",
    "ممکن است کمک‌فنرها فرسوده باشند، پس خودرو را بررسی می‌کنم.",
    "Slidte støddæmpere giver dårligere vejgreb og kan give længere bremselængde.",
    "Worn shock absorbers give poorer road holding and may give a longer braking distance.",
    "کمک‌فنرهای فرسوده چسبندگی به جاده را کم می‌کنند و ممکن است مسافت ترمز را بیشتر کنند."),
  S(False, "Det er normalt for alle biler og har ingen betydning.", "That is normal for all cars and does not matter.",
    "این برای همه‌ی خودروها عادی است و اهمیتی ندارد.",
    "En bil med gode støddæmpere falder hurtigt til ro efter et bump.", "A car with good shock absorbers settles quickly after a bump.",
    "خودرویی با کمک‌فنرهای سالم پس از سرعت‌گیر زود آرام می‌گیرد."),
  S(False, "Det skyldes for lidt luft i dækkene, så jeg pumper dem hårdt op.", "It is caused by too little air in the tyres, so I pump them up hard.",
    "دلیلش باد کم لاستیک‌هاست، پس آن‌ها را پرباد می‌کنم.",
    "Det løser ikke problemet; gyngerne skyldes typisk støddæmperne.", "That does not solve the problem; the bouncing is typically due to the shock absorbers.",
    "این کار مشکل را حل نمی‌کند؛ این بالا و پایین رفتن معمولاً از کمک‌فنرهاست."),
  S(False, "Slidte støddæmpere har kun betydning for komforten.", "Worn shock absorbers only affect comfort.",
    "کمک‌فنرهای فرسوده فقط روی راحتی اثر دارند.",
    "De har også betydning for, om hjulene holder kontakt med vejen.", "They also affect whether the wheels keep contact with the road.",
    "آن‌ها روی تماس چرخ‌ها با جاده هم اثر دارند."),
)

Q(6098, "8.1", picture("""
A road map spread on a table with a long route drawn across it and several small coffee-cup symbols marking planned breaks along the
route; a set of car keys and a water bottle lie beside the map.
MUST BE CLEARLY VISIBLE: the long route on the map, the coffee-cup symbols for breaks.
MUST NOT APPEAR: readable place names or other text."""),
  "Du skal køre 600 km på én dag. Hvordan forbereder du dig?",
  "You are going to drive 600 km in one day. How do you prepare?",
  "قرار است در یک روز ۶۰۰ کیلومتر رانندگی کنید. چطور آماده می‌شوید؟",
  S(True, "Jeg planlægger pauser undervejs, fx hver anden time.", "I plan breaks along the way, for example every two hours.",
    "در طول مسیر استراحت‌هایی برنامه‌ریزی می‌کنم، مثلاً هر دو ساعت یک بار.",
    "Regelmæssige pauser modvirker træthed og nedsat opmærksomhed.", "Regular breaks counteract tiredness and reduced attention.",
    "استراحت‌های منظم با خستگی و کاهش توجه مقابله می‌کنند."),
  S(True, "Jeg sørger for at have sovet godt, før jeg kører.", "I make sure I have slept well before I set off.",
    "مطمئن می‌شوم پیش از حرکت خوب خوابیده‌ام.",
    "Mangel på søvn gør dig langsommere til at reagere.", "Lack of sleep makes you slower to react.", "کم‌خوابی واکنش شما را کندتر می‌کند."),
  S(True, "Jeg undgår et stort, tungt måltid lige før og under turen.", "I avoid a big, heavy meal just before and during the trip.",
    "پیش از سفر و در طول آن از غذای سنگین و زیاد پرهیز می‌کنم.",
    "Et tungt måltid kan gøre dig døsig.", "A heavy meal can make you drowsy.", "غذای سنگین ممکن است خواب‌آلودتان کند."),
  S(False, "Jeg kører hele vejen uden pause, så jeg hurtigere er fremme.", "I drive all the way without a break so that I arrive sooner.",
    "تمام راه را بدون استراحت می‌رانم تا زودتر برسم.",
    "Uden pauser bliver du træt, og risikoen for et uheld stiger.", "Without breaks you get tired, and the risk of an accident rises.",
    "بدون استراحت خسته می‌شوید و خطر تصادف بیشتر می‌شود."),
)

Q(6099, "1.2", picture("""
The interior of a car with an automatic gearbox: a gear selector marked P, R, N and D; only two pedals in the footwell, a wide brake
pedal and an accelerator; the driver's right foot rests on the brake pedal.
MUST BE CLEARLY VISIBLE: the gear selector with P, R, N and D, the two pedals, the right foot on the brake.
MUST NOT APPEAR: brand logos, other text."""),
  "Du skal for første gang køre en bil med automatgear. Hvad gælder?",
  "You are going to drive a car with an automatic gearbox for the first time. What applies?",
  "قرار است برای اولین بار با خودرویی با گیربکس اتوماتیک رانندگی کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg bruger kun højre fod til både speeder og bremse.", "I use only my right foot for both the accelerator and the brake.",
    "برای پدال گاز و ترمز فقط از پای راستم استفاده می‌کنم.",
    "Med venstre fod på bremsen kan du komme til at træde på begge pedaler på én gang.",
    "With your left foot on the brake you may press both pedals at once.", "اگر پای چپ را روی ترمز بگذارید، ممکن است هم‌زمان هر دو پدال را فشار دهید."),
  S(True, "Jeg holder bremsen nede, når jeg sætter gearvælgeren i D eller R.",
    "I keep the brake pressed when I move the gear selector to D or R.", "وقتی دسته‌دنده را در D یا R می‌گذارم، پایم را روی ترمز نگه می‌دارم.",
    "Bilen begynder at rulle, så snart den er i gear.", "The car starts to roll as soon as it is in gear.",
    "خودرو به محض این‌که در دنده باشد، شروع به حرکت می‌کند."),
  S(False, "Bilen holder stille af sig selv i D, så jeg kan slippe bremsen ved rødt lys.",
    "The car stays still by itself in D, so I can release the brake at a red light.",
    "خودرو در حالت D خودبه‌خود ثابت می‌ماند، پس پشت چراغ قرمز می‌توانم ترمز را رها کنم.",
    "I D kryber bilen fremad, når du slipper bremsen.", "In D the car creeps forward when you release the brake.",
    "در حالت D وقتی ترمز را رها کنید، خودرو آرام به جلو می‌خزد."),
)

Q(6100, "1.2", picture("""
A close view of a car's front wheel through the spokes of the rim: the brake disc shows deep grooves, and the brake pad is worn down to
its metal backing; small sound lines suggest a scraping noise.
MUST BE CLEARLY VISIBLE: the grooved brake disc, the worn-down brake pad.
MUST NOT APPEAR: brand names, text."""),
  "Når du bremser, hører du en skrabende lyd fra et af forhjulene. Hvad gælder?",
  "When you brake, you hear a scraping noise from one of the front wheels. What applies?",
  "هنگام ترمز، از یکی از چرخ‌های جلو صدای ساییدگی می‌شنوید. چه قاعده‌ای برقرار است؟",
  S(True, "Bremseklodserne kan være slidt helt ned, så jeg får bremserne undersøgt med det samme.",
    "The brake pads may be worn right down, so I have the brakes checked at once.",
    "ممکن است لنت‌های ترمز کاملاً ساییده شده باشند، پس فوراً ترمزها را بررسی می‌کنم.",
    "Slidte klodser bremser dårligere og kan ødelægge bremseskiverne.", "Worn pads brake less well and can ruin the brake discs.",
    "لنت‌های ساییده ترمز ضعیف‌تری می‌گیرند و ممکن است دیسک‌های ترمز را خراب کنند."),
  S(False, "Lyden er normal på ældre biler og har ingen betydning.", "The noise is normal on older cars and does not matter.",
    "این صدا در خودروهای قدیمی عادی است و اهمیتی ندارد.",
    "En skrabende lyd tyder på en fejl, som kan gøre bremserne dårligere.", "A scraping noise points to a fault that can make the brakes worse.",
    "صدای ساییدگی نشانه‌ی ایرادی است که ممکن است ترمز را ضعیف‌تر کند."),
  S(False, "Jeg kan køre videre som normalt, så længe bilen stadig bremser.", "I can carry on as normal as long as the car still brakes.",
    "تا وقتی خودرو هنوز ترمز می‌گیرد، می‌توانم مثل همیشه ادامه دهم.",
    "Bremserne kan pludselig blive meget dårligere.", "The brakes may suddenly become much worse.", "ترمزها ممکن است ناگهان خیلی ضعیف‌تر شوند."),
  S(False, "Lyden forsvinder, hvis jeg bremser hårdere.", "The noise disappears if I brake harder.", "اگر محکم‌تر ترمز کنم، صدا از بین می‌رود.",
    "Hårdere bremsning slider endnu mere på klodser og skiver.", "Harder braking wears the pads and discs even more.",
    "ترمز محکم‌تر لنت‌ها و دیسک‌ها را بیشتر می‌ساید."),
)
