# «آزمون جدید», batch 11 (6001–6100), part b: stopping and parking (7.18), speed (7.3), road users beside the road (7.6), signs and
# markings (6.1), drugs and allergy (4.4), the car (1.2), straight on at junctions (7.12), overtaking (7.9), road conditions (5.2), motorways
# (7.16), general rules (6.2), large vehicles (3.2), safety equipment (8.1), roundabouts (7.15), the licence (10.3),
# placement (7.2) and moving off (7.1).
# Rules: Færdselsloven §§ 9 stk. 3 (after an accident with serious injury nothing may be changed and no traces removed; a vehicle that
# is a danger must be moved), 10, 13 (a wheelchair user at walking pace counts as a pedestrian), 15 stk. 4 (keep to the right of
# traffic islands and beacons), 18 stk. 5 (use a turning lane for its own direction), 21 stk. 3–4, 26 stk. 3 (a cyclist who turns from a cycle path out onto
# the carriageway must give way to all), 26 stk. 4–5 (give way to the right, and show it clearly), 27 stk. 1, 29 stk. 1 nr. 1–2 (5 m
# before a pedestrian crossing, 10 m from the crossing carriageway), 42 stk. 2 and 43 stk. 2–4 (130 km/h on a motorway for cars of
# at most 3,500 kg; 80 km/h for heavier ones and with a trailer), 46 stk. 2 (no reversing or turning round on a motorway's slip
# roads), 54 stk. 1 nr. 2 (THC in the blood over 0,001 mg/kg), 56 stk. 1, 62 and 63 (a car licence also covers tractors and small
# mopeds); BEK 425/2023: § 48 N 43 (an edge-nose plate may be passed on both sides), § 52 P 11 (traffic-island beacons are yellow
# columns), § 59 UC 60,5 (no stopping on the verge), § 61 V 42 with V 46 (a bus lane that zero-emission cars may use; zero-emission
# cars are cars on electricity or hydrogen).
# Guidance (not law): a bend that tightens needs a speed that copes with it; THC stays in the blood long after the high; a vibrating
# steering wheel at speed often means unbalanced wheels; a dog on a lead beside a bicycle widens the cyclist; dust on a gravel road
# hides the car in front and oncoming traffic; a lorry driver may not see a car close in front of the cab; many cars warn of tiredness
# with a coffee-cup symbol; with a stuck accelerator, declutch or select neutral and brake; children on their way to the beach do
# not look out for cars; spinning wheels on ice need less throttle; a sneeze at speed means metres driven blind, and some allergy
# medicines cause drowsiness.
from nq import Q, S, above, picture, town, view

Q(6026, "7.18", above("""
THE SCENE: a street in town seen from above, one lane in each direction, a broken centre line, pavements on both sides. At the top of
the picture a zebra crossing lies across the street; at the bottom a side road joins from the RIGHT.
VEHICLES (colour code used strictly): a RED car (ours) parked parallel at the right kerb between the two; a thin black dimension line
from the car's front to the zebra crossing is labelled «7 m», and one from the car's rear back to the corner of the side road is
labelled «12 m». No other cars at this kerb.
MUST NOT APPEAR: signs, yellow kerb lines, text other than the two labels."""),
  "Du vil parkere ved kantstenen. Der er 7 m frem til et fodgængerfelt og 12 m tilbage til hjørnet af en sidevej. Der er ingen tavler "
  "eller gule striber. Hvad gælder?",
  "You want to park at the kerb. It is 7 m ahead to a pedestrian crossing and 12 m back to the corner of a side road. There are no "
  "signs or yellow lines. What applies?",
  "می‌خواهید کنار جدول پارک کنید. تا خط عابر پیاده‌ی جلو ۷ متر و تا گوشه‌ی یک خیابان فرعیِ پشت سر ۱۲ متر فاصله است. هیچ تابلو یا خط زردی "
  "نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må parkere her.", "I may park here.", "اینجا می‌توانم پارک کنم.",
    "Når afstandene til fodgængerfeltet og krydset er overholdt, og intet andet forbyder det, er parkering tilladt.",
    "When the distances to the crossing and the junction are kept and nothing else forbids it, parking is allowed.",
    "وقتی فاصله‌ها تا خط عابر و تقاطع رعایت شده و چیز دیگری منعش نکند، پارک مجاز است."),
  S(True, "Der er langt nok til fodgængerfeltet.", "It is far enough from the pedestrian crossing.", "فاصله تا خط عابر پیاده کافی است.",
    "Der må ikke standses eller parkeres nærmere end 5 m foran et fodgængerfelt.",
    "You must not stop or park closer than 5 m before a pedestrian crossing.",
    "نباید نزدیک‌تر از ۵ متر پیش از خط عابر پیاده توقف یا پارک کرد."),
  S(True, "Der er langt nok til sidevejen.", "It is far enough from the side road.", "فاصله تا خیابان فرعی کافی است.",
    "Ved et vejkryds gælder forbuddet inden for 10 m fra den tværgående kørebanes kant.",
    "At a junction the ban applies within 10 m of the edge of the crossing carriageway.",
    "در تقاطع، ممنوعیت تا ۱۰ متری لبه‌ی سواره‌روی عرضی است."),
  S(False, "Jeg skal holde mindst 30 m fra et fodgængerfelt.", "I must keep at least 30 m from a pedestrian crossing.",
    "باید دست‌کم ۳۰ متر از خط عابر پیاده فاصله داشته باشم.",
    "30 m gælder for parkering ved en jernbaneoverkørsel; ved et fodgængerfelt er det 5 m.",
    "30 m applies to parking near a level crossing; at a pedestrian crossing it is 5 m.",
    "۳۰ متر مربوط به پارک کنار گذرگاه راه‌آهن است؛ برای خط عابر پیاده ۵ متر است."),
)

Q(6027, "7.3", view("""
THE SCENE: a two-lane country road that bends to the right; the bend grows tighter and tighter and disappears behind a row of trees,
so that its end cannot be seen; a broken centre line; no other traffic in sight.
MUST BE CLEARLY VISIBLE: the bend getting sharper, the trees hiding the end of the bend.
MUST NOT APPEAR: signs, text."""),
  "Du kører ind i et sving på en landevej. Du kan ikke se, hvor svinget ender, og det ser ud til at blive skarpere og skarpere. "
  "Hvordan forholder du dig?",
  "You are driving into a bend on a country road. You cannot see where the bend ends, and it seems to get sharper and sharper. What do "
  "you do?",
  "وارد پیچی در جاده‌ای بیرون شهر می‌شوید. نمی‌بینید پیچ کجا تمام می‌شود و به نظر می‌رسد تندتر و تندتر می‌شود. چه می‌کنید؟",
  S(True, "Jeg holder så lav en fart, at jeg kan klare, at svinget bliver endnu skarpere.",
    "I keep my speed so low that I can cope if the bend gets even sharper.",
    "سرعتم را آن‌قدر پایین نگه می‌دارم که اگر پیچ از این هم تندتر شد، از پسش بربیایم.",
    "Et sving, der strammer til, er farligt, hvis du først opdager det med for høj fart.",
    "A bend that tightens is dangerous if you only discover it at too high a speed.",
    "پیچی که تندتر می‌شود، اگر با سرعت زیاد متوجهش شوید خطرناک است."),
  S(False, "Jeg holder farten, til jeg kan se hele svinget, og bremser så hårdt.",
    "I keep my speed until I can see the whole bend and then brake hard.",
    "سرعتم را حفظ می‌کنم تا کل پیچ را ببینم و بعد محکم ترمز می‌کنم.",
    "Hård opbremsning midt i et skarpt sving kan få bilen til at skride ud.",
    "Hard braking in the middle of a sharp bend can make the car skid.", "ترمز شدید وسط یک پیچ تند ممکن است خودرو را به سُر خوردن بیندازد."),
  S(False, "Jeg skærer svinget, så det bliver mindre skarpt.", "I cut the corner so that the bend becomes less sharp.",
    "پیچ را میان‌بر می‌زنم تا کمتر تند باشد.",
    "Så kommer du over i den modkørende vognbane, hvor du ikke kan se, hvad der kommer.",
    "Then you move into the oncoming lane, where you cannot see what is coming.",
    "در این صورت وارد خط مقابل می‌شوید، جایی که نمی‌بینید چه چیزی می‌آید."),
)

Q(6028, "7.6", town("""
THE SCENE: a town street; on the right a pavement with a section of lowered kerb; a person in a manual wheelchair has just rolled down
from the pavement onto the carriageway a short distance ahead of us and starts to cross the street; a zebra crossing can be seen some
40 m further ahead.
MUST BE CLEARLY VISIBLE: the person in the wheelchair starting to cross, the lowered kerb, the zebra crossing further ahead.
MUST NOT APPEAR: signs, text."""),
  "En person i kørestol kører ned fra fortovet ved en lav kantsten et stykke fra et fodgængerfelt og begynder at krydse vejen. Hvordan "
  "forholder du dig?",
  "A person in a wheelchair rolls down from the pavement at a low kerb some way from a pedestrian crossing and starts to cross the "
  "road. What do you do?",
  "فردی با ویلچر در جایی که جدول کوتاه است، کمی دورتر از خط عابر پیاده از پیاده‌رو پایین می‌آید و شروع به عبور از خیابان می‌کند. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og lader personen komme over.", "I slow down and let the person get across.",
    "سرعتم را کم می‌کنم و اجازه می‌دهم آن فرد رد شود.",
    "En person, der selv kører sin kørestol i ganghastighed, regnes som gående, og gående skal have tid og plads.",
    "A person who moves their own wheelchair at walking pace counts as a pedestrian, and pedestrians must be given time and room.",
    "کسی که خودش ویلچرش را با سرعت پیاده می‌راند، عابر پیاده به شمار می‌آید و باید به عابر وقت و جا داد."),
  S(True, "Jeg er forberedt på, at det kan tage tid, og at personen kan blive nødt til at standse undervejs.",
    "I am prepared for it to take time and for the person to have to stop on the way.",
    "آماده‌ام که این کار طول بکشد و آن فرد مجبور شود در میانه‌ی راه توقف کند.",
    "En kørestol kører langsomt, og huller eller en kantsten kan bremse den.",
    "A wheelchair moves slowly, and holes or a kerb can slow it down.", "ویلچر آهسته حرکت می‌کند و چاله یا جدول ممکن است کندترش کند."),
  S(False, "Personen skal bruge fodgængerfeltet, så jeg kører videre.", "The person must use the pedestrian crossing, so I drive on.",
    "آن فرد باید از خط عابر پیاده استفاده کند، پس به راهم ادامه می‌دهم.",
    "Gående må godt krydse uden for fodgængerfeltet, og du skal under alle omstændigheder undgå at køre ind i nogen.",
    "Pedestrians may cross away from the crossing, and in any case you must avoid running into anyone.",
    "عابران می‌توانند بیرون از خط عابر هم عبور کنند و در هر حال باید از برخورد با کسی پرهیز کنید."),
  S(False, "Jeg kører forbi tæt foran kørestolen, så personen ikke behøver at vente længe.",
    "I pass close in front of the wheelchair so that the person does not have to wait long.",
    "از نزدیکِ جلوی ویلچر رد می‌شوم تا آن فرد مجبور نباشد زیاد منتظر بماند.",
    "Så kan personen blive forskrækket, og du har ingen sikkerhedsmargen, hvis kørestolen ruller frem.",
    "Then the person may be startled, and you have no safety margin if the wheelchair rolls forward.",
    "در این صورت ممکن است آن فرد بترسد و اگر ویلچر جلو بیاید، هیچ حاشیه‌ی ایمنی ندارید."),
)

Q(6029, "6.1", view("""
THE SCENE: a road where an exit road branches off to the right; at the tip of the grass verge between the main road and the exit
stands a white rectangular plate with red stripes that form an upside-down V, sloping down to BOTH sides from the middle of its top;
both roads continue beyond the plate.
MUST BE CLEARLY VISIBLE: the plate at the tip of the verge with stripes sloping down to both sides, the two roads on either side.
MUST NOT APPEAR: other signs, text."""),
  "Hvor en frakørsel deler sig fra vejen, står der på spidsen af rabatten en plade med røde og hvide striber, som hælder ned til begge "
  "sider. Hvad betyder pladen?",
  "Where an exit road branches off, a plate with red and white stripes sloping down to both sides stands at the tip of the verge. What "
  "does the plate mean?",
  "جایی که یک خروجی از جاده جدا می‌شود، روی نوک حاشیه‌ی بین دو راه صفحه‌ای با نوارهای قرمز و سفید هست که به هر دو طرف پایین می‌روند. "
  "این صفحه چه معنایی دارد؟",
  S(True, "Jeg må køre forbi pladen på begge sider.", "I may pass the plate on either side.", "می‌توانم از هر دو طرف این صفحه رد شوم.",
    "Pladen markerer en rabatspids, og motorkøretøjer kan passere den på begge sider.",
    "The plate marks the tip of a verge, and motor vehicles may pass it on both sides.",
    "این صفحه نوک یک حاشیه را نشان می‌دهد و وسایل نقلیه‌ی موتوری می‌توانند از هر دو طرفش رد شوند."),
  S(False, "Jeg skal altid køre forbi pladen i højre side.", "I must always pass the plate on its right side.",
    "همیشه باید از سمت راست این صفحه رد شوم.",
    "Det gælder plader, hvor striberne kun hælder ned mod højre; denne plade kan passeres på begge sider.",
    "That applies to plates whose stripes slope down to the right only; this plate may be passed on both sides.",
    "این برای صفحه‌هایی است که نوارهایشان فقط به سمت راست پایین می‌روند؛ از این صفحه می‌توان از هر دو طرف گذشت."),
  S(False, "Pladen betyder, at frakørslen er spærret.", "The plate means that the exit road is closed.",
    "این صفحه یعنی خروجی بسته است.",
    "Pladen viser kun, hvor rabatten mellem de to veje begynder.", "The plate only shows where the verge between the two roads begins.",
    "این صفحه فقط نشان می‌دهد حاشیه‌ی بین دو راه از کجا شروع می‌شود."),
)

Q(6030, "4.4", picture("""
A roadside police check seen from just behind a car's driver's seat: through the open driver's window a police officer in a yellow
high-visibility vest holds out a small saliva drug-test kit (a swab on a short stick); the driver's hand rests on the steering wheel.
MUST BE CLEARLY VISIBLE: the saliva test kit held out at the window, the officer's vest.
MUST NOT APPEAR: text other than plain police markings, drugs."""),
  "Du røg hash til en fest for to dage siden. Nu føler du dig helt normal og vil køre bil. Hvad gælder?",
  "You smoked cannabis at a party two days ago. Now you feel completely normal and want to drive. What applies?",
  "دو روز پیش در یک مهمانی حشیش کشیدید. اکنون کاملاً عادی هستید و می‌خواهید رانندگی کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er forbudt at køre, hvis der er mere end en meget lille mængde THC i blodet, også selv om jeg ikke føler mig påvirket.",
    "It is forbidden to drive if there is more than a very small amount of THC in the blood, even if I do not feel affected.",
    "اگر بیش از مقدار بسیار کمی THC در خونم باشد، رانندگی ممنوع است، حتی اگر احساس نکنم تحت تأثیرم.",
    "Grænsen for THC er sat så lavt, at det i praksis er nultolerance, uanset hvordan du har det.",
    "The THC limit is set so low that in practice it is zero tolerance, however you feel.",
    "حد مجاز THC آن‌قدر پایین است که در عمل یعنی تحمل صفر، هر حالی که داشته باشید."),
  S(True, "THC kan stadig være i blodet længe efter, at rusen er gået over.", "THC may still be in the blood long after the high has worn off.",
    "THC ممکن است مدت‌ها پس از برطرف شدن نشئگی هنوز در خون باشد.",
    "Stoffet udskilles langsomt, især hos dem, der ryger ofte.", "The substance leaves the body slowly, especially in people who smoke often.",
    "این ماده آهسته از بدن دفع می‌شود، به‌ویژه در کسانی که زیاد مصرف می‌کنند."),
  S(False, "Når rusen er gået over, må jeg køre.", "Once the high has worn off, I may drive.", "وقتی نشئگی برطرف شد، می‌توانم رانندگی کنم.",
    "Det afgørende er indholdet i blodet, ikke om du kan mærke noget.",
    "What counts is the content in the blood, not whether you can feel anything.", "ملاک مقدار ماده در خون است، نه این‌که چیزی حس کنید یا نه."),
  S(False, "Hash er kun forbudt, hvis jeg også har drukket alkohol.", "Cannabis is only forbidden if I have also drunk alcohol.",
    "حشیش فقط وقتی ممنوع است که الکل هم نوشیده باشم.",
    "Kørsel med THC i blodet er forbudt i sig selv.", "Driving with THC in the blood is forbidden in itself.",
    "رانندگی با THC در خون به‌خودی‌خود ممنوع است."),
)

Q(6031, "1.2", picture("""
A close view of a driver's hands on a steering wheel; small motion lines around the rim show that the wheel is vibrating; behind it
the speedometer needle points to about 90 km/h; through the windscreen a straight motorway.
MUST BE CLEARLY VISIBLE: the vibrating steering wheel, the speedometer needle at a high speed.
MUST NOT APPEAR: brand logos, text other than the speedometer's numbers."""),
  "Når du kører over 80 km/t, begynder rattet at ryste. Ved lavere fart forsvinder rystelserne. Hvad gælder?",
  "When you drive faster than 80 km/h, the steering wheel starts to shake. At lower speeds the shaking disappears. What applies?",
  "وقتی تندتر از ۸۰ کیلومتر در ساعت می‌رانید، فرمان شروع به لرزیدن می‌کند. در سرعت‌های کمتر لرزش از بین می‌رود. چه قاعده‌ای برقرار است؟",
  S(True, "Hjulene kan være ude af balance og skal måske afbalanceres.", "The wheels may be out of balance and may need balancing.",
    "ممکن است چرخ‌ها بالانس نباشند و لازم باشد بالانس شوند.",
    "Et hjul, der ikke er afbalanceret, giver rystelser i rattet ved høj fart.",
    "A wheel that is not balanced makes the steering wheel shake at high speed.", "چرخی که بالانس نیست، در سرعت بالا فرمان را می‌لرزاند."),
  S(True, "Jeg får bilen undersøgt på et værksted hurtigst muligt.", "I have the car checked at a garage as soon as possible.",
    "هرچه زودتر خودرو را در تعمیرگاه بررسی می‌کنم.",
    "Rystelser kan også skyldes skader på dæk, fælge eller styretøj.",
    "Shaking can also be caused by damage to tyres, rims or steering.", "لرزش ممکن است از آسیب لاستیک، رینگ یا سیستم فرمان هم باشد."),
  S(False, "Rystelserne er ufarlige, så længe jeg kører under 80 km/t.", "The shaking is harmless as long as I drive below 80 km/h.",
    "تا وقتی زیر ۸۰ کیلومتر در ساعت برانم، این لرزش بی‌خطر است.",
    "Fejlen er der stadig, kan blive værre og slider på dæk og styretøj.",
    "The fault is still there, may get worse and wears the tyres and steering.", "ایراد همچنان هست، ممکن است بدتر شود و لاستیک‌ها و فرمان را فرسوده کند."),
  S(False, "Jeg sænker dæktrykket, så rattet ryster mindre.", "I lower the tyre pressure so that the steering wheel shakes less.",
    "باد لاستیک‌ها را کم می‌کنم تا فرمان کمتر بلرزد.",
    "Forkert dæktryk forringer vejgrebet og løser ikke problemet.", "Wrong tyre pressure worsens the grip and does not solve the problem.",
    "فشار باد نادرست چسبندگی را بدتر می‌کند و مشکل را حل نمی‌کند."),
)

Q(6032, "7.12", view("""
THE SCENE: a road with a raised cycle path on the right, separated from the carriageway by a low kerb; a little ahead a cyclist has
just left the cycle path over the kerb onto the carriageway and steers diagonally across our lane towards a side road on the LEFT,
without looking back.
MUST BE CLEARLY VISIBLE: the cycle path, the cyclist crossing our lane diagonally, the side road on the left.
MUST NOT APPEAR: signs, text."""),
  "Du kører ligeud ad en vej med cykelsti. Lige foran dig svinger en cyklist fra cykelstien ud på kørebanen for at krydse vejen. Hvad "
  "gælder?",
  "You are driving straight along a road with a cycle path. Just in front of you a cyclist turns from the cycle path out onto the "
  "carriageway to cross the road. What applies?",
  "در جاده‌ای که مسیر دوچرخه دارد مستقیم می‌رانید. درست جلوی شما دوچرخه‌سواری از مسیر دوچرخه وارد سواره‌رو می‌شود تا از عرض جاده رد شود. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Cyklisten har ubetinget vigepligt, når han svinger fra cykelstien ud på kørebanen.",
    "The cyclist must give way to all traffic when he turns from the cycle path out onto the carriageway.",
    "دوچرخه‌سوار وقتی از مسیر دوچرخه وارد سواره‌رو می‌شود، باید بی‌قیدوشرط راه بدهد.",
    "En cyklist, der svinger fra en cykelsti ud på kørebanen, skal holde tilbage for den kørende færdsel.",
    "A cyclist who turns from a cycle path out onto the carriageway must give way to the traffic on it.",
    "دوچرخه‌سواری که از مسیر دوچرخه وارد سواره‌رو می‌شود، باید به ترافیکِ در حال حرکت راه بدهد."),
  S(True, "Jeg bremser og lader ham komme over, hvis det er nødvendigt.", "I brake and let him get across if necessary.",
    "در صورت لزوم ترمز می‌کنم و می‌گذارم رد شود.",
    "Selv om cyklisten har vigepligt, skal du gøre, hvad du kan, for at undgå et uheld.",
    "Even though the cyclist must give way, you must do what you can to avoid an accident.",
    "با این‌که دوچرخه‌سوار باید راه بدهد، شما باید هر کاری می‌توانید برای جلوگیری از تصادف بکنید."),
  S(False, "Jeg kører videre uden at sætte farten ned, fordi han har vigepligt.",
    "I drive on without slowing down, because he must give way.", "بدون کم کردن سرعت ادامه می‌دهم، چون او باید راه بدهد.",
    "At have forret betyder ikke, at du må køre ind i nogen.", "Having priority does not mean that you may run into anyone.",
    "داشتن حق تقدم به این معنا نیست که می‌توانید به کسی بزنید."),
  S(False, "Cyklisten har forkørselsret, fordi han kommer fra højre.", "The cyclist has right of way because he comes from the right.",
    "دوچرخه‌سوار حق تقدم دارد، چون از سمت راست می‌آید.",
    "Højrereglen gælder ikke for den, der svinger ud fra en cykelsti.",
    "The rule of giving way to the right does not apply to someone turning out from a cycle path.",
    "قاعده‌ی حق تقدم سمت راست برای کسی که از مسیر دوچرخه بیرون می‌آید صدق نمی‌کند."),
)

Q(6033, "7.9", view("""
THE SCENE: a two-lane country road; a little ahead a cyclist rides at the right edge of our lane with a medium-sized dog on a lead
running alongside on the LEFT of the bicycle, out in the road; the oncoming lane is free for now.
MUST BE CLEARLY VISIBLE: the cyclist, the dog on the lead on the left side of the bicycle.
MUST NOT APPEAR: signs, text."""),
  "Foran dig kører en cyklist med en hund i snor. Hunden løber i venstre side af cyklen, ude på vejen. Du vil overhale. Hvordan forholder "
  "du dig?",
  "Ahead of you a cyclist is riding with a dog on a lead. The dog is running on the left side of the bicycle, out in the road. You want "
  "to overtake. What do you do?",
  "جلوی شما دوچرخه‌سواری با سگی قلاده‌دار می‌راند. سگ در سمت چپ دوچرخه، داخل جاده می‌دود. می‌خواهید سبقت بگیرید. چه می‌کنید؟",
  S(True, "Jeg overhaler med ekstra stor afstand, fordi hunden kan løbe ud foran mig.",
    "I overtake with an extra large distance, because the dog may run out in front of me.",
    "با فاصله‌ی خیلی زیاد سبقت می‌گیرم، چون سگ ممکن است جلوی من بپرد.",
    "Hunden følger ikke altid cyklen og kan pludselig springe til siden.",
    "The dog does not always follow the bicycle and may suddenly jump to the side.",
    "سگ همیشه دنبال دوچرخه نمی‌رود و ممکن است ناگهان به کنار بپرد."),
  S(True, "Jeg venter med at overhale, til der er god plads i den modsatte vognbane.",
    "I wait to overtake until there is plenty of room in the opposite lane.", "صبر می‌کنم تا در خط مقابل جای کافی باشد و بعد سبقت می‌گیرم.",
    "Cyklisten og hunden fylder mere i bredden end en cyklist alene.", "The cyclist and the dog take up more width than a cyclist alone.",
    "دوچرخه‌سوار و سگ با هم عرض بیشتری از یک دوچرخه‌سوار تنها می‌گیرند."),
  S(False, "Jeg dytter, så cyklisten trækker hunden ind til sig.", "I sound the horn so that the cyclist pulls the dog in close.",
    "بوق می‌زنم تا دوچرخه‌سوار سگ را به خودش نزدیک کند.",
    "Hornet kan skræmme hunden, så den løber ud foran dig.", "The horn may frighten the dog so that it runs out in front of you.",
    "بوق ممکن است سگ را بترساند و جلوی شما بدود."),
  S(False, "Jeg overhaler tæt forbi, så jeg ikke kommer ret langt over i den anden vognbane.",
    "I overtake close past them so that I do not go far into the other lane.",
    "از نزدیکشان سبقت می‌گیرم تا زیاد وارد خط دیگر نشوم.",
    "Du skal holde tilstrækkelig afstand til siden, og hunden kan komme ud i din vej.",
    "You must keep a sufficient distance to the side, and the dog may come out into your path.",
    "باید فاصله‌ی جانبی کافی نگه دارید و سگ ممکن است سر راهتان بیاید."),
)

Q(6034, "5.2", view("""
THE SCENE: a dry gravel road through fields in summer; a car some way ahead raises a big cloud of dust that hangs over the road,
partly hiding the car and the road beyond it.
MUST BE CLEARLY VISIBLE: the gravel road, the dust cloud hiding the car ahead and the road beyond.
MUST NOT APPEAR: signs, text.""", cond="hot dry summer day, dusty gravel road"),
  "Du kører på en tør grusvej bag en anden bil, som laver en stor støvsky. Hvordan forholder du dig?",
  "You are driving on a dry gravel road behind another car that is raising a big cloud of dust. What do you do?",
  "در جاده‌ای خاکیِ خشک پشت خودرویی می‌رانید که ابر بزرگی از گرد و خاک به هوا بلند می‌کند. چه می‌کنید؟",
  S(True, "Jeg holder god afstand, så jeg kan se vejen og bilen foran.", "I keep a good distance so that I can see the road and the car in front.",
    "فاصله‌ی کافی نگه می‌دارم تا جاده و خودروی جلویی را ببینم.",
    "Støvet kan skjule bilen foran, og den kan bremse, uden at du ser det.",
    "The dust can hide the car in front, and it may brake without you seeing it.",
    "گرد و خاک ممکن است خودروی جلویی را بپوشاند و آن خودرو بدون این‌که ببینید ترمز کند."),
  S(True, "Jeg er forberedt på, at der kan komme nogen imod mig i støvskyen.",
    "I am prepared for someone to come towards me in the dust cloud.", "آماده‌ام که کسی از دل ابر گرد و خاک از روبه‌رو بیاید.",
    "En modkørende bil eller en cyklist kan være skjult i støvet.", "An oncoming car or a cyclist may be hidden in the dust.",
    "ممکن است خودرو یا دوچرخه‌سواری از روبه‌رو در گرد و خاک پنهان باشد."),
  S(False, "Jeg overhaler gennem støvskyen, så jeg kommer ud af den.", "I overtake through the dust cloud to get out of it.",
    "از میان ابر گرد و خاک سبقت می‌گیرم تا از آن بیرون بیایم.",
    "Du kan ikke se, om der kommer nogen imod dig.", "You cannot see whether anyone is coming towards you.",
    "نمی‌توانید ببینید کسی از روبه‌رو می‌آید یا نه."),
  S(False, "Grus giver samme vejgreb som asfalt, så jeg kan holde samme fart.",
    "Gravel gives the same grip as asphalt, so I can keep the same speed.",
    "شن همان چسبندگی آسفالت را دارد، پس می‌توانم سرعتم را حفظ کنم.",
    "Løst grus giver dårligere greb og længere bremselængde.", "Loose gravel gives poorer grip and a longer braking distance.",
    "شن سست چسبندگی کمتر و مسافت ترمز طولانی‌تری دارد."),
)

Q(6035, "7.18", view("""
THE SCENE: a country road with a wide grass verge on the right; ahead, by a farm entrance, at the edge of the verge stands a sign
showing a car standing on a verge under a red-bordered blue roundel with a red X (the Danish sign that bans STOPPING on the verge); a
passenger sits beside us.
MUST BE CLEARLY VISIBLE: the sign with the car on the verge and the roundel with the red X, the wide verge.
MUST NOT APPEAR: other signs, text."""),
  "Uden for byen står en tavle, der forbyder standsning på rabatten. Din passager vil gerne sættes af ved en gård lige der. Hvad gælder?",
  "Outside town there is a sign that bans stopping on the verge. Your passenger would like to be dropped off at a farm right there. "
  "What applies?",
  "بیرون شهر تابلویی هست که توقف در حاشیه‌ی جاده را ممنوع می‌کند. مسافرتان می‌خواهد درست همان‌جا کنار یک مزرعه پیاده شود. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må heller ikke standse kort på rabatten.", "I may not stop briefly on the verge either.",
    "حتی برای مدت کوتاه هم نمی‌توانم در حاشیه توقف کنم.",
    "Tavlen forbyder standsning på rabatten, og det gælder også en kort standsning for af- og påstigning.",
    "The sign bans stopping on the verge, and that includes a short stop to let someone in or out.",
    "این تابلو توقف در حاشیه را ممنوع می‌کند و این شامل توقف کوتاه برای سوار و پیاده شدن هم می‌شود."),
  S(True, "Jeg kører videre og sætter passageren af et sted, hvor det er tilladt og sikkert, fx inde på gårdspladsen.",
    "I drive on and drop the passenger off somewhere it is allowed and safe, for example in the farmyard.",
    "ادامه می‌دهم و مسافر را جایی پیاده می‌کنم که مجاز و ایمن باشد، مثلاً داخل حیاط مزرعه.",
    "Forbuddet gælder rabatten; uden for den kan du standse, hvor det er tilladt og ikke til fare.",
    "The ban applies to the verge; away from it you may stop where it is allowed and not dangerous.",
    "ممنوعیت مربوط به حاشیه است؛ بیرون از آن می‌توانید جایی که مجاز و بی‌خطر است توقف کنید."),
  S(False, "Tavlen forbyder kun parkering, så en kort standsning er i orden.", "The sign only bans parking, so a short stop is fine.",
    "این تابلو فقط پارک را ممنوع می‌کند، پس توقف کوتاه اشکالی ندارد.",
    "Ved denne tavle er også standsning forbudt; parkering på rabatten forbydes med en anden tavle.",
    "At this sign stopping is banned too; parking on the verge is banned with a different sign.",
    "با این تابلو توقف هم ممنوع است؛ پارک در حاشیه با تابلوی دیگری ممنوع می‌شود."),
)

Q(6036, "7.16", view("""
THE SCENE: a motorway slip road curving gently and joining a motorway ahead; a blue motorway sign at the side shows an arrow pointing
the opposite way to what we expected (no readable names); no other vehicles on the slip road.
MUST BE CLEARLY VISIBLE: the slip road joining the motorway, the motorway traffic ahead.
MUST NOT APPEAR: readable text or numbers."""),
  "Du er kørt ind på en tilkørsel til motorvejen og opdager, at den fører i den forkerte retning. Hvad gør du?",
  "You have driven onto a motorway slip road and discover that it leads in the wrong direction. What do you do?",
  "وارد ورودی آزادراه شده‌اید و متوجه می‌شوید که در جهت اشتباه است. چه می‌کنید؟",
  S(True, "Jeg kører ud på motorvejen og tager den næste frakørsel.", "I drive onto the motorway and take the next exit.",
    "وارد آزادراه می‌شوم و از خروجی بعدی خارج می‌شوم.",
    "Derfra kan du finde tilbage og køre den rigtige vej.", "From there you can find your way back and go the right way.",
    "از آنجا می‌توانید برگردید و مسیر درست را بروید."),
  S(True, "Jeg tilpasser farten til trafikken på motorvejen og fletter roligt ind.",
    "I match my speed to the traffic on the motorway and merge calmly.", "سرعتم را با ترافیک آزادراه هماهنگ می‌کنم و آرام وارد جریان می‌شوم.",
    "Fejlen ændrer ikke på, at du skal køre sikkert ind på motorvejen.",
    "The mistake does not change the fact that you must join the motorway safely.",
    "اشتباهتان تغییری در این نمی‌دهد که باید با ایمنی وارد آزادراه شوید."),
  S(False, "Jeg standser og bakker tilbage ad tilkørslen.", "I stop and reverse back along the slip road.",
    "می‌ایستم و با دنده‌عقب از همان ورودی برمی‌گردم.",
    "Det er forbudt at bakke på til- og frakørsler til motorvej.", "Reversing on motorway slip roads is forbidden.",
    "دنده‌عقب رفتن در ورودی و خروجی آزادراه ممنوع است."),
  S(False, "Jeg vender bilen i starten af tilkørslen.", "I turn the car round at the start of the slip road.",
    "خودرو را در ابتدای ورودی دور می‌زنم.",
    "Det er også forbudt at vende på en tilkørsel til motorvej.", "Turning round on a motorway slip road is forbidden too.",
    "دور زدن در ورودی آزادراه هم ممنوع است."),
)

Q(6037, "6.2", picture("""
An accident scene seen from the pavement in town: a car stands at an angle at the right edge of the road with its hazard lights on and
a dented bonnet; broken glass and tyre marks lie on the road; on the pavement a person lies covered with a jacket, attended by a
kneeling bystander; the car does not block the road for other traffic.
MUST BE CLEARLY VISIBLE: the car at the edge with hazard lights, the broken glass and tyre marks, the person being helped.
MUST NOT APPEAR: blood, text, readable number plates."""),
  "Du var med i et uheld, hvor en fodgænger kom alvorligt til skade. Ambulancen og politiet er på vej. Din bil står, så den ikke er "
  "til fare for andre. Hvad gælder?",
  "You were involved in an accident in which a pedestrian was seriously injured. The ambulance and the police are on their way. Your "
  "car is standing where it is no danger to others. What applies?",
  "در تصادفی بودید که در آن یک عابر پیاده به‌شدت آسیب دید. آمبولانس و پلیس در راه‌اند. خودروی شما جایی ایستاده که برای دیگران خطری ندارد. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Jeg lader bilen stå, hvor den er.", "I leave the car where it is.", "خودرو را همان‌جا که هست رها می‌کنم.",
    "Ved et uheld med alvorlig personskade må der ikke ændres ved forholdene på stedet.",
    "After an accident with serious personal injury nothing may be changed at the scene.",
    "پس از تصادفی با آسیب جدی به افراد، نباید چیزی در محل حادثه تغییر داده شود."),
  S(True, "Jeg fjerner ikke glasskår, bremsespor eller andre spor fra uheldet.",
    "I do not remove broken glass, skid marks or other traces of the accident.",
    "خرده‌شیشه، جای ترمز یا دیگر ردهای تصادف را پاک نمی‌کنم.",
    "Spor kan have betydning for politiets opklaring af, hvad der skete.",
    "Traces can matter for the police's investigation of what happened.", "ردها ممکن است برای بررسی پلیس از چگونگی حادثه مهم باشند."),
  S(True, "Havde bilen stået, så den var til fare for færdslen, skulle den flyttes.",
    "If the car had been standing where it was a danger to traffic, it would have had to be moved.",
    "اگر خودرو جایی ایستاده بود که برای ترافیک خطر داشت، باید جابه‌جا می‌شد.",
    "Et køretøj, der har været med i uheldet, skal flyttes, hvis dets placering er til fare for færdslen.",
    "A vehicle involved in the accident must be moved if its position is a danger to traffic.",
    "وسیله‌ای که در تصادف بوده، اگر محل قرار گرفتنش برای ترافیک خطرناک باشد، باید جابه‌جا شود."),
  S(False, "Jeg flytter bilen et stykke, så de andre biler kan komme lettere forbi.",
    "I move the car a little so that the other cars can get past more easily.",
    "خودرو را کمی جابه‌جا می‌کنم تا خودروهای دیگر راحت‌تر رد شوند.",
    "Står bilen ikke til fare, skal den blive stående, så politiet kan se stedet, som det var.",
    "If the car is no danger, it must stay where it is so that the police can see the scene as it was.",
    "اگر خودرو خطری ایجاد نمی‌کند، باید همان‌جا بماند تا پلیس محل را همان‌طور که بود ببیند."),
)

Q(6038, "4.4", picture("""
Inside a car on a country road in spring: the driver sneezes with the eyes tightly shut and one hand on the steering wheel; a packet of
tissues lies on the passenger seat; through the windscreen blossoming trees and pollen drifting in the air.
MUST BE CLEARLY VISIBLE: the sneezing driver with closed eyes, the road ahead.
MUST NOT APPEAR: text, logos."""),
  "Du har høfeber og nyser mange gange i træk, mens du kører. Hvad skal du være opmærksom på?",
  "You have hay fever and sneeze many times in a row while you are driving. What should you be aware of?",
  "تب یونجه (آلرژی فصلی) دارید و هنگام رانندگی پشت سر هم عطسه می‌کنید. به چه چیزی باید توجه کنید؟",
  S(True, "Når jeg nyser, lukker jeg øjnene og kører et stykke i blinde.", "When I sneeze, I close my eyes and drive some way blind.",
    "وقتی عطسه می‌کنم، چشم‌هایم بسته می‌شود و مسافتی را کورکورانه می‌رانم.",
    "Ved 80 km/t kører bilen over 20 m i det sekund, et nys varer.",
    "At 80 km/h the car travels more than 20 m in the second a sneeze lasts.",
    "با سرعت ۸۰ کیلومتر در ساعت، خودرو در همان یک ثانیه‌ی عطسه بیش از ۲۰ متر جلو می‌رود."),
  S(True, "Nogle midler mod allergi kan gøre mig sløv, så jeg læser indlægssedlen.",
    "Some allergy medicines can make me drowsy, so I read the leaflet.",
    "برخی داروهای ضدحساسیت ممکن است خواب‌آلودم کنند، پس بروشور دارو را می‌خوانم.",
    "Nogle allergimidler giver døsighed og kan påvirke din kørsel.", "Some allergy medicines cause drowsiness and can affect your driving.",
    "برخی داروهای ضدحساسیت خواب‌آلودگی می‌آورند و ممکن است روی رانندگی‌تان اثر بگذارند."),
  S(False, "Medicin mod allergi kan aldrig påvirke min kørsel.", "Allergy medicine can never affect my driving.",
    "داروی ضدحساسیت هرگز روی رانندگی‌ام اثر ندارد.",
    "Nogle midler gør dig træt og langsom til at reagere.", "Some medicines make you tired and slow to react.",
    "برخی داروها شما را خسته و کندواکنش می‌کنند."),
  S(False, "Jeg gnider øjnene med begge hænder, mens jeg kører.", "I rub my eyes with both hands while I am driving.",
    "در حال رانندگی با هر دو دست چشم‌هایم را می‌مالم.",
    "Du skal kunne se og styre hele tiden.", "You must be able to see and steer all the time.",
    "باید همیشه بتوانید ببینید و فرمان بدهید."),
)

Q(6039, "7.6", town("""
THE SCENE: a town street; ahead a taxi with a roof sign (no readable text) stands at the right kerb; a passenger who has just got out
walks round behind the taxi towards our lane to cross the street, partly hidden by the taxi.
MUST BE CLEARLY VISIBLE: the taxi at the kerb, the passenger stepping out from behind it.
MUST NOT APPEAR: readable text, signs."""),
  "En taxa holder i vejkanten foran dig. En passager er lige steget ud og går om bag taxaen for at komme over vejen. Hvordan forholder "
  "du dig?",
  "A taxi is stopped at the side of the road in front of you. A passenger has just got out and is walking round behind the taxi to "
  "cross the road. What do you do?",
  "تاکسی‌ای جلوی شما کنار خیابان ایستاده است. مسافری همین الان پیاده شده و از پشت تاکسی می‌گذرد تا به آن سوی خیابان برود. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og er forberedt på, at passageren dukker frem bag taxaen.",
    "I slow down and am prepared for the passenger to appear from behind the taxi.",
    "سرعتم را کم می‌کنم و آماده‌ام که مسافر از پشت تاکسی بیرون بیاید.",
    "Taxaen skjuler passageren, som måske ikke ser sig for.", "The taxi hides the passenger, who may not look out.",
    "تاکسی مسافر را پنهان می‌کند و ممکن است او اطرافش را نگاه نکند."),
  S(True, "Jeg holder god afstand til siden, når jeg kører forbi taxaen.", "I keep a good distance to the side when I pass the taxi.",
    "وقتی از کنار تاکسی رد می‌شوم، فاصله‌ی جانبی کافی نگه می‌دارم.",
    "Der kan også blive åbnet en dør ud mod vejen.", "A door may also be opened on the road side.",
    "ممکن است دری هم رو به خیابان باز شود."),
  S(False, "Passageren skal vente, til jeg er kørt forbi, så jeg kan køre videre som normalt.",
    "The passenger must wait until I have passed, so I can carry on as normal.",
    "مسافر باید صبر کند تا من رد شوم، پس می‌توانم مثل همیشه ادامه دهم.",
    "Du skal tage hensyn til gående, der er på vej over vejen.", "You must show consideration for pedestrians on their way across the road.",
    "باید ملاحظه‌ی عابرانی را بکنید که در حال عبور از خیابان‌اند."),
  S(False, "Jeg kører tæt forbi taxaen for hurtigt at komme forbi stedet.", "I pass close to the taxi to get past the spot quickly.",
    "از نزدیک تاکسی رد می‌شوم تا سریع از آنجا بگذرم.",
    "Så har du ingen tid til at reagere, hvis passageren træder ud foran dig.",
    "Then you have no time to react if the passenger steps out in front of you.",
    "در این صورت اگر مسافر جلوی شما بیاید، وقتی برای واکنش ندارید."),
)

Q(6040, "3.2", picture("""
Seen from the side of the road: in a queue at a red traffic light a small car stands very close in front of the high front of a big
lorry; the lorry driver sits high up in the cab; a shaded zone right in front of the cab shows the area the driver can hardly see,
and the small car is inside it.
MUST BE CLEARLY VISIBLE: the small car close in front of the lorry, the high cab, the shaded blind area in front of the cab.
MUST NOT APPEAR: text, logos, readable number plates."""),
  "I en kø holder du lige foran en stor lastbil, tæt på dens front. Hvad skal du være opmærksom på?",
  "In a queue you are standing right in front of a big lorry, close to its front. What should you be aware of?",
  "در صف، درست جلوی یک کامیون بزرگ و نزدیک به جلوی آن ایستاده‌اید. به چه چیزی باید توجه کنید؟",
  S(True, "Chaufføren kan have svært ved at se min bil, når den holder tæt foran førerhuset.",
    "The driver may find it hard to see my car when it is close in front of the cab.",
    "وقتی خودروی من نزدیکِ جلوی اتاقک راننده است، ممکن است راننده به‌سختی آن را ببیند.",
    "Fra det høje førerhus er der et område lige foran lastbilen, som er svært at se.",
    "From the high cab there is an area right in front of the lorry that is hard to see.",
    "از اتاقک بلند کامیون، محدوده‌ای درست جلوی آن هست که دیدنش سخت است."),
  S(True, "Jeg undgår at standse brat foran lastbilen, når køen kører igen.",
    "I avoid stopping abruptly in front of the lorry when the queue moves again.",
    "وقتی صف دوباره راه افتاد، از ترمزِ ناگهانی جلوی کامیون پرهیز می‌کنم.",
    "En lastbil kan ikke standse lige så hurtigt som en personbil.", "A lorry cannot stop as quickly as a car.",
    "کامیون نمی‌تواند به سرعتِ یک خودروی سواری متوقف شود."),
  S(False, "Lastbilchauffører sidder højt og kan derfor altid se alt omkring lastbilen.",
    "Lorry drivers sit high up and can therefore always see everything around the lorry.",
    "رانندگان کامیون بالا می‌نشینند و به همین دلیل همیشه همه‌چیز اطراف کامیون را می‌بینند.",
    "En lastbil har store blinde vinkler, også lige foran førerhuset.", "A lorry has large blind spots, right in front of the cab too.",
    "کامیون نقاط کور بزرگی دارد، حتی درست جلوی اتاقک."),
  S(False, "Jeg kan regne med, at lastbilen venter, til jeg er kørt et godt stykke frem.",
    "I can count on the lorry waiting until I have moved well ahead.",
    "می‌توانم مطمئن باشم که کامیون صبر می‌کند تا من خوب جلو بروم.",
    "Chaufføren ser dig måske ikke og kan køre frem samtidig med dig.",
    "The driver may not see you and may move off at the same time as you.",
    "ممکن است راننده شما را نبیند و هم‌زمان با شما حرکت کند."),
)

Q(6041, "7.12", above("""
THE SCENE: a Y-shaped junction seen from above: two roads come up from the bottom-left and the bottom-right of the picture and join
into one road leading up to the top; no signs, no shark teeth and no markings at the junction.
VEHICLES (colour code used strictly): a RED car (ours) on the LEFT branch, heading up towards the junction; a BLUE car on the RIGHT
branch, also heading up towards the junction at about the same distance; SOLID GREEN arrows show both heading into the common road.
MUST NOT APPEAR: signs, shark teeth, text."""),
  "Din vej løber sammen med en anden vej i et Y-kryds. Der er hverken tavler eller hajtænder. Ad den anden vej, til højre for dig, kommer "
  "en bil. Hvad gælder?",
  "Your road joins another road at a Y-junction. There are neither signs nor shark teeth. A car is coming along the other road, to your "
  "right. What applies?",
  "راه شما در یک تقاطع Y شکل به راه دیگری می‌پیوندد. نه تابلویی هست و نه دندان‌کوسه‌ای. از راه دیگر، در سمت راست شما، خودرویی می‌آید. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for bilen, fordi den kommer fra højre.", "I give way to the car because it is coming from the right.",
    "به آن خودرو راه می‌دهم، چون از سمت راست می‌آید.",
    "Uden tavler og afmærkning gælder højrevigepligten, også når vejene løber sammen i en spids vinkel.",
    "Without signs and markings you must give way to the right, also when the roads meet at a sharp angle.",
    "بدون تابلو و خط‌کشی، باید به سمت راست راه داد، حتی وقتی راه‌ها با زاویه‌ی تند به هم می‌رسند."),
  S(True, "Jeg sætter farten tydeligt ned i god tid, så føreren kan se, at jeg holder tilbage.",
    "I clearly reduce my speed in good time so that the driver can see that I am giving way.",
    "به‌موقع و به‌وضوح سرعتم را کم می‌کنم تا راننده ببیند که راه می‌دهم.",
    "Den, der har vigepligt, skal vise det tydeligt ved at sætte farten ned eller standse.",
    "The one who must give way has to show it clearly by slowing down or stopping.",
    "کسی که باید راه بدهد، باید با کم کردن سرعت یا توقف این را به‌وضوح نشان دهد."),
  S(False, "Den vej, der ser størst ud, har forkørselsret.", "The road that looks biggest has right of way.",
    "راهی که بزرگ‌تر به نظر می‌رسد حق تقدم دارد.",
    "Vejens størrelse betyder intet, når der ikke er tavler eller afmærkning.",
    "The size of the road means nothing when there are no signs or markings.", "وقتی تابلو یا خط‌کشی نیست، بزرگی راه اهمیتی ندارد."),
  S(False, "Den, der kommer først til sammenløbet, må køre først.", "The one who reaches the junction first may go first.",
    "هر کس اول به محل اتصال برسد، اول می‌رود.",
    "Det afgørende er, hvem der kommer fra højre, ikke hvem der er først.",
    "What counts is who comes from the right, not who is first.", "ملاک این است که چه کسی از سمت راست می‌آید، نه این‌که چه کسی اول برسد."),
)

Q(6042, "8.1", picture("""
A close view of a car's instrument panel at night on a motorway: a lit coffee-cup symbol glows in the middle of the display; through
the windscreen the dark motorway with the red tail lights of other cars far ahead.
MUST BE CLEARLY VISIBLE: the lit coffee-cup symbol on the display.
MUST NOT APPEAR: readable text, logos."""),
  "Du har kørt i flere timer. Nu lyser et symbol med en kaffekop på instrumentbrættet, og bilen bipper. Hvad gælder?",
  "You have been driving for several hours. Now a symbol with a coffee cup lights up on the dashboard, and the car beeps. What applies?",
  "چند ساعت است رانندگی می‌کنید. اکنون نمادی به شکل فنجان قهوه روی داشبورد روشن شده و خودرو بوق کوتاهی می‌زند. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen har registreret, at min kørsel tyder på træthed.", "The car has noticed that my driving suggests tiredness.",
    "خودرو تشخیص داده که نحوه‌ی رانندگی‌ام نشانه‌ی خستگی است.",
    "Mange biler holder øje med, hvordan du styrer og kører, og advarer, når du kan være træt.",
    "Many cars monitor how you steer and drive and warn you when you may be tired.",
    "بسیاری از خودروها نحوه‌ی فرمان دادن و رانندگی شما را زیر نظر دارند و وقتی ممکن است خسته باشید هشدار می‌دهند."),
  S(True, "Jeg holder pause ved næste rasteplads eller et andet sikkert sted.", "I take a break at the next rest area or another safe place.",
    "در استراحتگاه بعدی یا جای امن دیگری استراحت می‌کنم.",
    "Det er kun hvile, der hjælper mod træthed.", "Only rest helps against tiredness.", "فقط استراحت در برابر خستگی مؤثر است."),
  S(True, "Jeg tager advarslen alvorligt, selv om jeg ikke selv føler mig træt.",
    "I take the warning seriously even though I do not feel tired myself.", "هشدار را جدی می‌گیرم، حتی اگر خودم احساس خستگی نکنم.",
    "Mange opdager først deres træthed, når det er for sent.", "Many people only notice their tiredness when it is too late.",
    "بسیاری فقط وقتی متوجه خستگی‌شان می‌شوند که دیگر دیر شده است."),
  S(False, "Jeg slukker for advarslen og kører videre, når jeg har drukket en kop kaffe.",
    "I switch the warning off and drive on once I have had a cup of coffee.",
    "هشدار را خاموش می‌کنم و پس از نوشیدن یک فنجان قهوه به راهم ادامه می‌دهم.",
    "En kop kaffe hjælper højst kortvarigt og fjerner ikke trætheden.", "A cup of coffee helps for a short while at most and does not remove the tiredness.",
    "یک فنجان قهوه حداکثر برای مدت کوتاهی کمک می‌کند و خستگی را از بین نمی‌برد."),
)

Q(6043, "7.3", view("""
THE SCENE: a motorway with two lanes in our direction through open countryside, seen from the higher driver's seat of a van (a large,
plain van door mirror at the right edge of the picture); no speed signs in sight.
MUST BE CLEARLY VISIBLE: the motorway, the van's large door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du kører en varebil med en tilladt totalvægt på 3.200 kg ad motorvejen. Der er ingen hastighedstavler. Hvad er den højst tilladte "
  "hastighed?",
  "You are driving a van with a permitted total weight of 3,200 kg on the motorway. There are no speed signs. What is the highest "
  "permitted speed?",
  "با یک ون با وزن کل مجاز ۳٬۲۰۰ کیلوگرم در آزادراه می‌رانید. هیچ تابلوی سرعتی نیست. حداکثر سرعت مجاز چقدر است؟",
  S(True, "Højst 130 km/t.", "At most 130 km/h.", "حداکثر ۱۳۰ کیلومتر در ساعت.",
    "Biler med en tilladt totalvægt på højst 3.500 kg følger de generelle grænser, på motorvej 130 km/t.",
    "Vehicles with a permitted total weight of at most 3,500 kg follow the general limits, on a motorway 130 km/h.",
    "خودروهایی با وزن کل مجاز حداکثر ۳٬۵۰۰ کیلوگرم تابع حدهای عمومی‌اند که در آزادراه ۱۳۰ کیلومتر در ساعت است."),
  S(False, "Højst 80 km/t.", "At most 80 km/h.", "حداکثر ۸۰ کیلومتر در ساعت.",
    "80 km/t gælder for biler over 3.500 kg og for biler med påhængskøretøj.",
    "80 km/h applies to vehicles over 3,500 kg and to cars towing a trailer.",
    "۸۰ کیلومتر برای خودروهای بالای ۳٬۵۰۰ کیلوگرم و خودروهای دارای یدک است."),
  S(False, "Højst 100 km/t.", "At most 100 km/h.", "حداکثر ۱۰۰ کیلومتر در ساعت.",
    "100 km/t gælder for en bil med en påhængsvogn, der er godkendt til det, ikke for din varebil uden påhæng.",
    "100 km/h applies to a car with a trailer approved for it, not to your van without a trailer.",
    "۱۰۰ کیلومتر مربوط به خودرویی با یدکِ تأییدشده برای این سرعت است، نه ون بدون یدکِ شما."),
  S(False, "Højst 110 km/t.", "At most 110 km/h.", "حداکثر ۱۱۰ کیلومتر در ساعت.",
    "Der er ingen særlig grænse på 110 km/t for varebiler.", "There is no special limit of 110 km/h for vans.",
    "حد ویژه‌ی ۱۱۰ کیلومتر برای ون‌ها وجود ندارد."),
)

Q(6044, "6.1", view("""
THE SCENE: a two-way road at dusk; in the middle of the road ahead lies a narrow raised traffic island; at its near end stands a short,
thick YELLOW column lit from inside (a Danish traffic-island beacon); the road continues past the island on both sides, with oncoming
traffic on the left side of it.
MUST BE CLEARLY VISIBLE: the glowing yellow column at the end of the island, the lanes on both sides of the island.
MUST NOT APPEAR: blue signs on the island, other signs, text.""", cond="dusk, getting dark, dry road"),
  "Midt på vejen ligger en helle. I enden af den står en gul søjle, som lyser. Hvad gælder?",
  "In the middle of the road there is a traffic island. At its end stands a yellow column that is lit. What applies?",
  "وسط جاده یک جزیره‌ی ترافیکی هست. در انتهای آن ستونی زرد و روشن قرار دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde til højre for søjlen og hellen.", "I must keep to the right of the column and the island.",
    "باید از سمت راستِ ستون و جزیره عبور کنم.",
    "Søjlen er et hellefyr, og du skal holde til højre for hellefyr og helleanlæg på kørebanen.",
    "The column is a traffic-island beacon, and you must keep to the right of beacons and islands in the carriageway.",
    "این ستون چراغِ جزیره‌ی ترافیکی است و باید از سمت راست این چراغ‌ها و جزیره‌های روی سواره‌رو بگذرید."),
  S(False, "Søjlen betyder, at jeg skal standse før hellen.", "The column means that I must stop before the island.",
    "این ستون یعنی باید پیش از جزیره بایستم.",
    "Hellefyret gør hellen synlig; det betyder ikke, at du skal standse.",
    "The beacon makes the island visible; it does not mean that you must stop.", "این چراغ جزیره را نمایان می‌کند و به معنای توقف نیست."),
  S(False, "Jeg må selv vælge, om jeg vil køre til højre eller venstre for hellen.",
    "I may choose for myself whether to drive to the right or the left of the island.",
    "خودم می‌توانم انتخاب کنم که از راست جزیره بروم یا از چپ آن.",
    "Venstre om må du kun køre, hvis afmærkningen viser det, eller hvis vejen er ensrettet.",
    "You may only go to the left of it if the markings show so or if the road is one-way.",
    "فقط وقتی خط‌کشی اجازه دهد یا جاده یک‌طرفه باشد، می‌توانید از سمت چپ آن بروید."),
)

Q(6045, "1.2", picture("""
The driver's footwell of a car seen from the side: the accelerator pedal is pressed fully down and stuck under the edge of a crumpled
floor mat; the driver's right foot is lifted off it; the brake pedal is next to it.
MUST BE CLEARLY VISIBLE: the accelerator stuck under the crumpled floor mat, the brake pedal beside it.
MUST NOT APPEAR: text, logos."""),
  "Under kørslen sidder speederen fast i bunden, og bilen bliver ved med at accelerere. Hvad gør du?",
  "While you are driving, the accelerator gets stuck fully down, and the car keeps on accelerating. What do you do?",
  "هنگام رانندگی پدال گاز تا ته گیر می‌کند و خودرو مدام شتاب می‌گیرد. چه می‌کنید؟",
  S(True, "Jeg træder koblingen ned eller sætter gearvælgeren i frigear (N).",
    "I press the clutch down or put the gear selector in neutral (N).", "کلاچ را فشار می‌دهم یا دسته‌دنده را در حالت خلاص (N) می‌گذارم.",
    "Så kobles motoren fra hjulene, og bilen holder op med at trække.",
    "Then the engine is disconnected from the wheels, and the car stops pulling.", "این‌طور موتور از چرخ‌ها جدا می‌شود و خودرو دیگر کشیده نمی‌شود."),
  S(True, "Jeg bremser kraftigt og styrer ind til siden, når det kan ske sikkert.",
    "I brake firmly and steer in to the side when it can be done safely.", "محکم ترمز می‌کنم و وقتی ایمن بود، به کنار جاده می‌روم.",
    "Bremserne kan standse bilen, når motoren ikke længere trækker i hjulene.",
    "The brakes can stop the car once the engine no longer drives the wheels.", "وقتی موتور دیگر چرخ‌ها را نمی‌چرخاند، ترمزها می‌توانند خودرو را متوقف کنند."),
  S(True, "Når bilen holder stille, slukker jeg motoren.", "When the car has stopped, I switch off the engine.",
    "وقتی خودرو ایستاد، موتور را خاموش می‌کنم.",
    "Så kører motoren ikke videre i højt omdrejningstal og tager skade.",
    "Then the engine does not keep running at high revs and get damaged.", "این‌طور موتور با دور بالا ادامه نمی‌دهد و آسیب نمی‌بیند."),
  S(False, "Jeg drejer tændingsnøglen tilbage og trækker den ud, mens bilen stadig kører hurtigt.",
    "I turn the ignition key back and pull it out while the car is still going fast.",
    "در حالی که خودرو هنوز با سرعت حرکت می‌کند، سوئیچ را برمی‌گردانم و بیرون می‌کشم.",
    "Så kan ratlåsen gå i indgreb, og du mister hjælpen til styring og bremser.",
    "Then the steering lock may engage, and you lose the help for steering and braking.",
    "در این صورت ممکن است قفل فرمان درگیر شود و کمکِ فرمان و ترمز را از دست بدهید."),
)

Q(6046, "7.15", above("""
THE SCENE: a roundabout seen from above with a round central island. Our approach road comes up from the bottom. Before the entry a
separate right-turn bypass lane branches off to the right, separated from the entry by a raised island, and joins the road leaving
the roundabout to the right (at the right edge of the picture); at the end of the bypass lane, where it joins, shark teeth (white
triangles) lie across it.
VEHICLES (colour code used strictly): a RED car (ours) in the approach road just before the bypass lane begins, with a DASHED ORANGE
arrow showing it entering the bypass lane; a BLUE car driving round in the roundabout.
MUST NOT APPEAR: signs, text."""),
  "Ved indkørslen til en rundkørsel er der en særlig højresvingsbane, som går uden om rundkørslen. Du skal til højre. Hvad gælder?",
  "At the entry to a roundabout there is a separate right-turn lane that goes round the outside of the roundabout. You are turning "
  "right. What applies?",
  "در ورودی یک میدان، خط ویژه‌ی گردش به راست هست که از کنار میدان می‌گذرد. شما می‌خواهید به راست بروید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg bruger svingbanen og holder tilbage ved hajtænderne for enden af den, hvis der kommer nogen.",
    "I use the turning lane and give way at the shark teeth at its end if anyone is coming.",
    "از این خط گردش استفاده می‌کنم و اگر کسی بیاید، در دندان‌کوسه‌ی انتهای آن راه می‌دهم.",
    "Svingbanen fører dig uden om rundkørslen, og hajtænderne for enden giver dig ubetinget vigepligt.",
    "The turning lane takes you round the roundabout, and the shark teeth at its end mean that you must give way to all.",
    "این خط شما را از کنار میدان عبور می‌دهد و دندان‌کوسه‌ی انتهای آن یعنی باید بی‌قیدوشرط راه بدهید."),
  S(False, "I svingbanen skal jeg blinke til venstre, fordi den hører med til rundkørslen.",
    "In the turning lane I must indicate left because it is part of the roundabout.",
    "در این خط باید راهنمای چپ بزنم، چون بخشی از میدان است.",
    "Du kører uden om rundkørslen og skal give tegn til højre, når du svinger ind i svingbanen.",
    "You go round the outside of the roundabout and must indicate right when you turn into the turning lane.",
    "شما از کنار میدان رد می‌شوید و هنگام ورود به این خط باید راهنمای راست بزنید."),
  S(False, "Svingbanen må også bruges af dem, der skal ligeud, når der er kø.",
    "The turning lane may also be used by those going straight on when there is a queue.",
    "وقتی صف هست، کسانی که مستقیم می‌روند هم می‌توانند از این خط استفاده کنند.",
    "En svingbane må kun bruges af dem, der skal i den retning, den fører.",
    "A turning lane may only be used by those going in the direction it leads.", "خط گردش فقط برای کسانی است که به همان سمت می‌روند."),
  S(False, "Før jeg kører ind i svingbanen, skal jeg holde tilbage for bilerne i rundkørslen.",
    "Before I enter the turning lane, I must give way to the cars in the roundabout.",
    "پیش از ورود به این خط باید به خودروهای داخل میدان راه بدهم.",
    "Svingbanen begynder før rundkørslen, så bilerne i rundkørslen krydser ikke din vej der.",
    "The turning lane begins before the roundabout, so the cars in the roundabout do not cross your path there.",
    "این خط پیش از میدان شروع می‌شود، پس خودروهای داخل میدان در آنجا از مسیر شما نمی‌گذرند."),
)

Q(6047, "10.3", picture("""
A farmyard: a tractor, a small moped with a helmet hanging on its handlebar, and a motorcycle stand side by side; an ordinary car is
parked nearby.
MUST BE CLEARLY VISIBLE: the tractor, the small moped, the motorcycle, the car.
MUST NOT APPEAR: text, readable number plates, brand logos."""),
  "Din nabo spørger, om du vil flytte hans traktor, hans lille knallert og hans motorcykel for ham. Du har kun kørekort til bil "
  "(kategori B). Hvad gælder?",
  "Your neighbour asks whether you will move his tractor, his small moped and his motorcycle for him. You only have a car licence "
  "(category B). What applies?",
  "همسایه‌تان از شما می‌خواهد تراکتور، موتورگازی کوچک و موتورسیکلتش را برایش جابه‌جا کنید. شما فقط گواهینامه‌ی خودرو (رده‌ی B) دارید. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må køre traktoren.", "I may drive the tractor.", "می‌توانم تراکتور را برانم.",
    "Traktor må føres af den, der har kørekort til bil.", "A tractor may be driven by someone who holds a car licence.",
    "کسی که گواهینامه‌ی خودرو دارد، می‌تواند تراکتور براند."),
  S(True, "Jeg må køre den lille knallert.", "I may ride the small moped.", "می‌توانم موتورگازی کوچک را برانم.",
    "Lille knallert må føres af den, der har kørekort til bil.", "A small moped may be ridden by someone who holds a car licence.",
    "کسی که گواهینامه‌ی خودرو دارد، می‌تواند موتورگازی کوچک براند."),
  S(True, "Jeg skal have kørekortet med, når jeg kører knallerten.", "I must carry my licence when I ride the moped.",
    "وقتی با موتورگازی می‌رانم، باید گواهینامه‌ام همراهم باشد.",
    "Føreren af en lille knallert skal have kørekortet hos sig og vise det til politiet på forlangende.",
    "The rider of a small moped must carry the licence and show it to the police on request.",
    "راننده‌ی موتورگازی کوچک باید گواهینامه همراه داشته باشد و در صورت درخواست به پلیس نشان دهد."),
  S(True, "Jeg må ikke køre motorcyklen.", "I may not ride the motorcycle.", "اجازه ندارم موتورسیکلت را برانم.",
    "Motorcykel kræver kørekort til motorcykel; det følger ikke med kørekortet til bil.",
    "A motorcycle requires a motorcycle licence; it is not included in the car licence.",
    "موتورسیکلت گواهینامه‌ی موتورسیکلت لازم دارد و در گواهینامه‌ی خودرو نیست."),
)

Q(6048, "7.6", view("""
THE SCENE: a narrow road with sandy edges through a summer-house area with low pine trees and dunes; two children in swimwear run
across the road from the right towards a path to the beach on the left; another child is just coming out from between the bushes on
the right; there is no pavement.
MUST BE CLEARLY VISIBLE: the children running across the road, the child coming from the bushes, the path to the beach.
MUST NOT APPEAR: signs, text.""", cond="sunny summer day, dry road"),
  "I et sommerhusområde løber nogle børn i badetøj over vejen ned mod stranden. Der er intet fortov. Hvordan forholder du dig?",
  "In a summer-house area some children in swimwear are running across the road down to the beach. There is no pavement. What do you "
  "do?",
  "در منطقه‌ای ویلایی چند کودک با لباس شنا از عرض جاده به سمت ساحل می‌دوند. پیاده‌رو وجود ندارد. چه می‌کنید؟",
  S(True, "Jeg sætter farten kraftigt ned.", "I reduce my speed a lot.", "سرعتم را خیلی کم می‌کنم.",
    "Børn, der glæder sig til stranden, ser ofte ikke efter biler.", "Children looking forward to the beach often do not look out for cars.",
    "کودکانی که مشتاق رفتن به ساحل‌اند، اغلب حواسشان به خودروها نیست."),
  S(True, "Jeg regner med, at der kan komme flere børn løbende efter de første.",
    "I expect that more children may come running after the first ones.", "احتمال می‌دهم پشت سر اولی‌ها کودکان دیگری هم دوان بیایند.",
    "Børn følges tit ad, og de sidste kan komme lige efter.", "Children often go together, and the last ones may follow right after.",
    "کودکان اغلب با هم‌اند و آخری‌ها ممکن است درست پشت سرشان بیایند."),
  S(True, "Jeg holder øje med folk, der går på selve vejen.", "I keep an eye on people walking on the road itself.",
    "مراقب کسانی هستم که روی خودِ جاده راه می‌روند.",
    "Når der ikke er fortov, går de gående på vejen eller i vejkanten.",
    "When there is no pavement, pedestrians walk on the road or at its edge.", "وقتی پیاده‌رو نیست، عابران روی جاده یا لبه‌ی آن راه می‌روند."),
  S(False, "Børnene skal holde tilbage for mig, fordi jeg kører på vejen.",
    "The children must give way to me because I am driving on the road.", "کودکان باید به من راه بدهند، چون من در جاده می‌رانم.",
    "Du skal tage særligt hensyn til børn og køre, så du kan standse for dem.",
    "You must show special consideration for children and drive so that you can stop for them.",
    "باید ملاحظه‌ی ویژه‌ی کودکان را بکنید و طوری برانید که بتوانید برایشان بایستید."),
)

Q(6049, "7.2", town("""
THE SCENE: a wide street in town with two lanes in our direction; the right lane is separated from ours by a broad unbroken white
line and has the word «BUS» painted in it and, next to it, a car symbol on a green field (the Danish marking for zero-emission cars);
we drive an electric car in the left lane.
MUST BE CLEARLY VISIBLE: the «BUS» text and the car symbol on the green field in the right lane.
MUST NOT APPEAR: other text, signs."""),
  "Den højre vognbane er afmærket med »BUS« og et bilsymbol på et grønt felt, symbolet for nulemissionsbil. Du kører i en elbil. Hvad "
  "gælder?",
  "The right lane is marked «BUS» and with a car symbol on a green field, the symbol for zero-emission cars. You are driving an "
  "electric car. What applies?",
  "خط راست با «BUS» و نماد یک خودرو روی زمینه‌ی سبز، یعنی نماد خودروی بدون آلایندگی، علامت‌گذاری شده است. شما خودروی برقی می‌رانید. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må køre i busbanen.", "I may drive in the bus lane.", "می‌توانم در خط اتوبوس برانم.",
    "Er busbanen også afmærket med symbolet for nulemissionsbil, må biler på el eller brint bruge den.",
    "If the bus lane is also marked with the zero-emission symbol, cars running on electricity or hydrogen may use it.",
    "اگر خط اتوبوس با نماد خودروی بدون آلایندگی هم علامت‌گذاری شده باشد، خودروهای برقی یا هیدروژنی می‌توانند از آن استفاده کنند."),
  S(True, "En bil med benzin- eller dieselmotor må ikke køre i busbanen.", "A car with a petrol or diesel engine may not drive in the bus lane.",
    "خودروی بنزینی یا دیزلی نباید در خط اتوبوس براند.",
    "Nulemissionsbiler er biler, der ikke udleder forurening, mens de kører.", "Zero-emission cars are cars that give off no pollution while driving.",
    "خودروهای بدون آلایندگی خودروهایی‌اند که هنگام حرکت آلودگی تولید نمی‌کنند."),
  S(True, "Jeg skal stadig tage hensyn til busserne og cyklisterne i banen.",
    "I must still show consideration for the buses and the cyclists in the lane.",
    "همچنان باید ملاحظه‌ی اتوبوس‌ها و دوچرخه‌سواران داخل این خط را بکنم.",
    "Busser holder ved stoppesteder i banen, og en busbane i højre side bruges også af cyklister.",
    "Buses stop at bus stops in the lane, and a bus lane on the right is also used by cyclists.",
    "اتوبوس‌ها در ایستگاه‌های داخل این خط می‌ایستند و خط اتوبوسِ سمت راست را دوچرخه‌سواران هم استفاده می‌کنند."),
  S(False, "En plugin-hybrid må også køre i busbanen, når den kører på strøm.",
    "A plug-in hybrid may also use the bus lane when it is running on electricity.",
    "خودروی هیبریدیِ قابل شارژ هم وقتی با برق حرکت می‌کند، می‌تواند در خط اتوبوس براند.",
    "En plugin-hybrid har også en forbrændingsmotor og regnes ikke som nulemissionsbil.",
    "A plug-in hybrid also has a combustion engine and does not count as a zero-emission car.",
    "هیبریدیِ قابل شارژ موتور احتراقی هم دارد و خودروی بدون آلایندگی به شمار نمی‌آید."),
)

Q(6050, "7.1", picture("""
A car at a junction on an icy winter road seen from the side: its front wheels spin on the shiny ice and throw up a little spray of
ice crystals; the traffic light beside the road has just turned green; snow lies along the kerbs.
MUST BE CLEARLY VISIBLE: the spinning front wheels on the shiny ice, the green light.
MUST NOT APPEAR: text, readable number plates."""),
  "Du holder for rødt på en isglat vej. Da lyset skifter, og du giver gas, spinner forhjulene. Hvad gør du?",
  "You are waiting at a red light on an icy road. When the light changes and you accelerate, the front wheels spin. What do you do?",
  "روی جاده‌ای یخ‌زده پشت چراغ قرمز ایستاده‌اید. وقتی چراغ عوض می‌شود و گاز می‌دهید، چرخ‌های جلو درجا می‌چرخند. چه می‌کنید؟",
  S(True, "Jeg letter på speederen og giver forsigtigt gas igen.", "I ease off the accelerator and gently accelerate again.",
    "پایم را از روی گاز برمی‌دارم و دوباره با احتیاط گاز می‌دهم.",
    "Hjulene får bedre greb, når de ikke spinner.", "The wheels get a better grip when they are not spinning.",
    "چرخ‌ها وقتی درجا نمی‌چرخند، چسبندگی بهتری پیدا می‌کنند."),
  S(False, "Jeg giver mere gas, så bilen kommer hurtigere af sted.", "I give more throttle so that the car gets going faster.",
    "بیشتر گاز می‌دهم تا خودرو زودتر راه بیفتد.",
    "Mere gas får hjulene til at spinne endnu mere.", "More throttle makes the wheels spin even more.",
    "گاز بیشتر باعث می‌شود چرخ‌ها بیشتر درجا بچرخند."),
  S(False, "Jeg drejer rattet frem og tilbage, mens jeg giver fuld gas.", "I turn the steering wheel to and fro while giving full throttle.",
    "در حالی که گاز را تا ته فشار می‌دهم، فرمان را به چپ و راست می‌چرخانم.",
    "Det kan få bilen til at skride ud til siden, når hjulene pludselig får greb.",
    "That may make the car slide out to the side when the wheels suddenly grip.",
    "این کار ممکن است وقتی چرخ‌ها ناگهان چسبندگی پیدا کنند، خودرو را به کنار سُر دهد."),
)
