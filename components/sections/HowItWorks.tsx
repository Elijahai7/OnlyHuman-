import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  {
    number: "01",
    title: "Complete a questionnaire",
    body: "Choose a treatment and complete a short medical intake and health history form.",
  },
  {
    number: "02",
    title: "Provider review",
    body: "A licensed provider reviews your intake and determines whether the treatment is appropriate for you.",
  },
  {
    number: "03",
    title: "Approved & delivered",
    body: "Once approved, your prescription ships in discreet packaging, direct to your door.",
  },
];

/**
 * Three-step process section, matching the measured Good Life Meds
 * "How It Works" pattern (GOODLIFE-SITEMAP.md §homepage / §3.5). Copy
 * describes the general telehealth flow already established for this
 * build, not a specific timeline claim (Good Life states "3-5 business
 * days" — OnlyHuman's copy avoids that specific figure until confirmed).
 */
export function HowItWorks() {
  return (
    <section className="py-[var(--spacing-l)]">
      <Reveal>
        <div className="container">
          <h2 className="max-w-xl">How it works</h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {STEPS.map((step) => (
              <div key={step.number}>
                <p className="text-eyebrow text-ink-muted">{step.number}</p>
                <h3 className="mt-3 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
