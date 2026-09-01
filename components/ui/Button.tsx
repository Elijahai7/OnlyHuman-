import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * Core button primitive. Matches the measured Good Life Meds button system
 * (GOODLIFE-DESIGN-SYSTEM.md §5): near-square radius, transparent
 * outline-first secondary style that fills solid on hover, and a single
 * higher-emphasis "signature" variant reserved for the primary conversion
 * CTA rather than used everywhere.
 */
const buttonStyles = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-button font-heading font-medium",
    "transition-all duration-300 ease-out",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: "bg-surface-dark text-white hover:bg-ink",
        secondary: "bg-transparent text-ink border border-ink/20 hover:bg-surface-dark hover:text-white hover:border-surface-dark",
        signature: "bg-surface-dark text-white hover:bg-weight-loss",
        ghost: "bg-transparent text-ink hover:bg-surface",
        /** For use over photo/video media (e.g. the hero) — a solid
         * light chip that reads on top of a dark scrim. Kept as its own
         * variant rather than a className override: two utility classes
         * from the same Tailwind layer (e.g. bg-white vs. bg-surface-dark)
         * don't reliably override each other by source order alone. */
        onMedia: "bg-white text-ink hover:bg-white/90",
      },
      size: {
        md: "px-6 py-3 text-[1rem] leading-none",
        sm: "px-4 py-2 text-sm leading-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonOwnProps = VariantProps<typeof buttonStyles> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonOwnProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = ButtonOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** Internal vs. external is inferred from the href: a leading "/" (or "#")
 * uses Next's Link for client-side navigation/prefetching; anything else
 * (the telehealth app, the patient portal, mailto:, etc.) is a plain <a>. */
function isInternalHref(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export function Button({ className, variant, size, children, ...props }: ButtonProps) {
  const classes = cn(buttonStyles({ variant, size }), className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props;
    if (isInternalHref(href)) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const { ...buttonProps } = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
