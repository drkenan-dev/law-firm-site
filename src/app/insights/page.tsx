import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import BlogCard from "@/components/ui/BlogCard";
import CTASection from "@/components/ui/CTASection";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/site";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Legal Insights",
  description:
    "Practical legal insights and articles from the attorneys of Crestline Law Partners on contracts, disputes, property, employment and more.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal Insights"
        title="Guidance, In Writing"
        description="Articles and practical guidance written by our attorneys — on the legal questions our clients face most often."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Insights" }]}
        image="/images/hero/hero-interior.svg"
      />

      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Reveal key={post.slug} delay={(index % 3) * 90}>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}