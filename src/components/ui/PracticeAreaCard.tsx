import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PracticeArea } from "@/data/practiceAreas";

type PracticeAreaCardProps = {
  area: PracticeArea;
};

export default function PracticeAreaCard({ area }: PracticeAreaCardProps) {
  const Icon = area.icon;

  return (
    <article data-grid-card className="group relative h-full overflow-hidden rounded-md border border-line bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/60 hover:shadow-card-lg">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-gold-500 to-gold-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy-950 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-serif text-lg leading-snug text-navy-900">
        <Link href={`/practice-areas/${area.slug}`} className="transition-colors hover:text-gold-600">
          {area.name}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-charcoal-500">{area.description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
        <Link
          href={`/practice-areas/${area.slug}`}
          className="inline-flex items-center gap-1.5 transition-colors hover:text-gold-700"
        >
          Learn More
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </span>
    </article>
  );
}