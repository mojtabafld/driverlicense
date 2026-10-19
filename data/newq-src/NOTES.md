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
- Færdselsstyrelsen: medicine dangerous in traffic is often, not always, marked with a red triangle; at the recommended
  dose driving is sometimes allowed; ask the doctor.
- Rådet for Sikker Trafik / driving-school guides: roundabouts (give way on entering, signal right before leaving, give
  way to cyclists going on round when leaving); two-second rule.
