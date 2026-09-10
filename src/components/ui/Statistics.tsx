import { statistics } from "@/lib/content";
import type { Statistic } from "@/data/firm";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

type StatisticsProps = {
  items?: Statistic[];
  variant?: "gold" | "navy" | "overlay";
  className?: string;
};

/**
 * Statistics band. `variant` controls the background style:
 *  - "overlay" is used on the home page over a navy backdrop.
 *  - "gold"/"navy" are used on solid bands.
 * Values come from /src/data/firm.ts → statistics.
 */
export default function Statistics({
  items = statistics,
  variant = "overlay",
  className,
}: StatisticsProps) {
  const isGold = variant === "gold";
  const isNavy = variant === "navy";

  return (
    <div
      className={cn(
        "grid grid-cols-2 divide-line lg:grid-cols-4",
        isGold
          ? "bg-gold-500 text-navy-950"
          : isNavy
            ? "bg-navy-900 text-white"
            : "divide-white/10 bg-white/95 text-white shadow-card-lg backdrop-blur",
        className,
      )}
    >
      {items.map((stat, index) => (
        <Reveal
          key={stat.label}
          delay={index * 80}
          className={cn(
            "px-6 py-8 text-center sm:px-8 sm:py-10",
            index !== 0 && (isGold || isNavy) && "lg:border-l lg:border-current/10",
          )}
        >
          <p className="font-serif text-3xl leading-none sm:text-4xl lg:text-[2.75rem]">
            {stat.value}
          </p>
          <p
            className={cn(
              "mt-2 text-xs font-semibold tracking-[0.14em] uppercase sm:text-sm",
              isGold ? "text-navy-900/80" : "text-white/65",
            )}
          >
            {stat.label}
          </p>
        </Reveal>
      ))}
    </div>
  );
}