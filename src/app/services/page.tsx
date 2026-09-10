import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import PracticeAreaCard from "@/components/ui/PracticeAreaCard";
import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/site";
import { practiceAreas } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "The services offered by Crestline Law Partners — full legal support across corporate, dispute, property, family and more.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Legal Services, Delivered With Precision"
        description="A full-service firm with the depth of a larger practice and the personal attention clients want. Explore the services we provide and how we can help."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
        image="/images/hero/hero-interior.svg"
      />

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="How We Serve"
              title="Every Engagement, Handled Properly"
              description="Whatever the matter, our approach is consistent: understand the goal, prepare thoroughly, communicate clearly and deliver."
            />
            <ul className="mt-7 space-y-3">
              {[
                "A named attorney for every matter",
                "Transparent fee arrangements agreed up front",
                "Updates at every meaningful stage",
                "Practical advice — not just legal analysis",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                  <span className="text-sm text-charcoal-700">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact" variant="navy">
                Discuss a Matter <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {practiceAreas.map((area, index) => (
              <Reveal key={area.slug} delay={(index % 2) * 80}>
                <PracticeAreaCard area={area} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process overview */}
      <section className="bg-navy-950 py-20 text-white lg:py-24">
        <div className="container-site">
          <SectionHeading
            light
            align="center"
            eyebrow="Our Process"
            title="How We Work With You"
            description="From first contact to resolution, you always know where your matter stands."
          />
          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Consultation", text: "We listen, review your documents and give you honest, practical first advice." },
              { step: "02", title: "Strategy", text: "We set out options, costs and timelines so you can decide with confidence." },
              { step: "03", title: "Execution", text: "Your named attorney drives the matter forward and keeps you informed throughout." },
              { step: "04", title: "Resolution", text: "We see matters through to agreement, judgment or transaction close — and beyond." },
            ].map((item, index) => (
              <Reveal
                key={item.step}
                delay={(index % 4) * 90}
                className="relative rounded-md border border-white/10 bg-white/[0.04] p-7"
              >
                <span className="font-serif text-3xl text-gold-400">{item.step}</span>
                <h3 className="mt-3 font-serif text-xl text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{item.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CTASection />
    </>
  );
}