# OnlyHuman — Technical Architecture

Defines the Next.js application architecture for the public marketing/content site described in the sitemap, design-system, and parity docs. This is the target architecture for Phase 2 (implementation) — no application code is written in this phase.

## 1. Stack
- **Framework:** Next.js (current stable major, App Router), TypeScript strict mode.
- **Styling:** Tailwind CSS, with a design-tokens layer (`tailwind.config.ts` theme extension) generated from `GOODLIFE-DESIGN-SYSTEM.md`'s structure (fluid type scale, proportional spacing scale, 2 category accent/tint pairs) using OnlyHuman's own values.
- **Animation:** Framer Motion for scroll-reveal (`whileInView`) and the signature CTA hover state; native CSS `scroll-behavior: smooth` / a lightweight easing wrapper for global smooth-scroll — no GSAP/Lenis dependency needed to reproduce the *effect* GLM achieves, keeping the JS bundle materially smaller (directly serves the performance requirement).
- **Content:** Typed content model (see §3) — either colocated TypeScript/MDX data files or a headless CMS (Sanity/Contentful) behind the same typed interface, decided by how often non-engineers need to edit copy post-launch (recommendation below).
- **Images:** `next/image` throughout; source assets as `.webp`/`.avif`.
- **Fonts:** `next/font/local` (or `next/font/google` if the licensed pairing is distributed via Google Fonts) — self-hosted, zero layout shift, `font-display: swap`.
- **Hosting:** Vercel, production + preview deployments per PR.
- **Analytics (later):** architecture leaves a single injection point (root layout) for a future analytics/consent script — not wired in Phase 1/2, per brief ("clean analytics integration later").

## 2. Rendering strategy
| Route type | Strategy | Why |
|---|---|---|
| Homepage, category, product, about, how-it-works, legal | **Static Generation (SSG)** at build time | Content changes infrequently; maximizes Core Web Vitals, works perfectly with CDN caching on Vercel. |
| Health Guide index & articles | **SSG** with **ISR** (`revalidate`) | New articles/edits should go live without a full redeploy if content is CMS-managed. |
| Calculators | Static shell, **client component island** for the interactive computation only | The page (copy, disclaimers, SEO content) is static/server-rendered; only the input→output widget hydrates as a small client component — avoids shipping a fully client-rendered page for what is mostly static educational content. |
| `sitemap.xml`, `robots.txt` | Generated route handlers (`app/sitemap.ts`, `app/robots.ts`) | Single source of truth from the content model, no manual maintenance. |

No route in this application needs SSR-per-request or a database round-trip at request time — everything the marketing site shows is either static content or a small client-side calculator. This keeps TTFB fast and infra simple (fully static-capable on Vercel's edge network).

## 3. Content model (the core reusable abstraction)

A typed schema drives every category and product page from the same template, which is what makes "add a 6th product" a data change, not a code change:

```ts
type Category = {
  slug: string;                 // "weight-loss"
  name: string;
  oneLiner: string;
  accentColor: string;          // token reference, not raw hex
  tintColor: string;
  heroImage: ImageAsset;
  trustClaims: string[];
  faq: FAQItem[];
  educationalClusters: { title: string; articleSlugs: string[] }[];
  productSlugs: string[];
};

type Product = {
  slug: string;                 // "tirzepatide"
  categorySlug: string;
  name: string;
  classification: "compounded-medication" | "supplement-injection" | "topical";
  oneLiner: string;
  heroImages: ImageAsset[];
  whatItIs: RichText;
  mechanism: RichText;
  benefits: string[];
  administration: RichText;
  qualitySourcing: RichText;
  faq: FAQItem[];
  relatedProductSlugs: string[];
  isiSlug: string;               // links to ImportantSafetyInfo
  fdaStatus: "not-fda-approved-as-compounded" | "fda-approved-reference-brand" | "supplement-not-fda-evaluated";
  treatmentRouteKey: string;     // key into TREATMENT_ROUTES in config/treatments.ts
};

type ImportantSafetyInfo = {
  slug: string;
  productSlug: string;
  indication: RichText;
  contraindications: RichText;
  warnings: RichText;
  sideEffects: RichText;
};

type FAQItem = { question: string; answer: RichText };
type Article = { slug: string; title: string; excerpt: string; body: RichText; readMinutes: number; categorySlug?: string; datePublished: string; dateModified: string; reviewedBy?: string };
```

`RichText` = MDX or a portable-text-style structured field, never raw unstructured HTML strings, so headings/lists stay semantic and schema-safe.

**CMS decision:** given the catalog is currently only 5 products across 2 categories, and the content that changes most often is Health Guide articles and FAQ answers (medical/legal review cycles), recommend starting with **typed local content files (MDX + TS data)** committed to the repo for products/categories/legal (infrequent, review-gated changes benefit from PR review), and evaluating a headless CMS specifically for the Health Guide **only if** non-engineers need to publish articles independently post-launch. Do not default to a CMS for everything — it adds infrastructure and a second source of truth for content that changes rarely and needs the same legal review a code change would get anyway.

## 4. Component architecture (maps directly to `GOODLIFE-PARITY-CHECKLIST.md`)

```
components/
  layout/        Header (mega-menu + mobile drawer), Footer, Breadcrumbs
  sections/      Hero, TrustClaimStrip, ValuePropGrid, HowItWorks, TestimonialSection,
                 HealthGuidePreview, FAQAccordion, CategoryProductRail
  product/       ProductCard, ProductHero, MechanismSection, QualitySourcingSection,
                 RelatedProducts, ImportantSafetyInfoBlock
  ui/            Button (primary/secondary/signature-hover variants), Badge, Accordion
                 (native <button aria-expanded>, CSS grid-rows animation), Container
  calculators/   BmiCalculator, CalorieDeficitCalculator (client components)
```

`Accordion` and `Button` are the two primitives reused across the entire site (FAQ, mobile nav, product sections; every CTA), matching the parity checklist's "one primitive, reused everywhere" principle — build these first and get them fully accessible before building anything that consumes them.

**CTA resolution:** no component resolves a telehealth or portal URL itself. `Button`'s CTA variants accept a `treatmentSlug` (or nothing, for the portal-login link) and resolve the actual destination by looking it up in `config/treatments.ts` (`TREATMENT_ROUTES`, `PORTAL_LOGIN_URL`) at render time. While a route's `telehealthUrlConfigured` is `false` (the shipped default), the CTA renders a visibly-disabled/"Coming soon" state rather than linking to `null` — this is what lets every product/category page be built and reviewed in full before a single real intake URL exists.

## 5. Accessibility (build-time requirements, not a post-hoc audit)
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>` in every layout.
- Accordion: real `<button aria-expanded aria-controls>` + `id`d panel, keyboard-operable (Enter/Space), visible focus ring (not suppressed).
- All interactive elements reachable and operable by keyboard alone; logical tab order (mega-menu and mobile drawer both need explicit focus-trap/return-focus handling).
- Color contrast: verify OnlyHuman's chosen palette meets WCAG AA for body text against its background at the design-token stage, before component build.
- All meaningful images have descriptive `alt`; decorative images `alt=""`.
- Form-adjacent elements (newsletter signup, calculators) have associated `<label>`s, not placeholder-only labeling.

## 6. Performance budget
- Lighthouse targets: Performance ≥ 95, Accessibility ≥ 95, SEO = 100 on all key templates (home, category, product).
- No client-side framework for anything that can be server-rendered; calculators are the only intentional client islands.
- Fonts self-hosted, subset if possible, `font-display: swap`, preloaded for the primary heading/body faces only.
- Images: `next/image` with explicit `width`/`height` (or `fill` inside a sized container) to eliminate layout shift; responsive `sizes` per breakpoint.
- No third-party scripts on the critical path beyond what's genuinely necessary (a real review widget and a real compliance seal, if/when OnlyHuman has both, loaded `defer`/`async` and ideally facade-loaded rather than eagerly).
- Animation implemented with Framer Motion (which tree-shakes) or plain CSS — no jQuery-class dependency, no full GSAP suite for the smaller effect set this site needs.

## 7. Environment/config
```
NEXT_PUBLIC_SITE_URL=              # canonical production URL, used for metadata/sitemap
```
Per-treatment telehealth intake URLs and the patient-portal login URL are **not** environment variables — they live in `config/treatments.ts` (see that file and §4 above) so each of the 5 treatments can carry its own distinct destination from one reviewable, version-controlled location, rather than one shared base URL. No secrets, no database credentials, no payment keys — this app never talks to the intake/prescription/fulfillment backend directly; it only links to it.

## 8. Repository layout (proposed)
```
app/
  (marketing)/
    page.tsx                          → /
    weight-loss/page.tsx               → /weight-loss
    weight-loss/[product]/page.tsx     → /weight-loss/tirzepatide etc.
    daily-wellness/page.tsx
    daily-wellness/[product]/page.tsx
    about/page.tsx
    how-it-works/page.tsx
    health-guide/page.tsx
    health-guide/[slug]/page.tsx
    important-safety-information/[slug]/page.tsx
    help-center/page.tsx
    privacy-policy/page.tsx
    terms-and-conditions/page.tsx
    telehealth-consent/page.tsx
    shipping-policy/page.tsx
    return-policy/page.tsx
    tools/bmi-calculator/page.tsx
    tools/calorie-deficit-calculator/page.tsx
  sitemap.ts
  robots.ts
  layout.tsx
content/            # typed data + MDX per §3
components/         # per §4
lib/                # schema builders (JSON-LD), formatting helpers, content loaders
config/             # treatments.ts — centralized treatment/telehealth routing (already scaffolded)
public/             # brand assets, images, fonts (already scaffolded — see public/*/README.md)
```

This directly satisfies the sitemap's route table, keeps category/product pages on shared dynamic segments (`[product]`) backed by the typed content model, and gives every route a natural place to hang its own `generateMetadata`/JSON-LD per `ONLYHUMAN-SEO-GEO-PLAN.md`.
