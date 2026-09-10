import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Attorney } from "@/data/attorneys";
import Button from "./Button";
import SocialIcon from "./SocialIcon";
import { firm } from "@/lib/content";

type AttorneyCardProps = {
  attorney: Attorney;
};

export default function AttorneyCard({ attorney }: AttorneyCardProps) {
  return (
    <article data-attorney-card className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg">
      <Link
        href={`/attorneys/${attorney.slug}`}
        className="relative block aspect-[5/6] overflow-hidden"
        aria-label={`View profile of ${attorney.name}`}
      >
        <Image
          src={attorney.photo}
          alt={`Portrait of ${attorney.name}`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-950/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl text-navy-900">
          <Link
            href={`/attorneys/${attorney.slug}`}
            className="transition-colors hover:text-gold-600"
          >
            {attorney.name}
          </Link>
        </h3>
        <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-gold-600 uppercase">
          {attorney.position}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-500">
          {attorney.summary}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <Button href={`/attorneys/${attorney.slug}`} variant="ghost" size="sm" className="-ml-3">
            View Profile <ArrowUpRight className="h-4 w-4" />
          </Button>
          <a
            href={firm.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${attorney.name} on LinkedIn (dummy link)`}
            className="rounded-sm border border-line p-2 text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-600"
          >
            <SocialIcon name="linkedin" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}