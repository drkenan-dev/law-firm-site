"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { Faq } from "@/data/faqs";
import { cn } from "@/lib/utils";

type FAQAccordionProps = {
  items: Faq[];
  className?: string;
};

/** Accessible accordion — multiple panels can be open at once. */
export default function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-md border bg-white transition-colors",
              isOpen ? "border-gold-500/60" : "border-line",
            )}
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-serif text-base leading-snug text-navy-900 sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border transition-colors",
                    isOpen
                      ? "border-gold-500 bg-gold-500 text-navy-950"
                      : "border-line bg-paper text-navy-900",
                  )}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-charcoal-500 sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}