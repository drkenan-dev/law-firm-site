"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { navigation, consultationHref } from "@/data/firm";
import { firm } from "@/lib/content";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  isActive: (href: string) => boolean;
};

/**
 * Full-screen mobile navigation panel.
 * Rendered by <Navbar>; controlled via `open` and closed on route change.
 */
export default function MobileMenu({ open, isActive }: MobileMenuProps) {
  return (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-navy-950 pt-24 transition-opacity duration-300 lg:hidden",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!open}
    >
      <div className="container-site flex-1 overflow-y-auto pb-10 no-scrollbar">
        <nav aria-label="Mobile navigation">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {navigation.map((item, index) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    tabIndex={open ? 0 : -1}
                    className={cn(
                      "flex items-center justify-between py-4 text-lg font-medium transition-colors",
                      active ? "text-gold-300" : "text-white/85 hover:text-gold-300",
                    )}
                  >
                    <span>{item.label}</span>
                    <span
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-sm text-xs",
                        active ? "bg-gold-500/20 text-gold-300" : "text-white/40",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href={consultationHref}
            tabIndex={open ? 0 : -1}
            className="mt-6 flex items-center justify-center gap-2 bg-gold-500 px-6 py-4 text-base font-semibold text-navy-950 transition-colors hover:bg-gold-400"
          >
            Schedule a Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>

        <div className="mt-10 space-y-3 border-t border-white/10 pt-8 text-sm text-white/70">
          <a
            href={`tel:${firm.phone}`}
            tabIndex={open ? 0 : -1}
            className="flex items-center gap-3 transition-colors hover:text-gold-300"
          >
            <Phone className="h-4 w-4 text-gold-400" aria-hidden="true" /> {firm.phone}
          </a>
          <a
            href={`mailto:${firm.email}`}
            tabIndex={open ? 0 : -1}
            className="flex items-center gap-3 transition-colors hover:text-gold-300"
          >
            <Mail className="h-4 w-4 text-gold-400" aria-hidden="true" /> {firm.email}
          </a>
          <p className="flex items-center gap-3">
            <MapPin className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
            {firm.address.street}, {firm.address.city}, {firm.address.country}
          </p>
        </div>
      </div>
    </div>
  );
}