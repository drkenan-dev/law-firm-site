/**
 * =====================================================================
 * ATTORNEYS — central data source.
 * Renders the team listing grid AND each individual profile page.
 * Portrait photos live in /public/images/attorneys/ — replace any file
 * with the same name to swap a photo without touching code.
 * =====================================================================
 */

export type Attorney = {
  slug: string;
  name: string;
  position: string;
  photo: string;
  featured?: boolean;
  summary: string;
  bio: string;
  practiceAreaSlugs: string[];
  education: string[];
  qualifications: string[];
  barAdmissions: string[];
  experience: { title: string; years: string }[];
  representativeMatters: string[];
  publications: { title: string; year: string }[];
  languages: string[];
  email: string;
  phone: string;
};

export const attorneys: Attorney[] = [
  {
    slug: "john-williams",
    name: "John Williams",
    position: "Managing Partner",
    photo: "/images/attorneys/attorney-1.svg",
    featured: true,
    summary:
      "John leads the firm's corporate practice and has guided some of the region's most significant commercial transactions.",
    bio: "John is the Managing Partner of Crestline Law Partners and leads the firm's Corporate & Commercial practice. Over a career spanning more than two decades, he has advised boards, investors and founders on mergers, joint ventures and complex commercial arrangements. He is known for combining rigorous technical analysis with clear, commercial advice.",
    practiceAreaSlugs: ["corporate-commercial-law", "banking-finance"],
    education: [
      "LL.M., Commercial Law — University of London",
      "LL.B. (Hons) — University of Ghana, Legon",
    ],
    qualifications: ["Qualified Solicitor & Barrister", "Certified Commercial Mediator"],
    barAdmissions: ["Ghana Bar Association — 2001"],
    experience: [
      { title: "Managing Partner, Crestline Law Partners", years: "2015 – Present" },
      { title: "Partner, Crestline Law Partners", years: "2007 – 2015" },
      { title: "Associate, Marlow & Keteku LLP", years: "2001 – 2007" },
    ],
    representativeMatters: [
      "Advised on a landmark corporate acquisition valued at over US$40 million",
      "Structured a cross-border joint venture for a regional manufacturer",
      "Lead counsel in a complex shareholder dispute resolved in commercial mediation",
    ],
    publications: [
      { title: "Board Governance in Emerging Markets", year: "2024" },
      { title: "Structuring JVs That Survive Contact", year: "2021" },
    ],
    languages: ["English", "French"],
    email: "j.williams@examplelawfirm.com",
    phone: "+233 20 000 0001",
  },
  {
    slug: "sarah-anderson",
    name: "Sarah Anderson",
    position: "Senior Associate",
    photo: "/images/attorneys/attorney-2.svg",
    featured: true,
    summary:
      "Sarah is a leading litigator with a reputation for meticulous preparation and persuasive courtroom advocacy.",
    bio: "Sarah Anderson is a Senior Associate in the Litigation & Dispute Resolution practice. She represents clients in commercial, property and regulatory matters before courts and tribunals, and has earned a reputation for preparation that anticipates every angle. Sarah also advises on commercial mediation where it can save clients time and cost.",
    practiceAreaSlugs: ["litigation-dispute-resolution", "real-estate-law"],
    education: [
      "LL.B. (First Class) — University of Ghana, Legon",
      "Certified Mediator — Chartered Institute of Arbitrators",
    ],
    qualifications: ["Qualified Solicitor & Barrister"],
    barAdmissions: ["Ghana Bar Association — 2010"],
    experience: [
      { title: "Senior Associate, Crestline Law Partners", years: "2018 – Present" },
      { title: "Associate, Crestline Law Partners", years: "2010 – 2018" },
    ],
    representativeMatters: [
      "Defended a commercial property portfolio in a multi-party dispute",
      "Recovered judgment debts exceeding US$2 million for institutional clients",
      "Resolved a partnership breakdown through structured mediation",
    ],
    publications: [
      { title: "The Case for Collaborative ADR", year: "2023" },
      { title: "Lenders in Possession: A Practical Guide", year: "2020" },
    ],
    languages: ["English"],
    email: "s.anderson@examplelawfirm.com",
    phone: "+233 20 000 0002",
  },
  {
    slug: "michael-johnson",
    name: "Michael Johnson",
    position: "Partner",
    photo: "/images/attorneys/attorney-3.svg",
    featured: true,
    summary:
      "Michael heads the Real Estate practice, guiding developers and investors through complex transactions and projects.",
    bio: "Michael Johnson is a Partner and head of the firm's Real Estate practice. He advises developers, investors and financial institutions on land acquisition, development, financing and leasing. His transactional experience spans residential developments and commercial portfolios, and he is a regular speaker on title and registration issues.",
    practiceAreaSlugs: ["real-estate-law", "banking-finance"],
    education: [
      "LL.B. — University of Ghana, Legon",
      "Professional Certificate in Property Law — Ghana School of Law",
    ],
    qualifications: ["Qualified Solicitor & Barrister"],
    barAdmissions: ["Ghana Bar Association — 2005"],
    experience: [
      { title: "Partner, Crestline Law Partners", years: "2014 – Present" },
      { title: "Senior Associate, Crestline Law Partners", years: "2009 – 2014" },
      { title: "Associate, Castleford & Co.", years: "2005 – 2009" },
    ],
    representativeMatters: [
      "Advised on the development and financing of a 40-acre commercial estate",
      "Structured leasing arrangements for a national retail portfolio",
      "Resolved a landmark boundary and title dispute",
    ],
    publications: [
      { title: "Title Registration: What Developers Get Wrong", year: "2022" },
    ],
    languages: ["English"],
    email: "m.johnson@examplelawfirm.com",
    phone: "+233 20 000 0003",
  },
  {
    slug: "emily-carter",
    name: "Emily Carter",
    position: "Senior Counsel",
    photo: "/images/attorneys/attorney-4.svg",
    featured: true,
    summary:
      "Emily advises on employment, tax and regulatory matters with a calm, strategic approach clients rely on.",
    bio: "Emily Carter is Senior Counsel with a dual practice in Employment and Tax. She advises employers on compliant people practices and defends claims in tribunal, while guiding businesses and individuals through tax structuring, audits and disputes. Her calm, strategic style has made her a trusted advisor to executives and founders alike.",
    practiceAreaSlugs: ["employment-law", "tax-law"],
    education: [
      "LL.M., Employment & Tax Law — University of Cambridge",
      "LL.B. (Hons) — Kwame Nkrumah University of Science and Technology",
    ],
    qualifications: ["Qualified Solicitor & Barrister", "Certified Tax Adviser"],
    barAdmissions: ["Ghana Bar Association — 2008"],
    experience: [
      { title: "Senior Counsel, Crestline Law Partners", years: "2019 – Present" },
      { title: "Partner, Anokye Legal Group", years: "2013 – 2019" },
      { title: "Associate, Crestline Law Partners", years: "2008 – 2013" },
    ],
    representativeMatters: [
      "Advised a 400-employee manufacturer on a full workforce restructure",
      "Recovered substantial underpaid benefits for senior executives",
      "Restructured a family business; achieved significant lawful tax savings",
    ],
    publications: [
      { title: "Redundancy Done Right", year: "2023" },
      { title: "Tax Efficient Succession Planning", year: "2019" },
    ],
    languages: ["English", "French"],
    email: "e.carter@examplelawfirm.com",
    phone: "+233 20 000 0004",
  },
  {
    slug: "daniel-opoku",
    name: "Daniel Opoku",
    position: "Associate",
    photo: "/images/attorneys/attorney-5.svg",
    summary:
      "Daniel manages intellectual property portfolios and supports the firm's criminal defence and immigration matters.",
    bio: "Daniel Opoku practises across Intellectual Property, Immigration and Criminal Defence, giving him one of the firm's broadest caseloads. He manages trade mark and copyright portfolios for leading brands and has earned a reputation for meticulous preparation in immigration applications and investigations.",
    practiceAreaSlugs: ["intellectual-property", "immigration-law", "criminal-defense"],
    education: ["LL.B. — University of Ghana, Legon"],
    qualifications: ["Qualified Solicitor & Barrister"],
    barAdmissions: ["Ghana Bar Association — 2016"],
    experience: [
      { title: "Associate, Crestline Law Partners", years: "2016 – Present" },
      { title: "Trainee, Crestline Law Partners", years: "2014 – 2016" },
    ],
    representativeMatters: [
      "Secured trade mark registrations across West Africa for an international brand",
      "Successfully challenged an unlawful permit refusal",
      "Advised an executive through a dawn-raid investigation",
    ],
    publications: [
      { title: "Protecting Brands on the Continent", year: "2024" },
    ],
    languages: ["English", "Twi"],
    email: "d.opoku@examplelawfirm.com",
    phone: "+233 20 000 0005",
  },
  {
    slug: "grace-addo",
    name: "Grace Addo",
    position: "Associate",
    photo: "/images/attorneys/attorney-6.svg",
    summary:
      "Grace is a compassionate advocate for families and individuals, specialising in family law and estates.",
    bio: "Grace Addo practises in Family Law, guiding clients through divorce, custody, maintenance and estate planning with patience and precision. She takes particular care in matters involving children, and helps families structure wills and trusts that protect their futures.",
    practiceAreaSlugs: ["family-law"],
    education: ["LL.B. — University of Ghana, Legon"],
    qualifications: ["Qualified Solicitor & Barrister"],
    barAdmissions: ["Ghana Bar Association — 2018"],
    experience: [
      { title: "Associate, Crestline Law Partners", years: "2018 – Present" },
    ],
    representativeMatters: [
      "Resolved a high-conflict custody matter through careful mediation",
      "Drafted the estate plan for a multi-generational business family",
      "Advised on adoption proceedings for a growing family",
    ],
    publications: [
      { title: "Children First: Custody Frameworks", year: "2023" },
    ],
    languages: ["English", "Twi", "Ga"],
    email: "g.addo@examplelawfirm.com",
    phone: "+233 20 000 0006",
  },
];

export function getAttorney(slug: string): Attorney | undefined {
  return attorneys.find((attorney) => attorney.slug === slug);
}