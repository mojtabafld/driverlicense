# «آزمون جدید», batch 3 (5201–5300), part b: straight on at junctions (7.12), left turns (7.14), right turns (7.13),
# approaching junctions (7.11), roundabouts (7.15), other road users (4.5), signals in good time (6.2).
# Rules: Færdselsloven §§ 4, 15, 16, 26, 27, 32, 41; Bekendtgørelse om vejafmærkning §§ 65–66 (light signals: yellow, the
# arrow signal X 12, the cyclist signal X 16), B 11 and S 11 (give way).
from nq import Q, S, above, picture, town, view

Q(5226, "7.12", above("""
THE SCENE: a junction seen from above: a main road runs left-right; a side road comes up from the bottom of the picture and meets it.
At the end of the side road: shark teeth (a row of white triangles) across the lane and a give-way sign (inverted white triangle with a
red border). Along the near side of the main road runs a two-way cycle path, separated from the carriageway by a kerb, with a broken
centre line and white bicycle symbols with arrows pointing both ways.
VEHICLES (colour code used strictly): a RED car (ours) at the shark teeth on the side road; a cyclist on the cycle path coming from the
RIGHT (riding towards the left); another cyclist on the cycle path coming from the left; a grey car on the main road coming from the
left. A SOLID GREEN arrow from the red car straight across the cycle path and the main road, drawn after the others have passed.
MUST NOT APPEAR: traffic lights, text."""),
  "Du kommer ad en sidevej med hajtænder og en vigepligtstavle og skal ligeud over hovedvejen. Langs hovedvejen er der en dobbeltrettet cykelsti. Hvad gælder?",
  "You are coming along a side road with shark teeth and a give-way sign and are going straight across the main road. Along the main road there is a two-way cycle path. What applies?",
  "از جاده‌ای فرعی با خط دندان‌کوسه و تابلوی حق تقدم می‌آیید و می‌خواهید مستقیم از جاده‌ی اصلی رد شوید. کنار جاده‌ی اصلی مسیر دوچرخه‌ی دوطرفه هست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for cyklister på cykelstien fra begge retninger.", "I must give way to cyclists on the cycle path from both directions.",
    "باید به دوچرخه‌سوارهای مسیر دوچرخه از هر دو جهت راه بدهم.",
    "Ubetinget vigepligt gælder den kørende færdsel fra begge sider, også cyklister på cykelstien.",
    "The duty to give way applies to traffic from both sides, also cyclists on the cycle path.",
    "حق تقدم مطلق برای ترافیک هر دو طرف است، از جمله دوچرخه‌سوارهای مسیر دوچرخه."),
  S(True, "Jeg skal holde tilbage for bilerne på hovedvejen fra både venstre og højre.", "I must give way to the cars on the main road from both left and right.",
    "باید به خودروهای جاده‌ی اصلی، هم از چپ و هم از راست، راه بدهم.",
    "Med ubetinget vigepligt skal du holde tilbage for al kørende færdsel på den vej, du kører ind på eller over.",
    "With an unconditional duty to give way, you must give way to all traffic on the road you drive onto or across.",
    "با حق تقدم مطلق باید به همه‌ی ترافیک جاده‌ای که واردش می‌شوید یا از آن رد می‌شوید راه بدهید."),
  S(True, "Jeg viser i god tid, at jeg vil holde tilbage, ved at sætte farten ned eller standse.", "I show in good time that I will give way by slowing down or stopping.",
    "به موقع با کم کردن سرعت یا ایستادن نشان می‌دهم که راه می‌دهم.",
    "Den, der har vigepligt, skal tydeligt og i god tid vise det ved at nedsætte farten eller standse.",
    "Whoever has to give way must show it clearly and in good time by slowing down or stopping.",
    "کسی که باید راه بدهد، باید به‌روشنی و به موقع با کم کردن سرعت یا ایستادن این را نشان دهد."),
  S(False, "Cyklister fra højre på cykelstien skal holde tilbage for mig.", "Cyclists from the right on the cycle path must give way to me.",
    "دوچرخه‌سوارهایی که از راست روی مسیر دوچرخه می‌آیند باید به من راه بدهند.",
    "Du har ubetinget vigepligt for alle; på en dobbeltrettet sti kan cyklister komme fra begge retninger.",
    "You must give way to everyone; on a two-way path cyclists can come from both directions.",
    "شما باید به همه راه بدهید؛ در مسیر دوطرفه دوچرخه‌سوار از هر دو جهت می‌آید."),
)

Q(5227, "7.12", town("""
THE SCENE: a residential area: our road runs straight on through a T-junction; a side road joins from the RIGHT. A blue car is coming
along the side road from the right, about to reach the junction. There are no signs and no markings on any of the roads.
MUST BE CLEARLY VISIBLE: the T-junction, the blue car on the side road to the right, that there are no shark teeth or signs.
MUST NOT APPEAR: signs, road markings, text."""),
  "Du kører ligeud ad vejen gennem et T-kryds uden tavler og afmærkning. Fra sidevejen til højre kommer en bil. Hvad gælder?",
  "You are driving straight on along the road through a T-junction without signs or markings. A car is coming from the side road on the right. What applies?",
  "در امتداد جاده از یک سه‌راهی بدون تابلو و خط‌کشی مستقیم می‌روید. خودرویی از جاده‌ی فرعی سمت راست می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for bilen fra højre.", "I must give way to the car from the right.", "باید به خودرویی که از راست می‌آید راه بدهم.",
    "Uden tavler og afmærkning gælder højrevigepligt, også i et T-kryds.", "Without signs or markings the right-hand rule applies, also at a T-junction.",
    "بدون تابلو و خط‌کشی، قاعده‌ی دست راست برقرار است، در سه‌راهی هم."),
  S(False, "Jeg har forkørselsret, fordi jeg kører på den gennemgående vej.", "I have the right of way because I am on the road that goes straight through.",
    "حق تقدم با من است، چون در جاده‌ی سرتاسری می‌رانم.",
    "Den gennemgående vej giver kun forkørselsret, hvis det er afmærket, fx med hajtænder på sidevejen.",
    "The road going through only gives the right of way if it is marked, for example with shark teeth on the side road.",
    "جاده‌ی سرتاسری فقط وقتی حق تقدم می‌دهد که علامت داشته باشد، مثلاً خط دندان‌کوسه روی فرعی."),
  S(True, "Jeg sætter farten ned i god tid, så føreren kan se, at jeg holder tilbage.", "I slow down in good time so that the driver can see that I am giving way.",
    "به موقع سرعت را کم می‌کنم تا راننده ببیند که راه می‌دهم.",
    "Den, der har vigepligt, skal vise det tydeligt og i god tid.", "Whoever has to give way must show it clearly and in good time.",
    "کسی که باید راه بدهد، باید این را به‌روشنی و به موقع نشان دهد."),
  S(False, "Bilen fra højre skal holde tilbage, fordi den kommer fra en mindre vej.", "The car from the right must give way because it is coming from a smaller road.",
    "خودروی سمت راست باید راه بدهد، چون از جاده‌ی کوچک‌تری می‌آید.",
    "Vejens størrelse ændrer ikke højrevigepligten; det gør kun tavler og afmærkning.", "The size of the road does not change the right-hand rule; only signs and markings do.",
    "اندازه‌ی جاده قاعده‌ی دست راست را تغییر نمی‌دهد؛ فقط تابلو و خط‌کشی."),
)

Q(5228, "7.12", view("""
THE SCENE: we are about to drive out of a residential side road onto a bigger road. The pavement (grey paving slabs) and the cycle path
(asphalt, beside the pavement) along the bigger road continue without a break across the mouth of our side road, raised above the
carriageway: we must drive up a low ramp and over them. A pedestrian walks along the pavement from the right; a cyclist rides on the
cycle path from the left. Beyond them, the bigger road with a car passing.
MUST BE CLEARLY VISIBLE: the pavement and cycle path continuing across in front of us, the ramp, the pedestrian and the cyclist.
MUST NOT APPEAR: signs, shark teeth, text."""),
  "Du kører ud fra en sidevej. Fortovet og cykelstien langs den større vej fortsætter i deres egen højde hen over sidevejens udmunding, og du skal køre op over dem. Der er ingen tavler. Hvad gælder?",
  "You are driving out of a side road. The pavement and the cycle path along the bigger road continue across the mouth of the side road at their own level, and you have to drive up over them. There are no signs. What applies?",
  "از جاده‌ای فرعی بیرون می‌آیید. پیاده‌رو و مسیر دوچرخه‌ی کنار جاده‌ی بزرگ‌تر، هم‌سطح خودشان از جلوی دهانه‌ی فرعی می‌گذرند و باید از رویشان رد شوید. تابلویی نیست. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har ubetinget vigepligt for den trafik, jeg skal ind i.", "I have an unconditional duty to give way to the traffic I am driving into.",
    "در برابر ترافیکی که واردش می‌شوم حق تقدم مطلق با دیگران است.",
    "Ved udkørsel fra en vej over et fortov eller en cykelsti, der er hævet over kørebanen, har du ubetinget vigepligt.",
    "When you drive out of a road over a pavement or cycle path raised above the carriageway, you have an unconditional duty to give way.",
    "وقتی از جاده‌ای از روی پیاده‌رو یا مسیر دوچرخه‌ای که بالاتر از سواره‌روست بیرون می‌آیید، باید بی‌قید و شرط راه بدهید."),
  S(True, "Jeg skal holde tilbage for den gående på fortovet og for cyklisten på cykelstien.", "I must give way to the pedestrian on the pavement and to the cyclist on the cycle path.",
    "باید به عابرِ پیاده‌رو و دوچرخه‌سوارِ مسیر دوچرخه راه بدهم.",
    "Når du kører over et fortov, skal du holde tilbage for gående, og vigepligten gælder også cyklisterne.",
    "When you drive over a pavement you must give way to pedestrians, and your duty to give way also covers the cyclists.",
    "وقتی از روی پیاده‌رو رد می‌شوید باید به عابران راه بدهید و وظیفه‌ی راه دادن شامل دوچرخه‌سوارها هم هست."),
  S(False, "Højrevigepligten gælder, fordi der ikke er nogen tavle.", "The right-hand rule applies because there is no sign.", "قاعده‌ی دست راست برقرار است، چون تابلویی نیست.",
    "Udkørslen over det hævede fortov giver ubetinget vigepligt, også uden tavle.", "The exit over the raised pavement gives an unconditional duty to give way, also without a sign.",
    "خروج از روی پیاده‌روی بلندتر، حتی بدون تابلو، حق تقدم را مطلقاً به دیگران می‌دهد."),
  S(False, "Cyklisten skal holde tilbage for mig, fordi han kommer fra venstre.", "The cyclist must give way to me because he is coming from the left.",
    "دوچرخه‌سوار باید به من راه بدهد، چون از چپ می‌آید.",
    "Du har vigepligt for trafikken fra begge sider.", "You must give way to the traffic from both sides.", "شما باید به ترافیک هر دو طرف راه بدهید."),
)

Q(5229, "7.12", town("""
THE SCENE: a junction with traffic lights in town; our signal shows GREEN. Right in front of us a young man runs across the zebra
crossing over our lane; the pedestrian signal on the far side shows a red standing figure.
MUST BE CLEARLY VISIBLE: our green signal, the running man on the crossing, the red pedestrian signal.
MUST NOT APPEAR: other pedestrians, text."""),
  "Du har grønt lys og skal ligeud. En ung mand løber ud på fodgængerfeltet foran dig, selv om han har rødt. Hvordan forholder du dig?",
  "You have a green light and are going straight on. A young man runs out onto the pedestrian crossing in front of you even though he has a red light. What do you do?",
  "چراغ شما سبز است و مستقیم می‌روید. مرد جوانی با این‌که چراغش قرمز است، روی گذرگاه عابر جلوی شما می‌دود. چه می‌کنید؟",
  S(True, "Jeg bremser og gør, hvad jeg kan, for at undgå at ramme ham.", "I brake and do what I can to avoid hitting him.", "ترمز می‌کنم و هر کاری بتوانم می‌کنم تا به او نزنم.",
    "Grønt lys fritager dig ikke for at undgå et uheld.", "A green light does not free you from avoiding an accident.", "چراغ سبز شما را از پرهیز از تصادف معاف نمی‌کند."),
  S(True, "Jeg skal holde tilbage for gående, der er i feltet, selv om jeg har grønt.", "I must give way to pedestrians who are on the crossing, even though I have green.",
    "باید به عابرانی که روی گذرگاه هستند راه بدهم، حتی اگر چراغم سبز باشد.",
    "Selv om signalet giver dig lov til at køre, skal du holde tilbage for gående, der er i feltet.",
    "Even though the signal lets you drive, you must give way to pedestrians who are on the crossing.",
    "حتی اگر چراغ اجازه‌ی حرکت بدهد، باید به عابرانی که روی گذرگاه هستند راه بدهید."),
  S(False, "Jeg kører videre, fordi han har rødt og selv må tage ansvaret.", "I drive on because he has a red light and must take the responsibility himself.",
    "ادامه می‌دهم، چون چراغ او قرمز است و خودش مسئول است.",
    "Du skal holde tilbage for gående i feltet, også når de går over for rødt.", "You must give way to pedestrians on the crossing, also when they cross on red.",
    "باید به عابرانِ روی گذرگاه راه بدهید، حتی وقتی با چراغ قرمز رد می‌شوند."),
)

Q(5230, "7.12", view("""
THE SCENE: we are waiting at the end of a side road at shark teeth (a row of white triangles across our lane) before a main road that
runs left-right. From the LEFT a white car comes along the main road towards the junction with its RIGHT indicator flashing (an orange
light at its front right corner), as if it will turn into our side road. The main road to the right is clear.
MUST BE CLEARLY VISIBLE: the shark teeth, the white car from the left with its right indicator on.
MUST NOT APPEAR: traffic lights, text."""),
  "Du venter ved hajtænderne på at køre ligeud over hovedvejen. En bil kommer fra venstre ad hovedvejen og blinker til højre, som om den vil ind på din vej. Hvordan forholder du dig?",
  "You are waiting at the shark teeth to drive straight across the main road. A car is coming from the left along the main road with its right indicator on, as if it is going to turn into your road. What do you do?",
  "پشت خط دندان‌کوسه منتظرید تا مستقیم از جاده‌ی اصلی رد شوید. خودرویی از چپ در جاده‌ی اصلی می‌آید و راهنمای راست زده، گویی می‌خواهد وارد جاده‌ی شما شود. چه می‌کنید؟",
  S(True, "Jeg venter, til jeg kan se, at bilen virkelig svinger.", "I wait until I can see that the car really is turning.", "صبر می‌کنم تا ببینم آن خودرو واقعاً می‌پیچد.",
    "Føreren kan have glemt at slukke blinklyset eller vil svinge længere fremme.", "The driver may have forgotten to cancel the indicator or may be turning further on.",
    "ممکن است راننده خاموش کردن راهنما را فراموش کرده باشد یا جلوتر بپیچد."),
  S(False, "Jeg kører ud, så snart bilen blinker, for så skal den ikke ligeud.", "I drive out as soon as the car signals, because then it is not going straight on.",
    "به محض این‌که راهنما زد حرکت می‌کنم، چون پس مستقیم نمی‌رود.",
    "Et blinklys er ingen garanti; du har stadig ubetinget vigepligt.", "An indicator is no guarantee; you still have an unconditional duty to give way.",
    "راهنما تضمین نیست؛ شما همچنان باید بی‌قید و شرط راه بدهید."),
  S(False, "Når bilen blinker, har den pligt til at svinge, så jeg kan køre.", "When the car signals, it is obliged to turn, so I can go.",
    "وقتی راهنما می‌زند، موظف است بپیچد، پس می‌توانم بروم.",
    "Blinklyset forpligter ikke føreren; du må først køre, når det kan ske uden fare.", "The indicator does not bind the driver; you may only go when it can be done without danger.",
    "راهنما راننده را متعهد نمی‌کند؛ فقط وقتی بروید که بی‌خطر باشد."),
  S(False, "Jeg blinker med forlygterne for at vise, at jeg kører først.", "I flash my headlights to show that I am going first.", "با چراغ جلو چشمک می‌زنم تا نشان دهم اول می‌روم.",
    "Du har vigepligt og skal vise, at du holder tilbage, ikke det modsatte.", "You have to give way and must show that you are holding back, not the opposite.",
    "شما باید راه بدهید و باید نشان دهید که صبر می‌کنید، نه برعکس."),
)

Q(5231, "7.12", town("""
THE SCENE: a junction with traffic lights, seen from the driver's seat; we stand at the stop line and are going straight on. Our signal
(three round lamps) shows RED. To the right of it, beside the cycle path, a smaller signal head with a small white plate showing a black
bicycle above its lamps shows GREEN, and two cyclists on the cycle path beside us are starting to ride across.
MUST BE CLEARLY VISIBLE: our red signal, the small cyclist signal showing green with the bicycle plate, the cyclists starting.
MUST NOT APPEAR: text."""),
  "Du holder for rødt i krydset og skal ligeud. Ved siden af dit signal står et mindre signal med et cykelsymbol, og det skifter til grønt. Hvad gælder?",
  "You are stopped at a red light in the junction and are going straight on. Beside your signal there is a smaller signal with a bicycle symbol, and it changes to green. What applies?",
  "پشت چراغ قرمز تقاطع ایستاده‌اید و می‌خواهید مستقیم بروید. کنار چراغ شما چراغ کوچک‌تری با علامت دوچرخه هست که سبز می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg venter, til mit eget signal viser grønt.", "I wait until my own signal shows green.", "صبر می‌کنم تا چراغ خودم سبز شود.",
    "Signalet med cykelsymbol gælder kun cyklister og små knallerter, der kører samme sted.", "The signal with the bicycle symbol only applies to cyclists and small mopeds riding there.",
    "چراغی که علامت دوچرخه دارد فقط برای دوچرخه‌سوارها و موپدهای کوچکی است که همان‌جا می‌رانند."),
  S(False, "Jeg må køre, fordi cyklisterne har fået grønt.", "I may go because the cyclists have got green.", "می‌توانم بروم، چون چراغ دوچرخه‌ها سبز شده است.",
    "Du skal følge dit eget signal.", "You must follow your own signal.", "باید از چراغ خودتان پیروی کنید."),
  S(False, "Jeg må køre, hvis der ikke kommer cyklister.", "I may go if no cyclists are coming.", "اگر دوچرخه‌سواری نیاید، می‌توانم بروم.",
    "Rødt lys betyder stop, uanset hvad cyklistsignalet viser.", "A red light means stop, whatever the cyclist signal shows.", "چراغ قرمز یعنی ایست، چراغ دوچرخه هر چه نشان دهد."),
  S(False, "Det grønne cykelsignal betyder, at alle i min retning må køre.", "The green cyclist signal means that everyone in my direction may go.",
    "چراغ سبز دوچرخه یعنی همه‌ی کسانی که در جهت من هستند می‌توانند بروند.",
    "Cyklistsignalet gælder kun for cyklister.", "The cyclist signal only applies to cyclists.", "چراغ دوچرخه فقط برای دوچرخه‌سوارهاست."),
)

Q(5232, "7.12", town("""
THE SCENE: a junction with traffic lights in town; our signal shows GREEN and we are going straight on. In the middle of the junction
an oncoming dark-blue car stands waiting to turn LEFT (to our right side), its left indicator flashing.
MUST BE CLEARLY VISIBLE: our green signal, the oncoming car waiting in the junction with its left indicator on.
MUST NOT APPEAR: pedestrians on the crossings, text."""),
  "Du har grønt lys og skal ligeud. En modkørende bil holder midt i krydset og venter på at svinge til venstre. Hvad gælder?",
  "You have a green light and are going straight on. An oncoming car is waiting in the middle of the junction to turn left. What applies?",
  "چراغ شما سبز است و مستقیم می‌روید. خودرویی از روبه‌رو وسط تقاطع منتظر گردش به چپ است. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen skal holde tilbage for mig, fordi den skal svinge til venstre.", "The car must give way to me because it is turning left.",
    "آن خودرو باید به من راه بدهد، چون به چپ می‌پیچد.",
    "Den, der svinger til venstre, må ikke være til ulempe for modkørende færdsel.", "Whoever turns left must not inconvenience oncoming traffic.",
    "کسی که به چپ می‌پیچد نباید برای ترافیک روبه‌رو مزاحمت ایجاد کند."),
  S(True, "Jeg holder øje med bilen og er klar til at bremse, hvis den alligevel svinger ud foran mig.", "I keep an eye on the car and am ready to brake if it turns out in front of me anyway.",
    "مراقب آن خودرو هستم و اگر با این حال جلوی من بپیچد، آماده‌ی ترمزم.",
    "Du må regne med, at andre følger reglerne, men skal være klar, hvis de ikke gør.", "You may count on others following the rules, but must be ready if they do not.",
    "می‌توانید فرض کنید دیگران قواعد را رعایت می‌کنند، ولی اگر نکردند باید آماده باشید."),
  S(False, "Jeg standser og lader bilen svinge først.", "I stop and let the car turn first.", "می‌ایستم تا آن خودرو اول بپیچد.",
    "Du har forkørselsret; en unødig standsning kan forvirre og overraske dem bag dig.", "You have the right of way; an unnecessary stop can confuse and surprise those behind you.",
    "حق تقدم با شماست؛ ایستادن بی‌دلیل ممکن است پشت‌سری‌ها را گیج و غافلگیر کند."),
  S(False, "Jeg dytter, så bilen ved, at den skal vente.", "I sound the horn so that the car knows it must wait.", "بوق می‌زنم تا آن خودرو بداند باید صبر کند.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.", "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5233, "7.12", town("""
THE SCENE: a junction with traffic lights in town, seen from the driver's seat at speed; the stop line is only a few metres in front of
the car, and the signal has just changed from green to YELLOW. A car follows close behind us (visible in the interior rear-view mirror
at the top of the picture).
MUST BE CLEARLY VISIBLE: the yellow signal, the stop line just in front of us, the car behind in the mirror.
MUST NOT APPEAR: pedestrians, text."""),
  "Du kører 50 km/t, og lyset skifter fra grønt til gult, lige da du er få meter fra stoplinjen. Hvad gælder?",
  "You are driving at 50 km/h, and the light changes from green to yellow just as you are a few metres from the stop line. What applies?",
  "با ۵۰ کیلومتر بر ساعت می‌رانید و درست وقتی چند متر تا خط ایست مانده، چراغ از سبز به زرد تغییر می‌کند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må fortsætte, hvis en standsning nu vil medføre fare.", "I may continue if stopping now would cause danger.", "اگر ایستادن در این لحظه خطرناک باشد، می‌توانم ادامه دهم.",
    "Gult betyder stop, men du skal ikke standse, hvis du er så tæt på, at en standsning vil medføre fare.",
    "Yellow means stop, but you should not stop if you are so close that stopping would cause danger.",
    "زرد یعنی ایست، ولی اگر آن‌قدر نزدیک باشید که ایستادن خطر بسازد، نباید بایستید."),
  S(False, "Gult lys betyder, at jeg skal sætte farten op for at nå over.", "A yellow light means I should speed up to get across.", "چراغ زرد یعنی باید سرعتم را زیاد کنم تا رد شوم.",
    "Gult betyder stop; du må kun fortsætte, hvis en standsning vil medføre fare.", "Yellow means stop; you may only continue if stopping would cause danger.",
    "زرد یعنی ایست؛ فقط وقتی می‌توانید ادامه دهید که ایستادن خطرناک باشد."),
  S(True, "Havde jeg været længere fra stoplinjen og kunnet standse sikkert, skulle jeg have standset.", "Had I been further from the stop line and able to stop safely, I should have stopped.",
    "اگر از خط ایست دورتر بودم و می‌توانستم بی‌خطر بایستم، باید می‌ایستادم.",
    "Gult lys har samme betydning som rødt, når du kan standse uden fare.", "A yellow light means the same as red when you can stop without danger.",
    "وقتی بتوانید بی‌خطر بایستید، چراغ زرد همان معنای قرمز را دارد."),
)

Q(5234, "7.14", town("""
THE SCENE: a large junction with traffic lights in town. We stand in a left-turn lane (a white arrow pointing left painted on the lane).
Our signal head has arrow-shaped lamps and shows a GREEN ARROW pointing left; the oncoming traffic is stopped at its stop line. On the
road we are turning into, to the left, there is a zebra crossing with a woman walking across it.
MUST BE CLEARLY VISIBLE: the green left arrow, the left-turn lane, the zebra crossing on the road to the left with the woman.
MUST NOT APPEAR: text."""),
  "Du holder i venstresvingsbanen. Dit signal viser en grøn pil mod venstre. Hvad gælder?",
  "You are in the left-turn lane. Your signal shows a green arrow to the left. What applies?",
  "در خط گردش به چپ هستید. چراغ شما فلش سبز به چپ نشان می‌دهد. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må svinge til venstre.", "I may turn left.", "می‌توانم به چپ بپیچم.",
    "Et pilsignal gælder for dem, der skal køre i pilens retning.", "An arrow signal applies to those who are going in the direction of the arrow.",
    "چراغ فلش‌دار برای کسانی است که در جهت فلش می‌روند."),
  S(True, "Jeg skal stadig holde tilbage for gående, der er i feltet på den vej, jeg svinger ind på.", "I must still give way to pedestrians on the crossing of the road I am turning into.",
    "همچنان باید به عابرانی که روی گذرگاهِ جاده‌ی مقصد هستند راه بدهم.",
    "Selv om signalet giver dig lov til at køre, skal du holde tilbage for gående i feltet.", "Even though the signal lets you drive, you must give way to pedestrians on the crossing.",
    "حتی اگر چراغ اجازه‌ی حرکت بدهد، باید به عابرانِ روی گذرگاه راه بدهید."),
  S(True, "Jeg holder øje med, om der alligevel kommer nogen ind i krydset, fx en, der kører over for rødt.", "I watch out in case someone enters the junction anyway, for example someone running a red light.",
    "حواسم هست که با این حال کسی وارد تقاطع نشود، مثلاً کسی که از چراغ قرمز رد می‌شود.",
    "Grønt lys fritager dig ikke for at se dig for.", "A green light does not free you from looking out.", "چراغ سبز شما را از نگاه کردن به اطراف معاف نمی‌کند."),
  S(False, "Den grønne pil betyder, at jeg også må køre ligeud.", "The green arrow means that I may also go straight on.", "فلش سبز یعنی می‌توانم مستقیم هم بروم.",
    "Pilen gælder kun i pilens retning.", "The arrow only applies in its own direction.", "فلش فقط برای جهت خودش است."),
)

Q(5235, "7.14", view("""
THE SCENE: a residential two-way road with a pavement on each side. On the LEFT, a little ahead, is the driveway of a house, crossing
the left pavement. Our left indicator lamp glows on the dashboard strip. An oncoming car approaches in the other lane about 60 m away,
and a man walks along the left pavement towards the driveway.
MUST BE CLEARLY VISIBLE: the driveway on the left across the pavement, the oncoming car, the man on the pavement.
MUST NOT APPEAR: signs, text.""", scenery="Scenery is reduced to simple flat house fronts, pavements and a few trees."),
  "Du vil svinge til venstre ind i en indkørsel til et hus. Du skal krydse den modkørende vognbane og fortovet. Hvad gælder?",
  "You want to turn left into the driveway of a house. You have to cross the oncoming lane and the pavement. What applies?",
  "می‌خواهید به چپ وارد ورودیِ یک خانه شوید. باید از خط روبه‌رو و پیاده‌رو رد شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må først svinge, når det kan ske uden ulempe for de modkørende.", "I may only turn when it can be done without inconvenience to oncoming traffic.",
    "فقط وقتی می‌توانم بپیچم که برای خودروهای روبه‌رو مزاحمتی نداشته باشد.",
    "Reglen for venstresving gælder også, når du kører bort fra kørebanen uden for et kryds.", "The rule for left turns also applies when you leave the carriageway outside a junction.",
    "قاعده‌ی گردش به چپ وقتی بیرون از تقاطع از سواره‌رو خارج می‌شوید هم برقرار است."),
  S(True, "Jeg skal holde tilbage for gående på fortovet.", "I must give way to pedestrians on the pavement.", "باید به عابرانِ پیاده‌رو راه بدهم.",
    "Når du kører over et fortov, skal du holde tilbage for gående.", "When you drive over a pavement, you must give way to pedestrians.",
    "وقتی از روی پیاده‌رو رد می‌شوید، باید به عابران راه بدهید."),
  S(True, "Jeg giver tegn til venstre i god tid og placerer mig ind mod midten af vejen.", "I signal left in good time and position myself towards the middle of the road.",
    "به موقع راهنمای چپ می‌زنم و به سمت وسط جاده می‌روم.",
    "Ved venstresving skal du give tegn og så vidt muligt placere dig ind mod kørebanens midte.", "For a left turn you must signal and keep as close as possible to the middle of the carriageway.",
    "برای گردش به چپ باید راهنما بزنید و تا جای ممکن به وسط سواره‌رو نزدیک شوید."),
  S(False, "Jeg kan svinge med det samme, fordi de modkørende kan se mit blinklys.", "I can turn straight away because oncoming drivers can see my indicator.",
    "می‌توانم فوراً بپیچم، چون خودروهای روبه‌رو راهنمای مرا می‌بینند.",
    "Blinklyset giver dig ikke ret til at svinge foran de modkørende.", "The indicator does not give you the right to turn in front of oncoming traffic.",
    "راهنما به شما حق نمی‌دهد جلوی خودروهای روبه‌رو بپیچید."),
)

Q(5236, "7.14", above("""
THE SCENE: a crossroads seen from above, one lane in each direction on both roads.
VEHICLES (colour code used strictly): a RED car (ours) stands in the middle of the junction, close to its centre, waiting to turn left;
its front wheels are drawn clearly, pointing STRAIGHT ahead. A grey car stands behind it. Two oncoming cars pass straight through the
junction in the other lane. A SOLID GREEN arrow shows the red car's later left turn into the road on the left.
MUST NOT APPEAR: traffic lights, signs, text."""),
  "Du holder stille midt i krydset og venter på at svinge til venstre. Hvordan skal forhjulene stå, mens du venter?",
  "You are standing still in the middle of the junction waiting to turn left. How should the front wheels point while you wait?",
  "وسط تقاطع ایستاده‌اید و منتظر گردش به چپ هستید. هنگام انتظار، چرخ‌های جلو باید چطور باشند؟",
  S(True, "Lige frem, så bilen ikke skubbes ud foran de modkørende, hvis nogen kører ind bagi.", "Straight ahead, so that the car is not pushed out in front of oncoming traffic if someone runs into the back.",
    "مستقیم، تا اگر کسی از پشت به خودرو زد، به جلوی خودروهای روبه‌رو پرتاب نشود.",
    "Står hjulene drejet, kan en påkørsel bagfra skubbe dig ud i den modkørende trafik.", "If the wheels are turned, a collision from behind can push you into the oncoming traffic.",
    "اگر چرخ‌ها چرخیده باشند، ضربه از پشت ممکن است شما را به میان ترافیک روبه‌رو بفرستد."),
  S(False, "Drejet til venstre, så jeg hurtigt kan komme af sted.", "Turned to the left, so that I can get away quickly.", "به چپ چرخیده، تا زود حرکت کنم.",
    "Det sparer næsten ingen tid og er farligt, hvis nogen kører ind bagi.", "It saves almost no time and is dangerous if someone runs into the back.",
    "تقریباً وقتی صرفه‌جویی نمی‌شود و اگر کسی از پشت بزند خطرناک است."),
  S(False, "Det er ligegyldigt, hvordan hjulene står.", "It does not matter how the wheels point.", "فرقی نمی‌کند چرخ‌ها چطور باشند.",
    "Hjulenes stilling betyder meget, hvis der sker en påkørsel bagfra.", "How the wheels point matters a lot if there is a collision from behind.",
    "اگر از پشت تصادف شود، جهت چرخ‌ها خیلی مهم است."),
)

Q(5237, "7.14", view("""
THE SCENE: a main road outside town. A little ahead a side road joins from the LEFT; at its end there are shark teeth (white triangles)
across its lane and a give-way sign. Our left indicator lamp glows on the dashboard strip. An oncoming car approaches in the other lane
about 80 m away.
MUST BE CLEARLY VISIBLE: the side road to the left with its shark teeth, the oncoming car.
MUST NOT APPEAR: traffic lights, text."""),
  "Du kører på en hovedvej og vil svinge til venstre ind ad en sidevej med hajtænder. En bil kommer imod dig. Hvad gælder?",
  "You are on a main road and want to turn left into a side road with shark teeth. A car is coming towards you. What applies?",
  "در جاده‌ی اصلی هستید و می‌خواهید به چپ وارد فرعی‌ای با خط دندان‌کوسه شوید. خودرویی از روبه‌رو می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for den modkørende bil.", "I must give way to the oncoming car.", "باید به خودروی روبه‌رو راه بدهم.",
    "Du må ikke svinge til venstre, før det kan ske uden ulempe for modkørende, heller ikke fra en hovedvej.",
    "You may not turn left until it can be done without inconvenience to oncoming traffic, not even from a main road.",
    "تا وقتی گردش به چپ برای خودروهای روبه‌رو مزاحمت نداشته باشد، نباید بپیچید، حتی از جاده‌ی اصلی."),
  S(False, "Jeg har forkørselsret, fordi jeg kører på hovedvejen.", "I have the right of way because I am on the main road.", "حق تقدم با من است، چون در جاده‌ی اصلی هستم.",
    "Hovedvejen giver forkørselsret over for trafikken fra sidevejene, ikke over for de modkørende.",
    "The main road gives the right of way over traffic from the side roads, not over oncoming traffic.",
    "جاده‌ی اصلی در برابر ترافیک فرعی‌ها حق تقدم می‌دهد، نه در برابر خودروهای روبه‌رو."),
  S(True, "Jeg giver tegn i god tid og placerer mig ind mod midten af vejen.", "I signal in good time and position myself towards the middle of the road.",
    "به موقع راهنما می‌زنم و به سمت وسط جاده می‌روم.",
    "Så kan de bagvedkørende passere til højre for dig, mens du venter.", "Then those behind can pass on your right while you wait.",
    "این‌طور پشت‌سری‌ها هنگام انتظار شما می‌توانند از سمت راستتان رد شوند."),
  S(False, "Den modkørende skal sætte farten ned, når jeg blinker.", "The oncoming driver must slow down when I signal.", "خودروی روبه‌رو باید وقتی راهنما می‌زنم سرعتش را کم کند.",
    "Blinklyset giver dig ikke ret til at svinge foran den modkørende.", "The indicator does not give you the right to turn in front of the oncoming driver.",
    "راهنما به شما حق نمی‌دهد جلوی خودروی روبه‌رو بپیچید."),
)

Q(5238, "7.14", view("""
THE SCENE: we stand at the end of a side road at shark teeth (white triangles across our lane), with a give-way sign on the right. A
main road runs left-right in front of us, one lane in each direction; a car comes from the left and another from the right. Our left
indicator lamp glows on the dashboard strip.
MUST BE CLEARLY VISIBLE: the shark teeth, the give-way sign, the cars coming from both sides.
MUST NOT APPEAR: traffic lights, text."""),
  "Du kommer ad en sidevej med hajtænder og vil svinge til venstre ind på hovedvejen. Hvad gælder?",
  "You are coming along a side road with shark teeth and want to turn left onto the main road. What applies?",
  "از فرعی‌ای با خط دندان‌کوسه می‌آیید و می‌خواهید به چپ وارد جاده‌ی اصلی شوید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for trafikken på hovedvejen fra både venstre og højre.", "I must give way to the traffic on the main road from both left and right.",
    "باید به ترافیک جاده‌ی اصلی، هم از چپ و هم از راست، راه بدهم.",
    "Hajtænderne giver ubetinget vigepligt for den kørende færdsel fra begge sider.", "The shark teeth give an unconditional duty to give way to traffic from both sides.",
    "خط دندان‌کوسه حق تقدم مطلق را به ترافیک هر دو طرف می‌دهد."),
  S(True, "Efter svinget skal jeg være i højre side af hovedvejen.", "After the turn I must be on the right-hand side of the main road.",
    "بعد از پیچیدن باید در سمت راست جاده‌ی اصلی باشم.",
    "Et sving skal ende i højre side af den vej, du svinger ind på.", "A turn must end on the right-hand side of the road you turn into.",
    "پیچیدن باید در سمت راستِ جاده‌ای که واردش می‌شوید تمام شود."),
  S(False, "Jeg må køre ud til midten af hovedvejen og vente der, når der kun kommer biler fra højre.", "I may drive out to the middle of the main road and wait there when cars are only coming from the right.",
    "وقتی فقط از راست خودرو می‌آید، می‌توانم تا وسط جاده‌ی اصلی بروم و آنجا صبر کنم.",
    "Du må først køre ud, når det kan ske uden fare eller ulempe for trafikken fra begge sider.", "You may only drive out when it can be done without danger or inconvenience to traffic from both sides.",
    "فقط وقتی می‌توانید وارد شوید که برای ترافیک هر دو طرف خطر یا مزاحمتی نداشته باشد."),
  S(False, "Højrevigepligten gælder, fordi jeg svinger til venstre.", "The right-hand rule applies because I am turning left.", "چون به چپ می‌پیچم، قاعده‌ی دست راست برقرار است.",
    "Hajtænderne ophæver højrevigepligten; du har ubetinget vigepligt.", "The shark teeth cancel the right-hand rule; you have an unconditional duty to give way.",
    "خط دندان‌کوسه قاعده‌ی دست راست را کنار می‌گذارد؛ شما باید بی‌قید و شرط راه بدهید."),
)

Q(5239, "7.13", town("""
THE SCENE: a junction with traffic lights in town, seen from the driver's seat; we stand at the stop line and want to turn RIGHT (our
right indicator lamp glows on the dashboard strip). On the cycle path to our right, at its stop line slightly in front of us, two
cyclists wait to go straight on. The signal has just changed to GREEN.
MUST BE CLEARLY VISIBLE: the two cyclists at the stop line on our right, the green signal.
MUST NOT APPEAR: text."""),
  "Du holder for rødt og vil svinge til højre. Foran dig ved stoplinjen holder to cyklister, som skal ligeud. Nu skifter lyset til grønt. Hvordan forholder du dig?",
  "You are stopped at a red light and want to turn right. In front of you at the stop line two cyclists are waiting who are going straight on. Now the light changes to green. What do you do?",
  "پشت چراغ قرمز هستید و می‌خواهید به راست بپیچید. جلوی شما کنار خط ایست دو دوچرخه‌سوار ایستاده‌اند که مستقیم می‌روند. حالا چراغ سبز می‌شود. چه می‌کنید؟",
  S(True, "Jeg lader cyklisterne køre over krydset, før jeg svinger.", "I let the cyclists ride across the junction before I turn.", "می‌گذارم دوچرخه‌سوارها از تقاطع رد شوند و بعد می‌پیچم.",
    "Når du svinger til højre, må du ikke være til ulempe for cyklister, der kører ligeud.", "When you turn right, you must not inconvenience cyclists going straight on.",
    "هنگام گردش به راست نباید برای دوچرخه‌سوارانی که مستقیم می‌روند مزاحمت ایجاد کنید."),
  S(False, "Jeg svinger hurtigt, før cyklisterne kommer i gang.", "I turn quickly before the cyclists get going.", "پیش از راه افتادن دوچرخه‌سوارها سریع می‌پیچم.",
    "Det kan føre til en farlig ulykke, hvor bilen svinger ind over cyklisterne.", "It can lead to a dangerous accident where the car turns across the cyclists.",
    "ممکن است به تصادفی خطرناک برسد که خودرو روی دوچرخه‌سوارها می‌پیچد."),
  S(True, "Jeg ser over højre skulder, før jeg svinger, fordi der kan komme flere cyklister bagfra.", "I look over my right shoulder before I turn, because more cyclists may come from behind.",
    "پیش از پیچیدن از روی شانه‌ی راست نگاه می‌کنم، چون ممکن است دوچرخه‌سوارهای دیگری از پشت بیایند.",
    "Cyklister kan være i den blinde vinkel ved siden af bilen.", "Cyclists may be in the blind spot beside the car.", "دوچرخه‌سوار ممکن است در نقطه‌ی کورِ کنار خودرو باشد."),
  S(False, "Cyklisterne skal vente, fordi bilerne kører først ved grønt.", "The cyclists must wait because cars go first on green.", "دوچرخه‌سوارها باید صبر کنند، چون با چراغ سبز اول خودروها می‌روند.",
    "Grønt gælder alle i retningen, og cyklister, der kører ligeud, skal ikke vente på højresvingende.",
    "Green applies to everyone in that direction, and cyclists going straight on do not have to wait for those turning right.",
    "سبز برای همه‌ی آن جهت است و دوچرخه‌سوارانی که مستقیم می‌روند لازم نیست منتظر گردش به راستی‌ها بمانند."),
)

Q(5240, "7.13", town("""
THE SCENE: a junction in town where we turn RIGHT into a side street (our right indicator lamp glows on the dashboard strip). A few
metres into the side street a zebra crossing runs across it, with the Danish crossing sign beside it; two pedestrians stand at its
kerb about to step onto it.
MUST BE CLEARLY VISIBLE: the zebra crossing just after the corner, the two pedestrians about to step out.
MUST NOT APPEAR: traffic lights, text."""),
  "Du vil svinge til højre. Lige efter hjørnet er der et fodgængerfelt på den vej, du skal ind på, og to fodgængere er på vej ud på det. Hvordan forholder du dig?",
  "You want to turn right. Just after the corner there is a pedestrian crossing on the road you are turning into, and two pedestrians are about to step onto it. What do you do?",
  "می‌خواهید به راست بپیچید. درست بعد از پیچ، روی جاده‌ای که واردش می‌شوید گذرگاه عابر پیاده هست و دو عابر می‌خواهند واردش شوند. چه می‌کنید؟",
  S(True, "Jeg svinger med lav fart og er klar til at standse før feltet.", "I turn at a low speed and am ready to stop before the crossing.",
    "با سرعت کم می‌پیچم و آماده‌ام پیش از گذرگاه بایستم.",
    "Du skal tilpasse farten, så der ikke opstår fare for gående, der er på vej ud i feltet.", "You must adjust your speed so that there is no danger to pedestrians about to step onto the crossing.",
    "باید سرعت را طوری تنظیم کنید که برای عابرانی که می‌خواهند وارد گذرگاه شوند خطری پیش نیاید."),
  S(True, "Jeg standser og lader fodgængerne gå over, før jeg kører videre.", "I stop and let the pedestrians cross before I drive on.", "می‌ایستم و می‌گذارم عابران رد شوند و بعد ادامه می‌دهم.",
    "Om nødvendigt skal du standse for at lade de gående passere.", "If necessary, you must stop to let the pedestrians cross.", "در صورت لزوم باید بایستید تا عابران رد شوند."),
  S(False, "Jeg standser på fodgængerfeltet og venter, til de er gået forbi foran bilen.", "I stop on the pedestrian crossing and wait until they have walked past in front of the car.",
    "روی گذرگاه می‌ایستم و صبر می‌کنم تا از جلوی خودرو رد شوند.",
    "Du skal så vidt muligt undgå at standse på fodgængerfeltet.", "You must as far as possible avoid stopping on the pedestrian crossing.",
    "باید تا جای ممکن از ایستادن روی گذرگاه عابر پیاده پرهیز کنید."),
  S(False, "Fodgængerne skal vente, fordi jeg allerede er i gang med at svinge.", "The pedestrians must wait because I am already turning.", "عابران باید صبر کنند، چون من در حال پیچیدنم.",
    "Gående, der er på vej ud i feltet, skal kunne gå over uden fare.", "Pedestrians about to step onto the crossing must be able to cross without danger.",
    "عابری که در حال وارد شدن به گذرگاه است باید بتواند بی‌خطر رد شود."),
)

Q(5241, "7.13", town("""
THE SCENE: a junction with traffic lights in town. Our signal head has arrow-shaped lamps and shows a GREEN ARROW pointing right; our
right indicator lamp glows on the dashboard strip. On the road to the right, just after the corner, an elderly man is still halfway
across the zebra crossing.
MUST BE CLEARLY VISIBLE: the green right arrow, the elderly man on the zebra crossing of the road to the right.
MUST NOT APPEAR: text."""),
  "Du vil svinge til højre. Dit signal viser en grøn pil mod højre. På den vej, du svinger ind på, går en ældre mand stadig over fodgængerfeltet. Hvad gælder?",
  "You want to turn right. Your signal shows a green arrow to the right. On the road you are turning into, an elderly man is still walking across the pedestrian crossing. What applies?",
  "می‌خواهید به راست بپیچید. چراغ شما فلش سبز به راست نشان می‌دهد. روی جاده‌ای که واردش می‌شوید، مردی مسن هنوز در حال عبور از گذرگاه است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må svinge i pilens retning, men skal holde tilbage for manden i feltet.", "I may turn in the direction of the arrow, but must give way to the man on the crossing.",
    "می‌توانم در جهت فلش بپیچم، ولی باید به مردِ روی گذرگاه راه بدهم.",
    "Selv om signalet giver dig lov til at køre, skal du holde tilbage for gående, der er i feltet.", "Even though the signal lets you drive, you must give way to pedestrians on the crossing.",
    "حتی اگر چراغ اجازه‌ی حرکت بدهد، باید به عابرانِ روی گذرگاه راه بدهید."),
  S(False, "Den grønne pil giver mig ret til at køre, selv om manden er i feltet.", "The green arrow gives me the right to drive even though the man is on the crossing.",
    "فلش سبز به من حق حرکت می‌دهد، حتی اگر آن مرد روی گذرگاه باشد.",
    "Gående i feltet skal kunne gå færdig over.", "Pedestrians on the crossing must be able to finish crossing.", "عابرانِ روی گذرگاه باید بتوانند عبورشان را تمام کنند."),
  S(True, "Jeg svinger med lav fart og standser, hvis det er nødvendigt.", "I turn at a low speed and stop if necessary.", "با سرعت کم می‌پیچم و اگر لازم باشد می‌ایستم.",
    "Efter et sving i krydset skal du passere feltet med passende lav fart og om nødvendigt standse.",
    "After turning in the junction you must pass the crossing at a suitably low speed and stop if necessary.",
    "بعد از پیچیدن در تقاطع باید با سرعت مناسبِ کم از گذرگاه بگذرید و در صورت لزوم بایستید."),
)

Q(5242, "7.13", above("""
THE SCENE: a junction seen from above: our road comes up from the bottom; the road to the RIGHT has a raised traffic island in its
middle starting right at its mouth, dividing its two directions, with a small blue round keep-right sign on the island's nose.
VEHICLES (colour code used strictly): a RED car (ours) about to turn right. A SOLID GREEN arrow from the red car turns right and passes
to the RIGHT of the island, into the near-side lane of the new road; a DASHED ORANGE arrow turns right and passes to the LEFT of the
island, into the lane for the other direction.
MUST NOT APPEAR: other vehicles, text."""),
  "Du vil svinge til højre ind på en vej, hvor der midt på vejen lige efter krydset er et helleanlæg. Hvordan kører du?",
  "You want to turn right into a road that has a traffic island in the middle just after the junction. How do you drive?",
  "می‌خواهید به راست وارد جاده‌ای شوید که درست بعد از تقاطع، وسطش یک جزیره‌ی میانی (helle) دارد. چطور می‌رانید؟",
  S(True, "Jeg kører til højre for helleanlægget.", "I drive to the right of the traffic island.", "از سمت راست جزیره‌ی میانی می‌روم.",
    "Kørende skal holde til højre for helleanlæg på kørebanen.", "Drivers must keep to the right of traffic islands on the carriageway.",
    "رانندگان باید از سمت راستِ جزیره‌های روی سواره‌رو بگذرند."),
  S(False, "Jeg kører til venstre for helleanlægget, fordi svinget så bliver blødere.", "I drive to the left of the island because the turn is then smoother.",
    "از سمت چپ جزیره می‌روم، چون پیچ نرم‌تر می‌شود.",
    "Venstre om helleanlægget er kun tilladt, hvis afmærkningen viser det, eller hvis vejen er ensrettet.",
    "Passing the island on the left is only allowed if the markings show it or if the road is one-way.",
    "عبور از چپ جزیره فقط وقتی مجاز است که علامت‌ها نشان دهند یا جاده یک‌طرفه باشد."),
  S(False, "Jeg kan vælge den side af helleanlægget, der passer mig bedst.", "I can choose whichever side of the island suits me best.", "هر طرف جزیره را که برایم راحت‌تر است انتخاب می‌کنم.",
    "Du skal holde til højre for helleanlægget.", "You must keep to the right of the island.", "باید از سمت راست جزیره بگذرید."),
  S(False, "Helleanlægget er kun for fodgængere, så jeg må køre hen over det.", "The island is only for pedestrians, so I may drive over it.", "این جزیره فقط برای عابران است، پس می‌توانم از رویش رد شوم.",
    "Du skal køre til højre for helleanlægget, ikke over det.", "You must drive to the right of the island, not over it.", "باید از سمت راست جزیره بگذرید، نه از رویش."),
)

Q(5243, "7.11", town("""
THE SCENE: a junction with traffic lights in town, seen from the driver's seat. On the right before the junction stands a give-way
sign (an inverted white triangle with a red border), and there are shark teeth (white triangles) across our lane at the junction. The
traffic light above and beside the road works and shows GREEN for us.
MUST BE CLEARLY VISIBLE: the give-way sign, the shark teeth, the green signal.
MUST NOT APPEAR: text."""),
  "Ved krydset står en vigepligtstavle, og der er hajtænder. Lyssignalet i krydset virker, og du har grønt. Hvad gælder?",
  "At the junction there is a give-way sign and there are shark teeth. The traffic lights in the junction are working, and you have green. What applies?",
  "کنار تقاطع تابلوی حق تقدم و خط دندان‌کوسه هست. چراغ راهنمایی تقاطع کار می‌کند و چراغ شما سبز است. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg følger lyssignalet, så jeg må køre ved grønt.", "I follow the traffic lights, so I may drive on green.", "از چراغ پیروی می‌کنم، پس با سبز می‌توانم بروم.",
    "Uanset afmærkning med ubetinget vigepligt skal du rette dig efter signalanlægget i krydset.",
    "Whatever markings give the duty to give way, you must follow the traffic lights in the junction.",
    "با وجود علامت‌های حق تقدم، باید از چراغ راهنمایی تقاطع پیروی کنید."),
  S(False, "Vigepligtstavlen gælder før lyssignalet, så jeg skal holde tilbage for alle.", "The give-way sign comes before the traffic lights, so I must give way to everyone.",
    "تابلوی حق تقدم بر چراغ مقدم است، پس باید به همه راه بدهم.",
    "Når signalet virker, er det signalet, der gælder.", "When the signal works, it is the signal that applies.", "وقتی چراغ کار می‌کند، چراغ معتبر است."),
  S(False, "Jeg skal standse helt ved hajtænderne, før jeg kører over for grønt.", "I must come to a full stop at the shark teeth before I drive on green.",
    "باید پیش از رد شدن با چراغ سبز، کنار خط دندان‌کوسه کامل بایستم.",
    "Hajtænderne og tavlen gælder først, hvis signalet er slukket eller blinker gult.", "The shark teeth and the sign only apply if the signal is off or flashing yellow.",
    "خط دندان‌کوسه و تابلو فقط وقتی معتبرند که چراغ خاموش باشد یا زرد چشمک بزند."),
  S(False, "Når der både er signal og vigepligtstavle, gælder højrevigepligten.", "When there are both lights and a give-way sign, the right-hand rule applies.",
    "وقتی هم چراغ هست و هم تابلوی حق تقدم، قاعده‌ی دست راست برقرار است.",
    "Signalet regulerer krydset; højrevigepligten gælder ikke her.", "The signal controls the junction; the right-hand rule does not apply here.",
    "چراغ تقاطع را تنظیم می‌کند؛ قاعده‌ی دست راست این‌جا برقرار نیست."),
)

Q(5244, "7.11", view("""
THE SCENE: a road leading straight towards a junction with traffic lights, late afternoon. The sun stands low just above the traffic
lights, so the whole picture is full of glare and the colour of the signal can hardly be seen. A car is ahead of us at some distance;
pedestrians wait at the corners.
MUST BE CLEARLY VISIBLE: the low sun with strong glare right behind the signals, the signal hard to read.
MUST NOT APPEAR: text.""", cond='low evening sun straight ahead, strong glare, dry road'),
  "Du nærmer dig et lyskryds. Den lave sol skinner lige ind i øjnene, og du kan dårligt se, hvad signalet viser. Hvordan forholder du dig?",
  "You are approaching a junction with traffic lights. The low sun is shining straight into your eyes, and you can hardly see what the signal shows. What do you do?",
  "به تقاطعی چراغ‌دار نزدیک می‌شوید. خورشیدِ پایین مستقیم به چشمتان می‌تابد و به‌سختی می‌بینید چراغ چه نشان می‌دهد. چه می‌کنید؟",
  S(True, "Jeg sænker farten, så jeg kan standse, hvis signalet viser rødt.", "I slow down so that I can stop if the signal shows red.",
    "سرعت را کم می‌کنم تا اگر چراغ قرمز بود، بتوانم بایستم.",
    "Ved risiko for blænding skal du holde en passende lav hastighed.", "When there is a risk of being dazzled, you must keep a suitably low speed.",
    "وقتی خطر خیره شدن هست، باید سرعت مناسبِ کمی داشته باشید."),
  S(True, "Jeg slår solskærmen ned og bruger solbriller, hvis jeg har dem.", "I lower the sun visor and wear sunglasses if I have them.",
    "آفتاب‌گیر را پایین می‌آورم و اگر عینک آفتابی دارم، می‌زنم.",
    "Det mindsker blændingen.", "That reduces the glare.", "این کار خیرگی را کم می‌کند."),
  S(True, "Jeg holder også øje med de andre trafikanter, men kører først, når jeg er sikker på signalet.", "I also watch the other road users, but only drive on when I am sure of the signal.",
    "به بقیه‌ی کاربران راه هم نگاه می‌کنم، ولی فقط وقتی حرکت می‌کنم که از رنگ چراغ مطمئن باشم.",
    "Andre trafikanter kan give et fingerpeg, men det er signalet, du skal følge.", "Other road users can give a clue, but it is the signal you must follow.",
    "دیگران می‌توانند سرنخی بدهند، ولی باید از چراغ پیروی کنید."),
  S(False, "Jeg fortsætter med samme fart, fordi signalet nok er grønt.", "I carry on at the same speed because the signal is probably green.",
    "با همان سرعت ادامه می‌دهم، چون چراغ احتمالاً سبز است.",
    "Du må ikke gætte; kan du ikke se signalet, skal du være klar til at standse.", "You must not guess; if you cannot see the signal, you must be ready to stop.",
    "نباید حدس بزنید؛ اگر چراغ را نمی‌بینید، باید آماده‌ی ایستادن باشید."),
)

Q(5245, "7.11", town("""
THE SCENE: a junction in an older part of town without signs or markings. Along the right kerb parked white vans stand right up to the
corner, so that the side road on the RIGHT cannot be seen into at all. The road ahead continues straight; no other traffic visible.
MUST BE CLEARLY VISIBLE: the vans parked up to the corner, the hidden side road on the right, that there are no signs or shark teeth.
MUST NOT APPEAR: signs, road markings, text."""),
  "Du nærmer dig et kryds uden tavler og afmærkning. Der holder parkerede varevogne helt hen til hjørnet, så du ikke kan se ind på sidevejen til højre. Hvordan forholder du dig?",
  "You are approaching a junction without signs or markings. Parked vans stand right up to the corner, so you cannot see into the side road on the right. What do you do?",
  "به تقاطعی بدون تابلو و خط‌کشی نزدیک می‌شوید. ون‌های پارک‌شده تا خود نبش ایستاده‌اند و نمی‌توانید فرعی سمت راست را ببینید. چه می‌کنید؟",
  S(True, "Jeg sænker farten så meget, at jeg kan holde tilbage for trafik fra højre.", "I slow down enough to be able to give way to traffic from the right.",
    "سرعت را آن‌قدر کم می‌کنم که بتوانم به ترافیک سمت راست راه بدهم.",
    "Højrevigepligten gælder, og ved vejkryds med begrænset oversigt skal du holde en passende lav hastighed.",
    "The right-hand rule applies, and at junctions where the view is limited you must keep a suitably low speed.",
    "قاعده‌ی دست راست برقرار است و در تقاطعِ کم‌دید باید سرعت مناسبِ کمی داشته باشید."),
  S(True, "Jeg er også opmærksom på cyklister og fodgængere, der kan komme frem bag varevognene.", "I also watch out for cyclists and pedestrians who may appear from behind the vans.",
    "حواسم به دوچرخه‌سوارها و عابرانی هم هست که ممکن است از پشت ون‌ها بیرون بیایند.",
    "Varevognene skjuler alle, der kommer fra højre.", "The vans hide everyone coming from the right.", "ون‌ها همه‌ی کسانی را که از راست می‌آیند پنهان می‌کنند."),
  S(False, "Jeg kører igennem med samme fart, fordi jeg ikke kan se nogen.", "I drive through at the same speed because I cannot see anyone.",
    "با همان سرعت رد می‌شوم، چون کسی را نمی‌بینم.",
    "At du ikke kan se nogen, betyder ikke, at der ikke kommer nogen.", "Not being able to see anyone does not mean that no one is coming.",
    "این‌که کسی را نمی‌بینید، به این معنا نیست که کسی نمی‌آید."),
  S(False, "Varevognene holder ulovligt tæt på hjørnet, så jeg har ikke vigepligt.", "The vans are parked illegally close to the corner, so I do not have to give way.",
    "ون‌ها غیرقانونی نزدیک نبش پارک کرده‌اند، پس من لازم نیست راه بدهم.",
    "Parkeringen ændrer ikke på vigepligten; højrevigepligten gælder stadig.", "The parking does not change who gives way; the right-hand rule still applies.",
    "این پارک چیزی را در حق تقدم عوض نمی‌کند؛ قاعده‌ی دست راست همچنان برقرار است."),
)

Q(5246, "7.11", view("""
THE SCENE: we drive behind a large lorry towards a junction with traffic lights; the back of the lorry fills much of the view. The
signal at the right-hand side of the road is hidden behind the lorry, but a second signal on the far side of the junction, on the left,
can just be seen past the lorry.
MUST BE CLEARLY VISIBLE: the lorry ahead, the second signal on the far side, that the near signal is hidden.
MUST NOT APPEAR: text.""", scenery="Scenery is reduced to simple flat house fronts, pavements and a few trees."),
  "Du kører bag en lastbil mod et lyskryds. Lastbilen skjuler signalet for dig. Hvordan forholder du dig?",
  "You are driving behind a lorry towards a junction with traffic lights. The lorry hides the signal from you. What do you do?",
  "پشت کامیونی به سمت تقاطعی چراغ‌دار می‌روید. کامیون چراغ را از دید شما پنهان کرده است. چه می‌کنید؟",
  S(True, "Jeg holder større afstand, så jeg kan se mere af krydset og signalerne.", "I keep a greater distance so that I can see more of the junction and the signals.",
    "فاصله را بیشتر می‌کنم تا بیشتر از تقاطع و چراغ‌ها را ببینم.",
    "Med større afstand ser du ud forbi lastbilen.", "With a greater distance you can see past the lorry.", "با فاصله‌ی بیشتر می‌توانید کنار کامیون را ببینید."),
  S(True, "Jeg er klar til at standse, hvis signalet skifter, når lastbilen er kørt over.", "I am ready to stop if the signal changes once the lorry has crossed.",
    "آماده‌ام اگر بعد از رد شدن کامیون چراغ عوض شد، بایستم.",
    "Signalet kan skifte til gult eller rødt, lige når lastbilen har passeret.", "The signal can change to yellow or red just as the lorry has passed.",
    "چراغ ممکن است درست بعد از رد شدن کامیون زرد یا قرمز شود."),
  S(False, "Jeg følger tæt efter lastbilen, så jeg også når over, hvis den gør.", "I follow the lorry closely so that I get across too if it does.",
    "از نزدیک دنبال کامیون می‌روم تا اگر او رد شد، من هم برسم.",
    "Det er signalet, du skal følge, ikke lastbilen.", "It is the signal you must follow, not the lorry.", "باید از چراغ پیروی کنید، نه از کامیون."),
  S(True, "Jeg kigger efter et andet signal i krydset, fx i den anden side af vejen.", "I look for another signal at the junction, for example on the other side of the road.",
    "دنبال چراغ دیگری در تقاطع می‌گردم، مثلاً آن طرف جاده.",
    "I mange kryds er der flere signaler, så du kan se et af dem.", "Many junctions have several signals, so you can see one of them.",
    "بسیاری از تقاطع‌ها چند چراغ دارند و می‌توانید یکی را ببینید."),
)

Q(5247, "7.15", view("""
THE SCENE: we are leaving a roundabout at an exit to the right; our right indicator lamp glows on the dashboard strip. A few metres
into the exit road a zebra crossing runs across it, with the Danish crossing sign beside it; a man with a dog on a lead stands at the
kerb about to step onto it. Another car is behind us in the roundabout.
MUST BE CLEARLY VISIBLE: the zebra crossing in the exit, the man with the dog about to step out.
MUST NOT APPEAR: traffic lights, text.""", scenery="Scenery is reduced to simple flat house fronts, pavements and a few trees."),
  "Du er ved at køre ud af rundkørslen. I udkørslen er der et fodgængerfelt, og en mand med en hund er på vej ud på det. Hvordan forholder du dig?",
  "You are about to leave the roundabout. In the exit there is a pedestrian crossing, and a man with a dog is about to step onto it. What do you do?",
  "در حال خارج شدن از میدان هستید. در خروجی گذرگاه عابر پیاده هست و مردی با سگش می‌خواهد واردش شود. چه می‌کنید؟",
  S(True, "Jeg sænker farten og lader manden gå over.", "I slow down and let the man cross.", "سرعت را کم می‌کنم و می‌گذارم آن مرد رد شود.",
    "Du skal afpasse farten efter gående, der er på vej ud i feltet, og om nødvendigt standse.",
    "You must adjust your speed to pedestrians about to step onto the crossing and stop if necessary.",
    "باید سرعت را با عابری که در حال وارد شدن به گذرگاه است تنظیم کنید و در صورت لزوم بایستید."),
  S(True, "Jeg giver tegn til højre, før jeg kører ud af rundkørslen.", "I signal right before I leave the roundabout.", "پیش از خروج از میدان راهنمای راست می‌زنم.",
    "Du skal give tegn, når du forlader rundkørslen.", "You must signal when you leave the roundabout.", "هنگام خروج از میدان باید راهنما بزنید."),
  S(False, "Jeg kører ud uden at standse, fordi bilen bag mig i rundkørslen ellers må bremse.", "I drive out without stopping, because otherwise the car behind me in the roundabout has to brake.",
    "بدون ایستادن بیرون می‌روم، چون وگرنه خودروی پشت سرم در میدان باید ترمز کند.",
    "Den gående på vej ud i feltet skal kunne gå over uden fare.", "The pedestrian about to step onto the crossing must be able to cross without danger.",
    "عابری که در حال وارد شدن به گذرگاه است باید بتواند بی‌خطر رد شود."),
  S(False, "Manden skal vente, fordi trafikken i rundkørslen har forkørselsret.", "The man must wait because the traffic in the roundabout has the right of way.",
    "آن مرد باید صبر کند، چون ترافیک داخل میدان حق تقدم دارد.",
    "Forkørselsretten i rundkørslen gælder over for dem, der kører ind, ikke over for gående i et fodgængerfelt.",
    "The right of way in the roundabout is over those driving in, not over pedestrians on a crossing.",
    "حق تقدم داخل میدان در برابر کسانی است که وارد می‌شوند، نه در برابر عابرانِ روی گذرگاه."),
)

Q(5248, "7.15", view("""
THE SCENE: the entry to a roundabout seen from the driver's seat: shark teeth (white triangles) across our lane at the entry and a
give-way sign on the right. In the roundabout a cyclist rides along its outer edge, coming from the LEFT towards our entry; no cars in
the roundabout near us.
MUST BE CLEARLY VISIBLE: the shark teeth, the give-way sign, the cyclist in the roundabout coming from the left.
MUST NOT APPEAR: traffic lights, text.""", scenery="Scenery is reduced to simple flat house fronts, pavements and a few trees."),
  "Du vil køre ind i rundkørslen. Der er hajtænder ved indkørslen. En cyklist kommer kørende i yderkanten af rundkørslen fra venstre. Hvad gælder?",
  "You want to drive into the roundabout. There are shark teeth at the entry. A cyclist is riding along the outer edge of the roundabout from the left. What applies?",
  "می‌خواهید وارد میدان شوید. کنار ورودی خط دندان‌کوسه هست. دوچرخه‌سواری در لبه‌ی بیرونیِ میدان از چپ می‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal holde tilbage for cyklisten.", "I must give way to the cyclist.", "باید به دوچرخه‌سوار راه بدهم.",
    "Hajtænderne giver ubetinget vigepligt for al kørende færdsel i rundkørslen, også cyklister.",
    "The shark teeth give an unconditional duty to give way to all traffic in the roundabout, also cyclists.",
    "خط دندان‌کوسه یعنی باید بی‌قید و شرط به همه‌ی ترافیک داخل میدان راه بدهید، از جمله دوچرخه‌سوارها."),
  S(False, "Cyklisten skal holde tilbage, fordi jeg kommer fra højre.", "The cyclist must give way because I am coming from the right.",
    "دوچرخه‌سوار باید راه بدهد، چون من از راست می‌آیم.",
    "Hajtænderne ophæver højrevigepligten.", "The shark teeth cancel the right-hand rule.", "خط دندان‌کوسه قاعده‌ی دست راست را کنار می‌گذارد."),
  S(False, "Jeg må køre ind foran cyklisten, når jeg skal ud ved første udkørsel.", "I may drive in in front of the cyclist when I am leaving at the first exit.",
    "وقتی از خروجی اول بیرون می‌روم، می‌توانم جلوی دوچرخه‌سوار وارد شوم.",
    "Vigepligten gælder, uanset hvor du skal ud.", "The duty to give way applies whichever exit you are taking.", "این وظیفه، از هر خروجی هم که بیرون بروید، برقرار است."),
  S(False, "Jeg skal kun holde tilbage for biler i rundkørslen, ikke for cyklister.", "I only have to give way to cars in the roundabout, not to cyclists.",
    "فقط باید به خودروهای داخل میدان راه بدهم، نه به دوچرخه‌سوارها.",
    "Vigepligten gælder al kørende færdsel.", "The duty to give way covers all traffic.", "این وظیفه شامل همه‌ی ترافیک است."),
)

Q(5249, "4.5", view("""
THE SCENE: a junction outside town where we want to turn LEFT (our left indicator lamp glows on the dashboard strip). In the oncoming
lane a motorcycle with its headlight on approaches the junction at some distance; the narrow front of the motorcycle makes it hard to
see how far away it is.
MUST BE CLEARLY VISIBLE: the oncoming motorcycle with its headlight, the side road to the left.
MUST NOT APPEAR: other vehicles, text."""),
  "Du vil svinge til venstre. En motorcykel kommer imod dig. Hvad skal du være opmærksom på?",
  "You want to turn left. A motorcycle is coming towards you. What should you be aware of?",
  "می‌خواهید به چپ بپیچید. موتورسیکلتی از روبه‌رو می‌آید. به چه چیزی باید توجه کنید؟",
  S(True, "Det kan være svært at bedømme, hvor hurtigt motorcyklen kører, og hvor langt væk den er.", "It can be hard to judge how fast the motorcycle is going and how far away it is.",
    "ممکن است تخمین سرعت و فاصله‌ی موتورسیکلت سخت باشد.",
    "En motorcykel er smal, så den kan virke længere væk og langsommere, end den er.", "A motorcycle is narrow, so it may seem further away and slower than it is.",
    "موتورسیکلت باریک است و ممکن است دورتر و آهسته‌تر از واقع به نظر برسد."),
  S(True, "Er jeg i tvivl, venter jeg, til motorcyklen er kørt forbi.", "If I am in doubt, I wait until the motorcycle has gone by.", "اگر شک دارم، صبر می‌کنم تا موتورسیکلت رد شود.",
    "Du må først svinge, når det kan ske uden ulempe for de modkørende.", "You may only turn when it can be done without inconvenience to oncoming traffic.",
    "فقط وقتی می‌توانید بپیچید که برای خودروهای روبه‌رو مزاحمتی نداشته باشد."),
  S(False, "En motorcykel kan altid standse hurtigere end en bil, så jeg kan godt svinge.", "A motorcycle can always stop faster than a car, so I can go ahead and turn.",
    "موتورسیکلت همیشه زودتر از خودرو می‌ایستد، پس می‌توانم بپیچم.",
    "Du må ikke regne med, at motorcyklisten kan nå at bremse; en hård opbremsning er også farlig for ham.",
    "You must not count on the motorcyclist being able to brake in time; hard braking is dangerous for him too.",
    "نباید فرض کنید موتورسوار به موقع ترمز می‌کند؛ ترمز شدید برای خودش هم خطرناک است."),
)

Q(5250, "6.2", picture("""
A close-up from the driver's seat of a car's instrument panel and steering wheel on a plain background: the driver's left hand moves the
indicator stalk down, and the green left-indicator arrow on the instrument panel is lit.
MUST BE CLEARLY VISIBLE: the lit green indicator arrow, the hand on the indicator stalk.
MUST NOT APPEAR: readable text or numbers, brand names."""),
  "Hvad gælder om at give tegn med blinklyset?",
  "What applies to signalling with the indicator?",
  "درباره‌ی علامت دادن با راهنما چه درست است؟",
  S(True, "Jeg giver tegn i god tid før manøvren.", "I signal in good time before the manoeuvre.", "به موقع پیش از مانور راهنما می‌زنم.",
    "Tegn skal gives i god tid før den påtænkte manøvre.", "Signals must be given in good time before the intended manoeuvre.", "علامت باید به موقع پیش از مانورِ موردنظر داده شود."),
  S(True, "Tegnet skal være tydeligt, så andre ikke er i tvivl om, hvad jeg vil.", "The signal must be clear so that others are in no doubt about what I am going to do.",
    "علامت باید روشن باشد تا دیگران درباره‌ی قصد من شک نکنند.",
    "Tegn skal gives tydeligt og utvetydigt.", "Signals must be given clearly and unambiguously.", "علامت باید روشن و بی‌ابهام باشد."),
  S(True, "Blinklyset skal slukkes, når manøvren er færdig.", "The indicator must be switched off when the manoeuvre is finished.", "وقتی مانور تمام شد، راهنما باید خاموش شود.",
    "Tegnet skal ophøre senest, når manøvren er afsluttet.", "The signal must stop at the latest when the manoeuvre is finished.", "علامت باید حداکثر تا پایان مانور قطع شود."),
  S(True, "Jeg giver tegn, før jeg kører ud fra kantstenen, og før jeg svinger.", "I signal before I pull away from the kerb and before I turn.",
    "پیش از حرکت از کنار جدول و پیش از پیچیدن راهنما می‌زنم.",
    "Du skal give tegn før igangsætning fra kanten af vejen og før vending og svingning.", "You must signal before pulling away from the edge of the road and before turning round and turning.",
    "پیش از حرکت از کنار جاده و پیش از دور زدن و پیچیدن باید علامت بدهید."),
)
