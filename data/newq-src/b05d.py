# «آزمون جدید», batch 5 (5401–5500), part d: moving off and stopping (7.1), position (7.2), lights (7.19), the motorway (7.16),
# safe traffic (6.2), following (7.8), and one each of 7.15, 7.5, 7.10, 7.17, 3.2, 4.5, 5.1, 5.2 and 8.1.
# Rules: Færdselsloven §§ 3 stk. 2, 9 (stop whether or not at fault, name and address on request, the owner of damaged property
# or the police told when nobody is there, nothing moved only after death or serious injury), 15 stk. 1 and 4 (keep right of
# islands unless marked or one-way), 18 stk. 1–2, 29 stk. 1 nr. 2, 32 stk. 1, 2 and 5, 33 stk. 3–5 (no high beam on lit
# roads, when meeting or following; fog lights only in fog and heavy precipitation), 41 stk. 1 (adjust the speed before
# dipping the lights) and stk. 2–3, 46 stk. 2 (no turning or reversing on the motorway or its slip roads), 67 stk. 3, 80 (the
# driver sees to passengers under 15); Bekendtgørelse om vejafmærkning (Q 45 hatched area, Q 46 unbroken edge line).
from nq import Q, S, above, picture, town, view

Q(5476, "7.1", town("""
THE SCENE: we are parked at the right kerb of a town street, about to pull out (our left indicator lamp glows on the dashboard
strip). In the left door mirror (at the left edge of the picture) a car approaching from behind briefly flashes its headlights; behind
it, partly hidden, a motorcycle can be seen.
MUST BE CLEARLY VISIBLE: the car flashing its headlights in the left door mirror, the motorcycle partly hidden behind it.
MUST NOT APPEAR: signs, text."""),
  "Du holder ved kantstenen og vil køre ud. Bilen, der kommer bagfra, blinker kort med forlygterne. Hvordan forholder du dig?",
  "You are parked at the kerb and want to pull out. The car coming from behind briefly flashes its headlights. What do you do?",
  "کنار جدول ایستاده‌اید و می‌خواهید حرکت کنید. خودرویی که از پشت می‌آید کوتاه با چراغ‌های جلو چراغ می‌زند. چه می‌کنید؟",
  S(True, "Jeg sikrer mig selv, at det kan ske uden fare, før jeg kører ud.", "I make sure myself that it can be done safely before I pull out.",
    "پیش از حرکت، خودم مطمئن می‌شوم که بی‌خطر است.",
    "Lyssignalet er ikke en tilladelse; det er dig, der skal sikre, at du kan køre ud uden fare.",
    "The light signal is not a permission; it is you who must make sure that you can pull out safely.",
    "علامت نوری اجازه نیست؛ این شما هستید که باید مطمئن شوید بی‌خطر حرکت می‌کنید."),
  S(True, "Der kan komme andre bag bilen, fx en motorcykel, som føreren ikke har tænkt på.",
    "Others may be coming behind the car, for example a motorcycle that the driver has not thought of.",
    "ممکن است پشت آن خودرو کسان دیگری، مثلاً یک موتورسیکلت، باشند که راننده به آن‌ها فکر نکرده است.",
    "Bilen kan skjule andre trafikanter.", "The car may hide other road users.", "ممکن است آن خودرو کاربران دیگر راه را پنهان کند."),
  S(False, "Lyssignalet betyder, at jeg har lov til at køre ud foran bilen.", "The light signal means that I am allowed to pull out in front of the car.",
    "علامت نوری یعنی اجازه دارم جلوی آن خودرو حرکت کنم.",
    "Et lyssignal giver dig ingen ret.", "A light signal gives you no right.", "علامت نوری هیچ حقی به شما نمی‌دهد."),
  S(False, "Jeg kører hurtigt ud, så føreren ikke skal vente.", "I pull out quickly so that the driver does not have to wait.",
    "سریع حرکت می‌کنم تا آن راننده منتظر نماند.",
    "Du skal først køre, når du selv har sikret dig, at det kan ske uden fare.", "You must only go once you have made sure yourself that it can be done safely.",
    "فقط وقتی حرکت کنید که خودتان مطمئن شده‌اید بی‌خطر است."),
)

Q(5477, "7.1", view("""
THE SCENE: we stand in a lay-by beside a country road with a round 80 speed-limit sign; cars pass quickly in our direction; our left
indicator lamp glows on the dashboard strip; in the left door mirror (at the left edge of the picture) a car approaches fast.
MUST BE CLEARLY VISIBLE: the lay-by, the fast traffic on the road, the car in the left door mirror.
MUST NOT APPEAR: other signs, text."""),
  "Du holder i en parkeringslomme ved en landevej, hvor der køres hurtigt, og vil køre ud. Hvordan forholder du dig?",
  "You are standing in a lay-by beside a country road where the traffic is fast, and you want to pull out. What do you do?",
  "در یک جای توقف کنار جاده‌ای بیرون شهر که خودروها در آن سریع می‌رانند ایستاده‌اید و می‌خواهید وارد جاده شوید. چه می‌کنید؟",
  S(True, "Jeg venter på et stort hul i trafikken, fordi de andre kører hurtigt.", "I wait for a large gap in the traffic because the others are driving fast.",
    "منتظر فاصله‌ی بزرگی در ترافیک می‌مانم، چون دیگران سریع می‌رانند.",
    "Du skal kunne køre ud uden fare eller ulempe for de andre.", "You must be able to pull out without danger or inconvenience to the others.",
    "باید بتوانید بدون خطر یا مزاحمت برای دیگران وارد جاده شوید."),
  S(True, "Når jeg er kommet ud, sætter jeg farten op, så jeg ikke er til unødig ulempe.", "Once I am out, I build up speed so that I am no undue inconvenience.",
    "وقتی وارد جاده شدم، سرعتم را بالا می‌برم تا مزاحمت بی‌دلیل نداشته باشم.",
    "En meget lav fart på landevejen kan tvinge de andre til at bremse hårdt.", "A very low speed on a country road may force the others to brake hard.",
    "سرعت خیلی کم در جاده‌ی بیرون شهر ممکن است دیگران را مجبور به ترمز شدید کند."),
  S(False, "Når jeg blinker, skal trafikken på vejen sætte farten ned for mig.", "When I signal, the traffic on the road must slow down for me.",
    "وقتی راهنما بزنم، ترافیک جاده باید برایم سرعتش را کم کند.",
    "Blinklyset giver ingen ret; de andre har ikke pligt til at bremse for dig.", "The indicator gives no right; the others are not obliged to brake for you.",
    "راهنما حقی نمی‌دهد؛ دیگران موظف نیستند برای شما ترمز کنند."),
)

Q(5478, "7.1", view("""
THE SCENE: a two-lane road; we want to stop at the kerb a little ahead (our right indicator lamp glows on the dashboard strip); in
the interior rear-view mirror at the top a car follows very close behind us.
MUST BE CLEARLY VISIBLE: the car very close behind in the interior mirror, the kerb ahead where we want to stop.
MUST NOT APPEAR: signs, text."""),
  "Du vil standse ved kantstenen lidt fremme. Bilen bag dig kører meget tæt. Hvordan forholder du dig?",
  "You want to stop at the kerb a little ahead. The car behind you is very close. What do you do?",
  "می‌خواهید کمی جلوتر کنار جدول بایستید. خودروی پشت سرتان خیلی نزدیک می‌آید. چه می‌کنید؟",
  S(True, "Jeg giver tegn i god tid og bremser roligt, så bilen bag mig kan nå at reagere.",
    "I signal in good time and brake gently so that the car behind me can react.",
    "به‌موقع راهنما می‌زنم و آرام ترمز می‌گیرم تا خودروی پشتی فرصت واکنش داشته باشد.",
    "Tegn skal gives i god tid, og pludselige opbremsninger skal undgås.", "Signals must be given in good time, and sudden braking must be avoided.",
    "راهنما باید به‌موقع زده شود و از ترمزهای ناگهانی باید پرهیز کرد."),
  S(True, "Er det for farligt at standse her, kører jeg videre og standser et andet sted.", "If it is too dangerous to stop here, I drive on and stop somewhere else.",
    "اگر توقف در اینجا خیلی خطرناک باشد، ادامه می‌دهم و جای دیگری می‌ایستم.",
    "Du kan vælge et sted, hvor du kan standse mere roligt.", "You can choose a place where you can stop more calmly.",
    "می‌توانید جایی را انتخاب کنید که آرام‌تر بایستید."),
  S(True, "Jeg holder øje i spejlet, mens jeg sætter farten ned.", "I keep an eye on the mirror while I slow down.",
    "هنگام کم کردن سرعت، آینه را زیر نظر دارم.",
    "Så kan du se, om bilen bag dig når at sætte farten ned.", "That way you can see whether the car behind manages to slow down.",
    "این‌طور می‌بینید خودروی پشتی به‌موقع سرعتش را کم می‌کند یا نه."),
  S(False, "Jeg bremser hårdt, så bilen bag mig lærer at holde afstand.", "I brake hard so that the car behind me learns to keep its distance.",
    "محکم ترمز می‌گیرم تا خودروی پشتی یاد بگیرد فاصله نگه دارد.",
    "Pludselige og unødige opbremsninger er forbudt og farlige.", "Sudden and unnecessary braking is forbidden and dangerous.",
    "ترمزهای ناگهانی و بی‌دلیل ممنوع و خطرناک‌اند."),
)

Q(5479, "7.2", view("""
THE SCENE: a two-way road with one lane in each direction; ahead in the middle of the road lies a small raised traffic island without
any sign; there is no oncoming traffic.
MUST BE CLEARLY VISIBLE: the traffic island without a sign.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Midt på vejen ligger en helle uden tavler. Der kommer ingen imod dig. Hvordan kører du forbi den?",
  "There is a traffic island without signs in the middle of the road. Nothing is coming towards you. How do you pass it?",
  "وسط جاده جزیره‌ای بدون تابلو هست. کسی از روبه‌رو نمی‌آید. چطور از کنارش رد می‌شوید؟",
  S(True, "Jeg kører forbi hellen i højre side.", "I pass the island on its right side.", "از سمت راستِ جزیره رد می‌شوم.",
    "Du skal holde til højre for heller og lignende, medmindre andet er afmærket, eller kørebanen er ensrettet.",
    "You must keep to the right of islands and the like, unless marked otherwise or the carriageway is one-way.",
    "باید از سمت راست جزیره‌ها و مانند آن‌ها رد شوید، مگر خط‌کشی چیز دیگری بگوید یا سواره‌رو یک‌طرفه باشد."),
  S(False, "Jeg vælger den side, hvor der er mest plads.", "I choose the side with the most room.", "طرفی را انتخاب می‌کنم که جای بیشتری دارد.",
    "På en vej med trafik i begge retninger skal du holde til højre for hellen.", "On a road with traffic in both directions you must keep to the right of the island.",
    "در جاده‌ی دوطرفه باید از سمت راست جزیره رد شوید."),
  S(False, "Jeg må køre i venstre side, når der ikke kommer nogen.", "I may drive on the left side when nothing is coming.",
    "وقتی کسی نمی‌آید، می‌توانم از سمت چپ رد شوم.",
    "Reglen gælder også, når der ikke kommer modkørende.", "The rule applies also when there is no oncoming traffic.",
    "این قاعده وقتی ترافیک روبه‌رو نیست هم برقرار است."),
)

Q(5480, "7.2", view("""
THE SCENE: a narrow two-lane country road with a broken centre line going into a right-hand bend lined with tall bushes, so that the
road after the bend cannot be seen.
MUST BE CLEARLY VISIBLE: the right-hand bend, the bushes hiding the road beyond it.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Vejen svinger til højre, og du kan ikke se ud gennem svinget. Hvordan placerer du bilen?",
  "The road bends to the right, and you cannot see round the bend. How do you position the car?",
  "جاده به راست می‌پیچد و نمی‌توانید آن طرف پیچ را ببینید. خودرو را کجای جاده قرار می‌دهید؟",
  S(True, "Jeg holder godt til højre, fordi en modkørende kan komme et stykke over midterlinjen i svinget.",
    "I keep well to the right, because an oncoming vehicle may come some way over the centre line in the bend.",
    "کاملاً سمت راست می‌مانم، چون ممکن است خودروی روبه‌رو در پیچ کمی از خط وسط رد شود.",
    "Modkørende kan skære svinget, og du skal holde til højre.", "Oncoming vehicles may cut the bend, and you must keep right.",
    "خودروهای روبه‌رو ممکن است پیچ را میان‌بُر بزنند و شما باید سمت راست بمانید."),
  S(True, "Jeg sætter farten ned før svinget, så jeg kan standse på den strækning, jeg kan se.",
    "I slow down before the bend so that I can stop within the distance I can see.",
    "پیش از پیچ سرعتم را کم می‌کنم تا بتوانم در مسافتی که می‌بینم بایستم.",
    "I sving og ved begrænset udsyn skal farten være passende lav.", "In bends and where the view is limited, the speed must be suitably low.",
    "در پیچ‌ها و جایی که دید محدود است، سرعت باید به اندازه‌ی کافی کم باشد."),
  S(False, "Jeg skærer svinget, så jeg får bedre udsyn.", "I cut the bend to get a better view.", "پیچ را میان‌بُر می‌زنم تا دید بهتری داشته باشم.",
    "Så kommer du over i de modkørendes side, hvor du ikke kan se, hvad der kommer.", "Then you move into the oncoming side, where you cannot see what is coming.",
    "این‌طور وارد سمت ترافیک روبه‌رو می‌شوید، جایی که نمی‌بینید چه می‌آید."),
  S(False, "Jeg kører midt på vejen, så der er plads til cyklister i højre side.", "I drive in the middle of the road so that there is room for cyclists on the right.",
    "وسط جاده می‌رانم تا در سمت راست برای دوچرخه‌سواران جا باشد.",
    "Du skal holde til højre og i stedet sænke farten, så du kan reagere.", "You must keep right and slow down instead, so that you can react.",
    "باید سمت راست بمانید و به‌جایش سرعت را کم کنید تا بتوانید واکنش نشان دهید."),
)

Q(5481, "7.2", view("""
THE SCENE: a dark country road at night with no centre line and no edge lines; white edge posts with reflectors stand along both
edges of the road and show its course into a bend ahead; our dipped beam lights them up.
MUST BE CLEARLY VISIBLE: the reflecting edge posts on both sides showing the bend.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt, og vejen har hverken midterlinje eller kantlinjer. Langs vejen står kantpæle med reflekser. Hvad gælder?",
  "It is dark, and the road has neither a centre line nor edge lines. Edge posts with reflectors stand along the road. What applies?",
  "هوا تاریک است و جاده نه خط وسط دارد نه خط کناری. کنار جاده تیرک‌هایی با شبرنگ نصب شده است. چه قاعده‌ای برقرار است؟",
  S(True, "Kantpælene viser, hvor vejkanten er, og hvordan vejen fortsætter.", "The edge posts show where the edge of the road is and how the road continues.",
    "تیرک‌های کنار جاده نشان می‌دهند لبه‌ی جاده کجاست و جاده چطور ادامه پیدا می‌کند.",
    "Kantafmærkningen hjælper dig med at se vejens forløb i mørke.", "The edge markers help you see the course of the road in the dark.",
    "این علامت‌ها کمک می‌کنند در تاریکی مسیر جاده را ببینید."),
  S(True, "Jeg holder til højre og sænker farten, hvis jeg er i tvivl om, hvor vejen går.",
    "I keep right and slow down if I am unsure where the road goes.",
    "سمت راست می‌مانم و اگر درباره‌ی مسیر جاده مطمئن نیستم، سرعتم را کم می‌کنم.",
    "Du skal holde til højre og kunne standse på den strækning, du kan se.", "You must keep right and be able to stop within the distance you can see.",
    "باید سمت راست بمانید و بتوانید در مسافتی که می‌بینید بایستید."),
  S(True, "Med nærlys kan jeg kun se et kortere stykke frem, så farten skal passe til det.",
    "With dipped beam I can only see a shorter way ahead, so the speed must suit that.",
    "با نور پایین فقط مسافت کوتاه‌تری را می‌بینم، پس سرعت باید با آن جور باشد.",
    "Farten skal passe til, hvor langt du kan se.", "The speed must suit how far you can see.", "سرعت باید با میزان دید شما جور باشد."),
  S(False, "Jeg kører midt på vejen for at holde lige langt fra begge kanter.", "I drive in the middle of the road to keep the same distance from both edges.",
    "وسط جاده می‌رانم تا فاصله‌ام از هر دو لبه یکسان باشد.",
    "Du skal holde til højre, også når der ikke er afmærkning.", "You must keep right, also when there are no markings.",
    "حتی وقتی خط‌کشی نیست، باید سمت راست بمانید."),
)

Q(5482, "7.19", town("""
THE SCENE: a residential street in town at night with no street lights; nobody is in sight; cars are parked along one side.
MUST BE CLEARLY VISIBLE: the dark street without street lights.
MUST NOT APPEAR: signs, text, people.""", cond="night, dark, no street lights"),
  "Det er mørkt, og du kører på en villavej i byen uden gadelys. Der er ingen andre i nærheden. Hvad gælder om lyset?",
  "It is dark, and you are driving in a residential street in town without street lights. Nobody else is nearby. What applies to the lights?",
  "هوا تاریک است و در یک خیابان مسکونیِ بدون چراغ خیابان در شهر می‌رانید. کسی در آن نزدیکی نیست. درباره‌ی چراغ‌ها چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må godt bruge fjernlys, når vejen ikke er oplyst, og jeg ikke blænder nogen.",
    "I may use high beam when the road is not lit and I do not dazzle anyone.",
    "وقتی جاده روشن نیست و چشم کسی را نمی‌زنم، می‌توانم از نور بالا استفاده کنم.",
    "Fjernlys må ikke bruges på en vej, der er tilstrækkeligt belyst, men her er der ingen gadelys.",
    "High beam must not be used on a road that is sufficiently lit, but here there are no street lights.",
    "نور بالا نباید در جاده‌ای که به اندازه‌ی کافی روشن است استفاده شود، ولی اینجا چراغ خیابان نیست."),
  S(True, "Kommer der nogen imod mig, skifter jeg til nærlys i god tid.", "If someone comes towards me, I switch to dipped beam in good time.",
    "اگر کسی از روبه‌رو بیاید، به‌موقع نور پایین را روشن می‌کنم.",
    "Fjernlys må ikke bruges ved møde.", "High beam must not be used when meeting others.", "هنگام روبه‌رو شدن با دیگران نباید از نور بالا استفاده کرد."),
  S(False, "Fjernlys må aldrig bruges inde i byen.", "High beam may never be used in town.", "در شهر هیچ‌وقت نباید از نور بالا استفاده کرد.",
    "Forbuddet gælder, hvor vejen er tilstrækkeligt belyst, ikke alle veje i byen.", "The ban applies where the road is sufficiently lit, not to every road in town.",
    "این ممنوعیت برای جاده‌هایی است که به اندازه‌ی کافی روشن‌اند، نه همه‌ی خیابان‌های شهر."),
  S(False, "Det er nok med positionslys, fordi farten er lav.", "Position lights are enough because the speed is low.", "چون سرعت کم است، چراغ کوچک کافی است.",
    "I mørke skal du køre med nærlys eller fjernlys.", "In the dark you must drive with dipped beam or high beam.", "در تاریکی باید با نور پایین یا نور بالا برانید."),
)

Q(5483, "7.19", view("""
THE SCENE: a dark country road at night climbing to a hilltop; our high beam lights the road; beyond the crest a glow of light shows
that a car is coming from the other side.
MUST BE CLEARLY VISIBLE: the crest, the glow of the oncoming car's lights behind it.
MUST NOT APPEAR: signs, text.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt. Du kører med fjernlys op mod en bakketop, og over toppen ser du lysskæret fra en bil, der kommer imod dig. Hvordan forholder du dig?",
  "It is dark. You are driving with high beam up towards a hilltop, and over the top you see the glow from a car coming towards you. What do you do?",
  "هوا تاریک است. با نور بالا به طرف بالای یک تپه می‌رانید و آن طرف تپه نورِ خودرویی را می‌بینید که از روبه‌رو می‌آید. چه می‌کنید؟",
  S(True, "Jeg skifter til nærlys, før bilen kommer over toppen.", "I switch to dipped beam before the car comes over the top.",
    "پیش از این‌که آن خودرو از بالای تپه رد شود، نور پایین را روشن می‌کنم.",
    "Så bliver føreren ikke blændet, når bilen dukker op.", "Then the driver is not dazzled when the car appears.",
    "این‌طور وقتی خودرو ظاهر می‌شود، چشم راننده‌اش خیره نمی‌شود."),
  S(True, "Jeg tilpasser farten, før jeg blænder ned.", "I adjust my speed before I dip the lights.", "پیش از پایین آوردن نور، سرعتم را تنظیم می‌کنم.",
    "Ved nedblænding fra fjernlys til nærlys skal farten tilpasses de nye sigtforhold, før du blænder ned.",
    "When dipping from high beam to dipped beam, the speed must be adjusted to the new visibility before you dip.",
    "هنگام تغییر از نور بالا به نور پایین، باید پیش از آن سرعت را با دید جدید تطبیق دهید."),
  S(True, "Jeg holder godt til højre, fordi jeg ikke kan se ud over bakketoppen.", "I keep well to the right, because I cannot see over the hilltop.",
    "کاملاً سمت راست می‌مانم، چون آن طرف تپه را نمی‌بینم.",
    "Foran en bakketop er oversigten begrænset.", "Before a hilltop the view is limited.", "پیش از بالای تپه دید محدود است."),
  S(False, "Jeg venter med at blænde ned, til jeg kan se bilens lygter direkte.", "I wait to dip the lights until I can see the car's headlights directly.",
    "تا چراغ‌های آن خودرو را مستقیم نبینم، نور را پایین نمی‌آورم.",
    "Så kan føreren allerede være blændet, når bilen kommer over toppen.", "By then the driver may already be dazzled as the car comes over the top.",
    "در آن صورت ممکن است راننده هنگام رد شدن از بالای تپه خیره شده باشد."),
)

Q(5484, "7.19", picture("""
A car at night seen from the front on a dark road, with only its left headlight lit; the right headlight is dark.
MUST BE CLEARLY VISIBLE: the single lit headlight and the dark one.
MUST NOT APPEAR: text, number-plate characters, brand names."""),
  "Det er mørkt, og du opdager, at den ene af bilens forlygter ikke lyser. Hvad gælder?",
  "It is dark, and you notice that one of the car's headlights is not working. What applies?",
  "هوا تاریک است و متوجه می‌شوید یکی از چراغ‌های جلوی خودرو روشن نمی‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Bilen er ikke i lovlig stand, og jeg får lygten skiftet hurtigst muligt.", "The car is not in a legal condition, and I have the light replaced as soon as possible.",
    "خودرو در وضعیت قانونی نیست و هرچه زودتر چراغ را تعویض می‌کنم.",
    "Som fører skal du sikre dig, at bilens lygter virker.", "As the driver you must make sure that the car's lights work.",
    "شما به‌عنوان راننده باید مطمئن شوید چراغ‌های خودرو کار می‌کنند."),
  S(True, "Andre kan tro, at min bil er en motorcykel.", "Others may think that my car is a motorcycle.", "ممکن است دیگران فکر کنند خودروی من موتورسیکلت است.",
    "Med kun én forlygte er bilens bredde svær at se for de modkørende.", "With only one headlight, the car's width is hard for oncoming traffic to see.",
    "با فقط یک چراغ جلو، تشخیص پهنای خودرو برای ترافیک روبه‌رو سخت است."),
  S(False, "Det er lovligt, så længe fjernlyset virker.", "It is legal as long as the high beam works.", "تا وقتی نور بالا کار می‌کند، قانونی است.",
    "Begge forlygter skal virke, både med nærlys og fjernlys.", "Both headlights must work, on dipped beam and on high beam.",
    "هر دو چراغ جلو باید کار کنند، هم با نور پایین هم با نور بالا."),
  S(False, "Jeg kan bare bruge tågeforlygterne i stedet.", "I can just use the front fog lights instead.", "می‌توانم به‌جایش از چراغ‌های مه‌شکن جلو استفاده کنم.",
    "Tågelygter må kun bruges i tåge og kraftig nedbør.", "Fog lights may only be used in fog and heavy precipitation.",
    "چراغ مه‌شکن فقط در مه و بارش شدید مجاز است."),
)

Q(5485, "7.16", view("""
THE SCENE: a motorway with two lanes in our direction at dusk; on the car's radio display in the dashboard strip a warning symbol is
lit (a triangle with an exclamation mark, no text).
MUST BE CLEARLY VISIBLE: the motorway ahead, the warning symbol on the radio display.
MUST NOT APPEAR: text.""", cond="dusk, dry road"),
  "I radioen advares der om en spøgelsesbilist, der kører mod kørselsretningen på den motorvej, du kører på. Hvordan forholder du dig?",
  "The radio warns of a wrong-way driver on the motorway you are driving on. What do you do?",
  "رادیو درباره‌ی راننده‌ای هشدار می‌دهد که در همین آزادراه خلاف جهت می‌راند. چه می‌کنید؟",
  S(True, "Jeg kører i højre vognbane.", "I drive in the right lane.", "در خط راست می‌رانم.",
    "En spøgelsesbilist kører ofte i den vognbane, han tror er den højre, altså din venstre.",
    "A wrong-way driver often uses the lane he thinks is the right one, which is your left.",
    "راننده‌ی خلاف‌رو اغلب در خطی می‌راند که فکر می‌کند خط راست است، یعنی خط چپِ شما."),
  S(True, "Jeg overhaler ikke.", "I do not overtake.", "سبقت نمی‌گیرم.",
    "Når du overhaler, kører du i venstre vognbane, hvor spøgelsesbilisten kan komme.", "When you overtake, you are in the left lane, where the wrong-way driver may come.",
    "هنگام سبقت در خط چپ هستید، جایی که ممکن است راننده‌ی خلاف‌رو بیاید."),
  S(True, "Jeg kører langsommere og øger afstanden til den forankørende.", "I drive more slowly and increase the distance to the vehicle in front.",
    "آهسته‌تر می‌رانم و فاصله‌ام را با وسیله‌ی جلو بیشتر می‌کنم.",
    "Så har du mere tid til at reagere.", "That gives you more time to react.", "این‌طور زمان بیشتری برای واکنش دارید."),
  S(True, "Jeg holder øje med lys, der kommer imod mig i min side af vejen.", "I watch for lights coming towards me on my side of the road.",
    "مراقب چراغ‌هایی هستم که در سمت خودم از روبه‌رو می‌آیند.",
    "Så kan du opdage spøgelsesbilisten i tide.", "That way you can spot the wrong-way driver in time.", "این‌طور می‌توانید راننده‌ی خلاف‌رو را به‌موقع ببینید."),
)

Q(5486, "7.16", view("""
THE SCENE: a motorway with two lanes in our direction in a standstill queue; the hard shoulder to the right, beyond an unbroken edge
line, is empty; a car ahead of us has pulled out onto the hard shoulder and drives along it past the queue.
MUST BE CLEARLY VISIBLE: the queue in both lanes, the empty hard shoulder, the car driving on it.
MUST NOT APPEAR: signs, text."""),
  "Der er kø på motorvejen i begge vognbaner, men nødsporet er tomt. En bil foran dig kører ud i nødsporet og kører forbi køen. Hvad gælder?",
  "There is a queue on the motorway in both lanes, but the hard shoulder is empty. A car ahead of you pulls out onto the hard shoulder and drives past the queue. What applies?",
  "در آزادراه در هر دو خط صف هست، ولی شانه‌ی اضطراری خالی است. خودرویی جلوی شما وارد شانه‌ی اضطراری می‌شود و از کنار صف رد می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg bliver i køen; nødsporet må ikke bruges til at køre forbi.", "I stay in the queue; the hard shoulder must not be used to drive past.",
    "در صف می‌مانم؛ از شانه‌ی اضطراری نباید برای رد شدن استفاده کرد.",
    "Den ubrudte kantlinje må kun overskrides for at standse eller køre af eller på vejen, og nødsporet er til nødsituationer.",
    "The unbroken edge line may only be crossed to stop or to drive off or onto the road, and the hard shoulder is for emergencies.",
    "از خط کناری ممتد فقط برای توقف یا ورود و خروج از جاده می‌توان رد شد و شانه‌ی اضطراری برای مواقع اضطراری است."),
  S(True, "Nødsporet skal være frit, så udrykningskøretøjer og biler med motorstop kan bruge det.",
    "The hard shoulder must be kept free so that emergency vehicles and broken-down cars can use it.",
    "شانه‌ی اضطراری باید خالی بماند تا خودروهای امدادی و خودروهای خراب بتوانند از آن استفاده کنند.",
    "I en kø kan nødsporet være den eneste vej frem for redningskøretøjer.", "In a queue the hard shoulder may be the only way through for rescue vehicles.",
    "در صف، شانه‌ی اضطراری ممکن است تنها راه عبور خودروهای امدادی باشد."),
  S(False, "Jeg må bruge nødsporet, når der er kø.", "I may use the hard shoulder when there is a queue.", "وقتی صف هست، می‌توانم از شانه‌ی اضطراری استفاده کنم.",
    "En kø giver ikke ret til at køre i nødsporet.", "A queue gives no right to drive on the hard shoulder.", "صف اجازه‌ی رانندگی در شانه‌ی اضطراری را نمی‌دهد."),
  S(False, "Når en anden gør det, må jeg også.", "When someone else does it, I may too.", "وقتی کس دیگری این کار را می‌کند، من هم می‌توانم.",
    "Andres overtrædelser gør det ikke tilladt for dig.", "Other people's offences do not make it allowed for you.", "تخلف دیگران آن را برای شما مجاز نمی‌کند."),
)

Q(5487, "7.16", above("""
THE SCENE: a motorway seen from above with two lanes in our direction and an exit slip road going off to the right; between the slip
road and the motorway lies a hatched area bordered by unbroken lines.
VEHICLES (colour code used strictly): a RED car (ours) already on the slip road; a DASHED ORANGE arrow from it across the hatched area
back onto the motorway; a SOLID GREEN arrow from it going on along the slip road.
MUST NOT APPEAR: signs, text."""),
  "Du er ved en fejl kørt ind på frakørslen fra motorvejen. Hvad gør du?",
  "You have taken the motorway exit by mistake. What do you do?",
  "به اشتباه وارد خروجیِ آزادراه شده‌اید. چه می‌کنید؟",
  S(True, "Jeg fortsætter ad frakørslen og kører på motorvejen igen ved den næste tilkørsel.",
    "I carry on along the exit road and get back onto the motorway at the next entry.",
    "در مسیر خروجی ادامه می‌دهم و از ورودیِ بعدی دوباره وارد آزادراه می‌شوم.",
    "Du må ikke vende eller bakke på motorvejen eller dens til- og frakørsler.", "You must not turn round or reverse on the motorway or its slip roads.",
    "در آزادراه و راه‌های ورودی و خروجی آن نباید دور بزنید یا دنده‌عقب بروید."),
  S(False, "Jeg kører over det skraverede område tilbage på motorvejen.", "I drive across the hatched area back onto the motorway.",
    "از روی ناحیه‌ی هاشورخورده به آزادراه برمی‌گردم.",
    "Det skraverede område må hverken køres på, standses eller parkeres på.", "The hatched area must not be driven on, stopped on or parked on.",
    "روی ناحیه‌ی هاشورخورده نه می‌شود راند، نه توقف کرد، نه پارک."),
  S(False, "Jeg bakker tilbage til motorvejen langs kanten.", "I reverse back to the motorway along the edge.",
    "کنار لبه دنده‌عقب به آزادراه برمی‌گردم.",
    "Det er forbudt at bakke på motorvejens til- og frakørsler.", "Reversing on the motorway's slip roads is forbidden.",
    "دنده‌عقب در راه‌های ورودی و خروجی آزادراه ممنوع است."),
  S(False, "Jeg standser i frakørslen og vender.", "I stop on the exit road and turn round.", "در مسیر خروجی می‌ایستم و دور می‌زنم.",
    "Det er forbudt at vende på motorvejens til- og frakørsler.", "Turning round on the motorway's slip roads is forbidden.",
    "دور زدن در راه‌های ورودی و خروجی آزادراه ممنوع است."),
)

Q(5488, "6.2", town("""
THE SCENE: a car park; our car has just scraped the side of a parked grey car while parking; nobody is nearby; a long scratch can be
seen on the grey car's door.
MUST BE CLEARLY VISIBLE: the scratch on the grey car's door, our car next to it.
MUST NOT APPEAR: people, text."""),
  "Du kommer til at ridse en parkeret bil, mens du parkerer. Ejeren er ikke til stede. Hvad skal du gøre?",
  "You scratch a parked car while parking. The owner is not there. What must you do?",
  "هنگام پارک کردن خودروی پارک‌شده‌ای را خط می‌اندازید. صاحبش آنجا نیست. چه باید بکنید؟",
  S(True, "Jeg standser straks og ser på skaden.", "I stop at once and look at the damage.", "فوراً می‌ایستم و آسیب را بررسی می‌کنم.",
    "Den, der er indblandet i et færdselsuheld, skal straks standse.", "Anyone involved in a traffic accident must stop at once.",
    "هر کس در تصادف رانندگی دخیل باشد، باید فوراً بایستد."),
  S(True, "Jeg underretter ejeren eller politiet hurtigst muligt.", "I inform the owner or the police as soon as possible.",
    "هرچه زودتر به صاحب خودرو یا پلیس خبر می‌دهم.",
    "Har du gjort skade på ting, og er ingen til stede, skal du snarest underrette skadelidte eller politiet.",
    "If you have damaged property and nobody is there, you must inform the injured party or the police as soon as possible.",
    "اگر به اموال آسیب زده‌اید و کسی حضور ندارد، باید هرچه زودتر به آسیب‌دیده یا پلیس خبر بدهید."),
  S(True, "Jeg sørger for, at ejeren kan få mit navn og min adresse.", "I make sure that the owner can get my name and address.",
    "ترتیبی می‌دهم که صاحب خودرو نام و نشانی‌ام را داشته باشد.",
    "Ejeren af den beskadigede bil har ret til at få dit navn og din adresse.", "The owner of the damaged car has the right to get your name and address.",
    "صاحب خودروی آسیب‌دیده حق دارد نام و نشانی شما را بگیرد."),
  S(False, "Jeg må køre videre, når ingen har set det.", "I may drive on when nobody has seen it.", "وقتی کسی ندیده، می‌توانم بروم.",
    "Pligterne gælder, uanset om nogen har set uheldet.", "The duties apply whether or not anyone saw the accident.",
    "این وظایف برقرارند، چه کسی تصادف را دیده باشد چه نه."),
)

Q(5489, "6.2", town("""
THE SCENE: a junction in town; two cars have just bumped into each other at low speed; both drivers stand beside the cars, nobody is
hurt; the cars block one lane, and their hazard lights flash.
MUST BE CLEARLY VISIBLE: the two cars with slight damage, the drivers standing unhurt, the blocked lane.
MUST NOT APPEAR: blood, text."""),
  "Du har været ude for et mindre sammenstød i et kryds. Ingen er kommet til skade, men bilerne spærrer en vognbane. Hvad gælder?",
  "You have had a minor collision at a junction. Nobody is hurt, but the cars are blocking a lane. What applies?",
  "در یک تقاطع تصادف کوچکی داشته‌اید. کسی آسیب ندیده، ولی خودروها یک خط را بسته‌اند. چه قاعده‌ای برقرار است؟",
  S(True, "Vi udveksler navn og adresse.", "We exchange names and addresses.", "نام و نشانی‌مان را به هم می‌دهیم.",
    "Du skal opgive navn og adresse til den anden part, hvis han beder om det.", "You must give your name and address to the other party if he asks for it.",
    "اگر طرف مقابل بخواهد، باید نام و نشانی‌تان را به او بدهید."),
  S(True, "Vi flytter bilerne, så de ikke er til fare eller spærrer unødigt, når vi har noteret det nødvendige.",
    "Once we have noted what is needed, we move the cars so that they are no danger and do not block needlessly.",
    "پس از یادداشت اطلاعات لازم، خودروها را جابه‌جا می‌کنیم تا خطری نداشته باشند و بی‌دلیل راه را نبندند.",
    "Kun ved dødsfald eller alvorlig personskade må stedet ikke ændres; ellers skal bilerne ikke holde til fare.",
    "Only after a death or serious injury must the scene be left unchanged; otherwise the cars should not stand where they are a danger.",
    "فقط در صورت مرگ یا آسیب جدی نباید محل را تغییر داد؛ در غیر این صورت خودروها نباید جایی بمانند که خطرناک است."),
  S(False, "Vi skal lade bilerne stå, til politiet kommer.", "We must leave the cars where they are until the police arrive.",
    "باید خودروها را تا رسیدن پلیس همان‌جا بگذاریم.",
    "Ved et uheld uden alvorlig personskade må bilerne godt flyttes.", "In an accident without serious injury, the cars may be moved.",
    "در تصادفی بدون آسیب جدی، جابه‌جا کردن خودروها مجاز است."),
  S(False, "Den, der ikke har skylden, behøver ikke at standse.", "The one who is not to blame does not need to stop.",
    "کسی که مقصر نیست، لازم نیست بایستد.",
    "Alle, der er indblandet i uheldet, skal standse, uanset skyld.", "Everyone involved in the accident must stop, whoever is to blame.",
    "همه‌ی کسانی که در تصادف دخیل‌اند، صرف‌نظر از مقصر بودن، باید بایستند."),
)

Q(5490, "7.8", above("""
THE SCENE: a motorway seen from above with two lanes in our direction.
VEHICLES (colour code used strictly): a RED car (ours) in the right lane; a GREY car has just moved from the left lane into the gap
right in front of the red car, much too close.
MUST NOT APPEAR: signs, text."""),
  "En bil overhaler dig og kører ind i hullet foran dig, så afstanden bliver alt for lille. Hvordan forholder du dig?",
  "A car overtakes you and moves into the gap in front of you, so that the distance becomes far too short. What do you do?",
  "خودرویی از شما سبقت می‌گیرد و درست جلوی شما وارد می‌شود و فاصله خیلی کم می‌شود. چه می‌کنید؟",
  S(True, "Jeg slipper speederen og øger afstanden igen.", "I ease off the accelerator and increase the distance again.",
    "پایم را از روی گاز برمی‌دارم و دوباره فاصله را زیاد می‌کنم.",
    "Du skal hele tiden holde en afstand, så du kan standse, hvis den forankørende bremser.",
    "You must always keep a distance at which you can stop if the one in front brakes.",
    "همیشه باید فاصله‌ای داشته باشید که اگر وسیله‌ی جلو ترمز کرد، بتوانید بایستید."),
  S(True, "Jeg reagerer roligt og blinker ikke vredt med lyset.", "I react calmly and do not flash my lights angrily.",
    "آرام واکنش نشان می‌دهم و با عصبانیت چراغ نمی‌زنم.",
    "Vrede signaler hjælper ikke og kan gøre situationen farligere; hold i stedet afstand.",
    "Angry signals do not help and may make the situation more dangerous; keep your distance instead.",
    "علامت دادن از سر عصبانیت کمکی نمی‌کند و ممکن است وضعیت را خطرناک‌تر کند؛ به‌جایش فاصله را حفظ کنید."),
  S(False, "Jeg kører tæt på for at vise, at det var forkert.", "I drive up close to show that it was wrong.", "از نزدیک دنبالش می‌کنم تا نشان دهم کارش اشتباه بود.",
    "Så risikerer du at køre ind i den, hvis den bremser.", "Then you risk running into it if it brakes.", "این‌طور اگر ترمز کند، ممکن است به آن بزنید."),
  S(False, "Jeg overhaler bilen med det samme for at komme foran igen.", "I overtake the car at once to get in front again.",
    "فوراً از آن خودرو سبقت می‌گیرم تا دوباره جلو بیفتم.",
    "Det gør situationen mere farlig.", "That makes the situation more dangerous.", "این کار وضعیت را خطرناک‌تر می‌کند."),
)

Q(5491, "7.8", town("""
THE SCENE: a town street; the car ahead of us drives slowly and brakes now and then; its driver leans forward, looking at the house
numbers.
MUST BE CLEARLY VISIBLE: the slow car ahead with its brake lights lit.
MUST NOT APPEAR: signs, readable house numbers, text."""),
  "Bilen foran dig kører langsomt og bremser af og til, som om føreren leder efter et husnummer. Hvordan forholder du dig?",
  "The car in front of you is driving slowly and braking now and then, as if the driver is looking for a house number. What do you do?",
  "خودروی جلوی شما آهسته می‌رود و گاهی ترمز می‌گیرد، انگار راننده دنبال پلاک یک خانه می‌گردد. چه می‌کنید؟",
  S(True, "Jeg holder ekstra god afstand, fordi den pludselig kan standse eller svinge.", "I keep an extra good distance, because it may suddenly stop or turn.",
    "فاصله‌ی بیشتری نگه می‌دارم، چون ممکن است ناگهان بایستد یا بپیچد.",
    "Du skal kunne standse, hvis den forankørende standser.", "You must be able to stop if the one in front stops.",
    "باید بتوانید اگر وسیله‌ی جلو ایستاد، بایستید."),
  S(False, "Jeg kører tæt på for at få føreren til at skynde sig.", "I drive up close to make the driver hurry.", "نزدیکش می‌روم تا راننده عجله کند.",
    "Så kan du ikke nå at standse, og det er farligt.", "Then you cannot stop in time, and that is dangerous.", "این‌طور نمی‌توانید به‌موقع بایستید و خطرناک است."),
  S(False, "Jeg dytter, så føreren ved, at der holder nogen bag ham.", "I sound the horn so that the driver knows someone is behind.",
    "بوق می‌زنم تا راننده بداند کسی پشتش است.",
    "Hornet må kun bruges for at forebygge eller afværge fare.", "The horn may only be used to prevent or avert danger.",
    "بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5492, "7.15", above("""
THE SCENE: a single-lane roundabout seen from above with a round grass central island.
VEHICLES (colour code used strictly): a RED car (ours) in the roundabout just past the exit it wanted to take; a SOLID GREEN arrow
from it going round the roundabout once more to that exit; a DASHED ORANGE arrow from it reversing back to the exit.
MUST NOT APPEAR: signs, text."""),
  "Du er kørt forbi den udkørsel i rundkørslen, du skulle have taget. Hvad gør du?",
  "You have driven past the exit you wanted in the roundabout. What do you do?",
  "در میدان از خروجی‌ای که باید می‌گرفتید رد شده‌اید. چه می‌کنید؟",
  S(True, "Jeg kører en tur mere rundt og tager udkørslen næste gang.", "I go round once more and take the exit next time.",
    "یک دور دیگر می‌زنم و دفعه‌ی بعد از آن خروجی خارج می‌شوم.",
    "Det er den sikre måde at komme tilbage til udkørslen på.", "That is the safe way to get back to the exit.", "این راه امنِ برگشتن به آن خروجی است."),
  S(False, "Jeg bakker tilbage til udkørslen.", "I reverse back to the exit.", "تا خروجی دنده‌عقب برمی‌گردم.",
    "Bakning i rundkørslen kan ikke ske uden fare for de andre.", "Reversing in the roundabout cannot be done without danger to the others.",
    "دنده‌عقب در میدان بدون خطر برای دیگران ممکن نیست."),
  S(False, "Jeg standser i rundkørslen, til der er plads til at bakke.", "I stop in the roundabout until there is room to reverse.",
    "در میدان می‌ایستم تا برای دنده‌عقب جا باز شود.",
    "En rundkørsel er et vejkryds, og der må du ikke standse.", "A roundabout is a junction, and you must not stop there.",
    "میدان یک تقاطع است و آنجا نباید توقف کنید."),
)

Q(5493, "7.5", town("""
THE SCENE: seen from the driver's seat looking back over the shoulder through the rear window of a car parked in an angled bay at the
side of a busy town street: behind us the street with passing cars and a cyclist; a tall van parked in the next bay hides part of the
view.
MUST BE CLEARLY VISIBLE: the street behind through the rear window, the tall van hiding part of the view, the cyclist.
MUST NOT APPEAR: signs, text."""),
  "Du holder i en skrå parkeringsbås ved en befærdet gade og skal bakke ud. Hvordan forholder du dig?",
  "You are parked in an angled bay beside a busy street and need to reverse out. What do you do?",
  "در یک جای پارکِ مورب کنار خیابانی شلوغ پارک کرده‌اید و باید دنده‌عقب بیرون بیایید. چه می‌کنید؟",
  S(True, "Jeg bakker langsomt og holder øje med trafikken på gaden og med cyklister.", "I reverse slowly and watch the traffic in the street and the cyclists.",
    "آهسته دنده‌عقب می‌روم و مراقب ترافیک خیابان و دوچرخه‌سواران هستم.",
    "Baglænskørsel må kun ske, når det kan ske uden fare eller ulempe for andre.", "Reversing may only be done when it can be done without danger or inconvenience to others.",
    "دنده‌عقب فقط وقتی مجاز است که برای دیگران خطر یا مزاحمتی نداشته باشد."),
  S(True, "Kan jeg ikke se forbi varevognen ved siden af, bakker jeg forsigtigt lidt ud ad gangen.",
    "If I cannot see past the van beside me, I reverse out carefully a little at a time.",
    "اگر نتوانم کنار ون بغلی را ببینم، با احتیاط و کم‌کم دنده‌عقب بیرون می‌آیم.",
    "Så kan du få udsyn uden at køre ud foran nogen.", "That way you can get a view without pulling out in front of anyone.",
    "این‌طور بدون این‌که جلوی کسی بروید دید پیدا می‌کنید."),
  S(False, "Trafikken på gaden skal holde tilbage for mig, når jeg bakker.", "The traffic in the street must give way to me when I reverse.",
    "وقتی دنده‌عقب می‌روم، ترافیک خیابان باید به من راه بدهد.",
    "Det er dig, der skal vente på et hul i trafikken.", "It is you who must wait for a gap in the traffic.", "این شما هستید که باید منتظر فاصله‌ای در ترافیک بمانید."),
  S(False, "Jeg bakker hurtigt ud, så jeg ikke spærrer gaden længe.", "I reverse out quickly so that I do not block the street for long.",
    "سریع دنده‌عقب بیرون می‌آیم تا مدت زیادی خیابان را نبندم.",
    "Hurtig baglænskørsel giver dig mindre tid til at reagere.", "Reversing fast gives you less time to react.",
    "دنده‌عقبِ سریع فرصت واکنش شما را کمتر می‌کند."),
)

Q(5494, "7.10", town("""
THE SCENE: a residential street with a chicane: two short kerbed narrowings set alternately on the right and on the left, so that
only one car at a time can pass; an oncoming car is already driving through the narrowing ahead; children play on a pavement nearby.
MUST BE CLEARLY VISIBLE: the chicane with its two narrowings, the oncoming car in it, the children nearby.
MUST NOT APPEAR: signs, text."""),
  "I et boligområde er vejen gjort smal med forskudte indsnævringer, en chikane, så kun én bil kan komme igennem ad gangen. Hvordan forholder du dig?",
  "In a residential area the road has been narrowed with staggered narrowings, a chicane, so that only one car can get through at a time. What do you do?",
  "در یک منطقه‌ی مسکونی خیابان با باریک‌شدگی‌های پلکانی (چیکان) تنگ شده تا هر بار فقط یک خودرو رد شود. چه می‌کنید؟",
  S(True, "Jeg sænker farten og kører roligt gennem chikanen.", "I slow down and drive calmly through the chicane.",
    "سرعتم را کم می‌کنم و آرام از چیکان رد می‌شوم.",
    "Chikanen skal netop få farten ned i området.", "The chicane is there precisely to bring the speed down in the area.",
    "چیکان دقیقاً برای پایین آوردن سرعت در منطقه ساخته شده است."),
  S(True, "Kommer der en bil imod mig, der allerede er i indsnævringen, venter jeg.", "If a car coming towards me is already in the narrowing, I wait.",
    "اگر خودرویی از روبه‌رو از قبل وارد باریک‌شدگی شده باشد، صبر می‌کنم.",
    "Den kan ikke komme forbi dig i indsnævringen.", "It cannot get past you in the narrowing.", "آن خودرو در باریک‌شدگی نمی‌تواند از کنار شما رد شود."),
  S(True, "Jeg holder øje med børn, der leger ved vejen.", "I watch out for children playing beside the road.", "مراقب کودکانی هستم که کنار خیابان بازی می‌کنند.",
    "Der skal vises særligt hensyn over for børn.", "Particular consideration must be shown to children.", "باید نسبت به کودکان ملاحظه‌ی ویژه داشت."),
  S(False, "Jeg kører hurtigt igennem, så jeg ikke holder den modkørende op.", "I drive through quickly so that I do not hold up the oncoming car.",
    "سریع رد می‌شوم تا خودروی روبه‌رو را معطل نکنم.",
    "Fartdæmpningen er der for at få farten ned.", "The traffic calming is there to bring the speed down.", "آرام‌سازی ترافیک برای پایین آوردن سرعت است."),
)

Q(5495, "7.17", above("""
THE SCENE: a road with two lanes in our direction seen from above.
VEHICLES (colour code used strictly): a RED car (ours) in the left lane; a GREY car in the right lane slightly ahead of us, drifting
over the lane line towards our lane without any indicator flashing.
MUST NOT APPEAR: signs, text."""),
  "Du kører i venstre af to vognbaner. Bilen i højre vognbane lidt foran dig begynder at glide over mod din vognbane uden at blinke. Hvordan forholder du dig?",
  "You are driving in the left of two lanes. The car in the right lane slightly ahead of you starts drifting towards your lane without signalling. What do you do?",
  "در خط چپ از دو خط می‌رانید. خودروی خط راست که کمی جلوتر از شماست، بدون راهنما به سمت خط شما کشیده می‌شود. چه می‌کنید؟",
  S(True, "Jeg bremser og giver bilen plads.", "I brake and give the car room.", "ترمز می‌گیرم و به آن خودرو جا می‌دهم.",
    "Så undgår du et sammenstød.", "That way you avoid a collision.", "این‌طور از برخورد جلوگیری می‌کنید."),
  S(True, "Jeg må bruge hornet, hvis det kan afværge et sammenstød.", "I may use the horn if it can prevent a collision.",
    "اگر بتواند از برخورد جلوگیری کند، می‌توانم بوق بزنم.",
    "Hornet må bruges for at forebygge eller afværge fare.", "The horn may be used to prevent or avert danger.", "از بوق برای پیشگیری یا دفع خطر می‌توان استفاده کرد."),
  S(False, "Jeg sætter farten op, så bilen ikke kan komme over i min vognbane.", "I speed up so that the car cannot come over into my lane.",
    "سرعتم را بالا می‌برم تا آن خودرو نتواند وارد خط من شود.",
    "Så kan I støde sammen.", "Then you may collide.", "این‌طور ممکن است با هم برخورد کنید."),
  S(False, "Jeg holder min plads, fordi det er bilen, der begår fejl.", "I hold my position, because it is the other car making the mistake.",
    "جایم را حفظ می‌کنم، چون آن خودرو است که اشتباه می‌کند.",
    "Du skal gøre, hvad du kan, for at undgå et uheld, også når en anden begår fejl.",
    "You must do what you can to avoid an accident, also when someone else makes a mistake.",
    "باید هر کاری می‌توانید برای جلوگیری از تصادف بکنید، حتی وقتی دیگری اشتباه می‌کند."),
)

Q(5496, "3.2", view("""
THE SCENE: a street in an industrial area; ahead of us a large lorry reverses slowly from the street into a loading yard on the right,
its long body swinging across our lane; simple sound lines near its rear show a reversing beeper; nobody is guiding it.
MUST BE CLEARLY VISIBLE: the reversing lorry across our lane, the loading yard it is reversing into.
MUST NOT APPEAR: signs, text."""),
  "En stor lastbil bakker ind på en grund og spærrer vejen foran dig. Hvordan forholder du dig?",
  "A large lorry is reversing into a yard and blocking the road in front of you. What do you do?",
  "یک کامیون بزرگ در حال دنده‌عقب رفتن به داخل یک محوطه است و راه جلوی شما را بسته است. چه می‌کنید؟",
  S(True, "Jeg standser i god afstand og venter, til lastbilen er færdig.", "I stop at a good distance and wait until the lorry has finished.",
    "با فاصله‌ی کافی می‌ایستم و صبر می‌کنم تا کار کامیون تمام شود.",
    "Lastbilen har brug for hele vejen for at komme ind.", "The lorry needs the whole road to get in.", "کامیون برای وارد شدن به تمام عرض خیابان نیاز دارد."),
  S(True, "Chaufføren kan ikke se mig, hvis jeg holder tæt bag lastbilen.", "The driver cannot see me if I am close behind the lorry.",
    "اگر نزدیک پشت کامیون باشم، راننده مرا نمی‌بیند.",
    "Lastbiler har store blinde vinkler, især bagud.", "Lorries have large blind spots, especially to the rear.",
    "کامیون‌ها نقطه‌های کور بزرگی دارند، به‌ویژه در عقب."),
  S(True, "Jeg kører ikke ind bag lastbilen for at komme forbi.", "I do not drive in behind the lorry to get past.", "برای رد شدن پشت کامیون نمی‌روم.",
    "Lastbilen kan bakke ind i dig.", "The lorry may reverse into you.", "ممکن است کامیون با دنده‌عقب به شما بزند."),
  S(True, "Jeg giver lastbilen god plads, fordi den svinger meget ud, når den manøvrerer.", "I give the lorry plenty of room, because it swings out a lot when manoeuvring.",
    "به کامیون جای کافی می‌دهم، چون هنگام مانور خیلی به اطراف می‌چرخد.",
    "Lange køretøjer kræver meget plads, når de manøvrerer.", "Long vehicles need a lot of room when they manoeuvre.",
    "وسایل بلند هنگام مانور به جای زیادی نیاز دارند."),
)

Q(5497, "4.5", town("""
THE SCENE: a town street with a cycle path on the right; a young person on an electric kick scooter rides on the cycle path next to
our car, glancing down at a phone held in one hand.
MUST BE CLEARLY VISIBLE: the young person on the electric scooter looking at the phone.
MUST NOT APPEAR: signs, text, brand names."""),
  "På cykelstien ved siden af dig kører en ung person på elløbehjul og kigger på sin telefon. Hvordan forholder du dig?",
  "On the cycle path next to you a young person on an electric scooter is looking at their phone. What do you do?",
  "در مسیر دوچرخه‌ی کنار شما نوجوانی با اسکوتر برقی می‌راند و به تلفنش نگاه می‌کند. چه می‌کنید؟",
  S(True, "Føreren kan pludselig svinge ud eller standse, så jeg holder god afstand.", "The rider may suddenly swerve out or stop, so I keep a good distance.",
    "ممکن است ناگهان به بیرون بپیچد یا بایستد، پس فاصله‌ی کافی نگه می‌دارم.",
    "En uopmærksom trafikant kan opføre sig uforudsigeligt.", "An inattentive road user can behave unpredictably.",
    "کاربر راهِ بی‌حواس ممکن است رفتار غیرقابل‌پیش‌بینی داشته باشد."),
  S(True, "Elløbehjul kan være svære at høre og at opdage i spejlet.", "Electric scooters can be hard to hear and to spot in the mirror.",
    "شنیدن صدای اسکوتر برقی و دیدنش در آینه ممکن است سخت باشد.",
    "De er små og næsten lydløse.", "They are small and almost silent.", "کوچک و تقریباً بی‌صدا هستند."),
  S(False, "Elløbehjul kører altid langsomt, så jeg behøver ikke holde øje med dem.", "Electric scooters always go slowly, so I do not need to watch them.",
    "اسکوترهای برقی همیشه آهسته می‌روند، پس لازم نیست حواسم به آن‌ها باشد.",
    "De kan køre lige så hurtigt som cyklister og dukke pludselig op.", "They can go as fast as cyclists and appear suddenly.",
    "می‌توانند به سرعت دوچرخه‌سواران حرکت کنند و ناگهان ظاهر شوند."),
  S(False, "Jeg kan køre tæt forbi, fordi et elløbehjul fylder mindre end en cykel.", "I can pass close by, because a scooter takes up less room than a bicycle.",
    "می‌توانم از نزدیکش رد شوم، چون اسکوتر جای کمتری از دوچرخه می‌گیرد.",
    "Du skal holde god afstand til siden til alle på to hjul.", "You must keep a good side distance from everyone on two wheels.",
    "باید از همه‌ی کسانی که روی دوچرخ هستند فاصله‌ی کافی از پهلو بگیرید."),
)

Q(5498, "5.1", view("""
THE SCENE: a country road; along the right edge line a band of short grooves (rumble strips) is milled into the asphalt, and our
right wheels are just running over it.
MUST BE CLEARLY VISIBLE: the grooves along the edge line under our right wheels.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Bilen begynder at brumme og ryste, fordi højre hjul kører på riller i asfalten ved kantlinjen. Hvad betyder det?",
  "The car starts to rumble and shake because the right wheels are running over grooves in the asphalt at the edge line. What does it mean?",
  "خودرو شروع به غرش و لرزش می‌کند، چون چرخ‌های راست روی شیارهای آسفالتِ کنار خط کناری می‌روند. معنی‌اش چیست؟",
  S(True, "Rillerne advarer mig om, at jeg er ved at køre ud over vejkanten, så jeg styrer roligt tilbage.",
    "The grooves warn me that I am about to run off the edge of the road, so I steer back calmly.",
    "این شیارها هشدار می‌دهند که در حال خارج شدن از لبه‌ی جاده‌ام، پس آرام به مسیر برمی‌گردم.",
    "Rumlestriber skal vække opmærksomheden hos førere, der er ved at komme ud af deres vognbane.",
    "Rumble strips are there to alert drivers who are leaving their lane.",
    "این شیارها برای هوشیار کردن رانندگانی است که در حال خارج شدن از خط خود هستند."),
  S(False, "Rillerne betyder, at jeg skal sætte farten op.", "The grooves mean that I must speed up.", "این شیارها یعنی باید سرعتم را بالا ببرم.",
    "De er en advarsel om, at du er på vej ud af vognbanen.", "They are a warning that you are leaving the lane.",
    "هشداری هستند که در حال خارج شدن از خط هستید."),
  S(False, "Jeg skal bremse hårdt med det samme.", "I must brake hard at once.", "باید فوراً ترمز شدید بگیرم.",
    "En hård opbremsning kan få bilen til at skride; styr roligt tilbage.", "Braking hard may make the car skid; steer back calmly.",
    "ترمز شدید ممکن است خودرو را منحرف کند؛ آرام به مسیر برگردید."),
  S(False, "Rillerne viser, at der er vejarbejde længere fremme.", "The grooves show that there are road works further ahead.",
    "این شیارها نشان می‌دهند جلوتر کار جاده‌ای در جریان است.",
    "De advarer om, at du er ved at forlade vognbanen.", "They warn that you are about to leave the lane.", "هشدار می‌دهند که در حال ترک خط خود هستید."),
)

Q(5499, "5.2", view("""
THE SCENE: a country road on a cold, sunny winter morning; most of the asphalt is dry, but a stretch ahead in the shadow of a row of
tall trees is shiny with ice.
MUST BE CLEARLY VISIBLE: the dry sunny asphalt, the shiny icy stretch in the shadow of the trees.
MUST NOT APPEAR: signs, text, other vehicles.""", cond="cold sunny winter morning, low sun"),
  "Det er en kold og solrig vintermorgen. Vejen er tør, men foran dig ligger et stykke i skygge af høje træer. Hvad skal du være opmærksom på?",
  "It is a cold, sunny winter morning. The road is dry, but ahead of you there is a stretch in the shadow of tall trees. What must you be aware of?",
  "یک صبح سرد و آفتابیِ زمستانی است. جاده خشک است، ولی جلوی شما بخشی در سایه‌ی درختان بلند است. به چه چیزی باید توجه کنید؟",
  S(True, "Der kan være is i skyggen, selv om resten af vejen er tør.", "There may be ice in the shade even though the rest of the road is dry.",
    "ممکن است در سایه یخ باشد، با این‌که بقیه‌ی جاده خشک است.",
    "Solen har ikke kunnet tø isen i skyggen.", "The sun has not been able to melt the ice in the shade.", "آفتاب نتوانسته یخِ داخل سایه را آب کند."),
  S(True, "Jeg sænker farten, før jeg kører ind i skyggen.", "I slow down before I drive into the shade.", "پیش از ورود به سایه سرعتم را کم می‌کنم.",
    "Det er farligt at skulle bremse, når du allerede er på isen.", "It is dangerous to have to brake once you are already on the ice.",
    "ترمز گرفتن وقتی روی یخ هستید خطرناک است."),
  S(True, "Jeg undgår hårde opbremsninger og hurtige ratbevægelser på strækningen.", "I avoid hard braking and quick steering movements on that stretch.",
    "در آن بخش از ترمز شدید و حرکت‌های سریع فرمان پرهیز می‌کنم.",
    "På is mister hjulene let grebet.", "On ice the wheels easily lose their grip.", "روی یخ چرخ‌ها به‌راحتی چسبندگی را از دست می‌دهند."),
  S(False, "Når solen skinner, er der ingen risiko for glat vej.", "When the sun is shining, there is no risk of a slippery road.",
    "وقتی آفتاب می‌تابد، خطر لغزندگی جاده نیست.",
    "I skyggen kan vejen være glat længe efter, at den er tør i solen.", "In the shade the road can stay slippery long after it is dry in the sun.",
    "در سایه ممکن است جاده مدت‌ها پس از خشک شدن در آفتاب لغزنده بماند."),
)

Q(5500, "8.1", picture("""
Inside a car seen from the front seats: on the back seat a teenager sits without a seat belt, looking at a phone; the unused belt hangs
beside him.
MUST BE CLEARLY VISIBLE: the teenager on the back seat without a belt, the unused belt.
MUST NOT APPEAR: text, brand names."""),
  "En 16-årig passager på bagsædet vil ikke tage sikkerhedsselen på. Hvad gælder?",
  "A 16-year-old passenger on the back seat does not want to put on the seat belt. What applies?",
  "مسافری ۱۶ ساله روی صندلی عقب نمی‌خواهد کمربند ایمنی ببندد. چه قاعده‌ای برقرار است؟",
  S(True, "Passageren har selv pligt til at bruge selen.", "The passenger is obliged to use the belt himself.", "خودِ مسافر موظف است کمربند ببندد.",
    "Passagerer på 15 år og derover har selv ansvaret for at bruge sikkerhedssele; for yngre har føreren ansvaret.",
    "Passengers aged 15 and over are themselves responsible for wearing a seat belt; for younger ones the driver is responsible.",
    "مسافران ۱۵ ساله و بالاتر خودشان مسئول بستن کمربندند؛ برای کوچک‌ترها راننده مسئول است."),
  S(True, "Uden sele kan passageren blive slynget frem og skade både sig selv og andre i bilen.",
    "Without a belt the passenger may be thrown forward and injure both himself and others in the car.",
    "بدون کمربند ممکن است مسافر به جلو پرتاب شود و هم به خودش و هم به دیگران آسیب بزند.",
    "Ved et sammenstød bliver en passager uden sele kastet rundt i bilen.", "In a collision a passenger without a belt is thrown around inside the car.",
    "در تصادف، مسافرِ بدون کمربند داخل خودرو به این‌طرف و آن‌طرف پرتاب می‌شود."),
  S(True, "Jeg beder passageren tage selen på, før vi kører.", "I ask the passenger to put the belt on before we drive.",
    "از مسافر می‌خواهم پیش از حرکت کمربند ببندد.",
    "Som fører kan du sørge for, at alle er spændt fast, før du kører.", "As the driver you can make sure that everyone is belted before you drive.",
    "شما به‌عنوان راننده می‌توانید پیش از حرکت مطمئن شوید همه کمربند بسته‌اند."),
  S(False, "Sele er kun påbudt på forsædet.", "A seat belt is only compulsory in the front seat.", "کمربند فقط برای صندلی جلو الزامی است.",
    "Sikkerhedsselen skal bruges på alle pladser, hvor der er sele.", "The seat belt must be used in every seat that has one.",
    "در هر صندلی‌ای که کمربند دارد، باید از آن استفاده کرد."),
)
