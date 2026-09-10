import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CTASection from "@/components/ui/CTASection";
import FAQFilter from "@/components/ui/FAQFilter";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/site";
import { faqCategories } from "@/data/faqs";
import { faqs } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about consultations, legal fees, case process and the attorney-client relationship at Crestline Law Partners.",
  path: "/faq",
});

export default function FAQPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Straight answers to the questions clients ask us most. Search, filter or browse — and if your question isn't here, we are one message away."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        image="/images/hero/hero-interior.svg"
      />

      <section className="container-site py-16 lg:py-24">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Search & Filter"
            title="Find Your Answer"
          />
          <FAQFilter categories={faqCategories as readonly string[]} items={faqs} />
        </Reveal>
      </section>

      <CTASection
        title="Still haven't found the answer?"
        description="Ask us directly — we are happy to answer questions without any obligation."
      />
    </>
  );
}