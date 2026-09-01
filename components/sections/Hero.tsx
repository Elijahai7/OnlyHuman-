import { Button } from "@/components/ui/Button";

/**
 * Homepage hero. Structure mirrors the measured Good Life Meds homepage
 * (GOODLIFE-SITEMAP.md §homepage / GOODLIFE-PARITY-CHECKLIST.md §2):
 * full-bleed cinematic media, a minimal two-line headline, one primary
 * CTA — restrained, not stacked with secondary CTAs or badges over the
 * video itself (those live in the trust-claim strip just below).
 *
 * Video: approved OnlyHuman footage. WebM/VP9 (original) + an H.264 MP4
 * encoded from the exact same footage (approved format fallback, no
 * creative change) so Safari/iOS get a working source. `poster` is a
 * frame pulled from this same footage, shown before playback starts and
 * as the reduced-motion/no-JS fallback image.
 */
export function Hero() {
  return (
    <section className="relative flex h-[92vh] min-h-[560px] w-full items-end overflow-hidden text-white">
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero/onlyhuman-homepage-hero-poster.jpg"
      >
        <source src="/images/hero/onlyhuman-homepage-hero.webm" type="video/webm" />
        <source src="/images/hero/onlyhuman-homepage-hero.mp4" type="video/mp4" />
      </video>

      {/* Static fallback for prefers-reduced-motion: same footage, still frame. */}
      <div
        className="absolute inset-0 hidden h-full w-full bg-cover bg-center motion-reduce:block"
        style={{ backgroundImage: "url(/images/hero/onlyhuman-homepage-hero-poster.jpg)" }}
        aria-hidden="true"
      />

      {/* Scrim for text legibility over the footage. */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      <div className="container relative z-10 pb-16 max-md:pb-10">
        <h1 className="max-w-2xl text-white">
          Steward Your Body
          <br />
          Live Out Your Purpose
        </h1>
        <div className="mt-8">
          <Button href="#treatments" variant="onMedia" size="md">
            Find your treatment
          </Button>
        </div>
      </div>
    </section>
  );
}
