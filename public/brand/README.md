# /public/brand

Drop OnlyHuman's core identity assets here.

## /public/brand/logo
- Primary logo, SVG preferred (`logo.svg`) — vector scales cleanly across the fluid type/hero sizing described in `GOODLIFE-DESIGN-SYSTEM.md`.
- A reversed/light variant if one exists (`logo-reversed.svg`), for use on the dark/glass sticky header if OnlyHuman's header ships on a dark surface.
- Wordmark-only variant if it differs from the full lockup (`wordmark.svg`), for tight header spacing on mobile.
- PNG fallback at 2x/3x resolution only if SVG isn't available (`logo@2x.png`).

## /public/brand/favicon
- One square master image, ≥512×512px, transparent background (`favicon-source.png`). Next.js's `app/icon.png`/`app/apple-icon.png` convention will generate the actual served favicons from this during Phase 2 — no need to pre-generate every size yourself.
