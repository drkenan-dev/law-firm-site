import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CTASection from "@/components/ui/CTASection";
import Reveal from "@/components/Reveal";
import Button from "@/components/ui/Button";
import { getPracticeArea, practiceAreas } from "@/lib/content";
import { buildMetadata } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) return buildMetadata({ title: "Practice Area Not Found", description: "Practice area not found." });
  return buildMetadata({
    title: area.name,
    description: area.description,
    path: `/practice-areas/${area.slug}`,
  });
}

export default async function PracticeAreaDetailPage({ params }: Props) {
  const { slug } = await params;
  const area = getPracticeArea(slug);
  if (!area) notFound();

  const currentIndex = practiceAreas.findIndex((a) => a.slug === area.slug);
  const nextArea = practiceAreas[(currentIndex + 1) % practiceAreas.length];

  const faqItems = area.faqs.map((faq, index) => ({
    id: `${area.slug}-faq-${index}`,
    category: "Practice Area",
    ...faq,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Practice Area"
        title={area.name}
        description={area.tagline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Practice Areas", href: "/practice-areas" },
          { label: area.name },
        ]}
      />

      {/* Introduction */}
      <section className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <Reveal>
          <SectionHeading eyebrow="Introduction" title={`${area.name} at ${"Crestline Law Partners"}`} />
          <p className="mt-4 leading-relaxed text-charcoal-700">{area.introduction}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href="/contact#consultation" variant="navy">
              Discuss Your Matter
            </Button>
            <Button href="/attorneys" variant="ghost">
              Meet Our Attorneys <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
        <Reveal delay={120} className="relative">
          <div aria-hidden="true" className="absolute -left-4 -bottom-4 h-28 w-28 rounded-sm border-b-2 border-l-2 border-gold-500/60" />
          <Image
            src={area.image}
            alt={`${area.name} illustration`}
            width={800}
            height={500}
            unoptimized
            className="relative rounded-md shadow-card-lg"
          />
        </Reveal>
      </section>

      {/* Our Experience */}
      <section className="bg-navy-950 py-16 text-white lg:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading light eyebrow="Our Experience" title="Experience That Matters" />
            <p className="mt-4 leading-relaxed text-white/70">{area.experience.text}</p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {area.experience.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3 rounded-sm border border-white/10 bg-white/[0.05] p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-white/85">{highlight}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* How we help */}
      <section className="container-site py-20 lg:py-24">
        <SectionHeading
          eyebrow="How We Help"
          title="How We Help Clients"
          description="A practical, client-first approach on every engagement."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {area.howWeHelp.map((item, index) => (
            <Reveal
              key={item}
              delay={(index % 2) * 80}
              className="flex items-start gap-4 rounded-md border border-line bg-cream p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-navy-950 font-serif text-gold-300">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="pt-2 text-sm leading-relaxed text-charcoal-700 sm:text-base">{item}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services provided */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Services Provided"
              description="Specific services under this practice area, tailored to each client's circumstances."
            />
            <div className="mt-8">
              <Button href="/contact#consultation" variant="gold">
                Request a Consultation
              </Button>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul className="grid gap-3">
              {area.services.map((service) => (
                <li
                  key={service}
                  className="flex items-center gap-3 rounded-sm border border-line bg-white px-5 py-4 text-sm font-medium text-navy-900 shadow-card"
                >
                  <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                  {service}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Why choose our firm */}
      <section className="container-site py-20 lg:py-24">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Why Clients Choose Our Firm"
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {area.whyChooseUs.map((reason, index) => (
            <Reveal
              key={reason}
              delay={(index % 2) * 80}
              className="flex items-start gap-3 rounded-md border border-line bg-white p-6 shadow-card"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-charcoal-700 sm:text-base">{reason}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Representative matters */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Proven Results"
            title="Representative Matters"
            description="Illustrative examples of engagements in this practice area. Outcomes depend on the specific facts of each case."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {area.representativeMatters.map((matter, index) => (
              <Reveal
                key={matter.title}
                delay={(index % 2) * 80}
                className="flex flex-col gap-4 rounded-md border border-line bg-white p-7 shadow-card"
              >
                <p className="font-serif text-lg leading-snug text-navy-900">{matter.title}</p>
                <p className="flex items-start gap-2.5 rounded-sm bg-cream p-3.5 text-sm leading-relaxed text-charcoal-700">
                  <span className="font-semibold text-navy-900">Result:</span>
                  {matter.result}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="container-site py-20 lg:py-24">
        <SectionHeading
          eyebrow="Common Questions"
          title={`${area.name} — Frequently Asked Questions`}
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* Next practice area */}
      <section className="border-t border-line bg-cream">
        <div className="container-site flex flex-col items-center justify-between gap-6 py-10 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">Explore More</p>
            <Link
              href={`/practice-areas/${nextArea.slug}`}
              className="mt-1 inline-block font-serif text-2xl text-navy-900 transition-colors hover:text-gold-600"
            >
              {nextArea.name}
            </Link>
          </div>
          <Link
            href={`/practice-areas/${nextArea.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-700"
          >
            Next Practice Area <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <CTASection
        title={`Need help with ${area.name.toLowerCase()}?`}
        description="Our attorneys are ready to advise you. Schedule a confidential consultation to discuss your matter."
      />
    </>
  );
}