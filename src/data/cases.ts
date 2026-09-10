/**
 * =====================================================================
 * CASE RESULTS / SUCCESS STORIES — central data source.
 * IMPORTANT: these are illustrative, anonymised examples for design
 * purposes only. Replace with real, verifiable matters (and note any
 * confidentiality obligations) before publishing.
 * =====================================================================
 */

export type CaseResult = {
  slug: string;
  category: string;
  title: string;
  description: string;
  result: string;
  image: string;
  confidential?: boolean;
  practiceAreaSlug: string;
};

export const caseResults: CaseResult[] = [
  {
    slug: "commercial-dispute-resolution",
    category: "Dispute Resolution",
    title: "Complex Commercial Dispute Successfully Resolved",
    description:
      "Acted for a manufacturing client in a long-running contractual dispute involving supply obligations and substantial counterclaims.",
    result: "Case resolved favourably through structured commercial mediation, preserving the client's business relationship.",
    image: "/images/practice-areas/litigation.svg",
    practiceAreaSlug: "litigation-dispute-resolution",
  },
  {
    slug: "major-property-transaction",
    category: "Real Estate",
    title: "Major Property Transaction Advised",
    description:
      "Guided a development firm through the acquisition and registration of a large commercial site, including financing and regulatory approvals.",
    result: "Transaction closed on schedule with clean title successfully registered.",
    image: "/images/practice-areas/real-estate.svg",
    practiceAreaSlug: "real-estate-law",
  },
  {
    slug: "corporate-acquisition",
    category: "Corporate",
    title: "Significant Corporate Acquisition",
    description:
      "Provided end-to-end counsel for a strategic acquisition, including due diligence, financing and share transfer documentation.",
    result: "Acquisition completed within the agreed timeline and budget.",
    image: "/images/practice-areas/corporate-commercial.svg",
    practiceAreaSlug: "corporate-commercial-law",
  },
  {
    slug: "workforce-restructure",
    category: "Employment",
    title: "Workforce Restructure for a 400-Employee Business",
    description:
      "Managed a lawful redundancy programme and negotiated settlement terms for a large employer undergoing reorganisation.",
    result: "Restructure completed compliantly without successful claims.",
    image: "/images/practice-areas/employment.svg",
    practiceAreaSlug: "employment-law",
  },
  {
    slug: "brand-protection",
    category: "Intellectual Property",
    title: "Brand Protection Across Three Markets",
    description:
      "Secured trade mark registrations and pursued action against counterfeiters for a consumer goods brand.",
    result: "Registrations granted; infringing goods removed from circulation.",
    image: "/images/practice-areas/intellectual-property.svg",
    practiceAreaSlug: "intellectual-property",
  },
  {
    slug: "family-estate-plan",
    category: "Family & Estates",
    title: "Multi-Generational Estate Plan",
    description:
      "Structured a comprehensive estate plan for a business-owning family, protecting assets across generations.",
    result: "Plan implemented; succession achieved without tax or family conflict.",
    image: "/images/practice-areas/family.svg",
    practiceAreaSlug: "family-law",
  },
];