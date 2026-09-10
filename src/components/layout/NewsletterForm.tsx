"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Newsletter signup.
 * NOTE: does not post anywhere yet — wire it to your email-service
 * backend (e.g. via /api/newsletter) to record subscriptions.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStatus("submitting");
    window.setTimeout(() => setStatus("success"), 700);
  };

  if (status === "success") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm text-gold-300">
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        Thank you for subscribing.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-5">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex max-w-sm gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          aria-invalid={error ? true : undefined}
          className={cn(
            "w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-colors focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30",
            error && "border-red-400",
          )}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex shrink-0 items-center justify-center rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-400 disabled:opacity-60"
        >
          {status === "submitting" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-300">
          {error}
        </p>
      )}
    </form>
  );
}