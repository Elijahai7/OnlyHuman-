# /public/images

Photography and product renders. Use descriptive, hyphenated filenames (e.g. `compounded-tirzepatide-vial-front.webp`, not `IMG_0234.jpg`) — filenames feed directly into the SEO image-naming requirement in `ONLYHUMAN-SEO-GEO-PLAN.md`. Prefer `.webp` or `.avif`; `next/image` will handle further optimization at build/request time, but a pre-optimized source file still helps.

- **`/products/{slug}/`** — one folder per treatment (`tirzepatide`, `semaglutide`, `nad`, `glutathione`, `ghk-cu-face-cream`), matching the slugs in `config/treatments.ts`. All 5 approved renders are in place (1254×1254, category-color-coded backgrounds — green for Weight Loss, warm champagne/tan for Daily Wellness).
- **`/categories/weight-loss/weight-loss-lifestyle.jpg`** and **`/categories/daily-wellness/daily-wellness-lifestyle.jpg`** — approved category lifestyle stills (portrait, 736×1104 and 1080×1350 respectively). Used **as still images intentionally** — category videos were explicitly deferred by the founder; do not generate substitute category videos.
- **`/hero/onlyhuman-homepage-hero.webm`** — approved homepage hero video (VP9/Opus WebM, 2046×1080, ~21s). An H.264 MP4 fallback + poster frame, derived from this exact footage with no creative changes, are approved to be generated during Phase 2.
- **`/lifestyle/`** — general brand/lifestyle photography not tied to one specific product (used in value-prop sections, About page, etc.).

Placeholder/lower-quality drafts are fine to start — the layout and template can be built against draft imagery and swapped for final photography later with no code changes.
