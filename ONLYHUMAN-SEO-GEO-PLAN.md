# OnlyHuman — SEO & GEO (Generative Search) Plan

Covers classic SEO (title/meta/schema/sitemap/internal linking/Core Web Vitals) and GEO — structuring content so AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Claude, etc.) can accurately extract, cite, and represent what OnlyHuman is and what its treatments do. Maps directly onto the route table in `ONLYHUMAN-SITEMAP.md`.

## 1. Entity clarity — what every AI system and search engine must be able to state correctly

A short, unambiguous, machine-extractable definition must exist in HTML text (not just design copy) for each of these, ideally as a single declarative sentence near the top of the relevant page, then expanded:

- **OnlyHuman** — a telehealth platform connecting patients with licensed providers for prescription weight-loss and daily-wellness/longevity treatment, built around the philosophy "Your body is not your identity. Your body is your stewardship." (`/about`, homepage)
- **Compounded Tirzepatide** — a compounded GLP-1/GIP receptor agonist medication for prescription weight management, prepared by a licensed pharmacy per individual prescription. (`/weight-loss/tirzepatide`)
- **Compounded Semaglutide** — a compounded GLP-1 receptor agonist medication for prescription weight management. (`/weight-loss/semaglutide`)
- **NAD+** — a coenzyme naturally present in every human cell, supplemented via prescription injection/protocol to support cellular energy metabolism and support healthy aging. (`/daily-wellness/nad`)
- **Glutathione** — an antioxidant compound supplemented via prescription injection/protocol to support the body's detoxification and immune processes. (`/daily-wellness/glutathione`)
- **GHK-Cu Face Cream** — a copper-peptide topical formulation used to support skin appearance and skin health. (`/daily-wellness/ghk-cu-face-cream`)

Rule: every product page states, in plain sentences within the first two paragraphs, (1) what the substance is, (2) what category it belongs to, (3) how it's typically administered, (4) that it requires a licensed-provider prescription/evaluation. This satisfies both a first-time human visitor and an LLM crawling for a factual answer — no vague marketing copy standing in for the factual definition.

## 2. Metadata strategy (per route type)

Using Next.js `generateMetadata` per route, driven by the same content model as the page body (single source of truth — metadata must never drift from on-page claims).

| Route type | Title pattern | Meta description pattern |
|---|---|---|
| Homepage | `OnlyHuman \| Prescription Weight Loss & Daily Wellness, 100% Online` | One sentence stating what OnlyHuman is, who it serves, and the core CTA, ≤155 chars. |
| Category | `{Category} Treatments Online \| OnlyHuman` | States the category's purpose and lists 1–2 representative treatments. |
| Product | `{Product Name} — {One-line indication} \| OnlyHuman` | States what it is, what it's for, and "licensed provider required" — factual, not hype. |
| ISI page | `Important Safety Information: {Product Name} \| OnlyHuman` | Neutral, compliance-toned description. |
| Article | `{Article Title} \| OnlyHuman Health Guide` | Descriptive summary of the specific question the article answers. |
| Legal | `{Policy Name} \| OnlyHuman` | Effective-date-aware, one line. |

Every page: canonical URL (self-referencing, no trailing-slash inconsistency), Open Graph (`og:title`, `og:description`, `og:image` — a real, page-relevant image, not one shared default across the whole site for product/article pages), Twitter card (`summary_large_image`), `theme-color` matching the OnlyHuman brand.

## 3. Structured data (JSON-LD) — per route, and only where accurate

| Route | Schema | Notes |
|---|---|---|
| All pages (layout-level) | `Organization` | Name, logo, URL, sameAs (real social profiles only), contact point. |
| Homepage | `WebSite` (+ `SearchAction` only if an actual on-site search exists) | |
| All non-home pages | `BreadcrumbList` | Matches the visible breadcrumb trail exactly. |
| Category & product pages | `MedicalWebPage` (schema.org medical extension) as the page-level type, `about` referencing a `Drug` or `DietarySupplement`/`MedicalTherapy` node as appropriate to how the product is legally classified | Use `Drug` only for the prescription GLP-1 medications with `nonProprietaryName`, `administrationRoute`, `prescriptionStatus: "PrescriptionOnly"`. Do NOT use `Product`/`Offer` schema with pricing for prescription medications on a page that has no cart/checkout — that misrepresents the page as transactional e-commerce, which the site is not (see §7, misuse guardrails). |
| Product FAQ sections | `FAQPage`, one `Question`/`acceptedAnswer` pair per visibly-rendered accordion item | Only mark up Q&As that are genuinely rendered as visible text on that page — never mark up hidden/decorative content as FAQPage (a Google spam-policy violation). |
| Health Guide index | `CollectionPage` | |
| Individual articles | `Article` (or `MedicalWebPage` if the article is clinical-explainer content reviewed by a medical professional — prefer this when true) | Include `author`, `datePublished`, `dateModified`, and — critically for medical content — a `reviewedBy`/`author` credential once OnlyHuman's actual medical review process exists. Do not claim medical review that didn't happen. |
| `/about` | `AboutPage` | |
| ISI pages | No FAQPage/Product schema — plain `WebPage`/`MedicalWebPage`, this content is compliance text, not marketing. |

**Validation gate:** every schema block must pass Google's Rich Results Test and represent only what's genuinely visible/true on that exact page before it ships — this is a checklist item in the implementation plan, not an afterthought.

## 4. FAQ content strategy (the core GEO surface)

FAQ accordions are the single highest-leverage GEO asset: they are naturally phrased as real user questions, naturally chunked into self-contained answerable units, and naturally marked up as `FAQPage`. Each category and product page gets 6–10 questions covering, at minimum:

1. What is {treatment}? (definition, drug class/category)
2. How does {treatment} work? (mechanism, plain-language)
3. Who is {treatment} for? / Am I a candidate?
4. How is {treatment} administered / how often?
5. What results can I expect, and in what timeframe? (only with a sourced, approved claim — see §6 accuracy gate)
6. What are the risks / most common side effects? (links to full ISI page, does not replace it)
7. Is it FDA-approved? (answer honestly per product — compounded medications are not FDA-approved as compounded preparations; state this plainly, the same way GLM does)
8. How much does it cost / is insurance required?
9. How do I get started / what does the online visit involve?
10. (Homepage/about only) Who is OnlyHuman, and what is the "stewardship" philosophy?

Write every answer as a **complete, self-contained, factual paragraph** that would read correctly if lifted out of context and quoted by an AI answer engine — this is the practical definition of "easy to cite, easy to extract" from the brief. Avoid answers that only make sense in the surrounding page context (e.g., "Yes, as mentioned above…").

## 5. Content architecture for topical authority

- **Category pages** are the topical hub: they must explain the *class* of treatment (what a GLP-1 is; what NAD+ is) independent of any single branded product, then link down to each product page. This lets a category page rank/be-cited for broad informational queries ("how do weight loss injections work") while product pages own branded/specific queries ("compounded tirzepatide OnlyHuman").
- **Health Guide articles** exist to answer the long tail (dosage questions, comparisons, safety nuance, lifestyle-adjacent questions) and internally link back to the relevant product/category page — this is the same content-marketing structure GLM runs (see `GOODLIFE-SITEMAP.md` §3.5), scaled to OnlyHuman's smaller catalog with a strict editorial standard: **every clinical claim in an article is sourced**, and articles about a specific product cross-link to that product's ISI page.
- **Internal linking rule:** every product page links to (a) its category page, (b) its ISI page, (c) at least one relevant Health Guide article, (d) at least one other product in the same category ("You might also consider…"). Every article links back to at least one product/category page. No orphaned pages.
- **Breadcrumbs** rendered as visible UI + `BreadcrumbList` schema on every non-home page: `Home / {Category} / {Product}`.

## 6. Medical/factual accuracy gate (SEO and GEO both depend on this)

Because this is regulated health content, SEO/GEO strength and compliance are the same requirement, not competing ones — inaccurate or unsubstantiated claims are both a legal liability and the fastest way to get an AI system to misrepresent OnlyHuman. Before any product/category/article copy ships:
1. Every efficacy or statistical claim has a real, checkable source (clinical literature, FDA labeling for the reference brand, or OnlyHuman's own aggregated outcome data if and when it exists) — never inherited from GLM's copy.
2. Every "FDA-approved" / "not FDA-approved" statement is accurate to that specific product's actual regulatory status.
3. Copy avoids vague superlatives ("the best," "miracle") in favor of specific, factual mechanism/benefit language — this serves GEO extractability and regulatory safety simultaneously.
4. A named medical/legal reviewer signs off per page before publish (tracked in the implementation plan as a launch gate, not a nice-to-have).

## 7. Technical SEO baseline
- `sitemap.xml` generated from the route table (Next.js `app/sitemap.ts`), auto-including new products/articles as content is added.
- `robots.txt` allowing all marketing routes, explicitly disallowing nothing on this site (no admin/app routes live here — those are on the external subdomains).
- One `<h1>` per page, logical `h2`/`h3` nesting (enforced by the shared page templates, not left to per-page authoring discretion).
- Descriptive, hyphenated, keyword-relevant URLs (already enforced by the sitemap's slug design).
- Image filenames and `alt` text describe the actual content (`compounded-tirzepatide-vial.webp`, not `IMG_0234.jpg`), generated/reviewed per the CMS/content workflow in the technical architecture doc.
- Core Web Vitals: enforced by the rendering strategy in `ONLYHUMAN-TECHNICAL-ARCHITECTURE.md` (static generation, `next/image`, `next/font`, minimal client JS) — SEO score and GEO extractability both benefit from content being present in initial server-rendered HTML rather than injected client-side after hydration.

## 8. Misuse guardrails (what we will NOT do)
- No `Product`/`Offer`/price schema on pages with no purchase transaction on this domain.
- No `FAQPage` markup on collapsed/hidden decorative content.
- No `Review`/`AggregateRating` schema without a real, verifiable review source.
- No borrowed or fabricated clinical statistics.
- No claiming medical review/authorship that didn't occur.
