import type { CategorySlug } from "./categories";

export type ProductClassification = "compounded-medication" | "supplement-injection" | "topical";

export interface Product {
  slug: string;
  categorySlug: CategorySlug;
  name: string;
  /** Short, factual, non-clinical-claim line: what it is + category + administration. */
  oneLiner: string;
  classification: ProductClassification;
  heroImageSrc: string;
  heroImageAlt: string;
  /** Key into TREATMENT_ROUTES in config/treatments.ts */
  treatmentRouteKey: string;
  /**
   * Full mechanism/benefit copy, dosing detail, and any statistic is
   * intentionally NOT authored yet — that content requires medical/legal
   * review before publish (see ONLYHUMAN-IMPLEMENTATION-PLAN.md §0.4 and
   * ONLYHUMAN-SEO-GEO-PLAN.md §6). This flag exists so the eventual
   * product-page template can render a visible "pending review" state
   * instead of silently shipping placeholder prose as if it were final.
   */
  medicalCopyPendingReview: true;
}

export const PRODUCTS: Record<string, Product> = {
  tirzepatide: {
    slug: "tirzepatide",
    categorySlug: "weight-loss",
    name: "Compounded Tirzepatide",
    oneLiner: "A compounded GLP-1/GIP receptor agonist injection, prescribed for weight management.",
    classification: "compounded-medication",
    heroImageSrc: "/images/products/tirzepatide/tirzepatide.png",
    heroImageAlt: "Vial of Compounded Tirzepatide on a green gradient background",
    treatmentRouteKey: "tirzepatide",
    medicalCopyPendingReview: true,
  },
  semaglutide: {
    slug: "semaglutide",
    categorySlug: "weight-loss",
    name: "Compounded Semaglutide",
    oneLiner: "A compounded GLP-1 receptor agonist injection, prescribed for weight management.",
    classification: "compounded-medication",
    heroImageSrc: "/images/products/semaglutide/semaglutide.png",
    heroImageAlt: "Vial of Compounded Semaglutide on a green gradient background",
    treatmentRouteKey: "semaglutide",
    medicalCopyPendingReview: true,
  },
  nad: {
    slug: "nad",
    categorySlug: "daily-wellness",
    name: "NAD+",
    oneLiner: "A coenzyme injection intended to support cellular energy metabolism and healthy aging.",
    classification: "supplement-injection",
    heroImageSrc: "/images/products/nad/nad.png",
    heroImageAlt: "Vial of NAD+ on a warm champagne gradient background",
    treatmentRouteKey: "nad",
    medicalCopyPendingReview: true,
  },
  glutathione: {
    slug: "glutathione",
    categorySlug: "daily-wellness",
    name: "Glutathione",
    oneLiner: "An antioxidant injection intended to support the body's natural detoxification and immune processes.",
    classification: "supplement-injection",
    heroImageSrc: "/images/products/glutathione/glutathione.png",
    heroImageAlt: "Vial of Glutathione on a warm champagne gradient background",
    treatmentRouteKey: "glutathione",
    medicalCopyPendingReview: true,
  },
  "ghk-cu-face-cream": {
    slug: "ghk-cu-face-cream",
    categorySlug: "daily-wellness",
    name: "GHK-Cu Face Cream",
    oneLiner: "A copper-peptide topical cream intended to support skin appearance and skin health.",
    classification: "topical",
    heroImageSrc: "/images/products/ghk-cu-face-cream/ghk-cu-face-cream.png",
    heroImageAlt: "Jar of GHK-Cu Face Cream on a warm champagne gradient background",
    treatmentRouteKey: "ghk-cu-face-cream",
    medicalCopyPendingReview: true,
  },
};

export const PRODUCT_LIST: Product[] = Object.values(PRODUCTS);

export function productsForCategory(categorySlug: CategorySlug): Product[] {
  return PRODUCT_LIST.filter((p) => p.categorySlug === categorySlug);
}
