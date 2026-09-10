/**
 * Lightweight client-side validation helpers.
 * (Server-side/backend validation should be added when a real API
 * route is wired up to receive these submissions.)
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

export type FormErrors = Record<string, string>;

export function required(value: string | undefined, label: string): string | undefined {
  if (!value || value.trim() === "") return `${label} is required.`;
  return undefined;
}

export function email(value: string | undefined): string | undefined {
  if (!value || value.trim() === "") return "Email is required.";
  if (!EMAIL_RE.test(value.trim())) return "Please enter a valid email address.";
  return undefined;
}

export function phone(value: string | undefined, label = "Phone"): string | undefined {
  if (!value || value.trim() === "") return `${label} is required.`;
  if (!PHONE_RE.test(value.trim())) return "Please enter a valid phone number.";
  return undefined;
}

export function dateInFuture(value: string | undefined): string | undefined {
  if (!value) return "Preferred date is required.";
  if (new Date(value).getTime() < Date.now()) return "Please choose a future date.";
  return undefined;
}

export type ContactFormValues = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  practiceArea: string;
  message: string;
  contactMethod: string;
};

export function validateContactForm(values: ContactFormValues): FormErrors {
  const errors: FormErrors = {};
  const name = required(values.fullName, "Full name");
  if (name) errors.fullName = name;
  const mail = email(values.email);
  if (mail) errors.email = mail;
  const tel = phone(values.phone);
  if (tel) errors.phone = tel;
  const subj = required(values.subject, "Subject");
  if (subj) errors.subject = subj;
  const area = required(values.practiceArea, "Practice area");
  if (area) errors.practiceArea = area;
  const msg = required(values.message, "Message");
  if (msg) errors.message = msg;
  const method = required(values.contactMethod, "Preferred contact method");
  if (method) errors.contactMethod = method;
  return errors;
}

export type ConsultationFormValues = {
  name: string;
  email: string;
  phone: string;
  company: string;
  legalMatter: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
};

export function validateConsultationForm(values: ConsultationFormValues): FormErrors {
  const errors: FormErrors = {};
  const name = required(values.name, "Name");
  if (name) errors.name = name;
  const mail = email(values.email);
  if (mail) errors.email = mail;
  const tel = phone(values.phone);
  if (tel) errors.phone = tel;
  const matter = required(values.legalMatter, "Legal matter");
  if (matter) errors.legalMatter = matter;
  const date = dateInFuture(values.preferredDate);
  if (date) errors.preferredDate = date;
  const time = required(values.preferredTime, "Preferred time");
  if (time) errors.preferredTime = time;
  return errors;
}