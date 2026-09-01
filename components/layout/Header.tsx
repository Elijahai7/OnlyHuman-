import Link from "next/link";
import Image from "next/image";
import { CATEGORY_LIST } from "@/content/categories";
import { PRODUCTS } from "@/content/products";
import { PortalLoginLink } from "@/components/ui/TreatmentCTA";
import { MobileNav } from "./MobileNav";

const SECONDARY_LINKS = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
];

/**
 * Sticky, translucent header matching the measured Good Life Meds header
 * (GOODLIFE-DESIGN-SYSTEM.md §5 / GOODLIFE-INTERACTION-AUDIT.md §2):
 * a blurred glass panel, ~4.2rem tall on desktop, with a mega-menu per
 * category. The desktop dropdown needs no client JS — it opens on
 * `:hover` or `:focus-within`, so it's keyboard-accessible (tab into any
 * link inside opens it, tabbing out closes it) without a toggle handler.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full px-2 pt-2 sm:px-4">
      <div className="container mx-auto flex h-[4.2rem] items-center justify-between rounded-[0.2rem] border border-border/60 bg-background/75 px-4 backdrop-blur-[50px] max-md:h-auto max-md:py-3">
        <Link href="/" className="flex-shrink-0" aria-label="OnlyHuman home">
          <Image
            src="/brand/logo/onlyhuman-logo-transparent.png"
            alt="OnlyHuman"
            width={160}
            height={38}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {CATEGORY_LIST.map((category) => (
            <div key={category.slug} className="group relative">
              <Link
                href={`/${category.slug}`}
                className="inline-flex items-center rounded-button px-4 py-2 text-sm text-ink transition-colors hover:text-ink-muted"
              >
                {category.navLabel}
              </Link>

              <div
                className="invisible absolute left-0 top-full z-10 w-72 -translate-y-1 rounded-regular border border-border bg-background opacity-0 shadow-none transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
              >
                <div className="flex flex-col gap-1 p-4">
                  {category.productSlugs.map((slug) => {
                    const product = PRODUCTS[slug];
                    if (!product) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/${category.slug}/${slug}`}
                        className="rounded-button px-3 py-2 text-sm text-ink transition-colors hover:bg-surface"
                      >
                        {product.name}
                      </Link>
                    );
                  })}
                  <Link
                    href={`/${category.slug}`}
                    className="text-eyebrow mt-1 px-3 text-ink-muted"
                  >
                    View {category.navLabel}
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {SECONDARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center rounded-button px-4 py-2 text-sm text-ink transition-colors hover:text-ink-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden flex-shrink-0 md:block">
          <PortalLoginLink variant="secondary" size="sm">
            Log In
          </PortalLoginLink>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
