import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";
import NewsletterForm from "./NewsletterForm";
import { quickLinks, consultationHref } from "@/data/firm";
import { firm, practiceAreas } from "@/lib/content";
import Button from "@/components/ui/Button";

/** Footer with quick links, practice areas, contact info + newsletter. */
export default function Footer() {
  const year = new Date().getFullYear();
  const footerPracticeAreas = practiceAreas.slice(0, 6);

  return (
    <footer className="bg-navy-950 text-white">
      {/* Pre-footer CTA strip */}
      <div className="border-b border-white/10">
        <div className="container-site flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <p className="font-serif text-2xl text-balance sm:text-3xl">
            Have a legal matter that needs attention?
          </p>
          <Button href={consultationHref} variant="gold" size="lg" className="shrink-0">
            Schedule a Consultation
          </Button>
        </div>
      </div>

      {/* Main columns */}
      <div className="container-site grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1.15fr_1.25fr]">
        <div>
          <Logo light />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">
            {firm.description}
          </p>
          <div className="mt-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">
              Follow Us
            </p>
            <SocialLinks className="mt-3" />
          </div>
        </div>

        <nav aria-label="Quick links">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/70 transition-colors hover:text-gold-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Practice areas">
          <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">
            Practice Areas
          </h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {footerPracticeAreas.map((area) => (
              <li key={area.slug}>
                <Link
                  href={`/practice-areas/${area.slug}`}
                  className="text-white/70 transition-colors hover:text-gold-300"
                >
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">
            Contact
          </h3>
          <address className="mt-5 space-y-3.5 text-sm not-italic text-white/70">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <span>
                {firm.address.street}
                <br />
                {firm.address.city}, {firm.address.country}
              </span>
            </p>
            <p>
              <a href={`tel:${firm.phone}`} className="flex items-center gap-3 transition-colors hover:text-gold-300">
                <Phone className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {firm.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${firm.email}`} className="flex items-center gap-3 transition-colors hover:text-gold-300">
                <Mail className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                {firm.email}
              </a>
            </p>
          </address>

          <h3 className="mt-8 text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">
            Office Hours
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {firm.hours.map((row) => (
              <li key={row.days} className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
                <span className="flex justify-between gap-4">
                  <span>{row.days}</span>
                  <span className="text-white/90">{row.time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-white/10">
        <div className="container-site grid gap-6 py-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h3 className="font-serif text-xl text-white">Insights, straight to your inbox</h3>
            <p className="mt-2 max-w-md text-sm text-white/65">
              Occasional updates on business and legal matters. No spam — unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-6 text-xs text-white/55 sm:flex-row">
          <p>
            © {year} {firm.legalName}. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-gold-300">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-gold-300">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}