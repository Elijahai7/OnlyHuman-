export type CategorySlug = "weight-loss" | "daily-wellness";

export interface Category {
  slug: CategorySlug;
  name: string;
  navLabel: string;
  oneLiner: string;
  /** Tailwind color tokens defined in app/globals.css, e.g. "weight-loss" -> bg-weight-loss */
  accentToken: string;
  tintToken: string;
  heroImageSrc: string;
  heroImageAlt: string;
  productSlugs: string[];
}

export const CATEGORIES: Record<CategorySlug, Category> = {
  "weight-loss": {
    slug: "weight-loss",
    name: "Weight Loss",
    navLabel: "Weight Loss",
    oneLiner: "Provider-guided, prescription weight management.",
    accentToken: "weight-loss",
    tintToken: "weight-loss-tint",
    heroImageSrc: "/images/categories/weight-loss/weight-loss-lifestyle.jpg",
    heroImageAlt: "Man in athletic wear smiling outdoors in warm sunlight",
    productSlugs: ["tirzepatide", "semaglutide"],
  },
  "daily-wellness": {
    slug: "daily-wellness",
    name: "Daily Wellness",
    navLabel: "Daily Wellness",
    oneLiner: "Longevity and daily-performance support, provider-guided.",
    accentToken: "daily-wellness",
    tintToken: "daily-wellness-tint",
    heroImageSrc: "/images/categories/daily-wellness/daily-wellness-lifestyle.jpg",
    heroImageAlt: "Man seated in a calm, sunlit wellness studio",
    productSlugs: ["nad", "glutathione", "ghk-cu-face-cream"],
  },
};

export const CATEGORY_LIST: Category[] = Object.values(CATEGORIES);
