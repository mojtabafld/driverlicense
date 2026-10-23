# «آزمون جدید», batch 11 (6001–6100), part c: stopping and parking (7.18), lights (7.19), road users beside the road (7.6), signs and
# markings (6.1), the driver's condition (4.4), the car (1.2), roundabouts (7.15), overtaking (7.9), road conditions (5.2), motorways
# and motortrafikveje (7.16), general rules (6.2), lane changes (7.4), large vehicles (3.2), safety (8.1), speed and braking (7.3),
# tunnels (7.20), reversing (7.5) and meeting (7.7).
# Rules: Færdselsloven §§ 3, 18 stk. 1 (make sure that reversing causes no danger), 20 stk. 1, 21 stk. 3–4, 26 stk. 2 (shark teeth
# and a give-way sign: give way to all), 27 stk. 1, 32 stk. 2 and 3 (hazard lights to warn of a sudden queue), 33 stk. 1 and 4 (the
# prescribed lamps when driving in the dark; dipped beam where main beam may not be used), 46 stk. 2, 54 stk. 2 (no driving when
# illness, medicine or the like means you cannot drive fully safely), 80 stk. 1; BEK 425/2023: § 34 C 51 (the no-overtaking ban does
# not apply to two-wheeled bicycles and small mopeds only, and lasts until it is lifted by a sign), § 50 (a farm entrance may be marked
# with a small red reflector), § 60 T 33 (a vehicle parked in a marked bay must stand inside it; vehicles with more than two wheels
# along the bay); the rules for parking cards for disabled people (the card may only be used when the vehicle carries its holder).
# Guidance (not law): people carrying furniture do not watch the traffic; anger makes you take risks; old tyres harden and crack; after
# a storm expect more fallen trees; a sharp eye test when signs blur; wait patiently behind slowly overtaking lorries; a motorcycle
# between queuing cars is easy to miss; children quarrelling in the back must not take your eyes off the road; ABS keeps the car
# steerable but cannot give more grip on gravel; leaving a tunnel the light dazzles and the road may be icy; a frayed seat belt must be
# replaced; exhaust fumes in the car are dangerous; a tractor's front-loader forks reach far ahead; a sleeping pill can affect you the
# next morning; many children are new in traffic on the first school day.
from nq import Q, S, above, picture, town, view

Q(6051, "7.18", above("""
THE SCENE: a car park seen from above with rows of bays at right angles to a driving aisle.
VEHICLES (colour code used strictly): a RED car (ours) with a small box trailer coupled behind it, parked nose-first in one bay; the
trailer sticks out well into the driving aisle; GREY cars in the neighbouring bays; a BLUE car coming along the aisle towards the
trailer.
MUST NOT APPEAR: signs, text."""),
  "På en parkeringsplads vil du parkere bil og trailer i en almindelig bås. Traileren kommer til at stikke et godt stykke ud i "
  "køresporet. Hvad gælder?",
  "In a car park you want to park your car and trailer in an ordinary bay. The trailer will stick out a good way into the driving "
  "aisle. What applies?",
  "در یک پارکینگ می‌خواهید خودرو و تریلر را در یک جای پارک معمولی پارک کنید. تریلر تا حد زیادی در مسیر عبور خودروها بیرون می‌ماند. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke parkere sådan, fordi hele vogntoget skal holde inden for båsen.",
    "I must not park like that, because the whole combination must stand inside the bay.",
    "نباید این‌طور پارک کنم، چون کل خودرو و تریلر باید داخل جای پارک باشند.",
    "Ved parkering i en afmærket bås skal køretøjet stå inden for båsen, og traileren må ikke spærre for de andre.",
    "When parking in a marked bay, the vehicle must stand inside the bay, and the trailer must not block the others.",
    "هنگام پارک در جای پارک خط‌کشی‌شده، وسیله باید داخل آن باشد و تریلر نباید راه دیگران را ببندد."),
  S(True, "Jeg finder et sted, hvor der er plads til hele vogntoget.", "I find a place where there is room for the whole combination.",
    "جایی پیدا می‌کنم که برای کل خودرو و تریلر جا داشته باشد.",
    "Fx en lang bås til vogntog eller en anden plads, hvor parkering med trailer er tilladt.",
    "For example a long bay for vehicles with trailers or another place where parking with a trailer is allowed.",
    "مثلاً یک جای پارک بلند برای خودروهای دارای تریلر یا جای دیگری که پارک با تریلر مجاز باشد."),
  S(False, "Jeg må godt stille vogntoget på tværs, så det optager to båse.",
    "I may park the combination crosswise so that it takes up two bays.",
    "می‌توانم خودرو و تریلر را به‌صورت عرضی پارک کنم تا دو جای پارک را بگیرد.",
    "Køretøjer med mere end to hjul skal stå i båsens længderetning.", "Vehicles with more than two wheels must stand along the length of the bay.",
    "وسایلی که بیش از دو چرخ دارند، باید در امتداد طول جای پارک قرار بگیرند."),
  S(False, "Det er tilladt, så længe selve bilen står inden for båsen.", "It is allowed as long as the car itself stands inside the bay.",
    "تا وقتی خودِ خودرو داخل جای پارک باشد، مجاز است.",
    "Det gælder hele vogntoget, ikke kun bilen.", "It applies to the whole combination, not only the car.",
    "این قاعده برای کل خودرو و تریلر است، نه فقط خودرو."),
)

Q(6052, "7.19", picture("""
A town street at dusk with the street lights on: one car drives along with only its small parking lights lit (no headlight beams on the
road in front of it), between other cars that have their dipped headlights on.
MUST BE CLEARLY VISIBLE: the car with only its weak parking lights, the other cars with proper dipped headlights.
MUST NOT APPEAR: text, readable number plates."""),
  "Det er ved at blive mørkt, og du kører gennem byen med kun parkeringslyset tændt. Der er gadelys. Hvad gælder?",
  "It is getting dark, and you are driving through town with only the parking lights on. There are street lights. What applies?",
  "هوا رو به تاریکی است و فقط با چراغ‌های کوچک پارک در شهر می‌رانید. خیابان چراغ روشنایی دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal tænde nærlyset.", "I must switch on the dipped headlights.", "باید نور پایین را روشن کنم.",
    "Under kørsel i mørke skal de påbudte lygter være tændt, og hvor fjernlys ikke må bruges, skal du bruge nærlys.",
    "When driving in the dark the prescribed lamps must be on, and where main beam may not be used you must use dipped beam.",
    "هنگام رانندگی در تاریکی باید چراغ‌های الزامی روشن باشد و جایی که نور بالا مجاز نیست، باید از نور پایین استفاده کنید."),
  S(False, "Når der er gadelys, er parkeringslyset nok.", "When there are street lights, the parking lights are enough.",
    "وقتی خیابان روشن است، چراغ پارک کافی است.",
    "Parkeringslyset er til en bil, der holder stille; under kørsel skal du bruge nærlys.",
    "Parking lights are for a car that is standing still; when driving you must use dipped beam.",
    "چراغ پارک برای خودرویی است که ایستاده؛ هنگام رانندگی باید نور پایین روشن باشد."),
  S(False, "Parkeringslyset er nok, fordi andre kan se mine baglygter.", "The parking lights are enough because others can see my rear lights.",
    "چراغ پارک کافی است، چون دیگران چراغ‌های عقبم را می‌بینند.",
    "Andre skal også kunne se dig forfra i god tid, og du skal selv kunne se vejen.",
    "Others must also be able to see you from the front in good time, and you yourself must be able to see the road.",
    "دیگران باید شما را از جلو هم به‌موقع ببینند و خودتان هم باید جاده را ببینید."),
  S(False, "I mørke må jeg også køre med kørelyset alene.", "In the dark I may also drive with the daytime running lights alone.",
    "در تاریکی می‌توانم فقط با چراغ روشنایی روز هم برانم.",
    "Kørelyset er til dagslys og tænder normalt ikke baglygterne; i mørke skal du bruge nærlys.",
    "Daytime running lights are for daylight and do not normally switch on the rear lights; in the dark you must use dipped beam.",
    "چراغ روشنایی روز برای روز است و معمولاً چراغ‌های عقب را روشن نمی‌کند؛ در تاریکی باید نور پایین روشن باشد."),
)

Q(6053, "7.6", town("""
THE SCENE: a residential street; a large removal van stands at the right kerb with its tail lift lowered at the back; two people carry
a sofa from the van across the pavement towards a house; another person steps out from behind the van into our lane carrying a box.
MUST BE CLEARLY VISIBLE: the removal van, the people carrying furniture, the person stepping out behind the van.
MUST NOT APPEAR: readable text, signs."""),
  "En flyttebil holder ved kantstenen, og nogle personer bærer møbler mellem bilen og huset. Hvordan forholder du dig?",
  "A removal van is stopped at the kerb, and some people are carrying furniture between the van and the house. What do you do?",
  "یک کامیون اسباب‌کشی کنار جدول ایستاده و چند نفر مبلمان را بین کامیون و خانه جابه‌جا می‌کنند. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og holder god afstand til siden af flyttebilen.",
    "I slow down and keep a good distance to the side of the removal van.",
    "سرعتم را کم می‌کنم و از کناره‌ی کامیون اسباب‌کشی فاصله‌ی کافی نگه می‌دارم.",
    "Personerne kan komme ud på vejen bag bilen eller fra døren i vejsiden.",
    "The people may come out into the road behind the van or from the door on the road side.",
    "ممکن است آدم‌ها از پشت کامیون یا از درِ سمت خیابان وارد جاده شوند."),
  S(True, "Jeg regner med, at de har travlt med at bære og ikke ser efter trafikken.",
    "I expect that they are busy carrying and are not watching the traffic.",
    "احتمال می‌دهم سرشان به حمل وسایل گرم است و حواسشان به ترافیک نیست.",
    "Med tunge ting i hænderne har de svært ved at se og ved at gå hurtigt til side.",
    "With heavy things in their hands they find it hard to see and to step aside quickly.",
    "با وسایل سنگین در دست، به‌سختی می‌بینند و به‌سختی می‌توانند سریع کنار بروند."),
  S(False, "De skal blive på fortovet, så jeg kan køre forbi med samme fart.",
    "They must stay on the pavement, so I can pass at the same speed.",
    "آن‌ها باید روی پیاده‌رو بمانند، پس می‌توانم با همان سرعت رد شوم.",
    "Du skal tage hensyn til de gående, også når de går ud på vejen, hvor de ikke burde.",
    "You must show consideration for pedestrians, also when they step into the road where they should not.",
    "باید ملاحظه‌ی عابران را بکنید، حتی وقتی جایی وارد جاده می‌شوند که نباید."),
  S(False, "Flyttebilen holder ulovligt, så jeg behøver ikke tage hensyn.", "The removal van is parked illegally, so I need not take care.",
    "کامیون اسباب‌کشی غیرقانونی پارک کرده، پس لازم نیست ملاحظه کنم.",
    "Uanset om bilen holder lovligt, skal du køre, så du ikke rammer nogen.",
    "Whether or not the van is parked legally, you must drive so that you do not hit anyone.",
    "چه کامیون قانونی پارک کرده باشد چه نه، باید طوری برانید که به کسی نزنید."),
)

Q(6054, "6.1", view("""
THE SCENE: a dark country road without street lights; in our dipped headlights, on the right verge, a short post with a small RED
reflector glows at the mouth of a gravel farm track leading off to the right; further along, white roadside posts with yellow
reflectors.
MUST BE CLEARLY VISIBLE: the small red reflector at the mouth of the farm track, the gravel track.
MUST NOT APPEAR: street lights, signs, text.""", cond="night, dark, dry road, no street lights"),
  "Om natten ser du en lille rød refleks i højre vejkant uden for byen. Den sidder på en pæl ved en grusvej. Hvad kan den betyde?",
  "At night you see a small red reflector at the right edge of the road outside town. It is on a post by a gravel track. What can it "
  "mean?",
  "شب بیرون شهر در لبه‌ی راست جاده یک شبرنگ کوچک قرمز می‌بینید. روی تیرکی کنار یک راه شنی نصب شده است. چه معنایی می‌تواند داشته باشد؟",
  S(True, "Den kan markere en indkørsel til en gård eller en anden ejendom.", "It may mark the entrance to a farm or another property.",
    "ممکن است ورودی یک مزرعه یا ملک دیگری را نشان دهد.",
    "Ejeren må markere indkørslen til en gård eller lignende med en lille rød refleks.",
    "The owner may mark the entrance to a farm or the like with a small red reflector.",
    "مالک می‌تواند ورودی مزرعه یا مکان مشابه را با یک شبرنگ کوچک قرمز مشخص کند."),
  S(True, "Jeg er forberedt på, at der kan komme et køretøj ud fra indkørslen.", "I am prepared for a vehicle to come out of the entrance.",
    "آماده‌ام که وسیله‌ای از آن ورودی بیرون بیاید.",
    "Den, der kører ud, har ubetinget vigepligt, men ser dig måske ikke i mørket.",
    "Whoever comes out must give way to all, but may not see you in the dark.",
    "کسی که بیرون می‌آید باید بی‌قیدوشرط راه بدهد، اما ممکن است شما را در تاریکی نبیند."),
  S(False, "Den viser, at vejen ender lige efter.", "It shows that the road ends just after it.", "نشان می‌دهد جاده درست بعد از آن تمام می‌شود.",
    "En lille rød refleks ved vejkanten markerer en indkørsel, ikke at vejen ophører.",
    "A small red reflector at the edge of the road marks an entrance, not the end of the road.",
    "شبرنگ کوچک قرمز کنار جاده ورودی را نشان می‌دهد، نه پایان جاده را."),
  S(False, "Det er baglygten på en bil, der holder parkeret i vejkanten.", "It is the rear light of a car parked at the edge of the road.",
    "این چراغ عقب خودرویی است که کنار جاده پارک کرده.",
    "En refleks lyser kun, når dit lys rammer den, og denne sidder fast på en pæl.",
    "A reflector only shines when your light hits it, and this one is fixed to a post.",
    "شبرنگ فقط وقتی نور شما به آن بخورد می‌درخشد و این یکی روی تیرک ثابت است."),
)

Q(6055, "4.4", picture("""
A person sits in the driver's seat of a parked car, gripping the steering wheel hard with both hands, tense and clearly angry; a
mobile phone showing an ended call lies on the passenger seat.
MUST BE CLEARLY VISIBLE: the tense grip on the wheel, the angry expression, the phone on the seat.
MUST NOT APPEAR: text, logos."""),
  "Du har lige haft et voldsomt skænderi og er meget vred. Nu vil du køre. Hvad gælder?",
  "You have just had a fierce argument and are very angry. Now you want to drive. What applies?",
  "همین الان دعوای شدیدی داشته‌اید و خیلی عصبانی هستید. حالا می‌خواهید رانندگی کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg venter med at køre, til jeg er faldet til ro.", "I wait to drive until I have calmed down.",
    "صبر می‌کنم تا آرام شوم و بعد رانندگی می‌کنم.",
    "Stærke følelser tager din opmærksomhed fra trafikken.", "Strong emotions take your attention away from the traffic.",
    "احساسات شدید توجه شما را از ترافیک دور می‌کند."),
  S(True, "Når jeg er vred, overser jeg lettere andre og tager større chancer.",
    "When I am angry, I am more likely to miss others and take bigger risks.",
    "وقتی عصبانی‌ام، راحت‌تر دیگران را نمی‌بینم و ریسک بیشتری می‌کنم.",
    "Vrede kan få dig til at køre hurtigere og mere aggressivt, end du ellers ville.",
    "Anger can make you drive faster and more aggressively than you otherwise would.",
    "عصبانیت ممکن است شما را وادار کند سریع‌تر و پرخاشگرانه‌تر از معمول برانید."),
  S(False, "Jeg kører stærkt, så jeg kan få afløb for vreden.", "I drive fast so that I can let off my anger.",
    "تند می‌رانم تا خشمم را خالی کنم.",
    "Høj fart giver mindre tid til at reagere og øger risikoen for alle.", "High speed gives less time to react and increases the risk for everyone.",
    "سرعت زیاد زمان واکنش را کم می‌کند و خطر را برای همه بیشتر می‌کند."),
  S(False, "Følelser påvirker ikke kørslen, så længe jeg holder hastighedsgrænsen.",
    "Emotions do not affect my driving as long as I keep to the speed limit.",
    "تا وقتی از حد مجاز سرعت تجاوز نکنم، احساساتم روی رانندگی اثری ندارد.",
    "Din opmærksomhed og dømmekraft bliver dårligere, også når du kører lovligt hurtigt.",
    "Your attention and judgement get worse, even when you drive at a legal speed.",
    "توجه و قضاوت شما بدتر می‌شود، حتی وقتی با سرعت مجاز می‌رانید."),
)

Q(6056, "1.2", picture("""
A close view of the sidewall of a car tyre: the tread is still deep, but the rubber of the sidewall is covered with many small cracks;
a hand points at the cracks.
MUST BE CLEARLY VISIBLE: the deep tread, the many small cracks in the sidewall.
MUST NOT APPEAR: brand names, readable text or numbers."""),
  "Dækkene på din bil er 10 år gamle. Mønsteret er dybt nok, men gummiet har mange små revner i siderne. Hvad gælder?",
  "The tyres on your car are 10 years old. The tread is deep enough, but the rubber has many small cracks in the sidewalls. What applies?",
  "لاستیک‌های خودروی شما ۱۰ سال عمر دارند. عمق آج کافی است، اما روی دیواره‌ی لاستیک‌ها ترک‌های ریز زیادی هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg får dækkene undersøgt og skiftet, fordi gamle dæk kan have dårligt greb og revne.",
    "I have the tyres checked and replaced, because old tyres may grip badly and split.",
    "لاستیک‌ها را بررسی و عوض می‌کنم، چون لاستیک‌های کهنه ممکن است چسبندگی کمی داشته باشند و پاره شوند.",
    "Gummi bliver hårdt og skørt med alderen, også selv om mønsteret er dybt nok.",
    "Rubber becomes hard and brittle with age, even if the tread is deep enough.",
    "لاستیک با گذشت زمان سفت و شکننده می‌شود، حتی اگر آج آن عمیق باشد."),
  S(False, "Så længe mønsteret er dybt nok, er dækkene i orden.", "As long as the tread is deep enough, the tyres are fine.",
    "تا وقتی عمق آج کافی باشد، لاستیک‌ها مشکلی ندارند.",
    "Revner og hårdt gummi kan gøre dækket farligt, uanset mønsterdybden.",
    "Cracks and hard rubber can make the tyre dangerous whatever the tread depth.",
    "ترک‌ها و لاستیکِ سفت‌شده ممکن است لاستیک را خطرناک کنند، هر قدر هم آج عمیق باشد."),
  S(False, "Små revner i siden af dækket har ingen betydning.", "Small cracks in the side of the tyre do not matter.",
    "ترک‌های کوچک در دیواره‌ی لاستیک اهمیتی ندارند.",
    "Revnerne kan blive større og få dækket til at springe.", "The cracks can grow and make the tyre burst.",
    "ترک‌ها ممکن است بزرگ‌تر شوند و لاستیک را بترکانند."),
  S(False, "Gamle dæk bliver bedre, hvis jeg pumper dem hårdere op.", "Old tyres get better if I pump them up harder.",
    "اگر لاستیک‌های کهنه را پرفشارتر باد کنم، بهتر می‌شوند.",
    "Mere luft gør ikke gummiet blødere, og forkert dæktryk forringer grebet.",
    "More air does not make the rubber softer, and the wrong tyre pressure worsens the grip.",
    "باد بیشتر لاستیک را نرم‌تر نمی‌کند و فشار باد نادرست چسبندگی را کم می‌کند."),
)

Q(6057, "7.15", above("""
THE SCENE: a single-lane roundabout seen from above with a round central island and four roads joining it (bottom, left, top, right);
a cycle lane runs round the outer edge of the roundabout.
VEHICLES (colour code used strictly): a RED car (ours) entering from the bottom road; a DASHED ORANGE arrow shows its route
anticlockwise all the way round, past the right, top and left exits, and out again into the bottom road it came from.
MUST NOT APPEAR: signs, text."""),
  "Du vil køre hele vejen rundt i en rundkørsel og tilbage ad den vej, du kom fra. Hvordan forholder du dig?",
  "You want to drive all the way round a roundabout and back along the road you came from. What do you do?",
  "می‌خواهید کل میدان را دور بزنید و از همان راهی که آمده‌اید برگردید. چه می‌کنید؟",
  S(True, "Jeg blinker til højre, lige før jeg skal ud ved den vej, jeg kom fra.",
    "I indicate right just before I leave at the road I came from.", "درست پیش از خروج به راهی که از آن آمده‌ام، راهنمای راست می‌زنم.",
    "Du skal give tegn til højre, før du forlader rundkørslen.", "You must signal right before you leave the roundabout.",
    "پیش از خروج از میدان باید راهنمای راست بزنید."),
  S(True, "Når jeg skal ud, holder jeg tilbage for cyklister, der fortsætter rundt i yderkanten.",
    "When I leave, I give way to cyclists who carry on round at the outer edge.",
    "هنگام خروج به دوچرخه‌سوارانی که در لبه‌ی بیرونی به دور زدن ادامه می‌دهند، راه می‌دهم.",
    "Du krydser deres vej, når du kører ud, og de fortsætter rundt i rundkørslen.",
    "You cross their path when you leave, and they carry on round the roundabout.",
    "هنگام خروج از مسیر آن‌ها عبور می‌کنید و آن‌ها به دور زدن در میدان ادامه می‌دهند."),
  S(False, "Jeg blinker til højre allerede ved indkørslen, så alle kan se, at jeg skal rundt.",
    "I indicate right already at the entry so that everyone can see that I am going round.",
    "از همان ورودی راهنمای راست می‌زنم تا همه ببینند که می‌خواهم دور بزنم.",
    "Blinker du til højre for tidligt, tror andre, at du skal ud ved den første udkørsel.",
    "If you indicate right too early, others think that you are leaving at the first exit.",
    "اگر زود راهنمای راست بزنید، دیگران گمان می‌کنند از اولین خروجی خارج می‌شوید."),
  S(False, "Det er forbudt at køre hele vejen rundt i en rundkørsel.", "It is forbidden to drive all the way round a roundabout.",
    "دور زدن کامل میدان ممنوع است.",
    "Du må gerne køre hele vejen rundt og på den måde vende.", "You may drive all the way round and turn back that way.",
    "می‌توانید کل میدان را دور بزنید و این‌طور برگردید."),
)

Q(6058, "7.9", view("""
THE SCENE: a two-lane country road; at the right verge stands the Danish no-overtaking sign (a round white sign with a red border
showing a red car and a black car side by side); ahead of us a slow green tractor; the oncoming lane is free.
MUST BE CLEARLY VISIBLE: the no-overtaking sign, the slow tractor ahead, the free oncoming lane.
MUST NOT APPEAR: other signs, text."""),
  "Du kører på en strækning med overhaling forbudt. Foran dig kører en traktor med ca. 25 km/t. Hvad gælder?",
  "You are driving on a stretch with no overtaking. In front of you a tractor is driving at about 25 km/h. What applies?",
  "در بخشی از جاده می‌رانید که سبقت در آن ممنوع است. جلوی شما تراکتوری با سرعت حدود ۲۵ کیلومتر در ساعت حرکت می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Forbuddet gælder også overhaling af traktoren.", "The ban also applies to overtaking the tractor.",
    "این ممنوعیت شامل سبقت از تراکتور هم می‌شود.",
    "Det er kun overhaling af tohjulede cykler og tohjulede små knallerter, der er undtaget fra forbuddet.",
    "Only overtaking two-wheeled bicycles and two-wheeled small mopeds is exempt from the ban.",
    "فقط سبقت از دوچرخه‌ی دوچرخ و موتورگازی کوچکِ دوچرخ از این ممنوعیت مستثناست."),
  S(True, "Jeg bliver bag traktoren, til forbuddet er ophævet.", "I stay behind the tractor until the ban is lifted.",
    "تا وقتی ممنوعیت لغو نشده، پشت تراکتور می‌مانم.",
    "Forbuddet gælder, indtil en tavle ophæver det.", "The ban applies until a sign lifts it.", "ممنوعیت تا وقتی تابلویی آن را لغو کند، برقرار است."),
  S(False, "Langsomme køretøjer under 30 km/t må altid overhales.", "Slow vehicles under 30 km/h may always be overtaken.",
    "از وسایل کُندِ زیر ۳۰ کیلومتر در ساعت همیشه می‌توان سبقت گرفت.",
    "Der er ingen sådan undtagelse fra overhalingsforbuddet.", "There is no such exception to the no-overtaking ban.",
    "چنین استثنایی در ممنوعیت سبقت وجود ندارد."),
  S(False, "Jeg må overhale, når der ikke kommer nogen imod mig.", "I may overtake when nobody is coming towards me.",
    "وقتی کسی از روبه‌رو نمی‌آید، می‌توانم سبقت بگیرم.",
    "Overhalingsforbuddet gælder, uanset om der er modkørende.", "The no-overtaking ban applies whether or not there is oncoming traffic.",
    "ممنوعیت سبقت برقرار است، چه از روبه‌رو کسی بیاید چه نه."),
)

Q(6059, "5.2", view("""
THE SCENE: a country road through a wood after a storm; a fallen tree lies across the right half of the road, with broken branches and
leaves scattered over the asphalt; the left lane is free for now, and the road bends further ahead.
MUST BE CLEARLY VISIBLE: the fallen tree across the right half, the branches on the road, the free left lane.
MUST NOT APPEAR: people, signs, text.""", cond="grey sky after a storm, wet road, strong wind"),
  "Efter en storm ligger der grene og et væltet træ delvis ude på vejen foran dig. Hvordan forholder du dig?",
  "After a storm, branches and a fallen tree lie partly across the road in front of you. What do you do?",
  "پس از یک طوفان، شاخه‌ها و درختی افتاده بخشی از جاده‌ی جلوی شما را گرفته‌اند. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og kører kun uden om træet, hvis det kan ske uden fare.",
    "I slow down and only drive round the tree if it can be done without danger.",
    "سرعتم را کم می‌کنم و فقط اگر بی‌خطر باشد، از کنار درخت می‌گذرم.",
    "Du skal over i den modsatte side af vejen, hvor der kan komme nogen imod dig.",
    "You have to move into the other side of the road, where someone may come towards you.",
    "باید به سمت مقابل جاده بروید، جایی که ممکن است کسی از روبه‌رو بیاید."),
  S(True, "Jeg regner med, at der kan ligge flere grene eller træer længere fremme.",
    "I expect that there may be more branches or trees further ahead.", "احتمال می‌دهم جلوتر هم شاخه یا درختان دیگری افتاده باشند.",
    "Efter en storm kan vejen være skadet mange steder.", "After a storm the road may be damaged in many places.",
    "پس از طوفان ممکن است جاده در جاهای زیادی آسیب دیده باشد."),
  S(True, "Jeg giver politiet besked, så træet kan blive fjernet.", "I tell the police so that the tree can be removed.",
    "به پلیس خبر می‌دهم تا درخت برداشته شود.",
    "Et træ på vejen er en fare for de næste trafikanter, især i mørke.",
    "A tree on the road is a danger to the next road users, especially in the dark.",
    "درختِ روی جاده برای کاربران بعدی خطرناک است، به‌خصوص در تاریکی."),
  S(False, "Jeg kører hen over de store grene, så jeg ikke skal ud i den anden side.",
    "I drive over the big branches so that I do not have to go into the other side.",
    "از روی شاخه‌های بزرگ رد می‌شوم تا مجبور نباشم به سمت دیگر بروم.",
    "Store grene kan skade bilen eller få den til at skride.", "Big branches can damage the car or make it skid.",
    "شاخه‌های بزرگ ممکن است به خودرو آسیب بزنند یا باعث سُر خوردن آن شوند."),
)

Q(6060, "4.4", view("""
THE SCENE: a road at night as seen by a driver with poor eyesight: a blue direction sign ahead looks blurred and cannot be read; the
headlights of oncoming cars appear as large glaring stars with long rays.
MUST BE CLEARLY VISIBLE: the blurred sign, the glaring oncoming headlights.
MUST NOT APPEAR: readable text.""", cond="night, dark, dry road"),
  "Du har i den senere tid fået svært ved at læse vejskiltene på afstand, og du bliver mere blændet i mørke end før. Hvad gør du?",
  "Lately you have found it hard to read road signs at a distance, and you are dazzled more in the dark than before. What do you do?",
  "مدتی است خواندن تابلوهای راه از دور برایتان سخت شده و در تاریکی بیشتر از قبل چشمتان زده می‌شود. چه می‌کنید؟",
  S(True, "Jeg får undersøgt mine øjne, før jeg kører mere.", "I have my eyes tested before I drive any more.",
    "پیش از این‌که باز رانندگی کنم، چشم‌هایم را معاینه می‌کنم.",
    "Med dårligt syn opdager du skilte og farer for sent, og du skal kunne se godt nok til at køre.",
    "With poor eyesight you notice signs and dangers too late, and you must be able to see well enough to drive.",
    "با بینایی ضعیف، تابلوها و خطرها را دیر می‌بینید و باید به اندازه‌ی کافی برای رانندگی ببینید."),
  S(False, "Så længe mit kørekort gælder, er mit syn godt nok.", "As long as my licence is valid, my eyesight is good enough.",
    "تا وقتی گواهینامه‌ام اعتبار دارد، بینایی‌ام کافی است.",
    "Synet kan ændre sig, og det er dit ansvar at kunne se godt nok, når du kører.",
    "Eyesight can change, and it is your responsibility to see well enough when you drive.",
    "بینایی ممکن است تغییر کند و این مسئولیت شماست که هنگام رانندگی به اندازه‌ی کافی ببینید."),
  S(False, "Jeg kører tæt bag bilen foran, så jeg kan følge den.", "I drive close behind the car in front so that I can follow it.",
    "نزدیکِ پشت خودروی جلویی می‌رانم تا دنبالش بروم.",
    "Kort afstand giver dig mindre tid til at reagere, og det løser ikke problemet med synet.",
    "A short distance gives you less time to react, and it does not solve the problem with your eyesight.",
    "فاصله‌ی کم زمان واکنش را کم می‌کند و مشکل بینایی را حل نمی‌کند."),
)

Q(6061, "7.16", view("""
THE SCENE: a motorway with two lanes in our direction; just beyond a gentle rise the traffic has come to a standstill in both lanes;
the cars ahead show bright brake lights and flashing hazard lights; we are approaching at speed.
MUST BE CLEARLY VISIBLE: the standing queue in both lanes, the brake and hazard lights.
MUST NOT APPEAR: signs, text."""),
  "På motorvejen kommer du hurtigt op på en kø, der står helt stille. Hvordan forholder du dig?",
  "On the motorway you are quickly coming up to a queue that is standing completely still. What do you do?",
  "در آزادراه به‌سرعت به صفی نزدیک می‌شوید که کاملاً متوقف است. چه می‌کنید؟",
  S(True, "Jeg bremser i god tid og tænder havariblinket for at advare dem bag mig.",
    "I brake in good time and switch on the hazard lights to warn those behind me.",
    "به‌موقع ترمز می‌کنم و فلاشرها را روشن می‌کنم تا به پشت‌سری‌ها هشدار بدهم.",
    "Havariblinket viser bilisterne bag dig, at der er en uventet kø forude.",
    "The hazard lights show the drivers behind you that there is an unexpected queue ahead.",
    "فلاشرها به رانندگان پشت سر نشان می‌دهند که جلوتر صفی غیرمنتظره هست."),
  S(True, "Jeg holder øje i spejlet med, om bilerne bag mig når at bremse.",
    "I watch in the mirror whether the cars behind me manage to brake.",
    "در آینه نگاه می‌کنم که آیا خودروهای پشت سرم به‌موقع ترمز می‌کنند.",
    "Så kan du nå at reagere, hvis nogen kommer for hurtigt bagfra.",
    "Then you can react in time if someone comes up too fast from behind.", "این‌طور اگر کسی خیلی سریع از پشت بیاید، می‌توانید به‌موقع واکنش نشان دهید."),
  S(True, "Jeg standser med god afstand til bilen foran mig.", "I stop with a good distance to the car in front of me.",
    "با فاصله‌ی کافی از خودروی جلویی می‌ایستم.",
    "Så har du plads at køre frem på, hvis bilen bag dig ikke når at standse.",
    "Then you have room to move forward if the car behind you does not stop in time.",
    "این‌طور اگر خودروی پشتی نتواند به‌موقع بایستد، جا دارید که جلو بروید."),
  S(False, "Jeg kører ud i nødsporet og forbi køen.", "I drive onto the hard shoulder and past the queue.",
    "وارد شانه‌ی اضطراری می‌شوم و از کنار صف رد می‌شوم.",
    "Nødsporet må ikke bruges til at komme forbi en kø.", "The hard shoulder must not be used to get past a queue.",
    "از شانه‌ی اضطراری نباید برای رد شدن از کنار صف استفاده کرد."),
)

Q(6062, "6.2", picture("""
A street seen from a following car: ahead a dark car drives away fast; a cyclist lies on the road beside a fallen bicycle; the dark
car's number plate can be seen but is not readable in the picture.
MUST BE CLEARLY VISIBLE: the cyclist on the road, the car driving away.
MUST NOT APPEAR: blood, text, readable number plates."""),
  "Du ser, at en bil kører en cyklist ned og kører videre uden at standse. Cyklisten ligger på vejen. Hvad gør du?",
  "You see a car knock down a cyclist and drive on without stopping. The cyclist is lying on the road. What do you do?",
  "می‌بینید خودرویی به دوچرخه‌سواری می‌زند و بدون توقف به راهش ادامه می‌دهد. دوچرخه‌سوار روی جاده افتاده است. چه می‌کنید؟",
  S(True, "Jeg standser et sikkert sted og hjælper cyklisten.", "I stop at a safe place and help the cyclist.",
    "جای امنی می‌ایستم و به دوچرخه‌سوار کمک می‌کنم.",
    "Selv om du ikke var med i uheldet, skal du hjælpe en person, der er kommet alvorligt til skade.",
    "Even though you were not involved in the accident, you must help a person who is seriously injured.",
    "با این‌که در تصادف نقشی نداشتید، باید به کسی که به‌شدت آسیب دیده کمک کنید."),
  S(True, "Jeg prøver at huske nummerpladen og bilens udseende til politiet.",
    "I try to remember the number plate and what the car looks like for the police.",
    "سعی می‌کنم پلاک و ظاهر خودرو را برای پلیس به خاطر بسپارم.",
    "Oplysningerne kan hjælpe politiet med at finde føreren.", "The information can help the police find the driver.",
    "این اطلاعات ممکن است به پلیس در پیدا کردن راننده کمک کند."),
  S(False, "Jeg kører efter bilen for at få den til at standse.", "I chase the car to make it stop.",
    "دنبال آن خودرو می‌روم تا وادارش کنم بایستد.",
    "Den tilskadekomne har først og fremmest brug for hjælp, og en jagt kan føre til flere uheld.",
    "The injured person needs help first of all, and a chase can lead to more accidents.",
    "فرد آسیب‌دیده پیش از هر چیز به کمک نیاز دارد و تعقیب ممکن است به تصادف‌های بیشتری بینجامد."),
  S(False, "Jeg kører videre, fordi jeg ikke selv var med i uheldet.", "I drive on, because I was not involved in the accident myself.",
    "به راهم ادامه می‌دهم، چون خودم در تصادف نقشی نداشتم.",
    "En person, der ligger på vejen, kan blive kørt ned igen og har brug for hjælp med det samme.",
    "A person lying on the road may be run over again and needs help straight away.",
    "کسی که روی جاده افتاده ممکن است دوباره زیر گرفته شود و فوراً به کمک نیاز دارد."),
)

Q(6063, "7.4", view("""
THE SCENE: a motorway with two lanes in our direction in a slow, dense queue; a motorcycle rides slowly between the two lanes of
cars, approaching from behind; it is visible in our right door mirror at the right edge of the picture and just beside us.
MUST BE CLEARLY VISIBLE: the queue in both lanes, the motorcycle between the lanes beside us.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "I en kø på motorvejen kommer en motorcykel langsomt bagfra mellem de to vognbaner. Hvordan forholder du dig?",
  "In a queue on the motorway a motorcycle is coming slowly from behind between the two lanes. What do you do?",
  "در صفی در آزادراه، یک موتورسیکلت آهسته از پشت، بین دو خط می‌آید. چه می‌کنید؟",
  S(True, "Jeg ser mig godt for i spejlene og over skulderen, før jeg skifter vognbane.",
    "I look carefully in the mirrors and over my shoulder before I change lanes.",
    "پیش از تغییر خط، با دقت در آینه‌ها و از روی شانه نگاه می‌کنم.",
    "En motorcykel mellem bilerne er smal og let at overse.", "A motorcycle between the cars is narrow and easy to miss.",
    "موتورسیکلتِ بین خودروها باریک است و به‌راحتی دیده نمی‌شود."),
  S(True, "Jeg bliver i min vognbane og holder bilen rolig, mens motorcyklen kører forbi.",
    "I stay in my lane and keep the car steady while the motorcycle passes.",
    "در خط خودم می‌مانم و تا وقتی موتورسیکلت رد شود، خودرو را ثابت نگه می‌دارم.",
    "En pludselig bevægelse til siden kan ramme motorcyklen.", "A sudden movement to the side may hit the motorcycle.",
    "یک حرکت ناگهانی به کنار ممکن است به موتورسیکلت بخورد."),
  S(False, "Jeg trækker over mod midten for at spærre for motorcyklen.", "I move towards the middle to block the motorcycle.",
    "به سمت وسط می‌کشم تا راه موتورسیکلت را ببندم.",
    "Det kan føre til et uheld, og det er ikke din opgave at stoppe den.", "That can lead to an accident, and it is not your job to stop it.",
    "این کار ممکن است به تصادف منجر شود و متوقف کردن آن وظیفه‌ی شما نیست."),
  S(False, "Jeg kan skifte vognbane uden at se mig for, fordi køen holder stille.",
    "I can change lanes without looking because the queue is standing still.",
    "چون صف ایستاده، می‌توانم بدون نگاه کردن خط عوض کنم.",
    "Også i en kø kan der komme nogen ved siden af dig, fx en motorcykel.", "Even in a queue someone may come up beside you, for example a motorcycle.",
    "حتی در صف هم ممکن است کسی کنارتان بیاید، مثلاً یک موتورسیکلت."),
)

Q(6064, "7.16", view("""
THE SCENE: the end of a short slip road that joins a road with one lane in each direction (a motortrafikvej); there is no acceleration
lane; at the end of the slip road stand a give-way sign (a white triangle with a red border, point down) and shark teeth across the
slip road; a car passes from the left on the road.
MUST BE CLEARLY VISIBLE: the give-way sign and shark teeth at the end of the slip road, the missing acceleration lane, the car on the
road.
MUST NOT APPEAR: other signs, text."""),
  "Tilkørslen til en motortrafikvej har ingen accelerationsbane. Den ender ved en vigepligtstavle og hajtænder. Hvad gælder?",
  "The slip road to a motortrafikvej has no acceleration lane. It ends at a give-way sign and shark teeth. What applies?",
  "ورودیِ یک جاده‌ی ویژه‌ی خودرو (motortrafikvej) خط شتاب ندارد. انتهای آن تابلوی رعایت حق تقدم و دندان‌کوسه است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for trafikken på vejen, før jeg kører ud.", "I must give way to the traffic on the road before I drive out.",
    "پیش از ورود باید به ترافیک جاده راه بدهم.",
    "Vigepligtstavlen og hajtænderne giver dig ubetinget vigepligt.", "The give-way sign and shark teeth mean that you must give way to all.",
    "تابلوی رعایت حق تقدم و دندان‌کوسه یعنی باید بی‌قیدوشرط راه بدهید."),
  S(True, "Jeg venter på et hul, der er stort nok til, at jeg kan komme op i fart.",
    "I wait for a gap big enough for me to build up speed.", "منتظر فاصله‌ای می‌مانم که آن‌قدر بزرگ باشد که بتوانم سرعت بگیرم.",
    "Trafikken på vejen kører hurtigt, og du starter fra lav fart.", "The traffic on the road is fast, and you are starting from a low speed.",
    "ترافیک جاده سریع است و شما از سرعت کم شروع می‌کنید."),
  S(False, "Trafikken på vejen skal give plads til mig, fordi jeg kommer fra en tilkørsel.",
    "The traffic on the road must make room for me because I am coming from a slip road.",
    "ترافیک جاده باید به من جا بدهد، چون از ورودی می‌آیم.",
    "Med hajtænder skal du holde tilbage for alle på vejen.", "With shark teeth you must give way to everyone on the road.",
    "با دندان‌کوسه باید به همه‌ی کسانی که در جاده‌اند راه بدهید."),
  S(False, "Jeg kan køre ud uden at standse, fordi bilerne på vejen kan skifte vognbane.",
    "I can drive out without stopping, because the cars on the road can change lanes.",
    "می‌توانم بدون توقف وارد شوم، چون خودروهای جاده می‌توانند خط عوض کنند.",
    "Der er kun én vognbane i hver retning, og du kan ikke regne med, at andre gør plads.",
    "There is only one lane in each direction, and you cannot count on others making room.",
    "در هر جهت فقط یک خط هست و نمی‌توانید روی جا باز کردن دیگران حساب کنید."),
)

Q(6065, "3.2", view("""
THE SCENE: a motorway with two lanes in our direction; ahead a lorry in the left lane is slowly overtaking another lorry in the right
lane; side by side they block both lanes; we come up from behind in the left lane.
MUST BE CLEARLY VISIBLE: the two lorries side by side blocking both lanes.
MUST NOT APPEAR: signs, text, readable number plates."""),
  "På motorvejen kører to lastbiler side om side foran dig og spærrer begge vognbaner, fordi den ene langsomt overhaler den anden. "
  "Du kommer op bag dem. Hvordan forholder du dig?",
  "On the motorway two lorries are driving side by side ahead of you and blocking both lanes, because one is slowly overtaking the "
  "other. You come up behind them. What do you do?",
  "در آزادراه جلوی شما دو کامیون کنار هم می‌رانند و هر دو خط را گرفته‌اند، چون یکی آهسته از دیگری سبقت می‌گیرد. شما از پشت به آن‌ها می‌رسید. چه "
  "می‌کنید؟",
  S(True, "Jeg sætter farten ned og venter roligt bag lastbilen.", "I slow down and wait calmly behind the lorry.",
    "سرعتم را کم می‌کنم و آرام پشت کامیون منتظر می‌مانم.",
    "Lastbiler har samme lave hastighedsgrænse, så en overhaling mellem dem kan tage tid.",
    "Lorries have the same low speed limit, so an overtaking manoeuvre between them can take time.",
    "کامیون‌ها حد سرعتِ پایینِ یکسانی دارند، پس سبقت میان آن‌ها ممکن است طول بکشد."),
  S(True, "Jeg holder så stor afstand, at chaufføren kan se mig i sine spejle.",
    "I keep such a distance that the driver can see me in his mirrors.", "آن‌قدر فاصله نگه می‌دارم که راننده بتواند مرا در آینه‌هایش ببیند.",
    "Holder du for tæt bag lastbilen, kan chaufføren ikke se dig.", "If you are too close behind the lorry, the driver cannot see you.",
    "اگر خیلی نزدیک پشت کامیون باشید، راننده شما را نمی‌بیند."),
  S(False, "Jeg blinker med lyset og kører tæt op for at få lastbilen til at skynde sig.",
    "I flash my lights and drive up close to make the lorry hurry.", "چراغ می‌زنم و نزدیک می‌شوم تا کامیون عجله کند.",
    "Det stresser chaufføren og giver dig selv for lille afstand.", "It puts the driver under pressure and leaves you too small a distance.",
    "این کار راننده را تحت فشار می‌گذارد و فاصله‌ی خودتان را هم خیلی کم می‌کند."),
  S(False, "Jeg kører forbi begge lastbiler i nødsporet.", "I pass both lorries on the hard shoulder.",
    "از شانه‌ی اضطراری از کنار هر دو کامیون رد می‌شوم.",
    "Det er forbudt at køre i nødsporet for at komme forbi.", "It is forbidden to drive on the hard shoulder to get past.",
    "رانندگی در شانه‌ی اضطراری برای رد شدن ممنوع است."),
)

Q(6066, "7.18", town("""
THE SCENE: a supermarket car park; directly ahead a free bay marked with a blue parking sign with a plate showing a wheelchair symbol;
on our dashboard (on the thin dark strip at the bottom) lies a blue parking card for disabled people; the passenger seat is empty.
MUST BE CLEARLY VISIBLE: the reserved bay with the wheelchair plate, the parking card on the dashboard.
MUST NOT APPEAR: readable text other than the P on the sign."""),
  "Din mor har et parkeringskort for personer med handicap. Du låner hendes bil for at handle alene og vil bruge kortet på en "
  "handicapplads. Hvad gælder?",
  "Your mother has a parking card for disabled people. You borrow her car to go shopping on your own and want to use the card in a "
  "disabled bay. What applies?",
  "مادرتان کارت پارک ویژه‌ی افراد دارای معلولیت دارد. خودروی او را قرض گرفته‌اید تا تنها خرید کنید و می‌خواهید با این کارت در جای پارک "
  "معلولان پارک کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke bruge kortet, når min mor ikke er med i bilen.", "I must not use the card when my mother is not in the car.",
    "وقتی مادرم در خودرو نیست، نباید از کارت استفاده کنم.",
    "Parkeringskortet må kun bruges, når bilen bruges til kørsel med kortets indehaver.",
    "The parking card may only be used when the car is being used to carry the card's holder.",
    "کارت پارک فقط وقتی قابل استفاده است که خودرو برای جابه‌جایی صاحب کارت به کار رود."),
  S(True, "Jeg parkerer på en almindelig plads.", "I park in an ordinary space.", "در یک جای پارک معمولی پارک می‌کنم.",
    "Pladsen er forbeholdt køretøjer, der lovligt bruger et parkeringskort.",
    "The bay is reserved for vehicles that are lawfully using a parking card.",
    "این جای پارک مخصوص وسایلی است که به‌طور قانونی از کارت پارک استفاده می‌کنند."),
  S(False, "Kortet følger bilen, så alle, der kører den, må bruge det.", "The card goes with the car, so anyone driving it may use it.",
    "کارت به خودرو تعلق دارد، پس هر کس آن را براند می‌تواند از کارت استفاده کند.",
    "Kortet er personligt og følger personen, ikke bilen.", "The card is personal and goes with the person, not the car.",
    "این کارت شخصی است و به فرد تعلق دارد، نه به خودرو."),
  S(False, "Jeg må bruge kortet, fordi jeg handler for min mor.", "I may use the card because I am shopping for my mother.",
    "می‌توانم از کارت استفاده کنم، چون برای مادرم خرید می‌کنم.",
    "Det er kun, når kortets indehaver køres i bilen, at kortet må bruges.",
    "It is only when the card's holder is being driven in the car that the card may be used.",
    "فقط وقتی صاحب کارت با خودرو جابه‌جا می‌شود، می‌توان از کارت استفاده کرد."),
)

Q(6067, "8.1", picture("""
Inside a car seen from the front passenger side: on the back seat two children in child seats argue loudly, and a toddler in a third
child seat cries; the driver keeps both hands on the steering wheel and looks at the road; through the windscreen a street in town.
MUST BE CLEARLY VISIBLE: the arguing children and the crying toddler, the driver's eyes on the road.
MUST NOT APPEAR: text, logos."""),
  "Dine børn på bagsædet skændes højlydt, og den mindste græder. Hvordan forholder du dig?",
  "Your children on the back seat are quarrelling loudly, and the youngest is crying. What do you do?",
  "بچه‌هایتان روی صندلی عقب با صدای بلند دعوا می‌کنند و کوچک‌ترینشان گریه می‌کند. چه می‌کنید؟",
  S(True, "Jeg holder ind et sikkert sted, hvis jeg skal tage mig af dem.", "I pull in at a safe place if I need to see to them.",
    "اگر لازم باشد به آن‌ها رسیدگی کنم، در جای امنی می‌ایستم.",
    "Det er farligt at dele opmærksomheden mellem børnene og trafikken.",
    "It is dangerous to split your attention between the children and the traffic.",
    "تقسیم کردن توجه بین بچه‌ها و ترافیک خطرناک است."),
  S(True, "Jeg vender mig ikke om mod bagsædet, mens jeg kører.", "I do not turn round towards the back seat while I am driving.",
    "هنگام رانندگی به سمت صندلی عقب برنمی‌گردم.",
    "Når du kigger væk, kører bilen mange meter, uden at du ser vejen.",
    "When you look away, the car travels many metres without you seeing the road.",
    "وقتی نگاهتان را برمی‌گردانید، خودرو چندین متر می‌رود بی‌آن‌که جاده را ببینید."),
  S(True, "Jeg koncentrerer mig om kørslen, indtil jeg kan standse.", "I concentrate on driving until I can stop.",
    "تا وقتی بتوانم توقف کنم، روی رانندگی تمرکز می‌کنم.",
    "Trafikken skal have din fulde opmærksomhed, også når der er uro i bilen.",
    "The traffic must have your full attention, even when there is commotion in the car.",
    "ترافیک باید تمام توجه شما را داشته باشد، حتی وقتی در خودرو شلوغ است."),
  S(False, "Jeg rækker om bagud og giver den mindste en sut, mens jeg kører.",
    "I reach round behind me and give the youngest a dummy while I drive.",
    "در حال رانندگی دستم را به عقب دراز می‌کنم و پستانک را به کوچک‌ترین می‌دهم.",
    "Så har du hverken blikket på vejen eller begge hænder på rattet.",
    "Then you have neither your eyes on the road nor both hands on the wheel.",
    "در این صورت نه چشمتان به جاده است و نه هر دو دستتان روی فرمان."),
)

Q(6068, "7.3", view("""
THE SCENE: a narrow gravel road with loose stones between fields; just ahead a tractor is pulling out from a field track on the right
onto the gravel road, close in front of us.
MUST BE CLEARLY VISIBLE: the loose gravel surface, the tractor pulling out close ahead.
MUST NOT APPEAR: signs, text."""),
  "Du kører på en grusvej med løse sten og må pludselig bremse hårdt. Bilen har ABS. Hvad gælder?",
  "You are driving on a gravel road with loose stones and suddenly have to brake hard. The car has ABS. What applies?",
  "در جاده‌ای شنی با سنگ‌ریزه‌های سست می‌رانید و ناگهان باید محکم ترمز کنید. خودرو ABS دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Bremselængden kan blive længere end på asfalt.", "The braking distance may be longer than on asphalt.",
    "مسافت ترمز ممکن است از روی آسفالت بیشتر باشد.",
    "På løst grus har dækkene dårligt greb, og ABS kan ikke give mere greb, end underlaget tillader.",
    "On loose gravel the tyres grip badly, and ABS cannot give more grip than the surface allows.",
    "روی شن سست چسبندگی لاستیک‌ها کم است و ABS نمی‌تواند بیش از آنچه سطح اجازه می‌دهد چسبندگی ایجاد کند."),
  S(True, "Jeg kan stadig styre, mens jeg bremser.", "I can still steer while I brake.", "هنگام ترمز همچنان می‌توانم فرمان بدهم.",
    "ABS forhindrer hjulene i at låse, så bilen kan styres.", "ABS stops the wheels from locking so that the car can be steered.",
    "ABS از قفل شدن چرخ‌ها جلوگیری می‌کند تا بتوان خودرو را هدایت کرد."),
  S(True, "Jeg holder lavere fart og større afstand på grusvejen.", "I keep a lower speed and a greater distance on the gravel road.",
    "در جاده‌ی شنی با سرعت کمتر و فاصله‌ی بیشتر می‌رانم.",
    "Så har du plads til den længere bremselængde.", "Then you have room for the longer braking distance.",
    "این‌طور برای مسافت ترمز طولانی‌تر جا دارید."),
  S(False, "Med ABS kan jeg køre lige så hurtigt på grus som på asfalt.", "With ABS I can drive just as fast on gravel as on asphalt.",
    "با ABS می‌توانم روی شن همان‌قدر سریع برانم که روی آسفالت.",
    "Grebet på grus er dårligere, og det kan ABS ikke ændre på.", "The grip on gravel is poorer, and ABS cannot change that.",
    "چسبندگی روی شن کمتر است و ABS نمی‌تواند این را تغییر دهد."),
)

Q(6069, "7.20", view("""
THE SCENE: the end of a long road tunnel seen from inside: the exit ahead is a very bright opening; outside the road is white with
snow and glitters in low winter sunshine; the tunnel walls around us are dark; a car ahead is just leaving the tunnel.
MUST BE CLEARLY VISIBLE: the dark tunnel, the very bright exit, the snowy road outside.
MUST NOT APPEAR: signs, text.""", cond="inside a tunnel, dazzling snowy sunshine outside"),
  "Du kører ud af en lang tunnel en klar vinterdag med sne og sol. Hvad skal du være opmærksom på?",
  "You are driving out of a long tunnel on a clear winter's day with snow and sunshine. What should you be aware of?",
  "در یک روز صاف زمستانی با برف و آفتاب از تونلی طولانی بیرون می‌آیید. به چه چیزی باید توجه کنید؟",
  S(True, "Jeg kan blive blændet af det skarpe lys, når jeg kommer ud.", "I may be dazzled by the bright light when I come out.",
    "ممکن است هنگام بیرون آمدن، نور شدید چشمم را بزند.",
    "Øjnene skal vænne sig til det stærke lys efter mørket i tunnelen.",
    "Your eyes have to get used to the strong light after the darkness of the tunnel.",
    "چشم‌ها پس از تاریکی تونل باید به نور شدید عادت کنند."),
  S(True, "Vejen kan være glat lige efter tunnelen, selv om den var tør inde i tunnelen.",
    "The road may be slippery just after the tunnel, even though it was dry inside the tunnel.",
    "ممکن است جاده درست بعد از تونل لغزنده باشد، با این‌که داخل تونل خشک بود.",
    "Uden for tunnelen kan der være is og sne, som der ikke er inde i den.",
    "Outside the tunnel there may be ice and snow that there is not inside it.",
    "بیرون تونل ممکن است یخ و برفی باشد که داخل آن نیست."),
  S(True, "Der kan være kraftig sidevind, når jeg kommer ud af tunnelen.", "There may be a strong crosswind when I come out of the tunnel.",
    "ممکن است هنگام خروج از تونل باد جانبی شدیدی بوزد.",
    "Vinden kan pludselig ramme bilen, når du kommer ud af læ.", "The wind may suddenly hit the car when you leave the shelter.",
    "باد ممکن است وقتی از پناه بیرون می‌آیید، ناگهان به خودرو بخورد."),
  S(False, "Jeg sætter farten op, så snart jeg er ude af tunnelen.", "I speed up as soon as I am out of the tunnel.",
    "به محض بیرون آمدن از تونل سرعتم را زیاد می‌کنم.",
    "Lige efter tunnelen skal du først vænne dig til lyset og føret.",
    "Just after the tunnel you must first get used to the light and the road conditions.",
    "درست بعد از تونل اول باید به نور و وضعیت جاده عادت کنید."),
)

Q(6070, "1.2", picture("""
A close view of a car's seat belt: along one edge the webbing is frayed with loose threads and has a small cut; a hand holds the belt
out to show the damage.
MUST BE CLEARLY VISIBLE: the frayed edge and the small cut in the belt.
MUST NOT APPEAR: text, logos."""),
  "Du opdager, at sikkerhedsselen i førersædet er flosset og har et lille hak i kanten. Hvad gælder?",
  "You discover that the seat belt in the driver's seat is frayed and has a small nick in its edge. What applies?",
  "متوجه می‌شوید که کمربند ایمنیِ صندلی راننده ریش‌ریش شده و لبه‌اش کمی بریدگی دارد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg får selen skiftet, fordi den måske ikke holder ved et sammenstød.",
    "I have the belt replaced, because it may not hold in a collision.", "کمربند را عوض می‌کنم، چون ممکن است در تصادف تحمل نکند.",
    "En beskadiget sele kan revne, når den skal tage imod store kræfter.",
    "A damaged belt can tear when it has to take large forces.", "کمربندِ آسیب‌دیده ممکن است زیر نیروهای زیاد پاره شود."),
  S(False, "Så længe selen kan låses, er den i orden.", "As long as the belt can be buckled, it is fine.",
    "تا وقتی کمربند قفل می‌شود، مشکلی ندارد.",
    "Låsen virker måske, men selve selen kan være svækket.", "The buckle may work, but the belt itself may be weakened.",
    "ممکن است قفل کار کند، اما خودِ تسمه ضعیف شده باشد."),
  S(False, "Jeg klipper de løse tråde af, så er selen som ny.", "I cut off the loose threads, and then the belt is as good as new.",
    "نخ‌های آزاد را می‌برم و کمربند مثل روز اول می‌شود.",
    "Skaden er der stadig, og selen er svækket.", "The damage is still there, and the belt is weakened.",
    "آسیب همچنان هست و کمربند ضعیف شده است."),
)

Q(6071, "7.5", above("""
THE SCENE: a car park aisle seen from above with bays on both sides facing the aisle.
VEHICLES (colour code used strictly): a RED car (ours) reversing out of a bay on the lower side into the aisle, its white reversing
lights on; directly opposite, a GREY car reversing out of a bay on the upper side into the aisle too, its reversing lights on; short
DASHED ORANGE arrows show both moving backwards towards each other.
MUST NOT APPEAR: people, signs, text."""),
  "Du bakker ud af en parkeringsbås. Samtidig begynder bilen i båsen lige over for dig også at bakke ud. Hvordan forholder du dig?",
  "You are reversing out of a parking bay. At the same time the car in the bay directly opposite you also starts to reverse out. What "
  "do you do?",
  "در حال دنده‌عقب بیرون آمدن از یک جای پارک هستید. هم‌زمان خودروی جای پارکِ روبه‌روی شما هم شروع به دنده‌عقب آمدن می‌کند. چه می‌کنید؟",
  S(True, "Jeg standser og venter.", "I stop and wait.", "می‌ایستم و صبر می‌کنم.",
    "Den, der bakker, skal sikre sig, at det kan ske uden fare eller ulempe for andre.",
    "Anyone reversing must make sure that it can be done without danger or inconvenience to others.",
    "کسی که دنده‌عقب می‌رود باید مطمئن شود که برای دیگران خطر یا مزاحمتی ندارد."),
  S(True, "Jeg prøver at få øjenkontakt med den anden fører.", "I try to make eye contact with the other driver.",
    "سعی می‌کنم با راننده‌ی دیگر تماس چشمی برقرار کنم.",
    "Så kan I blive enige om, hvem der kører først.", "Then you can agree on who goes first.",
    "این‌طور می‌توانید توافق کنید چه کسی اول برود."),
  S(True, "Jeg bakker først videre, når jeg er sikker på, at den anden har set mig.",
    "I only carry on reversing when I am sure the other driver has seen me.",
    "فقط وقتی مطمئن شدم راننده‌ی دیگر مرا دیده، به دنده‌عقب ادامه می‌دهم.",
    "Ellers kan I begge bakke ud på samme tid og støde sammen.", "Otherwise you may both reverse at the same time and collide.",
    "وگرنه ممکن است هر دو هم‌زمان دنده‌عقب بروید و به هم بخورید."),
  S(False, "Jeg skynder mig at bakke ud, så jeg kommer først.", "I hurry to reverse out so that I get out first.",
    "عجله می‌کنم که دنده‌عقب بیرون بیایم تا اول باشم.",
    "Ingen har forret, når man bakker, og I kan støde sammen.", "Nobody has priority when reversing, and you may collide.",
    "هنگام دنده‌عقب هیچ‌کس حق تقدم ندارد و ممکن است به هم بخورید."),
)

Q(6072, "7.6", town("""
THE SCENE: a street outside a school on a sunny late-summer morning; many young children with large school bags walk on the
pavements, some hand in hand with adults; a few ride bicycles on the cycle path; a parent's car has stopped at the kerb ahead with its
hazard lights on, and a child is getting out.
MUST BE CLEARLY VISIBLE: the young schoolchildren, the cyclists on the cycle path, the car stopping to let a child out.
MUST NOT APPEAR: text."""),
  "Det er første skoledag efter sommerferien, og du kører forbi en skole om morgenen. Hvordan forholder du dig?",
  "It is the first school day after the summer holidays, and you are driving past a school in the morning. What do you do?",
  "اولین روز مدرسه پس از تعطیلات تابستان است و صبح از کنار یک مدرسه رد می‌شوید. چه می‌کنید؟",
  S(True, "Jeg regner med, at mange børn er nye i trafikken.", "I expect that many children are new in traffic.",
    "احتمال می‌دهم بسیاری از بچه‌ها در ترافیک تازه‌کار باشند.",
    "De yngste skolebørn kan ikke vurdere afstand og fart.", "The youngest schoolchildren cannot judge distance and speed.",
    "کوچک‌ترین دانش‌آموزان نمی‌توانند فاصله و سرعت را ارزیابی کنند."),
  S(True, "Jeg sætter farten ned og holder øje med børn på fortove og cykelstier.",
    "I slow down and keep an eye on children on pavements and cycle paths.",
    "سرعتم را کم می‌کنم و مراقب بچه‌های روی پیاده‌روها و مسیرهای دوچرخه هستم.",
    "Børn kan pludselig løbe ud eller svinge ud på vejen.", "Children may suddenly run out or swerve out into the road.",
    "بچه‌ها ممکن است ناگهان به جاده بدوند یا منحرف شوند."),
  S(True, "Jeg er forberedt på biler, der standser for at sætte børn af.", "I am prepared for cars stopping to drop children off.",
    "آماده‌ی خودروهایی هستم که برای پیاده کردن بچه‌ها می‌ایستند.",
    "Forældre standser ofte uventet ved skolen om morgenen.", "Parents often stop unexpectedly at the school in the morning.",
    "والدین صبح‌ها اغلب بی‌خبر کنار مدرسه توقف می‌کنند."),
  S(False, "Børnene lærer trafikreglerne i skolen, så de løber ikke ud på vejen.",
    "The children learn the traffic rules at school, so they do not run out into the road.",
    "بچه‌ها قوانین راهنمایی را در مدرسه یاد می‌گیرند، پس به جاده نمی‌دوند.",
    "Selv om de kender reglerne, kan små børn glemme dem et øjeblik.", "Even if they know the rules, small children may forget them for a moment.",
    "حتی اگر قوانین را بدانند، بچه‌های کوچک ممکن است لحظه‌ای فراموششان کنند."),
)

Q(6073, "1.2", picture("""
Inside a car seen from the passenger side: the driver holds one hand to her forehead as if she has a headache; faint grey wisps
drawn in the air inside the car suggest exhaust fumes; through the side window the road outside.
MUST BE CLEARLY VISIBLE: the driver's hand at her forehead, the faint grey fumes inside the car.
MUST NOT APPEAR: text, logos."""),
  "Mens du kører, kan du lugte udstødningsgas inde i bilen, og du får lidt hovedpine. Hvad gør du?",
  "While you are driving, you can smell exhaust fumes inside the car, and you are getting a slight headache. What do you do?",
  "هنگام رانندگی بوی دود اگزوز را داخل خودرو حس می‌کنید و کمی سردرد گرفته‌اید. چه می‌کنید؟",
  S(True, "Jeg åbner vinduerne, holder ind og får bilen undersøgt, før jeg kører videre.",
    "I open the windows, pull in and have the car checked before I drive on.",
    "پنجره‌ها را باز می‌کنم، کنار می‌ایستم و پیش از ادامه‌ی راه خودرو را بررسی می‌کنم.",
    "Udstødningsgas indeholder kulilte, som er giftig og kan gøre dig træt og sløv.",
    "Exhaust fumes contain carbon monoxide, which is poisonous and can make you tired and drowsy.",
    "دود اگزوز مونوکسید کربن دارد که سمی است و ممکن است شما را خسته و خواب‌آلود کند."),
  S(False, "Jeg lukker vinduerne og skruer op for varmen.", "I close the windows and turn up the heating.",
    "پنجره‌ها را می‌بندم و بخاری را زیاد می‌کنم.",
    "Så kan gassen samle sig i bilen.", "Then the gas may build up inside the car.", "در این صورت گاز ممکن است داخل خودرو جمع شود."),
  S(False, "Hovedpinen skyldes nok noget andet, så jeg kører videre som normalt.",
    "The headache is probably caused by something else, so I drive on as normal.",
    "احتمالاً سردرد دلیل دیگری دارد، پس مثل همیشه ادامه می‌دهم.",
    "Hovedpine kan være et tegn på kulilteforgiftning, og det er farligt at fortsætte.",
    "A headache may be a sign of carbon monoxide poisoning, and it is dangerous to carry on.",
    "سردرد ممکن است نشانه‌ی مسمومیت با مونوکسید کربن باشد و ادامه دادن خطرناک است."),
  S(False, "Lugten forsvinder af sig selv, når motoren bliver varm.", "The smell disappears by itself when the engine warms up.",
    "وقتی موتور گرم شود، بو خودبه‌خود از بین می‌رود.",
    "En utæt udstødning bliver ikke tæt af varme og skal repareres.", "A leaking exhaust does not seal itself when warm and must be repaired.",
    "اگزوزِ نشتی با گرم شدن درست نمی‌شود و باید تعمیر شود."),
)

Q(6074, "7.7", view("""
THE SCENE: a narrow country road without a centre line, hedges on both sides; a tractor with a front loader comes towards us; its
pallet forks are raised to about the height of our windscreen and stick out well in front of the tractor.
MUST BE CLEARLY VISIBLE: the tractor, the raised forks sticking out in front at windscreen height, the narrow road.
MUST NOT APPEAR: signs, text."""),
  "På en smal vej kommer en traktor med en frontlæsser imod dig. Gaflerne foran stikker frem i højde med din forrude. Hvordan forholder "
  "du dig?",
  "On a narrow road a tractor with a front loader is coming towards you. The forks at the front stick out at the height of your "
  "windscreen. What do you do?",
  "در جاده‌ای باریک تراکتوری با بیل جلو از روبه‌رو می‌آید. شاخک‌های جلوی آن هم‌ارتفاع شیشه‌ی جلوی شما بیرون زده‌اند. چه می‌کنید؟",
  S(True, "Jeg holder godt til højre, sætter farten ned og standser, hvis der ikke er plads nok.",
    "I keep well to the right, slow down and stop if there is not enough room.",
    "کاملاً به راست می‌روم، سرعتم را کم می‌کنم و اگر جای کافی نبود، می‌ایستم.",
    "Gaflerne rager langt frem og kan ramme bilen, hvis I mødes for tæt.",
    "The forks reach far forward and may hit the car if you meet too close.",
    "شاخک‌ها خیلی جلو آمده‌اند و اگر خیلی نزدیک از کنار هم رد شوید، ممکن است به خودرو بخورند."),
  S(False, "Jeg kører forbi med samme fart, fordi traktoren skal holde tilbage for mig.",
    "I drive past at the same speed, because the tractor must give way to me.",
    "با همان سرعت رد می‌شوم، چون تراکتور باید به من راه بدهد.",
    "Der er ingen regel om, at traktoren skal vige; I skal begge vise hensyn ved mødet.",
    "There is no rule that the tractor must give way; you must both show consideration when you meet.",
    "هیچ قاعده‌ای نمی‌گوید تراکتور باید کنار برود؛ هر دو باید هنگام عبور از کنار هم ملاحظه کنید."),
  S(False, "Gaflerne er ingen fare, fordi de sidder højt.", "The forks are no danger because they are high up.",
    "شاخک‌ها خطری ندارند، چون بالا هستند.",
    "De sidder i højde med din forrude og kan gå gennem ruden ved et sammenstød.",
    "They are at the height of your windscreen and could go through it in a collision.",
    "آن‌ها هم‌ارتفاع شیشه‌ی جلوی شما هستند و در برخورد ممکن است از شیشه رد شوند."),
)

Q(6075, "4.4", picture("""
A bedside table in the early morning: a small medicine box and a blister pack with one tablet missing, a glass of water, and a set of
car keys beside them; morning light through the curtains.
MUST BE CLEARLY VISIBLE: the medicine box and the blister pack with a tablet missing, the car keys.
MUST NOT APPEAR: brand names, readable text."""),
  "Du tog en sovepille sent i går aftes. Nu er det morgen, og du føler dig stadig lidt sløv. Du skal på arbejde. Hvad gælder?",
  "You took a sleeping pill late last night. Now it is morning, and you still feel a little drowsy. You have to go to work. What "
  "applies?",
  "دیشب دیروقت یک قرص خواب خوردید. اکنون صبح است و هنوز کمی گیج و خواب‌آلودید. باید سر کار بروید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg lader bilen stå, fordi sovepillen stadig kan påvirke mig.", "I leave the car, because the sleeping pill may still affect me.",
    "خودرو را نمی‌برم، چون قرص خواب ممکن است هنوز روی من اثر داشته باشد.",
    "Nogle sovemidler virker mange timer efter, og du må ikke køre, hvis du ikke kan køre helt sikkert.",
    "Some sleeping pills work for many hours, and you must not drive if you cannot drive fully safely.",
    "اثر برخی قرص‌های خواب ساعت‌ها باقی می‌ماند و اگر نتوانید کاملاً ایمن برانید، نباید رانندگی کنید."),
  S(False, "Sovepiller virker kun, mens jeg sover.", "Sleeping pills only work while I am asleep.", "قرص خواب فقط وقتی خوابم اثر دارد.",
    "Virkningen kan vare til langt ud på dagen.", "The effect can last well into the day.", "اثر آن ممکن است تا ساعت‌ها پس از بیدار شدن بماند."),
  S(False, "Det er kun medicin med rød advarselstrekant, der kan påvirke mig næste dag.",
    "Only medicine with a red warning triangle can affect me the next day.",
    "فقط داروهایی که مثلث هشدار قرمز دارند، می‌توانند روز بعد روی من اثر بگذارند.",
    "Også anden medicin kan gøre dig sløv; det afgørende er, hvordan du har det.",
    "Other medicine can also make you drowsy; what matters is how you feel.",
    "داروهای دیگر هم ممکن است شما را خواب‌آلود کنند؛ ملاک حال شماست."),
)
