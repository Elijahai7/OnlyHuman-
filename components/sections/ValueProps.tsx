import { Reveal } from "@/components/ui/Reveal";

const VALUE_PROPS = [
  {
    title: "Provider-reviewed",
    body: "Every intake is reviewed by a licensed provider before anything is prescribed.",
  },
  {
    title: "Sourced with care",
    body: "Medications are prepared by licensed U.S. pharmacies to consistent quality standards.",
  },
  {
    title: "Discreet delivery",
    body: "Orders ship in plain packaging, direct to your door.",
  },
  {
    title: "Transparent pricing",
    body: "One clear price per treatment — no hidden fees, no surprise renewals.",
  },
];

/**
 * Four-item value-proposition grid. Layout matches the measured Good Life
 * Meds pattern (icon/heading/copy, 4 columns desktop — GOODLIFE-PARITY-
 * CHECKLIST.md §2); copy is OnlyHuman's own and limited to claims about
 * the already-established service model.
 */
export function ValueProps() {
  return (
    <section className="border-y border-border bg-surface py-[var(--spacing-l)]">
      <Reveal>
        <div className="container grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((item) => (
            <div key={item.title}>
              <h3 className="text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
