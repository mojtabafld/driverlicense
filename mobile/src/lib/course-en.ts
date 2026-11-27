// The course's test questions in English, for users who take the exam in English (settings.lang 'en'), keyed by
// their Danish text in course.ts (the newer lessons' in course-more.ts, MORE_EN). A Danish text that is really on a sign stays Danish, in quotes, with its meaning.
import { MORE_EN } from './course-more';

export const COURSE_EN: Record<string, string> = {
  'Du kører ind i et vejkryds, hvor der ikke er nogen færdselstavler eller afmærkning. En cyklist kommer fra højre. Hvordan forholder du dig?':
    'You drive into an intersection with no road signs or markings. A cyclist is coming from the right. What do you do?',
  'Jeg holder tilbage for cyklisten.': 'I give way to the cyclist.',
  'Jeg kører først, fordi jeg kører i bil.': 'I go first because I am in a car.',
  'Du vil køre ud fra en parkeringsplads til vejen. En bil kommer fra venstre. Hvordan forholder du dig?':
    'You want to drive out of a car park onto the road. A car is coming from the left. What do you do?',
  'Jeg holder tilbage for bilen.': 'I give way to the car.',
  'Bilen skal holde tilbage for mig, fordi den kommer fra venstre.': 'The car must give way to me because it comes from the left.',
  'Jeg holder også tilbage for fodgængere på fortovet.': 'I also give way to pedestrians on the pavement.',
  'Der er hajtænder på kørebanen foran dig, og du vil køre ligeud gennem krydset. Hvordan forholder du dig?':
    'There are shark teeth on the road in front of you, and you want to drive straight through the intersection. What do you do?',
  'Jeg holder tilbage for trafikken fra både højre og venstre.': 'I give way to traffic from both the right and the left.',
  'Jeg holder kun tilbage for trafikken fra højre.': 'I only give way to traffic from the right.',
  'Du har grønt lys og vil svinge til venstre i krydset. En bil kommer imod dig og vil køre ligeud. Hvordan forholder du dig?':
    'You have a green light and want to turn left at the intersection. An oncoming car wants to go straight on. What do you do?',
  'Jeg holder tilbage for den modkørende bil.': 'I give way to the oncoming car.',
  'Jeg kører først, fordi jeg har grønt lys.': 'I go first because I have a green light.',
  'Du vil svinge til højre. På cykelstien til højre for dig kører en cyklist ligeud. Hvordan forholder du dig?':
    'You want to turn right. A cyclist on the cycle path to your right is going straight on. What do you do?',
  'Jeg kigger i spejlet og over skulderen, før jeg svinger.': 'I check the mirror and look over my shoulder before I turn.',
  'Cyklisten skal holde tilbage, fordi jeg har blinket først.': 'The cyclist must give way because I signalled first.',
  'Du svinger til højre ved grønt lys. Fodgængere går over den vej, du svinger ind på. Hvordan forholder du dig?':
    'You turn right on a green light. Pedestrians are crossing the road you are turning into. What do you do?',
  'Jeg holder tilbage for fodgængerne.': 'I give way to the pedestrians.',
  'Fodgængerne skal vente, fordi jeg har grønt lys.': 'The pedestrians must wait because I have a green light.',
  'Du kører bag en traktor på en landevej. Midt på vejen er der en spærrelinje. Hvordan forholder du dig?':
    'You are driving behind a tractor on a country road. There is a solid centre line in the middle of the road. What do you do?',
  'Jeg bliver bag traktoren, indtil spærrelinjen ophører.': 'I stay behind the tractor until the solid line ends.',
  'Jeg må overhale, hvis der ikke kommer modkørende.': 'I may overtake if there is no oncoming traffic.',
  'Bilen foran dig sætter farten ned foran et fodgængerfelt. Hvordan forholder du dig?':
    'The car in front of you slows down before a pedestrian crossing. What do you do?',
  'Jeg overhaler bilen, fordi den kører langsomt.': 'I overtake the car because it is going slowly.',
  'Jeg sætter også farten ned og er klar til at standse.': 'I also slow down and am ready to stop.',
  'Du kører forbi tavlen «Overhaling forbudt». Foran dig kører en cyklist. Hvordan forholder du dig?':
    'You pass the «Overhaling forbudt» (no overtaking) sign. A cyclist is riding in front of you. What do you do?',
  'Jeg må gerne overhale cyklisten, når det kan ske uden fare.': 'I may overtake the cyclist when it can be done safely.',
  'Forbuddet gælder også overhaling af cyklisten.': 'The ban also applies to overtaking the cyclist.',
  'Jeg holder god afstand til cyklisten, når jeg overhaler.': 'I keep a good distance from the cyclist when I overtake.',
  'Du kører forbi denne tavle. Der er kø i begge vognbaner. Hvordan forholder du dig?':
    'You pass this sign. There is a queue in both lanes. What do you do?',
  'Jeg fletter, så bilerne skiftevis kører ind fra hver bane.': 'I merge so that cars take turns coming in from each lane.',
  'Bilerne i den venstre bane har forkørselsret.': 'The cars in the left lane have right of way.',
  'Der er pile på kørebanen i din vognbane. I venstre vognbane kører en bil. Hvordan forholder du dig?':
    'There are arrows on the road in your lane. A car is driving in the left lane. What do you do?',
  'Min vognbane ophører, og jeg skal skifte til venstre vognbane.': 'My lane ends, and I must move to the left lane.',
  'Jeg har vigepligt over for bilen i venstre vognbane.': 'I must give way to the car in the left lane.',
  'Når jeg har givet tegn, skal bilen i venstre vognbane give plads.': 'Once I have signalled, the car in the left lane must make room.',
  'Du kører ad accelerationssporet ind på motorvejen. Hvordan forholder du dig?':
    'You are driving along the acceleration lane onto the motorway. What do you do?',
  'Jeg tilpasser farten til trafikken på motorvejen og kører ind, når der er plads.':
    'I match my speed to the traffic on the motorway and move in when there is room.',
  'Lastbilen på motorvejen har pligt til at give mig plads.': 'The lorry on the motorway must make room for me.',
  'Jeg standser altid for enden af accelerationssporet.': 'I always stop at the end of the acceleration lane.',
  'Du nærmer dig dette kryds. Fra højre kommer en bil ad sidevejen. Hvordan forholder du dig?':
    'You are approaching this intersection. A car is coming from the right along the side road. What do you do?',
  'Bilen fra højre har ubetinget vigepligt over for mig.': 'The car from the right must unconditionally give way to me.',
  'Jeg skal holde tilbage for bilen fra højre.': 'I must give way to the car from the right.',
  'Jeg holder øje med, om bilen fra højre holder tilbage.': 'I keep an eye on whether the car from the right gives way.',
  'Du skal ligeud i krydset. Der er ingen trafik på den tværgående vej. Hvordan forholder du dig?':
    'You are going straight on at the intersection. There is no traffic on the crossing road. What do you do?',
  'Jeg standser helt ved stoplinjen.': 'I come to a complete stop at the stop line.',
  'Jeg må køre over uden at standse, da vejen er fri.': 'I may drive across without stopping, as the road is clear.',
  'Du kører forbi denne tavle. En bil kommer imod dig mod indsnævringen. Hvordan forholder du dig?':
    'You pass this sign. An oncoming car is heading towards the narrowing. What do you do?',
  'Jeg har forret, fordi jeg er tættest på indsnævringen.': 'I have priority because I am closest to the narrowing.',
  'Jeg venter før indsnævringen, til bilen er kørt igennem.': 'I wait before the narrowing until the car has passed through.',
  'Du nærmer dig krydset og vil gerne vende. Hvordan forholder du dig?':
    'You are approaching the intersection and would like to make a U-turn. What do you do?',
  'Jeg må ikke dreje til venstre i krydset.': 'I must not turn left at the intersection.',
  'Jeg må gerne vende i krydset.': 'I may make a U-turn at the intersection.',
  'Jeg må køre ligeud eller dreje til højre.': 'I may go straight on or turn right.',
  'Du vil standse ved kantstenen her. Hvordan forholder du dig?': 'You want to stop at the kerb here. What do you do?',
  'Jeg må standse kort for at lade en passager stige ud.': 'I may stop briefly to let a passenger get out.',
  'Jeg må parkere her.': 'I may park here.',
  'Der er en helle midt på vejen foran dig. Hvordan forholder du dig?': 'There is a traffic island in the middle of the road ahead of you. What do you do?',
  'Jeg skal køre til højre for hellen.': 'I must keep to the right of the island.',
  'Jeg må køre til venstre for hellen, hvis der ikke kommer modkørende.': 'I may pass to the left of the island if there is no oncoming traffic.',
  'Det er frostvejr, og bilens ruder er dækket af is. Du har travlt. Hvordan forholder du dig?':
    'It is freezing, and the car windows are covered in ice. You are in a hurry. What do you do?',
  'Jeg skraber alle ruder fri for is, før jeg kører.': 'I scrape the ice off all the windows before I drive.',
  'Det er nok at skrabe et lille hul i forruden.': 'It is enough to scrape a small hole in the windscreen.',
  'Jeg sørger også for, at lygterne er fri for sne og is.': 'I also make sure the lights are free of snow and ice.',
  'Mønsterdybden på bilens dæk er 1 mm. Hvad gælder?': 'The tread depth of the car tyres is 1 mm. What applies?',
  'Dækkene er ulovlige og skal skiftes.': 'The tyres are illegal and must be replaced.',
  'Dækkene er lovlige, hvis lufttrykket er rigtigt.': 'The tyres are legal if the tyre pressure is correct.',
  'Under kørslen begynder en rød advarselslampe at lyse i instrumentbrættet. Hvordan forholder du dig?':
    'While driving, a red warning light comes on in the dashboard. What do you do?',
  'Jeg standser, så snart det kan ske på en sikker måde.': 'I stop as soon as it can be done safely.',
  'Jeg kører videre og får det tjekket ved næste service.': 'I drive on and have it checked at the next service.',
  'Du vil have et barn i en bagudvendt autostol på forsædet. Bilen har airbag foran passagersædet. Hvordan forholder du dig?':
    'You want to put a child in a rear-facing car seat in the front seat. The car has an airbag in front of the passenger seat. What do you do?',
  'Jeg slår airbaggen fra eller sætter autostolen på bagsædet.': 'I switch the airbag off or put the car seat in the back seat.',
  'Det er sikrest for barnet, at airbaggen er slået til.': 'It is safest for the child that the airbag is switched on.',
  'Du kører med en dreng på 8 år, der er 125 cm høj, på bagsædet. Hvad gælder?':
    'You are driving with an 8-year-old boy who is 125 cm tall in the back seat. What applies?',
  'Han skal sidde på en godkendt selepude eller i en autostol.': 'He must sit on an approved booster cushion or in a car seat.',
  'Det er nok, at han bruger bilens almindelige sikkerhedssele.': 'It is enough for him to use the car’s ordinary seat belt.',
  'Det er mit ansvar som fører, at han er spændt fast.': 'As the driver, it is my responsibility that he is buckled up.',
  'Hvordan skal sikkerhedsselen sidde?': 'How should the seat belt sit?',
  'Hoftedelen skal sidde lavt over hofterne.': 'The lap part must sit low across the hips.',
  'Skulderdelen må gerne sidde under armen, hvis den strammer.': 'The shoulder part may sit under the arm if it is tight.',
  'Du har drukket mange genstande til en fest, der varede til langt ud på natten. Næste morgen vil du køre på arbejde. Hvad gælder?':
    'You had many drinks at a party that went on late into the night. The next morning you want to drive to work. What applies?',
  'Der kan stadig være så meget alkohol i blodet, at jeg er over grænsen.': 'There may still be so much alcohol in my blood that I am over the limit.',
  'En kop stærk kaffe og et koldt bad gør mig klar til at køre.': 'A cup of strong coffee and a cold shower make me ready to drive.',
  'Du har fået medicin med en rød advarselstrekant på pakningen. Hvordan forholder du dig?':
    'You have been given medicine with a red warning triangle on the packaging. What do you do?',
  'Jeg læser indlægssedlen og spørger lægen, om jeg må køre.': 'I read the package leaflet and ask the doctor whether I may drive.',
  'Medicin fra lægen påvirker aldrig evnen til at køre bil.': 'Medicine from the doctor never affects the ability to drive.',
  'Jeg kører ikke, hvis medicinen gør mig sløv.': 'I do not drive if the medicine makes me drowsy.',
  'Du har kørt længe, og du begynder at gabe og blive tung i øjnene. Hvordan forholder du dig?':
    'You have been driving for a long time, and you start yawning and your eyes feel heavy. What do you do?',
  'Jeg kører ind et sikkert sted og holder en pause.': 'I pull in somewhere safe and take a break.',
  'Jeg skruer op for musikken, åbner vinduet og kører videre.': 'I turn up the music, open the window and drive on.',
  'Din bil er gået i stå på en landevej uden for byen. Hvordan forholder du dig?':
    'Your car has broken down on a country road outside town. What do you do?',
  'Jeg tænder havariblinket.': 'I switch on the hazard warning lights.',
  'Jeg stiller advarselstrekanten et godt stykke bag bilen.': 'I place the warning triangle a good distance behind the car.',
  'Advarselstrekanten skal stå helt tæt bag bilen, så den er let at se.': 'The warning triangle must stand right behind the car so that it is easy to see.',
  'En passager på 12 år kører med på bagsædet. Hvem har ansvaret for, at han bruger sikkerhedssele?':
    'A 12-year-old passenger is riding in the back seat. Who is responsible for him wearing a seat belt?',
  'Føreren.': 'The driver.',
  'Passageren selv.': 'The passenger himself.',
  'Hvad gælder om alkohol, når du kører bil?': 'What applies to alcohol when you drive a car?',
  'Det er forbudt at køre med en promille over 0,5.': 'It is illegal to drive with a blood alcohol level above 0.5 per mille.',
  'For nye bilister er grænsen 0,2 promille.': 'For new drivers the limit is 0.2 per mille.',
  'Jeg kan straffes under 0,5 promille, hvis jeg ikke kan køre sikkert.': 'I can be punished below 0.5 per mille if I cannot drive safely.',
  'Hvad gælder om bilens dæk?': 'What applies to the car’s tyres?',
  'Mønsterdybden skal være mindst 1,6 mm.': 'The tread depth must be at least 1.6 mm.',
  'Vinterdæk er påbudt i Danmark om vinteren.': 'Winter tyres are mandatory in Denmark in winter.',
  'Du skal køre, når det er mørkt. Vejen er oplyst af gadelygter. Hvilket lys skal du bruge?':
    'You are driving when it is dark. The road is lit by street lights. Which lights must you use?',
  'Nærlys.': 'Dipped headlights.',
  'Kørelys er nok, fordi vejen er oplyst.': 'Daytime running lights are enough because the road is lit.',
  'Hvad hjælper, når du bliver træt under kørslen?': 'What helps when you get tired while driving?',
  'En pause og eventuelt en kort lur.': 'A break and possibly a short nap.',
  'Frisk luft fra et åbent vindue, så jeg kan køre videre.': 'Fresh air from an open window so that I can drive on.',
};

// A course question's text in the user's exam language.
export const courseText = (da: string, lang: string) => (lang === 'en' && (COURSE_EN[da] ?? MORE_EN[da])) || da;
