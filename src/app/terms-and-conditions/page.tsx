import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { buildMetadata } from "@/lib/site";
import { firm } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "The terms and conditions governing use of the Crestline Law Partners website.",
  path: "/terms-and-conditions",
});

export default function TermsConditionsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms & Conditions"
      description="These terms govern your use of this website. Please read them carefully before using the site."
      updated="September 9, 2026"
      sections={[
        {
          heading: "1. Acceptance of terms",
          paragraphs: [
            `By accessing or using this website you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the site. ${firm.legalName} may update these terms from time to time; the effective date above shows when they were last revised.`,
            "This is demonstration placeholder text provided for illustration purposes. It must be reviewed and replaced with professional advice before publication.",
          ],
        },
        {
          heading: "2. Informational purposes only",
          paragraphs: [
            "The content on this website is provided for general information only. It does not constitute legal advice, does not create an attorney-client relationship, and should not be relied upon as a substitute for advice from a qualified lawyer on your specific circumstances.",
          ],
        },
        {
          heading: "3. No attorney-client relationship",
          paragraphs: [
            "Communicating with us through this website, including through our contact and consultation forms, does not create an attorney-client relationship. Such a relationship is formed only when you have received and signed our formal terms of engagement.",
            "Until a formal engagement is in place, please do not transmit confidential or privileged information through this website.",
          ],
        },
        {
          heading: "4. No guarantee of outcomes",
          paragraphs: [
            "Any descriptions of past matters, results or accomplishments on this website are illustrative and not a guarantee of the outcome of any future matter. Individual case results depend on the specific facts and circumstances involved.",
          ],
        },
        {
          heading: "5. Intellectual property",
          paragraphs: [
            "All material on this website — including text, graphics, logos and design — is protected by copyright and other intellectual property laws and is owned by or licensed to the firm. You may not reproduce or republish it without prior written permission.",
          ],
        },
        {
          heading: "6. Limitation of liability",
          paragraphs: [
            "To the fullest extent permitted by law, the firm shall not be liable for any loss or damage arising from your use of, or reliance on, the content of this website.",
          ],
        },
        {
          heading: "7. Contact",
          paragraphs: [
            `Questions about these terms? Contact us at ${firm.email} or ${firm.phone}, or write to ${firm.address.street}, ${firm.address.city}, ${firm.address.country}.`,
          ],
        },
      ]}
    />
  );
}