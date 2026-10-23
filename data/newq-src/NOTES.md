# «آزمون جدید»: how the questions are written

The bank is the app's own: no question, statement or picture is taken or reworded from prove.dk or any other question
bank. Every rule is checked against the law or an official text before it is used (the list below), and the wording
is new.

## Format (as the real test)

- A picture, a question in Danish (ending in «?»), two to four statements, each answered «ja» or «nej» on its own.
- Each statement has its English and Persian, and why it is right or wrong in all three languages (`S(...)` in
  `nq.py`; build.py puts «Ja.» / «Nej.» in front of the why).
- Statements stand on their own (they are shown in a shuffled order of their own; see `order` in build.py).
- Like the real test: about 80 % of the questions with 4 statements, the rest with 3 (rarely 2); the number of right
  statements per question about 1: 26 %, 2: 47 %, 3: 25 %, 4: 2 % (never 0). build.py prints the counts.
- Picture prompts: `view` (from the driver's seat), `town`, `above` (diagram; our car RED, a SOLID GREEN arrow for the
  right way, DASHED ORANGE for another), `picture` (anything else); each with THE SCENE, MUST BE CLEARLY VISIBLE and
  MUST NOT APPEAR. No readable text in the pictures, signs in their official Danish design.

## How many of each subsection (1100 in all, as the official curriculum's weight in the real test)

1.2 48 · 3.2 7 · 4.4 3 · 4.5 13 · 5.1 7 · 5.2 15 · 6.1 94 · 6.2 22 · 7.1 30 · 7.2 30 · 7.3 82 · 7.4 33 · 7.5 15 ·
7.6 87 · 7.7 45 · 7.8 16 · 7.9 105 · 7.10 2+ · 7.11 40 · 7.12 82 · 7.13 49 · 7.14 60 · 7.15 17 · 7.16 27 · 7.17 4 ·
7.18 120 · 7.19 29 · 7.20 2+ · 8.1 8+ · 10.3 5+ (`+`: a few more are fine). Each batch of 100 mixes the subsections.

## Rules checked (and where)

- Færdselsloven (danskelove.dk / retsinformation.dk): § 4 police directions before signals, signs and markings, and
  these before the rules; § 7 stk. 2 give way in good time to an emergency vehicle, stop if necessary; § 15 stk. 1 keep
  right, stk. 2 three lanes: not the left one unless one-way, stk. 3 distance (no risk of collision if the one ahead
  stops; vehicles with a special speed limit, e.g. car + trailer, outside built-up areas leave room for overtakers to
  pull in), stk. 4 keep right of islands; § 18 stk. 1 reversing / turning without danger, turning forwards to the left,
  stk. 2 pulling out and lane changes, stk. 3 acceleration lane (adapt speed, leave when safe; those in the lane
  should ease the entry), stk. 4 fewer lanes: mutual consideration; § 21 stk. 3 before overtaking: lane clear of
  oncoming traffic and other obstacles, the one ahead not signalling to overtake, nobody behind overtaking, room to
  return; § 26 stk. 3 ubetinget vigepligt out of a car park, property, petrol station, path, pedestrian street, field
  road, and for cyclists from a cycle path not built with a road; stk. 6 right turn: no inconvenience to cyclists going
  straight on, two-way cycle paths; § 29 stk. 1 nr. 3 level crossing, nr. 5 bridge over a motorway, viaduct, tunnel,
  stk. 3 nr. 3 no parking on the carriageway of a main road outside built-up areas; § 31 stk. 2 a vehicle standing where
  it is a danger: moved as soon as possible, warn others, motor vehicles marked with a warning triangle (warned in
  good time); § 35 parked in lighting-up time: position lights, rear lights, number-plate light, no other lights;
  § 46 stk. 1 no crossing the central reservation, stk. 2 no turning or reversing on the motorway or its slip roads,
  stopping only at parking / rest areas and at an emergency phone to use it, stk. 3 with three or more lanes vehicles
  over 3.5 t and combinations over 7 m only in the two right lanes; § 54 stk. 2 no driving when illness, weakness,
  exhaustion or lack of sleep make it unsafe; § 55 a no hand-held phone while driving (also at a red light: a
  landsret judgment of 4 April 2022).
- Bekendtgørelse om vejafmærkning (BEK nr 425 af 13/04/2023, in force): A 11 dangerous junction where the crossing
  traffic has ubetinget vigepligt; C 51 the exception is only two-wheeled bicycles and two-wheeled small mopeds (not
  motorcycles), and vehicles turning off the road; E 51 play-and-living area: very low speed (normally under 15 km/h),
  staying and playing on the whole width, drivers give way to pedestrians, parking only in marked places, ubetinget
  vigepligt out of it; E 49 pedestrian street; S 11 shark teeth alone give ubetinget vigepligt; Q 44 spærrelinje not
  crossed (road works, a standing vehicle: with care), double lines: follow the nearest.
- FDM: carrying a warning triangle is not required by law, using one when the car stands where it is a danger is
  (50 m, on the motorway 100 m); pigdæk 1 November – 15 April; since 1 July 2025 tyres obviously unsuitable for the
  conditions (summer tyres in snow, slush) are illegal; Vejdirektoratet via FDM on 2-minus-1 roads: drive in the middle,
  out into the edge lane only for oncoming cars, stop for cyclists and pedestrians there.
- Færdselsloven, checked for batch 2: § 10 pedestrians on the carriageway walk at the far left, pushing a bicycle at the
  far right; § 16 stk. 1 lane before a junction (right lane to turn right, left lane to turn left, straight on the most
  suitable), stk. 2 turning without danger to those behind, stk. 3 small right turn, left turn near the middle (left
  edge on one-way roads), stk. 4 into a road with several lanes the most suitable way, stk. 5 opposing left-turners may
  pass each other on the left; § 19 stk. 1 in built-up areas slow down and if necessary stop for a bus signalling to
  pull out (the bus driver still takes care), stk. 2 særlig agtpågivenhed at a stopped school bus; § 20 stk. 1 meeting:
  keep right with enough side distance and care for road users at the right edge, a partly blocked road: the one on
  whose side it is stops if necessary; § 21 stk. 1 overtake on the left, on the right of a left-turner, cyclists and
  small mopeds may overtake on the right, stk. 4 back to the right as soon as possible unless at once overtaking
  another; § 22 being overtaken: keep right, do not speed up, slow vehicles help; § 27 stk. 1–8 (pedestrians, crossing
  pavements, turning, regulated and unregulated crossings, avoid stopping on a crossing); § 28 stk. 2 right side, left
  side on less busy and one-way roads, lengthwise at the edge, stk. 3 not on cycle path, footpath, pavement or islands
  (outside built-up areas a vehicle up to 3,500 kg may stand partly on the pavement or verge strip), stk. 4 secure the
  vehicle, stk. 5 doors and loading without danger; § 29 stk. 1 nr. 1 crossing and 5 m before it, nr. 2 junction and
  10 m from the crossing carriageway's edge, nr. 6 hilltop and blind bend, nr. 8 less than 3 m from a barrier line,
  nr. 9 crawler lane, nr. 10 taxi stand, stk. 3 nr. 1 parking 30 m from a level crossing, nr. 2 in front of a
  driveway, nr. 4 beside a vehicle at the kerb, nr. 5 blocking another vehicle; § 32 stk. 1 horn only to prevent or
  avert danger, a light signal in lighting-up time unless the danger is immediate, stk. 2 signal before pulling out,
  turning round and turning, on the motorway before lane changes, stk. 4 brake light, stk. 5 in good time; § 33 stk. 2
  high beam when the view is otherwise too short, stk. 3 not on lit roads, meeting, trains, following, stk. 4 dipped
  otherwise, stk. 5 fog lights only in fog and heavy precipitation, stk. 6 no dazzling; § 41 stk. 1 stop within the
  view and before obstacles that can be expected, adjust speed before dipping, stk. 2 the 13 cases of a suitably low
  speed, stk. 3 no needlessly low speed or sudden braking, stk. 4 no splashing; § 67 stk. 3 the driver checks steering,
  brakes, signals and lights; § 80 seat belts (not when reversing or in car parks), the driver sees to passengers under
  15; § 80 a children under 135 cm in approved equipment for their height and weight, no rear-facing seat at an active
  airbag; § 82 load not hiding lights or number plate, secured, the driver's free view.
- Bekendtgørelse om vejafmærkning, batch 2: A-signs 150–250 m before the danger outside built-up areas (another
  distance on a plate), A 16 roundabout, A 21 cyclists, A 22 children, A 26 wild animals, A 27 livestock, A 31 slippery
  (cause on a plate); B 15 merge (mutual consideration), B 16 main road, B 18 give way to oncoming, B 19 oncoming give
  way; C 11 no right / left turn (left also bans turning round; only at that junction), C 12 no turning round, C 19 no
  entry for any vehicle, C 42 height including load, C 55 local speed limit until an end sign, a distance or another
  limit, C 59 lifts all bans except stopping and parking, C 61 no stopping and C 62 no parking on the carriageway, on
  that side up to the next junction; D 12 direction in a roundabout, D 55 minimum speed (not cyclists and small mopeds,
  until D 56); Q 41, Q 42 (care), Q 44, Q 45, Q 46 (slow vehicles may cross it briefly to ease overtaking), Q 47; light
  signals: red and red-and-yellow stop, yellow stop unless stopping would be dangerous, a green arrow for its direction.
- Motorstyrelsen: an extra (third) number plate when the rear plate is fully or partly covered, for example by a bike
  rack.
- Færdselsstyrelsen: medicine dangerous in traffic is often, not always, marked with a red triangle; at the recommended
  dose driving is sometimes allowed; ask the doctor.
- Rådet for Sikker Trafik / driving-school guides: roundabouts (give way on entering, signal right before leaving, give
  way to cyclists going on round when leaving); two-second rule.
- Lov nr. 567 af 27/05/2025 (in force 1 July 2025; checked for batch 3): § 53 stk. 2 a new driver, in the first 3 years
  after first getting category B, may not drive above 0.20 promille in the blood or 0.10 mg per litre of breath (else
  0.50 / 0.25; FDM: the same penalties, and above 1.2 the licence is lost unconditionally); § 56 stk. 3 from 17 a
  licence on condition of a companion in the front seat between 20 and 5 until 18; § 43 registered tractors 40 km/h;
  § 67 stk. 3 no obviously unsuitable tyres. (Question 5089 and the course's alcohol lesson were corrected to the 0.2.)
- Færdselsloven (LBK nr 118 af 12/01/2026), checked for batch 3: § 2 nr. 12 lygtetændingstid: sunset to sunrise, and
  whenever darkness, fog, mist, rain or the like make the lights necessary to be seen or to see; nr. 18 parkering: any
  leaving of a vehicle, but stops under 3 minutes and for people or goods getting on or off are not parking (a
  broken-down vehicle counts as parked after 18 hours); § 15 stk. 4 keep right of islands and the like, left only where
  marked or on a one-way carriageway; § 21 stk. 3 the four conditions before overtaking, stk. 4 enough side distance,
  stk. 5 a road-works vehicle may be overtaken with care in the most suitable way; § 23 stk. 1 no overtaking just
  before or in a junction (unless lanes for the same direction, past a left-turner, signals or police, or the crossing
  road has ubetinget vigepligt), just before or on a level crossing, with a limited view at hills and bends (unless two
  lanes without oncoming traffic), stk. 2 none of this for two-wheeled bicycles and small mopeds; § 24 in dense traffic
  in several lanes passing in another lane is not overtaking, and lanes are changed only when needed (before a junction,
  to stop or park); § 25 no overtaking or passing before a pedestrian crossing a vehicle that hides it; § 26 stk. 3 also
  every exit from a road over a pavement, cycle path or verge raised above the carriageway, stk. 5 show the duty to give
  way in good time, stk. 6 left / right turns and two-way cycle paths, also outside junctions, stk. 7 not into a
  junction that cannot be left; § 27 stk. 6 at a regulated crossing give way to pedestrians on it even on green, stk. 7
  an unregulated crossing: adjust the speed for those on it or about to step onto it, stop if needed; § 29 stk. 1 nr. 1
  also opposite a cycle-path exit, 5 m before an exit from a cycle path along the road and 5 m on each side of a crossing
  one, nr. 4 not covering a sign or signal, nr. 7 where the carriageway before a junction is divided into lanes by
  barrier lines, and 5 m before that, stk. 3 nr. 3 no parking on a main road's carriageway outside built-up areas, nr. 4
  no double parking (except beside two-wheelers); § 32 stk. 2 no signal duty for reversing, stk. 5 the signal stops when
  the manoeuvre is done; § 33 stk. 1–7 (lights in lighting-up time; high beam not near trains along the road, not behind
  another vehicle); § 41 stk. 2 nr. 9 a bus standing for passengers (either side), nr. 11 horses and cattle, nr. 12 road
  works, nr. 13 an accident site; § 42 50 / 80 / 130, motortrafikvej 80, raised at most to 100 there; § 47 a vehicle
  forced to stop on the motorway: off the carriageway where possible, removed as soon as possible, others warned,
  repairs only to get it away; § 80 stk. 2 no seat-belt duty when reversing or in a car park, petrol station or workshop.
- Bekendtgørelse om vejafmærkning (BEK nr 425 af 13/04/2023), batch 3: A 18 oncoming traffic (also at the start of the
  stretch), A 35 dangerous verge (cause on a plate, e.g. «Blød rabat»), A 36 speed humps, A 41 bends with UA 41 the speed
  a bend can normally be taken at, A 43 narrowing with UA 43 the free width, A 46 steep descent / ascent (the largest
  gradient), A 72 level crossing without barriers with UA 72 «Se efter tog» (crossings secured only by signs), A 73 with
  barriers, A 74 cross markers right before the crossing (A 74,2 several tracks); B 16 main road: the side roads have
  ubetinget vigepligt, and no parking on its carriageway outside built-up areas; C 51 not for overtaking two-wheeled
  bicycles and small mopeds, or vehicles turning off the road; C 52 no overtaking by lorries, until C 54 or a distance;
  E 18 dead end (a thin white line: it goes on as a path); E 23 under E 33: only for vehicles with a § 88 a permit,
  stopping too; E 34 emergency lay-by; E 37 a lane that slower vehicles must use; E 39 the road is not suitable for a
  higher speed, until E 40 or a distance; E 68 zone sign: the symbols' rules in the whole area until E 69 or another
  zone sign (local signs may differ); Q 45 hatched area: no driving, stopping or parking; Q 46 unbroken edge line: crossed
  only to stop, park or drive on or off the road; R 11 arrows before a junction must be followed from that lane; V 42
  BUS: only regular buses (taxis, zero-emission cars where their symbols are added), cyclists and small mopeds must use a
  bus lane on the right.
- FDM: Tempo 100: an approved car and trailer may drive 100 km/h on the motorway only (otherwise 80).
- Færdselsloven (LBK nr 118 af 12/01/2026), checked for batch 4 (lovguiden.dk): § 2 nr. 18 a vehicle left because an
  accident or a technical fault stops it counts as parked 18 hours after it was left, nr. 27 tættere bebygget område is
  only where its borders are marked; § 3 stk. 1 consideration and care, stk. 2 særligt hensyn for children, school
  patrols, the elderly and people with poor sight or hearing or another impairment; § 9 accident: stop at once, help the
  injured, help make the traffic safe, name and address on request (also to the owner of damaged property), tell the
  police after more than minor injury, the injured party or the police after damage with nobody there, stk. 3 nothing
  moved after death or serious injury unless it endangers traffic; § 23 stk. 1 nr. 3 exact exception: «medmindre
  kørebanen i kørselsretningen har mindst to vognbaner, hvor modkørende færdsel ikke må forekomme», stk. 2; § 28 stk. 2
  left side on less busy and one-way roads, lengthwise at the edge or outside it if possible, stk. 3 not on cycle path,
  footpath, pavement, central reserve, islands (outside built-up areas a vehicle up to 3,500 kg partly on the pavement or
  separating verge), stk. 4 secured against moving off and against use by others, anti-theft device on, stk. 5; § 35
  stk. 1 parked in lighting-up time: position, rear and number-plate lights, stk. 3 no other lights, stk. 4 in built-up
  areas a motor vehicle up to 6 m by 2 m along the edge only the position and rear light towards the middle (not when
  towing); § 41 stk. 2 nr. 9 a bus or a letbane standing for passengers; § 49 stk. 1 two cyclists abreast where there is
  room and it is safe, not when an overtaking signal is given unless the traffic allows or requires it, three-wheelers
  never, stk. 2 keep right, stk. 3 keep right before junctions, may wait at the line between a right-turn lane and the
  next lane, left turn in two stages (through the junction first) unless a marking says it is for cyclists.
- Bekendtgørelse om vejafmærkning (BEK nr 425 af 13/04/2023), batch 4 (lovguiden.dk): § 5 variable signs (A 20, A 22, A 39,
  A 95, A 99, C 11, C 51–C 56, E 16, E 91, E 92); § 9 plates white under A, B and C signs, blue under D and E signs; A 19
  Lyssignal, A 20 Kø (particular risk of queues), A 37 Ujævn vej, A 38 Lunke (water on the road in heavy rain), A 91
  Oplukkelig bro, A 92 Havnekaj (ferry berth, quay), A 99 with UA 99 Uheldskryds; E 15 lanes at a junction (the
  directions each lane is for), E 16,1 merge (mutual consideration), E 16,2 lane change (the one changing lanes makes sure
  it is safe), E 30 letbane stop, E 31 bus stop (regular buses), E 32 taxi stand, E 34 emergency place, E 41 exit bend
  speed, E 42 motorway (also slip roads), E 44 end of motorway, E 47 cykelgade (reserved for bicycles and small mopeds,
  others by permission, speed like the cyclists', normally under 30 km/h, særlig agtpågivenhed, parking only in marked
  places), E 49 gågade (reserved for pedestrians, driving by permission on a plate, very low speed, normally under
  15 km/h, parking only in marked places except bicycles, mopeds and two-wheeled motorcycles, ubetinget vigepligt out of
  it), E 53 area with speed reduction (no number of its own), E 55 built-up area, E 80 general limits with UE 80
  (daytime running lights, seat belts and child restraints compulsory), E 90 ATK, E 91 speed display; § 54 yellow
  markings are temporary and are followed before white ones (S 21 cycle crossing may be blue, V 45 / V 46 green); § 60
  T 33 inside the bay, wheels on a broad edge line towards the carriageway but not beyond, in a car park not outside the
  bays, vehicles with more than two wheels lengthwise, a symbol (bus, taxi, lorry, motorcycle, V 23) keeps the bay for
  those, T 61 unbroken yellow: no stopping, T 62 dotted yellow: no parking, T 63 yellow triangle: end of the ban at a
  junction; § 65 red and red-and-yellow stop, yellow stop unless that is dangerous, green go; § 66 an arrow signal is for
  those going the arrow's way, left-turning cyclists and small mopeds follow the signals for straight on.
- FDM (p-skilte): times in black or white apply on weekdays, in brackets on Saturdays, in red on Sundays and public
  holidays; no times: always.
- Transportministeriet via lovguiden.dk: since 1 July 2025 a 17-year-old may drive alone between 05 and 20; between 20 and
  05 the companion rule stays until 18.
- Færdselsloven (LBK nr 118 af 12/01/2026), checked for batch 5: § 2 nr. 18 (any leaving of a vehicle, with or without
  the driver, is parking; stops under 3 minutes and for people or goods getting on or off are not); § 9 (everyone
  involved stops, whoever is to blame; name and address on request, also to the owner of damaged property; with nobody
  there, the owner or the police told as soon as possible; the scene left unchanged only after death or serious injury);
  § 15 stk. 4 (keep right of islands); § 23 stk. 1 nr. 3 (limited view at a hill or in a bend); § 24 (dense traffic in
  several lanes); § 27 stk. 5 (turning: pedestrians crossing the new road get unhindered passage), stk. 8 (avoid stopping
  on a crossing); § 28 stk. 2 (outside built-up areas a car park on the right where possible; at the edge or, if
  possible, outside the carriageway; the left side on less busy roads), stk. 3 (not on a cycle path, central reserve or
  islands); § 29 stk. 1 nr. 1 (also opposite a cycle-path exit), nr. 2 (a roundabout is a junction), stk. 3 nr. 4 (no
  parking beside a vehicle at the edge, except beside a two-wheeled bicycle, moped or motorcycle without sidecar); § 32
  stk. 1, 2 and 5; § 33 stk. 3–5 (high beam allowed on an unlit road when nobody is met or followed; fog lights only in
  fog and heavy precipitation); § 41 stk. 1 (adjust the speed before dipping), stk. 3 (no sudden braking); § 46 stk. 2
  (no turning or reversing on the motorway's slip roads); § 80 (passengers of 15 and over answer for their own belt).
- Bekendtgørelse om vejafmærkning (BEK nr 425 af 13/04/2023), batch 5: A 23 «Ridende», A 31 «Glat vej», A 33 «Løse sten»,
  A 46 steep descent (the largest gradient), A 92 «Havnekaj»; C 12 «Vending forbudt» (only at that junction; turning left
  is allowed), C 22,1 (motor vehicles, large mopeds, tractors and motorredskaber banned); D 16 «Valgfri passage», D 21
  «Cykelsti» (cyclists and small mopeds only); E 68 P-zone with a P-skive; Q 45 hatched area at a slip road; Q 46 the
  hard shoulder beyond the unbroken edge line (crossed only to stop or to drive on or off); S 21 cycle crossing (blue,
  § 54); T 33.
- Vejdirektoratet via FDM: 2-minus-1 roads (one shared lane in the middle, edge lanes for cyclists and pedestrians, used by
  cars only to make room for oncoming traffic; not for overtaking).
- Færdselsloven, checked for batch 6 (the full text on danskelove.dk): § 4 stk. 2 (police directions before signs, markings
  and signals); § 5 stk. 1 (special care at level crossings, a speed that lets you stop before the tracks), stk. 2 (no
  crossing when a signal shows stop, while the barriers are closed, closing or opening, or when railway staff signal a
  train); § 7 stk. 6 (free passage for groups of children under a leader's supervision, funeral and other closed
  processions); § 12 (a closed procession on the verge or the right side of the carriageway; in lighting-up time a white
  or yellow lamp in front towards the middle of the road and a red lamp at the back); § 16 stk. 3 (a left turn ends on
  the right of the carriageway turned into); § 20 (the one with the obstruction on his side stops if necessary); § 21
  stk. 1; § 22 stk. 1–2; § 26 stk. 3 exactly: any exit from a road over a pavement, cycle path or verge «som er hævet over
  kørebanen på den vej, der køres ind på»; § 27 stk. 1–2 (room for pedestrians; give way to them when crossing a
  pavement or footpath or coming out of a property); § 28 stk. 2–4; § 29 stk. 1 nr. 5 («på bro over motorvej, i viadukt
  eller tunnel»), nr. 11 (not hindering light rail); § 32 stk. 1 (only the horn is limited to preventing or averting
  danger; the law sets no such limit for light signals, so five earlier explanations that said so were reworded); § 33
  stk. 5 (fog lights only in fog and heavy precipitation, and then instead of the prescribed lights); § 41 stk. 3 (no
  needlessly low speed or sudden braking); §§ 44, 46 stk. 2, 48 (§§ 44–47 also on a motortrafikvej); §§ 125 stk. 2–3, 127
  and 60 c (two klip in the first 3 years: kørselsforbud until special driving lessons and a kontrollerende køreprøve).
- Bekendtgørelse om vejafmærkning (BEK nr 425 af 13/04/2023, the XML on retsinformation.dk), batch 6: § 18 stk. 2 (bans up to
  the next junction), stk. 3 («Ærindekørsel tilladt»: aflevering, afhentning, arbejde, indkøb, gæstebud og lignende with
  parking for it, and driving to and from one's own home or business); UB 11,1 (advance warning of a stop at a junction,
  with the distance), UB 11,3 (light rail in both directions on the crossing road); B 16 (unless B 11, B 13 or B 15 stands
  on the main road); A 17 «Fodgængerfelt», A 33 «Løse sten» (stone chips), A 34 «Stenskred», A 73; C 22,1; D 22 «Gangsti»,
  D 23 «Ridesti», D 26 «Delt sti», D 27 «Fællessti» (mutual consideration); E 33 with UE 33,4 (only electric vehicles, those
  that can be charged from an outside source, may stop and park); E 43 «Motortrafikvej»; Q 44 (not crossed, also not when
  turning round; crossed with special care where e.g. road works or a stopped or parked vehicle make it necessary); Q 45;
  Q 46 (slow vehicles briefly to ease overtaking; passing a left-turner on the right unless the lane beyond is a special
  lane); Q 46–47 (no stopping or parking in special lanes with a broad line, e.g. cycle lanes, except parking lanes).
- FDM (parking with an electric car or a plug-in hybrid): the cable symbol reserves the space for electric cars and plug-in
  hybrids; petrol and diesel cars may neither stop nor park there; charging is required only when the sign says so; a time
  limit on the sign applies to them too. UN Regulation 39: a speedometer never shows less than the true speed.
- Færdselsloven, checked for batch 7 (danskelove.dk): § 7 stk. 4 (a car with a white cloth in front carrying the seriously ill
  or injured counts as an emergency vehicle; the driver tells the police afterwards), stk. 5 (not so near a fire or an accident
  that the rescue work is hampered), stk. 6 (the defence forces' columns, funeral and other closed processions); § 10 stk. 2
  (on the carriageway pedestrians walk at the far left, but someone pushing a bicycle at the far right), § 11; § 14 stk. 5
  (crawler lane); § 16 stk. 3; § 19 stk. 1–2; § 21 stk. 1–2 (only cyclists and small mopeds overtake on the right; a
  light-rail vehicle may be overtaken on the right with special care); § 23 stk. 1–2 (the junction exception only for
  two-wheeled bicycles and small mopeds); § 24 stk. 1–2 (passing a vehicle in a lane reserved for one kind of traffic is not
  overtaking); § 29 stk. 1 nr. 2 (10 m from the cycle path's nearest edge where carriageway and cycle path open out together),
  nr. 6; § 31 stk. 1 (parked within 2 m of a rail: stay near, move without being asked), stk. 2–3 (stuck on a level crossing:
  warn the train drivers); § 32 stk. 1; § 33 a; § 54 stk. 4; § 70 (one trailer to a car); § 80 stk. 4, § 80 a stk. 1, 3 and 6,
  § 80 b (no more passengers than belted seats, front and back; the driver answers for those under 15); § 83 a (nobody carried
  in a caravan); § 125 stk. 1 nr. 3 (more than 40 % over a temporary limit at road works).
- Bekendtgørelse om vejafmærkning (BEK nr 425 af 13/04/2023), batch 7: § 9 U 1 and U 3 (black or white times: weekdays except
  Saturdays; brackets: Saturdays; red: Sundays and holidays); § 19 (parking signs only on their own side; the law goes first
  where it is stricter); A 39, A 42,1, A 43,1, A 43,3, A 75 (distance to a level crossing), A 95; B 11 with U 1 (advance warning
  of B 11); C 21, C 25,1, C 31 (actual total weight; for a combination each vehicle), C 55 (a weight plate counts the
  combination's permitted total weight together; «Støj»), C 61 (only stopping not done for the sake of the traffic), UC 60,6,
  UC 60,8; D 26; E 11; E 33 with UE 33 (a horizontal arrow: parking crosswise); E 34; E 37; E 47 and E 49 (parking only in marked
  places); E 51 (play on the whole width, very low speed, drive past only when people have seen the car and made room); Q 41, Q 42,
  Q 46 (parking lanes: wheels on the broad line but not beyond it), Q 46–47 (a broad edge line: room outside it for pedestrians
  and cyclists); R 11, R 13 (double arrows for two junctions), R 15 (diagonal arrows: change lanes as soon as possible); S 16, S 18,
  S 22; V 60 (two symbols to the vehicle in front), V 61; § 65 stk. 2–3 (leave the junction when red comes; red and yellow by a
  level crossing can go back to red); § 68 Y 17; § 69 Z 72,1 and Z 72,2 (a green arrow under the red flashing signal).
- Picture prompts assume the usual symbols where the order does not describe them: a windsock for A 95, white chevrons for V 60.
