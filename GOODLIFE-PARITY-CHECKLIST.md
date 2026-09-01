# Good Life Meds → OnlyHuman Parity Checklist

Purpose: a single checkable list, derived from `GOODLIFE-SITEMAP.md`, `GOODLIFE-DESIGN-SYSTEM.md`, and `GOODLIFE-INTERACTION-AUDIT.md`, of every pattern the OnlyHuman build must reproduce to hit "extremely close in quality, structurally," while swapping all GLM-proprietary content/assets for OnlyHuman's own. Use this as the Phase 2 build's acceptance checklist — check items off against the live OnlyHuman site, not against a mock.

Legend: **[STRUCTURE]** = layout/IA/behavior to copy exactly · **[BRAND]** = must be OnlyHuman's own, never GLM's · **[ADAPT]** = same pattern, OnlyHuman-appropriate content/scale.

## 1. Navigation & header
- [ ] **[STRUCTURE]** Sticky header, translucent/blurred glass panel, inset from viewport edge with small radius (not a flush opaque bar).
- [ ] **[STRUCTURE]** Desktop mega-menu per category: multi-column dropdown, product-image tile inside the dropdown panel, "View {Category}" link at the bottom of each menu.
- [ ] **[ADAPT]** Category count = 2 (Weight Loss; Daily Wellness) not 4 — menu should not feel sparse at 2 columns; consider a single unified dropdown per category listing its products directly rather than forcing a second sub-column that doesn't exist in OnlyHuman's catalog.
- [ ] **[STRUCTURE]** Mobile: hamburger → full drawer, categories as accordion disclosures reusing the same accordion primitive as the FAQ.
- [ ] **[BRAND]** OnlyHuman logo, wordmark, favicon — never GLM's.
- [ ] **[STRUCTURE]** Persistent utility link in header for the external telehealth portal login (OnlyHuman's equivalent of "Member Login"), visible at every breakpoint, never buried in the drawer.

## 2. Homepage
- [ ] **[STRUCTURE]** Hero: headline + subheadline + trust-claim strip (icons/text row: e.g. "100% online," "Licensed providers," "Discreet delivery," "Transparent pricing") + primary/secondary CTA pair.
- [ ] **[ADAPT]** Category rails: horizontal, momentum-drag product-card carousel per category (2 rails: Weight Loss, Daily Wellness/Longevity) instead of GLM's 4.
- [ ] **[STRUCTURE]** 4-column value-proposition icon+text grid (trust/quality/delivery/safety framing) — reproduce the layout, write OnlyHuman-specific copy grounded in its actual philosophy and fulfillment model.
- [ ] **[STRUCTURE]** "How It Works" 3-step section (Questionnaire → Provider Review → Approved & Delivered), scroll-revealed, full-width supporting illustration with a distinct mobile asset.
- [ ] **[STRUCTURE]** Social proof section: real third-party review widget (Trustpilot or equivalent, only once OnlyHuman actually has one — do not fabricate reviews) + curated testimonial quotes, clearly real and attributable, not invented.
- [ ] **[STRUCTURE]** Editorial/content hub preview grid (health-guide-equivalent) surfacing 4–5 featured articles with read-time.
- [ ] **[STRUCTURE]** Homepage FAQ block (4–6 questions) including an explicit "Who is OnlyHuman?" entry — this is where the brief's philosophy statement ("Your body is not your identity. Your body is your stewardship.") belongs, mirroring how GLM answers "Who is Good Life Meds?" in its own FAQ.
- [ ] **[BRAND]** All photography, product renders, and packaging — OnlyHuman's own; no GLM or stock lifestyle imagery implying a different brand.

## 3. Category (hub) pages — one per category, 2 total
- [ ] **[STRUCTURE]** H1 + subheadline + trust-claim strip repeated from homepage hero pattern.
- [ ] **[STRUCTURE]** Full product grid for that category (not just the homepage preview rail).
- [ ] **[STRUCTURE]** Category-specific educational article clusters (e.g., "General," "Quality & Safety," "Practical/Lifestyle" groupings) — port the *organization*, populate with OnlyHuman-authored, medically accurate content.
- [ ] **[ADAPT]** Weight-loss calculators (BMI, TDEE, calorie-deficit, protein, water-intake) — genuinely useful, low-legal-risk, SEO-friendly; build for the Weight Loss category. Not applicable to Daily Wellness in the same form — consider a simpler dosage/usage-frequency helper or skip rather than forcing an equivalent that doesn't fit.
- [ ] **[STRUCTURE]** Category FAQ accordion (6–8 questions), written to explain the mechanism (e.g., how GLP-1s work) in plain factual language — this doc's GEO plan treats this as primary AI-citable content, not filler.
- [ ] **[STRUCTURE]** "Why OnlyHuman" 4-point trust section distinct from the homepage's value grid (quality, transparency, service, pricing) — same slot, OnlyHuman's own claims, each one true and substantiated by the actual fulfillment/provider model.

## 4. Product/treatment pages — one per product, 5 total (Tirzepatide, Semaglutide, NAD+, Glutathione, GHK-Cu Face Cream)
- [ ] **[STRUCTURE]** Single reusable template: hero (name, one-line positioning, trust strip, image) → what-it-is/mechanism explanation → benefits list → "How It Works" 3-step → quality/sourcing section → FAQ accordion → related-products cross-sell → footer.
- [ ] **[STRUCTURE]** "Get started" and "Learn more" CTA pair on every card and at top of every product page; CTA is a plain outbound link to the OnlyHuman telehealth intake flow, parameterized by treatment slug — **never** an in-page form or wizard.
- [ ] **[STRUCTURE]** "Important Safety Information" as its own linked, indexable page per prescription product (`/important-safety-information/{slug}` pattern), separate from the marketing product page, linked from every card/CTA area.
- [ ] **[BRAND]** No FDA-approval claims for compounded products; state accurately (mirroring GLM's own disclosure pattern) that a compounded medication is not FDA-approved/evaluated for safety, efficacy, or quality, prepared by a licensed pharmacy per an individual prescription.
- [ ] **[ADAPT]** Do not copy GLM's specific clinical statistics (e.g., "14.9% body weight lost in a year") verbatim or without independent sourcing — any efficacy statistic on the OnlyHuman site must be sourced to a citation OnlyHuman's medical/legal reviewer approves.
- [ ] **[STRUCTURE]** Quality/testing section (potency, sterility, pH, endotoxin-type language) for compounded injectables — reproduce the *category* of reassurance (how OnlyHuman verifies its compounded medications), populated with OnlyHuman's actual sourcing/QA facts.

## 5. Compliance & legal
- [ ] **[STRUCTURE]** `/important-safety-information/{slug}` template: H5-level section structure (Indication → Contraindications → Warnings → Side effects), bullet-first, bold for critical warnings.
- [ ] **[STRUCTURE]** Privacy Policy / Terms & Conditions / Telehealth Consent as indexable standalone pages, footer-linked, with an effective-date stamp and a "Your Privacy Choices" control.
- [ ] **[BRAND]** All legal text drafted/approved by OnlyHuman's own legal counsel — never copied from GLM.

## 6. Content hub & tools
- [ ] **[STRUCTURE]** `/health-guide`-equivalent index with category filtering; `/post/{slug}` article template.
- [ ] **[ADAPT]** Calculators as first-class indexable pages (not a modal/widget), reused on the Weight Loss category page.

## 7. Support & footer
- [ ] **[STRUCTURE]** Help-center categorized into: About/eligibility, Account, Medical care, Orders & shipping, Payments, Privacy/security, Refunds/cancellations.
- [ ] **[STRUCTURE]** Footer: category links, popular-product links, resources/tools, support contact (email/phone), newsletter signup with inline success/error states, social icons, legal link row, copyright.
- [ ] **[BRAND]** OnlyHuman's own support email/phone, social handles.

## 8. Visual system
- [ ] **[STRUCTURE]** Token-driven fluid type scale (`h1`–`h6` derive from a small custom-property set, viewport-relative on desktop, fixed px on small mobile) rather than per-element hardcoded sizes.
- [ ] **[STRUCTURE]** Spacing scale that compresses proportionally (not just linearly) on mobile — reuse GLM's ratio pattern (see design system §3) tuned to OnlyHuman's own base unit if different.
- [ ] **[STRUCTURE]** Near-square button radius, softly-rounded cards, fully-pill badges only — flat color-block depth, no drop-shadow card elevation.
- [ ] **[ADAPT]** Exactly 2 category accent/tint color pairs (not 4), chosen from OnlyHuman's brand palette, applied to category badges/section washes the same way GLM applies its 4.
- [ ] **[BRAND]** OnlyHuman's own licensed type pairing (warm humanist sans + mono/condensed label face is the *category* to match, not GLM's specific fonts).

## 9. Motion & interaction
- [ ] **[STRUCTURE]** Global smooth-scroll easing (Lenis-equivalent or CSS `scroll-behavior`/Framer Motion scroll damping).
- [ ] **[STRUCTURE]** Scroll-triggered reveal-on-entry for sections/cards (Framer Motion `whileInView` or IntersectionObserver — GSAP not required in Next.js).
- [ ] **[STRUCTURE]** Momentum drag-scroll for category product-card rails.
- [ ] **[STRUCTURE]** CSS-grid (`grid-template-rows: 0fr → 1fr`) accordion mechanism for FAQ and mobile nav, built on real `<button aria-expanded>`/`aria-controls` semantics.
- [ ] **[STRUCTURE]** One signature high-emphasis CTA hover treatment, used sparingly, not on every button.
- [ ] **[STRUCTURE]** Motion restraint: a small, reused set of primitives — no bespoke animation per section, keeping JS/animation payload light (serves Core Web Vitals requirement directly).

## 10. Explicitly out of scope (do not build)
- [ ] No medical intake form, questionnaire, or multi-step wizard on the marketing site.
- [ ] No prescription/provider-approval logic, no patient account/portal, no order/shipment tracking UI.
- [ ] No payment collection on the marketing site.
- [ ] All of the above remain the job of the existing external OnlyHuman telehealth backend; every relevant CTA is a plain outbound link into it, parameterized by treatment slug.
