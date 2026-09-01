# OnlyHuman — Sitemap & Page Architecture

Derived from `GOODLIFE-SITEMAP.md` and `GOODLIFE-PARITY-CHECKLIST.md`, scaled to OnlyHuman's current catalog (2 categories, 5 products) while keeping every template general enough to absorb future categories/products without restructuring. Routes are Next.js App Router paths (`app/`) relative to the production domain.

## 1. Domain map
| Domain | Purpose |
|---|---|
| `onlyhuman.com` (or confirmed production domain) | This project — the public marketing/content site |
| External OnlyHuman telehealth app (intake) | Existing system — out of scope. Every conversion CTA is a plain outbound link into it. |
| External OnlyHuman patient portal (account/login) | Existing system — out of scope. Header carries a persistent login link to it. |

**CTA contract (non-negotiable):** every "Get Started" / "Start My Visit" button on this site is `<a href="{TELEHEALTH_BASE_URL}/start/{treatment-slug}">`, config-driven from an environment variable, never a client-side form. Header "Log In" is `<a href="{PORTAL_BASE_URL}/login">`. Both base URLs are the two integration points this whole project has with the real backend.

## 2. Top-level navigation
```
Home  (/)
├── Weight Loss                 (/weight-loss)
│     ├── Compounded Tirzepatide   (/weight-loss/tirzepatide)
│     └── Compounded Semaglutide   (/weight-loss/semaglutide)
├── Daily Wellness               (/daily-wellness)
│     ├── NAD+                      (/daily-wellness/nad)
│     ├── Glutathione               (/daily-wellness/glutathione)
│     └── GHK-Cu Face Cream         (/daily-wellness/ghk-cu-face-cream)
├── How It Works                 (/how-it-works)
├── About                        (/about)
├── Health Guide                 (/health-guide)
└── [Log In]  (utility link → external portal)
```

Desktop: mega-menu per category (product tiles + "View {Category}" link), matching GLM's structure at a 2-category scale. Mobile: hamburger drawer, categories as accordion disclosures.

## 3. Full route table

### 3.1 Home
- `/` — homepage

### 3.2 Category pages — 2
- `/weight-loss`
- `/daily-wellness`

Route segment used as the canonical category slug everywhere (product URLs, breadcrumbs, structured data).

### 3.3 Product pages — 5, nested under category: `/{category}/{product-slug}`
| Category | Product | Slug |
|---|---|---|
| Weight Loss | Compounded Tirzepatide | `/weight-loss/tirzepatide` |
| Weight Loss | Compounded Semaglutide | `/weight-loss/semaglutide` |
| Daily Wellness | NAD+ | `/daily-wellness/nad` |
| Daily Wellness | Glutathione | `/daily-wellness/glutathione` |
| Daily Wellness | GHK-Cu Face Cream | `/daily-wellness/ghk-cu-face-cream` |

Nesting under category (rather than GLM's flat `/products/{slug}`) is a deliberate improvement: at 5 products this keeps the URL self-descriptive and the breadcrumb trail (`Home / Weight Loss / Compounded Tirzepatide`) meaningful without needing a separate category lookup — still a single, fully data-driven template shared by all 5 pages (see architecture doc §3).

### 3.4 Important Safety Information — one per product
- `/important-safety-information/tirzepatide`
- `/important-safety-information/semaglutide`
- `/important-safety-information/nad`
- `/important-safety-information/glutathione`
- `/important-safety-information/ghk-cu-face-cream`

Flat (not nested under category) to mirror GLM's decoupling of compliance slug from product slug — future-proofs against a product's marketing name changing while its clinical-safety content persists.

### 3.5 Company / philosophy
- `/about` — OnlyHuman's mission and "Your body is not your identity. Your body is your stewardship." philosophy, provider/pharmacy sourcing story, care model explanation. This is the standalone page GLM notably lacks (GLM folds this into a homepage FAQ answer) — OnlyHuman should have both: the full page **and** a short FAQ-format summary on the homepage, since the philosophy is the brand's central differentiator and deserves its own indexable, linkable, GEO-citable URL.
- `/how-it-works` — the 3-step process (Questionnaire → Provider Review → Approved & Delivered) as its own standalone, deep-linkable page in addition to being a homepage section — useful for GEO/citation and for reducing homepage length.

### 3.6 Content hub
- `/health-guide` — article index, filterable by category
- `/health-guide/{article-slug}` — individual articles

(`/health-guide/{slug}` chosen over GLM's `/post/{slug}` for clearer information architecture and stronger topical URL signal for SEO/GEO.)

### 3.7 Tools (Weight Loss only, at launch)
- `/tools/bmi-calculator`
- `/tools/calorie-deficit-calculator`
- Additional calculators (TDEE, protein, water-intake) may follow the same `/tools/{slug}` pattern if/when content strategy calls for them; not required for launch parity.

### 3.8 Support & legal
- `/help-center` — categorized self-serve support (About/eligibility, Account, Medical care, Orders & shipping, Payments, Privacy/security, Refunds/cancellations)
- `/shipping-policy`
- `/return-policy`
- `/privacy-policy`
- `/terms-and-conditions`
- `/telehealth-consent`

### 3.9 System routes (not in nav)
- `/sitemap.xml` — generated (see technical architecture)
- `/robots.txt` — static
- `/opengraph-image` (per key route, via Next.js metadata file convention) — optional but recommended for share-card consistency

## 4. Growth path (explicitly designed for, not built now)
The category/product nesting, the compliance-slug decoupling, and the single data-driven product template are all chosen so that adding a 3rd category or a 6th product is a **content/data change**, not a new template or route restructuring. `ONLYHUMAN-TECHNICAL-ARCHITECTURE.md` §3 defines the content model this depends on.
