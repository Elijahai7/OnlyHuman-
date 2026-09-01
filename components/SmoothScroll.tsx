"use client";

import { ReactLenis } from "lenis/react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Page-level eased scroll, matching the measured Good Life Meds behavior
 * (GOODLIFE-INTERACTION-AUDIT.md §1): the reference site runs the actual
 * Lenis library for its global smooth-scroll feel, so this uses the same
 * library rather than approximating the effect.
 *
 * Always renders the same `<ReactLenis>` wrapper (never branches to a
 * plain fragment) — swapping the whole app between two different root
 * component types based on a reduced-motion read is exactly the pattern
 * that causes real hydration bugs (see lib/usePrefersReducedMotion.ts),
 * and here the blast radius would be the entire page tree remounting.
 * Instead, reduced-motion visitors get the same Lenis instance configured
 * to be effectively instant (no lerp, no eased wheel), which is the
 * practical equivalent of "no smooth-scroll" without an unmount/remount.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <ReactLenis
      root
      options={
        prefersReducedMotion
          ? { lerp: 1, duration: 0, smoothWheel: false }
          : { lerp: 0.1, duration: 1.1, smoothWheel: true }
      }
    >
      {children}
    </ReactLenis>
  );
}
