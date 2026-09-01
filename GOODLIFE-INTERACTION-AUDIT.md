# Good Life Meds — Interaction & Behavior Audit

Method: confirmed from the live page's loaded script tags, CSS transition/animation rules, and rendered structure. GLM's stack is **Webflow (structure/CMS) + GSAP (animation) + Lenis (smooth scroll) + jQuery**, not a hand-rolled JS framework — which is exactly why it feels fluid without feeling "app-like" or janky. OnlyHuman's Next.js build should reproduce the *effects*, not the stack (Framer Motion / CSS + native scroll-timeline replace GSAP+Lenis; see `ONLYHUMAN-TECHNICAL-ARCHITECTURE.md`).

## 1. Confirmed libraries & what they're doing
| Library | Confirmed use on this site |
|---|---|
| **Lenis** (`studio-freight/lenis`) | Global smooth/inertia scrolling — the whole page scroll is eased, not native jump-scroll. This is why scroll feels "heavy/premium" rather than instant. |
| **GSAP core + ScrollTrigger** | Scroll-linked reveal animations (sections/cards fade or slide in as they enter viewport) and likely a pinned step in the "How It Works" section. |
| **GSAP SplitText** | Character/word-level text animation — matches the `.btn-animate-chars` button component (button label characters animate independently on hover) and likely headline reveal-on-load animation. |
| **GSAP Draggable + InertiaPlugin** | Powers the horizontally-scrolling product-card rails (Weight Loss / Daily Wellness / etc. on the homepage) as momentum-drag carousels — you can flick them with a mouse or touch and they coast, rather than a plain `overflow-x:scroll` strip. |
| **GSAP CustomEase** | Custom (non-default) easing curves used across the animation system — consistent with a deliberately "designed" motion feel rather than default ease-in-out everywhere. |
| **hls.js** | Streaming video playback support — used for the lightbox video testimonial/demo player. |
| **jQuery** | Legacy Webflow dependency, not a pattern to copy. |
| **Trustpilot widget script** | Live-embedded review widget (real third-party trust signal, not a static screenshot). |
| **LegitScript seal script** | Pharmacy/telehealth compliance verification badge, dynamically rendered — a real accreditation seal, common and expected in telehealth UX; OnlyHuman should embed its own real compliance seal(s) the same way once available, not fabricate one. |

## 2. Navigation behavior
- **Desktop:** sticky header, translucent/blurred glass panel (`backdrop-filter: blur(50px)`), inset from the viewport edge with its own small border-radius — reads as a floating bar, not a flush classic header. Category nav items open **mega-menu dropdowns** (column layout: e.g. Weight Loss → "Medication" column + "Name Brand" column + a product-image tile), consistent with `.nav-dropdown-product` styling.
- **Trigger:** column-grid dropdown panel styled with the same card radius as product cards (`0.6rem`) — the mega-menu is visually a family member of the product-card component, not a separate menu style.
- **Mobile:** hamburger opens a full drawer; categories become accordion-style disclosures (`.menu-accordion-section`, `.menu-accordion-quicklinks`) — same accordion mechanism as the FAQ (see §4), reused rather than a bespoke mobile-nav component. This reuse is a good pattern to copy: **one accordion primitive, used everywhere disclosure is needed** (FAQ, mobile nav, possibly product detail sections).
- **Member Login** stays a static utility link in the header at all breakpoints — never buried inside the hamburger drawer.

## 3. Product-card rails (homepage category sections)
- Horizontal, **drag-to-scroll with momentum** (GSAP Draggable/Inertia), not a dot-indicator slider and not simple CSS scroll-snap alone — flicking a card rail keeps coasting briefly, then settles.
- Each card is a self-contained unit: image with absolutely-positioned badges (`popular-tag`, `stock-tag` in the category accent color, `featured-product-tag`), name/tagline, then a bottom CTA row (`card-buttons-flex`) separated by a hairline top border from the image/copy above it — the CTA row never floats loose from the card.
- Section-level "Explore {Category}" CTA sits after each rail, so the rail is a *preview*, not the only path into that category's full page.

## 4. Accordions (FAQ, mobile nav)
- Pure-CSS `grid-template-rows: 0fr → auto` technique — closed panels have zero rendered height with `overflow:hidden`; opening animates the row-track, which auto-animates to true content height without JS measuring the DOM. This avoids the common `max-height: 999px` hack and its animation-easing artifacts.
- Trigger row has a `1px dotted` top divider (not solid) and a rotate-180° icon transition on open state.
- Only current open item is styled via a class toggle (`.is-open`-style state, not visible in CSS alone but implied by the `.accordion-css__item-icon` transform rule) — implement as single-open-at-a-time OR multi-open; GLM's markup doesn't force either, so this is an implementation choice for OnlyHuman (recommendation: allow multiple open at once on FAQ pages — friendlier for scanning long medical FAQs; single-open acceptable for compact nav accordions).
- **Accessibility requirement carried to OnlyHuman:** implement as native `<button aria-expanded>` triggers controlling a panel with `aria-controls`/`id`, so the visual grid-row trick sits on top of correct semantics — GLM's own accessibility on this point should not be assumed; build it correctly regardless of what GLM does under the hood.

## 5. Buttons & hover states
- **Primary** (solid grey fill): straightforward color-transition hover (`all 0.3s`), likely lightens/inverts.
- **Secondary/outline**: transparent fill with a faint border; hover fills to solid dark with white text — outline buttons "become" primary buttons on hover rather than having a permanently distinct hover treatment.
- **`.btn-animate-chars`** component: a distinct, more elaborate hover — button text is split into individual characters (SplitText) that appear to animate independently over a color-fill background (`#ad1a1a` brick red) that expands from behind the text. This is reserved for a subset of higher-emphasis CTAs, not applied globally — a "signature" motion moment, used sparingly.

## 6. "How It Works" / step sections
- Presented as a numbered 3-step sequence (Simple Questionnaire → Provider Evaluation → Approved & Delivered) with a full-width illustration, distinct mobile-vs-desktop image asset. Likely scroll-triggered reveal per step (consistent with ScrollTrigger being loaded) rather than a static, all-at-once render — treat as **progressive reveal on scroll**, not an interactive stepper the user clicks through.

## 7. CTA routing pattern (critical for OnlyHuman)
Every "Get started"/"Buy now" button is a **plain outbound link with query-string promo tracking** to the external intake app:
```
https://app.goodlifemeds.com/start-online-visit/{treatment-slug}?promo={CODE}&promo-source=coupon
```
No client-side modal, no in-page form, no multi-step wizard lives on the marketing site itself. This confirms the brief's constraint: **OnlyHuman's site must do the same** — every conversion CTA is a plain link out to the existing OnlyHuman telehealth flow, parameterized by treatment slug (and promo code, if/when OnlyHuman runs promotions), never a reimplementation of intake.

## 8. Trust/social-proof widgets
- Trustpilot: live third-party widget (real reviews pulled at runtime), not a static screenshot carousel — though the homepage also separately shows a manually-curated testimonial image carousel alongside it (i.e. GLM runs both: live third-party widget + hand-picked testimonial quotes/screenshots).
- LegitScript seal: dynamically injected compliance/accreditation badge script — the general pattern (a real, verifiable, dynamically-rendered accreditation seal placed near trust-badge copy) should be followed for OnlyHuman once its actual accreditations/seals are confirmed; never fabricate a compliance seal or badge.

## 9. Forms
- **Newsletter signup** (footer): single email field, inline success/error states ("Thanks! We've got your submission" / "Oops! Something went wrong…") — standard Webflow form behavior, no visible client-side validation beyond native `type="email"`.
- **No medical intake form exists on the marketing site** — confirmed via link graph, every "start" CTA exits to `app.goodlifemeds.com`. OnlyHuman must not build one either.
- **Calculators** (BMI/TDEE/protein/water/calorie): client-side interactive tools, numeric inputs → computed output + explanatory disclaimer text (e.g., BMI calculator explicitly disclaims it does not determine medication eligibility). These are genuinely useful, SEO-friendly, low-risk interactive pages worth replicating in category-appropriate form for OnlyHuman (see `ONLYHUMAN-SITEMAP.md`).

## 10. Motion restraint principle
Despite loading a full GSAP suite, the *visible* effect budget is disciplined: smooth scroll (Lenis), scroll-triggered fades/reveals, one signature hover-fill button, and momentum-drag card rails. There is no evidence of parallax abuse, scroll-jacking, or heavy full-page transitions. **OnlyHuman should match this restraint** — a small, consistent set of motion primitives (page-load fade/slide-up on hero, scroll-reveal on section entry, one signature CTA hover state, momentum card rails) rather than a different animation per section. This also directly serves the brief's performance/Core Web Vitals requirement: fewer, reused animation primitives are cheaper to ship and easier to keep off the critical rendering path than bespoke per-section GSAP timelines.
