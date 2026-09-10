import { cn } from "@/lib/utils";
import Breadcrumbs, { type BreadcrumbItem } from "./Breadcrumbs";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  image?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
};

/**
 * Navy hero banner used at the top of every interior page.
 * Includes breadcrumbs and a subtle image overlay.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  align = "left",
  children,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden="true" className="absolute inset-0">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-full w-full object-cover opacity-25" />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-950/85 to-navy-900/60" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
      </div>

      <div
        className={cn(
          "container-site relative pt-32 pb-14 sm:pt-40 sm:pb-20",
          align === "center" && "text-center",
        )}
      >
        {breadcrumbs ? (
          <div className={cn("mb-8", align === "center" && "flex justify-center")}>
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : null}

        {eyebrow && (
          <p
            className={cn(
              "mb-3 flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-gold-400 uppercase",
              align === "center" && "justify-center",
            )}
          >
            <span aria-hidden="true" className="h-px w-8 bg-gold-500" />
            {eyebrow}
          </p>
        )}

        <h1 className="font-serif text-4xl leading-tight text-balance sm:text-5xl lg:text-[3.4rem]">
          {title}
        </h1>

        {description && (
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        )}

        {children}
      </div>
    </header>
  );
}