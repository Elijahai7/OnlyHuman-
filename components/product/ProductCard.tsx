import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/content/products";
import type { Category } from "@/content/categories";
import { TreatmentCTA } from "@/components/ui/TreatmentCTA";
import { cn } from "@/lib/cn";

interface ProductCardProps {
  product: Product;
  category: Category;
  className?: string;
}

/**
 * Product card. Structure matches the measured Good Life Meds card
 * (GOODLIFE-DESIGN-SYSTEM.md §5): image with a category-accent badge in
 * the top corner, name + one-liner, then a CTA row pinned to the bottom
 * with a hairline top divider separating it from the copy above.
 */
export function ProductCard({ product, category, className }: ProductCardProps) {
  return (
    <div
      className={cn(
        "flex w-72 flex-shrink-0 flex-col overflow-hidden rounded-regular bg-background snap-start",
        className
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-regular bg-surface">
        <span
          className="text-eyebrow absolute left-3 top-3 z-10 rounded-button px-2 py-1 text-white"
          style={{ backgroundColor: `var(--color-${category.accentToken})` }}
        >
          {category.navLabel}
        </span>
        <Image
          src={product.heroImageSrc}
          alt={product.heroImageAlt}
          fill
          sizes="(min-width: 768px) 288px, 70vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 pt-4">
        <div>
          <h3 className="text-lg">{product.name}</h3>
          <p className="mt-1 text-sm text-ink-muted">{product.oneLiner}</p>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
          <Link
            href={`/${product.categorySlug}/${product.slug}`}
            className="text-sm text-ink underline-offset-4 hover:underline"
          >
            Learn more
          </Link>
          <TreatmentCTA treatmentSlug={product.treatmentRouteKey} size="sm">
            Get started
          </TreatmentCTA>
        </div>
      </div>
    </div>
  );
}
