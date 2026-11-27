# «آزمون جدید», batch 9 (5801–5900), part a: stopping and parking (7.18), overtaking (7.9), signs (6.1), people and animals
# beside the road (7.6), speed (7.3), the car (1.2) and how different vehicles handle (3.2).
# Rules: Færdselsloven §§ 2 nr. 10 (rules for drivers also apply to those driving cattle) and nr. 18 (parking: any leaving of a
# vehicle with or without a driver; stopping under 3 minutes or to set down or pick up is not parking), 3 stk. 2, 7 stk. 2,
# 10 stk. 4, 21 stk. 3–4, 23 stk. 1 nr. 2 and stk. 2 (two-wheeled bicycles may be overtaken also just before a level crossing),
# 27 stk. 1, 28 stk. 1 and 5, 29 stk. 1 nr. 5 (only bridges over motorways, viaducts and tunnels), 41 stk. 1–2 and 4, 67 stk. 3,
# 82 stk. 1 and 3; Bekendtgørelse om vejafmærkning (BEK 425/2023): § 8 (signs over lanes with downward arrows apply to that lane
# only), § 9 U 1 (distance to where the sign starts to apply) and U 3, A 44, A 96, C 41 (width including load), C 61 (only stopping
# not done for the sake of the traffic), E 23 (a plate can reserve a disabled bay for particular vehicles), E 33 (a black plate
# refers to private parking rules), E 92 (shows current traffic information), Q 45 (no driving on a hatched area), Q 46 nr. 2
# (a parking lane beside a cycle lane: wheels on the broad line but not beyond it), § 69 Z 72,1 (red flashing light where aircraft
# cross the road low: stop).
from nq import Q, S, above, picture, town, view

Q(5801, "7.18", above("""
THE SCENE: a town street seen from above, running up the picture; along the right kerb runs a cycle lane, and outside it, towards the
carriageway, a parking lane; the parking lane is separated from the cycle lane by a broad white line; cars are parked in the parking
lane with one free space.
VEHICLES (colour code used strictly): a RED car (ours) just parked in the free space, its wheels on the broad line but not beyond it;
a cyclist approaching in the cycle lane from behind, on the right side of our car.
PEOPLE: a passenger on the right-hand rear seat of our car, about to open the door.
MUST NOT APPEAR: signs, text."""),
  "Langs gaden ligger cykelbanen inde ved kantstenen, og parkeringsbanen ligger uden for den, ud mod kørebanen. Du parkerer i "
  "parkeringsbanen, og en passager vil stige ud i højre side. Hvad gælder?",
  "Along the street the cycle lane runs next to the kerb, and the parking lane lies outside it, towards the carriageway. You park in the "
  "parking lane, and a passenger wants to get out on the right. What applies?",
  "در این خیابان خط دوچرخه کنار جدول است و خط پارک بیرون از آن، به سمت سواره‌رو. در خط پارک پارک می‌کنید و مسافری می‌خواهد از سمت راست "
  "پیاده شود. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen skal holde inden for parkeringsbanen, og hjulene må ikke komme ud over den brede linje mod cykelbanen.",
    "The car must stand inside the parking lane, and the wheels must not go beyond the broad line towards the cycle lane.",
    "خودرو باید داخل خط پارک بماند و چرخ‌ها نباید از خط پهنِ کنار خط دوچرخه بیرون بروند.",
    "Hvor en parkeringsbane grænser op til en bred linje mod en cykelbane, må hjulene stå på linjen, men ikke overskride den.",
    "Where a parking lane borders a broad line towards a cycle lane, the wheels may stand on the line but must not cross it.",
    "جایی که خط پارک به خطی پهن در کنار خط دوچرخه می‌رسد، چرخ‌ها می‌توانند روی خط باشند، ولی نباید از آن رد شوند."),
  S(True, "Passageren skal se sig tilbage efter cyklister, før døren åbnes.", "The passenger must look back for cyclists before the door is opened.",
    "مسافر پیش از باز کردن در باید به عقب نگاه کند که دوچرخه‌سواری نیاید.",
    "Døren åbner ud mod cykelbanen, og vogndøre skal åbnes, så der ikke opstår fare.",
    "The door opens towards the cycle lane, and car doors must be opened so that no danger arises.",
    "در به سمت خط دوچرخه باز می‌شود و درهای خودرو باید طوری باز شوند که خطری پیش نیاید."),
  S(False, "Jeg må holde med hjulene i cykelbanen, når parkeringsbanen er smal.", "I may stand with the wheels in the cycle lane when the parking lane is narrow.",
    "وقتی خط پارک باریک است، می‌توانم با چرخ‌ها داخل خط دوچرخه بایستم.",
    "Hjulene må ikke komme ud over den brede linje, og cykelbanen skal holdes fri for biler.",
    "The wheels must not go beyond the broad line, and the cycle lane must be kept free of cars.",
    "چرخ‌ها نباید از خط پهن بیرون بروند و خط دوچرخه باید از خودرو خالی بماند."),
  S(False, "Cyklisterne skal holde tilbage for passagerer, der stiger ud.", "The cyclists must give way to passengers getting out.",
    "دوچرخه‌سواران باید به مسافرانی که پیاده می‌شوند راه بدهند.",
    "Det er den, der stiger ud, der skal sørge for, at det sker uden fare.", "It is the person getting out who must make sure it happens without danger.",
    "کسی که پیاده می‌شود باید مطمئن شود که این کار بی‌خطر است."),
)

Q(5802, "7.18", town("""
THE SCENE: a parking bay at the kerb in town marked with a blue square P sign, under it a blue plate with a white wheelchair symbol,
and under that a white plate showing a car registration number; the bay is free.
MUST BE CLEARLY VISIBLE: the P sign with the wheelchair plate and the plate with a registration number, the free bay.
MUST NOT APPEAR: other signs, any other text."""),
  "En ledig parkeringsbås er afmærket med en P-tavle, en undertavle med kørestolssymbol og en undertavle med et bestemt "
  "registreringsnummer. Du har et gyldigt parkeringskort for personer med handicap. Hvad gælder?",
  "A free parking bay is marked with a P sign, a plate with a wheelchair symbol and a plate with a particular registration number. You "
  "have a valid disabled parking card. What applies?",
  "یک جای پارکِ خالی با تابلوی P، زیرتابلویی با نماد ویلچر و زیرتابلویی با یک شماره پلاکِ مشخص علامت‌گذاری شده است. شما کارت معتبرِ "
  "پارک برای افراد دارای معلولیت دارید. چه قاعده‌ای برقرار است؟",
  S(True, "Båsen er forbeholdt det køretøj, der har nummeret på undertavlen, så jeg må ikke parkere der.",
    "The bay is reserved for the vehicle with the number on the plate, so I must not park there.",
    "این جای پارک مخصوص خودرویی است که شماره‌اش روی زیرتابلوست، پس من نباید آن‌جا پارک کنم.",
    "Ved en handicapbås kan en undertavle angive, at reservationen gælder et eller flere bestemte køretøjer.",
    "At a disabled bay, a plate can show that the reservation applies to one or more particular vehicles.",
    "در جای پارکِ افراد دارای معلولیت، زیرتابلو می‌تواند نشان دهد که این رزرو فقط برای یک یا چند خودروی مشخص است."),
  S(False, "Med mit parkeringskort må jeg bruge alle båse med kørestolssymbol.", "With my parking card I may use every bay with a wheelchair symbol.",
    "با کارت پارکم می‌توانم از همه‌ی جاهای پارک دارای نماد ویلچر استفاده کنم.",
    "Ikke når en undertavle reserverer båsen til et bestemt køretøj.", "Not when a plate reserves the bay for a particular vehicle.",
    "نه وقتی زیرتابلو آن را برای خودرویی مشخص رزرو کرده باشد."),
  S(False, "Jeg må parkere der, når det køretøj, båsen er reserveret til, ikke er der.",
    "I may park there when the vehicle the bay is reserved for is not there.", "وقتی خودرویی که جای پارک برایش رزرو شده آن‌جا نیست، می‌توانم پارک کنم.",
    "Reservationen gælder også, når båsen står tom.", "The reservation applies also when the bay is empty.",
    "رزرو حتی وقتی جای پارک خالی است برقرار است."),
  S(False, "Jeg må holde der i højst et kvarter, fordi jeg har et parkeringskort.", "I may stand there for at most a quarter of an hour because I have a parking card.",
    "چون کارت پارک دارم، حداکثر یک ربع می‌توانم آن‌جا بایستم.",
    "Båsen er forbeholdt det bestemte køretøj, også til kortvarig parkering.", "The bay is reserved for that particular vehicle, also for short parking.",
    "این جای پارک، حتی برای پارکِ کوتاه، مخصوص همان خودروی مشخص است."),
)

Q(5803, "7.18", town("""
THE SCENE: a town street; at the right kerb a round no-stopping sign (blue centre, red border and a red cross); in the interior
rear-view mirror at the top of the picture an ambulance with flashing blue lights approaches from behind; the cars ahead are pulling
over to the right and stopping.
MUST BE CLEARLY VISIBLE: the no-stopping sign, the ambulance in the mirror, the cars pulling over.
MUST NOT APPEAR: other signs, text."""),
  "Du kører på en gade, hvor der er standsningsforbud. En ambulance med udrykning kommer bagfra. Du vil holde ind til siden og standse. "
  "Hvad gælder?",
  "You are driving on a street with a ban on stopping. An ambulance on an emergency call is coming from behind. You want to pull over and "
  "stop. What applies?",
  "در خیابانی هستید که توقف در آن ممنوع است. آمبولانسی در حالت امدادی از پشت می‌آید. می‌خواهید کنار بکشید و بایستید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt standse for at give ambulancen plads, selv om der er standsningsforbud.",
    "I may stop to make room for the ambulance even though stopping is banned.",
    "حتی با وجود ممنوعیت توقف، می‌توانم برای باز کردن راه آمبولانس بایستم.",
    "Når der køres med udrykning, skal andre trafikanter holde vejen åben og om nødvendigt standse.",
    "When an emergency vehicle is on a call, other road users must keep the road clear and stop if necessary.",
    "وقتی خودرویی در حالت امدادی حرکت می‌کند، دیگران باید راه را باز نگه دارند و در صورت لزوم بایستند."),
  S(True, "Jeg holder ind til højre, så ambulancen kan komme forbi.", "I pull over to the right so that the ambulance can get past.",
    "به سمت راست کنار می‌کشم تا آمبولانس بتواند رد شود.",
    "Ligesom bilerne foran dig skal du gøre plads, så udrykningskøretøjet får fri bane.",
    "Like the cars in front of you, you must make room so that the emergency vehicle has a clear way.",
    "مثل خودروهای جلویی باید جا باز کنید تا خودروی امدادی راهی باز داشته باشد."),
  S(True, "Jeg kører videre, så snart ambulancen er forbi, og det kan ske uden fare.",
    "I drive on as soon as the ambulance has passed and it can be done without danger.",
    "به‌محض این‌که آمبولانس رد شد و بی‌خطر بود، ادامه می‌دهم.",
    "Holder du længere end nødvendigt, er det ikke længere for færdslens skyld.", "If you stand longer than necessary, it is no longer for the sake of the traffic.",
    "اگر بیش از حد لازم بایستید، دیگر به خاطر ترافیک نیست."),
  S(False, "Jeg må ikke standse på grund af tavlen, så jeg fortsætter foran ambulancen.",
    "I must not stop because of the sign, so I carry on in front of the ambulance.",
    "به خاطر تابلو نباید بایستم، پس جلوی آمبولانس به راهم ادامه می‌دهم.",
    "Tavlen forbyder kun standsning, der ikke sker af hensyn til den øvrige færdsel, og du skal give ambulancen fri vej.",
    "The sign only forbids stopping that is not done for the sake of the other traffic, and you must clear the way for the ambulance.",
    "این تابلو فقط توقفی را ممنوع می‌کند که به خاطر ترافیک نباشد و باید راه آمبولانس را باز کنید."),
)

Q(5804, "7.18", view("""
THE SCENE: a quiet country road crossing a small river on a short, wide bridge with a footpath; ahead on the bridge a wide paved edge;
no motorway nearby; good view in both directions.
MUST BE CLEARLY VISIBLE: the bridge over the river, the wide edge on the bridge, the good view.
MUST NOT APPEAR: signs, text."""),
  "Du kører over en bred bro over en å på en stille landevej. Du vil standse kort på broen og se på udsigten. Der er godt udsyn til begge "
  "sider. Hvad gælder?",
  "You are driving over a wide bridge across a stream on a quiet country road. You want to stop briefly on the bridge and look at the view. "
  "There is a good view in both directions. What applies?",
  "در جاده‌ای آرام از روی پلی پهن بر رودی کوچک می‌گذرید. می‌خواهید کوتاه روی پل بایستید و منظره را تماشا کنید. دید به هر دو طرف خوب "
  "است. چه قاعده‌ای برقرار است؟",
  S(True, "Det er tilladt, hvis det ikke er til fare eller ulempe, og ingen anden regel forbyder det.",
    "It is allowed if it causes no danger or inconvenience and no other rule forbids it.",
    "اگر خطر یا مزاحمتی نداشته باشد و قاعده‌ی دیگری منعش نکند، مجاز است.",
    "Det særlige forbud gælder bro over motorvej, viadukt og tunnel, ikke alle broer.",
    "The special ban applies to bridges over motorways, viaducts and tunnels, not to all bridges.",
    "ممنوعیتِ ویژه برای پل روی آزادراه، زیرگذر و تونل است، نه همه‌ی پل‌ها."),
  S(True, "På en bro over en motorvej ville det være forbudt at standse.", "On a bridge over a motorway it would be forbidden to stop.",
    "روی پلی که از روی آزادراه می‌گذرد، توقف ممنوع می‌بود.",
    "Standsning og parkering er forbudt på bro over motorvej.", "Stopping and parking are forbidden on a bridge over a motorway.",
    "توقف و پارک روی پلِ روی آزادراه ممنوع است."),
  S(False, "Det er altid forbudt at standse på en bro.", "It is always forbidden to stop on a bridge.", "توقف روی پل همیشه ممنوع است.",
    "Forbuddet gælder kun bestemte steder som bro over motorvej, viadukt og tunnel.", "The ban only applies to certain places such as bridges over motorways, viaducts and tunnels.",
    "این ممنوعیت فقط برای جاهای خاصی مثل پل روی آزادراه، زیرگذر و تونل است."),
  S(False, "I en kort tunnel må jeg også standse, når der er godt udsyn.", "In a short tunnel I may also stop when there is a good view.",
    "در تونلِ کوتاه هم، وقتی دید خوب است، می‌توانم بایستم.",
    "Standsning og parkering i tunnel er forbudt, uanset tunnelens længde.", "Stopping and parking in a tunnel are forbidden, whatever the tunnel's length.",
    "توقف و پارک در تونل، هر قدر هم کوتاه باشد، ممنوع است."),
)

Q(5805, "7.18", town("""
THE SCENE: the entrance to a car park in town; at the entrance a blue square P sign, and under it a black rectangular plate with
several lines of small white text (the private parking terms); cars parked in marked bays beyond.
MUST BE CLEARLY VISIBLE: the P sign with the black plate under it, the car park.
MUST NOT APPEAR: legible words or numbers on the black plate, other signs."""),
  "Ved indkørslen til en parkeringsplads står en P-tavle med en sort undertavle med tekst. Hvad gælder?",
  "At the entrance to a car park there is a P sign with a black plate with text. What applies?",
  "در ورودی یک پارکینگ تابلوی P با زیرتابلویی سیاه که رویش متن نوشته شده قرار دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Den sorte undertavle henviser til private regler for parkering på pladsen.", "The black plate refers to private rules for parking in the car park.",
    "زیرتابلوی سیاه به قاعده‌های خصوصیِ پارک در این پارکینگ اشاره می‌کند.",
    "Med en sort undertavle under P-tavlen kan der henvises til regler for privatadministrerede parkeringsordninger.",
    "A black plate under the P sign can refer to the rules of a privately run parking scheme.",
    "زیرتابلوی سیاه زیر تابلوی P می‌تواند به قاعده‌های پارکینگی که بخش خصوصی اداره می‌کند اشاره کند."),
  S(True, "Jeg læser teksten og følger de regler, der står på den.", "I read the text and follow the rules it gives.",
    "متن را می‌خوانم و قاعده‌هایی را که نوشته رعایت می‌کنم.",
    "Reglerne kan fx kræve billet eller P-skive, og overtræder du dem, kan du få en afgift.",
    "The rules may, for example, require a ticket or a parking disc, and if you break them you may be charged a fee.",
    "این قاعده‌ها ممکن است مثلاً بلیت یا کارت زمان پارک بخواهند و اگر رعایتشان نکنید، ممکن است هزینه‌ای از شما بگیرند."),
  S(False, "Private regler gælder ikke for mig, fordi de ikke står i færdselsloven.", "Private rules do not apply to me because they are not in the Road Traffic Act.",
    "قاعده‌های خصوصی برای من معتبر نیستند، چون در قانون راهنمایی و رانندگی نیامده‌اند.",
    "Parkerer du på pladsen, skal du følge de regler, der gælder for den.", "If you park there, you must follow the rules that apply to the car park.",
    "اگر در این پارکینگ پارک کنید، باید قاعده‌های همان‌جا را رعایت کنید."),
  S(False, "Den sorte undertavle betyder, at parkering er gratis og uden tidsgrænse.", "The black plate means that parking is free and without a time limit.",
    "زیرتابلوی سیاه یعنی پارک رایگان و بدون محدودیت زمانی است.",
    "Den sorte farve viser kun, at det er private regler; hvad de siger, står i teksten.",
    "The black colour only shows that these are private rules; what they say is in the text.",
    "رنگ سیاه فقط نشان می‌دهد که قاعده‌ها خصوصی‌اند؛ محتوایشان در متن آمده است."),
)

Q(5806, "7.18", view("""
THE SCENE: a country road just after a railway level crossing with half barriers; the barriers are up and no train is in sight; we have
just driven over the tracks, which are visible in the interior rear-view mirror at the top of the picture; about 15 m ahead there is a
firm, free stretch of verge on the right.
MUST BE CLEARLY VISIBLE: the level crossing behind us in the mirror, the free verge just ahead.
MUST NOT APPEAR: trains, signs, text."""),
  "Du har lige kørt over en jernbaneoverkørsel. Du vil parkere i vejkanten ca. 15 m efter sporene og gå en tur. Hvad gælder?",
  "You have just driven over a railway level crossing. You want to park at the roadside about 15 m after the tracks and go for a walk. "
  "What applies?",
  "همین حالا از یک گذرگاه راه‌آهن رد شده‌اید. می‌خواهید حدود ۱۵ متر بعد از ریل‌ها کنار جاده پارک کنید و کمی قدم بزنید. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må ikke parkere her, fordi det er nærmere end 30 m fra overkørslen.",
    "I must not park here because it is closer than 30 m to the crossing.", "نباید این‌جا پارک کنم، چون کمتر از ۳۰ متر با گذرگاه فاصله دارد.",
    "Parkering er forbudt nærmere end 30 m fra en jernbaneoverkørsel, både før og efter den.",
    "Parking is forbidden closer than 30 m to a level crossing, both before and after it.",
    "پارک در فاصله‌ی کمتر از ۳۰ متر از گذرگاه راه‌آهن، چه پیش از آن و چه بعد از آن، ممنوع است."),
  S(False, "Forbuddet gælder kun på den side af overkørslen, hvor man kører hen mod den.",
    "The ban only applies on the side of the crossing where you drive towards it.", "این ممنوعیت فقط در سمتی از گذرگاه است که به طرفش می‌رانید.",
    "Afstanden regnes fra overkørslen, så forbuddet gælder på begge sider af den.",
    "The distance is measured from the crossing, so the ban applies on both sides of it.",
    "فاصله از خود گذرگاه حساب می‌شود، پس ممنوعیت در هر دو طرف آن برقرار است."),
  S(False, "Jeg må godt parkere, når bommene er oppe, og der ikke kommer noget tog.",
    "I may park when the barriers are up and no train is coming.", "وقتی راهبندها بالا هستند و قطاری نمی‌آید، می‌توانم پارک کنم.",
    "Forbuddet gælder hele tiden, uanset bommene og togene.", "The ban applies all the time, whatever the barriers and the trains are doing.",
    "این ممنوعیت همیشه برقرار است، هر وضعی که راهبندها و قطارها داشته باشند."),
)

Q(5807, "7.9", view("""
THE SCENE: a two-lane country road climbing a long hill with a broken centre line; ahead of us a slow van; our car is heavily loaded:
in the interior rear-view mirror at the top of the picture the luggage piled high behind the seats can be seen.
MUST BE CLEARLY VISIBLE: the climbing road, the slow van ahead, the heavy load in the mirror.
MUST NOT APPEAR: signs, text, oncoming vehicles."""),
  "Du kører på ferie i en bil fuld af passagerer og bagage. Op ad en lang bakke vil du overhale en langsom varevogn. Hvad gælder?",
  "You are driving on holiday in a car full of passengers and luggage. On a long uphill stretch you want to overtake a slow van. What "
  "applies?",
  "با خودرویی پر از مسافر و بار به سفر می‌روید. در سربالاییِ بلندی می‌خواهید از یک ون آهسته سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Overhalingen tager længere tid, så vejen skal være fri på en længere strækning.",
    "The overtaking takes longer, so the road must be clear for a longer stretch.", "سبقت طولانی‌تر می‌شود، پس جاده باید در مسافت بیشتری خالی باشد.",
    "En tungt lastet bil accelererer dårligere, især op ad bakke.", "A heavily loaded car accelerates less well, especially uphill.",
    "خودروی پربار، به‌خصوص در سربالایی، کندتر شتاب می‌گیرد."),
  S(False, "Bilen accelererer lige så godt, som når den er tom.", "The car accelerates just as well as when it is empty.",
    "خودرو همان‌قدر خوب شتاب می‌گیرد که وقتی خالی است.",
    "Last og passagerer gør bilen tungere, så den accelererer langsommere.", "Load and passengers make the car heavier, so it accelerates more slowly.",
    "بار و مسافر خودرو را سنگین‌تر می‌کنند و شتابش کم می‌شود."),
  S(False, "Jeg kan altid nå forbi, hvis jeg giver fuld gas.", "I can always get past if I put my foot down.", "اگر تا ته گاز بدهم، همیشه می‌توانم رد شوم.",
    "Fuld gas hjælper ikke, hvis vejen ikke er fri langt nok frem.", "Full throttle does not help if the road is not clear far enough ahead.",
    "اگر جاده به اندازه‌ی کافی جلو خالی نباشد، گاز کامل هم کمکی نمی‌کند."),
  S(False, "Den tunge last giver bedre vejgreb, så overhalingen går hurtigere.", "The heavy load gives better grip, so the overtaking goes faster.",
    "بار سنگین چسبندگی را بیشتر می‌کند و سبقت سریع‌تر انجام می‌شود.",
    "Last gør ikke bilen hurtigere; tværtimod bliver både acceleration og bremsning ringere.",
    "Load does not make the car faster; on the contrary, both acceleration and braking get worse.",
    "بار خودرو را سریع‌تر نمی‌کند؛ برعکس، هم شتاب و هم ترمزگیری بدتر می‌شود."),
)

Q(5808, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line late in the afternoon; the sun is very low straight ahead and dazzles;
ahead of us a slow car; the road beyond is hard to see in the glare.
MUST BE CLEARLY VISIBLE: the low sun straight ahead, the glare on the road, the slow car ahead.
MUST NOT APPEAR: signs, text.""", cond="late afternoon, very low sun straight ahead, dry road"),
  "Solen står lavt lige foran dig og blænder. Foran dig kører en langsom bil, som du gerne vil overhale. Hvad gælder?",
  "The sun is low straight ahead and dazzling. A slow car is in front of you, and you would like to overtake it. What applies?",
  "آفتاب درست روبه‌رو پایین آمده و چشم را می‌زند. جلوی شما خودرویی آهسته است که دلتان می‌خواهد از آن سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg overhaler ikke, når jeg ikke kan se, om vejen er fri langt nok frem.", "I do not overtake when I cannot see whether the road is clear far enough ahead.",
    "وقتی نمی‌بینم جاده به اندازه‌ی کافی جلو خالی است، سبقت نمی‌گیرم.",
    "Før overhaling skal du sikre dig, at vognbanen er fri for modkørende på en tilstrækkeligt lang strækning.",
    "Before overtaking you must make sure the lane is clear of oncoming traffic for a long enough stretch.",
    "پیش از سبقت باید مطمئن شوید خط در مسافتی کافی از ترافیک روبه‌رو خالی است."),
  S(True, "Modkørende biler kan være svære at se i modlyset.", "Oncoming cars may be hard to see against the light.",
    "خودروهای روبه‌رو در نور مستقیم آفتاب ممکن است سخت دیده شوند.",
    "I lav sol kan en modkørende uden lys næsten forsvinde i genskinnet.", "In low sun an oncoming car without lights may almost vanish in the glare.",
    "در آفتابِ پایین، خودروی روبه‌روی بی‌چراغ ممکن است تقریباً در درخشش نور دیده نشود."),
  S(False, "Med solbriller kan jeg se godt nok til at overhale.", "With sunglasses I can see well enough to overtake.",
    "با عینک آفتابی آن‌قدر خوب می‌بینم که سبقت بگیرم.",
    "Solbriller dæmper genskinnet, men du kan stadig have svært ved at se, hvad der kommer.",
    "Sunglasses reduce the glare, but you may still find it hard to see what is coming.",
    "عینک آفتابی درخشش را کم می‌کند، ولی ممکن است هنوز دیدنِ آنچه می‌آید سخت باشد."),
  S(False, "Jeg blinker med forlygterne og overhaler så, fordi de modkørende kan se mig.",
    "I flash my headlights and then overtake, because oncoming drivers can see me.",
    "چراغ‌های جلو را چشمک می‌زنم و بعد سبقت می‌گیرم، چون رانندگان روبه‌رو مرا می‌بینند.",
    "At de modkørende kan se dig, betyder ikke, at der er plads til overhalingen.",
    "That oncoming drivers can see you does not mean that there is room for the overtaking.",
    "این‌که رانندگان روبه‌رو شما را ببینند، به این معنا نیست که جای سبقت هست."),
)

Q(5809, "7.9", view("""
THE SCENE: a country road approaching a railway level crossing with raised half barriers about 40 m ahead; in front of us a cyclist on
an ordinary two-wheeled bicycle rides at the right edge; no oncoming traffic; no train in sight.
MUST BE CLEARLY VISIBLE: the cyclist ahead, the level crossing with raised barriers.
MUST NOT APPEAR: trains, signs, text."""),
  "Lige før en jernbaneoverkørsel kører en cyklist foran dig. Der kommer intet tog, og vejen er fri for modkørende. Hvad gælder for "
  "overhaling af cyklisten?",
  "Just before a railway level crossing a cyclist is riding in front of you. No train is coming, and the road is clear of oncoming "
  "traffic. What applies to overtaking the cyclist?",
  "درست پیش از یک گذرگاه راه‌آهن، دوچرخه‌سواری جلوی شما می‌رود. قطاری نمی‌آید و جاده از ترافیک روبه‌رو خالی است. درباره‌ی سبقت از "
  "دوچرخه‌سوار چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må gerne overhale en tohjulet cykel også lige før overkørslen, hvis det kan ske uden fare.",
    "I may overtake a two-wheeled bicycle also just before the crossing if it can be done without danger.",
    "اگر بی‌خطر باشد، حتی درست پیش از گذرگاه هم می‌توانم از دوچرخه‌ی دوچرخ سبقت بگیرم.",
    "Forbuddet mod overhaling foran og på en jernbaneoverkørsel gælder ikke overhaling af tohjulede cykler og tohjulede små knallerter.",
    "The ban on overtaking before and on a level crossing does not apply to overtaking two-wheeled bicycles and two-wheeled small mopeds.",
    "ممنوعیت سبقت پیش از گذرگاه راه‌آهن و روی آن، شامل سبقت از دوچرخه‌ها و موتورگازی‌های کوچکِ دوچرخ نمی‌شود."),
  S(True, "Jeg holder god afstand til siden, fordi cyklen kan slingre over skinnerne.",
    "I keep a good distance to the side, because the bicycle may wobble over the rails.",
    "فاصله‌ی جانبی کافی نگه می‌دارم، چون دوچرخه ممکن است روی ریل‌ها تلوتلو بخورد.",
    "Skinner kan få cykelhjul til at glide eller sidde fast, så cyklisten kan svinge ud.",
    "Rails can make bicycle wheels slip or get caught, so the cyclist may swerve.",
    "ریل‌ها ممکن است چرخ دوچرخه را بلغزانند یا گیر بیندازند و دوچرخه‌سوار منحرف شود."),
  S(False, "Det er altid forbudt at overhale lige før en jernbaneoverkørsel.", "It is always forbidden to overtake just before a level crossing.",
    "سبقت درست پیش از گذرگاه راه‌آهن همیشه ممنوع است.",
    "Der er en undtagelse for tohjulede cykler og tohjulede små knallerter.", "There is an exception for two-wheeled bicycles and two-wheeled small mopeds.",
    "برای دوچرخه‌ها و موتورگازی‌های کوچکِ دوچرخ استثنایی وجود دارد."),
  S(False, "Jeg må også overhale en bil lige før overkørslen, når der ikke kommer noget tog.",
    "I may also overtake a car just before the crossing when no train is coming.",
    "وقتی قطاری نمی‌آید، درست پیش از گذرگاه از خودرو هم می‌توانم سبقت بگیرم.",
    "Undtagelsen gælder kun tohjulede cykler og små knallerter; andre køretøjer må ikke overhales foran overkørslen.",
    "The exception only covers two-wheeled bicycles and small mopeds; other vehicles must not be overtaken before the crossing.",
    "این استثنا فقط برای دوچرخه‌ها و موتورگازی‌های کوچکِ دوچرخ است؛ از وسیله‌های دیگر پیش از گذرگاه نباید سبقت گرفت."),
)

Q(5810, "7.9", view("""
THE SCENE: a country road where a long hatched area of white diagonal stripes, bounded by unbroken lines, lies in the middle between
the two directions; ahead of us a slow tractor; to pass it we would have to drive onto the hatched area; no oncoming traffic.
MUST BE CLEARLY VISIBLE: the long hatched area in the middle of the road, the tractor ahead.
MUST NOT APPEAR: signs, text."""),
  "Midt på vejen ligger en lang skraveret flade mellem de to kørselsretninger. Foran dig kører en langsom traktor, og for at komme "
  "forbi skal du ind over fladen. Der kommer ingen imod dig. Hvad gælder?",
  "In the middle of the road a long hatched area lies between the two directions. A slow tractor drives in front of you, and to get past "
  "it you would have to drive onto the area. Nobody is coming towards you. What applies?",
  "وسط جاده، بین دو جهت، محدوده‌ای هاشورخورده و طولانی هست. جلوی شما تراکتوری آهسته می‌رود و برای رد شدن از آن باید وارد این محدوده "
  "شوید. کسی از روبه‌رو نمی‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre ind over den skraverede flade for at overhale.", "I must not drive onto the hatched area to overtake.",
    "برای سبقت نباید وارد محدوده‌ی هاشورخورده شوم.",
    "På en skraveret spærreflade må der ikke køres, standses eller parkeres.", "On a hatched area you must not drive, stop or park.",
    "روی محدوده‌ی هاشورخورده نباید رانندگی، توقف یا پارک کرد."),
  S(True, "Kan jeg ikke komme forbi uden at køre ind over fladen, bliver jeg bag traktoren.",
    "If I cannot get past without driving onto the area, I stay behind the tractor.",
    "اگر بدون رفتن روی آن محدوده نتوانم رد شوم، پشت تراکتور می‌مانم.",
    "Du må vente, til fladen ophører, og overhalingen kan ske lovligt og uden fare.",
    "You must wait until the area ends and the overtaking can be done lawfully and without danger.",
    "باید صبر کنید تا آن محدوده تمام شود و سبقت به شکلی قانونی و بی‌خطر ممکن شود."),
  S(False, "Jeg må godt køre kort ind over fladen, når der ikke kommer nogen.", "I may briefly drive onto the area when nobody is coming.",
    "وقتی کسی نمی‌آید، می‌توانم کوتاه وارد آن محدوده شوم.",
    "Forbuddet gælder, uanset om der er modkørende.", "The ban applies whether or not there is oncoming traffic.",
    "این ممنوعیت، چه ترافیک روبه‌رو باشد چه نباشد، برقرار است."),
  S(False, "Den skraverede flade er netop beregnet til overhaling.", "The hatched area is meant precisely for overtaking.",
    "محدوده‌ی هاشورخورده درست برای سبقت ساخته شده است.",
    "Fladen adskiller kørselsretningerne og må ikke bruges til kørsel.", "The area separates the directions and must not be driven on.",
    "این محدوده دو جهت را از هم جدا می‌کند و نباید روی آن راند."),
)

Q(5811, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line and a good view far ahead; in front of us drives a small self-propelled
work machine (a compact road roller), seen from behind; on its rear hangs a triangular sign: a fluorescent orange-red triangle with
a dark red reflective border; no oncoming traffic.
MUST BE CLEARLY VISIBLE: the triangular orange-red sign on the rear of the slow machine, the free road ahead.
MUST NOT APPEAR: other signs, text."""),
  "Foran dig kører et lille arbejdskøretøj med et orangerødt, trekantet skilt bagpå. Du vil overhale. Hvad gælder?",
  "In front of you drives a small work vehicle with an orange-red triangular sign on the back. You want to overtake. What applies?",
  "جلوی شما یک وسیله‌ی کاریِ کوچک با تابلوی مثلثیِ نارنجی‌قرمز در پشتش حرکت می‌کند. می‌خواهید سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Skiltet viser, at køretøjet kører langsomt, så jeg kommer hurtigt op bag det.",
    "The sign shows that the vehicle is slow, so I quickly catch up with it.",
    "این تابلو نشان می‌دهد که وسیله آهسته حرکت می‌کند، پس به‌سرعت به پشت آن می‌رسم.",
    "Det trekantede skilt sidder på langsomtkørende køretøjer, som fx traktorer og motorredskaber.",
    "The triangular sign is carried by slow vehicles such as tractors and motorised work machines.",
    "این تابلوی مثلثی روی وسیله‌های کندرو مثل تراکتور و ماشین‌آلات کاری نصب می‌شود."),
  S(True, "Jeg overhaler kun, hvis vejen er fri langt nok frem, og der ikke er andre hindringer.",
    "I only overtake if the road is clear far enough ahead and there are no other obstacles.",
    "فقط وقتی سبقت می‌گیرم که جاده به اندازه‌ی کافی جلو خالی باشد و مانع دیگری نباشد.",
    "Også ved et langsomt køretøj skal overhalingen kunne ske uden fare.", "Even past a slow vehicle the overtaking must be possible without danger.",
    "حتی از وسیله‌ی آهسته هم سبقت باید بی‌خطر باشد."),
  S(False, "Skiltet betyder, at jeg ikke må overhale køretøjet.", "The sign means that I must not overtake the vehicle.",
    "این تابلو یعنی نباید از این وسیله سبقت بگیرم.",
    "Skiltet forbyder ikke overhaling; det viser kun, at køretøjet kører langsomt.",
    "The sign does not forbid overtaking; it only shows that the vehicle is slow.",
    "این تابلو سبقت را ممنوع نمی‌کند؛ فقط نشان می‌دهد که وسیله آهسته است."),
  S(False, "Skiltet betyder, at køretøjet har farligt gods med.", "The sign means that the vehicle is carrying dangerous goods.",
    "این تابلو یعنی وسیله کالای خطرناک حمل می‌کند.",
    "Farligt gods vises med orange, rektangulære skilte, ikke med en trekant.", "Dangerous goods are shown by orange rectangular plates, not by a triangle.",
    "کالای خطرناک با پلاک‌های مستطیلیِ نارنجی نشان داده می‌شود، نه با مثلث."),
)

Q(5812, "6.1", view("""
THE SCENE: a road approaching a hillside; on the right a red-bordered triangular warning sign with a white centre showing a black
tunnel mouth; further ahead the dark entrance of a road tunnel; bright sunshine outside.
MUST BE CLEARLY VISIBLE: the warning sign with the tunnel mouth, the tunnel entrance ahead.
MUST NOT APPEAR: other signs, text.""", cond="bright sunshine, dry road"),
  "Du kører forbi denne tavle. Hvad betyder den, og hvad gør du?",
  "You pass this sign. What does it mean, and what do you do?",
  "از کنار این تابلو می‌گذرید. معنایش چیست و چه می‌کنید؟",
  S(True, "Der kommer en tunnel længere fremme.", "A tunnel is coming further ahead.", "جلوتر یک تونل هست.",
    "Tavlen advarer om en tunnel.", "The sign warns of a tunnel.", "این تابلو از وجود تونل هشدار می‌دهد."),
  S(True, "Jeg tager solbrillerne af og sikrer mig, at nærlyset er tændt, før jeg kører ind.",
    "I take off my sunglasses and make sure the dipped beam is on before I drive in.",
    "پیش از ورود، عینک آفتابی را برمی‌دارم و مطمئن می‌شوم نور پایین روشن است.",
    "Øjnene skal vænne sig til det svage lys i tunnelen, og du skal kunne se og blive set.",
    "Your eyes must adjust to the weak light in the tunnel, and you must be able to see and be seen.",
    "چشم‌ها باید به نور کم تونل عادت کنند و باید بتوانید ببینید و دیده شوید."),
  S(False, "Tavlen betyder, at der er lav frihøjde.", "The sign means that there is low headroom.", "این تابلو یعنی ارتفاع مجاز کم است.",
    "Lav frihøjde vises med en forbudstavle for køretøjshøjde.", "Low headroom is shown by a prohibition sign for vehicle height.",
    "ارتفاع کم با تابلوی ممنوعیتِ ارتفاع وسیله نشان داده می‌شود."),
  S(False, "Jeg skal standse før tunnelen og vente på grønt lys.", "I must stop before the tunnel and wait for a green light.",
    "باید پیش از تونل بایستم و منتظر چراغ سبز شوم.",
    "Tavlen er en advarsel, ikke et påbud om at standse.", "The sign is a warning, not an order to stop.", "این تابلو هشدار است، نه دستور توقف."),
)

Q(5813, "6.1", view("""
THE SCENE: a country road next to an airfield; on the right a red-bordered triangular warning sign with a white centre showing a black
aeroplane; a little further ahead a pair of red lights on a post beside a stop line across the road; a small aircraft approaches low
from the side.
MUST BE CLEARLY VISIBLE: the warning sign with the aeroplane, the red lights by the stop line, the low aircraft.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Lidt længere fremme er der et rødt blinksignal ved en stoplinje. Hvad gælder?",
  "You pass this sign. A little further ahead there is a red flashing signal by a stop line. What applies?",
  "از کنار این تابلو می‌گذرید. کمی جلوتر کنار یک خط ایست چراغ چشمک‌زن قرمز هست. چه قاعده‌ای برقرار است؟",
  S(True, "Der kan komme flyvemaskiner lavt hen over vejen.", "Aircraft may come low over the road.", "ممکن است هواپیماها در ارتفاع کم از روی جاده بگذرند.",
    "Tavlen advarer om lavtgående fly.", "The sign warns of low-flying aircraft.", "این تابلو از پرواز هواپیما در ارتفاع کم هشدار می‌دهد."),
  S(True, "Blinker det røde lys, standser jeg før stoplinjen.", "If the red light is flashing, I stop before the stop line.",
    "اگر چراغ قرمز چشمک بزند، پیش از خط ایست می‌ایستم.",
    "Rødt blinksignal sættes bl.a. op, hvor fly krydser vejen i lav højde, og betyder, at du skal standse.",
    "A red flashing signal is put up among other places where aircraft cross the road low, and it means that you must stop.",
    "چراغ چشمک‌زن قرمز از جمله جایی نصب می‌شود که هواپیماها در ارتفاع کم از روی جاده می‌گذرند و یعنی باید بایستید."),
  S(False, "Det røde blinksignal er til flyene, ikke til bilerne.", "The red flashing signal is for the aircraft, not the cars.",
    "چراغ قرمز چشمک‌زن برای هواپیماهاست، نه خودروها.",
    "Signalet gælder trafikanterne på vejen.", "The signal applies to road users on the road.", "این چراغ برای کاربرانِ جاده است."),
  S(False, "Når det røde lys blinker, må jeg køre videre, hvis jeg ikke selv kan se noget fly.",
    "When the red light is flashing, I may drive on if I cannot see an aircraft myself.",
    "وقتی چراغ قرمز چشمک می‌زند، اگر خودم هواپیمایی نبینم، می‌توانم ادامه دهم.",
    "Rødt blinksignal betyder, at du skal standse, også selv om du ikke kan se flyet.",
    "A red flashing signal means that you must stop, even if you cannot see the aircraft.",
    "چراغ چشمک‌زن قرمز یعنی باید بایستید، حتی اگر هواپیما را نبینید."),
)

Q(5814, "6.1", view("""
THE SCENE: a country road; at the entrance to a narrow side road stands a round sign with a red border and a white centre showing two
black arrowheads pointing towards each other horizontally and the text «2,2 m» between them.
MUST BE CLEARLY VISIBLE: the round width-limit sign with «2,2 m», the narrow side road.
MUST NOT APPEAR: other signs, any other text."""),
  "Du kører bil med en trailer. Lasten på traileren er 2,4 m bred. Ved indkørslen til en smal vej står denne tavle. Hvad gælder?",
  "You are driving a car with a trailer. The load on the trailer is 2.4 m wide. At the entrance to a narrow road stands this sign. What "
  "applies?",
  "با خودرویی که یدک دارد رانندگی می‌کنید. عرضِ بارِ روی یدک ۲٫۴ متر است. در ورودی جاده‌ای باریک این تابلو قرار دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke køre ind ad vejen, fordi lasten er bredere end 2,2 m.", "I must not drive into the road because the load is wider than 2.2 m.",
    "نباید وارد این جاده شوم، چون بار پهن‌تر از ۲٫۲ متر است.",
    "Tavlen forbyder kørsel med køretøjer, hvis bredde inklusive læs er større end den angivne.",
    "The sign forbids driving with vehicles whose width including the load is greater than shown.",
    "این تابلو رانندگیِ وسیله‌هایی را که عرضشان با بار بیشتر از عدد تابلوست ممنوع می‌کند."),
  S(False, "Det er kun bilens egen bredde, der tæller, ikke lasten.", "Only the car's own width counts, not the load.",
    "فقط عرضِ خودِ خودرو حساب می‌شود، نه بار.",
    "Bredden regnes inklusive læs.", "The width is measured including the load.", "عرض با احتساب بار حساب می‌شود."),
  S(False, "Tavlen gælder kun lastbiler.", "The sign only applies to lorries.", "این تابلو فقط برای کامیون‌هاست.",
    "Forbuddet gælder alle køretøjer, der er bredere end angivet.", "The ban applies to all vehicles wider than shown.",
    "این ممنوعیت برای همه‌ی وسیله‌های پهن‌تر از عدد تابلوست."),
)

Q(5815, "6.1", view("""
THE SCENE: a motorway; above the lanes hangs a large electronic sign with three lines of lit orange text; the text is not readable
in the picture; traffic flows normally.
MUST BE CLEARLY VISIBLE: the large electronic text sign over the motorway.
MUST NOT APPEAR: readable words, other signs."""),
  "Over motorvejen hænger en stor elektronisk tavle med tekst. Den viser, at der er kø om 2 km. Hvad gælder?",
  "Above the motorway hangs a large electronic sign with text. It shows that there is a queue in 2 km. What applies?",
  "بالای آزادراه تابلوی الکترونیکیِ بزرگی با متن آویزان است. نشان می‌دهد که ۲ کیلومتر جلوتر صف است. چه قاعده‌ای برقرار است؟",
  S(True, "Tavlen viser aktuel information, der har betydning for trafikken.", "The sign shows current information that matters for the traffic.",
    "این تابلو اطلاعات به‌روزی نشان می‌دهد که برای ترافیک اهمیت دارد.",
    "En variabel teksttavle viser aktuel information af trafikal betydning.", "A variable message sign shows current information of importance to traffic.",
    "تابلوی متنیِ متغیر اطلاعات به‌روزی با اهمیت ترافیکی نشان می‌دهد."),
  S(True, "Jeg er klar til at sætte farten ned og holder god afstand.", "I am ready to slow down and keep a good distance.",
    "آماده‌ی کم کردن سرعتم و فاصله‌ی کافی نگه می‌دارم.",
    "Bag et sving eller en bakke kan køen komme pludseligt.", "Behind a bend or a hill the queue may appear suddenly.",
    "ممکن است صف پشت یک پیچ یا تپه ناگهان پیدا شود."),
  S(True, "Jeg overholder stadig de hastighedsgrænser, der er skiltet.", "I still keep to the speed limits that are signed.",
    "همچنان حد سرعت‌هایی را که تابلو دارند رعایت می‌کنم.",
    "Teksttavlen ophæver ikke andre tavler.", "The text sign does not lift other signs.", "تابلوی متنی تابلوهای دیگر را لغو نمی‌کند."),
  S(False, "Teksten er kun reklame, som jeg kan se bort fra.", "The text is only advertising that I can ignore.",
    "این متن فقط تبلیغ است و می‌توانم به آن توجه نکنم.",
    "Tavlen bruges til trafikal information, fx om kø, uheld og vejarbejde.", "The sign is used for traffic information, for example about queues, accidents and road works.",
    "این تابلو برای اطلاعات ترافیکی، مثلاً درباره‌ی صف، تصادف و کار جاده‌ای، به کار می‌رود."),
)

Q(5816, "7.6", town("""
THE SCENE: a town street with a light-rail stop in the middle of the road: a platform between the two directions; a tram has just
left the platform and is moving away from us on its track; people who got off walk from the platform across our lane towards the
pavement; no pedestrian crossing.
MUST BE CLEARLY VISIBLE: the platform, the departing tram, the people crossing our lane.
MUST NOT APPEAR: signs, text."""),
  "Et letbanetog er lige kørt fra et stoppested midt på gaden. Nogle af de passagerer, der steg af, går hen over din vognbane. Hvordan "
  "forholder du dig?",
  "A light-rail tram has just left a stop in the middle of the street. Some of the passengers who got off are walking across your lane. "
  "What do you do?",
  "قطار شهری همین حالا از ایستگاهی وسط خیابان راه افتاده است. چند نفر از مسافرانی که پیاده شدند، از عرض خط شما رد می‌شوند. چه می‌کنید؟",
  S(True, "Jeg kører langsomt forbi stoppestedet og er parat til at holde stille.", "I drive slowly past the stop and am prepared to stand still.",
    "آهسته از کنار ایستگاه رد می‌شوم و آماده‌ام که بایستم.",
    "Passagerer fra letbanen går ofte direkte over vejen, når toget er kørt.", "Passengers from the light rail often walk straight across the road once the tram has gone.",
    "مسافران قطار شهری اغلب بعد از رفتن قطار مستقیم از عرض خیابان رد می‌شوند."),
  S(True, "Jeg giver de gående tid til at komme over.", "I give the pedestrians time to get across.", "به عابران فرصت می‌دهم که رد شوند.",
    "De gående er allerede ude på kørebanen, og du skal køre, så du ikke bringer dem i fare.",
    "The pedestrians are already out on the carriageway, and you must drive so that you do not put them in danger.",
    "عابران همین حالا در سواره‌رو هستند و باید طوری برانید که آن‌ها را به خطر نیندازید."),
  S(True, "Jeg holder øje med folk, der løber for at nå det næste tog.", "I watch for people running to catch the next tram.",
    "مراقب کسانی هستم که برای رسیدن به قطار بعدی می‌دوند.",
    "Folk, der har travlt, ser ikke altid efter trafikken.", "People in a hurry do not always look out for traffic.",
    "آدم‌های عجول همیشه به ترافیک نگاه نمی‌کنند."),
  S(False, "Når toget er kørt, er der ikke længere nogen fare ved stoppestedet.", "Once the tram has gone, there is no longer any danger at the stop.",
    "وقتی قطار رفت، دیگر خطری کنار ایستگاه نیست.",
    "Netop når toget kører, går mange af passagererne over vejen.", "It is just when the tram leaves that many of the passengers cross the road.",
    "درست وقتی قطار راه می‌افتد، بسیاری از مسافران از خیابان رد می‌شوند."),
)

Q(5817, "7.6", view("""
THE SCENE: a narrow country road; ahead of us a farmer walks behind a small herd of cows that move along the road in our direction,
filling most of it; the farmer holds a stick and looks back at us.
MUST BE CLEARLY VISIBLE: the cows on the road moving away from us, the farmer behind them.
MUST NOT APPEAR: signs, text."""),
  "En landmand driver en flok køer hen ad vejen i din retning. Køerne fylder det meste af vejen. Hvordan forholder du dig?",
  "A farmer is driving a herd of cows along the road in your direction. The cows take up most of the road. What do you do?",
  "کشاورزی گله‌ای گاو را در جهت حرکت شما در امتداد جاده می‌راند. گاوها بیشترِ جاده را گرفته‌اند. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og holder god afstand til køerne.", "I slow down and keep a good distance from the cows.",
    "سرعتم را کم می‌کنم و از گاوها فاصله‌ی کافی نگه می‌دارم.",
    "Hvor du nærmer dig kreaturer på vejen, skal farten være passende lav.", "Where you approach cattle on the road, your speed must be suitably low.",
    "وقتی به دام‌هایی روی جاده نزدیک می‌شوید، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Jeg kører først forbi, når landmanden har gjort plads og giver tegn, og det kan ske roligt.",
    "I only drive past when the farmer has made room and signals, and it can be done calmly.",
    "فقط وقتی رد می‌شوم که کشاورز جا باز کند و علامت بدهد و بتوانم آرام بگذرم.",
    "Landmanden kan bedst vurdere, hvornår dyrene er under kontrol, og presser du på, kan de blive urolige.",
    "The farmer can best judge when the animals are under control, and if you push on, they may become restless.",
    "کشاورز بهتر از همه می‌داند کی حیوانات تحت کنترل‌اند و اگر عجله کنید ممکن است ناآرام شوند."),
  S(False, "Jeg dytter, så køerne går ind til siden.", "I sound the horn so that the cows move to the side.",
    "بوق می‌زنم تا گاوها کنار بروند.",
    "Et dyt kan skræmme dyrene, så de løber ud foran dig.", "A hoot may frighten the animals so that they run out in front of you.",
    "یک بوق ممکن است حیوانات را بترساند و جلوی شما بدوند."),
  S(False, "Den, der driver køerne, behøver ikke følge færdselsreglerne.", "The person driving the cows need not follow the traffic rules.",
    "کسی که گاوها را می‌راند لازم نیست قوانین راهنمایی و رانندگی را رعایت کند.",
    "Reglerne for kørende gælder også for dem, der driver kreaturer, så vidt de kan bruges.",
    "The rules for drivers also apply to those driving cattle, as far as they can be applied.",
    "قاعده‌های رانندگان، تا جایی که قابل اجراست، برای کسانی که دام می‌رانند هم برقرار است."),
)

Q(5818, "7.6", view("""
THE SCENE: a country road; a footpath and cycle path crosses the road ahead without any pedestrian crossing or signs; on the path at
the right edge of the road a family with two small children stands and wants to cross.
MUST BE CLEARLY VISIBLE: the path crossing the road, the family with the children waiting at the edge.
MUST NOT APPEAR: signs, text, zebra stripes."""),
  "En sti krydser landevejen. Der er ikke noget fodgængerfelt. En familie med to små børn står på stien og vil over vejen. Hvordan "
  "forholder du dig?",
  "A path crosses the country road. There is no pedestrian crossing. A family with two small children stands on the path and wants to "
  "cross the road. What do you do?",
  "مسیری از عرض جاده‌ی بیرون شهر می‌گذرد. گذرگاه عابر پیاده‌ای نیست. خانواده‌ای با دو کودک کوچک روی مسیر ایستاده و می‌خواهد از جاده رد "
  "شود. چه می‌کنید؟",
  S(True, "Jeg sænker farten, så jeg kan nå at standse, hvis familien går ud.", "I reduce speed so that I can stop in time if the family steps out.",
    "سرعتم را کم می‌کنم تا اگر خانواده وارد جاده شد، بتوانم به‌موقع بایستم.",
    "Når du nærmer dig børn ved vejen, skal farten være passende lav.", "When you approach children by the road, your speed must be suitably low.",
    "وقتی به کودکانِ کنار جاده نزدیک می‌شوید، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(True, "Et af børnene kan pludselig løbe ud.", "One of the children may suddenly run out.", "ممکن است یکی از کودکان ناگهان بیرون بدود.",
    "Små børn kan ikke vurdere afstand og fart.", "Small children cannot judge distance and speed.", "کودکان کوچک نمی‌توانند فاصله و سرعت را بسنجند."),
  S(True, "Jeg viser særligt hensyn, fordi der er børn.", "I show special consideration because there are children.",
    "چون کودکانی هستند، ملاحظه‌ی ویژه دارم.",
    "Der skal vises særligt hensyn over for børn.", "Special consideration must be shown towards children.", "نسبت به کودکان باید ملاحظه‌ی ویژه داشت."),
  S(False, "Familien skal vente, fordi der ikke er noget fodgængerfelt, så jeg holder farten.",
    "The family must wait because there is no pedestrian crossing, so I keep my speed.",
    "خانواده باید صبر کند، چون گذرگاه عابری نیست، پس سرعتم را حفظ می‌کنم.",
    "De gående skal være forsigtige, men du skal stadig tage hensyn og kunne standse.",
    "The pedestrians must take care, but you must still show consideration and be able to stop.",
    "عابران باید احتیاط کنند، ولی شما هم باید ملاحظه کنید و بتوانید بایستید."),
)

Q(5819, "7.6", town("""
THE SCENE: a town street in heavy rain; on the right pavement a man holding an umbrella low in front of his face steps off the kerb
onto the carriageway without looking; puddles along the kerb.
MUST BE CLEARLY VISIBLE: the man with the umbrella stepping out, the puddles.
MUST NOT APPEAR: signs, text, zebra stripes.""", cond="heavy rain, wet road"),
  "Det regner kraftigt. En mand med en paraply foran ansigtet går ud på vejen uden at se sig for. Hvordan forholder du dig?",
  "It is raining heavily. A man holding an umbrella in front of his face steps out onto the road without looking. What do you do?",
  "باران شدیدی می‌بارد. مردی که چتر را جلوی صورتش گرفته، بی‌آن‌که نگاه کند وارد خیابان می‌شود. چه می‌کنید؟",
  S(True, "Jeg tager straks foden fra speederen og gør mig klar til at bremse.", "I take my foot off the accelerator at once and get ready to brake.",
    "فوراً پایم را از روی پدال گاز برمی‌دارم و آماده‌ی ترمز می‌شوم.",
    "Paraplyen skjuler trafikken for ham, og bremselængden er længere på den våde vej.",
    "The umbrella hides the traffic from him, and the braking distance is longer on the wet road.",
    "چتر ترافیک را از دید او پنهان می‌کند و مسافت ترمز روی جاده‌ی خیس بیشتر است."),
  S(False, "Han har pligt til at se sig for, så jeg holder farten.", "He has a duty to look, so I keep my speed.",
    "او موظف است نگاه کند، پس سرعتم را حفظ می‌کنم.",
    "Selv om den gående skal være forsigtig, skal du gøre, hvad du kan, for at undgå en ulykke.",
    "Even though the pedestrian must take care, you must do what you can to avoid an accident.",
    "حتی اگر عابر باید احتیاط کند، شما باید هر کاری می‌توانید برای جلوگیری از تصادف بکنید."),
  S(False, "Han kan se mig, så jeg behøver ikke sætte farten ned.", "He can see me, so I need not slow down.",
    "او مرا می‌بیند، پس لازم نیست سرعتم را کم کنم.",
    "Med paraplyen foran ansigtet kan han netop ikke se dig.", "With the umbrella in front of his face he cannot see you.",
    "با چتری که جلوی صورتش است، دقیقاً شما را نمی‌بیند."),
  S(False, "Jeg dytter længe, så han skynder sig over.", "I sound the horn for a long time so that he hurries across.",
    "مدتی طولانی بوق می‌زنم تا سریع‌تر رد شود.",
    "Et langt dyt kan forskrække ham, og lydsignal må ikke vare længere end nødvendigt.",
    "A long hoot may startle him, and the horn must not sound longer than necessary.",
    "بوقِ طولانی ممکن است او را بترساند و بوق نباید بیش از حد لازم ادامه یابد."),
)

Q(5820, "7.3", view("""
THE SCENE: a country road with a round 80 sign; ahead of us a friend's car drives quickly away from us and is already some distance
ahead; a junction with traffic lights further ahead.
MUST BE CLEARLY VISIBLE: the 80 sign, the car pulling away ahead.
MUST NOT APPEAR: other signs, text."""),
  "Du følger efter en ven, der viser vej, men han kører hurtigere end tilladt. Hvordan forholder du dig?",
  "You are following a friend who is showing you the way, but he drives faster than allowed. What do you do?",
  "پشت سر دوستی که راه را نشانتان می‌دهد می‌رانید، ولی او تندتر از حد مجاز می‌رود. چه می‌کنید؟",
  S(True, "Jeg overholder hastighedsgrænsen, også selv om jeg mister ham af syne.", "I keep to the speed limit, even if I lose sight of him.",
    "حد سرعت را رعایت می‌کنم، حتی اگر او را گم کنم.",
    "Du har selv ansvaret for din hastighed.", "You are responsible for your own speed.", "مسئولیت سرعتتان با خودتان است."),
  S(True, "Vi aftaler et sted at mødes eller bruger navigation, så jeg ikke behøver at følge tæt efter.",
    "We agree on a place to meet or use navigation so that I do not need to follow closely.",
    "قرار می‌گذاریم جایی همدیگر را ببینیم یا از مسیریاب استفاده می‌کنم تا لازم نباشد نزدیکش برانم.",
    "Så kan du køre i dit eget tempo og efter reglerne.", "Then you can drive at your own pace and by the rules.",
    "این‌طور می‌توانید با سرعت خودتان و طبق قانون برانید."),
  S(True, "Jeg kører ikke over for gult eller rødt for at blive ved ham.", "I do not drive through on yellow or red to stay with him.",
    "برای این‌که از او جا نمانم، با چراغ زرد یا قرمز رد نمی‌شوم.",
    "Gult og rødt lys betyder stop, uanset hvem du følger efter.", "Yellow and red light mean stop, whoever you are following.",
    "چراغ زرد و قرمز یعنی ایست، پشت هر کسی که می‌رانید."),
  S(False, "Jeg må køre lidt over grænsen et kort stykke, så jeg ikke mister ham.",
    "I may go a little over the limit for a short stretch so that I do not lose him.",
    "می‌توانم مسافتی کوتاه کمی بیش از حد مجاز برانم تا او را گم نکنم.",
    "Hastighedsgrænsen gælder hele tiden, også når du følger efter nogen.", "The speed limit applies all the time, also when you are following someone.",
    "حد سرعت همیشه برقرار است، حتی وقتی پشت کسی می‌رانید."),
)

Q(5821, "7.3", picture("""
A small car seen from the side and slightly behind on a country road, towing a small open trailer loaded to the top with gravel; the
car's rear sits low under the weight.
MUST BE CLEARLY VISIBLE: the trailer full of gravel, the low rear of the car.
MUST NOT APPEAR: text, letters or numbers on the number plates, logos."""),
  "Du kører med en trailer, der er fuldt lastet med grus. Hvad betyder det for kørslen?",
  "You are driving with a trailer fully loaded with gravel. What does that mean for your driving?",
  "با یدکی پر از شن رانندگی می‌کنید. این برای رانندگی‌تان چه معنایی دارد؟",
  S(True, "Bremselængden bliver længere, end når jeg kører uden trailer.", "The braking distance becomes longer than when I drive without a trailer.",
    "مسافت ترمز بیشتر از وقتی است که بدون یدک می‌رانم.",
    "Den tunge trailer skubber på bilen, når du bremser, og vogntoget er tungere at standse.",
    "The heavy trailer pushes on the car when you brake, and the combination is heavier to stop.",
    "یدکِ سنگین هنگام ترمز خودرو را هل می‌دهد و نگه داشتنِ این مجموعه سخت‌تر است."),
  S(True, "Jeg holder større afstand til bilen foran og bremser tidligere.", "I keep a longer distance to the car in front and brake earlier.",
    "از خودروی جلویی فاصله‌ی بیشتری نگه می‌دارم و زودتر ترمز می‌کنم.",
    "Afstanden skal passe til, at du skal kunne standse, hvis bilen foran bremser.",
    "The distance must be enough for you to stop if the car in front brakes.",
    "فاصله باید آن‌قدر باشد که اگر خودروی جلویی ترمز کرد، بتوانید بایستید."),
  S(False, "Traileren gør bremselængden kortere, fordi vogntoget vejer mere.", "The trailer makes the braking distance shorter because the combination weighs more.",
    "یدک مسافت ترمز را کوتاه‌تر می‌کند، چون مجموعه سنگین‌تر است.",
    "Mere vægt giver længere bremselængde, ikke kortere.", "More weight gives a longer braking distance, not a shorter one.",
    "وزنِ بیشتر مسافت ترمز را بیشتر می‌کند، نه کمتر."),
  S(False, "Med trailer må jeg køre 90 km/t på landevejen, når der er skiltet 90.",
    "With a trailer I may drive 90 km/h on the country road when 90 is signed.",
    "با یدک، وقتی تابلوی ۹۰ هست، می‌توانم در جاده‌ی بیرون شهر ۹۰ کیلومتر در ساعت برانم.",
    "Bil med påhængsvogn må højst køre 80 km/t, uanset hvad der er skiltet på landevejen.",
    "A car with a trailer may drive at most 80 km/h, whatever is signed on the country road.",
    "خودرو با یدک، هر چه روی تابلوهای جاده‌ی بیرون شهر نوشته باشد، حداکثر ۸۰ کیلومتر در ساعت می‌تواند براند."),
)

Q(5822, "7.3", view("""
THE SCENE: a wide road with two lanes in our direction; above the lanes hangs a gantry with two round speed-limit signs: over the right
lane «50» with a white arrow pointing down beneath it, over the left lane «70» with a white arrow pointing down beneath it; we drive in
the right lane.
MUST BE CLEARLY VISIBLE: the gantry with the two signs and their downward arrows, our position in the right lane.
MUST NOT APPEAR: other signs, any other text."""),
  "Over vejen hænger to hastighedstavler med en pil nedad under hver: over højre vognbane 50 km/t og over venstre vognbane 70 km/t. Du "
  "kører i højre vognbane. Hvad gælder?",
  "Above the road hang two speed-limit signs, each with an arrow pointing down beneath it: over the right lane 50 km/h and over the left "
  "lane 70 km/h. You are in the right lane. What applies?",
  "بالای جاده دو تابلوی حد سرعت آویزان است که زیر هر کدام فلشی رو به پایین هست: بالای خط راست ۵۰ و بالای خط چپ ۷۰ کیلومتر در ساعت. "
  "شما در خط راست هستید. چه قاعده‌ای برقرار است؟",
  S(True, "Hver tavle gælder for den vognbane, pilen peger ned på.", "Each sign applies to the lane its arrow points down at.",
    "هر تابلو برای خطی است که فلشش به آن اشاره می‌کند.",
    "Tavler over kørebanen kan med nedadrettede pile gælde for enkelte vognbaner.",
    "Signs above the carriageway can apply to single lanes by means of downward arrows.",
    "تابلوهای بالای سواره‌رو با فلش‌های رو به پایین می‌توانند فقط برای خط‌های مشخصی باشند."),
  S(True, "I højre vognbane må jeg højst køre 50 km/t.", "In the right lane I may drive at most 50 km/h.", "در خط راست حداکثر ۵۰ کیلومتر در ساعت می‌توانم برانم.",
    "Tavlen over din vognbane viser 50.", "The sign above your lane shows 50.", "تابلوی بالای خط شما ۵۰ را نشان می‌دهد."),
  S(False, "Den laveste grænse gælder for alle vognbaner.", "The lowest limit applies to all lanes.", "پایین‌ترین حد برای همه‌ی خط‌هاست.",
    "Pilene viser, at grænserne gælder hver sin vognbane.", "The arrows show that the limits apply to separate lanes.",
    "فلش‌ها نشان می‌دهند که هر حد برای خط خودش است."),
  S(False, "Den højeste grænse gælder for alle vognbaner.", "The highest limit applies to all lanes.", "بالاترین حد برای همه‌ی خط‌هاست.",
    "I højre vognbane gælder 50 km/t, selv om der er 70 km/t i venstre.", "In the right lane 50 km/h applies, even though it is 70 km/h in the left.",
    "در خط راست ۵۰ برقرار است، حتی اگر در خط چپ ۷۰ باشد."),
)

Q(5823, "7.3", view("""
THE SCENE: a country road; on the right a round speed-limit sign 60 with a white rectangular plate under it showing «200 m»; further
ahead a village begins.
MUST BE CLEARLY VISIBLE: the 60 sign with its «200 m» plate.
MUST NOT APPEAR: other signs, any other text."""),
  "Du kører 80 km/t og kommer forbi en tavle med 60 km/t og undertavlen »200 m«. Hvad betyder det?",
  "You are doing 80 km/h and pass a 60 km/h sign with the plate «200 m». What does it mean?",
  "با ۸۰ کیلومتر در ساعت از کنار تابلوی ۶۰ با زیرتابلوی «۲۰۰ متر» می‌گذرید. معنایش چیست؟",
  S(True, "Grænsen på 60 km/t gælder fra et sted 200 m længere fremme.", "The 60 km/h limit applies from a point 200 m further ahead.",
    "حد ۶۰ کیلومتر در ساعت از نقطه‌ای ۲۰۰ متر جلوتر برقرار می‌شود.",
    "Undertavlen viser afstanden til det sted, hvorfra tavlens angivelse gælder.",
    "The plate shows the distance to the place from which the sign applies.",
    "زیرتابلو فاصله تا جایی را نشان می‌دهد که حکم تابلو از آن‌جا برقرار است."),
  S(False, "Grænsen gælder allerede fra tavlen.", "The limit already applies from the sign.", "این حد از همان تابلو برقرار است.",
    "Afstanden på undertavlen viser, at grænsen først begynder længere fremme.", "The distance on the plate shows that the limit only begins further ahead.",
    "فاصله‌ی روی زیرتابلو نشان می‌دهد که این حد جلوتر شروع می‌شود."),
  S(False, "Grænsen gælder kun på de næste 200 m.", "The limit only applies for the next 200 m.", "این حد فقط برای ۲۰۰ متر بعدی است.",
    "En strækning med begyndelse og slutning vises med to tal på undertavlen.", "A stretch with a start and an end is shown with two numbers on the plate.",
    "مسیری که شروع و پایان دارد با دو عدد روی زیرتابلو نشان داده می‌شود."),
)

Q(5824, "1.2", picture("""
The back of a car with a tow bar and the front of a small braked trailer coupled to it, seen close up; the coupling head sits on the
tow ball; a thin steel breakaway cable runs from the trailer to a fixing point on the car; the trailer's electric plug is in the car's
socket; the jockey wheel at the front of the trailer is wound up.
MUST BE CLEARLY VISIBLE: the coupling on the tow ball, the breakaway cable, the plug in the socket, the raised jockey wheel.
MUST NOT APPEAR: text, logos."""),
  "Du kobler en trailer med bremser til bilen. Hvad skal du sikre dig, før du kører?",
  "You are coupling a braked trailer to the car. What must you make sure of before you drive?",
  "یدکی ترمزدار را به خودرو وصل می‌کنید. پیش از حرکت باید از چه چیزهایی مطمئن شوید؟",
  S(True, "At koblingen sidder rigtigt fast på kuglen.", "That the coupling is properly locked onto the tow ball.",
    "این‌که قفلِ یدک درست روی گوی کشنده محکم شده باشد.",
    "Føreren skal sørge for, at tilkoblingen til påhængskøretøjet er forsvarlig.", "The driver must make sure that the connection to the trailer is safe.",
    "راننده باید مطمئن شود که اتصال به یدک ایمن است."),
  S(True, "At sikkerhedswiren er sat fast på bilen, så traileren bremses, hvis den løsner sig.",
    "That the breakaway cable is fixed to the car so that the trailer brakes if it comes loose.",
    "این‌که سیم ایمنی به خودرو بسته شده باشد تا اگر یدک جدا شد، ترمز کند.",
    "Wiren trækker trailerens bremse, hvis koblingen svigter.", "The cable applies the trailer's brake if the coupling fails.",
    "اگر اتصال از کار بیفتد، این سیم ترمز یدک را می‌کشد."),
  S(True, "At trailerens lygter og blinklys virker.", "That the trailer's lights and indicators work.", "این‌که چراغ‌ها و راهنماهای یدک کار کنند.",
    "Føreren skal være opmærksom på, at lygter og tegngivning også virker på påhængskøretøjet.",
    "The driver must make sure that lights and signals also work on the trailer.",
    "راننده باید مطمئن شود که چراغ‌ها و علامت‌دهی روی یدک هم کار می‌کنند."),
  S(False, "At næsehjulet står nede, så traileren står stabilt under kørslen.", "That the jockey wheel is down so that the trailer is stable while driving.",
    "این‌که چرخ جلوی یدک پایین باشد تا یدک هنگام حرکت ثابت بماند.",
    "Næsehjulet skal være drejet op, før du kører.", "The jockey wheel must be wound up before you drive.",
    "چرخ جلوی یدک باید پیش از حرکت بالا کشیده شود."),
)

Q(5825, "3.2", view("""
THE SCENE: a country road with a sharp bend ahead and trees bending in a strong side wind; we are driving a tall van with a high roof
box load; the van's high front is suggested by the high viewpoint above the road.
MUST BE CLEARLY VISIBLE: the sharp bend ahead, the trees bending in the wind.
MUST NOT APPEAR: signs, text.""", cond="windy day, dry road"),
  "Du har lånt en høj varevogn med tung last på taget. Foran dig er der et skarpt sving, og det blæser kraftigt fra siden. Hvad gælder?",
  "You have borrowed a tall van with a heavy load on the roof. Ahead there is a sharp bend, and there is a strong side wind. What applies?",
  "یک ون بلند با باری سنگین روی سقف قرض گرفته‌اید. جلوتر پیچ تندی هست و باد شدیدی از کنار می‌وزد. چه قاعده‌ای برقرار است؟",
  S(True, "Varevognen er mere følsom for sidevind og kan lettere vælte i et sving, så jeg kører langsommere.",
    "The van is more sensitive to side wind and can more easily tip over in a bend, so I drive more slowly.",
    "ون نسبت به باد جانبی حساس‌تر است و در پیچ راحت‌تر واژگون می‌شود، پس آهسته‌تر می‌رانم.",
    "Et højt køretøj med last på taget har et højt tyngdepunkt og en stor side, som vinden tager fat i.",
    "A tall vehicle with a roof load has a high centre of gravity and a large side for the wind to catch.",
    "وسیله‌ی بلندی که روی سقف بار دارد مرکز ثقل بالایی دارد و سطح جانبیِ بزرگی که باد به آن فشار می‌آورد."),
  S(False, "Den tunge last gør, at varevognen ligger bedre i svinget.", "The heavy load makes the van hold the road better in the bend.",
    "بار سنگین باعث می‌شود ون در پیچ بهتر به جاده بچسبد.",
    "Last højt oppe gør tværtimod bilen mere ustabil.", "A load high up makes the vehicle more unstable instead.", "باری که بالا قرار دارد، برعکس، خودرو را ناپایدارتر می‌کند."),
  S(False, "Lasten på taget har ingen betydning, når den er spændt godt fast.", "The load on the roof does not matter when it is well strapped down.",
    "وقتی بار روی سقف محکم بسته شده، اهمیتی ندارد.",
    "Selv godt fastspændt last hæver tyngdepunktet og gør køretøjet mere følsomt.",
    "Even a well-strapped load raises the centre of gravity and makes the vehicle more sensitive.",
    "حتی بارِ محکم‌بسته هم مرکز ثقل را بالا می‌برد و وسیله را حساس‌تر می‌کند."),
)
