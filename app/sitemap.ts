import type { MetadataRoute } from "next";
import { CATEGORY_LIST } from "@/content/categories";
import { PRODUCT_LIST } from "@/content/products";
import { SITE_URL } from "@/lib/site-config";

/**
 * Generated from the same content model every page renders from — see
 * ONLYHUMAN-SEO-GEO-PLAN.md §7. Category and product URLs are listed here
 * ahead of their pages existing (Phase 3) since this is the intended
 * production route table (ONLYHUMAN-SITEMAP.md §3); they 404 until then,
 * which only matters once this ships to a crawlable environment.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORY_LIST.map((category) => ({
    url: `${SITE_URL}/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCT_LIST.map((product) => ({
    url: `${SITE_URL}/${product.categorySlug}/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
