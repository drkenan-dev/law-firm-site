/**
 * =====================================================================
 * FIRM CONFIGURATION — edit this file to re-brand the whole website.
 * Everything displayed across the site (name, address, phone, stats,
 * social links, hours) is driven from this single data source.
 * =====================================================================
 */
import type { LucideIcon } from "lucide-react";
import { Award, HeartHandshake, Target, Trophy, Lock, MessagesSquare } from "lucide-react";

export type Statistic = {
  value: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

/** Editable firm settings driven by the CMS (with these file values as defaults). */
export type FirmSettings = {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  established: number;
  phone: string;
  email: string;
  address: { street: string; city: string; region: string; country: string };
  hours: { days: string; time: string }[];
  social: Record<string, string>;
};

export const firm: FirmSettings = {
  /** Firm / brand name shown in the logo, footer and metadata. */
  name: "Crestline Law Partners",
  /** Full legal entity name used in the footer and legal pages. */
  legalName: "Crestline Law Partners LLP",
  /** Short mission statement used in the hero, footer and SEO. */
  tagline: "Experienced Legal Counsel. Trusted Representation.",
  description:
    "Providing strategic legal advice and dedicated representation for individuals, businesses, and organizations across Ghana and beyond.",
  /** Year the firm was established (used in the about timeline). */
  established: 1999,
  /** Internal note: all of the following contact details are DUMMY data. */
  phone: "+233 20 000 0000",
  email: "info@examplelawfirm.com",
  address: {
    street: "123 Legal Avenue",
    city: "Accra",
    region: "Greater Accra Region",
    country: "Ghana",
  },
  /** Office hours shown in the footer and contact page. */
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 5:00 PM" },
    { days: "Saturday – Sunday", time: "Closed" },
  ],
  /** Social media profile URLs — replace with real links. */
  social: {
    linkedin: "https://www.linkedin.com/",
    twitter: "https://x.com/",
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
};

/**
 * Main navigation.
 * Add or remove items here and the desktop + mobile menus update automatically.
 */
export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Attorneys", href: "/attorneys" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const consultationHref = "/contact#consultation";

/** Footer quick links (secondary navigation). */
export const quickLinks = [
  { label: "About the Firm", href: "/about" },
  { label: "Our Attorneys", href: "/attorneys" },
  { label: "Practice Areas", href: "/practice-areas" },
  { label: "Case Results", href: "/case-results" },
  { label: "Legal Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
] as const;

/** Photorealistic fields shown on some pages. Keys map to global socials. */
export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: firm.social.linkedin },
  { label: "X (Twitter)", href: firm.social.twitter },
  { label: "Facebook", href: firm.social.facebook },
  { label: "Instagram", href: firm.social.instagram },
];

/**
 * STATISTICS — dummy figures used across the home + about pages.
 * Replace `value` with real, accurate numbers when available.
 */
export const statistics: Statistic[] = [
  { value: "25+", label: "Years of Experience" },
  { value: "1,500+", label: "Clients Represented" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "50+", label: "Professional Awards" },
];

/** "Why choose us" highlights shown on the home + about pages. */
export type WhyChooseItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const whyChooseUs: WhyChooseItem[] = [
  {
    title: "Experienced Legal Professionals",
    description:
      "A senior team with deep experience across commercial, civil and criminal matters.",
    icon: Award,
  },
  {
    title: "Client-Focused Approach",
    description:
      "We listen first, explain clearly, and build strategies around your goals.",
    icon: HeartHandshake,
  },
  {
    title: "Strategic Legal Solutions",
    description:
      "Practical, well-reasoned advice designed to protect your position and your interests.",
    icon: Target,
  },
  {
    title: "Strong Track Record",
    description:
      "A history of successful outcomes in negotiations, transactions and disputes.",
    icon: Trophy,
  },
  {
    title: "Confidential & Professional",
    description:
      "Your matters are handled with the discretion and integrity they deserve.",
    icon: Lock,
  },
  {
    title: "Responsive Communication",
    description:
      "Clear, timely updates on every matter — you will never be left in the dark.",
    icon: MessagesSquare,
  },
] as const;

/** Milestones for the firm history timeline (descriptions are dummy). */
export const timeline = [
  {
    year: "1999",
    title: "Firm Founded",
    description:
      "Crestline Law Partners opens its doors in Accra with two partners and a focus on commercial and corporate work.",
  },
  {
    year: "2004",
    title: "Dispute Resolution Practice",
    description:
      "Expansion into litigation and dispute resolution, establishing the firm as a force in complex civil matters.",
  },
  {
    year: "2010",
    title: "Full-Service Firm",
    description:
      "Growth into family, employment, real estate and intellectual property, forming a full-service offering.",
  },
  {
    year: "2016",
    title: "Growth & Recognition",
    description:
      "Recognition in leading legal directories and receipt of regional awards for client service.",
  },
  {
    year: "2021",
    title: "Technology & Reach",
    description:
      "Launch of client portals and digital services, extending support to clients beyond Accra.",
  },
  {
    year: "2026",
    title: "Today",
    description:
      "A team of more than fifteen attorneys advising clients across every major practice area the firm serves.",
  },
] as const;

export const firmValues = [
  {
    title: "Integrity",
    description: "We act honestly and ethically in every matter, without exception.",
  },
  {
    title: "Excellence",
    description: "We hold ourselves to the highest professional standards.",
  },
  {
    title: "Client First",
    description: "Your interests guide every decision we make.",
  },
  {
    title: "Diligence",
    description: "Thorough preparation — because good outcomes begin at the desk.",
  },
] as const;