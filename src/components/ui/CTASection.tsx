import Button from "./Button";
import { consultationHref } from "@/data/firm";

type CTASectionProps = {
  title?: string;
  description?: string;
};

/** Reusable bottom-of-page call-to-action band. */
export default function CTASection({
  title = "Ready to discuss your legal matter?",
  description = "Schedule a confidential consultation with one of our attorneys. We will listen carefully, explain your options clearly, and advise you on the best path forward.",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_15%_20%,rgba(201,170,107,0.18),transparent_55%)]" />
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full border border-gold-500/20" />
        <div className="absolute bottom-0 left-1/4 h-px w-2/3 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      </div>

      <div className="container-site relative py-16 text-center sm:py-20">
        <h2 className="mx-auto max-w-2xl font-serif text-3xl leading-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={consultationHref} variant="gold" size="lg">
            Schedule a Consultation
          </Button>
          <Button href="/contact" variant="outlineLight" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}