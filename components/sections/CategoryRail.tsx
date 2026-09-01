import Link from "next/link";
import type { Category } from "@/content/categories";
import { PRODUCTS } from "@/content/products";
import { ProductCard } from "@/components/product/ProductCard";

interface CategoryRailProps {
  category: Category;
}

/**
 * Horizontal, swipeable product-card rail per category. The reference
 * site drives this with a JS drag/inertia library (GOODLIFE-INTERACTION-
 * AUDIT.md §3); native CSS scroll-snap achieves the same swipe/momentum
 * feel with zero added JS, which is the right technical substitution for
 * a Next.js build's performance budget rather than a design change.
 */
export function CategoryRail({ category }: CategoryRailProps) {
  const products = category.productSlugs.map((slug) => PRODUCTS[slug]).filter(Boolean);

  return (
    <section id={category.slug} className="py-16 max-md:py-10">
      <div className="container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl max-md:text-2xl">{category.name}</h2>
            <p className="mt-2 max-w-md text-ink-muted">{category.oneLiner}</p>
          </div>
          <Link
            href={`/${category.slug}`}
            className="text-eyebrow flex-shrink-0 text-ink-muted hover:text-ink"
          >
            Explore {category.navLabel}
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
