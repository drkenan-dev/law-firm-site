/**
 * =====================================================================
 * LEGAL INSIGHTS / BLOG — central data source.
 * Each post renders a listing card AND a full article page.
 * `authorSlug` should match an entry in /src/data/attorneys.ts.
 * `image` points to a file in /public/images/blog/
 * =====================================================================
 */

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  authorSlug: string;
  image: string;
  content: ContentBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "things-businesses-should-know-before-signing-contracts",
    title: "5 Things Every Business Should Know Before Signing a Contract",
    excerpt:
      "Contracts are where businesses gain or lose the most value. These five checks will protect you before you sign.",
    category: "Commercial",
    date: "2026-08-18",
    readingTime: "5 min read",
    authorSlug: "john-williams",
    image: "/images/blog/blog-contracts.svg",
    content: [
      {
        type: "paragraph",
        text: "Every commercial relationship is governed by a contract — whether a simple supply agreement or a complex joint venture. Yet many businesses sign agreements without understanding the obligations they are accepting. These five checks will help you avoid the most common mistakes.",
      },
      { type: "heading", text: "1. Who is actually the other party?" },
      {
        type: "paragraph",
        text: "Confirm the legal identity of the entity you are contracting with. A contract with a shell company, or with the wrong subsidiary of a group, can be worth little when you need to enforce it. Verify registration details and that the signatory actually has authority to bind the company.",
      },
      { type: "heading", text: "2. What are you promising — and what are they promising?" },
      {
        type: "paragraph",
        text: "Read the obligations clauses in full. Notice deadlines, delivery terms, payment milestones and any open-ended wording such as 'best efforts' or 'as required'. Vague obligations are a reliable source of future disputes.",
      },
      { type: "heading", text: "3. What happens when something goes wrong?" },
      {
        type: "list",
        items: [
          "Termination rights and notice periods",
          "Liability caps, limitation of liability and indemnities",
          "Force majeure and handling of delays",
          "Dispute resolution: court or arbitration, and where",
        ],
      },
      { type: "heading", text: "4. Does the contract match the deal you actually agreed?" },
      {
        type: "paragraph",
        text: "If verbal commitments were made during negotiation that do not appear in the signed document, they are usually lost. The written agreement is the entire contract in practice. If a promise matters, insist it is included.",
      },
      { type: "heading", text: "5. What is your exit?" },
      {
        type: "paragraph",
        text: "No business expects to walk away from every relationship, but the best time to negotiate an exit is before you are desperate for one. Review termination, handover and post-termination obligations carefully — especially the non-compete and confidentiality clauses that survive.",
      },
      {
        type: "quote",
        text: "A contract is not paperwork. It is the memory of your business relationship — make sure it remembers the deal correctly.",
      },
      {
        type: "paragraph",
        text: "If you would like a contract reviewed before you sign, our commercial team is happy to help. Contact us to schedule a consultation.",
      },
    ],
  },
  {
    slug: "understanding-your-rights-in-commercial-dispute",
    title: "Understanding Your Rights in a Commercial Dispute",
    excerpt:
      "When a business relationship breaks down, knowing your rights — and your options — is the first step to protecting your position.",
    category: "Dispute Resolution",
    date: "2026-07-30",
    readingTime: "6 min read",
    authorSlug: "sarah-anderson",
    image: "/images/blog/blog-dispute.svg",
    content: [
      {
        type: "paragraph",
        text: "A dispute is rarely a surprise — it is the slow breakdown of trust, payments or performance that finally reaches a breaking point. When it does, how you respond in the first weeks will shape the cost, duration and outcome of the conflict.",
      },
      { type: "heading", text: "First: stabilise the position" },
      {
        type: "paragraph",
        text: "Set out your position in writing, clearly and professionally. A well-drafted letter of demand does three things at once: it records your claim, opens the door to resolution, and — if it is ignored — becomes powerful evidence of your reasonableness.",
      },
      { type: "heading", text: "Understand what you must prove" },
      {
        type: "list",
        items: [
          "The contract or duty owed to you",
          "The breach or wrongful act",
          "The loss you actually suffered",
          "The causal link between the two",
        ],
      },
      {
        type: "paragraph",
        text: "This 'building blocks' approach sounds academic, but it is the test every tribunal will apply. Gather the documentary trail now, while it is fresh: contracts, invoices, correspondence and records of performance.",
      },
      { type: "heading", text: "Know your options before you choose one" },
      {
        type: "paragraph",
        text: "Litigation is only one route. Negotiation, mediation and arbitration each offer different balances of speed, cost, confidentiality and enforceability. In many commercial disputes, a skilled mediator helps parties identify a resolution no court could order.",
      },
      { type: "heading", text: "Watch the clock" },
      {
        type: "paragraph",
        text: "Claims are subject to limitation periods. Failing to act — or failing to document that you pressed your claim — can extinguish your rights. If you believe you have a claim, confirmation from a lawyer is worthwhile before the deadline passes.",
      },
      {
        type: "quote",
        text: "In disputes, the party who prepares first usually prepares best. Do not negotiate from a position of ignorance.",
      },
    ],
  },
  {
    slug: "important-considerations-when-buying-property",
    title: "Important Considerations When Buying Property",
    excerpt:
      "Buying property is one of the largest commitments you will make. These are the legal checks that protect your investment.",
    category: "Real Estate",
    date: "2026-07-02",
    readingTime: "5 min read",
    authorSlug: "michael-johnson",
    image: "/images/blog/blog-property.svg",
    content: [
      {
        type: "paragraph",
        text: "Property purchases fail for a handful of predictable reasons: defective titles, undisclosed encumbrances, unauthorised structures and financing gaps. Every one of them is discoverable before you commit — if you look.",
      },
      { type: "heading", text: "Title first, always" },
      {
        type: "paragraph",
        text: "Establish who genuinely owns the land and whether that title is registered, unregistered or in dispute. Search the land registers, trace prior transfers, and confirm any pending caution or litigation affecting the property.",
      },
      { type: "heading", text: "Look beyond the walls" },
      {
        type: "list",
        items: [
          "Planning and building permits for all structures",
          "Zoning and permitted uses of the land",
          "Outstanding rates, taxes and utility charges",
          "Physical inspection to confirm boundaries",
        ],
      },
      { type: "heading", text: "Structure the payment properly" },
      {
        type: "paragraph",
        text: "Make payments against signed documentation and verified ownership, not before. Deposits should be governed by the agreement, with staged payments linked to milestones such as registration of the transfer.",
      },
      { type: "heading", text: "Get the registration done" },
      {
        type: "paragraph",
        text: "A purchase is only complete when the transfer is registered in your name. Leaving registration undone — a surprisingly common oversight — leaves you exposed to competing claims over the very land you paid for.",
      },
      {
        type: "quote",
        text: "The difference between an investment and a liability is often just a few weeks of proper due diligence.",
      },
    ],
  },
  {
    slug: "what-to-expect-first-court-appearance",
    title: "What to Expect at a First Court Appearance",
    excerpt:
      "Your first hearing is shorter and more procedural than most people expect. Here is what happens, and how to prepare.",
    category: "Litigation",
    date: "2026-06-10",
    readingTime: "4 min read",
    authorSlug: "sarah-anderson",
    image: "/images/blog/blog-court.svg",
    content: [
      {
        type: "paragraph",
        text: "The idea of a first court appearance generates more anxiety than it should. In most matters the first hearing is procedural: the court confirms the parties, notes the pleadings and sets a timetable for the case.",
      },
      { type: "heading", text: "Before the hearing" },
      {
        type: "paragraph",
        text: "Your lawyer will ensure all documents are filed and served on time, and will tell you what to bring. Arrive early, dress appropriately, and prepare to be patient — courts often run behind schedule.",
      },
      { type: "heading", text: "During the hearing" },
      {
        type: "list",
        items: [
          "The judge or registrar identifies the parties and case",
          "Counsel briefly summarises the position",
          "Directions are given for the next steps",
          "Dates are fixed for filing and the next hearing",
        ],
      },
      {
        type: "paragraph",
        text: "In most cases you will not give evidence at the first appearance — that usually comes much later. Your role is to be present, courteous and prepared.",
      },
      { type: "heading", text: "After the hearing" },
      {
        type: "paragraph",
        text: "Your lawyer will confirm the next steps in writing. Cases progress through stages — pleadings, disclosure, evidence, hearing — and most settle before trial. Preparation at each stage preserves your negotiating position throughout.",
      },
      {
        type: "quote",
        text: "Litigation is a process, not an event. Understanding the process removes most of the anxiety.",
      },
    ],
  },
  {
    slug: "trademark-protection-worth-it",
    title: "Is Trade Mark Protection Worth It?",
    excerpt:
      "When your brand becomes an asset, unregistered rights are rarely enough. Here is when — and why — registration pays.",
    category: "Intellectual Property",
    date: "2026-05-22",
    readingTime: "4 min read",
    authorSlug: "daniel-opoku",
    image: "/images/blog/blog-trademark.svg",
    content: [
      {
        type: "paragraph",
        text: "Most businesses treat their name, logo and slogan as marketing costs — until someone else starts using them. By then, enforcing unregistered rights is slow, expensive and uncertain. Registration turns your brand into a property right you can actually enforce.",
      },
      { type: "heading", text: "What registration gives you" },
      {
        type: "list",
        items: [
          "Nationwide monopoly over the mark in your classes",
          "A legal basis to stop copycats at the border and in the market",
          "A registrable asset that can be licensed, assigned or valued",
          "Priority against later applications by competitors",
        ],
      },
      { type: "heading", text: "When to file" },
      {
        type: "paragraph",
        text: "File early. In most systems the first filer wins, and a modest filing fee today can avoid an expensive rebranding campaign tomorrow. File before you launch, not after your brand becomes successful.",
      },
      { type: "heading", text: "Common mistakes" },
      {
        type: "paragraph",
        text: "Filing in too few classes, failing to monitor, and letting registrations lapse through non-renewal are the three most common — and easily avoidable — errors we see. A properly managed portfolio renews and expands as your business does.",
      },
      {
        type: "quote",
        text: "Your brand is worth more than your website. Protect it like the asset it is.",
      },
    ],
  },
  {
    slug: "choosing-between-mediation-and-litigation",
    title: "Mediation or Litigation: Which Route Is Right For You?",
    excerpt:
      "Disputes can end several ways. Understanding the trade-offs between mediation and litigation will help you choose wisely.",
    category: "Dispute Resolution",
    date: "2026-04-15",
    readingTime: "5 min read",
    authorSlug: "emily-carter",
    image: "/images/blog/blog-mediation.svg",
    content: [
      {
        type: "paragraph",
        text: "When a dispute erupts, the instinct is often to 'take them to court'. But litigation is a process, not a destination — and in many cases mediation reaches that destination faster, cheaper and with more control over the outcome.",
      },
      { type: "heading", text: "What mediation offers" },
      {
        type: "paragraph",
        text: "Mediation is a structured negotiation with a neutral facilitator. Nothing is decided until both parties agree. That makes it creative, confidential and fast — settlements are typically reached in days, not years.",
      },
      { type: "heading", text: "What litigation offers" },
      {
        type: "list",
        items: [
          "A binding, enforceable judgment",
          "Formal rules of evidence and procedure",
          "Precedent that can matter beyond your case",
          "A public record of the outcome",
        ],
      },
      { type: "heading", text: "How to choose" },
      {
        type: "paragraph",
        text: "Ask three questions. Is the relationship worth preserving? Is confidentiality important? And is the disputed point something a court should decide for you? Where answers point to preservation, discretion and speed, mediation almost always wins.",
      },
      {
        type: "paragraph",
        text: "A skilled lawyer will advise honestly on which route fits your case — not on which generates the largest bill. That is the advice we give: sometimes the best win is the one that never reaches a courtroom.",
      },
      {
        type: "quote",
        text: "The best dispute is the one resolved well before anyone mentions a trial date.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}