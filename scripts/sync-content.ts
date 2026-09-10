/**
 * =====================================================================
 * CONTENT SYNC — pulls content from the WordPress REST API and writes
 * `src/lib/content.generated.ts` (a client-safe, fully typed data module).
 *
 * Runs automatically before every `npm run build` / `npm run dev` via the
 * prebuild / predev hooks (and manually with `npm run sync:content`).
 *
 *   WP_API_URL = https://your-site.com   → fetch content from the CMS
 *   (unset / unreachable)                → regenerate from the seed data
 *
 * The WordPress endpoint used is /wp-json/crl/v1/all, provided by the
 * bundled "Crestline Headless" plugin (cms/wordpress/crl-headless).
 * =====================================================================
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { attorneys as seedAttorneys, type Attorney } from "../src/data/attorneys";
import { blogPosts as seedBlogPosts, type BlogPost, type ContentBlock } from "../src/data/blog";
import { vacancies as seedVacancies, type Vacancy } from "../src/data/careers";
import { caseResults as seedCaseResults, type CaseResult } from "../src/data/cases";
import {
  firm as seedFirm,
  statistics as seedStatistics,
  type FirmSettings,
  type Statistic,
} from "../src/data/firm";
import { faqs as seedFaqs, type Faq } from "../src/data/faqs";
import { practiceAreas as seedPracticeAreas, type PracticeArea } from "../src/data/practiceAreas";
import { testimonials as seedTestimonials, type Testimonial } from "../src/data/testimonials";
import { iconNameOf } from "../src/lib/iconRegistry";

// ---------------------------------------------------------------------
// Raw shapes returned by the WP plugin (/wp-json/crl/v1/all)
// ---------------------------------------------------------------------
type WpImage = { url?: string; alt?: string } | string | null | undefined;

type WpAttorney = {
  slug: string;
  name: string;
  position: string;
  photo: WpImage;
  featured?: boolean;
  summary: string;
  bio: string;
  practiceAreas?: string[];
  education?: string[];
  qualifications?: string[];
  barAdmissions?: string[];
  experience?: { title: string; years: string }[];
  representativeMatters?: string[];
  publications?: { title: string; year: string }[];
  languages?: string[];
  email: string;
  phone: string;
};

type WpPracticeArea = {
  slug: string;
  name: string;
  icon?: string;
  tagline: string;
  description: string;
  image: WpImage;
  introduction: string;
  experienceText?: string;
  experienceHighlights?: string[];
  howWeHelp?: string[];
  services?: string[];
  whyChooseUs?: string[];
  representativeMatters?: { title: string; result: string; confidential?: boolean }[];
  faqs?: { question: string; answer: string }[];
};

type WpPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  authorSlug: string;
  image: WpImage;
  bodyMarkdown: string;
};

type WpTestimonial = {
  id: string;
  quote: string;
  name: string;
  position: string;
  rating: number;
  photo?: WpImage;
};

type WpCase = {
  slug: string;
  category: string;
  title: string;
  description: string;
  result: string;
  image: WpImage;
  confidential?: boolean;
  practiceAreaSlug: string;
};

type WpFaq = { id: string; category: string; question: string; answer: string };

type WpVacancy = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  deadline: string;
  summary: string;
  responsibilities?: string[];
  qualifications?: string[];
};

type WpAll = {
  settings?: Partial<FirmSettings>;
  statistics?: Statistic[];
  attorneys?: WpAttorney[];
  practiceAreas?: WpPracticeArea[];
  posts?: WpPost[];
  testimonials?: WpTestimonial[];
  cases?: WpCase[];
  faqs?: WpFaq[];
  careers?: WpVacancy[];
};

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------
const strList = (value: unknown): string[] =>
  Array.isArray(value)
    ? (value as unknown[])
        .map((item) =>
          typeof item === "string" ? item : ((item as { value?: string })?.value ?? ""),
        )
        .filter(Boolean)
    : [];

const imgUrl = (img: WpImage): string => {
  if (!img) return "";
  return typeof img === "string" ? img : img.url ?? "";
};

/** Convert the CMS markdown-lite body into the site's content blocks. */
function markdownToBlocks(md: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  for (const raw of (md || "").split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;
    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", text: line.slice(3).trim() });
    } else if (line.startsWith("> ")) {
      blocks.push({ type: "quote", text: line.slice(2).trim() });
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      blocks.push({ type: "list", items: [line.replace(/^[-*]\s+/, "").trim()] });
    } else {
      blocks.push({ type: "paragraph", text: line.trim() });
    }
  }
  const merged: ContentBlock[] = [];
  for (const block of blocks) {
    const prev = merged[merged.length - 1];
    if (block.type === "list" && prev?.type === "list") {
      prev.items.push(...block.items);
    } else {
      merged.push(block);
    }
  }
  return merged;
}

const readingTimeOf = (text: string): string =>
  `${Math.max(3, Math.round((text.trim().split(/\s+/).length || 1) / 180))} min read`;

// ---------------------------------------------------------------------
// Raw → domain mappers (values ship character-for-character from the CMS)
// ---------------------------------------------------------------------
function mapAttorney(w: WpAttorney): Attorney {
  return {
    slug: String(w.slug || ""),
    name: String(w.name || ""),
    position: String(w.position || ""),
    photo: imgUrl(w.photo),
    featured: Boolean(w.featured),
    summary: String(w.summary || ""),
    bio: String(w.bio || ""),
    practiceAreaSlugs: strList(w.practiceAreas),
    education: strList(w.education),
    qualifications: strList(w.qualifications),
    barAdmissions: strList(w.barAdmissions),
    experience: (w.experience || []).map((e) => ({
      title: String(e.title || ""),
      years: String(e.years || ""),
    })),
    representativeMatters: strList(w.representativeMatters),
    publications: (w.publications || []).map((p) => ({
      title: String(p.title || ""),
      year: String(p.year || ""),
    })),
    languages: strList(w.languages),
    email: String(w.email || ""),
    phone: String(w.phone || ""),
  };
}

function mapPracticeArea(w: WpPracticeArea): Omit<PracticeArea, "icon"> & { icon: string } {
  return {
    slug: String(w.slug || ""),
    name: String(w.name || ""),
    icon: String(w.icon || "scale"),
    tagline: String(w.tagline || ""),
    description: String(w.description || ""),
    image: imgUrl(w.image),
    introduction: String(w.introduction || ""),
    experience: {
      text: String(w.experienceText || ""),
      highlights: strList(w.experienceHighlights),
    },
    howWeHelp: strList(w.howWeHelp),
    services: strList(w.services),
    whyChooseUs: strList(w.whyChooseUs),
    representativeMatters: (w.representativeMatters || []).map((r) => ({
      title: String(r.title || ""),
      result: String(r.result || ""),
      confidential: Boolean(r.confidential),
    })),
    faqs: (w.faqs || []).map((f) => ({
      question: String(f.question || ""),
      answer: String(f.answer || ""),
    })),
  };
}

function mapPost(w: WpPost): BlogPost {
  return {
    slug: String(w.slug || ""),
    title: String(w.title || ""),
    excerpt: String(w.excerpt || ""),
    category: String(w.category || "General"),
    date: String(w.date || ""),
    readingTime: readingTimeOf(String(w.bodyMarkdown || "")),
    authorSlug: String(w.authorSlug || ""),
    image: imgUrl(w.image),
    content: markdownToBlocks(String(w.bodyMarkdown || "")),
  };
}

function mapTestimonial(w: WpTestimonial): Testimonial {
  return {
    id: String(w.id || ""),
    quote: String(w.quote || ""),
    name: String(w.name || ""),
    position: String(w.position || ""),
    rating: Math.min(5, Math.max(1, Math.round(Number(w.rating) || 5))) as 1 | 2 | 3 | 4 | 5,
    photo: imgUrl(w.photo),
  };
}

function mapCase(w: WpCase): CaseResult {
  return {
    slug: String(w.slug || ""),
    category: String(w.category || ""),
    title: String(w.title || ""),
    description: String(w.description || ""),
    result: String(w.result || ""),
    image: imgUrl(w.image),
    confidential: Boolean(w.confidential),
    practiceAreaSlug: String(w.practiceAreaSlug || ""),
  };
}

function mapFaq(w: WpFaq): Faq {
  return {
    id: String(w.id || ""),
    category: String(w.category || ""),
    question: String(w.question || ""),
    answer: String(w.answer || ""),
  };
}

function mapVacancy(w: WpVacancy): Vacancy {
  return {
    id: String(w.id || ""),
    title: String(w.title || ""),
    department: String(w.department || ""),
    location: String(w.location || ""),
    type: String(w.type || ""),
    deadline: String(w.deadline || ""),
    summary: String(w.summary || ""),
    responsibilities: strList(w.responsibilities),
    qualifications: strList(w.qualifications),
  };
}

// ---------------------------------------------------------------------
// Fetch from WordPress
// ---------------------------------------------------------------------
async function fetchAll(): Promise<WpAll | null> {
  const base = (process.env.WP_API_URL || "").trim().replace(/\/+$/, "");
  if (!base) return null;
  const url = `${base}/wp-json/crl/v1/all`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!res.ok) {
      console.warn(`[sync-content] WP returned HTTP ${res.status} at ${url} — using seeds.`);
      return null;
    }
    const data = (await res.json()) as WpAll;
    console.log(`[sync-content] Loaded content from ${url}.`);
    return data;
  } catch (err) {
    console.warn(`[sync-content] WP fetch failed (${(err as Error).message}) — using seeds.`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// ---------------------------------------------------------------------
// Module emission
// ---------------------------------------------------------------------
const HEADER =
  "/**\n" +
  " * AUTO-GENERATED by scripts/sync-content.ts — DO NOT EDIT BY HAND.\n" +
  ' * Run `npm run sync:content` (or any build) to regenerate.\n' +
  " */\n";

/** Only re-export the seed modules (keeps icon components intact). */
function offlineModule(): string {
  return `${HEADER}
export { firm, statistics } from "@/data/firm";
export { attorneys, getAttorney } from "@/data/attorneys";
export { practiceAreas, getPracticeArea, getPracticeAreasBySlug } from "@/data/practiceAreas";
export { blogPosts, getBlogPost } from "@/data/blog";
export { caseResults } from "@/data/cases";
export { testimonials } from "@/data/testimonials";
export { faqs } from "@/data/faqs";
export { vacancies } from "@/data/careers";
`;
}

const pick = <T, S>(cmsValue: T[] | undefined, seedValue: S[]): (T | S)[] =>
  cmsValue && cmsValue.length ? cmsValue : seedValue;

function onlineModule(data: {
  firm: FirmSettings;
  statistics: Statistic[];
  attorneys: Attorney[];
  areas: Array<Omit<PracticeArea, "icon"> & { icon: string }>;
  posts: BlogPost[];
  cases: CaseResult[];
  testimonials: Testimonial[];
  faqs: Faq[];
  vacancies: Vacancy[];
}): string {
  const json = JSON.stringify;
  const emitAreas = (
    areas: Array<Omit<PracticeArea, "icon"> & { icon: string }>,
  ): string => {
    const plain = areas.map(({ icon, ...rest }) => ({ ...rest, icon: `@@ICON|${icon}|@@` }));
    return json(plain, null, 2)
      .replaceAll(`"@@ICON|`, `resolveIcon("`)
      .replaceAll(`|@@"`, `")`);
  };

  return `${HEADER}
import type { Attorney } from "@/data/attorneys";
import type { BlogPost } from "@/data/blog";
import type { Vacancy } from "@/data/careers";
import type { CaseResult } from "@/data/cases";
import type { FirmSettings, Statistic } from "@/data/firm";
import type { Faq } from "@/data/faqs";
import type { PracticeArea } from "@/data/practiceAreas";
import type { Testimonial } from "@/data/testimonials";
import { resolveIcon } from "@/lib/iconRegistry";

export const firm: FirmSettings = ${json(data.firm, null, 2)};

export const statistics: Statistic[] = ${json(data.statistics, null, 2)};

export const attorneys: Attorney[] = ${json(data.attorneys, null, 2)};

export const practiceAreas: PracticeArea[] = ${emitAreas(data.areas)};

export const blogPosts: BlogPost[] = ${json(data.posts, null, 2)};

export const caseResults: CaseResult[] = ${json(data.cases, null, 2)};

export const testimonials: Testimonial[] = ${json(data.testimonials, null, 2)};

export const faqs: Faq[] = ${json(data.faqs, null, 2)};

export const vacancies: Vacancy[] = ${json(data.vacancies, null, 2)};

export function getAttorney(slug: string): Attorney | undefined {
  return attorneys.find((a) => a.slug === slug);
}

export function getPracticeArea(slug: string): PracticeArea | undefined {
  return practiceAreas.find((a) => a.slug === slug);
}

export function getPracticeAreasBySlug(slugs: string[]): PracticeArea[] {
  return slugs
    .map((s) => getPracticeArea(s))
    .filter((a): a is PracticeArea => Boolean(a));
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
`;
}

// ---------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------
async function build(): Promise<string> {
  const wp = await fetchAll();
  if (!wp?.settings) return offlineModule();

  const s = wp.settings ?? {};
  const firm: FirmSettings = {
    ...seedFirm,
    ...s,
    address: { ...seedFirm.address, ...(s.address ?? {}) },
    hours: s.hours ?? seedFirm.hours,
    social: { ...seedFirm.social, ...(s.social ?? {}) },
  };

  return onlineModule({
    firm,
    statistics: pick(wp.statistics, seedStatistics),
    attorneys: pick(wp.attorneys, seedAttorneys).map((a) =>
      typeof (a as unknown as WpAttorney).summary === "string"
        ? mapAttorney(a as unknown as WpAttorney)
        : (a as unknown as Attorney),
    ),
    areas: pick(wp.practiceAreas, seedPracticeAreas).map((area) =>
      typeof (area as unknown as PracticeArea).icon === "string"
        ? mapPracticeArea(area as unknown as WpPracticeArea)
        : mapSeedArea(area as unknown as PracticeArea),
    ),
    posts: pick(wp.posts, seedBlogPosts).map((post) =>
      typeof (post as unknown as WpPost).bodyMarkdown === "string"
        ? mapPost(post as unknown as WpPost)
        : (post as unknown as BlogPost),
    ),
    cases: pick(wp.cases, seedCaseResults).map((c) =>
      typeof (c as unknown as WpCase).practiceAreaSlug === "string"
        ? mapCase(c as unknown as WpCase)
        : (c as unknown as CaseResult),
    ),
    testimonials: pick(wp.testimonials, seedTestimonials).map((x) =>
      typeof (x as unknown as WpTestimonial).rating === "number"
        ? mapTestimonial(x as unknown as WpTestimonial)
        : (x as unknown as Testimonial),
    ),
    faqs: pick(wp.faqs, seedFaqs).map((f) =>
      typeof (f as unknown as WpFaq).answer === "string"
        ? mapFaq(f as unknown as WpFaq)
        : (f as unknown as Faq),
    ),
    vacancies: pick(wp.careers, seedVacancies).map((v) =>
      typeof (v as unknown as WpVacancy).summary === "string"
        ? mapVacancy(v as unknown as WpVacancy)
        : (v as unknown as Vacancy),
    ),
  });
}

// Seed objects are already domain-shaped; keep their icon components and
// serialize them as registry names so the module stays value-only.
function mapSeedArea(area: PracticeArea): Omit<PracticeArea, "icon"> & { icon: string } {
  const { icon, ...rest } = area;
  return { ...rest, icon: iconNameOf(icon) };
}

async function main(): Promise<void> {
  const out = await build();
  const root = join(__dirname, "..");
  const outFile = join(root, "src", "lib", "content.generated.ts");
  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, out, "utf8");
  console.log(`[sync-content] Wrote ${outFile.replace(/\\/g, "/")}`);
}

void main();