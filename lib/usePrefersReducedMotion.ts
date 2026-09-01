import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * SSR-hydration-safe replacement for framer-motion's own `useReducedMotion`.
 * That hook reads `window.matchMedia` synchronously on the very first
 * client render, which almost always disagrees with the server-rendered
 * output (the server has no media query info) — React logs a hydration
 * mismatch and, per its own documented behavior, does not patch up the
 * affected attributes, leaving components that branch their render tree
 * on it (e.g. animated vs. static) permanently stuck in whichever state
 * the server guessed. That would affect any real visitor with
 * prefers-reduced-motion enabled, not just automated testing.
 *
 * `useSyncExternalStore` is React's own prescribed fix for this class of
 * bug: both the server render and the client's first hydration pass use
 * `getServerSnapshot` (false), so they always agree; only after hydration
 * commits does React read the real value and schedule an ordinary
 * re-render if it differs — a normal update, not a hydration diff.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
