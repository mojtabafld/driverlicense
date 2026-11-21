# Helpers for writing the questions of «آزمون جدید» (the new test): original questions in the real Danish theory test's
# format, a picture, a question and two to four statements each answered «ja» or «nej», written from Færdselsloven, its
# bekendtgørelser (vejafmærkning, køretøjers indretning, kørekort) and the official curriculum (Undervisningsplan for
# kategori B), not copied from any question bank. Every text in Danish (as in the exam), English and Persian, and every
# statement with why it is right or wrong. build.py writes them into site/newq.js (the app's own question shape, as
# site/data.js) and their pictures' prompts into data/newq-art.json (a new one with "order": false: made by the image
# model only when the admin orders it; until then the question shows a placeholder).
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'course-src'))
from course import ABOVE, ABOVE_STYLE, PLAIN, TOWN, VIEW, view_style  # noqa: E402,F401  (the course's picture style)

QUESTIONS = []

# The official curriculum's subsections that have theory questions (as site/data.js's topics).
CODES = {'1.2', '3.2', '4.4', '4.5', '5.1', '5.2', '6.1', '6.2', '7.1', '7.2', '7.3', '7.4', '7.5', '7.6', '7.7', '7.8',
         '7.9', '7.10', '7.11', '7.12', '7.13', '7.14', '7.15', '7.16', '7.17', '7.18', '7.19', '7.20', '8.1', '10.3'}

OBJECT_STYLE = ("Style: a clean, precise flat vector illustration for a Danish driving-theory app, NOT photorealistic and NOT a "
                "3D render: simple shapes, flat even colours, crisp edges, only very soft shadows, a calm plain background. "
                "Everything that matters for the question is drawn large, sharp and accurate. No text, letters or numbers "
                "anywhere except what the description asks for.")


def above(body):
    """A diagram from above: the layout, the signs, the road users (our car RED), what must not appear."""
    return '\n'.join([ABOVE, body.strip(), ABOVE_STYLE])


def view(body, cond='daylight, dry road, good visibility', scenery=PLAIN):
    """The road ahead from the driver's seat, as most of the real test's pictures."""
    return '\n'.join([VIEW, body.strip(), view_style(cond, scenery)])


def town(body, cond='daylight, dry road, good visibility'):
    return view(body, cond, TOWN)


def picture(body):
    """Anything else (the dashboard, a tyre, a medicine box): the whole description."""
    return '\n'.join([body.strip(), OBJECT_STYLE])


def S(ok, da, en, fa, wda, wen, wfa):
    """One statement: right or not; its Danish, English and Persian; why (Danish, English, Persian, without the «Ja.» /
    «Nej.» that build.py puts in front)."""
    return {'ok': bool(ok), 'da': da, 'en': en, 'fa': fa, 'why': (wda, wen, wfa)}


def Q(id, c, pic, da, en, fa, *st):
    """A question: its number (5001 …), its curriculum subsection, its picture's prompt, the question in Danish, English and
    Persian, and its statements (S)."""
    QUESTIONS.append({'id': id, 'c': c, 'pic': pic, 'da': da, 'en': en, 'fa': fa, 'st': list(st)})
