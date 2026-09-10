import type { Metadata } from "next";
import { Info } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import CaseResultCard from "@/components/ui/CaseResultCard";
import CTASection from "@/components/ui/CTASection";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/site";
import { caseResults } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Case Results",
  description:
    "Representative matters and outcomes from Crestline Law Partners across commercial disputes, transactions, employment and more.",
  path: "/case-results",
});

export default function CaseResultsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Results"
        title="Representative Matters & Success Stories"
        description="A selection of engagements illustrating the quality and care we bring to every matter. Details are illustrative and outcomes depend on each case's specific facts."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Case Results" }]}
        image="/images/hero/hero-interior.svg"
      />

      <section className="container-site py-20 lg:py-28">
        <Reveal>
          <div className="mb-12 flex items-start gap-3 rounded-md border border-gold-500/40 bg-gold-300/10 p-5 text-sm leading-relaxed text-charcoal-700">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
            <p>
              <strong>Important notice:</strong> the matters below are illustrative, anonymised
              examples used for demonstration purposes. They do not constitute a guarantee of any
              particular outcome, and results will always depend on the specific circumstances and
              facts of each case.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {caseResults.map((caseResult, index) => (
            <Reveal key={caseResult.slug} delay={(index % 3) * 90}>
              <CaseResultCard caseResult={caseResult} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Let us work toward your next success"
        description="Every successful matter begins with a conversation. Tell us where you need help."
      />
    </>
  );
}