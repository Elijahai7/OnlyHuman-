# Good Life Meds — Sitemap & Page Inventory

Source: live audit of `www.goodlifemeds.com`, September 2026 (desktop + mobile rendering, HTML structure, and link graph). Good Life Meds ("GLM") is built on Webflow (asset paths under `cdn.prod.website-files.com`), with a separate patient-facing application at `app.goodlifemeds.com` (intake) and `portal.goodlifemeds.com` (account/login).

This document is a factual record of GLM's architecture. It is the reference for `ONLYHUMAN-SITEMAP.md`, which adapts (not copies) this structure to OnlyHuman's smaller catalog.

## 1. Domain map

| Domain | Purpose |
|---|---|
| `www.goodlifemeds.com` | Marketing/content site (what we are cloning the architecture of) |
| `app.goodlifemeds.com` | Telehealth intake ("start-online-visit") — out of scope, external system |
| `portal.goodlifemeds.com` | Patient account / login portal — out of scope, external system |

Every primary and secondary CTA on the marketing site (`Get started`, `Buy now`) exits to `app.goodlifemeds.com/start-online-visit/{treatment-slug}?promo={CODE}&promo-source=coupon`. `Member Login` in the header exits to `portal.goodlifemeds.com/login`. **This is the exact pattern OnlyHuman will replicate**: the public site never implements intake; every conversion CTA is an outbound link to the existing OnlyHuman telehealth flow with a treatment-slug parameter.

## 2. Top-level navigation (desktop mega menu)

```
Home
├── Weight Loss            (mega menu: Medication / Name Brand columns)
├── Daily Wellness         (mega menu: Daily Performance / Longevity columns)
├── Sexual Health          (mega menu: For Men / For Women columns)
├── Hair                   (mega menu: For Men / For Women columns)
└── [Member Login]  (utility link, top-right, routes to portal subdomain)
```

Each mega-menu column ends in a "View {Category}" link to the category page. Mobile collapses this into an accordion-style hamburger drawer (category → subcategory disclosure, no separate mobile-only IA).

## 3. Full page inventory

### 3.1 Home
- `/` — homepage

### 3.2 Category (hub) pages — 4 total
- `/weight-loss`
- `/daily-wellness`
- `/sexual-health`
- `/hair`

Each category hub is a horizontally-scrolling product-card rail on the homepage AND a full standalone landing page with its own hero, trust badges, product grid, educational content, calculators (weight-loss specific), testimonials, and category-specific FAQ.

### 3.3 Product/treatment pages — 29 total, pattern `/products/{slug}`
**Weight Loss (8):** `tirzepatide`, `semaglutide`, `oral-semaglutide`, `microdose-glp-1`, `wegovy-pill`, `wegovy`, `ozempic`, `zepbound`, `mounjaro`

**Daily Wellness (8):** `nad`, `nad-nasal-spray`, `mic-b12`, `vitamin-b12`, `glutathione`, `slim-shot`, `sermorelin`

**Sexual Health (6):** `ed-mints` *(non-standard path, not under /products/)*, `ignite-strips`, `tidalafil-generic-cialis`, `generic-viagra`, `bliss-strips`

**Hair (4):** `hair-regrowth-for-men`, `hair-regrowth-for-women`, `oral-minoxidil`, `finasteride-generic-propecia`

Every product page is a single self-contained template (see `GOODLIFE-PARITY-CHECKLIST.md` §2) — no variant pages per dosage; dosage/plan is chosen inside the external intake flow.

### 3.4 Compliance pages — pattern `/important-safety-information/{slug}`
One per prescription medication (confirmed: `tirzepatide`, `compounded-semaglutide`, `wegovy-pill`, `wegovy`, `ozempic`, `zepbound-r`, `mounjaro`, `nad-injections`, `microdose-glp-1`, `lipotropic-mic-b12-injection`, `sermorelin`, `glutathione`, `lipo-mic-b12-l-carnitine`, `vitamin-b12`, `nad-nasal-spray`). These are plain-text clinical-safety documents, linked from every relevant product card and product page, never from primary nav — they exist purely for compliance and are indexable but not promoted.

### 3.5 Content hub
- `/health-guide` — blog/article index, filterable by category
- `/post/{article-slug}` — individual articles (25+ identified; organized editorially into "General," "Quality & Safety," and "Nutrition & Health" clusters per category page)

### 3.6 Tools
- `/bmi-calculator`
- `/tdee-calculator`
- `/protein-calculator`
- `/water-intake-calculator`
- `/calorie-deficit-calculator`

Interactive, client-side calculators surfaced as their own indexable pages and re-embedded as a card rail on `/weight-loss`.

### 3.7 Support & policy
- `/help-center` — categorized self-serve support (About, My Account, Medical Care, Orders & Shipping, Payments & Insurance, Privacy & Security, Refunds/Cancellations)
- `/return-policy`
- `/shipping-policy`
- `/privacy-policy`
- `/terms-and-conditions`
- `/telehealth-consent`

### 3.8 Not found / not confirmed live
`/about`, `/compounded-semaglutide` (bare, non-`/products/` path), and a dedicated `/sitemap.xml` all returned 404 during the audit — GLM's About/company narrative appears to live inside the homepage FAQ ("Who is Good Life Meds?") rather than a standalone page, and the sitemap may be served from a non-standard path or blocked to bots at the edge.

## 4. URL & routing conventions to carry forward
- Category slugs are bare top-level segments (`/weight-loss`), not nested (`/treatments/weight-loss`).
- Product slugs are namespaced under `/products/{slug}` — one exception (`/ed-mints`) shows the template tolerates flat slugs too, but `/products/` is the dominant, intentional convention.
- Compliance pages are namespaced under `/important-safety-information/{slug}`, decoupled from the product slug (drug names sometimes differ, e.g. `zepbound-r`).
- Blog posts live under `/post/{slug}`, full descriptive slugs (SEO-friendly, no dates, no IDs).
- Calculators are flat top-level routes, each a first-class indexable page, not query-param modes of one page.
- No locale, no trailing slash inconsistency, no query-string pagination observed on indexable content pages.
