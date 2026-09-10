import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import BlogCard from "@/components/ui/BlogCard";
import CTASection from "@/components/ui/CTASection";
import Button from "@/components/ui/Button";
import SocialLinks from "@/components/layout/SocialLinks";
import Reveal from "@/components/Reveal";
import type { ContentBlock } from "@/data/blog";
import { getBlogPost, blogPosts } from "@/lib/content";
import { getAttorney } from "@/lib/content";
import { buildMetadata } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return buildMetadata({ title: "Article Not Found", description: "Article not found." });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/insights/${post.slug}`,
    ogImage: post.image,
  });
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const author = getAttorney(post.authorSlug);
  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Insights", href: "/insights" },
          { label: post.title },
        ]}
      />

      <article className="container-site py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          {/* Meta */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-charcoal-500">
              <span className="inline-flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-paper font-serif text-xs font-semibold text-navy-900">
                  {(author?.name ?? "Crestline")
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                {author ? (
                  <Link href={`/attorneys/${author.slug}`} className="font-semibold text-navy-900 transition-colors hover:text-gold-600">
                    {author.name}
                  </Link>
                ) : (
                  <span className="font-semibold text-navy-900">Crestline Law Partners</span>
                )}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-gold-600" aria-hidden="true" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-gold-600" aria-hidden="true" />
                {post.readingTime}
              </span>
            </div>
          </Reveal>

          {/* Cover */}
          <Reveal delay={80} className="mt-8">
            <div className="overflow-hidden rounded-md shadow-card-lg">
              <Image
                src={post.image}
                alt={`Cover image for: ${post.title}`}
                width={800}
                height={500}
                unoptimized
                className="aspect-video w-full object-cover"
                priority
              />
            </div>
          </Reveal>

          {/* Body */}
          <Reveal delay={120} className="mt-10">
            <div className="space-y-6">
              {post.content.map((block, index) => (
                <ContentBlockView key={index} block={block} />
              ))}
            </div>
          </Reveal>

          {/* Divider + share */}
          <div className="mt-10 border-t border-line pt-8">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">
                Share this article
              </p>
              <SocialLinks />
            </div>
          </div>

          {/* Author box */}
          {author && (
            <Reveal className="mt-10 rounded-md border border-line bg-cream p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <Image
                  src={author.photo}
                  alt={`Portrait of ${author.name}`}
                  width={120}
                  height={144}
                  unoptimized
                  className="h-28 w-24 shrink-0 rounded-sm object-cover"
                />
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-gold-600 uppercase">Written By</p>
                  <h2 className="mt-1 font-serif text-xl text-navy-900">{author.name}</h2>
                  <p className="mt-0.5 text-xs font-medium text-charcoal-500">{author.position}</p>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-500">{author.summary}</p>
                  <Link
                    href={`/attorneys/${author.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-700"
                  >
                    View Full Profile <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </Reveal>
          )}

          <div className="mt-10 flex justify-between gap-4">
            <Button href="/insights" variant="ghost" size="sm" className="-ml-3">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All Insights
            </Button>
            <Button href="/contact#consultation" variant="gold" size="sm">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="bg-paper py-20 lg:py-24">
        <div className="container-site">
          <SectionHeading eyebrow="Continue Reading" title="More From Our Insight" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 3) * 80}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function ContentBlockView({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      return <h2 className="pt-2 font-serif text-2xl text-navy-900">{block.text}</h2>;
    case "list":
      return (
        <ul className="space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 leading-relaxed text-charcoal-700">
              <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-gold-500 bg-cream px-6 py-5 font-serif text-lg italic leading-relaxed text-navy-900">
          {block.text}
        </blockquote>
      );
    default:
      return <p className="leading-relaxed text-charcoal-700">{block.text}</p>;
  }
}