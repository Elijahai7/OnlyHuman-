# /public/brand

OnlyHuman's core identity assets.

## /public/brand/logo
- **`onlyhuman-logo-transparent.png`** — canonical primary logo, approved production asset. Verified true alpha transparency (0 at edges, opaque only on the mark itself). This is the file every logo usage in the app should reference; do not redraw, restyle, recolor, or replace it without asking.
- **`onlyhuman-favicon-source.png`** — approved favicon/app-icon source (512×512, transparent), derived from the same logo art. Feed this into Next.js's `app/icon.png`/`app/apple-icon.png` convention during Phase 2. **Flagged for the founder:** the opaque content touches the right edge of the canvas (a sliver of the "H" in "Human" is cut off), so it isn't a clean isolated mark — worth a re-crop before final favicon generation; not corrected here without approval.
- A reversed/light variant, if one gets supplied later, for use on the dark/glass sticky header if OnlyHuman's header ships on a dark surface.
- A wordmark-only variant, if it differs from the full lockup, for tight header spacing on mobile.

The previously-supplied `onlyhuman-logo-source.png` (flattened, baked-in checkerboard, no real transparency) has been removed and superseded by `onlyhuman-logo-transparent.png` per the founder's supplemental asset pack.

## /public/brand/favicon
Currently empty — the approved favicon source was delivered into `/public/brand/logo/` instead (see above). Kept as a placeholder in case a separately-generated favicon/app-icon set is supplied later.
