import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { getAttorney } from "@/lib/content";

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  const author = getAttorney(post.authorSlug);
  const authorName = author?.name ?? "Crestline Law Partners";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-md border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-lg">
      <Link
        href={`/insights/${post.slug}`}
        className="relative block aspect-video overflow-hidden"
        aria-label={`Read article: ${post.title}`}
      >
        <Image
          src={post.image}
          alt={`Cover image for ${post.title}`}
          fill
          unoptimized
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-sm bg-paper px-2.5 py-1 font-semibold tracking-wide text-gold-600 uppercase">
            {post.category}
          </span>
          <time dateTime={post.date} className="text-charcoal-500">
            {formatDate(post.date)}
          </time>
        </div>

        <h3 className="mt-3 font-serif text-lg leading-snug text-navy-900">
          <Link href={`/insights/${post.slug}`} className="transition-colors hover:text-gold-600">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-500">{post.excerpt}</p>

        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
          <div className="flex items-center gap-2 text-xs text-charcoal-500">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-paper font-serif text-[10px] font-semibold text-navy-900">
              {authorName
                .split(" ")
                .map((word) => word[0])
                .slice(0, 2)
                .join("")}
            </span>
            <span className="font-medium text-navy-900">{authorName}</span>
          </div>
          <Link
            href={`/insights/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-700"
          >
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}