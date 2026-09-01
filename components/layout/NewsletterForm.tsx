"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

/**
 * Presentational newsletter signup. No email-service-provider integration
 * exists yet — this intentionally does not call any API. Wire this up to
 * OnlyHuman's real ESP (and only then) during a later build phase; until
 * then it just acknowledges the input locally so the UI can be reviewed.
 */
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO(onlyhuman): connect to a real email service provider before launch.
    setStatus("submitted");
  }

  if (status === "submitted") {
    return <p className="text-sm text-ink-muted">Thanks — we&apos;ll be in touch.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <label htmlFor="newsletter-email" className="text-eyebrow text-ink-muted">
        Stay in touch
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className="w-full min-w-0 rounded-button border border-border bg-background px-3 py-2 text-sm text-ink placeholder:text-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        />
        <Button type="submit" variant="secondary" size="sm" className="flex-shrink-0">
          Sign up
        </Button>
      </div>
    </form>
  );
}
