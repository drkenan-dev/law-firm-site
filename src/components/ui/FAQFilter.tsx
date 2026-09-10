"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Faq } from "@/data/faqs";
import FAQAccordion from "./FAQAccordion";
import { cn } from "@/lib/utils";

type FAQFilterProps = {
  items: Faq[];
  categories: readonly string[];
};

/**
 * Searchable + filterable FAQ listing.
 * Search matches question/answer text; category chips filter by group.
 */
export default function FAQFilter({ items, categories }: FAQFilterProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery =
        q === "" ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [items, query, category]);

  return (
    <div className="mx-auto mt-10 max-w-3xl">
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-charcoal-500/60" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search questions…"
          aria-label="Search frequently asked questions"
          className="w-full rounded-sm border border-line bg-white py-3.5 pl-12 pr-4 text-sm text-charcoal-900 shadow-sm transition-colors placeholder:text-charcoal-500/60 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {["All", ...categories].map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setCategory(label)}
            aria-pressed={category === label}
            className={cn(
              "rounded-sm border px-4 py-2 text-sm font-medium transition-colors",
              category === label
                ? "border-navy-900 bg-navy-900 text-white"
                : "border-line bg-white text-charcoal-700 hover:border-gold-500 hover:text-gold-600",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {filtered.length > 0 ? (
          <FAQAccordion items={filtered} />
        ) : (
          <div className="rounded-md border border-line bg-paper p-10 text-center">
            <p className="font-serif text-xl text-navy-900">No matching questions</p>
            <p className="mt-2 text-sm text-charcoal-500">
              Try a different search term or category, or contact us directly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}