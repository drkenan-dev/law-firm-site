"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Mail, Clock } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { navigation, consultationHref } from "@/data/firm";
import { firm } from "@/lib/content";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/**
 * Sticky primary navigation. Links come from data/firm.ts → navigation.
 * Highlights the active page, gains a shadow on scroll, and opens the
 * mobile menu below the `md` breakpoint.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile menu whenever the route changes (React-recommended
  // "adjust state during render" pattern — avoids a setState-in-effect).
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = useCallback(
    (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href)),
    [pathname],
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Utility bar */}
        <div className="hidden bg-navy-950 text-white/70 md:block">
          <div className="container-site flex items-center justify-between gap-6 py-2 text-xs">
            <div className="flex items-center gap-6">
              <a href={`tel:${firm.phone}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-gold-300">
                <Phone className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                {firm.phone}
              </a>
              <a href={`mailto:${firm.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-gold-300">
                <Mail className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                {firm.email}
              </a>
            </div>
            <div className="flex items-center gap-6">
              <p className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                Mon – Fri: 8:00 AM – 5:00 PM
              </p>
              <span className="h-3 w-px bg-white/20" aria-hidden="true" />
              <a href={`https://maps.google.com/?q=${encodeURIComponent(firm.address.city)}, ${firm.address.country}`} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold-300">
                {firm.address.city}, {firm.address.country}
              </a>
            </div>
          </div>
        </div>

        {/* Main bar */}
        <div
          className={cn(
            "bg-navy-950/95 backdrop-blur transition-shadow duration-300",
            scrolled ? "shadow-lg shadow-navy-950/30" : "shadow-none",
          )}
        >
          <nav
            className="container-site flex items-center justify-between py-3.5"
            aria-label="Main navigation"
          >
            <Logo light />

            <ul className="hidden items-center gap-7 lg:flex">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative py-1.5 text-sm font-medium tracking-wide text-white/85 transition-colors hover:text-gold-300",
                      "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-400 after:transition-transform after:duration-300 hover:after:scale-x-100",
                      isActive(item.href) && "text-gold-300 after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Button href={consultationHref} variant="gold" size="sm" className="hidden sm:inline-flex">
                Schedule a Consultation
              </Button>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-white/20 text-white transition-colors hover:border-gold-400 hover:text-gold-300 lg:hidden"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? (
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        isActive={(href) =>
          href === "/" ? pathname === "/" : pathname.startsWith(href)
        }
      />
    </>
  );
}