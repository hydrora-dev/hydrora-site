import { SITE } from "@/components/site-config";

export const SITE_NAME = SITE.name;
export const SITE_TAGLINE = SITE.tagline;

/**
 * Canonical site URL.
 * - Set NEXT_PUBLIC_SITE_URL on Vercel per-environment.
 * - Fallback is the brand's primary UK domain.
 */
export const SITE_URL = SITE.url;

export const OG_IMAGE = SITE.ogImage;

export function absoluteUrl(p: string) {
  const path = p.startsWith("/") ? p : `/${p}`;
  return `${SITE_URL}${path}`;
}

export function canonicalPath(p: string) {
  const path = p.startsWith("/") ? p : `/${p}`;
  return new URL(path, SITE_URL);
}
