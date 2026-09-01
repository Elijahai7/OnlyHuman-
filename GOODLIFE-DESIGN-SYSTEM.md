# Good Life Meds — Design System Audit

**Method note (read first):** Values below are extracted directly from Good Life Meds' shipped production CSS (`good-life-redesign.shared.*.min.css`, Webflow-published, fetched and parsed byte-for-byte — not estimated) and from the rendered HTML/link graph of the live site. Every token in §1–§4 is a real value taken from the site's `:root` custom properties and component rules. Where something is inferred rather than measured (e.g. exact px height of an element we didn't isolate), it is marked **[inferred]**. This is the "measure, don't approximate" deliverable the brief asked for.

Do not reuse GLM's literal hex values or font files for OnlyHuman — §6 defines the adaptation rule. This document exists so the OnlyHuman system is built to the same *rigor and structure*, not the same *paint*.

## 1. Color system

GLM uses a small neutral palette plus **one accent pair per treatment category** — this category-color-coding is the single most important structural idea to carry forward.

### Neutrals / brand
| Token | Value | Use |
|---|---|---|
| `--brand-colours--cream` | `#fffef8` | Page/body background, card fill |
| `--brand-colours--dark-cream` | `#f8f7f0` | Secondary section background, "darker" surface |
| `--brand-colours--white` | `#fff` | Button text on dark, pure-white surfaces |
| `--brand-colours--grey` | `#323232` | Primary button fill, dark section background |
| `--accent-greys--heading-grey` | `#222` | Primary text (headings, body on cream) |
| `--accent-greys--body-grey` | `#54514a` | Secondary/body copy (warm dark grey, not pure black) |
| `--accent-greys--stroke-grey` | `#d6d6d6` | Hairline borders, accordion dividers |

### Category accent pairs (accent + pale tint)
| Category | Accent | Pale tint |
|---|---|---|
| Weight Loss | `#6a835e` (sage green) | `#f8f9ec` |
| Daily Wellness | `#c89a77` (caramel/tan) | `#f5f2e5` |
| Sexual Health | `#a8573e` (terracotta) | `#fae7db` |
| Hair | `#60949d` (muted teal) | `#e4edea` |

Each pair is used consistently: the accent colors in-stock badges, category eyebrows, and hover states within that category; the pale tint as that category's section background wash. This is what makes four visually-similar product rails feel distinct while staying inside one calm neutral system — **not** four different design languages.

There is no pure black or pure white body-text color anywhere in the system — every "black" is a warm off-black (`#222`/`#323232`), every background is a warm off-white (`#fffef8`), which is a large part of why the site reads "warm/human" rather than "clinical."

A separate, low-frequency accent, `#ad1a1a` (brick red), appears only inside one hover-fill button-animation component — not part of the core palette.

## 2. Typography

### Typefaces (both are licensed/paid fonts loaded as `@font-face` — do not reuse the files, license OnlyHuman's own)
- **Headings & body:** "PP Neue Montreal" (weights loaded: 400 regular, 500 medium, 700 bold), fallback `Arial, sans-serif`. A clean, slightly geometric grotesque — warm humanist feel, not a stock system font.
- **Subheading/eyebrow label:** "GeistMono" (weights 100–900 all loaded), used at very small sizes only, for uppercase micro-labels — a deliberate serif/grotesque-vs-mono pairing that reads as "editorial/clinical precision" against the softer body face.

### Type scale (fluid — desktop values are viewport-relative, mobile breakpoints lock some sizes to fixed px to preserve legibility)

| Style | Desktop (≥992px) | Tablet (≤991px) | Mobile (≤479px) | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| Display | `8.5vw` | `10vw` | `12vw` | 0.9 (h1 lh) | — |
| H1 | `6vw` | `6vw` | `12vw` | `0.9` | `-0.2vw` |
| H2 | `5vw` | `7vw` | `11vw` | `0.95` | `-0.1vw` |
| H3 | `3.5rem` fixed | `3.5rem` | `9.5vw` | `1.0` | `-0.06rem` |
| H4 | `2.8rem` fixed | `2.8rem` | `25px` | `1.0` | `-0.05rem` |
| H5 | `1.4rem` fixed | `1.4rem` | `22px` | `1.1` | `-0.02rem` |
| H6 | `1.3rem` fixed | `1.3rem` | `18px` | `1.1` | `-0.01rem` |
| Body regular | `1rem` | `1rem` | `15px` | `1.4` | `0` |
| Subheading/eyebrow | `0.6rem` | `0.6rem` | `12px` | `1.4` | `0` (mono, uppercase via `text-transform`) |

All heading tags share one mechanism: a CSS custom-property cascade (`--_typography-styles---*`) rather than one rule per breakpoint per tag — i.e., the whole scale re-derives from a handful of root tokens. This is the pattern to copy in Tailwind/CSS-variables form: a small token set that headings consume, not per-element hardcoded sizes.

**Breakpoints** (confirmed from actual media queries in the stylesheet): `991px`, `767px`, `479px`, plus one `min-width:768px` rule. This is Webflow's standard 4-tier system (Desktop / Tablet / Mobile landscape / Mobile portrait) — adopt it directly as OnlyHuman's Tailwind breakpoints (`lg:1024`, `md:768`, `sm:480` map closely enough; exact px can be tuned to Tailwind defaults without loss of fidelity).

## 3. Spacing system

A single spacing scale, expressed as rem on desktop and switched to fixed px below 991px (so spacing gets *proportionally tighter*, not just visually smaller, on mobile — an important, deliberate choice):

| Token | Desktop | ≤991px |
|---|---|---|
| `xxs` | `0.8rem` (12.8px) | `10px` |
| `base` | `1.5rem` (24px) | `15px` |
| `xs` | `1.75rem` (28px) | `20px` |
| `s` | `3.5rem` (56px) | `40px` |
| `m` | `5rem` (80px) | `60px` |
| `l` | `8rem` (128px) | `80px` |
| `xl` | `15rem` (240px) | `120px` |
| `xxl` | `22rem` (352px) | `180px` |

`base` (24px desktop / 15px mobile) is the workhorse — it's the card internal padding, the section horizontal gutter, and the FAQ section padding. `l`/`xl` are reserved for section-to-section vertical rhythm on desktop, collapsing hard on mobile (128px→80px, 240px→120px) rather than scaling linearly — sections get noticeably more compact on mobile, they don't just shrink text.

## 4. Radius, borders, elevation

| Token | Value | Use |
|---|---|---|
| `--radius--button` | `0.15rem` (~2.4px) | Buttons — **almost square**, not pill-shaped. This is a distinctive, deliberate choice: sharp-ish corners read as more clinical/precise than rounded pills. |
| `--radius--regular` | `0.6rem` (~9.6px) | Cards, product images, nav dropdown tiles |
| `--radius--small` | `0px` | Explicit "no radius" token for elements that should read as sharp-edged |
| Pill (badges only) | `200rem` | "Popular" tag and similar small pills — the one place full rounding is used, deliberately contrasted against square-ish buttons |

Borders are hairline and low-contrast: `1px solid #d6d6d6` (stroke-grey) for dividers, `1px solid rgba(49,49,49,0.2)` for secondary-button outlines — never a heavy or saturated border. Accordion item dividers use `1px dotted` rather than solid, a small textural detail that reads as "editorial" rather than "form."

No heavy box-shadows / drop-shadow card elevation was found anywhere in the core system — depth comes from color-block contrast (cream card on dark-cream section) and thin borders, not shadows. This is an important restraint to copy: **flat, color-block depth, not shadow-driven depth.**

## 5. Key components (measured)

**Primary button** (`.primary-button`): fill `#323232`, text white, border-radius `0.15rem`, padding `0.75rem 1.5rem 0.8rem`, font = heading family at 500 weight, body-regular size, all-transition `0.3s`, hover state inverts/lightens.

**Secondary/outline button** (`.button`): transparent fill, `1px solid rgba(49,49,49,0.2)` border, text `#313131`, same radius/padding as primary, hover fills to solid with white text — i.e. secondary buttons are outline-first and *become* primary-styled on hover, not a permanently different visual weight.

**Product card** (`.product-card` + `.card-top`/`.card-bottom`): radius `0.6rem`, background = brand cream, internal top padding = `base` token on all three sides, badges (`popular-tag`, `stock-tag`, `featured-product-tag`) absolutely positioned in the top-left/top-right corners over the product image, `card-buttons-flex` pinned to the card bottom with a `1px solid stroke-grey` top divider separating image/copy from the CTA row.

**Badges/tags:** "Popular" = light grey pill (`#ececec`, radius `200rem`, tiny `0.65rem` mono-adjacent label). "In stock"/category tag = **filled with that category's accent color** (e.g., sage green for a weight-loss product), white text, `radius--button` (square-ish), reinforcing the category-color system from §1 at the card level, not just the section level.

**Accordion (FAQ):** pure-CSS technique — closed state is `grid-template-rows: 0fr` on a wrapper, open state animates to content height via grid-template-rows transition (no JS height math, no layout jank, no `max-height` hacks). Each item's trigger row has a `1px dotted` top divider and a chevron/plus icon that rotates `180deg` on open with an `opacity`/`transform` transition. This is the exact accordion mechanism to reproduce in the OnlyHuman component — it's more robust than `max-height` and doesn't require JS to measure content.

**Navigation:** `position: sticky; top: 0`, fixed height `4.2rem` on desktop (collapses to `auto` height on mobile because it becomes a stacked accordion drawer instead), `backdrop-filter: blur(50px)` — i.e. the nav bar is a **translucent, blurred glass panel**, not an opaque bar, so page content is dimly visible scrolling underneath it. The inner nav-bar grid itself carries its own small `0.2rem` radius and sits inset from the browser edge rather than running edge-to-edge — a "floating pill/glass bar" treatment rather than a flat classic header.

## 6. Adaptation rule for OnlyHuman

Copy the **structure** of this system (a token-driven fluid type scale, a proportional spacing scale that compresses on mobile, category-accent-pair coding, flat color-block depth over shadows, CSS-grid accordions, glass sticky nav), not the **paint**:

- Replace "PP Neue Montreal" + "GeistMono" with OnlyHuman's own licensed type pairing (a warm humanist sans for body/headings + a mono/condensed face for eyebrows/labels is the *category* of pairing to match, not these specific files).
- Replace the cream/off-black neutral palette with OnlyHuman's brand neutrals, keeping the same warmth principle (no pure black, no pure white).
- OnlyHuman has 2 categories, not 4 — define exactly **2** accent/tint pairs (Weight Loss, Daily Wellness/Longevity) using the same "saturated accent + pale tint" formula, chosen from OnlyHuman's brand palette.
- Keep the same radius philosophy (near-square buttons, softly rounded cards, fully-pill badges only) unless OnlyHuman's brand identity specifies otherwise.
- Keep the fluid-viewport heading scale + fixed-px mobile spacing scale — this is what makes the reference site never feel "stretched" or "cramped" at any width.

Full component-by-component copy points are enumerated in `GOODLIFE-PARITY-CHECKLIST.md`.
