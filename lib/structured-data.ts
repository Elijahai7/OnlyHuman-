import { SITE_NAME, SITE_URL, SOCIAL_LINKS } from "./site-config";

/**
 * JSON-LD builders. Kept centralized and minimal on purpose — per
 * ONLYHUMAN-SEO-GEO-PLAN.md §3 and §8, we only ever emit schema that is
 * genuinely true of the page it's attached to. Do not add Product/Offer,
 * Review/AggregateRating, or FAQPage blocks here speculatively — build a
 * dedicated builder when the page actually has that content, verified
 * against what's visibly rendered.
 */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo/onlyhuman-logo-transparent.png`,
    ...(SOCIAL_LINKS.length > 0 ? { sameAs: SOCIAL_LINKS.map((s) => s.url) } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** Renders a JSON-LD block as a script tag. Usage: <JsonLd data={organizationJsonLd()} /> */
export function jsonLdScriptProps(data: object) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
