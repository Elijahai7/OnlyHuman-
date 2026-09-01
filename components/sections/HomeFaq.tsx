import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { SITE_TAGLINE } from "@/lib/site-config";

/**
 * Homepage FAQ. Per ONLYHUMAN-SEO-GEO-PLAN.md §4, each answer is written
 * as a complete, self-contained factual paragraph — extractable on its
 * own by a reader or an AI answer engine, not dependent on surrounding
 * page context. Limited here to company/logistics questions that don't
 * require sourced clinical claims; per-product FAQs (mechanism, results,
 * side effects) are built on the product page template in a later phase,
 * gated on medical/legal review.
 */
const FAQ_ITEMS = [
  {
    question: "Who is OnlyHuman?",
    answer: (
      <p>
        OnlyHuman is a telehealth platform connecting patients with licensed providers for
        prescription weight-loss and daily-wellness treatment, delivered entirely online. The
        company is built around one idea: &ldquo;{SITE_TAGLINE}&rdquo; — your body is something
        you care for and steward, not something that defines who you are.
      </p>
    ),
  },
  {
    question: "Do I need a prescription?",
    answer: (
      <p>
        Yes. Every treatment on this site requires a licensed provider to review your medical
        intake and determine whether it&apos;s appropriate for you before anything is prescribed
        or shipped.
      </p>
    ),
  },
  {
    question: "Do I need insurance?",
    answer: (
      <p>
        No. OnlyHuman&apos;s treatments are offered at a transparent, upfront price and do not
        require insurance.
      </p>
    ),
  },
  {
    question: "Can I cancel anytime?",
    answer: (
      <p>
        Yes, subscriptions can be cancelled at any time.{" "}
        {/* TODO(onlyhuman): confirm exact cancellation terms with the telehealth/billing team before launch. */}
      </p>
    ),
  },
];

export function HomeFaq() {
  return (
    <section className="border-t border-border py-[var(--spacing-l)]">
      <Reveal>
        <div className="container max-w-2xl">
          <h2>Frequently asked questions</h2>
          <div className="mt-8">
            <Accordion items={FAQ_ITEMS} allowMultiple />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
