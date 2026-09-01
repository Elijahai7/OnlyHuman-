"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

interface DragRailProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Momentum drag-scroll rail, matching the measured Good Life Meds product
 * rail (GOODLIFE-INTERACTION-AUDIT.md §1/§3: GSAP Draggable + InertiaPlugin
 * — a horizontal rail you can flick with mouse or touch, which coasts on
 * release rather than stopping dead). Framer Motion's drag+inertia is the
 * matching-quality equivalent for this exact interaction inside a
 * Next.js/React build: same pointer-driven drag-with-momentum feel, without
 * pulling in the full separate GSAP suite for one component. This is a
 * technical substitution of *library*, not a simplification of the
 * *interaction* — real physical inertia on release, not a plain scroll
 * container.
 *
 * Falls back to native horizontal scrolling (no drag physics layered on
 * top) when the visitor prefers reduced motion. Reduced-motion detection
 * uses lib/usePrefersReducedMotion.ts rather than framer-motion's own
 * useReducedMotion — see that file for why: the framer-motion hook reads
 * the media query synchronously on first client render, which mismatches
 * SSR and causes a real hydration bug for reduced-motion visitors, not
 * just a cosmetic one. Both server and first-client-render render the
 * drag-enabled tree; if the visitor does prefer reduced motion, React
 * swaps to the native-scroll tree in an ordinary post-hydration update.
 */
export function DragRail({ children, className }: DragRailProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={cn("overflow-x-auto", className)}>
        <div className="flex gap-4">{children}</div>
      </div>
    );
  }

  return (
    <div ref={constraintsRef} className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex w-fit cursor-grab select-none gap-4 active:cursor-grabbing"
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0.08}
        dragTransition={{ power: 0.35, timeConstant: 260, bounceStiffness: 300, bounceDamping: 40 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
