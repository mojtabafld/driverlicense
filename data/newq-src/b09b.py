# «آزمون جدید», batch 9 (5801–5900), part b: stopping and parking (7.18), overtaking (7.9), signs (6.1), people and animals
# beside the road (7.6), speed (7.3), the car (1.2), road types (5.1), passengers and animals in the car (8.1) and the licence (10.3).
# Also one question on lights for a parked car with a trailer (7.19).
# Rules: Færdselsloven §§ 1 and 2 nr. 28 (the Act covers roads used for general traffic, public or private), 5 stk. 1 (speed so that
# you can stop before the tracks), 7 stk. 2, 15 stk. 3 (vehicles with a special speed limit keep a gap for overtakers outside town),
# 21 stk. 3 nr. 1 and 4, 26 stk. 3, 27 stk. 7, 28 stk. 1, 29 stk. 1 nr. 2 and stk. 3 nr. 5, 32 stk. 1
# (in the lighting-up time use the light signal instead of the horn unless danger is imminent), 41 stk. 2 nr. 10–11 and stk. 3, 42
# stk. 3, 43 stk. 3, 44–46 and 48 (motorway rules also on motortrafikvej), 56 stk. 1 (carry the licence and show it to the police),
# 59 (licence valid 15 years), 33 stk. 1 and 35 stk. 1 and 4 (parked in the lighting-up time: position lights, rear lights and
# number plate light; the relaxation for a single car does not apply when a trailer is coupled), 82 stk. 1, 125 stk. 1 nr. 3 and
# stk. 2 nr. 5 (speeding: more than 30 pct. counts towards the three offences; more than 60 pct., 160 km/h or more than 40 pct. at
# road works gives conditional disqualification); BEK 425/2023:
# § 9 U 6 (plate: the sign applies to an adjoining road), A 17/E 17, E 42, § 69 Z 95 (blue flashing light: take special care
# because of an accident or fire).
from nq import Q, S, above, picture, town, view

Q(5826, "7.18", town("""
THE SCENE: a narrow two-way residential street with houses on both sides; on the LEFT side of the street a car is parked at the kerb;
directly opposite it, on our right side, there is a free space at the kerb; if a car parked there, only a narrow gap would remain
between the two cars; further along both sides are free.
MUST BE CLEARLY VISIBLE: the narrow street, the car parked on the left, the free space directly opposite on the right.
MUST NOT APPEAR: signs, text, yellow lines."""),
  "Gaden er smal. I den modsatte side holder en bil parkeret, og lige over for den er der en ledig plads i din side. Parkerer du der, "
  "bliver der kun omkring 2 m mellem de to biler. Hvad gælder?",
  "The street is narrow. On the opposite side a car is parked, and directly opposite it there is a free space on your side. If you park "
  "there, only about 2 m will remain between the two cars. What applies?",
  "خیابان باریک است. در طرف مقابل خودرویی پارک شده و درست روبه‌رویش، در سمت شما، جای خالی هست. اگر آن‌جا پارک کنید، فقط حدود ۲ متر "
  "بین دو خودرو باقی می‌ماند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg parkerer ikke her, fordi andre køretøjer så får svært ved at komme forbi.",
    "I do not park here, because other vehicles would then find it hard to get past.",
    "این‌جا پارک نمی‌کنم، چون در این صورت وسیله‌های دیگر به‌سختی می‌توانند رد شوند.",
    "Standsning og parkering må ikke ske på et sted eller på en måde, så der opstår fare eller ulempe for færdslen.",
    "Stopping and parking must not take place at a spot or in a way that causes danger or inconvenience to traffic.",
    "توقف و پارک نباید در جایی یا به شکلی باشد که برای ترافیک خطر یا مزاحمت ایجاد کند."),
  S(True, "Jeg finder en plads længere fremme, hvor der bliver mere plads mellem bilerne.",
    "I find a space further along where there will be more room between the cars.",
    "جایی جلوتر پیدا می‌کنم که فاصله‌ی بیشتری بین خودروها بماند.",
    "Så kan også brede køretøjer som lastbiler, busser og brandbiler komme igennem gaden.",
    "Then wide vehicles such as lorries, buses and fire engines can also get through the street.",
    "این‌طور وسیله‌های پهن مثل کامیون، اتوبوس و ماشین آتش‌نشانی هم می‌توانند از خیابان بگذرند."),
  S(False, "Det er tilladt, fordi der ikke står nogen tavle med parkeringsforbud.",
    "It is allowed because there is no sign banning parking.", "مجاز است، چون تابلوی ممنوعیت پارک نیست.",
    "Også uden tavler må du ikke parkere, så du er til fare eller ulempe for andre.",
    "Even without signs you must not park where you cause danger or inconvenience to others.",
    "حتی بدون تابلو هم نباید طوری پارک کنید که برای دیگران خطر یا مزاحمت باشد."),
  S(False, "Det er tilladt, så længe en almindelig personbil lige akkurat kan komme forbi.",
    "It is allowed as long as an ordinary car can only just get past.", "تا وقتی یک خودروی سواریِ معمولی به‌زور بتواند رد شود، مجاز است.",
    "Gaden skal også kunne bruges af bredere køretøjer, og et udrykningskøretøj må ikke blive spærret inde.",
    "The street must also be usable by wider vehicles, and an emergency vehicle must not be blocked.",
    "خیابان باید برای وسیله‌های پهن‌تر هم قابل استفاده باشد و راه خودروی امدادی نباید بسته شود."),
)

Q(5827, "7.18", town("""
THE SCENE: a quiet residential road in a villa quarter, with hedges and gardens on both sides; about 4 m ahead it meets another
residential road in a T-junction; the kerb at the corner is free; the road looks like any other road.
MUST BE CLEARLY VISIBLE: the junction just ahead, the free kerb close to the corner.
MUST NOT APPEAR: signs, text, road markings."""),
  "Du kører på en privat fællesvej i et villakvarter, hvor alle må køre. Du vil parkere ca. 4 m fra et kryds med en anden vej. Der er "
  "ingen tavler. Hvad gælder?",
  "You are driving on a private shared road in a villa quarter that anyone may use. You want to park about 4 m from a junction with "
  "another road. There are no signs. What applies?",
  "در یک جاده‌ی خصوصیِ مشترک در محله‌ای ویلایی می‌رانید که همه اجازه‌ی رفت‌وآمد در آن را دارند. می‌خواهید حدود ۴ متر مانده به تقاطع "
  "با جاده‌ای دیگر پارک کنید. تابلویی نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke parkere her, fordi færdselsloven også gælder på private veje.",
    "I must not park here, because the Road Traffic Act also applies on private roads.",
    "نباید این‌جا پارک کنم، چون قانون راهنمایی و رانندگی در جاده‌های خصوصی هم اجرا می‌شود.",
    "Loven gælder på veje, der bruges til almindelig færdsel, både offentlige og private, og det er forbudt at standse og parkere "
    "nærmere end 10 m fra krydset.",
    "The Act applies on roads used for general traffic, both public and private, and stopping and parking are forbidden closer than "
    "10 m to the junction.",
    "این قانون در جاده‌هایی که برای رفت‌وآمد عمومی استفاده می‌شوند، چه عمومی و چه خصوصی، اجرا می‌شود و توقف و پارک در کمتر از "
    "۱۰ متری تقاطع ممنوع است."),
  S(False, "På en privat vej er det kun ejerne, der bestemmer, hvor jeg må parkere.",
    "On a private road only the owners decide where I may park.", "در جاده‌ی خصوصی فقط مالکان تعیین می‌کنند کجا می‌توانم پارک کنم.",
    "Færdselslovens regler gælder også på private veje, som bruges til almindelig færdsel.",
    "The rules of the Road Traffic Act also apply on private roads that are used for general traffic.",
    "قاعده‌های قانون راهنمایی و رانندگی در جاده‌های خصوصی‌ای هم که برای رفت‌وآمد عمومی استفاده می‌شوند، برقرارند."),
  S(False, "Afstanden til krydset har kun betydning, hvor der står tavler.", "The distance to the junction only matters where there are signs.",
    "فاصله تا تقاطع فقط جایی اهمیت دارد که تابلو باشد.",
    "Forbuddet mod at standse og parkere tæt ved et kryds gælder altid, også uden tavler.",
    "The ban on stopping and parking close to a junction always applies, also without signs.",
    "ممنوعیت توقف و پارک نزدیک تقاطع همیشه برقرار است، حتی بدون تابلو."),
)

Q(5828, "7.18", view("""
THE SCENE: the beginning of an access road leading up to a motorway; at the start of the access road on the right stands a green
square sign with a white motorway symbol (a road with two carriageways passing under a bridge); a little further up the access road a
young man with a backpack stands at the right edge and holds out his thumb to hitch a ride.
MUST BE CLEARLY VISIBLE: the green motorway sign, the access road, the hitchhiker at its edge.
MUST NOT APPEAR: other signs, text."""),
  "På tilkørslen til motorvejen står en blaffer med tommelfingeren oppe. Du vil gerne give ham et lift. Hvad gælder?",
  "On the access road to the motorway a hitchhiker stands with his thumb out. You would like to give him a lift. What applies?",
  "در ورودیِ آزادراه کسی برای سوار شدن مجانی شستش را بالا گرفته است. دلتان می‌خواهد سوارش کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke standse på tilkørslen for at tage ham op.", "I must not stop on the access road to pick him up.",
    "نباید در ورودیِ آزادراه بایستم تا سوارش کنم.",
    "På motorvej og dens til- og frakørsler må der kun standses på de anviste parkerings- og rastepladser.",
    "On a motorway and its access and exit roads you may only stop at the designated parking and rest areas.",
    "در آزادراه و راه‌های ورودی و خروجی آن فقط در پارکینگ‌ها و استراحتگاه‌های تعیین‌شده می‌توان ایستاد."),
  S(True, "Jeg kører videre ud på motorvejen.", "I drive on to the motorway.", "به راهم به سمت آزادراه ادامه می‌دهم.",
    "En uventet standsning på tilkørslen er farlig, fordi trafikken bag dig ikke regner med den.",
    "An unexpected stop on the access road is dangerous because the traffic behind you does not expect it.",
    "ایستادنِ غیرمنتظره در ورودی خطرناک است، چون ترافیک پشت سر انتظارش را ندارد."),
  S(False, "Jeg må standse, hvis jeg tænder havariblinket.", "I may stop if I switch on the hazard lights.",
    "اگر چراغ‌های خطر را روشن کنم، می‌توانم بایستم.",
    "Havariblinket gør det ikke tilladt at standse, hvor det er forbudt.", "Hazard lights do not make it lawful to stop where it is forbidden.",
    "چراغ‌های خطر توقف را در جای ممنوع مجاز نمی‌کنند."),
  S(False, "Jeg må standse et øjeblik, fordi påstigning ikke regnes som parkering.",
    "I may stop for a moment because letting someone get in does not count as parking.",
    "می‌توانم لحظه‌ای بایستم، چون سوار کردن مسافر پارک حساب نمی‌شود.",
    "På motorvejsanlæg er også en kort standsning forbudt uden for de anviste pladser.",
    "On motorway roads even a short stop is forbidden outside the designated areas.",
    "در محدوده‌ی آزادراه، حتی توقف کوتاه هم بیرون از جاهای تعیین‌شده ممنوع است."),
)

Q(5829, "7.19", town("""
THE SCENE: a dark residential street in town without street lights; a car with a small box trailer coupled to it is parked along the
right kerb; on the car the small front position lights glow, and at the back of the trailer the red rear lights and the number plate
light are lit; the houses have a few lit windows.
MUST BE CLEARLY VISIBLE: the parked car with the trailer, the lit position lights at the front, the lit rear lights at the back of the
trailer.
MUST NOT APPEAR: street lights, signs, text, readable number plates.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt. Du parkerer din bil med en trailer koblet på ved kantstenen på en villavej i byen uden gadelys. Hvad gælder om lyset?",
  "It is dark. You park your car with a trailer coupled to it at the kerb in a residential road in town without street lights. What "
  "applies to the lights?",
  "هوا تاریک است. خودرویتان را با یدکِ متصل کنار جدول در یک خیابان مسکونی در شهر که چراغ خیابان ندارد پارک می‌کنید. درباره‌ی چراغ‌ها چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Bilens positionslys skal være tændt.", "The car's position lights must be on.", "چراغ‌های کوچکِ (پارک) خودرو باید روشن باشند.",
    "En bil, der holder på vejen i lygtetændingstiden, skal have positionslys tændt.",
    "A car standing on the road during the lighting-up time must have its position lights on.",
    "خودرویی که در زمان روشن کردن چراغ‌ها در جاده ایستاده، باید چراغ‌های کوچکش روشن باشد."),
  S(True, "Baglygterne skal lyse bagest på traileren.", "The rear lights must be lit at the back of the trailer.",
    "چراغ‌های عقب باید در انتهای یدک روشن باشند.",
    "På sammenkoblede køretøjer er det baglygterne bagest på vogntoget, der skal være tændt.",
    "On coupled vehicles it is the rear lights at the back of the combination that must be on.",
    "در وسیله‌های به‌هم‌متصل، چراغ‌های عقبِ انتهای مجموعه باید روشن باشند."),
  S(True, "Lyset ved trailerens nummerplade skal være tændt.", "The light at the trailer's number plate must be on.",
    "چراغ پلاکِ یدک باید روشن باشد.",
    "Nummerpladelyset skal være tændt ved vogntogets bageste nummerplade.", "The number plate light must be on at the rearmost number plate of the combination.",
    "چراغ پلاک باید روی آخرین پلاکِ مجموعه روشن باشد."),
  S(False, "Det er nok at tænde parkeringslys og baglygte i den side, der vender ud mod vejen.",
    "It is enough to switch on the parking light and rear light on the side facing the road.",
    "کافی است چراغ پارک و چراغ عقبِ سمتی را که رو به جاده است روشن کنم.",
    "Den lempelse gælder kun for en enkelt bil, der ikke er koblet til et andet køretøj.",
    "That relaxation only applies to a single car that is not coupled to another vehicle.",
    "این آسان‌گیری فقط برای خودروی تنهایی است که به وسیله‌ی دیگری وصل نیست."),
)

Q(5830, "7.18", town("""
THE SCENE: a town street with parking at the right kerb; a white van is parked at the kerb with a white wheelchair symbol on a blue
square on its rear doors, and a folded ramp is visible at its back; directly behind the van there is a free stretch of kerb.
MUST BE CLEARLY VISIBLE: the van with the wheelchair symbol and the ramp at the back, the free space directly behind it.
MUST NOT APPEAR: signs, text."""),
  "Ved kantstenen holder en kassevogn med et kørestolssymbol på bagdørene og en rampe bagtil. Lige bag den er der en ledig plads. Du vil "
  "parkere tæt bag kassevognen. Hvad gælder?",
  "At the kerb stands a van with a wheelchair symbol on the rear doors and a ramp at the back. Directly behind it there is a free space. "
  "You want to park close behind the van. What applies?",
  "کنار جدول یک ون با نماد ویلچر روی درهای عقب و یک رمپ در پشتش پارک شده است. درست پشت آن جای خالی هست. می‌خواهید نزدیکِ پشت ون "
  "پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder så langt fra kassevognen, at rampen kan bruges, og kørestolen kan komme ind og ud.",
    "I stay so far from the van that the ramp can be used and the wheelchair can get in and out.",
    "آن‌قدر از ون فاصله می‌گیرم که بشود از رمپ استفاده کرد و ویلچر بتواند سوار و پیاده شود.",
    "Du må ikke parkere, så adgangen til et andet køretøj hindres.", "You must not park so that access to another vehicle is blocked.",
    "نباید طوری پارک کنید که دسترسی به وسیله‌ی دیگری بسته شود."),
  S(True, "Er pladsen for kort til det, finder jeg en anden plads.", "If the space is too short for that, I find another space.",
    "اگر جا برای این کار کوتاه باشد، جای دیگری پیدا می‌کنم.",
    "Ellers kan den, der bruger kørestolen, ikke komme ind i bilen eller ud af den.",
    "Otherwise the person who uses the wheelchair cannot get into or out of the van.",
    "وگرنه کسی که از ویلچر استفاده می‌کند نمی‌تواند سوار یا پیاده شود."),
  S(False, "Jeg må holde tæt bag den, fordi den ikke holder på en handicapplads.",
    "I may stand close behind it because it is not parked in a disabled bay.", "می‌توانم نزدیک پشتش بایستم، چون در جای پارک معلولان نیست.",
    "Forbuddet mod at hindre adgangen til et andet køretøj gælder overalt.", "The ban on blocking access to another vehicle applies everywhere.",
    "ممنوعیتِ بستن دسترسی به وسیله‌ی دیگر همه‌جا برقرار است."),
  S(False, "Det er føreren af kassevognen, der må vente, til jeg kører igen.",
    "It is the van driver who will have to wait until I drive off again.", "این راننده‌ی ون است که باید صبر کند تا من بروم.",
    "Du skal parkere, så andre kan komme til deres køretøj, når de har brug for det.",
    "You must park so that others can get to their vehicle when they need to.",
    "باید طوری پارک کنید که دیگران هر وقت لازم داشتند به وسیله‌ی خود دسترسی داشته باشند."),
)

Q(5831, "7.9", view("""
THE SCENE: a straight two-lane country road with a broken centre line and a good view far ahead; in front of us a slow tractor with a
trailer; only a few metres in front of the tractor a cyclist rides at the right edge, so there is no room for a car between them; no
oncoming traffic.
MUST BE CLEARLY VISIBLE: the tractor, the cyclist just in front of it, the free road ahead.
MUST NOT APPEAR: signs, text."""),
  "Du vil overhale en traktor. Lige foran traktoren kører en cyklist, og der er ikke plads til din bil mellem dem. Der kommer ingen imod "
  "dig. Hvad gælder?",
  "You want to overtake a tractor. Just in front of the tractor a cyclist is riding, and there is no room for your car between them. "
  "Nobody is coming towards you. What applies?",
  "می‌خواهید از تراکتوری سبقت بگیرید. درست جلوی تراکتور دوچرخه‌سواری می‌رود و بین آن‌ها جایی برای خودروی شما نیست. کسی از روبه‌رو "
  "نمی‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal kunne komme forbi både traktoren og cyklisten, før jeg kører ind igen.",
    "I must be able to get past both the tractor and the cyclist before I pull back in.",
    "باید بتوانم پیش از برگشتن به خط، هم از تراکتور و هم از دوچرخه‌سوار رد شوم.",
    "Efter overhalingen skal du kunne køre ind i trafikstrømmen igen uden at være til ulempe.",
    "After overtaking you must be able to rejoin the flow of traffic without causing inconvenience.",
    "بعد از سبقت باید بتوانید بی‌آن‌که مزاحمتی ایجاد کنید به جریان ترافیک برگردید."),
  S(True, "Vejen skal være fri for modkørende på hele den strækning, det tager at komme forbi dem begge.",
    "The road must be clear of oncoming traffic for the whole stretch it takes to get past them both.",
    "جاده باید در تمام مسافتی که برای رد شدن از هر دو لازم است، از ترافیک روبه‌رو خالی باشد.",
    "Når du skal forbi to trafikanter, er du længere tid i den modsatte vognbane.",
    "When you have to get past two road users, you are in the opposite lane for longer.",
    "وقتی باید از دو نفر رد شوید، مدت بیشتری در خط مقابل هستید."),
  S(False, "Jeg kan overhale traktoren og så presse mig ind foran den, bag cyklisten.",
    "I can overtake the tractor and then squeeze in in front of it, behind the cyclist.",
    "می‌توانم از تراکتور سبقت بگیرم و بعد خودم را جلوی آن، پشت دوچرخه‌سوار، جا کنم.",
    "Der er ikke plads mellem dem, så du ville tvinge en af dem til at bremse eller komme i klemme.",
    "There is no room between them, so you would force one of them to brake or get squeezed.",
    "بین آن‌ها جایی نیست و یکی از آن‌ها را مجبور به ترمز می‌کنید یا در تنگنا می‌گذارید."),
  S(False, "Cyklisten skal holde ind til siden og standse, så jeg kan komme forbi.",
    "The cyclist must pull in to the side and stop so that I can get past.", "دوچرخه‌سوار باید کنار بکشد و بایستد تا من رد شوم.",
    "Cyklisten kører, hvor han må, og du skal selv sikre dig, at overhalingen kan ske uden fare.",
    "The cyclist is riding where he is allowed to, and you must make sure yourself that the overtaking can be done without danger.",
    "دوچرخه‌سوار جایی می‌راند که مجاز است و خودتان باید مطمئن شوید که سبقت بی‌خطر است."),
)

Q(5832, "7.9", view("""
THE SCENE: a two-lane road on the edge of town with a broken centre line; on the right, separated from the road by a grass strip,
runs a cycle path with a cyclist on it; in front of us, on the carriageway, a large moped (a scooter with a yellow number plate
holder, the plate itself unreadable) rides at about 45 km/h near the right edge; no oncoming traffic.
MUST BE CLEARLY VISIBLE: the large moped on the carriageway, the separate cycle path beside the road.
MUST NOT APPEAR: signs, text, readable plate numbers."""),
  "Foran dig kører en stor knallert ca. 45 km/t ude på kørebanen, selv om der er en cykelsti langs vejen. Du vil overhale. Hvad gælder?",
  "In front of you a large moped is riding at about 45 km/h on the carriageway, even though there is a cycle path along the road. You "
  "want to overtake. What applies?",
  "جلوی شما یک موتورگازیِ بزرگ با حدود ۴۵ کیلومتر در ساعت در سواره‌رو می‌رود، با این‌که کنار جاده مسیر دوچرخه هست. می‌خواهید سبقت "
  "بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Den store knallert kører rigtigt, fordi den ikke må køre på cykelstien.",
    "The large moped is in the right place because it must not use the cycle path.",
    "موتورگازیِ بزرگ درست می‌راند، چون اجازه ندارد در مسیر دوچرخه برود.",
    "Cykelstien er kun for cyklister og lille knallert, så stor knallert skal køre på kørebanen.",
    "The cycle path is only for cyclists and small mopeds, so a large moped must use the carriageway.",
    "مسیر دوچرخه فقط برای دوچرخه‌سواران و موتورگازی‌های کوچک است، پس موتورگازیِ بزرگ باید در سواره‌رو براند."),
  S(True, "Jeg overhaler først, når det kan ske uden fare, og holder god afstand til siden.",
    "I only overtake when it can be done without danger, and I keep a good distance to the side.",
    "فقط وقتی سبقت می‌گیرم که بی‌خطر باشد و فاصله‌ی جانبی کافی نگه می‌دارم.",
    "En knallert kan slingre, fx på grund af huller i vejen eller luftsuget fra din bil.",
    "A moped may wobble, for example because of holes in the road or the draught from your car.",
    "موتورگازی ممکن است تلوتلو بخورد، مثلاً به خاطر چاله‌های جاده یا موج هوای خودروی شما."),
  S(False, "Jeg dytter, så knallertkøreren kører op på cykelstien.", "I sound the horn so that the moped rider moves onto the cycle path.",
    "بوق می‌زنم تا موتورسوار به مسیر دوچرخه برود.",
    "Stor knallert må ikke køre på cykelstien, og hornet må kun bruges for at forebygge eller afværge fare.",
    "A large moped must not use the cycle path, and the horn may only be used to prevent or avert danger.",
    "موتورگازیِ بزرگ نباید در مسیر دوچرخه برود و بوق فقط برای پیشگیری یا دفع خطر مجاز است."),
  S(False, "Jeg kan overhale tæt forbi, fordi knallerten kører helt inde ved kanten.",
    "I can overtake close by because the moped is riding right at the edge.", "می‌توانم از نزدیکش سبقت بگیرم، چون موتورگازی کاملاً کنار لبه می‌رود.",
    "Du skal altid holde tilstrækkelig afstand til siden, når du overhaler en tohjulet trafikant.",
    "You must always keep enough distance to the side when you overtake a two-wheeled road user.",
    "هنگام سبقت از وسیله‌ی دوچرخ همیشه باید فاصله‌ی جانبی کافی نگه دارید."),
)

Q(5833, "7.9", view("""
THE SCENE: a two-lane country road with a broken centre line; ahead of us a car slowly tows another car with a short tow rope between
them; the road is clear for a long stretch.
MUST BE CLEARLY VISIBLE: the two cars and the short tow rope between them.
MUST NOT APPEAR: signs, text."""),
  "Foran dig slæber en bil en anden bil i et kort tov. De kører langsomt. Du vil overhale. Hvad gælder?",
  "In front of you a car is towing another car on a short rope. They are driving slowly. You want to overtake. What applies?",
  "جلوی شما خودرویی، خودروی دیگری را با طنابی کوتاه بکسل می‌کند. آهسته می‌روند. می‌خواهید سبقت بگیرید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg overhaler kun, hvis jeg kan komme forbi begge biler i én overhaling.",
    "I only overtake if I can get past both cars in one overtaking.", "فقط وقتی سبقت می‌گیرم که بتوانم در یک سبقت از هر دو خودرو رد شوم.",
    "Bilerne er forbundet med tovet, så du kan aldrig køre ind imellem dem.", "The cars are joined by the rope, so you can never pull in between them.",
    "این دو خودرو با طناب به هم وصل‌اند و هرگز نمی‌توانید بینشان بروید."),
  S(True, "Vejen skal være fri på en længere strækning end ved en enkelt bil.", "The road must be clear for a longer stretch than for a single car.",
    "جاده باید در مسافتی طولانی‌تر از سبقت از یک خودرو خالی باشد.",
    "De to biler og tovet er tilsammen langt, så overhalingen tager længere tid.",
    "The two cars and the rope are long together, so the overtaking takes longer.", "دو خودرو و طناب روی هم طولانی‌اند و سبقت بیشتر طول می‌کشد."),
  S(True, "Jeg holder god afstand, fordi de kan bremse pludseligt.", "I keep a good distance because they may brake suddenly.",
    "فاصله‌ی کافی نگه می‌دارم، چون ممکن است ناگهان ترمز کنند.",
    "Den slæbte bil kan være svær at bremse og styre, og vogntoget kan standse mere uventet end en almindelig bil.",
    "The towed car may be hard to brake and steer, and the pair may stop more unexpectedly than an ordinary car.",
    "ترمز و فرمان خودروی بکسل‌شده ممکن است سخت باشد و این دو ممکن است غیرمنتظره‌تر از یک خودروی معمولی بایستند."),
  S(False, "Jeg kan overhale den bageste bil og vente i mellemrummet, til der er plads til at komme helt forbi.",
    "I can overtake the rear car and wait in the gap until there is room to get all the way past.",
    "می‌توانم از خودروی عقبی سبقت بگیرم و در فاصله‌ی بین دو خودرو منتظر بمانم تا جا برای رد شدن کامل باز شود.",
    "I mellemrummet er tovet, og der må du aldrig køre ind.", "The rope is in the gap, and you must never pull in there.",
    "طناب در همان فاصله است و هرگز نباید وارد آن شوید."),
)

Q(5834, "7.9", view("""
THE SCENE: a two-lane country road going down a long, gentle hill with a broken centre line; in front of us a road cyclist in tight
training clothes on a racing bicycle rides fast, bent low over the handlebars; an oncoming car is visible far away at the bottom of the
hill.
MUST BE CLEARLY VISIBLE: the fast road cyclist, the downhill road, the oncoming car far away.
MUST NOT APPEAR: signs, text."""),
  "Foran dig kører en cykelrytter på racercykel. Han kører ca. 35 km/t ned ad en lang bakke. Du vil overhale ham. Hvad gælder?",
  "In front of you a cyclist is riding a racing bicycle. He is doing about 35 km/h down a long hill. You want to overtake him. What "
  "applies?",
  "جلوی شما دوچرخه‌سواری با دوچرخه‌ی کورسی می‌رود. در سراشیبیِ بلندی حدود ۳۵ کیلومتر در ساعت سرعت دارد. می‌خواهید از او سبقت بگیرید. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Overhalingen tager længere tid, end jeg måske tror, fordi cyklisten kører hurtigt.",
    "The overtaking takes longer than I might think, because the cyclist is fast.",
    "سبقت بیشتر از آنچه شاید فکر کنم طول می‌کشد، چون دوچرخه‌سوار تند می‌رود.",
    "Jo mindre forskel der er på jeres hastigheder, jo længere tid og vej bruger du i den modsatte vognbane.",
    "The smaller the difference between your speeds, the more time and distance you spend in the opposite lane.",
    "هر چه اختلاف سرعتتان کمتر باشد، زمان و مسافت بیشتری در خط مقابل می‌مانید."),
  S(False, "Cyklister kører altid langsomt, så jeg kommer hurtigt forbi.", "Cyclists are always slow, so I will get past quickly.",
    "دوچرخه‌سواران همیشه آهسته می‌روند، پس زود رد می‌شوم.",
    "En cyklist kan køre meget hurtigt, især ned ad bakke.", "A cyclist can be very fast, especially downhill.",
    "دوچرخه‌سوار، به‌خصوص در سراشیبی، می‌تواند خیلی تند برود."),
  S(False, "Jeg kan holde mindre afstand til siden, fordi cyklisten kører lige så stærkt som en knallert.",
    "I can keep less distance to the side because the cyclist is as fast as a moped.",
    "می‌توانم فاصله‌ی جانبی کمتری بگیرم، چون دوچرخه‌سوار به تندیِ یک موتورگازی می‌رود.",
    "Ved høj fart har cyklisten brug for mere plads, ikke mindre, og et luftsug kan få ham til at slingre.",
    "At high speed the cyclist needs more room, not less, and the draught from your car can make him wobble.",
    "در سرعت بالا دوچرخه‌سوار به جای بیشتری نیاز دارد، نه کمتر، و موجِ هوای خودرو ممکن است تعادلش را به هم بزند."),
)

Q(5835, "6.1", view("""
THE SCENE: a two-lane country road approaching a bend; at the right verge stands a small portable stand with a lamp on top flashing
bright BLUE light; no emergency vehicles are in sight; behind the trees beyond the bend some grey smoke rises.
MUST BE CLEARLY VISIBLE: the blue flashing lamp on its stand, the bend ahead, the smoke beyond.
MUST NOT APPEAR: emergency vehicles, signs, text."""),
  "I vejkanten står en lampe, der blinker med blåt lys. Der er ingen udrykningskøretøjer at se. Hvad betyder det?",
  "At the roadside there is a lamp flashing blue light. No emergency vehicles can be seen. What does it mean?",
  "کنار جاده چراغی با نور آبیِ چشمک‌زن قرار دارد. هیچ خودروی امدادی دیده نمی‌شود. معنایش چیست؟",
  S(True, "Jeg skal være særligt forsigtig, fordi der er sket en ulykke, eller der er brand længere fremme.",
    "I must take special care because there has been an accident or there is a fire further ahead.",
    "باید احتیاط ویژه کنم، چون جلوتر تصادف یا آتش‌سوزی رخ داده است.",
    "Et blåt blinksignal i vejkanten betyder, at trafikanterne skal være særligt forsigtige på grund af ulykke eller brand.",
    "A blue flashing signal at the roadside means that road users must take special care because of an accident or fire.",
    "چراغ چشمک‌زن آبی کنار جاده یعنی کاربران جاده باید به خاطر تصادف یا آتش‌سوزی احتیاط ویژه کنند."),
  S(True, "Jeg sænker farten og er parat til at møde mennesker og køretøjer på vejen.",
    "I reduce speed and am prepared to meet people and vehicles on the road.", "سرعتم را کم می‌کنم و آماده‌ام با آدم‌ها و وسیله‌هایی روی جاده روبه‌رو شوم.",
    "Ved et uheldssted kan der være redningsfolk, tilskadekomne og køretøjer på kørebanen.",
    "At an accident scene there may be rescue workers, injured people and vehicles on the carriageway.",
    "در محل تصادف ممکن است امدادگران، مصدومان و وسیله‌هایی روی سواره‌رو باشند."),
  S(False, "Lyset er kun til udrykningskøretøjerne.", "The light is only meant for the emergency vehicles.", "این چراغ فقط برای خودروهای امدادی است.",
    "Signalet henvender sig til alle trafikanter.", "The signal is meant for all road users.", "این علامت برای همه‌ی کاربران جاده است."),
  S(False, "Jeg skal standse ved lampen og vente, til lyset slukker.", "I must stop at the lamp and wait until the light goes out.",
    "باید کنار چراغ بایستم و منتظر بمانم تا خاموش شود.",
    "Det blå blinksignal kræver særlig forsigtighed; det er det røde blinksignal, der betyder stop.",
    "The blue flashing signal calls for special care; it is the red flashing signal that means stop.",
    "چراغ چشمک‌زن آبی احتیاط ویژه می‌خواهد؛ این چراغ چشمک‌زن قرمز است که یعنی ایست."),
)

Q(5836, "6.1", town("""
THE SCENE: a town street with a zebra crossing a little ahead; beside the crossing on the right stands a blue square sign with a white
triangle, inside which a black walking figure crosses black-and-white stripes (the Danish pedestrian-crossing information sign); a
woman stands at the kerb next to the crossing.
MUST BE CLEARLY VISIBLE: the blue square sign beside the crossing, the zebra stripes, the woman at the kerb.
MUST NOT APPEAR: traffic lights, other signs, text."""),
  "Ved et fodgængerfelt står denne blå tavle. Hvad gælder?",
  "This blue sign stands at a pedestrian crossing. What applies?",
  "کنار یک گذرگاه عابر پیاده این تابلوی آبی قرار دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Tavlen viser, hvor fodgængerfeltet er.", "The sign shows where the pedestrian crossing is.", "این تابلو نشان می‌دهد گذرگاه عابر کجاست.",
    "Den blå tavle står ved selve fodgængerfeltet og oplyser om det.", "The blue sign stands at the crossing itself and gives information about it.",
    "این تابلوی آبی کنار خودِ گذرگاه قرار دارد و آن را نشان می‌دهد."),
  S(True, "Jeg skal holde tilbage for gående, der er i feltet eller på vej ud i det.",
    "I must give way to pedestrians who are on the crossing or about to step onto it.",
    "باید به عابرانی که در گذرگاه هستند یا در حال وارد شدن به آن‌اند راه بدهم.",
    "Ved et fodgængerfelt uden lyssignal skal du afpasse farten og om nødvendigt standse for de gående.",
    "At a crossing without traffic lights you must adjust your speed and stop if necessary for the pedestrians.",
    "در گذرگاه بدون چراغ باید سرعت را تنظیم کنید و در صورت لزوم برای عابران بایستید."),
  S(False, "Tavlen betyder, at de gående skal vente, til bilerne er kørt forbi.",
    "The sign means that pedestrians must wait until the cars have gone past.", "این تابلو یعنی عابران باید صبر کنند تا خودروها رد شوند.",
    "Det er de kørende, der skal lade de gående passere.", "It is the drivers who must let the pedestrians cross.",
    "این رانندگان‌اند که باید بگذارند عابران رد شوند."),
  S(False, "Tavlen varsler, at der først kommer et fodgængerfelt et stykke længere fremme.",
    "The sign warns that a pedestrian crossing only comes some way further ahead.", "این تابلو هشدار می‌دهد که گذرگاه عابر کمی جلوتر است.",
    "Det er den røde advarselstrekant, der varsler et fodgængerfelt; den blå tavle står ved selve feltet.",
    "It is the red warning triangle that warns of a crossing ahead; the blue sign stands at the crossing itself.",
    "این مثلث هشدار با حاشیه‌ی قرمز است که از گذرگاهِ جلوتر خبر می‌دهد؛ تابلوی آبی کنار خودِ گذرگاه است."),
)

Q(5837, "6.1", view("""
THE SCENE: a road in a small town approaching a side road to the RIGHT; just before the side road, at the right edge of our road,
stands a round white sign with a red border showing a black car above a black motorcycle, and under it a white rectangular plate
with a black arrow pointing to the RIGHT, towards the side road; our road continues straight on.
MUST BE CLEARLY VISIBLE: the round sign with the arrow plate under it, the side road to the right, our road continuing straight.
MUST NOT APPEAR: other signs, text."""),
  "Lige før en sidevej til højre står denne tavle med en undertavle med en pil mod højre. Du kører bil. Hvad gælder?",
  "Just before a side road to the right stands this sign with a plate showing an arrow pointing right. You are driving a car. What applies?",
  "درست پیش از یک فرعی به راست، این تابلو با زیرتابلویی که فلشی رو به راست دارد قرار گرفته است. با خودرو می‌رانید. چه قاعده‌ای برقرار است؟",
  S(True, "Forbuddet gælder sidevejen til højre.", "The ban applies to the side road on the right.", "این ممنوعیت برای فرعیِ سمت راست است.",
    "En undertavle med pil kan vise, at tavlen gælder for en tilstødende vej.", "A plate with an arrow can show that the sign applies to an adjoining road.",
    "زیرتابلوی فلش‌دار می‌تواند نشان دهد که تابلو برای جاده‌ای است که به این جاده می‌رسد."),
  S(True, "Jeg må fortsætte ligeud ad min vej.", "I may continue straight on along my road.", "می‌توانم مستقیم در جاده‌ی خودم ادامه دهم.",
    "Forbuddet gælder ikke den vej, du kører på.", "The ban does not apply to the road you are on.", "این ممنوعیت برای جاده‌ای که در آن هستید نیست."),
  S(False, "Jeg må ikke køre videre ad min vej efter tavlen.", "I must not continue along my road after the sign.",
    "بعد از تابلو نباید در جاده‌ی خودم ادامه دهم.",
    "Pilen viser, at forbuddet gælder sidevejen, ikke din vej.", "The arrow shows that the ban applies to the side road, not your road.",
    "فلش نشان می‌دهد که ممنوعیت برای فرعی است، نه جاده‌ی شما."),
  S(False, "Pilen betyder, at jeg skal svinge til højre.", "The arrow means that I must turn right.", "فلش یعنی باید به راست بپیچم.",
    "En påbudt kørselsretning vises med en rund, blå tavle med en hvid pil.", "A required direction is shown by a round blue sign with a white arrow.",
    "جهت اجباری با تابلوی گرد آبی با فلش سفید نشان داده می‌شود."),
)

Q(5838, "6.1", view("""
THE SCENE: the start of a motorway with two lanes in our direction, a central reservation with a crash barrier and a hard shoulder on
the right; at the right verge stands a green square sign with a white motorway symbol (a road with two carriageways passing under a
bridge).
MUST BE CLEARLY VISIBLE: the green motorway sign, the motorway layout.
MUST NOT APPEAR: other signs, text."""),
  "Du kører ind på vejen forbi denne grønne tavle. Hvad gælder for din kørsel herefter?",
  "You drive onto the road past this green sign. What applies to your driving from here on?",
  "از کنار این تابلوی سبز وارد جاده می‌شوید. از این‌جا به بعد برای رانندگی شما چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må hverken vende eller bakke.", "I may neither turn round nor reverse.", "نه می‌توانم دور بزنم و نه دنده‌عقب بروم.",
    "På motorvej og dens til- og frakørsler er vending og bakning forbudt.", "On a motorway and its access and exit roads turning round and reversing are forbidden.",
    "در آزادراه و ورودی و خروجی‌های آن دور زدن و دنده‌عقب رفتن ممنوع است."),
  S(True, "Jeg må kun standse på de anviste parkerings- og rastepladser, medmindre jeg bliver tvunget til det.",
    "I may only stop at the designated parking and rest areas, unless I am forced to.",
    "فقط در پارکینگ‌ها و استراحتگاه‌های تعیین‌شده می‌توانم بایستم، مگر این‌که مجبور شوم.",
    "Bliver du tvunget til at standse, skal bilen så vidt muligt holde uden for kørebanen og fjernes hurtigst muligt.",
    "If you are forced to stop, the car must stand off the carriageway as far as possible and be removed as soon as possible.",
    "اگر مجبور به توقف شوید، خودرو باید تا جای ممکن بیرون از سواره‌رو بایستد و هر چه زودتر برداشته شود."),
  S(True, "Jeg må ikke køre over midterrabatten eller gennem åbninger i den.", "I must not drive across the central reservation or through gaps in it.",
    "نباید از روی جداکننده‌ی وسط یا از میان بازشوهای آن رد شوم.",
    "Kørsel over midterrabatten er forbudt på motorvej.", "Driving across the central reservation is forbidden on a motorway.",
    "رد شدن از جداکننده‌ی وسط در آزادراه ممنوع است."),
  S(True, "Jeg må kun forlade vejen ad en frakørsel eller der, hvor motorvejen slutter.",
    "I may only leave the road by an exit or where the motorway ends.", "فقط از راه خروجی یا جایی که آزادراه تمام می‌شود می‌توانم از آن خارج شوم.",
    "Bortkørsel fra motorvej må kun ske ved dens endepunkt eller ad en særlig frakørselsvej.",
    "Leaving a motorway is only allowed at its end or by a special exit road.", "خروج از آزادراه فقط در انتهای آن یا از راه خروجیِ ویژه مجاز است."),
)

Q(5839, "7.6", view("""
THE SCENE: a country road between fields with wooden fences; ahead of us a horse without a rider and without anyone leading it walks
loose along the right side of the road; further back a field gate stands open.
MUST BE CLEARLY VISIBLE: the loose horse on the road, the open gate.
MUST NOT APPEAR: people, signs, text."""),
  "En hest uden rytter går løs på vejen foran dig. Hvordan forholder du dig?",
  "A horse without a rider is walking loose on the road in front of you. What do you do?",
  "اسبی بدون سوار، رها روی جاده‌ی جلوی شما راه می‌رود. چه می‌کنید؟",
  S(True, "Jeg sænker farten og kører meget forsigtigt.", "I reduce speed and drive very carefully.", "سرعتم را کم می‌کنم و بسیار با احتیاط می‌رانم.",
    "Når du nærmer dig heste på vejen, skal farten være passende lav, og en løs hest kan pludselig skifte retning.",
    "When you approach horses on the road your speed must be suitably low, and a loose horse may suddenly change direction.",
    "وقتی به اسب روی جاده نزدیک می‌شوید، سرعت باید به اندازه‌ی کافی کم باشد و اسب رها ممکن است ناگهان تغییر جهت دهد."),
  S(True, "Jeg dytter ikke og kører ikke tæt forbi hesten.", "I do not sound the horn and do not drive close past the horse.",
    "بوق نمی‌زنم و از نزدیکِ اسب رد نمی‌شوم.",
    "Støj og en bil tæt på kan skræmme hesten, så den springer ud foran dig.", "Noise and a car close by can frighten the horse so that it jumps out in front of you.",
    "سروصدا و خودرویی در نزدیکی ممکن است اسب را بترساند و جلوی شما بپرد."),
  S(True, "Er hesten til fare for trafikken, kontakter jeg politiet, når jeg har holdt ind et sikkert sted.",
    "If the horse is a danger to traffic, I contact the police once I have pulled in at a safe spot.",
    "اگر اسب برای ترافیک خطرساز باشد، بعد از این‌که جایی امن کنار کشیدم با پلیس تماس می‌گیرم.",
    "Politiet kan advare andre trafikanter og få fat i ejeren.", "The police can warn other road users and get hold of the owner.",
    "پلیس می‌تواند به دیگران هشدار دهد و صاحب اسب را پیدا کند."),
  S(False, "Jeg kører hurtigt forbi, så hesten ikke når at reagere.", "I drive past quickly so that the horse has no time to react.",
    "سریع رد می‌شوم تا اسب فرصت واکنش نداشته باشد.",
    "Høj fart tæt på en hest øger risikoen for, at den bliver bange og springer ud foran dig.",
    "High speed close to a horse increases the risk that it panics and jumps out in front of you.",
    "سرعت بالا در نزدیکی اسب خطرِ ترسیدن و پریدنش جلوی شما را بیشتر می‌کند."),
)

Q(5840, "7.6", town("""
THE SCENE: a residential street in winter; along the kerb on the right lie high banks of cleared snow; children play on top of the
snow banks, and one child sits on a small sledge sliding down a bank towards the road; the road itself is covered in packed snow.
MUST BE CLEARLY VISIBLE: the high snow banks, the children on top, the child on the sledge sliding towards the road.
MUST NOT APPEAR: signs, text.""", cond="winter, snow-covered road, cold and clear"),
  "Langs gaden ligger der høje snebunker. Børn leger oppe på dem, og et barn kælker ned mod vejen. Hvordan forholder du dig?",
  "High banks of snow lie along the street. Children are playing on top of them, and one child is sledging down towards the road. What "
  "do you do?",
  "در امتداد خیابان کپه‌های بلند برف هست. کودکان روی آن‌ها بازی می‌کنند و یکی از آن‌ها با سورتمه به سمت خیابان سُر می‌خورد. چه می‌کنید؟",
  S(True, "Jeg kører langsomt og holder mig klar til at bremse.", "I drive slowly and keep ready to brake.", "آهسته می‌رانم و آماده‌ی ترمز هستم.",
    "Et barn på en kælk kan ikke styre eller standse og kan glide helt ud på vejen.",
    "A child on a sledge cannot steer or stop and may slide right out onto the road.",
    "کودکِ روی سورتمه نمی‌تواند فرمان بدهد یا بایستد و ممکن است تا وسط خیابان سُر بخورد."),
  S(True, "Jeg er opmærksom på, at snebunkerne kan skjule andre børn.", "I am aware that the snow banks may hide other children.",
    "حواسم هست که کپه‌های برف ممکن است کودکان دیگری را پنهان کرده باشند.",
    "Børn bag snebunkerne kan pludselig komme frem.", "Children behind the snow banks may suddenly appear.",
    "کودکانِ پشت کپه‌های برف ممکن است ناگهان بیرون بیایند."),
  S(True, "Jeg regner med, at bremselængden er længere på den sneklædte vej.", "I count on the braking distance being longer on the snowy road.",
    "در نظر دارم که مسافت ترمز روی جاده‌ی برفی بیشتر است.",
    "På sne og is kan det tage meget længere tid at standse.", "On snow and ice it can take much longer to stop.",
    "روی برف و یخ ایستادن ممکن است خیلی بیشتر طول بکشد."),
  S(False, "Børnene er oppe på snebunkerne og ikke på vejen, så jeg holder farten.",
    "The children are up on the snow banks and not on the road, so I keep my speed.",
    "کودکان بالای کپه‌های برف‌اند، نه در خیابان، پس سرعتم را حفظ می‌کنم.",
    "Når du nærmer dig børn ved vejen, skal farten være passende lav, for de kan komme ud på vejen på et øjeblik.",
    "When you approach children by the road your speed must be suitably low, because they can be on the road in an instant.",
    "وقتی به کودکانِ کنار جاده نزدیک می‌شوید، سرعت باید کم باشد، چون ممکن است در یک لحظه وارد خیابان شوند."),
)

Q(5841, "7.6", town("""
THE SCENE: a road through an industrial area between two large warehouses; from the RIGHT, out of a warehouse gate, a forklift truck
carrying a tall stack of boxes on a pallet is starting to cross the road in front of us; the stack partly blocks the forklift
driver's view to the front.
MUST BE CLEARLY VISIBLE: the forklift truck with its tall load crossing from the right, the warehouse gate.
MUST NOT APPEAR: signs, text, logos."""),
  "I et industriområde kører en gaffeltruck med en høj stak kasser ud fra en port og over vejen foran dig. Hvordan forholder du dig?",
  "In an industrial area a forklift truck carrying a tall stack of boxes drives out of a gate and across the road in front of you. What do "
  "you do?",
  "در یک منطقه‌ی صنعتی، لیفتراکی با باری بلند از جعبه‌ها از دری بیرون می‌آید و از عرض جاده‌ی جلوی شما رد می‌شود. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og er parat til at standse, selv om trucken skal holde tilbage for mig.",
    "I slow down and am prepared to stop, even though the truck has to give way to me.",
    "سرعتم را کم می‌کنم و آماده‌ی ایستادنم، با این‌که لیفتراک باید به من راه بدهد.",
    "Trucken kommer ud fra en grund og har vigepligt, men du skal gøre, hvad du kan, for at undgå et sammenstød, og føreren kan have "
    "svært ved at se forbi lasten.",
    "The truck is coming out of a property and must give way, but you must do what you can to avoid a collision, and the driver may "
    "find it hard to see past the load.",
    "لیفتراک از یک محوطه بیرون می‌آید و باید راه بدهد، ولی شما باید هر کاری می‌توانید برای جلوگیری از برخورد بکنید و راننده ممکن "
    "است به خاطر بار جلو را خوب نبیند."),
  S(False, "Jeg dytter og fortsætter, fordi trucken har vigepligt.", "I sound the horn and carry on because the truck has to give way.",
    "بوق می‌زنم و ادامه می‌دهم، چون لیفتراک باید راه بدهد.",
    "Selv om den anden har vigepligt, må du ikke køre, så der sker et uheld.", "Even if the other has to give way, you must not drive so that an accident happens.",
    "حتی اگر طرف مقابل باید راه بدهد، نباید طوری برانید که تصادف شود."),
  S(False, "Jeg kører tæt bag om trucken, så snart den er midt på vejen.", "I drive close round the back of the truck as soon as it is in the middle of the road.",
    "به‌محض این‌که لیفتراک وسط جاده رسید، از نزدیکِ پشتش رد می‌شوم.",
    "Trucken kan pludselig standse eller bakke, og lasten kan rage ud.", "The truck may suddenly stop or reverse, and the load may stick out.",
    "لیفتراک ممکن است ناگهان بایستد یا دنده‌عقب برود و بار ممکن است بیرون زده باشد."),
  S(False, "En gaffeltruck må aldrig køre på vejen, så det er førerens eget ansvar, hvis der sker noget.",
    "A forklift truck may never drive on the road, so it is the driver's own responsibility if something happens.",
    "لیفتراک هرگز نباید در جاده براند، پس اگر اتفاقی بیفتد مسئولیتش با راننده‌ی خودش است.",
    "Uanset hvem der har ansvaret, skal du gøre, hvad du kan, for at undgå et uheld.",
    "Whoever is responsible, you must do what you can to avoid an accident.", "مسئولیت با هر کسی باشد، باید هر کاری می‌توانید برای جلوگیری از تصادف بکنید."),
)

Q(5842, "7.6", view("""
THE SCENE: a road on the outskirts of a town at night without street lights; in the light of our dipped headlights a man walks
unsteadily along the right edge of the road with his back to us, swaying partly out into our lane.
MUST BE CLEARLY VISIBLE: the swaying man in the headlights, the dark road.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="night, dark, dry road, no street lights"),
  "Det er nat. En mand går og slingrer i højre side af vejen med ryggen til dig. Han ser ud til at være beruset. Hvordan forholder du dig?",
  "It is night. A man is swaying as he walks along the right side of the road with his back to you. He seems to be drunk. What do you do?",
  "شب است. مردی پشت به شما در سمت راست جاده تلوتلوخوران راه می‌رود. به نظر مست است. چه می‌کنید؟",
  S(True, "Jeg sænker farten og giver ham god plads, når jeg kører forbi.", "I reduce speed and give him plenty of room as I drive past.",
    "سرعتم را کم می‌کنم و هنگام رد شدن جای زیادی برایش می‌گذارم.",
    "En beruset person kan pludselig vakle ud foran dig.", "A drunk person may suddenly stagger out in front of you.",
    "آدمِ مست ممکن است ناگهان تلوتلوخوران جلوی شما بیاید."),
  S(True, "Jeg er forberedt på, at han ikke har opdaget min bil.", "I am prepared for him not to have noticed my car.",
    "آماده‌ام که او متوجه خودروی من نشده باشد.",
    "Alkohol svækker opmærksomheden og evnen til at reagere.", "Alcohol weakens attention and the ability to react.",
    "الکل توجه و توان واکنش را کم می‌کند."),
  S(False, "Jeg dytter længe, så han går ind til siden.", "I sound the horn for a long time so that he moves to the side.",
    "مدتی طولانی بوق می‌زنم تا کنار برود.",
    "I mørke skal du bruge lyssignal i stedet for lydsignal, medmindre faren er overhængende, og et langt dyt kan forskrække ham.",
    "In the dark you must use a light signal instead of the horn unless the danger is imminent, and a long hoot may startle him.",
    "در تاریکی باید به‌جای بوق از علامت نوری استفاده کنید، مگر این‌که خطر خیلی نزدیک باشد، و بوقِ طولانی ممکن است او را بترساند."),
  S(False, "Han går på vejen på eget ansvar, så jeg holder farten.", "He is walking on the road at his own risk, so I keep my speed.",
    "او با مسئولیت خودش در جاده راه می‌رود، پس سرعتم را حفظ می‌کنم.",
    "Du skal gøre, hvad du kan, for at undgå at ramme ham, uanset hans tilstand.",
    "You must do what you can to avoid hitting him, whatever his condition.", "وضعش هر چه باشد، باید هر کاری می‌توانید بکنید تا به او نزنید."),
)

Q(5843, "7.3", town("""
THE SCENE: a straight town street with a round 50 speed-limit sign on the right; a little ahead at the roadside a police officer in a
high-visibility vest aims a hand-held laser speed gun at the traffic; a police car is parked behind him.
MUST BE CLEARLY VISIBLE: the 50 sign, the police officer with the speed gun.
MUST NOT APPEAR: other signs, text on the police car other than plain markings."""),
  "Du bliver målt til 70 km/t på en vej, hvor grænsen er 50 km/t. Hvad gælder?",
  "You are measured at 70 km/h on a road where the limit is 50 km/h. What applies?",
  "در جاده‌ای که حد سرعتش ۵۰ کیلومتر در ساعت است، سرعتتان ۷۰ اندازه‌گیری می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Overskridelsen er på mere end 30 pct., så jeg får et klip i kørekortet.",
    "The excess is more than 30 per cent, so I get a penalty point on my licence.",
    "سرعت بیش از ۳۰ درصد از حد مجاز بیشتر است، پس یک امتیاز منفی (کلیپ) در گواهینامه‌ام ثبت می‌شود.",
    "En hastighedsoverskridelse på mere end 30 pct. tæller som et klip.", "A speeding excess of more than 30 per cent counts as a penalty point.",
    "سرعت غیرمجازِ بیش از ۳۰ درصد یک کلیپ حساب می‌شود."),
  S(True, "Jeg skal også betale en bøde.", "I must also pay a fine.", "باید جریمه هم بپردازم.",
    "Hastighedsoverskridelser straffes med bøde.", "Speeding is punished with a fine.", "تخلف سرعت با جریمه‌ی نقدی مجازات می‌شود."),
  S(False, "Jeg bliver straks frakendt kørekortet betinget.", "I am immediately given a conditional disqualification.",
    "فوراً به‌طور مشروط از رانندگی محروم می‌شوم.",
    "For fart sker betinget frakendelse ved mere end 60 pct. over grænsen eller ved 160 km/t eller derover; ved vejarbejde dog allerede "
    "ved mere end 40 pct.",
    "For speeding, conditional disqualification happens at more than 60 per cent over the limit or at 160 km/h or more; at road works "
    "already at more than 40 per cent.",
    "محرومیت مشروط برای سرعت وقتی است که بیش از ۶۰ درصد از حد مجاز تندتر برانید یا ۱۶۰ کیلومتر در ساعت یا بیشتر؛ در محل کار جاده‌ای "
    "از بیش از ۴۰ درصد."),
  S(False, "Det har ingen betydning, når der ikke skete noget uheld.", "It does not matter when no accident happened.",
    "وقتی تصادفی نشده، اهمیتی ندارد.",
    "Hastighedsgrænsen gælder altid, og overskridelser straffes, også uden uheld.",
    "The speed limit always applies, and excesses are punished even without an accident.",
    "حد سرعت همیشه برقرار است و تخلف، حتی بدون تصادف، مجازات دارد."),
)

Q(5844, "7.3", picture("""
Inside a car seen from the middle of the back seat: a young driver holds the steering wheel; two young passengers, one in the front
seat and one on the back seat, laugh and point eagerly at the speedometer; through the windscreen a country road with a round 80
speed-limit sign at the right verge.
MUST BE CLEARLY VISIBLE: the driver, the passengers pointing at the speedometer, the 80 sign outside.
MUST NOT APPEAR: readable numbers on the speedometer, other text, logos."""),
  "Du kører med dine venner, og de opfordrer dig til at køre stærkere end tilladt. Hvordan forholder du dig?",
  "You are driving with your friends, and they urge you to drive faster than allowed. What do you do?",
  "با دوستانتان رانندگی می‌کنید و آن‌ها اصرار دارند تندتر از حد مجاز برانید. چه می‌کنید؟",
  S(True, "Jeg holder hastighedsgrænsen, selv om de presser mig.", "I keep to the speed limit even though they pressure me.",
    "حد سرعت را رعایت می‌کنم، حتی اگر به من فشار بیاورند.",
    "Det er dig, der har ansvaret for kørslen og for passagerernes sikkerhed.", "You are responsible for the driving and for the passengers' safety.",
    "مسئولیت رانندگی و امنیت مسافران با شماست."),
  S(True, "Jeg siger tydeligt, at jeg ikke vil køre for stærkt.", "I say clearly that I will not drive too fast.",
    "به‌روشنی می‌گویم که نمی‌خواهم تند برانم.",
    "Det er lettere at holde fast i sin beslutning, når man siger den klart med det samme.",
    "It is easier to stick to your decision when you say it clearly straight away.", "وقتی تصمیمتان را از همان اول روشن بگویید، پایبند ماندن به آن آسان‌تر است."),
  S(True, "Jeg lader mig ikke distrahere af larmen og uroen i bilen.", "I do not let myself be distracted by the noise and fuss in the car.",
    "نمی‌گذارم سروصدا و شلوغی داخل خودرو حواسم را پرت کند.",
    "Uro i bilen tager din opmærksomhed fra trafikken.", "Fuss in the car takes your attention away from the traffic.",
    "شلوغی داخل خودرو توجهتان را از ترافیک دور می‌کند."),
  S(False, "Jeg kører lidt hurtigere, så de bliver tilfredse.", "I drive a little faster so that they are happy.",
    "کمی تندتر می‌رانم تا راضی شوند.",
    "Hastighedsgrænsen gælder, uanset hvad passagererne siger, og risikoen er din.",
    "The speed limit applies whatever the passengers say, and the risk is yours.", "حد سرعت، هر چه مسافران بگویند، برقرار است و خطرش با شماست."),
)

Q(5845, "7.3", view("""
THE SCENE: a narrow country road approaching a railway level crossing without barriers and without light signals; right before the
crossing stands a red-and-white St Andrew's cross; tall bushes and trees on both sides hide the view along the tracks.
MUST BE CLEARLY VISIBLE: the level crossing, the St Andrew's cross, the bushes hiding the tracks.
MUST NOT APPEAR: trains, other signs, text."""),
  "Du nærmer dig en jernbaneoverkørsel uden bomme og lyssignaler. Buske skjuler udsynet langs sporet. Hvad gælder?",
  "You are approaching a level crossing without barriers or light signals. Bushes hide the view along the track. What applies?",
  "به گذرگاه راه‌آهنی بدون راهبند و چراغ نزدیک می‌شوید. بوته‌ها دید در امتداد ریل را گرفته‌اند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg tilpasser farten, så jeg kan standse før sporene, hvis der kommer et tog.",
    "I adjust my speed so that I can stop before the tracks if a train comes.", "سرعتم را طوری تنظیم می‌کنم که اگر قطاری آمد، بتوانم پیش از ریل‌ها بایستم.",
    "Kørende skal afpasse hastigheden, så de om nødvendigt kan standse før sporene.",
    "Drivers must adjust their speed so that they can stop before the tracks if necessary.",
    "رانندگان باید سرعت را طوری تنظیم کنند که در صورت لزوم بتوانند پیش از ریل‌ها بایستند."),
  S(True, "Jeg ser og lytter efter tog i begge retninger, før jeg kører over.", "I look and listen for trains in both directions before I cross.",
    "پیش از عبور، در هر دو جهت به دنبال قطار نگاه می‌کنم و گوش می‌دهم.",
    "Du må ikke køre over, når det kan ses eller høres, at et tog nærmer sig.", "You must not cross when a train can be seen or heard approaching.",
    "وقتی دیده یا شنیده می‌شود که قطاری نزدیک می‌شود، نباید عبور کنید."),
  S(False, "Uden bomme og lys kører der ikke længere tog på strækningen.", "Without barriers and lights, trains no longer run on the line.",
    "بدون راهبند و چراغ، دیگر قطاری در این مسیر نمی‌رود.",
    "Mange overkørsler er kun afmærket med tavler, og der kan stadig komme tog.",
    "Many crossings are only marked with signs, and trains may still come.", "بسیاری از گذرگاه‌ها فقط تابلو دارند و هنوز ممکن است قطار بیاید."),
)

Q(5846, "7.3", view("""
THE SCENE: a two-lane country road; a little ahead at the right verge stands a grey box-shaped speed camera on a pole; in the interior
rear-view mirror at the top of the picture a car follows close behind us.
MUST BE CLEARLY VISIBLE: the speed camera ahead, the car close behind in the mirror.
MUST NOT APPEAR: signs, text."""),
  "Du opdager pludselig en stander med automatisk hastighedskontrol lige foran dig. Du kører lidt over grænsen, og en bil kører tæt bag "
  "dig. Hvad gælder?",
  "You suddenly notice an automatic speed camera just ahead. You are driving slightly over the limit, and a car is close behind you. What "
  "applies?",
  "ناگهان درست جلوی خود دوربین کنترل خودکار سرعت را می‌بینید. کمی بیشتر از حد مجاز می‌رانید و خودرویی نزدیکِ پشت شماست. چه قاعده‌ای "
  "برقرار است؟",
  S(True, "Jeg må ikke bremse pludseligt uden rimelig grund, fordi bilen bag mig kan køre ind i mig.",
    "I must not brake suddenly without good reason, because the car behind may run into me.",
    "نباید بی‌دلیلِ موجه ناگهان ترمز کنم، چون خودروی پشت سر ممکن است به من بزند.",
    "Du må ikke hindre andres normale kørsel ved pludselig at bremse uden rimelig grund.",
    "You must not hinder other drivers' normal driving by braking suddenly without good reason.",
    "نباید با ترمز ناگهانیِ بی‌دلیل، رانندگی عادی دیگران را مختل کنید."),
  S(True, "Holder jeg altid hastighedsgrænsen, behøver jeg ikke bremse ved en fartkontrol.",
    "If I always keep to the speed limit, I do not need to brake at a speed check.",
    "اگر همیشه حد سرعت را رعایت کنم، لازم نیست کنار کنترل سرعت ترمز کنم.",
    "Grænsen gælder hele strækningen, ikke kun ved kontrollen.", "The limit applies along the whole stretch, not only at the check.",
    "حد سرعت در تمام مسیر برقرار است، نه فقط کنار دوربین."),
  S(False, "Bilen bag mig har altid ansvaret, hvis den kører ind i mig, så jeg kan bremse, som jeg vil.",
    "The car behind is always responsible if it runs into me, so I can brake as I like.",
    "اگر خودروی پشت سر به من بزند همیشه مقصر است، پس هر طور بخواهم ترمز می‌کنم.",
    "Den bagved skal holde afstand, men du må heller ikke bremse pludseligt uden grund.",
    "The driver behind must keep a distance, but you must not brake suddenly without reason either.",
    "راننده‌ی پشت سر باید فاصله نگه دارد، ولی شما هم نباید بی‌دلیل ناگهان ترمز کنید."),
  S(False, "Kontrollen måler kun lige ved standeren, så det er nok at være under grænsen der.",
    "The camera only measures right at the pole, so it is enough to be under the limit there.",
    "دوربین فقط درست کنار پایه اندازه می‌گیرد، پس کافی است همان‌جا زیر حد مجاز باشم.",
    "Hastighedsgrænsen gælder overalt på strækningen, og politiet kan også måle andre steder.",
    "The speed limit applies everywhere on the stretch, and the police can also measure elsewhere.",
    "حد سرعت در همه‌جای مسیر برقرار است و پلیس جاهای دیگر هم می‌تواند سرعت را بسنجد."),
)

Q(5847, "1.2", picture("""
A car towing a caravan on a country road, seen from behind and slightly to the left: the caravan is clearly wider than the car; on
both of the car's door mirrors long extension mirrors are clipped on, sticking out beyond the sides of the caravan.
MUST BE CLEARLY VISIBLE: the caravan wider than the car, the extension mirrors on both sides.
MUST NOT APPEAR: text, letters or numbers on the number plates, logos."""),
  "Du skal trække en campingvogn, der er bredere end bilen. Med bilens almindelige sidespejle kan du ikke se forbi campingvognen. Hvad "
  "gælder?",
  "You are going to tow a caravan that is wider than the car. With the car's ordinary door mirrors you cannot see past the caravan. What "
  "applies?",
  "قرار است کاروانی را بکسل کنید که از خودرو پهن‌تر است. با آینه‌های بغلِ معمولیِ خودرو نمی‌توانید پشت کاروان را ببینید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg monterer forlængerspejle, så jeg kan se bagud langs begge sider af vogntoget.",
    "I fit extension mirrors so that I can see backwards along both sides of the combination.",
    "آینه‌های بلندکننده نصب می‌کنم تا در امتداد هر دو طرف مجموعه به عقب دید داشته باشم.",
    "Du skal kunne se trafikken bag dig; ellers kan du ikke skifte vognbane eller svinge sikkert.",
    "You must be able to see the traffic behind you; otherwise you cannot change lanes or turn safely.",
    "باید ترافیک پشت سر را ببینید؛ وگرنه نمی‌توانید با اطمینان خط عوض کنید یا بپیچید."),
  S(False, "Det er nok at se i bakspejlet inde i bilen.", "It is enough to look in the interior mirror.", "نگاه کردن در آینه‌ی وسط کافی است.",
    "Gennem bakspejlet ser du kun campingvognens front, ikke trafikken bag den.",
    "Through the interior mirror you only see the front of the caravan, not the traffic behind it.",
    "در آینه‌ی وسط فقط جلوی کاروان را می‌بینید، نه ترافیک پشت آن را."),
  S(False, "Jeg kan bare rulle sideruden ned og se tilbage, når jeg skal skifte vognbane.",
    "I can just wind the side window down and look back when I need to change lanes.",
    "هر وقت خواستم خط عوض کنم، کافی است شیشه را پایین بکشم و به عقب نگاه کنم.",
    "Det giver ikke et sikkert overblik, og du skal kunne se bagud hele tiden.", "That does not give a safe view, and you must be able to see behind you all the time.",
    "این کار دید مطمئنی نمی‌دهد و باید همیشه پشت سر را ببینید."),
)

Q(5848, "5.1", view("""
THE SCENE: a long, straight road with one lane in each direction separated only by a centre line, a broad edge line on each side and
a paved shoulder; no junctions, no houses, no cyclists; fields on both sides; a few cars far ahead and an oncoming car far away.
MUST BE CLEARLY VISIBLE: the single lane in each direction, the centre line, the paved shoulder.
MUST NOT APPEAR: signs, text."""),
  "Du kører på en motortrafikvej med én vognbane i hver retning. Hvad gælder?",
  "You are driving on an expressway (motortrafikvej) with one lane in each direction. What applies?",
  "در یک «موتورترافیک‌وی» (جاده‌ی ویژه‌ی خودرو) با یک خط در هر جهت می‌رانید. چه قاعده‌ای برقرار است؟",
  S(True, "Cyklister, knallerter og traktorer må ikke køre på vejen.", "Cyclists, mopeds and tractors must not use the road.",
    "دوچرخه‌سواران، موتورگازی‌ها و تراکتورها حق رفت‌وآمد در این جاده را ندارند.",
    "Ligesom motorvej er motortrafikvej forbeholdt motorkøretøjer, der kan og må køre mindst 50 km/t.",
    "Like a motorway, an expressway is reserved for motor vehicles that can and may drive at least 50 km/h.",
    "این جاده هم مثل آزادراه فقط برای وسیله‌های موتوری است که بتوانند و اجازه داشته باشند دست‌کم ۵۰ کیلومتر در ساعت برانند."),
  S(False, "Uden hastighedstavler må jeg køre 110 km/t.", "Without speed signs I may drive at 110 km/h.",
    "بدون تابلوی سرعت می‌توانم ۱۱۰ کیلومتر در ساعت برانم.",
    "Den generelle grænse på motortrafikvej er 80 km/t.", "The general limit on an expressway is 80 km/h.",
    "حد سرعت عمومی در این نوع جاده ۸۰ کیلومتر در ساعت است."),
  S(False, "Jeg må vende i en udvidelse ved vejkanten.", "I may turn round in a widening at the roadside.",
    "می‌توانم در یک فضای تعریض‌شده‌ی کنار جاده دور بزنم.",
    "Vending og bakning er forbudt på motortrafikvej ligesom på motorvej.", "Turning round and reversing are forbidden on an expressway, as on a motorway.",
    "دور زدن و دنده‌عقب رفتن در این جاده، مثل آزادراه، ممنوع است."),
  S(False, "Jeg må holde ind på skulderen og tale i telefon, når jeg tænder havariblinket.",
    "I may pull onto the shoulder and talk on the phone when I switch on the hazard lights.",
    "وقتی چراغ‌های خطر را روشن کنم، می‌توانم روی شانه‌ی جاده بایستم و با تلفن حرف بزنم.",
    "Der må kun standses på de anviste pladser, og havariblinket ændrer ikke på det.",
    "Stopping is only allowed at the designated places, and the hazard lights do not change that.",
    "توقف فقط در جاهای تعیین‌شده مجاز است و چراغ‌های خطر چیزی را عوض نمی‌کنند."),
)

Q(5849, "8.1", picture("""
Inside an estate car seen from the back seat: a large dog stands loose between the two front seats with its head next to the driver's
shoulder; the driver holds the steering wheel; through the windscreen a town street.
MUST BE CLEARLY VISIBLE: the loose dog between the front seats, the driver.
MUST NOT APPEAR: text, logos."""),
  "Du skal køre en tur med din store hund i bilen. Hvad gælder?",
  "You are going for a drive with your big dog in the car. What applies?",
  "قرار است با سگ بزرگتان سوار خودرو شوید و جایی بروید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg sikrer hunden i et bur eller med en sele, der er fastgjort i bilen.",
    "I secure the dog in a cage or with a harness fixed to the car.", "سگ را در قفس یا با قلاده‌ی ایمنیِ بسته‌شده به خودرو مهار می‌کنم.",
    "Så kan den ikke forstyrre dig under kørslen eller blive slynget frem ved en opbremsning.",
    "Then it cannot disturb you while you drive or be thrown forward when you brake hard.",
    "این‌طور نمی‌تواند حین رانندگی حواستان را پرت کند یا هنگام ترمز شدید به جلو پرتاب شود."),
  S(True, "En løs hund kan blive kastet frem med stor kraft ved et sammenstød.", "A loose dog may be thrown forward with great force in a collision.",
    "سگِ رها ممکن است در تصادف با نیروی زیادی به جلو پرتاب شود.",
    "Ved et sammenstød bliver alt løst i bilen slynget frem med en kraft, der er mange gange større end dets vægt.",
    "In a collision everything loose in the car is thrown forward with a force many times its weight.",
    "در تصادف هر چیز رها در خودرو با نیرویی چند برابرِ وزنش به جلو پرتاب می‌شود."),
  S(True, "Hunden må ikke være anbragt, så den hindrer mit udsyn eller min betjening af bilen.",
    "The dog must not be placed so that it blocks my view or my handling of the car.",
    "سگ نباید جایی باشد که جلوی دید یا کنترل خودرو را بگیرد.",
    "Som fører skal du have frit udsyn og kunne manøvrere bilen uden at blive hindret.",
    "As the driver you must have a free view and be able to handle the car without being hindered.",
    "شما به‌عنوان راننده باید دید آزاد داشته باشید و بتوانید بی‌مانع خودرو را کنترل کنید."),
  S(False, "Hunden er bedst sikret på forsædet, hvor jeg kan holde øje med den.", "The dog is best secured on the front seat where I can keep an eye on it.",
    "بهترین جای سگ صندلی جلوست تا مراقبش باشم.",
    "Foran kan hunden forstyrre dig, og airbaggen kan skade den ved et uheld.", "In the front the dog can distract you, and the airbag may injure it in an accident.",
    "در جلو سگ ممکن است حواستان را پرت کند و کیسه‌ی هوا در تصادف به آن آسیب بزند."),
)

Q(5850, "10.3", picture("""
A pink credit-card-sized driving licence with a small photo area lies on a table next to a set of car keys and a mobile phone; the
details on the card are blurred and cannot be read.
MUST BE CLEARLY VISIBLE: the driving licence card, the car keys.
MUST NOT APPEAR: readable text or numbers, flags, national symbols, real names."""),
  "Hvad gælder om dit kørekort til bil?",
  "What applies to your driving licence for a car?",
  "درباره‌ی گواهینامه‌ی رانندگی خودرو چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal kunne vise kørekortet, hvis politiet beder om det under kørslen.",
    "I must be able to show my licence if the police ask for it while I am driving.",
    "اگر پلیس هنگام رانندگی بخواهد، باید بتوانم گواهینامه‌ام را نشان دهم.",
    "Føreren skal have kørekortet med under kørslen og vise det til politiet på forlangende.",
    "The driver must carry the licence while driving and show it to the police on request.",
    "راننده باید هنگام رانندگی گواهینامه را همراه داشته باشد و در صورت درخواست به پلیس نشان دهد."),
  S(False, "Kørekortet gælder hele livet, uden at det skal fornyes.", "The licence is valid for life without having to be renewed.",
    "گواهینامه مادام‌العمر است و نیازی به تمدید ندارد.",
    "Kørekortet udstedes med en gyldighedstid på 15 år og skal derefter fornyes.",
    "The licence is issued for a period of 15 years and must then be renewed.",
    "گواهینامه با اعتبار ۱۵ ساله صادر می‌شود و بعد از آن باید تمدید شود."),
  S(False, "Jeg må godt køre med et udløbet kørekort, fordi jeg engang har bestået køreprøven.",
    "I may drive with an expired licence because I once passed the driving test.",
    "می‌توانم با گواهینامه‌ی منقضی رانندگی کنم، چون زمانی آزمون رانندگی را قبول شده‌ام.",
    "Du skal have et gyldigt kørekort for at føre bil, så et udløbet kort skal fornyes, før du kører.",
    "You must have a valid licence to drive a car, so an expired card must be renewed before you drive.",
    "برای رانندگی باید گواهینامه‌ی معتبر داشته باشید، پس گواهینامه‌ی منقضی را باید پیش از رانندگی تمدید کنید."),
)
