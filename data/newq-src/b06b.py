# «آزمون جدید», batch 6 (5501–5600), part b: stopping and parking (7.18), overtaking (7.9), people beside the road (7.6),
# speed (7.3), the car (1.2), signs (6.1).
# Rules: Færdselsloven §§ 3 stk. 2, 15 stk. 3, 21 stk. 3–4, 26 stk. 3 (ubetinget vigepligt out of a property), 27 stk. 2 and 7,
# 28 stk. 2 (parked lengthwise at the edge of the road), 28 stk. 3 (no stopping or parking on a footpath), 29 stk. 1 nr. 5 (no
# stopping or parking in a viaduct) and nr. 11 (not so that a light-rail vehicle is hindered), 32 stk. 1, 41 stk. 1–2, 67 stk. 3
# (no obviously unsuitable tyres); Bekendtgørelse om vejafmærkning (BEK 425/2023): A 17 «Fodgængerfelt», D 22 «Gangsti» (only
# pedestrians), D 23 «Ridesti» (only riders), D 27 «Fællessti» (shared by the users shown, mutual consideration), Q 44, Q 45
# (no driving, stopping or parking on it); FDM on bays for electric cars (also plug-in hybrids; charging only when the sign
# says so; a time limit with a P-skive); UN Regulation 39 (a speedometer never shows less than the true speed).
from nq import Q, S, picture, town, view

Q(5526, "7.18", town("""
THE SCENE: a town street with light-rail tracks running close along the right kerb, so close that a car parked at the kerb would stand
in the tram's path; the kerb ahead is free; far ahead a light-rail tram approaches on the tracks.
MUST BE CLEARLY VISIBLE: the tracks close to the kerb, the free kerb, the tram far ahead.
MUST NOT APPEAR: signs, text."""),
  "Du vil parkere ved kantstenen på en gade med letbane. Sporet ligger så tæt ved kanten, at letbanen ikke kan komme forbi, hvis "
  "du holder der. Hvad gælder?",
  "You want to park at the kerb in a street with a light rail. The track runs so close to the edge that the tram cannot get past "
  "if you stand there. What applies?",
  "می‌خواهید در خیابانی که قطار شهری سبک دارد کنار جدول پارک کنید. ریل آن‌قدر نزدیک لبه است که اگر آن‌جا بایستید، قطار نمی‌تواند "
  "رد شود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må hverken standse eller parkere der, fordi letbanen så bliver hindret.",
    "I may neither stop nor park there, because the tram would then be hindered.",
    "آن‌جا نه می‌توانم توقف کنم و نه پارک، چون جلوی قطار شهری سبک را می‌گیرم.",
    "Standsning eller parkering må ikke ske på en sådan måde, at kørsel med letbanekøretøj hindres.",
    "Stopping or parking must not be done in such a way that light-rail vehicles are hindered.",
    "توقف یا پارک نباید طوری باشد که جلوی حرکت قطار شهری سبک را بگیرد."),
  S(False, "Jeg må godt holde der, hvis jeg kun er væk et par minutter.", "I may stand there if I am only away for a couple of minutes.",
    "اگر فقط چند دقیقه دور باشم، می‌توانم آن‌جا بایستم.",
    "Forbuddet gælder også kortvarig standsning.", "The ban also applies to a short stop.", "این ممنوعیت شامل توقف کوتاه هم می‌شود."),
  S(False, "Letbanen kan bare vente, til jeg kommer tilbage.", "The tram can just wait until I come back.",
    "قطار شهری سبک می‌تواند صبر کند تا من برگردم.",
    "Du må ikke holde, så letbanen bliver hindret.", "You must not stand where the tram is hindered.",
    "نباید جایی بایستید که جلوی قطار شهری سبک گرفته شود."),
)

Q(5527, "7.18", town("""
THE SCENE: a town street approaching a junction; along the right kerb, just before the junction, lies a hatched area of white diagonal
stripes framed by an unbroken white line; we are about to pull in towards it (our right indicator lamp glows on the dashboard strip).
MUST BE CLEARLY VISIBLE: the hatched area at the kerb, the junction just after it.
MUST NOT APPEAR: signs, text."""),
  "Ved kantstenen lige før et kryds er der et skraveret felt omgivet af en hvid linje. Du vil holde der et øjeblik og sætte en "
  "passager af. Hvad gælder?",
  "At the kerb just before a junction there is a hatched area framed by a white line. You want to stop there for a moment to let "
  "a passenger out. What applies?",
  "کنار جدول درست پیش از یک تقاطع، سطحی هاشورخورده با یک خط سفید دور آن هست. می‌خواهید لحظه‌ای آن‌جا بایستید تا مسافری پیاده "
  "شود. چه قاعده‌ای برقرار است؟",
  S(False, "Jeg må standse på feltet, når det kun er et øjeblik.", "I may stop on the area when it is only for a moment.",
    "وقتی فقط یک لحظه است، می‌توانم روی این سطح بایستم.",
    "På en spærreflade må der hverken køres, standses eller parkeres.", "On a hatched area you may neither drive, stop nor park.",
    "روی سطح هاشورخورده نه می‌شود راند، نه توقف کرد، نه پارک."),
  S(True, "Jeg må ikke køre ind på feltet.", "I must not drive onto the area.", "نباید وارد این سطح شوم.",
    "En spærreflade må ikke køres på.", "A hatched area must not be driven on.", "روی سطح هاشورخورده نباید راند."),
  S(True, "Jeg finder et andet sted, hvor jeg lovligt kan standse.", "I find another place where I can stop legally.",
    "جای دیگری پیدا می‌کنم که بتوانم قانونی توقف کنم.",
    "Passageren må stige ud et sted, hvor det er tilladt at standse.", "The passenger must get out where stopping is allowed.",
    "مسافر باید جایی پیاده شود که توقف در آن مجاز است."),
  S(False, "Feltet betyder, at kun busser må holde der.", "The area means that only buses may stop there.",
    "این سطح یعنی فقط اتوبوس‌ها می‌توانند آن‌جا بایستند.",
    "Et skraveret felt er en spærreflade, hvor ingen må køre, standse eller parkere.",
    "A hatched area is one where nobody may drive, stop or park.",
    "سطح هاشورخورده جایی است که هیچ‌کس نباید روی آن براند، توقف یا پارک کند."),
)

Q(5528, "7.18", view("""
THE SCENE: a road leading under a low railway bridge (a viaduct) with walls on both sides; it is raining heavily, and the narrow space
under the bridge looks dry; we are slowing down as if to pull in under the bridge (our right indicator lamp glows on the dashboard
strip).
MUST BE CLEARLY VISIBLE: the railway bridge over the road, the narrow space under it, the heavy rain.
MUST NOT APPEAR: signs, text, trains.""", cond="heavy rain, wet road"),
  "Det regner kraftigt. Du vil holde ind under en jernbanebro, hvor vejen går under banen, og vente, til det holder op. Hvad gælder?",
  "It is raining heavily. You want to pull in under a railway bridge where the road passes under the railway and wait until it stops. "
  "What applies?",
  "باران شدیدی می‌بارد. می‌خواهید زیر یک پل راه‌آهن که جاده از زیرش می‌گذرد کنار بکشید و صبر کنید تا باران بند بیاید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må hverken standse eller parkere under broen.", "I may neither stop nor park under the bridge.",
    "زیر پل نه می‌توانم توقف کنم و نه پارک.",
    "Standsning og parkering er forbudt i en viadukt.", "Stopping and parking are forbidden in a viaduct.",
    "توقف و پارک در زیرگذرِ زیر پل ممنوع است."),
  S(True, "Andre kan have svært ved at se mig og komme forbi, hvis jeg holder under broen.",
    "Others may find it hard to see me and get past if I stand under the bridge.",
    "اگر زیر پل بایستم، ممکن است دیگران به‌سختی مرا ببینند و از کنارم رد شوند.",
    "Under en viadukt er pladsen ofte smal og udsynet dårligt.", "Under a viaduct the space is often narrow and the view poor.",
    "زیر چنین پلی جا معمولاً تنگ و دید کم است."),
  S(True, "Kan jeg ikke se nok i regnen, sætter jeg farten ned og holder ind et sted, hvor det er tilladt.",
    "If I cannot see enough in the rain, I slow down and pull in where it is allowed.",
    "اگر در باران به اندازه‌ی کافی نمی‌بینم، سرعتم را کم می‌کنم و جایی که مجاز است کنار می‌کشم.",
    "Farten skal passe til sigtbarheden, og du må kun holde, hvor det er tilladt.",
    "The speed must suit the visibility, and you may only stop where it is allowed.",
    "سرعت باید با میزان دید جور باشد و فقط جایی می‌توانید بایستید که مجاز است."),
  S(False, "Det er tilladt, fordi det er farligt at køre i kraftig regn.", "It is allowed because it is dangerous to drive in heavy rain.",
    "مجاز است، چون رانندگی در باران شدید خطرناک است.",
    "Kraftig regn gør ikke standsning tilladt, hvor den er forbudt.", "Heavy rain does not make stopping allowed where it is forbidden.",
    "باران شدید توقف را جایی که ممنوع است مجاز نمی‌کند."),
)

Q(5529, "7.18", town("""
THE SCENE: a residential street without markings; cars are parked lengthwise along the right kerb, and between two of them there is a
short gap, too short for our car to fit in lengthwise.
MUST BE CLEARLY VISIBLE: the cars parked lengthwise, the short gap between two of them.
MUST NOT APPEAR: signs, markings, text."""),
  "Du vil parkere ved kantstenen på en gade uden afmærkning. Pladsen er kort, så du overvejer at stille bilen på tværs med fronten "
  "ind mod kantstenen. Hvad gælder?",
  "You want to park at the kerb in a street without markings. The space is short, so you consider putting the car crosswise, with "
  "its front towards the kerb. What applies?",
  "می‌خواهید در خیابانی بدون خط‌کشی کنار جدول پارک کنید. جا کوتاه است، پس فکر می‌کنید خودرو را عمود بر جدول و با جلوی آن رو به جدول "
  "بگذارید. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen skal holde på langs ved vejens kant.", "The car must stand lengthwise along the edge of the road.",
    "خودرو باید موازی با لبه‌ی جاده بایستد.",
    "Parkering skal ske på langs ved vejens kant, medmindre afmærkningen viser noget andet.",
    "Parking must be lengthwise along the edge of the road, unless markings show otherwise.",
    "پارک باید موازی با لبه‌ی جاده باشد، مگر خط‌کشی چیز دیگری نشان دهد."),
  S(False, "Jeg må stille bilen på tværs, når den ikke stikker mere end en meter ud i kørebanen.",
    "I may put the car crosswise when it does not stick out more than a metre into the carriageway.",
    "اگر خودرو بیش از یک متر به داخل سواره‌رو بیرون نزند، می‌توانم آن را عمود پارک کنم.",
    "Bilen skal holde på langs ved kanten, uanset hvor meget den stikker ud.",
    "The car must stand lengthwise at the edge, however little it sticks out.",
    "خودرو باید موازی با لبه بایستد، هر قدر هم کم بیرون بزند."),
  S(False, "På tværs er altid tilladt, når der ikke er afmærket båse.", "Crosswise is always allowed when no bays are marked.",
    "وقتی جای پارک خط‌کشی نشده، پارک عمودی همیشه مجاز است.",
    "Uden afmærkning skal bilen holde på langs ved kanten.", "Without markings the car must stand lengthwise at the edge.",
    "بدون خط‌کشی، خودرو باید موازی با لبه بایستد."),
  S(False, "Jeg må stille bilen på tværs, hvis jeg tænder havariblinket.", "I may put the car crosswise if I switch on the hazard lights.",
    "اگر چراغ‌های فلاشر را روشن کنم، می‌توانم خودرو را عمود پارک کنم.",
    "Havariblinket ændrer ikke reglerne for, hvordan bilen skal holde.", "The hazard lights do not change the rules for how the car must stand.",
    "چراغ‌های فلاشر قواعد پارک را تغییر نمی‌دهند."),
)

Q(5530, "7.18", town("""
THE SCENE: a car park seen from the driver's seat; a free bay with a charging post beside it is marked by a blue square parking sign
with a white «P» and a white plate under it showing a black symbol of a charging cable with its plug; there is nothing else on the
plate.
MUST BE CLEARLY VISIBLE: the free bay, the charging post, the P sign with the charging-cable plate.
MUST NOT APPEAR: other signs, any text except the P, brand names."""),
  "Du kører i en plugin-hybrid. Pladsen er afmærket med en P-tavle med symbolet for et ladekabel. Der står intet om, at bilen skal "
  "lade. Hvad gælder?",
  "You are driving a plug-in hybrid. The space is marked with a P sign with the symbol of a charging cable. It says nothing about "
  "the car having to charge. What applies?",
  "با یک خودروی هیبریدی شارژی هستید. این جای پارک با تابلوی P و نماد کابل شارژ مشخص شده است. چیزی درباره‌ی لزوم شارژ کردن نوشته "
  "نشده است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må parkere på pladsen, selv om jeg ikke lader bilen op.", "I may park in the space even if I do not charge the car.",
    "حتی اگر خودرو را شارژ نکنم، می‌توانم آن‌جا پارک کنم.",
    "Pladsen er forbeholdt elbiler og plugin-hybrider, og der er kun krav om opladning, når det står på tavlen.",
    "The space is reserved for electric cars and plug-in hybrids, and charging is only required when the sign says so.",
    "این جا مخصوص خودروهای برقی و هیبریدی‌های شارژی است و فقط وقتی تابلو بگوید، شارژ کردن الزامی است."),
  S(True, "Står der på tavlen, at pladsen kun er til opladning, skal bilen lade, mens den holder der.",
    "If the sign says that the space is only for charging, the car must charge while it stands there.",
    "اگر روی تابلو آمده باشد که این جا فقط برای شارژ است، خودرو باید تا وقتی آن‌جاست شارژ شود.",
    "Med et sådant krav er det kun tilladt at holde der, mens bilen lader.", "With such a requirement you may only stand there while the car charges.",
    "با چنین شرطی فقط تا وقتی خودرو شارژ می‌شود می‌توان آن‌جا ماند."),
  S(False, "Kun rene elbiler må holde på pladsen.", "Only fully electric cars may stand in the space.",
    "فقط خودروهای تمام‌برقی می‌توانند آن‌جا بایستند.",
    "Plugin-hybrider må også holde på en plads, der er forbeholdt elbiler.", "Plug-in hybrids may also stand in a space reserved for electric cars.",
    "هیبریدی‌های شارژی هم می‌توانند در جایی که مخصوص خودروهای برقی است بایستند."),
  S(False, "Viser tavlen en tidsgrænse, gælder den ikke for biler, der lader.", "If the sign shows a time limit, it does not apply to cars that are charging.",
    "اگر تابلو محدودیت زمانی نشان دهد، برای خودرویی که شارژ می‌شود معتبر نیست.",
    "En tidsgrænse på tavlen gælder også for elbiler og plugin-hybrider.", "A time limit on the sign also applies to electric cars and plug-in hybrids.",
    "محدودیت زمانیِ روی تابلو برای خودروهای برقی و هیبریدی‌های شارژی هم معتبر است."),
)

Q(5531, "7.9", view("""
THE SCENE: a two-lane country road through open fields in a strong wind from the left (trees bending, a flag at a farm blowing hard);
about 40 m ahead a cyclist rides at the right edge, leaning into the wind; the oncoming lane is free.
MUST BE CLEARLY VISIBLE: the cyclist leaning into the wind, the signs of strong wind, the free oncoming lane.
MUST NOT APPEAR: signs, text.""", cond="strong side wind, dry road"),
  "Det blæser kraftigt fra siden. Du vil overhale en cyklist på landevejen. Hvordan forholder du dig?",
  "There is a strong side wind. You want to overtake a cyclist on a country road. What do you do?",
  "باد شدیدی از پهلو می‌وزد. می‌خواهید در جاده‌ای بیرون شهر از یک دوچرخه‌سوار سبقت بگیرید. چه می‌کنید؟",
  S(True, "Vindstød kan få cyklisten til at slingre ud mod mig, så jeg holder ekstra god afstand.",
    "Gusts may make the cyclist wobble out towards me, so I keep an extra good distance.",
    "تندباد ممکن است دوچرخه‌سوار را به سمت من منحرف کند، پس فاصله‌ی بیشتری می‌گیرم.",
    "Ved overhaling skal du holde tilstrækkelig afstand til siden, og i blæst skal der mere til.",
    "When overtaking you must keep enough side distance, and in wind you need more.",
    "هنگام سبقت باید فاصله‌ی کافی از پهلو داشته باشید و در باد فاصله‌ی بیشتری لازم است."),
  S(True, "Jeg venter, til jeg kan komme helt over i den anden vognbane.", "I wait until I can move fully into the other lane.",
    "صبر می‌کنم تا بتوانم کاملاً وارد خط دیگر شوم.",
    "Så kan du give cyklisten god plads.", "Then you can give the cyclist plenty of room.", "این‌طور می‌توانید به دوچرخه‌سوار جای کافی بدهید."),
  S(True, "Når jeg er ud for cyklisten, tager min bil vinden et øjeblik, og bagefter kan vinden ramme ham igen og få ham til at slingre.",
    "When I am alongside the cyclist, my car shields him from the wind for a moment, and afterwards the wind can hit him again and make "
    "him wobble.",
    "وقتی کنار دوچرخه‌سوار هستم، خودروی من لحظه‌ای جلوی باد را می‌گیرد و بعد باد دوباره به او می‌خورد و ممکن است منحرفش کند.",
    "Skiftet mellem læ og vind kan bringe cyklisten ud af balance.", "The change between shelter and wind can throw the cyclist off balance.",
    "تغییر ناگهانی میان پناه از باد و وزش دوباره‌ی آن ممکن است تعادل دوچرخه‌سوار را به هم بزند."),
  S(False, "Jeg dytter, så cyklisten ved, at jeg kommer, og kører tæt forbi.", "I sound the horn so the cyclist knows I am coming, and pass close by.",
    "بوق می‌زنم تا دوچرخه‌سوار بداند می‌آیم و از نزدیکش رد می‌شوم.",
    "Et dyt kan forskrække cyklisten, og du skal under alle omstændigheder holde god afstand.",
    "A toot can startle the cyclist, and you must keep a good distance in any case.",
    "بوق ممکن است دوچرخه‌سوار را بترساند و در هر حال باید فاصله‌ی کافی بگیرید."),
)

Q(5532, "7.9", view("""
THE SCENE: a straight two-lane country road with a broken centre line; about 40 m ahead a motorcycle rides in our lane; the oncoming
lane is free for a long way.
MUST BE CLEARLY VISIBLE: the motorcycle in our lane, the free oncoming lane.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Du vil overhale en motorcykel på landevejen. Hvordan gør du?",
  "You want to overtake a motorcycle on a country road. How do you do it?",
  "می‌خواهید در جاده‌ای بیرون شهر از یک موتورسیکلت سبقت بگیرید. چطور این کار را می‌کنید؟",
  S(True, "Jeg overhaler den, som var den en bil, og kører helt over i den anden vognbane.",
    "I overtake it as if it were a car and move fully into the other lane.",
    "طوری سبقت می‌گیرم که انگار خودروست و کاملاً وارد خط دیگر می‌شوم.",
    "Du skal holde tilstrækkelig afstand til siden, og motorcyklisten kan svinge til side for et hul eller en sten.",
    "You must keep enough side distance, and the motorcyclist may swerve to avoid a hole or a stone.",
    "باید فاصله‌ی کافی از پهلو داشته باشید و موتورسوار ممکن است برای دوری از چاله یا سنگ به کنار بپیچد."),
  S(False, "Jeg kan overhale den inden for min egen vognbane, fordi motorcyklen er smal.",
    "I can overtake it within my own lane because the motorcycle is narrow.",
    "چون موتورسیکلت باریک است، می‌توانم داخل خط خودم از آن سبقت بگیرم.",
    "Så kommer du alt for tæt på motorcyklisten.", "Then you come far too close to the motorcyclist.", "این‌طور بیش از حد به موتورسوار نزدیک می‌شوید."),
  S(False, "Jeg må overhale den, selv om der er en ubrudt midterlinje, fordi den er smal.",
    "I may overtake it even if there is an unbroken centre line, because it is narrow.",
    "چون باریک است، حتی با وجود خط ممتد وسط می‌توانم از آن سبقت بگیرم.",
    "En spærrelinje må ikke overskrides for at overhale, heller ikke en motorcykel.",
    "An unbroken line must not be crossed to overtake, not even a motorcycle.",
    "برای سبقت نباید از خط ممتد عبور کرد، حتی برای سبقت از موتورسیکلت."),
)

Q(5533, "7.9", view("""
THE SCENE: a two-lane country road in winter; the wheel tracks are clear, but a ridge of snow and slush lies in the middle of the road
between them and along the centre line; about 40 m ahead a slow car throws up slush from its wheels.
MUST BE CLEARLY VISIBLE: the clear wheel tracks, the ridge of slush in the middle of the road, the slow car ahead.
MUST NOT APPEAR: signs, text.""", cond="winter, overcast, snow and slush on the road"),
  "Der ligger sne og sjap midt på vejen mellem hjulsporene. Du vil overhale en langsom bil. Hvad skal du være opmærksom på?",
  "There is snow and slush in the middle of the road between the wheel tracks. You want to overtake a slow car. What must you be aware of?",
  "وسط جاده، بین شیارهای چرخ، برف و گل‌وبرف هست. می‌خواهید از خودرویی کُند سبقت بگیرید. به چه چیزی باید توجه کنید؟",
  S(True, "Når hjulene kører gennem sjappen, kan bilen trække til siden eller skride.",
    "When the wheels run through the slush, the car may pull to one side or skid.",
    "وقتی چرخ‌ها از گل‌وبرف عبور می‌کنند، ممکن است خودرو به یک طرف کشیده شود یا بلغزد.",
    "Sjappen giver et dårligt og ujævnt vejgreb.", "The slush gives poor and uneven grip.", "گل‌وبرف چسبندگی کم و ناهموار ایجاد می‌کند."),
  S(True, "Bilen foran kan sprøjte sjap op på min forrude, så jeg pludselig ikke kan se.",
    "The car in front may throw slush onto my windscreen so that I suddenly cannot see.",
    "خودروی جلو ممکن است گل‌وبرف را روی شیشه‌ی من بپاشد و ناگهان چیزی نبینم.",
    "Du skal regne med sprøjt, når du kører tæt forbi.", "You must expect spray when you pass close by.",
    "وقتی از نزدیک رد می‌شوید، باید انتظار پاشیدن گل‌وبرف را داشته باشید."),
  S(True, "Det kan være bedre at blive bag bilen, til vejen er bedre.", "It may be better to stay behind the car until the road is better.",
    "شاید بهتر باشد تا بهتر شدن جاده پشت آن خودرو بمانم.",
    "En overhaling på glat vej giver ofte meget lidt og øger risikoen.", "Overtaking on a slippery road often gains little and increases the risk.",
    "سبقت در جاده‌ی لغزنده اغلب سود کمی دارد و خطر را بیشتر می‌کند."),
  S(False, "Overhalingen er lige så sikker som på tør vej, når jeg bare kører hurtigt forbi.",
    "The overtaking is as safe as on a dry road as long as I pass quickly.",
    "اگر سریع رد شوم، سبقت به همان اندازه‌ی جاده‌ی خشک ایمن است.",
    "Høj fart på sne og sjap gør det sværere at holde bilen på vejen.", "High speed on snow and slush makes it harder to keep the car on the road.",
    "سرعت زیاد روی برف و گل‌وبرف نگه داشتن خودرو در جاده را دشوارتر می‌کند."),
)

Q(5534, "7.9", view("""
THE SCENE: a very long, straight two-lane country road through flat fields with a broken centre line; about 30 m ahead a slow van; far,
far ahead a small oncoming car can be seen.
MUST BE CLEARLY VISIBLE: the long straight road, the slow van, the small oncoming car far away.
MUST NOT APPEAR: signs, text."""),
  "På en lang, lige vej ser en modkørende bil ud til at være langt væk. Du overvejer at overhale den langsomme varevogn. Hvad gælder?",
  "On a long, straight road an oncoming car seems to be far away. You are considering overtaking the slow van. What applies?",
  "در جاده‌ای طولانی و مستقیم، خودرویی از روبه‌رو دور به نظر می‌رسد. به سبقت از ون کُند فکر می‌کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Det er svært at bedømme den modkørendes afstand og fart på en lang, lige vej.",
    "It is hard to judge the oncoming car's distance and speed on a long, straight road.",
    "در جاده‌ی طولانی و مستقیم، تخمین فاصله و سرعت خودروی روبه‌رو سخت است.",
    "En modkørende bil kan være nærmere og køre hurtigere, end det ser ud til.",
    "An oncoming car can be closer and faster than it looks.",
    "خودروی روبه‌رو ممکن است نزدیک‌تر و سریع‌تر از آن باشد که به نظر می‌رسد."),
  S(True, "Jeg overhaler kun, hvis jeg er helt sikker på, at der er plads nok.", "I only overtake if I am quite sure there is enough room.",
    "فقط وقتی سبقت می‌گیرم که کاملاً مطمئن باشم جای کافی هست.",
    "Vognbanen skal være fri for modkørende på en tilstrækkeligt lang strækning.",
    "The lane must be clear of oncoming traffic for a long enough stretch.",
    "خط باید در مسافت کافی از ترافیک روبه‌رو خالی باشد."),
  S(False, "Når den modkørende bil ser lille ud, er der altid tid nok.", "When the oncoming car looks small, there is always enough time.",
    "وقتی خودروی روبه‌رو کوچک به نظر می‌رسد، همیشه وقت کافی هست.",
    "Både du og den modkørende kører langt, mens overhalingen står på.", "Both you and the oncoming car cover a long way while the overtaking lasts.",
    "تا سبقت تمام شود، هم شما و هم خودروی روبه‌رو مسافت زیادی جلو می‌روید."),
  S(False, "Den modkørende vil sætte farten ned for mig, hvis det bliver nødvendigt.", "The oncoming car will slow down for me if it becomes necessary.",
    "اگر لازم شود، خودروی روبه‌رو برای من سرعتش را کم می‌کند.",
    "Du kan ikke regne med, at den modkørende bremser for dig.", "You cannot count on the oncoming car braking for you.",
    "نمی‌توانید روی ترمز گرفتن خودروی روبه‌رو برای خودتان حساب کنید."),
)

Q(5535, "7.6", view("""
THE SCENE: we stand at the exit of a house driveway on the right side of a town street, about to turn right onto the street; a cycle
path runs across the exit just in front of us; on it, coming from the RIGHT, a cyclist rides towards us against the normal direction of
the path; to the left the cycle path and the road are empty.
MUST BE CLEARLY VISIBLE: the cycle path across the exit, the cyclist coming from the right, the empty path to the left.
MUST NOT APPEAR: signs, text."""),
  "Du skal køre ud fra en indkørsel og svinge til højre. Fra højre kommer en cyklist på cykelstien i den forkerte retning. Hvordan "
  "forholder du dig?",
  "You are about to drive out of a driveway and turn right. From the right a cyclist comes along the cycle path in the wrong "
  "direction. What do you do?",
  "می‌خواهید از یک ورودی خانه خارج شوید و به راست بپیچید. از سمت راست دوچرخه‌سواری در جهت اشتباه روی مسیر دوچرخه می‌آید. چه "
  "می‌کنید؟",
  S(True, "Jeg ser også til højre, fordi der kan komme cyklister i den forkerte retning.",
    "I also look to the right, because cyclists may come in the wrong direction.",
    "به سمت راست هم نگاه می‌کنم، چون ممکن است دوچرخه‌سوارانی در جهت اشتباه بیایند.",
    "Du må ikke regne med, at alle følger reglerne.", "You must not count on everybody following the rules.",
    "نباید روی این حساب کنید که همه قواعد را رعایت می‌کنند."),
  S(True, "Jeg venter, til cyklisten er kommet forbi indkørslen.", "I wait until the cyclist has passed the driveway.",
    "صبر می‌کنم تا دوچرخه‌سوار از جلوی ورودی رد شود.",
    "Ved udkørsel fra en ejendom har du ubetinget vigepligt, og du må ikke køre ind i cyklisten, fordi han kører forkert.",
    "Driving out of a property you must give way, and you must not drive into the cyclist because he is riding the wrong way.",
    "هنگام خروج از ملک باید بی‌قیدوشرط حق تقدم بدهید و نمی‌توانید به این دلیل که او در جهت اشتباه می‌آید با او برخورد کنید."),
  S(False, "Cyklisten kører forkert, så jeg må køre ud foran ham.", "The cyclist is riding the wrong way, so I may drive out in front of him.",
    "دوچرخه‌سوار در جهت اشتباه می‌آید، پس می‌توانم جلوی او خارج شوم.",
    "Andres fejl giver dig ikke lov til at køre ud, når det ikke kan ske uden fare.",
    "Other people's mistakes do not allow you to drive out when it cannot be done safely.",
    "اشتباه دیگران به شما اجازه نمی‌دهد وقتی بی‌خطر نیست خارج شوید."),
  S(False, "Jeg ser kun til venstre, fordi cyklisterne i min side kommer derfra.",
    "I only look to the left, because the cyclists on my side come from there.",
    "فقط به چپ نگاه می‌کنم، چون دوچرخه‌سواران سمت من از آن طرف می‌آیند.",
    "Cyklister kan komme fra begge sider, også i den forkerte retning.", "Cyclists can come from both sides, also in the wrong direction.",
    "دوچرخه‌سواران ممکن است از هر دو طرف بیایند، حتی در جهت اشتباه."),
)

Q(5536, "7.6", view("""
THE SCENE: a country road at night without street lights; about 50 m ahead on the right, in our dipped beam, a bus-stop pole stands at
the edge of the road, and a few young people in dark clothes wait there, one of them standing at the very edge of the carriageway.
MUST BE CLEARLY VISIBLE: the bus stop, the young people in dark clothes, the one at the edge of the carriageway.
MUST NOT APPEAR: signs other than the bus-stop pole, text, buses.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt. Ved et busstoppested på landevejen står nogle unge og venter. Der er ingen gadebelysning. Hvordan forholder du dig?",
  "It is dark. Some young people are waiting at a bus stop on the country road. There are no street lights. What do you do?",
  "هوا تاریک است. کنار یک ایستگاه اتوبوس در جاده‌ی بیرون شهر چند نوجوان منتظرند. چراغ خیابان نیست. چه می‌کنید؟",
  S(True, "Jeg sænker farten, fordi nogen kan træde ud på vejen.", "I slow down because someone may step out into the road.",
    "سرعتم را کم می‌کنم، چون ممکن است کسی وارد جاده شود.",
    "Kan du ikke overskue situationen, skal farten være passende lav.", "When you cannot be sure of the situation, the speed must be suitably low.",
    "وقتی نمی‌توانید وضعیت را کامل ارزیابی کنید، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Folk i mørkt tøj kan være svære at se, især uden refleks.", "People in dark clothes can be hard to see, especially without reflectors.",
    "دیدن افراد با لباس تیره ممکن است سخت باشد، به‌ویژه بدون شبرنگ.",
    "I mørke ses gående uden refleks først meget sent.", "In the dark pedestrians without reflectors are seen very late.",
    "در تاریکی، عابران بدون شبرنگ خیلی دیر دیده می‌شوند."),
  S(True, "Kommer bussen, kan nogen løbe over vejen for at nå den.", "If the bus comes, someone may run across the road to catch it.",
    "اگر اتوبوس بیاید، ممکن است کسی برای رسیدن به آن از عرض جاده بدود.",
    "Folk, der skal nå bussen, ser sig ikke altid for.", "People hurrying for the bus do not always look.",
    "کسانی که برای رسیدن به اتوبوس عجله دارند همیشه به اطراف نگاه نمی‌کنند."),
  S(False, "Jeg skifter til fjernlys, så de unge bliver blændet og bliver stående.",
    "I switch to high beam so that the young people are dazzled and stay where they are.",
    "نور بالا را روشن می‌کنم تا چشم نوجوانان خیره شود و سر جایشان بمانند.",
    "Du må ikke blænde andre, og blænding gør det sværere for dem at se dig og trafikken.",
    "You must not dazzle others, and dazzling makes it harder for them to see you and the traffic.",
    "نباید چشم دیگران را خیره کنید و خیرگی دیدن شما و ترافیک را برایشان سخت‌تر می‌کند."),
)

Q(5537, "7.6", town("""
THE SCENE: a town street with one lane in each direction; about 40 m ahead at the right edge three people push a small car that has
broken down, its hazard lights flashing; one of them walks at the car's left side, partly in our lane.
MUST BE CLEARLY VISIBLE: the people pushing the car, the person walking partly in our lane, the hazard lights.
MUST NOT APPEAR: signs, text."""),
  "Nogle personer skubber en bil, der er gået i stå, langs højre side af vejen. Hvordan forholder du dig?",
  "Some people are pushing a broken-down car along the right side of the road. What do you do?",
  "چند نفر خودرویی را که خاموش شده در سمت راست خیابان هل می‌دهند. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og holder god afstand til dem, når jeg kører forbi.", "I slow down and keep a good distance from them when I pass.",
    "سرعتم را کم می‌کنم و هنگام رد شدن فاصله‌ی کافی از آن‌ها می‌گیرم.",
    "Gående skal have fornøden plads, når du kører forbi.", "Pedestrians must be given enough room when you pass.",
    "وقتی از کنار عابران رد می‌شوید، باید جای کافی به آن‌ها بدهید."),
  S(True, "En af personerne kan pludselig træde ud på vejen.", "One of the people may suddenly step out into the road.",
    "ممکن است یکی از آن‌ها ناگهان وارد خیابان شود.",
    "De har travlt med bilen og ser sig ikke nødvendigvis for.", "They are busy with the car and may not look around.",
    "آن‌ها سرگرم خودرو هستند و ممکن است به اطراف نگاه نکنند."),
  S(False, "Jeg dytter, så de skynder sig.", "I sound the horn so that they hurry.", "بوق می‌زنم تا عجله کنند.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
  S(False, "Jeg kører tæt forbi, fordi bilen kører så langsomt.", "I pass close by because the car is moving so slowly.",
    "چون آن خودرو خیلی آهسته حرکت می‌کند، از نزدیکش رد می‌شوم.",
    "Du skal holde god afstand til de gående ved bilen.", "You must keep a good distance from the people at the car.",
    "باید از افرادی که کنار خودرو هستند فاصله‌ی کافی بگیرید."),
)

Q(5538, "7.6", town("""
THE SCENE: a town street with a zebra crossing without traffic lights about 20 m ahead; a woman stands at the kerb on the right and
waves us on with her hand; on the left pavement a man with a dog walks towards the crossing.
MUST BE CLEARLY VISIBLE: the zebra crossing, the woman waving us on, the man with the dog approaching from the left.
MUST NOT APPEAR: signs, text."""),
  "En kvinde står ved et fodgængerfelt uden lyssignal. Da du sætter farten ned, vinker hun dig forbi. Hvordan forholder du dig?",
  "A woman is standing at a pedestrian crossing without traffic lights. When you slow down, she waves you on. What do you do?",
  "زنی کنار خط عابر پیاده‌ی بدون چراغ ایستاده است. وقتی سرعتتان را کم می‌کنید، با دست به شما اشاره می‌کند که بروید. چه می‌کنید؟",
  S(True, "Jeg sikrer mig, at hun bliver stående, før jeg kører.", "I make sure she stays where she is before I drive on.",
    "پیش از حرکت مطمئن می‌شوم که او سر جایش می‌ماند.",
    "Du skal afpasse farten efter gående, der er på vej ud i feltet.", "You must adjust your speed to pedestrians who are about to step onto the crossing.",
    "باید سرعت را با عابرانی که می‌خواهند وارد خط عابر شوند تنظیم کنید."),
  S(True, "Jeg holder øje med, om andre gående er på vej ud i feltet.", "I watch whether other pedestrians are about to step onto the crossing.",
    "مراقبم که آیا عابران دیگری می‌خواهند وارد خط عابر شوند یا نه.",
    "Manden fra venstre kan gå ud i feltet uden at vente.", "The man from the left may step onto the crossing without waiting.",
    "مردی که از چپ می‌آید ممکن است بی‌آن‌که صبر کند وارد خط عابر شود."),
  S(False, "Når hun vinker, behøver jeg ikke se efter andre gående.", "When she waves, I do not need to look for other pedestrians.",
    "وقتی او اشاره می‌کند، لازم نیست به عابران دیگر نگاه کنم.",
    "Hendes tegn gælder ikke for andre gående.", "Her signal does not apply to other pedestrians.",
    "اشاره‌ی او برای عابران دیگر معتبر نیست."),
  S(False, "Jeg dytter som tak og kører hurtigt forbi.", "I sound the horn as a thank-you and drive past quickly.",
    "به نشانه‌ی تشکر بوق می‌زنم و سریع رد می‌شوم.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5539, "7.3", view("""
THE SCENE: a motorway in a moderate wind, seen from the driver's seat of a car towing a caravan; in both door mirrors (at the left and
right edges of the picture) the caravan can be seen swinging out to one side.
MUST BE CLEARLY VISIBLE: the caravan swinging out in the door mirrors.
MUST NOT APPEAR: signs, text, brand names.""", cond="moderate wind, dry road"),
  "Du kører med campingvogn, og den begynder at slingre fra side til side. Hvordan forholder du dig?",
  "You are towing a caravan, and it starts to sway from side to side. What do you do?",
  "با کاروان می‌رانید و کاروان شروع به تاب خوردن از این سو به آن سو می‌کند. چه می‌کنید؟",
  S(True, "Jeg slipper speederen og holder rattet så roligt som muligt.", "I take my foot off the accelerator and hold the wheel as steady as possible.",
    "پایم را از روی گاز برمی‌دارم و فرمان را تا حد ممکن ثابت نگه می‌دارم.",
    "Når farten falder, holder slingringen som regel op.", "When the speed drops, the swaying usually stops.",
    "وقتی سرعت کم شود، تاب خوردن معمولاً متوقف می‌شود."),
  S(True, "Bagefter kører jeg langsommere, fordi høj fart øger risikoen for, at vognen slingrer.",
    "Afterwards I drive more slowly, because high speed increases the risk of the caravan swaying.",
    "پس از آن آهسته‌تر می‌رانم، چون سرعت زیاد خطر تاب خوردن کاروان را بیشتر می‌کند.",
    "Et vogntog er mere stabilt ved lavere fart.", "A car and caravan are more stable at a lower speed.",
    "خودرو و کاروان با سرعت کمتر پایدارترند."),
  S(False, "Jeg drejer hurtigt rattet frem og tilbage for at modvirke slingringen.",
    "I turn the wheel quickly back and forth to counter the swaying.",
    "برای مقابله با تاب خوردن، فرمان را سریع به چپ و راست می‌چرخانم.",
    "Hurtige rattebevægelser kan gøre slingringen værre.", "Quick steering movements can make the swaying worse.",
    "حرکت‌های سریع فرمان ممکن است تاب خوردن را بدتر کند."),
  S(False, "Jeg bremser så hårdt, jeg kan, mens vognen slingrer.", "I brake as hard as I can while the caravan is swaying.",
    "تا وقتی کاروان تاب می‌خورد، تا جای ممکن محکم ترمز می‌گیرم.",
    "En hård opbremsning midt i slingringen kan få vogntoget til at knække sammen.",
    "Braking hard in the middle of the swaying can make the car and caravan jackknife.",
    "ترمز شدید وسط تاب خوردن ممکن است باعث تا شدن خودرو و کاروان شود."),
)

Q(5540, "7.3", picture("""
A close-up of a car's speedometer dial with the needle pointing at 80 km/h.
MUST BE CLEARLY VISIBLE: the needle at 80 and the numbers on the dial.
MUST NOT APPEAR: any other text, brand names."""),
  "Speedometeret viser 80 km/t. Hvad gælder?",
  "The speedometer shows 80 km/h. What applies?",
  "سرعت‌سنج ۸۰ کیلومتر بر ساعت را نشان می‌دهد. چه قاعده‌ای برقرار است؟",
  S(True, "Den faktiske fart er som regel lidt lavere end det, speedometeret viser.", "The actual speed is usually a little lower than what the speedometer shows.",
    "سرعت واقعی معمولاً کمی کمتر از عددی است که سرعت‌سنج نشان می‌دهد.",
    "Et speedometer må ikke vise mindre end den faktiske fart, så det viser typisk lidt for meget.",
    "A speedometer must never show less than the actual speed, so it typically shows a little too much.",
    "سرعت‌سنج نباید کمتر از سرعت واقعی نشان دهد، پس معمولاً کمی بیشتر نشان می‌دهد."),
  S(False, "Jeg kan altid køre 10 km/t over grænsen, fordi speedometeret viser for meget.",
    "I can always drive 10 km/h over the limit because the speedometer shows too much.",
    "همیشه می‌توانم ۱۰ کیلومتر بر ساعت بیشتر از حد مجاز بروم، چون سرعت‌سنج بیشتر نشان می‌دهد.",
    "Hastighedsgrænsen gælder din faktiske fart, og forskellen er som regel lille.",
    "The speed limit applies to your actual speed, and the difference is usually small.",
    "حد سرعت برای سرعت واقعی شماست و این اختلاف معمولاً کم است."),
  S(False, "Speedometeret viser altid mindre end den faktiske fart.", "The speedometer always shows less than the actual speed.",
    "سرعت‌سنج همیشه کمتر از سرعت واقعی نشان می‌دهد.",
    "Det er omvendt: det må ikke vise mindre end den faktiske fart.", "It is the other way round: it must not show less than the actual speed.",
    "برعکس است: سرعت‌سنج نباید کمتر از سرعت واقعی نشان دهد."),
)

Q(5541, "7.3", view("""
THE SCENE: a motorway seen from the driver's seat in the LEFT of two lanes; the right lane is a standing queue of cars waiting for an
exit further ahead; in the queue a car has its left indicator flashing and its front is starting to move out into our lane.
MUST BE CLEARLY VISIBLE: the standing queue in the right lane, the car starting to move out into our lane.
MUST NOT APPEAR: signs, text."""),
  "På motorvejen holder der kø i højre vognbane foran en frakørsel, mens du kører 110 km/t i venstre vognbane. Hvad skal du være "
  "opmærksom på?",
  "On the motorway there is a queue in the right lane before an exit, while you are doing 110 km/h in the left lane. What must you be "
  "aware of?",
  "در آزادراه، پیش از یک خروجی در خط راست صف بسته شده، در حالی که شما در خط چپ با ۱۱۰ کیلومتر بر ساعت می‌رانید. به چه چیزی باید "
  "توجه کنید؟",
  S(True, "Biler fra køen kan pludselig skifte ud i min vognbane.", "Cars from the queue may suddenly move out into my lane.",
    "ممکن است خودروهایی از صف ناگهان وارد خط من شوند.",
    "Nogle førere opgiver køen eller skifter vognbane uden at se sig ordentligt for.",
    "Some drivers give up the queue or change lanes without looking properly.",
    "برخی رانندگان از صف منصرف می‌شوند یا بدون نگاه کافی خط عوض می‌کنند."),
  S(True, "Jeg sætter farten ned, så forskellen i fart mellem vognbanerne ikke er så stor.",
    "I slow down so that the difference in speed between the lanes is not so great.",
    "سرعتم را کم می‌کنم تا اختلاف سرعت بین دو خط زیاد نباشد.",
    "Jo større fartforskel, desto mindre tid har du til at reagere.", "The greater the difference in speed, the less time you have to react.",
    "هرچه اختلاف سرعت بیشتر باشد، زمان کمتری برای واکنش دارید."),
  S(False, "Bilerne i køen skal blive i deres vognbane, så jeg kan køre videre med samme fart.",
    "The cars in the queue must stay in their lane, so I can carry on at the same speed.",
    "خودروهای صف باید در خط خودشان بمانند، پس می‌توانم با همان سرعت ادامه دهم.",
    "Du skal tilpasse farten efter forholdene, også når andre burde blive i deres vognbane.",
    "You must adapt your speed to the conditions, even when others ought to stay in their lane.",
    "باید سرعت را با شرایط تنظیم کنید، حتی وقتی دیگران باید در خط خود بمانند."),
  S(False, "Jeg sætter farten op for hurtigt at komme forbi køen.", "I speed up to get past the queue quickly.",
    "سرعتم را بالا می‌برم تا سریع از کنار صف رد شوم.",
    "Højere fart gør fartforskellen og faren større.", "A higher speed makes the speed difference and the danger greater.",
    "سرعت بیشتر اختلاف سرعت و خطر را بیشتر می‌کند."),
)

Q(5542, "1.2", picture("""
A close-up of a car's instrument panel while driving: among the dials a red warning lamp is lit showing a battery symbol (a small
rectangle with a plus and a minus sign); the other lamps are dark.
MUST BE CLEARLY VISIBLE: the lit red battery lamp.
MUST NOT APPEAR: text, brand names, numbers other than on the dials."""),
  "Under kørslen begynder denne røde lampe med et batterisymbol at lyse. Hvad gælder?",
  "While you are driving, this red lamp with a battery symbol lights up. What applies?",
  "هنگام رانندگی این چراغ قرمز با نماد باتری روشن می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Batteriet bliver ikke ladet op, og bilen kan gå i stå, når strømmen er brugt.",
    "The battery is not being charged, and the car may stop when the power runs out.",
    "باتری شارژ نمی‌شود و وقتی برقش تمام شود، ممکن است خودرو خاموش شود.",
    "Lampen viser, at bilens ladesystem ikke virker.", "The lamp shows that the car's charging system is not working.",
    "این چراغ نشان می‌دهد که سیستم شارژ خودرو کار نمی‌کند."),
  S(True, "Jeg standser et sikkert sted og får fejlen undersøgt, før jeg kører langt.",
    "I stop in a safe place and have the fault checked before I drive far.",
    "در جایی امن می‌ایستم و پیش از رفتن به مسافت زیاد، ایراد را بررسی می‌کنم.",
    "En rød advarselslampe betyder som regel, at der er en alvorlig fejl.", "A red warning lamp usually means a serious fault.",
    "چراغ هشدار قرمز معمولاً یعنی ایرادی جدی وجود دارد."),
  S(False, "Lampen viser, at batteriet er ved at blive opladet.", "The lamp shows that the battery is being charged.",
    "این چراغ نشان می‌دهد که باتری در حال شارژ شدن است.",
    "Den lyser netop, når batteriet ikke bliver ladet op.", "It lights up precisely when the battery is not being charged.",
    "این چراغ درست وقتی روشن می‌شود که باتری شارژ نمی‌شود."),
  S(False, "Lampen er kun en påmindelse om service, så jeg kører videre som normalt.",
    "The lamp is only a service reminder, so I carry on as normal.",
    "این چراغ فقط یادآور سرویس است، پس مثل همیشه ادامه می‌دهم.",
    "Kører du videre, kan bilen gå i stå på et farligt sted.", "If you carry on, the car may stop in a dangerous place.",
    "اگر ادامه دهید، ممکن است خودرو در جای خطرناکی خاموش شود."),
)

Q(5543, "1.2", picture("""
A car's instrument panel seen from the driver's seat: the needle of the temperature gauge stands in the red zone, and a red warning lamp
with a thermometer symbol is lit; through the windscreen steam can be seen rising from under the bonnet.
MUST BE CLEARLY VISIBLE: the gauge in the red zone, the lit thermometer lamp, the steam from the bonnet.
MUST NOT APPEAR: text, brand names."""),
  "Temperaturmåleren står i det røde felt, og der kommer damp op fra motorhjelmen. Hvad gør du?",
  "The temperature gauge is in the red zone, and steam is rising from the bonnet. What do you do?",
  "عقربه‌ی دماسنج در ناحیه‌ی قرمز است و از زیر کاپوت بخار بلند می‌شود. چه می‌کنید؟",
  S(True, "Jeg standser et sikkert sted og slukker motoren.", "I stop in a safe place and switch off the engine.",
    "در جایی امن می‌ایستم و موتور را خاموش می‌کنم.",
    "Motoren er overophedet og kan tage alvorlig skade, hvis du kører videre.",
    "The engine is overheating and can be seriously damaged if you carry on.",
    "موتور بیش از حد داغ شده و اگر ادامه دهید ممکن است آسیب جدی ببیند."),
  S(True, "Jeg åbner ikke kølerens dæksel, mens motoren er varm.", "I do not open the radiator cap while the engine is hot.",
    "تا وقتی موتور داغ است، در رادیاتور را باز نمی‌کنم.",
    "Den varme kølevæske er under tryk og kan sprøjte ud og skolde dig.", "The hot coolant is under pressure and can spurt out and scald you.",
    "مایع خنک‌کننده‌ی داغ تحت فشار است و ممکن است بیرون بپاشد و شما را بسوزاند."),
  S(True, "Når motoren er kølet af, kontrollerer jeg kølevæsken eller får hjælp.",
    "When the engine has cooled down, I check the coolant or get help.",
    "وقتی موتور خنک شد، مایع خنک‌کننده را بررسی می‌کنم یا کمک می‌گیرم.",
    "For lidt kølevæske eller en utæthed er en almindelig årsag.", "Too little coolant or a leak is a common cause.",
    "کم بودن مایع خنک‌کننده یا نشتی آن علت رایجی است."),
  S(False, "Jeg kører videre med høj fart, så fartvinden køler motoren.", "I carry on at high speed so that the wind cools the engine.",
    "با سرعت زیاد ادامه می‌دهم تا باد موتور را خنک کند.",
    "Motoren bliver kun varmere, og skaden kan blive større.", "The engine only gets hotter, and the damage may get worse.",
    "موتور فقط داغ‌تر می‌شود و آسیب ممکن است بیشتر شود."),
)

Q(5544, "1.2", picture("""
A close-up of a car tyre's sidewall with a clear bulge on it (a rounded swelling about the size of an egg); the tread of the tyre looks
fine.
MUST BE CLEARLY VISIBLE: the bulge on the sidewall, the normal-looking tread.
MUST NOT APPEAR: text, brand names, numbers."""),
  "Du opdager en bule på siden af det ene dæk. Hvad gælder?",
  "You notice a bulge on the side of one of the tyres. What applies?",
  "متوجه برآمدگی‌ای روی دیواره‌ی کناری یکی از لاستیک‌ها می‌شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Dækket kan pludselig blive sprængt, så jeg skifter det, før jeg kører videre.",
    "The tyre may suddenly burst, so I change it before I drive on.",
    "ممکن است لاستیک ناگهان بترکد، پس پیش از ادامه دادن آن را عوض می‌کنم.",
    "En bule viser, at dækkets indre opbygning er beskadiget, og dækket er ikke længere egnet.",
    "A bulge shows that the tyre's inner structure is damaged, and the tyre is no longer fit for use.",
    "برآمدگی نشان می‌دهد ساختار داخلی لاستیک آسیب دیده و دیگر مناسب نیست."),
  S(False, "Det er i orden, så længe mønsterdybden er mindst 1,6 mm.", "It is fine as long as the tread depth is at least 1.6 mm.",
    "تا وقتی عمق آج دست‌کم ۱٫۶ میلی‌متر است، اشکالی ندارد.",
    "Et beskadiget dæk er uegnet, uanset mønsterdybden.", "A damaged tyre is unfit, whatever the tread depth.",
    "لاستیک آسیب‌دیده، هر قدر هم آج داشته باشد، مناسب نیست."),
  S(False, "Jeg pumper dækket hårdere, så bulen forsvinder.", "I pump the tyre harder so that the bulge disappears.",
    "لاستیک را بیشتر باد می‌کنم تا برآمدگی از بین برود.",
    "Mere luft gør ikke skaden mindre og kan få dækket til at springe.", "More air does not make the damage smaller and may make the tyre burst.",
    "باد بیشتر آسیب را کم نمی‌کند و ممکن است لاستیک را بترکاند."),
)

Q(5545, "1.2", picture("""
The driver's seat of a car seen through the open driver's door: a person sits in the seat, one hand on the seat-adjustment lever, the
seat belt hanging ready; the interior mirror and the left door mirror are visible, and the head restraint is level with the top of the
person's head.
MUST BE CLEARLY VISIBLE: the hand on the seat lever, the mirrors, the head restraint.
MUST NOT APPEAR: text, brand names."""),
  "Du skal køre en bil, som en anden lige har kørt i. Hvad gør du, før du kører?",
  "You are going to drive a car that someone else has just driven. What do you do before you drive off?",
  "می‌خواهید خودرویی را برانید که شخص دیگری تازه رانده است. پیش از حرکت چه می‌کنید؟",
  S(True, "Jeg indstiller sædet, så jeg kan træde pedalerne helt ned med let bøjede ben.",
    "I adjust the seat so that I can press the pedals right down with my legs slightly bent.",
    "صندلی را طوری تنظیم می‌کنم که با پاهای کمی خم بتوانم پدال‌ها را کامل فشار دهم.",
    "Så kan du betjene pedalerne sikkert, også ved en hård opbremsning.", "Then you can use the pedals safely, also when braking hard.",
    "این‌طور می‌توانید پدال‌ها را با اطمینان به کار ببرید، حتی هنگام ترمز شدید."),
  S(True, "Jeg indstiller spejlene, før jeg kører, ikke under kørslen.", "I adjust the mirrors before I drive off, not while driving.",
    "آینه‌ها را پیش از حرکت تنظیم می‌کنم، نه هنگام رانندگی.",
    "Under kørslen skal din opmærksomhed være på trafikken.", "While driving your attention must be on the traffic.",
    "هنگام رانندگی توجه شما باید به ترافیک باشد."),
  S(True, "Jeg indstiller nakkestøtten og tager sikkerhedsselen på.", "I adjust the head restraint and put on the seat belt.",
    "پشت‌سری را تنظیم می‌کنم و کمربند ایمنی را می‌بندم.",
    "Nakkestøtten skal passe til dig, og selen skal bruges under kørslen.", "The head restraint must fit you, and the belt must be worn while driving.",
    "پشت‌سری باید با قد شما جور باشد و کمربند باید هنگام رانندگی بسته باشد."),
  S(False, "Jeg sidder så langt fra rattet som muligt, så airbaggen ikke kan ramme mig.",
    "I sit as far from the steering wheel as possible so that the airbag cannot hit me.",
    "تا جای ممکن دور از فرمان می‌نشینم تا کیسه‌ی هوا به من نخورد.",
    "Du skal kunne nå rattet og pedalerne ordentligt; sidder du for langt væk, mister du kontrollen.",
    "You must be able to reach the wheel and pedals properly; if you sit too far away, you lose control.",
    "باید بتوانید به‌خوبی به فرمان و پدال‌ها برسید؛ اگر خیلی دور بنشینید، کنترل را از دست می‌دهید."),
)

Q(5546, "1.2", view("""
THE SCENE: the view through the windscreen in rain at dusk; the inside of the windscreen is misted up, so the road ahead and a car in
front are only faintly visible; on the dashboard the vents point towards the windscreen.
MUST BE CLEARLY VISIBLE: the misted windscreen, the faint road and car ahead.
MUST NOT APPEAR: signs, text, brand names.""", cond="rain, dusk, wet road"),
  "Det regner, og ruderne begynder at dugge til indvendig, mens du kører. Hvad gør du?",
  "It is raining, and the windows start to mist up on the inside while you are driving. What do you do?",
  "باران می‌بارد و هنگام رانندگی شیشه‌ها از داخل بخار می‌گیرند. چه می‌کنید؟",
  S(True, "Jeg blæser luft mod forruden og bruger aircondition, hvis bilen har det.",
    "I blow air onto the windscreen and use the air conditioning if the car has it.",
    "هوا را روی شیشه‌ی جلو می‌دمم و اگر خودرو کولر دارد از آن استفاده می‌کنم.",
    "Aircondition tørrer luften, så duggen forsvinder hurtigere.", "Air conditioning dries the air, so the mist clears faster.",
    "کولر هوا را خشک می‌کند و بخار زودتر از بین می‌رود."),
  S(True, "Kan jeg ikke se ordentligt ud, standser jeg et sikkert sted, til ruderne er klare.",
    "If I cannot see out properly, I stop in a safe place until the windows are clear.",
    "اگر نتوانم به‌خوبی بیرون را ببینم، در جایی امن می‌ایستم تا شیشه‌ها پاک شوند.",
    "Du må kun køre, når du har tilstrækkeligt udsyn.", "You may only drive when you have a sufficient view.",
    "فقط وقتی دید کافی دارید می‌توانید رانندگی کنید."),
  S(False, "Jeg slår recirkulation til, så den fugtige luft udefra ikke kommer ind.",
    "I switch on recirculation so that the damp air from outside does not get in.",
    "گردش هوای داخلی را روشن می‌کنم تا هوای مرطوب بیرون وارد نشود.",
    "Med recirkulation bliver den fugtige luft i bilen, og ruderne dugger endnu mere.",
    "With recirculation the damp air stays in the car, and the windows mist up even more.",
    "با گردش هوای داخلی، هوای مرطوب در خودرو می‌ماند و شیشه‌ها بیشتر بخار می‌گیرند."),
  S(False, "Jeg tørrer forruden med hånden, mens jeg kører.", "I wipe the windscreen with my hand while driving.",
    "هنگام رانندگی شیشه‌ی جلو را با دست پاک می‌کنم.",
    "Det giver striber og tager din opmærksomhed fra trafikken.", "It leaves streaks and takes your attention off the traffic.",
    "این کار رد به جا می‌گذارد و توجه شما را از ترافیک دور می‌کند."),
)

Q(5547, "6.1", view("""
THE SCENE: a two-way road approaching a village; on the right verge stands a red-bordered white warning triangle (point up) showing a
black walking person on a zebra crossing (the Danish warning sign for a pedestrian crossing); further ahead a zebra crossing can be seen.
MUST BE CLEARLY VISIBLE: the warning sign with the walking person on the crossing, the zebra crossing further ahead.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Hvad betyder den?",
  "You pass this sign. What does it mean?",
  "از کنار این تابلو می‌گذرید. معنی‌اش چیست؟",
  S(True, "Der kommer et fodgængerfelt længere fremme.", "There is a pedestrian crossing further ahead.", "جلوتر یک خط عابر پیاده هست.",
    "Tavlen advarer om et fodgængerfelt.", "The sign warns of a pedestrian crossing.", "این تابلو درباره‌ی خط عابر پیاده هشدار می‌دهد."),
  S(True, "Jeg sænker farten og holder øje med gående ved feltet.", "I slow down and watch for pedestrians at the crossing.",
    "سرعتم را کم می‌کنم و مراقب عابران کنار خط عابر هستم.",
    "Du skal afpasse farten, så gående i feltet eller på vej ud i det ikke kommer i fare.",
    "You must adjust your speed so that pedestrians on the crossing or about to step onto it are not endangered.",
    "باید سرعت را طوری تنظیم کنید که عابرانی که روی خط عابرند یا می‌خواهند وارد آن شوند در خطر نیفتند."),
  S(False, "Gående ved feltet skal holde tilbage for mig.", "Pedestrians at the crossing must give way to me.",
    "عابران کنار خط عابر باید به من حق تقدم بدهند.",
    "Du skal holde tilbage for gående, der er i feltet eller på vej ud i det.", "You must give way to pedestrians on the crossing or about to step onto it.",
    "شما باید به عابرانی که روی خط عابرند یا می‌خواهند وارد آن شوند راه بدهید."),
  S(False, "Tavlen står lige ved selve fodgængerfeltet.", "The sign stands right at the pedestrian crossing itself.",
    "این تابلو درست کنار خود خط عابر نصب شده است.",
    "Det er en advarselstavle, som står et stykke før fodgængerfeltet.", "It is a warning sign that stands some way before the pedestrian crossing.",
    "این تابلوی هشدار است که مدتی پیش از خط عابر نصب می‌شود."),
)

Q(5548, "6.1", view("""
THE SCENE: a road with a separate path beside it on the right; at the start of the path stands a round blue sign showing a white walking
person (the Danish footpath sign); two people walk on the path.
MUST BE CLEARLY VISIBLE: the round blue sign with the walking person, the path with the walkers.
MUST NOT APPEAR: other signs, text, bicycles."""),
  "Langs vejen er der en sti med denne tavle. Hvad betyder den?",
  "Along the road there is a path with this sign. What does it mean?",
  "کنار جاده مسیری با این تابلو هست. معنی‌اش چیست؟",
  S(True, "Stien er kun for gående.", "The path is only for pedestrians.", "این مسیر فقط برای عابران پیاده است.",
    "Tavlen angiver en sti, der kun må benyttes af gående.", "The sign marks a path that may only be used by pedestrians.",
    "این تابلو مسیری را نشان می‌دهد که فقط عابران پیاده می‌توانند از آن استفاده کنند."),
  S(False, "Cyklister må også køre på stien.", "Cyclists may also ride on the path.", "دوچرخه‌سواران هم می‌توانند در این مسیر برانند.",
    "Stien er kun for gående.", "The path is only for pedestrians.", "این مسیر فقط برای عابران است."),
  S(False, "Jeg må standse kort på stien for at sætte en passager af.", "I may stop briefly on the path to let a passenger out.",
    "می‌توانم کوتاه روی این مسیر بایستم تا مسافری پیاده شود.",
    "Standsning og parkering må ikke ske på en gangsti.", "Stopping and parking must not take place on a footpath.",
    "توقف و پارک روی مسیر پیاده ممنوع است."),
)

Q(5549, "6.1", view("""
THE SCENE: a country road with a separate path along it on the right, behind a strip of grass; at the start of the path stands a round
blue sign showing a white horse with a rider (the Danish bridle-path sign); a rider on a horse uses the path.
MUST BE CLEARLY VISIBLE: the round blue sign with the horse and rider, the rider on the path.
MUST NOT APPEAR: other signs, text."""),
  "Ved vejen er der en sti med denne tavle. Hvad betyder den?",
  "Beside the road there is a path with this sign. What does it mean?",
  "کنار جاده مسیری با این تابلو هست. معنی‌اش چیست؟",
  S(True, "Stien er kun for ridende.", "The path is only for riders.", "این مسیر فقط برای سوارکاران است.",
    "Tavlen angiver en sti, der kun må benyttes af ridende.", "The sign marks a path that may only be used by riders.",
    "این تابلو مسیری را نشان می‌دهد که فقط سوارکاران می‌توانند از آن استفاده کنند."),
  S(False, "Gående og cyklister må også bruge stien.", "Pedestrians and cyclists may also use the path.",
    "عابران و دوچرخه‌سواران هم می‌توانند از این مسیر استفاده کنند.",
    "Stien er kun for ridende.", "The path is only for riders.", "این مسیر فقط برای سوارکاران است."),
  S(False, "Tavlen advarer om, at der kan være ryttere på kørebanen længere fremme.",
    "The sign warns that there may be riders on the carriageway further ahead.",
    "این تابلو هشدار می‌دهد که جلوتر ممکن است سوارکارانی روی سواره‌رو باشند.",
    "Det gør den trekantede advarselstavle med en rytter; den blå, runde tavle angiver en sti for ridende.",
    "That is what the triangular warning sign with a rider does; the round blue sign marks a path for riders.",
    "این کارِ تابلوی هشدار مثلثی با نقش سوارکار است؛ تابلوی گرد آبی مسیری برای سوارکاران را نشان می‌دهد."),
  S(False, "Stien må bruges af alle, når der ikke er ryttere på den.", "The path may be used by anyone when there are no riders on it.",
    "وقتی سوارکاری در این مسیر نیست، همه می‌توانند از آن استفاده کنند.",
    "Stien er forbeholdt ridende, uanset om der er nogen på den.", "The path is reserved for riders whether or not anyone is on it.",
    "این مسیر مخصوص سوارکاران است، چه کسی در آن باشد چه نه."),
)

Q(5550, "6.1", view("""
THE SCENE: the entrance to a path beside a road; at the entrance stands a round blue sign showing a white bicycle above a white walking
person, with no dividing line between them (the Danish shared-path sign); a cyclist and a walker use the path side by side.
MUST BE CLEARLY VISIBLE: the round blue sign with the bicycle and the walking person, the cyclist and the walker on the path.
MUST NOT APPEAR: other signs, text."""),
  "Ved indkørslen til en sti står denne tavle. Hvad betyder den?",
  "This sign stands at the entrance to a path. What does it mean?",
  "در ورودی یک مسیر این تابلو قرار دارد. معنی‌اش چیست؟",
  S(True, "Stien skal deles af de trafikanter, som tavlens symboler viser.", "The path is shared by the road users shown by the sign's symbols.",
    "این مسیر میان کاربرانی مشترک است که نمادهای تابلو نشان می‌دهند.",
    "Tavlen angiver en fællessti for flere slags trafikanter.", "The sign marks a shared path for several kinds of road users.",
    "این تابلو مسیری مشترک برای چند نوع کاربر راه را نشان می‌دهد."),
  S(True, "Trafikanterne på stien skal vise hinanden gensidigt hensyn.", "The road users on the path must show each other mutual consideration.",
    "کاربران این مسیر باید ملاحظه‌ی یکدیگر را بکنند.",
    "På en fællessti skal de forskellige trafikanter tage hensyn til hinanden.", "On a shared path the different road users must show consideration for each other.",
    "در مسیر مشترک، کاربران مختلف باید ملاحظه‌ی همدیگر را داشته باشند."),
  S(False, "Cyklisterne har altid forkørselsret for de gående på stien.", "The cyclists always have right of way over the pedestrians on the path.",
    "در این مسیر، دوچرخه‌سواران همیشه بر عابران حق تقدم دارند.",
    "På en fællessti gælder gensidigt hensyn, ikke en fast forkørselsret.", "On a shared path mutual consideration applies, not a fixed right of way.",
    "در مسیر مشترک، ملاحظه‌ی متقابل برقرار است، نه حق تقدم ثابت."),
  S(False, "Jeg må køre bil på stien, hvis jeg kører langsomt.", "I may drive a car on the path if I drive slowly.",
    "اگر آهسته برانم، می‌توانم با خودرو وارد این مسیر شوم.",
    "Stien er kun for de trafikanter, som tavlens symboler viser.", "The path is only for the road users shown by the sign's symbols.",
    "این مسیر فقط برای کاربرانی است که نمادهای تابلو نشان می‌دهند."),
)
