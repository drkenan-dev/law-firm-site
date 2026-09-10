import type { Metadata } from "next";
import { MapPin, Clock3, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CareerForm from "@/components/forms/CareerForm";
import CTASection from "@/components/ui/CTASection";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/site";
import { firmCulture, benefits, internshipRoles } from "@/data/careers";
import { firm, vacancies } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Careers",
  description:
    "Build your career at Crestline Law Partners — current vacancies, internships, benefits and our firm culture.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build Your Career With Us"
        description="Join a firm where senior attorneys invest in your development, where the work is challenging, and where your judgment is valued from day one."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        image="/images/general/careers.svg"
      />

      {/* Why work with us / culture */}
      <section className="container-site grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Firm Culture"
            title="A Place Where Good Lawyers Become Great Ones"
            description="We hire people who are sharp, decent and hungry to learn — and then we invest in them properly."
          />
          <ul className="mt-8 space-y-4">
            {firmCulture.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-relaxed sm:text-base">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                <span className="text-charcoal-700">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-md border border-line bg-paper p-8">
            <h3 className="flex items-center gap-2.5 font-serif text-2xl text-navy-900">
              <Briefcase className="h-6 w-6 text-gold-600" aria-hidden="true" /> Benefits &amp; Support
            </h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2.5 rounded-sm border border-line bg-white px-4 py-3 text-sm leading-relaxed text-charcoal-700"
                >
                  <span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Current vacancies */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Current Openings"
            title="Available Positions"
            description="We are always keen to hear from exceptional lawyers. Current openings are listed below — if you are passionate about a role we are not advertising, reach out anyway."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {vacancies.map((vacancy, index) => (
              <Reveal
                key={vacancy.id}
                delay={(index % 2) * 80}
                className="flex flex-col rounded-md border border-line bg-white p-7 shadow-card"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded-sm bg-navy-950 px-2.5 py-1 font-semibold tracking-wide text-gold-300 uppercase">
                    {vacancy.type}
                  </span>
                  <span className="rounded-sm bg-paper px-2.5 py-1 font-medium text-charcoal-700">
                    {vacancy.department}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-xl text-navy-900">{vacancy.title}</h3>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-charcoal-500">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gold-600" aria-hidden="true" />
                    {vacancy.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4 text-gold-600" aria-hidden="true" />
                    Deadline: {vacancy.deadline}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-charcoal-500">{vacancy.summary}</p>

                <div className="mt-5 grid gap-5 text-sm sm:grid-cols-2">
                  <div>
                    <p className="font-semibold text-navy-900">What you&apos;ll do</p>
                    <ul className="mt-2.5 space-y-1.5 text-charcoal-500">
                      {vacancy.responsibilities.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-navy-900">What we&apos;re looking for</p>
                    <ul className="mt-2.5 space-y-1.5 text-charcoal-500">
                      {vacancy.qualifications.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="container-site py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Internships"
              title="Training the Next Generation"
              description="Our paid internship programme gives final-year students and recent graduates exposure to real matters under active supervision."
            />
            <p className="mt-4 text-sm leading-relaxed text-charcoal-500">
              Interns rotate through two practice areas, supporting associates and working directly
              with partners. The programme includes structured feedback, a supervised research paper,
              and genuine responsibility.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {internshipRoles.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center gap-2 rounded-sm border border-line bg-cream px-4 py-2 text-sm font-medium text-navy-900"
                >
                  <GraduationCap className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  {role}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-charcoal-500">
              Interested? Use the application form below and select{" "}
              <span className="font-semibold text-navy-900">Graduate Trainee</span> from the position
              list.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-md border border-line bg-white p-6 shadow-card sm:p-8">
              <SectionHeading
                eyebrow="Apply"
                title="Application Form"
                description={`Applications are reviewed by our talent team. Questions? Email ${firm.email}.`}
              />
              <div className="mt-6">
                <CareerForm vacancies={vacancies} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}