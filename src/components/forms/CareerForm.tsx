"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Info } from "lucide-react";
import { TextInput, TextArea, SelectInput } from "./fields";
import Button from "@/components/ui/Button";
import type { Vacancy } from "@/data/careers";

type CareerFormValues = {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  coverLetter: string;
};

const initialValues: CareerFormValues = {
  fullName: "",
  email: "",
  phone: "",
  position: "",
  coverLetter: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Job application form with client-side validation.
 * NOTE: submissions are NOT sent anywhere yet — wire this to an API
 * route / email service when implementing the real careers pipeline.
 */
export default function CareerForm({ vacancies }: { vacancies: Vacancy[] }) {
  const [values, setValues] = useState<CareerFormValues>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set = <K extends keyof CareerFormValues>(key: K, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const validate = (): Record<string, string> => {
    const next: Record<string, string> = {};
    if (!values.fullName.trim()) next.fullName = "Full name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!EMAIL_RE.test(values.email.trim())) next.email = "Please enter a valid email address.";
    if (!values.phone.trim()) next.phone = "Phone is required.";
    if (!values.position) next.position = "Please select a position.";
    if (!values.coverLetter.trim()) next.coverLetter = "Please tell us a little about yourself.";
    return next;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setStatus("submitting");
    // Replace this timeout with a real submission,
    // e.g. fetch("/api/careers", { method: "POST", body: JSON.stringify(values) })
    window.setTimeout(() => setStatus("success"), 900);
  };

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-center rounded-md border border-gold-500/50 bg-cream p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-gold-600" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl text-navy-900">Application received</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal-500">
          This is a demonstration form, so no documents travelled anywhere yet. Once a real
          careers pipeline is connected, our talent team will be in touch.
        </p>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-6"
          onClick={() => {
            setValues(initialValues);
            setStatus("idle");
          }}
        >
          Apply for another position
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Full Name"
          required
          autoComplete="name"
          placeholder="Jane Doe"
          value={values.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          error={errors.fullName}
        />
        <TextInput
          label="Email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@example.com"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          error={errors.email}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="+233 20 000 0000"
          value={values.phone}
          onChange={(e) => set("phone", e.target.value)}
          error={errors.phone}
        />
        <SelectInput
          label="Position"
          required
          placeholder="Select the position you are applying for"
          options={vacancies.map((v) => ({ value: v.id, label: v.title }))}
          value={values.position}
          onChange={(e) => set("position", e.target.value)}
          error={errors.position}
        />
      </div>

      <TextArea
        label="Cover Letter"
        required
        rows={6}
        placeholder="Tell us about yourself and why you would be a great fit."
        value={values.coverLetter}
        onChange={(e) => set("coverLetter", e.target.value)}
        error={errors.coverLetter}
      />

      <div className="flex items-start gap-2.5 rounded-sm border border-gold-500/40 bg-gold-300/10 p-3.5 text-xs leading-relaxed text-charcoal-700" role="note">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
        <p>
          In the live version of this form you will be able to attach a CV. Applications remain
          confidential and are reviewed only by the hiring team.
        </p>
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" variant="gold" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Submitting…
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
        <p className="text-xs text-charcoal-500">* Required fields</p>
      </div>
    </form>
  );
}