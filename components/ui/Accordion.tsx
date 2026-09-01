"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface AccordionItemData {
  question: string;
  answer: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  /** Multiple open panels at once (recommended for long FAQ lists — see
   * GOODLIFE-INTERACTION-AUDIT.md §4) vs. single-open accordion behavior. */
  allowMultiple?: boolean;
  className?: string;
}

/**
 * Accessible accordion primitive. Mirrors the measured Good Life Meds
 * mechanism (GOODLIFE-INTERACTION-AUDIT.md §4): closed panels animate via
 * CSS grid-template-rows (0fr -> 1fr) rather than max-height, so there's no
 * need to measure content height in JS and no animation-easing artifacts.
 * Built on real <button aria-expanded aria-controls> semantics regardless
 * of what the reference site does under the hood.
 */
export function Accordion({ items, allowMultiple = true, className }: AccordionProps) {
  const baseId = useId();
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenIndexes((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <ul className={cn("w-full", className)}>
      {items.map((item, index) => {
        const isOpen = openIndexes.has(index);
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li key={index} className="border-t border-dotted border-border first:border-t-0">
            <h3 className="m-0">
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-heading text-lg text-ink transition-colors hover:text-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-6 w-6 flex-shrink-0 items-center justify-center transition-transform duration-300",
                    isOpen && "rotate-180"
                  )}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
            >
              <div className="overflow-hidden">
                <div className="pb-4 pr-8 text-ink-muted leading-relaxed">{item.answer}</div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
