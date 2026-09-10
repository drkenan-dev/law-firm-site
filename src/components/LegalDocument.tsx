import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/Reveal";

type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

type LegalDocumentProps = {
  eyebrow: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
};

/** Shared layout for Privacy Policy / Terms & Conditions pages. */
export default function LegalDocument({
  eyebrow,
  title,
  description,
  updated,
  sections,
}: LegalDocumentProps) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]}
        image="/images/hero/hero-interior.svg"
      />
      <section className="container-site py-16 lg:py-24">
        <Reveal className="mx-auto max-w-3xl">
          <p className="text-sm text-charcoal-500">
            Last updated: <time dateTime={updated}>{updated}</time>
          </p>
          <div className="prose-sm mt-10 space-y-10 sm:prose-base">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-serif text-2xl text-navy-900">{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="mt-3 leading-relaxed text-charcoal-700">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 space-y-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3 leading-relaxed text-charcoal-700">
                        <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}