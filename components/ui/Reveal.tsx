"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds — for revealing a sequence of siblings. */
  delay?: number;
}

/**
 * Scroll-triggered reveal-on-entry, matching the measured Good Life Meds
 * pattern (GOODLIFE-INTERACTION-AUDIT.md §1/§6: ScrollTrigger-driven
 * section/card fades, applied with restraint — one primitive, reused,
 * not a bespoke animation per section).
 *
 * Always renders the same `motion.div` (never branches to a plain `div`)
 * — see lib/usePrefersReducedMotion.ts for why: switching element types
 * based on a reduced-motion read causes a real hydration bug, not just a
 * cosmetic one. Reduced-motion visitors instead get the same element with
 * animation disabled via `initial={false}`, so content is simply present
 * from first paint with no motion at all.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
