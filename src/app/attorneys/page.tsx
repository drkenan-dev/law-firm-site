import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import AttorneyCard from "@/components/ui/AttorneyCard";
import CTASection from "@/components/ui/CTASection";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/site";
import { attorneys } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Our Attorneys",
  description:
    "Meet the attorneys of Crestline Law Partners — experienced, dedicated lawyers and counsel across a wide range of practice areas.",
  path: "/attorneys",
});

export default function AttorneysPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Team"
        title="Attorneys & Counsel"
        description="Experienced, approachable and committed — the people representing you in the boardroom, the courtroom and every conversation in between."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Attorneys" }]}
        image="/images/hero/hero-interior.svg"
      />

      <section className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow="The Team"
          title="Lawyers Who Lead Every Matter"
          description="Each client is represented by a named attorney — someone who knows your matter inside and out and who you can reach directly."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {attorneys.map((attorney, index) => (
            <Reveal key={attorney.slug} delay={(index % 3) * 90}>
              <AttorneyCard attorney={attorney} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Speak with an attorney who can help"
        description="Tell us a little about your matter and we will connect you with the right member of the team."
      />
    </>
  );
}