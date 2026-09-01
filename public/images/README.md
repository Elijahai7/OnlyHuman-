# /public/images

Photography and product renders. Use descriptive, hyphenated filenames (e.g. `compounded-tirzepatide-vial-front.webp`, not `IMG_0234.jpg`) — filenames feed directly into the SEO image-naming requirement in `ONLYHUMAN-SEO-GEO-PLAN.md`. Prefer `.webp` or `.avif`; `next/image` will handle further optimization at build/request time, but a pre-optimized source file still helps.

- **`/products/{slug}/`** — one folder per treatment (`tirzepatide`, `semaglutide`, `nad`, `glutathione`, `ghk-cu-face-cream`), matching the slugs in `config/treatments.ts`. Put at minimum one clean hero/product shot per treatment here to unblock building the product page template against real aspect ratios; additional angles/lifestyle shots can follow later.
- **`/categories/weight-loss/`** and **`/categories/daily-wellness/`** — hero/lifestyle imagery for the two category landing pages.
- **`/hero/`** — homepage hero imagery (desktop + a separate mobile-cropped version, matching the reference site's pattern of a distinct mobile hero asset rather than one image scaled down).
- **`/lifestyle/`** — general brand/lifestyle photography not tied to one specific product (used in value-prop sections, About page, etc.).

Placeholder/lower-quality drafts are fine to start — the layout and template can be built against draft imagery and swapped for final photography later with no code changes.
