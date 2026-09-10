import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Statistics from "@/components/ui/Statistics";
import PracticeAreaCard from "@/components/ui/PracticeAreaCard";
import AttorneyCard from "@/components/ui/AttorneyCard";
import TestimonialCard from "@/components/ui/TestimonialCard";
import CaseResultCard from "@/components/ui/CaseResultCard";
import BlogCard from "@/components/ui/BlogCard";
import CTASection from "@/components/ui/CTASection";
import Reveal from "@/components/Reveal";
import { whyChooseUs } from "@/data/firm";
import {
  firm,
  practiceAreas,
  attorneys,
  testimonials,
  caseResults,
  blogPosts,
} from "@/lib/content";

export default function HomePage() {
  const featuredAttorneys = attorneys.filter((a) => a.featured);
  const featuredCases = caseResults.slice(0, 3);
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <>
      {/* ============ HERO ============ */}
      <section
        className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950 text-white"
        aria-label="Introduction"
      >
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src="/images/hero/hero-home.svg"
            alt=""
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
        </div>

        <div className="container-site relative py-32 sm:py-40">
          <div className="max-w-2xl">
            <Reveal>
              <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-gold-400 uppercase">
                <span aria-hidden="true" className="h-px w-10 bg-gold-500" />
                Legal Counsel · Est. {firm.established}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-5 font-serif text-4xl leading-[1.12] text-balance sm:text-6xl lg:text-7xl">
                {firm.tagline}
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                {firm.description}
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href="/contact#consultation" variant="gold" size="lg">
                  Schedule a Consultation
                </Button>
                <Button href="/practice-areas" variant="outlineLight" size="lg">
                  Explore Our Practice Areas
                </Button>
              </div>
            </Reveal>
          </div>
        </div>

        <a
          href="#trust"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 transition-colors hover:text-gold-300"
          aria-label="Scroll down to explore"
        >
          <ChevronDown className="h-7 w-7 animate-bounce" aria-hidden="true" />
        </a>
      </section>

      {/* ============ TRUST / STATISTICS ============ */}
      <section id="trust" className="relative">
        <Statistics className="container-site -mt-14 rounded-md border border-line sm:-mt-16" />
      </section>

      {/* ============ ABOUT PREVIEW ============ */}
      <section className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <Reveal className="relative">
          <div aria-hidden="true" className="absolute -left-4 -top-4 h-28 w-28 rounded-sm border-l-2 border-t-2 border-gold-500/60" />
          <Image
            src="/images/general/about-office.svg"
            alt="The firm's attorneys in a consultation meeting"
            width={1200}
            height={900}
            unoptimized
            className="relative rounded-md shadow-card-lg"
          />
        </Reveal>

        <Reveal delay={120}>
          <SectionHeading
            eyebrow="About Crestline Law Partners"
            title="Committed to Protecting What Matters Most"
            description="For more than twenty-five years, our attorneys have provided experienced legal counsel, personalized representation and strategic solutions to individuals, businesses and organizations. We combine deep technical knowledge with a genuine commitment to our clients' success."
          />
          <ul className="mt-7 space-y-3">
            {[
              "Experienced counsel across ten practice areas",
              "Senior attorneys on every matter, from start to finish",
              "Clear, honest communication at every stage",
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm sm:text-base">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                <span className="text-charcoal-700">{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/about" variant="navy">
              Learn More About Our Firm <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
      </section>

      {/* ============ PRACTICE AREAS ============ */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Practice Areas"
              title="Comprehensive Legal Expertise"
              description="From corporate transactions to family matters, our attorneys deliver focused, sophisticated advice across the areas that matter most to our clients."
            />
            <Reveal>
              <Button href="/practice-areas" variant="outline" className="shrink-0">
                All Practice Areas <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area, index) => (
              <Reveal key={area.slug} delay={(index % 3) * 90}>
                <PracticeAreaCard area={area} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE US ============ */}
      <section className="relative overflow-hidden bg-navy-950 py-20 text-white lg:py-28">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(90%_90%_at_85%_10%,rgba(201,170,107,0.14),transparent_60%)]" />
        <div className="container-site relative">
          <SectionHeading
            light
            align="center"
            eyebrow="Why Choose Us"
            title="The Standard Our Clients Expect"
            description="Choosing the right firm changes everything. We are measured by the outcomes we deliver and the confidence our clients feel."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  delay={(index % 3) * 90}
                  className="group rounded-md border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:bg-white/[0.07]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-gold-500/15 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-navy-950">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-serif text-lg text-white">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/65">{item.description}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ ATTORNEYS ============ */}
      <section className="container-site py-20 lg:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Our Attorneys"
            title="Senior Counsel, Working For You"
            description="Our partners and associates combine decades of courtroom, boardroom and transaction experience with a personal, responsive approach."
          />
          <Reveal>
            <Button href="/attorneys" variant="outline" className="shrink-0">
              Meet the Team <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredAttorneys.map((attorney, index) => (
            <Reveal key={attorney.slug} delay={(index % 4) * 90}>
              <AttorneyCard attorney={attorney} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="container-site">
          <SectionHeading
            align="center"
            eyebrow="Client Testimonials"
            title="Trusted By Those We Represent"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <Reveal key={testimonial.id} delay={(index % 3) * 90}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CASE RESULTS PREVIEW ============ */}
      <section className="container-site py-20 lg:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Representative Matters"
            title="Results That Speak For Themselves"
            description="A selection of representative engagements. Figures and details are illustrative of the firm's work; individual results depend on the specific facts of each matter."
          />
          <Reveal>
            <Button href="/case-results" variant="outline" className="shrink-0">
              View Our Results <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCases.map((caseResult, index) => (
            <Reveal key={caseResult.slug} delay={(index % 3) * 90}>
              <CaseResultCard caseResult={caseResult} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ INSIGHTS PREVIEW ============ */}
      <section className="bg-cream border-y border-line py-20 lg:py-28">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Legal Insights"
              title="Latest From Our Insights Desk"
              description="Practical guidance on contracts, disputes, property and more — written by our attorneys for the clients we serve."
            />
            <Reveal>
              <Button href="/insights" variant="outline" className="shrink-0">
                View All Insights <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 90}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <CTASection />
    </>
  );
}