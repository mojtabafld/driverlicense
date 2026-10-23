---
name: lucide-icons
description: Chooses, adds and changes the app's icons with the Lucide icon set (lucide.dev, lucide-react-native), checking that each icon exists in the installed package. Use whenever an icon is added, changed or discussed in the mobile app or its web builds (mobile/src/ui/icon.tsx, icon-names.ts), or when the user mentions Lucide or asks for "a better icon" for something.
---

# Lucide icons in Teoripro

Every icon in the app (iOS, Android, the web site and /app) is drawn by one component, `Icon` in
`mobile/src/ui/icon.tsx`, which maps the app's own icon names (`IconName` in `mobile/src/ui/icon-names.ts`) to Lucide
components from `lucide-react-native`. Screens never import Lucide directly: they use `<Icon name="…" size color />`, so
the whole app stays on one set and one stroke weight.

## Rules

- Only Lucide icons. No other icon packs, no hand-drawn SVG icons (the header drawings in `ui/header-art.tsx` are
  illustrations, not icons).
- One look: outline, `strokeWidth` 2, rounded ends; size and colour come from the caller. The only filled icon is a
  saved bookmark (`filled`).
- Arrows and chevrons are named for the Persian (right-to-left) layout: `arrowRight` is "back", `chevronLeft` is "go on".
  `Icon` mirrors them in English and Danish; keep that when adding direction icons.
- Pick by meaning, not by look: e.g. `CircleCheck` for the exam, `BookOpen` for learning, `Scale` for rules,
  `Signpost` for road signs, `Merge` for right of way. Avoid icons whose picture says something else in a driving app
  (a car icon for "settings", a warning triangle for "info").

## Adding or changing an icon

1. Find the icon on https://lucide.dev/icons (search by meaning; the page shows its PascalCase component name).
   For the full catalogue in Markdown, https://lucide.dev/llms.txt.
2. Check that it exists in the installed version (names change between versions, e.g. `trash-2` is `trash` in 1.x):
   `ls mobile/node_modules/lucide-react-native/dist/esm/icons/<kebab-name>.mjs` and
   `grep -q "default as <PascalName> }" mobile/node_modules/lucide-react-native/dist/esm/lucide-react-native.mjs`.
3. A new meaning: add a name to `IconName` in `icon-names.ts`, import the component in `icon.tsx` (named import, so
   unused icons stay out of the bundle) and add it to `ICONS`. A different picture for an existing meaning: change only
   its entry in `ICONS`.
4. `npx tsc --noEmit` in `mobile/` (the `Record<IconName, LucideIcon>` makes a missing entry an error), then build the
   web (`npm run build:web`, and `npm run build:web-app` for /app) and look at the screens that use it.
