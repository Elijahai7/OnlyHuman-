import Link from "next/link";
import { CATEGORY_LIST } from "@/content/categories";
import { PRODUCT_LIST } from "@/content/products";
import { NewsletterForm } from "./NewsletterForm";
import { SITE_NAME } from "@/lib/site-config";

const RESOURCE_LINKS = [
  { label: "Health Guide", href: "/health-guide" },
  { label: "Help Center", href: "/help-center" },
  { label: "BMI Calculator", href: "/tools/bmi-calculator" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Telehealth Consent", href: "/telehealth-consent" },
];

/**
 * Footer structure matches the measured Good Life Meds pattern
 * (GOODLIFE-PARITY-CHECKLIST.md §7): category links, popular products,
 * resources, support contact, newsletter signup, legal row, copyright.
 */
export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container py-16 max-md:py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          <div>
            <h2 className="text-eyebrow mb-4 text-ink-muted">Categories</h2>
            <ul className="flex flex-col gap-3">
              {CATEGORY_LIST.map((category) => (
                <li key={category.slug}>
                  <Link href={`/${category.slug}`} className="text-sm text-ink hover:text-ink-muted">
                    {category.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-eyebrow mb-4 text-ink-muted">Treatments</h2>
            <ul className="flex flex-col gap-3">
              {PRODUCT_LIST.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/${product.categorySlug}/${product.slug}`}
                    className="text-sm text-ink hover:text-ink-muted"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-eyebrow mb-4 text-ink-muted">Resources</h2>
            <ul className="flex flex-col gap-3">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink hover:text-ink-muted">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-eyebrow mb-4 text-ink-muted">Support</h2>
            <ul className="flex flex-col gap-3 text-sm text-ink">
              {/* TODO(onlyhuman): confirm real support contact details before launch. */}
              <li>
                <a href="mailto:care@onlyhuman.com" className="hover:text-ink-muted">
                  care@onlyhuman.com
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
