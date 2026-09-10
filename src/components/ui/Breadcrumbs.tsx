import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = { label: string; href?: string };

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

/** Breadcrumb trail for interior pages. Final item is rendered as plain text. */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && (
                <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-white/40" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-gold-400"
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-gold-300" : ""}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}