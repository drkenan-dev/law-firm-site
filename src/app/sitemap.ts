import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { practiceAreas, attorneys, blogPosts } from "@/lib/content";

export const dynamic = "force-static";

const staticRoutes = [
  "",
  "/about",
  "/attorneys",
  "/practice-areas",
  "/services",
  "/case-results",
  "/insights",
  "/careers",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const dynamic = [
    ...practiceAreas.map((area) => ({
      url: `${base}/practice-areas/${area.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...attorneys.map((attorney) => ({
      url: `${base}/attorneys/${attorney.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => ({
      url: `${base}/insights/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  const statics = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  return [...statics, ...dynamic];
}