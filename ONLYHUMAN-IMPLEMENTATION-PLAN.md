# OnlyHuman — Implementation Plan

This is the Phase 2+ execution plan. **Phase 1 (this discovery/architecture pass) is complete as of this document.** No application code should be written until this plan is reviewed/approved, per the brief's explicit instruction.

Reference documents this plan sequences work against:
`GOODLIFE-SITEMAP.md` · `GOODLIFE-DESIGN-SYSTEM.md` · `GOODLIFE-INTERACTION-AUDIT.md` · `GOODLIFE-PARITY-CHECKLIST.md` · `ONLYHUMAN-SITEMAP.md` · `ONLYHUMAN-SEO-GEO-PLAN.md` · `ONLYHUMAN-TECHNICAL-ARCHITECTURE.md`

## 0. Pre-build blockers (must be resolved before Phase 2 starts)

These are inputs only OnlyHuman/the user can supply — implementation cannot faithfully proceed without them:

1. **Brand assets:** logo (SVG), color palette (or license to derive OnlyHuman's 2 category accent/tint pairs from an existing brand guide), licensed typefaces (a warm humanist sans + a mono/condensed label face, per `GOODLIFE-DESIGN-SYSTEM.md` §6).
2. **Photography/product renders:** hero imagery, product packaging shots, category imagery — real OnlyHuman assets, not stock or GLM-adjacent.
3. **Integration URLs:** the real `NEXT_PUBLIC_TELEHEALTH_BASE_URL` and `NEXT_PUBLIC_PORTAL_BASE_URL` values (or confirmation of their slug/path convention) from the existing telehealth backend team.
4. **Medical/legal content sourcing:** who reviews and approves product mechanism copy, efficacy claims, FDA-status statements, and the 5 ISI pages before publish — this is a named person/process, not a Claude Code task.
5. **Domain & hosting:** confirmed production domain for `NEXT_PUBLIC_SITE_URL`/canonical metadata, and Vercel project/team access.
6. **Legal text:** actual Privacy Policy, Terms & Conditions, Telehealth Consent, Shipping/Return Policy content (or confirmation these will be supplied by counsel during the build, not authored by the agent).
7. **Trust signals:** confirmation of what's genuinely true today — does OnlyHuman have a Trustpilot presence, a pharmacy accreditation seal, real testimonials with consent to publish? Per the parity checklist and SEO/GEO plan's misuse guardrails, none of these are fabricated; sections requiring them either wait or ship without that specific element until it's real.

## 1. Phased build sequence

### Phase 2 — Foundation
- Next.js + TypeScript + Tailwind scaffold; repo layout per `ONLYHUMAN-TECHNICAL-ARCHITECTURE.md` §8.
- Design tokens implemented in Tailwind config from `GOODLIFE-DESIGN-SYSTEM.md`'s structure, populated with OnlyHuman's real values (blocked on §0.1).
- Core primitives built and accessibility-verified first: `Button` (all variants), `Accordion`, `Container`, `Badge`.
- `Header`/`Footer`/`Breadcrumbs` layout shell, both breakpoints, mega-menu + mobile drawer behavior.
- Content model types (`Category`, `Product`, `ImportantSafetyInfo`, `FAQItem`, `Article`) implemented per §3 of the architecture doc, with 1 placeholder category/product to validate the template end-to-end before writing all 5.

**Acceptance:** header/footer/nav fully keyboard-navigable and screen-reader sane; primitives pass an accessibility pass; one full product page renders from real typed content, not hardcoded JSX.

### Phase 3 — Core pages
- Homepage (all sections per parity checklist §2).
- 2 category pages (Weight Loss, Daily Wellness).
- 5 product pages (Tirzepatide, Semaglutide, NAD+, Glutathione, GHK-Cu Face Cream).
- 5 Important Safety Information pages.
- `/about`, `/how-it-works`.

**Acceptance:** every page in `ONLYHUMAN-SITEMAP.md` §3.1–3.5 live; every product page's copy has passed the medical/legal reviewer named in §0.4; every CTA verified to link to the real telehealth base URL with the correct treatment slug (manually click-tested against staging intake, not just visually reviewed).

### Phase 4 — Content hub & tools
- `/health-guide` index + article template; minimum viable article set covering the FAQ-adjacent long-tail per `ONLYHUMAN-SEO-GEO-PLAN.md` §5 (start with articles that directly support each product's FAQ claims, not a large speculative content backlog).
- BMI and calorie-deficit calculators as client-island pages.

**Acceptance:** articles internally link to/from the relevant product and category pages (no orphans); calculators functionally correct and carry the same eligibility disclaimer language pattern as GLM's (§4 parity checklist), phrased as OnlyHuman's own.

### Phase 5 — Support & legal
- `/help-center`, `/shipping-policy`, `/return-policy`, `/privacy-policy`, `/terms-and-conditions`, `/telehealth-consent`.

**Acceptance:** all legal copy sourced from counsel (§0.6), not authored by the agent; help-center categories match the taxonomy in the parity checklist §7.

### Phase 6 — SEO/GEO instrumentation
- `generateMetadata` per route type per `ONLYHUMAN-SEO-GEO-PLAN.md` §2.
- JSON-LD per route per §3, each block validated against Google's Rich Results Test.
- `app/sitemap.ts`, `app/robots.ts`.
- FAQ content audit against §4's 10-question checklist per category/product.

**Acceptance:** zero structured-data errors/warnings on every templated route; sitemap includes every live route and excludes none; Lighthouse SEO = 100 on home/category/product templates.

### Phase 7 — Performance, accessibility, and QA pass
- Lighthouse pass against the budget in the architecture doc §6 on all key templates, both mobile and desktop throttling profiles.
- Full keyboard-navigation pass site-wide.
- Cross-browser/responsive QA at the four breakpoints identified in the design system (≥992 / 991 / 767 / 479).
- Broken-link and outbound-CTA audit (every telehealth/portal link resolves correctly).

**Acceptance:** Lighthouse Performance/Accessibility ≥ 95, SEO = 100 on home/category/product; zero broken internal links; zero console errors.

### Phase 8 — Launch
- Production deploy to Vercel, custom domain, canonical URLs finalized.
- Final legal/medical sign-off recorded per page (§0.4/§0.6 owners).
- Post-launch: connect the analytics injection point left open in the architecture doc, once an analytics/consent decision is made (explicitly deferred, per brief).

## 2. Explicit non-goals (repeat of parity checklist §10, kept here as a build-time guardrail)
This project will not, at any phase, implement: a medical intake questionnaire, provider-review/approval logic, a patient account or portal, order/shipment tracking, or payment collection. Any such requirement discovered mid-build is a signal to link out to the existing backend, not to build it here.

## 3. Definition of done (whole-project)
The OnlyHuman site is done when: every route in `ONLYHUMAN-SITEMAP.md` is live and passes its phase's acceptance criteria above, every visual/interaction item in `GOODLIFE-PARITY-CHECKLIST.md` is checked (with `[BRAND]` items verified as OnlyHuman's own, not GLM's), every `ONLYHUMAN-SEO-GEO-PLAN.md` requirement is instrumented and validated, and the Phase 7 performance/accessibility bar is met — at which point the site is ready to serve as OnlyHuman's premium public-facing frontend in front of the existing telehealth backend.
