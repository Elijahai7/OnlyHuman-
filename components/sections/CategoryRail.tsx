import Link from "next/link";
import type { Category } from "@/content/categories";
import { PRODUCTS } from "@/content/products";
import { ProductCard } from "@/components/product/ProductCard";
import { DragRail } from "@/components/ui/DragRail";
import { Reveal } from "@/components/ui/Reveal";

interface CategoryRailProps {
  category: Category;
}

/**
 * Horizontal, momentum-drag product-card rail per category — see
 * components/ui/DragRail.tsx for the interaction-parity rationale.
 * Section vertical rhythm and heading scale both read straight from the
 * measured token system (app/globals.css) rather than one-off utility
 * sizes, so they track the reference's fluid scale exactly.
 */
export function CategoryRail({ category }: CategoryRailProps) {
  const products = category.productSlugs.map((slug) => PRODUCTS[slug]).filter(Boolean);

  return (
    <section id={category.slug} className="py-[var(--spacing-l)]">
      <Reveal>
        <div className="container">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2>{category.name}</h2>
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
          <DragRail>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} category={category} />
            ))}
          </DragRail>
        </div>
      </Reveal>
    </section>
  );
}
