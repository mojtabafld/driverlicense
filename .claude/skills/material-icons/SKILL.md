---
name: material-icons
description: Chooses, adds and changes the app's icons with Material Symbols (fonts.google.com/icons, Outlined, weight 400). Use whenever an icon is added, changed or discussed in the mobile app or its web builds (mobile/src/ui/icon.tsx, icon-names.ts, icon-paths.ts).
---

# Material Symbols in Teoripro

Every icon in the app (Android, the web site and /app) is drawn by one component, `Icon` in `mobile/src/ui/icon.tsx`,
from the app's own icon names (`IconName` in `mobile/src/ui/icon-names.ts`). The drawings are SVG paths of Material
Symbols (Outlined, weight 400), kept in `mobile/src/ui/icon-paths.ts` (outline and filled form of each), so only the
icons used are in the bundle. Screens never draw icons themselves: they use `<Icon name="…" size color filled? />`.

## Adding or changing an icon

1. Find the symbol on https://fonts.google.com/icons (Outlined) and note its name, e.g. `directions_car`.
2. Add or change the entry in `MAP` in `mobile/scripts/gen-icons.js` (and a new app name in `icon-names.ts`).
3. Regenerate (from `mobile/`), as the script's first lines say: `npm pack @material-symbols/svg-400@0.48.3`, unpack,
   `node scripts/gen-icons.js package/outlined src/ui/icon-paths.ts`, then delete the unpacked files.
4. Some names on the site are missing in that package version (e.g. `auto_awesome`, `smartphone`): pick a close one
   that is there (`wand_stars`, `mobile`); the script stops on a missing name.
