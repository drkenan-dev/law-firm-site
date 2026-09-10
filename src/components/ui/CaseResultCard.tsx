import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";
import type { CaseResult } from "@/data/cases";
import { getPracticeArea } from "@/lib/content";

type CaseResultCardProps = {
  caseResult: CaseResult;
};

export default function CaseResultCard({ caseResult }: CaseResultCardProps) {
  const area = getPracticeArea(caseResult.practiceAreaSlug);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={caseResult.image}
          alt=""
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-sm bg-navy-950/85 px-2.5 py-1 text-xs font-semibold tracking-wide text-gold-300 uppercase backdrop-blur">
          {caseResult.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-lg leading-snug text-navy-900">
          <Link href={`/case-results#${caseResult.slug}`} className="transition-colors hover:text-gold-600">
            {caseResult.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-500">
          {caseResult.description}
        </p>

        <div className="mt-4 flex items-start gap-2 rounded-sm bg-paper p-3.5">
          <Scale className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
          <p className="text-sm leading-relaxed text-navy-900">
            <span className="font-semibold">Result: </span>
            {caseResult.result}
          </p>
        </div>

        {area && (
          <Link
            href={`/practice-areas/${area.slug}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-700"
          >
            {area.name}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}