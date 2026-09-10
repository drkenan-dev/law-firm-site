"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Info } from "lucide-react";
import { TextInput, TextArea, SelectInput } from "./fields";
import {
  validateConsultationForm,
  type FormErrors,
  type ConsultationFormValues,
} from "./validation";
import { practiceAreas } from "@/lib/content";
import Button from "@/components/ui/Button";

const initialValues: ConsultationFormValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  legalMatter: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

const timeSlots = [
  "Morning (9:00 – 12:00)",
  "Afternoon (12:00 – 3:00)",
  "Late Afternoon (3:00 – 5:00)",
];

/**
 * "Schedule a Consultation" form with client-side validation.
 * NOTE: submissions are NOT sent to a backend yet. To enable real
 * bookings, POST these values to `/api/consultations` (see README).
 */
export default function ConsultationForm() {
  const [values, setValues] = useState<ConsultationFormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const set = <K extends keyof ConsultationFormValues>(key: K, value: string) => {
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
    const nextErrors = validateConsultationForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setStatus("submitting");
    // Replace this timeout with a real call when a booking backend exists,
    // e.g. fetch("/api/consultations", { method: "POST", body: JSON.stringify(values) })
    window.setTimeout(() => setStatus("success"), 900);
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center rounded-md border border-gold-500/50 bg-cream p-10 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-gold-600" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-2xl text-navy-900">Consultation request received</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-charcoal-500">
          This is a demonstration form, so no confirmation email was sent. Once a backend is
          connected, we will confirm your preferred time within one business day.
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
          Request another consultation
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Name"
          required
          autoComplete="name"
          placeholder="Jane Doe"
          value={values.name}
          onChange={(e) => set("name", e.target.value)}
          error={errors.name}
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
          label="Company"
          autoComplete="organization"
          placeholder="Optional"
          value={values.company}
          onChange={(e) => set("company", e.target.value)}
        />
      </div>

      <SelectInput
        label="Legal Matter / Practice Area"
        required
        placeholder="Select the area your matter relates to"
        options={practiceAreas.map((area) => ({ value: area.slug, label: area.name }))}
        value={values.legalMatter}
        onChange={(e) => set("legalMatter", e.target.value)}
        error={errors.legalMatter}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextInput
          label="Preferred Date"
          type="date"
          required
          value={values.preferredDate}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => set("preferredDate", e.target.value)}
          error={errors.preferredDate}
        />
        <SelectInput
          label="Preferred Time"
          required
          placeholder="Select a time"
          options={timeSlots.map((slot, i) => ({ value: `slot-${i}`, label: slot }))}
          value={values.preferredTime}
          onChange={(e) => set("preferredTime", e.target.value)}
          error={errors.preferredTime}
        />
      </div>

      <TextArea
        label="Message"
        rows={4}
        placeholder="Briefly describe your matter so we can prepare for the meeting."
        value={values.message}
        onChange={(e) => set("message", e.target.value)}
      />

      <div
        className="flex items-start gap-2.5 rounded-sm border border-gold-500/40 bg-gold-300/10 p-3.5 text-xs leading-relaxed text-charcoal-700"
        role="note"
      >
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
        <p>
          <strong>Please note:</strong> Submitting this form does not create an attorney-client
          relationship. A consultation request confirms nothing except your interest in meeting
          with us.
        </p>
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <Button type="submit" variant="gold" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Requesting…
            </>
          ) : (
            "Schedule a Consultation"
          )}
        </Button>
        <p className="text-xs text-charcoal-500">* Required fields</p>
      </div>
    </form>
  );
}