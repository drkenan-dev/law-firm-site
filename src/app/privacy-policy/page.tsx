import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { buildMetadata } from "@/lib/site";
import { firm } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Crestline Law Partners collects, uses and protects your personal information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy Policy"
      description="This policy explains how we collect, use and protect personal information when you use this website."
      updated="September 9, 2026"
      sections={[
        {
          heading: "1. Who we are",
          paragraphs: [
            `${firm.legalName} ("we", "us", "our") is a law firm with offices at ${firm.address.street}, ${firm.address.city}, ${firm.address.country}. This policy relates to information collected through this website.`,
            "This is demonstration placeholder text provided for illustration purposes. It must be reviewed and replaced with legal advice tailored to your jurisdiction before publication.",
          ],
        },
        {
          heading: "2. Information we collect",
          paragraphs: [
            "We may collect information you provide directly, such as your name, email address, phone number and the details you submit through our contact, consultation, newsletter and careers forms.",
            "We may also collect limited technical information automatically, such as browser type, referring pages and pages visited, to understand how the site is used.",
          ],
        },
        {
          heading: "3. How we use your information",
          paragraphs: ["We use your information to:"],
          list: [
            "respond to enquiries and scheduling requests",
            "provide and administer legal services",
            "send news updates you have requested",
            "evaluate job applications",
            "meet our legal and regulatory obligations",
          ],
        },
        {
          heading: "4. Sharing your information",
          paragraphs: [
            "We do not sell personal information. We share information only where necessary to provide our services, where required by law, or with your consent.",
            "Matters discussed over this website are treated as confidential, but communications through this website do not by themselves create an attorney-client relationship. Please do not send privileged or sensitive information through this site before a formal engagement is agreed.",
          ],
        },
        {
          heading: "5. Data security",
          paragraphs: [
            "We apply reasonable administrative, technical and organisational measures to protect personal information. No method of transmission over the internet is completely secure, however, and we cannot guarantee absolute security.",
          ],
        },
        {
          heading: "6. Your rights",
          paragraphs: [
            "Depending on your jurisdiction, you may have rights to access, correct, delete or restrict the processing of your personal information. To exercise any of these rights, contact us using the details below.",
          ],
        },
        {
          heading: "7. Contact us",
          paragraphs: [
            `Questions about this policy? Email ${firm.email}, call ${firm.phone}, or write to us at ${firm.address.street}, ${firm.address.city}, ${firm.address.country}.`,
          ],
        },
      ]}
    />
  );
}