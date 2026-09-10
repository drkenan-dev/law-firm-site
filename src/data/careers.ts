/**
 * =====================================================================
 * CAREERS — central data source for /careers.
 * List vacancies and internship openings in these arrays and the
 * careers page renders them automatically.
 * =====================================================================
 */

export type Vacancy = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  deadline: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
};

export const firmCulture = [
  "A collegial, collaborative atmosphere where partners work directly with younger lawyers",
  "Structured mentorship and real responsibility from the first year",
  "Clear, honest feedback and support in balancing demanding matters",
  "Genuine respect for the lives our lawyers have outside the office",
];

export const benefits = [
  "Competitive compensation reviewed annually",
  "Comprehensive health insurance for you and your immediate family",
  "Professional development budget for courses and qualifications",
  "Bar association and membership fees covered",
  "Paid parental leave",
  "Annual leave and flexible working arrangements",
  "Pension contributions",
  "Access to the firm's wellbeing and counselling programme",
];

export const vacancies: Vacancy[] = [
  {
    id: "associate-dispute-resolution",
    title: "Associate, Litigation & Dispute Resolution",
    department: "Dispute Resolution",
    location: "Accra",
    type: "Full-time",
    deadline: "Rolling",
    summary:
      "Join our dispute team representing businesses and individuals in courts, tribunals and arbitrations across the region.",
    responsibilities: [
      "Preparing pleadings, applications and legal opinions",
      "Attending hearings and running advocacy before registrars and judges",
      "Managing document review and disclosure",
      "Supporting partners in mediation and arbitration",
    ],
    qualifications: [
      "Qualified barrister & solicitor with 2–4 years' PQE",
      "Strong drafting and research skills",
      "A genuine interest in commercial and civil disputes",
    ],
  },
  {
    id: "associate-corporate",
    title: "Associate, Corporate & Commercial",
    department: "Corporate",
    location: "Accra",
    type: "Full-time",
    deadline: "Rolling",
    summary:
      "Work alongside our partners on transactions, governance and commercial contracts for a varied client base.",
    responsibilities: [
      "Drafting contracts, board papers and transaction documents",
      "Managing due diligence exercises",
      "Advising clients on compliance and corporate housekeeping",
      "Preparing transaction documentation and closing matters",
    ],
    qualifications: [
      "Qualified barrister & solicitor with 2–3 years' PQE",
      "Commercial awareness and strong attention to detail",
      "Experience in M&A or banking transactions is an advantage",
    ],
  },
  {
    id: "graduate-intern",
    title: "Graduate Trainee (Six-Month Rotation)",
    department: "Various",
    location: "Accra",
    type: "Internship",
    deadline: "Rolling — two intakes per year",
    summary:
      "A structured paid internship across two practice areas, designed for outstanding law graduates taking the bar.",
    responsibilities: [
      "Rotating through two practice groups over six months",
      "Supporting associates with research, drafting and filing",
      "Attending court and client meetings with supervision",
      "Preparing a supervised research paper for publication",
    ],
    qualifications: [
      "Final-year law student or recent graduate",
      "Excellent academic record",
      "Strong written and spoken English",
    ],
  },
  {
    id: "paralegal",
    title: "Paralegal, Real Estate & Conveyancing",
    department: "Real Estate",
    location: "Accra",
    type: "Full-time",
    deadline: "Rolling",
    summary:
      "Support our real estate team with title searches, registration and transaction administration.",
    responsibilities: [
      "Conducting title and company searches",
      "Preparing registration documents and tracking filings",
      "Managing transaction checklists and client files",
      "Liaising with registries and surveyors",
    ],
    qualifications: [
      "Paralegal certificate or law degree",
      "Familiarity with land registration procedures",
      "Excellent organisational ability",
    ],
  },
];

export const internshipRoles = [
  "Corporate & Commercial",
  "Litigation & Dispute Resolution",
  "Real Estate Law",
  "Intellectual Property",
];