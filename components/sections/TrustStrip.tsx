/**
 * Trust-claim strip. Structural pattern matches the measured Good Life
 * Meds homepage (a short row of operational facts just below the hero —
 * GOODLIFE-SITEMAP.md §homepage). Copy is OnlyHuman's own and limited to
 * claims about the service model already established for this build
 * (100% online, licensed-provider review, discreet delivery) — no
 * subscriber counts or other numbers that aren't confirmed facts.
 *
 * TODO(onlyhuman): confirm each claim below is accurate to OnlyHuman's
 * actual operations before launch.
 */
const CLAIMS = [
  "100% online visits",
  "Licensed U.S. providers",
  "Discreet, direct-to-door shipping",
  "Transparent pricing, no hidden fees",
];

export function TrustStrip() {
  return (
    <section aria-label="Why OnlyHuman" className="border-b border-border bg-surface">
      <div className="container flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 text-center">
        {CLAIMS.map((claim) => (
          <p key={claim} className="text-eyebrow text-ink-muted">
            {claim}
          </p>
        ))}
      </div>
    </section>
  );
}
