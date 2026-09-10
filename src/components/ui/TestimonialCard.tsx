import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

/** Star rating. `aria-hidden` — the numeric rating is announced in text. */
function Rating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn("h-4 w-4", i < value ? "fill-gold-500 text-gold-500" : "text-line")}
        />
      ))}
    </div>
  );
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <figure className="flex h-full flex-col rounded-md border border-line bg-white p-7 shadow-card">
      <div className="flex items-center justify-between">
        <span className="relative h-8 w-8 rounded-sm bg-paper text-gold-600" aria-hidden="true">
          <Quote className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2" />
        </span>
        <div className="flex items-center gap-1.5">
          <Rating value={testimonial.rating} />
          <span className="sr-only">Rated {testimonial.rating} out of 5</span>
        </div>
      </div>

      <blockquote className="mt-5 flex-1">
        <p className="text-[0.95rem] leading-relaxed text-charcoal-700">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 font-serif text-sm text-gold-300"
        >
          {testimonial.name
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")}
        </span>
        <div>
          <p className="text-sm font-semibold text-navy-900">{testimonial.name}</p>
          <p className="text-xs text-charcoal-500">{testimonial.position}</p>
        </div>
      </figcaption>
    </figure>
  );
}