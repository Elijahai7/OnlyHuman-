import { type ClassValue, clsx } from "clsx";

/** Small classnames helper. Kept as a single wrapper so a future switch to
 * tailwind-merge (if class conflicts become an issue) is a one-file change. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
