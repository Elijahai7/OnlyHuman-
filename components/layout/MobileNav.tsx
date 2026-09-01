"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { CATEGORY_LIST } from "@/content/categories";
import { PRODUCTS } from "@/content/products";
import { Accordion } from "@/components/ui/Accordion";
import { PortalLoginLink } from "@/components/ui/TreatmentCTA";
import { cn } from "@/lib/cn";
import { useHasMounted } from "@/lib/useHasMounted";

const SECONDARY_LINKS = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Health Guide", href: "/health-guide" },
];

/**
 * Mobile hamburger drawer. Categories collapse into the same Accordion
 * primitive used by the FAQ (GOODLIFE-INTERACTION-AUDIT.md §2/§4: "one
 * accordion primitive, reused everywhere disclosure is needed").
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const mounted = useHasMounted();

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (isOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [isOpen]);

  const accordionItems = CATEGORY_LIST.map((category) => ({
    question: category.navLabel,
    answer: (
      <div className="flex flex-col gap-3">
        {category.productSlugs.map((slug) => {
          const product = PRODUCTS[slug];
          if (!product) return null;
          return (
            <Link
              key={slug}
              href={`/${category.slug}/${slug}`}
              onClick={() => setIsOpen(false)}
              className="text-ink hover:text-ink-muted"
            >
              {product.name}
            </Link>
          );
        })}
        <Link
          href={`/${category.slug}`}
          onClick={() => setIsOpen(false)}
          className="text-eyebrow text-ink-muted"
        >
          View {category.navLabel}
        </Link>
      </div>
    ),
  }));

  const drawer = isOpen && (
        <div
          id="mobile-nav-drawer"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-background"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <Image
              src="/brand/logo/onlyhuman-logo-transparent.png"
              alt="OnlyHuman"
              width={140}
              height={34}
              className="h-7 w-auto"
            />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 px-4 pb-8">
            <Accordion items={accordionItems} allowMultiple />

            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
              {SECONDARY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-heading text-lg text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
              <PortalLoginLink variant="secondary">Log In</PortalLoginLink>
            </div>
          </div>
        </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((v) => !v)}
        className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <span
          className={cn(
            "block h-[1.5px] w-6 bg-ink transition-transform duration-300",
            isOpen && "translate-y-[3.5px] rotate-45"
          )}
        />
        <span
          className={cn(
            "block h-[1.5px] w-6 bg-ink transition-transform duration-300",
            isOpen && "-translate-y-[3.5px] -rotate-45"
          )}
        />
      </button>

      {/* Portaled to document.body: this drawer uses position:fixed to
       * cover the viewport, but the header it lives inside applies
       * backdrop-filter, which (per the CSS spec) makes that header the
       * containing block for any fixed-position descendant — inset-0
       * would then cover only the header's own box, not the screen.
       * Portaling escapes that stacking/containing-block context. */}
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
