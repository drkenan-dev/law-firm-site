/**
 * =====================================================================
 * FAQS — central data source for /faq.
 * `category` is used to group and filter questions on the FAQ page.
 * =====================================================================
 */

export type Faq = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export const faqCategories = [
  "Consultations",
  "Fees & Billing",
  "Case Process",
  "Client Relationship",
] as const;

export const faqs: Faq[] = [
  {
    id: "schedule-consultation",
    category: "Consultations",
    question: "How do I schedule a consultation?",
    answer:
      "You can schedule a consultation through our contact page, by calling our office, or by email. Choose a preferred date and time and our team will confirm within one business day.",
  },
  {
    id: "what-to-bring",
    category: "Consultations",
    question: "What should I bring to my first consultation?",
    answer:
      "Bring any documents relevant to your matter — contracts, correspondence, notices, court papers or corporate records. Even a rough chronology written on one page is useful. We will guide you through everything you need during the meeting.",
  },
  {
    id: "first-consultation-cost",
    category: "Consultations",
    question: "Is the first consultation free?",
    answer:
      "The first consultation is offered at a fixed, modest fee so we can give you genuine, considered advice. This is confirmed when you book so there are no surprises.",
  },
  {
    id: "remote-consultation",
    category: "Consultations",
    question: "Can consultations take place remotely?",
    answer:
      "Yes. We offer consultations by video call and by telephone for clients inside Ghana and abroad.",
  },
  {
    id: "fees-calculated",
    category: "Fees & Billing",
    question: "How are legal fees calculated?",
    answer:
      "Fees are agreed before work begins and are quoted either as a fixed fee, an hourly rate, or a success-based arrangement where appropriate. You will always know the basis of charging before you commit.",
  },
  {
    id: "costs-estimate",
    category: "Fees & Billing",
    question: "Can I get an estimate of costs before we start?",
    answer:
      "Yes. Following the initial consultation we provide a written estimate setting out expected fees, likely disbursements and any contingencies, so you can budget with confidence.",
  },
  {
    id: "payment-options",
    category: "Fees & Billing",
    question: "What payment options are available?",
    answer:
      "We accept bank transfer, card payments and, for agreed monthly retainers, standing instructions. Payment schedules are confirmed in writing at the start of the engagement.",
  },
  {
    id: "how-long-case",
    category: "Case Process",
    question: "How long does a typical case take?",
    answer:
      "That depends entirely on the matter. Simple commercial negotiations may conclude within weeks; litigation regularly takes months to years. We give you a realistic timeline at the outset and keep you updated as it changes.",
  },
  {
    id: "how-we-communicate",
    category: "Case Process",
    question: "How will I stay updated on my case?",
    answer:
      "Your lead lawyer is your single point of contact. You will receive updates at every meaningful stage, and urgent developments are raised immediately.",
  },
  {
    id: "letter-of-demand",
    category: "Case Process",
    question: "Do you always start with a demand letter?",
    answer:
      "In most disputes, a professional demand letter resolves matters without court proceedings. It is our default first step — it is fast, inexpensive and preserves your position if the matter later goes to trial.",
  },
  {
    id: "attorney-client",
    category: "Client Relationship",
    question: "Does submitting a contact form create an attorney-client relationship?",
    answer:
      "No. Submitting a form or emailing our firm does not create an attorney-client relationship. A formal engagement is only established when you receive and sign our terms of engagement.",
  },
  {
    id: "confidentiality",
    category: "Client Relationship",
    question: "Will what I tell you remain confidential?",
    answer:
      "Yes. Information you share with our firm while seeking legal advice is protected by professional privilege. We take confidentiality seriously and handle every matter discreetly.",
  },
  {
    id: "conflict-of-interest",
    category: "Client Relationship",
    question: "What if you act for the other side in my matter?",
    answer:
      "We check for conflicts of interest before accepting any new matter. If a conflict exists, we will decline the engagement and, where possible, recommend another firm.",
  },
  {
    id: "change-lawyer",
    category: "Client Relationship",
    question: "Can I change lawyers partway through a matter?",
    answer:
      "You may terminate our engagement at any time and instruct another firm. We will hand over your file promptly and support an orderly transition.",
  },
];