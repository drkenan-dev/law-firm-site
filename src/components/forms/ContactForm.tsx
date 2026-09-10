"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { TextInput, TextArea, SelectInput, RadioGroup } from "./fields";
import { validateContactForm, type FormErrors, type ContactFormValues } from "./validation";
import { practiceAreas } from "@/lib/content";
import Button from "@/components/ui/Button";

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  practiceArea: "",
  message: "",
  contactMethod: "Email",
};

/**
 * Contact form with client-side validation.
 * NOTE: submissions are NOT sent to a backend yet. To enable real
 * delivery, POST these values to `/api/contact` (see README) and
 * connect an email service (e.g. Resend, SendGrid, Mailgun).
 */
export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set = <K extends keyof ContactFormValues>(key: K, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateContactForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setStatus("submitting");
    // Simulate the (future) async request. Replace this setTimeout with a
    // fetch("/api/contact", { method: "POST", body: JSON.stringify(values) })
    window.setTimeout(() => setStatus("success"), 900);
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-md border border-gold-500/50 bg-cream p-10 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-gold-600" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl text-navy-900">Thank you — message received</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal-500">
          This is a demonstration form, so no email was sent. Once a backend is connected, we
          will respond within one business day.
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
          Send another message
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
        <TextInput
          label="Subject"
          required
          placeholder="Brief summary of your enquiry"
          value={values.subject}
          onChange={(e) => set("subject", e.target.value)}
          error={errors.subject}
        />
      </div>

      <SelectInput
        label="Practice Area"
        required
        placeholder="Select a practice area"
        options={practiceAreas.map((area) => ({ value: area.slug, label: area.name }))}
        value={values.practiceArea}
        onChange={(e) => set("practiceArea", e.target.value)}
        error={errors.practiceArea}
      />

      <TextArea
        label="Message"
        required
        rows={5}
        placeholder="Tell us briefly about your legal matter…"
        value={values.message}
        onChange={(e) => set("message", e.target.value)}
        error={errors.message}
      />

      <RadioGroup
        label="Preferred Contact Method"
        name="contactMethod"
        required
        options={[
          { value: "Email", label: "Email" },
          { value: "Phone", label: "Phone" },
          { value: "WhatsApp", label: "WhatsApp" },
        ]}
        value={values.contactMethod}
        onChange={(value) => set("contactMethod", value)}
        error={errors.contactMethod}
      />

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" variant="gold" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : (
            "Send Message"
          )}
        </Button>
        <p className="text-xs text-charcoal-500">
          * Required fields. Submitting this form does not create an attorney-client relationship.
        </p>
      </div>
    </form>
  );
}