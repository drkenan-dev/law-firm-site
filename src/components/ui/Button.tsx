import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "navy" | "outline" | "outlineLight" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  gold: "bg-gold-500 text-navy-950 hover:bg-gold-400 shadow-sm",
  navy: "bg-navy-900 text-white hover:bg-navy-800 shadow-sm",
  outline:
    "border border-navy-900/25 bg-transparent text-navy-900 hover:border-gold-500 hover:text-gold-600",
  outlineLight:
    "border border-white/40 bg-transparent text-white hover:border-gold-400 hover:text-gold-300",
  ghost: "text-navy-900 hover:text-gold-600",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 disabled:opacity-60 disabled:pointer-events-none";

type ButtonCommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

function classNames(variant: Variant, size: Size, className?: string) {
  return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

type ButtonProps = ButtonCommonProps &
  (
    | ({ href: string } & ComponentProps<typeof Link>)
    | ({ type?: "button" | "submit" | "reset" } & ComponentProps<"button">)
  );

/** Styled anchor (internal/external) or button with consistent variants. */
export default function Button(props: ButtonProps) {
  const { variant = "gold", size = "md", className, children } = props;

  if ("href" in props) {
    const { href, ...rest } = props;
    const external = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classNames(variant, size, className)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props;
  return (
    <button type={type} className={classNames(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}