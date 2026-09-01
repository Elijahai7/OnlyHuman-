/**
 * Site-wide constants used by metadata, structured data, and layout.
 * Single source of truth — never hardcode these strings elsewhere.
 */
export const SITE_NAME = "OnlyHuman";
export const SITE_TAGLINE = "Your body is not your identity. Your body is your stewardship.";
export const SITE_DESCRIPTION =
  "OnlyHuman is a telehealth platform connecting patients with licensed providers for prescription weight-loss and daily-wellness treatment, delivered 100% online.";

// TODO(onlyhuman): replace with the confirmed production domain before launch.
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.onlyhuman.com";

export const SOCIAL_LINKS: { platform: string; url: string }[] = [
  // TODO(onlyhuman): add real, live social profile URLs before launch.
  // Left empty rather than fabricated — see GOODLIFE-PARITY-CHECKLIST.md §9.
];
