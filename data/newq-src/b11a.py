# «آزمون جدید», batch 11 (6001–6100), part a: straight on at junctions (7.12), speed (7.3), road users beside the road (7.6), signs and
# markings (6.1), alcohol (4.4), the car (1.2), overtaking (7.9), road conditions (5.2), stopping and parking (7.18), motorways (7.16),
# general rules (6.2), lane changes (7.4), large vehicles (3.2), safety equipment (8.1), left turns (7.14), the licence (10.3), other
# road users' behaviour (4.5) and road types (5.1).
# Rules: Færdselsloven §§ 7 stk. 2 (keep the road open for an emergency vehicle that uses its special signals), 15 stk. 1, 16 stk. 3
# (after a left turn be on the right of the new road), 18 stk. 2 and 4, 20 stk. 1, 21 stk. 3–4, 22, 26 stk. 2, 4 and 6 (give way to
# the right; no left turn before it causes no inconvenience to oncoming traffic), 32 stk. 1–2, 41, 42 stk. 1–2, 46 stk. 2 (no reversing
# on a motorway), 53 (0,50 promille during or after the drive), 55 stk. 1–2 (the police may at any time ask for a breath, saliva or
# sweat test), 80 stk. 1 (seat belts); Dyrevelfærdsloven (help for an animal you have hit; game that has been hit is reported to the
# police); BEK 425/2023: § 9 U 3 (times in black for weekdays except Saturdays, in red for Sundays
# and holidays), § 48 N 41 (yellow reflectors on the right, white on the left, normally 100 m apart, closer in bends), § 51 O 43–45
# (striped barriers are passed on the side the stripes slope down towards), § 60 V 23 (a bay with the wheelchair symbol only for
# vehicles with a parking card); the driving licence's harmonised code 01 (vision correction); one person only on an electric kick
# scooter (the rules for motorised kick scooters).
# Guidance (not law): an electric car's silent, strong acceleration hides the speed; alcohol is burnt slowly, also while you sleep; a
# burst tyre pulls the car to its side; hail can lie on the road like ice; animals on the road are unpredictable; a bus's rear overhang
# swings out when it turns; with the right wheels in a soft verge, ease off and steer back gently; with the engine stopped, steering and
# brakes still work but need more force; a horse can be frightened by a car close by; a 2+1 road has a middle barrier and overtaking
# only where there are two lanes; an injured wild animal is left to those who know how to handle it.
from nq import Q, S, above, picture, town, view

Q(6001, "7.12", town("""
THE SCENE: a junction in a residential area without any signs, shark teeth or road markings; from the side road on the LEFT an
ambulance (yellow, with a chequered pattern on its sides) approaches the junction; its blue roof lights are switched OFF (dark) and
nothing flashes. No other traffic.
MUST BE CLEARLY VISIBLE: the unmarked junction, the ambulance coming from the left with its roof lights switched off.
MUST NOT APPEAR: signs, shark teeth, flashing lights, text except the word AMBULANCE on the vehicle."""),
  "Du skal ligeud i et kryds uden tavler og afmærkning. Fra venstre kommer en ambulance, men den har hverken blå blink eller sirene "
  "tændt. Hvad gælder?",
  "You are going straight on at a junction without signs or markings. An ambulance is coming from the left, but it has neither its "
  "blue lights nor its siren on. What applies?",
  "در تقاطعی بدون تابلو و خط‌کشی می‌خواهید مستقیم بروید. از سمت چپ آمبولانسی می‌آید، اما نه چراغ گردان آبی آن روشن است و نه آژیرش. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Ambulancen skal holde tilbage for mig, fordi jeg kommer fra dens højre side.",
    "The ambulance must give way to me, because I am coming from its right.",
    "آمبولانس باید به من راه بدهد، چون من از سمت راستِ آن می‌آیم.",
    "Uden udrykningssignaler gælder højrevigepligten også for en ambulance.",
    "Without its emergency signals the rule of giving way to the right also applies to an ambulance.",
    "بدون علائم اضطراری، قاعده‌ی راه دادن به سمت راست برای آمبولانس هم برقرار است."),
  S(True, "Jeg holder alligevel øje med ambulancen og er klar til at bremse.",
    "I still keep an eye on the ambulance and am ready to brake.", "با این حال آمبولانس را زیر نظر دارم و آماده‌ی ترمز هستم.",
    "Du skal køre, så et uheld kan undgås, hvis den anden ikke holder tilbage.",
    "You must drive so that an accident can be avoided if the other driver does not give way.",
    "باید طوری برانید که اگر راننده‌ی دیگر راه نداد، بتوان از تصادف جلوگیری کرد."),
  S(False, "En ambulance har altid forkørselsret, også uden blink og sirene.",
    "An ambulance always has right of way, even without lights and siren.", "آمبولانس همیشه حق تقدم دارد، حتی بدون چراغ گردان و آژیر.",
    "Du skal kun holde vejen åben for den, når den bruger de særlige lyd- og lyssignaler.",
    "You only have to keep the road open for it when it uses the special sound and light signals.",
    "فقط وقتی از علائم صوتی و نوری ویژه استفاده می‌کند، باید راه را برایش باز کنید."),
  S(False, "Tænder ambulancen blink og sirene, kører jeg bare videre, fordi jeg allerede har forkørselsret.",
    "If the ambulance switches on its lights and siren, I simply carry on, because I already have right of way.",
    "اگر آمبولانس چراغ گردان و آژیرش را روشن کند، همین‌طور ادامه می‌دهم، چون از قبل حق تقدم دارم.",
    "Så snart den bruger udrykningssignalerne, skal du i god tid holde vejen åben for den og om nødvendigt standse.",
    "As soon as it uses its emergency signals, you must keep the road open for it in good time and stop if necessary.",
    "به محض این‌که از علائم اضطراری استفاده کند، باید به‌موقع راه را برایش باز کنید و در صورت لزوم بایستید."),
)

Q(6002, "7.3", picture("""
Inside a modern electric car, seen from just behind and to the right of the driver's seat: a minimalist dashboard with a large digital
display showing a speed readout and a small plug symbol, no gear lever; through the windscreen a straight, empty country road in good
weather.
MUST BE CLEARLY VISIBLE: the modern electric-car interior with the large digital display, the road ahead.
MUST NOT APPEAR: brand logos, readable text, the driver's face."""),
  "Du kører for første gang i en kraftig elbil. Den accelererer meget hurtigt og næsten uden lyd. Hvad skal du være opmærksom på?",
  "You are driving a powerful electric car for the first time. It accelerates very quickly and almost silently. What should you be "
  "aware of?",
  "برای اولین بار با یک خودروی برقیِ پرقدرت رانندگی می‌کنید. خیلی سریع و تقریباً بی‌صدا شتاب می‌گیرد. به چه چیزی باید توجه کنید؟",
  S(True, "Farten kan stige hurtigere, end jeg mærker det, så jeg holder øje med speedometeret.",
    "The speed can rise faster than I feel it, so I keep an eye on the speedometer.",
    "سرعت ممکن است سریع‌تر از آنچه حس می‌کنم بالا برود، پس سرعت‌سنج را زیر نظر دارم.",
    "Uden motorstøj er det svært at mærke, hvor hurtigt du kører.", "Without engine noise it is hard to feel how fast you are going.",
    "بدون صدای موتور سخت است حس کنید چقدر سریع می‌رانید."),
  S(True, "Jeg træder blødt på speederen, især når vejen er våd eller glat.",
    "I press the accelerator gently, especially when the road is wet or slippery.",
    "پدال گاز را آرام فشار می‌دهم، به‌خصوص وقتی جاده خیس یا لغزنده است.",
    "Den store kraft kan få hjulene til at miste grebet.", "The great power can make the wheels lose their grip.",
    "نیروی زیاد ممکن است باعث شود چرخ‌ها چسبندگی‌شان را از دست بدهند."),
  S(False, "Elbiler bremser altid på kortere afstand, så jeg kan holde mindre afstand til bilen foran.",
    "Electric cars always stop in a shorter distance, so I can keep a smaller gap to the car in front.",
    "خودروهای برقی همیشه در مسافت کوتاه‌تری می‌ایستند، پس می‌توانم فاصله‌ی کمتری با خودروی جلویی نگه دارم.",
    "Elbiler er ofte tunge, og bremselængden afhænger af fart, dæk og føre, ikke af motortypen.",
    "Electric cars are often heavy, and the braking distance depends on speed, tyres and road conditions, not on the type of motor.",
    "خودروهای برقی اغلب سنگین‌اند و مسافت ترمز به سرعت، لاستیک و وضعیت جاده بستگی دارد، نه به نوع موتور."),
  S(False, "Fordi bilen accelererer så hurtigt, må jeg kortvarigt køre over grænsen, mens jeg overhaler.",
    "Because the car accelerates so quickly, I may briefly go over the limit while I overtake.",
    "چون خودرو این‌قدر سریع شتاب می‌گیرد، می‌توانم هنگام سبقت برای مدت کوتاهی از حد مجاز سرعت بالاتر بروم.",
    "Hastighedsgrænsen gælder også, mens du overhaler.", "The speed limit also applies while you are overtaking.",
    "حد مجاز سرعت هنگام سبقت هم برقرار است."),
)

Q(6003, "7.6", view("""
THE SCENE: a narrow country road past a farm (a wooden farm gate and a fence at the right); a flock of about a dozen white geese
walks slowly across the road from right to left a short distance ahead; a few geese are still coming out through the gate.
MUST BE CLEARLY VISIBLE: the geese on the road, the ones still coming from the gate.
MUST NOT APPEAR: people, signs, text."""),
  "Ved en gård går en flok gæs langsomt over vejen foran dig. Hvordan forholder du dig?",
  "Near a farm a flock of geese is slowly crossing the road in front of you. What do you do?",
  "نزدیک یک مزرعه، گله‌ای غاز آهسته از جاده جلوی شما رد می‌شوند. چه می‌کنید؟",
  S(True, "Jeg standser og venter, til alle gæssene er kommet over.", "I stop and wait until all the geese have crossed.",
    "می‌ایستم و صبر می‌کنم تا همه‌ی غازها رد شوند.",
    "Dyr er uforudsigelige, og der kan komme flere efter de første.", "Animals are unpredictable, and more may follow the first ones.",
    "حیوانات رفتار قابل پیش‌بینی ندارند و ممکن است پشت سر اولی‌ها باز هم بیایند."),
  S(False, "Jeg dytter, så gæssene skynder sig over vejen.", "I sound the horn so that the geese hurry across the road.",
    "بوق می‌زنم تا غازها با عجله از جاده رد شوند.",
    "Hornet må kun bruges for at afværge fare, og larm kan få dyrene til at løbe i alle retninger.",
    "The horn may only be used to avert danger, and noise can make the animals run in all directions.",
    "بوق فقط برای دفع خطر است و سروصدا ممکن است حیوانات را به هر سو فراری دهد."),
  S(False, "Jeg kører langsomt ind imellem gæssene, så de flytter sig.", "I drive slowly in among the geese so that they move away.",
    "آهسته بین غازها می‌رانم تا کنار بروند.",
    "Så kan du ramme dyrene, og de kan flakse op foran ruden.",
    "Then you may hit the animals, and they may flap up in front of the windscreen.",
    "در این صورت ممکن است به حیوانات بزنید و آن‌ها جلوی شیشه بال‌زنان بالا بپرند."),
)

Q(6004, "6.1", view("""
THE SCENE: a dark two-lane country road without street lights, curving gently to the left further ahead; along both edges stand white
roadside posts with a black, slanted top; in our dipped headlights the small reflectors on the posts on the RIGHT side glow YELLOW
(amber), those on the posts on the LEFT side glow WHITE; in the bend ahead the posts stand noticeably closer together.
MUST BE CLEARLY VISIBLE: the yellow reflectors on the right-hand posts, the white reflectors on the left-hand posts, the closer spacing
in the bend.
MUST NOT APPEAR: street lights, signs, text, other vehicles.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt, og du kører på en landevej med kantpæle i begge sider. Hvad viser kantpælene?",
  "It is dark, and you are driving on a country road with roadside posts on both sides. What do the posts show?",
  "هوا تاریک است و در جاده‌ای بیرون شهر می‌رانید که در هر دو طرفش تیرک‌های کنار جاده هست. این تیرک‌ها چه چیزی را نشان می‌دهند؟",
  S(True, "Pælene med gule reflekser står i højre side af vejen.", "The posts with yellow reflectors stand on the right side of the road.",
    "تیرک‌هایی که شبرنگ زرد دارند در سمت راست جاده‌اند.",
    "Kantpæle har gul refleks i højre vejside.", "Roadside posts have a yellow reflector on the right side of the road.",
    "تیرک‌های کنار جاده در سمت راست جاده شبرنگ زرد دارند."),
  S(True, "Pælene med hvide reflekser står i venstre side af vejen.", "The posts with white reflectors stand on the left side of the road.",
    "تیرک‌هایی که شبرنگ سفید دارند در سمت چپ جاده‌اند.",
    "I venstre side er refleksen hvid, så du i mørke kan se, hvor begge vejkanter er.",
    "On the left side the reflector is white, so that in the dark you can see where both edges of the road are.",
    "در سمت چپ شبرنگ سفید است تا در تاریکی ببینید هر دو لبه‌ی جاده کجاست."),
  S(True, "Står pælene tættere end ellers, kan det være, fordi der kommer et sving.",
    "If the posts stand closer together than elsewhere, it may be because a bend is coming.",
    "اگر تیرک‌ها نزدیک‌تر از جاهای دیگر باشند، ممکن است به این دلیل باشد که پیچی در راه است.",
    "Normalt er der omkring 100 m mellem pælene, men i sving står de tættere.",
    "There are normally about 100 m between the posts, but in bends they stand closer together.",
    "معمولاً حدود ۱۰۰ متر بین تیرک‌ها فاصله است، اما در پیچ‌ها نزدیک‌تر به هم‌اند."),
  S(False, "Reflekserne viser, hvor jeg må parkere i rabatten.", "The reflectors show where I may park on the verge.",
    "شبرنگ‌ها نشان می‌دهند کجای حاشیه‌ی جاده می‌توانم پارک کنم.",
    "Kantpæle viser vejkantens forløb; de siger intet om parkering.",
    "Roadside posts show the line of the road edge; they say nothing about parking.",
    "تیرک‌های کنار جاده مسیر لبه‌ی جاده را نشان می‌دهند و ربطی به پارک کردن ندارند."),
)

Q(6005, "4.4", picture("""
A kitchen in the early morning: on the table a mug of coffee and a set of car keys; on the counter several empty wine and beer bottles
from a party the night before; through the window a car is parked in the driveway; a person's hand reaches for the car keys.
MUST BE CLEARLY VISIBLE: the empty bottles, the car keys, the car outside.
MUST NOT APPEAR: faces, brand labels, text."""),
  "Du var til fest i går og drak meget til kl. 2 om natten. Kl. 8 føler du dig frisk og vil køre på arbejde. Hvad gælder?",
  "You were at a party yesterday and drank a lot until 2 a.m. At 8 a.m. you feel fresh and want to drive to work. What applies?",
  "دیروز در یک مهمانی بودید و تا ساعت ۲ بامداد زیاد نوشیدید. ساعت ۸ صبح احساس سرحالی می‌کنید و می‌خواهید با خودرو سر کار بروید. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Der kan stadig være så meget alkohol i mit blod, at jeg ikke må køre.",
    "There may still be so much alcohol in my blood that I must not drive.",
    "ممکن است هنوز آن‌قدر الکل در خونم باشد که اجازه‌ی رانندگی نداشته باشم.",
    "Kroppen forbrænder alkohol langsomt, så efter meget alkohol kan promillen være for høj mange timer efter.",
    "The body burns alcohol slowly, so after a lot of alcohol the level may still be too high many hours later.",
    "بدن الکل را آهسته می‌سوزاند، پس پس از نوشیدن زیاد ممکن است ساعت‌ها بعد هم مقدار الکل خون بیش از حد مجاز باشد."),
  S(False, "Når jeg har sovet, er alkoholen ude af kroppen.", "Once I have slept, the alcohol is out of my body.",
    "وقتی خوابیده‌ام، الکل از بدنم بیرون رفته است.",
    "Søvn får ikke alkoholen hurtigere ud; forbrændingen går lige langsomt, mens du sover.",
    "Sleep does not get the alcohol out any faster; it is burnt just as slowly while you sleep.",
    "خواب الکل را سریع‌تر بیرون نمی‌برد؛ در خواب هم الکل همان‌قدر آهسته سوزانده می‌شود."),
  S(False, "Jeg kan selv mærke, om jeg er over promillegrænsen.", "I can feel for myself whether I am over the limit.",
    "خودم می‌توانم حس کنم که از حد مجاز الکل بالاترم یا نه.",
    "Man kan føle sig frisk og alligevel have for meget alkohol i blodet.",
    "You can feel fresh and still have too much alcohol in your blood.",
    "ممکن است احساس سرحالی کنید و باز هم الکل خونتان بیش از حد باشد."),
  S(True, "Er jeg i tvivl, lader jeg bilen stå og tager bussen eller beder en anden om at køre.",
    "If I am in doubt, I leave the car and take the bus or ask someone else to drive.",
    "اگر شک دارم، خودرو را نمی‌برم و با اتوبوس می‌روم یا از کس دیگری می‌خواهم رانندگی کند.",
    "Det er promillen under og efter kørslen, der gælder, og ansvaret er dit.",
    "It is the level during and after the drive that counts, and the responsibility is yours.",
    "مقدار الکل خون در حین و پس از رانندگی ملاک است و مسئولیتش با شماست."),
)

Q(6006, "1.2", picture("""
A car on a motorway seen from behind and a little above: its front left tyre has just burst, small pieces of rubber fly off, and the
car leans slightly and pulls to the left; to the right of the lanes there is a wide hard shoulder.
MUST BE CLEARLY VISIBLE: the burst front tyre, the car pulling to the side, the hard shoulder.
MUST NOT APPEAR: other vehicles close by, readable number plates, text."""),
  "Du kører 110 km/t på motorvejen. Med et brag springer det ene fordæk, og bilen trækker kraftigt til siden. Hvad gør du?",
  "You are driving at 110 km/h on the motorway. With a bang one of the front tyres bursts, and the car pulls hard to the side. What do "
  "you do?",
  "در آزادراه با سرعت ۱۱۰ کیلومتر در ساعت می‌رانید. با صدایی بلند یکی از لاستیک‌های جلو می‌ترکد و خودرو به‌شدت به یک طرف کشیده "
  "می‌شود. چه می‌کنید؟",
  S(True, "Jeg holder godt fast i rattet og holder bilen i min vognbane.", "I hold the steering wheel firmly and keep the car in my lane.",
    "فرمان را محکم نگه می‌دارم و خودرو را در خط خودم نگه می‌دارم.",
    "Bilen trækker mod det punkterede hjul, og du skal styre imod.",
    "The car pulls towards the burst tyre, and you must steer against it.",
    "خودرو به سمت لاستیک ترکیده کشیده می‌شود و باید خلاف آن فرمان بدهید."),
  S(False, "Jeg bremser så hårdt, jeg kan, med det samme.", "I brake as hard as I can straight away.",
    "فوراً تا جایی که می‌توانم محکم ترمز می‌کنم.",
    "En hård opbremsning, mens bilen trækker skævt, kan få den til at skride ud.",
    "Hard braking while the car is pulling to one side can make it skid.",
    "ترمز شدید وقتی خودرو کج کشیده می‌شود، ممکن است باعث سُر خوردن آن شود."),
  S(True, "Jeg slipper speederen, bremser roligt og kører ud i nødsporet med havariblinket tændt.",
    "I release the accelerator, brake gently and drive onto the hard shoulder with the hazard lights on.",
    "پایم را از پدال گاز برمی‌دارم، آرام ترمز می‌کنم و با فلاشرِ روشن به شانه‌ی اضطراری می‌روم.",
    "Så får du farten ned uden at miste herredømmet over bilen og kommer væk fra trafikken.",
    "That way you reduce speed without losing control of the car and get away from the traffic.",
    "این‌طور سرعت را بدون از دست دادن کنترل خودرو کم می‌کنید و از جریان ترافیک دور می‌شوید."),
  S(False, "Jeg kører videre på det flade dæk til næste rasteplads.", "I drive on on the flat tyre to the next rest area.",
    "با همان لاستیک پنچر تا استراحتگاه بعدی ادامه می‌دهم.",
    "Bilen er svær at styre på et fladt dæk, og hjulet kan blive ødelagt; stands, så snart det kan ske sikkert.",
    "The car is hard to steer on a flat tyre, and the wheel can be ruined; stop as soon as it can be done safely.",
    "خودرو با لاستیک پنچر سخت کنترل می‌شود و چرخ ممکن است خراب شود؛ به محض این‌که به‌طور ایمن ممکن بود، توقف کنید."),
)

Q(6007, "7.12", above("""
THE SCENE: a staggered crossroads seen from above: a straight main road runs from left to right across the picture, one lane in each
direction with a broken centre line. A side road joins from the BOTTOM, with shark teeth (white triangles) across its mouth; a second
side road leaves from the TOP side about 30 m further to the LEFT.
VEHICLES (colour code used strictly): a RED car (ours) waiting at the shark teeth in the bottom side road; a DASHED ORANGE arrow shows
its way: a left turn into the main road's upper lane (the lane for traffic going left), about 30 m along it, then a right turn into
the top side road. A BLUE car comes along the main road from the left, a GREY car from the right.
MUST NOT APPEAR: traffic lights, signs, text."""),
  "Du kommer ad en sidevej med hajtænder og skal ligeud. Vejen fortsætter på den anden side af hovedvejen, men ca. 30 m længere til "
  "venstre. Hvordan kører du?",
  "You are coming along a side road with shark teeth and want to go straight on. The road continues on the other side of the main road, "
  "but about 30 m further to the left. How do you drive?",
  "از یک راه فرعی با علامت دندان‌کوسه می‌آیید و می‌خواهید مستقیم بروید. راه در آن سوی جاده‌ی اصلی ادامه دارد، اما حدود ۳۰ متر آن طرف‌تر "
  "به سمت چپ. چطور رانندگی می‌کنید؟",
  S(True, "Jeg holder tilbage for trafikken på hovedvejen fra begge sider.", "I give way to the traffic on the main road from both sides.",
    "به ترافیک جاده‌ی اصلی از هر دو طرف راه می‌دهم.",
    "Hajtænderne betyder, at du har ubetinget vigepligt.", "The shark teeth mean that you must give way to all traffic.",
    "دندان‌کوسه یعنی باید بی‌قیدوشرط راه بدهید."),
  S(True, "Jeg blinker til venstre, når jeg svinger ud på hovedvejen.", "I indicate left when I turn out onto the main road.",
    "وقتی به جاده‌ی اصلی می‌پیچم، راهنمای چپ می‌زنم.",
    "Du svinger til venstre ud på hovedvejen og skal give tegn før svingningen.",
    "You turn left onto the main road and must signal before turning.",
    "به چپ وارد جاده‌ی اصلی می‌شوید و باید پیش از پیچیدن علامت بدهید."),
  S(True, "Før jeg svinger til højre ind på den anden sidevej, blinker jeg til højre og ser efter cyklister ved siden af mig.",
    "Before I turn right into the other side road, I indicate right and look for cyclists beside me.",
    "پیش از این‌که به راست وارد راه فرعیِ دیگر شوم، راهنمای راست می‌زنم و دوچرخه‌سوارانِ کنارم را نگاه می‌کنم.",
    "Det er to sving lige efter hinanden, og ved hvert skal du give tegn og tage hensyn til dem, der kører ligeud.",
    "These are two turns right after each other, and at each one you must signal and consider those going straight on.",
    "این دو پیچ پشت سر هم است و در هر کدام باید علامت بدهید و مراقب کسانی باشید که مستقیم می‌روند."),
  S(False, "Jeg kører skråt over hovedvejen direkte ind i den anden sidevej.",
    "I drive diagonally across the main road directly into the other side road.",
    "به‌صورت مورب از جاده‌ی اصلی می‌گذرم و یک‌راست وارد راه فرعیِ دیگر می‌شوم.",
    "Så kommer du over i den forkerte side af hovedvejen; kør ind i dens højre side, og sving derefter til højre.",
    "Then you end up on the wrong side of the main road; drive into its right-hand side and then turn right.",
    "در این صورت به سمت اشتباه جاده‌ی اصلی می‌روید؛ وارد سمت راست آن شوید و سپس به راست بپیچید."),
)

Q(6008, "7.9", view("""
THE SCENE: a two-lane country road; along the right edge the asphalt is broken up by many potholes and cracks; a little ahead of us a
cyclist rides about a metre out from the edge, keeping clear of them; in the other lane an oncoming car approaches.
MUST BE CLEARLY VISIBLE: the potholes along the right edge, the cyclist riding out from the edge, the oncoming car.
MUST NOT APPEAR: signs, text."""),
  "Foran dig kører en cyklist et stykke ude på vejen, fordi asfalten langs kanten er fuld af huller. En bil kommer imod dig. Hvordan "
  "forholder du dig?",
  "Ahead of you a cyclist is riding some way out in the road, because the asphalt along the edge is full of potholes. A car is coming "
  "towards you. What do you do?",
  "جلوی شما دوچرخه‌سواری کمی دورتر از لبه‌ی جاده می‌راند، چون آسفالت کنار جاده پر از چاله است. خودرویی از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg overhaler først, når den modkørende bil er kørt forbi.", "I only overtake once the oncoming car has gone past.",
    "فقط وقتی خودروی روبه‌رو رد شد، سبقت می‌گیرم.",
    "Du skal kunne holde god afstand til cyklisten, og det kan du ikke, mens bilen kommer.",
    "You must be able to keep a good distance from the cyclist, and you cannot while the car is coming.",
    "باید بتوانید فاصله‌ی کافی با دوچرخه‌سوار داشته باشید و تا وقتی آن خودرو می‌آید، این ممکن نیست."),
  S(True, "Når jeg overhaler, holder jeg ekstra afstand, fordi cyklisten kan svinge ud uden om et hul.",
    "When I overtake, I keep extra distance, because the cyclist may swerve out round a pothole.",
    "وقتی سبقت می‌گیرم، فاصله‌ی بیشتری نگه می‌دارم، چون دوچرخه‌سوار ممکن است برای دور زدن چاله‌ای به وسط بیاید.",
    "Hullerne kan få cyklisten til at ændre retning uden varsel.", "The potholes may make the cyclist change course without warning.",
    "چاله‌ها ممکن است دوچرخه‌سوار را وادار کنند بی‌خبر مسیرش را عوض کند."),
  S(False, "Jeg dytter, så cyklisten kører ind til kanten.", "I sound the horn so that the cyclist moves in to the edge.",
    "بوق می‌زنم تا دوچرخه‌سوار به لبه‌ی جاده برود.",
    "Cyklisten undgår hullerne af en god grund, og hornet må kun bruges for at afværge fare.",
    "The cyclist is avoiding the potholes for a good reason, and the horn may only be used to avert danger.",
    "دوچرخه‌سوار به دلیل موجهی از چاله‌ها دوری می‌کند و بوق فقط برای دفع خطر است."),
  S(False, "Cyklisten skal køre helt inde ved kanten, så jeg kan komme forbi med det samme.",
    "The cyclist must ride right at the edge so that I can get past at once.",
    "دوچرخه‌سوار باید درست در لبه‌ی جاده براند تا من فوراً رد شوم.",
    "Cyklister skal holde til højre, så vidt det er muligt, og med huller i kanten er det hverken muligt eller sikkert.",
    "Cyclists must keep to the right as far as possible, and with potholes at the edge that is neither possible nor safe.",
    "دوچرخه‌سواران باید تا جایی که ممکن است سمت راست بمانند و با چاله‌های لبه، این نه ممکن است و نه ایمن."),
)

Q(6009, "5.2", view("""
THE SCENE: a two-lane country road during a sudden heavy hail shower; hailstones bounce on the bonnet, and the road surface is covered
with a white layer of hail grains; a car some way ahead has its brake lights on.
MUST BE CLEARLY VISIBLE: the falling hail, the white layer of hail on the road, the brake lights ahead.
MUST NOT APPEAR: signs, text.""", cond="sudden heavy hail shower, road white with hail, poor visibility"),
  "Pludselig kommer der en kraftig haglbyge, og vejen bliver hurtigt hvid af haglkorn. Hvordan forholder du dig?",
  "Suddenly a heavy hail shower comes, and the road quickly turns white with hailstones. What do you do?",
  "ناگهان تگرگ شدیدی می‌بارد و جاده به‌سرعت از دانه‌های تگرگ سفید می‌شود. چه می‌کنید؟",
  S(True, "Jeg sætter farten kraftigt ned, fordi haglene kan gøre vejen meget glat.",
    "I reduce my speed a lot, because the hail can make the road very slippery.",
    "سرعتم را خیلی کم می‌کنم، چون تگرگ ممکن است جاده را بسیار لغزنده کند.",
    "Haglkorn på vejen virker som et lag små iskugler under dækkene.", "Hailstones on the road act like a layer of small balls of ice under the tyres.",
    "دانه‌های تگرگ روی جاده مثل لایه‌ای از گلوله‌های کوچک یخ زیر لاستیک‌ها عمل می‌کنند."),
  S(True, "Jeg holder større afstand og undgår at bremse og dreje brat.",
    "I keep a greater distance and avoid braking and steering sharply.",
    "فاصله‌ی بیشتری نگه می‌دارم و از ترمز و فرمانِ ناگهانی پرهیز می‌کنم.",
    "Bremselængden bliver længere, og bratte bevægelser kan få bilen til at skride.",
    "The braking distance gets longer, and sudden movements can make the car skid.",
    "مسافت ترمز طولانی‌تر می‌شود و حرکات ناگهانی ممکن است خودرو را به سُر خوردن بیندازد."),
  S(False, "Hagl smelter med det samme, så vejen er ikke glattere end ved almindelig regn.",
    "Hail melts at once, so the road is no more slippery than in ordinary rain.",
    "تگرگ فوراً آب می‌شود، پس جاده از باران معمولی لغزنده‌تر نیست.",
    "Et lag haglkorn kan blive liggende et stykke tid og være glat som is, også om sommeren.",
    "A layer of hailstones can stay on the road for a while and be as slippery as ice, even in summer.",
    "لایه‌ی تگرگ ممکن است مدتی روی جاده بماند و مثل یخ لغزنده باشد، حتی در تابستان."),
  S(False, "Jeg standser med det samme i min vognbane og venter på, at bygen går over.",
    "I stop at once in my lane and wait for the shower to pass.",
    "فوراً در خط خودم می‌ایستم و صبر می‌کنم تا رگبار تمام شود.",
    "Bilerne bag dig kan have svært ved at standse; vil du holde ind, skal det være et sikkert sted uden for kørebanen.",
    "The cars behind you may find it hard to stop; if you want to pull in, it must be at a safe place off the carriageway.",
    "خودروهای پشت سرتان ممکن است به‌سختی بایستند؛ اگر می‌خواهید توقف کنید، باید جای امنی بیرون از سواره‌رو باشد."),
)

Q(6010, "7.18", town("""
THE SCENE: a small car park in town with bays marked by white lines; all bays are taken except one directly ahead of us; in the empty
bay a large white wheelchair symbol on a blue square is painted on the asphalt; nothing else marks the bay — there is no sign.
MUST BE CLEARLY VISIBLE: the empty bay with the large painted wheelchair symbol, the absence of any sign at the bay.
MUST NOT APPEAR: signs, text, people."""),
  "Den eneste ledige parkeringsbås har et stort kørestolssymbol malet på belægningen, men der står ingen tavle. Du har ikke "
  "parkeringskort for personer med handicap. Hvad gælder?",
  "The only free parking bay has a large wheelchair symbol painted on the surface, but there is no sign. You do not have a parking card "
  "for disabled people. What applies?",
  "تنها جای پارک خالی، نماد بزرگ ویلچری دارد که روی آسفالت نقاشی شده، اما هیچ تابلویی آنجا نیست. شما کارت پارک ویژه‌ی افراد دارای "
  "معلولیت ندارید. چه قاعده‌ای برقرار است؟",
  S(True, "Båsen må kun bruges af køretøjer med parkeringskort for personer med handicap.",
    "The bay may only be used by vehicles with a parking card for disabled people.",
    "این جای پارک فقط برای خودروهایی است که کارت پارک ویژه‌ی افراد دارای معلولیت دارند.",
    "Er en bås afmærket med kørestolssymbolet, må den kun bruges af køretøjer med et sådant kort, også selv om der ikke står en tavle.",
    "If a bay is marked with the wheelchair symbol, it may only be used by vehicles with such a card, even if there is no sign.",
    "اگر جای پارکی با نماد ویلچر علامت‌گذاری شده باشد، فقط خودروهای دارای این کارت می‌توانند از آن استفاده کنند، حتی اگر تابلویی نباشد."),
  S(False, "Uden en tavle er symbolet kun en opfordring.", "Without a sign the symbol is only a request.",
    "بدون تابلو، این نماد فقط یک درخواست است.",
    "Symbolet på belægningen er afmærkning, som skal følges ligesom en tavle.",
    "The symbol on the surface is a road marking that must be obeyed just like a sign.",
    "نمادِ روی آسفالت خط‌کشی است و باید مثل تابلو از آن پیروی کرد."),
  S(False, "Jeg må holde der, hvis jeg kun er væk i 10 minutter.", "I may park there if I am only away for 10 minutes.",
    "اگر فقط ۱۰ دقیقه دور باشم، می‌توانم آنجا پارک کنم.",
    "Heller ikke en kort parkering er tilladt uden kort.", "Not even a short stay is allowed without a card.",
    "بدون کارت حتی پارک کوتاه هم مجاز نیست."),
)

Q(6011, "7.16", view("""
THE SCENE: a motorway with two lanes in our direction; we are in the right lane; ahead on the hard shoulder a car is moving BACKWARDS
towards us, its white reversing lights and its hazard lights on; nothing else is on the hard shoulder.
MUST BE CLEARLY VISIBLE: the car on the hard shoulder with its white reversing lights, its distance ahead of us.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "På motorvejen bakker en bil i nødsporet tilbage mod en frakørsel, som du lige er kørt forbi. Hvordan forholder du dig?",
  "On the motorway a car is reversing along the hard shoulder back towards an exit that you have just passed. What do you do?",
  "در آزادراه خودرویی در شانه‌ی اضطراری دنده‌عقب به سمت خروجی‌ای می‌رود که شما همین الان از آن گذشته‌اید. چه می‌کنید؟",
  S(True, "Jeg er forberedt på, at bilen kan svinge ud i min vognbane.", "I am prepared for the car to swerve out into my lane.",
    "آماده‌ام که آن خودرو به خط من منحرف شود.",
    "En fører, der bakker, har dårligt udsyn bagud og kan komme ud af nødsporet.",
    "A driver who is reversing has a poor view backwards and may come out of the hard shoulder.",
    "راننده‌ای که دنده‌عقب می‌رود، دید خوبی به عقب ندارد و ممکن است از شانه‌ی اضطراری بیرون بیاید."),
  S(True, "Kan det ske uden fare, skifter jeg til venstre vognbane for at få mere afstand til bilen.",
    "If it can be done without danger, I change to the left lane to get more distance from the car.",
    "اگر بی‌خطر باشد، به خط چپ می‌روم تا فاصله‌ی بیشتری با آن خودرو داشته باشم.",
    "Så har du mere plads, hvis bilen kommer ud fra nødsporet.", "Then you have more room if the car comes out of the hard shoulder.",
    "این‌طور اگر آن خودرو از شانه‌ی اضطراری بیرون بیاید، جای بیشتری دارید."),
  S(False, "Bilen må gerne bakke i nødsporet, så længe havariblinket er tændt.",
    "The car may reverse along the hard shoulder as long as its hazard lights are on.",
    "تا وقتی فلاشرهایش روشن است، آن خودرو اجازه دارد در شانه‌ی اضطراری دنده‌عقب برود.",
    "Det er forbudt at bakke på motorvejen, også i nødsporet.", "Reversing on the motorway is forbidden, on the hard shoulder too.",
    "دنده‌عقب رفتن در آزادراه ممنوع است، در شانه‌ی اضطراری هم."),
  S(False, "Jeg sætter farten op for at komme hurtigt forbi bilen.", "I speed up to get past the car quickly.",
    "سرعتم را زیاد می‌کنم تا سریع از کنار آن خودرو رد شوم.",
    "Med høj fart har du mindre tid at reagere i, hvis bilen svinger ud.",
    "At high speed you have less time to react if the car swerves out.",
    "با سرعت زیاد، اگر آن خودرو منحرف شود، وقت کمتری برای واکنش دارید."),
)

Q(6012, "6.2", view("""
THE SCENE: a two-lane road where the police have set up a roadside check: a police car parked on the verge, two police officers in
yellow high-visibility vests; one holds a small handheld breath-test device and signals us to stop at the side of the road.
MUST BE CLEARLY VISIBLE: the police officers, the handheld device, the police car.
MUST NOT APPEAR: text other than plain police markings."""),
  "Politiet holder kontrol ved vejen og beder dig blæse i et apparat. Du har ikke drukket noget og har ikke kørt forkert. Hvad gælder?",
  "The police are holding a check by the road and ask you to blow into a device. You have not drunk anything and have not driven "
  "wrongly. What applies?",
  "پلیس کنار جاده بازرسی کرده و از شما می‌خواهد در دستگاهی فوت کنید. چیزی ننوشیده‌اید و تخلفی هم نکرده‌اید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal afgive prøven, når politiet beder om det.", "I must give the test when the police ask for it.",
    "وقتی پلیس بخواهد، باید آزمایش را انجام دهم.",
    "Politiet kan til enhver tid kræve, at føreren afgiver en udåndingsprøve.",
    "The police can at any time require the driver to give a breath test.",
    "پلیس می‌تواند هر زمان از راننده بخواهد آزمایش تنفس بدهد."),
  S(False, "Politiet må kun teste mig, hvis de har mistanke om, at jeg har drukket.",
    "The police may only test me if they suspect that I have been drinking.",
    "پلیس فقط وقتی می‌تواند از من آزمایش بگیرد که مشکوک باشد نوشیده‌ام.",
    "Politiet behøver ikke mistanke for at kræve en prøve af en fører.",
    "The police do not need any suspicion to require a test from a driver.",
    "پلیس برای درخواست آزمایش از راننده به سوءظن نیاز ندارد."),
  S(True, "Politiet kan også bede mig om en spytprøve.", "The police may also ask me for a saliva test.",
    "پلیس می‌تواند از من آزمایش بزاق هم بخواهد.",
    "Politiet kan kræve udåndings-, spyt- eller svedprøve, fx for at teste for narkotika.",
    "The police can require a breath, saliva or sweat test, for example to test for drugs.",
    "پلیس می‌تواند آزمایش تنفس، بزاق یا عرق بخواهد، مثلاً برای آزمایش مواد مخدر."),
  S(False, "Jeg kan nægte, fordi jeg ved, at jeg ikke har drukket.", "I can refuse because I know that I have not been drinking.",
    "می‌توانم امتناع کنم، چون می‌دانم ننوشیده‌ام.",
    "Nægter du, kan politiet tage dig med til en blodprøve.", "If you refuse, the police can take you for a blood test.",
    "اگر امتناع کنید، پلیس می‌تواند شما را برای آزمایش خون ببرد."),
)

Q(6013, "7.4", view("""
THE SCENE: a motorway with two lanes in our direction; we drive in the LEFT lane; directly to our right, in the right lane, a large
lorry drives beside us, its cab level with our car; ahead a blue motorway sign announces the exit with an exit arrow.
MUST BE CLEARLY VISIBLE: the lorry right beside us in the right lane, the exit sign ahead.
MUST NOT APPEAR: readable text or numbers."""),
  "Du skal fra motorvejen ved frakørslen om ca. 500 m. Du kører i venstre vognbane, og ved siden af dig i højre vognbane kører en "
  "lastbil med samme fart. Hvordan forholder du dig?",
  "You are leaving the motorway at the exit in about 500 m. You are in the left lane, and beside you in the right lane a lorry is "
  "driving at the same speed. What do you do?",
  "حدود ۵۰۰ متر دیگر باید از خروجی آزادراه خارج شوید. در خط چپ می‌رانید و کنارتان در خط راست، کامیونی با همان سرعت حرکت می‌کند. "
  "چه می‌کنید؟",
  S(True, "Jeg letter på speederen og lægger mig ind bag lastbilen i god tid.",
    "I ease off the accelerator and move in behind the lorry in good time.",
    "پایم را از روی گاز برمی‌دارم و به‌موقع پشت کامیون قرار می‌گیرم.",
    "Så kommer du over i højre vognbane uden at presse dig ind foran lastbilen.",
    "That way you get into the right lane without squeezing in front of the lorry.",
    "این‌طور بدون این‌که خودتان را جلوی کامیون جا بدهید، به خط راست می‌روید."),
  S(True, "Jeg blinker til højre og ser mig over skulderen, før jeg skifter vognbane.",
    "I indicate right and look over my shoulder before I change lanes.",
    "پیش از تغییر خط، راهنمای راست می‌زنم و از روی شانه نگاه می‌کنم.",
    "På motorvejen skal du give tegn ved vognbaneskift og sikre dig, at det kan ske uden fare.",
    "On the motorway you must signal when changing lanes and make sure it can be done without danger.",
    "در آزادراه هنگام تغییر خط باید علامت بدهید و مطمئن شوید که بی‌خطر است."),
  S(True, "Kan jeg ikke nå det, tager jeg hellere den næste frakørsel.", "If I cannot make it, I would rather take the next exit.",
    "اگر نتوانم به‌موقع برسم، ترجیح می‌دهم از خروجی بعدی بروم.",
    "En omvej er bedre end et vognbaneskift i sidste øjeblik.", "A detour is better than a lane change at the last moment.",
    "یک مسیر طولانی‌تر بهتر از تغییر خط در لحظه‌ی آخر است."),
  S(False, "Jeg giver gas og skærer ind foran lastbilen lige før frakørslen.",
    "I accelerate and cut in front of the lorry just before the exit.",
    "گاز می‌دهم و درست پیش از خروجی، جلوی کامیون می‌پیچم.",
    "Lastbilen har lang bremselængde, og et sent skift kan føre til et uheld.",
    "The lorry has a long braking distance, and a late lane change can lead to an accident.",
    "کامیون مسافت ترمز طولانی دارد و تغییر خطِ دیرهنگام ممکن است به تصادف منجر شود."),
)

Q(6014, "7.6", town("""
THE SCENE: a quiet residential street with houses and front gardens; on the RIGHT pavement, a little ahead, a small child (about four
years old) rides a small bicycle with training wheels towards a driveway where the kerb is lowered; no adults nearby.
MUST BE CLEARLY VISIBLE: the child on the bicycle with training wheels, the driveway with the lowered kerb leading onto the street.
MUST NOT APPEAR: signs, text."""),
  "På fortovet cykler et lille barn på en cykel med støttehjul hen mod en indkørsel. Der er ingen voksne lige ved barnet. Hvordan "
  "forholder du dig?",
  "On the pavement a small child on a bicycle with training wheels is riding towards a driveway. There are no adults right by the "
  "child. What do you do?",
  "روی پیاده‌رو کودک کوچکی با دوچرخه‌ای که چرخ کمکی دارد به سمت ورودی یک خانه می‌راند. هیچ بزرگسالی کنار کودک نیست. چه می‌کنید؟",
  S(True, "Jeg kører langsomt og har foden klar ved bremsen.", "I drive slowly with my foot ready at the brake.",
    "آهسته می‌رانم و پایم آماده‌ی ترمز است.",
    "Et lille barn kan ikke vurdere trafikken og kan pludselig komme ud på vejen.",
    "A small child cannot judge the traffic and may suddenly come out into the road.",
    "کودک خردسال نمی‌تواند ترافیک را ارزیابی کند و ممکن است ناگهان وارد خیابان شود."),
  S(True, "Jeg regner med, at barnet kan køre ned ad indkørslen og ud på kørebanen.",
    "I expect that the child may ride down the driveway and out onto the carriageway.",
    "احتمال می‌دهم کودک از سرازیریِ ورودی پایین بیاید و وارد سواره‌رو شود.",
    "Den sænkede kantsten fører direkte ud på vejen, og barnet ser sig måske ikke for.",
    "The lowered kerb leads straight out onto the road, and the child may not look out.",
    "جدولِ پایین‌آمده مستقیم به خیابان راه دارد و ممکن است کودک اطرافش را نگاه نکند."),
  S(False, "Barnet er på fortovet, så jeg kan køre videre med samme fart.",
    "The child is on the pavement, so I can carry on at the same speed.",
    "کودک روی پیاده‌رو است، پس می‌توانم با همان سرعت ادامه دهم.",
    "Børn på fortovet kan på et øjeblik være ude på kørebanen.", "Children on the pavement can be out on the carriageway in a moment.",
    "کودکانِ روی پیاده‌رو در یک لحظه ممکن است وارد سواره‌رو شوند."),
  S(False, "Jeg dytter for at advare barnet.", "I sound the horn to warn the child.", "برای هشدار به کودک بوق می‌زنم.",
    "Et lille barn kan blive forskrækket af hornet og reagere forkert.",
    "A small child may be startled by the horn and react wrongly.", "کودک کوچک ممکن است از بوق بترسد و واکنش اشتباهی نشان دهد."),
)

Q(6015, "3.2", town("""
THE SCENE: a junction with traffic lights in town; we stand at the stop line in the RIGHT of two lanes; directly to our left, in the
left lane, stands a long city bus whose left indicator is flashing (it will turn left); its long rear part is right beside our car;
the traffic light shows red.
MUST BE CLEARLY VISIBLE: the long bus right beside us with its flashing left indicator, the red light.
MUST NOT APPEAR: readable text, advertising."""),
  "Du holder for rødt i højre vognbane. Lige til venstre for dig holder en lang bus, som skal svinge til venstre. Hvad skal du være "
  "opmærksom på?",
  "You are waiting at a red light in the right lane. Right to your left stands a long bus that is going to turn left. What should you "
  "be aware of?",
  "پشت چراغ قرمز در خط راست ایستاده‌اید. درست سمت چپ شما اتوبوس بلندی ایستاده که می‌خواهد به چپ بپیچد. به چه چیزی باید توجه کنید؟",
  S(True, "Når bussen begynder at svinge, kan dens bagende svinge ud mod min vognbane.",
    "When the bus starts to turn, its rear end may swing out towards my lane.",
    "وقتی اتوبوس شروع به پیچیدن می‌کند، انتهای آن ممکن است به سمت خط من بیرون بزند.",
    "En bus har et langt stykke bag baghjulene, som svinger ud til den modsatte side af svinget.",
    "A bus has a long overhang behind its rear wheels, which swings out to the opposite side of the turn.",
    "اتوبوس پشت چرخ‌های عقبش بخش بلندی دارد که به سمت مخالف پیچ بیرون می‌زند."),
  S(True, "Jeg lader bussen komme et stykke frem og holder afstand til siden af den.",
    "I let the bus move ahead a little and keep my distance from its side.",
    "اجازه می‌دهم اتوبوس کمی جلو برود و از کناره‌اش فاصله می‌گیرم.",
    "Så er du uden for det område, bagenden kan svinge ind over.", "Then you are outside the area the rear end can swing over.",
    "این‌طور بیرون از محدوده‌ای هستید که انتهای اتوبوس ممکن است به آن بیاید."),
  S(False, "Bussens bagende følger nøjagtig samme spor som forhjulene.", "The rear end of the bus follows exactly the same track as the front wheels.",
    "انتهای اتوبوس دقیقاً از همان مسیر چرخ‌های جلو می‌رود.",
    "Bagenden svinger ud, og baghjulene skærer svinget.", "The rear end swings out, and the rear wheels cut the corner.",
    "انتهای اتوبوس بیرون می‌زند و چرخ‌های عقب از داخلِ پیچ می‌گذرند."),
  S(False, "Jeg kører tæt op på siden af bussen, så jeg kommer først af sted, når det bliver grønt.",
    "I drive up close beside the bus so that I get away first when the light turns green.",
    "نزدیکِ کناره‌ی اتوبوس می‌روم تا وقتی چراغ سبز شد، اول حرکت کنم.",
    "Så kan bussens bagende ramme din bil, når den svinger.", "Then the rear end of the bus may hit your car when it turns.",
    "در این صورت ممکن است هنگام پیچیدن، انتهای اتوبوس به خودروی شما بخورد."),
)

Q(6016, "7.18", town("""
THE SCENE: a street in town with a free space at the right kerb; at the kerb stands a round blue sign with a red border and one red
diagonal stripe (the Danish no-parking sign); under it a white plate shows the times «8–18» in black and, below them, «10–16» in red.
MUST BE CLEARLY VISIBLE: the no-parking sign and the plate with the black and the red times.
MUST NOT APPEAR: other signs, other text."""),
  "Det er søndag kl. 17. Du vil parkere ved en tavle med parkeringsforbud. Under tavlen står »8–18« med sort og »10–16« med rødt. "
  "Hvad gælder?",
  "It is Sunday at 5 p.m. You want to park at a no-parking sign. Under the sign it says «8–18» in black and «10–16» in red. What "
  "applies?",
  "یکشنبه ساعت ۱۷ است. می‌خواهید کنار تابلوی «پارک ممنوع» پارک کنید. زیر تابلو «8–18» به رنگ سیاه و «10–16» به رنگ قرمز نوشته شده است. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må parkere her nu.", "I may park here now.", "اکنون می‌توانم اینجا پارک کنم.",
    "Om søndagen gælder de røde tider, så forbuddet gælder kun fra kl. 10 til 16.",
    "On Sundays the red times apply, so the ban only applies from 10 a.m. to 4 p.m.",
    "یکشنبه‌ها ساعت‌های قرمز ملاک است، پس ممنوعیت فقط از ساعت ۱۰ تا ۱۶ است."),
  S(True, "Tider med rødt gælder på søn- og helligdage.", "Times in red apply on Sundays and public holidays.",
    "ساعت‌هایی که به رنگ قرمزند، برای یکشنبه‌ها و روزهای تعطیل رسمی است.",
    "Klokkeslæt med rødt gælder for søn- og helligdage.", "Times shown in red apply to Sundays and public holidays.",
    "ساعت‌هایی که با رنگ قرمز نوشته شده‌اند، برای یکشنبه‌ها و تعطیلات رسمی است."),
  S(False, "De sorte tider gælder alle ugens dage.", "The black times apply on every day of the week.",
    "ساعت‌های سیاه برای همه‌ی روزهای هفته است.",
    "Klokkeslæt med sort gælder for hverdage undtagen lørdage.", "Times shown in black apply to weekdays except Saturdays.",
    "ساعت‌هایی که با رنگ سیاه نوشته شده‌اند، برای روزهای کاری به جز شنبه است."),
  S(True, "Er det en helligdag midt i ugen, gælder de røde tider.", "If it is a public holiday in the middle of the week, the red times apply.",
    "اگر وسط هفته تعطیل رسمی باشد، ساعت‌های قرمز ملاک است.",
    "De røde tider gælder både søndage og helligdage.", "The red times apply on both Sundays and public holidays.",
    "ساعت‌های قرمز هم برای یکشنبه‌ها و هم برای تعطیلات رسمی است."),
)

Q(6017, "8.1", picture("""
Inside a car: a pregnant woman sits in the front passenger seat with the seat belt worn correctly: the lap part lies low across her
hips, under the belly; the diagonal part runs between her breasts and down beside the belly.
MUST BE CLEARLY VISIBLE: the low lap belt under the belly, the diagonal belt beside the belly.
MUST NOT APPEAR: text, logos."""),
  "Din passager er gravid i 7. måned og synes, at sikkerhedsselen er ubehagelig. Hvad gælder?",
  "Your passenger is seven months pregnant and finds the seat belt uncomfortable. What applies?",
  "مسافرتان هفت‌ماهه باردار است و کمربند ایمنی برایش ناراحت است. چه قاعده‌ای برقرار است؟",
  S(True, "Hun skal også bruge sikkerhedsselen.", "She must wear the seat belt too.", "او هم باید کمربند ایمنی ببندد.",
    "Gravide har samme pligt til at bruge sele som andre passagerer.",
    "Pregnant women have the same duty to wear a seat belt as other passengers.",
    "زنان باردار هم مثل دیگر مسافران موظف به بستن کمربندند."),
  S(True, "Hoftedelen af selen skal sidde lavt, under maven og hen over hofterne.",
    "The lap part of the belt must sit low, under the belly and across the hips.",
    "بخش کمری کمربند باید پایین، زیر شکم و روی استخوان لگن قرار بگیرد.",
    "Så presser selen ikke ind i maven ved et stød.", "Then the belt does not press into the belly in an impact.",
    "این‌طور هنگام ضربه، کمربند به شکم فشار نمی‌آورد."),
  S(True, "Skulderdelen skal gå mellem brysterne og ned ved siden af maven.",
    "The shoulder part must run between the breasts and down beside the belly.",
    "بخش شانه‌ای کمربند باید از میان سینه‌ها و کنار شکم پایین بیاید.",
    "Så er det kroppen og ikke maven, der tager imod kræfterne.", "Then it is the body and not the belly that takes the forces.",
    "این‌طور بدن نیروها را می‌گیرد، نه شکم."),
  S(False, "Det er sikrest for barnet, at hun ikke har selen på.", "It is safest for the baby if she does not wear the belt.",
    "برای جنین ایمن‌تر است که او کمربند نبندد.",
    "Uden sele er både kvinden og det ufødte barn i langt større fare ved et sammenstød.",
    "Without a belt both the woman and the unborn child are in far greater danger in a collision.",
    "بدون کمربند، هم مادر و هم جنین در تصادف در خطر بسیار بیشتری‌اند."),
)

Q(6018, "7.3", picture("""
A car on a narrow country road seen from behind and a little above: its two right wheels have run off the asphalt into a soft, grassy
verge and throw up grass and earth; beyond the verge a shallow ditch; the road is otherwise empty.
MUST BE CLEARLY VISIBLE: the right wheels in the soft grass verge beside the edge of the asphalt.
MUST NOT APPEAR: other vehicles, readable number plates, text."""),
  "Du kører 80 km/t på en landevej, og de højre hjul kommer ud i den bløde græsrabat. Hvad gør du?",
  "You are driving at 80 km/h on a country road, and the right wheels go off into the soft grass verge. What do you do?",
  "در جاده‌ای بیرون شهر با سرعت ۸۰ کیلومتر در ساعت می‌رانید و چرخ‌های سمت راست وارد حاشیه‌ی نرم و چمنی می‌شوند. چه می‌کنید؟",
  S(True, "Jeg holder fast i rattet og letter på speederen.", "I hold the wheel firmly and ease off the accelerator.",
    "فرمان را محکم نگه می‌دارم و پایم را از روی گاز برمی‌دارم.",
    "Det blødere underlag trækker i bilen, og du skal først have farten ned.",
    "The softer surface pulls at the car, and you must first get the speed down.",
    "زمینِ نرم‌تر خودرو را به سمت خود می‌کشد و اول باید سرعت را کم کنید."),
  S(True, "Først når farten er sat ned, styrer jeg roligt tilbage på asfalten.",
    "Only when the speed is down do I steer calmly back onto the asphalt.",
    "فقط وقتی سرعت کم شد، آرام به آسفالت برمی‌گردم.",
    "Når hjulene får fat i asfaltkanten, kan et kraftigt ryk i rattet sende bilen tværs over vejen.",
    "When the wheels catch the edge of the asphalt, a sharp jerk of the wheel can send the car across the road.",
    "وقتی چرخ‌ها به لبه‌ی آسفالت گیر می‌کنند، یک حرکت تند فرمان ممکن است خودرو را به عرض جاده پرتاب کند."),
  S(False, "Jeg drejer hurtigt og kraftigt rattet til venstre.", "I turn the wheel quickly and hard to the left.",
    "فرمان را سریع و محکم به چپ می‌چرخانم.",
    "Det kan få bilen til at skære over i den modsatte vognbane.", "That may make the car cut across into the opposite lane.",
    "این کار ممکن است خودرو را به خط مقابل بیندازد."),
  S(False, "Jeg bremser hårdt, så bilen standser i rabatten.", "I brake hard so that the car stops on the verge.",
    "محکم ترمز می‌کنم تا خودرو در حاشیه بایستد.",
    "Hård opbremsning med hjulene på forskelligt underlag kan få bilen til at skride.",
    "Hard braking with the wheels on different surfaces can make the car skid.",
    "ترمز شدید وقتی چرخ‌ها روی دو نوع سطح مختلف‌اند، ممکن است خودرو را به سُر خوردن بیندازد."),
)

Q(6019, "6.1", view("""
THE SCENE: a two-lane road; ahead the RIGHT lane is closed off by a horizontal barrier on two legs across the lane, painted with red
and white diagonal stripes that slope down towards the LEFT; behind it a road-works area with cones and a small excavator; the left
lane is free and nobody is coming towards us.
MUST BE CLEARLY VISIBLE: the barrier with the red and white stripes sloping down to the left, the free left lane.
MUST NOT APPEAR: signs, text, workers close to the camera."""),
  "Ved et vejarbejde er den højre side af vejen spærret af en bom med røde og hvide skrå striber. Striberne hælder ned mod venstre. "
  "Hvordan kører du forbi?",
  "At road works the right side of the road is closed off by a barrier with red and white diagonal stripes. The stripes slope down to "
  "the left. How do you pass it?",
  "در محل کارهای جاده‌ای، سمت راست جاده با یک مانع افقی با نوارهای مورب قرمز و سفید بسته شده است. نوارها به سمت چپ پایین می‌روند. "
  "چطور از کنارش رد می‌شوید؟",
  S(True, "Jeg kører forbi bommen i venstre side, når der ikke kommer nogen imod mig.",
    "I pass the barrier on its left side when nobody is coming towards me.",
    "وقتی کسی از روبه‌رو نمی‌آید، از سمت چپ مانع رد می‌شوم.",
    "En bom med skrå striber skal passeres på den side, striberne hælder ned imod, og spærringen er i din side.",
    "A barrier with diagonal stripes must be passed on the side the stripes slope down towards, and the closure is on your side.",
    "مانعِ نوارمورب را باید از سمتی رد کرد که نوارها به آن سو پایین می‌روند، و بسته بودن راه در سمت شماست."),
  S(False, "Jeg kører forbi bommen i højre side.", "I pass the barrier on its right side.", "از سمت راست مانع رد می‌شوم.",
    "Striberne hælder ned mod venstre, så det er den side, du skal passere på.",
    "The stripes slope down to the left, so that is the side you must pass on.",
    "نوارها به سمت چپ پایین می‌روند، پس باید از همان سمت رد شوید."),
  S(False, "Bommen betyder, at hele vejen er spærret, så jeg skal vende.",
    "The barrier means that the whole road is closed, so I must turn round.",
    "این مانع یعنی کل جاده بسته است، پس باید دور بزنم.",
    "Bommen spærrer kun den del af vejen, den står på.", "The barrier only closes the part of the road on which it stands.",
    "این مانع فقط بخشی از جاده را که در آن قرار دارد می‌بندد."),
)

Q(6020, "1.2", picture("""
The view from the driver's seat of a car still rolling along a road: on the instrument panel several red warning lamps are lit and
the rev counter needle stands at zero (the engine has stopped); the driver's hands grip the steering wheel.
MUST BE CLEARLY VISIBLE: the lit red warning lamps, the rev counter at zero, the hands on the wheel.
MUST NOT APPEAR: readable text, logos."""),
  "Under kørslen går motoren pludselig i stå. Rattet bliver tungt at dreje, og bremsepedalen bliver hård. Hvad gælder?",
  "While you are driving, the engine suddenly stalls. The steering wheel becomes heavy to turn, and the brake pedal becomes hard. "
  "What applies?",
  "هنگام رانندگی موتور ناگهان خاموش می‌شود. چرخاندن فرمان سنگین می‌شود و پدال ترمز سفت می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg kan stadig styre og bremse, men det kræver mere kraft.", "I can still steer and brake, but it takes more force.",
    "هنوز می‌توانم فرمان بدهم و ترمز کنم، اما نیروی بیشتری لازم است.",
    "Når motoren står stille, hjælper servostyringen og bremseforstærkeren ikke, men rat og bremser virker stadig.",
    "With the engine stopped, the power steering and the brake booster no longer help, but the steering and brakes still work.",
    "وقتی موتور خاموش است، فرمان کمکی و بوستر ترمز کمک نمی‌کنند، اما فرمان و ترمز همچنان کار می‌کنند."),
  S(True, "Jeg træder hårdt på bremsepedalen og styrer ind til siden.", "I press the brake pedal hard and steer in to the side.",
    "پدال ترمز را محکم فشار می‌دهم و به کنار جاده می‌روم.",
    "Uden forstærkningen skal du bruge mere kraft for at få bilen til at standse.",
    "Without the booster you need more force to bring the car to a stop.",
    "بدون بوستر، برای متوقف کردن خودرو نیروی بیشتری لازم دارید."),
  S(True, "Jeg tænder havariblinket, så de andre bliver advaret.", "I switch on the hazard lights so that the others are warned.",
    "فلاشرها را روشن می‌کنم تا دیگران آگاه شوند.",
    "En bil, der mister farten uventet eller holder på vejen, kan være en fare for andre.",
    "A car that loses speed unexpectedly or stands on the road can be a danger to others.",
    "خودرویی که ناگهان سرعتش کم می‌شود یا روی جاده می‌ایستد، ممکن است برای دیگران خطرناک باشد."),
  S(False, "Bilen kan hverken styres eller bremses, før motoren er startet igen.",
    "The car can neither be steered nor braked until the engine has been restarted.",
    "تا موتور دوباره روشن نشود، نه می‌توان خودرو را هدایت کرد و نه ترمز گرفت.",
    "Styretøj og bremser virker stadig; det er kun hjælpen fra motoren, der mangler.",
    "Steering and brakes still work; only the help from the engine is missing.",
    "فرمان و ترمز همچنان کار می‌کنند؛ فقط کمکی که از موتور می‌آید وجود ندارد."),
)

Q(6021, "7.14", view("""
THE SCENE: a two-lane country road; just ahead a side road leaves to the LEFT; on the opposite side of our road a rider on a brown
horse, wearing a helmet and a high-visibility vest, comes towards us and is about to pass the mouth of the side road; we wait near
the centre line to turn left.
MUST BE CLEARLY VISIBLE: the side road on the left, the oncoming horse and rider.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Du vil svinge til venstre ind på en sidevej. En rytter til hest kommer imod dig og skal ligeud forbi sidevejen. Hvordan forholder du "
  "dig?",
  "You want to turn left into a side road. A rider on a horse is coming towards you and is going straight on past the side road. What "
  "do you do?",
  "می‌خواهید به چپ وارد یک راه فرعی شوید. یک سوارکار از روبه‌رو می‌آید و قرار است مستقیم از جلوی آن راه فرعی بگذرد. چه می‌کنید؟",
  S(True, "Jeg venter, til rytteren er kommet forbi sidevejen.", "I wait until the rider has passed the side road.",
    "صبر می‌کنم تا سوارکار از جلوی راه فرعی رد شود.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for de modkørende, og en hest kan blive bange for en bil tæt på.",
    "You must not turn left until it causes no inconvenience to oncoming traffic, and a horse may be frightened by a car close by.",
    "تا وقتی پیچیدن به چپ برای روبه‌رویی‌ها مزاحمت ایجاد کند، نباید بپیچید و اسب ممکن است از خودروی نزدیک بترسد."),
  S(False, "Hesten går langsomt, så jeg når at svinge foran den.", "The horse is walking slowly, so I have time to turn in front of it.",
    "اسب آهسته راه می‌رود، پس فرصت دارم جلوی آن بپیچم.",
    "Hesten kan blive skræmt af bilen og springe til siden.", "The horse may be frightened by the car and jump to the side.",
    "اسب ممکن است از خودرو بترسد و به کنار بپرد."),
  S(False, "Ryttere skal holde tilbage for biler.", "Riders must give way to cars.", "سوارکاران باید به خودروها راه بدهند.",
    "En modkørende rytter er en trafikant, som du skal holde tilbage for, når du svinger til venstre.",
    "An oncoming rider is a road user you must give way to when you turn left.",
    "سوارکارِ روبه‌رو هم یکی از کاربران راه است و هنگام پیچیدن به چپ باید به او راه بدهید."),
  S(False, "Jeg dytter kort, så rytteren ved, at jeg vil svinge.", "I give a short toot of the horn so that the rider knows I want to turn.",
    "یک بوق کوتاه می‌زنم تا سوارکار بداند می‌خواهم بپیچم.",
    "Hornet kan skræmme hesten og må kun bruges for at afværge fare.",
    "The horn may frighten the horse and may only be used to avert danger.",
    "بوق ممکن است اسب را بترساند و فقط برای دفع خطر است."),
)

Q(6022, "10.3", picture("""
A plain credit-card-sized driving licence of a generic design (no real data) lies on a table next to an open, empty glasses case; on
the licence a small field shows the code «01»; the glasses themselves are missing.
MUST BE CLEARLY VISIBLE: the licence with the code «01», the empty glasses case.
MUST NOT APPEAR: names, photos of a face, any other text or numbers."""),
  "I dit kørekort står koden 01, fordi du skal bruge briller eller kontaktlinser, når du kører. I dag har du glemt brillerne. Hvad "
  "gælder?",
  "Your driving licence has the code 01, because you must wear glasses or contact lenses when you drive. Today you have forgotten your "
  "glasses. What applies?",
  "در گواهینامه‌ی شما کد 01 درج شده، چون هنگام رانندگی باید عینک یا لنز تماسی داشته باشید. امروز عینکتان را جا گذاشته‌اید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må ikke køre, før jeg har brillerne eller kontaktlinserne på.",
    "I must not drive until I have my glasses or contact lenses on.",
    "تا عینک یا لنزهایم را نزده‌ام، اجازه‌ی رانندگی ندارم.",
    "Koden betyder, at du kun må føre bil med den synskorrektion, som kørekortet kræver.",
    "The code means that you may only drive with the vision correction that the licence requires.",
    "این کد یعنی فقط با اصلاح بینایی‌ای که گواهینامه لازم می‌داند، اجازه‌ی رانندگی دارید."),
  S(False, "En kort tur i dagslys må jeg godt køre uden briller.", "I may make a short trip in daylight without glasses.",
    "یک مسیر کوتاه در روشنایی روز را می‌توانم بدون عینک بروم.",
    "Kravet gælder al kørsel, uanset hvor kort turen er, og uanset lyset.",
    "The requirement applies to all driving, however short the trip and whatever the light.",
    "این الزام برای هر رانندگی است، هر قدر هم مسیر کوتاه باشد و نور هر طور که باشد."),
  S(False, "Koden betyder kun, at brillerne skal ligge i bilen.", "The code only means that the glasses must be in the car.",
    "این کد فقط یعنی عینک باید داخل خودرو باشد.",
    "Brillerne skal bruges, mens du kører, ikke kun ligge i bilen.", "The glasses must be worn while you drive, not just kept in the car.",
    "عینک باید هنگام رانندگی به چشم باشد، نه این‌که فقط در خودرو باشد."),
  S(False, "Kører jeg langsomt og forsigtigt, må jeg godt køre uden briller.", "If I drive slowly and carefully, I may drive without glasses.",
    "اگر آهسته و با احتیاط برانم، می‌توانم بدون عینک رانندگی کنم.",
    "Lav fart ændrer ikke på, at du skal kunne se godt nok til at køre.",
    "Low speed does not change the fact that you must be able to see well enough to drive.",
    "سرعت کم این واقعیت را تغییر نمی‌دهد که باید به اندازه‌ی کافی برای رانندگی ببینید."),
)

Q(6023, "4.5", town("""
THE SCENE: a street in town without a cycle path; a little ahead in our lane two teenagers stand together on ONE electric kick scooter
and ride it, wobbling slightly; no other traffic.
MUST BE CLEARLY VISIBLE: the two riders on the single electric kick scooter, the street without a cycle path.
MUST NOT APPEAR: signs, text."""),
  "På en gade uden cykelsti kører to unge på det samme elløbehjul foran dig. De vakler lidt. Hvordan forholder du dig?",
  "On a street without a cycle path two young people are riding the same electric kick scooter in front of you. They are wobbling a "
  "little. What do you do?",
  "در خیابانی بدون مسیر دوچرخه، دو نوجوان با هم روی یک اسکوتر برقی جلوی شما می‌رانند. کمی تلوتلو می‌خورند. چه می‌کنید؟",
  S(True, "Jeg holder god afstand, fordi de let kan miste balancen og vælte.",
    "I keep a good distance, because they may easily lose their balance and fall.",
    "فاصله‌ی کافی نگه می‌دارم، چون به‌راحتی ممکن است تعادلشان را از دست بدهند و بیفتند.",
    "To personer på ét løbehjul gør det ustabilt og svært at styre og bremse.",
    "Two people on one scooter make it unstable and hard to steer and brake.",
    "دو نفر روی یک اسکوتر آن را ناپایدار می‌کنند و هدایت و ترمز کردنش سخت می‌شود."),
  S(True, "Det er ikke tilladt at være to på et elløbehjul.", "It is not allowed to ride two on an electric kick scooter.",
    "سوار شدنِ دو نفر روی یک اسکوتر برقی مجاز نیست.",
    "Et elløbehjul må kun bruges af én person ad gangen.", "An electric kick scooter may only be used by one person at a time.",
    "هر بار فقط یک نفر می‌تواند از اسکوتر برقی استفاده کند."),
  S(False, "Jeg bruger hornet, så de gør plads til mig.", "I use the horn so that they make room for me.",
    "بوق می‌زنم تا برایم جا باز کنند.",
    "Hornet kan forskrække dem, så de vælter.", "The horn may startle them so that they fall.",
    "بوق ممکن است آن‌ها را بترساند و زمین بخورند."),
  S(False, "Jeg overhaler tæt forbi dem, så jeg hurtigt er forbi.", "I overtake close past them so that I am quickly past.",
    "از نزدیکشان سبقت می‌گیرم تا زود رد شوم.",
    "De kan vakle ud foran dig; overhal kun med god afstand, når det kan ske sikkert.",
    "They may wobble out in front of you; only overtake with a good distance when it can be done safely.",
    "ممکن است تلوتلوخوران جلوی شما بیایند؛ فقط با فاصله‌ی کافی و وقتی ایمن است سبقت بگیرید."),
)

Q(6024, "5.1", view("""
THE SCENE: a rural 2+1 road: in our direction two lanes, in the opposite direction one lane; the two directions are separated in the
middle by a wire-rope safety barrier on thin posts; further ahead, where our two lanes become one, white arrows on the road show the
left lane merging to the right.
MUST BE CLEARLY VISIBLE: our two lanes, the single oncoming lane, the middle wire-rope barrier, the merge arrows ahead.
MUST NOT APPEAR: signs, text."""),
  "Du kører på en 2+1-vej. Her er der skiftevis to vognbaner i din retning og én imod, og retningerne er adskilt af et autoværn midt "
  "på vejen. Hvad gælder?",
  "You are driving on a 2+1 road. Here there are alternately two lanes in your direction and one in the other, and the directions are "
  "separated by a safety barrier in the middle of the road. What applies?",
  "در جاده‌ای «۲+۱» می‌رانید. در اینجا به‌تناوب دو خط در جهت شما و یک خط در جهت مقابل هست و دو جهت با یک گاردریل در وسط جاده از هم "
  "جدا شده‌اند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg overhaler kun på de strækninger, hvor der er to vognbaner i min retning.",
    "I only overtake on the stretches where there are two lanes in my direction.",
    "فقط در بخش‌هایی سبقت می‌گیرم که در جهت من دو خط وجود دارد.",
    "Autoværnet gør det umuligt at komme over i den modsatte retning, så overhaling sker i din egen side.",
    "The barrier makes it impossible to get into the opposite direction, so overtaking takes place on your own side.",
    "گاردریل رفتن به جهت مقابل را ناممکن می‌کند، پس سبقت در سمت خودتان انجام می‌شود."),
  S(False, "Når der ikke kommer nogen imod mig, må jeg køre over i de modkørendes vognbane for at overhale.",
    "When nobody is coming towards me, I may drive into the oncoming lane to overtake.",
    "وقتی کسی از روبه‌رو نمی‌آید، می‌توانم برای سبقت وارد خط مقابل شوم.",
    "Autoværnet adskiller retningerne, og de modkørendes vognbane er ikke for dig.",
    "The barrier separates the directions, and the oncoming lane is not for you.",
    "گاردریل دو جهت را از هم جدا می‌کند و خط روبه‌رویی‌ها برای شما نیست."),
  S(False, "Når min vognbane ophører, har jeg forret frem for bilerne i den anden vognbane.",
    "When my lane ends, I have priority over the cars in the other lane.",
    "وقتی خط من تمام می‌شود، بر خودروهای خط دیگر حق تقدم دارم.",
    "Når to vognbaner bliver til én, skal I tilpasse kørslen under gensidig hensyntagen.",
    "When two lanes become one, you must adjust your driving with mutual consideration.",
    "وقتی دو خط یکی می‌شوند، باید با ملاحظه‌ی متقابل رانندگی‌تان را با هم هماهنگ کنید."),
  S(False, "Autoværnet midt på vejen betyder, at grænsen er 130 km/t.",
    "The barrier in the middle of the road means that the limit is 130 km/h.",
    "گاردریل وسط جاده یعنی حد مجاز ۱۳۰ کیلومتر در ساعت است.",
    "Grænsen på 130 km/t gælder kun på motorvej; her gælder 80 km/t, medmindre andet er skiltet.",
    "The limit of 130 km/h only applies on motorways; here 80 km/h applies unless signs show otherwise.",
    "حد ۱۳۰ کیلومتر فقط در آزادراه است؛ اینجا ۸۰ کیلومتر در ساعت است، مگر آن‌که تابلو چیز دیگری بگوید."),
)

Q(6025, "6.2", view("""
THE SCENE: a country road along a wood at dusk; our car has stopped at the right edge (hazard lights glow on the dark dashboard strip);
in our headlights an injured roe deer lies on the verge a little ahead; no blood.
MUST BE CLEARLY VISIBLE: the injured deer lying on the verge, the wood beside the road.
MUST NOT APPEAR: blood, signs, text.""", cond="dusk, getting dark, dry road"),
  "Du har påkørt et rådyr. Dyret er kommet til skade og ligger i rabatten. Hvad gør du?",
  "You have hit a roe deer. The animal is injured and is lying on the verge. What do you do?",
  "با یک آهو برخورد کرده‌اید. حیوان آسیب دیده و در حاشیه‌ی جاده افتاده است. چه می‌کنید؟",
  S(True, "Jeg ringer 1-1-2, så politiet kan sørge for, at dyret får hjælp.",
    "I call 1-1-2 so that the police can make sure the animal gets help.",
    "با ۱۱۲ تماس می‌گیرم تا پلیس ترتیبی بدهد که به حیوان کمک شود.",
    "Den, der påkører et dyr, skal sørge for, at det får hjælp, og påkørt vildt skal meldes til politiet.",
    "Anyone who hits an animal must make sure it gets help, and game that has been hit must be reported to the police.",
    "کسی که با حیوانی برخورد می‌کند باید ترتیب کمک به آن را بدهد و برخورد با حیوان وحشی باید به پلیس گزارش شود."),
  S(False, "Jeg kører videre, fordi det kun er et vildt dyr.", "I drive on, because it is only a wild animal.",
    "به راهم ادامه می‌دهم، چون فقط یک حیوان وحشی است.",
    "Du skal sørge for hjælp til et dyr, du har påkørt, også når det er et vildt dyr.",
    "You must get help for an animal you have hit, also when it is a wild animal.",
    "باید برای حیوانی که با آن برخورد کرده‌اید کمک بخواهید، حتی اگر حیوان وحشی باشد."),
  S(False, "Jeg prøver selv at løfte dyret ind i bilen og køre det til en dyrlæge.",
    "I try to lift the animal into the car myself and drive it to a vet.",
    "خودم سعی می‌کنم حیوان را در خودرو بگذارم و پیش دامپزشک ببرم.",
    "Et skadet vildt dyr kan sparke og bide og skal håndteres af nogen, der ved, hvad de gør.",
    "An injured wild animal may kick and bite and must be dealt with by people who know what they are doing.",
    "حیوان وحشیِ آسیب‌دیده ممکن است لگد بزند و گاز بگیرد و باید به دست افراد آشنا به کار سپرده شود."),
)
