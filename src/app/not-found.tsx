import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { firm } from "@/lib/content";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-navy-950 px-4 py-24 text-white">
      <div className="mx-auto max-w-xl text-center">
        <p className="font-serif text-7xl text-gold-500 sm:text-8xl">404</p>
        <h1 className="mt-4 font-serif text-3xl text-balance sm:text-4xl">
          This page appears to have been adjourned
        </h1>
        <p className="mt-4 text-white/70">
          The page you are looking for does not exist or has moved. Let us point you back in the
          right direction.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="gold" size="lg">
            Back to Home
          </Button>
          <Button href="/contact" variant="outlineLight" size="lg">
            Contact Us
          </Button>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-left">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase">
            Popular pages
          </p>
          <ul className="grid gap-2 text-sm text-white/70 sm:grid-cols-2">
            <li><Link className="hover:text-gold-300" href="/practice-areas">Practice Areas</Link></li>
            <li><Link className="hover:text-gold-300" href="/attorneys">Our Attorneys</Link></li>
            <li><Link className="hover:text-gold-300" href="/insights">Legal Insights</Link></li>
            <li><Link className="hover:text-gold-300" href="/about">About {firm.name}</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}