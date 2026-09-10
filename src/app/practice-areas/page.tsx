import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import PracticeAreaCard from "@/components/ui/PracticeAreaCard";
import CTASection from "@/components/ui/CTASection";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/site";
import { practiceAreas } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Practice Areas",
  description:
    "Explore the practice areas of Crestline Law Partners — corporate, litigation, real estate, family, employment and more.",
  path: "/practice-areas",
});

export default function PracticeAreasPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Practice Areas"
        description="Focused, sophisticated legal advice across the areas that matter most to individuals, families, businesses and institutions."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Practice Areas" }]}
        image="/images/hero/hero-interior.svg"
      />

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <Reveal key={area.slug} delay={(index % 3) * 90}>
              <PracticeAreaCard area={area} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Not sure which practice area fits? Let's talk"
        description="Describe your situation and we will direct you to the attorney best placed to help."
      />
    </>
  );
}