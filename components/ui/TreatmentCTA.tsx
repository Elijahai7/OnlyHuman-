import { TREATMENT_ROUTES, PORTAL_LOGIN_URL, PORTAL_LOGIN_URL_CONFIGURED } from "@/config/treatments";
import { Button, type ButtonProps } from "./Button";

interface CtaStyleProps {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  children: React.ReactNode;
}

interface TreatmentCTAProps extends CtaStyleProps {
  treatmentSlug: string;
}

/**
 * The ONLY component allowed to resolve a treatment's outbound telehealth
 * URL. Every "Get Started" CTA in the app must go through this component
 * (or PortalLoginLink below) rather than reading config/treatments.ts or
 * hardcoding a URL directly — see ONLYHUMAN-TECHNICAL-ARCHITECTURE.md §4.
 *
 * While a treatment's URL is still a placeholder (telehealthUrlConfigured
 * is false, the shipped default), this renders a disabled "Coming soon"
 * button instead of a dead or fake link.
 */
export function TreatmentCTA({ treatmentSlug, children, ...styleProps }: TreatmentCTAProps) {
  const route = TREATMENT_ROUTES[treatmentSlug];

  if (!route || !route.telehealthUrlConfigured || !route.telehealthUrl) {
    return (
      <Button type="button" disabled aria-disabled="true" title="Online visit coming soon" {...styleProps}>
        {children} · Coming soon
      </Button>
    );
  }

  return (
    <Button href={route.telehealthUrl} {...styleProps}>
      {children}
    </Button>
  );
}

/** Header/footer "Log In" link — same resolution pattern as TreatmentCTA. */
export function PortalLoginLink({ children, ...styleProps }: CtaStyleProps) {
  if (!PORTAL_LOGIN_URL_CONFIGURED || !PORTAL_LOGIN_URL) {
    return (
      <Button type="button" disabled aria-disabled="true" title="Patient login coming soon" {...styleProps}>
        {children}
      </Button>
    );
  }

  return (
    <Button href={PORTAL_LOGIN_URL} {...styleProps}>
      {children}
    </Button>
  );
}
