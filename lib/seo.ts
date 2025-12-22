export const SITE_NAME = "HYDRORA";
export const SITE_TAGLINE = "Powered by flavour. Driven by data.";
export const SITE_URL = "https://hydrora.co.uk"; // canonical domain

export const OG_IMAGE = "/og-hydrora.png";

export function absoluteUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
