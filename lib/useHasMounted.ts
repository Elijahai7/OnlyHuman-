import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only once the component has hydrated on the client. Used to gate
 * client-only APIs (e.g. `document.body` for a portal target) without
 * calling setState inside an effect — an external-store snapshot, not an
 * effect side-effect, so it doesn't trigger cascading-render warnings.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
