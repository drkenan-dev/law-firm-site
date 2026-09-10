import type { Metadata } from "next";
import { firm } from "@/lib/content";

/**
 * Central site configuration used for SEO.
 * Replace NEXT_PUBLIC_SITE_URL in your build environment with the
 * real production URL (e.g. https://www.examplelawfirm.com).
 */
export const siteConfig = {
  name: firm.name,
  legalName: firm.legalName,
  description: firm.description,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://examplelawfirm.com",
  locale: "en_GH",
  ogImage: "/images/general/og-cover.svg",
};

type BuildMetadataArgs = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
};

/** Build a consistent Metadata object for every page. */
export function buildMetadata({
  title,
  description,
  path = "",
  ogImage = siteConfig.ogImage,
}: BuildMetadataArgs): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  };
}