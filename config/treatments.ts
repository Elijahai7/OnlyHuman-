/**
 * config/treatments.ts
 * ─────────────────────────────────────────────────────────────────────────
 * Centralized treatment-routing configuration.
 *
 * This is the SINGLE source of truth for:
 *   1. which treatments exist and which category each belongs to
 *   2. the internal site slug used in URLs (/{category}/{slug})
 *   3. the slug for that treatment's Important Safety Information page
 *   4. the external telehealth intake URL its "Get Started" CTA must open
 *
 * RULE FOR PHASE 2 BUILD: no component or page may hardcode a telehealth
 * or portal URL. Every CTA resolves its destination by importing from this
 * file (e.g. a `getTreatmentRoute(slug)` helper built alongside the CTA
 * component). Changing a URL here updates every CTA site-wide with no
 * template changes.
 *
 * STATUS: every `telehealthUrl` below is a PLACEHOLDER (`null`). This does
 * NOT block visual/component/page implementation — pages, cards, and CTA
 * buttons can and should be built now. Until a real URL is supplied,
 * `telehealthUrlConfigured` stays `false`, and CTA components should render
 * a visibly-disabled or "Coming soon" state instead of linking to `null` or
 * a fake URL. Flip the flag to `true` only once the URL is real and verified.
 *
 * See ONLYHUMAN-IMPLEMENTATION-PLAN.md §0 and §3 (REQUIRED BEFORE
 * PRODUCTION LAUNCH) for the checklist this config satisfies.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type TreatmentCategorySlug = "weight-loss" | "daily-wellness";

export interface TreatmentRoute {
  /** Internal URL slug: site route is /{category}/{slug} */
  slug: string;
  /** Category this treatment belongs to */
  category: TreatmentCategorySlug;
  /** Display name shown in UI, nav, and metadata */
  name: string;
  /** Slug for the paired /important-safety-information/{isiSlug} page */
  isiSlug: string;
  /**
   * Full external telehealth intake URL for this treatment's primary CTA
   * ("Get Started" / "Start My Visit"). PLACEHOLDER until supplied —
   * replace with the real production intake URL for this exact treatment.
   */
  telehealthUrl: string | null;
  /** Set to true only once telehealthUrl above is real and verified. */
  telehealthUrlConfigured: boolean;
}

export const TREATMENT_ROUTES: Record<string, TreatmentRoute> = {
  tirzepatide: {
    slug: "tirzepatide",
    category: "weight-loss",
    name: "Compounded Tirzepatide",
    isiSlug: "tirzepatide",
    telehealthUrl: null, // TODO(onlyhuman): real intake URL for Compounded Tirzepatide
    telehealthUrlConfigured: false,
  },
  semaglutide: {
    slug: "semaglutide",
    category: "weight-loss",
    name: "Compounded Semaglutide",
    isiSlug: "semaglutide",
    telehealthUrl: null, // TODO(onlyhuman): real intake URL for Compounded Semaglutide
    telehealthUrlConfigured: false,
  },
  nad: {
    slug: "nad",
    category: "daily-wellness",
    name: "NAD+",
    isiSlug: "nad",
    telehealthUrl: null, // TODO(onlyhuman): real intake URL for NAD+
    telehealthUrlConfigured: false,
  },
  glutathione: {
    slug: "glutathione",
    category: "daily-wellness",
    name: "Glutathione",
    isiSlug: "glutathione",
    telehealthUrl: null, // TODO(onlyhuman): real intake URL for Glutathione
    telehealthUrlConfigured: false,
  },
  "ghk-cu-face-cream": {
    slug: "ghk-cu-face-cream",
    category: "daily-wellness",
    name: "GHK-Cu Face Cream",
    isiSlug: "ghk-cu-face-cream",
    telehealthUrl: null, // TODO(onlyhuman): real intake URL for GHK-Cu Face Cream
    telehealthUrlConfigured: false,
  },
};

/**
 * Patient portal login URL (header "Log In" link). Same placeholder
 * pattern as above — do not hardcode this anywhere else in the app.
 */
export const PORTAL_LOGIN_URL: string | null = null; // TODO(onlyhuman): real patient portal login URL
export const PORTAL_LOGIN_URL_CONFIGURED = false;
