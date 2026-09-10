import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Statistics from "@/components/ui/Statistics";
import CTASection from "@/components/ui/CTASection";
import AttorneyCard from "@/components/ui/AttorneyCard";
import Reveal from "@/components/Reveal";
import Button from "@/components/ui/Button";
import { buildMetadata } from "@/lib/site";
import { timeline, firmValues } from "@/data/firm";
import { firm, attorneys } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "About Our Firm",
  description:
    "Learn about Crestline Law Partners — more than twenty-five years of experienced legal counsel, our mission, values and history.",
  path: "/about",
});

export default function AboutPage() {
  const leadership = attorneys.filter((a) => a.featured);

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="A Firm Built On Trust, Judgment & Results"
        description="For more than a quarter of a century we have advised individuals, businesses and organizations — with the skill of a large firm and the care of a dedicated partner."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image="/images/hero/hero-interior.svg"
      />

      {/* Introduction */}
      <section className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Who We Are"
            title="Counsel You Can Count On, In Every Matter"
            description={firm.description}
          />
          <p className="mt-4 text-base leading-relaxed text-charcoal-500">
            What sets our firm apart is not merely technical ability — it is judgment. We
            understand that behind every case, contract and transaction is a person or family or
            business with real stakes. That understanding shapes how we prepare, how we advise and
            how we communicate.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {["Senior attorneys on every matter", "Fixed-fee options where possible", "Direct partner access", "Responsive, honest advice"].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                <span className="text-charcoal-700">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="relative">
          <div aria-hidden="true" className="absolute -right-4 -top-4 h-28 w-28 rounded-sm border-r-2 border-t-2 border-gold-500/60" />
          <Image
            src="/images/general/about-office.svg"
            alt="Attorneys of the firm reviewing documents in the office"
            width={1200}
            height={900}
            unoptimized
            className="relative rounded-md shadow-card-lg"
          />
        </Reveal>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading align="center" eyebrow="What Guides Us" title="Mission, Vision & Values" />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            <Reveal className="rounded-md border border-line bg-white p-8 shadow-card">
              <p className="text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">Our Mission</p>
              <p className="mt-4 font-serif text-2xl leading-snug text-navy-900">To protect the interests of our clients with uncompromising integrity.</p>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-500">
                We exist to give our clients the confidence to make difficult decisions — knowing their
                legal position is secure and their interests are protected.
              </p>
            </Reveal>
            <Reveal delay={100} className="rounded-md border border-line bg-white p-8 shadow-card">
              <p className="text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">Our Vision</p>
              <p className="mt-4 font-serif text-2xl leading-snug text-navy-900">To be the region&apos;s most trusted legal advisor.</p>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-500">
                We aim to be the firm clients recommend without reservation — for our legal skill, our
                judgment and the way we treat people.
              </p>
            </Reveal>
            <Reveal delay={200} className="rounded-md border border-line bg-white p-8 shadow-card">
              <p className="text-xs font-semibold tracking-[0.22em] text-gold-600 uppercase">Our Standard</p>
              <p className="mt-4 font-serif text-2xl leading-snug text-navy-900">Excellence in preparation, within every matter.</p>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-500">
                Outcomes are won at the desk. We prepare relentlessly, think several moves ahead and
                never improvise with our clients&apos; futures.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {firmValues.map((value, index) => (
              <Reveal
                key={value.title}
                delay={index * 80}
                className="rounded-md border border-line bg-cream p-6 text-center"
              >
                <p className="font-serif text-xl text-navy-900">{value.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-500">{value.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-navy-950">
        <Statistics variant="navy" />
      </section>

      {/* Timeline */}
      <section className="container-site py-20 lg:py-28">
        <SectionHeading
          align="center"
          eyebrow="Our History"
          title="A Quarter Century of Service"
          description="From a two-partner practice to a full-service firm — the milestones that shaped who we are today."
        />
        <div className="relative mx-auto mt-14 max-w-3xl">
          <div aria-hidden="true" className="absolute left-4 top-0 h-full w-px bg-line sm:left-1/2 sm:-translate-x-1/2" />
          <ol className="space-y-10">
            {timeline.map((milestone, index) => (
              <Reveal key={milestone.year} delay={index * 60}>
                <li className="relative pl-12 sm:pl-0">
                  <span
                    aria-hidden="true"
                    className="absolute left-2.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-gold-500 bg-white sm:left-1/2 sm:-translate-x-1/2"
                  />
                  <div
                    className={
                      index % 2 === 0
                        ? "sm:pr-12 sm:text-right sm:[&>p]:ml-auto"
                        : "sm:pl-12"
                    }
                  >
                    <p className="font-serif text-2xl text-gold-600">{milestone.year}</p>
                    <h3 className="mt-1 font-serif text-xl text-navy-900">{milestone.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal-500 sm:ml-0">
                      {milestone.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Leadership"
              title="The Attorneys Behind Our Reputation"
              description="Our partners and senior counsel lead every matter personally, bringing judgment and experience to each engagement."
            />
            <Reveal>
              <Button href="/attorneys" variant="outline" className="shrink-0">
                Meet the Full Team <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((attorney, index) => (
              <Reveal key={attorney.slug} delay={(index % 4) * 80}>
                <AttorneyCard attorney={attorney} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Let us put this experience to work for you"
        description="Whether you are facing a dispute, closing a transaction or planning for the future, our attorneys are ready when you are."
      />
    </>
  );
}