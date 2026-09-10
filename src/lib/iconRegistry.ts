import {
  Building2,
  Scale,
  Home,
  Users,
  Briefcase,
  Lightbulb,
  Landmark,
  ShieldCheck,
  Calculator,
  Globe2,
  type LucideIcon,
} from "lucide-react";

/**
 * Maps practice-area icon names (stored in data / WordPress) to lucide
 * icon components. Keys are the `icon` values selectable in the CMS.
 */
export const iconRegistry: Record<string, LucideIcon> = {
  "building-2": Building2,
  scale: Scale,
  home: Home,
  users: Users,
  briefcase: Briefcase,
  lightbulb: Lightbulb,
  landmark: Landmark,
  "shield-check": ShieldCheck,
  calculator: Calculator,
  "globe-2": Globe2,
};

/** Resolve an icon by name with a safe fallback. */
export function resolveIcon(name?: string | null): LucideIcon {
  if (name && name in iconRegistry) return iconRegistry[name];
  return Scale;
}

/** Reverse lookup: component → registry key (used by the content sync). */
export function iconNameOf(icon: LucideIcon): string {
  const entry = Object.entries(iconRegistry).find(([, component]) => component === icon);
  return entry ? entry[0] : "scale";
}