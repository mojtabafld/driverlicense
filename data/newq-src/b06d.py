# «آزمون جدید», batch 6 (5501–5600), part d: lane changes (7.4), moving off (7.1), position (7.2), reversing and turning round
# (7.5), weather (5.2), safe traffic (6.2), the motorway (7.16), lights (7.19), and one each of 3.2, 4.5, 5.1, 7.8, 7.15, 10.3.
# Rules: Færdselsloven §§ 2 nr. 12 (lighting-up time also when snow, rain, fog or the like make lights necessary), 3 stk. 2,
# 15 stk. 1, 18 stk. 1–2 (reversing, pulling out and lane changes without danger or undue inconvenience), 21 stk. 4, 32 stk. 1–2
# (the horn only to prevent or avert danger; signal before pulling out and before lane changes on the motorway), 33 stk. 3 and 6
# (no high beam on lit roads, when meeting or following; no dazzling), 33 stk. 5, 41 stk. 1, 44 (motorway only for motor
# vehicles that can and may do at least 50 km/h), 46 stk. 2 (no turning or reversing; stopping only at parking and rest areas and
# at an emergency phone), 48 (§§ 44–47 also on a motortrafikvej and its slip roads), 55 a (no hand-held phone while driving),
# 125 stk. 2–3 (3 klip in 3 years: betinget frakendelse; 2 klip in the first 3 years after the first licence: kørselsforbud,
# then a kontrollerende køreprøve; a klip lapses 3 years after the offence); Bekendtgørelse om vejafmærkning (BEK 425/2023):
# D 12, E 43 «Motortrafikvej», Q 41, Q 44 (not crossed, also not when turning round).
from nq import Q, S, above, picture, town, view

Q(5576, "7.4", view("""
THE SCENE: a motorway at night with two lanes in our direction and no street lights; we drive in the right lane behind a slow lorry; in the
left door mirror (at the left edge of the picture) only the two headlights of a car behind us in the left lane can be seen.
MUST BE CLEARLY VISIBLE: the lorry ahead, the two headlights in the left door mirror.
MUST NOT APPEAR: signs, text.""", cond="night, dark, dry road"),
  "Det er mørkt. Du vil skifte til venstre vognbane på motorvejen. I spejlet ser du kun lygterne fra en bil bag dig i venstre vognbane. "
  "Hvad gælder?",
  "It is dark. You want to move into the left lane on the motorway. In the mirror you can only see the headlights of a car behind you in "
  "the left lane. What applies?",
  "هوا تاریک است. می‌خواهید در آزادراه به خط چپ بروید. در آینه فقط چراغ‌های خودرویی را می‌بینید که پشت سر شما در خط چپ می‌آید. "
  "چه قاعده‌ای برقرار است؟",
  S(True, "Det er svært at bedømme, hvor hurtigt bilen kommer, når jeg kun ser dens lygter.",
    "It is hard to judge how fast the car is coming when I can only see its lights.",
    "وقتی فقط چراغ‌های خودرو را می‌بینم، تخمین سرعتش سخت است.",
    "I mørke mangler du de holdepunkter, du ellers bruger til at bedømme afstand og fart.",
    "In the dark you lack the clues you otherwise use to judge distance and speed.",
    "در تاریکی نشانه‌هایی را که معمولاً برای تخمین فاصله و سرعت به کار می‌برید ندارید."),
  S(True, "Jeg venter, til jeg er sikker på, at der er plads.", "I wait until I am sure there is room.",
    "صبر می‌کنم تا مطمئن شوم جا هست.",
    "Vognbaneskift må kun ske, når det kan ske uden fare eller unødig ulempe for andre.",
    "Lane changes may only be made when they can be done without danger or undue inconvenience to others.",
    "تغییر خط فقط وقتی مجاز است که بدون خطر یا مزاحمت بی‌دلیل برای دیگران باشد."),
  S(True, "Jeg kigger også over skulderen for at se i den blinde vinkel.", "I also look over my shoulder to check the blind spot.",
    "از روی شانه هم نگاه می‌کنم تا نقطه‌ی کور را ببینم.",
    "Et køretøj i den blinde vinkel ses ikke i spejlet.", "A vehicle in the blind spot is not seen in the mirror.",
    "وسیله‌ای که در نقطه‌ی کور است در آینه دیده نمی‌شود."),
  S(False, "Når lygterne ser små ud, kan jeg altid nå at skifte vognbane.", "When the lights look small, I always have time to change lanes.",
    "وقتی چراغ‌ها کوچک به نظر می‌رسند، همیشه وقت تغییر خط دارم.",
    "En bil, der kører meget hurtigt, kan være lige bag dig på et øjeblik.", "A car going very fast can be right behind you in a moment.",
    "خودرویی که خیلی سریع می‌آید ممکن است در یک لحظه پشت سر شما باشد."),
)

Q(5577, "7.4", view("""
THE SCENE: a motorway with two lanes in our direction; we tow a box trailer, and its front corner can be seen in the left door mirror (at
the left edge of the picture), partly hiding the view behind; in the right lane ahead a slow lorry; the left lane is busy.
MUST BE CLEARLY VISIBLE: the trailer in the left door mirror, the slow lorry ahead, the busy left lane.
MUST NOT APPEAR: signs, text."""),
  "Du kører med trailer på motorvejen og vil skifte til venstre vognbane. Hvad skal du være opmærksom på?",
  "You are towing a trailer on the motorway and want to move into the left lane. What must you be aware of?",
  "در آزادراه با تریلر می‌رانید و می‌خواهید به خط چپ بروید. به چه چیزی باید توجه کنید؟",
  S(True, "Jeg skal bruge et større hul i trafikken, fordi vogntoget er længere.", "I need a bigger gap in the traffic because the combination is longer.",
    "به فاصله‌ی بزرگ‌تری در ترافیک نیاز دارم، چون خودرو و تریلر بلندترند.",
    "Et langt vogntog har brug for mere plads, når det skifter vognbane.", "A long combination needs more room when it changes lanes.",
    "یک خودروی بلند با تریلر هنگام تغییر خط به جای بیشتری نیاز دارد."),
  S(True, "Traileren kan gøre det sværere at se, hvad der kommer bagfra.", "The trailer can make it harder to see what is coming from behind.",
    "تریلر ممکن است دیدن چیزی را که از پشت می‌آید سخت‌تر کند.",
    "Traileren kan dække en del af udsynet i spejlene.", "The trailer can cover part of the view in the mirrors.",
    "تریلر ممکن است بخشی از دید آینه‌ها را بپوشاند."),
  S(False, "Bilerne i venstre vognbane skal give plads, fordi jeg har trailer.", "The cars in the left lane must make room because I have a trailer.",
    "خودروهای خط چپ باید جا باز کنند، چون من تریلر دارم.",
    "Det er dig, der skal sikre dig, at vognbaneskiftet kan ske uden fare.", "It is you who must make sure that the lane change can be done safely.",
    "این شما هستید که باید مطمئن شوید تغییر خط بی‌خطر است."),
  S(False, "Med trailer behøver jeg ikke give tegn, fordi de andre kan se, at jeg kører langsomt.",
    "With a trailer I need not signal, because the others can see that I am driving slowly.",
    "با تریلر لازم نیست راهنما بزنم، چون دیگران می‌بینند آهسته می‌روم.",
    "På motorvejen skal du give tegn før vognbaneskift.", "On the motorway you must signal before changing lanes.",
    "در آزادراه پیش از تغییر خط باید راهنما بزنید."),
)

Q(5578, "7.4", view("""
THE SCENE: a motorway with two lanes in our direction; we drive at about 90 km/h in the right lane, close behind a lorry; in the left lane
cars pass at about 120 km/h; in the left door mirror (at the left edge of the picture) a gap can be seen behind a passing car.
MUST BE CLEARLY VISIBLE: the lorry ahead, the faster cars in the left lane, the gap in the left door mirror.
MUST NOT APPEAR: signs, text."""),
  "Du kører 90 km/t i højre vognbane og vil skifte til venstre vognbane, hvor trafikken kører omkring 120 km/t. Hvad gælder?",
  "You are doing 90 km/h in the right lane and want to move into the left lane, where the traffic is doing about 120 km/h. What applies?",
  "در خط راست با ۹۰ کیلومتر بر ساعت می‌رانید و می‌خواهید به خط چپ بروید که ترافیک آن حدود ۱۲۰ کیلومتر بر ساعت حرکت می‌کند. چه "
  "قاعده‌ای برقرار است؟",
  S(True, "Jeg sætter farten op, mens jeg skifter, så jeg ikke tvinger bilerne bag mig til at bremse.",
    "I speed up as I change lanes so that I do not force the cars behind me to brake.",
    "هنگام تغییر خط سرعتم را بالا می‌برم تا خودروهای پشت سرم مجبور به ترمز نشوند.",
    "Vognbaneskift må ikke ske til unødig ulempe for andre.", "A lane change must not cause undue inconvenience to others.",
    "تغییر خط نباید برای دیگران مزاحمت بی‌دلیل ایجاد کند."),
  S(False, "Jeg skifter med samme fart og lader de andre bremse for mig.", "I change lanes at the same speed and let the others brake for me.",
    "با همان سرعت تغییر خط می‌دهم و می‌گذارم دیگران برایم ترمز کنند.",
    "Så tvinger du bilerne bag dig til at bremse hårdt.", "Then you force the cars behind you to brake hard.",
    "این‌طور خودروهای پشت سرتان را به ترمز شدید وادار می‌کنید."),
  S(False, "Jeg må skifte, når jeg har blinket i tre sekunder.", "I may change lanes when I have signalled for three seconds.",
    "وقتی سه ثانیه راهنما زده باشم، می‌توانم خط عوض کنم.",
    "Blinklyset giver ingen ret; du skal sikre dig, at der er plads.", "The indicator gives no right; you must make sure there is room.",
    "راهنما حقی نمی‌دهد؛ باید مطمئن شوید که جا هست."),
  S(False, "Jeg må køre over 130 km/t, hvis det er nødvendigt for at komme ind i vognbanen.",
    "I may go over 130 km/h if that is necessary to get into the lane.",
    "اگر برای ورود به خط لازم باشد، می‌توانم بیش از ۱۳۰ کیلومتر بر ساعت بروم.",
    "Hastighedsgrænsen gælder også, når du skifter vognbane.", "The speed limit also applies when you change lanes.",
    "حد سرعت هنگام تغییر خط هم برقرار است."),
)

Q(5579, "7.1", town("""
THE SCENE: a quiet town street; we sit in an electric car parked at the right kerb, about to pull out; on the pavement right beside the car
a woman pushing a pram walks along, looking at her phone, and is about to step off the kerb just in front of our car.
MUST BE CLEARLY VISIBLE: the woman with the pram close to the front of our car, her looking at the phone.
MUST NOT APPEAR: signs, text, brand names."""),
  "Du kører i en elbil, der næsten ikke larmer ved lav fart, og vil køre ud fra kantstenen. Hvad skal du være opmærksom på?",
  "You are driving an electric car that makes almost no noise at low speed, and you want to pull out from the kerb. What must you be aware of?",
  "با یک خودروی برقی که در سرعت کم تقریباً صدایی ندارد، می‌خواهید از کنار جدول حرکت کنید. به چه چیزی باید توجه کنید؟",
  S(True, "Gående og cyklister hører måske ikke bilen og kan gå ud foran den.", "Pedestrians and cyclists may not hear the car and may step out in front of it.",
    "ممکن است عابران و دوچرخه‌سواران صدای خودرو را نشنوند و جلوی آن بیایند.",
    "En lydsvag bil bliver let overset af gående.", "A quiet car is easily missed by pedestrians.", "خودروی کم‌صدا به‌راحتی از چشم عابران دور می‌ماند."),
  S(True, "Jeg sikrer mig ekstra godt, at ingen er på vej ud på vejen tæt ved bilen.", "I make extra sure that nobody is about to step into the road close to the car.",
    "با دقت بیشتری مطمئن می‌شوم که کسی نزدیک خودرو در حال ورود به خیابان نیست.",
    "Igangsætning må kun ske, når det kan ske uden fare for andre.", "Pulling out may only be done when it can be done without danger to others.",
    "حرکت از کنار جدول فقط وقتی مجاز است که برای دیگران خطری نداشته باشد."),
  S(False, "Elbiler har forkørselsret, når de kører ud fra kantstenen.", "Electric cars have right of way when they pull out from the kerb.",
    "خودروهای برقی هنگام حرکت از کنار جدول حق تقدم دارند.",
    "Der er ingen særregler for elbiler; du skal sikre dig, at det kan ske uden fare.",
    "There are no special rules for electric cars; you must make sure that it can be done safely.",
    "برای خودروهای برقی قاعده‌ی ویژه‌ای نیست؛ باید مطمئن شوید که بی‌خطر است."),
  S(False, "Jeg dytter, så de gående ved, at bilen kører.", "I sound the horn so that the pedestrians know the car is moving.",
    "بوق می‌زنم تا عابران بدانند خودرو در حرکت است.",
    "Hornet må kun bruges for at forebygge eller afværge fare; vent hellere, til der er frit.",
    "The horn may only be used to prevent or avert danger; rather wait until the way is clear.",
    "بوق فقط برای پیشگیری یا دفع خطر است؛ بهتر است صبر کنید تا راه باز شود."),
)

Q(5580, "7.1", town("""
THE SCENE: a quiet two-way residential street with houses and gardens; we sit in a car parked at the LEFT kerb, about to pull out; ahead in
the lane next to us a car comes towards us; in the interior mirror a cyclist approaches from behind on the other side of the street.
MUST BE CLEARLY VISIBLE: the car coming towards us in the lane next to us, the cyclist in the mirror.
MUST NOT APPEAR: signs, text."""),
  "Du holder parkeret i venstre side af en villavej med trafik i begge retninger og vil køre ud. Hvad skal du være opmærksom på?",
  "You are parked on the left side of a residential street with traffic in both directions and want to pull out. What must you be aware of?",
  "در سمت چپ یک خیابان مسکونیِ دوطرفه پارک کرده‌اید و می‌خواهید حرکت کنید. به چه چیزی باید توجه کنید؟",
  S(True, "Jeg skal holde øje med trafik både forfra og bagfra.", "I must watch for traffic both from ahead and from behind.",
    "باید مراقب ترافیک هم از جلو و هم از پشت باشم.",
    "Du skal over den vognbane, hvor trafikken kommer imod dig, og ind i den, hvor den kommer bagfra.",
    "You have to cross the lane where traffic comes towards you and enter the one where it comes from behind.",
    "باید از خطی که ترافیکش رو به شما می‌آید رد شوید و وارد خطی شوید که ترافیکش از پشت می‌آید."),
  S(True, "Jeg skal over i højre side af vejen, så snart jeg er kørt ud.", "I must get over to the right side of the road as soon as I have pulled out.",
    "به محض حرکت باید به سمت راست خیابان بروم.",
    "Kørende skal holde i højre side af vejen.", "Drivers must keep to the right side of the road.", "رانندگان باید سمت راست جاده حرکت کنند."),
  S(True, "Jeg giver tegn, før jeg kører ud.", "I signal before I pull out.", "پیش از حرکت راهنما می‌زنم.",
    "Du skal give tegn før igangsætning fra kanten af vejen.", "You must signal before pulling out from the edge of the road.",
    "پیش از حرکت از کنار جاده باید راهنما بزنید."),
  S(False, "Jeg kører et stykke i venstre side, til der kommer en sidevej, hvor jeg kan komme over.",
    "I drive some way on the left side until there is a side road where I can get across.",
    "مسافتی در سمت چپ می‌رانم تا به راهی فرعی برسم که بتوانم از آن رد شوم.",
    "Du må ikke køre i venstre side; du skal over i højre side med det samme.", "You must not drive on the left side; you must get over to the right straight away.",
    "نباید در سمت چپ برانید؛ باید فوراً به سمت راست بروید."),
)

Q(5581, "7.1", town("""
THE SCENE: a town street; we sit in a car parked at the right kerb with a small box trailer hitched behind it (seen in the left door mirror
at the left edge of the picture); in the same mirror cars approach from behind at short intervals.
MUST BE CLEARLY VISIBLE: the trailer in the door mirror, the cars approaching from behind.
MUST NOT APPEAR: signs, text."""),
  "Du holder ved kantstenen med en trailer koblet på og vil køre ud. Hvad gælder?",
  "You are parked at the kerb with a trailer hitched on and want to pull out. What applies?",
  "با تریلری که پشت خودرو بسته شده کنار جدول ایستاده‌اید و می‌خواهید حرکت کنید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg skal bruge et større hul i trafikken, fordi vogntoget er længere og kommer langsommere op i fart.",
    "I need a bigger gap in the traffic because the combination is longer and gains speed more slowly.",
    "به فاصله‌ی بزرگ‌تری در ترافیک نیاز دارم، چون خودرو و تریلر بلندترند و دیرتر شتاب می‌گیرند.",
    "Du må kun køre ud, når det kan ske uden fare eller unødig ulempe for andre.",
    "You may only pull out when it can be done without danger or undue inconvenience to others.",
    "فقط وقتی می‌توانید حرکت کنید که برای دیگران خطر یا مزاحمتی نداشته باشد."),
  S(False, "De andre trafikanter skal holde tilbage, fordi jeg kører med trailer.", "The other road users must give way because I am towing a trailer.",
    "کاربران دیگر راه باید به من راه بدهند، چون تریلر دارم.",
    "En trailer giver dig ingen fortrinsret.", "A trailer gives you no priority.", "تریلر به شما حق تقدمی نمی‌دهد."),
  S(False, "Jeg behøver ikke give tegn, fordi traileren gør bilen let at se.", "I need not signal because the trailer makes the car easy to see.",
    "لازم نیست راهنما بزنم، چون تریلر خودرو را به‌راحتی دیدنی می‌کند.",
    "Du skal altid give tegn, før du kører ud fra kanten af vejen.", "You must always signal before pulling out from the edge of the road.",
    "همیشه پیش از حرکت از کنار جاده باید راهنما بزنید."),
)

Q(5582, "7.2", town("""
THE SCENE: a residential street with one lane in each direction; about 30 m ahead a raised speed hump crosses the carriageway, marked with
white triangles; at the right the hump stops at a narrow cycle path that runs past it at its own level; a car ahead of us is crossing the
hump slowly.
MUST BE CLEARLY VISIBLE: the speed hump across the carriageway, the cycle path passing it on the right.
MUST NOT APPEAR: signs, text."""),
  "Foran dig er der et vejbump tværs over kørebanen. Ved siden af bumpet løber en smal cykelsti. Hvordan forholder du dig?",
  "Ahead of you there is a speed hump across the carriageway. A narrow cycle path runs past the side of the hump. What do you do?",
  "جلوی شما یک سرعت‌گیر عرض سواره‌رو را گرفته است. کنار سرعت‌گیر یک مسیر دوچرخه‌ی باریک هست. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og kører lige over bumpet i min egen vognbane.", "I slow down and drive straight over the hump in my own lane.",
    "سرعتم را کم می‌کنم و در خط خودم مستقیم از روی سرعت‌گیر رد می‌شوم.",
    "Bumpet skal få farten ned, og du skal holde din plads på vejen.", "The hump is there to bring the speed down, and you must keep your place on the road.",
    "سرعت‌گیر برای کم کردن سرعت است و باید جای خود را در جاده حفظ کنید."),
  S(False, "Jeg kører uden om bumpet ad cykelstien.", "I drive round the hump along the cycle path.", "از مسیر دوچرخه سرعت‌گیر را دور می‌زنم.",
    "Cykelstien må kun bruges af cyklister og små knallerter.", "The cycle path may only be used by cyclists and small mopeds.",
    "مسیر دوچرخه فقط برای دوچرخه‌سواران و موتور گازی‌های کوچک است."),
  S(False, "Jeg kører uden om bumpet i den modsatte vognbane, når der ikke kommer nogen.",
    "I drive round the hump in the opposite lane when nobody is coming.",
    "وقتی کسی نمی‌آید، از خط مقابل سرعت‌گیر را دور می‌زنم.",
    "Du skal holde til højre, og bumpet er lavet for at få farten ned.", "You must keep right, and the hump is there to bring the speed down.",
    "باید سمت راست بمانید و سرعت‌گیر برای کم کردن سرعت ساخته شده است."),
  S(False, "Jeg sætter farten op, så bilen hurtigere er over bumpet.", "I speed up so that the car is over the hump sooner.",
    "سرعتم را بالا می‌برم تا خودرو زودتر از روی سرعت‌گیر رد شود.",
    "Med høj fart kan du miste kontrollen over bilen og skade den.", "At high speed you can lose control of the car and damage it.",
    "با سرعت زیاد ممکن است کنترل خودرو را از دست بدهید و به آن آسیب بزنید."),
)

Q(5583, "7.2", above("""
THE SCENE: a road seen from above with TWO lanes in our direction separated by a broken lane line, curving to the LEFT.
VEHICLES (colour code used strictly): a RED car (ours) in the RIGHT lane entering the bend; a GREY car in the LEFT lane slightly ahead of
it; a SOLID GREEN arrow from the red car following the right lane through the bend; a DASHED ORANGE arrow from the red car cutting across
the lane line towards the inside of the bend.
MUST NOT APPEAR: signs, text."""),
  "Vejen har to vognbaner i din retning og svinger til venstre. Du kører i højre vognbane. Hvordan placerer du bilen gennem svinget?",
  "The road has two lanes in your direction and bends to the left. You are in the right lane. How do you position the car through the bend?",
  "جاده در جهت شما دو خط دارد و به چپ می‌پیچد. شما در خط راست هستید. خودرو را در پیچ کجای جاده قرار می‌دهید؟",
  S(True, "Jeg bliver i min vognbane hele vejen gennem svinget.", "I stay in my lane all the way through the bend.",
    "در تمام طول پیچ در خط خودم می‌مانم.",
    "Du må kun krydse vognbanelinjen, når det kan ske uden fare eller unødig ulempe for andre.",
    "You may only cross the lane line when it can be done without danger or undue inconvenience to others.",
    "فقط وقتی می‌توانید از خط جداکننده‌ی خطوط عبور کنید که برای دیگران خطر یا مزاحمت بی‌دلیل نداشته باشد."),
  S(False, "Jeg skærer svinget hen over vognbanelinjen, så kurven bliver blødere.", "I cut the bend across the lane line so that the curve is gentler.",
    "پیچ را از روی خط جداکننده میان‌بُر می‌زنم تا قوس نرم‌تر شود.",
    "Så kan du støde ind i bilen i venstre vognbane.", "Then you may hit the car in the left lane.", "این‌طور ممکن است با خودروی خط چپ برخورد کنید."),
  S(False, "I et sving må jeg køre midt på vognbanelinjen.", "In a bend I may drive on the lane line.", "در پیچ می‌توانم روی خط جداکننده برانم.",
    "Du skal køre inden for din vognbane.", "You must drive within your lane.", "باید داخل خط خودتان برانید."),
  S(False, "Jeg kører over i venstre vognbane i svinget og tilbage bagefter.", "I move into the left lane in the bend and back again afterwards.",
    "در پیچ به خط چپ می‌روم و بعد برمی‌گردم.",
    "Unødige vognbaneskift i et sving er farlige, især når der er en bil i den anden vognbane.",
    "Needless lane changes in a bend are dangerous, especially when there is a car in the other lane.",
    "تغییر خط بی‌دلیل در پیچ خطرناک است، به‌ویژه وقتی خودرویی در خط دیگر هست."),
)

Q(5584, "7.2", town("""
THE SCENE: a town road with one lane in our direction; the cycle path on the right ends about 30 m ahead, where a short ramp leads the
cyclists down onto the carriageway; two cyclists ride on the cycle path towards the ramp.
MUST BE CLEARLY VISIBLE: the end of the cycle path with its ramp onto the carriageway, the two cyclists approaching it.
MUST NOT APPEAR: signs, text."""),
  "Lidt fremme ophører cykelstien, og cyklisterne skal fortsætte ude på kørebanen. Hvordan forholder du dig?",
  "A little ahead the cycle path ends, and the cyclists have to continue on the carriageway. What do you do?",
  "کمی جلوتر مسیر دوچرخه تمام می‌شود و دوچرخه‌سواران باید روی سواره‌رو ادامه دهند. چه می‌کنید؟",
  S(True, "Jeg er klar på, at cyklisterne kommer ud foran mig på kørebanen.", "I am ready for the cyclists to come out in front of me on the carriageway.",
    "آماده‌ام که دوچرخه‌سواران جلوی من وارد سواره‌رو شوند.",
    "Cyklisterne skal fortsætte på kørebanen, hvor cykelstien ophører.", "The cyclists must continue on the carriageway where the cycle path ends.",
    "دوچرخه‌سواران باید جایی که مسیر دوچرخه تمام می‌شود روی سواره‌رو ادامه دهند."),
  S(True, "Jeg holder god afstand og overhaler først, når der er god plads.", "I keep a good distance and only overtake when there is plenty of room.",
    "فاصله‌ی کافی می‌گیرم و فقط وقتی جای کافی هست سبقت می‌گیرم.",
    "Ved overhaling skal du holde tilstrækkelig afstand til siden.", "When overtaking you must keep enough side distance.",
    "هنگام سبقت باید فاصله‌ی کافی از پهلو داشته باشید."),
  S(False, "Jeg kører tæt ind til kantstenen, så cyklisterne ikke kan komme ud foran mig.",
    "I drive close to the kerb so that the cyclists cannot come out in front of me.",
    "به جدول نزدیک می‌شوم تا دوچرخه‌سواران نتوانند جلوی من بیایند.",
    "Du må ikke spærre for cyklisterne; det kan skabe fare.", "You must not block the cyclists; it can create danger.",
    "نباید راه دوچرخه‌سواران را ببندید؛ این کار خطرآفرین است."),
  S(False, "Jeg dytter, så cyklisterne bliver på cykelstien.", "I sound the horn so that the cyclists stay on the cycle path.",
    "بوق می‌زنم تا دوچرخه‌سواران روی مسیر دوچرخه بمانند.",
    "Cykelstien ophører, og hornet må kun bruges for at forebygge eller afværge fare.",
    "The cycle path ends, and the horn may only be used to prevent or avert danger.",
    "مسیر دوچرخه تمام می‌شود و بوق فقط برای پیشگیری یا دفع خطر است."),
)

Q(5585, "7.5", town("""
THE SCENE: a narrow courtyard gateway opening onto a town street; we sit in a car about to reverse out through the gateway; a friend stands
on the pavement behind the car, clearly visible in the interior mirror, giving hand signals; the high walls of the gateway hide the
pavement to both sides.
MUST BE CLEARLY VISIBLE: the narrow gateway, the friend giving hand signals in the mirror, the walls hiding the pavement.
MUST NOT APPEAR: signs, text."""),
  "Du skal bakke ud fra en snæver gård, og en ven vil dirigere dig. Hvad gælder?",
  "You have to reverse out of a narrow courtyard, and a friend is going to guide you. What applies?",
  "باید با دنده‌عقب از حیاطی تنگ بیرون بیایید و دوستی می‌خواهد راهنمایی‌تان کند. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har stadig selv ansvaret for, at bakningen sker uden fare.", "I am still responsible myself for the reversing being done safely.",
    "مسئولیت بی‌خطر بودن دنده‌عقب همچنان با خودم است.",
    "Baglænskørsel må kun ske, når det kan ske uden fare eller ulempe for andre, og det er førerens ansvar.",
    "Reversing may only be done when it can be done without danger or inconvenience to others, and that is the driver's responsibility.",
    "دنده‌عقب فقط وقتی مجاز است که برای دیگران خطر یا مزاحمتی نداشته باشد و این مسئولیت راننده است."),
  S(True, "Vi aftaler tegnene, før jeg begynder at bakke.", "We agree on the signals before I start reversing.",
    "پیش از شروع دنده‌عقب، علامت‌ها را با هم هماهنگ می‌کنیم.",
    "Så misforstår du ikke hans tegn.", "Then you will not misunderstand his signals.", "این‌طور علامت‌های او را اشتباه نمی‌فهمید."),
  S(True, "Jeg standser straks, hvis jeg ikke længere kan se min ven.", "I stop at once if I can no longer see my friend.",
    "اگر دیگر دوستم را نبینم، فوراً می‌ایستم.",
    "Kan du ikke se ham, kan du heller ikke se hans tegn.", "If you cannot see him, you cannot see his signals either.",
    "اگر او را نبینید، علامت‌هایش را هم نمی‌بینید."),
  S(False, "Når en anden dirigerer, behøver jeg ikke selv se mig for.", "When someone else is guiding, I need not look out myself.",
    "وقتی کس دیگری راهنمایی می‌کند، لازم نیست خودم به اطراف نگاه کنم.",
    "Du skal selv holde øje med alt omkring bilen.", "You must watch everything around the car yourself.", "خودتان باید همه‌چیزِ اطراف خودرو را زیر نظر داشته باشید."),
)

Q(5586, "7.5", view("""
THE SCENE: a two-lane country road with an UNBROKEN white centre line along it; there is no traffic in either direction; on the right a
farm track joins the road about 300 m further ahead.
MUST BE CLEARLY VISIBLE: the unbroken centre line, the empty road, the farm track far ahead.
MUST NOT APPEAR: signs, text, vehicles."""),
  "Du er kørt forkert og vil vende på en landevej, hvor der er en ubrudt midterlinje. Der kommer ingen. Hvad gælder?",
  "You have taken a wrong turn and want to turn round on a country road with an unbroken centre line. Nobody is coming. What applies?",
  "راه را اشتباه رفته‌اید و می‌خواهید در جاده‌ای بیرون شهر که خط ممتد وسط دارد دور بزنید. کسی نمی‌آید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke vende her, fordi jeg så skal krydse spærrelinjen.", "I must not turn round here, because I would then cross the unbroken line.",
    "این‌جا نباید دور بزنم، چون باید از خط ممتد عبور کنم.",
    "En spærrelinje må ikke overskrides eller krydses, heller ikke ved vending.", "An unbroken line must not be crossed, not even when turning round.",
    "از خط ممتد نباید عبور کرد، حتی برای دور زدن."),
  S(True, "Jeg kører videre til et sted, hvor jeg kan vende lovligt og sikkert, fx en sidevej eller en parkeringsplads.",
    "I drive on to a place where I can turn round legally and safely, for example a side road or a car park.",
    "تا جایی ادامه می‌دهم که بتوانم قانونی و بی‌خطر دور بزنم، مثلاً یک راه فرعی یا پارکینگ.",
    "Der kan du vende uden at krydse linjen.", "There you can turn round without crossing the line.", "آن‌جا می‌توانید بدون عبور از خط دور بزنید."),
  S(False, "Jeg må vende, når der ikke kommer nogen.", "I may turn round when nobody is coming.", "وقتی کسی نمی‌آید، می‌توانم دور بزنم.",
    "Forbuddet gælder, uanset om der kommer nogen.", "The ban applies whether or not anyone is coming.", "این ممنوعیت برقرار است، چه کسی بیاید چه نه."),
  S(False, "Jeg må krydse linjen for at vende, hvis jeg gør det ved at bakke.", "I may cross the line to turn round if I do it by reversing.",
    "اگر با دنده‌عقب این کار را بکنم، می‌توانم برای دور زدن از خط عبور کنم.",
    "Linjen må heller ikke krydses, når du bakker.", "The line must not be crossed when you reverse either.", "با دنده‌عقب هم نباید از خط عبور کرد."),
)

Q(5587, "5.2", view("""
THE SCENE: a country road on a grey winter day in light rain; the road looks wet and shiny; on the dashboard strip the car's outside-
temperature display shows 0 °C.
MUST BE CLEARLY VISIBLE: the light rain, the wet-looking road, the 0 °C display.
MUST NOT APPEAR: signs, other text, other vehicles.""", cond="light rain, grey winter day, around freezing"),
  "Det regner let, og bilens termometer viser 0 °C. Vejen ser bare våd ud. Hvad skal du være opmærksom på?",
  "It is raining lightly, and the car's thermometer shows 0 °C. The road just looks wet. What must you be aware of?",
  "باران سبکی می‌بارد و دماسنج خودرو صفر درجه را نشان می‌دهد. جاده فقط خیس به نظر می‌رسد. به چه چیزی باید توجه کنید؟",
  S(True, "Regnen kan fryse til is, når den rammer den kolde vej.", "The rain may freeze to ice when it hits the cold road.",
    "ممکن است باران وقتی به جاده‌ی سرد می‌خورد یخ بزند.",
    "Omkring frysepunktet kan der dannes isslag på vejen.", "Around freezing point a glaze of ice can form on the road.",
    "نزدیک دمای صفر ممکن است لایه‌ی یخ روی جاده تشکیل شود."),
  S(True, "Vejen kan være glat, selv om den bare ser våd ud.", "The road may be slippery even though it just looks wet.",
    "جاده ممکن است لغزنده باشد، حتی اگر فقط خیس به نظر برسد.",
    "En tynd hinde af is kan være næsten usynlig.", "A thin film of ice can be almost invisible.", "لایه‌ی نازک یخ ممکن است تقریباً نامرئی باشد."),
  S(True, "Jeg kører langsommere og holder større afstand.", "I drive more slowly and keep a greater distance.",
    "آهسته‌تر می‌رانم و فاصله‌ی بیشتری می‌گیرم.",
    "På glat vej bliver bremselængden meget længere.", "On a slippery road the braking distance becomes much longer.",
    "در جاده‌ی لغزنده مسافت ترمز خیلی بیشتر می‌شود."),
  S(False, "Is dannes kun, når det sner.", "Ice only forms when it snows.", "یخ فقط وقتی برف می‌بارد تشکیل می‌شود.",
    "Regn på en kold vej kan også give is.", "Rain on a cold road can also produce ice.", "باران روی جاده‌ی سرد هم می‌تواند یخ ایجاد کند."),
)

Q(5588, "5.2", view("""
THE SCENE: a country road in heavy snowfall; the snow is beginning to settle on the road, covering the edge lines; visibility is reduced to
about 100 m; a car ahead of us has snow on its rear lights.
MUST BE CLEARLY VISIBLE: the heavy snowfall, the snow settling on the road, the car ahead with snow on its rear lights.
MUST NOT APPEAR: signs, text.""", cond="heavy snowfall, snow settling on the road"),
  "Det sner kraftigt, og sneen begynder at lægge sig på vejen. Hvordan forholder du dig?",
  "It is snowing heavily, and the snow is beginning to settle on the road. What do you do?",
  "برف شدیدی می‌بارد و برف شروع به نشستن روی جاده کرده است. چه می‌کنید؟",
  S(True, "Jeg sænker farten, fordi vejgrebet bliver dårligere.", "I slow down because the grip gets poorer.",
    "سرعتم را کم می‌کنم، چون چسبندگی کمتر می‌شود.",
    "Farten skal passe til føret.", "The speed must suit the road conditions.", "سرعت باید با وضع جاده جور باشد."),
  S(True, "Bliver lygter og ruder dækket af sne, standser jeg et sikkert sted og fjerner den.",
    "If the lights and windows get covered with snow, I stop in a safe place and clear it off.",
    "اگر چراغ‌ها و شیشه‌ها زیر برف بروند، در جایی امن می‌ایستم و برف را پاک می‌کنم.",
    "Du skal kunne se ud, og bilens lygter skal kunne ses.", "You must be able to see out, and the car's lights must be visible.",
    "باید بتوانید بیرون را ببینید و چراغ‌های خودرو باید دیده شوند."),
  S(True, "Jeg kører med nærlys, så bilen også kan ses bagfra.", "I drive with dipped beam so that the car can also be seen from behind.",
    "با نور پایین می‌رانم تا خودرو از پشت هم دیده شود.",
    "Når snevejr gør det nødvendigt, er det lygtetændingstid.", "When snowfall makes it necessary, it is lighting-up time.",
    "وقتی بارش برف آن را لازم کند، زمان روشن کردن چراغ‌هاست."),
  S(False, "Jeg kører tæt bag bilen foran, så jeg kan følge dens spor.", "I drive close behind the car in front so that I can follow its tracks.",
    "پشت خودروی جلویی نزدیک حرکت می‌کنم تا رد چرخ‌هایش را دنبال کنم.",
    "På sne skal du holde større afstand, fordi bremselængden bliver længere.",
    "On snow you must keep a greater distance, because the braking distance gets longer.",
    "روی برف باید فاصله‌ی بیشتری بگیرید، چون مسافت ترمز بیشتر می‌شود."),
)

Q(5589, "6.2", view("""
THE SCENE: a two-lane country road; about 60 m ahead a car has run off the road into the ditch on the right, its front crumpled; the driver
still sits inside; nobody else has stopped yet.
MUST BE CLEARLY VISIBLE: the car in the ditch, the driver sitting inside.
MUST NOT APPEAR: blood, signs, text.""", cond="daylight, wet road"),
  "Du kommer som den første til et uheld på landevejen. En bil er kørt i grøften, og føreren sidder stadig i den. Hvad gør du?",
  "You are the first to arrive at an accident on a country road. A car has gone into the ditch, and the driver is still sitting in it. "
  "What do you do?",
  "شما اولین کسی هستید که به یک تصادف در جاده‌ی بیرون شهر می‌رسید. خودرویی به داخل جوی کنار جاده رفته و راننده هنوز داخل آن است. "
  "چه می‌کنید؟",
  S(True, "Jeg standser et sikkert sted og tænder havariblinket.", "I stop in a safe place and switch on the hazard lights.",
    "در جایی امن می‌ایستم و چراغ‌های فلاشر را روشن می‌کنم.",
    "Så kan du hjælpe uden selv at komme i fare.", "Then you can help without putting yourself in danger.",
    "این‌طور می‌توانید کمک کنید بی‌آن‌که خودتان در خطر بیفتید."),
  S(True, "Jeg sætter en advarselstrekant op, så der ikke sker flere uheld.", "I put up a warning triangle so that no further accidents happen.",
    "مثلث خطر را می‌گذارم تا تصادف دیگری رخ ندهد.",
    "Andre trafikanter skal advares i god tid.", "Other road users must be warned in good time.", "کاربران دیگر راه باید به‌موقع هشدار بگیرند."),
  S(True, "Jeg ringer 1-1-2, hvis nogen er kommet til skade.", "I call 1-1-2 if anyone is hurt.", "اگر کسی آسیب دیده باشد، با ۱۱۲ تماس می‌گیرم.",
    "Så kommer der hurtigt hjælp.", "Then help comes quickly.", "این‌طور کمک زود می‌رسد."),
  S(False, "Jeg trækker altid føreren ud af bilen med det samme.", "I always pull the driver out of the car straight away.",
    "همیشه فوراً راننده را از خودرو بیرون می‌کشم.",
    "En tilskadekommen skal kun flyttes, hvis der er fare, fx for brand.", "An injured person should only be moved if there is danger, for example of fire.",
    "فرد آسیب‌دیده فقط وقتی باید جابه‌جا شود که خطری، مثلاً آتش‌سوزی، در کار باشد."),
)

Q(5590, "6.2", view("""
THE SCENE: a two-lane country road; about 40 m ahead a car weaves from side to side in its lane and now crosses the centre line with its
left wheels; an oncoming car can be seen far ahead.
MUST BE CLEARLY VISIBLE: the weaving car over the centre line, the oncoming car far ahead.
MUST NOT APPEAR: signs, text."""),
  "Bilen foran dig kører i zigzag og over midterlinjen. Du har mistanke om, at føreren er påvirket. Hvordan forholder du dig?",
  "The car in front of you is weaving and crossing the centre line. You suspect that the driver is under the influence. What do you do?",
  "خودروی جلوی شما زیگزاگ می‌رود و از خط وسط عبور می‌کند. گمان می‌کنید راننده تحت تأثیر مواد یا الکل است. چه می‌کنید؟",
  S(True, "Jeg holder god afstand, fordi bilen kan gøre noget uforudsigeligt.", "I keep a good distance, because the car may do something unpredictable.",
    "فاصله‌ی کافی می‌گیرم، چون ممکن است آن خودرو کاری غیرقابل‌پیش‌بینی بکند.",
    "Så har du tid til at reagere.", "Then you have time to react.", "این‌طور فرصت واکنش دارید."),
  S(True, "Jeg kan bede en passager ringe til politiet eller selv ringe, når jeg holder stille.",
    "I can ask a passenger to call the police, or call them myself when I have stopped.",
    "می‌توانم از مسافرم بخواهم به پلیس زنگ بزند یا وقتی ایستاده‌ام خودم زنگ بزنم.",
    "Politiet kan stoppe en farlig fører, men du må ikke bruge en håndholdt telefon under kørslen.",
    "The police can stop a dangerous driver, but you must not use a hand-held phone while driving.",
    "پلیس می‌تواند جلوی راننده‌ی خطرناک را بگیرد، ولی شما نباید هنگام رانندگی تلفن را در دست بگیرید."),
  S(False, "Jeg kører tæt på og blinker med lyset for at få føreren til at standse.", "I drive up close and flash my lights to make the driver stop.",
    "نزدیکش می‌روم و چراغ می‌زنم تا راننده بایستد.",
    "Så bringer du både dig selv og andre i fare.", "Then you put both yourself and others in danger.", "این‌طور هم خود و هم دیگران را در خطر می‌اندازید."),
  S(False, "Jeg tager telefonen i hånden og ringer til politiet, mens jeg kører.", "I take the phone in my hand and call the police while I am driving.",
    "تلفن را در دست می‌گیرم و هنگام رانندگی با پلیس تماس می‌گیرم.",
    "Det er forbudt at bruge en håndholdt telefon under kørslen.", "It is forbidden to use a hand-held phone while driving.",
    "استفاده از تلفن در دست هنگام رانندگی ممنوع است."),
)

Q(5591, "7.16", view("""
THE SCENE: a motorway with two lanes in our direction and a hard shoulder beyond an unbroken edge line; on the car's dashboard a phone in a
holder shows an incoming call (a ringing handset symbol, no text); a rest area is signposted further ahead only by a lay-by visible far
away.
MUST BE CLEARLY VISIBLE: the hard shoulder, the phone showing the incoming call.
MUST NOT APPEAR: signs, text, brand names."""),
  "Din telefon ringer, mens du kører på motorvejen. Du vil holde ind i nødsporet og tage den. Hvad gælder?",
  "Your phone rings while you are driving on the motorway. You want to pull onto the hard shoulder to take the call. What applies?",
  "هنگام رانندگی در آزادراه تلفن شما زنگ می‌خورد. می‌خواهید در شانه‌ی اضطراری بایستید و جواب بدهید. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må ikke standse i nødsporet for at tale i telefon.", "I must not stop on the hard shoulder to talk on the phone.",
    "نباید برای صحبت با تلفن در شانه‌ی اضطراری بایستم.",
    "På motorvejen må der kun standses på de anviste parkerings- og rastepladser, og ved en nødtelefon for at bruge den.",
    "On the motorway you may only stop at the parking and rest areas provided, and at an emergency phone to use it.",
    "در آزادراه فقط در پارکینگ‌ها و استراحتگاه‌های تعیین‌شده و کنار تلفن اضطراری برای استفاده از آن می‌توان توقف کرد."),
  S(False, "Det er tilladt, når jeg tænder havariblinket.", "It is allowed when I switch on the hazard lights.", "اگر چراغ‌های فلاشر را روشن کنم، مجاز است.",
    "Havariblinket gør det ikke tilladt at standse i nødsporet.", "The hazard lights do not make it allowed to stop on the hard shoulder.",
    "چراغ فلاشر توقف در شانه‌ی اضطراری را مجاز نمی‌کند."),
  S(False, "Jeg må standse i nødsporet, hvis samtalen er vigtig.", "I may stop on the hard shoulder if the call is important.",
    "اگر تماس مهم باشد، می‌توانم در شانه‌ی اضطراری بایستم.",
    "Nødsporet er kun til nødsituationer, fx motorstop.", "The hard shoulder is only for emergencies, for example a breakdown.",
    "شانه‌ی اضطراری فقط برای مواقع اضطراری، مثلاً خرابی خودرو، است."),
  S(False, "Jeg må tage telefonen i hånden, når jeg kører under 80 km/t.", "I may hold the phone in my hand when I drive below 80 km/h.",
    "وقتی زیر ۸۰ کیلومتر بر ساعت می‌رانم، می‌توانم تلفن را در دست بگیرم.",
    "Det er forbudt at bruge en håndholdt telefon under kørslen, uanset farten.", "It is forbidden to use a hand-held phone while driving, whatever the speed.",
    "استفاده از تلفن در دست هنگام رانندگی، با هر سرعتی، ممنوع است."),
)

Q(5592, "7.16", view("""
THE SCENE: a motorway with two lanes in our direction; about 80 m ahead a large piece of a lorry tyre lies in our lane (the right lane); the
left lane is free just now, but in the left door mirror (at the left edge of the picture) a car approaches from behind.
MUST BE CLEARLY VISIBLE: the piece of tyre in our lane, the free left lane, the car in the left door mirror.
MUST NOT APPEAR: signs, text."""),
  "Der ligger et stort stykke dæk i din vognbane på motorvejen. Hvordan forholder du dig?",
  "A large piece of tyre is lying in your lane on the motorway. What do you do?",
  "تکه‌ی بزرگی از یک لاستیک در خط شما در آزادراه افتاده است. چه می‌کنید؟",
  S(True, "Jeg sætter farten ned og skifter vognbane, hvis det kan ske uden fare.", "I slow down and change lanes if it can be done safely.",
    "سرعتم را کم می‌کنم و اگر بی‌خطر باشد، خط عوض می‌کنم.",
    "Så kommer du uden om genstanden uden at bringe andre i fare.", "Then you get round the object without endangering others.",
    "این‌طور بی‌آن‌که دیگران را به خطر بیندازید از کنار آن رد می‌شوید."),
  S(True, "Jeg kan melde det til politiet, når jeg holder et sikkert sted.", "I can report it to the police when I have stopped somewhere safe.",
    "وقتی در جایی امن ایستادم، می‌توانم آن را به پلیس اطلاع بدهم.",
    "Så kan genstanden blive fjernet, før den skaber et uheld.", "Then the object can be removed before it causes an accident.",
    "این‌طور آن را پیش از آن‌که باعث تصادف شود جمع می‌کنند."),
  S(False, "Jeg svinger brat ud uden at se mig for, så jeg undgår det.", "I swerve sharply without looking, so that I avoid it.",
    "بدون نگاه کردن تند فرمان می‌دهم تا به آن نخورم.",
    "Et brat sving kan føre dig ind i bilen bag dig i venstre vognbane.", "A sharp swerve can take you into the car behind you in the left lane.",
    "فرمان تند ممکن است شما را به خودروی پشت سرتان در خط چپ بکوبد."),
  S(False, "Jeg standser i nødsporet og går ud og fjerner det.", "I stop on the hard shoulder and walk out to remove it.",
    "در شانه‌ی اضطراری می‌ایستم و پیاده می‌شوم تا آن را بردارم.",
    "Det er livsfarligt at gå ud på kørebanen på en motorvej.", "It is deadly dangerous to walk onto the carriageway of a motorway.",
    "قدم گذاشتن روی سواره‌روی آزادراه بسیار خطرناک است."),
)

Q(5593, "7.19", view("""
THE SCENE: a dark country road at night without street lights; we drive with high beam, and a small high-beam symbol with the letter A is lit
on the dashboard strip (automatic high beam); about 60 m ahead a cyclist without lights rides at the right edge, barely lit.
MUST BE CLEARLY VISIBLE: the automatic high-beam symbol, the cyclist without lights at the right edge.
MUST NOT APPEAR: signs, other text.""", cond="night, dark, dry road, no street lights"),
  "Bilen har automatisk fjernlys, som selv skifter mellem fjernlys og nærlys. Hvad gælder?",
  "The car has automatic high beam, which switches between high beam and dipped beam by itself. What applies?",
  "خودرو نور بالای خودکار دارد که خودش بین نور بالا و پایین جابه‌جا می‌شود. چه قاعده‌ای برقرار است؟",
  S(True, "Jeg har stadig selv ansvaret for, at jeg ikke blænder andre.", "I am still responsible myself for not dazzling others.",
    "مسئولیت این‌که چشم دیگران را خیره نکنم همچنان با خودم است.",
    "Du må ikke blænde andre trafikanter, og det er dig, der kører bilen.", "You must not dazzle other road users, and it is you who drives the car.",
    "نباید چشم دیگر کاربران راه را خیره کنید و رانندگی با شماست."),
  S(True, "Systemet kan overse fx en cyklist uden lys, så jeg holder selv øje.", "The system may miss, for example, a cyclist without lights, so I keep watch myself.",
    "ممکن است سیستم مثلاً دوچرخه‌سوار بدون چراغ را تشخیص ندهد، پس خودم مراقبم.",
    "Systemet reagerer især på lys fra andre køretøjer.", "The system reacts mainly to light from other vehicles.",
    "این سیستم بیشتر به نورِ وسایل دیگر واکنش نشان می‌دهد."),
  S(False, "Med automatisk fjernlys må jeg køre med fjernlys på en oplyst gade.", "With automatic high beam I may use high beam on a lit street.",
    "با نور بالای خودکار می‌توانم در خیابان روشن هم از نور بالا استفاده کنم.",
    "Fjernlys må ikke bruges på en vej, der er tilstrækkeligt belyst.", "High beam must not be used on a road that is sufficiently lit.",
    "از نور بالا نباید در جاده‌ای که به اندازه‌ی کافی روشن است استفاده کرد."),
  S(False, "Jeg må slå systemet fra og køre med fjernlys hele tiden, når vejen er mørk.",
    "I may switch the system off and drive with high beam all the time when the road is dark.",
    "می‌توانم سیستم را خاموش کنم و وقتی جاده تاریک است همیشه با نور بالا برانم.",
    "Du skal stadig blænde ned, når du møder andre eller kører bag nogen.", "You must still dip when you meet others or drive behind someone.",
    "هنگام روبه‌رو شدن با دیگران یا رانندگی پشت سر کسی همچنان باید نور را پایین بیاورید."),
)

Q(5594, "7.19", view("""
THE SCENE: a dark country road at night without street lights; we drive with high beam; in the left door mirror (at the left edge of the
picture) a car is pulling out to overtake us, its front almost level with our rear door.
MUST BE CLEARLY VISIBLE: our high beam lighting the road far ahead, the overtaking car in the left door mirror.
MUST NOT APPEAR: signs, text.""", cond="night, dark, dry road, no street lights"),
  "Det er mørkt, og du kører med fjernlys på landevejen. En bil er ved at overhale dig. Hvad gør du med lyset?",
  "It is dark, and you are driving with high beam on a country road. A car is overtaking you. What do you do with your lights?",
  "هوا تاریک است و در جاده‌ی بیرون شهر با نور بالا می‌رانید. خودرویی در حال سبقت از شماست. با چراغ‌ها چه می‌کنید؟",
  S(True, "Jeg blænder ned, når bilen kommer op på siden af mig.", "I dip my lights when the car comes alongside me.",
    "وقتی آن خودرو کنار من می‌رسد، نور را پایین می‌آورم.",
    "Fjernlys må ikke bruges, når du kører bag et andet køretøj, og du må ikke blænde føreren i spejlene.",
    "High beam must not be used when you are behind another vehicle, and you must not dazzle the driver in the mirrors.",
    "وقتی پشت وسیله‌ی دیگری هستید نباید از نور بالا استفاده کنید و نباید چشم راننده را از طریق آینه‌ها خیره کنید."),
  S(False, "Jeg beholder fjernlyset, så den overhalende kan se vejen foran sig.", "I keep the high beam on so that the overtaking driver can see the road ahead.",
    "نور بالا را روشن نگه می‌دارم تا راننده‌ی سبقت‌گیرنده جاده‌ی جلو را ببیند.",
    "Så blænder du føreren gennem hans spejle.", "Then you dazzle the driver through his mirrors.", "این‌طور چشم راننده را از طریق آینه‌هایش خیره می‌کنید."),
  S(False, "Jeg blinker med fjernlyset for at vise, at der er plads.", "I flash my high beam to show that there is room.",
    "با نور بالا چراغ می‌زنم تا نشان دهم جا هست.",
    "Det kan blænde og forvirre den overhalende.", "It can dazzle and confuse the overtaking driver.", "این کار ممکن است راننده‌ی سبقت‌گیرنده را خیره و گیج کند."),
)

Q(5595, "3.2", view("""
THE SCENE: a motorway in strong wind from the right (a windsock at a bridge stands out straight, trees bending); we are overtaking a large
lorry in the left lane, about level with its cab; beyond the lorry's front the road lies open to the wind.
MUST BE CLEARLY VISIBLE: the large lorry beside us, the signs of strong side wind, the open road beyond the lorry's front.
MUST NOT APPEAR: signs, text, brand names.""", cond="strong side wind, dry road"),
  "Du overhaler en lastbil på motorvejen i kraftig sidevind. Hvad skal du være opmærksom på?",
  "You are overtaking a lorry on the motorway in a strong side wind. What must you be aware of?",
  "در باد شدیدی که از پهلو می‌وزد، در آزادراه از یک کامیون سبقت می‌گیرید. به چه چیزی باید توجه کنید؟",
  S(True, "Når jeg kommer frem forbi lastbilens front, kan vinden pludselig tage fat i bilen.",
    "When I come out past the front of the lorry, the wind may suddenly catch the car.",
    "وقتی از جلوی کامیون رد می‌شوم، ممکن است باد ناگهان خودرو را بگیرد.",
    "Lastbilen giver læ, og når læet forsvinder, rammer vinden bilen med fuld styrke.",
    "The lorry gives shelter, and when the shelter ends, the wind hits the car with full force.",
    "کامیون پناهی در برابر باد است و وقتی این پناه تمام شود، باد با تمام قدرت به خودرو می‌خورد."),
  S(True, "Jeg holder godt fast i rattet og god afstand til siden.", "I hold the wheel firmly and keep a good side distance.",
    "فرمان را محکم نگه می‌دارم و فاصله‌ی کافی از پهلو می‌گیرم.",
    "Så kan du rette op, hvis vinden skubber til bilen.", "Then you can correct if the wind pushes the car.",
    "این‌طور اگر باد خودرو را هل دهد، می‌توانید آن را صاف کنید."),
  S(True, "Vinden kan også skubbe lastbilen lidt ud mod min vognbane.", "The wind may also push the lorry a little towards my lane.",
    "باد ممکن است کامیون را هم کمی به سمت خط من هل دهد.",
    "Høje køretøjer er særligt følsomme for sidevind.", "High vehicles are especially sensitive to side wind.",
    "وسایل بلند به‌ویژه در برابر باد پهلو حساس‌اند."),
  S(False, "Lastbilen giver læ hele vejen, så sidevinden betyder ikke noget.", "The lorry gives shelter all the way, so the side wind does not matter.",
    "کامیون در تمام مسیر پناه است، پس باد پهلو اهمیتی ندارد.",
    "Læet forsvinder, når du kommer forbi lastbilen.", "The shelter disappears when you get past the lorry.",
    "وقتی از کامیون رد می‌شوید، این پناه از بین می‌رود."),
)

Q(5596, "4.5", view("""
THE SCENE: a residential road with one lane in each direction and no cycle path; about 30 m ahead a child of about 7 or 8 rides a small
bicycle alone at the right edge, wobbling a little and glancing back over the shoulder.
MUST BE CLEARLY VISIBLE: the child on the small bicycle at the right edge, the wobble.
MUST NOT APPEAR: signs, text."""),
  "Et barn på 7–8 år cykler alene i højre vejkant foran dig. Hvordan forholder du dig?",
  "A child of 7–8 years is cycling alone at the right edge of the road in front of you. What do you do?",
  "کودکی ۷ یا ۸ ساله تنها در لبه‌ی راست جاده جلوی شما دوچرخه‌سواری می‌کند. چه می‌کنید؟",
  S(True, "Barnet kan pludselig svinge ud uden at se sig tilbage.", "The child may suddenly swerve out without looking back.",
    "ممکن است کودک ناگهان بی‌آن‌که پشت سرش را نگاه کند به وسط بپیچد.",
    "Børn kan ikke altid styre cyklen sikkert og overskue trafikken.", "Children cannot always control the bicycle safely and take in the traffic.",
    "کودکان همیشه نمی‌توانند دوچرخه را با اطمینان کنترل کنند و ترافیک را درک کنند."),
  S(True, "Børn kan ikke altid bedømme afstand og fart.", "Children cannot always judge distance and speed.",
    "کودکان همیشه نمی‌توانند فاصله و سرعت را درست تخمین بزنند.",
    "Derfor skal der vises særligt hensyn over for børn.", "That is why particular consideration must be shown to children.",
    "به همین دلیل باید نسبت به کودکان ملاحظه‌ی ویژه داشت."),
  S(True, "Jeg holder god afstand og kører først forbi, når der er god plads.", "I keep a good distance and only pass when there is plenty of room.",
    "فاصله‌ی کافی می‌گیرم و فقط وقتی جای کافی هست از کنارش رد می‌شوم.",
    "Du skal holde tilstrækkelig afstand til siden, når du kører forbi.", "You must keep enough side distance when you pass.",
    "هنگام رد شدن باید فاصله‌ی کافی از پهلو داشته باشید."),
  S(True, "Jeg kører langsomt forbi, så barnet ikke bliver forskrækket.", "I pass slowly so that the child is not startled.",
    "آهسته رد می‌شوم تا کودک نترسد.",
    "Et barn, der bliver forskrækket, kan miste balancen.", "A child who is startled may lose balance.",
    "کودکی که بترسد ممکن است تعادلش را از دست بدهد."),
)

Q(5597, "5.1", view("""
THE SCENE: a wide two-lane road with broad verges and no houses, entered from a slip road; on the right verge stands a blue square sign
showing a white car seen from the front (the Danish sign for a motortrafikvej, E 43).
MUST BE CLEARLY VISIBLE: the blue sign with the white car seen from the front, the road without houses.
MUST NOT APPEAR: other signs, text."""),
  "Du kører forbi denne tavle. Hvad gælder på vejen herefter?",
  "You pass this sign. What applies on the road after it?",
  "از کنار این تابلو می‌گذرید. در جاده‌ی پس از آن چه قاعده‌ای برقرار است؟",
  S(True, "Jeg må hverken vende eller bakke på vejen.", "I may neither turn round nor reverse on the road.",
    "در این جاده نه می‌توانم دور بزنم و نه دنده‌عقب بروم.",
    "Tavlen viser en motortrafikvej, hvor reglerne om vending, bakning og standsning er de samme som på en motorvej.",
    "The sign shows a motortrafikvej, where the rules on turning round, reversing and stopping are the same as on a motorway.",
    "این تابلو یک جاده‌ی ویژه‌ی خودروها (motortrafikvej) را نشان می‌دهد که قواعد دور زدن، دنده‌عقب و توقف در آن مثل آزادراه است."),
  S(True, "Traktorer og små knallerter må ikke køre på vejen.", "Tractors and small mopeds may not use the road.",
    "تراکتورها و موتور گازی‌های کوچک نباید در این جاده حرکت کنند.",
    "Vejen må kun bruges af motorkøretøjer, der kan og må køre mindst 50 km/t.", "The road may only be used by motor vehicles that can and may do at least 50 km/h.",
    "این جاده فقط برای وسایل موتوری است که می‌توانند و اجازه دارند دست‌کم ۵۰ کیلومتر بر ساعت بروند."),
  S(False, "Jeg må standse i rabatten for at nyde udsigten.", "I may stop on the verge to enjoy the view.",
    "می‌توانم برای تماشای منظره در حاشیه بایستم.",
    "Der må kun standses på de anviste parkerings- og rastepladser.", "Stopping is only allowed at the parking and rest areas provided.",
    "توقف فقط در پارکینگ‌ها و استراحتگاه‌های تعیین‌شده مجاز است."),
  S(False, "Det er en almindelig landevej, så der gælder ingen særlige regler.", "It is an ordinary country road, so no special rules apply.",
    "این یک جاده‌ی معمولیِ بیرون شهر است، پس قاعده‌ی ویژه‌ای ندارد.",
    "På en motortrafikvej gælder særlige regler som på motorvejen.", "Special rules like those on the motorway apply on a motortrafikvej.",
    "در این نوع جاده قواعد ویژه‌ای مانند آزادراه برقرار است."),
)

Q(5598, "7.8", view("""
THE SCENE: a two-lane country road; about 25 m ahead a motorcycle rides in our lane; a little gravel lies on the road surface further
ahead.
MUST BE CLEARLY VISIBLE: the motorcycle ahead, the gravel on the road further ahead.
MUST NOT APPEAR: signs, text, other vehicles."""),
  "Du kører bag en motorcykel på landevejen. Hvad gælder for afstanden?",
  "You are driving behind a motorcycle on a country road. What applies to the distance?",
  "در جاده‌ی بیرون شهر پشت یک موتورسیکلت می‌رانید. درباره‌ی فاصله چه قاعده‌ای برقرار است؟",
  S(True, "Jeg holder mindst lige så god afstand som til en bil.", "I keep at least as good a distance as to a car.",
    "دست‌کم همان فاصله‌ای را می‌گیرم که از یک خودرو می‌گیرم.",
    "Afstanden skal være så stor, at du kan standse, hvis den forankørende standser.",
    "The distance must be great enough for you to stop if the one in front stops.",
    "فاصله باید آن‌قدر باشد که اگر وسیله‌ی جلو ایستاد، بتوانید بایستید."),
  S(True, "Motorcyklisten kan vælte, fx i grus, og så skal jeg kunne standse, før jeg når ham.",
    "The motorcyclist may fall, for example on gravel, and then I must be able to stop before I reach him.",
    "ممکن است موتورسوار مثلاً روی شن زمین بخورد و آن‌وقت باید بتوانم پیش از رسیدن به او بایستم.",
    "En væltet motorcyklist ligger på vejen lige foran dig.", "A fallen motorcyclist lies on the road right in front of you.",
    "موتورسواری که زمین خورده درست جلوی شما روی جاده است."),
  S(False, "Jeg kan køre tættere på, fordi motorcyklen fylder mindre end en bil.", "I can drive closer because the motorcycle takes up less room than a car.",
    "می‌توانم نزدیک‌تر بروم، چون موتورسیکلت جای کمتری از خودرو می‌گیرد.",
    "Motorcyklens størrelse ændrer ikke, hvor langt du skal bruge for at standse.", "The motorcycle's size does not change how far you need to stop.",
    "اندازه‌ی موتورسیکلت مسافتی را که برای توقف لازم دارید تغییر نمی‌دهد."),
  S(False, "Bremselyset på en motorcykel er så tydeligt, at jeg kan nøjes med en kort afstand.",
    "The brake light on a motorcycle is so clear that a short distance is enough.",
    "چراغ ترمز موتورسیکلت آن‌قدر واضح است که فاصله‌ی کم کافی است.",
    "Du har brug for den samme reaktionstid og bremselængde, uanset hvor tydeligt bremselyset er.",
    "You need the same reaction time and braking distance however clear the brake light is.",
    "هر قدر هم چراغ ترمز واضح باشد، همان زمان واکنش و مسافت ترمز را لازم دارید."),
)

Q(5599, "7.15", above("""
THE SCENE: a small single-lane roundabout seen from above; its centre is a low, round area paved with cobblestones, only slightly raised,
so that it can be driven over; at the entry stands a round blue sign with three white arrows in a circle (the required direction).
VEHICLES (colour code used strictly): a RED car (ours) entering the roundabout to go straight on; a SOLID GREEN arrow from the red car going
round the cobbled centre anticlockwise to the opposite exit; a DASHED ORANGE arrow from the red car going straight across the cobbled
centre.
MUST NOT APPEAR: other signs, text."""),
  "Midten af den lille rundkørsel er lav og belagt med brosten, så den kan køres over. Hvordan kører du igennem i bil?",
  "The centre of the small roundabout is low and paved with cobblestones so that it can be driven over. How do you drive through in a car?",
  "وسط این میدان کوچک کوتاه و سنگفرش است و می‌شود از رویش رد شد. با خودرو چطور از میدان عبور می‌کنید؟",
  S(True, "Jeg kører rundt om midten i den retning, tavlen viser.", "I drive round the centre in the direction the sign shows.",
    "در جهتی که تابلو نشان می‌دهد، دور وسط میدان می‌چرخم.",
    "Den blå tavle påbyder kørselsretningen i rundkørslen.", "The blue sign orders the direction of travel in the roundabout.",
    "تابلوی آبی جهت حرکت در میدان را الزامی می‌کند."),
  S(True, "Den lave, brolagte midte er lavet, så lange køretøjer kan komme rundt.", "The low, cobbled centre is made so that long vehicles can get round.",
    "وسطِ کوتاه و سنگفرش برای این ساخته شده که وسایل بلند بتوانند دور بزنند.",
    "Lange køretøjer kan have brug for at køre ind over kanten af midten.", "Long vehicles may need to run over the edge of the centre.",
    "وسایل بلند ممکن است لازم باشد از روی لبه‌ی وسط میدان بگذرند."),
  S(False, "Jeg må køre lige hen over midten for at komme hurtigere igennem.", "I may drive straight across the centre to get through more quickly.",
    "می‌توانم برای عبور سریع‌تر مستقیم از روی وسط میدان بگذرم.",
    "Du skal køre rundt om midten i den påbudte retning.", "You must drive round the centre in the required direction.",
    "باید در جهت الزامی دور وسط میدان بچرخید."),
)

Q(5600, "10.3", picture("""
A simple illustration on a plain light background: a Danish-style credit-card-sized driving licence lying on a table, with a small red
paper ticket (like a parking fine) beside it and a pair of scissors that has cut a small notch in the ticket.
MUST BE CLEARLY VISIBLE: the licence card, the ticket with the cut notch.
MUST NOT APPEAR: names, readable text, numbers."""),
  "Du fik kørekort for et år siden og har allerede fået ét klip. Hvad gælder?",
  "You got your driving licence a year ago and already have one klip (penalty point). What applies?",
  "یک سال پیش گواهینامه گرفته‌اید و تا حالا یک «klip» (نمره‌ی منفی) گرفته‌اید. چه قاعده‌ای برقرار است؟",
  S(True, "Får jeg et klip mere inden for de første 3 år, får jeg kørselsforbud.",
    "If I get another klip within the first 3 years, I get a driving ban.",
    "اگر در ۳ سال اول یک نمره‌ی منفی دیگر بگیرم، ممنوع‌الرانندگی می‌شوم.",
    "To klip inden for de første 3 år efter, at du har fået kørekort første gang, udløser kørselsforbud.",
    "Two klip within the first 3 years after getting your first licence lead to a driving ban.",
    "دو نمره‌ی منفی در ۳ سال اول پس از گرفتن اولین گواهینامه به ممنوعیت رانندگی منجر می‌شود."),
  S(True, "Ved kørselsforbud skal jeg bestå en kontrollerende køreprøve, før jeg må køre igen.",
    "With a driving ban I must pass a control driving test before I may drive again.",
    "در صورت ممنوعیت رانندگی، باید پیش از رانندگی دوباره یک آزمون کنترلی رانندگی را با موفقیت بگذرانم.",
    "Førerretten kommer først tilbage, når du har gennemført undervisning og bestået en kontrollerende køreprøve.",
    "The right to drive only comes back when you have completed training and passed a control driving test.",
    "حق رانندگی فقط پس از گذراندن آموزش و قبولی در آزمون کنترلی برمی‌گردد."),
  S(False, "Jeg kan have tre klip, før der sker noget, ligesom andre bilister.", "I can have three klip before anything happens, like other drivers.",
    "مثل رانندگان دیگر می‌توانم سه نمره‌ی منفی داشته باشم تا اتفاقی بیفتد.",
    "For nye bilister er grænsen to klip i de første 3 år.", "For new drivers the limit is two klip in the first 3 years.",
    "برای رانندگان تازه‌کار، این حد در ۳ سال اول دو نمره‌ی منفی است."),
  S(False, "Et klip forsvinder igen efter et år.", "A klip disappears again after a year.", "هر نمره‌ی منفی بعد از یک سال پاک می‌شود.",
    "Et klip bortfalder først 3 år efter, at overtrædelsen blev begået.", "A klip only lapses 3 years after the offence was committed.",
    "هر نمره‌ی منفی تازه ۳ سال پس از تخلف از بین می‌رود."),
)
