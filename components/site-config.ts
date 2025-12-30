export const SITE = {
  name: "HYDRORA",
  tagline: "Powered by flavour. Driven by data.",
  /**
   * Canonical domain (used for SEO metadata).
   * Override per-environment with NEXT_PUBLIC_SITE_DOMAIN / NEXT_PUBLIC_SITE_URL.
   */
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || "hydrora.co.uk",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hydrora.co.uk",
  description:
    "HYDRORA is a premium hydration ecosystem combining a smart bottle, flavour pods, and a connected app—designed for effortless consistency and clearer insights.",
  ogImage: "/og-hydrora.png", // placeholder
  socials: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
    x: "https://x.com/",
    linkedin: "https://linkedin.com/"
  }
} as const;
