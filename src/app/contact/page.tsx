import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/forms/ContactForm";
import ConsultationForm from "@/components/forms/ConsultationForm";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/site";
import { firm } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us",
  description:
    "Contact Crestline Law Partners — get in touch by phone, email or visit us in Accra. Schedule a confidential consultation today.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's Talk About Your Matter"
        description="Questions, consultations and case enquiries are welcome. Reach us by phone, email or the forms below — we respond within one business day."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        image="/images/hero/hero-interior.svg"
      />

      {/* Contact info cards */}
      <section className="container-site grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: MapPin,
            title: "Office Address",
            lines: [firm.address.street, `${firm.address.city}, ${firm.address.country}`],
            href: `https://maps.google.com/?q=${encodeURIComponent(`${firm.address.street}, ${firm.address.city}, ${firm.address.country}`)}`,
            linkLabel: "Open in Google Maps",
            external: true,
          },
          {
            icon: Phone,
            title: "Phone",
            lines: [firm.phone],
            href: `tel:${firm.phone}`,
            linkLabel: firm.phone,
          },
          {
            icon: Mail,
            title: "Email",
            lines: [firm.email],
            href: `mailto:${firm.email}`,
            linkLabel: firm.email,
          },
          {
            icon: Clock,
            title: "Office Hours",
            lines: firm.hours.map((row) => `${row.days}: ${row.time}`),
          },
        ].map((card, index) => (
          <Reveal key={card.title} delay={(index % 4) * 70}>
            <div className="flex h-full flex-col rounded-md border border-line bg-white p-6 shadow-card">
              <card.icon className="h-7 w-7 text-gold-600" aria-hidden="true" />
              <h2 className="mt-4 text-xs font-semibold tracking-[0.18em] text-navy-900 uppercase">
                {card.title}
              </h2>
              <div className="mt-3 flex-1 space-y-1">
                {card.lines.map((line) => (
                  <p key={line} className="text-sm text-charcoal-500">
                    {line}
                  </p>
                ))}
              </div>
              {card.href && (
                <a
                  href={card.href}
                  target={card.external ? "_blank" : undefined}
                  rel={card.external ? "noopener noreferrer" : undefined}
                  className="mt-4 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-700"
                >
                  {card.linkLabel}
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </section>

      {/* Contact form */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="General Enquiries"
              title="Send Us a Message"
              description="Use this form for general enquiries. Prefer to book a meeting? Use the consultation form on this page."
            />
            <div className="mt-6 rounded-md border border-line bg-cream p-6 text-sm leading-relaxed text-charcoal-500">
              <p className="font-semibold text-navy-900">Good to know</p>
              <ul className="mt-3 space-y-2">
                <li>• We respond within one business day.</li>
                <li>• All enquiries are treated confidentially.</li>
                <li>• Submitting a form does not create an attorney-client relationship.</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-md border border-line bg-white p-6 shadow-card sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Consultation form */}
      <section id="consultation" className="border-y border-line bg-navy-950 scroll-mt-24">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:py-24">
          <Reveal>
            <SectionHeading
              light
              eyebrow="Schedule a Consultation"
              title="Book a Confidential Consultation"
              description="Tell us about your matter and choose a time that suits you. A member of our team will confirm your appointment within one business day."
            />
            <div className="mt-6 flex items-start gap-3 rounded-md border border-gold-500/40 bg-gold-300/10 p-5 text-sm leading-relaxed text-white/80">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
              <p>
                Consultations are held at {firm.address.street}, {firm.address.city}, or remotely by
                video call or telephone.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-md border border-white/10 bg-white p-6 shadow-card sm:p-8">
              <ConsultationForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}