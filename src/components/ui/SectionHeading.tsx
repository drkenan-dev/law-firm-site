import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
};

/** Consistent eyebrow + title + description heading used across sections. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase",
            align === "center" && "justify-center",
            light ? "text-gold-400" : "text-gold-600",
          )}
        >
          <span aria-hidden="true" className="h-px w-8 bg-gold-500" />
          {eyebrow}
          {align === "center" && <span aria-hidden="true" className="h-px w-8 bg-gold-500" />}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-3xl leading-tight text-balance sm:text-4xl",
          light ? "text-white" : "text-navy-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            light ? "text-white/70" : "text-charcoal-500",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}