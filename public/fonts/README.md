# /public/fonts

Licensed font files for self-hosting via `next/font/local` (per `ONLYHUMAN-TECHNICAL-ARCHITECTURE.md` §1 — zero layout shift, no external font-hosting request).

Needed: two typefaces, matching the *category* of pairing measured on the reference site (see `GOODLIFE-DESIGN-SYSTEM.md` §2) —
1. A body/heading sans-serif (the workhorse face used everywhere — headings, body copy, buttons).
2. A condensed/mono label face, used only at small sizes for eyebrows/uppercase micro-labels.

For each, provide `.woff2` files (plus `.woff` fallback if available) for every weight actually used in the design (typically regular/400, medium/500, and bold/700 for the primary face). Confirm the license permits web embedding/self-hosting before adding files here — if licensing is still pending, `next/font/google` with a close equivalent can be used as a temporary stand-in with zero code impact when swapped later.
