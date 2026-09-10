import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Mail, Phone, GraduationCap, Award, Scale, Globe2, Briefcase, ArrowLeft, CheckCircle2, FileText, MessageSquare } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/Reveal";
import SocialIcon from "@/components/ui/SocialIcon";
import { getAttorney, attorneys, getPracticeAreasBySlug, firm } from "@/lib/content";
import { buildMetadata } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return attorneys.map((attorney) => ({ slug: attorney.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const attorney = getAttorney(slug);
  if (!attorney) return buildMetadata({ title: "Attorney Not Found", description: "Attorney not found." });
  return buildMetadata({
    title: attorney.name,
    description: `${attorney.name} — ${attorney.position} at ${firm.name}. Learn about their experience, practice areas and background.`,
    path: `/attorneys/${attorney.slug}`,
  });
}

export default async function AttorneyProfilePage({ params }: Props) {
  const { slug } = await params;
  const attorney = getAttorney(slug);
  if (!attorney) notFound();

  const areas = getPracticeAreasBySlug(attorney.practiceAreaSlugs);

  return (
    <>
      <PageHeader
        eyebrow="Attorney Profile"
        title={attorney.name}
        description={`${attorney.position} · ${attorney.summary}`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Attorneys", href: "/attorneys" },
          { label: attorney.name },
        ]}
      />

      <section className="container-site py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(300px,380px)_1fr] lg:gap-16">
          {/* Sidebar */}
          <Reveal>
            <aside className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-md border border-line shadow-card">
                <Image
                  src={attorney.photo}
                  alt={`Portrait of ${attorney.name}`}
                  width={600}
                  height={720}
                  unoptimized
                  className="aspect-[5/6] w-full object-cover"
                />
                <div className="space-y-4 bg-cream p-6">
                  <h1 className="font-serif text-2xl text-navy-900">{attorney.name}</h1>
                  <p className="text-xs font-semibold tracking-[0.18em] text-gold-600 uppercase">
                    {attorney.position}
                  </p>
                  <div className="space-y-2.5 border-t border-line pt-4 text-sm">
                    <p className="flex items-center gap-2.5 text-charcoal-700">
                      <Mail className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      <a href={`mailto:${attorney.email}`} className="break-all transition-colors hover:text-gold-600">
                        {attorney.email}
                      </a>
                    </p>
                    <p className="flex items-center gap-2.5 text-charcoal-700">
                      <Phone className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      <a href={`tel:${attorney.phone}`} className="transition-colors hover:text-gold-600">
                        {attorney.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2.5 text-charcoal-700">
                      <Globe2 className="h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                      {attorney.languages.join(", ")} speaker
                    </p>
                  </div>
                  <a
                    href={firm.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile (dummy link)"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900 transition-colors hover:text-gold-600"
                  >
                    <SocialIcon name="linkedin" className="h-4 w-4" /> View on LinkedIn
                  </a>
                </div>
              </div>

              <div className="mt-6 rounded-md border border-line bg-white p-6 shadow-card">
                <h2 className="flex items-center gap-2 font-serif text-lg text-navy-900">
                  <Briefcase className="h-5 w-5 text-gold-600" aria-hidden="true" /> Practice Areas
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {areas.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={`/practice-areas/${area.slug}`}
                        className="group flex items-center gap-2.5 text-sm text-charcoal-700 transition-colors hover:text-gold-600"
                      >
                        <area.icon className="h-4 w-4 text-gold-600" aria-hidden="true" />
                        {area.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 border-t border-line pt-5">
                  <Button href="/contact#consultation" variant="gold" size="md" className="w-full">
                    <MessageSquare className="h-4 w-4" aria-hidden="true" /> Schedule a Consultation
                  </Button>
                </div>
              </div>
            </aside>
          </Reveal>

          {/* Main content */}
          <div className="space-y-12">
            <Reveal>
              <SectionHeading eyebrow="Biography" title="About" />
              <p className="mt-4 leading-relaxed text-charcoal-700">{attorney.bio}</p>
            </Reveal>

            <Reveal className="grid gap-6 sm:grid-cols-2">
              <ProfileBlock
                title="Education"
                icon={GraduationCap}
                items={attorney.education}
              />
              <ProfileBlock
                title="Qualifications"
                icon={Award}
                items={attorney.qualifications}
              />
              <ProfileBlock
                title="Bar Admissions"
                icon={Scale}
                items={attorney.barAdmissions}
              />
              <ProfileBlock
                title="Languages"
                icon={Globe2}
                items={attorney.languages}
              />
            </Reveal>

            <Reveal>
              <SectionHeading eyebrow="Career" title="Professional Experience" />
              <ol className="mt-6 space-y-4">
                {attorney.experience.map((role) => (
                  <li key={role.title} className="flex flex-col gap-1 rounded-md border border-line bg-cream p-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-navy-900">{role.title}</p>
                    <p className="text-xs font-medium tracking-wide text-gold-600">{role.years}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <SectionHeading eyebrow="Selected Work" title="Representative Matters" />
              <ul className="mt-6 space-y-3">
                {attorney.representativeMatters.map((matter) => (
                  <li key={matter} className="flex items-start gap-3 text-charcoal-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                    <span className="text-sm leading-relaxed sm:text-base">{matter}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <SectionHeading eyebrow="Writing" title="Publications" />
              <ul className="mt-6 space-y-4">
                {attorney.publications.map((publication) => (
                  <li key={publication.title} className="flex items-start gap-3 rounded-md border border-line bg-white p-5">
                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-navy-900">{publication.title}</p>
                      <p className="mt-1 text-xs font-medium text-gold-600">{publication.year}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Other attorneys */}
            <Reveal className="border-t border-line pt-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <SectionHeading eyebrow="Related" title="More from the team" />
                <Link
                  href="/attorneys"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-700"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All Attorneys
                </Link>
              </div>
              <ul className="mt-6 flex flex-wrap gap-3">
                {attorneys
                  .filter((person) => person.slug !== attorney.slug)
                  .slice(0, 3)
                  .map((person) => (
                    <li key={person.slug}>
                      <Link
                        href={`/attorneys/${person.slug}`}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-sm border border-line bg-cream px-4 py-2.5 text-sm font-medium text-navy-900",
                          "transition-colors hover:border-gold-500 hover:text-gold-600",
                        )}
                      >
                        {person.name}
                        <span aria-hidden="true" className="text-gold-600">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

type BlockIcon = typeof GraduationCap;

function ProfileBlock({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: BlockIcon;
  items: string[];
}) {
  return (
    <div className="rounded-md border border-line bg-white p-6 shadow-card">
      <h2 className="flex items-center gap-2.5 font-serif text-lg text-navy-900">
        <Icon className="h-5 w-5 text-gold-600" aria-hidden="true" /> {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-charcoal-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}