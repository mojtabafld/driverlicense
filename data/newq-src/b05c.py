# «آزمون جدید», batch 5 (5401–5500), part c: straight on at junctions (7.12), left turns (7.14), right turns (7.13), meeting
# (7.7), approaching junctions (7.11), lane changes (7.4).
# Rules: Færdselsloven §§ 3, 7 stk. 2, 15 stk. 1 and 3, 16, 18 stk. 2, 20 stk. 1, 24 (in dense traffic in several lanes passing
# in another lane is not overtaking; lanes are changed only when needed), 26 stk. 3–7 (car park exits, the right-hand rule,
# turning across cycle paths, not into a junction that cannot be left), 27 stk. 5 and 8 (turning: give pedestrians crossing
# the new road unhindered passage; avoid stopping on a crossing), 32 stk. 1–2, 41 stk. 1–2; Bekendtgørelse om vejafmærkning
# (B 11 with S 11, R 11 lane arrows followed from that lane, § 54 blue S 21 cycle crossing, § 65 green and yellow).
from nq import Q, S, above, town, view

Q(5451, "7.12", view("""
THE SCENE: a crossroads with traffic lights showing green for us. Just after the junction there is a zebra crossing, and beyond it a
queue of cars stands still in our lane; the last car stands only just beyond the crossing.
MUST BE CLEARLY VISIBLE: our green light, the zebra crossing after the junction, the queue just beyond it.
MUST NOT APPEAR: text."""),
  "Du har grønt lys og skal ligeud. Lige efter krydset er der et fodgængerfelt, og bilerne efter det holder i kø. Hvordan forholder du dig?",
  "You have a green light and are going straight on. Just after the junction there is a pedestrian crossing, and the cars after it are standing in a queue. What do you do?",
  "چراغ شما سبز است و باید مستقیم بروید. درست بعد از تقاطع گذرگاه عابر پیاده‌ای هست و خودروهای بعد از آن در صف ایستاده‌اند. چه می‌کنید؟",
  S(True, "Jeg venter før krydset, til der er plads til bilen efter fodgængerfeltet.", "I wait before the junction until there is room for the car after the crossing.",
    "پیش از تقاطع صبر می‌کنم تا بعد از گذرگاه برای خودرو جا باشد.",
    "Du må ikke køre ind i et kryds, du ikke kan komme ud af, og du skal undgå at holde på et fodgængerfelt.",
    "You must not drive into a junction you cannot leave, and you must avoid standing on a pedestrian crossing.",
    "نباید وارد تقاطعی شوید که نمی‌توانید از آن خارج شوید و باید از ایستادن روی گذرگاه عابر پیاده پرهیز کنید."),
  S(True, "Jeg holder ikke på fodgængerfeltet.", "I do not stand on the pedestrian crossing.", "روی گذرگاه عابر پیاده نمی‌ایستم.",
    "Du skal undgå at standse på et fodgængerfelt, så de gående kan komme over.", "You must avoid stopping on a pedestrian crossing, so that pedestrians can get across.",
    "باید از توقف روی گذرگاه عابر پرهیز کنید تا عابران بتوانند رد شوند."),
  S(False, "Jeg kører frem, fordi jeg har grønt, og holder på feltet, til køen kører.",
    "I drive forward because I have a green light and stand on the crossing until the queue moves.",
    "چون چراغم سبز است جلو می‌روم و تا حرکت صف روی گذرگاه می‌ایستم.",
    "Grønt lys giver ikke lov til at spærre krydset eller fodgængerfeltet.", "A green light does not allow you to block the junction or the crossing.",
    "چراغ سبز اجازه‌ی بستن تقاطع یا گذرگاه را نمی‌دهد."),
  S(False, "De gående må gå uden om min bil, hvis jeg kommer til at holde på feltet.",
    "The pedestrians can walk round my car if I end up standing on the crossing.",
    "اگر روی گذرگاه بمانم، عابران می‌توانند از دور خودروی من رد شوند.",
    "Du skal undgå at spærre feltet for de gående.", "You must avoid blocking the crossing for pedestrians.", "باید از بستن گذرگاه برای عابران پرهیز کنید."),
)

Q(5452, "7.12", above("""
THE SCENE: a crossroads with traffic lights seen from above; our road has TWO lanes going straight on, and it continues with two lanes
after the junction.
VEHICLES (colour code used strictly): a RED car (ours) in the left of the two lanes; a GREY car beside it in the right lane, both
going straight on; a SOLID GREEN arrow from the red car straight through the junction into the left lane after it; a DASHED ORANGE
arrow from the red car crossing over into the right lane inside the junction.
MUST NOT APPEAR: text."""),
  "Du skal ligeud i et lyskryds og holder i den venstre af to vognbaner, der begge går ligeud. Efter krydset fortsætter vejen med to vognbaner. Hvad gælder?",
  "You are going straight on at a junction with traffic lights and are in the left of two lanes that both go straight on. After the junction the road continues with two lanes. What applies?",
  "در یک تقاطع چراغ‌دار مستقیم می‌روید و در خط چپ از دو خطی هستید که هر دو مستقیم می‌روند. بعد از تقاطع جاده با دو خط ادامه دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg bliver i min vognbane gennem krydset.", "I stay in my lane through the junction.", "در طول تقاطع در خط خودم می‌مانم.",
    "Bilen ved siden af kører samtidig; skifter du vognbane i krydset, kan I støde sammen.",
    "The car beside you is moving at the same time; if you change lanes in the junction, you may collide.",
    "خودروی کناری هم‌زمان حرکت می‌کند؛ اگر داخل تقاطع خط عوض کنید، ممکن است با هم برخورد کنید."),
  S(False, "Jeg må skifte vognbane midt i krydset, når jeg giver tegn.", "I may change lanes in the middle of the junction when I signal.",
    "اگر راهنما بزنم، می‌توانم وسط تقاطع خط عوض کنم.",
    "Et vognbaneskift i krydset er farligt og kan overraske bilen ved siden af.", "A lane change in the junction is dangerous and can surprise the car beside you.",
    "تغییر خط داخل تقاطع خطرناک است و ممکن است خودروی کناری را غافلگیر کند."),
  S(False, "Den, der først kommer over stoplinjen, må vælge vognbane efter krydset.", "Whoever crosses the stop line first may choose the lane after the junction.",
    "هر کس اول از خط ایست رد شود، می‌تواند خط بعد از تقاطع را انتخاب کند.",
    "I bliver begge i jeres egne vognbaner gennem krydset.", "You both stay in your own lanes through the junction.",
    "هر دو در طول تقاطع در خط خودتان می‌مانید."),
  S(False, "Vognbanerne gælder ikke inde i krydset, så jeg kan køre, hvor der er plads.",
    "The lanes do not count inside the junction, so I can drive wherever there is room.",
    "خط‌ها داخل تقاطع اعتباری ندارند، پس هر جا جا باشد می‌رانم.",
    "Du skal fortsætte gennem krydset i den vognbane, du har valgt.", "You must continue through the junction in the lane you have chosen.",
    "باید در طول تقاطع در همان خطی که انتخاب کرده‌اید ادامه دهید."),
)

Q(5453, "7.12", view("""
THE SCENE: we stand first at the stop line of a junction with traffic lights; our light has just turned green; a car from the left that
entered on yellow is still crossing the junction right in front of us.
MUST BE CLEARLY VISIBLE: our green light, the car still crossing in front of us.
MUST NOT APPEAR: text."""),
  "Dit lys er lige skiftet til grønt, men en bil fra venstre er stadig ved at køre over krydset foran dig. Hvordan forholder du dig?",
  "Your light has just turned green, but a car from the left is still crossing the junction in front of you. What do you do?",
  "چراغ شما تازه سبز شده، ولی خودرویی از سمت چپ هنوز در حال عبور از تقاطعِ جلوی شماست. چه می‌کنید؟",
  S(True, "Jeg lader bilen køre ud af krydset, før jeg kører.", "I let the car get out of the junction before I go.", "می‌گذارم آن خودرو از تقاطع خارج شود و بعد حرکت می‌کنم.",
    "Grønt lys betyder kør, men kun når det kan ske uden fare.", "A green light means go, but only when it can be done safely.",
    "چراغ سبز یعنی حرکت کنید، ولی فقط وقتی بی‌خطر باشد."),
  S(True, "Jeg ser efter, om der kommer flere fra siden, før jeg kører frem.", "I look to see whether more are coming from the side before I move forward.",
    "پیش از حرکت نگاه می‌کنم که آیا وسایل دیگری هم از کنار می‌آیند.",
    "Der kan være flere, der er kørt ind i krydset for sent.", "There may be others who entered the junction too late.",
    "ممکن است وسایل دیگری هم دیر وارد تقاطع شده باشند."),
  S(False, "Har jeg grønt, skal bilen i krydset vige for mig.", "If I have green, the car in the junction must give way to me.",
    "وقتی چراغم سبز است، خودرویی که در تقاطع است باید برای من کنار برود.",
    "Du må ikke køre ind i en bil, der allerede er i krydset.", "You must not drive into a car that is already in the junction.",
    "نباید به خودرویی بزنید که از قبل داخل تقاطع است."),
)

Q(5454, "7.12", above("""
THE SCENE: a crossroads seen from above: our side road comes up from the bottom and meets a main road with TWO lanes in each
direction; shark teeth lie across our lane.
VEHICLES (colour code used strictly): a RED car (ours) waiting at the shark teeth to go straight across; on the main road from the
LEFT, in the near lane, a white VAN has stopped and its driver waves us across; in the far lane of the same direction a BLUE car is
coming fast, partly hidden from us by the van.
MUST NOT APPEAR: signs, text."""),
  "Du skal ligeud over en hovedvej med to vognbaner i hver retning. Bilen i den nærmeste vognbane fra venstre standser og vinker dig over. Hvordan forholder du dig?",
  "You are going straight across a main road with two lanes in each direction. The vehicle in the nearest lane from the left stops and waves you across. What do you do?",
  "باید مستقیم از عرض جاده‌ی اصلی‌ای با دو خط در هر جهت رد شوید. وسیله‌ای که در نزدیک‌ترین خطِ سمت چپ است می‌ایستد و اشاره می‌کند رد شوید. چه می‌کنید؟",
  S(True, "Varevognen kan skjule en anden bil i vognbanen ved siden af.", "The van may hide another car in the lane beside it.",
    "ممکن است ون خودروی دیگری را در خط کناری‌اش پنهان کند.",
    "En bil i den næste vognbane kan komme uden at standse.", "A car in the next lane may come on without stopping.",
    "ممکن است خودرویی در خط کناری بدون توقف بیاید."),
  S(True, "Jeg kører først, når jeg kan se, at begge vognbaner er fri.", "I only go when I can see that both lanes are clear.",
    "فقط وقتی حرکت می‌کنم که ببینم هر دو خط خالی‌اند.",
    "Du har vigepligt over for alle på hovedvejen og må ikke stole på et vink.", "You must give way to everyone on the main road and must not rely on a wave.",
    "باید به همه‌ی کسانی که در جاده‌ی اصلی‌اند راه بدهید و نباید به یک اشاره‌ی دست اعتماد کنید."),
  S(False, "Når varevognen holder stille, er der ingen fare.", "When the van is standing still, there is no danger.", "وقتی ون ایستاده، خطری نیست.",
    "Den skjuler en del af vejen.", "It hides part of the road.", "بخشی از جاده را پنهان می‌کند."),
  S(False, "Bilen i den fjerne vognbane skal også standse, fordi varevognen har standset.", "The car in the far lane must stop too, because the van has stopped.",
    "خودروی خط دور هم باید بایستد، چون ون ایستاده است.",
    "Den har forkørselsret og ved måske ikke, at varevognen holder for dig.", "It has priority and may not know that the van has stopped for you.",
    "آن خودرو حق تقدم دارد و شاید نداند که ون برای شما ایستاده است."),
)

Q(5455, "7.14", above("""
THE SCENE: a junction seen from above; our road runs up the picture; a narrow side road goes off to the LEFT, and in it a GREY car
waits at shark teeth to come out.
VEHICLES (colour code used strictly): a RED car (ours) turning left into the side road; a SOLID GREEN arrow along the right-hand side
of the side road; a DASHED ORANGE arrow cutting the corner close to the grey car.
MUST NOT APPEAR: signs, text."""),
  "Du svinger til venstre ind på en smal sidevej. I sidevejen holder en bil ved hajtænderne og venter på at køre ud. Hvordan forholder du dig?",
  "You are turning left into a narrow side road. In the side road a car is waiting at the shark teeth to come out. What do you do?",
  "به چپ وارد یک خیابان فرعیِ باریک می‌شوید. در خیابان فرعی خودرویی پشت دندان‌کوسه‌ها منتظر بیرون آمدن است. چه می‌کنید؟",
  S(True, "Jeg svinger, så jeg kommer ind i højre side af sidevejen og ikke skærer hjørnet.",
    "I turn so that I come into the right-hand side of the side road and do not cut the corner.",
    "طوری می‌پیچم که وارد سمت راستِ خیابان فرعی شوم و گوشه را میان‌بُر نزنم.",
    "Du skal holde til højre på den vej, du svinger ind på, og ikke skære ind i den modsatte side.",
    "You must keep right on the road you turn into and not cut into the opposite side.",
    "باید در خیابانی که واردش می‌شوید سمت راست بمانید و وارد سمت مقابل نشوید."),
  S(True, "Jeg holder øje med, at bilen i sidevejen bliver holdende.", "I watch that the car in the side road stays where it is.",
    "مراقبم خودروی خیابان فرعی سر جایش بماند.",
    "Føreren kan overse dig eller misforstå, hvor du vil hen.", "The driver may overlook you or misunderstand where you are going.",
    "ممکن است راننده شما را نبیند یا مسیر شما را اشتباه بفهمد."),
  S(True, "Jeg sænker farten, så jeg kan svinge i en rolig bue.", "I slow down so that I can turn in a smooth arc.",
    "سرعتم را کم می‌کنم تا بتوانم با یک قوس آرام بپیچم.",
    "Sidevejen er smal, og der er ikke meget plads.", "The side road is narrow, and there is not much room.", "خیابان فرعی باریک است و جای زیادی ندارد."),
  S(False, "Jeg skærer hjørnet, så jeg hurtigere er ude af krydset.", "I cut the corner so that I am out of the junction sooner.",
    "گوشه را میان‌بُر می‌زنم تا زودتر از تقاطع خارج شوم.",
    "Så kommer du over i den side, hvor bilen venter, og kan ramme den.", "Then you come over to the side where the car is waiting and may hit it.",
    "این‌طور به سمتی می‌روید که آن خودرو منتظر است و ممکن است به آن بزنید."),
)

Q(5456, "7.14", view("""
THE SCENE: we wait near the centre line of a two-way road to turn left into a side road (our left indicator lamp glows on the
dashboard strip); dense oncoming traffic with only small gaps; in the interior mirror at the top a queue of cars has formed behind us.
MUST BE CLEARLY VISIBLE: the dense oncoming traffic, the queue behind us in the interior mirror.
MUST NOT APPEAR: signs, text."""),
  "Du venter på at svinge til venstre. Der er tæt modkørende trafik, og bag dig er der dannet kø. Hvordan forholder du dig?",
  "You are waiting to turn left. There is dense oncoming traffic, and a queue has formed behind you. What do you do?",
  "منتظرید به چپ بپیچید. ترافیک روبه‌رو سنگین است و پشت سرتان صف تشکیل شده است. چه می‌کنید؟",
  S(True, "Jeg venter på et hul, hvor svinget kan ske uden fare.", "I wait for a gap in which the turn can be made safely.",
    "منتظر فاصله‌ای می‌مانم که بتوانم بی‌خطر بپیچم.",
    "Du skal holde tilbage for de modkørende, uanset køen bag dig.", "You must give way to oncoming traffic, whatever the queue behind you.",
    "باید به ترافیک روبه‌رو راه بدهید، صف پشت سرتان هر چه باشد."),
  S(True, "Køen bag mig må vente; jeg lader mig ikke presse.", "The queue behind me will have to wait; I do not let myself be rushed.",
    "صف پشت سرم باید صبر کند؛ نمی‌گذارم تحت فشار قرار بگیرم.",
    "Et forhastet sving foran en modkørende kan give et alvorligt uheld.", "A hurried turn in front of an oncoming vehicle can cause a serious accident.",
    "پیچیدنِ عجولانه جلوی خودروی روبه‌رو ممکن است تصادف جدی ایجاد کند."),
  S(False, "Når der er kø bag mig, må jeg svinge, selv om de modkørende må bremse.",
    "When there is a queue behind me, I may turn even if the oncoming traffic has to brake.",
    "وقتی پشتم صف است، می‌توانم بپیچم، حتی اگر خودروهای روبه‌رو مجبور به ترمز شوند.",
    "Du må ikke tvinge de modkørende til at bremse.", "You must not force the oncoming traffic to brake.", "نباید ترافیک روبه‌رو را مجبور به ترمز کنید."),
  S(False, "Jeg dytter, så de modkørende standser for mig.", "I sound the horn so that the oncoming traffic stops for me.",
    "بوق می‌زنم تا خودروهای روبه‌رو برایم بایستند.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5457, "7.14", above("""
THE SCENE: a junction seen from above; our road runs up the picture, and a side road goes off to the LEFT.
VEHICLES (colour code used strictly): a RED car (ours) pulling a long trailer, waiting near the centre line to turn left; an oncoming
BLUE car at some distance in the other lane.
MUST NOT APPEAR: signs, text."""),
  "Du kører med en lang trailer og vil svinge til venstre over den modkørende vognbane. Hvad gælder?",
  "You are pulling a long trailer and want to turn left across the oncoming lane. What applies?",
  "با یک تریلر بلند می‌رانید و می‌خواهید از عرض خط مقابل به چپ بپیچید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal bruge et større hul i den modkørende trafik, fordi vogntoget er længere tid om at komme over.",
    "I need a larger gap in the oncoming traffic, because the combination takes longer to get across.",
    "به فاصله‌ی بیشتری در ترافیک روبه‌رو نیاز دارم، چون عبور خودرو با تریلر بیشتر طول می‌کشد.",
    "Hele vogntoget skal være ude af den modkørende vognbane, før den modkørende når frem.",
    "The whole combination must be out of the oncoming lane before the oncoming vehicle arrives.",
    "پیش از رسیدن خودروی روبه‌رو، باید کل خودرو و تریلر از خط مقابل خارج شده باشند."),
  S(True, "Jeg sikrer mig, at der er plads til hele vogntoget på den vej, jeg svinger ind på.",
    "I make sure that there is room for the whole combination on the road I turn into.",
    "مطمئن می‌شوم در جاده‌ای که واردش می‌شوم برای کل خودرو و تریلر جا هست.",
    "Ellers kan traileren blive holdende i den modkørende vognbane.", "Otherwise the trailer may be left standing in the oncoming lane.",
    "وگرنه ممکن است تریلر در خط مقابل بماند."),
  S(False, "Med trailer har jeg forkørselsret, fordi jeg ikke kan accelerere så hurtigt.", "With a trailer I have priority because I cannot accelerate as quickly.",
    "با تریلر حق تقدم دارم، چون نمی‌توانم به آن سرعت شتاب بگیرم.",
    "Du skal holde tilbage for de modkørende, også med trailer.", "You must give way to oncoming traffic, also with a trailer.",
    "حتی با تریلر باید به ترافیک روبه‌رو راه بدهید."),
  S(False, "De modkørende skal sætte farten ned, når de ser, at jeg har trailer.", "The oncoming traffic must slow down when they see that I have a trailer.",
    "خودروهای روبه‌رو وقتی ببینند تریلر دارم، باید سرعتشان را کم کنند.",
    "Det er dig, der har vigepligt.", "You are the one who must give way.", "این شما هستید که باید راه بدهید."),
)

Q(5458, "7.14", above("""
THE SCENE: a road seen from above approaching a junction with TWO lanes in our direction, separated by an UNBROKEN line for the last
50 m: the left lane has a white arrow pointing left, the right lane a white arrow pointing straight on.
VEHICLES (colour code used strictly): a RED car (ours) in the RIGHT lane, its left indicator flashing; a DASHED ORANGE arrow from it
crossing the unbroken line into the left-turn lane; a SOLID GREEN arrow from it going straight on through the junction.
MUST NOT APPEAR: signs, text."""),
  "Du skal til venstre i krydset, men du er havnet i vognbanen ligeud. Mellem vognbanerne er der en ubrudt linje. Hvad gælder?",
  "You need to turn left at the junction, but you have ended up in the lane for straight on. There is an unbroken line between the lanes. What applies?",
  "باید در تقاطع به چپ بپیچید، ولی در خط مستقیم قرار گرفته‌اید. بین خط‌ها یک خط ممتد هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg kører ligeud og finder en anden vej.", "I go straight on and find another way.", "مستقیم می‌روم و راه دیگری پیدا می‌کنم.",
    "Den ubrudte linje må ikke overskrides, og pilene i din vognbane skal følges.",
    "The unbroken line must not be crossed, and the arrows in your lane must be followed.",
    "از خط ممتد نباید رد شد و باید از فلش‌های خط خودتان پیروی کنید."),
  S(False, "Jeg krydser linjen, når der er et hul i venstresvingsbanen.", "I cross the line when there is a gap in the left-turn lane.",
    "وقتی در خط گردش به چپ جای خالی باشد، از روی خط رد می‌شوم.",
    "En ubrudt linje må ikke overskrides.", "An unbroken line must not be crossed.", "از خط ممتد نباید رد شد."),
  S(False, "Jeg svinger til venstre fra min vognbane, hvis jeg giver tegn i god tid.", "I turn left from my lane if I signal in good time.",
    "اگر به‌موقع راهنما بزنم، از خط خودم به چپ می‌پیچم.",
    "Pilene viser, at din vognbane er til ligeud, og dem skal du følge.", "The arrows show that your lane is for straight on, and you must follow them.",
    "فلش‌ها نشان می‌دهند خط شما برای مستقیم است و باید از آن‌ها پیروی کنید."),
)

Q(5459, "7.14", above("""
THE SCENE: a junction seen from above; our road runs up the picture, and a side road goes off to the LEFT; in the side road a queue
of cars stands right up to the junction.
VEHICLES (colour code used strictly): a RED car (ours) waiting near the centre line to turn left; the oncoming lane is clear.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til venstre, men på den vej, du skal ind på, holder en kø helt hen til krydset. Hvad gælder?",
  "You want to turn left, but on the road you are turning into a queue stretches right back to the junction. What applies?",
  "می‌خواهید به چپ بپیچید، ولی در خیابانی که باید واردش شوید صفی تا خودِ تقاطع رسیده است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg venter, til der er plads til hele bilen på den nye vej.", "I wait until there is room for the whole car on the new road.",
    "صبر می‌کنم تا در خیابان جدید برای تمام خودرو جا باشد.",
    "Du må ikke køre ind i et kryds, hvis du ikke kan komme ud af det igen.", "You must not drive into a junction if you cannot get out of it again.",
    "اگر نمی‌توانید از تقاطع خارج شوید، نباید واردش شوید."),
  S(True, "Jeg må ikke svinge, hvis jeg risikerer at blive holdende i den modkørende vognbane.",
    "I must not turn if I risk being left standing in the oncoming lane.",
    "اگر خطر ماندن در خط مقابل باشد، نباید بپیچم.",
    "Så spærrer du for de modkørende.", "Then you block the oncoming traffic.", "این‌طور راه ترافیک روبه‌رو را می‌بندید."),
  S(True, "Jeg bliver ved med at give tegn, så de bag mig kan se, hvad jeg venter på.",
    "I keep signalling so that those behind me can see what I am waiting for.",
    "راهنما را روشن نگه می‌دارم تا کسانی که پشت سرم هستند بفهمند منتظر چه هستم.",
    "Blinklyset viser de andre, at du venter på at svinge.", "The indicator shows the others that you are waiting to turn.",
    "راهنما به دیگران نشان می‌دهد که منتظر پیچیدن هستید."),
  S(False, "Jeg svinger og bliver holdende halvt ude i den modkørende vognbane, til køen kører.",
    "I turn and stay half out in the oncoming lane until the queue moves.",
    "می‌پیچم و تا حرکت صف، نیمی از خودرو در خط مقابل می‌ماند.",
    "Så spærrer du vejen og kan blive ramt.", "Then you block the road and may be hit.", "این‌طور راه را می‌بندید و ممکن است با شما برخورد کنند."),
)

Q(5460, "7.13", view("""
THE SCENE: a junction with traffic lights showing green for us; our right indicator lamp glows on the dashboard strip. Along our right
runs a cycle path that continues across the side road in a BLUE painted cycle crossing; a cyclist approaches on the cycle path from
behind, going straight on (visible in the right door mirror at the picture's right edge).
MUST BE CLEARLY VISIBLE: the blue cycle crossing over the side road, the cyclist in the right door mirror.
MUST NOT APPEAR: text."""),
  "Du har grønt lys og vil svinge til højre. Cykelstien fortsætter over sidevejen i et blåt felt. Hvad gælder?",
  "You have a green light and want to turn right. The cycle path continues across the side road in a blue strip. What applies?",
  "چراغ شما سبز است و می‌خواهید به راست بپیچید. مسیر دوچرخه در یک نوار آبی از عرض خیابان فرعی ادامه دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for cyklister, der kører ligeud i det blå felt.", "I give way to cyclists going straight on in the blue strip.",
    "به دوچرخه‌سوارانی که در نوار آبی مستقیم می‌روند راه می‌دهم.",
    "Når du svinger til højre, må du ikke være til ulempe for cyklister, der kører ligeud; det blå felt viser, hvor de krydser.",
    "When you turn right, you must not inconvenience cyclists going straight on; the blue strip shows where they cross.",
    "وقتی به راست می‌پیچید، نباید برای دوچرخه‌سوارانی که مستقیم می‌روند مزاحمت ایجاد کنید؛ نوار آبی محل عبورشان را نشان می‌دهد."),
  S(False, "Cyklisterne skal holde tilbage, fordi jeg har grønt lys.", "The cyclists must give way because I have a green light.",
    "دوچرخه‌سواران باید راه بدهند، چون چراغ من سبز است.",
    "Cyklisterne har også grønt, og du har vigepligt over for dem.", "The cyclists have green as well, and you must give way to them.",
    "چراغ دوچرخه‌سواران هم سبز است و شما باید به آن‌ها راه بدهید."),
  S(False, "Det blå felt betyder, at cyklisterne skal standse før sidevejen.", "The blue strip means that the cyclists must stop before the side road.",
    "نوار آبی یعنی دوچرخه‌سواران باید پیش از خیابان فرعی بایستند.",
    "Det blå felt markerer, hvor cyklisterne kører over; det giver dem ingen pligt til at standse.",
    "The blue strip marks where cyclists cross; it does not oblige them to stop.",
    "نوار آبی محل عبور دوچرخه‌سواران را مشخص می‌کند؛ آن‌ها را موظف به توقف نمی‌کند."),
  S(False, "Det blå felt er en busbane.", "The blue strip is a bus lane.", "نوار آبی خط ویژه‌ی اتوبوس است.",
    "Blå afmærkning bruges til at markere cyklisternes vej over krydset.", "Blue marking is used to mark the cyclists' path across the junction.",
    "خط‌کشی آبی برای نشان دادن مسیر دوچرخه‌سواران در عرض تقاطع به کار می‌رود."),
)

Q(5461, "7.13", view("""
THE SCENE: we wait at a junction to turn right (our right indicator lamp glows on the dashboard strip); a cyclist has just passed us
on the cycle path on our right and goes straight on; in the right door mirror (at the right edge of the picture) a second cyclist can
be seen coming up behind.
MUST BE CLEARLY VISIBLE: the cyclist who has just passed, the second cyclist in the right door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du har holdt tilbage for en cyklist og vil nu svinge til højre. Hvordan forholder du dig?",
  "You have given way to a cyclist and now want to turn right. What do you do?",
  "برای یک دوچرخه‌سوار صبر کرده‌اید و حالا می‌خواهید به راست بپیچید. چه می‌کنید؟",
  S(True, "Jeg ser efter igen, fordi der kan komme flere cyklister bagfra.", "I look again, because more cyclists may be coming from behind.",
    "دوباره نگاه می‌کنم، چون ممکن است دوچرخه‌سواران دیگری از پشت بیایند.",
    "Bag den første cyklist kan der komme flere, også hurtigere.", "Behind the first cyclist more may come, faster ones too.",
    "ممکن است پشت اولین دوچرخه‌سوار دیگرانی، حتی سریع‌تر، بیایند."),
  S(True, "Jeg kigger over højre skulder lige før, jeg svinger.", "I look over my right shoulder just before I turn.",
    "درست پیش از پیچیدن از روی شانه‌ی راست نگاه می‌کنم.",
    "Spejlet viser ikke den blinde vinkel.", "The mirror does not show the blind spot.", "آینه نقطه‌ی کور را نشان نمی‌دهد."),
  S(False, "Når den første cyklist er kørt forbi, kan jeg svinge uden at se mig for igen.",
    "Once the first cyclist has gone past, I can turn without looking again.",
    "وقتی اولین دوچرخه‌سوار رد شد، می‌توانم بدون نگاه دوباره بپیچم.",
    "Du skal være sikker på, at der ikke kommer flere.", "You must be sure that no more are coming.", "باید مطمئن شوید دوچرخه‌سوار دیگری نمی‌آید."),
)

Q(5462, "7.13", view("""
THE SCENE: we stand at shark teeth at the end of a side road, about to turn right onto a main road; along the main road on our side
runs a TWO-WAY cycle path (white arrows both ways) crossing the mouth of our road; a car approaches on the main road from the left, and
a cyclist approaches on the cycle path from the right.
MUST BE CLEARLY VISIBLE: the two-way cycle path, the car from the left, the cyclist from the right.
MUST NOT APPEAR: text."""),
  "Du kommer ad en sidevej med hajtænder og vil svinge til højre ind på hovedvejen. Langs hovedvejen er der en dobbeltrettet cykelsti. Hvad gælder?",
  "You are coming along a side road with shark teeth and want to turn right onto the main road. Along the main road there is a two-way cycle path. What applies?",
  "از یک خیابان فرعیِ دارای دندان‌کوسه می‌آیید و می‌خواهید به راست وارد جاده‌ی اصلی شوید. کنار جاده‌ی اصلی یک مسیر دوچرخه‌ی دوطرفه هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for trafikken fra venstre på hovedvejen.", "I give way to the traffic from the left on the main road.",
    "به ترافیکِ سمت چپ در جاده‌ی اصلی راه می‌دهم.",
    "Du har ubetinget vigepligt over for trafikken på hovedvejen.", "You must give way to the traffic on the main road.",
    "باید بی‌قیدوشرط به ترافیک جاده‌ی اصلی راه بدهید."),
  S(True, "Jeg holder også tilbage for cyklister på cykelstien fra begge sider.", "I also give way to cyclists on the cycle path from both sides.",
    "به دوچرخه‌سوارانِ مسیر دوچرخه از هر دو طرف هم راه می‌دهم.",
    "Vigepligten gælder også cyklisterne på den dobbeltrettede cykelsti.", "The duty to give way also covers the cyclists on the two-way cycle path.",
    "این وظیفه شامل دوچرخه‌سوارانِ مسیر دوچرخه‌ی دوطرفه هم می‌شود."),
  S(True, "Jeg ser til begge sider, før jeg kører ud, selv om jeg skal til højre.", "I look both ways before I pull out, even though I am turning right.",
    "پیش از بیرون رفتن به هر دو طرف نگاه می‌کنم، با این‌که به راست می‌روم.",
    "Cyklister kan komme fra højre på den dobbeltrettede sti.", "Cyclists may come from the right on the two-way path.",
    "ممکن است در مسیر دوطرفه دوچرخه‌سوار از راست بیاید."),
  S(False, "Biler fra højre, der vil svinge ind på min vej, skal holde tilbage for mig.", "Cars from the right that want to turn into my road must give way to me.",
    "خودروهای سمت راست که می‌خواهند وارد خیابان من شوند، باید به من راه بدهند.",
    "Du har vigepligt over for alle på hovedvejen.", "You must give way to everyone on the main road.", "باید به همه‌ی کسانی که در جاده‌ی اصلی‌اند راه بدهید."),
)

Q(5463, "7.13", view("""
THE SCENE: we are at the exit of a supermarket car park, about to turn right onto a street; the exit crosses a pavement and a cycle
path; a pedestrian walks along the pavement from the left, and a cyclist approaches on the cycle path from the left.
MUST BE CLEARLY VISIBLE: the pavement and cycle path across the exit, the pedestrian and the cyclist from the left.
MUST NOT APPEAR: signs, shop names, text."""),
  "Du vil svinge til højre ud fra en parkeringsplads. Udkørslen krydser et fortov og en cykelsti. Hvad gælder?",
  "You want to turn right out of a car park. The exit crosses a pavement and a cycle path. What applies?",
  "می‌خواهید از یک پارکینگ به راست بیرون بپیچید. خروجی از روی پیاده‌رو و یک مسیر دوچرخه می‌گذرد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder tilbage for den gående på fortovet.", "I give way to the pedestrian on the pavement.", "به عابرِ روی پیاده‌رو راه می‌دهم.",
    "Når du kører over et fortov, skal de gående kunne passere uhindret.", "When you drive across a pavement, pedestrians must be able to pass unhindered.",
    "وقتی از روی پیاده‌رو رد می‌شوید، عابران باید بتوانند بدون مانع عبور کنند."),
  S(True, "Jeg lader cyklisten på cykelstien køre først.", "I let the cyclist on the cycle path go first.",
    "اجازه می‌دهم دوچرخه‌سوارِ مسیر دوچرخه اول رد شود.",
    "Du har ubetinget vigepligt, når du kører ud fra en parkeringsplads.", "You must give way when you drive out of a car park.",
    "وقتی از پارکینگ بیرون می‌آیید، باید بی‌قیدوشرط راه بدهید."),
  S(True, "Jeg holder også tilbage for trafikken på vejen.", "I also give way to the traffic on the road.", "به ترافیک خیابان هم راه می‌دهم.",
    "Den ubetingede vigepligt gælder alle på vejen.", "The duty to give way covers everyone on the road.", "این وظیفه شامل همه‌ی کسانی است که در خیابان‌اند."),
  S(False, "Cyklisten skal holde tilbage, fordi jeg svinger til højre.", "The cyclist must give way because I am turning right.",
    "دوچرخه‌سوار باید راه بدهد، چون من به راست می‌پیچم.",
    "Du har vigepligt over for alle, der færdes på fortovet, cykelstien og vejen.", "You must give way to everyone on the pavement, the cycle path and the road.",
    "باید به همه‌ی کسانی که روی پیاده‌رو، مسیر دوچرخه و خیابان‌اند راه بدهید."),
)

Q(5464, "7.13", view("""
THE SCENE: a junction without signals; we are turning right into a side road (our right indicator lamp glows on the dashboard strip);
a woman is walking across the side road a few metres into it, where there is no pedestrian crossing.
MUST BE CLEARLY VISIBLE: the woman crossing the side road, the absence of a pedestrian crossing.
MUST NOT APPEAR: signs, text."""),
  "Du vil svinge til højre ind på en sidevej. En kvinde er ved at gå over sidevejen et stykke inde i den, hvor der ikke er noget fodgængerfelt. Hvad gælder?",
  "You want to turn right into a side road. A woman is walking across the side road a little way into it, where there is no pedestrian crossing. What applies?",
  "می‌خواهید به راست وارد یک خیابان فرعی شوید. زنی کمی داخل خیابان فرعی، جایی که گذرگاه عابر پیاده نیست، از عرض آن رد می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg lader kvinden gå over, før jeg svinger ind.", "I let the woman cross before I turn in.", "می‌گذارم آن زن رد شود و بعد می‌پیچم.",
    "Når du svinger, skal du give gående, der går over den vej, du svinger ind på, mulighed for at komme uhindret over.",
    "When you turn, you must let pedestrians crossing the road you are turning into get across unhindered.",
    "وقتی می‌پیچید، باید به عابرانی که از عرض خیابانِ مقصد رد می‌شوند امکان عبور بدون مانع بدهید."),
  S(False, "Hun skal vente, fordi hun ikke går i et fodgængerfelt.", "She must wait because she is not on a pedestrian crossing.",
    "او باید صبر کند، چون روی گذرگاه عابر پیاده نیست.",
    "Reglen gælder, selv om der ikke er et fodgængerfelt.", "The rule applies even where there is no pedestrian crossing.",
    "این قاعده حتی جایی که گذرگاه نیست هم برقرار است."),
  S(False, "Jeg kører uden om hende i venstre side af sidevejen.", "I drive round her on the left side of the side road.", "از سمت چپِ خیابان فرعی دورش می‌زنم.",
    "Du skal lade hende gå uhindret over og holde til højre.", "You must let her cross unhindered and keep right.",
    "باید بگذارید بدون مانع رد شود و خودتان سمت راست بمانید."),
)

Q(5465, "7.7", view("""
THE SCENE: a narrow single-track road between fields where two cars cannot pass each other; just ahead on our right the road widens
into a short passing place; an oncoming car approaches from far ahead.
MUST BE CLEARLY VISIBLE: the narrow road, the widening on our right, the oncoming car.
MUST NOT APPEAR: signs, text."""),
  "Vejen er så smal, at to biler ikke kan passere hinanden. Lige foran dig i din side er der en udvidelse af vejen. En bil kommer imod dig. Hvordan forholder du dig?",
  "The road is so narrow that two cars cannot pass each other. Just ahead on your side the road widens. A car is coming towards you. What do you do?",
  "جاده آن‌قدر باریک است که دو خودرو نمی‌توانند از کنار هم رد شوند. درست جلوی شما در سمت خودتان جاده پهن‌تر شده است. خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg holder ind i udvidelsen og lader den modkørende passere.", "I pull into the widening and let the oncoming car pass.",
    "در بخش پهن‌تر کنار می‌کشم و می‌گذارم خودروی روبه‌رو رد شود.",
    "Du er nærmest udvidelsen og kan let gøre plads.", "You are nearest the widening and can easily make room.",
    "شما به بخش پهن‌تر نزدیک‌ترید و راحت می‌توانید جا باز کنید."),
  S(True, "Jeg sætter farten ned i god tid, før vi mødes.", "I slow down in good time before we meet.",
    "پیش از آن‌که به هم برسیم، به‌موقع سرعتم را کم می‌کنم.",
    "Ved møde på en smal vej skal farten være passende lav.", "When meeting on a narrow road, the speed must be suitably low.",
    "هنگام روبه‌رو شدن در جاده‌ی باریک، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(False, "Jeg fortsætter, fordi den modkørende kan bakke tilbage.", "I carry on because the oncoming car can reverse.",
    "ادامه می‌دهم، چون خودروی روبه‌رو می‌تواند دنده‌عقب برود.",
    "Det er langt mere sikkert, at du holder ind, hvor der er plads.", "It is far safer for you to pull in where there is room.",
    "خیلی امن‌تر است که شما جایی که جا هست کنار بکشید."),
  S(False, "Jeg blinker med lyset, så den modkørende ved, at den skal holde ind.", "I flash my lights so that the oncoming driver knows they must pull in.",
    "با چراغ علامت می‌دهم تا خودروی روبه‌رو بداند باید کنار بکشد.",
    "Den modkørende har ingen udvidelse i nærheden, og et lyssignal giver dig ingen ret.",
    "The oncoming car has no widening nearby, and a light signal gives you no right.",
    "خودروی روبه‌رو نزدیکش جای پهنی ندارد و علامت نوری به شما حقی نمی‌دهد."),
)

Q(5466, "7.7", town("""
THE SCENE: a narrow town street with cars parked along both kerbs, leaving room for only one car at a time; an oncoming car is
already halfway along the narrow stretch, coming towards us.
MUST BE CLEARLY VISIBLE: the parked cars on both sides, the oncoming car already in the narrow stretch.
MUST NOT APPEAR: signs, text."""),
  "Der holder parkerede biler i begge sider, så der kun er plads til én bil ad gangen. En modkørende bil er allerede halvvejs gennem strækningen. Hvordan forholder du dig?",
  "Cars are parked on both sides, so there is room for only one car at a time. An oncoming car is already halfway along the stretch. What do you do?",
  "در هر دو طرف خودرو پارک شده و فقط جای عبور یک خودرو در هر بار هست. خودرویی از روبه‌رو تا نیمه‌ی این بخش آمده است. چه می‌کنید؟",
  S(True, "Jeg venter, til den modkørende er kommet igennem.", "I wait until the oncoming car has come through.", "صبر می‌کنم تا خودروی روبه‌رو رد شود.",
    "Den er allerede på strækningen og kan ikke komme forbi dig.", "It is already on the stretch and cannot get past you.",
    "آن خودرو از قبل وارد این بخش شده و نمی‌تواند از کنار شما رد شود."),
  S(False, "Jeg kører ind, fordi der holder biler i begge sider, og så har jeg forkørselsret.",
    "I drive in, because there are cars parked on both sides, and then I have priority.",
    "وارد می‌شوم، چون در هر دو طرف خودرو پارک شده و در این حالت حق تقدم با من است.",
    "Her har ingen forkørselsret; I skal tage hensyn til hinanden, og den, der allerede er på vej, skal kunne komme igennem.",
    "Nobody has priority here; you must show each other consideration, and the one already on the way must be able to get through.",
    "اینجا هیچ‌کس حق تقدم ندارد؛ باید ملاحظه‌ی هم را بکنید و کسی که در حال عبور است باید بتواند رد شود."),
  S(False, "Den, der har den største bil, skal køre først.", "Whoever has the bigger car goes first.", "هر کس خودروی بزرگ‌تری دارد، اول می‌رود.",
    "Bilens størrelse giver ingen ret.", "The size of the car gives no right.", "اندازه‌ی خودرو حقی نمی‌دهد."),
  S(False, "Jeg blinker med fjernlyset, så den modkørende bakker tilbage.", "I flash my high beam so that the oncoming car reverses.",
    "با نور بالا چراغ می‌زنم تا خودروی روبه‌رو دنده‌عقب برود.",
    "Et lyssignal giver dig ingen ret til at få den anden til at bakke.", "A light signal gives you no right to make the other driver reverse.",
    "علامت نوری به شما حق نمی‌دهد که دیگری را وادار به دنده‌عقب کنید."),
)

Q(5467, "7.7", view("""
THE SCENE: a narrow country road in winter with snow banks along both edges; a large snow plough with flashing amber lights comes
towards us, its blade taking up much of the road and throwing snow to the side.
MUST BE CLEARLY VISIBLE: the snow plough with its blade and amber lights, the narrow road with snow banks.
MUST NOT APPEAR: signs, text.""", cond="winter, snow on the verges, overcast"),
  "En sneplov kommer imod dig på en smal landevej. Hvordan forholder du dig?",
  "A snow plough is coming towards you on a narrow country road. What do you do?",
  "یک برف‌روب در جاده‌ی باریکِ بیرون شهر به سمت شما می‌آید. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og trækker så langt ind til højre, som det kan ske sikkert.", "I slow down and pull in as far to the right as can be done safely.",
    "سرعتم را کم می‌کنم و تا جایی که ایمن است به سمت راست می‌روم.",
    "Sneploven fylder meget af vejen.", "The snow plough takes up much of the road.", "برف‌روب بخش زیادی از جاده را می‌گیرد."),
  S(True, "Om nødvendigt standser jeg og lader sneploven passere.", "If necessary, I stop and let the snow plough pass.",
    "در صورت لزوم می‌ایستم و می‌گذارم برف‌روب رد شود.",
    "Ved møde på en smal vej skal du om nødvendigt standse.", "When meeting on a narrow road you must stop if necessary.",
    "هنگام روبه‌رو شدن در جاده‌ی باریک، در صورت لزوم باید بایستید."),
  S(True, "Jeg holder afstand, fordi sneploven kan kaste sne og is ud til siden.", "I keep my distance, because the plough may throw snow and ice to the side.",
    "فاصله می‌گیرم، چون برف‌روب ممکن است برف و یخ را به کنار پرتاب کند.",
    "Sne og is kan ramme bilen og tage dit udsyn.", "Snow and ice may hit the car and block your view.",
    "برف و یخ ممکن است به خودرو بخورد و دیدتان را بگیرد."),
  S(False, "Jeg kører midt på vejen, så jeg ikke kører fast i snevolden.", "I drive in the middle of the road so that I do not get stuck in the snow bank.",
    "وسط جاده می‌رانم تا در برف کنار جاده گیر نکنم.",
    "Så kan du støde ind i sneploven.", "Then you may run into the snow plough.", "این‌طور ممکن است با برف‌روب برخورد کنید."),
)

Q(5468, "7.7", view("""
THE SCENE: a two-lane country road at dusk; an oncoming car briefly flashes its headlights at us; nothing else can be seen ahead yet.
MUST BE CLEARLY VISIBLE: the oncoming car flashing its headlights.
MUST NOT APPEAR: signs, text.""", cond="dusk, dry road"),
  "En modkørende bil blinker kort med forlygterne til dig. Hvad kan det betyde?",
  "An oncoming car briefly flashes its headlights at you. What may it mean?",
  "خودرویی از روبه‌رو کوتاه با چراغ‌های جلو به شما چراغ می‌زند. ممکن است چه معنایی داشته باشد؟",
  S(True, "Det kan være en advarsel om fare længere fremme, fx et uheld eller dyr på vejen.",
    "It may be a warning of danger further ahead, for example an accident or animals on the road.",
    "ممکن است هشداری درباره‌ی خطر در ادامه‌ی راه باشد، مثلاً تصادف یا حیوان روی جاده.",
    "Lyssignal må bruges for at advare om fare.", "A light signal may be used to warn of danger.", "از علامت نوری برای هشدار خطر می‌توان استفاده کرد."),
  S(True, "Mit eget lys kan blænde, så jeg kontrollerer, at jeg ikke kører med fjernlys.",
    "My own lights may be dazzling, so I check that I am not driving with high beam.",
    "ممکن است چراغ‌های خودم چشم را بزنند، پس بررسی می‌کنم که با نور بالا نمی‌رانم.",
    "Mange blinker, når de bliver blændet.", "Many drivers flash when they are dazzled.", "بسیاری از رانندگان وقتی چشمشان خیره می‌شود چراغ می‌زنند."),
  S(False, "Det betyder, at jeg skal standse med det samme.", "It means that I must stop at once.", "یعنی باید فوراً بایستم.",
    "Et lyssignal er en advarsel, ikke et påbud om at standse.", "A light signal is a warning, not an order to stop.",
    "علامت نوری هشدار است، نه دستور توقف."),
  S(False, "Det betyder, at den modkørende vil have mig til at køre hurtigere.", "It means that the oncoming driver wants me to drive faster.",
    "یعنی راننده‌ی روبه‌رو می‌خواهد سریع‌تر برانم.",
    "Det er ikke en betydning af et lyssignal; sænk hellere farten og vær opmærksom.", "That is not what a light signal means; slow down instead and pay attention.",
    "علامت نوری چنین معنایی ندارد؛ بهتر است سرعت را کم کنید و حواستان را جمع کنید."),
)

Q(5469, "7.11", view("""
THE SCENE: a road approaching a junction with traffic lights about 80 m ahead; our light is green and has been green for a long time;
pedestrians wait at the crossing beside it.
MUST BE CLEARLY VISIBLE: the green traffic light ahead, the waiting pedestrians.
MUST NOT APPEAR: text."""),
  "Du nærmer dig et lyskryds. Lyset har været grønt længe. Hvordan forholder du dig?",
  "You are approaching a junction with traffic lights. The light has been green for a long time. What do you do?",
  "به یک تقاطع چراغ‌دار نزدیک می‌شوید. چراغ مدت زیادی سبز بوده است. چه می‌کنید؟",
  S(True, "Jeg er forberedt på, at lyset kan skifte til gult, og holder en fart, så jeg kan standse.",
    "I am prepared for the light to change to yellow and keep a speed at which I can stop.",
    "آماده‌ام که چراغ زرد شود و با سرعتی می‌رانم که بتوانم بایستم.",
    "Gult lys betyder stop, medmindre du er så tæt på, at standsning vil være farlig.",
    "A yellow light means stop, unless you are so close that stopping would be dangerous.",
    "چراغ زرد یعنی ایست، مگر این‌که آن‌قدر نزدیک باشید که توقف خطرناک باشد."),
  S(False, "Jeg sætter farten op for at nå over, før lyset skifter.", "I speed up to get across before the light changes.",
    "سرعتم را بالا می‌برم تا پیش از تغییر چراغ رد شوم.",
    "Så risikerer du at komme for sent og ikke kunne standse.", "Then you risk arriving too late and being unable to stop.",
    "این‌طور ممکن است دیر برسید و نتوانید بایستید."),
  S(False, "Grønt lys betyder, at jeg ikke behøver at se efter andre trafikanter.", "A green light means that I do not need to look out for other road users.",
    "چراغ سبز یعنی لازم نیست مراقب دیگر کاربران راه باشم.",
    "Du skal stadig være opmærksom på andre, fx gående og cyklister.", "You must still pay attention to others, for example pedestrians and cyclists.",
    "همچنان باید مراقب دیگران، مثلاً عابران و دوچرخه‌سواران، باشید."),
  S(False, "Når lyset har været grønt længe, bliver det ved med at være grønt.", "When the light has been green for a long time, it will stay green.",
    "وقتی چراغ مدت زیادی سبز بوده، سبز می‌ماند.",
    "Jo længere lyset har været grønt, jo før kan det skifte.", "The longer the light has been green, the sooner it may change.",
    "هرچه چراغ مدت بیشتری سبز بوده باشد، زودتر ممکن است تغییر کند."),
)

Q(5470, "7.11", view("""
THE SCENE: a road in winter with packed snow and ice, approaching a junction where we have a give-way sign and shark teeth; a car
crosses on the main road.
MUST BE CLEARLY VISIBLE: the icy road surface, the give-way sign and shark teeth, the car on the main road.
MUST NOT APPEAR: other text.""", cond="winter, packed snow and ice on the road, overcast"),
  "Du nærmer dig et kryds, hvor du har vigepligt, og vejen er isglat. Hvordan forholder du dig?",
  "You are approaching a junction where you must give way, and the road is icy. What do you do?",
  "به تقاطعی نزدیک می‌شوید که باید در آن راه بدهید و جاده یخ‌زده است. چه می‌کنید؟",
  S(True, "Jeg begynder at bremse meget tidligere end normalt.", "I start braking much earlier than normal.", "خیلی زودتر از معمول شروع به ترمز می‌کنم.",
    "På is er bremselængden mange gange længere.", "On ice the braking distance is many times longer.", "روی یخ مسافت ترمز چند برابر است."),
  S(True, "Jeg bremser blødt, så hjulene ikke mister grebet.", "I brake gently so that the wheels do not lose their grip.",
    "به‌نرمی ترمز می‌گیرم تا چرخ‌ها چسبندگی‌شان را از دست ندهند.",
    "Hårde opbremsninger på is får hjulene til at glide.", "Hard braking on ice makes the wheels slide.", "ترمز شدید روی یخ چرخ‌ها را به لغزش می‌اندازد."),
  S(False, "Bilen har ABS, så jeg behøver ikke bremse tidligere end normalt.", "The car has ABS, so I do not need to brake earlier than normal.",
    "خودرو ABS دارد، پس لازم نیست زودتر از معمول ترمز کنم.",
    "ABS hjælper dig med at styre under opbremsningen, men gør ikke bremselængden kort på is.",
    "ABS helps you steer while braking, but it does not make the braking distance short on ice.",
    "ABS کمک می‌کند هنگام ترمز فرمان‌پذیر بمانید، ولی مسافت ترمز روی یخ را کوتاه نمی‌کند."),
  S(False, "Kan jeg ikke nå at standse, er det de andres ansvar at holde tilbage.", "If I cannot stop in time, it is the others' responsibility to give way.",
    "اگر نتوانم به‌موقع بایستم، راه دادن مسئولیت دیگران است.",
    "Du har vigepligt og skal kunne standse.", "You must give way and must be able to stop.", "شما باید راه بدهید و بتوانید بایستید."),
)

Q(5471, "7.11", town("""
THE SCENE: a town street approaching a junction with tall buildings on the corners, so the side roads cannot be seen; nothing unusual
is in view, but simple sound-wave lines coming from the right side of the junction show the sound of a siren.
MUST BE CLEARLY VISIBLE: the junction with the hidden side roads, the sound-wave lines from the right.
MUST NOT APPEAR: emergency vehicles, signs, text."""),
  "Du nærmer dig et kryds og hører en sirene, men du kan ikke se, hvor udrykningskøretøjet er. Hvordan forholder du dig?",
  "You are approaching a junction and hear a siren, but you cannot see where the emergency vehicle is. What do you do?",
  "به تقاطعی نزدیک می‌شوید و صدای آژیر می‌شنوید، ولی نمی‌بینید خودروی امدادی کجاست. چه می‌کنید؟",
  S(True, "Jeg sænker farten og ser mig godt for i alle retninger.", "I slow down and look carefully in all directions.",
    "سرعتم را کم می‌کنم و با دقت به همه‌ی جهت‌ها نگاه می‌کنم.",
    "Udrykningskøretøjet kan komme fra en retning, du ikke venter.", "The emergency vehicle may come from a direction you do not expect.",
    "ممکن است خودروی امدادی از جهتی بیاید که انتظارش را ندارید."),
  S(True, "Jeg er klar til at holde ind eller standse og give fri bane.", "I am ready to pull in or stop and make way.",
    "آماده‌ام کنار بکشم یا بایستم و راه را باز کنم.",
    "Du skal i god tid give fri bane for udrykningskøretøjer.", "You must make way for emergency vehicles in good time.",
    "باید به‌موقع راه را برای خودروهای امدادی باز کنید."),
  S(False, "Jeg kører videre som normalt, til jeg kan se det.", "I carry on as normal until I can see it.", "تا وقتی آن را نبینم، مثل همیشه ادامه می‌دهم.",
    "Så kan du komme i vejen for det i krydset.", "Then you may get in its way in the junction.", "این‌طور ممکن است در تقاطع سر راهش قرار بگیرید."),
  S(False, "Jeg standser midt i krydset, så udrykningskøretøjet kan se mig.", "I stop in the middle of the junction so that the emergency vehicle can see me.",
    "وسط تقاطع می‌ایستم تا خودروی امدادی مرا ببیند.",
    "Så kan du spærre krydset for det.", "Then you may block the junction for it.", "این‌طور ممکن است تقاطع را برایش ببندید."),
)

Q(5472, "7.11", view("""
THE SCENE: we approach the end of a side road with a give-way sign and shark teeth; on the main road a city bus stands at a stop just
to the right of the junction and hides the main road to the right.
MUST BE CLEARLY VISIBLE: the shark teeth, the bus hiding the road to the right.
MUST NOT APPEAR: other text."""),
  "Du skal ud på hovedvejen og har vigepligt. En bus, der holder ved et stoppested lige til højre for krydset, skjuler vejen til højre. Hvordan forholder du dig?",
  "You are going out onto the main road and must give way. A bus standing at a stop just to the right of the junction hides the road to the right. What do you do?",
  "باید وارد جاده‌ی اصلی شوید و موظف به رعایت حق تقدم هستید. اتوبوسی که درست سمت راست تقاطع در ایستگاه ایستاده، جاده‌ی سمت راست را پنهان کرده است. چه می‌کنید؟",
  S(True, "Jeg kører langsomt frem, til jeg kan se forbi bussen.", "I move forward slowly until I can see past the bus.",
    "آهسته جلو می‌روم تا کنار اتوبوس را ببینم.",
    "Du skal kunne se, at vejen er fri, før du kører ud.", "You must be able to see that the road is clear before you pull out.",
    "پیش از بیرون رفتن باید ببینید جاده خالی است."),
  S(True, "Bussen kan skjule biler og cyklister på hovedvejen.", "The bus may hide cars and cyclists on the main road.",
    "ممکن است اتوبوس خودروها و دوچرخه‌سوارانِ جاده‌ی اصلی را پنهان کند.",
    "Store køretøjer skjuler mindre trafikanter.", "Large vehicles hide smaller road users.", "وسایل بزرگ کاربران کوچک‌تر راه را پنهان می‌کنند."),
  S(False, "Når bussen holder stille, kommer der ingen fra den side.", "When the bus is standing still, nobody is coming from that side.",
    "وقتی اتوبوس ایستاده، کسی از آن طرف نمی‌آید.",
    "Der kan komme trafik forbi bussen i den anden side af den.", "Traffic may be coming past the bus on its other side.",
    "ممکن است ترافیک از طرف دیگرِ اتوبوس از کنارش بیاید."),
)

Q(5473, "7.4", above("""
THE SCENE: a motorway seen from above with THREE lanes in our direction.
VEHICLES (colour code used strictly): a RED car (ours) in the LEFT lane; a DASHED ORANGE arrow from it going diagonally across both
lanes straight into the right lane; a SOLID GREEN arrow from it moving first into the middle lane and only later into the right lane.
MUST NOT APPEAR: signs, text."""),
  "Du skal fra venstre vognbane over i højre vognbane på en motorvej med tre vognbaner. Hvordan gør du?",
  "You need to move from the left lane to the right lane on a motorway with three lanes. How do you do it?",
  "در آزادراهی با سه خط باید از خط چپ به خط راست بروید. چطور این کار را می‌کنید؟",
  S(True, "Jeg skifter én vognbane ad gangen og ser mig for og giver tegn hver gang.", "I change one lane at a time, checking and signalling each time.",
    "هر بار فقط یک خط عوض می‌کنم و هر بار نگاه می‌کنم و راهنما می‌زنم.",
    "Ved hvert vognbaneskift skal du sikre dig, at det kan ske uden fare.", "With every lane change you must make sure that it can be done safely.",
    "در هر تغییر خط باید مطمئن شوید بی‌خطر انجام می‌شود."),
  S(False, "Jeg skifter direkte fra venstre til højre vognbane i én bevægelse.", "I move straight from the left lane to the right lane in one movement.",
    "در یک حرکت مستقیم از خط چپ به خط راست می‌روم.",
    "Så kan du overse en bil, der samtidig skifter ind i midtervognbanen fra højre.",
    "Then you may miss a car moving into the middle lane from the right at the same time.",
    "این‌طور ممکن است خودرویی را نبینید که هم‌زمان از راست وارد خط وسط می‌شود."),
  S(False, "Når midtervognbanen er fri, behøver jeg ikke se efter i højre vognbane.", "When the middle lane is clear, I do not need to check the right lane.",
    "وقتی خط وسط خالی است، لازم نیست خط راست را نگاه کنم.",
    "Der kan komme en bil i højre vognbane.", "A car may be coming in the right lane.", "ممکن است در خط راست خودرویی بیاید."),
  S(False, "Jeg giver kun tegn én gang, inden jeg begynder.", "I only signal once, before I begin.", "فقط یک بار، پیش از شروع، راهنما می‌زنم.",
    "Du giver tegn før hvert vognbaneskift.", "You signal before each lane change.", "پیش از هر تغییر خط راهنما می‌زنید."),
)

Q(5474, "7.4", town("""
THE SCENE: a wide town road with three lanes in our direction in dense, slow traffic; cars in all lanes; the lane to our right is
moving slightly faster than ours.
MUST BE CLEARLY VISIBLE: the three lanes full of slow cars.
MUST NOT APPEAR: signs, text."""),
  "Der er tæt trafik i alle tre vognbaner i din retning. Vognbanen ved siden af dig glider lidt hurtigere. Hvad gælder?",
  "There is dense traffic in all three lanes in your direction. The lane beside you is moving a little faster. What applies?",
  "در هر سه خطِ جهت شما ترافیک سنگین است. خط کناری شما کمی سریع‌تر حرکت می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg bliver i min vognbane og skifter kun, når det er nødvendigt, fx før et sving.",
    "I stay in my lane and only change when it is necessary, for example before a turn.",
    "در خط خودم می‌مانم و فقط وقتی لازم باشد، مثلاً پیش از پیچیدن، خط عوض می‌کنم.",
    "I tæt trafik i flere vognbaner må du kun skifte vognbane, når det er nødvendigt, fx før et kryds eller for at standse.",
    "In dense traffic in several lanes you may only change lanes when necessary, for example before a junction or to stop.",
    "در ترافیک سنگینِ چندخطه فقط وقتی لازم است می‌توانید خط عوض کنید، مثلاً پیش از تقاطع یا برای توقف."),
  S(True, "Kører bilerne i en anden vognbane forbi mig, er det ikke overhaling.", "If the cars in another lane go past me, it is not overtaking.",
    "اگر خودروهای خط دیگر از کنارم رد شوند، سبقت حساب نمی‌شود.",
    "I tæt trafik i flere vognbaner regnes det ikke som overhaling, at en vognbane kører hurtigere end en anden.",
    "In dense traffic in several lanes, one lane moving faster than another does not count as overtaking.",
    "در ترافیک سنگینِ چندخطه، سریع‌تر رفتنِ یک خط نسبت به خط دیگر سبقت حساب نمی‌شود."),
  S(False, "Jeg skifter til den vognbane, der kører hurtigst, så snart der er et hul.", "I change to whichever lane is moving fastest as soon as there is a gap.",
    "به محض پیدا شدن فاصله، به سریع‌ترین خط می‌روم.",
    "Unødvendige vognbaneskift i tæt trafik øger risikoen for uheld.", "Unnecessary lane changes in dense traffic increase the risk of accidents.",
    "تغییر خطِ غیرضروری در ترافیک سنگین خطر تصادف را بیشتر می‌کند."),
  S(False, "Jeg må ikke køre hurtigere end bilerne i vognbanen til venstre for mig.", "I must not drive faster than the cars in the lane to my left.",
    "نباید از خودروهای خط سمت چپم سریع‌تر برانم.",
    "I tæt trafik må en vognbane godt glide hurtigere end en anden.", "In dense traffic one lane may well move faster than another.",
    "در ترافیک سنگین ممکن است یک خط سریع‌تر از خط دیگر حرکت کند."),
)

Q(5475, "7.4", view("""
THE SCENE: a road with two lanes in our direction; the car in front of us in our lane brakes hard (bright brake lights); in the left
door mirror (at the left edge of the picture) a car can be seen in the left lane slightly behind us.
MUST BE CLEARLY VISIBLE: the hard-braking car ahead, the car in the left lane in the mirror.
MUST NOT APPEAR: signs, text."""),
  "Bilen foran dig bremser pludselig hårdt. I vognbanen ved siden af kommer der en bil lidt bag dig. Hvordan forholder du dig?",
  "The car in front of you suddenly brakes hard. In the lane beside you a car is coming a little behind you. What do you do?",
  "خودروی جلوی شما ناگهان ترمز شدید می‌گیرد. در خط کناری خودرویی کمی عقب‌تر از شما می‌آید. چه می‌کنید؟",
  S(True, "Jeg bremser selv i stedet for at styre ud i vognbanen ved siden af.", "I brake myself rather than steer out into the lane beside me.",
    "به‌جای این‌که به خط کناری بپیچم، خودم ترمز می‌گیرم.",
    "Et pludseligt vognbaneskift kan føre dig ind foran bilen i den anden vognbane.", "A sudden lane change may take you in front of the car in the other lane.",
    "تغییر خط ناگهانی ممکن است شما را جلوی خودروی خط دیگر ببرد."),
  S(True, "Holder jeg god afstand, kan jeg standse uden at skulle skifte vognbane.", "If I keep a good distance, I can stop without having to change lanes.",
    "اگر فاصله‌ی کافی نگه دارم، می‌توانم بدون تغییر خط بایستم.",
    "Afstanden skal være så stor, at du kan standse, hvis den forankørende bremser.", "The distance must be such that you can stop if the one in front brakes.",
    "فاصله باید آن‌قدر باشد که اگر وسیله‌ی جلو ترمز کرد، بتوانید بایستید."),
  S(True, "Spejlet viser, at der kommer en bil i den anden vognbane, så den vej er ikke fri.",
    "The mirror shows a car coming in the other lane, so that way is not clear.",
    "آینه نشان می‌دهد در خط دیگر خودرویی می‌آید، پس آن مسیر باز نیست.",
    "Du må kun skifte vognbane, når det kan ske uden fare.", "You may only change lanes when it can be done safely.",
    "فقط وقتی می‌توانید خط عوض کنید که بی‌خطر باشد."),
  S(False, "Jeg styrer altid ud i den anden vognbane, fordi det er hurtigere end at bremse.",
    "I always steer out into the other lane, because it is quicker than braking.",
    "همیشه به خط دیگر می‌پیچم، چون از ترمز گرفتن سریع‌تر است.",
    "Det er farligt, når du ikke ved, om vognbanen er fri.", "That is dangerous when you do not know whether the lane is clear.",
    "وقتی نمی‌دانید آن خط خالی است، این کار خطرناک است."),
)
