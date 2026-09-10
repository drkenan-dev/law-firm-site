import Link from "next/link";
import { Scale } from "lucide-react";
import { firm } from "@/lib/content";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** Light variant for dark backgrounds. */
  light?: boolean;
  className?: string;
};

/** Brand mark + wordmark. Wordmark text is driven by data/firm.ts. */
export default function Logo({ light = false, className }: LogoProps) {
  const [first, ...rest] = firm.name.split(" ");
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${firm.name} — Home`}
    >
      <span
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-sm transition-colors duration-300",
          light ? "bg-gold-500 text-navy-950" : "bg-navy-950 text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950",
        )}
        aria-hidden="true"
      >
        <Scale className="h-6 w-6" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-xl tracking-wide",
            light ? "text-white" : "text-navy-900",
          )}
        >
          {first}{" "}
          <span className={light ? "text-gold-300" : "text-gold-600"}>{rest.join(" ")}</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-semibold tracking-[0.3em] uppercase",
            light ? "text-white/60" : "text-charcoal-500",
          )}
        >
          Attorneys &amp; Counsel
        </span>
      </span>
    </Link>
  );
}