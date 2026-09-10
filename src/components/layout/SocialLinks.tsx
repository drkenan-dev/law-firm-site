import { firm } from "@/lib/content";
import SocialIcon, { type SocialIconName } from "@/components/ui/SocialIcon";

type SocialLinksProps = {
  className?: string;
  iconSize?: string;
};

/**
 * Social links driven by data/firm.ts → firm.social.
 * `iconSize` is a Tailwind class controlling the icon dimensions.
 */
export default function SocialLinks({ className = "", iconSize = "h-4 w-4" }: SocialLinksProps) {
  const links: { label: string; href: string; icon: SocialIconName }[] = [
    { label: "LinkedIn", href: firm.social.linkedin, icon: "linkedin" },
    { label: "X (Twitter)", href: firm.social.twitter, icon: "x" },
    { label: "Facebook", href: firm.social.facebook, icon: "facebook" },
    { label: "Instagram", href: firm.social.instagram, icon: "instagram" },
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="Social media links">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.label} (dummy link)`}
          className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/20 text-white/85 transition-colors hover:border-gold-400 hover:text-gold-300"
        >
          <SocialIcon name={link.icon} className={iconSize} />
        </a>
      ))}
    </div>
  );
}