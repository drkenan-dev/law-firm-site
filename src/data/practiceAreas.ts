/**
 * =====================================================================
 * PRACTICE AREAS — central data source.
 * Each entry renders the practice-area card AND the full detail page.
 * Replace `introduction`, `services`, `faqs`, etc. with real content.
 * `image` points to a file in /public/images/practice-areas/
 * =====================================================================
 */
import {
  Scale,
  Building2,
  Home,
  Users,
  Briefcase,
  Lightbulb,
  Landmark,
  ShieldCheck,
  Calculator,
  Globe2,
  type LucideIcon,
} from "lucide-react";

export type RepresentativeMatter = {
  title: string;
  result: string;
  confidential?: boolean;
};

export type PracticeArea = {
  slug: string;
  name: string;
  icon: LucideIcon;
  tagline: string;
  description: string;
  image: string;
  introduction: string;
  experience: {
    text: string;
    highlights: string[];
  };
  howWeHelp: string[];
  services: string[];
  whyChooseUs: string[];
  representativeMatters: RepresentativeMatter[];
  faqs: { question: string; answer: string }[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "corporate-commercial-law",
    name: "Corporate & Commercial Law",
    icon: Building2,
    tagline: "Guidance for businesses at every stage",
    description:
      "Formation, governance, contracts and transactions — practical counsel that keeps your business safe and moving forward.",
    image: "/images/practice-areas/corporate-commercial.svg",
    introduction:
      "From incorporation to day-to-day governance, we advise startups, family businesses and established companies on the legal decisions that shape their future. Our corporate team balances rigorous compliance with commercial realism, so you can concentrate on running your business.",
    experience: {
      text: "Our partners have guided businesses across banking, energy, manufacturing, technology and trade for over two decades.",
      highlights: [
        "Company formation and restructuring",
        "Shareholder and board advisory",
        "Mergers, acquisitions and joint ventures",
        "Cross-border commercial transactions",
      ],
    },
    howWeHelp: [
      "Structure your entities to protect owners and minimise risk",
      "Draft and negotiate contracts that genuinely serve your interests",
      "Advise boards and shareholders on governance and fiduciary duties",
      "Support expansion through partnerships, investment and new markets",
    ],
    services: [
      "Company Incorporation & Structuring",
      "Corporate Governance & Compliance",
      "Shareholders' & Partnership Agreements",
      "Joint Ventures & Strategic Alliances",
      "Restructuring & Corporate Reorganisation",
      "General Commercial Contracts",
    ],
    whyChooseUs: [
      "Senior partners lead every commercial file",
      "Practical advice grounded in real transactions",
      "Clear, fixed-fee engagement options",
      "Discreet and dependable execution",
    ],
    representativeMatters: [
      {
        title: "Share purchase agreement for a regional manufacturing company",
        result: "Transaction completed on schedule with minimal friction",
      },
      {
        title: "Joint venture structuring between local and foreign investors",
        result: "Structure implemented that protected both parties' interests",
      },
    ],
    faqs: [
      {
        question: "Do I need a lawyer to set up my company?",
        answer:
          "Not strictly, but professional structuring avoids costly mistakes in ownership, compliance and tax. We make the process simple and cost-effective.",
      },
      {
        question: "Can you review a contract I have already signed?",
        answer:
          "Yes. We can review existing contracts, flag risks and negotiate amendments where the other party agrees.",
      },
    ],
  },
  {
    slug: "litigation-dispute-resolution",
    name: "Litigation & Dispute Resolution",
    icon: Scale,
    tagline: "Resolute advocacy, measured strategy",
    description:
      "Court representation and alternative dispute resolution — protecting your position at every stage of conflict.",
    image: "/images/practice-areas/litigation.svg",
    introduction:
      "Disputes are disruptive. We work to resolve them efficiently — through negotiation, mediation, arbitration or, where necessary, the courts. Our litigators combine thorough preparation with persuasive advocacy, always with your business in mind.",
    experience: {
      text: "Our dispute team has represented clients in the High Court, Court of Appeal and arbitral tribunals across commercial, civil and regulatory matters.",
      highlights: [
        "Commercial and contract disputes",
        "Shareholder and partnership conflicts",
        "Property and tenancy disputes",
        "Regulatory investigations and enforcement",
      ],
    },
    howWeHelp: [
      "Assess your position honestly and map realistic outcomes",
      "Pursue negotiation and mediation before costly litigation",
      "Run court proceedings efficiently and assertively",
      "Enforce judgments and awards where required",
    ],
    services: [
      "Commercial & Contract Litigation",
      "Arbitration & Mediation",
      "Debt Recovery & Enforcement",
      "Regulatory & Disciplinary Proceedings",
      "Injunctions & Interim Relief",
      "Appeals",
    ],
    whyChooseUs: [
      "Fighters who prepare relentlessly",
      "Strong relationships with courts and tribunals",
      "Cost-conscious litigation strategy",
      "Track record in high-stakes commercial cases",
    ],
    representativeMatters: [
      {
        title: "Complex breach of contract dispute",
        result: "Resolved favourably through commercial mediation",
      },
      {
        title: "Shareholder deadlock in a growing family business",
        result: "Judgment secured protecting our client's interest",
      },
    ],
    faqs: [
      {
        question: "How long will my case take?",
        answer:
          "It depends on the matter and whether the other side engages constructively. Mediation can resolve most commercial disputes within months; trial proceedings typically take longer.",
      },
      {
        question: "Will I have to go to court?",
        answer:
          "Many disputes are resolved before trial. If court becomes necessary, we prepare you thoroughly for every appearance.",
      },
    ],
  },
  {
    slug: "real-estate-law",
    name: "Real Estate Law",
    icon: Home,
    tagline: "From due diligence to closing",
    description:
      "Acquisitions, developments, leases and title work — secure, well-structured property transactions.",
    image: "/images/practice-areas/real-estate.svg",
    introduction:
      "Property is often a client's most significant asset. We guide developers, investors, businesses and families through acquisitions, sales, development and leasing — ensuring titles are clear, documents are sound and transactions close without surprises.",
    experience: {
      text: "We have advised on residential and commercial developments, land assembly and some of the region's notable property transactions.",
      highlights: [
        "Title search and due diligence",
        "Acquisitions and dispositions",
        "Development and construction agreements",
        "Commercial and residential leases",
      ],
    },
    howWeHelp: [
      "Conduct rigorous ownership and title due diligence",
      "Draft and negotiate purchase and lease agreements",
      "Advise on zoning, planning and regulatory approvals",
      "Structure financing for property developments",
    ],
    services: [
      "Land Acquisition & Sale",
      "Title Verification & Registration",
      "Commercial & Retail Leasing",
      "Property Development",
      "Facility & Property Management Agreements",
      "Mortgage & Security Documentation",
    ],
    whyChooseUs: [
      "Deep knowledge of title systems and registration",
      "End-to-end management of transactions",
      "Clear advice on taxes and stamp duties",
      "Relationships with banks and developers",
    ],
    representativeMatters: [
      {
        title: "Acquisition and development package for a commercial estate",
        result: "Successful closing and clean registration",
      },
      {
        title: "Lease negotiations for a flagship retail unit",
        result: "Favourable terms and protections secured for the tenant",
      },
    ],
    faqs: [
      {
        question: "What checks are done before I buy property?",
        answer:
          "We verify title, prior transfers, encumbrances, planning status and all relevant registrations so you buy with confidence.",
      },
      {
        question: "How long does the land registration process take?",
        answer:
          "Timelines vary by jurisdiction, but proper documentation significantly speeds up the process. We manage it end to end.",
      },
    ],
  },
  {
    slug: "family-law",
    name: "Family Law",
    icon: Users,
    tagline: "Sensitive support for life's hardest decisions",
    description:
      "Divorce, custody and estate planning — legal care that protects your family and your future.",
    image: "/images/practice-areas/family.svg",
    introduction:
      "Family matters are personal. We bring empathy, discretion and clear judgment to divorce, custody, maintenance and adoption, and to the estate planning that protects the people you love after you are gone.",
    experience: {
      text: "Our family team guides clients through some of the most sensitive chapters of their lives with patience and professionalism.",
      highlights: [
        "Divorce and judicial separation",
        "Custody and access arrangements",
        "Matrimonial property division",
        "Wills, trusts and succession planning",
      ],
    },
    howWeHelp: [
      "Resolve family financial matters fairly and quietly",
      "Protect children through careful custody arrangements",
      "Draft wills and trusts that reflect your wishes",
      "Manage adoptions and guardianship applications",
    ],
    services: [
      "Divorce & Dissolution",
      "Child Custody & Maintenance",
      "Property & Financial Settlement",
      "Adoption & Guardianship",
      "Wills, Probate & Trusts",
      "Pre-Marital & Cohabitation Agreements",
    ],
    whyChooseUs: [
      "Compassionate, judgement-free advice",
      "Dispute-first approach where possible",
      "Thorough, protective documentation",
      "Long-term relationship across generations of families",
    ],
    representativeMatters: [
      {
        title: "High-value matrimonial property division",
        result: "Resolution reached without protracted court proceedings",
      },
      {
        title: "Multi-year estate and trust administration",
        result: "Clean distribution, benefiting successors as intended",
      },
    ],
    faqs: [
      {
        question: "Can divorce be handled amicably?",
        answer:
          "Yes. Where both parties are willing, settlement agreements resolve most issues more quickly and with less cost than trial.",
      },
      {
        question: "Is a solicitor required for a will?",
        answer:
          "It is strongly recommended. Professionally drafted wills avoid disputes and ensure your wishes are enforceable.",
      },
    ],
  },
  {
    slug: "employment-law",
    name: "Employment Law",
    icon: Briefcase,
    tagline: "Advice for employers and employees alike",
    description:
      "Contracts, discipline, termination and disputes — clarity on every workplace issue.",
    image: "/images/practice-areas/employment.svg",
    introduction:
      "The employment relationship creates rights and obligations on both sides. We advise employers on compliant practice and disciplined defences, and employees on enforcing their rights when they are treated unfairly.",
    experience: {
      text: "We regularly act for organisations facing disciplinary matters, restructuring and disputes, and for individuals pursuing fair treatment.",
      highlights: [
        "Employment contracts and handbooks",
        "Disciplinary and grievance processes",
        "Unfair dismissal and redundancy",
        "Settlement and exit negotiations",
      ],
    },
    howWeHelp: [
      "Draft contracts, policies and handbooks that protect you",
      "Run defensible disciplinary and redundancy processes",
      "Defend wrongful dismissal and discrimination claims",
      "Negotiate clean, cost-effective exits",
    ],
    services: [
      "Employment Contracts & Policies",
      "Disciplinary & Grievance Procedures",
      "Wrongful & Unfair Dismissal Claims",
      "Redundancy & Reorganisation",
      "Discrimination & Harassment Claims",
      "Board & Executive Employment",
    ],
    whyChooseUs: [
      "Pragmatic, workplace-aware advice",
      "Fast response for urgent hearings",
      "Balanced guidance for both sides of the table",
      "Strong results in tribunal advocacy",
    ],
    representativeMatters: [
      {
        title: "Defence of a wrongful dismissal claim",
        result: "Claim dismissed; costs recovered",
      },
      {
        title: "Drafting a workforce handbook for a 400-employee business",
        result: "Publication delivered; disputes reduced year on year",
      },
    ],
    faqs: [
      {
        question: "Can my employer dismiss me without notice?",
        answer:
          "Only where the law provides a valid justification and a fair process has been followed. If your dismissal was unfair, you may have a claim.",
      },
      {
        question: "What should an employment contract contain?",
        answer:
          "Clear terms on role, pay, leave, notice, confidentiality and conduct. We draft contracts that are fair and enforceable for both parties.",
      },
    ],
  },
  {
    slug: "intellectual-property",
    name: "Intellectual Property",
    icon: Lightbulb,
    tagline: "Protecting what makes you different",
    description:
      "Trademarks, patents, copyright and trade secrets — registering and enforcing the assets that set you apart.",
    image: "/images/practice-areas/intellectual-property.svg",
    introduction:
      "Innovation and brand are among the most valuable things a business owns. We secure, manage and enforce trade marks, patents, copyrights and trade secrets so your ideas remain yours — and so your competitors cannot trade on them.",
    experience: {
      text: "We manage IP portfolios for brands in technology, media, fashion and fast-moving consumer goods.",
      highlights: [
        "Trade mark clearance and registration",
        "Copyright and brand protection",
        "IP licensing and assignment",
        "Counterfeiting and infringement action",
      ],
    },
    howWeHelp: [
      "Clear trade marks and designs before you commit spend",
      "Build portfolios that cover core markets",
      "Licence your IP on commercially sensible terms",
      "Act against infringement and counterfeiting",
    ],
    services: [
      "Trade Mark Registration & Renewal",
      "Patent & Industrial Design Filings",
      "Copyright Advice & Registration",
      "IP Licensing & Franchising",
      "Brand Protection & Anti-Counterfeiting",
      "IP Dispute Resolution",
    ],
    whyChooseUs: [
      "Practical portfolio management advice",
      "Enforcement that actually deters infringers",
      "Clear guidance on costs and timelines",
      "Commercial focus, not just legal boxes",
    ],
    representativeMatters: [
      {
        title: "National and regional registration of a leading brand",
        result: "Gateway to strong enforcement in key markets",
      },
      {
        title: "Infringement action against counterfeit goods",
        result: "Cease-and-desist and seizure of infringing stock",
      },
    ],
    faqs: [
      {
        question: "Do I need to register my trade mark?",
        answer:
          "Unregistered rights are difficult to enforce. Registration is the most reliable way to protect your brand and is highly affordable.",
      },
      {
        question: "How long does a trade mark take to register?",
        answer:
          "Typically several months from filing to registration, though timelines vary by office. We manage the process from search to certificate.",
      },
    ],
  },
  {
    slug: "banking-finance",
    name: "Banking & Finance",
    icon: Landmark,
    tagline: "Structuring capital that moves business",
    description:
      "Lending, corporate finance and regulatory compliance — the legal engine behind sound financial decisions.",
    image: "/images/practice-areas/banking-finance.svg",
    introduction:
      "Finance powers growth, but only when it is structured correctly. We act for banks, lenders, investors and borrowers, structuring facilities, negotiating terms and guiding transactions through an increasingly demanding regulatory environment.",
    experience: {
      text: "Our finance practice has structured facilities for banks and corporate borrowers across lending, acquisition and project finance.",
      highlights: [
        "Lending and security documentation",
        "Acquisition and project finance",
        "Debt restructuring and workouts",
        "Regulatory compliance for financial institutions",
      ],
    },
    howWeHelp: [
      "Structure facilities and security that banks will accept",
      "Negotiate facility agreements in your favour",
      "Advise on regulatory obligations and licensing",
      "Manage defaults and restructuring with clarity",
    ],
    services: [
      "Loan & Credit Facilities",
      "Security & Guarantee Documentation",
      "Acquisition & Project Finance",
      "Debt Restructuring & Workouts",
      "Fintech & Regulatory Advisory",
      "Banking Litigation Support",
    ],
    whyChooseUs: [
      "Bilingual: we speak both law and finance",
      "Experienced across institutional and private credit",
      "Regulatory awareness baked into every deal",
      "Deadline-driven execution",
    ],
    representativeMatters: [
      {
        title: "Facility for a major infrastructure project",
        result: "Multi-tranche structure implemented and drawn down",
      },
      {
        title: "Security perfection for a regional bank's loan book",
        result: "Clean registration across all classes of collateral",
      },
    ],
    faqs: [
      {
        question: "What security is needed for a business loan?",
        answer:
          "Typically charges over assets, guarantees and sometimes shares. We structure security carefully so finance can be raised without unnecessary risk to owners.",
      },
      {
        question: "What happens if my business cannot repay a loan?",
        answer:
          "We advise on restructuring, forbearance and realistic options before default crystallises — often preserving the business and the relationship.",
      },
    ],
  },
  {
    slug: "criminal-defense",
    name: "Criminal Defense",
    icon: ShieldCheck,
    tagline: "A strong defence when it matters most",
    description:
      "Investigations, bail and trial advocacy — protecting your liberty and your reputation.",
    image: "/images/practice-areas/criminal-defense.svg",
    introduction:
      "Being accused of an offence is among the most serious moments in a person's life. Our defence counsel moves quickly to protect your rights from the first interview through to bail, trial and any appeal.",
    experience: {
      text: "We handle matters from white-collar investigations to serious crime, always with a level-headed, preparation-first approach.",
      highlights: [
        "Police investigations and interviews",
        "Bail applications",
        "Trial defence advocacy",
        "Appeals and post-conviction issues",
      ],
    },
    howWeHelp: [
      "Advise you before you speak to investigators",
      "Protect bail and challenge detention",
      "Prepare the strongest possible defence",
      "Manage reputation alongside your legal position",
    ],
    services: [
      "Police & Investigative Interviews",
      "Bail Applications",
      "Trial Defense",
      "White-Collar & Economic Crime",
      "Appeals & Post-Conviction Relief",
      "Confidential Criminal Advisory",
    ],
    whyChooseUs: [
      "Calm, rigorous advocacy",
      "Absolute confidentiality",
      "Early, active case preparation",
      "Straightforward, honest assessments",
    ],
    representativeMatters: [
      {
        title: "White-collar investigation",
        result: "Charges not pursued following strong representation",
      },
    ],
    faqs: [
      {
        question: "Should I speak to the police without a lawyer?",
        answer:
          "No. Exercising your right to counsel before answering questions is always in your interest, even if you are innocent.",
      },
      {
        question: "Will my case remain confidential?",
        answer:
          "Absolutely. Everything you share with our firm is protected by professional privilege.",
      },
    ],
  },
  {
    slug: "tax-law",
    name: "Tax Law",
    icon: Calculator,
    tagline: "Certainty in a complex fiscal landscape",
    description:
      "Tax structuring, compliance and disputes — planning that keeps you legal and keeps more of what you earn.",
    image: "/images/practice-areas/tax.svg",
    introduction:
      "Tax touches every transaction. We help individuals and businesses structure affairs efficiently and lawfully, comply with their obligations, and respond confidently to tax authority enquiries or assessments.",
    experience: {
      text: "We advise on corporate and personal tax across transactions, structuring, expatriate work and disputes with the revenue authorities.",
      highlights: [
        "Corporate and personal tax planning",
        "Cross-border and transaction structuring",
        "Tax authority audits and assessments",
        "Transfer pricing and compliance",
      ],
    },
    howWeHelp: [
      "Structure deals and ownership for efficiency",
      "Keep you compliant with filing and payment obligations",
      "Challenge unjust assessments",
      "Clarify tax treatment before you commit capital",
    ],
    services: [
      "Corporate Tax Advisory",
      "Personal Tax & Wealth Planning",
      "Transaction Structuring",
      "Tax Audits & Assessments",
      "Tax Dispute & Litigation",
      "Withholding, VAT & Payroll Compliance",
    ],
    whyChooseUs: [
      "Tax advice integrated with commercial reality",
      "Honest guidance on your true obligations",
      "Experienced in dealing with revenue authorities",
      "Preventative, not just reactive, planning",
    ],
    representativeMatters: [
      {
        title: "Transaction structuring with significant tax exposure",
        result: "Structure implemented lawfully reducing effective tax burden",
      },
    ],
    faqs: [
      {
        question: "Is aggressive tax avoidance illegal?",
        answer:
          "Artificial schemes are risky and increasingly challenged. We design arrangements that are lawful and defensible — efficiency without exposure.",
      },
      {
        question: "What should I do if I receive a tax assessment I disagree with?",
        answer:
          "Do not ignore it. Assessments carry strict timelines for objection; we can review and challenge it promptly.",
      },
    ],
  },
  {
    slug: "immigration-law",
    name: "Immigration Law",
    icon: Globe2,
    tagline: "Moving people and business across borders",
    description:
      "Residence, work permits and citizenship — clear routes through immigration rules and procedures.",
    image: "/images/practice-areas/immigration.svg",
    introduction:
      "Relocation should be planned, not improvised. We help individuals and employers navigate residence permits, work authorisations, and related processes, with clear advice on how the rules apply to your situation.",
    experience: {
      text: "Our immigration practice supports expatriate employees, investors, families and students with genuine and properly documented applications.",
      highlights: [
        "Work and residence permits",
        "Investor and business migration",
        "Family reunification",
        "Citizenship applications",
      ],
    },
    howWeHelp: [
      "Assess your eligibility honestly before you apply",
      "Prepare complete, decision-ready applications",
      "Advise employers on hiring and relocating talent",
      "Resolve refusals and applications in difficulty",
    ],
    services: [
      "Work & Residence Permits",
      "Investor & Business Migration",
      "Family Reunification",
      "Citizenship & Indefinite Residency",
      "Employer Compliance & Sponsorship",
      "Appeals & Administrative Reviews",
    ],
    whyChooseUs: [
      "Honest eligibility assessments",
      "Fast turnaround on urgent matters",
      "Employer-side experience",
      "Clear communication in plain language",
    ],
    representativeMatters: [
      {
        title: "Work permit and relocation programme for a corporate client",
        result: "All permits secured; mobilisation completed on time",
      },
    ],
    faqs: [
      {
        question: "How long do work permits take?",
        answer:
          "Processing times vary by category and office. We advise on realistic timelines and manage applications to avoid delay.",
      },
      {
        question: "Can I work while my application is being processed?",
        answer:
          "Usually not. Engaging in unauthorised work can seriously damage your application. Speak to us before you begin any activity.",
      },
    ],
  },
];

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((area) => area.slug === slug);
}

export function getPracticeAreasBySlug(slugs: string[]): PracticeArea[] {
  return slugs
    .map((slug) => getPracticeArea(slug))
    .filter((area): area is PracticeArea => Boolean(area));
}